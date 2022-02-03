// pages/eventDetail/eventDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    event: {
      content: "header",
      date_type_prefix: "起始日",
      days: 100,
      type: 0,
      header_prompt: "已经"
    },
    eid: "",
    src: "cloud://mini-prd-1g478uj7eef9a54f.6d69-mini-prd-1g478uj7eef9a54f-1306410776/floor.jpg",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var query = require("../../utils/dataQuery.js");
    this.setData({eid: options.eid});
    query.retrieveEventsById(options.eid).then(res => {
        res.data.forEach(element => {
          this.setPage(element);
        })
      })
  },
  setPage: function(event) {
    var utils = require("../../utils/util.js");
    var getDaysResult = utils.getDays(event.time, event.type);
    var date_type_prefix, pad_color;
    date_type_prefix = getDaysResult.date_type_prefix;
    header_prompt = getDaysResult.prefix;
    if (event.type == 0)
      pad_color = "pad-past";
    else
      pad_color = "pad-future";
    this.setData({event: {
      content: event.content,
      type: event.type,
      time: utils.formatDate(getDaysResult.time),
      pic_url: event.pic_url,
      days: getDaysResult.days,
      date_type_prefix: date_type_prefix,
      header_prompt: header_prompt,
      type: event.type,
      pad_color: pad_color
    }});
    console.log(this.data);
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
  saveEvent: function() {
    console.log(this.data.event);
    var updateEvent = require("../../utils/dataQuery.js").updateEvent;
    updateEvent(
      this.data.eid,
      {content: this.data.event.content, time: new Date(this.data.event.time)}
    ).then(res => {
      console.log(res);
      if (res.result.stats.updated == 1) {
        console.log("update successfully");
        this.setPage({
          pic_url: this.data.event.pic_url,
          content: this.data.event.content,
          time: new Date(this.data.event.time),
          type: this.data.event.type
        })
      }
    }).catch(console.error)
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