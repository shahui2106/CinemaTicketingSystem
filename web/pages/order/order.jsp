<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>我的订单</title>
    <link rel="bookmark" href="../../static/img/ding.png">
    <link rel="shortcut icon" href="../../static/img/ding.png"/>
    <link rel="icon" href="../../static/img/ding.png" type="image/gif"/>
    <link href="../../static/css/order.css" type="text/css" rel="stylesheet"/>
    <script type="text/javascript" src="../../static/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../../static/js/alert.js"></script>
</head>
<script type="text/javascript">

    var fidContent = '';
    function disp_cancel(content){
        Alert.showMsg(content);
    }


    function disp_confirm(){
        Alert.showConfirmMsg("确定要退票吗？",function(){
            window.location.href='/CTicket/orderServlet?action=removeOrder&fid='+fidContent;});
    }
    $(function () {
        $('.backTicket').click(function () {
            var fid = $(this).find(".fid")[0];
            fidContent = $(fid).text();
            disp_confirm();
        });

    });
</script>
<body>
<div class="main">
    <div class="wel_word" style="float: left"><a href="/CTicket/index.jsp">返回首页</a></div>
	<div class="wel_word">欢迎<label style="color: #ddeeff99;">${sessionScope.user.username}</label>使用电影院售票系统</div>
    <div class="order_table">
		<span class="title">我的订单</span>
        <table>
            <tr style="background-color: #ddeeffaa">
                <td>片名</td>
                <td>影院</td>
                <td>场次</td>
                <td>房间</td>
                <td>座位</td>
                <td>手机号</td>
                <td class="fixwid">票数</td>
                <td class="fixwid">总金额</td>
                <td class="fixwid">操作</td>
            </tr>
            <c:forEach items="${sessionScope.MyOrder}" varStatus="status">
                <tr>
                    <td>${status.current.filmName}</td>
                    <td>${status.current.cinemaName}</td>
                    <td>${status.current.show_date}:${status.current.show_time}</td>
                    <td>${status.current.room}</td>
                    <td>
                        <c:forEach items="${status.current.seatList}" varStatus="seatStatues">
                           <label>${seatStatues.current}</label>
                        </c:forEach>
                    </td>
                    <td>${status.current.userPhone}</td>
                    <td>${status.current.ticketNum}</td>
                    <td>${status.current.ticketSum}</td>
                    <td><a class="backTicket" href="#">退票
                        <span class="fid" hidden="hidden">${status.current.fid}</span></a></td>
                </tr>
            </c:forEach>
        </table>
    </div>
</div>


</body>
</html>