const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeURLs = require('./routes/route');
const noteRoutes = require('./routes/noteRoute'); // Import note routes
const cors = require('cors');
const bodyParser = require('body-parser');

//Aneesa add this 
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());

dotenv.config();

mongoose.connect(process.env.MONGO_URI, console.log('Connected to MongoDB'));

app.use(express.json());
app.use(cors());

app.use('/app', routeURLs)
app.use('/apps', noteRoutes);
app.listen(3001, () => {
  console.log('Server running at http://localhost:3001/');
});