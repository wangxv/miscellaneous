//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
into:function(){
  wx.navigateTo({
    url:"../music/music"
  })
},
showimg:function(){
  wx.navigateTo({
    url:"../showimg/showimg"
  })
}
})
