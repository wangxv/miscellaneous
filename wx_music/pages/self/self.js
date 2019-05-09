const app = getApp()
Page({
	
	data: {
		
      location:{
        
	  }
		
	},
	getLocation:function(){
		var that = this;
		wx.getLocation({
			type:"wgs84",
			success:function(res){
				console.log(res);
				var _location={
					lat:res.latitude,
					lon:res.longitude
				}
               that.setData({
                 location:_location
			   })
			},
            fail:function(res){
              alter("获取位置失败");
			}
		})
	}
})