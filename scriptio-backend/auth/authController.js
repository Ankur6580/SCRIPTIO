// Handles requests (register, login etc..)
const bcrypt = require("bcryptjs")
const { generateToken } = require("./authServices")
const { validateEmail, validatePassword } = require("./authVallidator")

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

//* Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Please fill all the fields")
  }

  if (!validateEmail(email)) {
    return res.status(400).json("Please enter valid email")
  } else if (!validatePassword(password)) {
    return res.status(400).json("Password should contain atleast\n- 8 characters\n- 1 lowercase letter\n- 1 uppercase letter\n- 1 number\n- 1 symbol/ special character")
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please try logging in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: { id: true, email: true },
    });

    return res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};


//* Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Please fill all the fields")
  }

  if (!validateEmail(email)) {
    return res.status(400).json("Please enter valid email")
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true }
    });

    if (!user) {
      return res.status(401).json("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json("Invalid credentials");
    }

    const token = await generateToken(user.id);

    return res.status(200).json({
      message: "Login successful",
      user: { id: user.id, email: user.email },
      token
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};


const getDashboard = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    return res.status(200).json({
      message: "Welcome to the dashboard",
      user
    })
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error
    })
  }
}

const getHome = async (req, res) => {
  res.status(200).json("Welcome to the home page")
}

module.exports = {
  registerUser,
  loginUser,
  getDashboard,
  getHome
}