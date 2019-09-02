<template>
  <div class="app-header">
    <div class="view-right">
      <el-dropdown trigger="click">
        <span>
          <img :src="getAvatar" class="avatar" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="">{{getNickname || '个人中心'}}</el-dropdown-item>
          <el-dropdown-item @click.native="">信息管理</el-dropdown-item>
          <el-dropdown-item @click.native="" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="view-right">
      <div class="i-box">
        <i class="el-icon-message-solid"></i>
      </div>
    </div>
    <div class="view-right">
      <div class="i-box1" @click="toSearch">
        <i class="el-icon-search"></i>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'Header',
    computed: {
      getNickname() {
        return this.$store.getters.nickname
      },
      getAvatar(){
        return this.$store.getters.avatar
      }
    },
    methods: {
      toSearch() {
        sessionStorage.routerPath = location.href.split('#')[1];
        this.$router.push('/search');
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "styles/style.scss";
</style>
