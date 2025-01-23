const diseaseSymptomAssociation = (db) => {
  db.DiseaseSymptom.belongsTo(db.Disease, {
    foreignKey: "diseaseId",
    as: "disease",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.DiseaseSymptom.hasOne(db.Audio, {
    foreignKey: "symptomsAVEnId",
    as: "enAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    constraints: false,
  });
  db.DiseaseSymptom.hasOne(db.Audio, {
    foreignKey: "symptomsAVNpId",
    as: "npAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    constraints: false,
  });
};

export default diseaseSymptomAssociation;
