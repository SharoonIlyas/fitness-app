import {NextFunction, Request, Response} from "express";
import {models} from "../db";

const {Exercise, Program} = models
const {User} = models

module.exports = {
    allExercises: async (_req: Request, res: Response, _next: NextFunction) => {
        const exercises = await Exercise.findAll({
            include: [{model: Program, as: 'program'}]
        })
        return res.json({
            data: exercises,
            message: 'List of exercises'
        })
    },

    oneExercise: async (_req: Request, res: Response, _next: NextFunction) => {
        const exercise = await Exercise.findOne({
            where: {id: _req.params.id},
            include: [{model: Program, as: 'program'}]
        })
        if (exercise == null) return res.status(404).json({message: "no exercise found with this id"})

        return res.status(200).json({
            data: exercise,
            message: 'successfully found exercise'
        })


    },

    createExercise: async (_req: Request, res: Response, _next: NextFunction) => {
        if (_req.body.programID == undefined) return res.status(400).json({error: "please check if your query is valid"})
        await Program.findOne({where: {id: _req.body.programID}}).then(async (result: any) => {
            if (result == null) {
                const allPrograms = await Program.findAll()
                return res.status(404).json({
                    message: "please only select program id from the list, if you can find programs, please create them",
                    programs: allPrograms
                })
            }
            await Exercise.create(_req.body).then(function (result: any) {
                if (result) return res.status(201).json({message: "successfully created exercise"})
            }).catch((err: any) => {
                return res.json({
                    error: err
                })
            })
        })
    },

    updateExercise: async (_req: Request, res: Response, _next: NextFunction) => {
        const checkExercise = await Exercise.findOne({where: {id: _req.params.id}})
        if (checkExercise == null) return res.status(404).json({error: "no exercise found with this id"})

        const exercise = await Exercise.update({
            name: _req.body.name,
            programID: _req.body.programID,
            difficulty: _req.body.difficulty
        }, {where: {id: _req.params.id}})
        if (exercise != null) {
            const data = await Exercise.findOne({where: {id: _req.params.id}})
            return res.status(200).json({
                data: data,
                message: 'successfully updated exercise'
            })
        }


    },

    deleteExercise: async (_req: Request, res: Response, _next: NextFunction) => {
        const checkExercise = await Exercise.findOne({where: {id: _req.params.id}})
        if (checkExercise == null) return res.status(404).json({error: "exercise not found with this id"})
        try {
            Exercise.destroy({where: {id: _req.params.id}}).then(function (result: any) {
                if (result) {
                    return res.status(202).json({message: "successfully deleted exercise"})
                }
            })
        } catch (err: any) {
            res.json({
                //error: err.errors[0].message
                error: err
            })
        }
    },

    changeProgram: async (_req: Request, res: Response, _next: NextFunction) => {
        const checkExercise = await Exercise.findOne({where: {id: _req.params.exercise}})
        if (checkExercise == null) return res.status(404).json({error: "exercise not found with this id"})

        const data = await Exercise.findOne({where: {id: _req.params.exercise}})
        const jsonData = data.dataValues
        const newData = {
            name: jsonData.name,
            difficulty: jsonData.difficulty,
            programID: _req.params.program
        }
        console.log(jsonData)
        try {
            await Exercise.destroy({where: {id: _req.params.exercise}}).then(() => {
                Exercise.create(newData).then(function (result: any) {
                    if (result) return res.status(201).json({message: "successfully changed exercise program"})
                }).catch((err: any) => {
                    return res.json({
                        error: err
                    })
                })
            })
        } catch
            (err: any) {
            res.json({
                //error: err.errors[0].message
                error: err
            })
        }

    }

}