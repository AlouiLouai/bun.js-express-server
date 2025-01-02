-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MATH', 'SCIENCE');

-- CreateEnum
CREATE TYPE "SchoolYear" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "category" "Category",
    "class" "SchoolYear",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
