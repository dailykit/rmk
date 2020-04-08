const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema(
   {
      date: String,
      userId: String,
      addressId: String,
      deliveryDate: Date,
      fulfillmentMode: String,
      restaurant: {
         id: String,
         stripeId: String,
      },
      status: {
         type: String,
         default: 'PENDING',
         enum: ['PENDING', 'SELECTED', 'SKIPPED', 'CONFIRMED', 'PAYMENT_ERROR'],
      },
      payment: {
         id: String,
         status: {
            type: String,
            default: 'PENDING',
            enum: ['SUCCESS', 'PENDING', 'ERROR'],
         },
      },
      billingAmount: {
         tax: Number,
         discount: [
            {
               type: String,
               amount: Number,
            },
         ],
         productCost: Number,
      },
      info: [
         {
            productId: String,
            items: [
               {
                  label: String,
                  recipeId: String,
                  serving: { type: Number },
               },
            ],
         },
      ],
   },
   { timestamps: true }
)

const OrdersPerDaySchema = new Schema(
   {
      date: Date,
      orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
   },
   { timestamps: true }
)

const FinalOrdersPerDaySchema = new Schema(
   {
      date: Date,
      restaurants: [
         {
            restaurant: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Restaurant',
            },
            orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
         },
      ],
   },
   { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema)
const OrdersPerDay = mongoose.model('OrdersPerDay', OrdersPerDaySchema)
const FinalOrdersPerDay = mongoose.model(
   'FinalOrdersPerDay',
   FinalOrdersPerDaySchema
)

module.exports = { Order, OrdersPerDay, FinalOrdersPerDay }
