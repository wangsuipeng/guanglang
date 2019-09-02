<template>
  <div class="container-main">
    <div class="money-num">
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="6" class="el-col_box">
          <div class="grid-content bg-purple">
            <div class="red public">
              <div class="title">铺设支出</div>
              <div class="number">￥1.268.200</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="el-col_box">
          <div class="grid-content bg-purple-light">
            <div class="blue public">
              <div class="title">管理支出</div>
              <div class="number">￥1.268.200</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="el-col_box">
          <div class="grid-content bg-purple">
            <div class="yellow public">
              <div class="title">本月营收</div>
              <div class="number">￥1.268.200</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="el-col_box">
          <div class="grid-content bg-purple-light">
            <div class="green public">
              <div class="title">总营收</div>
              <div class="number">￥1.268.200</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="15">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="9">
        <div class="chart-wrapper">
          <barmin-chart />
        </div>
      </el-col>
    </el-row>
    <el-row class="chart-wrapper">
      <Line-Chart :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarChart from "./components/BarChart"
import BarminChart from './components/BarminChart'
import LineChart from './components/lineChart'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  components: {
    BarChart,
    BarminChart,
    LineChart
  }
};
</script>

<style lang='scss' scoped>
.container-main {
  width: 100%;
  .money-num {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el-col_box {
    margin-bottom: 20px;
  }
}
.el-row {
  // margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  min-width: 196px;
  .public {
    height: 109px;
    position: relative;
    color: #fff;
    .title {
      position: absolute;
      top: 10px;
      left: 20px;
    }
    .number {
      position: absolute;
      bottom: 10px;
      right: 20px;
      font-size: 30px;
    }
  }
  .red {
    background-color: #ff6060;
  }
  .blue {
    background-color: #009bdd;
  }
  .yellow {
    background-color: #ffbe3c;
  }
  .green {
    background-color: #4caf50;
  }
}
@media only screen and (max-width: 800px) {
  /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
  .el-col-sm-12 {
    width: 100%;
  }
}
.chart-wrapper {
  // background-color: rgb(240, 242, 245);
  border: 1px solid #dee5e7;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
</style>