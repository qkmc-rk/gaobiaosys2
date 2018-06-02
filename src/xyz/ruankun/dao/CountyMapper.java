package xyz.ruankun.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import xyz.ruankun.model.County;

public interface CountyMapper {
    int insert(County record);

    int insertSelective(County record);

	County selectByCode(String coucode);

	List<County> selectByProCode(String procode);

	List<County> selectByCityName(String cityname);
	
	County selectById(String OBJECTID);

	County selectByName(@Param("parentName") String parentName,@Param("name") String name);
}