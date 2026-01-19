import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { 
  Item,
  ItemContent
} from './ui/item'
import {
  Field
} from './ui/field'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'

const SetInfo = ({set}) => {

  const queryClient = useQueryClient()

  const [weight, setWeight] = useState(set.weight)
  const [reps, setReps] = useState(set.reps)

const removeSet = async () => {
  const res = await axios.delete(`/api/sets/${set.id}`)
  queryClient.invalidateQueries()
  return res.data
}

const removeSetMutation = useMutation({
  mutationFn: removeSet
})

const updateValues = async () => {
  const res = await axios.put(`/api/sets/${set.id}`, {
    weight,
    reps
  })
  queryClient.invalidateQueries()
  return res.data
}

const updateValuesMutation = useMutation({
  mutationFn: updateValues
})

useEffect(() => {
  updateValuesMutation.mutate()
  
}, [weight, reps])

  return (
    <div className="flex items-center justify-between ">
      <div className='flex gap-4 text-lg '>
        <div className="flex gap-1 items-center justify-start ">
          {/* <Item variant='outline' className=' min-w-12 text-center '>
            <ItemContent>{set.weight}</ItemContent>
          </Item>  */}
          <Input 
            className={'w-12 h-12 text-center'} 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <div className="text-gray-500">kg</div>
        </div>
        <div className="flex items-center">x</div>
        <div className="flex gap-1 items-center justify-start">
          {/* <Item variant='outline' className=' min-w-12 text-center '>
            <ItemContent>{set.reps}</ItemContent>
          </Item>  */}
          <Input 
            className={'w-12 h-12 text-center'}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <div className="text-gray-500">reps</div>
        </div>
      </div>
      <Button 
        variant='destructive' 
        onClick={(e) => removeSetMutation.mutate()}
      ><Trash className=''/></Button>
    </div>
  )
}

export default SetInfo
