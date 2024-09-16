import { useState, useEffect } from 'react';
import InputBox from './components/InputBox.jsx';
import H2 from './components/H2.jsx';
import ToDoList from './components/ToDoList.jsx';
import Button from './components/Button.jsx';
import DeleteButton from './components/DeleteButton.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteType, setDeleteType] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [hasMounted, setHasMounted] = useState(false); // Track if initial load is done


  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); 
    }
    setHasMounted(true); 
  }, []);
  
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, hasMounted]);

  function handleAddTask(task) {
    if (task.trim() !== '') {
      const newTask = { text: task, isCompleted: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  }

  function handleEditTask(index, newTask) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newTask } : task
    );
    setTasks(updatedTasks);
  }

  function handleDeleteTask(index) {
    setDeleteType('single');
    setTaskToDelete(index);
    setModalIsOpen(true);
  }

  function handleConfirmDeleteTask() {
    if (deleteType === 'single' && taskToDelete !== null) {
      const updatedTasks = tasks.filter((task, i) => i !== taskToDelete);
      setTasks(updatedTasks);
    } else if (deleteType === 'all') {
      setTasks([]);
    } else if (deleteType === 'done') {
      const updatedTasks = tasks.filter((task) => !task.isCompleted);
      setTasks(updatedTasks);
    }
    setModalIsOpen(false);
  }

  function handleCompleteOrUncompleteTask(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  }

  function handleDeleteAllTasks() {
    setDeleteType('all');
    setModalIsOpen(true);
  }

  function handleDeleteDoneTasks() {
    setDeleteType('done');
    setModalIsOpen(true);
  }

  function handleCancelDelete() {
    setModalIsOpen(false);
    setTaskToDelete(null);
    setDeleteType(null);
  }

  return (
    <div className='w-11/12 flex justify-center flex-col m-auto'>
      <H2>To Do Input</H2>
      <InputBox onAddTask={handleAddTask} />

      <Modal open={modalIsOpen} onClose={handleCancelDelete}>
        <DeleteConfirmation
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDeleteTask}
        />
      </Modal>

      <H2>To Do List</H2>

      <div className="flex justify-center space-x-4 w-full mt-4">
        <Button onClick={() => setFilter('all')}>All</Button>
        <Button onClick={() => setFilter('completed')}>Done</Button>
        <Button onClick={() => setFilter('pending')}>To Do</Button>
      </div>

      <ToDoList
        tasks={tasks}
        filter={filter}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onCompleteOrUncompleteTask={handleCompleteOrUncompleteTask}
      />

      <div className="flex justify-center space-x-4 w-full mt-4">
        <DeleteButton onClick={handleDeleteDoneTasks}>Delete Done Tasks</DeleteButton>
        <DeleteButton onClick={handleDeleteAllTasks}>Delete All Tasks</DeleteButton>
      </div>
    </div>
  );
}

export default App;
