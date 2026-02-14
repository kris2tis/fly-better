/*
  Warnings:

  - A unique constraint covering the columns `[tripId,travelerId,pnrCode]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_tripId_travelerId_key";

-- DropIndex
DROP INDEX "Trip_airlineId_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "pnrCode" TEXT;

-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "flightDate" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Order_tripId_travelerId_pnrCode_key" ON "Order"("tripId", "travelerId", "pnrCode");
