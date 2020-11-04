import {NextFunction, Request, Response} from "express";
import {models} from "../db";

const {Program, Exercise} = models


module.exports = {

    allPrograms: async (_req: Request, res: Response, _next: NextFunction) => {
        const programs = await Program.findAll({include: [{model: Exercise, as: 'exercises'}]})
        return res.json({
            data: programs,
            message: 'List of programs'
        })
    },

    oneProgram: async (_req: Request, res: Response, _next: NextFunction) => {
        const program = await Program.findOne({where: {id: _req.params.id}})
        if (program == null) return res.status(404).json({error: "no program found with this id"})
        return res.status(200).json({
            data: program,
            message: 'successfully found program'
        })

    },

    createProgram: async (_req: Request, res: Response, _next: NextFunction) => {
        await Program.create(_req.body).then(function (program: any) {
            if (program) return res.status(201).json(
                {
                    message: "successfully created program",
                    data: program
                })
        }).catch((err: any) => {
            return res.json({
                error: err
            })
        })
    },


    deleteProgram: async (_req: Request, res: Response, _next: NextFunction) => {
        const checkProgram = await Program.findOne({where: {id: _req.params.id}})
        if (checkProgram == null) return res.status(404).json({error: "Program not found"})
        Program.destroy({where: {id: _req.params.id}}).then(function (result: any) {
            if (result) {
                return res.status(202).json({message: "successfully deleted program"})
            }
        }).catch((err: any) => {
            res.json({
                error: err
            })
        })


    },

    updateProgram: async (_req: Request, res: Response, _next: NextFunction) => {
        const checkProgram = await Program.findOne({where: {id: _req.params.id}})
        if (checkProgram == null) return res.status(404).send("no program found with this id")

        const program = await Program.update({
            name: _req.body.name,
        }, {where: {id: _req.params.id}})
        if (program != null) {
            const data = await Program.findOne({where: {id: _req.params.id}})
            return res.status(200).json({
                data: data,
                message: 'successfully updated program'
            })
        }


    }
}