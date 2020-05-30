package com.zzz.service.impl;

import com.zzz.bean.User;
import com.zzz.dao.UserDao;
import com.zzz.dao.imp.UserDaoImpl;
import com.zzz.service.UserService;

public class UserServiceImpl implements UserService {

    private UserDao userDao = new UserDaoImpl();

    @Override
    public void registUser(User user) {
        int i = userDao.saveUser(user);
        if(i > 0){
            System.out.println("数据保存成功！");
        }else {
            System.out.println("数据插入失败");
        }
    }

    @Override
    public User login(User user) {
        return userDao.queryUserByUsernameAndPassword(user.getUsername(), user.getPassword());
    }

    @Override
    public boolean existsUsername(String username) {
        if (userDao.queryUserByUsername(username) == null) {
           // 等于null,说明没查到，没查到表示可用
           return false;
        }
        return true;

    }

    @Override
    public boolean updatePassword(String username, String phone,String password) {
        int i = userDao.updatePassword(username, phone, password);
        if(i>0)
            return true;
        return false;
    }
}
