package com.zxr.blog.entities;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.UUID;

/**
 * 表名：tb_blog
 * 表注释：博客信息表
*/
@Table(name = "tb_blog")
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Blog {
    /**
     * 主键
     */
    @Id
    @GeneratedValue(generator = "JDBC")
    private String id;


    /**
     * 标题
     */
    private String title;


    /**
     * 探店的文字描述
     */
    private String content;


    /**
     * 创建时间
     */
    @Column(name = "createTime")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createtime;

    /**
     * 更新时间
     */
    @Column(name = "editTime")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date edittime;

    @Column(name = "hot")
    private Integer hot;


    @Column(name = "category")
    private String category;

    @Column(name = "tags")
    private String tags;

    public Blog(BlogDTO blogDTO){
        this.id = UUID.randomUUID().toString().replace("-","").substring(0,16);
        this.title = blogDTO.getTitle();
        this.content = blogDTO.getContent();
        this.createtime = blogDTO.getCreatetime();
        this.edittime = blogDTO.getEdittime() == null ? blogDTO.getCreatetime() : blogDTO.getEdittime();
        this.hot = 0;
        this.category = blogDTO.getCategory();
        this.tags = blogDTO.getTags().toString().replace("[","").replace("]","");
    }
}