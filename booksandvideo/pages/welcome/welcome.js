Page({
  onTap:function(event){
    // wx.navigateTo({
    //   url:"../posts/posts"
    // });

    wx.redirectTo({
      url:"/pages/posts/posts",
    })
  },

  onUnload:function(){
    // console.log("welecome")
  },
  onHide:function(){
    // console.log("welecome123")
  }
})