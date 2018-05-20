/**
* @author sherivey.Ruan  
* @date 2018年5月15日  
* @version 1.0 
* 联系方式:qkmc@outlook.com
*/ 
package xyz.ruankun.bean;

import java.util.Date;

import com.alibaba.fastjson.JSON;

import xyz.ruankun.util.MD5Encoder;

/**
 * 用于向前台返回登录的信息，登录成功返回sessionid，登录失败返回错误信息
 * @author Sherivey.Ruan
 *
 */
public  class LoginReturn {

	/**
	 * code为0表示成功登录
	 * 其它表示失败
	 * 
	 */
	private  Integer code;
	
	private  String msg;
	
	private  String sessionId;
	
	private static LoginReturn loginReturn;
	
	/**
	 * 返回登录成功的json信息
	 * @param msgs
	 * @return
	 */
	public static String jsonSuccess(String msgs) {
		
		if(loginReturn == null)
			loginReturn = new LoginReturn();
		loginReturn.code = 0;
		loginReturn.msg = msgs;
		
		loginReturn.sessionId = MD5Encoder.encode(String.valueOf(new Date().getTime()));
		return JSON.toJSONString(loginReturn);
	}
	
	/**
	 * 返回登录失败的json信息
	 * @param msgs
	 * @return
	 */
	public static String jsonFail(String msgs) {
		
		if(loginReturn == null)
			loginReturn = new LoginReturn();
		loginReturn.code = -1;
		loginReturn.msg = msgs;
		
		loginReturn.sessionId = null;
		return JSON.toJSONString(loginReturn);
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public static LoginReturn getLoginReturn() {
		return loginReturn;
	}

	public static void setLoginReturn(LoginReturn loginReturn) {
		LoginReturn.loginReturn = loginReturn;
	}

	public void destroy() {
		loginReturn = null;
	}
}
