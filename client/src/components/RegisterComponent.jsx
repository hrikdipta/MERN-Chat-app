import React, { useState } from 'react'
import {
    Card,
    Input,
    Button,
    Typography,
    Spinner
  } from "@material-tailwind/react";
  import {useNavigate} from 'react-router-dom';
  import { useSelector,useDispatch } from 'react-redux';
  import {signInSuccess} from '../redux/User/userSlice' 
const RegisterComponent = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [formData,setFormData]=useState({name:'',email:'',password:''});
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!formData.name||!formData.email||!formData.password){
            setError('Please fill all the fields');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const res=await fetch('/api/auth/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            });
            const data=await res.json();
            if(!res.ok){
                setError(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            dispatch(signInSuccess(data))
            navigate('/chat');
        } catch (error) {
            setError('Something went wrong');
            setLoading(false);
        }
    }
  return (
    <div>
      <Card color="transparent" shadow={false} className='flex flex-col justify-center items-center'>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <Typography variant="h4" color="blue-gray">
            Register
        </Typography>
        <Typography color="gray" className="mt-1 mb-3 font-normal ">
          Nice to meet you! Enter your details to Register.
        </Typography>

        <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
            </Typography>
            <Input
                size="lg"
                placeholder="John Doe"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                className: "before:content-none after:content-none",
                }}
                name='name'
                onChange={(e)=>{setFormData({...formData,name:e.target.value})}}
            />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name='email'
            onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name='password'
            onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
          />
        </div>
        <Button type='submit' className="mt-6 text-center flex justify-center" fullWidth disabled={loading} >
          {
                loading?<Spinner />:'Register'
          }
        </Button>
      </form>
      {
            error&&<Typography color='red'>{error}</Typography>
      }
    </Card>
    </div>
  )
}

export default RegisterComponent
