import Language from "../enums/language.js";
import UserRole from "../enums/userRole.js";

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
        allowNull: true,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
      },
      profilePic: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      otp: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      otpExpireTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      language: {
        type: DataTypes.ENUM(Object.values(Language)),
        allowNull: true,
        defaultValue: Language.EN,
      },
      role: {
        type: DataTypes.ENUM(Object.values(UserRole)),
        allowNull: true,
        defaultValue: UserRole.USER,
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
