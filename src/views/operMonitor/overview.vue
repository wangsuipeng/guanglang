<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card shadow="hover" style="height: 350px;" v-loading="loading1">

        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" style="height: 350px;" v-loading="loading2">

        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin: 20px 0">
      <el-col :span="12">
        <el-card shadow="hover" style="height: 350px;" v-loading="loading3">

        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" style="height: 350px;" v-loading="loading4">

        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card shadow="hover" style="height: 350px;" v-loading="loading5">

        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" style="height: 350px;" v-loading="loading6">

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
    })
  }
</script>

<style scoped>

</style>
