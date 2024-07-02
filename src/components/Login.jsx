import { Button, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Formik } from 'formik'
import React from 'react'
import * as yup from "yup"
import { auth } from './firebase'
import { toast } from 'react-toastify'
const Login = () => {
  return (
    <div  className='flex justify-center items-center w-full h-[100vh] mt-3' >
      <Formik 
      initialValues={{email:"",password:""}} 
      validationSchema={yup.object().shape({
        email:yup.string()
        .email("enter a valid email")
        .required("email is required"),
        password:yup.string()
        .min(6,"password should be greater than 6 characters")
        .required("password is required")
      })}
      onSubmit={async(values)=>{
        try{
            await signInWithEmailAndPassword(auth,values.email,values.password)
            const user=auth.currentUser
            console.log(user)
            toast.success("login successfull")
        }catch(e){
            toast.error(e.message)
        }
      }}
      >
        {
            formik=>(
                <form onSubmit={formik.handleSubmit} className='w-[90%] md:w-[80%] flex border flex-col p-4 gap-4 shadow-lg'>
                    <TextField 
                    label="email"
                    name='email' 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email&&Boolean(formik.errors.email)}
                    helperText={formik.touched.email&&formik.errors.email}
                    />
                    <TextField 
                    label="password"
                    name='password' 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.touched.password&&Boolean(formik.errors.password)}
                    helperText={formik.touched.password&&formik.errors.password}
                    />
                    <Button type='submit' color='primary' size='medium' variant='contained' >Login</Button>
                </form>
            )
        }
      </Formik>
    </div>
  )
}

export default Login
