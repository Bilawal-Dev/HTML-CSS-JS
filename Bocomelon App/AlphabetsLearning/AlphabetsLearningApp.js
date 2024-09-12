//Alphabet Leaning Game For Kids : 
function alphabetLearningGame(){

    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    })

    //The Overflow Hidden Causes The Body To Stop Scroll, When Game Is Playing : 
    document.querySelector('body').style.overflow = 'hidden';

    const alphabets = document.querySelectorAll(".alphabet");

    if(!intervalID1){
        const startHeading = document.querySelector('.alphabetPlaygroundContainer h1');
        startHeading.remove();

        timeline.fromTo(alphabets,
            {opacity : 0 , scale : 0.5},
            {opacity : 1 , scale : 1 , duration: 1 , delay : 1}
        )

        const resetHeading = document.querySelector('.resetAlphabetPlayground');
        resetHeading.style.display = 'flex';
    }

    //If The Interval ID Exists Which Is In Case That User Again Click On Start Game Btn, Then We'll Clear Previous Interval And Start New One :
    if(intervalID1){
        clearInterval(intervalID1);
    }
    
    let index = 0;
    
    speechSynthesis.resume();
    
    //Making The Arrow Function Async Because The Voices Take Time To Load, So We Will Wait For It (Synchronous) :
    intervalID1 = setInterval(async () => {
        
        //When All Alphabets Have Completed :
        if(index > alphabets.length - 1){
            speechSynthesis.cancel(); //Canceling The Speech
            clearInterval(intervalID1); //Stopping And Clearing The Interval
            document.body.style.overflow = 'auto'; //Causes The Body To Stop Scroll, When Game Is Finished 
        }
        else{
            //We'll Create An Object And Send The Text To Be Spoken As Argument To Constructor : 
            const utterance = new SpeechSynthesisUtterance(alphabets[index].innerText);
            
            //Then We'll Call LoadVoices Fn To Load Voices And Will Wait For It, Till The Voices Are Loaded : 
            voices = await loadVoices();

            //Then We'll Modify The Behaviour And The Way Speech Will Be Spoken : 
            utterance.voice = voices[1];
            utterance.lang = 'en-US'; // Language of the speech
            utterance.rate = 1.5; // Speed of the speech (0.1 to 10)
            utterance.pitch = 1.5; // Pitch of the speech (0 to 2)

            //Finally Will Tell The Browser To Speak The Utterance : 
            speechSynthesis.speak(utterance);
            console.log("Speaking : " , alphabets[index].innerText)
    
            alphabets[index].style.backgroundColor = 'aquamarine';
            alphabets[index].style.color = 'white';
            alphabets[index].style.border = '2px solid white';
    
            index++;
        }
    } , 1500)
}

/*Utterance: This is like when the toy says something. If you press a button and it says "Hello!", that "Hello!" is the utterance.

Speech Synthesis: This is like the toy's magical power to turn written words into spoken words. So, if you type “I love ice cream,” the toy uses its magic to say those words out loud.

SpeechSynthesisUtterance: This is a special tool that tells the toy exactly what to say and how to say it. It’s like giving the toy a note that says, “Say ‘Hello!’ with a happy voice and fast speed.”*/

const resetAlphabetPlayground = document.querySelector('.resetAlphabetPlayground');
resetAlphabetPlayground.addEventListener('click' , () => {
    const alphabets = document.querySelectorAll('.alphabet');
    alphabets.forEach((alphabet) => {
        alphabet.style.backgroundColor = 'aliceblue';
        alphabet.style.color = 'lightslategrey';
    })

    alphabetLearningGame();
})