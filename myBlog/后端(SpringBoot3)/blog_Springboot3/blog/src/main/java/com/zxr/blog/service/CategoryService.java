package com.zxr.blog.service;

import com.zxr.blog.entities.Category;
import com.zxr.blog.entities.CategoryDTO;
import org.aopalliance.intercept.Interceptor;

import java.util.List;

public interface CategoryService {
    public List<Category> getAll();

    public int add(Category category);

    public int update(Category category);

    public Integer selectId(CategoryDTO categoryDTO);

    public  Integer selectCount(CategoryDTO categoryDTO);

    public int delete(Integer id);
    public boolean existIncludeBlog(String categoryname);
    public String selectNameById(Integer id);
}
