function JumpAnimation() {}

Object.assign( JumpAnimation.prototype, {

    init: function() {  
        let CrouchTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/4 }, 2500)
            .onUpdate(function(){     
                let right_lower_leg =  robot.getObjectByName( "right_lower_leg" );
                let right_upper_leg =  robot.getObjectByName( "right_upper_leg" );
                let left_upper_leg = robot.getObjectByName( "left_upper_leg" );
                let left_lower_leg = robot.getObjectByName( "lower_leg" );
                let torso = robot.getObjectByName("torso");
                let upperLegPivot = [ 0.5, 0.5, 0 ];
                let lowerLegPivot = [ right_upper_leg.position.x - 2, right_lower_leg.position.y + 3.8, 0 ];
                
                torso.matrix.premultiply( new THREE.Matrix4().makeTranslation( 0, -0.005, 0 ));

                right_upper_leg.matrix
                    .makeTranslation( -upperLegPivot[0], -upperLegPivot[1], -upperLegPivot[2] ) 
                    .makeRotationZ(this._object.theta)
                    .premultiply( new THREE.Matrix4().makeTranslation( upperLegPivot[0], upperLegPivot[1], upperLegPivot[2] ) )
                    .premultiply( new THREE.Matrix4().makeTranslation(
                        right_upper_leg.position.x,
                        right_upper_leg.position.y,
                        right_upper_leg.position.z 
                        ));

                right_lower_leg.matrix
                    .makeTranslation( -lowerLegPivot[0], -lowerLegPivot[1], -lowerLegPivot[2] ) 
                    .makeRotationZ(-this._object.theta)
                    .premultiply( new THREE.Matrix4().makeTranslation( lowerLegPivot[0], lowerLegPivot[1], lowerLegPivot[2] ) )
                    .premultiply( new THREE.Matrix4().makeTranslation(
                        right_lower_leg.position.x,
                        right_lower_leg.position.y,
                        right_lower_leg.position.z 
                        ));
                
                left_upper_leg.matrix
                .makeTranslation( upperLegPivot[0], -upperLegPivot[1], -upperLegPivot[2] ) 
                .makeRotationZ(-this._object.theta)
                .premultiply( new THREE.Matrix4().makeTranslation( -upperLegPivot[0], upperLegPivot[1], upperLegPivot[2] ) )
                .premultiply( new THREE.Matrix4().makeTranslation(
                    left_upper_leg.position.x,
                    left_upper_leg.position.y,
                    left_upper_leg.position.z 
                    ));

                left_lower_leg.matrix
                    .makeTranslation( lowerLegPivot[0], -lowerLegPivot[1], -lowerLegPivot[2] ) 
                    .makeRotationZ(this._object.theta)
                    .premultiply( new THREE.Matrix4().makeTranslation( -lowerLegPivot[0], lowerLegPivot[1], lowerLegPivot[2] ) )
                    .premultiply( new THREE.Matrix4().makeTranslation(
                        left_lower_leg.position.x,
                        left_lower_leg.position.y,
                        left_lower_leg.position.z 
                        ));

                let right_upper_arm =  robot.getObjectByName( "right_upper_arm" );
                let left_upper_arm = robot.getObjectByName( "left_upper_arm" );
                let armPivot = [ 0.3, 3, 0 ];

                right_upper_arm.matrix
                    .makeTranslation( -armPivot[0], -armPivot[1], -armPivot[2] ) 
                    .makeRotationZ(this._object.theta*4)
                    .premultiply( new THREE.Matrix4().makeTranslation( armPivot[0], armPivot[1], armPivot[2] ) )
                    .premultiply( new THREE.Matrix4().makeTranslation(
                        right_upper_arm.position.x,
                        right_upper_arm.position.y,
                        right_upper_arm.position.z 
                        ) );

                left_upper_arm.matrix
                    .makeTranslation( -armPivot[0], -armPivot[1], -armPivot[2] ) 
                    .makeRotationZ(-this._object.theta*4)
                    .premultiply( new THREE.Matrix4().makeTranslation( armPivot[0], armPivot[1], armPivot[2] ) )
                    .premultiply( new THREE.Matrix4().makeTranslation(
                        left_upper_arm.position.x,
                        left_upper_arm.position.y,
                        left_upper_arm.position.z 
                        ) );
            
                left_upper_arm.updateMatrixWorld( true );
                right_upper_arm.updateMatrixWorld( true );
               

                torso.updateMatrixWorld( true );
                right_upper_leg.updateMatrixWorld( true );
                right_lower_leg.updateMatrixWorld( true );
                left_upper_leg.updateMatrixWorld( true );
                left_lower_leg.updateMatrixWorld( true );
                stats.update();
                renderer.render(scene, camera);    
            });


            let JumpTween = new TWEEN.Tween( {theta:0} )
            .to( {y:0.5 }, 1000)
            .onUpdate(function(){     
                let torso = robot.getObjectByName("torso");
                torso.matrix.premultiply( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ));

                torso.updateMatrixWorld( true );
                stats.update();
                renderer.render(scene, camera);    
            });
 
        CrouchTween.chain(JumpTween);
        JumpTween.delay(500);
        CrouchTween.start();       
    },
    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    }
});