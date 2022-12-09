import { DataTypes, Model } from 'sequelize'
import { sequelize, } from '../instances/mysql';
import { Category } from './Category';
import {User} from './User';

export interface TaskInstance extends Model {
    id: number,
    isDone: boolean,
    title: string,
    description: string,
    dueDate: Date,
    userId: number,
    categoryId: number,
}

export const Task = sequelize.define<TaskInstance>('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    
}, {
    tableName: 'tasks'
})

Task.belongsTo(User, {
    constraints: true,
    foreignKey: 'userId'
})
Task.belongsTo(Category, {
    constraints: true,
    foreignKey: 'categoryId'
})

User.hasMany(Task, {
    foreignKey: 'userId'
})



