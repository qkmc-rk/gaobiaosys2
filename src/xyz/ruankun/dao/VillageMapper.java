package xyz.ruankun.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import xyz.ruankun.model.Village;

public interface VillageMapper {
    int insert(Village record);

    int insertSelective(Village record);

	Village selectByCode(String vilcode);

	List<Village> selectByProCode(String procode);

	List<Village> selectByTownName(String currentNodeName);
	
	Village selectById(String OBJECTID);

	Village selectByName(@Param("parentName") String parentName,@Param("name") String name);
}