import {Router} from 'express'
const router: Router = Router()
import { USER_ROLE } from '../utils/enums'
const passport  = require('passport')
require('../auth/passport')
const {authUserRole}  = require("../auth/basicAuth")
const AdminController = require('../controllers/admin')
export default () => {
    //ADMIN USER ROUTES

    // (get all users and all its data)
    router.get('/users',passport.authenticate('jwt',{session:false}), authUserRole(USER_ROLE.ADMIN) ,AdminController.allUsers)

    // (get ,edit or delete a user)
    router.get('/users/:username',passport.authenticate('jwt',{session:false}),authUserRole(USER_ROLE.ADMIN),AdminController.singleUser)
    router.put('/users/:username',passport.authenticate('jwt',{session:false}),authUserRole(USER_ROLE.ADMIN),AdminController.singleUserUpdate)
    router.delete('/users/:username',passport.authenticate('jwt',{session:false}),authUserRole(USER_ROLE.ADMIN),AdminController.singleUserDelete)

    return router
}
