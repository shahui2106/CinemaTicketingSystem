<%@ page import="com.zzz.dao.MovieDao" %>
<%@ page import="com.zzz.dao.imp.MovieDaoImpl" %>
<%@ page import="com.zzz.dao.CinemaDao" %>
<%@ page import="com.zzz.dao.imp.CinemaDaoImpl" %>
<%@ page import="com.zzz.bean.Movie" %>
<%@ page import="java.util.List" %>
<%@ page import="com.zzz.bean.Cinema" %>
<%@ page import="com.zzz.bean.Screen" %>
<%@ page import="java.util.HashSet" %>
<%@ page import="java.util.Set" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Zhu
  Date: 2020/5/22
  Time: 17:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset=utf-8/>
    <title>电影院售票系统后台管理</title>
    <link rel="bookmark" href="../../static/img/ding.png">
    <link rel="shortcut icon" href="../../static/img/ding.png"/>
    <link rel="icon" href="../../static/img/ding.png" type="image/gif"/>
    <script class="jsbin" src="../../static/js/jquery-3.1.1.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../../static/css/easyui.css">
    <script type="text/javascript" src="../../static/js/jquery.easyui.min.js"></script>
    <style>
        article, aside, figure, footer, header, hgroup,
        menu, nav, section {
            display: block;
        }

        .west {
            width: 200px;
            padding: 10px;
        }

        .north {
            height: 100px;
        }
    </style>
    <script>
        $(function () {
            //动态菜单数据
            var treeData = [{
                text: "后台管理",
                children: [{
                    text: "影片管理",
                    state: "closed",
                    children: [{
                        text: "添加影片",
                        attributes: {
                            url: "http://www.baidu.com"
                        }
                    }, {
                        text: "查询影片",
                        attributes: {
                            url: ""
                        }
                    }
                    ]
                },
                    {
                        text: "影院管理",
                        state: "closed",
                        children: [{
                            text: "添加影院",
                            attributes: {
                                url: ""
                            }
                        }, {
                            text: "查询影院",
                            attributes: {
                                url: ""
                            }
                        }
                        ]
                    },
                    {
                        text: "场次管理",
                        state: "closed",
                        children: [{
                            text: "添加场次",
                            attributes: {
                                url: ""
                            }
                        }, {
                            text: "删除场次",
                            attributes: {
                                url: ""
                            }
                        }, {
                            text: "查询场次",
                            attributes: {
                                url: ""
                            }
                        }
                        ]
                    }
                ]
            }
            ];

            //实例化树形菜单
            $("#tree").tree({
                data: treeData,
                lines: true,
                onClick: function (node) {
                    if (node.attributes) {
                        Open(node.text, node.attributes.url);
                    }
                }
            });

            //在右边center区域打开菜单，新增tab
            function Open(text, url) {
                if ($("#tabs").tabs('exists', text)) {
                    $('#tabs').tabs('select', text);
                } else {

                    var content = "<div class=\"panel_content\">";
                    switch (text) {
                        case "添加影片":
                            content += "<form action=\"\" method='post'><table style='width:360px;margin:0 auto;text-align: left;'>";
                            content += "<tr><td><label>影片中文名:</label></td><td><input type='text' name='chinese_name' value=''></td></tr>";
                            content += "<tr><td><label>影片英文名:</label></td><td><input type='text' name='english_name' value=''></td></tr>";
                            content += "<tr><td><label>海报:</label></td><td><input name='text' value=''></td></tr>";
                            content += "<tr><td><label>时长:</label></td><td><input type='number' name='length' value=''></td></tr>";
                            content += "<tr><td><label>类型:</label></td><td><select name ='type'><option value='1'>动作</option><option value='2'>恐怖</option><option value='3'>剧情</option><option value='4'>动画</option><option value='5'>喜剧</option></select></td></tr>";
                            content += "<tr><td><label>上映时间:</label></td><td><input type='date' name='release_date' value=''></td></tr>";
                            content += "<tr><td><label>来源:</label></td><td><select name ='country'><option value='1'>中国大陆</option><option value='2'>美国</option></select></td></tr>";
                            content += "<tr><td><label>导演:</label></td><td><input type='text' name='director' value=''></td></tr>";
                            content += "<tr><td><label>演员:</label></td><td><input type='text' name='actors' value=''></td></tr>";
                            content += "<tr><td><label>简介:</label></td><td><textarea style='width: 96%;height: 54px;' name='introduction'></textarea></td></tr>";
                            content += "<tr><td><label></label></td><td><input style='width: 80px;height: 26px;background: #def;' type='submit' name='button' value='添加'></td></tr>";
                            content += "</table></form>";
                            break;
                        case "添加场次":
                            var cinema = $('#select_cinema').html();
                            var flim = $('#select_film').html();
                            content += "<form action=\"\" method='post'><table style='width:500px;margin:92px auto;text-align: left;'>";
                            content += "<tr><td style='width: 100px'><label>影片名:</label></td><td>" + flim + "</td></tr>";
                            content += "<tr><td><label>影院名:</label></td><td>" + cinema + "</td></tr>";
                            content += "<tr><td><label>播放日期：</label></td><td><input type='date' name='date' value=''></td></tr>";
                            content += "<tr><td><label>播放时间：</label></td><td><input type='text' name='length' value=''></td></tr>";
                            content += "<tr><td><label>房间号：</label></td><td><input type='text' value=''></td></tr>";
                            content += "<tr><td><label>语言:</label></td><td><select name ='language'><option value='1'>英语3D</option><option value='2'>国语</option></select></td></tr>";
                            content += "<tr><td><label></label></td><td><input style='width: 80px;height: 26px;background: #def;' type='submit' name='button' value='添加'></td></tr>";
                            content += "</table></form>";
                            break;
                        case "查询影片":
                            content += $('#select_movieMenu').html();
                            content += $('#table_movie').html();
                            break;
                        case "添加影院":
                            content += "<form action=\"\" method='post'><table style='width:360px;margin:100px auto;text-align: left;'>";
                            content += "<tr><td style='width: 54px;'><label>影院名:</label></td><td><input type='text' name='chinese_name' value=''></td></tr>";
                            content += "<tr><td><label>地址:</label></td><td><input type='text' name='english_name' value=''></td></tr>";
                            content += "<tr><td><label>电话:</label></td><td><input type='tel' name='text' value=''></td></tr>";
                            content += "<tr><td><label>城市:</label></td><td><select name ='city'><option value='1'>南京市</option><option value='2'>泰州市</option><option value='3'>扬州市</option><option value='4'>盐城市</option><option value='2'>连云港</option></select></td></tr>";
                            content += "<tr><td><label></label></td><td><input style='width: 80px;height: 26px;background: #def;' type='submit' name='button' value='添加'></td></tr>";
                            content += "</table></form>";
                            break;
                        case "查询影院":
                            content += $('#table_cinema').html();
                            break;
                        case "查询场次":
                            content += $('#select_screenMenu').html();
                            content += $('#table_screen1').html();
                            break;
                        case "删除场次":
                            content += $('#table_screen2').html();
                            break;
                    }
                    content += "</div>";
                    $('#tabs').tabs('add', {
                        title: text,
                        closable: true,
                        content: content
                    });
                }
            }

            //绑定tabs的右键菜单
            $("#tabs").tabs({
                onContextMenu: function (e, title) {
                    e.preventDefault();
                    $('#tabsMenu').menu('show', {
                        left: e.pageX,
                        top: e.pageY
                    }).data("tabTitle", title);
                }
            });

            //实例化menu的onClick事件
            $("#tabsMenu").menu({
                onClick: function (item) {
                    CloseTab(this, item.name);
                }
            });

            //几个关闭事件的实现
            function CloseTab(menu, type) {
                var curTabTitle = $(menu).data("tabTitle");
                var tabs = $("#tabs");

                if (type === "close") {
                    tabs.tabs("close", curTabTitle);
                    return;
                }

                var allTabs = tabs.tabs("tabs");
                var closeTabsTitle = [];

                $.each(allTabs, function () {
                    var opt = $(this).panel("options");
                    if (opt.closable && opt.title != curTabTitle && type === "Other") {
                        closeTabsTitle.push(opt.title);
                    } else if (opt.closable && type === "All") {
                        closeTabsTitle.push(opt.title);
                    }
                });

                for (var i = 0; i < closeTabsTitle.length; i++) {
                    tabs.tabs("close", closeTabsTitle[i]);
                }
            }
        });
    </script>
</head>
<body class="easyui-layout">
<%
    Set<String> typeSet = new HashSet<String>();
    Set<String> countrySet = new HashSet<String>();
    Set<String> roomSet = new HashSet<String>();
    Set<String> showDateSet = new HashSet<String>();
    MovieDao movieDao = new MovieDaoImpl();
    CinemaDao cinemaDao = new CinemaDaoImpl();
    List<Movie> movieList = movieDao.queryAllMovie();
    List<Cinema> cinemas = cinemaDao.queryAllCinema();
    List<Screen> screens = cinemaDao.queryAllScreen();
    for (Movie movie : movieList) {
        typeSet.add(movie.getType());
        countrySet.add(movie.getCountry());
    }
    for (Screen screen : screens) {
        roomSet.add(screen.getRoom());
        showDateSet.add(screen.getShow_date().toString());
    }

    request.getSession().setAttribute("MovieAllList", movieList);
    request.getSession().setAttribute("CinemaAllList", cinemas);
    request.getSession().setAttribute("ScreenAllList", screens);
    request.getSession().setAttribute("typeSet", typeSet);
    request.getSession().setAttribute("countrySet", countrySet);
    request.getSession().setAttribute("roomSet", roomSet);
    request.getSession().setAttribute("showDateSet", showDateSet);
%>
<div region="center" title="center">
    <div class="easyui-tabs" fit="true" border="false" id="tabs">
        <div title="首页">
            <div style="float: right;    margin: 16px;    font-size: 16px;">
            <label>管理员：${sessionScope.user.username}&nbsp;&nbsp;&nbsp;</label><a href="http://localhost/CTicket/index.jsp">首页购票</a>
            </div>
            <h1 style=" margin: 223px; margin-left: 250px; font-size: 60px;  color: #cec;">欢迎使用电影院售票管理系统</h1>
        </div>
    </div>
</div>
<div region="west" class="west" title="menu">
    <ul id="tree"></ul>
</div>

<div id="tabsMenu" class="easyui-menu" style="width:120px;">
    <div name="close">关闭</div>
    <div name="Other">关闭其他</div>
    <div name="All">关闭所有</div>
</div>
<div id="table_movie">
    <table>
        <tr style="background-color: #ddeeffaa">
            <td class="fixwid">序号</td>
            <td>片名</td>
            <td class="fixwid">类型</td>
            <td>时长</td>
            <td>来源</td>
            <td class="fixwid">修改</td>
        </tr>
        <c:forEach items="${sessionScope.MovieAllList}" varStatus="status">
            <tr>
                <td>${status.index + 1}</td>
                <td>${status.current.chinese_name}</td>
                <td>${status.current.type}</td>
                <td>${status.current.length}</td>
                <td>${status.current.country}</td>
                <td>
                    <a href="#">修改</a>
                </td>
            </tr>
        </c:forEach>
    </table>
</div>

<div id="table_cinema">
    <table style="width: 1080px;">
        <tr style="background-color: #ddeeffaa">
            <td class="fixwid">序号</td>
            <td>影院名</td>
            <td>地址</td>
            <td>电话</td>
            <td class="fixwid">城市</td>
            <td class="fixwid">修改</td>
        </tr>
        <c:forEach items="${sessionScope.CinemaAllList}" varStatus="status">
            <tr>
                <td>${status.index + 1}</td>
                <td>${status.current.name}</td>
                <td>${status.current.address}</td>
                <td>${status.current.phone}</td>
                <td>${status.current.city}</td>
                <td>
                    <a href="#">修改</a>
                </td>
            </tr>
        </c:forEach>
    </table>
</div>


<div id="table_screen1">
    <table style="width: 1080px;">
        <tr style="background-color: #ddeeffaa">
            <td class="fixwid">序号</td>
            <td>影院名</td>
            <td>影片名</td>
            <td>房间号</td>
            <td>播放日期</td>
            <td>已购票数</td>
            <td class="fixwid">修改</td>
        </tr>
        <c:forEach items="${sessionScope.ScreenAllList}" varStatus="status">
            <tr>
                <td>${status.index + 1}</td>
                <td>${status.current.name}</td>
                <td>${status.current.chinese_name}</td>
                <td>${status.current.room}</td>
                <td>${status.current.show_date}</td>
                <td>${status.current.seatNum}</td>
                <td>
                    <a href="#">修改</a>
                </td>
            </tr>
        </c:forEach>
    </table>
</div>
<div id="table_screen2">
    <table style="width: 1080px;">
        <tr style="background-color: #ddeeffaa">
            <td class="fixwid">序号</td>
            <td>影院名</td>
            <td>影片名</td>
            <td>房间号</td>
            <td>播放日期</td>
            <td>已购票数</td>
            <td class="fixwid">删除</td>
        </tr>
        <c:forEach items="${sessionScope.ScreenAllList}" varStatus="status">
            <tr>
                <td>${status.index + 1}</td>
                <td>${status.current.name}</td>
                <td>${status.current.chinese_name}</td>
                <td>${status.current.room}</td>
                <td>${status.current.show_date}</td>
                <td>${status.current.seatNum}</td>
                <td>
                    <a href="#">删除</a>
                </td>
            </tr>
        </c:forEach>
    </table>
</div>

<div id="select_cinema">
    <select name="cineam">
        <c:forEach items="${sessionScope.CinemaAllList}" varStatus="statues">
            <option value="${statues.index}">${statues.current.name}</option>
        </c:forEach>
    </select>
</div>

<div id="select_film">
    <select name="film">
        <c:forEach items="${sessionScope.MovieAllList}" varStatus="statues">
            <option value="${statues.index}">${statues.current.chinese_name}</option>
        </c:forEach>
    </select>
</div>

<div id="select_movieMenu">
    <div style="padding:12px;">
        <label>选择筛选条件   影片名:</label>
        <select name="name" style="background: #def;margin: 0 6px;">
            <c:forEach items="${sessionScope.MovieAllList}" varStatus="statues">
                <option value="${statues.index}">${statues.current.chinese_name}</option>
            </c:forEach>
        </select>
        <label>类型:</label>
        <select name="type" style="background: #def;margin: 0 6px;">
            <c:forEach items="${sessionScope.typeSet}" varStatus="statues">
                <option value="${statues.index}">${statues.current}</option>
            </c:forEach>
        </select>
        <label>来源:</label>
        <select name="country" style="background: #def;margin: 0 6px;">
            <c:forEach items="${sessionScope.countrySet}" varStatus="statues">
                <option value="${statues.index}">${statues.current}</option>
            </c:forEach>
        </select>
        <button style='width: 80px;height: 26px;background: #def;'>确定</button>
    </div>
</div>

<div id="select_screenMenu">
    <div style="padding:12px;">
        <label>选择筛选条件   影片名:</label>
        <select name="name" style="background: #def;margin: 0 6px;">
            <c:forEach items="${sessionScope.MovieAllList}" varStatus="statues">
                <option value="${statues.index}">${statues.current.chinese_name}</option>
            </c:forEach>
        </select>
        <label>影院名:</label>
        <select name="type" style="background: #def;margin: 0 6px;width: 100px;">
            <c:forEach items="${sessionScope.CinemaAllList}" varStatus="statues">
                <option value="${statues.index}">${statues.current.name}</option>
            </c:forEach>
        </select>
        <label>房间号:</label>
        <select name="country" style="background: #def;margin: 0 6px;">
            <c:forEach items="${sessionScope.roomSet}" varStatus="statues">
                <option value="${statues.index}">${statues.current}</option>
            </c:forEach>
        </select>
        <label>播放日期:</label>
        <select name="show_date" style="background: #def;margin: 0 6px;">
            <c:forEach items="${sessionScope.showDateSet}" varStatus="statues">
                <option value="${statues.index}">${statues.current}</option>
            </c:forEach>
        </select>
        <button style='width: 80px;height: 26px;background: #def;'>确定</button>
    </div>
</div>
</body>
</html>