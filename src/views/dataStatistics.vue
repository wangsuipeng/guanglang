<template>
  <div class="data-statistics">
    <div class="row_">
      <div class="title_">资产统计</div>
      <div class="col_">
        <template v-if="isStatisticPie">
          <div class="echarts_" id="statisticPie"></div>
        </template>
        <template v-else>
          <span class="tip">暂无数据</span>
        </template>
      </div>
      <div class="col_">
        <template v-if="isStatisticColumnar">
          <div class="echarts_" id="statisticColumnar"></div>
        </template>
        <template v-else>
          <span class="tip">暂无数据</span>
        </template>
      </div>
    </div>
    <div class="row_">
      <div class="title_">备品统计</div>
      <div class="col_">
        <template v-if="isSparePie">
          <div class="echarts_" id="sparePie"></div>
        </template>
        <template v-else>
          <span class="tip">暂无数据</span>
        </template>
      </div>
      <div class="col_">
        <template v-if="isSpareColumnar">
          <div class="echarts_" id="spareColumnar"></div>
        </template>
        <template v-else>
          <span class="tip">暂无数据</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DataStatistics",
    data() {
      return {
        isStatisticPie: false,
        isStatisticColumnar: false,
        isSparePie: false,
        isSpareColumnar: false
      }
    },
    mounted() {
      this.initStatisticPie();
      this.initStatisticColumnar();
      this.initSparePie();
      this.initSpareColumnar();
    },
    methods: {
      initSparePie() {
        let [legendData, seriesData] = [[], []];
        $axios.post('bjeam/alternativeAssets/countAlternativeAssetTypes', {}).then(res => {
          if (res.code === 200) {
            let data = res.data || [];
            this.isSparePie = data.length !== 0;
            if (!this.isSparePie) return;
            data.forEach(item => {
              legendData.push(item.typeName);
              seriesData.push({name: item.typeName, value: item.number, id: item.typeId});
            });
            setTimeout(() => {
              let sparePie = $echarts.init(document.getElementById('sparePie'));
              sparePie.setOption({
                title: {
                  text: '各备品占比',
                  x: 'center',
                  y: 'bottom'
                },
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                  type: 'scroll',
                  orient: 'vertical',
                  right: 100,
                  top: 20,
                  bottom: 20,
                  data: legendData
                },
                series: [
                  {
                    name: '类型',
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '50%'],
                    data: seriesData,
                    itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                  }
                ]
              });
            });
          }
        });
      },
      initStatisticPie() {
        let [legendData, seriesData] = [[], []];
        $axios.post('bjeam/asset/countAssetTypes', {}).then(res => {
          if (res.code === 200) {
            let data = res.data || [];
            this.isStatisticPie = data.length !== 0;
            if (!this.isStatisticPie) return;
            setTimeout(() => {
              let statisticPie = $echarts.init(document.getElementById('statisticPie'));
              statisticPie.setOption({
                title: {
                  text: '各资产占比',
                  x: 'center',
                  y: 'bottom'
                },
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                  type: 'scroll',
                  orient: 'vertical',
                  right: 100,
                  top: 20,
                  bottom: 20,
                  data: legendData
                },
                series: [
                  {
                    name: '类型',
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '50%'],
                    data: seriesData,
                    itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                  }
                ]
              });
            });
            data.forEach(item => {
              legendData.push(item.typeName);
              seriesData.push({name: item.typeName, value: item.number, id: item.typeId});
            });
          }
        });
      },
      initStatisticColumnar() {
        let [legendData, seriesData] = [[], []];
        $axios.post('bjeam/asset/countByProducer', {}).then(res => {
          if (res.code === 200) {
            let data = res.data || [];
            this.isStatisticColumnar = data.length !== 0;
            if (!this.isStatisticColumnar) return;
            data.forEach(item => {
              legendData.push(item.producer);
              seriesData.push({name: item.producer, value: item.number});
            });
            setTimeout(() => {
              let statisticColumnar = $echarts.init(document.getElementById('statisticColumnar'));
              statisticColumnar.setOption({
                title: {
                  text: '资产生产厂商统计',
                  x: 'center',
                  y: 'bottom'
                },
                xAxis: {
                  type: 'category',
                  data: legendData
                },
                tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                yAxis: {
                  type: 'value'
                },
                series: [{
                  data: seriesData,
                  type: 'bar'
                }]
              })
            })
          }
        })
      },
      initSpareColumnar() {
        let [legendData, seriesData] = [[], []];
        $axios.post('bjeam/alternativeAssets/countByProducer', {}).then(res => {
          if (res.code === 200) {
            let data = res.data || [];
            this.isSpareColumnar = data.length !== 0;
            if (!this.isSpareColumnar) return;
            data.forEach(item => {
              legendData.push(item.producer);
              seriesData.push({name: item.producer, value: item.number});
            });
            setTimeout(() => {
              let spareColumnar = $echarts.init(document.getElementById('spareColumnar'));
              spareColumnar.setOption({
                title: {
                  text: '备品生产厂商统计',
                  x: 'center',
                  y: 'bottom'
                },
                tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                xAxis: {
                  type: 'category',
                  data: legendData
                },
                yAxis: {
                  type: 'value'
                },
                series: [{
                  data: seriesData,
                  type: 'bar'
                }]
              })
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .data-statistics {
    height: 100%;
    width: 100%;

    .row_ {
      width: 100%;
      height: 50%;

      .title_ {
        font-size: 18px;
        color: #6a6a6a;
        font-weight: bold;
        height: 24px;
      }

      .col_ {
        width: 50%;
        height: calc(100% - 24px);
        float: left;
        position: relative;
      }

      .echarts_{
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .tip {
        position: absolute;
        top: 50%;
        left: 50%;
        color: #8992aa;
        transform: translate(-50%, -50%);
      }
    }
  }

</style>
