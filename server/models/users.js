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
    name: {
      type: datatypes.STRING,
      allowNull: true,
      unique: false,
    },
    cognome: {
      type: datatypes.STRING,
      allowNull: true,
      unique: false,
    },
    peso: {
      type: datatypes.STRING,
      allowNull: true,
      unique: false,
    },
    altezza: {
      type: datatypes.STRING,
      allowNull: true,
      unique: false,
    },
    sesso: {
      type: datatypes.STRING,
      allowNull: true,
      unique: false,
    },
    livello: {
      type: datatypes.STRING,
      allowNull: true,
      unique: false,
    },
  });

  return users;
};
