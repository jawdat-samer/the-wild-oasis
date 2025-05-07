import styles from './Sidebar.module.css';
import Logo from './Logo';
import MainNav from './MainNav';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <MainNav />
    </aside>
  );
}
