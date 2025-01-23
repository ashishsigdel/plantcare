const userAssociation = (db) => {
  db.User.hasMany(db.Diagnosis, {
    foreignKey: "userId",
    as: "diagnoses",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.User.hasMany(db.Report, {
    foreignKey: "userId",
    as: "reports",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.User.hasMany(db.Upload, {
    foreignKey: "userId",
    as: "uploads",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default userAssociation;
