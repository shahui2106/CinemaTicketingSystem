<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/2/5
  Time: 10:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div>
    <span>欢迎<span class="um_span">${sessionScope.user.username}</span>光临电影院售票系统</span>
<%--    <a href="pages/orderInfo/orderInfo.jsp">我的订单</a>--%>
<%--    <a href="userServlet?action=logout">注销</a>&nbsp;&nbsp;--%>
    <a href="/CTicket/pages/user/login.jsp">返回登录</a>
</div>