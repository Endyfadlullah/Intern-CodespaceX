-- AlterTable
ALTER TABLE `user` ADD COLUMN `ResetPasswordToken` TEXT NULL,
    ADD COLUMN `ResetTokenExpires` DATETIME(3) NULL;
