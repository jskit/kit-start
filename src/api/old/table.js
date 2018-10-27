import request from '@/api/request';

export function getTableList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params,
  });
}
export function getAccountList(params) {
  return request({
    url: '/user/account',
    method: 'get',
    params,
  });
}
export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params,
  });
}
