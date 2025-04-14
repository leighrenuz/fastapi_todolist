import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const addTask = async () => {
    if (newTask.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:8000/tasks', {
        title: newTask,
        completed: false
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleCompletion = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

      const response = await axios.put(`http://localhost:8000/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => task.id === id ? response.data : task));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const editTask = async (id, newText) => {
    try {
      const response = await axios.put(`http://localhost:8000/tasks/${id}`, {
        title: newText,
      });
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: response.data.title, editing: false } : task
      ));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const startEditing = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, editing: true } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return filter === 'completed' ? task.completed : !task.completed;
  });

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
