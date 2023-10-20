/*
  Warnings:

  - Added the required column `pipos` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `pipos` VARCHAR(191) NOT NULL;
