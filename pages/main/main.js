// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    events: {},
    query: {},
    utils: {},
    triggered: false,
    top: {
      content: "顶置事件",
      prefix: "起始日",
      time: "2000-01-01",
      days: 100
    }
  },
  OnRefresh: function() {
    if (this._freshing) return;
    this._freshing = true;
    this.setEventList();
    setTimeout(() => {
      this.setData({
        triggered: false,
      });
      this._freshing = false;
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  enterEventDetail: function(element) {
    var eid = element.currentTarget.dataset.eid;
    // console.log(eid);
    wx.navigateTo({
      url: '../eventDetail/eventDetail?eid=' + eid,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  setEventList: function() {
    var futureEvents = [];
    var pastEvents = [];
    var allEvents = [];
    var query = require("../../utils/dataQuery.js");
    var utils = require("../../utils/util.js");
    query.retrieveEvents().then(res => {
      res.data.forEach(element => {
        var getDaysResult = utils.getDays(element.time, element.type);
        if (element.sticky_on_top)
          this.setData({
            top: {
              content: element.content,
              date_type_prefix: getDaysResult.date_type_prefix,
              time: utils.formatDate(getDaysResult.time),
              days: getDaysResult.days
            }
          });
        if (element.type == 0)
          pastEvents.push({
            time: utils.formatDate(getDaysResult.time),
            content: element.content,
            days: getDaysResult.days,
            eid: element._id,
            prefix: getDaysResult.prefix,
            pad_num_of_days_color: "pad-num-of-days-past",
            pad_unit_color: "pad-unit-past"
          });
        else
          futureEvents.push({
          time: utils.formatDate(getDaysResult.time),
          content: element.content,
          days: getDaysResult.days,
          eid: element._id,
          prefix: getDaysResult.prefix,
          pad_num_of_days_color: "pad-num-of-days-future",
          pad_unit_color: "pad-unit-future"
        });
      });
      pastEvents.sort(this.eventCompare("days"));
      futureEvents.sort(this.eventCompare("days"));
      allEvents = pastEvents.concat(futureEvents);
      this.setData({events: allEvents});
      // console.log(pastEvents);
      // console.log(futureEvents)
    });
  },
  eventCompare: function(key) {
    return function(m, n) {
      var a = m[key];
      var b = n[key];
      return a - b;
    }
  },
  addEvent: function() {
    wx.navigateTo({
      url: '../addEvent/addEvent'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setEventList();
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