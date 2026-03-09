import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Input } from './ui/input'
import { 
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from './ui/input-group'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'

const SetInfo = ({set, editingDetails}) => {

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

      <div className='flex gap-2 text-lg'>
        <div className="">
            <InputGroup className={' hover:bg-gray-100 transition duration-300'}>
              <InputGroupInput 
                className=''
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              >
              </InputGroupInput>
              <InputGroupAddon  align='inline-end'>
                kg
              </InputGroupAddon>
            </InputGroup>
        </div>
        
        <div className="">
          <InputGroup className={' hover:bg-gray-100 transition duration-300'}>
              <InputGroupInput 
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              >
              
              </InputGroupInput>
              <InputGroupAddon align='inline-end'>
                reps
              </InputGroupAddon>
          </InputGroup>
        </div>

        {editingDetails 
          ? <Button 
              className='hover:bg-red-500 text-red-500 hover:text-white transition duration-300'
              variant='ghost' 
              onClick={(e) => removeSetMutation.mutate()}
            ><Trash className='' strokeWidth={2.5}/></Button>
          :<></>
        }
      </div>
  )
}

export default SetInfo
