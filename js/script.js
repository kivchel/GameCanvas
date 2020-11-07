const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let player = {
    x: canvas.width / 4,
    y: canvas.height / 4,
    width: 10,
    height: 10,
    delta: 1,
    color: "#000000"
}
let keys = {

}

let wall = {
    x: 200,
    y: 200,
    width: 50,
    height: 40,
    color: "#ff0000"

}
document.addEventListener("keydown", (e) => {
    const key = e.code;
    keys[key] = true;

})

document.addEventListener("keyup", (e) => {
    const key = e.code;
    keys[key] = false;

})
function checkCollision(obj1, obj2) {
    let xp = obj1.x + obj1.width >= obj2.x;
    //let yb = obj1.y + obj1.height >= obj2.y;
   // let yt = obj1.y <= obj2.y + obj2.height;
let xl = obj1.x <= obj2.x + obj2.width;

    let yt = obj1.y + obj1.height >= obj2.y;
    let yb = obj1.y <= obj2.y + obj2.height;
    let collided = xp && yb && yt && xl;
   // const c=0;
    if (collided) {
//c++;
        player.color = "#00ff00";
//console.log("xp="+xp);
       // console.log("xl="+xl);
      console.log("yt="+yt);
       console.log("yb="+yb);
       if (obj1.x <= obj2.x) {
           if(  keys["ArrowRight"] )player.delta = 0;
           else player.delta = 3;
           return;
        }
        
        if (obj1.x >= obj2.x ) {
           if(keys["ArrowLeft"]) player.delta = 0;
           else player.delta = 3;
            return;
        }

        if (obj1.y+obj1.height > obj2.y  ) {
            if(keys["ArrowDown"]) player.delta = 0;
            else player.delta = 3;
             return;
         }
      
         if (obj1.y <= obj2.y+obj2.height ) {
            if(keys["ArrowUp"]) player.delta = 0;
            else player.delta = 3;
             return;
         }
      
    }
    else {
        
        player.color = "#000000";
    }
}

//обновление
function update() {
    checkCollision(player, wall);
   // player.delta = 3;
    if (keys["ArrowRight"]) player.x += player.delta;
    if (keys["ArrowLeft"]) player.x -= player.delta;
    if (keys["ArrowDown"]) player.y += player.delta;
    if (keys["ArrowUp"]) player.y -= player.delta;
    
}
//отрисовка
function render() {
    ctx.clearRect(0, 0, 600, 400);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = wall.color;
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
}
function main() {
    update();
    render();
    requestAnimationFrame(main);
}



main();
