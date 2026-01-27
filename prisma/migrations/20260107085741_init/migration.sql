/*
  Warnings:

  - You are about to drop the column `userId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `travelerId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "userId",
ADD COLUMN     "travelerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "flightDate" SET DATA TYPE TEXT,
ALTER COLUMN "flightTime" SET DATA TYPE TEXT,
ALTER COLUMN "landingTime" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Traveler" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Traveler_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Traveler" ADD CONSTRAINT "Traveler_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "Traveler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
