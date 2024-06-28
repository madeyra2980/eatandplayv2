// models/Dish.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Dish', DishSchema);
