package com.zzz.service.api;

import com.google.gson.Gson;
import com.zzz.bean.Cinema;
import com.zzz.bean.Movie;
import com.zzz.bean.Statue;
import com.zzz.dao.imp.CinemaDaoImpl;
import com.zzz.dao.imp.MovieDaoImpl;
import com.zzz.utils.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/18-17:03
 */
public class CinemaRecycleApi extends HttpServlet {
    CinemaDaoImpl cinemaDao = new CinemaDaoImpl();
    Statue statue = new Statue();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        String city = new String(req.getParameter("city").getBytes("iso-8859-1"), "utf-8");
        if (city != null) {
            System.out.println("city = " + city);
            city = city.replace("市", "");
            List<Cinema> cinemas = cinemaDao.queryCinemaByCity(city);
            if (cinemas.size() != 0) {
                statue.setStatue(200);
                statue.setMessage("电影列表获取成功！");
                statue.setObject(cinemas);
            } else {
                statue.setStatue(1);
                statue.setMessage("没有当前城市影院信息");
                statue.setObject(null);
            }
        } else {
            statue.setStatue(0);
            statue.setMessage("没有获取到电影院列表信息");
            statue.setObject(null);
        }
        resp.getWriter().write(new Gson().toJson(statue));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
