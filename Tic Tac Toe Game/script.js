const startGameInterface = document.querySelector('#startingMenu');
const startGameBtn = document.querySelector("#startGame");
const firstTurnInterface = document.querySelector('#firstTurn');
const currentPlayerTurn = document.querySelector('#currentPlayer');
const gameInterface = document.querySelector('#container');

let timeline = gsap.timeline();

//Adding Animations To The Headings For Displaying Information :
timeline.fromTo('#startingMenu h1' , 
    {scale : 0.5 , opacity : 0},
    {scale : 1 , opacity : 1 , duration  : .8}
)
timeline.fromTo('#startingMenu input' ,
    {scale : 0.5 , opacity : 0},
    {scale : 1 , opacity : 1 , duration  : .5}
)
timeline.fromTo('#startingMenu button' , 
    {y : 100 , opacity : 0},
    {y : 0 , opacity : 1 , duration : .5}
)

//Playing Sound When Input Element Is Focused :
document.querySelectorAll('#startingMenu input').forEach((inputField) => {
    inputField.addEventListener('focus' , () => {
        let audio = new Audio('UserInputVoice.mp3')
        audio.play();
    })
})

//Starting The Game, When Button Is Clicked :
startGameBtn.addEventListener('click' , () => {
    let audio = new Audio('GameStartButton.mp3')
    audio.play();

    startGameInterface.style.display = 'none';
    gameInterface.style.display = 'block';
    
    //Taking Out Values From The Input Elements :
    let player1 = document.querySelector('#player1').value;
    let player2 = document.querySelector('#player2').value;

    //If The Input Fields Are Empty, Then Explicitly Assigning Value :
    if(player1 === '')
        player1 = 'Player1';
    
    if(player2 === '')
        player2 = 'Player2';

    TicTacToeGame(player1 , player2);
})

//Tic-Tac-Toe Game Function :
function TicTacToeGame(player1 , player2){
    //Variable To Track No Of Turns To Check For Draw Condition
    let noOfTurns = 0;

    let gameplayMusic = new Audio('GameplayMusic.mp3');
    gameplayMusic.loop = true;
    gameplayMusic.volume = 0.2;
    gameplayMusic.play();

    const boxes = document.querySelectorAll(".box");

    let turn;
    let winner = undefined;
    
    //Using Dummy Data Array Data Structure, To Mark Tick -> 1 And Cross -> 0 , To Evaluate Winning Condition : 
    let trackArray = [
        [ 'a' , 'b' , 'c' ],
        [ 'd' , 'e' , 'f' ],
        [ 'g' , 'h' , 'i' ]
    ]
    
    //Generates 1 Or 0 , To Randomize First Player Turn :
    if(Math.floor(Math.random() * 2) === 0)
        turn = player1;
    else
        turn = player2;

    firstTurnInterface.style.display = 'block';
    firstTurnInterface.innerHTML = 'First Turn Is Of :  ' + turn;
    timeline.from(firstTurnInterface , 
        {y : -100 , opacity : 0 , duration : .5}
    )

    currentPlayerTurn.style.display = 'block';
    currentPlayerTurn.innerHTML = 'Current Player Turn : ' + turn;
    timeline.from(currentPlayerTurn , 
        {x : -100 , opacity : 0 , duration : .5}
    )

    //Looping Over All The Boxes, To Check For Box That Is Clicked :
    boxes.forEach((box) => {
        box.addEventListener('click' , handleClickFn); //We Have Passed Function Here, Instead Of 
    })                                                 //Call Back Function Because We Will Remove The Function
                                                       //From Event Listener Upon Win

    //Function Executed When A Box Is Clicked :
    function handleClickFn(event){
        let audio = new Audio('DrawTickCross.mp3')
        audio.volume = 1.0
        audio.play();
        firstTurnInterface.style.display = 'none';
        drawFn(event.target); //Target Has The Element On Which Event Has Occured, i.e box
    }

    //Function To Draw The Tick And Cross On Game Interface :
    function drawFn(box){
        //Checking If The Clicked Box Already Contains Tick Or Cross :
        const tickCheck = box.classList.contains('tick')
        const crossCheck = box.classList.contains('cross')

        if(turn === player1 && !tickCheck && !crossCheck)
        {
            currentPlayerTurn.innerHTML = 'Current Player Turn : ' + player2;
            arrayValueSet(box , true)   //Calling ArrayValueSet Function To Mark 1 For Ticked Box :
            box.classList.add('tick');
            noOfTurns++;
            evaluateFn();        //Calling The Evaluate Function To Check For Winning Pattern:
            turn = player2;     //Toggling The Player Turn
        }
        else if(turn === player2 && !tickCheck && !crossCheck)
        {
            currentPlayerTurn.innerHTML = 'Current Player Turn : ' + player1;
            arrayValueSet(box , false)  //Calling ArrayValueSet Function To Mark 0 For Crossed Box :
            box.classList.add('cross');
            noOfTurns++;
            evaluateFn();        //Calling The Evaluate Function To Check For Winning Pattern:
            turn = player1;     //Toggling The Player Turn

        }
    }

    //Function To Mark 0 And 1 On The Array Data Structure :
    function arrayValueSet(box , check){
        let setValue;
        if(check)
            setValue = 1;
        else 
        setValue = 0;
        
        //Marking The 0 Or 1 To Corresponding Clicked Box By Matching With Right ID :
        if(box.id === 'box1')
            trackArray[0][0] = setValue;
        else if(box.id === 'box2')
            trackArray[0][1] = setValue;
        else if(box.id === 'box3')
            trackArray[0][2] = setValue;
        else if(box.id === 'box4')
            trackArray[1][0] = setValue;
        else if(box.id === 'box5')
            trackArray[1][1] = setValue;
        else if(box.id === 'box6')
            trackArray[1][2] = setValue;
        else if(box.id === 'box7')
            trackArray[2][0] = setValue;
        else if(box.id === 'box8')
            trackArray[2][1] = setValue;
        else if(box.id === 'box9')
            trackArray[2][2] = setValue;
    }

    //Evaluate Function To Check For Winning Pattern :
    function evaluateFn(){
        let i = 0;
        let j = 0;
        for(i = 0 ; i < 3 ; i++)
        {
            j = 0;
            //Horizontal Rows :
            if(trackArray[i][j] === trackArray[i][j+1] && trackArray[i][j] === trackArray[i][j+2])
                winFun();
            //Vertical Coloumns :
            else if(trackArray[j][i] === trackArray[j+1][i] && trackArray[j][i] === trackArray[j+2][i])
                winFun();
        }
            //Diagonal Check :
        if(trackArray[0][0] === trackArray[1][1] && trackArray[0][0] === trackArray[2][2])
            winFun();
        else if(trackArray[0][2] === trackArray[1][1] && trackArray[0][2] === trackArray[2][0])
            winFun();
        
        if(noOfTurns === 9 && winner === undefined)
        {
            gameDrawFn();
        }

    }

    //Win Function To Display The Winner :
    function winFun(){
        winner = turn;
        
        gameplayMusic.volume = 0
        let audio = new Audio('WinMusic.mp3')
        audio.loop = true;  //Playing Winning Audio On Loop
        audio.play();

        //Since, Game Is Over, So Removing The Function When Further Button Is Clicked , So That No More Tick/Cross :
        boxes.forEach((box) => {
            box.removeEventListener('click' , handleClickFn)
        })
    
        const winnerDisplay = document.querySelector('#winnerDisplay');
        const winninganimation = document.querySelector('.confetti');
        gameInterface.style.scale = 0.9;
        winninganimation.style.display = 'flex';  //Displaying Winning Animation From Display None :
        currentPlayerTurn.style.display = 'none'; 
        winnerDisplay.innerHTML = 'The Winner Of The Game Is : ' + winner; 
        winnerDisplay.style.display = 'block';
    }

    function gameDrawFn(){
        gameplayMusic.volume = 0
        let audio = new Audio('GameDrawMusic.wav')
        audio.volume = 0.5
        audio.play();

        //Since, Game Is Over, So Removing The Function When Further Button Is Clicked , So That No More Tick/Cross :
        boxes.forEach((box) => {
            box.removeEventListener('click' , handleClickFn)
        })

        const drawDisplay = document.querySelector('#winnerDisplay');
        gameInterface.style.scale = 0.9;
        currentPlayerTurn.style.display = 'none'; 
        drawDisplay.innerHTML = 'The Game Is Draw. Refresh To Play Again'; 
        drawDisplay.style.display = 'block';

    }
}