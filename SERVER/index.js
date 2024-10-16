import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import route from './routes/playerRoute.js';
import matchRoute from './routes/matchRoute.js';
import contentRoute from './routes/contentRoute.js';
import multer from 'multer';
import contentModel from './models/contentModel.js';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const upload = multer(); // Configure multer

// Load environment variables
dotenv.config();

// Middleware
const allowedOrigins = ['http://localhost:5173', 'https://moung-project.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin (like Postman)
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

// MongoDB Connection
mongoose.connect(MONGOURL).then(() => {
    console.log("Database Connected Successfully");
    app.listen(PORT,'0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});

// Routes
app.use("/api/player", route);
app.use("/api", matchRoute);
app.use("/api", contentRoute);

// Content Route Example with Multer (Adjust as necessary)
app.post('/api/create-content', upload.fields([{ name: 'coverImage' }, { name: 'headerImage' }]), (req, res) => {
  console.log(req.body); // Non-file fields
  console.log(req.files); // Cloudinary file info
  res.status(200).json({ message: 'Content created successfully!' });
});

//Express route to get content by ID
app.get('/api/content/:contentId', async (req, res) => {
    try {
      const contentId = req.params.contentId;
      const content = await contentModel.findById(contentId);
      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }
      res.json(content);
    } catch (error) {
      console.error('Error fetching content:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

//For use image in front that it get url from server folder app.use(express.static('uploads'));
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the "uploads" directory
app.use('/activity', express.static(path.join(__dirname, 'uploads/activity')));
app.use('/content', express.static(path.join(__dirname, 'uploads/content')));
app.use('/logo', express.static(path.join(__dirname, 'uploads/logo')));