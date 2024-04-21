package com.zxr.blog.controller;


import com.zxr.blog.entities.Category;
import com.zxr.blog.entities.CategoryDTO;
import com.zxr.blog.resp.ResultData;
import com.zxr.blog.resp.ReturnCodeEnum;
import com.zxr.blog.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/category")
@Tag(name = "分类相关接口")
public class CategoryController {


    @Resource
    private CategoryService categoryService;

    @GetMapping("/all")
    @Operation(summary = "请求所有分类接口")
    public ResultData<List<Category>> getAll(){
        log.info("================请求所有分类");
        return ResultData.success(categoryService.getAll());
    }


    @PostMapping("/add")
    @Operation(summary = "添加分类接口")
    public ResultData add(@RequestBody CategoryDTO categoryDTO){
        Category category = new Category(categoryDTO);
        log.info("================请求添加分类，分类名为：" + category.getCategoryname());
        int result = categoryService.add(category);
        Integer count = categoryService.selectCount(categoryDTO);
        if(count > 0){
            log.error("================添加失败！(分类名重复）");
            return ResultData.fail("997", ReturnCodeEnum.RC997.getMessage());
        }
        if(result > 0){
            log.info("================添加分类成功！");
            return ResultData.success(true);
        }
        log.error("================添加分类失败！");
        return ResultData.fail("999", ReturnCodeEnum.RC999.getMessage());
    }

    @PostMapping("/getId")
    @Operation(summary = "根据分类名查询分类id接口")
    public ResultData selectId(@RequestBody CategoryDTO categoryDTO){
        log.info("================查询分类ID，所查询分类名为：" + categoryDTO.getcategoryname());
        return ResultData.success(categoryService.selectId(categoryDTO));
    }

    @PostMapping("/update")
    @Operation(summary = "更新分类信息接口")
    public ResultData update(@RequestBody Category category){
        log.info("================更新分类信息，新分类ID:" + category.getId() + ",新分类名：" + category.getCategoryname());
        int result = categoryService.update(category);
        if(result > 0){
            log.info("================更新分类信息成功！");
            return ResultData.success(true);
        }
        log.error("================更新分类信息失败！");
        return ResultData.fail("999", ReturnCodeEnum.RC999.getMessage());
    }

    @PostMapping("/delete")
    @Operation(summary = "删除分类接口")
    public ResultData delete(@RequestBody List<Integer> list){
        log.info("================删除分类，删除分类ID为：" + list.toString());
        for(int i = 0;i < list.size();i++){
            // 判断是否有属于该分类的博客
            String categoryname = categoryService.selectNameById(list.get(i));
            log.info("================判断标签是否被使用");
            if(categoryService.existIncludeBlog(categoryname)) {
                log.error("================删除分类失败！");
                return ResultData.fail("998", ReturnCodeEnum.RC998.getMessage(),categoryname);
            }
            int result = categoryService.delete(list.get(i));
            if(result <= 0){
                log.error("================删除分类失败！");
                return ResultData.fail("999", ReturnCodeEnum.RC999.getMessage());
            }
        }
        log.info("================删除分类成功！");
        return ResultData.success(true);
    }
}
