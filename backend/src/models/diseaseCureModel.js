const DiseaseCures = (sequelize, Sequelize, DataTypes) => {
  return sequelize.define(
    "DiseaseCures",
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
      curesEn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      curesNP: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      curesAVEnId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      curesAVNpId: {
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

export default DiseaseCures;
