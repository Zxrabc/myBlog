import React, { useState } from 'react';
import { useNavigate,useRoutes,Outlet } from 'react-router-dom';
import routes from '../../routes'

import { GlobalOutlined } from '@ant-design/icons';
import { Menu,Input, Space,Row,Col,Card } from 'antd';

import Mysearch from '../myComponents/MySearch';
import Chart from '../Chart'

import img from '../../source/img/home.jpg'


const { Search } = Input;


const items = [
  {
    label: '江理博客',
    key: 'icon',
    icon: <GlobalOutlined />,
    disabled: true,
  },
  {
    label: '首页',
    key: 'home',
  },
  {
    label: '后台管理',
    key: 'manager',
  },
  // {
  //   label:(
  //       <Mysearch/>
  //   ),
  //   key: 'search',
  // }
];

const Home = () => {
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate();
  const element = useRoutes(routes)

  const onClick = (e) => {
    if(e.key != 'search')
        {
            navigate('/' + e.key) // 跳转到对应的路由地址
            setCurrent(e.key);
        }
  };
  return (
    <div>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} theme='dark' 
        style={{height:'50px',position:'fixed',top:'0',width:'100%',zIndex:'100'}}/>
        <div style={{height:'300px',textAlign:'center',marginTop:'50px'}}>
            {/* <img src="https://ncgwh.jxust.edu.cn/__local/D/51/47/D3226700B42A7EDAB81E522DE9D_53B820E0_9D57.jpg" style={{width:window.innerWidth,height:'300px'}}/> */}
            <img src={require('../../source/img/home.jpg')} style={{width:window.innerWidth,height:'300px'}}/>
        </div>
        <div>
        <Row style={{width:'900px',margin:'0 auto'}}>
            <Col span={16}>
                <Outlet/>
            </Col>
            <Col span={8} style={{paddingLeft:'50px'}}>
              <Chart></Chart>
            </Col>
        </Row>
        </div>
    </div>    
  )
};
export default Home;