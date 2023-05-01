const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const { db } = require("../fake-table-data");

async function main() {
  db.users.forEach(async (user) => {
    await prisma.user.create({
      data: {
        ...user,
      },
    });
    await prisma.companyApplication.create({
      data: {
        userId: eachUser.id,
      },
    });
  });

  db.companyApplications.forEach(async (app) => {
    await prisma.companyApplication.create({
      data: {
        ...app,
      },
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
