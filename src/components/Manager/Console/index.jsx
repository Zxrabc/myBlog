import React from 'react'
import { useNavigate } from 'react-router-dom';

import {Button} from 'antd'

const Console = () => {
  const navigate = useNavigate();

  const exit = () => {
    sessionStorage.removeItem('isLogin');
    navigate('/home/content')
  }

  return (
    <div>
      <Button onClick={exit}>退出登录</Button>
    </div>
  )
}


export default Console;
