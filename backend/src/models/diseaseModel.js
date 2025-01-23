const Disease = (sequelize, Sequelize, DataTypes) => {
  return sequelize.define(
    "Disease",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      plantId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
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

export default Disease;
