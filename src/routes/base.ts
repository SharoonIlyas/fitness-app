import {Router} from 'express'
const router: Router = Router()
const passport  = require('passport')
require('../auth/passport')
const BaseController = require('../controllers/base')
export default () => {
    router.post('/signup', BaseController.signup );
    router.post('/login',passport.authenticate('local',{session:false}),BaseController.signin);
    return router
}
