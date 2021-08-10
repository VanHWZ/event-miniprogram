// pages/addEvent/addEvent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    event: {
      content: "",
      time: "2000-01-01",
      type: 0
    },
    eventTypes: ["纪念日", "周年事件", "未来事件"],
    index: 0
  },

  goBack: function() {
    wx.navigateBack({
      delta: 1,
    });
  },

  bindContentChange: function(e) {
    this.setData({
      'event.content': e.detail.value
    });
  },

  bindTimeChange: function(e) {
    this.setData({
      'event.time': e.detail.value
    });
  },

  bindPickerChange: function (e) {
    this.setData({
      "event.type": e.detail.value,
      index: e.detail.value
    });
  },

  addEvent: function() {
    // console.log(this.data.event);
    var createEvent = require("../../utils/dataQuery.js").createEvent;
    createEvent({
      content: this.data.event.content,
      time: new Date(this.data.event.time),
      type: this.data.event.type
    }).then(res => {
      console.log(res);
      wx.navigateBack({
        delta: 1,
      });
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})