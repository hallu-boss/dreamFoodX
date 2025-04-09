const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

exports.handleGetUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(201).json(users);
};

