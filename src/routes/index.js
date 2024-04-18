import Home from '../components/Home'
import Login from '../components/Login'
import Manager from '../components/Manager'
import Content from '../components/Content'
import All from '../components/Content/All'
import Details from '../components/Content/Details'
import Console from '../components/Manager/Console'
import Self from '../components/Manager/Self'
import Blog_add from '../components/Manager/Blog_add'
import Blog_list from '../components/Manager/Blog_list'
import Blog_modify from '../components/Manager/Blog_modify'
import Category_list from '../components/Manager/Category_list'
import Label_list from '../components/Manager/Label_list'
import {Navigate} from 'react-router-dom'

const routes = [
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/manager',
        element:<Manager/>,
        children:[
            {
                path:'console',
                element:<Console/>,
            },
            {
                path:'self',
                element:<Self/>,
            },
            {   
                path:'blog_add',
                element:<Blog_add/>,
            },
            {
                path:'blog_list',
                element:<Blog_list/>,
            },
            {
                path:'blog_modify',
                element:<Blog_modify/>,
            },
            {
                path:'category_list',
                element:<Category_list/>,
            },
            {
                path:'label_list',
                element:<Label_list/>,
            },
            {
                path:'',
                element:<Navigate to="console"/>
            }
        ]
    },
    {
        path:'/home',
        element:<Home/>,
        children:[
            {
                path:'content',
                element:<Content/>,
                children:[
                    {
                        path:'all',
                        element:<All/>
                    },
                    {
                        path:'details',
                        element:<Details/>
                    },
                    {
                        path:'',
                        element:<Navigate to="all"/>
                    }
                ]
            },
            {
                path:'',
                element:<Navigate to="content"/>
            }
        ]
    },
    {
        path:'/',
        element:<Navigate to="/home"/>
    }
]
export default routes;