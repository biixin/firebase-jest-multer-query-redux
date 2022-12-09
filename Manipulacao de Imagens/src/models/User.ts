import { DataTypes, Model } from 'sequelize'
import { sequelize } from './../instances/mysql';
import { Category } from './Category';

export interface UserInstance extends Model {
    id: number,
    name: string,
    email: string,
    password: string
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'users',
    timestamps: false
})


