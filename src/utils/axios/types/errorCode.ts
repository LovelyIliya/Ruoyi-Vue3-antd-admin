export const errorCode: { [key: string]: string } = {
  '401': '登录状态过期，请重新登录',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  default: '系统未知错误，请反馈给管理员',
};
