function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2 }, 1500)
            .onUpdate(function(){
                let right_upper_arm =  robot.getObjectByName( "right_upper_arm" );
                let pivot = [ 0.3, 1.3, 0 ];

                right_upper_arm.matrix
                    .makeTranslation( -pivot[0], -pivot[1], -pivot[2] ) 
                    .makeRotationZ(this._object.theta)
                    .premultiply( new THREE.Matrix4().makeTranslation( pivot[0], pivot[1], pivot[2] ) )
                    .premultiply( new THREE.Matrix4().makeTranslation(
                        right_upper_arm.position.x,
                        right_upper_arm.position.y,
                        right_upper_arm.position.z 
                        ) );
               
                right_upper_arm.updateMatrixWorld( true );
                stats.update();
                renderer.render(scene, camera);    
            });
 
        let lowerArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2 }, 1000)
            .onUpdate(function(){
                let lower_arm = robot.getObjectByName("lower_arm");
                let pivot = [1, 1.3, 0];

                lower_arm.matrix
                    .makeTranslation( -pivot[0], -pivot[1], -pivot[2] )
                    .makeRotationZ(this._object.theta)
                    .premultiply( new THREE.Matrix4().makeTranslation( pivot[0], pivot[1], pivot[2] ) ) 
                    .premultiply( new THREE.Matrix4().makeTranslation(
                        lower_arm.position.x,
                        lower_arm.position.y,
                        lower_arm.position.z 
                        ) );

                lower_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            });    
        
        let handTweenLeft = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/6 }, 600)
            .onUpdate(function(){
                let hand = robot.getObjectByName("hand");

                hand.matrix
                    .makeRotationZ( this._object.theta )
                    .premultiply( new THREE.Matrix4().makeTranslation(
                        hand.position.x,
                        hand.position.y,
                        hand.position.z 
                        ));

                hand.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
        });

        let handTweenRight = new TWEEN.Tween( {theta:0} )
            .to( {theta:-Math.PI/6 }, 600)
            .onUpdate(function(){
                let hand = robot.getObjectByName("hand");

                hand.matrix
                    .makeRotationZ( this._object.theta )
                    .premultiply( new THREE.Matrix4().makeTranslation(
                        hand.position.x,
                        hand.position.y,
                        hand.position.z 
                        ));

                hand.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
        });

        upperArmTween.chain(lowerArmTween);
        lowerArmTween.chain(handTweenLeft);
        handTweenLeft.chain(handTweenRight);
        handTweenRight.chain(handTweenLeft);
        upperArmTween.start();       
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




