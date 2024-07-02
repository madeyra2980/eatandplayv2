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

// Обновление категории
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedCategory = await Categories.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Категория не найдена' });
        }
        res.json(updatedCategory);
    } catch (err) {
        console.error('Ошибка при обновлении категории:', err);
        res.status(500).json({ error: 'Ошибка сервера при обновлении категории' });
    }
});

// Удаление категории
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await Categories.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Категория не найдена' });
        }
        res.json({ message: 'Категория удалена', category: deletedCategory });
    } catch (err) {
        console.error('Ошибка при удалении категории:', err);
        res.status(500).json({ error: 'Ошибка сервера при удалении категории' });
    }
});

module.exports = router;
