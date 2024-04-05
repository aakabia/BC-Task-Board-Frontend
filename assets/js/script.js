// Retrieve tasks and nextId from localStorage
const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
const nextId = JSON.parse(localStorage.getItem("nextId"));
let inputTaskTitle = document.querySelector("#inputTaskTitle");
let inputDate = document.querySelector("#inputDate");
let inputTask = document.querySelector("#inputTask");
let addTask = document.querySelector("#addTask");
let formModal = document.querySelector("#formModal");
let toDoCards = document.querySelector("#todo-cards");
flatpickr("#inputDate", {});



// Above, I picked multiple itmes from my html and also made task list a empty array to use later.
// Also, i used the flatpickr API instead of dayjs to display the date.

// Todo: create a function to generate a unique task id
function generateTaskId() {
  /*const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let taskID = "";
    for (let i = 0; i < 10; i++) {
    taskID += characters.charAt(Math.floor(Math.random() * characters.length));
  }*/

  let taskID = crypto.randomUUID();

  return taskID;

  // above, I created a id for each task card and assigned this id in createtaskcard line 48.
  // I wrote code to generate a id before I knew of UUID.
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const sectionEL = document.createElement("section");
  const divHEL = document.createElement("div");
  const divBEL = document.createElement("div");
  const divh5 = document.createElement("h5");
  const divP = document.createElement("p");
  const deleteBttn = document.createElement("button");

  sectionEL.setAttribute("class", "card text-center space ");
  sectionEL.setAttribute("id", "drag")
  divHEL.setAttribute("class", "card-header");
  divBEL.setAttribute("class", "card-body");
  divh5.setAttribute("class", "card-title");
  divP.setAttribute("class", "card-text");
  deleteBttn.setAttribute("class", "btn btn-primary red button border-dark");


  divHEL.textContent= task.title
  divh5.textContent= task.task
  divP.textContent= task.dateDue
  deleteBttn.textContent = "Delete"

  sectionEL.dataset.taskId = task.id;





  now = dayjs()
  projectDueDate = dayjs(task.dateDue, 'YYYY MMMM DD')

  console.log(projectDueDate);

  if( now.isSame(projectDueDate, "day")){
   sectionEL.setAttribute("class", "yellow")
  } else if ( now.isBefore(projectDueDate, "day")){
    sectionEL.setAttribute("class", "green")
  } else{sectionEL.setAttribute("class", "red")}
  
// used dayjs to change the color of the cards depending on date. 

  

  toDoCards.appendChild(sectionEL);
  sectionEL.appendChild(divHEL);
  sectionEL.appendChild(divBEL);
  divBEL.appendChild(divh5);
  divBEL.appendChild(divP);
  divBEL.appendChild(deleteBttn);

  // Above, I created a task card using a bootstrap layout.
}











// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  let task = taskList;
  console.log(task);
  toDoCards.textContent = "";
  // I have to clear the inner html or text content  of the todo cards section before running again the code again or will reitterate and create more cards then needed.
  

  // Above, I used a for each to itterate over task
  task.forEach(createTaskCard)

  const draggableElements = document.querySelectorAll('#drag');
   $(draggableElements).draggable()

  
    // Above, I added jquery to make the card created draggable by selecting elements with a id of drag.  
  }










// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  let taskTitleValue = inputTaskTitle.value.trim();
  let dateValue = inputDate.value;
  let taskValue = inputTask.value.trim();

  // Above I made vribale values and added a trim

  let userInfo = {
    title: taskTitleValue,
    dateDue: dateValue,
    task: taskValue,
    id: generateTaskId(),
    status: "to do",
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
  }

  taskList.push(userInfo);

  // Above I created a object for my modal and made sure the inputs arent empty

  let userTaskSerialized = JSON.stringify(taskList);

  localStorage.setItem("tasks", userTaskSerialized);

  // Above, I set the seralized the task and saved them to local storage

  $(formModal).modal("hide");

  inputTaskTitle.value = "";
  inputDate.value = "";
  inputTask.value = "";

  // Above I hide the modal and cleared it
  renderTaskList();

  //window.location.reload();
  // important to refresh the screen when dealing with local storage on same page.
  // use window.location.reload()
  // This stops reitteration but only hides the bug
  // however I fixed this issue by clearing the todos cards section before itterating again.
}



// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  addTask.addEventListener("click", handleAddTask);
  renderTaskList();
});
