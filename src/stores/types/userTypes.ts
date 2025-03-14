export interface UserInfo {
  avatar: string;
  createTime: string;
  deptId: number;
  deptName: string;
  email: string;
  nickName: string;
  phonenumber: string;
  sex: string;
  userId: number;
  userName: string;
  roles: Role[];
}

export interface Role {
  roleId: number;
  roleName: string;
  roleKey: string;
}

export interface CompanyInfo {
  provinceCode: string | undefined;
  company: string | undefined;
  nsrsbh: string;
  loginAccount: string;
  psd: string;
  qygm: string;
  fwjg: string;
  hymc: string;
  isChange?: string;
  [key: string]: unknown;
}
