require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const BASE_URL = 'http://185.4.180.214/4444'

mongoose.connect("mongodb+srv://askarovmadyar:Zxcvbnm@cluster0.vbht9au.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" , { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Ошибка при подключении к MongoDB:', err);
});
db.once('open', () => {
    console.log('Подключение к MongoDB установлено');
});

const dishRoutes = require('./routes/Dish');
const Categories = require('./routes/Categories');
const restaurants = require('./routes/Restaurants');
const PreferenceRoutes = require('./routes/Preference');

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
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

const app = express();

require('./models/Dish');
require('./models/Categories');
require('./models/Restaurants');
require('./models/Preference');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Файл не был загружен' });
    }
    res.json({
        success: 1,
        image_url: `${BASE_URL}/images/${req.file.filename}`,
    });
});

app.use('/images', express.static('upload/images'));
app.use('/restaurants', restaurants);
app.use('/dishes', dishRoutes);
app.use('/categories', Categories);
app.use('/preference', PreferenceRoutes);

app.listen(process.env.PORT || 4444, () => {
    console.log(`Сервер работает на порту ${process.env.PORT}`);
});
