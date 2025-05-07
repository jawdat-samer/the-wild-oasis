import styles from './ButtonText.module.css';

export default function ButtonText({ children }) {
  return <button className={styles.btnText}>{children}</button>;
}
