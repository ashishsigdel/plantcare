const Audio = (sequelize, Sequelize, DataTypes) => {
  return sequelize.define(
    "Audio",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING(300),
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

export default Audio;
