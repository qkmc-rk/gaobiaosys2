package xyz.ruankun.service;

public interface TreeService {

	/**
	 * Get user's current role's node and its father nodes.
	 * @param role :user's level. such as <b>province > <b>city > <b>namesec and county.... 
	 * @param userid 
	 */
	String getFatherAndSelf(String role, Integer userid);

	/**
	 * get user's children,input the role and id in mysql.
	 * return the direct children
	 * @param OBJECTID
	 * @param role
	 * @return direct children
	 */
	String getChildren(Integer OBJECTID,String role);
}
