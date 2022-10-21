import { Model } from "sequelize";

interface UsersAttributes {
  email: string;
  userName: string;
  password: string;
  isActive: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Users extends Model implements UsersAttributes {
    email!: string;
    userName!: string;
    password!: string;
    isActive!: boolean;

    static associate(models: any) {
      Users.hasMany(models.Tasks, { foreignKey: "UserId" });
      Users.hasOne(models.SignupToken, { foreignKey: "UserTokenId" });
    }
  }

  Users.init(
    {
      //   id: {
      //     type: DataTypes.UUID,
      //     defaultValue: DataTypes.UUIDV4,
      //     allowNull: false,
      //     primaryKey: true,
      //   },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Users",
    }
  );

  return Users;
};
