module.exports = (sequelize, datatypes) => {
  //sequelize e' utilizzato per interagire con il DB. Datatyoes e' un oggetto che contiene i tipi di dati che Sequelize supporta, ad esempio STRING, INTEGER, ecc
  const gymTab = sequelize.define("gymTab", {
    //qua stiamo definendo un models chiamata gymTab, dove lettera e userId sono colonne.
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
  return gymTab; //Restituisce il modello gymTab appena definito, pronto per essere utilizzato nel resto del progetto.
};
