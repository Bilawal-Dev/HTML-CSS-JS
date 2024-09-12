/* Loading The Saved Tasks From The Local Storage , To Display Them Even If User Refereshes The Page 
Or Browser Is Closed. We Are Using localStorage.getItem('') And Passing The Key Which Is Data To Retrieve
The Data And Then Added The Tasks And Making It Visible And Also Calling The taskRemovalOrCompletion Function To Check If User Want To Remove Or Marked Complete A Task*/
const savedTasks = localStorage.getItem('Data');
//Checking If There Are Saved Tasks Then Loading Them, Else Skip :
if(savedTasks){
    const tasksContainer = document.querySelector('.tasksContainer');
    tasksContainer.innerHTML = savedTasks;
    tasksContainer.style.display = 'block';
    taskRemovalOrCompletionOrUpdation();
}

//GSAP - Entry Animations :
let timeline = gsap.timeline();
timeline.fromTo('header' , 
    {y : -50 , opacity : 0},
    {y : 0 , opacity : 1 , delay : .5 , duration : 1}
)
timeline.fromTo('.addTaskContainer' , 
    {y : -20 , opacity : 0},
    {y : 0 , opacity : 1 ,  duration : 1}
)
timeline.fromTo('.tasksContainer' , 
    {y : -20 , opacity : 0},
    {y : 0 , opacity : 1 ,  duration : 1}
)

const addTaskBtn = document.querySelector('#addTaskBtn');

//Adding The Task To App When Add-Task Button Is Clicked :
addTaskBtn.addEventListener('click' , () => {
    const taskInput = document.querySelector('#addTask').value;

    //If Input Field Is Empty Then Calling displayPopupMessage Fn To Display Pop-Up Message :
    if(taskInput === ''){
        displayPopupMessage();
    }
    else{
        addTask(taskInput)
        document.querySelector('#addTask').value = '';
    }
})

function displayPopupMessage(){
    const coverRequiredDisplay = document.querySelector('.coverRequiredDisplay');
    coverRequiredDisplay.style.display = 'block';
    const crossBtn = document.querySelector('#closeCoverRequiredDisplay');
    //Closing The Pop-Up Display If Cross Is Clicked Or User Click Anywhere Else On Screens:
    crossBtn.addEventListener('click' , () => {
        coverRequiredDisplay.style.display = 'none';
    })
    coverRequiredDisplay.addEventListener('click' , () => {
        coverRequiredDisplay.style.display = 'none';
    })
}

//Adding Task To The To-Do List App :
function addTask(taskInput){
    const tasksContainer = document.querySelector('.tasksContainer');
    tasksContainer.style.display = 'block';
    
    const task = `<div class="task">
                    <img class="uncheckedImg" src="images/unchecked.png">
                    <h2>${taskInput}</h2>
                    <i class="ri-edit-2-fill updateTaskBtn"></i>
                    <i class="ri-close-large-fill removeTaskBtn"></i>
                </div>`;

    tasksContainer.innerHTML += task;
    
    /* LocalStorage Save Tasks To Local Storage , To Display Them Even If User Refereshes The Page 
    Or Browser Is Closed. It Takes 2 Arguments, Key And Its Value. So, We Have Assigned All The 
    Tasks Of To-Do List App To The Data Key*/
    localStorage.setItem('Data' , tasksContainer.innerHTML);

    taskRemovalOrCompletionOrUpdation();
}

//To Remove Or Marking A Task Complete :
function taskRemovalOrCompletionOrUpdation(){

    const tasksContainer = document.querySelector('.tasksContainer');
    
    //Toggle The Task To Done Or Remaining Upon Click On Image :
    const uncheckedImages = document.querySelectorAll('.uncheckedImg');
    uncheckedImages.forEach((uncheckedImage) => {
        uncheckedImage.addEventListener('click' , toggleImageFn)
    })
    function toggleImageFn(event){
        if(event.target.getAttribute('src') === 'images/unchecked.png'){
            event.target.setAttribute('src' , 'images/checked.png' );
            event.target.parentElement.childNodes[3].style.textDecoration = 'lightslategray line-through';
        }
        else{
            event.target.setAttribute('src' , 'images/unchecked.png' );
            event.target.parentElement.childNodes[3].style.textDecoration = '';
        }

        //Update The localStorage If A Task Is Marked Complete : 
        localStorage.setItem('Data' , tasksContainer.innerHTML);
    }

    //Toggle The Task To Done Or Remaining Upon Click On Text :
    const tasks = document.querySelectorAll('.task h2');
    tasks.forEach((task) => {
        task.addEventListener('click' , toggleTaskFn);
    })
    function toggleTaskFn(event){
        if(event.target.style.textDecoration === ''){
            event.target.style.textDecoration = 'lightslategray line-through';
            event.target.parentElement.childNodes[1].setAttribute('src' , 'images/checked.png' );
        }
        else{
            event.target.style.textDecoration = '';
            event.target.parentElement.childNodes[1].setAttribute('src' , 'images/unchecked.png' );
        }
    
        //Update The localStorage If A Task Is Marked Complete : 
        localStorage.setItem('Data' , tasksContainer.innerHTML);
    }
    
    //Removing The Task From To-Do List App Upon Click On Cross Btn :
    const removeTaskBtns = document.querySelectorAll('.removeTaskBtn');
    removeTaskBtns.forEach((removeTaskBtn) => {
        removeTaskBtn.addEventListener('click' , (event) => {
            //It Removes The Element :
            event.target.parentElement.remove();
            //Update The localStorage If A Task Is Removed : 
            localStorage.setItem('Data' , tasksContainer.innerHTML);
        })
    })

    //Updating(Editing) The Task In To-Do List App Upon Click On Update Btn :
    const updateTaskBtns = document.querySelectorAll('.updateTaskBtn')
    updateTaskBtns.forEach((updateTaskBtn) => {
        updateTaskBtn.addEventListener('click' , (event) => {
    
            const taskHeading = event.target.parentElement.childNodes[3]; //The Heading Of That Clicked Task
            const taskImage = event.target.parentElement.childNodes[1]; //The Image Of Clicked That Task
    
            if(!taskHeading.classList.contains('taskUpdate')){
                event.target.style.color = 'rgb(255, 136, 0)'

                let horizontalRuler = document.createElement("hr");
                event.target.parentElement.append(horizontalRuler);
                timeline.fromTo(horizontalRuler , 
                    {width : '0%' },               //We Can Set rem , % units Also In Gsap Using ' '
                    {width : '75%', duration : .5}
                )
    
                taskImage.removeEventListener('click' , toggleImageFn)
                taskImage.setAttribute('src' , 'images/unchecked.png' );
                taskImage.style.cursor = 'not-allowed';
                
                const previousTask = taskHeading.innerText;
                //Inner HTML Changes The Inner-HTML Of An Elment While Outer HTML Changes That Element Itself And Replaces It :
                taskHeading.outerHTML = `<input type="text" class="taskUpdate" value="${previousTask}" name="updateTask">`                    
            }
            else{
                event.target.style.color = 'rgba(0, 0, 0, .5)'
                taskImage.style.cursor = 'pointer';

                //Removing The Horizontal Sliding Ruler :
                let horizontalRuler = event.target.parentElement.lastChild;
                timeline.fromTo(horizontalRuler , 
                    {width : '75%' },               //We Have Wrapped All Of These To Make It Synchronos, So That The Rest Of Code Only Executes When The Animation Has Finished :
                    {width : '0%' , duration : .5 , onComplete : () => {
                        
                        horizontalRuler.remove();
            
                        const currentTask = taskHeading.value;
            
                        if(currentTask === ''){
                            //It Removes The Element :
                            event.target.parentElement.remove();
                        }
            
                        taskHeading.outerHTML = `<h2>${currentTask}</h2>`
                        taskHeading.classList.remove('taskUpdate');
                        
                        //Adding The EventListeners Again For New Elements So That Action Can Also Be Taken On New Added Elements :
                        taskImage.addEventListener('click' , toggleImageFn);
                        event.target.parentElement.childNodes[3].addEventListener('click' , toggleTaskFn);
        
                        //Update The localStorage If A Task Is Edited : 
                        localStorage.setItem('Data' , tasksContainer.innerHTML);
                    }}
                )
            }
        })
    })
}