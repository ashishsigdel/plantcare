const uploadAssociation = (db) => {
  db.Upload.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.Upload.hasOne(db.Report, {
    foreignKey: "uploadId",
    as: "report",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default uploadAssociation;
