package xyz.ruankun.dao;

import java.util.List;

import xyz.ruankun.model.Province;

public interface ProvinceMapper {
    int insert(Province record);

    int insertSelective(Province record);

	Province selectByCode(String procode);
	
	List<Province> selectByProCode(String procode);
	
	Province selectById(String OBJECTID_1);
}