AFRAME .registerComponent("bullets",{
    init:function(){
        this.shootBullet()
    },
    
    shootBullet:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "e"){
                this.shootSound()
                var bullet = document.createElement("a-entity")
                bullet.setAttribute("geometry",{primitive:"box",height:0.01,width:0.0000000001})
                bullet.setAttribute("material","color","#ec3333")
    
                var cam = document.querySelector("#camera-rig");
                pos = cam.getAttribute("position");

                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")
                bullet.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z})
                bullet.setAttribute("rotation",{x:0,y:0,z:0})
                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction)
                bullet.setAttribute("velocity",direction.multiplyScalar(-5))
                var scene = document.querySelector("#scene")
                bullet.setAttribute("dynamic-body",{
                    shape:'box',
                    mass:"0",
                })
                bullet.addEventListener("collide",this.removeBullet)
                scene.appendChild(bullet)
            }
        })
    },
    
    removeBullet: function (e) {
        //bullet element
        var element = e.detail.target.el;
    
        //element which is hit
        var elementHit = e.detail.body.el;
        if (elementHit.id.includes("box")) {
          elementHit.setAttribute("material", {
            opacity: 1,
            transparent: true,
          });
    
          //impulse and point vector
          var impulse = new CANNON.Vec3(-2, 2, 1);
          var worldPoint = new CANNON.Vec3().copy(
            elementHit.getAttribute("position")
          );
    
          elementHit.body.applyImpulse(impulse, worldPoint);

          if (elementHit.id.includes("enemy")) {
           
            scene.removeChild(elementHit);
          }
    
          //remove event listener
          element.removeEventListener("collide", this.removeBullet);
    
          //remove the bullets from the scene
          var scene = document.querySelector("#scene");
          scene.removeChild(element);
        }
      },
      shootSound:function(){
        var entity = document.querySelector("#sound1")
        entity.components.sound.playSound()
    }
    })