/*
  Warnings:

  - You are about to drop the column `telephone` on the `Nutritionist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Nutritionist" DROP COLUMN "telephone",
ADD COLUMN     "phoneNumber" TEXT;
