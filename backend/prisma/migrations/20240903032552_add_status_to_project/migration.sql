/*
  Warnings:

  - Added the required column `Updated_at` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Updated_at` to the `Project_Talent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `Created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `Deleted_at` DATETIME(3) NULL,
    ADD COLUMN `Updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `project_talent` ADD COLUMN `Created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `Deleted_at` DATETIME(3) NULL,
    ADD COLUMN `Updated_at` DATETIME(3) NOT NULL;
