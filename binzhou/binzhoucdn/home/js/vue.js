const app = new Vue({
  el:"#app",
  data() {
      return {
        show: false,
        home5: {
          url: "./../assets/home5.png",
          num: 0
        },
        home6: {
          url: "./../assets/home6.png",
          num: 23
        },
        home7: {
          url: "./../assets/home7.png",
          num: 56
        },
        img: {
          line: "./../assets/line.png",
          realname1: "./../assets/realname1.png",
          realname2: "./../assets/realname2.png",
          realname3: "./../assets/realname3.png"
        }
      }
  },
  methods: {
        toReal() {
          this.show = true;
        },
        toShop() {
          // this.$router.push("/coupons/allshop");
          window.location.href="./../shangjia/shangjia.html"
        },
        toWenti() {
          // this.$router.push("/coupons/wenti");
          window.location.href="./../question/question.html"
        },
        toVideo() {
          window.location.href="./../video/video.html"
          // this.$router.push("/coupons/video");
        },
        toKefu() {
          // this.$router.push("/coupons/shop");
        },
        cancel(){

        },
        confirm(){

        }
  },
})
