import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import  Root  from './components/root/Root';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import UserDashboard from './components/UserDashboard/UserDashboard';
import PrivateRoute from './components/privateroute/PrivateRoute';
import AuthProvider from './components/provider/AuthProvider';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
        path:"/dashboard",
        element:<PrivateRoute><UserDashboard></UserDashboard></PrivateRoute> 
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
       
  </React.StrictMode>,
)
