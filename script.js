const taskInput = document.getElementById('taskInput');
const addBtn    = document.getElementById('addBtn');
const taskList  = document.getElementById('taskList');

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const done = li.classList.contains('completed');
    tasks.push({ text, done });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// add new
function addTask(text, done=false) {
  const li = document.createElement('li');
  li.className = "task";
  if (done) li.classList.add('completed');


  const span = document.createElement('span');
  span.textContent = text;

  // done btn
  const doneBtn = document.createElement('button');
  doneBtn.textContent = "✔";
  doneBtn.className = "btn-done";
  doneBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  // edit btn
  const editBtn = document.createElement('button');
  editBtn.textContent = "✏";
  editBtn.className = "btn-edit";
  editBtn.addEventListener('click', () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveTasks();
    }
  });

  // remove btn
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "✖";
  deleteBtn.className = "btn-delete";
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(doneBtn);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  li.appendChild(span);

  taskList.appendChild(li);
  saveTasks();
}

// add btn
addBtn.addEventListener('click', () => {
  if (taskInput.value.trim()) {
    addTask(taskInput.value.trim());
    taskInput.value = '';
  }
});

const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
saved.forEach(t => addTask(t.text, t.done));