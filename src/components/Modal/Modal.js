import { useEffect } from "react";
import ReactDOM from "react-dom";
import style from './modal.module.css'

function ModalContent({ children, closeModal }) {
    useEffect(() => {
        const listener = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        }

        document.addEventListener('keydown', listener)

        return () => {
            document.removeEventListener('keydown', listener)
        }
    }, [closeModal])

    return (
        <div className={style.modal_content}>
            <button onClick={closeModal} className="btn btn-primary mb-3">Close</button>
            {children}
        </div>
    )
}

export function Modal({ children, isOpen = false, closeModal }) {
    if (!isOpen) return null;

    const handleClick = (event) => {

        if (event.target === event.currentTarget) {
            closeModal()
        }
    }

    return ReactDOM.createPortal(
        <div onClick={handleClick} className={style.modal_wrapper}>
            <ModalContent closeModal={closeModal}>
                {children}
            </ModalContent>
        </div>,
        document.getElementById('modal-root')
    )

}