
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Register and login

import VisitorTracking from "./components/Security/Visitor Tracking/VisitorTracking";
import EmergencyManagement from "./components/Security/EmergencyManagement/EmergencyManagemnt";
import Login from "./components/Login/Login";




const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
     
 children:[

   
   {
     path: "/",
     element: <VisitorTracking />,
    },
    {
      path: "/VisitorTracking",
      element: <VisitorTracking />,
     }
     ,{
      path: "/EmergencyManagement",
      element: <EmergencyManagement />,
    }

  ]
  
     
    
  },

   {
     path: "*",
     element: <h1>404 Page Not Found</h1>,
   },
   {
     path: "/login",
     element: <Login />,
   }


  ])


  return <RouterProvider router={router} />
}


export default App;