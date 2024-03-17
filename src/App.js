import React from 'react'
import Home from './Components/Home/Home'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Header from './Components/Header/Header'
// import Categories from './Components/Dashboard/Dashboard'
import Dashboard from './Components/Dashboard/Dashboard'
import Layout from './Components/Layout/Layout'
import SignUp from './Components/Sign up/SignUp'
import Login from './Components/Login/Login'
import Auth from './Components/Sign up/Auth'
import AuthSignup from './Components/Sign up/AuthSignup'

export default function App() {
  const router = createBrowserRouter([
    {path:'',element:<Layout/> , children:[
      {path:'',element:<Home/>},
      {path:'/dashboard',element:<Dashboard/>},
      {path:'/register',element:<SignUp/>},
      {path:'/login',element:<Login/>},
      {path:'/Auth',element:<Auth/>},
      {path:'/AuthSignup',element:<AuthSignup/>},
    ]},
  ])
  return (
    <RouterProvider router={router}/>
  )
}

