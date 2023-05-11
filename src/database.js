const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://127.0.0.1:27017'

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB is connected..."))
    .catch((err) => console.log(err))