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
public class UserSession implements Comparable<String> {

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

	@Override
	public int compareTo(String o) {
		if(this.role.equals("province")) {
			//�����
		}else if(this.role.equals("city")) {
			//�����
		}else if(this.role.equals("county")) {
			//�����
		}else if(this.role.equals("namesec")) {
			//�����
		}else if(this.role.equals("town")) {
			//�����
		}else if(this.role.equals("village")) {
			//�����
		}
		return 0;
	}
	
}
