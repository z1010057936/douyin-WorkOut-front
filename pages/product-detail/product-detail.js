import {
  getShopList
} from "../../api/common";
const app = getApp();
Page({
  
  onReady(e) {
    
  },


  data: {
    companiesInfo: null,
    posts: null,
    starChecked: false,
    bindSucess:false,
    isLogin:false,
    current:0,
    ishidden: true,
    fromPage: "index"
  },
  
  async onLoad(options) {
    const { systemInfo } = app.globalData;
    this.setData({
      iPhoneBottomHeight:systemInfo.screenHeight - systemInfo.safeArea.bottom,
    })
    console.log("options",options)
    const { productId } = options;
    const { fromPage } = options;
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
    this.setData({
      shopList: res.companies?.slice(0,3),
      swiperImg,
      companiesInfo,
      posts,
      fromPage
    })
    
  },
  getProductById(comList, id) {
    const companies = comList;
    // 在 products 数组中查找指定 ID 的商品
    const companiesInfo = companies.find(p => p.id === id);
    // 如果找到了商品，返回商品信息；否则返回空对象
    return companiesInfo || {};
  },
  // bind:getgoodsinfo 使用示例
  // 非商品库商品
  getGoodsInfo(event) {
    // const {
    //   goodsId
    // } = event.detail;
    return new Promise(resolve => {
      // 在此处开发者可以进行商品数据请求，获取商品信息
      // 然后将商品信息传入 resolve 函数
      resolve({
        currentPrice: 9900,
        goodsName: '循礼门M+丨【释集烤肉】99元  原价206.4元超值套餐',
        goodsPhoto: 'https://p11.douyinpic.com/img/aweme-poi/product/spu/c050f399ac447daf2715e11e6976c2e2~noop.jpeg?from=3303174740',
        goodsLabels: [{
          type: 'EXPIRED_RETURNS'
        }, // 过期退
        {
          type: 'REFUND_ANYTIME'
        }, // 随时退
        {
          type: 'BOOK_IN_ADVANCE',
          value: 2
        } // 提前2日预约
        ],
        minLimits: 1,
        maxLimits: 2,
        dateRule: '周一至周日可用',
        validation: {
          phoneNumber: {
            required: true // 手机号是否必填, 为 ture则必填，false选填，默认选填
          }
        },
        extra: {}
      });
    });

  },
  // 错误信息含义见下文 bind:error报错信息
  handleError(event) {
    const {
      errMsg,
      errNo
    } = event.detail;
    console.log(errNo, errMsg);
  },
  /**
   * status: 支付状态，'success' | 'fail'
   * orderId: 抖音交易系统内部订单号，类型为 string
   * outOrderNo：开发者系统交易订单号，类型为 string
   * result: 创建订单、tt.pay 支付结果，类型为 object
   */
  // handlePay(event) {
  //   const {
  //     status,
  //     orderId,
  //     outOrderNo,
  //     result
  //   } = event.detail;
  //   if (status === 'success') {
  //     const {
  //       code
  //     } = result;
  //     if (code === 0) {
  //       // 支付成功
  //     } else {
  //       // 支付失败（超时、取消、关闭）
  //       if (orderId && outOrderNo) {
  //         tt.navigateTo({
  //           url:`ext://microapp-trade-plugin/trade-order-detail?orderId=${orderId}`,
  //           success: (res) => {
              
  //           },
  //           fail: (res) => {
  //             console.log(res);
  //           },
  //         });
  //       }
  //     }
  //   } else {
  //     const {
  //       errMsg
  //     } = result;
  //   }
  // },
   userLogin(event) {
    let that = this;
    const { goodsId, goodsType } = event.detail
    return new Promise((resolve, reject) => {
      tt.login({
        success() {
            resolve();
          // 用户登录成功并获取信息，则调用 resolve 函数，跳转至提单页

        },
        fail() {
          // 用户登录失败，则跳转提单页失败
          reject();
        }
      });
    });
  },
  closeDialog(e){
    console.log(e);
    this.setData({
      showDialog:false
    })
  },

  //立即报名，跳转到简历填写页
  joinPost() {
    //判断是否登录
    const isLogin = tt.getStorageSync("isLogin");
    console.log("isLogin:",isLogin)
    if (isLogin == true) {
      tt.showModal({
        content: "确定要报名该岗位吗？",
        confirmText: "确定",
        cancelText: "关闭",
        success(res) {
          if (res.confirm) {
            //这里调用后台报名接口
            tt.showToast({
              title: '报名成功'
            });
          }

        }
      });
    } else{
      tt.navigateTo({
        url: `/pages/resume/resume-form`,
        success: (res) => {
          
        },
        fail: (res) => {
          console.log(res);
        },
      });
    }
  },

  checkLogin(){
    let  that =this;
    const { isLogin } = that.data;
    if (!isLogin) {
      tt.login({
        success(res) {
          console.log('??',res);
          // 用户登录成功并获取信息，则调用 resolve 函数，跳转至提单页
          that.setData({
            showDialog:true
          })
        },
        fail() {
          // 用户登录失败，则跳转提单页失败
          console.log("用户登录失败或未授权：",e);
        }
      });
    }
  },

  // // 商品库商品
  // getGoodsInfo(event) {
  //   return new Promise(resolve => {
  //     // 在此处开发者可以进行商品数据请求，获取商品信息
  //     // 然后将商品信息传入 resolve 函数
  //     resolve({
  //       minLimits: 1,
  //       maxLimits: 2,
  //       dateRule: '周一至周日可用',
  //       validation: {
  //         phoneNumber: {
  //           required: true // 手机号是否必填
  //         }
  //       }
  //     });
  //   })
  // }
  onTabCollect() {
    const { starChecked } = this.data;
    this.setData({
      starChecked: !starChecked,
    })
  },
   bindPhone(){
       return false;
  },
  onTapGetPhone(e){
     console.log('aaa',e);
    //  this.setData({
    //    showDialog:false
    //  })
    this.setData({
      bindSucess:true,
      isLogin:true,
    })
  },
  switchTap(e){
    const {current} = e.detail;
    this.setData({
      current,
    })
  },
  success(e){
    console.log(e.detail);
    // 开发者可在此处进行手机号解密以及绑定工作
    this.setData({
      showDialog:false,
    })
  },

  //跳转到导航页，传入企业经纬度
  gotoAddress() {
    let  that =this;
    this.data.ishidden = false;
    const { companiesInfo } = that.data;
    let coordinate = companiesInfo.coordinate;
      tt.navigateTo({
        url: `/pages/mapArea/open-map-app?destination=${coordinate.destination}&longitude=${coordinate.longitude}&latitude=${coordinate.latitude}`,
        success: (res) => {
          
        },
        fail: (res) => {
          console.log(res);
        },
      });
  },

})