import { useEffect, useState } from 'react';
import styles from './UpdateSettingsForm.module.css';
import { useGetSettings } from '../../hooks/settings/useGetSettings';
import Spinner from '../../ui/Spinner';
import { validateUpdateSettings } from '../../validations/settings/validateUpdateSettings';
import toast from 'react-hot-toast';
import { useUpdateSettings } from '../../hooks/settings/useUpdateSettings';

function UpdateSettingsForm() {
  const { settings, isLoading, isError, error } = useGetSettings();
  const { updateSettings, isUpdating } = useUpdateSettings();

  const [minNights, setMinNights] = useState(0);
  const [maxNights, setMaxNights] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [breakfastPrice, setBreakfastPrice] = useState(0);
  const [errors, setErrors] = useState(null);

  function handleUpdateSettings() {
    setErrors(null);

    const { newSettings, newErrors } = validateUpdateSettings(
      {
        minBookingLength: minNights,
        maxBookingLength: maxNights,
        maxGuestsPerBooking: maxGuests,
        breakfastPrice: breakfastPrice,
      },
      settings
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (Object.keys(newSettings).length === 0) {
      toast.error('Nothing to update');
      return;
    }

    updateSettings(newSettings);
  }

  useEffect(() => {
    if (!isLoading && !isError) {
      setMinNights(settings.minBookingLength);
      setMaxNights(settings.maxBookingLength);
      setMaxGuests(settings.maxGuestsPerBooking);
      setBreakfastPrice(settings.breakfastPrice);
    }
  }, [
    isLoading,
    isError,
    settings?.minBookingLength,
    settings?.maxBookingLength,
    settings?.maxGuestsPerBooking,
    settings?.breakfastPrice,
  ]);

  if (isLoading) return <Spinner />;
  if (isError) return <div>{error.message}</div>;

  return (
    <form className={styles.form}>
      <div>
        <label htmlFor="min-nights">Minimum nights/booking</label>
        <input
          type="number"
          id="min-nights"
          value={minNights}
          onChange={(e) => setMinNights(e.target.value)}
          onBlur={handleUpdateSettings}
        />
        {errors?.minBookingLength && <span className={styles.error}>{errors.minBookingLength}</span>}
      </div>
      <div>
        <label htmlFor="max-nights">Maximum nights/booking</label>
        <input
          type="number"
          id="max-nights"
          value={maxNights}
          onChange={(e) => setMaxNights(e.target.value)}
          onBlur={handleUpdateSettings}
        />
        {errors?.maxBookingLength && <span className={styles.error}>{errors.maxBookingLength}</span>}
      </div>
      <div>
        <label htmlFor="max-guests">Maximum guests/booking</label>
        <input
          type="number"
          id="max-guests"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          onBlur={handleUpdateSettings}
        />
        {errors?.maxGuestsPerBooking && <span className={styles.error}>{errors.maxGuestsPerBooking}</span>}
      </div>
      <div>
        <label htmlFor="breakfast-price">Breakfast price</label>
        <input
          type="number"
          id="breakfast-price"
          value={breakfastPrice}
          onChange={(e) => setBreakfastPrice(e.target.value)}
          onBlur={handleUpdateSettings}
        />
        {errors?.breakfastPrice && <span className={styles.error}>{errors.breakfastPrice}</span>}
      </div>
    </form>
  );
}

export default UpdateSettingsForm;
