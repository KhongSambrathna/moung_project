import express from 'express';
import { getContent, getContentById, getContentTitle, createContent, ContentUpdate, deleteContent, getLatestContent, getRandomContent } from '../controller/contentController.js';


// Initialize multer middleware for file uploads
import upload from '../middleware/multer.js';

const contentRoute = express.Router();
// Route to fetch content by ID
contentRoute.delete("/delete/:id", deleteContent)
contentRoute.get("/news_detail/:id", getContentById);
contentRoute.get("/news", getContent);
contentRoute.get("/latestNews", getLatestContent);
contentRoute.get("/randomNews", getRandomContent);
contentRoute.get("/content", getContentTitle);
contentRoute.post('/create-content', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'headerImage', maxCount: 1 }
]), createContent);
contentRoute.put('/content/:id', upload.fields([
    { name: 'coverImage', maxCount: 1 }, 
    { name: 'headerImage', maxCount: 1 }
]), ContentUpdate);

contentRoute.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
  
    try {
      // Construct the file path to be stored in MongoDB
      const filePath = `${req.file.originalname}`;
      // Create a new content entry in MongoDB with the file path
      const newContent = new Content({
        title: req.body.title, // Assuming you have a title field
        imagePath: filePath, // Storing the file path in MongoDB
      });
  
      await newContent.save();
  
      res.status(200).json({
        message: 'File uploaded and saved successfully',
        content: newContent,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

export default contentRoute;
