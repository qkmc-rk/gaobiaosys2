/**
* @author sherivey.Ruan  
* @date 2018��5��15��  
* @version 1.0 
* ��ϵ��ʽ:qkmc@outlook.com
*/ 
package xyz.ruankun.bean;
/**
 * �û���¼�ɹ�������һ���û���UserStateBean��ŵ�session�У����û��˳���¼ʱ���ٸö���
 * @author Sherivey.Ruan
 *
 */
public class UserSession {

	//session id
	private String sessionId;
	//��ɫ
	private String role;
	//id
	private Integer objectId;

	
	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Integer getObjectId() {
		return objectId;
	}

	public void setObjectId(Integer objectId) {
		this.objectId = objectId;
	}
	
}
