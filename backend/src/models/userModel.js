const User = (sequelize, Sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      profilePic: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      otp: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      otpExpireTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lang:{
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: 'en'
      },
      role:{
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: 'user'
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};

export default User;
