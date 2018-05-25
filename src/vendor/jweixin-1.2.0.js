'use strict';
!function(left, projectionFunc) {
  if ("function" == typeof define && (define.amd || define.cmd)) {
    define(function() {
      return projectionFunc(left);
    });
  } else {
    projectionFunc(left, true);
  }
}(this, function(req, zoomAware) {
  /**
   * @param {string} name
   * @param {!Object} data
   * @param {!Object} obj
   * @return {undefined}
   */
  function callback(name, data, obj) {
    if (req.WeixinJSBridge) {
      WeixinJSBridge.invoke(name, send(data), function(uninstalledPackages) {
        cb(name, uninstalledPackages, obj);
      });
    } else {
      add(name, obj);
    }
  }
  /**
   * @param {string} n
   * @param {string} type
   * @param {!Object} options
   * @return {undefined}
   */
  function init(n, type, options) {
    if (req.WeixinJSBridge) {
      WeixinJSBridge.on(n, function(e) {
        if (options && options.trigger) {
          options.trigger(e);
        }
        cb(n, e, type);
      });
    } else {
      if (options) {
        add(n, options);
      } else {
        add(n, type);
      }
    }
  }
  /**
   * @param {!Object} data
   * @return {?}
   */
  function send(data) {
    return data = data || {}, data.appId = options.appId, data.verifyAppId = options.appId, data.verifySignType = "sha1", data.verifyTimestamp = options.timestamp + "", data.verifyNonceStr = options.nonceStr, data.verifySignature = options.signature, data;
  }
  /**
   * @param {!Object} data
   * @return {?}
   */
  function save(data) {
    return {
      timeStamp : data.timestamp + "",
      nonceStr : data.nonceStr,
      package : data.package,
      paySign : data.paySign,
      signType : data.signType || "SHA1"
    };
  }
  /**
   * @param {!Object} address
   * @return {?}
   */
  function parseAddress(address) {
    return address.postalCode = address.addressPostalCode, delete address.addressPostalCode, address.provinceName = address.proviceFirstStageName, delete address.proviceFirstStageName, address.cityName = address.addressCitySecondStageName, delete address.addressCitySecondStageName, address.countryName = address.addressCountiesThirdStageName, delete address.addressCountiesThirdStageName, address.detailInfo = address.addressDetailInfo, delete address.addressDetailInfo, address;
  }
  /**
   * @param {string} e
   * @param {!Object} data
   * @param {!Object} item
   * @return {undefined}
   */
  function cb(e, data, item) {
    if ("openEnterpriseChat" == e) {
      data.errCode = data.err_code;
    }
    delete data.err_code;
    delete data.err_desc;
    delete data.err_detail;
    var msg = data.errMsg;
    if (!msg) {
      msg = data.err_msg;
      delete data.err_msg;
      msg = format(e, msg);
      data.errMsg = msg;
    }
    if ((item = item || {})._complete) {
      item._complete(data);
      delete item._complete;
    }
    msg = data.errMsg || "";
    if (options.debug && !item.isInnerInvoke) {
      alert(JSON.stringify(data));
    }
    var partStart = msg.indexOf(":");
    switch(msg.substring(partStart + 1)) {
      case "ok":
        if (item.success) {
          item.success(data);
        }
        break;
      case "cancel":
        if (item.cancel) {
          item.cancel(data);
        }
        break;
      default:
        if (item.fail) {
          item.fail(data);
        }
    }
    if (item.complete) {
      item.complete(data);
    }
  }
  /**
   * @param {string} o
   * @param {string} data
   * @return {?}
   */
  function format(o, data) {
    /** @type {string} */
    var s = o;
    var h = a[s];
    if (h) {
      s = h;
    }
    /** @type {string} */
    var result = "ok";
    if (data) {
      var hcolonIndex = data.indexOf(":");
      if ("confirm" == (result = data.substring(hcolonIndex + 1))) {
        /** @type {string} */
        result = "ok";
      }
      if ("failed" == result) {
        /** @type {string} */
        result = "fail";
      }
      if (-1 != result.indexOf("failed_")) {
        result = result.substring(7);
      }
      if (-1 != result.indexOf("fail_")) {
        result = result.substring(5);
      }
      if (!("access denied" != (result = (result = result.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != result)) {
        /** @type {string} */
        result = "permission denied";
      }
      if ("config" == s && "function not exist" == result) {
        /** @type {string} */
        result = "ok";
      }
      if ("" == result) {
        /** @type {string} */
        result = "fail";
      }
    }
    return data = s + ":" + result;
  }
  /**
   * @param {!NodeList} value
   * @return {?}
   */
  function done(value) {
    if (value) {
      /** @type {number} */
      var i = 0;
      var valueLength = value.length;
      for (; i < valueLength; ++i) {
        var prop = value[i];
        var length = wx[prop];
        if (length) {
          value[i] = length;
        }
      }
      return value;
    }
  }
  /**
   * @param {string} c
   * @param {string} type
   * @return {undefined}
   */
  function add(c, type) {
    if (!(!options.debug || type && type.isInnerInvoke)) {
      var t = a[c];
      if (t) {
        c = t;
      }
      if (type && type._complete) {
        delete type._complete;
      }
      console.log('"' + c + '",', type || "");
    }
  }
  /**
   * @param {?} matchesLookup
   * @return {undefined}
   */
  function render(matchesLookup) {
    if (!(breadcrumbRootName || host || options.debug || VERSION < "6.0.2" || data.systemType < 0)) {
      /** @type {!Image} */
      var img = new Image;
      data.appId = options.appId;
      /** @type {number} */
      data.initTime = cl.initEndTime - cl.initStartTime;
      /** @type {number} */
      data.preVerifyTime = cl.preVerifyEndTime - cl.preVerifyStartTime;
      service.getNetworkType({
        isInnerInvoke : true,
        success : function(e) {
          data.networkType = e.networkType;
          /** @type {string} */
          var normalSrc = "https://open.weixin.qq.com/sdk/report?v=" + data.version + "&o=" + data.isPreVerifyOk + "&s=" + data.systemType + "&c=" + data.clientVersion + "&a=" + data.appId + "&n=" + data.networkType + "&i=" + data.initTime + "&p=" + data.preVerifyTime + "&u=" + data.url;
          /** @type {string} */
          img.src = normalSrc;
        }
      });
    }
  }
  /**
   * @return {?}
   */
  function extend() {
    return (new Date).getTime();
  }
  /**
   * @param {!Function} callback
   * @return {undefined}
   */
  function pageWideFocusListener(callback) {
    if (target) {
      if (req.WeixinJSBridge) {
        callback();
      } else {
        if (doc.addEventListener) {
          doc.addEventListener("WeixinJSBridgeReady", callback, false);
        }
      }
    }
  }
  /**
   * @return {undefined}
   */
  function map() {
    if (!service.invoke) {
      /**
       * @param {string} fn
       * @param {!Object} data
       * @param {!Function} callback
       * @return {undefined}
       */
      service.invoke = function(fn, data, callback) {
        if (req.WeixinJSBridge) {
          WeixinJSBridge.invoke(fn, send(data), callback);
        }
      };
      /**
       * @param {string} eventType
       * @param {!Function} callback
       * @return {undefined}
       */
      service.on = function(eventType, callback) {
        if (req.WeixinJSBridge) {
          WeixinJSBridge.on(eventType, callback);
        }
      };
    }
  }
  if (!req.jWeixin) {
    var wx = {
      config : "preVerifyJSAPI",
      onMenuShareTimeline : "menu:share:timeline",
      onMenuShareAppMessage : "menu:share:appmessage",
      onMenuShareQQ : "menu:share:qq",
      onMenuShareWeibo : "menu:share:weiboApp",
      onMenuShareQZone : "menu:share:QZone",
      previewImage : "imagePreview",
      getLocation : "geoLocation",
      openProductSpecificView : "openProductViewWithPid",
      addCard : "batchAddCard",
      openCard : "batchViewCard",
      chooseWXPay : "getBrandWCPayRequest",
      openEnterpriseRedPacket : "getRecevieBizHongBaoRequest",
      startSearchBeacons : "startMonitoringBeacons",
      stopSearchBeacons : "stopMonitoringBeacons",
      onSearchBeacons : "onBeaconsInRange",
      consumeAndShareCard : "consumedShareCard",
      openAddress : "editAddress"
    };
    var a = function() {
      var new_obj = {};
      var prop;
      for (prop in wx) {
        /** @type {string} */
        new_obj[wx[prop]] = prop;
      }
      return new_obj;
    }();
    var doc = req.document;
    var title = doc.title;
    /** @type {string} */
    var ua = navigator.userAgent.toLowerCase();
    /** @type {string} */
    var exports = navigator.platform.toLowerCase();
    /** @type {boolean} */
    var breadcrumbRootName = !(!exports.match("mac") && !exports.match("win"));
    /** @type {boolean} */
    var host = -1 != ua.indexOf("wxdebugger");
    /** @type {boolean} */
    var target = -1 != ua.indexOf("micromessenger");
    /** @type {boolean} */
    var y = -1 != ua.indexOf("android");
    /** @type {boolean} */
    var x = -1 != ua.indexOf("iphone") || -1 != ua.indexOf("ipad");
    var VERSION = function() {
      /** @type {(Array<string>|null)} */
      var e = ua.match(/micromessenger\/(\d+\.\d+\.\d+)/) || ua.match(/micromessenger\/(\d+\.\d+)/);
      return e ? e[1] : "";
    }();
    var cl = {
      initStartTime : extend(),
      initEndTime : 0,
      preVerifyStartTime : 0,
      preVerifyEndTime : 0
    };
    var data = {
      version : 1,
      appId : "",
      initTime : 0,
      preVerifyTime : 0,
      networkType : "",
      isPreVerifyOk : 1,
      systemType : x ? 1 : y ? 2 : -1,
      clientVersion : VERSION,
      url : encodeURIComponent(location.href)
    };
    var options = {};
    var self = {
      _completes : []
    };
    var node = {
      state : 0,
      data : {}
    };
    pageWideFocusListener(function() {
      cl.initEndTime = extend();
    });
    /** @type {boolean} */
    var B = false;
    /** @type {!Array} */
    var _sizeAnimateTimeStamps = [];
    var service = {
      config : function(port) {
        /** @type {string} */
        options = port;
        add("config", port);
        /** @type {boolean} */
        var n = false !== options.check;
        pageWideFocusListener(function() {
          if (n) {
            callback(wx.config, {
              verifyJsApiList : done(options.jsApiList)
            }, function() {
              /**
               * @param {!Object} data
               * @return {undefined}
               */
              self._complete = function(data) {
                cl.preVerifyEndTime = extend();
                /** @type {number} */
                node.state = 1;
                /** @type {!Object} */
                node.data = data;
              };
              /**
               * @param {!Object} bufDesc
               * @return {undefined}
               */
              self.success = function(bufDesc) {
                /** @type {number} */
                data.isPreVerifyOk = 0;
              };
              /**
               * @param {!Object} message
               * @return {undefined}
               */
              self.fail = function(message) {
                if (self._fail) {
                  self._fail(message);
                } else {
                  /** @type {number} */
                  node.state = -1;
                }
              };
              /** @type {!Array} */
              var parameters = self._completes;
              return parameters.push(function() {
                render();
              }), self.complete = function(overwrite) {
                /** @type {number} */
                var i = 0;
                /** @type {number} */
                var k = parameters.length;
                for (; i < k; ++i) {
                  parameters[i]();
                }
                /** @type {!Array} */
                self._completes = [];
              }, self;
            }());
            cl.preVerifyStartTime = extend();
          } else {
            /** @type {number} */
            node.state = 1;
            /** @type {!Array} */
            var buffer = self._completes;
            /** @type {number} */
            var p = 0;
            /** @type {number} */
            var pos = buffer.length;
            for (; p < pos; ++p) {
              buffer[p]();
            }
            /** @type {!Array} */
            self._completes = [];
          }
        });
        if (options.beta) {
          map();
        }
      },
      ready : function(fn) {
        if (0 != node.state) {
          fn();
        } else {
          self._completes.push(fn);
          if (!target && options.debug) {
            fn();
          }
        }
      },
      error : function(func) {
        if (!(VERSION < "6.0.2")) {
          if (-1 == node.state) {
            func(node.data);
          } else {
            /** @type {!Function} */
            self._fail = func;
          }
        }
      },
      checkJsApi : function(status) {
        /**
         * @param {!Object} e
         * @return {?}
         */
        var emit = function(e) {
          var val = e.checkResult;
          var s;
          for (s in val) {
            var i = a[s];
            if (i) {
              val[i] = val[s];
              delete val[s];
            }
          }
          return e;
        };
        callback("checkJsApi", {
          jsApiList : done(status.jsApiList)
        }, (status._complete = function(e) {
          if (y) {
            var json = e.checkResult;
            if (json) {
              /** @type {*} */
              e.checkResult = JSON.parse(json);
            }
          }
          e = emit(e);
        }, status));
      },
      onMenuShareTimeline : function(options) {
        init(wx.onMenuShareTimeline, {
          complete : function() {
            callback("shareTimeline", {
              title : options.title || title,
              desc : options.title || title,
              img_url : options.imgUrl || "",
              link : options.link || location.href,
              type : options.type || "link",
              data_url : options.dataUrl || ""
            }, options);
          }
        }, options);
      },
      onMenuShareAppMessage : function(options) {
        init(wx.onMenuShareAppMessage, {
          complete : function(req) {
            if ("favorite" === req.scene) {
              callback("sendAppMessage", {
                title : options.title || title,
                desc : options.desc || "",
                link : options.link || location.href,
                img_url : options.imgUrl || "",
                type : options.type || "link",
                data_url : options.dataUrl || ""
              });
            } else {
              callback("sendAppMessage", {
                title : options.title || title,
                desc : options.desc || "",
                link : options.link || location.href,
                img_url : options.imgUrl || "",
                type : options.type || "link",
                data_url : options.dataUrl || ""
              }, options);
            }
          }
        }, options);
      },
      onMenuShareQQ : function(options) {
        init(wx.onMenuShareQQ, {
          complete : function() {
            callback("shareQQ", {
              title : options.title || title,
              desc : options.desc || "",
              img_url : options.imgUrl || "",
              link : options.link || location.href
            }, options);
          }
        }, options);
      },
      onMenuShareWeibo : function(options) {
        init(wx.onMenuShareWeibo, {
          complete : function() {
            callback("shareWeiboApp", {
              title : options.title || title,
              desc : options.desc || "",
              img_url : options.imgUrl || "",
              link : options.link || location.href
            }, options);
          }
        }, options);
      },
      onMenuShareQZone : function(options) {
        init(wx.onMenuShareQZone, {
          complete : function() {
            callback("shareQZone", {
              title : options.title || title,
              desc : options.desc || "",
              img_url : options.imgUrl || "",
              link : options.link || location.href
            }, options);
          }
        }, options);
      },
      startRecord : function(data) {
        callback("startRecord", {}, data);
      },
      stopRecord : function(source) {
        callback("stopRecord", {}, source);
      },
      onVoiceRecordEnd : function(block) {
        init("onVoiceRecordEnd", block);
      },
      playVoice : function(data) {
        callback("playVoice", {
          localId : data.localId
        }, data);
      },
      pauseVoice : function(val) {
        callback("pauseVoice", {
          localId : val.localId
        }, val);
      },
      stopVoice : function(val) {
        callback("stopVoice", {
          localId : val.localId
        }, val);
      },
      onVoicePlayEnd : function(block) {
        init("onVoicePlayEnd", block);
      },
      uploadVoice : function(val) {
        callback("uploadVoice", {
          localId : val.localId,
          isShowProgressTips : 0 == val.isShowProgressTips ? 0 : 1
        }, val);
      },
      downloadVoice : function(server) {
        callback("downloadVoice", {
          serverId : server.serverId,
          isShowProgressTips : 0 == server.isShowProgressTips ? 0 : 1
        }, server);
      },
      translateVoice : function(val) {
        callback("translateVoice", {
          localId : val.localId,
          isShowProgressTips : 0 == val.isShowProgressTips ? 0 : 1
        }, val);
      },
      chooseImage : function(param) {
        callback("chooseImage", {
          scene : "1|2",
          count : param.count || 9,
          sizeType : param.sizeType || ["original", "compressed"],
          sourceType : param.sourceType || ["album", "camera"]
        }, (param._complete = function(uri) {
          if (y) {
            var path = uri.localIds;
            if (path) {
              /** @type {*} */
              uri.localIds = JSON.parse(path);
            }
          }
        }, param));
      },
      getLocation : function(data) {
      },
      previewImage : function(data) {
        callback(wx.previewImage, {
          current : data.current,
          urls : data.urls
        }, data);
      },
      uploadImage : function(data) {
        callback("uploadImage", {
          localId : data.localId,
          isShowProgressTips : 0 == data.isShowProgressTips ? 0 : 1
        }, data);
      },
      downloadImage : function(server) {
        callback("downloadImage", {
          serverId : server.serverId,
          isShowProgressTips : 0 == server.isShowProgressTips ? 0 : 1
        }, server);
      },
      getLocalImgData : function(val) {
        if (false === B) {
          /** @type {boolean} */
          B = true;
          callback("getLocalImgData", {
            localId : val.localId
          }, (val._complete = function(data) {
            if (B = false, _sizeAnimateTimeStamps.length > 0) {
              var error = _sizeAnimateTimeStamps.shift();
              wx.getLocalImgData(error);
            }
          }, val));
        } else {
          _sizeAnimateTimeStamps.push(val);
        }
      },
      getNetworkType : function(data) {
        /**
         * @param {!Object} data
         * @return {?}
         */
        var init = function(data) {
          var line = data.errMsg;
          /** @type {string} */
          data.errMsg = "getNetworkType:ok";
          var type = data.subtype;
          if (delete data.subtype, type) {
            data.networkType = type;
          } else {
            var secondSpacePos = line.indexOf(":");
            var UNKNOWN = line.substring(secondSpacePos + 1);
            switch(UNKNOWN) {
              case "wifi":
              case "edge":
              case "wwan":
                data.networkType = UNKNOWN;
                break;
              default:
                /** @type {string} */
                data.errMsg = "getNetworkType:fail";
            }
          }
          return data;
        };
        callback("getNetworkType", {}, (data._complete = function(obj) {
          obj = init(obj);
        }, data));
      },
      openLocation : function(data) {
        callback("openLocation", {
          latitude : data.latitude,
          longitude : data.longitude,
          name : data.name || "",
          address : data.address || "",
          scale : data.scale || 28,
          infoUrl : data.infoUrl || ""
        }, data);
      },
      getLocation : function(val) {
        val = val || {};
        callback(wx.getLocation, {
          type : val.type || "wgs84"
        }, (val._complete = function(data) {
          delete data.type;
        }, val));
      },
      hideOptionMenu : function(gmInstance) {
        callback("hideOptionMenu", {}, gmInstance);
      },
      showOptionMenu : function(gmInstance) {
        callback("showOptionMenu", {}, gmInstance);
      },
      closeWindow : function(state) {
        callback("closeWindow", {}, state = state || {});
      },
      hideMenuItems : function(self) {
        callback("hideMenuItems", {
          menuList : self.menuList
        }, self);
      },
      showMenuItems : function(self) {
        callback("showMenuItems", {
          menuList : self.menuList
        }, self);
      },
      hideAllNonBaseMenuItem : function(gmInstance) {
        callback("hideAllNonBaseMenuItem", {}, gmInstance);
      },
      showAllNonBaseMenuItem : function(gmInstance) {
        callback("showAllNonBaseMenuItem", {}, gmInstance);
      },
      scanQRCode : function(status) {
        callback("scanQRCode", {
          needResult : (status = status || {}).needResult || 0,
          scanType : status.scanType || ["qrCode", "barCode"]
        }, (status._complete = function(data) {
          if (x) {
            var body = data.resultStr;
            if (body) {
              /** @type {*} */
              var events = JSON.parse(body);
              /** @type {*} */
              data.resultStr = events && events.scan_code && events.scan_code.scan_result;
            }
          }
        }, status));
      },
      openAddress : function(status) {
        callback(wx.openAddress, {}, (status._complete = function(addr) {
          addr = parseAddress(addr);
        }, status));
      },
      openProductSpecificView : function(data) {
        callback(wx.openProductSpecificView, {
          pid : data.productId,
          view_type : data.viewType || 0,
          ext_info : data.extInfo
        }, data);
      },
      addCard : function(status) {
        var state = status.cardList;
        /** @type {!Array} */
        var transactionIDList = [];
        /** @type {number} */
        var j = 0;
        var count = state.length;
        for (; j < count; ++j) {
          var card = state[j];
          var data = {
            card_id : card.cardId,
            card_ext : card.cardExt
          };
          transactionIDList.push(data);
        }
        callback(wx.addCard, {
          card_list : transactionIDList
        }, (status._complete = function(options) {
          var data = options.card_list;
          if (data) {
            /** @type {number} */
            var i = 0;
            var patchLen = (data = JSON.parse(data)).length;
            for (; i < patchLen; ++i) {
              var card = data[i];
              card.cardId = card.card_id;
              card.cardExt = card.card_ext;
              /** @type {boolean} */
              card.isSuccess = !!card.is_succ;
              delete card.card_id;
              delete card.card_ext;
              delete card.is_succ;
            }
            /** @type {*} */
            options.cardList = data;
            delete options.card_list;
          }
        }, status));
      },
      chooseCard : function(data) {
        callback("chooseCard", {
          app_id : options.appId,
          location_id : data.shopId || "",
          sign_type : data.signType || "SHA1",
          card_id : data.cardId || "",
          card_type : data.cardType || "",
          card_sign : data.cardSign,
          time_stamp : data.timestamp + "",
          nonce_str : data.nonceStr
        }, (data._complete = function(line) {
          line.cardList = line.choose_card_info;
          delete line.choose_card_info;
        }, data));
      },
      openCard : function(res) {
        var a = res.cardList;
        /** @type {!Array} */
        var transactionIDList = [];
        /** @type {number} */
        var i = 0;
        var az = a.length;
        for (; i < az; ++i) {
          var card = a[i];
          var data = {
            card_id : card.cardId,
            code : card.code
          };
          transactionIDList.push(data);
        }
        callback(wx.openCard, {
          card_list : transactionIDList
        }, res);
      },
      consumeAndShareCard : function(data) {
        callback(wx.consumeAndShareCard, {
          consumedCardId : data.cardId,
          consumedCode : data.code
        }, data);
      },
      chooseWXPay : function(contents) {
        callback(wx.chooseWXPay, save(contents), contents);
      },
      openEnterpriseRedPacket : function(contents) {
        callback(wx.openEnterpriseRedPacket, save(contents), contents);
      },
      startSearchBeacons : function(d) {
        callback(wx.startSearchBeacons, {
          ticket : d.ticket
        }, d);
      },
      stopSearchBeacons : function(gmInstance) {
        callback(wx.stopSearchBeacons, {}, gmInstance);
      },
      onSearchBeacons : function(block) {
        init(wx.onSearchBeacons, block);
      },
      openEnterpriseChat : function(data) {
        callback("openEnterpriseChat", {
          useridlist : data.userIds,
          chatname : data.groupName
        }, data);
      }
    };
    /** @type {number} */
    var _i = 1;
    var b = {};
    return doc.addEventListener("error", function(event) {
      if (!y) {
        var e = event.target;
        var action = e.tagName;
        var id = e.src;
        if (("IMG" == action || "VIDEO" == action || "AUDIO" == action || "SOURCE" == action) && -1 != id.indexOf("wxlocalresource://")) {
          event.preventDefault();
          event.stopPropagation();
          var i = e["wx-id"];
          if (i || (i = _i++, e["wx-id"] = i), b[i]) {
            return;
          }
          /** @type {boolean} */
          b[i] = true;
          wx.ready(function() {
            wx.getLocalImgData({
              localId : id,
              success : function(message) {
                e.src = message.localData;
              }
            });
          });
        }
      }
    }, true), doc.addEventListener("load", function(mutationEvent) {
      if (!y) {
        var node = mutationEvent.target;
        var nodeName = node.tagName;
        node.src;
        if ("IMG" == nodeName || "VIDEO" == nodeName || "AUDIO" == nodeName || "SOURCE" == nodeName) {
          var prop = node["wx-id"];
          if (prop) {
            /** @type {boolean} */
            b[prop] = false;
          }
        }
      }
    }, true), zoomAware && (req.wx = req.jWeixin = service), service;
  }
});
