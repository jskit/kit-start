/**
 * geto.js
 */
// import device from './device';
// import { stringify } from '@/utils/base';
import { loadJs } from './dLoad';
// import axios from 'axios';

// import fetch from 'kit-qs';
import {
  // BAIDU_MAP_AK,
  // GD_MAP_AK,
  GD_MAP_KEY,
} from '@/config';

// let geoTime = null;

class Geo {
  // 定位事件队列
  constructor() {
    //...
    // 判断环境 微信／h5/app
    // 根据环境初始化 配置
    // 配置完成后 根据环境可调用相应的定位方法
    //
    // 微信
    // if (device.wechat) {
    //   // 微信环境下
    //   if (wechat.config()) {

    //   }
    // }
    this.locaTime = null; // 计时器
    // this.option = {}; // ..
    // this.initConfig = false; // 配置是否初始化完成
    this.initConfigState = 0; // 0 未初始化，1初始化中，2初始化失败
    // this.locationState = {
    //   code: 0, // 0 未定位 1 定位中，2 定位成功， 3 定位失败
    //   text: '未定位',
    //   time: 0,
    // };

    this.loactionType = 1; // 1高德定位 2 h5 3 微信
    //暂定在 引入时初始化 可选是否要在调用定位时初始化
    // 考虑是否可根据环境 区分初始化方式
    // this._initGeo();
  }
  // 初始化定位
  async _initGeo() {
    switch (this.loactionType) {
      case 1: // 高德
        return await this.geoInitGd();
      // break;
      case 2: // h5
        this.initConfigState = 1;
        return { initConfig: true };
      // break;
      case 3: // 微信
        // ...
        break;
      default:
      // do nothing...
    }
  }
  geoInitGd() {
    // ..
    const gdMapUrl = `https://webapi.amap.com/maps?v=1.4.10&key=${GD_MAP_KEY}`;
    const _this = this;
    return new Promise(function(resolve, reject) {
      if (_this.initConfigState === 1) {
        resolve({
          initConfig: true,
        });
        return;
      }
      loadJs(gdMapUrl, {
        async: true,
        onload() {
          _this.initConfigState = 1; // 改变初始化状态
          console.log('amap init success!');
          resolve({
            initConfig: true,
          });
        },
        onerror(error) {
          console.log(error);
          _this.initConfigState = 2; // 改变初始化状态
          // 如果 使用 reject 向外部抛错时，
          // 外部调用时 必须要用 catch 处理一下错误信息 因为我们外部向要个 对象
          resolve({
            initConfig: false,
            error,
          });
        },
      });
    });
  }

  // async getGeo(key) {
  async getGeo() {
    // Object.assign(this.option, option);
    // console.log(this.option);
    // console.log('geo getGeo', this.option);
    // 初始化定位
    // this._initGeo();
    //...
    // this.polling();
    // if (!this.locationState.code) {

    // }
    // this.locationState.code = 1;
    // this.locationState.text = '定位中...';
    // 初始化定位
    console.log('初始化定位 start:');
    const { initConfig, error } = await this._initGeo();
    console.log('初始化定位 end:', initConfig, error);
    if (initConfig) {
      // 获取地址经纬度
      console.log('获取地址信息 start:');
      const { geoInfo, error: err } = await this.getCoordinate();
      console.log('获取地址信息 end:', geoInfo, err);
      if (geoInfo) {
        // const location = {
        //   longitude: position.position.getLng(),
        //   latitude: position.position.getLat(),
        // };
        // // 解析地理信息
        // console.log('解析地理信息 start');
        // const { geoInfo, error: err } = await this.getAddressCode(location);
        // console.log('解析地理信息 end:', geoInfo, err);
        return { geoInfo, error: err };
      } else {
        return { error: err };
      }
    } else {
      return { error };
    }
  }

  // 获取坐标
  async getCoordinate() {
    switch (this.loactionType) {
      case 1: // 高德
        // Promise reject状态 错误参数会被 catch接收
        return await this.geoByGd().catch(error => {
          console.log(error);
          return {
            error,
          };
        });
      // break;
      case 2: // h5
        return await this.geoByH5();
      // break;
      case 3: // 微信
        // ...
        break;
      default:
      // do nothing...
    }
  }
  geoByH5() {
    if (navigator.geolocation) {
      // ...
      const options = { timeout: 30000 };
      console.log('geo.js [h5] getlocation loading...:');
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          console.log('geo.js [h5] getlocation success:', position);
        },
        function error(err) {
          console.log('geo.js [h5] getlocation fail:', err);
          let tip = '';
          if (err.code === 1) {
            tip = 'Error: 定位权限被拒绝！'; // Access is denied
          } else if (err.code === 2) {
            tip = 'Error: 定位无效！'; // Position is unavailable!
          } else if (err.code === 3) {
            tip = 'Error: 定位超时！'; // Timeout expired
          }
          console.warn(tip);
        },
        options
      );
    }
  }
  // 高德定位
  geoByGd() {
    return new Promise(function(resolve, reject) {
      let geolocation;
      // setTimeout(() => {
      // 加载地图，调用浏览器定位服务
      const { AMap } = window;
      if (!AMap) {
        reject({
          error: 'AMap 未初始化',
        });
      }
      // const map = new AMap.Map('container', {
      //   resizeEnable: true,
      // });
      AMap.plugin(['AMap.Geolocation'], function location() {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: 'RB',
        });
        // map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', function success(data) {
          console.log(data);
          // 新版本可以直接通过api 逆解析地址 本地调用会报 不在同一个域 暂未找到其它问题
          // var geocoder = new AMap.Geocoder({
          //   radius: 1000,
          //   extensions: 'all',
          // });
          // const location1 = [data.position.getLng(), data.position.getLat()];
          // geocoder.getAddress(location1, function(status, result) {
          //   console.log(status, result);
          //   if (status === 'complete' && result.info === 'OK') {
          //     console.log(result);
          //   }
          // });
          const { addressComponent, position } = data;

          const pos = {
            type: 'amap',
            adcode: addressComponent.adcode,
            citycode: Number(addressComponent.citycode),
            name: addressComponent.province.replace('市', ''),
            lng: position.lng,
            lat: position.lat,
            address:
              addressComponent.district +
              addressComponent.street +
              addressComponent.streetNumber,
          };

          resolve({
            geoInfo: pos,
          });
        }); // 返回定位信息
        AMap.event.addListener(geolocation, 'error', function error(err) {
          // err
          const { status } = err;
          let tempErr = {
            type: 'amap',
            code: status,
            message: '获取城市信息失败',
          };
          if (status === 0) {
            // tempErr.code = status;
            tempErr.message = '地理位置许可被拒绝';
          }
          console.log(err);
          // 这里使用了reject 因此在外部调用时候需要 添加 catch 调用，处理错误信息
          // 因为我们向要返回 对象
          // 故  reject
          reject({
            error: tempErr,
          });
        }); // 返回定位出错信息
      });
    });
    // }, 300);
  }
  // getAddressCode(location) {
  //   console.log(location);
  //   const newOptions = {
  //     key: GD_MAP_AK,
  //     location: location.longitude + ',' + location.latitude,
  //   };

  //   let query = stringify(newOptions);
  //   if (query) query = `?${query}`;
  //   // ..
  //   // console.log('正在通过坐标解析城市信息');
  //   return axios
  //     .get(`https://restapi.amap.com/v3/geocode/regeo${query}`)
  //     .then(checkStatus)
  //     .then(res => {
  //       console.log(res);
  //       const { infocode, regeocode = {} } = res.data;
  //       if (infocode === '10000') {
  //         const result = regeocode.addressComponent;
  //         if (!result) {
  //           return {
  //             error: {
  //               way: 'geo_h5',
  //               message: '获取城市信息失败',
  //             },
  //           };
  //         }
  //         const {
  //           citycode, // 城市code
  //           province, // 省
  //           district, // 区
  //           streetNumber: {
  //             street, // 路
  //             number, // 号
  //           },
  //         } = result;
  //         const pos = {
  //           type: 'amap',
  //           citycode: Number(citycode),
  //           name: province.replace('市', ''),
  //           lng: location.longitude,
  //           lat: location.latitude,
  //           address: district + street + number,
  //         };
  //         // console.log(pos);
  //         return { geoInfo: pos };
  //       }
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //       return { error };
  //     });
  // }
}
// function checkStatus(res = {}) {
//   // console.log('check');
//   const { status } = res;
//   if (status >= 200 && status < 300) {
//     return res;
//   }
// }
export default new Geo();
