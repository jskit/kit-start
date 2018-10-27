import bridge from './index';
import device from '@/utils/device';
import store from '@/store';
console.warn('bridgeready.js');
// 微信
if (device.wechat) {
  bridge.ready(wx => {
    bridge.isReady = true;
    console.warn('wechat ready setShare!');
    if (device.android) {
      bridge.setShare();
    }
    // bridge.setShare();
  });
}
// app
if (device.msf) {
  bridge.ready(() => {
    bridge.isReady = true;
    console.log('bridge 初始化完成！');
    // 缓存native 页面变量
    bridge.getNativePath({
      success(res) {
        console.log('获取getNativePath:', res);
        const pages = {};
        if (res.data.pathList) {
          for (let item of res.data.pathList) {
            pages[item] = { isTab: false };
          }
        }
        if (res.data.tabList) {
          for (let tab of res.data.tabList) {
            pages[tab] = { isTab: true };
          }
        }
        bridge._pages = pages;
      },
    });
    //
    bridge.getAppConfig({
      success(res) {
        const { data } = res;
        console.log('获取appCinfog 修改store:', res);
        store.dispatch('setAppConfig', data);
      },
      fail(err) {
        //...
      },
    });

    bridge.getUserInfo({
      success(res) {
        console.log('获取getUserInfo 修改store:', res);
        // app端已将res.data中的userId改为id
        store.commit('SET_USERINFO', res.data);
      },
      fail(err) {},
      complete(ret) {},
    });

    // 初始化 默认信息
    bridge.getLocationInfo({
      success(res) {
        console.log('获取getLocationInfo 修改store:', res);
        const { data = {} } = res;
        // console.log(data);
        const { area } = data;
        const selectCity = {
          id: data.id,
          lat: data.lat,
          lng: data.lng,
          name: data.name,
          address: data.address,
          // amap_city_id: data.cityId,
        };
        // console.log(selectCity);
        let selectAddress = {};
        if (data.area) {
          selectAddress = {
            id: area.zoneId,
            lat: area.lat,
            lng: area.lng,
            name: area.name,
            address: area.address,
            // amap_city_id: area.cityId,
          };
        }
        store.dispatch('setSelectCity', selectCity);
        store.dispatch('setSelectAddress', selectAddress);
        // console.log(selectAddress);
        ///
      },
      fail(err) {
        console.log(err);
      },
      complete(data) {
        console.log(data);
      },
    });
    // 监听退出登录 状态
    bridge.onLoginStatusChanged({
      success(res) {
        // 修改用户状态
        console.log('app 监听退出登录:', res);
        if (JSON.stringify(res.data) !== '{}') {
          console.log('app 登录 修改store:');
          store.commit('SET_USERINFO', res.data);
        } else {
          console.log('app 退出登录 修改store:');
          store.commit('SET_USERINFO', {});
        }
      },
    });
    //
  });
}
