-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `Status` ENUM('Draft', 'Paid', 'Sent', 'OnHold') NOT NULL DEFAULT 'Draft';
