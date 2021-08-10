// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    var getDaysBetween = require("../../utils/util.js").getDaysBetween;
    getDaysBetween(new Date(2021, 5, 17), new Date());
    // var getEvent = require("../../utils/dataQuery.js").retrieveEventsById;
    // getEvent("28ee4e3e60e3ce092817269805427e3f").then(res => {
    //   console.log(res.data);
    // })
    var createEvent = require("../../utils/dataQuery.js").createEvent;
    var updateEvent = require("../../utils/dataQuery.js").updateEvent;
    // createEvent({
    //   content: "进入考研考场",
    //   pic_url: "",
    //   sticky_on_top: false,
    //   time: new Date("2021-12-26"),
    //   type: 2
    // }).then(res => {
    //   console.log("create");
    //   console.log(res);
    // });
    // updateEvent(
    //   "14139e12610f3b6b038cf63c4c627471", 
    //   {content: "2021考研!!fight!!", time: new Date("2021-12-26")}
    // ).then(res => {
    //   console.log("update");
    //   console.log(res);
    // });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({ 
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickMe: function() {
    this.setData({motto: "after click"})
  },
  enterMainPage: function() {
    wx.navigateTo({
      url: '../main/main'
    });
  }
})
