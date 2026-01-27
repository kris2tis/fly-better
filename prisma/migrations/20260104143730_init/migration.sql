/*
  Warnings:

  - Added the required column `classMultiplier` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "distance" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "classMultiplier" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;
