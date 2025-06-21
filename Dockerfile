# Gunakan base image Node.js
FROM node:18

# Buat direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Salin semua file project ke dalam container
COPY . .

# Jalankan server
CMD ["npm", "run", "dev"]

# Expose port yang digunakan Express
EXPOSE 3000
