package com.zzz.web;

import com.zzz.bean.Screen;
import com.zzz.dao.imp.CinemaDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Zhu
 * @createtime 2020/5/28-22:35
 */
public class ChooseSeatServlet extends HttpServlet {
    CinemaDaoImpl cinemaDao = new CinemaDaoImpl();
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        int sid = 0;
        try {
            sid = Integer.parseInt(req.getParameter("sid"));
            Screen screen = cinemaDao.queryScreenBySid(sid);
            req.getSession().setAttribute("ticketScreen",screen);
            resp.sendRedirect("/CTicket/pages/order/choose_seat.jsp");
        } catch (NumberFormatException e) {
            e.printStackTrace();
        } catch (NullPointerException e){
            System.out.println("未获取到sid");
        }

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }
}
