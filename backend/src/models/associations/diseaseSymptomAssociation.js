const diseaseSymptomAssociation = (db) => {
  db.DiseaseSymptom.belongsTo(db.Disease, {
    foreignKey: "diseaseId",
    as: "disease",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.DiseaseSymptom.belongsTo(db.Audio, {
    foreignKey: "symptomsAVEnId",
    as: "enAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.DiseaseSymptom.belongsTo(db.Audio, {
    foreignKey: "symptomsAVNpId",
    as: "npAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default diseaseSymptomAssociation;
