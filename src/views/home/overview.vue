<template>
  <div class="overview">
    <el-row :gutter="24">
      <el-col :span="7">
        <el-card shadow="hover" style="height: 500px;" v-loading="loading1">

        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="hover" style="height: 500px;" v-loading="loading2">

        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="hover" style="height: 500px;" v-loading="loading3">

        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin: 20px 0">
      <el-card shadow="hover" style="height: 50px;" v-loading="loading4">

      </el-card>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card shadow="hover" style="height: 90px;" v-loading="loading5">

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" style="height: 90px;" v-loading="loading6">

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" style="height: 90px;" v-loading="loading7">

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" style="height: 90px;" v-loading="loading8">

        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card shadow="hover" style="height: 370px;" v-loading="loading9">

        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" style="height: 370px;" v-loading="loading10">

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Overview",
    data: () => ({
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      loading7: false,
      loading8: false,
      loading9: false,
      loading10: false,
    }),
  }
</script>

<style lang="scss" scoped>
  .overview {

  }

</style>
