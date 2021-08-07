// pages/eventDetail/eventDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    utils: {},
    event: {},
    eid: "",
    src: "cloud://mini-prd-1g478uj7eef9a54f.6d69-mini-prd-1g478uj7eef9a54f-1306410776/floor.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var query = require("../../utils/dataQuery.js");
    var utils = require("../../utils/util.js");
    this.setData({eid: options.eid});
    query.retrieveEventsById(options.eid).then(res => {
        res.data.forEach(element => {
          var getDaysResult = utils.getDays(element.time, element.type);
          var date_type_prefix;
          if (element.type == 0)
            date_type_prefix = "起始日";
          else
            date_type_prefix = "目标日";
          this.setData({event: {
            content: element.content,
            type: element.type,
            time: utils.formatDate(getDaysResult.time),
            pic_url: element.pic_url,
            days: getDaysResult.days,
            prefix: getDaysResult.prefix,
            date_type_prefix: date_type_prefix
          }});
        })
      })
  
  },
  goBack: function() {
    wx.navigateBack({
      delta: 1,
    })
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