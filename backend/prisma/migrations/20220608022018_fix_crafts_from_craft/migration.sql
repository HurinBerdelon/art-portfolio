/*
  Warnings:

  - The values [craftmanship] on the enum `ArtCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ArtCategory_new" AS ENUM ('drawing', 'painting', 'craftsmanship', 'string_art');
ALTER TABLE "Art" ALTER COLUMN "category" TYPE "ArtCategory_new" USING ("category"::text::"ArtCategory_new");
ALTER TYPE "ArtCategory" RENAME TO "ArtCategory_old";
ALTER TYPE "ArtCategory_new" RENAME TO "ArtCategory";
DROP TYPE "ArtCategory_old";
COMMIT;
