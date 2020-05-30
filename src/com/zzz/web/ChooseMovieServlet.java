package com.zzz.web;

import com.zzz.bean.Cinema;
import com.zzz.bean.Screen;
import com.zzz.dao.imp.CinemaDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/25-19:23
 */
public class ChooseMovieServlet extends HttpServlet {
    CinemaDaoImpl cinemaDao = new CinemaDaoImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        String type = req.getParameter("type");
        if (type != null) {
            if (type.equals("cinema"))
                isCinema(req, resp);
            else if (type.equals("search")) {
                isSearch(req, resp);
            }
        }
    }

    private void isSearch(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String search = req.getParameter("search");
        List<Cinema> cinemas = cinemaDao.queryIsExistCinema(search);
        List<Screen> screens = cinemaDao.queryScreenByCinemaNameOrDirectorOrActors(search);
        req.getSession().setAttribute("movieByCinemaName", screens);
        req.getSession().setAttribute("search", search);
        if(cinemas.size() != 0)
        {
            req.getSession().setAttribute("cinema", cinemas.get(0).getName());
            screens = cinemaDao.queryScreenByCinemaName(cinemas.get(0).getName());
            req.getSession().setAttribute("movieByCinemaName", screens);
        }
        else
            req.getSession().setAttribute("cinema", null);
        resp.sendRedirect("/CTicket/pages/order/filmrecycle.jsp");
    }

    private void isCinema(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String cinemaName = new String(req.getParameter("cinemaName").getBytes("iso-8859-1"), "UTF-8");
        if (cinemaName != null) {
            List<Screen> screens = cinemaDao.queryScreenByCinemaName(cinemaName);
            req.getSession().setAttribute("movieByCinemaName", screens);
            req.getSession().setAttribute("cinema", cinemaName);
            req.getSession().setAttribute("search", null);
            resp.sendRedirect("/CTicket/pages/order/filmrecycle.jsp");
        }
    }
}
