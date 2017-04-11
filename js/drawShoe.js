var raycaster= new THREE.Raycaster();
var mouse = new THREE.Vector2;
var canvas = document.getElementById("WebGL-output");
var activeColor = '0xff0000';
var originalColor;
var	objShoeUp,objShoeDown,objShoefloor,objRibbon;
var selectObject;
var name;
var mirrorCubeCamera;
var selectUp = 1;
var selectUp2;
function myFunc(){
	console.log("my function");
	    var shoesUp ;
		var shoesDown;
        var shoesFloor;
		var loader = new THREE.ObjectLoader();
    waitingDialog.show('Loading');
    loader.load("./model/shoeUp.json",function(result){
        waitingDialog.hide();

        objShoeUp = result;
                targetList.push(objShoeUp);
                scene.add(objShoeUp);
                reflection();
        });
        loader.load("./model/shoeDown.json",function(result){
            objShoeDown = result;
            scene.add(objShoeDown);
            targetList.push(objShoeDown);
            reflectionDown();
        });
        loader.load("./model/shoeFloor.json",function(result){
            objShoefloor = result;
            scene.add(objShoefloor);
            targetList.push(objShoefloor);
            reflectionFloor();
        });
		 document.getElementById("WebGL-output").addEventListener('mousedown',function(event){
            event.preventDefault();
			mouse.x = ( event.clientX / canvas.offsetWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / canvas.offsetHeight ) * 2 + 1;

            raycaster.setFromCamera( mouse, camera );
            intersects = raycaster.intersectObjects( targetList,true );
            // if ( intersects.length > 0 ) {
             //    name = intersects[0].object.name;
			// 	selectObj(name,activeColor);
			// }else{
			// 	deselectObj();
			// }

         });
		 document.getElementById("WebGL-output").addEventListener('mousemove',function(event){
            event.preventDefault();
            mouse.x = ( event.clientX / canvas.offsetWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / canvas.offsetHeight ) * 2 + 1;
			
         });
		 document.getElementById("color").addEventListener('change',function(event){
			 var selectColor="0x"+ this.value;
				if(name=="T7B7-M"||name=="T7B7-LI"){
                    objShoeUp.children[selectUp].material.color.setHex(selectColor); //todo outer face
                    objShoeUp.children[0].material.color.setHex(selectColor); //todo outer face
                }
				else{
					objShoeDown.children[selectUp].material.color.setHex(selectColor); //todo outer face
				}
		 })
        document.getElementById("shinny").addEventListener('change',function(event){
            updateShinny(this.value);
        })

		 
}
function selectObj(name,color){
	if(name=="T7B7-M"||name=="T7B7-LI"){//shoes up
		objShoeUp.children[selectUp].material.opacity=0.7;
		objShoeUp.children[selectUp].material.transparent=true;
		
		objShoeDown.children[selectUp].material.transparent=false;
		objShoeDown.children[0].material.transparent=false;
		selectObject = objShoeUp;
	}
	else if(name=="CG-G"||name=="CGD-D"){
		objShoeDown.children[selectUp].material.opacity=0.7;
		objShoeDown.children[selectUp].material.transparent=true;

		objShoeUp.children[selectUp].material.transparent=false;

		selectObject = objShoeDown;
	}
}
function deselectObj(){
	objShoeUp.children[selectUp].material.transparent=false;
	objShoeDown.children[selectUp].material.transparent=false;
	objShoeDown.children[0].material.transparent=false;
}

function UpdateMaterial(image){
	console.log(image);
	var src = image.src;
    var texture = THREE.ImageUtils.loadTexture(src);
    objShoeUp.children[selectUp].material.map = texture;
    var bump = THREE.ImageUtils.loadTexture(src);
    objShoeUp.children[selectUp].material.shininess = 8;
    objShoeUp.children[selectUp].material.bumpMap=bump;
}
function UpdateMaterial2(image){
	console.log(image);
	var src = image.src;
    var texture = THREE.ImageUtils.loadTexture(src);
    objShoeUp.children[selectUp].material.map = texture;
    var bump = THREE.ImageUtils.loadTexture(src);
    objShoeUp.children[selectUp].material.shininess = 16;
    objShoeUp.children[selectUp].material.bumpMap=bump;
}
function updateColor(image){
	var src = image.src;
    var texture = THREE.ImageUtils.loadTexture(src);
    objShoeUp.children[selectUp].material.map = texture;
    var bump = THREE.ImageUtils.loadTexture(src);

    objShoeUp.children[selectUp].material.bumpMap=bump;
    objShoeUp.children[selectUp].material.shininess = 100;
}

function reflection(){

    // var texture = THREE.ImageUtils.loadTexture('./image/B_HL7.jpg');
    var texture = THREE.ImageUtils.loadTexture('./image/red.jpg');

    var mat = new THREE.MeshPhongMaterial({
        specular: 0xeeeeee,
        shininess: 90,
    });
    mat.map = texture;
    // var bump = THREE.ImageUtils.loadTexture('./image/B_HL7.jpg');
    mat.bumpMap = texture;
    objShoeUp.children[selectUp].material = mat;

    //inner material
    var mat1 = new THREE.MeshPhongMaterial({
        specular: 0xdddddd,
        shininess: 10,
    });
    objShoeUp.children[0].material = mat1;
    objShoeUp.children[0].material.color.setHex("0xD6B99A");

}
function reflectionDown() {
    var floorTexture = THREE.ImageUtils.loadTexture('./image/B_HP025.jpg');
    var floorMat = new THREE.MeshPhongMaterial();
    floorMat.map = floorTexture;
    objShoeDown.children[0].material = floorMat;
    objShoeDown.children[1].material.color.setHex('0xD6B99A');

}
function reflectionFloor() {
    var mat2 = new THREE.MeshPhongMaterial({
        specular: 0xdddddd,
        shininess: 8,
    });
    objShoefloor.children[1].material = mat2;
    objShoefloor.children[1].material.color.setHex("0xD6B99A");
}
function updateShinny(shinny){
    objShoeUp.children[selectUp].material.shininess = shinny;
}
function updateDown(image){
    jQuery(image).parent().siblings().find("img").removeClass("active");
    jQuery(image).addClass("active");
    var json = image.getAttribute("value");
    var loader = new THREE.ObjectLoader();
    waitingDialog.show('Loading');

    loader.load("./model/"+json,function(result){
        waitingDialog.hide();

        scene.remove(objShoeDown);
        objShoeDown = result;
        scene.add(objShoeDown);
        targetList.push(objShoeDown);
        reflectionDown();
    });
}
function updateRibbon(image){
    jQuery(image).parent().siblings().find("img").removeClass("active");
    jQuery(image).addClass("active");
    var json = image.getAttribute("value");
    if(json=="") {
        scene.remove(objRibbon);
        return;
    }
    var imgSrc = image.src;
    var loader = new THREE.ObjectLoader();
    waitingDialog.show('Loading');

    loader.load("./model/"+json,function(result){
        waitingDialog.hide();

        scene.remove(objRibbon);
        objRibbon = result;
        var texture = THREE.ImageUtils.loadTexture(imgSrc);
        var mat = new THREE.MeshPhongMaterial({
            specular: 0xeeeeee,
            shininess: 1000,
        });
        mat.map = texture;
        objRibbon.children[0].material = mat;

        scene.add(objRibbon);
        //add texture
    });
}
function updateUp(image) {
    jQuery(image).parent().siblings().find("img").removeClass("active");
    jQuery(image).addClass("active");
    var json = image.getAttribute("value");
    var loader = new THREE.ObjectLoader();
    waitingDialog.show('Loading');

    loader.load("./model/"+json,function(result){
        waitingDialog.hide();

        console.log(json);
        scene.remove(objShoeUp);
        objShoeUp = result;
        scene.add(objShoeUp);
        targetList.push(objShoeUp);

        if(json=="shoeUp3.json"){
            selectUp = 2;
            reflection();
            objShoeUp.children[1].material.color.setHex("0xD6B99A");
        }
        else if(json=="shoeUp5.json"){
            selectUp = 2;
            reflection();
            objShoeUp.children[1].material.color.setHex("0xD6B99A");
            var texture = THREE.ImageUtils.loadTexture('./image/B_HL7.jpg');
            var mat = new THREE.MeshPhongMaterial({
                specular: 0xeeeeee,
                shininess: 6,
            });
            mat.map = texture;
            var bump = THREE.ImageUtils.loadTexture('./image/B_HL7.jpg');
            mat.bumpMap = bump;
            objShoeUp.children[0].material = mat;

        }
        else{
            selectUp = 1;
            reflection();
        }
    });
}
