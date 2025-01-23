import Language from "../enums/language";
import UserRole from "../enums/userRole";

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
      phone: {
        type: DataTypes.STRING(100),
        allowNull: false,
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
      validate: {
        emailOrPhoneRequired() {
          if (!this.email && !this.phone) {
            throw new Error("Either email or phone must be provided.");
          }
        },
      },
    }
  );
};

export default User;
