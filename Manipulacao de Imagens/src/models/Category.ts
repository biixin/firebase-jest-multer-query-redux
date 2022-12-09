import { DataTypes, Model } from 'sequelize'
import { sequelize, } from './../instances/mysql';
import {User} from './User';

export interface CategoryInstance extends Model {
    id: number,
    name: string,
    age: number
}

export const Category = sequelize.define<CategoryInstance>('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "#FFFFFF"
    }
}, {
    tableName: 'categories'
})

Category.belongsTo(User, {
    constraints: true,
    foreignKey: 'userId'
})

User.hasMany(Category, {
    foreignKey: 'userId'
})



