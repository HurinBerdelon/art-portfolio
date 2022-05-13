/*
  Warnings:

  - Added the required column `productionDate` to the `Art` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Art" ADD COLUMN     "productionDate" TIMESTAMP(3) NOT NULL;
