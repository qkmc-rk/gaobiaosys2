/**
* @author sherivey.Ruan  
* @date 2018年5月15日  
* @version 1.0 
* 联系方式:qkmc@outlook.com
*/ 
package xyz.ruankun.bean;
/**
 * 用户登录成功后，生成一个用户的UserStateBean存放到session中，当用户退出登录时销毁该对象。
 * @author Sherivey.Ruan
 *
 */
public class UserSession implements Comparable<String> {

	//session id
	private String sessionId;
	//角色
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
			//待完成
		}else if(this.role.equals("city")) {
			//待完成
		}else if(this.role.equals("county")) {
			//待完成
		}else if(this.role.equals("namesec")) {
			//待完成
		}else if(this.role.equals("town")) {
			//待完成
		}else if(this.role.equals("village")) {
			//待完成
		}
		return 0;
	}
	
}
