;
(function($, window, document, undefined) {
	var Plugin = function(elem, options) {
		this.$wrapper = elem;
		this.$tab_list = this.$wrapper.find('.mt-tabpage-title').find('.mt-tabpage-item');
		this.$tabCont_wrap = this.$wrapper.find('.mt-tabpage-cont__wrap');
		this.$tab_cont = this.$tabCont_wrap.find('.mt-tabpage-item');
		this.timer = null;
		this.playTimer = null
		this.iNow = 0;
		this.defaults = {
			curDisplay: 1,
			mouse: 'click',
			changeMethod: 'default',
			autoPlay: false
		};
		this.opts = $.extend({}, this.defaults, options);
	};
	Plugin.prototype = {
		inital: function() {
			var self = this;
			this.setData();
			this.tabInital();
			if(this.opts.mouse === 'click') {
				this.$tab_list.click(function() {
					self.changeTab($(this).index());
					self.iNow = $(this).index();
				});
			} else if(this.opts.mouse === 'over') {
				this.$tab_list.hover(function() {
					var cur_obj = this;
					clearTimeout(self.timer);
					self.timer = setTimeout(function() {
						self.changeTab($(cur_obj).index());
					}, 30);
					self.iNow = $(this).index();
				}, function() {
					clearTimeout(self.timer);
				});
			} else {
				this.$tab_list.click(function() {
					self.changeTab($(this).index());
					self.iNow = $(this).index();
				});
			}
			if(this.opts.autoPlay) {
				clearInterval(this.playTimer);
				this.playTimer = setInterval(function() {
					self.autoPlay();
				}, 1000);
				this.$wrapper.hover(function() {
					clearInterval(self.playTimer);
				}, function() {
					self.playTimer = setInterval(function() {
						self.autoPlay();
					}, 1000);
				});
			}
		},
		setData: function() {
			var tabCont_w = this.$tab_cont.width();
			var tabCont_h = this.$tab_cont.height();
			var tabCont_len = this.$tab_cont.length;
			switch(this.opts.changeMethod) {
				case 'default':
					this.$tab_cont.css({
						display: 'none'
					});
					break;
				case 'horizontal':
					this.$tabCont_wrap.css({
						width: tabCont_w * tabCont_len
					});
					this.$tab_cont.css({
						float: 'left'
					});
					break;
				case 'vertical':
					this.$tabCont_wrap.css({
						height: tabCont_h * tabCont_len
					});
					break;
				case 'opacity':
					this.$tab_cont.css({
						display: 'none'
					});
					break;
				default:
					this.$tab_cont.css({
						display: 'none'
					});
					break;
			}
		},
		tabInital: function() {
			var curNum = this.opts.curDisplay - 1;
			this.$tab_list.removeClass('mt-tabpage-item-cur');
			this.$tab_list.eq(curNum).addClass('mt-tabpage-item-cur');
			if(this.opts.changeMethod === 'default' || this.opts.changeMethod === 'opacity') {
				this.$tab_cont.eq(curNum).css({
					display: 'block'
				});
			} else if(this.opts.changeMethod === 'horizontal') {
				this.$tabCont_wrap.css({
					left: -curNum * this.$tab_cont.width()
				});
			} else if(this.opts.changeMethod === 'vertical') {
				this.$tabCont_wrap.css({
					top: -curNum * this.$tab_cont.height()
				});
			} else {
				this.$tab_cont.eq(curNum).css({
					display: 'block'
				});
			}
			this.iNow = this.opts.curDisplay - 1;
		},
		changeTab: function(index) {
			this.$tab_list.removeClass('mt-tabpage-item-cur');
			this.$tab_list.eq(index).addClass('mt-tabpage-item-cur');
			switch(this.opts.changeMethod) {
				case 'default':
					this.$tab_cont.css({
						display: 'none'
					});
					this.$tab_cont.eq(index).css({
						display: 'block'
					});
					break;
				case 'horizontal':
					this.$tabCont_wrap.stop().animate({
						left: this.$tab_cont.width() * -index
					});
					break;
				case 'vertical':
					this.$tabCont_wrap.stop().animate({
						top: this.$tab_cont.height() * -index
					});
					break;
				case 'opacity':
					this.$tab_cont.stop().fadeOut();
					this.$tab_cont.eq(index).stop().fadeIn()
					break;
				default:
					this.$tab_cont.css({
						display: 'none'
					});
					this.$tab_cont.eq(index).css({
						display: 'block'
					});
					break;
			}
		},
		autoPlay: function() {
			if(this.iNow === this.$tab_list.length - 1) {
				this.iNow = 0;
			} else {
				this.iNow++;
			}
			this.changeTab(this.iNow);
		},
		constructor: Plugin
	};
	$.fn.tab = function(options) {
		var plugin = new Plugin(this, options);
		return plugin.inital();
	};
})(window.jQuery, window, document);