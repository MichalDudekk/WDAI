import { DataTypes } from "sequelize";
import database from "../database.js";

const User = database.define(
    "User",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: "users",
    }
);

export default User;
