import React, { useEffect,useState } from 'react'
import { useLocation,useNavigate,Outlet,useRoutes } from 'react-router-dom'

import { message } from 'antd';

import routes from '../../routes';
import instance from '../../service/requert'
import { errorContentArray } from '../../source/constant'

const Content = () => {
    const element = useRoutes(routes)

    // 接收state参数,为''或搜索的内容
    const search = useLocation().state == null ? '' : useLocation().state.search
    const navigator = useNavigate()
    return (
        <div>
            <Outlet></Outlet>
        </div>
    )
}
export default Content
