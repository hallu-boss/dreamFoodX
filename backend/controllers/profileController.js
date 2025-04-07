const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

exports.getProfile = async (userData) => {
  const { id } = userData;

  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
};

exports.handleGetProfileReq = async (req, res) => {
  try {
    const user = await this.getProfile(req.body);
    res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
