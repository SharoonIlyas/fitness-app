import http from 'http'
import express from 'express'
import * as bodyParser from 'body-parser'
import {sequelize} from './db/index'
import ProgramRouter from './routes/programs'
import ExerciseRouter from './routes/exercises'
import UserRouter from './routes/users'
import AdminRouter from './routes/admin'
import BaseRouter from './routes/base'

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', BaseRouter())
app.use('/programs', ProgramRouter())
app.use('/exercises', ExerciseRouter())
app.use('/user', UserRouter())
app.use('/admin', AdminRouter())

const httpServer = http.createServer(app)
sequelize.sync()
    .then(()=>{
        console.log('Sync database', 'postgresql://localhost:5432/fitness_app')
    });
// sequelize.sync({ force: true })
//     .then(()=>{
//         console.log('Sync database', 'postgresql://localhost:5432/fitness_app')
//     });

httpServer.listen(8000).on('listening', () => console.log(`Server started at port ${8000}`))

export default httpServer
