let searchBtn = document.querySelector('.searchbox #search');
let timeline = gsap.timeline();

timeline.fromTo('.searchbox' ,
    {y : -100 , opacity : 0},
    {y : 0 , opacity : 1 , delay : .5 , duration  : 1}
)

searchBtn.addEventListener('click' , async () => {

    const city = document.querySelector('.searchbox input').value;
    const image = document.querySelector('.displayInfo img');
    const temperature = document.querySelector('.displayInfo h1');
    const description = document.querySelector('.displayInfo h2');
    const humidity = document.querySelector('.displayDetails .humidity .info h1');
    const windspeed = document.querySelector('.displayDetails .windSpeed .info h1');
    
    if(city === ''){
        return
    }
    
    const API_Key = 'b8479c133d4fcd9aedc09b77df1d14b7';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`;

    try {
        let response = await fetch(URL);
        if(!response.ok){
            throw new Error('Error Fetching Data From API!');
        }
        let data = await response.json();

        const weather = data.weather[0].main;

        
        if(weather === 'Clear' || weather === 'Haze')
            image.setAttribute('src' , 'images/clear.png')
        else if(weather === 'Clouds')
            image.setAttribute('src' , 'images/cloud.png')
        else if(weather === 'Mist')
            image.setAttribute('src' , 'images/mist.png')
        else if(weather === 'Rain')
            image.setAttribute('src' , 'images/rain.png')
        else if(weather === 'Snow')
            image.setAttribute('src' , 'images/snow.png')
        
        document.querySelector('.displayInfo').classList.remove('errorLocationNotFound');
        temperature.innerHTML = Math.floor(data.main.temp)+ '<sup>&degC</sup>';
        description.innerText = data.weather[0].description;
        humidity.innerText = data.main.humidity + '%';
        windspeed.innerText = Math.floor(data.wind.speed)+ 'Km/h';

        document.querySelector('.displayInfo').style.display = 'block';
        timeline.fromTo(image ,
            {scale : 0.5 , opacity : 0},
            {scale : 1 , opacity : 1 , duration  : .5}
        )
        document.querySelector('.displayDetails').style.display = 'flex';
        
    } catch (error) {
        image.setAttribute('src' , 'images/404.png');
        timeline.fromTo(image ,
            {scale : 0.8 , opacity : 0},
            {scale : 1 , opacity : 1 , duration  : .5}
        )
        document.querySelector('.displayInfo').classList.add('errorLocationNotFound');
        description.innerText = 'Error! Location Not Found'
        document.querySelector('.displayInfo').style.display = 'flex';
        document.querySelector('.displayInfo').style.flexDirection = 'column';
        document.querySelector('.displayInfo').style.justifyContent = 'center';
        document.querySelector('.displayInfo').style.alignItems = 'center';

        document.querySelector('.displayDetails').style.display = 'none';
    }
})