<%@ page import="com.zzz.bean.Screen" %>
<%@ page import="java.util.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Zhu
  Date: 2020/5/22
  Time: 17:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0;"/>
    <title>电影选购</title>
    <link rel="bookmark" href="../../static/img/ding.png">
    <link rel="shortcut icon" href="../../static/img/ding.png"/>
    <link rel="icon" href="../../static/img/ding.png" type="image/gif"/>
    <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../static/css/tickets.css" type="text/css" rel="stylesheet"/>
    <script type="text/javascript" src="../../static/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../../static/js/phone.js"></script>
    <script type="text/javascript" src="../../static/js/menu_x.js"></script>
</head>

<body>
<%
    Map<String,List<Screen>> showDate = new HashMap<String,List<Screen>>();
    List<Screen> ticketsScreens = (List<Screen>) request.getSession().getAttribute("ticketsScreens");
    for(Screen screen : ticketsScreens ){
        String date = screen.getShow_date().toString();
      List<Screen> value = showDate.get(date);
      if(value != null)
      value.add(screen);
      else
      {
          List<Screen> screens = new ArrayList<Screen>();
          screens.add(screen);
          showDate.put(date,screens);
      }
  }
    request.getSession().setAttribute("showDate",showDate);
%>
<div class="whole">

    <header class="header">
        <a href="javascript:history.back(-1)" class="fa fa-angle-left"></a>
        <span class="names">${sessionScope.cinema} : ${sessionScope.filmName}</span>
    </header>

    <div class="film-length">
        <span>片长：${sessionScope.movieInfo.length}</span>
        <span class="imax">原版3D</span>
    </div>

    <div class="tips">温馨提示：电影开场前30分钟关闭在线售票</div>

    <div class="tab date">
        <!---tab日期标签滑动--->
        <div id="J_MenuX">
            <div class="xs-container">
                <ul class="xs-content nav nav-pills nav-justified" id="menus_xx" _xx="0">
                    <c:forEach items="${sessionScope.showDate.entrySet()}" varStatus="statues">
                        <li style="width: 168px; cursor: pointer;">${statues.current.key}</li>
                    </c:forEach>>
                </ul>
            </div>
        </div>
        <!---tab标签滑动END--->
    </div>

    <div class="tickets-list">
        <ul>
                <li>
                    <div class="ticket-info">
                        <span class="start"></span>
                        <span class="styles">原版3D</span>
                        <span>(结束)</span>
                        <span></span>
                    </div>
                    <div class="buy-btn">
                        <span><b>元</b></span>
                    </div>
                </li>
        </ul>
    </div>

</div>

<script type="text/javascript">
    var menux = new menuX("#J_MenuX", 1);
</script>
</body>
</html>
