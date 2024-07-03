const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
  description: { type: String, required: true },
  image: { type: String, required: true }
});

const RestaurantSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  banner: { type: String, required: true },
  dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
  preferences: [{ type: Schema.Types.ObjectId, ref: 'Preference' }],
  instagram: { type: String, required: true },
  whatsapp: { type: String, required: true },
  oClock: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  promotions: [PromotionSchema],
  tooures:{ type: String, required: true }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
