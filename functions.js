var score = 0;
var snake = [];
var directionI = 0;
var directionJ = 0;
var headI = 12;
var headJ = 12
var speed = 1.5;
var oneMove = false;

function createBoard() {
    for (var i = 0; i < 25; ++i) {
        for(var j = 0; j < 25; ++j) {
            var cell = document.createElement("div");
            cell.classList.add("cells");
            cell.id = i.toString() + "-" + j.toString();
            if (i == 0 || i == 24 || j == 0 || j == 24) {
                cell.classList.add("wall-cell");
            }
            document.getElementById("board").append(cell);
        }
    } 
}

window.onload = function() {
    createBoard();
    snake[0] = headI.toString() + "-" + headJ.toString();
    document.body.addEventListener("keydown", setDirection);
    document.getElementById(snake[0]).classList.add("snake");
    createFood();
    moveSnake();
}

function setDirection(key) {
    if (key.keyCode === 39 && directionJ != -1 && oneMove == false) {
        directionI = 0;
        directionJ = 1;
        oneMove = true;
    } else if (key.keyCode === 38 && directionI != 1 && oneMove == false) {
        directionI = -1;
        directionJ = 0;
        oneMove = true;
    } else if (key.keyCode === 37 && directionJ != 1 && oneMove == false) {
        directionI = 0;
        directionJ = -1;
        oneMove = true;
    }else if (key.keyCode === 40 && directionI != -1 && oneMove == false) {
        directionI = 1;
        directionJ = 0;
        oneMove = true;
    }
}

function moveSnake() {
    var run = true;
    var afterTail = snake[snake.length - 1];
    if (directionI != 0 || directionJ != 0) {
        for (var i = snake.length - 1; i > 0; --i) {
            snake[i] = snake[i - 1];
        }
        document.getElementById(afterTail).classList.remove("snake");
    }
    headI += directionI;
    headJ += directionJ;
    var nextCell = headI.toString() + "-" + headJ.toString();
    if (snake.length > 1 && document.getElementById(nextCell).classList.contains("snake")) {
        run = false;
        document.getElementById(nextCell).style.backgroundColor = "red";
    }
    if (!document.getElementById(nextCell).classList.contains("wall-cell")) {
        snake[0] = nextCell;
        document.getElementById(snake[0]).classList.add("snake");
        if (run == true) {
            setTimeout(moveSnake, 1000 / speed);
        }
    } else {
        document.getElementById(nextCell).style.backgroundColor = "red";
    }
    if (document.getElementById(snake[0]).classList.contains("food")) {
        document.getElementById(snake[0]).classList.remove("food");
        document.getElementById("score").innerText = ++score;
        //score represent snake.lenght - 1;
        snake[score] = afterTail;
        document.getElementById(snake[score]).classList.add("snake");
        speed += 0.05;
        createFood();
    }
    oneMove = false;
}

function createFood() {
    do {
    foodI = Math.floor(Math.random() * 23 + 1).toString();
    foodJ = Math.floor(Math.random() * 23 + 1).toString();
    } while (document.getElementById(foodI + "-" + foodJ).classList.contains("snake"))
    document.getElementById(foodI + "-" + foodJ).classList.add("food");
}
