const Report = (sequelize, Sequelize, DataTypes) => {
  return sequelize.define(
    "Report",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      uploadId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      diseaseId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      reportPatternUrl: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};

export default Report;
