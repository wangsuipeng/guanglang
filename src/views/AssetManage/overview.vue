<template>
  <div class="overview">
    <el-row :gutter="24">
      <el-col :span="8">
        <el-card shadow="hover" v-loading="loading1">
          <div v-if="array1.length !== 0" id="chart1" style="height: 300px;"></div>
          <div class="tip" v-else>
            <span>暂无数据</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" v-loading="loading2">
          <div v-if="array2.length !== 0" id="chart2" style="height: 300px;"></div>
          <div class="tip" v-else>
            <span>暂无数据</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" v-loading="loading3">
          <div v-if="array3.length !== 0" id="chart3" style="height: 300px;"></div>
          <div class="tip" v-else>
            <span>暂无数据</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card shadow="hover" v-loading="loading4">
          <div v-if="array4.length !== 0" id="chart4" style="height: 300px;"></div>
          <div class="tip" v-else>
            <span>暂无数据</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" v-loading="loading5">
          <div v-if="array5.length !== 0" id="chart5" style="height: 300px;"></div>
          <div class="tip" v-else>
            <span>暂无数据</span>
          </div>
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
      array1: [],
      array2: [],
      array3: [],
      array4: [],
      array5: [],
    }),
  }
</script>

<style lang="scss" scoped>
  .overview {

    .tip {
      height: 350px;
      text-align: center;
      line-height: 350px;
      color: #d6d6d6;
    }
  }


</style>
