import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Cities from "../pages/Cities";
import Layout from "../layouts/layout";
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'
const router=createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/Cities',
                element:<Cities/>
            },
            {
                path:'/SignIn',
                element:<SignIn/>
            },
            {
                path:'/Register',
                element:<Register/>
            },
        ]
    }
])

export default router