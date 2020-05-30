package com.zzz.dao.imp;

import com.zzz.bean.Order;
import com.zzz.bean.OrderInfo;
import com.zzz.dao.BaseDao;
import com.zzz.dao.OrderDao;

import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/22-14:12
 */
public class OrderDaoImpl extends BaseDao implements OrderDao {


    public static void main(String[] args) {
        OrderDaoImpl cinemaDao = new OrderDaoImpl();
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setSid(0);
        orderInfo.setUid(1);
        orderInfo.setSeat("000000000000000000000000000000000000000000000000000000000");
        System.out.println(cinemaDao.removeOrder(orderInfo.getFid()));
    }

    @Override
    public int addOrder(OrderInfo order,String mergeSeat) {
        String sql = "insert into film_order (sid,uid,seat) values(?,?,?)";
        String sql2 = "update screen set seat = ? where sid = ?";
        int update = update(sql2, mergeSeat, order.getSid());
        return update(sql,order.getSid(),order.getUid(),order.getSeat()) & update;
    }

    @Override
    public int removeOrder(int fid) {
        String sql = "delete from film_order where fid = ?";
        return update(sql,fid);
    }

    @Override
    public List<Order> queryAllOrderByUid(int uid) {
        String sql = "select * from film_order where uid = ?";
        return queryForList(Order.class,sql,uid);
    }

    @Override
    public Order queryOneByFid(int fid) {
        String sql = "select * from film_order where fid = ?";
        return queryForOne(Order.class,sql,fid);
    }

    @Override
    public int updateOrder(Order order) {
        String sql = "update screen set seat = ? where sid = ?";
        return update(sql, order.getSeat(), order.getSid());
    }
}
