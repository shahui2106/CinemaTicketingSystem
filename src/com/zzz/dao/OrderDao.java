package com.zzz.dao;


import com.zzz.bean.Order;
import com.zzz.bean.OrderInfo;

import java.util.List;

public interface OrderDao {

    /**
     * 添加订单
     * @param order
     */
    public int addOrder(OrderInfo order,String mergeSeat);

    /**
     * 删除订单
     * @param fid
     */
   public int removeOrder(int fid);

    /**
     * 查询用户的所有订单
     * @param uid 用户id
     * @return
     */
   public List<Order> queryAllOrderByUid(int uid);

   public Order queryOneByFid(int fid);


    public int updateOrder(Order order);

}
