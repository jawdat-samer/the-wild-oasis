import { HiXMark } from 'react-icons/hi2';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { cloneElement, createContext, useContext, useState } from 'react';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  function close() {
    setOpenName('');
  }

  function open(name) {
    setOpenName(name);
  }

  return (
    <ModalContext.Provider
      value={{
        openName: openName,
        open: open,
        close: close,
      }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.btn} onClick={close}>
          <HiXMark />
        </button>
        <div>
          {cloneElement(children, {
            onCloseModal: close,
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
