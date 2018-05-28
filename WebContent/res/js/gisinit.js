var soilURL;
var view;
require([ "esri/config" ], function(esriConfig) {
	esriConfig.request.corsEnabledServers.push("113.54.15.13");
});

require(
		[ "esri/Map", "esri/views/MapView", "esri/layers/TileLayer",
				"esri/tasks/IdentifyTask",
				"esri/tasks/support/IdentifyParameters", "dojo/_base/array",
				"dojo/on", "dojo/dom", "esri/widgets/Search",
				"esri/widgets/LayerList", "esri/widgets/Legend",
				"dojo/domReady!" ],
		function(Map, MapView, TileLayer, IdentifyTask, IdentifyParameters,
				arrayUtils, on, dom, Search, LayerList, Legend) {

			var identifyTask, params;

			// URL to the map service where the identify will be performed
			soilURL = "http://113.54.15.13:6080/arcgis/rest/services/test/gaobiaoalltest/MapServer";

			// Add the map service as a TileLayer for fast rendering
			// Tile layers are composed of non-interactive images. For that reason we'll
			// use IdentifyTask to query the service to add interactivity to the app
			var parcelsLyr = new TileLayer({
				url : soilURL,
				opacity : 0.85
			});
			var map = new Map({
				basemap : "osm"
			});
			map.add(parcelsLyr);
			view = new MapView({
				map : map,
				container : "viewDiv",
				center : [ 104.06, 30.67 ],
				zoom : 7
			});
			view.when(function() {
				// executeIdentifyTask() is called each time the view is clicked
				on(view, "click", executeIdentifyTask);
				// Create identify task for the specified map service
				identifyTask = new IdentifyTask(soilURL);
				// Set the parameters for the Identify
				params = new IdentifyParameters();
				params.tolerance = 3;
				params.layerIds = [ 0, 1, 2, 3, 4, 5, 6 ];
				params.layerOption = "top";
				params.width = view.width;
				params.height = view.height;
			}, function(error) {
				console.log(error);
			});
			// Executes each time the view is clicked
			function executeIdentifyTask(event) {
				// Set the geometry to the location of the view click
				params.geometry = event.mapPoint;
				params.mapExtent = view.extent;
				dom.byId("viewDiv").style.cursor = "wait";

				// This function returns a promise that resolves to an array of features
				// A custom popupTemplate is set for each feature based on the layer it
				// originates from
				identifyTask.execute(params).then(
						function(response) {
							var results = response.results;
							return arrayUtils.map(results, function(result) {
								var feature = result.feature;
								var layerName = result.layerName;
								feature.attributes.layerName = layerName;
								if (layerName === '省界') {
									feature.popupTemplate = { // autocasts as new PopupTemplate()
										title : "{省界_高标准农田}",
										content : "<b>省界省:</b> {ProName}"
												+ "<br><b>市:</b> {CityName}"
												+ "<br><b>县:</b> {CouName}"
												+ "<br><b>片区:</b> {NamSec}"
												+ "<br><b>乡镇:</b> {TownName}"
												+ "<br><b>村:</b> {VilName}"
									};
								}
								if (layerName === '市州界') {
									feature.popupTemplate = { // autocasts as new PopupTemplate()
										title : "{市州界_高标准农田}",
										content : "<b>市州省:</b> {ProName}"
												+ "<br><b>市:</b> {CityName}"
												+ "<br><b>县:</b> {CouName}"
												+ "<br><b>片区:</b> {NamSec}"
												+ "<br><b>乡镇:</b> {TownName}"
												+ "<br><b>村:</b> {VilName}"
									};
								} else if (layerName === '区县界') {
									feature.popupTemplate = { // autocasts as new PopupTemplate()
										title : "{县区界_高标准农田}",
										content : "<b>市州省:</b> {ProName}"
												+ "<br><b>市:</b> {CityName}"
												+ "<br><b>县:</b> {CouName}"
												+ "<br><b>片区:</b> {NamSec}"
												+ "<br><b>乡镇:</b> {TownName}"
												+ "<br><b>村:</b> {VilName}"
									};
								} else if (layerName === '片区界') {
									feature.popupTemplate = { // autocasts as new PopupTemplate()
										title : "{片区界_高标准农田}",
										content : "<b>市州省:</b> {ProName}"
												+ "<br><b>市:</b> {CityName}"
												+ "<br><b>县:</b> {CouName}"
												+ "<br><b>片区:</b> {NamSec}"
												+ "<br><b>乡镇:</b> {TownName}"
												+ "<br><b>村:</b> {VilName}"
									};
								} else if (layerName === '乡镇界') {
									feature.popupTemplate = { // autocasts as new PopupTemplate()
										title : "{乡镇界_高标准农田}",
										content : "<b>市州省:</b> {ProName}"
												+ "<br><b>市:</b> {CityName}"
												+ "<br><b>县:</b> {CouName}"
												+ "<br><b>片区:</b> {NamSec}"
												+ "<br><b>乡镇:</b> {TownName}"
												+ "<br><b>村:</b> {VilName}"
									};
								} else if (layerName === '村界') {
									feature.popupTemplate = { // autocasts as new PopupTemplate()
										title : "{村界_高标准农田}",
										content : "<b>市州省:</b> {ProName}"
												+ "<br><b>市:</b> {CityName}"
												+ "<br><b>县:</b> {CouName}"
												+ "<br><b>片区:</b> {NamSec}"
												+ "<br><b>乡镇:</b> {TownName}"
												+ "<br><b>村:</b> {VilName}"
									};
								}
								/*
								 feature.popupTemplate = { // autocasts as new PopupTemplate()
								 title: "{高标准农田}",
								 content: "<b>省:</b> {ProName}" +
								 "<br><b>市:</b> {CityName}" +
								 "<br><b>县:</b> {CouName} "
								 }
								 */
								return feature;
							});
						}).then(showPopup); // Send the array of features to showPopup()

				// Shows the results of the Identify in a popup once the promise is resolved
				function showPopup(response) {
					if (response.length > 0) {
						view.popup.open({
							features : response,
							location : event.mapPoint
						});
					}
					dom.byId("viewDiv").style.cursor = "auto";
				}
			}
			//搜索开始
			var searchWidget = new Search(
					{
						view : view,
						//allPlaceholder: "District or Senator",
						sources : [ {
							featureLayer : {
								url : "http://113.54.15.13:6080/arcgis/rest/services/test/gaobiaotest2011/MapServer/6",
								popupTemplate : { // autocasts as new PopupTemplate()
									title : "Congressional District {CouName} </br>{CouName}, {CouName}",
									overwriteActions : true
								}
							},
							searchFields : [ "CouName" ],
							displayField : "CouName",
							exactMatch : false,
							outFields : [ "CouName", "CouName", "CouName" ],
							name : "Congressional Districts",
							placeholder : "温江区",
							resultSymbol : {
								// type: "simple-line",  // autocasts as new SimpleFillSymbol()
								type : "simple-fill", // autocasts as new SimpleFillSymbol()
								// color: "red",
								outline : { // autocasts as new SimpleLineSymbol()
									color : "red",
									width : "3px"
								}
							}

						} ]
					});
			// Add the search widget to the top left corner of the view
			view.ui.add(searchWidget, {
				position : "top-right"
			});
			//搜索结束
			//测试开始
			const layerList = new LayerList({
				view : view,
				listItemCreatedFunction : function(event) {
					const item = event.item;
					item.panel = {
						content : "legend",
						open : true
					};
					item.title = "图例";
				}
			});
			view.ui.add(layerList, "bottom-right");
			//测试结束
			/*

			//图例开始
			var legend = new Legend({
			    view: view,
			    title: "Legend"
			});
			view.ui.add(legend, "bottom-right");
			//图例结
			 */
			//parcelsLyr.visible=false;  //隐藏图层
		});
//查询定位开始
function btnsc(selectedNode) {
	require([ "esri/tasks/QueryTask", "esri/tasks/support/Query",
			"esri/symbols/SimpleFillSymbol", "dojo/domReady!" ], function(
			QueryTask, Query, SimpleFillSymbol) {
		//var layerUrl = MapConfig.FEconomiclayerUrl+"/"+layerid;
		var queryTask = new QueryTask({
			url : soilURL + "/6"
		});
		//查询条件
		var name = selectedNode.name;
		var query = new Query();
		query.returnGeometry = true;
		query.outFields = [ "*" ];
		query.where = "CityName like '%" + name + "%'";

		queryTask.execute(query).then(function(results) {
			//debugger;
			var grcphic = results.features[0];
			view.goTo(grcphic); //跳转地图
			//高亮区域
			//清空之前高亮区域存在的话
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
//查询定位结束
