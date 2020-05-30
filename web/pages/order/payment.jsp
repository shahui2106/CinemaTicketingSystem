<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Zhu
  Date: 2020/5/29
  Time: 16:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>影片支付</title>
    <link rel="bookmark" href="../../static/img/ding.png">
    <link rel="shortcut icon" href="../../static/img/ding.png"/>
    <link rel="icon" href="../../static/img/ding.png" type="image/gif"/>
    <link href="../../static/css/payment.css" type="text/css" rel="stylesheet"/>
    <script type="text/javascript" src="../../static/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../../static/js/alert.js"></script>
</head>
<script type="text/javascript">
    function disp_cancel(content){
        Alert.showMsg(content);
    }

    $(function () {
        $('#payment-button').click(function () {
            var payWay=$('input:radio[name="payWay"]:checked').val();
            if(payWay==null){
                disp_cancel("请选一个支付方式！");
            }else {
                window.location.href = "/CTicket/orderServlet?action=addOrder";

            }
        });

    });
</script>
<body>
<div class="main">
    <div>
        <span style="font-size: 26px;line-height: 36px;">${sessionScope.order.filmName}</span><br>
        <span style="font-size: 26px;line-height: 36px;">${sessionScope.order.show_date}:${sessionScope.order.show_time}</span><br>
        <span style="font-size: 26px;line-height: 36px;">${sessionScope.order.cinemaName}(${sessionScope.order.room})</span><br>
        <span style="float: left;margin-left: 26px">已选座位：</span><br>
        <div style="height: 60px;">
            <c:forEach items="${sessionScope.order.seatList}" varStatus="status">
                <span class="seatItem">${status.current}</span>
            </c:forEach>
        </div>
    </div>
    <div class="item">
        <label>手机号：</label><span>${sessionScope.order.userPhone}</span><br>
    </div>
    <div class="item">
        <label>票数：</label><span>${sessionScope.order.ticketNum}</span><br>
    </div>
    <div class="item">
        <label>总金额：</label><span>${sessionScope.order.ticketSum}</span><br>
    </div>
    <div>
        <form style="float: left;margin: 20px;font-size: 18px;">
        <label><input type="radio" name="payWay" value="微信"/>微信</label>
        <label><input type="radio" name="payWay" value="支付宝"/>支付宝</label>
        <label><input type="radio" name="payWay" value="其他"/>其他</label></form>
        <button id="payment-button" style="margin: 16px;float: right">确认支付</button>
    </div>
</div>
</body>
</html>
