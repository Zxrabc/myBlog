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

    var [contentArray,setContentArray] = useState([{id:'1',title:'加载中…………'}])
    const [messageApi, contextHolder] = message.useMessage();
    const navigator = useNavigate()

    useEffect(() => {
        // componentDidMount钩子
        // 根据接收到的state参数发出相应的请求
        if(search == ''){
            // 此处发出请求,请求全部的文章数据
            instance({
                url:'/blog/all',
                method:'get'
            })
            .then(res => {
                // 将请求的文章数据赋给contentArray
                setContentArray(res.data)
            },error => {
                messageApi.open({
                    type: 'error',
                    content: '服务器出错！',
                    duration: 1,
                });
                setContentArray(errorContentArray)
            })
        }
        else{
            // 此处发出请求,请求搜索的文章数据
            instance({
                url:'/blog/search?keyword='+search,
                method:'get',
            })
            .then(res => {
                // 将请求的文章数据赋给contentArray
                setContentArray(res.data)
            },error => {
                messageApi.open({
                    type: 'error',
                    content: '服务器出错！',
                    duration: 1,
                })
                setContentArray(errorContentArray)
        })}
    },[contentArray]) 

    const clickContent = (id) => {
        // 点击文章跳转到文章详情页
        navigator('/content',{state:{id:id}})
        // navigate('/home/content',{state:{search:value}})
    }

    return (
        <div>
            <Outlet></Outlet>
        </div>
    )
}
export default Content
