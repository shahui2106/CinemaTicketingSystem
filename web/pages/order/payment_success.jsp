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

    <c:if test="${sessionScope.payment.equals(\"success\")}">
        <h1>支付成功! <a href="/CTicket/index.jsp">转到主页</a></h1>
    </c:if>
    <c:if test="${sessionScope.payment.equals(\"defeat\")}">
        <h1>支付失败! <a href="/CTicket/index.jsp">转到主页</a></h1>
        <div style="    margin: 0 auto;    width: 600px;    height: 24px;">
        <c:forEach items="${sessionScope.paymentRes}" varStatus="statues">
            <h3 style="float: left;margin-left: 15px;">${statues.current}</h3>
            <c:if test="${statues.index+1 == sessionScope.paymentRes.size()}">
                <h3 style="float: left;margin-left: 15px;">已经被售出！</h3>
            </c:if>
        </c:forEach>
        </div>
    </c:if>
</div>


<%--静态包含页脚内容--%>
<%@include file="/pages/common/footer.jsp" %>


</body>
</html>