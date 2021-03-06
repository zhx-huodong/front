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
const activeEdit=require('../pages/activeManager/activeEdit.vue'); // 创建活动/编辑 
const EvaluationResultDetail=require('../pages/activeManager/EvaluationResultDetail.vue'); // 市评审详情
const releaseAnnouncement=require('../pages/activeManager/releaseAnnouncement.vue'); // 发布公告



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

const home=require('../pages/home');//首页
const activityIntroduction=require('../pages/homePages/activityIntroduction');//活动介绍
const choiceActivity=require('../pages/homePages/choiceActivity');//选择活动
const seeInformation=require('../pages/homePages/seeInformation');//查看公告
const activityProject=require('../pages/homePages/activityProject');
const activityEnroll=require('../pages/homePages/activityEnroll');
const userEdit=require('../pages/userCenter/userEdit');
const submitEnroll=require('../pages/homePages/submitEnroll');
const activityDetail = require('../pages/homePages/activityDetail');
const workShow = require('../pages/activityProcess/workShow');
const goodWorks=require('../pages/homePages/goodWorks'); //每个活动中的优秀作品

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
const prizeManagement=require('../pages/adminManager/prizeManagement.vue'); // 子分类


const workReview=require('../pages/workReview.vue'); // 作品评审
const workScore=require('../pages/workReview/workScore.vue'); // 作品评分
const importWorkList=require('../pages/workReview/importWorkList.vue'); // 导入作品评分列表



const routes = [
  {
    path: '/',
    components: Content,
    children: [
      { path: '/', components: Switch },
      { path: '/myActivity',name:"已审核的活动列表", components: MyActivity,meta: { title: '已审核的活动列表',keepAlive: false  } }, // 已审核的活动列表
      { path: '/myActivityDetail',name:"动管理与未发布详情", components: MyActivityDetail,meta: { title: '动管理与未发布详情',keepAlive: false } }, // 动管理与发布详情（未发布）
      { path: '/myActivity/index',name:"活动管理与已发布详情", components: myActivity,meta: { title: '活动管理与已发布详情',keepAlive: false } }, // 活动管理与发布详情（已发布）
      { path: '/myActivity/workAuditDetail',name:"活动管理作品审核点击后详情", components: workAuditDetail,meta: { title: '活动管理作品审核点击后详情',keepAlive: false } }, // 活动管理作品审核点击后详情

      { path: '/activityCenter',name:"活动中心", components: ActivityCenter ,meta: { title: '活动中心',keepAlive: false }}, // 活动中心
      { path: '/publishManage',name:"活动发布编辑页", components: PublishManage ,meta: { title: '活动发布编辑页' ,keepAlive: false}}, // 活动发布编辑页
      { path: '/excellence',name:"优秀作品展示", components: ExcellenceShow ,meta: { title: '优秀作品展示',keepAlive: false }}, // 优秀作品展示
      { path: '/goodWorks',name:'活动优秀作品详情', components:goodWorks, meta: {title :'活动优秀作品详情',keepAlive: false}},//活动优秀作品详情
      { path: '/userCenter',name:"个人中心", components: UserCenter ,meta: { title: '个人中心',keepAlive: false }}, // 个人中心
      { path: '/activeManager',name:"活动管理", components: activeManager,meta: { title: '活动管理',keepAlive: false } }, // 活动管理
      { path: '/activity/process',name:"活动各阶段", components: activityProcess,meta: { title: '活动各阶段' ,keepAlive: false} }, // 活动各阶段
      { path: '/newsBulletin',name:"消息公告", components: newsBulletin ,meta: { title: '消息公告' ,keepAlive: false}}, // 消息公告
      { path: '/newsBulletinDetail',name:"消息公告详情", components: newsBulletinDetail,meta: { title: '消息公告详情' ,keepAlive: false} }, // 消息公告

      { path: '/activeManager',name:"活动管理", components: activeManager,meta: { title: '活动管理' ,keepAlive: false} }, // 活动管理
      { path: '/activeManager/createActivity',name:"创建活动", components: createActivity,meta: { title: '创建活动' ,keepAlive: false} }, // 创建活动
      { path: '/activeManager/managerCenter',name:"活动管理中心", components: managerCenter,meta: { title: '活动管理中心',keepAlive: false } }, // 活动管理中心
      { path: '/activeManager/createActivity/activeEdit',name:"活动编辑", components: activeEdit,meta: { title: '编辑' ,keepAlive: false} }, // 活动管理中心 
      { path: '/activeManager/managerCenter/EvaluationResultDetail',name:"市评审结果详情", components: EvaluationResultDetail,meta: { title: '详情',keepAlive: false } }, // 市活动评审详情 
      { path: '/activeManager/managerCenter/releaseAnnouncement',name:"发布公告", components: releaseAnnouncement,meta: { title: '发布公告' ,keepAlive: false} }, // 发布公告 

      { path: '/excellentWork/index',name:"优秀作品展示", components: excellentWork,meta: { title: '优秀作品展示' ,keepAlive: false} }, // 优秀作品展示
      { path: '/excellentWork/excellentWorkDetail',name:"优秀作品展示详情", components: excellentWorkDetail,meta: { title: '优秀作品展示详情' ,keepAlive: false} }, // 优秀作品展示详情
      { path: '/expertReview',name:"专家评审", components: expertReview ,meta: { title: '专家评审' ,keepAlive: false}}, // 专家评审（评审作品）
      { path: '/expertReview/workDetail', name:"专家评审点击后详情",components: expertReviewDetail,meta: { title: '专家评审点击后详情',keepAlive: false } }, // 专家评审点击后详情
      { path: '/expertStore',name:"专家库", components: expertStore,meta: { title: '专家库',keepAlive: false } }, // 专家库
      { path: '/auditActivity',name:"审核中心", components: auditActivity,meta: { title: '审核中心' ,keepAlive: false} }, // 审核中心（审核活动）
      { path: '/auditActivity/auditDetail', name:"活动审核点击后详情",components: auditDetail,meta: { title: '活动审核点击后详情' ,keepAlive: false} }, // 活动审核点击后详情
      { path: '/msgcenter',name:"消息中心", components: messageCenter,meta: { title: '消息中心' ,keepAlive: false} }, // 消息中心

      { path: '/home', name: "首页", components: home,meta: { title: '首页' }},//首页
      { path: '/home/activityIntroduction',name:"活动介绍", components: activityIntroduction,meta: { title: '活动介绍' ,keepAlive: false}},//活动介绍
      { path: '/home/choiceActivity',name:"选择活动", components: choiceActivity,meta: { title: '选择活动' ,keepAlive: false}},//选择活动
      { path: '/home/seeInformation',name:"查看信息", components: seeInformation,meta: { title: '查看信息' ,keepAlive: false}},//查看信息
      { path: '/home/activityProject',name:"活动项目", components: activityProject,meta: { title: '活动项目' ,keepAlive: false}},//活动项目
      { path: '/home/activityEnroll',name:"活动报名", components: activityEnroll,meta: { title: '活动报名',keepAlive: true,keepAlive: false }},//活动报名
      { path: '/home/submitEnroll',name:"报名成功", components: submitEnroll,meta: { title: '报名成功' ,keepAlive: false}},//报名成功
      { path: '/home/activityDetail',name:"活动详情", components: activityDetail,meta: { title: '活动详情',keepAlive: false }},//活动详情
      { path: '/userCenter/userEdit',name:"个人中心编辑", components: userEdit,meta: { title: '个人中心编辑' ,keepAlive: false}},//个人中心编辑

      { path: '/workShow',name:"活动详情展示", components: workShow,meta: { title: '活动详情展示' ,keepAlive: false}},//活动详情展示


      { path: '/admin',name:"用户管理", components: admin,meta: { title: '用户管理' ,keepAlive: false}},//超级管理员
      { path: '/roleManage',name:"角色管理", components: roleManage,meta: { title: '角色管理' ,keepAlive: false}},//角色管理
      { path: '/expertManage',name:"专家管理", components: expertManage,meta: { title: '专家管理' ,keepAlive: false}},//专家管理
      { path: '/expertAssign',name:"专家分配", components: expertAssign,meta: { title: '专家分配' ,keepAlive: false}},//专家分配
      { path: '/prizeManagement',name:"奖项管理", components: prizeManagement,meta: { title: '奖项管理',keepAlive: false }},//奖品管理
      { path: '/classifyManage',name:"类型管理", components: classifyManage,meta: { title: '类型管理' ,keepAlive: false}},//类型管理
      { path: '/addRole',name:"添加角色", components: addRole,meta: { title: '添加角色' ,keepAlive: false}},//添加角色
      { path: '/addExpert',name:"添加专家", components: addExpert,meta: { title: '添加专家' ,keepAlive: false}},//添加专家
      { path: '/importExpert',name:"导入专家", components: importExpert,meta: { title: '导入专家' ,keepAlive: false}},//导入专家
      { path: '/addClassify',name:"添加分类", components: addClassify,meta: { title: '添加分类' ,keepAlive: false}},//添加分类
      { path: '/subClassify',name:"子分类", components: subClassify,meta: { title: '子分类' ,keepAlive: false}},//子分类

      { path: '/workReview',name:"专家评审", components: workReview,meta: { title: '专家评审' ,keepAlive: false}},//作品评审（专家模块）
      { path: '/workScore',name:"作品评分", components: workScore,meta: { title: '作品评分' ,keepAlive: false}},//作品评分（专家模块）
      { path: '/importWorkList',name:"导入作品评分列表", components: importWorkList,meta: { title: '导入作品评分列表' ,keepAlive: false}}//导入作品评分列表（专家模块）


    ]
  },
  { path: '*', redirect: '/' }
];

export default routes;
