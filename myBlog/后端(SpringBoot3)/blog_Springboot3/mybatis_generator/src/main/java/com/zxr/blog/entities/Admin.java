package com.zxr.blog.entities;

import lombok.ToString;

import javax.persistence.*;

/**
 * 表名：tb_admin
 * 表注释：管理员信息表
*/
@Table(name = "tb_admin")
@ToString
public class Admin {
    /**
     * 管理员编号
     */
    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 获取管理员编号
     *
     * @return id - 管理员编号
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置管理员编号
     *
     * @param id 管理员编号
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取用户名
     *
     * @return username - 用户名
     */
    public String getUsername() {
        return username;
    }

    /**
     * 设置用户名
     *
     * @param username 用户名
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * 获取密码
     *
     * @return password - 密码
     */
    public String getPassword() {
        return password;
    }

    /**
     * 设置密码
     *
     * @param password 密码
     */
    public void setPassword(String password) {
        this.password = password;
    }
}