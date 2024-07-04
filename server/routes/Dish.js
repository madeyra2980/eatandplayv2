// DishRoutes.js
const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish'); // Путь к модели блюда
const Categories = require('../models/Categories');
const multer = require('multer');
const path = require('path');
const PORT = process.env.PORT || 3009;

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 20 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new Error('Неподдерживаемый тип файла!'), false);
        }
    },
});

router.use('/images', express.static('upload/images'));

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, description, category, cookingTime, price } = req.body;
        const image_url = `http://localhost:${PORT}/images/${req.file.filename}`;
        const existingCategory = await Categories.findById(category);
        if (!existingCategory) {
            return res.status(404).json({ error: 'Категория не найдена' });
        }
        if (!title || !description || !category || !cookingTime || !price || !image_url) {
            return res.status(400).json({ error: 'Не все поля заполнены' });
        }

        const newDish = new Dish({
            title,
            description,
            category: category,
            cookingTime,
            price,
            image: image_url,
        });

        const savedDish = await newDish.save();

        res.status(201).json(savedDish);
    } catch (err) {
        console.error('Ошибка сохранения блюда:', err);
        res.status(500).json({ error: 'Ошибка сервера при сохранении блюда' });
    }
});

router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find().populate('category', 'name');
        res.json(dishes);
    } catch (err) {
        console.error('Ошибка при получении списка блюд:', err);
        res.status(500).json({ error: 'Ошибка сервера при получении списка блюд' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, category, cookingTime, price } = req.body;

    try {
        const existingDish = await Dish.findById(id);
        if (!existingDish) {
            return res.status(404).json({ error: 'Блюдо не найдено' });
        }

        const existingCategory = await Categories.findById(category);
        if (!existingCategory) {
            return res.status(404).json({ error: 'Категория не найдена' });
        }

        existingDish.title = title;
        existingDish.description = description;
        existingDish.category = category;
        existingDish.cookingTime = cookingTime;
        existingDish.price = price;

        const updatedDish = await existingDish.save();
        res.json(updatedDish);
    } catch (err) {
        console.error('Ошибка при обновлении блюда:', err);
        res.status(500).json({ error: 'Ошибка сервера при обновлении блюда' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDish = await Dish.findByIdAndDelete(id);
        if (!deletedDish) {
            return res.status(404).json({ error: 'Блюдо не найдено' });
        }
        res.json({ message: 'Блюдо успешно удалено' });
    } catch (err) {
        console.error('Ошибка при удалении блюда:', err);
        res.status(500).json({ error: 'Ошибка сервера при удалении блюда' });
    }
});

module.exports = router;
