const DiseasePreventions = (sequelize, Sequelize, DataTypes) => {
  return sequelize.define(
    "DiseasePreventions",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      diseaseId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      preventionsEn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preventionsNP: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preventionsAVEnId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      preventionsAVNpId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      paranoid: true,
    }
  );
};

export default DiseasePreventions;
