import styles from './CreateCabinForm.module.css';
import Button from '../../ui/Button';
import { useState } from 'react';
import { validateCreateCabin } from '../../validations/cabins/validateCreateCabin';
import { useCreateCabin } from '../../hooks/cabins/useCreateCabin';

function CreateCabinForm({ onCloseModal }) {
  const { createCabin, isCreating } = useCreateCabin();

  const [cabinName, setCabinName] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(null);

    const { newCabin, newErrors } = validateCreateCabin({
      cabinName,
      maxCapacity,
      price,
      discount,
      description,
      image,
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    createCabin(newCabin, {
      onSuccess: () => {
        onCloseModal?.();
      },
    });
  }

  return (
    <form className={`${styles.form} ${styles.modal}`} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Cabin name</label>
        <input type="string" id="name" value={cabinName} onChange={(e) => setCabinName(e.target.value)} required />
        {errors?.cabinName && <span>{errors.cabinName}</span>}
      </div>

      <div>
        <label htmlFor="maxCapacity">Maximum capacity</label>
        <input
          type="number"
          id="maxCapacity"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(e.target.value)}
          required
        />
        {errors?.maxCapacity && <span>{errors.maxCapacity}</span>}
      </div>

      <div>
        <label htmlFor="regularPrice">Regular price</label>
        <input type="number" id="regularPrice" value={price} onChange={(e) => setPrice(e.target.value)} required />
        {errors?.price && <span>{errors.price}</span>}
      </div>

      <div>
        <label htmlFor="discount">Discount</label>
        <input type="number" id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} required />
        {errors?.discount && <span>{errors.discount}</span>}
      </div>

      <div>
        <label htmlFor="description">Description for website</label>
        <textarea type="number" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label htmlFor="image">Cabin photo</label>
        <input
          className={styles.file}
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <div>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          size="medium"
          type="reset"
          onClick={(e) => {
            e.preventDefault();
            onCloseModal?.();
          }}
          disabled={isCreating}>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </div>
    </form>
  );
}

export default CreateCabinForm;
