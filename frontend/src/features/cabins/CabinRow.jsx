import styles from './CabinRow.module.css';
import { BACKEND_URL } from '../../services/api';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import UpdateCabinForm from './UpdateCabinForm';
import { useDeleteCabin } from '../../hooks/cabins/useDeleteCabin';
import { useCreateCabin } from '../../hooks/cabins/useCreateCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import DeleteCabinModal from './DeleteCabinModal';
import UpdateCabinModal from './UpdateCabinModal';

function CabinRow({ cabin }) {
  const { id: cabinId, name, maxCapacity, regularPrice, discount, description, image } = cabin;
  const { createCabin, isCreating } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <div className={styles.row} role="row">
        <img src={`${BACKEND_URL}/images/cabins/${image}`} />
        <div className={styles.cabin}>{name}</div>
        <div>Fits up to {maxCapacity}</div>
        <div className={styles.price}>{formatCurrency(regularPrice)}</div>
        {discount ? <div className={styles.discount}>{formatCurrency(discount)}</div> : <div>&mdash;</div>}
        <div>
          <button
            onClick={() =>
              createCabin({
                name: `Copy of ${name}`,
                maxCapacity: maxCapacity,
                regularPrice: regularPrice,
                discount: discount,
                description: description,
              })
            }
            disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowUpdateModal(true)}>
            <HiPencil />
          </button>
          <button onClick={() => setShowDeleteModal(true)}>
            <HiTrash />
          </button>
        </div>
      </div>

      {showUpdateModal && <UpdateCabinModal cabin={cabin} onClose={() => setShowUpdateModal(false)} />}
      {showDeleteModal && (
        <DeleteCabinModal
          name={name}
          onDelete={() =>
            deleteCabin(cabinId, {
              onSuccess: () => setShowDeleteModal(false),
            })
          }
          disabled={isDeleting}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}

export default CabinRow;
