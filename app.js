App({
  globalData:{
    category:0
  },
  onLaunch: function () {
    const systemInfo = tt.getSystemInfoSync();
    this.setGlobalData('systemInfo',systemInfo)
    const isLogin = tt.getStorageSync("isLogin");
    if(isLogin == "") {
      tt.setStorageSync("isLogin", false);
    }
  },
  getPhoneNumber({ params, success, fail }) {
    const { iv, encryptedData } = params;
    // ...
    // 开发者服务端解密 encryptedData，得到手机号
    // ...
    const result = {
        phoneNumber: '18133842224',
    }
    // 回调前端模板
    success(result)
},
setGlobalData(key, value) {
  this.globalData[key] = value;
},
})

/*const cloud=tt.createCloud({
  envID:'env-3BwSrdSsr7',
  serviceID:'1ja5vbm800cn4'
});

cloud.callContainer({
  path:'/example',
  init:{
      method:'POST',
      header:{
          'content-type': 'application/json',
      },
      body:{
          example:'example',
      },
      timeout: 60000,//ms
  },
  success:({statusCode, header, data})=>{
      JSON.parse(data)
  },
  fail: console.warn,
  complete: console.warn,
})
*/
