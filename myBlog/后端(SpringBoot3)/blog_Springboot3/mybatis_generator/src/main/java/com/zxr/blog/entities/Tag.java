package com.zxr.blog.entities;

import lombok.ToString;

import javax.persistence.*;

/**
 * 表名：tb_tag
 * 表注释：标签信息表
*/
@Table(name = "tb_tag")
@ToString
public class Tag {
    /**
     * 标签编号
     */
    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer id;

    /**
     * 标签名
     */
    @Column(name = "tagName")
    private String tagname;

    /**
     * 获取标签编号
     *
     * @return id - 标签编号
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置标签编号
     *
     * @param id 标签编号
     */
    public void setId(Integer id) {
        this.id = id;
    }

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