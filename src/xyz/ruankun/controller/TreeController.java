package xyz.ruankun.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import xyz.ruankun.bean.DeepNode;
import xyz.ruankun.bean.LoginReturn;
import xyz.ruankun.bean.UserSession;
import xyz.ruankun.service.TreeService;
import xyz.ruankun.service.UserService;

@Controller
@RequestMapping(value="/tree")
public class TreeController {
	
	@Autowired
	TreeService treeService;
	
	UserService userService;

	/**
	 * get the current nodes' position,with its father nodes.
	 * <p> such as:
	 * <p>{"name":"SichuanSheng","node":[{
	 *                                    "name":"ZiGongShi",
	 *                                    node:[
	 *                                    {....}
	 *                                    ]
	 *                                    }]
	 * }
	 * @param sessionKey user's temporary token.entry time =30 mins.
	 * @param session session storage at server.
	 * @return
	 */
	@RequestMapping(value="/current")
	@ResponseBody
	public String currentNodes(@RequestParam String sessionKey,HttpSession session) {
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
		String role = userSession.getRole();
		Integer userid = userSession.getObjectId();
		System.out.println(role + ", " + userid);
		String rs = treeService.getFatherAndSelf(role,userid);
		System.out.println(rs);
		if(rs != null) {
			return rs;
		}else {
			//didn't get  the nodes info.return false info.
			DeepNode<String> dNode = new DeepNode<>();
			dNode.setCustom("Didn't get the nodes info");
			return JSON.toJSONString(dNode);
		}
	}
	
	@RequestMapping(value="/children")
	@ResponseBody
	public String childrenNodes(@RequestParam String OBJECTID,HttpSession session,
			@RequestParam String sessionKey,
			@RequestParam String role) {
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
		String rs = treeService.getChildren(OBJECTID, role);
		if(rs != null) {
			return rs;
		}else {
			//didn't get  the nodes info.return false info.
			return null;
		}
	}
	@RequestMapping(value="/nodeinfo")
	@ResponseBody
	public String nodeInfo(@RequestParam String sessionKey,HttpSession session,
			@RequestParam String OBJECTID,
			@RequestParam String role) {
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
		String rs = treeService.getNodeInfo(OBJECTID,role);
		if(rs != null) {
			return rs;
		}else {
			//didn't get  the nodes info.return false info.
			DeepNode<String> dNode = new DeepNode<>();
			dNode.setCustom("Didn't get the nodes info");
			return JSON.toJSONString(dNode);
		}
	}
}
