const calculateBMIBtn = document.querySelector('#calculateBMI')

let timeline = gsap.timeline();

timeline.fromTo('.container' , 
    {scale : 0.8 , opacity : 0},
    {scale : 1 , opacity : 1 , duration : 1}
)

calculateBMIBtn.addEventListener('click' , () => {
    const age = document.querySelector('#age').value;
    const height = document.querySelector('#height').value;
    const weight = document.querySelector('#weight').value;
    const genderRadios = document.querySelectorAll('.genderContainer input');
    let gender = '';
    genderRadios.forEach((element) => {
        if(element.checked === true){
            gender = element.value;
        }
    })

    if(age === '' || gender === '' || height === '' || weight === '')
    {
        const coverRequiredDisplay = document.querySelector('.coverRequiredDisplay');
        coverRequiredDisplay.style.display = 'block'
        const crossBtn = document.querySelector('.ri-close-large-line')
        crossBtn.addEventListener('click' , () => {
            coverRequiredDisplay.style.display = 'none';
        })
        coverRequiredDisplay.addEventListener('click' , (event) => {
            if(event.target === coverRequiredDisplay)
            coverRequiredDisplay.style.display = 'none';
        })
    }
    else{
        bmiCalculate();
    }

    function bmiCalculate(){
        const bmi = (Number(weight) / ((Number(height)/100) * (Number(height)/100))).toFixed(2);
        console.log(bmi);

        const bmiDisplay = document.querySelector('.bmiDisplay h3');
        bmiDisplay.innerText = bmi;

        let bmiMessage;
        
        if(bmi < 18.5){
            bmiMessage = 'Underweight';
        }
        else if(bmi >= 18.5 && bmi <= 24.9){
            bmiMessage = 'Healthy';
        }
        else if(bmi >= 25 && bmi <= 29.9){
            bmiMessage = 'Overweight';
        }
        else if(bmi >= 30 && bmi <= 34.9){
            bmiMessage = 'Obese';
        }
        else if(bmi >= 35){
            bmiMessage = 'Extremely Obese';
        }

        const bmiDisplayMsg = document.querySelector('.bmiDisplay p')
        bmiDisplayMsg.innerHTML = `You Are <span>${bmiMessage}</span>`
        bmiDisplayMsg.style.display = 'block';
        timeline.fromTo(bmiDisplayMsg , 
            {y : 40 , opacity : 0},
            {y : 0 , opacity : 1 , duration : .5}
        )
    }
})