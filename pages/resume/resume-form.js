Page({
  
  openMapApp() {
    
  },
  data: {
    bodyStatusIndex: 0,
    bodyStatusArray: ["健康","良好","一般","较差","残疾"],

    formData: {}
  },

  bodyStatusChange(e) {
    console.log(e)
    this.setData({
      bodyStatusIndex: e.detail.value
    });
  },

  // 表单提交
  formSubmit(e) {
    console.log('Form detail: ', e.detail.value);
    tt.showToast({
      title: '提交表格',
      icon: 'success'
    });
  },

  // 重置
  formReset(e) {
    this.setData({
      formData: {}
    });
  }


});