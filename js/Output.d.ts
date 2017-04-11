/// <reference path="../lib/three.d.ts" />
/// <reference path="../lib/objloader.d.ts" />
/// <reference path="../lib/MTLLoader.d.ts" />
/// <reference path="../lib/jquery.d.ts" />
/// <reference path="../lib/bootstrap.d.ts" />
/// <reference path="../lib/stats.d.ts" />
declare class config {
    static planeSize: number;
    static objecSize: number;
    static canvasWidth: number;
    static canvasHeight: number;
    static offset: number;
    static cubeFaceNumber: number;
    static selectBorderColor: number;
    static unselectBorderColor: number;
    static cylinderSegment: number;
    static objRange: number;
    static cubeInitColor1: number;
    static cubeInitColor2: number;
    static cubeInitColor3: number;
    static cylinderInitColor1: number;
    static cylinderInitColor2: number;
    static cylinderInitColor3: number;
    static CTRL_KEY: number;
    static apiUrl: string;
}
declare let targetList: any[];
declare let camera: any, scene: any, renderer: any;
declare let ground: any;
declare let color: number;
declare let mouse: THREE.Vector2;
declare let canvas: any;
declare let Objects: any[];
declare let selectedObjects: any[];
declare let ctrlKeyPressed: boolean;
declare let renderColor: string;
declare let quanBu: boolean;
declare let selectOpacity: number;
declare let selectedObject: any;
declare let selectFaceIndex: number;
declare function d2h(d: any): string;
declare namespace THREE {
    class OrbitControls {
        constructor(object: Camera, domElement?: HTMLElement);
        object: Camera;
        domElement: HTMLElement | HTMLDocument;
        enabled: boolean;
        target: THREE.Vector3;
        center: THREE.Vector3;
        enableZoom: boolean;
        zoomSpeed: number;
        minDistance: number;
        maxDistance: number;
        enableRotate: boolean;
        rotateSpeed: number;
        enablePan: boolean;
        keyPanSpeed: number;
        autoRotate: boolean;
        autoRotateSpeed: number;
        minPolarAngle: number;
        maxPolarAngle: number;
        minAzimuthAngle: number;
        maxAzimuthAngle: number;
        enableKeys: boolean;
        keys: {
            LEFT: number;
            UP: number;
            RIGHT: number;
            BOTTOM: number;
        };
        mouseButtons: {
            ORBIT: MOUSE;
            ZOOM: MOUSE;
            PAN: MOUSE;
        };
        enableDamping: boolean;
        dampingFactor: number;
        rotateLeft(angle?: number): void;
        rotateUp(angle?: number): void;
        panLeft(distance?: number): void;
        panUp(distance?: number): void;
        pan(deltaX: number, deltaY: number): void;
        dollyIn(dollyScale: number): void;
        dollyOut(dollyScale: number): void;
        update(): void;
        reset(): void;
        dispose(): void;
        getPolarAngle(): number;
        getAzimuthalAngle(): number;
        addEventListener(type: string, listener: (event: any) => void): void;
        hasEventListener(type: string, listener: (event: any) => void): void;
        removeEventListener(type: string, listener: (event: any) => void): void;
        dispatchEvent(event: {
            type: string;
            target: any;
        }): void;
    }
}
declare var waitingDialog: any;
declare class Objload extends THREE.Object3D {
    obj: THREE.Mesh;
    outlineMesh: THREE.Mesh;
    geometry: any;
    checked: boolean;
    offset: THREE.Vector3;
    private state;
    sizeX: number;
    sizeY: number;
    sizeZ: number;
    private url;
    private mtlUrl;
    private originalMaterial;
    constructor(url: string, mtlUrl: string);
    addBorder: () => void;
    load: (loadedMesh: any) => void;
    mtlLoad: (materials: any) => void;
    removeBorder: () => void;
    clicked: () => void;
    move: (x: any, y: any, z: any) => void;
    scales: (sizeX: any, sizeY: any, sizeZ: any) => void;
    rotate(angleX: any, angleY: any, angleZ: any): void;
    selectFace: (faceIndex: any) => void;
    deselectFace: () => void;
    colorSelect: (faceIndex: any, color: any, all: any) => void;
    setColorAndTextureUrl: (faceIndex: any) => void;
}
declare class init {
    private planeGeometry;
    private renderer;
    static MouseControl: THREE.OrbitControls;
    private floorTexture;
    private planeMaterial;
    private pointColor;
    private directionalLight;
    private mSphereCamera;
    constructor();
    render: () => void;
    onResize: () => void;
}
declare class control {
    private raycaster;
    SELECTED: any;
    plane: THREE.Plane;
    intersection: THREE.Vector3;
    offset: THREE.Vector3;
    INTERSECTED: any;
    prev: THREE.Vector2;
    constructor();
    mouseDown: (event: MouseEvent) => void;
    mouseMove: (event: MouseEvent) => void;
    mouseUp: (event: MouseEvent) => void;
    getObject: (object: any) => any;
    keyDown: (event: KeyboardEvent) => void;
    keyUp: (event: KeyboardEvent) => void;
    removeAllborder: () => void;
    contain: (obj: any) => boolean;
    disableInputFields: () => void;
    enableInputFields: () => void;
    sizeChanged: () => void;
    posChanged: () => void;
    angleChanged: () => void;
    showDeleteButton: () => void;
    hideDeleteButton: () => void;
    deleteObjects: () => void;
    textureSelect: () => void;
    exportSerialized: () => void;
    loadPlan: () => void;
    loadObjects: (event: any) => void;
}
import Scene = THREE.Scene;
declare class Cube extends THREE.Object3D {
    private cubeGeometry;
    obj: THREE.Mesh;
    outlineMesh: any;
    checked: boolean;
    offset: THREE.Vector3;
    private textureUrl;
    constructor();
    addBorder: () => void;
    removeBorder: () => void;
    clicked: () => void;
    move: (x: any, y: any, z: any) => void;
    scales: (sizeX: any, sizeY: any, sizeZ: any) => void;
    rotate(angleX: any, angleY: any, angleZ: any): void;
    selectFace: (faceIndex: any) => void;
    deselectFace: () => void;
    textureSelect: (faceIndex: any, color: any, colorAll: any, textureUrl: any, textureAll: any) => void;
    setColorAndTextureUrl: (faceIndex: any) => void;
}
declare class Cylinder extends THREE.Object3D {
    obj: THREE.Mesh;
    outlineMesh: any[];
    checked: boolean;
    offset: THREE.Vector3;
    private textureUrl;
    constructor();
    addBorder: () => void;
    removeBorder: () => void;
    clicked: () => void;
    add2Circles: () => void;
    move: (x: any, y: any, z: any) => void;
    scales: (sizeX: any, sizeY: any, sizeZ: any) => void;
    rotate: (angleX: any, angleY: any, angleZ: any) => void;
    selectFace: (faceIndex: any) => void;
    deselectFace: () => void;
    textureSelect: (faceIndex: any, color: any, colorAll: any, textureUrl: any, textureAll: any) => void;
    setColorAndTextureUrl: (faceIndex: any) => void;
}
