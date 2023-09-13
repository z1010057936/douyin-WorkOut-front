// d:\dev\code\douyin-WorkOut-front\pages\custom-home\custom-home.js
Component({
  data: {
    userId: "",
  },
  properties: {
    customInfo:{
      type:JSON,
    }
  },
  async onLoad(e) {
    
  },
  methods: {
    gotoResume(e) {
      tt.navigateTo({
        url: `/pages/resume/resume-form`,
        success: (res) => {
          
        },
        fail: (res) => {
          console.log(res);
        },
      });
    },
    gotoPostDetail(e) {
      tt.navigateTo({
        url: `/pages/custom-joinLog/custom-joinLog`,
        success: (res) => {
          
        },
        fail: (res) => {
          console.log(res);
        },
      });
    }

  }
})