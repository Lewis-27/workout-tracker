import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const { Pool, Client } = pg;

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE
})

const getExercisesByUserDB = async (userId) => {
  const res = await pool.query(
    'SELECT exercises.id, exercises.workout_id, workouts.workout_name, exercises.exercise_name, exercises.muscle_group FROM exercises INNER JOIN workouts ON exercises.workout_id = workouts.id WHERE workouts.owner = $1'
    , [userId])
  return res.rows
}

const getExercisesByWorkoutDB = async (userId, workoutId) => {
  const res = await pool.query('SELECT * FROM exercises INNER JOIN workouts ON exercises.workout_id = workouts.id WHERE workouts.owner=$1 AND exercises.workout_id=$2', [userId, workoutId])
  return res.rows
}

const getExerciseByIdDB = async (userId, exerciseId) => {
  const res = await pool.query('SELECT exercises.id, exercises.workout_id, workouts.workout_name, exercises.exercise_name, exercises.muscle_group FROM exercises INNER JOIN workouts ON exercises.workout_id = workouts.id WHERE workouts.owner=$1 AND exercises.id = $2', [userId, exerciseId])
  return res.rows[0]
}

const addExerciseDB = async(workoutId, exercise) => {
  const res = await pool.query('INSERT INTO exercises (workout_id, exercise_name, muscle_group) VALUES($1, $2, $3) RETURNING *', [workoutId, exercise.exerciseName, exercise.muscleGroup])
  return res.rows[0]
}

const updateExerciseDB = async(userId, exerciseId, newExercise) => {
  try {
    const currentExercise = await getExerciseByIdDB(userId, exerciseId)
    if(!currentExercise){
      throw new Error('Incorrect user')
    }
    await pool.query('BEGIN')
    const res = await pool.query('UPDATE exercises SET exercise_name=$2, muscle_group=$3 WHERE id=$1 RETURNING *', [exerciseId, newExercise.exerciseName, newExercise.muscleGroup] )
    await pool.query('COMMIT')
    return res.rows[0]
  } catch (error) {
    await pool.query('ROLLBACK')
    throw new Error('Error updating exercise')
  }
}

const deleteExerciseDB = async(userId, exerciseId) => {
  const res = await pool.query('DELETE FROM exercises AS e USING workouts AS w WHERE e.workout_id=w.id AND e.id=$1 AND w.owner=$2 RETURNING *', [exerciseId, userId])
  return res.rows[0]
}

export {getExercisesByUserDB, getExercisesByWorkoutDB, getExerciseByIdDB, addExerciseDB, updateExerciseDB, deleteExerciseDB}