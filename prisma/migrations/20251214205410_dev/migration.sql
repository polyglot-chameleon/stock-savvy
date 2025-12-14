/*
  Warnings:

  - You are about to drop the column `marketCap` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "marketCap";

-- CreateTable
CREATE TABLE "Metric" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "eps" DOUBLE PRECISION,
    "per" DOUBLE PRECISION,
    "roe" DOUBLE PRECISION,
    "d2e" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Metric_companyId_date_idx" ON "Metric"("companyId", "date");

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
