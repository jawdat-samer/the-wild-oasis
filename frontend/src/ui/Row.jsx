import styles from './Row.module.css';

export default function Row({ type = 'vertical', children }) {
  return <div className={`${styles.row} ${styles[type]}`}>{children}</div>;
}
