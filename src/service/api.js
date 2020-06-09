
let base=''
if (location.hostname==='localhost') {
    base='/api';
}else{
    base='';
}

const captcha=`${base}/login/captcha`;//获取短信验证码
const account=`${base}/login/account`;//手机验证码登录
const role=`${base}/role`;//读取所有角色
const user=`${base}/user`;//用户
const award=`${base}/award`;//奖项
const school=`${base}/school`;//学校
const deleteUsers=`${base}/user-admin/batch-delete`;//批量删除用户
const disableUsers=`${base}/user-admin/batch-disable`;//批量禁用用户

const testLogin=`${base}/login/test`;//测试登录
const activity=`${base}/activity`;//添加活动
const activityDetail=`${base}/activity`;//活动获取
const activityCategory=`${base}/activity-category`;//读取活动项目详情
const enroll=`${base}/enroll`;//读取报名记录
const works=`${base}/works`;//读取报名记录
const assignment=`${base}/works-admin/assignment`;//读取报名记录
const activityNotice=`${base}/activity-notice`;//添加活动公告
const scoring=`${base}/works-admin/scoring`;//给报名的作品评分
const reject=`${base}/works-admin/reject`;//退回作品
const recommend=`${base}/works-admin/recommend`;//设置报名作品的状态(推荐)
const awards=`${base}/works-admin/awards`;//颁奖
const like=`${base}/works-admin/like`;//点赞
const switchToken=`${base}/user-admin/switch-token`;//切换角色
const getCosKeys=`${base}/upload/get-cos-keys`;//获取腾讯云cos签名 
const remindCount=`${base}/user-admin/remind-count`;//用户提醒记录数 

let uploadPic=``;//图片上传
let uploadKey=``;//文件上传
let uploadFile=``;//文件上传
if (location.hostname==='localhost'||location.hostname==='huodong.eduinspector.com') {
    uploadPic=`https://api.huodong.eduinspector.com/upload/image`;//图片上传
    uploadKey=`https://api.huodong.eduinspector.com/upload/cos-key`;//文件上传
    uploadFile=`https://api.huodong.eduinspector.com/upload/file`;//文件上传
}else{
    uploadPic=`https://cxyy.szdj.edu.cn/api/upload/image`;//图片上传
    uploadKey=`https://cxyy.szdj.edu.cn/api/upload/cos-key`;//文件上传
    uploadFile=`https://cxyy.szdj.edu.cn/api/upload/file`;//文件上传
}

let api={
    captcha,
    account,
    role,
    user,
    award,
    school,
    deleteUsers,
    disableUsers,
    testLogin,
    uploadPic,
    uploadKey,
    uploadFile,
    activity,
    activityDetail,
    activityCategory,
    enroll,
    works,
    assignment,
    activityNotice,
    scoring,
    reject,
    recommend,
    awards,
    getCosKeys,
    like,
    switchToken,
    remindCount
}
export default api