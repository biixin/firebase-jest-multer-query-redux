import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../instances/mysql';

export interface ImageInstance extends Model {
    id: number,
    userId: number,
    url: string,
    default: boolean
}

export const Image = sequelize.define<ImageInstance>('Image', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    default: {
        type: DataTypes.BOOLEAN,
    },

}, {
    tableName: 'images',
    timestamps: false
})


