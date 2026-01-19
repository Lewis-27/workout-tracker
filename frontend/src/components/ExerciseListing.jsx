import React, { useState } from 'react'
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
} from './ui/alert-dialog'
 import { Button } from './ui/button'
 import { Spinner } from './ui/spinner'
 import { SquarePen, Save } from 'lucide-react'
 import { Link } from 'react-router-dom'
 import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
 import axios from 'axios'
 import SetInfo from './SetInfo'
import { Input } from './ui/input'
import { Field, FieldDescription, FieldLabel } from './ui/field'

const ExerciseListing = ({ exercise }) => {

  const queryClient = useQueryClient()

  const [sets, setSets] = useState([])
  const [editingDetails, setEditingDetails] = useState(false)

  const [exerciseName, setExerciseName] = useState(exercise.exercise_name)
  const [muscleGroup, setMuscleGroup] = useState(exercise.muscle_group)

  const fetchSets = async () => {
    const res = await axios.get(`/api/sets/exercise/${exercise.id}`)
    setSets(res.data)
    return res.data
  }

  const {isPending, isError, data, error } = useQuery({
    queryKey: ['sets', exercise.id],
    queryFn: fetchSets
  })

  const addSet = async () => {
    const blankSet = {
      exerciseId: exercise.id,
      weight: 0,
      reps: 0
    }
    const res = await axios.post(`/api/sets`, blankSet)
    queryClient.invalidateQueries()
    return res.data
  }

  const addSetMutation = useMutation({
    mutationFn: addSet
  })

  const updateExerciseDetails = async () => {
    const res = await axios.put(`/api/exercises/${exercise.id}`, {
      exerciseName,
      muscleGroup
    })
    queryClient.invalidateQueries()
    return res.data
  }

  const updatedExerciseDetailsMutation = useMutation({
    mutationFn: updateExerciseDetails
  })

  const deleteExercise = async () => {
    const res = await axios.delete(`/api/exercises/${exercise.id}`)
    queryClient.invalidateQueries()
    return res.data
  }

  const deleteExerciseMutation = useMutation({
    mutationFn: deleteExercise
  })

  return (
    <Card variant='outline'>
      <CardHeader>
        {editingDetails ? <>
          <CardTitle>
            <Field>
              <FieldLabel>Exercise Name</FieldLabel>
              <Input 
                value={ exerciseName }
                onChange={(e) => setExerciseName(e.target.value)}
              />
            </Field>
            </CardTitle>
          <CardDescription className={'text-gray-500'}>
            <Field className={'mt-2'}>
              <FieldLabel>Muscle Group</FieldLabel>
              <Input 
                value={ muscleGroup }
                onChange={(e) => setMuscleGroup(e.target.value)}
              />
            </Field>
            
          </CardDescription>
          <CardAction>
            <Button 
              variant='ghost' 
              onClick={() => {
                updatedExerciseDetailsMutation.mutate()
                setEditingDetails(!editingDetails)
              }}
            >
              <Save />
            </Button>
          </CardAction>
        </> 
        : <>
          <CardTitle>{ exerciseName}</CardTitle>
          <CardDescription className={'text-gray-500'}>{ muscleGroup }</CardDescription>
          <CardAction >
            <Button 
              variant='ghost' 
              onClick={() => setEditingDetails(!editingDetails)}
            >
              <SquarePen />
            </Button>
          </CardAction>
        </>}
      </CardHeader>
      <CardContent>
        {isPending ? <Spinner></Spinner> : <div className="flex flex-col gap-4">
          {sets.map((set) => <SetInfo key={set.id} set={set}/>)}
            {editingDetails 
              ? <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant='destructive' 
                    className={'w-full'}
                  >Delete Workout</Button> 
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete Workout?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this exercises and all its sets? This action cannot be undone
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button 
                    variant='destructive' 
                    className={'bg-red-500'}
                    onClick={(e) => deleteExerciseMutation.mutate()}
                  >Delete Workout</Button> 
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> 
            : <Button 
              variant='outline' 
              className={'w-full'}
              onClick={(e) => addSetMutation.mutate()}
            >Add Set</Button>  }
        </div> }
      </CardContent>
    </Card>
  )
}

export default ExerciseListing
