const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
   {
      userId: String,
      orders: [
         {
            date: Date,
            isSkipped: { type: Boolean, default: false },
            details: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
         },
      ],
   },
   { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = { User }
