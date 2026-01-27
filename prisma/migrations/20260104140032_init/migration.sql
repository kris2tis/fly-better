/*
  Warnings:

  - The primary key for the `Reservation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reservationId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `travelId` on the `Trip` table. All the data in the column will be lost.
  - The required column `id` was added to the `Reservation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `tripId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routeId` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_travelId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_pkey",
DROP COLUMN "reservationId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "tripId" TEXT NOT NULL,
ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "destination",
DROP COLUMN "origin",
DROP COLUMN "travelId",
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "routeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
