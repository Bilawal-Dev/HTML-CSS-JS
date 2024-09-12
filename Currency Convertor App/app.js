const exchangeRateBtn = document.querySelector('#getExchangeRate');
const searchCountries = document.querySelectorAll('.country select')

let currencyFrom = 'USD';
let currencyTo = 'PKR';

let timeline = gsap.timeline();

timeline.fromTo('.container' ,
    {scale : 0.5 ,  opacity : 0} ,
    {scale : 1 , opacity : 1 , duration : 1}
)

searchCountries.forEach((searchCountry) => {
    for(let currency in countryList){
        if((searchCountry === 'countryFrom' && currency === 'USD') || (searchCountry === 'countryTo' && currency === 'PKR')){
            continue;
        }

        searchCountry.innerHTML += `<option value="${currency}">${currency}</option>`   
    }
})

searchCountries.forEach((searchCountry) => {
    searchCountry.addEventListener('change' , (event) => {

        console.log(event.target);

        if(event.target.getAttribute('name') === 'countryFrom'){
            currencyFrom = event.target.value;
        }
        else if(event.target.getAttribute('name') === 'countryTo'){
            currencyTo = event.target.value;
        }

        const countryCode = countryList[event.target.value];
        const parentElement = event.target.parentElement;

        let image = parentElement.querySelector('img');
        image.setAttribute('src' , `https://flagsapi.com/${countryCode}/flat/64.png`)
        // timeline.fromTo(image ,
        //     {scale : 0 ,  opacity : 0} ,
        //     {scale : 1 , opacity : 1 , duration : .5}
        // )        
    })
})

exchangeRateBtn.addEventListener('click' , async () => {
    const displayResult = document.querySelector('#calculatedAmount');

    let amount = document.querySelector('#amount').value;
    if(amount == '' || amount < 1){
        amount = 1;
        document.querySelector('#amount').value = amount;
    }

    const URL = `https://2024-03-06.currency-api.pages.dev/v1/currencies/${currencyFrom.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    const conversionRate = data[currencyFrom.toLowerCase()][currencyTo.toLowerCase()];
    //toFixed Round Number Upto 3 Decimal Places And Return As String, So Number Convert That String Back To Number :
    const calculatedAmount = Number((amount * conversionRate).toFixed(3));

    displayResult.innerText = `${amount} ${currencyFrom} = ${calculatedAmount} ${currencyTo}`;
    displayResult.style.visibility = 'visible';

    timeline.fromTo(displayResult ,
        {opacity : 0} ,
        {opacity : 1 , duration : 1}
    )
})