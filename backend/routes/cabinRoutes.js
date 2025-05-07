const express = require('express');
const cabinController = require('../controllers/cabinController');
const validationController = require('../controllers/validationController');

const router = express.Router();

router.get('/', cabinController.getAllCabins);
router.get('/:cabinId', validationController.getCabin, validationController.checkValidation, cabinController.getCabin);
router.post(
  '/',
  cabinController.uploadCabinImage,
  validationController.createCabin,
  validationController.checkValidation,
  cabinController.createCabin
);
router.patch(
  '/:cabinId',
  cabinController.uploadCabinImage,
  validationController.updateCabin,
  validationController.checkValidation,
  cabinController.updateCabin
);
router.delete(
  '/:cabinId',
  validationController.deleteCabin,
  validationController.checkValidation,
  cabinController.deleteCabin
);

module.exports = router;
