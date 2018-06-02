package xyz.ruankun.dao;

import java.util.List;

import xyz.ruankun.model.NameSec;

public interface NameSecMapper {
    int insert(NameSec record);

    int insertSelective(NameSec record);

	NameSec selectByCode(String namesec);

	List<NameSec> selectByProCode(String procode);

	List<NameSec> selectByCountyName(String currentNodeName);
	
	NameSec selectById(String OBJECTID);

	NameSec selectByName(String name);
}