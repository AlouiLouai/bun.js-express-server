/*
  Warnings:

  - You are about to drop the column `class` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Niveau" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "class",
DROP COLUMN "logo",
ADD COLUMN     "niveau" "Niveau",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- DropEnum
DROP TYPE "SchoolYear";
