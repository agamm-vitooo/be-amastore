// src/lib/db.js
const mongoose = require('mongoose')

let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}

module.exports = connectDB
