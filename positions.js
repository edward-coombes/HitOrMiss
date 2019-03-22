console.log("frameData v1");
//contains all positions as descriptions of
//the rotations of the joints in jsom format
var frameData = {
dabSpinLead : {
   rightElbow : {
        z : -30
    }
}, 
dabSpin : {
    rightElbow: {
        z : -390
    },
    leftElbow: {
        z : -360 
    }
},
dabSpinNormalize: {
    rightElbow : {
        z : -30
    },
    leftElbow: {
        z : 0
    }
},
dab:
{

    neck: {
            x : 15,
            y: 15,
            z: 0,
    },
    leftShoulder: {
            x: 0,
            y: -30,
            z: -30
     },
     rightElbow: {
            x: 0,
            y: -90,
            z: 35
     },
     rightShoulder: {
            x: 0,
            y: -90,
            z: -15
     },

     leftElbow: {
            x: 0,
            y: 0,
            z: 0
     },

},

relax : {
    torso : {
        x : 0,
        y : 0,
        z : 0
    },
    neck : {
        x : 0,
        y : 0,
        z : 0
    },
    rightShoulder : {
        z : -60,
        y : 0,
        x : 0
    },
    rightElbow : {
        x : 0,
        y : 0,
        z : 0
    },

    leftShoulder : {
        z : 60,
        y : 0,
        x : 0
    },
    leftElbow : {
        x : 0,
        y : 0,
        z : 0
    },
    rightHip : {
        x: 0,
        y : 0,
        z : -90
    },
    rightKnee : {
        x : 0,
        y : 0,
        z : 0
    },
    leftKnee : {
        x : 0,
        y : 0,
        z : 0
    },

    leftHip : {
        x : 0,
        y : 0,
        z : 90
    }

},
tPose : {
    rightShoulder : { z : 0 },
    leftShoulder : { z : 0 }
},
armsDown : {
    rightShoulder : {
        y : -60,
        z : -45
    },
    rightElbow : {
        x : 0,
        y : 0,
        z : 0
    },
    leftShoulder : {
        y : 60,
        z : 45
    },
    leftElbow : {
        x : 0,
        y : 0,
        z : 0
    }
},
handsOnHips : {
    rightShoulder : {
        x : 0,
        y : 0,
        z : -45
    },
    rightElbow : {
        x : 0,
        y : 0, 
        z : -90
    },
    leftShoulder : {
        x : 0,
        y : 0,
        z : 45
    },
    leftElbow : {
        x : 0,
        y : 0,
        z : 90
    }
},
rightBlowKiss1 : {
    rightShoulder : {
        y : -90,
        z : -30
    },
    rightElbow : {
        x : 30,
        z : 120
    }
},
rightBlowKiss2 : {
    rightShoulder : {
        y : -90,
        z : -30
    },
    rightElbow : {
        x : 0,
        z : 0
    }
},
leftBlowKiss1 : {
    leftShoulder : {
        y : 90,
        z : 30
    },
    leftElbow : {
        x : 30,
        z : -120
    }
},
leftBlowKiss2 : {
    leftShoulder : {
        y : 90,
        z : 30
    },
    leftElbow : {
        x : 0,
        z : 0
    }
},


headShakeLeft : {
    neck : {
        y : -45
    }
},   
headShakeRight : {
    neck : {
        y : 45
    }
},   
lookForward : {
    neck : {
        y : 0
    }
},
spinRight: {
    torso: {
        y : 0
    }
},
spinLeft: {
    torso: {
        y : 360
    }
}



///end frame data
}
