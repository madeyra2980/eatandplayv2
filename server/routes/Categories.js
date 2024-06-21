const express = require('express');
const router = express.Router(); 
const Categories = require('../models/Categories');

router.post('/', async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = new Categories({ name });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        console.error('Ошибка сохранения категории:', err);
        res.status(500).json({ error: 'Ошибка сервера при сохранении категории' });
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await Categories.find();
        res.json(categories);
    } catch (err) {
        console.error('Ошибка при получении списка категорий:', err);
        res.status(500).json({ error: 'Ошибка сервера при получении списка категорий' });
    }
});

module.exports = router;
