<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.zzz.dao.imp.MovieDaoImpl" %>
<%@ page import="com.zzz.bean.Slick" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
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
                $('.movieul > .movieli:first').after('<li class="movieli"><img src=' + field.imgpath + '><div class=\'title\' text-align=\'start\'>' + field.title + '<br><span>' + field.des + '</span></div></li>');
            });
            $('.slide li').css("margin-right", margin);
            $('.slide li').width(cardw);
            $('.slide li').height(cardh);
            $('.slide img').width(cardw);
            $('.slide img').height(cardh);
            $('.title').width(cardw);
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
    pageContext.setAttribute("movieRecycle", new MovieDaoImpl().queryMovieFromStartToEnd(0,8));
%>
<div class="scroll_main">
    <div class="scroll_wrap">
        <div class="scroll_cont">
            <div id="vivo-head">
                <div class="vivo-search">
                    <div class="search-box">
                        <form action='#' method='get'>
                            <input type="text"
                                   placeholder="影院、影片、演员"
                                   name='q' class='data_q' autocomplete="off">
                            <button>搜索</button>
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
                    <a href="javascript:;" class="mt-tabpage-item">发现</a>

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
                           style="font-size: 14px;display: block;width: 85px;margin: 42px 0;float: right; margin-right: -256px;"><a
                            href="http://localhost/CTicket/pages/user/login.jsp">亲，请登录！</a></label>
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
                                <h3>正在热映</h3>
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
                            <%--                            影院页面--%>
                            <div class="movie-all">
                                <div class="movie-top">
                                    <div class="movie-recycle">
                                        <table class="movie-table">
                                            <c:forEach begin="0" end="1">
                                            <tr class="movie-ul">
                                                <c:forEach begin="0" end="3">
                                                <td class="movie-li">
                                                    <div class="movie-item">
                                                        <img/>
                                                        <h2>奔驰人生</h2>
                                                    </div>
                                                </td>
                                                </c:forEach>
                                            </tr>
                                            </c:forEach>
                                        </table>
                                    </div>
                                    <div class="movie-detail">
                                        <label style="text-align: start;display: block;padding: 13px;background: #def;font-size: 16px;    font-weight: bold">电影详情</label>
                                        <div class="movie-detail-top">
                                           <img/>
                                            <table>
                                                <tr>
                                                    <td><label>中文名：</label></td>
                                                </tr>
                                                <tr>
                                                    <td><label>英文名：</label></td>
                                                    <td><label>评分：</label></td>
                                                </tr>
                                                <tr>
                                                    <td><label>类型：</label></td>
                                                    <td><label>来源：</label></td>
                                                </tr>
                                                <tr>
                                                    <td><label>时长：</label></td>
                                                    <td><label>放映时间：</label></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div style="text-align: start">
                                            <h2 style="margin-left: 13px">电影简介：</h2>
                                            <p>

                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div style="text-align: center;height: 110px;padding-top: 40px;">
                                    <div id="pager" class="pager clearfix">
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="mt-tabpage-item">Cont3</li>
                        <li class="mt-tabpage-item">Cont4</li>
                    </ul>
                </div>
            </div>

            <%--静态包含页脚内容--%>
            <%@include file="/pages/common/footer.jsp" %>
        </div>
        <div class="scroll_bar">
            <div class="scroll_slider"></div>
        </div>
    </div>
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
</script>
</body>
</html>