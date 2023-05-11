/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `CompanyApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CompanyApplication_externalId_key" ON "CompanyApplication"("externalId");
