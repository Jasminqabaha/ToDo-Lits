import Button from './Button.jsx';
import React, { useState,useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TodoContext } from '../store/todo-context.jsx';
export default function ToDoList({  }) {
  const {tasks,filter, editTask,deleteTask,completeOrUncompleteTask} = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(null); 
  const [editedTask, setEditedTask] = useState('');

  function handleEditClick(index) {
    setIsEditing(index);
    setEditedTask(tasks[index].text);
  }

  function handleSaveEdit(index) {
    editTask(index, editedTask);
    setIsEditing(null);
  }

  function handleDeleteClick(index) {
    deleteTask(index); 
  }

  function handleCheckboxChange(index) {
    completeOrUncompleteTask(index);
  }


  const indexedTasks = tasks
  .map((task, index) => ({ ...task, originalIndex: index }));

  const filteredTasks = indexedTasks.filter(task => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.isCompleted;
    } else if (filter === 'pending') {
      return !task.isCompleted;
    }
    return true;
  });

  return (
    <div className="w-full m-auto mt-4">
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks added yet.</p>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.originalIndex} className="flex justify-between items-center border border-gray-300 p-2 mb-3">
            {isEditing === task.originalIndex ? (
              <input
                type="text"
                value={editedTask}
                onChange={(event) => setEditedTask(event.target.value)}
                className="border-b-2 border-gray-300 focus:border-teal-500 outline-none"
              />
            ) : (
              <span className={`text-gray-700 ${task.isCompleted ? 'line-through text-red-500' : ''}`}>
                {task.text}
              </span>
            )}
            <div className="flex space-x-2">
              {isEditing === task.originalIndex ? (
                <Button onClick={() => handleSaveEdit(task.originalIndex)}>Save</Button>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleCheckboxChange(task.originalIndex)}
                    className={`cursor-pointer ${task.isCompleted ? 'border-green-500 accent-green-500' : 'border-gray-300 accent-gray-300'}`}
                  />
                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => handleEditClick(task.originalIndex)}
                    className="cursor-pointer text-yellow-400"
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteClick(task.originalIndex)}
                    className="cursor-pointer text-red-500"
                  />
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
