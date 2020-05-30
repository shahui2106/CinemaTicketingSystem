package com.zzz.web;

import com.zzz.bean.CinemaItem;
import com.zzz.bean.Screen;
import com.zzz.dao.imp.CinemaDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/22-14:32
 */
public class ChooseCinemaServlet extends HttpServlet {
    CinemaDaoImpl cinemaDao = new CinemaDaoImpl();
    List<Screen> screens;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        String filmName = "";
        String encoding = req.getParameter("encoding");
        if (encoding != null)
            filmName = new String(req.getParameter("filmName").getBytes("iso-8859-1"), "utf-8");
        else
            filmName = req.getParameter("filmName");
        req.getSession().setAttribute("filmName", filmName);
        if (filmName != null) {
            screens = cinemaDao.queryScreenByMovieName(filmName);
            req.getSession().setAttribute("cinemaItems", getCinemaItems(screens));
            req.getSession().setAttribute("screens", screens);
            resp.sendRedirect("/CTicket/pages/order/film_cinema.jsp");
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    public List<CinemaItem> getCinemaItems(List<Screen> screens) {
        List<CinemaItem> cinemaItems = new ArrayList<>();
        for (Screen screen : screens) {
            int cid = screen.getCid();
            boolean isExist = false;
            for (CinemaItem cinemaItem : cinemaItems) {
                if (cinemaItem.getCid() == cid) {
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                CinemaItem cinemaItem = new CinemaItem();
                cinemaItem.setAddress(screen.getAddress());
                cinemaItem.setCid(cid);
                cinemaItem.setName(screen.getName());
                cinemaItem.setPrice(screen.getPrice());
                cinemaItem.setPhone(screen.getPhone());
                cinemaItem.setShow_date(new ArrayList<String>());
                cinemaItems.add(cinemaItem);
            }

            for (CinemaItem cinemaItem : cinemaItems) {
                if (cinemaItem.getCid() == cid) {
                    cinemaItem.getShow_date().add(screen.getShow_date().toString() + " " + screen.getShow_time());
                    if (screen.getPrice() < cinemaItem.getPrice()) {
                        cinemaItem.setPrice(screen.getPrice());
                    }
                }
            }
        }
        return cinemaItems;
    }
}
