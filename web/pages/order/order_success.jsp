<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>支付提示</title>

    <%-- 静态包含 base标签、css样式、jQuery文件 --%>
    <%@ include file="/pages/common/head.jsp" %>

    <style type="text/css">
        h1 {
            text-align: center;
            margin-top: 200px;
        }

        h1 a {
            color: red;
        }
    </style>
</head>
<body>
<div id="header" style="margin: 3px auto;">
    <img class="logo_img" alt="" src="static/img/logo.png">
    <span class="wel_word"></span>
</div>

<div id="main" style="margin: 60px auto;">

    <c:if test="${sessionScope.removeOrder.equals(\"success\")}">
        <h1>退票成功! <a href="/CTicket/orderServlet?action=queryOrder">转到我的订单</a></h1>
    </c:if>
    <c:if test="${sessionScope.payment.equals(\"defeat\")}">
        <h1>退票失败! <a href="/CTicket/orderServlet?action=queryOrder">转到我的订单</a></h1>
    </c:if>
</div>


<%--静态包含页脚内容--%>
<%@include file="/pages/common/footer.jsp" %>


</body>
</html>