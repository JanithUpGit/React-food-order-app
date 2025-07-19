import { Children, useEffect } from "react";
import { createPortal } from "react-dom"

export default function Modal({Children,open,className=''}){

    const dialog = useRef();

    useEffect(()=>{
        if(open){
            dialog.current.showModal();
        }

    },[open])

    return createPortal(
         <dialog ref={dialog} className={`modal ${className}`}>
            {Children}
        </dialog>
    , document.getElementById('modal'));
}