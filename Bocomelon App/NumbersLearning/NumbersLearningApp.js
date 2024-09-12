function numberLearningGame(){

    window.scrollTo({
        top: window.innerHeight * 2,
        behavior: 'smooth'
    })

    document.querySelector('body').style.overflow = 'hidden';

    const numbers = document.querySelectorAll('.number');

    let index = 0;

    if(!intervalID2){
        const startHeading = document.querySelector('.numberPlaygroundContainer h1');
        startHeading.remove();
        const startImage = document.querySelector('.numberPlaygroundContainer img');
        startImage.remove();

        timeline.fromTo(numbers,
            {opacity : 0 , scale : 0},
            {opacity : 1 , scale : 1 , duration: 1 , delay : 1}
        )

        const resetHeading = document.querySelector('.resetNumberPlayground');
        resetHeading.style.display = 'flex';
    }

    if(intervalID2){
        clearInterval(intervalID2);
    }

    intervalID2 = setInterval(async () => {
        if(index > numbers.length - 1){
            clearInterval(intervalID2);
            document.querySelector('body').style.overflow = 'auto';
        }
        else{
            numbers[index].style.color = 'orange';
            timeline.fromTo(numbers[index] ,
                {},
                {fontSize : '0.5rem' , duration : .5}
            )
            numbers[index].style.fontWeight = 'bold';

            for(let str of numbers[index].innerText){
                if(str !== '\n'){
                    let utterance = new SpeechSynthesisUtterance(str);

                    if(index === numbers.length - 1 && str === '1'){
                        utterance = new SpeechSynthesisUtterance(10);
                    }
                    else if(index === numbers.length - 1 && str === '0'){
                        continue;
                    }

                    voices = await loadVoices();
                
                    utterance.voice = voices[1];
                    utterance.lang = 'en-US'; // Language of the speech
                    utterance.rate = 1.5; // Speed of the speech (0.1 to 10)
                    utterance.pitch = 1.5; // Pitch of the speech (0 to 2)

                    speechSynthesis.speak(utterance)
                }   
            }
            index++;
        }
    } , 8000)
}


const resetNumberPlayground = document.querySelector('.resetNumberPlayground');
resetNumberPlayground.addEventListener('click' , () => {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach((number) => {
        number.style.color = 'lightslategrey';
        number.style.fontSize = '0.4rem';
        number.style.fontWeight = 'lighter';
    })

    numberLearningGame();
})