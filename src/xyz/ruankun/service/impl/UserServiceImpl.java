/**
* @author sherivey.Ruan  
* @date 2018年5月15日  
* @version 1.0 
* 联系方式:qkmc@outlook.com
*/ 
package xyz.ruankun.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.ruankun.dao.UserMapper;
import xyz.ruankun.model.User;
import xyz.ruankun.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	UserMapper userMapper;
	
	@Override
	public User login(String account, String password) {
		User user = null;
		try {
			user = userMapper.selectByAccount(account);
			System.out.println("账号为:" + account + "已查找到用户:" + user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(user!= null) {
			System.out.println("用户不为空");
			if(user.getPassword().equals(password)) {
				System.out.println("密码为" + password + "登录成功！");
				//登录成功
				return user;
			}else {
				return null;
			}
		}
		return user;
	}
}
