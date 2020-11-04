import {Sequelize, DataTypes,} from 'sequelize'
import { DatabaseModel } from '../../types/db'
import { EXERCISE_DIFFICULTY } from '../../utils/enums'
import { ExerciseModel } from './exercise'

export class ProgramModel extends DatabaseModel {
	id: number
	difficulty: EXERCISE_DIFFICULTY
	name: String
	exercises: ExerciseModel[]
}

export default (sequelize: Sequelize) => {
	ProgramModel.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(200),
			unique:true,
			allowNull:false,
			validate:{
				len:{
					args:[5,20],
					msg:"length allow between 5 and 20"
				}
			}
		}
	}, {
		paranoid: true,
		timestamps: true,
		sequelize,
		modelName: 'program'
	})

	ProgramModel.associate = (models) => {
		(ProgramModel as any).hasMany(models.Exercise, {
			onDelete: 'cascade',
			foreignKey: {
				name: 'programID',
				allowNull: false
			},
			as: 'exercises'
		})
	}

	return ProgramModel
}
