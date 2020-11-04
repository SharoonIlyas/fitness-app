import {Router} from 'express'
const router: Router = Router()
import { USER_ROLE } from '../utils/enums'
const passport  = require('passport')
require('../auth/passport')
const {authUserRole}  = require("../auth/basicAuth")
const UserController = require('../controllers/users')
export default () => {

    router.get('/all',passport.authenticate('jwt',{session:false}),UserController.allUsers)
    router.get('/profile/:username',passport.authenticate('jwt',{session:false}),UserController.profile )
    router.put('/profile/:username',passport.authenticate('jwt',{session:false}),UserController.profileUpdate )
    router.delete('/profile/:username',passport.authenticate('jwt',{session:false}),UserController.userDelete )
    router.get('/data/:username',passport.authenticate('jwt',{session:false}),UserController.userData)

    return router
}
