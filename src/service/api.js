
const base='/api';

const captcha=`${base}/login/captcha`;//获取短信验证码
const account=`${base}/login/account`;//手机验证码登录
const role=`${base}/role`;//读取所有角色
const user=`${base}/user`;//用户
const award=`${base}/award`;//奖项
const school=`${base}/school`;//学校

const testLogin=`${base}/login/test`;//测试登录
const uploadPic=`${base}/upload/image`;//图片上传
const uploadKey=`${base}/upload/cos-key`;//图片上传
// const testLogin=`${base}/test/login`; 

export default {
    captcha,
    account,
    role,
    user,
    award,
    school,
    testLogin,
    uploadPic,
    uploadKey,
}