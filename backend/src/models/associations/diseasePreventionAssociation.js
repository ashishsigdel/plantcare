const diseasePreventionAssociation = (db) => {
  db.DiseasePrevention.belongsTo(db.Disease, {
    foreignKey: "diseaseId",
    as: "disease",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.DiseasePrevention.hasOne(db.Audio, {
    foreignKey: "preventionsAVEnId",
    as: "enAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    constraints: false,
  });
  db.DiseasePrevention.hasOne(db.Audio, {
    foreignKey: "preventionsAVNpId",
    as: "npAudio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    constraints: false,
  });
};

export default diseasePreventionAssociation;
