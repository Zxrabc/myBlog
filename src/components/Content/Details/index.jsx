import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { FloatButton,Tag } from 'antd';
import { RollbackOutlined } from '@ant-design/icons'

const colorArray = ['black', 'yellow', '#f50', 'darkgray', 'green', 'blue', 'purple', 'volcano', '#dddddd', '#87d068']

const Details = () => {
  const navigator = useNavigate()

  // 接收state参数,为''或搜索的内容
  const item = useLocation().state == null ? '' : useLocation().state.item

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{item.title}</h1>
      <div style={{textAlign:'center'}}>
      {
        item.tags.map(tag => {
          return (
            <Tag color={colorArray[tag.length % 10]}>{tag}</Tag>
          )
        })
      }
      </div>
      {
        item.content.split('\n').map((item, index) => {
          return <p key={index} style={{ textIndent: '2em' }}>{item}</p>
        })
      }
      <div style={{ fontSize: '10px',float:'left' }}>发布于 <span style={{ color: 'blue' }}>{item.createTime}</span></div>
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
