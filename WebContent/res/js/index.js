$(document).ready(function(){
	if(window.sessionStorage){
		var session = window.sessionStorage;
		if(session.getItem('sessionId') == null){
			layui.use('layer', function(){
			  var layer = layui.layer;
			  layer.msg('您没有登陆'); 
			});
			window.location.href='login.html';
		}
	}else{
		layui.use('layer', function(){
		  var layer = layui.layer;
		  layer.msg('浏览器不支持,建议更换谷歌浏览器或者360浏览器');
		});
	}
	setInterval(function(){
		$.ajax({
			url:'../user/online',
			data:{
				sessionKey:sessionStorage.getItem('sessionId')
			},
			type:'post',
			async:true,
			dataType:'json',
			success:function (res) {
				if(res.code == -1){
					layui.use('layer', function(){
						var layer = layui.layer;
						layer.msg("登录已失效，请重新登录");
					});
					setTimeout(function(){
						window.location.href='login.html';
					},1000);
				}
			},
			error:function(res){
				layui.use('layer', function(){
					var layer = layui.layer;
					layer.msg("服务器异常，请重新登录");
				});
				setTimeout(function(){
					window.location.href='login.html';
				},1000);
			},
			timeout:function(res){
				layui.use('layer', function(){
					var layer = layui.layer;
					layer.msg("超时请重新登录！");
				});
				setTimeout(function(){
					window.location.href='login.html';
				},1000);
			}
		});
	},60000);
});

function loginoff(){
	sessionStorage.removeItem('sessionId');
	layui.use('layer', function(){
	  var layer = layui.layer;
	  layer.msg('注销登录');
	});
	setTimeout(function(){
		window.location.href = 'login.html';
	},1000)
}