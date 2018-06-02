/**
* @author sherivey.Ruan  
* @date 2018��5��15��  
* @version 1.0 
* ��ϵ��ʽ:qkmc@outlook.com
*/ 
package xyz.ruankun.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import xyz.ruankun.bean.LoginReturn;
import xyz.ruankun.bean.UserSession;
import xyz.ruankun.model.User;
import xyz.ruankun.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userService;
	
	/**
	 * �û���¼
	 * @param account
	 * @param password
	 * @param session
	 * @return ��¼�Ƿ�ɹ�
	 */
	@RequestMapping(value="/login",method=RequestMethod.POST)
	@ResponseBody
	public String login(@RequestParam String account,@RequestParam String password,HttpSession session) {
		//1.���е�¼
		User user = userService.login(account, password);
		if(user == null) {
			//��¼ʧ��
			return LoginReturn.jsonFail("��¼ʧ��");
		}
		//2.����session�����ص�¼״̬��session id.
		String rs = LoginReturn.jsonSuccess("��¼�ɹ�");
		UserSession userSession = new UserSession();
		userSession.setSessionId(LoginReturn.getLoginReturn().getSessionId());
		userSession.setObjectId(user.getObjectid());
		userSession.setRole(user.getLevel());
		//���û���role��sessionid�浽session�У��Ժ�Ĳ�������ͨ��sessionid����֤���.
		session.setAttribute("user", userSession);
		return rs;
	}
	
	/**
	 * validate if the user is loggined .
	 * @param sessionKey
	 * @return
	 */
	@RequestMapping(value="/online",method=RequestMethod.POST)
	@ResponseBody
	public String logined(@RequestParam String sessionKey,HttpSession session) {
		//get user first
		UserSession userSession = (UserSession)session.getAttribute("user");
		//if user is null throw exception
		if(userSession == null) {
			return LoginReturn.jsonFail("timeout..please retry!");
		}
		//if the sessionid is changed by user itself.
		if(userSession != null && !userSession.getSessionId().equals(sessionKey)) {
			return LoginReturn.jsonFail("wrong sessionid");
		}
		return LoginReturn.jsonSuccess("����");
	}
	
}
