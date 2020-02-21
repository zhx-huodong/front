const Content = require('../pages/Content.vue');
const ActivityCenter = require('../pages/activityCenter.vue'); // 活动中心
const PublishManage = require('../pages/publishManage.vue'); // 活动发布与管理
const ExcellenceShow = require('../pages/excellentWork/list.vue'); // 优秀作品展
const UserCenter = require('../pages/userCenter.vue'); // 个人中心
const MyActivity = require('../pages/myActivity.vue'); // 我发布的活动
<<<<<<< HEAD


=======
const activeManager=require('../pages/activeManager/index.vue'); // 活动管理
const createActivity=require('../pages/activeManager/createActivity.vue'); // 创建活动
>>>>>>> 886a27ed4f33054f8faa59b12af12577d614aeb9
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

const activeManager=require('../pages/activeManager/index.vue'); // 活动管理
const publicActive=require('../pages/activeManager/publicActive.vue'); // 活动管理


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

<<<<<<< HEAD
     
      { path: '/activeManager/publicActive', components: publicActive }, // 发布活动
=======
      { path: '/activeManager', components: activeManager }, // 活动管理
      { path: '/activeManager/createActivity', components: createActivity }, // 创建活动

>>>>>>> 886a27ed4f33054f8faa59b12af12577d614aeb9

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
      { path: '/workShow', components: workShow}//活动详情展示


      
    ]
  },
  { path: '*', redirect: '/' }
];

export default routes;
