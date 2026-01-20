import {useEffect, useState} from 'react'
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
  CardAction
} from '@/components/ui/card'
import { 
  Field,
  FieldSet,
  FieldTitle,
  FieldContent
} from '@/components/ui/field'
import { 
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores/userStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditProfilePage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const user = useUserStore((state) => state.user)
  const updateSavedUser = useUserStore((state) => state.updateUserDetails)

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')

  const updateUserDetails = async (newDetails) => {
    const res = await axios.put(`/api/users/profile`, newDetails)
    console.log(res)
    queryClient.invalidateQueries()
    navigate('/')
    return res.data
  }

  const updateUserDetailsMutation = useMutation({
    mutationFn: updateUserDetails
  })

  const deleteUser = async () => {
    const res = await axios.delete('/api/users/profile')
    queryClient.invalidateQueries()
    navigate('/logout')
    return res.data
  }

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser
  })

  const handleSave = () => {
    let newDetails = {}
    if(password !== ''){
      newDetails = {
        name,
        email,
        password
      }
    } else {
      newDetails = {
        name,
        email
      }
    }
    const updatedDetails = updateUserDetailsMutation.mutate(newDetails)
    // updateSavedUser(updatedDetails)
  }
  useEffect(() => {
    if(updateUserDetailsMutation.status === 'success'){
      updateSavedUser(updateUserDetailsMutation.data)
      localStorage.setItem('userInfo', JSON.stringify(updateUserDetailsMutation.data))
    }
  }, [updateUserDetailsMutation])

  return (
    <div className='w-full h-150 flex flex-col gap-4 items-start justify-start lg:px-64 xl:px-128'>
      <Card className={'w-full'}>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Enter new details to update your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <Field>
              <FieldTitle>
                Name
              </FieldTitle>
              <FieldContent>
                <Input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldTitle>
                Email
              </FieldTitle>
              <FieldContent>
                <Input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldTitle>
                Password
              </FieldTitle>
              <FieldContent>
                <Input 
                  value={password}
                  type={'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={'••••••••••'}
                />
              </FieldContent>
            </Field>
          </FieldSet>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-center gap-8 w-full">
            <Button className={'w-36'} onClick={handleSave}>Save</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive' className={'w-36'}>Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete user?</AlertDialogTitle>
                  <AlertDialogDescription>Are you sure you want to delete your account and all it's data? This action cannot be undone </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={(e) => deleteUserMutation.mutate()}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EditProfilePage
