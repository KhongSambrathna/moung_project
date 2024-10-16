import Content from '../models/contentModel.js';
import fs from 'fs';
import path from 'path';
import cloudinary from 'cloudinary';

//Get Random Content
export const getRandomContent = async (req, res) => {
    try {
      // Use aggregation to randomly sample 8 documents
      const randomContent = await Content.aggregate([{ $sample: { size: 5 } }]);
  
      if (randomContent.length === 0) {
        return res.status(404).json({ message: "No content found." });
      }
  
      res.status(200).json(randomContent);
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
      console.log(error);
    }
  };
//Get app content 
export const getLatestContent = async (req, res) => {
    try {
      // Find and sort by the date in descending order (latest first), limit to 10
      const contents = await Content.find().sort({ date_published: -1 }).limit(5);
      
      if (contents.length === 0) {
        return res.status(404).json({ message: "Content not found." });
      }
      
      res.status(201).json(contents);
    } catch (err) {
      res.status(500).json({ err: "Internal Server Error." });
      console.log(err);
    }
  };
//Get app content and search
export const getContent = async (req, res) => {
    try {
      const { search = '', page = 1, limit = 5 } = req.query; // Default values for pagination and search
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive regex for search
  
      // Get the total number of documents that match the search criteria
      const totalContents = await Content.countDocuments({ title: { $regex: searchRegex } });
  
      // Pagination logic: skip and limit
      const contents = await Content.find({ title: { $regex: searchRegex } })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      if (!contents.length) {
        return res.status(404).json({ message: "No content found." });
      }
  
      res.status(200).json({
        contents,
        totalPages: Math.ceil(totalContents / limit), // Calculate total pages
        currentPage: parseInt(page)
      });
    } catch (err) {
      res.status(500).json({ err: "Internal Server Error." });
      console.log(err);
    }
  };
//Get Content by Id and Count Frontend
export const getContentById = async (req, res) => {
    try {
        const id = req.params.id;
        const content = await Content.findOne({ _id: id });

        if (!content) { // Check if content is found
            return res.status(404).json({ message: "Content not found." });
        }

        // Increment the view count only once
        content.views += 1; // Make sure the field name is 'views'
        await content.save(); // Save the updated content

        res.status(200).json(content); // Return the updated content
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal Server Error." });
    }
};

// Get app content 
export const getContentTitle = async (req, res) => {
    try {
        // Destructure query parameters
        const { title, startDate, endDate } = req.query;

        // Build the query object
        let query = {};

        // If a title is provided, add a regex search to the query
        if (title) {
            query.title = { $regex: title, $options: 'i' }; // 'i' for case-insensitive search
        }

        // If startDate and endDate are provided, filter by date
        if (startDate || endDate) {
            query.date = {};
            if (startDate) {
                query.date.$gte = new Date(startDate); // Greater than or equal to startDate
            }
            if (endDate) {
                query.date.$lte = new Date(endDate); // Less than or equal to endDate
            }
        }

        // Retrieve contents from the database based on the query
        const contents = await Content.find(query)
            .sort({ date: -1 }); // Sort by date descending (latest first)

        // Check if contents are found
        if (contents.length === 0) {
            return res.status(404).json({ message: "Content not Found." });
        }

        // Return the found contents
        res.status(200).json(contents);
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ err: "Internal Server Error." });
    }
};

//Create content 

export const createContent = async (req, res) => {
  try {
    // Extract the Cloudinary URLs of uploaded images
    const coverImageUrl = req.files?.coverImage ? req.files.coverImage[0].path : null;
    const headerImageUrl = req.files?.headerImage ? req.files.headerImage[0].path : null;

    // Validate that both images have been uploaded
    if (!coverImageUrl || !headerImageUrl) {
      return res.status(400).json({ error: "Both images are required" });
    }

    const { title, summary, content } = req.body;

    // Create a new content entry with Cloudinary image URLs
    const newContent = new Content({
      title,
      summary,
      content,
      image_url: headerImageUrl,  // Save header image Cloudinary URL
      cover_url: coverImageUrl,   // Save cover image Cloudinary URL
      date_published: new Date(),
    });

    await newContent.save(); // Save to the database
    res.status(201).json({ message: "Content created successfully", content: newContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update Content
export const ContentUpdate = async (req, res) => {
  try {
    const contentId = req.params.id;

    // Find the content by ID to get the old file paths
    const oldContent = await Content.findById(contentId);
    if (!oldContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Prepare updates
    const { title, summary, content } = req.body;
    const updates = { title, summary, content };

    // Delete old files first, before uploading new ones
    if (req.files) {
      if (req.files.coverImage) {
        // Delete the old cover image from Cloudinary
        const coverPublicId = oldContent.cover_url.split('/').slice(-2).join('/').split('.')[0]; // Extract public ID
        await cloudinary.v2.uploader.destroy(coverPublicId).then(re => console.log(`Deleted cover image: ${re.result}`));

        // Upload new cover image after deleting the old one
        const coverUploadResult = await cloudinary.v2.uploader.upload(req.files.coverImage[0].path, { folder: 'content' });
        updates.cover_url = coverUploadResult.secure_url;
      }

      if (req.files.headerImage) {
        // Delete the old header image from Cloudinary
        const headerPublicId = oldContent.image_url.split('/').slice(-2).join('/').split('.')[0]; // Extract public ID
        await cloudinary.v2.uploader.destroy(headerPublicId).then(re => console.log(`Deleted header image: ${re.result}`));

        // Upload new header image after deleting the old one
        const headerUploadResult = await cloudinary.v2.uploader.upload(req.files.headerImage[0].path, { folder: 'content' });
        updates.image_url = headerUploadResult.secure_url;
      }
    }

    // Now, update the content in the database
    const updatedContent = await Content.findByIdAndUpdate(contentId, updates, { new: true });
    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content updated successfully', data: updatedContent });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ message: 'Failed to update content' });
  }
};

// Delete content and associated images
export const deleteContent = async (req, res) => {
  try {
    const id = req.params.id;
    const contentExist = await Content.findOne({ _id: id });

    if (!contentExist) {
      return res.status(404).json({ message: "Content Not Found." });
    }

    // Extract public ID for cover image and header image from Cloudinary URLs
    const coverPublicId = contentExist.cover_url.split('/').slice(-2).join('/').split('.')[0]; // Gets 'content/<public_id>'
    const headerPublicId = contentExist.image_url.split('/').slice(-2).join('/').split('.')[0]; // Gets 'content/<public_id>'

    // Delete cover image from Cloudinary
    const coverDeleteResponse = await cloudinary.v2.uploader.destroy(coverPublicId).then(re=>console.log(re));

    // Delete header image from Cloudinary
    const headerDeleteResponse = await cloudinary.v2.uploader.destroy(headerPublicId).then(re=>console.log(re));

    // Delete the content from the database
    await Content.findByIdAndDelete(id);

    res.status(200).json({ message: "Content and associated images deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

