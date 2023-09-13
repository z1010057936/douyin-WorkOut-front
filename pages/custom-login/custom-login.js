Page({
  data: {
    phoneNumber: null,
    isLogin: false,
    customInfo: {
      name: "赵铁柱"
    }
  },
  async onLoad() {
    // 检查是否存在登录标志
    const isLogin = tt.getStorageSync("isLogin");
    console.log(isLogin)
    this.setData({
      isLogin: isLogin
    })
  },
  
  //立即报名，跳转到简历填写页
  joinPost() {
      tt.navigateTo({
        url: `/pages/resume/resume-form`,
        success: (res) => {
          
        },
        fail: (res) => {
          console.log(res);
        },
      });
    
  },

});
