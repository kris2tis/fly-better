/*
  Warnings:

  - The primary key for the `Reservation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `destination` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `travelId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Travel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserToReservation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reservationId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_travelId_fkey";

-- DropForeignKey
ALTER TABLE "UserToReservation" DROP CONSTRAINT "UserToReservation_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "UserToReservation" DROP CONSTRAINT "UserToReservation_userId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_pkey",
DROP COLUMN "destination",
DROP COLUMN "id",
DROP COLUMN "origin",
DROP COLUMN "travelId",
ADD COLUMN     "reservationId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY ("userId", "reservationId");

-- DropTable
DROP TABLE "Travel";

-- DropTable
DROP TABLE "UserToReservation";

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "travelId" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
