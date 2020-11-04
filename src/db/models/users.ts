import {DataTypes, Sequelize,} from 'sequelize'
import {DatabaseModel} from "../../types/db";

const {v4: uuidv4} = require('uuid');
const bcrypt = require("bcrypt")

export class UserModel extends DatabaseModel {
}

export default (sequelize: Sequelize) => {

    UserModel.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: {
                    // @ts-ignore
                    args: true,
                    msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
                },
                validate: {
                    isEmail: {
                        // @ts-ignore
                        args: true,
                        msg: 'The email you entered is invalid or is already in our system.'
                    },
                    max: {
                        // @ts-ignore
                        args: 254,
                        msg: 'The email you entered is invalid or longer than 254 characters.'
                    }
                }

            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {args: [5, 15], msg: "length of username must be between 5 and 15"},
                }

            },
            password: {
                type: DataTypes.STRING(200),
                allowNull: false,
                validate: {

                    len: {args: [2, 10], msg: "length of password must be between 2 and 10"},
                },
            },
            name: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            surname: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            nickName: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: {args: [15], msg: "age should be above 14"},
                    isInt: {msg: "age should be only integer value"},
                }
            },
            role: {
                type: DataTypes.ENUM,
                values: ['ADMIN', 'USER'],
                allowNull: false,
                validate: {
                    isIn: {
                        args: [["ADMIN", "USER"]],
                        msg: "Only Admin or User Roles can be entered"
                    },
                    isUppercase: {
                        msg: "only upper case letter allowed"
                    }
                }
            }
        },

        {
            hooks: {
                beforeValidate(user: any) {
                    user.id = uuidv4();
                },
                beforeCreate: (user: any) => {
                    user.password = bcrypt.hashSync(user.password, 8)
                },
            },
            paranoid: true,
            timestamps: true,
            sequelize,
            modelName: 'users'
        })


    UserModel.associate = (models) => {
        UserModel.hasMany(models.Exercise, {
            foreignKey: {
                name: 'userID',
                allowNull: true
            },
            as: 'user-exercises'
        })
    }
    return UserModel
}

