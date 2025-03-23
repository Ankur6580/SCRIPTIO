const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const deleteUser = async (req, res) => {
  const { email } = req.body

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        email: email
      }
    })
    return res.status(200).json("user deleted" + deletedUser)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { deleteUser }