Page({
  data: {
    phoneNumber: null,
    isLogin: true,
  },
  async onLoad() {
  },
  
  goToCustomPage() {
    tt.navigateTo({
      url: '/pages/custom-login/login/login',
    });
  },
});
