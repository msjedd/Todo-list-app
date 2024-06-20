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
  listItem.appendChild(checkbox);

  checkbox.addEventListener("change", function () {
    this.checked
      ? (taskText.style.textDecoration = "line-through")
      : (taskText.style.textDecoration = "none");
  });
};

const editButton = function (listItem, deleteButton) {
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
  });
};

const saveTasksToLocalStorage = function () {
  const allTasks = [];
  const taskTexts = document.querySelectorAll("#todo-list li");
  taskTexts.forEach((taskText) => {
    const text = taskText.querySelector("span").textContent;
    allTasks.push(text);
  });

  localStorage.setItem("todoTasks", JSON.stringify(allTasks));
};

const renderSave = function () {
  document.addEventListener("DOMContentLoaded", function () {
    const savedTasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
    savedTasks.forEach((task) => {
      addTask(task);
    });
  });
};

renderSave();

const deleteButton = function (listItem) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  listItem.appendChild(deleteButton);

  deleteButton.addEventListener("click", function (e) {
    todoList.removeChild(listItem);

    if (localStorage.getItem("todoTasks") === null) {
      return; // no items saved, nothing to delete
    }
    const deleteTaskItem = e.target.parentNode.firstChild.textContent;

    let items = JSON.parse(localStorage.getItem("todoTasks"));
    const remainingTasks = items.filter((item) => item !== deleteTaskItem);
    localStorage.setItem("todoTasks", JSON.stringify(remainingTasks));
  });
};
