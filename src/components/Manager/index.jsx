import React,{useState} from 'react'
import { useNavigate,useRoutes,Outlet} from 'react-router-dom';
import routes from '../../routes'

// 引入connect
import { connect } from 'react-redux';

import { AppstoreOutlined, MailOutlined, SettingOutlined,GlobalOutlined } from '@ant-design/icons';
import { Menu,Input, Space,Row,Col,Card } from 'antd';

import { loginOrExit } from '../../redux/actions/login';


function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

const items_horizontal = [
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
    }
  ];

const items_inline = [
  getItem('控制台', 'console', <MailOutlined />, [
    getItem('控制台', 'console', null),
    getItem('个人中心','self',null)
  ]),
  {
    type: 'divider',
  },
  getItem('博客管理', 'blog', <SettingOutlined />, [
    getItem('博客列表', 'blog_list'),
    getItem('发布博客', 'blog_add'),
    getItem('修改博客', 'blog_modify'),
  ]),
  getItem('分类管理', 'category_list', <SettingOutlined />),
  getItem('标签管理', 'label_list', <SettingOutlined />),
];


const Manager = (props) => {

    const [current, setCurrent] = useState('manager');
    const [current_inline,setCurrent_inline] = useState('console')
    const navigate = useNavigate();
    const element = useRoutes(routes)
  
    const onClick = (e) => {
      if(e.key != 'search')
          {
              navigate('/' + e.key) // 跳转到对应的路由地址
              setCurrent(e.key);
          }
    };

    const onClick_inline = (e) => {
        navigate(e.key)
        setCurrent_inline(e.key)
    }


    function check_isLogin(){
      // 使用localStorage记录是否登录
      // if(!props.isLogin){
      //     navigate('/login')
      // }
      
      // 使用sessionStorage记录是否登录
      if(!window.sessionStorage.getItem('isLogin')){
          navigate('/login')
      }
    }
    
    // 判断是否登录，未登录则返回登录界面
    React.useEffect(() => {
      check_isLogin()
      return check_isLogin()
    },[props.isLogin])

    return(
        <div>
            {/* 水平导航 */}
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items_horizontal} theme='dark' 
            style={{height:'50px',position:'fixed',top:'0',width:'100%',zIndex:'100'}}/>
            {/* 垂直导航 */}
            
            <Row style={{marginTop:'50px'}}>
                <Col span={4}>
                <Menu
                    current = {current_inline}
                    setCurrent = {setCurrent_inline}
                    onClick={onClick_inline}
                    style={{
                        width: '100%',
                        height:'100%',
                    }}
                    defaultSelectedKeys={['console']}
                    defaultOpenKeys={['console']}
                    mode="inline"
                    items={items_inline}
                />
                </Col>
                <Col span={20}>
                    <Outlet></Outlet>
                </Col>
            </Row>
        </div>
    )
}

export default connect(
    state => ({isLogin:state.login.isLogin}),
    {
        loginOrExit:loginOrExit
    }
)(Manager)
