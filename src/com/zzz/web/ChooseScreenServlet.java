package com.zzz.web;

import com.zzz.bean.Movie;
import com.zzz.bean.Screen;
import com.zzz.dao.imp.CinemaDaoImpl;
import com.zzz.dao.imp.MovieDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/22-14:32
 */
public class ChooseScreenServlet extends HttpServlet {
    List<Screen> screens = new ArrayList<>();
    MovieDaoImpl movieDao = new MovieDaoImpl();
    CinemaDaoImpl cinemaDao = new CinemaDaoImpl();
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        String type = req.getParameter("type");
        System.out.println("type = " + type);
        if (type != null) {
            if (type.equals("cinema"))
                isCInemaInfo(req, resp);
            else if (type.equals("movie"))
                isMovieInfo(req, resp);
            req.getSession().setAttribute("ticketsScreens", screens);
            resp.sendRedirect("/CTicket/pages/order/tickets.jsp");
        }
    }

    private void isMovieInfo(HttpServletRequest req, HttpServletResponse resp) throws UnsupportedEncodingException {
        String movie = new String(req.getParameter("Movie").getBytes("iso-8859-1"),"utf-8");
        System.out.println("movie = " + movie);
        String cinema = (String) req.getSession().getAttribute("cinema");
        if(movie!=null && cinema != null){
            screens = cinemaDao.queryScreenByMovieNameAndCinemaName(movie, cinema);
        }
        req.getSession().setAttribute("cinema", cinema);
        req.getSession().setAttribute("filmName", movie);
        Movie movieInfo = movieDao.querySingleMovieInfoByName(movie);
        req.getSession().setAttribute("movieInfo", movieInfo);
    }

    private void isCInemaInfo(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String cinema = req.getParameter("cinema");
        String filmName = (String) req.getSession().getAttribute("filmName");
        List<Screen> tmpScreen = (ArrayList<Screen>) req.getSession().getAttribute("screens");
        //判断此电影院是否在之前的列表中
        for (Screen screen : tmpScreen) {
            if (screen.getName().equals(cinema))
                screens.add(screen);
        }
        req.getSession().setAttribute("cinema", cinema);
        Movie movieInfo = movieDao.querySingleMovieInfoByName(filmName);
        req.getSession().setAttribute("movieInfo", movieInfo);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req,resp);
    }
}
