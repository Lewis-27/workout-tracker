import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemActions,
  ItemMedia
} from './ui/item'
import { PlusCircle } from 'lucide-react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AddWorkoutItem = () => {

  const queryClient = useQueryClient()

  const addBlankWorkout = async () => {
    const res = await axios.post('/api/workouts', {
      name: 'New Workout'
    })
    queryClient.invalidateQueries()
    return res.data
  }

  const addBlankWorkoutMutation = useMutation({
    mutationFn: addBlankWorkout
  })

  return (
    <Item size='sm' variant='outline' className={'hover:cursor-pointer hover:bg-accent/50 transition-colors'} onClick={(e) => addBlankWorkoutMutation.mutate()}>
      <ItemContent>
        <ItemMedia><PlusCircle strokeWidth={1.5}/> New Workout</ItemMedia>
      </ItemContent>
      
    </Item>
  )
}

export default AddWorkoutItem
