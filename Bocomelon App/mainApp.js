const alphabetPlaygroundBtn = document.querySelector('#alphabetPlaygroundBtn');
const numberPlaygroundBtn = document.querySelector('#numberPlaygroundBtn');

let intervalID1 = null;
let intervalID2 = null;
let timeline = gsap.timeline();

document.querySelector('.logo').addEventListener('click' , () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
    if(intervalID1){
        clearInterval(intervalID1);
        speechSynthesis.cancel();
    }
})

const navbarBtns= document.querySelectorAll('nav ul li');
navbarBtns.forEach((navbarBtn) => {
    navbarBtn.addEventListener('click' , (event) => {

        let positionFromTop;

        if(event.target.innerText === 'Home'){
            positionFromTop = 0;
            if(intervalID1 || intervalID2){
                speechSynthesis.cancel();
                clearInterval(intervalID1);
                clearInterval(intervalID2);
                document.body.style.overflow = 'auto';
            }
        }
        else if(event.target.innerText === 'Alphabets Playground'){
            positionFromTop = window.innerHeight; //window.innerHeight Means 100vh
            if(intervalID2){
                clearInterval(intervalID2)
                document.body.style.overflow = 'auto';
            }
        }
        else if(event.target.innerText === 'Counting Playground'){
            positionFromTop = window.innerHeight * 2; //window.innerHeight * 2 Means 200vh
            if(intervalID1){
                speechSynthesis.cancel();
                clearInterval(intervalID1);
                document.body.style.overflow = 'auto';
            }
        }
        else if(event.target.innerText === 'About Us'){
            positionFromTop = window.innerHeight * 3;
            if(intervalID1 || intervalID2){
                speechSynthesis.cancel();
                clearInterval(intervalID1);
                clearInterval(intervalID2);
                document.body.style.overflow = 'auto';
            }
        }

        window.scrollTo({
            top: positionFromTop,
            behavior: 'smooth'
        })
    })
})

window.addEventListener('scroll' , (event) => {
    if(window.scrollY < 500){
        navbarBtns.forEach((navbarBtn) => {
            navbarBtn.classList.remove('active');
        })
        navbarBtns[0].classList.add('active');
    }
    else if(window.scrollY > 500 && window.scrollY < 1100){
        navbarBtns.forEach((navbarBtn) => {
            navbarBtn.classList.remove('active');
        })
        navbarBtns[1].classList.add('active');
    }
    else if(window.scrollY > 1100 && window.scrollY < 1700){
        navbarBtns.forEach((navbarBtn) => {
            navbarBtn.classList.remove('active');
        })
        navbarBtns[2].classList.add('active');
    }
    else if(window.scrollY > 1700 && window.scrollY < 2400){
        navbarBtns.forEach((navbarBtn) => {
            navbarBtn.classList.remove('active');
        })
        navbarBtns[3].classList.add('active');
    }
})

//When The User Loads Or Refereshes Page, Then He Is On Top Of Document : 
window.addEventListener('load',() => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

let voices;

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

alphabetPlaygroundBtn.addEventListener('click' , () => {
    window.scrollTo({
        top: window.innerHeight, // Scroll down by 1 View-Port Height
        behavior: 'smooth' // Smooth scrolling
    })
})

numberPlaygroundBtn.addEventListener('click' , () => {
    window.scrollTo({
        top: window.innerHeight * 2,
        behavior: 'smooth'
    })
})

const tapToStartAlphabetsLearning = document.querySelector('.alphabetPlaygroundContainer h1');
tapToStartAlphabetsLearning.addEventListener('click' , () => {
    alphabetLearningGame();
})

const tapToStartNumericCounting = document.querySelector('.numberPlaygroundContainer h1');
tapToStartNumericCounting.addEventListener('click' , () => {
    numberLearningGame();
})



//About-Us Section
const toggleDetailsBtn = document.querySelector('.toggleDetailsBtn');
toggleDetailsBtn.addEventListener('click' , (event) => {
    const detailText = document.querySelector('.detailText');
    const detailTextDisplay = window.getComputedStyle(detailText);

    if(detailTextDisplay.display === 'none'){
        detailText.style.display = 'block';
        event.target.innerText = 'Read Less';
    }
    else{
        detailText.style.display = 'none';
        event.target.innerText = 'Read More';
    }
})

//Sending Feedback
const sendFeedbackBtn = document.querySelector('.sendFeedbackBtn');
sendFeedbackBtn.addEventListener('click' , () => {
    const feedbackDisplay = document.querySelector('.feedbackDisplay');
    const feedbackContainer = document.querySelector('.feedbackContainer');

    feedbackDisplay.style.display = 'block';
    feedbackContainer.style.display = 'block';

    const submitBtn = document.querySelector('#submit')

    feedbackDisplay.addEventListener('click' , () => {
        feedbackDisplay.style.display = 'none';
        feedbackContainer.style.display = 'none';

        submitBtn.removeEventListener('click' , validateForm);
    })

    submitBtn.addEventListener('click' , validateForm)

    //Function To Check If Necessary Inputs And Filled, And If Filled Then Display Data And Closing feedbackContainer :
    function validateForm(){
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        //Selecting All The Radio Buttons (Since, They Have Same Name) :
        const userexperiences = document.querySelectorAll('.overallExperienceContainer input');
        let userexperience = '';
        //For-Each Method Can't Break Through Iteration And Return Any Value :
        userexperiences.forEach((eachuserexperience) => {
            if(eachuserexperience.checked){
                userexperience = eachuserexperience.value; 
            }
        })
        const feedbackText = document.querySelector('#feedbackText').value;

        if(name !== '' && email !== '' && userexperience !== ''){
            let userFeedbackDetails = {
                name : name,
                email : email,
                userexperience : userexperience,
                feedbackText : feedbackText
            };

            console.log(userFeedbackDetails);

            feedbackContainer.style.display = 'none';
            feedbackDisplay.style.display = 'none';
        }
        else{

            if(name === ''){
                document.querySelector('.nameContainer').style.color = 'red';
                document.querySelector('.nameContainer h2').innerText = 'Name *Required!';
                document.querySelector('#name').style.border = '1.5px solid red';
            }
            else{
                document.querySelector('.nameContainer').style.color = 'rgb(0, 0, 0, .8)';
                document.querySelector('.nameContainer h2').innerText = 'Name';
                document.querySelector('#name').style.border = '1px solid grey';
            }
    
            if(email === ''){
                document.querySelector('.emailContainer').style.color = 'red';
                document.querySelector('.emailContainer h2').innerText = 'Email *Required!';
                document.querySelector('#email').style.border = '1.5px solid red';
            }
            else{
                document.querySelector('.emailContainer').style.color = 'rgb(0, 0, 0, .8)';
                document.querySelector('.emailContainer h2').innerText = 'Email';
                document.querySelector('#email').style.border = '1px solid grey';
            }
    
            if(userexperience === ''){
                document.querySelector('.overallExperienceContainer h2').style.color = 'red';
                document.querySelector('.overallExperienceContainer h2').innerText = 'Overall Experience *Required!';
            }
            else{
                document.querySelector('.overallExperienceContainer h2').style.color = 'rgb(0, 0, 0, .8)';
                document.querySelector('.overallExperienceContainer h2').innerText = 'Overall Experience';
            }
        }
    }
})


//Navbar Menu Button For Responsiveness :
const navbarMenuBtn = document.querySelector('#navbarMenuBtn');
navbarMenuBtn.addEventListener('click' , () => {
    const navbarMenu = document.querySelector('nav ul');
    const navbarMenuDisplay = window.getComputedStyle(navbarMenu).display;

    if(navbarMenuDisplay === 'none'){
        navbarMenu.style.display = 'flex';
        timeline.fromTo(navbarMenu , 
            {x : 300} ,
            {x : 0 , duration : .8}
        );

        document.body.style.overflow = 'hidden';

        navbarBtns.forEach((navbarBtn) => {
            navbarBtn.addEventListener('click' , () => {
                navbarMenu.style.display = 'none';
                document.body.style.overflow = 'auto';
            })
        })
    }
    else if(navbarMenuDisplay === 'flex'){
        timeline.fromTo(navbarMenu ,
            {x: 0} ,
            {x: 700 , duration: 1 , onComplete: function(){
                navbarMenu.style.display = 'none'
            }}
        )
        
        document.body.style.overflow = 'auto';
    }
})