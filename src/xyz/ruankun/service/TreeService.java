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
	 * @param OBJECTID  id of data row
	 * @param role role! you know it!
	 * @return direct children
	 */
	String getChildren(String OBJECTID,String role);

	String getNodeInfo(String oBJECTID, String role);

	/**
	 * get info of the selectednode,you must know its name and role.
	 * @param name  the district's parent's name.
	 * @param name  the district name.
	 * @param role the rank of the district.
	 * @return the json info of your selected node info.
	 */
	String getNodeInfoByName(String parentName,String name, String role);
}
