package xyz.ruankun.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import xyz.ruankun.model.City;

public interface CityMapper {
    int insert(City record);

    int insertSelective(City record);

	City selectByCode(String citycode);

	List<City> selectByProCode(String procode);

	List<City> selectByProName(String proname);
	
	City selectById(String OBJECTID_1);

	City selectByName(@Param("parentName") String parentName,@Param("name") String name);
}