import {NextFunction, Request, Response} from "express";
import {models} from "../db";

const {User, Exercise} = models

module.exports = {
    allUsers: async (_req: Request, res: Response, _next: NextFunction) => {
        const users = await User.findAll({attributes: ["id", "nickName"]})
        return res.json({
            data: users,
            message: 'List of users'
        })
    },

    profile: async (_req: Request, res: Response, _next: NextFunction) => {
        // @ts-ignore
        if (_req.user.username === _req.params.username) {
            try {
                const user = await User.findOne({
                    // @ts-ignore
                    where: {username: _req.user.username},
                    attributes: ['id', 'username', 'name', 'surname', 'email', 'age', 'nickName', 'role']
                })
                if (user) return res.json({user})
                return res.json({error: "no such user exist"})
            } catch (e) {
                return res.json({error: e})
            }
        }
        return res.json({error: "you can only access your own profile"})
    },

    profileUpdate: async (_req: Request, res: Response, _next: NextFunction) => {
        // @ts-ignore
        if (_req.user.username === _req.params.username) {
            try {
                const user = await User.update(
                    {
                        name: _req.body.name,
                        surname: _req.body.surname,
                        age: _req.body.age,
                        nickName: _req.body.nickName,
                    }, {
                        where: {username: _req.params.username},

                    })
                const data =await User.findOne(
                    {where: {username: _req.params.username},
                        attributes: ['username', 'name', 'surname', 'email', 'age', 'nickName', 'role']})
                if (user) return res.status(202).json({
                    user: data,
                    message: "successfully updated user"
                })
                return res.json({error: "no such user exist"})
            } catch (e) {
                return res.status(400).json({error: e})
            }
        }
        return res.json({error: "you can only access your own profile"})
    },

    userDelete: async (_req: Request, res: Response, _next: NextFunction) => {
        // @ts-ignore
        if (_req.user.username === _req.params.username) {
            try {
                const user = await User.destroy({where: {username: _req.params.username},})
                if (user) return res.json({message: "user deleted"})
                return res.json({error: "no such user exist"})
            } catch (e) {
                return res.json({error: e})
            }
        }
        return res.json({error: "you can only delete your own user"})
    },


    userData: async (_req: Request, res: Response, _next: NextFunction) => {
        // @ts-ignore
        if (_req.user.username === _req.params.username) {
            try {
                const user = await User.findOne({
                    // @ts-ignore
                    where: {username: _req.user.username},
                    include: [{model: Exercise, as: 'user-exercises'}]
                })
                if (user) return res.json({user})
                return res.json({error: "no such user exist"})
            } catch (e) {
                return res.json({error: e})
            }
        }
        return res.json({error: "you can only access your own Data"})
    }
}