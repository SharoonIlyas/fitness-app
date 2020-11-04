import {NextFunction, Request, Response} from "express";
import {models} from "../db";

const {User} = models

module.exports = {
    allUsers: async (_req: Request, res: Response, _next: NextFunction) => {
        const users = await User.findAll({attributes: {exclude: ["password"]}})
        return res.json({
            data: users,
            message: 'List of users'
        })
    },

    singleUser: async (_req: Request, res: Response, _next: NextFunction) => {
        try {
            const user = await User.findOne({
                where: {username: _req.params.username},
                attributes: ['id', 'username', 'name', 'surname', 'email', 'age', 'nickName', 'role']
            })
            if (user) return res.json({user})
            return res.json({error: "no such user exist"})
        } catch (e) {
            return res.json({error: e})
        }
    },

    singleUserUpdate: async (_req: Request, res: Response, _next: NextFunction) => {
        try {
            const user = await User.update(
                {
                    role: _req.body.role,
                    nickName: _req.body.nickName,
                    surname: _req.body.surname,
                    age: _req.body.age,
                },
                {where: {username: _req.params.username},})

            if (user) return res.json({user})
            return res.json({error: "no such user exist"})
        } catch (e) {
            return res.json({error: e})
        }
    },

    singleUserDelete: async (_req: Request, res: Response, _next: NextFunction) => {
        try {
            const user = await User.destroy({where: {username: _req.params.username},})
            if (user) return res.json({message:"user deleted secessfully"})
            return res.json({error: "no such user exist"})
        } catch (e) {
            return res.json({error: e})
        }
    },
}