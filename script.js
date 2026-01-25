const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const reminder = document.getElementById("reminder");
const themeSwitch = document.getElementById("themeSwitch");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  const today = new Date().toISOString().split("T")[0];
  const due = prompt("Enter due date (YYYY-MM-DD):", today);

  const task = {
    text,
    createdAt: today,
    dueDate: due,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

// Render Tasks
function renderTasks() {
  taskList.innerHTML = "";
  reminder.style.display = tasks.length ? "none" : "block";

  const today = new Date().toISOString().split("T")[0];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task";

    if (task.completed) li.classList.add("completed");
    if (!task.completed && task.dueDate < today) li.classList.add("overdue");

    li.innerHTML = `
      <div class="left">
        <input type="checkbox" class="check" ${task.completed ? "checked" : ""}>
        <div>
          <p class="task-text">${task.text}</p>
          <small class="task-date">
            Created: ${task.createdAt} • Due: ${task.dueDate}
          </small>
        </div>
      </div>
      <span class="delete">❌</span>
    `;

    // Checkbox → mark complete
    li.querySelector(".check").addEventListener("change", (e) => {
      task.completed = e.target.checked;
      saveTasks();
      renderTasks();
    });

    // Delete task
    li.querySelector(".delete").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

renderTasks();
