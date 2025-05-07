import CreateCabinForm from './CreateCabinForm';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal-v1';
import { useState } from 'react';

function CreateCabinModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button variation="primary" size="medium" onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

// function AddCabinModal() {
//   return (
//     <Modal>
//       <Modal.Open opens="cabin-form">
//         <Button>Add new cabin</Button>
//       </Modal.Open>
//       <Modal.Window name="cabin-form">
//         <CreateCabinForm />
//       </Modal.Window>
//     </Modal>
//   );
// }

export default CreateCabinModal;
