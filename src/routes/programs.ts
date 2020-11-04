import {Router} from 'express'
import {USER_ROLE} from "../utils/enums";

const ProgramController = require('../controllers/programs')
const router: Router = Router()
const passport = require('passport')
require('../auth/passport')
const {authUserRole} = require("../auth/basicAuth")

export default () => {

    //ADMIN ROUTES (create, update or delete programs)
    router.get('/admin/programs', ProgramController.allPrograms)
    router.get('/admin/programs/:id', ProgramController.oneProgram)
    router.post('/admin/programs', ProgramController.createProgram)
    router.delete('/admin/programs/:id',  ProgramController.deleteProgram)
    router.put('/admin/programs/:id', ProgramController.updateProgram)

    return router
}
