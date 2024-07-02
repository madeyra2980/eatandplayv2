const express = require('express');
const router = express.Router(); 
const Preference = require('../models/Preference');
const Restaurant = require('../models/Restaurants')

router.post('/', async (req, res) => {
    const { preferenceName } = req.body;

    try {
        const newPreference = new Preference({ preferenceName }); 
        const savedPreference = await newPreference.save();
        res.status(201).json(savedPreference);
    } catch (err) {
        console.error('Ошибка сохранения Предпочитений:', err);
        res.status(500).json({ error: 'Ошибка сервера при сохранении предпочтения' });
    }
});

router.get('/', async (req, res) => {
    try {
        const { name } = req.query; 
        const preferences = name ? await Preference.find({ preferenceName: name }) : await Preference.find();
        res.json(preferences);
    } catch (err) {
        console.error('Ошибка при получении списка предпочтений:', err);
        res.status(500).json({ error: 'Ошибка сервера при получении списка предпочтений' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { preferenceName } = req.body; 

    try {
        const updatedPreference = await Preference.findByIdAndUpdate(id, { preferenceName }, { new: true });
        if (!updatedPreference) {
            return res.status(404).json({ error: 'Предпочтение не найдено' });
        }
        res.json(updatedPreference);
    } catch (err) {
        console.error('Ошибка при обновлении предпочтений:', err);
        res.status(500).json({ error: 'Ошибка сервера при обновлении предпочтений' });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPreference = await Preference.findByIdAndDelete(id);
        if (!deletedPreference) {
            return res.status(404).json({ error: 'Предпочитания не найдена' });
        }
        res.json({ message: 'Предпочитания удалена', preference: deletedPreference });
    } catch (err) {
        console.error('Ошибка при удалении Предпочитаний:', err);
        res.status(500).json({ error: 'Ошибка сервера при удалении Предпочитаний' });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
            .populate({ path: 'preferences', select: 'name' }); 
        
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).send("Restaurant not found");
        }
    } catch (err) {
        console.error("Ошибка при получении ресторана:", err);
        res.status(500).json({ error: "Ошибка сервера при получении ресторана" });
    }
});
  

module.exports = router;
