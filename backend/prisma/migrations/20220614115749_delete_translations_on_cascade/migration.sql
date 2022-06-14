-- DropForeignKey
ALTER TABLE "Translations" DROP CONSTRAINT "Translations_categoryTitle_fkey";

-- AddForeignKey
ALTER TABLE "Translations" ADD CONSTRAINT "Translations_categoryTitle_fkey" FOREIGN KEY ("categoryTitle") REFERENCES "Category"("title") ON DELETE CASCADE ON UPDATE CASCADE;
