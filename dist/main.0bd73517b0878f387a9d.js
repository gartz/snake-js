!function(e){function t(t){for(var n,i,r=t[0],o=t[1],s=0,a=[];s<r.length;s++)i=r[s],S[i]&&a.push(S[i][0]),S[i]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);for(B&&B(t);a.length;)a.shift()()}var n=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,t){if(!b[e]||!k[e])return;for(var n in k[e]=!1,t)Object.prototype.hasOwnProperty.call(t,n)&&(w[n]=t[n]);0==--y&&0===m&&E()}(e,t),n&&n(e,t)};var i,r=!0,o="0bd73517b0878f387a9d",s=1e4,a={},c=[],d=[];function l(e){var t=I[e];if(!t)return x;var n=function(n){return t.hot.active?(I[n]?I[n].parents.includes(e)||I[n].parents.push(e):(c=[e],i=n),t.children.includes(n)||t.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),c=[]),x(n)},r=function(e){return{configurable:!0,enumerable:!0,get:function(){return x[e]},set:function(t){x[e]=t}}};for(var o in x)Object.prototype.hasOwnProperty.call(x,o)&&"e"!==o&&Object.defineProperty(n,o,r(o));return n.e=function(e){return"ready"===h&&p("prepare"),m++,x.e(e).then(t,function(e){throw t(),e});function t(){m--,"prepare"===h&&(g[e]||D(e),0===m&&0===y&&E())}},n}var u=[],h="idle";function p(e){h=e;for(var t=0;t<u.length;t++)u[t].call(null,e)}var f,w,v,y=0,m=0,g={},k={},b={};function O(e){return+e+""===e?+e:e}function _(e){if("idle"!==h)throw new Error("check() is only allowed in idle status");return r=e,p("check"),(t=s,t=t||1e4,new Promise(function(e,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var i=new XMLHttpRequest,r=x.p+""+o+".hot-update.json";i.open("GET",r,!0),i.timeout=t,i.send(null)}catch(e){return n(e)}i.onreadystatechange=function(){if(4===i.readyState)if(0===i.status)n(new Error("Manifest request to "+r+" timed out."));else if(404===i.status)e();else if(200!==i.status&&304!==i.status)n(new Error("Manifest request to "+r+" failed."));else{try{var t=JSON.parse(i.responseText)}catch(e){return void n(e)}e(t)}}})).then(function(e){if(!e)return p("idle"),null;k={},g={},b=e.c,v=e.h,p("prepare");var t=new Promise(function(e,t){f={resolve:e,reject:t}});for(var n in w={},S)D(n);return"prepare"===h&&0===m&&0===y&&E(),t});var t}function D(e){b[e]?(k[e]=!0,y++,function(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("script");n.charset="utf-8",n.src=x.p+""+e+"."+o+".hot-update.js",t.appendChild(n)}(e)):g[e]=!0}function E(){p("ready");var e=f;if(f=null,e)if(r)Promise.resolve().then(function(){return P(r)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var n in w)Object.prototype.hasOwnProperty.call(w,n)&&t.push(O(n));e.resolve(t)}}function P(t){if("ready"!==h)throw new Error("apply() is only allowed in ready status");var n,i,r,s,d;function l(e){for(var t=[e],n={},i=t.slice().map(function(e){return{chain:[e],id:e}});i.length>0;){var r=i.pop(),o=r.id,a=r.chain;if((s=I[o])&&!s.hot._selfAccepted){if(s.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:o};if(s.hot._main)return{type:"unaccepted",chain:a,moduleId:o};for(var c=0;c<s.parents.length;c++){var d=s.parents[c],l=I[d];if(l){if(l.hot._declinedDependencies[o])return{type:"declined",chain:a.concat([d]),moduleId:o,parentId:d};t.includes(d)||(l.hot._acceptedDependencies[o]?(n[d]||(n[d]=[]),u(n[d],[o])):(delete n[d],t.push(d),i.push({chain:a.concat([d]),id:d})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}function u(e,t){for(var n=0;n<t.length;n++){var i=t[n];e.includes(i)||e.push(i)}}t=t||{};var f={},y=[],m={},g=function(){console.warn("[HMR] unexpected require("+_.moduleId+") to disposed module")};for(var k in w)if(Object.prototype.hasOwnProperty.call(w,k)){var _;d=O(k);var D=!1,E=!1,P=!1,U="";switch((_=w[k]?l(d):{type:"disposed",moduleId:k}).chain&&(U="\nUpdate propagation: "+_.chain.join(" -> ")),_.type){case"self-declined":t.onDeclined&&t.onDeclined(_),t.ignoreDeclined||(D=new Error("Aborted because of self decline: "+_.moduleId+U));break;case"declined":t.onDeclined&&t.onDeclined(_),t.ignoreDeclined||(D=new Error("Aborted because of declined dependency: "+_.moduleId+" in "+_.parentId+U));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(_),t.ignoreUnaccepted||(D=new Error("Aborted because "+d+" is not accepted"+U));break;case"accepted":t.onAccepted&&t.onAccepted(_),E=!0;break;case"disposed":t.onDisposed&&t.onDisposed(_),P=!0;break;default:throw new Error("Unexception type "+_.type)}if(D)return p("abort"),Promise.reject(D);if(E)for(d in m[d]=w[d],u(y,_.outdatedModules),_.outdatedDependencies)Object.prototype.hasOwnProperty.call(_.outdatedDependencies,d)&&(f[d]||(f[d]=[]),u(f[d],_.outdatedDependencies[d]));P&&(u(y,[_.moduleId]),m[d]=g)}var j,L=[];for(i=0;i<y.length;i++)d=y[i],I[d]&&I[d].hot._selfAccepted&&L.push({module:d,errorHandler:I[d].hot._selfAccepted});p("dispose"),Object.keys(b).forEach(function(e){!1===b[e]&&function(e){delete S[e]}(e)});for(var B,C,H=y.slice();H.length>0;)if(d=H.pop(),s=I[d]){var A={},M=s.hot._disposeHandlers;for(r=0;r<M.length;r++)(n=M[r])(A);for(a[d]=A,s.hot.active=!1,delete I[d],delete f[d],r=0;r<s.children.length;r++){var R=I[s.children[r]];R&&((j=R.parents.indexOf(d))>=0&&R.parents.splice(j,1))}}for(d in f)if(Object.prototype.hasOwnProperty.call(f,d)&&(s=I[d]))for(C=f[d],r=0;r<C.length;r++)B=C[r],(j=s.children.indexOf(B))>=0&&s.children.splice(j,1);for(d in p("apply"),o=v,m)Object.prototype.hasOwnProperty.call(m,d)&&(e[d]=m[d]);var N=null;for(d in f)if(Object.prototype.hasOwnProperty.call(f,d)&&(s=I[d])){C=f[d];var T=[];for(i=0;i<C.length;i++)if(B=C[i],n=s.hot._acceptedDependencies[B]){if(T.includes(n))continue;T.push(n)}for(i=0;i<T.length;i++){n=T[i];try{n(C)}catch(e){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:d,dependencyId:C[i],error:e}),t.ignoreErrored||N||(N=e)}}}for(i=0;i<L.length;i++){var W=L[i];d=W.module,c=[d];try{x(d)}catch(e){if("function"==typeof W.errorHandler)try{W.errorHandler(e)}catch(n){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:d,error:n,originalError:e}),t.ignoreErrored||N||(N=n),N||(N=e)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:d,error:e}),t.ignoreErrored||N||(N=e)}}return N?(p("fail"),Promise.reject(N)):(p("idle"),new Promise(function(e){e(y)}))}var I={},S={1:0};function x(t){if(I[t])return I[t].exports;var n=I[t]={i:t,l:!1,exports:{},hot:function(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:i!==e,active:!0,accept:function(e,n){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var i=0;i<e.length;i++)t._acceptedDependencies[e[i]]=n||function(){};else t._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:_,apply:P,status:function(e){if(!e)return h;u.push(e)},addStatusHandler:function(e){u.push(e)},removeStatusHandler:function(e){var t=u.indexOf(e);t>=0&&u.splice(t,1)},data:a[e]};return i=void 0,t}(t),parents:(d=c,c=[],d),children:[]};return e[t].call(n.exports,n,n.exports,l(t)),n.l=!0,n.exports}x.e=function(e){var t=[],n=S[e];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise(function(t,i){n=S[e]=[t,i]});t.push(n[2]=i);var r=document.getElementsByTagName("head")[0],s=document.createElement("script");s.charset="utf-8",s.timeout=12e4,x.nc&&s.setAttribute("nonce",x.nc),s.src=x.p+""+({}[e]||e)+"."+o+".js";var a=setTimeout(function(){c({type:"timeout",target:s})},12e4);function c(t){s.onerror=s.onload=null,clearTimeout(a);var n=S[e];if(0!==n){if(n){var i=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+i+": "+r+")");o.type=i,o.request=r,n[1](o)}S[e]=void 0}}s.onerror=s.onload=c,r.appendChild(s)}return Promise.all(t)},x.m=e,x.c=I,x.d=function(e,t,n){x.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},x.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},x.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return x.d(t,"a",t),t},x.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},x.p="",x.oe=function(e){throw console.error(e),e},x.h=function(){return o};var U=window.webpackJsonp=window.webpackJsonp||[],j=U.push.bind(U);U.push=t,U=U.slice();for(var L=0;L<U.length;L++)t(U[L]);var B=j;l("tjUo")(x.s="tjUo")}({"8IbN":function(e,t,n){"use strict";n.r(t),n.d(t,"Snake",function(){return i});class i{constructor(e={}){const{name:t,BLOCK_SIZE:n,size:i,y:r,x:o,direction:s,nextDirection:a}=e;this.name=t,this.BLOCK_SIZE=n||20,this.COLOR_DEAD_BLOCK="red",this.direction=s||"right",this.nextDirection=a||"right",this.x=o||0,this.y=r||0,this.isDead=!1,this.action="kill",this.pieces=new Set,this.head=null,this.removedPiece=null,this.kills=0,i&&this.size(i)}size(e){for(let t=0;t<e;t++)this.grow()}color(e){return this.isDead&&0===e?this.COLOR_DEAD_BLOCK:e%2==0?"green":"lightgreen"}update(){if(!this.isDead)switch(this.direction=this.nextDirection,this.nextDirection){case"left":this.x--;break;case"up":this.y--;break;case"right":this.x++;break;case"down":this.y++}}die(){this.isDead=!0}grow(){if(this.isDead)return;const e=this.BLOCK_SIZE,t=new Path2D;t.rect(this.x*e,this.y*e,e,e),t.x=this.x,t.y=this.y,this.pieces.add(t),this.head=t,this.removedPiece=null}move(){this.isDead?this.removedPiece=null:(this.grow(),this.removedPiece=this.pieces.values().next().value,this.pieces.delete(this.removedPiece))}down(){"up"!==this.direction&&(this.nextDirection="down")}up(){"down"!==this.direction&&(this.nextDirection="up")}left(){"right"!==this.direction&&(this.nextDirection="left")}right(){"left"!==this.direction&&(this.nextDirection="right")}}},"aj+U":function(e,t,n){"use strict";function i({read:e,write:t,keyMap:n}){const i=n?e=>{const i=n[e.key];i&&t[i]()}:e=>{switch(e.keyCode){case 37:return t.left();case 38:return t.up();case 39:return t.right();case 40:return t.down();case 13:return t.play();case 80:return t.togglePause();case 82:return t.stop()}};return e.addEventListener("keydown",i),function(){e.removeEventListener("keydown",i)}}n.r(t),n.d(t,"keyboard",function(){return i})},rF0c:function(e,t,n){"use strict";n.r(t);const i={};const r=()=>console.warn("Snake is undefined");class o{constructor({name:e,platform:t,snake:n,device:o,read:s,...a}){this.name=function(e){const t=i[e]||1;return i[e]=t+1,t>1?`${e}${t}`:e}(e||"device"),this.platform=t,this.snake=n||{up:r,down:r,left:r,right:r};const c={up:()=>this.snake.up(),down:()=>this.snake.down(),left:()=>this.snake.left(),right:()=>this.snake.right(),pause:()=>this.platform.pause(),continue:()=>this.platform.continue(),togglePause:()=>this.platform.isPaused?this.platform.continue():this.platform.pause(),play:()=>this.platform.play(),stop:()=>this.platform.stop()};this.device=o({...a,read:s||document.body,write:c})}}function s(){const e=function(){const e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(let t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}();return!!e&&document[e]}n.d(t,"Platform",function(){return f});const a=document.getElementById("source"),c=document.getElementById("message"),d=document.getElementById("score");a.width=window.innerWidth,a.height=window.innerHeight;const l=a.getContext("2d"),u=20,h=Math.floor(a.width/u)-1,p=Math.floor(a.height/u)-1;class f{constructor(e){this.Snake=e.Snake,this.COLOR_BG=e.COLOR_BG||"#000000",this.COLOR_FOOD="#ff06dc",this.INITIAL_SIZE=e.INITIAL_SIZE||7,this.SPEED=100,this.snakes=new Set,this.powerUp=null,this.blocks={},this.controls=new Set,this.isPaused=!1,this.isStarted=!1,this.deadSnakes=0,this.draw()}destroy(){for(let e of this.controls)e.device(),this.controls.delete(e);this.stop()}addSnake(e){const t=new this.Snake(e);return this.snakes.add(t),t}addControl(e,t={}){const n=new o({...t,device:e,platform:this});this.controls.add(n)}async updateSnakes(){for(let e of this.snakes){e.update(),e.x<0&&(e.x=h),e.x>h&&(e.x=0),e.y<0&&(e.y=p),e.y>p&&(e.y=0);const t=this.getBlock(e);if(t){if("kill"===t.action&&!e.isDead)return e.die(),this.deadSnakes++,void(e!==t&&t.kills++);if("grow"===t.action)return e.grow(),this.setBlock(e.head,e),void(this.powerUp=null)}e.move(),e.removedPiece&&this.getBlock(e.removedPiece)===e&&this.setBlock(e.removedPiece,null),this.setBlock(e.head,e)}}async updatePowerUp(){if(!this.powerUp){let e=this.powerUp;for(;!e||this.getBlock(e);)e=await new Promise(e=>requestAnimationFrame(()=>{e({x:Math.floor(Math.random()*Math.floor(h)),y:Math.floor(Math.random()*Math.floor(p)),action:"grow"})}));this.setBlock(e,e),this.powerUp=e}}getBlock({x:e,y:t}){return this.blocks[`${e}_${t}`]}setBlock({x:e,y:t},n){this.blocks[`${e}_${t}`]=n}drawPowerUp(){const e=this.powerUp;if(!e)return;const t=new Path2D;t.rect(e.x*u,e.y*u,u,u),l.fillStyle=this.COLOR_FOOD,l.fill(t)}drawSnake(){for(let e of this.snakes){e.removedPiece&&!this.getBlock(e.removedPiece)&&(l.fillStyle=this.COLOR_BG,l.fill(e.removedPiece));let t=e.pieces.size-1;e.pieces.forEach(n=>{l.fillStyle=e.color(t--),l.fill(n)})}}draw(){l.fillStyle=this.COLOR_BG,l.fillRect(0,0,a.width,a.height),this.drawSnake(),this.drawPowerUp()}continue(){if(this.isStarted&&!this.isPaused)return;this.draw(),this.isStarted=!0,this.isPaused=!1;let e=0;this.interval=setInterval(()=>{if(s())return this.pause();this.updateSnakes(),this.updatePowerUp(),e++>50?(this.draw(),e=0):(this.drawSnake(),this.drawPowerUp()),this.deadSnakes===this.snakes.size&&this.stop()},this.SPEED)}play(){if(!this.isStarted){c.style.display="none";const e=this.controls.values(),t=this.addSnake({name:"Green Snake",size:this.INITIAL_SIZE});e.next().value.snake=t;const n=this.addSnake({name:"Blue Snake",size:this.INITIAL_SIZE,y:p,x:h,direction:"left",nextDirection:"left"});n.color=function(e){return this.isDead&&0===e?"red":e%2==0?"blue":"lightblue"},e.next().value.snake=n}this.continue()}stop(){this.pause(),this.isStarted=!1,d.innerHTML="";for(let e of this.snakes){const t=10*e.kills,n=e.pieces.size-this.INITIAL_SIZE;d.innerHTML+=`<div>${e.name} score is: ${t+n}</div>`}c.style.display="block",this.snakes.clear(),this.powerUp=null,this.deadSnakes=0,this.blocks={}}pause(){this.isPaused=!0,clearInterval(this.interval)}}},tjUo:function(e,t,n){"use strict";n.r(t);var i=n("uvWk"),r=n.n(i),o=n("rF0c"),s=n("aj+U"),a=n("8IbN");const c=n.e(0).then(n.bind(null,"/FaJ"));function d(e,t,n,i){const r=new e({restore:i,Snake:t});return r.addControl(n,{name:"Keyboard"}),r.addControl(n,{name:"Alternative Keyboard",keyMap:{a:"left",s:"down",d:"right",w:"up"}}),window.snakeGame=r,r}let l=d(o.Platform,a.Snake,s.keyboard);r.a.install({onInstalled:function(){0},onUpdating:()=>{console.info("New version available. Updating...")},onUpdateReady:async()=>{const{VERSION:e}=await c;console.info(`Version ${e} installed.`),r.a.applyUpdate()},onUpdated:()=>{0}}),e.hot.accept(["8IbN","rF0c"],function(e){a=n("8IbN"),o=n("rF0c"),(()=>{const{Platform:e}=n("rF0c"),{Snake:t}=n("8IbN"),{keyboard:i}=n("aj+U"),r=l;l=d(e,t,i,l),r.destroy()})()})},uvWk:function(e,t){var n;function i(){return"serviceWorker"in navigator&&(window.fetch||"imageRendering"in document.documentElement.style)&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}function r(){if(i()&&navigator.serviceWorker.getRegistration().then(function(e){if(e)return e.update()}),n)try{n.contentWindow.applicationCache.update()}catch(e){}}setInterval(r,3e4),t.install=function(e){if(e||(e={}),i()){var t=function(e){var t,n,i,o=e.installing||e.waiting;function s(){switch(o.state){case"redundant":r("onUpdateFailed"),o.onstatechange=null;break;case"installing":t||r("onUpdating");break;case"installed":n||r("onUpdateReady");break;case"activated":r("onUpdated"),o.onstatechange=null}}function a(){switch(o.state){case"redundant":o.onstatechange=null;break;case"installing":case"installed":break;case"activated":r("onInstalled"),o.onstatechange=null}}o&&!o.onstatechange&&(e.active?(s(),i=s):(a(),i=a),t=!0,e.waiting&&(n=!0),o.onstatechange=i)},r=function(t){"function"==typeof e[t]&&e[t]({source:"ServiceWorker"})};navigator.serviceWorker.register("sw.js").then(function(e){e&&(t(e),e.onupdatefound=function(){t(e)})}).catch(function(e){return r("onError"),Promise.reject(e)})}else if(window.applicationCache){var o=function(){var t=document.createElement("iframe");window.addEventListener("message",function(n){if(n.source===t.contentWindow){var i=(n.data+"").match(/__offline-plugin_AppCacheEvent:(\w+)/);if(i){var r=i[1];"function"==typeof e[r]&&e[r]({source:"AppCache"})}}}),t.src="appcache/manifest.html",t.style.display="none",n=t,document.body.appendChild(t)};"complete"===document.readyState?setTimeout(o):window.addEventListener("load",o)}},t.applyUpdate=function(e,t){if(i())navigator.serviceWorker.getRegistration().then(function(n){n&&n.waiting?(n.waiting.postMessage({action:"skipWaiting"}),e&&e()):t&&t()});else if(n)try{n.contentWindow.__applyUpdate(),e&&setTimeout(e)}catch(e){t&&setTimeout(t)}},t.update=r}});