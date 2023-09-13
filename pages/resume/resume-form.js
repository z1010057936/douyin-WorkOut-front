import { getCustomResume } from "../../api/common";

Page({
  data: {
    bodyStatusIndex: 0,
    isShowTips: true,
    bodyStatusArray: ["健康","良好","一般","较差","残疾"],
    sexArray: [{"key":"1","value":"男"},{"key":"2","value":"女"}],
    tempResData: {},
    formData: {}
  },

  async onLoad(e) {
    const res = await getCustomResume();
    console.log(res)
    this.setData({
      tempResData: res,
      bodyStatusIndex: res.bodyStatus
    })
  },

  //健康状况选项框变更触发
  bodyStatusChange(e) {
    this.setData({
      bodyStatusIndex: e.detail.value
    });
  },

  // 表单提交
  formSubmit(e) {
    if(this.formRule(e.detail.value) === false) {
      return
    }
    
    const isLogin = tt.getStorageSync("isLogin");
    var message = "您确定提交吗？";
    if (!isLogin && !this.data.tempResData.phone) {
      message = "您确定提交，并同意授权您的手机号用于登录吗？";
    }

    tt.showModal({
      content: message,
      confirmText: "确定",
      cancelText: "关闭",
      success(res) {
        if (res.confirm) {
          tt.showLoading({
            mask: true,
            title: "请稍后...",
            success: (res) => {
              //在这里调用后台的提交接口

              tt.showToast({
                title: '提交成功',
                icon: 'success'
              });
              tt.setStorageSync("isLogin", true);
              tt.navigateBack({
                delta: 1
              })
            },
            fail: (res) => {
              tt.showToast({
                title: '提交失败，请联系管理员',
                icon: 'fail'
              });
            },
          });
        }
      },
    });

  },

  //表单校验
  formRule(e) {
    var result = true;
    const keys = Object.keys(e);
    keys.forEach(function (item,key) {
      if(e[item] === "" || e[item] === null || e[item].length === 0) {
        tt.showToast({
          title: item+'不可为空',
          icon: 'fail'
        });
        result = false;
      }
    })
    return result;
  }

  // 重置
  // formReset(e) {
  //   this.setData({
  //     tempResData: this.data.tempResData,
  //     bodyStatusIndex: this.data.tempResData.bodyStatus
  //   });
  // }


});