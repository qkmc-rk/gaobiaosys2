require([ "esri/config" ], function(esriConfig) {
	esriConfig.request.corsEnabledServers.push("113.54.15.13");
});

require([ "esri/Map", "esri/views/SceneView", "esri/layers/MapImageLayer",
				"esri/Basemap", "esri/layers/TileLayer",
				"esri/layers/FeatureLayer", "esri/widgets/Legend",
				"esri/renderers/smartMapping/creators/color",
				"esri/widgets/ColorSlider", "esri/Color",
				"esri/renderers/smartMapping/symbology/color",
				"esri/core/lang", "dojo/on", "esri/widgets/LayerList",
				"esri/tasks/QueryTask", "esri/views/MapView",
				"esri/layers/GraphicsLayer", "esri/Graphic",
				"esri/symbols/TextSymbol", "esri/widgets/AreaMeasurement3D",
				"esri/geometry/Point", "esri/symbols/WebStyleSymbol",
				"esri/layers/support/LabelClass", "esri/layers/ImageryLayer",
				"esri/layers/support/RasterFunction",
				"esri/tasks/Geoprocessor", "esri/tasks/support/Query",
				"dojo/domReady!" ],
		function(Map, SceneView, MapImageLayer, Basemap, TileLayer,
				FeatureLayer, Legend, colorRendererCreator, ColorSlider, Color,
				colorSchemes, lang, on, layerList, QueryTask, MapView,
				GraphicsLayer, Graphic, TextSymbol, AreaMeasurement3D, Point,
				WebStyleSymbol, LabelClass, ImageryLayer, RasterFunction,
				Geoprocessor, Query) {
			sichuan = new MapImageLayer(
					{
						url : "http://113.54.15.13:6080/arcgis/rest/services/test/sc_dynamic/MapServer",
						sublayers : [ {
							id : 7
						}, {
							id : 6,
							definitionExpression : "ProCode = '510000'"
						}, {
							id : 5,
							definitionExpression : "ProCode = '510000'"
						}, {
							id : 4,
							definitionExpression : "ProCode ='510000'"
						}, {
							id : 3,
							definitionExpression : "ProCode ='510000'"
						}, {
							id : 2,
							definitionExpression : "ProCode = '510000'"
						}, {
							id : 1,
							definitionExpression : "ProCode ='510000'"
						}, {
							id : 0,
							definitionExpression : "ProCode ='510000'"
						} ]
					})
			map = new Map({
				layers : [ sichuan ],

			})
			view = new SceneView({
				container : "viewDiv",
				map : map,
				viewingMode : "global",
				center : [ 104, 30 ],
				zoom : 7,
				environment : {
					atmosphereEnabled : {
						atmosphere : {
							quality : "high"
						}
					}
				}
			})
			
			//根据districtCode更新图层
			var districtCode = window.sessionStorage.getItem('districtCode');
			var text = districtCode;
			var sheng = text.slice(2, 4);
			var xian = text.slice(4, 6);
			if (xian == "00") {
				if (sheng == "00") {

					sichuan.sublayers.items[6].definitionExpression = "ProCode = '"
							+ text + "'"
					sichuan.sublayers.items[5].definitionExpression = "ProCode = '"
							+ text + "'"
					sichuan.sublayers.items[4].definitionExpression = "ProCode = '"
							+ text + "'"
					sichuan.sublayers.items[3].definitionExpression = "ProCode = '"
							+ text + "'"
					sichuan.sublayers.items[2].definitionExpression = "ProCode = '"
							+ text + "'"
					sichuan.sublayers.items[1].definitionExpression = "ProCode = '"
							+ text + "'"
					sichuan.sublayers.items[0].definitionExpression = "ProCode = '"
							+ text + "'"
					var lyr = new FeatureLayer(
							{
								url : "http://113.54.15.13:6080/arcgis/rest/services/test/sc_dynamic/MapServer/7"
							});

					var query = new Query();
					query.where = "ProCode = '" + text + "'";

					lyr.queryExtent(query).then(function(results) {
						view.goTo(results.extent); // go to the extent of the results
													// satisfying the query
					});
				} else {

					sichuan.sublayers.items[6].definitionExpression = "CityCode = '"
							+ text + "'"
					sichuan.sublayers.items[5].definitionExpression = "CityCode = '"
							+ text + "'"
					sichuan.sublayers.items[4].definitionExpression = "CityCode = '"
							+ text + "'"
					sichuan.sublayers.items[3].definitionExpression = "CityCode = '"
							+ text + "'"
					sichuan.sublayers.items[2].definitionExpression = "CityCode = '"
							+ text + "'"
					sichuan.sublayers.items[1].definitionExpression = "CityCode = '"
							+ text + "'"
					sichuan.sublayers.items[0].definitionExpression = "CityCode = '"
							+ text + "'"
					var lyr = new FeatureLayer(
							{
								url : "http://113.54.15.13:6080/arcgis/rest/services/test/sc_dynamic/MapServer/6"
							});

					var query = new Query();
					query.where = "CityCode = '" + text + "'";

					lyr.queryExtent(query).then(function(results) {
						view.goTo(results.extent); // go to the extent of the results
													// satisfying the query
					});
				}
			} else {

				sichuan.sublayers.items[6].definitionExpression = "CouCode = '" + text
						+ "'"
				sichuan.sublayers.items[5].definitionExpression = "CouCode = '" + text
						+ "'"
				sichuan.sublayers.items[4].definitionExpression = "CouCode = '" + text
						+ "'"
				sichuan.sublayers.items[3].definitionExpression = "CouCode = '" + text
						+ "'"
				sichuan.sublayers.items[2].definitionExpression = "CouCode = '" + text
						+ "'"
				sichuan.sublayers.items[1].definitionExpression = "CouCode = '" + text
						+ "'"
				sichuan.sublayers.items[0].definitionExpression = "CouCode = '" + text
						+ "'"
				var lyr = new FeatureLayer(
						{
							url : "http://113.54.15.13:6080/arcgis/rest/services/test/sc_dynamic/MapServer/5"
						});

				var query = new Query();
				query.where = "CouCode = '" + text + "'";

				lyr.queryExtent(query).then(function(results) {
					view.goTo(results.extent); // go to the extent of the results
												// satisfying the query

				});
			}
		}/*function结束*/
		 )

// 当用户点击某个树的节点时，该函数会被调用，被点击节点的区域代码传入，函数根据传入的区域代码进行图层的重新加载
function changeLayerbyDistrictCode(districtCode) {//最后一个变量是我添加的
	console.log("[日志]gisinit70行：根据传入的districtCode重新加载图层");
	// 代码段1 初始化图层
	require([ "esri/config" ], function(esriConfig) {
		esriConfig.request.corsEnabledServers.push("113.54.15.13");
	});

	require([ "esri/Map", "esri/views/SceneView", "esri/layers/MapImageLayer",
					"esri/Basemap", "esri/layers/TileLayer",
					"esri/layers/FeatureLayer", "esri/widgets/Legend",
					"esri/renderers/smartMapping/creators/color",
					"esri/widgets/ColorSlider", "esri/Color",
					"esri/renderers/smartMapping/symbology/color",
					"esri/core/lang", "dojo/on", "esri/widgets/LayerList",
					"esri/tasks/QueryTask", "esri/views/MapView",
					"esri/layers/GraphicsLayer", "esri/Graphic",
					"esri/symbols/TextSymbol", "esri/widgets/AreaMeasurement3D",
					"esri/geometry/Point", "esri/symbols/WebStyleSymbol",
					"esri/layers/support/LabelClass", "esri/layers/ImageryLayer",
					"esri/layers/support/RasterFunction",
					"esri/tasks/Geoprocessor", "esri/tasks/support/Query",
					"dojo/domReady!" ],
			function(Map, SceneView, MapImageLayer, Basemap, TileLayer,
					FeatureLayer, Legend, colorRendererCreator, ColorSlider, Color,
					colorSchemes, lang, on, layerList, QueryTask, MapView,
					GraphicsLayer, Graphic, TextSymbol, AreaMeasurement3D, Point,
					WebStyleSymbol, LabelClass, ImageryLayer, RasterFunction,
					Geoprocessor, Query) {
				sichuan = new MapImageLayer(
						{
							url : "http://113.54.15.13:6080/arcgis/rest/services/test/sc_dynamic/MapServer",
							sublayers : [ {
								id : 7
							}, {
								id : 6,
								definitionExpression : "ProCode = '510000'"
							}, {
								id : 5,
								definitionExpression : "ProCode = '510000'"
							}, {
								id : 4,
								definitionExpression : "ProCode ='510000'"
							}, {
								id : 3,
								definitionExpression : "ProCode ='510000'"
							}, {
								id : 2,
								definitionExpression : "ProCode = '510000'"
							}, {
								id : 1,
								definitionExpression : "ProCode ='510000'"
							}, {
								id : 0,
								definitionExpression : "ProCode ='510000'"
							} ]
						})
				map = new Map({
					layers : [ sichuan ],

				})
				view = new SceneView({
					container : "viewDiv",
					map : map,
					viewingMode : "global",
					center : [ 104, 30 ],
					zoom : 7,
					environment : {
						atmosphereEnabled : {
							atmosphere : {
								quality : "high"
							}
						}
					}
				})
				//根据districtCode更新图层
				var text = districtCode;
				var sheng = text.slice(2, 4);
				var xian = text.slice(4, 6);
				if (xian == "00") {
					if (sheng == "00") {

						sichuan.sublayers.items[6].definitionExpression = "ProCode = '"
								+ text + "'"
						sichuan.sublayers.items[5].definitionExpression = "ProCode = '"
								+ text + "'"
						sichuan.sublayers.items[4].definitionExpression = "ProCode = '"
								+ text + "'"
						sichuan.sublayers.items[3].definitionExpression = "ProCode = '"
								+ text + "'"
						sichuan.sublayers.items[2].definitionExpression = "ProCode = '"
								+ text + "'"
						sichuan.sublayers.items[1].definitionExpression = "ProCode = '"
								+ text + "'"
						sichuan.sublayers.items[0].definitionExpression = "ProCode = '"
								+ text + "'"
						var lyr = new FeatureLayer(
								{
									url : "http://113.54.15.13:6080/arcgis/rest/services/test/sc_dynamic/MapServer/7"
								});

						var query = new Query();
						query.where = "ProCode = '" + text + "'";

						lyr.queryExtent(query).then(function(results) {
							view.goTo(results.extent); // go to the extent of the results
														// satisfying the query
						});
					} else {

						sichuan.sublayers.items[6].definitionExpression = "CityCode = '"
								+ text + "'"
						sichuan.sublayers.items[5].definitionExpression = "CityCode = '"
								+ text + "'"
						sichuan.sublayers.items[4].definitionExpression = "CityCode = '"
								+ text + "'"
						sichuan.sublayers.items[3].definitionExpression = "CityCode = '"
								+ text + "'"
						sichuan.sublayers.items[2].definitionExpression = "CityCode = '"
								+ text + "'"
						sichuan.sublayers.items[1].definitionExpression = "CityCode = '"
								+ text + "'"
						sichuan.sublayers.items[0].definitionExpression = "CityCode = '"
								+ text + "'"
						var lyr = new FeatureLayer(
								{
									url : "http://113.54.15.13:6080/arcgis/rest/services/test/sc_dynamic/MapServer/6"
								});

						var query = new Query();
						query.where = "CityCode = '" + text + "'";

						lyr.queryExtent(query).then(function(results) {
							view.goTo(results.extent); // go to the extent of the results
														// satisfying the query
						});
					}
				} else {

					sichuan.sublayers.items[6].definitionExpression = "CouCode = '" + text
							+ "'"
					sichuan.sublayers.items[5].definitionExpression = "CouCode = '" + text
							+ "'"
					sichuan.sublayers.items[4].definitionExpression = "CouCode = '" + text
							+ "'"
					sichuan.sublayers.items[3].definitionExpression = "CouCode = '" + text
							+ "'"
					sichuan.sublayers.items[2].definitionExpression = "CouCode = '" + text
							+ "'"
					sichuan.sublayers.items[1].definitionExpression = "CouCode = '" + text
							+ "'"
					sichuan.sublayers.items[0].definitionExpression = "CouCode = '" + text
							+ "'"
					var lyr = new FeatureLayer(
							{
								url : "http://113.54.15.13:6080/arcgis/rest/services/test/sc_dynamic/MapServer/5"
							});

					var query = new Query();
					query.where = "CouCode = '" + text + "'";

					lyr.queryExtent(query).then(function(results) {
						view.goTo(results.extent); // go to the extent of the results
													// satisfying the query

					});
				}
			}/*function结束*/
			 )
	// 代码段1
}

// 该函数完成某个功能：点击树，树调用该函数，并传入selectedNode的信息
function btnsc(selectedNode) {
	var districtCode;
	var rk_rank = selectedNode.role;
	if (rk_rank == 'city') {
		districtCode = selectedNode.code;
		console.log("[日志]点击树，现在获取当前节点的CityCode:" + districtCode);
	} else if (rk_rank == 'county') {
		districtCode = selectedNode.code;
		console.log("[日志]点击树，现在获取当前节点的CouCode:" + districtCode);
	} else if (rk_rank == 'namesec') {
		districtCode = selectedNode.code;//这里不应该是CouCode，不知道如何处理namesec
	} else if (rk_rank == 'town') {
		districtCode = selectedNode.code;
		console.log("[日志]点击树，现在获取当前节点的TownCode:" + districtCode);
	} else if (rk_rank == 'village') {
		districtCode = selectedNode.code;
		console.log("[日志]点击树，现在获取当前节点的VilCode:" + districtCode);
	} else if (rk_rank == 'province') {
		districtCode = selectedNode.code;
		console.log("[日志]点击树，现在获取当前节点的ProCode:" + districtCode);
	}
	changeLayerbyDistrictCode(districtCode);
}
