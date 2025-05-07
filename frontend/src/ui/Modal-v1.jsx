import { HiXMark } from 'react-icons/hi2';
import styles from './Modal.module.css';

function Modal({ onClose, children }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.btn} onClick={onClose}>
          <HiXMark />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
