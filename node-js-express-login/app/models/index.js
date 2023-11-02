// Import necessary modules and configuration
const config = require("../config/db.config");
const Sequelize = require("sequelize");

// Create a new Sequelize instance with the configuration
const sequelize = new Sequelize(
  config.DB,        // Database name
  config.USER,      // Database username
  config.PASSWORD,  // Database password
  {
    host: config.HOST,         // Database host
    dialect: config.dialect,   // Database dialect (e.g., "mysql")
    pool: {
      max: config.pool.max,     // Maximum number of connections in the pool
      min: config.pool.min,     // Minimum number of connections in the pool
      acquire: config.pool.acquire, // Maximum time (in milliseconds) to acquire a connection
      idle: config.pool.idle    // Maximum time (in milliseconds) a connection can remain idle
    }
  }
);

// Initialize an object to hold the database models and other related properties
const db = {};

// Attach the Sequelize instance to the db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import and define the user and role models
db.user = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);

// Define associations between user and role models
db.role.belongsToMany(db.user, { through: "user_roles" });
db.user.belongsToMany(db.role, { through: "user_roles" });

// Define available roles
db.ROLES = ["user", "admin", "moderator"];

// Export the db object for use in other parts of the application
module.exports = db;
