package com.zxr.blog.controller;

import com.zxr.blog.entities.Tag;
import com.zxr.blog.entities.TagDTO;
import com.zxr.blog.resp.ResultData;
import com.zxr.blog.resp.ReturnCodeEnum;
import com.zxr.blog.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/tag")
@io.swagger.v3.oas.annotations.tags.Tag(name = "标签相关接口")
public class TagController {

    @Resource
    private TagService tagService;

    @GetMapping("/all")
    @Operation(summary = "请求所有标签接口")
    public ResultData<List<Tag>> getAll(){
        log.info("================请求所有标签");
        return ResultData.success(tagService.getAll());
    }

    @PostMapping("/add")
    @Operation(summary = "添加标签接口")
    public ResultData add(@RequestBody TagDTO tagDTO){
        Tag tag = new Tag(tagDTO);
        log.info("================请求添加标签，标签名为：" + tag.getTagname());
        // 判断标签名是否重复
        Integer count = tagService.selectCount(tagDTO);
        if(count > 0){
            log.error("================添加失败！(标签名重复）");
            return ResultData.fail("997", ReturnCodeEnum.RC997.getMessage(),false);
        }
        int result = tagService.add(tag);
        if(result > 0){
            log.info("================添加标签成功！");
            return ResultData.success(true);
        }
        log.error("================添加标签失败！");
        return ResultData.fail("999", ReturnCodeEnum.RC999.getMessage());
    }

    @PostMapping("/getId")
    @Operation(summary = "根据标签名查询标签id接口")
    public ResultData selectId(@RequestBody TagDTO tagDTO){
        log.info("================查询标签ID，所查询标签名为：" + tagDTO.getTagname());
        return ResultData.success(tagService.selectId(tagDTO));
    }

    @PostMapping("/update")
    @Operation(summary = "更新标签信息接口")
    public ResultData update(@RequestBody Tag tag){
        log.info("================更新标签信息，新标签ID:" + tag.getId() + ",新标签名：" + tag.getTagname());
        int result = tagService.update(tag);
        if(result > 0){
            log.info("================更新标签信息成功！");
            return ResultData.success(true);
        }
        log.error("================更新标签信息失败！");
        return ResultData.fail("999", ReturnCodeEnum.RC999.getMessage());
    }

    @PostMapping("/delete")
    @Operation(summary = "删除标签接口")
    public ResultData delete(@RequestBody List<Integer> list){
        log.info("================删除标签，删除标签ID为：" + list.toString());
        for(int i = 0;i < list.size();i++){
            // 判断是否有博客含有改标签
            String tagname = tagService.selectNameById(list.get(i));
            log.info("================判断标签是否被使用");
            if(tagService.existIncludeBlog(tagname)) {
                log.error("================删除标签失败！");
                return ResultData.fail("998", ReturnCodeEnum.RC998.getMessage(),tagname);
            }
            int result = tagService.delete(list.get(i));
            if(result <= 0){
                log.error("================删除标签失败！");
                return ResultData.fail("999", ReturnCodeEnum.RC999.getMessage(),false);
            }
        }
        log.info("================删除标签成功！");
        return ResultData.success(true);
    }
}
