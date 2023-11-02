require('dotenv').config(); // Load environment variables from the .env file in the root directory

module.exports = {
  secret: process.env.SECRET_KEY || "kakarot-Prod"
};
