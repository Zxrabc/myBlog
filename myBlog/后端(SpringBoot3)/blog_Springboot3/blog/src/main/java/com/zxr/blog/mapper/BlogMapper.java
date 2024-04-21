package com.zxr.blog.mapper;

import com.zxr.blog.entities.Blog;
import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;


public interface BlogMapper extends Mapper<Blog> {

    public Integer selectCountByCategoryKeyword(@Param("category") String category,@Param("keyword") String keyword);
    public List<Blog> selectLimitByCategoryKeyword(@Param("category") String category, @Param("keyword") String keyword,
                                                   @Param("page") Integer page, @Param("pagesize") Integer pagesize);
    public List<Blog> selectTop10();

    public int hotAdd(@Param("id") String id);
}