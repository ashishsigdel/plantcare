const Plant = (sequelize, Sequelize, DataTypes) => {
  return sequelize.define(
    "Plant",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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

export default Plant;
