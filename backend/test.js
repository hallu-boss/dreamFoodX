const { PrismaClient } = require("@prisma/client");
const { loginUser } = require("./controllers/loginController");
const prisma = new PrismaClient();

async function main() {
  const data = {
    email: "john.doe@example.com",
    password: "password123",
  };
  const token = await loginUser(data);
  console.log("token:", token);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
