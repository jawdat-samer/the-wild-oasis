const express = require('express');
const settingController = require('../controllers/settingController');
const validationController = require('../controllers/validationController');

const router = express.Router();

router.get('/', settingController.getSettings);
router.patch(
  '/',
  validationController.updateSettings,
  validationController.checkValidation,
  settingController.updateSettings
);

module.exports = router;
