var L4=Object.create;var up=Object.defineProperty;var k4=Object.getOwnPropertyDescriptor;var R4=Object.getOwnPropertyNames;var A4=Object.getPrototypeOf,E4=Object.prototype.hasOwnProperty;var P4=(e,t,n)=>t in e?up(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var F4=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ir=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var O4=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of R4(t))!E4.call(e,r)&&r!==n&&up(e,r,{get:()=>t[r],enumerable:!(o=k4(t,r))||o.enumerable});return e};var us=(e,t,n)=>(n=e!=null?L4(A4(e)):{},O4(t||!e||!e.__esModule?up(n,"default",{value:e,enumerable:!0}):n,e));var Hl=(e,t,n)=>P4(e,typeof t!="symbol"?t+"":t,n);var L,u=F4(()=>{L={MODE:"production",PROD:!0,DEV:!1,SSR:!1,BASE_URL:"/",VITE_LOOP_ASSETS_FORCE_REMOTE:"1"}});var mh=Ir((jR,ph)=>{u();ph.exports=new Proxy({},{get:()=>null})});var $h=Ir((JA,Sp)=>{u();typeof Object.create=="function"?Sp.exports=function(t,n){n&&(t.super_=n,t.prototype=Object.create(n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:Sp.exports=function(t,n){if(n){t.super_=n;var o=function(){};o.prototype=n.prototype,t.prototype=new o,t.prototype.constructor=t}}});var Xh=Ir((tE,jh)=>{u();function lo(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}jh.exports=lo;lo.EventEmitter=lo;lo.prototype._events=void 0;lo.prototype._maxListeners=void 0;lo.defaultMaxListeners=10;lo.prototype.setMaxListeners=function(e){if(!s5(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this};lo.prototype.emit=function(e){var t,n,o,r,i,s;if(this._events||(this._events={}),e==="error"&&(!this._events.error||fs(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var l=new Error('Uncaught, unspecified "error" event. ('+t+")");throw l.context=t,l}if(n=this._events[e],qh(n))return!1;if(Br(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:r=Array.prototype.slice.call(arguments,1),n.apply(this,r)}else if(fs(n))for(r=Array.prototype.slice.call(arguments,1),s=n.slice(),o=s.length,i=0;i<o;i++)s[i].apply(this,r);return!0};lo.prototype.addListener=function(e,t){var n;if(!Br(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,Br(t.listener)?t.listener:t),this._events[e]?fs(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,fs(this._events[e])&&!this._events[e].warned&&(qh(this._maxListeners)?n=lo.defaultMaxListeners:n=this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),typeof console.trace=="function"&&console.trace())),this};lo.prototype.on=lo.prototype.addListener;lo.prototype.once=function(e,t){if(!Br(t))throw TypeError("listener must be a function");var n=!1;function o(){this.removeListener(e,o),n||(n=!0,t.apply(this,arguments))}return o.listener=t,this.on(e,o),this};lo.prototype.removeListener=function(e,t){var n,o,r,i;if(!Br(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],r=n.length,o=-1,n===t||Br(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(fs(n)){for(i=r;i-- >0;)if(n[i]===t||n[i].listener&&n[i].listener===t){o=i;break}if(o<0)return this;n.length===1?(n.length=0,delete this._events[e]):n.splice(o,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this};lo.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return arguments.length===0?this._events={}:this._events[e]&&delete this._events[e],this;if(arguments.length===0){for(t in this._events)t!=="removeListener"&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],Br(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this};lo.prototype.listeners=function(e){var t;return!this._events||!this._events[e]?t=[]:Br(this._events[e])?t=[this._events[e]]:t=this._events[e].slice(),t};lo.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(Br(t))return 1;if(t)return t.length}return 0};lo.listenerCount=function(e,t){return e.listenerCount(t)};function Br(e){return typeof e=="function"}function s5(e){return typeof e=="number"}function fs(e){return typeof e=="object"&&e!==null}function qh(e){return e===void 0}});var Kh=Ir((oE,Yh)=>{u();Yh.exports=globalThis.performance&&globalThis.performance.now?function(){return performance.now()}:Date.now||function(){return+new Date}});var Zh=Ir((Qh,hs)=>{u();(function(){var e,t,n,o,r,i;typeof performance<"u"&&performance!==null&&performance.now?hs.exports=function(){return performance.now()}:typeof process<"u"&&process!==null&&process.hrtime?(hs.exports=function(){return(e()-r)/1e6},t=process.hrtime,e=function(){var s;return s=t(),s[0]*1e9+s[1]},o=e(),i=process.uptime()*1e9,r=o-i):Date.now?(hs.exports=function(){return Date.now()-n},n=Date.now()):(hs.exports=function(){return new Date().getTime()-n},n=new Date().getTime())}).call(Qh)});var e_=Ir((iE,Ul)=>{u();var l5=Zh(),Dr=typeof window>"u"?globalThis:window,Wl=["moz","webkit"],mi="AnimationFrame",di=Dr["request"+mi],_s=Dr["cancel"+mi]||Dr["cancelRequest"+mi];for(pi=0;!di&&pi<Wl.length;pi++)di=Dr[Wl[pi]+"Request"+mi],_s=Dr[Wl[pi]+"Cancel"+mi]||Dr[Wl[pi]+"CancelRequest"+mi];var pi;(!di||!_s)&&(Gl=0,wp=0,Jr=[],Jh=1e3/60,di=function(e){if(Jr.length===0){var t=l5(),n=Math.max(0,Jh-(t-Gl));Gl=n+t,setTimeout(function(){var o=Jr.slice(0);Jr.length=0;for(var r=0;r<o.length;r++)if(!o[r].cancelled)try{o[r].callback(Gl)}catch(i){setTimeout(function(){throw i},0)}},Math.round(n))}return Jr.push({handle:++wp,callback:e,cancelled:!1}),wp},_s=function(e){for(var t=0;t<Jr.length;t++)Jr[t].handle===e&&(Jr[t].cancelled=!0)});var Gl,wp,Jr,Jh;Ul.exports=function(e){return di.call(Dr,e)};Ul.exports.cancel=function(){_s.apply(Dr,arguments)};Ul.exports.polyfill=function(e){e||(e=Dr),e.requestAnimationFrame=di,e.cancelAnimationFrame=_s}});var Mp=Ir((lE,t_)=>{u();var c5=$h(),u5=Xh().EventEmitter,Tp=Kh(),Cp=e_();t_.exports=Ma;function Ma(e){if(!(this instanceof Ma))return new Ma(e);this.running=!1,this.last=Tp(),this._frame=0,this._tick=this.tick.bind(this),e&&this.on("tick",e)}c5(Ma,u5);Ma.prototype.start=function(){if(!this.running)return this.running=!0,this.last=Tp(),this._frame=Cp(this._tick),this};Ma.prototype.stop=function(){return this.running=!1,this._frame!==0&&Cp.cancel(this._frame),this._frame=0,this};Ma.prototype.tick=function(){this._frame=Cp(this._tick);var e=Tp(),t=e-this.last;this.emit("tick",t),this.last=e}});var i_=Ir((kp,Rp)=>{u();(function(e,t){typeof kp=="object"&&typeof Rp<"u"?Rp.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis<"u"?globalThis:e||self).Meyda=t()})(kp,(function(){"use strict";function e(A,M,k){if(k||arguments.length===2)for(var p,re=0,we=M.length;re<we;re++)!p&&re in M||(p||(p=Array.prototype.slice.call(M,0,re)),p[re]=M[re]);return A.concat(p||Array.prototype.slice.call(M))}var t=Object.freeze({__proto__:null,blackman:function(A){for(var M=new Float32Array(A),k=2*Math.PI/(A-1),p=2*k,re=0;re<A/2;re++)M[re]=.42-.5*Math.cos(re*k)+.08*Math.cos(re*p);for(re=Math.ceil(A/2);re>0;re--)M[A-re]=M[re-1];return M},hamming:function(A){for(var M=new Float32Array(A),k=0;k<A;k++)M[k]=.54-.46*Math.cos(2*Math.PI*(k/A-1));return M},hanning:function(A){for(var M=new Float32Array(A),k=0;k<A;k++)M[k]=.5-.5*Math.cos(2*Math.PI*k/(A-1));return M},sine:function(A){for(var M=Math.PI/(A-1),k=new Float32Array(A),p=0;p<A;p++)k[p]=Math.sin(M*p);return k}}),n={};function o(A){for(;A%2==0&&A>1;)A/=2;return A===1}function r(A,M){if(M!=="rect"){if(M!==""&&M||(M="hanning"),n[M]||(n[M]={}),!n[M][A.length])try{n[M][A.length]=t[M](A.length)}catch{throw new Error("Invalid windowing function")}A=(function(k,p){for(var re=[],we=0;we<Math.min(k.length,p.length);we++)re[we]=k[we]*p[we];return re})(A,n[M][A.length])}return A}function i(A,M,k){for(var p=new Float32Array(A),re=0;re<p.length;re++)p[re]=re*M/k,p[re]=13*Math.atan(p[re]/1315.8)+3.5*Math.atan(Math.pow(p[re]/7518,2));return p}function s(A){return Float32Array.from(A)}function l(A){return 1125*Math.log(1+A/700)}function m(A,M,k){for(var p,re=new Float32Array(A+2),we=new Float32Array(A+2),Ye=M/2,ze=l(0),Ne=(l(Ye)-ze)/(A+1),qe=new Array(A+2),Je=0;Je<re.length;Je++)re[Je]=Je*Ne,we[Je]=(p=re[Je],700*(Math.exp(p/1125)-1)),qe[Je]=Math.floor((k+1)*we[Je]/M);for(var Ht=new Array(A),et=0;et<Ht.length;et++){for(Ht[et]=new Array(k/2+1).fill(0),Je=qe[et];Je<qe[et+1];Je++)Ht[et][Je]=(Je-qe[et])/(qe[et+1]-qe[et]);for(Je=qe[et+1];Je<qe[et+2];Je++)Ht[et][Je]=(qe[et+2]-Je)/(qe[et+2]-qe[et+1])}return Ht}function d(A,M,k,p,re,we,Ye){p===void 0&&(p=5),re===void 0&&(re=2),we===void 0&&(we=!0),Ye===void 0&&(Ye=440);var ze=Math.floor(k/2)+1,Ne=new Array(k).fill(0).map((function(vt,Ut){return A*(function(tn,$t){return Math.log2(16*tn/$t)})(M*Ut/k,Ye)}));Ne[0]=Ne[1]-1.5*A;var qe,Je,Ht,et=Ne.slice(1).map((function(vt,Ut){return Math.max(vt-Ne[Ut])}),1).concat([1]),Dt=Math.round(A/2),gt=new Array(A).fill(0).map((function(vt,Ut){return Ne.map((function(tn){return(10*A+Dt+tn-Ut)%A-Dt}))})),bt=gt.map((function(vt,Ut){return vt.map((function(tn,$t){return Math.exp(-.5*Math.pow(2*gt[Ut][$t]/et[$t],2))}))}));if(Je=(qe=bt)[0].map((function(){return 0})),Ht=qe.reduce((function(vt,Ut){return Ut.forEach((function(tn,$t){vt[$t]+=Math.pow(tn,2)})),vt}),Je).map(Math.sqrt),bt=qe.map((function(vt,Ut){return vt.map((function(tn,$t){return tn/(Ht[$t]||1)}))})),re){var Pt=Ne.map((function(vt){return Math.exp(-.5*Math.pow((vt/A-p)/re,2))}));bt=bt.map((function(vt){return vt.map((function(Ut,tn){return Ut*Pt[tn]}))}))}return we&&(bt=e(e([],bt.slice(3),!0),bt.slice(0,3),!0)),bt.map((function(vt){return vt.slice(0,ze)}))}function y(A,M){for(var k=0,p=0,re=0;re<M.length;re++)k+=Math.pow(re,A)*Math.abs(M[re]),p+=M[re];return k/p}function D(A){var M=A.ampSpectrum,k=A.barkScale,p=A.numberOfBarkBands,re=p===void 0?24:p;if(typeof M!="object"||typeof k!="object")throw new TypeError;var we=re,Ye=new Float32Array(we),ze=0,Ne=M,qe=new Int32Array(we+1);qe[0]=0;for(var Je=k[Ne.length-1]/we,Ht=1,et=0;et<Ne.length;et++)for(;k[et]>Je;)qe[Ht++]=et,Je=Ht*k[Ne.length-1]/we;for(qe[we]=Ne.length-1,et=0;et<we;et++){for(var Dt=0,gt=qe[et];gt<qe[et+1];gt++)Dt+=Ne[gt];Ye[et]=Math.pow(Dt,.23)}for(et=0;et<Ye.length;et++)ze+=Ye[et];return{specific:Ye,total:ze}}function B(A){var M=A.ampSpectrum;if(typeof M!="object")throw new TypeError;for(var k=new Float32Array(M.length),p=0;p<k.length;p++)k[p]=Math.pow(M[p],2);return k}function O(A){var M=A.ampSpectrum,k=A.melFilterBank,p=A.bufferSize;if(typeof M!="object")throw new TypeError("Valid ampSpectrum is required to generate melBands");if(typeof k!="object")throw new TypeError("Valid melFilterBank is required to generate melBands");for(var re=B({ampSpectrum:M}),we=k.length,Ye=Array(we),ze=new Float32Array(we),Ne=0;Ne<ze.length;Ne++){Ye[Ne]=new Float32Array(p/2),ze[Ne]=0;for(var qe=0;qe<p/2;qe++)Ye[Ne][qe]=k[Ne][qe]*re[qe],ze[Ne]+=Ye[Ne][qe];ze[Ne]=Math.log(ze[Ne]+1)}return Array.prototype.slice.call(ze)}function K(A){return A&&A.__esModule&&Object.prototype.hasOwnProperty.call(A,"default")?A.default:A}var X=null,pe=K((function(A,M){var k=A.length;return M=M||2,X&&X[k]||(function(p){(X=X||{})[p]=new Array(p*p);for(var re=Math.PI/p,we=0;we<p;we++)for(var Ye=0;Ye<p;Ye++)X[p][Ye+we*p]=Math.cos(re*(Ye+.5)*we)})(k),A.map((function(){return 0})).map((function(p,re){return M*A.reduce((function(we,Ye,ze,Ne){return we+Ye*X[k][ze+re*k]}),0)}))})),Re=Object.freeze({__proto__:null,amplitudeSpectrum:function(A){return A.ampSpectrum},buffer:function(A){return A.signal},chroma:function(A){var M=A.ampSpectrum,k=A.chromaFilterBank;if(typeof M!="object")throw new TypeError("Valid ampSpectrum is required to generate chroma");if(typeof k!="object")throw new TypeError("Valid chromaFilterBank is required to generate chroma");var p=k.map((function(we,Ye){return M.reduce((function(ze,Ne,qe){return ze+Ne*we[qe]}),0)})),re=Math.max.apply(Math,p);return re?p.map((function(we){return we/re})):p},complexSpectrum:function(A){return A.complexSpectrum},energy:function(A){var M=A.signal;if(typeof M!="object")throw new TypeError;for(var k=0,p=0;p<M.length;p++)k+=Math.pow(Math.abs(M[p]),2);return k},loudness:D,melBands:O,mfcc:function(A){var M=A.ampSpectrum,k=A.melFilterBank,p=A.numberOfMFCCCoefficients,re=A.bufferSize,we=Math.min(40,Math.max(1,p||13));if(k.length<we)throw new Error("Insufficient filter bank for requested number of coefficients");var Ye=O({ampSpectrum:M,melFilterBank:k,bufferSize:re});return pe(Ye).slice(0,we)},perceptualSharpness:function(A){for(var M=D({ampSpectrum:A.ampSpectrum,barkScale:A.barkScale}),k=M.specific,p=0,re=0;re<k.length;re++)p+=re<15?(re+1)*k[re+1]:.066*Math.exp(.171*(re+1));return p*=.11/M.total},perceptualSpread:function(A){for(var M=D({ampSpectrum:A.ampSpectrum,barkScale:A.barkScale}),k=0,p=0;p<M.specific.length;p++)M.specific[p]>k&&(k=M.specific[p]);return Math.pow((M.total-k)/M.total,2)},powerSpectrum:B,rms:function(A){var M=A.signal;if(typeof M!="object")throw new TypeError;for(var k=0,p=0;p<M.length;p++)k+=Math.pow(M[p],2);return k/=M.length,k=Math.sqrt(k)},spectralCentroid:function(A){var M=A.ampSpectrum;if(typeof M!="object")throw new TypeError;return y(1,M)},spectralCrest:function(A){var M=A.ampSpectrum;if(typeof M!="object")throw new TypeError;var k=0,p=-1/0;return M.forEach((function(re){k+=Math.pow(re,2),p=re>p?re:p})),k/=M.length,k=Math.sqrt(k),p/k},spectralFlatness:function(A){var M=A.ampSpectrum;if(typeof M!="object")throw new TypeError;for(var k=0,p=0,re=0;re<M.length;re++)k+=Math.log(M[re]),p+=M[re];return Math.exp(k/M.length)*M.length/p},spectralFlux:function(A){var M=A.signal,k=A.previousSignal,p=A.bufferSize;if(typeof M!="object"||typeof k!="object")throw new TypeError;for(var re=0,we=-p/2;we<M.length/2-1;we++)x=Math.abs(M[we])-Math.abs(k[we]),re+=(x+Math.abs(x))/2;return re},spectralKurtosis:function(A){var M=A.ampSpectrum;if(typeof M!="object")throw new TypeError;var k=M,p=y(1,k),re=y(2,k),we=y(3,k),Ye=y(4,k);return(-3*Math.pow(p,4)+6*p*re-4*p*we+Ye)/Math.pow(Math.sqrt(re-Math.pow(p,2)),4)},spectralRolloff:function(A){var M=A.ampSpectrum,k=A.sampleRate;if(typeof M!="object")throw new TypeError;for(var p=M,re=k/(2*(p.length-1)),we=0,Ye=0;Ye<p.length;Ye++)we+=p[Ye];for(var ze=.99*we,Ne=p.length-1;we>ze&&Ne>=0;)we-=p[Ne],--Ne;return(Ne+1)*re},spectralSkewness:function(A){var M=A.ampSpectrum;if(typeof M!="object")throw new TypeError;var k=y(1,M),p=y(2,M),re=y(3,M);return(2*Math.pow(k,3)-3*k*p+re)/Math.pow(Math.sqrt(p-Math.pow(k,2)),3)},spectralSlope:function(A){var M=A.ampSpectrum,k=A.sampleRate,p=A.bufferSize;if(typeof M!="object")throw new TypeError;for(var re=0,we=0,Ye=new Float32Array(M.length),ze=0,Ne=0,qe=0;qe<M.length;qe++){re+=M[qe];var Je=qe*k/p;Ye[qe]=Je,ze+=Je*Je,we+=Je,Ne+=Je*M[qe]}return(M.length*Ne-we*re)/(re*(ze-Math.pow(we,2)))},spectralSpread:function(A){var M=A.ampSpectrum;if(typeof M!="object")throw new TypeError;return Math.sqrt(y(2,M)-Math.pow(y(1,M),2))},zcr:function(A){var M=A.signal;if(typeof M!="object")throw new TypeError;for(var k=0,p=1;p<M.length;p++)(M[p-1]>=0&&M[p]<0||M[p-1]<0&&M[p]>=0)&&k++;return k}});function ge(A){if(Array.isArray(A)){for(var M=0,k=Array(A.length);M<A.length;M++)k[M]=A[M];return k}return Array.from(A)}var Fe={},Qe={},Ze={bitReverseArray:function(A){if(Fe[A]===void 0){for(var M=(A-1).toString(2).length,k="0".repeat(M),p={},re=0;re<A;re++){var we=re.toString(2);we=k.substr(we.length)+we,we=[].concat(ge(we)).reverse().join(""),p[re]=parseInt(we,2)}Fe[A]=p}return Fe[A]},multiply:function(A,M){return{real:A.real*M.real-A.imag*M.imag,imag:A.real*M.imag+A.imag*M.real}},add:function(A,M){return{real:A.real+M.real,imag:A.imag+M.imag}},subtract:function(A,M){return{real:A.real-M.real,imag:A.imag-M.imag}},euler:function(A,M){var k=-2*Math.PI*A/M;return{real:Math.cos(k),imag:Math.sin(k)}},conj:function(A){return A.imag*=-1,A},constructComplexArray:function(A){var M={};M.real=A.real===void 0?A.slice():A.real.slice();var k=M.real.length;return Qe[k]===void 0&&(Qe[k]=Array.apply(null,Array(k)).map(Number.prototype.valueOf,0)),M.imag=Qe[k].slice(),M}},dt=function(A){var M={};A.real===void 0||A.imag===void 0?M=Ze.constructComplexArray(A):(M.real=A.real.slice(),M.imag=A.imag.slice());var k=M.real.length,p=Math.log2(k);if(Math.round(p)!=p)throw new Error("Input size must be a power of 2.");if(M.real.length!=M.imag.length)throw new Error("Real and imaginary components must have the same length.");for(var re=Ze.bitReverseArray(k),we={real:[],imag:[]},Ye=0;Ye<k;Ye++)we.real[re[Ye]]=M.real[Ye],we.imag[re[Ye]]=M.imag[Ye];for(var ze=0;ze<k;ze++)M.real[ze]=we.real[ze],M.imag[ze]=we.imag[ze];for(var Ne=1;Ne<=p;Ne++)for(var qe=Math.pow(2,Ne),Je=0;Je<qe/2;Je++)for(var Ht=Ze.euler(Je,qe),et=0;et<k/qe;et++){var Dt=qe*et+Je,gt=qe*et+Je+qe/2,bt={real:M.real[Dt],imag:M.imag[Dt]},Pt={real:M.real[gt],imag:M.imag[gt]},vt=Ze.multiply(Ht,Pt),Ut=Ze.subtract(bt,vt);M.real[gt]=Ut.real,M.imag[gt]=Ut.imag;var tn=Ze.add(vt,bt);M.real[Dt]=tn.real,M.imag[Dt]=tn.imag}return M},Et=dt,at=(function(){function A(M,k){var p=this;if(this._m=k,!M.audioContext)throw this._m.errors.noAC;if(M.bufferSize&&!o(M.bufferSize))throw this._m._errors.notPow2;if(!M.source)throw this._m._errors.noSource;this._m.audioContext=M.audioContext,this._m.bufferSize=M.bufferSize||this._m.bufferSize||256,this._m.hopSize=M.hopSize||this._m.hopSize||this._m.bufferSize,this._m.sampleRate=M.sampleRate||this._m.audioContext.sampleRate||44100,this._m.callback=M.callback,this._m.windowingFunction=M.windowingFunction||"hanning",this._m.featureExtractors=Re,this._m.EXTRACTION_STARTED=M.startImmediately||!1,this._m.channel=typeof M.channel=="number"?M.channel:0,this._m.inputs=M.inputs||1,this._m.outputs=M.outputs||1,this._m.numberOfMFCCCoefficients=M.numberOfMFCCCoefficients||this._m.numberOfMFCCCoefficients||13,this._m.numberOfBarkBands=M.numberOfBarkBands||this._m.numberOfBarkBands||24,this._m.spn=this._m.audioContext.createScriptProcessor(this._m.bufferSize,this._m.inputs,this._m.outputs),this._m.spn.connect(this._m.audioContext.destination),this._m._featuresToExtract=M.featureExtractors||[],this._m.barkScale=i(this._m.bufferSize,this._m.sampleRate,this._m.bufferSize),this._m.melFilterBank=m(Math.max(this._m.melBands,this._m.numberOfMFCCCoefficients),this._m.sampleRate,this._m.bufferSize),this._m.inputData=null,this._m.previousInputData=null,this._m.frame=null,this._m.previousFrame=null,this.setSource(M.source),this._m.spn.onaudioprocess=function(re){var we;p._m.inputData!==null&&(p._m.previousInputData=p._m.inputData),p._m.inputData=re.inputBuffer.getChannelData(p._m.channel),p._m.previousInputData?((we=new Float32Array(p._m.previousInputData.length+p._m.inputData.length-p._m.hopSize)).set(p._m.previousInputData.slice(p._m.hopSize)),we.set(p._m.inputData,p._m.previousInputData.length-p._m.hopSize)):we=p._m.inputData;var Ye=(function(ze,Ne,qe){if(ze.length<Ne)throw new Error("Buffer is too short for frame length");if(qe<1)throw new Error("Hop length cannot be less that 1");if(Ne<1)throw new Error("Frame length cannot be less that 1");var Je=1+Math.floor((ze.length-Ne)/qe);return new Array(Je).fill(0).map((function(Ht,et){return ze.slice(et*qe,et*qe+Ne)}))})(we,p._m.bufferSize,p._m.hopSize);Ye.forEach((function(ze){p._m.frame=ze;var Ne=p._m.extract(p._m._featuresToExtract,p._m.frame,p._m.previousFrame);typeof p._m.callback=="function"&&p._m.EXTRACTION_STARTED&&p._m.callback(Ne),p._m.previousFrame=p._m.frame}))}}return A.prototype.start=function(M){this._m._featuresToExtract=M||this._m._featuresToExtract,this._m.EXTRACTION_STARTED=!0},A.prototype.stop=function(){this._m.EXTRACTION_STARTED=!1},A.prototype.setSource=function(M){this._m.source&&this._m.source.disconnect(this._m.spn),this._m.source=M,this._m.source.connect(this._m.spn)},A.prototype.setChannel=function(M){M<=this._m.inputs?this._m.channel=M:console.error("Channel ".concat(M," does not exist. Make sure you've provided a value for 'inputs' that is greater than ").concat(M," when instantiating the MeydaAnalyzer"))},A.prototype.get=function(M){return this._m.inputData?this._m.extract(M||this._m._featuresToExtract,this._m.inputData,this._m.previousInputData):null},A})(),nt={audioContext:null,spn:null,bufferSize:512,sampleRate:44100,melBands:26,chromaBands:12,callback:null,windowingFunction:"hanning",featureExtractors:Re,EXTRACTION_STARTED:!1,numberOfMFCCCoefficients:13,numberOfBarkBands:24,_featuresToExtract:[],windowing:r,_errors:{notPow2:new Error("Meyda: Buffer size must be a power of 2, e.g. 64 or 512"),featureUndef:new Error("Meyda: No features defined."),invalidFeatureFmt:new Error("Meyda: Invalid feature format"),invalidInput:new Error("Meyda: Invalid input."),noAC:new Error("Meyda: No AudioContext specified."),noSource:new Error("Meyda: No source node specified.")},createMeydaAnalyzer:function(A){return new at(A,Object.assign({},nt))},listAvailableFeatureExtractors:function(){return Object.keys(this.featureExtractors)},extract:function(A,M,k){var p=this;if(!M)throw this._errors.invalidInput;if(typeof M!="object")throw this._errors.invalidInput;if(!A)throw this._errors.featureUndef;if(!o(M.length))throw this._errors.notPow2;this.barkScale!==void 0&&this.barkScale.length==this.bufferSize||(this.barkScale=i(this.bufferSize,this.sampleRate,this.bufferSize)),this.melFilterBank!==void 0&&this.barkScale.length==this.bufferSize&&this.melFilterBank.length==this.melBands||(this.melFilterBank=m(Math.max(this.melBands,this.numberOfMFCCCoefficients),this.sampleRate,this.bufferSize)),this.chromaFilterBank!==void 0&&this.chromaFilterBank.length==this.chromaBands||(this.chromaFilterBank=d(this.chromaBands,this.sampleRate,this.bufferSize)),"buffer"in M&&M.buffer===void 0?this.signal=s(M):this.signal=M;var re=ft(M,this.windowingFunction,this.bufferSize);if(this.signal=re.windowedSignal,this.complexSpectrum=re.complexSpectrum,this.ampSpectrum=re.ampSpectrum,k){var we=ft(k,this.windowingFunction,this.bufferSize);this.previousSignal=we.windowedSignal,this.previousComplexSpectrum=we.complexSpectrum,this.previousAmpSpectrum=we.ampSpectrum}var Ye=function(ze){return p.featureExtractors[ze]({ampSpectrum:p.ampSpectrum,chromaFilterBank:p.chromaFilterBank,complexSpectrum:p.complexSpectrum,signal:p.signal,bufferSize:p.bufferSize,sampleRate:p.sampleRate,barkScale:p.barkScale,melFilterBank:p.melFilterBank,previousSignal:p.previousSignal,previousAmpSpectrum:p.previousAmpSpectrum,previousComplexSpectrum:p.previousComplexSpectrum,numberOfMFCCCoefficients:p.numberOfMFCCCoefficients,numberOfBarkBands:p.numberOfBarkBands})};if(typeof A=="object")return A.reduce((function(ze,Ne){var qe;return Object.assign({},ze,((qe={})[Ne]=Ye(Ne),qe))}),{});if(typeof A=="string")return Ye(A);throw this._errors.invalidFeatureFmt}},ft=function(A,M,k){var p={};A.buffer===void 0?p.signal=s(A):p.signal=A,p.windowedSignal=r(p.signal,M),p.complexSpectrum=Et(p.windowedSignal),p.ampSpectrum=new Float32Array(k/2);for(var re=0;re<k/2;re++)p.ampSpectrum[re]=Math.sqrt(Math.pow(p.complexSpectrum.real[re],2)+Math.pow(p.complexSpectrum.imag[re],2));return p};return typeof window<"u"&&(window.Meyda=nt),nt}))});var y_=Ir((Dp,Np)=>{u();(function(e,t){typeof Dp=="object"&&typeof Np<"u"?Np.exports=t():typeof define=="function"&&define.amd?define(t):e.createREGL=t()})(Dp,(function(){"use strict";var e=function(c){return c instanceof Uint8Array||c instanceof Uint16Array||c instanceof Uint32Array||c instanceof Int8Array||c instanceof Int16Array||c instanceof Int32Array||c instanceof Float32Array||c instanceof Float64Array||c instanceof Uint8ClampedArray},t=function(c,_){for(var C=Object.keys(_),Z=0;Z<C.length;++Z)c[C[Z]]=_[C[Z]];return c},n=`
`;function o(c){return typeof atob<"u"?atob(c):"base64:"+c}function r(c){var _=new Error("(regl) "+c);throw console.error(_),_}function i(c,_){c||r(_)}function s(c){return c?": "+c:""}function l(c,_,C){c in _||r("unknown parameter ("+c+")"+s(C)+". possible values: "+Object.keys(_).join())}function m(c,_){e(c)||r("invalid parameter type"+s(_)+". must be a typed array")}function d(c,_){switch(_){case"number":return typeof c=="number";case"object":return typeof c=="object";case"string":return typeof c=="string";case"boolean":return typeof c=="boolean";case"function":return typeof c=="function";case"undefined":return typeof c>"u";case"symbol":return typeof c=="symbol"}}function y(c,_,C){d(c,_)||r("invalid parameter type"+s(C)+". expected "+_+", got "+typeof c)}function D(c,_){c>=0&&(c|0)===c||r("invalid parameter type, ("+c+")"+s(_)+". must be a nonnegative integer")}function B(c,_,C){_.indexOf(c)<0&&r("invalid value"+s(C)+". must be one of: "+_)}var O=["gl","canvas","container","attributes","pixelRatio","extensions","optionalExtensions","profile","onDone"];function K(c){Object.keys(c).forEach(function(_){O.indexOf(_)<0&&r('invalid regl constructor argument "'+_+'". must be one of '+O)})}function X(c,_){for(c=c+"";c.length<_;)c=" "+c;return c}function pe(){this.name="unknown",this.lines=[],this.index={},this.hasErrors=!1}function Re(c,_){this.number=c,this.line=_,this.errors=[]}function ge(c,_,C){this.file=c,this.line=_,this.message=C}function Fe(){var c=new Error,_=(c.stack||c).toString(),C=/compileProcedure.*\n\s*at.*\((.*)\)/.exec(_);if(C)return C[1];var Z=/compileProcedure.*\n\s*at\s+(.*)(\n|$)/.exec(_);return Z?Z[1]:"unknown"}function Qe(){var c=new Error,_=(c.stack||c).toString(),C=/at REGLCommand.*\n\s+at.*\((.*)\)/.exec(_);if(C)return C[1];var Z=/at REGLCommand.*\n\s+at\s+(.*)\n/.exec(_);return Z?Z[1]:"unknown"}function Ze(c,_){var C=c.split(`
`),Z=1,ce=0,Q={unknown:new pe,0:new pe};Q.unknown.name=Q[0].name=_||Fe(),Q.unknown.lines.push(new Re(0,""));for(var ne=0;ne<C.length;++ne){var be=C[ne],xe=/^\s*#\s*(\w+)\s+(.+)\s*$/.exec(be);if(xe)switch(xe[1]){case"line":var Me=/(\d+)(\s+\d+)?/.exec(xe[2]);Me&&(Z=Me[1]|0,Me[2]&&(ce=Me[2]|0,ce in Q||(Q[ce]=new pe)));break;case"define":var ve=/SHADER_NAME(_B64)?\s+(.*)$/.exec(xe[2]);ve&&(Q[ce].name=ve[1]?o(ve[2]):ve[2]);break}Q[ce].lines.push(new Re(Z++,be))}return Object.keys(Q).forEach(function(Ae){var Be=Q[Ae];Be.lines.forEach(function(ye){Be.index[ye.number]=ye})}),Q}function dt(c){var _=[];return c.split(`
`).forEach(function(C){if(!(C.length<5)){var Z=/^ERROR:\s+(\d+):(\d+):\s*(.*)$/.exec(C);Z?_.push(new ge(Z[1]|0,Z[2]|0,Z[3].trim())):C.length>0&&_.push(new ge("unknown",0,C))}}),_}function Et(c,_){_.forEach(function(C){var Z=c[C.file];if(Z){var ce=Z.index[C.line];if(ce){ce.errors.push(C),Z.hasErrors=!0;return}}c.unknown.hasErrors=!0,c.unknown.lines[0].errors.push(C)})}function at(c,_,C,Z,ce){if(!c.getShaderParameter(_,c.COMPILE_STATUS)){var Q=c.getShaderInfoLog(_),ne=Z===c.FRAGMENT_SHADER?"fragment":"vertex";re(C,"string",ne+" shader source must be a string",ce);var be=Ze(C,ce),xe=dt(Q);Et(be,xe),Object.keys(be).forEach(function(Me){var ve=be[Me];if(!ve.hasErrors)return;var Ae=[""],Be=[""];function ye(Ee,V){Ae.push(Ee),Be.push(V||"")}ye("file number "+Me+": "+ve.name+`
`,"color:red;text-decoration:underline;font-weight:bold"),ve.lines.forEach(function(Ee){if(Ee.errors.length>0){ye(X(Ee.number,4)+"|  ","background-color:yellow; font-weight:bold"),ye(Ee.line+n,"color:red; background-color:yellow; font-weight:bold");var V=0;Ee.errors.forEach(function(oe){var Ce=oe.message,Ge=/^\s*'(.*)'\s*:\s*(.*)$/.exec(Ce);if(Ge){var de=Ge[1];Ce=Ge[2],de==="assign"&&(de="="),V=Math.max(Ee.line.indexOf(de,V),0)}else V=0;ye(X("| ",6)),ye(X("^^^",V+3)+n,"font-weight:bold"),ye(X("| ",6)),ye(Ce+n,"font-weight:bold")}),ye(X("| ",6)+n)}else ye(X(Ee.number,4)+"|  "),ye(Ee.line+n,"color:red")}),typeof document<"u"&&!window.chrome?(Be[0]=Ae.join("%c"),console.log.apply(console,Be)):console.log(Ae.join(""))}),i.raise("Error compiling "+ne+" shader, "+be[0].name)}}function nt(c,_,C,Z,ce){if(!c.getProgramParameter(_,c.LINK_STATUS)){var Q=c.getProgramInfoLog(_),ne=Ze(C,ce),be=Ze(Z,ce),xe='Error linking program with vertex shader, "'+be[0].name+'", and fragment shader "'+ne[0].name+'"';typeof document<"u"?console.log("%c"+xe+n+"%c"+Q,"color:red;text-decoration:underline;font-weight:bold","color:red"):console.log(xe+n+Q),i.raise(xe)}}function ft(c){c._commandRef=Fe()}function A(c,_,C,Z){ft(c);function ce(xe){return xe?Z.id(xe):0}c._fragId=ce(c.static.frag),c._vertId=ce(c.static.vert);function Q(xe,Me){Object.keys(Me).forEach(function(ve){xe[Z.id(ve)]=!0})}var ne=c._uniformSet={};Q(ne,_.static),Q(ne,_.dynamic);var be=c._attributeSet={};Q(be,C.static),Q(be,C.dynamic),c._hasCount="count"in c.static||"count"in c.dynamic||"elements"in c.static||"elements"in c.dynamic}function M(c,_){var C=Qe();r(c+" in command "+(_||Fe())+(C==="unknown"?"":" called from "+C))}function k(c,_,C){c||M(_,C||Fe())}function p(c,_,C,Z){c in _||M("unknown parameter ("+c+")"+s(C)+". possible values: "+Object.keys(_).join(),Z||Fe())}function re(c,_,C,Z){d(c,_)||M("invalid parameter type"+s(C)+". expected "+_+", got "+typeof c,Z||Fe())}function we(c){c()}function Ye(c,_,C){c.texture?B(c.texture._texture.internalformat,_,"unsupported texture format for attachment"):B(c.renderbuffer._renderbuffer.format,C,"unsupported renderbuffer format for attachment")}var ze=33071,Ne=9728,qe=9984,Je=9985,Ht=9986,et=9987,Dt=5120,gt=5121,bt=5122,Pt=5123,vt=5124,Ut=5125,tn=5126,$t=32819,bn=32820,vn=33635,mo=34042,Ft=36193,on={};on[Dt]=on[gt]=1,on[bt]=on[Pt]=on[Ft]=on[vn]=on[$t]=on[bn]=2,on[vt]=on[Ut]=on[tn]=on[mo]=4;function Un(c,_){return c===bn||c===$t||c===vn?2:c===mo?4:on[c]*_}function lt(c){return!(c&c-1)&&!!c}function Pn(c,_,C){var Z,ce=_.width,Q=_.height,ne=_.channels;i(ce>0&&ce<=C.maxTextureSize&&Q>0&&Q<=C.maxTextureSize,"invalid texture shape"),(c.wrapS!==ze||c.wrapT!==ze)&&i(lt(ce)&&lt(Q),"incompatible wrap mode for texture, both width and height must be power of 2"),_.mipmask===1?ce!==1&&Q!==1&&i(c.minFilter!==qe&&c.minFilter!==Ht&&c.minFilter!==Je&&c.minFilter!==et,"min filter requires mipmap"):(i(lt(ce)&&lt(Q),"texture must be a square power of 2 to support mipmapping"),i(_.mipmask===(ce<<1)-1,"missing or incomplete mipmap data")),_.type===tn&&(C.extensions.indexOf("oes_texture_float_linear")<0&&i(c.minFilter===Ne&&c.magFilter===Ne,"filter not supported, must enable oes_texture_float_linear"),i(!c.genMipmaps,"mipmap generation not supported with float textures"));var be=_.images;for(Z=0;Z<16;++Z)if(be[Z]){var xe=ce>>Z,Me=Q>>Z;i(_.mipmask&1<<Z,"missing mipmap data");var ve=be[Z];if(i(ve.width===xe&&ve.height===Me,"invalid shape for mip images"),i(ve.format===_.format&&ve.internalformat===_.internalformat&&ve.type===_.type,"incompatible type for mip image"),!ve.compressed)if(ve.data){var Ae=Math.ceil(Un(ve.type,ne)*xe/ve.unpackAlignment)*ve.unpackAlignment;i(ve.data.byteLength===Ae*Me,"invalid data for image, buffer size is inconsistent with image format")}else ve.element||ve.copy}else c.genMipmaps||i((_.mipmask&1<<Z)===0,"extra mipmap data");_.compressed&&i(!c.genMipmaps,"mipmap generation for compressed images not supported")}function Mt(c,_,C,Z){var ce=c.width,Q=c.height,ne=c.channels;i(ce>0&&ce<=Z.maxTextureSize&&Q>0&&Q<=Z.maxTextureSize,"invalid texture shape"),i(ce===Q,"cube map must be square"),i(_.wrapS===ze&&_.wrapT===ze,"wrap mode not supported by cube map");for(var be=0;be<C.length;++be){var xe=C[be];i(xe.width===ce&&xe.height===Q,"inconsistent cube map face shape"),_.genMipmaps&&(i(!xe.compressed,"can not generate mipmap for compressed textures"),i(xe.mipmask===1,"can not specify mipmaps and generate mipmaps"));for(var Me=xe.images,ve=0;ve<16;++ve){var Ae=Me[ve];if(Ae){var Be=ce>>ve,ye=Q>>ve;i(xe.mipmask&1<<ve,"missing mipmap data"),i(Ae.width===Be&&Ae.height===ye,"invalid shape for mip images"),i(Ae.format===c.format&&Ae.internalformat===c.internalformat&&Ae.type===c.type,"incompatible type for mip image"),Ae.compressed||(Ae.data?i(Ae.data.byteLength===Be*ye*Math.max(Un(Ae.type,ne),Ae.unpackAlignment),"invalid data for image, buffer size is inconsistent with image format"):Ae.element||Ae.copy)}}}}var h=t(i,{optional:we,raise:r,commandRaise:M,command:k,parameter:l,commandParameter:p,constructor:K,type:y,commandType:re,isTypedArray:m,nni:D,oneOf:B,shaderError:at,linkError:nt,callSite:Qe,saveCommandRef:ft,saveDrawInfo:A,framebufferFormat:Ye,guessCommand:Fe,texture2D:Pn,textureCube:Mt}),Fn=0,Zn=0,Sn=5,On=6;function Hn(c,_){this.id=Fn++,this.type=c,this.data=_}function Qt(c){return c.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function rn(c){if(c.length===0)return[];var _=c.charAt(0),C=c.charAt(c.length-1);if(c.length>1&&_===C&&(_==='"'||_==="'"))return['"'+Qt(c.substr(1,c.length-2))+'"'];var Z=/\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(c);if(Z)return rn(c.substr(0,Z.index)).concat(rn(Z[1])).concat(rn(c.substr(Z.index+Z[0].length)));var ce=c.split(".");if(ce.length===1)return['"'+Qt(c)+'"'];for(var Q=[],ne=0;ne<ce.length;++ne)Q=Q.concat(rn(ce[ne]));return Q}function wn(c){return"["+rn(c).join("][")+"]"}function an(c,_){return new Hn(c,wn(_+""))}function Tn(c){return typeof c=="function"&&!c._reglType||c instanceof Hn}function Mn(c,_){if(typeof c=="function")return new Hn(Zn,c);if(typeof c=="number"||typeof c=="boolean")return new Hn(Sn,c);if(Array.isArray(c))return new Hn(On,c.map((C,Z)=>Mn(C,_+"["+Z+"]")));if(c instanceof Hn)return c;h(!1,"invalid option type in uniform "+_)}var xn={DynamicVariable:Hn,define:an,isDynamic:Tn,unbox:Mn,accessor:wn},Jn={next:typeof requestAnimationFrame=="function"?function(c){return requestAnimationFrame(c)}:function(c){return setTimeout(c,16)},cancel:typeof cancelAnimationFrame=="function"?function(c){return cancelAnimationFrame(c)}:clearTimeout},Go=typeof performance<"u"&&performance.now?function(){return performance.now()}:function(){return+new Date};function no(){var c={"":0},_=[""];return{id:function(C){var Z=c[C];return Z||(Z=c[C]=_.length,_.push(C),Z)},str:function(C){return _[C]}}}function er(c,_,C){var Z=document.createElement("canvas");t(Z.style,{border:0,margin:0,padding:0,top:0,left:0}),c.appendChild(Z),c===document.body&&(Z.style.position="absolute",t(c.style,{margin:0,padding:0}));function ce(){var be=window.innerWidth,xe=window.innerHeight;if(c!==document.body){var Me=c.getBoundingClientRect();be=Me.right-Me.left,xe=Me.bottom-Me.top}Z.width=C*be,Z.height=C*xe,t(Z.style,{width:be+"px",height:xe+"px"})}var Q;c!==document.body&&typeof ResizeObserver=="function"?(Q=new ResizeObserver(function(){setTimeout(ce)}),Q.observe(c)):window.addEventListener("resize",ce,!1);function ne(){Q?Q.disconnect():window.removeEventListener("resize",ce),c.removeChild(Z)}return ce(),{canvas:Z,onDestroy:ne}}function oo(c,_){function C(Z){try{return c.getContext(Z,_)}catch{return null}}return C("webgl")||C("experimental-webgl")||C("webgl-experimental")}function Vr(c){return typeof c.nodeName=="string"&&typeof c.appendChild=="function"&&typeof c.getBoundingClientRect=="function"}function Rr(c){return typeof c.drawArrays=="function"||typeof c.drawElements=="function"}function Ar(c){return typeof c=="string"?c.split():(h(Array.isArray(c),"invalid extension array"),c)}function bo(c){return typeof c=="string"?(h(typeof document<"u","not supported outside of DOM"),document.querySelector(c)):c}function $r(c){var _=c||{},C,Z,ce,Q,ne={},be=[],xe=[],Me=typeof window>"u"?1:window.devicePixelRatio,ve=!1,Ae=function(Ee){Ee&&h.raise(Ee)},Be=function(){};if(typeof _=="string"?(h(typeof document<"u","selector queries only supported in DOM enviroments"),C=document.querySelector(_),h(C,"invalid query string for element")):typeof _=="object"?Vr(_)?C=_:Rr(_)?(Q=_,ce=Q.canvas):(h.constructor(_),"gl"in _?Q=_.gl:"canvas"in _?ce=bo(_.canvas):"container"in _&&(Z=bo(_.container)),"attributes"in _&&(ne=_.attributes,h.type(ne,"object","invalid context attributes")),"extensions"in _&&(be=Ar(_.extensions)),"optionalExtensions"in _&&(xe=Ar(_.optionalExtensions)),"onDone"in _&&(h.type(_.onDone,"function","invalid or missing onDone callback"),Ae=_.onDone),"profile"in _&&(ve=!!_.profile),"pixelRatio"in _&&(Me=+_.pixelRatio,h(Me>0,"invalid pixel ratio"))):h.raise("invalid arguments to regl"),C&&(C.nodeName.toLowerCase()==="canvas"?ce=C:Z=C),!Q){if(!ce){h(typeof document<"u","must manually specify webgl context outside of DOM environments");var ye=er(Z||document.body,Ae,Me);if(!ye)return null;ce=ye.canvas,Be=ye.onDestroy}ne.premultipliedAlpha===void 0&&(ne.premultipliedAlpha=!0),Q=oo(ce,ne)}return Q?{gl:Q,canvas:ce,container:Z,extensions:be,optionalExtensions:xe,pixelRatio:Me,profile:ve,onDone:Ae,onDestroy:Be}:(Be(),Ae("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"),null)}function tr(c,_){var C={};function Z(ne){h.type(ne,"string","extension name must be string");var be=ne.toLowerCase(),xe;try{xe=C[be]=c.getExtension(be)}catch{}return!!xe}for(var ce=0;ce<_.extensions.length;++ce){var Q=_.extensions[ce];if(!Z(Q))return _.onDestroy(),_.onDone('"'+Q+'" extension is not supported by the current WebGL context, try upgrading your system or a different browser'),null}return _.optionalExtensions.forEach(Z),{extensions:C,restore:function(){Object.keys(C).forEach(function(ne){if(C[ne]&&!Z(ne))throw new Error("(regl): error restoring extension "+ne)})}}}function un(c,_){for(var C=Array(c),Z=0;Z<c;++Z)C[Z]=_(Z);return C}var Uo=5120,nr=5121,pr=5122,Yn=5123,mr=5124,zo=5125,F=5126;function Bo(c){for(var _=16;_<=1<<28;_*=16)if(c<=_)return _;return 0}function Ie(c){var _,C;return _=(c>65535)<<4,c>>>=_,C=(c>255)<<3,c>>>=C,_|=C,C=(c>15)<<2,c>>>=C,_|=C,C=(c>3)<<1,c>>>=C,_|=C,_|c>>1}function it(){var c=un(8,function(){return[]});function _(Q){var ne=Bo(Q),be=c[Ie(ne)>>2];return be.length>0?be.pop():new ArrayBuffer(ne)}function C(Q){c[Ie(Q.byteLength)>>2].push(Q)}function Z(Q,ne){var be=null;switch(Q){case Uo:be=new Int8Array(_(ne),0,ne);break;case nr:be=new Uint8Array(_(ne),0,ne);break;case pr:be=new Int16Array(_(2*ne),0,ne);break;case Yn:be=new Uint16Array(_(2*ne),0,ne);break;case mr:be=new Int32Array(_(4*ne),0,ne);break;case zo:be=new Uint32Array(_(4*ne),0,ne);break;case F:be=new Float32Array(_(4*ne),0,ne);break;default:return null}return be.length!==ne?be.subarray(0,ne):be}function ce(Q){C(Q.buffer)}return{alloc:_,free:C,allocType:Z,freeType:ce}}var We=it();We.zero=it();var ke=3408,St=3410,en=3411,pt=3412,At=3413,wt=3414,pn=3415,eo=33901,fo=33902,yo=3379,_t=3386,Ct=34921,Xt=36347,zt=36348,mn=35661,Er=35660,sn=34930,Co=36349,or=34076,Va=34024,ma=7936,qi=7937,zn=7938,dr=35724,fr=34047,Ro=36063,qr=34852,hr=3553,Ao=34067,rr=34069,_r=33984,Pr=6408,g=5126,Pe=5121,T=36160,I=36053,W=36064,q=16384,te=function(c,_){var C=1;_.ext_texture_filter_anisotropic&&(C=c.getParameter(fr));var Z=1,ce=1;_.webgl_draw_buffers&&(Z=c.getParameter(qr),ce=c.getParameter(Ro));var Q=!!_.oes_texture_float;if(Q){var ne=c.createTexture();c.bindTexture(hr,ne),c.texImage2D(hr,0,Pr,1,1,0,Pr,g,null);var be=c.createFramebuffer();if(c.bindFramebuffer(T,be),c.framebufferTexture2D(T,W,hr,ne,0),c.bindTexture(hr,null),c.checkFramebufferStatus(T)!==I)Q=!1;else{c.viewport(0,0,1,1),c.clearColor(1,0,0,1),c.clear(q);var xe=We.allocType(g,4);c.readPixels(0,0,1,1,Pr,g,xe),c.getError()?Q=!1:(c.deleteFramebuffer(be),c.deleteTexture(ne),Q=xe[0]===1),We.freeType(xe)}}var Me=typeof navigator<"u"&&(/MSIE/.test(navigator.userAgent)||/Trident\//.test(navigator.appVersion)||/Edge/.test(navigator.userAgent)),ve=!0;if(!Me){var Ae=c.createTexture(),Be=We.allocType(Pe,36);c.activeTexture(_r),c.bindTexture(Ao,Ae),c.texImage2D(rr,0,Pr,3,3,0,Pr,Pe,Be),We.freeType(Be),c.bindTexture(Ao,null),c.deleteTexture(Ae),ve=!c.getError()}return{colorBits:[c.getParameter(St),c.getParameter(en),c.getParameter(pt),c.getParameter(At)],depthBits:c.getParameter(wt),stencilBits:c.getParameter(pn),subpixelBits:c.getParameter(ke),extensions:Object.keys(_).filter(function(ye){return!!_[ye]}),maxAnisotropic:C,maxDrawbuffers:Z,maxColorAttachments:ce,pointSizeDims:c.getParameter(eo),lineWidthDims:c.getParameter(fo),maxViewportDims:c.getParameter(_t),maxCombinedTextureUnits:c.getParameter(mn),maxCubeMapSize:c.getParameter(or),maxRenderbufferSize:c.getParameter(Va),maxTextureUnits:c.getParameter(sn),maxTextureSize:c.getParameter(yo),maxAttributes:c.getParameter(Ct),maxVertexUniforms:c.getParameter(Xt),maxVertexTextureUnits:c.getParameter(Er),maxVaryingVectors:c.getParameter(zt),maxFragmentUniforms:c.getParameter(Co),glsl:c.getParameter(dr),renderer:c.getParameter(qi),vendor:c.getParameter(ma),version:c.getParameter(zn),readFloat:Q,npotTextureCube:ve}};function se(c){return!!c&&typeof c=="object"&&Array.isArray(c.shape)&&Array.isArray(c.stride)&&typeof c.offset=="number"&&c.shape.length===c.stride.length&&(Array.isArray(c.data)||e(c.data))}var _e=function(c){return Object.keys(c).map(function(_){return c[_]})},Ue={shape:yn,flatten:Jt};function Ke(c,_,C){for(var Z=0;Z<_;++Z)C[Z]=c[Z]}function st(c,_,C,Z){for(var ce=0,Q=0;Q<_;++Q)for(var ne=c[Q],be=0;be<C;++be)Z[ce++]=ne[be]}function ht(c,_,C,Z,ce,Q){for(var ne=Q,be=0;be<_;++be)for(var xe=c[be],Me=0;Me<C;++Me)for(var ve=xe[Me],Ae=0;Ae<Z;++Ae)ce[ne++]=ve[Ae]}function Yt(c,_,C,Z,ce){for(var Q=1,ne=C+1;ne<_.length;++ne)Q*=_[ne];var be=_[C];if(_.length-C===4){var xe=_[C+1],Me=_[C+2],ve=_[C+3];for(ne=0;ne<be;++ne)ht(c[ne],xe,Me,ve,Z,ce),ce+=Q}else for(ne=0;ne<be;++ne)Yt(c[ne],_,C+1,Z,ce),ce+=Q}function Jt(c,_,C,Z){var ce=1;if(_.length)for(var Q=0;Q<_.length;++Q)ce*=_[Q];else ce=0;var ne=Z||We.allocType(C,ce);switch(_.length){case 0:break;case 1:Ke(c,_[0],ne);break;case 2:st(c,_[0],_[1],ne);break;case 3:ht(c,_[0],_[1],_[2],ne,0);break;default:Yt(c,_,0,ne,0)}return ne}function yn(c){for(var _=[],C=c;C.length;C=C[0])_.push(C.length);return _}var Ln={"[object Int8Array]":5120,"[object Int16Array]":5122,"[object Int32Array]":5124,"[object Uint8Array]":5121,"[object Uint8ClampedArray]":5121,"[object Uint16Array]":5123,"[object Uint32Array]":5125,"[object Float32Array]":5126,"[object Float64Array]":5121,"[object ArrayBuffer]":5121},Gt=5120,nn=5122,gr=5124,Vo=5121,$a=5123,br=5125,ji=5126,qa=5126,Fr={int8:Gt,int16:nn,int32:gr,uint8:Vo,uint16:$a,uint32:br,float:ji,float32:qa},TS=35048,CS=35040,ll={dynamic:TS,stream:CS,static:35044},bu=Ue.flatten,wf=Ue.shape,Tf=35044,MS=35040,yu=5121,xu=5126,jr=[];jr[5120]=1,jr[5122]=2,jr[5124]=4,jr[5121]=1,jr[5123]=2,jr[5125]=4,jr[5126]=4;function cl(c){return Ln[Object.prototype.toString.call(c)]|0}function Cf(c,_){for(var C=0;C<_.length;++C)c[C]=_[C]}function Mf(c,_,C,Z,ce,Q,ne){for(var be=0,xe=0;xe<C;++xe)for(var Me=0;Me<Z;++Me)c[be++]=_[ce*xe+Q*Me+ne]}function LS(c,_,C,Z){var ce=0,Q={};function ne(V){this.id=ce++,this.buffer=c.createBuffer(),this.type=V,this.usage=Tf,this.byteLength=0,this.dimension=1,this.dtype=yu,this.persistentData=null,C.profile&&(this.stats={size:0})}ne.prototype.bind=function(){c.bindBuffer(this.type,this.buffer)},ne.prototype.destroy=function(){Be(this)};var be=[];function xe(V,oe){var Ce=be.pop();return Ce||(Ce=new ne(V)),Ce.bind(),Ae(Ce,oe,MS,0,1,!1),Ce}function Me(V){be.push(V)}function ve(V,oe,Ce){V.byteLength=oe.byteLength,c.bufferData(V.type,oe,Ce)}function Ae(V,oe,Ce,Ge,de,Ve){var he;if(V.usage=Ce,Array.isArray(oe)){if(V.dtype=Ge||xu,oe.length>0){var Oe;if(Array.isArray(oe[0])){he=wf(oe);for(var fe=1,He=1;He<he.length;++He)fe*=he[He];V.dimension=fe,Oe=bu(oe,he,V.dtype),ve(V,Oe,Ce),Ve?V.persistentData=Oe:We.freeType(Oe)}else if(typeof oe[0]=="number"){V.dimension=de;var rt=We.allocType(V.dtype,oe.length);Cf(rt,oe),ve(V,rt,Ce),Ve?V.persistentData=rt:We.freeType(rt)}else e(oe[0])?(V.dimension=oe[0].length,V.dtype=Ge||cl(oe[0])||xu,Oe=bu(oe,[oe.length,oe[0].length],V.dtype),ve(V,Oe,Ce),Ve?V.persistentData=Oe:We.freeType(Oe)):h.raise("invalid buffer data")}}else if(e(oe))V.dtype=Ge||cl(oe),V.dimension=de,ve(V,oe,Ce),Ve&&(V.persistentData=new Uint8Array(new Uint8Array(oe.buffer)));else if(se(oe)){he=oe.shape;var yt=oe.stride,De=oe.offset,Le=0,me=0,mt=0,Lt=0;he.length===1?(Le=he[0],me=1,mt=yt[0],Lt=0):he.length===2?(Le=he[0],me=he[1],mt=yt[0],Lt=yt[1]):h.raise("invalid shape"),V.dtype=Ge||cl(oe.data)||xu,V.dimension=me;var je=We.allocType(V.dtype,Le*me);Mf(je,oe.data,Le,me,mt,Lt,De),ve(V,je,Ce),Ve?V.persistentData=je:We.freeType(je)}else oe instanceof ArrayBuffer?(V.dtype=yu,V.dimension=de,ve(V,oe,Ce),Ve&&(V.persistentData=new Uint8Array(new Uint8Array(oe)))):h.raise("invalid buffer data")}function Be(V){_.bufferCount--,Z(V);var oe=V.buffer;h(oe,"buffer must not be deleted already"),c.deleteBuffer(oe),V.buffer=null,delete Q[V.id]}function ye(V,oe,Ce,Ge){_.bufferCount++;var de=new ne(oe);Q[de.id]=de;function Ve(fe){var He=Tf,rt=null,yt=0,De=0,Le=1;return Array.isArray(fe)||e(fe)||se(fe)||fe instanceof ArrayBuffer?rt=fe:typeof fe=="number"?yt=fe|0:fe&&(h.type(fe,"object","buffer arguments must be an object, a number or an array"),"data"in fe&&(h(rt===null||Array.isArray(rt)||e(rt)||se(rt),"invalid data for buffer"),rt=fe.data),"usage"in fe&&(h.parameter(fe.usage,ll,"invalid buffer usage"),He=ll[fe.usage]),"type"in fe&&(h.parameter(fe.type,Fr,"invalid buffer type"),De=Fr[fe.type]),"dimension"in fe&&(h.type(fe.dimension,"number","invalid dimension"),Le=fe.dimension|0),"length"in fe&&(h.nni(yt,"buffer length must be a nonnegative integer"),yt=fe.length|0)),de.bind(),rt?Ae(de,rt,He,De,Le,Ge):(yt&&c.bufferData(de.type,yt,He),de.dtype=De||yu,de.usage=He,de.dimension=Le,de.byteLength=yt),C.profile&&(de.stats.size=de.byteLength*jr[de.dtype]),Ve}function he(fe,He){h(He+fe.byteLength<=de.byteLength,"invalid buffer subdata call, buffer is too small.  Can't write data of size "+fe.byteLength+" starting from offset "+He+" to a buffer of size "+de.byteLength),c.bufferSubData(de.type,He,fe)}function Oe(fe,He){var rt=(He||0)|0,yt;if(de.bind(),e(fe)||fe instanceof ArrayBuffer)he(fe,rt);else if(Array.isArray(fe)){if(fe.length>0)if(typeof fe[0]=="number"){var De=We.allocType(de.dtype,fe.length);Cf(De,fe),he(De,rt),We.freeType(De)}else if(Array.isArray(fe[0])||e(fe[0])){yt=wf(fe);var Le=bu(fe,yt,de.dtype);he(Le,rt),We.freeType(Le)}else h.raise("invalid buffer data")}else if(se(fe)){yt=fe.shape;var me=fe.stride,mt=0,Lt=0,je=0,It=0;yt.length===1?(mt=yt[0],Lt=1,je=me[0],It=0):yt.length===2?(mt=yt[0],Lt=yt[1],je=me[0],It=me[1]):h.raise("invalid shape");var xt=Array.isArray(fe.data)?de.dtype:cl(fe.data),Ot=We.allocType(xt,mt*Lt);Mf(Ot,fe.data,mt,Lt,je,It,fe.offset),he(Ot,rt),We.freeType(Ot)}else h.raise("invalid data for buffer subdata");return Ve}return Ce||Ve(V),Ve._reglType="buffer",Ve._buffer=de,Ve.subdata=Oe,C.profile&&(Ve.stats=de.stats),Ve.destroy=function(){Be(de)},Ve}function Ee(){_e(Q).forEach(function(V){V.buffer=c.createBuffer(),c.bindBuffer(V.type,V.buffer),c.bufferData(V.type,V.persistentData||V.byteLength,V.usage)})}return C.profile&&(_.getTotalBufferSize=function(){var V=0;return Object.keys(Q).forEach(function(oe){V+=Q[oe].stats.size}),V}),{create:ye,createStream:xe,destroyStream:Me,clear:function(){_e(Q).forEach(Be),be.forEach(Be)},getBuffer:function(V){return V&&V._buffer instanceof ne?V._buffer:null},restore:Ee,_initBuffer:Ae}}var kS=0,RS=0,AS=1,ES=1,PS=4,FS=4,ja={points:kS,point:RS,lines:AS,line:ES,triangles:PS,triangle:FS,"line loop":2,"line strip":3,"triangle strip":5,"triangle fan":6},OS=0,HS=1,Xi=4,IS=5120,Xa=5121,Lf=5122,Ya=5123,kf=5124,da=5125,vu=34963,BS=35040,DS=35044;function NS(c,_,C,Z){var ce={},Q=0,ne={uint8:Xa,uint16:Ya};_.oes_element_index_uint&&(ne.uint32=da);function be(Ee){this.id=Q++,ce[this.id]=this,this.buffer=Ee,this.primType=Xi,this.vertCount=0,this.type=0}be.prototype.bind=function(){this.buffer.bind()};var xe=[];function Me(Ee){var V=xe.pop();return V||(V=new be(C.create(null,vu,!0,!1)._buffer)),Ae(V,Ee,BS,-1,-1,0,0),V}function ve(Ee){xe.push(Ee)}function Ae(Ee,V,oe,Ce,Ge,de,Ve){Ee.buffer.bind();var he;if(V){var Oe=Ve;!Ve&&(!e(V)||se(V)&&!e(V.data))&&(Oe=_.oes_element_index_uint?da:Ya),C._initBuffer(Ee.buffer,V,oe,Oe,3)}else c.bufferData(vu,de,oe),Ee.buffer.dtype=he||Xa,Ee.buffer.usage=oe,Ee.buffer.dimension=3,Ee.buffer.byteLength=de;if(he=Ve,!Ve){switch(Ee.buffer.dtype){case Xa:case IS:he=Xa;break;case Ya:case Lf:he=Ya;break;case da:case kf:he=da;break;default:h.raise("unsupported type for element array")}Ee.buffer.dtype=he}Ee.type=he,h(he!==da||!!_.oes_element_index_uint,"32 bit element buffers not supported, enable oes_element_index_uint first");var fe=Ge;fe<0&&(fe=Ee.buffer.byteLength,he===Ya?fe>>=1:he===da&&(fe>>=2)),Ee.vertCount=fe;var He=Ce;if(Ce<0){He=Xi;var rt=Ee.buffer.dimension;rt===1&&(He=OS),rt===2&&(He=HS),rt===3&&(He=Xi)}Ee.primType=He}function Be(Ee){Z.elementsCount--,h(Ee.buffer!==null,"must not double destroy elements"),delete ce[Ee.id],Ee.buffer.destroy(),Ee.buffer=null}function ye(Ee,V){var oe=C.create(null,vu,!0),Ce=new be(oe._buffer);Z.elementsCount++;function Ge(de){if(!de)oe(),Ce.primType=Xi,Ce.vertCount=0,Ce.type=Xa;else if(typeof de=="number")oe(de),Ce.primType=Xi,Ce.vertCount=de|0,Ce.type=Xa;else{var Ve=null,he=DS,Oe=-1,fe=-1,He=0,rt=0;Array.isArray(de)||e(de)||se(de)?Ve=de:(h.type(de,"object","invalid arguments for elements"),"data"in de&&(Ve=de.data,h(Array.isArray(Ve)||e(Ve)||se(Ve),"invalid data for element buffer")),"usage"in de&&(h.parameter(de.usage,ll,"invalid element buffer usage"),he=ll[de.usage]),"primitive"in de&&(h.parameter(de.primitive,ja,"invalid element buffer primitive"),Oe=ja[de.primitive]),"count"in de&&(h(typeof de.count=="number"&&de.count>=0,"invalid vertex count for elements"),fe=de.count|0),"type"in de&&(h.parameter(de.type,ne,"invalid buffer type"),rt=ne[de.type]),"length"in de?He=de.length|0:(He=fe,rt===Ya||rt===Lf?He*=2:(rt===da||rt===kf)&&(He*=4))),Ae(Ce,Ve,he,Oe,fe,He,rt)}return Ge}return Ge(Ee),Ge._reglType="elements",Ge._elements=Ce,Ge.subdata=function(de,Ve){return oe.subdata(de,Ve),Ge},Ge.destroy=function(){Be(Ce)},Ge}return{create:ye,createStream:Me,destroyStream:ve,getElements:function(Ee){return typeof Ee=="function"&&Ee._elements instanceof be?Ee._elements:null},clear:function(){_e(ce).forEach(Be)}}}var Rf=new Float32Array(1),WS=new Uint32Array(Rf.buffer),GS=5123;function Af(c){for(var _=We.allocType(GS,c.length),C=0;C<c.length;++C)if(isNaN(c[C]))_[C]=65535;else if(c[C]===1/0)_[C]=31744;else if(c[C]===-1/0)_[C]=64512;else{Rf[0]=c[C];var Z=WS[0],ce=Z>>>31<<15,Q=(Z<<1>>>24)-127,ne=Z>>13&1023;if(Q<-24)_[C]=ce;else if(Q<-14){var be=-14-Q;_[C]=ce+(ne+1024>>be)}else Q>15?_[C]=ce+31744:_[C]=ce+(Q+15<<10)+ne}return _}function kn(c){return Array.isArray(c)||e(c)}var Ef=function(c){return!(c&c-1)&&!!c},US=34467,yr=3553,Su=34067,ul=34069,fa=6408,wu=6406,pl=6407,Yi=6409,ml=6410,Pf=32854,Tu=32855,Ff=36194,zS=32819,VS=32820,$S=33635,qS=34042,Cu=6402,dl=34041,Mu=35904,Lu=35906,Ka=36193,ku=33776,Ru=33777,Au=33778,Eu=33779,Of=35986,Hf=35987,If=34798,Bf=35840,Df=35841,Nf=35842,Wf=35843,Gf=36196,Qa=5121,Pu=5123,Fu=5125,Ki=5126,jS=10242,XS=10243,YS=10497,Ou=33071,KS=33648,QS=10240,ZS=10241,Hu=9728,JS=9729,Iu=9984,Uf=9985,zf=9986,Bu=9987,ew=33170,fl=4352,tw=4353,nw=4354,ow=34046,rw=3317,aw=37440,iw=37441,sw=37443,Vf=37444,Qi=33984,lw=[Iu,zf,Uf,Bu],hl=[0,Yi,ml,pl,fa],$o={};$o[Yi]=$o[wu]=$o[Cu]=1,$o[dl]=$o[ml]=2,$o[pl]=$o[Mu]=3,$o[fa]=$o[Lu]=4;function Za(c){return"[object "+c+"]"}var $f=Za("HTMLCanvasElement"),qf=Za("OffscreenCanvas"),jf=Za("CanvasRenderingContext2D"),Xf=Za("ImageBitmap"),Yf=Za("HTMLImageElement"),Kf=Za("HTMLVideoElement"),cw=Object.keys(Ln).concat([$f,qf,jf,Xf,Yf,Kf]),Ja=[];Ja[Qa]=1,Ja[Ki]=4,Ja[Ka]=2,Ja[Pu]=2,Ja[Fu]=4;var ro=[];ro[Pf]=2,ro[Tu]=2,ro[Ff]=2,ro[dl]=4,ro[ku]=.5,ro[Ru]=.5,ro[Au]=1,ro[Eu]=1,ro[Of]=.5,ro[Hf]=1,ro[If]=1,ro[Bf]=.5,ro[Df]=.25,ro[Nf]=.5,ro[Wf]=.25,ro[Gf]=.5;function Qf(c){return Array.isArray(c)&&(c.length===0||typeof c[0]=="number")}function Zf(c){if(!Array.isArray(c))return!1;var _=c.length;return!(_===0||!kn(c[0]))}function ha(c){return Object.prototype.toString.call(c)}function Jf(c){return ha(c)===$f}function e0(c){return ha(c)===qf}function uw(c){return ha(c)===jf}function pw(c){return ha(c)===Xf}function mw(c){return ha(c)===Yf}function dw(c){return ha(c)===Kf}function Du(c){if(!c)return!1;var _=ha(c);return cw.indexOf(_)>=0?!0:Qf(c)||Zf(c)||se(c)}function t0(c){return Ln[Object.prototype.toString.call(c)]|0}function fw(c,_){var C=_.length;switch(c.type){case Qa:case Pu:case Fu:case Ki:var Z=We.allocType(c.type,C);Z.set(_),c.data=Z;break;case Ka:c.data=Af(_);break;default:h.raise("unsupported texture type, must specify a typed array")}}function n0(c,_){return We.allocType(c.type===Ka?Ki:c.type,_)}function o0(c,_){c.type===Ka?(c.data=Af(_),We.freeType(_)):c.data=_}function hw(c,_,C,Z,ce,Q){for(var ne=c.width,be=c.height,xe=c.channels,Me=ne*be*xe,ve=n0(c,Me),Ae=0,Be=0;Be<be;++Be)for(var ye=0;ye<ne;++ye)for(var Ee=0;Ee<xe;++Ee)ve[Ae++]=_[C*ye+Z*Be+ce*Ee+Q];o0(c,ve)}function _l(c,_,C,Z,ce,Q){var ne;if(typeof ro[c]<"u"?ne=ro[c]:ne=$o[c]*Ja[_],Q&&(ne*=6),ce){for(var be=0,xe=C;xe>=1;)be+=ne*xe*xe,xe/=2;return be}else return ne*C*Z}function _w(c,_,C,Z,ce,Q,ne){var be={"don't care":fl,"dont care":fl,nice:nw,fast:tw},xe={repeat:YS,clamp:Ou,mirror:KS},Me={nearest:Hu,linear:JS},ve=t({mipmap:Bu,"nearest mipmap nearest":Iu,"linear mipmap nearest":Uf,"nearest mipmap linear":zf,"linear mipmap linear":Bu},Me),Ae={none:0,browser:Vf},Be={uint8:Qa,rgba4:zS,rgb565:$S,"rgb5 a1":VS},ye={alpha:wu,luminance:Yi,"luminance alpha":ml,rgb:pl,rgba:fa,rgba4:Pf,"rgb5 a1":Tu,rgb565:Ff},Ee={};_.ext_srgb&&(ye.srgb=Mu,ye.srgba=Lu),_.oes_texture_float&&(Be.float32=Be.float=Ki),_.oes_texture_half_float&&(Be.float16=Be["half float"]=Ka),_.webgl_depth_texture&&(t(ye,{depth:Cu,"depth stencil":dl}),t(Be,{uint16:Pu,uint32:Fu,"depth stencil":qS})),_.webgl_compressed_texture_s3tc&&t(Ee,{"rgb s3tc dxt1":ku,"rgba s3tc dxt1":Ru,"rgba s3tc dxt3":Au,"rgba s3tc dxt5":Eu}),_.webgl_compressed_texture_atc&&t(Ee,{"rgb atc":Of,"rgba atc explicit alpha":Hf,"rgba atc interpolated alpha":If}),_.webgl_compressed_texture_pvrtc&&t(Ee,{"rgb pvrtc 4bppv1":Bf,"rgb pvrtc 2bppv1":Df,"rgba pvrtc 4bppv1":Nf,"rgba pvrtc 2bppv1":Wf}),_.webgl_compressed_texture_etc1&&(Ee["rgb etc1"]=Gf);var V=Array.prototype.slice.call(c.getParameter(US));Object.keys(Ee).forEach(function(w){var J=Ee[w];V.indexOf(J)>=0&&(ye[w]=J)});var oe=Object.keys(ye);C.textureFormats=oe;var Ce=[];Object.keys(ye).forEach(function(w){var J=ye[w];Ce[J]=w});var Ge=[];Object.keys(Be).forEach(function(w){var J=Be[w];Ge[J]=w});var de=[];Object.keys(Me).forEach(function(w){var J=Me[w];de[J]=w});var Ve=[];Object.keys(ve).forEach(function(w){var J=ve[w];Ve[J]=w});var he=[];Object.keys(xe).forEach(function(w){var J=xe[w];he[J]=w});var Oe=oe.reduce(function(w,J){var Y=ye[J];return Y===Yi||Y===wu||Y===Yi||Y===ml||Y===Cu||Y===dl||_.ext_srgb&&(Y===Mu||Y===Lu)?w[Y]=Y:Y===Tu||J.indexOf("rgba")>=0?w[Y]=fa:w[Y]=pl,w},{});function fe(){this.internalformat=fa,this.format=fa,this.type=Qa,this.compressed=!1,this.premultiplyAlpha=!1,this.flipY=!1,this.unpackAlignment=1,this.colorSpace=Vf,this.width=0,this.height=0,this.channels=0}function He(w,J){w.internalformat=J.internalformat,w.format=J.format,w.type=J.type,w.compressed=J.compressed,w.premultiplyAlpha=J.premultiplyAlpha,w.flipY=J.flipY,w.unpackAlignment=J.unpackAlignment,w.colorSpace=J.colorSpace,w.width=J.width,w.height=J.height,w.channels=J.channels}function rt(w,J){if(!(typeof J!="object"||!J)){if("premultiplyAlpha"in J&&(h.type(J.premultiplyAlpha,"boolean","invalid premultiplyAlpha"),w.premultiplyAlpha=J.premultiplyAlpha),"flipY"in J&&(h.type(J.flipY,"boolean","invalid texture flip"),w.flipY=J.flipY),"alignment"in J&&(h.oneOf(J.alignment,[1,2,4,8],"invalid texture unpack alignment"),w.unpackAlignment=J.alignment),"colorSpace"in J&&(h.parameter(J.colorSpace,Ae,"invalid colorSpace"),w.colorSpace=Ae[J.colorSpace]),"type"in J){var Y=J.type;h(_.oes_texture_float||!(Y==="float"||Y==="float32"),"you must enable the OES_texture_float extension in order to use floating point textures."),h(_.oes_texture_half_float||!(Y==="half float"||Y==="float16"),"you must enable the OES_texture_half_float extension in order to use 16-bit floating point textures."),h(_.webgl_depth_texture||!(Y==="uint16"||Y==="uint32"||Y==="depth stencil"),"you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."),h.parameter(Y,Be,"invalid texture type"),w.type=Be[Y]}var $e=w.width,Bt=w.height,v=w.channels,f=!1;"shape"in J?(h(Array.isArray(J.shape)&&J.shape.length>=2,"shape must be an array"),$e=J.shape[0],Bt=J.shape[1],J.shape.length===3&&(v=J.shape[2],h(v>0&&v<=4,"invalid number of channels"),f=!0),h($e>=0&&$e<=C.maxTextureSize,"invalid width"),h(Bt>=0&&Bt<=C.maxTextureSize,"invalid height")):("radius"in J&&($e=Bt=J.radius,h($e>=0&&$e<=C.maxTextureSize,"invalid radius")),"width"in J&&($e=J.width,h($e>=0&&$e<=C.maxTextureSize,"invalid width")),"height"in J&&(Bt=J.height,h(Bt>=0&&Bt<=C.maxTextureSize,"invalid height")),"channels"in J&&(v=J.channels,h(v>0&&v<=4,"invalid number of channels"),f=!0)),w.width=$e|0,w.height=Bt|0,w.channels=v|0;var E=!1;if("format"in J){var U=J.format;h(_.webgl_depth_texture||!(U==="depth"||U==="depth stencil"),"you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."),h.parameter(U,ye,"invalid texture format");var $=w.internalformat=ye[U];w.format=Oe[$],U in Be&&("type"in J||(w.type=Be[U])),U in Ee&&(w.compressed=!0),E=!0}!f&&E?w.channels=$o[w.format]:f&&!E?w.channels!==hl[w.format]&&(w.format=w.internalformat=hl[w.channels]):E&&f&&h(w.channels===$o[w.format],"number of channels inconsistent with specified format")}}function yt(w){c.pixelStorei(aw,w.flipY),c.pixelStorei(iw,w.premultiplyAlpha),c.pixelStorei(sw,w.colorSpace),c.pixelStorei(rw,w.unpackAlignment)}function De(){fe.call(this),this.xOffset=0,this.yOffset=0,this.data=null,this.needsFree=!1,this.element=null,this.needsCopy=!1}function Le(w,J){var Y=null;if(Du(J)?Y=J:J&&(h.type(J,"object","invalid pixel data type"),rt(w,J),"x"in J&&(w.xOffset=J.x|0),"y"in J&&(w.yOffset=J.y|0),Du(J.data)&&(Y=J.data)),h(!w.compressed||Y instanceof Uint8Array,"compressed texture data must be stored in a uint8array"),J.copy){h(!Y,"can not specify copy and data field for the same texture");var $e=ce.viewportWidth,Bt=ce.viewportHeight;w.width=w.width||$e-w.xOffset,w.height=w.height||Bt-w.yOffset,w.needsCopy=!0,h(w.xOffset>=0&&w.xOffset<$e&&w.yOffset>=0&&w.yOffset<Bt&&w.width>0&&w.width<=$e&&w.height>0&&w.height<=Bt,"copy texture read out of bounds")}else if(!Y)w.width=w.width||1,w.height=w.height||1,w.channels=w.channels||4;else if(e(Y))w.channels=w.channels||4,w.data=Y,!("type"in J)&&w.type===Qa&&(w.type=t0(Y));else if(Qf(Y))w.channels=w.channels||4,fw(w,Y),w.alignment=1,w.needsFree=!0;else if(se(Y)){var v=Y.data;!Array.isArray(v)&&w.type===Qa&&(w.type=t0(v));var f=Y.shape,E=Y.stride,U,$,H,P,N,S;f.length===3?(H=f[2],S=E[2]):(h(f.length===2,"invalid ndarray pixel data, must be 2 or 3D"),H=1,S=1),U=f[0],$=f[1],P=E[0],N=E[1],w.alignment=1,w.width=U,w.height=$,w.channels=H,w.format=w.internalformat=hl[H],w.needsFree=!0,hw(w,v,P,N,S,Y.offset)}else if(Jf(Y)||e0(Y)||uw(Y))Jf(Y)||e0(Y)?w.element=Y:w.element=Y.canvas,w.width=w.element.width,w.height=w.element.height,w.channels=4;else if(pw(Y))w.element=Y,w.width=Y.width,w.height=Y.height,w.channels=4;else if(mw(Y))w.element=Y,w.width=Y.naturalWidth,w.height=Y.naturalHeight,w.channels=4;else if(dw(Y))w.element=Y,w.width=Y.videoWidth,w.height=Y.videoHeight,w.channels=4;else if(Zf(Y)){var R=w.width||Y[0].length,b=w.height||Y.length,G=w.channels;kn(Y[0][0])?G=G||Y[0][0].length:G=G||1;for(var j=Ue.shape(Y),le=1,ue=0;ue<j.length;++ue)le*=j[ue];var ae=n0(w,le);Ue.flatten(Y,j,"",ae),o0(w,ae),w.alignment=1,w.width=R,w.height=b,w.channels=G,w.format=w.internalformat=hl[G],w.needsFree=!0}w.type===Ki?h(C.extensions.indexOf("oes_texture_float")>=0,"oes_texture_float extension not enabled"):w.type===Ka&&h(C.extensions.indexOf("oes_texture_half_float")>=0,"oes_texture_half_float extension not enabled")}function me(w,J,Y){var $e=w.element,Bt=w.data,v=w.internalformat,f=w.format,E=w.type,U=w.width,$=w.height;yt(w),$e?c.texImage2D(J,Y,f,f,E,$e):w.compressed?c.compressedTexImage2D(J,Y,v,U,$,0,Bt):w.needsCopy?(Z(),c.copyTexImage2D(J,Y,f,w.xOffset,w.yOffset,U,$,0)):c.texImage2D(J,Y,f,U,$,0,f,E,Bt||null)}function mt(w,J,Y,$e,Bt){var v=w.element,f=w.data,E=w.internalformat,U=w.format,$=w.type,H=w.width,P=w.height;yt(w),v?c.texSubImage2D(J,Bt,Y,$e,U,$,v):w.compressed?c.compressedTexSubImage2D(J,Bt,Y,$e,E,H,P,f):w.needsCopy?(Z(),c.copyTexSubImage2D(J,Bt,Y,$e,w.xOffset,w.yOffset,H,P)):c.texSubImage2D(J,Bt,Y,$e,H,P,U,$,f)}var Lt=[];function je(){return Lt.pop()||new De}function It(w){w.needsFree&&We.freeType(w.data),De.call(w),Lt.push(w)}function xt(){fe.call(this),this.genMipmaps=!1,this.mipmapHint=fl,this.mipmask=0,this.images=Array(16)}function Ot(w,J,Y){var $e=w.images[0]=je();w.mipmask=1,$e.width=w.width=J,$e.height=w.height=Y,$e.channels=w.channels=4}function qt(w,J){var Y=null;if(Du(J))Y=w.images[0]=je(),He(Y,w),Le(Y,J),w.mipmask=1;else if(rt(w,J),Array.isArray(J.mipmap))for(var $e=J.mipmap,Bt=0;Bt<$e.length;++Bt)Y=w.images[Bt]=je(),He(Y,w),Y.width>>=Bt,Y.height>>=Bt,Le(Y,$e[Bt]),w.mipmask|=1<<Bt;else Y=w.images[0]=je(),He(Y,w),Le(Y,J),w.mipmask=1;He(w,w.images[0]),w.compressed&&(w.internalformat===ku||w.internalformat===Ru||w.internalformat===Au||w.internalformat===Eu)&&h(w.width%4===0&&w.height%4===0,"for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4")}function Bn(w,J){for(var Y=w.images,$e=0;$e<Y.length;++$e){if(!Y[$e])return;me(Y[$e],J,$e)}}var Kn=[];function Wt(){var w=Kn.pop()||new xt;fe.call(w),w.mipmask=0;for(var J=0;J<16;++J)w.images[J]=null;return w}function Vn(w){for(var J=w.images,Y=0;Y<J.length;++Y)J[Y]&&It(J[Y]),J[Y]=null;Kn.push(w)}function dn(){this.minFilter=Hu,this.magFilter=Hu,this.wrapS=Ou,this.wrapT=Ou,this.anisotropic=1,this.genMipmaps=!1,this.mipmapHint=fl}function Dn(w,J){if("min"in J){var Y=J.min;h.parameter(Y,ve),w.minFilter=ve[Y],lw.indexOf(w.minFilter)>=0&&!("faces"in J)&&(w.genMipmaps=!0)}if("mag"in J){var $e=J.mag;h.parameter($e,Me),w.magFilter=Me[$e]}var Bt=w.wrapS,v=w.wrapT;if("wrap"in J){var f=J.wrap;typeof f=="string"?(h.parameter(f,xe),Bt=v=xe[f]):Array.isArray(f)&&(h.parameter(f[0],xe),h.parameter(f[1],xe),Bt=xe[f[0]],v=xe[f[1]])}else{if("wrapS"in J){var E=J.wrapS;h.parameter(E,xe),Bt=xe[E]}if("wrapT"in J){var U=J.wrapT;h.parameter(U,xe),v=xe[U]}}if(w.wrapS=Bt,w.wrapT=v,"anisotropic"in J){var $=J.anisotropic;h(typeof $=="number"&&$>=1&&$<=C.maxAnisotropic,"aniso samples must be between 1 and "),w.anisotropic=J.anisotropic}if("mipmap"in J){var H=!1;switch(typeof J.mipmap){case"string":h.parameter(J.mipmap,be,"invalid mipmap hint"),w.mipmapHint=be[J.mipmap],w.genMipmaps=!0,H=!0;break;case"boolean":H=w.genMipmaps=J.mipmap;break;case"object":h(Array.isArray(J.mipmap),"invalid mipmap type"),w.genMipmaps=!1,H=!0;break;default:h.raise("invalid mipmap type")}H&&!("min"in J)&&(w.minFilter=Iu)}}function $n(w,J){c.texParameteri(J,ZS,w.minFilter),c.texParameteri(J,QS,w.magFilter),c.texParameteri(J,jS,w.wrapS),c.texParameteri(J,XS,w.wrapT),_.ext_texture_filter_anisotropic&&c.texParameteri(J,ow,w.anisotropic),w.genMipmaps&&(c.hint(ew,w.mipmapHint),c.generateMipmap(J))}var qn=0,to={},ao=C.maxTextureUnits,Rn=Array(ao).map(function(){return null});function kt(w){fe.call(this),this.mipmask=0,this.internalformat=fa,this.id=qn++,this.refCount=1,this.target=w,this.texture=c.createTexture(),this.unit=-1,this.bindCount=0,this.texInfo=new dn,ne.profile&&(this.stats={size:0})}function io(w){c.activeTexture(Qi),c.bindTexture(w.target,w.texture)}function Kt(){var w=Rn[0];w?c.bindTexture(w.target,w.texture):c.bindTexture(yr,null)}function ct(w){var J=w.texture;h(J,"must not double destroy texture");var Y=w.unit,$e=w.target;Y>=0&&(c.activeTexture(Qi+Y),c.bindTexture($e,null),Rn[Y]=null),c.deleteTexture(J),w.texture=null,w.params=null,w.pixels=null,w.refCount=0,delete to[w.id],Q.textureCount--}t(kt.prototype,{bind:function(){var w=this;w.bindCount+=1;var J=w.unit;if(J<0){for(var Y=0;Y<ao;++Y){var $e=Rn[Y];if($e){if($e.bindCount>0)continue;$e.unit=-1}Rn[Y]=w,J=Y;break}J>=ao&&h.raise("insufficient number of texture units"),ne.profile&&Q.maxTextureUnits<J+1&&(Q.maxTextureUnits=J+1),w.unit=J,c.activeTexture(Qi+J),c.bindTexture(w.target,w.texture)}return J},unbind:function(){this.bindCount-=1},decRef:function(){--this.refCount<=0&&ct(this)}});function Nt(w,J){var Y=new kt(yr);to[Y.id]=Y,Q.textureCount++;function $e(f,E){var U=Y.texInfo;dn.call(U);var $=Wt();return typeof f=="number"?typeof E=="number"?Ot($,f|0,E|0):Ot($,f|0,f|0):f?(h.type(f,"object","invalid arguments to regl.texture"),Dn(U,f),qt($,f)):Ot($,1,1),U.genMipmaps&&($.mipmask=($.width<<1)-1),Y.mipmask=$.mipmask,He(Y,$),h.texture2D(U,$,C),Y.internalformat=$.internalformat,$e.width=$.width,$e.height=$.height,io(Y),Bn($,yr),$n(U,yr),Kt(),Vn($),ne.profile&&(Y.stats.size=_l(Y.internalformat,Y.type,$.width,$.height,U.genMipmaps,!1)),$e.format=Ce[Y.internalformat],$e.type=Ge[Y.type],$e.mag=de[U.magFilter],$e.min=Ve[U.minFilter],$e.wrapS=he[U.wrapS],$e.wrapT=he[U.wrapT],$e}function Bt(f,E,U,$){h(!!f,"must specify image data");var H=E|0,P=U|0,N=$|0,S=je();return He(S,Y),S.width=0,S.height=0,Le(S,f),S.width=S.width||(Y.width>>N)-H,S.height=S.height||(Y.height>>N)-P,h(Y.type===S.type&&Y.format===S.format&&Y.internalformat===S.internalformat,"incompatible format for texture.subimage"),h(H>=0&&P>=0&&H+S.width<=Y.width&&P+S.height<=Y.height,"texture.subimage write out of bounds"),h(Y.mipmask&1<<N,"missing mipmap data"),h(S.data||S.element||S.needsCopy,"missing image data"),io(Y),mt(S,yr,H,P,N),Kt(),It(S),$e}function v(f,E){var U=f|0,$=E|0||U;if(U===Y.width&&$===Y.height)return $e;$e.width=Y.width=U,$e.height=Y.height=$,io(Y);for(var H=0;Y.mipmask>>H;++H){var P=U>>H,N=$>>H;if(!P||!N)break;c.texImage2D(yr,H,Y.format,P,N,0,Y.format,Y.type,null)}return Kt(),ne.profile&&(Y.stats.size=_l(Y.internalformat,Y.type,U,$,!1,!1)),$e}return $e(w,J),$e.subimage=Bt,$e.resize=v,$e._reglType="texture2d",$e._texture=Y,ne.profile&&($e.stats=Y.stats),$e.destroy=function(){Y.decRef()},$e}function Vt(w,J,Y,$e,Bt,v){var f=new kt(Su);to[f.id]=f,Q.cubeCount++;var E=new Array(6);function U(P,N,S,R,b,G){var j,le=f.texInfo;for(dn.call(le),j=0;j<6;++j)E[j]=Wt();if(typeof P=="number"||!P){var ue=P|0||1;for(j=0;j<6;++j)Ot(E[j],ue,ue)}else if(typeof P=="object")if(N)qt(E[0],P),qt(E[1],N),qt(E[2],S),qt(E[3],R),qt(E[4],b),qt(E[5],G);else if(Dn(le,P),rt(f,P),"faces"in P){var ae=P.faces;for(h(Array.isArray(ae)&&ae.length===6,"cube faces must be a length 6 array"),j=0;j<6;++j)h(typeof ae[j]=="object"&&!!ae[j],"invalid input for cube map face"),He(E[j],f),qt(E[j],ae[j])}else for(j=0;j<6;++j)qt(E[j],P);else h.raise("invalid arguments to cube map");for(He(f,E[0]),C.npotTextureCube||h(Ef(f.width)&&Ef(f.height),"your browser does not support non power or two texture dimensions"),le.genMipmaps?f.mipmask=(E[0].width<<1)-1:f.mipmask=E[0].mipmask,h.textureCube(f,le,E,C),f.internalformat=E[0].internalformat,U.width=E[0].width,U.height=E[0].height,io(f),j=0;j<6;++j)Bn(E[j],ul+j);for($n(le,Su),Kt(),ne.profile&&(f.stats.size=_l(f.internalformat,f.type,U.width,U.height,le.genMipmaps,!0)),U.format=Ce[f.internalformat],U.type=Ge[f.type],U.mag=de[le.magFilter],U.min=Ve[le.minFilter],U.wrapS=he[le.wrapS],U.wrapT=he[le.wrapT],j=0;j<6;++j)Vn(E[j]);return U}function $(P,N,S,R,b){h(!!N,"must specify image data"),h(typeof P=="number"&&P===(P|0)&&P>=0&&P<6,"invalid face");var G=S|0,j=R|0,le=b|0,ue=je();return He(ue,f),ue.width=0,ue.height=0,Le(ue,N),ue.width=ue.width||(f.width>>le)-G,ue.height=ue.height||(f.height>>le)-j,h(f.type===ue.type&&f.format===ue.format&&f.internalformat===ue.internalformat,"incompatible format for texture.subimage"),h(G>=0&&j>=0&&G+ue.width<=f.width&&j+ue.height<=f.height,"texture.subimage write out of bounds"),h(f.mipmask&1<<le,"missing mipmap data"),h(ue.data||ue.element||ue.needsCopy,"missing image data"),io(f),mt(ue,ul+P,G,j,le),Kt(),It(ue),U}function H(P){var N=P|0;if(N!==f.width){U.width=f.width=N,U.height=f.height=N,io(f);for(var S=0;S<6;++S)for(var R=0;f.mipmask>>R;++R)c.texImage2D(ul+S,R,f.format,N>>R,N>>R,0,f.format,f.type,null);return Kt(),ne.profile&&(f.stats.size=_l(f.internalformat,f.type,U.width,U.height,!1,!0)),U}}return U(w,J,Y,$e,Bt,v),U.subimage=$,U.resize=H,U._reglType="textureCube",U._texture=f,ne.profile&&(U.stats=f.stats),U.destroy=function(){f.decRef()},U}function An(){for(var w=0;w<ao;++w)c.activeTexture(Qi+w),c.bindTexture(yr,null),Rn[w]=null;_e(to).forEach(ct),Q.cubeCount=0,Q.textureCount=0}ne.profile&&(Q.getTotalTextureSize=function(){var w=0;return Object.keys(to).forEach(function(J){w+=to[J].stats.size}),w});function vr(){for(var w=0;w<ao;++w){var J=Rn[w];J&&(J.bindCount=0,J.unit=-1,Rn[w]=null)}_e(to).forEach(function(Y){Y.texture=c.createTexture(),c.bindTexture(Y.target,Y.texture);for(var $e=0;$e<32;++$e)if((Y.mipmask&1<<$e)!==0)if(Y.target===yr)c.texImage2D(yr,$e,Y.internalformat,Y.width>>$e,Y.height>>$e,0,Y.internalformat,Y.type,null);else for(var Bt=0;Bt<6;++Bt)c.texImage2D(ul+Bt,$e,Y.internalformat,Y.width>>$e,Y.height>>$e,0,Y.internalformat,Y.type,null);$n(Y.texInfo,Y.target)})}function Sa(){for(var w=0;w<ao;++w){var J=Rn[w];J&&(J.bindCount=0,J.unit=-1,Rn[w]=null),c.activeTexture(Qi+w),c.bindTexture(yr,null),c.bindTexture(Su,null)}}return{create2D:Nt,createCube:Vt,clear:An,getTexture:function(w){return null},restore:vr,refresh:Sa}}var Xr=36161,gl=32854,r0=32855,a0=36194,i0=33189,s0=36168,l0=34041,c0=35907,u0=34836,p0=34842,m0=34843,ar=[];ar[gl]=2,ar[r0]=2,ar[a0]=2,ar[i0]=2,ar[s0]=1,ar[l0]=4,ar[c0]=4,ar[u0]=16,ar[p0]=8,ar[m0]=6;function d0(c,_,C){return ar[c]*_*C}var gw=function(c,_,C,Z,ce){var Q={rgba4:gl,rgb565:a0,"rgb5 a1":r0,depth:i0,stencil:s0,"depth stencil":l0};_.ext_srgb&&(Q.srgba=c0),_.ext_color_buffer_half_float&&(Q.rgba16f=p0,Q.rgb16f=m0),_.webgl_color_buffer_float&&(Q.rgba32f=u0);var ne=[];Object.keys(Q).forEach(function(ye){var Ee=Q[ye];ne[Ee]=ye});var be=0,xe={};function Me(ye){this.id=be++,this.refCount=1,this.renderbuffer=ye,this.format=gl,this.width=0,this.height=0,ce.profile&&(this.stats={size:0})}Me.prototype.decRef=function(){--this.refCount<=0&&ve(this)};function ve(ye){var Ee=ye.renderbuffer;h(Ee,"must not double destroy renderbuffer"),c.bindRenderbuffer(Xr,null),c.deleteRenderbuffer(Ee),ye.renderbuffer=null,ye.refCount=0,delete xe[ye.id],Z.renderbufferCount--}function Ae(ye,Ee){var V=new Me(c.createRenderbuffer());xe[V.id]=V,Z.renderbufferCount++;function oe(Ge,de){var Ve=0,he=0,Oe=gl;if(typeof Ge=="object"&&Ge){var fe=Ge;if("shape"in fe){var He=fe.shape;h(Array.isArray(He)&&He.length>=2,"invalid renderbuffer shape"),Ve=He[0]|0,he=He[1]|0}else"radius"in fe&&(Ve=he=fe.radius|0),"width"in fe&&(Ve=fe.width|0),"height"in fe&&(he=fe.height|0);"format"in fe&&(h.parameter(fe.format,Q,"invalid renderbuffer format"),Oe=Q[fe.format])}else typeof Ge=="number"?(Ve=Ge|0,typeof de=="number"?he=de|0:he=Ve):Ge?h.raise("invalid arguments to renderbuffer constructor"):Ve=he=1;if(h(Ve>0&&he>0&&Ve<=C.maxRenderbufferSize&&he<=C.maxRenderbufferSize,"invalid renderbuffer size"),!(Ve===V.width&&he===V.height&&Oe===V.format))return oe.width=V.width=Ve,oe.height=V.height=he,V.format=Oe,c.bindRenderbuffer(Xr,V.renderbuffer),c.renderbufferStorage(Xr,Oe,Ve,he),h(c.getError()===0,"invalid render buffer format"),ce.profile&&(V.stats.size=d0(V.format,V.width,V.height)),oe.format=ne[V.format],oe}function Ce(Ge,de){var Ve=Ge|0,he=de|0||Ve;return Ve===V.width&&he===V.height||(h(Ve>0&&he>0&&Ve<=C.maxRenderbufferSize&&he<=C.maxRenderbufferSize,"invalid renderbuffer size"),oe.width=V.width=Ve,oe.height=V.height=he,c.bindRenderbuffer(Xr,V.renderbuffer),c.renderbufferStorage(Xr,V.format,Ve,he),h(c.getError()===0,"invalid render buffer format"),ce.profile&&(V.stats.size=d0(V.format,V.width,V.height))),oe}return oe(ye,Ee),oe.resize=Ce,oe._reglType="renderbuffer",oe._renderbuffer=V,ce.profile&&(oe.stats=V.stats),oe.destroy=function(){V.decRef()},oe}ce.profile&&(Z.getTotalRenderbufferSize=function(){var ye=0;return Object.keys(xe).forEach(function(Ee){ye+=xe[Ee].stats.size}),ye});function Be(){_e(xe).forEach(function(ye){ye.renderbuffer=c.createRenderbuffer(),c.bindRenderbuffer(Xr,ye.renderbuffer),c.renderbufferStorage(Xr,ye.format,ye.width,ye.height)}),c.bindRenderbuffer(Xr,null)}return{create:Ae,clear:function(){_e(xe).forEach(ve)},restore:Be}},Or=36160,Nu=36161,_a=3553,bl=34069,f0=36064,h0=36096,_0=36128,g0=33306,b0=36053,bw=36054,yw=36055,xw=36057,vw=36061,Sw=36193,ww=5121,Tw=5126,y0=6407,x0=6408,Cw=6402,Mw=[y0,x0],Wu=[];Wu[x0]=4,Wu[y0]=3;var yl=[];yl[ww]=1,yl[Tw]=4,yl[Sw]=2;var Lw=32854,kw=32855,Rw=36194,Aw=33189,Ew=36168,v0=34041,Pw=35907,Fw=34836,Ow=34842,Hw=34843,Iw=[Lw,kw,Rw,Pw,Ow,Hw,Fw],ei={};ei[b0]="complete",ei[bw]="incomplete attachment",ei[xw]="incomplete dimensions",ei[yw]="incomplete, missing attachment",ei[vw]="unsupported";function Bw(c,_,C,Z,ce,Q){var ne={cur:null,next:null,dirty:!1,setFBO:null},be=["rgba"],xe=["rgba4","rgb565","rgb5 a1"];_.ext_srgb&&xe.push("srgba"),_.ext_color_buffer_half_float&&xe.push("rgba16f","rgb16f"),_.webgl_color_buffer_float&&xe.push("rgba32f");var Me=["uint8"];_.oes_texture_half_float&&Me.push("half float","float16"),_.oes_texture_float&&Me.push("float","float32");function ve(De,Le,me){this.target=De,this.texture=Le,this.renderbuffer=me;var mt=0,Lt=0;Le?(mt=Le.width,Lt=Le.height):me&&(mt=me.width,Lt=me.height),this.width=mt,this.height=Lt}function Ae(De){De&&(De.texture&&De.texture._texture.decRef(),De.renderbuffer&&De.renderbuffer._renderbuffer.decRef())}function Be(De,Le,me){if(De)if(De.texture){var mt=De.texture._texture,Lt=Math.max(1,mt.width),je=Math.max(1,mt.height);h(Lt===Le&&je===me,"inconsistent width/height for supplied texture"),mt.refCount+=1}else{var It=De.renderbuffer._renderbuffer;h(It.width===Le&&It.height===me,"inconsistent width/height for renderbuffer"),It.refCount+=1}}function ye(De,Le){Le&&(Le.texture?c.framebufferTexture2D(Or,De,Le.target,Le.texture._texture.texture,0):c.framebufferRenderbuffer(Or,De,Nu,Le.renderbuffer._renderbuffer.renderbuffer))}function Ee(De){var Le=_a,me=null,mt=null,Lt=De;typeof De=="object"&&(Lt=De.data,"target"in De&&(Le=De.target|0)),h.type(Lt,"function","invalid attachment data");var je=Lt._reglType;return je==="texture2d"?(me=Lt,h(Le===_a)):je==="textureCube"?(me=Lt,h(Le>=bl&&Le<bl+6,"invalid cube map target")):je==="renderbuffer"?(mt=Lt,Le=Nu):h.raise("invalid regl object for attachment"),new ve(Le,me,mt)}function V(De,Le,me,mt,Lt){if(me){var je=Z.create2D({width:De,height:Le,format:mt,type:Lt});return je._texture.refCount=0,new ve(_a,je,null)}else{var It=ce.create({width:De,height:Le,format:mt});return It._renderbuffer.refCount=0,new ve(Nu,null,It)}}function oe(De){return De&&(De.texture||De.renderbuffer)}function Ce(De,Le,me){De&&(De.texture?De.texture.resize(Le,me):De.renderbuffer&&De.renderbuffer.resize(Le,me),De.width=Le,De.height=me)}var Ge=0,de={};function Ve(){this.id=Ge++,de[this.id]=this,this.framebuffer=c.createFramebuffer(),this.width=0,this.height=0,this.colorAttachments=[],this.depthAttachment=null,this.stencilAttachment=null,this.depthStencilAttachment=null}function he(De){De.colorAttachments.forEach(Ae),Ae(De.depthAttachment),Ae(De.stencilAttachment),Ae(De.depthStencilAttachment)}function Oe(De){var Le=De.framebuffer;h(Le,"must not double destroy framebuffer"),c.deleteFramebuffer(Le),De.framebuffer=null,Q.framebufferCount--,delete de[De.id]}function fe(De){var Le;c.bindFramebuffer(Or,De.framebuffer);var me=De.colorAttachments;for(Le=0;Le<me.length;++Le)ye(f0+Le,me[Le]);for(Le=me.length;Le<C.maxColorAttachments;++Le)c.framebufferTexture2D(Or,f0+Le,_a,null,0);c.framebufferTexture2D(Or,g0,_a,null,0),c.framebufferTexture2D(Or,h0,_a,null,0),c.framebufferTexture2D(Or,_0,_a,null,0),ye(h0,De.depthAttachment),ye(_0,De.stencilAttachment),ye(g0,De.depthStencilAttachment);var mt=c.checkFramebufferStatus(Or);!c.isContextLost()&&mt!==b0&&h.raise("framebuffer configuration not supported, status = "+ei[mt]),c.bindFramebuffer(Or,ne.next?ne.next.framebuffer:null),ne.cur=ne.next,c.getError()}function He(De,Le){var me=new Ve;Q.framebufferCount++;function mt(je,It){var xt;h(ne.next!==me,"can not update framebuffer which is currently in use");var Ot=0,qt=0,Bn=!0,Kn=!0,Wt=null,Vn=!0,dn="rgba",Dn="uint8",$n=1,qn=null,to=null,ao=null,Rn=!1;if(typeof je=="number")Ot=je|0,qt=It|0||Ot;else if(!je)Ot=qt=1;else{h.type(je,"object","invalid arguments for framebuffer");var kt=je;if("shape"in kt){var io=kt.shape;h(Array.isArray(io)&&io.length>=2,"invalid shape for framebuffer"),Ot=io[0],qt=io[1]}else"radius"in kt&&(Ot=qt=kt.radius),"width"in kt&&(Ot=kt.width),"height"in kt&&(qt=kt.height);("color"in kt||"colors"in kt)&&(Wt=kt.color||kt.colors,Array.isArray(Wt)&&h(Wt.length===1||_.webgl_draw_buffers,"multiple render targets not supported")),Wt||("colorCount"in kt&&($n=kt.colorCount|0,h($n>0,"invalid color buffer count")),"colorTexture"in kt&&(Vn=!!kt.colorTexture,dn="rgba4"),"colorType"in kt&&(Dn=kt.colorType,Vn?(h(_.oes_texture_float||!(Dn==="float"||Dn==="float32"),"you must enable OES_texture_float in order to use floating point framebuffer objects"),h(_.oes_texture_half_float||!(Dn==="half float"||Dn==="float16"),"you must enable OES_texture_half_float in order to use 16-bit floating point framebuffer objects")):Dn==="half float"||Dn==="float16"?(h(_.ext_color_buffer_half_float,"you must enable EXT_color_buffer_half_float to use 16-bit render buffers"),dn="rgba16f"):(Dn==="float"||Dn==="float32")&&(h(_.webgl_color_buffer_float,"you must enable WEBGL_color_buffer_float in order to use 32-bit floating point renderbuffers"),dn="rgba32f"),h.oneOf(Dn,Me,"invalid color type")),"colorFormat"in kt&&(dn=kt.colorFormat,be.indexOf(dn)>=0?Vn=!0:xe.indexOf(dn)>=0?Vn=!1:Vn?h.oneOf(kt.colorFormat,be,"invalid color format for texture"):h.oneOf(kt.colorFormat,xe,"invalid color format for renderbuffer"))),("depthTexture"in kt||"depthStencilTexture"in kt)&&(Rn=!!(kt.depthTexture||kt.depthStencilTexture),h(!Rn||_.webgl_depth_texture,"webgl_depth_texture extension not supported")),"depth"in kt&&(typeof kt.depth=="boolean"?Bn=kt.depth:(qn=kt.depth,Kn=!1)),"stencil"in kt&&(typeof kt.stencil=="boolean"?Kn=kt.stencil:(to=kt.stencil,Bn=!1)),"depthStencil"in kt&&(typeof kt.depthStencil=="boolean"?Bn=Kn=kt.depthStencil:(ao=kt.depthStencil,Bn=!1,Kn=!1))}var Kt=null,ct=null,Nt=null,Vt=null;if(Array.isArray(Wt))Kt=Wt.map(Ee);else if(Wt)Kt=[Ee(Wt)];else for(Kt=new Array($n),xt=0;xt<$n;++xt)Kt[xt]=V(Ot,qt,Vn,dn,Dn);h(_.webgl_draw_buffers||Kt.length<=1,"you must enable the WEBGL_draw_buffers extension in order to use multiple color buffers."),h(Kt.length<=C.maxColorAttachments,"too many color attachments, not supported"),Ot=Ot||Kt[0].width,qt=qt||Kt[0].height,qn?ct=Ee(qn):Bn&&!Kn&&(ct=V(Ot,qt,Rn,"depth","uint32")),to?Nt=Ee(to):Kn&&!Bn&&(Nt=V(Ot,qt,!1,"stencil","uint8")),ao?Vt=Ee(ao):!qn&&!to&&Kn&&Bn&&(Vt=V(Ot,qt,Rn,"depth stencil","depth stencil")),h(!!qn+!!to+!!ao<=1,"invalid framebuffer configuration, can specify exactly one depth/stencil attachment");var An=null;for(xt=0;xt<Kt.length;++xt)if(Be(Kt[xt],Ot,qt),h(!Kt[xt]||Kt[xt].texture&&Mw.indexOf(Kt[xt].texture._texture.format)>=0||Kt[xt].renderbuffer&&Iw.indexOf(Kt[xt].renderbuffer._renderbuffer.format)>=0,"framebuffer color attachment "+xt+" is invalid"),Kt[xt]&&Kt[xt].texture){var vr=Wu[Kt[xt].texture._texture.format]*yl[Kt[xt].texture._texture.type];An===null?An=vr:h(An===vr,"all color attachments much have the same number of bits per pixel.")}return Be(ct,Ot,qt),h(!ct||ct.texture&&ct.texture._texture.format===Cw||ct.renderbuffer&&ct.renderbuffer._renderbuffer.format===Aw,"invalid depth attachment for framebuffer object"),Be(Nt,Ot,qt),h(!Nt||Nt.renderbuffer&&Nt.renderbuffer._renderbuffer.format===Ew,"invalid stencil attachment for framebuffer object"),Be(Vt,Ot,qt),h(!Vt||Vt.texture&&Vt.texture._texture.format===v0||Vt.renderbuffer&&Vt.renderbuffer._renderbuffer.format===v0,"invalid depth-stencil attachment for framebuffer object"),he(me),me.width=Ot,me.height=qt,me.colorAttachments=Kt,me.depthAttachment=ct,me.stencilAttachment=Nt,me.depthStencilAttachment=Vt,mt.color=Kt.map(oe),mt.depth=oe(ct),mt.stencil=oe(Nt),mt.depthStencil=oe(Vt),mt.width=me.width,mt.height=me.height,fe(me),mt}function Lt(je,It){h(ne.next!==me,"can not resize a framebuffer which is currently in use");var xt=Math.max(je|0,1),Ot=Math.max(It|0||xt,1);if(xt===me.width&&Ot===me.height)return mt;for(var qt=me.colorAttachments,Bn=0;Bn<qt.length;++Bn)Ce(qt[Bn],xt,Ot);return Ce(me.depthAttachment,xt,Ot),Ce(me.stencilAttachment,xt,Ot),Ce(me.depthStencilAttachment,xt,Ot),me.width=mt.width=xt,me.height=mt.height=Ot,fe(me),mt}return mt(De,Le),t(mt,{resize:Lt,_reglType:"framebuffer",_framebuffer:me,destroy:function(){Oe(me),he(me)},use:function(je){ne.setFBO({framebuffer:mt},je)}})}function rt(De){var Le=Array(6);function me(Lt){var je;h(Le.indexOf(ne.next)<0,"can not update framebuffer which is currently in use");var It={color:null},xt=0,Ot=null,qt="rgba",Bn="uint8",Kn=1;if(typeof Lt=="number")xt=Lt|0;else if(!Lt)xt=1;else{h.type(Lt,"object","invalid arguments for framebuffer");var Wt=Lt;if("shape"in Wt){var Vn=Wt.shape;h(Array.isArray(Vn)&&Vn.length>=2,"invalid shape for framebuffer"),h(Vn[0]===Vn[1],"cube framebuffer must be square"),xt=Vn[0]}else"radius"in Wt&&(xt=Wt.radius|0),"width"in Wt?(xt=Wt.width|0,"height"in Wt&&h(Wt.height===xt,"must be square")):"height"in Wt&&(xt=Wt.height|0);("color"in Wt||"colors"in Wt)&&(Ot=Wt.color||Wt.colors,Array.isArray(Ot)&&h(Ot.length===1||_.webgl_draw_buffers,"multiple render targets not supported")),Ot||("colorCount"in Wt&&(Kn=Wt.colorCount|0,h(Kn>0,"invalid color buffer count")),"colorType"in Wt&&(h.oneOf(Wt.colorType,Me,"invalid color type"),Bn=Wt.colorType),"colorFormat"in Wt&&(qt=Wt.colorFormat,h.oneOf(Wt.colorFormat,be,"invalid color format for texture"))),"depth"in Wt&&(It.depth=Wt.depth),"stencil"in Wt&&(It.stencil=Wt.stencil),"depthStencil"in Wt&&(It.depthStencil=Wt.depthStencil)}var dn;if(Ot)if(Array.isArray(Ot))for(dn=[],je=0;je<Ot.length;++je)dn[je]=Ot[je];else dn=[Ot];else{dn=Array(Kn);var Dn={radius:xt,format:qt,type:Bn};for(je=0;je<Kn;++je)dn[je]=Z.createCube(Dn)}for(It.color=Array(dn.length),je=0;je<dn.length;++je){var $n=dn[je];h(typeof $n=="function"&&$n._reglType==="textureCube","invalid cube map"),xt=xt||$n.width,h($n.width===xt&&$n.height===xt,"invalid cube map shape"),It.color[je]={target:bl,data:dn[je]}}for(je=0;je<6;++je){for(var qn=0;qn<dn.length;++qn)It.color[qn].target=bl+je;je>0&&(It.depth=Le[0].depth,It.stencil=Le[0].stencil,It.depthStencil=Le[0].depthStencil),Le[je]?Le[je](It):Le[je]=He(It)}return t(me,{width:xt,height:xt,color:dn})}function mt(Lt){var je,It=Lt|0;if(h(It>0&&It<=C.maxCubeMapSize,"invalid radius for cube fbo"),It===me.width)return me;var xt=me.color;for(je=0;je<xt.length;++je)xt[je].resize(It);for(je=0;je<6;++je)Le[je].resize(It);return me.width=me.height=It,me}return me(De),t(me,{faces:Le,resize:mt,_reglType:"framebufferCube",destroy:function(){Le.forEach(function(Lt){Lt.destroy()})}})}function yt(){ne.cur=null,ne.next=null,ne.dirty=!0,_e(de).forEach(function(De){De.framebuffer=c.createFramebuffer(),fe(De)})}return t(ne,{getFramebuffer:function(De){if(typeof De=="function"&&De._reglType==="framebuffer"){var Le=De._framebuffer;if(Le instanceof Ve)return Le}return null},create:He,createCube:rt,clear:function(){_e(de).forEach(Oe)},restore:yt})}var Dw=5126,S0=34962;function Gu(){this.state=0,this.x=0,this.y=0,this.z=0,this.w=0,this.buffer=null,this.size=0,this.normalized=!1,this.type=Dw,this.offset=0,this.stride=0,this.divisor=0}function Nw(c,_,C,Z,ce){for(var Q=C.maxAttributes,ne=new Array(Q),be=0;be<Q;++be)ne[be]=new Gu;var xe=0,Me={},ve={Record:Gu,scope:{},state:ne,currentVAO:null,targetVAO:null,restore:Be()?de:function(){},createVAO:Ve,getVAO:Ee,destroyBuffer:Ae,setVAO:Be()?V:oe,clear:Be()?Ce:function(){}};function Ae(he){for(var Oe=0;Oe<ne.length;++Oe){var fe=ne[Oe];fe.buffer===he&&(c.disableVertexAttribArray(Oe),fe.buffer=null)}}function Be(){return _.oes_vertex_array_object}function ye(){return _.angle_instanced_arrays}function Ee(he){return typeof he=="function"&&he._vao?he._vao:null}function V(he){if(he!==ve.currentVAO){var Oe=Be();he?Oe.bindVertexArrayOES(he.vao):Oe.bindVertexArrayOES(null),ve.currentVAO=he}}function oe(he){if(he!==ve.currentVAO){if(he)he.bindAttrs();else for(var Oe=ye(),fe=0;fe<ne.length;++fe){var He=ne[fe];He.buffer?(c.enableVertexAttribArray(fe),c.vertexAttribPointer(fe,He.size,He.type,He.normalized,He.stride,He.offfset),Oe&&He.divisor&&Oe.vertexAttribDivisorANGLE(fe,He.divisor)):(c.disableVertexAttribArray(fe),c.vertexAttrib4f(fe,He.x,He.y,He.z,He.w))}ve.currentVAO=he}}function Ce(){_e(Me).forEach(function(he){he.destroy()})}function Ge(){this.id=++xe,this.attributes=[];var he=Be();he?this.vao=he.createVertexArrayOES():this.vao=null,Me[this.id]=this,this.buffers=[]}Ge.prototype.bindAttrs=function(){for(var he=ye(),Oe=this.attributes,fe=0;fe<Oe.length;++fe){var He=Oe[fe];He.buffer?(c.enableVertexAttribArray(fe),c.bindBuffer(S0,He.buffer.buffer),c.vertexAttribPointer(fe,He.size,He.type,He.normalized,He.stride,He.offset),he&&He.divisor&&he.vertexAttribDivisorANGLE(fe,He.divisor)):(c.disableVertexAttribArray(fe),c.vertexAttrib4f(fe,He.x,He.y,He.z,He.w))}for(var rt=Oe.length;rt<Q;++rt)c.disableVertexAttribArray(rt)},Ge.prototype.refresh=function(){var he=Be();he&&(he.bindVertexArrayOES(this.vao),this.bindAttrs(),ve.currentVAO=this)},Ge.prototype.destroy=function(){if(this.vao){var he=Be();this===ve.currentVAO&&(ve.currentVAO=null,he.bindVertexArrayOES(null)),he.deleteVertexArrayOES(this.vao),this.vao=null}Me[this.id]&&(delete Me[this.id],Z.vaoCount-=1)};function de(){var he=Be();he&&_e(Me).forEach(function(Oe){Oe.refresh()})}function Ve(he){var Oe=new Ge;Z.vaoCount+=1;function fe(He){h(Array.isArray(He),"arguments to vertex array constructor must be an array"),h(He.length<Q,"too many attributes"),h(He.length>0,"must specify at least one attribute");var rt={},yt=Oe.attributes;yt.length=He.length;for(var De=0;De<He.length;++De){var Le=He[De],me=yt[De]=new Gu,mt=Le.data||Le;if(Array.isArray(mt)||e(mt)||se(mt)){var Lt;Oe.buffers[De]&&(Lt=Oe.buffers[De],e(mt)&&Lt._buffer.byteLength>=mt.byteLength?Lt.subdata(mt):(Lt.destroy(),Oe.buffers[De]=null)),Oe.buffers[De]||(Lt=Oe.buffers[De]=ce.create(Le,S0,!1,!0)),me.buffer=ce.getBuffer(Lt),me.size=me.buffer.dimension|0,me.normalized=!1,me.type=me.buffer.dtype,me.offset=0,me.stride=0,me.divisor=0,me.state=1,rt[De]=1}else ce.getBuffer(Le)?(me.buffer=ce.getBuffer(Le),me.size=me.buffer.dimension|0,me.normalized=!1,me.type=me.buffer.dtype,me.offset=0,me.stride=0,me.divisor=0,me.state=1):ce.getBuffer(Le.buffer)?(me.buffer=ce.getBuffer(Le.buffer),me.size=(+Le.size||me.buffer.dimension)|0,me.normalized=!!Le.normalized||!1,"type"in Le?(h.parameter(Le.type,Fr,"invalid buffer type"),me.type=Fr[Le.type]):me.type=me.buffer.dtype,me.offset=(Le.offset||0)|0,me.stride=(Le.stride||0)|0,me.divisor=(Le.divisor||0)|0,me.state=1,h(me.size>=1&&me.size<=4,"size must be between 1 and 4"),h(me.offset>=0,"invalid offset"),h(me.stride>=0&&me.stride<=255,"stride must be between 0 and 255"),h(me.divisor>=0,"divisor must be positive"),h(!me.divisor||!!_.angle_instanced_arrays,"ANGLE_instanced_arrays must be enabled to use divisor")):"x"in Le?(h(De>0,"first attribute must not be a constant"),me.x=+Le.x||0,me.y=+Le.y||0,me.z=+Le.z||0,me.w=+Le.w||0,me.state=2):h(!1,"invalid attribute spec for location "+De)}for(var je=0;je<Oe.buffers.length;++je)!rt[je]&&Oe.buffers[je]&&(Oe.buffers[je].destroy(),Oe.buffers[je]=null);return Oe.refresh(),fe}return fe.destroy=function(){for(var He=0;He<Oe.buffers.length;++He)Oe.buffers[He]&&Oe.buffers[He].destroy();Oe.buffers.length=0,Oe.destroy()},fe._vao=Oe,fe._reglType="vao",fe(he)}return ve}var w0=35632,Ww=35633,Gw=35718,Uw=35721;function zw(c,_,C,Z){var ce={},Q={};function ne(V,oe,Ce,Ge){this.name=V,this.id=oe,this.location=Ce,this.info=Ge}function be(V,oe){for(var Ce=0;Ce<V.length;++Ce)if(V[Ce].id===oe.id){V[Ce].location=oe.location;return}V.push(oe)}function xe(V,oe,Ce){var Ge=V===w0?ce:Q,de=Ge[oe];if(!de){var Ve=_.str(oe);de=c.createShader(V),c.shaderSource(de,Ve),c.compileShader(de),h.shaderError(c,de,Ve,V,Ce),Ge[oe]=de}return de}var Me={},ve=[],Ae=0;function Be(V,oe){this.id=Ae++,this.fragId=V,this.vertId=oe,this.program=null,this.uniforms=[],this.attributes=[],this.refCount=1,Z.profile&&(this.stats={uniformsCount:0,attributesCount:0})}function ye(V,oe,Ce){var Ge,de,Ve=xe(w0,V.fragId),he=xe(Ww,V.vertId),Oe=V.program=c.createProgram();if(c.attachShader(Oe,Ve),c.attachShader(Oe,he),Ce)for(Ge=0;Ge<Ce.length;++Ge){var fe=Ce[Ge];c.bindAttribLocation(Oe,fe[0],fe[1])}c.linkProgram(Oe),h.linkError(c,Oe,_.str(V.fragId),_.str(V.vertId),oe);var He=c.getProgramParameter(Oe,Gw);Z.profile&&(V.stats.uniformsCount=He);var rt=V.uniforms;for(Ge=0;Ge<He;++Ge)if(de=c.getActiveUniform(Oe,Ge),de)if(de.size>1)for(var yt=0;yt<de.size;++yt){var De=de.name.replace("[0]","["+yt+"]");be(rt,new ne(De,_.id(De),c.getUniformLocation(Oe,De),de))}else be(rt,new ne(de.name,_.id(de.name),c.getUniformLocation(Oe,de.name),de));var Le=c.getProgramParameter(Oe,Uw);Z.profile&&(V.stats.attributesCount=Le);var me=V.attributes;for(Ge=0;Ge<Le;++Ge)de=c.getActiveAttrib(Oe,Ge),de&&be(me,new ne(de.name,_.id(de.name),c.getAttribLocation(Oe,de.name),de))}Z.profile&&(C.getMaxUniformsCount=function(){var V=0;return ve.forEach(function(oe){oe.stats.uniformsCount>V&&(V=oe.stats.uniformsCount)}),V},C.getMaxAttributesCount=function(){var V=0;return ve.forEach(function(oe){oe.stats.attributesCount>V&&(V=oe.stats.attributesCount)}),V});function Ee(){ce={},Q={};for(var V=0;V<ve.length;++V)ye(ve[V],null,ve[V].attributes.map(function(oe){return[oe.location,oe.name]}))}return{clear:function(){var V=c.deleteShader.bind(c);_e(ce).forEach(V),ce={},_e(Q).forEach(V),Q={},ve.forEach(function(oe){c.deleteProgram(oe.program)}),ve.length=0,Me={},C.shaderCount=0},program:function(V,oe,Ce,Ge){h.command(V>=0,"missing vertex shader",Ce),h.command(oe>=0,"missing fragment shader",Ce);var de=Me[oe];de||(de=Me[oe]={});var Ve=de[V];if(Ve&&(Ve.refCount++,!Ge))return Ve;var he=new Be(oe,V);return C.shaderCount++,ye(he,Ce,Ge),Ve||(de[V]=he),ve.push(he),t(he,{destroy:function(){if(he.refCount--,he.refCount<=0){c.deleteProgram(he.program);var Oe=ve.indexOf(he);ve.splice(Oe,1),C.shaderCount--}de[he.vertId].refCount<=0&&(c.deleteShader(Q[he.vertId]),delete Q[he.vertId],delete Me[he.fragId][he.vertId]),Object.keys(Me[he.fragId]).length||(c.deleteShader(ce[he.fragId]),delete ce[he.fragId],delete Me[he.fragId])}})},restore:Ee,shader:xe,frag:-1,vert:-1}}var Vw=6408,Zi=5121,$w=3333,xl=5126;function qw(c,_,C,Z,ce,Q,ne){function be(ve){var Ae;_.next===null?(h(ce.preserveDrawingBuffer,'you must create a webgl context with "preserveDrawingBuffer":true in order to read pixels from the drawing buffer'),Ae=Zi):(h(_.next.colorAttachments[0].texture!==null,"You cannot read from a renderbuffer"),Ae=_.next.colorAttachments[0].texture._texture.type,Q.oes_texture_float?(h(Ae===Zi||Ae===xl,"Reading from a framebuffer is only allowed for the types 'uint8' and 'float'"),Ae===xl&&h(ne.readFloat,"Reading 'float' values is not permitted in your browser. For a fallback, please see: https://www.npmjs.com/package/glsl-read-float")):h(Ae===Zi,"Reading from a framebuffer is only allowed for the type 'uint8'"));var Be=0,ye=0,Ee=Z.framebufferWidth,V=Z.framebufferHeight,oe=null;e(ve)?oe=ve:ve&&(h.type(ve,"object","invalid arguments to regl.read()"),Be=ve.x|0,ye=ve.y|0,h(Be>=0&&Be<Z.framebufferWidth,"invalid x offset for regl.read"),h(ye>=0&&ye<Z.framebufferHeight,"invalid y offset for regl.read"),Ee=(ve.width||Z.framebufferWidth-Be)|0,V=(ve.height||Z.framebufferHeight-ye)|0,oe=ve.data||null),oe&&(Ae===Zi?h(oe instanceof Uint8Array,"buffer must be 'Uint8Array' when reading from a framebuffer of type 'uint8'"):Ae===xl&&h(oe instanceof Float32Array,"buffer must be 'Float32Array' when reading from a framebuffer of type 'float'")),h(Ee>0&&Ee+Be<=Z.framebufferWidth,"invalid width for read pixels"),h(V>0&&V+ye<=Z.framebufferHeight,"invalid height for read pixels"),C();var Ce=Ee*V*4;return oe||(Ae===Zi?oe=new Uint8Array(Ce):Ae===xl&&(oe=oe||new Float32Array(Ce))),h.isTypedArray(oe,"data buffer for regl.read() must be a typedarray"),h(oe.byteLength>=Ce,"data buffer for regl.read() too small"),c.pixelStorei($w,4),c.readPixels(Be,ye,Ee,V,Vw,Ae,oe),oe}function xe(ve){var Ae;return _.setFBO({framebuffer:ve.framebuffer},function(){Ae=be(ve)}),Ae}function Me(ve){return!ve||!("framebuffer"in ve)?be(ve):xe(ve)}return Me}function ti(c){return Array.prototype.slice.call(c)}function ni(c){return ti(c).join("")}function jw(){var c=0,_=[],C=[];function Z(Ae){for(var Be=0;Be<C.length;++Be)if(C[Be]===Ae)return _[Be];var ye="g"+c++;return _.push(ye),C.push(Ae),ye}function ce(){var Ae=[];function Be(){Ae.push.apply(Ae,ti(arguments))}var ye=[];function Ee(){var V="v"+c++;return ye.push(V),arguments.length>0&&(Ae.push(V,"="),Ae.push.apply(Ae,ti(arguments)),Ae.push(";")),V}return t(Be,{def:Ee,toString:function(){return ni([ye.length>0?"var "+ye.join(",")+";":"",ni(Ae)])}})}function Q(){var Ae=ce(),Be=ce(),ye=Ae.toString,Ee=Be.toString;function V(oe,Ce){Be(oe,Ce,"=",Ae.def(oe,Ce),";")}return t(function(){Ae.apply(Ae,ti(arguments))},{def:Ae.def,entry:Ae,exit:Be,save:V,set:function(oe,Ce,Ge){V(oe,Ce),Ae(oe,Ce,"=",Ge,";")},toString:function(){return ye()+Ee()}})}function ne(){var Ae=ni(arguments),Be=Q(),ye=Q(),Ee=Be.toString,V=ye.toString;return t(Be,{then:function(){return Be.apply(Be,ti(arguments)),this},else:function(){return ye.apply(ye,ti(arguments)),this},toString:function(){var oe=V();return oe&&(oe="else{"+oe+"}"),ni(["if(",Ae,"){",Ee(),"}",oe])}})}var be=ce(),xe={};function Me(Ae,Be){var ye=[];function Ee(){var de="a"+ye.length;return ye.push(de),de}Be=Be||0;for(var V=0;V<Be;++V)Ee();var oe=Q(),Ce=oe.toString,Ge=xe[Ae]=t(oe,{arg:Ee,toString:function(){return ni(["function(",ye.join(),"){",Ce(),"}"])}});return Ge}function ve(){var Ae=['"use strict";',be,"return {"];Object.keys(xe).forEach(function(Ee){Ae.push('"',Ee,'":',xe[Ee].toString(),",")}),Ae.push("}");var Be=ni(Ae).replace(/;/g,`;
`).replace(/}/g,`}
`).replace(/{/g,`{
`),ye=Function.apply(null,_.concat(Be));return ye.apply(null,C)}return{global:be,link:Z,block:ce,proc:Me,scope:Q,cond:ne,compile:ve}}var oi="xyzw".split(""),T0=5121,ri=1,Uu=2,zu=0,Vu=1,$u=2,qu=3,vl=4,C0=5,M0=6,L0="dither",k0="blend.enable",R0="blend.color",ju="blend.equation",Xu="blend.func",A0="depth.enable",E0="depth.func",P0="depth.range",F0="depth.mask",Yu="colorMask",O0="cull.enable",H0="cull.face",Ku="frontFace",Qu="lineWidth",I0="polygonOffset.enable",Zu="polygonOffset.offset",B0="sample.alpha",D0="sample.enable",Ju="sample.coverage",N0="stencil.enable",W0="stencil.mask",ep="stencil.func",tp="stencil.opFront",Ji="stencil.opBack",G0="scissor.enable",Sl="scissor.box",Hr="viewport",es="profile",ga="framebuffer",ts="vert",ns="frag",ba="elements",ya="primitive",xa="count",wl="offset",Tl="instances",os="vao",np="Width",op="Height",ai=ga+np,ii=ga+op,Xw=Hr+np,Yw=Hr+op,U0="drawingBuffer",z0=U0+np,V0=U0+op,Kw=[Xu,ju,ep,tp,Ji,Ju,Hr,Sl,Zu],si=34962,Qw=34963,Zw=35632,Jw=35633,$0=3553,e4=34067,t4=2884,n4=3042,o4=3024,r4=2960,a4=2929,i4=3089,s4=32823,l4=32926,c4=32928,rp=5126,Cl=35664,Ml=35665,Ll=35666,ap=5124,kl=35667,Rl=35668,Al=35669,ip=35670,El=35671,Pl=35672,Fl=35673,rs=35674,as=35675,is=35676,ss=35678,ls=35680,q0=4,cs=1028,va=1029,j0=2304,sp=2305,u4=32775,p4=32776,m4=519,Yr=7680,X0=0,Y0=1,K0=32774,d4=513,Q0=36160,f4=36064,xr={0:0,1:1,zero:0,one:1,"src color":768,"one minus src color":769,"src alpha":770,"one minus src alpha":771,"dst color":774,"one minus dst color":775,"dst alpha":772,"one minus dst alpha":773,"constant color":32769,"one minus constant color":32770,"constant alpha":32771,"one minus constant alpha":32772,"src alpha saturate":776},Z0=["constant color, constant alpha","one minus constant color, constant alpha","constant color, one minus constant alpha","one minus constant color, one minus constant alpha","constant alpha, constant color","constant alpha, one minus constant color","one minus constant alpha, constant color","one minus constant alpha, one minus constant color"],li={never:512,less:513,"<":513,equal:514,"=":514,"==":514,"===":514,lequal:515,"<=":515,greater:516,">":516,notequal:517,"!=":517,"!==":517,gequal:518,">=":518,always:519},Kr={0:0,zero:0,keep:7680,replace:7681,increment:7682,decrement:7683,"increment wrap":34055,"decrement wrap":34056,invert:5386},J0={frag:Zw,vert:Jw},lp={cw:j0,ccw:sp};function Ol(c){return Array.isArray(c)||e(c)||se(c)}function eh(c){return c.sort(function(_,C){return _===Hr?-1:C===Hr?1:_<C?-1:1})}function Mo(c,_,C,Z){this.thisDep=c,this.contextDep=_,this.propDep=C,this.append=Z}function Qr(c){return c&&!(c.thisDep||c.contextDep||c.propDep)}function In(c){return new Mo(!1,!1,!1,c)}function Eo(c,_){var C=c.type;if(C===zu){var Z=c.data.length;return new Mo(!0,Z>=1,Z>=2,_)}else if(C===vl){var ce=c.data;return new Mo(ce.thisDep,ce.contextDep,ce.propDep,_)}else{if(C===C0)return new Mo(!1,!1,!1,_);if(C===M0){for(var Q=!1,ne=!1,be=!1,xe=0;xe<c.data.length;++xe){var Me=c.data[xe];if(Me.type===Vu)be=!0;else if(Me.type===$u)ne=!0;else if(Me.type===qu)Q=!0;else if(Me.type===zu){Q=!0;var ve=Me.data;ve>=1&&(ne=!0),ve>=2&&(be=!0)}else Me.type===vl&&(Q=Q||Me.data.thisDep,ne=ne||Me.data.contextDep,be=be||Me.data.propDep)}return new Mo(Q,ne,be,_)}else return new Mo(C===qu,C===$u,C===Vu,_)}}var th=new Mo(!1,!1,!1,function(){});function h4(c,_,C,Z,ce,Q,ne,be,xe,Me,ve,Ae,Be,ye,Ee){var V=Me.Record,oe={add:32774,subtract:32778,"reverse subtract":32779};C.ext_blend_minmax&&(oe.min=u4,oe.max=p4);var Ce=C.angle_instanced_arrays,Ge=C.webgl_draw_buffers,de={dirty:!0,profile:Ee.profile},Ve={},he=[],Oe={},fe={};function He(v){return v.replace(".","_")}function rt(v,f,E){var U=He(v);he.push(v),Ve[U]=de[U]=!!E,Oe[U]=f}function yt(v,f,E){var U=He(v);he.push(v),Array.isArray(E)?(de[U]=E.slice(),Ve[U]=E.slice()):de[U]=Ve[U]=E,fe[U]=f}rt(L0,o4),rt(k0,n4),yt(R0,"blendColor",[0,0,0,0]),yt(ju,"blendEquationSeparate",[K0,K0]),yt(Xu,"blendFuncSeparate",[Y0,X0,Y0,X0]),rt(A0,a4,!0),yt(E0,"depthFunc",d4),yt(P0,"depthRange",[0,1]),yt(F0,"depthMask",!0),yt(Yu,Yu,[!0,!0,!0,!0]),rt(O0,t4),yt(H0,"cullFace",va),yt(Ku,Ku,sp),yt(Qu,Qu,1),rt(I0,s4),yt(Zu,"polygonOffset",[0,0]),rt(B0,l4),rt(D0,c4),yt(Ju,"sampleCoverage",[1,!1]),rt(N0,r4),yt(W0,"stencilMask",-1),yt(ep,"stencilFunc",[m4,0,-1]),yt(tp,"stencilOpSeparate",[cs,Yr,Yr,Yr]),yt(Ji,"stencilOpSeparate",[va,Yr,Yr,Yr]),rt(G0,i4),yt(Sl,"scissor",[0,0,c.drawingBufferWidth,c.drawingBufferHeight]),yt(Hr,Hr,[0,0,c.drawingBufferWidth,c.drawingBufferHeight]);var De={gl:c,context:Be,strings:_,next:Ve,current:de,draw:Ae,elements:Q,buffer:ce,shader:ve,attributes:Me.state,vao:Me,uniforms:xe,framebuffer:be,extensions:C,timer:ye,isBufferArgs:Ol},Le={primTypes:ja,compareFuncs:li,blendFuncs:xr,blendEquations:oe,stencilOps:Kr,glTypes:Fr,orientationType:lp};h.optional(function(){De.isArrayLike=kn}),Ge&&(Le.backBuffer=[va],Le.drawBuffer=un(Z.maxDrawbuffers,function(v){return v===0?[0]:un(v,function(f){return f4+f})}));var me=0;function mt(){var v=jw(),f=v.link,E=v.global;v.id=me++,v.batchId="0";var U=f(De),$=v.shared={props:"a0"};Object.keys(De).forEach(function(R){$[R]=E.def(U,".",R)}),h.optional(function(){v.CHECK=f(h),v.commandStr=h.guessCommand(),v.command=f(v.commandStr),v.assert=function(R,b,G){R("if(!(",b,"))",this.CHECK,".commandRaise(",f(G),",",this.command,");")},Le.invalidBlendCombinations=Z0});var H=v.next={},P=v.current={};Object.keys(fe).forEach(function(R){Array.isArray(de[R])&&(H[R]=E.def($.next,".",R),P[R]=E.def($.current,".",R))});var N=v.constants={};Object.keys(Le).forEach(function(R){N[R]=E.def(JSON.stringify(Le[R]))}),v.invoke=function(R,b){switch(b.type){case zu:var G=["this",$.context,$.props,v.batchId];return R.def(f(b.data),".call(",G.slice(0,Math.max(b.data.length+1,4)),")");case Vu:return R.def($.props,b.data);case $u:return R.def($.context,b.data);case qu:return R.def("this",b.data);case vl:return b.data.append(v,R),b.data.ref;case C0:return b.data.toString();case M0:return b.data.map(function(j){return v.invoke(R,j)})}},v.attribCache={};var S={};return v.scopeAttrib=function(R){var b=_.id(R);if(b in S)return S[b];var G=Me.scope[b];G||(G=Me.scope[b]=new V);var j=S[b]=f(G);return j},v}function Lt(v){var f=v.static,E=v.dynamic,U;if(es in f){var $=!!f[es];U=In(function(P,N){return $}),U.enable=$}else if(es in E){var H=E[es];U=Eo(H,function(P,N){return P.invoke(N,H)})}return U}function je(v,f){var E=v.static,U=v.dynamic;if(ga in E){var $=E[ga];return $?($=be.getFramebuffer($),h.command($,"invalid framebuffer object"),In(function(P,N){var S=P.link($),R=P.shared;N.set(R.framebuffer,".next",S);var b=R.context;return N.set(b,"."+ai,S+".width"),N.set(b,"."+ii,S+".height"),S})):In(function(P,N){var S=P.shared;N.set(S.framebuffer,".next","null");var R=S.context;return N.set(R,"."+ai,R+"."+z0),N.set(R,"."+ii,R+"."+V0),"null"})}else if(ga in U){var H=U[ga];return Eo(H,function(P,N){var S=P.invoke(N,H),R=P.shared,b=R.framebuffer,G=N.def(b,".getFramebuffer(",S,")");h.optional(function(){P.assert(N,"!"+S+"||"+G,"invalid framebuffer object")}),N.set(b,".next",G);var j=R.context;return N.set(j,"."+ai,G+"?"+G+".width:"+j+"."+z0),N.set(j,"."+ii,G+"?"+G+".height:"+j+"."+V0),G})}else return null}function It(v,f,E){var U=v.static,$=v.dynamic;function H(S){if(S in U){var R=U[S];h.commandType(R,"object","invalid "+S,E.commandStr);var b=!0,G=R.x|0,j=R.y|0,le,ue;return"width"in R?(le=R.width|0,h.command(le>=0,"invalid "+S,E.commandStr)):b=!1,"height"in R?(ue=R.height|0,h.command(ue>=0,"invalid "+S,E.commandStr)):b=!1,new Mo(!b&&f&&f.thisDep,!b&&f&&f.contextDep,!b&&f&&f.propDep,function(tt,Rt){var Xe=tt.shared.context,ut=le;"width"in R||(ut=Rt.def(Xe,".",ai,"-",G));var Tt=ue;return"height"in R||(Tt=Rt.def(Xe,".",ii,"-",j)),[G,j,ut,Tt]})}else if(S in $){var ae=$[S],Te=Eo(ae,function(tt,Rt){var Xe=tt.invoke(Rt,ae);h.optional(function(){tt.assert(Rt,Xe+"&&typeof "+Xe+'==="object"',"invalid "+S)});var ut=tt.shared.context,Tt=Rt.def(Xe,".x|0"),jt=Rt.def(Xe,".y|0"),Cn=Rt.def('"width" in ',Xe,"?",Xe,".width|0:","(",ut,".",ai,"-",Tt,")"),Lo=Rt.def('"height" in ',Xe,"?",Xe,".height|0:","(",ut,".",ii,"-",jt,")");return h.optional(function(){tt.assert(Rt,Cn+">=0&&"+Lo+">=0","invalid "+S)}),[Tt,jt,Cn,Lo]});return f&&(Te.thisDep=Te.thisDep||f.thisDep,Te.contextDep=Te.contextDep||f.contextDep,Te.propDep=Te.propDep||f.propDep),Te}else return f?new Mo(f.thisDep,f.contextDep,f.propDep,function(tt,Rt){var Xe=tt.shared.context;return[0,0,Rt.def(Xe,".",ai),Rt.def(Xe,".",ii)]}):null}var P=H(Hr);if(P){var N=P;P=new Mo(P.thisDep,P.contextDep,P.propDep,function(S,R){var b=N.append(S,R),G=S.shared.context;return R.set(G,"."+Xw,b[2]),R.set(G,"."+Yw,b[3]),b})}return{viewport:P,scissor_box:H(Sl)}}function xt(v,f){var E=v.static,U=typeof E[ns]=="string"&&typeof E[ts]=="string";if(U){if(Object.keys(f.dynamic).length>0)return null;var $=f.static,H=Object.keys($);if(H.length>0&&typeof $[H[0]]=="number"){for(var P=[],N=0;N<H.length;++N)h(typeof $[H[N]]=="number","must specify all vertex attribute locations when using vaos"),P.push([$[H[N]]|0,H[N]]);return P}}return null}function Ot(v,f,E){var U=v.static,$=v.dynamic;function H(b){if(b in U){var G=_.id(U[b]);h.optional(function(){ve.shader(J0[b],G,h.guessCommand())});var j=In(function(){return G});return j.id=G,j}else if(b in $){var le=$[b];return Eo(le,function(ue,ae){var Te=ue.invoke(ae,le),tt=ae.def(ue.shared.strings,".id(",Te,")");return h.optional(function(){ae(ue.shared.shader,".shader(",J0[b],",",tt,",",ue.command,");")}),tt})}return null}var P=H(ns),N=H(ts),S=null,R;return Qr(P)&&Qr(N)?(S=ve.program(N.id,P.id,null,E),R=In(function(b,G){return b.link(S)})):R=new Mo(P&&P.thisDep||N&&N.thisDep,P&&P.contextDep||N&&N.contextDep,P&&P.propDep||N&&N.propDep,function(b,G){var j=b.shared.shader,le;P?le=P.append(b,G):le=G.def(j,".",ns);var ue;N?ue=N.append(b,G):ue=G.def(j,".",ts);var ae=j+".program("+ue+","+le;return h.optional(function(){ae+=","+b.command}),G.def(ae+")")}),{frag:P,vert:N,progVar:R,program:S}}function qt(v,f){var E=v.static,U=v.dynamic;function $(){if(ba in E){var b=E[ba];Ol(b)?b=Q.getElements(Q.create(b,!0)):b&&(b=Q.getElements(b),h.command(b,"invalid elements",f.commandStr));var G=In(function(le,ue){if(b){var ae=le.link(b);return le.ELEMENTS=ae,ae}return le.ELEMENTS=null,null});return G.value=b,G}else if(ba in U){var j=U[ba];return Eo(j,function(le,ue){var ae=le.shared,Te=ae.isBufferArgs,tt=ae.elements,Rt=le.invoke(ue,j),Xe=ue.def("null"),ut=ue.def(Te,"(",Rt,")"),Tt=le.cond(ut).then(Xe,"=",tt,".createStream(",Rt,");").else(Xe,"=",tt,".getElements(",Rt,");");return h.optional(function(){le.assert(Tt.else,"!"+Rt+"||"+Xe,"invalid elements")}),ue.entry(Tt),ue.exit(le.cond(ut).then(tt,".destroyStream(",Xe,");")),le.ELEMENTS=Xe,Xe})}return null}var H=$();function P(){if(ya in E){var b=E[ya];return h.commandParameter(b,ja,"invalid primitve",f.commandStr),In(function(j,le){return ja[b]})}else if(ya in U){var G=U[ya];return Eo(G,function(j,le){var ue=j.constants.primTypes,ae=j.invoke(le,G);return h.optional(function(){j.assert(le,ae+" in "+ue,"invalid primitive, must be one of "+Object.keys(ja))}),le.def(ue,"[",ae,"]")})}else if(H)return Qr(H)?H.value?In(function(j,le){return le.def(j.ELEMENTS,".primType")}):In(function(){return q0}):new Mo(H.thisDep,H.contextDep,H.propDep,function(j,le){var ue=j.ELEMENTS;return le.def(ue,"?",ue,".primType:",q0)});return null}function N(b,G){if(b in E){var j=E[b]|0;return h.command(!G||j>=0,"invalid "+b,f.commandStr),In(function(ue,ae){return G&&(ue.OFFSET=j),j})}else if(b in U){var le=U[b];return Eo(le,function(ue,ae){var Te=ue.invoke(ae,le);return G&&(ue.OFFSET=Te,h.optional(function(){ue.assert(ae,Te+">=0","invalid "+b)})),Te})}else if(G&&H)return In(function(ue,ae){return ue.OFFSET="0",0});return null}var S=N(wl,!0);function R(){if(xa in E){var b=E[xa]|0;return h.command(typeof b=="number"&&b>=0,"invalid vertex count",f.commandStr),In(function(){return b})}else if(xa in U){var G=U[xa];return Eo(G,function(ue,ae){var Te=ue.invoke(ae,G);return h.optional(function(){ue.assert(ae,"typeof "+Te+'==="number"&&'+Te+">=0&&"+Te+"===("+Te+"|0)","invalid vertex count")}),Te})}else if(H)if(Qr(H)){if(H)return S?new Mo(S.thisDep,S.contextDep,S.propDep,function(ue,ae){var Te=ae.def(ue.ELEMENTS,".vertCount-",ue.OFFSET);return h.optional(function(){ue.assert(ae,Te+">=0","invalid vertex offset/element buffer too small")}),Te}):In(function(ue,ae){return ae.def(ue.ELEMENTS,".vertCount")});var j=In(function(){return-1});return h.optional(function(){j.MISSING=!0}),j}else{var le=new Mo(H.thisDep||S.thisDep,H.contextDep||S.contextDep,H.propDep||S.propDep,function(ue,ae){var Te=ue.ELEMENTS;return ue.OFFSET?ae.def(Te,"?",Te,".vertCount-",ue.OFFSET,":-1"):ae.def(Te,"?",Te,".vertCount:-1")});return h.optional(function(){le.DYNAMIC=!0}),le}return null}return{elements:H,primitive:P(),count:R(),instances:N(Tl,!1),offset:S}}function Bn(v,f){var E=v.static,U=v.dynamic,$={};return he.forEach(function(H){var P=He(H);function N(S,R){if(H in E){var b=S(E[H]);$[P]=In(function(){return b})}else if(H in U){var G=U[H];$[P]=Eo(G,function(j,le){return R(j,le,j.invoke(le,G))})}}switch(H){case O0:case k0:case L0:case N0:case A0:case G0:case I0:case B0:case D0:case F0:return N(function(S){return h.commandType(S,"boolean",H,f.commandStr),S},function(S,R,b){return h.optional(function(){S.assert(R,"typeof "+b+'==="boolean"',"invalid flag "+H,S.commandStr)}),b});case E0:return N(function(S){return h.commandParameter(S,li,"invalid "+H,f.commandStr),li[S]},function(S,R,b){var G=S.constants.compareFuncs;return h.optional(function(){S.assert(R,b+" in "+G,"invalid "+H+", must be one of "+Object.keys(li))}),R.def(G,"[",b,"]")});case P0:return N(function(S){return h.command(kn(S)&&S.length===2&&typeof S[0]=="number"&&typeof S[1]=="number"&&S[0]<=S[1],"depth range is 2d array",f.commandStr),S},function(S,R,b){h.optional(function(){S.assert(R,S.shared.isArrayLike+"("+b+")&&"+b+".length===2&&typeof "+b+'[0]==="number"&&typeof '+b+'[1]==="number"&&'+b+"[0]<="+b+"[1]","depth range must be a 2d array")});var G=R.def("+",b,"[0]"),j=R.def("+",b,"[1]");return[G,j]});case Xu:return N(function(S){h.commandType(S,"object","blend.func",f.commandStr);var R="srcRGB"in S?S.srcRGB:S.src,b="srcAlpha"in S?S.srcAlpha:S.src,G="dstRGB"in S?S.dstRGB:S.dst,j="dstAlpha"in S?S.dstAlpha:S.dst;return h.commandParameter(R,xr,P+".srcRGB",f.commandStr),h.commandParameter(b,xr,P+".srcAlpha",f.commandStr),h.commandParameter(G,xr,P+".dstRGB",f.commandStr),h.commandParameter(j,xr,P+".dstAlpha",f.commandStr),h.command(Z0.indexOf(R+", "+G)===-1,"unallowed blending combination (srcRGB, dstRGB) = ("+R+", "+G+")",f.commandStr),[xr[R],xr[G],xr[b],xr[j]]},function(S,R,b){var G=S.constants.blendFuncs;h.optional(function(){S.assert(R,b+"&&typeof "+b+'==="object"',"invalid blend func, must be an object")});function j(Xe,ut){var Tt=R.def('"',Xe,ut,'" in ',b,"?",b,".",Xe,ut,":",b,".",Xe);return h.optional(function(){S.assert(R,Tt+" in "+G,"invalid "+H+"."+Xe+ut+", must be one of "+Object.keys(xr))}),Tt}var le=j("src","RGB"),ue=j("dst","RGB");h.optional(function(){var Xe=S.constants.invalidBlendCombinations;S.assert(R,Xe+".indexOf("+le+'+", "+'+ue+") === -1 ","unallowed blending combination for (srcRGB, dstRGB)")});var ae=R.def(G,"[",le,"]"),Te=R.def(G,"[",j("src","Alpha"),"]"),tt=R.def(G,"[",ue,"]"),Rt=R.def(G,"[",j("dst","Alpha"),"]");return[ae,tt,Te,Rt]});case ju:return N(function(S){if(typeof S=="string")return h.commandParameter(S,oe,"invalid "+H,f.commandStr),[oe[S],oe[S]];if(typeof S=="object")return h.commandParameter(S.rgb,oe,H+".rgb",f.commandStr),h.commandParameter(S.alpha,oe,H+".alpha",f.commandStr),[oe[S.rgb],oe[S.alpha]];h.commandRaise("invalid blend.equation",f.commandStr)},function(S,R,b){var G=S.constants.blendEquations,j=R.def(),le=R.def(),ue=S.cond("typeof ",b,'==="string"');return h.optional(function(){function ae(Te,tt,Rt){S.assert(Te,Rt+" in "+G,"invalid "+tt+", must be one of "+Object.keys(oe))}ae(ue.then,H,b),S.assert(ue.else,b+"&&typeof "+b+'==="object"',"invalid "+H),ae(ue.else,H+".rgb",b+".rgb"),ae(ue.else,H+".alpha",b+".alpha")}),ue.then(j,"=",le,"=",G,"[",b,"];"),ue.else(j,"=",G,"[",b,".rgb];",le,"=",G,"[",b,".alpha];"),R(ue),[j,le]});case R0:return N(function(S){return h.command(kn(S)&&S.length===4,"blend.color must be a 4d array",f.commandStr),un(4,function(R){return+S[R]})},function(S,R,b){return h.optional(function(){S.assert(R,S.shared.isArrayLike+"("+b+")&&"+b+".length===4","blend.color must be a 4d array")}),un(4,function(G){return R.def("+",b,"[",G,"]")})});case W0:return N(function(S){return h.commandType(S,"number",P,f.commandStr),S|0},function(S,R,b){return h.optional(function(){S.assert(R,"typeof "+b+'==="number"',"invalid stencil.mask")}),R.def(b,"|0")});case ep:return N(function(S){h.commandType(S,"object",P,f.commandStr);var R=S.cmp||"keep",b=S.ref||0,G="mask"in S?S.mask:-1;return h.commandParameter(R,li,H+".cmp",f.commandStr),h.commandType(b,"number",H+".ref",f.commandStr),h.commandType(G,"number",H+".mask",f.commandStr),[li[R],b,G]},function(S,R,b){var G=S.constants.compareFuncs;h.optional(function(){function ae(){S.assert(R,Array.prototype.join.call(arguments,""),"invalid stencil.func")}ae(b+"&&typeof ",b,'==="object"'),ae('!("cmp" in ',b,")||(",b,".cmp in ",G,")")});var j=R.def('"cmp" in ',b,"?",G,"[",b,".cmp]",":",Yr),le=R.def(b,".ref|0"),ue=R.def('"mask" in ',b,"?",b,".mask|0:-1");return[j,le,ue]});case tp:case Ji:return N(function(S){h.commandType(S,"object",P,f.commandStr);var R=S.fail||"keep",b=S.zfail||"keep",G=S.zpass||"keep";return h.commandParameter(R,Kr,H+".fail",f.commandStr),h.commandParameter(b,Kr,H+".zfail",f.commandStr),h.commandParameter(G,Kr,H+".zpass",f.commandStr),[H===Ji?va:cs,Kr[R],Kr[b],Kr[G]]},function(S,R,b){var G=S.constants.stencilOps;h.optional(function(){S.assert(R,b+"&&typeof "+b+'==="object"',"invalid "+H)});function j(le){return h.optional(function(){S.assert(R,'!("'+le+'" in '+b+")||("+b+"."+le+" in "+G+")","invalid "+H+"."+le+", must be one of "+Object.keys(Kr))}),R.def('"',le,'" in ',b,"?",G,"[",b,".",le,"]:",Yr)}return[H===Ji?va:cs,j("fail"),j("zfail"),j("zpass")]});case Zu:return N(function(S){h.commandType(S,"object",P,f.commandStr);var R=S.factor|0,b=S.units|0;return h.commandType(R,"number",P+".factor",f.commandStr),h.commandType(b,"number",P+".units",f.commandStr),[R,b]},function(S,R,b){h.optional(function(){S.assert(R,b+"&&typeof "+b+'==="object"',"invalid "+H)});var G=R.def(b,".factor|0"),j=R.def(b,".units|0");return[G,j]});case H0:return N(function(S){var R=0;return S==="front"?R=cs:S==="back"&&(R=va),h.command(!!R,P,f.commandStr),R},function(S,R,b){return h.optional(function(){S.assert(R,b+'==="front"||'+b+'==="back"',"invalid cull.face")}),R.def(b,'==="front"?',cs,":",va)});case Qu:return N(function(S){return h.command(typeof S=="number"&&S>=Z.lineWidthDims[0]&&S<=Z.lineWidthDims[1],"invalid line width, must be a positive number between "+Z.lineWidthDims[0]+" and "+Z.lineWidthDims[1],f.commandStr),S},function(S,R,b){return h.optional(function(){S.assert(R,"typeof "+b+'==="number"&&'+b+">="+Z.lineWidthDims[0]+"&&"+b+"<="+Z.lineWidthDims[1],"invalid line width")}),b});case Ku:return N(function(S){return h.commandParameter(S,lp,P,f.commandStr),lp[S]},function(S,R,b){return h.optional(function(){S.assert(R,b+'==="cw"||'+b+'==="ccw"',"invalid frontFace, must be one of cw,ccw")}),R.def(b+'==="cw"?'+j0+":"+sp)});case Yu:return N(function(S){return h.command(kn(S)&&S.length===4,"color.mask must be length 4 array",f.commandStr),S.map(function(R){return!!R})},function(S,R,b){return h.optional(function(){S.assert(R,S.shared.isArrayLike+"("+b+")&&"+b+".length===4","invalid color.mask")}),un(4,function(G){return"!!"+b+"["+G+"]"})});case Ju:return N(function(S){h.command(typeof S=="object"&&S,P,f.commandStr);var R="value"in S?S.value:1,b=!!S.invert;return h.command(typeof R=="number"&&R>=0&&R<=1,"sample.coverage.value must be a number between 0 and 1",f.commandStr),[R,b]},function(S,R,b){h.optional(function(){S.assert(R,b+"&&typeof "+b+'==="object"',"invalid sample.coverage")});var G=R.def('"value" in ',b,"?+",b,".value:1"),j=R.def("!!",b,".invert");return[G,j]})}}),$}function Kn(v,f){var E=v.static,U=v.dynamic,$={};return Object.keys(E).forEach(function(H){var P=E[H],N;if(typeof P=="number"||typeof P=="boolean")N=In(function(){return P});else if(typeof P=="function"){var S=P._reglType;S==="texture2d"||S==="textureCube"?N=In(function(R){return R.link(P)}):S==="framebuffer"||S==="framebufferCube"?(h.command(P.color.length>0,'missing color attachment for framebuffer sent to uniform "'+H+'"',f.commandStr),N=In(function(R){return R.link(P.color[0])})):h.commandRaise('invalid data for uniform "'+H+'"',f.commandStr)}else kn(P)?N=In(function(R){var b=R.global.def("[",un(P.length,function(G){return h.command(typeof P[G]=="number"||typeof P[G]=="boolean","invalid uniform "+H,R.commandStr),P[G]}),"]");return b}):h.commandRaise('invalid or missing data for uniform "'+H+'"',f.commandStr);N.value=P,$[H]=N}),Object.keys(U).forEach(function(H){var P=U[H];$[H]=Eo(P,function(N,S){return N.invoke(S,P)})}),$}function Wt(v,f){var E=v.static,U=v.dynamic,$={};return Object.keys(E).forEach(function(H){var P=E[H],N=_.id(H),S=new V;if(Ol(P))S.state=ri,S.buffer=ce.getBuffer(ce.create(P,si,!1,!0)),S.type=0;else{var R=ce.getBuffer(P);if(R)S.state=ri,S.buffer=R,S.type=0;else if(h.command(typeof P=="object"&&P,"invalid data for attribute "+H,f.commandStr),"constant"in P){var b=P.constant;S.buffer="null",S.state=Uu,typeof b=="number"?S.x=b:(h.command(kn(b)&&b.length>0&&b.length<=4,"invalid constant for attribute "+H,f.commandStr),oi.forEach(function(tt,Rt){Rt<b.length&&(S[tt]=b[Rt])}))}else{Ol(P.buffer)?R=ce.getBuffer(ce.create(P.buffer,si,!1,!0)):R=ce.getBuffer(P.buffer),h.command(!!R,'missing buffer for attribute "'+H+'"',f.commandStr);var G=P.offset|0;h.command(G>=0,'invalid offset for attribute "'+H+'"',f.commandStr);var j=P.stride|0;h.command(j>=0&&j<256,'invalid stride for attribute "'+H+'", must be integer betweeen [0, 255]',f.commandStr);var le=P.size|0;h.command(!("size"in P)||le>0&&le<=4,'invalid size for attribute "'+H+'", must be 1,2,3,4',f.commandStr);var ue=!!P.normalized,ae=0;"type"in P&&(h.commandParameter(P.type,Fr,"invalid type for attribute "+H,f.commandStr),ae=Fr[P.type]);var Te=P.divisor|0;"divisor"in P&&(h.command(Te===0||Ce,'cannot specify divisor for attribute "'+H+'", instancing not supported',f.commandStr),h.command(Te>=0,'invalid divisor for attribute "'+H+'"',f.commandStr)),h.optional(function(){var tt=f.commandStr,Rt=["buffer","offset","divisor","normalized","type","size","stride"];Object.keys(P).forEach(function(Xe){h.command(Rt.indexOf(Xe)>=0,'unknown parameter "'+Xe+'" for attribute pointer "'+H+'" (valid parameters are '+Rt+")",tt)})}),S.buffer=R,S.state=ri,S.size=le,S.normalized=ue,S.type=ae||R.dtype,S.offset=G,S.stride=j,S.divisor=Te}}$[H]=In(function(tt,Rt){var Xe=tt.attribCache;if(N in Xe)return Xe[N];var ut={isStream:!1};return Object.keys(S).forEach(function(Tt){ut[Tt]=S[Tt]}),S.buffer&&(ut.buffer=tt.link(S.buffer),ut.type=ut.type||ut.buffer+".dtype"),Xe[N]=ut,ut})}),Object.keys(U).forEach(function(H){var P=U[H];function N(S,R){var b=S.invoke(R,P),G=S.shared,j=S.constants,le=G.isBufferArgs,ue=G.buffer;h.optional(function(){S.assert(R,b+"&&(typeof "+b+'==="object"||typeof '+b+'==="function")&&('+le+"("+b+")||"+ue+".getBuffer("+b+")||"+ue+".getBuffer("+b+".buffer)||"+le+"("+b+'.buffer)||("constant" in '+b+"&&(typeof "+b+'.constant==="number"||'+G.isArrayLike+"("+b+".constant))))",'invalid dynamic attribute "'+H+'"')});var ae={isStream:R.def(!1)},Te=new V;Te.state=ri,Object.keys(Te).forEach(function(ut){ae[ut]=R.def(""+Te[ut])});var tt=ae.buffer,Rt=ae.type;R("if(",le,"(",b,")){",ae.isStream,"=true;",tt,"=",ue,".createStream(",si,",",b,");",Rt,"=",tt,".dtype;","}else{",tt,"=",ue,".getBuffer(",b,");","if(",tt,"){",Rt,"=",tt,".dtype;",'}else if("constant" in ',b,"){",ae.state,"=",Uu,";","if(typeof "+b+'.constant === "number"){',ae[oi[0]],"=",b,".constant;",oi.slice(1).map(function(ut){return ae[ut]}).join("="),"=0;","}else{",oi.map(function(ut,Tt){return ae[ut]+"="+b+".constant.length>"+Tt+"?"+b+".constant["+Tt+"]:0;"}).join(""),"}}else{","if(",le,"(",b,".buffer)){",tt,"=",ue,".createStream(",si,",",b,".buffer);","}else{",tt,"=",ue,".getBuffer(",b,".buffer);","}",Rt,'="type" in ',b,"?",j.glTypes,"[",b,".type]:",tt,".dtype;",ae.normalized,"=!!",b,".normalized;");function Xe(ut){R(ae[ut],"=",b,".",ut,"|0;")}return Xe("size"),Xe("offset"),Xe("stride"),Xe("divisor"),R("}}"),R.exit("if(",ae.isStream,"){",ue,".destroyStream(",tt,");","}"),ae}$[H]=Eo(P,N)}),$}function Vn(v,f){var E=v.static,U=v.dynamic;if(os in E){var $=E[os];return $!==null&&Me.getVAO($)===null&&($=Me.createVAO($)),In(function(P){return P.link(Me.getVAO($))})}else if(os in U){var H=U[os];return Eo(H,function(P,N){var S=P.invoke(N,H);return N.def(P.shared.vao+".getVAO("+S+")")})}return null}function dn(v){var f=v.static,E=v.dynamic,U={};return Object.keys(f).forEach(function($){var H=f[$];U[$]=In(function(P,N){return typeof H=="number"||typeof H=="boolean"?""+H:P.link(H)})}),Object.keys(E).forEach(function($){var H=E[$];U[$]=Eo(H,function(P,N){return P.invoke(N,H)})}),U}function Dn(v,f,E,U,$){var H=v.static,P=v.dynamic;h.optional(function(){var Xe=[ga,ts,ns,ba,ya,wl,xa,Tl,es,os].concat(he);function ut(Tt){Object.keys(Tt).forEach(function(jt){h.command(Xe.indexOf(jt)>=0,'unknown parameter "'+jt+'"',$.commandStr)})}ut(H),ut(P)});var N=xt(v,f),S=je(v,$),R=It(v,S,$),b=qt(v,$),G=Bn(v,$),j=Ot(v,$,N);function le(Xe){var ut=R[Xe];ut&&(G[Xe]=ut)}le(Hr),le(He(Sl));var ue=Object.keys(G).length>0,ae={framebuffer:S,draw:b,shader:j,state:G,dirty:ue,scopeVAO:null,drawVAO:null,useVAO:!1,attributes:{}};if(ae.profile=Lt(v,$),ae.uniforms=Kn(E,$),ae.drawVAO=ae.scopeVAO=Vn(v,$),!ae.drawVAO&&j.program&&!N&&C.angle_instanced_arrays){var Te=!0,tt=j.program.attributes.map(function(Xe){var ut=f.static[Xe];return Te=Te&&!!ut,ut});if(Te&&tt.length>0){var Rt=Me.getVAO(Me.createVAO(tt));ae.drawVAO=new Mo(null,null,null,function(Xe,ut){return Xe.link(Rt)}),ae.useVAO=!0}}return N?ae.useVAO=!0:ae.attributes=Wt(f,$),ae.context=dn(U,$),ae}function $n(v,f,E){var U=v.shared,$=U.context,H=v.scope();Object.keys(E).forEach(function(P){f.save($,"."+P);var N=E[P],S=N.append(v,f);Array.isArray(S)?H($,".",P,"=[",S.join(),"];"):H($,".",P,"=",S,";")}),f(H)}function qn(v,f,E,U){var $=v.shared,H=$.gl,P=$.framebuffer,N;Ge&&(N=f.def($.extensions,".webgl_draw_buffers"));var S=v.constants,R=S.drawBuffer,b=S.backBuffer,G;E?G=E.append(v,f):G=f.def(P,".next"),U||f("if(",G,"!==",P,".cur){"),f("if(",G,"){",H,".bindFramebuffer(",Q0,",",G,".framebuffer);"),Ge&&f(N,".drawBuffersWEBGL(",R,"[",G,".colorAttachments.length]);"),f("}else{",H,".bindFramebuffer(",Q0,",null);"),Ge&&f(N,".drawBuffersWEBGL(",b,");"),f("}",P,".cur=",G,";"),U||f("}")}function to(v,f,E){var U=v.shared,$=U.gl,H=v.current,P=v.next,N=U.current,S=U.next,R=v.cond(N,".dirty");he.forEach(function(b){var G=He(b);if(!(G in E.state)){var j,le;if(G in P){j=P[G],le=H[G];var ue=un(de[G].length,function(Te){return R.def(j,"[",Te,"]")});R(v.cond(ue.map(function(Te,tt){return Te+"!=="+le+"["+tt+"]"}).join("||")).then($,".",fe[G],"(",ue,");",ue.map(function(Te,tt){return le+"["+tt+"]="+Te}).join(";"),";"))}else{j=R.def(S,".",G);var ae=v.cond(j,"!==",N,".",G);R(ae),G in Oe?ae(v.cond(j).then($,".enable(",Oe[G],");").else($,".disable(",Oe[G],");"),N,".",G,"=",j,";"):ae($,".",fe[G],"(",j,");",N,".",G,"=",j,";")}}}),Object.keys(E.state).length===0&&R(N,".dirty=false;"),f(R)}function ao(v,f,E,U){var $=v.shared,H=v.current,P=$.current,N=$.gl;eh(Object.keys(E)).forEach(function(S){var R=E[S];if(!(U&&!U(R))){var b=R.append(v,f);if(Oe[S]){var G=Oe[S];Qr(R)?b?f(N,".enable(",G,");"):f(N,".disable(",G,");"):f(v.cond(b).then(N,".enable(",G,");").else(N,".disable(",G,");")),f(P,".",S,"=",b,";")}else if(kn(b)){var j=H[S];f(N,".",fe[S],"(",b,");",b.map(function(le,ue){return j+"["+ue+"]="+le}).join(";"),";")}else f(N,".",fe[S],"(",b,");",P,".",S,"=",b,";")}})}function Rn(v,f){Ce&&(v.instancing=f.def(v.shared.extensions,".angle_instanced_arrays"))}function kt(v,f,E,U,$){var H=v.shared,P=v.stats,N=H.current,S=H.timer,R=E.profile;function b(){return typeof performance>"u"?"Date.now()":"performance.now()"}var G,j;function le(Xe){G=f.def(),Xe(G,"=",b(),";"),typeof $=="string"?Xe(P,".count+=",$,";"):Xe(P,".count++;"),ye&&(U?(j=f.def(),Xe(j,"=",S,".getNumPendingQueries();")):Xe(S,".beginQuery(",P,");"))}function ue(Xe){Xe(P,".cpuTime+=",b(),"-",G,";"),ye&&(U?Xe(S,".pushScopeStats(",j,",",S,".getNumPendingQueries(),",P,");"):Xe(S,".endQuery();"))}function ae(Xe){var ut=f.def(N,".profile");f(N,".profile=",Xe,";"),f.exit(N,".profile=",ut,";")}var Te;if(R){if(Qr(R)){R.enable?(le(f),ue(f.exit),ae("true")):ae("false");return}Te=R.append(v,f),ae(Te)}else Te=f.def(N,".profile");var tt=v.block();le(tt),f("if(",Te,"){",tt,"}");var Rt=v.block();ue(Rt),f.exit("if(",Te,"){",Rt,"}")}function io(v,f,E,U,$){var H=v.shared;function P(S){switch(S){case Cl:case kl:case El:return 2;case Ml:case Rl:case Pl:return 3;case Ll:case Al:case Fl:return 4;default:return 1}}function N(S,R,b){var G=H.gl,j=f.def(S,".location"),le=f.def(H.attributes,"[",j,"]"),ue=b.state,ae=b.buffer,Te=[b.x,b.y,b.z,b.w],tt=["buffer","normalized","offset","stride"];function Rt(){f("if(!",le,".buffer){",G,".enableVertexAttribArray(",j,");}");var ut=b.type,Tt;if(b.size?Tt=f.def(b.size,"||",R):Tt=R,f("if(",le,".type!==",ut,"||",le,".size!==",Tt,"||",tt.map(function(Cn){return le+"."+Cn+"!=="+b[Cn]}).join("||"),"){",G,".bindBuffer(",si,",",ae,".buffer);",G,".vertexAttribPointer(",[j,Tt,ut,b.normalized,b.stride,b.offset],");",le,".type=",ut,";",le,".size=",Tt,";",tt.map(function(Cn){return le+"."+Cn+"="+b[Cn]+";"}).join(""),"}"),Ce){var jt=b.divisor;f("if(",le,".divisor!==",jt,"){",v.instancing,".vertexAttribDivisorANGLE(",[j,jt],");",le,".divisor=",jt,";}")}}function Xe(){f("if(",le,".buffer){",G,".disableVertexAttribArray(",j,");",le,".buffer=null;","}if(",oi.map(function(ut,Tt){return le+"."+ut+"!=="+Te[Tt]}).join("||"),"){",G,".vertexAttrib4f(",j,",",Te,");",oi.map(function(ut,Tt){return le+"."+ut+"="+Te[Tt]+";"}).join(""),"}")}ue===ri?Rt():ue===Uu?Xe():(f("if(",ue,"===",ri,"){"),Rt(),f("}else{"),Xe(),f("}"))}U.forEach(function(S){var R=S.name,b=E.attributes[R],G;if(b){if(!$(b))return;G=b.append(v,f)}else{if(!$(th))return;var j=v.scopeAttrib(R);h.optional(function(){v.assert(f,j+".state","missing attribute "+R)}),G={},Object.keys(new V).forEach(function(le){G[le]=f.def(j,".",le)})}N(v.link(S),P(S.info.type),G)})}function Kt(v,f,E,U,$){for(var H=v.shared,P=H.gl,N,S=0;S<U.length;++S){var R=U[S],b=R.name,G=R.info.type,j=E.uniforms[b],le=v.link(R),ue=le+".location",ae;if(j){if(!$(j))continue;if(Qr(j)){var Te=j.value;if(h.command(Te!==null&&typeof Te<"u",'missing uniform "'+b+'"',v.commandStr),G===ss||G===ls){h.command(typeof Te=="function"&&(G===ss&&(Te._reglType==="texture2d"||Te._reglType==="framebuffer")||G===ls&&(Te._reglType==="textureCube"||Te._reglType==="framebufferCube")),"invalid texture for uniform "+b,v.commandStr);var tt=v.link(Te._texture||Te.color[0]._texture);f(P,".uniform1i(",ue,",",tt+".bind());"),f.exit(tt,".unbind();")}else if(G===rs||G===as||G===is){h.optional(function(){h.command(kn(Te),"invalid matrix for uniform "+b,v.commandStr),h.command(G===rs&&Te.length===4||G===as&&Te.length===9||G===is&&Te.length===16,"invalid length for matrix uniform "+b,v.commandStr)});var Rt=v.global.def("new Float32Array(["+Array.prototype.slice.call(Te)+"])"),Xe=2;G===as?Xe=3:G===is&&(Xe=4),f(P,".uniformMatrix",Xe,"fv(",ue,",false,",Rt,");")}else{switch(G){case rp:h.commandType(Te,"number","uniform "+b,v.commandStr),N="1f";break;case Cl:h.command(kn(Te)&&Te.length===2,"uniform "+b,v.commandStr),N="2f";break;case Ml:h.command(kn(Te)&&Te.length===3,"uniform "+b,v.commandStr),N="3f";break;case Ll:h.command(kn(Te)&&Te.length===4,"uniform "+b,v.commandStr),N="4f";break;case ip:h.commandType(Te,"boolean","uniform "+b,v.commandStr),N="1i";break;case ap:h.commandType(Te,"number","uniform "+b,v.commandStr),N="1i";break;case El:h.command(kn(Te)&&Te.length===2,"uniform "+b,v.commandStr),N="2i";break;case kl:h.command(kn(Te)&&Te.length===2,"uniform "+b,v.commandStr),N="2i";break;case Pl:h.command(kn(Te)&&Te.length===3,"uniform "+b,v.commandStr),N="3i";break;case Rl:h.command(kn(Te)&&Te.length===3,"uniform "+b,v.commandStr),N="3i";break;case Fl:h.command(kn(Te)&&Te.length===4,"uniform "+b,v.commandStr),N="4i";break;case Al:h.command(kn(Te)&&Te.length===4,"uniform "+b,v.commandStr),N="4i";break}f(P,".uniform",N,"(",ue,",",kn(Te)?Array.prototype.slice.call(Te):Te,");")}continue}else ae=j.append(v,f)}else{if(!$(th))continue;ae=f.def(H.uniforms,"[",_.id(b),"]")}G===ss?(h(!Array.isArray(ae),"must specify a scalar prop for textures"),f("if(",ae,"&&",ae,'._reglType==="framebuffer"){',ae,"=",ae,".color[0];","}")):G===ls&&(h(!Array.isArray(ae),"must specify a scalar prop for cube maps"),f("if(",ae,"&&",ae,'._reglType==="framebufferCube"){',ae,"=",ae,".color[0];","}")),h.optional(function(){function Lo(ir,lh){v.assert(f,ir,'bad data or missing for uniform "'+b+'".  '+lh)}function cp(ir){h(!Array.isArray(ae),"must not specify an array type for uniform"),Lo("typeof "+ae+'==="'+ir+'"',"invalid type, expected "+ir)}function qo(ir,lh){Array.isArray(ae)?h(ae.length===ir,"must have length "+ir):Lo(H.isArrayLike+"("+ae+")&&"+ae+".length==="+ir,"invalid vector, should have length "+ir,v.commandStr)}function sh(ir){h(!Array.isArray(ae),"must not specify a value type"),Lo("typeof "+ae+'==="function"&&'+ae+'._reglType==="texture'+(ir===$0?"2d":"Cube")+'"',"invalid texture type",v.commandStr)}switch(G){case ap:cp("number");break;case kl:qo(2,"number");break;case Rl:qo(3,"number");break;case Al:qo(4,"number");break;case rp:cp("number");break;case Cl:qo(2,"number");break;case Ml:qo(3,"number");break;case Ll:qo(4,"number");break;case ip:cp("boolean");break;case El:qo(2,"boolean");break;case Pl:qo(3,"boolean");break;case Fl:qo(4,"boolean");break;case rs:qo(4,"number");break;case as:qo(9,"number");break;case is:qo(16,"number");break;case ss:sh($0);break;case ls:sh(e4);break}});var ut=1;switch(G){case ss:case ls:var Tt=f.def(ae,"._texture");f(P,".uniform1i(",ue,",",Tt,".bind());"),f.exit(Tt,".unbind();");continue;case ap:case ip:N="1i";break;case kl:case El:N="2i",ut=2;break;case Rl:case Pl:N="3i",ut=3;break;case Al:case Fl:N="4i",ut=4;break;case rp:N="1f";break;case Cl:N="2f",ut=2;break;case Ml:N="3f",ut=3;break;case Ll:N="4f",ut=4;break;case rs:N="Matrix2fv";break;case as:N="Matrix3fv";break;case is:N="Matrix4fv";break}if(f(P,".uniform",N,"(",ue,","),N.charAt(0)==="M"){var jt=Math.pow(G-rs+2,2),Cn=v.global.def("new Float32Array(",jt,")");Array.isArray(ae)?f("false,(",un(jt,function(Lo){return Cn+"["+Lo+"]="+ae[Lo]}),",",Cn,")"):f("false,(Array.isArray(",ae,")||",ae," instanceof Float32Array)?",ae,":(",un(jt,function(Lo){return Cn+"["+Lo+"]="+ae+"["+Lo+"]"}),",",Cn,")")}else ut>1?f(un(ut,function(Lo){return Array.isArray(ae)?ae[Lo]:ae+"["+Lo+"]"})):(h(!Array.isArray(ae),"uniform value must not be an array"),f(ae));f(");")}}function ct(v,f,E,U){var $=v.shared,H=$.gl,P=$.draw,N=U.draw;function S(){var Tt=N.elements,jt,Cn=f;return Tt?((Tt.contextDep&&U.contextDynamic||Tt.propDep)&&(Cn=E),jt=Tt.append(v,Cn)):jt=Cn.def(P,".",ba),jt&&Cn("if("+jt+")"+H+".bindBuffer("+Qw+","+jt+".buffer.buffer);"),jt}function R(){var Tt=N.count,jt,Cn=f;return Tt?((Tt.contextDep&&U.contextDynamic||Tt.propDep)&&(Cn=E),jt=Tt.append(v,Cn),h.optional(function(){Tt.MISSING&&v.assert(f,"false","missing vertex count"),Tt.DYNAMIC&&v.assert(Cn,jt+">=0","missing vertex count")})):(jt=Cn.def(P,".",xa),h.optional(function(){v.assert(Cn,jt+">=0","missing vertex count")})),jt}var b=S();function G(Tt){var jt=N[Tt];return jt?jt.contextDep&&U.contextDynamic||jt.propDep?jt.append(v,E):jt.append(v,f):f.def(P,".",Tt)}var j=G(ya),le=G(wl),ue=R();if(typeof ue=="number"){if(ue===0)return}else E("if(",ue,"){"),E.exit("}");var ae,Te;Ce&&(ae=G(Tl),Te=v.instancing);var tt=b+".type",Rt=N.elements&&Qr(N.elements);function Xe(){function Tt(){E(Te,".drawElementsInstancedANGLE(",[j,ue,tt,le+"<<(("+tt+"-"+T0+")>>1)",ae],");")}function jt(){E(Te,".drawArraysInstancedANGLE(",[j,le,ue,ae],");")}b?Rt?Tt():(E("if(",b,"){"),Tt(),E("}else{"),jt(),E("}")):jt()}function ut(){function Tt(){E(H+".drawElements("+[j,ue,tt,le+"<<(("+tt+"-"+T0+")>>1)"]+");")}function jt(){E(H+".drawArrays("+[j,le,ue]+");")}b?Rt?Tt():(E("if(",b,"){"),Tt(),E("}else{"),jt(),E("}")):jt()}Ce&&(typeof ae!="number"||ae>=0)?typeof ae=="string"?(E("if(",ae,">0){"),Xe(),E("}else if(",ae,"<0){"),ut(),E("}")):Xe():ut()}function Nt(v,f,E,U,$){var H=mt(),P=H.proc("body",$);return h.optional(function(){H.commandStr=f.commandStr,H.command=H.link(f.commandStr)}),Ce&&(H.instancing=P.def(H.shared.extensions,".angle_instanced_arrays")),v(H,P,E,U),H.compile().body}function Vt(v,f,E,U){Rn(v,f),E.useVAO?E.drawVAO?f(v.shared.vao,".setVAO(",E.drawVAO.append(v,f),");"):f(v.shared.vao,".setVAO(",v.shared.vao,".targetVAO);"):(f(v.shared.vao,".setVAO(null);"),io(v,f,E,U.attributes,function(){return!0})),Kt(v,f,E,U.uniforms,function(){return!0}),ct(v,f,f,E)}function An(v,f){var E=v.proc("draw",1);Rn(v,E),$n(v,E,f.context),qn(v,E,f.framebuffer),to(v,E,f),ao(v,E,f.state),kt(v,E,f,!1,!0);var U=f.shader.progVar.append(v,E);if(E(v.shared.gl,".useProgram(",U,".program);"),f.shader.program)Vt(v,E,f,f.shader.program);else{E(v.shared.vao,".setVAO(null);");var $=v.global.def("{}"),H=E.def(U,".id"),P=E.def($,"[",H,"]");E(v.cond(P).then(P,".call(this,a0);").else(P,"=",$,"[",H,"]=",v.link(function(N){return Nt(Vt,v,f,N,1)}),"(",U,");",P,".call(this,a0);"))}Object.keys(f.state).length>0&&E(v.shared.current,".dirty=true;")}function vr(v,f,E,U){v.batchId="a1",Rn(v,f);function $(){return!0}io(v,f,E,U.attributes,$),Kt(v,f,E,U.uniforms,$),ct(v,f,f,E)}function Sa(v,f,E,U){Rn(v,f);var $=E.contextDep,H=f.def(),P="a0",N="a1",S=f.def();v.shared.props=S,v.batchId=H;var R=v.scope(),b=v.scope();f(R.entry,"for(",H,"=0;",H,"<",N,";++",H,"){",S,"=",P,"[",H,"];",b,"}",R.exit);function G(tt){return tt.contextDep&&$||tt.propDep}function j(tt){return!G(tt)}if(E.needsContext&&$n(v,b,E.context),E.needsFramebuffer&&qn(v,b,E.framebuffer),ao(v,b,E.state,G),E.profile&&G(E.profile)&&kt(v,b,E,!1,!0),U)E.useVAO?E.drawVAO?G(E.drawVAO)?b(v.shared.vao,".setVAO(",E.drawVAO.append(v,b),");"):R(v.shared.vao,".setVAO(",E.drawVAO.append(v,R),");"):R(v.shared.vao,".setVAO(",v.shared.vao,".targetVAO);"):(R(v.shared.vao,".setVAO(null);"),io(v,R,E,U.attributes,j),io(v,b,E,U.attributes,G)),Kt(v,R,E,U.uniforms,j),Kt(v,b,E,U.uniforms,G),ct(v,R,b,E);else{var le=v.global.def("{}"),ue=E.shader.progVar.append(v,b),ae=b.def(ue,".id"),Te=b.def(le,"[",ae,"]");b(v.shared.gl,".useProgram(",ue,".program);","if(!",Te,"){",Te,"=",le,"[",ae,"]=",v.link(function(tt){return Nt(vr,v,E,tt,2)}),"(",ue,");}",Te,".call(this,a0[",H,"],",H,");")}}function w(v,f){var E=v.proc("batch",2);v.batchId="0",Rn(v,E);var U=!1,$=!0;Object.keys(f.context).forEach(function(le){U=U||f.context[le].propDep}),U||($n(v,E,f.context),$=!1);var H=f.framebuffer,P=!1;H?(H.propDep?U=P=!0:H.contextDep&&U&&(P=!0),P||qn(v,E,H)):qn(v,E,null),f.state.viewport&&f.state.viewport.propDep&&(U=!0);function N(le){return le.contextDep&&U||le.propDep}to(v,E,f),ao(v,E,f.state,function(le){return!N(le)}),(!f.profile||!N(f.profile))&&kt(v,E,f,!1,"a1"),f.contextDep=U,f.needsContext=$,f.needsFramebuffer=P;var S=f.shader.progVar;if(S.contextDep&&U||S.propDep)Sa(v,E,f,null);else{var R=S.append(v,E);if(E(v.shared.gl,".useProgram(",R,".program);"),f.shader.program)Sa(v,E,f,f.shader.program);else{E(v.shared.vao,".setVAO(null);");var b=v.global.def("{}"),G=E.def(R,".id"),j=E.def(b,"[",G,"]");E(v.cond(j).then(j,".call(this,a0,a1);").else(j,"=",b,"[",G,"]=",v.link(function(le){return Nt(Sa,v,f,le,2)}),"(",R,");",j,".call(this,a0,a1);"))}}Object.keys(f.state).length>0&&E(v.shared.current,".dirty=true;")}function J(v,f){var E=v.proc("scope",3);v.batchId="a2";var U=v.shared,$=U.current;$n(v,E,f.context),f.framebuffer&&f.framebuffer.append(v,E),eh(Object.keys(f.state)).forEach(function(P){var N=f.state[P],S=N.append(v,E);kn(S)?S.forEach(function(R,b){E.set(v.next[P],"["+b+"]",R)}):E.set(U.next,"."+P,S)}),kt(v,E,f,!0,!0),[ba,wl,xa,Tl,ya].forEach(function(P){var N=f.draw[P];N&&E.set(U.draw,"."+P,""+N.append(v,E))}),Object.keys(f.uniforms).forEach(function(P){var N=f.uniforms[P].append(v,E);Array.isArray(N)&&(N="["+N.join()+"]"),E.set(U.uniforms,"["+_.id(P)+"]",N)}),Object.keys(f.attributes).forEach(function(P){var N=f.attributes[P].append(v,E),S=v.scopeAttrib(P);Object.keys(new V).forEach(function(R){E.set(S,"."+R,N[R])})}),f.scopeVAO&&E.set(U.vao,".targetVAO",f.scopeVAO.append(v,E));function H(P){var N=f.shader[P];N&&E.set(U.shader,"."+P,N.append(v,E))}H(ts),H(ns),Object.keys(f.state).length>0&&(E($,".dirty=true;"),E.exit($,".dirty=true;")),E("a1(",v.shared.context,",a0,",v.batchId,");")}function Y(v){if(!(typeof v!="object"||kn(v))){for(var f=Object.keys(v),E=0;E<f.length;++E)if(xn.isDynamic(v[f[E]]))return!0;return!1}}function $e(v,f,E){var U=f.static[E];if(!U||!Y(U))return;var $=v.global,H=Object.keys(U),P=!1,N=!1,S=!1,R=v.global.def("{}");H.forEach(function(G){var j=U[G];if(xn.isDynamic(j)){typeof j=="function"&&(j=U[G]=xn.unbox(j));var le=Eo(j,null);P=P||le.thisDep,S=S||le.propDep,N=N||le.contextDep}else{switch($(R,".",G,"="),typeof j){case"number":$(j);break;case"string":$('"',j,'"');break;case"object":Array.isArray(j)&&$("[",j.join(),"]");break;default:$(v.link(j));break}$(";")}});function b(G,j){H.forEach(function(le){var ue=U[le];if(xn.isDynamic(ue)){var ae=G.invoke(j,ue);j(R,".",le,"=",ae,";")}})}f.dynamic[E]=new xn.DynamicVariable(vl,{thisDep:P,contextDep:N,propDep:S,ref:R,append:b}),delete f.static[E]}function Bt(v,f,E,U,$){var H=mt();H.stats=H.link($),Object.keys(f.static).forEach(function(N){$e(H,f,N)}),Kw.forEach(function(N){$e(H,v,N)});var P=Dn(v,f,E,U,H);return An(H,P),J(H,P),w(H,P),t(H.compile(),{destroy:function(){P.shader.program.destroy()}})}return{next:Ve,current:de,procs:(function(){var v=mt(),f=v.proc("poll"),E=v.proc("refresh"),U=v.block();f(U),E(U);var $=v.shared,H=$.gl,P=$.next,N=$.current;U(N,".dirty=false;"),qn(v,f),qn(v,E,null,!0);var S;Ce&&(S=v.link(Ce)),C.oes_vertex_array_object&&E(v.link(C.oes_vertex_array_object),".bindVertexArrayOES(null);");for(var R=0;R<Z.maxAttributes;++R){var b=E.def($.attributes,"[",R,"]"),G=v.cond(b,".buffer");G.then(H,".enableVertexAttribArray(",R,");",H,".bindBuffer(",si,",",b,".buffer.buffer);",H,".vertexAttribPointer(",R,",",b,".size,",b,".type,",b,".normalized,",b,".stride,",b,".offset);").else(H,".disableVertexAttribArray(",R,");",H,".vertexAttrib4f(",R,",",b,".x,",b,".y,",b,".z,",b,".w);",b,".buffer=null;"),E(G),Ce&&E(S,".vertexAttribDivisorANGLE(",R,",",b,".divisor);")}return E(v.shared.vao,".currentVAO=null;",v.shared.vao,".setVAO(",v.shared.vao,".targetVAO);"),Object.keys(Oe).forEach(function(j){var le=Oe[j],ue=U.def(P,".",j),ae=v.block();ae("if(",ue,"){",H,".enable(",le,")}else{",H,".disable(",le,")}",N,".",j,"=",ue,";"),E(ae),f("if(",ue,"!==",N,".",j,"){",ae,"}")}),Object.keys(fe).forEach(function(j){var le=fe[j],ue=de[j],ae,Te,tt=v.block();if(tt(H,".",le,"("),kn(ue)){var Rt=ue.length;ae=v.global.def(P,".",j),Te=v.global.def(N,".",j),tt(un(Rt,function(Xe){return ae+"["+Xe+"]"}),");",un(Rt,function(Xe){return Te+"["+Xe+"]="+ae+"["+Xe+"];"}).join("")),f("if(",un(Rt,function(Xe){return ae+"["+Xe+"]!=="+Te+"["+Xe+"]"}).join("||"),"){",tt,"}")}else ae=U.def(P,".",j),Te=U.def(N,".",j),tt(ae,");",N,".",j,"=",ae,";"),f("if(",ae,"!==",Te,"){",tt,"}");E(tt)}),v.compile()})(),compile:Bt}}function _4(){return{vaoCount:0,bufferCount:0,elementsCount:0,framebufferCount:0,shaderCount:0,textureCount:0,cubeCount:0,renderbufferCount:0,maxTextureUnits:0}}var g4=34918,b4=34919,nh=35007,y4=function(c,_){if(!_.ext_disjoint_timer_query)return null;var C=[];function Z(){return C.pop()||_.ext_disjoint_timer_query.createQueryEXT()}function ce(Ce){C.push(Ce)}var Q=[];function ne(Ce){var Ge=Z();_.ext_disjoint_timer_query.beginQueryEXT(nh,Ge),Q.push(Ge),ye(Q.length-1,Q.length,Ce)}function be(){_.ext_disjoint_timer_query.endQueryEXT(nh)}function xe(){this.startQueryIndex=-1,this.endQueryIndex=-1,this.sum=0,this.stats=null}var Me=[];function ve(){return Me.pop()||new xe}function Ae(Ce){Me.push(Ce)}var Be=[];function ye(Ce,Ge,de){var Ve=ve();Ve.startQueryIndex=Ce,Ve.endQueryIndex=Ge,Ve.sum=0,Ve.stats=de,Be.push(Ve)}var Ee=[],V=[];function oe(){var Ce,Ge,de=Q.length;if(de!==0){V.length=Math.max(V.length,de+1),Ee.length=Math.max(Ee.length,de+1),Ee[0]=0,V[0]=0;var Ve=0;for(Ce=0,Ge=0;Ge<Q.length;++Ge){var he=Q[Ge];_.ext_disjoint_timer_query.getQueryObjectEXT(he,b4)?(Ve+=_.ext_disjoint_timer_query.getQueryObjectEXT(he,g4),ce(he)):Q[Ce++]=he,Ee[Ge+1]=Ve,V[Ge+1]=Ce}for(Q.length=Ce,Ce=0,Ge=0;Ge<Be.length;++Ge){var Oe=Be[Ge],fe=Oe.startQueryIndex,He=Oe.endQueryIndex;Oe.sum+=Ee[He]-Ee[fe];var rt=V[fe],yt=V[He];yt===rt?(Oe.stats.gpuTime+=Oe.sum/1e6,Ae(Oe)):(Oe.startQueryIndex=rt,Oe.endQueryIndex=yt,Be[Ce++]=Oe)}Be.length=Ce}}return{beginQuery:ne,endQuery:be,pushScopeStats:ye,update:oe,getNumPendingQueries:function(){return Q.length},clear:function(){C.push.apply(C,Q);for(var Ce=0;Ce<C.length;Ce++)_.ext_disjoint_timer_query.deleteQueryEXT(C[Ce]);Q.length=0,C.length=0},restore:function(){Q.length=0,C.length=0}}},x4=16384,v4=256,S4=1024,w4=34962,oh="webglcontextlost",rh="webglcontextrestored",ah=1,T4=2,C4=3;function ih(c,_){for(var C=0;C<c.length;++C)if(c[C]===_)return C;return-1}function M4(c){var _=$r(c);if(!_)return null;var C=_.gl,Z=C.getContextAttributes(),ce=C.isContextLost(),Q=tr(C,_);if(!Q)return null;var ne=no(),be=_4(),xe=Q.extensions,Me=y4(C,xe),ve=Go(),Ae=C.drawingBufferWidth,Be=C.drawingBufferHeight,ye={tick:0,time:0,viewportWidth:Ae,viewportHeight:Be,framebufferWidth:Ae,framebufferHeight:Be,drawingBufferWidth:Ae,drawingBufferHeight:Be,pixelRatio:_.pixelRatio},Ee={},V={elements:null,primitive:4,count:-1,offset:0,instances:-1},oe=te(C,xe),Ce=LS(C,be,_,de),Ge=Nw(C,xe,oe,be,Ce);function de(ct){return Ge.destroyBuffer(ct)}var Ve=NS(C,xe,Ce,be),he=zw(C,ne,be,_),Oe=_w(C,xe,oe,function(){rt.procs.poll()},ye,be,_),fe=gw(C,xe,oe,be,_),He=Bw(C,xe,oe,Oe,fe,be),rt=h4(C,ne,xe,oe,Ce,Ve,Oe,He,Ee,Ge,he,V,ye,Me,_),yt=qw(C,He,rt.procs.poll,ye,Z,xe,oe),De=rt.next,Le=C.canvas,me=[],mt=[],Lt=[],je=[_.onDestroy],It=null;function xt(){if(me.length===0){Me&&Me.update(),It=null;return}It=Jn.next(xt),ao();for(var ct=me.length-1;ct>=0;--ct){var Nt=me[ct];Nt&&Nt(ye,null,0)}C.flush(),Me&&Me.update()}function Ot(){!It&&me.length>0&&(It=Jn.next(xt))}function qt(){It&&(Jn.cancel(xt),It=null)}function Bn(ct){ct.preventDefault(),ce=!0,qt(),mt.forEach(function(Nt){Nt()})}function Kn(ct){C.getError(),ce=!1,Q.restore(),he.restore(),Ce.restore(),Oe.restore(),fe.restore(),He.restore(),Ge.restore(),Me&&Me.restore(),rt.procs.refresh(),Ot(),Lt.forEach(function(Nt){Nt()})}Le&&(Le.addEventListener(oh,Bn,!1),Le.addEventListener(rh,Kn,!1));function Wt(){me.length=0,qt(),Le&&(Le.removeEventListener(oh,Bn),Le.removeEventListener(rh,Kn)),he.clear(),He.clear(),fe.clear(),Oe.clear(),Ve.clear(),Ce.clear(),Ge.clear(),Me&&Me.clear(),je.forEach(function(ct){ct()})}function Vn(ct){h(!!ct,"invalid args to regl({...})"),h.type(ct,"object","invalid args to regl({...})");function Nt($){var H=t({},$);delete H.uniforms,delete H.attributes,delete H.context,delete H.vao,"stencil"in H&&H.stencil.op&&(H.stencil.opBack=H.stencil.opFront=H.stencil.op,delete H.stencil.op);function P(N){if(N in H){var S=H[N];delete H[N],Object.keys(S).forEach(function(R){H[N+"."+R]=S[R]})}}return P("blend"),P("depth"),P("cull"),P("stencil"),P("polygonOffset"),P("scissor"),P("sample"),"vao"in $&&(H.vao=$.vao),H}function Vt($,H){var P={},N={};return Object.keys($).forEach(function(S){var R=$[S];if(xn.isDynamic(R)){N[S]=xn.unbox(R,S);return}else if(H&&Array.isArray(R)){for(var b=0;b<R.length;++b)if(xn.isDynamic(R[b])){N[S]=xn.unbox(R,S);return}}P[S]=R}),{dynamic:N,static:P}}var An=Vt(ct.context||{},!0),vr=Vt(ct.uniforms||{},!0),Sa=Vt(ct.attributes||{},!1),w=Vt(Nt(ct),!1),J={gpuTime:0,cpuTime:0,count:0},Y=rt.compile(w,Sa,vr,An,J),$e=Y.draw,Bt=Y.batch,v=Y.scope,f=[];function E($){for(;f.length<$;)f.push(null);return f}function U($,H){var P;if(ce&&h.raise("context lost"),typeof $=="function")return v.call(this,null,$,0);if(typeof H=="function")if(typeof $=="number")for(P=0;P<$;++P)v.call(this,null,H,P);else if(Array.isArray($))for(P=0;P<$.length;++P)v.call(this,$[P],H,P);else return v.call(this,$,H,0);else if(typeof $=="number"){if($>0)return Bt.call(this,E($|0),$|0)}else if(Array.isArray($)){if($.length)return Bt.call(this,$,$.length)}else return $e.call(this,$)}return t(U,{stats:J,destroy:function(){Y.destroy()}})}var dn=He.setFBO=Vn({framebuffer:xn.define.call(null,ah,"framebuffer")});function Dn(ct,Nt){var Vt=0;rt.procs.poll();var An=Nt.color;An&&(C.clearColor(+An[0]||0,+An[1]||0,+An[2]||0,+An[3]||0),Vt|=x4),"depth"in Nt&&(C.clearDepth(+Nt.depth),Vt|=v4),"stencil"in Nt&&(C.clearStencil(Nt.stencil|0),Vt|=S4),h(!!Vt,"called regl.clear with no buffer specified"),C.clear(Vt)}function $n(ct){if(h(typeof ct=="object"&&ct,"regl.clear() takes an object as input"),"framebuffer"in ct)if(ct.framebuffer&&ct.framebuffer_reglType==="framebufferCube")for(var Nt=0;Nt<6;++Nt)dn(t({framebuffer:ct.framebuffer.faces[Nt]},ct),Dn);else dn(ct,Dn);else Dn(null,ct)}function qn(ct){h.type(ct,"function","regl.frame() callback must be a function"),me.push(ct);function Nt(){var Vt=ih(me,ct);h(Vt>=0,"cannot cancel a frame twice");function An(){var vr=ih(me,An);me[vr]=me[me.length-1],me.length-=1,me.length<=0&&qt()}me[Vt]=An}return Ot(),{cancel:Nt}}function to(){var ct=De.viewport,Nt=De.scissor_box;ct[0]=ct[1]=Nt[0]=Nt[1]=0,ye.viewportWidth=ye.framebufferWidth=ye.drawingBufferWidth=ct[2]=Nt[2]=C.drawingBufferWidth,ye.viewportHeight=ye.framebufferHeight=ye.drawingBufferHeight=ct[3]=Nt[3]=C.drawingBufferHeight}function ao(){ye.tick+=1,ye.time=kt(),to(),rt.procs.poll()}function Rn(){Oe.refresh(),to(),rt.procs.refresh(),Me&&Me.update()}function kt(){return(Go()-ve)/1e3}Rn();function io(ct,Nt){h.type(Nt,"function","listener callback must be a function");var Vt;switch(ct){case"frame":return qn(Nt);case"lost":Vt=mt;break;case"restore":Vt=Lt;break;case"destroy":Vt=je;break;default:h.raise("invalid event, must be one of frame,lost,restore,destroy")}return Vt.push(Nt),{cancel:function(){for(var An=0;An<Vt.length;++An)if(Vt[An]===Nt){Vt[An]=Vt[Vt.length-1],Vt.pop();return}}}}var Kt=t(Vn,{clear:$n,prop:xn.define.bind(null,ah),context:xn.define.bind(null,T4),this:xn.define.bind(null,C4),draw:Vn({}),buffer:function(ct){return Ce.create(ct,w4,!1,!1)},elements:function(ct){return Ve.create(ct,!1)},texture:Oe.create2D,cube:Oe.createCube,renderbuffer:fe.create,framebuffer:He.create,framebufferCube:He.createCube,vao:Ge.createVAO,attributes:Z,frame:qn,on:io,limits:oe,hasExtension:function(ct){return oe.extensions.indexOf(ct.toLowerCase())>=0},read:yt,destroy:Wt,_gl:C,_refresh:Rn,poll:function(){ao(),Me&&Me.update()},now:kt,stats:be});return _.onDone(null,Kt),Kt}return M4}))});u();u();u();u();var ps=`vec2 uv = _st;
float aspect = resolution.x / max(1.0, resolution.y);
uv -= 0.5;
uv.x *= aspect;
uv.x += sin(uv.y * 14.0 + time * 2.4) * a * 0.11;
uv.y += cos(uv.x * 11.0 - time * 1.8) * a * 0.045;
uv.x /= aspect;
return uv;`,I4=`float luma = dot(_c0.rgb, vec3(0.299, 0.587, 0.114));
return vec4(mix(_c0.rgb, vec3(luma), a * 0.7), _c0.a);`;function ch(e){return Math.round(e)===1?I4:ps}function uh(e,t){let n=Math.round(t)===1?"color":"coord",o=e.trim().replace(/^#version[^\n]*\n?/gm,"");return/\breturn\b/.test(o)||(o=n==="coord"?`${o}
return _st;`:`${o}
return _c0;`),{type:n,glsl:`${n==="coord"?`float a = clamp(amount, 0.0, 1.0);
if (a < 0.00001) return _st;`:`float a = clamp(amount, 0.0, 1.0);
if (a < 0.00001) return _c0;`}
${o}`}}u();var ee=us(mh(),1);u();u();var dh=[{h:0,s:0,l:0,p:0},{h:0,s:0,l:.5,p:.5},{h:0,s:0,l:1,p:1},{h:0,s:.55,l:.55,p:.7},{h:40,s:.55,l:.55,p:.82},{h:80,s:.55,l:.55,p:.94}];function xo(e,t){return`s${e}${t}`}function _h(e){let t=Math.round(Number(e));return Number.isFinite(t)?Math.min(6,Math.max(2,t)):3}function Il(e,t,n){let o=e?.[t];return typeof o=="number"&&Number.isFinite(o)?o:n}function fh(e,t,n){let o=(e%360+360)%360,r=Math.min(1,Math.max(0,t)),i=Math.min(1,Math.max(0,n)),s=(1-Math.abs(2*i-1))*r,l=s*(1-Math.abs(o/60%2-1)),m=i-s/2,d=0,y=0,D=0;return o<60?(d=s,y=l):o<120?(d=l,y=s):o<180?(y=s,D=l):o<240?(y=l,D=s):o<300?(d=l,D=s):(d=s,D=l),[d+m,y+m,D+m]}function B4(e,t,n){let o=Math.min(1,Math.max(0,e)),r=Math.min(1,Math.max(0,t)),i=Math.min(1,Math.max(0,n)),s=Math.max(o,r,i),l=Math.min(o,r,i),m=(s+l)/2,d=s-l;if(d<1e-6)return{h:0,s:0,l:m,p:0};let y=d/(1-Math.abs(2*m-1)),D=0;return s===o?D=60*((r-i)/d%6):s===r?D=60*((i-o)/d+2):D=60*((o-r)/d+4),D<0&&(D+=360),{h:D,s:y,l:m,p:0}}function D4(e,t){let o=(typeof e=="string"?e:t).replace("#","").trim();if(o.length!==6)return[0,0,0];let r=parseInt(o,16);return Number.isNaN(r)?[0,0,0]:[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}function pp(e,t,n){let[o,r,i]=D4(e,t);return{...B4(o,r,i),p:n}}function Bl(e){return dh[e]??dh[0]}function N4(e){if(typeof e?.shadow=="string"&&typeof e.s0h!="number")return[pp(e.shadow,"#000000",0),pp(e.mid,"#808080",.5),pp(e.highlight,"#ffffff",1)];let t=_h(e?.stopCount),n=[];for(let o=0;o<t;o+=1){let r=Bl(o);n.push({h:Il(e,xo(o,"h"),r.h),s:Il(e,xo(o,"s"),r.s),l:Il(e,xo(o,"l"),r.l),p:Il(e,xo(o,"p"),r.p)})}return n}function hh(e){let t=e.toSorted((o,r)=>o.p-r.p),n=t[t.length-1]??{rgb:[0,0,0],p:1};for(;t.length<6;)t.push(n);return t}function gh(e,t){if(t&&typeof t.shadow=="string"&&typeof t.s0h!="number")return hh(N4(t).map(r=>({rgb:fh(r.h,r.s,r.l),p:r.p})));let n=_h(e("stopCount",3)),o=[];for(let r=0;r<n;r+=1){let i=Bl(r);o.push({rgb:fh(e(xo(r,"h"),i.h),e(xo(r,"s"),i.s),e(xo(r,"l"),i.l)),p:e(xo(r,"p"),i.p)})}return hh(o)}function bh(){let e=[{key:"stopCount",label:"Stops",min:2,max:6,step:1,default:3},{key:"editStop",label:"Edit stop",min:0,max:5,step:1,default:0},{key:"stopsOpen",label:"Stops (0=Cards, 1=HSL)",min:0,max:1,step:1,default:0}];for(let t=0;t<6;t+=1){let n=Bl(t),o=t+1;e.push({key:xo(t,"h"),label:`S${o} Hue`,min:0,max:360,step:1,default:n.h},{key:xo(t,"s"),label:`S${o} Sat`,min:0,max:1,step:.01,default:n.s},{key:xo(t,"l"),label:`S${o} Light`,min:0,max:1,step:.01,default:n.l},{key:xo(t,"p"),label:`S${o} Pos`,min:0,max:1,step:.01,default:n.p})}return e}function yh(){let e={stopCount:3,editStop:0,stopsOpen:0};for(let t=0;t<6;t+=1){let n=Bl(t);e[xo(t,"h")]=n.h,e[xo(t,"s")]=n.s,e[xo(t,"l")]=n.l,e[xo(t,"p")]=n.p}return e}u();var mp=[{id:0,key:"goldenrod",label:"Goldenrod"},{id:1,key:"moonGate",label:"Moon Gate"},{id:2,key:"bleachSkip",label:"Bleach Skip"},{id:3,key:"tealSplit",label:"Teal Split"},{id:4,key:"nitrate",label:"Nitrate"},{id:5,key:"magicHour",label:"Magic Hour"},{id:6,key:"wetNeon",label:"Wet Neon"},{id:7,key:"acetate",label:"Acetate"},{id:8,key:"polar",label:"Polar"},{id:9,key:"crossBath",label:"Cross Bath"},{id:10,key:"dayNite",label:"Day-Nite"},{id:11,key:"sodium",label:"Sodium"}],JR=mp.length,xh=mp.map(e=>e.id),vh=`Stock (${mp.map(e=>`${e.id}=${e.label}`).join(", ")})`;u();var Sh=["Blend","Diff","Add","Mult","Layer","Overlay"],wh=Sh.length-1;function dp(e="Blend"){let t=Sh.map((n,o)=>`${o}=${n}`).join(", ");return`${e} (${t})`}var Th=dp("Blend"),W4=dp("Mix"),G4=dp("Onto"),fp=6,hp=fp,Ch=`${G4.slice(0,-1)}, 6=Mask)`;function Do(e=0){return{key:"mode",label:Th,min:0,max:wh,step:1,default:e}}function vo(e){return Lh(e,wh)}function Mh(e){return Lh(e,hp)}function Lh(e,t){return Math.max(0,Math.min(t,Math.round(e)))}u();var ln={fade:0,zoom:1,swipe:2,pixelate:3,random:4,clap:5,mask:6,slide:7},U4=[ln.fade,ln.zoom,ln.swipe,ln.pixelate,ln.clap,ln.mask,ln.slide],_p=ln.slide,z4=8,rA=[z4,ln.fade,ln.zoom,ln.swipe,ln.pixelate,ln.random,ln.clap,ln.mask,ln.slide],kh="Transition Style (0=Fade, 1=Zoom, 2=Swipe, 3=Pixelate, 4=Random, 5=Clap, 6=Mask, 7=Slide)";function Rh(e){let t=Math.round(Number(e));if(!Number.isFinite(t))return ln.fade;if(t===ln.random){let n=U4;return n[Math.floor(Math.random()*n.length)]}return t<0||t>_p?ln.fade:t}function Ah(e,t){let n=Math.max(0,Math.min(1,e));return t?n<.5?.02:Math.max(.02,(n-.5)*2):n<.5?Math.max(.02,1-n*2):.02}function Eh(e){let t=Math.max(0,Math.min(1,e));return 1-Math.abs(t-.5)*2}var V4={Playback:{header:"text-sky-300/95 bg-sky-500/12 border-sky-500/25",card:"border-sky-500/15 bg-sky-950/25",cardHover:"hover:border-sky-400/50 hover:bg-sky-500/18",picked:"border-white/45 bg-sky-500/22",active:"border-sky-500/15 bg-sky-500/10",activeIcon:"text-sky-300/45",activeLabel:"text-sky-200/80",activeBadge:"text-sky-300/70 bg-sky-500/15 border-sky-500/20",icon:"text-sky-400/45",iconHover:"group-hover:text-sky-300/65",labelHover:"group-hover:text-sky-100"},"Transform & space":{header:"text-violet-300/95 bg-violet-500/12 border-violet-500/25",card:"border-violet-500/15 bg-violet-950/25",cardHover:"hover:border-violet-400/50 hover:bg-violet-500/18",picked:"border-white/45 bg-violet-500/22",active:"border-violet-500/15 bg-violet-500/10",activeIcon:"text-violet-300/45",activeLabel:"text-violet-200/80",activeBadge:"text-violet-300/70 bg-violet-500/15 border-violet-500/20",icon:"text-violet-400/45",iconHover:"group-hover:text-violet-300/65",labelHover:"group-hover:text-violet-100"},"Color & grade":{header:"text-amber-300/95 bg-amber-500/12 border-amber-500/25",card:"border-amber-500/15 bg-amber-950/20",cardHover:"hover:border-amber-400/50 hover:bg-amber-500/18",picked:"border-white/45 bg-amber-500/22",active:"border-amber-500/15 bg-amber-500/10",activeIcon:"text-amber-300/45",activeLabel:"text-amber-200/80",activeBadge:"text-amber-300/70 bg-amber-500/15 border-amber-500/20",icon:"text-amber-400/45",iconHover:"group-hover:text-amber-300/65",labelHover:"group-hover:text-amber-100"},"Warp & pattern":{header:"text-emerald-300/95 bg-emerald-500/12 border-emerald-500/25",card:"border-emerald-500/15 bg-emerald-950/25",cardHover:"hover:border-emerald-400/50 hover:bg-emerald-500/18",picked:"border-white/45 bg-emerald-500/22",active:"border-emerald-500/15 bg-emerald-500/10",activeIcon:"text-emerald-300/45",activeLabel:"text-emerald-200/80",activeBadge:"text-emerald-300/70 bg-emerald-500/15 border-emerald-500/20",icon:"text-emerald-400/45",iconHover:"group-hover:text-emerald-300/65",labelHover:"group-hover:text-emerald-100"},Glitch:{header:"text-rose-300/95 bg-rose-500/12 border-rose-500/25",card:"border-rose-500/15 bg-rose-950/25",cardHover:"hover:border-rose-400/50 hover:bg-rose-500/18",picked:"border-white/45 bg-rose-500/22",active:"border-rose-500/15 bg-rose-500/10",activeIcon:"text-rose-300/45",activeLabel:"text-rose-200/80",activeBadge:"text-rose-300/70 bg-rose-500/15 border-rose-500/20",icon:"text-rose-400/45",iconHover:"group-hover:text-rose-300/65",labelHover:"group-hover:text-rose-100"},"Composite & texture":{header:"text-cyan-300/95 bg-cyan-500/12 border-cyan-500/25",card:"border-cyan-500/15 bg-cyan-950/25",cardHover:"hover:border-cyan-400/50 hover:bg-cyan-500/18",picked:"border-white/45 bg-cyan-500/22",active:"border-cyan-500/15 bg-cyan-500/10",activeIcon:"text-cyan-300/45",activeLabel:"text-cyan-200/80",activeBadge:"text-cyan-300/70 bg-cyan-500/15 border-cyan-500/20",icon:"text-cyan-400/45",iconHover:"group-hover:text-cyan-300/65",labelHover:"group-hover:text-cyan-100"}},dA=V4["Composite & texture"];var z={amount:"Amount",audioDepth:"Audio depth",density:"Density",speed:"Speed",centerX:"Center X",centerY:"Center Y",radius:"Radius",softness:"Softness",sensitivity:"Sensitivity",style:"Style",blend:"Blend"};var $4=new Set(["stutterBack","jumpCut","clipPeek","zap","boomerang","slowmo","accelerate","neonGrid","electricNoise"]),q4=new Set(["slowmo","accelerate"]),j4=new Set(["playbackCue"]);function ci(e){return $4.has(e)}function ms(e){return q4.has(e)}function Ph(e){return j4.has(e)}var ds=["videoSpeed","autoMix","transition","colorAdjust"],X4=["videoSpeed","autoMix","colorAdjust"];function Sr(e){return ds.includes(e)}function Y4(e){return X4.includes(e)}var sr=[{category:"Playback",key:"videoSpeed",label:"Video Speed",icon:ee.FastForward,min:0,max:5,step:.01,baseLabel:"Base",multiplierMax:10},{category:"Playback",key:"autoMix",label:"Mixer",icon:ee.Shuffle,min:0,max:180,step:1,baseLabel:"Time before change (sec)"},{category:"Composite & texture",key:"transition",label:"Transition",icon:ee.ArrowLeftRight,min:0,max:1,step:.01,extraParams:[{key:"type",label:kh,min:0,max:7,step:1,default:0,choices:[0,1,2,3,4,5,6,7]},{key:"duration",label:"Duration (sec)",min:.1,max:5,step:.1,default:1}]},{category:"Color & grade",key:"colorAdjust",label:"Color Adjust",icon:ee.Palette,min:-1,max:1,step:.05,baseLabel:"Luminosity",extraParams:[{key:"contrast",label:"Contrast",min:0,max:2,step:.05,default:1},{key:"saturation",label:"Saturation",min:0,max:2,step:.05,default:1},{key:"hue",label:"Hue",min:0,max:360,step:1,default:0}]}],fA=sr.filter(e=>Y4(e.key));var jo=[{category:"Color & grade",key:"lens7c",label:"7C Lens",icon:ee.Rainbow,min:0,max:1,step:.01,baseLabel:"Refraction",multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"spread",label:"Throw",min:0,max:1,step:.01,default:.55},{key:"rotation",label:"Filter angle",min:0,max:1,step:.01,default:0},{key:"threshold",label:z.sensitivity,min:0,max:1,step:.01,default:.42},{key:"haze",label:"Haze",min:0,max:1,step:.01,default:.5}]},{category:"Color & grade",key:"answerPrint",label:"Answer Print",icon:ee.Clapperboard,min:0,max:1,step:.01,baseLabel:"Print",extraParams:[{key:"stock",label:vh,min:0,max:11,step:1,default:0,choices:xh},{key:"density",label:"Strike",min:.35,max:1.75,step:.05,default:1}]},{category:"Color & grade",key:"colorLayer",label:"Color Layer",icon:ee.Palette,min:-1,max:1,step:.05,baseLabel:"Luminosity",extraParams:[{key:"contrast",label:"Contrast",min:0,max:2,step:.05,default:1},{key:"saturation",label:"Saturation",min:0,max:2,step:.05,default:1},{key:"hue",label:"Hue",min:0,max:360,step:1,default:0}]},{category:"Color & grade",key:"pulse",label:"Pulse",icon:ee.Activity,min:0,max:1,step:.01,baseLabel:"Reactivity",multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"breath",label:"Breath",min:0,max:1,step:.01,default:.5},{key:"bloom",label:"Bloom",min:0,max:1,step:.01,default:.45}]},{category:"Warp & pattern",key:"centerDiffuse",label:"Center Diffuse",icon:ee.ArrowDownUp,min:0,max:1,step:.01,baseLabel:"Spread",multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"diffusion",label:"Blur",min:0,max:1,step:.01,default:.72},{key:"band",label:"Strip height",min:.01,max:.35,step:.01,default:.06,tier:"advanced"},{key:"centerY",label:z.centerY,min:.1,max:.9,step:.01,default:.5,tier:"advanced"}]},{category:"Warp & pattern",key:"chromaticAberration",label:"Chroma Ab.",icon:ee.Aperture,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"direction",label:"Angle (0\u20131 turn)",min:0,max:1,step:.01,default:.125}]},{category:"Warp & pattern",key:"concentricRotate",label:"Concentric Spin",icon:ee.Target,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"mode",label:"Mode (0=Concentric, 1=Spiral)",min:0,max:1,step:1,default:0},{key:"rings",label:"Rings",min:2,max:64,step:1,default:7},{key:"step",label:"Step (turns / ring)",min:0,max:.25,step:1e-4,default:.08},{key:"speed",label:z.speed,min:0,max:2,step:.05,default:.25},{key:"centerX",label:z.centerX,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerY",label:z.centerY,min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Warp & pattern",key:"customShader",label:"Custom Shader",icon:ee.Code2,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:2,multiplierStep:.05,extraParams:[{key:"shaderType",label:"Type (0=Coord, 1=Color)",min:0,max:1,step:1,default:0},{key:"code",label:"GLSL body",kind:"shader",default:ps,tier:"advanced"}]},{category:"Warp & pattern",key:"cymatic",label:"Cymatic",icon:ee.Activity,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:2,multiplierStep:.05,extraParams:[{key:"frequency",label:z.density,min:1,max:48,step:1,default:12}]},{category:"Glitch",key:"dataDrip",label:"Data Drip",icon:ee.Columns2,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"dance",label:"Dance",min:0,max:1,step:.01,default:.65},{key:"chaos",label:"Chaos",min:0,max:1,step:.01,default:.35},{key:"speed",label:z.speed,min:0,max:3,step:.05,default:1},{key:"columns",label:z.density,min:8,max:220,step:1,default:72}]},{category:"Glitch",key:"degauss",label:"Degauss",icon:ee.MonitorX,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"frequency",label:z.density,min:2,max:32,step:1,default:12},{key:"speed",label:z.speed,min:0,max:4,step:.05,default:1.4},{key:"fringe",label:"Chroma fringe",min:0,max:1,step:.01,default:.55},{key:"tail",label:"Sustain",min:0,max:1,step:.01,default:.82,tier:"advanced"}]},{category:"Color & grade",key:"dither",label:"Dither",icon:ee.Grid,min:0,max:1,step:.01,baseLabel:z.amount,hint:"Blue-noise threshold dither \u2014 soft film grain that shimmers and quantizes. Use for analog texture on grade; not a full-frame overlay.",extraParams:[{key:"binary",label:"Posterize (0=Off, 1=2 tone, 2=3 tone, 3=4 tone, 4=6 tone)",min:0,max:4,step:1,default:0},{key:"balance",label:"Balance",min:0,max:1,step:.01,default:.5},{key:"scale",label:"Grain (px)",min:.25,max:64,step:.25,default:4,tier:"advanced"}]},{category:"Composite & texture",key:"blur",label:"Blur",icon:ee.Droplets,min:0,max:2,step:.01,baseLabel:z.amount,extraParams:[{key:"mode",label:"Style (0=Gaussian, 1=Radial, 2=Noise)",min:0,max:2,step:1,default:0}]},{category:"Composite & texture",key:"emberHeat",label:"Ember & Heat",icon:ee.Sun,min:0,max:1,step:.01,baseLabel:"Heat",multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"waves",label:"Heat waves",min:0,max:1,step:.01,default:.76},{key:"intensity",label:"Particles",min:0,max:1,step:.01,default:.78},{key:"speed",label:z.speed,min:0,max:3,step:.05,default:.8},{key:"density",label:z.density,min:6,max:40,step:1,default:22},{key:"glow",label:"Ember glow",min:0,max:1,step:.01,default:.82}]},{category:"Composite & texture",key:"sharpen",label:"Sharpen",icon:ee.Focus,min:0,max:2,step:.01,baseLabel:z.amount,extraParams:[{key:"radius",label:"Detail",min:.25,max:2,step:.05,default:1}]},{category:"Composite & texture",key:"shatterLayer",label:"Shatter Layer",icon:ee.Layers,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"mode",label:"Gaps (0=Black, 1=Clip)",min:0,max:1,step:1,default:0},{key:"density",label:z.density,min:4,max:48,step:1,default:14},{key:"gap",label:"Gap width",min:0,max:.2,step:.005,default:.065},{key:"scatter",label:"Scatter",min:0,max:1,step:.01,default:.62},{key:"irregularity",label:"Irregularity",min:0,max:1,step:.01,default:.82,tier:"advanced"},{key:"videoIndex",label:"Gap clip",min:1,max:50,step:1,default:2,tier:"advanced"}]},{category:"Playback",key:"boomerang",label:"Boomerang",icon:ee.ArrowDownUp,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"segmentSec",label:"Slice (sec)",min:.25,max:8,step:.05,default:1.25},{key:"maxFrames",label:"Cache frames",min:24,max:180,step:1,default:60,tier:"advanced"},{key:"captureFps",label:"Capture FPS",min:12,max:60,step:1,default:24,tier:"advanced"}]},{category:"Playback",key:"clipPeek",label:"Clip Peek",icon:ee.SkipForward,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"holdSec",label:"Hold (sec)",min:.05,max:2,step:.05,default:.35},{key:"steps",label:"Steps forward",min:1,max:8,step:1,default:1}]},{category:"Playback",key:"zap",label:"Zap",icon:ee.Zap,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"clipCount",label:"Videos",min:1,max:8,step:1,default:3},{key:"framesPerClip",label:"Frames each",min:1,max:12,step:1,default:4}]},{category:"Warp & pattern",key:"distortion",label:"Distortion",icon:ee.Waves,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"mode",label:"Style (0=Pinch, 1=H, 2=V, 3=Rad)",min:0,max:3,step:1,default:0},{key:"curvature",label:"Curvature",min:.2,max:2,step:.05,default:1},{key:"frequency",label:"Cycles",min:1,max:36,step:1,default:10},{key:"speed",label:z.speed,min:0,max:4,step:.1,default:1.2},{key:"centerFocus",label:"Center weight",min:.3,max:4,step:.05,default:1.4,tier:"advanced"}]},{category:"Warp & pattern",key:"electricNoise",label:"Electric Noise",icon:ee.Zap,extraParams:[{key:"amount",label:z.amount,min:0,max:1,step:.01,default:1},{key:"color",label:"Color",kind:"color",default:"#331a66"},Do(2),{key:"speed",label:z.speed,min:0,max:3,step:.05,default:1},{key:"scale",label:"Zoom",min:.25,max:2,step:.05,default:1},{key:"intensity",label:"Glow",min:.5,max:3,step:.05,default:1.4},{key:"noiseScale",label:"Noise scale",min:.25,max:4,step:.05,default:1,tier:"advanced"},{key:"turbulence",label:"Turbulence",min:0,max:.6,step:.01,default:.2,tier:"advanced"},{key:"detail",label:"Detail",min:3,max:6,step:1,default:5,tier:"advanced"},{key:"rings",label:"Ring mix",min:0,max:1,step:.01,default:.85,tier:"advanced"},{key:"ringPower",label:"Ring edge",min:.35,max:1.35,step:.05,default:.9,tier:"advanced"}]},{category:"Warp & pattern",key:"fractalFold",label:"Fractal Fold",icon:ee.Snowflake,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[Do(2),{key:"foldX",label:"Fold X",min:.3,max:1.7,step:.01,default:.86},{key:"foldY",label:"Fold Y",min:.3,max:1.7,step:.01,default:1.04},{key:"zoom",label:"Zoom",min:.25,max:3,step:.05,default:1},{key:"speed",label:z.speed,min:0,max:3,step:.05,default:.6},{key:"spin",label:"Fold spin",min:-1.6,max:1.6,step:.02,default:.42,tier:"advanced"},{key:"depth",label:"Fold depth",min:3,max:16,step:1,default:8,slider:!0,tier:"advanced"},{key:"glow",label:"Filament glow",min:.25,max:2.5,step:.05,default:1.4,tier:"advanced"},{key:"hue",label:"Palette shift",min:0,max:1,step:.01,default:.12,tier:"advanced"}]},{category:"Warp & pattern",key:"reactionDiffusion",label:"React Diff.",icon:ee.Orbit,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"source",label:"Video drive",min:0,max:1,step:.01,default:.78},{key:"feed",label:"Feed",min:0,max:1,step:.01,default:.55},{key:"kill",label:"Kill",min:0,max:1,step:.01,default:.57},{key:"scale",label:"Pattern size",min:3,max:40,step:1,default:12},{key:"emboss",label:"Relief",min:0,max:1,step:.01,default:.58},{key:"flow",label:"Flow",min:0,max:1,step:.01,default:.32},{key:"speed",label:"Growth",min:0,max:2,step:.05,default:.45,tier:"advanced"},{key:"styleMap",label:"Style map",min:0,max:1,step:.01,default:.35,tier:"advanced"}]},{category:"Warp & pattern",key:"ripple",label:"Ripple",icon:ee.CircleDot,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"frequency",label:z.density,min:2,max:32,step:1,default:10},{key:"speed",label:z.speed,min:0,max:4,step:.05,default:1.2},{key:"decay",label:"Falloff",min:0,max:1,step:.01,default:.55,tier:"advanced"},{key:"centerX",label:z.centerX,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerY",label:z.centerY,min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Warp & pattern",key:"randomGallery",label:"Random Gallery",icon:ee.LayoutGrid,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"cells",label:"Cells",min:3,max:16,step:1,default:7},{key:"speed",label:z.speed,min:0,max:2,step:.05,default:1},{key:"refraction",label:"Refraction",min:0,max:1,step:.01,default:.82},{key:"drift",label:"Grid drift",min:0,max:1,step:.01,default:1,tier:"advanced"}]},{category:"Warp & pattern",key:"throughTheStars",label:"Through The Stars",icon:ee.Sparkle,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[{key:"trail",label:"Trail",min:0,max:1.5,step:.01,default:.48},{key:"density",label:z.density,min:12,max:220,step:1,default:56},{key:"speed",label:z.speed,min:0,max:8,step:.05,default:1.15},{key:"glow",label:"Glow",min:0,max:1,step:.01,default:.74},{key:"fov",label:"Field spread",min:.25,max:2,step:.05,default:1.05},{key:"depth",label:"Fade-in range",min:0,max:1,step:.01,default:.65,tier:"advanced"},{key:"tint",label:"Glow tint",kind:"color",default:"#00e8cc",tier:"advanced"},{key:"centerX",label:z.centerX,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerY",label:z.centerY,min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Glitch",key:"encodeGlitch",label:"Encode Glitch",icon:ee.Binary,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"macroBlock",label:"Block size",min:0,max:1,step:.01,default:.5},{key:"tear",label:"Tear",min:0,max:1,step:.01,default:.35}]},{category:"Color & grade",key:"edge",label:"Edge",icon:ee.ScanLine,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"threshold",label:z.sensitivity,min:0,max:1,step:.01,default:.32},{key:"thickness",label:"Width",min:.05,max:1,step:.01,default:.35},{key:"soften",label:z.softness,min:0,max:1,step:.01,default:.25,tier:"advanced"},{key:"strength",label:"Line strength",min:0,max:2,step:.05,default:1,tier:"advanced"}]},{category:"Color & grade",key:"fadeOff",label:"Fade Off",icon:ee.VolumeX,min:0,max:1,step:.01,baseLabel:"Silence fade",multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01},{category:"Composite & texture",key:"feedback",label:"Feedback",icon:ee.Repeat,min:.8,max:.99,step:.01,baseLabel:z.amount,extraParams:[{key:"balance",label:"Balance",min:0,max:1,step:.01,default:.5},{key:"scale",label:"Scale",min:.98,max:1.02,step:.001,default:1},{key:"reset",label:"Reset trail",kind:"action"}]},{category:"Composite & texture",key:"fillLayer",label:"Fill Layer",icon:ee.Palette,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"type",label:"Style (0=Solid, 1=Horizontal, 2=Vertical, 3=Radial)",min:0,max:3,step:1,default:1},{key:"sweep",label:"Sweep (0=Off, 1=Angular, 2=Diamond, 3=Spiral)",min:0,max:3,step:1,default:0},{key:"colorA",label:"Start",kind:"color",default:"#7c3aed"},{key:"colorB",label:"End",kind:"color",default:"#06b6d4"},Do(0),{key:"softness",label:z.softness,min:0,max:1,step:.02,default:.35,tier:"advanced"}]},{category:"Color & grade",key:"flash",label:"Flash",icon:ee.Sun,min:0,max:1,step:.01,baseLabel:z.amount},{category:"Color & grade",key:"hitStreak",label:"Hit Streak",icon:ee.Sparkle,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"length",label:"Length",min:0,max:1,step:.01,default:.58},{key:"mode",label:"0=H 1=radial 2=diagonal",min:0,max:2,step:1,default:0},{key:"threshold",label:z.sensitivity,min:0,max:1,step:.01,default:.6},{key:"decay",label:"Decay",min:0,max:1,step:.01,default:.72}]},{category:"Color & grade",key:"hdr",label:"HDR",icon:ee.SunMedium,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"blackFloor",label:"Black floor",min:0,max:.3,step:.01,default:.08},{key:"highlights",label:"Highlight boost",min:0,max:2,step:.05,default:.85},{key:"knee",label:z.softness,min:0,max:1,step:.02,default:.5,tier:"advanced"}]},{category:"Glitch",key:"ghostFlow",label:"Ghost Flow",icon:ee.Ghost,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"melt",label:"Melt",min:0,max:1,step:.01,default:.62},{key:"flowScale",label:"Flow scale",min:0,max:1,step:.01,default:.48},{key:"refresh",label:"Refresh",min:0,max:1,step:.01,default:0},{key:"chromaBleed",label:"Chroma bleed",min:0,max:1,step:.01,default:.35}]},{category:"Glitch",key:"gridShuffle",label:"Grid Shuffle",icon:ee.Dices,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"cells",label:"Cells",min:2,max:16,step:1,default:4},{key:"chaos",label:"Chaos",min:0,max:1,step:.01,default:1}]},{category:"Glitch",key:"glitch",label:"Glitch",icon:ee.MonitorX,min:0,max:10,step:.1,baseLabel:z.amount,extraParams:[{key:"size",label:"Block size",min:0,max:10,step:.1,default:5},{key:"speed",label:z.speed,min:0,max:4,step:.05,default:1.15},{key:"travel",label:"Travel",min:0,max:1,step:.01,default:1},{key:"tear",label:"Tear",min:0,max:1,step:.01,default:1,tier:"advanced"}]},{category:"Color & grade",key:"glow",label:"Glow",icon:ee.Sparkles,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"threshold",label:z.sensitivity,min:0,max:1,step:.01,default:.48},{key:"bloom",label:"Spread",min:0,max:1,step:.01,default:.55}]},{category:"Playback",key:"playbackCue",label:"Cue Layer",icon:ee.Target,min:0,max:1,step:.01,baseLabel:"Mix",extraParams:[{key:"eventCount",label:"Events",min:1,max:4,step:1,default:2},{key:"holdSec",label:"Hold (sec)",min:.05,max:4,step:.05,default:.35},{key:"clip1",label:"Cue 1 clip",min:1,max:50,step:1,default:1},{key:"frame1",label:"Cue 1 frame",min:0,max:7200,step:1,default:48},{key:"clip2",label:"Cue 2 clip",min:1,max:50,step:1,default:2},{key:"frame2",label:"Cue 2 frame",min:0,max:7200,step:1,default:0},{key:"clip3",label:"Cue 3 clip",min:1,max:50,step:1,default:3,tier:"advanced"},{key:"frame3",label:"Cue 3 frame",min:0,max:7200,step:1,default:0,tier:"advanced"},{key:"clip4",label:"Cue 4 clip",min:1,max:50,step:1,default:4,tier:"advanced"},{key:"frame4",label:"Cue 4 frame",min:0,max:7200,step:1,default:0,tier:"advanced"}]},{category:"Playback",key:"jumpCut",label:"Jump Cut",icon:ee.SkipForward,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"skipFrames",label:"Skip frames",min:1,max:48,step:1,default:2},{key:"jumpCuts",label:"Bursts",min:1,max:24,step:1,default:1}]},{category:"Warp & pattern",key:"kaleid",label:"Kaleid.",icon:ee.Hexagon,min:0,max:24,step:1,baseLabel:"Slices",extraParams:[{key:"angle",label:"Angle",min:-3.14,max:3.14,step:.01,default:0},{key:"videoZoom",label:"Zoom",min:.5,max:2,step:.01,default:1},{key:"videoX",label:"Pos X",min:-1,max:1,step:.01,default:0},{key:"videoY",label:"Pos Y",min:-1,max:1,step:.01,default:0}]},{category:"Composite & texture",key:"layerBlend",label:"Layer Blend",icon:ee.Layers,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[Do(0),{key:"sourceMode",label:"Clip (0=Index, 1=Static)",min:0,max:1,step:1,default:0},{key:"videoIndex",label:"Clip index",min:1,max:50,step:1,default:1},{key:"playbackSpeed",label:z.speed,min:.1,max:4,step:.1,default:1.25,tier:"advanced"}]},{category:"Composite & texture",key:"videoMap",label:"Video Map",icon:ee.Map,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"mode",label:"Mode (0=Mask, 1=Displace)",min:0,max:1,step:1,default:0},{key:"invert",label:"Invert (0=Off, 1=On)",min:0,max:1,step:1,default:0},{key:"threshold",label:"Threshold",min:0,max:1,step:.01,default:.35},{key:"softness",label:"Softness",min:.01,max:.5,step:.01,default:.12},{key:"sourceMode",label:"Clip (0=Index, 1=Static)",min:0,max:1,step:1,default:0},{key:"videoIndex",label:"Clip index",min:1,max:50,step:1,default:1},{key:"playbackSpeed",label:z.speed,min:.1,max:4,step:.1,default:1.25,tier:"advanced"}]},{category:"Composite & texture",key:"lumaDust",label:"Luma Dust",icon:ee.Wind,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"stick",label:"Hold",min:0,max:1,step:.01,default:.65},{key:"detach",label:"Leave",min:0,max:1,step:.01,default:.26},{key:"burst",label:"Burst",min:0,max:1,step:.01,default:.58},{key:"turbulence",label:"Turbulence",min:0,max:1,step:.01,default:.48},{key:"spectral",label:"Spectral",min:0,max:1,step:.01,default:.52},{key:"size",label:"Size",min:.4,max:1.8,step:.01,default:1},{key:"brightness",label:"Brightness",min:0,max:1,step:.01,default:.68},{key:"density",label:z.density,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"quality",label:"Quality",min:0,max:1,step:.01,default:.55,tier:"advanced"},{key:"trail",label:"Trail",min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Composite & texture",key:"lumaLock",label:"Luma Lock",icon:ee.Crosshair,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"count",label:"Targets",min:1,max:5,step:1,default:3},{key:"threshold",label:"Brightness",min:0,max:1,step:.01,default:.42},{key:"smooth",label:"Smooth",min:0,max:1,step:.01,default:.76},{key:"size",label:"Size",min:.4,max:2.2,step:.01,default:1},{key:"links",label:"Links",min:0,max:1,step:.01,default:.7},{key:"color",label:"Box",kind:"color",default:"#ff2a2a"},{key:"labelColor",label:"Coords",kind:"color",default:"#ffb020",tier:"advanced"}]},{category:"Composite & texture",key:"metalSphere",label:"Metal Sphere",icon:ee.Globe,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"envMap",label:"Env (0=Static, 1=Play)",min:0,max:1,step:1,default:0},{key:"size",label:"Size",min:.35,max:2,step:.01,default:1},{key:"noise",label:"Displacement",min:0,max:1,step:.01,default:.42},{key:"detail",label:"Noise scale",min:1,max:8,step:.1,default:3.5},{key:"speed",label:z.speed,min:0,max:3,step:.05,default:.75},{key:"roughness",label:"Roughness",min:.02,max:1,step:.01,default:.1},{key:"reflection",label:"Reflection",min:0,max:2,step:.01,default:1.05},{key:"rotation",label:"Orbit",min:0,max:2,step:.01,default:.35,tier:"advanced"}]},{category:"Warp & pattern",key:"liquix",label:"Liquix",icon:ee.Blend,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"bands",label:z.density,min:8,max:120,step:1,default:56},{key:"speed",label:z.speed,min:0,max:3,step:.05,default:1.28},{key:"pivot",label:"Wet edge (X)",min:.05,max:.95,step:.01,default:.48,tier:"advanced"}]},{category:"Warp & pattern",key:"mirrorStripes",label:"Mirror Stripes",icon:ee.AlignJustify,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"mirror",label:"Mirror (0=Off, 1=On)",min:0,max:1,step:1,default:1,choices:[0,1]},{key:"scale",label:"Container",min:0,max:1,step:.01,default:.82},{key:"spread",label:"Spread",min:0,max:1,step:.01,default:.48},{key:"density",label:z.density,min:0,max:1,step:.01,default:.55},{key:"thickness",label:"Weight",min:0,max:1,step:.01,default:.55},{key:"layers",label:"Depth layers",min:1,max:8,step:1,default:4,choices:[1,2,4,8]},{key:"rotate",label:"Rotate",min:0,max:1,step:.01,default:0},{key:"randomness",label:"Randomness",min:0,max:1,step:.01,default:.35},{key:"color",label:"Color",kind:"color",default:"#ff1a1a"}]},{category:"Color & grade",key:"negative",label:"Negative",icon:ee.Moon,min:0,max:1,step:.05,baseLabel:z.amount},{category:"Composite & texture",key:"noise",label:"Noise",icon:ee.Sparkles,min:0,max:1,step:.01,baseLabel:z.amount,hint:"Animated TV static layered on top \u2014 blend modes and coarse cells. Use for snow / interference; not for posterizing the image.",extraParams:[Do(3),{key:"speed",label:z.speed,min:0,max:3,step:.05,default:.15},{key:"scale",label:"Grid cells",min:32,max:4096,step:1,default:1681,tier:"advanced"}]},{category:"Color & grade",key:"vignette",label:"Vignette",icon:ee.Aperture,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"radius",label:z.radius,min:.1,max:1,step:.01,default:.75},{key:"softness",label:z.softness,min:0,max:1,step:.01,default:.35},{key:"blur",label:"Edge blur",min:0,max:1,step:.01,default:0}]},{category:"Warp & pattern",key:"normalMap",label:"Normal Map",icon:ee.Box,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"source",label:"Source (0=Voronoi, 1=Bump)",min:0,max:1,step:1,default:1},{key:"scale",label:z.density,min:2,max:48,step:1,default:12},{key:"refraction",label:"Refraction",min:0,max:1,step:.01,default:.55},{key:"lighting",label:"Lighting",min:0,max:1,step:.01,default:.45},{key:"specular",label:"Specular",min:0,max:1,step:.01,default:.4},{key:"detail",label:"Bump depth",min:.1,max:2,step:.05,default:1.05},{key:"lightX",label:"Light X",min:0,max:1,step:.01,default:.65,tier:"advanced"},{key:"lightY",label:"Light Y",min:0,max:1,step:.01,default:.35,tier:"advanced"}]},{category:"Warp & pattern",key:"oscilloscope",label:"Oscilloscope",icon:ee.Radio,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:2,multiplierStep:.05,extraParams:[{key:"mode",label:"Trail (0=Lines, 1=Fill, 2=Beam)",min:0,max:2,step:1,default:0},{key:"persistence",label:"Phosphor",min:.15,max:.95,step:.01,default:.72},{key:"scale",label:"Amplitude",min:.1,max:.72,step:.01,default:.55},{key:"positionY",label:"Print Y",min:.55,max:.96,step:.01,default:.88},{key:"colorLo",label:"Color low",kind:"color",default:"#1c3cff"},{key:"colorMid",label:"Color mid",kind:"color",default:"#ff9a1a"},{key:"colorHi",label:"Color high",kind:"color",default:"#fff6c8"},{key:"glow",label:"Glow",min:0,max:1,step:.01,default:.55,tier:"advanced"}]},{category:"Warp & pattern",key:"patternLayer",label:"Pattern",icon:ee.Snowflake,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[{key:"type",label:"Family (0=Noise, 1=Cells, 2=Tiles, 3=Polar, 4=Turing, 5=Geometry)",min:0,max:5,step:1,default:1},{key:"geometry",label:"Geometry (0=Classic, 1=Interweave V3, 2=Tight, 3=Classic Low Lat., 4=Interweave Low Lat., 5=Imprint Smooth, 6=Imprint Crystal, 7=Enharmonic, 8=Interweave V2, 9=Fusion, 10=Sonance)",min:0,max:10,step:1,default:0,choices:[0,1,2,3,4,5,6,7,8,9,10]},{key:"variant",label:"Look (0=Coral, 1=Labyrinth, 2=Ring, 3=Flow)",min:0,max:3,step:1,default:2},Do(0),{key:"scale",label:"Density",min:.25,max:4,step:.05,default:1},{key:"speed",label:z.speed,min:0,max:2,step:.05,default:.4},{key:"colorA",label:"Low",kind:"color",default:"#0b1020"},{key:"colorB",label:"High",kind:"color",default:"#22d3ee"},{key:"warp",label:"Warp",min:0,max:1,step:.02,default:0,tier:"advanced"},{key:"symmetry",label:"Symmetry (0=Off, 1=Mirror, 2=Inkblot, 3=Kaleid-3)",min:0,max:3,step:1,default:2,tier:"advanced"},{key:"seedSize",label:"Seed density",min:.08,max:.55,step:.01,default:.18,tier:"advanced"},{key:"gap",label:"Gap",min:0,max:1,step:.02,default:.35,tier:"advanced"},{key:"reset",label:"Reset seed",kind:"action",tier:"advanced"}]},{category:"Warp & pattern",key:"plasma",label:"Plasma",icon:ee.Zap,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[Do(0),{key:"speed",label:z.speed,min:0,max:3,step:.05,default:1.1},{key:"scale",label:"Zoom",min:.25,max:2,step:.05,default:1},{key:"complexity",label:"Detail",min:.35,max:2,step:.05,default:1,tier:"advanced"}]},{category:"Warp & pattern",key:"plexus",label:"Plexus",icon:ee.Share2,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[Do(2),{key:"speed",label:z.speed,min:0,max:3,step:.05,default:1},{key:"points",label:"Point density",min:1.05,max:2.2,step:.05,default:1.5},{key:"intensity",label:"Line intensity",min:0,max:2,step:.05,default:1},{key:"layers",label:"Depth layers",min:1,max:8,step:1,default:4,choices:[1,2,4,8]},{key:"glow",label:"Sparkle",min:0,max:2.4,step:.05,default:1.2,tier:"advanced"}]},{category:"Warp & pattern",key:"superformula",label:"Superformula",icon:ee.Aperture,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[{key:"look",label:"Look (0=Form, 1=Wire, 2=Cloud)",min:0,max:2,step:1,default:2},Do(2),{key:"m",label:"Lobes",min:1,max:16,step:.05,default:7.6},{key:"n1",label:"Pinch",min:.12,max:2.5,step:.01,default:.36},{key:"n2",label:"Squareness",min:.2,max:8,step:.02,default:2.16},{key:"size",label:"Size",min:.12,max:1.4,step:.01,default:.48},{key:"speed",label:z.speed,min:0,max:2,step:.05,default:.35},{key:"color",label:"Color",kind:"color",default:"#c4b5fd"},{key:"glow",label:"Glow",min:.2,max:2.4,step:.05,default:1.2,tier:"advanced"}]},{category:"Warp & pattern",key:"universeWithin",label:"Universe Within",icon:ee.Orbit,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[Do(2),{key:"speed",label:z.speed,min:0,max:3,step:.05,default:1},{key:"zoom",label:"Fractal zoom",min:1.05,max:2.2,step:.05,default:1.5},{key:"layers",label:"Layers (1/2/4/8)",min:1,max:8,step:1,default:4,choices:[1,2,4,8]},{key:"glow",label:"Glow",min:.6,max:2.4,step:.05,default:1.2,tier:"advanced"}]},{category:"Composite & texture",key:"pixelate",label:"Pixelate",icon:ee.Grid3x3,min:4,max:512,step:1,baseLabel:"Cells across"},{category:"Composite & texture",key:"shapeLayer",label:"Shape Layer",icon:ee.Shapes,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"shape",label:"Shape (0=Circle, 1=Square, 2=Triangle, 3=Hexagon, 4=Star)",min:0,max:4,step:1,default:0},Do(4),{key:"size",label:"Size",min:.05,max:1.6,step:.01,default:.45},{key:"stroke",label:"Stroke",min:0,max:1,step:.01,default:.15},{key:"fill",label:"Fill (0=Outline, 1=Filled)",min:0,max:1,step:1,default:0,choices:[0,1]},{key:"roundness",label:"Roundness",min:0,max:1,step:.01,default:0},{key:"rotate",label:"Rotate",min:0,max:1,step:.01,default:0},{key:"color",label:"Color",kind:"color",default:"#ffffff"},{key:"centerX",label:z.centerX,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerY",label:z.centerY,min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Composite & texture",key:"string",label:"String",icon:ee.Spline,min:0,max:1,step:.01,baseLabel:"Tension",multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.2,multiplierStep:.05,extraParams:[{key:"orientation",label:"Span (0=Horizontal, 1=Vertical)",min:0,max:1,step:1,default:0,choices:[0,1]},{key:"position",label:"Position",min:.08,max:.92,step:.01,default:.5},{key:"thickness",label:"Thickness",min:0,max:1,step:.01,default:.42},{key:"color",label:"Color",kind:"color",default:"#f6edd4"},{key:"glow",label:"Glow",min:0,max:1,step:.01,default:.68},{key:"harmonics",label:"Partials",min:1,max:3,step:1,default:2,tier:"advanced"}]},{category:"Composite & texture",key:"resynthesize",label:"Resynthesize",icon:ee.Dna,min:0,max:.98,step:.01,baseLabel:"Feedback",multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"x",label:"Morph X",min:0,max:1,step:.01,default:.5},{key:"y",label:"Morph Y",min:0,max:1,step:.01,default:.78},{key:"hue",label:"Hue drift",min:0,max:1,step:.01,default:.25},{key:"decay",label:"Decay",min:0,max:1,step:.01,default:.3,tier:"advanced"}]},{category:"Glitch",key:"pixelSort",label:"Pixel Sort",icon:ee.ArrowDownUp,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"threshold",label:"Threshold",min:.05,max:.95,step:.01,default:.45},{key:"reach",label:"Length",min:.05,max:1,step:.01,default:.4},{key:"chaos",label:"Chaos",min:0,max:1,step:.01,default:.7},{key:"direction",label:"0=down 1=up 2=right 3=left",min:0,max:3,step:1,default:0}]},{category:"Warp & pattern",key:"pointCloud",label:"Point Cloud",icon:ee.CircleDot,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"cols",label:z.density,min:4,max:194,step:1,default:32},{key:"depth",label:"Scatter",min:0,max:1.5,step:.01,default:.58},{key:"parallax",label:"Parallax",min:0,max:1.5,step:.01,default:.78},{key:"blur",label:"Defocus",min:0,max:1,step:.01,default:.5},{key:"fog",label:"Haze",min:0,max:1,step:.01,default:.4},{key:"minSize",label:"Min size",min:0,max:1,step:.01,default:.12,tier:"advanced"},{key:"maxSize",label:"Max size",min:0,max:1,step:.01,default:.85,tier:"advanced"}]},{category:"Warp & pattern",key:"pulseMarch",label:"Pulse March",icon:ee.Orbit,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"morph",label:"Morph",min:0,max:1,step:.01,default:.55},{key:"speed",label:z.speed,min:0,max:3,step:.05,default:1.1},{key:"detail",label:"Surface ripples",min:1,max:12,step:.1,default:4.5},{key:"glow",label:"Rim glow",min:0,max:1,step:.01,default:.65,tier:"advanced"}]},{category:"Warp & pattern",key:"lumaGridSquares",label:"Luma Grid Dots",icon:ee.Grid,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"cols",label:"Columns",min:4,max:194,step:1,default:32},{key:"minSize",label:"Min size",min:0,max:1,step:.01,default:.14,tier:"advanced"},{key:"maxSize",label:"Max size",min:0,max:1,step:.01,default:.88,tier:"advanced"}]},{category:"Glitch",key:"circleGlitch",label:"Pulse Rings",icon:ee.Target,min:0,max:.5,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:.1,multiplierMax:5,multiplierStep:.1,extraParams:[{key:"frequency",label:z.density,min:2,max:32,step:1,default:10},{key:"spread",label:"Spread",min:.05,max:1,step:.01,default:.2}]},{category:"Color & grade",key:"paletteRecolor",label:"Palette Recolor",icon:ee.Pipette,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"mode",label:"Map (0=Ramp, 1=Nearest)",min:0,max:1,step:1,default:0},{key:"colors",label:"Colors (2=Duo, 3=Tri, 4=Quad)",min:2,max:4,step:1,default:3},{key:"boost",label:"Punch",min:0,max:1,step:.01,default:.35}]},{category:"Color & grade",key:"rampGradient",label:"Ramp Gradient",icon:ee.Sunset,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[...bh(),{key:"animate",label:"Anim (0=Off, 1=Cycle)",min:0,max:1,step:1,default:0},{key:"speed",label:z.speed,min:0,max:2,step:.05,default:.45}]},{category:"Glitch",key:"rgbDelay",label:"RGB Delay",icon:ee.Layers,min:0,max:1,step:.01,baseLabel:z.amount},{category:"Transform & space",key:"rotate",label:"Rotate",icon:ee.RotateCw,min:-3.14,max:3.14,step:.01,baseLabel:"Angle"},{category:"Warp & pattern",key:"warpTunnel",label:"Warp Tunnel",icon:ee.Waves,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[{key:"speed",label:z.speed,min:0,max:3,step:.05,default:.55},{key:"refraction",label:"Refraction",min:0,max:1,step:.01,default:.72},{key:"shine",label:"Wave shine",min:0,max:1,step:.01,default:.68},{key:"arms",label:"Spiral arms",min:1,max:6,step:1,default:3,slider:!0},{key:"fog",label:"Depth fog",min:0,max:1,step:.01,default:.62,tier:"advanced"}]},{category:"Warp & pattern",key:"wetLens",label:"Wet Lens",icon:ee.Droplets,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"density",label:z.density,min:6,max:40,step:1,default:18},{key:"speed",label:z.speed,min:0,max:1.2,step:.02,default:.26},{key:"refraction",label:"Refraction",min:0,max:1,step:.01,default:.76},{key:"highlights",label:"Specular",min:0,max:1,step:.01,default:.42},{key:"gravity",label:"Gravity",min:0,max:1,step:.01,default:.74,tier:"advanced"}]},{category:"Warp & pattern",key:"wrap",label:"Wrap",icon:ee.CircleDot,min:-1,max:1,step:.01,baseLabel:"Pull / push",multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"twist",label:"Twist",min:-1,max:1,step:.01,default:0},{key:"radius",label:z.radius,min:.15,max:1,step:.01,default:.75},{key:"falloff",label:"Falloff",min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerX",label:z.centerX,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerY",label:z.centerY,min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Transform & space",key:"scroll",label:"Scroll",icon:ee.Move,min:0,max:1,step:.01,baseLabel:"Scroll X",extraParams:[{key:"y",label:"Scroll Y",min:0,max:1,step:.01,default:0}]},{category:"Transform & space",key:"shake",label:"Shake",icon:ee.Video,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"speed",label:z.speed,min:.15,max:2.5,step:.05,default:1},{key:"bounce",label:"Bounce",min:0,max:1,step:.01,default:.55},{key:"roll",label:"Roll",min:0,max:1,step:.01,default:.4},{key:"zoom",label:"Punch-in",min:0,max:1,step:.01,default:.45,tier:"advanced"}]},{category:"Transform & space",key:"mirror",label:"Mirror",icon:ee.FlipHorizontal,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"axis",label:"Axis (0=X, 1=Y, 2=XY, 3=Free)",min:0,max:3,step:1,default:0},{key:"angle",label:"Free angle",min:0,max:1,step:.01,default:0},{key:"flip",label:"Keep half (0=A, 1=B)",min:0,max:1,step:1,default:0,choices:[0,1],tier:"advanced"},{key:"centerX",label:z.centerX,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerY",label:z.centerY,min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Transform & space",key:"tile",label:"Tile",icon:ee.LayoutGrid,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"cols",label:"Columns",min:1,max:12,step:1,default:3},{key:"rows",label:"Rows",min:1,max:12,step:1,default:3}]},{category:"Transform & space",key:"vibration",label:"Vibration",icon:ee.Vibrate,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"frequency",label:"Rate (Hz)",min:2,max:48,step:1,default:12},{key:"tail",label:"Sustain",min:0,max:1,step:.01,default:.82,tier:"advanced"}]},{category:"Composite & texture",key:"mask",label:"Mask",icon:ee.Layers,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"shape",label:"Shape (0=Lines, 1=Circle, 2=Square, 3=Noise, 4=Perspective)",min:0,max:4,step:1,default:0},{key:"mode",label:"Blend (0=Mask, 1=Diff, 2=Add, 3=Mult)",min:0,max:3,step:1,default:0},{key:"frequency",label:z.density,min:0,max:40,step:1,default:20,tier:"advanced"},{key:"speed",label:z.speed,min:0,max:4,step:.05,default:.2,tier:"advanced"},{key:"rotation",label:"Rotation",min:0,max:3.14,step:.01,default:0,tier:"advanced"},{key:"balance",label:"Width",min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"perspective",label:"Perspective",min:0,max:1,step:.01,default:.75,tier:"advanced"},{key:"focus",label:"Focus X",min:0,max:1,step:.01,default:1,tier:"advanced"}]},{category:"Warp & pattern",key:"lumaLines",label:"Luma Lines",icon:ee.AlignJustify,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"cols",label:z.density,min:4,max:100,step:1,default:52},{key:"minWidth",label:"Min width",min:0,max:1,step:.01,default:.1,tier:"advanced"},{key:"maxWidth",label:"Max width",min:0,max:1,step:.01,default:.8,tier:"advanced"},{key:"rotation",label:"Rotation",min:0,max:3.14,step:.01,default:0,tier:"advanced"}]},{category:"Warp & pattern",key:"lumaPrint",label:"Luma Print",icon:ee.Grid,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"mode",label:"Mode (0=Stipple, 1=Mosaic, 2=Icons, 3=Lines, 4=Radial)",min:0,max:4,step:1,default:0},{key:"iconSet",label:"Icons (0=Geo, 1=Line, 2=Arc, 3=Classic)",min:0,max:3,step:1,default:0},{key:"density",label:z.density,min:4,max:194,step:1,default:32},{key:"contrast",label:"Contrast",min:0,max:1,step:.01,default:.5},{key:"wave",label:"Wave",min:0,max:1,step:.01,default:.35},{key:"shape",label:"Radial (0=Circle 1=Diamond)",min:0,max:1,step:1,default:0,tier:"advanced"},{key:"rotation",label:"Rotation",min:0,max:3.14,step:.01,default:0,tier:"advanced"}]},{category:"Warp & pattern",key:"topoContour",label:"Topo Contour",icon:ee.Waves,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[Do(0),{key:"scale",label:z.density,min:.25,max:3,step:.05,default:1},{key:"lines",label:"Lines",min:2,max:24,step:1,default:10},{key:"speed",label:z.speed,min:0,max:3,step:.05,default:1},{key:"palette",label:"0=Rainbow 1=Mono",min:0,max:1,step:1,default:0},{key:"valley",label:"Valley fill",min:0,max:1,step:.01,default:.12,tier:"advanced"},{key:"lineWidth",label:"Line width",min:.35,max:2.5,step:.05,default:1,tier:"advanced"},{key:"videoTint",label:"Video tint",min:0,max:1,step:.01,default:.35,tier:"advanced"}]},{category:"Warp & pattern",key:"neonGrid",label:"Neon Grid",icon:ee.Grid,extraParams:[{key:"spawn",label:"Lines per hit",min:1,max:12,step:1,default:4},{key:"horizontal",label:"Horizontal mix",min:0,max:1,step:.05,default:1},{key:"vertical",label:"Vertical mix",min:0,max:1,step:.05,default:1},{key:"thickness",label:"Thickness",min:.005,max:.35,step:.005,default:.08},{key:"decay",label:"Fade speed",min:.3,max:4,step:.05,default:1.25},{key:"horizontalColor",label:"Horizontal",kind:"color",default:"#ff3cb4"},{key:"verticalColor",label:"Vertical",kind:"color",default:"#50dcff"},{key:"crossColor",label:"Cross flare",kind:"color",default:"#ffffff",tier:"advanced"},{key:"intersect",label:"Flare strength",min:0,max:3,step:.05,default:1.6,tier:"advanced"}]},{category:"Glitch",key:"midlineStretch",label:"Midline Stretch",icon:ee.MoveVertical,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"splitY",label:"Split Y",min:.05,max:.95,step:.01,default:.5}]},{category:"Playback",key:"accelerate",label:"Accelerate",icon:ee.FastForward,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"duration",label:"Duration (sec)",min:.05,max:1,step:.05,default:.5},{key:"maxSpeed",label:"Peak speed",min:1.1,max:6,step:.1,default:2.5,tier:"advanced"}]},{category:"Playback",key:"slowmo",label:"Slowmo",icon:ee.Clock,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"duration",label:"Duration (sec)",min:.05,max:1,step:.05,default:.5},{key:"motionBlur",label:"Frame trail",min:0,max:1,step:.01,default:.65},{key:"minSpeed",label:"Floor speed",min:.02,max:1,step:.01,default:.2,tier:"advanced"}]},{category:"Playback",key:"stutterBack",label:"Stutter Back",icon:ee.SkipBack,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"backFrames",label:"Rewind frames",min:1,max:48,step:1,default:6}]},{category:"Playback",key:"timeGlitch",label:"Video Time Slice",icon:ee.Clock,min:0,max:1,step:.01,baseLabel:z.amount,extraParams:[{key:"cols",label:"Divisions",min:10,max:40,step:1,default:16},{key:"frameOffset",label:"Frame offset",min:1,max:24,step:1,default:2},{key:"origin",label:"Origin (0=Left/Top, 1=Middle, 2=Right/Bottom)",min:0,max:2,step:1,default:1},{key:"direction",label:"0=Vertical 1=Horizontal",min:0,max:1,step:1,default:0},{key:"mode",label:"0=Slices 1=Squares",min:0,max:1,step:1,default:0}]},{category:"Glitch",key:"vhs",label:"VHS",icon:ee.Radio,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"tracking",label:"Tracking",min:0,max:1,step:.01,default:.48},{key:"noise",label:"Tape noise",min:0,max:1,step:.01,default:.38},{key:"bleed",label:"Chroma bleed",min:0,max:1,step:.01,default:.42},{key:"lines",label:"Scan lines",min:0,max:1,step:.01,default:.52},{key:"dropout",label:"Dropout",min:0,max:1,step:.01,default:.28},{key:"speed",label:z.speed,min:0,max:4,step:.05,default:1,tier:"advanced"}]},{category:"Glitch",key:"maskVideo",label:"Video Window",icon:ee.PictureInPicture2,extraParams:[{key:"size",label:"Size",min:.06,max:.55,step:.01,default:.22},{key:"shuffle",label:"Shuffle rate",min:0,max:4,step:.05,default:.35}]},{category:"Transform & space",key:"zoom",label:"Zoom",icon:ee.ZoomIn,min:.5,max:2,step:.01,baseLabel:"Scale"},{category:"Composite & texture",key:"textLayer",label:"Text Layer",icon:ee.Type,min:0,max:1,step:.01,baseLabel:z.amount,multiplierLabel:z.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"message",label:"Message",kind:"text",default:"YOUR MESSAGE"},{key:"size",label:"Size",min:.03,max:.2,step:.005,default:.085},{key:"positionX",label:z.centerX,min:.05,max:.95,step:.01,default:.5},{key:"positionY",label:z.centerY,min:.08,max:.92,step:.01,default:.82},{key:"align",label:"Align (0=Left, 1=Center, 2=Right)",min:0,max:2,step:1,default:1},{key:"font",label:"Font (0=Sans, 1=Mono, 2=Display, 3=Serif, 4=UI trial)",min:0,max:4,step:1,default:0},{key:"weight",label:"Weight (0=Regular, 1=Bold)",min:0,max:1,step:1,default:1},{key:"tracking",label:"Tracking",min:-.04,max:.18,step:.01,default:.02},{key:"color",label:"Color",kind:"color",default:"#ffffff"},{key:"anim",label:"Anim (0=None, 1=Fade, 2=Rise, 3=Type, 4=Pulse, 5=Glitch)",min:0,max:5,step:1,default:0},{key:"animSpeed",label:"Anim speed",min:.2,max:2.5,step:.05,default:.85},{key:"glow",label:"Glow",min:0,max:1,step:.01,default:.35,tier:"advanced"},{key:"shadow",label:"Shadow",min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Composite & texture",key:"triggerDebug",label:"Trigger Debug",icon:ee.CircleDot,min:0,max:1,step:.01,baseLabel:"Opacity",extraParams:[{key:"beatWindow",label:"Beat window",min:8,max:32,step:1,default:16,tier:"advanced"}]}],K4=jo.filter(e=>e.category==="Playback").map(e=>e.key),Q4=new Set(K4);function Dl(e){return Q4.has(e)}u();u();u();u();var wa="smooth";function gp(e){return e<=0?0:e>=1?1:e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function Fh(e,t){let n=Math.max(0,Math.min(1,t));switch(e){case"linear":return 1-n;case"quad":return(1-n)*(1-n);case"cubic":return Math.pow(1-n,3);case"cosine":return Math.cos(Math.PI/2*n);case"expo":return n>=1?0:Math.pow(2,-12*n);default:return 1-gp(n)}}function ui(e,t,n,o,r){let i=Math.max(0,r),s=o>0?o:1/Math.max(i,.05);return Math.max(.08,e+t+n+s)*1.05}var fn={attack:0,hold:0,release:0,decay:20,easeShape:wa};var Se={triggerThreshold:.5,triggerCount:1,delay:0,decay:fn.decay,triggerAttack:fn.attack,triggerRelease:fn.release,triggerHold:fn.hold,triggerEaseOutShape:wa},Nl={triggerThreshold:0,triggerCount:1};function bp(e){return!e.isTrigger||e.envelopeRef===null?e:{...e,envelopeRef:e.envelopeRef&&e.envelopeRef!==null?e.envelopeRef:"eg:1",triggerThreshold:e.triggerThreshold??Nl.triggerThreshold,triggerCount:e.triggerCount??Nl.triggerCount,delay:e.delay??Se.delay,decay:e.decay??Se.decay,triggerAttack:e.triggerAttack??Se.triggerAttack,triggerRelease:e.triggerRelease??Se.triggerRelease,triggerHold:e.triggerHold??Se.triggerHold,triggerEaseOutShape:e.triggerEaseOutShape??Se.triggerEaseOutShape}}var Z4=new Map([...sr,...jo].map(e=>[e.key,e])),J4={noise:.6,glow:.55,lens7c:.62},e5=new Set(["circleGlitch","neonGrid","electricNoise","stutterBack","jumpCut","clipPeek","zap","boomerang","slowmo","accelerate","string"]);function t5(e,t){let n=ms(e);return{syncBand:t.syncBand,syncMultiplier:t.syncMultiplier,isTrigger:t.isTrigger??!1,triggerThreshold:t.triggerThreshold??Se.triggerThreshold,triggerCount:t.triggerCount??Se.triggerCount,envelopeRef:n?t.envelopeRef??void 0:t.envelopeRef??null,triggerAttack:t.triggerAttack??Se.triggerAttack,triggerRelease:t.triggerRelease??Se.triggerRelease}}function n5(e,t){let n={...e??{}};if(t?.length)for(let o of t)!o||typeof o!="object"||!("key"in o)||"default"in o&&o.default!==void 0&&(n[o.key]=o.default);return Object.keys(n).length?n:void 0}function o5(e,t){return!e||e.min!==0||e.max==null||e.baseLabel!==z.amount?t:e.max===1?1:t>0?Math.min(t,e.max):Math.min(e.max,1)}function yp(e,t,n=t.enabled){let o=Z4.get(String(e)),{paramSync:r,enabled:i,syncBand:s,syncMultiplier:l,isTrigger:m,triggerThreshold:d,triggerCount:y,delay:D,decay:B,triggerAttack:O,triggerRelease:K,triggerHold:X,triggerEaseOutShape:pe,...Re}=t,ge=e5.has(String(e)),Fe=J4[String(e)];return{...Re,enabled:n,base:ge?t.base:Fe??o5(o,t.base),params:n5(t.params,o?.extraParams),syncBand:"none",syncMultiplier:0,isTrigger:!1,...Se,...ge?t5(String(e),t):{},...Ph(String(e))&&r?{paramSync:r}:{}}}var Oh={enabled:!1,base:.3,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{y:0}},Zr={videoSpeed:{enabled:!0,base:1.25,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},pulse:{enabled:!1,base:.55,syncBand:"low",syncMultiplier:.45,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{breath:.5,bloom:.45}},accelerate:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{duration:.5,maxSpeed:2.5}},slowmo:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{duration:.5,motionBlur:.65,minSpeed:.2}},midlineStretch:{enabled:!1,base:.55,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{splitY:.5}},vignette:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{radius:.75,softness:.35,blur:0}},vhs:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{tracking:.48,noise:.38,bleed:.42,lines:.52,dropout:.28,speed:1}},zoom:{enabled:!1,base:1,syncBand:"low",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},scroll:{...Oh},wrap:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{twist:0,centerX:.5,centerY:.5,radius:.75,falloff:.5}},mirror:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{axis:0,angle:0,flip:0,centerX:.5,centerY:.5}},mirrorStripes:{enabled:!1,base:.92,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mirror:1,scale:.82,spread:.48,density:.55,thickness:.55,layers:4,rotate:0,randomness:.35,color:"#ff1a1a"}},tile:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{cols:3,rows:3}},vibration:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{frequency:14,tail:.78}},shake:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{speed:1,bounce:.55,roll:.4,zoom:.45}},rotate:{enabled:!1,base:.45,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},colorAdjust:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{contrast:1,hue:0,saturation:1,hueRev:2}},colorLayer:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{contrast:1,hue:0,saturation:1}},answerPrint:{enabled:!1,base:.85,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{stock:0,density:1}},glitch:{enabled:!1,base:4,syncBand:"high",syncMultiplier:.38,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{size:5,speed:1.15,travel:1,tear:1}},timeGlitch:{enabled:!1,base:0,syncBand:"mid",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{cols:16,frameOffset:2,origin:1,direction:0,mode:0}},oscilloscope:{enabled:!1,base:.62,syncBand:"master",syncMultiplier:.52,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,persistence:.72,scale:.55,positionY:.88,colorLo:"#1c3cff",colorMid:"#ff9a1a",colorHi:"#fff6c8",glow:.55}},cymatic:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{frequency:12}},circleGlitch:{enabled:!1,base:0,syncBand:"high",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{frequency:10,spread:.2}},rgbDelay:{enabled:!1,base:0,syncBand:"mid",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},chromaticAberration:{enabled:!1,base:0,syncBand:"high",syncMultiplier:.28,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{direction:.125}},degauss:{enabled:!1,base:0,syncBand:"kick",syncMultiplier:.72,isTrigger:!0,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{frequency:12,speed:1.4,tail:.82,fringe:.55}},concentricRotate:{enabled:!1,base:.35,syncBand:"mid",syncMultiplier:.4,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,rings:7,step:.08,speed:.25,centerX:.5,centerY:.5}},centerDiffuse:{enabled:!1,base:.75,syncBand:"none",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{band:.06,diffusion:.72,centerY:.5}},dataDrip:{enabled:!1,base:0,syncBand:"mid",syncMultiplier:.38,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{columns:72,dance:.65,chaos:.35,speed:1}},distortion:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,curvature:1,frequency:10,speed:1.2,centerFocus:1.4,styleRev:2}},encodeGlitch:{enabled:!1,base:.28,syncBand:"high",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{macroBlock:.5,tear:.35}},edge:{enabled:!1,base:.5,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{threshold:.32,thickness:.35,soften:.25,strength:1}},dither:{enabled:!1,base:.55,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{binary:0,balance:.5,scale:4}},blur:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0}},emberHeat:{enabled:!1,base:.72,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{waves:.76,intensity:.78,speed:.8,density:22,glow:.82}},sharpen:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{radius:1}},shatterLayer:{enabled:!1,base:.72,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,density:14,gap:.065,scatter:.62,irregularity:.82,videoIndex:2}},boomerang:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{segmentSec:1.25,maxFrames:60,captureFps:24}},hdr:{enabled:!1,base:.7,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{blackFloor:.08,highlights:.85,knee:.5}},ghostFlow:{enabled:!1,base:.42,syncBand:"low",syncMultiplier:.4,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{melt:.62,flowScale:.48,refresh:0,chromaBleed:.35}},glow:{enabled:!1,base:.28,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{threshold:.48,bloom:.55}},kaleid:{enabled:!1,base:6,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{angle:0,videoZoom:1,videoX:0,videoY:0}},negative:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},feedback:{enabled:!1,base:.9,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{balance:.5,scale:1}},fillLayer:{enabled:!1,base:.48,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{type:1,sweep:0,mode:0,colorA:"#7c3aed",colorB:"#06b6d4",softness:.35}},flash:{enabled:!1,base:0,syncBand:"high",syncMultiplier:.5,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},hitStreak:{enabled:!1,base:.55,syncBand:"beat",syncMultiplier:.38,isTrigger:!0,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{length:.58,mode:0,threshold:.6,decay:.72}},lens7c:{enabled:!1,base:.35,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{spread:.55,rotation:0,threshold:.42,haze:.5}},fadeOff:{enabled:!1,base:.9,syncBand:"master",syncMultiplier:.1,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},layerBlend:{enabled:!1,base:.5,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,sourceMode:0,videoIndex:1,videoPath:"",playbackSpeed:1.25}},videoMap:{enabled:!1,base:.65,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,invert:0,threshold:.35,softness:.12,sourceMode:0,videoIndex:1,videoPath:"",playbackSpeed:1.25}},liquix:{enabled:!1,base:.14,syncBand:"low",syncMultiplier:.34,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{pivot:.48,bands:56,speed:1.28}},transition:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{type:0,duration:1}},autoMix:{enabled:!1,base:12,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{advanceMode:"random",advanceWhen:"time"}},noise:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{scale:1681,speed:.15,mode:3}},jumpCut:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{skipFrames:2,jumpCuts:1}},clipPeek:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{holdSec:.35,steps:1}},zap:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{clipCount:3,framesPerClip:4}},playbackCue:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:1,params:{eventCount:2,holdSec:.35,clipMode1:0,clipMode2:0,clipMode3:0,clipMode4:0,clip1:1,frame1:48,clip2:2,frame2:0,clip3:3,frame3:0,clip4:4,frame4:0},paramSync:{frame1:{band:"kick",multiplier:0,isTrigger:!0,envelopeRef:null,triggerThreshold:.5,triggerCount:1},frame2:{band:"snare",multiplier:0,isTrigger:!0,envelopeRef:null,triggerThreshold:.5,triggerCount:1},frame3:{band:"high",multiplier:0,isTrigger:!0,envelopeRef:null,triggerThreshold:.5,triggerCount:1},frame4:{band:"beat",multiplier:0,isTrigger:!0,envelopeRef:null,triggerThreshold:.5,triggerCount:1}}},stutterBack:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{backFrames:6}},triggerDebug:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{beatWindow:16}},pixelate:{enabled:!1,base:64,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},pixelSort:{enabled:!1,base:.85,syncBand:"none",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{threshold:.45,reach:.4,chaos:.7,direction:0}},lumaGridSquares:{enabled:!1,base:.88,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{cols:32,minSize:.14,maxSize:.88}},pointCloud:{enabled:!1,base:.85,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{cols:32,minSize:.12,maxSize:.85,depth:.58,parallax:.78,blur:.5,fog:.4}},rampGradient:{enabled:!1,base:.58,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{...yh(),animate:0,speed:.45}},reactionDiffusion:{enabled:!1,base:1,syncBand:"mid",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{source:.78,feed:.55,kill:.57,scale:12,emboss:.58,flow:.32,speed:.45,styleMap:.35}},ripple:{enabled:!1,base:0,syncBand:"mid",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{frequency:10,speed:1.2,decay:.55,centerX:.5,centerY:.5}},randomGallery:{enabled:!1,base:.75,syncBand:"mid",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{cells:7,speed:1,refraction:.82,drift:1}},gridShuffle:{enabled:!1,base:1,syncBand:"beat",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{cells:4,chaos:1}},topoContour:{enabled:!1,base:.92,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,scale:1,lines:10,speed:1,palette:0,valley:.12,lineWidth:1,videoTint:.35}},throughTheStars:{enabled:!1,base:.75,syncBand:"low",syncMultiplier:.55,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{trail:.35,density:52,speed:1,glow:.72,fov:1,depth:.65,tint:"#00e8cc",centerX:.5,centerY:.5}},plasma:{enabled:!1,base:.85,syncBand:"master",syncMultiplier:.45,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,speed:1.1,scale:1,complexity:1}},paletteRecolor:{enabled:!1,base:.85,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,colors:3,boost:.35}},shapeLayer:{enabled:!1,base:.9,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{shape:0,mode:4,size:.45,roundness:0,stroke:.15,fill:0,rotate:0,color:"#ffffff",centerX:.5,centerY:.5}},string:{enabled:!1,base:.42,syncBand:"mid",syncMultiplier:.58,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{orientation:0,position:.5,thickness:.42,color:"#f6edd4",glow:.68,harmonics:2}},resynthesize:{enabled:!1,base:.85,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{x:.5,y:.78,hue:.25,decay:.3}},patternLayer:{enabled:!1,base:.55,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{type:1,geometry:0,variant:2,mode:0,scale:1,speed:.4,warp:0,symmetry:2,seedSize:.18,gap:.35,colorA:"#0b1020",colorB:"#22d3ee"}},electricNoise:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.45,triggerCount:1,envelopeRef:null,triggerAttack:.02,triggerRelease:.35,params:{amount:1,color:"#331a66",mode:2,speed:1,scale:1,noiseScale:1,turbulence:.2,detail:5,intensity:1.4,rings:.85,ringPower:.9}},plexus:{enabled:!1,base:.85,syncBand:"master",syncMultiplier:.45,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:2,speed:1,points:1.5,intensity:1,layers:4,glow:1.2}},superformula:{enabled:!1,base:.85,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{look:2,mode:2,m:7.6,n1:.36,n2:2.16,size:.48,speed:.35,glow:1.2,color:"#c4b5fd"}},universeWithin:{enabled:!1,base:.85,syncBand:"master",syncMultiplier:.45,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:2,speed:1,zoom:1.5,layers:4,glow:1.2}},fractalFold:{enabled:!1,base:.85,syncBand:"master",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:2,foldX:.86,foldY:1.04,zoom:1,speed:.6,spin:.42,depth:8,glow:1.4,hue:.12}},wetLens:{enabled:!1,base:.68,syncBand:"mid",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{density:18,speed:.26,refraction:.76,highlights:.42,gravity:.74}},mask:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{shape:0,mode:0,frequency:20,speed:.2,rotation:0,balance:.5,perspective:.75,focus:1}},maskVideo:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{size:.22,shuffle:.35}},metalSphere:{enabled:!1,base:.85,syncBand:"low",syncMultiplier:.4,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{envMap:0,size:1,noise:.42,detail:3.5,speed:.75,roughness:.1,reflection:1.05,rotation:.35}},pulseMarch:{enabled:!1,base:.85,syncBand:"low",syncMultiplier:.45,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{morph:.55,speed:1.1,detail:4.5,glow:.65}},warpTunnel:{enabled:!1,base:.8,syncBand:"master",syncMultiplier:.5,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{speed:.55,refraction:.72,shine:.68,arms:3,fog:.62}},lumaLines:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{cols:52,minWidth:.1,maxWidth:.8,rotation:0}},lumaDust:{enabled:!1,base:.8,syncBand:"mid",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{stick:.65,detach:.26,burst:.58,turbulence:.48,spectral:.52,size:1,brightness:.68,density:.5,quality:.55,trail:.5}},lumaLock:{enabled:!1,base:.92,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{count:3,threshold:.42,smooth:.76,size:1,links:.7,color:"#ff2a2a",labelColor:"#ffb020"}},lumaPrint:{enabled:!1,base:.9,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,iconSet:0,density:32,contrast:.5,wave:.35,shape:0,rotation:0}},neonGrid:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.45,triggerCount:1,envelopeRef:null,triggerAttack:.02,triggerRelease:.35,params:{spawn:4,horizontal:1,vertical:1,thickness:.08,decay:1.25,intersect:1.6,horizontalColor:"#ff3cb4",verticalColor:"#50dcff",crossColor:"#ffffff"}},normalMap:{enabled:!1,base:.62,syncBand:"mid",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{source:1,scale:12,refraction:.55,lighting:.45,specular:.4,detail:1.05,lightX:.65,lightY:.35}},textLayer:{enabled:!1,base:.92,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.45,triggerCount:1,envelopeRef:null,triggerAttack:.02,triggerRelease:.55,params:{message:"YOUR MESSAGE",size:.085,positionX:.5,positionY:.82,align:1,font:0,weight:1,tracking:.02,color:"#ffffff",anim:0,animSpeed:.85,glow:.35,shadow:.5}},customShader:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{shaderType:0,code:ps}}},Ta=()=>{let e={};for(let t of Object.keys(Zr)){let n=Zr[t];Sr(t)?e[t]={...n,...Se}:e[t]=yp(t,n,n.enabled)}return e},Hh=["pulse"],Ih=()=>{let e=Ta();return e.pulse={...Zr.pulse,enabled:!0},e};function Bh(e){let t={...Ta(),...e.fx},n=Math.max(0,Math.min(e.clipIndex??0,e.clips.length-1));return{video:e.clips[n]??"",isVideoPlaying:!0,activeFxList:[...e.activeFxList??[]],...e.activeChain?{activeChain:e.activeChain}:{},...e.fxGroups?{fxGroups:e.fxGroups}:{},...e.layerInstances?{layerInstances:e.layerInstances}:{},fx:t}}u();u();u();function ie(){return window}function Dh(e){return(e??"none")!=="none"}function xp(e){return Dh(e.syncBand)?"time":e.params?.advanceWhen==="loop"?"loop":"time"}function r5(e){return Dh(e.syncBand)||e.isTrigger===!0}function Nh(e){return e?.enabled?r5(e)||xp(e)==="loop"?!0:(Number(e.base)||0)>0:!1}function Wh(){let e=ie(),t=[];for(let n of[e.s0,e.s1]){let o=n?.src;o instanceof HTMLVideoElement&&o.readyState>=HTMLMediaElement.HAVE_METADATA&&t.push(o)}return t.length===0?null:t.find(n=>!n.paused&&!n.ended)??t[0]}function vp(){return{lastTime:-1,completedLoops:0}}function Gh(e,t,n){if(!e.loop)return!1;let o=e.duration;if(!Number.isFinite(o)||o<=0)return!1;let r=e.currentTime,i=Math.max(.05,1/30);return n.lastTime<0?(n.lastTime=r,!1):n.lastTime>o*.4&&r<i?(n.completedLoops+=1,n.lastTime=r,n.completedLoops>=t):(n.lastTime=r,!1)}function a5(e,t,n){if(t<=1)return e;if(n==="sequential")return(e+1)%t;let o=Math.floor(Math.random()*t);return o===e&&(o=(o+1)%t),o}function Uh(e){let t=e.autoMix;if(!t||!Nh(t)||e.clipCount<=1)return{stop:()=>{}};let n=t.params?.advanceMode==="sequential"?"sequential":"random",o=()=>e.selectClip(a5(e.currentIndex(),e.clipCount,n));if(xp(t)==="loop"){let s=Math.max(1,Math.round(Number(t.base)||1)),l=vp(),m={id:0},d=()=>{let y=Wh();y&&Gh(y,s,l)&&(l=vp(),o()),m.id=requestAnimationFrame(d)};return m.id=requestAnimationFrame(d),{stop:()=>cancelAnimationFrame(m.id)}}let r=Math.max(1,Number(t.base)||12)*1e3,i=window.setInterval(o,r);return{stop:()=>window.clearInterval(i)}}u();var i5=`
.hexa-chrome{position:absolute;left:0;right:0;bottom:0;z-index:2;display:flex;align-items:center;gap:14px;
padding:14px 18px;font:500 12px/1 ui-sans-serif,system-ui,-apple-system,sans-serif;letter-spacing:.06em;
color:rgba(255,255,255,.72);background:linear-gradient(to top,rgba(0,0,0,.62),transparent);
opacity:0;transition:opacity .25s ease;pointer-events:none;text-transform:uppercase}
.hexa-chrome[data-visible="true"]{opacity:1;pointer-events:auto}
.hexa-chrome__title{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
color:rgba(255,255,255,.9)}
.hexa-chrome__count{font-variant-numeric:tabular-nums;color:rgba(255,255,255,.55)}
.hexa-chrome button{appearance:none;border:1px solid rgba(255,255,255,.16);background:rgba(0,0,0,.45);
color:inherit;font:inherit;letter-spacing:.08em;padding:7px 11px;cursor:pointer;backdrop-filter:blur(12px)}
.hexa-chrome button:hover{border-color:rgba(255,255,255,.4);color:#fff}
`;function zh(e,t){let n=document.createElement("style");n.textContent=i5,document.head.appendChild(n);let o=document.createElement("div");o.className="hexa-chrome";let r=document.createElement("span");r.className="hexa-chrome__title",r.textContent=t.title;let i=document.createElement("span");i.className="hexa-chrome__count";let s=document.createElement("button"),l=document.createElement("button");l.textContent="Prev";let m=document.createElement("button");m.textContent="Next";let d=document.createElement("button");d.textContent="Full",o.append(r,i,l,s,m,d),e.appendChild(o);let y=K=>{s.textContent=K?"Pause":"Play"},D=K=>{i.textContent=t.clipCount>1?`${K+1}/${t.clipCount}`:""};l.addEventListener("click",t.onPrevious),m.addEventListener("click",t.onNext),s.addEventListener("click",()=>y(t.onTogglePlay())),d.addEventListener("click",t.onToggleFullscreen);let B=0,O=()=>{o.dataset.visible="true",window.clearTimeout(B),B=window.setTimeout(()=>{o.dataset.visible="false"},2600)};return e.addEventListener("pointermove",O),e.addEventListener("pointerdown",O),O(),{setClipIndex:D,setPlaying:y,destroy:()=>{window.clearTimeout(B),e.removeEventListener("pointermove",O),e.removeEventListener("pointerdown",O),o.remove(),n.remove()}}}u();u();u();var Ca=function({regl:e,precision:t,label:n="",width:o,height:r}){this.regl=e,this.precision=t,this.label=n,this.positionBuffer=this.regl.buffer([[-2,0],[0,-2],[2,2]]),this.draw=()=>{},this.init(),this.pingPongIndex=0,this.fbos=Array(2).fill().map(()=>this.regl.framebuffer({color:this.regl.texture({mag:"nearest",width:o,height:r,format:"rgba"}),depthStencil:!1}))};Ca.prototype.resize=function(e,t){this.fbos.forEach(n=>{n.resize(e,t)})};Ca.prototype.getCurrent=function(){return this.fbos[this.pingPongIndex]};Ca.prototype.getTexture=function(){var e=this.pingPongIndex?0:1;return this.fbos[e]};Ca.prototype.init=function(){return this.transformIndex=0,this.fragHeader=`
  precision ${this.precision} float;

  uniform float time;
  varying vec2 uv;
  `,this.fragBody="",this.vert=`
  precision ${this.precision} float;
  attribute vec2 position;
  varying vec2 uv;

  void main () {
    uv = position;
    gl_Position = vec4(2.0 * position - 1.0, 0, 1);
  }`,this.attributes={position:this.positionBuffer},this.uniforms={time:this.regl.prop("time"),resolution:this.regl.prop("resolution")},this.frag=`
       ${this.fragHeader}

      void main () {
        vec4 c = vec4(0, 0, 0, 0);
        vec2 st = uv;
        ${this.fragBody}
        gl_FragColor = c;
      }
  `,this};Ca.prototype.render=function(e){let t=e[0];var n=this,o=Object.assign(t.uniforms,{prevBuffer:()=>n.fbos[n.pingPongIndex]});n.draw=n.regl({frag:t.frag,vert:n.vert,attributes:n.attributes,uniforms:o,count:3,framebuffer:()=>(n.pingPongIndex=n.pingPongIndex?0:1,n.fbos[n.pingPongIndex])})};Ca.prototype.tick=function(e){this.draw(e)};var Vh=Ca;var x_=us(Mp(),1);u();u();function n_(e){return navigator.mediaDevices.enumerateDevices().then(t=>t.filter(n=>n.kind==="videoinput")).then(t=>{let n={audio:!1,video:!0};return t[e]&&(n.video={deviceId:{exact:t[e].deviceId}}),window.navigator.mediaDevices.getUserMedia(n)}).then(t=>{let n=document.createElement("video");return n.setAttribute("autoplay",""),n.setAttribute("muted",""),n.setAttribute("playsinline",""),n.srcObject=t,new Promise((o,r)=>{n.addEventListener("loadedmetadata",()=>{n.play().then(()=>o({video:n}))})})}).catch(console.log.bind(console))}u();function o_(e){return new Promise(function(t,n){navigator.mediaDevices.getDisplayMedia(e).then(o=>{let r=document.createElement("video");r.srcObject=o,r.addEventListener("loadedmetadata",()=>{r.play(),t({video:r})})}).catch(o=>n(o))})}var Lp=class{constructor({regl:t,width:n,height:o,pb:r,label:i=""}){Hl(this,"canvases",{});this.label=i,this.regl=t,this.src=null,this.dynamic=!0,this.width=n,this.height=o,this.tex=this.regl.texture({shape:[1,1]}),this.pb=r}init(t,n){"src"in t&&(this.src=t.src,this.tex=this.regl.texture({data:this.src,...n})),"dynamic"in t&&(this.dynamic=t.dynamic)}initCam(t,n){let o=this;n_(t).then(r=>{o.src=r.video,o.dynamic=!0,o.tex=o.regl.texture({data:o.src,...n})}).catch(r=>console.log("could not get camera",r))}initVideo(t="",n){let o=document.createElement("video");o.crossOrigin="anonymous",o.autoplay=!0,o.loop=!0,o.muted=!0;let r=o.addEventListener("loadeddata",()=>{this.src=o,o.play(),this.tex=this.regl.texture({data:this.src,...n}),this.dynamic=!0});o.src=t}initImage(t="",n){let o=document.createElement("img");o.crossOrigin="anonymous",o.src=t,o.onload=()=>{this.src=o,this.dynamic=!1,this.tex=this.regl.texture({data:this.src,...n})}}initStream(t,n){let o=this;t&&this.pb&&(this.pb.initSource(t),this.pb.on("got video",function(r,i){r===t&&(o.src=i,o.dynamic=!0,o.tex=o.regl.texture({data:o.src,...n}))}))}initScreen(t=0,n){let o=this;o_().then(function(r){o.src=r.video,o.tex=o.regl.texture({data:o.src,...n}),o.dynamic=!0}).catch(r=>console.log("could not get screen",r))}initCanvas(t=1e3,n=1e3){if(this.canvases[this.label]==null){let s=document.createElement("canvas").getContext("2d");s!=null&&(this.canvases[this.label]=s)}let o=this.canvases[this.label],r=o.canvas;return r.width!==t&&r.height!==n?(r.width=t,r.height=n):o.clearRect(0,0,t,n),this.init({src:r}),this.dynamic=!0,o}resize(t,n){this.width=t,this.height=n}clear(){this.src&&this.src.srcObject&&this.src.srcObject.getTracks&&this.src.srcObject.getTracks().forEach(t=>t.stop()),this.src=null,this.tex=this.regl.texture({shape:[1,1]})}tick(t){this.src&&this.dynamic===!0&&(this.src.videoWidth&&this.src.videoWidth!==this.tex.width&&(console.log(this.src.videoWidth,this.src.videoHeight,this.tex.width,this.tex.height),this.tex.resize(this.src.videoWidth,this.src.videoHeight)),this.src.width&&this.src.width!==this.tex.width&&this.tex.resize(this.src.width,this.src.height),this.tex.subimage(this.src))}getTexture(){return this.tex}},r_=Lp;u();u();var gs={};function p5(e){if(typeof e=="object"){if("buttons"in e)return e.buttons;if("which"in e){var t=e.which;if(t===2)return 4;if(t===3)return 2;if(t>0)return 1<<t-1}else if("button"in e){var t=e.button;if(t===1)return 4;if(t===2)return 2;if(t>=0)return 1<<t}}return 0}gs.buttons=p5;function m5(e){return e.target||e.srcElement||window}gs.element=m5;function d5(e){return typeof e=="object"&&"pageX"in e?e.pageX:0}gs.x=d5;function f5(e){return typeof e=="object"&&"pageY"in e?e.pageY:0}gs.y=f5;var fi=gs;var a_=h5;function h5(e,t){t||(t=e,e=window);var n=0,o=0,r=0,i={shift:!1,alt:!1,control:!1,meta:!1},s=!1;function l(ge){var Fe=!1;return"altKey"in ge&&(Fe=Fe||ge.altKey!==i.alt,i.alt=!!ge.altKey),"shiftKey"in ge&&(Fe=Fe||ge.shiftKey!==i.shift,i.shift=!!ge.shiftKey),"ctrlKey"in ge&&(Fe=Fe||ge.ctrlKey!==i.control,i.control=!!ge.ctrlKey),"metaKey"in ge&&(Fe=Fe||ge.metaKey!==i.meta,i.meta=!!ge.metaKey),Fe}function m(ge,Fe){var Qe=fi.x(Fe),Ze=fi.y(Fe);"buttons"in Fe&&(ge=Fe.buttons|0),(ge!==n||Qe!==o||Ze!==r||l(Fe))&&(n=ge|0,o=Qe||0,r=Ze||0,t&&t(n,o,r,i))}function d(ge){m(0,ge)}function y(){(n||o||r||i.shift||i.alt||i.meta||i.control)&&(o=r=0,n=0,i.shift=i.alt=i.control=i.meta=!1,t&&t(0,0,0,i))}function D(ge){l(ge)&&t&&t(n,o,r,i)}function B(ge){fi.buttons(ge)===0?m(0,ge):m(n,ge)}function O(ge){m(n|fi.buttons(ge),ge)}function K(ge){m(n&~fi.buttons(ge),ge)}function X(){s||(s=!0,e.addEventListener("mousemove",B),e.addEventListener("mousedown",O),e.addEventListener("mouseup",K),e.addEventListener("mouseleave",d),e.addEventListener("mouseenter",d),e.addEventListener("mouseout",d),e.addEventListener("mouseover",d),e.addEventListener("blur",y),e.addEventListener("keyup",D),e.addEventListener("keydown",D),e.addEventListener("keypress",D),e!==window&&(window.addEventListener("blur",y),window.addEventListener("keyup",D),window.addEventListener("keydown",D),window.addEventListener("keypress",D)))}function pe(){s&&(s=!1,e.removeEventListener("mousemove",B),e.removeEventListener("mousedown",O),e.removeEventListener("mouseup",K),e.removeEventListener("mouseleave",d),e.removeEventListener("mouseenter",d),e.removeEventListener("mouseout",d),e.removeEventListener("mouseover",d),e.removeEventListener("blur",y),e.removeEventListener("keyup",D),e.removeEventListener("keydown",D),e.removeEventListener("keypress",D),e!==window&&(window.removeEventListener("blur",y),window.removeEventListener("keyup",D),window.removeEventListener("keydown",D),window.removeEventListener("keypress",D)))}X();var Re={element:e};return Object.defineProperties(Re,{enabled:{get:function(){return s},set:function(ge){ge?X():pe()},enumerable:!0},buttons:{get:function(){return n},enumerable:!0},x:{get:function(){return o},enumerable:!0},y:{get:function(){return r},enumerable:!0},mods:{get:function(){return i},enumerable:!0}}),Re}u();var s_=us(i_(),1),Ap=class{constructor({numBins:t=4,cutoff:n=2,smooth:o=.4,max:r=15,scale:i=10,isDrawing:s=!1,parentEl:l=document.body}){this.vol=0,this.scale=i,this.max=r,this.cutoff=n,this.smooth=o,this.setBins(t),this.beat={holdFrames:20,threshold:40,_cutoff:0,decay:.98,_framesSinceBeat:0},this.onBeat=()=>{},this.canvas=document.createElement("canvas"),this.canvas.width=100,this.canvas.height=80,this.canvas.style.width="100px",this.canvas.style.height="80px",this.canvas.style.position="absolute",this.canvas.style.right="0px",this.canvas.style.bottom="0px",l.appendChild(this.canvas),this.isDrawing=s,this.ctx=this.canvas.getContext("2d"),this.ctx.fillStyle="#DFFFFF",this.ctx.strokeStyle="#0ff",this.ctx.lineWidth=.5,window.navigator.mediaDevices&&window.navigator.mediaDevices.getUserMedia({video:!1,audio:!0}).then(m=>{this.stream=m,this.context=new AudioContext;let d=this.context.createMediaStreamSource(m);this.meyda=s_.default.createMeydaAnalyzer({audioContext:this.context,source:d,featureExtractors:["loudness"]})}).catch(m=>console.log("ERROR",m))}detectBeat(t){t>this.beat._cutoff&&t>this.beat.threshold?(this.onBeat(),this.beat._cutoff=t*1.2,this.beat._framesSinceBeat=0):this.beat._framesSinceBeat<=this.beat.holdFrames?this.beat._framesSinceBeat++:(this.beat._cutoff*=this.beat.decay,this.beat._cutoff=Math.max(this.beat._cutoff,this.beat.threshold))}tick(){if(this.meyda){var t=this.meyda.get();if(t&&t!==null){this.vol=t.loudness.total,this.detectBeat(this.vol);let n=(r,i)=>r+i,o=Math.floor(t.loudness.specific.length/this.bins.length);this.prevBins=this.bins.slice(0),this.bins=this.bins.map((r,i)=>t.loudness.specific.slice(i*o,(i+1)*o).reduce(n)).map((r,i)=>r*(1-this.settings[i].smooth)+this.prevBins[i]*this.settings[i].smooth),this.fft=this.bins.map((r,i)=>Math.max(0,(r-this.settings[i].cutoff)/this.settings[i].scale)),this.isDrawing&&this.draw()}}}setCutoff(t){this.cutoff=t,this.settings=this.settings.map(n=>(n.cutoff=t,n))}setSmooth(t){this.smooth=t,this.settings=this.settings.map(n=>(n.smooth=t,n))}setBins(t){this.bins=Array(t).fill(0),this.prevBins=Array(t).fill(0),this.fft=Array(t).fill(0),this.settings=Array(t).fill(0).map(()=>({cutoff:this.cutoff,scale:this.scale,smooth:this.smooth})),this.bins.forEach((n,o)=>{window["a"+o]=(r=1,i=0)=>()=>a.fft[o]*r+i})}setScale(t){this.scale=t,this.settings=this.settings.map(n=>(n.scale=t,n))}setMax(t){this.max=t,console.log("set max is deprecated")}hide(){this.isDrawing=!1,this.canvas.style.display="none"}show(){this.isDrawing=!0,this.canvas.style.display="block"}draw(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);var t=this.canvas.width/this.bins.length,n=this.canvas.height/(this.max*2);this.bins.forEach((o,r)=>{var i=o*n;this.ctx.fillRect(r*t,this.canvas.height-i,t,i);var s=this.canvas.height-n*this.settings[r].cutoff;this.ctx.beginPath(),this.ctx.moveTo(r*t,s),this.ctx.lineTo((r+1)*t,s),this.ctx.stroke();var l=this.canvas.height-n*(this.settings[r].scale+this.settings[r].cutoff);this.ctx.beginPath(),this.ctx.moveTo(r*t,l),this.ctx.lineTo((r+1)*t,l),this.ctx.stroke()})}},l_=Ap;u();var Ep=class{constructor(t){this.mediaSource=new MediaSource,this.stream=t,this.output=document.createElement("video"),this.output.autoplay=!0,this.output.loop=!0;let n=this;this.mediaSource.addEventListener("sourceopen",()=>{console.log("MediaSource opened"),n.sourceBuffer=n.mediaSource.addSourceBuffer('video/webm; codecs="vp8"'),console.log("Source buffer: ",sourceBuffer)})}start(){let t={mimeType:"video/webm;codecs=vp9"};this.recordedBlobs=[];try{this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(n){console.log("Unable to create MediaRecorder with options Object: ",n);try{t={mimeType:"video/webm,codecs=vp9"},this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(o){console.log("Unable to create MediaRecorder with options Object: ",o);try{t="video/vp8",this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(r){alert(`MediaRecorder is not supported by this browser.

Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.`),console.error("Exception while creating MediaRecorder:",r);return}}}console.log("Created MediaRecorder",this.mediaRecorder,"with options",t),this.mediaRecorder.onstop=this._handleStop.bind(this),this.mediaRecorder.ondataavailable=this._handleDataAvailable.bind(this),this.mediaRecorder.start(100),console.log("MediaRecorder started",this.mediaRecorder)}stop(){this.mediaRecorder.stop()}_handleStop(){let t=new Blob(this.recordedBlobs,{type:this.mediaRecorder.mimeType}),n=window.URL.createObjectURL(t);this.output.src=n;let o=document.createElement("a");o.style.display="none",o.href=n;let r=new Date;o.download=`hydra-${r.getFullYear()}-${r.getMonth()+1}-${r.getDate()}-${r.getHours()}.${r.getMinutes()}.${r.getSeconds()}.webm`,document.body.appendChild(o),o.click(),setTimeout(()=>{document.body.removeChild(o),window.URL.revokeObjectURL(n)},300)}_handleDataAvailable(t){t.data&&t.data.size>0&&this.recordedBlobs.push(t.data)}},c_=Ep;u();u();var zl={linear:function(e){return e},easeInQuad:function(e){return e*e},easeOutQuad:function(e){return e*(2-e)},easeInOutQuad:function(e){return e<.5?2*e*e:-1+(4-2*e)*e},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return--e*e*e+1},easeInOutCubic:function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return 1- --e*e*e*e},easeInOutQuart:function(e){return e<.5?8*e*e*e*e:1-8*--e*e*e*e},easeInQuint:function(e){return e*e*e*e*e},easeOutQuint:function(e){return 1+--e*e*e*e*e},easeInOutQuint:function(e){return e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e},sin:function(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}};var _5=(e,t,n,o,r)=>(e-t)*(r-o)/(n-t)+o,Pp=(e,t)=>(e%t+t)%t,Vl={init:()=>{Array.prototype.fast=function(e=1){return this._speed=e,this},Array.prototype.smooth=function(e=1){return this._smooth=e,this},Array.prototype.ease=function(e="linear"){return typeof e=="function"?(this._smooth=1,this._ease=e):zl[e]&&(this._smooth=1,this._ease=zl[e]),this},Array.prototype.offset=function(e=.5){return this._offset=e%1,this},Array.prototype.fit=function(e=0,t=1){let n=Math.min(...this),o=Math.max(...this);var r=this.map(i=>_5(i,n,o,e,t));return r._speed=this._speed,r._smooth=this._smooth,r._ease=this._ease,r}},getValue:(e=[])=>({time:t,bpm:n})=>{let o=e._speed?e._speed:1,r=e._smooth?e._smooth:0,i=t*o*(n/60)+(e._offset||0);if(r!==0){let s=e._ease?e._ease:zl.linear,l=i-r/2,m=e[Math.floor(Pp(l,e.length))],d=e[Math.floor(Pp(l+1,e.length))],y=Math.min(Pp(l,1)/r,1);return s(y)*(d-m)+m}else{let s=e[Math.floor(i%e.length)];return e[Math.floor(i%e.length)]}}};u();u();var u_=e=>{var t="",n=r(t),o=(i,s)=>{t+=`
      var ${i} = ${s}
    `,n=r(t)};return{addToContext:o,eval:i=>n.eval(i)};function r(i){globalThis.eval(i);var s=function(l){globalThis.eval(l)};return{eval:s}}};var Fp=class{constructor(t,n,o=[]){this.makeGlobal=n,this.sandbox=u_(t),this.parent=t;var r=Object.keys(t);r.forEach(i=>this.add(i)),this.userProps=o}add(t){this.makeGlobal&&(window[t]=this.parent[t])}set(t,n){this.makeGlobal&&(window[t]=n),this.parent[t]=n}tick(){this.makeGlobal&&this.userProps.forEach(t=>{this.parent[t]=window[t]})}eval(t){this.sandbox.eval(t)}},p_=Fp;u();u();u();u();var g5={float:{vec4:{name:"sum",args:[[1,1,1,1]]},vec2:{name:"sum",args:[[1,1]]}}};var Op=e=>(e=e.toString(),e.indexOf(".")<0&&(e+="."),e);function Hp(e,t,n){let o=e.transform.inputs,r=e.userArgs,{generators:i}=e.synth,{src:s}=i;return o.map((l,m)=>{let d={value:l.default,type:l.type,isUniform:!1,name:l.name,vecLen:0};if(d.type==="float"&&(d.value=Op(l.default)),l.type.startsWith("vec"))try{d.vecLen=Number.parseInt(l.type.substr(3))}catch{console.log(`Error determining length of vector input type ${l.type} (${l.name})`)}if(r.length>m){if(d.value=r[m],d.type==="vec4"&&!(d.value.type==="GlslSource"||d.value.getTexture))throw new Error("Arguments must be a texture or GlslSource");typeof r[m]=="function"?(d.value=(B,O,K)=>{try{let X=r[m](O);return typeof X=="number"?X:(console.warn("function does not return a number",r[m]),l.default)}catch(X){return console.warn("ERROR",X),l.default}},d.isUniform=!0):r[m].constructor===Array&&(d.value=(B,O,K)=>Vl.getValue(r[m])(O),d.isUniform=!0)}if(!(t<0)){if(d.value&&d.value.transforms){let B=d.value.transforms[d.value.transforms.length-1];if(B.transform.glsl_return_type!==l.type){let O=g5[l.type];if(typeof O<"u"){let K=O[B.transform.glsl_return_type];if(typeof K<"u"){let{name:X,args:pe}=K;d.value=d.value[X](...pe)}}}d.isUniform=!1}else if(d.type==="float"&&typeof d.value=="number")d.value=Op(d.value);else if(d.type.startsWith("vec")&&typeof d.value=="object"&&Array.isArray(d.value))d.isUniform=!1,d.value=`${d.type}(${d.value.map(Op).join(", ")})`;else if(l.type==="sampler2D"){var y=d.value;d.value=()=>y.getTexture(),d.isUniform=!0}else if(d.value.getTexture&&l.type==="vec4"){var D=d.value;d.value=s(D),d.isUniform=!1}d.isUniform&&(d.name+=t)}return d})}function m_(e){var t={uniforms:[],glslFunctions:[],fragColor:""},n=d_(e,t)("c","st");t.fragColor=n;let o={};return t.uniforms.forEach(r=>o[r.name]=r),t.uniforms=Object.values(o),t}function Ip(e,t){return`${e}_i${t}`}function d_(e,t){var n=(o,r)=>"";return e.forEach((o,r)=>{let i=Hp(o,t.uniforms.length);i.forEach(l=>{l.isUniform&&t.uniforms.push(l)}),b5(o,t.glslFunctions)||t.glslFunctions.push(o);var s=n;o.transform.type==="src"?n=(l,m)=>`${bs(i,t)(`${l}${r}`,m)}
         vec4 ${l} = ${ys(`${l}${r}`,m,o.name,i)};`:o.transform.type==="color"?n=(l,m)=>`${bs(i,t)(`${l}${r}`,m)}
         ${s(l,m)}
         ${l} = ${ys(`${l}${r}`,`${l}`,o.name,i)};`:o.transform.type==="coord"?n=(l,m)=>`${bs(i,t)(`${l}${r}`,m)}
         ${m} = ${ys(`${l}${r}`,`${m}`,o.name,i)};
         ${s(l,m)}`:o.transform.type==="combine"?n=(l,m)=>`${bs(i,t)(`${l}${r}`,m)}
         ${s(l,m)}
         ${l} = ${ys(`${l}${r}`,`${l}`,o.name,i)};`:o.transform.type==="combineCoord"&&(n=(l,m)=>`${bs(i,t)(`${l}${r}`,m)}
         ${m} = ${ys(`${l}${r}`,`${m}`,o.name,i)};
         ${s(l,m)}`)}),n}function bs(e,t){let n=(r,i)=>"";var o=n;return e.forEach((r,i)=>{r.value.transforms&&(o=n,n=(s,l)=>{let m=Ip(s,i),d=Ip(`${l}_${s}`,i);return`vec2 ${d} = ${l};${o(s,l)}
         ${d_(r.value.transforms,t)(m,d)}`})}),n}function ys(e,t,n,o){let r=o.map((i,s)=>i.isUniform?i.name:i.value&&i.value.transforms?Ip(e,s):i.value).reduce((i,s)=>`${i}, ${s}`,"");return`${n}(${t}${r})`}function b5(e,t){for(var n=0;n<t.length;n++)if(e.name==t[n].name)return!0;return!1}u();var f_={_luminance:{type:"util",glsl:`float _luminance(vec3 rgb){
      const vec3 W = vec3(0.2125, 0.7154, 0.0721);
      return dot(rgb, W);
    }`},_noise:{type:"util",glsl:`
    //	Simplex 3D Noise
    //	by Ian McEwan, Ashima Arts
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float _noise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

  // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

  // Permutations
    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients
  // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

  //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

  // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }
    `},_rgbToHsv:{type:"util",glsl:`vec3 _rgbToHsv(vec3 c){
            vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
            vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
            vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

            float d = q.x - min(q.w, q.y);
            float e = 1.0e-10;
            return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }`},_hsvToRgb:{type:"util",glsl:`vec3 _hsvToRgb(vec3 c){
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }`}};var xs=function(e){return this.transforms=[],this.transforms.push(e),this.defaultOutput=e.defaultOutput,this.synth=e.synth,this.type="GlslSource",this.defaultUniforms=e.defaultUniforms,this};xs.prototype.addTransform=function(e){this.transforms.push(e)};xs.prototype.out=function(e){var t=e||this.defaultOutput;if(t)try{var n=this.glsl(t);this.synth.currentFunctions=[],t.render(n)}catch(o){console.warn("shader could not compile",o)}};xs.prototype.glsl=function(){var e=this,t=[],n=[];return this.transforms.forEach(o=>{o.transform.type==="renderpass"?console.warn("no support for renderpass"):n.push(o)}),n.length>0&&t.push(this.compile(n)),t};xs.prototype.compile=function(e){var t=m_(e,this.synth),n={};t.uniforms.forEach(r=>{n[r.name]=r.value});var o=`
  precision ${this.defaultOutput.precision} float;
  ${Object.values(t.uniforms).map(r=>{let i=r.type;return r.type==="texture"&&(i="sampler2D"),`
      uniform ${i} ${r.name};`}).join("")}
  uniform float time;
  uniform vec2 resolution;
  varying vec2 uv;
  uniform sampler2D prevBuffer;

  ${Object.values(f_).map(r=>`
            ${r.glsl}
          `).join("")}

  ${t.glslFunctions.map(r=>`
            ${r.transform.glsl}
          `).join("")}

  void main () {
    vec2 st = gl_FragCoord.xy/resolution.xy;

    ${t.fragColor}
    gl_FragColor = c;
  }
  `;return{frag:o,uniforms:Object.assign({},this.defaultUniforms,n)}};var h_=xs;u();var __=()=>[{name:"noise",type:"src",inputs:[{type:"float",name:"scale",default:10},{type:"float",name:"offset",default:.1}],glsl:"   return vec4(vec3(_noise(vec3(_st*scale, offset*time))), 1.0);"},{name:"voronoi",type:"src",inputs:[{type:"float",name:"scale",default:5},{type:"float",name:"speed",default:.3},{type:"float",name:"blending",default:.3}],glsl:`   vec3 color = vec3(.0);
   // Scale
   _st *= scale;
   // Tile the space
   vec2 i_st = floor(_st);
   vec2 f_st = fract(_st);
   float m_dist = 10.;  // minimun distance
   vec2 m_point;        // minimum point
   for (int j=-1; j<=1; j++ ) {
   for (int i=-1; i<=1; i++ ) {
   vec2 neighbor = vec2(float(i),float(j));
   vec2 p = i_st + neighbor;
   vec2 point = fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
   point = 0.5 + 0.5*sin(time*speed + 6.2831*point);
   vec2 diff = neighbor + point - f_st;
   float dist = length(diff);
   if( dist < m_dist ) {
   m_dist = dist;
   m_point = point;
   }
   }
   }
   // Assign a color using the closest point position
   color += dot(m_point,vec2(.3,.6));
   color *= 1.0 - blending*m_dist;
   return vec4(color, 1.0);`},{name:"osc",type:"src",inputs:[{type:"float",name:"frequency",default:60},{type:"float",name:"sync",default:.1},{type:"float",name:"offset",default:0}],glsl:`   vec2 st = _st;
   float r = sin((st.x-offset/frequency+time*sync)*frequency)*0.5  + 0.5;
   float g = sin((st.x+time*sync)*frequency)*0.5 + 0.5;
   float b = sin((st.x+offset/frequency+time*sync)*frequency)*0.5  + 0.5;
   return vec4(r, g, b, 1.0);`},{name:"shape",type:"src",inputs:[{type:"float",name:"sides",default:3},{type:"float",name:"radius",default:.3},{type:"float",name:"smoothing",default:.01}],glsl:`   vec2 st = _st * 2. - 1.;
   // Angle and radius from the current pixel
   float a = atan(st.x,st.y)+3.1416;
   float r = (2.*3.1416)/sides;
   float d = cos(floor(.5+a/r)*r-a)*length(st);
   return vec4(vec3(1.0-smoothstep(radius,radius + smoothing + 0.0000001,d)), 1.0);`},{name:"gradient",type:"src",inputs:[{type:"float",name:"speed",default:0}],glsl:"   return vec4(_st, sin(time*speed), 1.0);"},{name:"src",type:"src",inputs:[{type:"sampler2D",name:"tex",default:NaN}],glsl:`   //  vec2 uv = gl_FragCoord.xy/vec2(1280., 720.);
   return texture2D(tex, fract(_st));`},{name:"solid",type:"src",inputs:[{type:"float",name:"r",default:0},{type:"float",name:"g",default:0},{type:"float",name:"b",default:0},{type:"float",name:"a",default:1}],glsl:"   return vec4(r, g, b, a);"},{name:"rotate",type:"coord",inputs:[{type:"float",name:"angle",default:10},{type:"float",name:"speed",default:0}],glsl:`   vec2 xy = _st - vec2(0.5);
   float ang = angle + speed *time;
   xy = mat2(cos(ang),-sin(ang), sin(ang),cos(ang))*xy;
   xy += 0.5;
   return xy;`},{name:"scale",type:"coord",inputs:[{type:"float",name:"amount",default:1.5},{type:"float",name:"xMult",default:1},{type:"float",name:"yMult",default:1},{type:"float",name:"offsetX",default:.5},{type:"float",name:"offsetY",default:.5}],glsl:`   vec2 xy = _st - vec2(offsetX, offsetY);
   xy*=(1.0/vec2(amount*xMult, amount*yMult));
   xy+=vec2(offsetX, offsetY);
   return xy;
   `},{name:"pixelate",type:"coord",inputs:[{type:"float",name:"pixelX",default:20},{type:"float",name:"pixelY",default:20}],glsl:`   vec2 xy = vec2(pixelX, pixelY);
   return (floor(_st * xy) + 0.5)/xy;`},{name:"posterize",type:"color",inputs:[{type:"float",name:"bins",default:3},{type:"float",name:"gamma",default:.6}],glsl:`   vec4 c2 = pow(_c0, vec4(gamma));
   c2 *= vec4(bins);
   c2 = floor(c2);
   c2/= vec4(bins);
   c2 = pow(c2, vec4(1.0/gamma));
   return vec4(c2.xyz, _c0.a);`},{name:"shift",type:"color",inputs:[{type:"float",name:"r",default:.5},{type:"float",name:"g",default:0},{type:"float",name:"b",default:0},{type:"float",name:"a",default:0}],glsl:`   vec4 c2 = vec4(_c0);
   c2.r += fract(r);
   c2.g += fract(g);
   c2.b += fract(b);
   c2.a += fract(a);
   return vec4(c2.rgba);`},{name:"repeat",type:"coord",inputs:[{type:"float",name:"repeatX",default:3},{type:"float",name:"repeatY",default:3},{type:"float",name:"offsetX",default:0},{type:"float",name:"offsetY",default:0}],glsl:`   vec2 st = _st * vec2(repeatX, repeatY);
   st.x += step(1., mod(st.y,2.0)) * offsetX;
   st.y += step(1., mod(st.x,2.0)) * offsetY;
   return fract(st);`},{name:"modulateRepeat",type:"combineCoord",inputs:[{type:"float",name:"repeatX",default:3},{type:"float",name:"repeatY",default:3},{type:"float",name:"offsetX",default:.5},{type:"float",name:"offsetY",default:.5}],glsl:`   vec2 st = _st * vec2(repeatX, repeatY);
   st.x += step(1., mod(st.y,2.0)) + _c0.r * offsetX;
   st.y += step(1., mod(st.x,2.0)) + _c0.g * offsetY;
   return fract(st);`},{name:"repeatX",type:"coord",inputs:[{type:"float",name:"reps",default:3},{type:"float",name:"offset",default:0}],glsl:`   vec2 st = _st * vec2(reps, 1.0);
   //  float f =  mod(_st.y,2.0);
   st.y += step(1., mod(st.x,2.0))* offset;
   return fract(st);`},{name:"modulateRepeatX",type:"combineCoord",inputs:[{type:"float",name:"reps",default:3},{type:"float",name:"offset",default:.5}],glsl:`   vec2 st = _st * vec2(reps, 1.0);
   //  float f =  mod(_st.y,2.0);
   st.y += step(1., mod(st.x,2.0)) + _c0.r * offset;
   return fract(st);`},{name:"repeatY",type:"coord",inputs:[{type:"float",name:"reps",default:3},{type:"float",name:"offset",default:0}],glsl:`   vec2 st = _st * vec2(1.0, reps);
   //  float f =  mod(_st.y,2.0);
   st.x += step(1., mod(st.y,2.0))* offset;
   return fract(st);`},{name:"modulateRepeatY",type:"combineCoord",inputs:[{type:"float",name:"reps",default:3},{type:"float",name:"offset",default:.5}],glsl:`   vec2 st = _st * vec2(reps, 1.0);
   //  float f =  mod(_st.y,2.0);
   st.x += step(1., mod(st.y,2.0)) + _c0.r * offset;
   return fract(st);`},{name:"kaleid",type:"coord",inputs:[{type:"float",name:"nSides",default:4}],glsl:`   vec2 st = _st;
   st -= 0.5;
   float r = length(st);
   float a = atan(st.y, st.x);
   float pi = 2.*3.1416;
   a = mod(a,pi/nSides);
   a = abs(a-pi/nSides/2.);
   return r*vec2(cos(a), sin(a));`},{name:"modulateKaleid",type:"combineCoord",inputs:[{type:"float",name:"nSides",default:4}],glsl:`   vec2 st = _st - 0.5;
   float r = length(st);
   float a = atan(st.y, st.x);
   float pi = 2.*3.1416;
   a = mod(a,pi/nSides);
   a = abs(a-pi/nSides/2.);
   return (_c0.r+r)*vec2(cos(a), sin(a));`},{name:"scroll",type:"coord",inputs:[{type:"float",name:"scrollX",default:.5},{type:"float",name:"scrollY",default:.5},{type:"float",name:"speedX",default:0},{type:"float",name:"speedY",default:0}],glsl:`
   _st.x += scrollX + time*speedX;
   _st.y += scrollY + time*speedY;
   return fract(_st);`},{name:"scrollX",type:"coord",inputs:[{type:"float",name:"scrollX",default:.5},{type:"float",name:"speed",default:0}],glsl:`   _st.x += scrollX + time*speed;
   return fract(_st);`},{name:"modulateScrollX",type:"combineCoord",inputs:[{type:"float",name:"scrollX",default:.5},{type:"float",name:"speed",default:0}],glsl:`   _st.x += _c0.r*scrollX + time*speed;
   return fract(_st);`},{name:"scrollY",type:"coord",inputs:[{type:"float",name:"scrollY",default:.5},{type:"float",name:"speed",default:0}],glsl:`   _st.y += scrollY + time*speed;
   return fract(_st);`},{name:"modulateScrollY",type:"combineCoord",inputs:[{type:"float",name:"scrollY",default:.5},{type:"float",name:"speed",default:0}],glsl:`   _st.y += _c0.r*scrollY + time*speed;
   return fract(_st);`},{name:"add",type:"combine",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return (_c0+_c1)*amount + _c0*(1.0-amount);"},{name:"sub",type:"combine",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return (_c0-_c1)*amount + _c0*(1.0-amount);"},{name:"layer",type:"combine",inputs:[],glsl:"   return vec4(mix(_c0.rgb, _c1.rgb, _c1.a), clamp(_c0.a + _c1.a, 0.0, 1.0));"},{name:"blend",type:"combine",inputs:[{type:"float",name:"amount",default:.5}],glsl:"   return _c0*(1.0-amount)+_c1*amount;"},{name:"mult",type:"combine",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return _c0*(1.0-amount)+(_c0*_c1)*amount;"},{name:"diff",type:"combine",inputs:[],glsl:"   return vec4(abs(_c0.rgb-_c1.rgb), max(_c0.a, _c1.a));"},{name:"modulate",type:"combineCoord",inputs:[{type:"float",name:"amount",default:.1}],glsl:`   //  return fract(st+(_c0.xy-0.5)*amount);
   return _st + _c0.xy*amount;`},{name:"modulateScale",type:"combineCoord",inputs:[{type:"float",name:"multiple",default:1},{type:"float",name:"offset",default:1}],glsl:`   vec2 xy = _st - vec2(0.5);
   xy*=(1.0/vec2(offset + multiple*_c0.r, offset + multiple*_c0.g));
   xy+=vec2(0.5);
   return xy;`},{name:"modulatePixelate",type:"combineCoord",inputs:[{type:"float",name:"multiple",default:10},{type:"float",name:"offset",default:3}],glsl:`   vec2 xy = vec2(offset + _c0.x*multiple, offset + _c0.y*multiple);
   return (floor(_st * xy) + 0.5)/xy;`},{name:"modulateRotate",type:"combineCoord",inputs:[{type:"float",name:"multiple",default:1},{type:"float",name:"offset",default:0}],glsl:`   vec2 xy = _st - vec2(0.5);
   float angle = offset + _c0.x * multiple;
   xy = mat2(cos(angle),-sin(angle), sin(angle),cos(angle))*xy;
   xy += 0.5;
   return xy;`},{name:"modulateHue",type:"combineCoord",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return _st + (vec2(_c0.g - _c0.r, _c0.b - _c0.g) * amount * 1.0/resolution);"},{name:"invert",type:"color",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return vec4((1.0-_c0.rgb)*amount + _c0.rgb*(1.0-amount), _c0.a);"},{name:"contrast",type:"color",inputs:[{type:"float",name:"amount",default:1.6}],glsl:`   vec4 c = (_c0-vec4(0.5))*vec4(amount) + vec4(0.5);
   return vec4(c.rgb, _c0.a);`},{name:"brightness",type:"color",inputs:[{type:"float",name:"amount",default:.4}],glsl:"   return vec4(_c0.rgb + vec3(amount), _c0.a);"},{name:"mask",type:"combine",inputs:[],glsl:`   float a = _luminance(_c1.rgb);
  return vec4(_c0.rgb*a, a*_c0.a);`},{name:"luma",type:"color",inputs:[{type:"float",name:"threshold",default:.5},{type:"float",name:"tolerance",default:.1}],glsl:`   float a = smoothstep(threshold-(tolerance+0.0000001), threshold+(tolerance+0.0000001), _luminance(_c0.rgb));
   return vec4(_c0.rgb*a, a);`},{name:"thresh",type:"color",inputs:[{type:"float",name:"threshold",default:.5},{type:"float",name:"tolerance",default:.04}],glsl:"   return vec4(vec3(smoothstep(threshold-(tolerance+0.0000001), threshold+(tolerance+0.0000001), _luminance(_c0.rgb))), _c0.a);"},{name:"color",type:"color",inputs:[{type:"float",name:"r",default:1},{type:"float",name:"g",default:1},{type:"float",name:"b",default:1},{type:"float",name:"a",default:1}],glsl:`   vec4 c = vec4(r, g, b, a);
   vec4 pos = step(0.0, c); // detect whether negative
   // if > 0, return r * _c0
   // if < 0 return (1.0-r) * _c0
   return vec4(mix((1.0-_c0)*abs(c), c*_c0, pos));`},{name:"saturate",type:"color",inputs:[{type:"float",name:"amount",default:2}],glsl:`   const vec3 W = vec3(0.2125, 0.7154, 0.0721);
   vec3 intensity = vec3(dot(_c0.rgb, W));
   return vec4(mix(intensity, _c0.rgb, amount), _c0.a);`},{name:"hue",type:"color",inputs:[{type:"float",name:"hue",default:.4}],glsl:`   vec3 c = _rgbToHsv(_c0.rgb);
   c.r += hue;
   //  c.r = fract(c.r);
   return vec4(_hsvToRgb(c), _c0.a);`},{name:"colorama",type:"color",inputs:[{type:"float",name:"amount",default:.005}],glsl:`   vec3 c = _rgbToHsv(_c0.rgb);
   c += vec3(amount);
   c = _hsvToRgb(c);
   c = fract(c);
   return vec4(c, _c0.a);`},{name:"prev",type:"src",inputs:[],glsl:"   return texture2D(prevBuffer, fract(_st));"},{name:"sum",type:"color",inputs:[{type:"vec4",name:"scale",default:1}],glsl:`   vec4 v = _c0 * s;
   return v.r + v.g + v.b + v.a;
   }
   float sum(vec2 _st, vec4 s) { // vec4 is not a typo, because argument type is not overloaded
   vec2 v = _st.xy * s.xy;
   return v.x + v.y;`},{name:"r",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.r * scale + offset);"},{name:"g",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.g * scale + offset);"},{name:"b",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.b * scale + offset);"},{name:"a",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.a * scale + offset);"}];var Bp=class{constructor({defaultUniforms:t,defaultOutput:n,extendTransforms:o=[],changeListener:r=(()=>{})}={}){this.defaultOutput=n,this.defaultUniforms=t,this.changeListener=r,this.extendTransforms=o,this.generators={},this.init()}init(){let t=__();return this.glslTransforms={},this.generators=Object.entries(this.generators).reduce((n,[o,r])=>(this.changeListener({type:"remove",synth:this,method:o}),n),{}),this.sourceClass=class extends h_{},Array.isArray(this.extendTransforms)?t.concat(this.extendTransforms):typeof this.extendTransforms=="object"&&this.extendTransforms.type&&t.push(this.extendTransforms),t.map(n=>this.setFunction(n))}_addMethod(t,n){let o=this;if(this.glslTransforms[t]=n,n.type==="src"){let r=(...i)=>new this.sourceClass({name:t,transform:n,userArgs:i,defaultOutput:this.defaultOutput,defaultUniforms:this.defaultUniforms,synth:o});return this.generators[t]=r,this.changeListener({type:"add",synth:this,method:t}),r}else this.sourceClass.prototype[t]=function(...r){return this.transforms.push({name:t,transform:n,userArgs:r,synth:o}),this}}setFunction(t){var n=y5(t);n&&this._addMethod(t.name,n)}},g_={src:{returnType:"vec4",args:[{type:"vec2",name:"_st"}]},coord:{returnType:"vec2",args:[{type:"vec2",name:"_st"}]},color:{returnType:"vec4",args:[{type:"vec4",name:"_c0"}]},combine:{returnType:"vec4",args:[{type:"vec4",name:"_c0"},{type:"vec4",name:"_c1"}]},combineCoord:{returnType:"vec2",args:[{type:"vec2",name:"_st"},{type:"vec4",name:"_c0"}]}};function y5(e){let t=g_[e.type];if(t){let n=t.args.concat(e.inputs),o=n.map(i=>`${i.type} ${i.name}`).join(", "),r=`
  ${t.returnType} ${e.name}(${o}) {
      ${e.glsl}
  }
`;return e.inputs=n.slice(1),Object.assign({},e,{glsl:r})}else console.warn(`type ${e.type} not recognized`,e,g_)}var b_=Bp;var v_=us(y_(),1),x5=a_(),Wp=class{constructor({pb:t=null,width:n=1280,height:o=720,numSources:r=4,numOutputs:i=4,makeGlobal:s=!0,autoLoop:l=!0,detectAudio:m=!0,enableStreamCapture:d=!0,canvas:y,precision:D,extendTransforms:B={}}={}){if(Vl.init(),this.pb=t,this.width=n,this.height=o,this.renderAll=!1,this.detectAudio=m,this._initCanvas(y),this.synth={time:0,bpm:30,width:this.width,height:this.height,fps:void 0,stats:{fps:0},speed:1,mouse:x5,render:this._render.bind(this),setResolution:this.setResolution.bind(this),update:K=>{},afterUpdate:K=>{},hush:this.hush.bind(this),tick:this.tick.bind(this)},s&&(window.loadScript=this.loadScript),this.timeSinceLastUpdate=0,this._time=0,D&&["lowp","mediump","highp"].includes(D.toLowerCase()))this.precision=D.toLowerCase();else{let K=(/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)&&!window.MSStream;this.precision=K?"highp":"mediump"}if(this.extendTransforms=B,this.saveFrame=!1,this.captureStream=null,this.generator=void 0,this._initRegl(),this._initOutputs(i),this._initSources(r),this._generateGlslTransforms(),this.synth.screencap=()=>{this.saveFrame=!0},d)try{this.captureStream=this.canvas.captureStream(25),this.synth.vidRecorder=new c_(this.captureStream)}catch(K){console.warn(`[hydra-synth warning]
new MediaSource() is not currently supported on iOS.`),console.error(K)}m&&this._initAudio(),l&&(0,x_.default)(this.tick.bind(this)).start(),this.sandbox=new p_(this.synth,s,["speed","update","afterUpdate","bpm","fps"])}eval(t){this.sandbox.eval(t)}getScreenImage(t){this.imageCallback=t,this.saveFrame=!0}hush(){this.s.forEach(t=>{t.clear()}),this.o.forEach(t=>{this.synth.solid(0,0,0,0).out(t)}),this.synth.render(this.o[0]),this.sandbox.set("update",t=>{}),this.sandbox.set("afterUpdate",t=>{})}loadScript(t=""){return new Promise((o,r)=>{var i=document.createElement("script");i.onload=function(){console.log(`loaded script ${t}`),o()},i.onerror=s=>{console.log(`error loading script ${t}`,"log-error"),o()},i.src=t,document.head.appendChild(i)})}setResolution(t,n){this.canvas.width=t,this.canvas.height=n,this.width=t,this.height=n,this.sandbox.set("width",t),this.sandbox.set("height",n),console.log(this.width),this.o.forEach(o=>{o.resize(t,n)}),this.s.forEach(o=>{o.resize(t,n)}),this.regl._refresh(),console.log(this.canvas.width)}canvasToImage(t){let n=document.createElement("a");n.style.display="none";let o=new Date;n.download=`hydra-${o.getFullYear()}-${o.getMonth()+1}-${o.getDate()}-${o.getHours()}.${o.getMinutes()}.${o.getSeconds()}.png`,document.body.appendChild(n);var r=this;this.canvas.toBlob(i=>{r.imageCallback?(r.imageCallback(i),delete r.imageCallback):(n.href=URL.createObjectURL(i),console.log(n.href),n.click())},"image/png"),setTimeout(()=>{document.body.removeChild(n),window.URL.revokeObjectURL(n.href)},300)}_initAudio(){let t=this;this.synth.a=new l_({numBins:4,parentEl:this.canvas.parentNode})}_initCanvas(t){t?(this.canvas=t,this.width=t.width,this.height=t.height):(this.canvas=document.createElement("canvas"),this.canvas.width=this.width,this.canvas.height=this.height,this.canvas.style.width="100%",this.canvas.style.height="100%",this.canvas.style.imageRendering="pixelated",document.body.appendChild(this.canvas))}_initRegl(){this.regl=(0,v_.default)({canvas:this.canvas,pixelRatio:1}),this.regl.clear({color:[0,0,0,1]}),this.renderAll=this.regl({frag:`
      precision ${this.precision} float;
      varying vec2 uv;
      uniform sampler2D tex0;
      uniform sampler2D tex1;
      uniform sampler2D tex2;
      uniform sampler2D tex3;

      void main () {
        vec2 st = vec2(1.0 - uv.x, uv.y);
        st*= vec2(2);
        vec2 q = floor(st).xy*(vec2(2.0, 1.0));
        int quad = int(q.x) + int(q.y);
        st.x += step(1., mod(st.y,2.0));
        st.y += step(1., mod(st.x,2.0));
        st = fract(st);
        if(quad==0){
          gl_FragColor = texture2D(tex0, st);
        } else if(quad==1){
          gl_FragColor = texture2D(tex1, st);
        } else if (quad==2){
          gl_FragColor = texture2D(tex2, st);
        } else {
          gl_FragColor = texture2D(tex3, st);
        }

      }
      `,vert:`
      precision ${this.precision} float;
      attribute vec2 position;
      varying vec2 uv;

      void main () {
        uv = position;
        gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      }`,attributes:{position:[[-2,0],[0,-2],[2,2]]},uniforms:{tex0:this.regl.prop("tex0"),tex1:this.regl.prop("tex1"),tex2:this.regl.prop("tex2"),tex3:this.regl.prop("tex3")},count:3,depth:{enable:!1}}),this.renderFbo=this.regl({frag:`
      precision ${this.precision} float;
      varying vec2 uv;
      uniform vec2 resolution;
      uniform sampler2D tex0;

      void main () {
        gl_FragColor = texture2D(tex0, vec2(1.0 - uv.x, uv.y));
      }
      `,vert:`
      precision ${this.precision} float;
      attribute vec2 position;
      varying vec2 uv;

      void main () {
        uv = position;
        gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      }`,attributes:{position:[[-2,0],[0,-2],[2,2]]},uniforms:{tex0:this.regl.prop("tex0"),resolution:this.regl.prop("resolution")},count:3,depth:{enable:!1}})}_initOutputs(t){let n=this;this.o=Array(t).fill().map((o,r)=>{var i=new Vh({regl:this.regl,width:this.width,height:this.height,precision:this.precision,label:`o${r}`});return i.id=r,n.synth["o"+r]=i,i}),this.output=this.o[0]}_initSources(t){this.s=[];for(var n=0;n<t;n++)this.createSource(n)}createSource(t){let n=new r_({regl:this.regl,pb:this.pb,width:this.width,height:this.height,label:`s${t}`});return this.synth["s"+this.s.length]=n,this.s.push(n),n}_generateGlslTransforms(){var t=this;this.generator=new b_({defaultOutput:this.o[0],defaultUniforms:this.o[0].uniforms,extendTransforms:this.extendTransforms,changeListener:({type:n,method:o,synth:r})=>{n==="add"&&(t.synth[o]=r.generators[o],t.sandbox&&t.sandbox.add(o))}}),this.synth.setFunction=this.generator.setFunction.bind(this.generator)}_render(t){t?(this.output=t,this.isRenderingAll=!1):this.isRenderingAll=!0}tick(t,n){try{if(this.sandbox.tick(),this.detectAudio===!0&&this.synth.a.tick(),this.sandbox.set("time",this.synth.time+=t*.001*this.synth.speed),this.timeSinceLastUpdate+=t,!this.synth.fps||this.timeSinceLastUpdate>=1e3/this.synth.fps){if(this.synth.stats.fps=Math.ceil(1e3/this.timeSinceLastUpdate),this.synth.update)try{this.synth.update(this.timeSinceLastUpdate)}catch(r){console.log(r)}for(let r=0;r<this.s.length;r++)this.s[r].tick(this.synth.time);let o=this.synth.time;for(let r=0;r<this.o.length;r++)this.o[r].tick({time:o,mouse:this.synth.mouse,bpm:this.synth.bpm,resolution:[this.canvas.width,this.canvas.height]});if(this.isRenderingAll?this.renderAll({tex0:this.o[0].getCurrent(),tex1:this.o[1].getCurrent(),tex2:this.o[2].getCurrent(),tex3:this.o[3].getCurrent(),resolution:[this.canvas.width,this.canvas.height]}):this.renderFbo({tex0:this.output.getCurrent(),resolution:[this.canvas.width,this.canvas.height]}),this.synth.afterUpdate)try{this.synth.afterUpdate(this.timeSinceLastUpdate)}catch(r){console.log(r)}this.timeSinceLastUpdate=0}this.saveFrame===!0&&(this.canvasToImage(),this.saveFrame=!1)}catch(o){console.warn("Error during tick():",o)}}},S_=Wp;var vS=us(Mp(),1);u();u();var w_=[{id:"16:9",label:"16\u22369",shortLabel:"Wide",ratio:1.7777777777777777,resolutions:[{id:"16:9-720",label:"720p",width:1280,height:720},{id:"16:9-1080",label:"1080p",width:1920,height:1080},{id:"16:9-1440",label:"1440p",width:2560,height:1440},{id:"16:9-4k",label:"4K",width:3840,height:2160}]},{id:"4:3",label:"4\u22363",shortLabel:"Classic",ratio:1.3333333333333333,resolutions:[{id:"4:3-768",label:"768p",width:1024,height:768},{id:"4:3-1080",label:"1080p",width:1440,height:1080},{id:"4:3-1536",label:"1536p",width:2048,height:1536}]},{id:"9:16",label:"9\u223616",shortLabel:"Story / Reel",ratio:.5625,resolutions:[{id:"9:16-720",label:"720p",width:720,height:1280},{id:"9:16-1080",label:"1080p",width:1080,height:1920},{id:"9:16-1440",label:"1440p",width:1440,height:2560}]}],Gp={enabled:!1,aspectRatio:"16:9",resolutionId:"16:9-1080",videoFit:"contain",cropGuide:!0},T_=new Map(w_.map(e=>[e.id,e]));function Up(e){return T_.get(e)??w_[0]}function v5(e,t){let n=Up(e);return n.resolutions.find(o=>o.id===t)??n.resolutions[0]}function La(e){let t=e?.aspectRatio&&T_.has(e.aspectRatio)?e.aspectRatio:Gp.aspectRatio,n=Up(t),o=n.resolutions.find(l=>l.id===e?.resolutionId)?.id??n.resolutions[0].id,r=e?.videoFit==="cover"?"cover":"contain",i=e?.cropGuide!==!1;return{enabled:e?.enabled===!0,aspectRatio:t,resolutionId:o,videoFit:r,cropGuide:i}}function C_(e){return La(e).enabled===!0}function S5(e){let t=v5(e.aspectRatio,e.resolutionId);return{width:t.width,height:t.height}}function w5(e){return Up(e.aspectRatio).ratio}function T5(e){return w5(e)}function C5(e,t){let n=Math.round(e);return n===1?16/9:n===2?4/3:n===3?9/16:T5(La(t))}function M5(e,t,n){return L5(0,e,t,n)}function L5(e,t,n,o){let r=Math.round(e),i=C5(e,t),s=Math.max(1,n),l=Math.max(1,o);if(r===0){let{width:m,height:d}=S5(La(t)),y=Math.min(1,s/m,l/d);return{width:m*y,height:d*y,aspect:i,usePixelBox:!0}}return{width:s,height:l,aspect:i,usePixelBox:!1}}function M_(e,t){let n=Math.max(.01,e),o=Math.max(.01,t);return n>=o?{w:1,h:o/n}:{w:n/o,h:1}}function L_(e,t,n,o=1){let r=t/Math.max(1,n),{w:i,h:s}=M_(e,r),l=Math.max(.25,o);return{scaleX:l/i,scaleY:l/s}}function zp(e,t,n){let o=t/Math.max(1,n),r=Math.max(.01,e);return o>r?{scaleX:o/r,scaleY:1}:{scaleX:1,scaleY:r/o}}function Vp(e){let t=e.inset??.025,n=M5(e.exportSettings,e.canvasWidth,e.canvasHeight),o=Math.max(1,e.canvasWidth),r=Math.max(1,e.canvasHeight),i,s;if(n.usePixelBox)i=Math.min(1,n.width/o),s=Math.min(1,n.height/r);else{let ge=o/r,Fe=Math.max(.01,n.aspect);ge>Fe?(s=1,i=Fe/ge):(i=1,s=ge/Fe)}let l=Math.max(0,Math.min(.25,t));i=Math.max(.01,i-l*2),s=Math.max(.01,s-l*2);let d=La(e.exportSettings).videoFit??"contain",y=o/r,{w:D,h:B}=M_(e.videoAspect,y),O=d==="cover"?Math.max(i/D,s/B):Math.min(i/D,s/B),K=D*O/2,X=B*O/2,pe=s/2,Re=d==="contain"&&X<pe-1e-6?-pe+X:0;return{safeW:i,safeH:s,contentHalfW:K,contentHalfH:X,contentOffsetY:Re,usePixelBox:n.usePixelBox,targetWidth:n.width,targetHeight:n.height,targetAspect:n.aspect}}u();var Po=[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1}],R_=[0,.5,1].flatMap(e=>[0,.5,1].map(t=>({x:t,y:e}))),wr=9,vs=wr,Nr=64,ka=Nr,A_=8,k5=A_-1,hi=3;var qp=0,jp=2;function ql(){return Po.map(e=>({dest:{...e},src:{...e}}))}function $p(){return Po.map(e=>({...e}))}function R5(){return R_.map(e=>({dest:{...e},src:{...e}}))}var Ss={enabled:!1,points:ql(),mask:$p(),maskPolys:[]};function k_(e,t){let n=typeof e=="number"?e:Number(e);return Number.isFinite(n)?Math.max(0,Math.min(1,n)):t}function $l(e,t){if(!e||typeof e!="object")return{...t};let n=e;return{x:k_(n.x,t.x),y:k_(n.y,t.y)}}function A5(e,t){if(!e||typeof e!="object")return{dest:{...t.dest},src:{...t.src}};let n=e,o=n.dest??n;return{dest:$l(o,t.dest),src:$l(n.src,t.src)}}function E5(e){return[{op:"add",points:e.mask},...e.maskPolys].filter(t=>t.points.length>=hi)}function jl(e){let t=[],n=[],o=0;for(let r of E5(e)){let i=t.length,s=Math.min(r.points.length,Nr-i);if(s<hi)break;for(let l=0;l<s;l+=1)t.push(r.points[l]),n.push({next:l+1<s?i+l+1:i,end:l+1===s,exclude:r.op==="exclude"});if(o+=1,o>=A_)break}return{points:t,links:n}}function Xp(e){return{x:e.next/Nr,y:e.end?e.exclude?1:.6:0}}function _i(e,t){return Math.abs(e-t)<1e-4}function E_(e){return e.length!==4?!1:Po.every((t,n)=>{let o=e[n];return o!=null&&_i(o.x,t.x)&&_i(o.y,t.y)})}function P5(e){return e.length!==wr?!1:R_.every((t,n)=>{let o=e[n];return o!=null&&_i(o.x,t.x)&&_i(o.y,t.y)})}function F5(e){return E_(e)}function Yp(e){return F5(e.mask)&&e.maskPolys.length===0}function O5(e){let t=e.points.map(o=>o.dest);return(t.length===wr?P5(t):E_(t))&&Yp(e)}function Kp(e){return e.enabled&&!O5(e)}function P_(e){let t=e.points;return t.length>=wr?[t[0]?.dest??Po[0],t[2]?.dest??Po[1],t[8]?.dest??Po[2],t[6]?.dest??Po[3]]:[t[0]?.dest??Po[0],t[1]?.dest??Po[1],t[2]?.dest??Po[2],t[3]?.dest??Po[3]]}function F_(e,t){let n=e.points.at(-1)??ql()[0];return e.points[t]??n}function H5(e){return!Array.isArray(e)||e.length<4?null:Po.map((t,n)=>({dest:$l(e[n],t),src:{...t}}))}function O_(e){return ql().map((n,o)=>{let r=e[o];return r?{dest:{...r.dest},src:{...n.src}}:n})}function I5(e){return R5().map((n,o)=>{let r=e[o];return r?{dest:{...r.dest},src:{...n.src}}:n})}function B5(e){return e.length>=wr?I5(e):O_(e)}function D5(e){return Po.map(t=>{let n=e.find(o=>_i(o.src.x,t.x)&&_i(o.src.y,t.y));return n?{dest:{...n.dest},src:{...t}}:{dest:{...t},src:{...t}}})}function H_(e,t,n=4){return!Array.isArray(e)||e.length<n?t.map(o=>({...o})):e.slice(0,Nr).map((o,r)=>$l(o,t[Math.min(r,Math.max(t.length-1,0))]??Po[0]))}function N5(e){if(!e||typeof e!="object")return null;let t=e,n=H_(t.points,[],hi);return n.length<hi?null:{op:t.op==="exclude"?"exclude":"add",points:n}}function W5(e,t){if(!Array.isArray(e))return[];let n=[],o=t;for(let r of e){if(n.length>=k5)break;let i=N5(r);if(!i)continue;let s=Nr-o;if(s<hi)break;let l=i.points.slice(0,s);l.length<hi||(n.push({op:i.op,points:l}),o+=l.length)}return n}function Xl(e){let t=e&&typeof e=="object"?e:{},n=ql(),o=Array.isArray(t.points)?t.points.slice(0,vs).map((m,d)=>A5(m,n[Math.min(d,n.length-1)])):null,r=Array.isArray(t.mask)&&t.mask.length>=4,i=o&&o.length>=4?o:H5(t.corners),s,l;return r?(s=B5(i??n),l=H_(t.mask,$p())):i&&i.length>4?(s=D5(i),l=i.map(m=>({...m.dest}))):i&&i.length>=4?(s=O_(i),l=s.map(m=>({...m.dest}))):(s=n,l=$p()),{enabled:t.enabled===!0,points:s,mask:l,maskPolys:W5(t.maskPolys,l.length)}}u();var Ra=null,B_=0,ea=vs,Yl=ea+Nr,Gr=vs+Nr*2;function I_(e){let t=Math.round(Math.max(0,Math.min(1,e))*65535);return[t>>8,t&255]}function Wr(e,t,n,o){let[r,i]=I_(n),[s,l]=I_(o),m=t*4;e[m]=r,e[m+1]=i,e[m+2]=s,e[m+3]=l}function D_(e){if(Ra?.data.length===Gr*4)return;let t=new Uint8Array(Gr*4);[0,.5,1].flatMap(i=>[0,.5,1].map(s=>({x:s,y:i}))).forEach((i,s)=>Wr(t,B_+s,i.x,i.y)),Wr(t,ea,0,0),Wr(t,ea+1,1,0),Wr(t,ea+2,1,1),Wr(t,ea+3,0,1),[{next:1,end:!1,exclude:!1},{next:2,end:!1,exclude:!1},{next:3,end:!1,exclude:!1},{next:0,end:!0,exclude:!1}].forEach((i,s)=>{let l=Xp(i);Wr(t,Yl+s,l.x,l.y)});let r=e.texture({data:t,shape:[Gr,1],wrap:"clamp",mag:"nearest",min:"nearest"});Ra={data:t,tex:r}}function N_(){return{getTexture:()=>Ra?.tex??null}}function Qp(){return Ra!=null&&Ra.data.length===Gr*4}function W_(e){if(!Ra)return;let{data:t,tex:n}=Ra;for(let s=0;s<vs;s+=1){let l=F_(e,s).dest;Wr(t,B_+s,l.x,l.y)}let o=jl(e),r=o.points.at(-1)??{x:0,y:0},i=o.links.at(-1)??{next:0,end:!0,exclude:!1};for(let s=0;s<Nr;s+=1){let l=o.points[s]??r;Wr(t,ea+s,l.x,l.y);let m=Xp(o.links[s]??i);Wr(t,Yl+s,m.x,m.y)}n.subimage?.({data:t,width:Gr,height:1})}u();var Jp=null,G_=null,Tr=null,lr=0,ta=!1,Ts=0,G5=12,U5=120,z5=2,V5=16;function em(e){Jp=e}function tm(e){G_=e}function Fo(){return ta}function U_(){return Tr!==null||lr!==0}function Ql(){Ts+=1}function Zl(){Ts=Math.max(0,Ts-1)}function z_(){ta||(ta=!0,Jp?.pause())}function $5(){ta&&(ta=!1,Jp?.resume())}function Kl(e,t=V5){for(let n=0;n<t;n++)e.regl.poll?.();e.regl._refresh()}function q5(e,t,n,o){Kl(o),e(t,n),Kl(o,8)}function j5(e){for(let t=0;t<e.host.o.length;t++){let n=e.host.o[t];n?.resize&&q5((o,r)=>n.resize(o,r),e.width,e.height,e.host)}for(let t=0;t<e.host.s.length;t++){let n=e.host.s[t];n?.resize&&n.resize(e.width,e.height)}Kl(e.host)}function X5(e,t,n){e.canvas.width=t,e.canvas.height=n,e.width=t,e.height=n,e.sandbox.set("width",t),e.sandbox.set("height",n)}function Y5(e,t){return!!e&&!!t&&e.host===t.host&&e.width===t.width&&e.height===t.height}function Zp(e=0){lr&&(cancelAnimationFrame(lr),lr=0),lr=requestAnimationFrame(()=>Q5(e))}function ws(){$5(),G_?.()}function Jl(){!ta||Tr!==null||lr!==0||(console.warn("[hydra] recovering stuck resize pause"),ws())}function K5(e){X5(e.host,e.width,e.height),j5(e)}function Q5(e=0){if(lr=0,!Tr){ta&&(console.warn("[hydra] FBO flush ended with no pending job while paused \u2014 recovering"),ws());return}z_();let t=0,n=0,o=()=>{if(Ts>0)if(n+=1,n>=U5)Ts=0;else{lr=requestAnimationFrame(o);return}let r=Tr;if(!r){ws();return}if(Kl(r.host,8),t<z5){t+=1,lr=requestAnimationFrame(o);return}try{if(K5(r),!Y5(Tr,r)){t=0,n=0,lr=requestAnimationFrame(o);return}Tr=null,ws()}catch(i){if(e<G5){t=0,Zp(e+1);return}console.warn("[hydra] FBO resize failed after retries",i),Tr=null,ws()}};lr=requestAnimationFrame(o)}function nm(e,t,n){if(e.width===t&&e.height===n&&e.canvas.width===t&&e.canvas.height===n){(Tr||ta)&&(Tr={host:e,width:t,height:n},Zp(0));return}Tr={host:e,width:t,height:n},z_(),Zp(0)}u();u();u();u();u();u();var om="https://5sldq2ipzrgnonkh.public.blob.vercel-storage.com";u();function rm(e){let t=e.trim().replace(/\/$/,"");if(!t)return"";let n=t.match(/^store_([a-z0-9]+)$/i);if(n)return`https://${n[1].toLowerCase()}.public.blob.vercel-storage.com`;if(/^https?:\/\//i.test(t))try{let o=new URL(t),r=o.hostname.match(/^store_([a-z0-9]+)\.public\.blob\.vercel-storage\.com$/i);return r?(o.hostname=`${r[1].toLowerCase()}.public.blob.vercel-storage.com`,o.protocol="https:",o.origin):/store_/i.test(o.hostname)?"":o.origin}catch{return""}return/store_/i.test(t)?"":t}function V_(e){if(!/^https?:\/\//i.test(e))return e;try{let t=new URL(e),n=t.hostname.match(/^store_([a-z0-9]+)\.public\.blob\.vercel-storage\.com$/i);return n?(t.hostname=`${n[1].toLowerCase()}.public.blob.vercel-storage.com`,t.protocol="https:",t.toString()):e}catch{return e}}function Z5(){let e=L.VITE_LOOP_ASSETS_FORCE_REMOTE==="1";if(L.DEV&&!e)return"";let t=L.VITE_LOOP_ASSETS_BASE_URL??"",n=t?rm(t):"";return n||(L.PROD?rm(om)||om:"")}var am;function J5(){return am===void 0&&(am=Z5()),am}var eT=["/loops/","/audio/Recordings/Montreuil26_master/studio/","/audio/Recordings/Montreuil26_master/tracks_bandcamp/stems/"];function tT(e){return eT.some(t=>e.startsWith(t))}function $_(e){if(!e||typeof e!="string"||e.startsWith("data:"))return e;if(/^https?:\/\//i.test(e))return V_(e);let t=J5();return!e.startsWith("/")||!tT(e)||!t?e:`${t}${e}`}function Cs(e){return $_(e)}u();var im={"/loops/point-cloud/PointCloud__1iqw__34.mp4":"/loops/point-cloud-geometric/PointCloud__1iqw__34.mp4","/loops/point-cloud/PointCloud__4f3t__52.mp4":"/loops/point-cloud-geometric/PointCloud__4f3t__52.mp4","/loops/point-cloud/PointCloud__9uol__5.mp4":"/loops/point-cloud-geometric/PointCloud__9uol__5.mp4","/loops/point-cloud/PointCloud__baa3__48.mp4":"/loops/point-cloud-geometric/PointCloud__baa3__48.mp4","/loops/point-cloud/PointCloud__e5dj__19.mp4":"/loops/point-cloud-geometric/PointCloud__e5dj__19.mp4","/loops/point-cloud/PointCloud__nusr__62.mp4":"/loops/point-cloud-geometric/PointCloud__nusr__62.mp4","/loops/point-cloud/PointCloud__oky0__61.mp4":"/loops/point-cloud-geometric/PointCloud__oky0__61.mp4","/loops/point-cloud/PointCloud__zgaj__55.mp4":"/loops/point-cloud-geometric/PointCloud__zgaj__55.mp4","/loops/point-cloud/PointCloud__0y5s__54.mp4":"/loops/point-cloud-particles/PointCloud__0y5s__54.mp4","/loops/point-cloud/PointCloud__3d0g__24.mp4":"/loops/point-cloud-particles/PointCloud__3d0g__24.mp4","/loops/point-cloud/PointCloud__4tqd__32.mp4":"/loops/point-cloud-particles/PointCloud__4tqd__32.mp4","/loops/point-cloud/PointCloud__6jt5__95.mp4":"/loops/point-cloud-particles/PointCloud__6jt5__95.mp4","/loops/point-cloud/PointCloud__8eq1__94.mp4":"/loops/point-cloud-particles/PointCloud__8eq1__94.mp4","/loops/point-cloud/PointCloud__8px8__22.mp4":"/loops/point-cloud-particles/PointCloud__8px8__22.mp4","/loops/point-cloud/PointCloud__bymt__89.mp4":"/loops/point-cloud-particles/PointCloud__bymt__89.mp4","/loops/point-cloud/PointCloud__bzy7__7.mp4":"/loops/point-cloud-particles/PointCloud__bzy7__7.mp4","/loops/point-cloud/PointCloud__cclx__92.mp4":"/loops/point-cloud-particles/PointCloud__cclx__92.mp4","/loops/point-cloud/PointCloud__d8b0__47.mp4":"/loops/point-cloud-particles/PointCloud__d8b0__47.mp4","/loops/point-cloud/PointCloud__g12n__18.mp4":"/loops/point-cloud-particles/PointCloud__g12n__18.mp4","/loops/point-cloud/PointCloud__hd80__14.mp4":"/loops/point-cloud-particles/PointCloud__hd80__14.mp4","/loops/point-cloud/PointCloud__hkji__69.mp4":"/loops/point-cloud-particles/PointCloud__hkji__69.mp4","/loops/point-cloud/PointCloud__iefy__68.mp4":"/loops/point-cloud-particles/PointCloud__iefy__68.mp4","/loops/point-cloud/PointCloud__j80t__67.mp4":"/loops/point-cloud-particles/PointCloud__j80t__67.mp4","/loops/point-cloud/PointCloud__kwxi__65.mp4":"/loops/point-cloud-particles/PointCloud__kwxi__65.mp4","/loops/point-cloud/PointCloud__ls6c__96.mp4":"/loops/point-cloud-particles/PointCloud__ls6c__96.mp4","/loops/point-cloud/PointCloud__m4dj__75.mp4":"/loops/point-cloud-particles/PointCloud__m4dj__75.mp4","/loops/point-cloud/PointCloud__m72v__42.mp4":"/loops/point-cloud-particles/PointCloud__m72v__42.mp4","/loops/point-cloud/PointCloud__mtqj__86.mp4":"/loops/point-cloud-particles/PointCloud__mtqj__86.mp4","/loops/point-cloud/PointCloud__nv57__16.mp4":"/loops/point-cloud-particles/PointCloud__nv57__16.mp4","/loops/point-cloud/PointCloud__u7sm__58.mp4":"/loops/point-cloud-particles/PointCloud__u7sm__58.mp4","/loops/point-cloud/PointCloud__vvo2__37.mp4":"/loops/point-cloud-particles/PointCloud__vvo2__37.mp4","/loops/point-cloud/PointCloud__xker__71.mp4":"/loops/point-cloud-particles/PointCloud__xker__71.mp4","/loops/point-cloud/PointCloud__xy68__27.mp4":"/loops/point-cloud-particles/PointCloud__xy68__27.mp4","/loops/point-cloud/PointCloud__zlyu__26.mp4":"/loops/point-cloud-particles/PointCloud__zlyu__26.mp4","/loops/point-cloud/PointCloud__zq7h__35.mp4":"/loops/point-cloud-particles/PointCloud__zq7h__35.mp4","/loops/point-cloud/WhiteHole__n2fm__149.mp4":"/loops/point-cloud-particles/WhiteHole__n2fm__149.mp4","/loops/point-cloud/PointCloud__rve8__15.mp4":"/loops/point-cloud-swirling-02/PointCloud__rve8__15.mp4","/loops/point-cloud/PointCloud__rxdn__73.mp4":"/loops/point-cloud-swirling-02/PointCloud__rxdn__73.mp4","/loops/point-cloud/PointCloud__s85x__59.mp4":"/loops/point-cloud-swirling-02/PointCloud__s85x__59.mp4","/loops/point-cloud/PointCloud__sgo2__30.mp4":"/loops/point-cloud-swirling-02/PointCloud__sgo2__30.mp4","/loops/point-cloud/PointCloud__ttxx__38.mp4":"/loops/point-cloud-swirling-02/PointCloud__ttxx__38.mp4","/loops/point-cloud/PointCloud__uaim__29.mp4":"/loops/point-cloud-swirling-02/PointCloud__uaim__29.mp4","/loops/point-cloud/PointCloud__vuff__57.mp4":"/loops/point-cloud-swirling-02/PointCloud__vuff__57.mp4","/loops/point-cloud/PointCloud__vzqk__72.mp4":"/loops/point-cloud-swirling-02/PointCloud__vzqk__72.mp4","/loops/point-cloud/PointCloud__x3g3__12.mp4":"/loops/point-cloud-swirling-02/PointCloud__x3g3__12.mp4","/loops/point-cloud/PointCloud__xjxy__36.mp4":"/loops/point-cloud-swirling-02/PointCloud__xjxy__36.mp4","/loops/point-cloud/PointCloud__xntc__56.mp4":"/loops/point-cloud-swirling-02/PointCloud__xntc__56.mp4","/loops/point-cloud/PointCloud__yrnk__2.mp4":"/loops/point-cloud-swirling-02/PointCloud__yrnk__2.mp4","/loops/point-cloud/PointCloud__zend__8.mp4":"/loops/point-cloud-swirling-02/PointCloud__zend__8.mp4","/loops/point-cloud/WhiteHole__80p5__157.mp4":"/loops/point-cloud-swirling-02/WhiteHole__80p5__157.mp4","/loops/point-cloud/PointCloud__1wnz__83.mp4":"/loops/point-cloud-undulating/PointCloud__1wnz__83.mp4","/loops/point-cloud/PointCloud__68cu__4.mp4":"/loops/point-cloud-undulating/PointCloud__68cu__4.mp4","/loops/point-cloud/PointCloud__6zlm__82.mp4":"/loops/point-cloud-undulating/PointCloud__6zlm__82.mp4","/loops/point-cloud/PointCloud__7nw3__50.mp4":"/loops/point-cloud-undulating/PointCloud__7nw3__50.mp4","/loops/point-cloud/PointCloud__aq5q__93.mp4":"/loops/point-cloud-undulating/PointCloud__aq5q__93.mp4","/loops/point-cloud/PointCloud__dk4e__88.mp4":"/loops/point-cloud-undulating/PointCloud__dk4e__88.mp4","/loops/point-cloud/PointCloud__do87__79.mp4":"/loops/point-cloud-undulating/PointCloud__do87__79.mp4","/loops/point-cloud/PointCloud__dxg8__91.mp4":"/loops/point-cloud-undulating/PointCloud__dxg8__91.mp4","/loops/point-cloud/PointCloud__fibj__90.mp4":"/loops/point-cloud-undulating/PointCloud__fibj__90.mp4","/loops/point-cloud/PointCloud__gnu5__45.mp4":"/loops/point-cloud-undulating/PointCloud__gnu5__45.mp4","/loops/point-cloud/PointCloud__grut__77.mp4":"/loops/point-cloud-undulating/PointCloud__grut__77.mp4","/loops/point-cloud/PointCloud__hxqx__17.mp4":"/loops/point-cloud-undulating/PointCloud__hxqx__17.mp4","/loops/point-cloud/PointCloud__kinz__43.mp4":"/loops/point-cloud-undulating/PointCloud__kinz__43.mp4","/loops/point-cloud/PointCloud__ktx6__87.mp4":"/loops/point-cloud-undulating/PointCloud__ktx6__87.mp4","/loops/point-cloud/PointCloud__qe2u__60.mp4":"/loops/point-cloud-undulating/PointCloud__qe2u__60.mp4","/loops/point-cloud/PointCloud__rv0s__39.mp4":"/loops/point-cloud-undulating/PointCloud__rv0s__39.mp4","/loops/point-cloud/PointCloud__ucio__84.mp4":"/loops/point-cloud-undulating/PointCloud__ucio__84.mp4","/loops/point-cloud/PointCloud__w344__28.mp4":"/loops/point-cloud-undulating/PointCloud__w344__28.mp4","/loops/white-hole/WhiteHole__0sx1__267.mp4":"/loops/white-hole-abstract/WhiteHole__0sx1__267.mp4","/loops/white-hole/WhiteHole__1bop__9.mp4":"/loops/white-hole-abstract/WhiteHole__1bop__9.mp4","/loops/white-hole/WhiteHole__37tc__40.mp4":"/loops/white-hole-abstract/WhiteHole__37tc__40.mp4","/loops/white-hole/WhiteHole__52vt__254.mp4":"/loops/white-hole-abstract/WhiteHole__52vt__254.mp4","/loops/white-hole/WhiteHole__6741__158.mp4":"/loops/white-hole-abstract/WhiteHole__6741__158.mp4","/loops/white-hole/WhiteHole__6k2b__239.mp4":"/loops/white-hole-abstract/WhiteHole__6k2b__239.mp4","/loops/white-hole/WhiteHole__7m4y__112.mp4":"/loops/white-hole-abstract/WhiteHole__7m4y__112.mp4","/loops/white-hole/WhiteHole__8ewe__238.mp4":"/loops/white-hole-abstract/WhiteHole__8ewe__238.mp4","/loops/white-hole/WhiteHole__a52v__237.mp4":"/loops/white-hole-abstract/WhiteHole__a52v__237.mp4","/loops/white-hole/WhiteHole__bzdy__172.mp4":"/loops/white-hole-abstract/WhiteHole__bzdy__172.mp4","/loops/white-hole/WhiteHole__cqkd__208.mp4":"/loops/white-hole-abstract/WhiteHole__cqkd__208.mp4","/loops/white-hole/WhiteHole__d7uc__109.mp4":"/loops/white-hole-abstract/WhiteHole__d7uc__109.mp4","/loops/white-hole/WhiteHole__h1fw__277.mp4":"/loops/white-hole-abstract/WhiteHole__h1fw__277.mp4","/loops/white-hole/WhiteHole__heur__124.mp4":"/loops/white-hole-abstract/WhiteHole__heur__124.mp4","/loops/white-hole/WhiteHole__jjlp__265.mp4":"/loops/white-hole-abstract/WhiteHole__jjlp__265.mp4","/loops/white-hole/WhiteHole__layf__150.mp4":"/loops/white-hole-abstract/WhiteHole__layf__150.mp4","/loops/white-hole/WhiteHole__n3te__263.mp4":"/loops/white-hole-abstract/WhiteHole__n3te__263.mp4","/loops/white-hole/WhiteHole__p9b8__262.mp4":"/loops/white-hole-abstract/WhiteHole__p9b8__262.mp4","/loops/white-hole/WhiteHole__qzu6__261.mp4":"/loops/white-hole-abstract/WhiteHole__qzu6__261.mp4","/loops/white-hole/WhiteHole__sc9q__46.mp4":"/loops/white-hole-abstract/WhiteHole__sc9q__46.mp4","/loops/white-hole/WhiteHole__u9gh__82.mp4":"/loops/white-hole-abstract/WhiteHole__u9gh__82.mp4","/loops/white-hole/WhiteHole__veak__245.mp4":"/loops/white-hole-abstract/WhiteHole__veak__245.mp4","/loops/white-hole/WhiteHole__ye3f__191.mp4":"/loops/white-hole-abstract/WhiteHole__ye3f__191.mp4","/loops/white-hole/WhiteHole__4ccg__159.mp4":"/loops/white-hole-fluid/WhiteHole__4ccg__159.mp4","/loops/white-hole/WhiteHole__4tbh__59.mp4":"/loops/white-hole-fluid/WhiteHole__4tbh__59.mp4","/loops/white-hole/WhiteHole__5gmf__31.mp4":"/loops/white-hole-fluid/WhiteHole__5gmf__31.mp4","/loops/white-hole/WhiteHole__5kjp__140.mp4":"/loops/white-hole-fluid/WhiteHole__5kjp__140.mp4","/loops/white-hole/WhiteHole__9fjn__173.mp4":"/loops/white-hole-fluid/WhiteHole__9fjn__173.mp4","/loops/white-hole/WhiteHole__9vn2__281.mp4":"/loops/white-hole-fluid/WhiteHole__9vn2__281.mp4","/loops/white-hole/WhiteHole__bjjd__55.mp4":"/loops/white-hole-fluid/WhiteHole__bjjd__55.mp4","/loops/white-hole/WhiteHole__db4q__286.mp4":"/loops/white-hole-fluid/WhiteHole__db4q__286.mp4","/loops/white-hole/WhiteHole__fl1c__53.mp4":"/loops/white-hole-fluid/WhiteHole__fl1c__53.mp4","/loops/white-hole/WhiteHole__gg4f__181.mp4":"/loops/white-hole-fluid/WhiteHole__gg4f__181.mp4","/loops/white-hole/WhiteHole__gtoj__134.mp4":"/loops/white-hole-fluid/WhiteHole__gtoj__134.mp4","/loops/white-hole/WhiteHole__h7z0__284.mp4":"/loops/white-hole-fluid/WhiteHole__h7z0__284.mp4","/loops/white-hole/WhiteHole__idsa__180.mp4":"/loops/white-hole-fluid/WhiteHole__idsa__180.mp4","/loops/white-hole/WhiteHole__ifq0__252.mp4":"/loops/white-hole-fluid/WhiteHole__ifq0__252.mp4","/loops/white-hole/WhiteHole__j5p2__186.mp4":"/loops/white-hole-fluid/WhiteHole__j5p2__186.mp4","/loops/white-hole/WhiteHole__jdzt__151.mp4":"/loops/white-hole-fluid/WhiteHole__jdzt__151.mp4","/loops/white-hole/WhiteHole__k3wc__179.mp4":"/loops/white-hole-fluid/WhiteHole__k3wc__179.mp4","/loops/white-hole/WhiteHole__nlxj__274.mp4":"/loops/white-hole-fluid/WhiteHole__nlxj__274.mp4","/loops/white-hole/WhiteHole__otbe__85.mp4":"/loops/white-hole-fluid/WhiteHole__otbe__85.mp4","/loops/white-hole/WhiteHole__t3dj__288.mp4":"/loops/white-hole-fluid/WhiteHole__t3dj__288.mp4","/loops/white-hole/WhiteHole__uur5__259.mp4":"/loops/white-hole-fluid/WhiteHole__uur5__259.mp4","/loops/white-hole/WhiteHole__w4uf__81.mp4":"/loops/white-hole-fluid/WhiteHole__w4uf__81.mp4","/loops/white-hole/WhiteHole__zbrt__62.mp4":"/loops/white-hole-fluid/WhiteHole__zbrt__62.mp4","/loops/white-hole/WhiteHole__1vpm__78.mp4":"/loops/white-hole-fragmented/WhiteHole__1vpm__78.mp4","/loops/white-hole/WhiteHole__2eku__190.mp4":"/loops/white-hole-fragmented/WhiteHole__2eku__190.mp4","/loops/white-hole/WhiteHole__3v6b__77.mp4":"/loops/white-hole-fragmented/WhiteHole__3v6b__77.mp4","/loops/white-hole/WhiteHole__4bq8__189.mp4":"/loops/white-hole-fragmented/WhiteHole__4bq8__189.mp4","/loops/white-hole/WhiteHole__6heh__211.mp4":"/loops/white-hole-fragmented/WhiteHole__6heh__211.mp4","/loops/white-hole/WhiteHole__ejog__207.mp4":"/loops/white-hole-fragmented/WhiteHole__ejog__207.mp4","/loops/white-hole/WhiteHole__era2__90.mp4":"/loops/white-hole-fragmented/WhiteHole__era2__90.mp4","/loops/white-hole/WhiteHole__f6bd__234.mp4":"/loops/white-hole-fragmented/WhiteHole__f6bd__234.mp4","/loops/white-hole/WhiteHole__gcb8__206.mp4":"/loops/white-hole-fragmented/WhiteHole__gcb8__206.mp4","/loops/white-hole/WhiteHole__h0d5__233.mp4":"/loops/white-hole-fragmented/WhiteHole__h0d5__233.mp4","/loops/white-hole/WhiteHole__h658__169.mp4":"/loops/white-hole-fragmented/WhiteHole__h658__169.mp4","/loops/white-hole/WhiteHole__htdo__266.mp4":"/loops/white-hole-fragmented/WhiteHole__htdo__266.mp4","/loops/white-hole/WhiteHole__iy7i__168.mp4":"/loops/white-hole-fragmented/WhiteHole__iy7i__168.mp4","/loops/white-hole/WhiteHole__lw12__250.mp4":"/loops/white-hole-fragmented/WhiteHole__lw12__250.mp4","/loops/white-hole/WhiteHole__m43q__102.mp4":"/loops/white-hole-fragmented/WhiteHole__m43q__102.mp4","/loops/white-hole/WhiteHole__m52c__201.mp4":"/loops/white-hole-fragmented/WhiteHole__m52c__201.mp4","/loops/white-hole/WhiteHole__nl34__249.mp4":"/loops/white-hole-fragmented/WhiteHole__nl34__249.mp4","/loops/white-hole/WhiteHole__o6f4__199.mp4":"/loops/white-hole-fragmented/WhiteHole__o6f4__199.mp4","/loops/white-hole/WhiteHole__sltz__146.mp4":"/loops/white-hole-fragmented/WhiteHole__sltz__146.mp4","/loops/white-hole/WhiteHole__st55__185.mp4":"/loops/white-hole-fragmented/WhiteHole__st55__185.mp4","/loops/white-hole/WhiteHole__td1k__98.mp4":"/loops/white-hole-fragmented/WhiteHole__td1k__98.mp4","/loops/white-hole/WhiteHole__u137__64.mp4":"/loops/white-hole-fragmented/WhiteHole__u137__64.mp4","/loops/white-hole/WhiteHole__wmo8__192.mp4":"/loops/white-hole-fragmented/WhiteHole__wmo8__192.mp4","/loops/white-hole/WhiteHole__xc8p__215.mp4":"/loops/white-hole-fragmented/WhiteHole__xc8p__215.mp4","/loops/white-hole/WhiteHole__xyld__80.mp4":"/loops/white-hole-fragmented/WhiteHole__xyld__80.mp4","/loops/white-hole/WhiteHole__1lid__41.mp4":"/loops/white-hole-geometric/WhiteHole__1lid__41.mp4","/loops/white-hole/WhiteHole__1xy8__287.mp4":"/loops/white-hole-geometric/WhiteHole__1xy8__287.mp4","/loops/white-hole/WhiteHole__d9xs__136.mp4":"/loops/white-hole-geometric/WhiteHole__d9xs__136.mp4","/loops/white-hole/WhiteHole__ftow__153.mp4":"/loops/white-hole-geometric/WhiteHole__ftow__153.mp4","/loops/white-hole/WhiteHole__gend__89.mp4":"/loops/white-hole-geometric/WhiteHole__gend__89.mp4","/loops/white-hole/WhiteHole__hj75__152.mp4":"/loops/white-hole-geometric/WhiteHole__hj75__152.mp4","/loops/white-hole/WhiteHole__i2ct__88.mp4":"/loops/white-hole-geometric/WhiteHole__i2ct__88.mp4","/loops/white-hole/WhiteHole__l8ja__105.mp4":"/loops/white-hole-geometric/WhiteHole__l8ja__105.mp4","/loops/white-hole/WhiteHole__ls15__275.mp4":"/loops/white-hole-geometric/WhiteHole__ls15__275.mp4","/loops/white-hole/WhiteHole__nam3__104.mp4":"/loops/white-hole-geometric/WhiteHole__nam3__104.mp4","/loops/white-hole/WhiteHole__pnfm__176.mp4":"/loops/white-hole-geometric/WhiteHole__pnfm__176.mp4","/loops/white-hole/WhiteHole__qgox__84.mp4":"/loops/white-hole-geometric/WhiteHole__qgox__84.mp4","/loops/white-hole/WhiteHole__rh23__175.mp4":"/loops/white-hole-geometric/WhiteHole__rh23__175.mp4","/loops/white-hole/WhiteHole__sgc7__83.mp4":"/loops/white-hole-geometric/WhiteHole__sgc7__83.mp4","/loops/white-hole/WhiteHole__stks__217.mp4":"/loops/white-hole-geometric/WhiteHole__stks__217.mp4","/loops/white-hole/WhiteHole__v4rl__216.mp4":"/loops/white-hole-geometric/WhiteHole__v4rl__216.mp4","/loops/white-hole/WhiteHole__y253__43.mp4":"/loops/white-hole-geometric/WhiteHole__y253__43.mp4","/loops/white-hole/WhiteHole__03i7__79.mp4":"/loops/white-hole-grid/WhiteHole__03i7__79.mp4","/loops/white-hole/WhiteHole__2okv__241.mp4":"/loops/white-hole-grid/WhiteHole__2okv__241.mp4","/loops/white-hole/WhiteHole__5hxl__221.mp4":"/loops/white-hole-grid/WhiteHole__5hxl__221.mp4","/loops/white-hole/WhiteHole__9hzc__138.mp4":"/loops/white-hole-grid/WhiteHole__9hzc__138.mp4","/loops/white-hole/WhiteHole__b9z1__137.mp4":"/loops/white-hole-grid/WhiteHole__b9z1__137.mp4","/loops/white-hole/WhiteHole__dqr6__171.mp4":"/loops/white-hole-grid/WhiteHole__dqr6__171.mp4","/loops/white-hole/WhiteHole__jqjt__70.mp4":"/loops/white-hole-grid/WhiteHole__jqjt__70.mp4","/loops/white-hole/WhiteHole__lipz__69.mp4":"/loops/white-hole-grid/WhiteHole__lipz__69.mp4","/loops/white-hole/WhiteHole__lzn7__178.mp4":"/loops/white-hole-grid/WhiteHole__lzn7__178.mp4","/loops/white-hole/WhiteHole__nxyc__101.mp4":"/loops/white-hole-grid/WhiteHole__nxyc__101.mp4","/loops/white-hole/WhiteHole__t227__119.mp4":"/loops/white-hole-grid/WhiteHole__t227__119.mp4","/loops/white-hole/WhiteHole__vx95__44.mp4":"/loops/white-hole-grid/WhiteHole__vx95__44.mp4","/loops/white-hole/WhiteHole__wugj__225.mp4":"/loops/white-hole-grid/WhiteHole__wugj__225.mp4","/loops/white-hole/WhiteHole__5s41__113.mp4":"/loops/white-hole-metallic/WhiteHole__5s41__113.mp4","/loops/white-hole/WhiteHole__80d1__282.mp4":"/loops/white-hole-metallic/WhiteHole__80d1__282.mp4","/loops/white-hole/WhiteHole__8g7i__210.mp4":"/loops/white-hole-metallic/WhiteHole__8g7i__210.mp4","/loops/white-hole/WhiteHole__fcfc__220.mp4":"/loops/white-hole-metallic/WhiteHole__fcfc__220.mp4","/loops/white-hole/WhiteHole__nen8__200.mp4":"/loops/white-hole-metallic/WhiteHole__nen8__200.mp4","/loops/white-hole/WhiteHole__olyc__67.mp4":"/loops/white-hole-metallic/WhiteHole__olyc__67.mp4","/loops/white-hole/WhiteHole__v2bk__270.mp4":"/loops/white-hole-metallic/WhiteHole__v2bk__270.mp4","/loops/white-hole/WhiteHole__vu3c__63.mp4":"/loops/white-hole-metallic/WhiteHole__vu3c__63.mp4","/loops/white-hole/WhiteHole__zko0__214.mp4":"/loops/white-hole-metallic/WhiteHole__zko0__214.mp4","/loops/white-hole/WhiteHole__0r85__161.mp4":"/loops/white-hole-nature/WhiteHole__0r85__161.mp4","/loops/white-hole/WhiteHole__1x10__142.mp4":"/loops/white-hole-nature/WhiteHole__1x10__142.mp4","/loops/white-hole/WhiteHole__2j39__160.mp4":"/loops/white-hole-nature/WhiteHole__2j39__160.mp4","/loops/white-hole/WhiteHole__3n9d__141.mp4":"/loops/white-hole-nature/WhiteHole__3n9d__141.mp4","/loops/white-hole/WhiteHole__6ezj__58.mp4":"/loops/white-hole-nature/WhiteHole__6ezj__58.mp4","/loops/white-hole/WhiteHole__8578__57.mp4":"/loops/white-hole-nature/WhiteHole__8578__57.mp4","/loops/white-hole/WhiteHole__8fx6__30.mp4":"/loops/white-hole-nature/WhiteHole__8fx6__30.mp4","/loops/white-hole/WhiteHole__cazf__73.mp4":"/loops/white-hole-nature/WhiteHole__cazf__73.mp4","/loops/white-hole/WhiteHole__couv__29.mp4":"/loops/white-hole-nature/WhiteHole__couv__29.mp4","/loops/white-hole/WhiteHole__d3aq__91.mp4":"/loops/white-hole-nature/WhiteHole__d3aq__91.mp4","/loops/white-hole/WhiteHole__e7r8__72.mp4":"/loops/white-hole-nature/WhiteHole__e7r8__72.mp4","/loops/white-hole/WhiteHole__g4uo__15.mp4":"/loops/white-hole-nature/WhiteHole__g4uo__15.mp4","/loops/white-hole/WhiteHole__hwof__14.mp4":"/loops/white-hole-nature/WhiteHole__hwof__14.mp4","/loops/white-hole/WhiteHole__iw2t__27.mp4":"/loops/white-hole-nature/WhiteHole__iw2t__27.mp4","/loops/white-hole/WhiteHole__rlpc__25.mp4":"/loops/white-hole-nature/WhiteHole__rlpc__25.mp4","/loops/white-hole/WhiteHole__rq01__12.mp4":"/loops/white-hole-nature/WhiteHole__rq01__12.mp4","/loops/white-hole/WhiteHole__sqhk__5.mp4":"/loops/white-hole-nature/WhiteHole__sqhk__5.mp4","/loops/white-hole/WhiteHole__sv5a__34.mp4":"/loops/white-hole-nature/WhiteHole__sv5a__34.mp4","/loops/white-hole/WhiteHole__ysyi__21.mp4":"/loops/white-hole-nature/WhiteHole__ysyi__21.mp4","/loops/white-hole/WhiteHole__0vpj__242.mp4":"/loops/white-hole-organic/WhiteHole__0vpj__242.mp4","/loops/white-hole/WhiteHole__6oee__38.mp4":"/loops/white-hole-organic/WhiteHole__6oee__38.mp4","/loops/white-hole/WhiteHole__8pko__37.mp4":"/loops/white-hole-organic/WhiteHole__8pko__37.mp4","/loops/white-hole/WhiteHole__9bnl__93.mp4":"/loops/white-hole-organic/WhiteHole__9bnl__93.mp4","/loops/white-hole/WhiteHole__an2d__209.mp4":"/loops/white-hole-organic/WhiteHole__an2d__209.mp4","/loops/white-hole/WhiteHole__d0v1__126.mp4":"/loops/white-hole-organic/WhiteHole__d0v1__126.mp4","/loops/white-hole/WhiteHole__f1vx__285.mp4":"/loops/white-hole-organic/WhiteHole__f1vx__285.mp4","/loops/white-hole/WhiteHole__f8iw__125.mp4":"/loops/white-hole-organic/WhiteHole__f8iw__125.mp4","/loops/white-hole/WhiteHole__htz3__107.mp4":"/loops/white-hole-organic/WhiteHole__htz3__107.mp4","/loops/white-hole/WhiteHole__j4xi__283.mp4":"/loops/white-hole-organic/WhiteHole__j4xi__283.mp4","/loops/white-hole/WhiteHole__jjw7__106.mp4":"/loops/white-hole-organic/WhiteHole__jjw7__106.mp4","/loops/white-hole/WhiteHole__k79t__251.mp4":"/loops/white-hole-organic/WhiteHole__k79t__251.mp4","/loops/white-hole/WhiteHole__kuta__132.mp4":"/loops/white-hole-organic/WhiteHole__kuta__132.mp4","/loops/white-hole/WhiteHole__ll5j__122.mp4":"/loops/white-hole-organic/WhiteHole__ll5j__122.mp4","/loops/white-hole/WhiteHole__moup__230.mp4":"/loops/white-hole-organic/WhiteHole__moup__230.mp4","/loops/white-hole/WhiteHole__mqfv__49.mp4":"/loops/white-hole-organic/WhiteHole__mqfv__49.mp4","/loops/white-hole/WhiteHole__n15r__167.mp4":"/loops/white-hole-organic/WhiteHole__n15r__167.mp4","/loops/white-hole/WhiteHole__ni61__97.mp4":"/loops/white-hole-organic/WhiteHole__ni61__97.mp4","/loops/white-hole/WhiteHole__pgxx__273.mp4":"/loops/white-hole-organic/WhiteHole__pgxx__273.mp4","/loops/white-hole/WhiteHole__qasj__66.mp4":"/loops/white-hole-organic/WhiteHole__qasj__66.mp4","/loops/white-hole/WhiteHole__s2yd__65.mp4":"/loops/white-hole-organic/WhiteHole__s2yd__65.mp4","/loops/white-hole/WhiteHole__tmfh__246.mp4":"/loops/white-hole-organic/WhiteHole__tmfh__246.mp4","/loops/white-hole/WhiteHole__v0ld__226.mp4":"/loops/white-hole-organic/WhiteHole__v0ld__226.mp4","/loops/white-hole/WhiteHole__x4y9__163.mp4":"/loops/white-hole-organic/WhiteHole__x4y9__163.mp4","/loops/white-hole/WhiteHole__yxgw__162.mp4":"/loops/white-hole-organic/WhiteHole__yxgw__162.mp4","/loops/white-hole/WhiteHole__zmig__96.mp4":"/loops/white-hole-organic/WhiteHole__zmig__96.mp4","/loops/white-hole/WhiteHole__01ef__143.mp4":"/loops/white-hole-particles/WhiteHole__01ef__143.mp4","/loops/white-hole/WhiteHole__9aap__75.mp4":"/loops/white-hole-particles/WhiteHole__9aap__75.mp4","/loops/white-hole/WhiteHole__annw__74.mp4":"/loops/white-hole-particles/WhiteHole__annw__74.mp4","/loops/white-hole/WhiteHole__bnd7__17.mp4":"/loops/white-hole-particles/WhiteHole__bnd7__17.mp4","/loops/white-hole/WhiteHole__dm9g__54.mp4":"/loops/white-hole-particles/WhiteHole__dm9g__54.mp4","/loops/white-hole/WhiteHole__efqi__28.mp4":"/loops/white-hole-particles/WhiteHole__efqi__28.mp4","/loops/white-hole/WhiteHole__f77w__278.mp4":"/loops/white-hole-particles/WhiteHole__f77w__278.mp4","/loops/white-hole/WhiteHole__f9kt__108.mp4":"/loops/white-hole-particles/WhiteHole__f9kt__108.mp4","/loops/white-hole/WhiteHole__k19v__203.mp4":"/loops/white-hole-particles/WhiteHole__k19v__203.mp4","/loops/white-hole/WhiteHole__kuf6__231.mp4":"/loops/white-hole-particles/WhiteHole__kuf6__231.mp4","/loops/white-hole/WhiteHole__l3wf__50.mp4":"/loops/white-hole-particles/WhiteHole__l3wf__50.mp4","/loops/white-hole/WhiteHole__oj3s__131.mp4":"/loops/white-hole-particles/WhiteHole__oj3s__131.mp4","/loops/white-hole/WhiteHole__p4xy__166.mp4":"/loops/white-hole-particles/WhiteHole__p4xy__166.mp4","/loops/white-hole/WhiteHole__qzqx__165.mp4":"/loops/white-hole-particles/WhiteHole__qzqx__165.mp4","/loops/white-hole/WhiteHole__u8kb__128.mp4":"/loops/white-hole-particles/WhiteHole__u8kb__128.mp4","/loops/white-hole/WhiteHole__ultv__193.mp4":"/loops/white-hole-particles/WhiteHole__ultv__193.mp4","/loops/white-hole/WhiteHole__w2sg__127.mp4":"/loops/white-hole-particles/WhiteHole__w2sg__127.mp4","/loops/white-hole/WhiteHole__wxak__269.mp4":"/loops/white-hole-particles/WhiteHole__wxak__269.mp4","/loops/white-hole/WhiteHole__y9xf__144.mp4":"/loops/white-hole-particles/WhiteHole__y9xf__144.mp4","/loops/white-hole/WhiteHole__p3at__188.mp4":"/loops/white-hole-radial-02/WhiteHole__p3at__188.mp4","/loops/white-hole/WhiteHole__pgzf__198.mp4":"/loops/white-hole-radial-02/WhiteHole__pgzf__198.mp4","/loops/white-hole/WhiteHole__pmpg__248.mp4":"/loops/white-hole-radial-02/WhiteHole__pmpg__248.mp4","/loops/white-hole/WhiteHole__qhfr__197.mp4":"/loops/white-hole-radial-02/WhiteHole__qhfr__197.mp4","/loops/white-hole/WhiteHole__ro0c__99.mp4":"/loops/white-hole-radial-02/WhiteHole__ro0c__99.mp4","/loops/white-hole/WhiteHole__ro5j__247.mp4":"/loops/white-hole-radial-02/WhiteHole__ro5j__247.mp4","/loops/white-hole/WhiteHole__sa4a__195.mp4":"/loops/white-hole-radial-02/WhiteHole__sa4a__195.mp4","/loops/white-hole/WhiteHole__utv5__23.mp4":"/loops/white-hole-radial-02/WhiteHole__utv5__23.mp4","/loops/white-hole/WhiteHole__uzpq__184.mp4":"/loops/white-hole-radial-02/WhiteHole__uzpq__184.mp4","/loops/white-hole/WhiteHole__v4c4__118.mp4":"/loops/white-hole-radial-02/WhiteHole__v4c4__118.mp4","/loops/white-hole/WhiteHole__wst9__117.mp4":"/loops/white-hole-radial-02/WhiteHole__wst9__117.mp4","/loops/white-hole/WhiteHole__wzac__183.mp4":"/loops/white-hole-radial-02/WhiteHole__wzac__183.mp4","/loops/white-hole/WhiteHole__xk12__22.mp4":"/loops/white-hole-radial-02/WhiteHole__xk12__22.mp4","/loops/white-hole/WhiteHole__zs2x__42.mp4":"/loops/white-hole-radial-02/WhiteHole__zs2x__42.mp4","/loops/white-hole/WhiteHole__14nf__32.mp4":"/loops/white-hole-reflections/WhiteHole__14nf__32.mp4","/loops/white-hole/WhiteHole__8c7t__18.mp4":"/loops/white-hole-reflections/WhiteHole__8c7t__18.mp4","/loops/white-hole/WhiteHole__b5pk__92.mp4":"/loops/white-hole-reflections/WhiteHole__b5pk__92.mp4","/loops/white-hole/WhiteHole__bq9o__280.mp4":"/loops/white-hole-reflections/WhiteHole__bq9o__280.mp4","/loops/white-hole/WhiteHole__c7ri__155.mp4":"/loops/white-hole-reflections/WhiteHole__c7ri__155.mp4","/loops/white-hole/WhiteHole__dk9k__279.mp4":"/loops/white-hole-reflections/WhiteHole__dk9k__279.mp4","/loops/white-hole/WhiteHole__imaq__133.mp4":"/loops/white-hole-reflections/WhiteHole__imaq__133.mp4","/loops/white-hole/WhiteHole__t6rw__260.mp4":"/loops/white-hole-reflections/WhiteHole__t6rw__260.mp4","/loops/white-hole/WhiteHole__whaq__11.mp4":"/loops/white-hole-reflections/WhiteHole__whaq__11.mp4","/loops/white-hole/WhiteHole__yr3o__268.mp4":"/loops/white-hole-reflections/WhiteHole__yr3o__268.mp4","/loops/white-hole/WhiteHole__0uvt__223.mp4":"/loops/white-hole-swirling/WhiteHole__0uvt__223.mp4","/loops/white-hole/WhiteHole__1a9v__256.mp4":"/loops/white-hole-swirling/WhiteHole__1a9v__256.mp4","/loops/white-hole/WhiteHole__1db4__115.mp4":"/loops/white-hole-swirling/WhiteHole__1db4__115.mp4","/loops/white-hole/WhiteHole__24lr__213.mp4":"/loops/white-hole-swirling/WhiteHole__24lr__213.mp4","/loops/white-hole/WhiteHole__3deg__222.mp4":"/loops/white-hole-swirling/WhiteHole__3deg__222.mp4","/loops/white-hole/WhiteHole__3iny__94.mp4":"/loops/white-hole-swirling/WhiteHole__3iny__94.mp4","/loops/white-hole/WhiteHole__4ibk__240.mp4":"/loops/white-hole-swirling/WhiteHole__4ibk__240.mp4","/loops/white-hole/WhiteHole__7lf5__139.mp4":"/loops/white-hole-swirling/WhiteHole__7lf5__139.mp4","/loops/white-hole/WhiteHole__a8pp__156.mp4":"/loops/white-hole-swirling/WhiteHole__a8pp__156.mp4","/loops/white-hole/WhiteHole__bh40__236.mp4":"/loops/white-hole-swirling/WhiteHole__bh40__236.mp4","/loops/white-hole/WhiteHole__dcs8__16.mp4":"/loops/white-hole-swirling/WhiteHole__dcs8__16.mp4","/loops/white-hole/WhiteHole__g08q__71.mp4":"/loops/white-hole-swirling/WhiteHole__g08q__71.mp4","/loops/white-hole/WhiteHole__nreo__177.mp4":"/loops/white-hole-swirling/WhiteHole__nreo__177.mp4","/loops/white-hole/WhiteHole__o2t5__6.mp4":"/loops/white-hole-swirling/WhiteHole__o2t5__6.mp4","/loops/white-hole/WhiteHole__qk6l__228.mp4":"/loops/white-hole-swirling/WhiteHole__qk6l__228.mp4","/loops/white-hole/WhiteHole__qsty__147.mp4":"/loops/white-hole-swirling/WhiteHole__qsty__147.mp4","/loops/white-hole/WhiteHole__r60m__196.mp4":"/loops/white-hole-swirling/WhiteHole__r60m__196.mp4","/loops/white-hole/WhiteHole__sfxg__227.mp4":"/loops/white-hole-swirling/WhiteHole__sfxg__227.mp4","/loops/white-hole/WhiteHole__t122__164.mp4":"/loops/white-hole-swirling/WhiteHole__t122__164.mp4","/loops/white-hole/WhiteHole__t1m5__194.mp4":"/loops/white-hole-swirling/WhiteHole__t1m5__194.mp4","/loops/white-hole/WhiteHole__u3a2__45.mp4":"/loops/white-hole-swirling/WhiteHole__u3a2__45.mp4","/loops/white-hole/WhiteHole__uiy0__145.mp4":"/loops/white-hole-swirling/WhiteHole__uiy0__145.mp4","/loops/white-hole/WhiteHole__x3de__244.mp4":"/loops/white-hole-swirling/WhiteHole__x3de__244.mp4","/loops/white-hole/WhiteHole__yqs9__224.mp4":"/loops/white-hole-swirling/WhiteHole__yqs9__224.mp4","/loops/white-hole/WhiteHole__yu83__243.mp4":"/loops/white-hole-swirling/WhiteHole__yu83__243.mp4","/loops/white-hole/WhiteHole__5ed2__8.mp4":"/loops/white-hole-topographical/WhiteHole__5ed2__8.mp4","/loops/white-hole/WhiteHole__9rq1__2.mp4":"/loops/white-hole-topographical/WhiteHole__9rq1__2.mp4","/loops/white-hole/WhiteHole__h1b7__219.mp4":"/loops/white-hole-topographical/WhiteHole__h1b7__219.mp4","/loops/white-hole/WhiteHole__oemk__48.mp4":"/loops/white-hole-topographical/WhiteHole__oemk__48.mp4","/loops/white-hole/WhiteHole__ouun__148.mp4":"/loops/white-hole-topographical/WhiteHole__ouun__148.mp4","/loops/white-hole/WhiteHole__prcx__100.mp4":"/loops/white-hole-topographical/WhiteHole__prcx__100.mp4","/loops/white-hole/WhiteHole__tb1l__271.mp4":"/loops/white-hole-topographical/WhiteHole__tb1l__271.mp4","/loops/white-hole/WhiteHole__uhp4__33.mp4":"/loops/white-hole-topographical/WhiteHole__uhp4__33.mp4","/loops/white-hole/WhiteHole__xklc__174.mp4":"/loops/white-hole-topographical/WhiteHole__xklc__174.mp4","/loops/white-hole/WhiteHole__y2io__10.mp4":"/loops/white-hole-topographical/WhiteHole__y2io__10.mp4","/loops/white-hole/WhiteHole__yzgc__116.mp4":"/loops/white-hole-topographical/WhiteHole__yzgc__116.mp4","/loops/white-hole/WhiteHole__5xre__13.mp4":"/loops/white-hole-undulating/WhiteHole__5xre__13.mp4","/loops/white-hole/WhiteHole__6o8d__19.mp4":"/loops/white-hole-undulating/WhiteHole__6o8d__19.mp4","/loops/white-hole/WhiteHole__6tq5__253.mp4":"/loops/white-hole-undulating/WhiteHole__6tq5__253.mp4","/loops/white-hole/WhiteHole__6zrn__7.mp4":"/loops/white-hole-undulating/WhiteHole__6zrn__7.mp4","/loops/white-hole/WhiteHole__dfsp__235.mp4":"/loops/white-hole-undulating/WhiteHole__dfsp__235.mp4","/loops/white-hole/WhiteHole__e9f2__3.mp4":"/loops/white-hole-undulating/WhiteHole__e9f2__3.mp4","/loops/white-hole/WhiteHole__f938__170.mp4":"/loops/white-hole-undulating/WhiteHole__f938__170.mp4","/loops/white-hole/WhiteHole__hizi__52.mp4":"/loops/white-hole-undulating/WhiteHole__hizi__52.mp4","/loops/white-hole/WhiteHole__j5td__51.mp4":"/loops/white-hole-undulating/WhiteHole__j5td__51.mp4","/loops/white-hole/WhiteHole__ophc__229.mp4":"/loops/white-hole-undulating/WhiteHole__ophc__229.mp4","/loops/white-hole/WhiteHole__ovwu__26.mp4":"/loops/white-hole-undulating/WhiteHole__ovwu__26.mp4","/loops/white-hole/WhiteHole__q83z__47.mp4":"/loops/white-hole-undulating/WhiteHole__q83z__47.mp4","/loops/white-hole/WhiteHole__rbst__120.mp4":"/loops/white-hole-undulating/WhiteHole__rbst__120.mp4","/loops/white-hole/WhiteHole__rfvu__272.mp4":"/loops/white-hole-undulating/WhiteHole__rfvu__272.mp4","/loops/white-hole/WhiteHole__t5ki__24.mp4":"/loops/white-hole-undulating/WhiteHole__t5ki__24.mp4","/loops/white-hole/WhiteHole__wo43__258.mp4":"/loops/white-hole-undulating/WhiteHole__wo43__258.mp4","/loops/white-hole/WhiteHole__ylks__257.mp4":"/loops/white-hole-undulating/WhiteHole__ylks__257.mp4"};u();u();u();var Ms=[{folder:"cosmic-fest",slug:"cosmic-fest",name:"Cosmic Fest",blurb:"Glowing node networks and neon gradients \u2014 magenta, electric blue, and yellow drift across a charcoal void. Thirty seamless loops of interconnected light and hypnotic color flow.",coverClipPath:"/loops/cosmic-fest/cosmic-fest__94571316__1.mp4",featured:!1,sortOrder:61},{folder:"cosmic-fest-part2",slug:"cosmic-fest-part2",name:"Cosmic Fest Part 2",blurb:"Bioluminescent organic forms in a deep cosmic void \u2014 translucent membranes, internal glow, and slow undulating motion. Thirty-five seamless loops of alien, hypnotic life.",coverClipPath:"/loops/cosmic-fest-part2/cosmic-fest-part2__25429229__1.mp4",featured:!1,sortOrder:62},{folder:"trip-70s",slug:"trip-70s",name:"Trip 70s",blurb:"",coverClipPath:"/loops/trip-70s/trip-70s__3eaf07e7__1.mp4",featured:!1,sortOrder:0},{folder:"geometrics",slug:"geometrics",name:"Geometrics",blurb:"Immerse your audience in an endless tessellation of smooth",coverClipPath:"/loops/geometrics/geometrics__409d885c__23.mp4",featured:!1,sortOrder:0},{folder:"urban",slug:"urban",name:"Urban",blurb:"Immerse your audience in the hypnotic repetition of towering urban facades, rendered",coverClipPath:"/loops/urban/urban__9073d6ed__5.mp4",featured:!1,sortOrder:0},{folder:"watching-you",slug:"watching-you",name:"Watching you",blurb:"Immerse your audience in a hypnotic cascade of glowing vintage CRT screens, aw",coverClipPath:"/loops/watching-you/watching-you__43546912__1.mp4",featured:!1,sortOrder:0},{folder:"birds",slug:"birds",name:"Birds",blurb:"",coverClipPath:"/loops/birds/birds__bafe82be__1.mp4",featured:!1,sortOrder:0},{folder:"bauhauss",slug:"bauhauss",name:"Bauhauss",blurb:"Dive into a world of hypnotic motion with vibrant, saturated color bands and precise",coverClipPath:"/loops/bauhauss/bauhauss__d316c2a3__1.mp4",featured:!1,sortOrder:0},{folder:"explosion",slug:"explosion",name:"Explosion",blurb:"Immerse your audience in a hypnotic, slow-motion ballet of fiery energy",coverClipPath:"/loops/explosion/explosion__9ecfe1ba__1.mp4",featured:!1,sortOrder:0},{folder:"flowers",slug:"flowers",name:"Flowers",blurb:"Immerse your audience in a world of vibrant, organic motion with these visuals",coverClipPath:"/loops/flowers/flowers__af31a73b__1.mp4",featured:!1,sortOrder:0},{folder:"dev-tools",slug:"dev-tools",name:"Dev-tools",blurb:"Immerse your audience in a hypnotic trance with these high-fidelity visual",coverClipPath:"/loops/dev-tools/dev-tools__e6af03c0__1.mp4",featured:!1,sortOrder:0},{folder:"cymatics",slug:"cymatics",name:"Cymatics",blurb:"",coverClipPath:"/loops/cymatics/cymatics__983631b1__17.mp4",featured:!1,sortOrder:0},{folder:"point-cloud-geometric",slug:"point-cloud-geometric",name:"Point Cloud \xB7 Geometric",blurb:"Geometric patterns and crisp structure \u2014 grid-like hypnosis.",coverClipPath:"/loops/point-cloud-geometric/PointCloud__1iqw__34.mp4",featured:!1,sortOrder:71},{folder:"point-cloud-particles",slug:"point-cloud-particles",name:"Point Cloud \xB7 Particles",blurb:"Particle fields and point-cloud depth \u2014 airy, weightless visuals.",coverClipPath:"/loops/point-cloud-particles/PointCloud__0y5s__54.mp4",featured:!1,sortOrder:72},{folder:"point-cloud-swirling-02",slug:"point-cloud-swirling-02",name:"Point Cloud \xB7 Swirling",blurb:"Swirling vortices and spiral motion \u2014 hypnotic build energy.",coverClipPath:"/loops/point-cloud-swirling-02/PointCloud__rve8__15.mp4",featured:!1,sortOrder:73},{folder:"point-cloud-undulating",slug:"point-cloud-undulating",name:"Point Cloud \xB7 Undulating",blurb:"Undulating waves and rolling motion \u2014 smooth ambient drift.",coverClipPath:"/loops/point-cloud-undulating/PointCloud__1wnz__83.mp4",featured:!1,sortOrder:74},{folder:"white-hole-abstract",slug:"white-hole-abstract",name:"White Hole \xB7 Abstract",blurb:"Abstract forms and high-contrast motion for versatile layering.",coverClipPath:"/loops/white-hole-abstract/WhiteHole__0sx1__267.mp4",featured:!1,sortOrder:81},{folder:"white-hole-fluid",slug:"white-hole-fluid",name:"White Hole \xB7 Fluid",blurb:"Fluid motion and soft deformation \u2014 liquid, weightless flow.",coverClipPath:"/loops/white-hole-fluid/WhiteHole__4ccg__159.mp4",featured:!1,sortOrder:82},{folder:"white-hole-fragmented",slug:"white-hole-fragmented",name:"White Hole \xB7 Fragmented",blurb:"Fragmented shards and broken symmetry \u2014 glitch-adjacent energy.",coverClipPath:"/loops/white-hole-fragmented/WhiteHole__1vpm__78.mp4",featured:!1,sortOrder:83},{folder:"white-hole-geometric",slug:"white-hole-geometric",name:"White Hole \xB7 Geometric",blurb:"Geometric patterns and crisp structure \u2014 grid-like hypnosis.",coverClipPath:"/loops/white-hole-geometric/WhiteHole__1lid__41.mp4",featured:!1,sortOrder:84},{folder:"white-hole-grid",slug:"white-hole-grid",name:"White Hole \xB7 Grid",blurb:"Grid fields and modular repetition \u2014 technical visual rhythm.",coverClipPath:"/loops/white-hole-grid/WhiteHole__03i7__79.mp4",featured:!1,sortOrder:85},{folder:"white-hole-metallic",slug:"white-hole-metallic",name:"White Hole \xB7 Metallic",blurb:"Metallic sheen and industrial gloss \u2014 sharp reflective motion.",coverClipPath:"/loops/white-hole-metallic/WhiteHole__5s41__113.mp4",featured:!1,sortOrder:86},{folder:"white-hole-nature",slug:"white-hole-nature",name:"White Hole \xB7 Nature",blurb:"Nature-inspired motion \u2014 organic light and landscape abstraction.",coverClipPath:"/loops/white-hole-nature/WhiteHole__0r85__161.mp4",featured:!1,sortOrder:87},{folder:"white-hole-organic",slug:"white-hole-organic",name:"White Hole \xB7 Organic",blurb:"Organic shapes and biomorphic flow \u2014 living, breathing forms.",coverClipPath:"/loops/white-hole-organic/WhiteHole__0vpj__242.mp4",featured:!1,sortOrder:88},{folder:"white-hole-particles",slug:"white-hole-particles",name:"White Hole \xB7 Particles",blurb:"Particle fields and point-cloud depth \u2014 airy, weightless visuals.",coverClipPath:"/loops/white-hole-particles/WhiteHole__01ef__143.mp4",featured:!1,sortOrder:89},{folder:"white-hole-radial-02",slug:"white-hole-radial-02",name:"White Hole \xB7 Radial",blurb:"Radial symmetry and center-weighted motion \u2014 portal-like focus.",coverClipPath:"/loops/white-hole-radial-02/WhiteHole__p3at__188.mp4",featured:!1,sortOrder:90},{folder:"white-hole-reflections",slug:"white-hole-reflections",name:"White Hole \xB7 Reflections",blurb:"Reflective surfaces and mirror logic \u2014 luminous depth.",coverClipPath:"/loops/white-hole-reflections/WhiteHole__14nf__32.mp4",featured:!1,sortOrder:91},{folder:"white-hole-swirling",slug:"white-hole-swirling",name:"White Hole \xB7 Swirling",blurb:"Swirling vortices and spiral motion \u2014 hypnotic build energy.",coverClipPath:"/loops/white-hole-swirling/WhiteHole__0uvt__223.mp4",featured:!1,sortOrder:92},{folder:"white-hole-topographical",slug:"white-hole-topographical",name:"White Hole \xB7 Topographical",blurb:"Topographic relief and contour lines \u2014 mapped, dimensional flow.",coverClipPath:"/loops/white-hole-topographical/WhiteHole__5ed2__8.mp4",featured:!1,sortOrder:93},{folder:"white-hole-undulating",slug:"white-hole-undulating",name:"White Hole \xB7 Undulating",blurb:"Undulating waves and rolling motion \u2014 smooth ambient drift.",coverClipPath:"/loops/white-hole-undulating/WhiteHole__5xre__13.mp4",featured:!1,sortOrder:94},{folder:"alien",slug:"alien",name:"Alien",blurb:"",coverClipPath:"/loops/alien/alien__ed3db4fa__24.mp4",featured:!1,sortOrder:0},{folder:"lava-lamp",slug:"lava-lamp",name:"Lava lamp",blurb:"",coverClipPath:"/loops/lava-lamp/lava-lamp__17db0d38__1.mp4",featured:!1,sortOrder:0},{folder:"slim-mold",slug:"slim-mold",name:"Slim mold",blurb:"",coverClipPath:"/loops/slim-mold/slim-mold__d193c06b__1.mp4",featured:!1,sortOrder:0},{folder:"suminagashi",slug:"suminagashi",name:"Suminagashi",blurb:"",coverClipPath:"/loops/suminagashi/suminagashi__c8bd8b13__7.mp4",featured:!1,sortOrder:0},{folder:"infamous-inflate",slug:"infamous-inflate",name:"Infamous Inflate",blurb:"A monumental, abstract inflatable sculpture with a highly reflective, pearlescent surface.",coverClipPath:"/loops/infamous-inflate/infamous-inflate__xllo__11.mp4",featured:!1,sortOrder:0},{folder:"oscilloscope",slug:"oscilloscope",name:"Oscilloscope",blurb:"Immerse your audience in a world of luminous, flowing geometry",coverClipPath:"/loops/oscilloscope/oscilloscope__f2c7ed7d__1.mp4",featured:!1,sortOrder:0},{folder:"iridescent",slug:"iridescent",name:"Iridescent",blurb:"Immerse your audience in a hypnotic drift of melting colors and oil-slick",coverClipPath:"/loops/iridescent/iridescent__685b17f4__11.mp4",featured:!1,sortOrder:0},{folder:"patterns",slug:"test",name:"Patterns",blurb:"",coverClipPath:"/loops/patterns/patterns__wj72__3.mp4",featured:!1,sortOrder:0},{folder:"silent-caustics",slug:"silent-caustics",name:"Silent Caustics",blurb:"",coverClipPath:"/loops/silent-caustics/silent-caustics__fd9bdebe__1.mp4",featured:!1,sortOrder:0},{folder:"cloud-composition",slug:"cloud-composition",name:"Cloud Composition",blurb:"Pure cloudscapes \u2014 billowing cumulus, layered mist, and soft volumetric depth. Sixteen seamless loops of sky filled with clouds only: no ground, no sun, no horizon.",coverClipPath:"/loops/cloud-composition/CloudComposition__tlzr__6.mp4",featured:!1,sortOrder:36},{folder:"liminal-spaces",slug:"liminal-spaces",name:"Liminal Spaces",blurb:"Uncanny emptiness \u2014 transitional malls, corridors, pools, and garages plus Backrooms-style institutional mono-lit rooms. Sixteen photoreal seamless loops of places that feel in-between: nostalgic, quiet, and wrong.",coverClipPath:"/loops/liminal-spaces/LiminalSpaces__t8ha__2.mp4",featured:!1,sortOrder:37},{folder:"behind-screen",slug:"behind-screen",name:"Behind Screen",blurb:"Fine-art nude silhouettes behind a white semi-opaque frosted screen \u2014 detail emerges only where skin meets the barrier. Twenty-nine slow, lost, interrogative monochrome loops: frontal figures and emotive clusters of hands pressing through the glow.",coverClipPath:"/loops/behind-screen/BehindScreen__cmg7__5.mp4",featured:!1,sortOrder:38},{folder:"concrete-jungle",slug:"concrete-jungle",name:"Concrete Jungle",blurb:"Two worlds, one set \u2014 dark Berlin industrial concrete, steel and haze cut by hard shafts of light, meeting deep wet jungle goa: emerald canopy, drifting mist, and bioluminescent glow. Sixteen photoreal, cinematic seamless loops.",coverClipPath:"/loops/concrete-jungle/ConcreteJungle__a5ut__1.mp4",featured:!1,sortOrder:35},{folder:"dune-calor",slug:"dune-calor",name:"Dune Calor",blurb:"Sandstorms, heat shimmer, and sun-scorched monoliths \u2014 32 seamless desert loops with fine particulate haze and calor distortion.",coverClipPath:"/loops/dune-calor/DuneCalor__yt96__15.mp4",featured:!1,sortOrder:55},{folder:"obsidian-iris",slug:"obsidian-iris",name:"Obsidian Iris & Liquid Light",blurb:"Pearlescent opals, molten obsidian, holographic foil, and cyber-satin \u2014 ten seamless 16:9 loops of iridescent fluid and fabric luxury.",coverClipPath:"/loops/obsidian-iris/ObsidianIris__5tec__4.mp4",featured:!1,sortOrder:57},{folder:"stripe-resonance",slug:"stripe-resonance",name:"Stripe Resonance",blurb:"Crisp black-and-white stripe patterns on pure white \u2014 flat vector op-art and sharp 3D renders with subtle vibration and resonance motion. Sixteen seamless loops, zero blur.",coverClipPath:"/loops/stripe-resonance/StripeResonance__9egt__3.mp4",featured:!1,sortOrder:58},{folder:"liquid-metal",slug:"liquid-metal",name:"Liquid Metal",blurb:"Chrome surfaces, molten reflections, and slow metallic drift \u2014 a hypnotic loop set built for deep techno and industrial sets.",coverClipPath:"/loops/liquid-metal/LiquidMetal__4yvb__26.mp4",featured:!1,sortOrder:10},{folder:"rainy-city-night",slug:"rainy-city-night",name:"Rainy City Night",blurb:"Neon-soaked streets, rain on glass, and late-night urban glow \u2014 moody loops for cathartic, cinematic transitions.",coverClipPath:"/loops/rainy-city-night/RainyCityNight__f8pc__16.mp4",featured:!1,sortOrder:20},{folder:"cosmodernism",slug:"cosmodernism",name:"Cosmodernism",blurb:"Retro-futurist geometry, saturated palettes, and cosmic architecture \u2014 euphoric visuals for peak-time moments.",coverClipPath:"/loops/cosmodernism/Cosmodernism__3wqb__15.mp4",featured:!1,sortOrder:30},{folder:"fire-sparkles",slug:"fire-sparkles",name:"Fire Sparkles",blurb:"Ember trails, particle bursts, and warm kinetic light \u2014 high-energy loops that ride snare and build energy.",coverClipPath:"/loops/fire-sparkles/FireSparkles__m0v2__23.mp4",featured:!1,sortOrder:40},{folder:"obsidian-tide",slug:"obsidian-tide",name:"Obsidian Tide",blurb:"Dark water, obsidian sheen, and tidal motion \u2014 slow, trance-friendly loops with depth and restraint.",coverClipPath:"/loops/obsidian-tide/ObsidianTide__g232__24.mp4",featured:!1,sortOrder:50},{folder:"hex-skull",slug:"hex-skull",name:"Hex Skull",blurb:"Hexagonal bone structures, ritual geometry, and stark contrast \u2014 a tight set of cathartic, graphic loops.",coverClipPath:"/loops/hex-skull/HexSkull__ubus__6.mp4",featured:!1,sortOrder:60},{folder:"point-cloud",slug:"point-cloud",name:"Point Cloud",blurb:"Swirling vortices and spiral motion \u2014 hypnotic build energy.",coverClipPath:"/loops/point-cloud/PointCloud__1fjn__25.mp4",featured:!1,sortOrder:70},{folder:"white-hole",slug:"white-hole",name:"White Hole",blurb:"Radial symmetry and center-weighted motion \u2014 portal-like focus.",coverClipPath:"/loops/white-hole/WhiteHole__0dzu__20.mp4",featured:!1,sortOrder:80},{folder:"kissing",slug:"kissing",name:"Kissing",blurb:"",coverClipPath:"",featured:!1,sortOrder:0},{folder:"parvagues",slug:"parvagues",name:"ParVagues",blurb:"Organic waves, coastal abstraction, and fluid color \u2014 the official ParVagues visual playset with 28 seamless loops.",coverClipPath:"/loops/parvagues/ParVagues__spes__5.mp4",featured:!1,sortOrder:0,marketplace:!1},{folder:"slopmotion",slug:"slopmotion",name:"SlopMotion",blurb:"",coverClipPath:"",featured:!1,sortOrder:0},{folder:"test-2",slug:"test-2",name:"test",blurb:"",coverClipPath:"",featured:!1,sortOrder:0},{folder:"test-workflow",slug:"test-workflow",name:"test workflow",blurb:"",coverClipPath:"/loops/test-workflow/test-workflow__lq55__2.mp4",featured:!1,sortOrder:0},{folder:"workflow-test",slug:"workflow-test",name:"workflow test",blurb:"",coverClipPath:"",featured:!1,sortOrder:0},{folder:"rock-solid",slug:"rock-solid",name:"Rock Solid",blurb:"Monumental stone and geological abstraction \u2014 twenty-four seamless monochrome loops of rock faces, mineral grain, and slow tectonic drift.",coverClipPath:"/loops/rock-solid/RockSolid__bn2k__1.mp4",featured:!1,sortOrder:39}];var q_=[{folder:"cosmic-fest-part2",mtime:1787424333271406e-3,videos:[{id:"cosmic-fest-part2-cosmic-fest-part2__51f3eb4f__35",name:"cosmic-fest-part2+e7aq/1",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__51f3eb4f__35.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__4b5fe979__34",name:"cosmic-fest-part2+hd54/2",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__4b5fe979__34.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__3ef3e7e5__33",name:"cosmic-fest-part2+46c9/3",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__3ef3e7e5__33.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__c4e5a136__32",name:"cosmic-fest-part2+rtsu/4",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__c4e5a136__32.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__5e758a1c__31",name:"cosmic-fest-part2+m7oe/5",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__5e758a1c__31.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__3a6d6755__30",name:"cosmic-fest-part2+ifl4/6",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__3a6d6755__30.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__f174fa9e__29",name:"cosmic-fest-part2+xog5/7",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__f174fa9e__29.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__82f7c53c__28",name:"cosmic-fest-part2+o5bv/8",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__82f7c53c__28.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__7cc5ae0f__27",name:"cosmic-fest-part2+xcz6/9",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__7cc5ae0f__27.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__6aa89eb4__26",name:"cosmic-fest-part2+xg4j/10",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__6aa89eb4__26.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__a54cf185__25",name:"cosmic-fest-part2+43ul/11",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__a54cf185__25.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__c34e406e__24",name:"cosmic-fest-part2+n8ge/12",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__c34e406e__24.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__423dff62__23",name:"cosmic-fest-part2+x5l8/13",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__423dff62__23.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__be73d995__22",name:"cosmic-fest-part2+a7sk/14",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__be73d995__22.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__a3cb0550__21",name:"cosmic-fest-part2+jvfy/15",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__a3cb0550__21.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__bc4b07e6__20",name:"cosmic-fest-part2+u3hx/16",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__bc4b07e6__20.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__648663a6__19",name:"cosmic-fest-part2+jm91/17",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__648663a6__19.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__8b09316f__18",name:"cosmic-fest-part2+8baf/18",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__8b09316f__18.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__7b9980c6__17",name:"cosmic-fest-part2+oqcn/19",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__7b9980c6__17.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__83cd26a3__16",name:"cosmic-fest-part2+cycr/20",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__83cd26a3__16.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__1ad44fd7__15",name:"cosmic-fest-part2+83lc/21",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__1ad44fd7__15.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__4dc8a6fa__14",name:"cosmic-fest-part2+myiv/22",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__4dc8a6fa__14.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__545c0e5f__13",name:"cosmic-fest-part2+bs48/23",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__545c0e5f__13.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__cff17d95__12",name:"cosmic-fest-part2+q8p0/24",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__cff17d95__12.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__11061f49__11",name:"cosmic-fest-part2+yjq1/25",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__11061f49__11.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__7792fb85__10",name:"cosmic-fest-part2+81eo/26",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__7792fb85__10.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__6ad585b1__9",name:"cosmic-fest-part2+t6zp/27",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__6ad585b1__9.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__8005a265__8",name:"cosmic-fest-part2+vjdk/28",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__8005a265__8.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__e85dfebf__7",name:"cosmic-fest-part2+txwo/29",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__e85dfebf__7.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__6c0bbc13__6",name:"cosmic-fest-part2+bprl/30",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__6c0bbc13__6.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__98a43487__5",name:"cosmic-fest-part2+ki0f/31",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__98a43487__5.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__5e9aa536__4",name:"cosmic-fest-part2+zd6v/32",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__5e9aa536__4.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__e2ec20cc__3",name:"cosmic-fest-part2+pmbt/33",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__e2ec20cc__3.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__92b53ebf__2",name:"cosmic-fest-part2+x4ti/34",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__92b53ebf__2.mp4"},{id:"cosmic-fest-part2-cosmic-fest-part2__25429229__1",name:"cosmic-fest-part2+wshc/35",path:"/loops/cosmic-fest-part2/cosmic-fest-part2__25429229__1.mp4"}]},{folder:"cosmic-fest",mtime:17874122249056262e-4,videos:[{id:"cosmic-fest-cosmic-fest__6f636ddd__30",name:"cosmic-fest+wwuy/1",path:"/loops/cosmic-fest/cosmic-fest__6f636ddd__30.mp4"},{id:"cosmic-fest-cosmic-fest__c3b4bd35__29",name:"cosmic-fest+qtbp/2",path:"/loops/cosmic-fest/cosmic-fest__c3b4bd35__29.mp4"},{id:"cosmic-fest-cosmic-fest__c45bbfad__28",name:"cosmic-fest+bj0j/3",path:"/loops/cosmic-fest/cosmic-fest__c45bbfad__28.mp4"},{id:"cosmic-fest-cosmic-fest__1197e251__27",name:"cosmic-fest+baxg/4",path:"/loops/cosmic-fest/cosmic-fest__1197e251__27.mp4"},{id:"cosmic-fest-cosmic-fest__52d31711__26",name:"cosmic-fest+weik/5",path:"/loops/cosmic-fest/cosmic-fest__52d31711__26.mp4"},{id:"cosmic-fest-cosmic-fest__de4b6e3b__25",name:"cosmic-fest+sk3s/6",path:"/loops/cosmic-fest/cosmic-fest__de4b6e3b__25.mp4"},{id:"cosmic-fest-cosmic-fest__7793b932__24",name:"cosmic-fest+b8an/7",path:"/loops/cosmic-fest/cosmic-fest__7793b932__24.mp4"},{id:"cosmic-fest-cosmic-fest__9d20cc2b__23",name:"cosmic-fest+3eqo/8",path:"/loops/cosmic-fest/cosmic-fest__9d20cc2b__23.mp4"},{id:"cosmic-fest-cosmic-fest__33ba2404__22",name:"cosmic-fest+elm0/9",path:"/loops/cosmic-fest/cosmic-fest__33ba2404__22.mp4"},{id:"cosmic-fest-cosmic-fest__2ce83fe3__21",name:"cosmic-fest+jepr/10",path:"/loops/cosmic-fest/cosmic-fest__2ce83fe3__21.mp4"},{id:"cosmic-fest-cosmic-fest__7acdc279__20",name:"cosmic-fest+v4ik/11",path:"/loops/cosmic-fest/cosmic-fest__7acdc279__20.mp4"},{id:"cosmic-fest-cosmic-fest__082414bc__19",name:"cosmic-fest+4b3j/12",path:"/loops/cosmic-fest/cosmic-fest__082414bc__19.mp4"},{id:"cosmic-fest-cosmic-fest__2719623a__18",name:"cosmic-fest+7i9r/13",path:"/loops/cosmic-fest/cosmic-fest__2719623a__18.mp4"},{id:"cosmic-fest-cosmic-fest__7df799a1__17",name:"cosmic-fest+wqta/14",path:"/loops/cosmic-fest/cosmic-fest__7df799a1__17.mp4"},{id:"cosmic-fest-cosmic-fest__47ea1690__16",name:"cosmic-fest+wxaj/15",path:"/loops/cosmic-fest/cosmic-fest__47ea1690__16.mp4"},{id:"cosmic-fest-cosmic-fest__a7938bfe__15",name:"cosmic-fest+3qtw/16",path:"/loops/cosmic-fest/cosmic-fest__a7938bfe__15.mp4"},{id:"cosmic-fest-cosmic-fest__db3150e5__14",name:"cosmic-fest+sbms/17",path:"/loops/cosmic-fest/cosmic-fest__db3150e5__14.mp4"},{id:"cosmic-fest-cosmic-fest__d3031e37__13",name:"cosmic-fest+xica/18",path:"/loops/cosmic-fest/cosmic-fest__d3031e37__13.mp4"},{id:"cosmic-fest-cosmic-fest__8c252b7f__12",name:"cosmic-fest+zfw6/19",path:"/loops/cosmic-fest/cosmic-fest__8c252b7f__12.mp4"},{id:"cosmic-fest-cosmic-fest__f855c8f8__11",name:"cosmic-fest+bf6t/20",path:"/loops/cosmic-fest/cosmic-fest__f855c8f8__11.mp4"},{id:"cosmic-fest-cosmic-fest__ac6657ca__10",name:"cosmic-fest+ifqn/21",path:"/loops/cosmic-fest/cosmic-fest__ac6657ca__10.mp4"},{id:"cosmic-fest-cosmic-fest__cddbdbf4__9",name:"cosmic-fest+xuim/22",path:"/loops/cosmic-fest/cosmic-fest__cddbdbf4__9.mp4"},{id:"cosmic-fest-cosmic-fest__e1fb5f95__8",name:"cosmic-fest+5yka/23",path:"/loops/cosmic-fest/cosmic-fest__e1fb5f95__8.mp4"},{id:"cosmic-fest-cosmic-fest__197ac48f__7",name:"cosmic-fest+hnvq/24",path:"/loops/cosmic-fest/cosmic-fest__197ac48f__7.mp4"},{id:"cosmic-fest-cosmic-fest__cd54b47e__6",name:"cosmic-fest+37nd/25",path:"/loops/cosmic-fest/cosmic-fest__cd54b47e__6.mp4"},{id:"cosmic-fest-cosmic-fest__9373bc90__5",name:"cosmic-fest+mdk8/26",path:"/loops/cosmic-fest/cosmic-fest__9373bc90__5.mp4"},{id:"cosmic-fest-cosmic-fest__6c94be28__4",name:"cosmic-fest+s08e/27",path:"/loops/cosmic-fest/cosmic-fest__6c94be28__4.mp4"},{id:"cosmic-fest-cosmic-fest__3bedbc11__3",name:"cosmic-fest+fpct/28",path:"/loops/cosmic-fest/cosmic-fest__3bedbc11__3.mp4"},{id:"cosmic-fest-cosmic-fest__515ae64e__2",name:"cosmic-fest+5mh0/29",path:"/loops/cosmic-fest/cosmic-fest__515ae64e__2.mp4"},{id:"cosmic-fest-cosmic-fest__94571316__1",name:"cosmic-fest+3fgn/30",path:"/loops/cosmic-fest/cosmic-fest__94571316__1.mp4"}]},{folder:"trip-70s",mtime:17860389555792869e-4,videos:[{id:"trip-70s-trip-70s__f3f21a4c__28",name:"trip-70s+lnt5/1",path:"/loops/trip-70s/trip-70s__f3f21a4c__28.mp4"},{id:"trip-70s-trip-70s__cd4ab4f6__27",name:"trip-70s+yg5r/2",path:"/loops/trip-70s/trip-70s__cd4ab4f6__27.mp4"},{id:"trip-70s-trip-70s__a22116d2__26",name:"trip-70s+at1h/3",path:"/loops/trip-70s/trip-70s__a22116d2__26.mp4"},{id:"trip-70s-trip-70s__f059f91b__25",name:"trip-70s+ucke/4",path:"/loops/trip-70s/trip-70s__f059f91b__25.mp4"},{id:"trip-70s-trip-70s__415ce1af__24",name:"trip-70s+kl1g/5",path:"/loops/trip-70s/trip-70s__415ce1af__24.mp4"},{id:"trip-70s-trip-70s__6254b979__23",name:"trip-70s+2ii3/6",path:"/loops/trip-70s/trip-70s__6254b979__23.mp4"},{id:"trip-70s-trip-70s__3a7a22a1__22",name:"trip-70s+yrnw/7",path:"/loops/trip-70s/trip-70s__3a7a22a1__22.mp4"},{id:"trip-70s-trip-70s__8944e658__21",name:"trip-70s+gb6c/8",path:"/loops/trip-70s/trip-70s__8944e658__21.mp4"},{id:"trip-70s-trip-70s__e45a0dde__20",name:"trip-70s+i380/9",path:"/loops/trip-70s/trip-70s__e45a0dde__20.mp4"},{id:"trip-70s-trip-70s__a7d1ca7a__19",name:"trip-70s+dnp0/10",path:"/loops/trip-70s/trip-70s__a7d1ca7a__19.mp4"},{id:"trip-70s-trip-70s__4d884482__18",name:"trip-70s+e58k/11",path:"/loops/trip-70s/trip-70s__4d884482__18.mp4"},{id:"trip-70s-trip-70s__df573fe0__17",name:"trip-70s+3oi9/12",path:"/loops/trip-70s/trip-70s__df573fe0__17.mp4"},{id:"trip-70s-trip-70s__d5250d0c__16",name:"trip-70s+3ncu/13",path:"/loops/trip-70s/trip-70s__d5250d0c__16.mp4"},{id:"trip-70s-trip-70s__7198d72f__15",name:"trip-70s+8uhd/14",path:"/loops/trip-70s/trip-70s__7198d72f__15.mp4"},{id:"trip-70s-trip-70s__a4540ef7__14",name:"trip-70s+scot/15",path:"/loops/trip-70s/trip-70s__a4540ef7__14.mp4"},{id:"trip-70s-trip-70s__18eb72be__13",name:"trip-70s+6bk9/16",path:"/loops/trip-70s/trip-70s__18eb72be__13.mp4"},{id:"trip-70s-trip-70s__28b4d6b4__12",name:"trip-70s+gorj/17",path:"/loops/trip-70s/trip-70s__28b4d6b4__12.mp4"},{id:"trip-70s-trip-70s__c9cc51da__11",name:"trip-70s+rgo9/18",path:"/loops/trip-70s/trip-70s__c9cc51da__11.mp4"},{id:"trip-70s-trip-70s__384d524e__10",name:"trip-70s+xn6w/19",path:"/loops/trip-70s/trip-70s__384d524e__10.mp4"},{id:"trip-70s-trip-70s__ceaccdb4__9",name:"trip-70s+h01k/20",path:"/loops/trip-70s/trip-70s__ceaccdb4__9.mp4"},{id:"trip-70s-trip-70s__1fc39561__8",name:"trip-70s+zd18/21",path:"/loops/trip-70s/trip-70s__1fc39561__8.mp4"},{id:"trip-70s-trip-70s__3ff52a3d__7",name:"trip-70s+vi7l/22",path:"/loops/trip-70s/trip-70s__3ff52a3d__7.mp4"},{id:"trip-70s-trip-70s__2072dad2__6",name:"trip-70s+ig7u/23",path:"/loops/trip-70s/trip-70s__2072dad2__6.mp4"},{id:"trip-70s-trip-70s__cf5bb90f__5",name:"trip-70s+dak5/24",path:"/loops/trip-70s/trip-70s__cf5bb90f__5.mp4"},{id:"trip-70s-trip-70s__9087de5e__4",name:"trip-70s+ukl6/25",path:"/loops/trip-70s/trip-70s__9087de5e__4.mp4"},{id:"trip-70s-trip-70s__7e36109e__3",name:"trip-70s+1e3e/26",path:"/loops/trip-70s/trip-70s__7e36109e__3.mp4"},{id:"trip-70s-trip-70s__d990ad96__2",name:"trip-70s+97vl/27",path:"/loops/trip-70s/trip-70s__d990ad96__2.mp4"},{id:"trip-70s-trip-70s__3eaf07e7__1",name:"trip-70s+c02d/28",path:"/loops/trip-70s/trip-70s__3eaf07e7__1.mp4"}]},{folder:"watching-you",mtime:1784283218296949e-3,videos:[{id:"watching-you-watching-you__8b6c0791__12",name:"watching-you+rqdj/1",path:"/loops/watching-you/watching-you__8b6c0791__12.mp4"},{id:"watching-you-watching-you__7700f1e2__11",name:"watching-you+xrwx/2",path:"/loops/watching-you/watching-you__7700f1e2__11.mp4"},{id:"watching-you-watching-you__bc676173__10",name:"watching-you+6412/3",path:"/loops/watching-you/watching-you__bc676173__10.mp4"},{id:"watching-you-watching-you__360449c8__9",name:"watching-you+pjd9/4",path:"/loops/watching-you/watching-you__360449c8__9.mp4"},{id:"watching-you-watching-you__7fdcde8d__8",name:"watching-you+c83w/5",path:"/loops/watching-you/watching-you__7fdcde8d__8.mp4"},{id:"watching-you-watching-you__e476c3d2__7",name:"watching-you+y7ed/6",path:"/loops/watching-you/watching-you__e476c3d2__7.mp4"},{id:"watching-you-watching-you__f630c721__6",name:"watching-you+a4my/7",path:"/loops/watching-you/watching-you__f630c721__6.mp4"},{id:"watching-you-watching-you__dec07267__5",name:"watching-you+1a7p/8",path:"/loops/watching-you/watching-you__dec07267__5.mp4"},{id:"watching-you-watching-you__ae60bb23__4",name:"watching-you+683c/9",path:"/loops/watching-you/watching-you__ae60bb23__4.mp4"},{id:"watching-you-watching-you__6f58dc96__3",name:"watching-you+scaq/10",path:"/loops/watching-you/watching-you__6f58dc96__3.mp4"},{id:"watching-you-watching-you__eac82da6__2",name:"watching-you+r5v7/11",path:"/loops/watching-you/watching-you__eac82da6__2.mp4"},{id:"watching-you-watching-you__43546912__1",name:"watching-you+yu6u/12",path:"/loops/watching-you/watching-you__43546912__1.mp4"}]},{folder:"urban",mtime:17842831197039736e-4,videos:[{id:"urban-urban__2589777a__7",name:"urban+301o/1",path:"/loops/urban/urban__2589777a__7.mp4"},{id:"urban-urban__9b98926e__6",name:"urban+wc1a/2",path:"/loops/urban/urban__9b98926e__6.mp4"},{id:"urban-urban__9073d6ed__5",name:"urban+28rc/3",path:"/loops/urban/urban__9073d6ed__5.mp4"},{id:"urban-urban__34b37b7e__4",name:"urban+29v6/4",path:"/loops/urban/urban__34b37b7e__4.mp4"},{id:"urban-urban__8d2f5332__3",name:"urban+5df6/5",path:"/loops/urban/urban__8d2f5332__3.mp4"},{id:"urban-urban__f924bb32__2",name:"urban+orkt/6",path:"/loops/urban/urban__f924bb32__2.mp4"},{id:"urban-urban__1e810dd6__1",name:"urban+e4cp/7",path:"/loops/urban/urban__1e810dd6__1.mp4"}]},{folder:"geometrics",mtime:17842830736550317e-4,videos:[{id:"geometrics-geometrics__76e660e8__33",name:"geometrics+jal3/1",path:"/loops/geometrics/geometrics__76e660e8__33.mp4"},{id:"geometrics-geometrics__80b26b0a__32",name:"geometrics+5cx9/2",path:"/loops/geometrics/geometrics__80b26b0a__32.mp4"},{id:"geometrics-geometrics__4dac5da2__31",name:"geometrics+6kx7/3",path:"/loops/geometrics/geometrics__4dac5da2__31.mp4"},{id:"geometrics-geometrics__3648689e__30",name:"geometrics+7jvh/4",path:"/loops/geometrics/geometrics__3648689e__30.mp4"},{id:"geometrics-geometrics__d1372612__29",name:"geometrics+hyzt/5",path:"/loops/geometrics/geometrics__d1372612__29.mp4"},{id:"geometrics-geometrics__bd4231fb__28",name:"geometrics+809w/6",path:"/loops/geometrics/geometrics__bd4231fb__28.mp4"},{id:"geometrics-geometrics__ad2dff91__27",name:"geometrics+6bz2/7",path:"/loops/geometrics/geometrics__ad2dff91__27.mp4"},{id:"geometrics-geometrics__1911963f__26",name:"geometrics+9bhx/8",path:"/loops/geometrics/geometrics__1911963f__26.mp4"},{id:"geometrics-geometrics__59669891__25",name:"geometrics+evii/9",path:"/loops/geometrics/geometrics__59669891__25.mp4"},{id:"geometrics-geometrics__2328a795__24",name:"geometrics+m6tl/10",path:"/loops/geometrics/geometrics__2328a795__24.mp4"},{id:"geometrics-geometrics__409d885c__23",name:"geometrics+pzk5/11",path:"/loops/geometrics/geometrics__409d885c__23.mp4"},{id:"geometrics-geometrics__480d9850__22",name:"geometrics+jhxu/12",path:"/loops/geometrics/geometrics__480d9850__22.mp4"},{id:"geometrics-geometrics__9dab3b35__21",name:"geometrics+cpae/13",path:"/loops/geometrics/geometrics__9dab3b35__21.mp4"},{id:"geometrics-geometrics__dce42d29__20",name:"geometrics+89zz/14",path:"/loops/geometrics/geometrics__dce42d29__20.mp4"},{id:"geometrics-geometrics__5d795f9d__19",name:"geometrics+je3x/15",path:"/loops/geometrics/geometrics__5d795f9d__19.mp4"},{id:"geometrics-geometrics__b2e05a94__18",name:"geometrics+moyz/16",path:"/loops/geometrics/geometrics__b2e05a94__18.mp4"},{id:"geometrics-geometrics__ba45a75e__17",name:"geometrics+lc8y/17",path:"/loops/geometrics/geometrics__ba45a75e__17.mp4"},{id:"geometrics-geometrics__88f5cff8__16",name:"geometrics+z1qz/18",path:"/loops/geometrics/geometrics__88f5cff8__16.mp4"},{id:"geometrics-geometrics__bacacab2__15",name:"geometrics+3pvc/19",path:"/loops/geometrics/geometrics__bacacab2__15.mp4"},{id:"geometrics-geometrics__c2618799__14",name:"geometrics+frnk/20",path:"/loops/geometrics/geometrics__c2618799__14.mp4"},{id:"geometrics-geometrics__a748e860__13",name:"geometrics+c19p/21",path:"/loops/geometrics/geometrics__a748e860__13.mp4"},{id:"geometrics-geometrics__b251e6da__12",name:"geometrics+uf7v/22",path:"/loops/geometrics/geometrics__b251e6da__12.mp4"},{id:"geometrics-geometrics__d6e620a2__11",name:"geometrics+z9ua/23",path:"/loops/geometrics/geometrics__d6e620a2__11.mp4"},{id:"geometrics-geometrics__9dcedb42__10",name:"geometrics+twj4/24",path:"/loops/geometrics/geometrics__9dcedb42__10.mp4"},{id:"geometrics-geometrics__dff4f7aa__9",name:"geometrics+2wx0/25",path:"/loops/geometrics/geometrics__dff4f7aa__9.mp4"},{id:"geometrics-geometrics__6e31dc95__8",name:"geometrics+etiy/26",path:"/loops/geometrics/geometrics__6e31dc95__8.mp4"},{id:"geometrics-geometrics__93302821__7",name:"geometrics+n6ar/27",path:"/loops/geometrics/geometrics__93302821__7.mp4"},{id:"geometrics-geometrics__3529644d__6",name:"geometrics+mayv/28",path:"/loops/geometrics/geometrics__3529644d__6.mp4"},{id:"geometrics-geometrics__c8ae3fed__5",name:"geometrics+pmha/29",path:"/loops/geometrics/geometrics__c8ae3fed__5.mp4"},{id:"geometrics-geometrics__bc2d0a84__4",name:"geometrics+oxqp/30",path:"/loops/geometrics/geometrics__bc2d0a84__4.mp4"},{id:"geometrics-geometrics__02936f8a__3",name:"geometrics+9ub2/31",path:"/loops/geometrics/geometrics__02936f8a__3.mp4"},{id:"geometrics-geometrics__72f87db8__2",name:"geometrics+2bws/32",path:"/loops/geometrics/geometrics__72f87db8__2.mp4"},{id:"geometrics-geometrics__f08b2423__1",name:"geometrics+qcm9/33",path:"/loops/geometrics/geometrics__f08b2423__1.mp4"}]},{folder:"birds",mtime:17842441037219539e-4,videos:[{id:"birds-birds__e817ad00__22",name:"birds+izli/1",path:"/loops/birds/birds__e817ad00__22.mp4"},{id:"birds-birds__316ff5fb__21",name:"birds+i7ge/2",path:"/loops/birds/birds__316ff5fb__21.mp4"},{id:"birds-birds__77ba84c9__20",name:"birds+xtqu/3",path:"/loops/birds/birds__77ba84c9__20.mp4"},{id:"birds-birds__d920d67a__19",name:"birds+ymej/4",path:"/loops/birds/birds__d920d67a__19.mp4"},{id:"birds-birds__a66dce2c__18",name:"birds+wpv2/5",path:"/loops/birds/birds__a66dce2c__18.mp4"},{id:"birds-birds__46ec8966__17",name:"birds+fdec/6",path:"/loops/birds/birds__46ec8966__17.mp4"},{id:"birds-birds__df0f2b7c__16",name:"birds+5c57/7",path:"/loops/birds/birds__df0f2b7c__16.mp4"},{id:"birds-birds__a321100c__15",name:"birds+8vlu/8",path:"/loops/birds/birds__a321100c__15.mp4"},{id:"birds-birds__2cdbf1c5__14",name:"birds+xnl0/9",path:"/loops/birds/birds__2cdbf1c5__14.mp4"},{id:"birds-birds__ac159978__13",name:"birds+4sxn/10",path:"/loops/birds/birds__ac159978__13.mp4"},{id:"birds-birds__b1be3b98__12",name:"birds+59hl/11",path:"/loops/birds/birds__b1be3b98__12.mp4"},{id:"birds-birds__63e00389__10",name:"birds+n0j5/12",path:"/loops/birds/birds__63e00389__10.mp4"},{id:"birds-birds__9ece6cb2__9",name:"birds+m7ho/13",path:"/loops/birds/birds__9ece6cb2__9.mp4"},{id:"birds-birds__7da74bbf__8",name:"birds+bd2v/14",path:"/loops/birds/birds__7da74bbf__8.mp4"},{id:"birds-birds__63be486e__7",name:"birds+s6m3/15",path:"/loops/birds/birds__63be486e__7.mp4"},{id:"birds-birds__4fbab08a__6",name:"birds+urjc/16",path:"/loops/birds/birds__4fbab08a__6.mp4"},{id:"birds-birds__c5855e9c__5",name:"birds+2ogf/17",path:"/loops/birds/birds__c5855e9c__5.mp4"},{id:"birds-birds__063bc1f2__4",name:"birds+1t82/18",path:"/loops/birds/birds__063bc1f2__4.mp4"},{id:"birds-birds__0c2bbe52__3",name:"birds+wffi/19",path:"/loops/birds/birds__0c2bbe52__3.mp4"},{id:"birds-birds__d03b31d9__2",name:"birds+hvyd/20",path:"/loops/birds/birds__d03b31d9__2.mp4"},{id:"birds-birds__bafe82be__1",name:"birds+vfx1/21",path:"/loops/birds/birds__bafe82be__1.mp4"}]},{folder:"bauhauss",mtime:17834063769685593e-4,videos:[{id:"bauhauss-bauhauss__59302218__28",name:"bauhauss+81bx/1",path:"/loops/bauhauss/bauhauss__59302218__28.mp4"},{id:"bauhauss-bauhauss__34ed760a__27",name:"bauhauss+e7g7/2",path:"/loops/bauhauss/bauhauss__34ed760a__27.mp4"},{id:"bauhauss-bauhauss__ca3e950c__26",name:"bauhauss+i8cy/3",path:"/loops/bauhauss/bauhauss__ca3e950c__26.mp4"},{id:"bauhauss-bauhauss__a28c593a__25",name:"bauhauss+43e7/4",path:"/loops/bauhauss/bauhauss__a28c593a__25.mp4"},{id:"bauhauss-bauhauss__8bace3ca__24",name:"bauhauss+ssr9/5",path:"/loops/bauhauss/bauhauss__8bace3ca__24.mp4"},{id:"bauhauss-bauhauss__92fbf07f__23",name:"bauhauss+lef7/6",path:"/loops/bauhauss/bauhauss__92fbf07f__23.mp4"},{id:"bauhauss-bauhauss__cb6df66e__22",name:"bauhauss+qj0q/7",path:"/loops/bauhauss/bauhauss__cb6df66e__22.mp4"},{id:"bauhauss-bauhauss__400b4a60__21",name:"bauhauss+mhdb/8",path:"/loops/bauhauss/bauhauss__400b4a60__21.mp4"},{id:"bauhauss-bauhauss__55437e5a__20",name:"bauhauss+x3lk/9",path:"/loops/bauhauss/bauhauss__55437e5a__20.mp4"},{id:"bauhauss-bauhauss__999dca98__19",name:"bauhauss+t77q/10",path:"/loops/bauhauss/bauhauss__999dca98__19.mp4"},{id:"bauhauss-bauhauss__8eb01dcb__18",name:"bauhauss+xuhq/11",path:"/loops/bauhauss/bauhauss__8eb01dcb__18.mp4"},{id:"bauhauss-bauhauss__3b2e0d23__17",name:"bauhauss+61e5/12",path:"/loops/bauhauss/bauhauss__3b2e0d23__17.mp4"},{id:"bauhauss-bauhauss__8d817158__16",name:"bauhauss+oihw/13",path:"/loops/bauhauss/bauhauss__8d817158__16.mp4"},{id:"bauhauss-bauhauss__7cff14ff__15",name:"bauhauss+2z1m/14",path:"/loops/bauhauss/bauhauss__7cff14ff__15.mp4"},{id:"bauhauss-bauhauss__129362d0__14",name:"bauhauss+9xwg/15",path:"/loops/bauhauss/bauhauss__129362d0__14.mp4"},{id:"bauhauss-bauhauss__31591deb__13",name:"bauhauss+wbtt/16",path:"/loops/bauhauss/bauhauss__31591deb__13.mp4"},{id:"bauhauss-bauhauss__d39c518e__12",name:"bauhauss+hiwo/17",path:"/loops/bauhauss/bauhauss__d39c518e__12.mp4"},{id:"bauhauss-bauhauss__a86cbb76__11",name:"bauhauss+rj80/18",path:"/loops/bauhauss/bauhauss__a86cbb76__11.mp4"},{id:"bauhauss-bauhauss__54c131a5__10",name:"bauhauss+5p37/19",path:"/loops/bauhauss/bauhauss__54c131a5__10.mp4"},{id:"bauhauss-bauhauss__93bbef5d__9",name:"bauhauss+zgv0/20",path:"/loops/bauhauss/bauhauss__93bbef5d__9.mp4"},{id:"bauhauss-bauhauss__92ee5847__8",name:"bauhauss+ankh/21",path:"/loops/bauhauss/bauhauss__92ee5847__8.mp4"},{id:"bauhauss-bauhauss__8fb871c2__7",name:"bauhauss+6oiu/22",path:"/loops/bauhauss/bauhauss__8fb871c2__7.mp4"},{id:"bauhauss-bauhauss__ff19e1f7__6",name:"bauhauss+3jul/23",path:"/loops/bauhauss/bauhauss__ff19e1f7__6.mp4"},{id:"bauhauss-bauhauss__43f374a6__5",name:"bauhauss+t10n/24",path:"/loops/bauhauss/bauhauss__43f374a6__5.mp4"},{id:"bauhauss-bauhauss__748b4042__4",name:"bauhauss+os0e/25",path:"/loops/bauhauss/bauhauss__748b4042__4.mp4"},{id:"bauhauss-bauhauss__56439478__3",name:"bauhauss+xhkn/26",path:"/loops/bauhauss/bauhauss__56439478__3.mp4"},{id:"bauhauss-bauhauss__12ac19d3__2",name:"bauhauss+45vd/27",path:"/loops/bauhauss/bauhauss__12ac19d3__2.mp4"},{id:"bauhauss-bauhauss__d316c2a3__1",name:"bauhauss+uonm/28",path:"/loops/bauhauss/bauhauss__d316c2a3__1.mp4"}]},{folder:"flowers",mtime:17834062066176428e-4,videos:[{id:"flowers-flowers__a2613e56__26",name:"flowers+2v4l/1",path:"/loops/flowers/flowers__a2613e56__26.mp4"},{id:"flowers-flowers__3752b21e__25",name:"flowers+x593/2",path:"/loops/flowers/flowers__3752b21e__25.mp4"},{id:"flowers-flowers__83a0c0cb__24",name:"flowers+iyxt/3",path:"/loops/flowers/flowers__83a0c0cb__24.mp4"},{id:"flowers-flowers__ffb45c7e__23",name:"flowers+o4q9/4",path:"/loops/flowers/flowers__ffb45c7e__23.mp4"},{id:"flowers-flowers__9229b410__22",name:"flowers+o5bp/5",path:"/loops/flowers/flowers__9229b410__22.mp4"},{id:"flowers-flowers__43384039__21",name:"flowers+p0qu/6",path:"/loops/flowers/flowers__43384039__21.mp4"},{id:"flowers-flowers__ac65297b__20",name:"flowers+iri7/7",path:"/loops/flowers/flowers__ac65297b__20.mp4"},{id:"flowers-flowers__15ec9706__19",name:"flowers+zi1p/8",path:"/loops/flowers/flowers__15ec9706__19.mp4"},{id:"flowers-flowers__8db2bb11__18",name:"flowers+bqjz/9",path:"/loops/flowers/flowers__8db2bb11__18.mp4"},{id:"flowers-flowers__45b07706__17",name:"flowers+5p6j/10",path:"/loops/flowers/flowers__45b07706__17.mp4"},{id:"flowers-flowers__34f4b75d__16",name:"flowers+oye1/11",path:"/loops/flowers/flowers__34f4b75d__16.mp4"},{id:"flowers-flowers__32552e91__15",name:"flowers+gttj/12",path:"/loops/flowers/flowers__32552e91__15.mp4"},{id:"flowers-flowers__24e77c7e__14",name:"flowers+x48j/13",path:"/loops/flowers/flowers__24e77c7e__14.mp4"},{id:"flowers-flowers__1f6fb983__13",name:"flowers+mipz/14",path:"/loops/flowers/flowers__1f6fb983__13.mp4"},{id:"flowers-flowers__b8789b0f__12",name:"flowers+7xa4/15",path:"/loops/flowers/flowers__b8789b0f__12.mp4"},{id:"flowers-flowers__d7c3737a__11",name:"flowers+aobr/16",path:"/loops/flowers/flowers__d7c3737a__11.mp4"},{id:"flowers-flowers__e05d04a3__10",name:"flowers+ak3x/17",path:"/loops/flowers/flowers__e05d04a3__10.mp4"},{id:"flowers-flowers__c0ee3ca0__9",name:"flowers+7t9u/18",path:"/loops/flowers/flowers__c0ee3ca0__9.mp4"},{id:"flowers-flowers__032761fd__8",name:"flowers+105z/19",path:"/loops/flowers/flowers__032761fd__8.mp4"},{id:"flowers-flowers__a1634d14__7",name:"flowers+pc4v/20",path:"/loops/flowers/flowers__a1634d14__7.mp4"},{id:"flowers-flowers__252a3753__6",name:"flowers+upsf/21",path:"/loops/flowers/flowers__252a3753__6.mp4"},{id:"flowers-flowers__9a77c728__5",name:"flowers+mdoj/22",path:"/loops/flowers/flowers__9a77c728__5.mp4"},{id:"flowers-flowers__fb06641f__4",name:"flowers+yxj5/23",path:"/loops/flowers/flowers__fb06641f__4.mp4"},{id:"flowers-flowers__4cfc399d__3",name:"flowers+ntje/24",path:"/loops/flowers/flowers__4cfc399d__3.mp4"},{id:"flowers-flowers__1ae400cc__2",name:"flowers+h2sn/25",path:"/loops/flowers/flowers__1ae400cc__2.mp4"},{id:"flowers-flowers__af31a73b__1",name:"flowers+mjr3/26",path:"/loops/flowers/flowers__af31a73b__1.mp4"}]},{folder:"explosion",mtime:17834058387050466e-4,videos:[{id:"explosion-explosion__a758ebd1__24",name:"explosion+avip/1",path:"/loops/explosion/explosion__a758ebd1__24.mp4"},{id:"explosion-explosion__983962d0__23",name:"explosion+ycdk/2",path:"/loops/explosion/explosion__983962d0__23.mp4"},{id:"explosion-explosion__4f856c8a__22",name:"explosion+buq2/3",path:"/loops/explosion/explosion__4f856c8a__22.mp4"},{id:"explosion-explosion__0e480b6a__21",name:"explosion+vrfm/4",path:"/loops/explosion/explosion__0e480b6a__21.mp4"},{id:"explosion-explosion__558d26a9__20",name:"explosion+290a/5",path:"/loops/explosion/explosion__558d26a9__20.mp4"},{id:"explosion-explosion__fc9e11e4__19",name:"explosion+5uan/6",path:"/loops/explosion/explosion__fc9e11e4__19.mp4"},{id:"explosion-explosion__a4ccbdfa__18",name:"explosion+xtj6/7",path:"/loops/explosion/explosion__a4ccbdfa__18.mp4"},{id:"explosion-explosion__3de74ff1__17",name:"explosion+t2i4/8",path:"/loops/explosion/explosion__3de74ff1__17.mp4"},{id:"explosion-explosion__a9788100__16",name:"explosion+v44p/9",path:"/loops/explosion/explosion__a9788100__16.mp4"},{id:"explosion-explosion__65787603__15",name:"explosion+875q/10",path:"/loops/explosion/explosion__65787603__15.mp4"},{id:"explosion-explosion__39ecd4a8__14",name:"explosion+9np7/11",path:"/loops/explosion/explosion__39ecd4a8__14.mp4"},{id:"explosion-explosion__c7e91ed4__13",name:"explosion+7sdf/12",path:"/loops/explosion/explosion__c7e91ed4__13.mp4"},{id:"explosion-explosion__ae40cf40__12",name:"explosion+bdly/13",path:"/loops/explosion/explosion__ae40cf40__12.mp4"},{id:"explosion-explosion__5130348f__11",name:"explosion+z86n/14",path:"/loops/explosion/explosion__5130348f__11.mp4"},{id:"explosion-explosion__fba981b6__10",name:"explosion+x6zf/15",path:"/loops/explosion/explosion__fba981b6__10.mp4"},{id:"explosion-explosion__8a409270__9",name:"explosion+8ir3/16",path:"/loops/explosion/explosion__8a409270__9.mp4"},{id:"explosion-explosion__9db31fce__8",name:"explosion+1mt8/17",path:"/loops/explosion/explosion__9db31fce__8.mp4"},{id:"explosion-explosion__1103fe05__7",name:"explosion+yso0/18",path:"/loops/explosion/explosion__1103fe05__7.mp4"},{id:"explosion-explosion__2edfaa74__6",name:"explosion+qqhd/19",path:"/loops/explosion/explosion__2edfaa74__6.mp4"},{id:"explosion-explosion__1dd9558f__5",name:"explosion+nalg/20",path:"/loops/explosion/explosion__1dd9558f__5.mp4"},{id:"explosion-explosion__223659ef__4",name:"explosion+l8lb/21",path:"/loops/explosion/explosion__223659ef__4.mp4"},{id:"explosion-explosion__4f6d8559__3",name:"explosion+n8ge/22",path:"/loops/explosion/explosion__4f6d8559__3.mp4"},{id:"explosion-explosion__853a0f8b__2",name:"explosion+6lxl/23",path:"/loops/explosion/explosion__853a0f8b__2.mp4"},{id:"explosion-explosion__9ecfe1ba__1",name:"explosion+bq68/24",path:"/loops/explosion/explosion__9ecfe1ba__1.mp4"}]},{folder:"dev-tools",mtime:17826307837767896e-4,videos:[{id:"dev-tools-dev-tools__87141af8__8",name:"dev-tools+c4lt/1",path:"/loops/dev-tools/dev-tools__87141af8__8.mp4"},{id:"dev-tools-dev-tools__7472c164__7",name:"dev-tools+vifb/2",path:"/loops/dev-tools/dev-tools__7472c164__7.mp4"},{id:"dev-tools-dev-tools__5dd93e50__6",name:"dev-tools+b9ol/3",path:"/loops/dev-tools/dev-tools__5dd93e50__6.mp4"},{id:"dev-tools-dev-tools__71beeebf__5",name:"dev-tools+4bh2/4",path:"/loops/dev-tools/dev-tools__71beeebf__5.mp4"},{id:"dev-tools-dev-tools__e4e1985a__4",name:"dev-tools+wu2y/5",path:"/loops/dev-tools/dev-tools__e4e1985a__4.mp4"},{id:"dev-tools-dev-tools__c4f72219__3",name:"dev-tools+xkfl/6",path:"/loops/dev-tools/dev-tools__c4f72219__3.mp4"},{id:"dev-tools-dev-tools__d9b1616d__2",name:"dev-tools+71lm/7",path:"/loops/dev-tools/dev-tools__d9b1616d__2.mp4"},{id:"dev-tools-dev-tools__e6af03c0__1",name:"dev-tools+azxf/8",path:"/loops/dev-tools/dev-tools__e6af03c0__1.mp4"}]},{folder:"cymatics",mtime:17825878130176125e-4,videos:[{id:"cymatics-cymatics__e4f4b931__35",name:"cymatics+4ibt/1",path:"/loops/cymatics/cymatics__e4f4b931__35.mp4"},{id:"cymatics-cymatics__659b436a__34",name:"cymatics+cu33/2",path:"/loops/cymatics/cymatics__659b436a__34.mp4"},{id:"cymatics-cymatics__7f0fa04d__33",name:"cymatics+8oet/3",path:"/loops/cymatics/cymatics__7f0fa04d__33.mp4"},{id:"cymatics-cymatics__c8371850__32",name:"cymatics+osne/4",path:"/loops/cymatics/cymatics__c8371850__32.mp4"},{id:"cymatics-cymatics__c050c34c__31",name:"cymatics+ipq2/5",path:"/loops/cymatics/cymatics__c050c34c__31.mp4"},{id:"cymatics-cymatics__1f84e25e__30",name:"cymatics+8x4m/6",path:"/loops/cymatics/cymatics__1f84e25e__30.mp4"},{id:"cymatics-cymatics__99dc19ca__29",name:"cymatics+53s6/7",path:"/loops/cymatics/cymatics__99dc19ca__29.mp4"},{id:"cymatics-cymatics__0ee76078__28",name:"cymatics+odsu/8",path:"/loops/cymatics/cymatics__0ee76078__28.mp4"},{id:"cymatics-cymatics__6faad741__27",name:"cymatics+uqwc/9",path:"/loops/cymatics/cymatics__6faad741__27.mp4"},{id:"cymatics-cymatics__bb8ab772__26",name:"cymatics+g75e/10",path:"/loops/cymatics/cymatics__bb8ab772__26.mp4"},{id:"cymatics-cymatics__9c421654__25",name:"cymatics+7nr2/11",path:"/loops/cymatics/cymatics__9c421654__25.mp4"},{id:"cymatics-cymatics__68aedb0e__24",name:"cymatics+mvg7/12",path:"/loops/cymatics/cymatics__68aedb0e__24.mp4"},{id:"cymatics-cymatics__79efc350__23",name:"cymatics+jlhc/13",path:"/loops/cymatics/cymatics__79efc350__23.mp4"},{id:"cymatics-cymatics__296d6ba2__22",name:"cymatics+883r/14",path:"/loops/cymatics/cymatics__296d6ba2__22.mp4"},{id:"cymatics-cymatics__daafb681__21",name:"cymatics+3086/15",path:"/loops/cymatics/cymatics__daafb681__21.mp4"},{id:"cymatics-cymatics__9a5ce667__20",name:"cymatics+dssm/16",path:"/loops/cymatics/cymatics__9a5ce667__20.mp4"},{id:"cymatics-cymatics__768f0ab3__19",name:"cymatics+9r29/17",path:"/loops/cymatics/cymatics__768f0ab3__19.mp4"},{id:"cymatics-cymatics__3e2ef7f0__18",name:"cymatics+87rj/18",path:"/loops/cymatics/cymatics__3e2ef7f0__18.mp4"},{id:"cymatics-cymatics__983631b1__17",name:"cymatics+et1p/19",path:"/loops/cymatics/cymatics__983631b1__17.mp4"},{id:"cymatics-cymatics__34391f8d__16",name:"cymatics+wv8p/20",path:"/loops/cymatics/cymatics__34391f8d__16.mp4"},{id:"cymatics-cymatics__d8d600ee__15",name:"cymatics+pt0l/21",path:"/loops/cymatics/cymatics__d8d600ee__15.mp4"},{id:"cymatics-cymatics__248c8113__14",name:"cymatics+xtou/22",path:"/loops/cymatics/cymatics__248c8113__14.mp4"},{id:"cymatics-cymatics__e672f145__13",name:"cymatics+29qf/23",path:"/loops/cymatics/cymatics__e672f145__13.mp4"},{id:"cymatics-cymatics__d6e293a8__12",name:"cymatics+g060/24",path:"/loops/cymatics/cymatics__d6e293a8__12.mp4"},{id:"cymatics-cymatics__3f5e5b40__11",name:"cymatics+kxv4/25",path:"/loops/cymatics/cymatics__3f5e5b40__11.mp4"},{id:"cymatics-cymatics__2c89d827__10",name:"cymatics+voon/26",path:"/loops/cymatics/cymatics__2c89d827__10.mp4"},{id:"cymatics-cymatics__5a91e98a__9",name:"cymatics+347j/27",path:"/loops/cymatics/cymatics__5a91e98a__9.mp4"},{id:"cymatics-cymatics__e9c9a3ad__8",name:"cymatics+ejwy/28",path:"/loops/cymatics/cymatics__e9c9a3ad__8.mp4"},{id:"cymatics-cymatics__a354fa5f__7",name:"cymatics+foig/29",path:"/loops/cymatics/cymatics__a354fa5f__7.mp4"},{id:"cymatics-cymatics__c0769b9e__6",name:"cymatics+7p2b/30",path:"/loops/cymatics/cymatics__c0769b9e__6.mp4"},{id:"cymatics-cymatics__25e5d81f__5",name:"cymatics+pxyy/31",path:"/loops/cymatics/cymatics__25e5d81f__5.mp4"},{id:"cymatics-cymatics__b986ee97__4",name:"cymatics+e8j5/32",path:"/loops/cymatics/cymatics__b986ee97__4.mp4"},{id:"cymatics-cymatics__d6c1fc9d__3",name:"cymatics+75tf/33",path:"/loops/cymatics/cymatics__d6c1fc9d__3.mp4"},{id:"cymatics-cymatics__9bb45708__2",name:"cymatics+utlq/34",path:"/loops/cymatics/cymatics__9bb45708__2.mp4"},{id:"cymatics-cymatics__4b55a5c4__1",name:"cymatics+qzgn/35",path:"/loops/cymatics/cymatics__4b55a5c4__1.mp4"}]},{folder:"slim-mold",mtime:17822188799929941e-4,videos:[{id:"slim-mold-slim-mold__28b9c324__16",name:"slim-mold+2awn/1",path:"/loops/slim-mold/slim-mold__28b9c324__16.mp4"},{id:"slim-mold-slim-mold__619d960c__15",name:"slim-mold+fe02/2",path:"/loops/slim-mold/slim-mold__619d960c__15.mp4"},{id:"slim-mold-slim-mold__0a10d106__14",name:"slim-mold+bdjt/3",path:"/loops/slim-mold/slim-mold__0a10d106__14.mp4"},{id:"slim-mold-slim-mold__527fedca__13",name:"slim-mold+4iiz/4",path:"/loops/slim-mold/slim-mold__527fedca__13.mp4"},{id:"slim-mold-slim-mold__64eeeefc__12",name:"slim-mold+fxhc/5",path:"/loops/slim-mold/slim-mold__64eeeefc__12.mp4"},{id:"slim-mold-slim-mold__bc179d26__11",name:"slim-mold+k003/6",path:"/loops/slim-mold/slim-mold__bc179d26__11.mp4"},{id:"slim-mold-slim-mold__f25d5231__10",name:"slim-mold+pagq/7",path:"/loops/slim-mold/slim-mold__f25d5231__10.mp4"},{id:"slim-mold-slim-mold__18a9040c__9",name:"slim-mold+nn2s/8",path:"/loops/slim-mold/slim-mold__18a9040c__9.mp4"},{id:"slim-mold-slim-mold__77198c91__8",name:"slim-mold+sprl/9",path:"/loops/slim-mold/slim-mold__77198c91__8.mp4"},{id:"slim-mold-slim-mold__92187cbc__7",name:"slim-mold+lyyw/10",path:"/loops/slim-mold/slim-mold__92187cbc__7.mp4"},{id:"slim-mold-slim-mold__4900c077__6",name:"slim-mold+jlxm/11",path:"/loops/slim-mold/slim-mold__4900c077__6.mp4"},{id:"slim-mold-slim-mold__10cb0b70__5",name:"slim-mold+2yle/12",path:"/loops/slim-mold/slim-mold__10cb0b70__5.mp4"},{id:"slim-mold-slim-mold__60094537__4",name:"slim-mold+8y2i/13",path:"/loops/slim-mold/slim-mold__60094537__4.mp4"},{id:"slim-mold-slim-mold__ed2b5ab5__3",name:"slim-mold+mzdl/14",path:"/loops/slim-mold/slim-mold__ed2b5ab5__3.mp4"},{id:"slim-mold-slim-mold__2d2780d9__2",name:"slim-mold+78ow/15",path:"/loops/slim-mold/slim-mold__2d2780d9__2.mp4"},{id:"slim-mold-slim-mold__d193c06b__1",name:"slim-mold+a4jm/16",path:"/loops/slim-mold/slim-mold__d193c06b__1.mp4"}]},{folder:"alien",mtime:1782216226245503e-3,videos:[{id:"alien-alien__fe8d7cca__36",name:"alien+y23w/1",path:"/loops/alien/alien__fe8d7cca__36.mp4"},{id:"alien-alien__2ca76f98__35",name:"alien+s4a2/2",path:"/loops/alien/alien__2ca76f98__35.mp4"},{id:"alien-alien__81c420f5__34",name:"alien+zeom/3",path:"/loops/alien/alien__81c420f5__34.mp4"},{id:"alien-alien__6e658012__33",name:"alien+udna/4",path:"/loops/alien/alien__6e658012__33.mp4"},{id:"alien-alien__1ca18421__32",name:"alien+qtu4/5",path:"/loops/alien/alien__1ca18421__32.mp4"},{id:"alien-alien__a40c4e37__31",name:"alien+nsd4/6",path:"/loops/alien/alien__a40c4e37__31.mp4"},{id:"alien-alien__31873ee2__30",name:"alien+semw/7",path:"/loops/alien/alien__31873ee2__30.mp4"},{id:"alien-alien__a93fb1ad__29",name:"alien+qr48/8",path:"/loops/alien/alien__a93fb1ad__29.mp4"},{id:"alien-alien__dcc498e1__28",name:"alien+7m9k/9",path:"/loops/alien/alien__dcc498e1__28.mp4"},{id:"alien-alien__2d9dbdb1__27",name:"alien+dc4j/10",path:"/loops/alien/alien__2d9dbdb1__27.mp4"},{id:"alien-alien__eb078d98__26",name:"alien+apzb/11",path:"/loops/alien/alien__eb078d98__26.mp4"},{id:"alien-alien__79a4568b__25",name:"alien+7vcp/12",path:"/loops/alien/alien__79a4568b__25.mp4"},{id:"alien-alien__ed3db4fa__24",name:"alien+b0tn/13",path:"/loops/alien/alien__ed3db4fa__24.mp4"},{id:"alien-alien__654f4181__23",name:"alien+bw7r/14",path:"/loops/alien/alien__654f4181__23.mp4"},{id:"alien-alien__2875565e__22",name:"alien+8ddt/15",path:"/loops/alien/alien__2875565e__22.mp4"},{id:"alien-alien__10a7ed33__21",name:"alien+vex6/16",path:"/loops/alien/alien__10a7ed33__21.mp4"},{id:"alien-alien__984a11a7__20",name:"alien+kc2e/17",path:"/loops/alien/alien__984a11a7__20.mp4"},{id:"alien-alien__05f4a778__19",name:"alien+ooq9/18",path:"/loops/alien/alien__05f4a778__19.mp4"},{id:"alien-alien__d2ab6905__18",name:"alien+x7vf/19",path:"/loops/alien/alien__d2ab6905__18.mp4"},{id:"alien-alien__02a7173a__17",name:"alien+bnis/20",path:"/loops/alien/alien__02a7173a__17.mp4"},{id:"alien-alien__97427924__16",name:"alien+d6zs/21",path:"/loops/alien/alien__97427924__16.mp4"},{id:"alien-alien__6bd5f241__15",name:"alien+5lv0/22",path:"/loops/alien/alien__6bd5f241__15.mp4"},{id:"alien-alien__65f1e1f0__14",name:"alien+mdo5/23",path:"/loops/alien/alien__65f1e1f0__14.mp4"},{id:"alien-alien__d9178a51__13",name:"alien+bo35/24",path:"/loops/alien/alien__d9178a51__13.mp4"},{id:"alien-alien__30ae6e15__12",name:"alien+xpji/25",path:"/loops/alien/alien__30ae6e15__12.mp4"},{id:"alien-alien__d78087dd__11",name:"alien+hzap/26",path:"/loops/alien/alien__d78087dd__11.mp4"},{id:"alien-alien__81fb8c8e__10",name:"alien+fwle/27",path:"/loops/alien/alien__81fb8c8e__10.mp4"},{id:"alien-alien__a1472d90__9",name:"alien+dhja/28",path:"/loops/alien/alien__a1472d90__9.mp4"},{id:"alien-alien__04fbc9cc__8",name:"alien+13h8/29",path:"/loops/alien/alien__04fbc9cc__8.mp4"},{id:"alien-alien__0b3f5725__7",name:"alien+y84s/30",path:"/loops/alien/alien__0b3f5725__7.mp4"},{id:"alien-alien__4a2cd694__6",name:"alien+tjpl/31",path:"/loops/alien/alien__4a2cd694__6.mp4"},{id:"alien-alien__d5111507__5",name:"alien+iz3g/32",path:"/loops/alien/alien__d5111507__5.mp4"},{id:"alien-alien__260a1c20__4",name:"alien+3g52/33",path:"/loops/alien/alien__260a1c20__4.mp4"},{id:"alien-alien__f2875292__3",name:"alien+s6kt/34",path:"/loops/alien/alien__f2875292__3.mp4"},{id:"alien-alien__1c970df8__2",name:"alien+idn6/35",path:"/loops/alien/alien__1c970df8__2.mp4"},{id:"alien-alien__b97db71b__1",name:"alien+qs7s/36",path:"/loops/alien/alien__b97db71b__1.mp4"}]},{folder:"lava-lamp",mtime:17822159879605867e-4,videos:[{id:"lava-lamp-lava-lamp__73344858__27",name:"lava-lamp+ckms/1",path:"/loops/lava-lamp/lava-lamp__73344858__27.mp4"},{id:"lava-lamp-lava-lamp__bff5101f__26",name:"lava-lamp+qsba/2",path:"/loops/lava-lamp/lava-lamp__bff5101f__26.mp4"},{id:"lava-lamp-lava-lamp__7909562d__25",name:"lava-lamp+udmq/3",path:"/loops/lava-lamp/lava-lamp__7909562d__25.mp4"},{id:"lava-lamp-lava-lamp__27e00e4c__24",name:"lava-lamp+ezfa/4",path:"/loops/lava-lamp/lava-lamp__27e00e4c__24.mp4"},{id:"lava-lamp-lava-lamp__1aa274e5__23",name:"lava-lamp+gl3x/5",path:"/loops/lava-lamp/lava-lamp__1aa274e5__23.mp4"},{id:"lava-lamp-lava-lamp__6a13c2b4__22",name:"lava-lamp+4end/6",path:"/loops/lava-lamp/lava-lamp__6a13c2b4__22.mp4"},{id:"lava-lamp-lava-lamp__a4de2e33__21",name:"lava-lamp+qiov/7",path:"/loops/lava-lamp/lava-lamp__a4de2e33__21.mp4"},{id:"lava-lamp-lava-lamp__5370191c__20",name:"lava-lamp+va3q/8",path:"/loops/lava-lamp/lava-lamp__5370191c__20.mp4"},{id:"lava-lamp-lava-lamp__385ab5f4__19",name:"lava-lamp+d0l0/9",path:"/loops/lava-lamp/lava-lamp__385ab5f4__19.mp4"},{id:"lava-lamp-lava-lamp__606ba142__18",name:"lava-lamp+gyhs/10",path:"/loops/lava-lamp/lava-lamp__606ba142__18.mp4"},{id:"lava-lamp-lava-lamp__eb8493d5__17",name:"lava-lamp+rlzk/11",path:"/loops/lava-lamp/lava-lamp__eb8493d5__17.mp4"},{id:"lava-lamp-lava-lamp__d92d8c45__16",name:"lava-lamp+aoh2/12",path:"/loops/lava-lamp/lava-lamp__d92d8c45__16.mp4"},{id:"lava-lamp-lava-lamp__aa1c4679__15",name:"lava-lamp+mn45/13",path:"/loops/lava-lamp/lava-lamp__aa1c4679__15.mp4"},{id:"lava-lamp-lava-lamp__3e2acd37__14",name:"lava-lamp+sh79/14",path:"/loops/lava-lamp/lava-lamp__3e2acd37__14.mp4"},{id:"lava-lamp-lava-lamp__91ff08a0__13",name:"lava-lamp+m0fa/15",path:"/loops/lava-lamp/lava-lamp__91ff08a0__13.mp4"},{id:"lava-lamp-lava-lamp__1ffdf746__12",name:"lava-lamp+34ko/16",path:"/loops/lava-lamp/lava-lamp__1ffdf746__12.mp4"},{id:"lava-lamp-lava-lamp__e525004e__11",name:"lava-lamp+ut4w/17",path:"/loops/lava-lamp/lava-lamp__e525004e__11.mp4"},{id:"lava-lamp-lava-lamp__3800ff2d__10",name:"lava-lamp+w08n/18",path:"/loops/lava-lamp/lava-lamp__3800ff2d__10.mp4"},{id:"lava-lamp-lava-lamp__9a8f05ac__9",name:"lava-lamp+1tuy/19",path:"/loops/lava-lamp/lava-lamp__9a8f05ac__9.mp4"},{id:"lava-lamp-lava-lamp__abc29ff4__8",name:"lava-lamp+isag/20",path:"/loops/lava-lamp/lava-lamp__abc29ff4__8.mp4"},{id:"lava-lamp-lava-lamp__869d9310__7",name:"lava-lamp+v5gm/21",path:"/loops/lava-lamp/lava-lamp__869d9310__7.mp4"},{id:"lava-lamp-lava-lamp__76b83bbc__6",name:"lava-lamp+s9s9/22",path:"/loops/lava-lamp/lava-lamp__76b83bbc__6.mp4"},{id:"lava-lamp-lava-lamp__e1260c3e__5",name:"lava-lamp+arcx/23",path:"/loops/lava-lamp/lava-lamp__e1260c3e__5.mp4"},{id:"lava-lamp-lava-lamp__c81844bd__4",name:"lava-lamp+394c/24",path:"/loops/lava-lamp/lava-lamp__c81844bd__4.mp4"},{id:"lava-lamp-lava-lamp__be1a0ebc__3",name:"lava-lamp+oggj/25",path:"/loops/lava-lamp/lava-lamp__be1a0ebc__3.mp4"},{id:"lava-lamp-lava-lamp__ff972214__2",name:"lava-lamp+cp31/26",path:"/loops/lava-lamp/lava-lamp__ff972214__2.mp4"},{id:"lava-lamp-lava-lamp__17db0d38__1",name:"lava-lamp+ep80/27",path:"/loops/lava-lamp/lava-lamp__17db0d38__1.mp4"}]},{folder:"suminagashi",mtime:17822158040645989e-4,videos:[{id:"suminagashi-suminagashi__673a3fb3__30",name:"suminagashi+tlmh/1",path:"/loops/suminagashi/suminagashi__673a3fb3__30.mp4"},{id:"suminagashi-suminagashi__e4efcb7f__29",name:"suminagashi+nna9/2",path:"/loops/suminagashi/suminagashi__e4efcb7f__29.mp4"},{id:"suminagashi-suminagashi__a1aacb87__28",name:"suminagashi+ldb1/3",path:"/loops/suminagashi/suminagashi__a1aacb87__28.mp4"},{id:"suminagashi-suminagashi__ef851d43__27",name:"suminagashi+f4ds/4",path:"/loops/suminagashi/suminagashi__ef851d43__27.mp4"},{id:"suminagashi-suminagashi__dba99f36__26",name:"suminagashi+t64r/5",path:"/loops/suminagashi/suminagashi__dba99f36__26.mp4"},{id:"suminagashi-suminagashi__aad28ddb__25",name:"suminagashi+ghba/6",path:"/loops/suminagashi/suminagashi__aad28ddb__25.mp4"},{id:"suminagashi-suminagashi__a4d6ee03__24",name:"suminagashi+esrm/7",path:"/loops/suminagashi/suminagashi__a4d6ee03__24.mp4"},{id:"suminagashi-suminagashi__2229406e__23",name:"suminagashi+iakn/8",path:"/loops/suminagashi/suminagashi__2229406e__23.mp4"},{id:"suminagashi-suminagashi__651df10b__22",name:"suminagashi+8mdb/9",path:"/loops/suminagashi/suminagashi__651df10b__22.mp4"},{id:"suminagashi-suminagashi__fa755d74__21",name:"suminagashi+szwl/10",path:"/loops/suminagashi/suminagashi__fa755d74__21.mp4"},{id:"suminagashi-suminagashi__e3e740ca__20",name:"suminagashi+f16k/11",path:"/loops/suminagashi/suminagashi__e3e740ca__20.mp4"},{id:"suminagashi-suminagashi__49720dd8__19",name:"suminagashi+e160/12",path:"/loops/suminagashi/suminagashi__49720dd8__19.mp4"},{id:"suminagashi-suminagashi__bd7a4242__18",name:"suminagashi+1lod/13",path:"/loops/suminagashi/suminagashi__bd7a4242__18.mp4"},{id:"suminagashi-suminagashi__de144653__17",name:"suminagashi+j4kl/14",path:"/loops/suminagashi/suminagashi__de144653__17.mp4"},{id:"suminagashi-suminagashi__405e5f93__16",name:"suminagashi+focn/15",path:"/loops/suminagashi/suminagashi__405e5f93__16.mp4"},{id:"suminagashi-suminagashi__43d77d31__15",name:"suminagashi+wc29/16",path:"/loops/suminagashi/suminagashi__43d77d31__15.mp4"},{id:"suminagashi-suminagashi__0f3db15e__14",name:"suminagashi+ctye/17",path:"/loops/suminagashi/suminagashi__0f3db15e__14.mp4"},{id:"suminagashi-suminagashi__6231693a__13",name:"suminagashi+dwbq/18",path:"/loops/suminagashi/suminagashi__6231693a__13.mp4"},{id:"suminagashi-suminagashi__90801a0e__12",name:"suminagashi+enyn/19",path:"/loops/suminagashi/suminagashi__90801a0e__12.mp4"},{id:"suminagashi-suminagashi__65ca4172__11",name:"suminagashi+dfpw/20",path:"/loops/suminagashi/suminagashi__65ca4172__11.mp4"},{id:"suminagashi-suminagashi__bc45ab59__10",name:"suminagashi+ilzs/21",path:"/loops/suminagashi/suminagashi__bc45ab59__10.mp4"},{id:"suminagashi-suminagashi__3235b0f8__9",name:"suminagashi+w71n/22",path:"/loops/suminagashi/suminagashi__3235b0f8__9.mp4"},{id:"suminagashi-suminagashi__dbd94fb6__8",name:"suminagashi+yffw/23",path:"/loops/suminagashi/suminagashi__dbd94fb6__8.mp4"},{id:"suminagashi-suminagashi__c8bd8b13__7",name:"suminagashi+vxwn/24",path:"/loops/suminagashi/suminagashi__c8bd8b13__7.mp4"},{id:"suminagashi-suminagashi__943fda55__6",name:"suminagashi+f77w/25",path:"/loops/suminagashi/suminagashi__943fda55__6.mp4"},{id:"suminagashi-suminagashi__27f89d15__5",name:"suminagashi+58nr/26",path:"/loops/suminagashi/suminagashi__27f89d15__5.mp4"},{id:"suminagashi-suminagashi__703299da__4",name:"suminagashi+mey8/27",path:"/loops/suminagashi/suminagashi__703299da__4.mp4"},{id:"suminagashi-suminagashi__a6e8a46c__3",name:"suminagashi+fox9/28",path:"/loops/suminagashi/suminagashi__a6e8a46c__3.mp4"},{id:"suminagashi-suminagashi__5f9ba9c3__2",name:"suminagashi+lyet/29",path:"/loops/suminagashi/suminagashi__5f9ba9c3__2.mp4"},{id:"suminagashi-suminagashi__2e2a3ad8__1",name:"suminagashi+azh8/30",path:"/loops/suminagashi/suminagashi__2e2a3ad8__1.mp4"}]},{folder:"patterns",mtime:17821221932144993e-4,videos:[{id:"patterns-patterns__t6bt__13",name:"patterns+1gjz/1",path:"/loops/patterns/patterns__t6bt__13.mp4"},{id:"patterns-patterns__t6mx__12",name:"patterns+eqbe/2",path:"/loops/patterns/patterns__t6mx__12.mp4"},{id:"patterns-patterns__6jfv__8",name:"patterns+35y2/3",path:"/loops/patterns/patterns__6jfv__8.mp4"},{id:"patterns-patterns__e239b842__10",name:"patterns+vnt3/4",path:"/loops/patterns/patterns__e239b842__10.mp4"},{id:"patterns-patterns__3qw8__6",name:"patterns+noom/5",path:"/loops/patterns/patterns__3qw8__6.mp4"},{id:"patterns-patterns__7m9a__9",name:"patterns+6qkg/6",path:"/loops/patterns/patterns__7m9a__9.mp4"},{id:"patterns-patterns__8ox7__10",name:"patterns+lc7g/7",path:"/loops/patterns/patterns__8ox7__10.mp4"},{id:"patterns-patterns__9ra2__11",name:"patterns+5g77/8",path:"/loops/patterns/patterns__9ra2__11.mp4"},{id:"patterns-patterns__2npc__5",name:"patterns+r948/9",path:"/loops/patterns/patterns__2npc__5.mp4"},{id:"patterns-patterns__07vr__2",name:"patterns+xc72/10",path:"/loops/patterns/patterns__07vr__2.mp4"},{id:"patterns-patterns__6816fc65__4",name:"patterns+cw0z/11",path:"/loops/patterns/patterns__6816fc65__4.mp4"},{id:"patterns-patterns__wwuz__1",name:"patterns+uz9h/12",path:"/loops/patterns/patterns__wwuz__1.mp4"},{id:"patterns-patterns__wj72__3",name:"patterns+2g52/13",path:"/loops/patterns/patterns__wj72__3.mp4"}]},{folder:"silent-caustics",mtime:1782121821888791e-3,videos:[{id:"silent-caustics-silent-caustics__cg0p__10",name:"silent-caustics+xeag/1",path:"/loops/silent-caustics/silent-caustics__cg0p__10.mp4"},{id:"silent-caustics-silent-caustics__5dp5__8",name:"silent-caustics+ojf6/2",path:"/loops/silent-caustics/silent-caustics__5dp5__8.mp4"},{id:"silent-caustics-silent-caustics__2hgq__9",name:"silent-caustics+9v3i/3",path:"/loops/silent-caustics/silent-caustics__2hgq__9.mp4"},{id:"silent-caustics-silent-caustics__8866__7",name:"silent-caustics+g2p7/4",path:"/loops/silent-caustics/silent-caustics__8866__7.mp4"},{id:"silent-caustics-silent-caustics__diy5__6",name:"silent-caustics+1v5z/5",path:"/loops/silent-caustics/silent-caustics__diy5__6.mp4"},{id:"silent-caustics-silent-caustics__99os__4",name:"silent-caustics+xm7g/6",path:"/loops/silent-caustics/silent-caustics__99os__4.mp4"},{id:"silent-caustics-silent-caustics__04a7bc5c__8",name:"silent-caustics+rc41/7",path:"/loops/silent-caustics/silent-caustics__04a7bc5c__8.mp4"},{id:"silent-caustics-silent-caustics__i2pd__3",name:"silent-caustics+i8lh/8",path:"/loops/silent-caustics/silent-caustics__i2pd__3.mp4"},{id:"silent-caustics-silent-caustics__dad2162d__2",name:"silent-caustics+vec7/9",path:"/loops/silent-caustics/silent-caustics__dad2162d__2.mp4"},{id:"silent-caustics-silent-caustics__fd9bdebe__1",name:"silent-caustics+7wx7/10",path:"/loops/silent-caustics/silent-caustics__fd9bdebe__1.mp4"}]},{folder:"oscilloscope",mtime:17821215296969998e-4,videos:[{id:"oscilloscope-oscilloscope__9439dc2b__13",name:"oscilloscope+q92u/1",path:"/loops/oscilloscope/oscilloscope__9439dc2b__13.mp4"},{id:"oscilloscope-oscilloscope__ae3540c1__12",name:"oscilloscope+qvan/2",path:"/loops/oscilloscope/oscilloscope__ae3540c1__12.mp4"},{id:"oscilloscope-oscilloscope__23f75783__11",name:"oscilloscope+i30e/3",path:"/loops/oscilloscope/oscilloscope__23f75783__11.mp4"},{id:"oscilloscope-oscilloscope__9685d4ce__10",name:"oscilloscope+ciea/4",path:"/loops/oscilloscope/oscilloscope__9685d4ce__10.mp4"},{id:"oscilloscope-oscilloscope__f90b2b30__9",name:"oscilloscope+chbq/5",path:"/loops/oscilloscope/oscilloscope__f90b2b30__9.mp4"},{id:"oscilloscope-oscilloscope__656e255e__8",name:"oscilloscope+am1t/6",path:"/loops/oscilloscope/oscilloscope__656e255e__8.mp4"},{id:"oscilloscope-oscilloscope__ed8a0bfb__7",name:"oscilloscope+zduv/7",path:"/loops/oscilloscope/oscilloscope__ed8a0bfb__7.mp4"},{id:"oscilloscope-oscilloscope__97acb7d9__6",name:"oscilloscope+9qrz/8",path:"/loops/oscilloscope/oscilloscope__97acb7d9__6.mp4"},{id:"oscilloscope-oscilloscope__5ac7b1ba__5",name:"oscilloscope+smvs/9",path:"/loops/oscilloscope/oscilloscope__5ac7b1ba__5.mp4"},{id:"oscilloscope-oscilloscope__bce9fced__4",name:"oscilloscope+8jfv/10",path:"/loops/oscilloscope/oscilloscope__bce9fced__4.mp4"},{id:"oscilloscope-oscilloscope__ee1ad243__3",name:"oscilloscope+j0xg/11",path:"/loops/oscilloscope/oscilloscope__ee1ad243__3.mp4"},{id:"oscilloscope-oscilloscope__ff8ada47__2",name:"oscilloscope+z6sv/12",path:"/loops/oscilloscope/oscilloscope__ff8ada47__2.mp4"},{id:"oscilloscope-oscilloscope__f2c7ed7d__1",name:"oscilloscope+a2eo/13",path:"/loops/oscilloscope/oscilloscope__f2c7ed7d__1.mp4"}]},{folder:"iridescent",mtime:1782054925301761e-3,videos:[{id:"iridescent-iridescent__oblu__18",name:"iridescent+h9dd/1",path:"/loops/iridescent/iridescent__oblu__18.mp4"},{id:"iridescent-iridescent__ffa5d713__16",name:"iridescent+yhpa/2",path:"/loops/iridescent/iridescent__ffa5d713__16.mp4"},{id:"iridescent-iridescent__fee065b6__6",name:"iridescent+tra1/3",path:"/loops/iridescent/iridescent__fee065b6__6.mp4"},{id:"iridescent-iridescent__be6ed017__4",name:"iridescent+c8rf/4",path:"/loops/iridescent/iridescent__be6ed017__4.mp4"},{id:"iridescent-iridescent__bbcc04c2__23",name:"iridescent+rar0/5",path:"/loops/iridescent/iridescent__bbcc04c2__23.mp4"},{id:"iridescent-iridescent__b9a5f080__9",name:"iridescent+ca92/6",path:"/loops/iridescent/iridescent__b9a5f080__9.mp4"},{id:"iridescent-iridescent__a3fd2bde__17",name:"iridescent+ypir/7",path:"/loops/iridescent/iridescent__a3fd2bde__17.mp4"},{id:"iridescent-iridescent__99090e75__20",name:"iridescent+rdi3/8",path:"/loops/iridescent/iridescent__99090e75__20.mp4"},{id:"iridescent-iridescent__90590360__8",name:"iridescent+6thy/9",path:"/loops/iridescent/iridescent__90590360__8.mp4"},{id:"iridescent-iridescent__9008c203__15",name:"iridescent+vx0q/10",path:"/loops/iridescent/iridescent__9008c203__15.mp4"},{id:"iridescent-iridescent__8e42294c__19",name:"iridescent+ufg7/11",path:"/loops/iridescent/iridescent__8e42294c__19.mp4"},{id:"iridescent-iridescent__8465dd17__13",name:"iridescent+3aw7/12",path:"/loops/iridescent/iridescent__8465dd17__13.mp4"},{id:"iridescent-iridescent__76aaa390__22",name:"iridescent+l0sz/13",path:"/loops/iridescent/iridescent__76aaa390__22.mp4"},{id:"iridescent-iridescent__6fdccfd9__7",name:"iridescent+pmcx/14",path:"/loops/iridescent/iridescent__6fdccfd9__7.mp4"},{id:"iridescent-iridescent__685b17f4__11",name:"iridescent+gat4/15",path:"/loops/iridescent/iridescent__685b17f4__11.mp4"},{id:"iridescent-iridescent__667b9a94__21",name:"iridescent+urch/16",path:"/loops/iridescent/iridescent__667b9a94__21.mp4"},{id:"iridescent-iridescent__64901240__5",name:"iridescent+zada/17",path:"/loops/iridescent/iridescent__64901240__5.mp4"},{id:"iridescent-iridescent__5dj1__24",name:"iridescent+7r0t/18",path:"/loops/iridescent/iridescent__5dj1__24.mp4"},{id:"iridescent-iridescent__59b6e7fb__18",name:"iridescent+b19y/19",path:"/loops/iridescent/iridescent__59b6e7fb__18.mp4"},{id:"iridescent-iridescent__57uz__24",name:"iridescent+z3xc/20",path:"/loops/iridescent/iridescent__57uz__24.mp4"},{id:"iridescent-iridescent__3631fc16__1",name:"iridescent+53jh/21",path:"/loops/iridescent/iridescent__3631fc16__1.mp4"},{id:"iridescent-iridescent__2cb6d468__2",name:"iridescent+625k/22",path:"/loops/iridescent/iridescent__2cb6d468__2.mp4"},{id:"iridescent-iridescent__2c6fb9b0__3",name:"iridescent+et5w/23",path:"/loops/iridescent/iridescent__2c6fb9b0__3.mp4"},{id:"iridescent-iridescent__25a036d0__10",name:"iridescent+mjt2/24",path:"/loops/iridescent/iridescent__25a036d0__10.mp4"},{id:"iridescent-iridescent__1cf9bd1e__14",name:"iridescent+45y6/25",path:"/loops/iridescent/iridescent__1cf9bd1e__14.mp4"},{id:"iridescent-iridescent__17af7192__12",name:"iridescent+auu6/26",path:"/loops/iridescent/iridescent__17af7192__12.mp4"}]},{folder:"infamous-inflate",mtime:17820500175267534e-4,videos:[{id:"infamous-inflate-infamous-inflate__xllo__11",name:"infamous-inflate+pex9/1",path:"/loops/infamous-inflate/infamous-inflate__xllo__11.mp4"},{id:"infamous-inflate-infamous-inflate__w9du__10",name:"infamous-inflate+z2mm/2",path:"/loops/infamous-inflate/infamous-inflate__w9du__10.mp4"},{id:"infamous-inflate-infamous-inflate__w4nq__9",name:"infamous-inflate+8vtq/3",path:"/loops/infamous-inflate/infamous-inflate__w4nq__9.mp4"},{id:"infamous-inflate-infamous-inflate__vepp__13",name:"infamous-inflate+qs49/4",path:"/loops/infamous-inflate/infamous-inflate__vepp__13.mp4"},{id:"infamous-inflate-infamous-inflate__uozo__16",name:"infamous-inflate+qhs0/5",path:"/loops/infamous-inflate/infamous-inflate__uozo__16.mp4"},{id:"infamous-inflate-infamous-inflate__qcg2__14",name:"infamous-inflate+da8j/6",path:"/loops/infamous-inflate/infamous-inflate__qcg2__14.mp4"},{id:"infamous-inflate-infamous-inflate__owre__3",name:"infamous-inflate+agsz/7",path:"/loops/infamous-inflate/infamous-inflate__owre__3.mp4"},{id:"infamous-inflate-infamous-inflate__ng73__8",name:"infamous-inflate+wdid/8",path:"/loops/infamous-inflate/infamous-inflate__ng73__8.mp4"},{id:"infamous-inflate-infamous-inflate__lv04__15",name:"infamous-inflate+rl94/9",path:"/loops/infamous-inflate/infamous-inflate__lv04__15.mp4"},{id:"infamous-inflate-infamous-inflate__kfj2__6",name:"infamous-inflate+1nzq/10",path:"/loops/infamous-inflate/infamous-inflate__kfj2__6.mp4"},{id:"infamous-inflate-infamous-inflate__j0k8__5",name:"infamous-inflate+8knv/11",path:"/loops/infamous-inflate/infamous-inflate__j0k8__5.mp4"},{id:"infamous-inflate-infamous-inflate__hx7p__12",name:"infamous-inflate+9wah/12",path:"/loops/infamous-inflate/infamous-inflate__hx7p__12.mp4"},{id:"infamous-inflate-infamous-inflate__fp5t__4",name:"infamous-inflate+llet/13",path:"/loops/infamous-inflate/infamous-inflate__fp5t__4.mp4"},{id:"infamous-inflate-infamous-inflate__fnb0__7",name:"infamous-inflate+ib1u/14",path:"/loops/infamous-inflate/infamous-inflate__fnb0__7.mp4"},{id:"infamous-inflate-infamous-inflate__fkt0__1",name:"infamous-inflate+cvh0/15",path:"/loops/infamous-inflate/infamous-inflate__fkt0__1.mp4"},{id:"infamous-inflate-infamous-inflate__fcns__2",name:"infamous-inflate+7at9/16",path:"/loops/infamous-inflate/infamous-inflate__fcns__2.mp4"}]},{folder:"rock-solid",mtime:17819423447265034e-4,videos:[{id:"rock-solid-RockSolid__gnyk__1",name:"rock-solid+3vqr/1",path:"/loops/rock-solid/RockSolid__gnyk__1.mp4"},{id:"rock-solid-RockSolid__gj7o__23",name:"rock-solid+khx6/2",path:"/loops/rock-solid/RockSolid__gj7o__23.mp4"},{id:"rock-solid-RockSolid__cqry__1",name:"rock-solid+fgkp/3",path:"/loops/rock-solid/RockSolid__cqry__1.mp4"},{id:"rock-solid-RockSolid__bn2k__1",name:"rock-solid+1td2/4",path:"/loops/rock-solid/RockSolid__bn2k__1.mp4"},{id:"rock-solid-RockSolid__50wp__1",name:"rock-solid+mn37/5",path:"/loops/rock-solid/RockSolid__50wp__1.mp4"},{id:"rock-solid-RockSolid__yxrq__14",name:"rock-solid+au8t/6",path:"/loops/rock-solid/RockSolid__yxrq__14.mp4"},{id:"rock-solid-RockSolid__xw29__13",name:"rock-solid+j5ms/7",path:"/loops/rock-solid/RockSolid__xw29__13.mp4"},{id:"rock-solid-RockSolid__wu09__12",name:"rock-solid+qefl/8",path:"/loops/rock-solid/RockSolid__wu09__12.mp4"},{id:"rock-solid-RockSolid__vfzg__11",name:"rock-solid+97vv/9",path:"/loops/rock-solid/RockSolid__vfzg__11.mp4"},{id:"rock-solid-RockSolid__ueo7__10",name:"rock-solid+fpbu/10",path:"/loops/rock-solid/RockSolid__ueo7__10.mp4"},{id:"rock-solid-RockSolid__t07r__9",name:"rock-solid+4xii/11",path:"/loops/rock-solid/RockSolid__t07r__9.mp4"},{id:"rock-solid-RockSolid__ry6s__8",name:"rock-solid+rvpk/12",path:"/loops/rock-solid/RockSolid__ry6s__8.mp4"},{id:"rock-solid-RockSolid__qk62__7",name:"rock-solid+5d8s/13",path:"/loops/rock-solid/RockSolid__qk62__7.mp4"},{id:"rock-solid-RockSolid__p6ny__6",name:"rock-solid+bjo3/14",path:"/loops/rock-solid/RockSolid__p6ny__6.mp4"},{id:"rock-solid-RockSolid__nt08__5",name:"rock-solid+8nj5/15",path:"/loops/rock-solid/RockSolid__nt08__5.mp4"},{id:"rock-solid-RockSolid__mf1g__4",name:"rock-solid+ta9c/16",path:"/loops/rock-solid/RockSolid__mf1g__4.mp4"},{id:"rock-solid-RockSolid__l0z7__3",name:"rock-solid+jsa8/17",path:"/loops/rock-solid/RockSolid__l0z7__3.mp4"},{id:"rock-solid-RockSolid__jn6o__2",name:"rock-solid+r3kd/18",path:"/loops/rock-solid/RockSolid__jn6o__2.mp4"},{id:"rock-solid-RockSolid__bosk__24",name:"rock-solid+sy0y/19",path:"/loops/rock-solid/RockSolid__bosk__24.mp4"},{id:"rock-solid-RockSolid__99o2__22",name:"rock-solid+4ehj/20",path:"/loops/rock-solid/RockSolid__99o2__22.mp4"},{id:"rock-solid-RockSolid__87vp__21",name:"rock-solid+nmu2/21",path:"/loops/rock-solid/RockSolid__87vp__21.mp4"},{id:"rock-solid-RockSolid__6uc1__20",name:"rock-solid+kaui/22",path:"/loops/rock-solid/RockSolid__6uc1__20.mp4"},{id:"rock-solid-RockSolid__5sho__19",name:"rock-solid+dwxd/23",path:"/loops/rock-solid/RockSolid__5sho__19.mp4"},{id:"rock-solid-RockSolid__4qvj__18",name:"rock-solid+x3l5/24",path:"/loops/rock-solid/RockSolid__4qvj__18.mp4"},{id:"rock-solid-RockSolid__2pze__17",name:"rock-solid+i3l1/25",path:"/loops/rock-solid/RockSolid__2pze__17.mp4"},{id:"rock-solid-RockSolid__1orz__16",name:"rock-solid+o0kw/26",path:"/loops/rock-solid/RockSolid__1orz__16.mp4"},{id:"rock-solid-RockSolid__0bkf__15",name:"rock-solid+do67/27",path:"/loops/rock-solid/RockSolid__0bkf__15.mp4"}]},{folder:"test-workflow",mtime:17818546073491812e-4,videos:[{id:"test-workflow-test-workflow__lq55__2",name:"test-workflow+h1dt/1",path:"/loops/test-workflow/test-workflow__lq55__2.mp4"},{id:"test-workflow-test-workflow__fzot__4",name:"test-workflow+z55k/2",path:"/loops/test-workflow/test-workflow__fzot__4.mp4"},{id:"test-workflow-test-workflow__fk6k__3",name:"test-workflow+yd4y/3",path:"/loops/test-workflow/test-workflow__fk6k__3.mp4"}]},{folder:"behind-screen",mtime:17816996703350994e-4,videos:[{id:"behind-screen-BehindScreen__y11z__19",name:"behind-screen+b9ql/1",path:"/loops/behind-screen/BehindScreen__y11z__19.mp4"},{id:"behind-screen-BehindScreen__wb29__32",name:"behind-screen+5ubb/2",path:"/loops/behind-screen/BehindScreen__wb29__32.mp4"},{id:"behind-screen-BehindScreen__v1iv__31",name:"behind-screen+eahf/3",path:"/loops/behind-screen/BehindScreen__v1iv__31.mp4"},{id:"behind-screen-BehindScreen__tbnl__30",name:"behind-screen+r0wr/4",path:"/loops/behind-screen/BehindScreen__tbnl__30.mp4"},{id:"behind-screen-BehindScreen__q6gb__28",name:"behind-screen+wtaf/5",path:"/loops/behind-screen/BehindScreen__q6gb__28.mp4"},{id:"behind-screen-BehindScreen__oexw__27",name:"behind-screen+8omh/6",path:"/loops/behind-screen/BehindScreen__oexw__27.mp4"},{id:"behind-screen-BehindScreen__muve__26",name:"behind-screen+2fj4/7",path:"/loops/behind-screen/BehindScreen__muve__26.mp4"},{id:"behind-screen-BehindScreen__l9v6__25",name:"behind-screen+836k/8",path:"/loops/behind-screen/BehindScreen__l9v6__25.mp4"},{id:"behind-screen-BehindScreen__jm82__24",name:"behind-screen+t4rt/9",path:"/loops/behind-screen/BehindScreen__jm82__24.mp4"},{id:"behind-screen-BehindScreen__i2ha__23",name:"behind-screen+j41i/10",path:"/loops/behind-screen/BehindScreen__i2ha__23.mp4"},{id:"behind-screen-BehindScreen__gb92__22",name:"behind-screen+3yka/11",path:"/loops/behind-screen/BehindScreen__gb92__22.mp4"},{id:"behind-screen-BehindScreen__enow__21",name:"behind-screen+x5il/12",path:"/loops/behind-screen/BehindScreen__enow__21.mp4"},{id:"behind-screen-BehindScreen__crsp__20",name:"behind-screen+z7i1/13",path:"/loops/behind-screen/BehindScreen__crsp__20.mp4"},{id:"behind-screen-BehindScreen__9kvi__18",name:"behind-screen+2fpx/14",path:"/loops/behind-screen/BehindScreen__9kvi__18.mp4"},{id:"behind-screen-BehindScreen__7uiv__17",name:"behind-screen+az0d/15",path:"/loops/behind-screen/BehindScreen__7uiv__17.mp4"},{id:"behind-screen-BehindScreen__3f9e__16",name:"behind-screen+oy2k/16",path:"/loops/behind-screen/BehindScreen__3f9e__16.mp4"},{id:"behind-screen-BehindScreen__1r7j__9",name:"behind-screen+qsaf/17",path:"/loops/behind-screen/BehindScreen__1r7j__9.mp4"},{id:"behind-screen-BehindScreen__xkub__14",name:"behind-screen+anzr/18",path:"/loops/behind-screen/BehindScreen__xkub__14.mp4"},{id:"behind-screen-BehindScreen__vuyu__13",name:"behind-screen+ubig/19",path:"/loops/behind-screen/BehindScreen__vuyu__13.mp4"},{id:"behind-screen-BehindScreen__u7l0__12",name:"behind-screen+289z/20",path:"/loops/behind-screen/BehindScreen__u7l0__12.mp4"},{id:"behind-screen-BehindScreen__rifg__10",name:"behind-screen+67y6/21",path:"/loops/behind-screen/BehindScreen__rifg__10.mp4"},{id:"behind-screen-BehindScreen__opor__8",name:"behind-screen+w8yt/22",path:"/loops/behind-screen/BehindScreen__opor__8.mp4"},{id:"behind-screen-BehindScreen__ni57__7",name:"behind-screen+o6b4/23",path:"/loops/behind-screen/BehindScreen__ni57__7.mp4"},{id:"behind-screen-BehindScreen__m6kq__6",name:"behind-screen+fqsf/24",path:"/loops/behind-screen/BehindScreen__m6kq__6.mp4"},{id:"behind-screen-BehindScreen__cmg7__5",name:"behind-screen+2md7/25",path:"/loops/behind-screen/BehindScreen__cmg7__5.mp4"},{id:"behind-screen-BehindScreen__bb43__4",name:"behind-screen+edhz/26",path:"/loops/behind-screen/BehindScreen__bb43__4.mp4"},{id:"behind-screen-BehindScreen__a0fd__3",name:"behind-screen+oini/27",path:"/loops/behind-screen/BehindScreen__a0fd__3.mp4"},{id:"behind-screen-BehindScreen__841n__2",name:"behind-screen+mwhl/28",path:"/loops/behind-screen/BehindScreen__841n__2.mp4"},{id:"behind-screen-BehindScreen__6t5y__1",name:"behind-screen+q05p/29",path:"/loops/behind-screen/BehindScreen__6t5y__1.mp4"}]},{folder:"liminal-spaces",mtime:17816898852965632e-4,videos:[{id:"liminal-spaces-LiminalSpaces__4chl__16",name:"liminal-spaces+y33a/1",path:"/loops/liminal-spaces/LiminalSpaces__4chl__16.mp4"},{id:"liminal-spaces-LiminalSpaces__33ar__15",name:"liminal-spaces+n96u/2",path:"/loops/liminal-spaces/LiminalSpaces__33ar__15.mp4"},{id:"liminal-spaces-LiminalSpaces__1sc8__14",name:"liminal-spaces+dpaq/3",path:"/loops/liminal-spaces/LiminalSpaces__1sc8__14.mp4"},{id:"liminal-spaces-LiminalSpaces__0fdg__13",name:"liminal-spaces+rrwd/4",path:"/loops/liminal-spaces/LiminalSpaces__0fdg__13.mp4"},{id:"liminal-spaces-LiminalSpaces__4weg__12",name:"liminal-spaces+p1yd/5",path:"/loops/liminal-spaces/LiminalSpaces__4weg__12.mp4"},{id:"liminal-spaces-LiminalSpaces__1r43__11",name:"liminal-spaces+y1z3/6",path:"/loops/liminal-spaces/LiminalSpaces__1r43__11.mp4"},{id:"liminal-spaces-LiminalSpaces__05tf__10",name:"liminal-spaces+ttxb/7",path:"/loops/liminal-spaces/LiminalSpaces__05tf__10.mp4"},{id:"liminal-spaces-LiminalSpaces__yu5i__9",name:"liminal-spaces+ap9v/8",path:"/loops/liminal-spaces/LiminalSpaces__yu5i__9.mp4"},{id:"liminal-spaces-LiminalSpaces__xbe3__8",name:"liminal-spaces+n63y/9",path:"/loops/liminal-spaces/LiminalSpaces__xbe3__8.mp4"},{id:"liminal-spaces-LiminalSpaces__vs6t__7",name:"liminal-spaces+wp67/10",path:"/loops/liminal-spaces/LiminalSpaces__vs6t__7.mp4"},{id:"liminal-spaces-LiminalSpaces__z7qx__6",name:"liminal-spaces+ssa8/11",path:"/loops/liminal-spaces/LiminalSpaces__z7qx__6.mp4"},{id:"liminal-spaces-LiminalSpaces__xod2__5",name:"liminal-spaces+i21f/12",path:"/loops/liminal-spaces/LiminalSpaces__xod2__5.mp4"},{id:"liminal-spaces-LiminalSpaces__w3a0__4",name:"liminal-spaces+pkyl/13",path:"/loops/liminal-spaces/LiminalSpaces__w3a0__4.mp4"},{id:"liminal-spaces-LiminalSpaces__utkw__3",name:"liminal-spaces+cg71/14",path:"/loops/liminal-spaces/LiminalSpaces__utkw__3.mp4"},{id:"liminal-spaces-LiminalSpaces__t8ha__2",name:"liminal-spaces+mz7z/15",path:"/loops/liminal-spaces/LiminalSpaces__t8ha__2.mp4"},{id:"liminal-spaces-LiminalSpaces__t1jv__1",name:"liminal-spaces+mynf/16",path:"/loops/liminal-spaces/LiminalSpaces__t1jv__1.mp4"}]},{folder:"cloud-composition",mtime:17816850397007607e-4,videos:[{id:"cloud-composition-CloudComposition__89hq__14",name:"cloud-composition+456o/1",path:"/loops/cloud-composition/CloudComposition__89hq__14.mp4"},{id:"cloud-composition-CloudComposition__6zqg__12",name:"cloud-composition+sgp9/2",path:"/loops/cloud-composition/CloudComposition__6zqg__12.mp4"},{id:"cloud-composition-CloudComposition__548c__16",name:"cloud-composition+ajeu/3",path:"/loops/cloud-composition/CloudComposition__548c__16.mp4"},{id:"cloud-composition-CloudComposition__3vpa__15",name:"cloud-composition+hgyg/4",path:"/loops/cloud-composition/CloudComposition__3vpa__15.mp4"},{id:"cloud-composition-CloudComposition__1pv7__13",name:"cloud-composition+s45z/5",path:"/loops/cloud-composition/CloudComposition__1pv7__13.mp4"},{id:"cloud-composition-CloudComposition__0b67__11",name:"cloud-composition+pixs/6",path:"/loops/cloud-composition/CloudComposition__0b67__11.mp4"},{id:"cloud-composition-CloudComposition__yxoq__10",name:"cloud-composition+nm51/7",path:"/loops/cloud-composition/CloudComposition__yxoq__10.mp4"},{id:"cloud-composition-CloudComposition__xprx__9",name:"cloud-composition+f61n/8",path:"/loops/cloud-composition/CloudComposition__xprx__9.mp4"},{id:"cloud-composition-CloudComposition__w03c__8",name:"cloud-composition+vw95/9",path:"/loops/cloud-composition/CloudComposition__w03c__8.mp4"},{id:"cloud-composition-CloudComposition__utnl__7",name:"cloud-composition+71pf/10",path:"/loops/cloud-composition/CloudComposition__utnl__7.mp4"},{id:"cloud-composition-CloudComposition__tlzr__6",name:"cloud-composition+j1my/11",path:"/loops/cloud-composition/CloudComposition__tlzr__6.mp4"},{id:"cloud-composition-CloudComposition__s242__5",name:"cloud-composition+c712/12",path:"/loops/cloud-composition/CloudComposition__s242__5.mp4"},{id:"cloud-composition-CloudComposition__qsca__4",name:"cloud-composition+16dg/13",path:"/loops/cloud-composition/CloudComposition__qsca__4.mp4"},{id:"cloud-composition-CloudComposition__p6y0__3",name:"cloud-composition+3mrb/14",path:"/loops/cloud-composition/CloudComposition__p6y0__3.mp4"},{id:"cloud-composition-CloudComposition__nybc__2",name:"cloud-composition+dx8q/15",path:"/loops/cloud-composition/CloudComposition__nybc__2.mp4"},{id:"cloud-composition-CloudComposition__mcq2__1",name:"cloud-composition+u72x/16",path:"/loops/cloud-composition/CloudComposition__mcq2__1.mp4"}]},{folder:"concrete-jungle",mtime:17816327189940674e-4,videos:[{id:"concrete-jungle-ConcreteJungle__2ohf__4",name:"concrete-jungle+i6ts/1",path:"/loops/concrete-jungle/ConcreteJungle__2ohf__4.mp4"},{id:"concrete-jungle-ConcreteJungle__zzjf__16",name:"concrete-jungle+rp6o/2",path:"/loops/concrete-jungle/ConcreteJungle__zzjf__16.mp4"},{id:"concrete-jungle-ConcreteJungle__ydqo__15",name:"concrete-jungle+wf3t/3",path:"/loops/concrete-jungle/ConcreteJungle__ydqo__15.mp4"},{id:"concrete-jungle-ConcreteJungle__wvwt__14",name:"concrete-jungle+yjz0/4",path:"/loops/concrete-jungle/ConcreteJungle__wvwt__14.mp4"},{id:"concrete-jungle-ConcreteJungle__ufut__13",name:"concrete-jungle+f1nv/5",path:"/loops/concrete-jungle/ConcreteJungle__ufut__13.mp4"},{id:"concrete-jungle-ConcreteJungle__stox__12",name:"concrete-jungle+859v/6",path:"/loops/concrete-jungle/ConcreteJungle__stox__12.mp4"},{id:"concrete-jungle-ConcreteJungle__riba__11",name:"concrete-jungle+j3d6/7",path:"/loops/concrete-jungle/ConcreteJungle__riba__11.mp4"},{id:"concrete-jungle-ConcreteJungle__pwex__10",name:"concrete-jungle+7eix/8",path:"/loops/concrete-jungle/ConcreteJungle__pwex__10.mp4"},{id:"concrete-jungle-ConcreteJungle__oe7w__9",name:"concrete-jungle+kg1q/9",path:"/loops/concrete-jungle/ConcreteJungle__oe7w__9.mp4"},{id:"concrete-jungle-ConcreteJungle__n3i4__8",name:"concrete-jungle+dfzd/10",path:"/loops/concrete-jungle/ConcreteJungle__n3i4__8.mp4"},{id:"concrete-jungle-ConcreteJungle__lc9j__7",name:"concrete-jungle+45cm/11",path:"/loops/concrete-jungle/ConcreteJungle__lc9j__7.mp4"},{id:"concrete-jungle-ConcreteJungle__jnn9__6",name:"concrete-jungle+681o/12",path:"/loops/concrete-jungle/ConcreteJungle__jnn9__6.mp4"},{id:"concrete-jungle-ConcreteJungle__hxns__5",name:"concrete-jungle+4q7l/13",path:"/loops/concrete-jungle/ConcreteJungle__hxns__5.mp4"},{id:"concrete-jungle-ConcreteJungle__ekup__3",name:"concrete-jungle+m58k/14",path:"/loops/concrete-jungle/ConcreteJungle__ekup__3.mp4"},{id:"concrete-jungle-ConcreteJungle__csmt__2",name:"concrete-jungle+ajri/15",path:"/loops/concrete-jungle/ConcreteJungle__csmt__2.mp4"},{id:"concrete-jungle-ConcreteJungle__a5ut__1",name:"concrete-jungle+wbz9/16",path:"/loops/concrete-jungle/ConcreteJungle__a5ut__1.mp4"}]},{folder:"stripe-resonance",mtime:1781627307515776e-3,videos:[{id:"stripe-resonance-StripeResonance__utx4__1",name:"stripe-resonance+lgcp/1",path:"/loops/stripe-resonance/StripeResonance__utx4__1.mp4"},{id:"stripe-resonance-StripeResonance__sijy__16",name:"stripe-resonance+fdx8/2",path:"/loops/stripe-resonance/StripeResonance__sijy__16.mp4"},{id:"stripe-resonance-StripeResonance__r8ov__15",name:"stripe-resonance+kfpn/3",path:"/loops/stripe-resonance/StripeResonance__r8ov__15.mp4"},{id:"stripe-resonance-StripeResonance__pnr2__14",name:"stripe-resonance+830x/4",path:"/loops/stripe-resonance/StripeResonance__pnr2__14.mp4"},{id:"stripe-resonance-StripeResonance__o3vo__13",name:"stripe-resonance+62fd/5",path:"/loops/stripe-resonance/StripeResonance__o3vo__13.mp4"},{id:"stripe-resonance-StripeResonance__mktk__12",name:"stripe-resonance+e661/6",path:"/loops/stripe-resonance/StripeResonance__mktk__12.mp4"},{id:"stripe-resonance-StripeResonance__kz6o__11",name:"stripe-resonance+173f/7",path:"/loops/stripe-resonance/StripeResonance__kz6o__11.mp4"},{id:"stripe-resonance-StripeResonance__jpkl__10",name:"stripe-resonance+kbns/8",path:"/loops/stripe-resonance/StripeResonance__jpkl__10.mp4"},{id:"stripe-resonance-StripeResonance__ifil__9",name:"stripe-resonance+s751/9",path:"/loops/stripe-resonance/StripeResonance__ifil__9.mp4"},{id:"stripe-resonance-StripeResonance__gvz5__8",name:"stripe-resonance+23cq/10",path:"/loops/stripe-resonance/StripeResonance__gvz5__8.mp4"},{id:"stripe-resonance-StripeResonance__f9v7__7",name:"stripe-resonance+ixdh/11",path:"/loops/stripe-resonance/StripeResonance__f9v7__7.mp4"},{id:"stripe-resonance-StripeResonance__dpjy__6",name:"stripe-resonance+85zq/12",path:"/loops/stripe-resonance/StripeResonance__dpjy__6.mp4"},{id:"stripe-resonance-StripeResonance__cgrj__5",name:"stripe-resonance+il29/13",path:"/loops/stripe-resonance/StripeResonance__cgrj__5.mp4"},{id:"stripe-resonance-StripeResonance__avwo__4",name:"stripe-resonance+nwt1/14",path:"/loops/stripe-resonance/StripeResonance__avwo__4.mp4"},{id:"stripe-resonance-StripeResonance__9egt__3",name:"stripe-resonance+rkjw/15",path:"/loops/stripe-resonance/StripeResonance__9egt__3.mp4"},{id:"stripe-resonance-StripeResonance__86il__2",name:"stripe-resonance+6kpw/16",path:"/loops/stripe-resonance/StripeResonance__86il__2.mp4"}]},{folder:"obsidian-iris",mtime:17816249706055635e-4,videos:[{id:"obsidian-iris-ObsidianIris__glya__10",name:"obsidian-iris+5nn5/1",path:"/loops/obsidian-iris/ObsidianIris__glya__10.mp4"},{id:"obsidian-iris-ObsidianIris__ezvj__9",name:"obsidian-iris+xhkj/2",path:"/loops/obsidian-iris/ObsidianIris__ezvj__9.mp4"},{id:"obsidian-iris-ObsidianIris__bynj__8",name:"obsidian-iris+mp5n/3",path:"/loops/obsidian-iris/ObsidianIris__bynj__8.mp4"},{id:"obsidian-iris-ObsidianIris__af9x__7",name:"obsidian-iris+3cgy/4",path:"/loops/obsidian-iris/ObsidianIris__af9x__7.mp4"},{id:"obsidian-iris-ObsidianIris__8p3z__6",name:"obsidian-iris+115d/5",path:"/loops/obsidian-iris/ObsidianIris__8p3z__6.mp4"},{id:"obsidian-iris-ObsidianIris__739g__5",name:"obsidian-iris+2un2/6",path:"/loops/obsidian-iris/ObsidianIris__739g__5.mp4"},{id:"obsidian-iris-ObsidianIris__5tec__4",name:"obsidian-iris+mjcj/7",path:"/loops/obsidian-iris/ObsidianIris__5tec__4.mp4"},{id:"obsidian-iris-ObsidianIris__43tx__3",name:"obsidian-iris+k5rq/8",path:"/loops/obsidian-iris/ObsidianIris__43tx__3.mp4"},{id:"obsidian-iris-ObsidianIris__2w8s__2",name:"obsidian-iris+gc7u/9",path:"/loops/obsidian-iris/ObsidianIris__2w8s__2.mp4"},{id:"obsidian-iris-ObsidianIris__1clp__1",name:"obsidian-iris+wvax/10",path:"/loops/obsidian-iris/ObsidianIris__1clp__1.mp4"}]},{folder:"dune-calor",mtime:17816175104185063e-4,videos:[{id:"dune-calor-DuneCalor__zce0__32",name:"dune-calor+ujb3/1",path:"/loops/dune-calor/DuneCalor__zce0__32.mp4"},{id:"dune-calor-DuneCalor__y0gx__31",name:"dune-calor+oknp/2",path:"/loops/dune-calor/DuneCalor__y0gx__31.mp4"},{id:"dune-calor-DuneCalor__wm13__30",name:"dune-calor+jc0q/3",path:"/loops/dune-calor/DuneCalor__wm13__30.mp4"},{id:"dune-calor-DuneCalor__ui1t__29",name:"dune-calor+xlsj/4",path:"/loops/dune-calor/DuneCalor__ui1t__29.mp4"},{id:"dune-calor-DuneCalor__sfba__28",name:"dune-calor+xs0q/5",path:"/loops/dune-calor/DuneCalor__sfba__28.mp4"},{id:"dune-calor-DuneCalor__r4pp__27",name:"dune-calor+t8at/6",path:"/loops/dune-calor/DuneCalor__r4pp__27.mp4"},{id:"dune-calor-DuneCalor__o1fx__26",name:"dune-calor+nn0s/7",path:"/loops/dune-calor/DuneCalor__o1fx__26.mp4"},{id:"dune-calor-DuneCalor__kbj7__25",name:"dune-calor+fejk/8",path:"/loops/dune-calor/DuneCalor__kbj7__25.mp4"},{id:"dune-calor-DuneCalor__i4fo__24",name:"dune-calor+1byu/9",path:"/loops/dune-calor/DuneCalor__i4fo__24.mp4"},{id:"dune-calor-DuneCalor__ebso__23",name:"dune-calor+43s8/10",path:"/loops/dune-calor/DuneCalor__ebso__23.mp4"},{id:"dune-calor-DuneCalor__d2he__22",name:"dune-calor+co4d/11",path:"/loops/dune-calor/DuneCalor__d2he__22.mp4"},{id:"dune-calor-DuneCalor__boov__21",name:"dune-calor+gnx0/12",path:"/loops/dune-calor/DuneCalor__boov__21.mp4"},{id:"dune-calor-DuneCalor__9zmu__20",name:"dune-calor+vgx7/13",path:"/loops/dune-calor/DuneCalor__9zmu__20.mp4"},{id:"dune-calor-DuneCalor__58l1__19",name:"dune-calor+sur1/14",path:"/loops/dune-calor/DuneCalor__58l1__19.mp4"},{id:"dune-calor-DuneCalor__3imq__18",name:"dune-calor+3t6r/15",path:"/loops/dune-calor/DuneCalor__3imq__18.mp4"},{id:"dune-calor-DuneCalor__2640__17",name:"dune-calor+my13/16",path:"/loops/dune-calor/DuneCalor__2640__17.mp4"},{id:"dune-calor-DuneCalor__0qbm__16",name:"dune-calor+e0sd/17",path:"/loops/dune-calor/DuneCalor__0qbm__16.mp4"},{id:"dune-calor-DuneCalor__yt96__15",name:"dune-calor+gui1/18",path:"/loops/dune-calor/DuneCalor__yt96__15.mp4"},{id:"dune-calor-DuneCalor__uq1c__14",name:"dune-calor+n63u/19",path:"/loops/dune-calor/DuneCalor__uq1c__14.mp4"},{id:"dune-calor-DuneCalor__r5wx__13",name:"dune-calor+l7rd/20",path:"/loops/dune-calor/DuneCalor__r5wx__13.mp4"},{id:"dune-calor-DuneCalor__pn31__12",name:"dune-calor+r1fg/21",path:"/loops/dune-calor/DuneCalor__pn31__12.mp4"},{id:"dune-calor-DuneCalor__o7qd__11",name:"dune-calor+4fpp/22",path:"/loops/dune-calor/DuneCalor__o7qd__11.mp4"},{id:"dune-calor-DuneCalor__mkn8__10",name:"dune-calor+73xf/23",path:"/loops/dune-calor/DuneCalor__mkn8__10.mp4"},{id:"dune-calor-DuneCalor__hjdo__9",name:"dune-calor+83g1/24",path:"/loops/dune-calor/DuneCalor__hjdo__9.mp4"},{id:"dune-calor-DuneCalor__f5yy__8",name:"dune-calor+spfd/25",path:"/loops/dune-calor/DuneCalor__f5yy__8.mp4"},{id:"dune-calor-DuneCalor__du3q__7",name:"dune-calor+k62s/26",path:"/loops/dune-calor/DuneCalor__du3q__7.mp4"},{id:"dune-calor-DuneCalor__ae5z__6",name:"dune-calor+yk8g/27",path:"/loops/dune-calor/DuneCalor__ae5z__6.mp4"},{id:"dune-calor-DuneCalor__8m68__5",name:"dune-calor+70cd/28",path:"/loops/dune-calor/DuneCalor__8m68__5.mp4"},{id:"dune-calor-DuneCalor__6q42__4",name:"dune-calor+bb3r/29",path:"/loops/dune-calor/DuneCalor__6q42__4.mp4"},{id:"dune-calor-DuneCalor__4saj__3",name:"dune-calor+lzcv/30",path:"/loops/dune-calor/DuneCalor__4saj__3.mp4"},{id:"dune-calor-DuneCalor__0i48__2",name:"dune-calor+xdbw/31",path:"/loops/dune-calor/DuneCalor__0i48__2.mp4"},{id:"dune-calor-DuneCalor__ijcc__1",name:"dune-calor+hfde/32",path:"/loops/dune-calor/DuneCalor__ijcc__1.mp4"}]},{folder:"rainy-city-night",mtime:17812579043119995e-4,videos:[{id:"rainy-city-night-RainyCityNight__t5bt__7",name:"rainy-city-night+j0rq/1",path:"/loops/rainy-city-night/RainyCityNight__t5bt__7.mp4"},{id:"rainy-city-night-RainyCityNight__st4j__23",name:"rainy-city-night+dqrq/2",path:"/loops/rainy-city-night/RainyCityNight__st4j__23.mp4"},{id:"rainy-city-night-RainyCityNight__ojoq__21",name:"rainy-city-night+rlro/3",path:"/loops/rainy-city-night/RainyCityNight__ojoq__21.mp4"},{id:"rainy-city-night-RainyCityNight__oiu4__6",name:"rainy-city-night+11bb/4",path:"/loops/rainy-city-night/RainyCityNight__oiu4__6.mp4"},{id:"rainy-city-night-RainyCityNight__mut8__5",name:"rainy-city-night+okvj/5",path:"/loops/rainy-city-night/RainyCityNight__mut8__5.mp4"},{id:"rainy-city-night-RainyCityNight__mhrn__20",name:"rainy-city-night+yl70/6",path:"/loops/rainy-city-night/RainyCityNight__mhrn__20.mp4"},{id:"rainy-city-night-RainyCityNight__lh8l__4",name:"rainy-city-night+kn2g/7",path:"/loops/rainy-city-night/RainyCityNight__lh8l__4.mp4"},{id:"rainy-city-night-RainyCityNight__kix7__19",name:"rainy-city-night+716k/8",path:"/loops/rainy-city-night/RainyCityNight__kix7__19.mp4"},{id:"rainy-city-night-RainyCityNight__iuzo__18",name:"rainy-city-night+bi9u/9",path:"/loops/rainy-city-night/RainyCityNight__iuzo__18.mp4"},{id:"rainy-city-night-RainyCityNight__i31r__2",name:"rainy-city-night+gd4m/10",path:"/loops/rainy-city-night/RainyCityNight__i31r__2.mp4"},{id:"rainy-city-night-RainyCityNight__gvvt__17",name:"rainy-city-night+gw6d/11",path:"/loops/rainy-city-night/RainyCityNight__gvvt__17.mp4"},{id:"rainy-city-night-RainyCityNight__g1xh__1",name:"rainy-city-night+gzf5/12",path:"/loops/rainy-city-night/RainyCityNight__g1xh__1.mp4"},{id:"rainy-city-night-RainyCityNight__fx3r__32",name:"rainy-city-night+d5ky/13",path:"/loops/rainy-city-night/RainyCityNight__fx3r__32.mp4"},{id:"rainy-city-night-RainyCityNight__f8pc__16",name:"rainy-city-night+74tj/14",path:"/loops/rainy-city-night/RainyCityNight__f8pc__16.mp4"},{id:"rainy-city-night-RainyCityNight__ccrk__30",name:"rainy-city-night+uadv/15",path:"/loops/rainy-city-night/RainyCityNight__ccrk__30.mp4"},{id:"rainy-city-night-RainyCityNight__avxe__29",name:"rainy-city-night+di58/16",path:"/loops/rainy-city-night/RainyCityNight__avxe__29.mp4"},{id:"rainy-city-night-RainyCityNight__9yc2__14",name:"rainy-city-night+gh6u/17",path:"/loops/rainy-city-night/RainyCityNight__9yc2__14.mp4"},{id:"rainy-city-night-RainyCityNight__95o9__28",name:"rainy-city-night+j45p/18",path:"/loops/rainy-city-night/RainyCityNight__95o9__28.mp4"},{id:"rainy-city-night-RainyCityNight__827t__13",name:"rainy-city-night+mmia/19",path:"/loops/rainy-city-night/RainyCityNight__827t__13.mp4"},{id:"rainy-city-night-RainyCityNight__7dss__27",name:"rainy-city-night+thty/20",path:"/loops/rainy-city-night/RainyCityNight__7dss__27.mp4"},{id:"rainy-city-night-RainyCityNight__5x47__12",name:"rainy-city-night+7yk0/21",path:"/loops/rainy-city-night/RainyCityNight__5x47__12.mp4"},{id:"rainy-city-night-RainyCityNight__5qk8__26",name:"rainy-city-night+7vqy/22",path:"/loops/rainy-city-night/RainyCityNight__5qk8__26.mp4"},{id:"rainy-city-night-RainyCityNight__42fw__25",name:"rainy-city-night+b1dv/23",path:"/loops/rainy-city-night/RainyCityNight__42fw__25.mp4"},{id:"rainy-city-night-RainyCityNight__3zb1__11",name:"rainy-city-night+pwpa/24",path:"/loops/rainy-city-night/RainyCityNight__3zb1__11.mp4"},{id:"rainy-city-night-RainyCityNight__29ei__10",name:"rainy-city-night+6u3o/25",path:"/loops/rainy-city-night/RainyCityNight__29ei__10.mp4"},{id:"rainy-city-night-RainyCityNight__2723__24",name:"rainy-city-night+2vnr/26",path:"/loops/rainy-city-night/RainyCityNight__2723__24.mp4"},{id:"rainy-city-night-RainyCityNight__1ypu__8",name:"rainy-city-night+l4ak/27",path:"/loops/rainy-city-night/RainyCityNight__1ypu__8.mp4"},{id:"rainy-city-night-RainyCityNight__0bwu__9",name:"rainy-city-night+g6jb/28",path:"/loops/rainy-city-night/RainyCityNight__0bwu__9.mp4"}]},{folder:"liquid-metal",mtime:1781257904052852e-3,videos:[{id:"liquid-metal-LiquidMetal__zdsd__24",name:"liquid-metal+bi8a/1",path:"/loops/liquid-metal/LiquidMetal__zdsd__24.mp4"},{id:"liquid-metal-LiquidMetal__yyos__23",name:"liquid-metal+fct6/2",path:"/loops/liquid-metal/LiquidMetal__yyos__23.mp4"},{id:"liquid-metal-LiquidMetal__y3c6__10",name:"liquid-metal+k7ao/3",path:"/loops/liquid-metal/LiquidMetal__y3c6__10.mp4"},{id:"liquid-metal-LiquidMetal__xdqq__15",name:"liquid-metal+k5uz/4",path:"/loops/liquid-metal/LiquidMetal__xdqq__15.mp4"},{id:"liquid-metal-LiquidMetal__v19j__29",name:"liquid-metal+yuuo/5",path:"/loops/liquid-metal/LiquidMetal__v19j__29.mp4"},{id:"liquid-metal-LiquidMetal__u932__30",name:"liquid-metal+1kh7/6",path:"/loops/liquid-metal/LiquidMetal__u932__30.mp4"},{id:"liquid-metal-LiquidMetal__s0gr__13",name:"liquid-metal+pfxg/7",path:"/loops/liquid-metal/LiquidMetal__s0gr__13.mp4"},{id:"liquid-metal-LiquidMetal__r1qa__22",name:"liquid-metal+ri5z/8",path:"/loops/liquid-metal/LiquidMetal__r1qa__22.mp4"},{id:"liquid-metal-LiquidMetal__ofg8__8",name:"liquid-metal+9e5a/9",path:"/loops/liquid-metal/LiquidMetal__ofg8__8.mp4"},{id:"liquid-metal-LiquidMetal__me9h__11",name:"liquid-metal+mg3d/10",path:"/loops/liquid-metal/LiquidMetal__me9h__11.mp4"},{id:"liquid-metal-LiquidMetal__mcqk__20",name:"liquid-metal+nrcz/11",path:"/loops/liquid-metal/LiquidMetal__mcqk__20.mp4"},{id:"liquid-metal-LiquidMetal__lbg7__18",name:"liquid-metal+45xg/12",path:"/loops/liquid-metal/LiquidMetal__lbg7__18.mp4"},{id:"liquid-metal-LiquidMetal__l37r__5",name:"liquid-metal+wcav/13",path:"/loops/liquid-metal/LiquidMetal__l37r__5.mp4"},{id:"liquid-metal-LiquidMetal__k745__9",name:"liquid-metal+eb7h/14",path:"/loops/liquid-metal/LiquidMetal__k745__9.mp4"},{id:"liquid-metal-LiquidMetal__k5r8__25",name:"liquid-metal+4f0x/15",path:"/loops/liquid-metal/LiquidMetal__k5r8__25.mp4"},{id:"liquid-metal-LiquidMetal__il42__6",name:"liquid-metal+s2sg/16",path:"/loops/liquid-metal/LiquidMetal__il42__6.mp4"},{id:"liquid-metal-LiquidMetal__ihin__21",name:"liquid-metal+g27b/17",path:"/loops/liquid-metal/LiquidMetal__ihin__21.mp4"},{id:"liquid-metal-LiquidMetal__gzf3__4",name:"liquid-metal+36ae/18",path:"/loops/liquid-metal/LiquidMetal__gzf3__4.mp4"},{id:"liquid-metal-LiquidMetal__gzdm__7",name:"liquid-metal+nn37/19",path:"/loops/liquid-metal/LiquidMetal__gzdm__7.mp4"},{id:"liquid-metal-LiquidMetal__fy68__3",name:"liquid-metal+p035/20",path:"/loops/liquid-metal/LiquidMetal__fy68__3.mp4"},{id:"liquid-metal-LiquidMetal__enfd__28",name:"liquid-metal+42ma/21",path:"/loops/liquid-metal/LiquidMetal__enfd__28.mp4"},{id:"liquid-metal-LiquidMetal__c89c__1",name:"liquid-metal+4gl0/22",path:"/loops/liquid-metal/LiquidMetal__c89c__1.mp4"},{id:"liquid-metal-LiquidMetal__9t80__16",name:"liquid-metal+6g36/23",path:"/loops/liquid-metal/LiquidMetal__9t80__16.mp4"},{id:"liquid-metal-LiquidMetal__9qcs__2",name:"liquid-metal+b0wv/24",path:"/loops/liquid-metal/LiquidMetal__9qcs__2.mp4"},{id:"liquid-metal-LiquidMetal__8vtk__14",name:"liquid-metal+owyn/25",path:"/loops/liquid-metal/LiquidMetal__8vtk__14.mp4"},{id:"liquid-metal-LiquidMetal__7jda__19",name:"liquid-metal+tqsd/26",path:"/loops/liquid-metal/LiquidMetal__7jda__19.mp4"},{id:"liquid-metal-LiquidMetal__4yvb__26",name:"liquid-metal+1n0r/27",path:"/loops/liquid-metal/LiquidMetal__4yvb__26.mp4"},{id:"liquid-metal-LiquidMetal__4tc3__32",name:"liquid-metal+jo8n/28",path:"/loops/liquid-metal/LiquidMetal__4tc3__32.mp4"},{id:"liquid-metal-LiquidMetal__4hbc__17",name:"liquid-metal+u0yc/29",path:"/loops/liquid-metal/LiquidMetal__4hbc__17.mp4"},{id:"liquid-metal-LiquidMetal__3odu__31",name:"liquid-metal+2jsm/30",path:"/loops/liquid-metal/LiquidMetal__3odu__31.mp4"},{id:"liquid-metal-LiquidMetal__3ksv__27",name:"liquid-metal+xqbf/31",path:"/loops/liquid-metal/LiquidMetal__3ksv__27.mp4"},{id:"liquid-metal-LiquidMetal__1jhb__12",name:"liquid-metal+eiqx/32",path:"/loops/liquid-metal/LiquidMetal__1jhb__12.mp4"},{id:"liquid-metal-ObsidianTide__7sp4__19",name:"liquid-metal+dkcj/33",path:"/loops/liquid-metal/ObsidianTide__7sp4__19.mp4"},{id:"liquid-metal-WhiteHole__q5ss__130",name:"liquid-metal+a0ci/34",path:"/loops/liquid-metal/WhiteHole__q5ss__130.mp4"},{id:"liquid-metal-WhiteHole__s3hf__129",name:"liquid-metal+abne/35",path:"/loops/liquid-metal/WhiteHole__s3hf__129.mp4"}]},{folder:"fire-sparkles",mtime:17812579038458213e-4,videos:[{id:"fire-sparkles-FireSparkles__zwy5__32",name:"fire-sparkles+a382/1",path:"/loops/fire-sparkles/FireSparkles__zwy5__32.mp4"},{id:"fire-sparkles-FireSparkles__zgl2__8",name:"fire-sparkles+1nx4/2",path:"/loops/fire-sparkles/FireSparkles__zgl2__8.mp4"},{id:"fire-sparkles-FireSparkles__yb76__31",name:"fire-sparkles+zafq/3",path:"/loops/fire-sparkles/FireSparkles__yb76__31.mp4"},{id:"fire-sparkles-FireSparkles__xu2i__7",name:"fire-sparkles+3vdm/4",path:"/loops/fire-sparkles/FireSparkles__xu2i__7.mp4"},{id:"fire-sparkles-FireSparkles__wp26__30",name:"fire-sparkles+dn9z/5",path:"/loops/fire-sparkles/FireSparkles__wp26__30.mp4"},{id:"fire-sparkles-FireSparkles__w7zj__6",name:"fire-sparkles+lrhr/6",path:"/loops/fire-sparkles/FireSparkles__w7zj__6.mp4"},{id:"fire-sparkles-FireSparkles__vg37__29",name:"fire-sparkles+541t/7",path:"/loops/fire-sparkles/FireSparkles__vg37__29.mp4"},{id:"fire-sparkles-FireSparkles__un01__5",name:"fire-sparkles+poe5/8",path:"/loops/fire-sparkles/FireSparkles__un01__5.mp4"},{id:"fire-sparkles-FireSparkles__tuzb__28",name:"fire-sparkles+dhx3/9",path:"/loops/fire-sparkles/FireSparkles__tuzb__28.mp4"},{id:"fire-sparkles-FireSparkles__t1sg__4",name:"fire-sparkles+uyks/10",path:"/loops/fire-sparkles/FireSparkles__t1sg__4.mp4"},{id:"fire-sparkles-FireSparkles__s6vi__27",name:"fire-sparkles+qndt/11",path:"/loops/fire-sparkles/FireSparkles__s6vi__27.mp4"},{id:"fire-sparkles-FireSparkles__rgsd__3",name:"fire-sparkles+kew8/12",path:"/loops/fire-sparkles/FireSparkles__rgsd__3.mp4"},{id:"fire-sparkles-FireSparkles__qm3m__26",name:"fire-sparkles+mb89/13",path:"/loops/fire-sparkles/FireSparkles__qm3m__26.mp4"},{id:"fire-sparkles-FireSparkles__pxzg__2",name:"fire-sparkles+31lq/14",path:"/loops/fire-sparkles/FireSparkles__pxzg__2.mp4"},{id:"fire-sparkles-FireSparkles__oy3q__25",name:"fire-sparkles+5kfz/15",path:"/loops/fire-sparkles/FireSparkles__oy3q__25.mp4"},{id:"fire-sparkles-FireSparkles__na8n__24",name:"fire-sparkles+2e54/16",path:"/loops/fire-sparkles/FireSparkles__na8n__24.mp4"},{id:"fire-sparkles-FireSparkles__m9ot__1",name:"fire-sparkles+60c6/17",path:"/loops/fire-sparkles/FireSparkles__m9ot__1.mp4"},{id:"fire-sparkles-FireSparkles__m0v2__23",name:"fire-sparkles+anka/18",path:"/loops/fire-sparkles/FireSparkles__m0v2__23.mp4"},{id:"fire-sparkles-FireSparkles__kfd7__22",name:"fire-sparkles+5y1o/19",path:"/loops/fire-sparkles/FireSparkles__kfd7__22.mp4"},{id:"fire-sparkles-FireSparkles__iuqg__21",name:"fire-sparkles+f8hj/20",path:"/loops/fire-sparkles/FireSparkles__iuqg__21.mp4"},{id:"fire-sparkles-FireSparkles__gvio__20",name:"fire-sparkles+lqy5/21",path:"/loops/fire-sparkles/FireSparkles__gvio__20.mp4"},{id:"fire-sparkles-FireSparkles__fa60__19",name:"fire-sparkles+6v9g/22",path:"/loops/fire-sparkles/FireSparkles__fa60__19.mp4"},{id:"fire-sparkles-FireSparkles__dy8n__18",name:"fire-sparkles+r2zm/23",path:"/loops/fire-sparkles/FireSparkles__dy8n__18.mp4"},{id:"fire-sparkles-FireSparkles__ce0y__17",name:"fire-sparkles+lswr/24",path:"/loops/fire-sparkles/FireSparkles__ce0y__17.mp4"},{id:"fire-sparkles-FireSparkles__b5b5__16",name:"fire-sparkles+59cs/25",path:"/loops/fire-sparkles/FireSparkles__b5b5__16.mp4"},{id:"fire-sparkles-FireSparkles__9wax__15",name:"fire-sparkles+5k4m/26",path:"/loops/fire-sparkles/FireSparkles__9wax__15.mp4"},{id:"fire-sparkles-FireSparkles__8bi6__14",name:"fire-sparkles+h92v/27",path:"/loops/fire-sparkles/FireSparkles__8bi6__14.mp4"},{id:"fire-sparkles-FireSparkles__71i9__13",name:"fire-sparkles+w19k/28",path:"/loops/fire-sparkles/FireSparkles__71i9__13.mp4"},{id:"fire-sparkles-FireSparkles__5tyi__12",name:"fire-sparkles+ubo0/29",path:"/loops/fire-sparkles/FireSparkles__5tyi__12.mp4"},{id:"fire-sparkles-FireSparkles__48n9__11",name:"fire-sparkles+eexw/30",path:"/loops/fire-sparkles/FireSparkles__48n9__11.mp4"},{id:"fire-sparkles-FireSparkles__2mj7__10",name:"fire-sparkles+i83u/31",path:"/loops/fire-sparkles/FireSparkles__2mj7__10.mp4"},{id:"fire-sparkles-FireSparkles__11p4__9",name:"fire-sparkles+bpa7/32",path:"/loops/fire-sparkles/FireSparkles__11p4__9.mp4"}]},{folder:"cosmodernism",mtime:17812579035775671e-4,videos:[{id:"cosmodernism-Cosmodernism__z8xq__14",name:"cosmodernism+hv04/1",path:"/loops/cosmodernism/Cosmodernism__z8xq__14.mp4"},{id:"cosmodernism-Cosmodernism__z44e__24",name:"cosmodernism+br8c/2",path:"/loops/cosmodernism/Cosmodernism__z44e__24.mp4"},{id:"cosmodernism-Cosmodernism__ys7w__21",name:"cosmodernism+ixzs/3",path:"/loops/cosmodernism/Cosmodernism__ys7w__21.mp4"},{id:"cosmodernism-Cosmodernism__y0if__18",name:"cosmodernism+qjg1/4",path:"/loops/cosmodernism/Cosmodernism__y0if__18.mp4"},{id:"cosmodernism-Cosmodernism__xo5z__1",name:"cosmodernism+pnrr/5",path:"/loops/cosmodernism/Cosmodernism__xo5z__1.mp4"},{id:"cosmodernism-Cosmodernism__x5wh__25",name:"cosmodernism+201m/6",path:"/loops/cosmodernism/Cosmodernism__x5wh__25.mp4"},{id:"cosmodernism-Cosmodernism__q177__4",name:"cosmodernism+6zst/7",path:"/loops/cosmodernism/Cosmodernism__q177__4.mp4"},{id:"cosmodernism-Cosmodernism__o8qa__16",name:"cosmodernism+k55a/8",path:"/loops/cosmodernism/Cosmodernism__o8qa__16.mp4"},{id:"cosmodernism-Cosmodernism__m7lw__30",name:"cosmodernism+42ck/9",path:"/loops/cosmodernism/Cosmodernism__m7lw__30.mp4"},{id:"cosmodernism-Cosmodernism__koju__8",name:"cosmodernism+xavl/10",path:"/loops/cosmodernism/Cosmodernism__koju__8.mp4"},{id:"cosmodernism-Cosmodernism__jrkx__11",name:"cosmodernism+7ioz/11",path:"/loops/cosmodernism/Cosmodernism__jrkx__11.mp4"},{id:"cosmodernism-Cosmodernism__imrt__13",name:"cosmodernism+moyl/12",path:"/loops/cosmodernism/Cosmodernism__imrt__13.mp4"},{id:"cosmodernism-Cosmodernism__fwjb__7",name:"cosmodernism+yffw/13",path:"/loops/cosmodernism/Cosmodernism__fwjb__7.mp4"},{id:"cosmodernism-Cosmodernism__b56j__31",name:"cosmodernism+z5dg/14",path:"/loops/cosmodernism/Cosmodernism__b56j__31.mp4"},{id:"cosmodernism-Cosmodernism__9ygm__19",name:"cosmodernism+ls5b/15",path:"/loops/cosmodernism/Cosmodernism__9ygm__19.mp4"},{id:"cosmodernism-Cosmodernism__97mk__6",name:"cosmodernism+qb2i/16",path:"/loops/cosmodernism/Cosmodernism__97mk__6.mp4"},{id:"cosmodernism-Cosmodernism__85d9__2",name:"cosmodernism+prth/17",path:"/loops/cosmodernism/Cosmodernism__85d9__2.mp4"},{id:"cosmodernism-Cosmodernism__84k3__27",name:"cosmodernism+qqzj/18",path:"/loops/cosmodernism/Cosmodernism__84k3__27.mp4"},{id:"cosmodernism-Cosmodernism__6ay0__10",name:"cosmodernism+7b4t/19",path:"/loops/cosmodernism/Cosmodernism__6ay0__10.mp4"},{id:"cosmodernism-Cosmodernism__3wqb__15",name:"cosmodernism+9i83/20",path:"/loops/cosmodernism/Cosmodernism__3wqb__15.mp4"},{id:"cosmodernism-Cosmodernism__1vut__5",name:"cosmodernism+qy14/21",path:"/loops/cosmodernism/Cosmodernism__1vut__5.mp4"},{id:"cosmodernism-Cosmodernism__1tu4__22",name:"cosmodernism+ysqb/22",path:"/loops/cosmodernism/Cosmodernism__1tu4__22.mp4"},{id:"cosmodernism-WhiteHole__a47l__290",name:"cosmodernism+sz4c/23",path:"/loops/cosmodernism/WhiteHole__a47l__290.mp4"},{id:"cosmodernism-WhiteHole__fprp__289",name:"cosmodernism+cvki/24",path:"/loops/cosmodernism/WhiteHole__fprp__289.mp4"}]},{folder:"obsidian-tide",mtime:178110982610477e-2,videos:[{id:"obsidian-tide-ObsidianTide__z2we__13",name:"obsidian-tide+whli/1",path:"/loops/obsidian-tide/ObsidianTide__z2we__13.mp4"},{id:"obsidian-tide-ObsidianTide__xg54__12",name:"obsidian-tide+9pyt/2",path:"/loops/obsidian-tide/ObsidianTide__xg54__12.mp4"},{id:"obsidian-tide-ObsidianTide__w5nn__11",name:"obsidian-tide+ir74/3",path:"/loops/obsidian-tide/ObsidianTide__w5nn__11.mp4"},{id:"obsidian-tide-ObsidianTide__uz94__10",name:"obsidian-tide+pk12/4",path:"/loops/obsidian-tide/ObsidianTide__uz94__10.mp4"},{id:"obsidian-tide-ObsidianTide__ts0g__9",name:"obsidian-tide+jdpm/5",path:"/loops/obsidian-tide/ObsidianTide__ts0g__9.mp4"},{id:"obsidian-tide-ObsidianTide__sham__32",name:"obsidian-tide+ltps/6",path:"/loops/obsidian-tide/ObsidianTide__sham__32.mp4"},{id:"obsidian-tide-ObsidianTide__sgmi__8",name:"obsidian-tide+bpa0/7",path:"/loops/obsidian-tide/ObsidianTide__sgmi__8.mp4"},{id:"obsidian-tide-ObsidianTide__r9ce__7",name:"obsidian-tide+40yd/8",path:"/loops/obsidian-tide/ObsidianTide__r9ce__7.mp4"},{id:"obsidian-tide-ObsidianTide__qq8k__31",name:"obsidian-tide+e516/9",path:"/loops/obsidian-tide/ObsidianTide__qq8k__31.mp4"},{id:"obsidian-tide-ObsidianTide__pp22__6",name:"obsidian-tide+dg4h/10",path:"/loops/obsidian-tide/ObsidianTide__pp22__6.mp4"},{id:"obsidian-tide-ObsidianTide__p4s3__30",name:"obsidian-tide+vfzi/11",path:"/loops/obsidian-tide/ObsidianTide__p4s3__30.mp4"},{id:"obsidian-tide-ObsidianTide__nxxa__5",name:"obsidian-tide+jey2/12",path:"/loops/obsidian-tide/ObsidianTide__nxxa__5.mp4"},{id:"obsidian-tide-ObsidianTide__ncvy__29",name:"obsidian-tide+gjog/13",path:"/loops/obsidian-tide/ObsidianTide__ncvy__29.mp4"},{id:"obsidian-tide-ObsidianTide__mao4__4",name:"obsidian-tide+j9lz/14",path:"/loops/obsidian-tide/ObsidianTide__mao4__4.mp4"},{id:"obsidian-tide-ObsidianTide__lt63__28",name:"obsidian-tide+vprx/15",path:"/loops/obsidian-tide/ObsidianTide__lt63__28.mp4"},{id:"obsidian-tide-ObsidianTide__kzff__3",name:"obsidian-tide+2vbe/16",path:"/loops/obsidian-tide/ObsidianTide__kzff__3.mp4"},{id:"obsidian-tide-ObsidianTide__k5rr__27",name:"obsidian-tide+ybav/17",path:"/loops/obsidian-tide/ObsidianTide__k5rr__27.mp4"},{id:"obsidian-tide-ObsidianTide__j9jl__2",name:"obsidian-tide+d2ev/18",path:"/loops/obsidian-tide/ObsidianTide__j9jl__2.mp4"},{id:"obsidian-tide-ObsidianTide__iltd__26",name:"obsidian-tide+hftl/19",path:"/loops/obsidian-tide/ObsidianTide__iltd__26.mp4"},{id:"obsidian-tide-ObsidianTide__hmxb__1",name:"obsidian-tide+lvxt/20",path:"/loops/obsidian-tide/ObsidianTide__hmxb__1.mp4"},{id:"obsidian-tide-ObsidianTide__h8zs__25",name:"obsidian-tide+rap6/21",path:"/loops/obsidian-tide/ObsidianTide__h8zs__25.mp4"},{id:"obsidian-tide-ObsidianTide__g232__24",name:"obsidian-tide+x5xc/22",path:"/loops/obsidian-tide/ObsidianTide__g232__24.mp4"},{id:"obsidian-tide-ObsidianTide__ess7__23",name:"obsidian-tide+cpz7/23",path:"/loops/obsidian-tide/ObsidianTide__ess7__23.mp4"},{id:"obsidian-tide-ObsidianTide__cjo4__22",name:"obsidian-tide+nf7t/24",path:"/loops/obsidian-tide/ObsidianTide__cjo4__22.mp4"},{id:"obsidian-tide-ObsidianTide__ayug__21",name:"obsidian-tide+i8jp/25",path:"/loops/obsidian-tide/ObsidianTide__ayug__21.mp4"},{id:"obsidian-tide-ObsidianTide__9ef1__20",name:"obsidian-tide+buen/26",path:"/loops/obsidian-tide/ObsidianTide__9ef1__20.mp4"},{id:"obsidian-tide-ObsidianTide__68bm__18",name:"obsidian-tide+zf3l/27",path:"/loops/obsidian-tide/ObsidianTide__68bm__18.mp4"},{id:"obsidian-tide-ObsidianTide__4plc__17",name:"obsidian-tide+h2yl/28",path:"/loops/obsidian-tide/ObsidianTide__4plc__17.mp4"},{id:"obsidian-tide-ObsidianTide__3jdb__16",name:"obsidian-tide+1vjx/29",path:"/loops/obsidian-tide/ObsidianTide__3jdb__16.mp4"},{id:"obsidian-tide-ObsidianTide__25c5__15",name:"obsidian-tide+ax22/30",path:"/loops/obsidian-tide/ObsidianTide__25c5__15.mp4"},{id:"obsidian-tide-ObsidianTide__0l66__14",name:"obsidian-tide+jv77/31",path:"/loops/obsidian-tide/ObsidianTide__0l66__14.mp4"}]},{folder:"hex-skull",mtime:17805429518119705e-4,videos:[{id:"hex-skull-perfect_loop_1780010165946",name:"hex-skull+3e7u/1",path:"/loops/hex-skull/perfect_loop_1780010165946.mp4"},{id:"hex-skull-HexSkull__yjus__9",name:"hex-skull+nu66/2",path:"/loops/hex-skull/HexSkull__yjus__9.mp4"},{id:"hex-skull-HexSkull__ubus__6",name:"hex-skull+l2mb/3",path:"/loops/hex-skull/HexSkull__ubus__6.mp4"},{id:"hex-skull-HexSkull__szqp__5",name:"hex-skull+6jut/4",path:"/loops/hex-skull/HexSkull__szqp__5.mp4"},{id:"hex-skull-HexSkull__ra6y__4",name:"hex-skull+3hqn/5",path:"/loops/hex-skull/HexSkull__ra6y__4.mp4"},{id:"hex-skull-HexSkull__oqop__2",name:"hex-skull+bs70/6",path:"/loops/hex-skull/HexSkull__oqop__2.mp4"},{id:"hex-skull-HexSkull__5zgw__1",name:"hex-skull+7f28/7",path:"/loops/hex-skull/HexSkull__5zgw__1.mp4"}]},{folder:"point-cloud",mtime:1779574401397,videos:[{id:"point-cloud-PointCloud__jfkh__98",name:"point-cloud+9vmi/1",path:"/loops/point-cloud/PointCloud__jfkh__98.mp4"},{id:"point-cloud-PointCloud__l0jx__97",name:"point-cloud+7ejn/2",path:"/loops/point-cloud/PointCloud__l0jx__97.mp4"},{id:"point-cloud-PointCloud__8k62__81",name:"point-cloud+maoi/3",path:"/loops/point-cloud/PointCloud__8k62__81.mp4"},{id:"point-cloud-PointCloud__a4zf__80",name:"point-cloud+4mp2/4",path:"/loops/point-cloud/PointCloud__a4zf__80.mp4"},{id:"point-cloud-PointCloud__f896__78",name:"point-cloud+tsou/5",path:"/loops/point-cloud/PointCloud__f896__78.mp4"},{id:"point-cloud-PointCloud__kufa__76",name:"point-cloud+3uiy/6",path:"/loops/point-cloud/PointCloud__kufa__76.mp4"},{id:"point-cloud-PointCloud__qtt1__85",name:"point-cloud+fj49/7",path:"/loops/point-cloud/PointCloud__qtt1__85.mp4"},{id:"point-cloud-PointCloud__gjq2__70",name:"point-cloud+dg6j/8",path:"/loops/point-cloud/PointCloud__gjq2__70.mp4"},{id:"point-cloud-PointCloud__k7c3__66",name:"point-cloud+yaru/9",path:"/loops/point-cloud/PointCloud__k7c3__66.mp4"},{id:"point-cloud-PointCloud__lz8q__64",name:"point-cloud+pbwf/10",path:"/loops/point-cloud/PointCloud__lz8q__64.mp4"},{id:"point-cloud-PointCloud__mou4__63",name:"point-cloud+9cmw/11",path:"/loops/point-cloud/PointCloud__mou4__63.mp4"},{id:"point-cloud-PointCloud__nr2e__74",name:"point-cloud+6qu8/12",path:"/loops/point-cloud/PointCloud__nr2e__74.mp4"},{id:"point-cloud-PointCloud__2mpx__53",name:"point-cloud+wuli/13",path:"/loops/point-cloud/PointCloud__2mpx__53.mp4"},{id:"point-cloud-PointCloud__658u__51",name:"point-cloud+69z0/14",path:"/loops/point-cloud/PointCloud__658u__51.mp4"},{id:"point-cloud-PointCloud__9kng__49",name:"point-cloud+cfnv/15",path:"/loops/point-cloud/PointCloud__9kng__49.mp4"},{id:"point-cloud-PointCloud__euwy__46",name:"point-cloud+1p5e/16",path:"/loops/point-cloud/PointCloud__euwy__46.mp4"},{id:"point-cloud-PointCloud__iq36__44",name:"point-cloud+5far/17",path:"/loops/point-cloud/PointCloud__iq36__44.mp4"},{id:"point-cloud-PointCloud__o49b__41",name:"point-cloud+ykgx/18",path:"/loops/point-cloud/PointCloud__o49b__41.mp4"},{id:"point-cloud-PointCloud__2yci__33",name:"point-cloud+t6k8/19",path:"/loops/point-cloud/PointCloud__2yci__33.mp4"},{id:"point-cloud-PointCloud__ptje__40",name:"point-cloud+it47/20",path:"/loops/point-cloud/PointCloud__ptje__40.mp4"},{id:"point-cloud-PointCloud__pxgy__31",name:"point-cloud+fx5m/21",path:"/loops/point-cloud/PointCloud__pxgy__31.mp4"},{id:"point-cloud-PointCloud__1fjn__25",name:"point-cloud+755i/22",path:"/loops/point-cloud/PointCloud__1fjn__25.mp4"},{id:"point-cloud-PointCloud__55q4__23",name:"point-cloud+rud0/23",path:"/loops/point-cloud/PointCloud__55q4__23.mp4"},{id:"point-cloud-PointCloud__aioh__21",name:"point-cloud+r5fx/24",path:"/loops/point-cloud/PointCloud__aioh__21.mp4"},{id:"point-cloud-PointCloud__cdp7__20",name:"point-cloud+7qrv/25",path:"/loops/point-cloud/PointCloud__cdp7__20.mp4"},{id:"point-cloud-PointCloud__cycv__9",name:"point-cloud+84ns/26",path:"/loops/point-cloud/PointCloud__cycv__9.mp4"},{id:"point-cloud-PointCloud__fgil__13",name:"point-cloud+38z4/27",path:"/loops/point-cloud/PointCloud__fgil__13.mp4"},{id:"point-cloud-PointCloud__ippk__11",name:"point-cloud+qxbo/28",path:"/loops/point-cloud/PointCloud__ippk__11.mp4"},{id:"point-cloud-PointCloud__jkof__10",name:"point-cloud+ot33/29",path:"/loops/point-cloud/PointCloud__jkof__10.mp4"},{id:"point-cloud-PointCloud__2syz__6",name:"point-cloud+1sbm/30",path:"/loops/point-cloud/PointCloud__2syz__6.mp4"},{id:"point-cloud-PointCloud__cdh5__3",name:"point-cloud+py1d/31",path:"/loops/point-cloud/PointCloud__cdh5__3.mp4"},{id:"point-cloud-PointCloud__irc0__1",name:"point-cloud+kjkq/32",path:"/loops/point-cloud/PointCloud__irc0__1.mp4"}]},{folder:"point-cloud-particles",mtime:1779574401397,videos:[{id:"point-cloud-particles-PointCloud__6jt5__95",name:"point-cloud-particles+3d3y/1",path:"/loops/point-cloud-particles/PointCloud__6jt5__95.mp4"},{id:"point-cloud-particles-PointCloud__8eq1__94",name:"point-cloud-particles+5bo2/2",path:"/loops/point-cloud-particles/PointCloud__8eq1__94.mp4"},{id:"point-cloud-particles-PointCloud__bymt__89",name:"point-cloud-particles+e3vh/3",path:"/loops/point-cloud-particles/PointCloud__bymt__89.mp4"},{id:"point-cloud-particles-PointCloud__cclx__92",name:"point-cloud-particles+sntn/4",path:"/loops/point-cloud-particles/PointCloud__cclx__92.mp4"},{id:"point-cloud-particles-PointCloud__ls6c__96",name:"point-cloud-particles+kioy/5",path:"/loops/point-cloud-particles/PointCloud__ls6c__96.mp4"},{id:"point-cloud-particles-PointCloud__mtqj__86",name:"point-cloud-particles+hnl9/6",path:"/loops/point-cloud-particles/PointCloud__mtqj__86.mp4"},{id:"point-cloud-particles-PointCloud__hkji__69",name:"point-cloud-particles+syue/7",path:"/loops/point-cloud-particles/PointCloud__hkji__69.mp4"},{id:"point-cloud-particles-PointCloud__iefy__68",name:"point-cloud-particles+toqc/8",path:"/loops/point-cloud-particles/PointCloud__iefy__68.mp4"},{id:"point-cloud-particles-PointCloud__j80t__67",name:"point-cloud-particles+1049/9",path:"/loops/point-cloud-particles/PointCloud__j80t__67.mp4"},{id:"point-cloud-particles-PointCloud__kwxi__65",name:"point-cloud-particles+1fwg/10",path:"/loops/point-cloud-particles/PointCloud__kwxi__65.mp4"},{id:"point-cloud-particles-PointCloud__m4dj__75",name:"point-cloud-particles+rh89/11",path:"/loops/point-cloud-particles/PointCloud__m4dj__75.mp4"},{id:"point-cloud-particles-PointCloud__xker__71",name:"point-cloud-particles+y589/12",path:"/loops/point-cloud-particles/PointCloud__xker__71.mp4"},{id:"point-cloud-particles-PointCloud__0y5s__54",name:"point-cloud-particles+iik8/13",path:"/loops/point-cloud-particles/PointCloud__0y5s__54.mp4"},{id:"point-cloud-particles-PointCloud__u7sm__58",name:"point-cloud-particles+psep/14",path:"/loops/point-cloud-particles/PointCloud__u7sm__58.mp4"},{id:"point-cloud-particles-PointCloud__d8b0__47",name:"point-cloud-particles+almm/15",path:"/loops/point-cloud-particles/PointCloud__d8b0__47.mp4"},{id:"point-cloud-particles-PointCloud__m72v__42",name:"point-cloud-particles+u6iy/16",path:"/loops/point-cloud-particles/PointCloud__m72v__42.mp4"},{id:"point-cloud-particles-PointCloud__4tqd__32",name:"point-cloud-particles+1v4o/17",path:"/loops/point-cloud-particles/PointCloud__4tqd__32.mp4"},{id:"point-cloud-particles-PointCloud__vvo2__37",name:"point-cloud-particles+ltj9/18",path:"/loops/point-cloud-particles/PointCloud__vvo2__37.mp4"},{id:"point-cloud-particles-PointCloud__zq7h__35",name:"point-cloud-particles+pb2v/19",path:"/loops/point-cloud-particles/PointCloud__zq7h__35.mp4"},{id:"point-cloud-particles-PointCloud__3d0g__24",name:"point-cloud-particles+s3rq/20",path:"/loops/point-cloud-particles/PointCloud__3d0g__24.mp4"},{id:"point-cloud-particles-PointCloud__8px8__22",name:"point-cloud-particles+oljv/21",path:"/loops/point-cloud-particles/PointCloud__8px8__22.mp4"},{id:"point-cloud-particles-PointCloud__xy68__27",name:"point-cloud-particles+de0b/22",path:"/loops/point-cloud-particles/PointCloud__xy68__27.mp4"},{id:"point-cloud-particles-PointCloud__zlyu__26",name:"point-cloud-particles+3gu6/23",path:"/loops/point-cloud-particles/PointCloud__zlyu__26.mp4"},{id:"point-cloud-particles-PointCloud__g12n__18",name:"point-cloud-particles+hz04/24",path:"/loops/point-cloud-particles/PointCloud__g12n__18.mp4"},{id:"point-cloud-particles-PointCloud__hd80__14",name:"point-cloud-particles+gxr6/25",path:"/loops/point-cloud-particles/PointCloud__hd80__14.mp4"},{id:"point-cloud-particles-PointCloud__nv57__16",name:"point-cloud-particles+s7ne/26",path:"/loops/point-cloud-particles/PointCloud__nv57__16.mp4"},{id:"point-cloud-particles-PointCloud__bzy7__7",name:"point-cloud-particles+ux95/27",path:"/loops/point-cloud-particles/PointCloud__bzy7__7.mp4"},{id:"point-cloud-particles-WhiteHole__n2fm__149",name:"point-cloud-particles+lldn/28",path:"/loops/point-cloud-particles/WhiteHole__n2fm__149.mp4"}]},{folder:"point-cloud-undulating",mtime:1779574401397,videos:[{id:"point-cloud-undulating-PointCloud__aq5q__93",name:"point-cloud-undulating+3nma/1",path:"/loops/point-cloud-undulating/PointCloud__aq5q__93.mp4"},{id:"point-cloud-undulating-PointCloud__dk4e__88",name:"point-cloud-undulating+pmrn/2",path:"/loops/point-cloud-undulating/PointCloud__dk4e__88.mp4"},{id:"point-cloud-undulating-PointCloud__dxg8__91",name:"point-cloud-undulating+djw8/3",path:"/loops/point-cloud-undulating/PointCloud__dxg8__91.mp4"},{id:"point-cloud-undulating-PointCloud__fibj__90",name:"point-cloud-undulating+nl8g/4",path:"/loops/point-cloud-undulating/PointCloud__fibj__90.mp4"},{id:"point-cloud-undulating-PointCloud__1wnz__83",name:"point-cloud-undulating+svk7/5",path:"/loops/point-cloud-undulating/PointCloud__1wnz__83.mp4"},{id:"point-cloud-undulating-PointCloud__6zlm__82",name:"point-cloud-undulating+3lkq/6",path:"/loops/point-cloud-undulating/PointCloud__6zlm__82.mp4"},{id:"point-cloud-undulating-PointCloud__do87__79",name:"point-cloud-undulating+9jj4/7",path:"/loops/point-cloud-undulating/PointCloud__do87__79.mp4"},{id:"point-cloud-undulating-PointCloud__grut__77",name:"point-cloud-undulating+z02t/8",path:"/loops/point-cloud-undulating/PointCloud__grut__77.mp4"},{id:"point-cloud-undulating-PointCloud__ktx6__87",name:"point-cloud-undulating+hn85/9",path:"/loops/point-cloud-undulating/PointCloud__ktx6__87.mp4"},{id:"point-cloud-undulating-PointCloud__ucio__84",name:"point-cloud-undulating+9qc4/10",path:"/loops/point-cloud-undulating/PointCloud__ucio__84.mp4"},{id:"point-cloud-undulating-PointCloud__qe2u__60",name:"point-cloud-undulating+8ad1/11",path:"/loops/point-cloud-undulating/PointCloud__qe2u__60.mp4"},{id:"point-cloud-undulating-PointCloud__7nw3__50",name:"point-cloud-undulating+10a5/12",path:"/loops/point-cloud-undulating/PointCloud__7nw3__50.mp4"},{id:"point-cloud-undulating-PointCloud__gnu5__45",name:"point-cloud-undulating+n8zt/13",path:"/loops/point-cloud-undulating/PointCloud__gnu5__45.mp4"},{id:"point-cloud-undulating-PointCloud__kinz__43",name:"point-cloud-undulating+bvxm/14",path:"/loops/point-cloud-undulating/PointCloud__kinz__43.mp4"},{id:"point-cloud-undulating-PointCloud__rv0s__39",name:"point-cloud-undulating+k6e4/15",path:"/loops/point-cloud-undulating/PointCloud__rv0s__39.mp4"},{id:"point-cloud-undulating-PointCloud__w344__28",name:"point-cloud-undulating+fnr0/16",path:"/loops/point-cloud-undulating/PointCloud__w344__28.mp4"},{id:"point-cloud-undulating-PointCloud__hxqx__17",name:"point-cloud-undulating+ykgr/17",path:"/loops/point-cloud-undulating/PointCloud__hxqx__17.mp4"},{id:"point-cloud-undulating-PointCloud__68cu__4",name:"point-cloud-undulating+jw64/18",path:"/loops/point-cloud-undulating/PointCloud__68cu__4.mp4"}]},{folder:"point-cloud-swirling-02",mtime:1779574401394999e-3,videos:[{id:"point-cloud-swirling-02-PointCloud__rxdn__73",name:"point-cloud-swirling-02+qbib/1",path:"/loops/point-cloud-swirling-02/PointCloud__rxdn__73.mp4"},{id:"point-cloud-swirling-02-PointCloud__vzqk__72",name:"point-cloud-swirling-02+tt0n/2",path:"/loops/point-cloud-swirling-02/PointCloud__vzqk__72.mp4"},{id:"point-cloud-swirling-02-PointCloud__s85x__59",name:"point-cloud-swirling-02+q0mn/3",path:"/loops/point-cloud-swirling-02/PointCloud__s85x__59.mp4"},{id:"point-cloud-swirling-02-PointCloud__vuff__57",name:"point-cloud-swirling-02+j014/4",path:"/loops/point-cloud-swirling-02/PointCloud__vuff__57.mp4"},{id:"point-cloud-swirling-02-PointCloud__xntc__56",name:"point-cloud-swirling-02+8nwn/5",path:"/loops/point-cloud-swirling-02/PointCloud__xntc__56.mp4"},{id:"point-cloud-swirling-02-PointCloud__ttxx__38",name:"point-cloud-swirling-02+f7ju/6",path:"/loops/point-cloud-swirling-02/PointCloud__ttxx__38.mp4"},{id:"point-cloud-swirling-02-PointCloud__xjxy__36",name:"point-cloud-swirling-02+6vvt/7",path:"/loops/point-cloud-swirling-02/PointCloud__xjxy__36.mp4"},{id:"point-cloud-swirling-02-PointCloud__sgo2__30",name:"point-cloud-swirling-02+ywbu/8",path:"/loops/point-cloud-swirling-02/PointCloud__sgo2__30.mp4"},{id:"point-cloud-swirling-02-PointCloud__uaim__29",name:"point-cloud-swirling-02+zc55/9",path:"/loops/point-cloud-swirling-02/PointCloud__uaim__29.mp4"},{id:"point-cloud-swirling-02-PointCloud__rve8__15",name:"point-cloud-swirling-02+7ihb/10",path:"/loops/point-cloud-swirling-02/PointCloud__rve8__15.mp4"},{id:"point-cloud-swirling-02-PointCloud__x3g3__12",name:"point-cloud-swirling-02+nfn5/11",path:"/loops/point-cloud-swirling-02/PointCloud__x3g3__12.mp4"},{id:"point-cloud-swirling-02-PointCloud__zend__8",name:"point-cloud-swirling-02+hcxc/12",path:"/loops/point-cloud-swirling-02/PointCloud__zend__8.mp4"},{id:"point-cloud-swirling-02-PointCloud__yrnk__2",name:"point-cloud-swirling-02+6lgx/13",path:"/loops/point-cloud-swirling-02/PointCloud__yrnk__2.mp4"},{id:"point-cloud-swirling-02-WhiteHole__80p5__157",name:"point-cloud-swirling-02+kn17/14",path:"/loops/point-cloud-swirling-02/WhiteHole__80p5__157.mp4"}]},{folder:"point-cloud-geometric",mtime:1779574401394,videos:[{id:"point-cloud-geometric-PointCloud__4f3t__52",name:"point-cloud-geometric+161s/1",path:"/loops/point-cloud-geometric/PointCloud__4f3t__52.mp4"},{id:"point-cloud-geometric-PointCloud__nusr__62",name:"point-cloud-geometric+rjuq/2",path:"/loops/point-cloud-geometric/PointCloud__nusr__62.mp4"},{id:"point-cloud-geometric-PointCloud__oky0__61",name:"point-cloud-geometric+78ik/3",path:"/loops/point-cloud-geometric/PointCloud__oky0__61.mp4"},{id:"point-cloud-geometric-PointCloud__zgaj__55",name:"point-cloud-geometric+ewnk/4",path:"/loops/point-cloud-geometric/PointCloud__zgaj__55.mp4"},{id:"point-cloud-geometric-PointCloud__baa3__48",name:"point-cloud-geometric+jz14/5",path:"/loops/point-cloud-geometric/PointCloud__baa3__48.mp4"},{id:"point-cloud-geometric-PointCloud__1iqw__34",name:"point-cloud-geometric+wgo3/6",path:"/loops/point-cloud-geometric/PointCloud__1iqw__34.mp4"},{id:"point-cloud-geometric-PointCloud__e5dj__19",name:"point-cloud-geometric+60v7/7",path:"/loops/point-cloud-geometric/PointCloud__e5dj__19.mp4"},{id:"point-cloud-geometric-PointCloud__9uol__5",name:"point-cloud-geometric+x8em/8",path:"/loops/point-cloud-geometric/PointCloud__9uol__5.mp4"}]},{folder:"white-hole-fluid",mtime:1779574401388999e-3,videos:[{id:"white-hole-fluid-WhiteHole__db4q__286",name:"white-hole-fluid+evcl/1",path:"/loops/white-hole-fluid/WhiteHole__db4q__286.mp4"},{id:"white-hole-fluid-WhiteHole__t3dj__288",name:"white-hole-fluid+xv07/2",path:"/loops/white-hole-fluid/WhiteHole__t3dj__288.mp4"},{id:"white-hole-fluid-WhiteHole__9vn2__281",name:"white-hole-fluid+3yfl/3",path:"/loops/white-hole-fluid/WhiteHole__9vn2__281.mp4"},{id:"white-hole-fluid-WhiteHole__h7z0__284",name:"white-hole-fluid+69ud/4",path:"/loops/white-hole-fluid/WhiteHole__h7z0__284.mp4"},{id:"white-hole-fluid-WhiteHole__nlxj__274",name:"white-hole-fluid+j92j/5",path:"/loops/white-hole-fluid/WhiteHole__nlxj__274.mp4"},{id:"white-hole-fluid-WhiteHole__uur5__259",name:"white-hole-fluid+yunn/6",path:"/loops/white-hole-fluid/WhiteHole__uur5__259.mp4"},{id:"white-hole-fluid-WhiteHole__ifq0__252",name:"white-hole-fluid+2gua/7",path:"/loops/white-hole-fluid/WhiteHole__ifq0__252.mp4"},{id:"white-hole-fluid-WhiteHole__j5p2__186",name:"white-hole-fluid+sc2u/8",path:"/loops/white-hole-fluid/WhiteHole__j5p2__186.mp4"},{id:"white-hole-fluid-WhiteHole__9fjn__173",name:"white-hole-fluid+cpas/9",path:"/loops/white-hole-fluid/WhiteHole__9fjn__173.mp4"},{id:"white-hole-fluid-WhiteHole__gg4f__181",name:"white-hole-fluid+28pa/10",path:"/loops/white-hole-fluid/WhiteHole__gg4f__181.mp4"},{id:"white-hole-fluid-WhiteHole__idsa__180",name:"white-hole-fluid+n2xj/11",path:"/loops/white-hole-fluid/WhiteHole__idsa__180.mp4"},{id:"white-hole-fluid-WhiteHole__k3wc__179",name:"white-hole-fluid+l0ui/12",path:"/loops/white-hole-fluid/WhiteHole__k3wc__179.mp4"},{id:"white-hole-fluid-WhiteHole__4ccg__159",name:"white-hole-fluid+nn2o/13",path:"/loops/white-hole-fluid/WhiteHole__4ccg__159.mp4"},{id:"white-hole-fluid-WhiteHole__jdzt__151",name:"white-hole-fluid+ezqq/14",path:"/loops/white-hole-fluid/WhiteHole__jdzt__151.mp4"},{id:"white-hole-fluid-WhiteHole__5kjp__140",name:"white-hole-fluid+ytim/15",path:"/loops/white-hole-fluid/WhiteHole__5kjp__140.mp4"},{id:"white-hole-fluid-WhiteHole__gtoj__134",name:"white-hole-fluid+xyqb/16",path:"/loops/white-hole-fluid/WhiteHole__gtoj__134.mp4"},{id:"white-hole-fluid-WhiteHole__otbe__85",name:"white-hole-fluid+kdyw/17",path:"/loops/white-hole-fluid/WhiteHole__otbe__85.mp4"},{id:"white-hole-fluid-WhiteHole__w4uf__81",name:"white-hole-fluid+v6oj/18",path:"/loops/white-hole-fluid/WhiteHole__w4uf__81.mp4"},{id:"white-hole-fluid-WhiteHole__4tbh__59",name:"white-hole-fluid+oa78/19",path:"/loops/white-hole-fluid/WhiteHole__4tbh__59.mp4"},{id:"white-hole-fluid-WhiteHole__bjjd__55",name:"white-hole-fluid+wlxm/20",path:"/loops/white-hole-fluid/WhiteHole__bjjd__55.mp4"},{id:"white-hole-fluid-WhiteHole__zbrt__62",name:"white-hole-fluid+ydni/21",path:"/loops/white-hole-fluid/WhiteHole__zbrt__62.mp4"},{id:"white-hole-fluid-WhiteHole__fl1c__53",name:"white-hole-fluid+agi9/22",path:"/loops/white-hole-fluid/WhiteHole__fl1c__53.mp4"},{id:"white-hole-fluid-WhiteHole__5gmf__31",name:"white-hole-fluid+vzzq/23",path:"/loops/white-hole-fluid/WhiteHole__5gmf__31.mp4"}]},{folder:"white-hole-geometric",mtime:1779574401388999e-3,videos:[{id:"white-hole-geometric-WhiteHole__1xy8__287",name:"white-hole-geometric+n1xs/1",path:"/loops/white-hole-geometric/WhiteHole__1xy8__287.mp4"},{id:"white-hole-geometric-WhiteHole__ls15__275",name:"white-hole-geometric+huuy/2",path:"/loops/white-hole-geometric/WhiteHole__ls15__275.mp4"},{id:"white-hole-geometric-WhiteHole__stks__217",name:"white-hole-geometric+b7g9/3",path:"/loops/white-hole-geometric/WhiteHole__stks__217.mp4"},{id:"white-hole-geometric-WhiteHole__v4rl__216",name:"white-hole-geometric+tvu2/4",path:"/loops/white-hole-geometric/WhiteHole__v4rl__216.mp4"},{id:"white-hole-geometric-WhiteHole__pnfm__176",name:"white-hole-geometric+r4rx/5",path:"/loops/white-hole-geometric/WhiteHole__pnfm__176.mp4"},{id:"white-hole-geometric-WhiteHole__rh23__175",name:"white-hole-geometric+xpmf/6",path:"/loops/white-hole-geometric/WhiteHole__rh23__175.mp4"},{id:"white-hole-geometric-WhiteHole__ftow__153",name:"white-hole-geometric+lm98/7",path:"/loops/white-hole-geometric/WhiteHole__ftow__153.mp4"},{id:"white-hole-geometric-WhiteHole__hj75__152",name:"white-hole-geometric+1g98/8",path:"/loops/white-hole-geometric/WhiteHole__hj75__152.mp4"},{id:"white-hole-geometric-WhiteHole__d9xs__136",name:"white-hole-geometric+fux2/9",path:"/loops/white-hole-geometric/WhiteHole__d9xs__136.mp4"},{id:"white-hole-geometric-WhiteHole__l8ja__105",name:"white-hole-geometric+9vlu/10",path:"/loops/white-hole-geometric/WhiteHole__l8ja__105.mp4"},{id:"white-hole-geometric-WhiteHole__nam3__104",name:"white-hole-geometric+dsez/11",path:"/loops/white-hole-geometric/WhiteHole__nam3__104.mp4"},{id:"white-hole-geometric-WhiteHole__gend__89",name:"white-hole-geometric+qx9l/12",path:"/loops/white-hole-geometric/WhiteHole__gend__89.mp4"},{id:"white-hole-geometric-WhiteHole__i2ct__88",name:"white-hole-geometric+f0tg/13",path:"/loops/white-hole-geometric/WhiteHole__i2ct__88.mp4"},{id:"white-hole-geometric-WhiteHole__qgox__84",name:"white-hole-geometric+qwfd/14",path:"/loops/white-hole-geometric/WhiteHole__qgox__84.mp4"},{id:"white-hole-geometric-WhiteHole__sgc7__83",name:"white-hole-geometric+tj6b/15",path:"/loops/white-hole-geometric/WhiteHole__sgc7__83.mp4"},{id:"white-hole-geometric-WhiteHole__1lid__41",name:"white-hole-geometric+j5o1/16",path:"/loops/white-hole-geometric/WhiteHole__1lid__41.mp4"},{id:"white-hole-geometric-WhiteHole__y253__43",name:"white-hole-geometric+la9m/17",path:"/loops/white-hole-geometric/WhiteHole__y253__43.mp4"}]},{folder:"white-hole-abstract",mtime:1779574401388,videos:[{id:"white-hole-abstract-WhiteHole__h1fw__277",name:"white-hole-abstract+b1ok/1",path:"/loops/white-hole-abstract/WhiteHole__h1fw__277.mp4"},{id:"white-hole-abstract-WhiteHole__0sx1__267",name:"white-hole-abstract+mn8t/2",path:"/loops/white-hole-abstract/WhiteHole__0sx1__267.mp4"},{id:"white-hole-abstract-WhiteHole__52vt__254",name:"white-hole-abstract+f321/3",path:"/loops/white-hole-abstract/WhiteHole__52vt__254.mp4"},{id:"white-hole-abstract-WhiteHole__jjlp__265",name:"white-hole-abstract+fwco/4",path:"/loops/white-hole-abstract/WhiteHole__jjlp__265.mp4"},{id:"white-hole-abstract-WhiteHole__n3te__263",name:"white-hole-abstract+w7b7/5",path:"/loops/white-hole-abstract/WhiteHole__n3te__263.mp4"},{id:"white-hole-abstract-WhiteHole__p9b8__262",name:"white-hole-abstract+65sh/6",path:"/loops/white-hole-abstract/WhiteHole__p9b8__262.mp4"},{id:"white-hole-abstract-WhiteHole__qzu6__261",name:"white-hole-abstract+83c0/7",path:"/loops/white-hole-abstract/WhiteHole__qzu6__261.mp4"},{id:"white-hole-abstract-WhiteHole__veak__245",name:"white-hole-abstract+52rt/8",path:"/loops/white-hole-abstract/WhiteHole__veak__245.mp4"},{id:"white-hole-abstract-WhiteHole__6k2b__239",name:"white-hole-abstract+lqmf/9",path:"/loops/white-hole-abstract/WhiteHole__6k2b__239.mp4"},{id:"white-hole-abstract-WhiteHole__8ewe__238",name:"white-hole-abstract+qchq/10",path:"/loops/white-hole-abstract/WhiteHole__8ewe__238.mp4"},{id:"white-hole-abstract-WhiteHole__a52v__237",name:"white-hole-abstract+fhhz/11",path:"/loops/white-hole-abstract/WhiteHole__a52v__237.mp4"},{id:"white-hole-abstract-WhiteHole__cqkd__208",name:"white-hole-abstract+bbvx/12",path:"/loops/white-hole-abstract/WhiteHole__cqkd__208.mp4"},{id:"white-hole-abstract-WhiteHole__ye3f__191",name:"white-hole-abstract+buow/13",path:"/loops/white-hole-abstract/WhiteHole__ye3f__191.mp4"},{id:"white-hole-abstract-WhiteHole__bzdy__172",name:"white-hole-abstract+103u/14",path:"/loops/white-hole-abstract/WhiteHole__bzdy__172.mp4"},{id:"white-hole-abstract-WhiteHole__6741__158",name:"white-hole-abstract+ocjf/15",path:"/loops/white-hole-abstract/WhiteHole__6741__158.mp4"},{id:"white-hole-abstract-WhiteHole__layf__150",name:"white-hole-abstract+qxhi/16",path:"/loops/white-hole-abstract/WhiteHole__layf__150.mp4"},{id:"white-hole-abstract-WhiteHole__heur__124",name:"white-hole-abstract+8i23/17",path:"/loops/white-hole-abstract/WhiteHole__heur__124.mp4"},{id:"white-hole-abstract-WhiteHole__7m4y__112",name:"white-hole-abstract+u6ep/18",path:"/loops/white-hole-abstract/WhiteHole__7m4y__112.mp4"},{id:"white-hole-abstract-WhiteHole__d7uc__109",name:"white-hole-abstract+meru/19",path:"/loops/white-hole-abstract/WhiteHole__d7uc__109.mp4"},{id:"white-hole-abstract-WhiteHole__u9gh__82",name:"white-hole-abstract+6481/20",path:"/loops/white-hole-abstract/WhiteHole__u9gh__82.mp4"},{id:"white-hole-abstract-WhiteHole__37tc__40",name:"white-hole-abstract+txyq/21",path:"/loops/white-hole-abstract/WhiteHole__37tc__40.mp4"},{id:"white-hole-abstract-WhiteHole__sc9q__46",name:"white-hole-abstract+i3fb/22",path:"/loops/white-hole-abstract/WhiteHole__sc9q__46.mp4"},{id:"white-hole-abstract-WhiteHole__1bop__9",name:"white-hole-abstract+yqov/23",path:"/loops/white-hole-abstract/WhiteHole__1bop__9.mp4"}]},{folder:"white-hole-metallic",mtime:1779574401388,videos:[{id:"white-hole-metallic-WhiteHole__80d1__282",name:"white-hole-metallic+9uhe/1",path:"/loops/white-hole-metallic/WhiteHole__80d1__282.mp4"},{id:"white-hole-metallic-WhiteHole__v2bk__270",name:"white-hole-metallic+9w1o/2",path:"/loops/white-hole-metallic/WhiteHole__v2bk__270.mp4"},{id:"white-hole-metallic-WhiteHole__fcfc__220",name:"white-hole-metallic+puzs/3",path:"/loops/white-hole-metallic/WhiteHole__fcfc__220.mp4"},{id:"white-hole-metallic-WhiteHole__zko0__214",name:"white-hole-metallic+e69r/4",path:"/loops/white-hole-metallic/WhiteHole__zko0__214.mp4"},{id:"white-hole-metallic-WhiteHole__8g7i__210",name:"white-hole-metallic+om0m/5",path:"/loops/white-hole-metallic/WhiteHole__8g7i__210.mp4"},{id:"white-hole-metallic-WhiteHole__nen8__200",name:"white-hole-metallic+yfg7/6",path:"/loops/white-hole-metallic/WhiteHole__nen8__200.mp4"},{id:"white-hole-metallic-WhiteHole__5s41__113",name:"white-hole-metallic+d97y/7",path:"/loops/white-hole-metallic/WhiteHole__5s41__113.mp4"},{id:"white-hole-metallic-WhiteHole__olyc__67",name:"white-hole-metallic+bm6o/8",path:"/loops/white-hole-metallic/WhiteHole__olyc__67.mp4"},{id:"white-hole-metallic-WhiteHole__vu3c__63",name:"white-hole-metallic+ybwj/9",path:"/loops/white-hole-metallic/WhiteHole__vu3c__63.mp4"}]},{folder:"white-hole-organic",mtime:1779574401388,videos:[{id:"white-hole-organic-WhiteHole__f1vx__285",name:"white-hole-organic+hkop/1",path:"/loops/white-hole-organic/WhiteHole__f1vx__285.mp4"},{id:"white-hole-organic-WhiteHole__j4xi__283",name:"white-hole-organic+65bp/2",path:"/loops/white-hole-organic/WhiteHole__j4xi__283.mp4"},{id:"white-hole-organic-WhiteHole__pgxx__273",name:"white-hole-organic+oe0j/3",path:"/loops/white-hole-organic/WhiteHole__pgxx__273.mp4"},{id:"white-hole-organic-WhiteHole__0vpj__242",name:"white-hole-organic+9hrr/4",path:"/loops/white-hole-organic/WhiteHole__0vpj__242.mp4"},{id:"white-hole-organic-WhiteHole__k79t__251",name:"white-hole-organic+gciu/5",path:"/loops/white-hole-organic/WhiteHole__k79t__251.mp4"},{id:"white-hole-organic-WhiteHole__tmfh__246",name:"white-hole-organic+z3fw/6",path:"/loops/white-hole-organic/WhiteHole__tmfh__246.mp4"},{id:"white-hole-organic-WhiteHole__moup__230",name:"white-hole-organic+r6eg/7",path:"/loops/white-hole-organic/WhiteHole__moup__230.mp4"},{id:"white-hole-organic-WhiteHole__v0ld__226",name:"white-hole-organic+d19w/8",path:"/loops/white-hole-organic/WhiteHole__v0ld__226.mp4"},{id:"white-hole-organic-WhiteHole__an2d__209",name:"white-hole-organic+itap/9",path:"/loops/white-hole-organic/WhiteHole__an2d__209.mp4"},{id:"white-hole-organic-WhiteHole__n15r__167",name:"white-hole-organic+3hfb/10",path:"/loops/white-hole-organic/WhiteHole__n15r__167.mp4"},{id:"white-hole-organic-WhiteHole__x4y9__163",name:"white-hole-organic+yget/11",path:"/loops/white-hole-organic/WhiteHole__x4y9__163.mp4"},{id:"white-hole-organic-WhiteHole__yxgw__162",name:"white-hole-organic+d35p/12",path:"/loops/white-hole-organic/WhiteHole__yxgw__162.mp4"},{id:"white-hole-organic-WhiteHole__d0v1__126",name:"white-hole-organic+paoj/13",path:"/loops/white-hole-organic/WhiteHole__d0v1__126.mp4"},{id:"white-hole-organic-WhiteHole__f8iw__125",name:"white-hole-organic+llj3/14",path:"/loops/white-hole-organic/WhiteHole__f8iw__125.mp4"},{id:"white-hole-organic-WhiteHole__kuta__132",name:"white-hole-organic+sjsi/15",path:"/loops/white-hole-organic/WhiteHole__kuta__132.mp4"},{id:"white-hole-organic-WhiteHole__ll5j__122",name:"white-hole-organic+e52v/16",path:"/loops/white-hole-organic/WhiteHole__ll5j__122.mp4"},{id:"white-hole-organic-WhiteHole__htz3__107",name:"white-hole-organic+oqxw/17",path:"/loops/white-hole-organic/WhiteHole__htz3__107.mp4"},{id:"white-hole-organic-WhiteHole__jjw7__106",name:"white-hole-organic+171a/18",path:"/loops/white-hole-organic/WhiteHole__jjw7__106.mp4"},{id:"white-hole-organic-WhiteHole__9bnl__93",name:"white-hole-organic+9ee8/19",path:"/loops/white-hole-organic/WhiteHole__9bnl__93.mp4"},{id:"white-hole-organic-WhiteHole__ni61__97",name:"white-hole-organic+dedo/20",path:"/loops/white-hole-organic/WhiteHole__ni61__97.mp4"},{id:"white-hole-organic-WhiteHole__zmig__96",name:"white-hole-organic+czfh/21",path:"/loops/white-hole-organic/WhiteHole__zmig__96.mp4"},{id:"white-hole-organic-WhiteHole__qasj__66",name:"white-hole-organic+c9ll/22",path:"/loops/white-hole-organic/WhiteHole__qasj__66.mp4"},{id:"white-hole-organic-WhiteHole__s2yd__65",name:"white-hole-organic+e2we/23",path:"/loops/white-hole-organic/WhiteHole__s2yd__65.mp4"},{id:"white-hole-organic-WhiteHole__6oee__38",name:"white-hole-organic+5jud/24",path:"/loops/white-hole-organic/WhiteHole__6oee__38.mp4"},{id:"white-hole-organic-WhiteHole__8pko__37",name:"white-hole-organic+5pwk/25",path:"/loops/white-hole-organic/WhiteHole__8pko__37.mp4"},{id:"white-hole-organic-WhiteHole__mqfv__49",name:"white-hole-organic+wbas/26",path:"/loops/white-hole-organic/WhiteHole__mqfv__49.mp4"}]},{folder:"white-hole-particles",mtime:1779574401388,videos:[{id:"white-hole-particles-WhiteHole__f77w__278",name:"white-hole-particles+cdjy/1",path:"/loops/white-hole-particles/WhiteHole__f77w__278.mp4"},{id:"white-hole-particles-WhiteHole__wxak__269",name:"white-hole-particles+t8jc/2",path:"/loops/white-hole-particles/WhiteHole__wxak__269.mp4"},{id:"white-hole-particles-WhiteHole__kuf6__231",name:"white-hole-particles+qbv9/3",path:"/loops/white-hole-particles/WhiteHole__kuf6__231.mp4"},{id:"white-hole-particles-WhiteHole__k19v__203",name:"white-hole-particles+x1cm/4",path:"/loops/white-hole-particles/WhiteHole__k19v__203.mp4"},{id:"white-hole-particles-WhiteHole__ultv__193",name:"white-hole-particles+jm8u/5",path:"/loops/white-hole-particles/WhiteHole__ultv__193.mp4"},{id:"white-hole-particles-WhiteHole__p4xy__166",name:"white-hole-particles+vt54/6",path:"/loops/white-hole-particles/WhiteHole__p4xy__166.mp4"},{id:"white-hole-particles-WhiteHole__qzqx__165",name:"white-hole-particles+v497/7",path:"/loops/white-hole-particles/WhiteHole__qzqx__165.mp4"},{id:"white-hole-particles-WhiteHole__01ef__143",name:"white-hole-particles+pnsq/8",path:"/loops/white-hole-particles/WhiteHole__01ef__143.mp4"},{id:"white-hole-particles-WhiteHole__y9xf__144",name:"white-hole-particles+418y/9",path:"/loops/white-hole-particles/WhiteHole__y9xf__144.mp4"},{id:"white-hole-particles-WhiteHole__oj3s__131",name:"white-hole-particles+pyji/10",path:"/loops/white-hole-particles/WhiteHole__oj3s__131.mp4"},{id:"white-hole-particles-WhiteHole__u8kb__128",name:"white-hole-particles+ehru/11",path:"/loops/white-hole-particles/WhiteHole__u8kb__128.mp4"},{id:"white-hole-particles-WhiteHole__w2sg__127",name:"white-hole-particles+6w7w/12",path:"/loops/white-hole-particles/WhiteHole__w2sg__127.mp4"},{id:"white-hole-particles-WhiteHole__f9kt__108",name:"white-hole-particles+z9vu/13",path:"/loops/white-hole-particles/WhiteHole__f9kt__108.mp4"},{id:"white-hole-particles-WhiteHole__9aap__75",name:"white-hole-particles+vwx0/14",path:"/loops/white-hole-particles/WhiteHole__9aap__75.mp4"},{id:"white-hole-particles-WhiteHole__annw__74",name:"white-hole-particles+nbo8/15",path:"/loops/white-hole-particles/WhiteHole__annw__74.mp4"},{id:"white-hole-particles-WhiteHole__dm9g__54",name:"white-hole-particles+n3dk/16",path:"/loops/white-hole-particles/WhiteHole__dm9g__54.mp4"},{id:"white-hole-particles-WhiteHole__l3wf__50",name:"white-hole-particles+thh9/17",path:"/loops/white-hole-particles/WhiteHole__l3wf__50.mp4"},{id:"white-hole-particles-WhiteHole__efqi__28",name:"white-hole-particles+9vv9/18",path:"/loops/white-hole-particles/WhiteHole__efqi__28.mp4"},{id:"white-hole-particles-WhiteHole__bnd7__17",name:"white-hole-particles+3rnp/19",path:"/loops/white-hole-particles/WhiteHole__bnd7__17.mp4"}]},{folder:"white-hole-reflections",mtime:1779574401388,videos:[{id:"white-hole-reflections-WhiteHole__bq9o__280",name:"white-hole-reflections+qqft/1",path:"/loops/white-hole-reflections/WhiteHole__bq9o__280.mp4"},{id:"white-hole-reflections-WhiteHole__dk9k__279",name:"white-hole-reflections+gvur/2",path:"/loops/white-hole-reflections/WhiteHole__dk9k__279.mp4"},{id:"white-hole-reflections-WhiteHole__t6rw__260",name:"white-hole-reflections+aduf/3",path:"/loops/white-hole-reflections/WhiteHole__t6rw__260.mp4"},{id:"white-hole-reflections-WhiteHole__yr3o__268",name:"white-hole-reflections+npw5/4",path:"/loops/white-hole-reflections/WhiteHole__yr3o__268.mp4"},{id:"white-hole-reflections-WhiteHole__c7ri__155",name:"white-hole-reflections+gmlf/5",path:"/loops/white-hole-reflections/WhiteHole__c7ri__155.mp4"},{id:"white-hole-reflections-WhiteHole__imaq__133",name:"white-hole-reflections+kh5m/6",path:"/loops/white-hole-reflections/WhiteHole__imaq__133.mp4"},{id:"white-hole-reflections-WhiteHole__b5pk__92",name:"white-hole-reflections+y0tm/7",path:"/loops/white-hole-reflections/WhiteHole__b5pk__92.mp4"},{id:"white-hole-reflections-WhiteHole__14nf__32",name:"white-hole-reflections+qtka/8",path:"/loops/white-hole-reflections/WhiteHole__14nf__32.mp4"},{id:"white-hole-reflections-WhiteHole__8c7t__18",name:"white-hole-reflections+firb/9",path:"/loops/white-hole-reflections/WhiteHole__8c7t__18.mp4"},{id:"white-hole-reflections-WhiteHole__whaq__11",name:"white-hole-reflections+5ipc/10",path:"/loops/white-hole-reflections/WhiteHole__whaq__11.mp4"}]},{folder:"white-hole-topographical",mtime:1779574401388,videos:[{id:"white-hole-topographical-WhiteHole__tb1l__271",name:"white-hole-topographical+cch1/1",path:"/loops/white-hole-topographical/WhiteHole__tb1l__271.mp4"},{id:"white-hole-topographical-WhiteHole__h1b7__219",name:"white-hole-topographical+sw2j/2",path:"/loops/white-hole-topographical/WhiteHole__h1b7__219.mp4"},{id:"white-hole-topographical-WhiteHole__xklc__174",name:"white-hole-topographical+lvaj/3",path:"/loops/white-hole-topographical/WhiteHole__xklc__174.mp4"},{id:"white-hole-topographical-WhiteHole__ouun__148",name:"white-hole-topographical+mp6x/4",path:"/loops/white-hole-topographical/WhiteHole__ouun__148.mp4"},{id:"white-hole-topographical-WhiteHole__yzgc__116",name:"white-hole-topographical+90pf/5",path:"/loops/white-hole-topographical/WhiteHole__yzgc__116.mp4"},{id:"white-hole-topographical-WhiteHole__prcx__100",name:"white-hole-topographical+en1l/6",path:"/loops/white-hole-topographical/WhiteHole__prcx__100.mp4"},{id:"white-hole-topographical-WhiteHole__oemk__48",name:"white-hole-topographical+4nmd/7",path:"/loops/white-hole-topographical/WhiteHole__oemk__48.mp4"},{id:"white-hole-topographical-WhiteHole__uhp4__33",name:"white-hole-topographical+9x7f/8",path:"/loops/white-hole-topographical/WhiteHole__uhp4__33.mp4"},{id:"white-hole-topographical-WhiteHole__5ed2__8",name:"white-hole-topographical+akpm/9",path:"/loops/white-hole-topographical/WhiteHole__5ed2__8.mp4"},{id:"white-hole-topographical-WhiteHole__9rq1__2",name:"white-hole-topographical+6tcw/10",path:"/loops/white-hole-topographical/WhiteHole__9rq1__2.mp4"},{id:"white-hole-topographical-WhiteHole__y2io__10",name:"white-hole-topographical+3lg3/11",path:"/loops/white-hole-topographical/WhiteHole__y2io__10.mp4"}]},{folder:"white-hole-undulating",mtime:1779574401388,videos:[{id:"white-hole-undulating-WhiteHole__rfvu__272",name:"white-hole-undulating+aoue/1",path:"/loops/white-hole-undulating/WhiteHole__rfvu__272.mp4"},{id:"white-hole-undulating-WhiteHole__wo43__258",name:"white-hole-undulating+l9lb/2",path:"/loops/white-hole-undulating/WhiteHole__wo43__258.mp4"},{id:"white-hole-undulating-WhiteHole__ylks__257",name:"white-hole-undulating+x3am/3",path:"/loops/white-hole-undulating/WhiteHole__ylks__257.mp4"},{id:"white-hole-undulating-WhiteHole__6tq5__253",name:"white-hole-undulating+mxkv/4",path:"/loops/white-hole-undulating/WhiteHole__6tq5__253.mp4"},{id:"white-hole-undulating-WhiteHole__dfsp__235",name:"white-hole-undulating+uwva/5",path:"/loops/white-hole-undulating/WhiteHole__dfsp__235.mp4"},{id:"white-hole-undulating-WhiteHole__ophc__229",name:"white-hole-undulating+lo9d/6",path:"/loops/white-hole-undulating/WhiteHole__ophc__229.mp4"},{id:"white-hole-undulating-WhiteHole__f938__170",name:"white-hole-undulating+gla2/7",path:"/loops/white-hole-undulating/WhiteHole__f938__170.mp4"},{id:"white-hole-undulating-WhiteHole__rbst__120",name:"white-hole-undulating+6g6a/8",path:"/loops/white-hole-undulating/WhiteHole__rbst__120.mp4"},{id:"white-hole-undulating-WhiteHole__hizi__52",name:"white-hole-undulating+li6m/9",path:"/loops/white-hole-undulating/WhiteHole__hizi__52.mp4"},{id:"white-hole-undulating-WhiteHole__j5td__51",name:"white-hole-undulating+zbts/10",path:"/loops/white-hole-undulating/WhiteHole__j5td__51.mp4"},{id:"white-hole-undulating-WhiteHole__q83z__47",name:"white-hole-undulating+bkqs/11",path:"/loops/white-hole-undulating/WhiteHole__q83z__47.mp4"},{id:"white-hole-undulating-WhiteHole__ovwu__26",name:"white-hole-undulating+a3u7/12",path:"/loops/white-hole-undulating/WhiteHole__ovwu__26.mp4"},{id:"white-hole-undulating-WhiteHole__t5ki__24",name:"white-hole-undulating+64ev/13",path:"/loops/white-hole-undulating/WhiteHole__t5ki__24.mp4"},{id:"white-hole-undulating-WhiteHole__5xre__13",name:"white-hole-undulating+yasr/14",path:"/loops/white-hole-undulating/WhiteHole__5xre__13.mp4"},{id:"white-hole-undulating-WhiteHole__6o8d__19",name:"white-hole-undulating+rlgk/15",path:"/loops/white-hole-undulating/WhiteHole__6o8d__19.mp4"},{id:"white-hole-undulating-WhiteHole__6zrn__7",name:"white-hole-undulating+fyat/16",path:"/loops/white-hole-undulating/WhiteHole__6zrn__7.mp4"},{id:"white-hole-undulating-WhiteHole__e9f2__3",name:"white-hole-undulating+gtms/17",path:"/loops/white-hole-undulating/WhiteHole__e9f2__3.mp4"}]},{folder:"white-hole-fragmented",mtime:1779574401387,videos:[{id:"white-hole-fragmented-WhiteHole__htdo__266",name:"white-hole-fragmented+3u7n/1",path:"/loops/white-hole-fragmented/WhiteHole__htdo__266.mp4"},{id:"white-hole-fragmented-WhiteHole__lw12__250",name:"white-hole-fragmented+lai1/2",path:"/loops/white-hole-fragmented/WhiteHole__lw12__250.mp4"},{id:"white-hole-fragmented-WhiteHole__nl34__249",name:"white-hole-fragmented+t0qj/3",path:"/loops/white-hole-fragmented/WhiteHole__nl34__249.mp4"},{id:"white-hole-fragmented-WhiteHole__f6bd__234",name:"white-hole-fragmented+p2sw/4",path:"/loops/white-hole-fragmented/WhiteHole__f6bd__234.mp4"},{id:"white-hole-fragmented-WhiteHole__h0d5__233",name:"white-hole-fragmented+pbpk/5",path:"/loops/white-hole-fragmented/WhiteHole__h0d5__233.mp4"},{id:"white-hole-fragmented-WhiteHole__6heh__211",name:"white-hole-fragmented+1nys/6",path:"/loops/white-hole-fragmented/WhiteHole__6heh__211.mp4"},{id:"white-hole-fragmented-WhiteHole__xc8p__215",name:"white-hole-fragmented+fn5f/7",path:"/loops/white-hole-fragmented/WhiteHole__xc8p__215.mp4"},{id:"white-hole-fragmented-WhiteHole__ejog__207",name:"white-hole-fragmented+mjz8/8",path:"/loops/white-hole-fragmented/WhiteHole__ejog__207.mp4"},{id:"white-hole-fragmented-WhiteHole__gcb8__206",name:"white-hole-fragmented+5cjd/9",path:"/loops/white-hole-fragmented/WhiteHole__gcb8__206.mp4"},{id:"white-hole-fragmented-WhiteHole__m52c__201",name:"white-hole-fragmented+hhty/10",path:"/loops/white-hole-fragmented/WhiteHole__m52c__201.mp4"},{id:"white-hole-fragmented-WhiteHole__o6f4__199",name:"white-hole-fragmented+rnaj/11",path:"/loops/white-hole-fragmented/WhiteHole__o6f4__199.mp4"},{id:"white-hole-fragmented-WhiteHole__wmo8__192",name:"white-hole-fragmented+w9n2/12",path:"/loops/white-hole-fragmented/WhiteHole__wmo8__192.mp4"},{id:"white-hole-fragmented-WhiteHole__2eku__190",name:"white-hole-fragmented+7167/13",path:"/loops/white-hole-fragmented/WhiteHole__2eku__190.mp4"},{id:"white-hole-fragmented-WhiteHole__4bq8__189",name:"white-hole-fragmented+3jei/14",path:"/loops/white-hole-fragmented/WhiteHole__4bq8__189.mp4"},{id:"white-hole-fragmented-WhiteHole__st55__185",name:"white-hole-fragmented+ubr4/15",path:"/loops/white-hole-fragmented/WhiteHole__st55__185.mp4"},{id:"white-hole-fragmented-WhiteHole__h658__169",name:"white-hole-fragmented+bqnh/16",path:"/loops/white-hole-fragmented/WhiteHole__h658__169.mp4"},{id:"white-hole-fragmented-WhiteHole__iy7i__168",name:"white-hole-fragmented+28z7/17",path:"/loops/white-hole-fragmented/WhiteHole__iy7i__168.mp4"},{id:"white-hole-fragmented-WhiteHole__sltz__146",name:"white-hole-fragmented+p8g5/18",path:"/loops/white-hole-fragmented/WhiteHole__sltz__146.mp4"},{id:"white-hole-fragmented-WhiteHole__m43q__102",name:"white-hole-fragmented+3hll/19",path:"/loops/white-hole-fragmented/WhiteHole__m43q__102.mp4"},{id:"white-hole-fragmented-WhiteHole__td1k__98",name:"white-hole-fragmented+k0bw/20",path:"/loops/white-hole-fragmented/WhiteHole__td1k__98.mp4"},{id:"white-hole-fragmented-WhiteHole__era2__90",name:"white-hole-fragmented+gu9h/21",path:"/loops/white-hole-fragmented/WhiteHole__era2__90.mp4"},{id:"white-hole-fragmented-WhiteHole__1vpm__78",name:"white-hole-fragmented+113b/22",path:"/loops/white-hole-fragmented/WhiteHole__1vpm__78.mp4"},{id:"white-hole-fragmented-WhiteHole__3v6b__77",name:"white-hole-fragmented+obie/23",path:"/loops/white-hole-fragmented/WhiteHole__3v6b__77.mp4"},{id:"white-hole-fragmented-WhiteHole__xyld__80",name:"white-hole-fragmented+adzp/24",path:"/loops/white-hole-fragmented/WhiteHole__xyld__80.mp4"},{id:"white-hole-fragmented-WhiteHole__u137__64",name:"white-hole-fragmented+tuli/25",path:"/loops/white-hole-fragmented/WhiteHole__u137__64.mp4"}]},{folder:"white-hole-swirling",mtime:1779574401387,videos:[{id:"white-hole-swirling-WhiteHole__1a9v__256",name:"white-hole-swirling+6tto/1",path:"/loops/white-hole-swirling/WhiteHole__1a9v__256.mp4"},{id:"white-hole-swirling-WhiteHole__x3de__244",name:"white-hole-swirling+w1zg/2",path:"/loops/white-hole-swirling/WhiteHole__x3de__244.mp4"},{id:"white-hole-swirling-WhiteHole__yu83__243",name:"white-hole-swirling+4h5f/3",path:"/loops/white-hole-swirling/WhiteHole__yu83__243.mp4"},{id:"white-hole-swirling-WhiteHole__4ibk__240",name:"white-hole-swirling+jyb1/4",path:"/loops/white-hole-swirling/WhiteHole__4ibk__240.mp4"},{id:"white-hole-swirling-WhiteHole__bh40__236",name:"white-hole-swirling+3fid/5",path:"/loops/white-hole-swirling/WhiteHole__bh40__236.mp4"},{id:"white-hole-swirling-WhiteHole__0uvt__223",name:"white-hole-swirling+8pkp/6",path:"/loops/white-hole-swirling/WhiteHole__0uvt__223.mp4"},{id:"white-hole-swirling-WhiteHole__3deg__222",name:"white-hole-swirling+839r/7",path:"/loops/white-hole-swirling/WhiteHole__3deg__222.mp4"},{id:"white-hole-swirling-WhiteHole__qk6l__228",name:"white-hole-swirling+xpct/8",path:"/loops/white-hole-swirling/WhiteHole__qk6l__228.mp4"},{id:"white-hole-swirling-WhiteHole__sfxg__227",name:"white-hole-swirling+ae1n/9",path:"/loops/white-hole-swirling/WhiteHole__sfxg__227.mp4"},{id:"white-hole-swirling-WhiteHole__yqs9__224",name:"white-hole-swirling+23mj/10",path:"/loops/white-hole-swirling/WhiteHole__yqs9__224.mp4"},{id:"white-hole-swirling-WhiteHole__24lr__213",name:"white-hole-swirling+le3r/11",path:"/loops/white-hole-swirling/WhiteHole__24lr__213.mp4"},{id:"white-hole-swirling-WhiteHole__r60m__196",name:"white-hole-swirling+byqv/12",path:"/loops/white-hole-swirling/WhiteHole__r60m__196.mp4"},{id:"white-hole-swirling-WhiteHole__t1m5__194",name:"white-hole-swirling+5jt8/13",path:"/loops/white-hole-swirling/WhiteHole__t1m5__194.mp4"},{id:"white-hole-swirling-WhiteHole__nreo__177",name:"white-hole-swirling+2f5b/14",path:"/loops/white-hole-swirling/WhiteHole__nreo__177.mp4"},{id:"white-hole-swirling-WhiteHole__t122__164",name:"white-hole-swirling+jm48/15",path:"/loops/white-hole-swirling/WhiteHole__t122__164.mp4"},{id:"white-hole-swirling-WhiteHole__a8pp__156",name:"white-hole-swirling+vwwe/16",path:"/loops/white-hole-swirling/WhiteHole__a8pp__156.mp4"},{id:"white-hole-swirling-WhiteHole__qsty__147",name:"white-hole-swirling+2ofq/17",path:"/loops/white-hole-swirling/WhiteHole__qsty__147.mp4"},{id:"white-hole-swirling-WhiteHole__7lf5__139",name:"white-hole-swirling+hma2/18",path:"/loops/white-hole-swirling/WhiteHole__7lf5__139.mp4"},{id:"white-hole-swirling-WhiteHole__uiy0__145",name:"white-hole-swirling+khec/19",path:"/loops/white-hole-swirling/WhiteHole__uiy0__145.mp4"},{id:"white-hole-swirling-WhiteHole__1db4__115",name:"white-hole-swirling+qj2o/20",path:"/loops/white-hole-swirling/WhiteHole__1db4__115.mp4"},{id:"white-hole-swirling-WhiteHole__3iny__94",name:"white-hole-swirling+vrq9/21",path:"/loops/white-hole-swirling/WhiteHole__3iny__94.mp4"},{id:"white-hole-swirling-WhiteHole__g08q__71",name:"white-hole-swirling+f4us/22",path:"/loops/white-hole-swirling/WhiteHole__g08q__71.mp4"},{id:"white-hole-swirling-WhiteHole__u3a2__45",name:"white-hole-swirling+uk23/23",path:"/loops/white-hole-swirling/WhiteHole__u3a2__45.mp4"},{id:"white-hole-swirling-WhiteHole__dcs8__16",name:"white-hole-swirling+ruai/24",path:"/loops/white-hole-swirling/WhiteHole__dcs8__16.mp4"},{id:"white-hole-swirling-WhiteHole__o2t5__6",name:"white-hole-swirling+lc3j/25",path:"/loops/white-hole-swirling/WhiteHole__o2t5__6.mp4"}]},{folder:"white-hole-radial-02",mtime:1779574401385999e-3,videos:[{id:"white-hole-radial-02-WhiteHole__pmpg__248",name:"white-hole-radial-02+qayt/1",path:"/loops/white-hole-radial-02/WhiteHole__pmpg__248.mp4"},{id:"white-hole-radial-02-WhiteHole__ro5j__247",name:"white-hole-radial-02+74rk/2",path:"/loops/white-hole-radial-02/WhiteHole__ro5j__247.mp4"},{id:"white-hole-radial-02-WhiteHole__pgzf__198",name:"white-hole-radial-02+9sq1/3",path:"/loops/white-hole-radial-02/WhiteHole__pgzf__198.mp4"},{id:"white-hole-radial-02-WhiteHole__qhfr__197",name:"white-hole-radial-02+5tdn/4",path:"/loops/white-hole-radial-02/WhiteHole__qhfr__197.mp4"},{id:"white-hole-radial-02-WhiteHole__sa4a__195",name:"white-hole-radial-02+j0q3/5",path:"/loops/white-hole-radial-02/WhiteHole__sa4a__195.mp4"},{id:"white-hole-radial-02-WhiteHole__p3at__188",name:"white-hole-radial-02+rix5/6",path:"/loops/white-hole-radial-02/WhiteHole__p3at__188.mp4"},{id:"white-hole-radial-02-WhiteHole__uzpq__184",name:"white-hole-radial-02+2vec/7",path:"/loops/white-hole-radial-02/WhiteHole__uzpq__184.mp4"},{id:"white-hole-radial-02-WhiteHole__wzac__183",name:"white-hole-radial-02+csg1/8",path:"/loops/white-hole-radial-02/WhiteHole__wzac__183.mp4"},{id:"white-hole-radial-02-WhiteHole__v4c4__118",name:"white-hole-radial-02+3qcj/9",path:"/loops/white-hole-radial-02/WhiteHole__v4c4__118.mp4"},{id:"white-hole-radial-02-WhiteHole__wst9__117",name:"white-hole-radial-02+wy7b/10",path:"/loops/white-hole-radial-02/WhiteHole__wst9__117.mp4"},{id:"white-hole-radial-02-WhiteHole__ro0c__99",name:"white-hole-radial-02+29qk/11",path:"/loops/white-hole-radial-02/WhiteHole__ro0c__99.mp4"},{id:"white-hole-radial-02-WhiteHole__zs2x__42",name:"white-hole-radial-02+px61/12",path:"/loops/white-hole-radial-02/WhiteHole__zs2x__42.mp4"},{id:"white-hole-radial-02-WhiteHole__utv5__23",name:"white-hole-radial-02+9s0l/13",path:"/loops/white-hole-radial-02/WhiteHole__utv5__23.mp4"},{id:"white-hole-radial-02-WhiteHole__xk12__22",name:"white-hole-radial-02+tb4b/14",path:"/loops/white-hole-radial-02/WhiteHole__xk12__22.mp4"}]},{folder:"white-hole-grid",mtime:1779574401384999e-3,videos:[{id:"white-hole-grid-WhiteHole__2okv__241",name:"white-hole-grid+ne2p/1",path:"/loops/white-hole-grid/WhiteHole__2okv__241.mp4"},{id:"white-hole-grid-WhiteHole__5hxl__221",name:"white-hole-grid+5qn4/2",path:"/loops/white-hole-grid/WhiteHole__5hxl__221.mp4"},{id:"white-hole-grid-WhiteHole__wugj__225",name:"white-hole-grid+fpmh/3",path:"/loops/white-hole-grid/WhiteHole__wugj__225.mp4"},{id:"white-hole-grid-WhiteHole__dqr6__171",name:"white-hole-grid+f5fv/4",path:"/loops/white-hole-grid/WhiteHole__dqr6__171.mp4"},{id:"white-hole-grid-WhiteHole__lzn7__178",name:"white-hole-grid+9xxc/5",path:"/loops/white-hole-grid/WhiteHole__lzn7__178.mp4"},{id:"white-hole-grid-WhiteHole__9hzc__138",name:"white-hole-grid+1li5/6",path:"/loops/white-hole-grid/WhiteHole__9hzc__138.mp4"},{id:"white-hole-grid-WhiteHole__b9z1__137",name:"white-hole-grid+6uzw/7",path:"/loops/white-hole-grid/WhiteHole__b9z1__137.mp4"},{id:"white-hole-grid-WhiteHole__t227__119",name:"white-hole-grid+z0dj/8",path:"/loops/white-hole-grid/WhiteHole__t227__119.mp4"},{id:"white-hole-grid-WhiteHole__nxyc__101",name:"white-hole-grid+jv2o/9",path:"/loops/white-hole-grid/WhiteHole__nxyc__101.mp4"},{id:"white-hole-grid-WhiteHole__03i7__79",name:"white-hole-grid+3bgq/10",path:"/loops/white-hole-grid/WhiteHole__03i7__79.mp4"},{id:"white-hole-grid-WhiteHole__jqjt__70",name:"white-hole-grid+9ck1/11",path:"/loops/white-hole-grid/WhiteHole__jqjt__70.mp4"},{id:"white-hole-grid-WhiteHole__lipz__69",name:"white-hole-grid+iuqt/12",path:"/loops/white-hole-grid/WhiteHole__lipz__69.mp4"},{id:"white-hole-grid-WhiteHole__vx95__44",name:"white-hole-grid+l7wl/13",path:"/loops/white-hole-grid/WhiteHole__vx95__44.mp4"}]},{folder:"white-hole-nature",mtime:1779574401378,videos:[{id:"white-hole-nature-WhiteHole__0r85__161",name:"white-hole-nature+n4ef/1",path:"/loops/white-hole-nature/WhiteHole__0r85__161.mp4"},{id:"white-hole-nature-WhiteHole__2j39__160",name:"white-hole-nature+en1k/2",path:"/loops/white-hole-nature/WhiteHole__2j39__160.mp4"},{id:"white-hole-nature-WhiteHole__1x10__142",name:"white-hole-nature+4wud/3",path:"/loops/white-hole-nature/WhiteHole__1x10__142.mp4"},{id:"white-hole-nature-WhiteHole__3n9d__141",name:"white-hole-nature+gjfi/4",path:"/loops/white-hole-nature/WhiteHole__3n9d__141.mp4"},{id:"white-hole-nature-WhiteHole__d3aq__91",name:"white-hole-nature+twis/5",path:"/loops/white-hole-nature/WhiteHole__d3aq__91.mp4"},{id:"white-hole-nature-WhiteHole__cazf__73",name:"white-hole-nature+fxsr/6",path:"/loops/white-hole-nature/WhiteHole__cazf__73.mp4"},{id:"white-hole-nature-WhiteHole__e7r8__72",name:"white-hole-nature+9ddh/7",path:"/loops/white-hole-nature/WhiteHole__e7r8__72.mp4"},{id:"white-hole-nature-WhiteHole__6ezj__58",name:"white-hole-nature+3u6g/8",path:"/loops/white-hole-nature/WhiteHole__6ezj__58.mp4"},{id:"white-hole-nature-WhiteHole__8578__57",name:"white-hole-nature+lk3u/9",path:"/loops/white-hole-nature/WhiteHole__8578__57.mp4"},{id:"white-hole-nature-WhiteHole__8fx6__30",name:"white-hole-nature+oh4t/10",path:"/loops/white-hole-nature/WhiteHole__8fx6__30.mp4"},{id:"white-hole-nature-WhiteHole__couv__29",name:"white-hole-nature+r3xf/11",path:"/loops/white-hole-nature/WhiteHole__couv__29.mp4"},{id:"white-hole-nature-WhiteHole__iw2t__27",name:"white-hole-nature+8n4h/12",path:"/loops/white-hole-nature/WhiteHole__iw2t__27.mp4"},{id:"white-hole-nature-WhiteHole__rlpc__25",name:"white-hole-nature+m430/13",path:"/loops/white-hole-nature/WhiteHole__rlpc__25.mp4"},{id:"white-hole-nature-WhiteHole__sv5a__34",name:"white-hole-nature+kxzf/14",path:"/loops/white-hole-nature/WhiteHole__sv5a__34.mp4"},{id:"white-hole-nature-WhiteHole__g4uo__15",name:"white-hole-nature+8vdc/15",path:"/loops/white-hole-nature/WhiteHole__g4uo__15.mp4"},{id:"white-hole-nature-WhiteHole__hwof__14",name:"white-hole-nature+d4uz/16",path:"/loops/white-hole-nature/WhiteHole__hwof__14.mp4"},{id:"white-hole-nature-WhiteHole__rq01__12",name:"white-hole-nature+cx58/17",path:"/loops/white-hole-nature/WhiteHole__rq01__12.mp4"},{id:"white-hole-nature-WhiteHole__ysyi__21",name:"white-hole-nature+oh97/18",path:"/loops/white-hole-nature/WhiteHole__ysyi__21.mp4"},{id:"white-hole-nature-WhiteHole__sqhk__5",name:"white-hole-nature+7hjs/19",path:"/loops/white-hole-nature/WhiteHole__sqhk__5.mp4"}]},{folder:"parvagues",mtime:1779574401365,videos:[{id:"parvagues-ParVagues__0lcg__21",name:"parvagues+3zyv/1",path:"/loops/parvagues/ParVagues__0lcg__21.mp4"},{id:"parvagues-ParVagues__1y6b__20",name:"parvagues+dh9b/2",path:"/loops/parvagues/ParVagues__1y6b__20.mp4"},{id:"parvagues-ParVagues__3sz6__19",name:"parvagues+fjjq/3",path:"/loops/parvagues/ParVagues__3sz6__19.mp4"},{id:"parvagues-ParVagues__5y20__18",name:"parvagues+anpz/4",path:"/loops/parvagues/ParVagues__5y20__18.mp4"},{id:"parvagues-ParVagues__7szd__17",name:"parvagues+wh8i/5",path:"/loops/parvagues/ParVagues__7szd__17.mp4"},{id:"parvagues-ParVagues__kab9__28",name:"parvagues+bk8b/6",path:"/loops/parvagues/ParVagues__kab9__28.mp4"},{id:"parvagues-ParVagues__nty3__27",name:"parvagues+vzy2/7",path:"/loops/parvagues/ParVagues__nty3__27.mp4"},{id:"parvagues-ParVagues__pmse__26",name:"parvagues+nakd/8",path:"/loops/parvagues/ParVagues__pmse__26.mp4"},{id:"parvagues-ParVagues__resk__25",name:"parvagues+vobr/9",path:"/loops/parvagues/ParVagues__resk__25.mp4"},{id:"parvagues-ParVagues__v1na__24",name:"parvagues+9fn5/10",path:"/loops/parvagues/ParVagues__v1na__24.mp4"},{id:"parvagues-ParVagues__wtbw__23",name:"parvagues+b2ub/11",path:"/loops/parvagues/ParVagues__wtbw__23.mp4"},{id:"parvagues-ParVagues__ylpx__22",name:"parvagues+zekk/12",path:"/loops/parvagues/ParVagues__ylpx__22.mp4"},{id:"parvagues-ParVagues__9gg7__16",name:"parvagues+ujix/13",path:"/loops/parvagues/ParVagues__9gg7__16.mp4"},{id:"parvagues-ParVagues__bcn6__15",name:"parvagues+uz56/14",path:"/loops/parvagues/ParVagues__bcn6__15.mp4"},{id:"parvagues-ParVagues__d2oc__14",name:"parvagues+z3zn/15",path:"/loops/parvagues/ParVagues__d2oc__14.mp4"},{id:"parvagues-ParVagues__edxa__13",name:"parvagues+vo0v/16",path:"/loops/parvagues/ParVagues__edxa__13.mp4"},{id:"parvagues-ParVagues__g04k__12",name:"parvagues+jec4/17",path:"/loops/parvagues/ParVagues__g04k__12.mp4"},{id:"parvagues-ParVagues__hxw7__11",name:"parvagues+822i/18",path:"/loops/parvagues/ParVagues__hxw7__11.mp4"},{id:"parvagues-ParVagues__jr8y__10",name:"parvagues+n3pe/19",path:"/loops/parvagues/ParVagues__jr8y__10.mp4"},{id:"parvagues-ParVagues__lquj__9",name:"parvagues+3yjf/20",path:"/loops/parvagues/ParVagues__lquj__9.mp4"},{id:"parvagues-ParVagues__ni3w__8",name:"parvagues+pxym/21",path:"/loops/parvagues/ParVagues__ni3w__8.mp4"},{id:"parvagues-ParVagues__p68h__7",name:"parvagues+48es/22",path:"/loops/parvagues/ParVagues__p68h__7.mp4"},{id:"parvagues-ParVagues__r06d__6",name:"parvagues+snud/23",path:"/loops/parvagues/ParVagues__r06d__6.mp4"},{id:"parvagues-ParVagues__spes__5",name:"parvagues+vg5x/24",path:"/loops/parvagues/ParVagues__spes__5.mp4"},{id:"parvagues-ParVagues__uld4__4",name:"parvagues+h1q2/25",path:"/loops/parvagues/ParVagues__uld4__4.mp4"},{id:"parvagues-ParVagues__wcx5__3",name:"parvagues+n0ek/26",path:"/loops/parvagues/ParVagues__wcx5__3.mp4"},{id:"parvagues-ParVagues__y1lj__2",name:"parvagues+nid4/27",path:"/loops/parvagues/ParVagues__y1lj__2.mp4"},{id:"parvagues-ParVagues__zhhr__1",name:"parvagues+n481/28",path:"/loops/parvagues/ParVagues__zhhr__1.mp4"}]},{folder:"white-hole",mtime:1779574401388,videos:[{id:"white-hole-WhiteHole__jkie__276",name:"white-hole+1d50/1",path:"/loops/white-hole/WhiteHole__jkie__276.mp4"},{id:"white-hole-WhiteHole__3bh5__255",name:"white-hole+7lm7/2",path:"/loops/white-hole/WhiteHole__3bh5__255.mp4"},{id:"white-hole-WhiteHole__ldlo__264",name:"white-hole+3dok/3",path:"/loops/white-hole/WhiteHole__ldlo__264.mp4"},{id:"white-hole-WhiteHole__iriz__232",name:"white-hole+lzjl/4",path:"/loops/white-hole/WhiteHole__iriz__232.mp4"},{id:"white-hole-WhiteHole__4b0s__212",name:"white-hole+s44r/5",path:"/loops/white-hole/WhiteHole__4b0s__212.mp4"},{id:"white-hole-WhiteHole__j40u__218",name:"white-hole+vfnt/6",path:"/loops/white-hole/WhiteHole__j40u__218.mp4"},{id:"white-hole-WhiteHole__iaru__205",name:"white-hole+h8aa/7",path:"/loops/white-hole/WhiteHole__iaru__205.mp4"},{id:"white-hole-WhiteHole__js6j__204",name:"white-hole+mtyq/8",path:"/loops/white-hole/WhiteHole__js6j__204.mp4"},{id:"white-hole-WhiteHole__ln0v__202",name:"white-hole+btvx/9",path:"/loops/white-hole/WhiteHole__ln0v__202.mp4"},{id:"white-hole-WhiteHole__0kk6__187",name:"white-hole+6rpw/10",path:"/loops/white-hole/WhiteHole__0kk6__187.mp4"},{id:"white-hole-WhiteHole__eqvs__182",name:"white-hole+iinl/11",path:"/loops/white-hole/WhiteHole__eqvs__182.mp4"},{id:"white-hole-WhiteHole__dv5k__154",name:"white-hole+1h7d/12",path:"/loops/white-hole/WhiteHole__dv5k__154.mp4"},{id:"white-hole-WhiteHole__f16d__135",name:"white-hole+ld61/13",path:"/loops/white-hole/WhiteHole__f16d__135.mp4"},{id:"white-hole-WhiteHole__40pv__114",name:"white-hole+1bq5/14",path:"/loops/white-hole/WhiteHole__40pv__114.mp4"},{id:"white-hole-WhiteHole__j5l5__123",name:"white-hole+6vbo/15",path:"/loops/white-hole/WhiteHole__j5l5__123.mp4"},{id:"white-hole-WhiteHole__nj8u__121",name:"white-hole+hb46/16",path:"/loops/white-hole/WhiteHole__nj8u__121.mp4"},{id:"white-hole-WhiteHole__8tdu__103",name:"white-hole+dekr/17",path:"/loops/white-hole/WhiteHole__8tdu__103.mp4"},{id:"white-hole-WhiteHole__9bmk__111",name:"white-hole+72y1/18",path:"/loops/white-hole/WhiteHole__9bmk__111.mp4"},{id:"white-hole-WhiteHole__ayxc__110",name:"white-hole+qt1m/19",path:"/loops/white-hole/WhiteHole__ayxc__110.mp4"},{id:"white-hole-WhiteHole__1kmz__95",name:"white-hole+jyid/20",path:"/loops/white-hole/WhiteHole__1kmz__95.mp4"},{id:"white-hole-WhiteHole__la23__87",name:"white-hole+dh2f/21",path:"/loops/white-hole/WhiteHole__la23__87.mp4"},{id:"white-hole-WhiteHole__n2ey__86",name:"white-hole+i9zi/22",path:"/loops/white-hole/WhiteHole__n2ey__86.mp4"},{id:"white-hole-WhiteHole__793e__76",name:"white-hole+a1f0/23",path:"/loops/white-hole/WhiteHole__793e__76.mp4"},{id:"white-hole-WhiteHole__15u5__61",name:"white-hole+xslx/24",path:"/loops/white-hole/WhiteHole__15u5__61.mp4"},{id:"white-hole-WhiteHole__2xdv__60",name:"white-hole+3twk/25",path:"/loops/white-hole/WhiteHole__2xdv__60.mp4"},{id:"white-hole-WhiteHole__9x4p__56",name:"white-hole+92mc/26",path:"/loops/white-hole/WhiteHole__9x4p__56.mp4"},{id:"white-hole-WhiteHole__n904__68",name:"white-hole+ipio/27",path:"/loops/white-hole/WhiteHole__n904__68.mp4"},{id:"white-hole-WhiteHole__50w4__39",name:"white-hole+3d8t/28",path:"/loops/white-hole/WhiteHole__50w4__39.mp4"},{id:"white-hole-WhiteHole__ahxn__36",name:"white-hole+yhuj/29",path:"/loops/white-hole/WhiteHole__ahxn__36.mp4"},{id:"white-hole-WhiteHole__ccbs__35",name:"white-hole+woia/30",path:"/loops/white-hole/WhiteHole__ccbs__35.mp4"},{id:"white-hole-WhiteHole__0dzu__20",name:"white-hole+phe1/31",path:"/loops/white-hole/WhiteHole__0dzu__20.mp4"},{id:"white-hole-WhiteHole__bhw5__4",name:"white-hole+srka/32",path:"/loops/white-hole/WhiteHole__bhw5__4.mp4"}]}];var Ur="/loops/",Ls={may:"point-cloud","point-waves":"point-cloud","pointcloud-waves-demo":"point-cloud","VEO-incoming":"white-hole"},j_=[e=>/^VEO-/i.test(e)||/^veo_/i.test(e),e=>/april/i.test(e),e=>/^000_White-Hole/i.test(e)||/^000_white_hole/i.test(e)],aT=[e=>e.startsWith("VEO-"),e=>e.startsWith("pointcloud-"),e=>e.toLowerCase().includes("pointcloud"),e=>e.startsWith("WhiteHole"),e=>e.startsWith("bw-"),e=>e.startsWith("PC-"),e=>e.startsWith("00_")],X_=[[/^\/loops\/may\//,"/loops/point-cloud/"],[/^\/loops\/pointcloud-waves-demo\//,"/loops/point-cloud/"],[/^\/loops\/point-waves\//,"/loops/point-cloud/"],[/^\/loops\/may-frames\//,"/loops/point-cloud/"],[/^\/loops\/pointcloud-waves-demo-frames\//,"/loops/point-cloud/"],[/^\/loops\/point-waves-frames\//,"/loops/point-cloud/"],[/^\/loops\/white-hole-frames\//,"/loops/white-hole/"],[/^\/loops\/WhiteHole2-frames\//,"/loops/white-hole/"],[/^\/loops\/WhiteHole3-frames\//,"/loops/white-hole/"],[/^\/loops\/VEO-April-frames\//,"/loops/white-hole/"],[/^\/loops\/VEO-April2-frames\//,"/loops/white-hole/"],[/^\/loops\/VEO-OceanLoops-frames\//,"/loops/white-hole/"],[/^\/loops\/VEO-Tignes-frames\//,"/loops/white-hole/"],[/^\/loops\/PC-WaterPointcloud-BW-frames\//,"/loops/point-cloud/"],[/^\/loops\/bw-pointcloud-water-frames\//,"/loops/point-cloud/"],[/^\/loops\/bw-pulse-water-frames\//,"/loops/point-cloud/"],[/^\/loops\/parvagues-frames\//,"/loops/parvagues/"],[/^\/loops\/archive\/(\d{2}-[^/]+-frames)\//,"/loops/point-cloud/"],[/^\/loops\/(\d{2}-[^/]+-frames)\//,"/loops/point-cloud/"],[/^\/loops\/archive\/may__/,"/loops/point-cloud/"],[/^\/loops\/archive\/pointcloud-waves-demo__/,"/loops/point-cloud/"]];function iT(){let e=new Set;for(let t of Ms)t.folder&&e.add(t.folder);for(let t of q_)t.folder&&e.add(t.folder);for(let t of Object.values(Ls))e.add(t);return e}var sT=iT();function sm(e){return!e||e==="archive"||e.endsWith("-frames")?!1:Ls[e]||sT.has(e)?!0:aT.some(t=>t(e))}function Y_(e){return!sm(e)}function lT(e){let t=e;for(let[n,o]of X_)t=t.replace(n,o);return t}function K_(e){if(!e.startsWith(Ur))return null;let t=e.slice(Ur.length),n=t.indexOf("/");return n<=0?null:t.slice(0,n)}function Q_(e){if(typeof e!="string"||!e.startsWith(Ur)||e.startsWith("/loops/archive/"))return e;let t=K_(e),n=t?e.slice(`${Ur}${t}/`.length):"";if(!t||!n||!Y_(t))return e;let o=t.replace(/[^\w.-]+/g,"_");return`${Ur}archive/${o}__${n}`}function lm(e){return typeof e!="string"?e:lT(e)}function Z_(e){if(typeof e!="string")return e;let t=K_(e);return t&&Ls[t]?e.replace(new RegExp(`^${Ur}${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}/`),`${Ur}${Ls[t]}/`):e}function J_(e){if(typeof e!="string"||!e.startsWith("/loops/archive/"))return e;let t=e.slice(15);return j_.some(n=>n(t))?`/loops/white-hole/${t}`:e}function ec(e){if(typeof e!="string"||!e.startsWith("/loops/archive/"))return e;let t=e.slice(15),n=t.indexOf("__");if(n<=0)return e;let o=t.slice(0,n),r=t.slice(n+2);return sm(o)?`${Ur}${o}/${r}`:e}function na(e){let t=typeof e=="string"&&e in im?im[e]:e,n=ec(t);return lm(Q_(J_(Z_(lm(n)))))}u();u();var cm=8;function um(e,t=cm){if(!Number.isFinite(e)||e<=0)return 1/0;let n=e/t;return n<1.25?1.25*3:n}function hn(e,t){return typeof e!="string"||typeof t!="string"||!e||!t?!1:e===t?!0:na(e)===na(t)}function tc(e,t){if(!t||!Array.isArray(e))return null;for(let n of e){let o=n?.path;if(!(typeof o!="string"||!o)&&hn(t,o))return o}return null}function pm(e,t){let n=t.filter(l=>typeof l=="string"&&l.length>0);if(n.length===0)return{next:null,prev:null};let o=typeof e=="string"?e:"",r=-1;if(o&&(r=n.findIndex(l=>hn(l,o))),r===-1)return{next:n[0],prev:n[n.length-1]};let i=(r+1)%n.length,s=(r-1+n.length)%n.length;return{next:n[i],prev:n[s]}}function eg(e){return e.includes("/loops/archive/")?1:0}function uT(e){if(!e.startsWith("/loops/archive/"))return e;let t=e.slice(15),n=t.indexOf("__");if(n<=0)return e;let o=t.slice(0,n),r=t.slice(n+2);return!o||!r||o.endsWith("-frames")?e:`/loops/${o}/${r}`}function tg(e){if(!e||typeof e!="string"||!e.startsWith("/"))return[];let t=[],n=o=>{o.startsWith("/")&&!t.includes(o)&&t.push(o)};return n(e),n(ec(e)),n(uT(e)),n(na(e)),t.toSorted((o,r)=>eg(o)-eg(r)).map(o=>Cs(o))}u();u();u();u();u();var ng="::base",mm="::enabled",og="::param:";function dm(e){return`${e}${mm}`}function gi(e){if(e.endsWith(mm))return{effectKey:e.slice(0,-mm.length),paramKey:null,enabledToggle:!0};if(e.endsWith(ng))return{effectKey:e.slice(0,-ng.length),paramKey:null};let t=e.indexOf(og);if(t===-1)return null;let n=e.slice(t+og.length);return n?{effectKey:e.slice(0,t),paramKey:n}:null}var pT=[...sr,...jo],FF=new Map(pT.map(e=>[e.key,e]));function rg(e){return`${Xo}${e}`}u();var mT="pad.bottom";var fm="scene.slot.";function ig(e){return e<0||e>=6?null:`${mT}.${2+e}`}function hm(e){if(e<0||e>=16)return null;let t=4+e%4;return`grid.${4+Math.floor(e/4)}.${t}`}var sg=Array.from({length:16},(e,t)=>hm(t));function ks(e){if(!e.startsWith(fm))return!1;let t=Number(e.slice(fm.length));return Number.isInteger(t)&&t>=0&&t<16}function lg(e){return`${fm}${e}`}var cg=0,hT={videoSpeed:4,autoMix:5,transition:6,colorAdjust:7},gm=ds;function ug(e){return Sr(e)}var _T=4,_m=4,gT=_T*_m,bT="pad.top",yT=8,xT=Array.from({length:yT},(e,t)=>`${bT}.${t}`);function pg(e){let t=hT[e];return t==null?null:`grid.${cg}.${t}`}function vT(e){let t=gm[e];return pg(t)??`grid.${cg}.4`}var ST=gm.map((e,t)=>vT(t));function wT(e){return e.filter(t=>t&&!Sr(t))}function TT(e){return rg(dm(e))}function bm(e){if(!e?.startsWith(Xo))return null;let t=gi(e.slice(Xo.length));return t?.enabledToggle?t.effectKey:null}function CT(e){let t=e%_m;return`grid.${Math.floor(e/_m)}.${t}`}var mg=Array.from({length:gT},(e,t)=>CT(t));function dg(e){return{action:TT(e),mode:"toggle",ledStyle:"state"}}function fg(e){for(let t of mg){let n=bm(e[t]?.action);n&&ug(n)&&(e[t]={action:""})}}function MT(e){let t=new Set(sg),n=new Set(ST);for(let o=0;o<8;o++)for(let r=0;r<8;r++){let i=`grid.${o}.${r}`;if(t.has(i)||n.has(i))continue;let s=e[i]?.action;if(!s)continue;let l=bm(s);l&&ug(l)&&(e[i]={action:""}),ks(s)&&(e[i]={action:""})}}function hg(e){MT(e);for(let t of gm){let n=pg(t);n&&(e[n]=dg(t))}}function _g(e){return{action:lg(e),mode:"momentary",ledStyle:"accent"}}function gg(e,t){for(let n=0;n<16;n++){let o=hm(n);o&&(e[o]=_g(n))}}function bg(e,t){for(let n=0;n<6;n++){let o=ig(n);o&&(e[o]=_g(n))}}function yg(e,t,n){let o=wT(n);for(let r=0;r<t.length;r++){let i=t[r];r<o.length?e[i]=dg(o[r]):bm(e[i]?.action)&&(e[i]={action:""})}}function xg(e,t){yg(e,mg,t)}function vg(e,t){yg(e,xT,t)}u();var LT=["side.sendUp","side.sendDown","side.trackLeft"],kT=["ui.panel.audio","ui.panel.video","ui.panel.menu"],RT=["side.scene1","side.scene2","side.scene3"];function AT(e){return{action:e,mode:"momentary",ledStyle:"accent"}}function Sg(e,t){for(let n=0;n<t.length;n++)e[t[n]]=AT(kT[n])}function wg(e){Sg(e,LT)}function Tg(e){Sg(e,RT)}u();var Cg="preset.slot.",ET="preset.padPrev",PT="preset.padNext";function ym(e){let t=e%4;return`grid.${4+Math.floor(e/4)}.${t}`}var XF=Array.from({length:16},(e,t)=>ym(t));function xm(e){if(e===ET||e===PT)return!0;if(!e.startsWith(Cg))return!1;let t=Number(e.slice(Cg.length));return Number.isInteger(t)&&t>=0&&t<16}var Xo="fx:";function Mg(e){return e.startsWith("knob.")||e.startsWith("wheel.")?"knob":e.startsWith("fader.")?"fader":e.startsWith("pad.")||e.startsWith("grid.")?"pad":"side"}function FT(e,t){if(!e||xm(e)||ks(e))return"momentary";if((e.startsWith(Xo)?e.slice(Xo.length):"").endsWith("::enabled")||e==="video.togglePlay"||e==="ui.toggleZen")return"toggle";if(e==="video.next"||e==="video.prev"||e==="ui.panel.audio"||e==="ui.panel.video"||e==="ui.panel.menu")return"momentary";if(e.startsWith(Xo)){let o=Mg(t);return o==="knob"||o==="fader"?"value":"momentary"}return e.startsWith("global.")?"value":"momentary"}function OT(e,t,n){if(!e.startsWith(Xo))return n;let o=gi(e.slice(Xo.length));if(!o||o.enabledToggle)return n;let r=Mg(t);return r==="knob"||r==="fader"?"value":n}function vm(e,t){let n={action:""};if(!e||typeof e!="object")return n;let o=e,r=typeof o.action=="string"?o.action:"",i=NT(r)?r:"",s=o.mode,l=s==="value"||s==="toggle"||s==="momentary"||s==="pushPull"?s:FT(i,t),m=typeof o.min=="number"&&Number.isFinite(o.min)?o.min:void 0,d=typeof o.max=="number"&&Number.isFinite(o.max)?o.max:void 0,y=typeof o.step=="number"&&Number.isFinite(o.step)&&o.step>0?o.step:void 0,D=typeof o.ledFeedback=="boolean"?o.ledFeedback:void 0,B=o.ledStyle,O=B==="auto"||B==="state"||B==="accent"?B:void 0;return{action:i,mode:OT(i,t,l),min:m,max:d,step:y,ledFeedback:D,ledStyle:O}}var HT=[{value:"",label:"\u2014",compact:""},{value:"global.bpm",label:"BPM",compact:"BPM"},{value:"global.inputGain",label:"Input gain",compact:"In gain"},{value:"global.inputMultiplier",label:"Trigger scale",compact:"Trig \xD7"},{value:"video.next",label:"Playset: next clip",compact:"PS \xB7 Next"},{value:"video.prev",label:"Playset: prev clip",compact:"PS \xB7 Prev"},{value:"video.togglePlay",label:"Playset: play / stop",compact:"PS \xB7 Tran"},{value:"ui.toggleZen",label:"UI: zen toggle",compact:"UI \xB7 Zen"},{value:"ui.panel.audio",label:"UI: Audio panel",compact:"UI \xB7 Audio"},{value:"ui.panel.video",label:"UI: Playset panel",compact:"UI \xB7 Playset"},{value:"ui.panel.menu",label:"UI: sidebar menu",compact:"UI \xB7 Menu"}],nO=Array.from({length:16},(e,t)=>({value:`scene.slot.${t}`,label:`Scene \xB7 slot ${t+1}`,compact:`Sc \xB7 ${t+1}`})),oO=[{value:"preset.padPrev",label:"FX presets: previous pad",compact:"FX \xB7 Pad \u2212"},{value:"preset.padNext",label:"FX presets: next pad",compact:"FX \xB7 Pad +"},...Array.from({length:16},(e,t)=>({value:`preset.slot.${t}`,label:`FX preset \xB7 pad slot ${t+1}`,compact:`FX \xB7 ${t+1}`}))];function nc(){return{midiInDebug:!1,midiLedFeedback:!0,slots:{}}}var bi=e=>Array.from({length:8},(t,n)=>`${e}.${n}`),IT=[{rowLabel:"Send A",ids:bi("knob.sendA")},{rowLabel:"Send B",ids:bi("knob.sendB")},{rowLabel:"Pan / device",ids:bi("knob.pan")},{rowLabel:"Level",ids:bi("fader")},{rowLabel:"Track focus",ids:bi("pad.top")},{rowLabel:"Track control",ids:bi("pad.bottom")}],BT=[{id:"side.sendUp",shortLabel:"Audio"},{id:"side.sendDown",shortLabel:"Playset"},{id:"side.trackLeft",shortLabel:"Menu"},{id:"side.trackRight",shortLabel:"Trk \u2192"},{id:"side.device",shortLabel:"Device"},{id:"side.mute",shortLabel:"Mute"},{id:"side.solo",shortLabel:"Solo"},{id:"side.record",shortLabel:"Rec"}],DT=[...IT.flatMap(e=>e.ids),...BT.map(e=>e.id)];function NT(e){if(!e||HT.some(o=>o.value===e)||xm(e)||ks(e))return!0;if(!e.startsWith(Xo))return!1;let t=e.slice(Xo.length);return!!gi(t)}function Sm(e,t){let n=nc(),o=e,r=typeof o.midiInDebug=="boolean"?o.midiInDebug:typeof o.midiLedDebug=="boolean"?o.midiLedDebug:n.midiInDebug,i=o.slots&&typeof o.slots=="object"?o.slots:{},s=typeof o.midiLedFeedback=="boolean"?o.midiLedFeedback:n.midiLedFeedback,l={...n,midiInDebug:r,midiLedFeedback:s,slots:{}};for(let m of DT){let d=i[m];if(!d||typeof d!="object"){l.slots[m]={action:""};continue}l.slots[m]=vm(d,m)}return wg(l.slots),bg(l.slots,t?.scenes??[]),t?.activeFxList&&vg(l.slots,t.activeFxList),l}var oa=e=>Array.from({length:8},(t,n)=>`grid.${e}.${n}`),WT=[{rowLabel:"Row 1 (top)",ids:oa(0)},{rowLabel:"Row 2",ids:oa(1)},{rowLabel:"Row 3",ids:oa(2)},{rowLabel:"Row 4",ids:oa(3)},{rowLabel:"Row 5",ids:oa(4)},{rowLabel:"Row 6",ids:oa(5)},{rowLabel:"Row 7",ids:oa(6)},{rowLabel:"Row 8 (bottom)",ids:oa(7)}],GT=[{id:"top.up",shortLabel:"\u2191"},{id:"top.down",shortLabel:"\u2193"},{id:"top.left",shortLabel:"\u2190"},{id:"top.right",shortLabel:"\u2192"},{id:"top.session",shortLabel:"Sess"},{id:"top.drums",shortLabel:"Drum"},{id:"top.keys",shortLabel:"Keys"},{id:"top.user",shortLabel:"User"},{id:"top.logo",shortLabel:"Logo"}],UT=[{id:"side.scene1",shortLabel:"Audio"},{id:"side.scene2",shortLabel:"Playset"},{id:"side.scene3",shortLabel:"Menu"},{id:"side.scene4",shortLabel:"Sc 4"},{id:"side.scene5",shortLabel:"Sc 5"},{id:"side.scene6",shortLabel:"Sc 6"},{id:"side.scene7",shortLabel:"Sc 7"},{id:"side.stopSoloMute",shortLabel:"Stop"}],zT=[...WT.flatMap(e=>e.ids),...GT.map(e=>e.id),...UT.map(e=>e.id)];function oc(){return{midiInDebug:!1,midiLedFeedback:!0,slots:{}}}function VT(e){for(let t=0;t<16;t++){let n=ym(t);e[n]?.action||(e[n]={action:`preset.slot.${t}`,mode:"momentary"})}e["top.left"]?.action||(e["top.left"]={action:"preset.padPrev",mode:"momentary"}),e["top.right"]?.action||(e["top.right"]={action:"preset.padNext",mode:"momentary"})}function wm(e,t){let n=oc(),o=e,r=typeof o.midiInDebug=="boolean"?o.midiInDebug:n.midiInDebug,i=typeof o.midiLedFeedback=="boolean"?o.midiLedFeedback:n.midiLedFeedback,s=o.slots&&typeof o.slots=="object"?o.slots:{},l={...n,midiInDebug:r,midiLedFeedback:i,slots:{}};for(let m of zT){let d=s[m];if(!d||typeof d!="object"){l.slots[m]={action:""};continue}l.slots[m]=vm(d,m)}return VT(l.slots),fg(l.slots),hg(l.slots),Tg(l.slots),gg(l.slots,t?.scenes??[]),t?.activeFxList&&xg(l.slots,t.activeFxList),l}var $T=25,qT=Array.from({length:8},(e,t)=>`knob.${t}`),Lg=Array.from({length:8},(e,t)=>`pad.top.${t}`),kg=Array.from({length:8},(e,t)=>`pad.bottom.${t}`),jT=[{id:"round.up",shortLabel:"\u25B2"},{id:"round.down",shortLabel:"\u25BC"}],XT=[{id:"track.left",shortLabel:"\u25C0 Trk"},{id:"track.right",shortLabel:"Trk \u25B6"}],YT=[{id:"wheel.pitch",shortLabel:"Pitch",centered:!0},{id:"wheel.mod",shortLabel:"Mod",centered:!1}],KT=Array.from({length:$T},(e,t)=>`key.${t}`),QT=[...qT,...Lg,...kg,...jT.map(e=>e.id),...XT.map(e=>e.id),...YT.map(e=>e.id),...KT];function rc(){return{midiInDebug:!1,midiLedFeedback:!0,slots:{}}}function ZT(e){[...Lg,...kg].forEach((n,o)=>{e[n]?.action||(e[n]={action:`preset.slot.${o}`,mode:"momentary"})}),e["track.left"]?.action||(e["track.left"]={action:"preset.padPrev",mode:"momentary"}),e["track.right"]?.action||(e["track.right"]={action:"preset.padNext",mode:"momentary"})}function Tm(e,t){let n=rc(),o=e,r=typeof o.midiInDebug=="boolean"?o.midiInDebug:n.midiInDebug,i=typeof o.midiLedFeedback=="boolean"?o.midiLedFeedback:n.midiLedFeedback,s=o.slots&&typeof o.slots=="object"?o.slots:{},l={...n,midiInDebug:r,midiLedFeedback:i,slots:{}};for(let m of QT){let d=s[m];if(!d||typeof d!="object"){l.slots[m]={action:""};continue}l.slots[m]=vm(d,m)}return ZT(l.slots),l}u();u();var Rg=[{id:"parvagues-ep-2026",artist:"ParVagues",title:"ParVagues \xD7 Shipow",badge:"ParVagues \xD7 Shipow \xB7 2026",fxKeys:["liquix"],claim:"code",codes:["PARVAGUES","VAGUES2026"],dropParam:"parvagues-ep",playsetFolder:"parvagues"}],iO=new Map(Rg.map(e=>[e.id,e])),sO=new Map(Rg.filter(e=>e.dropParam).map(e=>[e.dropParam,e]));var eC={presetsSaved:0,loopsRated:0,scenesCreated:0,liveSeconds:0,fxEverAdded:[],audioStarted:0,maxFxChain:0,newsletterSubscribed:0},Cm={ownedTier:"starter",unlockedFx:[],claimedCollabs:[],zap:0,completedQuests:[],engagement:{...eC}};u();u();function ac(e){return{...e,attack:e.attack??fn.attack,hold:e.hold??fn.hold,oneshotRelease:e.oneshotRelease??fn.release,oneshotDecay:e.oneshotDecay??fn.decay,triggerEaseOutShape:e.triggerEaseOutShape??fn.easeShape}}function Ag(e){let t=ac(e);return{attack:t.attack,hold:t.hold??fn.hold,release:t.oneshotRelease??fn.release,decay:t.oneshotDecay??fn.decay,easeShape:t.triggerEaseOutShape??fn.easeShape}}u();var tC=["sin","cos","tri","saw","square"];var nC={sin:"SI",cos:"CO",tri:"TR",saw:"SA",square:"SQ"};function ra(e){return ic(e)!=null}function ic(e){if(!e.startsWith("lfo:"))return null;let t=e.slice(4);return tC.includes(t)?t:null}function Eg(e){let t=ic(e);return t?nC[t]:"LF"}u();u();u();u();u();u();var RO={attack:fn.attack,hold:fn.hold,release:fn.release,decay:fn.decay,easeShape:fn.easeShape};function Pg(e){let t=bp(e);return{attack:t.triggerAttack??fn.attack,hold:t.triggerHold??fn.hold,release:t.triggerRelease??fn.release,decay:t.decay??fn.decay,easeShape:t.triggerEaseOutShape??fn.easeShape}}function Mm(){return"eg:1"}u();var Rs=[{band:"nech:onset",label:"Onset",short:"ON",kind:"pulse",color:"#22d3ee"},{band:"nech:kick",label:"Kick hit",short:"KI",kind:"pulse",color:"#e879f9"},{band:"nech:low",label:"Low hit",short:"LO",kind:"pulse",color:"#ef4444"},{band:"nech:mid",label:"Mid hit",short:"MI",kind:"pulse",color:"#34d399"},{band:"nech:high",label:"High hit",short:"HI",kind:"pulse",color:"#38bdf8"},{band:"nech:beat",label:"Beat grid",short:"BE",kind:"pulse",color:"#a855f7"},{band:"nech:rms",label:"RMS",short:"RM",kind:"level",color:"#94a3b8"},{band:"nech:specLow",label:"Spec low",short:"SL",kind:"level",color:"#f87171"},{band:"nech:specMid",label:"Spec mid",short:"SM",kind:"level",color:"#4ade80"},{band:"nech:specHigh",label:"Spec high",short:"SH",kind:"level",color:"#38bdf8"},{band:"nech:valence",label:"Valence",short:"VA",kind:"level",color:"#67e8f9"},{band:"nech:arousal",label:"Arousal",short:"AR",kind:"level",color:"#fb7185"}];function sc(e){return e.startsWith("nech:")}u();u();u();u();var oC={kick:{h:322,s:94,l:64},snare:{h:38,s:95,l:58},hat:{h:175,s:88,l:52},bass:{h:275,s:82,l:48},vocals:{h:18,s:88,l:62},low:{h:0,s:96,l:50},mid:{h:160,s:84,l:39},high:{h:199,s:89,l:48},beat:{h:271,s:81,l:56},rhythm:{h:286,s:70,l:62},specFast:{h:50,s:92,l:60},specSlow:{h:220,s:60,l:62},master:{h:187,s:85,l:52}};function rC(e,t,n){let o=t/100,r=n/100,i=(1-Math.abs(2*r-1))*o,s=i*(1-Math.abs(e/60%2-1)),l=r-i/2,m=0,d=0,y=0;return e<60?(m=i,d=s):e<120?(m=s,d=i):e<180?(d=i,y=s):e<240?(d=s,y=i):e<300?(m=s,y=i):(m=i,y=s),[Math.round((m+l)*255),Math.round((d+l)*255),Math.round((y+l)*255)]}function aC(e){let t=oC[e];return rC(t.h,t.s,t.l)}function iC(e){let[t,n,o]=aC(e);return[t/255,n/255,o/255]}function xi(e){let[t,n,o]=iC(e);return`vec3(${t.toFixed(4)}, ${n.toFixed(4)}, ${o.toFixed(4)})`}var yi={none:{short:"\u2014",label:"None",iconActive:"text-white/45",iconIdle:"text-white/28"},kick:{short:"KI",label:"Kick",iconActive:"text-fuchsia-300",iconIdle:"text-fuchsia-500/38"},snare:{short:"SN",label:"Snare",iconActive:"text-amber-300",iconIdle:"text-amber-500/38"},hat:{short:"HT",label:"Hat",iconActive:"text-teal-300",iconIdle:"text-teal-500/38"},bass:{short:"BA",label:"Bass",iconActive:"text-violet-400",iconIdle:"text-violet-500/38"},vocals:{short:"VO",label:"Vocals",iconActive:"text-orange-300",iconIdle:"text-orange-500/38"},low:{short:"LO",label:"Low",iconActive:"text-red-400",iconIdle:"text-red-500/38"},mid:{short:"MI",label:"Mid",iconActive:"text-emerald-400",iconIdle:"text-emerald-500/38"},high:{short:"HI",label:"High",iconActive:"text-sky-400",iconIdle:"text-sky-500/38"},beat:{short:"BE",label:"Beat",iconActive:"text-purple-400",iconIdle:"text-purple-500/38"},rhythm:{short:"RY",label:"Rhythm",iconActive:"text-violet-300",iconIdle:"text-violet-500/38"},specFast:{short:"SF",label:"Spec Fast",iconActive:"text-yellow-300",iconIdle:"text-yellow-500/38"},specSlow:{short:"SS",label:"Spec Slow",iconActive:"text-indigo-300",iconIdle:"text-indigo-500/38"},master:{short:"MA",label:"Master",iconActive:"text-white",iconIdle:"text-white/38"},fx:{short:"FX",label:"FX",iconActive:"text-white/85",iconIdle:"text-white/32"}};function sC(e){return yi[e]??yi.none}function Cr(e){return vi(e)?Fg(e):e.startsWith("lfo:")?Eg(e):sC(e).short}var lC=[{key:"kick",eventKey:"kick",label:"Kick",shortLabel:yi.kick.short},{key:"low",eventKey:"low",label:"Low",shortLabel:yi.low.short},{key:"mid",eventKey:"bass",label:"Mid",shortLabel:yi.mid.short},{key:"high",eventKey:"high",label:"High",shortLabel:yi.high.short}];u();u();var YO=Rs.filter(e=>e.band!=="nech:onset"&&e.band!=="nech:valence"&&e.band!=="nech:arousal"&&(e.kind==="pulse"||e.band==="nech:rms"||e.band==="nech:specLow"||e.band==="nech:specMid"||e.band==="nech:specHigh"));u();var uC=12,x8=Array.from({length:uC},(e,t)=>t+1),pC="role:";function Og(e){return/^orbit([1-9]|1[0-2])$/.test(e)}function Hg(e){return/^role:(rhythm|bass|lead|pad|riser|other)$/.test(e)}function As(e){return Og(e)||Hg(e)}function lc(e){return Hg(e)?e.slice(pC.length):null}function cc(e){let t=/^orbit([1-9]|1[0-2])$/.exec(e);return t?parseInt(t[1],10):null}u();function Ig(e){return e.isTrigger?e.envelopeRef===null?"trigger":"envelope":"follow"}u();function aa(e){return jn(e)?"0-1":Ea(e.source)||ra(e.source)?"-1-1":"0-1"}function mC(e){return e<0?0:e>1?1:e}function ia(e,t,n,o){let r;return o==="-1-1"?r=(Math.max(-1,Math.min(1,e*2-1))+1)/2:r=mC(e),t+r*(n-t)}function dC(e,t){return t>=0?{mapMin:e,mapMax:e+t}:{mapMin:e+t,mapMax:e}}function Bg(e,t,n,o,r,i){return typeof e=="number"&&typeof t=="number"?{mapMin:e,mapMax:t}:o!==0?dC(n,o):{mapMin:r,mapMax:i}}function Dg(e,t,n,o){return(e==="colorAdjust"||e==="colorLayer")&&t==="base"?{mapMin:-1,mapMax:o}:e==="videoSpeed"&&t==="base"?{mapMin:n,mapMax:1.25}:e==="zoom"&&t==="base"?{mapMin:1,mapMax:o}:e==="rotate"&&t==="base"?{mapMin:0,mapMax:o}:{mapMin:n,mapMax:o}}var fC={attack:0,hold:0,release:0,decay:40,easeShape:"linear"},Ng={source:"none",depth:1,mapMin:0,mapMax:1,mode:"follow",trigger:{threshold:Se.triggerThreshold,count:Se.triggerCount,delay:Se.delay},envelopeRef:null,envelope:{attack:Se.triggerAttack,hold:Se.triggerHold,release:Se.triggerRelease,decay:Se.decay,easeShape:Se.triggerEaseOutShape}};function hC(e){return Si(e)||Es(e)}var _C=new Set(["master","specFast","specSlow"]);function gC(e){return hC(e)||Ea(e)||ra(e)||Ps(e)||_C.has(e)?!0:sc(e)?Rs.find(t=>t.band===e)?.kind==="level":!1}function uc(e){return!gC(e)}function bC(e){let t=Pg(e);return{attack:t.attack,hold:t.hold,release:t.release,decay:t.decay,easeShape:t.easeShape}}function Lm(e,t=0,n=0,o=1,r,i){let s=Ig(e);s!=="follow"&&!uc(e.band)&&(s="follow");let m=s==="envelope"?Nl:Se,d=n,y=o;if(s!=="follow"&&r&&i){let O=Dg(r,i,n,o);typeof e.mapMin!="number"&&(d=O.mapMin),typeof e.mapMax!="number"&&(y=O.mapMax)}let{mapMin:D,mapMax:B}=Bg(e.mapMin,e.mapMax,t,e.multiplier??0,d,y);return{source:e.band,depth:e.multiplier??1,mapMin:D,mapMax:B,mode:s,trigger:{threshold:e.triggerThreshold??m.triggerThreshold,count:e.triggerCount??m.triggerCount,delay:e.delay??Se.delay},envelopeRef:s==="envelope"?e.envelopeRef&&e.envelopeRef!==null?e.envelopeRef:Mm():null,envelope:bC(e)}}function km(e,t){if(e.mode==="trigger")return fC;if(e.mode==="envelope"&&e.envelopeRef&&t){let n=pc(e.envelopeRef);if(n!=null){let o=t.egs[n-1];if(o?.enabled)return Ag(o)}}return e.envelope}function Nn(e,t,n){let o=n?.fxKey,r=n?.paramMin??0,i=n?.paramMax??1;if(t==="base")return Lm({band:e.syncBand??"none",multiplier:e.syncMultiplier??1,mapMin:e.mapMin,mapMax:e.mapMax,isTrigger:e.isTrigger,envelopeRef:e.envelopeRef,triggerThreshold:e.triggerThreshold,triggerCount:e.triggerCount,delay:e.delay,decay:e.decay,triggerAttack:e.triggerAttack,triggerRelease:e.triggerRelease,triggerHold:e.triggerHold,triggerEaseOutShape:e.triggerEaseOutShape},n?.staticValue??e.base??0,r,i,o,t);let s=e.paramSync?.[t],l=n?.staticValue??(typeof e.params?.[t]=="number"?e.params[t]:0);return s?Lm(s,l,r,i,o,t):{...Ng,mapMin:r,mapMax:i}}function yC(e,t){return e==="fadeOff"&&t==="base"}function Wg(e,t,n,o){if(yC(t,n)){let r=o?.paramMin??0,i=o?.paramMax??1,s=o?.staticValue??e.base??0,l=e.paramSync?.base;return l?Lm(l,s,r,i,t,n):{...Ng,mapMin:r,mapMax:i}}return Nn(e,n,{...o,fxKey:t})}function jn(e){return(e.mode==="trigger"||e.mode==="envelope")&&uc(e.source)}var Gg={sin:{waveform:"sin",phase:0,slot:1},cos:{waveform:"sin",phase:.25,slot:1},tri:{waveform:"tri",phase:0,slot:2},saw:{waveform:"saw",phase:0,slot:3},square:{waveform:"square",phase:0,slot:4}};function xC(e){return`lfo:${Gg[e].slot}`}function vC(e,t,n){let o=Gg[t],r=o.slot-1,i=e.lfos.map((s,l)=>l!==r?s:{...s,enabled:!0,waveform:o.waveform,rate:Math.max(.01,n),phase:o.phase});return{...e,lfos:i}}function Ug(e,t,n){let o=wi(n);if(!ra(e))return{band:e,depth:t,modulation:o};let r=ic(e),i=vC(o,r,t||1);return{band:xC(r),depth:1,modulation:i}}function Mr(e,t,n=1){if(e==="none")return 0;if(vi(e))return Am(e);if(ra(e)){let s=ie().hydraModulation?.config,l=Ug(e,n,s);return Am(l.band)}let o=ie();if(e==="kick")return t&&typeof t.kick=="number"?t.kick:typeof o.kick=="number"?o.kick:0;if(e==="low")return o.low??0;if(e==="mid")return o.mid??0;if(e==="high")return o.high??0;if(e==="beat")return o.beat??0;if(e==="master")return t&&typeof t.master=="number"?t.master:typeof o.masterLevel=="number"?o.masterLevel:0;let r=cc(e);if(r!=null){let s=o.studioOrbitPulse?.[r];if(typeof s=="number")return s;if(t){let l=`orbit${r}`;if(typeof t[l]=="number")return t[l]}return 0}let i=lc(e);if(i!=null){let s=o.studioRolePulse?.[i];return typeof s=="number"?s:t&&typeof t[e]=="number"?t[e]:0}return sc(e)?t&&typeof t[e]=="number"?t[e]:0:t&&t[e]||0}function So(e,t,n,o,r){let i=ie(),s=r??i.hydraSettings?.fx?.[e],l=o?`${e}:${o}`:e,m=s?Nn(s,o??"base"):null;if(m&&jn(m))return i.hydraEnvelopes?.[l]||0;let d=m?.source??t,y=m?.depth??1;return Mr(d,n,y)}function Rm(e,t,n){let o=e;return t!==void 0&&(o=Math.max(t,o)),n!==void 0&&(o=Math.min(n,o)),o}function _n(e,t,n,o={}){let{clampMin:r,clampMax:i,paramMin:s,paramMax:l,whenDisabled:m=0,requireEnabled:d=!0,map:y}=o;if(d&&(!t||!t.enabled))return m;let D=s??r??0,B=l??i??1,O=Nn(t,"base",{staticValue:t.base??0,paramMin:D,paramMax:B,fxKey:e});if(O.source==="none"){let Re=t.base;return y&&(Re=y(Re,t)),r!==void 0||i!==void 0?Rm(Re,r,i):Re}let K=So(e,O.source,n,void 0,t),X=aa(O),pe=ia(K,O.mapMin,O.mapMax,X);return y&&(pe=y(pe,t)),r!==void 0||i!==void 0?Rm(pe,r,i):pe}function Zt(e,t,n,o,r,i){if(!t)return o;let s=t.params?.[n]??o,l=t.paramSync?.[n];if(!l||l.band==="none")return s;let m=i??e,d=[...sr,...jo].find(Re=>Re.key===m),y=d&&"extraParams"in d?d.extraParams?.find(Re=>Re&&typeof Re=="object"&&"key"in Re&&Re.key===n):void 0,D=y&&typeof y=="object"&&"min"in y?y.min:o,B=y&&typeof y=="object"&&"max"in y?y.max:o,O=Nn(t,n,{staticValue:s,paramMin:D,paramMax:B,fxKey:e}),K=So(e,O.source,r,n,t),X=aa(O),pe=ia(K,O.mapMin,O.mapMax,X);return y&&typeof y=="object"&&"min"in y&&"max"in y&&(pe=Rm(pe,y.min,y.max)),pe}var Xn={clampMin:0,clampMax:1},mc=512;var zg={clampMin:4,clampMax:mc,paramMin:4,paramMax:mc,whenDisabled:mc};function SC(){if(typeof document<"u"){let e=document.getElementById("hydra-canvas");if(e instanceof HTMLCanvasElement)return Math.max(e.width,e.height,1)}return 4096}function Vg(e){let t=Math.round(e);return t>=mc?SC():t}var $g=250,qg=1200;u();function dc(e,t){return Array.from({length:t},(n,o)=>`${e}:${o+1}`)}function Fs(e,t,n){if(!n.startsWith(`${e}:`))return!1;let o=Number(n.slice(e.length+1));return Number.isInteger(o)&&o>=1&&o<=t}var wC=dc("lfo",8),TC=dc("eg",8),CC=dc("am",4),MC=dc("step",8);var Hs=[-16,-8,-4,-2,-1,0,1,2,4,8,16];function Ea(e){return Fs("lfo",8,e)}function Si(e){return Fs("eg",8,e)}function Es(e){return Fs("am",4,e)}function Ps(e){return Fs("step",8,e)}function vi(e){return Ea(e)||Si(e)||Es(e)||Ps(e)}function pc(e){if(!vi(e))return null;let t=parseInt(e.slice(e.indexOf(":")+1),10);return Number.isFinite(t)?t:null}function Fg(e){let t=pc(e);return t==null?"MOD":Ea(e)?`L${t}`:Si(e)?`E${t}`:Es(e)?`A${t}`:Ps(e)?`S${t}`:"MOD"}var jg=[{enabled:!0,waveform:"sin",rate:.5},{enabled:!0,waveform:"tri",rate:1},{enabled:!0,waveform:"saw",rate:4},{enabled:!0,waveform:"square",rate:16},{enabled:!0,waveform:"sampleHold",rate:16},{enabled:!0,waveform:"filteredSampleHold",rate:4},{enabled:!0,waveform:"doubleSaw",rate:8},{enabled:!0,waveform:"randomSine",rate:.25}];var Xg=[{enabled:!0,attack:0,hold:0,oneshotRelease:0,oneshotDecay:15,triggerEaseOutShape:"smooth"},{enabled:!0,attack:5,hold:0,oneshotRelease:8,oneshotDecay:40,triggerEaseOutShape:"smooth"},{enabled:!0,attack:0,hold:.05,oneshotRelease:0,oneshotDecay:25,triggerEaseOutShape:"cubic"},{enabled:!0,attack:2,hold:0,oneshotRelease:25,oneshotDecay:80,triggerEaseOutShape:"smooth"},{enabled:!1,attack:0,hold:0,oneshotRelease:4,oneshotDecay:20,triggerEaseOutShape:"expo"},{enabled:!1,attack:12,hold:2,oneshotRelease:20,oneshotDecay:60,triggerEaseOutShape:"cosine"},{enabled:!1,attack:0,hold:.02,oneshotRelease:.5,oneshotDecay:8,triggerEaseOutShape:"linear"},{enabled:!1,attack:8,hold:4,oneshotRelease:16,oneshotDecay:50,triggerEaseOutShape:"quad"}];var Yg=[{enabled:!0,values:[0,.25,.5,.75,1],playMode:"loop",beatsPerStep:2},{enabled:!0,values:[0,1],playMode:"loop",beatsPerStep:1},{enabled:!1,values:[...Hs],playMode:"loop",beatsPerStep:4},{enabled:!1,values:[0,.5,1],playMode:"pingpong",beatsPerStep:2},{enabled:!1,values:[0,0,0,1],playMode:"loop",beatsPerStep:1},{enabled:!1,values:[0,.33,.67,1],playMode:"loop",beatsPerStep:4},{enabled:!1,values:[0,.125,.25,.375,.5,.625,.75,.875,1],playMode:"loop",beatsPerStep:1},{enabled:!1,values:[0,1],playMode:"loop",beatsPerStep:8}];function kC(e){let t=jg[e]??jg[0];return{enabled:t.enabled,waveform:t.waveform,rate:t.rate,phase:0,offset:0,oneShot:!1}}function RC(e){let t=Xg[e]??Xg[0];return{enabled:t.enabled,attack:t.attack,hold:t.hold,oneshotRelease:t.oneshotRelease,oneshotDecay:t.oneshotDecay,triggerEaseOutShape:t.triggerEaseOutShape}}function AC(e){return{enabled:!1,mode:e===0?"gate":e===3?"range":"spectrum",band:e===0?"master":e===1?"low":e===2?"mid":"high",freqMinHz:$g,freqMaxHz:qg,threshold:.12,gain:1.5,attack:.01,release:e===3?.08:.18}}function fc(e){if(!Array.isArray(e))return[...Hs];let t=e.map(n=>typeof n=="number"&&Number.isFinite(n)?n:null).filter(n=>n!=null);return t.length>0?t:[...Hs]}function Kg(e){let t=Yg[e]??Yg[0],n=[...t.values];return{enabled:t.enabled,values:n,playMode:t.playMode,beatsPerStep:t.beatsPerStep,startIndex:0,endIndex:n.length-1}}function EC(e,t){return e.length===t.length&&e.every((n,o)=>n===t[o])}function PC(e){return!(!Array.isArray(e.values)||!EC(e.values,Hs)||(e.playMode??"loop")!=="loop"||(e.beatsPerStep??4)!==4||typeof e.startIndex=="number"&&e.startIndex!==0||typeof e.endIndex=="number"&&e.endIndex!==Hs.length-1)}function Hm(e,t,n){let o=Math.max(0,e-1),r=Math.max(0,Math.min(o,Math.round(t))),i=Math.max(0,Math.min(o,Math.round(n)));if(r>i){let s=r;r=i,i=s}return{startIndex:r,endIndex:i}}function FC(e,t=0){let n=Kg(t);if(!e)return n;if(PC(e))return{...n,enabled:typeof e.enabled=="boolean"?e.enabled:n.enabled};let o=e.playMode==="pingpong"||e.playMode==="loop"?e.playMode:n.playMode,r=typeof e.beatsPerStep=="number"?e.beatsPerStep:n.beatsPerStep,i=Math.max(1,Math.min(32,Math.round(r)||n.beatsPerStep)),s=fc(e.values??n.values),l=typeof e.startIndex=="number"?e.startIndex:n.startIndex,m=typeof e.endIndex=="number"?e.endIndex:s.length-1,{startIndex:d,endIndex:y}=Hm(s.length,l,m);return{enabled:typeof e.enabled=="boolean"?e.enabled:n.enabled,values:s,playMode:o,beatsPerStep:i,startIndex:d,endIndex:y}}function OC(e){let t=fc(e.values),{startIndex:n,endIndex:o}=Hm(t.length,e.startIndex,e.endIndex);return t.slice(n,o+1)}function Im(){return{lfos:Array.from({length:8},(e,t)=>kC(t)),egs:Array.from({length:8},(e,t)=>RC(t)),ams:Array.from({length:4},(e,t)=>AC(t)),steppers:Array.from({length:8},(e,t)=>Kg(t))}}function wi(e){let t=Im();return e?{lfos:t.lfos.map((n,o)=>({...n,...e.lfos?.[o]??{}})),egs:t.egs.map((n,o)=>ac({...n,...e.egs?.[o]??{}})),ams:t.ams.map((n,o)=>({...n,...e.ams?.[o]??{}})),steppers:t.steppers.map((n,o)=>FC({...n,...e.steppers?.[o]??{}},o))}:t}function Os(e){let t=Math.sin(e*127.1+311.7)*43758.5453;return t-=Math.floor(t),t}function HC(e,t,n){switch(e){case"sin":return Math.sin(t*Math.PI*2);case"square":return t<.5?1:-1;case"saw":return t*2-1;case"tri":return 1-4*Math.abs(t-.5);case"doubleSaw":return t<.5?t*4-1:1-(t-.5)*4;case"sampleHold":return Os(Math.floor(n))*2-1;case"filteredSampleHold":{let o=Os(Math.floor(n))*2-1,r=Os(Math.floor(n)+1)*2-1;return o+(r-o)*t}case"randomSine":{let o=Os(Math.floor(n))*2-1,r=Os(Math.floor(n)+1)*2-1,i=(1-Math.cos(t*Math.PI))*.5;return o+(r-o)*i}default:return 0}}function Qg(e){return e<0?0:e>1?1:e}function IC(e,t,n=0,o=0){let r=HC(e,t,n);return Qg(r*.5+.5+o*.5)}function Is(){let e=ie();return typeof e.studioPlaybackMasterSec=="number"?e.studioPlaybackMasterSec:typeof e.studioFrozenTimeSec=="number"?e.studioFrozenTimeSec:typeof e.time=="number"?e.time:performance.now()/1e3}function Bs(){let e=ie().hydraBpm;return typeof e=="number"&&e>0?e:120}function BC(e,t=Is(),n=Bs()){let o=Math.max(.01,e.rate),r=60/n,s=t/r*o/16+e.phase,l=Math.floor(s),m=s-l;return e.oneShot&&s>=1&&(m=1),{cycle:l,phase:m,totalCycles:s}}function DC(e,t=Is(),n=Bs()){if(!e.enabled)return 0;let{cycle:o,phase:r}=BC(e,t,n);return IC(e.waveform,r,o,e.offset)}function NC(e,t,n){let o=Math.max(1,Math.floor(t));if(o===1)return 0;let r=Math.max(0,Math.floor(e));if(n==="loop")return r%o;let i=2*(o-1),s=r%i;return s<o?s:i-s}function WC(e,t=Is(),n=Bs()){let o=fc(e.values),{startIndex:r,endIndex:i}=Hm(o.length,e.startIndex,e.endIndex),s=i-r+1,l=Math.max(1,Math.min(32,Math.round(e.beatsPerStep)||1)),m=60/Math.max(1,n),d=Math.max(0,t/m),y=Math.floor(d/l),D=NC(y,s,e.playMode);return r+D}function GC(e,t=Is(),n=Bs()){let o=fc(e.values),r=WC(e,t,n);return o[r]??0}function UC(e,t=Is(),n=Bs()){if(!e.enabled)return 0;let o=OC(e),r=GC(e,t,n),i=o[0],s=o[0];for(let l=1;l<o.length;l++){let m=o[l];m<i&&(i=m),m>s&&(s=m)}return s<=i?.5:Qg((r-i)/(s-i))}function Am(e){let t=pc(e);if(t==null)return 0;let n=ie().hydraModulation;if(Ea(e)){let o=n?.lfo?.[t];if(typeof o=="number")return o;let r=n?.config?.lfos?.[t-1];return r?DC(r):0}if(Si(e))return n?.eg?.[t]??0;if(Es(e))return n?.am?.[t]??0;if(Ps(e)){let o=n?.step?.[t];if(typeof o=="number")return o;let r=n?.config?.steppers?.[t-1];return r?UC(r):0}return 0}var zC=[{id:"tracker-default-a",name:"Pattern 1",beatsPerStep:4,steps:[null,null,null,null,null,null,null,null]}];function VC(){return{videoRatings:{},videoLoopTagOverrides:{},sceneTrackers:zC.map(e=>({...e,steps:[...e.steps]})),fxPresets:[],scenes:[],studioSceneProgression:void 0,activeFxList:[...Hh],fx:Ih(),activePresetId:null,activeSceneId:null,inputGain:1,inputMultiplier:1,lowSensitivity:1.18,midSensitivity:.9,highSensitivity:1.02,lowCrossoverHz:150,highCrossoverHz:3400,lowGate:0,midGate:0,highGate:0,audioAdaptiveNormalization:!0,audioKickOnsetDetection:!0,audioKickOnsetSensitivity:1.4,audioFftSmoothing:.15,audioSnareDetection:!0,audioSnareSensitivity:1.6,audioHatDetection:!0,audioHatSensitivity:1.9,audioBassDetection:!0,audioBassSensitivity:1.45,audioVocalsDetection:!0,audioVocalsSensitivity:1.5,audioRhythmDetection:!0,audioBpmAutoSync:!1,audioDensityFastMs:140,audioDensitySlowMs:1400,bpm:128,modulation:Im(),masterLevelFloorDb:-55,masterLevelCeilDb:-10,targetFps:60,renderResolution:"viewport",perfTier:"auto",uiState:{isAudioExpanded:!0,isVideoExpanded:!0,isParamsExpanded:!0,videoLibrarySort:"library",presetPadIndex:0,outputMuted:!1},launchControlMidi:Sm(nc()),launchpadMiniMidi:wm(oc()),launchkeyMidi:Tm(rc()),fxMidiParamBindings:[],exportSettings:{...Gp},outputMapping:{...Ss,points:Ss.points.map(e=>({dest:{...e.dest},src:{...e.src}})),mask:Ss.mask.map(e=>({...e})),maskPolys:Ss.maskPolys.map(e=>({op:e.op,points:e.points.map(t=>({...t}))}))},outputMapTemplates:[],entitlements:{...Cm,engagement:{...Cm.engagement}}}}var Bm=null;function Dm(){return Bm||(Bm=VC()),Bm}var ag=new Proxy({},{get(e,t,n){return Object.prototype.hasOwnProperty.call(e,t)?Reflect.get(e,t,n):Reflect.get(Dm(),t)},set(e,t){throw new TypeError(`DEFAULT_GLOBAL_SETTINGS is read-only (attempted to set ${String(t)})`)},ownKeys(){return Reflect.ownKeys(Dm())},getOwnPropertyDescriptor(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return Object.getOwnPropertyDescriptor(e,t);let n=Object.getOwnPropertyDescriptor(Dm(),t);return n&&(n.configurable=!0),n}});u();u();u();var Zg=2,Jg=124,eb="Piment br\xE9silien";u();var tb="/audio/Recordings/Montreuil26_master/studio",nb={id:"montreuil26",label:"Montreuil26",setName:"Montreuil26",manifestUrl:`${tb}/bundle-manifest.json`,baseUrl:tb,stemsRemotePublished:!1,stemsBaseUrl:"/audio/Recordings/Montreuil26_master/tracks_bandcamp/stems",autoLoadInStudio:!1,demoTrackNumber:2};var $C=[{track:Zg,title:eb,bpm:Jg}];function qC(e){return`montreuil26-track-${String(e).padStart(2,"0")}`}function jC(){let e={};for(let t of $C)e[t.track]=qC(t.track);return e}var QH={bundleKey:nb.setName,mode:"tracks",trackMap:jC(),patternId:null};u();u();u();u();u();u();var p6=Ms.filter(e=>e.marketplace!==!1),XC=Ms;var m6=new Map(XC.map(e=>[e.slug,e]));u();u();u();u();u();var QC=["electricNoise","fillLayer","fractalFold","noise","patternLayer","plasma","plexus","shapeLayer","superformula","topoContour","universeWithin"];function hc(e){return QC.includes(e)}var ZC=0,ob=1,_c=2,Ti=3;function Nm(e){return Math.max(ZC,Math.min(Ti,Math.round(e)))}var JC=Ch,eM={maskReveal:"Reveal (0=Below, 1=Black)",maskReach:"Reach (0=All, 1=Prev, 2=2, 3=3, 4=4, 5=5, 6=6)",maskThreshold:"Threshold",maskSoftness:"Softness",maskInvert:"Invert (0=Off, 1=On)"},tM=[{key:"maskReveal",label:"Mask reveal (0=Below, 1=Black)",min:0,max:1,step:1,default:0},{key:"maskReach",label:"Mask reach (0=All, 1=Prev, 2=2, 3=3, 4=4, 5=5, 6=6)",min:0,max:6,step:1,default:0},{key:"maskThreshold",label:"Mask threshold",min:0,max:1,step:.01,default:.35},{key:"maskSoftness",label:"Mask softness",min:.01,max:.5,step:.01,default:.12},{key:"maskInvert",label:"Invert (0=Off, 1=On)",min:0,max:1,step:1,default:0}],nM=tM.map(e=>{let t=eM[e.key];return t?{...e,label:t}:e}),F6=[{key:"mode",label:JC,min:0,max:hp,step:1,default:0},...nM],O6=z.amount;function oM(e){return(e??[]).filter(t=>!Sr(t)&&!Dl(t)).map(t=>({kind:"fx",key:t}))}function Wm(e){return e?.length?e.filter(t=>t.kind==="fx").map(t=>t.key):[]}function rb(e){return e.activeChain?.length?e.activeChain:oM(e.activeFxList)}function gc(e){return rb(e).filter(t=>t.kind==="fx"?!0:e.fxGroups?.[t.id]?.enabled!==!1)}function ab(e,t){let n=new Set(Wm(e).map(String)),o=[...e];for(let r of t)n.has(String(r))||Dl(String(r))&&(o.push({kind:"fx",key:r}),n.add(String(r)));return o}function Pa(e,t){return`layer:${e}:${t}`}function bc(e){if(!e.startsWith("layer:"))return null;let t=e.slice(6),n=t.indexOf(":");return n<=0?null:{groupId:t.slice(0,n),layerId:t.slice(n+1)}}u();u();u();u();u();var Ci=.5,ib=.05,aM=1;var iM=.38,sM="cosine",lM=.68;function cM(e){return Number.isFinite(e)?Math.max(ib,Math.min(aM,e)):Ci}function Gm(e){let t=cM(e),n=t*iM,o=Math.max(ib,t-n);return{attack:0,hold:n,release:o,decay:20,easeShape:sM}}function sb(e){let t=e<0?0:e>1?1:e;return t<=0?0:t>=1?1:Math.pow(t,lM)}function lb(e){let t=Gm(e);return ui(0,t.attack,t.hold,t.release,t.decay)}u();var Mi=.5,cb=.05,uM=1,Li=.65,pM=.38,mM="cosine",dM=.68,fM=.92,hM=.34,_M=2.15,gM=2.4,bM=4.2,yM=3.6;function xM(e){return Number.isFinite(e)?Math.max(cb,Math.min(uM,e)):Mi}function zm(e){let t=xM(e),n=t*pM,o=Math.max(cb,t-n);return{attack:0,hold:n,release:o,decay:20,easeShape:mM}}function ub(e){let t=e<0?0:e>1?1:e;return t<=0?0:t>=1?1:Math.pow(t,dM)}function pb(e){let t=zm(e);return ui(0,t.attack,t.hold,t.release,t.decay)}function vM(e){return Number.isFinite(e)?e<0?0:e>1?1:e:Li}function SM(e){let t=e<0?0:e>1?1:e;return t<=0?0:t>=1?1:1-Math.pow(1-t,_M)}function wM(e,t){let n=vM(t);return e<1e-5||n<1e-5?0:SM(e)*n*fM}function Um(e,t,n,o){let r=wM(t,n);if(r>e){let i=e;i<1e-5&&r>1e-5&&(i=r*hM);let s=r>1e-5?i/r:1,l=1+gM*(1-s),m=o*bM*Math.max(.25,r)*l;return Math.min(r,i+m)}return r<=1e-5?Math.max(0,e-o*yM):e+(r-e)*Math.min(1,o*8)}function TM(e){if(!e?.enabled)return 0;let t=ie(),n=Nn(e,"base",{staticValue:e.base??1,paramMin:0,paramMax:1,fxKey:"slowmo"});if(jn(n)){let o=t.hydraEnvelopes?.slowmo??0,r=t.slowmoPulseUntilMs;return typeof r=="number"&&performance.now()<r&&(o=Math.max(o,1)),o<0?0:o>1?1:o}return n.source==="none",0}function mb(e){let t=ie(),n=t.hydraSettings?.fx?.slowmo,o=t.slowmoTrailMix??0;if(!n?.enabled){t.slowmoTrailMix=Um(o,0,0,e);return}let r=typeof n.params?.motionBlur=="number"?n.params.motionBlur:Li;if(r<=1e-5){t.slowmoTrailMix=Um(o,0,0,e);return}let i=TM(n);t.slowmoTrailMix=Um(o,i,r,e)}function CM(e,t){return typeof t?.params?.duration=="number"?t.params.duration:e==="accelerate"?Ci:Mi}function MM(e){let t=Zr[e];return t?.syncBand&&t.syncBand!=="none"?t.syncBand:"kick"}function Ds(e,t){if(!t||!ci(e)||!t.enabled)return t;let n=Zr[e],o=t.syncBand==="none"?"none":t.syncBand??MM(e),r={...t,syncBand:o};if(o!=="none"&&(r.isTrigger=!0,r.syncMultiplier=0),ms(e)){t.envelopeRef===null&&delete r.envelopeRef,delete r.mapMin,delete r.mapMax,(typeof r.base!="number"||r.base<=0)&&(r.base=typeof n?.base=="number"?n.base:1);let i={...r.params??{}};typeof i.duration!="number"&&(i.duration=CM(e,n)),e==="slowmo"&&typeof i.motionBlur!="number"&&(i.motionBlur=typeof n?.params?.motionBlur=="number"?n.params.motionBlur:Li),r.params=i}else r.envelopeRef===void 0&&(r.envelopeRef=null);return r}function db(e){if(!(!e||typeof e!="object"))for(let t of Object.keys(e)){if(!ci(t))continue;let n=e[t],o=Ds(t,n);o&&o!==n&&(e[t]=o)}}var yc=sr.find(e=>e.key==="videoSpeed"),sa=.1;function hb(e,t,n){return n||e<sa?e:t+(e-t)*.1}function LM(e){let t=e?.videoSpeed;if(!t?.enabled||t.syncBand==="none")return!1;let n=Nn(t,"base",{staticValue:t.base??1.25,paramMin:yc.min,paramMax:yc.max,fxKey:"videoSpeed"});return jn(n)}function _b(e){if(LM(e))return!0;for(let t of["slowmo","accelerate"]){let n=e?.[t];if(!n?.enabled||n.syncBand==="none")continue;let o=Nn(n,"base",{staticValue:n.base??1,paramMin:0,paramMax:1,fxKey:t});if(jn(o))return!0}return!1}function fb(e){return e<0?0:e>1?1:e}function gb(e,t,n,o,r,i){let s=Ds(e,t);if(!s?.enabled)return 0;let l=Nn(s,"base",{staticValue:s.base??1,paramMin:0,paramMax:1,fxKey:e});if(l.source==="none")return fb(_n(e,s,n,Xn));let m;if(jn(l)){let B=typeof window<"u"?ie():void 0;m=B?.hydraEnvelopes?.[r]??0;let O=B?.[i];typeof O=="number"&&performance.now()<O&&(m=Math.max(m,1))}else m=o(e,l.source,n);let d=l.mapMax>l.mapMin?l.mapMax:1,y=l.mapMax>l.mapMin?l.mapMin:0,D=aa(l);return fb(ia(m,y,d,D))}function kM(e,t,n){return gb("slowmo",e,t,n,"slowmo","slowmoPulseUntilMs")}function RM(e,t,n){return gb("accelerate",e,t,n,"accelerate","acceleratePulseUntilMs")}function bb(e,t,n,o,r){let i=1,s=e?.videoSpeed;if(s?.enabled){let d=s.base!==void 0?s.base:1.25,y=Nn(s,"base",{staticValue:d,paramMin:yc.min,paramMax:yc.max,fxKey:"videoSpeed"});if(y.source==="none")i=Math.max(0,d);else{let D=n("videoSpeed",y.source,t),B=aa(y);i=Math.max(0,ia(D,y.mapMin,y.mapMax,B))}}let l=kM(e?.slowmo,t,n);if(l>0){let d=Math.max(.02,Math.min(1,o("slowmo","minSpeed",.2))),y=ub(l);i*=1-y+y*d}let m=RM(e?.accelerate,t,n);if(m>0){let d=Math.max(1.1,Math.min(6,o("accelerate","maxSpeed",2.5))),y=sb(m);i*=1-y+y*d}return Number.isFinite(r)&&r>0&&(i=Math.min(i,um(r))),i}function Vm(e,t){for(let n of e)if(n instanceof HTMLVideoElement){if(t<sa){n.pause();continue}n.playbackRate=t}}function AM(e){let t=ie().hydraSettings?.fx?.videoSpeed;if(!t||t.enabled===!1)return;let n=t.base!==void 0?t.base:1.25,o=Math.max(0,n),r=e.duration;Number.isFinite(r)&&r>0&&(o=Math.min(o,um(r))),Vm([e],o)}function yb(e){let t=ie().__hydraVideoSpeedSync;if(typeof t=="function"){t(e);return}AM(e)}function xb(){let e=ie();return e.studioTransportActive===!0?!0:e.hydraSettings?.isVideoPlaying!==!1}u();var vc=["neonGrid","textLayer","throughTheStars","lumaDust","lumaLock","oscilloscope"],$m=4;function PM(e){return $m+vc.indexOf(e)}function wb(){return $m+vc.length}function co(e){let t=PM(e);if(!(t<$m))return ie()[`s${t}`]}function xc(e){return vc.includes(e)}function FM(e,t){let n=gc(e),o=e.fx;for(let r of n){if(r.kind==="fx"){let s=String(r.key),l=o?.[s];xc(s)&&l?.enabled&&t({key:s,config:l,effectKey:s});continue}let i=e.fxGroups?.[r.id];if(i?.enabled)for(let s of i.layerIds){let l=e.layerInstances?.[s];if(!l?.config.enabled)continue;let m=String(l.templateKey);xc(m)&&t({key:m,config:l.config,effectKey:Pa(r.id,s)})}}}function ko(e,t){let n=null;return FM(e,o=>{o.key===t&&(n=o)}),n}function Tb(e,t){if(xc(e))return e;let n=bc(e);if(!n)return null;let o=t.layerInstances?.[n.layerId]?.templateKey;return!o||!xc(o)?null:o}function ho(e,t,n,o){e?.init&&e.src!==t&&(e.init({src:t,dynamic:!1}),o.owner=n,o.canvas=t)}function Fa(e,t,n){let o=co(e);return ho(o,t,e,n),o}function Cb(){return{owner:null,canvas:null}}u();var OM=6;function Mb(e){return e.transforms?.length??0}function Wn(e){let t=e,n=Object.create(Object.getPrototypeOf(e));return n.transforms=t.transforms?.slice()??[],n.defaultOutput=t.defaultOutput,n.synth=t.synth,n.type=t.type,n.defaultUniforms=t.defaultUniforms,n}function Oa(e,t){let n=t[t.length-1];(!n||Mb(e)>Mb(n))&&t.push(Wn(e))}function HM(e,t){return t<=0?e[0]:e[Math.max(0,e.length-t)]}function IM(e,t){return t?vo(e):Math.round(e)}function Oo(e){return e.layerSourceStack&&e.layerSourceStack.push(e.layerSrc),Sc(e)}function Sc(e){let{chain:t,layerSrc:n,mode:o,getAmount:r,solid:i,clampMode:s=!0,layerWithoutLuma:l=!1,chainStack:m,getMaskReveal:d,getMaskReach:y,getMaskThreshold:D,getMaskSoftness:B,getMaskInvert:O}=e,K=IM(o,s);if(K===fp&&m){let X=Math.max(0,Math.min(OM,Math.round(y?.()??0))),pe=(d?.()??0)<1,Re=O??(()=>0),ge=D??(()=>.35),Fe=B??(()=>.12);if(pe){let Qe=HM(m,X),Ze=Wn(Qe);return t.layer(Ze.layerMaskAlpha(n,r,Re,ge,Fe))}return t.layerMaskCut(n,r,Re,ge,Fe)}if(K===0)return t.blend(n,r);if(K===1)return t.diff(n.mult(i(r,r,r)));if(K===2)return t.add(n,r);if(K===3)return t.mult(n,r);if(K===4){if(l)return t.layer(n);let X=e.getLayerLuma??r;return t.layer(n.luma(X))}return K===5?t.layerOverlay(n,r):t}function qm(e){return Sc({...e,mode:Mh(e.mode),clampMode:!1})}u();u();function Lb(e,t){e.push(t)}function Rb(e,t,n){return t.bufferStartGroupId&&t.bufferStartGroupId!==e?t.bufferStartGroupId:Object.keys(n.fxGroups).find(o=>o!==e)??null}function wc(e){return Nm(e.bufferStart??0)}function BM(e,t,n){let o=wc(t);if(o===ob)return n.getClipSource();if(o===_c){let r=Rb(e,t,n);return r&&n.groupBufferCache[r]?Wn(n.groupBufferCache[r]):n.solid(0,0,0)}return n.solid(0,0,0)}function Ab(e,t){for(let n of e.layerIds){let o=t[n];if(o?.templateKey==="feedback"&&o.config.enabled)return{...o.config,enabled:!0}}return null}function DM(e,t){return e.layerIds.some(n=>{let o=t[n];return!!o?.config.enabled&&o.templateKey!=="feedback"})}function Eb(e,t,n,o){let r=vo(n.internalMode??2),i=[],s=[],l=e;Oa(l,i);for(let m of n.layerIds){let d=o.layerInstances[m];if(!d?.config.enabled)continue;let y=String(d.templateKey);if(y!=="feedback"){if(hc(y)){let D=Pa(t,m),B=o.buildLayer(d,D);if(!B)continue;Lb(s,B),l=Sc({chain:l,layerSrc:B,mode:r,getAmount:()=>1,solid:o.solid,layerWithoutLuma:r===4,layerSourceStack:s}),Oa(l,i);continue}l=o.applyOperator(l,y,()=>({...d.config,enabled:!0}),{chainStack:i,layerSourceStack:s},Pa(t,m)),Oa(l,i)}}return l}function jm(e,t){let n=t.fxGroups[e];if(!n?.enabled||wc(n)===Ti)return null;let o=Eb(BM(e,n,t),e,n,t),r=Wn(o);return t.groupBufferCache[e]=r,r}function Pb(e,t){let n=new Set(e.filter(r=>t.fxGroups[r]?.enabled!==!1&&t.fxGroups[r])),o=n.size+2;for(;n.size>0&&o-- >0;){let r=!1;for(let i of n){let s=t.fxGroups[i],l=wc(s);if(l===Ti){n.delete(i),r=!0;continue}if(l===_c){let m=Rb(i,s,t);if(m&&n.has(m)&&!t.groupBufferCache[m])continue}jm(i,t),n.delete(i),r=!0}if(!r){for(let i of n)jm(i,t),n.delete(i);break}}}function kb(e,t,n,o){let r=Ab(n,o.layerInstances);if(!(!!r&&!!o.hasGroupFeedbackOut?.(t)&&!!o.applyGroupFeedback&&!!o.commitGroupFeedbackLoop)||!r)return{chain:e,applied:!1};let s=o.applyGroupFeedback(e,t,r);return o.commitGroupFeedbackLoop(t,s),{chain:s,applied:!0}}function Fb(e,t,n){let o=n.fxGroups[t];if(!o?.enabled)return{chain:e,solo:!1};if(wc(o)===Ti){let y=Eb(Wn(e),t,o,n);return n.groupBufferCache[t]=Wn(y),y=kb(y,t,o,n).chain,o.solo?{chain:y,solo:!0}:{chain:y,solo:!1}}let i=Ab(o,n.layerInstances),s=!!i&&!!n.hasGroupFeedbackOut?.(t)&&!!n.applyGroupFeedback&&!!n.commitGroupFeedbackLoop,l=n.groupBufferCache[t]??jm(t,n)??n.solid(0,0,0),m=DM(o,n.layerInstances),d=e;if(o.solo&&!s)return{chain:Wn(l),solo:!0};if(m){let y=Number(o.composite.params?.mode??0);d=qm({chain:d,layerSrc:Wn(l),mode:y,getAmount:n.getGroupAmount(t),solid:n.solid,...n.maskCompositeOpts(t)})}else if(!s){let y=Number(o.composite.params?.mode??0);d=qm({chain:d,layerSrc:Wn(l),mode:y,getAmount:n.getGroupAmount(t),solid:n.solid,...n.maskCompositeOpts(t)})}return s&&i?(d=kb(d,t,o,n).chain,o.solo?{chain:d,solo:!0}:{chain:d,solo:!1}):o.solo?{chain:Wn(l),solo:!0}:{chain:d,solo:!1}}u();var NM=null,WM=null;function Ob(){return NM}function Hb(e){WM=e}function Ib(e){if(!e.previewGroupId||!e.buffer)return null;if(e.feedbackOut){let t=e.outputs.indexOf(e.feedbackOut);if(t>0)return{out:e.feedbackOut,index:t}}for(let t of[3,2,1]){if(e.busyIndices.has(t))continue;let n=e.outputs[t];if(n)return{out:n,index:t}}return null}u();u();var Bb=[.042,.052,.062,.075],Db=.06,GM=.0665;function ki(e){return e?.enabled?Math.round(Number(e.params?.type??1))===4:!1}function Nb(e){return ki(e?.patternLayer)}function Ns(e){let t=Math.max(.25,e);return Math.round(Math.max(96,Math.min(960,300*Math.pow(t,.79))))}function Wb(e,t,n,o,r=2,i=.18,s=.35){let l=Math.max(0,Math.min(3,Math.round(e))),m=Math.max(0,Math.min(1,s));return{look:l,feed:Bb[l]??Bb[1],kill:Db+(GM-Db)*m,cells:Ns(t),speed:Math.max(0,Math.min(2,n)),styleMap:Math.max(0,Math.min(1,o)),symmetry:Math.max(0,Math.min(3,Math.round(r))),seedSize:Math.max(.08,Math.min(.55,i)),gap:m}}u();var Tc=`
  vec2 pres = resolution.xy;
  vec2 pp = (gl_FragCoord.xy + gl_FragCoord.xy - pres) / max(1.0, pres.y);
  float pzoom = max(0.25, scale);
  float ptime = time * max(0.0, speed);
  float pwarp = clamp(warp, 0.0, 1.0);
  pp *= pzoom;
  if (pwarp > 0.001) {
    pp += pwarp * 0.45 * vec2(
      sin(pp.y * 3.1 + ptime * 0.7),
      cos(pp.x * 2.7 - ptime * 0.6)
    );
  }
  float look = floor(clamp(variant, 0.0, 3.0) + 0.5);
`,Ws=`
  float tint = clamp(pat, 0.0, 1.0);
  return vec4(mix(vec3(ar, ag, ab), vec3(br, bg, bb), tint), 1.0);
`,Gb=`${Tc}
  float pat = 0.0;
  float amp = 0.55;
  vec2 q = pp * 1.5;
  for (int i = 0; i < 5; i++) {
    vec2 cell = floor(q);
    vec2 frc = fract(q);
    frc = frc * frc * (3.0 - 2.0 * frc);
    float n00 = fract(sin(dot(cell, vec2(127.1, 311.7))) * 43758.5453);
    float n10 = fract(sin(dot(cell + vec2(1.0, 0.0), vec2(127.1, 311.7))) * 43758.5453);
    float n01 = fract(sin(dot(cell + vec2(0.0, 1.0), vec2(127.1, 311.7))) * 43758.5453);
    float n11 = fract(sin(dot(cell + vec2(1.0, 1.0), vec2(127.1, 311.7))) * 43758.5453);
    pat += amp * mix(mix(n00, n10, frc.x), mix(n01, n11, frc.x), frc.y);
    amp *= 0.5;
    q = q * 2.07 + vec2(ptime * 0.13, ptime * -0.09);
  }
  pat = clamp(pat * 1.1, 0.0, 1.0);
  if (look > 2.5) {
    pat = 0.5 + 0.5 * sin((pp.x + pat * 3.2) * 4.0 - ptime * 0.5);
  } else if (look > 1.5) {
    pat = abs(fract((length(pp) * 1.2 + pat * 1.1) * 3.0) * 2.0 - 1.0);
  } else if (look > 0.5) {
    pat = smoothstep(0.56, 0.64, pat);
  } else {
    pat = smoothstep(0.25, 0.85, pat);
  }
${Ws}`,Ub=`${Tc}
  vec2 q = pp * 3.0;
  vec2 cell = floor(q);
  vec2 frc = fract(q);
  float d1 = 8.0;
  float d2 = 8.0;
  vec2 nearest = cell;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 off = vec2(float(x), float(y));
      vec2 seed = cell + off;
      vec2 jitter = vec2(
        fract(sin(dot(seed, vec2(127.1, 311.7))) * 43758.5453),
        fract(sin(dot(seed, vec2(269.5, 183.3))) * 43758.5453)
      );
      vec2 site = off + 0.5 + 0.42 * sin(ptime + 6.2831 * jitter);
      float d = length(site - frc);
      if (d < d1) {
        d2 = d1;
        d1 = d;
        nearest = seed;
      } else if (d < d2) {
        d2 = d;
      }
    }
  }
  float pat = 1.0 - smoothstep(0.05, 0.85, d1);
  if (look > 2.5) {
    pat = clamp(d1 * 1.35, 0.0, 1.0);
  } else if (look > 1.5) {
    pat = 1.0 - smoothstep(0.02, 0.14, d2 - d1);
  } else if (look > 0.5) {
    pat = fract(sin(dot(nearest, vec2(41.3, 289.1))) * 21756.31);
  }
${Ws}`,zb=`${Tc}
  vec2 q = pp * 3.0 + vec2(ptime * 0.25, ptime * 0.15);
  vec2 cell = floor(q);
  vec2 frc = fract(q);
  float parity = mod(cell.x + cell.y, 2.0);
  float pat = parity > 0.5 ? abs(sin(3.14159 * q.x)) : abs(sin(3.14159 * q.y));
  if (look > 2.5) {
    pat = smoothstep(0.35, 0.65, 0.5 + 0.5 * sin(12.566 * (parity > 0.5 ? frc.x : frc.y)));
  } else if (look > 1.5) {
    float flip = fract(sin(dot(cell, vec2(127.1, 311.7))) * 43758.5453);
    vec2 arc = flip > 0.5 ? frc : vec2(1.0 - frc.x, frc.y);
    float d = min(abs(length(arc) - 0.5), abs(length(arc - 1.0) - 0.5));
    pat = 1.0 - smoothstep(0.04, 0.16, d);
  } else if (look > 0.5) {
    pat = parity;
  }
${Ws}`,Vb=`${Tc}
  float rad = length(pp);
  float ang = atan(pp.y, pp.x);
  float pat = (0.5 + 0.5 * sin(ang * 6.0 - ptime)) * (1.0 - smoothstep(0.2, 1.6, rad));
  if (look > 2.5) {
    pat = 0.5 + 0.5 * sin(ang * 3.0 + rad * 9.0 - ptime * 1.6);
  } else if (look > 1.5) {
    pat = 0.5 + 0.5 * sin(rad * 14.0 - ptime * 1.4);
  } else if (look > 0.5) {
    pat = step(0.5, fract(ang * 1.2732 + ptime * 0.1));
  }
${Ws}`,$b=`
  vec2 pres = resolution.xy;
  vec2 pp = (gl_FragCoord.xy + gl_FragCoord.xy - pres) / max(1.0, pres.y);
  float pzoom = max(0.25, scale);
  float ptime = time * max(0.0, speed);
  float pwarp = clamp(warp, 0.0, 1.0);
  pp *= pzoom;
  if (pwarp > 0.001) {
    pp += pwarp * 0.34 * vec2(
      sin(pp.y * 3.1 + ptime * 0.7),
      cos(pp.x * 2.7 - ptime * 0.6)
    );
  }

  float geo = floor(clamp(geometry, 0.0, 10.0) + 0.5);
  float pat = 0.0;

  if (geo < 0.5) {
    // Classic \u2014 broad honeycomb outlines.
    vec2 q = pp * 2.15 + vec2(ptime * 0.06, 0.0);
    vec2 hexSpan = vec2(1.7320508, 1.0);
    vec2 hexA = mod(q, hexSpan) - 0.5 * hexSpan;
    vec2 hexB = mod(q - 0.5 * hexSpan, hexSpan) - 0.5 * hexSpan;
    vec2 hexUv = dot(hexA, hexA) < dot(hexB, hexB) ? hexA : hexB;
    float hexEdge = max(abs(hexUv.y), dot(abs(hexUv), vec2(0.8660254, 0.5)));
    pat = 1.0 - smoothstep(0.025, 0.095, abs(hexEdge - 0.48));
  } else if (geo < 1.5) {
    // Interweave V3 \u2014 nested square paths with alternating gates.
    vec2 q = pp * 1.75 + vec2(ptime * 0.08, -ptime * 0.05);
    vec2 tile = floor(q);
    vec2 uv = fract(q) - 0.5;
    float box = max(abs(uv.x), abs(uv.y));
    float nested = abs(fract(box * 8.0 + mod(tile.x + tile.y, 2.0) * 0.5) - 0.5);
    float rails = min(abs(uv.x), abs(uv.y));
    pat = max(
      1.0 - smoothstep(0.07, 0.18, nested),
      (1.0 - smoothstep(0.025, 0.085, rails)) * step(0.2, box)
    );
  } else if (geo < 2.5) {
    // Tight \u2014 a dense concentric square tunnel.
    vec2 q = pp + 0.025 * vec2(sin(ptime), cos(ptime * 0.8));
    float box = max(abs(q.x), abs(q.y));
    float rings = abs(fract(box * 7.5 - ptime * 0.08) - 0.5);
    pat = 1.0 - smoothstep(0.065, 0.17, rings);
  } else if (geo < 3.5) {
    // Classic low latency \u2014 a leaner, tighter honeycomb.
    vec2 q = pp * 3.15;
    vec2 hexSpan = vec2(1.7320508, 1.0);
    vec2 hexA = mod(q, hexSpan) - 0.5 * hexSpan;
    vec2 hexB = mod(q - 0.5 * hexSpan, hexSpan) - 0.5 * hexSpan;
    vec2 hexUv = dot(hexA, hexA) < dot(hexB, hexB) ? hexA : hexB;
    float hexEdge = max(abs(hexUv.y), dot(abs(hexUv), vec2(0.8660254, 0.5)));
    pat = 1.0 - smoothstep(0.018, 0.075, abs(hexEdge - 0.48));
  } else if (geo < 4.5) {
    // Interweave low latency \u2014 orthogonal links and square knots.
    vec2 uv = fract(pp * 2.6 + 0.5) - 0.5;
    float cross = min(abs(uv.x), abs(uv.y));
    float box = abs(max(abs(uv.x), abs(uv.y)) - 0.29);
    pat = max(
      1.0 - smoothstep(0.025, 0.08, cross),
      1.0 - smoothstep(0.025, 0.075, box)
    );
  } else if (geo < 5.5) {
    // Imprint Smooth \u2014 soft triangular contour islands.
    vec2 q = pp * 3.1;
    float field =
      sin(q.x * 2.1 + ptime * 0.3) +
      sin(dot(q, vec2(0.5, 0.8660254)) * 2.1 - ptime * 0.24) +
      sin(dot(q, vec2(-0.5, 0.8660254)) * 2.1 + ptime * 0.18);
    pat = 1.0 - smoothstep(0.07, 0.23, abs(sin(field * 1.75)));
  } else if (geo < 6.5) {
    // Imprint Crystal \u2014 triangular facets with bright intersections.
    vec2 q = pp * 2.8 + vec2(ptime * 0.04, 0.0);
    float lineA = abs(fract(q.x) - 0.5);
    float lineB = abs(fract(dot(q, vec2(0.5, 0.8660254))) - 0.5);
    float lineC = abs(fract(dot(q, vec2(-0.5, 0.8660254))) - 0.5);
    float crystal = min(lineA, min(lineB, lineC));
    pat = 1.0 - smoothstep(0.025, 0.09, crystal);
  } else if (geo < 7.5) {
    // Enharmonic \u2014 three-axis isometric cube lattice.
    vec2 q = pp * 2.45;
    float isoA = abs(fract(q.y) - 0.5);
    float isoB = abs(fract(dot(q, vec2(0.8660254, 0.5))) - 0.5);
    float isoC = abs(fract(dot(q, vec2(-0.8660254, 0.5))) - 0.5);
    float iso = min(isoA, min(isoB, isoC));
    pat = 1.0 - smoothstep(0.025, 0.085, iso);
  } else if (geo < 8.5) {
    // Interweave V2 \u2014 square spirals repeated as linked tiles.
    vec2 q = pp * 2.0 + vec2(ptime * 0.05, ptime * 0.03);
    vec2 uv = fract(q) - 0.5;
    float box = max(abs(uv.x), abs(uv.y));
    float nested = abs(fract(box * 6.0) - 0.5);
    float join = min(abs(uv.x + uv.y), abs(uv.x - uv.y));
    pat = max(
      1.0 - smoothstep(0.065, 0.17, nested),
      (1.0 - smoothstep(0.025, 0.08, join)) * step(0.3, box)
    );
  } else if (geo < 9.5) {
    // Fusion \u2014 concentric rings fused to a six-lobed field.
    float rad = length(pp);
    float ang = atan(pp.y, pp.x);
    float ring = abs(sin(rad * 12.0 - ptime * 0.65));
    float lobes = abs(cos(ang * 3.0) * 0.34 + rad - 0.62);
    pat = max(
      1.0 - smoothstep(0.02, 0.13, ring),
      1.0 - smoothstep(0.025, 0.1, lobes)
    );
    pat *= 1.0 - smoothstep(1.2, 1.75, rad);
  } else {
    // Sonance \u2014 crossing harmonic wave traces.
    vec2 q = pp * 2.7;
    float waveA = abs(q.y - 0.23 * sin(q.x * 3.4 + ptime));
    float waveB = abs(q.y + 0.23 * sin(q.x * 3.4 - ptime * 0.8));
    float repeats = abs(fract((waveA + waveB) * 3.0) - 0.5);
    pat = max(
      1.0 - smoothstep(0.025, 0.085, min(waveA, waveB)),
      (1.0 - smoothstep(0.06, 0.16, repeats)) * 0.72
    );
  }

${Ws}`,qb=`
  // A cell needs a couple of texels to itself: at one texel apiece, rounding sends
  // some neighbour reads to the wrong cell and the field decouples. This is what
  // bounds Density on a small canvas. Sim and display both see the canvas
  // resolution here, so their grids stay in step.
  float cellsX = clamp(cells, 48.0, min(${960}.0, resolution.x * 0.5));
  vec2 grid = vec2(floor(cellsX), max(8.0, floor(cellsX / aspect)));
`,la=[{type:"sampler2D",name:"stateTex",default:0},{type:"float",name:"variant",default:1},{type:"float",name:"cells",default:140},{type:"float",name:"symmetry",default:2}];function Ha(e,t){return`
  float aspect = resolution.x / max(1.0, resolution.y);
  ${qb}
  // Interpolate on the same folded lattice the sim writes to. Sampling a
  // screen-aligned grid instead straddles the fold and speckles every edge.
  ${zM("uvF","_st","D")}
  vec2 gc = uvF * grid - 0.5;
  vec2 gf = fract(gc);
  gf = gf * gf * (3.0 - 2.0 * gf);
  vec2 g0 = (floor(gc) + 0.5) / grid;
  vec2 gs = 1.0 / grid;
  float b00 = texture2D(stateTex, clamp(g0, 0.0, 1.0)).g;
  float b10 = texture2D(stateTex, clamp(g0 + vec2(gs.x, 0.0), 0.0, 1.0)).g;
  float b01 = texture2D(stateTex, clamp(g0 + vec2(0.0, gs.y), 0.0, 1.0)).g;
  float b11 = texture2D(stateTex, clamp(g0 + gs, 0.0, 1.0)).g;
  float B = mix(mix(b00, b10, gf.x), mix(b01, b11, gf.x), gf.y);
  float look = floor(clamp(variant, 0.0, 3.0) + 0.5);
  float edge = 0.145;
  float soft = 0.055;
  float pat = smoothstep(edge - soft, edge + soft, B);
  if (look < 0.5) {
    pat = smoothstep(edge - soft * 1.4, edge + soft, B);
  } else if (look < 1.5) {
    pat = step(edge, B);
  } else if (look < 2.5) {
    pat = smoothstep(edge - soft * 0.8, edge + soft * 1.2, B);
  } else {
    pat = smoothstep(edge - soft, edge + soft * 1.1, B);
  }
  vec3 col = mix(vec3(${e[0].toFixed(4)}, ${e[1].toFixed(4)}, ${e[2].toFixed(4)}), vec3(${t[0].toFixed(4)}, ${t[1].toFixed(4)}, ${t[2].toFixed(4)}), clamp(pat, 0.0, 1.0));
  return vec4(col, 1.0);
`}var jb=Ha([.012,.012,.024],[.941,.671,.988]);function zM(e,t,n){let o=`symM${n}`,r=`rSym${n}`,i=`aSym${n}`,s=`seg${n}`,l=`fit${n}`;return`
  vec2 ${e} = ${t} - 0.5;
  ${e}.x *= aspect;
  float ${o} = floor(clamp(symmetry, 0.0, 3.0) + 0.5);
  if (${o} > 0.5 && ${o} < 1.5) {
    ${e}.x = abs(${e}.x);
  } else if (${o} > 1.5 && ${o} < 2.5) {
    ${e} = abs(${e});
  } else if (${o} > 2.5) {
    float ${r} = length(${e});
    float ${i} = atan(${e}.y, ${e}.x);
    float ${s} = 1.0471976;
    ${i} = mod(${i} + ${s}, ${s} * 2.0);
    ${i} = abs(${i} - ${s});
    // Shrink the wedge to fit the buffer. Rotating a frame corner to the wedge
    // pushes it past the edge, where the clamp below would flatten every outer
    // radius onto the border and smear the frame into bands.
    float ${l} = 0.49 / max(0.001, length(vec2(0.5 * aspect, 0.5)) * sin(${s}));
    ${e} = ${r} * ${l} * vec2(cos(${i}), sin(${i}));
  }
  ${e}.x /= aspect;
  ${e} = clamp(${e} + 0.5, 0.001, 0.999);
`}var Xb=`
  vec2 uv = clamp(_st, 0.001, 0.999);
  float aspect = resolution.x / max(1.0, resolution.y);
  float spd = clamp(speed, 0.0, 2.0);
  float f = clamp(feed, 0.03, 0.09);
  float wander = clamp(styleMap, 0.0, 1.0);

  ${qb}
  vec2 gs = 1.0 / grid;
  vec2 uvC = (floor(uv * grid) + 0.5) * gs;

  vec4 prev = texture2D(stateTex, uvC);
  float A = prev.r;
  float B = prev.g;

  vec2 p = (uvC - 0.5) * vec2(aspect, 1.0);
  float d = length(p);
  // Seed in blocks of a few cells rather than single cells: a lone lit cell has no
  // neighbour to divide into and decays within a handful of steps, so per-cell noise
  // mostly dies and the frame takes seconds to grow back from the few survivors.
  // Hash the block in normalised space \u2014 raw indices reach sin() arguments in the
  // tens of thousands, where it bands badly and the scatter collapses to nothing.
  vec2 seedGrid = max(vec2(1.0), floor(grid / 3.0));
  vec2 seedId = floor(uv * seedGrid) / seedGrid;
  float n = fract(sin(dot(seedId, vec2(12.9898, 78.233))) * 43758.5453);

  if (forceSeed > 0.5) {
    // Nucleate across the whole frame. A front spreading from a central disc needs
    // tens of thousands of steps to reach the edges, and a solid disc burns out in
    // its middle and leaves a permanent hole there.
    float lit = step(mix(0.988, 0.9, clamp(seedSize, 0.08, 0.55) / 0.55), n);
    B = lit;
    A = 1.0 - 0.58 * lit;
  } else {
    vec4 xp = texture2D(stateTex, clamp(uvC + vec2(gs.x, 0.0), 0.0, 1.0));
    vec4 xm = texture2D(stateTex, clamp(uvC - vec2(gs.x, 0.0), 0.0, 1.0));
    vec4 yp = texture2D(stateTex, clamp(uvC + vec2(0.0, gs.y), 0.0, 1.0));
    vec4 ym = texture2D(stateTex, clamp(uvC - vec2(0.0, gs.y), 0.0, 1.0));
    vec4 pp = texture2D(stateTex, clamp(uvC + gs, 0.0, 1.0));
    vec4 mm = texture2D(stateTex, clamp(uvC - gs, 0.0, 1.0));
    vec4 pm = texture2D(stateTex, clamp(uvC + vec2(gs.x, -gs.y), 0.0, 1.0));
    vec4 mp = texture2D(stateTex, clamp(uvC + vec2(-gs.x, gs.y), 0.0, 1.0));

    vec2 side = xp.rg + xm.rg + yp.rg + ym.rg;
    vec2 diag = pp.rg + mm.rg + pm.rg + mp.rg;
    vec2 lap = side * 0.2 + diag * 0.05 - vec2(A, B);

    // Kill drifts slowly across the frame so several Pearson regimes coexist \u2014
    // that is what puts solid blobs, rings and dot fields in one composition.
    // Clamped to the band that survives 8-bit state, so no region dies or floods.
    float gt = time * 0.03;
    float lobes = 0.5 + 0.5 * sin(p.x * 7.3 + 1.1 + gt) * cos(p.y * 6.1 - 0.4 - gt * 0.7);
    float region = 0.75 * lobes + 0.25 * clamp(d / 0.62, 0.0, 1.0);
    float k = clamp(kill + 0.006 * (region - 0.5) * 2.0, 0.0585, 0.0685);

    float reaction = A * B * B;
    float dt = min(1.0, 0.45 + spd * 0.55);
    A = clamp(A + (lap.x - reaction + f * (1.0 - A)) * dt, 0.0, 1.0);
    B = clamp(B + (0.5 * lap.y + reaction - (k + f) * B) * dt, 0.0, 1.0);

    if (wander > 0.001) {
      // Drifting injectors keep nudging the field, which otherwise settles into a
      // fixed steady state within a few seconds and stops moving.
      float t = time * (0.14 + spd * 0.56);
      vec2 w1 = vec2(0.42 * aspect * sin(t * 0.61), 0.42 * cos(t * 0.43));
      vec2 w2 = vec2(0.36 * aspect * sin(t * 0.29 + 1.7), 0.38 * cos(t * 0.37 + 2.4));
      float rW = mix(0.014, 0.095, wander);
      float stamp = max(
        smoothstep(rW, 0.0, length(p - w1)),
        smoothstep(rW, 0.0, length(p - w2))
      ) * wander * 0.44;
      B = clamp(B + stamp, 0.0, 1.0);
      A = clamp(A - stamp * 0.2, 0.0, 1.0);
    }
  }

  return vec4(A, B, B, 1.0);
`;u();function Cc(e){return{getTexture:()=>e()?.getTexture?.()}}function Ri(e){return{getTexture:()=>e()?.getCurrent?.()}}u();u();u();function Yb(e){let t=e*e,n=new Float32Array(t),o=new Uint8Array(t),r=new Uint8Array(t*4),i=3,s=[];for(let m=-i;m<=i;m++)for(let d=-i;d<=i;d++){let y=d*d+m*m;y!==0&&s.push([d,m,1/y])}let l=m=>{let d=m%e,y=m/e|0;for(let[D,B,O]of s){let K=(d+D+e)%e,X=(y+B+e)%e;n[X*e+K]+=O}};for(let m=0;m<t;m++)Math.random()<.045&&(o[m]=1,l(m));for(let m=0;m<t;m++){let d=0,y=1/0;for(let K=0;K<t;K++){if(o[K])continue;let X=n[K];X<y&&(y=X,d=K)}o[d]=1,l(d);let D=Math.floor(m/Math.max(1,t-1)*255),B=Math.floor(D*97%256*.92),O=d*4;r[O]=D,r[O+1]=B,r[O+2]=D,r[O+3]=255}return r}var VM={value256:{kind:"file",path:"/textures/shadertoy-noise256.jpg",wrap:"repeat",mag:"linear",min:"linear"},blue64:{kind:"generated",size:64,wrap:"repeat",mag:"nearest",min:"nearest",generate:Yb}},Ai=new Map,Mc=null,$M=e=>({getTexture:()=>(console.warn(`[noise] texture "${e}" not loaded yet`),null)});function Lc(e){return Ai.get(e)??$M(e)}function qM(e,t,n){return new Promise(o=>{let r=new Image;r.crossOrigin="anonymous";let i=()=>{Ai.set(t,{getTexture:()=>e.texture({data:new Uint8Array([128,128,128,255]),shape:[1,1]})}),o()};r.addEventListener("load",()=>{try{let s=e.texture({data:r,wrap:n.wrap,mag:n.mag,min:n.min});Ai.set(t,{getTexture:()=>s})}catch{i()}o()},{once:!0}),r.addEventListener("error",i,{once:!0}),r.src=n.path})}function jM(e,t,n){try{let o=e.texture({data:n.generate(n.size),shape:[n.size,n.size],wrap:n.wrap,mag:n.mag,min:n.min});Ai.set(t,{getTexture:()=>o})}catch{Ai.set(t,{getTexture:()=>e.texture({data:new Uint8Array([128,128,128,255]),shape:[1,1]})})}return Promise.resolve()}function XM(e,t,n){return n.kind==="file"?qM(e,t,n):jM(e,t,n)}function Kb(e){let t=Object.entries(VM).filter(([n])=>!Ai.has(n));return t.length===0?Promise.resolve():Mc||(Mc=Promise.all(t.map(([n,o])=>XM(e,n,o))).then(()=>{}),Mc)}var YM="value256";function kc(){return Lc(YM)}function Qb(e){return Kb(e)}u();u();u();var Xm=Math.PI/1.5,Zb=`
  vec2 res = resolution.xy;
  vec2 pBase = gl_FragCoord.xy / res - 0.5;
  pBase.x *= res.x / max(res.y, 1.0);
  pBase *= 4.0 * max(0.25, scale);

  float nScale = max(0.05, noiseScale);
  float turb = clamp(turbulence, 0.0, 0.6);
  float octMax = clamp(detail, 3.0, 6.0);
  float glow = max(0.35, intensity);
  float ringMix = clamp(rings, 0.0, 1.0);
  float ringPow = clamp(ringPower, 0.35, 1.35);
  float trMix = clamp(triggerRings, 0.0, 1.0);

  vec3 col = vec3(0.0);
  float rBase = length(pBase);
  float expandSec = ${Xm.toFixed(6)};
  float trOct = min(octMax, 4.0);

  if (triggerRingCount > 0.5 && trMix > 0.00001) {
    vec3 trAcc = vec3(0.0);

    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float active = step(fi, triggerRingCount - 0.5);
      float ageFrac = texture2D(triggerTex, vec2((fi + 0.5) / 6.0, 0.5)).r;
      float trTAnim = ageFrac * expandSec * max(0.0, speed) * 0.15;
      float fadeIn = smoothstep(0.0, 0.07, ageFrac);
      float fadeOut = 1.0 - smoothstep(0.68, 1.0, ageFrac);
      float trEnv = fadeIn * fadeOut * active;

      // One expanding annulus per event \u2014 rings coexist until they grow out.
      float ringR = mix(0.06, 2.6, ageFrac);
      float ringW = mix(0.05, 0.14, ageFrac) * mix(1.4, 0.7, ringPow);
      float ringBand = exp(-pow((rBase - ringR) / max(ringW, 0.001), 2.0));
      float singleRing = mix(ringBand * 0.35, ringBand, ringMix);

      vec2 trP2 = pBase * 0.7;
      vec2 trAnimA = vec2(trTAnim * 1.6);
      vec2 trAnimB = vec2(trTAnim * 1.7);

      float trFbmAx = 0.0;
      {
        float z = 2.0;
        vec2 pp = trP2 - trAnimA;
        for (int j = 0; j < 6; j++) {
          float fj = float(j) + 1.0;
          float w = step(fj, trOct);
          float n = texture2D(noiseTex, pp * 0.01 * nScale).x;
          trFbmAx += abs((n - 0.5) * 2.0) / z * w;
          z *= 2.0;
          pp *= 2.0;
        }
      }

      float trFbmBy = 0.0;
      {
        float z = 2.0;
        vec2 pp = trP2 + trAnimB;
        for (int j = 0; j < 6; j++) {
          float fj = float(j) + 1.0;
          float w = step(fj, trOct);
          float n = texture2D(noiseTex, pp * 0.01 * nScale).x;
          trFbmBy += abs((n - 0.5) * 2.0) / z * w;
          z *= 2.0;
          pp *= 2.0;
        }
      }

      vec2 trBasis = (vec2(trFbmAx, trFbmBy) - 0.5) * turb;
      vec2 trPWarp = pBase + trBasis;
      float trCR = cos(trTAnim * 0.2);
      float trSR = sin(trTAnim * 0.2);
      mat2 trRotM = mat2(trCR, -trSR, trSR, trCR);
      vec2 trPRot = trPWarp * trRotM;

      float trRz = 0.0;
      {
        float z = 2.0;
        vec2 pp = trPRot;
        for (int j = 0; j < 6; j++) {
          float fj = float(j) + 1.0;
          float w = step(fj, trOct);
          float n = texture2D(noiseTex, pp * 0.01 * nScale).x;
          trRz += abs((n - 0.5) * 2.0) / z * w;
          z *= 2.0;
          pp *= 2.0;
        }
      }

      vec3 tint = max(vec3(colorR, colorG, colorB), vec3(0.02));
      vec3 trCol = tint * glow / max(trRz, 0.02);
      trCol = pow(abs(trCol), vec3(0.99));
      trAcc += trCol * trEnv * singleRing;
    }

    col = min(trAcc * trMix, vec3(4.0));
  }

  return vec4(col, 1.0);
`;var Gs=6,Jb=Xm;function Rc(){return[]}function ey(e,t){e.push({bornMs:t});let n=Gs*4;for(;e.length>n;)e.shift()}function ty(e,t){let n=[];for(let o=e.length-1;o>=0;o--){let r=e[o],i=(t-r.bornMs)/1e3;if(i>=Jb){e.splice(o,1);continue}n.push({ageFrac:Math.max(0,Math.min(1,i/Jb))})}return n.length>Gs&&(n.sort((o,r)=>o.ageFrac-r.ageFrac),n.length=Gs),{count:n.length,slots:n}}var Ac=Gs,Ei=null;function ny(e){if(Ei)return;let t=new Uint8Array(Ac*4),n=e.texture({data:t,shape:[Ac,1],wrap:"clamp",mag:"nearest",min:"nearest"});Ei={data:t,tex:n}}function Ec(){return Ei?{getTexture:()=>Ei.tex}:{getTexture:()=>(console.warn("[electricNoise] trigger texture not loaded yet"),null)}}function oy(e){if(!Ei)return;let{data:t,tex:n}=Ei;t.fill(0);let o=Math.min(e.length,Ac);for(let i=0;i<o;i++){let s=Math.max(0,Math.min(1,e[i].ageFrac)),l=i*4;t[l]=Math.round(s*255),t[l+3]=255}n.subimage?.({data:t,width:Ac,height:1})}u();u();var KM=[1,2,4,8];function Ia(e){let t=KM;if(t.includes(e))return e;let n=t[0];for(let o of t)Math.abs(o-e)<Math.abs(n-e)&&(n=o);return n}var Yo=(e,t,n,o,r)=>`
    {
      vec2 pa = ${n} - ${e};
      vec2 ba = ${t} - ${e};
      float hSeg = clamp(dot(pa, ba) / max(dot(ba, ba), 1.0e-6), 0.0, 1.0);
      float d = length(pa - ba * hSeg);
      float d2 = length(${e} - ${t});
      float fade = smoothstep(0.5, 1.5, d2);
      fade += smoothstep(0.02, 0.05, abs(d2 - 0.75));
      float depthW = mix(0.01, 0.07, smoothstep(0.92, 0.08, ${r}));
      float along = 1.0 - 4.0 * hSeg * (1.0 - hSeg);
      depthW *= mix(0.55, 1.45, along);
      float core = smoothstep(depthW, depthW * 0.18, d);
      float halo = exp(-14.0 * d / max(depthW, 0.001)) * 0.48 * haloGain;
      ${o} += (core + halo) * fade * lineBright;
    }`,zr=(e,t,n,o,r)=>`
    {
      vec2 offs = vec2(${t}, ${n});
      vec2 pid = ${o} + offs;
      vec3 ha = fract(vec3(pid.xyx) * vec3(213.897, 653.453, 253.098));
      ha += dot(ha, ha.yzx + 79.76);
      float rn = fract((ha.x + ha.y) * ha.z);
      float n1 = fract(rn * 10.0);
      float n2 = fract(rn * 100.0);
      float ang = ${r} + rn;
      ${e} = offs + vec2(sin(ang * n1), cos(ang * n2)) * 0.4;
    }`,Us=(e,t,n,o,r,i,s)=>`
    {
      float d = length(${t} - ${e});
      float core = (0.006 * ${r}) / max(d * d, 1.0e-4);
      core *= smoothstep(${i}, ${i} * 0.42, d);
      float pulse = pow(sin((fract(${e}.x) + fract(${e}.y) + tAnim) * 5.0) * 0.4 + 0.6, 20.0);
      pulse = mix(1.0, pulse, ${s});
      ${n} += core * pulse * mix(0.4, 1.2, ${o});
    }`,ry=`
  vec2 res = resolution.xy;
  vec2 uv = (gl_FragCoord.xy - res * 0.5) / res.y;

  float spd = max(0.0, speed);
  float tRot = time * spd * 0.1;

  float tAnim = time * spd;
  float layerCount = layers <= 1.5 ? 1.0 : (layers <= 3.0 ? 2.0 : (layers <= 6.0 ? 4.0 : 8.0));
  float layerStep = 1.0 / layerCount;

  float pointNorm = clamp((pointDensity - 1.05) / 1.15, 0.0, 1.0);
  float sizeMax = mix(6.0, 13.0, pointNorm);

  float intensityNorm = clamp(lineIntensity, 0.0, 2.0);
  float lineBright = intensityNorm;
  float haloGain = mix(0.35, 2.4, intensityNorm * 0.5);

  float sparkleNorm = clamp(glow / 2.4, 0.0, 1.0);
  float dotAmp = mix(0.0, 7.0, sparkleNorm * sparkleNorm);
  float dotSize = mix(0.018, 0.1, sparkleNorm);

  vec2 parallaxBase = vec2(sin(tAnim * 0.17), cos(tAnim * 0.23)) * 0.32;

  float m = 0.0;

  for (float layerIdx = 0.0; layerIdx < 8.0; layerIdx += 1.0) {
    if (layerIdx > layerCount - 0.5) break;

    float n = layerIdx * layerStep;
    float z = fract(tRot + n);
    float size = mix(sizeMax, 1.0, z);
    float layerFade = smoothstep(0.0, 0.6, z) * smoothstep(1.0, 0.8, z);
    vec2 stLayer = uv * size - parallaxBase * z;
    float layerDepth = 1.0 - z;

    vec2 id = floor(stLayer) + n;
    vec2 stLocal = fract(stLayer) - 0.5;

    vec2 p0;
    vec2 p1;
    vec2 p2;
    vec2 p3;
    vec2 p4;
    vec2 p5;
    vec2 p6;
    vec2 p7;
    vec2 p8;

    ${zr("p0","-1.0","-1.0","id","tAnim")}
    ${zr("p1","0.0","-1.0","id","tAnim")}
    ${zr("p2","1.0","-1.0","id","tAnim")}
    ${zr("p3","-1.0","0.0","id","tAnim")}
    ${zr("p4","0.0","0.0","id","tAnim")}
    ${zr("p5","1.0","0.0","id","tAnim")}
    ${zr("p6","-1.0","1.0","id","tAnim")}
    ${zr("p7","0.0","1.0","id","tAnim")}
    ${zr("p8","1.0","1.0","id","tAnim")}

    float mLocal = 0.0;
    float sparkle = 0.0;

    ${Yo("p1","p5","stLocal","mLocal","layerDepth")}
    ${Yo("p5","p7","stLocal","mLocal","layerDepth")}
    ${Yo("p7","p3","stLocal","mLocal","layerDepth")}
    ${Yo("p3","p1","stLocal","mLocal","layerDepth")}

    ${Yo("p4","p1","stLocal","mLocal","layerDepth")}
    ${Yo("p4","p5","stLocal","mLocal","layerDepth")}
    ${Yo("p4","p7","stLocal","mLocal","layerDepth")}
    ${Yo("p4","p3","stLocal","mLocal","layerDepth")}

    ${Yo("p4","p0","stLocal","mLocal","layerDepth")}
    ${Yo("p4","p2","stLocal","mLocal","layerDepth")}
    ${Yo("p4","p6","stLocal","mLocal","layerDepth")}
    ${Yo("p4","p8","stLocal","mLocal","layerDepth")}

    ${Us("p1","stLocal","sparkle","layerDepth","dotAmp","dotSize","sparkleNorm")}
    ${Us("p3","stLocal","sparkle","layerDepth","dotAmp","dotSize","sparkleNorm")}
    ${Us("p4","stLocal","sparkle","layerDepth","dotAmp","dotSize","sparkleNorm")}
    ${Us("p5","stLocal","sparkle","layerDepth","dotAmp","dotSize","sparkleNorm")}
    ${Us("p7","stLocal","sparkle","layerDepth","dotAmp","dotSize","sparkleNorm")}

    float sPhase = (sin(tAnim + n) + sin(tAnim * 0.1)) * 0.25 + 0.5;
    sPhase += pow(sin(tAnim * 0.1) * 0.5 + 0.5, 50.0) * 5.0;
    mLocal += sparkle * sPhase;
    mLocal *= mix(0.55, 1.25, layerDepth);

    m += layerFade * mLocal;
  }

  vec3 baseCol = vec3(1.0, 0.58, 0.35);
  vec3 col = baseCol * m;

  float audioGlow = -uv.y * max(0.0, audioBoost) * 2.0;
  col += baseCol * audioGlow;

  col *= 1.0 - dot(uv, uv);
  col = clamp(col, 0.0, 1.0);

  return vec4(col, 1.0);
`;var Ym=1.05;function Pc(e,t){let n=Ia(e);return t==="minimal"?Math.min(n,1):t==="reduced"?Math.min(n,2):n}function Fc(e,t){let n=Math.max(Ym,e);return t==="minimal"?Math.max(Ym,n*.68):t==="reduced"?Math.max(Ym,n*.84):n}u();function Oc(e){if(!Number.isFinite(e))return 3;let t=Math.round(e);return t<3?3:t>16?16:t}var ay=`
  vec2 res = resolution.xy;
  vec2 uv = (gl_FragCoord.xy * 2.0 - res) / max(1.0, res.y);

  float t = time * max(0.0, speed);
  float boost = clamp(audioBoost, 0.0, 1.5);

  vec2 z = uv * (1.25 / clamp(zoomFactor, 0.25, 3.0));

  float drift = 0.09 * t;
  float dc = cos(drift);
  float ds = sin(drift);
  z = mat2(dc, -ds, ds, dc) * z;
  z += 0.12 * vec2(sin(t * 0.21), cos(t * 0.17));

  vec2 fold = vec2(clamp(foldX, 0.30, 1.70), clamp(foldY, 0.30, 1.70));
  fold += 0.08 * boost;
  fold += 0.010 * vec2(sin(t * 0.37), cos(t * 0.31));

  float spinStep = clamp(spin, -1.6, 1.6);
  float sc = cos(spinStep);
  float ss = sin(spinStep);
  mat2 spinRot = mat2(sc, -ss, ss, sc);

  float iterations = clamp(iterDepth, 3.0, 16.0);
  float glowPow = clamp(glow, 0.25, 2.5);

  // Trap thresholds track the iteration count: orbit minima shrink as the orbit
  // gets longer, so a fixed threshold would flood the frame white at high depth.
  float density = iterations / 10.0;
  float axisK = 150.0 * density / glowPow;
  float radiusK = 26.0 * density;
  float stepK = 34.0 * density;

  // Soft minima rather than a hard min: neighbouring pixels often land in
  // different iteration basins, and a hard min turns that into per-pixel speckle.
  float axisAcc = 0.0;
  float radiusAcc = 0.0;
  float stepAcc = 0.0;
  float radiusSum = 0.0;
  float weightSum = 0.0;

  for (int i = 0; i < 16; i++) {
    float active = step(float(i), iterations - 0.5);

    vec2 prev = z;
    vec2 q = abs(z);
    q = spinRot * q;
    q = q / max(dot(q, q), 5.0e-4) - fold;
    q = clamp(q, -24.0, 24.0);
    z = mix(z, q, active);

    // Early folds draw the large smooth arcs; deep folds are sub-pixel and only
    // read as speckle, so their contribution decays.
    float w = exp(-float(i) * 0.24) * active;
    float radius = length(z);
    axisAcc += exp(-axisK * min(abs(z.x), abs(z.y))) * w;
    radiusAcc += exp(-radiusK * radius) * w;
    stepAcc += exp(-stepK * abs(length(z - prev) - 0.9)) * w;
    radiusSum += min(radius, 4.0) * w;
    weightSum += w;
  }

  // Hue follows the orbit's mean radius: a smooth field, so colour forms coherent
  // regions instead of the per-pixel confetti a hard-min trap produces.
  float orbitRadius = radiusSum / max(weightSum, 1.0e-3);

  float filament = 1.0 - exp(-axisAcc * 1.8);
  float shell = 1.0 - exp(-stepAcc * 0.8);
  float core = 1.0 - exp(-radiusAcc * 1.3);

  float lum = filament * 1.0 + shell * 0.30 + core * 0.85;

  float phase = hueShift + 0.05 * t + 0.85 * orbitRadius + 0.25 * stepAcc;
  vec3 pal = 0.5 + 0.5 * cos(6.2831853 * (phase + vec3(0.0, 0.33, 0.67)));

  vec3 col = pal * lum;
  col += vec3(0.55, 0.75, 1.0) * core * core * 0.5;
  col *= 1.0 + 0.8 * boost;
  col = vec3(1.0) - exp(-col * (1.6 + 0.8 * glowPow));
  col = clamp(col, 0.0, 1.0);

  vec2 g = gl_FragCoord.xy / res;
  col *= 0.74 + 0.26 * pow(max(16.0 * g.x * g.y * (1.0 - g.x) * (1.0 - g.y), 0.0), 0.30);

  return vec4(col, 1.0);
`;var QM=()=>1;function En(e,t){let o=(typeof e=="string"?e:t).replace("#","").trim();if(o.length!==6)return[0,0,0];let r=parseInt(o,16);return Number.isNaN(r)?[0,0,0]:[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}function ZM(e,t,n,o,r){return Zt(e,t.config,n,o,r(),t.templateKey)}function Km(e){return e.scale(()=>window.innerWidth/window.innerHeight,1)}function _o(e,t,n){let o=e.config.params?.[t];return typeof o=="string"?o:n}function JM(e,t,n){return _n(e,t.config,n(),Xn)}function Qm(e,t,n){let o=t.config;return!o.syncBand||o.syncBand==="none"?0:So(e,o.syncBand,n(),void 0,o)*(o.syncMultiplier??.45)}function iy(e,t){let{hydra:n,hydraRef:o,effectKey:r,activeChannelRef:i,renderQualityRef:s,electricNoiseCirclePackRef:l,liveHydraBands:m}=t,{fillLayerSrc:d,shapeLayerSrc:y,superformulaSrc:D,plasmaSrc:B,patternNoiseSrc:O,patternCellsSrc:K,patternTilesSrc:X,patternPolarSrc:pe,patternGeometrySrc:Re,electricNoiseSrc:ge,plexusSrc:Fe,universeWithinSrc:Qe,fractalFoldSrc:Ze,topoContourSrc:dt,gaussianNoiseGrid:Et,noise:at,solid:nt,src:ft,s0:A,s1:M}=n,k=(re,we)=>ZM(r,e,re,we,m),p=()=>e.config.params;switch(e.templateKey){case"fillLayer":return typeof d=="function"?Km(d(()=>En(p()?.colorA,"#7c3aed")[0],()=>En(p()?.colorA,"#7c3aed")[1],()=>En(p()?.colorA,"#7c3aed")[2],()=>En(p()?.colorB,"#06b6d4")[0],()=>En(p()?.colorB,"#06b6d4")[1],()=>En(p()?.colorB,"#06b6d4")[2],()=>Math.max(0,Math.min(3,Math.round(Number(k("type",1))))),()=>k("softness",.35),()=>Math.max(0,Math.min(3,Math.round(Number(k("sweep",0))))))):nt(1,0,0);case"noise":{let re=()=>Math.max(8,Math.min(8192,k("scale",1681))),we=()=>.22*Math.pow(Math.min(3,Math.max(0,Number(k("speed",.15)))),1.35);return Et!=null?Km(Et(()=>re(),()=>we())):Km(at(()=>Math.max(.05,re()*.12),()=>.02+we()*1.25).saturate(0))}case"plasma":return typeof B=="function"?B(()=>k("speed",1.1),()=>k("scale",1),()=>k("complexity",1)):nt(.5,.2,.9);case"patternLayer":{let re=()=>En(_o(e,"colorA","#0b1020"),"#0b1020")[0],we=()=>En(_o(e,"colorA","#0b1020"),"#0b1020")[1],Ye=()=>En(_o(e,"colorA","#0b1020"),"#0b1020")[2],ze=()=>En(_o(e,"colorB","#22d3ee"),"#22d3ee")[0],Ne=()=>En(_o(e,"colorB","#22d3ee"),"#22d3ee")[1],qe=()=>En(_o(e,"colorB","#22d3ee"),"#22d3ee")[2],Je=()=>Math.max(0,Math.min(3,Math.round(Number(k("variant",2))))),Ht=()=>Math.max(0,Math.min(10,Math.round(Number(k("geometry",0))))),et=()=>k("scale",1),Dt=()=>k("speed",.4),gt=()=>k("warp",0),bt=()=>Ns(et()),Pt=()=>k("symmetry",2),vt=Math.max(0,Math.min(5,Math.round(Number(k("type",1))))),Ut=Ri(()=>o.current?.o?.[3]);if(vt===4){o.current?.synth?.setFunction?.({name:"patternTuringDisplay",type:"src",inputs:[...la],glsl:Ha(En(_o(e,"colorA","#0b1020"),"#0b1020"),En(_o(e,"colorB","#22d3ee"),"#22d3ee"))});let bn=ie().patternTuringDisplay;return bn?bn(Ut,Je,bt,Pt):ft(Ut)}if(vt===5)return typeof Re=="function"?Re(Ht,et,Dt,gt,re,we,Ye,ze,Ne,qe):nt(.1,.6,.9);let tn=vt===1?K:vt===2?X:vt===3?pe:O;return typeof tn=="function"?tn(Je,et,Dt,gt,re,we,Ye,ze,Ne,qe):nt(.1,.6,.9)}case"electricNoise":{let re=()=>k("speed",1),we=()=>k("scale",1),Ye=()=>k("noiseScale",1),ze=()=>k("turbulence",.2),Ne=()=>k("detail",5),qe=()=>k("intensity",1.4),Je=()=>k("rings",.85),Ht=()=>k("ringPower",.9),et=()=>En(_o(e,"color","#331a66"),"#331a66")[0],Dt=()=>En(_o(e,"color","#331a66"),"#331a66")[1],gt=()=>En(_o(e,"color","#331a66"),"#331a66")[2],bt=()=>l.current,Pt=()=>bt().count;return typeof ge=="function"?ge(kc(),re,we,Ye,ze,Ne,qe,Je,Ht,QM,Ec(),Pt,et,Dt,gt):nt(.2,.1,.4)}case"plexus":return typeof Fe=="function"?Fe(()=>k("speed",1),()=>Fc(k("points",1.5),s.current),()=>k("intensity",1),()=>Pc(k("layers",4),s.current),()=>k("glow",1.2),()=>Qm(r,e,m)):nt(.4,.15,.85);case"topoContour":{let re=i.current===0?A:M;return typeof dt=="function"?dt(re,()=>k("scale",1),()=>Math.max(2,Math.min(24,Math.round(k("lines",10)))),()=>k("speed",1),()=>k("valley",.12),()=>k("lineWidth",1),()=>k("videoTint",.35),()=>Math.max(0,Math.min(1,Math.round(k("palette",0))))):nt(0,0,0)}case"universeWithin":return typeof Qe=="function"?Qe(()=>k("speed",1),()=>k("zoom",1.5),()=>Ia(k("layers",4)),()=>k("glow",1.2),()=>Qm(r,e,m)):nt(.4,.15,.85);case"fractalFold":return typeof Ze=="function"?Ze(()=>k("foldX",.86),()=>k("foldY",1.04),()=>k("zoom",1),()=>k("speed",.6),()=>k("spin",.42),()=>Oc(k("depth",8)),()=>k("glow",1.4),()=>k("hue",.12),()=>Qm(r,e,m)):nt(.15,.35,.9);case"shapeLayer":return typeof y=="function"?y(()=>Math.max(0,Math.min(4,Math.round(Number(k("shape",0))))),()=>k("size",.45),()=>k("roundness",0),()=>k("stroke",.15),()=>k("rotate",0),()=>k("centerX",.5),()=>k("centerY",.5),()=>En(_o(e,"color","#ffffff"),"#ffffff")[0],()=>En(_o(e,"color","#ffffff"),"#ffffff")[1],()=>En(_o(e,"color","#ffffff"),"#ffffff")[2],()=>JM(r,e,m),()=>Math.max(0,Math.min(1,Math.round(Number(k("fill",0)))))):nt(1,1,1);case"superformula":return typeof D=="function"?D(()=>Math.max(0,Math.min(2,Math.round(Number(k("look",2))))),()=>k("m",7.6),()=>k("n1",.36),()=>k("n2",2.16),()=>k("size",.48),()=>k("speed",.35),()=>k("glow",1.2),()=>En(_o(e,"color","#c4b5fd"),"#c4b5fd")[0],()=>En(_o(e,"color","#c4b5fd"),"#c4b5fd")[1],()=>En(_o(e,"color","#c4b5fd"),"#c4b5fd")[2]):nt(.77,.71,.99);default:return null}}u();function td(e,t,n){let o=e?.params?.[t];return typeof o=="number"&&Number.isFinite(o)?o:n}u();function sy(e,t,n){let o=bc(e);if(!o)return;let r=n?.[o.layerId];if(!(!r||String(r.templateKey)!==t))return r.config}u();function nd(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function od(e){let t=e<=.0031308?e*12.92:1.055*Math.pow(e,.4166666666666667)-.055;return Math.min(1,Math.max(0,t))}function eL(e,t,n){let o=nd(e),r=nd(t),i=nd(n),s=Math.cbrt(.4122214708*o+.5363325363*r+.0514459929*i),l=Math.cbrt(.2119034982*o+.6806995451*r+.1073969566*i),m=Math.cbrt(.0883024619*o+.2817188376*r+.6299787005*i);return{L:.2104542553*s+.793617785*l-.0040720468*m,a:1.9779984951*s-2.428592205*l+.4505937099*m,b:.0259040371*s+.7827717662*l-.808675766*m}}function tL(e){let t=(e.L+.3963377774*e.a+.2158037573*e.b)**3,n=(e.L-.1055613458*e.a-.0638541728*e.b)**3,o=(e.L-.0894841775*e.a-1.291485548*e.b)**3;return[od(4.0767416621*t-3.3077115913*n+.2309699292*o),od(-1.2684380046*t+2.6097574011*n-.3413193965*o),od(-.0041960863*t-.7034186147*n+1.707614701*o)]}function nL(e,t){let n=Math.max(2,Math.min(4,Math.round(t)));if(e.length===0)return Array.from({length:n},(D,B)=>({L:B/(n-1),a:0,b:0}));let o=1/0,r=-1/0;for(let D of e)D.L<o&&(o=D.L),D.L>r&&(r=D.L);let i=Math.max(.001,r-o),s=Array.from({length:n},(D,B)=>({L:o+i*B/(n-1),a:0,b:0})),l=new Float64Array(n),m=new Float64Array(n),d=new Float64Array(n),y=new Int32Array(n);for(let D=0;D<6;D++){l.fill(0),m.fill(0),d.fill(0),y.fill(0);for(let B of e){let O=0,K=1/0;for(let X=0;X<n;X++){let pe=s[X],Re=B.L-pe.L,ge=B.a-pe.a,Fe=B.b-pe.b,Qe=Re*Re+ge*ge+Fe*Fe;Qe<K&&(K=Qe,O=X)}l[O]+=B.L,m[O]+=B.a,d[O]+=B.b,y[O]+=1}for(let B=0;B<n;B++){let O=y[B];O!==0&&(s[B]={L:l[B]/O,a:m[B]/O,b:d[B]/O})}}return s.toSorted((D,B)=>D.L-B.L)}var oL=.02;function rL(e,t,n=0,o=1){let r=Math.max(0,Math.min(1,t));if(Math.hypot(e.a,e.b)>=oL){let m=1+r*1.6;return{L:e.L,a:e.a*m,b:e.b*m}}let s=n/Math.max(1,o)*Math.PI*2+.6,l=r*.11;return{L:e.L,a:Math.cos(s)*l,b:Math.sin(s)*l}}var Gn={canvas:null,ctx:null,rgb:new Float32Array(12),lastMs:0,lastCount:0,seeded:!1};function aL(){if(Gn.ctx)return Gn.ctx;if(typeof document>"u")return null;let e=document.createElement("canvas");e.width=24,e.height=24;let t=e.getContext("2d",{willReadFrequently:!0});return t?(Gn.canvas=e,Gn.ctx=t,t):null}function iL(e,t,n){let o=e.length;for(let r=0;r<4;r++){let i=Math.min(r,o-1),s=e[i],[l,m,d]=tL(rL(s,t,i,o)),y=r*3;n?(Gn.rgb[y]=l,Gn.rgb[y+1]=m,Gn.rgb[y+2]=d):(Gn.rgb[y]+=(l-Gn.rgb[y])*.18,Gn.rgb[y+1]+=(m-Gn.rgb[y+1])*.18,Gn.rgb[y+2]+=(d-Gn.rgb[y+2])*.18)}}function ly(e,t,n,o){let r=t!==Gn.lastCount,i=o-Gn.lastMs>=120;if(!r&&!i)return Gn.rgb;let s=aL();if(!s||!e||e.readyState<2||e.videoWidth<2)return Gn.rgb;Gn.lastMs=o,Gn.lastCount=t,s.drawImage(e,0,0,24,24);let l=s.getImageData(0,0,24,24).data,m=[];for(let d=0;d<l.length;d+=4)m.push(eL(l[d]/255,l[d+1]/255,l[d+2]/255));return iL(nL(m,t),n,!Gn.seeded||r),Gn.seeded=!0,Gn.rgb}u();var Hc="vec3(0.299, 0.587, 0.114)",sL=e=>`
  vec2 nmUvB = gl_FragCoord.xy / resolution.xy;
  float nmEpsB = 2.0 / min(resolution.x, resolution.y);
  float nmLxp = dot(texture2D(videoTex, clamp(nmUvB + vec2(nmEpsB, 0.0), 0.001, 0.999)).rgb, ${Hc});
  float nmLxm = dot(texture2D(videoTex, clamp(nmUvB - vec2(nmEpsB, 0.0), 0.001, 0.999)).rgb, ${Hc});
  float nmLyp = dot(texture2D(videoTex, clamp(nmUvB + vec2(0.0, nmEpsB), 0.001, 0.999)).rgb, ${Hc});
  float nmLym = dot(texture2D(videoTex, clamp(nmUvB - vec2(0.0, nmEpsB), 0.001, 0.999)).rgb, ${Hc});
  float nmDetV = max(0.15, detail) * 14.0;
  ${e} = normalize(vec3((nmLxp - nmLxm) * 0.5 * nmDetV, (nmLyp - nmLym) * 0.5 * nmDetV, 1.0));
`,Pi=(e,t,n)=>`
  vec2 nmGV${n} = floor((${e}) * nmSc);
  vec2 nmFV${n} = fract((${e}) * nmSc);
  float nmV0${n} = fract(sin(dot(nmGV${n} + vec2(nmTn * 0.11, 0.0), vec2(127.1, 311.7))) * 43758.5453);
  float nmV1${n} = fract(sin(dot(nmGV${n} + vec2(3.7, nmTn * 0.09), vec2(127.1, 311.7))) * 43758.5453);
  ${t} = clamp(max(
    1.0 - length(nmFV${n} - vec2(0.25, 0.35) - nmV0${n} * 0.5),
    1.0 - length(nmFV${n} - vec2(0.72, 0.68) - nmV1${n} * 0.5)
  ), 0.0, 1.0);
`,cy=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float nmAsp = resolution.x / max(1.0, resolution.y);
  float nmEps = 2.0 / min(resolution.x, resolution.y);
  float nmDet = max(0.15, detail) * 3.5;
  float nmRefr = clamp(refraction, 0.0, 1.0);
  vec2 nmUv = _st;
  nmUv.x *= nmAsp;
  vec2 nmP = nmUv;
  float nmSc = max(2.0, scale);
  float nmTn = time * max(0.0, speed);
  float nmHC = 0.0;
  float nmHX = 0.0;
  float nmHY = 0.0;
  ${Pi("nmP","nmHC","D0")}
  ${Pi("nmP + vec2(nmEps, 0.0)","nmHX","D1")}
  ${Pi("nmP + vec2(0.0, nmEps)","nmHY","D2")}
  vec3 nmN = normalize(vec3((nmHC - nmHX) * nmDet, (nmHC - nmHY) * nmDet, 1.0));

  vec2 nmOff = nmN.xy * nmRefr * a * 0.085;
  nmOff.x /= nmAsp;
  return _st + nmOff;
`,uy=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec3 nmLit = vec3(0.0, 0.0, 1.0);

  if (mapSource >= 0.5) {
    ${sL("nmLit")}
  } else {
    float nmAspL = resolution.x / max(1.0, resolution.y);
    vec2 nmUvL = gl_FragCoord.xy / resolution.xy;
    nmUvL.x *= nmAspL;
    vec2 nmPL = nmUvL;
    float nmSc = max(2.0, scale);
    float nmTn = time * max(0.0, speed);
    float nmDetL = max(0.15, detail) * 3.5;
    float nmEpsL = 2.0 / min(resolution.x, resolution.y);
    float nmHCL = 0.0;
    float nmHXL = 0.0;
    float nmHYL = 0.0;
    ${Pi("nmPL","nmHCL","L0")}
    ${Pi("nmPL + vec2(nmEpsL, 0.0)","nmHXL","L1")}
    ${Pi("nmPL + vec2(0.0, nmEpsL)","nmHYL","L2")}
    nmLit = normalize(vec3((nmHCL - nmHXL) * nmDetL, (nmHCL - nmHYL) * nmDetL, 1.0));
  }

  vec3 nmLightDir = normalize(vec3(clamp(lightX, 0.0, 1.0) * 2.0 - 1.0, clamp(lightY, 0.0, 1.0) * 2.0 - 1.0, 0.62));
  float nmDiff = max(dot(nmLit, nmLightDir), 0.0);
  vec3 nmHalfDir = normalize(nmLightDir + vec3(0.0, 0.0, 1.0));
  float nmSpecPow = mix(10.0, 72.0, clamp(specular, 0.0, 1.0));
  float nmSpec = pow(max(dot(nmLit, nmHalfDir), 0.0), nmSpecPow);

  float nmLitAmt = clamp(lightMix, 0.0, 1.0);
  float nmSpecAmt = clamp(specular, 0.0, 1.0);
  vec3 nmRgb = _c0.rgb;
  nmRgb *= mix(1.0, 0.42 + nmDiff * 0.82, nmLitAmt * a);
  nmRgb += vec3(nmSpec * nmSpecAmt * a * 0.72);
  return vec4(clamp(nmRgb, 0.0, 1.0), _c0.a);
`;u();u();var lL={full:{blurGaussianTaps:8,blurRadialSteps:8,glowAura:!0,warpTunnelQuality:0},reduced:{blurGaussianTaps:4,blurRadialSteps:6,glowAura:!0,warpTunnelQuality:1},minimal:{blurGaussianTaps:4,blurRadialSteps:4,glowAura:!1,warpTunnelQuality:2}};function ca(e){return lL[e??"full"]}function py(e){return e<1e-5?0:Math.max(.001,e*.045)}function my(e){return e<1e-5?0:Math.min(.35,e*.17)}function dy(e){return ca(e).blurRadialSteps}var fy=[[-4,1/256],[-3,8/256],[-2,28/256],[-1,56/256],[0,70/256],[1,56/256],[2,28/256],[3,8/256],[4,1/256]],cL=[[-2,1/16],[-1,4/16],[0,6/16],[1,4/16],[2,1/16]],uL=[[-1,1/4],[0,2/4],[1,1/4]];function Ic(e){return ca(e).blurGaussianTaps>=8?cL:uL}var hy=24,_y=.2;function Bc(e,t){let n=new Set(t);for(let o of e)if(o!=null&&!n.has(o))return o;return null}u();function gy(e){return e<1e-5?0:Math.min(2,e*2)}function by(e){let t=Math.max(0,Math.min(1,e??0));return Math.min(1,t*2)}var yy=`
  vec4 sharp = _c0;
  vec4 soft = _c1;
  float a = clamp(amount, 0.0, 1.0);
  float b = clamp(blur, 0.0, 1.0);
  if (a < 0.00001 && b < 0.00001) return sharp;

  float r = clamp(radius, 0.0, 1.0);
  float s = clamp(softness, 0.0, 1.0);

  vec2 uv = (gl_FragCoord.xy / resolution.xy) - 0.5;
  uv.x *= resolution.x / max(1.0, resolution.y);
  float d = length(uv) / 0.70710678;
  float edge = smoothstep(r, min(1.0, r + max(1e-4, s)), d);

  vec3 color = mix(sharp.rgb, soft.rgb, edge * b);
  float shade = 1.0 - a * edge;
  color *= shade;
  return vec4(color, sharp.a);
`,xy=18,vy=.14,rd=2;u();function Sy(e){let t=Math.max(.25,Math.min(2,e??1));return Math.max(5e-4,t*.008)}function wy(e){return ca(e).blurGaussianTaps>=8?[{kind:"center",weight:.2},{kind:"scrollX",weight:.2,sign:1},{kind:"scrollX",weight:.2,sign:-1},{kind:"scrollY",weight:.2,sign:1},{kind:"scrollY",weight:.2,sign:-1}]:[{kind:"center",weight:.34},{kind:"scrollX",weight:.33,sign:1},{kind:"scrollY",weight:.33,sign:1}]}u();var Da=[{shapeScale:.5,xMult:2,yMult:.5,tearAmpX:.05,tearAmpY:.03,tearPhaseX:.2,tearPhaseY:1.1,tearRateX:3.2,tearRateY:2.8,travelPhaseX:.2,travelPhaseY:1.1,travelRateX:.42,travelRateY:.36,travelSpreadX:.44,travelSpreadY:.4},{shapeScale:.4,xMult:.5,yMult:2.5,tearAmpX:-.04,tearAmpY:.02,tearPhaseX:2.4,tearPhaseY:3.7,tearRateX:4.1,tearRateY:3.5,travelPhaseX:2.4,travelPhaseY:3.7,travelRateX:.51,travelRateY:.33,travelSpreadX:.46,travelSpreadY:.42},{shapeScale:.6,xMult:1.2,yMult:.8,tearAmpX:.03,tearAmpY:-.05,tearPhaseX:4.2,tearPhaseY:5.5,tearRateX:3.8,tearRateY:2.6,travelPhaseX:4.2,travelPhaseY:5.5,travelRateX:.47,travelRateY:.39,travelSpreadX:.41,travelSpreadY:.45},{shapeScale:.3,xMult:.8,yMult:1.5,tearAmpX:-.06,tearAmpY:-.04,tearPhaseX:6.1,tearPhaseY:7.3,tearRateX:4.6,tearRateY:3.1,travelPhaseX:6.1,travelPhaseY:7.3,travelRateX:.44,travelRateY:.31,travelSpreadX:.43,travelSpreadY:.41}];function Fi(e,t,n=1){return{...e,shapeScale:e.shapeScale*n,tearPhaseX:e.tearPhaseX+t,tearPhaseY:e.tearPhaseY+t*1.17,travelPhaseX:e.travelPhaseX+t,travelPhaseY:e.travelPhaseY+t*.91,tearRateX:e.tearRateX+t*.04,tearRateY:e.tearRateY+t*.035,travelRateX:e.travelRateX+t*.03,travelRateY:e.travelRateY+t*.028}}var ad=[...Da,Fi(Da[0],8.3,.92),Fi(Da[1],9.4,.88),Fi(Da[2],10.5,.95),Fi(Da[3],11.6,.9),Fi(Da[0],12.7,.78),Fi(Da[2],13.8,.82)];function id(e,t,n,o){return Number.isFinite(e)?Math.max(t,Math.min(n,e)):o}function Ty(e){return e>0&&e<=1?e*10:e}function sd(e){let t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(10,Math.round(Ty(t)))):4}function Cy(e){let t=Number(e);return Number.isFinite(t)?id(Ty(t),0,10,5):5}function ld(e){return Math.max(0,Math.min(1,e/10))}function My(e,t){return e*ld(t)*2}function Ly(e){return e<1e-5?0:.85+e*.35}function cd(e,t){return e*(.45+t*.95)}function ky(e){return id(Number(e),0,1,1)}function Ry(e){return id(Number(e),0,1,1)}function ud(e,t,n,o,r,i,s){let l=Math.sin(r*i*t+e)*.58+Math.sin(r*i*t*.53+e*1.7)*.28,m=Math.sin(Math.floor(r*i*t*.38)*5.11+e*1.4)*.34,d=(l+m)*n*1.15*s,y=(o*.23+e*.037)%1-.5;return{pivot:.5+d*.75+y*.32,scroll:d*1.05+y*.48}}u();function pd(e,t,n){return e<1e-5?{pix:1e4,pixRows:1e4}:{pix:t,pixRows:n}}function Ay(e,t,n){let o=Math.max(4,Math.min(194,Math.round(e)));return Math.max(2,Math.round(o*(n/Math.max(1,t))))}u();function Ey(e,t,n){let o=Math.max(.05,Math.min(1,e??.35)),r=Math.max(0,Math.min(1,t??.35));return(.75+o*2.5)/Math.max(1,n)*(1.15-r*.7)}function Py(e,t){let n=1.5/Math.max(1,t);return Math.max(n,Math.abs(e)*1.35)}u();function Fy(e,t){return t<1e-5?0:Math.max(.01,e*.042)}function Oy(e,t){return t<1e-5?0:Math.min(.62,t*(.32+e*.36))}function Hy(e){let t=Ic(e).filter(([o])=>o!==0),n=t.reduce((o,[,r])=>o+r,0);return n<1e-5?t:t.map(([o,r])=>[o,r/n])}u();function Iy(e,t,n){if(t<1e-5)return 0;let o=Math.max(0,Math.min(1,e)),r=Math.max(0,Math.min(1,n));return o*t*.052*(.3+r*.7)}function By(e,t){if(e<1e-5)return 0;let n=Math.max(0,Math.min(1,t));return Math.min(.95,e*(.28+n*.72))}function Dy(e){return Math.max(0,Math.min(1,.25+e*.75))}u();var wD=Math.PI*2;function Ny(e){return Math.max(0,Math.min(1,e))}function Wy(e,t){return Ny(e)*.26*(.4+.6*Ny(t))}u();u();var Gy=-40;var Uy="fadeOff";function pL(e){if(!e)return!0;let t=e.base??0,n=e.syncMultiplier??0;return t<1e-5&&n<1e-5}function mL(){let e=ie().masterDbfs;return typeof e!="number"||!Number.isFinite(e)?!1:e>=Gy}function dL(e,t){let n=e.syncBand??"none";if(n==="none"){if(t&&typeof t.master=="number")return t.master;let o=ie();return typeof o.masterLevel=="number"?o.masterLevel:0}return So(Uy,n,t)}function zy(e,t){if(!e||!e.enabled||pL(e)||!mL())return 0;let n=dL(e,t),o=Math.max(0,Math.min(1,n)),r=fL(e,t),i=Math.max(0,Math.min(1,e.syncMultiplier??0));return Math.max(0,Math.min(1,(1-o)*(r+i)))}function fL(e,t){let n=e.paramSync?.base;if(n?.band&&n.band!=="none"){let o=Wg(e,Uy,"base",{staticValue:e.base??0,paramMin:0,paramMax:1}),r=Mr(o.source,t),i=aa(o),s=ia(r,o.mapMin,o.mapMax,i);return Math.max(0,Math.min(1,s))}return Math.max(0,Math.min(1,e.base??0))}u();function Vy(e){return(e.base??0)<1e-5&&(e.syncBand??"none")==="none"}function $y(e,t){let n=Math.max(0,Math.min(1,e.base??0));return(e.syncBand??"none")==="none"?n:Math.max(0,Math.min(1,(e.base??0)+t*(e.syncMultiplier??0)))}function qy(e,t,n){if(Vy(n))return 0;if(n.isTrigger)return t;if((n.syncBand??"none")!=="none"){let o=n.params?.tail,i=.035+(1-Math.max(0,Math.min(1,typeof o=="number"?o:.82)))*.26,l=t>e?.58:i;return e+l*(t-e)}return t<1e-5?0:e+.32*(t-e)}function jy(e,t){return!e?.enabled||Vy(e)?0:Math.max(0,Math.min(1,t))}function Xy(e,t,n){return(e.syncBand??"none")==="none"?0:e.isTrigger?t:n(e.syncBand??"none")}u();function Yy(e){return(e.base??0)<1e-5&&(e.syncBand??"none")==="none"}function Ky(e,t){let n=Math.max(0,Math.min(1,e.base??0));return(e.syncBand??"none")==="none"?n:Math.max(0,Math.min(1,(e.base??0)+t*(e.syncMultiplier??0)))}function Qy(e,t,n){if(Yy(n))return 0;if(n.isTrigger)return t;if((n.syncBand??"none")!=="none"){let o=n.params?.tail,i=.04+(1-Math.max(0,Math.min(1,typeof o=="number"?o:.82)))*.28,l=t>e?.62:i;return e+l*(t-e)}return t<1e-5?0:e+.35*(t-e)}function Zy(e,t){return!e?.enabled||Yy(e)?0:Math.max(0,Math.min(1,t))}function Jy(e,t,n){return(e.syncBand??"none")==="none"?0:e.isTrigger?t:n(e.syncBand??"none")}u();u();function e1(e,t){return e<1e-5?0:t*e*.028}function t1(e){return e<1e-5?0:e*.85}var _L=.88;function md(e,t,n){if(e<1e-5||n===0)return{x:0,y:0};let o=n*e*.028;return{x:Math.cos(t)*o,y:Math.sin(t)*o}}function o1(e){return e<1e-5?0:e*_L}u();var gL=[{minX:.04,maxX:.44,minY:.04,maxY:.44},{minX:.56,maxX:.96,minY:.04,maxY:.44},{minX:.18,maxX:.82,minY:.56,maxY:.96}],dd=[16/9,4/3,1,9/16];function Na(e){let t=Math.sin(e)*43758.5453;return t-Math.floor(t)}function bL(e){let t=Math.floor(Na(e+60)*dd.length)%dd.length;return dd[t]}function yL(e){return{zoom:1+Na(e+1)*1,panX:(Na(e+2)-.5)*.55,panY:(Na(e+3)-.5)*.55}}function xL(e,t,n,o,r){let i=Math.max(.06,Math.min(.55,t)),s=bL(r),l=e.maxX-e.minX,m=e.maxY-e.minY,d=(l-.02*2)*.5,y=(m-.02*2)*.5,B=Math.min(y,d*n/s,i*1.05)*(.5+Na(r+45.6)*.5),O=B*(s/n),K=e.minX+O+.02,X=e.maxX-O-.02,pe=e.minY+B+.02,Re=e.maxY-B-.02,ge=K+Na(o+78.9)*Math.max(1e-4,X-K),Fe=pe+Na(o+91.2)*Math.max(1e-4,Re-pe);return{cx:ge,cy:Fe,halfWx:O,halfHy:B}}function r1(e,t,n){return gL.map((o,r)=>{let i=r*17,s=r*17+e*1.31;return{...xL(o,t,n,s,i),...yL(i)}})}u();function vL(e=1){return{seed:e,prevEnvelope:0,prevBand:0,followCooldownMs:0}}var i1=vL();function s1(){return i1.seed}function a1(e){e.seed=(e.seed*1.6180339887+1.23456789)%1e4,e.seed<.001&&(e.seed=1)}function l1(e){let t=e.state??i1;if(e.envelope>.02&&t.prevEnvelope<=.02&&a1(t),jn(e.binding))t.prevBand=0;else{let o=Mr(e.binding.source,e.bands,e.binding.depth),r=o>.35&&t.prevBand<=.35;t.followCooldownMs=Math.max(0,t.followCooldownMs-e.dt*1e3),(r||o>.55&&t.followCooldownMs<=0)&&(a1(t),t.followCooldownMs=180),t.prevBand=o}return t.prevEnvelope=e.envelope,t.seed}u();var d1=.041666666666666664,f1=361,SL=120;function wL(e,t,n=0,o=f1){let r=Math.max(10,Math.min(40,Math.round(Number.isFinite(e)?e:16))),i=Math.max(1,Math.min(24,Math.round(Number.isFinite(t)?t:2))),s=n>=.5,l=s?2*(r-1):r-1;return{slices:r,frameOffset:i,history:1+l*i,grid:s}}function TL(e,t,n,o){return[e.slices,e.frameOffset,e.grid?1:0,t>=.5?1:0,Math.round(n),Math.max(1,o)].join(":")}function CL(e){return e>0?Math.max(1,Math.round(e/d1)):0}function ML(e,t){let n=Math.max(1,e.history),o=CL(t);return o>0?Math.min(f1,n,o):Math.min(SL,n)}function LL(e,t){return Math.max(1,Math.min(e.history,Math.max(1,t)))}function kL(e,t){let n=Math.max(1,t);return(Math.max(0,e)%n+n)%n}function RL(e,t,n){let o=Math.max(1,Math.min(t,Math.max(1,n)));return kL(e,o)}function Dc(e,t,n,o=0){let r=Math.max(1,t),i=Math.max(0,Math.min(r-1,Math.round(e))),s=Math.max(1,n),l=Math.max(0,Math.min(2,Math.round(o)));if(l>=2)return(r-1-i)*s;if(l>=1){let m=Math.floor((r-1)/2),d=Math.ceil((r-1)/2);return Math.min(Math.abs(i-m),Math.abs(i-d))*s}return i*s}function c1(e,t,n=16,o=0){return Dc(e,n,t,o)}function AL(e,t,n,o,r,i,s=0){let l=Math.max(1,i),m=Math.max(1,n),d=Math.max(0,Math.min(l-1,e)),y=Math.max(0,Math.min(l-1,t)),D=Math.max(0,Math.min(2,Math.round(s)));if(o>=.5){if(D>=1&&D<2)return(Dc(d,l,1,1)+Dc(y,l,1,1))*m;let B=D>=2,O=r>=.5!==B,K=O?l-1-d:d,X=O?l-1-y:y;return(K+X)*m}return Dc(r>=.5?y:d,l,m,D)}function fd(e,t,n){let o=Math.max(1,n);return((e-t)%o+o)%o}var $s=null,Hi=[null,null],Oi=null,h1=null,Wc="",Nc=!1,hd="",Ko=0,Qo=0,zs=0,Vs=0,_1=0;function EL(e,t){let n=typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?PL(e.currentSrc||e.src):"canvas";return n?t?`${t}|${n}`:n:t||""}function PL(e){if(!e)return"";try{return new URL(e,typeof location<"u"?location.href:void 0).href}catch{return e}}function FL(e){return e instanceof HTMLVideoElement&&Number.isFinite(e.currentTime)?e.currentTime:null}function gd(e){return e instanceof HTMLVideoElement&&Number.isFinite(e.duration)&&e.duration>0?e.duration:0}function OL(e,t,n=d1){return e==null||!Number.isFinite(t)||e+n*.25<t?!0:e-t>=n*.85}function g1(e){$s=e.texture({shape:[1,1]})}function b1(){return{getTexture:()=>$s}}function y1(){return Nc}function bd(e){let t=e.getContext("2d",{alpha:!1});if(!t)throw new Error("timeGlitch: 2d context unavailable");return t.imageSmoothingEnabled=!0,t}function x1(e,t,n){let o=[],r=[];for(let i=0;i<e;i++){let s=document.createElement("canvas");s.width=t,s.height=n,o.push(s),r.push(bd(s))}return{slots:o,ctx:r}}function HL(e,t,n){e.width===t&&e.height===n||(e.width=t,e.height=n)}function IL(e){for(let t=0;t<e.slots.length;t++){let n=e.slots[t];if(n.width===Ko&&n.height===Qo)continue;let o=document.createElement("canvas");o.width=Ko,o.height=Qo;let r=bd(o);r.drawImage(n,0,0,Ko,Qo),e.slots[t]=o,e.ctx[t]=r}}function BL(e){return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?e.readyState>=2&&e.videoWidth>0&&e.videoHeight>0:e instanceof HTMLCanvasElement?e.width>0&&e.height>0:!0}function u1(e,t){e.drawImage(t,0,0,Ko,Qo)}function DL(e){let t=x1(e,Ko,Qo);return{slots:t.slots,ctx:t.ctx,writeHead:0,lastSrc:"",lastCaptureTime:Number.NaN,durationSec:0}}function NL(e,t,n){let o=Math.max(2,Math.round(e)),r=Math.max(2,Math.round(t)),i=Math.max(2,Math.min(640,o)),s=Math.max(2,Math.min(360,r)),l=Math.max(1,n),m=i!==Ko||s!==Qo,d=o!==zs||r!==Vs;if(m){Ko=i,Qo=s;for(let y of Hi)y&&IL(y);Wc=""}(d||!Oi)&&(zs=o,Vs=r,Oi||(Oi=document.createElement("canvas"),h1=bd(Oi)),HL(Oi,o,r),$s?.resize(o,r),Wc=""),_1=l;for(let y=0;y<2;y++){let D=Hi[y];if(D&&D.slots.length<l){let B=x1(l-D.slots.length,Ko,Qo),O=D.writeHead>0?D.slots[(D.writeHead-1)%D.slots.length]:null;if(O)for(let K of B.ctx)K.drawImage(O,0,0,Ko,Qo);D.slots.push(...B.slots),D.ctx.push(...B.ctx)}}}function WL(e){let t=Hi[e];if(t)return t;let n=DL(Math.max(1,_1));return Hi[e]=n,n}function p1(e,t,n=0){if(!BL(t))return;let o=WL(e),r=EL(t);if(!r)return;let i=FL(t);if(r!==o.lastSrc){o.lastSrc=r,o.durationSec=gd(t),u1(o.ctx[0],t),o.writeHead=1,o.lastCaptureTime=i??Number.NaN;return}let s=gd(t);if(s>0&&(o.durationSec=s),!(o.writeHead<Math.max(1,n))&&!OL(i,o.lastCaptureTime))return;let m=o.writeHead%Math.max(1,o.slots.length);u1(o.ctx[m],t),i!=null&&(o.lastCaptureTime=i),o.writeHead+=1}function _d(e,t,n){return RL(e,t,n)}function GL(e,t,n,o){let r=h1,i=t.slices,s=t.grid?1:0,l=Math.max(1,e.slots.length),m=Math.min(Math.max(1,e.writeHead),l),d=e.writeHead-1,y=m;if(t.grid){let O=zs/i,K=Vs/i,X=Ko/i,pe=Qo/i;for(let Re=0;Re<i;Re++)for(let ge=0;ge<i;ge++){let Fe=_d(AL(ge,Re,t.frameOffset,s,n,i,o),m,l),Qe=fd(d,Fe,y);r.drawImage(e.slots[Qe],ge*X,Re*pe,X,pe,ge*O,Re*K,O,K)}return}if(n>=.5){let O=Vs/i,K=Qo/i;for(let X=0;X<i;X++){let pe=_d(c1(X,t.frameOffset,i,o),m,l),Re=fd(d,pe,y);r.drawImage(e.slots[Re],0,X*K,Ko,K,0,X*O,zs,O)}return}let D=zs/i,B=Ko/i;for(let O=0;O<i;O++){let K=_d(c1(O,t.frameOffset,i,o),m,l),X=fd(d,K,y);r.drawImage(e.slots[X],O*B,0,B,Qo,O*D,0,D,Vs)}}function m1(e){return e&&(typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement||e instanceof HTMLCanvasElement)?e:null}function v1(e){let t=!!e.enabled&&e.amount>=1e-5;if(!(t||!!e.warm)||!$s)return;let o=m1(e.sources?.[0])??(e.activeChannel!==1?e.source??null:null),r=m1(e.sources?.[1])??(e.activeChannel===1?e.source??null:null),i=e.activeChannel===1?1:0,l=(i===1?r:o)??o??r;if(!l)return;let m=gd(l)||Hi[i]?.durationSec||0,d=wL(e.cols,e.frameOffset,e.mode),y=ML(d,m);NL(e.destWidth,e.destHeight,y);let D=e.origin??0,B=LL(d,y);if(o&&p1(0,o,B),r&&p1(1,r,B),!t)return;let O=Hi[i],K=O?.lastSrc||"";if(!O||O.writeHead<=0){K!==hd&&(Nc=!1);return}if(K!==hd){if(O.writeHead<B){Nc=!1;return}hd=K}Nc=!0;let X=`${i}:${O.lastSrc}:${TL(d,e.direction,D,O.slots.length)}:${O.writeHead}`;X!==Wc&&(GL(O,d,e.direction,D),$s.subimage(Oi),Wc=X)}var yd=.025,$L=.015,Lr=1.03,qL={paramMin:-1,paramMax:1,clampMin:-1,clampMax:1},jL=()=>1;function T1(e){return e===ln.swipe||e===ln.slide}var C1=()=>Math.min(window.innerWidth,window.innerHeight);function cn(e,t){let o=(typeof e=="string"?e:t).replace("#","").trim();if(o.length!==6)return[0,0,0];let r=parseInt(o,16);return Number.isNaN(r)?[0,0,0]:[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}function M1(){let e=document.getElementById("hydra-canvas");return e instanceof HTMLCanvasElement?Math.max(e.width,e.height,1):4096}var go=()=>ie().customBands;function L1(e){let{applySceneDeferredRef:t,hydraRef:n,settingsRef:o,studioModeRef:r,exportSettingsRef:i,outputMappingRef:s,transitionStateRef:l,activeChannelRef:m,reactionDiffForceSeedRef:d,feedbackForceClearRef:y,patternRdForceSeedRef:D,canvasRef:B,renderQualityRef:O,runHydraTickRef:K,electricNoiseCirclePackRef:X,oscilloscopeBridgeReadyRef:pe,neonGridBridgeReadyRef:Re,textLayerBridgeReadyRef:ge,throughTheStarsBridgeReadyRef:Fe,lumaDustBridgeReadyRef:Qe,lumaLockBridgeReadyRef:Ze,getFxState:dt,getParamValue:Et}=e,at=null,nt=new Map,ft={},A=[],M=(rn,wn)=>sy(wn,rn,o.current.layerInstances),k=()=>{let rn=dt();if(!rn)return rn;let wn=rn;if(nt.size>0){let an={};for(let[Tn,Mn]of nt){let xn=M(Tn,Mn);xn&&(an[Tn]=xn)}wn={...rn,...an}}return at?{...wn,[at.templateKey]:at.config}:wn},p=(rn,wn,an)=>{let Tn=at?.templateKey===rn?at.effectKey:nt.get(rn);if(Tn){let Mn=M(rn,Tn)??(at?.templateKey===rn?at.config:void 0);if(Mn)return Zt(Tn,Mn,wn,an,go(),rn)}return Et(rn,wn,an)},re=(rn,wn,an)=>{let Tn=o.current.fxGroups?.[rn]?.composite;return Tn?Zt(`group:${rn}`,Tn,wn,an,go()):an};if(Fo()){t.current=!0;return}let we=ie(),{osc:Ye,noise:ze,concentricMask:Ne,concentricSquareMask:qe,perspectiveSlatMask:Je,gaussianNoiseGrid:Ht,fillLayerSrc:et,shapeLayerSrc:Dt,superformulaSrc:gt,mirrorStripesSrc:bt,plasmaSrc:Pt,patternNoiseSrc:vt,patternCellsSrc:Ut,patternTilesSrc:tn,patternPolarSrc:$t,patternGeometrySrc:bn,electricNoiseSrc:vn,plexusSrc:mo,universeWithinSrc:Ft,fractalFoldSrc:on,topoContourSrc:Un,src:lt,shape:Pn,solid:Mt,o0:h,o1:Fn,o2:Zn,o3:Sn,s0:On,s1:Hn}=we,Qt=()=>n.current?.synth?.time??0;if(!(typeof Ye>"u"||typeof ze>"u")){Ql();try{if(!k())return;let wn=()=>{let g=0;if(l.current.active){let T=(performance.now()-l.current.startTime)/l.current.duration;T>=1&&(T=1,l.current.active=!1,m.current=m.current===0?1:0),g=T<.5?4*T*T*T:1-Math.pow(-2*T+2,3)/2}return Math.max(0,Math.min(1,g))},an=()=>wn(),Tn=()=>m.current===0?an():1-an(),Mn=()=>l.current.active?l.current.resolvedType:Math.max(0,Math.min(_p,Math.round(Number(k()?.transition?.params?.type??0)))),xn=Mn(),Jn=g=>!l.current.active||!g||Mn()!==ln.zoom?1:1+(1-an())*2,Go=g=>!l.current.active||Mn()!==ln.clap?1:Ah(an(),g),no=()=>Lr*Jn(m.current===1),er=()=>Lr*Jn(m.current===0),oo=()=>{let g=Jn(m.current===1);return g!==1?Lr*g:Lr*Go(m.current===1)},Vr=()=>{let g=Jn(m.current===0);return g!==1?Lr*g:Lr*Go(m.current===0)},Rr=()=>!l.current.active||m.current!==1||!T1(Mn())?0:1-an(),Ar=()=>!l.current.active||m.current!==0||!T1(Mn())?0:1-an(),bo=()=>{let g=Mn();if(!l.current.active||g!==ln.pixelate)return 1e4;let Pe=an();return 1e4-(1-Math.abs(Pe-.5)*2)*9900},$r=()=>!l.current.active||Mn()!==ln.slide?0:Eh(an())*.05,tr=()=>{if(l.current.active&&Mn()===ln.clap){let g=an()<.5?0:1;return m.current===0?g:1-g}return Tn()},un=()=>{let g=ie().s0?.src;if(g instanceof HTMLVideoElement&&g.videoWidth>0&&g.videoHeight>0)return g.videoWidth/g.videoHeight;let Pe=B.current;return Pe&&Pe.height>0?Pe.width/Pe.height:16/9},Uo=()=>{if(!r.current)return 1;let g=B.current;return g?zp(un(),g.width,g.height).scaleX:1},nr=()=>{if(!r.current)return 1;let g=B.current;return g?zp(un(),g.width,g.height).scaleY:1},pr=(g,Pe)=>{if(!k()?.[Pe]?.enabled)return g;let T=()=>_n(Pe,k()?.[Pe],go(),qL),I=()=>p(Pe,"contrast",1),W=()=>p(Pe,"hue",0)/360,q=()=>Math.max(0,Math.min(2,p(Pe,"saturation",1)));return g.brightness(T).contrast(I).hue(W).saturate(q)},Yn=(g,Pe,T,I)=>{let W=lt(g).scale(()=>Pe()*Uo(),()=>T()*nr()).scrollX(I).pixelate(bo,bo);if(xn===ln.slide){let q=$r,te=()=>Math.min(.4,q()*8);W=W.blend(lt(g).scale(()=>Pe()*Uo(),()=>T()*nr()).scrollX(()=>I()-q()).pixelate(bo,bo),te).blend(lt(g).scale(()=>Pe()*Uo(),()=>T()*nr()).scrollX(()=>I()+q()).pixelate(bo,bo),te)}return pr(W,"colorAdjust")},mr=Yn(On,no,oo,Rr),zo=Yn(Hn,er,Vr,Ar),F;if(xn===ln.mask){let g=()=>Tn()*1.55;F=mr.layer(zo.mask(Pn(100,g,.07)))}else F=mr.blend(zo,tr);let Bo=ie().__hydraIsolateFxKey,Ie=Bo?[{kind:"fx",key:Bo}]:ab([...gc({activeChain:o.current.activeChain,activeFxList:o.current.activeFxList,fxGroups:o.current.fxGroups})],o.current.activeFxList??[]);if(Wm(Ie).includes("timeGlitch")){let g=()=>y1()?_n("timeGlitch",k()?.timeGlitch,go(),Xn):0;F=F.timeGlitchSlices(b1(),g)}let We=g=>{let Pe=co(g);return Pe?lt(Pe):null},ke=(g,Pe=Xn)=>{let T=at?.templateKey===g?at.effectKey:void 0;return()=>{if(T){let I=M(String(g),T);if(I)return _n(T,I,go(),Pe)}return at?.templateKey===g?_n(at.effectKey,at.config,go(),Pe):_n(String(g),k()?.[g],go(),Pe)}},St={chainStack:[Wn(F)],layerSourceStack:[]},en=g=>({chainStack:St.chainStack,getMaskReveal:()=>re(g,"maskReveal",0),getMaskReach:()=>re(g,"maskReach",0),getMaskThreshold:()=>re(g,"maskThreshold",.35),getMaskSoftness:()=>re(g,"maskSoftness",.12),getMaskInvert:()=>re(g,"maskInvert",0)}),pt=(g,Pe)=>iy(g,{hydraRef:n,effectKey:Pe,hydra:{fillLayerSrc:et,shapeLayerSrc:Dt,superformulaSrc:gt,plasmaSrc:Pt,patternNoiseSrc:vt,patternCellsSrc:Ut,patternTilesSrc:tn,patternPolarSrc:$t,patternGeometrySrc:bn,electricNoiseSrc:vn,plexusSrc:mo,universeWithinSrc:Ft,fractalFoldSrc:on,topoContourSrc:Un,gaussianNoiseGrid:Ht,noise:ze,solid:Mt,src:lt,s0:On,s1:Hn},activeChannelRef:m,renderQualityRef:O,electricNoiseCirclePackRef:X,liveHydraBands:go}),At=null,wt=null,pn=null,eo=g=>{let Pe=at?.templateKey===g?at.config:k()?.[g];if(Pe&&!(!Pe.enabled&&Bo!==g)){if(g==="layerBlend"){let T=ke("layerBlend"),{s2:I}=ie(),W=vo(Number(Pe.params?.mode)||0),q=lt(I).scale(Lr);F=Oo({chain:F,layerSrc:q,mode:W,getAmount:T,solid:Mt,getLayerLuma:()=>{let se=T();return se<1e-5?2:se},layerSourceStack:St.layerSourceStack})}if(g==="shatterLayer"){let T=ke("shatterLayer"),I=()=>p("shatterLayer","density",14),W=()=>p("shatterLayer","gap",.065),q=()=>p("shatterLayer","scatter",.62),te=()=>p("shatterLayer","irregularity",.82),{s2:se}=ie(),_e=Math.round(Number(Pe.params?.mode)||0)>=1?lt(se).scale(Lr):Mt(0,0,0);F=F.shatterLayerCoord(T,I,q,te).shatterLayerGap(_e,T,I,W,te)}if(g==="videoMap"){let T=ke("videoMap"),{s2:I}=ie(),W=Math.max(0,Math.min(1,Math.round(Number(Pe.params?.mode)||0))),q=Math.round(Number(Pe.params?.invert)||0)>=1;if(W>=1){let te=()=>{let se=T();return(q?-se:se)*.5};F=F.modulate(lt(I),te)}else{let te=()=>p("videoMap","invert",0),se=()=>p("videoMap","threshold",.35),_e=()=>p("videoMap","softness",.12);F=F.videoMapMask(lt(I),T,te,se,_e)}}if(g==="playbackCue"){let{s2:T}=ie();T&&(F=Oo({chain:F,layerSrc:lt(T).scale(Lr),mode:4,getAmount:()=>1,solid:Mt,layerWithoutLuma:!0,layerSourceStack:St.layerSourceStack}))}if(g==="maskVideo"){let T=()=>p("maskVideo","size",.22),I=()=>p("maskVideo","shuffle",.35),W=()=>{let se=Math.max(0,I()),_e=se<=0?0:Math.floor(Qt()*se);return r1(_e,T(),window.innerWidth/Math.max(1,window.innerHeight))},q=(se,_e,Ue)=>Wn(F).scale(se,se).scrollX(_e).scrollY(Ue),te=se=>{let _e=()=>W()[se];F=F.maskVideoRectCutout(q(()=>_e().zoom,()=>_e().panX,()=>_e().panY),()=>_e().cx,()=>_e().cy,()=>_e().halfWx,()=>_e().halfHy)};te(0),te(1),te(2)}if(g==="midlineStretch"){let T=ke("midlineStretch"),I=()=>p("midlineStretch","splitY",.5);F=F.midlineStretch(T,I)}if(g==="centerDiffuse"){let T=ke("centerDiffuse"),I=()=>p("centerDiffuse","centerY",.5),W=()=>p("centerDiffuse","band",.06),q=()=>p("centerDiffuse","diffusion",.72);F=F.centerStripMap(T,I,W,q),F=F.modulateScrollY(ze(5,.05).scale(1,10).scrollY(()=>T()*q()*.035),()=>T()*q()*.24)}if(g==="circleGlitch"){let T=ke("circleGlitch",{clampMin:0,clampMax:.5,paramMin:0,paramMax:.5}),I=()=>p("circleGlitch","frequency",10),W=()=>p("circleGlitch","spread",.2),q=()=>{let te=T();return te<1e-5?0:te*W()};F=F.modulateScale(Ye(I,.1,0).kaleid(6).mask(Pn(100,.5,.5)),q)}if(g==="glitch"){let T={clampMin:0,clampMax:10,paramMin:0,paramMax:10},I=ke("glitch",T),W=sd(_n("glitch",k()?.glitch,go(),T)),q=()=>Math.min(W,sd(I())),te=()=>Cy(p("glitch","size",5)),se=()=>ld(te()),_e=Gt=>Gt>=q()?0:se(),Ue=()=>Math.max(0,p("glitch","speed",1.15)),Ke=()=>ky(p("glitch","travel",1)),st=()=>Ry(p("glitch","tear",1)),ht=()=>q()<1||se()<1e-5?0:1,Yt=(Gt,nn,gr,Vo)=>()=>{let $a=_e(Vo);if($a<1e-5)return 0;let br=Qt()*Ue(),ji=Math.floor(br*gr),qa=Math.sin(ji*6.283+nn)*.5+Math.sin(ji*4.1+nn*1.7)*.3,Fr=Math.sin(br*(2.2+nn*.3)+nn)*.35;return(qa+Fr)*Gt*st()*$a},Jt=(Gt,nn,gr,Vo)=>()=>_e(Vo)<1e-5?.5:ud(Gt,nn,gr,Vo,Qt(),Ue(),Ke()).pivot,yn=(Gt,nn,gr,Vo)=>()=>_e(Vo)<1e-5?0:ud(Gt,nn,gr,Vo,Qt(),Ue(),Ke()).scroll,Ln=(Gt,nn)=>Pn(4,()=>_e(nn)<1e-5?0:My(Gt.shapeScale,te()),.001).scale(()=>Ly(_e(nn)),()=>cd(Gt.xMult,_e(nn)),()=>cd(Gt.yMult,_e(nn)),Jt(Gt.travelPhaseX,Gt.travelRateX,Gt.travelSpreadX,nn),Jt(Gt.travelPhaseY,Gt.travelRateY,Gt.travelSpreadY,nn)).scrollX(()=>yn(Gt.travelPhaseX,Gt.travelRateX,Gt.travelSpreadX,nn)()+Yt(Gt.tearAmpX,Gt.tearPhaseX,Gt.tearRateX,nn)()).scrollY(()=>yn(Gt.travelPhaseY,Gt.travelRateY,Gt.travelSpreadY,nn)()+Yt(Gt.tearAmpY,Gt.tearPhaseY,Gt.tearRateY,nn)());if(W>=1){let Gt=Ln(ad[W-1],W-1).mult(Mt(ht,ht,ht));for(let nn=W-2;nn>=0;nn--)Gt=Ln(ad[nn],nn).diff(Gt);F=F.diff(Gt)}}if(g==="dataDrip"){let T=ke("dataDrip"),I=()=>p("dataDrip","columns",72),W=()=>p("dataDrip","chaos",.35),q=()=>p("dataDrip","dance",.65),te=()=>p("dataDrip","speed",1);F=F.dataDrip(T,I,W,q,te)}if(g==="liquix"){let T=ke("liquix"),I=()=>p("liquix","pivot",.48),W=()=>p("liquix","bands",56),q=()=>p("liquix","speed",1.28);At&&(A.push({out:At,buffer:Wn(F)}),F=lt(At)),F=F.liquix(T,I,W,q)}if(g==="metalSphere"&&(F=F.metalSphereScene(h,ke("metalSphere"),()=>p("metalSphere","size",1),()=>p("metalSphere","noise",.42),()=>p("metalSphere","detail",3.5),()=>p("metalSphere","speed",.75),()=>p("metalSphere","roughness",.1),()=>p("metalSphere","reflection",1.05),()=>p("metalSphere","rotation",.35),()=>un())),g==="pulseMarch"&&(F=F.pulseMarchColor(ke("pulseMarch"),()=>p("pulseMarch","morph",.55),()=>p("pulseMarch","speed",1.1),()=>p("pulseMarch","detail",4.5),()=>p("pulseMarch","glow",.65))),g==="warpTunnel"){let T=m.current===0?On:Hn,I=()=>{let q=k()?.warpTunnel;return q?So("warpTunnel",q.syncBand??"master",go())*(q.syncMultiplier??.45):0},W=()=>ca(O.current).warpTunnelQuality;F=F.warpTunnelColor(T,ke("warpTunnel"),()=>p("warpTunnel","speed",.55),()=>p("warpTunnel","refraction",.72),()=>p("warpTunnel","shine",.68),()=>p("warpTunnel","arms",3),()=>p("warpTunnel","fog",.62),I,W)}if(g==="throughTheStars"){let T=We("throughTheStars");if(Fe.current&&T){let I=ke("throughTheStars");St.layerSourceStack.push(T);let W=()=>p("throughTheStars","glow",.74);F=F.throughTheStarsOverlay(T,I,W)}}if(g==="distortion"){let T=ke("distortion"),I=()=>Math.round(p("distortion","mode",0)),W=()=>Math.max(.2,p("distortion","curvature",.9)),q=I();if(q>=1){let te=()=>{let st=T();return typeof st=="number"?Math.max(0,Math.min(1,st))*.14:0},se=()=>p("distortion","speed",1.2)*Qt()*2.2,_e=()=>Math.max(.5,p("distortion","frequency",10)),Ue=()=>q-1,Ke=()=>Math.max(.2,p("distortion","centerFocus",1.4));F=F.scale(()=>window.innerWidth/window.innerHeight,1).oscilloscopeDistort(te,_e,se,Ue,Ke).scale(()=>window.innerHeight/window.innerWidth,1)}else F=F.lensDistort(T,W)}if(g==="wetLens"){let T=ke("wetLens"),I=()=>p("wetLens","density",18),W=()=>p("wetLens","speed",.26),q=()=>p("wetLens","refraction",.76),te=()=>p("wetLens","highlights",.42),se=()=>p("wetLens","gravity",.74);F=F.wetLensDistort(T,I,W,q,se).wetLensOverlay(T,I,W,te,se)}if(g==="pixelSort"){let T=ke("pixelSort"),I=m.current===0?On:Hn,W=()=>p("pixelSort","threshold",.45),q=()=>p("pixelSort","reach",.4),te=()=>p("pixelSort","chaos",.7),se=()=>Math.max(0,Math.min(3,Math.round(p("pixelSort","direction",0))));F=F.pixelSortSmear(I,T,W,q,te,se)}if(g==="emberHeat"){let T=ke("emberHeat"),I=()=>p("emberHeat","speed",.8),W=()=>p("emberHeat","density",22),q=()=>p("emberHeat","waves",.76),te=()=>p("emberHeat","glow",.82),se=()=>p("emberHeat","intensity",.78);F=F.emberHeatDistort(T,I,W,q).emberHeatOverlay(T,W,I,te,q,se).emberHeatFlow(lt(h).scrollY(()=>-(.0016+I()*8e-4)),T,q)}if(g==="normalMap"){let T=ke("normalMap"),I=m.current===0?On:Hn,W=()=>p("normalMap","source",1),q=()=>p("normalMap","scale",12),te=()=>p("normalMap","refraction",.55),se=()=>W()>=.5?.45:p("normalMap","lighting",.45),_e=()=>p("normalMap","specular",.4),Ue=()=>p("normalMap","lightX",.65),Ke=()=>p("normalMap","lightY",.35),st=()=>p("normalMap","detail",1.05);W()<.5&&(F=F.normalMapDistort(T,q,()=>.2,te,st)),F=F.normalMapLight(I,T,W,q,()=>.2,se,_e,Ue,Ke,st)}if(g==="reactionDiffusion"){let T=ke("reactionDiffusion"),I=Ri(()=>n.current?.o?.[1]);F=F.reactionDiffusionOverlay(lt(I),T)}if(g==="lumaDust"){let T=We("lumaDust");if(Qe.current&&T){let I=ke("lumaDust");St.layerSourceStack.push(T),F=F.lumaDustOverlay(T,I)}}if(g==="lumaLock"){let T=We("lumaLock");if(Ze.current&&T){let I=ke("lumaLock");St.layerSourceStack.push(T),F=F.lumaLockOverlay(T,I,()=>.45)}}if(g==="concentricRotate"&&(F=F.concentricRotateDistort(ke("concentricRotate"),()=>p("concentricRotate","mode",0),()=>p("concentricRotate","rings",7),()=>p("concentricRotate","step",.08),()=>p("concentricRotate","speed",.25),()=>p("concentricRotate","centerX",.5),()=>p("concentricRotate","centerY",.5))),g==="ripple"){let T=ke("ripple"),I=()=>p("ripple","frequency",8),W=()=>p("ripple","speed",1),q=()=>p("ripple","decay",.5),te=()=>p("ripple","centerX",.5),se=()=>p("ripple","centerY",.5);F=F.rippleDistort(T,I,W,q,te,se)}if(g==="randomGallery"){let T=ke("randomGallery"),I=()=>p("randomGallery","cells",7),W=()=>p("randomGallery","speed",.72),q=()=>p("randomGallery","refraction",.78),te=()=>p("randomGallery","drift",.78);F=F.randomGalleryDistort(T,I,W,q,te)}if(g==="gridShuffle"){let T=()=>{let q=k()?.gridShuffle;return q?.enabled?Math.max(0,Math.min(1,Number(q.base??1))):0},I=()=>p("gridShuffle","cells",4),W=()=>p("gridShuffle","chaos",1);F=F.gridShuffleDistort(T,I,W,s1)}if(g==="customShader"){let T=Math.round(Number(Pe.params?.shaderType??0)),I=typeof Pe.params?.code=="string"?Pe.params.code:ch(T),W=n.current?.synth;if(W?.setFunction){let q=uh(I,T);W.setFunction({name:"customShaderOp",type:q.type,inputs:[{type:"float",name:"amount",default:0}],glsl:q.glsl})}F=F.customShaderOp(ke("customShader"))}if(g==="mask"){let T=ke("mask"),I=()=>Math.max(0,Math.min(40,p("mask","frequency",20))),W=()=>p("mask","speed",.32),q=()=>p("mask","rotation",.15),te=()=>p("mask","balance",.46),se=Math.max(0,Math.min(4,Math.round(Number(Pe.params?.shape??0)))),_e=Math.max(0,Math.min(3,Math.round(Number(Pe.params?.mode??0)))),Ue;se===0?Ue=Ye(I,W,0).rotate(q).luma(te,.05):se===1?Ue=Ne(I,W,q,te):se===2?Ue=qe(I,W,q,te):se===3?Ue=ze(1,W).scale(()=>1/Math.max(.5,I())).thresh(te,1e-4):Ue=Je(I,W,q,te,()=>p("mask","perspective",.75),()=>p("mask","focus",1)),_e===0?F=F.mask(Mt(1,1,1).blend(Ue,T)):_e===1?F=F.diff(Ue.mult(Mt(T,T,T))):_e===2?F=F.add(Ue,T):F=F.mult(Mt(1,1,1).blend(Ue,T))}if(g==="zoom"&&(F=F.scale(ke("zoom",{whenDisabled:1,paramMin:.5,paramMax:2,clampMin:.5,clampMax:2}))),g==="pulse"){let T=ke("pulse"),I=()=>p("pulse","breath",.5),W=()=>p("pulse","bloom",.45),q=()=>1+T()*I()*.06;F=F.scale(q).pulseGrade(T,W)}if(g==="scroll"){let T=ke("scroll",{map:W=>W*Qt()}),I=()=>{let W=p("scroll","y",0);return W?W*Qt():0};F=F.scrollX(T).scrollY(I)}if(g==="wrap"){let T=ke("wrap",{clampMin:-1,clampMax:1}),I=()=>p("wrap","centerX",.5),W=()=>p("wrap","centerY",.5),q=()=>p("wrap","radius",.75),te=()=>p("wrap","falloff",.5),se=()=>p("wrap","twist",0);F=F.customWrap(T,I,W,q,te,se)}if(g==="mirror"){let T=ke("mirror"),I=()=>Math.max(0,Math.min(3,Math.round(p("mirror","axis",0)))),W=()=>p("mirror","angle",0),q=()=>Number(p("mirror","flip",0))>=.5?1:0,te=()=>p("mirror","centerX",.5),se=()=>p("mirror","centerY",.5);F=F.customMirror(T,I,W,q,te,se)}if(g==="tile"){let T=ke("tile"),I=()=>Math.max(1,Math.min(12,Math.round(p("tile","cols",3)))),W=()=>Math.max(1,Math.min(12,Math.round(p("tile","rows",3))));F=F.customTile(T,I,W)}if(g==="vibration"){let T=()=>Zy(k()?.vibration,ie().vibrationAmp??0),I=()=>Math.max(2,p("vibration","frequency",12));F=F.vibrationDistort(T,I)}if(g==="shake"){let T=ke("shake"),I=()=>p("shake","speed",1),W=()=>p("shake","bounce",.55),q=()=>p("shake","roll",.4),te=()=>p("shake","zoom",.45);F=F.shakeDistort(T,I,W,q,te)}if(g==="rotate"&&(F=F.rotate(ke("rotate",{paramMin:-Math.PI,paramMax:Math.PI}),()=>0)),g==="rgbDelay"){let T=ke("rgbDelay"),I=q=>()=>e1(T(),q),W=()=>t1(T());F=F.blend(lt(h).scrollX(I(-1)).color(1,0,0).add(lt(h).color(0,1,0)).add(lt(h).scrollX(I(1)).color(0,0,1)),W)}if(g==="chromaticAberration"){let T=ke("chromaticAberration"),I=()=>p("chromaticAberration","direction",.125)*Math.PI*2,W=te=>()=>md(T(),I(),te).x,q=te=>()=>md(T(),I(),te).y;F=F.blend(lt(h).scrollX(W(1)).scrollY(q(1)).color(1,0,0).add(lt(h).color(0,1,0)).add(lt(h).scrollX(W(-1)).scrollY(q(-1)).color(0,0,1)),()=>o1(T()))}if(g==="degauss"){let T=()=>jy(k()?.degauss,ie().degaussAmp??0),I=()=>p("degauss","frequency",12),W=()=>p("degauss","speed",1.4),q=()=>p("degauss","fringe",.55);F=F.degaussDistort(T,I,W),F=F.blend(lt(h).scrollX(()=>T()*q()*.034).scrollY(()=>T()*q()*.012).color(1,.15,.15).add(lt(h).color(.12,1,.12)).add(lt(h).scrollX(()=>-T()*q()*.034).scrollY(()=>-T()*q()*.012).color(.15,.15,1)),()=>T()*q()*.78)}if(g==="vhs"){let T=ke("vhs"),I=()=>p("vhs","tracking",.48),W=()=>p("vhs","speed",1),q=()=>p("vhs","noise",.38),te=()=>p("vhs","lines",.52),se=()=>p("vhs","dropout",.28),_e=()=>p("vhs","bleed",.42);F=F.vhsDistort(T,I,W),F=F.vhsColor(T,q,te,se),F=F.blend(lt(h).scrollX(()=>T()*_e()*.024).color(1,.06,.06).add(lt(h).color(.04,1,.04)).add(lt(h).scrollX(()=>-T()*_e()*.024).color(.06,.06,1)),()=>T()*_e()*.44)}if(g==="negative"&&(F=F.invert(ke("negative"))),g==="dither"){let T=Lc("blue64");F=F.dither(T,ke("dither"),()=>p("dither","binary",0),()=>p("dither","balance",.5),()=>p("dither","scale",4))}if(g==="rampGradient"){let T=ke("rampGradient"),I=()=>gh((_e,Ue)=>p("rampGradient",_e,Ue),k()?.rampGradient?.params),W=(_e,Ue)=>()=>I()[_e].rgb[Ue],q=_e=>()=>I()[_e].p,te=()=>p("rampGradient","animate",0),se=()=>p("rampGradient","speed",.45);F=F.rampGradient(T,()=>p("rampGradient","stopCount",3),W(0,0),W(0,1),W(0,2),q(0),W(1,0),W(1,1),W(1,2),q(1),W(2,0),W(2,1),W(2,2),q(2),W(3,0),W(3,1),W(3,2),q(3),W(4,0),W(4,1),W(4,2),q(4),W(5,0),W(5,1),W(5,2),q(5),te,se)}if(g==="answerPrint"&&(F=F.answerPrint(ke("answerPrint"),()=>p("answerPrint","stock",0),()=>p("answerPrint","density",1))),g==="hdr"&&(F=F.hdrGrade(ke("hdr"),()=>p("hdr","blackFloor",.08),()=>p("hdr","highlights",.85),()=>p("hdr","knee",.5))),g==="colorLayer"&&(F=pr(F,"colorLayer")),g==="encodeGlitch"){let T=ke("encodeGlitch"),I=()=>p("encodeGlitch","macroBlock",.5),W=()=>p("encodeGlitch","tear",.35);F=F.encodingGlitch(T,I,W)}if(g==="edge"){let T=ke("edge"),I=()=>p("edge","threshold",.32),W=()=>p("edge","soften",.25),q=()=>p("edge","strength",1),te=()=>p("edge","thickness",.35),se=()=>{let ht=te(),Yt=I();return Ey(ht,Yt,C1())},_e=()=>Py(se(),C1()),Ue=Wn(F),Ke=Wn(F).scrollX(se).scrollY(se),st=Ue.edgeDiff(Ke,I,W,q,_e);F=F.add(st,T)}if(g==="kaleid"){let T=ke("kaleid",{clampMin:0,clampMax:24,paramMin:0,paramMax:24}),I=()=>T()>.1,W=()=>p("kaleid","angle",0),q=()=>I()?p("kaleid","videoX",0):0,te=()=>I()?p("kaleid","videoY",0):0,se=()=>{let Ke=B.current,st=p("kaleid","videoZoom",1);if(!Ke||Ke.height<=0){let ht=Math.max(.25,st);return{scaleX:ht,scaleY:ht}}return L_(un(),Ke.width,Ke.height,st)},_e=()=>I()?se().scaleX:1,Ue=()=>I()?se().scaleY:1;F=F.scale(_e,Ue,.5,.5).scrollX(q).scrollY(te).customKaleid(T,W)}if(g==="glow"){let T=ke("glow"),I=()=>p("glow","threshold",.48),W=()=>p("glow","bloom",.55),q=()=>Fy(W(),T()),te=()=>Oy(W(),T());if(F=F.glow(T,I,W),ca(O.current).glowAura){let se=Hy(O.current),_e=Math.max(...se.map(([ht])=>Math.abs(ht)),1),Ue=ht=>()=>ht/_e*q(),Ke=Mt(0,0,0,0);for(let[ht,Yt]of se)Ke=Ke.add(lt(h).scrollX(Ue(ht)).glowHighlight(I,W),Yt);F=F.glowBloomAdd(Ke,te);let st=Mt(0,0,0,0);for(let[ht,Yt]of se)st=st.add(lt(h).scrollY(Ue(ht)).glowHighlight(I,W),Yt);F=F.glowBloomAdd(st,te)}}if(g==="hitStreak"){let T=ke("hitStreak"),I=()=>p("hitStreak","length",.58),W=()=>Math.round(p("hitStreak","mode",0)),q=()=>p("hitStreak","threshold",.6),te=()=>p("hitStreak","decay",.72),se=()=>Dy(q()),_e=()=>Iy(I(),T(),te()),Ue=()=>By(T(),te()),Ke=Ic(O.current),st=Jt=>Jt.hitStreakExtract(q,se),ht=Mt(0,0,0,0),Yt=W();if(Yt===1)for(let[Jt,yn]of Ke){let Ln=()=>1+Jt*_e()*.038;ht=ht.add(st(lt(h).scale(Ln,Ln,.5,.5)),yn)}else if(Yt===2)for(let[Jt,yn]of Ke){let Ln=()=>Jt*_e();ht=ht.add(st(lt(h).scrollX(Ln).scrollY(()=>Ln()*.72)),yn)}else for(let[Jt,yn]of Ke)ht=ht.add(st(lt(h).scrollX(()=>Jt*_e())),yn);F=F.add(ht,Ue)}if(g==="lens7c"){let T=ke("lens7c"),I=pn??(m.current===0?On:Hn);pn&&(A.push({out:pn,buffer:Wn(F)}),F=lt(pn)),F=F.lens7cPrism(I,T,()=>Wy(p("lens7c","spread",.55),T()),()=>p("lens7c","rotation",0),()=>p("lens7c","threshold",.42),()=>p("lens7c","haze",.5))}if(g==="pixelate"){let T=ke("pixelate",zg),I=()=>Vg(T());F=F.pixelate(I,I)}if(g==="lumaGridSquares"){let T=ke("lumaGridSquares"),I=()=>Math.max(4,Math.min(194,Math.round(p("lumaGridSquares","cols",32)))),W=()=>Ay(I(),window.innerWidth,window.innerHeight),q=()=>p("lumaGridSquares","minSize",.14),te=()=>p("lumaGridSquares","maxSize",.88),se=()=>pd(T(),I(),W()).pix,_e=()=>pd(T(),I(),W()).pixRows;F=F.pixelate(se,_e).lumaGridSquares(T,I,W,q,te)}if(g==="pointCloud"){let T=ke("pointCloud"),I=()=>Math.max(4,Math.min(194,Math.round(p("pointCloud","cols",32)))),W=()=>Math.max(2,Math.round(I()*(window.innerHeight/Math.max(1,window.innerWidth)))),q=()=>p("pointCloud","minSize",.12),te=()=>p("pointCloud","maxSize",.85),se=()=>p("pointCloud","depth",.58),_e=()=>p("pointCloud","parallax",.78),Ue=()=>p("pointCloud","blur",.5),Ke=()=>p("pointCloud","fog",.4);F=F.pointCloudRemap(T,I,W,q,te,se,_e,Ue,Ke)}if(g==="lumaLines"){let T=ke("lumaLines"),I=()=>Math.max(4,Math.min(100,Math.round(p("lumaLines","cols",52)))),W=()=>p("lumaLines","minWidth",.1),q=()=>p("lumaLines","maxWidth",.8),te=()=>p("lumaLines","rotation",0),se=()=>T()<1e-5?1e4:I();F=F.pixelate(se,se).lumaLines(T,I,W,q,te)}if(g==="lumaPrint"){let T=ke("lumaPrint"),I=()=>p("lumaPrint","mode",2),W=()=>Math.max(4,Math.min(194,Math.round(p("lumaPrint","density",24)))),q=()=>Math.max(2,Math.round(W()*(window.innerHeight/Math.max(1,window.innerWidth)))),st=[T,I,W,()=>p("lumaPrint","contrast",.48),()=>p("lumaPrint","wave",.35),()=>p("lumaPrint","iconSet",0),()=>p("lumaPrint","shape",0),()=>p("lumaPrint","rotation",0)],ht=()=>T()<1e-5?M1():W(),Yt=()=>T()<1e-5?M1():q();F=I()<3?F.pixelate(ht,Yt).lumaPrint(...st):F.lumaPrint(...st)}if(g==="fillLayer"){let T=ke("fillLayer"),I=()=>k()?.fillLayer?.params,W=()=>cn(I()?.colorA,"#7c3aed")[0],q=()=>cn(I()?.colorA,"#7c3aed")[1],te=()=>cn(I()?.colorA,"#7c3aed")[2],se=()=>cn(I()?.colorB,"#06b6d4")[0],_e=()=>cn(I()?.colorB,"#06b6d4")[1],Ue=()=>cn(I()?.colorB,"#06b6d4")[2],Ke=()=>Math.max(0,Math.min(3,Math.round(Number(p("fillLayer","type",1))))),st=()=>Math.max(0,Math.min(3,Math.round(Number(p("fillLayer","sweep",0))))),ht=()=>p("fillLayer","softness",.35),Yt=vo(Number(p("fillLayer","mode",0))),Jt=()=>{let Ln=T();return Ln<1e-5?2:Ln},yn=typeof et=="function"?et(W,q,te,se,_e,Ue,Ke,ht,st).scale(()=>window.innerWidth/window.innerHeight,1):Mt(1,0,0);F=Oo({chain:F,layerSrc:yn,mode:Yt,getAmount:T,solid:Mt,getLayerLuma:Jt,layerSourceStack:St.layerSourceStack})}if(g==="mirrorStripes"){let T=ke("mirrorStripes"),I=()=>k()?.mirrorStripes?.params,yn=typeof bt=="function"?bt(()=>cn(I()?.color,"#ff1a1a")[0],()=>cn(I()?.color,"#ff1a1a")[1],()=>cn(I()?.color,"#ff1a1a")[2],()=>p("mirrorStripes","scale",.82),()=>p("mirrorStripes","spread",.48),()=>p("mirrorStripes","density",.55),()=>p("mirrorStripes","thickness",.55),()=>Ia(p("mirrorStripes","layers",4)),()=>p("mirrorStripes","rotate",0),()=>p("mirrorStripes","randomness",0),()=>Number(p("mirrorStripes","mirror",1))>=.5?1:0):Mt(1,.1,.1);St.layerSourceStack.push(yn),F=F.add(yn,T)}if(g==="noise"){let T=ke("noise"),I=()=>Math.max(8,Math.min(8192,p("noise","scale",1681))),W=()=>.22*Math.pow(Math.min(3,Math.max(0,Number(p("noise","speed",.15)))),1.35),q=vo(Number(p("noise","mode",3))),te=()=>{let _e=T();return _e<1e-5?2:_e},se=Ht!=null?Ht(()=>I(),()=>W()).scale(()=>window.innerWidth/window.innerHeight,1):ze(()=>Math.max(.05,I()*.12),()=>.02+W()*1.25).saturate(0).scale(()=>window.innerWidth/window.innerHeight,1);F=Oo({chain:F,layerSrc:se,mode:q,getAmount:T,solid:Mt,getLayerLuma:te,layerSourceStack:St.layerSourceStack})}if(g==="plasma"){let T=ke("plasma"),I=()=>p("plasma","speed",1.1),W=()=>p("plasma","scale",1),q=()=>p("plasma","complexity",1),te=vo(Number(p("plasma","mode",0))),se=()=>{let Ue=T();return Ue<1e-5?2:Ue},_e=typeof Pt=="function"?Pt(I,W,q):Mt(.5,.2,.9);F=Oo({chain:F,layerSrc:_e,mode:te,getAmount:T,solid:Mt,getLayerLuma:se,layerSourceStack:St.layerSourceStack})}if(g==="patternLayer"){let T=ke("patternLayer"),I=()=>k()?.patternLayer?.params,W=()=>cn(I()?.colorA,"#0b1020")[0],q=()=>cn(I()?.colorA,"#0b1020")[1],te=()=>cn(I()?.colorA,"#0b1020")[2],se=()=>cn(I()?.colorB,"#22d3ee")[0],_e=()=>cn(I()?.colorB,"#22d3ee")[1],Ue=()=>cn(I()?.colorB,"#22d3ee")[2],Ke=()=>Math.max(0,Math.min(3,Math.round(Number(p("patternLayer","variant",2))))),st=()=>Math.max(0,Math.min(10,Math.round(Number(p("patternLayer","geometry",0))))),ht=()=>p("patternLayer","scale",1),Yt=()=>p("patternLayer","speed",.4),Jt=()=>p("patternLayer","warp",0),yn=()=>Ns(ht()),Ln=()=>p("patternLayer","symmetry",2),Gt=Math.max(0,Math.min(5,Math.round(Number(p("patternLayer","type",1))))),nn=vo(Number(p("patternLayer","mode",0))),gr=()=>{let br=T();return br<1e-5?2:br},Vo=Ri(()=>n.current?.o?.[3]),$a=(()=>{if(Gt===4){n.current?.synth?.setFunction?.({name:"patternTuringDisplay",type:"src",inputs:[...la],glsl:Ha(cn(I()?.colorA,"#0b1020"),cn(I()?.colorB,"#22d3ee"))});let qa=we.patternTuringDisplay;return qa?qa(Vo,Ke,yn,Ln):lt(Vo)}if(Gt===5)return typeof bn=="function"?bn(st,ht,Yt,Jt,W,q,te,se,_e,Ue):Mt(.1,.6,.9);let br=Gt===1?Ut:Gt===2?tn:Gt===3?$t:vt;return typeof br=="function"?br(Ke,ht,Yt,Jt,W,q,te,se,_e,Ue):Mt(.1,.6,.9)})();F=Oo({chain:F,layerSrc:$a,mode:nn,getAmount:T,solid:Mt,getLayerLuma:gr,layerSourceStack:St.layerSourceStack})}if(g==="electricNoise"){let T=()=>Math.max(0,Math.min(1,p("electricNoise","amount",1))),I=()=>p("electricNoise","speed",1),W=()=>p("electricNoise","scale",1),q=()=>p("electricNoise","noiseScale",1),te=()=>p("electricNoise","turbulence",.2),se=()=>p("electricNoise","detail",5),_e=()=>p("electricNoise","intensity",1.4),Ue=()=>p("electricNoise","rings",.85),Ke=()=>p("electricNoise","ringPower",.9),st=()=>k()?.electricNoise?.params,ht=()=>cn(st()?.color,"#331a66")[0],Yt=()=>cn(st()?.color,"#331a66")[1],Jt=()=>cn(st()?.color,"#331a66")[2],yn=()=>X.current,Ln=()=>yn().count,Gt=vo(Number(Pe.params?.mode)||0),nn=typeof vn=="function"?vn(kc(),I,W,q,te,se,_e,Ue,Ke,jL,Ec(),Ln,ht,Yt,Jt):Mt(.2,.1,.4);F=Oo({chain:F,layerSrc:nn,mode:Gt,getAmount:T,solid:Mt,layerSourceStack:St.layerSourceStack})}if(g==="plexus"){let T=ke("plexus"),I=()=>p("plexus","speed",1),W=()=>Fc(p("plexus","points",1.5),O.current),q=()=>p("plexus","intensity",1),te=()=>Pc(p("plexus","layers",4),O.current),se=()=>p("plexus","glow",1.2),_e=()=>{let st=k()?.plexus;return st?So("plexus",st.syncBand??"master",go())*(st.syncMultiplier??.45):0},Ue=Pe.params?.mode??0,Ke=typeof mo=="function"?mo(I,W,q,te,se,_e):Mt(.4,.15,.85);F=Oo({chain:F,layerSrc:Ke,mode:Number(Ue),getAmount:T,solid:Mt,layerSourceStack:St.layerSourceStack})}if(g==="superformula"){let T=ke("superformula"),I=()=>k()?.superformula?.params,W=()=>Math.max(0,Math.min(2,Math.round(Number(p("superformula","look",2))))),q=()=>p("superformula","m",7.6),te=()=>p("superformula","n1",.36),se=()=>p("superformula","n2",2.16),_e=()=>p("superformula","size",.48),Ue=()=>p("superformula","speed",.35),Ke=()=>p("superformula","glow",1.2),st=()=>cn(I()?.color,"#c4b5fd")[0],ht=()=>cn(I()?.color,"#c4b5fd")[1],Yt=()=>cn(I()?.color,"#c4b5fd")[2],Jt=vo(Number(p("superformula","mode",2))),yn=typeof gt=="function"?gt(W,q,te,se,_e,Ue,Ke,st,ht,Yt):Mt(.77,.71,.99);F=Oo({chain:F,layerSrc:yn,mode:Jt,getAmount:T,solid:Mt,layerWithoutLuma:!0,layerSourceStack:St.layerSourceStack})}if(g==="topoContour"){let T=m.current===0?On:Hn,I=ke("topoContour"),W=()=>p("topoContour","scale",1),q=()=>Math.max(2,Math.min(24,Math.round(p("topoContour","lines",10)))),te=()=>p("topoContour","speed",1),se=()=>p("topoContour","valley",.12),_e=()=>p("topoContour","lineWidth",1),Ue=()=>p("topoContour","videoTint",.35),Ke=()=>Math.max(0,Math.min(1,Math.round(p("topoContour","palette",0)))),st=vo(Number(Pe.params?.mode)||0),ht=typeof Un=="function"?Un(T,W,q,te,se,_e,Ue,Ke):Mt(0,0,0);F=Oo({chain:F,layerSrc:ht,mode:st,getAmount:I,solid:Mt,layerSourceStack:St.layerSourceStack})}if(g==="universeWithin"){let T=ke("universeWithin"),I=()=>p("universeWithin","speed",1),W=()=>p("universeWithin","zoom",1.5),q=()=>Ia(p("universeWithin","layers",4)),te=()=>p("universeWithin","glow",1.2),se=()=>{let Ke=k()?.universeWithin;return Ke?So("universeWithin",Ke.syncBand??"master",go())*(Ke.syncMultiplier??.45):0},_e=vo(Number(Pe.params?.mode)||0),Ue=typeof Ft=="function"?Ft(I,W,q,te,se):Mt(.4,.15,.85);F=Oo({chain:F,layerSrc:Ue,mode:_e,getAmount:T,solid:Mt,layerSourceStack:St.layerSourceStack})}if(g==="fractalFold"){let T=ke("fractalFold"),I=()=>p("fractalFold","foldX",.86),W=()=>p("fractalFold","foldY",1.04),q=()=>p("fractalFold","zoom",1),te=()=>p("fractalFold","speed",.6),se=()=>p("fractalFold","spin",.42),_e=()=>Oc(p("fractalFold","depth",8)),Ue=()=>p("fractalFold","glow",1.4),Ke=()=>p("fractalFold","hue",.12),st=()=>{let Jt=k()?.fractalFold;return Jt?So("fractalFold",Jt.syncBand??"master",go())*(Jt.syncMultiplier??.45):0},ht=vo(Number(Pe.params?.mode)||0),Yt=typeof on=="function"?on(I,W,q,te,se,_e,Ue,Ke,st):Mt(.15,.35,.9);F=Oo({chain:F,layerSrc:Yt,mode:ht,getAmount:T,solid:Mt,layerSourceStack:St.layerSourceStack})}if(g==="blur"){let T=ke("blur",{clampMin:0,clampMax:2}),I=Math.round(Number(Pe.params?.mode??0)),W=I>=0&&I<=2?I:0,q=W===1,te=W===2;At&&(A.push({out:At,buffer:Wn(F)}),F=lt(At));let se=At??h;if(q){let _e=dy(O.current??"full"),Ue=()=>my(T());for(let Ke=1;Ke<=_e;Ke++){let st=Ke;F=F.blend(lt(se).scale(()=>1+T()*.06*(st/Math.max(_e,1))).blurMirrorUv(),()=>Ue()/Math.sqrt(st)*.9)}}else if(te)F=F.blurNoise(T,()=>hy,()=>_y);else{let _e=()=>py(T()),Ue=(Ke,st)=>{let ht=Mt(0,0,0,0);for(let[Yt,Jt]of fy){let yn=()=>Yt/4*_e(),Ln=st==="x"?lt(Ke).scrollX(yn):lt(Ke).scrollY(yn);ht=ht.add(Ln.blurMirrorUv(),Jt)}return ht};wt?(A.push({out:wt,buffer:Ue(se,"x")}),F=Ue(wt,"y")):F=F.blurGaussian(se,T)}}if(g==="sharpen"){let T=ke("sharpen",{clampMin:0,clampMax:2}),I=()=>Math.max(.25,Math.min(2,p("sharpen","radius",1))),W=()=>Sy(I()),q=wy(O.current??"full"),te=Mt(0,0,0,0);for(let se of q)if(se.kind==="center")te=te.add(lt(h),se.weight);else if(se.kind==="scrollX"){let _e=se.sign;te=te.add(lt(h).scrollX(()=>_e*W()),se.weight)}else{let _e=se.sign;te=te.add(lt(h).scrollY(()=>_e*W()),se.weight)}F=F.sharpenUnsharp(te,T)}if(g==="flash"&&(F=F.flashBurst(ke("flash"))),g==="fadeOff"){let T=()=>zy(k()?.fadeOff,ie().customBands);F=F.blend(Mt(0,0,0),T)}if(g==="vignette"){let T=ke("vignette"),I=()=>by(T()),W=()=>p("vignette","radius",.78),q=()=>p("vignette","softness",.42),te=()=>p("vignette","blur",0),se=()=>gy(te()),_e=Ke=>{let st=se();if(st<1e-5)return 0;let ht=1-Ke/Math.max(1,rd);return st*ht},Ue=lt(h);for(let Ke=0;Ke<rd;Ke+=1)Ue=Ue.blurNoise(()=>_e(Ke),()=>xy,()=>vy);F=F.vignetteGrade(Ue,I,W,q,te)}if(g==="feedback"){let T=ke("feedback",{clampMin:.8,clampMax:.99}),I=()=>y.current>0?0:T(),W=()=>p("feedback","scale",1),q=()=>p("feedback","balance",.5);F=F.blend(lt(h).scale(W).feedbackGrade(q),I)}if(g==="paletteRecolor"){let T=ke("paletteRecolor"),I=()=>Math.max(0,Math.min(1,Math.round(Number(p("paletteRecolor","mode",0))))),W=()=>Math.max(2,Math.min(4,Math.round(Number(p("paletteRecolor","colors",3))))),q=()=>ly(ie().s0?.src,W(),p("paletteRecolor","boost",.35),performance.now()),te=se=>()=>q()[se]??0;F=F.paletteRecolor(T,I,W,...Array.from({length:12},(se,_e)=>te(_e)))}if(g==="shapeLayer"){let T=ke("shapeLayer"),I=()=>k()?.shapeLayer?.params,W=()=>cn(I()?.color,"#ffffff")[0],q=()=>cn(I()?.color,"#ffffff")[1],te=()=>cn(I()?.color,"#ffffff")[2],se=()=>Math.max(0,Math.min(4,Math.round(Number(p("shapeLayer","shape",0))))),_e=()=>p("shapeLayer","size",.45),Ue=()=>p("shapeLayer","roundness",0),Ke=()=>p("shapeLayer","stroke",.15),st=()=>Math.max(0,Math.min(1,Math.round(Number(p("shapeLayer","fill",0))))),ht=()=>p("shapeLayer","rotate",0),Yt=()=>p("shapeLayer","centerX",.5),Jt=()=>p("shapeLayer","centerY",.5),yn=vo(Number(p("shapeLayer","mode",4))),Ln=typeof Dt=="function"?Dt(se,_e,Ue,Ke,ht,Yt,Jt,W,q,te,T,st):Mt(1,1,1);F=Oo({chain:F,layerSrc:Ln,mode:yn,getAmount:T,solid:Mt,layerWithoutLuma:!0,layerSourceStack:St.layerSourceStack})}if(g==="string"){let T=ke("string"),I=()=>k()?.string?.params,W=()=>cn(I()?.color,"#f6edd4")[0],q=()=>cn(I()?.color,"#f6edd4")[1],te=()=>cn(I()?.color,"#f6edd4")[2],se=()=>p("string","position",.5),_e=()=>Math.max(0,Math.min(1,Math.round(Number(p("string","orientation",0))))),Ue=()=>p("string","thickness",.42),Ke=()=>p("string","glow",.68),st=()=>Math.max(1,Math.min(3,Math.round(Number(p("string","harmonics",2)))));F=F.stringLayer(()=>1,T,se,_e,Ue,Ke,st,W,q,te)}if(g==="resynthesize"){let T=ke("resynthesize",{clampMin:0,clampMax:.98}),I=()=>p("resynthesize","x",.5),W=()=>p("resynthesize","y",.78),q=()=>p("resynthesize","hue",.25),te=()=>p("resynthesize","decay",.3);F=F.blend(lt(h).resynthWarp(I,W).resynthTint(I,W,q,te),T)}if(g==="ghostFlow"){let T=ke("ghostFlow"),I=()=>p("ghostFlow","melt",.62),W=()=>p("ghostFlow","flowScale",.48),q=()=>p("ghostFlow","refresh",0),te=()=>p("ghostFlow","chromaBleed",.35);F=F.ghostFlow(Cc(()=>h),T,I,W,q,te)}if(g==="oscilloscope"){let T=We("oscilloscope");if(pe.current&&T){let I=ke("oscilloscope");St.layerSourceStack.push(T);let W=()=>p("oscilloscope","glow",.55);F=F.oscilloscopeOverlay(T,I,W)}}if(g==="neonGrid"){let T=We("neonGrid");if(Re.current&&T){St.layerSourceStack.push(T);let I=()=>Math.max(0,Math.min(1,p("neonGrid","intersect",1.6)/3));F=F.neonGridOverlay(T,()=>1,I)}}if(g==="textLayer"){let T=We("textLayer");if(ge.current&&T){let I=ke("textLayer");St.layerSourceStack.push(T);let W=()=>p("textLayer","glow",.35);F=F.textLayerOverlay(T,I,W)}}if(g==="cymatic"){let T=ke("cymatic"),I=()=>Math.max(1,p("cymatic","frequency",12));F=F.scale(()=>window.innerWidth/window.innerHeight,1).cymaticDistort(T,I).scale(()=>window.innerHeight/window.innerWidth,1)}Oa(F,St.chainStack)}},fo=(g,Pe,T,I)=>{let W=T();if(!W?.enabled)return g;let q=F,te=at;F=g,at={templateKey:Pe,effectKey:I??Pe,config:W},nt.set(Pe,at.effectKey);try{return eo(Pe),F}catch(se){return console.warn(`[fx-group] ${Pe} failed`,se),g}finally{F=q,at=te}},yo=!1,_t={},Ct=Ie.filter(g=>g.kind==="group").map(g=>g.id);{let g=o.current.layerInstances??{},Pe=o.current.fxGroups??{},T=Ue=>Ie.some(Ke=>Ke.kind==="fx"&&Ke.key===Ue&&!!k()?.[Ue]?.enabled)||Ct.some(Ke=>{let st=Pe[Ke];return st?.enabled?st.layerIds.some(ht=>{let Yt=g[ht];return Yt?.templateKey===Ue&&!!Yt.config.enabled}):!1}),I=T("blur"),W=I||T("liquix"),q=[],te=k();te?.reactionDiffusion?.enabled&&Fn&&q.push(Fn),ki(te?.patternLayer)&&te?.patternLayer?.enabled&&Sn&&q.push(Sn),Kp(Xl(ie().outputMapping??s.current))&&Zn&&q.push(Zn),W&&(At=Bc([Zn,Sn,Fn],q),At&&q.push(At),I&&(wt=Bc([Zn,Sn,Fn],q)),wt&&q.push(wt)),T("lens7c")&&(pn=Bc([Zn,Sn,Fn],q),pn&&q.push(pn));let se=[Sn,Zn,Fn].filter(Ue=>!!Ue&&Ue!==At&&Ue!==wt&&Ue!==pn),_e=0;for(let Ue of Ct){let Ke=Pe[Ue];if(!Ke?.enabled||!Ke.layerIds.some(Yt=>{let Jt=g[Yt];return Jt?.templateKey==="feedback"&&!!Jt.config.enabled}))continue;let ht=se[_e++];ht&&(ft[Ue]=ht)}}let Xt={fxGroups:o.current.fxGroups??{},layerInstances:o.current.layerInstances??{},solid:Mt,buildLayer:pt,applyOperator:(g,Pe,T,I,W)=>{let q=St.chainStack,te=St.layerSourceStack;St.chainStack=I.chainStack,St.layerSourceStack=I.layerSourceStack;try{return fo(g,Pe,T,W)}finally{St.chainStack=q,St.layerSourceStack=te}},getGroupAmount:g=>()=>{let Pe=o.current.fxGroups?.[g];return Pe?.composite?_n(`group:${g}`,Pe.composite,go(),Xn):0},maskCompositeOpts:en,getClipSource:()=>{let g=m.current===0?On:Hn;return lt(g).scale(Lr)},groupBufferCache:_t,hasGroupFeedbackOut:g=>!!ft[g],applyGroupFeedback:(g,Pe,T)=>{let I=ft[Pe];if(!I)return g;let W=()=>y.current>0?0:_n("feedback",T,go(),{clampMin:.8,clampMax:.99}),q=()=>td(T,"scale",1),te=()=>td(T,"balance",.5);return g.blend(lt(I).scale(q).feedbackGrade(te),W)},commitGroupFeedbackLoop:(g,Pe)=>{let T=ft[g];T&&A.push({out:T,buffer:Wn(Pe)})}};Pb(Ct,Xt);for(let g of Ie){if(yo)break;if(g.kind==="group"){let Pe=Fb(F,g.id,Xt);F=Pe.chain,Pe.solo&&(yo=!0),Oa(F,St.chainStack);continue}eo(g.key)}if(Ie.some(g=>g.kind==="fx"&&g.key==="playbackCue")||eo("playbackCue"),k()?.slowmo?.enabled&&p("slowmo","motionBlur",Li)>1e-5&&(F=F.blend(lt(h),()=>ie().slowmoTrailMix??0)),r.current&&C_(i.current)){let g=()=>{let Pe=B.current,T=La(i.current);return Pe?Vp({exportSettings:T,canvasWidth:Pe.width,canvasHeight:Pe.height,videoAspect:un(),inset:yd}):Vp({exportSettings:T,canvasWidth:1920,canvasHeight:1080,videoAspect:un(),inset:yd})};F=F.exportVideoFit(()=>g().contentHalfW,()=>g().contentHalfH,()=>g().contentOffsetY).exportMatte(()=>1,()=>g().targetWidth,()=>g().targetHeight,()=>g().usePixelBox?1:0,()=>g().targetAspect,()=>yd,()=>$L,()=>g().contentHalfW,()=>g().contentHalfH,()=>g().contentOffsetY)}let sn=()=>Xl(ie().outputMapping??s.current),Co=()=>Kp(sn()),or=k()?.reactionDiffusion,Va=!!or?.enabled&&_n("reactionDiffusion",or,go(),Xn)>1e-5;if(Va&&Fn){let g=m.current===0?On:Hn,Pe=()=>p("reactionDiffusion","feed",.55),T=()=>p("reactionDiffusion","kill",.57),I=()=>p("reactionDiffusion","scale",12),W=()=>p("reactionDiffusion","speed",.45),q=()=>p("reactionDiffusion","styleMap",.35),te=()=>p("reactionDiffusion","source",.78),se=()=>p("reactionDiffusion","flow",.32),_e=()=>p("reactionDiffusion","emboss",.58),Ue=()=>d.current>0?1:0,Ke=Cc(()=>n.current?.o?.[1]);we.reactionDiffSim(Ke,g,Pe,T,I,W,q,te,se,_e,Ue).out(Fn)}let ma=k()?.patternLayer,qi=ki(ma)&&_n("patternLayer",ma,go(),Xn)>1e-5;if(qi&&Sn){let g=()=>Wb(p("patternLayer","variant",2),p("patternLayer","scale",1),p("patternLayer","speed",.4),p("patternLayer","warp",0),p("patternLayer","symmetry",2),p("patternLayer","seedSize",.18),p("patternLayer","gap",.35)),Pe=Cc(()=>n.current?.o?.[3]);we.patternRdSim(Pe,()=>g().feed,()=>g().kill,()=>g().cells,()=>g().styleMap,()=>g().speed,()=>g().seedSize,()=>D.current>0?1:0).out(Sn)}let zn=n.current?.o,dr=h??zn?.[qp],fr=Zn??zn?.[jp],Ro=(g,Pe)=>()=>P_(sn())[g][Pe],qr=N_(),hr=n.current?.synth?.render;if(Co()&&dr&&fr){F.out(dr);let g=Ri(()=>zn?.[qp]);Ye(1,.001,0).outputCornerPinWarp(g,()=>1,Ro(0,"x"),Ro(0,"y"),Ro(1,"x"),Ro(1,"y"),Ro(2,"x"),Ro(2,"y"),Ro(3,"x"),Ro(3,"y"),{getTexture:()=>(W_(sn()),qr.getTexture())},()=>{let Pe=jl(sn());return Math.min(ka,Pe.points.length)},()=>Qp()&&!Yp(sn())?1:0,()=>Qp()&&sn().points.length>=wr?1:0).out(fr),hr?.(fr)}else F.out(h),hr?.(h);let Ao=Ob(),rr=new Set;if(Va&&rr.add(1),qi&&rr.add(3),Co()&&rr.add(jp),At){let g=[h,Fn,Zn,Sn].indexOf(At);g>=0&&rr.add(g)}if(wt){let g=[h,Fn,Zn,Sn].indexOf(wt);g>=0&&rr.add(g)}if(pn){let g=[h,Fn,Zn,Sn].indexOf(pn);g>=0&&rr.add(g)}for(let g of Object.values(ft)){let Pe=[h,Fn,Zn,Sn].indexOf(g);Pe>=0&&rr.add(Pe)}let _r=Ib({previewGroupId:Ao,buffer:Ao?_t[Ao]:void 0,feedbackOut:Ao?ft[Ao]:void 0,outputs:[h,Fn,Zn,Sn],busyIndices:rr});Hb(_r?.index??null);let Pr=Ao?_t[Ao]:void 0;_r&&Pr&&!A.some(g=>g.out===_r.out)&&A.push({out:_r.out,buffer:Wn(Pr)});for(let{out:g,buffer:Pe}of A)Wn(Pe).out(g);Fo()||K.current(0)}catch(rn){console.error("Hydra Shader Error:",rn)}finally{Zl()}}}u();u();function js(e){return`
    vec3 wq = ${e} + vec3(
      _noise(${e} * 0.38 + vec3(tb * 0.16, 0.0, 2.4)),
      _noise(${e} * 0.38 + vec3(1.7, tb * 0.12, 0.0)),
      _noise(${e} * 0.38 + vec3(0.0, 3.1, tb * 0.14))
    ) * 0.0045;
    dm = length(wq) - coreR;

    float ba0 = _noise(vec3(0.17, tb * 0.21, 1.3)) * TAU + tb * 0.43;
    float bb0 = _noise(vec3(2.8, tb * 0.17, 0.4)) * PI;
    float br0 = blobR * (0.76 + 0.44 * _noise(vec3(4.1, tb * 0.09, 0.2)));
    float dist0 = blobOrbit * (0.62 + 0.48 * _noise(vec3(1.7, tb * 0.13, 3.9)));
    vec3 c0 = vec3(cos(ba0) * sin(bb0), cos(bb0), sin(ba0) * sin(bb0)) * dist0;
    float db = length(wq - c0) - br0;
    float h = max(mergeK - abs(dm - db), 0.0) / mergeK;
    dm = min(dm, db) - h * h * mergeK * 0.25;

    float ba1 = _noise(vec3(5.3, tb * 0.19, 2.1)) * TAU + tb * 0.31 + 1.9;
    float bb1 = _noise(vec3(1.2, tb * 0.23, 6.7)) * PI;
    float br1 = blobR * (0.8 + 0.38 * _noise(vec3(3.3, tb * 0.11, 1.8)));
    float dist1 = blobOrbit * (0.58 + 0.52 * _noise(vec3(8.4, tb * 0.15, 0.6)));
    vec3 c1 = vec3(cos(ba1) * sin(bb1), cos(bb1), sin(ba1) * sin(bb1)) * dist1;
    db = length(wq - c1) - br1;
    h = max(mergeK - abs(dm - db), 0.0) / mergeK;
    dm = min(dm, db) - h * h * mergeK * 0.25;

    if (nAmt > 0.001) {
      vec3 nDir = normalize(wq + 1e-4);
      vec3 nSeed = nDir * (1.05 + nScale * 0.22) + vec3(tb * 0.14, -tb * 0.1, tb * 0.07);
      float nf = nScale * 0.72;
      float ns = _noise(nSeed * nf) * 0.62 + _noise(nSeed * nf * 2.05 + 3.8) * 0.28;
      ns += _noise(nSeed * nf * 4.1 + 8.3) * 0.1 * smoothstep(2.5, 6.0, nScale);
      dm -= ns * (0.022 + nAmt * 0.34) * sz;
    }
  `}var k1=`
  float amt = clamp(amount, 0.0, 1.0);
  if (amt < 0.00001) return _c0;

  const float PI = 3.14159265;
  const float TAU = 6.2831853;
  float sz = clamp(sphereSize, 0.35, 2.0);
  float nAmt = clamp(noiseAmt, 0.0, 1.0);
  float nScale = max(1.0, detail);
  float spd = max(0.0, speed);
  float rough = clamp(roughness, 0.02, 1.0);
  float refInt = clamp(reflectAmt, 0.0, 2.0);
  float orbitSpd = rotation * TAU;
  float vidAspect = max(1.0, envAspect);
  float tb = time * spd * 0.36;
  float mergeK = 0.16 * sz;
  float blobR = 0.19 * sz;
  float blobOrbit = 0.38 * sz;
  float coreR = 1.08 * sz;

  vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
  uv.x *= resolution.x / max(1.0, resolution.y);

  float ay = time * orbitSpd * 0.55;
  float ax = sin(time * spd * 0.33) * 0.32;
  mat3 rotY = mat3(
    cos(ay), 0.0, sin(ay),
    0.0, 1.0, 0.0,
    -sin(ay), 0.0, cos(ay)
  );
  mat3 rotX = mat3(
    1.0, 0.0, 0.0,
    0.0, cos(ax), -sin(ax),
    0.0, sin(ax), cos(ax)
  );
  mat3 rot = rotX * rotY;

  vec3 ro = vec3(0.0, 0.0, 3.35);
  vec3 rd = normalize(vec3(uv, -1.85));

  float t = 0.0;
  float hit = 0.0;
  vec3 p = ro;
  vec3 qHit = vec3(0.0);
  float dm = 1e6;
  for (int i = 0; i < 44; i++) {
    p = ro + rd * t;
    qHit = vec3(dot(rot[0], p), dot(rot[1], p), dot(rot[2], p));
    ${js("qHit")}
    if (dm < 0.0014 * sz) {
      hit = 1.0;
      break;
    }
    if (t > 8.5 * sz) break;
    t += max(dm * 0.78, 0.0012 * sz);
  }

  vec3 scene = vec3(0.0);
  if (hit > 0.5) {
    float e = 0.0048 * sz;
    vec3 q0 = qHit;
    vec3 q1 = qHit + vec3(e, 0.0, 0.0);
    vec3 q2 = qHit + vec3(0.0, e, 0.0);
    vec3 q3 = qHit + vec3(0.0, 0.0, e);
    float f0 = 0.0;
    float f1 = 0.0;
    float f2 = 0.0;
    float f3 = 0.0;

    {
      ${js("q0")}
      f0 = dm;
    }
    {
      ${js("q1")}
      f1 = dm;
    }
    {
      ${js("q2")}
      f2 = dm;
    }
    {
      ${js("q3")}
      f3 = dm;
    }

    vec3 nObj = normalize(vec3(f1 - f0, f2 - f0, f3 - f0));
    vec3 nWorld = normalize(nObj.x * rot[0] + nObj.y * rot[1] + nObj.z * rot[2]);
    vec3 viewDir = normalize(ro - p);
    float ndv = max(dot(nWorld, viewDir), 0.001);
    vec3 refl = reflect(-viewDir, nWorld);

    vec3 r = normalize(refl);
    float lon = atan(r.x, r.z);
    float lat = asin(clamp(r.y, -1.0, 1.0));
    float envU = lon / TAU + 0.5;
    envU = (envU - 0.5) / vidAspect + 0.5;
    float envV = 0.5 - lat / PI;
    vec2 envUV = clamp(vec2(envU, envV), 0.0, 1.0);
    vec3 env = texture2D(tex, envUV).rgb;

    float blur = rough * 0.55;
    if (blur > 0.12) {
      vec3 t1 = normalize(cross(r, vec3(0.0, 1.0, 0.0)) + vec3(0.001));
      vec3 rOff = normalize(r + t1 * blur * 0.22);
      lon = atan(rOff.x, rOff.z);
      lat = asin(clamp(rOff.y, -1.0, 1.0));
      envU = (lon / TAU) / vidAspect + 0.5;
      envV = 0.5 - lat / PI;
      env += texture2D(tex, clamp(vec2(envU, envV), 0.0, 1.0)).rgb;
      rOff = normalize(r - t1 * blur * 0.22);
      lon = atan(rOff.x, rOff.z);
      lat = asin(clamp(rOff.y, -1.0, 1.0));
      envU = (lon / TAU) / vidAspect + 0.5;
      envV = 0.5 - lat / PI;
      env += texture2D(tex, clamp(vec2(envU, envV), 0.0, 1.0)).rgb;
      env *= 0.5;
    }
    env *= refInt;

    vec3 keyLight = normalize(vec3(-0.82, 0.92, 0.72));
    vec3 fillLight = normalize(vec3(0.08, 0.12, 0.99));
    vec3 backLight = normalize(vec3(0.48, 0.22, -0.86));
    float ndlKey = dot(nWorld, keyLight);
    float ndlFill = dot(nWorld, fillLight);
    float ndlBack = dot(nWorld, backLight);

    float wrapKey = clamp((ndlKey + 0.48) / 1.48, 0.0, 1.0);
    float keyFalloff = pow(wrapKey, mix(1.45, 0.55, rough));
    float fillWrap = pow(clamp((ndlFill + 0.12) / 1.12, 0.0, 1.0), 0.85);
    float backWrap = pow(clamp((ndlBack + 0.28) / 1.28, 0.0, 1.0), 1.1);
    float fresnel = pow(1.0 - ndv, mix(1.6, 4.2, 1.0 - rough));
    float rimMask = pow(1.0 - ndv, mix(1.2, 2.8, 1.0 - rough));
    float shadowSide = pow(clamp(-ndlKey * 0.42 + 0.52, 0.0, 1.0), 1.15);

    vec3 Hkey = normalize(viewDir + keyLight);
    float specTight = pow(max(dot(nWorld, Hkey), 0.0), mix(360.0, 22.0, rough));
    float specSoft = pow(max(dot(nWorld, Hkey), 0.0), mix(72.0, 8.0, rough));

    vec3 Hback = normalize(viewDir + backLight);
    float backSpec = pow(max(dot(nWorld, Hback), 0.0), mix(140.0, 12.0, rough));

    vec3 reflectBase = env * (0.72 + fresnel * 0.38);
    vec3 reflectFill = env * fillWrap * 0.42;
    vec3 body = reflectBase + reflectFill;
    body *= 0.52 + keyFalloff * 0.48;
    body = mix(body, env, fresnel * 0.28);

    vec3 specKey = vec3(specTight * (1.55 - rough * 0.75) * keyFalloff);
    specKey += vec3(specSoft * 0.38 * (1.0 - rough * 0.35) * keyFalloff);

    vec3 specBack = vec3(backSpec * backWrap * rimMask * 0.55 * (1.0 - rough * 0.25));

    vec3 metal = body + specKey + specBack;
    metal = mix(metal, metal * 0.72, shadowSide * 0.45);
    metal = mix(metal, env * 0.35 + metal * 0.65, rimMask * 0.22);

    float luma = dot(metal, vec3(0.299, 0.587, 0.114));
    metal = mix(metal, metal * 1.18 + vec3(0.04), smoothstep(0.02, 0.35, luma));

    scene = metal;
  }

  if (hit < 0.5) return _c0;
  return vec4(mix(_c0.rgb, scene, amt), _c0.a);
`;u();var R1=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  float g = clamp(glow, 0.0, 1.0);
  vec3 src = _c1.rgb;
  float lum = max(max(src.r, src.g), src.b);
  // Preserve canvas hue; glow only boosts energy (do not collapse to grayscale).
  vec3 boosted = src * (1.0 + g * 1.6);
  float mixAmt = clamp(lum * a * (0.7 + g * 0.4), 0.0, 1.0);
  return vec4(max(_c0.rgb, mix(_c0.rgb, boosted, mixAmt)), _c0.a);
`;u();var A1=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec3 neon = _c1.rgb;
  float lum = max(max(neon.r, neon.g), neon.b);
  vec3 boosted = neon * (1.0 + glow * 1.8);
  float mixAmt = clamp(lum * a * (0.75 + glow * 0.35), 0.0, 1.0);
  return vec4(max(_c0.rgb, mix(_c0.rgb, boosted, mixAmt)), _c0.a);
`;u();var E1=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec3 stars = _c1.rgb;
  float lum = max(max(stars.r, stars.g), stars.b);
  vec3 boosted = stars * (1.0 + glow * 2.2);
  float mixAmt = clamp(lum * a * (0.8 + glow * 0.45), 0.0, 1.0);
  return vec4(max(_c0.rgb, mix(_c0.rgb, boosted, mixAmt)), _c0.a);
`;u();var P1=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec4 t = _c1;
  float alpha = clamp(t.a * a, 0.0, 1.0);
  if (alpha < 0.00001) return _c0;
  vec3 col = t.rgb;
  float g = clamp(glow, 0.0, 1.0);
  vec3 lit = col * (1.0 + g * 1.8);
  vec3 outRgb = mix(_c0.rgb, lit, alpha);
  outRgb = max(outRgb, col * alpha * g * 0.42);
  return vec4(outRgb, _c0.a);
`;u();function Xs(e,t,n,o,r){let i=`wq${r}`;return`
    vec3 ${i} = ${e};
    float cR${r} = cos(${o} * 0.38);
    float sR${r} = sin(${o} * 0.38);
    vec2 xz${r} = mat2(cR${r}, -sR${r}, sR${r}, cR${r}) * ${i}.xz;
    ${i}.x = xz${r}.x;
    ${i}.z = xz${r}.y;
    float cR2${r} = cos(${o} * 0.24);
    float sR2${r} = sin(${o} * 0.24);
    vec2 xy${r} = mat2(cR2${r}, -sR2${r}, sR2${r}, cR2${r}) * ${i}.xy;
    ${i}.x = xy${r}.x;
    ${i}.y = xy${r}.y;

    float m${r} = clamp(${t}, 0.0, 1.0);
    float sz${r} = 0.82 + m${r} * 0.48;
    float coreR${r} = (0.26 + m${r} * 0.28) * sz${r};
    coreR${r} += sin(${o} * (1.85 + m${r} * 2.4) + m${r} * 5.1) * 0.075 * m${r};

    float dCore${r} = length(${i}) - coreR${r};
    vec2 tq${r} = vec2(length(${i}.xz) - (0.92 + m${r} * 0.38) * sz${r}, ${i}.y);
    float dTorus${r} = length(tq${r}) - (0.1 + m${r} * 0.08);
    float sk${r} = 0.13 * sz${r};
    float sh${r} = clamp(0.5 + 0.5 * (dTorus${r} - dCore${r}) / max(sk${r}, 1e-4), 0.0, 1.0);
    dm = mix(dTorus${r}, dCore${r}, sh${r}) - sk${r} * sh${r} * (1.0 - sh${r});

    float ripFreq${r} = max(1.0, ${n});
    float rip${r} = sin(${i}.x * ripFreq${r} + ${o} * 1.1) * sin(${i}.y * ripFreq${r} * 1.07) * sin(${i}.z * ripFreq${r} * 0.93);
    dm += rip${r} * 0.016 * m${r} * sz${r};
  `}var F1=`
  float amt = clamp(amount, 0.0, 1.0);
  if (amt < 0.00001) return _c0;

  float morphV = clamp(morph, 0.0, 1.0);
  float detailV = max(1.0, detail);
  float glowV = clamp(glow, 0.0, 1.0);
  float marchSpd = max(0.0, marchSpeed);
  float tb = time * marchSpd;

  vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
  uv.x *= resolution.x / max(1.0, resolution.y);

  vec3 ro = vec3(0.0, 0.0, 3.05);
  vec3 rd = normalize(vec3(uv, -1.72));

  float t = 0.0;
  float hit = 0.0;
  vec3 p = ro;
  float dm = 1.0;

  for (int i = 0; i < 30; i++) {
    p = ro + rd * t;
    ${Xs("p","morphV","detailV","tb","0")}
    if (dm < 0.0012) {
      hit = 1.0;
      break;
    }
    if (t > 9.0) break;
    t += max(dm * 0.9, 0.0015);
  }

  vec3 bg = _c0.rgb;
  float bgLuma = dot(bg, vec3(0.299, 0.587, 0.114));
  vec3 col = bg;

  if (hit > 0.5) {
    float e = 0.0018;
    ${Xs("p","morphV","detailV","tb","C")}
    float d0 = dm;
    ${Xs("p + vec3(e, 0.0, 0.0)","morphV","detailV","tb","X")}
    float dx = dm - d0;
    ${Xs("p + vec3(0.0, e, 0.0)","morphV","detailV","tb","Y")}
    float dy = dm - d0;
    ${Xs("p + vec3(0.0, 0.0, e)","morphV","detailV","tb","Z")}
    float dz = dm - d0;
    vec3 n = normalize(vec3(dx, dy, dz));

    vec3 viewDir = normalize(ro - p);
    float ndv = max(dot(n, viewDir), 0.001);
    float wrap = pow(clamp((max(dot(n, normalize(vec3(-0.7, 0.85, 0.55))), 0.0) + 0.35) / 1.35, 0.0, 1.0), 1.2);
    float fresnel = pow(1.0 - ndv, 2.4 + glowV * 1.8);
    float rim = fresnel * (0.35 + glowV * 0.85);

    vec3 surf = bg;
    float surfL = dot(surf, vec3(0.299, 0.587, 0.114));
    vec3 body = mix(vec3(surfL * 0.35), surf, wrap * 0.72 + 0.18);
    body *= 0.55 + wrap * 0.45;
    body += vec3(rim);
    body = mix(body, vec3(clamp(surfL + rim * 0.25, 0.0, 1.0)), 0.22);

    float fog = 1.0 - exp(-t * 0.22);
    col = mix(bg * 0.15 + vec3(bgLuma * 0.05), body, 1.0 - fog * 0.35);
  }

  return vec4(mix(bg, col, amt), _c0.a);
`;u();var O1=`
  if (amount < 0.00001) return _c0;

  float c = max(2.0, cols);
  float r = max(2.0, rows);
  vec2 grid = vec2(c, r);
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float aspect = resolution.x / max(1.0, resolution.y);

  vec2 cellId = floor(uv * grid);
  vec2 cellCenter01 = (cellId + 0.5) / grid;
  vec2 toCenter = cellCenter01 - 0.5;
  toCenter.x *= aspect;

  float l = dot(_c0.rgb, vec3(0.299, 0.587, 0.114));
  float z = clamp(l, 0.0, 1.0);
  float strength = clamp(amount, 0.0, 1.0);

  float scatter = clamp(depth, 0.0, 1.5) * strength;
  float parallaxAmt = clamp(parallax, 0.0, 1.5) * strength;
  float defocus = clamp(blur, 0.0, 1.0);
  float haze = clamp(fog, 0.0, 1.0);

  vec2 cell = fract(uv * grid) - 0.5;

  float lo = clamp(minSize, 0.0, 1.0);
  float hi = clamp(maxSize, 0.0, 1.0);
  float loBound = min(lo, hi);
  float hiBound = max(lo, hi);
  float inkLift = smoothstep(0.006, 0.04, z);

  float centerLayer = z * 15.0;
  vec3 cloud = vec3(0.0);
  float transmittance = 1.0;

  for (int i = 0; i < 16; i++) {
    float layer = float(i);
    float layerT = layer / 15.0;

    float layerDist = abs(layer - centerLayer);
    float weight = exp(-layerDist * layerDist * 3.0);
    if (weight < 0.04) continue;

    float viewZ = mix(11.0, 0.32, layerT);
    float focal = 1.25 / viewZ;
    vec2 perspShift = toCenter * focal * (scatter * 0.95 + parallaxAmt * 1.15);
    vec2 q = cell;
    q -= perspShift;
    q.y += (layerT - 0.5) * (scatter * 0.42 + parallaxAmt * 0.16);

    float perspScale = mix(0.18, 1.0, pow(layerT, 0.78));
    float side = mix(loBound, hiBound, layerT) * min(0.94, perspScale);
    float halfSide = side * 0.5 * inkLift * (1.0 + defocus * (1.0 - layerT) * 0.55);

    float softness = defocus * (1.0 - layerT) * 0.92;
    float dist = max(abs(q.x), abs(q.y));
    float inner = halfSide * max(0.08, 1.0 - softness * 0.7);
    float outer = halfSide * (1.0 + softness * 1.25);
    float mask = 1.0 - smoothstep(inner, outer, dist);

    float layerAlpha = mask * weight * mix(haze * 0.18 + 0.08, 1.0, layerT);
    vec3 col = _c0.rgb * layerAlpha;

    cloud += col * transmittance;
    transmittance *= 1.0 - layerAlpha;
  }

  return mix(_c0, vec4(clamp(cloud, 0.0, 1.0), 1.0), strength);
`;u();u();var H1=`
    vec2 cellUv = fract(rst * grid);
    vec2 p = (cellUv - 0.5) * 1.78;
    float level = clamp(floor((1.0 - lAdj) * 15.999), 0.0, 15.0);
    float setId = floor(iconSet + 0.5);
    float sub = mod(level, 4.0);
    float band = floor(level / 4.0);
    float sz = mix(0.1, 0.44, (sub + 1.0) / 5.0);
    float hh = mix(0.022, 0.07, (sub + 1.0) / 5.0);
    float barH = (1.0 - smoothstep(hh, hh + 0.018, abs(p.y))) * step(abs(p.x), sz);
    float barV = (1.0 - smoothstep(hh, hh + 0.018, abs(p.x))) * step(abs(p.y), sz);
    float dotM = 1.0 - smoothstep(sz * 0.45 - 0.02, sz * 0.45 + 0.02, length(p));
    float ringM = 1.0 - smoothstep(0.042, 0.058, abs(length(p) - sz));
    float sqFill = step(abs(p.x), sz) * step(abs(p.y), sz);
    float sqEdge = max(step(sz - 0.06, abs(p.x)) * step(abs(p.x), sz + 0.04), step(sz - 0.06, abs(p.y)) * step(abs(p.y), sz + 0.04));
    float diaFill = step(abs(p.x) + abs(p.y), sz);
    float diaEdge = step(sz - 0.05, abs(p.x) + abs(p.y)) * step(abs(p.x) + abs(p.y), sz + 0.05);
    float diagA = (1.0 - smoothstep(hh, hh + 0.018, abs(p.x - p.y) * 0.707)) * step(length(p), sz);
    float diagB = (1.0 - smoothstep(hh, hh + 0.018, abs(p.x + p.y) * 0.707)) * step(length(p), sz);
    float hatchH = (1.0 - smoothstep(hh * 0.85, hh * 0.85 + 0.016, abs(fract(p.y * 5.0 + 0.5) - 0.5))) * step(abs(p.x), sz);
    float hatchV = (1.0 - smoothstep(hh * 0.85, hh * 0.85 + 0.016, abs(fract(p.x * 5.0 + 0.5) - 0.5))) * step(abs(p.y), sz);
    float edge = max(step(cellUv.x, 0.035), max(step(cellUv.y, 0.035), max(step(0.965, cellUv.x), step(0.965, cellUv.y))));

    if (level < 0.5) {
      ink = 0.0;
    } else if (setId < 0.5) {
      if (band < 0.5) ink = dotM;
      else if (band < 1.5) ink = max(barH, barV);
      else if (band < 2.5) ink = max(sqEdge, diaEdge);
      else ink = max(max(ringM, sqFill), diaFill);
    } else if (setId < 1.5) {
      if (band < 0.5) ink = barH;
      else if (band < 1.5) ink = max(barH, barV);
      else if (band < 2.5) ink = max(max(diagA, diagB), max(barH, barV));
      else ink = max(max(hatchH, hatchV), max(diagA, diagB));
    } else if (setId < 2.5) {
      if (band < 0.5) ink = ringM;
      else if (band < 1.5) ink = max(ringM, ringM * step(0.0, sin(atan(p.y, p.x) * 3.0)));
      else if (band < 2.5) ink = max(ringM, dotM);
      else ink = max(dotM, sqFill);
    } else {
      if (band < 0.5) ink = dotM;
      else if (band < 1.5) ink = max(barH, barV);
      else if (band < 2.5) ink = max(diaEdge, sqEdge);
      else ink = max(diaFill, sqFill);
    }
    ink *= 1.0 - edge;`;var I1=`
  if (amount < 0.00001) return _c0;

  float strength = clamp(amount, 0.0, 1.0);
  float dens = max(4.0, density);
  float bal = clamp(contrast, 0.0, 1.0);
  float waveAmt = clamp(wave, 0.0, 1.0);
  float modeF = clamp(mode, 0.0, 4.0);
  float rot = rotation;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 st = uv - 0.5;
  float ca = cos(rot);
  float sa = sin(rot);
  vec2 rst = vec2(st.x * ca - st.y * sa, st.x * sa + st.y * ca) + 0.5;

  vec3 lumW = vec3(0.299, 0.587, 0.114);
  float l = dot(_c0.rgb, lumW);
  float lAdj = clamp((l - bal) * (1.0 + strength * 3.2) + bal, 0.0, 1.0);
  float inkTone = 1.0 - lAdj;

  vec2 grid = vec2(dens, max(2.0, dens * (resolution.y / max(1.0, resolution.x))));
  vec2 cell = fract(rst * grid) - 0.5;

  vec3 paper = vec3(1.0);
  vec3 inkCol = vec3(0.0);
  float ink = 0.0;

  if (modeF < 0.5) {
    vec2 gv = floor(gl_FragCoord.xy / max(1.5, mix(8.0, 2.0, strength)));
    float n = _noise(vec3(gv * 0.17, 2.3));
    float jitter = (n - 0.5) * mix(0.35, 0.72, strength);
    ink = 1.0 - step(lAdj + jitter, bal);
    float n2 = _noise(vec3((gv + 3.7) * 0.17, 5.1));
    vec2 bv = floor(gl_FragCoord.xy / (2.0 + n2 * 10.0));
    float blockN = _noise(vec3(bv * 0.13, 8.4));
    if (blockN > mix(0.97, 0.82, strength) && inkTone > mix(0.08, 0.45, strength)) {
      ink = 1.0;
    }
  } else if (modeF < 1.5) {
    float side = mix(0.14, 0.9, inkTone) * mix(0.35, 1.0, strength);
    side = min(side, 0.94) * 0.9;
    vec2 q = abs(cell) - vec2(side * 0.5);
    float corner = side * 0.22;
    vec2 qOut = max(q, 0.0);
    float dist = length(qOut) + min(max(q.x, q.y), 0.0) - corner;
    ink = 1.0 - smoothstep(-0.015, 0.025, dist);
    if (inkTone > 0.32 && inkTone < 0.68) {
      float dotR = side * 0.14;
      ink = max(ink, (1.0 - step(dotR, length(cell))) * 0.9);
    }
  } else if (modeF < 2.5) {
    ${H1}
  } else if (modeF < 3.5) {
    vec2 ls = rst - 0.5;
    float wave = waveAmt * mix(0.0, 0.11, strength) * sin(ls.x * dens * 0.12 + time * 0.35);
    ls.y += wave;
    float linePos = fract(ls.y * dens) - 0.5;
    float halfW = mix(0.015, 0.46, inkTone) * strength;
    ink = 1.0 - step(halfW, abs(linePos));
  } else {
    vec2 cc = rst - 0.5;
    cc.x *= resolution.x / max(1.0, resolution.y);
    float ang = atan(cc.y, cc.x);
    float waveOff = waveAmt * 0.035 * sin(ang * 4.0 + length(cc) * mix(6.0, 14.0, strength));
    float d = length(cc) + waveOff;
    if (shape > 0.5) {
      d = (abs(cc.x) + abs(cc.y)) + waveOff;
    }
    float ringPos = fract(d * dens * 0.075) - 0.5;
    float halfW = mix(0.008, 0.42, inkTone) * strength;
    ink = 1.0 - step(halfW, abs(ringPos));
  }

  vec3 outRgb = mix(paper, inkCol, clamp(ink, 0.0, 1.0));
  return vec4(mix(_c0.rgb, outRgb, strength), _c0.a);
`;u();var B1=`
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float style = clamp(gradType, 0.0, 3.0);
  float sw = clamp(sweep, 0.0, 3.0);
  vec3 colorA = vec3(ar, ag, ab);
  vec3 colorB = vec3(br, bg, bb);
  if (style < 0.5) {
    return vec4(colorA, 1.0);
  }
  vec2 c = uv - 0.5;
  c.x *= resolution.x / max(1.0, resolution.y);
  float sf = clamp(softness, 0.0, 1.0);
  float dist = length(c) * 2.0;
  float t = 0.0;
  if (sw > 0.5) {
    float ang = atan(c.y, c.x) / 6.2831853 + 0.5;
    if (sw < 1.5) {
      t = ang;
    } else if (sw < 2.5) {
      t = abs(c.x) + abs(c.y);
    } else {
      t = fract(ang + dist * mix(1.0, 4.0, sf));
    }
  } else if (style < 1.5) {
    t = uv.x;
  } else if (style < 2.5) {
    t = uv.y;
  } else {
    float hard = clamp(dist, 0.0, 1.0);
    float soft = smoothstep(0.0, 1.0, dist);
    t = mix(soft, hard, 1.0 - sf * 0.9);
  }
  t = clamp(t, 0.0, 1.0);
  return vec4(mix(colorA, colorB, t), 1.0);
`;u();var D1=`
  vec2 res = resolution.xy;
  vec2 p = gl_FragCoord.xy;
  float sc = 0.2 * max(0.25, scale);
  p = sc * (p + p - res) / res.y;

  vec4 z = vec4(1.0, 2.0, 3.0, 0.0);
  vec4 acc = z;
  vec2 v = res;
  float a = 0.5;
  float t = time * max(0.0, speed);
  float grow = 0.03 * max(0.35, complexity);

  for (int i = 0; i < 19; i++) {
    float fi = float(i);
    float bowl = 0.5 - dot(p, p);
    float divBowl = abs(bowl) < 1.0e-4 ? (bowl >= 0.0 ? 1.0e-4 : -1.0e-4) : bowl;
    vec2 denomVec = (1.0 + fi * dot(v, v))
      * sin(1.5 * p / divBowl - 9.0 * p.yx + t);
    acc += (1.0 + cos(z + t)) / max(length(denomVec), 1.0e-4);

    t += 1.0;
    a += grow;
    v = cos(t - 7.0 * p * pow(a, fi)) - 5.0 * p;

    vec4 rotArg = cos(vec4(fi + 0.02 * t) - z.wxzw * 11.0);
    mat2 rot = mat2(rotArg);
    p = rot * p;
    vec2 tx = clamp(40.0 * dot(p, p) * cos(100.0 * p.yx + t), -10.0, 10.0);
    vec2 e2x = exp(2.0 * tx);
    vec2 tanhTx = (e2x - 1.0) / (e2x + 1.0);
    float pulse = cos(4.0 / exp(dot(acc, acc) / 100.0) + t) / 300.0;
    p += tanhTx / 200.0 + 0.2 * a * p + vec2(pulse);
  }

  acc = 25.6 / (min(acc, vec4(13.0)) + 164.0 / max(acc, vec4(1.0e-4)));
  vec3 col = acc.rgb - dot(p, p) / 250.0;
  col = clamp(col, 0.0, 1.0);

  return vec4(col, 1.0);
`;u();var N1=`
  vec2 R = resolution.xy;
  vec2 U = gl_FragCoord.xy;
  vec2 uv = U / R;
  float t = time * max(0.0, speed);
  float ns = max(0.25, scale);
  float lineFreq = max(2.0, lines);
  float valleyMix = clamp(valley, 0.0, 1.0);
  float widthMul = clamp(lineWidth, 0.35, 2.5);
  float vidTint = clamp(videoTint, 0.0, 1.0);
  float monoOn = step(0.5, clamp(palette, 0.0, 1.0));

  vec3 nx = vec3(U * (8.0 * ns) / R.y, 0.1 * t);
  vec3 p0 = floor(nx);
  vec3 f0 = fract(nx);
  f0 = f0 * f0 * (3.0 - 2.0 * f0);
  float h000 = fract(sin(1000.0 * dot(p0 + vec3(0.0, 0.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h100 = fract(sin(1000.0 * dot(p0 + vec3(1.0, 0.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h010 = fract(sin(1000.0 * dot(p0 + vec3(0.0, 1.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h110 = fract(sin(1000.0 * dot(p0 + vec3(1.0, 1.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h001 = fract(sin(1000.0 * dot(p0 + vec3(0.0, 0.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h101 = fract(sin(1000.0 * dot(p0 + vec3(1.0, 0.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h011 = fract(sin(1000.0 * dot(p0 + vec3(0.0, 1.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h111 = fract(sin(1000.0 * dot(p0 + vec3(1.0, 1.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float n0 = mix(
    mix(mix(h000, h100, f0.x), mix(h010, h110, f0.x), f0.y),
    mix(mix(h001, h101, f0.x), mix(h011, h111, f0.x), f0.y),
    f0.z
  );

  vec3 nx1 = nx + 11.5;
  vec3 p1 = floor(nx1);
  vec3 f1 = fract(nx1);
  f1 = f1 * f1 * (3.0 - 2.0 * f1);
  float h000b = fract(sin(1000.0 * dot(p1 + vec3(0.0, 0.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h100b = fract(sin(1000.0 * dot(p1 + vec3(1.0, 0.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h010b = fract(sin(1000.0 * dot(p1 + vec3(0.0, 1.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h110b = fract(sin(1000.0 * dot(p1 + vec3(1.0, 1.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h001b = fract(sin(1000.0 * dot(p1 + vec3(0.0, 0.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h101b = fract(sin(1000.0 * dot(p1 + vec3(1.0, 0.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h011b = fract(sin(1000.0 * dot(p1 + vec3(0.0, 1.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h111b = fract(sin(1000.0 * dot(p1 + vec3(1.0, 1.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float n1 = mix(
    mix(mix(h000b, h100b, f1.x), mix(h010b, h110b, f1.x), f1.y),
    mix(mix(h001b, h101b, f1.x), mix(h011b, h111b, f1.x), f1.y),
    f1.z
  );

  float n = (n0 + n1) * 0.5;
  float sv = sin(6.2831853 * lineFreq * n);
  float estFw = 6.2831853 * lineFreq * 8.0 * ns / max(R.y, 1.0) * 0.22 * widthMul;
  float v = smoothstep(1.0, 0.0, 0.5 * abs(sv) / max(estFw, 1.0e-5));

  vec2 valleyUv = clamp((U + vec2(1.0, sin(t))) / R, 0.001, 0.999);
  vec3 valleyVideo = texture2D(videoTex, valleyUv).rgb;
  vec3 valleyColor = exp(-33.0 / max(R.y, 1.0)) * valleyVideo * valleyMix;
  vec3 valleyMono = vec3(0.035) * valleyMix;
  vec3 valleyCol = mix(valleyColor, valleyMono, monoOn);

  vec3 rainbow = 0.5 + 0.5 * sin(12.0 * n + vec3(0.0, 2.1, -2.1));
  float whiteBand = 0.5 + 0.5 * sin(12.0 * n + 0.65);
  vec3 monoRidge = vec3(mix(0.62, 1.0, whiteBand));
  vec3 vid = texture2D(videoTex, clamp(uv, 0.001, 0.999)).rgb;
  vec3 ridgeRainbow = mix(rainbow, clamp(vid * rainbow * 2.2, 0.0, 1.0), vidTint);
  vec3 ridgeCol = mix(ridgeRainbow, monoRidge, monoOn);

  vec3 mapped = mix(valleyCol, ridgeCol, v);
  return vec4(mapped, 1.0);
`;u();function XL(e,t){let n=t;return`
    vec3 q${n} = ${e};
    float f${n} = 0.0;
    f${n} += 0.50000 * _noise(q${n}); q${n} *= 2.02;
    f${n} += 0.25000 * _noise(q${n}); q${n} *= 2.03;
    f${n} += 0.12500 * _noise(q${n});
    float ${t} = f${n};
  `}function Gc(e,t,n,o,r,i,s){let l=s;return`
    vec3 mp${l} = ${e};
    mp${l}.z -= ${t};
    float tz${l} = mp${l}.z;
    vec2 tc${l} = vec2(sin(tz${l} * 0.17) * 0.4, sin(tz${l} * 0.1 + 4.0)) * 3.0 * ${n};
    mp${l}.xy -= tc${l};
    float ang${l} = atan(mp${l}.y, mp${l}.x) - mp${l}.z * 0.25 + ${o} * 3.7 + sin(${o}) * 0.2;
    ${XL(`mp${l}`,`m${l}`)}
    float rad${l} = sin(mp${l}.z * 0.1) * 0.5 + 3.0 + m${l} * 0.3 + ${i} * 2.0 + sin(ang${l} * ${r}) * 0.3;
    float ${s} = length(mp${l}.xy) - rad${l};
  `}var W1=`
  float amt = clamp(amount, 0.0, 1.0);
  if (amt < 0.00001) return _c0;

  float wtTime = time;
  float qTier = clamp(tunnelQuality, 0.0, 2.0);
  float marchLimit = qTier < 0.5 ? 42.0 : (qTier < 1.5 ? 34.0 : 28.0);
  float spdNorm = clamp(tunnelSpeed, 0.0, 3.0) / 3.0;
  float travelSpd = pow(spdNorm, 2.35) * 18.0;
  float zOffset = wtTime * travelSpd;
  float introFade = min(wtTime * 0.35, 1.0);
  float camZoom = 3.0 - introFade * 2.0;
  float tunnelShake = max(0.35, introFade);
  float armsAmt = max(1.0, tunnelArms);
  float fogMix = clamp(tunnelFog, 0.0, 1.0);
  float refAmt = clamp(tunnelRefract, 0.0, 1.0);
  float shineAmt = clamp(tunnelShine, 0.0, 1.0);
  float audioReact = max(0.0, audioBoost);
  float asp = resolution.x / max(1.0, resolution.y);
  float warpAmt = refAmt * 1.12;

  vec3 sunDir = normalize(vec3(-0.364, 0.582, 0.727));
  vec3 sunColor = vec3(1.35, 1.05, 0.82);

  vec2 uvBg = gl_FragCoord.xy / resolution.xy;
  vec2 vanish = uvBg - vec2(0.5, 0.5);
  vanish.x *= asp;
  float vanishR = length(vanish);
  float endGlow = exp(-vanishR * vanishR * 5.5);
  vec3 tunnelGlow = vec3(1.0) * endGlow * (0.14 + fogMix * 0.22);

  vec2 warpBase = uvBg - 0.5;
  warpBase.x *= asp;
  float warpR = length(warpBase);
  float warpSafe = smoothstep(0.0, 0.018, warpR);
  float warpTheta = atan(warpBase.y, warpBase.x);
  float warpSwirl = warpTheta + sin(warpR * 7.5 - wtTime * 1.15 + zOffset * 0.02) * 0.05 * warpAmt;
  float warpBarrel = 1.0 + pow(warpR, 1.75) * warpAmt * 1.05;
  vec2 warpP = vec2(cos(warpSwirl), sin(warpSwirl)) * warpR / warpBarrel;
  warpP.x /= asp;
  vec2 uvWarpFull = clamp(warpP + 0.5, 0.001, 0.999);
  vec2 uvWarp = mix(uvBg, uvWarpFull, warpSafe);
  vec3 bgVideo = texture2D(videoTex, uvWarp).rgb;

  vec3 camPos = vec3(0.0);
  float camZ = camPos.z - zOffset;
  vec2 tcCam = vec2(sin(camZ * 0.17) * 0.4, sin(camZ * 0.1 + 4.0)) * 3.0 * tunnelShake;
  camPos.xy += tcCam * 0.5;

  vec3 camTarget = vec3(0.0, 0.0, 5.0);
  float tgtZ = camTarget.z - zOffset;
  vec2 tcTgt = vec2(sin(tgtZ * 0.17) * 0.4, sin(tgtZ * 0.1 + 4.0)) * 3.0 * tunnelShake;
  camTarget.xy += tcTgt * 0.5;
  camTarget = mix(vec3(3.0, 0.0, 5.0), camTarget, introFade);

  float camAngle = sin(wtTime * 0.3) + wtTime * 0.1;
  vec3 camUp = vec3(sin(camAngle), cos(camAngle), 0.0);

  vec3 fwd = normalize(camTarget - camPos);
  vec3 camX = normalize(cross(fwd, camUp));
  vec3 camY = cross(camX, fwd);

  vec2 uvScr = (gl_FragCoord.xy - 0.5 * resolution.xy) / (resolution.y * camZoom);
  vec3 eyeDir = normalize(camX * uvScr.x + camY * uvScr.y + fwd);

  float marchT = 0.0;
  vec3 marchP = camPos;
  float hitDist = 1e6;

  for (int i = 0; i < 42; i++) {
    if (float(i) >= marchLimit) break;
    ${Gc("marchP","zOffset","tunnelShake","wtTime","armsAmt","audioReact","sdHit")}
    marchT += sdHit;
    marchP += sdHit * eyeDir;
    if (abs(sdHit) < 0.0012) {
      hitDist = sdHit;
      break;
    }
    if (marchT > 72.0) break;
  }

  vec3 outColor = bgVideo + tunnelGlow * 0.42;

  if (abs(hitDist) < 0.012) {
    float epsN = 0.055;
    ${Gc("marchP","zOffset","tunnelShake","wtTime","armsAmt","audioReact","sd0")}
    ${Gc("marchP + vec3(epsN, 0.0, 0.0)","zOffset","tunnelShake","wtTime","armsAmt","audioReact","sdX")}
    ${Gc("marchP + vec3(0.0, epsN, 0.0)","zOffset","tunnelShake","wtTime","armsAmt","audioReact","sdY")}
    vec3 surfNormal = normalize(vec3(sdX - sd0, sdY - sd0, 0.016));

    vec3 viewIn = normalize(eyeDir);
    float tunnelDist = length(marchP - camPos);
    float depthW = 1.0 / max(0.35, tunnelDist * 0.16);

    vec2 nScr = surfNormal.xy;
    nScr.x /= asp;
    vec2 refrOff = nScr * refAmt * depthW * 0.21;
    vec3 cRefr = texture2D(videoTex, clamp(uvWarp + refrOff, 0.001, 0.999)).rgb;

    vec2 reflOff = -nScr * refAmt * 0.09;
    vec3 cRefl = texture2D(videoTex, clamp(uvWarp + reflOff, 0.001, 0.999)).rgb;

    float ndv = max(0.0, dot(surfNormal, -viewIn));
    vec3 fresnel = vec3(pow(1.0 - ndv, 3.0)) * (0.35 + refAmt * 0.5);
    outColor = max(cRefr * (vec3(1.0) - fresnel) + cRefl * fresnel, vec3(0.0));

    float ndl = max(dot(surfNormal, sunDir), 0.0);
    float wrap = pow(clamp((ndl + 0.38) / 1.38, 0.0, 1.0), 1.35);
    outColor *= 0.58 + wrap * 0.42;

    vec3 halfDir = normalize(sunDir - viewIn);
    float specT = pow(max(dot(surfNormal, halfDir), 0.0), mix(32.0, 220.0, shineAmt));
    float specW = pow(max(dot(surfNormal, halfDir), 0.0), mix(6.0, 40.0, shineAmt));
    float crest = pow(ndl, mix(3.0, 10.0, shineAmt)) * shineAmt;
    float specCheap = step(1.5, qTier);
    vec3 specular = (specT * 1.2 + mix(specW * 0.35, 0.0, specCheap) + crest * 0.4) * sunColor * shineAmt;
    outColor += specular;

    float spiralRim = pow(1.0 - ndv, 3.5) * (specT * 0.85 + specW * 0.25 * (1.0 - specCheap)) * shineAmt;
    spiralRim += endGlow * pow(1.0 - ndv, 2.0) * 0.22;
    outColor = mix(outColor, vec3(1.0), clamp(spiralRim, 0.0, 0.82));

    float rim = pow(1.0 - ndv, 2.6) * shineAmt * 0.22;
    outColor += rim * vec3(1.0);

    float fftFog = max(0.0, audioReact - 0.5);
    float depthFade = exp(-tunnelDist * 0.048);
    float keepBright = clamp(specT * 1.8 + spiralRim, 0.0, 1.0);
    outColor *= mix(0.38 + 0.62 * depthFade, 1.0, keepBright * 0.55);

    float fogAmt = 1.0 - exp(-tunnelDist * 0.06 * (0.3 + fogMix * 0.7));
    vec3 fogCol = mix(vec3(0.08, 0.06, 0.12), vec3(1.0), endGlow * 0.75);
    fogCol += vec3(0.12, 0.1, 0.14) * fftFog;
    outColor = mix(outColor, fogCol, fogAmt * 0.55);
  } else {
    outColor = bgVideo + tunnelGlow * 0.65;
    outColor = mix(outColor, vec3(1.0), endGlow * 0.22 * shineAmt);
  }

  vec2 uvV = uvBg;
  float vignette = uvV.x * (1.0 - uvV.x) * uvV.y * (1.0 - uvV.y) * 32.0 * 0.75 + 0.25;
  outColor *= vignette;
  outColor = clamp(outColor, 0.0, 1.0);

  float hideCenter = smoothstep(0.006, 0.042, vanishR);
  vec3 centerVideo = texture2D(videoTex, uvBg).rgb;
  outColor = mix(centerVideo, outColor, hideCenter);

  return vec4(mix(bgVideo, outColor, amt), _c0.a);
`;u();var G1=`
  vec2 res = resolution.xy;
  vec2 uv = (gl_FragCoord.xy * 2.0 - res.xy) / res.y;
  vec2 uv0 = uv;

  float t = time * max(0.0, speed);
  t += max(0.0, audioBoost) * 4.0;

  float layerCount = clamp(layers, 1.0, 8.0);
  float zoom = max(1.05, zoomFactor);
  float glowPow = clamp(glow, 0.6, 2.4);
  float glowWidth = 0.01 * mix(1.4, 0.65, (glowPow - 0.6) / 1.8);

  vec3 finalColor = vec3(0.0);

  for (float i = 0.0; i < 8.0; i++) {
    float active = step(i, layerCount - 0.5);
    uv = fract(uv * zoom) - 0.5;

    float d = length(uv) * exp(-length(uv0));

    vec3 pa = vec3(0.5);
    vec3 pb = vec3(0.5);
    vec3 pc = vec3(1.0);
    vec3 pd = vec3(0.263, 0.416, 0.557);
    vec3 col = pa + pb * cos(6.2831853 * (pc * (length(uv0) + i * 0.4 + t * 0.4) + pd));

    d = sin(d * 8.0 + t) / 8.0;
    d = abs(d);
    d = pow(glowWidth / max(d, 1.0e-4), glowPow);

    finalColor += col * d * active;
  }

  finalColor = pow(clamp(finalColor, 0.0, 1.0), vec3(1.0 / 2.2));
  finalColor = finalColor * 0.6 + 0.4 * finalColor * finalColor * (3.0 - 2.0 * finalColor);

  vec2 q = gl_FragCoord.xy / res;
  finalColor *= 0.5 + 0.5 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.7);

  return vec4(finalColor, 1.0);
`;u();var U1=`
  vec2 res = resolution.xy;
  vec2 uv = (gl_FragCoord.xy + gl_FragCoord.xy - res) / max(res.y, 1.0);

  float mm = clamp(m, 1.0, 16.0);
  float nn1 = max(0.12, n1);
  float nn2 = max(0.12, n2);
  float sz = max(0.08, size);
  float t = time * max(0.0, speed);
  float g = clamp(glow, 0.2, 2.4);
  float lookId = floor(clamp(look, 0.0, 2.0) + 0.5);
  vec3 tint = vec3(cr, cg, cb);

  float theta = atan(uv.y, uv.x) + t * 0.17;
  float rho = length(uv);

  float ct = cos(mm * theta * 0.25);
  float st = sin(mm * theta * 0.25);
  float term = pow(max(abs(ct), 1.0e-5), nn2) + pow(max(abs(st), 1.0e-5), nn2);
  float R = clamp(pow(max(term, 1.0e-6), -1.0 / nn1), 0.02, 8.0) * sz;

  vec3 col = vec3(0.0);

  if (lookId < 1.5) {
    float d = rho - R;
    if (lookId > 0.5) d = abs(d) - 0.01 * g;
    float aa = 2.2 / max(res.y, 1.0);
    float mask = 1.0 - smoothstep(-aa, aa, d);
    float halo = exp(-abs(rho - R) * (16.0 / g)) * 0.42;
    float body = mask + halo;
    col = tint * body + vec3(1.0) * pow(body, 3.0) * 0.45;
  } else {
    float u = rho / max(R, 1.0e-4);
    float contour = exp(-abs(u - 1.0) * (12.0 + 9.0 * g));
    float shells = pow(abs(sin((u - t * 0.11) * 9.0)), 11.0) * smoothstep(1.4, 0.0, u);
    shells += pow(abs(sin((u + 0.07) * 16.5 - t * 0.19)), 16.0) * 0.5 * smoothstep(1.18, 0.0, u);

    float theta2 = theta + 1.0471976;
    float ct2 = cos(mm * theta2 * 0.25);
    float st2 = sin(mm * theta2 * 0.25);
    float term2 = pow(max(abs(ct2), 1.0e-5), nn2) + pow(max(abs(st2), 1.0e-5), nn2);
    float R2 = clamp(pow(max(term2, 1.0e-6), -1.0 / nn1), 0.02, 8.0) * sz * 0.72;
    float u2 = rho / max(R2, 1.0e-4);
    float core2 = exp(-abs(u2 - 1.0) * 15.0) * 0.9;

    float field = contour * 2.2 + shells * 0.55 + core2 * 1.2;
    col = tint * field + vec3(1.0) * pow(clamp(field, 0.0, 2.4), 2.2) * 0.85;

    for (int i = 0; i < 24; i++) {
      float fi = float(i);
      float th = fi * 0.2617994 + t * 0.28;
      float ctp = cos(mm * th * 0.25);
      float stp = sin(mm * th * 0.25);
      float termP = pow(max(abs(ctp), 1.0e-5), nn2) + pow(max(abs(stp), 1.0e-5), nn2);
      float Rp = clamp(pow(max(termP, 1.0e-6), -1.0 / nn1), 0.02, 8.0) * sz * 0.82;
      vec2 p2 = vec2(cos(th), sin(th)) * Rp;

      float phi = t * 0.21;
      float c0 = cos(phi);
      float s0 = sin(phi);
      vec3 q0 = vec3(p2.x * c0, p2.y, p2.x * s0);
      float cti = 0.8525;
      float sti = 0.5227;
      q0 = vec3(q0.x, q0.y * cti - q0.z * sti, q0.y * sti + q0.z * cti);
      vec2 d0 = uv - q0.xy / (1.55 + q0.z * 0.42);
      float lum0 = (0.0014 * g) / max(dot(d0, d0), 1.0e-5);

      float phi1 = phi + 2.094395;
      float c1 = cos(phi1);
      float s1 = sin(phi1);
      vec3 q1 = vec3(p2.x * c1, p2.y, p2.x * s1);
      q1 = vec3(q1.x, q1.y * cti - q1.z * sti, q1.y * sti + q1.z * cti);
      vec2 d1 = uv - q1.xy / (1.55 + q1.z * 0.42);
      float lum1 = (0.0014 * g) / max(dot(d1, d1), 1.0e-5);

      float spark = lum0 + lum1;
      col += (tint * 0.65 + vec3(1.0) * 0.35) * spark;
    }
  }

  col = clamp(col, 0.0, 1.0);
  float a = clamp(dot(col, vec3(0.333)) * 1.35, 0.0, 1.0);
  return vec4(col, a);
`;u();var z1=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;
  float pv = clamp(pivot, 0.05, 0.95);
  float rowBands = max(6.0, bands);
  float sp = max(0.0, speed);
  vec2 st = _st;
  float row = floor(st.y * rowBands);
  float rib = fract(sin(row * 12.9898 + 78.233) * 43758.5453);
  float side = smoothstep(pv - 0.11, pv + 0.04, st.x);
  float wobble = sin(st.y * 6.2831853 * 15.0 + time * sp * 2.6) * 0.5 + 0.5;
  float smear = side * a * (0.045 + 0.16 * wobble + 0.11 * rib);
  float xPush = smear * (1.0 + max(0.0, st.x - pv) * 1.35 * side);
  st.x = clamp(st.x + xPush + (rib - 0.5) * side * a * 0.085, 0.001, 0.999);
  return st;
`;u();function $1(e,t){return`
    float pWn_${t} = ${e};
    vec3 p3_${t} = fract(vec3(pWn_${t}) * vec3(0.1031, 0.11369, 0.13787));
    p3_${t} += dot(p3_${t}, p3_${t}.yzx + 19.19);
    ${t} = fract(vec3(
      (p3_${t}.x + p3_${t}.y) * p3_${t}.z,
      (p3_${t}.x + p3_${t}.z) * p3_${t}.y,
      (p3_${t}.y + p3_${t}.z) * p3_${t}.x
    ));`}function YL(e,t){return`${t} = fract(sin(${e} * 12345.564) * 7658.76);`}function q1(e,t,n){return`${n} = smoothstep(0.0, ${e}, ${t}) * smoothstep(1.0, ${e}, ${t});`}function KL(e,t,n,o,r){return`
    vec2 suv_${e} = ${t} * ${o};
    vec2 sid_${e} = floor(suv_${e});
    vec2 sfr_${e} = fract(suv_${e}) - 0.5;
    vec3 sn_${e};
    ${$1(`sid_${e}.x * 107.45 + sid_${e}.y * 3543.654`,`sn_${e}`)}
    vec2 sp_${e} = (sn_${e}.xy - 0.5) * 0.7;
    float sd_${e} = length(sfr_${e} - sp_${e});
    float sfade_${e};
    ${q1("0.025",`fract(${n} + sn_${e}.z)`,`sfade_${e}`)}
    ${r} = smoothstep(0.3, 0.0, sd_${e}) * fract(sn_${e}.z * 10.0) * sfade_${e};`}function V1(e,t,n,o,r,i){return`
    vec2 UVloc_${e} = ${n};
    vec2 duv_${e} = ${t};
    duv_${e}.y += ${o} * 0.75;
    vec2 a_${e} = vec2(6.0, 1.0);
    vec2 grid_${e} = a_${e} * 2.0;
    vec2 id_${e} = floor(duv_${e} * grid_${e});

    float colShift_${e};
    ${YL(`id_${e}.x`,`colShift_${e}`)}
    duv_${e}.y += colShift_${e};

    id_${e} = floor(duv_${e} * grid_${e});
    vec3 n_${e};
    ${$1(`id_${e}.x * 35.2 + id_${e}.y * 2376.1`,`n_${e}`)}
    vec2 st_${e} = fract(duv_${e} * grid_${e}) - vec2(0.5, 0.0);

    float x_${e} = n_${e}.x - 0.5;

    float yW_${e} = UVloc_${e}.y * 20.0;
    float wiggle_${e} = sin(yW_${e} + sin(yW_${e}));
    x_${e} += wiggle_${e} * (0.5 - abs(x_${e})) * (n_${e}.z - 0.5);
    x_${e} *= 0.7;

    float ti_${e} = fract(${o} + n_${e}.z);
    float sawT_${e};
    ${q1("0.85",`ti_${e}`,`sawT_${e}`)}
    float yDrop_${e} = (sawT_${e} - 0.5) * 0.9 + 0.5;
    vec2 p_${e} = vec2(x_${e}, yDrop_${e});

    float d_${e} = length((st_${e} - p_${e}) * a_${e}.yx);
    float mainDrop_${e} = smoothstep(0.4, 0.0, d_${e});

    float r_${e} = sqrt(smoothstep(1.0, yDrop_${e}, st_${e}.y));
    float cd_${e} = abs(st_${e}.x - x_${e});
    float trail_${e} = smoothstep(0.23 * r_${e}, 0.15 * r_${e} * r_${e}, cd_${e});
    float trailFront_${e} = smoothstep(-0.02, 0.02, st_${e}.y - yDrop_${e});
    trail_${e} *= trailFront_${e} * r_${e} * r_${e};

    float yTrail_${e} = UVloc_${e}.y;
    float trail2_${e} = smoothstep(0.2 * r_${e}, 0.0, cd_${e});
    float droplets_${e} = max(0.0, (sin(yTrail_${e} * (1.0 - yTrail_${e}) * 120.0) - st_${e}.y))
      * trail2_${e} * trailFront_${e} * n_${e}.z;
    yTrail_${e} = fract(yTrail_${e} * 10.0) + (st_${e}.y - 0.5);
    float dd_${e} = length(st_${e} - vec2(x_${e}, yTrail_${e}));
    droplets_${e} = smoothstep(0.3, 0.0, dd_${e});

    ${r} = mainDrop_${e} + droplets_${e} * r_${e} * trailFront_${e};
    ${i} = trail_${e};`}function Uc(e,t,n,o,r,i,s,l){return`
  {
    float rainAmt_${e} = clamp(${r}, 0.0, 1.0);
    float l0_${e} = smoothstep(-0.5, 1.0, rainAmt_${e}) * 2.0;
    float l1_${e} = smoothstep(0.25, 0.75, rainAmt_${e});
    float l2_${e} = smoothstep(0.0, 0.5, rainAmt_${e});

    float sD_${e};
    ${KL(e,t,o,i,`sD_${e}`)}

    float m1x_${e}, m1t_${e};
    ${V1(`${e}a`,t,n,o,`m1x_${e}`,`m1t_${e}`)}

    float m2x_${e}, m2t_${e};
    ${V1(`${e}b`,`${t} * 1.85`,n,o,`m2x_${e}`,`m2t_${e}`)}

    float c_${e} = sD_${e} * l0_${e} + m1x_${e} * l1_${e} + m2x_${e} * l2_${e};
    ${s} = smoothstep(0.3, 1.0, c_${e});
    ${l} = max(m1t_${e} * l0_${e}, m2t_${e} * l1_${e});
  }`}var j1=`
  float dens = max(6.0, density);
  float grav = clamp(gravity, 0.0, 1.0);
  float spd = max(0.0, speed);
  float tAnim = time * spd * 0.58;
  float fallMul = mix(0.35, 1.15, grav);
  float tFall = tAnim * fallMul;
  float rainAmt = a;
  float staticScale = mix(24.0, 46.0, (dens - 6.0) / 34.0);
  float zoomBreath = -cos(time * spd * 0.6);
  float zoomMix = mix(0.4, 1.0, grav);
`;function X1(e){return`
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 stNorm = ${e};
  stNorm.y = 1.0 - stNorm.y;
  vec2 uv = stNorm - 0.5;
  uv.x *= aspect;
  uv *= 0.88 + zoomBreath * 0.08 * zoomMix;
  vec2 UV = stNorm;
  UV = (UV - 0.5) * (0.96 + zoomBreath * 0.04 * zoomMix) + 0.5;`}var Y1=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float refr = clamp(refraction, 0.0, 1.0);
  ${j1}
  ${X1("_st")}

  float dropH, dropTrail;
  ${Uc("d0","uv","UV","tFall","rainAmt","staticScale","dropH","dropTrail")}

  float eps = 1.0 / min(resolution.x, resolution.y);
  float dropHx, dropTrailX;
  ${Uc("dx","uv + vec2(eps, 0.0)","UV","tFall","rainAmt","staticScale","dropHx","dropTrailX")}

  float dropHy, dropTrailY;
  ${Uc("dy","uv + vec2(0.0, eps)","UV","tFall","rainAmt","staticScale","dropHy","dropTrailY")}

  vec2 n = vec2(dropHx - dropH, dropHy - dropH);

  float minBlur = mix(1.8, 2.6, grav);
  float maxBlur = mix(3.0, 6.0, rainAmt);
  float focus = mix(maxBlur - dropTrail, minBlur, smoothstep(0.1, 0.2, dropH));
  vec2 disp = n * mix(0.020, 0.068, refr) * a * (0.72 + focus * 0.04);
  disp.x /= aspect;
  disp.y = -disp.y;

  return _st + disp;
`,K1=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  ${j1}
  vec2 stUv = gl_FragCoord.xy / resolution.xy;
  ${X1("stUv")}

  float dropH, dropTrail;
  ${Uc("o0","uv","UV","tFall","rainAmt","staticScale","dropH","dropTrail")}

  float hi = clamp(highlights, 0.0, 1.0);
  float cover = clamp(dropH * a, 0.0, 1.0);
  float trailW = clamp(dropTrail * a, 0.0, 1.0);

  float spec = pow(cover, 3.6) * hi * a * 0.58;
  float trailLine = trailW * cover * hi * a * 0.36;
  float rim = smoothstep(0.42, 0.78, cover) * (1.0 - smoothstep(0.84, 0.98, cover)) * a * 0.3;

  vec3 c = _c0.rgb;
  float gray = 0.33333 * (c.r + c.g + c.b);
  c = mix(c, vec3(gray), cover * 0.03 * grav);

  c.r += spec * 0.98 + trailLine * 0.2;
  c.g += spec * 0.94 + trailLine * 0.24;
  c.b += spec * 1.04 + trailLine * 0.3;
  c -= vec3(rim * 0.1);
  c = mix(c, c * vec3(0.94, 0.97, 1.03), cover * 0.07 * a);

  vec2 vigUv = UV - 0.5;
  c *= 1.0 - dot(vigUv, vigUv) * 0.16 * a;

  return vec4(clamp(c, 0.0, 1.0), _c0.a);
`;u();var zc="vec3(0.299, 0.587, 0.114)";function Q1(e,t,n){return`
  float ${n} = 0.0;
  for (int i = 1; i <= 28; i++) {
    vec2 p_${e} = psUv ${t} psDir * (float(i) * psStep);
    if (p_${e}.x < 0.001 || p_${e}.x > 0.999 || p_${e}.y < 0.001 || p_${e}.y > 0.999) break;
    float l_${e} = dot(texture2D(videoTex, p_${e}).rgb, ${zc});
    if (l_${e} < psThr) break;
    ${n} = float(i) * psStep;
  }`}var Z1=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float dirI = floor(sortDir + 0.5);
  vec2 psDir = vec2(0.0, -1.0);
  if (dirI > 0.5 && dirI < 1.5) psDir = vec2(0.0, 1.0);
  if (dirI > 1.5 && dirI < 2.5) psDir = vec2(1.0, 0.0);
  if (dirI > 2.5) psDir = vec2(-1.0, 0.0);

  vec2 psUv = gl_FragCoord.xy / resolution.xy;
  float psLane = 0.0;
  if (abs(psDir.y) > 0.5) {
    psLane = floor(gl_FragCoord.x);
    psUv.x = (psLane + 0.5) / resolution.x;
  } else {
    psLane = floor(gl_FragCoord.y);
    psUv.y = (psLane + 0.5) / resolution.y;
  }
  psUv = clamp(psUv, 0.001, 0.999);

  float psChaos = clamp(chaos, 0.0, 1.0);
  float psH1 = fract(sin(psLane * 12.9898) * 43758.5453);
  float psH2 = fract(sin(psLane * 78.233 + 1.7) * 24634.6345);

  float psThr = clamp(clamp(threshold, 0.02, 0.98) + (psH1 - 0.5) * 0.5 * psChaos, 0.03, 0.97);
  float psReach = clamp(reach, 0.02, 1.0) * mix(1.0, 0.3 + 1.4 * psH2, psChaos);
  float psStep = psReach / float(28);

  float psMyL = dot(texture2D(videoTex, psUv).rgb, ${zc});

  if (psMyL >= psThr) {
    ${Q1("b","-","psBack")}
    ${Q1("f","+","psFwd")}

    float psSpan = psBack + psFwd;
    if (psSpan < psStep) return _c0;

    float psPos = psBack / psSpan;
    float psTarget = clamp(mix(psThr, 1.0, psPos) + (psH2 - 0.5) * 0.35 * psChaos, 0.0, 1.0);

    vec3 psBest = texture2D(videoTex, psUv).rgb;
    float psBestD = 10.0;
    for (int i = 0; i < 20; i++) {
      float f_r = (float(i) + 0.5) / float(20);
      vec2 p_r = clamp(psUv + psDir * (f_r * psSpan - psBack), 0.001, 0.999);
      vec3 c_r = texture2D(videoTex, p_r).rgb;
      float d_r = abs(dot(c_r, ${zc}) - psTarget);
      if (d_r < psBestD) { psBestD = d_r; psBest = c_r; }
    }

    return vec4(mix(_c0.rgb, psBest, a), _c0.a);
  }

  float psUpD = -1.0;
  vec3 psSrcC = _c0.rgb;
  for (int i = 1; i <= 28; i++) {
    vec2 p_m = psUv - psDir * (float(i) * psStep);
    if (p_m.x < 0.001 || p_m.x > 0.999 || p_m.y < 0.001 || p_m.y > 0.999) break;
    vec3 c_m = texture2D(videoTex, p_m).rgb;
    if (dot(c_m, ${zc}) >= psThr) {
      psUpD = float(i) * psStep;
      psSrcC = c_m;
      break;
    }
  }
  if (psUpD < 0.0) return _c0;

  float psT = psUpD / psReach;
  vec3 psStreak = psSrcC * mix(1.0, 0.72, psT);
  float psFade = 1.0 - smoothstep(0.8, 1.0, psT);
  return vec4(mix(_c0.rgb, psStreak, a * psFade), _c0.a);
`;u();var J1=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float freq = max(2.0, frequency);
  float spd = max(0.0, speed);
  float t = time * spd;

  vec2 uv = _st;
  vec2 origin = vec2(0.5);
  vec2 centered = uv - origin;
  float aspect = resolution.x / max(1.0, resolution.y);
  centered.x *= aspect;
  float dist = length(centered);

  float radialPhase = t * 2.8 - dist * mix(6.0, 14.0, freq * 0.04);
  float radial =
    sin(radialPhase) * 0.52 +
    sin(radialPhase * 1.63 + 1.1) * 0.28 +
    sin(radialPhase * 2.41 + 2.4) * 0.14;
  float radialScale = 1.0 - smoothstep(0.15, 0.95, dist);
  float radialWarp = radial * a * 0.11 * radialScale;

  float bandY = uv.y * freq * 6.2831853 + t * 3.6;
  float bandX = uv.x * freq * 4.71238898 + t * 2.1;
  float hWobble =
    sin(bandY) * 0.58 +
    sin(bandY * 2.07 + 0.7) * 0.26 +
    sin(bandY * 3.61 + 1.4) * 0.12;
  float vWobble =
    cos(bandX) * 0.42 +
    sin(bandX * 1.83 + 0.9) * 0.22 +
    cos(bandX * 2.97 + 1.8) * 0.1;

  vec2 dir = dist > 1e-4 ? centered / dist : vec2(0.0, 1.0);
  vec2 disp = vec2(hWobble, vWobble) * a * 0.042;
  disp += dir * radialWarp;
  disp.x /= aspect;

  return _st + disp;
`;u();var ex=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float trk = clamp(tracking, 0.0, 1.0);
  float spd = max(0.05, speed);
  float t = time * spd;

  vec2 uv = _st;
  float y = uv.y;
  float row = floor(y * max(1.0, resolution.y));

  float rn = fract(sin(row * 12.9898 + floor(t * 7.0) * 0.17) * 43758.5453);
  float rn2 = fract(sin(row * 78.233 + t * 2.3) * 43758.5453);
  float trackX =
    (rn - 0.5) * trk * a * 0.032 +
    sin(y * 220.0 + t * 5.5) * trk * a * 0.0045;

  float slipGate = step(0.982, fract(sin(floor(t * 1.6) * 991.0) * 43758.5453));
  trackX += slipGate * trk * a * 0.07 * (rn2 - 0.5);

  float headBand = step(0.9, fract(sin(floor(t * 2.8) * 17.0) * 43758.5453));
  float vJitter = headBand * trk * a * 0.014 * sin(t * 36.0);

  return _st + vec2(trackX, vJitter);
`,tx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float nz = clamp(noise, 0.0, 1.0);
  float ln = clamp(lines, 0.0, 1.0);
  float dr = clamp(dropout, 0.0, 1.0);

  vec4 c = _c0;
  vec2 px = gl_FragCoord.xy / resolution.xy;
  float yPix = gl_FragCoord.y;

  float scan = sin(yPix * 3.14159) * 0.5 + 0.5;
  float scanDim = mix(1.0, 0.78 + scan * 0.22, ln * a);
  c.rgb *= scanDim;

  float n = fract(sin(dot(px * (time * 55.0 + 1.0), vec2(12.9898, 78.233))) * 43758.5453);
  float n2 = fract(sin(dot(px * 880.0 + floor(time * 22.0), vec2(39.346, 11.135))) * 43758.5453);
  c.rgb += (n - 0.5) * nz * a * 0.11 + (n2 - 0.5) * nz * a * 0.075;

  float row = floor(px.y * 480.0);
  float dropRand = fract(sin(row * 19.19 + floor(time * 3.8) * 0.31) * 43758.5453);
  if (dropRand > 1.0 - dr * a * 0.075) {
    float staticBand = fract(sin(row * 91.7 + time * 110.0) * 43758.5453);
    c.rgb = mix(c.rgb, vec3(staticBand * 0.35 + 0.1), 0.55 * dr * a);
  }

  float luma = dot(c.rgb, vec3(0.299, 0.587, 0.114));
  c.rgb = mix(c.rgb, vec3(luma), a * 0.14);
  c.rgb = mix(c.rgb, c.rgb * vec3(0.98, 1.02, 0.96), a * 0.22);

  return c;
`;u();var nx=`
  vec2 t = _st - 2.0 * floor(_st * 0.5);
  t = mix(t, 2.0 - t, step(1.0, t));
  vec2 inset = 0.5 / max(resolution.xy, vec2(1.0));
  return clamp(t, inset, 1.0 - inset);
`,QL=`
  vec2 tB = stB - 2.0 * floor(stB * 0.5);
  tB = mix(tB, 2.0 - tB, step(1.0, tB));
  vec2 insetB = 0.5 / max(resolution.xy, vec2(1.0));
  stB = clamp(tB, insetB, 1.0 - insetB);
`,ox=`
  float a = clamp(amount, 0.0, 2.0);
  if (a < 0.00001) return _st;

  float aspectN = resolution.x / max(1.0, resolution.y);
  float epsN = 2.0 / min(resolution.x, resolution.y);
  vec2 uvN = _st;
  uvN.x *= aspectN;
  vec2 pN = uvN;
  float scN = max(2.0, scale);
  float tN = time * max(0.0, speed);

  vec2 qC = pN * scN;
  float n0 = fract(sin(dot(qC + vec2(tN * 0.31, tN * 0.17), vec2(127.1, 311.7))) * 43758.5453);
  float n1 = fract(sin(dot(qC * 2.13 + vec2(4.1, tN * 0.23), vec2(127.1, 311.7))) * 43758.5453);
  float n2 = fract(sin(dot(qC * 4.07 - vec2(2.3, tN * 0.19), vec2(127.1, 311.7))) * 43758.5453);
  float hC = (n0 + n1 * 0.5 + n2 * 0.25) / 1.75;

  vec2 pX = pN + vec2(epsN, 0.0);
  vec2 qX = pX * scN;
  float nx0 = fract(sin(dot(qX + vec2(tN * 0.31, tN * 0.17), vec2(127.1, 311.7))) * 43758.5453);
  float nx1 = fract(sin(dot(qX * 2.13 + vec2(4.1, tN * 0.23), vec2(127.1, 311.7))) * 43758.5453);
  float nx2 = fract(sin(dot(qX * 4.07 - vec2(2.3, tN * 0.19), vec2(127.1, 311.7))) * 43758.5453);
  float hX = (nx0 + nx1 * 0.5 + nx2 * 0.25) / 1.75;

  vec2 pY = pN + vec2(0.0, epsN);
  vec2 qY = pY * scN;
  float ny0 = fract(sin(dot(qY + vec2(tN * 0.31, tN * 0.17), vec2(127.1, 311.7))) * 43758.5453);
  float ny1 = fract(sin(dot(qY * 2.13 + vec2(4.1, tN * 0.23), vec2(127.1, 311.7))) * 43758.5453);
  float ny2 = fract(sin(dot(qY * 4.07 - vec2(2.3, tN * 0.19), vec2(127.1, 311.7))) * 43758.5453);
  float hY = (ny0 + ny1 * 0.5 + ny2 * 0.25) / 1.75;

  vec2 offset = vec2(hC - hX, hC - hY) * a * 0.11;
  offset.x /= aspectN;
  vec2 stB = _st + offset;
  ${QL}
  return stB;
`;u();var xd=[1,12,66,220,495,792,924,792,495,220,66,12,1],Vc=[1,8,28,56,70,56,28,8,1];function rx(e,t){return[`  u = ${e};`,"  t = u - 2.0 * floor(u * 0.5);","  t = mix(t, 2.0 - t, step(1.0, t));",`  acc += texture2D(blurTex, clamp(t, inset, 1.0 - inset)) * ${t.toFixed(6)};`].join(`
`)}function ZL(){let e=xd.length,t=(e-1)/2,n=xd.reduce((r,i)=>r+i,0),o=[];for(let r=0;r<e;r++){let i=xd[r]/n,s=r-t,l=s===0?"st":`st + cell * ${s.toFixed(1)}`;o.push(rx(l,i))}return o.join(`
`)}function JL(){let e=Vc.length,t=(e-1)/2,n=Vc.reduce((r,i)=>r+i,0),o=[];for(let r=0;r<e;r++)for(let i=0;i<e;i++){let s=Vc[i]*Vc[r]/(n*n),l=i-t,m=r-t,d=l===0&&m===0?"st":`st + vec2(${l.toFixed(1)}, ${m.toFixed(1)}) * cell`;o.push(rx(d,s))}return o.join(`
`)}var ax=`
  float a = clamp(amount, 0.0, 2.0);
  if (a < 0.00001) return _c0;

  vec2 st = gl_FragCoord.xy / max(resolution.xy, vec2(1.0));
  vec2 texel = 1.0 / max(resolution.xy, vec2(1.0));
  vec2 inset = texel * 0.5;
  float outer = a * ${32 .toFixed(1)};
  vec2 u = vec2(0.0);
  vec2 t = vec2(0.0);
  vec4 acc = vec4(0.0);
`,D9=`
${ax}
  vec2 cell = (axis < 0.5 ? vec2(texel.x, 0.0) : vec2(0.0, texel.y)) * max(0.6, outer / 6.0);
${ZL()}
  return vec4(acc.rgb, _c0.a);
`,ix=`
${ax}
  vec2 cell = texel * max(0.6, outer / 4.0);
${JL()}
  return vec4(acc.rgb, _c0.a);
`;u();var sx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float aspect = resolution.x / max(1.0, resolution.y);
  float sc = max(2.0, cells);
  float refr = clamp(refraction, 0.0, 1.0);
  float driftAmt = clamp(drift, 0.0, 1.0);
  float t = time * max(0.0, speed);

  vec2 uv = _st;
  uv.x *= aspect;
  uv -= vec2(aspect * 0.5, 0.5);

  uv.x += 0.04 * t * driftAmt;
  uv.y -= cos(1.1 * floor(sc * uv.x) + 0.05 * t) * driftAmt;

  vec2 ipos = floor(sc * uv) + 0.5;
  vec2 fpos = sc * uv - ipos;

  float hCell = fract(sin(dot(ipos, vec2(12.9898, 78.233))) * 43758.5453123);

  float aAng = 6.2831853 * hCell;
  float val0 = hCell - 10.0 * (cos(aAng) * uv.x + sin(aAng) * uv.y) - 0.1 * t;
  float v0Floor = floor(val0);
  float v0Frac = fract(val0);
  float v0Mix = v0Frac * v0Frac * (3.0 - 2.0 * v0Frac);
  float v0A = fract(sin(dot(v0Floor + 0.01 * ipos, vec2(12.9898, 78.233))) * 43758.5453123);
  float v0B = fract(sin(dot(v0Floor + 1.0 + 0.01 * ipos, vec2(12.9898, 78.233))) * 43758.5453123);
  float v0 = mix(v0A, v0B, v0Mix);

  float thcArg = v0 * 10.0 * length(fpos);
  float thcIn = 4.0 * cos(thcArg);
  float thcE2x = exp(clamp(2.0 * thcIn, -20.0, 20.0));
  float thcNum = (thcE2x - 1.0) / (thcE2x + 1.0);
  float thcVal = thcNum / 0.9993292947;

  float val = hCell - 2.5 * v0 * thcVal - 0.5 * t;
  float vFloor = floor(val);
  float vFrac = fract(val);
  float vMix = vFrac * vFrac * (3.0 - 2.0 * vFrac);
  float vA = fract(sin(dot(vFloor + 0.01 * ipos, vec2(12.9898, 78.233))) * 43758.5453123);
  float vB = fract(sin(dot(vFloor + 1.0 + 0.01 * ipos, vec2(12.9898, 78.233))) * 43758.5453123);
  float v = mix(vA, vB, vMix);

  float rd = max(0.08, 0.5 * v);
  float blobT = 10.0 * v + length(fpos) * 10.0 * v0 - t;
  vec2 p = (0.5 - rd) * vec2(cos(blobT), sin(blobT));

  vec2 rel = fpos - p;
  float d = length(rel);

  float k = 0.5;
  float s = smoothstep(-k, k, -d + rd);
  s = 2.0 * s * s * s;

  vec2 grad = vec2(0.0);
  float z = sqrt(max(0.0, rd * rd - d * d));
  float lens = step(d, rd) * step(1e-5, d);
  grad = (-rel / max(d, 1e-5)) * (z / max(rd, 1e-4)) * s * lens;

  vec2 disp = grad * refr * a * 0.18;
  disp.x /= sc * aspect;
  disp.y /= sc;

  vec2 outSt = _st + disp;
  return clamp(outSt, 0.001, 0.999);
`;u();var lx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float g = max(2.0, floor(cells + 0.5));
  float chaosAmt = clamp(chaos, 0.0, 1.0);
  float s = seed + 1.0;

  vec2 grid = vec2(g);
  vec2 cell = floor(_st * grid);
  vec2 local = fract(_st * grid);
  float idx = cell.y * g + cell.x;
  float n = g * g;

  float odd = 2.0 * floor(fract(s * 0.6180339887) * 47.0) + 1.0;
  float off = floor(fract(s * 0.3819660113) * n);
  float shuffled = mod(idx * odd + off, n);

  float h = fract(sin((idx + 1.7) * 12.9898 + s * 78.233) * 43758.5453);
  float srcIdx = mix(idx, shuffled, step(h, chaosAmt));

  vec2 srcCell = vec2(mod(srcIdx, g), floor(srcIdx / g));
  vec2 srcUv = (srcCell + local) / grid;
  return mix(_st, clamp(srcUv, 0.001, 0.999), a);
`;u();var cx=`
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 p0 = uv - 0.5;
  p0.x *= aspect;

  float sc = mix(0.12, 1.0, clamp(scale, 0.0, 1.0));
  float scN = clamp(scale, 0.0, 1.0);
  float depthAmt = mix(0.22, 1.0, scN);
  float dens = mix(2.0, 18.0, clamp(density, 0.0, 1.0));
  float spr = clamp(spread, 0.0, 1.0);
  float groupW = mix(0.94, 0.1, spr);
  float stripesN = mix(5.0, 2.0, spr);
  float rnd = clamp(randomness, 0.0, 1.0);
  float th = clamp(thickness, 0.0, 1.0);
  float halfThickN = mix(0.08, 0.45, th);
  float glowAmt = mix(0.35, 0.95, th);
  float ang = rotate * 6.28318530718;
  float ca = cos(ang);
  float sa = sin(ang);
  float mir = step(0.5, mirror);
  float pxX = 1.0 / max(resolution.x, 1.0);
  float pxY = 1.0 / max(resolution.y, 1.0);

  float layerCount = layers <= 1.5 ? 1.0 : (layers <= 3.0 ? 2.0 : (layers <= 6.0 ? 4.0 : 8.0));
  float accum = 0.0;

  for (float li = 0.0; li < 8.0; li += 1.0) {
    if (li > layerCount - 0.5) break;

    float t = layerCount < 1.5 ? 0.0 : li / max(layerCount - 1.0, 1.0);
    float farSc = mix(0.78, 0.3, depthAmt);
    float layerSc = mix(1.0, farSc, t);
    float farAlpha = mix(0.58, 0.14, depthAmt);
    float layerBright = mix(1.4, farAlpha, t * t);
    float phaseOff = li * 0.137 + t * 0.31;
    float invLayer = 1.0 / max(0.001, sc * layerSc);

    vec2 p = p0 * invLayer;
    vec2 box = abs(p);
    vec2 fold = mix(p, box, mir);

    float halfW = aspect * 0.5;
    float halfH = 0.5;
    float edgeSoft = mix(0.12, 0.32, scN);
    float inside =
      (1.0 - smoothstep(halfW - edgeSoft * aspect, halfW + edgeSoft * 0.25, box.x)) *
      (1.0 - smoothstep(halfH - edgeSoft, halfH + edgeSoft * 0.25, box.y));

    vec2 q = vec2(ca * fold.x - sa * fold.y, sa * fold.x + ca * fold.y);

    float tipW = edgeSoft * 2.4 * max(halfW, 0.2);
    float tipFade = smoothstep(0.0, tipW, halfW - abs(q.x));
    tipFade = tipFade * mix(1.0, tipFade, 0.45);

    float ynAxis = mix(0.5 + 0.5 * (q.y / max(halfH, 0.0001)), abs(q.y) / max(halfH, 0.0001), mir);
    float yn = clamp(ynAxis + phaseOff * 0.08, 0.0, 1.0);

    float cell = yn * dens;
    float groupIdx = floor(cell);
    float gHash = fract(sin((groupIdx + li * 3.7) * 12.9898 + 78.233) * 43758.5453);
    float gHash2 = fract(sin((groupIdx + li * 5.1) * 39.346 + 11.135) * 43758.5453);
    float groupWVar = clamp(groupW * mix(1.0, mix(0.5, 1.35, gHash), rnd), 0.06, 0.98);
    float fi = fract(cell + (gHash2 - 0.5) * rnd * 0.22);
    float inGroup = step(fi, groupWVar);

    float localT = fi / max(groupWVar, 0.001);
    float lineIdx = floor(localT * stripesN);
    float lHash = fract(sin((groupIdx * 17.0 + lineIdx + li * 11.0) * 45.164) * 43758.5453);
    float stripeCoord = localT * stripesN + (lHash - 0.5) * rnd * 0.4;
    float fine = fract(stripeCoord);
    float dN = abs(fine - 0.5) * 2.0;

    float periodQ = (groupWVar / max(stripesN, 0.001)) * (halfH / max(dens, 0.001));
    float distQ = dN * 0.5 * periodQ;
    float gradQ = invLayer * (abs(sa) * aspect * pxX + abs(ca) * pxY);
    float aaQ = max(gradQ * 1.35, pxY * invLayer);
    float halfThickQ = min(max(halfThickN * 0.5 * periodQ, min(aaQ, periodQ * 0.22)), periodQ * 0.34);
    float core = 1.0 - smoothstep(halfThickQ * 0.35, halfThickQ, distQ);
    float softRad = min(halfThickQ * mix(1.15, 2.1, glowAmt), periodQ * 0.42);
    float soft = exp(-distQ * distQ / max(softRad * softRad * 0.4, 1.0e-8)) * glowAmt;

    float mask = clamp(inGroup * max(core, soft) * inside * tipFade, 0.0, 1.0);
    accum += mask * layerBright;
  }

  float burn = accum * 1.8;
  float a = 1.0 - exp(-accum * 1.7);
  vec3 col = vec3(cr, cg, cb) * burn;
  return vec4(col, a);
`;u();var ux=`
  vec2 uv = _st;
  float aspect = resolution.x / max(1.0, resolution.y);
  vec3 wLuma = vec3(0.299, 0.587, 0.114);

  float fBase = mix(0.01, 0.1, clamp(feed, 0.0, 1.0));
  float kBase = mix(0.045, 0.07, clamp(kill, 0.0, 1.0));
  float style = clamp(styleMap, 0.0, 1.0);
  float srcAmt = clamp(videoDrive, 0.0, 1.0);
  float flowAmt = clamp(flow, 0.0, 1.0);
  float emb = clamp(emboss, 0.0, 1.0);

  float h = mix(1.6, 5.0, clamp(scale, 3.0, 40.0) / 40.0) / min(resolution.x, resolution.y);
  vec2 hx = vec2(h / aspect, 0.0);
  vec2 hy = vec2(0.0, h);
  vec2 d1 = vec2(h / aspect, h);
  vec2 d2 = vec2(h / aspect, -h);

  vec4 vidC = texture2D(videoTex, uv);
  float vidL = dot(vidC.rgb, wLuma);
  float vidLx = dot(texture2D(videoTex, clamp(uv + hx, 0.001, 0.999)).rgb, wLuma)
    - dot(texture2D(videoTex, clamp(uv - hx, 0.001, 0.999)).rgb, wLuma);
  float vidLy = dot(texture2D(videoTex, clamp(uv + hy, 0.001, 0.999)).rgb, wLuma)
    - dot(texture2D(videoTex, clamp(uv - hy, 0.001, 0.999)).rgb, wLuma);
  float vidEdge = clamp(length(vec2(vidLx, vidLy)) * 3.2, 0.0, 1.0);

  float f = fBase + (uv.y - 0.5) * style * 0.038 + (vidL - 0.5) * srcAmt * 0.042;
  float k = kBase + (uv.x - 0.5) * style * 0.024 + (vidEdge - 0.35) * srcAmt * 0.028;
  f = clamp(f, 0.008, 0.11);
  k = clamp(k, 0.042, 0.072);

  vec4 prev = texture2D(stateTex, uv);
  float A = prev.r;
  float B = prev.g;

  if (forceSeed > 0.5) {
    A = 1.0;
    B = 0.0;
    float seedMask = smoothstep(0.08, 0.42, vidEdge) * srcAmt;
    seedMask = max(seedMask, (1.0 - vidL) * srcAmt * 0.35);
    seedMask = max(seedMask, smoothstep(0.55, 0.92, vidL) * srcAmt * 0.22);
    B = clamp(seedMask, 0.0, 1.0);
  } else {
    if (flowAmt > 0.0005) {
      vec2 vidGrad = vec2(vidLx, vidLy);
      vec2 advecUv = clamp(uv - vidGrad * flowAmt * 0.028, 0.002, 0.998);
      vec4 advec = texture2D(stateTex, advecUv);
      A = advec.r;
      B = advec.g;
    }

    float lapA =
      texture2D(stateTex, uv + hx).r * 0.2 +
      texture2D(stateTex, uv - hx).r * 0.2 +
      texture2D(stateTex, uv + hy).r * 0.2 +
      texture2D(stateTex, uv - hy).r * 0.2 +
      texture2D(stateTex, uv + d1).r * 0.05 +
      texture2D(stateTex, uv - d1).r * 0.05 +
      texture2D(stateTex, uv + d2).r * 0.05 +
      texture2D(stateTex, uv - d2).r * 0.05 -
      A;

    float lapB =
      texture2D(stateTex, uv + hx).g * 0.2 +
      texture2D(stateTex, uv - hx).g * 0.2 +
      texture2D(stateTex, uv + hy).g * 0.2 +
      texture2D(stateTex, uv - hy).g * 0.2 +
      texture2D(stateTex, uv + d1).g * 0.05 +
      texture2D(stateTex, uv - d1).g * 0.05 +
      texture2D(stateTex, uv + d2).g * 0.05 +
      texture2D(stateTex, uv - d2).g * 0.05 -
      B;

    float reaction = A * B * B;
    float dt = 0.55 + clamp(speed, 0.0, 2.0) * 0.45;
    A = clamp(A + (lapA - reaction + f * (1.0 - A)) * dt, 0.0, 1.0);
    B = clamp(B + (0.5 * lapB + reaction - (k + f) * B) * dt, 0.0, 1.0);

    float seedPulse = smoothstep(0.1, 0.55, vidEdge) * srcAmt * 0.11;
    seedPulse += smoothstep(0.62, 0.95, vidL) * srcAmt * 0.045;
    B = clamp(B + seedPulse, 0.0, 1.0);
  }

  float lapBVis =
    texture2D(stateTex, uv + hx).g * 0.2 +
    texture2D(stateTex, uv - hx).g * 0.2 +
    texture2D(stateTex, uv + hy).g * 0.2 +
    texture2D(stateTex, uv - hy).g * 0.2 +
    texture2D(stateTex, uv + d1).g * 0.05 +
    texture2D(stateTex, uv - d1).g * 0.05 +
    texture2D(stateTex, uv + d2).g * 0.05 +
    texture2D(stateTex, uv - d2).g * 0.05 -
    B;
  float light = clamp(0.42 + B * 0.38 + lapBVis * 2.8 * emb, 0.0, 1.0);

  return vec4(A, B, light, 1.0);
`,px=`
  float amt = clamp(amount, 0.0, 1.0);
  if (amt < 0.00001) return _c0;

  float A = _c1.r;
  float B = _c1.g;
  float light = _c1.b;

  float edge = abs(A - B);
  float pat = smoothstep(0.03, 0.78, B + edge * 0.32);
  pat = clamp(pat * mix(0.75, 1.25, light), 0.0, 1.0);

  vec3 vid = _c0.rgb;
  vec3 patCol = vid * (0.28 + pat * 1.15);
  patCol *= mix(0.72, 1.38, light);
  patCol = mix(patCol, max(vid * 0.35, patCol), pat);

  vec4 c = _c0;
  c.rgb = mix(c.rgb, max(c.rgb * 0.32, patCol), amt * pat);
  return c;
`;u();var mx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec3 dust = _c1.rgb;
  float lum = max(max(dust.r, dust.g), dust.b);
  if (lum < 0.0008) return _c0;

  float mixAmt = clamp(lum * a * 1.22, 0.0, 1.0);
  return vec4(max(_c0.rgb, mix(_c0.rgb, dust * 1.4, mixAmt)), _c0.a);
`;u();var dx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec4 t = _c1;
  float alpha = clamp(t.a * a, 0.0, 1.0);
  if (alpha < 0.00001) return _c0;
  vec3 col = t.rgb;
  float g = clamp(glow, 0.0, 1.0);
  vec3 lit = col * (1.0 + g * 1.55);
  vec3 outRgb = mix(_c0.rgb, lit, alpha);
  outRgb = max(outRgb, col * alpha * g * 0.38);
  return vec4(outRgb, _c0.a);
`;u();function $c(e,t,n,o,r){return`
    vec2 q_${e} = ${t};
    q_${e}.y -= t * 0.18;
    float warp_${e} = _noise(vec3(q_${e} * vec2(2.1, 1.05), t * 0.22)) * 0.5 + 0.5;
    float curl_${e} = _noise(vec3(q_${e} * vec2(den * 2.8, den * 1.4) + 1.7, t * 0.7)) * 0.5 + 0.5;
    q_${e}.x += (warp_${e} - 0.5) * turb * 0.42 + (curl_${e} - 0.5) * turb * 0.22;
    q_${e}.y += (warp_${e} - 0.5) * turb * 0.12 + (curl_${e} - 0.5) * turb * 0.08;
    float n1_${e} = _noise(vec3(q_${e} * vec2(den * 0.85, den * 0.42), t * 0.32)) * 0.5 + 0.5;
    float n2_${e} = _noise(vec3(q_${e} * vec2(den * 1.8, den * 0.9) + 2.4, t * 0.55)) * 0.5 + 0.5;
    float n3_${e} = _noise(vec3(q_${e} * vec2(den * 3.6, den * 1.7) + 6.1, t * 0.9)) * 0.5 + 0.5;
    float field_${e} = n1_${e} * 0.52 + n2_${e} * 0.32 + n3_${e} * 0.16;
    float bottom_${e} = 1.0 - ${t}.y;
    float ${n} = field_${e} * mix(0.45, 1.3, pow(clamp(bottom_${e}, 0.0, 1.0), 0.5));
    ${n} += (_noise(vec3(${t}.x * den * 2.4, bottom_${e} * 3.2 - t * 0.4, t * 0.2)) * 0.5 + 0.5) * 0.14 * turb;
    float ${r} = smoothstep(0.22, 0.7, ${n});
    ${r} *= smoothstep(0.0, 0.16, bottom_${e}) * mix(0.35, 1.0, smoothstep(0.05, 0.72, bottom_${e}));
    float ${o} = warp_${e};
  `}var fx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  vec2 st = _st;
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 p = vec2(st.x * aspect, 1.0 - st.y);
  float den = mix(1.8, 6.2, clamp(density, 6.0, 40.0) / 40.0);
  float t = time * clamp(speed, 0.0, 3.0);
  float turb = 0.68;
  float waveStr = clamp(waves, 0.0, 1.0) * a;
  ${$c("d0","p","tongues","warp","wall")}
  float flameZone = smoothstep(0.02, 0.42, wall);
  float ky = mix(3.8, 13.0, clamp(density, 6.0, 40.0) / 40.0);
  float ph1 = p.y * ky - t * 1.35 + sin(p.x * ky * 0.48 + t * 0.32) * 0.85;
  float ph2 = p.y * ky * 1.7 - t * 2.05 + sin(p.x * ky * 0.9 - t * 0.5) * 0.4;
  st.x += (sin(ph1) + sin(ph2) * 0.5) * waveStr * flameZone * 0.04 / aspect;
  st.y += (cos(ph1) * 0.4 + cos(ph2) * 0.18) * waveStr * flameZone * 0.014;
  float eps = 0.02;
  vec2 px = p + vec2(eps, 0.0);
  ${$c("dx","px","tonguesX","warpX","wallX")}
  vec2 py = p + vec2(0.0, eps);
  ${$c("dy","py","tonguesY","warpY","wallY")}
  vec2 grad = vec2(tonguesX - tongues, tonguesY - tongues);
  float push = flameZone * a * 0.55;
  st.x += (grad.x * 1.05 + (warp - 0.5) * 0.3) * push * 0.034 / aspect;
  st.y -= (grad.y * 0.8) * push * 0.02;
  return clamp(st, vec2(0.001), vec2(0.999));
`,hx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 st = vec2(uv.x, 1.0 - uv.y);
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 p = vec2(st.x * aspect, st.y);
  float den = mix(1.8, 6.2, clamp(density, 6.0, 40.0) / 40.0);
  float sparkDen = clamp(density, 6.0, 40.0);
  float t = time * clamp(speed, 0.0, 3.0);
  float turb = 0.68;
  float sparkAmt = clamp(intensity, 0.0, 1.0);
  float glowAmt = clamp(glow, 0.0, 1.0);
  float waveAmt = clamp(waves, 0.0, 1.0);
  ${$c("o0","p","tongues","warp","wall")}
  float burn = a * mix(0.55, 1.45, glowAmt);
  float cover = clamp(wall * burn, 0.0, 1.0);

  vec3 fire = mix(vec3(0.12, 0.01, 0.0), vec3(0.95, 0.2, 0.015), smoothstep(0.1, 0.45, tongues));
  fire = mix(fire, vec3(1.0, 0.55, 0.06), smoothstep(0.4, 0.76, tongues));
  fire = mix(fire, vec3(1.0, 0.95, 0.72), smoothstep(0.68, 1.08, tongues));

  float sparkCore = 0.0;
  float sparkTail = 0.0;
  float sparkHot = 0.0;
  float nearFlame = clamp(cover + smoothstep(0.08, 0.42, tongues) * 0.85, 0.0, 1.0);

  for (int layer = 0; layer < 3; layer++) {
    float fi = float(layer);
    float cols = sparkDen * (0.24 + fi * 0.09);
    for (int slot = 0; slot < 3; slot++) {
      float si = float(slot);
      float col = floor(uv.x * cols + fi * 2.9 + si * 1.13);
      vec3 hash = fract(vec3(col, si + fi * 7.1, col * 1.7 + si * 3.3) * vec3(0.1031, 0.1030, 0.0973));
      hash += dot(hash, hash.yzx + 33.33);
      hash = fract((hash.xxy + hash.yzz) * hash.zyx);
      float speedRnd = pow(fract(hash.y * 14.2 + hash.z * 3.1), 1.55);
      float riseSpeed = mix(0.16, 2.05, speedRnd);
      float life = fract(hash.z + t * riseSpeed);
      float maxH = mix(0.42, 1.02, pow(fract(hash.x * 5.7 + hash.y), 0.65));
      float py = life * maxH;
      float driftA = _noise(vec3(hash.xy * 4.1 + col * 0.03, t * mix(0.05, 0.24, hash.z)));
      float driftB = _noise(vec3(hash.zx * 2.8 + 2.4, t * mix(0.03, 0.14, hash.x)));
      float driftAmp = mix(0.012, 0.065, pow(fract(hash.x * 9.1 + hash.y), 1.2));
      float lean = mix(-0.07, 0.07, fract(hash.x * 3.9 + si * 0.2));
      float px = (col + mix(0.18, 0.82, hash.x)) / cols;
      px += (driftA - 0.5) * driftAmp + (driftB - 0.5) * driftAmp * 0.45;
      px += lean * life;
      float brightRnd = pow(fract(hash.z * 8.3 + hash.x * 2.9), 2.1);
      float sparkInt = mix(0.18, 1.85, brightRnd);
      float born = smoothstep(0.0, 0.08, life) * (1.0 - smoothstep(0.78, 1.0, life));
      float flicker = 0.82 + 0.18 * (0.5 + 0.5 * sin(t * mix(1.2, 3.4, hash.y) + hash.x * 8.0));
      float visible = step(1.0 - mix(0.35, 0.85, sparkAmt), fract(hash.x + hash.z * 1.7 + si * 0.17));
      float sizeRnd = pow(fract(hash.x * 13.7 + hash.y * 4.2), 1.7);
      float radius = mix(0.008, 0.028, sizeRnd);
      vec2 sparkDelta = (st - vec2(px, py)) * vec2(aspect, 1.0);
      float pointy = step(0.62, fract(hash.y + hash.z));
      float tailLen = mix(0.8, 3.4, (1.0 - pointy) * mix(0.35, 1.0, fract(hash.x * 3.1)) * mix(0.5, 1.2, speedRnd));
      float above = step(0.0, sparkDelta.y);
      float ax = abs(sparkDelta.x) / max(radius * 0.18, 0.0004);
      float ay = mix(-sparkDelta.y / max(radius * tailLen, 0.0004), sparkDelta.y / max(radius * 0.3, 0.0004), above);
      float streak = exp(-ax * ax * 7.0 - ay * ay * 2.2);
      float core = exp(-dot(sparkDelta, sparkDelta) / max(radius * radius * 0.16, 0.00005));
      float riseFade = smoothstep(0.0, 0.05, py) * (1.0 - smoothstep(0.72, 1.0, py));
      float weight = riseFade * born * visible * sparkInt * flicker * mix(0.2, 1.0, nearFlame) * (0.95 - fi * 0.16);
      sparkCore += core * weight;
      sparkTail += streak * weight * (1.0 - pointy * 0.7);
      sparkHot += core * weight * brightRnd;
    }
  }

  vec3 color = _c0.rgb;
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 warmed = color * mix(vec3(1.0), vec3(1.35, 0.42, 0.08), cover * 0.78);
  vec3 through = warmed + fire * (0.22 + luma * 1.05) * cover;
  vec3 screenF = 1.0 - (1.0 - warmed) * (1.0 - fire * cover * 0.92);
  color = mix(through, screenF, cover * 0.58);
  color += fire * pow(cover, 1.35) * mix(0.22, 1.25, glowAmt);
  color += vec3(1.0, 0.93, 0.7) * pow(clamp(cover * tongues, 0.0, 1.0), 2.2) * glowAmt * 0.85;
  color += fire * waveAmt * cover * 0.22;
  color += vec3(1.0, 0.32, 0.03) * sparkTail * sparkAmt * a * 1.55;
  color += vec3(1.0, 0.94, 0.62) * sparkCore * sparkAmt * a * 2.05;
  color += vec3(1.0, 0.95, 0.75) * sparkHot * sparkAmt * a * 1.35;
  return vec4(clamp(color, 0.0, 1.0), _c0.a);
`,_x=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float waveAmt = clamp(waves, 0.0, 1.0);
  float warm0 = max(_c0.r - _c0.b, 0.0);
  float warm1 = max(_c1.r - _c1.b, 0.0);
  float trail = clamp(warm0 * 0.72 + warm1 * 0.55, 0.0, 0.7) * waveAmt * a;
  vec3 smeared = mix(_c0.rgb, _c1.rgb, trail);
  return vec4(clamp(smeared, 0.0, 1.0), _c0.a);
`;u();var gx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float d = clamp(density, 4.0, 48.0);
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 cells = vec2(d * aspect, d);
  vec2 scaled = _st * cells;
  vec2 baseCell = floor(scaled);
  vec2 local = fract(scaled);
  float nearest = 100.0;
  vec2 nearestId = baseCell;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 id = baseCell + neighbor;
      vec3 hash = fract(vec3(id.xyx) * vec3(0.1031, 0.1030, 0.0973));
      hash += dot(hash, hash.yzx + 33.33);
      vec2 point = fract((hash.xx + hash.yz) * hash.zy);
      point = mix(vec2(0.5), point, clamp(irregularity, 0.0, 1.0));
      vec2 delta = neighbor + point - local;
      float distanceToPoint = dot(delta, delta);
      if (distanceToPoint < nearest) {
        nearest = distanceToPoint;
        nearestId = id;
      }
    }
  }

  vec3 shardHash = fract(vec3(nearestId.xyx) * vec3(0.1099, 0.1137, 0.1379));
  shardHash += dot(shardHash, shardHash.yzx + 19.19);
  vec2 direction = fract((shardHash.xx + shardHash.yz) * shardHash.zy) - 0.5;
  vec2 offset = direction * clamp(scatter, 0.0, 1.0) * a * 0.12;
  return clamp(_st + offset, vec2(0.001), vec2(0.999));
`,bx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec2 uv = vec2(
    gl_FragCoord.x / resolution.x,
    1.0 - gl_FragCoord.y / resolution.y
  );
  float d = clamp(density, 4.0, 48.0);
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 cells = vec2(d * aspect, d);
  vec2 scaled = uv * cells;
  vec2 baseCell = floor(scaled);
  vec2 local = fract(scaled);
  float nearest = 100.0;
  float secondNearest = 100.0;
  vec2 nearestId = baseCell;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 id = baseCell + neighbor;
      vec3 hash = fract(vec3(id.xyx) * vec3(0.1031, 0.1030, 0.0973));
      hash += dot(hash, hash.yzx + 33.33);
      vec2 point = fract((hash.xx + hash.yz) * hash.zy);
      point = mix(vec2(0.5), point, clamp(irregularity, 0.0, 1.0));
      vec2 delta = neighbor + point - local;
      float distanceToPoint = dot(delta, delta);
      if (distanceToPoint < nearest) {
        secondNearest = nearest;
        nearest = distanceToPoint;
        nearestId = id;
      } else if (distanceToPoint < secondNearest) {
        secondNearest = distanceToPoint;
      }
    }
  }

  float edgeDistance = max(0.0, sqrt(secondNearest) - sqrt(nearest));
  float gapWidth = clamp(gap, 0.0, 0.2);
  float edgeMask = 1.0 - smoothstep(gapWidth, gapWidth + 0.045, edgeDistance);
  vec3 shadeHash = fract(vec3(nearestId.xyx) * vec3(0.1271, 0.1459, 0.1637));
  shadeHash += dot(shadeHash, shadeHash.yzx + 27.17);
  float facet = mix(0.78, 1.12, fract((shadeHash.x + shadeHash.y) * shadeHash.z));
  vec3 fractured = clamp(_c0.rgb * facet, 0.0, 1.0);
  vec3 color = mix(fractured, _c1.rgb, edgeMask * a);
  return vec4(color, _c0.a);
`;u();var yx=`
  float bal = clamp(balance, 0.0, 1.0);
  float lum = clamp(luminosity, -1.0, 1.0);
  if (abs(bal - 0.5) < 0.00001 && abs(lum) < 0.00001) return _c0;

  float shift = (bal - 0.5) * 2.0;
  float brightness = shift * ${.16.toFixed(2)};
  float contrast = 1.0 + abs(shift) * ${.45.toFixed(2)};

  vec3 w = vec3(0.2126, 0.7152, 0.0722);
  float luma = dot(_c0.rgb, w);
  float graded = clamp((luma - 0.5) * contrast + 0.5 + brightness + lum, 0.0, 1.0);
  return vec4(clamp(_c0.rgb + vec3(graded - luma), 0.0, 1.0), _c0.a);
`;u();var xx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float meltK = clamp(melt, 0.0, 1.0);
  float flowK = clamp(flowScale, 0.0, 1.0);
  float refreshK = clamp(refresh, 0.0, 1.0);
  float cb = clamp(chromaBleed, 0.0, 1.0);

  vec3 prev = texture2D(prevTex, uv).rgb;
  vec3 lumW = vec3(0.299, 0.587, 0.114);
  float l0 = dot(_c0.rgb, lumW);
  float l1 = dot(prev, lumW);
  float motion = abs(l0 - l1);

  float n1 = _noise(vec3(uv * mix(2.4, 8.5, flowK), time * 0.16));
  float n2 = _noise(vec3(uv * mix(2.4, 8.5, flowK) + vec2(5.2, 1.7), time * 0.16 + 1.3));
  vec2 dir = vec2(n1, n2);
  float aspect = resolution.x / max(1.0, resolution.y);
  dir.x /= aspect;

  float dist = (0.02 + flowK * 0.1) * (0.4 + meltK * 0.85) * a;
  vec3 smear = prev;
  smear += texture2D(prevTex, uv - dir * dist).rgb;
  smear += texture2D(prevTex, uv - dir * dist * 2.1).rgb;
  smear += texture2D(prevTex, uv - dir * dist * 3.6).rgb;
  smear *= 0.25;

  float trail = mix(0.32, 0.84, meltK) * a * (1.0 - refreshK * 0.92);
  float moveBoost = smoothstep(0.002, 0.05, motion) * meltK * a * 0.4;
  vec3 outCol = mix(_c0.rgb, smear, clamp(trail + moveBoost, 0.0, 0.92));

  float edge = (0.35 + smoothstep(0.003, 0.07, motion) * 0.65) * cb * a * (1.0 - refreshK);
  outCol.r += edge * 0.16;
  outCol.b += edge * 0.12;
  outCol.g -= edge * 0.05;

  outCol = mix(outCol, _c0.rgb, refreshK);
  return vec4(clamp(mix(_c0.rgb, outCol, a), 0.0, 1.0), _c0.a);
`;u();var vx=`
  vec2 pad = vec2(clamp(x, 0.0, 1.0), clamp(y, 0.0, 1.0)) - 0.5;
  float reach = clamp(length(pad) * 2.0, 0.0, 1.0);
`,Sx=`${vx}
  if (reach < 0.004) return _st;

  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 p = _st - 0.5;
  p.x *= aspect;
  float rad = length(p);
  vec2 dir = p / max(rad, 0.0001);
  float padAng = atan(pad.y, pad.x);

  vec2 push = vec2(0.0);
  for (int i = 0; i < 8; i++) {
    float opAng = float(i) * 0.78539816;
    float delta = abs(mod(padAng - opAng + 3.14159265, 6.28318531) - 3.14159265);
    float w = 1.0 - delta / 0.78539816;
    if (w <= 0.0) continue;

    vec2 t = p;
    if (i == 0) {
      t = p * 0.97;
    } else if (i == 1) {
      t = p + dir * sin(rad * 22.0 - time * 2.2) * 0.014;
    } else if (i == 2) {
      float s = 0.06 * (1.0 - min(rad, 1.0));
      t = vec2(p.x * cos(s) - p.y * sin(s), p.x * sin(s) + p.y * cos(s));
    } else if (i == 3) {
      t = mix(p, abs(p) - 0.18, 0.07);
    } else if (i == 4) {
      t = p * 1.03;
    } else if (i == 5) {
      t = mix(p, floor(p * 14.0) / 14.0, 0.09);
    } else if (i == 6) {
      float s = -0.06 * (1.0 - min(rad, 1.0));
      t = vec2(p.x * cos(s) - p.y * sin(s), p.x * sin(s) + p.y * cos(s));
    } else {
      t = p + vec2(0.011, 0.006);
    }
    push += (t - p) * w;
  }

  vec2 outP = p + push * reach;
  outP.x /= aspect;
  return outP + 0.5;
`,wx=`${vx}
  vec3 c = _c0.rgb;
  float hueK = clamp(hue, 0.0, 1.0);
  float shift = hueK * (0.1 + reach * 0.9) * 0.02;
  float luma = dot(c, vec3(0.299, 0.587, 0.114));

  if (shift > 0.00001) {
    float yp = luma;
    float iq1 = dot(c, vec3(0.596, -0.275, -0.321));
    float iq2 = dot(c, vec3(0.212, -0.523, 0.311));
    float chroma = sqrt(iq1 * iq1 + iq2 * iq2);
    float hAng = atan(iq2, iq1) + shift * 6.28318531;
    iq1 = chroma * cos(hAng);
    iq2 = chroma * sin(hAng);
    c = vec3(
      yp + 0.9563 * iq1 + 0.6210 * iq2,
      yp - 0.2721 * iq1 - 0.6474 * iq2,
      yp - 1.1070 * iq1 + 1.7046 * iq2
    );
  }

  // Rotation alone is a no-op on greyscale footage, so seed chroma from luma \u2014
  // the triad sums to ~0, keeping brightness (and pure black) intact.
  float phase = time * 0.15 + reach * 2.0;
  vec3 triad = vec3(sin(phase), sin(phase + 2.0944), sin(phase + 4.1888));
  c += triad * (hueK * 0.06 * luma);

  c *= 1.0 - clamp(decay, 0.0, 1.0) * 0.06;
  return vec4(clamp(c, 0.0, 1.0), _c0.a);
`;u();var Tx=`
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 p = _st;
  p -= vec2(clamp(centerX, 0.0, 1.0), clamp(centerY, 0.0, 1.0));
  p.x *= aspect;

  float turn = rotate * 6.28318531;
  float ca = cos(turn);
  float sa = sin(turn);
  p = vec2(p.x * ca - p.y * sa, p.x * sa + p.y * ca);

  float sz = max(0.02, size) * 0.5;
  float rnd = clamp(roundness, 0.0, 1.0) * sz * 0.4;
  float rs = max(0.01, sz - rnd);
  float pick = floor(clamp(shape, 0.0, 4.0) + 0.5);
  float d = length(p) - rs;

  if (pick > 3.5) {
    vec2 k1 = vec2(0.809016994, -0.587785252);
    vec2 k2 = vec2(-0.809016994, -0.587785252);
    vec2 q = vec2(abs(p.x), p.y);
    q -= 2.0 * max(dot(k1, q), 0.0) * k1;
    q -= 2.0 * max(dot(k2, q), 0.0) * k2;
    q.x = abs(q.x);
    q.y -= rs;
    vec2 ba = 0.45 * vec2(-k1.y, k1.x) - vec2(0.0, 1.0);
    float h = clamp(dot(q, ba) / dot(ba, ba), 0.0, rs);
    d = length(q - ba * h) * sign(q.y * ba.x - q.x * ba.y);
  } else if (pick > 2.5) {
    vec2 k = vec2(-0.866025404, 0.5);
    vec2 q = abs(p);
    q -= 2.0 * min(dot(k, q), 0.0) * k;
    q -= vec2(clamp(q.x, -0.577350269 * rs, 0.577350269 * rs), rs);
    d = length(q) * sign(q.y);
  } else if (pick > 1.5) {
    vec2 q = p;
    q.x = abs(q.x) - rs;
    q.y = q.y + rs / 1.7320508;
    if (q.x + 1.7320508 * q.y > 0.0) {
      q = vec2(q.x - 1.7320508 * q.y, -1.7320508 * q.x - q.y) * 0.5;
    }
    q.x -= clamp(q.x, -2.0 * rs, 0.0);
    d = -length(q) * sign(q.y);
  } else if (pick > 0.5) {
    vec2 q = abs(p) - rs;
    d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
  }

  d -= rnd;

  float sw = clamp(stroke, 0.0, 1.0);
  float useFill = step(0.5, shapeFill);
  if (sw > 0.001) {
    float strokeW = sw * sz * 0.3;
    float middle = abs(d) - strokeW;
    d = mix(middle, d, useFill);
  }

  float aa = 1.6 / max(1.0, resolution.y);
  float mask = 1.0 - smoothstep(-aa, aa, d);
  return vec4(vec3(cr, cg, cb) * mask, mask * clamp(opacity, 0.0, 1.0));
`;u();var Cx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float tns = clamp(tension, 0.0, 1.0);
  float pos = clamp(position, 0.0, 1.0);
  float horiz = 1.0 - step(0.5, orientation);
  vec2 uv = gl_FragCoord.xy / max(resolution.xy, vec2(1.0));
  float along = mix(uv.y, uv.x, horiz);
  float across = mix(uv.x, uv.y, horiz);

  float PI = 3.14159265;
  float env = sin(along * PI);
  float env2 = env * env;
  float sag = (1.0 - tns) * 0.28;
  float rest = pos + sag * env2;

  float omega = mix(3.4, 15.5, tns);
  float amp = mix(0.09, 0.014, tns);
  float harm = clamp(harmonics, 1.0, 5.0);
  float h2 = step(1.5, harm);
  float h3 = step(2.5, harm);

  float ph1 = along * PI + time * omega;
  float ph2 = along * PI * 2.0 - time * omega * 1.27;
  float ph3 = along * PI * 3.0 + time * omega * 0.71;
  float w1 = sin(ph1);
  float w2 = sin(ph2);
  float w3 = sin(ph3);
  float waves = w1 + w2 * 0.36 * h2 + w3 * 0.16 * h3;
  float y = rest + amp * env * waves;

  float dEnv = PI * cos(along * PI);
  float dSag = sag * 2.0 * env * dEnv;
  float dw1 = PI * cos(ph1);
  float dw2 = 2.0 * PI * cos(ph2);
  float dw3 = 3.0 * PI * cos(ph3);
  float dWaves = dw1 + dw2 * 0.36 * h2 + dw3 * 0.16 * h3;
  float dy = dSag + amp * (dEnv * waves + env * dWaves);
  float dist = abs(across - y) / sqrt(1.0 + dy * dy);

  float aspect = resolution.x / max(1.0, resolution.y);
  float thScale = mix(aspect, 1.0, horiz);
  float th = mix(0.0016, 0.016, clamp(thickness, 0.0, 1.0)) * thScale;
  float aa = 1.6 / max(resolution.y, 1.0);
  float core = 1.0 - smoothstep(th, th + aa, dist);
  float g = clamp(glow, 0.0, 1.0);
  float halo = exp(-dist * mix(26.0, 78.0, tns)) * g;
  float line = clamp(core + halo * 0.9, 0.0, 1.0) * a;

  vec3 col = vec3(cr, cg, cb);
  vec3 lit = col * (1.0 + g * 1.15);
  vec3 outc = mix(_c0.rgb, lit, line);
  return vec4(outc, _c0.a);
`;u();var Mx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec3 base = _c0.rgb;
  float n = floor(clamp(count, 2.0, 4.0) + 0.5);
  vec3 p0 = vec3(p0r, p0g, p0b);
  vec3 p1 = vec3(p1r, p1g, p1b);
  vec3 p2 = vec3(p2r, p2g, p2b);
  vec3 p3 = vec3(p3r, p3g, p3b);
  vec3 mapped;

  if (mode > 0.5) {
    float best = distance(base, p0);
    mapped = p0;
    float d1 = distance(base, p1);
    if (d1 < best) { best = d1; mapped = p1; }
    if (n > 2.5) {
      float d2 = distance(base, p2);
      if (d2 < best) { best = d2; mapped = p2; }
    }
    if (n > 3.5) {
      float d3 = distance(base, p3);
      if (d3 < best) { best = d3; mapped = p3; }
    }
  } else {
    float luma = dot(base, vec3(0.299, 0.587, 0.114));
    float t = min(luma * (n - 1.0), n - 1.001);
    float idx = floor(t);
    float f = t - idx;
    vec3 lo = idx < 0.5 ? p0 : (idx < 1.5 ? p1 : p2);
    vec3 hi = idx < 0.5 ? p1 : (idx < 1.5 ? p2 : p3);
    mapped = mix(lo, hi, f);
  }

  return vec4(mix(base, clamp(mapped, 0.0, 1.0), a), _c0.a);
`;u();var Lx=`
  vec3 w = vec3(0.299, 0.587, 0.114);
  float thr = mix(0.12, 0.88, clamp(threshold, 0.0, 1.0));
  float knee = mix(0.07, 0.018, clamp(thinness, 0.0, 1.0));
  float luma = dot(_c0.rgb, w);
  float hi = smoothstep(thr, thr + knee, luma);
  hi = pow(hi, mix(1.6, 0.75, clamp(thinness, 0.0, 1.0)));
  return vec4(_c0.rgb * hi, hi);
`;u();var rk=2.4,Rx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec2 res = max(resolution.xy, vec2(1.0));
  vec2 uv = gl_FragCoord.xy / res;
  float aspect = res.x / max(res.y, 1.0);
  float thr = mix(0.06, 0.92, clamp(threshold, 0.0, 1.0));
  float ring = rotation * 6.2831853;

  vec3 fan = vec3(0.0);

  for (int f = 0; f < ${7}; f++) {
    float fi = float(f);
    float turn = fi / ${7}.0;
    float seat = ring + turn * 6.2831853;
    vec2 axis = vec2(cos(seat) / aspect, sin(seat));
    float reach = 1.0 - ${.22.toFixed(3)} * 0.5 * (1.0 - cos(fi * ${1.7.toFixed(3)}));

    float hue = fract(${.02.toFixed(3)} + turn);
    vec3 tint = clamp(abs(mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    tint = tint * tint * (3.0 - 2.0 * tint);

    vec3 arm = vec3(0.0);
    float weightSum = 0.0;
    for (int t = 1; t <= ${6}; t++) {
      float march = float(t) / ${6}.0;
      vec2 tap = uv - axis * (throwLen * reach * march);
      vec3 c = texture2D(prismTex, clamp(tap, vec2(0.0), vec2(1.0))).rgb;
      float bright = max(c.r, max(c.g, c.b));
      float spark = smoothstep(thr, thr + 0.22, bright) * bright;
      // Weighting the far taps hardest lands a recognisable ghost of the source
      // at the end of each arm, rather than smearing it evenly along the way.
      float weight = 0.22 + 0.78 * smoothstep(0.3, 1.0, march);
      float bleed = smoothstep(0.0, ${.3.toFixed(3)}, march);
      arm += mix(vec3(1.0), tint, bleed) * (spark * weight);
      weightSum += weight;
    }
    fan += arm / max(weightSum, 0.0001);
  }
  fan /= ${7}.0;

  vec3 base = clamp(_c0.rgb, 0.0, 1.0);
  vec3 flare = clamp(fan * (a * ${rk.toFixed(2)}), 0.0, 1.0);
  vec3 lit = vec3(1.0) - (vec3(1.0) - base) * (vec3(1.0) - flare);

  float hz = clamp(haze, 0.0, 1.0);
  float luma = dot(base, vec3(0.2126, 0.7152, 0.0722));
  lit += fan * (hz * a * 1.8) * (1.0 - luma);

  return vec4(clamp(lit, 0.0, 1.0), _c0.a);
`;u();var Ax=`
  vec4 c = _c0;
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return c;

  vec3 w = vec3(0.2126, 0.7152, 0.0722);
  float luma = dot(c.rgb, w);
  float peak = max(c.r, max(c.g, c.b));
  float bright = mix(luma, peak, 0.55);

  float thr = mix(0.18, 0.78, clamp(threshold, 0.0, 1.0));
  float knee = mix(0.10, 0.28, clamp(bloom, 0.0, 1.0));
  float mask = smoothstep(max(thr - knee, 0.0), thr + knee, bright);
  mask *= mix(0.55, mask, 0.45);

  vec3 lifted = c.rgb + c.rgb * mask * a * mix(0.45, 1.05, clamp(bloom, 0.0, 1.0));
  c.rgb = lifted / (vec3(1.0) + max(lifted - vec3(1.0), vec3(0.0)) * 0.55);
  return c;
`,Ex=`
  vec3 w = vec3(0.2126, 0.7152, 0.0722);
  float luma = dot(_c0.rgb, w);
  float peak = max(_c0.r, max(_c0.g, _c0.b));
  float bright = mix(luma, peak, 0.55);

  float thr = mix(0.18, 0.78, clamp(threshold, 0.0, 1.0));
  float knee = mix(0.10, 0.28, clamp(bloom, 0.0, 1.0));
  float mask = smoothstep(max(thr - knee, 0.0), thr + knee, bright);
  mask *= mix(0.55, mask, 0.45);
  return vec4(_c0.rgb * mask, mask);
`,Px=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec3 bloom = _c1.rgb;
  vec3 room = vec3(1.0) - clamp(_c0.rgb, 0.0, 1.0) * 0.38;
  vec3 outRgb = _c0.rgb + bloom * a * room;
  outRgb = outRgb / (vec3(1.0) + max(outRgb - vec3(1.0), vec3(0.0)) * 0.5);
  return vec4(outRgb, _c0.a);
`;u();u();var Ys=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float luma = dot(_c1.rgb, vec3(0.299, 0.587, 0.114));
  float thr = clamp(threshold, 0.0, 1.0);
  float soft = max(0.01, softness);
  float m = smoothstep(thr - soft, thr + soft, luma);
  if (invert > 0.5) m = 1.0 - m;
  m = mix(1.0, m, a);
  return vec4(_c0.rgb * m, _c0.a);
`;var Fx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float luma = dot(_c1.rgb, vec3(0.299, 0.587, 0.114));
  float thr = clamp(threshold, 0.0, 1.0);
  float soft = max(0.01, softness);
  float m = smoothstep(thr - soft, thr + soft, luma);
  if (invert > 0.5) m = 1.0 - m;
  m = mix(1.0, m, a);
  return vec4(_c0.rgb, m * _c0.a);
`;u();var Ox=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec3 base = _c0.rgb;
  vec3 blend = _c1.rgb;
  vec3 overlay = mix(
    2.0 * base * blend,
    1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
    step(0.5, base)
  );
  return vec4(mix(base, overlay, a), _c0.a);
`;u();var Hx=`(index + ${ea}.5) / ${Gr}.0`,ak=`(index + ${Yl}.5) / ${Gr}.0`,ik=`(index + 0.5) / ${Gr}.0`,jc="vec2((enc.r * 65280.0 + enc.g * 255.0) / 65535.0, (enc.b * 65280.0 + enc.a * 255.0) / 65535.0)",sk=`
    be = p1 - p0;
    bf = p3 - p0;
    bg = p0 - p1 + p2 - p3;
    bh = outUv - p0;
    bk2 = bg.x * bf.y - bg.y * bf.x;
    bk1 = be.x * bf.y - be.y * bf.x + bh.x * bg.y - bh.y * bg.x;
    bk0 = bh.x * be.y - bh.y * be.x;
    bq = bk1 * bk1 - 4.0 * bk0 * bk2;
    tv = 0.0;
    sv = 0.0;
    if (abs(bk2) < 1e-6) {
      tv = -bk0 / (bk1 + 1e-8);
      bden = be.x + bg.x * tv;
      if (abs(bden) < 1e-6) {
        bden = be.y + bg.y * tv;
        sv = (bh.y - bf.y * tv) / (bden + 1e-8);
      } else {
        sv = (bh.x - bf.x * tv) / bden;
      }
    } else {
      broot = sqrt(max(bq, 0.0));
      tA = (-bk1 - broot) / (2.0 * bk2);
      tB = (-bk1 + broot) / (2.0 * bk2);
      if (tA >= -0.02 && tA <= 1.02) {
        tv = tA;
      } else {
        tv = tB;
      }
      bden = be.x + bg.x * tv;
      if (abs(bden) < 1e-6) {
        bden = be.y + bg.y * tv;
        sv = (bh.y - bf.y * tv) / (bden + 1e-8);
      } else {
        sv = (bh.x - bf.x * tv) / bden;
      }
    }
    local = vec2(sv, tv);`;function qc(e,t,n,o,r,i){return`
    p0 = tPts[${e}];
    p1 = tPts[${t}];
    p2 = tPts[${n}];
    p3 = tPts[${o}];
    ${sk}
    score = max(max(-local.x, local.x - 1.0), max(-local.y, local.y - 1.0));
    if (score < bestScore) {
      bestScore = score;
      bestLocal = local;
      bestOrigin = vec2(${r}, ${i});
    }`}var Ix=`
    l0u = 2.0 * (u - 0.5) * (u - 1.0);
    l1u = 4.0 * u * (1.0 - u);
    l2u = 2.0 * u * (u - 0.5);
    l0v = 2.0 * (v - 0.5) * (v - 1.0);
    l1v = 4.0 * v * (1.0 - v);
    l2v = 2.0 * v * (v - 0.5);
    d0u = 4.0 * u - 3.0;
    d1u = 4.0 - 8.0 * u;
    d2u = 4.0 * u - 1.0;
    d0v = 4.0 * v - 3.0;
    d1v = 4.0 - 8.0 * v;
    d2v = 4.0 * v - 1.0;
    mapped2 = tPts[0] * (l0u * l0v) + tPts[1] * (l1u * l0v) + tPts[2] * (l2u * l0v) +
              tPts[3] * (l0u * l1v) + tPts[4] * (l1u * l1v) + tPts[5] * (l2u * l1v) +
              tPts[6] * (l0u * l2v) + tPts[7] * (l1u * l2v) + tPts[8] * (l2u * l2v);
    du = tPts[0] * (d0u * l0v) + tPts[1] * (d1u * l0v) + tPts[2] * (d2u * l0v) +
         tPts[3] * (d0u * l1v) + tPts[4] * (d1u * l1v) + tPts[5] * (d2u * l1v) +
         tPts[6] * (d0u * l2v) + tPts[7] * (d1u * l2v) + tPts[8] * (d2u * l2v);
    dv = tPts[0] * (l0u * d0v) + tPts[1] * (l1u * d0v) + tPts[2] * (l2u * d0v) +
         tPts[3] * (l0u * d1v) + tPts[4] * (l1u * d1v) + tPts[5] * (l2u * d1v) +
         tPts[6] * (l0u * d2v) + tPts[7] * (l1u * d2v) + tPts[8] * (l2u * d2v);`;function Zo(e,t){return`
    ba = ${t} - ${e};
    pa = outUv - ${e};
    ht = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
    edgeDist = min(edgeDist, length(pa - ba * ht));`}var lk=Array.from({length:wr},(e,t)=>`
    index = ${t}.0;
    enc = texture2D(maskTex, vec2(${ik}, 0.5));
    tPts[${t}] = ${jc};`).join(""),Bx=[{type:"sampler2D",name:"frameTex",default:0},{type:"float",name:"amount",default:1},{type:"float",name:"tlX",default:0},{type:"float",name:"tlY",default:0},{type:"float",name:"trX",default:1},{type:"float",name:"trY",default:0},{type:"float",name:"brX",default:1},{type:"float",name:"brY",default:1},{type:"float",name:"blX",default:0},{type:"float",name:"blY",default:1},{type:"sampler2D",name:"maskTex",default:0},{type:"float",name:"maskCount",default:4},{type:"float",name:"maskLive",default:0},{type:"float",name:"gridLive",default:0}],Dx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec2 tl = vec2(clamp(tlX, 0.0, 1.0), clamp(tlY, 0.0, 1.0));
  vec2 tr = vec2(clamp(trX, 0.0, 1.0), clamp(trY, 0.0, 1.0));
  vec2 br = vec2(clamp(brX, 0.0, 1.0), clamp(brY, 0.0, 1.0));
  vec2 bl = vec2(clamp(blX, 0.0, 1.0), clamp(blY, 0.0, 1.0));
  vec2 outUv = gl_FragCoord.xy / resolution.xy;
  vec2 pi = vec2(0.0);
  vec2 nextMask = vec2(0.0);
  vec2 tPts[${wr}];
  vec2 p0 = tl;
  vec2 p1 = tr;
  vec2 p2 = br;
  vec2 p3 = bl;
  vec2 s0 = vec2(0.0, 0.0);
  vec2 s1 = vec2(1.0, 0.0);
  vec2 s2 = vec2(1.0, 1.0);
  vec2 s3 = vec2(0.0, 1.0);
  vec2 local = vec2(0.0);
  vec2 bestLocal = vec2(0.0);
  vec2 bestOrigin = vec2(0.0);
  vec2 srcUv = vec2(0.0);
  vec2 be = vec2(0.0);
  vec2 bf = vec2(0.0);
  vec2 bg = vec2(0.0);
  vec2 bh = vec2(0.0);
  vec2 ba = vec2(0.0);
  vec2 pa = vec2(0.0);
  vec2 mapped2 = vec2(0.0);
  vec2 du = vec2(0.0);
  vec2 dv = vec2(0.0);
  vec2 ferr = vec2(0.0);
  vec2 header = vec2(0.0);
  vec4 enc = vec4(0.0);
  vec4 sample = vec4(0.0);
  float index = 0.0;
  float nextIndex = 0.0;
  float bk0 = 0.0;
  float bk1 = 0.0;
  float bk2 = 0.0;
  float bq = 0.0;
  float broot = 0.0;
  float bden = 0.0;
  float tA = 0.0;
  float tB = 0.0;
  float tv = 0.0;
  float sv = 0.0;
  float ht = 0.0;
  float edgeDist = 1.0;
  float fade = 1.0;
  float score = 0.0;
  float bestScore = 10.0;
  float u = 0.5;
  float v = 0.5;
  float l0u = 0.0;
  float l1u = 0.0;
  float l2u = 0.0;
  float l0v = 0.0;
  float l1v = 0.0;
  float l2v = 0.0;
  float d0u = 0.0;
  float d1u = 0.0;
  float d2u = 0.0;
  float d0v = 0.0;
  float d1v = 0.0;
  float d2v = 0.0;
  float jdet = 0.0;
  bool covered = false;
  bool inPoly = false;

  if (maskLive > 0.5) {
    float n = clamp(floor(maskCount + 0.5), 3.0, ${ka}.0);
    for (int i = 0; i < ${ka}; i++) {
      if (float(i) + 0.5 < n) {
        index = float(i);
        enc = texture2D(maskTex, vec2(${Hx}, 0.5));
        pi = ${jc};
        enc = texture2D(maskTex, vec2(${ak}, 0.5));
        header = ${jc};
        nextIndex = clamp(floor(header.x * ${ka}.0 + 0.5), 0.0, ${ka-1}.0);
        index = nextIndex;
        enc = texture2D(maskTex, vec2(${Hx}, 0.5));
        nextMask = ${jc};
        if (((pi.y > outUv.y) != (nextMask.y > outUv.y)) &&
          (outUv.x < (nextMask.x - pi.x) * (outUv.y - pi.y) / (nextMask.y - pi.y + 1e-8) + pi.x)) {
          inPoly = !inPoly;
        }
        if (header.y > 0.5) {
          if (header.y > 0.8) {
            covered = covered && !inPoly;
          } else {
            covered = covered || inPoly;
          }
          inPoly = false;
        }
      }
    }
    if (!covered) {
      return vec4(0.0, 0.0, 0.0, 1.0);
    }
  }

  if (gridLive > 0.5) {
    ${lk}
    ${qc(0,1,4,3,"0.0","0.0")}
    ${qc(1,2,5,4,"0.5","0.0")}
    ${qc(3,4,7,6,"0.0","0.5")}
    ${qc(4,5,8,7,"0.5","0.5")}
    if (bestScore > 0.05) {
      return vec4(0.0, 0.0, 0.0, 1.0);
    }
    u = clamp(bestOrigin.x + 0.5 * bestLocal.x, -0.05, 1.05);
    v = clamp(bestOrigin.y + 0.5 * bestLocal.y, -0.05, 1.05);
    srcUv = vec2(u, v);
    for (int step = 0; step < 6; step++) {
      ${Ix}
      ferr = mapped2 - outUv;
      jdet = du.x * dv.y - du.y * dv.x;
      if (abs(jdet) > 1e-8) {
        u -= (ferr.x * dv.y - ferr.y * dv.x) / jdet;
        v -= (du.x * ferr.y - du.y * ferr.x) / jdet;
        u = clamp(u, -0.05, 1.05);
        v = clamp(v, -0.05, 1.05);
      }
    }
    ${Ix}
    if (length(mapped2 - outUv) < 0.004 && u >= 0.0 && u <= 1.0 && v >= 0.0 && v <= 1.0) {
      srcUv = vec2(u, v);
    }
    ${Zo("tPts[0]","tPts[1]")}
    ${Zo("tPts[1]","tPts[2]")}
    ${Zo("tPts[2]","tPts[5]")}
    ${Zo("tPts[5]","tPts[8]")}
    ${Zo("tPts[8]","tPts[7]")}
    ${Zo("tPts[7]","tPts[6]")}
    ${Zo("tPts[6]","tPts[3]")}
    ${Zo("tPts[3]","tPts[0]")}
  } else {
    float s1 = (tr.x - tl.x) * (outUv.y - tl.y) - (tr.y - tl.y) * (outUv.x - tl.x);
    float s2 = (br.x - tr.x) * (outUv.y - tr.y) - (br.y - tr.y) * (outUv.x - tr.x);
    float s3 = (bl.x - br.x) * (outUv.y - br.y) - (bl.y - br.y) * (outUv.x - br.x);
    float s4 = (tl.x - bl.x) * (outUv.y - bl.y) - (tl.y - bl.y) * (outUv.x - bl.x);
    bool inQuad = !(((s1 < 0.0) || (s2 < 0.0) || (s3 < 0.0) || (s4 < 0.0)) &&
                    ((s1 > 0.0) || (s2 > 0.0) || (s3 > 0.0) || (s4 > 0.0)));
    if (!inQuad) {
      return vec4(0.0, 0.0, 0.0, 1.0);
    }

    float dx1 = p1.x - p2.x;
    float dy1 = p1.y - p2.y;
    float dx2 = p3.x - p2.x;
    float dy2 = p3.y - p2.y;
    float dx3 = p0.x - p1.x + p2.x - p3.x;
    float dy3 = p0.y - p1.y + p2.y - p3.y;
    float denom = dx1 * dy2 - dx2 * dy1;
    float g1 = 0.0;
    float g2 = 0.0;
    if (abs(denom) > 1e-6) {
      g1 = (dx3 * dy2 - dx2 * dy3) / denom;
      g2 = (dx1 * dy3 - dx3 * dy1) / denom;
    }

    float h00 = p1.x - p0.x + g1 * p1.x;
    float h10 = p1.y - p0.y + g1 * p1.y;
    float h20 = g1;
    float h01 = p3.x - p0.x + g2 * p3.x;
    float h11 = p3.y - p0.y + g2 * p3.y;
    float h21 = g2;
    float h02 = p0.x;
    float h12 = p0.y;
    float h22 = 1.0;

    float i00 = h11 * h22 - h12 * h21;
    float i10 = h12 * h20 - h10 * h22;
    float i20 = h10 * h21 - h11 * h20;
    float i01 = h21 * h02 - h01 * h22;
    float i11 = h00 * h22 - h02 * h20;
    float i21 = h01 * h20 - h00 * h21;
    float i02 = h01 * h12 - h02 * h11;
    float i12 = h02 * h10 - h00 * h12;
    float i22 = h00 * h11 - h01 * h10;
    float det = h00 * i00 + h01 * i10 + h02 * i20;
    if (abs(det) < 1e-8) {
      srcUv = outUv;
    } else {
      float invDet = 1.0 / det;
      vec3 mapped = vec3(outUv, 1.0);
      float rx = (i00 * invDet) * mapped.x + (i01 * invDet) * mapped.y + (i02 * invDet) * mapped.z;
      float ry = (i10 * invDet) * mapped.x + (i11 * invDet) * mapped.y + (i12 * invDet) * mapped.z;
      float rz = (i20 * invDet) * mapped.x + (i21 * invDet) * mapped.y + (i22 * invDet) * mapped.z;
      srcUv = vec2(rx, ry) / max(rz, 1e-6);
    }
    ${Zo("tl","tr")}
    ${Zo("tr","br")}
    ${Zo("br","bl")}
    ${Zo("bl","tl")}
  }

  fade = smoothstep(0.0, 0.016, edgeDist);
  sample = texture2D(frameTex, clamp(srcUv, 0.001, 0.999));
  return mix(vec4(0.0, 0.0, 0.0, 1.0), sample, fade);
`;u();var Nx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float spd = clamp(speed, 0.15, 3.0);
  float t = time * spd;
  float bnc = clamp(bounce, 0.0, 1.0);
  float rAmt = clamp(roll, 0.0, 1.0);
  float zAmt = clamp(zoom, 0.0, 1.0);

  float swayX =
    sin(t * 0.71 + 0.2) * 0.58 +
    sin(t * 1.13 + 1.9) * 0.26 +
    sin(t * 0.43 + 3.1) * 0.16;
  float swayY =
    sin(t * 0.83 + 0.7) * 0.36 +
    sin(t * 1.27 + 2.4) * 0.20;

  float step = abs(sin(t * 2.07)) * 0.70 + abs(sin(t * 4.14 + 0.4)) * 0.18;
  float bounceY = (step - 0.34) * bnc;

  float jitX = sin(t * 6.8 + 0.3) * 0.07 + sin(t * 11.3 + 1.6) * 0.03;
  float jitY = cos(t * 7.9 + 0.9) * 0.06 + sin(t * 13.1 + 0.2) * 0.025;

  vec2 trans = vec2(swayX + jitX, swayY + bounceY + jitY) * a * 0.048;

  float ang =
    (sin(t * 0.61 + 0.4) * 0.55 + sin(t * 1.41 + 1.8) * 0.32 + sin(t * 0.29) * 0.16)
    * a * rAmt * 0.08;

  float breath = sin(t * 1.03) * 0.5 + 0.5;
  float cover = 1.0 + a * 0.07 + a * zAmt * (0.07 + breath * 0.045);

  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 uv = _st - 0.5;
  uv.x *= aspect;
  float cs = cos(ang);
  float sn = sin(ang);
  uv = vec2(uv.x * cs - uv.y * sn, uv.x * sn + uv.y * cs);
  uv.x /= aspect;
  uv = uv / cover + 0.5 - trans;
  return clamp(uv, 0.0, 1.0);
`;u();var Wx=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec2 uv = gl_FragCoord.xy / max(resolution.xy, vec2(1.0));
  vec4 sliced = texture2D(sliceTex, clamp(uv, 0.001, 0.999));
  return mix(_c0, sliced, a);
`;u();var Gx=`
  if (amount < 0.00001) return _c0;
  float lt = dot(_c0.rgb, vec3(0.299, 0.587, 0.114));
  if (animate > 0.5) {
    lt = fract(lt + fract(time * max(0.0, speed) * ${.25.toFixed(2)}));
  }
  float n = clamp(stopCount, 2.0, 6.0);
  vec3 mapped = vec3(r0, g0, b0);
  if (lt > p0) {
    mapped = mix(vec3(r0, g0, b0), vec3(r1, g1, b1), clamp((lt - p0) / max(1e-5, p1 - p0), 0.0, 1.0));
  }
  if (n > 2.5 && lt > p1) {
    mapped = mix(vec3(r1, g1, b1), vec3(r2, g2, b2), clamp((lt - p1) / max(1e-5, p2 - p1), 0.0, 1.0));
  }
  if (n > 3.5 && lt > p2) {
    mapped = mix(vec3(r2, g2, b2), vec3(r3, g3, b3), clamp((lt - p2) / max(1e-5, p3 - p2), 0.0, 1.0));
  }
  if (n > 4.5 && lt > p3) {
    mapped = mix(vec3(r3, g3, b3), vec3(r4, g4, b4), clamp((lt - p3) / max(1e-5, p4 - p3), 0.0, 1.0));
  }
  if (n > 5.5 && lt > p4) {
    mapped = mix(vec3(r4, g4, b4), vec3(r5, g5, b5), clamp((lt - p4) / max(1e-5, p5 - p4), 0.0, 1.0));
  }
  return vec4(mix(_c0.rgb, mapped, clamp(amount, 0.0, 1.0)), _c0.a);
`;u();var Ux=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float id = floor(clamp(stock, 0.0, 11.0) + 0.5);
  float d = clamp(density, 0.35, 1.75);

  float lift = 0.0;
  float gamma = 1.0;
  float gain = 1.0;
  float contrast = 1.0;
  float sat = 1.0;
  float vig = 0.0;
  float hue = 0.0;
  vec3 sh = vec3(1.0);
  vec3 hi = vec3(1.0);

  if (id < 0.5) {
    lift = 0.05; gamma = 0.86; gain = 1.14; contrast = 1.38; sat = 0.78;
    sh = vec3(0.62, 0.84, 1.08); hi = vec3(1.28, 1.04, 0.62); vig = 0.32; hue = 10.0;
  } else if (id < 1.5) {
    lift = -0.03; gamma = 0.78; gain = 0.82; contrast = 1.52; sat = 0.62;
    sh = vec3(0.32, 0.55, 1.22); hi = vec3(0.78, 0.92, 1.28); vig = 0.48; hue = -22.0;
  } else if (id < 2.5) {
    lift = 0.015; gamma = 0.72; gain = 1.22; contrast = 1.72; sat = 0.18;
    sh = vec3(0.88, 0.90, 1.04); hi = vec3(1.18, 1.14, 1.02); vig = 0.24; hue = 5.0;
  } else if (id < 3.5) {
    lift = 0.02; gamma = 0.88; gain = 1.10; contrast = 1.42; sat = 1.22;
    sh = vec3(0.12, 0.88, 1.18); hi = vec3(1.42, 0.72, 0.22); vig = 0.20; hue = -8.0;
  } else if (id < 4.5) {
    lift = -0.02; gamma = 0.70; gain = 1.18; contrast = 1.82; sat = 0.03;
    sh = vec3(0.92, 0.88, 0.82); hi = vec3(1.12, 1.06, 0.94); vig = 0.42; hue = 8.0;
  } else if (id < 5.5) {
    lift = 0.10; gamma = 1.08; gain = 1.12; contrast = 1.20; sat = 1.16;
    sh = vec3(0.72, 0.62, 1.12); hi = vec3(1.36, 0.86, 0.42); vig = 0.16; hue = 16.0;
  } else if (id < 6.5) {
    lift = 0.0; gamma = 0.80; gain = 1.18; contrast = 1.48; sat = 1.55;
    sh = vec3(0.38, 0.06, 1.12); hi = vec3(1.36, 0.18, 0.98); vig = 0.28; hue = -10.0;
  } else if (id < 7.5) {
    lift = 0.16; gamma = 1.16; gain = 0.92; contrast = 0.72; sat = 0.48;
    sh = vec3(0.92, 1.04, 0.64); hi = vec3(1.22, 1.10, 0.52); vig = 0.14; hue = 22.0;
  } else if (id < 8.5) {
    lift = 0.12; gamma = 1.10; gain = 1.16; contrast = 1.26; sat = 0.55;
    sh = vec3(0.62, 0.86, 1.22); hi = vec3(0.82, 1.04, 1.28); vig = 0.08; hue = -26.0;
  } else if (id < 9.5) {
    lift = 0.04; gamma = 0.82; gain = 1.12; contrast = 1.55; sat = 1.32;
    sh = vec3(0.18, 1.08, 0.36); hi = vec3(1.38, 0.32, 0.96); vig = 0.18; hue = 32.0;
  } else if (id < 10.5) {
    lift = -0.04; gamma = 0.80; gain = 0.68; contrast = 1.42; sat = 0.50;
    sh = vec3(0.28, 0.58, 1.10); hi = vec3(0.58, 0.88, 0.78); vig = 0.34; hue = -28.0;
  } else {
    lift = -0.03; gamma = 0.80; gain = 0.88; contrast = 1.40; sat = 0.74;
    sh = vec3(0.28, 0.34, 0.12); hi = vec3(1.42, 0.68, 0.10); vig = 0.36; hue = 26.0;
  }

  lift *= d;
  gamma = mix(1.0, gamma, d);
  gain = mix(1.0, gain, d);
  contrast = mix(1.0, contrast, d);
  sat = mix(1.0, sat, d);
  sh = mix(vec3(1.0), sh, d);
  hi = mix(vec3(1.0), hi, d);
  vig *= d;
  hue *= d;

  vec3 c = _c0.rgb;
  float lumaW = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = max(c + lift, 0.0);
  c = pow(c, vec3(1.0 / max(gamma, 0.08)));
  c *= gain;
  c = (c - 0.5) * contrast + 0.5;
  float grey = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(vec3(grey), c, sat);

  float split = smoothstep(0.12, 0.78, lumaW);
  c *= mix(sh, hi, split);

  if (abs(hue) > 0.01) {
    float rad = hue * 0.01745329251;
    float ch = cos(rad);
    float shn = sin(rad);
    vec3 hr = vec3(
      0.299 + 0.701 * ch + 0.168 * shn,
      0.587 - 0.587 * ch + 0.330 * shn,
      0.114 - 0.114 * ch - 0.497 * shn
    );
    vec3 hg = vec3(
      0.299 - 0.299 * ch - 0.328 * shn,
      0.587 + 0.413 * ch + 0.035 * shn,
      0.114 - 0.114 * ch + 0.292 * shn
    );
    vec3 hb = vec3(
      0.299 - 0.300 * ch + 1.250 * shn,
      0.587 - 0.588 * ch - 1.050 * shn,
      0.114 + 0.886 * ch - 0.203 * shn
    );
    c = vec3(dot(c, hr), dot(c, hg), dot(c, hb));
  }

  if (vig > 0.001) {
    vec2 uv = (gl_FragCoord.xy / max(resolution.xy, vec2(1.0))) - 0.5;
    uv.x *= resolution.x / max(1.0, resolution.y);
    float edge = smoothstep(0.42, 1.05, length(uv) / 0.70710678);
    c *= 1.0 - vig * edge * edge;
  }

  return vec4(mix(_c0.rgb, clamp(c, 0.0, 1.0), a), _c0.a);
`;function zx(e){let t=e.setFunction;if(!t)return;t({name:"customKaleid",type:"coord",inputs:[{type:"float",name:"nSides",default:4},{type:"float",name:"angle",default:0}],glsl:`
          if (nSides < 0.1) return _st;
          float aspect = resolution.x / max(1.0, resolution.y);
          vec2 st = _st - 0.5;
          st.x *= aspect;

          float r = length(st);
          float a = atan(st.y, st.x);
          float pi = 2. * 3.1416;

          a = mod(a, pi / nSides);
          a = abs(a - pi / nSides / 2.);
          a += angle;

          vec2 outSt = r * vec2(cos(a), sin(a));
          outSt.x /= aspect;
          return outSt + 0.5;
        `}),t({name:"customMirror",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"axis",default:0},{type:"float",name:"angle",default:0},{type:"float",name:"flip",default:0},{type:"float",name:"centerX",default:.5},{type:"float",name:"centerY",default:.5}],glsl:`
          float amt = clamp(amount, 0.0, 1.0);
          if (amt < 0.00001) return _st;
          vec2 st = _st;
          vec2 m = st;
          if (axis < 0.5) m.x = 1.0 - st.x;
          else if (axis < 1.5) m.y = 1.0 - st.y;
          else if (axis < 2.5) { m.x = 1.0 - st.x; m.y = 1.0 - st.y; }
          else {
            float aspect = resolution.x / max(1.0, resolution.y);
            vec2 c = vec2(clamp(centerX, 0.0, 1.0), clamp(centerY, 0.0, 1.0));
            vec2 p = st - c;
            p.x *= aspect;
            float th = clamp(angle, 0.0, 1.0) * 3.14159265;
            vec2 n = vec2(-sin(th), cos(th));
            float sd = dot(p, n);
            float keep = flip > 0.5 ? -1.0 : 1.0;
            if (sd * keep > 0.0) p -= 2.0 * sd * n;
            p.x /= aspect;
            m = p + c;
          }
          return mix(st, m, amt);
        `}),t({name:"customTile",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"cols",default:3},{type:"float",name:"rows",default:3}],glsl:`
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;
          vec2 st = _st;
          vec2 reps = vec2(max(1.0, cols), max(1.0, rows));
          vec2 grid = st * reps;
          vec2 cell = fract(grid);
          vec2 id = floor(grid);
          if (mod(id.x, 2.0) >= 1.0) cell.x = 1.0 - cell.x;
          if (mod(id.y, 2.0) >= 1.0) cell.y = 1.0 - cell.y;
          return mix(st, cell, a);
        `}),t({name:"customWrap",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"centerX",default:.5},{type:"float",name:"centerY",default:.5},{type:"float",name:"radius",default:.75},{type:"float",name:"falloff",default:.5},{type:"float",name:"twist",default:0}],glsl:`
          float amt = clamp(amount, -1.0, 1.0);
          float tw = clamp(twist, -1.0, 1.0);
          if (abs(amt) < 0.00001 && abs(tw) < 0.00001) return _st;
          vec2 c = vec2(clamp(centerX, 0.0, 1.0), clamp(centerY, 0.0, 1.0));
          vec2 d = _st - c;
          float r = length(d);
          float rad = max(0.08, clamp(radius, 0.15, 1.0));
          float t = clamp(r / rad, 0.0, 1.0);
          float soft = clamp(falloff, 0.0, 1.0);
          float edge = smoothstep(0.0, 1.0, t);
          float influence = mix(1.0 - edge, pow(1.0 - t, mix(1.2, 3.5, soft)), soft);
          float scale = 1.0 + amt * 0.78 * influence;
          float aspect = resolution.x / max(1.0, resolution.y);
          float spin = tw * 3.14159265 * influence;
          vec2 da = vec2(d.x * aspect, d.y);
          vec2 spun = vec2(
            da.x * cos(spin) - da.y * sin(spin),
            da.x * sin(spin) + da.y * cos(spin)
          );
          vec2 warped = c + vec2(spun.x / aspect, spun.y) * scale;
          return vec2(
            1.0 - abs(mod(warped.x, 2.0) - 1.0),
            1.0 - abs(mod(warped.y, 2.0) - 1.0)
          );
        `}),t({name:"dither",type:"color",inputs:[{type:"sampler2D",name:"blueTex",default:0},{type:"float",name:"amount",default:0},{type:"float",name:"binary",default:0},{type:"float",name:"balance",default:.5},{type:"float",name:"scale",default:3}],glsl:`
          vec4 src = _c0;
          float amt = clamp(amount, 0.0, 1.0);
          if (amt < 0.00001) return src;
          float bal = clamp(balance, 0.0, 1.0);
          float sc = clamp(scale, 0.25, 64.0);
          vec3 lumW = vec3(0.299, 0.587, 0.114);

          vec2 fc = gl_FragCoord.xy;
          vec2 gv = floor(fc / sc);
          float t = time * 2.1;
          vec2 blueUv = (gv + vec2(t * 0.31, t * 0.19)) / 64.0;
          float n = texture2D(blueTex, blueUv).x;
          float jitter = (n - 0.5) * amt;

          vec3 outRgb;
          if (binary > 0.5 && binary < 1.5) {
            float L = dot(src.rgb, lumW);
            float contrast = 1.0 + amt * 3.5;
            float La = clamp((L - bal) * contrast + bal, 0.0, 1.0);
            float thr = clamp(bal + jitter * 0.9, 0.002, 0.998);
            float bw = step(thr, La);
            outRgb = vec3(bw);
          } else {
            float posterize = 0.0;
            if (binary > 3.5) posterize = 6.0;
            else if (binary > 2.5) posterize = 4.0;
            else if (binary > 1.5) posterize = 3.0;
            float levels = posterize > 0.5 ? posterize : max(4.0, mix(16.0, 5.0, amt));
            outRgb.r = floor(src.r * levels + jitter) / (levels - 1.0);
            outRgb.g = floor(src.g * levels + jitter) / (levels - 1.0);
            outRgb.b = floor(src.b * levels + jitter) / (levels - 1.0);
            outRgb = clamp(outRgb, 0.0, 1.0);
          }

          return vec4(mix(src.rgb, outRgb, clamp(amt * 1.1, 0.0, 1.0)), src.a);
        `}),t({name:"glow",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"threshold",default:.48},{type:"float",name:"bloom",default:.55}],glsl:Ax}),t({name:"glowHighlight",type:"color",inputs:[{type:"float",name:"threshold",default:.48},{type:"float",name:"bloom",default:.55}],glsl:Ex}),t({name:"glowBloomAdd",type:"combine",inputs:[{type:"float",name:"amount",default:0}],glsl:Px}),t({name:"sharpenUnsharp",type:"combine",inputs:[{type:"float",name:"amount",default:0}],glsl:`
          float s = clamp(amount, 0.0, 2.0);
          if (s < 0.00001) return _c0;
          vec3 w = vec3(0.299, 0.587, 0.114);
          float l0 = dot(_c0.rgb, w);
          float l1 = dot(_c1.rgb, w);
          float lSharp = clamp(l0 + s * (l0 - l1), 0.0, 1.0);
          vec3 chroma = _c0.rgb - vec3(l0);
          return vec4(clamp(vec3(lSharp) + chroma, 0.0, 1.0), _c0.a);
        `}),t({name:"flashBurst",type:"color",inputs:[{type:"float",name:"amount",default:0}],glsl:`
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _c0;
          vec4 c = _c0;
          c.rgb = mix(c.rgb, vec3(1.0), a);
          return c;
        `}),t({name:"triggerDebugOverlay",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"kick",default:0},{type:"float",name:"low",default:0},{type:"float",name:"mid",default:0},{type:"float",name:"high",default:0},{type:"float",name:"beat",default:0},{type:"float",name:"rowY",default:.08},{type:"float",name:"minSize",default:.022},{type:"float",name:"maxSize",default:.09}],glsl:`
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _c0;

          float aspect = resolution.x / max(1.0, resolution.y);
          vec2 p = (gl_FragCoord.xy / resolution.xy);
          p.x *= aspect;

          float y0 = clamp(rowY, 0.03, 0.22);
          float minR = clamp(minSize, 0.008, 0.08) * aspect;
          float maxR = clamp(maxSize, minR + 0.004, 0.18) * aspect;
          float gap = 0.13 * aspect;
          float x0 = 0.5 * aspect - gap * 2.0;

          float i0 = clamp(kick, 0.0, 1.0);
          float i1 = clamp(low, 0.0, 1.0);
          float i2 = clamp(mid, 0.0, 1.0);
          float i3 = clamp(high, 0.0, 1.0);
          float i4 = clamp(beat, 0.0, 1.0);

          vec3 overlay = vec3(0.0);
          float mask = 0.0;

          vec2 c0 = vec2(x0 + gap * 0.0, y0);
          float r0 = mix(minR, maxR, i0);
          float m0 = 1.0 - smoothstep(r0 - 0.0015, r0 + 0.0015, length(p - c0));
          overlay = mix(overlay, ${xi("kick")}, m0);
          mask = max(mask, m0);

          vec2 c1 = vec2(x0 + gap * 1.0, y0);
          float r1 = mix(minR, maxR, i1);
          float m1 = 1.0 - smoothstep(r1 - 0.0015, r1 + 0.0015, length(p - c1));
          overlay = mix(overlay, ${xi("low")}, m1);
          mask = max(mask, m1);

          vec2 c2 = vec2(x0 + gap * 2.0, y0);
          float r2 = mix(minR, maxR, i2);
          float m2 = 1.0 - smoothstep(r2 - 0.0015, r2 + 0.0015, length(p - c2));
          overlay = mix(overlay, ${xi("mid")}, m2);
          mask = max(mask, m2);

          vec2 c3 = vec2(x0 + gap * 3.0, y0);
          float r3 = mix(minR, maxR, i3);
          float m3 = 1.0 - smoothstep(r3 - 0.0015, r3 + 0.0015, length(p - c3));
          overlay = mix(overlay, ${xi("high")}, m3);
          mask = max(mask, m3);

          vec2 c4 = vec2(x0 + gap * 4.0, y0);
          float r4 = mix(minR, maxR, i4);
          float m4 = 1.0 - smoothstep(r4 - 0.0015, r4 + 0.0015, length(p - c4));
          overlay = mix(overlay, ${xi("beat")}, m4);
          mask = max(mask, m4);

          vec3 rgb = mix(_c0.rgb, overlay, mask * a * 0.92);
          return vec4(rgb, _c0.a);
        `}),t({name:"exportVideoFit",type:"coord",inputs:[{type:"float",name:"contentHalfW",default:.5},{type:"float",name:"contentHalfH",default:.5},{type:"float",name:"contentOffsetY",default:0}],glsl:`
          float halfW = max(1e-4, contentHalfW);
          float halfH = max(1e-4, contentHalfH);
          vec2 d = _st - vec2(0.5, 0.5 + contentOffsetY);
          return vec2(d.x / halfW, d.y / halfH) * 0.5 + 0.5;
        `}),t({name:"exportMatte",type:"color",inputs:[{type:"float",name:"amount",default:1},{type:"float",name:"targetWidth",default:1920},{type:"float",name:"targetHeight",default:1080},{type:"float",name:"usePixelBox",default:1},{type:"float",name:"targetAspect",default:1.7777778},{type:"float",name:"inset",default:.025},{type:"float",name:"feather",default:.015},{type:"float",name:"contentHalfW",default:.5},{type:"float",name:"contentHalfH",default:.5},{type:"float",name:"contentOffsetY",default:0}],glsl:`
          vec4 c = _c0;
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return c;

          vec2 res = resolution.xy;
          float safeW;
          float safeH;

          if (usePixelBox > 0.5) {
            safeW = clamp(targetWidth, 1.0, res.x) / res.x;
            safeH = clamp(targetHeight, 1.0, res.y) / res.y;
          } else {
            float frameAspect = res.x / max(1.0, res.y);
            float targetAspectClamped = max(0.01, targetAspect);
            if (frameAspect > targetAspectClamped) {
              safeH = 1.0;
              safeW = targetAspectClamped / frameAspect;
            } else {
              safeW = 1.0;
              safeH = frameAspect / targetAspectClamped;
            }
          }

          float insetVal = clamp(inset, 0.0, 0.25);
          safeW = max(0.01, safeW - insetVal * 2.0);
          safeH = max(0.01, safeH - insetVal * 2.0);

          vec2 uv = gl_FragCoord.xy / res;
          vec2 d = abs(uv - vec2(0.5));
          vec2 cropHalf = vec2(safeW, safeH) * 0.5;
          vec2 contentHalf = vec2(max(1e-4, contentHalfW), max(1e-4, contentHalfH));
          vec2 contentCenter = vec2(0.5, 0.5 + contentOffsetY);
          vec2 dc = abs(uv - contentCenter);

          float featherVal = max(1e-4, clamp(feather, 0.0, 0.2));
          float inCropX = 1.0 - smoothstep(cropHalf.x, cropHalf.x + featherVal, d.x);
          float inCropY = 1.0 - smoothstep(cropHalf.y, cropHalf.y + featherVal, d.y);
          float inCrop = inCropX * inCropY;

          float inContentX = 1.0 - smoothstep(contentHalf.x, contentHalf.x + featherVal * 0.35, dc.x);
          float inContentY = 1.0 - smoothstep(contentHalf.y, contentHalf.y + featherVal * 0.35, dc.y);
          float inContent = inContentX * inContentY;

          float inside = inCrop * inContent;

          vec3 matted = mix(vec3(0.0), c.rgb, inside);
          c.rgb = mix(_c0.rgb, matted, a);
          return c;
        `}),t({name:"outputCornerPinWarp",type:"color",inputs:Bx,glsl:Dx}),t({name:"vignetteGrade",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"radius",default:.78},{type:"float",name:"softness",default:.42},{type:"float",name:"blur",default:0}],glsl:yy}),t({name:"pulseGrade",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"bloom",default:.45}],glsl:`
          vec4 c = _c0;
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return c;
          float b = clamp(bloom, 0.0, 1.0);

          // Lift highlights toward white only \u2014 bounded, no hue shift, no color artifacts.
          float luma = dot(c.rgb, vec3(0.299, 0.587, 0.114));
          float lift = b * a * smoothstep(0.55, 1.0, luma) * 0.7;
          c.rgb = mix(c.rgb, vec3(1.0), lift);

          // Gentle edge settle (pure black shadow) so the frame breathes with the beat.
          vec2 uv = (gl_FragCoord.xy / resolution.xy) - 0.5;
          uv.x *= resolution.x / max(1.0, resolution.y);
          float d = length(uv) / 0.70710678;
          float edge = smoothstep(0.65, 1.05, d);
          c.rgb *= 1.0 - a * edge * 0.22;
          return c;
        `}),t({name:"oscilloscopeOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"glow",default:.55}],glsl:R1}),t({name:"neonGridOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"glow",default:.5}],glsl:A1}),t({name:"textLayerOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"glow",default:.35}],glsl:P1}),t({name:"oscilloscopeDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"frequency",default:8},{type:"float",name:"phase",default:0},{type:"float",name:"mode",default:0},{type:"float",name:"centerFocus",default:1}],glsl:`
          if (amount < 0.00001) return _st;
          vec2 uv = _st - vec2(0.5);
          float dist = length(uv) * 2.0;
          float envelope = pow(clamp(1.0 - dist, 0.0, 1.0), max(0.15, centerFocus));
          float wave;
          vec2 delta;
          if (mode < 0.5) {
            wave = sin(uv.x * frequency * 6.2831853 + phase);
            delta = vec2(0.0, wave * amount * envelope);
          } else if (mode < 1.5) {
            wave = sin(uv.y * frequency * 6.2831853 + phase);
            delta = vec2(wave * amount * envelope, 0.0);
          } else {
            wave = sin(dist * frequency * 6.2831853 + phase);
            vec2 dir = dist > 0.0005 ? normalize(uv) * 0.5 : vec2(0.0);
            delta = dir * wave * amount * envelope;
          }
          return _st + delta;
        `}),t({name:"cymaticDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"frequency",default:12}],glsl:`
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;
          const float PI = 3.14159265;
          vec2 p = (_st - vec2(0.5)) * 2.0;
          float ki = floor(max(1.0, frequency));
          float n = floor(ki / 6.0) + 1.0;
          float m = mod(ki, 6.0) + 1.0;
          if (m >= n) m = max(1.0, n - 1.0);
          if (m < 1.0) m = 1.0;
          if (abs(n - m) < 0.5) m = min(n + 1.0, 12.0);
          float nx = n * PI * p.x;
          float ny = n * PI * p.y;
          float mx = m * PI * p.x;
          float my = m * PI * p.y;
          float field = cos(nx) * cos(my) - cos(mx) * cos(ny);
          vec2 grad = vec2(
            -n * PI * sin(nx) * cos(my) + m * PI * sin(mx) * cos(ny),
            -m * PI * cos(nx) * sin(my) + n * PI * cos(mx) * sin(ny)
          );
          float gLen = length(grad);
          vec2 dir = gLen > 0.0001 ? grad / gLen : vec2(0.0);
          return _st + dir * field * a * 0.14;
        `}),t({name:"vibrationDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"frequency",default:12}],glsl:`
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;
          float hz = max(2.0, frequency);
          float t = time * hz * 6.2831853;
          float sx = sin(t) * 0.52 + sin(t * 2.17 + 0.6) * 0.26 + sin(t * 4.9 + 1.3) * 0.14;
          float sy = cos(t * 1.07 + 1.1) * 0.52 + cos(t * 1.83 + 0.35) * 0.26 + sin(t * 5.3 + 0.8) * 0.14;
          float spin = time * 0.38;
          float cs = cos(spin);
          float sn = sin(spin);
          vec2 delta = vec2(sx * cs - sy * sn, sx * sn + sy * cs);
          return _st + delta * a * 0.052;
        `}),t({name:"shakeDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"speed",default:1},{type:"float",name:"bounce",default:.55},{type:"float",name:"roll",default:.4},{type:"float",name:"zoom",default:.45}],glsl:Nx}),t({name:"degaussDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"frequency",default:12},{type:"float",name:"speed",default:1.4}],glsl:J1}),t({name:"vhsDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"tracking",default:.48},{type:"float",name:"speed",default:1}],glsl:ex}),t({name:"vhsColor",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"noise",default:.38},{type:"float",name:"lines",default:.52},{type:"float",name:"dropout",default:.28}],glsl:tx}),t({name:"lensDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"curvature",default:1}],glsl:`
          if (amount < 0.00001) return _st;
          vec2 uv = _st - vec2(0.5);
          float curve = max(0.15, curvature);
          float k = -amount * 0.55 * curve;
          uv *= 1.0 + k * dot(uv, uv);
          return uv + vec2(0.5);
        `}),t({name:"wetLensDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"density",default:18},{type:"float",name:"speed",default:.26},{type:"float",name:"refraction",default:.76},{type:"float",name:"gravity",default:.74}],glsl:Y1}),t({name:"wetLensOverlay",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"density",default:18},{type:"float",name:"speed",default:.26},{type:"float",name:"highlights",default:.42},{type:"float",name:"gravity",default:.74}],glsl:K1}),t({name:"pixelSortSmear",type:"color",inputs:[{type:"sampler2D",name:"videoTex",default:0},{type:"float",name:"amount",default:0},{type:"float",name:"threshold",default:.45},{type:"float",name:"reach",default:.4},{type:"float",name:"chaos",default:.7},{type:"float",name:"sortDir",default:0}],glsl:Z1}),t({name:"emberHeatDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"speed",default:.8},{type:"float",name:"density",default:22},{type:"float",name:"waves",default:.76}],glsl:fx}),t({name:"emberHeatOverlay",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"density",default:22},{type:"float",name:"speed",default:.8},{type:"float",name:"glow",default:.82},{type:"float",name:"waves",default:.76},{type:"float",name:"intensity",default:.78}],glsl:hx}),t({name:"emberHeatFlow",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"waves",default:.76}],glsl:_x}),t({name:"blurNoise",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"scale",default:12},{type:"float",name:"speed",default:.2}],glsl:ox}),t({name:"blurMirrorUv",type:"coord",inputs:[],glsl:nx}),t({name:"blurGaussian",type:"color",inputs:[{type:"sampler2D",name:"blurTex",default:0},{type:"float",name:"amount",default:0}],glsl:ix}),t({name:"normalMapDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"scale",default:12},{type:"float",name:"speed",default:.2},{type:"float",name:"refraction",default:.55},{type:"float",name:"detail",default:1}],glsl:cy}),t({name:"normalMapLight",type:"color",inputs:[{type:"sampler2D",name:"videoTex",default:0},{type:"float",name:"amount",default:0},{type:"float",name:"mapSource",default:0},{type:"float",name:"scale",default:12},{type:"float",name:"speed",default:.2},{type:"float",name:"lightMix",default:.45},{type:"float",name:"specular",default:.4},{type:"float",name:"lightX",default:.65},{type:"float",name:"lightY",default:.35},{type:"float",name:"detail",default:1.05}],glsl:uy}),t({name:"reactionDiffSim",type:"src",inputs:[{type:"sampler2D",name:"stateTex",default:0},{type:"sampler2D",name:"videoTex",default:0},{type:"float",name:"feed",default:.55},{type:"float",name:"kill",default:.57},{type:"float",name:"scale",default:12},{type:"float",name:"speed",default:.35},{type:"float",name:"styleMap",default:.35},{type:"float",name:"videoDrive",default:.72},{type:"float",name:"flow",default:.28},{type:"float",name:"emboss",default:.55},{type:"float",name:"forceSeed",default:0}],glsl:ux}),t({name:"reactionDiffusionOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0}],glsl:px}),t({name:"lumaDustOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0}],glsl:mx}),t({name:"lumaLockOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"glow",default:.45}],glsl:dx}),t({name:"concentricRotateDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"mode",default:0},{type:"float",name:"rings",default:7},{type:"float",name:"ringStep",default:.08},{type:"float",name:"speed",default:.25},{type:"float",name:"centerX",default:.5},{type:"float",name:"centerY",default:.5}],glsl:`
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;

          vec2 origin = vec2(clamp(centerX, 0.0, 1.0), clamp(centerY, 0.0, 1.0));
          vec2 uv = _st - origin;
          float aspect = resolution.x / max(1.0, resolution.y);
          uv.x *= aspect;

          float maxR = length(vec2(0.5 * aspect, 0.5));
          float ringCount = max(2.0, floor(rings + 0.5));
          const float TAU = 6.2831853;
          float perRing = clamp(ringStep, 0.0, 0.25) * TAU;
          float isDouble = step(0.5, clamp(mode, 0.0, 1.0));

          float dist = length(uv);
          float t = clamp(dist / max(maxR, 1e-4), 0.0, 1.0);
          float ringIdx = floor(t * ringCount);
          ringIdx = clamp(ringIdx, 0.0, ringCount - 1.0);
          float concentricAng = ringIdx * perRing
            + time * max(0.0, speed) * ringIdx;

          float softR = maxR * 0.05;
          float rSoft = sqrt(dot(uv, uv) + softR * softR);
          float tSoft = clamp(rSoft / max(maxR, 1e-4), 0.0, 1.0);
          vec2 n = uv / rSoft;
          float armWave = n.x * n.y * 2.0;
          float spiralPitch = perRing * ringCount * 0.5;
          float radialTwist = tSoft * tSoft * spiralPitch;
          float armTwist = tSoft * armWave * perRing * 1.35;
          float spiralAng = radialTwist + armTwist
            + time * max(0.0, speed) * tSoft * (0.25 + abs(armWave) * 0.2);

          float ang = mix(concentricAng, spiralAng, isDouble) * a;

          float cos_a = cos(-ang);
          float sin_a = sin(-ang);
          vec2 rot = vec2(uv.x * cos_a - uv.y * sin_a, uv.x * sin_a + uv.y * cos_a);
          rot.x /= aspect;
          return rot + origin;
        `}),t({name:"randomGalleryDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"cells",default:7},{type:"float",name:"speed",default:.72},{type:"float",name:"refraction",default:.78},{type:"float",name:"drift",default:.78}],glsl:sx}),t({name:"gridShuffleDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"cells",default:4},{type:"float",name:"chaos",default:1},{type:"float",name:"seed",default:1}],glsl:lx}),t({name:"rippleDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"frequency",default:8},{type:"float",name:"speed",default:1},{type:"float",name:"decay",default:.5},{type:"float",name:"centerX",default:.5},{type:"float",name:"centerY",default:.5}],glsl:`
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;

          vec2 origin = vec2(clamp(centerX, 0.0, 1.0), clamp(centerY, 0.0, 1.0));
          vec2 uv = _st - origin;
          float aspect = resolution.x / max(1.0, resolution.y);
          uv.x *= aspect;

          float dist = length(uv);
          float falloff = mix(1.0, exp(-dist * mix(1.5, 8.0, clamp(decay, 0.0, 1.0))), clamp(decay, 0.0, 1.0));
          float phase = dist * max(2.0, frequency) * 6.2831853 - time * max(0.0, speed) * 6.2831853;
          float wave = sin(phase) * a * falloff * 0.085;
          vec2 dir = dist > 1e-4 ? uv / dist : vec2(0.0, 1.0);
          vec2 disp = dir * wave;
          disp.x /= aspect;
          return _st + disp;
        `}),t({name:"edgeDiff",type:"combine",inputs:[{type:"float",name:"edgeSens",default:.32},{type:"float",name:"edgeSoft",default:.25},{type:"float",name:"edgeStr",default:1},{type:"float",name:"edgeFade",default:.004}],glsl:`
          vec3 w = vec3(0.299, 0.587, 0.114);
          float d = abs(dot(_c0.rgb, w) - dot(_c1.rgb, w));
          float sens = mix(0.001, 0.14, clamp(edgeSens, 0.0, 1.0));
          float soft = mix(0.002, 0.22, clamp(edgeSoft, 0.0, 1.0));
          float str = max(0.0, edgeStr);
          float e = clamp(smoothstep(sens, sens + soft, d) * str, 0.0, 1.0);

          // Shifted-sample wrap paints a false frame on the framebuffer border \u2014
          // fade edge response within edgeFade UV of each side.
          vec2 uv = gl_FragCoord.xy / max(resolution.xy, vec2(1.0));
          float fade = max(1.5 / min(resolution.x, resolution.y), abs(edgeFade));
          float border = min(min(uv.x, uv.y), min(1.0 - uv.x, 1.0 - uv.y));
          e *= smoothstep(0.0, fade, border);

          return vec4(vec3(e), _c0.a);
        `}),t({name:"centerStripMap",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"centerY",default:.5},{type:"float",name:"bandWidth",default:.06},{type:"float",name:"diffusion",default:.72}],glsl:`
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;
          float diff = clamp(diffusion, 0.0, 1.0);
          float cy = clamp(centerY, 0.05, 0.95);
          float bw = max(0.004, bandWidth);
          float halfBand = bw * 0.5;

          vec2 st = _st;
          float ady = abs(st.y - cy);
          if (ady <= halfBand) return st;

          float edge = smoothstep(halfBand, 0.5, ady);
          float pull = a * mix(1.0, edge, diff);
          st.y = mix(st.y, cy, pull);
          return st;
        `}),t({name:"midlineStretch",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"splitY",default:.5}],glsl:`
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;
          float y0 = clamp(splitY, 0.05, 0.95);
          vec2 st = _st;
          // Pull samples above and below the split toward the midline (scanline stretch).
          st.y = mix(st.y, y0, a);
          return st;
        `}),t({name:"grainNoise",type:"src",inputs:[{type:"float",name:"scale",default:32},{type:"float",name:"speed",default:.1}],glsl:`
          float sc = max(1.0, scale);
          vec2 fc = gl_FragCoord.xy;
          vec2 t = vec2(time * speed * 43.17, time * speed * 57.03);
          vec2 p0 = _st * sc * 2.0 + fc * (0.0021 + sc * 1.1e-5) + t;
          vec2 p1 = _st * sc * 2.0 * 1.6180339887 + fc.yx * (0.00175 + sc * 9.0e-6) - t * 0.82;
          vec2 p2 = _st * sc * 2.0 * 2.398082257 + fc * 0.00135 + t.yx * 0.44;
          
          vec3 p3_0 = fract(vec3(p0.xyx) * vec3(0.1031, 0.1030, 0.0973));
          p3_0 += dot(p3_0, p3_0.yxz + 33.33);
          float a = fract((p3_0.x + p3_0.y) * p3_0.z);
          
          vec3 p3_1 = fract(vec3(p1.xyx) * vec3(0.1031, 0.1030, 0.0973));
          p3_1 += dot(p3_1, p3_1.yxz + 33.33);
          float b = fract((p3_1.x + p3_1.y) * p3_1.z);
          
          vec3 p3_2 = fract(vec3(p2.xyx) * vec3(0.1031, 0.1030, 0.0973));
          p3_2 += dot(p3_2, p3_2.yxz + 33.33);
          float c = fract((p3_2.x + p3_2.y) * p3_2.z);
          
          float n = a * 0.38 + b * 0.36 + c * 0.26;
          return vec4(vec3(n), 1.0);
        `}),t({name:"gaussianNoiseGrid",type:"src",inputs:[{type:"float",name:"grid",default:256},{type:"float",name:"speed",default:.1}],glsl:`
          float gsz = max(8.0, grid);
          float aspect = resolution.x / max(1.0, resolution.y);
          vec2 coord = vec2(_st.x * gsz * aspect, _st.y * gsz);
          vec2 cell = floor(coord);
          float t = time * speed;
          
          vec2 p_1 = cell + vec2(3.1, 41.9) + vec2(t * 0.13, t * 0.07);
          vec3 p3_1 = fract(vec3(p_1.xyx) * vec3(0.1031, 0.1030, 0.0973));
          p3_1 += dot(p3_1, p3_1.yxz + 33.33);
          float u1 = max(1.0e-6, fract((p3_1.x + p3_1.y) * p3_1.z));
          
          vec2 p_2 = cell + vec2(17.2, 2.8) + vec2(t * 0.09, t * 0.11);
          vec3 p3_2 = fract(vec3(p_2.xyx) * vec3(0.1031, 0.1030, 0.0973));
          p3_2 += dot(p3_2, p3_2.yxz + 33.33);
          float u2 = fract((p3_2.x + p3_2.y) * p3_2.z);
          
          float r = sqrt(-2.0 * log(u1));
          float gaus = r * cos(6.28318530718 * u2);
          
          float e = exp(gaus);
          float e_inv = exp(-gaus);
          float n = (e - e_inv) / (e + e_inv) * 0.5 + 0.5;
          n = clamp(n * 1.42 - 0.21, 0.0, 1.0);
          return vec4(vec3(n), 1.0);
        `}),t({name:"shatterLayerCoord",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"density",default:14},{type:"float",name:"scatter",default:.62},{type:"float",name:"irregularity",default:.82}],glsl:gx}),t({name:"shatterLayerGap",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"density",default:14},{type:"float",name:"gap",default:.065},{type:"float",name:"irregularity",default:.82}],glsl:bx}),t({name:"videoMapMask",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"invert",default:0},{type:"float",name:"threshold",default:.35},{type:"float",name:"softness",default:.12}],glsl:Ys}),t({name:"layerOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0}],glsl:Ox}),t({name:"layerMaskCut",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"invert",default:0},{type:"float",name:"threshold",default:.35},{type:"float",name:"softness",default:.12}],glsl:Ys}),t({name:"layerMaskAlpha",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"invert",default:0},{type:"float",name:"threshold",default:.35},{type:"float",name:"softness",default:.12}],glsl:Fx}),t({name:"maskVideoRectCutout",type:"combine",inputs:[{type:"float",name:"centerX",default:.5},{type:"float",name:"centerY",default:.5},{type:"float",name:"halfWx",default:.1},{type:"float",name:"halfHy",default:.08}],glsl:`
          vec2 uv = vec2(
            gl_FragCoord.x / resolution.x,
            1.0 - gl_FragCoord.y / resolution.y
          );
          vec2 center = vec2(clamp(centerX, 0.0, 1.0), clamp(centerY, 0.0, 1.0));
          float hx = max(0.001, halfWx);
          float hy = max(0.001, halfHy);
          vec2 d = abs(uv - center);
          float inRect = step(d.x, hx) * step(d.y, hy);
          if (inRect > 0.5) return vec4(_c1.rgb, _c0.a);
          return _c0;
        `}),t({name:"encodingGlitch",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"macroBlock",default:.5},{type:"float",name:"tear",default:.35}],glsl:`
          if (amount < 0.00001) return _c0;
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          float a = clamp(amount, 0.0, 1.0);
          float mb = clamp(macroBlock, 0.0, 1.0);
          float tearAmt = clamp(tear, 0.0, 1.0);
          float blocks = mix(140.0, 8.0, mb);
          vec2 blockId = floor(uv * blocks);
          vec2 q = blockId / blocks;
          float blockSeed = fract(sin(dot(blockId, vec2(12.9898, 78.233))) * 43758.5453);
          float levels = max(4.0, mix(44.0, 10.0, a));
          levels *= mix(1.0, 0.5 + blockSeed * 0.5, mb * 0.9);
          vec4 c = _c0;
          c.rgb = floor(c.rgb * levels + 0.5) / levels;
          float row = blockId.y;
          float n = fract(sin(row * 19.9898 + floor(time * 6.0) * 0.13) * 43758.5453);
          float thr = mix(1.05, 0.86, tearAmt);
          if (tearAmt > 0.00001 && n > thr) {
            float m = fract(sin(dot(q, vec2(127.1, 311.7)) + time) * 43758.5453);
            c.rgb = mix(c.rgb, c.bgr, 0.32 * tearAmt);
            c.rgb += (m - 0.5) * 0.2 * a * tearAmt;
          }
          return mix(_c0, c, a);
        `}),t({name:"fillLayerSrc",type:"src",inputs:[{type:"float",name:"ar",default:.49},{type:"float",name:"ag",default:.23},{type:"float",name:"ab",default:.93},{type:"float",name:"br",default:.02},{type:"float",name:"bg",default:.71},{type:"float",name:"bb",default:.83},{type:"float",name:"gradType",default:1},{type:"float",name:"softness",default:.35},{type:"float",name:"sweep",default:0}],glsl:B1}),t({name:"mirrorStripesSrc",type:"src",inputs:[{type:"float",name:"cr",default:1},{type:"float",name:"cg",default:.1},{type:"float",name:"cb",default:.1},{type:"float",name:"scale",default:.82},{type:"float",name:"spread",default:.48},{type:"float",name:"density",default:.55},{type:"float",name:"thickness",default:.55},{type:"float",name:"layers",default:4},{type:"float",name:"rotate",default:0},{type:"float",name:"randomness",default:0},{type:"float",name:"mirror",default:1}],glsl:cx}),t({name:"plasmaSrc",type:"src",inputs:[{type:"float",name:"speed",default:1},{type:"float",name:"scale",default:1},{type:"float",name:"complexity",default:1}],glsl:D1});let n=[{type:"float",name:"variant",default:2},{type:"float",name:"scale",default:1},{type:"float",name:"speed",default:.4},{type:"float",name:"warp",default:0},{type:"float",name:"ar",default:.04},{type:"float",name:"ag",default:.06},{type:"float",name:"ab",default:.13},{type:"float",name:"br",default:.13},{type:"float",name:"bg",default:.83},{type:"float",name:"bb",default:.93}];t({name:"patternNoiseSrc",type:"src",inputs:[...n],glsl:Gb}),t({name:"patternCellsSrc",type:"src",inputs:[...n],glsl:Ub}),t({name:"patternTilesSrc",type:"src",inputs:[...n],glsl:zb}),t({name:"patternPolarSrc",type:"src",inputs:[...n],glsl:Vb}),t({name:"patternGeometrySrc",type:"src",inputs:[{type:"float",name:"geometry",default:0},...n.slice(1)],glsl:$b}),t({name:"patternTuringDisplay",type:"src",inputs:[...la],glsl:jb}),t({name:"patternRdSim",type:"src",inputs:[{type:"sampler2D",name:"stateTex",default:0},{type:"float",name:"feed",default:.052},{type:"float",name:"kill",default:.0634},{type:"float",name:"cells",default:140},{type:"float",name:"styleMap",default:0},{type:"float",name:"speed",default:1},{type:"float",name:"seedSize",default:.18},{type:"float",name:"forceSeed",default:0}],glsl:Xb}),t({name:"electricNoiseSrc",type:"src",inputs:[{type:"sampler2D",name:"noiseTex",default:0},{type:"float",name:"speed",default:1},{type:"float",name:"scale",default:1},{type:"float",name:"noiseScale",default:1},{type:"float",name:"turbulence",default:.2},{type:"float",name:"detail",default:5},{type:"float",name:"intensity",default:1.4},{type:"float",name:"rings",default:.85},{type:"float",name:"ringPower",default:.9},{type:"float",name:"triggerRings",default:1},{type:"sampler2D",name:"triggerTex",default:0},{type:"float",name:"triggerRingCount",default:0},{type:"float",name:"colorR",default:.2},{type:"float",name:"colorG",default:.1},{type:"float",name:"colorB",default:.4}],glsl:Zb}),t({name:"plexusSrc",type:"src",inputs:[{type:"float",name:"speed",default:1},{type:"float",name:"pointDensity",default:1.5},{type:"float",name:"lineIntensity",default:1},{type:"float",name:"layers",default:4},{type:"float",name:"glow",default:1.2},{type:"float",name:"audioBoost",default:0}],glsl:ry}),t({name:"superformulaSrc",type:"src",inputs:[{type:"float",name:"look",default:2},{type:"float",name:"m",default:7.6},{type:"float",name:"n1",default:.36},{type:"float",name:"n2",default:2.16},{type:"float",name:"size",default:.48},{type:"float",name:"speed",default:.35},{type:"float",name:"glow",default:1.2},{type:"float",name:"cr",default:.769},{type:"float",name:"cg",default:.71},{type:"float",name:"cb",default:.992}],glsl:U1}),t({name:"topoContourSrc",type:"src",inputs:[{type:"sampler2D",name:"videoTex",default:0},{type:"float",name:"scale",default:1},{type:"float",name:"lines",default:10},{type:"float",name:"speed",default:1},{type:"float",name:"valley",default:.12},{type:"float",name:"lineWidth",default:1},{type:"float",name:"videoTint",default:.35},{type:"float",name:"palette",default:0}],glsl:N1}),t({name:"universeWithinSrc",type:"src",inputs:[{type:"float",name:"speed",default:1},{type:"float",name:"zoomFactor",default:1.5},{type:"float",name:"layers",default:4},{type:"float",name:"glow",default:1.2},{type:"float",name:"audioBoost",default:0}],glsl:G1}),t({name:"fractalFoldSrc",type:"src",inputs:[{type:"float",name:"foldX",default:.86},{type:"float",name:"foldY",default:1.04},{type:"float",name:"zoomFactor",default:1},{type:"float",name:"speed",default:.6},{type:"float",name:"spin",default:.42},{type:"float",name:"iterDepth",default:8},{type:"float",name:"glow",default:1.4},{type:"float",name:"hueShift",default:.12},{type:"float",name:"audioBoost",default:0}],glsl:ay}),t({name:"rampGradient",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"stopCount",default:3},{type:"float",name:"r0",default:0},{type:"float",name:"g0",default:0},{type:"float",name:"b0",default:0},{type:"float",name:"p0",default:0},{type:"float",name:"r1",default:.5},{type:"float",name:"g1",default:.5},{type:"float",name:"b1",default:.5},{type:"float",name:"p1",default:.5},{type:"float",name:"r2",default:1},{type:"float",name:"g2",default:1},{type:"float",name:"b2",default:1},{type:"float",name:"p2",default:1},{type:"float",name:"r3",default:.55},{type:"float",name:"g3",default:.55},{type:"float",name:"b3",default:.55},{type:"float",name:"p3",default:.7},{type:"float",name:"r4",default:.55},{type:"float",name:"g4",default:.55},{type:"float",name:"b4",default:.55},{type:"float",name:"p4",default:.82},{type:"float",name:"r5",default:.55},{type:"float",name:"g5",default:.55},{type:"float",name:"b5",default:.55},{type:"float",name:"p5",default:.94},{type:"float",name:"animate",default:0},{type:"float",name:"speed",default:.45}],glsl:Gx}),t({name:"answerPrint",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"stock",default:0},{type:"float",name:"density",default:1}],glsl:Ux}),t({name:"hdrGrade",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"blackFloor",default:.08},{type:"float",name:"highlights",default:.85},{type:"float",name:"knee",default:.5}],glsl:`
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _c0;
          float l = dot(_c0.rgb, vec3(0.2126, 0.7152, 0.0722));
          float floorPt = clamp(blackFloor, 0.0, 0.35);
          float soft = clamp(knee, 0.0, 1.0);
          float band = mix(0.02, 0.18, soft);
          float shadowMask = smoothstep(floorPt, floorPt + band, l);
          float ln = l * shadowMask * shadowMask;
          float hiW = pow(smoothstep(0.45, 1.0, ln), mix(2.8, 1.35, soft));
          ln += clamp(highlights, 0.0, 2.0) * 0.6 * hiW * (1.0 - ln);
          float ratio = ln / max(l, 1e-4);
          vec3 graded = clamp(_c0.rgb * ratio, 0.0, 1.0);
          return vec4(mix(_c0.rgb, graded, a), _c0.a);
        `}),t({name:"lumaPrint",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"mode",default:2},{type:"float",name:"density",default:24},{type:"float",name:"contrast",default:.48},{type:"float",name:"wave",default:.35},{type:"float",name:"iconSet",default:0},{type:"float",name:"shape",default:0},{type:"float",name:"rotation",default:0}],glsl:I1}),t({name:"lumaGridSquares",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"cols",default:32},{type:"float",name:"rows",default:16},{type:"float",name:"minSize",default:.14},{type:"float",name:"maxSize",default:.88}],glsl:`
          if (amount < 0.00001) return _c0;
          float c = max(2.0, cols);
          float r = max(2.0, rows);
          vec2 grid = vec2(c, r);
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          vec2 cell = fract(uv * grid) - 0.5;
          float l = dot(_c0.rgb, vec3(0.299, 0.587, 0.114));
          float strength = clamp(amount, 0.0, 1.0);
          float lo = clamp(minSize, 0.0, 1.0);
          float hi = clamp(maxSize, 0.0, 1.0);
          float loBound = min(lo, hi);
          float hiBound = max(lo, hi);
          float targetSide = mix(loBound, hiBound, clamp(l, 0.0, 1.0));
          targetSide = min(targetSide, 0.96);
          float side = mix(1.0, targetSide, strength);
          float ink = clamp(l, 0.0, 1.0);
          float dotLift = smoothstep(0.004, 0.055, ink);
          float radius = side * 0.5 * dotLift;
          float dotMask = 1.0 - step(radius, length(cell));
          return vec4(mix(_c0.rgb, vec3(dotMask), strength), 1.0);
        `}),t({name:"pointCloudRemap",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"cols",default:32},{type:"float",name:"rows",default:20},{type:"float",name:"minSize",default:.12},{type:"float",name:"maxSize",default:.85},{type:"float",name:"depth",default:.58},{type:"float",name:"parallax",default:.78},{type:"float",name:"blur",default:.5},{type:"float",name:"fog",default:.4}],glsl:O1}),t({name:"concentricMask",type:"src",inputs:[{type:"float",name:"freq",default:10},{type:"float",name:"speed",default:.1},{type:"float",name:"rotation",default:0},{type:"float",name:"balance",default:.5}],glsl:`
          vec2 st = _st - 0.5;
          // Correct for aspect ratio to keep shapes regular
          st.x *= resolution.x / resolution.y;

          float cos_a = cos(rotation);
          float sin_a = sin(rotation);
          st = vec2(st.x * cos_a - st.y * sin_a, st.x * sin_a + st.y * cos_a);
          
          float d = length(st);
          // Use freq/10 to keep it manageable compared to osc freq
          float val = sin(d * freq * 0.62831 - time * speed * 10.0);
          float threshold = 1.0 - balance * 2.0;
          return vec4(vec3(step(threshold, val)), 1.0);
        `}),t({name:"lumaLines",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"cols",default:52},{type:"float",name:"minWidth",default:.1},{type:"float",name:"maxWidth",default:.8},{type:"float",name:"rotation",default:0}],glsl:`
          if (amount < 0.00001) return _c0;
          float c = max(2.0, cols);
          float strength = clamp(amount, 0.0, 1.0);
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          vec2 st = uv - 0.5;
          st.x *= resolution.x / max(1.0, resolution.y);
          float cos_a = cos(rotation);
          float sin_a = sin(rotation);
          vec2 rst = vec2(st.x * cos_a - st.y * sin_a, st.x * sin_a + st.y * cos_a);
          
          float cellCoord = fract(rst.x * c) - 0.5;
          float l = dot(_c0.rgb, vec3(0.299, 0.587, 0.114));
          float ink = clamp(l, 0.0, 1.0);
          float lineLift = smoothstep(0.01, 0.06, ink);
          
          float lo = clamp(minWidth, 0.0, 1.0);
          float hi = clamp(maxWidth, 0.0, 1.0);
          float loBound = min(lo, hi);
          float hiBound = max(lo, hi);
          float targetWidth = mix(loBound, hiBound, ink);
          
          float radius = targetWidth * 0.5 * lineLift;
          float lineMask = 1.0 - step(radius, abs(cellCoord));
          
          return vec4(mix(_c0.rgb, vec3(lineMask), strength), 1.0);
        `}),t({name:"concentricSquareMask",type:"src",inputs:[{type:"float",name:"freq",default:10},{type:"float",name:"speed",default:.1},{type:"float",name:"rotation",default:0},{type:"float",name:"balance",default:.5}],glsl:`
          vec2 st = _st - 0.5;
          // Correct for aspect ratio to keep shapes regular
          st.x *= resolution.x / resolution.y;

          float cos_a = cos(rotation);
          float sin_a = sin(rotation);
          st = vec2(st.x * cos_a - st.y * sin_a, st.x * sin_a + st.y * cos_a);
          
          // Square distance (Chebyshev)
          float d = max(abs(st.x), abs(st.y));
          
          float val = sin(d * freq * 0.62831 - time * speed * 10.0);
          float threshold = 1.0 - balance * 2.0;
          return vec4(vec3(step(threshold, val)), 1.0);
        `}),t({name:"perspectiveSlatMask",type:"src",inputs:[{type:"float",name:"freq",default:20},{type:"float",name:"speed",default:.2},{type:"float",name:"rotation",default:0},{type:"float",name:"balance",default:.5},{type:"float",name:"perspective",default:.75},{type:"float",name:"focus",default:1}],glsl:`
          float aspect = resolution.x / resolution.y;
          vec2 st = _st - 0.5;
          st.x *= aspect;

          float cos_a = cos(rotation);
          float sin_a = sin(rotation);
          st = vec2(st.x * cos_a - st.y * sin_a, st.x * sin_a + st.y * cos_a);

          vec2 uv = vec2(st.x / aspect + 0.5, st.y + 0.5);
          float cols = max(3.0, freq);
          float colU = fract(uv.x * cols) - 0.5;

          float persp = clamp(perspective, 0.0, 1.0);
          float focusX = clamp(focus, 0.0, 1.0);
          float dist = uv.x - focusX;
          float twist = dist * persp * 2.2;
          twist += sin(time * speed * 10.0 + colU * 6.28318) * 0.1 * persp;

          float cy = uv.y - 0.5;
          float cos_t = cos(twist);
          float sin_t = sin(twist);
          float rx = colU * cos_t - cy * sin_t;

          float halfW = mix(0.015, 0.42, clamp(balance, 0.0, 1.0));
          halfW *= 1.0 - 0.3 * abs(sin(twist)) * persp;

          float mask = 1.0 - step(halfW, abs(rx));
          return vec4(vec3(mask), 1.0);
        `}),t({name:"dataDrip",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"columns",default:72},{type:"float",name:"chaos",default:.35},{type:"float",name:"dance",default:.65},{type:"float",name:"speed",default:1}],glsl:`
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;
          float cols = max(8.0, columns);
          float ch = clamp(chaos, 0.0, 1.0);
          float dn = clamp(dance, 0.0, 1.0);
          float sp = max(0.0, speed);
          vec2 st = _st;
          float colIdx = floor(st.x * cols);
          float u = (colIdx + 0.5) / cols;
          float h1 = fract(sin(u * 127.1 + colIdx * 3.7) * 43758.5453);
          float h2 = fract(sin(u * 311.7 + colIdx * 19.2) * 9988.231);
          float phase = colIdx * 0.41 + h2 * 6.2831853;

          float sway =
            sin(time * sp + phase) * 0.55 +
            sin(time * sp * 1.73 + phase * 1.6 + st.y * 4.2) * 0.3 +
            sin(time * sp * 0.45 + u * 9.5) * 0.15;
          float softPhase = 0.5 + 0.5 * sin(time * sp * 0.55 + phase * 0.85);
          float softPull = softPhase * softPhase * (0.03 + dn * 0.05);
          float danceY = (sway * dn * 0.16 - softPull * dn) * a;

          float h1Live = fract(sin(u * 127.1 + time * sp * 0.38) * 43758.5453);
          float dripRate = (0.18 + h1 * 0.62) * max(0.15, sp);
          float dripPhase = fract(time * dripRate + h2);
          float dripPull = dripPhase * dripPhase * (0.05 + ch * 0.12);
          float wv = sin(st.y * 6.2831853 * (4.0 + h2 * 14.0) + time * sp * (1.05 + h1 * 2.2));
          float stripJitter = (h1Live - 0.5) * (0.16 + ch * 0.26);
          float micro = wv * (0.018 + ch * 0.05);
          float chaosY = (stripJitter + micro - dripPull) * a * ch;

          st.y = clamp(st.y + danceY + chaosY, 0.001, 0.999);
          return st;
        `}),t({name:"liquix",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"pivot",default:.48},{type:"float",name:"bands",default:56},{type:"float",name:"speed",default:1.15}],glsl:z1}),t({name:"metalSphereScene",type:"color",inputs:[{type:"sampler2D",name:"tex",default:0},{type:"float",name:"amount",default:0},{type:"float",name:"sphereSize",default:1},{type:"float",name:"noiseAmt",default:.42},{type:"float",name:"detail",default:3.5},{type:"float",name:"speed",default:.75},{type:"float",name:"roughness",default:.1},{type:"float",name:"reflectAmt",default:1.05},{type:"float",name:"rotation",default:.35},{type:"float",name:"envAspect",default:1.777}],glsl:k1}),t({name:"warpTunnelColor",type:"color",inputs:[{type:"sampler2D",name:"videoTex",default:0},{type:"float",name:"amount",default:0},{type:"float",name:"tunnelSpeed",default:.55},{type:"float",name:"tunnelRefract",default:.72},{type:"float",name:"tunnelShine",default:.68},{type:"float",name:"tunnelArms",default:3},{type:"float",name:"tunnelFog",default:.62},{type:"float",name:"audioBoost",default:0},{type:"float",name:"tunnelQuality",default:0}],glsl:W1}),t({name:"pulseMarchColor",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"morph",default:.55},{type:"float",name:"marchSpeed",default:1.1},{type:"float",name:"detail",default:4.5},{type:"float",name:"glow",default:.65}],glsl:F1}),t({name:"throughTheStarsOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"glow",default:.74}],glsl:E1}),t({name:"feedbackGrade",type:"color",inputs:[{type:"float",name:"balance",default:.5},{type:"float",name:"luminosity",default:0}],glsl:yx}),t({name:"ghostFlow",type:"color",inputs:[{type:"sampler2D",name:"prevTex",default:NaN},{type:"float",name:"amount",default:0},{type:"float",name:"melt",default:.62},{type:"float",name:"flowScale",default:.48},{type:"float",name:"refresh",default:0},{type:"float",name:"chromaBleed",default:.35}],glsl:xx}),t({name:"paletteRecolor",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"mode",default:0},{type:"float",name:"count",default:3},{type:"float",name:"p0r",default:0},{type:"float",name:"p0g",default:0},{type:"float",name:"p0b",default:0},{type:"float",name:"p1r",default:.5},{type:"float",name:"p1g",default:.5},{type:"float",name:"p1b",default:.5},{type:"float",name:"p2r",default:1},{type:"float",name:"p2g",default:1},{type:"float",name:"p2b",default:1},{type:"float",name:"p3r",default:1},{type:"float",name:"p3g",default:1},{type:"float",name:"p3b",default:1}],glsl:Mx}),t({name:"shapeLayerSrc",type:"src",inputs:[{type:"float",name:"shape",default:0},{type:"float",name:"size",default:.45},{type:"float",name:"roundness",default:0},{type:"float",name:"stroke",default:.15},{type:"float",name:"rotate",default:0},{type:"float",name:"centerX",default:.5},{type:"float",name:"centerY",default:.5},{type:"float",name:"cr",default:1},{type:"float",name:"cg",default:1},{type:"float",name:"cb",default:1},{type:"float",name:"opacity",default:1},{type:"float",name:"shapeFill",default:0}],glsl:Tx}),t({name:"stringLayer",type:"color",inputs:[{type:"float",name:"amount",default:1},{type:"float",name:"tension",default:.42},{type:"float",name:"position",default:.5},{type:"float",name:"orientation",default:0},{type:"float",name:"thickness",default:.42},{type:"float",name:"glow",default:.68},{type:"float",name:"harmonics",default:2},{type:"float",name:"cr",default:.965},{type:"float",name:"cg",default:.929},{type:"float",name:"cb",default:.831}],glsl:Cx}),t({name:"resynthWarp",type:"coord",inputs:[{type:"float",name:"x",default:.5},{type:"float",name:"y",default:.78}],glsl:Sx}),t({name:"resynthTint",type:"color",inputs:[{type:"float",name:"x",default:.5},{type:"float",name:"y",default:.78},{type:"float",name:"hue",default:.25},{type:"float",name:"decay",default:.3}],glsl:wx}),t({name:"timeGlitchSlices",type:"color",inputs:[{type:"sampler2D",name:"sliceTex",default:0},{type:"float",name:"amount",default:0}],glsl:Wx}),t({name:"hitStreakExtract",type:"color",inputs:[{type:"float",name:"threshold",default:.6},{type:"float",name:"thinness",default:.55}],glsl:Lx}),t({name:"lens7cPrism",type:"color",inputs:[{type:"sampler2D",name:"prismTex",default:0},{type:"float",name:"amount",default:0},{type:"float",name:"throwLen",default:.12},{type:"float",name:"rotation",default:0},{type:"float",name:"threshold",default:.45},{type:"float",name:"haze",default:.5}],glsl:Rx})}u();u();u();var ck=[255,60,180],uk=[80,220,255],pk=[255,255,255];function Sd(e,t,n,o){return Number.isFinite(e)?Math.max(t,Math.min(n,e)):o}function Yc(e){let t=Number(e);return Number.isFinite(t)?t>1?Sd(t/24,.005,.35,.08):Sd(t,.005,.35,.08):.08}function uo(e,t){if(typeof e!="string"||!/^#[0-9a-fA-F]{6}$/.test(e))return t;let n=Number.parseInt(e.slice(1),16);return Number.isFinite(n)?[n>>16&255,n>>8&255,n&255]:t}function wd(e){return{horizontal:uo(e?.horizontalColor,ck),vertical:uo(e?.verticalColor,uk),cross:uo(e?.crossColor,pk)}}function Kc(e){return{decay:Number(e?.decay??1.25),thickness:Yc(e?.thickness),intersect:Sd(Number(e?.intersect??e?.defocus),0,3,1.6)}}function $x(){let e=document.createElement("canvas");e.width=320,e.height=180;let t=e.getContext("2d",{willReadFrequently:!0});if(!t)throw new Error("2d canvas unavailable");return{canvas:e,ctx:t,lines:[],lastUploadMs:0}}function mk(e,t){let n=Number.isFinite(t)&&t>.05?t:1.7777777777777777,o=512,r=Math.round(o/n);r>512&&(r=512,o=Math.round(r*n)),o=Math.max(160,o),r=Math.max(90,r),(e.canvas.width!==o||e.canvas.height!==r)&&(e.canvas.width=o,e.canvas.height=r)}function dk(e,t){let n=Math.max(0,e),o=Math.max(0,t),r=n+o;return r<=0?Math.random()<.5?"h":"v":Math.random()<n/r?"h":"v"}function Ii(e,t){let n=Math.max(0,Math.min(16,Math.round(t.spawn)));if(n<=0)return;let o=Math.max(0,t.horizontal),r=Math.max(0,t.vertical),i=Yc(t.thickness);for(let s=0;s<n;s++){e.lines.length>=96&&e.lines.shift();let l=dk(o,r);e.lines.push({axis:l,pos:.04+Math.random()*.92,life:1,width:i*(.65+Math.random()*.7)})}e.lastUploadMs=0}function Ks(e){return{spawn:Number(e?.spawn??4),horizontal:Number(e?.horizontal??1),vertical:Number(e?.vertical??1),thickness:Yc(e?.thickness)}}function qx(e,t,n){let o=Math.max(.5,n)*Math.max(0,t),r=[];for(let i=0;i<e.lines.length;i++){let s=e.lines[i],l=s.life-o;l>.008&&r.push({...s,life:l})}e.lines=r}function Xc([e,t,n],o){return`rgba(${e},${t},${n},${o})`}function fk(e,t){let o=Math.round(e[0]*.65+89.25),r=Math.round(e[1]*(1-.35)+255*.35),i=Math.round(e[2]*(1-.35)+255*.35);return`rgba(${o},${r},${i},${t})`}function hk(e){let t=Math.pow(Math.max(.004,e)/.08,.55);return[{scale:.35+5.15*t,alpha:.08},{scale:.3+2.9*t,alpha:.14},{scale:.25+1.55*t,alpha:.28},{scale:.2+.8*t,alpha:.72},{scale:.15+.2*t,alpha:.95}]}function Vx(e,t,n,o,r,i,s,l){let m=i*Math.min(o,r),d=hk(i);e.lineCap="round";for(let y=0;y<d.length;y++){let D=d[y];if(e.strokeStyle=y===d.length-1?fk(l,D.alpha*s):Xc(l,D.alpha*s),e.lineWidth=Math.max(.25,m*D.scale),e.beginPath(),t==="h"){let B=n*r;e.moveTo(0,B),e.lineTo(o,B)}else{let B=n*o;e.moveTo(B,0),e.lineTo(B,r)}e.stroke()}}function _k(e,t,n,o,r,i){let s=Math.max(0,o);if(s<.04)return;e.save(),e.globalCompositeOperation="lighter",e.lineCap="round";let l=[{r:r*2.8,alpha:.12},{r:r*1.6,alpha:.22},{r:r*.75,alpha:.55}];for(let m=0;m<l.length;m++){let d=l[m];e.fillStyle=Xc(i,d.alpha*s),e.beginPath(),e.arc(t,n,d.r,0,Math.PI*2),e.fill()}e.strokeStyle=Xc(i,.85*s),e.lineWidth=Math.max(1,r*.35),e.beginPath(),e.moveTo(t-r*3.2,n),e.lineTo(t+r*3.2,n),e.moveTo(t,n-r*3.2),e.lineTo(t,n+r*3.2),e.stroke(),e.fillStyle=Xc(i,s),e.beginPath(),e.arc(t,n,r*.28,0,Math.PI*2),e.fill(),e.restore()}function gk(e,t,n){mk(e,n);let{ctx:o,canvas:r,lines:i}=e,s=r.width,l=r.height;if(o.setTransform(1,0,0,1,0,0),o.globalCompositeOperation="source-over",o.fillStyle="rgba(0,0,0,1)",o.fillRect(0,0,s,l),i.length===0)return;let m=Yc(t.thickness),d=Math.max(0,Math.min(3,t.intersect)),{horizontal:y,vertical:D,cross:B}=t.colors;o.globalCompositeOperation="lighter";let O=i.filter(X=>X.axis==="h"),K=i.filter(X=>X.axis==="v");for(let X=0;X<O.length;X++){let pe=O[X];Vx(o,"h",pe.pos,s,l,pe.width||m,pe.life,y)}for(let X=0;X<K.length;X++){let pe=K[X];Vx(o,"v",pe.pos,s,l,pe.width||m,pe.life,D)}if(d>.01&&O.length>0&&K.length>0){let X=Math.min(s,l)*m*.55;for(let pe=0;pe<O.length;pe++){let Re=O[pe],ge=Re.pos*l;for(let Fe=0;Fe<K.length;Fe++){let Qe=K[Fe],Ze=Qe.pos*s,dt=Math.min(1,Re.life*Qe.life*d);_k(o,Ze,ge,dt,X,B)}}}}function Td(e,t,n,o,r,i=12){if(!e?.tex||!t)return!1;let s=t.lines.length>0?0:i;if(t.lastUploadMs>0&&r-t.lastUploadMs<s)return!1;gk(t,n,o);let l=e.tex;typeof l.resize=="function"&&(l.width!==t.canvas.width||l.height!==t.canvas.height)&&l.resize(t.canvas.width,t.canvas.height);try{l.subimage(t.canvas)}catch{return!1}return t.lastUploadMs=r,!0}var jx=1920,Xx=540,bk=512,Qc=[28,60,255],Zc=[255,154,26],Jc=[255,246,200];function Kx(){let e=document.createElement("canvas");e.width=jx,e.height=Xx;let t=e.getContext("2d",{alpha:!0});if(!t)throw new Error("2d canvas unavailable");t.imageSmoothingEnabled=!0;let n=document.createElement("canvas");n.width=jx,n.height=Xx;let o=n.getContext("2d",{alpha:!0});if(!o)throw new Error("2d scratch canvas unavailable");return o.imageSmoothingEnabled=!0,{canvas:e,ctx:t,scratch:n,scratchCtx:o,bins:new Float32Array(bk),lastUploadMs:0}}function Qx(e,t,n,o=.42){let r=Math.max(0,Math.min(1,n)),i=e[t];e[t]=i+(r-i)*o}function Yx(e,t,n){return[Math.round(e[0]+(t[0]-e[0])*n),Math.round(e[1]+(t[1]-e[1])*n),Math.round(e[2]+(t[2]-e[2])*n)]}function yk(e,t=Qc,n=Zc,o=Jc){let r=Math.max(0,Math.min(1,e));return r<=.5?Yx(t,n,r*2):Yx(n,o,(r-.5)*2)}function Zx(e){return{colorLo:uo(e?.colorLo,Qc),colorMid:uo(e?.colorMid,Zc),colorHi:uo(e?.colorHi,Jc)}}function Jx(e,t,n,o){if(!t.length||!Number.isFinite(n)||n<=0)return;let r=Math.max(0,Math.min(n,o)),i=Math.floor(r/n*t.length),s=t[Math.max(0,Math.min(t.length-1,i))]??.5,l=e.bins,m=l.length,d=o*2.4;for(let y=0;y<m;y++){let D=y/Math.max(1,m-1),B=Math.exp(-Math.pow((D-.12)/.09,2))*.85+Math.exp(-Math.pow((D-.35)/.14,2))*.55+Math.exp(-Math.pow((D-.62)/.18,2))*.35+Math.exp(-Math.pow((D-.85)/.12,2))*.22,O=.85+.15*Math.sin(d+D*9);Qx(l,y,s*B*O*1.15,.35)}}function ev(e,t,n){let o=t.kick??0,r=t.low??0,i=t.mid??0,s=t.high??0,l=t.master??(r+i+s)/3,m=e.bins,d=m.length;for(let y=0;y<d;y++){let D=y/Math.max(1,d-1),B=Math.exp(-Math.pow((D-.06)/.05,2))*o,O=Math.exp(-Math.pow((D-.18)/.1,2))*r,K=Math.exp(-Math.pow((D-.45)/.16,2))*i,X=Math.exp(-Math.pow((D-.78)/.14,2))*s,pe=l*.12*(.7+.3*Math.sin(n*6+D*14));Qx(m,y,Math.min(1,B*1.1+O+K+X+pe),.4)}}function xk(e,t){let n=e.length;if(n===0)return 0;let o=Math.max(0,Math.min(n-1,t)),r=Math.floor(o),i=Math.min(n-1,r+1),s=o-r,l=s*s*(3-2*s);return e[r]+(e[i]-e[r])*l}function Cd(e,t,n,o,r,i,s,l,m,d=1){e.lineWidth=i,e.lineCap="round",e.lineJoin="round";let y=r>1400?2:1,D=Math.max(0,Math.min(1,d));for(let B=0;B<r-y;B+=y){let O=(o[B]+o[B+y])*.5,[K,X,pe]=yk(O,s,l,m);e.strokeStyle=`rgba(${K},${X},${pe},${D})`,e.beginPath(),e.moveTo(t[B],n[B]),e.lineTo(t[B+y],n[B+y]),e.stroke()}}function vk(e,t,n,o,r,i,s,l,m){let d=t.length,y=new Float32Array(n),D=new Float32Array(n),B=new Float32Array(n),O=Math.max(1,n-1),K=i===2?1:i===1?.7:.22;for(let X=0;X<n;X++){let pe=X/O*(d-1),Re=Math.max(0,Math.min(1,xk(t,pe)));B[X]=Re,y[X]=X+.5,D[X]=o-Re*r*K}if(e.globalCompositeOperation="source-over",i>=1){let[X,pe,Re]=m;e.beginPath(),e.moveTo(0,o);for(let Fe=0;Fe<n;Fe++)e.lineTo(y[Fe],D[Fe]);e.lineTo(n,o),e.closePath();let ge=e.createLinearGradient(0,o-r,0,o);ge.addColorStop(0,`rgba(${X},${pe},${Re},0.12)`),ge.addColorStop(.7,`rgba(${X},${pe},${Re},0.04)`),ge.addColorStop(1,`rgba(${X},${pe},${Re},0)`),e.fillStyle=ge,e.globalAlpha=1,e.fill()}if(Cd(e,y,D,B,n,Math.max(2.2,Math.min(4,r*.04)),s,l,m,.45),Cd(e,y,D,B,n,Math.max(1,Math.min(1.8,r*.016)),s,l,m,1),i===2){let X=new Float32Array(n);for(let pe=0;pe<n;pe++)X[pe]=o+(o-D[pe]);Cd(e,y,X,B,n,Math.max(.9,r*.014),s,l,m,.55)}e.globalAlpha=1,e.globalCompositeOperation="source-over"}function Md(e,t){let{ctx:n,canvas:o,scratch:r,scratchCtx:i,bins:s}=e,l=o.width,m=o.height,d=Math.max(.15,Math.min(.97,t.persistence)),y=Math.round(t.mode),D=typeof t.colorLo=="string"?uo(t.colorLo,Qc):t.colorLo??Qc,B=typeof t.colorMid=="string"?uo(t.colorMid,Zc):t.colorMid??Zc,O=typeof t.colorHi=="string"?uo(t.colorHi,Jc):t.colorHi??Jc,K=m*Math.max(.55,Math.min(.96,t.positionY)),X=m*Math.max(.2,Math.min(.55,t.scale*.85)),pe=Math.max(7,Math.round(m*(.016+(1-d)*.014)));n.setTransform(1,0,0,1,0,0),i.setTransform(1,0,0,1,0,0),i.globalCompositeOperation="copy",i.drawImage(o,0,0),i.globalCompositeOperation="source-over",n.globalCompositeOperation="source-over",n.globalAlpha=1,n.fillStyle="#000",n.fillRect(0,0,l,m);let Re=.82+d*.16;n.globalAlpha=Re,n.drawImage(r,0,-pe),n.globalAlpha=1;let ge=Math.max(16,m*.12),Fe=n.createLinearGradient(0,0,0,ge);Fe.addColorStop(0,"rgba(0,0,0,0.35)"),Fe.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=Fe,n.fillRect(0,0,l,ge),vk(n,s,l,K,X,y,D,B,O)}function tv(e,t,n,o,r=12){if(!e?.tex||!t||t.lastUploadMs>0&&o-t.lastUploadMs<r)return!1;Md(t,n);let i=e.tex;typeof i.resize=="function"&&(i.width!==t.canvas.width||i.height!==t.canvas.height)&&i.resize(t.canvas.width,t.canvas.height);try{i.subimage(t.canvas)}catch{return!1}return t.lastUploadMs=o,!0}u();var Sk=960,wk=540,nv=['system-ui, -apple-system, "Segoe UI", sans-serif','ui-monospace, "SF Mono", "Cascadia Code", monospace','Impact, "Arial Narrow", Haettenschweiler, sans-serif','Georgia, "Times New Roman", serif','"Segoe UI Variable", "Segoe UI", "Trebuchet MS", sans-serif'];function ov(){return{animStartMs:0,lastMessage:"",lastAnim:-1,glitchPhase:0}}function rv(){let e=document.createElement("canvas");e.width=Sk,e.height=wk;let t=e.getContext("2d",{willReadFrequently:!0});if(!t)throw new Error("2d canvas unavailable");return{canvas:e,ctx:t,lastUploadMs:0}}function Tk(e){let t=Math.max(0,Math.min(1,e));return 1-Math.pow(1-t,3)}function Ck(e){let t=Math.max(.15,e.animSpeed),n=Math.round(e.anim);if(n===0||n===4)return 1;let o=n===3?2200/t:900/t;return Tk((e.nowMs-e.animStartMs)/o)}function Mk(e){let t=Math.max(.15,e.animSpeed),n=e.nowMs*.001*t*3.2;return .72+.28*Math.sin(n)}function Lk(e,t){let n=Math.max(.15,e.animSpeed),o=Math.sin(e.nowMs*.017*n+t*4.7+e.animStartMs*.003);return o>.55?(o-.55)*48:0}function kk(e){let t=Math.max(.15,e.animSpeed),n=Math.sin(e.nowMs*.031*t+e.animStartMs*.01);return n>.2?1:.35+.25*Math.max(0,n)}function Ld([e,t,n],o){return`rgba(${e},${t},${n},${Math.max(0,Math.min(1,o))})`}function av(e){let t=e?.message;return{message:typeof t=="string"&&t.trim()?t:"YOUR MESSAGE",size:Number(e?.size??.085),positionX:Number(e?.positionX??.5),positionY:Number(e?.positionY??.82),align:Math.round(Number(e?.align??1)),font:Math.round(Number(e?.font??0)),weight:Math.round(Number(e?.weight??1)),tracking:Number(e?.tracking??.02),color:uo(e?.color,[255,255,255]),glow:Number(e?.glow??.35),shadow:Number(e?.shadow??.5),anim:Math.round(Number(e?.anim??0)),animSpeed:Number(e?.animSpeed??.85)}}function eu(e,t){return{...av(e?.params),size:Zt("textLayer",e,"size",.085,t),positionX:Zt("textLayer",e,"positionX",.5,t),positionY:Zt("textLayer",e,"positionY",.82,t),tracking:Zt("textLayer",e,"tracking",.02,t),glow:Zt("textLayer",e,"glow",.35,t),shadow:Zt("textLayer",e,"shadow",.5,t),animSpeed:Zt("textLayer",e,"animSpeed",.85,t)}}function Rk(e,t){let n=Math.max(0,Math.min(1,t.amount));if(n<.004)return;let{ctx:o,canvas:r}=e,i=r.width,s=r.height;o.setTransform(1,0,0,1,0,0),o.clearRect(0,0,i,s);let l=av({message:t.message,size:t.size,positionX:t.positionX,positionY:t.positionY,align:t.align,font:t.font,weight:t.weight,tracking:t.tracking,color:`rgb(${t.color.join(",")})`,glow:t.glow,shadow:t.shadow,anim:t.anim,animSpeed:t.animSpeed}),m=l.anim,d=Ck({...t,...l}),y=n,D=0,B=1,O=l.message;if(m===1)y*=d;else if(m===2)y*=d,D=(1-d)*s*.06;else if(m===3){let ft=Math.floor(d*l.message.length);O=l.message.slice(0,Math.max(0,ft)),y*=Math.max(.35,d)}else m===4?(B=Mk({...t,...l}),y*=.85+.15*B):m===5&&(y*=kk({...t,...l}));if(y<.01||!O.trim())return;let K=Math.max(0,Math.min(nv.length-1,l.font)),X=Math.max(14,Math.min(s*.28,l.size*s)),pe=l.weight>=1?"700":"500";o.font=`${pe} ${X}px ${nv[K]}`,o.textBaseline="middle";let Re=Math.max(0,Math.min(2,l.align)),ge=["left","center","right"];o.textAlign=ge[Re];let Fe=O.split(`
`),Qe=X*1.22,Ze=Qe*Fe.length,dt=l.positionX*i,Et=l.positionY*s-Ze*.5+Qe*.5+D,at=l.tracking*X;"letterSpacing"in o&&(o.letterSpacing=`${at}px`);let nt=(ft,A,M,k)=>{let p=0;m===5&&(p=Lk({...t,...l},k)),l.shadow>.02&&(o.save(),o.globalAlpha=y*l.shadow*.85,o.fillStyle="rgba(0,0,0,0.92)",o.shadowColor="rgba(0,0,0,0.75)",o.shadowBlur=X*.12,o.shadowOffsetX=X*.03,o.shadowOffsetY=X*.04,o.fillText(ft,A+p,M),o.restore()),l.glow>.02&&(o.save(),o.globalAlpha=y*l.glow*.55,o.fillStyle=Ld(l.color,1),o.shadowColor=Ld(l.color,.95),o.shadowBlur=X*(.18+l.glow*.42),o.fillText(ft,A+p,M),o.restore()),o.save(),o.globalAlpha=y,o.fillStyle=Ld(l.color,1),m===4?(o.translate(A+p,M),o.scale(B,B),o.fillText(ft,0,0)):o.fillText(ft,A+p,M),o.restore()};for(let ft=0;ft<Fe.length;ft++)nt(Fe[ft],dt,Et+ft*Qe,ft)}function tu(e,t,n,o,r=16){if(!e?.tex||!t||t.lastUploadMs>0&&o-t.lastUploadMs<r)return!1;Rk(t,n);let i=e.tex;return typeof i.resize=="function"&&(i.width!==t.canvas.width||i.height!==t.canvas.height)&&i.resize(t.canvas.width,t.canvas.height),i.subimage(t.canvas),t.lastUploadMs=o,!0}u();function nu(){return{...ov(),prevEnvelope:0}}function iv(e){let{bundle:t,s3:n,bindState:o,fxCfg:r,bands:i,amount:s,now:l,envelope:m,binding:d,runtime:y,shouldBind:D}=e;if(!n?.tex||s<.004)return;let B=eu(r,i),O=B.message!==y.lastMessage,K=B.anim!==y.lastAnim,X=m>.02&&y.prevEnvelope<=.02;O||K||y.animStartMs<=0?(y.animStartMs=l,y.lastMessage=B.message,y.lastAnim=B.anim):jn(d)&&X&&(y.animStartMs=l),y.prevEnvelope=m,D&&ho(n,t.canvas,"textLayer",o),tu(n,t,{message:B.message,size:B.size,positionX:B.positionX,positionY:B.positionY,align:B.align,font:B.font,weight:B.weight,tracking:B.tracking,color:B.color,glow:B.glow,shadow:B.shadow,anim:B.anim,animSpeed:B.animSpeed,amount:s,nowMs:l,animStartMs:y.animStartMs},l,12)}u();function No(e,t,n,o){return Number.isFinite(e)?Math.max(t,Math.min(n,e)):o}function Qn(e,t,n){return e+(t-e)*n}function sv(e,t,n){let o=No((n-e)/Math.max(1e-6,t-e),0,1,0);return o*o*(3-2*o)}function Ak(e,t,n,o){let r=Number.isFinite(t)&&t>.05?t:1.7777777777777777,i,s;if(n!==void 0&&o!==void 0&&n>=160&&o>=90){i=Math.round(n),s=Math.round(o);let l=Math.max(i,s);if(l>4096){let m=4096/l;i=Math.max(160,Math.round(i*m)),s=Math.max(90,Math.round(s*m))}}else i=Math.min(4096,1920),s=Math.round(i/r),s>4096&&(s=4096,i=Math.round(s*r)),i=Math.max(160,i),s=Math.max(90,s);return(e.canvas.width!==i||e.canvas.height!==s)&&(e.canvas.width=i,e.buffer.width=i,e.canvas.height=s,e.buffer.height=s,e.lastUploadMs=0),{w:i,h:s}}function kd(){return{u:.04+Math.random()*.92,v:.04+Math.random()*.92,z:Math.random()*Qn(.22,.48,Math.random()),brightness:.45+Math.random()*.55,size:.55+Math.random()*.65,px:-9999,py:-9999}}function lv(e){if(typeof e!="string"||!/^#[0-9a-fA-F]{6}$/.test(e))return[0,232,204];let t=Number.parseInt(e.slice(1),16);return Number.isFinite(t)?[t>>16&255,t>>8&255,t&255]:[0,232,204]}function cv(){let e=document.createElement("canvas"),t=document.createElement("canvas");e.width=320,e.height=180,t.width=320,t.height=180;let n=e.getContext("2d",{willReadFrequently:!0}),o=t.getContext("2d",{willReadFrequently:!0});if(!n||!o)throw new Error("2d canvas unavailable");return{canvas:e,ctx:n,buffer:t,bufferCtx:o,stars:[],lastUploadMs:0}}function uv(e){let t=No(e,12,220,56);return Math.max(8,Math.min(462,Math.round(t*2.1)))}function Ek(e,t){let n=No(e,0,1.5,.48),o=No(t,0,1,.78);return No(n*Qn(.52,1.72,o),0,1.5,.48)}function Pk(e,t){let n=uv(t),{stars:o}=e;if(o.length!==n){if(o.length<n){for(let r=o.length;r<n;r++)o.push(kd());return}o.length=n}}function Rd(e,t,n){let o=uv(t),r=[];for(let l=0;l<o;l++)r.push(kd());e.stars=r,e.lastUploadMs=0;let{w:i,h:s}={w:e.canvas.width,h:e.canvas.height};e.ctx.fillStyle="#000",e.ctx.fillRect(0,0,i,s),e.bufferCtx.fillStyle="#000",e.bufferCtx.fillRect(0,0,i,s)}function Fk(e,t,n,o,r,i,s){let l=e.z,m=Qn(.2,.52,s),d=sv(0,m,l),y=1-sv(.86,1,l),D=d*y,B=e.u-t,O=e.v-n,K=1+l*l*Qn(.35,1.65,i),X=(t+B*K)*o,pe=(n+O*K)*r,Re=Qn(.18,.62,l)*Qn(.8,1.05,s);return{x:X,y:pe,fade:D,pointScale:Re}}function pv(e,t,n){let r=Ek(t.trail,t.amount??.78)/1.5,i=No(t.speed,0,8,1),s=No(t.glow,0,1,.72),l=No(t.fov,.25,2,1),m=No(t.depth,0,1,.65),d=No(t.density,12,220,52),y=No(t.centerX,0,1,.5),D=No(t.centerY,0,1,.5),B=Math.max(.001,Math.min(.05,t.dt)),[O,K,X]=t.tint;Pk(e,d);let{w:pe,h:Re}=Ak(e,n,t.pixelWidth,t.pixelHeight),ge=pe/512,Fe=y*pe,Qe=D*Re,Ze=No(t.amount??.78,0,1,.78),dt=B*i*Qn(.2,.72,m)*Qn(.88,1.28,Ze),Et=1+(6e-4+i*.0042)*r*Qn(.45,2.6,m),at=r<.007?1:1-r*Qn(.018,.075,1-r*.45),nt=r<.007?0:r*Qn(.72,.99,s),{ctx:ft,bufferCtx:A,buffer:M,canvas:k}=e;A.setTransform(1,0,0,1,0,0),A.globalCompositeOperation="source-over",A.globalAlpha=1,A.fillStyle=`rgba(0,0,0,${at.toFixed(4)})`,A.fillRect(0,0,pe,Re),r>.007&&nt>.01&&(A.save(),A.globalAlpha=nt,A.translate(Fe,Qe),A.scale(Et,Et),A.translate(-Fe,-Qe),A.drawImage(k,0,0,pe,Re),A.restore());let p=r>.03,re=Qn(.75,1,s),we=Qn(.55,1.85,r)*Qn(.75,1.15,s)*Qn(1,1.35,i/8)*ge,Ye=.52;for(let ze=0;ze<e.stars.length;ze++){let Ne=e.stars[ze];Ne.z+=dt*Qn(.85,1.15,Ne.size),Ne.z>=1&&Object.assign(Ne,kd());let{x:qe,y:Je,fade:Ht,pointScale:et}=Fk(Ne,y,D,pe,Re,l,m),Dt=Ne.brightness*re*Ht;if(Dt<.004)continue;p&&Ne.px>-9e3&&Ht>.08&&(A.strokeStyle=`rgba(${O},${K},${X},${(Dt*Qn(.3,.88,r)*s).toFixed(3)})`,A.lineWidth=we*Ne.size*et*Ye,A.lineCap="round",A.beginPath(),A.moveTo(Ne.px,Ne.py),A.lineTo(qe,Je),A.stroke());let gt=Qn(.22,.62,Ne.size)*et*Qn(.82,1.02,s)*ge*Ye;s>.08&&Ht>.08&&(A.fillStyle=`rgba(${O},${K},${X},${(Dt*s*.62).toFixed(3)})`,A.beginPath(),A.arc(qe,Je,gt*Qn(2.8,5.5,s),0,Math.PI*2),A.fill()),A.fillStyle=`rgba(255,255,255,${Dt.toFixed(3)})`,A.beginPath(),A.arc(qe,Je,gt,0,Math.PI*2),A.fill(),Ne.px=qe,Ne.py=Je}ft.setTransform(1,0,0,1,0,0),ft.globalCompositeOperation="source-over",ft.globalAlpha=1,ft.drawImage(M,0,0,pe,Re),e.lastUploadMs=0}function Ad(e,t,n,o,r,i=0){if(!e?.tex||r-t.lastUploadMs<i)return!1;pv(t,n,o);let s=e.tex;return(s.width!==t.canvas.width||s.height!==t.canvas.height)&&s.resize?.(t.canvas.width,t.canvas.height),s.subimage(t.canvas),t.lastUploadMs=r,!0}u();function mv(e,t,n){let o="throughTheStars";return{density:Zt(o,e,"density",56,t),speed:Zt(o,e,"speed",1.15,t),trail:Zt(o,e,"trail",.48,t),glow:Zt(o,e,"glow",.74,t),fov:Zt(o,e,"fov",1.05,t),depth:Zt(o,e,"depth",.65,t),centerX:Zt(o,e,"centerX",.5,t),centerY:Zt(o,e,"centerY",.5,t),tint:lv(e?.params?.tint),dt:n}}function dv(e){let{bundle:t,s3:n,bindState:o,fxCfg:r,bands:i,amount:s,dt:l,now:m,aspect:d,pixelWidth:y,pixelHeight:D,shouldBind:B=!0}=e;if(!n?.tex||s<=1e-5)return;B&&ho(n,t.canvas,"throughTheStars",o);let O={...mv(r,i,l),amount:s,pixelWidth:y,pixelHeight:D};Ad(n,t,O,d,m,0)}function fv(e){let{bundle:t,s3:n,bindState:o,fxCfg:r,bands:i,amount:s,aspect:l,now:m,pixelWidth:d,pixelHeight:y}=e;return!n?.tex||s<=1e-5?!1:(ho(n,t.canvas,"throughTheStars",o),t.lastUploadMs=0,Ad(n,t,{...mv(r,i,1/60),amount:s,pixelWidth:d,pixelHeight:y},l,m,0))}u();u();function hv(e,t){return .58+(1-Ho(e)*.22)*.4+Ho(t)*.32}function _v(e,t){if(t<=1e-4)return 1;let n=e/t;return n>=1?1:n<=0?0:n*n*(3-2*n)}function gv(e){return .22+Ho(e)*.78}function Ok(e){let t=(e%1+1)%1*6,n=Math.floor(t),o=t-n,r=1-o;switch(n){case 0:return[1,o,0];case 1:return[r,1,0];case 2:return[0,1,o];case 3:return[0,r,1];case 4:return[o,0,1];default:return[1,0,r]}}function bv(e,t,n,o,r){let i=Ho(o);if(i<.008)return{r:e,g:t,b:n};let[s,l,m]=Ok(r),d=i*.2,y=e*(1-d)+s*d,D=t*(1-d)+l*d,B=n*(1-d)+m*d,O=.299*e+.587*t+.114*n,K=.299*y+.587*D+.114*B;if(K<1e-5)return{r:y,g:D,b:B};let X=O/K;return{r:Math.min(1,y*X),g:Math.min(1,D*X),b:Math.min(1,B*X)}}function yv(e){return e>=.4?1:e<=0?0:e/.4}function Ed(e,t,n=.09){let o=Math.min(e,1-e),r=Math.min(t,1-t),i=Math.min(o,r);if(i>=n)return 1;if(i<=0)return 0;let s=i/n;return s*s*(3-2*s)}function xv(e){return .7+Ho(e)*.65}function vv(e,t,n){let o=.05+Ho(n)*.2;return!Number.isFinite(e)||e<0||Math.abs(e-t)>=o?!0:e<t*(.6+Ho(n)*.22)}function Sv(e,t,n,o,r){let i=Math.max(0,Math.min(o-1,Math.floor(t*o))),s=Math.max(0,Math.min(r-1,Math.floor(n*r)));return e[s*o+i]??0}function wv(e,t,n,o,r){return r*.9+e*.16+t*.1+n*.08+o*14e-5}var ou=.08,Hk=.82;function Tv(e,t){return Math.hypot(e-.5,t-.5)}function Cv(e,t,n,o){let r=(.18+Ho(n)*.24+Ho(o)*.16)*Math.max(0,t);return Math.min(Hk,Math.max(ou,e)+r)}function Mv(e,t,n,o=!1){if(!o&&t>n)return-1;let r=1-t/Math.max(n,1e-4);return Math.max(0,e)*(.42+r*.58)}var Qs=.86,Ik=.8;function Lv(e){return e>=Qs}function kv(e,t){return e>=Qs&&t<Ik}function Pd(e,t,n){if(e<=0||n<=0)return 0;let o=Math.round(e*(3.2+Ho(t)*3.4));return Math.min(n,Math.max(e,o))}var Bk=.16,Dk=.9;function Bi(e,t){let n=Math.max(0,Math.round(e)),o=Math.max(0,Math.round(t)),r=Math.max(80,Math.min(420,Math.round(n*Bk))),i=Math.max(0,n-r),s=Math.min(o,i),l=Math.max(0,o-i);return{reserveHold:r,baseCap:i,baseFree:Math.max(0,i-s),reserveFree:Math.max(0,r-l)}}function Rv(e,t){let n=Math.max(0,e);return Math.max(t*1.08,n*Dk,.78)}function Fd(e,t){return e>=t||e>=Qs}function Av(e,t,n,o,r,i){if(e<=0||i<=0)return 0;let s=Ho(n),l=Ho(r);if(t){let d=Math.round((28+l*110)*(.4+s*.75)*(.65+Ho(o)*.55));return Math.min(i,Math.max(8,d))}let m=Math.max(2,Math.round(e*.014*s*(.55+l*.7)));return Math.min(i,m)}function Ev(e,t,n,o,r){if(e<=0)return 0;let i=Math.max(0,o)+Math.max(0,r);if(i<=0)return 0;let s=Ho(n),l=t?Math.max(10,Math.round(e*.2*(.5+s))):Math.max(3,Math.round(e*.07*(.45+s)));return Math.min(i,l)}function Ho(e){return Number.isFinite(e)?Math.max(0,Math.min(1,e)):0}var Zs=4096,Nk=512,po=128,Wo=72,Wk=18e3,Ov=.95,Gk=.32,Uk=.64,zk=5;function gn(e,t,n,o){return Number.isFinite(e)?Math.max(t,Math.min(n,e)):o}function Vk(e){return gn(e,.4,1.8,1)}function Hv(e){return .32+gn(e,0,1,.65)*1.28}function $k(e){return Math.round(2500+gn(e,0,1,.5)*13500)}function qk(e){return .4+gn(e,0,1,.55)*.6}function jk(e){return Math.round(16-gn(e,0,1,.55)*8)}function Pv(e,t){let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)}function Iv(e,t,n){let o=n*.001,r=0,i=0,s=.55,l=e*5.5+o*.31,m=t*5.5+o*.27;for(let d=0;d<4;d++)r+=(Pv(l,m)-.5)*s,i+=(Pv(l+17.3,m+11.1)-.5)*s,l*=2.1,m*=2.1,s*=.5;return[r,i]}function Bv(e,t,n,o){let r=e-.5,i=t-.5,s=Math.hypot(r,i)+1e-4,l=r/s,m=i/s,d=-m,y=l,D=(e<.5?-1+e*2:(e-.5)*2)*(1-Math.abs(r)*1.6),B=(t<.5?-1+t*2:(t-.5)*2)*(1-Math.abs(i)*1.6),O=Math.sin(n*.0031+e*13.5+t*9.2+o)*.7+Math.cos(n*.0024-e*8.4+t*11.7+o*.61)*.3,K=.42+Math.min(s*1.8,.58);return[l*K+d*O*.92+D*.38,m*K+y*O*.92+B*.38]}function Xk(e,t,n,o,r){let i=Number.isFinite(t)&&t>.05?t:1.7777777777777777,s=gn(n,.35,1,.55),l,m;if(o!==void 0&&r!==void 0&&o>=160&&r>=90){l=Math.round(o*s),m=Math.round(r*s);let d=Math.max(l,m);if(d>Zs){let y=Zs/d;l=Math.max(160,Math.round(l*y)),m=Math.max(90,Math.round(m*y))}}else l=Math.min(Zs,1920),m=Math.round(l/i),m>Zs&&(m=Zs,l=Math.round(m*i)),l=Math.max(160,l),m=Math.max(90,m);return(e.canvas.width!==l||e.canvas.height!==m)&&(e.canvas.width=l,e.buffer.width=l,e.canvas.height=m,e.buffer.height=m,e.lastUploadMs=0),{w:l,h:m}}function Dv(){let e=document.createElement("canvas"),t=document.createElement("canvas"),n=document.createElement("canvas");e.width=320,e.height=180,t.width=320,t.height=180,n.width=po,n.height=Wo;let o=e.getContext("2d",{willReadFrequently:!0}),r=t.getContext("2d",{willReadFrequently:!0}),i=n.getContext("2d",{willReadFrequently:!0});if(!o||!r||!i)throw new Error("2d canvas unavailable");return{canvas:e,ctx:o,buffer:t,bufferCtx:r,sampleCanvas:n,sampleCtx:i,lumaData:null,particles:[],lastUploadMs:0,turbPhase:0,burstPhase:0,lastSampleMs:0,spreadRadius:ou,prevLuma:null}}function el(e){e.particles.length=0,e.lumaData=null,e.lastUploadMs=0,e.turbPhase=0,e.burstPhase=0,e.lastSampleMs=0,e.spreadRadius=ou,e.prevLuma=null;let{w:t,h:n}={w:e.canvas.width,h:e.canvas.height};e.ctx.fillStyle="#000",e.ctx.fillRect(0,0,t,n),e.bufferCtx.fillStyle="#000",e.bufferCtx.fillRect(0,0,t,n)}function Yk(e,t,n,o,r){if(!e.lumaData)r=!0;else if(!r||n-e.lastSampleMs<o)return!0;return!t||t.readyState<2||t.videoWidth<2?(e.lumaData=null,!1):(e.sampleCtx.drawImage(t,0,0,po,Wo),e.lumaData=e.sampleCtx.getImageData(0,0,po,Wo).data,e.lastSampleMs=n,!0)}function Kk(e){let t=po*Wo,n=new Float32Array(t),o=new Float32Array(t),r=new Float32Array(t),i=new Float32Array(t);for(let s=0;s<t;s++){let l=s*4,m=e[l]/255,d=e[l+1]/255,y=e[l+2]/255;n[s]=.299*m+.587*d+.114*y,o[s]=m,r[s]=d,i[s]=y}return{luma:n,cr:o,cg:r,cb:i}}function Qk(e){let t=0;for(let n=0;n<e.length;n+=4){let o=(.299*e[n]+.587*e[n+1]+.114*e[n+2])/255;o>t&&(t=o)}return Math.max(Gk,t*Uk)}function Zk(e,t){for(let r=0;r<e.particles.length;r++){let i=e.particles[r];if(!i.active)return i}let n=Math.min(Wk,Math.max(1500,t));if(e.particles.length>=n)return null;let o={active:!1,attached:!0,u:0,v:0,vx:0,vy:0,life:0,maxLife:1,age:0,seed:0,lightU:0,lightV:0,castLuma:0,size:Ov,r:1,g:1,b:1};return e.particles.push(o),o}function Js(e){let t=0;for(let n=0;n<e.particles.length;n++)e.particles[n].active&&t++;return t}function Jk(e){let t=new Uint8Array(po*Wo);for(let n=0;n<e.particles.length;n++){let o=e.particles[n];if(!o.active||!o.attached)continue;let r=Math.floor(o.v*Wo)*po+Math.floor(o.u*po);r>=0&&r<t.length&&(t[r]=Math.min(255,t[r]+1))}return t}function e3(e,t,n,o,r,i=!1){let s=Zk(e,r);s&&(s.active=!0,s.attached=!0,s.u=Math.max(.002,Math.min(.998,t.u+n)),s.v=Math.max(.002,Math.min(.998,t.v+o)),s.lightU=t.u,s.lightV=t.v,s.castLuma=t.luma,s.vx=0,s.vy=0,s.maxLife=12,s.life=s.maxLife,s.age=i?8:0,s.seed=Math.random(),s.size=Ov*(i?1.02+Math.random()*.28:.84+Math.random()*.32),s.r=t.r,s.g=t.g,s.b=t.b)}function t3(e,t,n,o,r,i,s){let l=[];for(let m=0;m<Wo;m++)for(let d=0;d<po;d++){let y=m*po+d,D=e.luma[y];if(D<n)continue;let B=Fd(D,i)?r:o;if(t[y]>=B)continue;let O=Tv((d+.5)/po,(m+.5)/Wo),K=Mv(D,O,s,Lv(D));K<0||l.push({px:d,py:m,idx:y,slots:B-t[y],score:K})}return l.sort((m,d)=>d.score-m.score),l}function n3(e,t,n,o){if(!t||t.length!==e.luma.length)return[];let r=[];for(let i=0;i<Wo;i++)for(let s=0;s<po;s++){let l=i*po+s;kv(e.luma[l],t[l])&&(n[l]>=o||r.push({px:s,py:i,idx:l,slots:o-n[l],score:e.luma[l]}))}return r.sort((i,s)=>s.score-i.score),r}function ru(e,t){(!e.prevLuma||e.prevLuma.length!==t.luma.length)&&(e.prevLuma=new Float32Array(t.luma.length)),e.prevLuma.set(t.luma)}function o3(e){let t=0;for(let n=0;n<e.luma.length;n++){let o=e.luma[n];o>t&&(t=o)}return t}function Fv(e,t,n,o){if(n<=0)return 0;let r=[];for(let s=0;s<e.particles.length;s++){let l=e.particles[s];if(!l.active||!l.attached||l.age<.28)continue;let m=Math.floor(l.v*Wo)*po+Math.floor(l.u*po),d=m>=0&&m<t.luma.length?t.luma[m]:0;d>=o||r.push({i:s,luma:d,age:l.age})}r.sort((s,l)=>s.luma-l.luma||l.age-s.age);let i=0;for(let s=0;s<r.length&&i<n;s++)e.particles[r[s].i].active=!1,i++;return i}function r3(e,t,n){let o=n*po+t;return{u:(t+.5)/po,v:(n+.5)/Wo,luma:e.luma[o],r:e.cr[o],g:e.cg[o],b:e.cb[o]}}function Od(e,t,n,o,r,i,s,l,m=!1){if(n.length===0||o<=0)return 0;let d=0,y=o;for(;y>0;){let D=!1;for(let B=0;B<n.length&&!(y<=0);B++){let O=n[B];if(O.slots<=0)continue;let K=r3(t,O.px,O.py),X=(Math.random()-.5)*i*.95,pe=(Math.random()-.5)*s*.95;e3(e,K,X,pe,l,m),O.slots--,r[O.idx]=(r[O.idx]??0)+1,d++,y--,D=!0}if(!D)break}return d}function a3(e,t,n,o,r,i,s){if(o<1e-4){ru(e,t);return}let l=$k(i),m=.3+gn(r,0,1,.55)*5.2;e.burstPhase+=s*m;let d=e.burstPhase>=1;d&&(e.burstPhase-=1),e.spreadRadius=Cv(e.spreadRadius,s,o,r);let y=Jk(e),D=1/po,B=1/Wo,O=o3(t),K=Rv(O,n),X=n3(t,e.prevLuma,y,5);if(X.length>0){let M=Bi(l,Js(e)),k=M.reserveFree+M.baseFree,p=Pd(X.length,o,Math.max(k,X.length*4));k<p&&(Fv(e,t,p-k,Qs),M=Bi(l,Js(e)),k=M.reserveFree+M.baseFree),Od(e,t,X,Pd(X.length,o,k),y,D,B,l,!0)}let pe=.32+o*(.22+r*.28);if(!d&&Math.random()>pe){ru(e,t);return}let Re=.55+gn(i,0,1,.5)*.9,ge=d?Math.max(1,Math.round((zk+Math.round(gn(r,0,1,.55)*4))*Re)):1,Fe=ge+2,Qe=d?n*(.93-gn(r,0,1,.55)*.08):n,Ze=t3(t,y,Qe,ge,Fe,K,e.spreadRadius);if(Ze.length===0){ru(e,t);return}let dt=[],Et=[];for(let M=0;M<Ze.length;M++){let k=Ze[M];Fd(t.luma[k.idx],K)?dt.push(k):Et.push(k)}let at=Bi(l,Js(e));dt.length>0&&at.reserveFree+at.baseFree<8&&(Fv(e,t,8,K),at=Bi(l,Js(e)));let nt=Av(Et.length,d,o,r,i,at.baseFree);Od(e,t,Et,nt,y,D,B,l);let ft=Bi(l,Js(e)),A=Ev(dt.length,d,o,ft.reserveFree,ft.baseFree);Od(e,t,dt,A,y,D,B,l),ru(e,t)}function i3(e,t,n,o){e.attached=!1;let r=gn(o,0,1,.45),[i,s]=Iv(e.u,e.v,t.turbPhase),[l,m]=Bv(e.u,e.v,t.turbPhase,e.u*97+e.v*53),d=r*n;e.vx=l*.1*d+i*25e-5*n,e.vy=m*.1*d+s*25e-5*n,e.maxLife=xv(r),e.life=e.maxLife}function s3(e,t,n,o){let r=gn(n.turbulence,0,1,.45),i=.4+(1-gn(n.detach,0,1,.26))*1.35,s=o*(3.2+r*4.8);e.turbPhase+=o*1e3;for(let l=0;l<e.particles.length;l++){let m=e.particles[l];if(!m.active)continue;if(m.age+=o,m.attached){let Re=Sv(t.luma,m.lightU,m.lightV,po,Wo);(vv(Re,m.castLuma,n.stick)||m.age>i)&&i3(m,e,n.amount,n.turbulence);continue}let[d,y]=Iv(m.u,m.v,e.turbPhase),[D,B]=Bv(m.u,m.v,e.turbPhase,l*17.3+m.u*41),O=r*n.amount,K=22e-5*n.amount*(.55+r*.7);m.vx+=d*K*o,m.vy+=y*K*o,m.vx+=(D*.0021+d*38e-5)*O*o,m.vy+=(B*.0021+y*38e-5)*O*o;let X=Ed(m.u,m.v),pe=.32+X*.68;m.u+=m.vx*s*pe,m.v+=m.vy*s*pe,m.life-=o*(.85+r*.2+(1-X)*1.4),(m.life<=0||m.u<0||m.u>1||m.v<0||m.v>1)&&(m.active=!1)}}function l3(e,t,n,o,r,i,s,l,m,d,y){if(r<.004)return;let D=Vk(s),B=Hv(l),O=gv(m),K=Math.max(.22,o.size*i*D*O),X=gn(l,0,1,.65)*.08,pe=bv(o.r,o.g,o.b,d,y),Re=Math.round(Math.min(255,(pe.r+X)*255)),ge=Math.round(Math.min(255,(pe.g+X)*255)),Fe=Math.round(Math.min(255,(pe.b+X)*255)),Qe=r*B*(o.attached?.9:.62),Ze=K*1.45;e.fillStyle=`rgba(${Re},${ge},${Fe},${(Qe*.16).toFixed(3)})`,e.fillRect(t-Ze,n-Ze,Ze*2,Ze*2),e.fillStyle=`rgba(${Re},${ge},${Fe},${Qe.toFixed(3)})`,e.fillRect(t-K,n-K,K*2,K*2)}function c3(e,t,n,o,r=performance.now()){if(n.amount<=1e-5)return;let i=Math.max(.001,Math.min(.05,n.dt)),s=qk(n.quality),l=jk(n.quality),{w:m,h:d}=Xk(e,o,s,n.pixelWidth,n.pixelHeight),y=m/Nk;if(!Yk(e,t,r,l,!n.skipVideoSample)||!e.lumaData)return;let B=e.lumaData,O=Qk(B),K=Kk(B);a3(e,K,O,n.amount,n.burst,n.density,i),s3(e,K,n,i);let X=gn(n.trail,0,1,.5)*1.15,pe=1-X*.052,Re=X*.92,{ctx:ge,bufferCtx:Fe,buffer:Qe,canvas:Ze}=e;Fe.setTransform(1,0,0,1,0,0),Fe.globalCompositeOperation="source-over",Fe.globalAlpha=1,Fe.drawImage(Ze,0,0,m,d),Fe.globalAlpha=pe,Fe.fillStyle="#000",Fe.fillRect(0,0,m,d),Fe.globalAlpha=1;let dt=Hv(n.brightness),Et=gn(n.spectral,0,1,.52);for(let at=0;at<e.particles.length;at++){let nt=e.particles[at];if(!nt.active)continue;let ft=_v(nt.age,hv(n.burst,nt.seed)),A=nt.attached?1:yv(nt.life/nt.maxLife),M=nt.attached?1:Ed(nt.u,nt.v),k=ft*A*M*n.amount*dt*(nt.attached?.96:.55+Re*.38),p=wv(nt.u,nt.v,nt.age,e.turbPhase,nt.seed);l3(Fe,nt.u*m,nt.v*d,nt,k,y,n.size,n.brightness,ft,Et,p)}ge.setTransform(1,0,0,1,0,0),ge.globalCompositeOperation="source-over",ge.globalAlpha=1,ge.drawImage(Qe,0,0,m,d),e.lastUploadMs=0}function Id(e,t,n){return{amount:gn(t,0,1,.8),stick:gn(Number(e?.stick??.65),0,1,.65),detach:gn(Number(e?.detach??.26),0,1,.26),burst:gn(Number(e?.burst??.58),0,1,.58),turbulence:gn(Number(e?.turbulence??.48),0,1,.48),size:gn(Number(e?.size??1),.4,1.8,1),brightness:gn(Number(e?.brightness??.68),0,1,.68),spectral:gn(Number(e?.spectral??.52),0,1,.52),density:gn(Number(e?.density??.5),0,1,.5),quality:gn(Number(e?.quality??.55),0,1,.55),trail:gn(Number(e?.trail??.5),0,1,.5),skipVideoSample:!1,dt:n}}function Bd(e,t,n,o,r,i,s=0){if(!e?.tex||i-t.lastUploadMs<s)return!1;c3(t,n,o,r,i);let l=e.tex;return(l.width!==t.canvas.width||l.height!==t.canvas.height)&&l.resize?.(t.canvas.width,t.canvas.height),l.subimage(t.canvas),t.lastUploadMs=i,!0}u();function Nv(e){let{bundle:t,s3:n,bindState:o,video:r,params:i,amount:s,dt:l,now:m,aspect:d,pixelWidth:y,pixelHeight:D,shouldBind:B=!0,skipVideoSample:O=!1}=e;!n?.tex||s<=1e-5||(B&&ho(n,t.canvas,"lumaDust",o),Bd(n,t,r,{...Id(i,s,l),pixelWidth:y,pixelHeight:D,skipVideoSample:O},d,m,0))}function Wv(e){let{bundle:t,s3:n,bindState:o,video:r,params:i,amount:s,aspect:l,now:m,pixelWidth:d,pixelHeight:y}=e;return!n?.tex||s<=1e-5?!1:(ho(n,t.canvas,"lumaDust",o),t.lastUploadMs=0,Bd(n,t,r,{...Id(i,s,1/60),pixelWidth:d,pixelHeight:y},l,m,0))}u();var Uv=1920,zv=1080,Gv=2560,Di=48,Ni=27,Nd=5,u3=[255,42,42],p3=[255,176,32];function wo(e,t,n,o){return Number.isFinite(e)?Math.max(t,Math.min(n,e)):o}function Wd(e,t,n){return{amount:wo(t,0,1,0),count:Math.round(wo(Number(e?.count),1,Nd,3)),threshold:wo(Number(e?.threshold),0,1,.42),smooth:wo(Number(e?.smooth),0,1,.76),size:wo(Number(e?.size),.4,2.2,1),links:wo(Number(e?.links),0,1,.7),color:uo(e?.color,u3),labelColor:uo(e?.labelColor,p3),dt:Number.isFinite(n)?Math.max(.001,Math.min(.08,n)):1/60,skipVideoSample:!1}}function m3(e,t){let n=Math.round(wo(e,0,1,0)*999),o=Math.round(wo(t,0,1,0)*999);return`x: ${n} y: ${o}`}function d3(e,t){let n=.028+wo(e,0,1,.76)*.4;return 1-Math.exp(-Math.max(t,1/240)/n)}function f3(e,t,n){let o=new Float32Array(t*n);for(let r=0;r<o.length;r++){let i=r*4;o[r]=(.2126*e[i]+.7152*e[i+1]+.0722*e[i+2])/255}return o}function h3(e,t,n,o,r,i){let s=Math.max(.12,i*.55),l=0,m=0;for(;o+l+1<t&&e[r*t+o+l+1]>=s;)l++;for(;o-l-1>=0&&e[r*t+o-l-1]>=s;)l++;for(;r+m+1<n&&e[(r+m+1)*t+o]>=s;)m++;for(;r-m-1>=0&&e[(r-m-1)*t+o]>=s;)m++;let d=Math.max(l,m,1);return wo((d*2+1)/Math.max(t,n),.045,.28,.09)}function _3(e,t,n,o,r){let i=Math.round(wo(o,1,Nd,3)),s=wo(r,0,1,.42),l=Math.max(.08,s*.45),m=[];for(let D=1;D<n-1;D++)for(let B=1;B<t-1;B++){let O=D*t+B,K=e[O];if(K<l)continue;let X=!0;for(let pe=-1;pe<=1&&X;pe++)for(let Re=-1;Re<=1;Re++)Re===0&&pe===0||e[(D+pe)*t+(B+Re)]>K&&(X=!1);X&&m.push({i:O,luma:K})}m.sort((D,B)=>B.luma-D.luma);let d=.14,y=[];for(let D of m){if(y.length>=i)break;let B=D.i%t,O=Math.floor(D.i/t),K=(B+.5)/t,X=(O+.5)/n;D.luma<s&&y.length>0||y.some(Re=>Math.hypot(Re.u-K,Re.v-X)<d)||y.push({u:K,v:X,size:h3(e,t,n,B,O,D.luma),luma:D.luma})}return y}var g3=[{u:.42,v:.48,size:.1,luma:.82},{u:.61,v:.36,size:.075,luma:.7},{u:.52,v:.64,size:.068,luma:.64},{u:.28,v:.3,size:.055,luma:.52},{u:.74,v:.58,size:.05,luma:.48}];function b3(e,t,n,o,r,i){let s=Math.round(wo(n,1,Nd,3)),l=d3(o,r),m=Math.min(1,r*4.2),d=Math.min(1,r*2.4),y=new Set,D=[],B=e.toSorted((O,K)=>K.alpha-O.alpha);for(let O of B){let K=-1,X=.22;for(let pe=0;pe<t.length;pe++){if(y.has(pe))continue;let Re=t[pe],ge=Math.hypot(O.u-Re.u,O.v-Re.v);ge<X&&(X=ge,K=pe)}if(K>=0){let pe=t[K];y.add(K),D.push({id:O.id,u:O.u+(pe.u-O.u)*l,v:O.v+(pe.v-O.v)*l,size:O.size+(pe.size-O.size)*l,luma:O.luma+(pe.luma-O.luma)*l,alpha:Math.min(1,O.alpha+m)})}else{let pe=Math.max(0,O.alpha-d);pe>.02&&D.push({...O,alpha:pe})}}for(let O=0;O<t.length&&D.length<s;O++){if(y.has(O))continue;let K=t[O];D.push({id:i.nextId++,u:K.u,v:K.v,size:K.size,luma:K.luma,alpha:m})}return D.slice(0,s)}function y3(e){let t=e.filter(o=>o.alpha>.02),n=[];for(let o=0;o<t.length;o++)for(let r=o+1;r<t.length;r++)n.push([t[o],t[r]]);return n}function x3(e,t,n){let o=Uv,r=zv;if(t!==void 0&&n!==void 0&&t>=640&&n>=360){o=Math.round(t),r=Math.round(n);let i=Math.max(o,r);if(i>Gv){let s=Gv/i;o=Math.max(640,Math.round(o*s)),r=Math.max(360,Math.round(r*s))}}(e.canvas.width!==o||e.canvas.height!==r)&&(e.canvas.width=o,e.canvas.height=r)}function Vv(){let e=document.createElement("canvas");e.width=Uv,e.height=zv;let t=e.getContext("2d");if(!t)throw new Error("2d canvas unavailable");let n=document.createElement("canvas");n.width=Di,n.height=Ni;let o=n.getContext("2d",{willReadFrequently:!0});if(!o)throw new Error("2d canvas unavailable");return{canvas:e,ctx:t,sampleCanvas:n,sampleCtx:o,luma:new Float32Array(Di*Ni),hasSample:!1,tracks:[],nextId:1,lastUploadMs:0,lastSampleMs:0}}function Gd(e){e.tracks.length=0,e.hasSample=!1,e.lastUploadMs=0,e.lastSampleMs=0,e.ctx.setTransform(1,0,0,1,0,0),e.ctx.clearRect(0,0,e.canvas.width,e.canvas.height)}function v3(e,t,n,o){if(!o&&e.hasSample&&n-e.lastSampleMs<50)return;if(!t||t.readyState<2||t.videoWidth<2){e.hasSample=!1;return}e.sampleCtx.drawImage(t,0,0,Di,Ni);let r=e.sampleCtx.getImageData(0,0,Di,Ni).data;e.luma=f3(r,Di,Ni),e.hasSample=!0,e.lastSampleMs=n}function Dd([e,t,n],o){return`rgba(${e},${t},${n},${Math.max(0,Math.min(1,o))})`}function S3(e,t){let{ctx:n,canvas:o}=e,r=o.width,i=o.height;n.setTransform(1,0,0,1,0,0),n.clearRect(0,0,r,i);let s=wo(t.amount,0,1,0);if(s<.004)return;let l=wo(t.size,.4,2.2,1),m=r/1920,d=Math.max(1.5,2.2*m),y=Math.max(18,Math.round(24*m)),D=Math.max(4,6*m),B=wo(t.links,0,1,0);if(n.lineJoin="miter",n.lineCap="round",n.textAlign="left",n.textBaseline="bottom",n.font=`600 ${y}px ui-monospace, "SF Mono", "Cascadia Code", monospace`,B>.004){n.setLineDash([8*m,6*m]),n.lineWidth=Math.max(1.1,1.4*m);for(let[O,K]of y3(e.tracks)){let X=s*B*Math.min(O.alpha,K.alpha);X<.02||(n.strokeStyle=Dd(t.color,X*.82),n.beginPath(),n.moveTo(O.u*r,O.v*i),n.lineTo(K.u*r,K.v*i),n.stroke())}n.setLineDash([])}for(let O of e.tracks){let K=s*O.alpha;if(K<.02)continue;let X=O.u*r,pe=O.v*i,Re=O.size*Math.min(r,i)*l*.5,ge=X-Re,Fe=pe-Re,Qe=Re*2;n.strokeStyle=Dd(t.color,K),n.lineWidth=d,n.strokeRect(ge+.5,Fe+.5,Qe,Qe),n.fillStyle=Dd(t.labelColor,K),n.fillText(m3(O.u,O.v),ge,Fe-D)}}function Ud(e,t,n,o,r,i=0){if(!e?.tex||o.amount<=1e-5||t.lastUploadMs>0&&r-t.lastUploadMs<i)return!1;x3(t,o.pixelWidth,o.pixelHeight),v3(t,n,r,!o.skipVideoSample);let s=t.hasSample?_3(t.luma,Di,Ni,o.count,o.threshold):g3.slice(0,o.count);t.tracks=b3(t.tracks,s,o.count,o.smooth,o.dt,t),S3(t,o);let l=e.tex;return typeof l.resize=="function"&&(l.width!==t.canvas.width||l.height!==t.canvas.height)&&l.resize(t.canvas.width,t.canvas.height),l.subimage(t.canvas),t.lastUploadMs=r,!0}u();function $v(e){let{bundle:t,s3:n,bindState:o,video:r,params:i,amount:s,dt:l,now:m,shouldBind:d=!0,skipVideoSample:y=!1,pixelWidth:D,pixelHeight:B}=e;!n?.tex||s<=1e-5||(d&&ho(n,t.canvas,"lumaLock",o),Ud(n,t,r,{...Wd(i,s,l),skipVideoSample:y,pixelWidth:D,pixelHeight:B},m,0))}function qv(e){let{bundle:t,s3:n,bindState:o,video:r,params:i,amount:s,now:l,pixelWidth:m,pixelHeight:d}=e;return!n?.tex||s<=1e-5?!1:(ho(n,t.canvas,"lumaLock",o),t.lastUploadMs=0,Ud(n,t,r,{...Wd(i,s,1/60),pixelWidth:m,pixelHeight:d},l,0))}u();function jv(e){return Math.round(e)>=1}function w3(e,t,n){typeof e.resize=="function"&&(e.width===t&&e.height===n||e.resize(t,n))}function Xv(){let e=document.createElement("canvas");e.width=2,e.height=2;let t=e.getContext("2d",{willReadFrequently:!0});if(!t)throw new Error("2d canvas unavailable");return{canvas:e,ctx:t,lastUpdateMs:0,lastPath:""}}function T3(e,t){let n=Math.max(e,t),o=n>256?256/n:1;return{w:Math.max(2,Math.round(e*o)),h:Math.max(2,Math.round(t*o))}}function C3(e,t){let n=t.videoWidth,o=t.videoHeight;if(!n||!o)return!1;let{w:r,h:i}=T3(n,o);return(e.canvas.width!==r||e.canvas.height!==i)&&(e.canvas.width=r,e.canvas.height=i),e.ctx.setTransform(1,0,0,1,0,0),e.ctx.drawImage(t,0,0,r,i),!0}function Yv(e,t,n,o){if(!e?.tex||!n||!t||t.videoWidth<=0||!(o.force||n.lastPath!==o.videoPath)||!C3(n,t))return!1;let i=e.tex;w3(i,n.canvas.width,n.canvas.height);try{i.subimage(n.canvas)}catch{return!1}return n.lastUpdateMs=o.now,n.lastPath=o.videoPath,!0}u();function Kv(){return{prevEnvelope:0,prevBand:0,followCooldownMs:0}}function Qv(e){let{bundle:t,s3:n,bindState:o,params:r,spawn:i,draw:s,dt:l,now:m,aspect:d,envelope:y,binding:D,bands:B,runtime:O,shouldBind:K=!0}=e;if(n?.tex){if(K&&ho(n,t.canvas,"neonGrid",o),jn(D))O.prevBand=0;else{let X=Mr(D.source,B,D.depth),pe=X>.35&&O.prevBand<=.35;O.followCooldownMs=Math.max(0,O.followCooldownMs-l*1e3),(pe||X>.55&&O.followCooldownMs<=0)&&(Ii(t,i),O.followCooldownMs=120),O.prevBand=X}O.prevEnvelope=y,qx(t,l,s.decay),Td(n,t,{...s,dt:l,colors:wd(r)},d,m,K?0:999999)}}function Zv(e,t){e.lines=[];let n=Math.max(3,Math.round(t.spawn));Ii(e,{...t,spawn:n,horizontal:1,vertical:0}),Ii(e,{...t,spawn:n,horizontal:0,vertical:1}),e.lastUploadMs=0}function Jv(e){let{bundle:t,s3:n,bindState:o,params:r,draw:i,aspect:s,now:l}=e;return!n?.tex||t.lines.length===0?!1:(ho(n,t.canvas,"neonGrid",o),t.lastUploadMs=0,Td(n,t,{...i,dt:0,colors:wd(r)},s,l,0))}function e2(e){let{settingsRef:t,backingWidth:n,backingHeight:o,oscilloscopeBundleRef:r,neonGridBundleRef:i,textLayerBundleRef:s,throughTheStarsBundleRef:l,lumaDustBundleRef:m,lumaLockBundleRef:d,metalEnvBundleRef:y,s3OverlayBindRef:D,textLayerRuntimeRef:B,oscilloscopeBridgeReadyRef:O,neonGridBridgeReadyRef:K,textLayerBridgeReadyRef:X,throughTheStarsBridgeReadyRef:pe,lumaDustBridgeReadyRef:Re,lumaLockBridgeReadyRef:ge,metalEnvBridgeReadyRef:Fe,neonGridWasEnabledRef:Qe,textLayerWasEnabledRef:Ze,throughTheStarsWasEnabledRef:dt,lumaDustWasEnabledRef:Et,lumaLockWasEnabledRef:at}=e;if(co("neonGrid"))try{let nt=Kx();r.current=nt,ie().oscilloscopeWaveformBundle=nt;let ft=$x();i.current=ft,K.current=!0;let A=rv();s.current=A,X.current=!0;let M=cv();l.current=M,pe.current=!0;let k=Dv();m.current=k,Re.current=!0;let p=Vv();d.current=p,ge.current=!0,Fa("neonGrid",ft.canvas,D.current),Fa("textLayer",A.canvas,D.current),Fa("throughTheStars",M.canvas,D.current),Fa("lumaDust",k.canvas,D.current),Fa("lumaLock",p.canvas,D.current),Fa("oscilloscope",nt.canvas,D.current);for(let Dt=0;Dt<36;Dt++){let gt=.85+.15*Math.sin(Dt*.45);for(let bt=0;bt<nt.bins.length;bt++){let Pt=bt/Math.max(1,nt.bins.length-1);nt.bins[bt]=(Math.exp(-Math.pow((Pt-.14)/.1,2))*.7+Math.exp(-Math.pow((Pt-.42)/.16,2))*.45+Math.exp(-Math.pow((Pt-.72)/.14,2))*.28)*gt}Md(nt,{persistence:.72,positionY:.88,scale:.55,mode:0,colorLo:"#1c3cff",colorMid:"#ff9a1a",colorHi:"#fff6c8"})}nt.lastUploadMs=-999,ft.lastUploadMs=-999,O.current=!0;let re=Xv();y.current=re,Fe.current=!0;let we=ko(t.current,"neonGrid")?.config;if(we){let Dt=Ks(we.params);Zv(ft,Dt),Jv({bundle:ft,s3:co("neonGrid"),bindState:D.current,params:we.params,draw:Kc(we.params),aspect:window.innerWidth/Math.max(1,window.innerHeight),now:performance.now()}),Qe.current=!0}let Ye=ko(t.current,"textLayer")?.config;if(Ye){let Dt=eu(Ye,ie().customBands);B.current=nu(),B.current.animStartMs=performance.now(),B.current.lastMessage=Dt.message,B.current.lastAnim=Dt.anim,tu(co("textLayer"),A,{...Dt,amount:Ye.base??.92,nowMs:performance.now(),animStartMs:B.current.animStartMs},performance.now(),0),Ze.current=!0}let ze=ko(t.current,"throughTheStars"),Ne=ze?.config;Ne&&(Rd(M,Number(Ne.params?.density??56),Number(Ne.params?.depth??.65)),fv({bundle:M,s3:co("throughTheStars"),bindState:D.current,fxCfg:Ne,bands:ie().customBands,amount:_n(ze.effectKey,Ne,ie().customBands,Xn),aspect:window.innerWidth/Math.max(1,window.innerHeight),now:performance.now(),pixelWidth:n,pixelHeight:o}),dt.current=!0);let qe=ko(t.current,"lumaDust"),Je=qe?.config;Je&&(el(k),Wv({bundle:k,s3:co("lumaDust"),bindState:D.current,video:ie().s0?.src,params:Je.params,amount:_n(qe.effectKey,Je,ie().customBands,Xn),aspect:window.innerWidth/Math.max(1,window.innerHeight),now:performance.now(),pixelWidth:n,pixelHeight:o}),Et.current=!0);let Ht=ko(t.current,"lumaLock"),et=Ht?.config;et&&(Gd(p),qv({bundle:p,s3:co("lumaLock"),bindState:D.current,video:ie().s0?.src,params:et.params,amount:_n(Ht.effectKey,et,ie().customBands,Xn),now:performance.now(),pixelWidth:n,pixelHeight:o}),at.current=!0)}catch{Fe.current=!1,O.current=!1,K.current=!1,X.current=!1,pe.current=!1,Re.current=!1,ge.current=!1}}u();u();u();function tl(e,t){e&&(e.speed=t),ie().speed=t}u();function M3(e,t,n){return e>n&&t<=n}function t2(){return{prevBands:{},stemHitsSeen:new Set,counts:{},envelopes:{},shapeOriginMs:{},queues:{},anims:{}}}function n2(e){e.prevBands={},e.stemHitsSeen.clear(),e.counts={},e.envelopes={},e.shapeOriginMs={},e.queues={},e.anims={}}function o2(e){if(Object.keys(e.anims).length>0)return!0;for(let t in e.queues){let n=e.queues[t];if(n&&n.length>0)return!0}return!1}function au(e,t,n,o,r){let{attack:i,release:s,decay:l,hold:m}=o,d=o.easeShape??wa;e.shapeOriginMs[t]=n-Math.max(0,r)*1e3,i>0?(e.anims[t]={kind:"attack",t0:n,attack:i,release:s,decay:l,hold:m,easeShape:d},e.envelopes[t]=0):m>0?(e.anims[t]={kind:"hold",t0:n,duration:m,release:s,decay:l,easeShape:d},e.envelopes[t]=1):s>0?(e.anims[t]={kind:"release_ease",t0:n,duration:s,easeShape:d},e.envelopes[t]=1):(e.anims[t]={kind:"release_linear",decay:l},e.envelopes[t]=1)}function L3(e,t,n,o){let r=e.anims[t];if(r){if(r.kind==="attack"){let i=(n-r.t0)/1e3,s=r.attack>0?i/r.attack:1,l=Math.max(0,Math.min(1,s));e.envelopes[t]=gp(l),s>=1&&(e.envelopes[t]=1,r.hold>0?e.anims[t]={kind:"hold",t0:n,duration:r.hold,release:r.release,decay:r.decay,easeShape:r.easeShape}:r.release>0?e.anims[t]={kind:"release_ease",t0:n,duration:r.release,easeShape:r.easeShape}:e.anims[t]={kind:"release_linear",decay:r.decay})}else if(r.kind==="hold")e.envelopes[t]=1,(n-r.t0)/1e3>=r.duration&&(r.release>0?e.anims[t]={kind:"release_ease",t0:n,duration:r.release,easeShape:r.easeShape}:e.anims[t]={kind:"release_linear",decay:r.decay});else if(r.kind==="release_ease"){let i=(n-r.t0)/1e3,s=r.duration>0?i/r.duration:1,l=Math.max(0,Math.min(1,s));e.envelopes[t]=Fh(r.easeShape??wa,l),s>=1&&(e.envelopes[t]=0,delete e.anims[t],delete e.shapeOriginMs[t])}else if(r.kind==="release_linear"){let i=e.envelopes[t]||0;e.envelopes[t]=Math.max(0,i-o*r.decay),(e.envelopes[t]||0)<=0&&(e.envelopes[t]=0,delete e.anims[t],delete e.shapeOriginMs[t])}}}function k3(e,t,n,o,r){let i=e.shapeOriginMs[t];if(i==null||!(!!e.anims[t]||(e.envelopes[t]??0)>1e-5))return;let l=ui(o.delay,r.attack,r.hold,r.release,r.decay);return Math.max(0,Math.min(1,(n-i)/1e3/l))}function r2(e,t){let{key:n,bandVal:o,stemHits:r,trigger:i,envelope:s,nowMs:l,dt:m,onFire:d}=t,y=e.prevBands[n]||0,D=i.threshold??Se.triggerThreshold,B=i.count??Se.triggerCount,O=i.delay??Se.delay,K=r>0?r:M3(o,y,D)?1:0;for(let X=0;X<K;X++)e.counts[n]=(e.counts[n]||0)+1,e.counts[n]>=B&&(e.counts[n]=0,O>0?(e.queues[n]||(e.queues[n]=[]),e.queues[n].push(l+O*1e3)):(d?.(n),au(e,n,l,s,O)));if(e.queues[n]?.length)for(;e.queues[n][0]<=l&&(d?.(n),au(e,n,l,s,O),e.queues[n].shift(),!!e.queues[n]?.length););return L3(e,n,l,m),e.prevBands[n]=o,k3(e,n,l,i,s)}u();var a2=120,R3=140,A3=1,iu=[],E3=new Set,P3=new Map([...sr,...jo].map(e=>[e.key,e.label]));function F3(e){let[t,n]=e.split(":"),o=P3.get(t??e)??t??e;return n?`${o} \xB7 ${n}`:o}function i2(){for(let e of E3)e()}function s2(e){let t=e.wallMs??performance.now(),n=Math.max(0,Math.min(1,e.intensity??1)),o=iu[0];if(o&&o.channel===e.channel&&o.fxKey===e.fxKey&&t-o.wallMs<R3){o.repeat+=1,o.intensity=Math.max(o.intensity,n),o.wallMs=t,o.timeSec=e.timeSec,o.beat=e.beat,i2();return}iu.unshift({id:A3++,wallMs:t,timeSec:e.timeSec,beat:e.beat,channel:e.channel,intensity:n,fxKey:e.fxKey,fxLabel:e.fxLabel??(e.fxKey?F3(e.fxKey):void 0),repeat:1}),iu.length>a2&&(iu.length=a2),i2()}var lz=[{key:"all",label:"All"},{key:"kick",label:Cr("kick")},{key:"snare",label:Cr("snare")},{key:"hat",label:Cr("hat")},{key:"low",label:Cr("low")},{key:"mid",label:Cr("mid")},{key:"high",label:Cr("high")},{key:"beat",label:Cr("beat")},{key:"rhythm",label:Cr("rhythm")},{key:"fx",label:Cr("fx")}];u();u();function l2(e,t){let n=Math.max(1,t)/60;return e*n}u();function c2(e,t,n,o){return e&&t&&n.v0 instanceof HTMLVideoElement&&n.v1 instanceof HTMLVideoElement&&o!=null}function zd(e,t,n,o){if(e&&t.v0&&t.v1)return[t.v0,t.v1];let r=[];return n instanceof HTMLVideoElement&&r.push(n),o instanceof HTMLVideoElement&&o!==n&&r.push(o),r}function Vd(e,t,n){!e||!(t instanceof HTMLVideoElement)||!(n instanceof HTMLVideoElement)||(Wa(e.ctx0,e.c0,t),Wa(e.ctx1,e.c1,n))}function su(e){for(let t of e.frames0)t.close();for(let t of e.frames1)t.close();e.frames0.length=0,e.frames1.length=0}function $d(e){su(e.frames),e.active=!1,e.pendingTrigger=!1,e.phase="forward",e.segmentEnd0=0,e.captureAccum=0,e.capturePending=!1,e.reverseIdx=-1,e.completeAfterReverse=!1}function qd(e){su(e.frames),e.active=!0,e.pendingTrigger=!1,e.phase="forward",e.segmentEnd0=0,e.captureAccum=0,e.capturePending=!1,e.reverseIdx=-1,e.completeAfterReverse=!1}function Wa(e,t,n){let o=Math.max(2,n.videoWidth||2),r=Math.max(2,n.videoHeight||2);(t.width!==o||t.height!==r)&&(t.width=o,t.height=r),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,t.width,t.height),e.drawImage(n,0,0,t.width,t.height)}function jd(e,t,n){(t.width!==n.width||t.height!==n.height)&&(t.width=n.width,t.height=n.height),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,t.width,t.height),e.drawImage(n,0,0)}function u2(e,t,n){let o=1/Math.max(12,n);e.captureAccum+=t;let r=e.reverseIdx;for(;e.captureAccum>=o&&r>0;)e.captureAccum-=o,r-=1;return e.captureAccum>=o&&r===0?(e.captureAccum=0,e.reverseIdx=0,e.completeAfterReverse?(e.completeAfterReverse=!1,e.phase="forward",e.active=!1,{finished:!0,frameIdx:0,cycleDone:!0}):(e.phase="replay",{finished:!0,frameIdx:0,cycleDone:!1})):(e.reverseIdx=r,{finished:!1,frameIdx:r,cycleDone:!1})}function p2(e,t,n){let o=e.frames.frames0.length-1;if(o<0)return e.phase="forward",e.active=!1,e.reverseIdx=-1,e.captureAccum=0,e.completeAfterReverse=!1,{finished:!0,frameIdx:-1};let r=1/Math.max(12,n);e.captureAccum+=t;let i=e.reverseIdx;for(;e.captureAccum>=r&&i<o;)e.captureAccum-=r,i+=1;return e.captureAccum>=r&&i>=o?(e.captureAccum=0,e.reverseIdx=o,e.completeAfterReverse=!0,e.phase="reverse",{finished:!0,frameIdx:o}):(e.reverseIdx=i,{finished:!1,frameIdx:i})}async function m2(e,t,n,o){if(!(n.frames0.length>=o))try{let[r,i]=await Promise.all([createImageBitmap(e),createImageBitmap(t)]);n.frames0.push(r),n.frames1.push(i)}catch{}}u();function d2(e){return Math.max(.2,e)}function ua(e){return!!e?.active}u();var O3=jo.filter(e=>e.category==="Color & grade").map(e=>e.key),kz=new Set(O3);var H3=["videoSpeed","boomerang","jumpCut","stutterBack","clipPeek","zap","slowmo","accelerate","playbackCue"],Rz=new Set(H3);function f2(e){let{playing:t,force:n=!1,instantLoad:o=!1,loadedPath:r,transitionEnabled:i,boomerangEngaged:s}=e;return t&&!n&&!o&&r!=null&&r.length>0&&i&&!s}function h2(e,t){return e}u();u();var _2=0,Xd=1;function I3(e){let t=e?.sourceMode;return typeof t=="number"&&Number.isFinite(t)&&Math.round(t)===Xd?Xd:_2}function B3(e){return I3(e)===Xd}function D3(e){let t=e?.videoPath;return typeof t=="string"&&t.trim()?t.trim():void 0}function N3(e){let t=e?.videoIndex??1;return typeof t=="number"?t:Math.max(1,Number(t)||1)}function g2(e,t,n){if(e.length===0)return;let o=s=>{if(!s||!hn(s,t))return s;let l=e.findIndex(d=>hn(d.path,s)),m=e[(l+1)%e.length]?.path;return m&&!hn(m,t)?m:s};if(B3(n)){let s=D3(n);if(s){let l=e.find(m=>hn(m.path,s));return o(l?.path??s)}}let r=N3(n),i=Math.max(0,r-1)%e.length;return o(e[i]?.path)}u();u();var b2=4;function lu(e,t=2){let n=e?.eventCount;return typeof n=="number"&&Number.isFinite(n)?Math.max(1,Math.min(b2,Math.round(n))):Math.max(1,Math.min(b2,Math.round(t)))}function Yd(e,t){return`${e}${t}`}function y2(e,t){let n=e?.[Yd("frame",t)];return typeof n=="number"&&Number.isFinite(n)?Math.max(0,Math.round(n)):0}var x2=0,Kd=1;function W3(e){return`clipMode${e}`}function G3(e){return`clipPath${e}`}function U3(e,t){let n=e?.[W3(t)];return typeof n=="number"&&Number.isFinite(n)&&Math.round(n)===Kd?Kd:x2}function z3(e,t){return U3(e,t)===Kd}function V3(e,t){let n=e?.[G3(t)];return typeof n=="string"&&n.trim()?n.trim():void 0}function $3(e,t){let n=e?.[Yd("clip",t)]??t;return typeof n=="number"&&Number.isFinite(n)?Math.max(1,Math.round(n)):Math.max(1,Number(n)||t)}function cu(e,t,n){if(e.length===0)return null;if(z3(t,n)){let i=V3(t,n);if(i)return e.find(l=>hn(l.path,i))?.path??i}let o=$3(t,n),r=Math.max(0,Math.min(e.length-1,o-1));return e[r]?.path??null}u();u();function q3(e){if(!e)return null;try{return new URL(e,window.location.origin).pathname}catch{return null}}function Qd(e,t){if(!t)return!1;let n=e.currentSrc||e.src;if(!n)return!1;let o=q3(n);return o?hn(o,t):!1}function v2(e){return e.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA&&e.videoWidth>0}function S2(e,t){let n=e.duration,o=1/120,r=Math.max(0,t);Number.isFinite(n)&&n>0&&(r=e.loop?(r%n+n)%n:Math.min(r,n-o)),e.currentTime=r}var cr=null;function ef(e){return!!e&&typeof e=="object"&&"currentTime"in e&&Number.isFinite(e.currentTime)}function nl(e){return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement}function Jd(e){let t=e.play?.();t&&typeof t=="object"&&"catch"in t&&t.catch(()=>{})}function w2(e,t){if(nl(e)){S2(e,t);return}let n=e.duration,o=1/120,r=Math.max(0,t);Number.isFinite(n)&&n&&n>0&&(r=e.loop?(r%n+n)%n:Math.min(r,n-o)),e.currentTime=r}function j3(e){let t=ie();for(let n of["s0","s1"]){let o=t[n]?.src;ef(o)&&w2(o,e)}}function uu(e){ie().__hydraPendingPlaybackCueSeek=e}function pu(){let e=ie().__hydraPendingPlaybackCueSeek;return e==null||!Number.isFinite(e)?!1:(delete ie().__hydraPendingPlaybackCueSeek,j3(e),!0)}function Zd(e,t){let n=ie().s2?.src;if(ef(n)){if(nl(n)&&(n.muted=!0,n.loop=!0),w2(n,e),t){n.pause?.();return}Jd(n)}}function X3(e,t,n){let o=ie().s2;if(!o)return;let r=o.src;if(nl(r)&&Qd(r,e)&&v2(r)){Zd(t,n);return}o.initVideo?.(e);let i=o.src,s=typeof HTMLMediaElement<"u"?HTMLMediaElement.HAVE_CURRENT_DATA:2;if(nl(i)&&i.readyState<s){i.addEventListener("loadeddata",()=>Zd(t,n),{once:!0});return}Zd(t,n)}function T2(e){let t=cu(e.library,e.params,1),n=ie().s2?.src;if(t&&nl(n)&&Qd(n,t)){Jd(n);return}t?X3(t,0,!1):ef(n)&&Jd(n)}function mu(){return cr!=null}function C2(){return!!cr?.frozen}function M2(){return cr?.slot??1}function L2(e){if(!cr||(cr.remainingSec-=e,cr.remainingSec>0))return;let t=cr;cr=null,T2(t)}function tf(){if(!cr)return;let e=cr;cr=null,T2(e)}function k2(e,t,n=1){if(e.length===0)return null;let o=typeof t=="string"?t:"",r=e.findIndex(m=>hn(m.path,o)),s=((r>=0?r:0)+n+e.length)%e.length,l=e[s]?.path;return!l||hn(l,o)?null:l}var Y3=["playbackCue","layerBlend","videoMap","shatterLayer"];function ol(e){if(!e)return null;for(let t of Y3){let n=e[t];if(!(t==="shatterLayer"&&Math.round(Number(n?.params?.mode)||0)<1)&&n?.enabled)return{key:t,config:n}}return null}function R2(e,t,n,o){if(!(!n?.enabled||e.length===0))return o==="playbackCue"?cu(e,n.params,M2())??void 0:g2(e,t,n.params)}u();var fV=cm*1e3,Ga=120,hV=new Float32Array(0),_V=new Float32Array(Ga);function A2(e){let t=typeof window<"u"?window:null;if(!t)return;let n=t.__hydraVideoSpeedRing;(!n||n.capacity!==Ga||!n.times)&&(n={capacity:Ga,times:new Float32Array(Ga),data:new Float32Array(Ga),w:0,len:0},t.__hydraVideoSpeedRing=n);let o=performance.now();n.times[n.w]=o,n.data[n.w]=Number.isFinite(e)?e:1,n.w=(n.w+1)%Ga,n.len<Ga&&n.len++}u();u();function nf(e,t){let n=Math.max(1,Math.round(t)),o=[],r=typeof e.currentVideo=="string"?e.currentVideo:"",i=r,s=e.sceneVideoPaths?.filter(l=>typeof l=="string"&&l.length>0);for(let l=0;l<n;l++){let m=null;if(s&&s.length>0){let d=pm(i,s).next;m=d&&!hn(d,i)?d:null}else{let d=tc(e.filteredLibrary,i)??(i.length>0?i:"");m=k2(e.filteredLibrary,d,1)}if(!m||hn(m,r))break;o.push(m),i=m}return o}function E2(e,t){let n=nf(e,t);return n.length===0?null:n[n.length-1]??null}u();var of=!1,rf=!1,P2=!1;function du(e){of=e}function fu(e){rf=e}function af(){return of}function sf(){return rf}function rl(){return P2}function F2(){return of||rf||P2}function O2(e){typeof window>"u"||!e||(ie().__hydraTransportFallbackLoad=e)}function H2(e){if(typeof window>"u"||!e)return!1;let t=ie(),n=t.__hydraTransportFallbackLoad;return typeof n!="string"||!n||!hn(n,e)?!1:(delete t.__hydraTransportFallbackLoad,!0)}function hu(){typeof window>"u"||(window.__hydraInstantVideoLoad=!0)}function I2(){if(typeof window>"u")return!1;let e=window,t=!!e.__hydraInstantVideoLoad||af()||sf()||rl();return delete e.__hydraInstantVideoLoad,t}var K3=0;function Ua(e,t=4e3){K3=e?performance.now()+t:0}var Q3=.05,Z3=2,J3=1,eR=8;function lf(e){return Math.max(Q3,Math.min(Z3,e))}function cf(e){return Math.max(J3,Math.min(eR,Math.round(e)))}var Jo=null;function tR(){let e=ie();for(let t of["s0","s1"]){let n=e[t]?.src;if(n instanceof HTMLVideoElement&&Number.isFinite(n.currentTime))return n.currentTime}return 0}function B2(e,t){du(!1);let n=ie(),o=n.__hydraClipPeekVideo;if(o?.endPeek(t.returnPath,t.returnTimeSec)){n.__hydraClipPeekSkipLoad=t.returnPath,e.applyVideo(t.returnPath),o.preloadPath(t.peekPath);return}uu(t.returnTimeSec),e.applyVideo(t.returnPath)}function Wi(){return Jo!=null}function D2(){Jo=null,du(!1)}function N2(e,t,n){if(Jo||sf()||rl())return;let o=typeof e.currentVideo=="string"?e.currentVideo:"";if(!o)return;let r=cf(t),i=E2(e,r);if(!i)return;let s=tR(),l=ie(),m=l.__hydraClipPeekVideo,d=lf(n);if(Jo={returnPath:o,returnTimeSec:s,remainingSec:d,peekPath:i},du(!0),m?.beginPeek(i,o,s)){l.__hydraClipPeekSkipLoad=i,e.applyVideo(i);return}O2(i),e.applyVideo(i)}function W2(e,t){if(!Jo||(Jo.remainingSec-=t,Jo.remainingSec>0))return;let n=Jo;Jo=null,B2(e,n)}function uf(e){if(!Jo)return;let t=Jo;Jo=null,B2(e,t)}u();var Io=null,nR=2.5,oR=1,rR=8,aR=1,iR=12;function sR(e){return Math.max(oR,Math.min(rR,Math.round(e)))}function G2(e){return Math.max(aR,Math.min(iR,Math.round(e)))}function pf(){ie().__hydraApplyScene?.()}function lR(){let e=ie();for(let t of["s0","s1"]){let n=e[t]?.src;if(n instanceof HTMLVideoElement&&Number.isFinite(n.currentTime))return n.currentTime}return 0}function cR(e){let t=G2(e);return Math.max(1/24,t/24)}function U2(e,t){let n=t.paths[t.clipIndex];if(!n)return!1;let o=ie(),r=o.__hydraClipPeekVideo,i=r?.showZapClip(n)??"failed";if(i==="ready"){t.waitingLoad=!1,t.waitingLoadSec=0,t.clipRemainingSec=t.frameDurationSec,o.__hydraClipPeekSkipLoad=n,e.applyVideo(n),pf();let s=t.paths[t.clipIndex+1];return s&&r?.preloadPath(s),!0}return i==="loading"?(t.waitingLoad=!0,t.waitingLoadSec=0,t.clipRemainingSec=0,!0):(Io=null,z2(e,t),!1)}function mf(e,t){fu(!1);let n=ie(),o=n.__hydraClipPeekVideo;if(o?.endZap(t.returnPath,t.returnTimeSec)){n.__hydraClipPeekSkipLoad=t.returnPath,e.applyVideo(t.returnPath);let r=t.paths[0];r&&o.preloadPath(r);return}uu(t.returnTimeSec),e.applyVideo(t.returnPath)}function z2(e,t){ie().__hydraClipPeekVideo?.cancelZap?.(),hu(),mf(e,t)}function Gi(){return Io!=null}function V2(){Io=null,fu(!1),ie().__hydraClipPeekVideo?.cancelZap?.()}function $2(e,t,n){if(Io||af()||rl())return;let o=sR(t),r=G2(n),i=typeof e.currentVideo=="string"?e.currentVideo:"";if(!i)return;let s=nf(e,o);if(s.length===0)return;let l=lR(),d=ie().__hydraClipPeekVideo;d?.beginZap(i,l),d?.preloadPath(s[0]??null),Io={returnPath:i,returnTimeSec:l,paths:s,clipIndex:0,clipRemainingSec:0,waitingLoad:!0,waitingLoadSec:0,frameDurationSec:cR(r)},fu(!0),U2(e,Io)||(Io=null)}function q2(e,t){if(!Io)return;let n=Io,o=ie(),r=o.__hydraClipPeekVideo,i=n.paths[n.clipIndex];if(n.waitingLoad&&i){if(n.waitingLoadSec+=t,r?.completeZapClipLoad(i)){n.waitingLoad=!1,n.waitingLoadSec=0,n.clipRemainingSec=n.frameDurationSec,o.__hydraClipPeekSkipLoad=i,e.applyVideo(i),pf();let s=n.paths[n.clipIndex+1];s&&r.preloadPath(s)}else if(n.waitingLoadSec>=nR){let s={...n};Io=null,z2(e,s),pf()}return}if(n.clipRemainingSec-=t,!(n.clipRemainingSec>0)){if(n.clipIndex+=1,n.clipIndex>=n.paths.length){Io=null,mf(e,n);return}n.waitingLoad=!0,n.waitingLoadSec=0,n.clipRemainingSec=0,U2(e,n)}}function df(e){if(!Io)return;let t=Io;Io=null,mf(e,t)}u();function _u(e,t){if(!e||!Number.isFinite(t)||t===0)return;let n=e.duration;if(!Number.isFinite(n)||n<=0){e.currentTime=Math.max(0,e.currentTime+t);return}let o=1/120,r=e.currentTime+t;e.loop?r=(r%n+n)%n:r=Math.min(Math.max(0,r),n-o),e.currentTime=r}function ff(e,t){t>0&&_u(e,t)}function j2(e,t=24){return Math.max(1,Math.round(e))/t}function X2(e,t,n=24){return Math.max(1,Math.round(e))*Math.max(1,Math.round(t))/n}u();function Y2(e){return`${e.t}:${e.orbit}`}function uR(e,t){return`${e}|${t}`}function pR(e){let t=e.indexOf("|");return t===-1?e:e.slice(t+1)}function K2(e,t){return e?.length?e:t??[]}function Q2(e,t,n,o,r){if(!As(e)||!n?.length)return 0;let i=cc(e),s=lc(e),l=0;for(let m of n){if(m.bleed||i!=null&&m.orbit!==i||s!=null&&m.role!==s||m.v<=t)continue;let d=uR(r,Y2(m));o.has(d)||(o.add(d),l+=1)}return l}function Z2(e,t,n){let o=[...t??[],...n??[]];if(!o.length){e.clear();return}let r=new Set(o.filter(i=>!i.bleed).map(i=>Y2(i)));for(let i of e)r.has(pR(i))||e.delete(i)}u();function ur(e){e instanceof HTMLVideoElement&&e.paused&&e.play().catch(()=>{})}function To(e){e instanceof HTMLVideoElement&&!e.paused&&e.pause()}u();u();u();u();var J2=`class HexaOutputKeepaliveProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._n = 0;
  }

  process() {
    this._n += 1;
    // eslint-disable-next-line unicorn/require-post-message-target-origin -- MessagePort has no targetOrigin
    if ((this._n & 3) === 0) this.port.postMessage(0);
    return true;
  }
}

registerProcessor("hexa-output-keepalive", HexaOutputKeepaliveProcessor);
`;var mR="hexa-open-output";var dR=500,fR=800,hR=2500,_R=8,eS=["analyzer","automix","hydra"],za=null,gR=!1,sl=null;var oS=0,tS=0,hf=!1,Ui=[],bR="hexa-output-keepalive",kr=null,pa=null,gu=null,il=0,al=0;function gf(e,t){return e&&!t}function Vi(e=Date.now()){return sl&&!sl.closed?!0:e<=oS}function zi(){return typeof document>"u"||!Vi()?!1:document.hidden||!document.hasFocus()}function rS(e,t){let n=Ui.filter(o=>o.id!==e);return n.push({id:e,fn:t}),n.sort((o,r)=>{let i=eS.indexOf(o.id),s=eS.indexOf(r.id);return(i===-1?99:i)-(s===-1?99:s)}),Ui.length=0,Ui.push(...n),()=>{let o=Ui.findIndex(r=>r.id===e);o>=0&&Ui.splice(o,1)}}function aS(){oS=Date.now()+hR}function _f(e=!1){if(aS(),!e&&!zi()||hf)return;let t=performance.now();if(!(t-tS<_R)){tS=t,hf=!0;try{for(let n of Ui)n.fn()}finally{hf=!1}}}function yR(){return bf(),_f(!0),!0}function xR(){if(!gR||!za||typeof za.captureStream!="function")return null;try{return za.captureStream(60)}catch{return null}}var vR="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";function bf(){if(typeof document>"u")return;if(kr)kr.paused&&kr.play().catch(()=>{});else{let r=document.createElement("audio");r.src=vR,r.loop=!0,r.volume=.001,r.setAttribute("playsinline",""),r.setAttribute("aria-hidden","true"),r.play().catch(()=>{}),kr=r}if(pa){pa.resume().catch(()=>{});return}let e=window.AudioContext||window.webkitAudioContext;if(!e)return;let t=new e,n=t.createOscillator(),o=t.createGain();o.gain.value=1e-4,n.connect(o),o.connect(t.destination),n.start(),t.resume().catch(()=>{}),pa=t,SR(t,o),il||(il=window.setInterval(()=>{Vi()||wR()},2e3))}async function SR(e,t){let n=al,o=e.createGain();if(o.gain.value=0,e.audioWorklet){let i=URL.createObjectURL(new Blob([J2],{type:"application/javascript"}));try{if(await e.audioWorklet.addModule(i),n!==al||pa!==e)return;let s=new AudioWorkletNode(e,bR);s.port.addEventListener("message",()=>{zi()&&_f()}),o.connect(s),s.connect(t),gu=s;return}catch{if(n!==al||pa!==e)return}finally{URL.revokeObjectURL(i)}}if(n!==al||pa!==e)return;let r=e.createScriptProcessor(512,1,1);r.onaudioprocess=()=>{zi()&&_f()},o.connect(r),r.connect(t),gu=r}function wR(){al+=1,il&&(window.clearInterval(il),il=0),gu?.disconnect(),gu=null,pa?.close().catch(()=>{}),pa=null,kr&&(kr.pause(),kr.src="",kr=null)}var TR=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>SlopMotion output</title>
<style>
  html, body { margin: 0; background: #000; height: 100%; overflow: hidden; }
  canvas, video { display: block; width: 100%; height: 100%; object-fit: contain; background: #000; }
  #hexa-output-veil {
    position: absolute; inset: 0; background: #000; opacity: 1; pointer-events: none;
    transition: opacity ${fR}ms ease;
  }
  #hexa-output-veil.live { opacity: 0; }
  #hexa-output-mark {
    position: absolute; right: 3.5%; bottom: 5%;
    display: flex; align-items: center; gap: 10px; opacity: 0.7;
  }
  #hexa-output-mark svg { display: block; width: 36px; height: 36px; }
  #hexa-output-mark span {
    font: 500 12px/1 system-ui, sans-serif;
    letter-spacing: 0.32em; text-transform: uppercase;
    color: rgba(244, 239, 230, 0.88);
  }
</style>
</head>
<body>
<video id="hexa-output-video" autoplay muted playsinline></video>
<canvas id="hexa-output-canvas"></canvas>
<div id="hexa-output-veil">
  <div id="hexa-output-mark">
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M7 10.5c3.2-4.2 6.4-4.2 9.6 0s6.4 4.2 9.6 0" stroke="#22e0ff" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M7 16c3.2-3.2 6.4-3.2 9.6 0s6.4 3.2 9.6 0" stroke="#f4efe6" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
      <path d="M7 21.5c3.2-4.2 6.4-4.2 9.6 0s6.4 4.2 9.6 0" stroke="#22e0ff" stroke-width="2.4" stroke-linecap="round" opacity="0.85"/>
    </svg>
    <span>SlopMotion</span>
  </div>
</div>
<script>
const canvas = document.getElementById("hexa-output-canvas");
const video = document.getElementById("hexa-output-video");
const veil = document.getElementById("hexa-output-veil");
const ctx = canvas.getContext("2d", { alpha: false });
const bc = new BroadcastChannel("hexa-hydra-output");
var lastPulse = 0;
function markPulse() {
  lastPulse = performance.now();
  veil.classList.add("live");
}
function checkInterrupt() {
  if (!lastPulse) return;
  if (!openerLive() || performance.now() - lastPulse > ${dR}) veil.classList.remove("live");
}
video.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000";
canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:contain";
function openerLive() {
  return window.opener && !window.opener.closed;
}
function attachStream() {
  if (!openerLive() || !window.opener.__hexaCaptureStream) return false;
  try {
    var stream = window.opener.__hexaCaptureStream();
    if (!stream) return false;
    video.srcObject = stream;
    video.play().catch(function () {});
    canvas.style.display = "none";
    return true;
  } catch (e) {
    return false;
  }
}
function pumpOpener() {
  if (!openerLive() || typeof window.opener.__hexaPumpFromOutput !== "function") return false;
  try {
    window.opener.__hexaPumpFromOutput();
    return true;
  } catch (e) {
    return false;
  }
}
function displayPing() {
  var fs = Boolean(document.fullscreenElement)
    || (Math.abs(window.innerWidth - screen.width) < 8 && Math.abs(window.innerHeight - screen.height) < 8);
  return {
    type: "hexa-output-ready",
    screenWidth: screen.width,
    screenHeight: screen.height,
    dpr: window.devicePixelRatio || 1,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    fullscreen: fs
  };
}
function ping() {
  var payload = displayPing();
  bc.postMessage(payload);
  if (openerLive()) window.opener.postMessage(payload, "*");
}
function streamIsLive(src) {
  return src && typeof src.getTracks === "function" && src.getTracks().some(function (track) {
    return track.readyState === "live";
  });
}
function tickLoop() {
  requestAnimationFrame(tickLoop);
  if (!streamIsLive(video.srcObject)) attachStream();
  pumpOpener();
  checkInterrupt();
}
ping();
setInterval(ping, 500);
attachStream();
requestAnimationFrame(tickLoop);
window.addEventListener("resize", ping);
window.addEventListener("fullscreenchange", ping);
function paint(msg) {
  if (!msg) return;
  if (msg.type === "hexa-output-pulse") {
    markPulse();
    return;
  }
  if (msg.type !== "hexa-frame") return;
  markPulse();
  if (video.srcObject) return;
  if (canvas.width !== msg.w) canvas.width = msg.w;
  if (canvas.height !== msg.h) canvas.height = msg.h;
  const image = ctx.createImageData(msg.w, msg.h);
  image.data.set(new Uint8ClampedArray(msg.pixels));
  ctx.putImageData(image, 0, 0);
}
bc.addEventListener("message", (event) => paint(event.data));
window.addEventListener("message", (event) => paint(event.data));
<\/script>
</body>
</html>`;function CR(){let e=window;e.__hydraOpenOutput=iS,e.__hexaPumpFromOutput=yR,e.__hexaCaptureStream=xR,e.__hydraOutputDebug=()=>({src:za?{id:za.id,w:za.width,h:za.height}:null,win:!!(sl&&!sl.closed),keepalive:!!(kr&&!kr.paused)})}var nS;function MR(e){let t=window.__hexaOutputPlacement,n=e??nS??t;return e&&(nS=e),n}function iS(e){let t=MR(e),n=["popup=yes","toolbar=no","menubar=no","location=no","status=no","scrollbars=no"];t&&(Number.isFinite(t.left)&&n.push(`left=${Math.round(t.left)}`),Number.isFinite(t.top)&&n.push(`top=${Math.round(t.top)}`),Number.isFinite(t.width)&&n.push(`width=${Math.round(t.width)}`),Number.isFinite(t.height)&&n.push(`height=${Math.round(t.height)}`));let o=window.open("about:blank","hexa-output",n.join(","));if(!o)return console.warn("Output window was blocked. Press D in the live session."),null;sl=o,aS(),CR(),bf();try{o.document.open(),o.document.write(TR),o.document.close()}catch(r){console.warn("Could not write output player document",r)}if(t&&Number.isFinite(t.left)&&Number.isFinite(t.top))try{o.moveTo(Math.round(t.left),Math.round(t.top)),Number.isFinite(t.width)&&Number.isFinite(t.height)&&o.resizeTo(Math.round(t.width),Math.round(t.height))}catch{}return o}typeof window<"u"&&(window.addEventListener(mR,()=>{iS()}),document.addEventListener("visibilitychange",()=>{document.hidden&&Vi()&&bf()}));var $i=(e,t,n)=>{if(!(e instanceof HTMLVideoElement)||(e.paused||e.pause(),t<=0))return;let o=e.currentTime+t*n;e.duration&&(o<0?o=e.loop?e.duration+o%e.duration:0:o>=e.duration&&(o=e.loop?o%e.duration:e.duration)),e.currentTime=o},sS=(e,t)=>Zt(e,t,"playbackSpeed",1.25,ie().customBands);function lS(e){let{settingsRef:t,studioModeRef:n,bpmRef:o,hydraRef:r,hydraRenderBudgetKeyRef:i,syncHydraRenderBudgetRef:s,runHydraTickRef:l,hydraResizePauseRef:m,hydraResizeResumeRef:d,syncElectricNoiseTriggerTexRef:y,transitionStateRef:D,pendingVideoLoadRef:B,activeChannelRef:O,clipLoadFreezeRef:K,clipPeekDepsRef:X,onPlaybackCueRef:pe,boomerangBridgeReadyRef:Re,boomerangBackingRef:ge,boomerangCanvasBundleRef:Fe,boomerangStateRef:Qe,boomerangCaptureFpsCapRef:Ze,boomerangMaxFramesCapRef:dt,currentSpeedSmoothedRef:Et,fxReactiveTriggerGateRef:at,reactiveTriggerDescriptorsRef:nt,electricNoiseCirclesRef:ft,electricNoiseCirclePackRef:A,neonGridBundleRef:M,neonGridBridgeReadyRef:k,neonGridRuntimeRef:p,s3OverlayBindRef:re,throughTheStarsBundleRef:we,throughTheStarsBridgeReadyRef:Ye,lumaDustBundleRef:ze,lumaDustBridgeReadyRef:Ne,lumaLockBundleRef:qe,lumaLockBridgeReadyRef:Je,textLayerBundleRef:Ht,textLayerBridgeReadyRef:et,textLayerRuntimeRef:Dt,oscilloscopeBundleRef:gt,oscilloscopeBridgeReadyRef:bt,metalEnvBundleRef:Pt,metalEnvBridgeReadyRef:vt,perfLastPrimaryRef:Ut,perfVideoSinkRef:tn,perfPresentationLastRef:$t,perfPresentationSinkRef:bn,wasStudioFrozenRef:vn,flushPendingVideoLoad:mo,getParamValue:Ft,resolvePrimaryVideoSpeed:on,resolveStarLayerPixels:Un,isTransportFrozen:lt,isStudioTransportRunning:Pn,isVisualTransportPlaying:Mt,bootstrapTransportFreeze:h,reportPresentationMode:Fn}=e,Zn=(Ie,it)=>{let We=ie(),ke=We.hydraSettings??{},St=ko(ke,"neonGrid"),en=St?.config,pt=M.current;en&&k.current&&pt&&Qv({bundle:pt,s3:co("neonGrid"),bindState:re.current,params:en.params,spawn:Ks(en.params),draw:Kc(en.params),dt:Ie,now:it,aspect:window.innerWidth/Math.max(1,window.innerHeight),envelope:We.hydraEnvelopes?.[St.effectKey]??0,binding:Nn(en,"base"),bands:We.customBands,runtime:p.current});let At=We.hydraSettings?.fx?.gridShuffle;At?.enabled&&l1({envelope:We.hydraEnvelopes?.gridShuffle??0,binding:Nn(At,"base"),bands:We.customBands,dt:Ie});let wt=ko(ke,"throughTheStars"),pn=wt?.config,eo=we.current;if(pn&&Ye.current&&eo){let Co=Un();dv({bundle:eo,s3:co("throughTheStars"),bindState:re.current,fxCfg:pn,bands:We.customBands,amount:_n(wt.effectKey,pn,We.customBands,Xn),dt:Ie,now:it,aspect:window.innerWidth/Math.max(1,window.innerHeight),pixelWidth:Co.width,pixelHeight:Co.height})}let fo=ko(ke,"lumaDust"),yo=fo?.config,_t=ze.current;if(yo&&Ne.current&&_t){let Co=Un(),or=O.current===0?We.s0?.src:We.s1?.src;Nv({bundle:_t,s3:co("lumaDust"),bindState:re.current,video:or,params:yo.params,amount:_n(fo.effectKey,yo,We.customBands,Xn),dt:Ie,now:it,aspect:window.innerWidth/Math.max(1,window.innerHeight),pixelWidth:Co.width,pixelHeight:Co.height,skipVideoSample:K.current})}let Ct=ko(ke,"lumaLock"),Xt=Ct?.config,zt=qe.current;if(Xt&&Je.current&&zt){let Co=Un(),or=O.current===0?We.s0?.src:We.s1?.src;$v({bundle:zt,s3:co("lumaLock"),bindState:re.current,video:or,params:Xt.params,amount:_n(Ct.effectKey,Xt,We.customBands,Xn),dt:Ie,now:it,skipVideoSample:K.current,pixelWidth:Co.width,pixelHeight:Co.height})}let mn=ko(ke,"textLayer"),Er=mn?.config,sn=Ht.current;Er&&et.current&&sn&&iv({bundle:sn,s3:co("textLayer"),bindState:re.current,fxCfg:Er,bands:We.customBands,amount:_n(mn.effectKey,Er,We.customBands,Xn),now:it,envelope:We.hydraEnvelopes?.[mn.effectKey]??0,binding:Nn(Er,"base"),runtime:Dt.current,shouldBind:!0})},Sn=0,On=0,Hn=performance.now(),Qt=Et.current,rn=0,wn=0,an=0,Tn=(Ie=!1)=>{let it=r.current;if(!it?.synth)return;let We=lt(),ke=Mt(),St=!We&&(Ie||at.current),en=gf(document.hidden,Vi()),pt=`${en?"h":"v"}-${We?"f":ke?"p":"s"}-${St?"r":"i"}`;if(i.current!==pt){if(i.current=pt,en){tl(it.synth,0),it.synth.fps=2;return}if(We){tl(it.synth,0),it.synth.fps=void 0;return}if(!ke){tl(it.synth,0),it.synth.fps=St?30:4;return}tl(it.synth,1),it.synth.fps=void 0}};s.current=Tn;let Mn=()=>{i.current="",Tn(),zi()||Jn(0)},xn=()=>{Sn&&cancelAnimationFrame(Sn),On&&clearTimeout(On),Sn=0,On=0};m.current=()=>xn(),y.current=()=>{let Ie=performance.now();ft.current.length>0?A.current=ty(ft.current,Ie):A.current={count:0,slots:[]},oy(A.current.slots)};let Jn=Ie=>{if(!(Fo()&&(Jl(),Fo()))){if(xn(),zi()){On=window.setTimeout(()=>{On=0,F(performance.now())},50);return}if(Ie>0){On=window.setTimeout(()=>{On=0,Sn=requestAnimationFrame(F)},Ie);return}Sn=requestAnimationFrame(F)}};d.current=()=>Jn(0),document.addEventListener("visibilitychange",Mn),window.addEventListener("focus",Mn);let Go=Ie=>{Ut.current!==Ie&&(Ut.current=Ie,tn.current?.(Ie))},no=t2(),er={},oo={},Vr=(Ie,it=!0)=>{if(n2(no),Ie.hydraEnvelopes={},Ie.hydraEnvelopePhaseU={},Ie.hydraTriggerCounts={},Ie.vibrationAmp=0,wn=0,Ie.degaussAmp=0,an=0,Wi()){let We=X.current;We?uf(We):D2()}if(Gi()){let We=X.current;We?df(We):V2()}mu()&&tf(),it&&(ft.current=Rc(),A.current={count:0,slots:[]})},Rr=Ie=>c2(!!Ie?.fx?.boomerang?.enabled,Re.current,ge.current,Fe.current),Ar=Ie=>{if(!Mt()||K.current)return;let it=ie(),We=it.hydraSettings,ke=Rr(We),St=ke&&ua(Qe.current);if(!h2(St,Ie)){if(Ie==="boomerang"){if(!We?.fx?.boomerang?.enabled)return;let pt=Qe.current;if(ua(pt))return;if(!ke){pt.pendingTrigger=!0;return}qd(pt);return}if(Ie==="jumpCut"){if(!We?.fx?.jumpCut?.enabled)return;let pt=X2(Ft("jumpCut","skipFrames",2),Ft("jumpCut","jumpCuts",1));for(let At of zd(ke,ge.current,it.s0?.src,it.s1?.src))ff(At,pt);ke&&Vd(Fe.current,ge.current.v0,ge.current.v1),it.s2?.src instanceof HTMLVideoElement&&ff(it.s2.src,pt);return}if(Ie==="stutterBack"){if(!We?.fx?.stutterBack?.enabled)return;let pt=Ft("stutterBack","backFrames",6),At=j2(pt);for(let pn of zd(ke,ge.current,it.s0?.src,it.s1?.src))_u(pn,-At);ke&&Vd(Fe.current,ge.current.v0,ge.current.v1);let wt=it.s2?.src;wt instanceof HTMLVideoElement&&_u(wt,-At);return}if(Ie==="clipPeek"){let en=We?.fx?.clipPeek,pt=X.current;if(!en?.enabled||!pt||Wi()||Gi())return;let At=lf(Ft("clipPeek","holdSec",.35)),wt=cf(Ft("clipPeek","steps",1));N2(pt,wt,At);return}if(Ie==="zap"){let en=We?.fx?.zap,pt=X.current;if(!en?.enabled||!pt||Wi()||Gi())return;let At=Math.max(1,Math.min(8,Math.round(Ft("zap","clipCount",3)))),wt=Math.max(1,Math.min(12,Math.round(Ft("zap","framesPerClip",4))));$2(pt,At,wt)}}},bo=(Ie,it)=>{let ke=ie().triggerDebugStudio?.playbackSec??it/1e3,St=Math.max(30,o.current);if(s2({timeSec:ke,beat:l2(ke,St),channel:"fx",fxKey:Ie,intensity:1}),Ie==="clipPeek"||Ie==="zap"||Ie==="jumpCut"||Ie==="stutterBack"||Ie==="boomerang"){Ar(Ie);return}if(Tb(Ie,ie().hydraSettings??{})==="neonGrid"){let pt=M.current,At=ko(ie().hydraSettings??{},"neonGrid");pt&&At&&Ii(pt,Ks(At.config.params))}if(Ie.startsWith("playbackCue:frame")){let pt=Number.parseInt(Ie.slice(17),10),At=ie().hydraSettings?.fx?.playbackCue;if(!At?.enabled||!Number.isFinite(pt)||pt<1||pt>4)return;let wt=At.params??{},pn=lu(wt);if(pt>pn)return;let eo=y2(wt,pt);pe.current?.(pt,eo,Math.max(.05,Ft("playbackCue","holdSec",.35)),wt)}},$r=Ie=>Ie==="slowmo"?zm(Ft("slowmo","duration",Mi)):Ie==="accelerate"?Gm(Ft("accelerate","duration",Ci)):null,tr=(Ie,it)=>{if(Ie==="slowmo"){let We=Ft("slowmo","duration",Mi);ie().slowmoPulseUntilMs=it+pb(We)*1e3}else if(Ie==="accelerate"){let We=Ft("accelerate","duration",Ci);ie().acceleratePulseUntilMs=it+lb(We)*1e3}},un=Ie=>{if(!ci(Ie))return;let it=performance.now(),ke=ie().hydraSettings?.fx?.[Ie];if(!ke?.enabled)return;let St=Nn(ke,"base"),en=$r(Ie),pt=en??km(St,wi(ie().hydraModulation?.config)),At=St.trigger?.delay??0;au(no,Ie,it,pt,At),bo(Ie,it),en&&tr(Ie,it)},Uo=Ie=>{ey(ft.current,Ie)};ie().__hydraFireFxTrigger=un;let nr=(Ie,it,We,ke,St)=>{let en=Ie.paramKey??"base",pt=Nn(it,en);if(!jn(pt)||pt.source==="none")return;let At=Ie.key,wt=ie(),pn=Mr(pt.source,wt.customBands,pt.depth),eo=As(pt.source)?Q2(pt.source,pt.trigger.threshold,K2(wt.studioStemEventsStep,wt.studioEventPulses),no.stemHitsSeen,At):0,fo=$r(Ie.fxKey),yo=fo??km(pt,wi(ie().hydraModulation?.config)),_t=r2(no,{key:At,bandVal:pn,stemHits:eo,trigger:pt.trigger,envelope:yo,nowMs:We,dt:ke,onFire:Ct=>{bo(Ct,We),fo&&tr(Ie.fxKey,We),Ie.fxKey==="electricNoise"&&!Ie.paramKey&&Uo(We)}});if(_t!=null&&(St[At]=_t),pt.envelopeRef&&pt.mode==="envelope"){let Ct=parseInt(pt.envelopeRef.slice(3),10),Xt=no.envelopes[At]??0,zt=er[Ct]??0;Xt>zt&&(er[Ct]=Xt,oo[Ct]=_t??0)}},pr=Math.max(.04,1/24),Yn=(Ie,it)=>{Ie.loop&&typeof Ie.duration=="number"&&Number.isFinite(Ie.duration)&&Ie.duration>0&&(Ie.ended||Ie.currentTime>=Ie.duration-pr)&&(Ie.currentTime=0,it&&Ie.play().catch(()=>{}))},mr=(Ie,it,We)=>{Ie instanceof HTMLVideoElement&&(We?Ie.paused&&Ie.play().catch(()=>{}):Ie.paused||Ie.pause(),Ie.playbackRate=it,Yn(Ie,We))},zo=Ie=>{let it=ie(),We=it.s2?.src;if(!(We instanceof HTMLVideoElement))return;if(C2()){We.paused||We.pause();return}Ie&&We.paused&&We.play().catch(()=>{});let ke=ol(it.hydraSettings?.fx);We.playbackRate=ke?sS(ke.key,ke.config):1,Yn(We,Ie)},F=Ie=>{if(Fo())return;!D.current.active&&B.current&&mo();let it=Math.min((Ie-Hn)/1e3,.1);Hn=Ie;let We=lt(),ke=t.current.isVideoPlaying===!1&&!Pn(),St=We||ke,en=X.current;!St&&en&&(Wi()?W2(en,it):Gi()?q2(en,it):mu()&&L2(it)),St||Zn(it,Ie);let{s0:pt,s1:At,hydraSettings:wt,customBands:pn}=ie(),eo=o2(no)||ft.current.length>0;if(gf(document.hidden,Vi())){Tn(eo),Jn(500);return}if(We&&vn.current===!1)r.current&&(h(),vn.current=!0);else if(vn.current&&!We){i.current="",Tn(eo),l.current(16.67);let g=ie();ur(g.s0?.src),ur(g.s1?.src),ur(g.s2?.src),ur(ge.current?.v0),ur(ge.current?.v1),vn.current=!1}else We||(vn.current=!1);if(St){let g=ie();if(To(g.s2?.src),To(g.s0?.src),To(g.s1?.src),To(ge.current?.v0),To(ge.current?.v1),We?Vr(g,!1):ko(wt??{},"neonGrid")||(g.hydraEnvelopes={},g.hydraEnvelopePhaseU={},g.hydraTriggerCounts={},g.slowmoTrailMix=0),!n.current){g.customBands={kick:0,snare:0,hat:0,bass:0,vocals:0,low:0,mid:0,high:0,beat:0,rhythm:0,specFast:0,specSlow:0,master:0},ie().masterLevel=0,ie().masterDbfs=-96,i.current="",Tn(!1),Jn(250);return}}Tn(!1);let fo=ie().hydraSettings,yo=Re.current&&fo?.fx?.boomerang?.enabled;if(pt&&At&&!yo){let g=O.current===0?pt:At;g.src instanceof HTMLVideoElement&&(g.src.loop=!0)}else if(pt&&At&&yo){let g=ge.current.v0,Pe=ge.current.v1;g&&(g.loop=!0),Pe&&(Pe.loop=!0)}let _t=eo;if(!!wt?.fx&&(at.current||_t)){let g=ie();g.studioStemHitsReset&&(no.stemHitsSeen.clear(),g.studioStemHitsReset=!1);let Pe=nt.current,T={},I=wt.fx;for(let q of Object.keys(er))delete er[Number(q)];for(let q of Object.keys(oo))delete oo[Number(q)];for(let q=0;q<Pe.length;q++){let te=Pe[q],se=te.config??I[te.fxKey];!se||!se.enabled||nr(te,se,Ie,it,T)}Z2(no.stemHitsSeen,g.studioStemEventsStep,g.studioEventPulses),ie().hydraEnvelopes=no.envelopes,ie().hydraEnvelopePhaseU=T,ie().hydraTriggerCounts=no.counts;let W=ie();W.hydraModulation&&(W.hydraModulation.eg={...er},W.hydraModulation.egOneShotPhase={...oo})}else wt?.fx&&(ie().hydraEnvelopes={},ie().hydraEnvelopePhaseU={},ie().hydraTriggerCounts={});if(wt){let g=pn??{kick:0,snare:0,hat:0,bass:0,vocals:0,low:0,mid:0,high:0,beat:0,rhythm:0,specFast:0,specSlow:0,master:0};y.current(),ie().low=g.low||0,ie().mid=g.mid||0,ie().high=g.high||0,ie().beat=g.beat||0,typeof g.kick=="number"&&(ie().kick=g.kick),ie().masterLevel=typeof g.master=="number"?g.master:ie().masterLevel??0;let Pe=wt.fx?.vibration;if(Pe?.enabled){let I=Jy(Pe,no.envelopes.vibration??0,q=>So("vibration",q,g)),W=Ky(Pe,I);wn=Qy(wn,W,Pe),ie().vibrationAmp=wn}else wn*=.88,ie().vibrationAmp=wn;let T=wt.fx?.degauss;if(T?.enabled){let I=Xy(T,no.envelopes.degauss??0,q=>So("degauss",q,g)),W=$y(T,I);an=qy(an,W,T),ie().degaussAmp=an}else an*=.86,ie().degaussAmp=an}if(!wt||!pt||!At){Go(null),Fn("idle"),Jn(250);return}let Xt=!!wt.fx?.boomerang?.enabled&&Re.current&&!!ge.current.v0&&!!ge.current.v1&&!!Fe.current;if(!Xt&&ua(Qe.current)&&$d(Qe.current),!Xt&&!(pt.src instanceof HTMLVideoElement&&At.src instanceof HTMLVideoElement)){Go(null),Fn("idle"),Jn(250);return}let zt=Xt?ge.current.v0:pt.src,mn=Xt?ge.current.v1:At.src;Go(zt);let Er=on(zt.duration);Qt=hb(Er,Qt,_b(wt.fx)),Et.current=Qt,(rn++&7)===0&&A2(Qt);let sn=Mt()&&!K.current,Co=wt.fx?.clipPeek,or=X.current;!Co?.enabled&&Wi()&&or&&uf(or);let Va=wt.fx?.zap,ma=X.current;!Va?.enabled&&Gi()&&ma&&df(ma),!wt.fx?.playbackCue?.enabled&&mu()&&tf();let zn=Fe.current,dr=wt.fx?.boomerang,fr=Qe.current;Xt&&dr?.enabled&&fr.pendingTrigger&&!ua(fr)&&qd(fr);let Ro=Xt&&!!dr?.enabled&&ua(fr);if(Xt&&dr?.enabled&&zn&&sn&&!Ro){let g=Qe.current;(g.phase!=="forward"||g.frames.frames0.length>0||g.segmentEnd0>0||g.capturePending||g.completeAfterReverse)&&$d(g),Qt>=sa?(mr(zt,Qt,sn),mr(mn,Qt,sn)):($i(zt,Qt,it),$i(mn,Qt,it)),Wa(zn.ctx0,zn.c0,zt),Wa(zn.ctx1,zn.c1,mn),zo(sn)}else if(Ro&&dr?.enabled&&zn&&sn){let g=Qe.current,Pe=d2(Ft("boomerang","segmentSec",1.25)),T=Math.max(24,Math.min(180,Math.round(Ft("boomerang","maxFrames",60)),dt.current)),I=Math.max(12,Math.min(60,Ft("boomerang","captureFps",24),Ze.current)),W=()=>{zt.currentTime=g.segmentStart0,mn.currentTime=g.segmentStart1,su(g.frames),g.active=!1,g.phase="forward",g.segmentEnd0=0,g.reverseIdx=-1,g.captureAccum=0,g.completeAfterReverse=!1};if(g.phase==="reverse"||g.phase==="replay"){zt.pause(),mn.pause();let q=g.reverseIdx,te=q>=0?g.frames.frames0[q]:null,se=q>=0?g.frames.frames1[q]:null;if(q>=0&&te&&se)if(jd(zn.ctx0,zn.c0,te),jd(zn.ctx1,zn.c1,se),g.phase==="reverse"){let{cycleDone:_e}=u2(g,it,I);_e&&W()}else p2(g,it,I);else W()}else{if(!Number.isFinite(g.segmentEnd0)||g.segmentEnd0<=g.segmentStart0+1e-4){g.segmentStart0=zt.currentTime,g.segmentStart1=mn.currentTime;let te=zt.duration,se=g.segmentStart0+Pe;Number.isFinite(te)&&te>0&&(se=Math.min(se,te-1/120)),g.segmentEnd0=Math.max(g.segmentStart0+.05,se)}if(sn&&Qt>=sa){zt.paused&&zt.play().catch(()=>{}),mn.paused&&mn.play().catch(()=>{}),zt.playbackRate=Qt,mn.playbackRate=Qt;let te=ie().s2;if(te&&te.src instanceof HTMLVideoElement){te.src.paused&&te.src.play().catch(()=>{});let se=ol(wt.fx);se?te.src.playbackRate=sS(se.key,se.config):te.src.playbackRate=1}Yn(zt,sn),Yn(mn,sn)}else sn?(zt.paused||zt.pause(),mn.paused||mn.pause(),$i(zt,Qt,it),$i(mn,Qt,it)):(zt.paused||zt.pause(),mn.paused||mn.pause());Wa(zn.ctx0,zn.c0,zt),Wa(zn.ctx1,zn.c1,mn);let q=Math.max(.03,1/I);if(zt.currentTime>=g.segmentEnd0-q)g.frames.frames0.length>=2?(g.phase="reverse",g.completeAfterReverse=!1,zt.pause(),mn.pause(),g.reverseIdx=g.frames.frames0.length-1,g.captureAccum=0):W();else{g.captureAccum+=it;let te=1/I;g.captureAccum>=te&&!g.capturePending&&g.frames.frames0.length<T&&(g.captureAccum-=te,g.capturePending=!0,m2(zt,mn,g.frames,T).finally(()=>{g.capturePending=!1}))}}zo(sn)}else if(sn&&Qt>=sa&&!document.hidden){let g=ie();mr(g.s0?.src,Qt,sn),mr(g.s1?.src,Qt,sn),zo(sn)}else if(sn){let g=ie();$i(g.s0?.src,Qt,it),$i(g.s1?.src,Qt,it),zo(sn)}else{let g=ie();To(g.s0?.src),To(g.s1?.src),zo(!1)}let qr="decoder";if(Ro&&dr?.enabled&&zn&&sn){let g=Qe.current;(g.phase==="reverse"||g.phase==="replay"||Qt<sa)&&(qr="manualSeek")}else Qt<sa&&(qr="manualSeek");Fn(qr);let hr=ko(wt,"oscilloscope"),Ao=hr?.config;if(!!Ao&&bt.current&&gt.current){let g=ie(),Pe=gt.current;ho(co("oscilloscope"),Pe.canvas,"oscilloscope",re.current);let T=g.studioOscilloscopePeaks,I=g.studioOscilloscopeDurationSec??0,W=g.studioOscilloscopeTimeSec??0;if(n.current&&T&&T.length>0&&I>0&&(g.studioTransportActive||W>0))Jx(Pe,T,I,W);else{let _e=g.oscilloscopeLiveRef?.current?.spectrum,Ue=0;if(_e&&_e.length>8){let Ke=Math.max(1,Math.floor(_e.length/64));for(let st=0;st<_e.length;st+=Ke)Ue+=_e[st]}Ue<64&&ev(Pe,g.customBands??{},performance.now()*.003)}let q=Zx(Ao.params),te=(se,_e)=>Zt(hr.effectKey,Ao,se,_e,ie().customBands,"oscilloscope");tv(co("oscilloscope"),Pe,{persistence:te("persistence",.72),positionY:te("positionY",.88),scale:te("scale",.55),mode:Math.round(te("mode",0)),colorLo:q.colorLo,colorMid:q.colorMid,colorHi:q.colorHi},performance.now())}let _r=wt.fx?.metalSphere;_r?.enabled&&(_r.base??0)>.01&&!jv(Number(_r.params?.envMap??0))&&vt.current&&Pt.current&&Yv(ie().s3,zt,Pt.current,{now:performance.now(),videoPath:t.current.video??""}),Jn(0)},Bo=rS("hydra",()=>{F(performance.now())});return Jn(0),Tn(),()=>{Bo(),document.removeEventListener("visibilitychange",Mn),window.removeEventListener("focus",Mn),delete ie().__hydraFireFxTrigger,s.current=()=>{},m.current=null,d.current=null,y.current=()=>{},xn(),Go(null),$t.current=null,bn.current?.("idle")}}u();function cS(e){let{settingsRef:t,activeChannelRef:n,transitionStateRef:o,pendingVideoLoadRef:r,currentVideoRef:i,videoLoadSeqRef:s,clipLoadFreezeRef:l,secondaryVideoRef:m,boomerangBridgeReadyRef:d,boomerangBackingRef:y,boomerangStateRef:D,syncPlaybackRef:B,applySceneAndRenderRef:O,bumpLumaDustReset:K,teardownBoomerangBridge:X,isPrimaryPlaybackActive:pe}=e,Re=()=>{if(!o.current.active)return;let{s0:Qe,s1:Ze}=ie();if(!Qe||!Ze)return;let dt=performance.now()-o.current.startTime,Et=Math.max(1,o.current.duration),at=Math.min(1,dt/Et),nt=n.current===0?1:0;at>=.5&&(n.current=nt),o.current.active=!1;let ft=pe(),A=n.current===0?Ze:Qe,M=n.current===0?Qe:Ze;To(A.src),ft&&ur(M.src)},ge=()=>{let Qe=r.current;!Qe||o.current.active||(r.current=null,!hn(Qe,i.current??"")&&Fe(!1))},Fe=Qe=>{let Ze=!1,dt=t.current,{s0:Et,s1:at}=ie();if(!Et||!at||!dt.video)return()=>{Ze=!0};let nt=()=>{if(d.current||!(Et.src instanceof HTMLVideoElement)||!(at.src instanceof HTMLVideoElement)){X({reloadPath:dt.video,restoreBacking:!1});return}d.current=!1,y.current={v0:null,v1:null}},ft=ie().__hydraClipPeekSkipLoad;if(ft&&hn(ft,dt.video)){delete ie().__hydraClipPeekSkipLoad,delete ie().__hydraInstantVideoLoad,i.current=dt.video,B.current(),O.current();let gt=m.current,{s2:bt}=ie();return bt&&gt&&bt.initVideo(gt),()=>{Ze=!0}}let A=H2(dt.video);if(F2()&&!A)return o.current.active=!1,r.current=null,delete ie().__hydraInstantVideoLoad,i.current=dt.video,B.current(),O.current(),()=>{Ze=!0};let M=i.current,k=M===null||!M||!hn(M,dt.video);if(!Qe&&!k)return B.current(),O.current(),()=>{Ze=!0};K(),(Qe||r.current&&hn(r.current,dt.video))&&(r.current=null);let p=pe(),re=I2();re&&(o.current.active=!1,r.current=null,l.current=!1),Qe&&(l.current=!1);let we=dt.fx?.transition,Ye=f2({playing:p,force:Qe,instantLoad:re,loadedPath:M,transitionEnabled:!!we?.enabled,boomerangEngaged:ua(D.current)});if(Ye&&o.current.active)return r.current=dt.video,()=>{Ze=!0};let ze=++s.current,Ne=Ye,qe=Qe||re||k&&M!=null&&!!M&&!Ne,Je=()=>{let gt=m.current,{s2:bt}=ie();if(!bt||!gt)return;bt.initVideo(gt);let Pt=()=>{let Ut=bt.src;if(Ut instanceof HTMLVideoElement)if(Ut.muted=!0,Ut.loop=!0,p)Ut.play().catch(()=>{});else{try{Ut.currentTime=0}catch{}Ut.pause()}},vt=bt.src;vt instanceof HTMLVideoElement&&vt.readyState>=2?Pt():vt instanceof HTMLVideoElement?vt.addEventListener("loadeddata",Pt,{once:!0}):setTimeout(Pt,500)};if(qe){o.current.active=!1,nt();let gt=n.current===0?Et:at,bt=n.current===0?at:Et,Pt=!1;Ua(!0);let vt=()=>{if(Pt||(Pt=!0,Ze||s.current!==ze))return;let $t=bt.src;if(!($t instanceof HTMLVideoElement)){l.current=!1,Ua(!1);return}if($t.muted=!0,$t.loop=!0,pe())$t.play().catch(()=>{});else{try{$t.currentTime=0}catch{}$t.pause()}n.current=n.current===0?1:0;let bn=gt.src;bn instanceof HTMLVideoElement&&bn!==$t&&bn.pause(),i.current=dt.video,pu(),B.current(),Je(),l.current=!1,Ua(!1),O.current()},Ut=()=>{if(Ze||s.current!==ze||Pt)return;let $t=bt.src;if(!($t instanceof HTMLVideoElement)){requestAnimationFrame(Ut);return}if($t.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA)vt();else{let bn=()=>vt();$t.addEventListener("loadeddata",bn,{once:!0}),$t.addEventListener("canplay",bn,{once:!0})}};bt.initVideo(dt.video),Ut();let tn=window.setTimeout(()=>{if(Ze||s.current!==ze||Pt)return;Pt=!0,l.current=!0,To(Et.src),To(at.src),Et.initVideo(dt.video),at.initVideo(dt.video),i.current=dt.video,n.current=0;let $t=()=>{if(Ze||s.current!==ze)return;let vn=Et.src,mo=at.src;if(!(vn instanceof HTMLVideoElement)||!(mo instanceof HTMLVideoElement)){l.current=!1,Ua(!1);return}for(let Ft of[vn,mo])Ft.muted=!0,Ft.loop=!0,pe()?Ft.play().catch(()=>{}):Ft.pause();B.current(),Je(),l.current=!1,Ua(!1),O.current()},bn=()=>{if(Ze||s.current!==ze)return;let vn=Et.src,mo=at.src;if(!(vn instanceof HTMLVideoElement)||!(mo instanceof HTMLVideoElement)){requestAnimationFrame(bn);return}$t()};bn()},3e3);return()=>{Ze=!0,window.clearTimeout(tn),l.current=!1,Ua(!1)}}if(Ne){o.current.active&&Re(),nt();let gt=n.current===0?Et:at,bt=n.current===0?at:Et,Pt=gt.src,vt=Pt instanceof HTMLVideoElement&&Number.isFinite(Pt.currentTime)?Pt.currentTime:0,Ut=Math.max(.05,Zt("transition",we,"duration",1,ie().customBands)),tn=()=>{if(Ze||s.current!==ze)return;let Ft=bt.src;if(!(Ft instanceof HTMLVideoElement))return;Ft.muted=!0,Ft.loop=!0;let on=!1,Un=()=>{if(on||(on=!0,Ze||s.current!==ze))return;if(l.current=!1,p){Ft.play().catch(()=>{});let Mt=gt.src;Mt instanceof HTMLVideoElement&&Mt.paused&&Mt.play().catch(()=>{})}else Ft.pause();B.current();let Pn=Rh(Number(we.params?.type??0));o.current={active:!0,startTime:performance.now(),duration:Ut*1e3,resolvedType:Pn},Je(),O.current()},lt=()=>{if(pu()||!Number.isFinite(vt)||vt<0)return;let Pn=Ft.duration;Number.isFinite(Pn)&&Pn>0?Ft.currentTime=vt%Pn:Ft.currentTime=vt};Ft.readyState>=HTMLMediaElement.HAVE_METADATA?lt():Ft.addEventListener("loadedmetadata",lt,{once:!0}),Ft.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Un():(Ft.addEventListener("loadeddata",Un,{once:!0}),Ft.addEventListener("canplay",Un,{once:!0}))},$t=!1,bn=()=>{$t||($t=!0,tn())},vn=()=>{if(Ze||s.current!==ze)return;if(!(bt.src instanceof HTMLVideoElement)){requestAnimationFrame(vn);return}bn()};bt.initVideo(dt.video),i.current=dt.video,vn();let mo=window.setTimeout(()=>{if(Ze||s.current!==ze||$t)return;$t=!0,o.current.active=!1,nt(),l.current=!0,To(Et.src),To(at.src),Et.initVideo(dt.video),at.initVideo(dt.video),i.current=dt.video,n.current=0;let Ft=()=>{if(Ze||s.current!==ze)return;let Un=Et.src,lt=at.src;if(!(Un instanceof HTMLVideoElement)||!(lt instanceof HTMLVideoElement)){l.current=!1;return}for(let Pn of[Un,lt])Pn.muted=!0,Pn.loop=!0,pe()?Pn.play().catch(()=>{}):Pn.pause();B.current(),Je(),O.current(),l.current=!1},on=()=>{if(Ze||s.current!==ze)return;let Un=Et.src,lt=at.src;if(!(Un instanceof HTMLVideoElement)||!(lt instanceof HTMLVideoElement)){requestAnimationFrame(on);return}Ft()};on()},4e3);return()=>{Ze=!0,window.clearTimeout(mo),l.current=!1}}o.current.active=!1,nt(),l.current=!0,To(Et.src),To(at.src),Et.initVideo(dt.video),at.initVideo(dt.video),i.current=dt.video,n.current=0;let Ht=()=>{if(Ze||s.current!==ze)return;let gt=Et.src,bt=at.src;if(!(gt instanceof HTMLVideoElement)||!(bt instanceof HTMLVideoElement)){l.current=!1;return}for(let Pt of[gt,bt])if(Pt.muted=!0,Pt.loop=!0,pe())Pt.play().catch(()=>{});else{try{Pt.currentTime=0}catch{}Pt.pause()}pu(),B.current(),o.current.active=!1,n.current=0,Je(),l.current=!1,O.current()},et=()=>{if(Ze||s.current!==ze)return;let gt=Et.src,bt=at.src;if(!(gt instanceof HTMLVideoElement)||!(bt instanceof HTMLVideoElement)){requestAnimationFrame(et);return}if(gt.readyState>=2&&bt.readyState>=2){Ht();return}let Pt=0,vt=()=>{Pt-=1,Pt<=0&&Ht()};gt.readyState<2&&(Pt+=1,gt.addEventListener("loadeddata",vt,{once:!0}),gt.addEventListener("canplay",vt,{once:!0})),bt.readyState<2&&(Pt+=1,bt.addEventListener("loadeddata",vt,{once:!0}),bt.addEventListener("canplay",vt,{once:!0})),Pt<=0&&Ht()},Dt=window.setTimeout(()=>{Ze||s.current!==ze||Ht()},2e3);return et(),()=>{Ze=!0,window.clearTimeout(Dt),l.current=!1}};return{loadPrimaryVideos:Fe,flushPendingVideoLoad:ge}}u();function xf(e,t,n,o){let r=o??t,i=Nn(n,"base");jn(i)&&e.push({key:t,fxKey:t,config:n});let s=n.paramSync;if(!s)return;let l=r==="playbackCue"?lu(n.params):void 0;for(let m of Object.keys(s)){if(l!=null){let y=Number.parseInt(m.replace(/^frame/,""),10);if(m.startsWith("frame")&&Number.isFinite(y)&&y>l)continue}let d=Nn(n,m);jn(d)&&e.push({key:`${t}:${m}`,fxKey:t,paramKey:m,config:n})}}function ER(e,t,n){for(let[o,r]of Object.entries(n))if(r?.enabled){for(let i of r.layerIds){let s=t[i];s?.config.enabled&&xf(e,Pa(o,i),s.config,s.templateKey)}r.composite?.enabled&&xf(e,`group:${o}`,r.composite)}}function uS(e,t){if(!e||typeof e!="object")return[];let n=[];for(let o of Object.keys(e)){let r=e[o],i=Ds(o,r)??r;!i||!i.enabled||xf(n,o,i)}return t?.layerInstances&&t?.fxGroups&&ER(n,t.layerInstances,t.fxGroups),n}u();function vf(e){return e.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA&&e.videoWidth>0&&e.videoHeight>0}function pS(){let e=window;if(e.__hydraInitVideoPatched)return;let t=e.s0;if(!t)return;let n=Object.getPrototypeOf(t);if(!n||typeof n.initVideo!="function")return;e.__hydraInitVideoPatched=!0;let o=n.tick;typeof o=="function"&&(n.tick=function(i){let s=this.src;if(!(this.dynamic&&s instanceof HTMLVideoElement&&!vf(s)))return o.call(this,i)}),n.initVideo=function(i="",s){let l=this;l.dynamic=!1;let m=l.src;if(l.src=null,m instanceof HTMLVideoElement)try{m.pause(),m.removeAttribute("src"),m.load()}catch{}if(!i){l.tex=l.regl.texture({shape:[1,1]});return}let d=l._hydraVideoLoadSeq=(l._hydraVideoLoadSeq??0)+1,y=document.createElement("video");y.crossOrigin="anonymous",y.autoplay=!1,y.loop=!0,y.muted=!0,y.playsInline=!0,y.preload="auto";let D=()=>{if(l._hydraVideoLoadSeq===d){if(!vf(y)){requestAnimationFrame(D);return}l.src=y,yb(y),l.tex=l.regl.texture({data:y,...s}),l.dynamic=!0;try{l.tex.subimage?.(y)}catch{}}},B=()=>{if(l._hydraVideoLoadSeq===d){try{y.currentTime=0}catch{}y.pause(),D()}},O=()=>{if(l._hydraVideoLoadSeq===d){if(xb()){y.play().then(D).catch(D);return}if(vf(y)){B();return}requestAnimationFrame(B)}};y.addEventListener("loadeddata",O,{once:!0});let K=tg(i),X=K.length>0?K:[Cs(i)],pe=Re=>{if(l._hydraVideoLoadSeq===d){if(Re>=X.length){l.dynamic=!1;return}y.src=X[Re],y.addEventListener("error",()=>{l._hydraVideoLoadSeq===d&&pe(Re+1)},{once:!0})}};pe(0)}}u();function PR(e,t){if(this.width===e&&this.height===t&&this.canvas.width===e&&this.canvas.height===t){U_()?nm(this,e,t):Fo()&&Jl();return}nm(this,e,t)}function mS(e){let t=window;if(t.__hydraSynthDebugPatched)return;let n=Object.getPrototypeOf(e);!n||typeof n.setResolution!="function"||(t.__hydraSynthDebugPatched=!0,n.setResolution=PR)}u();function FR(){if(typeof window>"u")return{width:1920,height:1080};let e=window.visualViewport,t=e?.width&&e.width>0?e.width:window.innerWidth,n=e?.height&&e.height>0?e.height:window.innerHeight;return{width:Math.max(1,Math.round(t)),height:Math.max(1,Math.round(n))}}function dS(e,t){let n=Math.min(typeof window<"u"&&window.devicePixelRatio||1,t),o=e?.clientWidth??0,r=e?.clientHeight??0,{width:i,height:s}=o>0&&r>0?{width:o,height:r}:FR();return{width:Math.max(2,Math.round(i*n)),height:Math.max(2,Math.round(s*n)),dpr:n}}u();function OR(e,t,n){let o=new Set;for(let r of n){if(!r.isActive())continue;let i=e.o[r.outputIndex];if(!i)continue;o.add(r.outputIndex);let s=r.maxSteps??4,l=Math.max(1,Math.min(s,Math.round(r.simSteps())));for(let m=0;m<l;m++)i.tick(t);r.afterSimFrame?.()}for(let r=0;r<e.o.length;r++)o.has(r)||e.o[r].tick(t)}function fS(e,t){return function(o){try{let r=e.synth.speed;if(e.sandbox.tick(),r===0&&(e.synth.speed=0),e.detectAudio===!0&&e.synth.a?.tick(),e.sandbox.set("time",e.synth.time+=o*.001*e.synth.speed),e.timeSinceLastUpdate+=o,!e.synth.fps||e.timeSinceLastUpdate>=1e3/e.synth.fps){if(e.synth.stats.fps=Math.ceil(1e3/e.timeSinceLastUpdate),e.synth.update)try{e.synth.update(e.timeSinceLastUpdate)}catch{}for(let s=0;s<e.s.length;s++)e.s[s].tick(e.synth.time);let i={time:e.synth.time,mouse:e.synth.mouse,bpm:e.synth.bpm,resolution:[e.canvas.width,e.canvas.height]};if(OR(e,i,t),e.isRenderingAll?e.renderAll({tex0:e.o[0].getCurrent?.()??e.o[0],tex1:e.o[1].getCurrent?.()??e.o[1],tex2:e.o[2].getCurrent?.()??e.o[2],tex3:e.o[3].getCurrent?.()??e.o[3],resolution:[e.canvas.width,e.canvas.height]}):e.renderFbo({tex0:e.output.getCurrent(),resolution:[e.canvas.width,e.canvas.height]}),e.synth.afterUpdate)try{e.synth.afterUpdate(e.timeSinceLastUpdate)}catch{}e.timeSinceLastUpdate=0}e.saveFrame===!0&&(e.canvasToImage(),e.saveFrame=!1)}catch(r){console.warn("Error during tick():",r)}}}u();u();var _S="hydra-midi-debug-in-v1";function HR(e){try{let t=sessionStorage.getItem(e);if(!t)return[];let n=JSON.parse(t);return Array.isArray(n)?n.filter(o=>typeof o=="string").slice(-120):[]}catch{return[]}}function IR(e,t){try{sessionStorage.setItem(e,JSON.stringify(t))}catch{}}var gS=HR(_S),Sf=0;function hS(){Sf!==0&&typeof window<"u"&&(window.clearTimeout(Sf),Sf=0),IR(_S,gS)}typeof window<"u"&&(window.addEventListener("pagehide",hS),window.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&hS()}));function BR(){return gS.slice()}typeof window<"u"&&(window.__HYDRA_MIDI_DEBUG__={in:BR});function DR(e){if(!e||typeof e!="object")return!1;for(let t of Object.keys(e)){let n=e[t];if(!n||typeof n!="object"||!n.enabled)continue;let o=n;if(o.isTrigger&&o.syncBand&&o.syncBand!=="none")return!0;let r=o.paramSync;if(r&&typeof r=="object"){for(let i of Object.values(r))if(i?.isTrigger&&i.band&&i.band!=="none")return!0}}return!1}function bS(e,t,n){if(DR(e))return!0;if(!t||!n)return!1;for(let o of Object.values(n))if(o?.enabled){if(o.composite?.enabled){let r=o.composite;if(r.isTrigger&&r.syncBand&&r.syncBand!=="none")return!0;let i=r.paramSync;if(i){for(let s of Object.values(i))if(s?.isTrigger&&s.band&&s.band!=="none")return!0}}for(let r of o.layerIds){let i=t[r];if(!i?.config.enabled)continue;let s=i.config;if(s.isTrigger&&s.syncBand&&s.syncBand!=="none")return!0;let l=s.paramSync;if(l){for(let m of Object.values(l))if(m?.isTrigger&&m.band&&m.band!=="none")return!0}}}return!1}u();function yS(){return{kick:0,snare:0,hat:0,bass:0,vocals:0,low:0,mid:0,high:0,beat:0,rhythm:0,specFast:0,specSlow:0,master:0}}var ot=e=>({current:e});function xS(e,t){let n=uo(t,[3,3,6]),[o,r,i]=uo(e,n);return[o/255,r/255,i/255]}function SS(e){let{canvas:t}=e,n=e.dprCap??2,o=e.clips.length>0?e.clips:[e.config.video].filter(Boolean),r=ie();r.customBands=yS();let i={...e.config,video:o[e.clipIndex??0]??e.config.video};db(i.fx);let s=ot(i);r.hydraSettings=i;let l=ot(t),m=ot(null),d=ot(!1),y=ot(void 0),D=ot(void 0),B=ot("full"),O=ot(120),K=ot(0),X=ot({active:!1,startTime:0,duration:0,resolvedType:0}),pe=ot(!1),Re=ot(0),ge=ot(0),Fe=ot(0),Qe=ot(()=>{}),Ze=ot(()=>{}),dt=ot(()=>{}),Et=ot(()=>{}),at=ot(""),nt=ot(()=>{}),ft=ot(null),A=ot(null),M=ot(()=>{}),k=ot(1),p=ot(!1),re=ot(null),we=ot(null),Ye=ot(0),ze=ot(!1),Ne=ot(void 0),qe=ot(Rc()),Je=ot({count:0,slots:[]}),Ht=ot(null),et=ot(!1),Dt=ot(null),gt=ot(!1),bt=ot(Kv()),Pt=ot(!1),vt=ot(null),Ut=ot(!1),tn=ot(nu()),$t=ot(!1),bn=ot(null),vn=ot(!1),mo=ot(!1),Ft=ot(null),on=ot(!1),Un=ot(!1),lt=ot(null),Pn=ot(!1),Mt=ot(!1),h=ot(null),Fn=ot(!1),Zn=ot(Cb()),Sn=ot(!1),On=ot({v0:null,v1:null}),Hn=ot(null),Qt=ot({active:!1,pendingTrigger:!1,phase:"forward",segmentStart0:0,segmentStart1:0,segmentEnd0:0,captureAccum:0,capturePending:!1,reverseIdx:-1,completeAfterReverse:!1,frames:{frames0:[],frames1:[]},lastFrameTime:0}),rn=ot(60),wn=ot(180),an=ot(null),Tn=ot(void 0),Mn=ot(null),xn=ot(void 0),Jn=ot(void 0),Go=ot(void 0),no=ot(bS(i.fx,i.layerInstances,i.fxGroups)),er=ot(uS(i.fx,{layerInstances:i.layerInstances,fxGroups:i.fxGroups})),oo=()=>ie().customBands,Vr=()=>ie().hydraSettings?.fx??s.current.fx,Rr=(_t,Ct,Xt)=>Zt(_t,Vr()?.[_t],Ct,Xt,oo()),Ar=_t=>bb(s.current.fx,oo(),(Ct,Xt,zt)=>So(Ct,Xt,zt),Rr,_t),bo=()=>dS(t,n),$r=()=>t.width>0&&t.height>0?{width:t.width,height:t.height}:bo(),tr=()=>s.current.isVideoPlaying!==!1,{width:un,height:Uo}=bo();t.width=un,t.height=Uo;let nr=HTMLCanvasElement.prototype,pr=nr.getContext;nr.getContext=function(Ct,Xt){return this===t&&(Ct==="webgl"||Ct==="webgl2"||Ct==="experimental-webgl")?pr.call(this,Ct,{...Xt,preserveDrawingBuffer:!0}):pr.apply(this,arguments)};let Yn;try{Yn=new S_({canvas:t,detectAudio:!1,makeGlobal:!0,autoLoop:!1,width:un,height:Uo,numSources:wb()})}finally{nr.getContext=pr}m.current=Yn;let zo=fS(Yn,[{outputIndex:1,isActive:()=>!!s.current.fx?.reactionDiffusion?.enabled,simSteps:()=>{let _t=Number(s.current.fx?.reactionDiffusion?.params?.speed??.45);return 1+Math.round(_t*2)}},{outputIndex:3,isActive:()=>Nb(s.current.fx),simSteps:()=>{let _t=Zt("patternLayer",s.current.fx?.patternLayer,"speed",.4,oo());return 3+Math.round(Math.max(0,Math.min(2,_t))*3)},maxSteps:6}]);Yn.tick=(_t,Ct)=>{if(!Fo()){Ql();try{zo(_t,Ct)}finally{Re.current>0&&(Re.current-=1),Fe.current>0&&(Fe.current-=1),ge.current>0&&(ge.current-=1),Zl()}}},Qe.current=_t=>{if(Fo())return;M.current(),mb(Math.max(0,_t)/1e3);let Ct=ie().hydraSettings?.fx?.timeGlitch??s.current.fx?.timeGlitch,Xt=ie();v1({sources:[Xt.s0?.src,Xt.s1?.src],activeChannel:K.current,enabled:!!Ct?.enabled,warm:(s.current.activeFxList||[]).includes("timeGlitch"),amount:_n("timeGlitch",Ct,oo(),Xn),cols:Zt("timeGlitch",Ct,"cols",16,oo()),frameOffset:Zt("timeGlitch",Ct,"frameOffset",2,oo()),origin:Zt("timeGlitch",Ct,"origin",1,oo()),direction:Zt("timeGlitch",Ct,"direction",0,oo()),mode:Zt("timeGlitch",Ct,"mode",0,oo()),destWidth:t.width,destHeight:t.height}),Yn.tick?.(_t)};let F=(0,vS.default)(_t=>Qe.current(_t));if(F.start(),em({pause:()=>{F.stop(),ft.current?.()},resume:()=>{F.start(),A.current?.()}}),tm(()=>{pe.current=!1,dt.current()}),mS(Yn),pS(),zx(Yn.synth),e2({settingsRef:s,backingWidth:un,backingHeight:Uo,oscilloscopeBundleRef:Ht,neonGridBundleRef:Dt,textLayerBundleRef:vt,throughTheStarsBundleRef:bn,lumaDustBundleRef:Ft,lumaLockBundleRef:lt,metalEnvBundleRef:h,s3OverlayBindRef:Zn,textLayerRuntimeRef:tn,oscilloscopeBridgeReadyRef:et,neonGridBridgeReadyRef:gt,textLayerBridgeReadyRef:Ut,throughTheStarsBridgeReadyRef:vn,lumaDustBridgeReadyRef:on,lumaLockBridgeReadyRef:Pn,metalEnvBridgeReadyRef:Fn,neonGridWasEnabledRef:Pt,textLayerWasEnabledRef:$t,throughTheStarsWasEnabledRef:mo,lumaDustWasEnabledRef:Un,lumaLockWasEnabledRef:Mt}),ki(i.fx?.patternLayer)){let _t=i.fx.patternLayer.params;Yn.synth?.setFunction?.({name:"patternTuringDisplay",type:"src",inputs:[...la],glsl:Ha(xS(_t?.colorA,"#030306"),xS(_t?.colorB,"#f0abfc"))})}Yn.setResolution?.(un,Uo);let Bo=ie().s0?.regl;Bo&&(ny(Bo),D_(Bo),g1(Bo),Qb(Bo).then(()=>{requestAnimationFrame(()=>dt.current())})),Ze.current=()=>L1({applySceneDeferredRef:pe,hydraRef:m,settingsRef:s,studioModeRef:d,exportSettingsRef:y,outputMappingRef:D,transitionStateRef:X,activeChannelRef:K,reactionDiffForceSeedRef:Re,feedbackForceClearRef:ge,patternRdForceSeedRef:Fe,canvasRef:l,renderQualityRef:B,runHydraTickRef:Qe,electricNoiseCirclePackRef:Je,oscilloscopeBridgeReadyRef:et,neonGridBridgeReadyRef:gt,textLayerBridgeReadyRef:Ut,throughTheStarsBridgeReadyRef:vn,lumaDustBridgeReadyRef:on,lumaLockBridgeReadyRef:Pn,getFxState:Vr,getParamValue:Rr}),dt.current=()=>{if(Fo()){pe.current=!0;return}ie().hydraSettings=s.current,Ze.current(),Fo()||Qe.current(16.67)},Et.current=_t=>{let Ct=ie(),Xt=Ct.s0?.src,zt=Ct.s1?.src;if(!(Xt instanceof HTMLVideoElement)||!(zt instanceof HTMLVideoElement))return;let mn=_t??Ar(Xt.duration);k.current=mn,Vm([Xt,zt],mn)};let{loadPrimaryVideos:Ie,flushPendingVideoLoad:it}=cS({settingsRef:s,activeChannelRef:K,transitionStateRef:X,pendingVideoLoadRef:re,currentVideoRef:we,videoLoadSeqRef:Ye,clipLoadFreezeRef:ze,secondaryVideoRef:Ne,boomerangBridgeReadyRef:Sn,boomerangBackingRef:On,boomerangStateRef:Qt,syncPlaybackRef:Et,applySceneAndRenderRef:dt,bumpLumaDustReset:()=>{Ft.current&&el(Ft.current),queueMicrotask(()=>Ze.current())},teardownBoomerangBridge:()=>{},isPrimaryPlaybackActive:tr}),We=lS({settingsRef:s,studioModeRef:d,bpmRef:O,hydraRef:m,hydraRenderBudgetKeyRef:at,syncHydraRenderBudgetRef:nt,runHydraTickRef:Qe,hydraResizePauseRef:ft,hydraResizeResumeRef:A,syncElectricNoiseTriggerTexRef:M,transitionStateRef:X,pendingVideoLoadRef:re,activeChannelRef:K,clipLoadFreezeRef:ze,clipPeekDepsRef:Jn,onPlaybackCueRef:Go,boomerangBridgeReadyRef:Sn,boomerangBackingRef:On,boomerangCanvasBundleRef:Hn,boomerangStateRef:Qt,boomerangCaptureFpsCapRef:rn,boomerangMaxFramesCapRef:wn,currentSpeedSmoothedRef:k,fxReactiveTriggerGateRef:no,reactiveTriggerDescriptorsRef:er,electricNoiseCirclesRef:qe,electricNoiseCirclePackRef:Je,neonGridBundleRef:Dt,neonGridBridgeReadyRef:gt,neonGridRuntimeRef:bt,s3OverlayBindRef:Zn,throughTheStarsBundleRef:bn,throughTheStarsBridgeReadyRef:vn,lumaDustBundleRef:Ft,lumaDustBridgeReadyRef:on,lumaLockBundleRef:lt,lumaLockBridgeReadyRef:Pn,textLayerBundleRef:vt,textLayerBridgeReadyRef:Ut,textLayerRuntimeRef:tn,oscilloscopeBundleRef:Ht,oscilloscopeBridgeReadyRef:et,metalEnvBundleRef:h,metalEnvBridgeReadyRef:Fn,perfLastPrimaryRef:an,perfVideoSinkRef:Tn,perfPresentationLastRef:Mn,perfPresentationSinkRef:xn,wasStudioFrozenRef:p,flushPendingVideoLoad:it,getParamValue:Rr,resolvePrimaryVideoSpeed:Ar,resolveStarLayerPixels:$r,isTransportFrozen:()=>s.current.isVideoPlaying===!1,isStudioTransportRunning:()=>!1,isVisualTransportPlaying:tr,bootstrapTransportFreeze:()=>{at.current="",nt.current(!1),Qe.current(16.67)},reportPresentationMode:()=>{}});Re.current=2,Fe.current=4;let ke=o.map(_t=>({path:_t})),St=()=>{let _t=ol(s.current.fx),Ct=R2(ke,s.current.video,_t?.config??null,_t?.key??null);if(!Ct||Ct===Ne.current)return;Ne.current=Ct;let Xt=ie().s2;Xt?.initVideo&&(Xt.src instanceof HTMLVideoElement&&Xt.src.pause(),Xt.initVideo(Ct),window.setTimeout(()=>{let zt=ie().s2?.src;zt instanceof HTMLVideoElement&&(zt.muted=!0,zt.loop=!0,tr()&&zt.play().catch(()=>{}))},500))},en=Ie(!0);St(),dt.current();let pt=()=>{if(!tr())return;let _t=ie();ur(_t.s0?.src),ur(_t.s1?.src),ze.current=!1},At=[window.setTimeout(pt,250),window.setTimeout(pt,750)],wt=o.indexOf(i.video)>=0?o.indexOf(i.video):0,pn=_t=>{if(o.length===0)return;let Ct=(_t%o.length+o.length)%o.length;Ct===wt&&s.current.video===o[Ct]||(wt=Ct,s.current={...s.current,video:o[Ct]},ie().hydraSettings=s.current,en(),en=Ie(!1),St())},eo=()=>{let _t=bo();t.width===_t.width&&t.height===_t.height||Yn.setResolution?.(_t.width,_t.height)},fo=()=>eo();window.addEventListener("resize",fo),document.addEventListener("fullscreenchange",fo);let yo=new ResizeObserver(fo);return yo.observe(t),{clipCount:o.length,clipIndex:()=>wt,selectClip:pn,nextClip:()=>pn(wt+1),previousClip:()=>pn(wt-1),isPlaying:()=>s.current.isVideoPlaying!==!1,setPlaying:_t=>{if(s.current={...s.current,isVideoPlaying:_t},ie().hydraSettings=s.current,_t)pt();else{let Ct=ie();Ct.s0?.src instanceof HTMLVideoElement&&Ct.s0.src.pause(),Ct.s1?.src instanceof HTMLVideoElement&&Ct.s1.src.pause()}dt.current()},resize:eo,dispose:()=>{hu(),At.forEach(_t=>window.clearTimeout(_t)),yo.disconnect(),window.removeEventListener("resize",fo),document.removeEventListener("fullscreenchange",fo),We(),em(null),tm(null),F.stop(),en(),m.current=null}}}function GR(e){let t=document.createElement("canvas");return t.id="hexa-canvas",t.style.cssText="position:absolute;inset:0;width:100%;height:100%;display:block",e.appendChild(t),t}function UR(e){return document.fullscreenElement===e||e.contains(document.activeElement)?!0:e.matches(":hover")}async function wS(e){if(document.fullscreenElement){await document.exitFullscreen();return}await e.requestFullscreen()}function Rj(e){let t=e.container??document.body;getComputedStyle(t).position==="static"&&(t.style.position="relative"),t.style.overflow=t.style.overflow||"hidden",t.style.background=t.style.background||"#000";let n=GR(t),o=Bh(e.scene),r=SS({canvas:n,config:o,clips:e.scene.clips,clipIndex:e.scene.clipIndex}),i=e.chrome===!1?null:zh(t,{title:e.scene.title,clipCount:r.clipCount,onPrevious:()=>{r.previousClip(),i?.setClipIndex(r.clipIndex())},onNext:()=>{r.nextClip(),i?.setClipIndex(r.clipIndex())},onTogglePlay:()=>{let m=!r.isPlaying();return r.setPlaying(m),m},onToggleFullscreen:()=>{wS(t)}});i?.setClipIndex(r.clipIndex()),i?.setPlaying(r.isPlaying());let s=Uh({autoMix:o.fx?.autoMix,clipCount:r.clipCount,currentIndex:()=>r.clipIndex(),selectClip:m=>{r.selectClip(m),i?.setClipIndex(r.clipIndex())}}),l=m=>{if(UR(t))if(m.key===" "){m.preventDefault();let d=!r.isPlaying();r.setPlaying(d),i?.setPlaying(d)}else m.key==="ArrowRight"?(r.nextClip(),i?.setClipIndex(r.clipIndex())):m.key==="ArrowLeft"?(r.previousClip(),i?.setClipIndex(r.clipIndex())):m.key.toLowerCase()==="f"&&(m.preventDefault(),wS(t))};return window.addEventListener("keydown",l),{host:r,destroy:()=>{window.removeEventListener("keydown",l),s.stop(),i?.destroy(),r.dispose(),n.remove()}}}export{Rj as mountPlayer};
