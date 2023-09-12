import { createRequire } from "module"
const require = createRequire(import.meta.url)
require("dotenv").config()

const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            email: {
                type: sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: sequelize.STRING(15),
                allowNull: true,
            },
            password: {
                type: sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: sequelize.STRING(10),
                allowNull: true,
            },
            snsId: {
                type: sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps:true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        });
        db.User.hasMany(db.Domain);
    }
};