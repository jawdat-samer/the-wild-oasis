import Button from '../../ui/Button';
import Modal from '../../ui/Modal-v1';
import styles from './DeleteCabinModal.module.css';

function DeleteCabinModal({ name, onClose, onDelete }) {
  return (
    <Modal onClose={onClose}>
      <div className={styles.deleteModal}>
        <h3>Delete Cabin</h3>
        <p>Are you sure you want to delete cabin {name} permanently? This action cannot be undone.</p>

        <div>
          <Button variation="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variation="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteCabinModal;
