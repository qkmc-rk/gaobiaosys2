package xyz.ruankun.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;

import xyz.ruankun.bean.DeepNode;
import xyz.ruankun.dao.CityMapper;
import xyz.ruankun.dao.CountyMapper;
import xyz.ruankun.dao.NameSecMapper;
import xyz.ruankun.dao.ProvinceMapper;
import xyz.ruankun.dao.TownMapper;
import xyz.ruankun.dao.UserMapper;
import xyz.ruankun.dao.VillageMapper;
import xyz.ruankun.model.City;
import xyz.ruankun.model.County;
import xyz.ruankun.model.NameSec;
import xyz.ruankun.model.Province;
import xyz.ruankun.model.Town;
import xyz.ruankun.model.User;
import xyz.ruankun.model.Village;
import xyz.ruankun.service.TreeService;

@Service("treeService")
public class TreeServiceImpl implements TreeService {

	@Autowired
	UserMapper userMapper;
	
	@Autowired
	ProvinceMapper provinceMapper;
	@Autowired
	CityMapper cityMapper;
	@Autowired
	CountyMapper countyMapper;
	@Autowired
	TownMapper townMapper;
	@Autowired
	VillageMapper villageMapper;
	@Autowired
	NameSecMapper nameSecMapper;
	
	/**
	 * 此方法目前只显示当前用户的顶级，父类暂时不显示 
	 */
	@Override
	public String getFatherAndSelf(String role,Integer userid) {
		//select user.
		User user = null;
		try {
			user = userMapper.selectByPrimaryKey(userid);
		} catch (Exception e) {
			System.out.println("user is null");
			e.printStackTrace();
			return null;
		}
		//firstly.get the curren node's name
		DeepNode<String> provinceNode = new DeepNode<>();
		DeepNode<String> cityNode = new DeepNode<>();
		DeepNode<String> countyNode = new DeepNode<>();
		DeepNode<String> nameSecNode = new DeepNode<>();
		DeepNode<String> townNode = new DeepNode<>();
		DeepNode<String> villageNode = new DeepNode<>();
		
		Province province = null;
		County county = null;
		NameSec nameSec = null;
		Town town = null;
		Village village = null;
		
		List<DeepNode<?>> cities;
		List<DeepNode<?>> counties;
		List<DeepNode<?>> namesecs;
		List<DeepNode<?>> towns;
		List<DeepNode<?>> villages;
		switch(role) {
		//find district code or name. new some nodes.then....you know it!
		case "province":
			
			//find province info.
			province = provinceMapper.selectByCode(user.getProcode()); //didn't handle the exception
			if(province != null) {
				provinceNode.setAll(province, null, null);
			}
			return JSON.toJSONString(provinceNode);
		case "city":
			//define data model firstly
			//provinceNode = new DeepNode<>();
			cityNode = new DeepNode<>();
			//finde city
			City city = cityMapper.selectByCode(user.getCitycode());
			//make a city data object
			cityNode.setAll(city, null, null);
			//make city node  as a list
			List<DeepNode<?>> cityNodes = new ArrayList<>();
			cityNodes.add(cityNode);
			//make a province node
			//province = provinceMapper.selectByCode(city.getProcode());
			//provinceNode.setAll(province, null, cityNodes);
			//return
			return JSON.toJSONString(cityNode);
		case "county":
			countyNode = new DeepNode<>();
			//cityNode = new DeepNode<>();
			//provinceNode = new DeepNode<>();
			try {
				county = countyMapper.selectByCode(user.getCoucode());
				countyNode.setAll(county, null, null);
				counties = new ArrayList<>();
				counties.add(countyNode);
				
				//city = cityMapper.selectByCode(county.getCitycode());
				//cityNode.setAll(city, null, counties);
				//cities = new ArrayList<>();
				//cities.add(cityNode);
				//province = provinceMapper.selectByCode(city.getProcode());
				//provinceNode.setAll(province, null, cities);
				
				return JSON.toJSONString(countyNode);
			} catch (Exception e3) {
				e3.printStackTrace();
				return null;
			}
			
			
		case "namesec":
			//find and generate namesec node.
			try {
				nameSec = nameSecMapper.selectByCode(user.getNamesec());
				nameSecNode = new DeepNode<>();
				nameSecNode.setAll(nameSec, null, null);
				namesecs = new ArrayList<>();
				namesecs.add(nameSecNode);
				//set county
				//county = countyMapper.selectByCode(nameSec.getCoucode());
				//countyNode = new DeepNode<>();
				//countyNode.setAll(county, null, namesecs);
				//counties = new ArrayList<>();
				//counties.add(countyNode);
				//set city
				//city = cityMapper.selectByCode(county.getCitycode());
				//cityNode = new DeepNode<>();
				//cityNode.setAll(city, null, counties);
				//cities = new ArrayList<>();
				//cities.add(cityNode);
				//set province
				//province = provinceMapper.selectByCode(city.getProcode());
				//provinceNode = new DeepNode<>();
				//provinceNode.setAll(province, null, cities);
				
				return JSON.toJSONString(nameSecNode);
			} catch (Exception e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
				return null;
			}
			
		case "town":
			//find and generate namesec node.
			try {
				town = townMapper.selectByCode(user.getTowncode());
				townNode = new DeepNode<>();
				townNode.setAll(town, null, null);
				towns = new ArrayList<>();
				towns.add(townNode);
				
				//nameSec = nameSecMapper.selectByCode(town.getNamsec());
				//nameSecNode = new DeepNode<>();
				//nameSecNode.setAll(nameSec, null, towns);
				//namesecs = new ArrayList<>();
				//namesecs.add(nameSecNode);

				//set county
				//county = countyMapper.selectByCode(nameSec.getCoucode());
				//countyNode = new DeepNode<>();
				//countyNode.setAll(county, null, namesecs);
				//counties = new ArrayList<>();
				//counties.add(countyNode);
				//set city
				//city = cityMapper.selectByCode(county.getCitycode());
				//cityNode = new DeepNode<>();
				//cityNode.setAll(city, null, counties);
				//cities = new ArrayList<>();
				//cities.add(cityNode);
				//set province
				//province = provinceMapper.selectByCode(city.getProcode());
				//provinceNode = new DeepNode<>();
				//provinceNode.setAll(province, null, cities);
				
				return JSON.toJSONString(townNode);
			} catch (Exception e1) {
				e1.printStackTrace();
				return null;
			}
			
		case "village":
			try {
				village = villageMapper.selectByCode(user.getVilcode());
				if(village == null)return null;
				villageNode = new DeepNode<>();
				villageNode.setAll(village, null, null);
				System.out.println(JSON.toJSON(villageNode));
				villages = new ArrayList<>();
				villages.add(villageNode);
				
				//town = townMapper.selectByCode(village.getTowncode());
				//townNode = new DeepNode<>();
				//townNode.setAll(town, null, villages);
				//towns = new ArrayList<>();
				//towns.add(townNode);
				
				//nameSec = nameSecMapper.selectByCode(town.getNamsec());
				//nameSecNode = new DeepNode<>();
				//nameSecNode.setAll(nameSec, null, towns);
				//namesecs = new ArrayList<>();
				//namesecs.add(nameSecNode);

				//set county
				//county = countyMapper.selectByCode(nameSec.getCoucode());
				//countyNode = new DeepNode<>();
				//countyNode.setAll(county, null, namesecs);
				//counties = new ArrayList<>();
				//counties.add(countyNode);
				//set city
				//city = cityMapper.selectByCode(county.getCitycode());
				//cityNode = new DeepNode<>();
				//cityNode.setAll(city, null, counties);
				//cities = new ArrayList<>();
				//cities.add(cityNode);
				//set province
				//province = provinceMapper.selectByCode(city.getProcode());
				//provinceNode = new DeepNode<>();
				//provinceNode.setAll(province, null, cities);
				
				return JSON.toJSONString(villageNode);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		}
		return null;
	}

	@Override
	public String getChildren(String OBJECTID, String role) {
		Province province = null;
		City city = null;
		County county = null;
		NameSec namesec = null;
		Town town = null;
		//Village village = null;
		List<City> cityChildren = null;
		List<County> countyChildren = null;
		List<NameSec> nameSecChildren = null;
		List<Town> townChildren = null;
		List<Village> villageChildren = null;
		List<DeepNode<?>> children = null;
		DeepNode<?> deepNode = null;
		switch(role) {
		case "province":
			province = provinceMapper.selectById(OBJECTID);
			cityChildren = cityMapper.selectByProCode(province.getProcode());
			children = new ArrayList<>();
			for(City c: cityChildren) {
				if(!c.getYesno().equals("否")) {
					deepNode = new DeepNode<>();
					deepNode.setAll(c, null, null);
					children.add(deepNode);	
				}
			}
			return JSON.toJSONString(children);
		case "city":
			city = cityMapper.selectById(OBJECTID);
			countyChildren = countyMapper.selectByCityName(city.getCityname());
			children = new ArrayList<>();
			for(County c: countyChildren) {
				if(!c.getYesno().equals("否")) {
					deepNode = new DeepNode<>();
					deepNode.setAll(c, null, null);
					children.add(deepNode);
				}
			}
			return JSON.toJSONString(children);
		case "county":
			county = countyMapper.selectById(OBJECTID);
			nameSecChildren = nameSecMapper.selectByCountyName(county.getCouname());
			children = new ArrayList<>();
			for(NameSec nc: nameSecChildren) {
				if(!nc.getYesno().equals("否")) {
					deepNode = new DeepNode<>();
					deepNode.setAll(nc, null, null);
					children.add(deepNode);
				}
			}
			return JSON.toJSONString(children);
		case "namesec":
			namesec = nameSecMapper.selectById(OBJECTID);
			townChildren = townMapper.selectByNameSec(namesec.getNamsec());
			children = new ArrayList<>();
			for(Town t: townChildren) {
				if(!t.getYesno().equals("否")) {
					deepNode = new DeepNode<>();
					deepNode.setAll(t, null, null);
					children.add(deepNode);
				}
			}
			return JSON.toJSONString(children);
		case "town":
			town = townMapper.selectById(OBJECTID);
			villageChildren = villageMapper.selectByTownName(town.getTownname());
			children = new ArrayList<>();
			for(Village v: villageChildren) {
				if(!v.getYesno().equals("否")) {
					deepNode = new DeepNode<>();
					deepNode.setAll(v, null, null);
					children.add(deepNode);
				}
			}
			return JSON.toJSONString(children);
		case "village":
			return null;
		}
		return null;
	}

	@Override
	public String getNodeInfo(String oBJECTID, String role) {
		Province province = new Province();
		City city = new City();
		County county = new County();
		NameSec namesec = new NameSec();
		Town town = new Town();
		Village village = new Village();
		switch(role) {
		case "province":
			try {
				province = provinceMapper.selectById(oBJECTID);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return JSON.toJSONString(province);
		case "city":
			try {
				city = cityMapper.selectById(oBJECTID);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return JSON.toJSONString(city);
		case "county":
			try {
				county = countyMapper.selectById(oBJECTID);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return JSON.toJSONString(county);
		case "namesec":
			try {
				namesec = nameSecMapper.selectById(oBJECTID);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return JSON.toJSONString(namesec);
		case "town":
			try {
				town = townMapper.selectById(oBJECTID);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return JSON.toJSONString(town);
		case "village":
			try {
				village = villageMapper.selectById(oBJECTID);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return JSON.toJSONString(village);
		}
		return null;
	}
	//备份  该方法能获取当前节点和他的父节点的信息
	/*
	 public String getFatherAndSelf(String role,Integer userid) {
		//select user.
		User user = null;
		try {
			user = userMapper.selectByPrimaryKey(userid);
		} catch (Exception e) {
			System.out.println("user is null");
			e.printStackTrace();
			return null;
		}
		//firstly.get the curren node's name
		DeepNode<String> provinceNode = new DeepNode<>();
		DeepNode<String> cityNode = new DeepNode<>();
		DeepNode<String> countyNode = new DeepNode<>();
		DeepNode<String> nameSecNode = new DeepNode<>();
		DeepNode<String> townNode = new DeepNode<>();
		DeepNode<String> villageNode = new DeepNode<>();
		
		Province province = null;
		County county = null;
		NameSec nameSec = null;
		Town town = null;
		Village village = null;
		
		List<DeepNode<?>> cities;
		List<DeepNode<?>> counties;
		List<DeepNode<?>> namesecs;
		List<DeepNode<?>> towns;
		List<DeepNode<?>> villages;
		switch(role) {
		//find district code or name. new some nodes.then....you know it!
		case "province":
			
			//find province info.
			province = provinceMapper.selectByCode(user.getProcode()); //didn't handle the exception
			if(province != null) {
				provinceNode.setAll(province, null, null);
			}
			return JSON.toJSONString(provinceNode);
		case "city":
			//define data model firstly
			provinceNode = new DeepNode<>();
			cityNode = new DeepNode<>();
			//finde city
			City city = cityMapper.selectByCode(user.getCitycode());
			//make a city data object
			cityNode.setAll(city, null, null);
			//make city node  as a list
			List<DeepNode<?>> cityNodes = new ArrayList<>();
			cityNodes.add(cityNode);
			//make a province node
			province = provinceMapper.selectByCode(city.getProcode());
			provinceNode.setAll(province, null, cityNodes);
			//return
			return JSON.toJSONString(provinceNode);
		case "county":
			countyNode = new DeepNode<>();
			cityNode = new DeepNode<>();
			provinceNode = new DeepNode<>();
			county = countyMapper.selectByCode(user.getCoucode());
			
			countyNode.setAll(county, null, null);
			counties = new ArrayList<>();
			counties.add(countyNode);
			
			city = cityMapper.selectByCode(county.getCitycode());
			cityNode.setAll(city, null, counties);
			cities = new ArrayList<>();
			cities.add(cityNode);
			province = provinceMapper.selectByCode(city.getProcode());
			provinceNode.setAll(province, null, cities);
			
			return JSON.toJSONString(provinceNode);
		case "namesec":
			//find and generate namesec node.
			nameSec = nameSecMapper.selectByCode(user.getNamesec());
			nameSecNode = new DeepNode<>();
			nameSecNode.setAll(nameSec, null, null);
			namesecs = new ArrayList<>();
			namesecs.add(nameSecNode);
			//set county
			county = countyMapper.selectByCode(nameSec.getCoucode());
			countyNode = new DeepNode<>();
			countyNode.setAll(county, null, namesecs);
			counties = new ArrayList<>();
			counties.add(countyNode);
			//set city
			city = cityMapper.selectByCode(county.getCitycode());
			cityNode = new DeepNode<>();
			cityNode.setAll(city, null, counties);
			cities = new ArrayList<>();
			cities.add(cityNode);
			//set province
			province = provinceMapper.selectByCode(city.getProcode());
			provinceNode = new DeepNode<>();
			provinceNode.setAll(province, null, cities);
			
			return JSON.toJSONString(provinceNode);
		case "town":
			//find and generate namesec node.
			town = townMapper.selectByCode(user.getTowncode());
			townNode = new DeepNode<>();
			townNode.setAll(town, null, null);
			towns = new ArrayList<>();
			towns.add(townNode);
			
			nameSec = nameSecMapper.selectByCode(town.getNamsec());
			nameSecNode = new DeepNode<>();
			nameSecNode.setAll(nameSec, null, towns);
			namesecs = new ArrayList<>();
			namesecs.add(nameSecNode);

			//set county
			county = countyMapper.selectByCode(nameSec.getCoucode());
			countyNode = new DeepNode<>();
			countyNode.setAll(county, null, namesecs);
			counties = new ArrayList<>();
			counties.add(countyNode);
			//set city
			city = cityMapper.selectByCode(county.getCitycode());
			cityNode = new DeepNode<>();
			cityNode.setAll(city, null, counties);
			cities = new ArrayList<>();
			cities.add(cityNode);
			//set province
			province = provinceMapper.selectByCode(city.getProcode());
			provinceNode = new DeepNode<>();
			provinceNode.setAll(province, null, cities);
			
			return JSON.toJSONString(provinceNode);
		case "village":
			village = villageMapper.selectByCode(user.getVilcode());
			villageNode = new DeepNode<>();
			villageNode.setAll(village, null, null);
			villages = new ArrayList<>();
			villages.add(villageNode);
			
			town = townMapper.selectByCode(village.getTowncode());
			townNode = new DeepNode<>();
			townNode.setAll(town, null, villages);
			towns = new ArrayList<>();
			towns.add(townNode);
			
			nameSec = nameSecMapper.selectByCode(town.getNamsec());
			nameSecNode = new DeepNode<>();
			nameSecNode.setAll(nameSec, null, towns);
			namesecs = new ArrayList<>();
			namesecs.add(nameSecNode);

			//set county
			county = countyMapper.selectByCode(nameSec.getCoucode());
			countyNode = new DeepNode<>();
			countyNode.setAll(county, null, namesecs);
			counties = new ArrayList<>();
			counties.add(countyNode);
			//set city
			city = cityMapper.selectByCode(county.getCitycode());
			cityNode = new DeepNode<>();
			cityNode.setAll(city, null, counties);
			cities = new ArrayList<>();
			cities.add(cityNode);
			//set province
			province = provinceMapper.selectByCode(city.getProcode());
			provinceNode = new DeepNode<>();
			provinceNode.setAll(province, null, cities);
			
			return JSON.toJSONString(provinceNode);
		}
		return null;
	}
	 */

	@Override
	public String getNodeInfoByName(String parentName,String name, String role) {
		Province province = null;
		City city = null;
		County county = null;
		NameSec namesec = null;
		Town town = null;
		Village village = null;
		if(role.equals("province")) {
			try {
				province = provinceMapper.selectByName(name);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			return JSON.toJSONString(province);
		}else if(role.equals("city")) {
			try {
				city = cityMapper.selectByName(parentName,name);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			return JSON.toJSONString(city);
		}else if(role.equals("county")) {
			try {
				county = countyMapper.selectByName(parentName,name);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			return JSON.toJSONString(county);
		}else if(role.equals("namesec")) {
			try {
				namesec = nameSecMapper.selectByCode(name);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			return JSON.toJSONString(namesec);
		}else if(role.equals("town")) {
			try {
				town = townMapper.selectByName(parentName,name);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			return JSON.toJSONString(town);
		}else if(role.equals("village")) {
			try {
				//System.out.println(parentName + "," + name);
				village = villageMapper.selectByName(parentName,name);
				//System.err.println("xxxsxsxsxsxsx:" + village); 
				
				
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			return JSON.toJSONString(village);
		}
		return null;
	}

}
