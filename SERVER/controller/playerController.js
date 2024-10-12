import Player from '../models/playerModel.js';
// export const create = async (req, res)=>{
//     try{
//         const userData = new User(req.body);
//         const {email} = userData;
//         const userExist = await User.findOne({email});
//         if(userExist){
//             return res.status(400).json({message : "User already exists."});
//         }
//         const savedUser = await userData.save();

//         res.status(200).json({message : "User Added Successfully."});
//     } catch (err) {
//         res.status(500).json({err:"Internet Server Error."})
//         // res.status(500).json(err.message);
//     }
// }


// Get all player short by goal
export const GetAllPlayerGoal = async (req, res) => {
  try {
      // Fetch players sorted by goals in descending order
      const players = await Player.find().sort({ goals: -1 });

      if (players.length === 0) {
          return res.status(404).json({ message: "Player not Found." });
      }

      res.status(200).json(players); // Use 200 for successful retrieval
  } catch (err) {
      console.error(err); // Log error details for debugging
      res.status(500).json({ err: "Internet Server Error." });
  }
};
// Get players with position "GK"
export const getGoalkeepers = async (req, res) => {
    try {
      const playersGK = await Player.find({ position: 'ចាំទី', status: 1 });
  
      if (playersGK.length === 0) {
        return res.status(404).json({ message: 'No Goalkeepers found.' });
      }
  
      res.status(200).json(playersGK);
    } catch (error) {
      console.error('Error fetching goalkeepers:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  // Get players with position "DF"
export const getDefender = async (req, res) => {
    try {
      const playersDF = await Player.find({ position: 'ការពារ', status: 1 });
  
      if (playersDF.length === 0) {
        return res.status(404).json({ message: 'No Defender found.' });
      }
  
      res.status(200).json(playersDF);
    } catch (error) {
      console.error('Error fetching Defender:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// Get players with position "MD"
export const getMidfielder = async (req, res) => {
  try {
    const playersMD = await Player.find({ position: 'បម្រើ', status: 1 });

    if (playersMD.length === 0) {
      return res.status(404).json({ message: 'No Midfielder found.' });
    }

    res.status(200).json(playersMD);
  } catch (error) {
    console.error('Error fetching Midfielder:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Get players with position "AT"
export const getAttacker = async (req, res) => {
  try {
    const playersAT = await Player.find({ position: 'ប្រយុទ្ធ', status: 1});

    if (playersAT.length === 0) {
      return res.status(404).json({ message: 'No Attacker found.' });
    }

    res.status(200).json(playersAT);
  } catch (error) {
    console.error('Error fetching Attacker:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Get players with position "AT"
export const getCoach = async (req, res) => {
  try {
    const Coach = await Player.find({ position: 'គ្រូបង្វឹក', status: 1 });

    if (Coach.length === 0) {
      return res.status(404).json({ message: 'No Coach found.' });
    }

    res.status(200).json(Coach);
  } catch (error) {
    console.error('Error fetching Attacker:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Get Player Ranking Goals with Pagination and Search
export const fetchPlayer = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    // Calculate skip value based on the current page and limit
    const skip = (page - 1) * limit;

    // Use regular expression for case-insensitive search by player name
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    // Fetch players based on query, sort by goals in descending order, and apply pagination
    const players = await Player.find(query)
      .sort({ goals: -1 })
      .skip(skip)
      .limit(Number(limit));

    if (players.length === 0) {
      return res.status(404).json({ message: 'Players not Found.' });
    }

    // Count total number of players for pagination
    const totalPlayers = await Player.countDocuments(query);
    const totalPages = Math.ceil(totalPlayers / limit);

    res.status(200).json({
      players,
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Player Ranking Assists with Pagination and Search
export const fetchAssist = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    // Calculate skip value based on the current page and limit
    const skip = (page - 1) * limit;

    // Use regular expression for case-insensitive search by player name
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    // Fetch players based on query, sort by assists in descending order, and apply pagination
    const players = await Player.find(query)
      .sort({ assists: -1 })
      .skip(skip)
      .limit(Number(limit));

    if (players.length === 0) {
      return res.status(404).json({ message: 'Players not Found.' });
    }

    // Count total number of players for pagination
    const totalPlayers = await Player.countDocuments(query);
    const totalPages = Math.ceil(totalPlayers / limit);

    res.status(200).json({
      players,
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Update Data
// export const update = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const userExist = await User.findOne({_id:id});
//         if(!userExist) {
//             return res.status(404).json({message:"User Not Found."});
//         }
//         const updateUser = await User.findByIdAndUpdate(id, req.body, {new:true});
//         res.status(200).json({message : "User Update Successfully."});
//         {/*res.status(201).json(updateUser); */} 
//     } catch (err){
//         // res.status(500).json({error: "Internal Server Error."});
//         res.status(500).json(err.message);
//     }
// }
// //Delete data
// export const deleteUser = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const userExist = await User.findOne({_id:id});
//         if(!userExist) {
//             return res.status(404).json({message:"User Not Found."});
//         }
//         await User.findByIdAndDelete(id);
//         res.status(200).json({message : "User Delete Successfully."});
//         {/* res.status(201).json({message : "User Deleted."}); */}
//     } catch(err) {
//         res.status(500).json(err.message);
//     }
// }

// //Get user by id
// export const getUserID = async (req, res)=>{
//     try {
//         const id = req.params.id;
//         const users = await User.findOne({_id:id});
//         if(users.length === 0  ){
//             return res.status(404).json({message: "User not Found."});
//         }
//         res.status(201).json(users);

//     } catch (err){
//         res.status(500).json(err.message)
//     }
// }