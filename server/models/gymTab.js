module.exports = (sequelize, datatypes) => {
  const gymTab = sequelize.define("gymTab", {
    lettera: {
      type: datatypes.STRING,
      allowNull: false,
      unique: false,
    },
    userId: {
      type: datatypes.INTEGER,
      allowNull: false,
      unique: false,
    },
  });

  gymTab.associate = (models) => {
    gymTab.hasMany(models.exercise, { foreignKey: "gymTabId" });
    models.exercise.belongsTo(gymTab, { foreignKey: "gymTabId" });
  };
  return gymTab;
};
