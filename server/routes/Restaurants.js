const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurants');
const multer = require('multer');
const path = require('path');
const PORT = process.env.PORT || 3009;

// Настройка Multer для загрузки изображений
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Лимит размера файла (5MB)
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new Error('Неподдерживаемый тип файла!'), false);
        }
    },
});

// Middleware для статических файлов изображений
router.use('/images', express.static('upload/images'));

// Обработчик POST запроса для создания ресторана
router.post('/', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), async (req, res) => {
    try {
        const { title, description, dishes } = req.body;

        // Проверка наличия всех обязательных полей
        if (!title || !description || !dishes) {
            return res.status(400).json({ error: 'Не все обязательные поля заполнены' });
        }

        const logo_url = `http://localhost:${PORT}/images/${req.files['logo'][0].filename}`;
        const banner_url = `http://localhost:${PORT}/images/${req.files['banner'][0].filename}`;

        // Создание нового ресторана
        const newRestaurant = new Restaurant({
            title,
            description,
            logo: logo_url,
            banner: banner_url,
            dishes,
        });

        const savedRestaurant = await newRestaurant.save();

        res.status(201).json(savedRestaurant);
    } catch (err) {
        console.error('Ошибка сохранения ресторана:', err);
        res.status(500).json({ error: 'Ошибка сервера при сохранении ресторана' });
    }
});

router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate({
            path: 'dishes',
            populate: {
                path: 'category',
                select: 'name' 
            },
            select: 'title description category cookingTime price image'
        });
        // console.log(restaurants)
        res.json(restaurants);
    } catch (err) {
        console.error('Ошибка при получении списка ресторанов:', err);
        res.status(500).json({ error: 'Ошибка сервера при получении списка ресторанов' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate({
            path: 'dishes',
            select: 'title description category cookingTime price image' // Выбор нужных полей для блюд
        });

        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).send('Restaurant not found');
        }
    } catch (err) {
        console.error('Ошибка при получении ресторана:', err);
        res.status(500).json({ error: 'Ошибка сервера при получении ресторана' });
    }
});

router.put('/:id', async (req, res) => {
    const restaurantId = req.params.id;
    const { title, description, dishes } = req.body;

    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            restaurantId,
            { title, description, dishes },
            { new: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ error: 'Ресторан не найден' });
        }

        res.json(updatedRestaurant);
    } catch (err) {
        console.error('Ошибка при обновлении ресторана:', err);
        res.status(500).json({ error: 'Ошибка сервера при обновлении ресторана' });
    }
});

router.delete('/:id', async (req, res) => {
    const restaurantId = req.params.id;

    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

        if (!deletedRestaurant) {
            return res.status(404).json({ error: 'Ресторан не найден' });
        }
        res.json({ message: 'Ресторан успешно удален' });
    } catch (err) {
        console.error('Ошибка при удалении ресторана:', err);
        res.status(500).json({ error: 'Ошибка сервера при удалении ресторана' });
    }
});


module.exports = router;
