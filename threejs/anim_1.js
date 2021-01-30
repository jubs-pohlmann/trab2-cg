function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2 }, 2000)
            .onUpdate(function(){
                let right_upper_arm = robot.getObjectByName( "right_upper_arm" );

                let [x, y, z] = [right_upper_arm.position.x, right_upper_arm.position.y, right_upper_arm.position.z];
                let pivot = { x: 0, y: 2, z: 0 };

                right_upper_arm.matrix.makeTranslation(0, 0, 0 )
                    .premultiply( new THREE.Matrix4().makeTranslation( -pivot.x, -pivot.y, -pivot.z ) )
                    .premultiply( new THREE.Matrix4().makeRotationZ( this._object.theta ))
                    .premultiply( new THREE.Matrix4().makeTranslation( pivot.x, pivot.y, pivot.z))
                    .premultiply( new THREE.Matrix4().M)
               


                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            });
        // Here you may include animations for other parts 
        let lowerArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2 }, 2000)
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 
                let lower_arm = robot.getObjectByName("lower_arm");
                lower_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(1, -1, 0 ) );    
                lower_arm.updateMatrixWorld(true);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            });    
        
        let handTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2 }, 2000)
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 
                let hand = robot.getObjectByName("hand");
                hand.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(Math.cos(1.57), -Math.sin(1.57), 0 ) );    
                hand.updateMatrixWorld(true);

                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
        });

        //  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        upperArmTween.chain(lowerArmTween);
        lowerArmTween.chain(handTween);
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




