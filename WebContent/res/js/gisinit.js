var soilURL;
var view;

require([ "esri/Map", "esri/views/MapView", "esri/layers/TileLayer",
				"esri/tasks/IdentifyTask",
				"esri/tasks/support/IdentifyParameters", "esri/widgets/Search",
				"esri/widgets/Legend", "esri/widgets/LayerList" ],
		function(Map, MapView, TileLayer, IdentifyTask, IdentifyParameters,
				Search, Legend, LayerList) {

			var identifyTask, params;

			// URL to the map service where the identify will be performed
			// 更换该地址实现更换地图的目的
			var districtCode = window.sessionStorage.getItem('districtCode');
			soilURL = "http://10.255.251.39:6080/arcgis/rest/services/gaobiaotest/"
					+ districtCode + "/MapServer";

			// Add the map service as a TileLayer for fast rendering
			// Tile layers are composed of non-interactive images. For that
			// reason we'll
			// use IdentifyTask to query the service to add interactivity to the
			// app
			var parcelsLayer = new TileLayer({
				url : soilURL,
				opacity : 0.85
			});

			var map = new Map({
			// basemap: "osm"
			});
			map.add(parcelsLayer);

			view = new MapView({
				map : map,
				container : "viewDiv",
				center : [ 104.06, 30.67 ],
				zoom : 1
			});

			view.when(function() {
				// executeIdentifyTask() is called each time the view is clicked
				view.on("click", executeIdentifyTask);

				// Create identify task for the specified map service
				identifyTask = new IdentifyTask(soilURL);

				// Set the parameters for the Identify
				params = new IdentifyParameters();
				params.tolerance = 3;
				params.layerIds = [ 1, 2, 3, 4, 5, 6, 7 ];
				params.layerOption = "top";
				params.width = view.width;
				params.height = view.height;
			});

			// Executes each time the view is clicked
			function executeIdentifyTask(event) {
				// Set the geometry to the location of the view click
				params.geometry = event.mapPoint;
				params.mapExtent = view.extent;
				document.getElementById("viewDiv").style.cursor = "wait";

				// This function returns a promise that resolves to an array of
				// features
				// A custom popupTemplate is set for each feature based on the
				// layer it
				// originates from
				identifyTask.execute(params).then(
						function(response) {

							var results = response.results;

							return results.map(function(result) {

								var feature = result.feature;
								var layerName = result.layerName;

								feature.attributes.layerName = layerName;
								if (layerName === '省界') {
									// 这里获取数据并将数据显示在div中
									var province = '四川省';
									getTabProvinceInfo('',
											feature.attributes.ProName);
									clearTabCityInfo();
									clearTabCountyInfo();
									clearTabNameSecInfo();
									clearTabTownInfo();
									clearTabVillageInfo();
									// 激活tab
									activeProvince();
									// 获取数据延时
									setTimeout(function() {
										layui.use('layer', function() {
											var layer = layui.layer;
											layer.open({
												type : 1,
												resize : false,
												title : '省界',
												area : [ '700px', '505px' ],
												content : $('#tab-info-outer')
														.html()
											// 注意，如果str是object，那么需要字符拼接。
											});
										});
									}, 500);
									// 弹出数据
									// feature.popupTemplate = { // autocasts as
									// // new
									// // PopupTemplate()
									// title : "{省界_高标准农田}",
									// content : "<b>省界省:</b> {ProName}"
									// + "<br><b>市:</b> {CityName}"
									// + "<br><b>县:</b> {CouName}"
									// + "<br><b>片区:</b> {NamSec}"
									// + "<br><b>乡镇:</b> {TownName}"
									// + "<br><b>村:</b> {VilName}"
									// };
								}
								if (layerName === '市州界') {
									getTabProvinceInfo('',
											feature.attributes.ProName);
									getTabCityInfo(feature.attributes.ProName,
											feature.attributes.CityName);
									clearTabCountyInfo();
									clearTabNameSecInfo();
									clearTabTownInfo();
									clearTabVillageInfo();
									// 激活tab
									activeCity();
									// 获取数据延时
									setTimeout(function() {
										layui.use('layer', function() {
											var layer = layui.layer;
											layer.open({
												type : 1,
												resize : false,
												title : '市州界',
												area : [ '700px', '505px' ],
												content : $('#tab-info-outer')
														.html()
											// 注意，如果str是object，那么需要字符拼接。
											});
										});
									}, 500);

									// feature.popupTemplate = { // autocasts as
									// // new
									// // PopupTemplate()
									// title : "{市州界_高标准农田}",
									// content : "<b>市州省:</b> {ProName}"
									// + "<br><b>市:</b> {CityName}"
									// + "<br><b>县:</b> {CouName}"
									// + "<br><b>片区:</b> {NamSec}"
									// + "<br><b>乡镇:</b> {TownName}"
									// + "<br><b>村:</b> {VilName}"
									// };
								} else if (layerName === '区县界') {
									getTabProvinceInfo('',
											feature.attributes.ProName);
									getTabCityInfo(feature.attributes.ProName,
											feature.attributes.CityName);
									getTabCountyInfo(
											feature.attributes.CityName,
											feature.attributes.CouName);
									clearTabNameSecInfo();
									clearTabTownInfo();
									clearTabVillageInfo();
									// 激活tab
									activeCounty();
									// 获取数据延时
									setTimeout(function() {
										layui.use('layer', function() {
											var layer = layui.layer;
											layer.open({
												type : 1,
												resize : false,
												title : '区县界',
												area : [ '700px', '505px' ],
												content : $('#tab-info-outer')
														.html()
											// 注意，如果str是object，那么需要字符拼接。
											});
										});
									}, 500);
									// feature.popupTemplate = { // autocasts as
									// // new
									// // PopupTemplate()
									// title : "{县区界_高标准农田}",
									// content : "<b>市州省:</b> {ProName}"
									// + "<br><b>市:</b> {CityName}"
									// + "<br><b>县:</b> {CouName}"
									// + "<br><b>片区:</b> {NamSec}"
									// + "<br><b>乡镇:</b> {TownName}"
									// + "<br><b>村:</b> {VilName}"
									// };
								} else if (layerName === '片区界') {
									getTabProvinceInfo('',
											feature.attributes.ProName);
									getTabCityInfo(feature.attributes.ProName,
											feature.attributes.CityName);
									getTabCountyInfo(
											feature.attributes.CityName,
											feature.attributes.CouName);
									getTabNameSecInfo(
											feature.attributes.CouName,
											feature.attributes.NamSec);
									clearTabTownInfo();
									clearTabVillageInfo();
									// 激活tab
									activeNameSec();
									// 获取数据延时
									setTimeout(function() {
										layui.use('layer', function() {
											var layer = layui.layer;
											layer.open({
												type : 1,
												resize : false,
												title : '片区界',
												area : [ '700px', '505px' ],
												content : $('#tab-info-outer')
														.html()
											// 注意，如果str是object，那么需要字符拼接。
											});
										});
									}, 500);
									// feature.popupTemplate = { // autocasts as
									// // new
									// // PopupTemplate()
									// title : "{片区界_高标准农田}",
									// content : "<b>市州省:</b> {ProName}"
									// + "<br><b>市:</b> {CityName}"
									// + "<br><b>县:</b> {CouName}"
									// + "<br><b>片区:</b> {NamSec}"
									// + "<br><b>乡镇:</b> {TownName}"
									// + "<br><b>村:</b> {VilName}"
									// };
								} else if (layerName === '乡镇界') {
									getTabProvinceInfo('',
											feature.attributes.ProName);
									getTabCityInfo(feature.attributes.ProName,
											feature.attributes.CityName);
									getTabCountyInfo(
											feature.attributes.CityName,
											feature.attributes.CouName);
									getTabNameSecInfo(
											feature.attributes.CouName,
											feature.attributes.NamSec);
									getTabTownInfo(feature.attributes.NamSec,
											feature.attributes.TownName);
									clearTabVillageInfo();
									// 激活tab
									activeTown();
									// 获取数据延时
									setTimeout(function() {
										layui.use('layer', function() {
											var layer = layui.layer;
											layer.open({
												type : 1,
												resize : false,
												title : '乡镇界',
												area : [ '700px', '505px' ],
												content : $('#tab-info-outer')
														.html()
											// 注意，如果str是object，那么需要字符拼接。
											});
										});
									}, 500);
									// feature.popupTemplate = { // autocasts as
									// // new
									// // PopupTemplate()
									// title : "{乡镇界_高标准农田}",
									// content : "<b>市州省:</b> {ProName}"
									// + "<br><b>市:</b> {CityName}"
									// + "<br><b>县:</b> {CouName}"
									// + "<br><b>片区:</b> {NamSec}"
									// + "<br><b>乡镇:</b> {TownName}"
									// + "<br><b>村:</b> {VilName}"
									// };
								} else if (layerName === '村界') {
									getTabProvinceInfo('',
											feature.attributes.ProName);
									getTabCityInfo(feature.attributes.ProName,
											feature.attributes.CityName);
									getTabCountyInfo(
											feature.attributes.CityName,
											feature.attributes.CouName);
									getTabNameSecInfo(
											feature.attributes.CouName,
											feature.attributes.NamSec);
									getTabTownInfo(feature.attributes.NamSec,
											feature.attributes.TownName);
									getTabVillageInfo(
											feature.attributes.TownName,
											feature.attributes.VilName);
									// 激活tab
									activeVillage();
									// 获取数据延时
									setTimeout(function() {
										layui.use('layer', function() {
											var layer = layui.layer;
											layer.open({
												type : 1,
												resize : false,
												title : '村界',
												area : [ '700px', '505px' ],
												content : $('#tab-info-outer')
														.html()
											// 注意，如果str是object，那么需要字符拼接。
											});
										});
									}, 500);
									// feature.popupTemplate = { // autocasts as
									// // new
									// // PopupTemplate()
									// title : "{村界_高标准农田}",
									// content : "<b>市州省:</b> {ProName}"
									// + "<br><b>市:</b> {CityName}"
									// + "<br><b>县:</b> {CouName}"
									// + "<br><b>片区:</b> {NamSec}"
									// + "<br><b>乡镇:</b> {TownName}"
									// + "<br><b>村:</b> {VilName}"
									// };
								}
								// feature.popupTemplate = { // autocasts as new
								// PopupTemplate()
								// title : "{高标准农田}",
								// content : "<b>界省:</b> {ProName}"
								// + "<br><b>市:</b> {CityName}"
								// + "<br><b>县:</b> {CouName}"
								// + "<br><b>片区:</b> {NamSec}"
								// + "<br><b>乡镇:</b> {TownName}"
								// + "<br><b>村:</b> {VilName}"
								// };

								return feature;
							});
						}).then(showPopup); // Send the array of features to
				// showPopup()

				// Shows the results of the Identify in a popup once the promise
				// is resolved
				function showPopup(response) {
					// 屏蔽原来的弹出层，即popuptamplate那块
					// if (response.length > 0) {
					// view.popup.open({
					// features : response,
					// location : event.mapPoint
					// });
					// }
					document.getElementById("viewDiv").style.cursor = "auto";
				}
			}

			// 搜索开始
			var searchWidget = new Search(
					{
						view : view,
						// allPlaceholder: "District or Senator",
						sources : [ {
							featureLayer : {
								// 更换上边的地址 连接 "/5"，实现对县级搜索
								url : "http://10.255.251.39:6080/arcgis/rest/services/gaobiaotest/510000/MapServer/5",
								popupTemplate : { // autocasts as new
									// PopupTemplate()
//									title : "Congressional District {CouName} </br>{CouName}, {CouName}",
//									overwriteActions : true
								}
							},
							// searchAllEnabled:false,
							searchFields : [ "CouName" ],
							displayField : "CouName",
							exactMatch : false,
							outFields : [ "CouName", "CouName", "CouName" ],
							name : "各区县地图",
							placeholder : "温江区",
							resultSymbol : {
								// type: "simple-line", // autocasts as new
								// SimpleFillSymbol()
								type : "simple-fill", // autocasts as new
								// SimpleFillSymbol()
								// color: "red",
								outline : { // autocasts as new
									// SimpleLineSymbol()
									color : "red",
									width : "3px"
								}
							}

						} ]
					});
			// 搜索 结束
			
			//xxxx

			// 搜索界面
			// Add the search widget to the top left corner of the view
			view.ui.add(searchWidget, {
				position : "top-right"
			});

			// 搜索后在控制台输出搜索的内容
			searchWidget.on("select-result", function(event) {
				//那就把这个函数作为大本营来弹出搜索的时候的框框
				console.log("[GISINIT 400行]gisinit搜索调用输出：");
				var json_result = JSON.stringify(event.result);
				console.log(json_result);
				//测试
				searchPopup(json_result);
			});
			// 图例开始
			var legend = new Legend({
				view : view
			});
			view.ui.add(legend, "bottom-right");

		});

// 查询时地图的定位开始
function btnsc(selectedNode) {
	console.log("[GISINIT419]-->btnsc被调用");
	require([ "esri/tasks/QueryTask", "esri/tasks/support/Query",
		"esri/symbols/SimpleFillSymbol", "dojo/domReady!" ], function(
		QueryTask, Query, SimpleFillSymbol) {
		console.log("[GISINIT423]-->btnsc被调用,开始定义查询");
		//查询定位
		var layer;
		var role = selectedNode.role;
		console.log("[GISINIT423]-->btnsc被调用,开始定义查询，:::" + role);
		if (role == 'city') {
			layer = '/6';
		} else if (role == 'county') {
			layer = '/5';
		} else if (role == 'namesec') {
			layer = '/3';
		} else if (role == 'town') {
			layer = '/2';
		} else if (role == 'village') {
			layer = '/1';
		} else if (role == 'province') {
			layer = '/7';
		}
		console.log("[GISINIT423]-->btnsc被调用,开始定义查询，:::" + role + "图层:::" + layer);
		//定义查询任务
		var queryTask = new QueryTask({
			url : "http://10.255.251.39:6080/arcgis/rest/services/gaobiaotest/510000/MapServer/" + layer + "/query"
		});
		
		// 查询条件
		var name = selectedNode.name;
		var query = new Query();
		query.returnGeometry = true;
		//query.f = 'JSON';
		query.outFields = [ "*" ];
		//query.returnExtentsOnly = false;
		//query.returnDistinctValues = false;
		//query.returnM = false;
	//	query.returnZ = false;
		//query.returnCountOnly = false;
		//query.returnIdsOnly = false;
	//	query.returnTrueCurves = false;
		//query.spatialRel = 'esriSpatialRelIntersects';
	//	query.geometryType = 'esriGeometryEnvelope';
		
		console.log("query is OK");
		
		// 不同的区域需要不同的where子句
		if (role == 'city') {
			query.where = "CityName like '%" + name + "%'";
		} else if (role == 'county') {
			query.where = "CouName like '%" + name + "%'";
		} else if (role == 'namesec') {
			query.where = "NameSec like '%" + name + "%'";
		} else if (role == 'town') {
			query.where = "TownName like '%" + name + "%'";
		} else if (role == 'village') {
			query.where = "VilName like '%" + name + "%'";
		} else if (role == 'province') {
			query.where = "ProName like '%" + name + "%'";
		}
		console.log("query where is OK");
		
		queryTask.execute(query).then(function(results) {
			// debugger;
			console.log("GISINIT471->queryTask.execute(query) results:" + JSON.stringify(results.features[0])); 
			var grcphic = results.features[0];
			view.goTo(grcphic); // 跳转地图
			console.log("已跳转到地图位置");
			// 高亮区域
			// 清空之前高亮区域存在的话
			view.graphics.removeAll();
			var highlightSymbol = new SimpleFillSymbol({
				//  type: "simple-fill",  // autocasts as new SimpleFillSymbol()
				// color: [255, 255, 255, 0.5],
				// style: "diagonal-cross",
				outline : { // autocasts as new SimpleLineSymbol()
					color : "red",
					width : "3px"
				}
			});
			//var geometry = graphic.geometry;
			//var newGraphic = new Graphic(geometry);
			grcphic.symbol = highlightSymbol;
			view.graphics.add(grcphic);
		});
	});
};
//查询时地图的定位结束

/**
 * 该函数用于在搜索的时候
 * @Param NodeNameInfo searchwidget搜索后返回的name字段，可以找到省字段，市字段，等等。。。
 * @returns
 */
function searchPopup(results) {
	//1。根据搜索的名字找到应节点的
	//测试
	var result = JSON.parse(results);
	console.log(result);
	console.log("[gisinit956]searchPopup invoked");
	var ProName = result.feature.attributes.ProName;
	var CityName = result.feature.attributes.CityName;
	var CouName = result.feature.attributes.CouName;
	var TownName = result.feature.attributes.TownName;
	var VilName = result.feature.attributes.VilName;
	var OBJECTID = result.feature.attributes.OBJECTID;
	
	var role;
	
	console.log(CouName + "  "  + CityName + "   " + ProName + "  " + TownName + "   " + VilName + "  " + OBJECTID);
	
	if(CouName != undefined){//当前显示级别为县级
		role = 'county';
	}
	if(ProName != undefined){
		role = 'province';
	}
	if(CityName != undefined){
		role = 'city';
	}
	if(TownName != undefined){
		role = 'town';
	}
	if(VilName != undefined){ 
		role = 'village';
	}
	
	$.post(
	  		'../tree/nodeinfo', 
	  		{
		  		sessionKey:sessionStorage.getItem('sessionId'),
		       	OBJECTID:OBJECTID,
		       	role:role
			}, function(str){
				//设置div里面的值
				str = JSON.parse(str);  //转换为对象
				
				var path = selectedNodePath;
				
				$('#YearShow').html(str.yearshow);
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
