import React from 'react'
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
const RegisterComponent = () => {
  return (
    <div>
      <Card color="transparent" shadow={false} className='flex flex-col justify-center items-center'>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
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
          />
        </div>
        <Button className="mt-6" fullWidth>
          Register
        </Button>
      </form>
    </Card>
    </div>
  )
}

export default RegisterComponent
