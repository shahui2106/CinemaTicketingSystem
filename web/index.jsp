<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.zzz.dao.imp.MovieDaoImpl" %>
<%@ page import="com.zzz.dao.imp.CinemaDaoImpl" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="bookmark" href="./static/img/ding.png">
    <link rel="shortcut icon" href="./static/img/ding.png"/>
    <link rel="icon" href="./static/img/ding.png" type="image/gif"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>首页</title>
    <link type="text/css" href="./static/css/style.css" rel="stylesheet"/>
</head>
<script type="text/javascript" src="./static/js/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="./static/js/mt-tabpage.js"></script>
<script type="text/javascript" src="./static/js/vivo-common.js"></script>
<script type="text/javascript" src="./static/js/slide.js"></script>
<script type="text/javascript" src="./static/js/scrollbar.js"></script>
<script type="text/javascript" src="./static/js/jquery_carousel_slider.js"></script>
<script type="text/javascript" src="./static/js/jquery.z-pager.js"></script>
<script type="text/javascript" src="./static/js/alert.js"></script>
<script src="./static/js/area.js"></script><!--所有城市数据-->
<script src="./static/js/select.js"></script><!--默认调用方法-->
<script src="./static/js/verSelect.js"></script><!--封装插件-->
<script type="text/javascript">
    var cardw = 183;	//page card's width .
    var cardh = 220;
    var cardn = 9;	//the number of visible page card .
    var margin = 9;	//margin between cards .
    var slidewraph = cardh + 85;
    var covered = cardw - 33;	//coverd part of card (at both tails of box).
    var boxw = cardw * cardn + margin * (cardn - 1) - covered * 2; //box width 845
    var singlemove = (cardw + margin) * (cardn - 2);	//transform distance .
    var listn = 0;
    var boundary = 0;
    $(document).ready(function () {	//be triggered when all elements are ready .

        $('.box').width(boxw);
        $('.slide-wrap').height(slidewraph);
        $('.slide ul').css({left: -covered});

        $.getJSON("http://localhost/CTicket/api/showingMovieApi", function (result) {
            listn = result['Movie'].length;
            boundary = (cardw + margin) * (listn) - singlemove;

            $.each(result['Movie'], function (i, field) {
                $('.movieul > .movieli:first').after('<a class="showing-movie-a" href="/CTicket/chooseCinemaServlet?encoding=utf-8&filmName='+field.chinese_name+'"><li class="movieli" ><img src=' + field.img_url + '><div class=\'title\' text-align=\'start\'>' + field.chinese_name + '<br><span>' + field.introduction + '</span></div></li></a>');
            });
            $('.slide li').css("margin-right", margin);
            $('.slide li').css("cursor", "pointer");
            $('.slide li').width(cardw);
            $('.slide li').height(cardh);
            $('.slide img').width(cardw);
            $('.slide img').height(cardh);
            $('.title').width(cardw);
            $('.slide li').click(function () {
                var username = $("#user-name").text();
                if(username ==="亲，请登录！"){
                    disp_cancel("亲，请先登录！");
                    return false;
                }
            });
        });


        $('.slide-wrap').hover(function () {
            $('.shift').addClass('shift-active');
            $('.slide i').addClass('i-active');
        }, function () {
            $('.shift').removeClass('shift-active');
            $('.slide i').removeClass('i-active');
        });

        $('.right').hover(function () {
            $('.slide').addClass('slide-active-r');
        }, function () {
            $('.slide').removeClass('slide-active-r');
        });

        $('.left').hover(function () {
            $('.slide').addClass('slide-active-l');
        }, function () {
            $('.slide').removeClass('slide-active-l');
        });

        $('.shift').hover(function () {
            $('.slide i').addClass('i-active-move');
        }, function () {
            $('.slide i').removeClass('i-active-move');
        });

        var movement = 0;

        $('.right').click(function (event) {
            if (Math.abs(movement) < boundary)
                movement -= singlemove;
            $('.slide ul').hover().css('transform', 'translateX(' + movement + 'px)');
        });

        $('.left').click(function (event) {
            if (movement < 0)
                movement += singlemove;
            $('.slide ul').hover().css('transform', 'translateX(' + movement + 'px)');
        });
    });

    $(function () {
        $('[js-tab=3]').tab({
            curDisplay: 1,
            changeMethod: 'horizontal'
        });

    });
</script>
<body>
<%
    pageContext.setAttribute("movieSlick", new MovieDaoImpl().querySlickById());
    pageContext.setAttribute("movieRecycle", new MovieDaoImpl().queryMovieFromStartToEnd(0, 8));
    request.getSession().setAttribute("allCinema", new CinemaDaoImpl().queryAllCinema());
%>
<div class="main">
    <div id="vivo-head">
        <div class="vivo-search">
            <div class="search-box">
                <form action='/CTicket/chooseMovieServlet?type=search' method='post'>
                    <input type="text" placeholder="影院、影片、演员" name='search' id='data_q' autocomplete="off"/><button id="search_button">搜索</button>
                    <a class="close"></a>
                </form>
            </div>
        </div>
    </div>

    <div class="mt-tabpage" js-tab="3">
        <img src="static/img/ding.png"
             style="width: 46px;height: 45px;float: left;padding: 21px 64px 20px;background-color: #DEF">
        <label style="float: left;width: 42px;height: 24px;background-color: #def;font-size: 16px;padding: 31px 0;display: block;">城市</label>
        <div style="    width: 210px;    padding: 25px 6px;    height: 35px;    float: left;    background-color: #def;">
            <select name="search" id="search" data-selector>
                <option value="">请选择</option>
            </select>
        </div>
        <div class="mt-tabpage-title">
            <!-- 前面不能插入标签，否则菜单会错位-->
            <a href="javascript:;" class="mt-tabpage-item mt-tabpage-item-cur">首页</a>
            <a href="javascript:;" class="mt-tabpage-item">影片</a>
            <a href="javascript:;" class="mt-tabpage-item">影院</a>

            <div class="search-user"
                 style="float:right;zoom:1;display:block;margin-right: 16%;margin-top: -1%;">
                <a href="#" class="search"><b></b></a>
                <div class="index-nav-frame-line active" tabindex="-1">
                    <a class="user"><b></b></a>
                    <div class="index-nav-frame-line-center">
                        <div class="index-nav-frame-line-li">
                            我的订单
                        </div>
                    </div>
                </div>
            </div>
            <label class="login_name"
                   style="font-size: 14px;display: block;width: 85px;margin: 42px 0;float: right; margin-right: -256px;">
                <c:if test="${ empty sessionScope.user}">
                <a id="user-name" href="/CTicket/pages/user/login.jsp">亲，请登录！</a></label>
                 </c:if>
            <c:if test="${ !empty sessionScope.user}">
                <a id="user-name" onClick="disp_confirm()"> ${sessionScope.user.username}</a></label>
            </c:if>
        </div>
        <div class="mt-tabpage-count">
            <ul class="mt-tabpage-cont__wrap" style="width: 6000px;left:0">
                <li class="mt-tabpage-item">
                    <%--                            首页页面--%>
                    <div class="ck-slide">
                        <ul class="ck-slide-wrapper">
                            <c:forEach items="${movieSlick} " varStatus="status">
                                <li>
                                    <a href="javascript:">
                                        <img src="${movieSlick.get(status.index).imageUrl}"
                                             alt="" width="1430px" height="330px"></a>
                                </li>
                            </c:forEach>
                        </ul>
                        <a href="javascript:;" class="ctrl-slide ck-prev">上一张</a> <a href="javascript:;"
                                                                                     class="ctrl-slide ck-next">下一张</a>
                        <div class="ck-slidebox">
                            <div class="slideWrap">
                                <ul class="dot-wrap">
                                    <li class="current"><em>1</em></li>
                                    <li><em>2</em></li>
                                    <li><em>3</em></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class='box'>
                        <h3>即将热映</h3>
                        <div class='tri'></div>
                        <div class='slide-wrap'>
                            <div class='border'>
                                <div class='slide'>
                                    <div class='shift right'></div>
                                    <i class='shift right'></i>
                                    <div class='shift left'></div>
                                    <i class='shift left'></i>
                                    <ul class="movieul">
                                        <li class="movieli"></li>
                                        <li class="movieli"></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="mt-tabpage-item">
                    <%--                            影片页面--%>
                    <div class="movie-all">
                        <div class="movie-top">
                            <div class="movie-recycle">
                                <table class="movie-table">
                                    <c:forEach begin="0" end="1" varStatus="ulStatus">
                                        <tr class="movie-ul">
                                            <c:forEach begin="0" end="3" varStatus="liStatus">
                                                <td class="movie-li"
                                                    onclick="detailInfo(${ulStatus.index * 4 + liStatus.index})">
                                                    <div class="movie-item">
                                                        <img/>
                                                        <h2 class="movie-item-${ulStatus.index * 4 + liStatus.index}"></h2>
                                                    </div>
                                                </td>
                                            </c:forEach>
                                        </tr>
                                    </c:forEach>
                                </table>
                            </div>
                            <div class="movie-detail">
                                <label style="text-align: start;display: block;padding: 13px;background: #def;font-size: 16px;    font-weight: bold">电影详情</label>
                                <form action="/CTicket/chooseCinemaServlet" method="post"
                                      enctype="application/x-www-form-urlencoded">
                                    <div class="movie-detail-top">
                                        <div class="img"><img/></div>
                                        <div class="table">
                                            <table>
                                                <tr>
                                                    <td><span class="chinese_name"></span></td>
                                                </tr>
                                                <tr>
                                                    <td><span class="english_name"></span></td>
                                                </tr>
                                                <tr>
                                                    <td>导演：<span class="director"></span>&ensp;&ensp;&ensp;&ensp;<span class="movie-release_date" style="width: 90px;"></span></td>
                                                </tr>
                                                <tr>
                                                    <td>演员：<span class="actors"></span></td>
                                                </tr>
                                                <tr>
                                                    <td>来源：<span class="movie-country"></span>&ensp;&ensp;&ensp;&ensp;评分：<span class="rating"></span></td>
                                                </tr>
                                                <tr>
                                                    <td>类型：<span class="Movie-type"></span>&ensp;&ensp;&ensp;&ensp;时长：<span class="movie-length"></span></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div style="text-align: start">
                                        <h2 style="margin-left: 13px">电影简介：</h2>
                                        <p class="movie-introduction">
                                        </p>
                                        <button id="movie-buy-button" class="movie-button" type="submit">点击购票</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div style="text-align: center;height: 110px;padding-top: 40px;">
                            <div id="pager" class="pager clearfix">
                            </div>
                        </div>
                    </div>
                </li>
                <li class="mt-tabpage-item">
                    <%--影院选项卡--%>
                    <div class="scroll_main">
                        <div class="scroll_wrap">
                            <div class="scroll_cont">
                                <div class="address">
                                    <ul id="cinema_recycle">
                                        <c:forEach items="${sessionScope.allCinema}" varStatus="statues">
                                            <li>
                                                <form action="/CTicket/chooseMovieServlet?type=cinema&cinemaName=${statues.current.name}" method="post">
                                                    <div class="film_addr">
                                                        <span class="cinema_nameInput">${statues.current.name}</span>
                                                    </div>
                                                    <div class="det_addr">
                                                        <span>${statues.current.address}</span>
                                                        <p style="    padding: 0;  padding-left: 24px;">
                                                            影院电话：${statues.current.phone}</p>
                                                    </div>
                                                    <div style="float: right">
                                                        <button class="cinema-buy-button" type="submit">影院购票</button>
                                                    </div>
                                                </form>
                                            </li>
                                        </c:forEach>
                                    </ul>
                                </div>
                            </div>
                            <div class="scroll_bar">
                                <div class="scroll_slider"></div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <%--静态包含页脚内容--%>
    <%@include file="/pages/common/footer.jsp" %>

</div>
<script>
    $('.ck-slide').ckSlide({
        autoPlay: true,//默认为不自动播放，需要时请以此设置
        dir: 'x',//默认效果淡隐淡出，x为水平移动，y 为垂直滚动
        interval: 3500//默认间隔2000毫秒

    });
    new CusScrollBar({
        contentSelector: '.scroll_cont', //滚动内容区
        barSelector: '.scroll_bar', //滚动条
        sliderSelector: '.scroll_slider' //滚动滑块
    });
    new verSelector(); //启动插件


    $("#pager").zPager({
        htmlBox: $('#wraper'),
        btnShow: true,
        ajaxSetData: true,
    });

    function detailInfo(index) {
        $().updateDetailInfo($('.movie-item-' + index).text());
    }

    function disp_cancel(content){
        Alert.showMsg(content);
    }

    function disp_confirm(){
        Alert.showConfirmMsg("确定要退出账户吗？",function(){window.location.href='http://localhost/CTicket/userServlet?action=logout';});
    }

</script>

<script type="text/javascript">
    // 页面加载完成之后
    $(function () {
        $("#search_button").click(function () {
            var searchContent = $("#data_q").val();
            if (searchContent==="") {
                disp_cancel("搜索内容不能为空！");
                return false;
            }
        });


        $("#movie-buy-button").click(function () {
            var username = $("#user-name").text();
            if(username ==="亲，请登录！"){
                disp_cancel("亲，请先登录！");
                return false;
            }
        });

        $(".cinema-buy-button").click(function () {
            var username = $("#user-name").text();
            if(username ==="亲，请登录！"){
                disp_cancel("亲，请先登录！");
                return false;
            }
        });

        $(".showing-movie-a").click(function () {
            var username = $("#user-name").text();
            if(username ==="亲，请登录！"){
                disp_cancel("亲，请先登录！");
                return false;
            }
        });

        $(".index-nav-frame-line-li").click(function () {
            var username = $("#user-name").text();
            if(username ==="亲，请登录！"){
                disp_cancel("亲，请先登录！");
                return false;
            }else {
                window.location.href = "/CTicket/orderServlet?action=queryOrder";
            }
        });
    });

</script>
</body>
</html>