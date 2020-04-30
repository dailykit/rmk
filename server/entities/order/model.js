const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema(
   {
      date: String,
      userId: String,
      cardId: String,
      stripeId: String,
      addressId: String,
      fulfillment: {
         mode: {
            type: String,
            default: 'DELIVERY',
            enum: ['DELIVERY', 'PICK_UP'],
         },
         startTime: Date,
         endTime: Date,
      },
      restaurant: {
         id: String,
         stripeId: String,
      },
      status: {
         type: String,
         default: 'PENDING',
         enum: [
            'PENDING',
            'SELECTED',
            'AUTO_SKIPPED',
            'SKIPPED',
            'ORDER_CONFIRMED',
            'ORDER_FAILED',
         ],
      },
      payment: {
         id: String,
         status: {
            type: String,
            default: 'PENDING',
            enum: ['SUCCESS', 'PENDING', 'ERROR'],
         },
      },
      billing: {
         tax: Number,
         total: Number,
         discount: [
            {
               type: String,
               amount: Number,
            },
         ],
         productCost: Number,
      },
      products: [
         {
            label: String,
            comboProductId: Number,
            customizableProductId: Number,
            comboProductComponentId: Number,
            customizableProductOptionId: Number,
            product: {
               id: Number,
               option: {
                  id: Number,
                  type: {
                     type: String,
                     default: 'Meal Kit',
                  },
               },
               type: {
                  type: String,
                  default: 'Simple Recipe',
               },
            },
         },
      ],
   },
   { timestamps: true }
)

const OrdersPerDaySchema = new Schema(
   {
      date: String,
      orders: {
         selected: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
         pending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
         skipped: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
      },
   },
   { timestamps: true }
)

const OrdersPerRestaurantSchema = new Schema(
   {
      date: String,
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

const FailedOrderSchema = new Schema(
   {
      date: String,
      orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
   },
   { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema)
const OrdersPerDay = mongoose.model('OrdersPerDay', OrdersPerDaySchema)
const FailedOrder = mongoose.model('FailedOrder', FailedOrderSchema)
const OrdersPerRestaurant = mongoose.model(
   'OrdersPerRestaurant',
   OrdersPerRestaurantSchema
)

module.exports = { Order, OrdersPerDay, FailedOrder, OrdersPerRestaurant }
