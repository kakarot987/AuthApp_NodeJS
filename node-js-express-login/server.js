// Import required modules
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
// Create an Express application
const app = express();

// Middleware setup

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure cookie sessions
app.use(
  cookieSession({
    name: "login-session",
    keys: [process.env.COOKIE_SECRET], // Use a secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// Database setup
const db = require("./app/models");
const Role = db.role;

// Synchronize the database (create tables if they do not exist)
db.sequelize.sync();
// To drop and recreate the tables, you can use:
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Database tables dropped and re-synced with { force: true }');
//   initializeRoles();
// });

// Routes setup
const welcomeMessage = { message: "Welcome to the Login/SignUp application." };

app.get("/", (req, res) => {
  res.json(welcomeMessage);
});

// Include authentication routes
require("./app/routes/auth.routes")(app);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Function to initialize user roles (optional)
function initializeRoles() {
  Role.bulkCreate([
    { id: 1, name: "user" },
    { id: 2, name: "moderator" },
    { id: 3, name: "admin" },
  ]);
}
