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

	@Override
	public String getChildren(Integer OBJECTID, String role) {
		Province province = null;
		City city = null;
		County county = null;
		
		switch(role) {
		case "province":
			
			break;
		case "city":
			break;
		case "county":
			break;
		case "namesec":
			break;
		case "town":
			break;
		case "village":
			break;
		}
		return null;
	}

}
