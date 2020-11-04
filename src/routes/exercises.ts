import {Router} from 'express'
import {USER_ROLE} from "../utils/enums";
const router: Router = Router()
const ExcerciseController = require('../controllers/exercises')
const passport = require('passport')
require('../auth/passport')
const {authUserRole} = require("../auth/basicAuth")
const ExerciseController = require('../controllers/exercises')

export default () => {

    // ADMIN ROUTES (create, update or delete exercises)
    router.get('/admin/exercises',passport.authenticate('jwt', {session: false}), authUserRole(USER_ROLE.ADMIN),  ExerciseController.allExercises)
    router.get('/admin/exercises/:id',passport.authenticate('jwt', {session: false}), authUserRole(USER_ROLE.ADMIN),  ExcerciseController.oneExercise)
    router.post('/admin/exercises',passport.authenticate('jwt', {session: false}), authUserRole(USER_ROLE.ADMIN), ExcerciseController.createExercise)
    router.post('/admin/exercises/program-change/:exercise-:program',passport.authenticate('jwt', {session: false}), authUserRole(USER_ROLE.ADMIN), ExcerciseController.changeProgram)
    router.delete('/admin/exercises/:id',passport.authenticate('jwt', {session: false}), authUserRole(USER_ROLE.ADMIN), ExcerciseController.deleteExercise)
    router.put('/admin/exercises/:id',passport.authenticate('jwt', {session: false}), authUserRole(USER_ROLE.ADMIN), ExcerciseController.updateExercise)

    
    return router
}
