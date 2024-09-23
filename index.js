const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');



const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://harithakolla08:1234567890@cluster0.jtf3klq.mongodb.net/")
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection failed:', error));

// API routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
