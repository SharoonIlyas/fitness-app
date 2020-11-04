import {Router} from 'express'
import {USER_ROLE} from "../utils/enums";

const ProgramController = require('../controllers/programs')
const router: Router = Router()
const passport = require('passport')
require('../auth/passport')
const {authUserRole} = require("../auth/basicAuth")

export default () => {

    //ADMIN ROUTES (create, update or delete programs)
    router.get('/admin/programs',passport.authenticate('jwt', {session: false}), authUserRole(USER_ROLE.ADMIN), ProgramController.allPrograms)
    router.get('/admin/programs/:id',passport.authenticate('jwt', {session: false}), authUserRole(USER_ROLE.ADMIN), ProgramController.oneProgram)
    router.post('/admin/programs',passport.authenticate('jwt', {session: false}), authUserRole(USER_ROLE.ADMIN), ProgramController.createProgram)
    router.delete('/admin/programs/:id', passport.authenticate('jwt', {session: false}), authUserRole(USER_ROLE.ADMIN), ProgramController.deleteProgram)
    router.put('/admin/programs/:id',passport.authenticate('jwt', {session: false}), authUserRole(USER_ROLE.ADMIN), ProgramController.updateProgram)

    return router
}
