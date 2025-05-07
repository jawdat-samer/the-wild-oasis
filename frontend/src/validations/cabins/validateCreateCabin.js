import validator from 'validator';

export function validateCreateCabin(data) {
  const newErrors = {};

  if (validator.isEmpty(validator.trim(data.cabinName))) {
    newErrors.cabinName = 'Cabin name is required';
  } else if (!validator.isLength(data.cabinName, { min: 1, max: 300 })) {
    newErrors.cabinName = 'Cabin name is too short/long';
  }

  if (validator.isEmpty(validator.trim(data.maxCapacity)) || !validator.isInt(data.maxCapacity)) {
    newErrors.maxCapacity = 'Must be a number';
  } else if (data.maxCapacity <= 0) {
    newErrors.maxCapacity = 'Must be greater than 0';
  }

  if (validator.isEmpty(validator.trim(data.price)) || !validator.isFloat(data.price)) {
    newErrors.price = 'Must be a number';
  } else if (data.price < 0) {
    newErrors.price = 'Must be a positive number';
  }

  if (validator.isEmpty(validator.trim(data.discount)) || !validator.isFloat(data.discount)) {
    newErrors.discount = 'Must be a number';
  } else if (validator.toFloat(data.discount) < 0) {
    newErrors.discount = 'Must be a positive number';
  } else if (validator.toFloat(data.discount) >= validator.toFloat(data.price)) {
    newErrors.discount = 'Discount should be less than regular price';
  }

  const newCabin = {
    name: data.cabinName,
    maxCapacity: validator.toInt(data.maxCapacity, 10),
    regularPrice: validator.toFloat(data.price),
    discount: validator.toFloat(data.discount),
  };

  if (!validator.isEmpty(validator.trim(data.description))) {
    newCabin.description = data.description;
  }

  if (data.image) {
    if (data.image.type.split('/')[0] !== 'image') {
      newErrors.image = 'Invalid file type (only image allowed)';
    } else if (data.image.size > 5 * 1024 * 1024) {
      newErrors.image = 'Image too large (max 5MB)';
    } else {
      newCabin.image = data.image;
    }
  }

  return { newCabin, newErrors };
}
