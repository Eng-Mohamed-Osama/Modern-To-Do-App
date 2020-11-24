//Grabbing all the elements from the html

const clearAll=document.querySelector('.clear-All');
const noTaskMessage=document.querySelector('.message');
const taskContainer = document.querySelector('.tasks-container');
const addTaskButton = document.querySelector('.add-task');
const taskCounter = document.querySelector('.counters-container .currenttasks');
const taskInput = document.querySelector('[type="text"]');
const timeDisplayer = document.querySelector('.date-of-day');
const outerLayer = document.querySelector('.overlay');
const today = new Date();
const hoursOfTheDay = today.getHours();



//Create New Task function

 addNewTask = () => {

    //Remove the No Task message 

    noTaskMessage.remove();

    //Creating the new task element
    
    

    const newTask=document.createElement('span');
    const checkButton=document.createElement('span');
    const checkButtonIcon =document.createElement('i');
    const deletButtonIcon =document.createElement('i');
    const deletButton=document.createElement('span');
    const scratch=document.createElement('span');
    const newTaskText = document.createTextNode(taskInput.value);
    newTask.appendChild(newTaskText);
    newTask.prepend(checkButton);
    newTask.appendChild(deletButton);
    newTask.appendChild(scratch);
    deletButton.appendChild(deletButtonIcon);
    checkButtonIcon.className="far fa-circle";
    deletButtonIcon.className="far fa-times-circle";
    scratch.className = "scratch";
    newTask.className = "new-task";
    deletButton.className="deletebutton";
    checkButton.appendChild(checkButtonIcon);
    taskContainer.appendChild(newTask);

    //Adding the fadding In effect to  the new task element
    

    const delayInMilliseconds = 100;

    setTimeout(function() {

        newTask.classList.add('popping');

        //storing the tasks into the local storage

        window.localStorage.setItem('newTask' , taskContainer.innerHTML)

        
    }, delayInMilliseconds);

    //storing the tasks into the local storage ( this time after first creation)


    window.localStorage.setItem('newTask' , taskContainer.innerHTML)

    
    //Resting the input value back to empty 

    taskInput.value = '';

    //Getting the foucs back on the input field

    taskInput.focus();
}

//Creating the Delete all tasks fuction at once

function deleteAll(){

    const alltasks = document.querySelectorAll('.new-task');

    for(i = 0 ; i < alltasks.length ;i++ ){

        alltasks[i].remove();
    }

    //Clear the  localstorage
    
    window.localStorage.clear(); 

    //Restoring  the No Task message 

    taskContainer.appendChild(noTaskMessage);

    animFunction();

    //calling the taskCounter fucntion to recalculate the number of remaining tasks

    taskCounterFun();

}

//Getting the deleteAll function to work with clicking on the  clearAll button 

clearAll.onclick = deleteAll;

//Adding more logic to when to initiate  the addNewTask (line 18) function to work with clicking on the addTaskButton button 

function clickToCreate (){
    
    
    const allTaskx = document.querySelectorAll('.new-task');
    
    //Checking if the input value is empety or not and alert the user in case if it's empty 
    
    if(taskInput.value == ''){
        
        swal({
            text: " Please Add Task!",
            icon: "warning",
        });
        
    }else{
        
        addNewTask();
    }
    
    //calling the taskCounter fucntion to recalculate the number of remaining tasks
    
    taskCounterFun();
    
};
//asign the clickToCreate (line 112) task for the addTaskButton to create new task when clicking on the button

addTaskButton.onclick = clickToCreate;

//asign the clickToCreate (line 112) to the Enter button in the keybord task  to create new task when clicking on the enter

document.addEventListener('keypress', function(e){
    
    if(e.keyCode == 13 ){

        clickToCreate();

    }
})

document.addEventListener('click' , function(e){
    
    //Creating an event listener to delete the task when hitting the delete icon

    if(e.target.className == 'far fa-times-circle'){

    //Adding the fade out effect to  the new task element

        const Milliseconds = 400; 

                setTimeout(function(){

                    //Deleting the selected task

                    e.target.parentNode.parentNode.remove()

                    //updating the localstorage after the selected task is deleted

                    window.localStorage.setItem('newTask' , taskContainer.innerHTML)


                    taskCounterFun()

                },Milliseconds)

        e.target.parentNode.parentNode.classList.add('fadeding');

        e.target.parentNode.parentNode.classList.remove('popping');

    }

    //Creating an event listener to check and uncheck  the task when hitting the checking icon

    if(e.target.className == "far fa-circle"){

        e.target.parentNode.parentNode.classList.toggle('finished');

        //Intiate the scratch effect to remove make the task  as done 
        
        e.target.parentNode.parentNode.querySelector('.scratch').classList.toggle('scratchanime');
        
        
        taskCounterFun();
        
        //Intiate the check effect on the check button in the task when it's marked as done
        
        
        e.target.classList.add("fas" , "fa-check-circle");
        
        e.target.classList.add("checkbox");
        
        e.target.classList.remove("far" ,"fa-circle");

        window.localStorage.setItem('newTask' , taskContainer.innerHTML);

        //reverse the check effect on the check button in the task incase it got unmarked as done
        
    }else if(e.target.classList.contains("checkbox")){
        
        e.target.parentNode.parentNode.classList.toggle('finished');
        
        e.target.parentNode.parentNode.querySelector('.scratch').classList.toggle('scratchanime');
        
        
        taskCounterFun();
        
        e.target.classList.remove("fas" , "fa-check-circle");
        
        e.target.classList.remove("checkbox");
        
        e.target.classList.add("far" ,"fa-circle");

        window.localStorage.setItem('newTask' , taskContainer.innerHTML);
    }
    
    
});

//The counting of remaining tasks function

function taskCounterFun(){

    const allTasksArr  = document.querySelectorAll('.new-task');

    const finisedTasksArr  = document.querySelectorAll('.new-task.finished');

    console.log(allTasksArr,finisedTasksArr);

    taskCounter.textContent = allTasksArr.length - finisedTasksArr.length;

}


//the initaing function that updates the UI depending on its current state as  soon as the windows load

function foucsInput() {
    
    //Function to get  the foucs back on the input field 
    
    taskInput.focus();
    
    //checking the local storage and update the UI depending on its current state
    
    if(localStorage.getItem('newTask') === null){
        
        animFunction();
        
        taskContainer.appendChild(noTaskMessage);

        
        
    }else{
        
        const urItem = localStorage.getItem('newTask')
        
        taskContainer.innerHTML = urItem
        
        taskCounterFun()
        
    }
    
    //Adding the animation to the Date and Time Container
    
    timeDisplayer.classList.add('slide');
    
}

//Adding the Date and Time to the App

const options = {weekday : 'long' , month :'short' , day:'numeric'}

timeDisplayer.innerHTML = today.toLocaleDateString('en-US', options);

//Changing the background img depending on the time of the day 

const divBackground = document.querySelector('.header-container img');

const theBackGroundContainer = document.querySelector('.rapper');

function dayAndNight () {

    if(hoursOfTheDay >= 5 &&  hoursOfTheDay < 18 ){

        divBackground.setAttribute('src' , './imgs/zpgh0R.png');
        
        //switching DarkMode on and off depends on the timeing of the day

        theBackGroundContainer.classList.remove('darkmoade');

        taskInput.classList.remove('darkmode-border');

        taskCounter.classList.remove('darkmode-color');

        document.querySelector('.add-task').classList.remove('darkmode-color');

        if(hoursOfTheDay >= 5 &&  hoursOfTheDay < 12){

            document.querySelector(".letters").innerHTML = 'Good Morning'

        }else{

            document.querySelector(".letters").innerHTML = 'Good Afternoon'

        }

    }else{

        divBackground.setAttribute('src','./imgs/unnamed.png');

        //switching DarkMode on and off depends on the timeing of the day

        theBackGroundContainer.classList.add('darkmoade');

        taskInput.classList.add('darkmode-border');

        taskCounter.classList.add('darkmode-color');

        document.querySelector('.add-task').classList.add('darkmode-color');
        
        noTaskMessage.style.color = "#000";

        outerLayer.style.backgroundColor = "#23435b";

        document.querySelector(".letters").innerHTML = 'Good Evening'

        
    }
    
}

//Intiating the background img and dark mode changer function

dayAndNight();

//Quick function to display warrning to the user about the delete all tasks button

clearAll.onmouseenter = function(){

    document.querySelector('.warrning-message').classList.add('warrning-message-popping')
    
}

clearAll.onmouseleave = function(){

    document.querySelector('.warrning-message').classList.remove('warrning-message-popping')

}

//Adding Animation to the Message that get displayed after clearing all task !

const animFunction = () => {

    var textWrapper = document.querySelector('.ml7 .letters');

    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    
    anime.timeline({loop: false})

      .add({
        targets: '.ml7 .letter',
        translateY: ["1.1em", 0],
        translateX: ["0.55em", 0],
        translateZ: 0,
        rotateZ: [180, 0],
        duration: 750,
        easing: "easeOutExpo",
        delay: (el, i) => 50 * i
      }).add({
        targets: '.ml7',
        opacity: 1,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });
}

// Wrap every letter in a span

var textWrapper = document.querySelector('.ml11 .letters');

textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100
  }).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
  }).add({
    targets: '.ml11',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

setTimeout(() => {
    
    outerLayer.remove()
    foucsInput()
    
}, 3000);
