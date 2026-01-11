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

const getSetsByWorkoutDB = async(workoutId) => {
  const res = await pool.query(
    'SELECT sets.id, exercise_id, workout_id, workout_name, exercises.exercise_name, weight, reps FROM sets INNER JOIN exercises ON sets.exercise_id = exercises.id INNER JOIN workouts ON exercises.workout_id = workouts.id WHERE workout_id=$1',
    [workoutId]
  )
  return res.rows
}

const getSetsByExerciseDB = async(exerciseId) => {
  const res = await pool.query(
    'SELECT sets.id, exercise_id, exercise_name, weight, reps FROM sets INNER JOIN exercises ON sets.exercise_id = exercises.id WHERE exercise_id=$1',
    [exerciseId]
  )
  return res.rows
}

const getSetByIdDB = async(setId) => {
  const res = await pool.query('SELECT * FROM sets WHERE id=$1', [setId])
  return res.rows[0]
}

const addSetDB = async(set) => {
  const res = await pool.query('INSERT INTO sets(exercise_id, weight, reps) VALUES($1, $2, $3) RETURNING *', [set.exerciseId, set.weight, set.reps])
  return res.rows[0]
}

const updateSetDB = async(setId, updatedSet) => {
  try {
    await pool.query('BEGIN')
    const res = await pool.query('UPDATE sets SET weight=$2, reps=$3 WHERE id=$1 RETURNING *', [setId, updatedSet.weight, updatedSet.reps])
    await pool.query('COMMIT')
    return res.rows[0]
  } catch (error) {
    await pool.query('ROLLBACK')
    throw new Error('Error updating set')
  } 
}

const deleteSetDB = async(setId) => {
  const res = await pool.query('DELETE FROM sets WHERE id=$1 RETURNING *', [setId])
  console.log(res)
  return res.rows[0]
}

export { getSetsByWorkoutDB, getSetsByExerciseDB, getSetByIdDB, addSetDB, updateSetDB, deleteSetDB }