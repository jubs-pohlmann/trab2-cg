function RemoveHeadAnimation() {}

Object.assign( RemoveHeadAnimation.prototype, {

    init: function() {
        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI }, 1500)
            .onUpdate(function(){
                let right_upper_arm =  robot.getObjectByName( "right_upper_arm" );
                let pivot = [ 0.3, 3, 0 ];

                right_upper_arm.matrix
                    .makeTranslation( -pivot[0], -pivot[1], -pivot[2] ) 
                    .makeRotationZ(this._object.theta)
                    .premultiply( new THREE.Matrix4().makeTranslation( pivot[0], pivot[1], pivot[2] ) )
                    .premultiply( new THREE.Matrix4().makeTranslation(
                        right_upper_arm.position.x,
                        right_upper_arm.position.y,
                        right_upper_arm.position.z 
                        ));
               
                right_upper_arm.updateMatrixWorld( true );
                stats.update();
                renderer.render(scene, camera);    
            });
 
        let lowerArmLeftTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/4 }, 1000)
            .onUpdate(function(){
                let lower_arm = robot.getObjectByName("lower_arm");
                let pivot = [1, 0.5, 0];

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
        
        let lowerArmRightTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:-Math.PI/6 }, 600)
            .onUpdate(function(){
                let lower_arm = robot.getObjectByName("lower_arm");
                let pivot = [-0.5, 0.5, 0];

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

        let headRemoveTween = new TWEEN.Tween( {theta:0} )
            .to( {x: 100, y: 100 }, 600)
            .onUpdate(function(){
                let head = robot.getObjectByName("head");

                head.matrix
                    .makeTranslation( new THREE.Matrix4().makeTranslation( this._object.x, this._object.y, 0 ) )
                    .premultiply( new THREE.Matrix4().makeTranslation(
                        head.position.x,
                        head.position.y,
                        head.position.z 
                        ) );
                head.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
        });


        upperArmTween.chain(lowerArmLeftTween);
        lowerArmLeftTween.chain(lowerArmRightTween);
        lowerArmRightTween.chain(headRemoveTween);
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