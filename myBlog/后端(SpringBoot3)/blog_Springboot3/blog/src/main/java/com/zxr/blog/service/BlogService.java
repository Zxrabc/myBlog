package com.zxr.blog.service;

import com.zxr.blog.entities.Blog;

import java.util.List;

public interface BlogService {

    public List<Blog> getAll();
    public int add(Blog blog);

    public int delete(String id);

    public int update(Blog blog);

    public Integer selectCountByCategoryKeyword(String category,String keyword);
    public List<Blog> selectLimitByCategoryKeyword(String cateory,String keyword,Integer page,Integer pagesize);

    public List<Blog> selectTop10();
    public int hotAdd(String id);
}
