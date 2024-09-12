const snakeGameContainer = document.querySelector('#snakeGameContainer');

for(let i = 1 ; i <= 625 ; i++){
    const block = document.createElement('div');
    block.setAttribute('class' , 'block');
    block.setAttribute('id' , 'block' + i);
    snakeGameContainer.append(block);
}

const snakeGameBlocks = document.querySelectorAll('.block');

let initialSnakeBlock = 'block' + 288;
let initialSnakeBlockIDNo;
let finalSnakeBlockIDNo;
let finalSnakeBlock;
let intervalID;

MovingTheSnake(initialSnakeBlock);

//Key Down Detects Special Keys Pressed Like The Arrow Keys :
document.addEventListener('keyup' , handleMovementBtns);

let snakefoodintervalID;

spawnFoodForSnake();

function handleMovementBtns(event){
    if(event.key === 'ArrowUp'){
        snakeKeyMovement(-25)
    }
    else if(event.key === 'ArrowDown'){
        snakeKeyMovement(25)
    }
    else if(event.key === 'ArrowLeft'){
        snakeKeyMovement(-1)
    }
    else if(event.key === 'ArrowRight'){
        snakeKeyMovement(1)
    }   
}

function snakeKeyMovement(directionNo){
    clearInterval(intervalID);

    intervalID = setInterval(() => {
        try {
            initialSnakeBlockIDNo = Number(initialSnakeBlock.replace('block' , ''));
            finalSnakeBlockIDNo = initialSnakeBlockIDNo + directionNo;

            if( finalSnakeBlockIDNo <= 0 || 
                finalSnakeBlockIDNo > 625 || 
                (finalSnakeBlockIDNo % 25 === 0 && directionNo === -1) || 
                (initialSnakeBlockIDNo % 25 === 0 && directionNo === 1))
            {
                clearInterval(intervalID);
                document.removeEventListener('keyup' , handleMovementBtns);
                throw new Error('Game Over');
            }
            
            finalSnakeBlock = 'block' + finalSnakeBlockIDNo;
            MovingTheSnake(finalSnakeBlock);
            RemovingTheSnake(initialSnakeBlock);
            initialSnakeBlock = finalSnakeBlock;
        }
        catch (error) {
            const loserMsg = document.createElement('h1');
            loserMsg.innerText = 'You Lost The Game!';
            document.querySelector('body').append(loserMsg);
            clearInterval(snakefoodintervalID);
        }

        const snakeBlock = document.querySelector(`#${initialSnakeBlock}`);

        if(snakeBlock.getAttribute('class').includes('food')){
            console.log('Score Upgraded');
            let audio = new Audio('SnakeFoodEatSound.mp3')
            audio.play();
            snakeBlock.classList.remove('food');
        }

    } , 120)
    
}

function MovingTheSnake(blockID){
    let snakeBlock = document.querySelector(`#${blockID}`);
    snakeBlock.classList.add('snake');
}

function RemovingTheSnake(blockID){
    let snakeBlock = document.querySelector(`#${blockID}`);
    snakeBlock.classList.remove('snake');
}

function spawnFoodForSnake(){
    const randomBlockID = 'block' + (Math.floor(Math.random() * 625) + 1) ;
    const randomBlock = document.querySelector(`#${randomBlockID}`);
    randomBlock.classList.add('food');

    clearInterval(snakefoodintervalID);

    setTimeout(() => {
        randomBlock.classList.remove('food');
    }, 5000)

    snakefoodintervalID = setInterval(spawnFoodForSnake , 7000);
}