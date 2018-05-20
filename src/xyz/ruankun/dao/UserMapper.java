package xyz.ruankun.dao;

import xyz.ruankun.model.User;

public interface UserMapper {
    int deleteByPrimaryKey(Integer objectid);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer objectid);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

	User selectByAccount(String account);
}