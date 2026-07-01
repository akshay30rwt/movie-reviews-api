const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/reviews', movieRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Connection failed', error)
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});