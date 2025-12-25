import { DataTypes } from "sequelize";
import database from "../database.js";

const Order = database.define(
    "Order",
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "orders",
    }
);

export default Order;
