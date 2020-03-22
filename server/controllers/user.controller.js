const User = require('../models/user.model')
const Address = require('../models/address.model')

const createUser = async (req, res) => {
   try {
      const { email, password, address: userAddress } = req.body
      const user = new User({ email, password })
      const address = new Address(userAddress)
      await address.save()
      user.addresses = [address]
      await user.save()
      return res.json({
         success: true,
         message: 'User created',
         data: null,
      })
   } catch (err) {
      return res.json({
         success: false,
         message: err.message,
         data: null,
      })
   }
}

module.exports = {
   createUser,
}
