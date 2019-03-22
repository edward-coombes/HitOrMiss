var camera, scene, renderer, loader, bgCube;
var stick;
var lights = [];
var ti = document.getElementById("textIn");
var soundtrack = document.getElementById("soundtrack");
var state;
var backdropDim = 512;
let tBuff = [];
let keyFrameBuff = [];
console.log("index v5");

function setUpSound(){
    //instigate audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    //load the audio
    let track = audioCtx.createMediaElementSource(soundtrack);
    track.connect(audioCtx.destination);
}

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z =400;

    setUpSound();
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({antialias: true,alpha:true});
    renderer.setClearColor(0x000000,0);
    material = new THREE.MeshPhongMaterial({
                color:0xEB81AD,
                shininess: 10,
                specular: 0xf3c8ba
            });
    stick = new Stick(scene,renderer,camera,material,material);

    let light = new THREE.PointLight(0xffffff,0.7,0);
    light.position.set(75,100,100);
    let light1 = new THREE.PointLight(0xffffff,0.7,0);
    light1.position.set(-75,100,100);

    lights.push(light);
    lights.push(light1);
    for(l in lights)
        scene.add(lights[l]);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate(){
    requestAnimationFrame(animate);

// move model towards keyframe position stored in keyframe buffer in specified # of frames
//after all frames have been seen, shift keyfrwme/time ouy of buffer

    if(keyFrameBuff.length > 0){
        stick.toPosition(keyFrameBuff[0],tBuff[0]--,function(){
            console.log("frames left:  " + keyFrameBuff.length);
            tBuff.shift();
            keyFrameBuff.shift();
        });
    }
    renderer.render(scene, camera);
}
function printStickState(){

        //print out all joint information in json format
        let axes = ["x","y","z"];

        console.log("{");
        for(j=0;j<stick.jointIDs.length-1;j++){
            console.log( "        " + stick.jointIDs[j] + ": {" );
            for(a=0;a<axes.length-1;a++){
                console.log("            " + axes[a] + ": " 
                    + stick[stick.jointIDs[j]].rotation[axes[a]]*180/Math.PI + ",");
            }
            console.log("            " + axes[a] + ": " 
                    + stick[stick.jointIDs[j]].rotation[axes[a]]*180/Math.PI + "        },");
        }
        console.log( "        " + stick.jointIDs[j] + ": {" );
        for(a=0;a<axes.length-1;a++){
                console.log("            " + axes[a] 
                + ": " + stick[stick.jointIDs[j]].rotation[axes[a]]*180/Math.PI + ",");
            }
            console.log("            " + axes[a] + ": " 
                + stick[stick.jointIDs[j]].rotation[axes[a]]*180/Math.PI + "        },");
        console.log("    }");
        console.log("}");
}
addEventListener("keypress",function(event){
    if(event.key == "a"){
        stick.torso.rotation.y -= 0.05;
    }
    if(event.key == "d"){
        stick.torso.rotation.y += 0.05;
    }
    if(event.keyCode == 13){
        //handle controls
        text = ti.value;
        vals = text.split(" ");
        if (vals[0] == "goto"){
            keyFrameBuff.push(frameData[vals[1]]);
            tBuff.push((vals[2] === undefined)?1:vals[2]);
        } else if (vals[0] == "light") {
            lights[vals[1]].position.set(vals[2],vals[3],vals[4]);
        } else if (vals[0] == "back"){
            bgCube.position.set(vals[1],vals[2],vals[3]);
        } else if (vals[0].toLowerCase() == "play"){
            // empty buffers
            keyFrameBuff = [];
            tBuff = [];
            soundtrack.play(); //start music

            //push frames/times into buffers
            // start at relax
            keyFrameBuff.push(frameData.relax);
            tBuff.push(1);

            // snap to tPose
            keyFrameBuff.push(frameData.tPose);
            tBuff.push(20);

            // spin
            keyFrameBuff.push(frameData.spinLeft);
            tBuff.push(150);

            // arms by the side
            keyFrameBuff.push(frameData.armsDown);
            tBuff.push(40);

            // head shake
            keyFrameBuff.push(frameData.headShakeLeft);
            tBuff.push(10);
            keyFrameBuff.push(frameData.headShakeRight);
            tBuff.push(20);
            keyFrameBuff.push(frameData.headShakeLeft);
            tBuff.push(20);
            keyFrameBuff.push(frameData.headShakeRight);
            tBuff.push(20);
            keyFrameBuff.push(frameData.lookForward);
            tBuff.push(5); 

            // hands on hips
            keyFrameBuff.push(frameData.handsOnHips);
            tBuff.push(50);

            //hold for 20
            keyFrameBuff.push(frameData.handsOnHips);
            tBuff.push(30);

            //blow kisses
            keyFrameBuff.push(frameData.rightBlowKiss1);
            tBuff.push(40);
            keyFrameBuff.push(frameData.rightBlowKiss2);
            tBuff.push(35);
            keyFrameBuff.push(frameData.leftBlowKiss1);
            tBuff.push(40);
            keyFrameBuff.push(frameData.leftBlowKiss2);
            tBuff.push(35);

            // arms by the side
            keyFrameBuff.push(frameData.armsDown);
            tBuff.push(20);

            // spin
            keyFrameBuff.push(frameData.tPose);
            tBuff.push(30);
            keyFrameBuff.push(frameData.spinRight);
            tBuff.push(150);
 
            //relax for a  sec
            keyFrameBuff.push(frameData.relax);
            tBuff.push(25);
 
            //DAB
            keyFrameBuff.push(frameData.dabSpinLead);
            tBuff.push(5);
            keyFrameBuff.push(frameData.dabSpin);
            tBuff.push(100);

            //normalize

            keyFrameBuff.push(frameData.dabSpinNormalize);
            tBuff.push(1);
            keyFrameBuff.push(frameData.dab);
            tBuff.push(20);

        } else {
            stick[vals[0]].rotation[vals[1]] = vals[2] * Math.PI / 180;
        }    
    }

});

init();
animate();

