const menu_button = document.querySelector(".ri-menu-line");
const cross_button = document.querySelector(".ri-close-large-fill");
const sidebar = document.querySelector(".sidebar");
let timeline = gsap.timeline();

menu_button.addEventListener('click' , function(){
    sidebar.style.display = 'block';
    timeline.fromTo(".sidebar" , 
        {x: -310},
        {x: 0 , duration: 1},
);
    menu_button.style.display = 'none';
});

cross_button.addEventListener('click' , function(){
    menu_button.style.display = 'block';
    timeline.fromTo(".sidebar" ,
        {x: 0},
        {x: -500 , duration: .8 , onComplete: function(){
            sidebar.style.display = 'none';
        }},
    )
});