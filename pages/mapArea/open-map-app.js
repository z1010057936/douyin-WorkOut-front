Page({
  data: {
    destination: null,
    longitude: null,
    latitude: null,
    markers: []
    
  },
  
  async onLoad(options) {
    this.setData({
      destination: options.destination,
      longitude: Number(options.longitude),
      latitude: Number(options.latitude),
      'markers[0]': {
        id : 1,
        longitude : Number(options.longitude),
        latitude : Number(options.latitude),
        content : options.destination
      }
    })
  },

  onReady(e) {
    this.mapCtx = tt.createMapContext("myMap");
    //将地图中心移到企业经纬标
    this.mapCtx.moveToLocation({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      success(res) {
        console.log("移动成功, ",res);
      },
      fail(res){
        console.log("移动失败: ",res.errMsg);
      },
      complete(res){
        console.log("接口已调用（调用成功、失败都会执行）: ",res.errMsg);
      }
    });
  },

  //拉起导航APP
  openMapApp(e) {
    this.mapCtx.openMapApp({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      destination: this.data.destination,
      success(res) {
        console.log("拉起导航地图成功", res);
      },
      fail(err) {
        console.log("拉起导航地图失败", err);
      },
      complete(res) {
        console.log('接口已调用（调用成功、失败都会执行）', res);
      },
    });
  },
});