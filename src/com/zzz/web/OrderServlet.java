package com.zzz.web;

import com.zzz.bean.OrderInfo;
import com.zzz.bean.User;
import com.zzz.service.OrderService;
import com.zzz.service.impl.OrderServiceImpl;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/29-22:08
 */
public class OrderServlet extends BaseServlet {
    OrderService orderService = new OrderServiceImpl();

    //保持线程同步，避免出现同一个座位销售多次
    protected synchronized void addOrder(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        OrderInfo order = (OrderInfo) req.getSession().getAttribute("order");
        if (order != null) {
            int i = orderService.addOrder(order, req);
            if (i > 0) {
                req.getSession().setAttribute("payment", "success");
                req.getSession().setAttribute("paymentRes", null);
            } else {
                req.getSession().setAttribute("payment", "defeat");
            }
            resp.sendRedirect("/CTicket/pages/order/payment_success.jsp");
        }
    }

    protected void queryOrder(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        User user = (User) req.getSession().getAttribute("user");
        List<OrderInfo> allOrder = orderService.getAllOrder(user);
        req.getSession().setAttribute("MyOrder", allOrder);
        resp.sendRedirect("/CTicket/pages/order/order.jsp");
    }


    protected void removeOrder(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String fid = req.getParameter("fid");
        if(fid != null && !fid.equals("undefined")){
            int i = orderService.removeOrder(fid);
            if (i > 0) {
                req.getSession().setAttribute("removeOrder", "success");
            } else {
                req.getSession().setAttribute("removeOrder", "defeat");
            }
            resp.sendRedirect("/CTicket/pages/order/order_success.jsp");
        }
    }

}
