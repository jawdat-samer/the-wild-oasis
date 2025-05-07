const crypto = require('crypto');
const { PrismaClient } = require('../generated/prisma');
const multer = require('multer');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const prisma = new PrismaClient();

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/cabins');
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      cb(null, `cabin-${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new AppError('Not an image! please upload images only', 400), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

exports.uploadCabinImage = uploadImage.single('image');

exports.getAllCabins = catchAsync(async (req, res, next) => {
  const cabins = await prisma.cabin.findMany();

  res.status(200).json({
    status: 'success',
    data: cabins,
  });
});

exports.getCabin = catchAsync(async (req, res, next) => {
  const data = req.validatedData;

  const cabin = await prisma.cabin.findUnique({
    where: {
      id: data.cabinId,
    },
  });

  if (!cabin) {
    return next(new AppError('Cabin not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: cabin,
  });
});

exports.createCabin = catchAsync(async (req, res, next) => {
  const data = req.validatedData;

  if (req.file && req.file.filename) {
    data.image = req.file.filename;
  }

  const cabin = await prisma.cabin.create({
    data: {
      name: data.name,
      maxCapacity: data.maxCapacity,
      regularPrice: data.regularPrice,
      discount: data.discount,
      description: data.description || null,
      image: data.image || null,
    },
  });

  res.status(201).json({
    status: 'success',
    data: cabin,
  });
});

exports.updateCabin = catchAsync(async (req, res, next) => {
  const data = req.validatedData;

  if (!Object.keys(data) > 0 && !req.file) {
    return next(new AppError('nothing to update', 400));
  }

  const checkCabin = await prisma.cabin.findUnique({
    where: {
      id: data.cabinId,
    },
  });

  if (!checkCabin) {
    return next(new AppError('cabin not found', 404));
  }

  const dataToUpdate = {};

  if (data.name !== undefined) dataToUpdate.name = data.name;
  if (data.maxCapacity !== undefined) dataToUpdate.maxCapacity = data.maxCapacity;
  if (data.regularPrice !== undefined) dataToUpdate.regularPrice = data.regularPrice;
  if (data.discount !== undefined) {
    if (data.regularPrice ? data.discount >= data.regularPrice : data.discount >= checkCabin.regularPrice) {
      return next(new AppError('Discount should be less than regular price', 400));
    }

    dataToUpdate.discount = data.discount;
  }
  if (data.description !== undefined) dataToUpdate.description = data.description;
  if (req.file && req.file.filename) dataToUpdate.image = req.file.filename;

  const cabin = await prisma.cabin.update({
    where: {
      id: data.cabinId,
    },
    data: dataToUpdate,
  });

  res.status(200).json({
    status: 'success',
    data: cabin,
  });
});

exports.deleteCabin = catchAsync(async function (req, res, next) {
  const data = req.validatedData;

  const cabin = await prisma.cabin.findUnique({
    where: {
      id: data.cabinId,
    },
  });

  if (!cabin) {
    return next(new AppError(`can't delete cabin ID ${data.cabinId}`, 400));
  }

  await prisma.cabin.delete({
    where: {
      id: data.cabinId,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'cabin deleted successfully',
  });
});
