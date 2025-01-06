document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task');
  const taskList = document.getElementById('tasks');
  const addTaskButton = document.getElementById('add-task');

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.textContent = task;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        removeTask(index);
      });
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  };

  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  };

  const addTask = () => {
    const task = taskInput.value.trim();
    if (task) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      saveTasks(tasks);
      taskInput.value = '';
    }
  };

  const removeTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    saveTasks(tasks);
  };

  addTaskButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  loadTasks();
});
