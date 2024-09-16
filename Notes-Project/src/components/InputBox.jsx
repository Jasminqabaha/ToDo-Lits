import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Button from './Button.jsx';

export default function InputBox({onAddTask}) {
  const [newTask,setNewTask] = useState('');
  const [error, setError] = useState('');

  function handleChange(event){
    setNewTask(event.target.value);
    setError('');
  }
  function handleButtonClick() {
    onAddTask(newTask); 
    setNewTask(''); 
  }

  function handleButtonClick() {
    const englishRegex = /^[a-zA-Z0-9\s.,!?'"-]+$/;
    
    if (englishRegex.test(newTask)) {
      onAddTask(newTask);
      setNewTask(''); 
    } else {
      setError('Please enter the task in English');
    }
  }

  return (
    <div className="flex flex-col items-center w-full border border-gray-300 rounded-lg p-4 mt-5">
      <div className="w-11/12">
        <div className="flex items-center border border-gray-300 rounded-lg w-full overflow-hidden"> 
          <div className='w-12 h-12 flex justify-center items-center' style={{ backgroundColor: '#089da1' }}>
            <FontAwesomeIcon icon={faClipboardList} className="text-white" />
          </div>
          <input
            type="text"
            placeholder="New Todo"
            className="w-full border-none focus:outline-none text-gray-700 h-12 px-2"
            value={newTask}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Button onClick={handleButtonClick}>
          Add new task
        </Button>
      </div>
    </div>
  );
}
