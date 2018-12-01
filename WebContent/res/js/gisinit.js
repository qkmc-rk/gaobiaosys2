var soilURL;
var view;

require(
		[ "esri/Map", "esri/views/MapView", "esri/layers/TileLayer",
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

			var view = new MapView({
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
								// 更换上边的地址 连接 "/6"，实现对县级搜索
								url : "http://10.255.251.39:6080/arcgis/rest/services/gaobiaotest/510000/MapServer/6",
								popupTemplate : { // autocasts as new
									// PopupTemplate()
									title : "Congressional District {CouName} </br>{CouName}, {CouName}",
									overwriteActions : true
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

			// 搜索界面
			// Add the search widget to the top left corner of the view
			view.ui.add(searchWidget, {
				position : "top-right"
			});

			// 搜索后在控制台输出搜索的内容
			searchWidget.on("select-result", function(event) {
				//那就把这个函数作为大本营来弹出搜索的时候的框框
				console.log("gisinit搜索调用输出：" + event.result.name);
				var json_result = JSON.stringify(event.result);
				console.log(json_result);

				//测试
				searchPopup(event.result.name);
			});

			// 图例开始
			var legend = new Legend({
				view : view
			});
			view.ui.add(legend, "bottom-right");

		});

// 查询定位开始
function btnsc(selectedNode) {
	console.log("gisinit第404行，[btnsc输出selectedNode]-->" + selectedNode.code);
	require(
			[ "esri/Map", "esri/views/MapView", "esri/layers/TileLayer",
					"esri/tasks/IdentifyTask",
					"esri/tasks/support/IdentifyParameters",
					"esri/widgets/Search", "esri/widgets/Legend",
					"esri/widgets/LayerList" ],
			function(Map, MapView, TileLayer, IdentifyTask, IdentifyParameters,
					Search, Legend, LayerList) {

				var identifyTask, params;

				// 执行地图更换操作
				var soilURL = "http://10.255.251.39:6080/arcgis/rest/services/gaobiaotest/"
						+ selectedNode.code + "/MapServer";

				var parcelsLayer = new TileLayer({
					url : soilURL,
					opacity : 0.85
				});

				var map = new Map({
				// basemap: "osm"
				});

				map.add(parcelsLayer);

				var view = new MapView({
					map : map,
					container : "viewDiv",
					center : [ 104.06, 30.67 ],
					zoom : 1
				});

				view.when(function() {
					// executeIdentifyTask() is called each time the view is
					// clicked
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

					// This function returns a promise that resolves to an array
					// of
					// features
					// A custom popupTemplate is set for each feature based on
					// the
					// layer it
					// originates from
					identifyTask
							.execute(params)
							.then(
									function(response) {

										var results = response.results;

										return results
												.map(function(result) {

													var feature = result.feature;
													var layerName = result.layerName;

													feature.attributes.layerName = layerName;
													if (layerName === '省界') {
														// 这里获取数据并将数据显示在div中
														var province = '四川省';
														getTabProvinceInfo(
																'',
																feature.attributes.ProName);
														clearTabCityInfo();
														clearTabCountyInfo();
														clearTabNameSecInfo();
														clearTabTownInfo();
														clearTabVillageInfo();
														// 激活tab
														activeProvince();
														// 获取数据延时
														setTimeout(
																function() {
																	layui
																			.use(
																					'layer',
																					function() {
																						var layer = layui.layer;
																						layer
																								.open({
																									type : 1,
																									resize : false,
																									title : '省界',
																									area : [
																											'700px',
																											'505px' ],
																									content : $(
																											'#tab-info-outer')
																											.html()
																								// 注意，如果str是object，那么需要字符拼接。
																								});
																					});
																}, 500);
														// 弹出数据
														// feature.popupTemplate
														// = { // autocasts as
														// // new
														// // PopupTemplate()
														// title : "{省界_高标准农田}",
														// content :
														// "<b>省界省:</b>
														// {ProName}"
														// + "<br><b>市:</b>
														// {CityName}"
														// + "<br><b>县:</b>
														// {CouName}"
														// + "<br><b>片区:</b>
														// {NamSec}"
														// + "<br><b>乡镇:</b>
														// {TownName}"
														// + "<br><b>村:</b>
														// {VilName}"
														// };
													}
													if (layerName === '市州界') {
														getTabProvinceInfo(
																'',
																feature.attributes.ProName);
														getTabCityInfo(
																feature.attributes.ProName,
																feature.attributes.CityName);
														clearTabCountyInfo();
														clearTabNameSecInfo();
														clearTabTownInfo();
														clearTabVillageInfo();
														// 激活tab
														activeCity();
														// 获取数据延时
														setTimeout(
																function() {
																	layui
																			.use(
																					'layer',
																					function() {
																						var layer = layui.layer;
																						layer
																								.open({
																									type : 1,
																									resize : false,
																									title : '市州界',
																									area : [
																											'700px',
																											'505px' ],
																									content : $(
																											'#tab-info-outer')
																											.html()
																								// 注意，如果str是object，那么需要字符拼接。
																								});
																					});
																}, 500);

														// feature.popupTemplate
														// = { // autocasts as
														// // new
														// // PopupTemplate()
														// title :
														// "{市州界_高标准农田}",
														// content :
														// "<b>市州省:</b>
														// {ProName}"
														// + "<br><b>市:</b>
														// {CityName}"
														// + "<br><b>县:</b>
														// {CouName}"
														// + "<br><b>片区:</b>
														// {NamSec}"
														// + "<br><b>乡镇:</b>
														// {TownName}"
														// + "<br><b>村:</b>
														// {VilName}"
														// };
													} else if (layerName === '区县界') {
														getTabProvinceInfo(
																'',
																feature.attributes.ProName);
														getTabCityInfo(
																feature.attributes.ProName,
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
														setTimeout(
																function() {
																	layui
																			.use(
																					'layer',
																					function() {
																						var layer = layui.layer;
																						layer
																								.open({
																									type : 1,
																									resize : false,
																									title : '区县界',
																									area : [
																											'700px',
																											'505px' ],
																									content : $(
																											'#tab-info-outer')
																											.html()
																								// 注意，如果str是object，那么需要字符拼接。
																								});
																					});
																}, 500);
														// feature.popupTemplate
														// = { // autocasts as
														// // new
														// // PopupTemplate()
														// title :
														// "{县区界_高标准农田}",
														// content :
														// "<b>市州省:</b>
														// {ProName}"
														// + "<br><b>市:</b>
														// {CityName}"
														// + "<br><b>县:</b>
														// {CouName}"
														// + "<br><b>片区:</b>
														// {NamSec}"
														// + "<br><b>乡镇:</b>
														// {TownName}"
														// + "<br><b>村:</b>
														// {VilName}"
														// };
													} else if (layerName === '片区界') {
														getTabProvinceInfo(
																'',
																feature.attributes.ProName);
														getTabCityInfo(
																feature.attributes.ProName,
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
														setTimeout(
																function() {
																	layui
																			.use(
																					'layer',
																					function() {
																						var layer = layui.layer;
																						layer
																								.open({
																									type : 1,
																									resize : false,
																									title : '片区界',
																									area : [
																											'700px',
																											'505px' ],
																									content : $(
																											'#tab-info-outer')
																											.html()
																								// 注意，如果str是object，那么需要字符拼接。
																								});
																					});
																}, 500);
														// feature.popupTemplate
														// = { // autocasts as
														// // new
														// // PopupTemplate()
														// title :
														// "{片区界_高标准农田}",
														// content :
														// "<b>市州省:</b>
														// {ProName}"
														// + "<br><b>市:</b>
														// {CityName}"
														// + "<br><b>县:</b>
														// {CouName}"
														// + "<br><b>片区:</b>
														// {NamSec}"
														// + "<br><b>乡镇:</b>
														// {TownName}"
														// + "<br><b>村:</b>
														// {VilName}"
														// };
													} else if (layerName === '乡镇界') {
														getTabProvinceInfo(
																'',
																feature.attributes.ProName);
														getTabCityInfo(
																feature.attributes.ProName,
																feature.attributes.CityName);
														getTabCountyInfo(
																feature.attributes.CityName,
																feature.attributes.CouName);
														getTabNameSecInfo(
																feature.attributes.CouName,
																feature.attributes.NamSec);
														getTabTownInfo(
																feature.attributes.NamSec,
																feature.attributes.TownName);
														clearTabVillageInfo();
														// 激活tab
														activeTown();
														// 获取数据延时
														setTimeout(
																function() {
																	layui
																			.use(
																					'layer',
																					function() {
																						var layer = layui.layer;
																						layer
																								.open({
																									type : 1,
																									resize : false,
																									title : '乡镇界',
																									area : [
																											'700px',
																											'505px' ],
																									content : $(
																											'#tab-info-outer')
																											.html()
																								// 注意，如果str是object，那么需要字符拼接。
																								});
																					});
																}, 500);
														// feature.popupTemplate
														// = { // autocasts as
														// // new
														// // PopupTemplate()
														// title :
														// "{乡镇界_高标准农田}",
														// content :
														// "<b>市州省:</b>
														// {ProName}"
														// + "<br><b>市:</b>
														// {CityName}"
														// + "<br><b>县:</b>
														// {CouName}"
														// + "<br><b>片区:</b>
														// {NamSec}"
														// + "<br><b>乡镇:</b>
														// {TownName}"
														// + "<br><b>村:</b>
														// {VilName}"
														// };
													} else if (layerName === '村界') {
														getTabProvinceInfo(
																'',
																feature.attributes.ProName);
														getTabCityInfo(
																feature.attributes.ProName,
																feature.attributes.CityName);
														getTabCountyInfo(
																feature.attributes.CityName,
																feature.attributes.CouName);
														getTabNameSecInfo(
																feature.attributes.CouName,
																feature.attributes.NamSec);
														getTabTownInfo(
																feature.attributes.NamSec,
																feature.attributes.TownName);
														getTabVillageInfo(
																feature.attributes.TownName,
																feature.attributes.VilName);
														// 激活tab
														activeVillage();
														// 获取数据延时
														setTimeout(
																function() {
																	layui
																			.use(
																					'layer',
																					function() {
																						var layer = layui.layer;
																						layer
																								.open({
																									type : 1,
																									resize : false,
																									title : '村界',
																									area : [
																											'700px',
																											'505px' ],
																									content : $(
																											'#tab-info-outer')
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
									// 更换上边的地址 连接 "/6"，实现对县级搜索
									url : "http://10.255.251.39:6080/arcgis/rest/services/gaobiaotest/510000/MapServer/6",
									popupTemplate : { // autocasts as new
										// PopupTemplate()
										title : "Congressional District {CouName} </br>{CouName}, {CouName}",
										overwriteActions : true
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

				// 搜索界面
				// Add the search widget to the top left corner of the view
				view.ui.add(searchWidget, {
					position : "top-right"
				});

				// 搜索后在控制台输出搜索的内容
				searchWidget.on("select-result", function(event) {
					//那就把这个函数作为大本营来弹出搜索的时候的框框
					console.log("gisinit搜索调用输出：" + event.result.name);
					var json_result = JSON.stringify(event.result);
					console.log(json_result);

					//测试内容
					console.log("gisinit第931行测试showselected");
					searchPopup(event.result.name);
				});

				// 图例开始
				var legend = new Legend({
					view : view
				});
				view.ui.add(legend, "bottom-right");

			});
};
//查询定位结束

/**
 * 该函数用于在搜索的时候
 * @Param NodeNameInfo searchwidget搜索后返回的name字段，可以找到省字段，市字段，等等。。。
 * @returns
 */
function searchPopup(NodeNameInfo) {
	//1。根据搜索的名字找到应节点的
	//测试
	console.log("[gisinit956]searchPopup invoked");
	var ProName = NodeNameInfo.split("省")[0] + "省";
	var CityName = NodeNameInfo.split("省")[1].split("市")[0] + "市";
	var CouName = NodeNameInfo.split("省")[1].split("市")[1].split("县")[0] + "县";
	console.log("[gisinit960]暂时只支持县级以上的搜索功能：" + ProName + "  "  + CityName + " " + CouName);
	if(CouName != undefined){//当前显示级别为县级
		getTabProvinceInfo('',
				ProName);
		getTabCityInfo(ProName,
				CityName);
		getTabCountyInfo(
				CityName,
				CouName);
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
	}else{
		if(CityName != undefined){//当前显示级别为市级
			getTabProvinceInfo('',
					ProName);
			getTabCityInfo(ProName,
					CityName);
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
		}else{
			if(ProName != undefined){//当前显示级别为省级
				getTabProvinceInfo('',
						ProName);
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
			}
		}
	}
}
