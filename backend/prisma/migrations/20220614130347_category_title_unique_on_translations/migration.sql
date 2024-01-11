/*
  Warnings:

  - A unique constraint covering the columns `[categoryTitle]` on the table `Translations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Translations_categoryTitle_key" ON "Translations"("categoryTitle");
