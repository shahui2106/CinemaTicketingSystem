package com.zzz.service.impl;

import com.zzz.bean.Order;
import com.zzz.bean.OrderInfo;
import com.zzz.bean.Screen;
import com.zzz.bean.User;
import com.zzz.dao.imp.CinemaDaoImpl;
import com.zzz.dao.imp.OrderDaoImpl;
import com.zzz.service.OrderService;
import com.zzz.utils.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

public class OrderServiceImpl implements OrderService {
    OrderDaoImpl orderDao = new OrderDaoImpl();
    CinemaDaoImpl cinemaDao = new CinemaDaoImpl();

    @Override
    public int addOrder(OrderInfo order, HttpServletRequest req) {
        String screen_seat = cinemaDao.querySeatBySid(order.getSid());
        int res = 0;
        List<String> resList = new ArrayList<>();
        if ((resList = StringUtils.compare(screen_seat, order.getSeat())).size() != 0) {
            System.out.println("改票已经买过了" + resList);
            req.getSession().setAttribute("paymentRes", resList);
            res = -1;
        } else {
            String mergeSeat = StringUtils.merge(screen_seat, order.getSeat());
            System.out.println("mergeSeat = " + mergeSeat);
            res = orderDao.addOrder(order, mergeSeat);
            if (res > 0) {
                System.out.println("订单保存成功");
            } else {
                System.out.println("订单保存失败");
            }
        }
        return res;
    }

    @Override
    public int removeOrder(String fid) {
        Order order = orderDao.queryOneByFid(Integer.parseInt(fid));
        String screen_seat = cinemaDao.querySeatBySid(order.getSid());
        order.setSeat(updateSeat(order.getSeat(), screen_seat));
        int i = orderDao.updateOrder(order);
        if (i > 0) {
            int i1 = orderDao.removeOrder(order.getFid());
            if (i1 > 0)
                System.out.println("订单删除成功");
            else
                System.out.println("订单删除失败");
        } else {
            System.out.println("订单删除失败");
        }
        return i;
    }

    @Override
    public OrderInfo getOneOrder(User user) {
        return null;
    }

    @Override
    public List<OrderInfo> getAllOrder(User user) {
        List<OrderInfo> resOrder = new ArrayList<>();
        List<Order> orders = orderDao.queryAllOrderByUid(user.getUid());
        if (orders.size() != 0) {
            for (Order order : orders) {
                OrderInfo orderInfo = new OrderInfo();
                Screen screen = cinemaDao.queryScreenBySid(order.getSid());
                orderInfo.setFilmName(screen.getChinese_name());
                orderInfo.setCinemaName(screen.getName());
                orderInfo.setShow_date(screen.getShow_date());
                orderInfo.setShow_time(screen.getShow_time());
                orderInfo.setRoom(screen.getRoom());
                orderInfo.setUserPhone(user.getPhone());
                orderInfo.setFid(order.getFid());
                char[] chars = order.getSeat().toCharArray();
                int ticketNum = 0;
                List<String> seats = new ArrayList<>();
                for (int i = 0; i < chars.length; i++) {
                    if (chars[i] == '1') {
                        int cur = i + 1;
                        ticketNum++;
                        if (cur % 17 != 0)
                            seats.add((cur / 17 + 1) + "排" + (cur % 17) + "座");
                        else
                            seats.add((cur / 17) + "排" + 17 + "座");
                    }
                }
                orderInfo.setSeatList(seats);
                orderInfo.setTicketNum(ticketNum);
                orderInfo.setTicketSum(ticketNum * screen.getPrice());
                resOrder.add(orderInfo);
            }
        }
        return resOrder;
    }

    public static String updateSeat(String film_order_seat, String screen_seat) {
        char[] chars1 = film_order_seat.toCharArray();
        char[] chars2 = screen_seat.toCharArray();
        StringBuffer res = new StringBuffer();
        for (int i = 0; i < chars1.length; i++) {
            if (chars1[i] == '1' && chars2[i] == '1') {
                res.append('0');
            } else {
                res.append(chars2[i]);
            }
        }
        return res.toString();
    }
}
