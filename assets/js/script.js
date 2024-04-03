// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let inputTaskTitle = document.querySelector("#inputTaskTitle")
let inputDate = document.querySelector("#inputDate")
let inputTask = document.querySelector("#inputTask")
let addTask = document.querySelector("#addTask")
let formModal = document.querySelector("#formModal")






// Todo: create a function to generate a unique task id
function generateTaskId() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let taskID = '';
    for (let i = 0; i < 10; i++) {
        taskID += characters.charAt(Math.floor(Math.random() * characters.length));
    
    }
    return taskID;
    

};

// Todo: create a function to create a task card
function createTaskCard(task) {
    for (task in taskList){
   let sectionEL = document.createElement("section");
    let divHEL = document.createElement("div");
   let divBEL = document.createElement("div");
   let divh5 = document.createElement("h6")
   let divh6 = document.createElement("h6")
   let divP = document.createElement("p");
    let deleteBttn = document.createElement("button");

    sectionEL.setAttribute("class", "card text-center")
    divHEL.setAttribute("class", "card-header")
    divBEL.setAttribute("class", "card-body" )
    divh5.setAttribute("class", "card-title")
    divh6.setAttribute("class", "card-title")
    divP.setAttribute("class", "card-text" )
    deleteBttn.setAttribute("class", "btn btn-primary")


    







    }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault()
    

    let taskTitleValue = inputTaskTitle.value.trim();
    let dateValue = inputDate.value;
    let taskValue = inputTask.value.trim();

    let userTask = JSON.parse(localStorage.getItem("tasks")) ||[];

    let userInfo = {
       title: taskTitleValue,
       dateDue: dateValue,
       task: taskValue
    
      
    };

      
    if (taskTitleValue === "") {
        alert("Please fill in Title!");
        return false;
      } else if (dateValue === "") {
       
        alert("Please fill in Date!");
        return false;
      } else if (taskValue === "") {
        
        alert("Please fill in Task!");
        return false;
      } else {
      
    };

    
    userTask.push(userInfo);

    



    let userTaskSerialized = JSON.stringify(userTask);

    localStorage.setItem("tasks", userTaskSerialized);

    $(formModal).modal('hide');

    inputTaskTitle.value='';
    inputDate.value='';
    inputTask.value='';

 




}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});



addTask.addEventListener("click", handleAddTask )





