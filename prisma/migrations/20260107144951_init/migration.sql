/*
  Warnings:

  - Changed the type of `flightDate` on the `Trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "flightDate",
ADD COLUMN     "flightDate" TIMESTAMP(3) NOT NULL;
