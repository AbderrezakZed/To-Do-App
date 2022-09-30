let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksdiv = document.querySelector(".tasks");
let delButton = document.querySelector(".delbtn");
let darkButton = document.querySelector(".darkBtn");

//Empty Array To Store Tasks
let arrayOfTasks = [];
//Check if There's Tasks in Local Storage
if (localStorage.getItem("task")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("task"));
}
//function get data
getDataFromLS();
//Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); //Add Task To Array Of Tasks
    input.value = ""; //Clear input Value
  }
};

//Click On Task Element
tasksdiv.addEventListener("click", (e) => {
  //Delete Button
  if (e.target.classList.contains("del")) {
    //Remove Task From Local Storage
    deleteTaskLS(e.target.parentElement.getAttribute("data-id"));
    //Remove div Task From Page
    e.target.parentElement.remove();
  }
  //Task Element Done
  if (e.target.classList.contains("task")) {
    //Toggle Completed For the Task
    toggleStatusTask(e.target.getAttribute("data-id"));
    //Active Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(tasktext) {
  //Task Data
  const task = {
    id: Date.now(),
    title: tasktext,
    completed: false,
  };
  //Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  //Add Task To Document Page
  addElementsToPageFrom(arrayOfTasks);
  //Add Data To Local storage
  addDataToLSFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  //Clear Tasks Div
  tasksdiv.innerHTML = "";
  //Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    //Creat Main div
    let div = document.createElement("div");
    div.className = "task";
    //Check if Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    //Creat Button Delete
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    //Add Button Span To Div
    div.appendChild(span);
    //Add Task To Tasks in Page
    tasksdiv.appendChild(div);
  });
}

function addDataToLSFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLS() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let task = JSON.parse(data);
    addElementsToPageFrom(task);
  }
}

function deleteTaskLS(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLSFrom(arrayOfTasks);
}

function toggleStatusTask(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLSFrom(arrayOfTasks);
}

//Button Delete All Task
delButton.addEventListener("click", (e) => {
  window.localStorage.removeItem("tasks");
  tasksdiv.innerHTML = "";
});

//Dark Mode
darkButton.addEventListener("click", (e) => {
  darkModeFunc();
});

function darkModeFunc() {
  let element = document.querySelector(".bod");
  element.classList.toggle("dark-mode-blue");
  input.classList.toggle("dark-mode-black");
  tasksdiv.classList.toggle("dark-mode-black-task");
}
