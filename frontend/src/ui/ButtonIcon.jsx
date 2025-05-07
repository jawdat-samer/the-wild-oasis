import styles from './buttonIcon.module.css';

export default function ButtonIcon({ children }) {
  return <button className={styles.btnIcon}>{children}</button>;
}
