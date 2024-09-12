const menu_button = document.querySelector('#menu');
const side_menu = document.querySelector('.responsivesidemenu');
let timeline = gsap.timeline();


menu_button.addEventListener('click' , function(){
    let side_menu_displayState = getComputedStyle(side_menu).display;

    if(side_menu_displayState === 'none')
    {
        side_menu.style.display = 'block';
        timeline.fromTo(side_menu , 
            {x : 300} ,
            {x : 0 , duration : .8}
        );
    }
    else
    {
        timeline.fromTo(side_menu ,
            {x: 0} ,
            {x: 700 , duration: 1 , onComplete: function(){
                side_menu.style.display = 'none'
            }}
        )
    }
})