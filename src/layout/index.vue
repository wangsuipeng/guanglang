<template>
  <div class="layout-container">
    <div class="sidebar-container" :style="{width: getCollapse ? '65px' : '200px'}">
      <vue-sidebar :collapse="getCollapse"
                   :default-active="sidebarDefaultActive"
                   @select="handleSidebarSelect"
                   :items="sidebarItems"/>
    </div>
    <div :class="['main-container', {'fold': getCollapse}]">
      <vue-header v-if="getHeadState"/>
      <div v-if="Refresh">
        <vue-menu :items="menuItems"
                  :default-active="menuDefaultActive"
                  @select="handleMenuSelect"
                  v-if="getMenuState"/>
      </div>
      <vue-main :style="{'height': `calc(100% - ${( getHeadState ? 50 : 0 ) + ( getMenuState ? 61 : 0 )}px)`}"/>
    </div>
  </div>
</template>
<script>
  import vueSidebar from './sidebar'
  import vueHeader from './header'
  import vueMain from './main'
  import vueMenu from './menu'

  export default {
    name: 'Layout',
    provide() {
      return {
        reload: this.reload
      };
    },
    computed: {
      getCollapse() {
        return this.$store.getters.collapse
      },
      getHeadState() {
        return this.$route.meta.isHead;
      },
      getMenuState() {
        return this.$route.meta.isMenu;
      },
    },
    data: () => ({
      Refresh: true,
      menuItems: [],
      menuVisable: true,
      menuDefaultActive: '',
      sidebarDefaultActive: '',
      sidebarItems: [
        {
          title: "首页",
          index: "home",
          icon: "el-icon-menu"
        },
        {
          title: "资产管理",
          index: "asset",
          icon: "el-icon-menu"
        },
        {
          title: "入廊规划",
          index: "gallery",
          icon: "el-icon-menu"
        },
        {
          title: "运行监控",
          index: "opermonitor",
          icon: "el-icon-menu"
        },
        {
          title: "工作管理",
          index: "work",
          icon: "el-icon-menu"
        },
        {
          title: "应急处理",
          index: "emergency",
          icon: "el-icon-menu"
        },
        {
          title: "工作日历",
          index: "home7",
          icon: "el-icon-menu"
        },
        {
          title: "统计分析",
          index: "statistics",
          icon: "el-icon-menu"
        },
        {
          title: "文档管理",
          index: "filemanage",
          icon: "el-icon-menu"
        },
        {
          title: "应用配置",
          index: "config",
          icon: "el-icon-menu"
        },
        {
          title: "系统设置",
          index: "system",
          icon: "el-icon-menu"
        }
      ],
      menu: {
        asset: [
          {
            title: "概览",
            index: "overview"
          },
          {
            title: "清单",
            index: "detailedlist"
          },
          {
            title: "品项",
            index: "productItem"
          },
          {
            title: "维保记录",
            index: "_",
            subs: [
              {
                title: "保养",
                index: "maintain"
              },
              {
                title: "维修",
                index: "repair"
              },
              {
                title: "更换",
                index: "replace"
              }
            ]
          }
        ],
        opermonitor: [
          {
            title: "概览",
            index: "overview",
          },
          {
            title: "列表",
            index: "listview",
            subs: [
              {
                title: "廊体监测",
                index: "corridor",
                subs: [
                  {
                    title: "结构应力",
                    index: "structure",
                  },
                  {
                    title: "地质沉降",
                    index: "geology",
                  }
                ]
              },
              {
                title: "设备监测",
                index: "equipment",
                subs: [
                  {
                    title: "消防系统",
                    index: "firecontrol",
                  },
                  {
                    title: "安防系统",
                    index: "security",
                  },
                  {
                    title: "通风系统",
                    index: "ventilation",
                  },
                  {
                    title: "排水系统",
                    index: "drain",
                  },
                  {
                    title: "电气系统",
                    index: "electric",
                  }
                ]
              },
              {
                title: "环境监测",
                index: "environment",
                subs: [
                  {
                    title: "气体浓度",
                    index: "environmentgas"
                  },
                  {
                    title: "温湿度",
                    index: "temperature"
                  },
                  {
                    title: "烟雾浓度",
                    index: "smoke"
                  },
                  {
                    title: "液位高度",
                    index: "liquid"
                  }
                ]
              },
              {
                title: "管线监测",
                index: "pipeline",
                subs: [
                  {
                    title: "供水管线监测",
                    index: "watersupply"
                  },
                  {
                    title: "燃气管线监测",
                    index: "pipelinegas"
                  },
                  {
                    title: "污水管线监测",
                    index: "sewage"
                  },
                  {
                    title: "热力管线监测",
                    index: "heat"
                  },
                  {
                    title: "数据异常监测",
                    index: "abnormal"
                  }
                ]
              },
              {
                title: "CCTV",
                index: "cctv",
              }
            ]
          }
        ],
        gallery: [
          {
            index: "entrancePlann",
            title: "工程登记",
            subs: [
              {
                index: "creatingPlanning",
                title: "创建"
              },
              {
                index: "approvalPlanning",
                title: "审批"
              },
              {
                index: "releasePlanning",
                title: "发布"
              },
              {
                index: "returnPlanning",
                title: "退回"
              }
            ]
          },
          {
            index: "costAccounting",
            title: "费用核算"
          },
          {
            index: "statisticsPage",
            title: "统计"
          }
        ],
        work: [
          {
            index: "1",
            title: "工作计划",
            subs: [
              {
                index: "siteInspection",
                title: "巡检"
              },
              {
                index: "curingPage",
                title: "养护"
              },
              {
                index: "otherPage",
                title: "其他"
              }
            ]
          },
          {
            index: "2",
            title: "待办任务",
            subs: [
              {
                index: "planningTasks",
                title: "计划任务"
              },
              {
                index: "temporaryTasks",
                title: "临时任务"
              },
              {
                index: "deleteTasks",
                title: "已取消任务"
              }
            ]
          },
          {
            index: "3",
            title: "工作记录",
            subs: [
              {
                index: "workingRecordsOne",
                title: "执行中"
              },
              {
                index: "workingRecordsTwo",
                title: "已完成"
              }
            ]
          },
          {
            index: "4",
            title: "事件记录",
            subs: [
              {
                index: "accessManagement",
                title: "出入管理"
              },
              {
                index: "1",
                title: "应急事件"
              }
            ]
          }
        ],
        system: [
          {
            index: "unitManagement",
            title: "单位管理",
          },
          {
            index: "userManagement",
            title: "用户管理"
          },
          {
            index: "roleManagement",
            title: "角色管理"
          },
          {
            index: "operationalAudit",
            title: "操作审计"
          }
        ],
        emergency: [
          {
            index: 'emergencyRecord',
            title: '应急事件记录'
          },
          {
            index: 'emergencyplan',
            title: '应急预案配置'
          }
        ],
        config: [
          {
            index: 'thresholdConfig',
            title: '阈值配置'
          },
          {
            index: 'costAllocation',
            title: '费用项配置'
          },
          {
            index: 'patrolConfig',
            title: '巡检作业配置'
          }
        ],
        statistics: [
          {
            index: 'financialStatistics',
            title: '财务统计'
          },
          {
            index: 'assetStatistics',
            title: '资产统计'
          },
          {
            index: 'performanceStatistics',
            title: '工作绩效'
          },
          {
            index: 'equipmentOperation',
            title: '设备运行'
          }
        ]
      }
    }),
    mounted() {
      this.menuDefaultActive = sessionStorage.menuDefaultActive;
      this.sidebarDefaultActive = sessionStorage.sidebarDefaultActive;
      this.menuItems = this.menu[sessionStorage.sidebarDefaultActive] || [];
    },
    methods: {
      reload() {
        this.Refresh = false;
        this.$nextTick(function () {
          this.Refresh = true;
        });
      },
      handleMenuSelect(key) {
        sessionStorage.menuDefaultActive = key;
        this.$router.push(`/part/${sessionStorage.sidebarDefaultActive}/${key}`);
      },
      handleSidebarSelect(key) {
        if (sessionStorage.sidebarDefaultActive !== key) {
          sessionStorage.sidebarDefaultActive = key;
          if (this.menu[key]) {
            this.reload();
            this.menuItems = this.menu[key];
            let index = this.menu[key][0].subs ? this.menu[key][0].subs[0].index : this.menu[key][0].index;
            sessionStorage.menuDefaultActive = index;
            this.menuDefaultActive = index;
          }
          this.$router.push(`/part/${key}`);
        }
      },
      formater() {
        let sidebarData = JSON.parse(this.$store.getters.sidebarData);
        for (let i = 0; i < sidebarData.length; i++) {
          let obj;
          if (sidebarData[i].pid === -1) {
            obj = {
              id: sidebarData[i].id,
              pid: sidebarData[i].pid,
              icon: sidebarData[i].icon,
              index: sidebarData[i].index,
              title: sidebarData[i].title,
              subs: []
            };
          } else {
            obj = {
              id: sidebarData[i].id,
              pid: sidebarData[i].pid,
              index: sidebarData[i].index,
              title: sidebarData[i].title
            };
          }
          this.items.push(obj);
        }
        this.filterArray(this.items, -1);
      },
      filterArray(data, pid) {
        //递归，将数组变为树形结构
        let tree = [];
        let temp;
        for (let i = 0; i < data.length; i++) {
          if (data[i].pid === pid) {
            let obj = data[i];
            temp = this.filterArray(data, data[i].id);
            if (temp.length > 0) {
              obj.subs = temp;
            }
            tree.push(obj);
          }
        }
        this.items = tree;
        return tree;
      },
    },
    components: {
      vueHeader,
      vueMain,
      vueSidebar,
      vueMenu
    }
  }
</script>
<style lang="scss" scoped>
  .layout-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .main-container {
      height: 100%;
      float: left;
      width: calc(100% - 200px);
      transition: width .2s;
    }

    .fold {
      width: calc(100% - 65px);
    }

    .sidebar-container {
      height: 100%;
      width: 200px;
      float: left;
      transition: width .2s;
    }
  }
</style>
