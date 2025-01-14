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
      type: datatypes.BOOLEAN,
      allowNull: true,
      unique: false,
      defaultValue: true,
    },
  });

  exercise.associate = (models) => {
    exercise.belongsTo(models.gymTab, { foreignKey: "gymTabId" });
  };
  return exercise;
};
