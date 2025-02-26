const diseaseCureAssociation = (db) => {
  db.DiseaseCure.belongsTo(db.Disease, {
    foreignKey: "diseaseId",
    as: "disease",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.DiseaseCure.belongsTo(db.Audio, {
    foreignKey: "curesAVEnId",
    as: "enAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.DiseaseCure.belongsTo(db.Audio, {
    foreignKey: "curesAVNpId",
    as: "npAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default diseaseCureAssociation;
