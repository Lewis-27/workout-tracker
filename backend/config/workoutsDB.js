import pg from 'pg';
import dotenv from 'dotenv';
import { getSecret } from '../utils/getSecret.js';
import { pool } from './db.js'

dotenv.config()

const { Pool, Client } = pg;


const getUserWorkoutsDB = async (userId) => {
  const res = await pool.query('SELECT * FROM workouts WHERE owner=$1', [userId])
  return res.rows
}

const getWorkoutByIdDB = async (userId, workoutId) => {
  const res = await pool.query('SELECT * FROM workouts WHERE owner=$1 AND id=$2', [userId, workoutId])
  return res.rows[0]
}

const addNewWorkoutDB = async (workout) => {
  const res = await pool.query('INSERT INTO workouts(owner, workout_name) VALUES($1, $2) RETURNING *', [workout.owner, workout.workout_name])
  return res.rows[0]
}

const updateWorkoutDB = async (workoutId, newWorkout) => {
  try {
    await pool.query('BEGIN')
    const res = await pool.query('UPDATE workouts SET workout_name=$2 WHERE id=$1 RETURNING *', [workoutId, newWorkout.workout_name])
    await pool.query('COMMIT')
    return res.rows[0]
  } catch (error) {
    await pool.query('ROLLBACK')
    throw new Error('Failed to update workout details')
  }
}

const deleteWorkoutDB = async (workoutId) => {
  const res = await pool.query('DELETE FROM workouts WHERE id=$1 RETURNING *', [workoutId])
  return res.rows[0]
}

export { getUserWorkoutsDB, getWorkoutByIdDB, addNewWorkoutDB, updateWorkoutDB, deleteWorkoutDB }