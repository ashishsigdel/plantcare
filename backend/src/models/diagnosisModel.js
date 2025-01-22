const Diagnosis = (sequelize, Sequelize, DataTypes) => {
  return sequelize.define(
    "Diagnosis",
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
      diseaseId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      reportId: {
        type: DataTypes.BIGINT,
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

export default Diagnosis;
