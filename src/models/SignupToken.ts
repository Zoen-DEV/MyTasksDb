import { Model } from "sequelize";

interface SignupTokenAttributes {
  id: string;
  token: string;
  UserId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class SignupToken extends Model implements SignupTokenAttributes {
    id!: string;
    token!: string;
    UserId!: string;

    static associate(models: any) {
      SignupToken.belongsTo(models.Users, { foreignKey: "UserTokenId" });
    }
  }

  SignupToken.init(
    {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
      sequelize,
      timestamps: false,
      modelName: "SignupToken",
    }
  );

  return SignupToken;
};
