package com.zxr.blog.service.impl;

import com.zxr.blog.entities.Admin;
import com.zxr.blog.entities.AdminDTO;
import com.zxr.blog.mapper.AdminMapper;
import com.zxr.blog.service.AdminService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {


    @Resource
    private AdminMapper adminMapper;
    @Override
    public List<Admin> selectAll() {
        return adminMapper.selectAll();
    }

    @Override
    public String selectPwd(String name){
        List<Admin> list = adminMapper.select(new Admin(name));
        if(list.isEmpty()){
            return null;
        }
        return list.get(0).getPassword();
    }

}
