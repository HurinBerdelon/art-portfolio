-- CreateTable
CREATE TABLE "Translations" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "categoryTitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Translations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Translations" ADD CONSTRAINT "Translations_categoryTitle_fkey" FOREIGN KEY ("categoryTitle") REFERENCES "Category"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
