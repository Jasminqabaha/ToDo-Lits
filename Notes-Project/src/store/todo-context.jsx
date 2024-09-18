import { createContext, useReducer,useEffect } from 'react';

export const TodoContext = createContext({
  tasks: [],
  addTask: ()=>{},
  editTask:()=>{},
  deleteTask:()=>{},
  confirmDeleteTask:()=>{},
  completeOrUncompleteTask:()=>{},
  deleteAllTasks:()=>{},
  deleteDoneTasks:()=>{},
  cancelDelete:()=>{},
  filterSelect:()=>{}

});


  
  function todoReducer(state, action) {
    switch (action.type) {
      case 'ADD_TASK':
        if (action.payload.trim() !== '') {
          const newTask = { text: action.payload, isCompleted: false };
          return { ...state, tasks: [...state.tasks, newTask] };
        }
        return state;
    
      case 'ADD_DEFAULT_TASKS':
        return { ...state, tasks: action.payload };
    case 'MOUNTED':
        return { ...state, hasMounted: action.payload };


      case 'EDIT_TASK':
        const updatedTasks = state.tasks.map((task, i) =>
          i === action.payload.index ? { ...task, text: action.payload.newTask } : task
        );
        return { ...state, tasks: updatedTasks };
      case 'DELETE_TASK':
        const filteredTasks = state.tasks.filter((_, i) => i !== action.payload);
        return { ...state, tasks: filteredTasks };
      case 'TOGGLE_TASK_COMPLETION':
        const toggledTasks = state.tasks.map((task, i) =>
          i === action.payload ? { ...task, isCompleted: !task.isCompleted } : task
        );
        return { ...state, tasks: toggledTasks };
      case 'SET_DELETE_TYPE':
        return { ...state, deleteType: action.payload };
        case 'FILTER_SELECT':
            return { ...state, filter: action.payload };
        // case 'SELECT_ALL':
        // case 'SELECT_COMPLETED':
        //     case 'SELECT_PENDING':
        //     return { ...state, filter: action.payload };
      case 'SET_TASK_TO_DELETE':
        return { ...state, taskToDelete: action.payload };
      case 'TOGGLE_MODAL':
        return { ...state, modalIsOpen: !state.modalIsOpen };
      case 'CLEAR_MODAL':
        return { ...state, modalIsOpen: false, taskToDelete: null, deleteType: null };
      case 'DELETE_ALL_TASKS':
        return { ...state, tasks: [] };
      case 'DELETE_DONE_TASKS':
        const tasksWithoutCompleted = state.tasks.filter((task) => !task.isCompleted);
        return { ...state, tasks: tasksWithoutCompleted };
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }
  

export default function TodoContextProvider({ children }) {

    const [todoState,todoDispatch]=useReducer( 
        todoReducer, 
        {
            tasks: [],
            filter: 'all',
            modalIsOpen: false,
            deleteType: null,
            taskToDelete: null,
            hasMounted: false 
          }
    );

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            todoDispatch({ type: 'ADD_DEFAULT_TASKS', payload: JSON.parse(storedTasks) });
        }
        todoDispatch({ type: 'MOUNTED', payload: true}); 
      }, []);
      
      useEffect(() => {
        if (todoState.hasMounted) {
          localStorage.setItem('tasks', JSON.stringify(todoState.tasks));
        }
      }, [todoState.tasks, todoState.hasMounted]);

    function handleAddTask(task) {
        todoDispatch({ type: 'ADD_TASK', payload: task });
      }
    
      function handleEditTask(index, newTask) {
        todoDispatch({ type: 'EDIT_TASK', payload: { index, newTask } });
      }
    
      function handleDeleteTask(index) {
        todoDispatch({ type: 'SET_DELETE_TYPE', payload: 'single' });
        todoDispatch({ type: 'SET_TASK_TO_DELETE', payload: index });
        todoDispatch({ type: 'TOGGLE_MODAL' });
      }
    
      function handleConfirmDeleteTask() {
        if (todoState.deleteType === 'single' && todoState.taskToDelete !== null) {
          todoDispatch({ type: 'DELETE_TASK', payload: todoState.taskToDelete });
        } else if (todoState.deleteType === 'all') {
          todoDispatch({ type: 'DELETE_ALL_TASKS' });
        } else if (todoState.deleteType === 'done') {
          todoDispatch({ type: 'DELETE_DONE_TASKS' });
        }
        todoDispatch({ type: 'CLEAR_MODAL' });
      }
      
    
      function handleCompleteOrUncompleteTask(index) {
        todoDispatch({ type: 'TOGGLE_TASK_COMPLETION', payload: index });
      }
    
      function handleDeleteAllTasks() {
        todoDispatch({ type: 'SET_DELETE_TYPE', payload: 'all' });
        todoDispatch({ type: 'TOGGLE_MODAL' });
      }
    
      function handleDeleteDoneTasks() {
        todoDispatch({ type: 'SET_DELETE_TYPE', payload: 'done' });
        todoDispatch({ type: 'TOGGLE_MODAL' });
      }
    
      function handleCancelDelete() {
        todoDispatch({ type: 'CLEAR_MODAL' });
      }
      function handleFilterSelect(type){
        todoDispatch({ type: 'FILTER_SELECT', payload: type });
      }

      const ctxValue = {
        tasks: todoState.tasks,
            filter: todoState.filter,
            modalIsOpen: todoState.modalIsOpen,
            deleteType: todoState.deleteType,
            taskToDelete: todoState.taskToDelete,
            hasMounted: todoState.hasMounted ,

            addTask: handleAddTask,
            editTask:handleEditTask,
            deleteTask:handleDeleteTask,
            confirmDeleteTask:handleConfirmDeleteTask,
            completeOrUncompleteTask:handleCompleteOrUncompleteTask,
            deleteAllTasks:handleDeleteAllTasks,
            deleteDoneTasks:handleDeleteDoneTasks,
            cancelDelete:handleCancelDelete,
            filterSelect:handleFilterSelect
      };

  return (
    <TodoContext.Provider value={ctxValue}>
      {children}
    </TodoContext.Provider>
  );
}
