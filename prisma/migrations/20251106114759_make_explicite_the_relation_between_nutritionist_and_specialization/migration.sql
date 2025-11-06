/*
  Warnings:

  - You are about to drop the `_NutritionistSpecializations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_NutritionistSpecializations" DROP CONSTRAINT "_NutritionistSpecializations_A_fkey";

-- DropForeignKey
ALTER TABLE "_NutritionistSpecializations" DROP CONSTRAINT "_NutritionistSpecializations_B_fkey";

-- DropTable
DROP TABLE "_NutritionistSpecializations";

-- CreateTable
CREATE TABLE "NutritionistSpecialization" (
    "nutritionistId" TEXT NOT NULL,
    "specializationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NutritionistSpecialization_pkey" PRIMARY KEY ("nutritionistId","specializationId")
);

-- AddForeignKey
ALTER TABLE "NutritionistSpecialization" ADD CONSTRAINT "NutritionistSpecialization_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionistSpecialization" ADD CONSTRAINT "NutritionistSpecialization_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
