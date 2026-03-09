import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardAction
} from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ExerciseListing from '@/components/ExerciseListing'
import AddCard from '@/components/AddCard'
import { SquarePen, Save, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

const WorkoutPage = () => {

  const navigate = useNavigate()

  const { id } = useParams()
  const [workout, setWorkout] = useState({})
  const [exercises, setExercises] = useState([])

  const [editingDetails, setEditingDetails] = useState(false)
  const [workoutName, setWorkoutName] = useState('')

  const queryClient = useQueryClient()

  const fetchWorkout = async () => {
    const res = await axios.get(`/api/workouts/${id}`)
    setWorkout(res.data)
    setWorkoutName(res.data.workout_name)
    return res.data
  }

  const fetchWorkoutQuery = useQuery({
    queryKey: ['workouts', id],
    queryFn: fetchWorkout
  })

  const fetchExercises = async () => {
    const res = await axios.get(`/api/exercises/workout/${id}`)
    setExercises(res.data)
    return res.data
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['exercises', id],
    queryFn: fetchExercises
  })

  const updateWorkoutDetails = async () => {
    const res = await axios.put(`/api/workouts/${id}`, {
      name: workoutName
    })
    queryClient.invalidateQueries()
    return res.data
  }

  const updateWorkoutDetailsMutation = useMutation({
    mutationFn: updateWorkoutDetails
  })

  const deleteWorkout = async () => {
    const res = await axios.delete(`/api/workouts/${id}`)
    queryClient.invalidateQueries()
    navigate('/')
    return res.data
  }

  const deleteWorkoutMutation = useMutation({
    mutationFn: deleteWorkout
  })

  useEffect(() => {
    if (workout.workout_name !== workoutName && workoutName !== '') {
      updateWorkoutDetailsMutation.mutate()
    }
  }, [editingDetails])

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center pb-8">
      

      <Card className='px-2 '>
        <CardHeader className='text-center relative'>
          <CardTitle className={'pt-2 pb-2 relative'}>
          <div className="flex w-full absolute top-0">
            <Link to={'/'}>
              <Button variant='ghost' className='flex items-center gap-1' >
                  <ChevronLeft size={20} />
                  <div className="">Back </div>
              </Button>
              </Link>
          </div>
            {editingDetails
              ? <div className="flex items-center justify-center gap-2">
                <Input
                  className='w-1/4'
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant='destructive' size='sm'><Trash /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Workout?</AlertDialogTitle>
                      <AlertDialogDescription>Are you sure you want to delete this workout and all its exercises? This action cannot be undone</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={(e) => deleteWorkoutMutation.mutate()}>Delete</AlertDialogAction>
                    </AlertDialogFooter>

                  </AlertDialogContent>
                </AlertDialog>

              </div>
              : <>{workout.workout_name}</>
            }

          </CardTitle>
          <CardAction className={'my-auto absolute top-1 right-8 '}>
            <Button variant='ghost' size='sm' onClick={(e) => setEditingDetails(!editingDetails)}>
              {editingDetails ? <Save /> : <SquarePen />}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className={'flex items-center justify-center'}>
          {isPending ? <Spinner className='size-16 w-100 md:w-150 lg:w-200 '></Spinner> :
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {exercises && !isPending
                ? <>{exercises.length !== 0
                  ? <>{exercises.map((exercise) => <ExerciseListing key={exercise.id} exercise={exercise} />)}</>
                  : <></>}
                </>
                : null
              }

              <AddCard workoutId={id} />
            </div>
          }

        </CardContent>
      </Card>
    </div>

  )
}

export default WorkoutPage
