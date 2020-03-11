
const base='/api';

const captcha=`${base}/login/captcha`;//获取短信验证码
const account=`${base}/login/account`;//手机验证码登录
const role=`${base}/role`;//读取所有角色

const testLogin=`${base}/login/test`;//测试登录
const uploadPic=`${base}/upload/image`;//图片上传
const uploadKey=`${base}/upload/cos-key`;//图片上传
const uploadFile=`${base}/upload/file`;//文件上传
const activity=`${base}/activity`;//文件上传
// const testLogin=`${base}/test/login`; 

export default {
    captcha,
    account,
    role,
    testLogin,
    uploadPic,
    uploadKey,
    uploadFile,
    activity,
}