import React from 'react'
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

const LoginForm = () => {
  return (
    <div className='w-100 '>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input id='email' placeholder='joe@mail.com' />
          </Field>
          <Field>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <Input id='password' type='password' placeholder='••••••••••'/>
          </Field>
          <Field>
            <Button type='submit'>Log In</Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}

export default LoginForm
