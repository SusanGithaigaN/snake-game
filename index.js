// board
// Boxsize
var blockSize = 25;
// number of rows
var rows = 20;
// number of columns
var cols= 20;
var board;
var context

// draw the snake head
var snakeX = blockSize*5;
var snakeY = blockSize*5;

// snake speed
var velocityX = 0;
var velocityY = 0;

// snake body
var snakeBody = [];

// draw the food
var foodX;
var foodY;

// game over
var gameOver = false;

window.onload =  function (){
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    // used for drawing on the board.
    context = board.getContext("2d");
    
    placeFood();
    // move the snake
    document.addEventListener('keyup', changeDirection);
    // update();
    // call the update(); function everytime the snake moves(every 100 milliseconds)
    setInterval(update, 1000/10);
}

function update(){
    // stop updating the canvas once the game is over
    if(gameOver){
        return;
    }

    context.fillStyle = "black";
    // context.style.borderStyle = "dotted";
    context.fillRect(0, 0, board.width, board.height);

    context .fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // do something when the snake collides with the food
    if(snakeX == foodX && snakeY == foodY){
        // grow the snake
        snakeBody.push(foodX, foodY);
        placeFood();
    }

    // snake color
    context.fillStyle = "lime";
    // update the snake X and Y position and add the velocity
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i=0; i< snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    // game over conditions
        // going over the game grid
        if(snakeX < 0 || snakeX > cols*blockSize || snakeY< 0 || snakeY> rows*blockSize){
            gameOver = true;
            alert("Game Over");
        }
        // bumping over the snake body parts
        for(let i = 0; i< snakeBody.length; i++){
            if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
                gameOver =true;
                alert("Game Over");
            }
        }

    // move the body and grow the tail
    for(let i= snakeBody.length-1; i>0; i--){
        snakeBody[i] =snakeBody[i-1];
    }

    // update the second segment to move to the head's place
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }
}

function changeDirection(e){
    // pass in the key event
    if(e.code == "ArrowUp" && velocityY != 1){
        // change the velocity
        velocityX = 0;
        velocityY = -1;
    }else if(e.code == "ArrowDown" && velocityY != 1){
        // change the velocity
        velocityX = 0;
        velocityY = 1;
    }else if(e.code == "ArrowLeft" && velocityX != 1){
        // change the velocity
        velocityX = -1;
        velocityY = 0;
    } else if(e.code == "ArrowRight" && velocityX != -1){
        // change the velocity
        velocityX = 1;
        velocityY = 0;
    }
}

// create a function  that would randomly place the food in an X and Y co-ordinate.
function placeFood(){
    // (0-1) * cols ->(0-19.999999) -> (0 -19) *25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY =  Math.floor(Math.random() * rows) * blockSize;
}