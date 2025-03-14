import { defineStore } from 'pinia';
import { useAppStore } from './app';
import router from '@/router';
import type { UserInfo, CompanyInfo, Role } from './types/userTypes';
import { loginApi, type LoginParams, userInfoApi, logoutApi } from '@/api/login';
import { setToken, getToken, removeToken } from '@/utils/auth';
import { message } from 'ant-design-vue';
import { useSystemStore } from './system';

export const useUserStore = defineStore('user', () => {
  const systemStore = useSystemStore();
  const appStore = useAppStore();
  const userInfo = ref<UserInfo | Recordable>({});
  const token = ref<string>(getToken());

  function getUserInfo() {
    return new Promise((resolve, reject) => {
      if (getToken()) {
        userInfoApi()
          .then((res: Recordable) => {
            userInfo.value = res.user as UserInfo;
            if (res.user.avatar) {
              setUserAvatar(res.user.avatar);
            } else {
              userInfo.value.avatar = new URL(
                '@/assets/img/mo-ren-tou-xiang.png',
                import.meta.url,
              ).href;
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo.value));
            const redirect = router.currentRoute.value.query.redirect as string;
            if (redirect) {
              router.replace(decodeURIComponent(redirect));
            } else {
              router.replace('/');
            }
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        localStorage.removeItem('userInfo');
        reject();
      }
    });
  }

  function setUserAvatar(url: string) {
    userInfo.value.avatar =
      (import.meta.env.MODE === 'development' ? 'https://test.jwtax.cn' : location.origin) +
      '/manager' +
      url;
  }

  function clearUserInfo() {
    userInfo.value = {};
    localStorage.removeItem('userInfo');
  }

  function setTokenFun(res: Recordable) {
    message.success('欢迎回到票检检！');
    setToken(res.token);
    token.value = getToken();
  }

  function clearToken() {
    removeToken();
    token.value = '';
  }

  function login(data: LoginParams) {
    return new Promise((resolve, reject) => {
      loginApi(data)
        .then((res) => {
          setTokenFun(res);
          getUserInfo();
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  function logout(autoOut?: boolean) {
    return new Promise((resolve, reject) => {
      logoutApi()
        .then((res) => {
          clearUserInfo();
          clearToken();
          appStore.clearCaches();
          !autoOut && localStorage.removeItem('accountInfo');
          const query: Recordable = {};
          const path = router.currentRoute.value.path;
          if (path !== '/login') {
            router.replace({
              path: '/login',
              query: { redirect: router.currentRoute.value.fullPath },
            });
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function hasRoles(role: string) {
    const index = userInfo.value?.roles?.findIndex((f: Role) => f.roleKey === role);
    if (index !== -1) return true;
    else return false;
  }

  return {
    userInfo,
    token,
    getUserInfo,
    setUserAvatar,
    login,
    logout,
    hasRoles,
  };
});
