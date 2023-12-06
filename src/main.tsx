import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import Login from "./components/Login.tsx"
import Account from "./components/Account.tsx"
import StoreCookie from './components/StoreCookie.tsx'
import SignUp from './components/SignUp.tsx'
import CreateAPI from './components/CreateAPI.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {path: "/", element: <Account />},
  {path: "/login", element: <Login />},
  {path: "/StoreCookie", element: <StoreCookie />},
  {path: "/SignUp", element: <SignUp />},
  {path: "/CreateAPI", element: <CreateAPI />},
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
