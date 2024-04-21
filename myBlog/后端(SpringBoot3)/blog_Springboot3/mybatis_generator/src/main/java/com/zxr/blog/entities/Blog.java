package com.zxr.blog.entities;

import lombok.ToString;

import java.util.Date;
import javax.persistence.*;

/**
 * 表名：tb_blog
 * 表注释：博客信息表
*/
@Table(name = "tb_blog")
@ToString
public class Blog {
    /**
     * 主键
     */
    @Id
    @GeneratedValue(generator = "JDBC")
    private Long id;

    /**
     * 商户id
     */
    @Column(name = "shop_id")
    private Long shopId;

    /**
     * 用户id
     */
    @Column(name = "user_id")
    private Long userId;

    /**
     * 标题
     */
    private String title;

    /**
     * 探店的照片，最多9张，多张以","隔开
     */
    private String images;

    /**
     * 探店的文字描述
     */
    private String content;

    /**
     * 点赞数量
     */
    private Integer liked;

    /**
     * 评论数量
     */
    private Integer comments;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 更新时间
     */
    @Column(name = "update_time")
    private Date updateTime;

    /**
     * 获取主键
     *
     * @return id - 主键
     */
    public Long getId() {
        return id;
    }

    /**
     * 设置主键
     *
     * @param id 主键
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 获取商户id
     *
     * @return shopId - 商户id
     */
    public Long getShopId() {
        return shopId;
    }

    /**
     * 设置商户id
     *
     * @param shopId 商户id
     */
    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    /**
     * 获取用户id
     *
     * @return userId - 用户id
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * 设置用户id
     *
     * @param userId 用户id
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * 获取标题
     *
     * @return title - 标题
     */
    public String getTitle() {
        return title;
    }

    /**
     * 设置标题
     *
     * @param title 标题
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * 获取探店的照片，最多9张，多张以","隔开
     *
     * @return images - 探店的照片，最多9张，多张以","隔开
     */
    public String getImages() {
        return images;
    }

    /**
     * 设置探店的照片，最多9张，多张以","隔开
     *
     * @param images 探店的照片，最多9张，多张以","隔开
     */
    public void setImages(String images) {
        this.images = images;
    }

    /**
     * 获取探店的文字描述
     *
     * @return content - 探店的文字描述
     */
    public String getContent() {
        return content;
    }

    /**
     * 设置探店的文字描述
     *
     * @param content 探店的文字描述
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * 获取点赞数量
     *
     * @return liked - 点赞数量
     */
    public Integer getLiked() {
        return liked;
    }

    /**
     * 设置点赞数量
     *
     * @param liked 点赞数量
     */
    public void setLiked(Integer liked) {
        this.liked = liked;
    }

    /**
     * 获取评论数量
     *
     * @return comments - 评论数量
     */
    public Integer getComments() {
        return comments;
    }

    /**
     * 设置评论数量
     *
     * @param comments 评论数量
     */
    public void setComments(Integer comments) {
        this.comments = comments;
    }

    /**
     * 获取创建时间
     *
     * @return createTime - 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取更新时间
     *
     * @return updateTime - 更新时间
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * 设置更新时间
     *
     * @param updateTime 更新时间
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}