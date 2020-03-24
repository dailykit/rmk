const User = require('../models/user.model')
const Address = require('../models/address.model')
const stripe = require('stripe')('sk_test_S1pO735bBnkUXiFwiXyr7jff00LoCNokAT')

const createUser = async (req, res) => {
   try {
      const { email, password, address: userAddress } = req.body
      const user = new User({ email, password })
      const address = new Address(userAddress)
      await address.save()
      user.addresses = [address]
      const customer = await stripe.customers.create({ email })
      console.log(customer)
      user.stripe_id = customer.id
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

const createIntent = async (req, res) => {
   try {
      const { id } = req.body
      const user = User.findOne({ _id: id })
      const intent = await stripe.setupIntents.create({
         customer: user.stripe_id,
      })
      return res.json({
         success: true,
         message: 'Intent created',
         data: {
            client_secret: intent.client_secret,
         },
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
   createIntent,
}
