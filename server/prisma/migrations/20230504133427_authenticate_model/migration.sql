-- CreateTable
CREATE TABLE "AuthenticateWithGoogle" (
    "jwt" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthenticateWithGoogle_jwt_key" ON "AuthenticateWithGoogle"("jwt");
