package com.zxr.blog.entities;


/**
 * 表名：tb_category
 * 表注释：分类信息表
 */
public class CategoryDTO {

    /**
     * 分类名
     */
    private String categoryname;


    /**
     * 获取分类名
     *
     * @return categoryname - 分类名
     */
    public String getcategoryname() {
        return categoryname;
    }

    /**
     * 设置分类名
     *
     * @param categoryname 分类名
     */
    public void setCategoryName(String categoryname) {
        this.categoryname = categoryname;
    }
}