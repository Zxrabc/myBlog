package com.zxr.blog.service;

import com.zxr.blog.entities.Category;
import com.zxr.blog.entities.CategoryDTO;
import com.zxr.blog.entities.Tag;
import com.zxr.blog.entities.TagDTO;

import java.util.List;

public interface TagService {
    public List<Tag> getAll();

    public int add(Tag tag);

    public int update(Tag tag);

    public Integer selectId(TagDTO tagDTO);
    public Integer selectCount(TagDTO tagDTO);

    public int delete(Integer id);
    public boolean existIncludeBlog(String tagname);
    public String selectNameById(Integer id);
}
