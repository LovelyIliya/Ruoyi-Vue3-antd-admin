// 修改用户个人信息
import request from '@/utils/axios';
import { ContentTypeEnum } from '@/enums/axiosEnum';

export interface EditUserInfo {
  nickName: string;
  phonenumber: string;
  email: string;
  sex: string;
  userId: number;
}
export function updateUserProfileApi(data: EditUserInfo) {
  return request.put({
    url: '/system/user/profile',
    data: data,
  });
}

// 用户密码重置
export function updateUserPwdApi(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword,
    newPassword,
  };
  return request.put({
    url: '/system/user/profile/updatePwd',
    params: data,
  });
}

// 用户头像上传
export function uploadAvatarApi(data: FormData) {
  return request.post({
    url: '/system/user/profile/avatar',
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA,
    },
    data: data,
  });
}
