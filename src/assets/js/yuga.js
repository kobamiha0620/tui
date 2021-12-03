/*
 * yuga.js 0.7.2 - 優雅なWeb制作のためのJS
 *
 * Copyright (c) 2009 Kyosuke Nakamura (kyosuke.jp)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Since:     2006-10-30
 * Modified:  2012-02-04
 *
 * jQuery 1.3.1
 * ThickBox 3.1
 */

/*
 * [使用方法] XHTMLのhead要素内で次のように読み込みます。
 
<link rel="stylesheet" href="css/thickbox.css" type="text/css" media="screen" />
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/thickbox.js"></script>
<script type="text/javascript" src="js/yuga.js" charset="utf-8"></script>

 */

(function($) {

	$(function() {
		$.yuga.selflink();
	});

	//---------------------------------------------------------------------

	$.yuga = {
		// URIを解析したオブジェクトを返すfunction
		Uri: function(path){
			var self = this;
			this.originalPath = path;
			//絶対パスを取得
			this.absolutePath = (function(){
				var e = document.createElement('a');
				e.href = path;
				return e.href;
			})();
			//絶対パスを分解
			var fields = {'schema' : 2, 'username' : 5, 'password' : 6, 'host' : 7, 'path' : 9, 'query' : 10, 'fragment' : 11};
			var r = /^((\w+):)?(\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/.exec(this.absolutePath);
			for (var field in fields) {
				this[field] = r[fields[field]];
			}
			this.querys = {};
			if(this.query){
				$.each(self.query.split('&'), function(){
					var a = this.split('=');
					if (a.length == 2) self.querys[a[0]] = a[1];
				});
			}
		},
		//現在のページと親ディレクトリへのリンク
		selflink: function (options) {
			var c = $.extend({
				selfLinkAreaSelector:'body',
				selfLinkClass:'current',
				parentsLinkClass:'parentsLink',
				postfix: '',
				changeImgSelf:true,
				changeImgParents:true
			}, options);
			$(c.selfLinkAreaSelector+((c.selfLinkAreaSelector)?' ':'')+'a[href]').each(function(){
				var href = new $.yuga.Uri(this.getAttribute('href'));
				var setImgFlg = false;
				if ((href.absolutePath.replace("#columnTop","") == location.href) && !href.fragment) {
					//同じ文書にリンク
					$(this).addClass(c.selfLinkClass);
					setImgFlg = c.changeImgSelf;
				} else if (0 <= location.href.search(href.absolutePath)) {
					//親ディレクトリリンク
					$(this).addClass(c.parentsLinkClass);
					setImgFlg = c.changeImgParents;
				}
				if (setImgFlg){
					//img要素が含まれていたら現在用画像（_cr）に設定
					//$(this).find('img').each(function(){
						//this.originalSrc = $(this).attr('src');
						//this.currentSrc = this.originalSrc.replace(new RegExp('('+c.postfix+')?(\.gif|\.jpg|\.png)$'), c.postfix+"$2");
						//$(this).attr('src',this.currentSrc);
					//});
				}
			});
		},
	};
})(jQuery);
