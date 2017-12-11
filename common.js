/**
 * @Date:   2017-10-26T13:52:26+08:00
 * @Last modified time: 2017-11-13T16:10:31+08:00
 */



;
(function($) {
  var fixDiv=function($element){
    var _this=this;

  }
  /**
   * 选项卡的切换插件
   * @param {[type]} $data [description]
   */
  var Tab = function($data) {
    var _this = this;
    // this.tab=tab;
    //默认配置参数
    this.config = {
      'obj': null,
      // 	//用来定义鼠标的触发类型
      'triggreType': 'click',
      // 	//动画效果fade的时间
      'effect': 0,
      // 	//定义自动切换时间
      'auto': false,
      'callback': null
    }
    if (this.getConfig($data)) {
      $.extend(this.config, this.getConfig($data));
    };
    //保存tab标签列表、对应的选项内容
    this.tabItems = $(this.config.obj).find('.tab_control').find('span');
    this.tabContent = $(this.config.obj).find('.tab_contents').find('.tab_content');
    //保存配置
    var config = this.config;
    if (config.triggreType === 'click' || config.triggreType === 'mouseover') {
      this.tabItems.bind(config.triggreType, function() {
        var flag = _this.invoke($(this));
        if (config.callback && flag) {
          config.callback();
        }
      });
    } else {
      this.tabItems.bind('click', function() {
        var flag = _this.invoke($(this));
        if (config.callback && typeof config.callback === "function" && flag) {
          config.callback();
        }
      });
    };
    if (config.auto) {
      this.timer = null;
      this.loop = 0;
      this.autoPlay();
      $(this.config.obj).hover(function() {
        clearInterval(_this.timer);
      }, function() {
        _this.autoPlay();
      });
    }
  }
  Tab.prototype = {
    //获取配置参数
    getConfig: function($data) {
      //获取用户配置参数
      if (!$data || $data == '' || $data.obj == "") {
        return null;
      } else {
        return $data;
      }
    },
    //事件函数
    invoke: function(currentTab) {
      var index = currentTab.index();
      currentTab.addClass('active').siblings().removeClass('active');
      this.tabContent.eq(index).fadeIn(this.config.effect).siblings().fadeOut(this.config.effect);
      //loop index 同步
      if (this.config.auto) {
        this.loop = index;
      }
      return true;
    },
    //自动切换
    autoPlay: function() {
      var _this = this,
        tabItems = this.tabItems,
        tabLength = this.tabItems.length,
        config = this.config;
      this.timer = setInterval(function() {
        _this.loop++;
        if (_this.loop >= tabLength) {
          _this.loop = 0;
        };
        tabItems.eq(_this.loop).trigger(config.triggreType);
      }, config.auto);
    }
  };
  window.Tab = Tab;
  /**
   * 垂直无缝间隔轮播
   * @param {[type]} $data [description]
   */
  var Carou = function($data) {
    $data.time = null;
    var speed = $data.speed || 50; //速度，默认50毫秒
    var delay = $data.delay || 2000 //延迟，默认2000毫秒
    var carousel_box = $($data.id);
    var carousel_lis = $($data.id).find("ul");
    var carousel_lih = carousel_lis.find("li").height();
    var flag = true;
    carousel_lis.html(carousel_lis.html() + carousel_lis.html());

    function carousel() {
      if (!flag) {
        return false;
      }
      var top = carousel_box.scrollTop();
      if (top % carousel_lih == 0) {
        clearInterval($data.time);
        setTimeout(goCarousel, delay);
      } else {
        carousel_box.scrollTop(carousel_box.scrollTop() + 1);
        if (top >= carousel_lis.height() / 2) {
          carousel_box.scrollTop(0);
        }
      }
    }

    function goCarousel() {
      $data.time = setInterval(carousel, speed);
      carousel_box.scrollTop(carousel_box.scrollTop() + 1);
    }
    setTimeout(goCarousel, delay);
    carousel_box.mouseover(function() {
      flag = false;
    });
    carousel_box.mouseout(function() {
      flag = true;
    });
  };
  window.Carou = Carou;
  /**
   *申请服务表单提交
   *
   */
  var serviceForm = function($data) {
    var that = this;
    var uploadData = {}; /*新建一个对象，用于存储信息以及上传*/
    //默认配置参数
    this.config = {
      'mobile_verify': true,
      /*默认开启手机号码的验证*/
    }
    var data = $.extend(this.config, this.getConfig($data));
    if (data.hint && typeof data.hint == "function") {
      this.hint = data.hint;
    }; /*配置错误提示函数，默认为alert*/
    if (data.success && typeof data.success == "function") {
      this.success = data.success;
    }; /*配置成功提示函数，默认为alert*/
    if (data.complete && typeof data.complete == "function") {
      this.complete = data.complete;
    }; /*配置成功提示函数，默认为alert*/
    if (data.url) {
      var url = data.url;
    } else {
      console.log("开发人员忘记配置接口地址你敢信？");
      return false;
    }
    var form = $(data.obj); /*表单id*/
    uploadData.source=window.location.href;
    uploadData.modalSource=document.referrer;//作为引入页面弹窗时获取来源
    uploadData.name = form.find("input[name=" + data.name + "]").val(); /*姓名*/
    uploadData.mobile = form.find("input[name=" + data.mobile + "]").val(); /*手机号码*/
    if (data.area) {
      uploadData.area = form.find("input[name=" + data.area + "]").val(); /*面积*/
    };
    if (data.province) {
      uploadData.province = form.find("select[name=" + data.province + "]").find("option:selected").text(); /*省份*/
      uploadData.province_val = form.find("select[name=" + data.province + "]").find("option:selected").val();
    };
    if (data.city) {
      uploadData.city = form.find("select[name=" + data.city + "]").find("option:selected").text(); /*市区*/
      uploadData.city_val = form.find("select[name=" + data.city + "]").find("option:selected").val();
    };
    if (data.region) {
      uploadData.region = form.find("select[name=" + data.region + "]").find("option:selected").text(); /*区域*/
      uploadData.region_val = form.find("select[name=" + data.region + "]").find("option:selected").val();
    };
    if (data.type) {
      uploadData.type=form.find("input[name=" + data.type + "]").val(); /*装修类型*/
    };
    if (data.address) {
      uploadData.address = form.find("input[name=" + data.address + "]").val(); /*完整的地址*/
    };
    if (data.address_api) {
      uploadData.address_api = form.find("input[name=" + data.address_api + "]").val(); /*api获取的地址*/
    };
    /*获取信息完毕，开始验证信息*/
    console.log(data);
    console.log(uploadData);
    var patrn_name = /^\s*[\u4e00-\u9fa5]{1,15}\s*$/; /*中文名验证*/
    var patrn_mobile = /^1[34578]\d{9}$/; /*手机号验证*/
    if (data.name_verify && (!patrn_name.test(uploadData.name))) {
      that.hint("请输入您真实的姓名");
      return false;
    };
    if (!(patrn_mobile.test(uploadData.mobile))) {
      that.hint("请输入正确的手机号码！"); /*错误提示函数*/
      return false;
    };

    if (data.province_verify && (!uploadData.province_val)) {
      that.hint("请选择省份！"); /*错误提示函数*/
      return false;
    };
    if (data.city_verify && (!uploadData.city_val)) {
      that.hint("请选择城市！"); /*错误提示函数*/
      return false;
    }
    if (data.area_verify && !uploadData.area) {
      that.hint("请输入平方数！"); /*错误提示函数*/
      return false;
    }
    $.ajax({
      type: 'POST',
      data: uploadData,
      url: url,
      error: function() {
        that.hint("提交信息失败，请重新提交~");
      },
      success: function() {
        that.success("申请成功！");
      },
      complete: function() {
        window.uploadData = uploadData;
        that.complete();
      }
    });
    //        console.log(uploadData);/*测试插件提交的信息*/
  }
  serviceForm.prototype = {
    getConfig: function($data) {
      //获取用户配置参数
      if (!$data || $data == '' || !$data.obj || $data.obj == "" || typeof $data != "object") {
        console.log("参数未配置或配置不正确");
        return false;
      } else {
        return $data;
      }
    },
    hint: function(mes) {
      //提示函数
      alert(mes);
    },
    success: function(mes) {
      //成功的回调函数
      alert(mes);
    },
    complete:function() {
      console.log("无论成功与否都调用的函数");
    }
  }
  window.serviceForm = serviceForm;
  /**
  *固定滑动
  */
  var scFunc=function($config){
    var that=$(this);
    that.config={
      element:'',
      moreTop:20,
      animate:300
    }
    var configOk=$.extend(that.config, $config);
    var oldPosition=$(configOk.element).eq(0).css('position');
    console.log(oldPosition);
    var divTop=$(configOk.element).eq(0).offset().top;
    var divH=$(configOk.element).eq(0).height();
    var winH=$(window).height();
    var ignoreH=configOk.ignoreDiv?$(configOk.ignoreDiv).height()+$(configOk.ignoreDiv).offset().top:0;
    var timer='';
    $(window).scroll(function() {
      clearTimeout(timer);
      var scrollTop=$(document).scrollTop();
      console.log(scrollTop);
      timer=setTimeout(function(){
        if(scrollTop>=ignoreH){
          $(configOk.element).eq(0).css('position','relative');
          if(scrollTop>=divTop||scrollTop<that.config.moreTop){
            $(configOk.element).animate({
              top:scrollTop-divTop+configOk.moreTop
            }, configOk.animate)
          }
        }else {
          $(configOk.element).eq(0).css('position',oldPosition);
        }

      },500);

    });
  };
  window.scFunc=scFunc;
})(jQuery);
