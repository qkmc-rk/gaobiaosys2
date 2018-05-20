/**
* @author sherivey.Ruan  
* @date 2018��5��15��  
* @version 1.0 
* ��ϵ��ʽ:qkmc@outlook.com
*/ 
package xyz.ruankun.bean;

import java.util.Date;

import com.alibaba.fastjson.JSON;

import xyz.ruankun.util.MD5Encoder;

/**
 * ������ǰ̨���ص�¼����Ϣ����¼�ɹ�����sessionid����¼ʧ�ܷ��ش�����Ϣ
 * @author Sherivey.Ruan
 *
 */
public  class LoginReturn {

	/**
	 * codeΪ0��ʾ�ɹ���¼
	 * ������ʾʧ��
	 * 
	 */
	private  Integer code;
	
	private  String msg;
	
	private  String sessionId;
	
	private static LoginReturn loginReturn;
	
	/**
	 * ���ص�¼�ɹ���json��Ϣ
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
	 * ���ص�¼ʧ�ܵ�json��Ϣ
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
