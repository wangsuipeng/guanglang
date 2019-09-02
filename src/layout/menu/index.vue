<template>
  <div class="vue-menu">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-demo"
      mode="horizontal"
      menu-trigger="click"
      unique-opened
      @select="(e, e1)=> $emit('select', e, e1)">
      <template v-for="(item1, index1) in items">
        <el-submenu v-if="item1.subs" :index="item1.index" :key="index1">
          <template slot="title">
            <span v-text="item1.title"></span>
          </template>
          <template v-for="(item2, index2) in item1.subs">
            <el-submenu v-if="item2.subs" :index="item2.index" :key="index2">
              <template slot="title">
                <span v-text="item2.title"></span>
              </template>
              <template v-for="(item3, index3) in item2.subs">
                <el-submenu v-if="item3.subs" :index="item3.index" :key="index3">
                  <template slot="title">
                    <span v-text="item3.title"></span>
                  </template>
                </el-submenu>
                <el-menu-item v-else :index="item3.index" :key="index3">
                  <span slot="title" v-text="item3.title"></span>
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :index="item2.index" :key="index2">
              <span slot="title" v-text="item2.title"></span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :index="item1.index" :key="index1">
          <span v-text="item1.title"></span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "Menu",
    props: {
      defaultActive: {
        type: String,
        required: true
      },
      items: {
        type: Array,
        default: [],
        required: true
      }
    }
  };
</script>
<style scoped>
  .vue-menu {
    height: 61px;
    width: 100%;
  }
</style>
