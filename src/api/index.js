const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

// Router
const adminRoutes = require('../router/admin.route')
const clientRoutes = require('../router/client.route')
const profileRoutes = require('../router/profile.route')
const uploadAvatarRoute = require('../router/upload.avatar.route')
const uploadProductRoute = require('../router/upload.product.route')
const categoryRoutes = require('../router/category.route')
const productRoutes = require('../router/product.route')

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// DB connect
let isConnected = false
const connectDB = async () => {
  if (isConnected) return
  await mongoose.connect(process.env.MONGO_URI)
  isConnected = true
}
connectDB()

// Routes
app.use('/api/admins', adminRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadAvatarRoute)
app.use('/api/upload', uploadProductRoute)

app.get('/', (req, res) => {
  res.json({ message: '✅ Serverless backend on Vercel' })
})

module.exports = serverless(app)
