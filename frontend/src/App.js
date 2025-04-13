import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for storing tasks and dark mode
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Add Task
  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = { id: Date.now(), text: newTask, completed: false, editing: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  // Toggle Task Completion
  const toggleCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Edit Task
  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText, editing: false } : task
    ));
  };

  // Start editing
  const startEditing = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, editing: true } : task
    ));
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return filter === 'completed' ? task.completed : !task.completed;
  });

  // Set filter state
  const handleFilter = (filterValue) => {
    setFilter(filterValue);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="filter-buttons">
        <button 
          className={`filter ${filter === 'all' ? 'active' : ''}`} 
          onClick={() => handleFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter ${filter === 'completed' ? 'active' : ''}`} 
          onClick={() => handleFilter('completed')}
        >
          Completed
        </button>
        <button 
          className={`filter ${filter === 'pending' ? 'active' : ''}`} 
          onClick={() => handleFilter('pending')}
        >
          Pending
        </button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {task.editing ? (
              <input
                type="text"
                defaultValue={task.text}
                onBlur={(e) => editTask(task.id, e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && editTask(task.id, e.target.value)}
              />
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => startEditing(task.id)}>Edit</button>
              </>
            )}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
          </li>
        ))}
      </ul>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

export default App;