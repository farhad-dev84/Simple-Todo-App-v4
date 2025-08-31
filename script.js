// گرفتن المنت های HTML
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const filter = document.getElementById("filter");
const clearAll = document.getElementById("clear-all");
const todoList = document.getElementById("todo-list");

// آرایه کارها
let todos = [];

// ==============================
// ذخیره در LocalStorage
// ==============================
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ==============================
// بارگذاری از LocalStorage
// ==============================
function loadTodos() {
  const stored = localStorage.getItem("todos");
  if (stored) todos = JSON.parse(stored);
}

// ==============================
// نمایش کارها
// ==============================
function renderTodos() {
  todoList.innerHTML = ""; // خالی کردن لیست
  const filterValue = filter.value; // گرفتن نوع فیلتر

  todos.forEach((todo, index) => {
    // اعمال فیلتر
    if ((filterValue === "completed" && !todo.completed) ||
        (filterValue === "pending" && todo.completed)) return;

    // ساخت لی آیتم
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span class="${todo.completed ? "completed" : ""}">
        ${todo.text} <small class="text-muted">(${todo.date})</small>
      </span>
      <div>
        <button class="btn btn-success btn-sm complete-btn">✔</button>
        <button class="btn btn-danger btn-sm delete-btn">✖</button>
      </div>
    `;

    // تیک انجام شده
    li.querySelector(".complete-btn").addEventListener("click", () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });

    // حذف
    li.querySelector(".delete-btn").addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    todoList.appendChild(li);
  });
}

// ==============================
// اضافه کردن کار جدید
// ==============================
function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  const now = new Date();
  const dateStr = now.toLocaleString("fa-IR", { hour: "2-digit", minute: "2-digit" });

  todos.push({ text: text, completed: false, date: dateStr });
  saveTodos();
  renderTodos();
  todoInput.value = "";
}

// ==============================
// پاک کردن همه
// ==============================
function clearAllTodos() {
  todos = [];
  saveTodos();
  renderTodos();
}

// ==============================
// رویدادها
// ==============================
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addTodo(); });
filter.addEventListener("change", renderTodos);
clearAll.addEventListener("click", clearAllTodos);

// ==============================
// بارگذاری اولیه
// ==============================
loadTodos();
renderTodos();