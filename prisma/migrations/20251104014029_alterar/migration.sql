/*
  Warnings:

  - Made the column `imageId` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logoId` on table `Technologies` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_imageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProjectTechnology" DROP CONSTRAINT "ProjectTechnology_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Technologies" DROP CONSTRAINT "Technologies_logoId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "imageId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Technologies" ALTER COLUMN "logoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Technologies" ADD CONSTRAINT "Technologies_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTechnology" ADD CONSTRAINT "ProjectTechnology_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
