import request from '@/utils/axios';

// 获取验证码图片
export function getCodeImgApi() {
  return request.get({ url: '/captchaImage', notToken: true });
}

export interface LoginParams {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

// 登录
export function loginApi(data: LoginParams) {
  return request.post({
    url: '/login',
    data: data,
    notToken: true,
  });
}

// 获取用户详细信息
export function userInfoApi() {
  return request.get({
    url: '/getInfo',
  });
}
// 退出
export function logoutApi() {
  return request.post({
    url: '/logout',
  });
}
