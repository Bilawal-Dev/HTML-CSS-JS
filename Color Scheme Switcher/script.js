let btn = document.querySelectorAll(".button");
let body = document.querySelector("body");
let msg = document.querySelector(".displaycontainer")

btn.forEach((choice) => {
    choice.addEventListener("click" , () => {
        let btnid = choice.getAttribute("id");
        colorswitch(btnid , choice);
        console.log(btnid);
    })
})

const colorswitch = (btnid , choice) => {
    if(btnid === "first")
    {
        body.style.backgroundColor = "orange";
        msg.innerText = "Orange Delight: Squeeze the Day!";
        choice.style.borderTop = "3px solid rgb(255, 255, 255 , .5)";
        choice.style.borderLeft = "3px solid rgb(255, 255, 255 , .5)";
    }
    else if(btnid === "second")
    {
        body.style.backgroundColor = "cornflowerblue";
        msg.innerText = "Blue Waves: Cool and Refreshing!";
        choice.style.borderTop = "3px solid rgb(255, 255, 255 , .5)";
        choice.style.borderLeft = "3px solid rgb(255, 255, 255 , .5)";
    }
    else if(btnid === "third")
    {
        body.style.backgroundColor = "chartreuse";
        msg.innerText = "Lush Green: Fresh Vitality!";
        choice.style.borderTop = "3px solid rgb(255, 255, 255 , .5)";
        choice.style.borderLeft = "3px solid rgb(255, 255, 255 , .5)";
    }
    else if(btnid === "fourth")
    {
        body.style.backgroundColor = "lightpink";
        msg.innerText = "Pink Blossoms: Graceful Beauty!";
        choice.style.borderTop = "3px solid rgb(255, 255, 255 , .5)";
        choice.style.borderLeft = "3px solid rgb(255, 255, 255 , .5)";
    }
    else if(btnid === "fifth")
    {
        body.style.backgroundColor = "black";
        msg.innerText = "Demonic Black: Dark Seduction!";
        choice.style.borderTop = "3px solid rgb(255, 255, 255 , .5)";
        choice.style.borderRight = "3px solid rgb(255, 255, 255 , .5)";
        choice.style.borderBottom = "0.5px solid rgb(255, 255, 255 , .3)";
        choice.style.borderLeft = "0.5px solid rgb(255, 255, 255 , .3)";
    }
}