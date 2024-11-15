module.exports = (sequelize, datatypes) => {
  const users = sequelize.define("users", {
    email: {
      type: datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: datatypes.STRING,
      allowNull: false,
      unique: false,
    },
    username: {
      type: datatypes.STRING,
      allowNull: true,
      unique: true,
    },
  });

  return users;
};
