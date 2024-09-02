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
    `ResetPasswordToken` TEXT NULL,
    `ResetTokenExpires` DATETIME(3) NULL,

    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`ID_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `ID_project` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_user` INTEGER NOT NULL,
    `Image` VARCHAR(191) NULL,
    `Project_title` VARCHAR(191) NOT NULL,
    `Platform` VARCHAR(191) NOT NULL,
    `Deadline` DATETIME(3) NOT NULL,
    `Client` VARCHAR(191) NOT NULL,
    `Talent_in_Charge` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID_project`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project_Talent` (
    `ID_talent` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_project` INTEGER NOT NULL,
    `ID_user` INTEGER NOT NULL,

    PRIMARY KEY (`ID_talent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_ID_user_fkey` FOREIGN KEY (`ID_user`) REFERENCES `User`(`ID_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project_Talent` ADD CONSTRAINT `Project_Talent_ID_user_fkey` FOREIGN KEY (`ID_user`) REFERENCES `User`(`ID_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project_Talent` ADD CONSTRAINT `Project_Talent_ID_project_fkey` FOREIGN KEY (`ID_project`) REFERENCES `Project`(`ID_project`) ON DELETE RESTRICT ON UPDATE CASCADE;
