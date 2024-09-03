/*
  Warnings:

  - A unique constraint covering the columns `[Project_title]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `Status` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Project_Project_title_key` ON `Project`(`Project_title`);
