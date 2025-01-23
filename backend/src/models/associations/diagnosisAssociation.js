const diagnosisAssociation = (db) => {
  db.Diagnosis.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.Diagnosis.belongsTo(db.Disease, {
    foreignKey: "diseaseId",
    as: "disease",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.Diagnosis.belongsTo(db.Report, {
    foreignKey: "reportId",
    as: "report",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default diagnosisAssociation;
