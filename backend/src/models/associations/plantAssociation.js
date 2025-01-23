const plantAssociation = (db) => {
  db.Plant.hasMany(db.Disease, {
    foreignKey: "plantId",
    as: "diseases",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default plantAssociation;
