import React from 'react'
import LoginForm from '@/components/LoginForm'
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
 } from '@/components/ui/card'
 import { Button } from '@/components/ui/button'
 import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center w-full h-150'>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-center gap-1 text-center w-full">
            Don't have an account? Sign Up
            <Link to='/signup' className='underline'>here</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage
