const mongoose = require('mongoose');


function connectToMongoDB(DB) {
    console.log('Пытаюсь подключиться к MongoDB с URI:', DB); // Добавлено для отладки

    mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on('error', (err) => {
        console.error('Ошибка при подключении к MongoDB:', err);
    });
    db.once('open', () => {
        console.log('Подключение к MongoDB установлено');
    });
}
module.exports = { connectToMongoDB };