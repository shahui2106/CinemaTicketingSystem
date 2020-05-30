<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Zhu
  Date: 2020/5/25
  Time: 16:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>电影列表</title>
    <link rel="bookmark" href="../../static/img/ding.png">
    <link rel="shortcut icon" href="../../static/img/ding.png"/>
    <link rel="icon" href="../../static/img/ding.png" type="image/gif"/>
    <link href="../../static/css/filmrecycle.css" type="text/css" rel="stylesheet"/>
</head>
<script type="text/javascript" src="../../static/js/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="../../static/js/phone.js"></script>
<script type="text/javascript" src="../../static/js/alert.js"></script>
<script type="text/javascript">
    function disp_cancel(content){
        Alert.showMsg(content);
    };
    $(function () {
        $('.movie-button').click(function () {
            var text = $('#user').text();
            if(text==="")
            {
                disp_cancel("亲，请先登录！");
                return false;
            }
        });
    });
</script>
<body>
<div class="whole">
    <div id="user" hidden="hidden">${sessionScope.user.username}</div>
    <header class="header">
        <a href="javascript:history.back(-1)" class="fa fa-angle-left"></a>
        <c:if test="${sessionScope.search == null}">
            <span class="names"> ${sessionScope.cinema}</span>
        </c:if>
        <c:if test="${sessionScope.search!=null}">
            <span class="names"> 你搜索的是：${sessionScope.search}</span>
        </c:if>
    </header>

    <div class="main">
        <c:if test="${sessionScope.movieByCinemaName.size() != 0}">
            <c:forEach items="${sessionScope.movieByCinemaName}" varStatus="status">
                <div class="movie-detail">
                    <label style="text-align: start;display: block;padding: 13px;background: #def;font-size: 16px;    font-weight: bold">${status.current.chinese_name}</label>
                <c:if test="${sessionScope.cinema !=null}">
                    <form action="/CTicket/chooseScreenServlet?type=movie&Movie=${status.current.chinese_name}"
                          method="post">
                        </c:if>
                        <c:if test="${sessionScope.cinema == null}">
                        <form action="/CTicket/chooseCinemaServlet?encoding='iso-8859-1'&filmName=${status.current.chinese_name}"
                              method="post">
                            </c:if>
                            <div class="movie-detail-top">
                                <div class="img"><img src="${status.current.img_url}"/></div>
                                <div class="table">
                                    <table>
                                        <tr>
                                            <td><span class="chinese_name"></span></td>
                                        </tr>
                                        <tr>
                                            <td><span class="english_name">${status.current.english_name}</span></td>
                                        </tr>
                                        <tr>
                                            <td>导演：<span class="director">${status.current.director}</span>&ensp;&ensp;&ensp;&ensp;<span
                                                    class="movie-release_date"
                                                    style="width: 90px;">${status.current.release_date}</span></td>
                                        </tr>
                                        <tr>
                                            <td>演员：<span class="actors">${status.current.actors}</span></td>
                                        </tr>
                                        <tr>
                                            <td>来源：<span class="movie-country">${status.current.country}</span>&ensp;&ensp;&ensp;&ensp;评分：<span
                                                    class="rating">${status.current.rating}</span></td>
                                        </tr>
                                        <tr>
                                            <td>类型：<span class="Movie-type">${status.current.type}</span>&ensp;&ensp;&ensp;&ensp;时长：<span
                                                    class="movie-length">${status.current.length}</span></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div style="text-align: start">
                                <h2 style="margin-left: 13px">电影简介：</h2>
                                <p class="movie-introduction">
                                        ${status.current.introduction}
                                </p>
                                <button class="movie-button" type="submit">点击购票</button>
                            </div>
                        </form>
                </div>
            </c:forEach>
        </c:if>
        <c:if test="${sessionScope.movieByCinemaName.size() == 0}">
            <div style="width: 100%;height: 600px;    text-align: center;    padding: 100px 0px;    font-size: 40px;    color: #f00;">
                暂时没有你搜索的影片！
            </div>
        </c:if>
    </div>
</div>
</body>
</html>
