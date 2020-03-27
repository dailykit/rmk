const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema(
   {
      name: String,
      logo: String,
      isActive: {
         type: Boolean,
         default: true,
      },
      menu: {
         id: String,
         name: String,
         zip_codes: [String],
      },
   },
   { timestamps: true }
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant
