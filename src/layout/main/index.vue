<template>
  <div class="app-main-container">
    <div class="buttonBar" v-if="isSusBtn">
      <div @click="push('/part/home/map')">
        <i class="el-icon-map-location"></i>
      </div>
      <div @click="push('/part/home/model')">
        <i class="el-icon-office-building"></i>
      </div>
      <div @click="push('/part/home/overview')">
        <i class="el-icon-odometer"></i>
      </div>
    </div>
    <vue-scroll :ops="ops">
      <div class="app-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key"/>
          </keep-alive>
        </transition>
      </div>
    </vue-scroll>
  </div>
</template>
<script>
  export default {
    name: 'Main',
    computed: {
      cachedViews() {
        return this.$route.fullPath
      },
      key() {
        return this.$route.fullPath
      },
      isSusBtn(){
        return this.$route.meta.isSusBtn
      }
    },
    data: () => ({
      routeKey: '',
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: "rgb(53, 53, 53)",
          opacity: ".7"
        }
      },
    }),
    methods: {
      push(path) {
        if (this.routeKey !== path) {
          this.routeKey = path;
          this.$router.push(path);
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/transition.scss";
  @import "./styles/style.scss";
</style>
