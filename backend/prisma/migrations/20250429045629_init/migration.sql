-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `numNights` INTEGER NOT NULL,
    `numGuests` INTEGER NOT NULL,
    `cabinPrice` DOUBLE NOT NULL,
    `extrasPrice` DOUBLE NOT NULL,
    `totalPrice` DOUBLE NOT NULL,
    `status` ENUM('unconfirmed', 'checkedIn', 'checkedOut') NOT NULL DEFAULT 'unconfirmed',
    `hasBreakfast` BOOLEAN NOT NULL DEFAULT false,
    `isPaid` BOOLEAN NOT NULL DEFAULT false,
    `observation` VARCHAR(191) NULL,
    `guestId` INTEGER NOT NULL,
    `cabinId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cabin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(300) NOT NULL,
    `maxCapacity` INTEGER NOT NULL,
    `regularPrice` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL DEFAULT 0,
    `description` VARCHAR(191) NULL,
    `image` VARCHAR(300) NULL,
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(300) NOT NULL,
    `nationalID` VARCHAR(300) NOT NULL,
    `nationality` VARCHAR(300) NOT NULL,
    `countryFlag` VARCHAR(300) NOT NULL,
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `minBookingLength` INTEGER NOT NULL,
    `maxBookingLength` INTEGER NOT NULL,
    `maxGuestsPerBooking` INTEGER NOT NULL,
    `breakfastPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `Guest`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_cabinId_fkey` FOREIGN KEY (`cabinId`) REFERENCES `Cabin`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
