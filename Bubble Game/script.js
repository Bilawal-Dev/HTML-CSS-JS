document.querySelector('body').addEventListener('keypress' , (event) => {
    if(event.key === 'Enter' || event.key === ' '){
        let audio = new Audio('GameStartButton.mp3')
        audio.play();
        bubbleGame();
    }
});

function bubbleGame()
{
    const bubblesInterfaceField = document.querySelector('#bubblesInterface')
    const hitDisplay = document.querySelector('#displayHit');
    const timeDisplay = document.querySelector('#displayTime');
    const scoreDisplay = document.querySelector('#displayScore');

    let randomNo;
    let score = 0;
    let targetBubble;
    let timeCountDown;
    let intervalID;
    let winCheckFlag = false;

    let bubbleHitAudio = new Audio('BubbleHit.mp3')
    let wrongBubbleHitAudio = new Audio('WrongBubbleHit.mp3')

    bubbleFieldSetup();
    
    function bubbleFieldSetup()
    {
        let bubbles = '';
        
        for(let i = 1 ; i <= 102 ; i++)
        {  
            randomNo = Math.floor(Math.random() * 9) + 1;
            bubbles = bubbles + `<div class="bubble">${randomNo}</div>`;
        }
        
        bubblesInterfaceField.innerHTML = bubbles;
        bubbleHitDisplay();
        timer();

        document.querySelectorAll('.bubble').forEach((hitBubble) => {
            hitBubble.addEventListener('click' , () => {
                if(targetBubble == hitBubble.innerHTML && timeCountDown != 0){
                    bubbleHitAudio.play();
                    clearInterval(intervalID)
                    scoreCount()
                    if(!winCheckFlag)
                        bubbleFieldSetup()
                }
                else if(targetBubble != hitBubble.innerHTML)
                {
                    wrongBubbleHitAudio.play();
                }
                
            })
        })
    }

    function bubbleHitDisplay(){
        targetBubble = Math.floor(Math.random() * 9) + 1
        hitDisplay.innerHTML = targetBubble;
    }

    function timer(){
        if(score < 50)
            timeCountDown = 6;
        else
            timeCountDown = 4;
    
        intervalID = setInterval(() => {
            timeCountDown--;
            timeDisplay.innerHTML = timeCountDown;
            if(timeCountDown === 0 ){
                let audio = new Audio('LoseGame.mp3')
                audio.play();
                bubblesInterfaceField.innerHTML = '<h2>Game-Over</h2>';
                clearInterval(intervalID);
            }
        } , 1000);
    }

    function scoreCount(){
        score = score + 10;
        scoreDisplay.innerHTML = score;
        if(score === 100){
            winCheckFlag = true;
            win();
        }
    }

    function win(){
        let audio = new Audio('WinMusic.mp3')
        audio.loop = true;
        audio.play();
        bubblesInterfaceField.innerHTML = '<h2>You Won The Game</h2>';
        document.querySelector('.confetti').style.display = 'block';
    }
}