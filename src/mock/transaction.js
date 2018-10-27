import Mock from 'mockjs';

const List = [];
const TableList = [];
const AccountList = [];
const UserList = [];
const count = 20;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      order_no: '@guid()',
      timestamp: +Mock.Random.date('T'),
      username: '@name()',
      price: '@float(1000, 15000, 0, 2)',
      'status|1': ['success', 'pending'],
    })
  );
}

for (let i = 0; i < count; i++) {
  TableList.push(
    Mock.mock({
      order_no: '@guid()',
      title: '@title()',
      author: '@name()',
      'pageviews|0-100': 100,
      'status|1': ['success', 'pending'],
      display_time: '@date()',
    })
  );
}
for (let i = 0; i < count; i++) {
  AccountList.push(
    Mock.mock({
      // id: '@guid()',
      name: '@cname()',
      account: '@id()',
      'sex|0-2': 0,
      'rule|1': ['admin', 'manager', 'general', 'anonymous'],
      note: '',
    })
  );
}

for (let i = 0; i < count; i++) {
  UserList.push(
    Mock.mock({
      // id: '@guid()',
      name: '@cname()',
      'company|1': ['一公司', '二公司', '五公司'],
      'depart|1': ['经营部', '技术部'],
      'place|1': ['部员'],
      'title|1': ['初级工程师', '中级工程师', '高级工程师'],
      'education|1': ['高中', '大专', '本科', '硕士'],
      'phone|1': ['13423423423', '13817131714', '15927687580', '13312368516'],
    })
  );
}

export default {
  getList: () => {
    return {
      total: List.length,
      items: List,
    };
  },
  getTableList: () => {
    return {
      total: TableList.length,
      items: TableList,
    };
  },
  getAccountList: () => {
    return {
      total: AccountList.length,
      items: AccountList,
    };
  },
  getUserList: () => {
    return {
      total: UserList.length,
      items: UserList,
    };
  },
};
