import React, { useState, useEffect } from 'react';
import { Button, Table, Tooltip, message, Form, Input, InputNumber, Popconfirm, Typography, Col, Row } from 'antd';

import instance from '../../../service/requert';

import { errorCategoryArray } from '../../../source/constant'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


const Category_list = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const [add_value, setAdd_value] = useState('')

  const columns = [
    {
      title: '分类名',
      dataIndex: 'value',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key, record.value)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onClick={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            修改
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // 挂载前向服务器请求全部分类数据
  useEffect(() => {
    // componentDidMount钩子
    // 此处发出请求,请求全部的分类数据
    instance({
      url: '/category/all',
      method: 'get'
    }).then(res => {
        // 将请求的分类数据赋给data同时加上key属性
        const newData = res.data.data.map((item, index) => {
          return {
            key: item.id,
            value: item.categoryname
          }
        })
        setData(newData)
      }, error => {
        messageApi.open({
          type: 'error',
          content: '服务器出错啦(查询所有分类)！',
          duration: 1,
        });
      })
  }, [])

  // 编辑按钮的点击事件
  const edit = (record) => {
    form.setFieldsValue({
      value: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  //编辑后取消按钮的点击事件
  const cancel = () => {
    setEditingKey('');
  };
  // 编辑后保存按钮的点击事件
  const save = async (key, value) => {
    // row为修改后的值
    const row = await form.validateFields();
    // 发送请求修改分类名
    instance({
      url: '/category/update',
      method: 'post',
      data: {
        id:key,
        categoryname: row.value
      }
      }).then(res => {
        if(res.data.data){
          // 修改data
          const newData = [...data];
          const index = newData.findIndex((item) => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setData(newData);
            setEditingKey('');
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
          }
        }
        else{
          // 修改失败，提示信息
          messageApi.open({
            type: 'error',
            content: '分类名不合法!',
            duration: 1,
          })
        }
    }, error => {
      messageApi.open({
        type: 'error',
        content: '服务器出错啦(修改分类名)',
        duration: 1,
      })
      setEditingKey('')
    })
  };
  // 删除分类按钮的点击事件
  const dele = () => {
    setLoading(true);

    // 发送请求删除分类
    instance({
      url:'/category/delete',
      method:'post',
      data:selectedRowKeys
    }).then(res => {
      if(res.data.data == true){
        // 删除成功，更新data
        messageApi.open({
          type: 'success',
          content: '删除分类成功',
          duration: 1,
        })
        const newData = data.filter(item => selectedRowKeys.indexOf(item.key) < 0)
        setData(newData)
      }
      else if(res.data.code == "998"){
        messageApi.open({
          type: 'error',
          content: "'" + res.data.data +  "'分类下存在博客，无法删除",
          duration: 1,
        })
      }
      else{
        // 删除失败，提示信息
        messageApi.open({
          type: 'error',
          content: '删除分类失败',
          duration: 1,
        })
      }
      setLoading(false)
    },error => {
      messageApi.open({
        type:'error',
        content: '服务器出错啦(删除分类)',
        duration: 1,
      })
      setLoading(false)
    })
  };
  // 添加分类按钮的点击事件
  const category_add = () => {
    // 发送请求添加分类
    instance({
      url: '/category/add',
      method: 'post',
      data: {
        categoryname: add_value
      }
    }).then(res => {
      if(res.data.data == true){
        // 添加成功，请求添加分类id
        instance({
          url: '/category/getId',
          method: 'post',
          data: {
            categoryname: add_value
          }
        }).then(res => {
          messageApi.open({
            type: 'success',
            content: '添加分类成功',
            duration: 1,
          })
          const newData = [...data];
          newData.unshift({
            key: res.data.data,
            value: add_value
          })
          setData(newData)
          setAdd_value('')
        },error => {
          messageApi.open({
            type: 'error',
            content: '请求分类id失败',
            duration: 1,
          })
        })
      }
      else if(res.data.code == "997"){
        messageApi.open({
          type: 'error',
          content: `分类'` + add_value + `'` + '已存在',
          duration: 1,
        })
      }
      else{
        // 添加失败，提示信息
        messageApi.open({
          type: 'error',
          content: '添加分类失败',
          duration: 1,
        })
      }
    },error => {
      messageApi.open({
        type: 'error',
        content: '服务器出错啦(添加分类)',
        duration: 1,
      })

    })
  }

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      {contextHolder}
      <Form form={form} component={false}>
        <Row>
          <Col span={8} >
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <Button type="primary" onClick={dele} disabled={!hasSelected} loading={loading} size='mini' style={{ marginTop: '30px' }}>
                删除所选分类
              </Button>
              <span
                style={{
                  marginLeft: 8,
                }}
              >
                {hasSelected ? `选择 ${selectedRowKeys.length} 项` : ''}
              </span>
            </div>
          </Col>
          <Col span={16}>
            <Input size='middle' style={{ margin: '30px 10px 0 30px', width: '200px' }} value={add_value} onChange={(e) => setAdd_value(e.target.value)} placeholder={'请输入分类名'}></Input>
            <Button onClick={category_add}>添加</Button>
          </Col>
        </Row>
        <Table
          rowSelection={rowSelection} columns={mergedColumns} dataSource={data} size='small'
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};
export default Category_list;