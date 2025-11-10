/*
  Warnings:

  - You are about to drop the column `logoId` on the `Technologies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[technologyId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Technologies" DROP CONSTRAINT "Technologies_logoId_fkey";

-- DropIndex
DROP INDEX "public"."Technologies_logoId_key";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "technologyId" TEXT;

-- AlterTable
ALTER TABLE "Technologies" DROP COLUMN "logoId";

-- CreateIndex
CREATE UNIQUE INDEX "Image_technologyId_key" ON "Image"("technologyId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
