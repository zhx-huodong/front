
// const base='/api';
const base='';

const captcha=`${base}/login/captcha`;//获取短信验证码
const account=`${base}/login/account`;//手机验证码登录
const role=`${base}/role`;//读取所有角色
const user=`${base}/user`;//用户
const award=`${base}/award`;//奖项
const school=`${base}/school`;//学校
const deleteUsers=`${base}/common/delete-users`;//批量删除用户
const disableUsers=`${base}/common/disable-users`;//批量禁用用户

const testLogin=`${base}/login/test`;//测试登录
const activity=`${base}/activity`;//添加活动
const activityDetail=`${base}/activity`;//活动获取
const activityCategory=`${base}/activity-category`;//读取活动项目详情
const enroll=`${base}/enroll`;//读取报名记录
const works=`${base}/works`;//读取报名记录
const assignment=`${base}/works-admin/assignment`;//读取报名记录

const scoring=`{base}/works-admin/scoring`;//给报名的作品评分

const uploadPic=`http://api.huodong.eduinspector.com/upload/image`;//图片上传
const uploadKey=`http://api.huodong.eduinspector.com/upload/cos-key`;//文件上传
const uploadFile=`http://api.huodong.eduinspector.com/upload/file`;//文件上传

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
    works,
    assignment,
    scoring
}