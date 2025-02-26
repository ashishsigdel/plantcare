const diseasePreventionAssociation = (db) => {
  db.DiseasePrevention.belongsTo(db.Disease, {
    foreignKey: "diseaseId",
    as: "disease",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.DiseasePrevention.belongsTo(db.Audio, {
    foreignKey: "preventionsAVEnId",
    as: "enAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.DiseasePrevention.belongsTo(db.Audio, {
    foreignKey: "preventionsAVNpId",
    as: "npAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default diseasePreventionAssociation;
