!function(t){function e(e){for(var a,o,i=e[0],s=e[1],u=e[2],l=0,d=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);for(p&&p(e);d.length;)d.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],a=!0,o=1;o<n.length;o++){var s=n[o];0!==r[s]&&(a=!1)}a&&(c.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},o={app:0},r={app:0},c=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[];o[t]?e.push(o[t]):0!==o[t]&&{"chunk-60ea4757":1,"chunk-6b813c40":1,"chunk-fda7a6cc":1}[t]&&e.push(o[t]=new Promise((function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-60ea4757":"1fc805f2","chunk-6b813c40":"9a9bca3c","chunk-fda7a6cc":"353840a2"}[t]+".css",r=i.p+a,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var u=(p=c[s]).getAttribute("data-href")||p.getAttribute("href");if("stylesheet"===p.rel&&(u===a||u===r))return e()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){var p;if((u=(p=l[s]).getAttribute("data-href"))===a||u===r)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var a=e&&e.target&&e.target.src||r,c=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=a,delete o[t],d.parentNode.removeChild(d),n(c)},d.href=r,document.getElementsByTagName("head")[0].appendChild(d)})).then((function(){o[t]=0})));var n=r[t];if(0!==n)if(n)e.push(n[2]);else{var a=new Promise((function(e,a){n=r[t]=[e,a]}));e.push(n[2]=a);var c,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=function(t){return i.p+"js/"+({}[t]||t)+"."+{"chunk-60ea4757":"54a0b4f3","chunk-6b813c40":"1566746b","chunk-fda7a6cc":"d224b623"}[t]+".js"}(t);var u=new Error;c=function(e){s.onerror=s.onload=null,clearTimeout(l);var n=r[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",u.name="ChunkLoadError",u.type=a,u.request=o,n[1](u)}r[t]=void 0}};var l=setTimeout((function(){c({type:"timeout",target:s})}),12e4);s.onerror=s.onload=c,document.head.appendChild(s)}return Promise.all(e)},i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i.oe=function(t){throw t};var s=window.webpackJsonp=window.webpackJsonp||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var p=u;c.push([0,"chunk-vendors"]),n()}({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);var a=n("fe66"),o=n("aa30"),r=n("efc9"),c=n("2d48"),i=n("8144"),s=n("e79d"),u=n("90b2"),l=n("c5c1"),p=n("76ea"),d=n("b3e6"),f=n("beb5"),m=n("5250"),h=n("e3f5"),g=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),y=n("cff8"),b=n.n(y),v=(n("764d"),n("4eb5")),w=n.n(v),T={name:"App",data:function(){return{className:""}}},k=(n("7c55"),n("2877")),S=Object(k.a)(T,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)}),[],!1,null,null,null).exports,C=(n("b0c0"),n("d3b7"),n("e0b9")),U=n("8c4f"),q=n("f121"),O=n("c276");g.a.use(U.a);var j=[{path:"/",name:"index",redirect:"/".concat(q.a.homePath),meta:{title:"ToMu"},component:function(){return n.e("chunk-60ea4757").then(n.bind(null,"7f5c"))},children:[{path:"/".concat(q.a.homePath),name:q.a.homePath,meta:{title:"ToMu"},component:function(){return n.e("chunk-6b813c40").then(n.bind(null,"f5ae"))}}]},{path:"/".concat(q.a.addChannelPath),name:q.a.addChannelPath,meta:{title:"ToMu"},component:function(){return n.e("chunk-fda7a6cc").then(n.bind(null,"85a1"))},children:[{path:"/".concat(q.a.addChannelPath,"/:id"),name:"params",meta:{title:"ToMu"},component:function(){return n.e("chunk-fda7a6cc").then(n.bind(null,"85a1"))}}]},{path:"*",redirect:"/"}],E=new U.a({mode:"hash",base:"",routes:j});E.beforeEach((function(t,e,n){C.a.start(),Object(O.k)()||t.name===q.a.addChannelPath||"params"===t.name?0===t.matched.length?(n("/"),C.a.finish()):n():(o.a.info("请先添加频道"),n({name:q.a.addChannelPath}),C.a.finish())})),E.afterEach((function(t){document.title=t.meta.title||"睿知",setTimeout((function(){C.a.finish()}),1e3),document.getElementById("app").scrollTo(0,0)}));var P=E,N=n("2f62"),V=n("0e44");g.a.use(N.a);var I=new N.a.Store({state:{homeSignOut:!1,newChannel:!1,songList:[],addFlag:!1,channelIdInfo:null,firstEntry:!1},mutations:{setSignOut:function(t,e){t.homeSignOut=e},resetSystemInfo:function(t){t.newChannel=!1,t.homeSignOut=!1,t.addFlag=!1,t.songList=[],t.channelIdInfo=null},setNewChannel:function(t){t.newChannel=!0,t.addFlag=!0,t.songList=[]},setChannelFlag:function(t){t.newChannel=!1,t.addFlag=!1},setSongList:function(t,e){t.songList=e},setAddFlag:function(t,e){t.addFlag=e},setChannelIdInfo:function(t,e){t.channelIdInfo=e},setFirstEntry:function(t,e){t.firstEntry=e}},plugins:[Object(V.a)({storage:window["".concat(q.a.storageType,"Storage")]})]}),x=(n("99af"),n("4328")),L=n.n(x),A=n("bc3a"),M=n.n(A).a.create({timeout:2e4});M.defaults.baseURL="https://tomu.orous.cn",M.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",M.defaults.headers.get["Content-Type"]="application/json",M.interceptors.request.use((function(t){return t}),(function(t){return Promise.error(t)})),M.interceptors.response.use((function(t){return 200===t.status?Promise.resolve(function(t){return 100===t.data.errorcode?Promise.reject(t):void 0!=t.config.geRequest&&t.config.geRequest?t.request:t.data}(t)):Promise.reject(t)}),(function(t){var e=t.response;return e.status!==q.a.code.ok?Promise.resolve(function(t){return t.message&&o.a.info(t.message),!1}(e.data)):Promise.reject(e)}));var D=M,R=function(){return{headers:{common:{Authorization:"Bearer ".concat(Object(O.l)())}}}},_={getPicUrl:function(t){return D.get("",{baseURL:t,geRequest:!0})},getSongList:function(t){return D.get("?server=".concat(t.server,"&type=").concat(t.type,"&id=").concat(t.id,"&r=").concat(Math.random()),{baseURL:q.a.songListApi})},getAuthKey:function(){return D.get("".concat(q.a.apiVersions,"/auth"))},addChannel:function(){return D.post("".concat(q.a.apiVersions,"/channel"),null,R())},getChannelInfo:function(t){return D.get("".concat(q.a.apiVersions,"/channel/").concat(t),R())},getChannelSongs:function(t){return D.get("".concat(q.a.apiVersions,"/channel/").concat(t,"/songs"),R())},setChannelSongs:function(t,e){return D.post("".concat(q.a.apiVersions,"/channel/").concat(t,"/song"),L.a.stringify(e),R())},setChannelSongsStatus:function(t,e){return D.post("".concat(q.a.apiVersions,"/channel/").concat(t,"/status"),L.a.stringify(e),R())},getAudienceList:function(t){return D.get("".concat(q.a.apiVersions,"/channel/").concat(t,"/audience"),R())},getThisUserName:function(){return D.get("".concat(q.a.apiVersions,"/who"),R())},copyRightApi:function(t){return D.get(t)}};n("f8ce"),n("77ed"),g.a.use(w.a),g.a.component("Button",h.a),g.a.component("Icon",m.a),g.a.component("Input",f.a),g.a.component("Row",d.a),g.a.component("Col",p.a),g.a.component("Dropdown",l.a),g.a.component("DropdownMenu",u.a),g.a.component("DropdownItem",s.a),g.a.component("RadioGroup",i.a),g.a.component("Radio",c.a),g.a.component("Checkbox",r.a),g.a.prototype.$Message=o.a,g.a.prototype.$Spin=a.a,g.a.prototype.$api=_,g.a.config.productionTip=!1,g.a.prototype.$config=q.a,g.a.prototype.$store2=b.a,new g.a({render:function(t){return t(S)},store:I,router:P}).$mount("#app")},"5ba8":function(t,e,n){},"7c55":function(t,e,n){"use strict";var a=n("5ba8");n.n(a).a},c276:function(t,e,n){"use strict";n.d(e,"e",(function(){return s})),n.d(e,"n",(function(){return u})),n.d(e,"h",(function(){return l})),n.d(e,"k",(function(){return p})),n.d(e,"o",(function(){return d})),n.d(e,"b",(function(){return f})),n.d(e,"c",(function(){return h})),n.d(e,"m",(function(){return g})),n.d(e,"i",(function(){return y})),n.d(e,"d",(function(){return b})),n.d(e,"a",(function(){return v})),n.d(e,"j",(function(){return w})),n.d(e,"g",(function(){return T})),n.d(e,"f",(function(){return k})),n.d(e,"l",(function(){return S})),n("7db0"),n("4160"),n("b64b"),n("159b");var a=n("aa30"),o=n("5530"),r=n("cff8"),c=n.n(r),i=n("f121"),s=function(t){return document.getElementsByClassName(t)[0]},u=function(t,e){return Object(o.a)({},e,{},t)},l=function(t){var e={};return Object.keys(t).forEach((function(n){e[n]=t[n]})),e},p=function(){return c.a[i.a.storageType](i.a.loginChannelName)},d=function(t){c.a[i.a.storageType](i.a.loginChannelName,!1),setTimeout((function(){t.push(i.a.addChannelPath)}),800)},f=function(){try{window.external.addFavorite(i.a.url,i.a.title)}catch(t){try{window.sidebar.addPanel(i.a.title,i.a.url,"")}catch(t){a.a.info("加入收藏失败，按 CTRL+D 键手动加入书签。")}}},m=function(t,e){var n=[];return Object.keys(t).forEach((function(a){var o=t[a];Object.keys(e).forEach((function(t){void 0===o[t]&&(o[t]=e[t])})),n.push(o)})),n},h=function(t,e,n){c.a[i.a.storageType]("addSongData",t);var a,o,r,s=c.a[i.a.storageType]("addSongData");if(0===s.length)return m(e,{songSource:n});if(s.length>0){var u=(a={songSource:n},o=[],r=c.a[i.a.storageType]("addSongData"),Object.keys(r).forEach((function(t){var e=r[t];Object.keys(a).forEach((function(t){delete e[t]})),o.push(e)})),o);Object.keys(e).forEach((function(t){void 0===u.find((function(n){return JSON.stringify(n)===JSON.stringify(e[t])}))&&s.push(e[t])}))}return m(s,{songSource:n})},g=function(t){var e=[];return Object.keys(t).forEach((function(n){e.push(t[n])})),e},y=function(t){var e=s(t).style.backgroundImage;return e.substring(5,e.length-2)},b=function(t,e){var n=s(t),a=document.createElement("div"),o=e;document.getElementsByClassName("aplayImage")[0]||(a.className="aplayImage",n.appendChild(a)),s("aplayImage").style.cssText=o},v=function(t){var e=s(t),n=document.createElement("div");s("cdImage")||(n.className="cdImage",e.appendChild(n))},w=function(t,e){var n=0;return Object.keys(t).forEach((function(a){t[a].url===e.path[0].currentSrc&&(n=a)})),n},T=function(t){var e=[];return 0===t.length?t:(Object.keys(t).forEach((function(n){var a={};a.id=t[n].songID,a.songSource=t[n].songSource,a.songUrl=t[n].songUrl,a.title=t[n].songName,a.author=t[n].artistName,a.pic=t[n].coverUrl,a.lrc=t[n].lrcUrl,a.url=t[n].mp3Url,e.push(a)})),e)},k=function(t){var e=[];return 0===t.length?t:(Object.keys(t).forEach((function(n){var a={};a.songSource=t[n].songSource,a.songUrl=t[n].songUrl||"https://music.163.com/#/",a.songDuration="120",a.songName=t[n].title,a.artistName=t[n].author,a.coverUrl=t[n].pic,a.lrcUrl=t[n].lrc,a.mp3Url=t[n].url,e.push(a)})),e)},S=function(){return c.a[i.a.storageType](i.a.tokenName)}},f121:function(t,e,n){"use strict";e.a={url:{production:"https://tomu.orous.cn/#/",development:"http://localhost:8080/#/"},title:"ToMu",versions:"0.0.5",homePath:"home",addChannelPath:"addChannel",loginChannelName:"ToMuLoginChanne",storageType:"session",tokenName:"token",apiVersions:"/api/v1",code:{ok:200},songListApi:"https://api.i-meto.com/meting/api",musicPlatform:[{title:"网易云音乐",logo:"https://www.ooorq.com/image/wangyi.png",type:"netease",playlistUrl:"https://music.163.com/#/playlist?id=",songUrl:"https://music.163.com/#/song?id=",artistUrl:"https://music.163.com/#/artist?id=",playlistUrlType:"",songUrlType:"",artistUrlType:"",addSongTypeName:"歌单",addSongType:!0,playlistValue:"",songValue:"",artistValue:"",searchValue:""},{title:"QQ音乐",logo:"https://www.ooorq.com/image/qq.png",type:"tencent",playlistUrl:"https://y.qq.com/n/yqq/playlist/",songUrl:"https://y.qq.com/n/yqq/song/",artistUrl:"https://y.qq.com/n/yqq/singer/",playlistUrlType:".html",songUrlType:".html",artistUrlType:".html",addSongTypeName:"歌单",playlistValue:"",songValue:"",artistValue:"",searchValue:""},{title:"酷狗音乐",logo:"https://www.ooorq.com/image/kugou.png",type:"kugou",playlistUrl:"https://www.kugou.com/yy/special/single/",songUrl:"",artistUrl:"https://www.kugou.com/yy/singer/home/",playlistUrlType:".html",songUrlType:"",artistUrlType:".html",addSongTypeName:"歌单",playlistValue:"",songValue:"",artistValue:"",searchValue:""},{title:"千千音乐",logo:"https://www.ooorq.com/image/qianqian.png",type:"baidu",playlistUrl:"http://music.taihe.com/songlist/",songUrl:"http://music.taihe.com/song/",artistUrl:"http://music.taihe.com/artist/",playlistUrlType:"",songUrlType:"",artistUrlType:"",addSongTypeName:"歌单",playlistValue:"",songValue:"",artistValue:"",searchValue:""}],serverLink:[["music.163.com.*song.*id=(\\d+)","netease","song"],["music.163.com.*album.*id=(\\d+)","netease","album"],["music.163.com.*artist.*id=(\\d+)","netease","artist"],["music.163.com.*playlist.*id=(\\d+)","netease","playlist"],["music.163.com.*discover/toplist.*id=(\\d+)","netease","playlist"],["y.qq.com.*song/(\\w+).html","tencent","song"],["y.qq.com.*album/(\\w+).html","tencent","album"],["y.qq.com.*singer/(\\w+).html","tencent","artist"],["y.qq.com.*playsquare/(\\w+).html","tencent","playlist"],["y.qq.com.*playlist/(\\w+).html","tencent","playlist"],["xiami.com.*song/(\\w+)","xiami","song"],["xiami.com.*album/(\\w+)","xiami","album"],["xiami.com.*artist/(\\w+)","xiami","artist"],["xiami.com.*collect/(\\w+)","xiami","playlist"]]}}});