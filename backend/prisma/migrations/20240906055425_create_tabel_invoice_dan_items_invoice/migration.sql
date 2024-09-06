-- CreateTable
CREATE TABLE `Invoice` (
    `ID_Invoice` VARCHAR(191) NOT NULL,
    `ID_project` INTEGER NOT NULL,
    `Payment_Due` DATETIME(3) NOT NULL,
    `Payment_Type` VARCHAR(191) NOT NULL,
    `Total_Termin` INTEGER NULL,
    `Termin_Number` INTEGER NULL,
    `Notes` VARCHAR(191) NULL,
    `Created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Updated_at` DATETIME(3) NOT NULL,
    `Deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`ID_Invoice`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice_ItemList` (
    `ID_ItemList` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Invoice` VARCHAR(191) NOT NULL,
    `Tittle` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `Price` DECIMAL(10, 2) NOT NULL,
    `Created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Updated_at` DATETIME(3) NOT NULL,
    `Deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`ID_ItemList`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_ID_project_fkey` FOREIGN KEY (`ID_project`) REFERENCES `Project`(`ID_project`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice_ItemList` ADD CONSTRAINT `Invoice_ItemList_ID_Invoice_fkey` FOREIGN KEY (`ID_Invoice`) REFERENCES `Invoice`(`ID_Invoice`) ON DELETE RESTRICT ON UPDATE CASCADE;
