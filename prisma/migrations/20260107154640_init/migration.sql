/*
  Warnings:

  - Changed the type of `flightTime` on the `Trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `landingTime` on the `Trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "flightTime",
ADD COLUMN     "flightTime" INTEGER NOT NULL,
DROP COLUMN "landingTime",
ADD COLUMN     "landingTime" INTEGER NOT NULL;
