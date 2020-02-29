
const base='/api';

const captcha=`${base}/login/captcha`;//获取短信验证码
const account=`${base}/login/account`;//手机验证码登录

export default {
    captcha,
    account,
}