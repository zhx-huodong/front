const Content = require('../pages/Content.vue');
const ActivityCenter = require('../pages/activityCenter.vue'); // 活动中心
const PublishManage = require('../pages/publishManage.vue'); // 活动发布与管理
const ExcellenceShow = require('../pages/excellentWork/list.vue'); // 优秀作品展
const UserCenter = require('../pages/userCenter.vue'); // 个人中心
const MyActivity = require('../pages/myActivity.vue'); // 我发布的活动


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



const routes = [
  {
    path: '/',
    components: Content,
    children: [
      { path: '/', components: Switch },
      { path: '/myActivity', components: MyActivity }, // 已审核的活动列表
      { path: '/myActivityDetail', components: MyActivityDetail }, // 动管理与发布详情（未发布）
      { path: '/myActivity/index', components: myActivity }, // 活动管理与发布详情（已发布）
      { path: '/myActivity/workAuditDetail', components: workAuditDetail }, // 活动管理作品审核点击后详情

      { path: '/activityCenter', components: ActivityCenter }, // 活动中心
      { path: '/publishManage', components: PublishManage }, // 活动发布编辑页
      { path: '/excellence', components: ExcellenceShow }, // 优秀作品展示
      { path: '/userCenter', components: UserCenter }, // 个人中心
      { path: '/activeManager', components: activeManager }, // 活动管理
      { path: '/activity/process', components: activityProcess }, // 活动各阶段

     

      { path: '/activeManager/publicActive', components: publicActive }, // 发布活动设置
      { path: '/activeManager', components: activeManager }, // 活动管理
      { path: '/activeManager/createActivity', components: createActivity }, // 创建活动
      { path: '/activeManager/managerCenter', components: managerCenter }, // 活动管理中心


      { path: '/excellentWork/index', components: excellentWork }, // 优秀作品展示
      { path: '/excellentWork/excellentWorkDetail', components: excellentWorkDetail }, // 优秀作品展示详情

      { path: '/expertReview', components: expertReview }, // 专家评审（评审作品）
      { path: '/expertReview/workDetail', components: expertReviewDetail }, // 专家评审点击后详情

      { path: '/expertStore', components: expertStore }, // 专家库
      { path: '/auditActivity', components: auditActivity }, // 审核中心（审核活动）
      { path: '/auditActivity/auditDetail', components: auditDetail }, // 活动审核点击后详情

      { path: '/msgcenter', components: messageCenter }, // 消息中心

      { path: '/home', components: home},//首页
      { path: '/home/activityProject', components: activityProject},//活动项目
      { path: '/home/activityEnroll', components: activityEnroll},//活动报名
      { path: '/home/submitEnroll', components: submitEnroll},//报名成功

      { path: '/userCenter/userEdit', components: userEdit},//个人中心编辑

      { path: '/activityDetail', components: activityDetail},//查看活动详情
      { path: '/workShow', components: workShow},//活动详情展示


      { path: '/admin', components: admin},//超级管理员
      { path: '/roleManage', components: roleManage},//角色管理
      { path: '/expertManage', components: expertManage},//专家管理
      { path: '/expertAssign', components: expertAssign},//专家分配
      { path: '/classifyManage', components: classifyManage},//类型管理
      { path: '/addRole', components: addRole},//添加角色
      { path: '/addExpert', components: addExpert},//添加专家
      { path: '/importExpert', components: importExpert},//导入专家
      { path: '/addClassify', components: addClassify},//添加分类
      { path: '/subClassify', components: subClassify}//子分类


    ]
  },
  { path: '*', redirect: '/' }
];

export default routes;
