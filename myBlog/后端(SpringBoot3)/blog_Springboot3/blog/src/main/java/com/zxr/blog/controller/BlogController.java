package com.zxr.blog.controller;


import com.zxr.blog.entities.Blog;
import com.zxr.blog.entities.BlogDTO;
import com.zxr.blog.resp.ResultData;
import com.zxr.blog.resp.ReturnCodeEnum;
import com.zxr.blog.service.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.Printer;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/blog")
@Tag(name = "博客相关接口")
public class BlogController {

    @Resource
    private BlogService blogService;

    @GetMapping("/all")
    @Operation(summary = "请求所有博客接口")
    public ResultData<List<Blog>> getAll(){
        log.info("================请求所有博客信息");
        return ResultData.success(blogService.getAll());
    }

    @PostMapping("/publish")
    @Operation(summary = "发布博客接口")
    public ResultData publish(@RequestBody BlogDTO blogDTO){
        log.info("================请求发布博客，博客信息为：" + blogDTO.toString());
        Blog blog = new Blog(blogDTO);
        int result = blogService.add(blog);
        if(result > 0){
            return ResultData.success(true);
        }
        return ResultData.fail("999",ReturnCodeEnum.RC999.getMessage());
    }

    @PostMapping("/delete")
    @Operation(summary = "删除博客接口")
    public ResultData delete(@RequestBody List<String> list){
        log.info("================删除博客，删除博客ID为：" + list.toString());
        for(int i = 0;i < list.size();i++){
            int result = blogService.delete(list.get(i));
            if(result <= 0){
                log.error("================删除博客失败！");
                return ResultData.fail("999", ReturnCodeEnum.RC999.getMessage(),false);
            }
        }
        log.info("================删除博客成功！");
        return ResultData.success(true);
    }

    @PostMapping("/update")
    @Operation(summary = "更新博客接口")
    public ResultData update(@RequestBody Blog blog){
        log.info("================更新博客信息，更新博客ID:" + blog.getId());
        int result = blogService.update(blog);
        if(result > 0){
            log.info("================更新博客信息成功！");
            return ResultData.success(true);
        }
        log.error("================更新博客信息失败！");
        return ResultData.fail("999", ReturnCodeEnum.RC999.getMessage(),false);
    }

    @GetMapping(value = "/count")
    @Operation(summary = "查询当前分类及关键词下的博客总条数接口")
    public ResultData selectCount(@RequestParam("category") String category,@RequestParam("keyword") String keyword){
        log.info("================查询'" + category + "'分类、关于'" + keyword + "'的博客数量");
        category = Objects.equals(category, "全部") ? null : category;
        keyword = keyword.trim().isEmpty() ? null : keyword;
        return ResultData.success(blogService.selectCountByCategoryKeyword(category,keyword));
    }

    @GetMapping(value = "/search")
    @Operation(summary = "查询指定分类、关键词及分页下的博客接口")
    public ResultData selectSearch(@RequestParam("category") String category,@RequestParam("keyword") String keyword,
                                   @RequestParam("page") Integer page,@RequestParam("pagesize") Integer pagesize){
        log.info("================查询‘" + category + "'分类、关于'" + keyword + "'的第" + (pagesize*(page-1)) + "到" + (pagesize*page) + "条博客");
        category = Objects.equals(category, "全部") ? null : category;
        keyword = keyword.trim().isEmpty() ? null : keyword;
        page-=1;
        return ResultData.success(blogService.selectLimitByCategoryKeyword(category,keyword,page,pagesize));
    }

    @GetMapping(value = "/chart")
    @Operation(summary = "查询热度排行前十的博客接口")
    public ResultData chart(){
        log.info("================查询热度排行前十的博客");
        return ResultData.success(blogService.selectTop10());
    }

    @PostMapping("/hot/add")
    @Operation(summary = "博客热度+1接口")
    public ResultData hotAdd(@RequestBody String id){
        log.info("================更新博客热度，博客ID：" + id);
        int result = blogService.hotAdd(id);
        if(result > 0){
            return ResultData.success(true);
        }
        log.error("================更新失败！");
        return ResultData.fail("999",ReturnCodeEnum.RC999.getMessage(),false);
    }

}
