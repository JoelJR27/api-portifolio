/*
  Warnings:

  - Changed the type of `startedAt` on the `Experiences` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `finishedAt` on the `Experiences` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Experiences" DROP COLUMN "startedAt",
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "finishedAt",
ADD COLUMN     "finishedAt" TIMESTAMP(3) NOT NULL;
