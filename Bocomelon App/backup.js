const alphabetPlaygroundBtn = document.querySelector('#alphabetPlaygroundBtn');
let intervalID = null;
let timeline = gsap.timeline();

document.querySelector('.logo').addEventListener('click' , () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
    if(intervalID){
        clearInterval(intervalID);
        speechSynthesis.cancel();
    }
})
const navbarBtns= document.querySelectorAll('nav ul li');
navbarBtns.forEach((navbarBtn) => {
    navbarBtn.addEventListener('click' , (event) => {
        let positionFromTop;
        if(event.target.innerText === 'Home'){
            positionFromTop = 0;
            if(intervalID){
                clearInterval(intervalID);
                speechSynthesis.cancel();
                document.body.style.overflow = 'auto';
            }
        }
        else if(event.target.innerText === 'Alphabets Playground'){
            positionFromTop = window.innerHeight; //window.innerHeight Means 100vh
        }
        else if(event.target.innerText === 'Counting Playground'){
            positionFromTop = window.innerHeight * 2; //window.innerHeight * 2 Means 200vh
            if(intervalID){
                speechSynthesis.pause();
                clearInterval(intervalID);
                document.body.style.overflow = 'auto';
            }
        }
        else if(event.target.innerText === 'Contact Us'){
            positionFromTop = window.innerHeight * 3;
            if(intervalID){
                speechSynthesis.pause();
                clearInterval(intervalID);
                document.body.style.overflow = 'auto';
            }
        }

        window.scrollTo({
            top: positionFromTop,
            behavior: 'smooth'
        })
    })
})

alphabetPlaygroundBtn.addEventListener('click' , () => {
    window.scrollTo({
        top: window.innerHeight, // Scroll down by 1 View-Port Height
        behavior: 'smooth' // Smooth scrolling
    });

    alphabetLearningGame();
})

//Alphabet Leaning Game For Kids : 
function alphabetLearningGame(){    

    //The Overflow Hidden Causes The Body To Stop Scroll, When Game Is Playing : 
    document.querySelector('body').style.overflow = 'hidden';

    const alphabets = document.querySelectorAll(".alphabet");

    //If The Interval ID Exists Which Is In Case That User Again Click On Start Game Btn, Then We'll Clear Previous Interval And Start New One :
    if(intervalID){
        clearInterval(intervalID);

        //Also, Then Resetting The Styles To Default : 
        for(let alphabet of alphabets){
            alphabet.style.backgroundColor = 'aliceblue';
            alphabet.style.color = 'grey';
            alphabet.style.border = 'none';
        }
    }

    let index = 0;

    speechSynthesis.resume();

    //Making The Arrow Function Async Because The Voices Take Time To Load, So We Will Wait For It (Synchronous) :
    intervalID = setInterval(async () => {
        
        //When All Alphabets Have Completed :
        if(index > alphabets.length - 1){
            speechSynthesis.cancel(); //Canceling The Speech
            clearInterval(intervalID); //Stopping And Clearing The Interval
            document.body.style.overflow = 'auto'; //Causes The Body To Stop Scroll, When Game Is Finished 
        }
        else{
            //We'll Create An Object And Send The Text To Be Spoken As Argument To Constructor : 
            const utterance = new SpeechSynthesisUtterance(alphabets[index].innerText);
            //Then We'll Call LoadVoices Fn To Load Voices And Will Wait For It, Till The Voices Are Loaded : 
            const voices = await loadVoices();

            //Then We'll Modify The Behaviour And The Way Speech Will Be Spoken : 
            utterance.voice = voices[1];
            utterance.lang = 'en-US'; // Language of the speech
            utterance.rate = 1.5; // Speed of the speech (0.1 to 10)
            utterance.pitch = 1.5; // Pitch of the speech (0 to 2)

            //Finally Will Tell The Browser To Speak The Utterance : 
            speechSynthesis.speak(utterance);
    
            alphabets[index].style.backgroundColor = 'aquamarine';
            alphabets[index].style.color = 'white';
            alphabets[index].style.border = '2px solid white';
    
            index++;
        }


    } , 1500)
}

//Load The Voices For Speech Synthesis Object :
function loadVoices(){
    return new Promise((resolve , reject) => {
        const voices = speechSynthesis.getVoices();

        if(voices.length > 0){
            resolve(voices);
        }
        else{
            //We Have Added An EventListener On SpeechSynthesis Which Is Global Window Object
            //That When Voice Is Changed When Voices Must Be Loaded : 
            speechSynthesis.addEventListener('onvoicechanged' , () => {
                resolve(speechSynthesis.getVoices());
            })
        }
    })
}

//When The User Loads Or Refereshes Page, Then He Is On Top Of Document : 
window.addEventListener('load', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*Utterance: This is like when the toy says something. If you press a button and it says "Hello!", that "Hello!" is the utterance.

Speech Synthesis: This is like the toy's magical power to turn written words into spoken words. So, if you type “I love ice cream,” the toy uses its magic to say those words out loud.

SpeechSynthesisUtterance: This is a special tool that tells the toy exactly what to say and how to say it. It’s like giving the toy a note that says, “Say ‘Hello!’ with a happy voice and fast speed.”*/
