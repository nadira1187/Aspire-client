
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
import AddTask from './components/AddTask/AddTask';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
      },
      {
        path:"/addtask",
        element:<PrivateRoute><AddTask></AddTask></PrivateRoute> 
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router} />
    </DndProvider>
  </AuthProvider>,
);

