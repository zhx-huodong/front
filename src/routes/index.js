const Content = require('../pages/Content.vue');
const ActivityCenter = require('../pages/activityCenter.vue'); // 活动中心
const PublishManage = require('../pages/publishManage.vue'); // 活动发布与管理
const ExcellenceShow = require('../pages/excellentWork/list.vue'); // 优秀作品展
const UserCenter = require('../pages/userCenter.vue'); // 个人中心
const MyActivity = require('../pages/myActivity.vue'); // 我发布的活动
const newsBulletin = require('../pages/newsBulletin.vue'); // 消息公告
const newsBulletinDetail = require('../pages/newsBulletinDetail.vue'); // 消息公告



const activeManager=require('../pages/activeManager/index.vue'); // 活动管理
const publicActive=require('../pages/activeManager/publicActive.vue'); // 活动管理
const createActivity=require('../pages/activeManager/createActivity.vue'); // 创建活动
const managerCenter=require('../pages/activeManager/managerCenter.vue'); // 创建活动



const MyActivityDetail = require('../pages/myActivityDetail.vue'); // 我发布的活动-创建活动
const activityProcess = require('../pages/activityProcess/index');
const excellentWork = require('../pages/excellentWork/index');
const excellentWorkDetail = require('../pages/excellentWork/excellentWorkDetail');
const expertReview = require('../pages/expertReview/index');
const expertReviewDetail = require('../pages/expertReview/workDetail');
const expertStore = require('../pages/expertStore');
const auditActivity = require('../pages/auditCenter/auditActivity');
const auditDetail = require('../pages/auditCenter/auditDetail');
const myActivity = require('../pages/myActivity/index');
const messageCenter = require('../pages/messageCenter/index');
const workAuditDetail = require('../pages/myActivity/workAuditDetail');
const Switch = require('../pages/switchPage');
const home=require('../pages/home');
const activityProject=require('../pages/homePages/activityProject');
const activityEnroll=require('../pages/homePages/activityEnroll');
const userEdit=require('../pages/userCenter/userEdit');
const submitEnroll=require('../pages/homePages/submitEnroll');
const activityDetail = require('../pages/activityProcess/activityDetail');
const workShow = require('../pages/activityProcess/workShow');



const admin=require('../pages/admin.vue'); // 超级管理员
const roleManage=require('../pages/adminManager/roleManage.vue'); // 角色管理
const expertManage=require('../pages/adminManager/expertManage.vue'); // 专家管理
const expertAssign=require('../pages/adminManager/expertAssign.vue'); // 专家分配
const classifyManage=require('../pages/adminManager/classifyManage.vue'); // 分类管理
const addRole=require('../pages/adminManager/addRole.vue'); // 添加角色
const addExpert=require('../pages/adminManager/addExpert.vue'); // 添加专家
const importExpert=require('../pages/adminManager/importExpert.vue'); // 导入专家
const addClassify=require('../pages/adminManager/addClassify.vue'); // 添加分类
const subClassify=require('../pages/adminManager/subClassify.vue'); // 子分类


const workReview=require('../pages/workReview.vue'); // 作品评审
const workScore=require('../pages/workReview/workScore.vue'); // 作品评分
const importWorkList=require('../pages/workReview/importWorkList.vue'); // 导入作品评分列表



const routes = [
  {
    path: '/',
    components: Content,
    children: [
      { path: '/', components: Switch },
      { path: '/myActivity',name:"已审核的活动列表", components: MyActivity,meta: { title: '已审核的活动列表' } }, // 已审核的活动列表
      { path: '/myActivityDetail',name:"动管理与未发布详情", components: MyActivityDetail,meta: { title: '动管理与未发布详情' } }, // 动管理与发布详情（未发布）
      { path: '/myActivity/index',name:"活动管理与已发布详情", components: myActivity,meta: { title: '活动管理与已发布详情' } }, // 活动管理与发布详情（已发布）
      { path: '/myActivity/workAuditDetail',name:"活动管理作品审核点击后详情", components: workAuditDetail,meta: { title: '活动管理作品审核点击后详情' } }, // 活动管理作品审核点击后详情

      { path: '/activityCenter',name:"活动中心", components: ActivityCenter ,meta: { title: '活动中心' }}, // 活动中心
      { path: '/publishManage',name:"活动发布编辑页", components: PublishManage ,meta: { title: '活动发布编辑页' }}, // 活动发布编辑页
      { path: '/excellence',name:"优秀作品展示", components: ExcellenceShow ,meta: { title: '优秀作品展示' }}, // 优秀作品展示
      { path: '/userCenter',name:"个人中心", components: UserCenter ,meta: { title: '个人中心' }}, // 个人中心
      { path: '/activeManager',name:"活动管理", components: activeManager,meta: { title: '活动管理' } }, // 活动管理
      { path: '/activity/process',name:"活动各阶段", components: activityProcess,meta: { title: '活动各阶段' } }, // 活动各阶段
      { path: '/newsBulletin',name:"消息公告", components: newsBulletin ,meta: { title: '消息公告' }}, // 消息公告
      { path: '/newsBulletinDetail',name:"消息公告详情", components: newsBulletinDetail,meta: { title: '消息公告详情' } }, // 消息公告

     

      { path: '/activeManager/publicActive',name:"发布活动设置", components: publicActive,meta: { title: '发布活动设置' } }, // 发布活动设置
      { path: '/activeManager',name:"活动管理", components: activeManager,meta: { title: '活动管理' } }, // 活动管理
      { path: '/activeManager/createActivity',name:"创建活动", components: createActivity,meta: { title: '创建活动' } }, // 创建活动
      { path: '/activeManager/managerCenter',name:"活动管理中心", components: managerCenter,meta: { title: '活动管理中心' } }, // 活动管理中心


      { path: '/excellentWork/index',name:"优秀作品展示", components: excellentWork,meta: { title: '优秀作品展示' } }, // 优秀作品展示
      { path: '/excellentWork/excellentWorkDetail',name:"优秀作品展示详情", components: excellentWorkDetail,meta: { title: '优秀作品展示详情' } }, // 优秀作品展示详情

      { path: '/expertReview',name:"专家评审", components: expertReview ,meta: { title: '专家评审' }}, // 专家评审（评审作品）
      { path: '/expertReview/workDetail', name:"专家评审点击后详情",components: expertReviewDetail,meta: { title: '专家评审点击后详情' } }, // 专家评审点击后详情

      { path: '/expertStore',name:"专家库", components: expertStore,meta: { title: '专家库' } }, // 专家库
      { path: '/auditActivity',name:"审核中心", components: auditActivity,meta: { title: '审核中心' } }, // 审核中心（审核活动）
      { path: '/auditActivity/auditDetail', name:"活动审核点击后详情",components: auditDetail,meta: { title: '活动审核点击后详情' } }, // 活动审核点击后详情
      { path: '/msgcenter',name:"消息中心", components: messageCenter,meta: { title: '消息中心' } }, // 消息中心

      { path: '/home', name: "首页", components: home,meta: { title: '首页' }},//首页
      { path: '/home/activityProject',name:"活动项目", components: activityProject,meta: { title: '活动项目' }},//活动项目
      { path: '/home/activityEnroll',name:"活动报名", components: activityEnroll,meta: { title: '活动报名' }},//活动报名
      { path: '/home/submitEnroll',name:"报名成功", components: submitEnroll,meta: { title: '报名成功' }},//报名成功
      { path: '/userCenter/userEdit',name:"个人中心编辑", components: userEdit,meta: { title: '个人中心编辑' }},//个人中心编辑

      { path: '/activityDetail',name:"查看活动详情", components: activityDetail,meta: { title: '查看活动详情' }},//查看活动详情
      { path: '/workShow',name:"活动详情展示", components: workShow,meta: { title: '活动详情展示' }},//活动详情展示


      { path: '/admin',name:"超级管理员", components: admin,meta: { title: '超级管理员' }},//超级管理员
      { path: '/roleManage',name:"角色管理", components: roleManage,meta: { title: '角色管理' }},//角色管理
      { path: '/expertManage',name:"专家管理", components: expertManage,meta: { title: '角色管理' }},//专家管理
      { path: '/expertAssign',name:"专家分配", components: expertAssign,meta: { title: '专家分配' }},//专家分配
      { path: '/classifyManage',name:"类型管理", components: classifyManage,meta: { title: '类型管理' }},//类型管理
      { path: '/addRole',name:"添加角色", components: addRole,meta: { title: '添加角色' }},//添加角色
      { path: '/addExpert',name:"添加专家", components: addExpert,meta: { title: '添加专家' }},//添加专家
      { path: '/importExpert',name:"导入专家", components: importExpert,meta: { title: '导入专家' }},//导入专家
      { path: '/addClassify',name:"添加分类", components: addClassify,meta: { title: '添加分类' }},//添加分类
      { path: '/subClassify',name:"子分类", components: subClassify,meta: { title: '子分类' }},//子分类

      { path: '/workReview',name:"作品评审", components: workReview,meta: { title: '作品评审' }},//作品评审（专家模块）
      { path: '/workScore',name:"作品评分", components: workScore,meta: { title: '作品评分' }},//作品评分（专家模块）
      { path: '/importWorkList',name:"导入作品评分列表", components: importWorkList,meta: { title: '导入作品评分列表' }}//导入作品评分列表（专家模块）


    ]
  },
  { path: '*', redirect: '/' }
];

export default routes;
