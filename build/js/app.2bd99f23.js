!function(e){function t(t){for(var a,o,i=t[0],s=t[1],u=t[2],l=0,d=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);for(p&&p(t);d.length;)d.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],a=!0,o=1;o<n.length;o++){var s=n[o];0!==r[s]&&(a=!1)}a&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},o={app:0},r={app:0},c=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[];o[e]?t.push(o[e]):0!==o[e]&&{"chunk-50b0df36":1,"chunk-60ea4757":1,"chunk-6b813c40":1}[e]&&t.push(o[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-50b0df36":"1ff5bf33","chunk-60ea4757":"1fc805f2","chunk-6b813c40":"9a9bca3c"}[e]+".css",r=i.p+a,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var u=(p=c[s]).getAttribute("data-href")||p.getAttribute("href");if("stylesheet"===p.rel&&(u===a||u===r))return t()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){var p;if((u=(p=l[s]).getAttribute("data-href"))===a||u===r)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||r,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=a,delete o[e],d.parentNode.removeChild(d),n(c)},d.href=r,document.getElementsByTagName("head")[0].appendChild(d)})).then((function(){o[e]=0})));var n=r[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,a){n=r[e]=[t,a]}));t.push(n[2]=a);var c,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=function(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-50b0df36":"d2c4cc68","chunk-60ea4757":"e741b2a0","chunk-6b813c40":"2f1706ed"}[e]+".js"}(e);var u=new Error;c=function(t){s.onerror=s.onload=null,clearTimeout(l);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+a+": "+o+")",u.name="ChunkLoadError",u.type=a,u.request=o,n[1](u)}r[e]=void 0}};var l=setTimeout((function(){c({type:"timeout",target:s})}),12e4);s.onerror=s.onload=c,document.head.appendChild(s)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw e};var s=window.webpackJsonp=window.webpackJsonp||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var p=u;c.push([0,"chunk-vendors"]),n()}({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);var a=n("fe66"),o=n("aa30"),r=n("9259"),c=n("efc9"),i=n("2d48"),s=n("8144"),u=n("e79d"),l=n("90b2"),p=n("c5c1"),d=n("76ea"),f=n("b3e6"),h=n("beb5"),m=n("5250"),g=n("e3f5"),y=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),b=n("2e95"),v=n.n(b),w=n("cff8"),T=n.n(w),S=(n("764d"),n("4eb5")),k=n.n(S),C=n("91a3"),U={name:"App",data:function(){return{className:""}}},q=(n("7c55"),n("2877")),E=Object(q.a)(U,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)}),[],!1,null,null,null).exports,O=(n("b0c0"),n("d3b7"),n("e0b9")),j=n("8c4f"),P=n("f121"),V=n("c276");y.a.use(j.a);var N=[{path:"/",name:"index",redirect:"/".concat(P.a.homePath),meta:{title:"ToMu"},component:function(){return n.e("chunk-60ea4757").then(n.bind(null,"7f5c"))},children:[{path:"/".concat(P.a.homePath),name:P.a.homePath,meta:{title:"ToMu"},component:function(){return n.e("chunk-6b813c40").then(n.bind(null,"f5ae"))}}]},{path:"/".concat(P.a.addChannelPath),name:P.a.addChannelPath,meta:{title:"ToMu"},component:function(){return n.e("chunk-50b0df36").then(n.bind(null,"85a1"))},children:[{path:"/".concat(P.a.addChannelPath,"/:id"),name:"params",meta:{title:"ToMu"},component:function(){return n.e("chunk-50b0df36").then(n.bind(null,"85a1"))}}]},{path:"*",redirect:"/"}],I=new j.a({mode:"hash",base:"",routes:N});I.beforeEach((function(e,t,n){O.a.start(),Object(V.k)()||e.name===P.a.addChannelPath||"params"===e.name?0===e.matched.length?(n("/"),O.a.finish()):n():(o.a.info("请先添加频道"),n({name:P.a.addChannelPath}),O.a.finish())})),I.afterEach((function(e){document.title=e.meta.title||"睿知",setTimeout((function(){O.a.finish()}),1e3),document.getElementById("app").scrollTo(0,0)}));var x=I,L=n("2f62"),A=n("0e44");y.a.use(L.a);var M=new L.a.Store({state:{homeSignOut:!1,newChannel:!1,songList:[],addFlag:!1,channelIdInfo:null,firstEntry:!1},mutations:{setSignOut:function(e,t){e.homeSignOut=t},resetSystemInfo:function(e){e.newChannel=!1,e.homeSignOut=!1,e.addFlag=!1,e.songList=[],e.channelIdInfo=null},setNewChannel:function(e){e.newChannel=!0,e.addFlag=!0,e.songList=[]},setChannelFlag:function(e){e.newChannel=!1,e.addFlag=!1},setSongList:function(e,t){e.songList=t},setAddFlag:function(e,t){e.addFlag=t},setChannelIdInfo:function(e,t){e.channelIdInfo=t},setFirstEntry:function(e,t){e.firstEntry=t}},plugins:[Object(A.a)({storage:window["".concat(P.a.storageType,"Storage")]})]}),D=(n("99af"),n("4328")),R=n.n(D),_=n("bc3a"),F=n.n(_).a.create({timeout:2e4});F.defaults.baseURL="https://tomu.orous.cn",F.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",F.defaults.headers.get["Content-Type"]="application/json",F.defaults.headers.delete["Content-Type"]="application/json",F.interceptors.request.use((function(e){return e}),(function(e){return Promise.error(e)})),F.interceptors.response.use((function(e){return 200===e.status?Promise.resolve(function(e){return 100===e.data.errorcode?Promise.reject(e):void 0!=e.config.geRequest&&e.config.geRequest?e.request:e.data}(e)):Promise.reject(e)}),(function(e){var t=e.response;return void 0!==t.status&&t.status!==P.a.code.ok?Promise.resolve(function(e){return e.message&&o.a.info(e.message),!1}(t.data)):Promise.reject(t)}));var $=F,B=function(){return{headers:{common:{Authorization:"Bearer ".concat(Object(V.l)())}}}},J={getPicUrl:function(e){return $.get("",{baseURL:e,geRequest:!0})},getSongList:function(e){return $.get("?server=".concat(e.server,"&type=").concat(e.type,"&id=").concat(e.id,"&r=").concat(Math.random()),{baseURL:P.a.songListApi})},getVersion:function(){return $.get("".concat(P.a.apiVersions,"/version"))},getAuthKey:function(){return $.get("".concat(P.a.apiVersions,"/auth"))},addChannel:function(){return $.post("".concat(P.a.apiVersions,"/channel"),null,B())},getChannelInfo:function(e){return $.get("".concat(P.a.apiVersions,"/channel/").concat(e),B())},getChannelSongs:function(e){return $.get("".concat(P.a.apiVersions,"/channel/").concat(e,"/songs"),B())},getChannelSongsAll:function(e){return $.get("".concat(P.a.apiVersions,"/channel/").concat(e,"/songs/all"),B())},setChannelSongs:function(e,t){return $.post("".concat(P.a.apiVersions,"/channel/").concat(e,"/song"),R.a.stringify(t),B())},deleteChannelSongs:function(e,t){return $.delete("".concat(P.a.apiVersions,"/channel/").concat(e,"/song/").concat(t),B())},setChannelSongsStatus:function(e,t){return $.post("".concat(P.a.apiVersions,"/channel/").concat(e,"/status"),R.a.stringify(t),B())},getAudienceList:function(e){return $.get("".concat(P.a.apiVersions,"/channel/").concat(e,"/audience"),B())},getThisUserName:function(){return $.get("".concat(P.a.apiVersions,"/who"),B())},signOutChannel:function(e){return $.delete("".concat(P.a.apiVersions,"/channel/").concat(e,"/audience"),B())},copyRightApi:function(e){return $.get(e)}};n("f8ce"),n("77ed"),y.a.use(k.a),y.a.component("Button",g.a),y.a.component("Icon",m.a),y.a.component("Input",h.a),y.a.component("Row",f.a),y.a.component("Col",d.a),y.a.component("Dropdown",p.a),y.a.component("DropdownMenu",l.a),y.a.component("DropdownItem",u.a),y.a.component("RadioGroup",s.a),y.a.component("Radio",i.a),y.a.component("Checkbox",c.a),y.a.component("Modal",r.a),y.a.prototype.$Message=o.a,y.a.prototype.$Spin=a.a,y.a.prototype.$Modal=r.a,y.a.prototype.$api=J,y.a.config.productionTip=!1,y.a.use(v.a,"0a4b12ea522199d435b89105ce2968e8"),y.a.prototype.$config=P.a,y.a.prototype.$NativeEventSource=C.NativeEventSource,y.a.prototype.$EventSourcePolyfill=C.EventSourcePolyfill,y.a.prototype.$store2=T.a,new y.a({render:function(e){return e(E)},store:M,router:x}).$mount("#app")},"5ba8":function(e,t,n){},"7c55":function(e,t,n){"use strict";var a=n("5ba8");n.n(a).a},c276:function(e,t,n){"use strict";n.d(t,"e",(function(){return s})),n.d(t,"n",(function(){return u})),n.d(t,"h",(function(){return l})),n.d(t,"k",(function(){return p})),n.d(t,"o",(function(){return d})),n.d(t,"b",(function(){return f})),n.d(t,"c",(function(){return m})),n.d(t,"m",(function(){return g})),n.d(t,"i",(function(){return y})),n.d(t,"d",(function(){return b})),n.d(t,"a",(function(){return v})),n.d(t,"j",(function(){return w})),n.d(t,"g",(function(){return T})),n.d(t,"f",(function(){return S})),n.d(t,"l",(function(){return k})),n("7db0"),n("4160"),n("b64b"),n("159b");var a=n("aa30"),o=n("5530"),r=n("cff8"),c=n.n(r),i=n("f121"),s=function(e){return document.getElementsByClassName(e)[0]},u=function(e,t){return Object(o.a)({},t,{},e)},l=function(e){var t={};return Object.keys(e).forEach((function(n){t[n]=e[n]})),t},p=function(){return c.a[i.a.storageType](i.a.loginChannelName)},d=function(e){c.a[i.a.storageType](i.a.loginChannelName,!1),setTimeout((function(){e.push(i.a.addChannelPath)}),800)},f=function(){try{window.external.addFavorite(i.a.url,i.a.title)}catch(e){try{window.sidebar.addPanel(i.a.title,i.a.url,"")}catch(e){a.a.info("加入收藏失败，按 CTRL+D 键手动加入书签。")}}},h=function(e,t){var n=[];return Object.keys(e).forEach((function(a){var o=e[a];Object.keys(t).forEach((function(e){void 0===o[e]&&(o[e]=t[e])})),n.push(o)})),n},m=function(e,t,n){c.a[i.a.storageType]("addSongData",e);var a,o,r,s=c.a[i.a.storageType]("addSongData");if(0===s.length)return h(t,{songSource:n});if(s.length>0){var u=(a={songSource:n},o=[],r=c.a[i.a.storageType]("addSongData"),Object.keys(r).forEach((function(e){var t=r[e];Object.keys(a).forEach((function(e){delete t[e]})),o.push(t)})),o);Object.keys(t).forEach((function(e){void 0===u.find((function(n){return JSON.stringify(n)===JSON.stringify(t[e])}))&&s.push(t[e])}))}return h(s,{songSource:n})},g=function(e){var t=[];return Object.keys(e).forEach((function(n){t.push(e[n])})),t},y=function(e){var t=s(e).style.backgroundImage;return t.substring(5,t.length-2)},b=function(e,t){var n=s(e),a=document.createElement("div"),o=t;document.getElementsByClassName("aplayImage")[0]||(a.className="aplayImage",n.appendChild(a)),s("aplayImage").style.cssText=o},v=function(e){var t=s(e),n=document.createElement("div");s("cdImage")||(n.className="cdImage",t.appendChild(n))},w=function(e,t){var n=0;return Object.keys(e).forEach((function(a){e[a].url===t.path[0].currentSrc&&(n=a)})),n},T=function(e){var t=[];return 0===e.length?e:(Object.keys(e).forEach((function(n){var a={};a.id=e[n].songID,a.songSource=e[n].songSource,a.songUrl=e[n].songUrl,a.title=e[n].songName,a.author=e[n].artistName,a.pic=e[n].coverUrl,a.lrc=e[n].lrcUrl,a.url=e[n].mp3Url,t.push(a)})),t)},S=function(e){var t=[];return 0===e.length?e:(Object.keys(e).forEach((function(n){var a={};a.songSource=e[n].songSource,a.songUrl=e[n].songUrl||"https://music.163.com/#/",a.songDuration="120",a.songName=e[n].title,a.artistName=e[n].author,a.coverUrl=e[n].pic,a.lrcUrl=e[n].lrc,a.mp3Url=e[n].url,t.push(a)})),t)},k=function(){return c.a[i.a.storageType](i.a.tokenName)}},f121:function(e,t,n){"use strict";t.a={url:{production:"https://tomu.orous.cn/#/",development:"http://localhost:8080/#/"},title:"ToMu",versions:"0.0.12",homePath:"home",addChannelPath:"addChannel",loginChannelName:"ToMuLoginChanne",storageType:"session",tokenName:"token",apiVersions:"/api/v1",code:{ok:200},songListApi:"https://api.i-meto.com/meting/api",musicPlatform:[{title:"网易云音乐",logo:"https://www.ooorq.com/image/wangyi.png",type:"netease",playlistUrl:"https://music.163.com/#/playlist?id=",songUrl:"https://music.163.com/#/song?id=",artistUrl:"https://music.163.com/#/artist?id=",playlistUrlType:"",songUrlType:"",artistUrlType:"",addSongTypeName:"歌单",addSongType:!0,playlistValue:"",songValue:"",artistValue:"",searchValue:""},{title:"QQ音乐",logo:"https://www.ooorq.com/image/qq.png",type:"tencent",playlistUrl:"https://y.qq.com/n/yqq/playlist/",songUrl:"https://y.qq.com/n/yqq/song/",artistUrl:"https://y.qq.com/n/yqq/singer/",playlistUrlType:".html",songUrlType:".html",artistUrlType:".html",addSongTypeName:"歌单",playlistValue:"",songValue:"",artistValue:"",searchValue:""},{title:"酷狗音乐",logo:"https://www.ooorq.com/image/kugou.png",type:"kugou",playlistUrl:"https://www.kugou.com/yy/special/single/",songUrl:"",artistUrl:"https://www.kugou.com/yy/singer/home/",playlistUrlType:".html",songUrlType:"",artistUrlType:".html",addSongTypeName:"歌单",playlistValue:"",songValue:"",artistValue:"",searchValue:""},{title:"千千音乐",logo:"https://www.ooorq.com/image/qianqian.png",type:"baidu",playlistUrl:"http://music.taihe.com/songlist/",songUrl:"http://music.taihe.com/song/",artistUrl:"http://music.taihe.com/artist/",playlistUrlType:"",songUrlType:"",artistUrlType:"",addSongTypeName:"歌单",playlistValue:"",songValue:"",artistValue:"",searchValue:""}],serverLink:[["music.163.com.*song.*id=(\\d+)","netease","song"],["music.163.com.*album.*id=(\\d+)","netease","album"],["music.163.com.*artist.*id=(\\d+)","netease","artist"],["music.163.com.*playlist.*id=(\\d+)","netease","playlist"],["music.163.com.*discover/toplist.*id=(\\d+)","netease","playlist"],["y.qq.com.*song/(\\w+).html","tencent","song"],["y.qq.com.*album/(\\w+).html","tencent","album"],["y.qq.com.*singer/(\\w+).html","tencent","artist"],["y.qq.com.*playsquare/(\\w+).html","tencent","playlist"],["y.qq.com.*playlist/(\\w+).html","tencent","playlist"],["xiami.com.*song/(\\w+)","xiami","song"],["xiami.com.*album/(\\w+)","xiami","album"],["xiami.com.*artist/(\\w+)","xiami","artist"],["xiami.com.*collect/(\\w+)","xiami","playlist"]]}}});