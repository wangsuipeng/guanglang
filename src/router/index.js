import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/views/login'),
      name: 'Login',
      meta: {title: 'login'}
    },
    {
      path: '/search',
      component: () => import('@/views/search'),
      redirect: 'search/device',
      name: 'Search',
      meta: {title: 'search'},
      children: [
        {
          path: 'device',
          component: () => import('@/views/search/device'),
          name: 'Device',
          meta: {title: 'device'},
        },
        {
          path: 'run',
          component: () => import('@/views/search/run'),
          name: 'Run',
          meta: {title: 'run'},
        },
        {
          path: 'records',
          component: () => import('@/views/search/records'),
          name: 'Records',
          meta: {title: 'records'},
        },
        {
          path: 'document',
          component: () => import('@/views/search/document'),
          name: 'Document',
          meta: {title: 'document'},
        }
      ]
    },
    {
      path: '/part',
      redirect: '/part/home',
      component: Layout,
      children: [
        {
          path: 'home',
          component: () => import('@/views/home'),
          redirect: 'home/map',
          name: 'Home',
          meta: {title: 'home'},
          children: [
            {
              path: 'map',
              component: () => import('@/views/home/map'),
              name: 'Map',
              meta: {title: '地图', isSusBtn: true},
            },
            {
              path: 'model',
              component: () => import('@/views/home/model'),
              name: 'Model',
              meta: {title: '模型', isSusBtn: true},
            },
            {
              path: 'overview',
              component: () => import('@/views/home/overview'),
              name: 'Overview',
              meta: {title: '概览', isHead: true, isSusBtn: true},
            }
          ]
        },
        {
          path: 'opermonitor',
          component: () => import('@/views/operMonitor'),
          redirect: 'opermonitor/overview',
          name: 'OperMonitor',
          meta: {title: '运行监控'},
          children: [
            {
              path: 'overview',
              component: () => import('@/views/operMonitor/overview'),
              name: 'OperMonitor',
              meta: {title: '概览', isHead: true, isMenu: true},
            },
            /* --------------------- 廊体监测 ------------------------ */
            {
              path: 'structure',
              component: () => import('@/views/operMonitor/structure'),
              name: 'Structure',
              meta: {title: '结构应力', isHead: true, isMenu: true},
            },
            {
              path: 'geology',
              component: () => import('@/views/operMonitor/geology'),
              name: 'Geology',
              meta: {title: '地质沉降', isHead: true, isMenu: true},
            },
            /* --------------------- 设备监测 ------------------------ */
            {
              path: 'firecontrol',
              component: () => import('@/views/operMonitor/firecontrol'),
              name: 'Firecontrol',
              meta: {title: '消防系统', isHead: true, isMenu: true},
            },
            {
              path: 'security',
              component: () => import('@/views/operMonitor/security'),
              name: 'Security',
              meta: {title: '安防系统', isHead: true, isMenu: true},
            },
            {
              path: 'ventilation',
              component: () => import('@/views/operMonitor/ventilation'),
              name: 'Ventilation',
              meta: {title: '通风系统', isHead: true, isMenu: true},
            },
            {
              path: 'drain',
              component: () => import('@/views/operMonitor/drain'),
              name: 'Drain',
              meta: {title: '排水系统', isHead: true, isMenu: true},
            },
            {
              path: 'electric',
              component: () => import('@/views/operMonitor/electric'),
              name: 'Electric',
              meta: {title: '电气系统', isHead: true, isMenu: true},
            },
            /* --------------------- 环境监测 ------------------------ */
            {
              path: 'environmentgas',
              component: () => import('@/views/operMonitor/environmentgas'),
              name: 'Environmentgas',
              meta: {title: '气体浓度', isHead: true, isMenu: true},
            },
            {
              path: 'temperature',
              component: () => import('@/views/operMonitor/temperature'),
              name: 'Temperature',
              meta: {title: '温湿度', isHead: true, isMenu: true},
            },
            {
              path: 'smoke',
              component: () => import('@/views/operMonitor/smoke'),
              name: 'Smoke',
              meta: {title: '烟雾浓度', isHead: true, isMenu: true},
            },
            {
              path: 'liquid',
              component: () => import('@/views/operMonitor/liquid'),
              name: 'Liquid',
              meta: {title: '液位高度', isHead: true, isMenu: true},
            },
            /* --------------------- 管线监测 ------------------------ */
            {
              path: 'watersupply',
              component: () => import('@/views/operMonitor/watersupply'),
              name: 'Watersupply',
              meta: {title: '供水管线监测', isHead: true, isMenu: true},
            },
            {
              path: 'pipelinegas',
              component: () => import('@/views/operMonitor/pipelinegas'),
              name: 'Pipelinegas',
              meta: {title: '燃气管线监测', isHead: true, isMenu: true},
            },
            {
              path: 'sewage',
              component: () => import('@/views/operMonitor/sewage'),
              name: 'Sewage',
              meta: {title: '污水管线监测', isHead: true, isMenu: true},
            },
            {
              path: 'heat',
              component: () => import('@/views/operMonitor/heat'),
              name: 'Heat',
              meta: {title: '热力管线监测', isHead: true, isMenu: true},
            },
            {
              path: 'abnormal',
              component: () => import('@/views/operMonitor/abnormal'),
              name: 'Abnormal',
              meta: {title: '数据异常监测', isHead: true, isMenu: true},
            },
            /* --------------------- CCTV ------------------------ */
            {
              path: 'cctv',
              component: () => import('@/views/operMonitor/cctv'),
              name: 'Cctv',
              meta: {title: 'CCTV', isHead: true, isMenu: true},
            },
          ]
        },
        {
          path: 'gallery',
          redirect: 'gallery/creatingPlanning',
          component: () => import('@/views/gallery'),
          name: 'entrancePlann',
          meta: {title: '入廊规划'},
          children: [
            {
              path: 'creatingPlanning',
              component: () => import('@/views/gallery/creatingPlanning'),
              name: 'creatingPlanning',
              meta: {title: '创建', isMenu: true, isHead: true},
            },
            {
              path: 'approvalPlanning',
              component: () => import('@/views/gallery/approvalPlanning'),
              name: 'approvalPlanning',
              meta: {title: '审批', isMenu: true, isHead: true},
            },
            {
              path: 'releasePlanning',
              component: () => import('@/views/gallery/releasePlanning'),
              name: 'releasePlanning',
              meta: {title: '发布', isMenu: true, isHead: true},
            },
            {
              path: 'returnPlanning',
              component: () => import('@/views/gallery/returnPlanning'),
              name: 'returnPlanning',
              meta: {title: '退出', isMenu: true, isHead: true},
            },
            {
              path: 'costAccounting',
              component: () => import('@/views/gallery/costAccounting'),
              name: 'costAccounting',
              meta: {title: '费用核算', isMenu: true, isHead: true},
            },
            {
              path: 'statisticsPage',
              component: () => import('@/views/gallery/statisticsPage'),
              name: 'statisticsPage',
              meta: {title: '统计', isMenu: true, isHead: true},
            }
          ]
        },
        {
          path: 'work',
          redirect: 'work/siteInspection',
          component: () => import('@/views/work'),
          name: 'work',
          meta: {title: '工作管理'},
          children: [
            {
              path: 'siteInspection',
              component: () => import('@/views/work/siteInspection'),
              name: 'siteInspection',
              meta: {title: '巡检', isMenu: true, isHead: true}
            },
            {
              path: 'curingPage',
              component: () => import('@/views/work/curingPage'),
              name: 'curingPage',
              meta: {title: '养护', isMenu: true, isHead: true}
            },
            {
              path: 'otherPage',
              component: () => import('@/views/work/otherPage'),
              name: 'otherPage',
              meta: {title: '其他', isMenu: true, isHead: true}
            },
            {
              path: 'planningTasks',
              component: () => import('@/views/work/planningTasks'),
              name: 'planningTasks',
              meta: {title: '计划任务', isMenu: true, isHead: true}
            },
            {
              path: 'temporaryTasks',
              component: () => import('@/views/work/temporaryTasks'),
              name: 'temporaryTasks',
              meta: {title: '临时任务', isMenu: true, isHead: true}
            },
            {
              path: 'deleteTasks',
              component: () => import('@/views/work/deleteTasks'),
              name: 'deleteTasks',
              meta: {title: '已取消任务', isMenu: true, isHead: true}
            },
            {
              path: 'workingRecordsOne',
              component: () => import('@/views/work/workingRecordsOne'),
              name: 'workingRecordsOne',
              meta: {title: '执行中', isMenu: true, isHead: true}
            },
            {
              path: 'workingRecordsTwo',
              component: () => import('@/views/work/workingRecordsTwo'),
              name: 'workingRecordsTwo',
              meta: {title: '已完成', isMenu: true, isHead: true}
            },
            {
              path: 'accessManagement',
              component: () => import('@/views/work/accessManagement'),
              name: 'AccessManagement',
              meta: {title: '出入管理', isMenu: true, isHead: true}
            },
          ]
        },
        {
          path: 'emergency',
          component: () => import('@/views/emergency'),
          name: 'Emergency',
          redirect: 'emergency/emergencyRecord',
          meta: {title: 'emergency'},
          children: [
            {
              path: 'emergencyRecord',
              component: () => import('@/views/emergency/emergencyRecord'),
              name: 'EmergencyRecord',
              meta: {title: 'emergencyRecord', isMenu: true, isHead: true}
            },
            {
              path: 'emergencyplan',
              component: () => import('@/views/emergency/emergencyPlan'),
              name: 'EmergencyPlan',
              meta: {title: 'emergencyPlan', isMenu: true, isHead: true}
            },
          ]
        },
        {
          path: 'filemanage',
          component: () => import('@/views/fileManage'),
          name: 'FileManage',
          meta: {title: 'FileManage', isHead: true}
        },
        {
          path: 'applictionconf',
          component: () => import('@/views/applictionconf'),
          name: 'Applictionconf',
          meta: {title: 'applictionconf'}
        },
        {
          path: 'asset',
          redirect: 'asset/overview',
          component: () => import('@/views/assetManage'),
          name: 'Asset',
          meta: {title: 'asset'},
          children: [
            {
              path: 'overview',
              component: () => import('@/views/assetManage/overview'),
              name: 'Overview',
              meta: {title: 'overview', isMenu: true, isHead: true}
            },
            {
              path: 'detailedlist',
              component: () => import('@/views/assetManage/detailedlist'),
              name: 'Detailedlist',
              meta: {title: 'detailedlist', isMenu: true, isHead: true}
            },
            {
              path: 'productItem',
              component: () => import('@/views/assetManage/productItem'),
              name: 'ProductItem',
              meta: {title: 'productItem', isMenu: true, isHead: true}
            },
            {
              path: 'maintain',
              component: () => import('@/views/assetManage/maintain'),
              name: 'Maintain',
              meta: {title: 'maintain', isMenu: true, isHead: true}
            },
            {
              path: 'repair',
              component: () => import('@/views/assetManage/repair'),
              name: 'Repair',
              meta: {title: 'repair', isMenu: true, isHead: true}
            },
            {
              path: 'replace',
              component: () => import('@/views/assetManage/replace'),
              name: 'Replace',
              meta: {title: 'repair', isMenu: true, isHead: true}
            },
          ]
        },
        {
          path: 'system',
          redirect: 'system/unitManagement',
          component: () => import('@/views/system'),
          name: 'System',
          meta: {title: '系统设置'},
          children: [
            {
              path: "unitManagement",
              component: () => import('@/views/system/unitManagement'),
              name: 'UnitManagement',
              meta: {title: '单位管理', isMenu: true, isHead: true}
            },
            {
              path: "userManagement",
              component: () => import('@/views/system/userManagement'),
              name: 'UserManagement',
              meta: {title: '用户管理', isMenu: true, isHead: true}
            },
            {
              path: "roleManagement",
              component: () => import('@/views/system/roleManagement'),
              name: 'RoleManagement',
              meta: {title: '角色管理', isMenu: true, isHead: true}
            },
            {
              path: "operationalAudit",
              component: () => import('@/views/system/operationalAudit'),
              name: 'OperationalAudit',
              meta: {title: '操作审计', isMenu: true, isHead: true}
            }
          ]
        },
        {
          path: 'config',
          redirect: 'config/thresholdConfig',
          component: () => import('@/views/config'),
          name: 'Config',
          meta: {title: '应用配置'},
          children: [
            {
              path: 'thresholdConfig',
              component: () => import('@/views/config/thresholdConfig'),
              name: 'ThresholdConfig',
              meta: {title: '阈值配置', isMenu: true, isHead: true},
            },
            {
              path: 'costAllocation',
              component: () => import('@/views/config/costAllocation'),
              name: 'CostAllocation',
              meta: {title: '费用项配置', isMenu: true, isHead: true},
            },
            {
              path: 'patrolConfig',
              component: () => import('@/views/config/patrolConfig'),
              name: 'PatrolConfig',
              meta: {title: '巡检作业配置', isMenu: true, isHead: true},
            }
          ]
        },
        {
          path: 'statistics',
          redirect: 'statistics/financialStatistics',
          component: () => import('@/views/statistics'),
          name: 'Statistics',
          meta: {title: '统计分析'},
          children: [
            {
              path: 'financialStatistics',
              component: () => import('@/views/statistics/financialStatistics'),
              name: 'FinancialStatistics',
              meta: {title: '财务统计', isMenu: true, isHead: true}
            },
            {
              path: 'assetStatistics',
              component: () => import('@/views/statistics/assetStatistics'),
              name: 'AssetStatistics',
              meta: {title: '资产统计', isMenu: true, isHead: true}
            },
            {
              path: 'performanceStatistics',
              component: () => import('@/views/statistics/performanceStatistics'),
              name: 'PerformanceStatistics',
              meta: {title: '工作绩效', isMenu: true, isHead: true}
            },
            {
              path: 'equipmentOperation',
              component: () => import('@/views/statistics/equipmentOperation'),
              name: 'EquipmentOperation',
              meta: {title: '设备运行', isMenu: true, isHead: true}
            }
          ]
        }
      ]
    },
    {
      path: '/404',
      component: () => import('@/components/404'),
      name: 'Error',
      meta: {title: 'error'}
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
