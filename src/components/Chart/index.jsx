import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Card } from 'antd';

import instance from '../../service/requert';

import MyIcon_Sort from '../myComponents/MyIcon_Sort';
import { errorContentArray } from '../../source/constant'

const cardBodyCss = {
  padding:'0px',
  backgroundColor:'red',
}

const Chart = () => {

  const navigator = useNavigate()
  const [loading,setLoading]  = useState(true)

  const [contentArray,setContentArray] = useState([{
    id:'1',
    title:'加载中…………',
  }])

  const clickContent = (item) => {
    // 点击文章跳转到文章详情页
    navigator('/home/content/details',{state:{item}})
}

  useEffect(() => {
    instance({
      url:'/blog/chart',
      method: 'get'
    }).then(res => {
      // 将返回结果赋给contentArray
      contentArray.splice(0, contentArray.length)
      setContentArray(res.data)
      setLoading(false)
      }, error => {
        setContentArray(errorContentArray.slice(0,10))
        setLoading(false)
      }
    )
  },[])

  return (
    <div>
      <Card
        title="热度榜单"
        style={{
          width: 300,
          padding:0,
        }}
        loading={loading}
        hoverable={true}
      >
        {
          contentArray.map((item, index) => {
            return (
              <p key={index}>
                <MyIcon_Sort content={index + 1} color={index > 2 ? 'darkgray' : 'red'} show={item.title != '服务器出错啦' && item.title != '加载中…………'}/>
                <a onClick={() => {clickContent(item)}}>{item.title}</a>
              </p>
            )
          })
        }
      </Card>
    </div>
  )
}

export default Chart;
