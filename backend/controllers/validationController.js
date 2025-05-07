const { validationResult, matchedData, param, body } = require('express-validator');

const formatter = ({ msg }) => {
  return {
    message: msg,
  };
};

exports.checkValidation = (req, res, next) => {
  const validation = validationResult(req).formatWith(formatter);

  if (!validation.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: 'data provided is not correct',
      errors: validation.mapped({ onlyFirstError: true }),
    });
  }

  req.validatedData = matchedData(req);

  next();
};

// cabins@start
exports.getCabin = [
  param('cabinId')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('cabin ID is required')
    .isInt()
    .withMessage('cabin ID must be a number')
    .toInt(),
];

exports.createCabin = [
  body('name')
    .isString()
    .withMessage('name must be a string')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('cabin name is required')
    .isLength({ min: 1, max: 300 })
    .withMessage('cabin name is too short/long'),
  body('maxCapacity')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('cabin max capacity is required')
    .isInt()
    .withMessage('cabin max capacity must be an integer')
    .toInt(),
  body('regularPrice')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('cabin regular price is required')
    .isFloat()
    .withMessage('cabin regular price must be a number')
    .toFloat(),
  body('discount')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('cabin discount is required')
    .isFloat()
    .withMessage('cabin discount must be a number')
    .toFloat()
    .custom((value, { req }) => {
      if (value >= req.body.regularPrice) {
        throw new Error('Discount should be less than regular price');
      } else {
        return true;
      }
    }),
  body('description')
    .optional()
    .isString()
    .withMessage('description must be a string')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('cabin description can not be empty'),
];

exports.updateCabin = [
  param('cabinId')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('cabin ID is required')
    .isInt()
    .withMessage('cabin ID must be a number')
    .toInt(),
  body('name')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('cabin name is required')
    .isLength({ min: 1, max: 300 })
    .withMessage('cabin name is too short/long'),
  body('maxCapacity')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('cabin max capacity is required')
    .isInt()
    .withMessage('cabin max capacity must be an integer')
    .toInt(),
  body('regularPrice')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('cabin regular price is required')
    .isFloat()
    .withMessage('cabin regular price must be a number')
    .toFloat(),
  body('discount')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('cabin discount is required')
    .isFloat()
    .withMessage('cabin discount must be a number')
    .toFloat(),
  body('description').optional().isString().withMessage('description must be a string').trim().escape(),
];

exports.deleteCabin = [
  param('cabinId')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('cabin ID is required')
    .isInt()
    .withMessage('cabin ID must be a number')
    .toInt(),
];
// cabins@end

// settings@start
exports.updateSettings = [
  body('minBookingLength')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('min booking length can not be empty')
    .isInt()
    .withMessage('min booking length must be a number')
    .toInt(),
  body('maxBookingLength')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('max booking length can not be empty')
    .isInt()
    .withMessage('max booking length must be a number')
    .toInt(),
  body('maxGuestsPerBooking')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('max guests per booking can not be empty')
    .isInt()
    .withMessage('max guests per booking must be a number')
    .toInt(),
  body('breakfastPrice')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('breakfast price can not be empty')
    .isFloat()
    .withMessage('breakfast price must be a number')
    .toFloat(),
];
// settings@end
