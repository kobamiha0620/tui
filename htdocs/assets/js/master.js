jQuery(window).on("load",function(){});
!function(u){u.fn.tile=function(e){var h,i,n,r,t,o=this.length-1;return e=e||this.length,this.each(function(){(t=this.style).removeProperty&&t.removeProperty("height"),t.removeAttribute&&t.removeAttribute("height")}),this.each(function(t){(h=0==(n=t%e)?[]:h)[n]=u(this),r=h[n].height(),(0==n||i<r)&&(i=r),t!=o&&n!=e-1||u.each(h,function(){this.height(i)})})}}(jQuery);
!function(){"use strict";function e(t){if(!t)throw new Error("No options passed to Waypoint constructor");if(!t.element)throw new Error("No element option passed to Waypoint constructor");if(!t.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+i,this.options=e.Adapter.extend({},e.defaults,t),this.element=this.options.element,this.adapter=new e.Adapter(this.element),this.callback=t.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=e.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=e.Context.findOrCreateByElement(this.options.context),e.offsetAliases[this.options.offset]&&(this.options.offset=e.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),r[this.key]=this,i+=1}var i=0,r={};e.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},e.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},e.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete r[this.key]},e.prototype.disable=function(){return this.enabled=!1,this},e.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},e.prototype.next=function(){return this.group.next(this)},e.prototype.previous=function(){return this.group.previous(this)},e.invokeAll=function(t){var e,i=[];for(e in r)i.push(r[e]);for(var o=0,n=i.length;o<n;o++)i[o][t]()},e.destroyAll=function(){e.invokeAll("destroy")},e.disableAll=function(){e.invokeAll("disable")},e.enableAll=function(){for(var t in e.Context.refreshAll(),r)r[t].enabled=!0;return this},e.refreshAll=function(){e.Context.refreshAll()},e.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},e.viewportWidth=function(){return document.documentElement.clientWidth},e.adapters=[],e.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},e.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=e}(),function(){"use strict";function e(t){window.setTimeout(t,1e3/60)}function i(t){this.element=t,this.Adapter=d.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+o,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,n[t.waypointContextKey]=this,o+=1,d.windowContext||(d.windowContext=!0,d.windowContext=new i(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var o=0,n={},d=window.Waypoint,t=window.onload;i.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},i.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),i=this.element==this.element.window;t&&e&&!i&&(this.adapter.off(".waypoints"),delete n[this.key])},i.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,d.requestAnimationFrame(t))})},i.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){e.didScroll&&!d.isTouch||(e.didScroll=!0,d.requestAnimationFrame(t))})},i.prototype.handleResize=function(){d.Context.refreshAll()},i.prototype.handleScroll=function(){var t,e,i={},o={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(t in o){var n,r=o[t],s=r.newScroll>r.oldScroll?r.forward:r.backward;for(n in this.waypoints[t]){var a,l,h=this.waypoints[t][n];null!==h.triggerPoint&&(a=r.oldScroll<h.triggerPoint,l=r.newScroll>=h.triggerPoint,(a&&l||!a&&!l)&&(h.queueTrigger(s),i[h.group.id]=h.group))}}for(e in i)i[e].flushTriggers();this.oldScroll={x:o.horizontal.newScroll,y:o.vertical.newScroll}},i.prototype.innerHeight=function(){return this.element==this.element.window?d.viewportHeight():this.adapter.innerHeight()},i.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},i.prototype.innerWidth=function(){return this.element==this.element.window?d.viewportWidth():this.adapter.innerWidth()},i.prototype.destroy=function(){var t,e=[];for(t in this.waypoints)for(var i in this.waypoints[t])e.push(this.waypoints[t][i]);for(var o=0,n=e.length;o<n;o++)e[o].destroy()},i.prototype.refresh=function(){var t,e,i=this.element==this.element.window,o=i?void 0:this.adapter.offset(),n={};for(e in this.handleScroll(),t={horizontal:{contextOffset:i?0:o.left,contextScroll:i?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:i?0:o.top,contextScroll:i?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}}){var r,s=t[e];for(r in this.waypoints[e]){var a,l=this.waypoints[e][r],h=l.options.offset,p=l.triggerPoint,c=0,u=null==p;l.element!==l.element.window&&(c=l.adapter.offset()[s.offsetProp]),"function"==typeof h?h=h.apply(l):"string"==typeof h&&(h=parseFloat(h),-1<l.options.offset.indexOf("%")&&(h=Math.ceil(s.contextDimension*h/100))),a=s.contextScroll-s.contextOffset,l.triggerPoint=Math.floor(c+a-h),a=p<s.oldScroll,h=l.triggerPoint>=s.oldScroll,p=!a&&!h,!u&&(a&&h)?(l.queueTrigger(s.backward),n[l.group.id]=l.group):(!u&&p||u&&s.oldScroll>=l.triggerPoint)&&(l.queueTrigger(s.forward),n[l.group.id]=l.group)}}return d.requestAnimationFrame(function(){for(var t in n)n[t].flushTriggers()}),this},i.findOrCreateByElement=function(t){return i.findByElement(t)||new i(t)},i.refreshAll=function(){for(var t in n)n[t].refresh()},i.findByElement=function(t){return n[t.waypointContextKey]},window.onload=function(){t&&t(),i.refreshAll()},d.requestAnimationFrame=function(t){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||e).call(window,t)},d.Context=i}(),function(){"use strict";function r(t,e){return t.triggerPoint-e.triggerPoint}function s(t,e){return e.triggerPoint-t.triggerPoint}function e(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),i[this.axis][this.name]=this}var i={vertical:{},horizontal:{}},o=window.Waypoint;e.prototype.add=function(t){this.waypoints.push(t)},e.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},e.prototype.flushTriggers=function(){for(var t in this.triggerQueues){var e=this.triggerQueues[t];e.sort("up"===t||"left"===t?s:r);for(var i=0,o=e.length;i<o;i+=1){var n=e[i];!n.options.continuous&&i!==e.length-1||n.trigger([t])}}this.clearTriggerQueues()},e.prototype.next=function(t){this.waypoints.sort(r);t=o.Adapter.inArray(t,this.waypoints);return t===this.waypoints.length-1?null:this.waypoints[t+1]},e.prototype.previous=function(t){this.waypoints.sort(r);t=o.Adapter.inArray(t,this.waypoints);return t?this.waypoints[t-1]:null},e.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},e.prototype.remove=function(t){t=o.Adapter.inArray(t,this.waypoints);-1<t&&this.waypoints.splice(t,1)},e.prototype.first=function(){return this.waypoints[0]},e.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},e.findOrCreate=function(t){return i[t.axis][t.name]||new e(t)},o.Group=e}(),function(){"use strict";function i(t){this.$element=o(t)}var o=window.jQuery,t=window.Waypoint;o.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(t,e){i.prototype[e]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[e].apply(this.$element,t)}}),o.each(["extend","inArray","isEmptyObject"],function(t,e){i[e]=o[e]}),t.adapters.push({name:"jquery",Adapter:i}),t.Adapter=i}(),function(){"use strict";function t(o){return function(){var e=[],i=arguments[0];return o.isFunction(arguments[0])&&((i=o.extend({},arguments[1])).handler=arguments[0]),this.each(function(){var t=o.extend({},i,{element:this});"string"==typeof t.context&&(t.context=o(this).closest(t.context)[0]),e.push(new n(t))}),e}}var n=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
!function(e){var t=function(n,f,s){"use strict";var m,y;if(function(){var e,t={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",fastLoadedClass:"ls-is-cached",iframeLoadMode:0,srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(e in y=n.lazySizesConfig||n.lazysizesConfig||{},t)e in y||(y[e]=t[e])}(),!f||!f.getElementsByClassName)return{init:function(){},cfg:y,noSupport:!0};function c(e,t){le(e,t)||e.setAttribute("class",(e[Z]("class")||"").trim()+" "+t)}function u(e,t){(t=le(e,t))&&e.setAttribute("class",(e[Z]("class")||"").replace(t," "))}function z(e,t){var a;!X&&(a=n.picturefill||y.pf)?(t&&t.src&&!e[Z]("srcset")&&e.setAttribute("srcset",t.src),a({reevaluate:!0,elements:[e]})):t&&t.src&&(e.src=t.src)}function e(a,e){return e?function(){me(a)}:function(){var e=this,t=arguments;me(function(){a.apply(e,t)})}}function t(e){function t(){var e=s.now()-n;e<99?te(t,99-e):(ne||i)(i)}var a,n,i=function(){a=null,e()};return function(){n=s.now(),a=a||te(t,99)}}function a(){!a.i&&f.getElementsByClassName&&(a.i=!0,ze._(),ye._())}var i,o,r,h,g,v,p,l,C,b,A,E,_,w,M,d,N,L,x,W,S,B,T,F,R,D,k,H,O,P,$,q,I,U,j,G,J,K,Q,V=f.documentElement,X=n.HTMLPictureElement,Y="addEventListener",Z="getAttribute",ee=n[Y].bind(n),te=n.setTimeout,ae=n.requestAnimationFrame||te,ne=n.requestIdleCallback,ie=/^picture$/i,se=["load","error","lazyincluded","_lazyloaded"],oe={},re=Array.prototype.forEach,le=function(e,t){return oe[t]||(oe[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")),oe[t].test(e[Z]("class")||"")&&oe[t]},de=function(t,a,e){var n=e?Y:"removeEventListener";e&&de(t,a),se.forEach(function(e){t[n](e,a)})},ce=function(e,t,a,n,i){var s=f.createEvent("Event");return(a=a||{}).instance=m,s.initEvent(t,!n,!i),s.detail=a,e.dispatchEvent(s),s},ue=function(e,t){return(getComputedStyle(e,null)||{})[t]},fe=function(e,t,a){for(a=a||e.offsetWidth;a<y.minSize&&t&&!e._lazysizesWidth;)a=t.offsetWidth,t=t.parentNode;return a},me=(K=[],Q=J=[],we._lsFlush=_e,we),ye=(B=/^img$/i,T=/^iframe$/i,F="onscroll"in n&&!/(gle|ing)bot/.test(navigator.userAgent),k=-1,H=function(e){return(M=null==M?"hidden"==ue(f.body,"visibility"):M)||!("hidden"==ue(e.parentNode,"visibility")&&"hidden"==ue(e,"visibility"))},d=ve,L=D=R=0,x=y.throttleDelay,W=y.ricTimeout,S=ne&&49<W?function(){ne(pe,{timeout:W}),W!==y.ricTimeout&&(W=y.ricTimeout)}:e(function(){te(pe)},!0),P=e(Ce),$=function(e){P({target:e.target})},q=e(function(t,e,a,n,i){var s,o,r,l,d;(r=ce(t,"lazybeforeunveil",e)).defaultPrevented||(n&&(a?c(t,y.autosizesClass):t.setAttribute("sizes",n)),s=t[Z](y.srcsetAttr),a=t[Z](y.srcAttr),i&&(o=(d=t.parentNode)&&ie.test(d.nodeName||"")),l=e.firesLoad||"src"in t&&(s||a||o),r={target:t},c(t,y.loadingClass),l&&(clearTimeout(v),v=te(ge,2500),de(t,$,!0)),o&&re.call(d.getElementsByTagName("source"),be),s?t.setAttribute("srcset",s):a&&!o&&(T.test(t.nodeName)?(n=a,0==(d=(e=t).getAttribute("data-load-mode")||y.iframeLoadMode)?e.contentWindow.location.replace(n):1==d&&(e.src=n)):t.src=a),i&&(s||o)&&z(t,{src:a})),t._lazyRace&&delete t._lazyRace,u(t,y.lazyClass),me(function(){var e=t.complete&&1<t.naturalWidth;l&&!e||(e&&c(t,y.fastLoadedClass),Ce(r),t._lazyCache=!0,te(function(){"_lazyCache"in t&&delete t._lazyCache},9)),"lazy"==t.loading&&D--},!0)}),U=t(function(){y.loadMode=3,O()}),{_:function(){l=s.now(),m.elements=f.getElementsByClassName(y.lazyClass),h=f.getElementsByClassName(y.lazyClass+" "+y.preloadClass),ee("scroll",O,!0),ee("resize",O,!0),ee("pageshow",function(e){var t;!e.persisted||(t=f.querySelectorAll("."+y.loadingClass)).length&&t.forEach&&ae(function(){t.forEach(function(e){e.complete&&I(e)})})}),n.MutationObserver?new MutationObserver(O).observe(V,{childList:!0,subtree:!0,attributes:!0}):(V[Y]("DOMNodeInserted",O,!0),V[Y]("DOMAttrModified",O,!0),setInterval(O,999)),ee("hashchange",O,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach(function(e){f[Y](e,O,!0)}),/d$|^c/.test(f.readyState)?Ee():(ee("load",Ee),f[Y]("DOMContentLoaded",O),te(Ee,2e4)),m.elements.length?(ve(),me._lsFlush()):O()},checkElems:O=function(e){var t;(e=!0===e)&&(W=33),N||(N=!0,(t=x-(s.now()-L))<0&&(t=0),e||t<9?S():te(S,t))},unveil:I=function(e){var t,a,n,i;e._lazyRace||(!(i="auto"==(n=(a=B.test(e.nodeName))&&(e[Z](y.sizesAttr)||e[Z]("sizes"))))&&g||!a||!e[Z]("src")&&!e.srcset||e.complete||le(e,y.errorClass)||!le(e,y.lazyClass))&&(t=ce(e,"lazyunveilread").detail,i&&ze.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,D++,q(e,t,i,n,a))},_aLSL:Ae}),ze=(o=e(function(e,t,a,n){var i,s,o;if(e._lazysizesWidth=n,e.setAttribute("sizes",n+="px"),ie.test(t.nodeName||""))for(s=0,o=(i=t.getElementsByTagName("source")).length;s<o;s++)i[s].setAttribute("sizes",n);a.detail.dataAttr||z(e,a.detail)}),{_:function(){i=f.getElementsByClassName(y.autosizesClass),ee("resize",r)},checkElems:r=t(function(){var e,t=i.length;if(t)for(e=0;e<t;e++)he(i[e])}),updateElem:he});function he(e,t,a){var n=e.parentNode;n&&(a=fe(e,n,a),(t=ce(e,"lazybeforesizes",{width:a,dataAttr:!!t})).defaultPrevented||(a=t.detail.width)&&a!==e._lazysizesWidth&&o(e,n,t,a))}function ge(e){D--,e&&!(D<0)&&e.target||(D=0)}function ve(){var e,t,a,n,i,s,o,r,l,d,c,u=m.elements;if((p=y.loadMode)&&D<8&&(e=u.length)){for(t=0,k++;t<e;t++)if(u[t]&&!u[t]._lazyRace)if(!F||m.prematureUnveil&&m.prematureUnveil(u[t]))I(u[t]);else if((o=u[t][Z]("data-expand"))&&(i=+o)||(i=R),l||(l=!y.expand||y.expand<1?500<V.clientHeight&&500<V.clientWidth?500:370:y.expand,d=(m._defEx=l)*y.expFactor,c=y.hFac,M=null,R<d&&D<1&&2<k&&2<p&&!f.hidden?(R=d,k=0):R=1<p&&1<k&&D<6?l:0),r!==i&&(C=innerWidth+i*c,b=innerHeight+i,s=-1*i,r=i),d=u[t].getBoundingClientRect(),(w=d.bottom)>=s&&(A=d.top)<=b&&(_=d.right)>=s*c&&(E=d.left)<=C&&(w||_||E||A)&&(y.loadHidden||H(u[t]))&&(g&&D<3&&!o&&(p<3||k<4)||function(e,t){var a,n=e,i=H(e);for(A-=t,w+=t,E-=t,_+=t;i&&(n=n.offsetParent)&&n!=f.body&&n!=V;)(i=0<(ue(n,"opacity")||1))&&"visible"!=ue(n,"overflow")&&(a=n.getBoundingClientRect(),i=_>a.left&&E<a.right&&w>a.top-1&&A<a.bottom+1);return i}(u[t],i))){if(I(u[t]),n=!0,9<D)break}else!n&&g&&!a&&D<4&&k<4&&2<p&&(h[0]||y.preloadAfterLoad)&&(h[0]||!o&&(w||_||E||A||"auto"!=u[t][Z](y.sizesAttr)))&&(a=h[0]||u[t]);a&&!n&&I(a)}}function pe(){N=!1,L=s.now(),d()}function Ce(e){var t=e.target;t._lazyCache?delete t._lazyCache:(ge(e),c(t,y.loadedClass),u(t,y.loadingClass),de(t,$),ce(t,"lazyloaded"))}function be(e){var t,a=e[Z](y.srcsetAttr);(t=y.customMedia[e[Z]("data-media")||e[Z]("media")])&&e.setAttribute("media",t),a&&e.setAttribute("srcset",a)}function Ae(){3==y.loadMode&&(y.loadMode=2),U()}function Ee(){g||(s.now()-l<999?te(Ee,999):(g=!0,y.loadMode=3,O(),ee("scroll",Ae,!0)))}function _e(){var e=Q;for(Q=J.length?K:J,G=!(j=!0);e.length;)e.shift()();j=!1}function we(e,t){j&&!t?e.apply(this,arguments):(Q.push(e),G||(G=!0,(f.hidden?te:ae)(_e)))}return te(function(){y.init&&a()}),m={cfg:y,autoSizer:ze,loader:ye,init:a,uP:z,aC:c,rC:u,hC:le,fire:ce,gW:fe,rAF:me}}(e,e.document,Date);e.lazySizes=t,"object"==typeof module&&module.exports&&(module.exports=t)}("undefined"!=typeof window?window:{});
!function(e,t){function a(){t(e.lazySizes),e.removeEventListener("lazyunveilread",a,!0)}t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes")):"function"==typeof define&&define.amd?define(["lazysizes"],t):e.lazySizes?a():e.addEventListener("lazyunveilread",a,!0)}(window,function(e,i,o){"use strict";var l,d,u={};function s(e,t,a){var n,r;u[e]||(n=i.createElement(t?"link":"script"),r=i.getElementsByTagName("script")[0],t?(n.rel="stylesheet",n.href=e):(n.onload=function(){n.onerror=null,n.onload=null,a()},n.onerror=n.onload,n.src=e),u[e]=!0,u[n.src||n.href]=!0,r.parentNode.insertBefore(n,r))}i.addEventListener&&(l=function(e,t){var a=i.createElement("img");a.onload=function(){a.onload=null,a.onerror=null,a=null,t()},a.onerror=a.onload,a.src=e,a&&a.complete&&a.onload&&a.onload()},addEventListener("lazybeforeunveil",function(e){var t,a,n;if(e.detail.instance==o&&!e.defaultPrevented){var r=e.target;if("none"==r.preload&&(r.preload=r.getAttribute("data-preload")||"auto"),null!=r.getAttribute("data-autoplay"))if(r.getAttribute("data-expand")&&!r.autoplay)try{r.play()}catch(e){}else requestAnimationFrame(function(){r.setAttribute("data-expand","-10"),o.aC(r,o.cfg.lazyClass)});(t=r.getAttribute("data-link"))&&s(t,!0),(t=r.getAttribute("data-script"))&&(e.detail.firesLoad=!0,s(t,null,function(){e.detail.firesLoad=!1,o.fire(r,"_lazyloaded",{},!0,!0)})),(t=r.getAttribute("data-require"))&&(o.cfg.requireJs?o.cfg.requireJs([t]):s(t)),(a=r.getAttribute("data-bg"))&&(e.detail.firesLoad=!0,l(a,function(){r.style.backgroundImage="url("+(d.test(a)?JSON.stringify(a):a)+")",e.detail.firesLoad=!1,o.fire(r,"_lazyloaded",{},!0,!0)})),(n=r.getAttribute("data-poster"))&&(e.detail.firesLoad=!0,l(n,function(){r.poster=n,e.detail.firesLoad=!1,o.fire(r,"_lazyloaded",{},!0,!0)}))}},!(d=/\(|\)|\s|'/)))});
var _ua=function(e){return{Tablet:-1!=e.indexOf("windows")&&-1!=e.indexOf("touch")||-1!=e.indexOf("ipad")||-1!=e.indexOf("android")&&-1==e.indexOf("mobile")||-1!=e.indexOf("firefox")&&-1!=e.indexOf("tablet")||-1!=e.indexOf("kindle")||-1!=e.indexOf("silk")||-1!=e.indexOf("playbook"),Mobile:-1!=e.indexOf("windows")&&-1!=e.indexOf("phone")||-1!=e.indexOf("iphone")||-1!=e.indexOf("ipod")||-1!=e.indexOf("android")&&-1!=e.indexOf("mobile")||-1!=e.indexOf("firefox")&&-1!=e.indexOf("mobile")||-1!=e.indexOf("blackberry")}}(window.navigator.userAgent.toLowerCase()),osVer="Android",breakNum=600,tabletNum=1024;function setPhotoChanger(){$(".photoChanger").each(function(){var t,e=$(this).find("li").length;$(this).find("li:nth-child(1)").addClass("action"),1<e&&(t=$(this),setInterval(function(){var e;(e=t).find("li:nth-child(2)").addClass("action"),setTimeout(function(){e.find("li:nth-child(1)").removeClass("action"),e.find("li:nth-child(1)").appendTo(e)},2e3)},5e3))})}function setMega(){$("header .col-nav .parent a").hover(function(){$("header .productNav").slideDown("fast"),$(this).addClass("active")},function(){}),$("header").hover(function(){},function(){$("header .productNav").slideUp("fast"),$("header .col-nav .parent a").removeClass("active")})}function displayCart(){$("#CartCount").each(function(){0!=$(this).find("span").text()&&$(this).addClass("active")})}function setVideo(){$(".movieWrap").each(function(){var e=$(this).find(".video"),t=e.get(0),n=$(this).find(".playBtn"),i=$(this).parents(".movieSec").find(".videoSummary");n.on("click",function(){t.play(),t.setAttribute("controls","controls"),e.addClass("stand"),$(this).addClass("hide"),i.addClass("hide")}),$(".movieLink .ttl").on("click",function(){t.play(),t.setAttribute("controls","controls"),e.addClass("stand"),n.addClass("hide"),i.addClass("hide")}),t.addEventListener("playing",function(){n.addClass("hide"),i.addClass("hide")},!0),t.addEventListener("pause",function(){n.removeClass("hide"),i.removeClass("hide")},!0),t.addEventListener("ended",function(){n.removeClass("hide"),i.removeClass("hide")},!0),e.mouseover(function(){e.hasClass("stand")&&t.setAttribute("controls","controls")}).mouseout(function(){e.hasClass("stand")&&t.setAttribute("controls","controls")})})}function setAcc(){$(".accSec h2").on("click",function(){$(this).toggleClass("active"),$(this).parent().next().slideToggle("fast")})}$(function(){setScroll(),$("#wrapper").hasClass("home"),_ua.Tablet||_ua.Mobile,_ua.Mobile}),$(window).on("load",function(){svg4everybody(),judgeWinSize(),setMainMenu(),setAcc(),setWay(),setLoaded(),displayCart(),setMega(),$("#wrapper").hasClass("home")});var menuOpenFlag=!1;function setMainMenu(){var e;$("#mainNav,h1.logo").on("click",function(){$(this).hasClass("active")?o():(e=$(window).scrollTop(),$("#mainNav").addClass("active"),$("#wrapper").addClass("menuOpen"),menuOpenFlag=!0,document.addEventListener("touchmove",a,{passive:!1}))}),$("#clickBlocker,.closeArea").on("click",function(){o()});$(window).width();var t,n=!1,i=window.innerWidth;function a(e){e.preventDefault()}function o(){$("#mainNav").removeClass("active"),$("#wrapper").removeClass("menuOpen"),document.removeEventListener("touchmove",a,{passive:!1}),menuOpenFlag=!1,$("html, body").prop({scrollTop:e})}window.addEventListener("resize",function(){t=$(window).width(),i!=window.innerWidth&&(i=window.innerWidth,!1!==n&&clearTimeout(n),n=setTimeout(function(){tabletNum<t&&o()},200))})}function setHeader(){n(),$(window).scroll(function(){n()});$(window).width();var e=!1,t=window.innerWidth;function n(){baseHeight=10,$(this).scrollTop()<=baseHeight?$("#wrapper").removeClass("fixedHeader"):$(this).scrollTop()>baseHeight&&$("#wrapper").addClass("fixedHeader")}window.addEventListener("resize",function(){$(window).width(),t!=window.innerWidth&&(t=window.innerWidth,!1!==e&&clearTimeout(e),e=setTimeout(function(){$("#wrapper").removeClass("fixedHeader")},200))})}function judgeWinSize(){var e=$(window).width();breakNum<e?$("#wrapper").addClass("setPc"):$("#wrapper").addClass("setSp");var t=!1,n=window.innerWidth;window.addEventListener("resize",function(){n!=window.innerWidth&&(n=window.innerWidth,!1!==t&&clearTimeout(t),t=setTimeout(function(){e=$(window).width(),breakNum<e?($("#wrapper").addClass("setPc"),$("#wrapper").removeClass("setSp")):($("#wrapper").addClass("setSp"),$("#wrapper").removeClass("setPc"))},200))})}function setLoaded(){$("#loading").addClass("loaded"),$("#wrapper").addClass("loaded"),setTimeout(function(){$("#wrapper").addClass("loadEnd")},500),$("body,html").animate({scrollTop:0},0,"swing")}function setWay(){$(".way,.alphaWay,.scaleWay,.setAnimation,.nullWay").waypoint(function(e){var t=$(this.element);$(this.element);"down"===e&&t.addClass("active")},{offset:"70%"}),$(".galleryWidget.bottom").waypoint(function(e){var t=$(this.element);$(this.element);"down"===e?t.addClass("active"):t.removeClass("active")},{offset:"4.296875%"}),$(".galleryWidget .item").waypoint(function(e){var t=$(this.element);$(this.element);"down"===e&&t.addClass("active")},{offset:"-145px"}),$(".galleryWidget .item").waypoint(function(e){var t=$(this.element);$(this.element);"up"===e&&t.removeClass("active")},{offset:"-155px"}),$(".galleryWidget .item").waypoint(function(e){var t=$(this.element);$(this.element);"down"===e&&t.addClass("move")},{offset:"30%"}),$("#homeWidget .item").waypoint(function(e){var t=$(this.element);$(this.element);"down"===e&&("cont_01"==t.attr("id")?($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_01").show()):"cont_02"==t.attr("id")?($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_02").show()):"cont_03"==t.attr("id")?($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_03").show()):"cont_04"==t.attr("id")?($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_04").show()):"cont_05"==t.attr("id")?($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_05").show()):"cont_06"==t.attr("id")&&($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_06").show()))},{offset:"10px"}),$("#cont_07").waypoint(function(e){$(this.element),$(this.element);"down"===e&&($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_07").show())},{offset:"90%"}),$("#homeWidget .item").waypoint(function(e){var t=$(this.element);$(this.element);"up"===e&&("homeCont"==t.attr("id")?($("h1.logo").removeClass("hidden"),$(".navTtl").hide()):"cont_01"==t.attr("id")||"cont_01_02"==t.attr("id")||"cont_01_03"==t.attr("id")?($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_01").show()):"cont_02"==t.attr("id")?($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_02").show()):"cont_03"==t.attr("id")?($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_03").show()):"cont_04"==t.attr("id")?($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_04").show()):"cont_05"==t.attr("id")?($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_05").show()):"cont_06"==t.attr("id")?($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_06").show()):"cont_07"==t.attr("id")&&($("h1.logo").addClass("hidden"),$(".navTtl").hide(),$(".navTtl.style_07").show()))},{offset:"-95%"}),$(".shuffle").waypoint(function(e){var t=$(this.element);"down"===e&&(t.addClass("active"),t.shuffleLetters())},{offset:"70%"}),$(".scaleway,.nullWay,.ttlStyle_05,.fade_01,.fade_02").waypoint(function(e){var t=$(this.element);"down"===e&&t.addClass("active")},{offset:"70%"})}function setScroll(){var a=$("header").height()+40;$('a[href^="#"]').click(function(e){var t=$(this).attr("href"),n=$("#"==t||""==t?"html":t),i=n.offset().top-a;$(this).hasClass("unqNav")&&closeFnc(),$.when($("html, body").animate({scrollTop:i},400,"swing"),e.preventDefault()).done(function(){var e=n.offset().top-a;e==i||$("html, body").animate({scrollTop:e},10,"swing")})})}function startScroll(){var i=$("header").height()+40,e=$(location).attr("hash");e&&(timer=setTimeout(function(){var t=$("#"==e||""==e?"html":e),n=t.offset().top-i;$.when($("html, body").animate({scrollTop:n},400,"swing")).done(function(){var e=t.offset().top-i;e==n||$("html, body").animate({scrollTop:e},10,"swing")})},1e3))}$(window).on("load scroll resize",function(){var e=$(window).scrollTop();$(document).height()-window.innerHeight<=e?$("#mainNav").addClass("foot"):$("#mainNav").removeClass("foot")});var isLandscape=function(){window.innerHeight>window.innerWidth?(jQuery("body").addClass("portrait"),jQuery("body").removeClass("landscape")):(jQuery("body").addClass("landscape"),jQuery("body").removeClass("portrait"))};function heightLineGroup(){$(window).width();startResize()}function setAutoHeight(e,t){$(e).tile(t)}function startResize(){var e=!1,t=window.innerWidth;window.addEventListener("resize",function(){t!=window.innerWidth&&(t=window.innerWidth,!1!==e&&clearTimeout(e),e=setTimeout(function(){heightLineGroup()},200))})}_ua.Mobile&&(jQuery(window).resize(function(){isLandscape()}),isLandscape());
!function(e,i,l){"use strict";var n,o,c;i.createElement("picture");function t(){}function s(e,t,s,r){e.addEventListener?e.addEventListener(t,s,r||!1):e.attachEvent&&e.attachEvent("on"+t,s)}var S={},a=!1,r=i.createElement("img"),p=r.getAttribute,f=r.setAttribute,d=r.removeAttribute,u=i.documentElement,h={},x={algorithm:""},m="data-pfsrc",A=m+"set",g=navigator.userAgent,y=/rident/.test(g)||/ecko/.test(g)&&g.match(/rv\:(\d+)/)&&35<RegExp.$1,b="currentSrc",v=/\s+\+?\d+(e\d+)?w/,w=/(\([^)]+\))?\s*(.+)/,E=e.picturefillCFG,z="font-size:100%!important;",T=!0,R={},C={},M=e.devicePixelRatio,P={px:1,in:96},D=i.createElement("a"),k=!1,I=/^[ \t\n\r\u000c]+/,U=/^[, \t\n\r\u000c]+/,$=/^[^ \t\n\r\u000c]+/,B=/[,]+$/,L=/^\d+$/,Q=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,g=function(t){var s={};return function(e){return e in s||(s[e]=t(e)),s[e]}};function W(e){return" "===e||"\t"===e||"\n"===e||"\f"===e||"\r"===e}function G(e,t){return e.w?(e.cWidth=S.calcListLength(t||"100vw"),e.res=e.w/e.cWidth):e.res=e.d,e}var F,H,j,q,N,O,V,J,K,X,_,Y,Z,ee,te,se=(F=/^([\d\.]+)(em|vw|px)$/,H=g(function(e){return"return "+function(){for(var e=arguments,t=0,s=e[0];++t in e;)s=s.replace(e[t],e[++t]);return s}((e||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"}),function(e,t){var s;if(!(e in R))if(R[e]=!1,t&&(s=e.match(F)))R[e]=s[1]*P[s[2]];else try{R[e]=new Function("e",H(e))(P)}catch(e){}return R[e]}),re=function(e){if(a){var t,s,r,n=e||{};if(n.elements&&1===n.elements.nodeType&&("IMG"===n.elements.nodeName.toUpperCase()?n.elements=[n.elements]:(n.context=n.elements,n.elements=null)),r=(t=n.elements||S.qsa(n.context||i,n.reevaluate||n.reselect?S.sel:S.selShort)).length){for(S.setupRun(n),k=!0,s=0;s<r;s++)S.fillImg(t[s],n);S.teardownRun(n)}}};function ne(e,t){return e.res-t.res}function ie(e,t){var s,r,n;if(e&&t)for(n=S.parseSet(t),e=S.makeUrl(e),s=0;s<n.length;s++)if(e===S.makeUrl(n[s].url)){r=n[s];break}return r}function ce(t,o){function e(e){var e=e.exec(t.substring(c));if(e)return e=e[0],c+=e.length,e}var p,f,s,r,n,i=t.length,c=0,d=[];function a(){for(var e,t,s,r,n,i,c,a=!1,u={},l=0;l<f.length;l++)r=(c=f[l])[c.length-1],n=c.substring(0,c.length-1),i=parseInt(n,10),c=parseFloat(n),L.test(n)&&"w"===r?((e||t)&&(a=!0),0===i?a=!0:e=i):Q.test(n)&&"x"===r?((e||t||s)&&(a=!0),c<0?a=!0:t=c):L.test(n)&&"h"===r?((s||t)&&(a=!0),0===i?a=!0:s=i):a=!0;a||(u.url=p,e&&(u.w=e),t&&(u.d=t),s&&(u.h=s),s||t||e||(u.d=1),1===u.d&&(o.has1x=!0),u.set=o,d.push(u))}for(;;){if(e(U),i<=c)return d;p=e($),f=[],","===p.slice(-1)?(p=p.replace(B,""),a()):function(){for(e(I),s="",r="in descriptor";;){if(n=t.charAt(c),"in descriptor"===r)if(W(n))s&&(f.push(s),s="",r="after descriptor");else{if(","===n)return c+=1,s&&f.push(s),a();if("("===n)s+=n,r="in parens";else{if(""===n)return s&&f.push(s),a();s+=n}}else if("in parens"===r)if(")"===n)s+=n,r="in descriptor";else{if(""===n)return f.push(s),a();s+=n}else if("after descriptor"===r&&!W(n)){if(""===n)return a();r="in descriptor",--c}c+=1}}()}}function ae(e){var t,s,r,n,i,c,a=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,u=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(r=(s=function(e){var t,s="",r=[],n=[],i=0,c=0,a=!1;function u(){s&&(r.push(s),s="")}function l(){r[0]&&(n.push(r),r=[])}for(;;){if(""===(t=e.charAt(c)))return u(),l(),n;if(a)"*"!==t||"/"!==e[c+1]?c+=1:(a=!1,c+=2,u());else{if(W(t)){if(e.charAt(c-1)&&W(e.charAt(c-1))||!s){c+=1;continue}if(0===i){u(),c+=1;continue}t=" "}else if("("===t)i+=1;else if(")"===t)--i;else{if(","===t){u(),l(),c+=1;continue}if("/"===t&&"*"===e.charAt(c+1)){a=!0,c+=2;continue}}s+=t,c+=1}}}(e)).length,t=0;t<r;t++)if(i=(n=s[t])[n.length-1],c=i,a.test(c)&&0<=parseFloat(c)||(u.test(c)||("0"===c||"-0"===c||"+0"===c))){if(i=i,n.pop(),0===n.length)return i;if(n=n.join(" "),S.matchesMedia(n))return i}return"100vw"}function ue(){2===q.width&&(S.supSizes=!0),o=S.supSrcset&&!S.supSizes,a=!0,setTimeout(re)}function le(){var e=i.readyState||"";_=setTimeout(le,"loading"===e?200:999),i.body&&(S.fillImgs(),(N=N||X.test(e))&&clearTimeout(_))}function oe(){var e=new Date-K;e<V?J=setTimeout(oe,V-e):(J=null,O())}e.console&&console.warn,b in r||(b="src"),h["image/jpeg"]=!0,h["image/gif"]=!0,h["image/png"]=!0,h["image/svg+xml"]=i.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),S.ns=("pf"+(new Date).getTime()).substr(0,9),S.supSrcset="srcset"in r,S.supSizes="sizes"in r,S.supPicture=!!e.HTMLPictureElement,S.supSrcset&&S.supPicture&&!S.supSizes&&(j=i.createElement("img"),r.srcset="data:,a",j.src="data:,a",S.supSrcset=r.complete===j.complete,S.supPicture=S.supSrcset&&S.supPicture),S.supSrcset&&!S.supSizes?(j="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",(q=i.createElement("img")).onload=ue,q.onerror=ue,q.setAttribute("sizes","9px"),q.srcset=j+" 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 9w",q.src=j):a=!0,S.selShort="picture>img,img[srcset]",S.sel=S.selShort,S.cfg=x,S.DPR=M||1,S.u=P,S.types=h,S.setSize=t,S.makeUrl=g(function(e){return D.href=e,D.href}),S.qsa=function(e,t){return"querySelector"in e?e.querySelectorAll(t):[]},S.matchesMedia=function(){return e.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?S.matchesMedia=function(e){return!e||matchMedia(e).matches}:S.matchesMedia=S.mMQ,S.matchesMedia.apply(this,arguments)},S.mMQ=function(e){return!e||se(e)},S.calcLength=function(e){e=se(e,!0)||!1;return e=e<0?!1:e},S.supportsType=function(e){return!e||h[e]},S.parseSize=g(function(e){e=(e||"").match(w);return{media:e&&e[1],length:e&&e[2]}}),S.parseSet=function(e){return e.cands||(e.cands=ce(e.srcset,e)),e.cands},S.getEmValue=function(){var e,t,s,r;return!n&&(e=i.body)&&(t=i.createElement("div"),s=u.style.cssText,r=e.style.cssText,t.style.cssText="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",u.style.cssText=z,e.style.cssText=z,e.appendChild(t),n=t.offsetWidth,e.removeChild(t),n=parseFloat(n,10),u.style.cssText=s,e.style.cssText=r),n||16},S.calcListLength=function(e){var t;return e in C&&!x.uT||(t=S.calcLength(ae(e)),C[e]=t||P.width),C[e]},S.setRes=function(e){if(e)for(var t,s=0,r=(t=S.parseSet(e)).length;s<r;s++)G(t[s],e.sizes);return t},S.setRes.res=G,S.applySetCandidate=function(e,t){if(e.length){var s,r,n,i,c,a,u,l,o,p,f,d,h,m,A=t[S.ns],g=S.DPR,v=A.curSrc||t[b],w=A.curCan||(u=t,l=v,w=e[0].set,(w=ie(l,w=!w&&l?(w=u[S.ns].sets)&&w[w.length-1]:w))&&(l=S.makeUrl(l),u[S.ns].curSrc=l,(u[S.ns].curCan=w).res||G(w,w.set.sizes)),w);if(w&&w.set===e[0].set&&((a=y&&!t.complete&&w.res-.1>g)||(w.cached=!0,w.res>=g&&(c=w))),!c)for(e.sort(ne),c=e[(i=e.length)-1],r=0;r<i;r++)if((s=e[r]).res>=g){c=e[n=r-1]&&(a||v!==S.makeUrl(s.url))&&(o=e[n].res,p=s.res,f=g,d=e[n].cached,m=h=void 0,o="saveData"===x.algorithm?2.7<o?f+1:(m=(p-f)*(h=Math.pow(o-.6,1.5)),d&&(m+=.1*h),o+m):1<f?Math.sqrt(o*p):o,f<o)?e[n]:s;break}c&&(w=S.makeUrl(c.url),A.curSrc=w,A.curCan=c,w!==v&&S.setSrc(t,c),S.setSize(t))}},S.setSrc=function(e,t){e.src=t.url,"image/svg+xml"===t.set.type&&(t=e.style.width,e.style.width=e.offsetWidth+1+"px",e.offsetWidth+1&&(e.style.width=t))},S.getSet=function(e){for(var t,s,r=!1,n=e[S.ns].sets,i=0;i<n.length&&!r;i++)if((t=n[i]).srcset&&S.matchesMedia(t.media)&&(s=S.supportsType(t.type))){r=t="pending"===s?s:t;break}return r},S.parseSets=function(e,t,s){var r,n,i,c,a=t&&"PICTURE"===t.nodeName.toUpperCase(),u=e[S.ns];u.src!==l&&!s.src||(u.src=p.call(e,"src"),u.src?f.call(e,m,u.src):d.call(e,m)),u.srcset!==l&&!s.srcset&&S.supSrcset&&!e.srcset||(r=p.call(e,"srcset"),u.srcset=r,c=!0),u.sets=[],a&&(u.pic=!0,function(e,t){for(var s,r,n=e.getElementsByTagName("source"),i=0,c=n.length;i<c;i++)(s=n[i])[S.ns]=!0,(r=s.getAttribute("srcset"))&&t.push({srcset:r,media:s.getAttribute("media"),type:s.getAttribute("type"),sizes:s.getAttribute("sizes")})}(t,u.sets)),u.srcset?(n={srcset:u.srcset,sizes:p.call(e,"sizes")},u.sets.push(n),(i=(o||u.src)&&v.test(u.srcset||""))||!u.src||ie(u.src,n)||n.has1x||(n.srcset+=", "+u.src,n.cands.push({url:u.src,d:1,set:n}))):u.src&&u.sets.push({srcset:u.src,sizes:null}),u.curCan=null,u.curSrc=l,u.supported=!(a||n&&!S.supSrcset||i&&!S.supSizes),c&&S.supSrcset&&!u.supported&&(r?(f.call(e,A,r),e.srcset=""):d.call(e,A)),u.supported&&!u.srcset&&(!u.src&&e.src||e.src!==S.makeUrl(u.src))&&(null===u.src?e.removeAttribute("src"):e.src=u.src),u.parsed=!0},S.fillImg=function(e,t){var s,r=t.reselect||t.reevaluate;e[S.ns]||(e[S.ns]={}),s=e[S.ns],!r&&s.evaled===c||(s.parsed&&!t.reevaluate||S.parseSets(e,e.parentNode,t),s.supported?s.evaled=c:(t=e,s=S.getSet(t),e=!1,"pending"!==s&&(e=c,s&&(s=S.setRes(s),S.applySetCandidate(s,t))),t[S.ns].evaled=e))},S.setupRun=function(){k&&!T&&M===e.devicePixelRatio||(T=!1,M=e.devicePixelRatio,R={},C={},S.DPR=M||1,P.width=Math.max(e.innerWidth||0,u.clientWidth),P.height=Math.max(e.innerHeight||0,u.clientHeight),P.vw=P.width/100,P.vh=P.height/100,c=[P.height,P.width,M].join("-"),P.em=S.getEmValue(),P.rem=P.em)},S.supPicture?(re=t,S.fillImg=t):(X=e.attachEvent?/d$|^c/:/d$|^c|^i/,_=setTimeout(le,i.body?9:99),Y=u.clientHeight,s(e,"resize",(O=function(){T=Math.max(e.innerWidth||0,u.clientWidth)!==P.width||u.clientHeight!==Y,Y=u.clientHeight,T&&S.fillImgs()},V=99,function(){K=new Date,J=J||setTimeout(oe,V)})),s(i,"readystatechange",le)),S.picturefill=re,S.fillImgs=re,S.teardownRun=t,re._=S,e.picturefillCFG={pf:S,push:function(e){var t=e.shift();"function"==typeof S[t]?S[t].apply(S,e):(x[t]=e[0],k&&S.fillImgs({reselect:!0}))}};for(;E&&E.length;)e.picturefillCFG.push(E.shift());e.picturefill=re,"object"==typeof module&&"object"==typeof module.exports?module.exports=re:"function"==typeof define&&define.amd&&define("picturefill",function(){return re}),S.supPicture||(h["image/webp"]=(Z="image/webp",ee="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",(te=new e.Image).onerror=function(){h[Z]=!1,re()},te.onload=function(){h[Z]=1===te.width,re()},te.src=ee,"pending"))}(window,document);
!function(e,t){"function"==typeof define&&define.amd?define([],function(){return e.svg4everybody=t()}):"object"==typeof exports?module.exports=t():e.svg4everybody=t()}(this,function(){function c(e,t){if(t){var n=!e.getAttribute("viewBox")&&t.getAttribute("viewBox"),i=document.createDocumentFragment(),o=t.cloneNode(!0);for(n&&e.setAttribute("viewBox",n);o.childNodes.length;)i.appendChild(o.firstChild);e.appendChild(i)}}return function(e){e=e||{};var r=document.getElementsByTagName("use"),a="shim"in e?e.shim:/\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent)||(navigator.userAgent.match(/AppleWebKit\/(\d+)/)||[])[1]<537,s=e.validate,d=window.requestAnimationFrame||setTimeout,u={};a&&function e(){for(;i=r[0];){var t,n,i,o=i.parentNode;o&&/svg/i.test(o.nodeName)&&(t=i.getAttribute("xlink:href"),!a||s&&!s(t,o,i)||(t=(n=t.split("#"))[0],n=n[1],o.removeChild(i),t.length?((i=u[t]=u[t]||new XMLHttpRequest).s||(i.s=[],i.open("GET",t),i.send()),i.s.push([o,n]),function(e){e.onreadystatechange=function(){var t;4===e.readyState&&((t=document.createElement("x")).innerHTML=e.responseText,e.s.splice(0).map(function(e){c(e[0],t.querySelector("#"+e[1].replace(/(\W)/g,"\\$1")))}))},e.onreadystatechange()}(i)):c(o,document.getElementById(n))))}d(e,17)}()}});
!function(i){i(function(){i.yuga.selflink()}),i.yuga={Uri:function(e){var a,t=this;this.originalPath=e,this.absolutePath=((a=document.createElement("a")).href=e,a.href);var s,n={schema:2,username:5,password:6,host:7,path:9,query:10,fragment:11},r=/^((\w+):)?(\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/.exec(this.absolutePath);for(s in n)this[s]=r[n[s]];this.querys={},this.query&&i.each(t.query.split("&"),function(){var e=this.split("=");2==e.length&&(t.querys[e[0]]=e[1])})},selflink:function(e){var a=i.extend({selfLinkAreaSelector:"body",selfLinkClass:"current",parentsLinkClass:"parentsLink",postfix:"",changeImgSelf:!0,changeImgParents:!0},e);i(a.selfLinkAreaSelector+(a.selfLinkAreaSelector?" ":"")+"a[href]").each(function(){var e=new i.yuga.Uri(this.getAttribute("href"));e.absolutePath.replace("#columnTop","")!=location.href||e.fragment?0<=location.href.search(e.absolutePath)&&(i(this).addClass(a.parentsLinkClass),a.changeImgParents):(i(this).addClass(a.selfLinkClass),a.changeImgSelf)})}}}(jQuery);
//# sourceMappingURL=master.js.map