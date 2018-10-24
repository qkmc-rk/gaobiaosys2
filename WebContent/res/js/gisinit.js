require([ "esri/config" ], function(esriConfig) {
	esriConfig.request.corsEnabledServers.push("113.54.15.13");
});

require([ "esri/Map",
    "esri/layers/MapImageLayer",
    "esri/Basemap",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/renderers/smartMapping/creators/color",
    "esri/widgets/ColorSlider",
    "esri/Color",
    "esri/renderers/smartMapping/symbology/color",
    "esri/core/lang",
    "dojo/on",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/symbols/TextSymbol",
    "esri/geometry/Point",
    "esri/symbols/WebStyleSymbol",
    "esri/layers/support/LabelClass",
    "esri/layers/ImageryLayer",
    "esri/tasks/support/Query",
    "esri/widgets/Search",
    "dojo/domReady!" ],
		function(Map,
                MapImageLayer,
                Basemap,
                FeatureLayer,
                Legend,
                colorRendererCreator,
                ColorSlider,
                Color,
                colorSchemes,
                lang,
                on,
                MapView,
                Graphic,
                TextSymbol,
                Point,
                WebStyleSymbol,
                LabelClass,
                ImageryLayer,
                Query,
                Search) {
			soilURL=new MapImageLayer({
		        url:"http://10.255.251.39:6080/arcgis/rest/services/test/sc_dynamic/MapServer",
		        sublayers:[
		            {
		                id: 7
		            },
		            {
		                id: 6
		
		            },
		            {
		                id: 5
		            },
		            {
		                id: 4
		            },
		            {
		                id: 3
		            },
		            {
		                id: 2
		            },
		            {
		                id: 1
		            },
		            {
		                id: 0
		            }
		        ]
		    })
		    map=new Map({
		        layers:[soilURL]
		
		    })
			var view = new MapView({
                map: map,
                container: "viewDiv",
                center: [104.06, 30.67],
                zoom:7
            });
			
			//根据districtCode更新图层
			var code = window.sessionStorage.getItem('districtCode');
			var role = window.sessionStorage.getItem('role');
			var name = window.sessionStorage.getItem('name');
			console.log("gisinit第91行，解密初始化加载地图需要的数据：" + "code：" + code + "，name：" + name + "，role：" + role + "   ...= =!");
			//根据district的坏毛病确定def_exten的值
			if(name != undefined && name != null && role == 'namesec'){
				def_exten = "NamSec='" + name + "'";
				mylayer = 3;
			}
			else{
				if(role == 'province'){
					def_exten = "ProCode='"+code+"'";
					mylayer = 7;
				}else if(role == 'city'){
					def_exten = "CityCode='"+code+"'";
					mylayer = 6;
				}else if(role == 'county'){
					def_exten = "CouCode='"+code+"'";
					mylayer = 5;
				}else if(role == 'town'){
					def_exten = "TownCode='"+code+"'";
					mylayer = 2;
				}else if(role == 'village'){
					def_exten = "VilCode='"+code+"'";
					mylayer = 1;
				}
			}
			soilURL.sublayers.items[6].definitionExpression=def_exten;
            soilURL.sublayers.items[5].definitionExpression=def_exten;
            soilURL.sublayers.items[4].definitionExpression=def_exten;
            soilURL.sublayers.items[3].definitionExpression=def_exten;
            soilURL.sublayers.items[2].definitionExpression=def_exten;
            soilURL.sublayers.items[1].definitionExpression=def_exten;
            soilURL.sublayers.items[0].definitionExpression=def_exten;

                    var layerDispaly = new FeatureLayer({
                       url: "http://10.255.251.39:6080/arcgis/rest/services/test/sc_dynamic/MapServer/" + mylayer
                    });

                    var query = new Query();
                    query.where =def_exten;
                    layerDispaly.queryExtent(query).then(function(results){
                        view.goTo(results.extent);  // go to the extent of the results satisfying the query
                    });


            //图例开始
            var legend = new Legend({
                view: view,
                layerInfos: [{
                    layer: soilURL,
                    title: " "
                }]
            });
            view.ui.add(legend, "bottom-right");
            //图裂结束
		}/*function结束*/
		 );

// 当用户点击某个树的节点时，该函数会被调用，被点击节点的区域代码传入，函数根据传入的区域代码进行图层的重新加载
function changeLayerbyDistrict(district) {//最后一个变量是我添加的
	console.log("gisinit第131行，调用changeLayerbyDistrict函数来意图更改图层，不过现实绝对不会那么容易让它得逞，革命尚未成功，同志仍需努力！");
	require([ "esri/config" ], function(esriConfig) {
		esriConfig.request.corsEnabledServers.push("113.54.15.13");
	});
	require([ "esri/Map",
	    "esri/layers/MapImageLayer",
	    "esri/Basemap",
	    "esri/layers/FeatureLayer",
	    "esri/widgets/Legend",
	    "esri/renderers/smartMapping/creators/color",
	    "esri/widgets/ColorSlider",
	    "esri/Color",
	    "esri/renderers/smartMapping/symbology/color",
	    "esri/core/lang",
	    "dojo/on",
	    "esri/views/MapView",
	    "esri/Graphic",
	    "esri/symbols/TextSymbol",
	    "esri/geometry/Point",
	    "esri/symbols/WebStyleSymbol",
	    "esri/layers/support/LabelClass",
	    "esri/layers/ImageryLayer",
	    "esri/tasks/support/Query",
	    "esri/widgets/Search",
	    "dojo/domReady!" ],
			function(Map,
	                MapImageLayer,
	                Basemap,
	                FeatureLayer,
	                Legend,
	                colorRendererCreator,
	                ColorSlider,
	                Color,
	                colorSchemes,
	                lang,
	                on,
	                MapView,
	                Graphic,
	                TextSymbol,
	                Point,
	                WebStyleSymbol,
	                LabelClass,
	                ImageryLayer,
	                Query,
	                Search) {
				soilURL=new MapImageLayer({
			        url:"http://10.255.251.39:6080/arcgis/rest/services/test/sc_dynamic/MapServer",
			        sublayers:[
			            {
			                id: 7
			            },
			            {
			                id: 6
			
			            },
			            {
			                id: 5
			            },
			            {
			                id: 4
			            },
			            {
			                id: 3
			            },
			            {
			                id: 2
			            },
			            {
			                id: 1
			            },
			            {
			                id: 0
			            }
			        ]
			    })
			    map=new Map({
			        layers:[soilURL]
			
			    })
				var view = new MapView({
	                map: map,
	                container: "viewDiv",
	                center: [104.06, 30.67],
	                zoom:7
	            });
				
				//根据district信息更新图层
				var code = district.districtCode;
				var namesec = district.namesec;
				var role = district.role;
				console.log("gisinit第218行，解密district：" + "code" + code + "namesec" + namesec + "role" + role + "   ...= =!");
				var def_exten;
				var mylayer;
				//根据district的坏毛病确定def_exten的值
				if(namesec != undefined && namesec != null){
					def_exten = "NamSec='" + namesec + "'";
					mylayer = 3;
				}
				else{
					if(role == 'province'){
						def_exten = "ProCode='"+code+"'";
						mylayer = 7;
					}else if(role == 'city'){
						def_exten = "CityCode='"+code+"'";
						mylayer = 6;
					}else if(role == 'county'){
						def_exten = "CouCode='"+code+"'";
						mylayer = 5;
					}else if(role == 'town'){
						def_exten = "TownCode='"+code+"'";
						mylayer = 2;
					}else if(role == 'village'){
						def_exten = "VilCode='"+code+"'";
						mylayer = 1;
					}
				}
				
				console.log("gisinit第236行，拼接的def_exten为" + def_exten);
				
				soilURL.sublayers.items[6].definitionExpression=def_exten;
	            soilURL.sublayers.items[5].definitionExpression=def_exten;
	            soilURL.sublayers.items[4].definitionExpression=def_exten;
	            soilURL.sublayers.items[3].definitionExpression=def_exten;
	            soilURL.sublayers.items[2].definitionExpression=def_exten;
	            soilURL.sublayers.items[1].definitionExpression=def_exten;
	            soilURL.sublayers.items[0].definitionExpression=def_exten;

	                    var layerDispaly = new FeatureLayer({
	                        //通过省、市、县 更改下面地址
	                       url: "http://10.255.251.39:6080/arcgis/rest/services/test/sc_dynamic/MapServer/" + mylayer
	                    });

	                    var query = new Query();
	                    query.where =def_exten;
	                    layerDispaly.queryExtent(query).then(function(results){
	                        view.goTo(results.extent);  // go to the extent of the results satisfying the query
	                    });


	            //图例开始
	            var legend = new Legend({
	                view: view,
	                layerInfos: [{
	                    layer: soilURL,
	                    title: " "
	                }]
	            });
	            view.ui.add(legend, "bottom-right");
	            //图裂结束
			}/*function结束*/
			 );
}

// 该函数完成某个功能：点击树，树调用该函数，并传入selectedNode的信息
function btnsc(selectedNode) {
	var districtCode;
	var districtRole;
	var namesec;//如果是片区的话，这个变量用于传送片区的名称，因为片区没有code.
	var rk_rank = selectedNode.role;
	if (rk_rank == 'city') {
		districtCode = selectedNode.code;
		districtRole = selectedNode.role;
		console.log("[日志]点击树，现在获取当前节点的CityCode:" + districtCode);
	} else if (rk_rank == 'county') {
		districtCode = selectedNode.code;
		districtRole = selectedNode.role;
		console.log("[日志]点击树，现在获取当前节点的CouCode:" + districtCode);
	} else if (rk_rank == 'namesec') {
		districtCode = selectedNode.code;//实际上这里是空值，因为namesec没有code
		districtRole = selectedNode.role;
		namesec = selectedNode.name;
		console.log("gisinit第148行，如果树节点被点击，而该节点是namesc，没有code，只能获取它的名字了，code：" + districtCode + "name：" + namesec);
	} else if (rk_rank == 'town') {
		districtCode = selectedNode.code;
		districtRole = selectedNode.role;
		console.log("[日志]点击树，现在获取当前节点的TownCode:" + districtCode);
	} else if (rk_rank == 'village') {
		districtCode = selectedNode.code;
		districtRole = selectedNode.role;
		console.log("[日志]点击树，现在获取当前节点的VilCode:" + districtCode);
	} else if (rk_rank == 'province') {
		districtCode = selectedNode.code;
		districtRole = selectedNode.role;
		console.log("[日志]点击树，现在获取当前节点的ProCode:" + districtCode);
	}
	var district = {'districtCode':districtCode,'namesec':namesec,'role':districtRole};
	console.log("gisinit第160行，获取的district为：" + JSON.stringify(district));
	changeLayerbyDistrict(district);
}
