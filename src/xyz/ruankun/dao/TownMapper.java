package xyz.ruankun.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import xyz.ruankun.model.Town;

public interface TownMapper {
    int insert(Town record);

    int insertSelective(Town record);

	Town selectByCode(String towncode);

	List<Town> selectByProCode(String procode);

	List<Town> selectByNameSec(String currentNodeName);
	
	Town selectById(String OBJECTID);

	Town selectByName(@Param("parentName") String parentName,@Param("name")String name);
}