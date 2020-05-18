/*
用途项目：自定义滚动条实现
*/
(function(win, doc, $){
  // 定义的滚动条的构造函数
  function CusScrollBar(options) {
    // 函数的调用
    this._init(options);
  }
  // 对象的合并
  $.extend(CusScrollBar.prototype, {
    _init: function(options){
      // 闭包
      var self = this;
      // 初始化参数
      self.options = {
        scrollDir: 'Y',       //滚动的方向
        contentSelector: '',  //滚动内容区选择器
        barSelector: '',      //滚动条选择器
        sliderSelector: '',   //滚动滑块选择器
        wheelStep: 100,        //滚动步长（鼠标移动一下，内容滚动的幅度）
      }
      // 覆盖参数
      $.extend(true, self.options, options||{});
      self._initDomEvent();
      return self;
    },

    /**
     * 初始化DOM引用
     * @method _initDomEvent
     * @return {CusScrollBar}
     */
     _initDomEvent: function() {
      var opts = this.options;
      // 滚动内容区对象，必填项
      this.$cont = $(opts.contentSelector);
      // 滚动条滑块对象，必须项
      this.$slider = $(opts.sliderSelector);
      // 滚动条对象
      this.$bar = opts.barSelector ? $(opts.barSelector) : self.$slider.parent();
      // 获取文档对象
      this.$doc = $(doc);
      // 获取初始化滑块拖动功能
      this._initSliderDragEvent();
      // 获取同步滑块的位置
      this._bindContentScroll();
      // 获取鼠标滚轮事件
      this._bindMousewheel();
      // 获取内容来定义滑块的高度
      this._initSliderHeight();

     },
     // 根据内容来定义滑块的高度
     _initSliderHeight: function() {
      var rate = this.$cont.height()/this.$cont[0].scrollHeight;
      var sliderHeight = rate*this.$bar.height();
      this.$slider.css('height',sliderHeight);
     },
     

     /**
      * 初始化滑块拖动功能
      * @return {[Object]} [this]
      */
    _initSliderDragEvent: function() {
      var self = this;
      // 滑块元素
      var slider = this.$slider,
          sliderEl = slider[0];
      // 如果元素存在
      if (sliderEl) {
        var doc = this.$doc,
            dragStartPagePostion,
            dragStartScrollPostion,
            dragContBarRate;
        function mousemoveHandler(e) {
          e.preventDefault();
          if (dragStartPagePostion == null) {
            return;
          }
          //内容开始卷曲的高度+rate*(鼠标释放的位置-开始的位置) == 就是内容滑动的位置
          self.scrollTo(dragStartScrollPostion + (e.pageY - dragStartPagePostion)*dragContBarRate);
        }
        slider.on('mousedown', function(e){
          e.preventDefault();
          // 获取鼠标的点击的开始位置
          dragStartPagePostion = e.pageY;
          // 获取内容区域的向上卷区的高度
          dragStartScrollPostion = self.$cont[0].scrollTop;
          dragContBarRate = self.getMaxScrollPosition()/self.getMaxSliderPosition();
          // 监听的document对象
          doc.on('mousemove.scroll', mousemoveHandler).on('mouseup.scroll',function(){
            doc.off('.scroll');
          });
        });
        return self;
      }
    },
    
    // 计算滑块的当前位置
    getSliderPosition: function() {
      var self = this,
      // 滑块可以移动的距离
          maxSliderPosition = self.getMaxSliderPosition();
          // 滑块移动的距离
      return Math.min(maxSliderPosition, maxSliderPosition*self.$cont[0].scrollTop/self.getMaxScrollPosition());
    },

    // 内容可滚动的高度
    getMaxScrollPosition: function() {
      var self = this;
      return Math.max(self.$cont.height(), self.$cont[0].scrollHeight) - self.$cont.height();
    
    },

    //滑块可移动的距离
    getMaxSliderPosition: function(){
      var self = this;
      return self.$bar.height() - self.$slider.height();
    },

    // 监听内容的滚动，同步滑块的位置
    _bindContentScroll: function() {
      var self = this;
      self.$cont.on('scroll', function(){
        var sliderEl = self.$slider && self.$slider[0];
        if (sliderEl) {
          // 设置滑块的位置
          sliderEl.style.top = self.getSliderPosition() + 'px';
        }
      });
      return self;
    },

    // 鼠标滚轮事件
    _bindMousewheel: function() {
      var self = this;
      // on监听事件，多个事件利用空格分开
      self.$cont.on('mousewheel DOMMouseScroll',function(e){
        e.preventDefault();
        // 判断原生事件对象的属性
        var oEv = e.originalEvent,
        //原生事件对象,（其他浏览器负数向下，firefox正数向下,所以在wheelDelta前面有负数）
        // 想要达到的效果，鼠标向下滚动，内容向下走
            wheelRange = oEv.wheelDelta ? -oEv.wheelDelta/120 : (oEv.detail || 0)/3;
            // 调用scrollTo方法。
            self.scrollTo(self.$cont[0].scrollTop + wheelRange*self.options.wheelStep)
      });
    },

    // 内容的滑动
    scrollTo: function(positonVal) {
      var self = this;
      self.$cont.scrollTop(positonVal);
    }
  });

  win.CusScrollBar = CusScrollBar;
})(window,document,jQuery)