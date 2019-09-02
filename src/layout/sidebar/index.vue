<template>
  <div class="app-sidebar" :style="{width: collapse ? '65px' : '200px'}">
    <vue-scroll :ops="ops">
      <div class="collapse" @click="$store.dispatch('collapse')">
        <i class="el-icon-s-fold collapseIcon"></i>
        {{collapse ? '' : '折叠面板'}}
      </div>
      <el-menu :default-active="defaultActive" :collapse="collapse" class="el-menu-vertical-demo"
               background-color="rgb(49, 60, 82)" text-color="#fff" unique-opened
               @select="evt => $emit('select', evt)" :style="{width: collapse ? '65px' : '200px'}"
               active-text-color="#ffd04b">
        <template v-for="(item1, index1) in items">
          <el-submenu v-if="item1.subs" :index="item1.index" :key="index1">
            <template slot="title">
              <i :class="item1.icon"></i>
              <span v-text="item1.title"></span>
            </template>
            <template v-for="(item2, index2) in item1.subs">
              <el-menu-item :index="item2.index" :key="index2">
                <span slot="title" v-text="item2.title"></span>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :index="item1.index" :key="index1">
            <i :class="item1.icon"></i>
            <span v-text="item1.title"></span>
          </el-menu-item>
        </template>
      </el-menu>
    </vue-scroll>
  </div>
</template>
<script>
  export default {
    name: "Sidebar",
    props: {
      items: {
        type: Array,
        default: [],
        required: true
      },
      defaultActive: {
        type: String,
        required: true
      },
      collapse: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
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
            opacity: "0"
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "./styles/style.scss";
</style>
