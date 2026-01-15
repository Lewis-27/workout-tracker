import React, { useMemo } from 'react'
import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { Input } from './ui/input'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet
} from '@/components/ui/field'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { Spinner } from './ui/spinner'

const LoginForm = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useUserStore((state) => state.user)
  const updateUserDetails = useUserStore((state) => state.updateUserDetails)

  useEffect(() => {
    if(localStorage.userInfo){
      navigate('/')
    }
  }, [])

  const loginMutation = useMutation({
    mutationFn: async (enteredDetails) => {
      return await axios.post('/api/users/auth', enteredDetails, {withCredentials: true})
    }
  })

  useEffect(() => {
    if(loginMutation.status === 'success'){
        updateUserDetails(loginMutation.data.data)
        localStorage.setItem('userInfo', JSON.stringify(loginMutation.data.data))  
        navigate('/')
    } else if(loginMutation.status === 'error') {
      toast.error('Failed to log in')
    }
  }, [loginMutation.status])



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginMutation.mutateAsync({email,password})
    } catch (error) {
      
    }

  }

  return (
    <div className='w-100 '>
      {loginMutation.status === 'pending' ?<Spinner className={'size-16'}></Spinner>  : 
      <form id='loginForm' onSubmit={handleSubmit}>
        <FieldSet >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input 
                id='email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='joe@mail.com' 
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <Input 
                id='password' 
                type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••••'
                required
              />
            </Field>
            <Field >
              <Button type='submit'>Log In</Button>
            </Field>
          </FieldGroup>
        </FieldSet>        
      </form>}

    </div>
  )
}

export default LoginForm
