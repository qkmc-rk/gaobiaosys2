/**
* @author sherivey.Ruan  
* @date 2018��5��15��  
* @version 1.0 
* ��ϵ��ʽ:qkmc@outlook.com
*/ 
package xyz.ruankun.service;

import xyz.ruankun.model.User;

public interface UserService {

	/**
	 * �û���¼����¼�����û��Ķ���
	 * @param account
	 * @param password
	 * @return
	 */
	User login(String account,String password);
}
