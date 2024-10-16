import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'content', // Cloudinary folder where the images will be stored
    format: async (req, file) => {
      return file.originalname.split('.').pop(); // Keeps the file extension from the original
    },
    public_id: (req, file) => {
      const originalNameWithoutExtension = file.originalname.split('.')[0];
      return `${Date.now()}-${originalNameWithoutExtension}`; // Ensures the file has a unique name
    },
  },
});

// Create the multer instance with Cloudinary storage
const upload = multer({ storage });

export default upload;
