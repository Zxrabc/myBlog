package com.zxr.blog.controller;


import com.zxr.blog.entities.Admin;
import com.zxr.blog.entities.AdminDTO;
import com.zxr.blog.resp.ResultData;
import com.zxr.blog.resp.ReturnCodeEnum;
import com.zxr.blog.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
@Tag(name = "管理员相关接口")
public class AdminController {

    @Resource
    private AdminService adminService;

    @PostMapping(value = "/login")
    @Operation(summary = "请求登录接口")
    public ResultData test(@RequestBody AdminDTO adminDTO){
        Admin admin = new Admin(adminDTO);
        log.info("=================请求登录，登录信息为：username:"+ admin.getUsername() + ",pwd:" + admin.getPassword());
        String pwd = adminService.selectPwd(admin.getUsername());
        if(Objects.equals(pwd, null)){
            return ResultData.fail("501",ReturnCodeEnum.RC501.getMessage());
        }
        if(pwd.equals(admin.getPassword())){
            return ResultData.success(true);
        }
        return ResultData.fail("502",ReturnCodeEnum.RC502.getMessage());
    }

}
