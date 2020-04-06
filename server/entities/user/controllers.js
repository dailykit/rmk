const { User } = require('./model')

const create = async (req, res) => {
   try {
      const { id } = req.body
      const user = await User.create({ userId: id })
      return res.json({
         user,
         success: true,
         message: 'Succesfully created the user!',
      })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

module.exports = { create }
