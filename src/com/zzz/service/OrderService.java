package com.zzz.service;


import com.zzz.bean.OrderInfo;
import com.zzz.bean.User;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface OrderService {
    /**
     * 添加用户订单
     * @param order
     */
    public int addOrder(OrderInfo order, HttpServletRequest req);

    /**
     * 删除一个订单
     * @param fid
     */
    public int removeOrder(String fid);

    /**
     * 获取一个用户订单
     * @return 返回null表示没有该订单，反之亦然
     */
    public OrderInfo getOneOrder(User user);

    public List<OrderInfo> getAllOrder(User user);
}
