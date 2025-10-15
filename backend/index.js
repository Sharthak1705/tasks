
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');
const stripeRoutes = require('./routes/paymentRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/emails', emailRoutes); 
app.use('/api/stripe', stripeRoutes); 

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
