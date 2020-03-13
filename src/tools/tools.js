import axios from 'axios';
import store from '../store';
// let redirectUrl = location.protocol + '//' + location.host;
// const isLocal = location.hostname === '127.0.0.1' || location.hostname === 'localhost';

export function getCookie(name) {
  let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
  if (arr != null) {
    return unescape(arr[2]);
  }
  return null;
}

export function setCookie(name, value, expires, path, domain) {
  if (!expires) { // 默认1天有效期
    expires = 24 * 60 * 60;
  }
  let exp = new Date();
  exp.setTime(exp.getTime() + expires * 1000);
  let cookieName = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/';
  if (domain) {
    cookieName += ';domain=' + domain;
  }
  document.cookie = cookieName;
}

export function copyText(val) {
  let text = document.createElement('textarea');
  text.textContent = val;
  document.body.appendChild(text);
  text.select();
  document.execCommand('Copy');
  text.style.display = 'none';
}

export function timeFormat(time, format) {
  if (!(time instanceof Date)) time = new Date(time);
  let o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    'S': time.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return format;
}

// Date对象转标准年月日'20190601';
export function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('');
}

export function getQuery(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// 添加className
export function addClass(dom, className) {
  let newClassName = dom.className.split(' ');
  newClassName.push(className);
  dom.className = newClassName.join(' ');
}

// 移除className
export function removeClass(dom, className) {
  let newClassName = dom.className.split(' ').filter(name => {
    return name != className;
  });
  dom.className = newClassName.join(' ');
}

function axiosGetParam(param) {
  let url = param.id===undefined? param.url : `${param.url}/${param.id}`;
  let options = param;
  delete options.id;
  delete options.url;
  let headers = {};
  if (getCookie('x-api-key')) headers['x-api-key'] = getCookie('x-api-key');
  return {
    url: url,
    param: options,
    headers: headers
  };
}


export function axiosGet(param, isExpire = true, headers_) {
  let options = axiosGetParam(param);
  let headers = Object.assign(options.headers, headers_);
  store.dispatch('INIT_SHOW', false);
  return new Promise((resolve, reject) => {
    axios.get(options.url, {
      params: options.param,
      headers: headers
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      let resp = err.response;
      if (resp &&
        (resp.statusText == 'Unauthorized' || resp.data.ErrorCode == 'UserNotLogin' ||
          resp.data.ErrorCode == 'User.SessionError') && isExpire) {
        expire();
        reject(resp.data || err);
      } else {
        reject(resp.data || err);
      }
    });
  });
}

function axiosPostParam(param) {
  let url = param.url;
  let headers = {
    'Content-type': 'application/json'
  };
  if (getCookie('x-api-key')) headers['x-api-key'] = getCookie('x-api-key');
  delete param.url;
  return {
    url: url,
    param: param,
    headers: headers
  };
}

export function axiosPost(param, isExpire = true, headers_) {
  let options = axiosPostParam(param);
  let headers = Object.assign(options.headers, headers_);
  delete options.headers;
  store.dispatch('INIT_SHOW', false);
  return new Promise((resolve, reject) => {
    axios.post(options.url, options.param, {
      headers: headers
    }).then(res => {
      let data = res.data;
      resolve(data);
    }).catch(err => {
      let resp = err.response;
      if (resp &&
        (resp.statusText == 'Unauthorized' || resp.data.ErrorCode == 'UserNotLogin' ||
          resp.data.ErrorCode == 'User.SessionError') && isExpire) {
        expire();
        reject(resp.data || err);
      } else {
        reject(resp.data || err);
      }
    });
  });
}

export function axiosPostPIC(param, isExpire = true, ) {
  let options = axiosPostParam(param);
  let headers = {
    'x-api-key':JSON.parse(localStorage.getItem("user")).token,
  }
  store.dispatch('INIT_SHOW', false);
  return new Promise((resolve, reject) => {
    axios.post(options.url, options.param, {
      headers: headers
    }).then(res => {
      let data = res.data;
      resolve(data);
    }).catch(err => {
      let resp = err.response;
      if (resp &&
        (resp.statusText == 'Unauthorized' || resp.data.ErrorCode == 'UserNotLogin' ||
          resp.data.ErrorCode == 'User.SessionError') && isExpire) {
        expire();
        reject(resp.data || err);
      } else {
        reject(resp.data || err);
      }
    });
  });
}

function axiosDeleteParam(param) {
  let url = param.url;
  let headers = {
    'Content-type': 'application/json'
  };
  if (getCookie('x-api-key')) headers['x-api-key'] = getCookie('x-api-key');
  delete param.url;
  return {
    url: url,
    param: param,
    headers: headers
  };
}

export function axiosDelete(param, isExpire = true, headers_) {
  let options = axiosDeleteParam(param);
  let headers = Object.assign(options.headers, headers_);
  store.dispatch('INIT_SHOW', false);
  return new Promise((resolve, reject) => {
    axios.delete(options.url, {
      params: options.param,
      headers: headers
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      let resp = err.response;
      if (resp &&
        (resp.statusText == 'Unauthorized' || resp.data.ErrorCode == 'UserNotLogin' ||
          resp.data.ErrorCode == 'User.SessionError') && isExpire) {
        expire();
        reject(resp.data || err);
      } else {
        reject(resp.data || err);
      }
    });
  });
}

function axiosPutParam(param) {
  let url = param.id===undefined? param.url : `${param.url}/${param.id}`;
  let headers = {
    'Content-type': 'application/json'
  };
  if (getCookie('x-api-key')) headers['x-api-key'] = getCookie('x-api-key');
  delete param.url;
  delete param.id
  return {
    url: url,
    param: param,
    headers: headers
  };
}

export function axiosPut(param, isExpire = true, headers_) {
  let options = axiosPutParam(param);
  let headers = Object.assign(options.headers, headers_);
  store.dispatch('INIT_SHOW', false);
  return new Promise((resolve, reject) => {
    axios.put(options.url, 
    options.param,
    {headers: headers}).then(res => {
      resolve(res.data);
    }).catch(err => {
      let resp = err.response;
      if (resp &&
        (resp.statusText == 'Unauthorized' || resp.data.ErrorCode == 'UserNotLogin' ||
          resp.data.ErrorCode == 'User.SessionError') && isExpire) {
        expire();
        reject(resp.data || err);
      } else {
        reject(resp.data || err);
      }
    });
  });
}

function expire() {
  if (window.app) {
    store.dispatch('INIT_SHOW', true);
  }
  // setTimeout(() => {
  //   setCookie('Authorization', '');
  //   let host = isLocal ? 'https://upclass.educloud.tencent.com' : (location.protocol + '//' + location.host);
  //   location.href = `${host}/edulogin/?redirectUrl=${redirectUrl}&from=activity`;
  // }, 1500);
}

export function downloadFromUrl(url, name) {
  axios.get(url, {
    responseType: 'blob'
  }).then(res => {
    let blobData = res.data;
    const a = document.createElement('a');
    if (!name) name = url.split('/').pop();
    a.download = name;
    a.href = URL.createObjectURL(blobData);
    a.dispatchEvent(new MouseEvent('click'));
    URL.revokeObjectURL(a.href); // 释放URL对象
  });
}

// yyyyMMdd -> yyyy-MM-dd
export function dateFormate(str) {
  if (!str) return '';
  let year = str.substring(0, 4),
    month = str.substring(4, 6),
    date = str.substring(6, 8);
  return year + '-' + month + '-' + date;
}


//获取当前时间戳 yyyy-dd-mm===>>>>1581552000十位
export function getTimestamp(){
 
  let date = new Date();
  let y= date .getFullYear();
  let D= date .getMonth();
   D = D < 10 ? '0' + D : D;
   let M= date .getDate(); 
   let data2=new Date(y+"-"+D+"-"+M);
   console.log(data2)
   let TIME = new Date(data2);
   let time3 = Number(Date.parse(TIME).toString().substring(0,10)) ;
  return time3;
}


// 交换数组元素位置
export function swapItems(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}

// 时间戳 -> yyyy-MM-dd
export function timestampToTime(timestamp, opts) {
  let date = new Date(timestamp * 1000);
  let Y = date.getFullYear();
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	let D = date.getDate();
	let result = `${Y}-${M}-${D}`;
	if (opts) {
		if (opts.dateZero) { // 天的日期是否需要补零
			D = D < 10 ? '0' + D : D;
			result = `${Y}-${M}-${D}`;
		}
		if (opts.needUnit) { // 是否需要单位
			Y = Y + '年';
			M = M + '月';
			D = D + '日';
			result = `${Y}${M}${D}`;
		}
	}
  return result;
}

// 配置axios
export function setAxiosConf(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  }
}

// 获取cos上传的唯一key
export function getCosKey(file) {
  let fileName = file.name.slice(0, file.name.indexOf('.'));
  let fileSuffix = file.name.slice(file.name.indexOf('.') + 1);
  return `activity_platform/${fileName}_${Date.now()}.${fileSuffix}`;
}

// 格式化时间（秒）
export function formatTime(totalSecond) {
  let hour = 0, minutes = 0, second = 0;
  hour = parseInt(totalSecond / 3600, 10); // 小时
  totalSecond -= hour * 3600;
  minutes = parseInt(totalSecond / 60, 10); // 分组
  totalSecond -= minutes * 60;
  second = totalSecond;
  if (hour != 0 && hour < 10) hour = '0' + hour;
  if (minutes == 0) minutes = '00';
  else if (minutes < 10) minutes = '0' + minutes;
  if (second == 0) second = '00';
  else if (second < 10) second = '0' + second;
  return hour ? (hour + ':') : '' + minutes + ':' + second;
}
