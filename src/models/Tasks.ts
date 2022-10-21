import { Model } from "sequelize";

interface TasksAttributes {
    id: string;
    title: string;
    description: string;
    state: boolean;
    UserId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Tasks extends Model implements TasksAttributes {
    id!: string;
    title!: string;
    description!: string;
    state!: boolean;
    UserId!: string;

    static associate(models: any) {
        Tasks.belongsTo(models.Users, {foreignKey: "UserId"})
    }
  }

  Tasks.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Tasks",
    }
  );

  return Tasks;
};
