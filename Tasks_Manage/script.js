document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskDescription = document.getElementById('taskDescription');
    const taskStatus = document.getElementById('taskStatus');
    const taskDueDate = document.getElementById('taskDueDate');
    const taskList = document.getElementById('taskList');
  
    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach(function(task, index) {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${task.title}</strong><br>
          Description: ${task.description}<br>
          Status: ${task.status}<br>
          Due Date: ${task.dueDate}<br>
          <button data-index="${index}">Delete</button>
        `;
        li.querySelector('button').addEventListener('click', function() {
          tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        });
        taskList.appendChild(li);
      });
    }
  
    // Add task
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const title = taskInput.value.trim();
      const description = taskDescription.value.trim();
      const status = taskStatus.value;
      const dueDate = taskDueDate.value;
      if (title) {
        tasks.push({ title, description, status, dueDate });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
        taskDescription.value = '';
        taskStatus.value = 'not-started';
        taskDueDate.value = '';
      }
    });
  
    // Initial render
    renderTasks();
  });
  