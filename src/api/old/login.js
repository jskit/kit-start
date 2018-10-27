import request from '@/api/request';

export function loginByUsername({ username, password }) {
  const data = {
    username,
    password,
  };
  return request({
    url: '/admin/login',
    method: 'post',
    data,
  });
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post',
  });
}

export function getUserInfo({ token }) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token },
  });
}
