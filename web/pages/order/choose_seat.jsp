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
    <title>选择座位号</title>
    <link rel="bookmark" href="../../static/img/ding.png">
    <link rel="shortcut icon" href="../../static/img/ding.png"/>
    <link rel="icon" href="../../static/img/ding.png" type="image/gif"/>
    <link href="../../static/css/seat.css" type="text/css" rel="stylesheet"/>
    <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../static/js/layer-v3.0.3/layer/mobile/need/layer.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="../../static/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../../static/js/phone.js"></script>
    <script type="text/javascript" src="../../static/js/layer-v3.0.3/layer/mobile/layer.js"></script>
</head>

<body>
<div class="whole">

    <header class="header">
        <a href="javascript:history.back(-1)" class="fa fa-angle-left"></a>
        <span class="names">变形金刚5：最后的骑士</span>
    </header>

    <div class="seat_head">
        <h3>北京沃美影城常营店</h3>
        <span>
        	<a>今天07-06</a>
            <a>19:00</a>
            <a>(国语 3D)</a>
        </span>
    </div>

    <div class="seat_show">
        <ul>
            <li>
                <i></i>
                <span>可选</span>
            </li>
            <li>
                <i></i>
                <span>已售</span>
            </li>
            <li>
                <i></i>
                <span>已选</span>
            </li>
            <li>
                <i></i>
                <span>最佳区域</span>
            </li>
        </ul>
    </div>

    <div class="seat_choose">
        <div class="number" id="num"></div>
        <div class="seats" id="seats"></div>

    </div>
    <div class="buttons">确认选择</div>

</div>

<script>
    $(function () {
        var html = '';
        html += '<ul class="touchs" id="touchs"><div class="screen">大厅屏幕</div>';
        for (var i = 1; i <= 204; i++) {
            var selected = (i > 91 && i < 98 ? 'selected' : '');
            html += '<li class="' + selected + '">';
            html += '<input type="checkbox" name="seat-' + i + '" id="seat-' + i + '" />';
            html += '<label for="seat-' + i + '"></label>';
            html += '</li>';
        }
        html += '<div class="the_best"></div><div class="crossnum" id="crossnum"></div></ul>';
        $('#seats').html(html);


        $('.selected').children('input').attr({'disabled': 'disabled', 'checked': 'checked'});


        $('.seats li input').on('click', function () {
            var checklen = $('.seats li').not('.selected').children('input:checked').length;
            console.log(checklen);
        });


        //公用弹出层
        function popu(content) {
            layer.open({
                content: content
                , skin: 'msg'
                , time: 3
            });
        }


        var num = '';
        num += '<ul>';
        for (var i = 1; i <= 12; i++) {
            num += '<li>' + i + '</li>';
        }
        html += '</ul>';
        $('#num').html(num);

        var crossnum = '';
        crossnum += '<ul>';
        for (var j = 1; j <= 17; j++) {
            crossnum += '<li>' + j + '</li>';
        }
        html += '</ul>';
        $('#crossnum').html(crossnum);


    })
</script>

<!---拖拽js--->
<script>
    $(function () {
        var flag = false;
        var cur = {
            x: 0,
            y: 0
        }
        var nx, ny, dx, dy, x, y;

        function down() {
            flag = true;
            var touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            cur.x = touch.clientX;
            cur.y = touch.clientY;
            dx = div2.offsetLeft;
            dy = div2.offsetTop;
        }

        function move() {
            if (flag) {
                var touch;
                if (event.touches) {
                    touch = event.touches[0];
                } else {
                    touch = event;
                }
                nx = touch.clientX - cur.x;
                ny = touch.clientY - cur.y;
                x = dx + nx;
                y = dy + ny;
                div2.style.left = x + "px";
                //div2.style.top = y +"px";


                //阻止页面的滑动默认事件
                document.addEventListener("touchmove", function () {
                    //event.preventDefault();
                }, false);
            }
        }

        //鼠标释放时候的函数
        function end() {
            flag = false;
        }

        var div2 = document.getElementById("touchs");
        div2.addEventListener("mousedown", function () {
            down();
        }, false);
        div2.addEventListener("touchstart", function () {
            down();
        }, false)
        div2.addEventListener("mousemove", function () {
            move();
        }, false);
        div2.addEventListener("touchmove", function () {
            move();
        }, false)
        document.body.addEventListener("mouseup", function () {
            end();
        }, false);
        div2.addEventListener("touchend", function () {
            end();
        }, false);

    });
</script>

</body>
</html>
