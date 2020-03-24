const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: ['Email is required'],
      },
      password: {
         type: String,
         required: ['Password is required'],
      },
      stripe_id: {
         type: String,
      },
      addresses: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
         },
      ],
   },
   {
      timestamps: true,
   }
)

module.exports = mongoose.model('User', UserSchema)
