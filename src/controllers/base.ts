import {NextFunction, Request, Response} from "express";
import {models} from "../db";

const jwt = require('jsonwebtoken')
const {User} = models
let signToken = (user: any) => {
    console.log("sub is " +user.id)

    return jwt.sign({
        iss: 'fitness_app',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, 'secret');

}

module.exports = {
    signup: async (_req: Request, res: Response, _next: NextFunction) => {
        User.create(_req.body).then(function (result: any) {
            console.log("from sigup " + result.DataValues)
            const token = signToken(result.toJSON())
            res.status(200).json({
                token: token,
                message: 'user is created'
            })
        }).catch((err: any) => {
            res.json({
                //error: err.errors[0].message
                error: err
            })
        })
    },

    signin: async (_req: Request, res: Response, _next: NextFunction) => {
        // @ts-ignore
        var token = signToken(_req.user.toJSON())

        return res.json({token})
    },

    // signin: async (_req: Request, res: Response, _next: NextFunction) => {
    //
    //     const user = await User.findOne({where: {email: _req.body.email}})
    //     if (user === null) return res.json({message: "email not found"})
    //     bcrypt.compare(_req.body.password, user.password, (err: Error, result: boolean) => {
    //         if (err) return res.json({error: err})
    //         if (result) {
    //             const token = signToken(user)
    //             return res.json({data: user, token: token})
    //         }
    //         return res.json({message: "incorrect email or password"})
    //     })
    // }
}