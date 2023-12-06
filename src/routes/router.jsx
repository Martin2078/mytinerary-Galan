import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Cities from "../pages/Cities";
import Layout from "../layouts/Layout";
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'
import City from "../pages/City";
import MyTineraries from "../pages/MyTineraries";
import CommentForm from "../pages/CommentForm";
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
                path:'/Cities/:id/:top',
                element:<City/>
            },
            {
                path:'/SignIn',
                element:<SignIn/>
            },
            {
                path:'/Register',
                element:<Register/>
            },
            {
                path:'/MyTineraries',
                element:<MyTineraries/>
            },
            {
                path:'/CommentForm/:id/:top',
                element:<CommentForm/>
            },
            
        ]
    }
])

export default router