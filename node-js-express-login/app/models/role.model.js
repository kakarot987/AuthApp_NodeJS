module.exports = (sequelize, DataTypes) => {
  // Define the "Role" model
  const Role = sequelize.define("Role", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  });

  return Role;
};
