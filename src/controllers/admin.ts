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

    UserUpdate: async (_req: Request, res: Response, _next: NextFunction) => {
        const checkUser = await User.findOne({where: {username: _req.params.username}})
        if (checkUser == null) return res.status(404).json({error: "no such user exist"})
        try {
            const user = await User.update(
                {
                    role: _req.body.role,
                    nickName: _req.body.nickName,
                    surname: _req.body.surname,
                    age: _req.body.age,
                    name: _req.body.name,
                },
                {where: {username: _req.params.username},})
            const data = await User.findOne(
                {where: {username: _req.params.username},
                    attributes: ['id', 'username', 'name', 'surname', 'email', 'age', 'nickName', 'role']})
            return res.status(200).json({user: data})
        }catch(e)
        {
            return res.status(400).json({error: e})
        }
    },

    UserDelete: async (_req: Request, res: Response, _next: NextFunction) => {
        try {
            const user = await User.destroy({where: {username: _req.params.username},})
            if (user) return res.json({message: "user deleted secessfully"})
            return res.json({error: "no such user exist"})
        } catch (e) {
            return res.json({error: e})
        }
    },
}