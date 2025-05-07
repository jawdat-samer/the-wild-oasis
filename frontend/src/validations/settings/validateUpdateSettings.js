import validator from 'validator';

export function validateUpdateSettings(data, oldData) {
  const newSettings = {};
  const newErrors = {};

  if (data.minBookingLength !== oldData.minBookingLength) {
    if (validator.isEmpty(validator.trim(data.minBookingLength))) {
      newErrors.minBookingLength = 'Can not be empty';
    } else if (!validator.isInt(data.minBookingLength)) {
      newErrors.minBookingLength = 'Must be a number';
    } else if (!validator.toInt(data.minBookingLength) > 0) {
      newErrors.minBookingLength = 'Must be greater than 0';
    } else {
      newSettings.minBookingLength = validator.toInt(data.minBookingLength);
    }
  }

  if (data.maxBookingLength !== oldData.maxBookingLength) {
    if (validator.isEmpty(validator.trim(data.maxBookingLength))) {
      newErrors.maxBookingLength = 'Can not be empty';
    } else if (!validator.isInt(data.maxBookingLength)) {
      newErrors.maxBookingLength = 'Must be a number';
    } else if (!validator.toInt(data.maxBookingLength) > 0) {
      newErrors.maxBookingLength = 'Must be greater than 0';
    } else {
      newSettings.maxBookingLength = validator.toInt(data.maxBookingLength);
    }
  }

  if (data.maxGuestsPerBooking !== oldData.maxGuestsPerBooking) {
    if (validator.isEmpty(validator.trim(data.maxGuestsPerBooking))) {
      newErrors.maxGuestsPerBooking = 'Can not be empty';
    } else if (!validator.isInt(data.maxGuestsPerBooking)) {
      newErrors.maxGuestsPerBooking = 'Must be a number';
    } else if (!validator.toInt(data.maxGuestsPerBooking) > 0) {
      newErrors.maxGuestsPerBooking = 'Must be greater than 0';
    } else {
      newSettings.maxGuestsPerBooking = validator.toInt(data.maxGuestsPerBooking);
    }
  }

  if (data.breakfastPrice !== oldData.breakfastPrice) {
    if (validator.isEmpty(validator.trim(data.breakfastPrice))) {
      newErrors.breakfastPrice = 'Can not be empty';
    } else if (!validator.isInt(data.breakfastPrice)) {
      newErrors.breakfastPrice = 'Must be a number';
    } else if (!validator.toInt(data.breakfastPrice) > 0) {
      newErrors.breakfastPrice = 'Must be greater than 0';
    } else {
      newSettings.breakfastPrice = validator.toInt(data.breakfastPrice);
    }
  }

  return { newSettings, newErrors };
}
