<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>电影院售票系统登录页面</title>
    <link rel="bookmark" href="../../static/img/ding.png">
    <link rel="shortcut icon" href="../../static/img/ding.png"/>
    <link rel="icon" href="../../static/img/ding.png" type="image/gif"/>
    <%-- 静态包含 base标签、css样式、jQuery文件 --%>
    <%@ include file="/pages/common/head.jsp" %>


    <script type="text/javascript">
        // 页面加载完成之后
        $(function () {
            // 给登录绑定单击事件
            $("#sub_btn").click(function () {
                // 验证用户名：必须由字母，数字下划线组成，并且长度为5到12位
                var usernameText = $("#username").val();
                //1 获取用户名输入框里的内容
                //3 使用test方法验证
                console.log("usernameText" + usernameText);
                if (usernameText==="") {
                    //4 提示用户结果
                    $("span.errorMsg").text("用户名不能为空！");
                    return false;
                }

                var passwordText = $("#password").val();
                //3 使用test方法验证
                if (passwordText==="") {
                    //4 提示用户结果
                    $("span.errorMsg").text("密码不能为空！");
                    return false;
                }
            });

        });

    </script>
</head>
<body>
<div id="login_header">
    <img class="logo_img" alt="" src="static/img/logo.png">
</div>

<div class="login_banner">
    <div id="content">
        <div class="login_form">
            <div class="login_box">
                <div class="tit">
                    <h1>欢迎登录</h1>
                    <a href="pages/user/regist.jsp">立即注册</a>
                </div>
                <div class="msg_cont">
                    <b></b>
                    <span class="errorMsg">
                        ${ empty requestScope.msg ? "请输入用户名和密码":requestScope.msg }
                    </span>
                </div>
                <div class="form">
                    <form action="userServlet" method="post">
                        <input type="hidden" name="action" value="login"/>
                        <label>用户名称：</label>
                        <input class="itxt" type="text" placeholder="请输入用户名"
                               autocomplete="off" tabindex="1" name="username"
                               id="username"
                               value="${requestScope.username}"/>
                        <br/>
                        <br/>
                        <label>用户密码：</label>
                        <input class="itxt" type="password" placeholder="请输入密码"
                               id = "password"
                               autocomplete="off" tabindex="1" name="password"/>
                        <br/>
                        <br/>
                        <input type="submit" value="登录" id="sub_btn"/>
                    </form>
                </div>

            </div>
        </div>
    </div>
</div>

<%--静态包含页脚内容--%>
<%@include file="/pages/common/footer.jsp" %>


</body>
</html>