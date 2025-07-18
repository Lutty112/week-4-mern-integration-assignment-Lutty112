// Import required modules
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

dotenv.config();

const app = express();
connectDB();

// Allow only frontend on Vercel to connect
const allowedOrigins = [
  'https://week-4-mern-integration-assignment-chi.vercel.app',
  'https://week-4-mern-integration-assignment-bfk9.onrender.com',
  'http://localhost:5173',
  ];

// CORS for Express
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

 // Middlewares
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

// Error handling middleware
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});




