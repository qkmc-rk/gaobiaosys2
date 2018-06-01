
//单击后选择的节点信息
var selectedNode;
var selectedNodePath;
var zTreeObj;
var setting = {
	treeId:"tree",
	view:{
		addHoverDom: addHoverDom1,
		removeHoverDom: removeHoverDom1,
		fontCss : {
			color : "#333"
		}
	},
	callback: {
		onClick: zTreeOnClick,
	}
};
// 树的节点
var zNodes_head = [
	{name : "2011-2015建设情况",year:"2011-2015",open : true,children : []},
	{name : "年度建设情况",open : true,children : [
		{name : "2011年度建设情况",open : false,year:"2011",children : []},
		{name : "2012年度建设情况",open : false,year:"2012",children : []},
		{name : "2013年度建设情况",open : false,year:"2013",children : []},
		{name : "2014年度建设情况",open : false,year:"2014",children : []},
		{name : "2015年度建设情况",open : false,year:"2015",children : []},
	]}
];

$(document).ready(function() {
	// 获取zNodes，然后构建树形列表
	$.ajax({
        url:'../tree/current',
        type:'get',
        dataType:'json',
        data:{
        	sessionKey:sessionStorage.getItem('sessionId')
        },
        async:'false',
        success:function (data) {
        	console.log("current from back");
        	console.log(data);
        	zNodes_head[0].children.push(data);
        	zNodes_head[1].children[0].children.push(data);
        	zNodes_head[1].children[1].children.push(data);
        	zNodes_head[1].children[2].children.push(data);
        	zNodes_head[1].children[3].children.push(data);
        	zNodes_head[1].children[4].children.push(data);
        	console.log(zNodes_head);
        	//更新ztree
        	zTreeObj = $.fn.zTree.init($("#gaobiao-tree"), setting, zNodes_head);
        }
    });
});

function zTreeOnClick(e, treeId, treeNode) {
   console.log(treeNode);
   selectedNode = treeNode;
   selectedNodePath = treeNode.getPath();
   //做一个更换地图的操作
   if(treeNode.role == 'province'){
	  // $("#btn0").click();
	   btnsc(selectedNode);
   }
   if(treeNode.role == 'city'){
	   //$("#btn1").click();
	   btnsc(selectedNode);
   }
   if(treeNode.role == 'county'){
	  // $("#btn2").click();
	   btnsc(selectedNode);
   }
   if(treeNode.role == 'namesec'){
	  // $("#btn2").click();
	   btnsc(selectedNode);
   }
   if(treeNode.role == 'town'){
	   //$("#btn2").click();
	   btnsc(selectedNode);
   }
   if(treeNode.role == 'village'){
	  // $("#btn2").click();
	   btnsc(selectedNode);
   }
   //..做一个更换地图的操作完毕
   //拿出levels和name，使用ajax去后台拿去数据
   var OBJECTID = treeNode.id;
   if(OBJECTID == undefined)
	   return;
   var role = treeNode.role;
   $.ajax({
       url:'../tree/children',
       type:'get',
       dataType:'json',
       data:{
       	sessionKey:sessionStorage.getItem('sessionId'),
       	OBJECTID:OBJECTID,
       	role:role
       },
       async:'false',
       success:function (data) {
    	   //将取得的数据放置到
    	   
    	   console.log(data);
    	   var treeObj = $.fn.zTree.getZTreeObj("gaobiao-tree");
    	   //首先移除子节点
    	   var nodes = treeObj.getSelectedNodes();
    	   if (nodes && nodes.length>0) {
    	   	treeObj.removeChildNodes(nodes[0]);
    	   }
    	   //添加子节点
    	   newNodes = treeObj.addNodes(treeNode, data);
       }
   });
   
};

function showSelected(){
	if(selectedNode != undefined){
		var OBJECTID = selectedNode.id;
		if(OBJECTID == undefined)
		   return;
	  	var role = selectedNode.role;
	  	$.post(
	  		'../tree/nodeinfo', 
	  		{
		  		sessionKey:sessionStorage.getItem('sessionId'),
		       	OBJECTID:OBJECTID,
		       	role:role
			}, function(str){
				//设置div里面的值
				str = JSON.parse(str);  //转换为对象
				$('#SuppPro').html(str.supppro);
				$('#Fanwei').html(str.proname + str.cityname + str.couname + str.townname + str.vilname);
				$('#NamSec').html(str.namsec);
				$('#LeadInd').html(str.leadind);
				$('#FarmlandAr').html(str.farmlandar);
				$('#NewAreasum').html(str.newarea);
				$('#TrUpAreasum').html(str.truparea);
				$('#CommFinasum').html(str.commfina);
				$('#FieAdjusum').html(str.fieadju);
				$('#IrriDrasum').html(str.irridra);
				$('#TillWasum').html(str.tillwa);
				$('#FerFarsum').html(str.ferfar);
				$('#FaWaCoPrsum').html(str.fawacopr);
				//....设置div值完成
				layui.use('layer', function(){
				  var layer = layui.layer;
				  layer.open({
				  	    type: 1,
				  	    resize:false,
				  	    title:'查询结果',
				  	    area:['700px','380px'],
				  	    content: $('#selectedNode-info-outer').html() //注意，如果str是object，那么需要字符拼接。
				  	  });
				});
	  	});
	}
	else{
		layui.use('layer', function(){
		  var layer = layui.layer;
		  layer.msg('请选择一个省级及以下级别的节点');
		});
	}
}

function addHoverDom1(treeId, treeNode) {
	var aObj = $("#" + treeNode.tId + "_a");
	if ($("#diyBtn_"+treeNode.id).length>0) return;
	var editStr = "<span id='diyBtn_space_" +treeNode.id+ "' > </span>" + "<i class='layui-icon' id='diyBtn_" + treeNode.id + "'>&#xe615;</i>";
	aObj.append(editStr);
	var btn = $("#diyBtn_"+treeNode.id);
	if (btn) {
		btn.bind("click", function(){
			setTimeout(function(){
				showSelected();
			},200);
		});
	}
};
function removeHoverDom1(treeId, treeNode) {
	$("#diyBtn_"+treeNode.id).unbind().remove();
	$("#diyBtn_space_" +treeNode.id).unbind().remove();
};

