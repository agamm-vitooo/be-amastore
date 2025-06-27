const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const client = require('prom-client')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// Routes
app.use('/api/admins', require('../src/router/admin.route'))
app.use('/api/clients', require('../src/router/client.route'))
app.use('/api/profile', require('../src/router/profile.route'))
app.use('/api/categories', require('../src/router/category.route'))
app.use('/api/products', require('../src/router/product.route'))
app.use('/api/upload', require('../src/router/upload.avatar.route'))
app.use('/api/upload', require('../src/router/upload.product.route'))

// Prometheus metrics
client.collectDefaultMetrics()
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType)
    res.end(await client.register.metrics())
  } catch (ex) {
    res.status(500).end(ex)
  }
})

// Ping routes
app.get('/', (req, res) => {
  res.json({ message: '✅ Express server + MongoDB is running 🚀' })
})

let isConnected = false
app.get('/ping-db', (req, res) => {
  const state = mongoose.connection.readyState
  res.json({
    state,
    status:
      state === 0
        ? '🔴 disconnected'
        : state === 1
        ? '🟢 connected'
        : state === 2
        ? '🟡 connecting'
        : '🟠 disconnecting'
  })
})

// Connect DB
const connectDB = async () => {
  if (isConnected) return
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    isConnected = true
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
  }
}
connectDB()

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is listening on port ${PORT}`)
})

module.exports = app
