const app = getApp()
Page({
	
	data: {
		
      imglist:[
        "../imgs/imglist/view1.jpg",
        "../imgs/imglist/view2.jpg",
        "../imgs/imglist/view3.jpg",
        "../imgs/imglist/view4.jpg",
        "../imgs/imglist/view5.jpg",
        "../imgs/imglist/view6.jpg",
        "../imgs/imglist/view7.jpg",
        "../imgs/imglist/view8.jpg",
        "../imgs/imglist/view9.jpg",
        "../imgs/imglist/view10.jpg"
      ],
      newimg:[

      ],
      showsrc:"",
      show:false
    },
    getimg:function(){
      var that = this;
      wx.chooseImage({
        count:1,
        sizeType:['original','compressed'],
        sourceType:['album','camera'],
        success:function(res){
          var tempFilePaths = res.tempFilePaths[0];
         var imglist=[];
             imglist.push(tempFilePaths);
           imglist =  that.data.newimg.concat(imglist)
       
          that.setData({
            newimg:imglist
          })
          
        }
      })
    },
    animate:function(e){
          var that= this;
          var src=e.currentTarget.dataset.src;
          that.setData({
            showsrc:src,
            show:true
          })
    },
    goback:function(){
      var that = this;
      that.setData({
        show:false
      })
    }
})