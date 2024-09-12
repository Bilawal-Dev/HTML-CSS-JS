let userscore = 0;
let computerscore = 0;

//Selecting All The Buttons:
const choices = document.querySelectorAll(".gamebtn");
const msgbox = document.querySelector(".messagecontainer");
const msg = document.querySelector("#displaymsg");
const user_score = document.querySelector("#userscore");
const computer_score = document.querySelector("#computerscore");

//Running A For Each Loop To Traverse On The 3 Buttons:
choices.forEach((choice) => {
    //Event Listener To Do Work When Any Of 3 Buttons Is Clicked:
    choice.addEventListener("click" , () => {
        //Getting The Id(rock,paper,scissor) Of Each Clicked Button And Storing It In The Const Variable:
        const userchoice = choice.getAttribute("id");
        console.log("Game Button Is Clicked!!!");
        //Calling The playgame Fn And Passing The userchoice Variable As An Argument:
        playgame(userchoice);
    })
})

//Generating The Choice Of Computer:
const genComputerChoice = () => {
    const options = ["rock" , "paper" , "scissors"];
    const randomindex = Math.floor(Math.random() * 3);
    return options[randomindex];
}

//Playing The Game And Writing Its Logic:
const playgame = (userchoice) => {
    console.log(userchoice);
    const computerchoice = genComputerChoice();
    console.log(computerchoice);

    if(userchoice === computerchoice)
    {
        draw();
    }
    else
    {
        let result;

        if(userchoice === 'rock')
        {
            if(computerchoice === 'paper')
            {
                result = 0;
            }
            else
            {
                result = 1;
            }
        }
        else if(userchoice === 'paper')
        {
            if(computerchoice === 'scissors')
            {
                result = 0;
            }
            else
            {
                result = 1;
            }
        }
        else
        {
            if(computerchoice === 'paper')
            {
                result = 1;
            }
            else
            {
                result = 0;
            }
        }

        WinnerFn(result , userchoice , computerchoice);
    }
}

//Drawing A Game When UserChoice = CompChoice:
const draw = () => {
    msgbox.classList.remove("win" , "lose");
    console.log("Game Was Draw");
    msg.innerText = "Game Draw. Play Again!"
}

//Showing The Winner:
const WinnerFn = (result , userchoice , computerchoice) => {
    if(result === 1)
    {
        msgbox.classList.remove("lose");
        console.log("User Win!!!");
        msg.innerText = `Victory! Your ${userchoice} beats ${computerchoice}`
        msgbox.classList.add("win");
        userscore++;
        user_score.innerText = userscore;
    }
    else
    {
        msgbox.classList.remove("win");
        console.log("Computer's Win!!!");
        msg.innerText = `Defeat! ${computerchoice} beats your ${userchoice}`
        msgbox.classList.add("lose");
        computerscore++;
        computer_score.innerText = computerscore;
    }
}