const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAll");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render Tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button class="delete" onclick="deleteTask(${index})">✖</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Add Task Function
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") return;

  tasks.push({
    text: text,
    completed: false
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
}

// Add Button Click
addTaskBtn.addEventListener("click", addTask);

// Enter Key Press
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Toggle Complete
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Clear All Tasks
clearAllBtn.addEventListener("click", function () {
  tasks = [];
  localStorage.removeItem("tasks");
  renderTasks();
});

// Initial Render
renderTasks();