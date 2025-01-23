const diseaseAssociation = (db) => {
  db.Disease.belongsTo(db.Plant, {
    foreignKey: "plantId",
    as: "plant",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.Disease.hasOne(db.DiseaseDescription, {
    foreignKey: "diseaseId",
    as: "diseaseDescription",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.Disease.hasOne(db.DiseaseSymptom, {
    foreignKey: "diseaseId",
    as: "diseaseSymptom",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.Disease.hasOne(db.DiseasePrevention, {
    foreignKey: "diseaseId",
    as: "diseasePrevention",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.Disease.hasOne(db.DiseaseCure, {
    foreignKey: "diseaseId",
    as: "diseaseCure",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.Disease.hasMany(db.Diagnosis, {
    foreignKey: "diseaseId",
    as: "diagnoses",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default diseaseAssociation;
