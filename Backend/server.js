const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeURLs = require('./routes/route');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, console.log('Connected to MongoDB'));

app.use(express.json());
app.use(cors());
app.use('/app', routeURLs)
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});