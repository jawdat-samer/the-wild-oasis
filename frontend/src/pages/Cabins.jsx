import CreateCabinModal from '../features/cabins/CreateCabinModal';
import CabinTable from '../features/cabins/CabinTable';
import Row from '../ui/Row';
import styles from './Cabins.module.css';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <h1>All cabins</h1>
        <p>Filter / Sort</p>
      </Row>

      <div className={styles.main}>
        <CreateCabinModal />

        <CabinTable />
      </div>
    </>
  );
}

export default Cabins;
