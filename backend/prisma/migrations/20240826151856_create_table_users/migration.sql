-- CreateTable
CREATE TABLE `User` (
    `ID_user` INTEGER NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Mobile_number` VARCHAR(191) NULL,
    `Position` VARCHAR(191) NULL,
    `Role` VARCHAR(191) NOT NULL DEFAULT 'customer',
    `Picture` VARCHAR(191) NULL,
    `Status` VARCHAR(191) NOT NULL DEFAULT 'active',
    `Token` TEXT NULL,
    `Created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Updated_at` DATETIME(3) NOT NULL,
    `Deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`ID_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
