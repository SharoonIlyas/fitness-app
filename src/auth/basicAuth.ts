import {NextFunction, Request, Response, Router} from "express";

function authUserRole(role:string) {
    return (req: Request, res: Response, next: NextFunction)=>
    {
        // @ts-ignore
         if (req.user.role !== role) {
             res.status(401)
             return res.send("Not allowed")
         }
        next()
    }
}

module.exports = {authUserRole}