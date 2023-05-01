-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAuthenticated" BOOLEAN NOT NULL,
    "lastLoggedIn" DATETIME
);

-- CreateTable
CREATE TABLE "CompanyApplication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "awaitingResponse" BOOLEAN NOT NULL,
    "rejected" BOOLEAN NOT NULL,
    "nextRound" BOOLEAN NOT NULL,
    "receivedOffer" BOOLEAN NOT NULL,
    "acceptedOffer" BOOLEAN NOT NULL,
    "notes" TEXT,
    "appliedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "CompanyApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
