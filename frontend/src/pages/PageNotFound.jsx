import styles from './PageNotFound.module.css';
import { useMoveBack } from '../hooks/useMoveBack';
import Button from '../ui/Button';

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <h1>The page you are looking for could not be found 😢</h1>
        <Button onClick={moveBack} size="large">
          &larr; Go back
        </Button>
      </div>
    </main>
  );
}

export default PageNotFound;
