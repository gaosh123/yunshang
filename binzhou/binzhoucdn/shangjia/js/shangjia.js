const app = new Vue({
    el:"#app",
    data() {
       
        return {
            showList: true,
            map: {},
            list: [
              {
                store_name: "银座超市1",
                store_address: "黄河四路渤海七路交叉口"
              },
              {
                store_name: "银座超市2",
                store_address: "黄河四路渤海七路交叉口"
              },
              {
                store_name: "银座超市3",
                store_address: "黄河四路渤海七路交叉口"
              },
              {
                store_name: "银座超市4",
                store_address: "黄河四路渤海七路交叉口"
              },
              {
                store_name: "银座超市5",
                store_address: "黄河四路渤海七路交叉口"
              },
              {
                store_name: "银座超市6",
                store_address: "黄河四路渤海七路交叉口"
              },
              {
                store_name: "银座超市7",
                store_address: "黄河四路渤海七路交叉口"
              }, 
              {
                store_name: "银座超市7",
                store_address: "黄河四路渤海七路交叉口"
              }, 
              {
                store_name: "银座超市7",
                store_address: "黄河四路渤海七路交叉口"
              }, 
              {
                store_name: "银座超市7",
                store_address: "黄河四路渤海七路交叉口"
              },  
            ],
            position:[117.999044,37.385149],
            userPosition: [],
            lastMark: [],
            centerMark: {},
            ticketArea: "", //区域
            isAll: 9999999, //是否展示全部
            showMore: true,
            areaValue: "",
            areaList: [
              { text: "地区", value: "" },
              { text: "滨城区", value: "binchengqu" },
              { text: "沾化区", value: "zhanhuaqu" },
              { text: "惠民县", value: "huiminxian" },
              { text: "阳信县", value: "yangxinxian" },
              { text: "无棣县", value: "wudixian" },
              { text: "博兴县", value: "boxingxian" },
              { text: "邹平市", value: "zoupingshi" }
            ],
            sortValue: "",
            sortList: [
              {
                text: "品类",
                value: ""
              },
              {
                text: "餐饮",
                value: "0"
              },
              {
                text: "教育",
                value: "1"
              }
            ],
            selArea: false,
            showNo: false
        }
    },
   filters: {
    area(i) {
      var areaList = [
        { name: "全部", code: "" },
        { name: "滨城区", code: "binchengqu" },
        { name: "沾化区", code: "zhanhuaqu" },
        { name: "惠民县", code: "huiminxian" },
        { name: "阳信县", code: "yangxinxian" },
        { name: "无棣县", code: "wudixian" },
        { name: "博兴县", code: "boxingxian" },
        { name: "邹平市", code: "zoupingshi" }
      ];
      for (let val of areaList) {
        if (val.code == i) {
          return val.name;
        }
      }
    }
  },
  methods: {
      
    cutShow() {},
    goMap(gps, adr) {
      let lon = gps.split(",")[1];
      let lat = gps.split(",")[0];
      //方法一
      window.location.href =
        "https://uri.amap.com/marker?position=" +
        lon +
        "," +
        lat +
        "&name=" +
        adr;
    },
    // reset() {
    //   this.isAll = 4;
    // //   this.getList();
    // },
    getList() {
       
    //   axios
    //     .post(
    //       "/myliaothird-server/coupons/storeList",
    //       qs.stringify({
    //         areaId: this.ticketArea,
    //         storeName: "",
    //         lat: this.userPosition[1],
    //         lnt: this.userPosition[0],
    //         needSort: 1
    //       })
    //     )
    //     .then(res => {
    //       this.list = res.data.data;
    //       this.showMore = false;
    //       this.list.length == 0 ? (this.showNo = true) : (this.showNo = false);
    //       this.list.length == 0
    //         ? (this.showMore = true)
    //         : (this.showMore = false);
    //       this.painStation();
    //     });
    },
    /*绘制地图上的四个点*/
    painStation() {
      let vue = this;
      /*开始绘制所有最近点*/
      for (let i = 0; i < this.list.length; i++) {
        let startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(26, 34),
          // 图标的取图地址
          image: icon,
          // 图标所用图片大小
          imageSize: new AMap.Size(26, 34)
          // 图标取图偏移量
        });
        let marker = new AMap.Marker({
          map: vue.map,
          position: [
            vue.list[i].gps.split(",")[1],
            vue.list[i].gps.split(",")[0]
          ],
          icon: startIcon
        });
        vue.lastMark.push(marker);
        AMap.event.addListener(marker, "click", function() {
          let lon = vue.list[i].gps.split(",")[1];
          let lat = vue.list[i].gps.split(",")[0];
          //方法一
          window.location.href =
            "https://uri.amap.com/marker?position=" +
            lon +
            "," +
            lat +
            "&name=" +
            vue.list[i].store_address;
        });
      }
    },
    //绘制中心点
    drawCenter() {
      let vue = this;
      let startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(50, 50),
        // 图标的取图地址
        //   image: import("../../assets/myTicket/icon5.png"),
        // 图标所用图片大小
        imageSize: new AMap.Size(50, 50)
        // 图标取图偏移量
      });
      this.centerMark = new AMap.Marker({
        map: vue.map,
        position: vue.userPosition,
        icon: startIcon
      });
    }
  },

  mounted() {
    // this.ticketArea = this.$route.params.ticketArea;
    if (this.ticketArea == "null") {
      this.ticketArea = "";
    }
    let url =
      "https://webapi.amap.com/maps?v=1.4.7&key=ec3bd89bc62edfe8928454dcbab04de4&plugin=AMap.Transfer,AMap.Autocomplete,AMap.PlaceSearch,AMap.Driving,AMap.Geolocation&callback=onLoad";
    let jsapi = document.createElement("script");
    // jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    window.onLoad = () => {
      let vue = this;
      if (this.position) {
        vue.userPosition = Object.values(this.position);

        this.map = new AMap.Map("container", {
          resizeEnable: true, //是否监控地图容器尺寸变化
          zoom: 14, //初始化地图层级
          // center: [120.466456, 32.530996],
          center: vue.userPosition
        });
        console.log(111);
        this.map.setCenter(vue.userPosition);
        this.drawCenter();
        // this.getList();
      } else {
        this.map = new AMap.Map("container", {
          resizeEnable: true, //是否监控地图容器尺寸变化
          zoom: 16, //初始化地图层级
          center: [118.016974, 37.383542]
        });

        let time = setInterval(() => {
          if (this.position) {
            clearInterval(time);
            this.map.setCenter(vue.userPosition);
            this.drawCenter();
            // this.getList();
          }
        }, 200);

        setTimeout(function() {
          clearInterval(time);
        }, 5000);
      }
    };
  }
  })
  