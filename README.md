# gaobiaosys2
gaobiao

# 2018-06-13
- �޸�����-gitignore ƽ̨����ͳһ

revise at 18.10.13

# 2018-12-1
## fixed
- turned to use gis server of 10.255.x
- back to old edition，you can click on search widget of left menu,or you can click on map,you can use search widget on the left-top.

## problems
- when you click on some places of the map，the popup menu shows correctly,but maybe there is no any data filled. cause there is no data in the database.
- when you clicked search,the gis-server returns the data only a 'name',I need 'ProName' 'CityName' and ....so on.So I can just use split() function to split it.
- there are only severe map layers provided by gis-server.The county of DaYi tests OK.

## record
  search invoked position：gisinit.js-->searchPopup()
  