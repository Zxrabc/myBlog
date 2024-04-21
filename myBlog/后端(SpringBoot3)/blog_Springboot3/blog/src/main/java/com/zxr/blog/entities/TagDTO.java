package com.zxr.blog.entities;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class TagDTO {
    private String tagname;


    /**
     * 获取标签名
     *
     * @return tagname - 标签名
     */
    public String getTagname() {
        return tagname;
    }

    /**
     * 设置标签名
     *
     * @param tagname 标签名
     */
    public void setTagname(String tagname) {
        this.tagname = tagname;
    }
}
