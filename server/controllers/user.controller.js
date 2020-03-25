const User = require('../models/user.model')
const Address = require('../models/address.model')
const axios = require('axios')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

const signup = async (req, res) => {
   try {
      const { email, password, firstname, lastname, phone } = req.body
      let url = `http://${process.env.KEYCLOAK_IP}/auth/realms/consumers/protocol/openid-connect/token`
      console.log(req.body)
      const keycloak_response = await axios({
         url,
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         auth: {
            username: process.env.KEYCLOAK_USER,
            password: process.env.KEYCLOAK_PSWD,
         },
         data: 'grant_type=client_credentials',
      })
      url = `http://${process.env.KEYCLOAK_IP}/auth/admin/realms/consumers/users`
      const response = await axios({
         url,
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + keycloak_response.data.access_token,
         },
         data: {
            username: email,
            enabled: true,
            emailVerified: true,
            firstName: firstname,
            lastName: lastname,
            email: email,
            credentials: [
               {
                  type: 'password',
                  value: password,
               },
            ],
            requiredActions: ['VERIFY_EMAIL'],
            notBefore: 0,
            attributes: {
               phone: [phone],
            },
         },
      })
      if (response.status == 409) {
         throw Error(response.data.errorMessage)
      } else {
         const user = new User({
            email,
            password,
            firstname,
            lastname,
            phone,
            keycloak_id: 'NOT_PROVIDED',
         })
         const customer = await stripe.customers.create({ email })
         user.stripe_id = customer.id
         await user.save()
         return res.json({
            success: true,
            message: 'Account created',
            data: {
               id: user._id,
            },
         })
      }
   } catch (err) {
      return res.json({
         success: false,
         message: err.message,
         data: null,
      })
   }
}

const saveCard = async (req, res) => {
   try {
      const user = await User.findOne({ _id: req.body.id })
      user.payment_method = req.body.payment_method
      await user.save()
      return res.json({
         success: true,
         message: 'Card saved',
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
   signup,
   saveCard,
}
