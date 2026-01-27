/*
  Warnings:

  - Added the required column `flightDate` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flightTime` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landingTime` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "flightDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "flightTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "landingTime" TIMESTAMP(3) NOT NULL;
