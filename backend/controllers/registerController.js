const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

exports.registerUser = async (userData) => {
  const { name, surname, email, password } = userData;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      surname,
      email,
      password: passwordHash,
      cookingHours: 0,
    },
  });

  return user;
};

exports.handleRegisterUserReq = async (req, res) => {
  try {
    const user = await this.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
