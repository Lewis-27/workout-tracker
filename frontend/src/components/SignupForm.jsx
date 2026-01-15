import React, { useEffect } from 'react'
import { useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Input } from './ui/input'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet
} from '@/components/ui/field'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { Spinner } from './ui/spinner'

const SignupForm = () => {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const updateUserDetails = useUserStore((state) => state.updateUserDetails)

  const signupMutation = useMutation({
    mutationFn: async (newUser) => {
      const res = await axios.post('/api/users', newUser)
      return res.data
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signupMutation.mutateAsync({name, email, password})
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if(signupMutation.status === 'success') {
      updateUserDetails(signupMutation.data)
      localStorage.setItem('userInfo', JSON.stringify(signupMutation.data))
      navigate('/')
    } else if (signupMutation.status === 'error') {
      toast.error('Failed to create account')
    }
  }, [signupMutation.status])

  return (
    <div className='w-100 '>
      {signupMutation.status === 'pending' ? <Spinner className={'size-16'}></Spinner> : 
      <form action="" onSubmit={handleSubmit}>      
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='name'>Name</FieldLabel>
                <Input 
                  id='name' 
                  placeholder='Joe Blogs' 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  />
            </Field>
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input 
                id='email' 
                placeholder='example@mail.com' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </Field>
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <Input 
                id='password' 
                type='password' 
                placeholder='••••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </Field>
            <Field>
              <Button type='submit'>Sign Up</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form> }
    </div>
  )
}

export default SignupForm
