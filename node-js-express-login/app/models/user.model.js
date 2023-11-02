module.exports = (sequelize, DataTypes) => {
  // Define the "User" model
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure username is required
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure email is required
      unique: true,     // Ensure email is unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure password is required
    }
  });

  return User;
};
