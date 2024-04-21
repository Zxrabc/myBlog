package com.zxr.blog.mapper;

import com.zxr.blog.entities.Category;
import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;

public interface CategoryMapper extends Mapper<Category> {
    public Integer existIncludeBlog(@Param("categoryname") String categoryname);
}