package com.zxr.blog.service;

import com.zxr.blog.entities.Admin;
import com.zxr.blog.entities.AdminDTO;
import org.aopalliance.intercept.Interceptor;

import java.util.List;

public interface AdminService {
    public List<Admin> selectAll();
    public String selectPwd(String name);
}
