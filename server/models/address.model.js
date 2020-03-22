const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema(
   {
      line1: {
         type: String,
         required: ['Line 1 is required'],
      },
      line2: {
         type: String,
      },
      zip: {
         type: String,
         required: ['ZIP is required'],
      },
      city: {
         type: String,
         required: ['City is required'],
      },
   },
   {
      timestamps: true,
   }
)

module.exports = mongoose.model('Address', AddressSchema)
