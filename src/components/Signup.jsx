import { Button,TextField } from '@mui/material'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Formik } from 'formik'
import React from 'react'
import * as yup from "yup"
import { auth,db } from './firebase'
import { doc,setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Google } from '@mui/icons-material'
import { GoogleAuthProvider } from 'firebase/auth'
// import 
const Signup = () => {
    const handleGoogleSignin=()=>{
        const signup=new GoogleAuthProvider()
        signInWithPopup(auth,signup).then(async(result)=>{
            console.log(result)
            toast.success("signup successfull")
        })

    }
  return (
    <div  className='flex flex-col justify-center items-center w-full h-[100vh] mt-3 gap-2' >
      <Formik 
      initialValues={{email:"",password:"",name:""}} 
      validationSchema={yup.object().shape({
        email:yup.string()
        .email("enter a valid email")
        .required("email is required"),
        name:yup.string()
        .max(30,"Name should be less than 25 character")
        .required("name is required"),
        password:yup.string()
        .min(6,"password should be greater than 6 characters")
        .required("password is required")
      })}
      onSubmit={async(values)=>{
        try{
            await createUserWithEmailAndPassword(auth,values.email,values.password)
            const user=auth.currentUser;
            if(user){
               await setDoc(doc(db,"Users",user.uid),{
                email:values.email,
                name:values.name,
                password:values.password
               })
            }
            toast.success(`${values.name} your registration is successfull`)
        }catch(e){
            console.log(e)
            toast.error(e.message)
        }
      }}
      >
        {
            formik=>(
                <form onSubmit={formik.handleSubmit} className='w-[90%] md:w-[80%] flex border flex-col p-4 gap-4 shadow-lg'>
                    <TextField 
                    label="name"
                    name='name' 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    error={formik.touched.name&&Boolean(formik.errors.name)}
                    helperText={formik.touched.name&&formik.errors.name}
                    />
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
                    <Button type='submit' color='primary' size='medium' variant='contained' >Signup</Button>
                </form>
            )
        }
      </Formik>
      <div className='text-sm font-bold'>--------OR---------</div>
    <Button className='m-2 w-[300px]' variant='contained' size='large' color='primary' startIcon={<Google/>} onClick={handleGoogleSignin}>Sign In With Google</Button>
    </div>
  )
}

export default Signup
