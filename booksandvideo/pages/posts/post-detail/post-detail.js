let postsData = require('../../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    let postId = options.id;
    this.data.currentPostId = postId;
    let postData = postsData.postlist[postId];
    //如果在onLoad方法中，不是异步的去执行一个数据绑定
    //则不需要使用this.setData方法
    //只需要对this.data赋值即可实现数据绑定
    // this.data.postData = postData;
    this.setData({
      postData: postData
    })

    // wx.setStorageSync("key", "风暴英雄")
    //   wx.setStorageSync('key', { //缓存设置
    //     game: "风暴英雄",
    //     developer: "暴雪"
    //   })
    //   wx.setStorageSync('key2', {
    //     game: "风暴英雄2",
    //     developer: "暴雪2"
    //   })

    let postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      let postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    } else {
      let postsCollected = {}
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);

    }

    let that = this;
    wx.onBackgroundAudioPlay(function(){
        that.setData({
          isPlayingMusic : true
        })
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
    });

  },

  setAudioMonitor:function(){

  },

  //点击时候的代码
  onColletionTap: function(event) {
    //拿到这个缓存的值
    let postsCollected = wx.getStorageSync('posts_collected');
    //拿到这个值
    let postCollected = postsCollected[this.data.currentPostId];
    //取反操作 收藏的变成未收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    // wx.showToast({
    //   title: postCollected ? '收藏成功' : '取消成功',
    //   duration: 800,
    //   icon: 'success'
    // })

    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功"
    })
  },

  onShareTap: function(event) {
    wx.showActionSheet({
      itemList:[
        "分享给微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ],
      itemColor:"#405f80",
    })
  },

  onMusicTap:function(event){
    let currentPostId = this.data.currentPostId;
    let postData = postsData.postlist[currentPostId];
    let isPlayingMusic  = this.data.isPlayingMusic;
    if (isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic : false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic : true
      })
    }
  },


  // onCollectionTap: function(event) { //缓存获取
  //   let game = wx.getStorageSync('key')
  //   console.log(game)
  // },

  // onShareTap:function(){
  //   // wx.removeStorageSync('key')
  //   //缓存的上限最大不能超过10MB
  //   wx.clearStorageSync();//清除所有的缓存
  // },

  // let postsCollected = {
  //     1:"true",
  //     2:"false",
  //     3:"true"
  //     ... 
  // }


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})