// d:\dev\code\douyin-WorkOut-front\pages\custom-joinLog\custom-joinLog.js
import {
  getCustomJoinLog
} from "../../api/common";

Page({
  data: {
    distanceSortList:[],
  },
  properties: {

  },
  async onLoad () {
    const res = await getCustomJoinLog();
    if (!res) {
      return;
    }
    console.log(res)
    const distanceSortList=res?.companies;
    this.setData({
      distanceSortList
    })
  },
  methods: {

  }
})