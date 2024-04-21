package com.zxr.blog.service.impl;

import com.zxr.blog.entities.Category;
import com.zxr.blog.entities.CategoryDTO;
import com.zxr.blog.mapper.CategoryMapper;
import com.zxr.blog.service.CategoryService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Resource
    private CategoryMapper categoryMapper;

    @Override
    public List<Category> getAll() {
        return categoryMapper.selectAll();
    }

    @Override
    public int add(Category category) {
        return categoryMapper.insertSelective(category);
    }
    @Override
    public int update(Category category){
        return categoryMapper.updateByPrimaryKey(category);
    }

    @Override
    public Integer selectId(CategoryDTO categoryDTO){
        return categoryMapper.selectOne(new Category(categoryDTO)).getId();
    }

    @Override
    public Integer selectCount(CategoryDTO categoryDTO){
        return categoryMapper.selectCount(new Category(categoryDTO));
    }

    @Override
    public int delete(Integer id){
        return categoryMapper.deleteByPrimaryKey(id);
    }

    @Override
    public boolean existIncludeBlog(String categoryname){
        return categoryMapper.existIncludeBlog(categoryname) > 0;
    }

    @Override
    public String selectNameById(Integer id){
        return categoryMapper.selectByPrimaryKey(id).getCategoryname();
    }

}
