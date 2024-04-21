package com.zxr.blog.service.impl;

import com.zxr.blog.entities.Blog;
import com.zxr.blog.mapper.BlogMapper;
import com.zxr.blog.service.BlogService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BlogServiceImpl implements BlogService {


    @Resource
    private BlogMapper blogMapper;

    @Override
    public List<Blog> getAll() {
        return blogMapper.selectAll();
    }

    @Override
    public int add(Blog blog) {
        return blogMapper.insertSelective(blog);
    }

    @Override
    public int delete(String id){
        return blogMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int update(Blog blog){
        return blogMapper.updateByPrimaryKeySelective(blog);
    }

    @Override
    public Integer selectCountByCategoryKeyword(String category,String keyword){
        return blogMapper.selectCountByCategoryKeyword(category,keyword);
    }

    @Override
    public List<Blog> selectLimitByCategoryKeyword(String category,String keyword,Integer page,Integer pagesize){
        return blogMapper.selectLimitByCategoryKeyword(category,keyword,page,pagesize);
    }

    @Override
    public List<Blog> selectTop10(){
        return blogMapper.selectTop10();
    }

    @Override
    public int hotAdd(String id){
        return blogMapper.hotAdd(id);
    }


}
