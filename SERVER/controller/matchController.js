import Match from '../models/matchModel.js';

// Get Match Histories with search by opponent and pagination
export const getMatchHistories = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;
    
    // Define search condition
    const searchCondition = search ? { opponent: { $regex: search, $options: 'i' } } : {};

    // Find matches with search, sorted by date
    const matches = await Match.find(searchCondition)
      .sort({ date: -1 }) // Sort by date, newest first
      .skip((page - 1) * limit)
      .limit(limit);

    if (!matches || matches.length === 0) {
      return res.status(404).json({ message: 'No matches found.' });
    }

    // Return paginated and sorted results
    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
