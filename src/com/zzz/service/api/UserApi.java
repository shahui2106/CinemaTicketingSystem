package com.zzz.service.api;

import com.google.gson.Gson;
import com.zzz.bean.Statue;
import com.zzz.bean.User;
import com.zzz.dao.imp.UserDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Zhu
 * @createtime 2020/5/10-20:51
 */
public class UserApi extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html; charset=UTF-8");
        UserDaoImpl userDao = new UserDaoImpl();
        Gson gson = new Gson();
        Statue statue = new Statue();
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        User user = userDao.queryUserByUsernameAndPassword(username, password);
        if(user == null)
        {
            statue.setStatue(500);
            statue.setMessage("未查到该信息！");
            statue.setObject(null);
        }else{
            statue.setStatue(200);
            statue.setMessage("成功获取！");
            statue.setObject(user);
        }
        resp.getWriter().write(gson.toJson(statue));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
