import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import style from './style.module.css'


function ModalContent({ children, closeHandler }) {
    useEffect(() => {
        const closeModalByEscape = (e) => {
            if (e.key === 'Escape') {
                closeHandler();
            }
        };

        document.addEventListener('keydown', closeModalByEscape);

        return () => {
            document.removeEventListener('keydown', closeModalByEscape);
        };
    }, [closeHandler]);


    const closeModalByClickButtonX = () => closeHandler()

    return (
        <div className={style.modalContent}>
            <button onClick={closeModalByClickButtonX} className={style.modalCloseBtn} type="button">&#10006;</button>
            {children}
        </div>
    );
}

export function Modal({ closeHandler, isOpen, children }) {
    if (!isOpen) return null;
    const clickHandler = (e) => {
        if (e.target === e.currentTarget) {
            closeHandler();
        }
    };

    return createPortal(
        <div className={style.modalWrapper} onMouseDown={clickHandler}>
            <ModalContent closeHandler={closeHandler}>
                {children}
            </ModalContent>
        </div>,
        document.getElementById('modal-root')
    );
};
