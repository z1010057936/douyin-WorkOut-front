// /Users/bytedance/Desktop/codelabs-miniprogram-template/miniprogram-templates/templates/microapp/javascript/group-buy-industry/group-buy-industry/components/index/index.js
Component({
  data: {
    isLogin:false,
  },
  properties: {
    productList:{
      type:Array,
    }
  },

  async onLoad(options) {
    const { systemInfo } = app.globalData;
    this.setData({
      iPhoneBottomHeight:systemInfo.screenHeight - systemInfo.safeArea.bottom,
    })
    const { productId } = options;
    const res = await getShopList();
    if (!res) {
      return;
    }
    const swiperImg = res.companies?.map((item) => {
      return item.image
    })
    //获取公司信息
    const companiesInfo = this.getProductById(res?.companies, productId);
    //获取职位内容
    const posts = res.postsContext?.map((item) => {
      return item
    })
    //处理标签信息
    const label = companiesInfo.label;
    console.log("label:",label)
    this.setData({
      shopList: res.companies?.slice(0,3),
      swiperImg,
      companiesInfo,
      posts
    })
  },

  methods: {

    toProductDetail(e){
      
      const { id } = e.currentTarget.dataset;
      tt.navigateTo({
        url: `/pages/product-detail/product-detail?productId=${id}`,
        success: (res) => {
          
        },
        fail: (res) => {
          console.log(res);
        },
      });
    },
    //调用用户拨打电话功能
  tapMakePhoneCall(e) {
    tt.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.comphonenum,
      success(res) {
        // 调用成功 makePhoneCall:ok
        console.log("调用成功", res.errMsg);
      },
      fail(res) {
        // 调用失败 makePhoneCall:fail
        console.log("调用失败", res.errMsg);
      },
    });
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
  }
})