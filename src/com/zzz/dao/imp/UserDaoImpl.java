package com.zzz.dao.imp;


import com.zzz.bean.User;
import com.zzz.dao.BaseDao;
import com.zzz.dao.UserDao;

public class UserDaoImpl extends BaseDao implements UserDao {
    @Override
    public User queryUserByUsername(String username) {
        String sql = "select * from user where username = ?";
        return queryForOne(User.class, sql, username);
    }

    @Override
    public User queryUserByUsernameAndPassword(String username, String password) {
        String sql = "select * from user where username = ? and password = ?";
        return queryForOne(User.class, sql, username,password);
    }

    @Override
    public int saveUser(User user) {
        String sql = "insert into user(username,password,type,phone) values(?,?,?,?)";
        return update(sql, user.getUsername(),user.getPassword(),user.getType(),user.getPhone());
    }
}
