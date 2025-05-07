import styles from './UpdateCabinForm.module.css';
import Button from '../../ui/Button';
import { useState } from 'react';
import { validateUpdateCabin } from '../../validations/cabins/validateUpdateCabin';
import { useUpdateCabin } from '../../hooks/cabins/useUpdateCabin';
import toast from 'react-hot-toast';

function UpdateCabinForm({ cabin, onCloseModal }) {
  const { updateCabin, isUpdating } = useUpdateCabin();

  const [cabinName, setCabinName] = useState(cabin.name);
  const [maxCapacity, setMaxCapacity] = useState(cabin.maxCapacity);
  const [price, setPrice] = useState(cabin.regularPrice);
  const [discount, setDiscount] = useState(cabin.discount);
  const [description, setDescription] = useState(cabin.description);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(null);

    const { newCabin, newErrors } = validateUpdateCabin(
      {
        cabinName,
        maxCapacity,
        price,
        discount,
        description,
        image,
      },
      cabin
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (Object.keys(newCabin).length === 0) {
      toast.error('Nothing to update');
      return;
    }

    updateCabin(
      { cabinId: cabin.id, newCabin },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        <textarea
          type="number"
          id="description"
          value={description ? description : ''}
          onChange={(e) => setDescription(e.target.value)}
        />
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
        <Button variation="secondary" size="medium" type="reset" onClick={() => onCloseModal?.()} disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update cabin</Button>
      </div>
    </form>
  );
}

export default UpdateCabinForm;
