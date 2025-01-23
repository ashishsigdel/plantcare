const diseaseDescriptionAssociation = (db) => {
  db.DiseaseDescription.belongsTo(db.Disease, {
    foreignKey: "diseaseId",
    as: "disease",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.DiseaseDescription.hasOne(db.Audio, {
    foreignKey: "diseaseAVEnId",
    as: "enAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    constraints: false,
  });
  db.DiseaseDescription.hasOne(db.Audio, {
    foreignKey: "diseaseAVNpId",
    as: "npAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    constraints: false,
  });
};

export default diseaseDescriptionAssociation;
