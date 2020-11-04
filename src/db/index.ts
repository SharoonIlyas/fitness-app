import path from 'path'
import fs from 'fs'
import { Sequelize } from 'sequelize'
import defineExercise from './models/exercise'
import defineProgram from './models/program'
import defineUser from './models/users'

const sequelize = new Sequelize('fitness_app', 'postgres', 'postgres', {host: 'localhost', dialect: 'postgres'});
sequelize.authenticate().catch((e: any) => console.error(`Unable to connect to the database${e}.`))

const modelsBuilder = (instance: Sequelize) => ({
	// Import models to sequelize
	Exercise: instance.import(path.join(__dirname, 'models/exercise'), defineExercise),
	Program: instance.import(path.join(__dirname, 'models/program'), defineProgram),
	User: instance.import(path.join(__dirname, 'models/users'), defineUser)
})
const models = modelsBuilder(sequelize)

// check if every model is imported
const modelsFiles = fs.readdirSync(__dirname+'/models')

//  no -1 because index.ts can not be counted
if (Object.keys(models).length !== (modelsFiles.length )) { throw new Error('You probably forgot import database model!') }

Object.values(models).forEach((value: any) => {
	if (value.associate) {
		value.associate(models)
	}
})
export { models, modelsBuilder, sequelize }
