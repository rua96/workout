module.exports = (sequelize, datatypes) => {
  const exercise = sequelize.define("exercise", {
    esercizio: {
      type: datatypes.STRING,
      allowNull: true,
      unique: false,
    },
    setReps: {
      type: datatypes.STRING,
      allowNull: true,
      unique: false,
      defaultValue: "N/A",
    },
    notes: {
      type: datatypes.STRING,
      allowNull: true,
      unique: false,
      defaultValue: "N/A",
    },
    rest: {
      type: datatypes.STRING,
      allowNull: true,
      unique: false,
      defaultValue: "N/A",
    },
    gymTabId: {
      type: datatypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    status: {
      type: datatypes.STRING,
      allowNull: true,
      unique: false,
    },
  });

  exercise.associate = (models) => {
    exercise.belongsTo(models.gymTab, { foreignKey: "gymTabId" });
  };
  return exercise;
};
