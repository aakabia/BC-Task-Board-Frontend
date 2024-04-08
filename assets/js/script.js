// Retrieve tasks and nextId from localStorage
const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
const nextId = JSON.parse(localStorage.getItem("nextId"));

// Above, I made task list into a empty array or items from local storage.
let inputTaskTitle = document.querySelector("#inputTaskTitle");
let inputDate = document.querySelector("#inputDate");
let inputTask = document.querySelector("#inputTask");
let addTask = document.querySelector("#addTask");
// Above, I query selected the input values.
let toDoCards = document.querySelector("#todo-cards");
let inProgressCards = document.querySelector("#in-progress-cards");
let doneCards = document.querySelector("#done-cards");
// Above, I querry selected the card lanes.

flatpickr("#inputDate", {});

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

  // Above, I created the task card foundation

  sectionEL.setAttribute("class", "card text-center space ");
  sectionEL.setAttribute("id", "drag");
  divHEL.setAttribute("class", "card-header");
  divBEL.setAttribute("class", "card-body");
  divh5.setAttribute("class", "card-title");
  divP.setAttribute("class", "card-text");
  deleteBttn.setAttribute("class", "btn btn-primary red button border-dark");
  deleteBttn.setAttribute("id", "delete");

  // Above, I set attributes for the task card

  divHEL.textContent = task.title;
  divh5.textContent = task.task;
  divP.textContent = task.dateDue;
  deleteBttn.textContent = "Delete";

  //Above,  I set the text content of the card

  sectionEL.dataset.taskId = task.id;

  // Above, I give each section created a id that is matched from local storage

  now = dayjs();
  projectDueDate = dayjs(task.dateDue, "YYYY MMMM DD");

  console.log(projectDueDate);

  if (now.isSame(projectDueDate, "day")) {
    sectionEL.setAttribute("class", "yellow");
  } else if (now.isBefore(projectDueDate, "day")) {
    sectionEL.setAttribute("class", "green");
  } else {
    sectionEL.setAttribute("class", "red");
  }

  // ABove, I used dayjs to change the color of the cards depending on date.

  if (task.status === "to-do") {
    toDoCards.appendChild(sectionEL);
  } else if (task.status === "in-progress") {
    inProgressCards.appendChild(sectionEL);
  } else {
    sectionEL.setAttribute("class", "white");
    doneCards.appendChild(sectionEL);
  }

  // Above, I appened the card into the lane matching its status.

  sectionEL.appendChild(divHEL);
  sectionEL.appendChild(divBEL);
  divBEL.appendChild(divh5);
  divBEL.appendChild(divP);
  divBEL.appendChild(deleteBttn);

  // Above, I appened the rest of the elements
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  let task = taskList;
  console.log(task);
  toDoCards.textContent = "";
  inProgressCards.textContent = "";
  doneCards.textContent = "";
  // I have to clear the inner html or text content  of the todo cards section before running again the code again or will reitterate and create more cards then needed.

  task.forEach(createTaskCard);
  // Above, I used a for each to itterate over task

  const draggableElements = document.querySelectorAll("#drag");
  $(draggableElements).draggable({
    revert: "invalid",

    // Above, I added jquery to make the card created draggable by selecting elements with a id of drag.
  });
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
    status: "to-do",
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
function handleDeleteTask(event) {
  event.preventDefault();
  event.stopPropagation();

  // Above, I defined and called two event handeler functions

  let deleteButton = event.target.closest("#delete");
  console.log(deleteButton);
  // Above, I  queried the button made from the createtask card function

  let task = taskList;
  console.log(task);

  let actualTaskID = deleteButton.closest("#drag").dataset.taskId;
  console.log(actualTaskID);

  // Above, I recived the task ID of the actual event clicked.

  let indexToRemove = task.findIndex((task) => task.id === actualTaskID);

  // Above, I found the index of the task I want to delete.

  if (indexToRemove !== -1) {
    task.splice(indexToRemove, 1);
  }

  // Above, I created conditional based on the index to remove.
  // Then I use the .splice method to remove that index.

  console.log(task);
  // Above, I cosole log task again to see if an item was removed from array.

  let userTaskSerialized = JSON.stringify(task);

  localStorage.setItem("tasks", userTaskSerialized);

  // Above, I saved the new arry back to local storage.

  renderTaskList();

  // Above, I reload the page each time the button is clicked and render the new task cards
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  event.preventDefault();

  let tasks = taskList;

  // Above, I got the task list from local storage.

  const taskId = ui.draggable[0].dataset.taskId;
  const newStatus = event.target.id;

  console.log(taskId);
  console.log(newStatus);

  // Above, I retrieved the task card being dragged task unique ID and retrived the id of the lane being targeted

  for (let task of tasks) {
    if (task.id === taskId) {
      task.status = newStatus;
    }

    console.log(task.status);
  }
  // Above, I changed the status of the task card to match the id of the lane.

  localStorage.setItem("tasks", JSON.stringify(tasks));
  // Above, I saved the items back to local storage after updating the status.

  renderTaskList();
  // Above, I called render Task.
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  addTask.addEventListener("click", handleAddTask);
  // Above, I have a event listener for the modal 


  renderTaskList();

  // Above, I render the task list.

  

  toDoCards.addEventListener("click", handleDeleteTask);
  inProgressCards.addEventListener("click", handleDeleteTask);
  doneCards.addEventListener("click", handleDeleteTask);

  // Above, I have a event listener for all the lanes to hear a when the delete button is pressed.

  $(".card").droppable({
    accept: "#drag",
    drop: handleDrop,
  });

  // Above, I made all the lanes droppaple and can only accept items with a id of drag
});
