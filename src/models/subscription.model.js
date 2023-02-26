import { model, Schema } from 'mongoose'

const subscriptionSchema = new Schema({
  endpoint: String,
  expirationTime: Number,
  keys: {
    p256dh: String,
    auth: String
  }
})

export default model('Subscription', subscriptionSchema)