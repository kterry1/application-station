/*
  Warnings:

  - You are about to drop the column `acceptedOffer` on the `CompanyApplication` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CompanyApplication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT,
    "companyName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "awaitingResponse" BOOLEAN NOT NULL DEFAULT false,
    "rejected" BOOLEAN NOT NULL DEFAULT false,
    "nextRound" BOOLEAN NOT NULL DEFAULT false,
    "receivedOffer" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "appliedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "unableToClassify" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "CompanyApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CompanyApplication" ("appliedAt", "awaitingResponse", "companyName", "createdAt", "externalId", "id", "nextRound", "notes", "position", "receivedOffer", "rejected", "unableToClassify", "updatedAt", "userId") SELECT "appliedAt", "awaitingResponse", "companyName", "createdAt", "externalId", "id", "nextRound", "notes", "position", "receivedOffer", "rejected", "unableToClassify", "updatedAt", "userId" FROM "CompanyApplication";
DROP TABLE "CompanyApplication";
ALTER TABLE "new_CompanyApplication" RENAME TO "CompanyApplication";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
