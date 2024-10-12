import Content from '../models/contentModel.js';
import fs from 'fs';
import path from 'path';
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
    // Extract the paths of uploaded images
    const coverImage = req.files?.coverImage ? req.files.coverImage[0].path : null;
    const headerImage = req.files?.headerImage ? req.files.headerImage[0].path : null;

    // Validate that both images have been uploaded
    if (!coverImage || !headerImage) {
      return res.status(400).json({ error: "Both images are required" });
    }

    const { title, summary, content } = req.body;

    // Create a new content entry with the image paths
    const newContent = new Content({
      title,
      summary,
      content,
      image_url: headerImage,  // Save header image path
      cover_url: coverImage,   // Save cover image path
      date_published: new Date(),
    });

    await newContent.save(); // Save to the database
    res.status(201).json({ message: "Content created successfully", content: newContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//Update Content
export const ContentUpdate = async (req, res) => {
    console.log('Updating content with ID:', req.params.id);
    console.log('Request body:', req.body);
    console.log('Files:', req.files);

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

        // Delete old files if new files are provided
        if (req.files) {
            if (req.files.coverImage) {
                // Delete the old cover image
                fs.unlink(oldContent.cover_url, (err) => {
                    if (err) {
                        console.error(`Failed to delete old cover image: ${err}`);
                    }
                });
                updates.cover_url = req.files.coverImage[0].path; 
            }
            if (req.files.headerImage) {
                // Delete the old header image
                fs.unlink(oldContent.image_url, (err) => {
                    if (err) {
                        console.error(`Failed to delete old header image: ${err}`);
                    }
                });
                updates.image_url = req.files.headerImage[0].path; 
            }
        }

        // Update the content in the database
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
        const contentExist = await Content.findOne({_id: id});
        
        if (!contentExist) {
            return res.status(404).json({ message: "Content Not Found." });
        }

        // Get the cover image and header image paths from the content
        const coverImagePath = contentExist.cover_url ? path.resolve(contentExist.cover_url) : null;
        const headerImagePath = contentExist.image_url ? path.resolve(contentExist.image_url) : null;
        // Delete the header image if it exists
        if (headerImagePath && fs.existsSync(headerImagePath)) {
            fs.unlink(headerImagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete header image`);
                } else {
                    console.log(`Header image deleted`);
                }
            });
}
        // Delete the cover image if it exists
        if (coverImagePath && fs.existsSync(coverImagePath)) {
            fs.unlink(coverImagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete cover image`);
                } else {
                    console.log(`Cover image deleted`);
                }
            });
        }

        

        // Delete the content from the database
        await Content.findByIdAndDelete(id);

        res.status(200).json({ message: "Content deleted successfully, along with associated images." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};