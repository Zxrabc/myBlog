import React, { useState,useEffect } from 'react';
import { Button, Table, Tooltip, message } from 'antd';

import instance from '../../../service/requert';

import { errorContentArray } from '../../../source/constant'

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    fixed: 'left',
    width: '20%',
  },
  {
    title: '标题名',
    dataIndex: 'title',
    fixed: 'left',
    width: '20%',
  },
  {
    title: '浏览量',
    dataIndex: 'hot',
    width: '10%',
    sorter: (a, b) => a.hot - b.hot,
    showSorterTooltip: {
      title: '点击升序'
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: '15%',
  },
  {
    title: '所属分类',
    dataIndex: 'category',
    width: '10%',
  },
  {
    title: '标签',
    dataIndex: 'tag',
    width: '20%',
  },
  {
    title: '文章内容',
    dataIndex: 'content',
    width: '50%',
    ellipsis: true,
  },
];

errorContentArray.map((item, index) => {
  item.key = item.id
})
const Blog_list = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data,setData] = useState([])
  const [columns1, setColumns1] = useState(columns)
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dele = () => {
    setLoading(true);

    // 发送请求删除博客
    // instance({
    //   url:'/blog/delete',
    //   method:'post',
    //   data:{
    //     id:selectedRowKeys
    //   }
    // }).then(res => {
    //   // 将返回的新的博客列表赋值给data
    //   const newData = res.data
    //   newData.map(item => item.key = item.id)
    //   setData(newData)
    //   messageApi.open({
    //     type: 'success',
    //     content: '删除博客成功',
    //     duration: 1,
    //   })
    // setSelectedRowKeys([])
    //   setLoading(false)
    // },error => {
    //   messageApi.open({
    //     type:'error',
    //     content: '服务器出错啦',
    //     duration: 1,
    //   })
    //   setLoading(false)
    // })

    // 前端模拟删除博客
    setData(data.filter(item => selectedRowKeys.indexOf(item.key) < 0))
    messageApi.open({
      type: 'success',
      content: '删除博客成功',
      duration: 1,
    })
    setSelectedRowKeys([])
    setLoading(false)
  };
  
  // 挂载前向服务器请求全部文章数据
  useEffect(() => {
    // componentDidMount钩子
    // 此处发出请求,请求全部的文章数据
    instance({
      url: '/blog/all',
      method: 'get'
    })
      .then(res => {
        // 将请求的文章数据赋给data同时加上key属性
        const newData = res.data.map(item => item.key = item.id)
        setData(newData)
      }, error => {
        messageApi.open({
          type: 'error',
          content: '服务器出错！',
          duration: 1,
        });
        setData(errorContentArray)
      })
  },[])


  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const onChange = (pagination, filters, sorter, extra) => {
    const array = ['点击升序', '点击降序', '取消排序']
    columns.map(item => {
      if (item.dataIndex == sorter.field) {
        const index = array.indexOf(item.showSorterTooltip.title) == 2 ? 0 : array.indexOf(item.showSorterTooltip.title) + 1
        item.showSorterTooltip = { title: array[index] }
        return
      }
      item.showSorterTooltip = { title: '点击升序' }
    })
    setColumns1([...columns])
  }


  return (
    <div>
      {contextHolder}
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={dele} disabled={!hasSelected} loading={loading} size='mini' style={{marginTop:'30px'}}>
          删除所选博客
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `选择 ${selectedRowKeys.length} 项` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns1} dataSource={data} size='small' scroll={{ x: 1300 }} onChange={onChange} />
    </div>
  );
};
export default Blog_list;