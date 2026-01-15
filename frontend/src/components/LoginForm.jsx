import React from 'react'
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
      const res = await axios.post('/api/users/auth', enteredDetails, {withCredentials: true})
      return res.data
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      loginMutation.mutate({email,password})
      if(loginMutation.data){
        updateUserDetails(loginMutation.data)
        localStorage.setItem('userInfo', loginMutation.data)  
        navigate('/')
      } else {
        throw new Error('Invalid Credentials')
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <div className='w-100 '>
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
      </form>

    </div>
  )
}

export default LoginForm
