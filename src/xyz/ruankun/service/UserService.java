/**
* @author sherivey.Ruan  
* @date 2018年5月15日  
* @version 1.0 
* 联系方式:qkmc@outlook.com
*/ 
package xyz.ruankun.service;

import xyz.ruankun.model.User;

public interface UserService {

	/**
	 * 用户登录，登录后获得用户的对象
	 * @param account
	 * @param password
	 * @return
	 */
	User login(String account,String password);
}
