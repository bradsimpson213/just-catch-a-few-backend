'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: {
        type: Sequelize.STRING(25),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
      },
      wins: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      losses: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false
      },
    },
    {}
  );
  User.associate = function(models) {
  };
  return User;
};