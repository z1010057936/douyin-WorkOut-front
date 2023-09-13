const app = getApp();
Component({
    data: {
      navList: [{
        tittle: '长白工',
        img: '../../assets/fujinmeishi.png'
      }, {
        tittle: '日结工',
        img: '../../assets/xiuxianyule.png'
      }, {
        tittle: '小时工',
        img: '../../assets/youwan.png'
      }, {
        tittle: '热门职位',
        img: '../../assets/lirenmeifa.png'
      }, {
        tittle: '全部职位',
        img: '../../assets/zhusu.png'
      }],
      current:0,
      
    },
    properties: {
      productList: {
        type: Array
      }
    },
    methods: {
      toCategoryPage(e){
        const {category,tittle}=e.currentTarget.dataset;
        console.log(category,e);
        app.setGlobalData('category',{category:category,tittle:tittle,});
        console.log(app);
        tt.switchTab({
          url: `/pages/category/category`,
          success: (res) => {
            
          },
          fail: (res) => {
            
          },
        });
      },
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
      switchTap(e){
        const {current} = e.detail;
        this.setData({
          current,
        })
      }
    }
  })