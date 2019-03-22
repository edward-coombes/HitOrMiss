
class Stick {

    constructor(scene,renderer,camera,material, headMaterial=material){
        console.log("Stick v4");
        this.APPENDAGE_WIDTH = 75;
        this.APPENDAGE_DEPTH = 25;
        this.APPENDAGE_HEIGHT = 25;
        this.TORSO_HEIGHT = 200;
        this.TORSO_WIDTH = 50;

        this.TORSO_DEPTH = 25;
        
        this.HEAD_DIM = 75;
    
        this._2PI = 2 * Math.PI;

        this.jointIDs = ["neck","leftShoulder","leftElbow","rightShoulder","rightElbow","leftHip","leftKnee","rightHip","rightKnee"];
        //give object a reference to the scene,renderer and camera


        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;

        //construct all of the geometries
        this.rightBicepGeometry = new THREE.BoxBufferGeometry(this.APPENDAGE_WIDTH
                                    , this.APPENDAGE_HEIGHT, this.APPENDAGE_DEPTH);
        this.rightForearmGeometry = new THREE.BoxBufferGeometry(this.APPENDAGE_WIDTH
                                    , this.APPENDAGE_HEIGHT, this.APPENDAGE_DEPTH);

        this.leftBicepGeometry = new THREE.BoxBufferGeometry(this.APPENDAGE_WIDTH
                                    , this.APPENDAGE_HEIGHT, this.APPENDAGE_DEPTH);
        this.leftForearmGeometry = new THREE.BoxBufferGeometry(this.APPENDAGE_WIDTH
                                    , this.APPENDAGE_HEIGHT, this.APPENDAGE_DEPTH);
        
        this.rightThighGeometry = new THREE.BoxBufferGeometry(this.APPENDAGE_WIDTH
                                    , this.APPENDAGE_HEIGHT, this.APPENDAGE_DEPTH);
        this.rightCalfGeometry = new THREE.BoxBufferGeometry(this.APPENDAGE_WIDTH
                                    , this.APPENDAGE_HEIGHT, this.APPENDAGE_DEPTH);

        this.leftThighGeometry = new THREE.BoxBufferGeometry(this.APPENDAGE_WIDTH
                                    , this.APPENDAGE_HEIGHT, this.APPENDAGE_DEPTH);
        this.leftCalfGeometry = new THREE.BoxBufferGeometry(this.APPENDAGE_WIDTH
                                    , this.APPENDAGE_HEIGHT, this.APPENDAGE_DEPTH);

        this.torsoGeometry = new THREE.BoxBufferGeometry(this.TORSO_WIDTH
                                    ,this.TORSO_HEIGHT, this.TORSO_DEPTH);

        this.headGeometry = new THREE.BoxBufferGeometry(this.HEAD_DIM
                                    ,this.HEAD_DIM,this.HEAD_DIM);

        //construct all of the meshes
        this.leftBicep = new THREE.Mesh(this.leftBicepGeometry,material);
        this.leftForearm = new THREE.Mesh(this.leftForearmGeometry,material);

        this.rightBicep = new THREE.Mesh(this.rightBicepGeometry,material);
        this.rightForearm = new THREE.Mesh(this.rightForearmGeometry,material);

        this.leftThigh = new THREE.Mesh(this.leftThighGeometry,material);
        this.leftCalf = new THREE.Mesh(this.leftCalfGeometry,material);

        this.rightThigh = new THREE.Mesh(this.rightThighGeometry,material);
        this.rightCalf = new THREE.Mesh(this.rightCalfGeometry,material);

        this.torso = new THREE.Mesh(this.torsoGeometry,material);
        this.head = new THREE.Mesh(this.headGeometry,material);      

        this.neck = new THREE.Object3D();
        this.torso.add(this.neck);

        this.neck.position.set(0,this.TORSO_HEIGHT/2 + 10,0);
        this.neck.add(this.head);

        this.rightShoulder = new THREE.Object3D();
        this.torso.add(this.rightShoulder);
        this.rightShoulder.position.set(this.TORSO_WIDTH/2,this.TORSO_HEIGHT/4,0);
        this.rightShoulder.add(this.rightBicep);
        this.rightBicep.position.set(this.APPENDAGE_HEIGHT,0,0);

        this.leftShoulder = new THREE.Object3D();
        this.torso.add(this.leftShoulder);
        this.leftShoulder.position.set(-this.TORSO_WIDTH/2,this.TORSO_HEIGHT/4,0);
        this.leftShoulder.add(this.leftBicep);
        this.leftBicep.position.set(-this.APPENDAGE_HEIGHT,0,0);


        this.rightHip = new THREE.Object3D();
        this.torso.add(this.rightHip);
        this.rightHip.position.set(this.TORSO_WIDTH/2,-(this.TORSO_HEIGHT/2-this.APPENDAGE_HEIGHT/2),0);
        this.rightHip.add(this.rightThigh);
        this.rightThigh.position.set(this.APPENDAGE_HEIGHT,0,0);

        this.leftHip = new THREE.Object3D();
        this.torso.add(this.leftHip);
        this.leftHip.position.set(-this.TORSO_WIDTH/2,-(this.TORSO_HEIGHT/2-this.APPENDAGE_HEIGHT/2),0);
        this.leftHip.add(this.leftThigh);
        this.leftThigh.position.set(-this.APPENDAGE_HEIGHT,0,0);
    

        this.rightElbow = new THREE.Object3D();
        this.rightBicep.add(this.rightElbow);
        this.rightElbow.position.set(this.APPENDAGE_WIDTH/2,0,0);
        this.rightElbow.add(this.rightForearm);
        this.rightForearm.position.set(this.APPENDAGE_WIDTH/2,0,0);

        this.leftElbow = new THREE.Object3D();
        this.leftBicep.add(this.leftElbow);
        this.leftElbow.position.set(-this.APPENDAGE_WIDTH/2,0,0);
        this.leftElbow.add(this.leftForearm);
        this.leftForearm.position.set(-this.APPENDAGE_WIDTH/2,0,0);


        this.rightKnee = new THREE.Object3D();
        this.rightThigh.add(this.rightKnee);
        this.rightKnee.position.set(this.APPENDAGE_WIDTH/2,0,0);
        this.rightKnee.add(this.rightCalf);
        this.rightCalf.position.set(this.APPENDAGE_WIDTH/2,0,0);

        this.leftKnee = new THREE.Object3D();
        this.leftThigh.add(this.leftKnee);
        this.leftKnee.position.set(-this.APPENDAGE_WIDTH/2,0,0);
        this.leftKnee.add(this.leftCalf);
        this.leftCalf.position.set(-this.APPENDAGE_WIDTH/2,0,0);

        this.setToInitialPosition();    
        this.scene.add(this.torso);
    }

    setToInitialPosition(){
        this.toPosition(frameData.relax,1,function(){return;});
    }


    toPosition(pos, frames = 1,callback){
        let step;
        let delta;
        let r;
        //call the callback functiom if no more frames
        if(frames == 0){
            console.log("calling back"); 
            callback();
        } else  {
        //otherwise move every joint/axis towards position specified 
            for(let j in pos){
                for(let a in pos[j]){
                    r = pos[j][a] * Math.PI/180;
                    //split distance evenly into remainimg frames
                    delta = (r-this[j].rotation[a]); 
                    step = delta / frames;
                    if(!(Math.abs(delta) < 0.01)){
                        this[j].rotation[a] += step;
                        //keep angles between 0-360 degrees
                        for(;this[j].rotation[a]>this._2PI
                            ;this[j].rotation[a]+=(this[j].rotation[a]<0)
                                                ?this._2PI:-this._2PI);
                    }
                    
                }
            } 
        }
    }
}
