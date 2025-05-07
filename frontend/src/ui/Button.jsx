import styles from './Button.module.css';

export default function Button({ variation = 'primary', size = 'medium', onClick, disabled = false, children }) {
  return (
    <button className={`${styles.btn} ${styles[variation]} ${styles[size]}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
