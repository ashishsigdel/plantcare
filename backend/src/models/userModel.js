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
      otp: {
        type: DataTypes.STRING(255),
      },
      profilePic: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      otpExpireTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      language: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: "en",
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: "user",
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
      validate: {
        emailOrPhone() {
          if (!this.email && !this.phone) {
            throw new Error("Either email or phone must be provided.");
          }
        },
      },
    }
  );
};

export default User;
