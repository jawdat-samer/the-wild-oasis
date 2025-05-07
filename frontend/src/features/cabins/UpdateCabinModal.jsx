import CreateCabinForm from './CreateCabinForm';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal-v1';
import UpdateCabinForm from './UpdateCabinForm';

function UpdateCabinModal({ onClose, cabin }) {
  return (
    <div>
      <Modal onClose={onClose}>
        <UpdateCabinForm cabin={cabin} onCloseModal={onClose} />
      </Modal>
    </div>
  );
}

export default UpdateCabinModal;
