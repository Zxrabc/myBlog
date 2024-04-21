package com.zxr.blog.mapper;

import com.zxr.blog.entities.Tag;
import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;

public interface TagMapper extends Mapper<Tag> {
    public Integer existIncludeBlog(@Param("tagname") String tagname);
}