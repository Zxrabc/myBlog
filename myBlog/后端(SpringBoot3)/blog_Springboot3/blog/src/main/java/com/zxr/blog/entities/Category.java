package com.zxr.blog.entities;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 表名：tb_category
 * 表注释：分类信息表
*/
@Table(name = "tb_category")
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    /**
     * 分类编号
     */
    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer id;

    /**
     * 分类名
     */
    @Column(name = "categoryName")
    private String categoryname;

    /**
     * 获取分类编号
     *
     * @return id - 分类编号
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置分类编号
     *
     * @param id 分类编号
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取分类名
     *
     * @return categoryname - 分类名
     */
    public String getCategoryname() {
        return categoryname;
    }

    /**
     * 设置分类名
     *
     * @param categoryname 分类名
     */
    public void setCategoryname(String categoryname) {
        this.categoryname = categoryname;
    }

    public Category(CategoryDTO categoryDTO){
        this.categoryname = categoryDTO.getcategoryname();
    }
}