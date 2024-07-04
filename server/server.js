require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const PORT = process.env.PORT || 3003;

mongoose.connect(process.env.MONGO_DB || 'mongodb+srv://askarovmadyar:Zxcvbnm@cluster0.vbht9au.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: false, // Замените на true, если хотите разрешить недействительные сертификаты
    tlsInsecure: false, // Убедитесь, что этот параметр установлен в false для более строгой проверки
    // tlsCAFile: 'path/to/your/ca-certificate.pem', // Укажите путь к вашему CA-сертификату, если требуется
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
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
    });
});

app.use('/images', express.static('upload/images'));
    
app.use('/restaurants', restaurants);
app.use('/dishes', dishRoutes);
app.use('/categories', Categories);
app.use('/preference', PreferenceRoutes);

app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
});
