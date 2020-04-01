const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema(
   {
      name: String,
      logo: String,
      api_url: String,
      stripeId: String,
      isActive: {
         type: Boolean,
         default: true,
      },
      menu: {
         name: String,
         menuId: String,
      },
      zipcodes: [String],
      fulfillment: {
         pickup: [
            {
               address: String,
               discount: Number,
               contact: {
                  name: String,
                  email: String,
                  phone: Number,
               },
               timings: [
                  {
                     to: Date,
                     from: Date,
                  },
               ],
            },
         ],
         delivery: {
            self: {
               serviceAreas: [
                  {
                     price: Number,
                     zipcodes: [String],
                  },
               ],
            },
            partners: [
               {
                  name: String,
                  logo: String,
                  tags: [String],
                  stripeId: String,
                  serviceAreas: [
                     {
                        price: Number,
                        zipcodes: [String],
                     },
                  ],
               },
            ],
         },
      },
   },
   { timestamps: true }
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant
