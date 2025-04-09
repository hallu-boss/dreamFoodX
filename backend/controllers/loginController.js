const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_secret_key";

exports.loginUser = async (userData) => {
  const { email, password } = userData;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" } // Token wygaśnie po godzinie
  );

  return token;
};

exports.handleLoginUserReq = async (req, res) => {
  try {
    const token = await this.loginUser(req.body);
    res.status(201).json(token);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
