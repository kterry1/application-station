/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `CompanyApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CompanyApplication_userId_key" ON "CompanyApplication"("userId");
