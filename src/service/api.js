
const base='/api';
// const base='';

const captcha=`${base}/login/captcha`;//获取短信验证码
const account=`${base}/login/account`;//手机验证码登录
const role=`${base}/role`;//读取所有角色
const user=`${base}/user`;//用户
const award=`${base}/award`;//奖项
const school=`${base}/school`;//学校
const deleteUsers=`${base}/common/delete-users`;//批量删除用户
const disableUsers=`${base}/common/disable-users`;//批量禁用用户

const testLogin=`${base}/login/test`;//测试登录
const uploadPic=`${base}/upload/image`;//图片上传
const uploadKey=`${base}/upload/cos-key`;//图片上传
const uploadFile=`${base}/upload/file`;//文件上传
const activity=`${base}/activity`;//文件发布
const activityDetail=`${base}/activity`;//活动获取
const activityCategory=`${base}/activity-category`;//读取活动项目详情
const enroll=`${base}/enroll`;//读取报名记录
const works=`${base}/works`;//读取报名记录

// {{uri}}/activity?expand=detail,region,node,attachment,banner
// const testLogin=`${base}/test/login`; 

export default {
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
    works
}