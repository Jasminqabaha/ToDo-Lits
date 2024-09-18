import { useState, useEffect,useContext } from 'react';
import InputBox from './components/InputBox.jsx';
import H2 from './components/H2.jsx';
import ToDoList from './components/ToDoList.jsx';
import Button from './components/Button.jsx';
import DeleteButton from './components/DeleteButton.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import { TodoContext } from './store/todo-context.jsx';
;

function App() {
  const {filterSelect,deleteAllTasks,deleteDoneTasks} = useContext(TodoContext);


  return (
    <div className='w-11/12 flex justify-center flex-col m-auto'>
      <H2>To Do Input</H2>
      <InputBox/>

      <Modal>
        <DeleteConfirmation />
      </Modal>

      <H2>To Do List</H2>

      <div className="flex justify-center space-x-4 w-full mt-4">
        <Button onClick={() => filterSelect('all')}>All</Button>
        <Button onClick={() => filterSelect('completed')}>Done</Button>
        <Button onClick={() => filterSelect('pending')}>To Do</Button>
      </div>

      <ToDoList/>

      <div className="flex justify-center space-x-4 w-full mt-4">
      <DeleteButton onClick={deleteDoneTasks}>Delete Done Tasks</DeleteButton>
      <DeleteButton onClick={deleteAllTasks}>Delete All Tasks</DeleteButton>
      </div>
    </div>
  );
}

export default App;
