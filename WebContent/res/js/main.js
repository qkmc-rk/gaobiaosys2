var global_node;
//关闭ajax的异步操作
$.ajaxSetup({ 
    async : false 
});     

//用于隐藏侧面导航栏
function sidebarevent(){
	if($('#side').width() > 100){
		$('#side').animate({width:'1px'});
		$('.layui-logo').animate({width:'50px'});
		$('#logo-title').hide();
		$('#i-hide').hide();
		$('#i-show').show();
		$('#i-logo').show();
		$('#gaobiao-tree').hide();
		$('#content-body').animate({left:'0px'});
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

function getTabProvinceInfo(parentName,name){
	var ret = true;
	$.get(
  		'../tree/infobyname', 
  		{
	  		sessionKey:sessionStorage.getItem('sessionId'),
	       	name:name,
	       	parentName:parentName,
	       	role:'province'
		}, function(str){
			str = JSON.parse(str);
			if(str == null){
				layui.use('layer', function(){
					var layer = layui.layer;
					layer.msg("省级存在非高标准农田覆盖区域！");
				});
				ret = false;
			}else{
				//将数据放到div中
				$('#province-YearShow').html(str.yearshow);
				$('#province-Fanwei').html(str.proname + str.cityname + str.couname + str.namsec + str.townname + str.vilname);
				$('#province-NamSec').html(str.namsec);
				$('#province-LeadInd').html(str.leadind);
				$('#province-NewAreasum').html(str.newarea);
				$('#province-TrUpAreasum').html(str.truparea);
				$('#province-CommFinasum').html(str.commfina);
				$('#province-FieAdjusum').html(str.fieadju);
				$('#province-IrriDrasum').html(str.irridra);
				$('#province-TillWasum').html(str.tillwa);
				$('#province-FerFarsum').html(str.ferfar);
				$('#province-FaWaCoPrsum').html(str.fawacopr);
				$('#province-SuppPro').html(str.supppro);
			}
		}
	);
	return ret;
}
//实际上这个才是最高层的
function getTabCityInfo(parentName,name){
	var ret = true;
	//设置市
	$.get(
  		'../tree/infobyname', 
  		{
	  		sessionKey:sessionStorage.getItem('sessionId'),
	       	name:name,
	       	parentName:parentName,
	       	role:'city'
		}, function(str){
			str = JSON.parse(str);
			if(str == null){
				layui.use('layer', function(){
					var layer = layui.layer;
					layer.msg("所在市级行政区域存在非高标准农田覆盖区域！");
				});
				ret = false;
			}else{
				//将数据放到div中
				$('#city-YearShow').html(str.yearshow);
				$('#city-Fanwei').html(str.proname + str.cityname + str.couname + str.namsec + str.townname + str.vilname);
				$('#city-NamSec').html(str.namsec);
				$('#city-LeadInd').html(str.leadind);
				$('#city-NewAreasum').html(str.newarea);
				$('#city-TrUpAreasum').html(str.truparea);
				$('#city-CommFinasum').html(str.commfina);
				$('#city-FieAdjusum').html(str.fieadju);
				$('#city-IrriDrasum').html(str.irridra);
				$('#city-TillWasum').html(str.tillwa);
				$('#city-FerFarsum').html(str.ferfar);
				$('#city-FaWaCoPrsum').html(str.fawacopr);
				$('#city-SuppPro').html(str.supppro);
			}
		}
	);
	return ret;
}
function getTabCountyInfo(parentName,name){
	var ret = true;
	//设置县
	$.get(
		'../tree/infobyname', 
		{
	  		sessionKey:sessionStorage.getItem('sessionId'),
	       	name:name,
	       	parentName:parentName,
	       	role:'county'
		}, function(str){
			str = JSON.parse(str);
			if(str == null){
				layui.use('layer', function(){
					var layer = layui.layer;
					layer.msg("所在县级行政区域存在非高标准农田覆盖区域！");
				});
				ret = false;
			}else{
				//将数据放到div中
				$('#county-YearShow').html(str.yearshow);
				$('#county-Fanwei').html(str.proname + str.cityname + str.couname + str.namsec + str.townname + str.vilname);
				$('#county-NamSec').html(str.namsec);
				$('#county-LeadInd').html(str.leadind);
				$('#county-NewAreasum').html(str.newarea);
				$('#county-TrUpAreasum').html(str.truparea);
				$('#county-CommFinasum').html(str.commfina);
				$('#county-FieAdjusum').html(str.fieadju);
				$('#county-IrriDrasum').html(str.irridra);
				$('#county-TillWasum').html(str.tillwa);
				$('#county-FerFarsum').html(str.ferfar);
				$('#county-FaWaCoPrsum').html(str.fawacopr);
				$('#county-SuppPro').html(str.supppro);
			}
		}
	);
	return ret;
}

function getTabNameSecInfo(parentName,name){
	var ret = true;
	//设置片区
	$.get(
		'../tree/infobyname', 
		{
	  		sessionKey:sessionStorage.getItem('sessionId'),
	       	name:name,
	       	parentName:parentName,
	       	role:'namesec'
		}, function(str){
			str = JSON.parse(str);
			if(str == null){
				layui.use('layer', function(){
					var layer = layui.layer;
					layer.msg("所在片区级行政区域存在非高标准农田覆盖区域！");
				});
				ret = false;
			}else{
				//将数据放到div中
				$('#namesec-YearShow').html(str.yearshow);
				$('#namesec-Fanwei').html(str.proname + str.cityname + str.couname + str.namsec + str.townname + str.vilname);
				$('#namesec-NamSec').html(str.namsec);
				$('#namesec-LeadInd').html(str.leadind);
				$('#namesec-NewAreasum').html(str.newarea);
				$('#namesec-TrUpAreasum').html(str.truparea);
				$('#namesec-CommFinasum').html(str.commfina);
				$('#namesec-FieAdjusum').html(str.fieadju);
				$('#namesec-IrriDrasum').html(str.irridra);
				$('#namesec-TillWasum').html(str.tillwa);
				$('#namesec-FerFarsum').html(str.ferfar);
				$('#namesec-FaWaCoPrsum').html(str.fawacopr);
				$('#namesec-SuppPro').html(str.supppro);
			}
		}
	);
	return ret;
}
function getTabTownInfo(parentName,name){
	var ret = true;
	//设置镇
	$.get(
		'../tree/infobyname', 
		{
	  		sessionKey:sessionStorage.getItem('sessionId'),
	       	name:name,
	       	parentName:parentName,
	       	role:'town'
		}, function(str){
			str = JSON.parse(str);
			if(str == null){
				layui.use('layer', function(){
					var layer = layui.layer;
					layer.msg("所在镇级行政区域存在非高标准农田覆盖区域！");
				});
				ret = false;
			}else{
				//将数据放到div中
				$('#town-YearShow').html(str.yearshow);
				$('#town-Fanwei').html(str.cityname + str.couname + str.namsec + str.townname + str.vilname);
				$('#town-NamSec').html(str.namsec);
				$('#town-LeadInd').html(str.leadind);
				$('#town-NewAreasum').html(str.newarea);
				$('#town-TrUpAreasum').html(str.truparea);
				$('#town-CommFinasum').html(str.commfina);
				$('#town-FieAdjusum').html(str.fieadju);
				$('#town-IrriDrasum').html(str.irridra);
				$('#town-TillWasum').html(str.tillwa);
				$('#town-FerFarsum').html(str.ferfar);
				$('#town-FaWaCoPrsum').html(str.fawacopr);
				$('#town-SuppPro').html(str.supppro);
			}
		}
	);
	return ret;
}
function getTabVillageInfo(parentName,name){
	var ret = true;
	//设置村
	$.get(
		'../tree/infobyname', 
		{
	  		sessionKey:sessionStorage.getItem('sessionId'),
	       	name:name,
	       	parentName:parentName,
	       	role:'village'
		}, function(str){
			str = JSON.parse(str);
			if(str == null){
				layui.use('layer', function(){
					var layer = layui.layer;
					layer.msg("所在村级行政区域存在非高标准农田覆盖区域！");
				});
				ret = false;
			}else{
				//将数据放到div中
				$('#village-YearShow').html(str.yearshow);
				$('#village-Fanwei').html(str.couname + str.namsec + str.townname + str.vilname);
				$('#village-NamSec').html(str.namsec);
				$('#village-LeadInd').html(str.leadind);
				$('#village-NewAreasum').html(str.newarea);
				$('#village-TrUpAreasum').html(str.truparea);
				$('#village-CommFinasum').html(str.commfina);
				$('#village-FieAdjusum').html(str.fieadju);
				$('#village-IrriDrasum').html(str.irridra);
				$('#village-TillWasum').html(str.tillwa);
				$('#village-FerFarsum').html(str.ferfar);
				$('#village-FaWaCoPrsum').html(str.fawacopr);
				$('#village-SuppPro').html(str.supppro);
			}
		}
	);
	return ret;
}

//以下几个函数用于清除tab-div中的信息
function clearTabVillageInfo(){
	$('#village-YearShow').html("");
	$('#village-Fanwei').html("");
	$('#village-NamSec').html("");
	$('#village-LeadInd').html("");
	$('#village-NewAreasum').html("");
	$('#village-TrUpAreasum').html("");
	$('#village-CommFinasum').html("");
	$('#village-FieAdjusum').html("");
	$('#village-IrriDrasum').html("");
	$('#village-TillWasum').html("");
	$('#village-FerFarsum').html("");
	$('#village-FaWaCoPrsum').html("");
	$('#village-SuppPro').html("");
}
function clearTabTownInfo(){
	$('#town-YearShow').html("");
	$('#town-Fanwei').html("");
	$('#town-NamSec').html("");
	$('#town-LeadInd').html("");
	$('#town-NewAreasum').html("");
	$('#town-TrUpAreasum').html("");
	$('#town-CommFinasum').html("");
	$('#town-FieAdjusum').html("");
	$('#town-IrriDrasum').html("");
	$('#town-TillWasum').html("");
	$('#town-FerFarsum').html("");
	$('#town-FaWaCoPrsum').html("");
	$('#town-SuppPro').html("");
}
function clearTabNameSecInfo(){
	$('#namesec-YearShow').html("");
	$('#namesec-Fanwei').html("");
	$('#namesec-NamSec').html("");
	$('#namesec-LeadInd').html("");
	$('#namesec-NewAreasum').html("");
	$('#namesec-TrUpAreasum').html("");
	$('#namesec-CommFinasum').html("");
	$('#namesec-FieAdjusum').html("");
	$('#namesec-IrriDrasum').html("");
	$('#namesec-TillWasum').html("");
	$('#namesec-FerFarsum').html("");
	$('#namesec-FaWaCoPrsum').html("");
	$('#namesec-SuppPro').html("");
}
function clearTabCountyInfo(){
	$('#county-YearShow').html("");
	$('#county-Fanwei').html("");
	$('#county-NamSec').html("");
	$('#county-LeadInd').html("");
	$('#county-NewAreasum').html("");
	$('#county-TrUpAreasum').html("");
	$('#county-CommFinasum').html("");
	$('#county-FieAdjusum').html("");
	$('#county-IrriDrasum').html("");
	$('#county-TillWasum').html("");
	$('#county-FerFarsum').html("");
	$('#county-FaWaCoPrsum').html("");
	$('#county-SuppPro').html("");
}
function clearTabCityInfo(){
	$('#city-YearShow').html("");
	$('#city-Fanwei').html("");
	$('#city-NamSec').html("");
	$('#city-LeadInd').html("");
	$('#city-NewAreasum').html("");
	$('#city-TrUpAreasum').html("");
	$('#city-CommFinasum').html("");
	$('#city-FieAdjusum').html("");
	$('#city-IrriDrasum').html("");
	$('#city-TillWasum').html("");
	$('#city-FerFarsum').html("");
	$('#city-FaWaCoPrsum').html("");
	$('#city-SuppPro').html("");
}
function clearTabProvinceInfo(){
	$('#province-YearShow').html("");
	$('#province-Fanwei').html("");
	$('#province-NamSec').html("");
	$('#province-LeadInd').html("");
	$('#province-NewAreasum').html("");
	$('#province-TrUpAreasum').html("");
	$('#province-CommFinasum').html("");
	$('#province-FieAdjusum').html("");
	$('#province-IrriDrasum').html("");
	$('#province-TillWasum').html("");
	$('#province-FerFarsum').html("");
	$('#province-FaWaCoPrsum').html("");
	$('#province-SuppPro').html("");
}

//用于初始化激活tab-div中的某个tab
function activeProvince(){
	$('#tab-province-li').addClass('layui-this');
	$('#tab-city-li').removeClass('layui-this');
	$('#tab-county-li').removeClass('layui-this');
	$('#tab-namesec-li').removeClass('layui-this');
	$('#tab-town-li').removeClass('layui-this');
	$('#tab-village-li').removeClass('layui-this');
	
	$('#tab-province').addClass('layui-show');
	$('#tab-city').removeClass('layui-show');
	$('#tab-county').removeClass('layui-show');
	$('#tab-namesec').removeClass('layui-show');
	$('#tab-town').removeClass('layui-show');
	$('#tab-village').removeClass('layui-show');
	
	$('#tab-province-li').removeClass('rk-hidden');
	$('#tab-city-li').addClass('rk-hidden');
	$('#tab-county-li').addClass('rk-hidden');
	$('#tab-namesec-li').addClass('rk-hidden');
	$('#tab-town-li').addClass('rk-hidden');
	$('#tab-village-li').addClass('rk-hidden');

}
function activeCity(){
	$('#tab-province-li').removeClass('layui-this');
	$('#tab-city-li').addClass('layui-this');
	$('#tab-county-li').removeClass('layui-this');
	$('#tab-namesec-li').removeClass('layui-this');
	$('#tab-town-li').removeClass('layui-this');
	$('#tab-village-li').removeClass('layui-this');
	
	$('#tab-province').removeClass('layui-show');
	$('#tab-city').addClass('layui-show');
	$('#tab-county').removeClass('layui-show');
	$('#tab-namesec').removeClass('layui-show');
	$('#tab-town').removeClass('layui-show');
	$('#tab-village').removeClass('layui-show');
	
	//隐藏子类
	$('#tab-province-li').removeClass('rk-hidden');
	$('#tab-city-li').removeClass('rk-hidden');
	$('#tab-county-li').addClass('rk-hidden');
	$('#tab-namesec-li').addClass('rk-hidden');
	$('#tab-town-li').addClass('rk-hidden');
	$('#tab-village-li').addClass('rk-hidden');

}
function activeCounty(){
	$('#tab-province-li').removeClass('layui-this');
	$('#tab-city-li').removeClass('layui-this');
	$('#tab-county-li').addClass('layui-this');
	$('#tab-namesec-li').removeClass('layui-this');
	$('#tab-town-li').removeClass('layui-this');
	$('#tab-village-li').removeClass('layui-this');
	
	$('#tab-province').removeClass('layui-show');
	$('#tab-city').removeClass('layui-show');
	$('#tab-county').addClass('layui-show');
	$('#tab-namesec').removeClass('layui-show');
	$('#tab-town').removeClass('layui-show');
	$('#tab-village').removeClass('layui-show');
	
	//隐藏子类
	$('#tab-province-li').removeClass('rk-hidden');
	$('#tab-city-li').removeClass('rk-hidden');
	$('#tab-county-li').removeClass('rk-hidden');
	$('#tab-namesec-li').addClass('rk-hidden');
	$('#tab-town-li').addClass('rk-hidden');
	$('#tab-village-li').addClass('rk-hidden');

}
function activeNameSec(){
	$('#tab-province-li').removeClass('layui-this');
	$('#tab-city-li').removeClass('layui-this');
	$('#tab-county-li').removeClass('layui-this');
	$('#tab-namesec-li').addClass('layui-this');
	$('#tab-town-li').removeClass('layui-this');
	$('#tab-village-li').removeClass('layui-this');
	
	$('#tab-province').removeClass('layui-show');
	$('#tab-city').removeClass('layui-show');
	$('#tab-county').removeClass('layui-show');
	$('#tab-namesec').addClass('layui-show');
	$('#tab-town').removeClass('layui-show');
	$('#tab-village').removeClass('layui-show');
	
	//隐藏子类
	$('#tab-province-li').removeClass('rk-hidden');
	$('#tab-city-li').removeClass('rk-hidden');
	$('#tab-county-li').removeClass('rk-hidden');
	$('#tab-namesec-li').removeClass('rk-hidden');
	$('#tab-town-li').addClass('rk-hidden');
	$('#tab-village-li').addClass('rk-hidden');

}

function activeTown(){
	$('#tab-province-li').removeClass('layui-this');
	$('#tab-city-li').removeClass('layui-this');
	$('#tab-county-li').removeClass('layui-this');
	$('#tab-namesec-li').removeClass('layui-this');
	$('#tab-town-li').addClass('layui-this');
	$('#tab-village-li').removeClass('layui-this');
	
	$('#tab-province').removeClass('layui-show');
	$('#tab-city').removeClass('layui-show');
	$('#tab-county').removeClass('layui-show');
	$('#tab-namesec').removeClass('layui-show');
	$('#tab-town').addClass('layui-show');
	$('#tab-village').removeClass('layui-show');
	
	//隐藏子类
	$('#tab-province-li').removeClass('rk-hidden');
	$('#tab-city-li').removeClass('rk-hidden');
	$('#tab-county-li').removeClass('rk-hidden');
	$('#tab-namesec-li').removeClass('rk-hidden');
	$('#tab-town-li').removeClass('rk-hidden');
	$('#tab-village-li').addClass('rk-hidden');
	

}
function activeVillage(){
	$('#tab-province-li').removeClass('layui-this');
	$('#tab-city-li').removeClass('layui-this');
	$('#tab-county-li').removeClass('layui-this');
	$('#tab-namesec-li').removeClass('layui-this');
	$('#tab-town-li').removeClass('layui-this');
	$('#tab-village-li').addClass('layui-this');
	
	$('#tab-province').removeClass('layui-show');
	$('#tab-city').removeClass('layui-show');
	$('#tab-county').removeClass('layui-show');
	$('#tab-namesec').removeClass('layui-show');
	$('#tab-town').removeClass('layui-show');
	$('#tab-village').addClass('layui-show');
	
	//隐藏子类
	$('#tab-province-li').removeClass('rk-hidden');
	$('#tab-city-li').removeClass('rk-hidden');
	$('#tab-county-li').removeClass('rk-hidden');
	$('#tab-namesec-li').removeClass('rk-hidden');
	$('#tab-town-li').removeClass('rk-hidden');
	$('#tab-village-li').removeClass('rk-hidden');
	
}

//在用户登录后添加永久性隐藏到比它权限高的tab，这个tab是点击地图时候显示的tab.
//比如县级用户登录，那么他永远也看不到省级和市级的数据！
$(document).ready(function(){
	var role = window.sessionStorage.getItem('role');
//	if(role != 'province'){
//		$('#tab-province-li').addClass('permanently-hidden');
//	}
//	if(role != 'province' && role != 'city'){
//		$('#tab-province-li').addClass('permanently-hidden');
//		$('#tab-city-li').addClass('permanently-hidden');
//	}
//	if(role != 'province' && role != 'city' && role != 'namesec'){
//		$('#tab-province-li').addClass('permanently-hidden');
//		$('#tab-city-li').addClass('permanently-hidden');
//		$('#tab-namesec-li').addClass('permanently-hidden');
//	}
//	if(role != 'province' && role != 'city' && role != 'namesec' && role != 'town'){
//		$('#tab-province-li').addClass('permanently-hidden');
//		$('#tab-city-li').addClass('permanently-hidden');
//		$('#tab-namesec-li').addClass('permanently-hidden');
//		$('#tab-town-li').addClass('permanently-hidden');
//	}
	
	//重写
	if(role == 'city'){
		$('#tab-province-li').addClass('permanently-hidden');
	}else if(role == 'county'){
		$('#tab-province-li').addClass('permanently-hidden');
		$('#tab-city-li').addClass('permanently-hidden');
	}else if(role == 'namesec'){
		$('#tab-province-li').addClass('permanently-hidden');
		$('#tab-city-li').addClass('permanently-hidden');
		$('#tab-county-li').addClass('permanently-hidden');
	}else if(role == 'town'){
		$('#tab-province-li').addClass('permanently-hidden');
		$('#tab-city-li').addClass('permanently-hidden');
		$('#tab-county-li').addClass('permanently-hidden');
		$('#tab-namesec-li').addClass('permanently-hidden');
	}else if(role == 'village'){
		$('#tab-province-li').addClass('permanently-hidden');
		$('#tab-city-li').addClass('permanently-hidden');
		$('#tab-county-li').addClass('permanently-hidden');
		$('#tab-namesec-li').addClass('permanently-hidden');
		$('#tab-town-li').addClass('permanently-hidden');
	}
	
});


