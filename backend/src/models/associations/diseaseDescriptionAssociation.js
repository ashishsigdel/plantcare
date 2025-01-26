const diseaseDescriptionAssociation = (db) => {
  db.DiseaseDescription.belongsTo(db.Disease, {
    foreignKey: "diseaseId",
    as: "disease",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.DiseaseDescription.belongsTo(db.Audio, {
    foreignKey: "diseaseAVEnId",
    as: "enAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.DiseaseDescription.belongsTo(db.Audio, {
    foreignKey: "diseaseAVNpId",
    as: "npAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default diseaseDescriptionAssociation;
