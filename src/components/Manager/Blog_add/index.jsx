import React, { useState,useEffect } from 'react';
import { Checkbox,DatePicker,Form,Input,Select,Button,message,Spin } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;

import instance from '../../../service/requert';

import { errorTagsArray,errorCategoryArray } from '../../../source/constant';

// 获取当前的日期:'yyyy-MM-DD'
const today = new Date();
const toDay = today.getFullYear() + '-' + ((today.getMonth() + 1) > 10 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1)) + '-'
 + (today.getDate() > 10 ? today.getDate() : '0' + today.getDate());
const CheckboxGroup = Checkbox.Group;


const Blog_add = () => {

  const [categoryOpts,setCategoryOpts] = useState([])
  const [tagOpts,setTagOpts] = useState([]);
  const [checkedTags,setCheckedTags] = useState([]);
  const [tagsFull,setTagsFull] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [publish_loading,setPublish_loading] = useState(false);

  // 发布文章
  const publish = (values) => {
    values.tags = checkedTags;
    values.createtime = dayjs(values.createtime).format(dateFormat);
    setPublish_loading(true);
    instance({
      url: '/blog/publish',
      method: 'post',
      data: values
    }).then(res => {
      if(res.data.data){
        messageApi.open({
          type: 'success',
          content: '发布成功！',
          duration: 1,
        })
      }
      else{
        messageApi.open({
          type: 'error',
          content: '发布失败！',
          duration: 1,
        })
     }
      setPublish_loading(false);
    },error => {
      messageApi.open({
        type: 'error',
        content: '服务器出错啦(发布博客)！',
        duration: 1,
      })
      setPublish_loading(false);
    })
  }

  // 标签选择更改事件
  const onChange_tags = (checkedValues) => {
    const newCheckedTags = checkedValues.target.checked ? [...checkedTags,checkedValues.target.value] : checkedTags.filter(item => item !== checkedValues.target.value);
    newCheckedTags.length >= maxCheckedTags ? setTagsFull(true) : setTagsFull(false);
    setCheckedTags(newCheckedTags);
  }

  // 设置标签的最大选择数
  const maxCheckedTags = 3;
  
  // 挂载前向服务器请求分类信息和标签信息
  useEffect(() => {
    // componentDidMount钩子
    // 此处发出请求,请求全部的分类信息和标签信息
    instance({
      url: '/tag/all',
      method: 'get'
    }).then(res => {
        const newData = res.data.data.map(item => {
          return {
            key: item.id,
            value: item.tagname
          }
        })
        setTagOpts(newData);
      }, error => {
        messageApi.open({
          type: 'error',
          content: '服务器出错啦(加载标签信息)！',
          duration: 2,
        });
        setTagOpts(errorTagsArray);
      })
    instance({
      url: '/category/all',
      method: 'get'
    }).then(res => {
      const newData = res.data.data.map(item => {
        return {label:item.categoryname,value:item.categoryname}
      })
      setCategoryOpts(newData);
    },error => {
      messageApi.open({
        type: 'error',
        content: '服务器出错啦(加载分类信息)！',
        duration: 2,
      });
      const newData = errorCategoryArray.map(item => {
        return {label:item,value:item}
      })
      setCategoryOpts(newData);
    })
  },[])

  return (
    <>
    <Spin spinning={publish_loading} tip="发布中…………" >
    {contextHolder}
      <Form
        size='small'
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
          margin:'20px auto'
        }}
        onFinish={publish}
      >
        <Form.Item label="标题" name='title'>
          <Input />
        </Form.Item>
        <Form.Item label="发布时间" name='createtime'>
          <DatePicker defaultValue={dayjs(toDay,dateFormat)} disabled={true}/>
        </Form.Item>
        <Form.Item label="所属分类" name='category'>
          <Select options={categoryOpts}></Select>
        </Form.Item>
        <Form.Item label="标签" name='tags'>
          {
            tagOpts.map( item => {
              return <Checkbox  value={item.value} key={item.key} onChange={onChange_tags} disabled={tagsFull && !checkedTags.includes(item.value)}>{item.value}</Checkbox>
            })
          }
          <span style={{fontSize:'8px',color:'#ed3434'}}>(最多可选{maxCheckedTags}个标签)</span>
        </Form.Item>
        <Form.Item label="文章内容" name='content'>
          <TextArea rows={10} />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" style={{margin:'auto'}}>
            发布
        </Button>
        </Form.Item>
      </Form>
      </Spin>
    </>
  );
};
export default Blog_add;