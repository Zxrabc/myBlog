import React, { useState,useEffect } from 'react';
import { Checkbox,DatePicker,Form,Input,Select,Button,message,Spin } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;

import instance from '../../../service/requert';

import { errorTagsArray,errorCategoryArray,errorContentArray } from '../../../source/constant';

// 获取当前的日期:'yyyy-MM-DD'
const today = new Date();
const toDay = today.getFullYear() + '-' + ((today.getMonth() + 1) > 10 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1)) + '-'
 + (today.getDate() > 10 ? today.getDate() : '0' + today.getDate());
const CheckboxGroup = Checkbox.Group;


const Blog_modify = () => {

  const [categoryOpts,setCategoryOpts] = useState([])
  const [tagOpts,setTagOpts] = useState([]);
  const [idOpts,setIdOpts] = useState([])
  const [contentOpts,setContentOpts] = useState([])
  const [form] = Form.useForm();
  const [checkedTags,setCheckedTags] = useState([]);
  const [tagsFull,setTagsFull] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [modify_loading,setModify_loading] = useState(false);

  // id选择器不区分大小写
  const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  // 修改文章
  const modify = (values) => {
    values.edit_time = dayjs(values.edit_time).format(dateFormat);
    values.tags = checkedTags;
    setModify_loading(true);
    instance({
      url: '/blog/modify',
      method: 'post',
      data: values
    }).then(res => {
      messageApi.open({
        type: 'success',
        content: '修改成功！',
        duration: 1,
      })
      setModify_loading(false);
    },error => {
      messageApi.open({
        type: 'error',
        content: '修改失败！',
        duration: 1,
      })
      setModify_loading(false);
    })
  }

  // id选择框选择更改事件
  const onChange = (value) => {
    const newContentOpts = contentOpts.filter(item => item.id === value);
    setCheckedTags(newContentOpts[0].tags);
    newContentOpts[0].tags.length >= maxCheckedTags ? setTagsFull(true) : setTagsFull(false);
    form.setFieldValue('title',newContentOpts[0].title);
    form.setFieldValue('category',newContentOpts[0].category);
    form.setFieldValue('content',newContentOpts[0].content);
  }
  // 标签选择更改事件
  const onChange_tags = (checkedValues) => {
    const newCheckedTags = checkedValues.target.checked ? [...checkedTags,checkedValues.target.value] : checkedTags.filter(item => item !== checkedValues.target.value);
    newCheckedTags.length >= maxCheckedTags ? setTagsFull(true) : setTagsFull(false);
    setCheckedTags(newCheckedTags);
  }

  // 设置标签的最大选择数
  const maxCheckedTags = 3;
  
  // 挂载前向服务器请求分类信息和标签信息和博客信息
  useEffect(() => {
    // componentDidMount钩子
    // 请求全部的标签信息
    instance({
      url: '/tag/all',
      method: 'get'
    }).then(res => {
        setTagOpts(res.data);
      }, error => {
        messageApi.open({
          type: 'error',
          content: '标签信息加载失败！',
          duration: 2,
        });
        setTagOpts(errorTagsArray);
      })
    // 请求全部的分类信息
    instance({
      url: '/category/all',
      method: 'get'
    }).then(res => {
      setCategoryOpts(res.data);
    },error => {
      messageApi.open({
        type: 'error',
        content: '分类信息加载失败！',
        duration: 2,
      });
      const newData = errorCategoryArray.map(item => {
        return {label:item,value:item}
      })
      setCategoryOpts(newData);
    })
    // 请求全部的博客信息
    instance({
      url: '/blog/all',
      method: 'get'
    }).then(res => {
      setContentOpts(res.data);
      setIdOpts(res.data.map(item => item.id))
    },error => {
      messageApi.open({
        type: 'error',
        content: '博客信息加载失败！',
        duration: 2,
      })
      setContentOpts(errorContentArray);
      setIdOpts(errorContentArray.map(item => item.id))
    })
  },[])

  return (
    <>
    <Spin spinning={modify_loading} tip="提交中…………" >
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
        onFinish={modify}
        form={form}
      >
        <Form.Item label='编号' name='id'>
        <Select
          showSearch
          placeholder="输入编号"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={filterOption}
          options={idOpts.map(item => {
            return {label:item,value:item}
          })}
        />
        </Form.Item>
        <Form.Item label="标题" name='title' >
          <Input/>
        </Form.Item>
        <Form.Item label="修改时间" name='edit_time'>
          <DatePicker defaultValue={dayjs(toDay,dateFormat)} disabled={true}/>
        </Form.Item>
        <Form.Item label="所属分类" name='category'>
          <Select options={categoryOpts}></Select>
        </Form.Item>
        <Form.Item label="标签" name='tags'>
          {
            tagOpts.map( item => {
              return <Checkbox value={item} key={item} onChange={onChange_tags} disabled={tagsFull && !checkedTags.includes(item)} checked={ checkedTags.includes(item)}>{item}</Checkbox>
            })
          }
          <span style={{fontSize:'8px',color:'#ed3434'}}>(最多可选{maxCheckedTags}个标签)</span>
        </Form.Item>
        <Form.Item label="文章内容" name='content'>
          <TextArea rows={10} />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" style={{margin:'auto'}}>
            修改
        </Button>
        </Form.Item>
      </Form>
      </Spin>
    </>
  );
};
export default Blog_modify;