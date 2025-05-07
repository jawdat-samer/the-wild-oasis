import validator from 'validator';

export function validateUpdateCabin(data, oldData) {
  const newErrors = {};

  const newCabin = {};

  if (data.cabinName !== oldData.name) {
    if (validator.isEmpty(validator.trim(data.cabinName))) {
      newErrors.cabinName = 'Cabin name is required';
    } else if (!validator.isLength(data.cabinName, { min: 1, max: 300 })) {
      newErrors.cabinName = 'Cabin name is too short/long';
    } else {
      newCabin.name = data.cabinName;
    }
  }

  if (data.maxCapacity !== oldData.maxCapacity) {
    if (validator.isEmpty(validator.trim(data.maxCapacity)) || !validator.isInt(data.maxCapacity)) {
      newErrors.maxCapacity = 'Must be a number';
    } else if (data.maxCapacity <= 0) {
      newErrors.maxCapacity = 'Must be greater than 0';
    } else {
      newCabin.maxCapacity = validator.toInt(data.maxCapacity, 10);
    }
  }

  if (data.price !== oldData.regularPrice) {
    if (validator.isEmpty(validator.trim(data.price)) || !validator.isFloat(data.price)) {
      newErrors.price = 'Must be a number';
    } else if (data.price < 0) {
      newErrors.price = 'Must be a positive number';
    } else {
      newCabin.regularPrice = validator.toFloat(data.price);
    }
  }

  if (data.discount !== oldData.discount) {
    if (validator.isEmpty(validator.trim(data.discount)) || !validator.isFloat(data.discount)) {
      newErrors.discount = 'Must be a number';
    } else if (data.discount < 0) {
      newErrors.discount = 'Must be a positive number';
    } else if (data.discount >= data.price) {
      newErrors.discount = 'Discount should be less than regular price';
    } else {
      newCabin.discount = validator.toFloat(data.discount);
    }
  }

  if (data.description !== oldData.description) {
    if (!validator.isEmpty(validator.trim(data.description))) {
      newCabin.description = data.description;
    } else {
      newCabin.description = '';
    }
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
