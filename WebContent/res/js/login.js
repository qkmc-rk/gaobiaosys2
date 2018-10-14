function ajaxLogin(){
	
	var act = $('input[name=account]').val();
	var pwd = $('input[name=password]').val();
	
	$.ajax({
		type:"POST",
		url:"../user/login",
		async:true,
		dataType:'json',
		data:{
			account:act,
			password:pwd
		},
		success:function (res) {
			if(res.code == 0){
				//success
				layui.use('layer', function(){
				  var layer = layui.layer;
				  layer.msg(res.msg);
				});
				//set data
				if(window.sessionStorage){
					window.sessionStorage.setItem('sessionId',res.sessionId);
					//return 
					setTimeout(function(){
						window.location.href='index.html';
					},1000);
				}else if(res.code == -1){
					layui.use('layer', function(){
						var layer = layui.layer;
						layer.msg("不支持浏览器,建议采用chrome浏览器或者safari浏览器");
					});
				}
			}else{
				//failed
				layui.use('layer', function(){
				  var layer = layui.layer;
				  layer.msg(res.msg);
				});
			}
		}
	});
}
