import {  useRef,useEffect } from 'react';

export default function Modal({ open, children,onClose }) {
  const dialog = useRef();
  useEffect(()=>
    {
      if(open)
        dialog.current.showModal();
        else
        dialog.current.close();
    }
    ,[open]
  );
  

  return (
    <dialog className="modal" ref={dialog} onClose={onClose} >
      {open ? children: null}
    </dialog>
  );
}

