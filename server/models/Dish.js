const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const DishSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: ObjectId,
        ref: 'Categories', // Указываем на модель категорий
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Dish', DishSchema);
