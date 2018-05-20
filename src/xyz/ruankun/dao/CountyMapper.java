package xyz.ruankun.dao;

import java.util.List;

import xyz.ruankun.model.County;

public interface CountyMapper {
    int insert(County record);

    int insertSelective(County record);

	County selectByCode(String coucode);

	List<County> selectByProCode(String procode);

	List<County> selectByCityName(String cityname);
	
	County selectById(String OBJECTID);
}