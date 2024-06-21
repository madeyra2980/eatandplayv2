const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    dishes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dish'  // Ссылка на модель Dish
    }]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
