import {  useRef,useEffect,useContext } from 'react';
import { TodoContext } from '../store/todo-context';

export default function Modal({children}) {
  const {modalIsOpen,cancelDelete} = useContext(TodoContext);
  const dialog = useRef();
  useEffect(()=>
    {
      if(modalIsOpen)
        dialog.current.showModal();
        else
        dialog.current.close();
    }
    ,[modalIsOpen]
  );
  

  return (
    <dialog className="modal" ref={dialog} onClose={cancelDelete} >
      {modalIsOpen ? children: null}
    </dialog>
  );
}

