import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Menu,Input, Space } from 'antd';

const { Search } = Input;

const Mysearch = (value) => {

    const navigate = useNavigate();

    function onSearch(value) {
        console.log('即将跳转，传递的参数是：',value)
        navigate('/home/content/all',{state:{search:value}})
    }

    return (
        < Search
            placeholder="请输入内容…………"
            allowClear
            enterButton="搜索"
            size="mini"
            style={{ margin:'10px 0',transform:'translateX(50%)' }}
            onSearch={onSearch}
        />
    )
}
export default Mysearch
