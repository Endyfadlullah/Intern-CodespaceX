-- CreateTable
CREATE TABLE `Project_Checkpoint` (
    `ID_checkpoint` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_project` INTEGER NOT NULL,
    `Checkpoint_title` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Updated_at` DATETIME(3) NOT NULL,
    `Deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`ID_checkpoint`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project_Checkpoint_Attachment` (
    `ID_attachment` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_checkpoint` INTEGER NOT NULL,
    `Url` VARCHAR(191) NOT NULL,
    `Created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Updated_at` DATETIME(3) NOT NULL,
    `Deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`ID_attachment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project_Checkpoint` ADD CONSTRAINT `Project_Checkpoint_ID_project_fkey` FOREIGN KEY (`ID_project`) REFERENCES `Project`(`ID_project`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project_Checkpoint_Attachment` ADD CONSTRAINT `Project_Checkpoint_Attachment_ID_checkpoint_fkey` FOREIGN KEY (`ID_checkpoint`) REFERENCES `Project_Checkpoint`(`ID_checkpoint`) ON DELETE RESTRICT ON UPDATE CASCADE;
