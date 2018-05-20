package xyz.ruankun.dao;

import java.util.List;

import xyz.ruankun.model.City;

public interface CityMapper {
    int insert(City record);

    int insertSelective(City record);

	City selectByCode(String citycode);

	List<City> selectByProCode(String procode);

	List<xyz.ruankun.model.City> selectByProName(String proname);
	
	City selectById(String OBJECTID_1);
}