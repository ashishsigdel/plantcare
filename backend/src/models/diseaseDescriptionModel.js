const DiseaseDescription = (sequelize, Sequelize, DataTypes) => {
  return sequelize.define(
    "DiseaseDescription",
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
      descriptionEn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      descriptionNP: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      diseaseAVEnId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      diseaseAVNpId: {
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

export default DiseaseDescription;
