import React,{ useMemo } from 'react'
import { Button,  Form, Input,Spin,message } from 'antd';
import { useNavigate } from 'react-router-dom';
import instance from '../../service/requert'

// 引入connect
import { connect } from 'react-redux';

import { loginOrExit } from '../../redux/actions/login';


const Login = (props) => {

    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);

    const [messageApi, contextHolder] = message.useMessage();


    // 监听是否登录，已登录则跳转到主界面
    React.useEffect(() => {
        // 使用sessionStorage来判断是否登录
        if(window.sessionStorage.getItem('isLogin')){
            navigate('/manager/console')
        }
        
        // 使用localStorage来判断是否登录
        // if(props.isLogin){
        //     navigate('/manager/console')
        // }
    },[props.isLogin])
    const login = (data) => {
        setLoading(true)
        instance({
            url:'/login',
            method:'post',
            data:{
                username:data.username,
                password:data.password
            }
        }).then(res=>{
            setLoading(false)
            if(res.data.data){
                // props.loginOrExit(true)
                window.sessionStorage.setItem('isLogin','true')
                navigate('/manager/console')
            }
            else{
                messageApi.open({
                    type: 'error',
                    content: res.data.message,
                    duration: 1,
                })
            }
        },error => {
            setLoading(false)
            messageApi.open({
                type: 'error',
                content: '服务器出错！',
                duration: 1,
            });
        })
    }

  return (
    <Spin spinning={loading} tip="登录中…………" >
        {contextHolder}
        <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            margin: 'auto',
            marginTop:'50px',
            border:'5px solid #ccc',
            padding:'20px',
            borderRadius:'10px',
            }}
            initialValues={{
            remember: true,
            }}
            autoComplete="off"
            onFinish={login}
        >
        <Form.Item
        wrapperCol={{
            offset: 8,
            span: 16,
        }}
        style={{
        }}
        >
        <h3>管理员登录</h3>
        </Form.Item>
        <Form.Item
        label="用户名："
        name="username"
        rules={[
            {
            required: true,
            message: '请输入用户名！',
            },
        ]}
        >
        <Input/>
        </Form.Item>

        <Form.Item
        label="密码："
        name="password"
        rules={[
            {
            required: true,
            message: '请输入密码！',
            },
        ]}
        >
        <Input.Password/>
        </Form.Item>

        <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
            offset: 8,
            span: 16,
        }}
        style={{
            marginTop:'-30px',
            }}
        >
        <a href="" style={{fontSize:'8px'}} onClick={()=>{alert("功能开发中…………")}}>忘记密码？点击找回密码</a>
        </Form.Item>

        <Form.Item
        wrapperCol={{
            offset: 8,
            span: 16,
        }}
        >
        <Button type="primary" htmlType="submit">
            登录
        </Button>
        </Form.Item>
    </Form>
  </Spin>
  )
}

export default connect(
    state => ({isLogin:state.login.isLogin}),
    {
        loginOrExit:loginOrExit
    }
)(Login)
