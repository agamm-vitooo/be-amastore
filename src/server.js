const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const client = require('prom-client');
const adminRoutes = require('./router/admin.route');
const clientRoutes = require('./router/client.route');
const profileRoutes = require('./router/profile.route');
const uploadAvatarRoute = require('./router/upload.avatar.route');
const uploadProductRoute = require('./router/upload.product.route');
const categoryRoutes = require('./router/category.route');
const productRoutes = require('./router/product.route');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/admins', adminRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/profile', profileRoutes);

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use('/api/upload', uploadAvatarRoute);
app.use('/api/upload', uploadProductRoute);

// Kumpulkan default metrics (CPU, memory, event loop, dll)
client.collectDefaultMetrics();

// Tambahkan endpoint untuk expose metrics
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Express server + MongoDB is running 🚀' });
});

let isConnected = false;

app.get('/ping-db', (req, res) => {
  const state = mongoose.connection.readyState;
  res.json({
    state,
    status:
      state === 0
        ? '🔴 disconnected'
        : state === 1
        ? '🟢 connected'
        : state === 2
        ? '🟡 connecting'
        : '🟠 disconnecting',
  });
});

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

connectDB(); 

module.exports = app;
