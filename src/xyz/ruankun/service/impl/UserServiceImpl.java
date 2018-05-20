/**
* @author sherivey.Ruan  
* @date 2018��5��15��  
* @version 1.0 
* ��ϵ��ʽ:qkmc@outlook.com
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
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(user!= null) {
			if(user.getPassword().equals(password)) {
				//��¼�ɹ�
				return user;
			}else {
				return null;
			}
		}
		return user;
	}
}
