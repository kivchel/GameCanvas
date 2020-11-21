const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let player = {
    x1: canvas.width / 4,
    y1: canvas.height / 4,
    width: 10,
    height: 10,
    delta: 5,
    color: "#000000",

    get x2() {
        return this.x1 + this.width;
    },
    get y2() {
        return this.y1 + this.height;
    }
}

let keys = {}

let wall = {
    x1: 200,
    y1: 200,
    width: 50,
    height: 40,
    color: "#ff0000",
    get x2() {
        return this.x1 + this.width;
    },
    get y2() {
        return this.y1 + this.height;
    }
}

document.addEventListener("keydown", (e) => {
    const key = e.code;
    keys[key] = true;
});

document.addEventListener("keyup", (e) => {
    const key = e.code;
    keys[key] = false;
});

function checkCollision(a, b) {
    const aCollidesBTop = a.y2 >= b.y1;
    const aCollidesBBottom = a.y1 <= b.y2;
    const aCollidesBLeft = a.x2 >= b.x1;
    const aCollidesBRight = a.x1 <= b.x2;

    const yCollision = aCollidesBTop && aCollidesBBottom;
    const xCollision = aCollidesBLeft && aCollidesBRight;

    const hasCollision = yCollision && xCollision;

    const [aHalfWidth, aHalfHeight, bHalfWidth, bHalfHeight] = [
        (a.x2 - a.x1) / 2,
        (a.y2 - a.y1) / 2,
        (b.x2 - b.x1) / 2,
        (b.y2 - b.y1) / 2,
    ];

    const [aXCenter, aYCenter, bXCenter, bYCenter] = [
        aHalfWidth + a.x1,
        aHalfHeight + a.y1,
        bHalfWidth + b.x1,
        bHalfHeight + b.y1,
    ];

    const [deltaX, deltaY] = [
        aXCenter - bXCenter,
        aYCenter - bYCenter
    ];

    console.log({deltaX, deltaY});

    if (hasCollision) {
        if (
            (deltaX < 0 && keys["ArrowRight"]) ||
            (deltaX > 0 && keys["ArrowLeft"]) ||
            (deltaY > 0 && keys["ArrowUp"]) ||
            (deltaY < 0 && keys["ArrowDown"])
        ){
            player.delta = 0;
        } else {
            player.delta = 5;
        }

        player.color = '#00ff00';
    } else {
        player.color = '#000000';
    }
}

// Обновление
function update() {
    checkCollision(player, wall);

    if (keys["ArrowRight"]) player.x1 += player.delta;
    if (keys["ArrowLeft"]) player.x1 -= player.delta;
    if (keys["ArrowDown"]) player.y1 += player.delta;
    if (keys["ArrowUp"]) player.y1 -= player.delta;
}

// Отрисовка
function render() {
    ctx.clearRect(0, 0, 600, 400);
    ctx.fillStyle = wall.color;
    ctx.fillRect(wall.x1, wall.y1, wall.width, wall.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x1, player.y1, player.width, player.height);
}

function main() {
    update();
    render();

    requestAnimationFrame(main);
}

main();
