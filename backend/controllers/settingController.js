const { PrismaClient } = require('../generated/prisma');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const prisma = new PrismaClient();

exports.getSettings = catchAsync(async (req, res, next) => {
  const settings = await prisma.setting.findUnique({
    where: {
      id: 1,
    },
  });

  res.status(200).json({
    status: 'success',
    data: settings,
  });
});

exports.updateSettings = catchAsync(async (req, res, next) => {
  const data = req.validatedData;

  if (!data.minBookingLength && !data.maxBookingLength && !data.maxGuestsPerBooking && !data.breakfastPrice) {
    return next(new AppError('nothing to update', 400));
  }

  const dataToUpdate = {};

  if (data.minBookingLength) dataToUpdate.minBookingLength = data.minBookingLength;
  if (data.maxBookingLength) dataToUpdate.maxBookingLength = data.maxBookingLength;
  if (data.maxGuestsPerBooking) dataToUpdate.maxGuestsPerBooking = data.maxGuestsPerBooking;
  if (data.breakfastPrice) dataToUpdate.breakfastPrice = data.breakfastPrice;

  const settings = await prisma.setting.update({
    where: {
      id: 1,
    },
    data: dataToUpdate,
  });

  res.status(200).json({
    status: 'success',
    data: settings,
  });
});
