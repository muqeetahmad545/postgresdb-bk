const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  try {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw new Error('Error hashing password');
  }
};

const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (err) {
    throw new Error('Error comparing passwords');
  }
};

module.exports = {
  hashPassword,
  comparePasswords,  
};
