/*
  Warnings:

  - You are about to drop the column `isAuthenticated` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CompanyApplication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "awaitingResponse" BOOLEAN NOT NULL DEFAULT false,
    "rejected" BOOLEAN NOT NULL DEFAULT false,
    "nextRound" BOOLEAN NOT NULL DEFAULT false,
    "receivedOffer" BOOLEAN NOT NULL DEFAULT false,
    "acceptedOffer" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "appliedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "unableToClassify" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "CompanyApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CompanyApplication" ("acceptedOffer", "appliedAt", "awaitingResponse", "companyName", "createdAt", "id", "nextRound", "notes", "position", "receivedOffer", "rejected", "updatedAt", "userId") SELECT "acceptedOffer", "appliedAt", "awaitingResponse", "companyName", "createdAt", "id", "nextRound", "notes", "position", "receivedOffer", "rejected", "updatedAt", "userId" FROM "CompanyApplication";
DROP TABLE "CompanyApplication";
ALTER TABLE "new_CompanyApplication" RENAME TO "CompanyApplication";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "lastLoggedIn" DATETIME,
    "role" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_User" ("email", "id", "lastLoggedIn", "name") SELECT "email", "id", "lastLoggedIn", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
