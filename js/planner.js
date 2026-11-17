/**
 * COS 106 - Introduction to Web Technologies
 * Script: js/planner.js
 * Interactive Task Management System using DOM manipulation, event listeners, and arrays
 */

document.addEventListener('DOMContentLoaded', () => {
  initAcademicPlanner();
});

function initAcademicPlanner() {
  // DOM Elements
  const taskForm = document.getElementById('taskForm');
  const taskTitleInput = document.getElementById('taskTitle');
  const taskCourseInput = document.getElementById('taskCourse');
  const taskDueDateInput = document.getElementById('taskDueDate');
  const taskPriorityInput = document.getElementById('taskPriority');
  const taskListEl = document.getElementById('taskList');
  const emptyPlaceholder = document.getElementById('emptyPlaceholder');
  const filterTabs = document.querySelectorAll('.tab-btn');

  // Stats Elements
  const totalTasksEl = document.getElementById('totalTasksCount');
  const completedTasksEl = document.getElementById('completedTasksCount');
  const pendingTasksEl = document.getElementById('pendingTasksCount');
  const completionRateEl = document.getElementById('completionRate');

  // Storage key
  const STORAGE_KEY = 'cos106_academic_tasks';

  // Default tasks if none exist
  const defaultTasks = [
    {
      id: 'task-1',
      title: 'Complete COS 106 Web Technologies Term Project',
      course: 'COS 106',
      dueDate: '2026-11-20',
      priority: 'high',
      completed: false
    },
    {
      id: 'task-2',
      title: 'Read Lecture 4: Semantic HTML5 Elements & Tables',
      course: 'COS 106',
      dueDate: '2026-11-18',
      priority: 'medium',
      completed: true
    },
    {
      id: 'task-3',
      title: 'Submit Data Structures Lab Assignment 2',
      course: 'COS 102',
      dueDate: '2026-11-25',
      priority: 'high',
      completed: false
    },
    {
      id: 'task-4',
      title: 'Review Calculus Practice Problems for Mid-semester Quiz',
      course: 'MTH 101',
      dueDate: '2026-11-28',
      priority: 'low',
      completed: false
    }
  ];

  // Active filter state ('all', 'pending', 'completed')
  let currentFilter = 'all';

  // Task Array in Memory
  let tasks = loadTasksFromStorage();

  /**
   * Load Tasks from localStorage or return defaults
   * @returns {Array} Array of task objects
   */
  function loadTasksFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('localStorage read error, falling back to defaults:', e);
    }
    return defaultTasks;
  }

  /**
   * Save Tasks Array to localStorage
   */
  function saveTasksToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.warn('localStorage write error:', e);
    }
  }

  /**
   * Calculate and update statistical dashboard numbers
   */
  function updateDashboardStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (totalTasksEl) totalTasksEl.textContent = total;
    if (completedTasksEl) completedTasksEl.textContent = completed;
    if (pendingTasksEl) pendingTasksEl.textContent = pending;
    if (completionRateEl) completionRateEl.textContent = `${rate}%`;
  }

  /**
   * Render tasks to the DOM based on active filter
   */
  function renderTaskList() {
    // Clear list
    taskListEl.innerHTML = '';

    // Filter tasks based on currentFilter
    const filteredTasks = tasks.filter(task => {
      if (currentFilter === 'pending') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      return true; // 'all'
    });

    if (filteredTasks.length === 0) {
      if (emptyPlaceholder) {
        emptyPlaceholder.style.display = 'block';
      }
    } else {
      if (emptyPlaceholder) {
        emptyPlaceholder.style.display = 'none';
      }

      filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.id = task.id;

        // Priority Badge Class & Label
        let priorityClass = 'priority-low';
        let priorityLabel = 'Low';
        if (task.priority === 'high') {
          priorityClass = 'priority-high';
          priorityLabel = 'High';
        } else if (task.priority === 'medium') {
          priorityClass = 'priority-medium';
          priorityLabel = 'Medium';
        }

        // Format due date nicely
        const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) : 'No due date';

        li.innerHTML = `
          <div class="task-left">
            <input 
              type="checkbox" 
              class="task-checkbox" 
              aria-label="Mark task '${escapeHtml(task.title)}' as completed"
              ${task.completed ? 'checked' : ''} 
              data-task-id="${task.id}"
            />
            <div class="task-content">
              <h4 class="task-title">${escapeHtml(task.title)}</h4>
              <div class="task-meta">
                <span class="tag tag-accent">${escapeHtml(task.course)}</span>
                <span>📅 Due: ${formattedDate}</span>
                <span class="priority-badge ${priorityClass}">${priorityLabel} Priority</span>
              </div>
            </div>
          </div>
          <div class="task-actions">
            <button 
              type="button" 
              class="btn-icon delete-task-btn" 
              aria-label="Delete task '${escapeHtml(task.title)}'" 
              data-task-id="${task.id}"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        `;

        taskListEl.appendChild(li);
      });
    }

    updateDashboardStats();
  }

  /**
   * Escape HTML to prevent XSS injection
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Add a new Task
   */
  function handleAddTask(e) {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    const course = taskCourseInput.value.trim() || 'General';
    const dueDate = taskDueDateInput.value;
    const priority = taskPriorityInput.value || 'medium';

    if (!title) {
      alert('Please enter a task title before submitting.');
      taskTitleInput.focus();
      return;
    }

    const newTask = {
      id: 'task-' + Date.now(),
      title: title,
      course: course,
      dueDate: dueDate,
      priority: priority,
      completed: false
    };

    // Prepend to array
    tasks.unshift(newTask);
    saveTasksToStorage();
    renderTaskList();

    // Reset Form
    taskForm.reset();
    // Default date to 7 days from now
    setDefaultDueDate();
  }

  /**
   * Toggle task completion status
   */
  function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveTasksToStorage();
      renderTaskList();
    }
  }

  /**
   * Delete a task by ID
   */
  function deleteTask(taskId) {
    const confirmDelete = confirm('Are you sure you want to remove this academic task?');
    if (confirmDelete) {
      tasks = tasks.filter(t => t.id !== taskId);
      saveTasksToStorage();
      renderTaskList();
    }
  }

  /**
   * Helper to set initial default due date to 1 week ahead
   */
  function setDefaultDueDate() {
    if (taskDueDateInput) {
      const today = new Date();
      today.setDate(today.getDate() + 7);
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      taskDueDateInput.value = `${yyyy}-${mm}-${dd}`;
    }
  }

  // Event Listeners
  if (taskForm) {
    taskForm.addEventListener('submit', handleAddTask);
  }

  // Delegated events for Checkbox & Delete on Task List
  if (taskListEl) {
    taskListEl.addEventListener('change', (e) => {
      if (e.target.classList.contains('task-checkbox')) {
        const taskId = e.target.getAttribute('data-task-id');
        toggleTaskCompletion(taskId);
      }
    });

    taskListEl.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.delete-task-btn');
      if (deleteBtn) {
        const taskId = deleteBtn.getAttribute('data-task-id');
        deleteTask(taskId);
      }
    });
  }

  // Filter Tabs Event Listeners
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-filter') || 'all';
      renderTaskList();
    });
  });

  // Initial Load
  setDefaultDueDate();
  renderTaskList();
}
