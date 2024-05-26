import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Contact from './pages/Contact.jsx'
import SignupPage from './pages/SignupPage.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '',
        element: <HomePage/>,
      },
      {
        path: '/signup',
        element: <SignupPage/>,
      },
      {
        path: '/contact',
        element: <Contact/>,
      },
    ],
  },

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
