import { useEffect,useContext } from "react";
import { TodoContext } from "../store/todo-context";

export default function DeleteConfirmation({}) {
  const {cancelDelete,confirmDeleteTask} = useContext(TodoContext);
  useEffect(()=>{
    console.log("the timer seted");
    const timer = setTimeout(()=>{
      confirmDeleteTask();
    },3000);

    return ()=> {
      console.log("the timer cleared");
      clearTimeout(timer);
    };
  },[confirmDeleteTask])

  return (
    <div
      id="delete-confirmation"
      className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Are you sure?</h2>
      <p className="text-gray-600 mb-6">Do you really want to delete this?</p>
      <div id="confirmation-actions" className="flex justify-end space-x-4">
        <button
          onClick={cancelDelete}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
        >
          No
        </button>
        <button
          onClick={confirmDeleteTask}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          Yes
        </button>
      </div>
    </div>
  );
}