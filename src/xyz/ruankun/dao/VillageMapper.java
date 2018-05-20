package xyz.ruankun.dao;

import java.util.List;

import xyz.ruankun.model.Village;

public interface VillageMapper {
    int insert(Village record);

    int insertSelective(Village record);

	Village selectByCode(String vilcode);

	List<Village> selectByProCode(String procode);

	List<Village> selectByTownName(String currentNodeName);
	
	Village selectById(String OBJECTID);
}