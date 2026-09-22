//Import and set up bcrypt hashing
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

//Function to hash password with bcrypt
async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_WORK_FACTOR);
}

//Function to compare password with a stored hash
async function comparePassword(candidatePassword, hashedPassword) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
}

//Node export
module.exports = {
  hashPassword,
  comparePassword,
};
