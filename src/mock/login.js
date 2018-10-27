import { param2Obj } from '@/utils';

// const localLogin = {
//   admin: {
//     roles: ['admin'],
//     token: 'admin',
//     introduction: '我是超级管理员',
//     id: '1',
//     name: 'Super Admin',
//     avatar:
//       'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//   },
//   editor: {
//     roles: ['editor'],
//     token: 'editor',
//     introduction: '我是编辑',
//     id: '2',
//     name: 'Normal Editor',
//     avatar:
//       'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//   },
// };
const apiLogin = {
  data: {
    role: [
      {
        code: 'test',
        description: '测试账户组所有权限',
        id: '8a80869d66768aab0166768ceccf0083',
        name: 'test',
        permIds: [
          '8a80869d66768aab0166768ce52c0000',
          '8a80869d66768aab0166768ce56d0001',
          '8a80869d66768aab0166768ce6cc0020',
          '8a80869d66768aab0166768ce70a0024',
          '8a80869d66768aab0166768cead30061',
          '8a80869d66768aab0166768cebe00071',
          '8a80869d66768aab0166768ce5780002',
          '8a80869d66768aab0166768ce5c20009',
          '8a80869d66768aab0166768ce5fe000e',
          '8a80869d66768aab0166768ce6400014',
          '8a80869d66768aab0166768ce67d0019',
          '8a80869d66768aab0166768ce58a0004',
          '8a80869d66768aab0166768ce58a0003',
          '8a80869d66768aab0166768ce58c0008',
          '8a80869d66768aab0166768ce58b0007',
          '8a80869d66768aab0166768ce58b0006',
          '8a80869d66768aab0166768ce58b0005',
          '8a80869d66768aab0166768ce5d2000d',
          '8a80869d66768aab0166768ce5d1000c',
          '8a80869d66768aab0166768ce5d1000b',
          '8a80869d66768aab0166768ce5d0000a',
          '8a80869d66768aab0166768ce60d000f',
          '8a80869d66768aab0166768ce60e0013',
          '8a80869d66768aab0166768ce60e0012',
          '8a80869d66768aab0166768ce60e0011',
          '8a80869d66768aab0166768ce60e0010',
          '8a80869d66768aab0166768ce6550015',
          '8a80869d66768aab0166768ce6560018',
          '8a80869d66768aab0166768ce6560017',
          '8a80869d66768aab0166768ce6550016',
          '8a80869d66768aab0166768ce68a001b',
          '8a80869d66768aab0166768ce68b001c',
          '8a80869d66768aab0166768ce68c001d',
          '8a80869d66768aab0166768ce68d001e',
          '8a80869d66768aab0166768ce68e001f',
          '8a80869d66768aab0166768ce68a001a',
          '8a80869d66768aab0166768ce6e00021',
          '8a80869d66768aab0166768ce6ee0022',
          '8a80869d66768aab0166768ce6ef0023',
          '8a80869d66768aab0166768ce71d0025',
          '8a80869d66768aab0166768ce74e002a',
          '8a80869d66768aab0166768ce7290028',
          '8a80869d66768aab0166768ce7290029',
          '8a80869d66768aab0166768ce7290026',
          '8a80869d66768aab0166768ce7290027',
          '8a80869d66768aab0166768ce75d002b',
          '8a80869d66768aab0166768ce75e002e',
          '8a80869d66768aab0166768ce75d002d',
          '8a80869d66768aab0166768ce75d002c',
          '8a80869d66768aab0166768ceae20062',
          '8a80869d66768aab0166768ceb490067',
          '8a80869d66768aab0166768ceb9a006c',
          '8a80869d66768aab0166768ceaf90063',
          '8a80869d66768aab0166768ceaf90064',
          '8a80869d66768aab0166768ceaf90065',
          '8a80869d66768aab0166768ceafa0066',
          '8a80869d66768aab0166768ceb6a0068',
          '8a80869d66768aab0166768ceb6a0069',
          '8a80869d66768aab0166768ceb6b006a',
          '8a80869d66768aab0166768ceb6b006b',
          '8a80869d66768aab0166768cebb10070',
          '8a80869d66768aab0166768cebb1006f',
          '8a80869d66768aab0166768cebb0006d',
          '8a80869d66768aab0166768cebb0006e',
          '8a80869d66768aab0166768cebed0072',
          '8a80869d66768aab0166768cec280077',
          '8a80869d66768aab0166768cec6d007c',
          '8a80869d66768aab0166768cecae0081',
          '8a80869d66768aab0166768cecbf0082',
          '8a80869d66768aab0166768cebfd0076',
          '8a80869d66768aab0166768cebfd0075',
          '8a80869d66768aab0166768cebfd0074',
          '8a80869d66768aab0166768cebfc0073',
          '8a80869d66768aab0166768cec3a0078',
          '8a80869d66768aab0166768cec3a0079',
          '8a80869d66768aab0166768cec3b007a',
          '8a80869d66768aab0166768cec3b007b',
          '8a80869d66768aab0166768cec7e007d',
          '8a80869d66768aab0166768cec7e007e',
          '8a80869d66768aab0166768cec7e007f',
          '8a80869d66768aab0166768cec7f0080',
        ],
        type: '',
      },
    ],
    lastVisit: 1539757036130,
    id: '8a80869d66768aab0166768cf26600d5',
    email: 'test@admin.com',
    loginCount: 13,
    token: '5fa30fcfda99837723352693984f4ed09a741a6c',
  },
  errmsg: 'success',
  errno: 0,
  logid: 99,
  timestamp: 1540022369,
};

// const userMap = {};

export default {
  login: config => {
    // const { username } = JSON.parse(config.body);
    return apiLogin;
  },
  getUserInfo: config => {
    console.log(config);
    const { token } = param2Obj(config.url);
    if (token) {
      return apiLogin;
    } else {
      return false;
    }
  },
  logout: () => {
    return {
      data: {},
      errmsg: 'success',
      errno: 0,
      logid: 99,
      timestamp: 1539757407445,
    };
  },
};
