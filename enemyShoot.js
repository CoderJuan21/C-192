AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 1000)
    },
    shootEnemyBullet: function () {
var els = document.querySelectorAll(".enemy")
//    console.log(els)  
for(var i=0;i<els.length;i++){
    var enemyBullet = document.createElement("a-entity")
    enemyBullet.setAttribute("geometry",{primitive:"sphere",radius:0.1})
    enemyBullet.setAttribute("material","color","#362b1f")
    var position = els[i].getAttribute("position")
    enemyBullet.setAttribute("position",{
        x:position.x,
         y:position.y,
         z:position.z
    })
    var scene = document.querySelector("#scene")
    scene.appendChild(enemyBullet)

    var position1 = new THREE.Vector3()
    var position2 = new THREE.Vector3()

    var enemy = els[i].object3D

    //might not work, You changed "#weapon" to "#camera"
    var player = document.querySelector("#camera").object3D

    player.getWorldPosition(position1)
    enemy.getWorldPosition(position2)

    var direction = new THREE.Vector3()
    direction.subVectors(position1,position2).normalize()
    enemyBullet.setAttribute("velocity",direction.multiplyScalar(15))
    enemyBullet.setAttribute("dynamic-body",{shape:"sphere",mass:"0"})

    var element = document.querySelector("#countLife")
    var playerLife = parseInt(element.getAttribute("text").value)
    enemyBullet.addEventListener("collide",function(e){
        //might not work here too "#weapon"
        if(e.detail.body.el.id === "camera"){
            if(playerLife > 0){
                playerLife -= 1
                element.setAttribute("text",{value:playerLife})
            }
            if(playerLife <= 0){
                var text = document.querySelector("#over")
                text.setAttribute("visible",true)
                var tankEl = document.querySelectorAll(".enemy")
                for(var i=0;i<tankEl.length;i++){
                    scene.removeChild(tankEl[i])
                }
            }
        }
    })
}   
    },

});