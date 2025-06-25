const User = require('../models/User');

// Function to fetch all users
 exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Query to get all users
    
    res.json(users); // Send the list of users in the response
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching users');
  }
};


