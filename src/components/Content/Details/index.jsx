import React ,{useEffect,useRef,useState }from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { FloatButton,Tag, message } from 'antd';
import { RollbackOutlined } from '@ant-design/icons'
import { throttle, debounce } from 'lodash';
import instance from '../../../service/requert';

const colorArray = ['black', 'yellow', '#f50', 'darkgray', 'green', 'blue', 'purple', 'volcano', '#dddddd', '#87d068']

const Details = () => {
  const navigator = useNavigate()
  const [state,setState] = useState({isBottom:false,timeFull:false,end:false})

  const stateRef = useRef(state)

  // 接收state参数,为''或搜索的内容
  const item = useLocation().state == null ? '' : useLocation().state.item

  const handleScroll = () => {
    if(window.scrollY + window.innerHeight + 10 >= document.documentElement.scrollHeight){
      stateRef.current = {...stateRef.current,isBottom:true}
      setState(stateRef.current)
    }
    if(stateRef.current.isBottom && stateRef.current.timeFull){
      console.log('浏览次数+1')
      // 发送请求
      instance({
        method:'post',
        url:'/blog/hot/add',
        data:item.id
      })
      stateRef.current = {...stateRef.current,end:true}
      setState(stateRef.current)
    }
  }

  const handle = () => {
    stateRef.current = {...stateRef.current,timeFull:true}
    setState(stateRef.current)
  }

  const throttleScroll =throttle(handleScroll,200)

  useEffect(() => {
    if(!state.end){
      window.addEventListener("scroll",throttleScroll)
      const timer = setTimeout(handle,5000)
    }
    else{
      window.removeEventListener("scroll",throttleScroll)
    }
    return () => {
      window.removeEventListener("scroll",throttleScroll)
    }
  },[state.end])

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{item.title}</h1>
      <div style={{textAlign:'center'}}>
      {
        item.tags.map((tag,index) => {
          return (
            <Tag color={colorArray[tag.length % 10]} key={index}>{tag}</Tag>
          )
        })
      }
      </div>
      <div>
      {
        item.content.split('\n').map((item, index) => {
          return <p key={index} style={{ textIndent: '2em' }}>{item}</p>
        })
      }
      </div>
      <div style={{ fontSize: '10px',float:'left' }}>发布于 <span style={{ color: 'blue' }}>{item.createtime}</span></div>
      <div style={{ fontSize: '10px', float: 'right', color: 'red' }}>浏览量：{item.hot}</div>
      <FloatButton.Group
        type="primary"
        style={{
          right: 300,
        }}
      >
        <FloatButton.BackTop />
        <FloatButton tooltip={<div>回退</div>} icon={<RollbackOutlined />} onClick={() => { navigator(-1) }} />
      </FloatButton.Group>
    </div>
  )
}

export default Details;
