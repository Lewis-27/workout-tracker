import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
 } from '@/components/ui/card'
 import ExerciseListing from '@/components/ExerciseListing'
 import AddCard from '@/components/AddCard'

const WorkoutPage = () => {
  const { id } = useParams()
  const [workout, setWorkout] = useState({})
  const [exercises, setExercises] = useState([])

  const fetchWorkout = async () => {
    const res = await axios.get(`/api/workouts/${id}`)
    setWorkout(res.data)
    return res.data
  }

  const fetchExercises = async () => {
    const res = await axios.get(`/api/exercises/workout/${id}`)
    setWorkout({
      id: res.data[0].workout_id,
      name: res.data[0].workout_name
    })
    setExercises(res.data)
    return res.data
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['workouts', id],
    queryFn: fetchExercises
  })

  // if( isPending ) {
  //   return <Spinner></Spinner>
  // }

  // if( isError ) {
  //   return <div className="">Error: {error.message}</div>
  // }

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-start px-4 md:px-8 lg:px-16 xl:px-32">
      <Card className='w-full'>
        <CardHeader className='text-center'>
          <CardTitle>{workout.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {isPending ? <Spinner></Spinner> : 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {exercises && !isPending
                ? <>
                    {exercises.map((exercise) => <ExerciseListing key={exercise.id} exercise={exercise} /> )}
                    <AddCard workoutId={id}/>
                  </>
                : null
              }
              
            </div>
          }
          
        </CardContent>
      </Card>      
    </div>

  )
}

export default WorkoutPage
