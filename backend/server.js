const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const passport = require('passport');
const configurePassport = require('./config/passport');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
configurePassport(passport);

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/exchanges', exchangeRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
