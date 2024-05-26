import React from 'react'

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import LoginComponent from '../components/LoginComponent';

const AuthPage = () => {
  return (
    <div className=' max-w-2xl flex flex-col mx-auto'>
      <Tabs value="login">
        <TabsHeader>
          <Tab value="login">Login</Tab>
          <Tab value="register">Register</Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value={"login"}><LoginComponent /></TabPanel>
        </TabsBody>
      </Tabs>

    </div>
  )
}

export default AuthPage
