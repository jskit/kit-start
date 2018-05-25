'use strict'

// AccessKey/SecretKey
const config = require('./qn.private').hsq || {}

const curASKey = {}

// example
const qnConfig = {
  // cdn资源合一
  cdn: {
    prefix: '',  // 'zt/'
    ak: curASKey.ak,
    sk: curASKey.sk,
    bucket: 'xxx-xxx', // your bucket name
    domain: 'https://img.xxx.com/',  // //xxxx.xxx.xx.glb.clouddn.com
    path: '', // 路径: [hash] 或 zt/lie
  },
}

module.exports = config
