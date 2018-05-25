var global_node;

//用于隐藏侧面导航栏
function sidebarevent(){
	if($('#side').width() > 100){
		$('#side').animate({width:'50px'});
		$('.layui-logo').animate({width:'50px'});
		$('#logo-title').hide();
		$('#i-hide').hide();
		$('#i-show').show();
		$('#i-logo').show();
		$('#gaobiao-tree').hide();
		$('#content-body').animate({left:'55px'});
		$('.gaobiao-scroll').animate({width:'50px'});
	}else{
		$('#side').animate({width:'220px'});
		$('.layui-logo').animate({width:'220px'});
		$('#logo-title').show();
		$('#i-hide').show();
		$('#i-show').hide();
		$('#i-logo').hide();
		$('#gaobiao-tree').show();
		$('#content-body').animate({left:'225px'});
		$('.gaobiao-scroll').animate({width:'225px'});
	}
		
}