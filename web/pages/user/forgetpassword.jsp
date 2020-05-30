<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>忘记密码页面</title>
		<link rel="bookmark" href="../../static/img/ding.png">
		<link rel="shortcut icon" href="../../static/img/ding.png"/>
		<link rel="icon" href="../../static/img/ding.png" type="image/gif"/>
		<%-- 静态包含 base标签、css样式、jQuery文件 --%>
		<%@ include file="/pages/common/head.jsp"%>

		<script type="text/javascript">
			// 页面加载完成之后
			$(function () {

				// 给验证码的图片，绑定单击事件
				$("#kaptchaImage").click(function () {
					// 在事件响应的function函数中有一个this对象。这个this对象，是当前正在响应事件的dom对象
					// src属性表示验证码img标签的 图片路径。它可读，可写
					this.src = "${basePath}kaptcha.jpg?d=" + new Date();
				});

				// 给注册绑定单击事件
				$("#sub_btn").click(function () {
					// 验证用户名：必须由字母，数字下划线组成，并且长度为5到12位
					//1 获取用户名输入框里的内容
					var usernameText = $("#username").val();
					//2 创建正则表达式对象
					var usernamePatt = /^\w{5,12}$/;
					//3 使用test方法验证
					if (!usernamePatt.test(usernameText)) {
						//4 提示用户结果
						$("span.errorMsg").text("用户名不合法！");

						return false;
					}

					// 验证密码：必须由字母，数字下划线组成，并且长度为5到12位
					//1 获取用户名输入框里的内容
					var passwordText = $("#password").val();
					//2 创建正则表达式对象
					var passwordPatt = /^\w{5,12}$/;
					//3 使用test方法验证
					if (!passwordPatt.test(passwordText)) {
						//4 提示用户结果
						$("span.errorMsg").text("密码不合法！");

						return false;
					}

					// 验证确认密码：和密码相同
					//1 获取确认密码内容
					var repwdText = $("#repwd").val();
					//2 和密码相比较
					if (repwdText != passwordText) {
						//3 提示用户
						$("span.errorMsg").text("确认密码和密码不一致！");
						return false;
					}

					// 验证手机号码：11位数字组成
					//1 获取用户名输入框里的内容
					var phoneText = $("#phone").val();
					//2 创建正则表达式对象
					var phonePatt = /^\d{11}$/;
					//3 使用test方法验证
					if (!phonePatt.test(phoneText)) {
						//4 提示用户结果
						$("span.errorMsg").text("手机号码不合法！");
						return false;
					}


					// 验证码：现在只需要验证用户已输入。因为还没讲到服务器。验证码生成。
					var codeText = $("#code").val();
					//去掉验证码前后空格
					// alert("去空格前：["+codeText+"]")
					codeText = $.trim(codeText);
					// alert("去空格后：["+codeText+"]")

					if (codeText == null || codeText == "") {
						//4 提示用户
						$("span.errorMsg").text("验证码不能为空！");

						return false;
					}

					// 去掉错误信息
					$("span.errorMsg").text("");

				});

			});

		</script>
	<style type="text/css">
		.login_form{
			height:420px;
			margin-top: 50px;
		}

	</style>
	</head>
	<body>
		<div id="login_header">
			<img class="logo_img" alt="" src="static/img/logo.png" >
		</div>

			<div class="login_banner">

				<div id="content">
					<div class="login_form">
						<div class="login_box">
							<div class="tit">
								<h1>修改密码</h1>
								<span class="errorMsg">
									${ requestScope.msg }
								</span>
							</div>
							<div class="form">
								<form action="userServlet" method="post">
									<input type="hidden" name="action" value="forget">
									<label>用户名称：</label>
									<input class="itxt" type="text" placeholder="请输入用户名" style="margin: 0 12px;"
										   value="${requestScope.username}"
										   autocomplete="off" tabindex="1" name="username" id="username" />
									<br />
									<br />
									<label>新密码：&nbsp;&nbsp;&nbsp;</label>
									<input class="itxt" type="password" placeholder="请输入密码" style="margin: 0 12px;"
										   autocomplete="off" tabindex="1" name="password" id="password" />
									<br />
									<br />
									<label>确认密码：</label>
									<input class="itxt" type="password" placeholder="确认密码" style="margin: 0 12px;"
										   autocomplete="off" tabindex="1" name="repwd" id="repwd" />
									<br />
									<br />
									<label>手机号码：</label>
									<input class="itxt" type="text" placeholder="请输入手机号码" style="margin: 0 12px;"
										   value="${requestScope.phone}"
										   autocomplete="off" tabindex="1" name="phone" id="phone" />
									<br />
									<br />
									<label>验证码：</label>
									<input class="itxt" type="text" name="code" style="width: 60px;height:14px;margin-left: 30px;margin-right: 0;" id="code" />
									<img style="float:right;margin:13px 20px 0px 10px;width: 140px;height: auto;" src="kaptcha.jpg" id="kaptchaImage" />
									<%--									<label class="itxt" style="margin-left:10px; padding: 10px" id="randcode" onclick="changecode()">abcd</label>--%>
									<br />
									<br />
									<input type="submit" value="修改密码" id="sub_btn" />
								</form>
							</div>

						</div>
					</div>
				</div>
			</div>

		<%--静态包含页脚内容--%>
		<%@include file="/pages/common/footer.jsp"%>


	</body>
</html>