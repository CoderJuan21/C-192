AFRAME .registerComponent("player-movement",{
    init:function(){
this.walk()
    },

    walk:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key==="ArrowDown"){
                var entity = document.querySelector("#sound2")
                entity.components.sound.playSound()
            }

            if(e.key === "q"){
                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction)
                camera.setAttribute("velocity",direction.multiplyScalar(-100))
            }
        })
        if(camera.velocity === 0){
            var entity = document.querySelector("#sound2")
            entity.components.sound.stopSound()
        } 
    }
})