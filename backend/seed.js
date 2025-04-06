const { PrismaClient } = require("@prisma/client");
const { registerUser } = require("./controllers/registerController");
const prisma = new PrismaClient();

async function main() {
  const data = {
    name: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    password: "password123",
  };
  const user = await registerUser(data);
  console.log("User created:", user);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
