import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent 
} from './ui/card'
import { CirclePlus } from 'lucide-react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AddCard = ({workoutId}) => {

  const queryClient = useQueryClient()

  const addBlankExercise = async () => {
    const res = await axios.post(`/api/exercises/workout/${workoutId}`, {
      exerciseName: 'New Exercise',
      muscleGroup: '-'
    })
    queryClient.invalidateQueries()
    return res.data
  }

  const addBlankExerciseMutation = useMutation({
    mutationFn: addBlankExercise
  })
  
  return (
    <Card variant='outline' className='h-full min-h-80 hover:cursor-pointer' onClick={() => addBlankExerciseMutation.mutate()}>
      <CardHeader>
        <CardTitle>Add Exercise</CardTitle>
      </CardHeader>
      <CardContent className='h-full flex items-center justify-center'>
        <CirclePlus size={64} strokeWidth={0.75} className='text-light text-gray-500'/>
      </CardContent>
    </Card>
  )
}

export default AddCard
