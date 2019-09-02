<template>
  <div id="GDMap"></div>
</template>

<script>
  export default {
    name: "Map",
    data: () => ({
      AMap: null,
    }),
    mounted() {
      this.Refresh();
    },
    methods: {
      Refresh() {
        if (window.AMap) {
          this.AMap = new AMap.Map('GDMap', {
            zoom: 12,
          });
          AMap.plugin('AMap.ToolBar', () => {//异步加载插件
            let toolbar = new AMap.ToolBar();
            this.AMap.addControl(toolbar);
          });
          AMap.plugin([
            'AMap.ToolBar',
            'AMap.Scale',
            'AMap.OverView',
            'AMap.MapType',
            'AMap.Geolocation',
          ], () => {
            // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            this.AMap.addControl(new AMap.ToolBar());

            // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
            this.AMap.addControl(new AMap.Scale());

            // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
            this.AMap.addControl(new AMap.OverView({isOpen: true}));

            // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
            this.AMap.addControl(new AMap.MapType());

            // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
            this.AMap.addControl(new AMap.Geolocation());
          });
        } else {
          setTimeout(() => {
            this.Refresh();
          }, 500)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #GDMap {
    height: calc(100vh - 20px);
    width: 100%;
  }
</style>
