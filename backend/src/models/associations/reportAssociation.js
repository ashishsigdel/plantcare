const reportAssociation = (db) => {
  db.Report.hasOne(db.Diagnosis, {
    foreignKey: "reportId",
    as: "diagnosis",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.Report.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.Report.belongsTo(db.Upload, {
    foreignKey: "uploadId",
    as: "upload",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default reportAssociation;
