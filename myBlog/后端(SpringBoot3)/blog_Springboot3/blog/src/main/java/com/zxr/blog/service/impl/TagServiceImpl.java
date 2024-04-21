package com.zxr.blog.service.impl;

import com.zxr.blog.entities.Category;
import com.zxr.blog.entities.Tag;
import com.zxr.blog.entities.TagDTO;
import com.zxr.blog.mapper.TagMapper;
import com.zxr.blog.service.TagService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import java.util.List;

@Service
public class TagServiceImpl implements TagService {

    @Resource
    private TagMapper tagMapper;
    @Override
    public List<Tag> getAll() {
        return tagMapper.selectAll();
    }

    @Override
    public int add(Tag tag) {
        return tagMapper.insertSelective(tag);
    }

    @Override
    public int update(Tag tag) {
        return tagMapper.updateByPrimaryKey(tag);
    }

    @Override
    public Integer selectId(TagDTO tagDTO) {
        return tagMapper.selectOne(new Tag(tagDTO)).getId();
    }

    @Override
    public Integer selectCount(TagDTO tagDTO) {
        return tagMapper.selectCount(new Tag(tagDTO));
    }


    @Override
    public int delete(Integer id) {
        return tagMapper.deleteByPrimaryKey(id);
    }

    @Override
    public boolean existIncludeBlog(String tagname){
        return tagMapper.existIncludeBlog(tagname) > 0;
    }

    @Override
    public String selectNameById(Integer id){
        return tagMapper.selectByPrimaryKey(id).getTagname();
    }
}
