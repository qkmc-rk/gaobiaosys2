/**
* @author sherivey.Ruan  
* @date 2018年5月15日  
* @version 1.0 
* 联系方式:qkmc@outlook.com
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
	 * 用户登录
	 * @param account
	 * @param password
	 * @param session
	 * @return 登录是否成功
	 */
	@RequestMapping(value="/login",method=RequestMethod.POST)
	@ResponseBody
	public String login(@RequestParam String account,@RequestParam String password,HttpSession session) {
		//1.进行登录
		User user = userService.login(account, password);
		if(user == null) {
			//登录失败
			return LoginReturn.jsonFail("登录失败");
		}
		//2.设置session并返回登录状态和session id.
		String rs = LoginReturn.jsonSuccess("登录成功");
		UserSession userSession = new UserSession();
		userSession.setSessionId(LoginReturn.getLoginReturn().getSessionId());
		userSession.setObjectId(user.getObjectid());
		userSession.setRole(user.getLevel());
		//将用户的role和sessionid存到session中，以后的操作都是通过sessionid来认证身份.
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
		return LoginReturn.jsonSuccess("在线");
	}
	
}
