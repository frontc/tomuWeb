(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-62117efe"],{"1da1":function(t,e,n){"use strict";function r(t,e,n,r,a,o,i){try{var s=t[o](i),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,a)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var i=t.apply(e,n);function s(t){r(i,a,o,s,c,"next",t)}function c(t){r(i,a,o,s,c,"throw",t)}s(void 0)}))}}n.d(e,"a",(function(){return a})),n("d3b7"),n("e6cf")},"85a1":function(t,e,n){"use strict";n.r(e);var r=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"logo"},[e("img",{attrs:{src:n("a1d8")}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fl"},[e("a",{attrs:{href:"javascript:;"}},[this._v("不知道如何开始？")])])}],a=(n("96cf"),n("1da1")),o=n("5530"),i=n("f121"),s=n("2f62"),c={name:"addChannel",data:function(){return{channelId:"",addClass:"",showVersions:!0,webVersions:i.a.versions,apiVersions:"",auth:""}},methods:Object(o.a)({},Object(s.b)(["resetSystemInfo","setNewChannel","setSongList","setChannelIdInfo","setFirstEntry","lastChannelInfo","setLastSongs"]),{initSystemInfo:function(){this.getVersion(),this.resetSystemInfo()},getVersion:function(){var t=this;return Object(a.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getVersion();case 2:(n=e.sent)&&(t.apiVersions=n);case 4:case"end":return e.stop()}}),e)})))()},versionsFlag:function(){this.showVersions=!this.showVersions},getChannel:function(){var t=this;return Object(a.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t.channelId){e.next=4;break}t.$Message.info("请输入频道ID"),e.next=20;break;case 4:if(""!==t.auth){e.next=9;break}return e.next=7,t.$api.getAuthKey();case 7:(n=e.sent)&&t.$store2[i.a.storageType](i.a.tokenName,n);case 9:return e.next=11,t.$api.getChannelInfo(t.channelId);case 11:if(!(r=e.sent)){e.next=20;break}return t.setLastSongs(r.playlist),t.setChannelIdInfo(t.channelId),t.lastChannelInfo({channelCreateDate:r.channelCreateDate,channelName:r.channelName,lastPlayDate:r.lastPlayDate,lastPosition:r.lastPosition,lastSongID:r.lastSongID}),e.next=18,t.getUserName();case 18:t.$ba.trackEvent("".concat(t.$store2[i.a.storageType]("userName"),"-加入频道"),JSON.stringify({info:r})),t.goToHome();case 20:case"end":return e.stop()}}),e)})))()},addChannel:function(){var t=this;return Object(a.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getAuthKey();case 2:if(!(n=e.sent)){e.next=17;break}return t.$store2[i.a.storageType](i.a.tokenName,n),t.auth=n,e.next=8,t.$api.addChannel();case 8:if(!(r=e.sent)){e.next=17;break}return e.next=12,t.getUserName();case 12:t.$ba.trackEvent("".concat(t.$store2[i.a.storageType]("userName"),"-新建频道"),JSON.stringify({info:r})),t.channelId=r,t.setChannelIdInfo(r),t.setNewChannel(),t.getChannel();case 17:case"end":return e.stop()}}),e)})))()},goToHome:function(){var t=this;this.$store2[i.a.storageType](i.a.loginChannelName,!0),this.addClass="animate__zoomOut_center",setTimeout((function(){t.$router.push("/".concat(i.a.homePath))}),800)},getUserName:function(){var t=this;return Object(a.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.getThisUserName();case 2:n=e.sent,t.$store2[i.a.storageType]("userName",n);case 4:case"end":return e.stop()}}),e)})))()}}),watch:{$route:function(t){this.channelId=t.params.id||"",""!==this.channelId&&(this.setFirstEntry(!0),this.getChannel())}},created:function(){this.channelId=this.$route.params.id||"",""!==this.channelId&&this.getChannel(),this.initSystemInfo()}},u=(n("f4e6"),n("2877")),h=Object(u.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("div",{staticClass:"handle-box animate__animated animate__zoomInUp_center",class:t.addClass},[n("div",{staticClass:"bg-player-box"},[t._m(0),n("div",{staticClass:"channel-form"},[n("div",{staticClass:"clearfix form"},[n("div",{staticClass:"input-channel-id fl"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.channelId,expression:"channelId"}],attrs:{placeholder:"请输入频道号"},domProps:{value:t.channelId},on:{input:function(e){e.target.composing||(t.channelId=e.target.value)}}})]),n("div",{staticClass:"fr"},[n("button",{on:{click:t.getChannel}},[t._v("进入")])])])]),n("div",{staticClass:"channel-id-submit"},[n("div",{staticClass:"clearfix"},[t._m(1),n("div",{staticClass:"fr"},[n("a",{attrs:{href:"javascript:;"},on:{click:t.addChannel}},[t._v("您可以创建一个新频道")])])])]),n("div",{staticClass:"copy-right"},[t._v("Copyright @ 2011-2020 ToMu-"),t.showVersions?n("span",{on:{mouseover:t.versionsFlag}},[t._v(t._s(t.apiVersions))]):n("span",{on:{mouseout:t.versionsFlag}},[t._v(t._s(t.webVersions))]),t._v(" All Rights Reserved.")])])])])}),r,!1,null,"52cb0d17",null);e.default=h.exports},"8e6c":function(t,e,n){},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function c(t,e,n,r){var a=e&&e.prototype instanceof v?e:v,o=Object.create(a.prototype),i=new k(r||[]);return o._invoke=function(t,e,n){var r=h;return function(a,o){if(r===f)throw new Error("Generator is already running");if(r===p){if("throw"===a)throw o;return O()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var s=I(i,n);if(s){if(s===d)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=f;var c=u(t,e,n);if("normal"===c.type){if(r=n.done?p:l,c.arg===d)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=p,n.method="throw",n.arg=c.arg)}}}(t,n,i),o}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var h="suspendedStart",l="suspendedYield",f="executing",p="completed",d={};function v(){}function g(){}function m(){}var y={};y[o]=function(){return this};var w=Object.getPrototypeOf,x=w&&w(w(N([])));x&&x!==n&&r.call(x,o)&&(y=x);var b=m.prototype=v.prototype=Object.create(y);function _(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function C(t){var e;this._invoke=function(n,a){function o(){return new Promise((function(e,o){!function e(n,a,o,i){var s=u(t[n],t,a);if("throw"!==s.type){var c=s.arg,h=c.value;return h&&"object"==typeof h&&r.call(h,"__await")?Promise.resolve(h.__await).then((function(t){e("next",t,o,i)}),(function(t){e("throw",t,o,i)})):Promise.resolve(h).then((function(t){c.value=t,o(c)}),(function(t){return e("throw",t,o,i)}))}i(s.arg)}(n,a,e,o)}))}return e=e?e.then(o,o):o()}}function I(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,I(t,n),"throw"===n.method))return d;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var a=u(r,t.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,d;var o=a.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,d):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,d)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function N(t){if(t){var n=t[o];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function n(){for(;++a<t.length;)if(r.call(t,a))return n.value=t[a],n.done=!1,n;return n.value=e,n.done=!0,n};return i.next=i}}return{next:O}}function O(){return{value:e,done:!0}}return g.prototype=b.constructor=m,m.constructor=g,m[s]=g.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},_(C.prototype),C.prototype[i]=function(){return this},t.AsyncIterator=C,t.async=function(e,n,r,a){var o=new C(c(e,n,r,a));return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},_(b),b[s]="Generator",b[o]=function(){return this},b.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=N,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(E),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function a(r,a){return s.type="throw",s.arg=t,n.next=r,a&&(n.method="next",n.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),E(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;E(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:N(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=r}catch(t){Function("r","regeneratorRuntime = r")(r)}},a1d8:function(t,e,n){t.exports=n.p+"img/logo.5d4e282b.png"},f4e6:function(t,e,n){"use strict";var r=n("8e6c");n.n(r).a}}]);