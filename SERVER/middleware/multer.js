import multer  from 'multer';
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/content')
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix  + '-' + file.originalname);
  }
})

// Create the multer instance
const upload = multer({ storage });

// Export the upload middleware
export default upload;