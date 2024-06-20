const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTask = todoInput.value;

  if (newTask === "") {
    alert("Please enter new Task!");
    return;
  }
  todoInput.value = "";

  addTask(newTask);
});

const addTask = function (task) {
  const listItem = document.createElement("li");
  const taskText = document.createElement("span");
  taskText.textContent = task;
  const span = document.querySelector("span");
  listItem.appendChild(taskText);

  createCheckBox(listItem, taskText);
  editButton(listItem, taskText);
  deleteButton(listItem);

  todoList.appendChild(listItem);

  saveTasksToLocalStorage();
};

const createCheckBox = function (listItem, taskText) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  // checkbox.id = "check";
  // checkbox.width = "3rem";
  listItem.appendChild(checkbox);

  // listItem.appendChild(status);

  checkbox.addEventListener("change", function () {
    this.checked
      ? (taskText.style.textDecoration = "line-through")
      : (taskText.style.textDecoration = "none");
  });
};

const editButton = function (listItem, taskText) {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  listItem.appendChild(editButton);

  editButton.addEventListener("click", function (e) {
    if (e.target.textContent === "Edit") {
      const span = listItem.firstElementChild;
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      listItem.insertBefore(input, span);
      listItem.removeChild(span);

      editButton.textContent = "Save";
    } else if (e.target.textContent == "Save") {
      const input = listItem.firstElementChild;
      const span = document.createElement("span");
      span.textContent = input.value;
      listItem.insertBefore(span, input);
      listItem.removeChild(input);
      editButton.textContent = "Edit";
    }
    // const isEditing = listItem.classList.contains("editing");
    // if (isEditing) {
    //   taskText.textContent = this.value;
    //   console.log(this);
    //   listItem.classList.remove("editing");
    //   editButton.textContent = "Edit";
    // } else {
    //   const input = document.createElement("input");
    //   input.type = "text";
    //   input.value = taskText.textContent;
    //   listItem.insertBefore(input, taskText);
    //   listItem.removeChild(taskText);
    //   listItem.classList.add("editing");
    //   editButton.textContent = "Save";
    // }
  });
};

const saveTasksToLocalStorage = function () {
  const allTasks = [];
  const taskTexts = document.querySelectorAll("#todo-list li");
  taskTexts.forEach((taskT) => {
    const text = taskT.querySelector("span").textContent;

    allTasks.push(text);
    console.log(allTasks);
  });

  localStorage.setItem("todoTasks", JSON.stringify(allTasks));

  // let todoTasks = [];
  // const todoJson = localStorage.getItem("todoTasks");
  // if (todoJson) {
  //   todoTasks = JSON.parse(todosJson);
  // }
};

const savedTasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
const renderSave = function () {
  document.addEventListener("DOMContentLoaded", function () {
    // console.log(savedTasks);
    savedTasks.forEach((task) => {
      addTask(task);
    });
  });
};

renderSave();

const deleteButton = function (listItem) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  // console.log(listItem);
  listItem.appendChild(deleteButton);

  deleteButton.addEventListener("click", function (e) {
    todoList.removeChild(listItem);
    // console.log(allTasks);

    if (localStorage.getItem("todoTasks") === null) {
      return; // no items saved, nothing to delete
    }
    const deleted = e.target.parentNode.firstChild.textContent;
    console.log(deleted);
    let items = JSON.parse(localStorage.getItem("todoTasks"));
    // console.log(items);

    const notDeleted = items.filter((item) => item !== deleted);
    console.log(notDeleted);
    localStorage.setItem("todoTasks", JSON.stringify(notDeleted));
    // console.log(localStorage.todoTasks);
  });
};
