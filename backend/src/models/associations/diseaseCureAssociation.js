const diseaseCureAssociation = (db) => {
  db.DiseaseCure.belongsTo(db.Disease, {
    foreignKey: "diseaseId",
    as: "disease",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.DiseaseCure.hasOne(db.Audio, {
    foreignKey: "curesAVEnId",
    as: "enAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    constraints: false,
  });
  db.DiseaseCure.hasOne(db.Audio, {
    foreignKey: "curesAVNpId",
    as: "npAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    constraints: false,
  });
};

export default diseaseCureAssociation;
