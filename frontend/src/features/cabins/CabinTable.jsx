import styles from './CabinTable.module.css';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useGetCabin } from '../../hooks/cabins/useGetCabin';

function CabinTable() {
  const { isLoading, isError, cabins, error } = useGetCabin();

  if (isLoading) return <Spinner />;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className={styles.table} role="table">
      <header role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </header>
      {cabins?.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinTable;
