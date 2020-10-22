const app = new Vue({
    el:"#app",
    data() {
        return {
            activeNames :['0']
        }
    },
    methods: {
          toRuler() {
            // this.$router.push("/coupons/allshop");
            window.location.href="./ruler.html"
          },
          toRealname () {
            window.location.href="./realname.html"
            // this.$router.push("/coupons/wenti");
          },
          toUse () {
            window.location.href="./use.html"
            // this.$router.push("/coupons/video");
          },
          toShangJia () {
            window.location.href="./shangjia.html"
            // this.$router.push("/coupons/shop");
          },
    },
  })
  