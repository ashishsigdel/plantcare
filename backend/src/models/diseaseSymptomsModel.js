const DiseaseSymptom = (sequelize, Sequelize, DataTypes) => {
  return sequelize.define(
    "DiseaseSymptom",
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
      symptomsEn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      symptomsNP: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      symptomsAVEnId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      symptomsAVNpId: {
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

export default DiseaseSymptom;
