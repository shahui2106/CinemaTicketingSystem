package com.zzz.web;

import com.zzz.bean.OrderInfo;
import com.zzz.bean.Screen;
import com.zzz.bean.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/29-16:08
 */
public class PaymentServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        String seat = req.getParameter("seat");
        System.out.println("seat = " + seat);
        if (seat != null) {
            char[] chars = seat.toCharArray();
            List<String> seats = new ArrayList<>();
            OrderInfo orderInfo = new OrderInfo();
            int ticketNum = 0;
            for (int i = 0; i < chars.length; i++) {
                if (chars[i] == '1') {
                    int cur = i+1;
                    ticketNum++;
                    if (cur % 17 != 0)
                        seats.add((cur / 17 + 1) + "排" + (cur % 17) + "座");
                    else
                        seats.add((cur / 17) + "排" + 17 + "座");
                }
            }
            Screen ticketScreen = (Screen) req.getSession().getAttribute("ticketScreen");
            User user = (User) req.getSession().getAttribute("user");
            orderInfo.setCinemaName(ticketScreen.getName());
            orderInfo.setFilmName(ticketScreen.getChinese_name());
            orderInfo.setRoom(ticketScreen.getRoom());
            orderInfo.setSeatList(seats);
            orderInfo.setSeat(seat);
            orderInfo.setShow_date(ticketScreen.getShow_date());
            orderInfo.setShow_time(ticketScreen.getShow_time());
            orderInfo.setUserPhone(user.getPhone());
            orderInfo.setUid(user.getUid());
            orderInfo.setTicketNum(ticketNum);
            orderInfo.setTicketSum((ticketNum*ticketScreen.getPrice()));
            orderInfo.setSid(ticketScreen.getSid());
            req.getSession().setAttribute("order", orderInfo);
            resp.sendRedirect("/CTicket/pages/order/payment.jsp");
        }
    }


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

}
