<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Zhu
  Date: 2020/5/18
  Time: 20:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0;"/>
    <title>电影院选购</title>
    <link rel="bookmark" href="../../static/img/ding.png">
    <link rel="shortcut icon" href="../../static/img/ding.png"/>
    <link rel="icon" href="../../static/img/ding.png" type="image/gif"/>
    <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../static/css/film_cinema.css" type="text/css" rel="stylesheet"/>
    <script type="text/javascript" src="../../static/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../../static/js/phone.js"></script>
</head>

<body>
<div class="whole">

    <header class="header">
        <a href="javascript:history.back(-1)" class="fa fa-angle-left"></a>
        <span class="names">${sessionScope.filmName}</span>
    </header>

    <div class="film_content">
        <div class="address">
            <ul>
                <c:forEach items="${sessionScope.cinemaItems}" varStatus="statues">
                    <li>
                        <form action="/CTicket/chooseScreenServlet?type=cinema" method="post">
                            <div class="film_addr">
                                <span><input class="cinema_nameInput" type="submit" name="cinema"
                                             value="${statues.current.name}"/></span>
                                <p>${statues.current.price}<span>元起</span></p>
                            </div>
                            <div class="det_addr">
                                <span>${statues.current.address}</span>
                                <p>影院电话：${statues.current.phone}</p>
                            </div>
                            <div class="session">近期场次： <c:forEach
                                    items="${statues.current.show_date}" varStatus="screenStatus">
                                ${screenStatus.current} |
                            </c:forEach></div>
                        </form>
                    </li>
                </c:forEach>
            </ul>
        </div>
    </div>


</div>
</body>
</html>
