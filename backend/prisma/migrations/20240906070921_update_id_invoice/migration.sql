/*
  Warnings:

  - The primary key for the `invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `ID_Invoice` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `ID_Invoice` on the `invoice_itemlist` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `invoice_itemlist` DROP FOREIGN KEY `Invoice_ItemList_ID_Invoice_fkey`;

-- AlterTable
ALTER TABLE `invoice` DROP PRIMARY KEY,
    MODIFY `ID_Invoice` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`ID_Invoice`);

-- AlterTable
ALTER TABLE `invoice_itemlist` MODIFY `ID_Invoice` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Invoice_ItemList` ADD CONSTRAINT `Invoice_ItemList_ID_Invoice_fkey` FOREIGN KEY (`ID_Invoice`) REFERENCES `Invoice`(`ID_Invoice`) ON DELETE RESTRICT ON UPDATE CASCADE;
