// pages/filter/filter.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first: '区域',
    second: '价格',
    thirds: '时长',
    fours: '筛选',
    arrange: 0,
    time: 0,
    array: [{ name: '男' }, { name: '女' }],
    area: [{ name: '港台' }, { name: '大陆' }, { name: '美国' }, { name: '欧洲' }],
    genderIndex: 0,
    areaIndex: 0,
    isShow: true,
    currentTab: 0,
    displays:'none',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true
  },
  hideNav: function () {
    this.setData({
      displays: "none"
    })
  },
  onLoad() {

    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  // 区域
  tabNav: function (e) {
    console.log(e.target.dataset)
    this.setData({
      displays: "block",
      currentTab: e.target.dataset.current,
    })
    if (e.target.dataset.current === 0){
      let list = [{}];
      for (let i = 0; i < 26; i++) {
        list[i] = {};
        list[i].name = String.fromCharCode(65 + i);
        list[i].id = i;
      }
      this.setData({
        list: list,
        listCur: list[0]
      })

    }
  },
  tabSelect(e) {
    console.log(e)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  clickNum: function (e) {
    console.log(e.target.dataset.num)
    this.setData({
      arrange: e.target.dataset.num
    })
    this.setData({
      second: e.target.dataset.name
    })
    this.setData({
      displays: "none"
    })
    var text = this.data.name
    console.log(text)
  },
  clickTime: function (e) {
    console.log(e.target.dataset.num)
    this.setData({
      second: e.target.dataset.num
    })
    this.setData({
      thirds: e.target.dataset.name
    })
    this.setData({
      displays: "none"
    })
  },
  choseGender: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    console.log(e.currentTarget.dataset.id)
    this.setData({
      genderIndex: id
    })
  },
  choseArea: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      areaIndex: id
    })
  },
  reset: function (e) {
    this.setData({
      genderIndex: 0,
      areaIndex: 0,
    })
  },
  handleSubmit:function(e){
    this.setData({
      displays: "none"
    })
  }
  


})