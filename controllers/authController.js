const db = require('../model');
const { comparePasswords, hashPassword } = require('../utils/pass'); 
const generateToken = require('../utils/token');
const User = db.User;

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      message: 'Get All Users successfully',
      content: users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const registerUser = async (req, res) => {
  const user= req.body;
  try {
    const existing = await User.findOne({ where: { email:user.email } });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPassword(user.password);

    const token = generateToken(user);

    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User created successfully',
      content: newUser,
      access_token:token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;  

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
    const token = generateToken(user);
    res.json({
      message: 'User logged in successfully',
      content: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      access_token: token,  
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  getUsers,
  registerUser,
  loginUser
};
