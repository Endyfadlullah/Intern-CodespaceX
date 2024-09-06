/*
  Warnings:

  - The primary key for the `invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `invoice_itemlist` DROP FOREIGN KEY `Invoice_ItemList_ID_Invoice_fkey`;

-- AlterTable
ALTER TABLE `invoice` DROP PRIMARY KEY,
    MODIFY `ID_Invoice` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`ID_Invoice`);

-- AlterTable
ALTER TABLE `invoice_itemlist` MODIFY `ID_Invoice` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Invoice_ItemList` ADD CONSTRAINT `Invoice_ItemList_ID_Invoice_fkey` FOREIGN KEY (`ID_Invoice`) REFERENCES `Invoice`(`ID_Invoice`) ON DELETE RESTRICT ON UPDATE CASCADE;
