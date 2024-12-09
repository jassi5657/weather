const User = require("../model/user");
const jwt = require('jsonwebtoken');
const SECRET_KEY = "11111111111111111111111111111111";




const loginUser  = async (req, res) => {
    const { email } = req.body; // Change from username to email
    try {
        const user = await User.findOne({ where: { email } }); // Update query to search by email
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Using Sequelize's findAll method

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};






const addUser = async (req, res) => {
    try {
        
       

        const { username, password, email } = req.body;

        const user = await User.create({
            username,
            password,
            email,
           
        });

        return res.status(201).json({ message: 'User  added successfully', user });

    } catch (error) {
        console.error('Error adding user:', error.message);

        // Handle duplicate email error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Email already exists' });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }
};







module.exports = {
    getAllUsers,
    addUser,
    loginUser
    
};