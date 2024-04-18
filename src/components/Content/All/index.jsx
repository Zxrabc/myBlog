import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'

import { message, Tag, Row, Col, Pagination,Input } from 'antd';
import { MehTwoTone } from '@ant-design/icons';

import instance from '../../../service/requert'
import { errorCategoryArray, errorContentArray } from '../../../source/constant'

const { Search } = Input;
const colorArray = ['black', 'yellow', '#f50', 'darkgray', 'green', 'blue', 'purple', 'volcano', '#dddddd', '#87d068']

const All = () => {

    // 接收state参数,为''或搜索的内容
    // const search = useLocation().state == null ? '' : useLocation().state.search

    var [contentArray, setContentArray] = useState([{ id: '1', title: '加载中…………', tags: [] }])    // 当前显示的博客数据
    const [totalCount, setTotalCount] = useState(0) // 当前分类及搜索条件下的总条数
    const [page, setPage] = useState(1) // 当前页码
    const [pageSize, setPageSize] = useState(5) // 每页显示的条数
    const [categoryArray, setCategoryArray] = useState([])     // 所有分类的数组
    const [selectCategory, setSelectCategory] = useState('全部')   // 当前选择的分类
    const [search, setSearch] = useState('')   // 当前搜索的内容
    const [messageApi, contextHolder] = message.useMessage();
    const navigator = useNavigate()

    // 前端模拟数据需要(后期删除)
    const [contentArray_all, setCategoryArray_all] = useState(errorContentArray)

    // 分类改变、分页信息改变时的回调
    function change(selectCategory,search,page,pageSize){
        console.log('接受到的search为：' + search)
        // 此处发出请求,请求当前搜索条件下全部的文章数据的条数
        instance({
            url: '/blog/count?category=' + selectCategory + '&keyword=' + search,
            method: 'get'
        }).then(res => {
            // 将请求的博客数据的条数赋给totalCount
            setTotalCount(res.data)
        }, error => {
            messageApi.open({
                type: 'error',
                content: '服务器出错！',
                duration: 1,
            });

            // 前端模拟数据(后期删除)
            let newData = search == '' ? contentArray_all : contentArray_all.filter(item => {
                if (item.title.includes(search)) {
                    return item
                }
            })
            newData = selectCategory == '全部' ? newData : newData.filter(item => {
                if (item.category == selectCategory) {
                    return item
                }
            })
            setTotalCount(newData.length)

        })
        // 发出请求，请求当前分页下的博客数据
        instance({
            url: '/blog/search?category=' + selectCategory + '&keyword=' + search + '&page=' + page + '&pageSize=' + pageSize,
            method: 'get'
        }).then(res => {
            // 将请求的博客数据赋给contentArray
            setContentArray(res.data)
        }, error => {
            messageApi.open({
                type: 'error',
                content: '服务器出错！',
                duration: 1,
            })

            // 前端模拟数据(后期删除)
            let newData = search == '' ? contentArray_all : contentArray_all.filter(item => {
                if (item.title.includes(search)) {
                    return item
                }
            })
            newData = selectCategory == '全部' ? newData : newData.filter(item => {
                if (item.category == selectCategory) {
                    return item
                }
            })
            setContentArray(newData.slice((page - 1) * pageSize, page * pageSize))
        })
    }


    useEffect(() => {
        // componentDidMount钩子
        // 请求所有的分类信息
        instance({
            url: '/category/all',
            method: 'get'
        }).then(res => {
            // 将查询到的分类信息赋给categoryArray
            setCategoryArray(res.data)
        }, error => {
            messageApi.open({
                type: 'error',
                content: '服务器出错！(查询分类信息)',
                duration: 1,
            })
            setCategoryArray(errorCategoryArray)
        })

        // 发出请求，请求当前条件下全部的博客数据及其条数
        change(selectCategory,search,page,pageSize);
    }, [])

    // 点击博客跳转到博客详情页
    const clickContent = (item) => {
        // 点击文章跳转到文章详情页
        navigator('/home/content/details', { state: { item } })
    }

    // 分类信息改变的回调函数
    const change_selectCategory = (category) => {
        setSelectCategory(category)
        // 发出请求，请求当前条件下全部的博客数据及其条数
        change(category,search,page,pageSize);
    }

    // 分页信息改变的回调函数
    const pageChange = (page, pageSize) => {
        setPage(page)
        setPageSize(pageSize)
        // 发出请求，请求当前条件下全部的博客数据及其条数
        change(selectCategory,search,page,pageSize);
    }

    // 搜索的回调函数
    const onSearch = (value) => {
        setSearch(value)
        // 发出请求，请求当前条件下全部的博客数据及其条数
        change(selectCategory,value,page,pageSize);
    }

    return (
        <div>
            < Search
                placeholder="请输入内容…………"
                allowClear
                enterButton="搜索"
                size="mini"
                style={{ width: '300px',position:'fixed',bottom:'535px',left:'400px',zIndex:'100' }}
                onSearch={onSearch}
            />
            <br />
            <br />
            <Row>
                <Col span={3} onClick={() => change_selectCategory('全部')}>
                    <div style={{ borderRight: '1px solid #dddddd', borderBottom: '1px solid #dddddd', padding: '3px 10px', color: selectCategory == '全部' ? 'red' : 'black' }} >全部</div>
                </Col>
                {
                    categoryArray.map(item => {
                        return (
                            <Col span={3} onClick={() => change_selectCategory(item)}>
                                <div style={{ borderRight: '1px solid #dddddd', borderBottom: '1px solid #dddddd', padding: '3px 10px', color: selectCategory == item ? 'red' : 'black' }} >{item}</div>
                            </Col>
                        )
                    })
                }
            </Row>
            <br />
            {contextHolder}
            {
                contentArray.map(item => {
                    return (
                        <div key={item.id}>
                            <h3 style={{ display: 'inline' }}>{item.title}</h3>
                            {
                                item.tags.map(tag => {
                                    return (
                                        <Tag color={colorArray[tag.length % 10]} style={{ marginLeft: '5px' }}>{tag}</Tag>
                                    )
                                })
                            }

                            <p onClick={() => { clickContent(item) }}>
                                <a style={{ textOverflow: '-o-ellipsis-lastline', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', lineHeight: '30px', fontSize: '12px', textIndent: '2em', maxHeight: '90px' }}>{item.content}</a>
                            </p>
                            <span style={{ fontSize: '10px' }}>发布时间:{item.createTime}</span>
                            <span style={{ fontSize: '10px', float: 'right', color: 'red' }}>浏览量:{item.hot}</span>
                            <hr />
                        </div>
                    )
                })
            }

            <div style={{ display: contentArray.length == 0 ? 'block' : 'none', textAlign: 'center' }}>
                <MehTwoTone />  暂无当前分类博客，
                <a onClick={() => change_selectCategory('全部')}>浏览其他分类的博客?</a>
            </div>
            <Pagination
                size='small'
                defaultCurrent={1}
                total={totalCount}
                defaultPageSize={5}
                showSizeChanger={true}
                pageSizeOptions={['5', '10', '20', '30']}
                onChange={pageChange} />
        </div>
    )
}
export default All;
