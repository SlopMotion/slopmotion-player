var AM=Object.create;var ff=Object.defineProperty;var CM=Object.getOwnPropertyDescriptor;var EM=Object.getOwnPropertyNames;var RM=Object.getPrototypeOf,kM=Object.prototype.hasOwnProperty;var PM=(e,t,r)=>t in e?ff(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var FM=(e,t)=>()=>(e&&(t=e(e=0)),t);var Bo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var OM=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of EM(t))!kM.call(e,o)&&o!==r&&ff(e,o,{get:()=>t[o],enumerable:!(n=CM(t,o))||n.enumerable});return e};var us=(e,t,r)=>(r=e!=null?AM(RM(e)):{},OM(t||!e||!e.__esModule?ff(r,"default",{value:e,enumerable:!0}):r,e));var Il=(e,t,r)=>PM(e,typeof t!="symbol"?t+"":t,r);var w,u=FM(()=>{w={MODE:"production",PROD:!0,DEV:!1,SSR:!1,BASE_URL:"/",VITE_LOOP_ASSETS_FORCE_REMOTE:"1"}});var ph=Bo((zk,fh)=>{u();fh.exports=new Proxy({},{get:()=>null})});var zh=Bo((QP,Tf)=>{u();typeof Object.create=="function"?Tf.exports=function(t,r){r&&(t.super_=r,t.prototype=Object.create(r.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:Tf.exports=function(t,r){if(r){t.super_=r;var n=function(){};n.prototype=r.prototype,t.prototype=new n,t.prototype.constructor=t}}});var Yh=Bo((JP,jh)=>{u();function ln(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}jh.exports=ln;ln.EventEmitter=ln;ln.prototype._events=void 0;ln.prototype._maxListeners=void 0;ln.defaultMaxListeners=10;ln.prototype.setMaxListeners=function(e){if(!sL(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this};ln.prototype.emit=function(e){var t,r,n,o,i,s;if(this._events||(this._events={}),e==="error"&&(!this._events.error||ms(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var l=new Error('Uncaught, unspecified "error" event. ('+t+")");throw l.context=t,l}if(r=this._events[e],Xh(r))return!1;if(Do(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:o=Array.prototype.slice.call(arguments,1),r.apply(this,o)}else if(ms(r))for(o=Array.prototype.slice.call(arguments,1),s=r.slice(),n=s.length,i=0;i<n;i++)s[i].apply(this,o);return!0};ln.prototype.addListener=function(e,t){var r;if(!Do(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,Do(t.listener)?t.listener:t),this._events[e]?ms(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,ms(this._events[e])&&!this._events[e].warned&&(Xh(this._maxListeners)?r=ln.defaultMaxListeners:r=this._maxListeners,r&&r>0&&this._events[e].length>r&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),typeof console.trace=="function"&&console.trace())),this};ln.prototype.on=ln.prototype.addListener;ln.prototype.once=function(e,t){if(!Do(t))throw TypeError("listener must be a function");var r=!1;function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}return n.listener=t,this.on(e,n),this};ln.prototype.removeListener=function(e,t){var r,n,o,i;if(!Do(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(r=this._events[e],o=r.length,n=-1,r===t||Do(r.listener)&&r.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(ms(r)){for(i=o;i-- >0;)if(r[i]===t||r[i].listener&&r[i].listener===t){n=i;break}if(n<0)return this;r.length===1?(r.length=0,delete this._events[e]):r.splice(n,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this};ln.prototype.removeAllListeners=function(e){var t,r;if(!this._events)return this;if(!this._events.removeListener)return arguments.length===0?this._events={}:this._events[e]&&delete this._events[e],this;if(arguments.length===0){for(t in this._events)t!=="removeListener"&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(r=this._events[e],Do(r))this.removeListener(e,r);else if(r)for(;r.length;)this.removeListener(e,r[r.length-1]);return delete this._events[e],this};ln.prototype.listeners=function(e){var t;return!this._events||!this._events[e]?t=[]:Do(this._events[e])?t=[this._events[e]]:t=this._events[e].slice(),t};ln.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(Do(t))return 1;if(t)return t.length}return 0};ln.listenerCount=function(e,t){return e.listenerCount(t)};function Do(e){return typeof e=="function"}function sL(e){return typeof e=="number"}function ms(e){return typeof e=="object"&&e!==null}function Xh(e){return e===void 0}});var Kh=Bo((tF,qh)=>{u();qh.exports=globalThis.performance&&globalThis.performance.now?function(){return performance.now()}:Date.now||function(){return+new Date}});var Zh=Bo((Qh,hs)=>{u();(function(){var e,t,r,n,o,i;typeof performance<"u"&&performance!==null&&performance.now?hs.exports=function(){return performance.now()}:typeof process<"u"&&process!==null&&process.hrtime?(hs.exports=function(){return(e()-o)/1e6},t=process.hrtime,e=function(){var s;return s=t(),s[0]*1e9+s[1]},n=e(),i=process.uptime()*1e9,o=n-i):Date.now?(hs.exports=function(){return Date.now()-r},r=Date.now()):(hs.exports=function(){return new Date().getTime()-r},r=new Date().getTime())}).call(Qh)});var eg=Bo((oF,Ul)=>{u();var lL=Zh(),Ho=typeof window>"u"?globalThis:window,Gl=["moz","webkit"],pi="AnimationFrame",di=Ho["request"+pi],gs=Ho["cancel"+pi]||Ho["cancelRequest"+pi];for(fi=0;!di&&fi<Gl.length;fi++)di=Ho[Gl[fi]+"Request"+pi],gs=Ho[Gl[fi]+"Cancel"+pi]||Ho[Gl[fi]+"CancelRequest"+pi];var fi;(!di||!gs)&&(Wl=0,Mf=0,Jo=[],Jh=1e3/60,di=function(e){if(Jo.length===0){var t=lL(),r=Math.max(0,Jh-(t-Wl));Wl=r+t,setTimeout(function(){var n=Jo.slice(0);Jo.length=0;for(var o=0;o<n.length;o++)if(!n[o].cancelled)try{n[o].callback(Wl)}catch(i){setTimeout(function(){throw i},0)}},Math.round(r))}return Jo.push({handle:++Mf,callback:e,cancelled:!1}),Mf},gs=function(e){for(var t=0;t<Jo.length;t++)Jo[t].handle===e&&(Jo[t].cancelled=!0)});var Wl,Mf,Jo,Jh;Ul.exports=function(e){return di.call(Ho,e)};Ul.exports.cancel=function(){gs.apply(Ho,arguments)};Ul.exports.polyfill=function(e){e||(e=Ho),e.requestAnimationFrame=di,e.cancelAnimationFrame=gs}});var Af=Bo((iF,tg)=>{u();var cL=zh(),uL=Yh().EventEmitter,Lf=Kh(),wf=eg();tg.exports=wa;function wa(e){if(!(this instanceof wa))return new wa(e);this.running=!1,this.last=Lf(),this._frame=0,this._tick=this.tick.bind(this),e&&this.on("tick",e)}cL(wa,uL);wa.prototype.start=function(){if(!this.running)return this.running=!0,this.last=Lf(),this._frame=wf(this._tick),this};wa.prototype.stop=function(){return this.running=!1,this._frame!==0&&wf.cancel(this._frame),this._frame=0,this};wa.prototype.tick=function(){this._frame=wf(this._tick);var e=Lf(),t=e-this.last;this.emit("tick",t),this.last=e}});var ig=Bo((Ef,Rf)=>{u();(function(e,t){typeof Ef=="object"&&typeof Rf<"u"?Rf.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis<"u"?globalThis:e||self).Meyda=t()})(Ef,(function(){"use strict";function e(R,A,C){if(C||arguments.length===2)for(var f,oe=0,Te=A.length;oe<Te;oe++)!f&&oe in A||(f||(f=Array.prototype.slice.call(A,0,oe)),f[oe]=A[oe]);return R.concat(f||Array.prototype.slice.call(A))}var t=Object.freeze({__proto__:null,blackman:function(R){for(var A=new Float32Array(R),C=2*Math.PI/(R-1),f=2*C,oe=0;oe<R/2;oe++)A[oe]=.42-.5*Math.cos(oe*C)+.08*Math.cos(oe*f);for(oe=Math.ceil(R/2);oe>0;oe--)A[R-oe]=A[oe-1];return A},hamming:function(R){for(var A=new Float32Array(R),C=0;C<R;C++)A[C]=.54-.46*Math.cos(2*Math.PI*(C/R-1));return A},hanning:function(R){for(var A=new Float32Array(R),C=0;C<R;C++)A[C]=.5-.5*Math.cos(2*Math.PI*C/(R-1));return A},sine:function(R){for(var A=Math.PI/(R-1),C=new Float32Array(R),f=0;f<R;f++)C[f]=Math.sin(A*f);return C}}),r={};function n(R){for(;R%2==0&&R>1;)R/=2;return R===1}function o(R,A){if(A!=="rect"){if(A!==""&&A||(A="hanning"),r[A]||(r[A]={}),!r[A][R.length])try{r[A][R.length]=t[A](R.length)}catch{throw new Error("Invalid windowing function")}R=(function(C,f){for(var oe=[],Te=0;Te<Math.min(C.length,f.length);Te++)oe[Te]=C[Te]*f[Te];return oe})(R,r[A][R.length])}return R}function i(R,A,C){for(var f=new Float32Array(R),oe=0;oe<f.length;oe++)f[oe]=oe*A/C,f[oe]=13*Math.atan(f[oe]/1315.8)+3.5*Math.atan(Math.pow(f[oe]/7518,2));return f}function s(R){return Float32Array.from(R)}function l(R){return 1125*Math.log(1+R/700)}function p(R,A,C){for(var f,oe=new Float32Array(R+2),Te=new Float32Array(R+2),qe=A/2,Ve=l(0),Ne=(l(qe)-Ve)/(R+1),Xe=new Array(R+2),Je=0;Je<oe.length;Je++)oe[Je]=Je*Ne,Te[Je]=(f=oe[Je],700*(Math.exp(f/1125)-1)),Xe[Je]=Math.floor((C+1)*Te[Je]/A);for(var It=new Array(R),et=0;et<It.length;et++){for(It[et]=new Array(C/2+1).fill(0),Je=Xe[et];Je<Xe[et+1];Je++)It[et][Je]=(Je-Xe[et])/(Xe[et+1]-Xe[et]);for(Je=Xe[et+1];Je<Xe[et+2];Je++)It[et][Je]=(Xe[et+2]-Je)/(Xe[et+2]-Xe[et+1])}return It}function d(R,A,C,f,oe,Te,qe){f===void 0&&(f=5),oe===void 0&&(oe=2),Te===void 0&&(Te=!0),qe===void 0&&(qe=440);var Ve=Math.floor(C/2)+1,Ne=new Array(C).fill(0).map((function(_t,Ut){return R*(function(tr,zt){return Math.log2(16*tr/zt)})(A*Ut/C,qe)}));Ne[0]=Ne[1]-1.5*R;var Xe,Je,It,et=Ne.slice(1).map((function(_t,Ut){return Math.max(_t-Ne[Ut])}),1).concat([1]),Ht=Math.round(R/2),bt=new Array(R).fill(0).map((function(_t,Ut){return Ne.map((function(tr){return(10*R+Ht+tr-Ut)%R-Ht}))})),yt=bt.map((function(_t,Ut){return _t.map((function(tr,zt){return Math.exp(-.5*Math.pow(2*bt[Ut][zt]/et[zt],2))}))}));if(Je=(Xe=yt)[0].map((function(){return 0})),It=Xe.reduce((function(_t,Ut){return Ut.forEach((function(tr,zt){_t[zt]+=Math.pow(tr,2)})),_t}),Je).map(Math.sqrt),yt=Xe.map((function(_t,Ut){return _t.map((function(tr,zt){return tr/(It[zt]||1)}))})),oe){var Pt=Ne.map((function(_t){return Math.exp(-.5*Math.pow((_t/R-f)/oe,2))}));yt=yt.map((function(_t){return _t.map((function(Ut,tr){return Ut*Pt[tr]}))}))}return Te&&(yt=e(e([],yt.slice(3),!0),yt.slice(0,3),!0)),yt.map((function(_t){return _t.slice(0,Ve)}))}function v(R,A){for(var C=0,f=0,oe=0;oe<A.length;oe++)C+=Math.pow(oe,R)*Math.abs(A[oe]),f+=A[oe];return C/f}function H(R){var A=R.ampSpectrum,C=R.barkScale,f=R.numberOfBarkBands,oe=f===void 0?24:f;if(typeof A!="object"||typeof C!="object")throw new TypeError;var Te=oe,qe=new Float32Array(Te),Ve=0,Ne=A,Xe=new Int32Array(Te+1);Xe[0]=0;for(var Je=C[Ne.length-1]/Te,It=1,et=0;et<Ne.length;et++)for(;C[et]>Je;)Xe[It++]=et,Je=It*C[Ne.length-1]/Te;for(Xe[Te]=Ne.length-1,et=0;et<Te;et++){for(var Ht=0,bt=Xe[et];bt<Xe[et+1];bt++)Ht+=Ne[bt];qe[et]=Math.pow(Ht,.23)}for(et=0;et<qe.length;et++)Ve+=qe[et];return{specific:qe,total:Ve}}function D(R){var A=R.ampSpectrum;if(typeof A!="object")throw new TypeError;for(var C=new Float32Array(A.length),f=0;f<C.length;f++)C[f]=Math.pow(A[f],2);return C}function O(R){var A=R.ampSpectrum,C=R.melFilterBank,f=R.bufferSize;if(typeof A!="object")throw new TypeError("Valid ampSpectrum is required to generate melBands");if(typeof C!="object")throw new TypeError("Valid melFilterBank is required to generate melBands");for(var oe=D({ampSpectrum:A}),Te=C.length,qe=Array(Te),Ve=new Float32Array(Te),Ne=0;Ne<Ve.length;Ne++){qe[Ne]=new Float32Array(f/2),Ve[Ne]=0;for(var Xe=0;Xe<f/2;Xe++)qe[Ne][Xe]=C[Ne][Xe]*oe[Xe],Ve[Ne]+=qe[Ne][Xe];Ve[Ne]=Math.log(Ve[Ne]+1)}return Array.prototype.slice.call(Ve)}function K(R){return R&&R.__esModule&&Object.prototype.hasOwnProperty.call(R,"default")?R.default:R}var Y=null,fe=K((function(R,A){var C=R.length;return A=A||2,Y&&Y[C]||(function(f){(Y=Y||{})[f]=new Array(f*f);for(var oe=Math.PI/f,Te=0;Te<f;Te++)for(var qe=0;qe<f;qe++)Y[f][qe+Te*f]=Math.cos(oe*(qe+.5)*Te)})(C),R.map((function(){return 0})).map((function(f,oe){return A*R.reduce((function(Te,qe,Ve,Ne){return Te+qe*Y[C][Ve+oe*C]}),0)}))})),Ee=Object.freeze({__proto__:null,amplitudeSpectrum:function(R){return R.ampSpectrum},buffer:function(R){return R.signal},chroma:function(R){var A=R.ampSpectrum,C=R.chromaFilterBank;if(typeof A!="object")throw new TypeError("Valid ampSpectrum is required to generate chroma");if(typeof C!="object")throw new TypeError("Valid chromaFilterBank is required to generate chroma");var f=C.map((function(Te,qe){return A.reduce((function(Ve,Ne,Xe){return Ve+Ne*Te[Xe]}),0)})),oe=Math.max.apply(Math,f);return oe?f.map((function(Te){return Te/oe})):f},complexSpectrum:function(R){return R.complexSpectrum},energy:function(R){var A=R.signal;if(typeof A!="object")throw new TypeError;for(var C=0,f=0;f<A.length;f++)C+=Math.pow(Math.abs(A[f]),2);return C},loudness:H,melBands:O,mfcc:function(R){var A=R.ampSpectrum,C=R.melFilterBank,f=R.numberOfMFCCCoefficients,oe=R.bufferSize,Te=Math.min(40,Math.max(1,f||13));if(C.length<Te)throw new Error("Insufficient filter bank for requested number of coefficients");var qe=O({ampSpectrum:A,melFilterBank:C,bufferSize:oe});return fe(qe).slice(0,Te)},perceptualSharpness:function(R){for(var A=H({ampSpectrum:R.ampSpectrum,barkScale:R.barkScale}),C=A.specific,f=0,oe=0;oe<C.length;oe++)f+=oe<15?(oe+1)*C[oe+1]:.066*Math.exp(.171*(oe+1));return f*=.11/A.total},perceptualSpread:function(R){for(var A=H({ampSpectrum:R.ampSpectrum,barkScale:R.barkScale}),C=0,f=0;f<A.specific.length;f++)A.specific[f]>C&&(C=A.specific[f]);return Math.pow((A.total-C)/A.total,2)},powerSpectrum:D,rms:function(R){var A=R.signal;if(typeof A!="object")throw new TypeError;for(var C=0,f=0;f<A.length;f++)C+=Math.pow(A[f],2);return C/=A.length,C=Math.sqrt(C)},spectralCentroid:function(R){var A=R.ampSpectrum;if(typeof A!="object")throw new TypeError;return v(1,A)},spectralCrest:function(R){var A=R.ampSpectrum;if(typeof A!="object")throw new TypeError;var C=0,f=-1/0;return A.forEach((function(oe){C+=Math.pow(oe,2),f=oe>f?oe:f})),C/=A.length,C=Math.sqrt(C),f/C},spectralFlatness:function(R){var A=R.ampSpectrum;if(typeof A!="object")throw new TypeError;for(var C=0,f=0,oe=0;oe<A.length;oe++)C+=Math.log(A[oe]),f+=A[oe];return Math.exp(C/A.length)*A.length/f},spectralFlux:function(R){var A=R.signal,C=R.previousSignal,f=R.bufferSize;if(typeof A!="object"||typeof C!="object")throw new TypeError;for(var oe=0,Te=-f/2;Te<A.length/2-1;Te++)x=Math.abs(A[Te])-Math.abs(C[Te]),oe+=(x+Math.abs(x))/2;return oe},spectralKurtosis:function(R){var A=R.ampSpectrum;if(typeof A!="object")throw new TypeError;var C=A,f=v(1,C),oe=v(2,C),Te=v(3,C),qe=v(4,C);return(-3*Math.pow(f,4)+6*f*oe-4*f*Te+qe)/Math.pow(Math.sqrt(oe-Math.pow(f,2)),4)},spectralRolloff:function(R){var A=R.ampSpectrum,C=R.sampleRate;if(typeof A!="object")throw new TypeError;for(var f=A,oe=C/(2*(f.length-1)),Te=0,qe=0;qe<f.length;qe++)Te+=f[qe];for(var Ve=.99*Te,Ne=f.length-1;Te>Ve&&Ne>=0;)Te-=f[Ne],--Ne;return(Ne+1)*oe},spectralSkewness:function(R){var A=R.ampSpectrum;if(typeof A!="object")throw new TypeError;var C=v(1,A),f=v(2,A),oe=v(3,A);return(2*Math.pow(C,3)-3*C*f+oe)/Math.pow(Math.sqrt(f-Math.pow(C,2)),3)},spectralSlope:function(R){var A=R.ampSpectrum,C=R.sampleRate,f=R.bufferSize;if(typeof A!="object")throw new TypeError;for(var oe=0,Te=0,qe=new Float32Array(A.length),Ve=0,Ne=0,Xe=0;Xe<A.length;Xe++){oe+=A[Xe];var Je=Xe*C/f;qe[Xe]=Je,Ve+=Je*Je,Te+=Je,Ne+=Je*A[Xe]}return(A.length*Ne-Te*oe)/(oe*(Ve-Math.pow(Te,2)))},spectralSpread:function(R){var A=R.ampSpectrum;if(typeof A!="object")throw new TypeError;return Math.sqrt(v(2,A)-Math.pow(v(1,A),2))},zcr:function(R){var A=R.signal;if(typeof A!="object")throw new TypeError;for(var C=0,f=1;f<A.length;f++)(A[f-1]>=0&&A[f]<0||A[f-1]<0&&A[f]>=0)&&C++;return C}});function be(R){if(Array.isArray(R)){for(var A=0,C=Array(R.length);A<R.length;A++)C[A]=R[A];return C}return Array.from(R)}var Fe={},Qe={},Ze={bitReverseArray:function(R){if(Fe[R]===void 0){for(var A=(R-1).toString(2).length,C="0".repeat(A),f={},oe=0;oe<R;oe++){var Te=oe.toString(2);Te=C.substr(Te.length)+Te,Te=[].concat(be(Te)).reverse().join(""),f[oe]=parseInt(Te,2)}Fe[R]=f}return Fe[R]},multiply:function(R,A){return{real:R.real*A.real-R.imag*A.imag,imag:R.real*A.imag+R.imag*A.real}},add:function(R,A){return{real:R.real+A.real,imag:R.imag+A.imag}},subtract:function(R,A){return{real:R.real-A.real,imag:R.imag-A.imag}},euler:function(R,A){var C=-2*Math.PI*R/A;return{real:Math.cos(C),imag:Math.sin(C)}},conj:function(R){return R.imag*=-1,R},constructComplexArray:function(R){var A={};A.real=R.real===void 0?R.slice():R.real.slice();var C=A.real.length;return Qe[C]===void 0&&(Qe[C]=Array.apply(null,Array(C)).map(Number.prototype.valueOf,0)),A.imag=Qe[C].slice(),A}},dt=function(R){var A={};R.real===void 0||R.imag===void 0?A=Ze.constructComplexArray(R):(A.real=R.real.slice(),A.imag=R.imag.slice());var C=A.real.length,f=Math.log2(C);if(Math.round(f)!=f)throw new Error("Input size must be a power of 2.");if(A.real.length!=A.imag.length)throw new Error("Real and imaginary components must have the same length.");for(var oe=Ze.bitReverseArray(C),Te={real:[],imag:[]},qe=0;qe<C;qe++)Te.real[oe[qe]]=A.real[qe],Te.imag[oe[qe]]=A.imag[qe];for(var Ve=0;Ve<C;Ve++)A.real[Ve]=Te.real[Ve],A.imag[Ve]=Te.imag[Ve];for(var Ne=1;Ne<=f;Ne++)for(var Xe=Math.pow(2,Ne),Je=0;Je<Xe/2;Je++)for(var It=Ze.euler(Je,Xe),et=0;et<C/Xe;et++){var Ht=Xe*et+Je,bt=Xe*et+Je+Xe/2,yt={real:A.real[Ht],imag:A.imag[Ht]},Pt={real:A.real[bt],imag:A.imag[bt]},_t=Ze.multiply(It,Pt),Ut=Ze.subtract(yt,_t);A.real[bt]=Ut.real,A.imag[bt]=Ut.imag;var tr=Ze.add(_t,yt);A.real[Ht]=tr.real,A.imag[Ht]=tr.imag}return A},kt=dt,at=(function(){function R(A,C){var f=this;if(this._m=C,!A.audioContext)throw this._m.errors.noAC;if(A.bufferSize&&!n(A.bufferSize))throw this._m._errors.notPow2;if(!A.source)throw this._m._errors.noSource;this._m.audioContext=A.audioContext,this._m.bufferSize=A.bufferSize||this._m.bufferSize||256,this._m.hopSize=A.hopSize||this._m.hopSize||this._m.bufferSize,this._m.sampleRate=A.sampleRate||this._m.audioContext.sampleRate||44100,this._m.callback=A.callback,this._m.windowingFunction=A.windowingFunction||"hanning",this._m.featureExtractors=Ee,this._m.EXTRACTION_STARTED=A.startImmediately||!1,this._m.channel=typeof A.channel=="number"?A.channel:0,this._m.inputs=A.inputs||1,this._m.outputs=A.outputs||1,this._m.numberOfMFCCCoefficients=A.numberOfMFCCCoefficients||this._m.numberOfMFCCCoefficients||13,this._m.numberOfBarkBands=A.numberOfBarkBands||this._m.numberOfBarkBands||24,this._m.spn=this._m.audioContext.createScriptProcessor(this._m.bufferSize,this._m.inputs,this._m.outputs),this._m.spn.connect(this._m.audioContext.destination),this._m._featuresToExtract=A.featureExtractors||[],this._m.barkScale=i(this._m.bufferSize,this._m.sampleRate,this._m.bufferSize),this._m.melFilterBank=p(Math.max(this._m.melBands,this._m.numberOfMFCCCoefficients),this._m.sampleRate,this._m.bufferSize),this._m.inputData=null,this._m.previousInputData=null,this._m.frame=null,this._m.previousFrame=null,this.setSource(A.source),this._m.spn.onaudioprocess=function(oe){var Te;f._m.inputData!==null&&(f._m.previousInputData=f._m.inputData),f._m.inputData=oe.inputBuffer.getChannelData(f._m.channel),f._m.previousInputData?((Te=new Float32Array(f._m.previousInputData.length+f._m.inputData.length-f._m.hopSize)).set(f._m.previousInputData.slice(f._m.hopSize)),Te.set(f._m.inputData,f._m.previousInputData.length-f._m.hopSize)):Te=f._m.inputData;var qe=(function(Ve,Ne,Xe){if(Ve.length<Ne)throw new Error("Buffer is too short for frame length");if(Xe<1)throw new Error("Hop length cannot be less that 1");if(Ne<1)throw new Error("Frame length cannot be less that 1");var Je=1+Math.floor((Ve.length-Ne)/Xe);return new Array(Je).fill(0).map((function(It,et){return Ve.slice(et*Xe,et*Xe+Ne)}))})(Te,f._m.bufferSize,f._m.hopSize);qe.forEach((function(Ve){f._m.frame=Ve;var Ne=f._m.extract(f._m._featuresToExtract,f._m.frame,f._m.previousFrame);typeof f._m.callback=="function"&&f._m.EXTRACTION_STARTED&&f._m.callback(Ne),f._m.previousFrame=f._m.frame}))}}return R.prototype.start=function(A){this._m._featuresToExtract=A||this._m._featuresToExtract,this._m.EXTRACTION_STARTED=!0},R.prototype.stop=function(){this._m.EXTRACTION_STARTED=!1},R.prototype.setSource=function(A){this._m.source&&this._m.source.disconnect(this._m.spn),this._m.source=A,this._m.source.connect(this._m.spn)},R.prototype.setChannel=function(A){A<=this._m.inputs?this._m.channel=A:console.error("Channel ".concat(A," does not exist. Make sure you've provided a value for 'inputs' that is greater than ").concat(A," when instantiating the MeydaAnalyzer"))},R.prototype.get=function(A){return this._m.inputData?this._m.extract(A||this._m._featuresToExtract,this._m.inputData,this._m.previousInputData):null},R})(),rt={audioContext:null,spn:null,bufferSize:512,sampleRate:44100,melBands:26,chromaBands:12,callback:null,windowingFunction:"hanning",featureExtractors:Ee,EXTRACTION_STARTED:!1,numberOfMFCCCoefficients:13,numberOfBarkBands:24,_featuresToExtract:[],windowing:o,_errors:{notPow2:new Error("Meyda: Buffer size must be a power of 2, e.g. 64 or 512"),featureUndef:new Error("Meyda: No features defined."),invalidFeatureFmt:new Error("Meyda: Invalid feature format"),invalidInput:new Error("Meyda: Invalid input."),noAC:new Error("Meyda: No AudioContext specified."),noSource:new Error("Meyda: No source node specified.")},createMeydaAnalyzer:function(R){return new at(R,Object.assign({},rt))},listAvailableFeatureExtractors:function(){return Object.keys(this.featureExtractors)},extract:function(R,A,C){var f=this;if(!A)throw this._errors.invalidInput;if(typeof A!="object")throw this._errors.invalidInput;if(!R)throw this._errors.featureUndef;if(!n(A.length))throw this._errors.notPow2;this.barkScale!==void 0&&this.barkScale.length==this.bufferSize||(this.barkScale=i(this.bufferSize,this.sampleRate,this.bufferSize)),this.melFilterBank!==void 0&&this.barkScale.length==this.bufferSize&&this.melFilterBank.length==this.melBands||(this.melFilterBank=p(Math.max(this.melBands,this.numberOfMFCCCoefficients),this.sampleRate,this.bufferSize)),this.chromaFilterBank!==void 0&&this.chromaFilterBank.length==this.chromaBands||(this.chromaFilterBank=d(this.chromaBands,this.sampleRate,this.bufferSize)),"buffer"in A&&A.buffer===void 0?this.signal=s(A):this.signal=A;var oe=mt(A,this.windowingFunction,this.bufferSize);if(this.signal=oe.windowedSignal,this.complexSpectrum=oe.complexSpectrum,this.ampSpectrum=oe.ampSpectrum,C){var Te=mt(C,this.windowingFunction,this.bufferSize);this.previousSignal=Te.windowedSignal,this.previousComplexSpectrum=Te.complexSpectrum,this.previousAmpSpectrum=Te.ampSpectrum}var qe=function(Ve){return f.featureExtractors[Ve]({ampSpectrum:f.ampSpectrum,chromaFilterBank:f.chromaFilterBank,complexSpectrum:f.complexSpectrum,signal:f.signal,bufferSize:f.bufferSize,sampleRate:f.sampleRate,barkScale:f.barkScale,melFilterBank:f.melFilterBank,previousSignal:f.previousSignal,previousAmpSpectrum:f.previousAmpSpectrum,previousComplexSpectrum:f.previousComplexSpectrum,numberOfMFCCCoefficients:f.numberOfMFCCCoefficients,numberOfBarkBands:f.numberOfBarkBands})};if(typeof R=="object")return R.reduce((function(Ve,Ne){var Xe;return Object.assign({},Ve,((Xe={})[Ne]=qe(Ne),Xe))}),{});if(typeof R=="string")return qe(R);throw this._errors.invalidFeatureFmt}},mt=function(R,A,C){var f={};R.buffer===void 0?f.signal=s(R):f.signal=R,f.windowedSignal=o(f.signal,A),f.complexSpectrum=kt(f.windowedSignal),f.ampSpectrum=new Float32Array(C/2);for(var oe=0;oe<C/2;oe++)f.ampSpectrum[oe]=Math.sqrt(Math.pow(f.complexSpectrum.real[oe],2)+Math.pow(f.complexSpectrum.imag[oe],2));return f};return typeof window<"u"&&(window.Meyda=rt),rt}))});var xg=Bo((Nf,Gf)=>{u();(function(e,t){typeof Nf=="object"&&typeof Gf<"u"?Gf.exports=t():typeof define=="function"&&define.amd?define(t):e.createREGL=t()})(Nf,(function(){"use strict";var e=function(c){return c instanceof Uint8Array||c instanceof Uint16Array||c instanceof Uint32Array||c instanceof Int8Array||c instanceof Int16Array||c instanceof Int32Array||c instanceof Float32Array||c instanceof Float64Array||c instanceof Uint8ClampedArray},t=function(c,g){for(var L=Object.keys(g),Z=0;Z<L.length;++Z)c[L[Z]]=g[L[Z]];return c},r=`
`;function n(c){return typeof atob<"u"?atob(c):"base64:"+c}function o(c){var g=new Error("(regl) "+c);throw console.error(g),g}function i(c,g){c||o(g)}function s(c){return c?": "+c:""}function l(c,g,L){c in g||o("unknown parameter ("+c+")"+s(L)+". possible values: "+Object.keys(g).join())}function p(c,g){e(c)||o("invalid parameter type"+s(g)+". must be a typed array")}function d(c,g){switch(g){case"number":return typeof c=="number";case"object":return typeof c=="object";case"string":return typeof c=="string";case"boolean":return typeof c=="boolean";case"function":return typeof c=="function";case"undefined":return typeof c>"u";case"symbol":return typeof c=="symbol"}}function v(c,g,L){d(c,g)||o("invalid parameter type"+s(L)+". expected "+g+", got "+typeof c)}function H(c,g){c>=0&&(c|0)===c||o("invalid parameter type, ("+c+")"+s(g)+". must be a nonnegative integer")}function D(c,g,L){g.indexOf(c)<0&&o("invalid value"+s(L)+". must be one of: "+g)}var O=["gl","canvas","container","attributes","pixelRatio","extensions","optionalExtensions","profile","onDone"];function K(c){Object.keys(c).forEach(function(g){O.indexOf(g)<0&&o('invalid regl constructor argument "'+g+'". must be one of '+O)})}function Y(c,g){for(c=c+"";c.length<g;)c=" "+c;return c}function fe(){this.name="unknown",this.lines=[],this.index={},this.hasErrors=!1}function Ee(c,g){this.number=c,this.line=g,this.errors=[]}function be(c,g,L){this.file=c,this.line=g,this.message=L}function Fe(){var c=new Error,g=(c.stack||c).toString(),L=/compileProcedure.*\n\s*at.*\((.*)\)/.exec(g);if(L)return L[1];var Z=/compileProcedure.*\n\s*at\s+(.*)(\n|$)/.exec(g);return Z?Z[1]:"unknown"}function Qe(){var c=new Error,g=(c.stack||c).toString(),L=/at REGLCommand.*\n\s+at.*\((.*)\)/.exec(g);if(L)return L[1];var Z=/at REGLCommand.*\n\s+at\s+(.*)\n/.exec(g);return Z?Z[1]:"unknown"}function Ze(c,g){var L=c.split(`
`),Z=1,ce=0,Q={unknown:new fe,0:new fe};Q.unknown.name=Q[0].name=g||Fe(),Q.unknown.lines.push(new Ee(0,""));for(var re=0;re<L.length;++re){var ye=L[re],ve=/^\s*#\s*(\w+)\s+(.+)\s*$/.exec(ye);if(ve)switch(ve[1]){case"line":var we=/(\d+)(\s+\d+)?/.exec(ve[2]);we&&(Z=we[1]|0,we[2]&&(ce=we[2]|0,ce in Q||(Q[ce]=new fe)));break;case"define":var _e=/SHADER_NAME(_B64)?\s+(.*)$/.exec(ve[2]);_e&&(Q[ce].name=_e[1]?n(_e[2]):_e[2]);break}Q[ce].lines.push(new Ee(Z++,ye))}return Object.keys(Q).forEach(function(Re){var De=Q[Re];De.lines.forEach(function(xe){De.index[xe.number]=xe})}),Q}function dt(c){var g=[];return c.split(`
`).forEach(function(L){if(!(L.length<5)){var Z=/^ERROR:\s+(\d+):(\d+):\s*(.*)$/.exec(L);Z?g.push(new be(Z[1]|0,Z[2]|0,Z[3].trim())):L.length>0&&g.push(new be("unknown",0,L))}}),g}function kt(c,g){g.forEach(function(L){var Z=c[L.file];if(Z){var ce=Z.index[L.line];if(ce){ce.errors.push(L),Z.hasErrors=!0;return}}c.unknown.hasErrors=!0,c.unknown.lines[0].errors.push(L)})}function at(c,g,L,Z,ce){if(!c.getShaderParameter(g,c.COMPILE_STATUS)){var Q=c.getShaderInfoLog(g),re=Z===c.FRAGMENT_SHADER?"fragment":"vertex";oe(L,"string",re+" shader source must be a string",ce);var ye=Ze(L,ce),ve=dt(Q);kt(ye,ve),Object.keys(ye).forEach(function(we){var _e=ye[we];if(!_e.hasErrors)return;var Re=[""],De=[""];function xe(ke,$){Re.push(ke),De.push($||"")}xe("file number "+we+": "+_e.name+`
`,"color:red;text-decoration:underline;font-weight:bold"),_e.lines.forEach(function(ke){if(ke.errors.length>0){xe(Y(ke.number,4)+"|  ","background-color:yellow; font-weight:bold"),xe(ke.line+r,"color:red; background-color:yellow; font-weight:bold");var $=0;ke.errors.forEach(function(ne){var Le=ne.message,We=/^\s*'(.*)'\s*:\s*(.*)$/.exec(Le);if(We){var de=We[1];Le=We[2],de==="assign"&&(de="="),$=Math.max(ke.line.indexOf(de,$),0)}else $=0;xe(Y("| ",6)),xe(Y("^^^",$+3)+r,"font-weight:bold"),xe(Y("| ",6)),xe(Le+r,"font-weight:bold")}),xe(Y("| ",6)+r)}else xe(Y(ke.number,4)+"|  "),xe(ke.line+r,"color:red")}),typeof document<"u"&&!window.chrome?(De[0]=Re.join("%c"),console.log.apply(console,De)):console.log(Re.join(""))}),i.raise("Error compiling "+re+" shader, "+ye[0].name)}}function rt(c,g,L,Z,ce){if(!c.getProgramParameter(g,c.LINK_STATUS)){var Q=c.getProgramInfoLog(g),re=Ze(L,ce),ye=Ze(Z,ce),ve='Error linking program with vertex shader, "'+ye[0].name+'", and fragment shader "'+re[0].name+'"';typeof document<"u"?console.log("%c"+ve+r+"%c"+Q,"color:red;text-decoration:underline;font-weight:bold","color:red"):console.log(ve+r+Q),i.raise(ve)}}function mt(c){c._commandRef=Fe()}function R(c,g,L,Z){mt(c);function ce(ve){return ve?Z.id(ve):0}c._fragId=ce(c.static.frag),c._vertId=ce(c.static.vert);function Q(ve,we){Object.keys(we).forEach(function(_e){ve[Z.id(_e)]=!0})}var re=c._uniformSet={};Q(re,g.static),Q(re,g.dynamic);var ye=c._attributeSet={};Q(ye,L.static),Q(ye,L.dynamic),c._hasCount="count"in c.static||"count"in c.dynamic||"elements"in c.static||"elements"in c.dynamic}function A(c,g){var L=Qe();o(c+" in command "+(g||Fe())+(L==="unknown"?"":" called from "+L))}function C(c,g,L){c||A(g,L||Fe())}function f(c,g,L,Z){c in g||A("unknown parameter ("+c+")"+s(L)+". possible values: "+Object.keys(g).join(),Z||Fe())}function oe(c,g,L,Z){d(c,g)||A("invalid parameter type"+s(L)+". expected "+g+", got "+typeof c,Z||Fe())}function Te(c){c()}function qe(c,g,L){c.texture?D(c.texture._texture.internalformat,g,"unsupported texture format for attachment"):D(c.renderbuffer._renderbuffer.format,L,"unsupported renderbuffer format for attachment")}var Ve=33071,Ne=9728,Xe=9984,Je=9985,It=9986,et=9987,Ht=5120,bt=5121,yt=5122,Pt=5123,_t=5124,Ut=5125,tr=5126,zt=32819,br=32820,vr=33635,pn=34042,Ft=36193,nr={};nr[Ht]=nr[bt]=1,nr[yt]=nr[Pt]=nr[Ft]=nr[vr]=nr[zt]=nr[br]=2,nr[_t]=nr[Ut]=nr[tr]=nr[pn]=4;function Wr(c,g){return c===br||c===zt||c===vr?2:c===pn?4:nr[c]*g}function lt(c){return!(c&c-1)&&!!c}function kr(c,g,L){var Z,ce=g.width,Q=g.height,re=g.channels;i(ce>0&&ce<=L.maxTextureSize&&Q>0&&Q<=L.maxTextureSize,"invalid texture shape"),(c.wrapS!==Ve||c.wrapT!==Ve)&&i(lt(ce)&&lt(Q),"incompatible wrap mode for texture, both width and height must be power of 2"),g.mipmask===1?ce!==1&&Q!==1&&i(c.minFilter!==Xe&&c.minFilter!==It&&c.minFilter!==Je&&c.minFilter!==et,"min filter requires mipmap"):(i(lt(ce)&&lt(Q),"texture must be a square power of 2 to support mipmapping"),i(g.mipmask===(ce<<1)-1,"missing or incomplete mipmap data")),g.type===tr&&(L.extensions.indexOf("oes_texture_float_linear")<0&&i(c.minFilter===Ne&&c.magFilter===Ne,"filter not supported, must enable oes_texture_float_linear"),i(!c.genMipmaps,"mipmap generation not supported with float textures"));var ye=g.images;for(Z=0;Z<16;++Z)if(ye[Z]){var ve=ce>>Z,we=Q>>Z;i(g.mipmask&1<<Z,"missing mipmap data");var _e=ye[Z];if(i(_e.width===ve&&_e.height===we,"invalid shape for mip images"),i(_e.format===g.format&&_e.internalformat===g.internalformat&&_e.type===g.type,"incompatible type for mip image"),!_e.compressed)if(_e.data){var Re=Math.ceil(Wr(_e.type,re)*ve/_e.unpackAlignment)*_e.unpackAlignment;i(_e.data.byteLength===Re*we,"invalid data for image, buffer size is inconsistent with image format")}else _e.element||_e.copy}else c.genMipmaps||i((g.mipmask&1<<Z)===0,"extra mipmap data");g.compressed&&i(!c.genMipmaps,"mipmap generation for compressed images not supported")}function wt(c,g,L,Z){var ce=c.width,Q=c.height,re=c.channels;i(ce>0&&ce<=Z.maxTextureSize&&Q>0&&Q<=Z.maxTextureSize,"invalid texture shape"),i(ce===Q,"cube map must be square"),i(g.wrapS===Ve&&g.wrapT===Ve,"wrap mode not supported by cube map");for(var ye=0;ye<L.length;++ye){var ve=L[ye];i(ve.width===ce&&ve.height===Q,"inconsistent cube map face shape"),g.genMipmaps&&(i(!ve.compressed,"can not generate mipmap for compressed textures"),i(ve.mipmask===1,"can not specify mipmaps and generate mipmaps"));for(var we=ve.images,_e=0;_e<16;++_e){var Re=we[_e];if(Re){var De=ce>>_e,xe=Q>>_e;i(ve.mipmask&1<<_e,"missing mipmap data"),i(Re.width===De&&Re.height===xe,"invalid shape for mip images"),i(Re.format===c.format&&Re.internalformat===c.internalformat&&Re.type===c.type,"incompatible type for mip image"),Re.compressed||(Re.data?i(Re.data.byteLength===De*xe*Math.max(Wr(Re.type,re),Re.unpackAlignment),"invalid data for image, buffer size is inconsistent with image format"):Re.element||Re.copy)}}}}var h=t(i,{optional:Te,raise:o,commandRaise:A,command:C,parameter:l,commandParameter:f,constructor:K,type:v,commandType:oe,isTypedArray:p,nni:H,oneOf:D,shaderError:at,linkError:rt,callSite:Qe,saveCommandRef:mt,saveDrawInfo:R,framebufferFormat:qe,guessCommand:Fe,texture2D:kr,textureCube:wt}),Pr=0,Qr=0,_r=5,Fr=6;function Or(c,g){this.id=Pr++,this.type=c,this.data=g}function Qt(c){return c.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function or(c){if(c.length===0)return[];var g=c.charAt(0),L=c.charAt(c.length-1);if(c.length>1&&g===L&&(g==='"'||g==="'"))return['"'+Qt(c.substr(1,c.length-2))+'"'];var Z=/\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(c);if(Z)return or(c.substr(0,Z.index)).concat(or(Z[1])).concat(or(c.substr(Z.index+Z[0].length)));var ce=c.split(".");if(ce.length===1)return['"'+Qt(c)+'"'];for(var Q=[],re=0;re<ce.length;++re)Q=Q.concat(or(ce[re]));return Q}function Sr(c){return"["+or(c).join("][")+"]"}function ar(c,g){return new Or(c,Sr(g+""))}function Tr(c){return typeof c=="function"&&!c._reglType||c instanceof Or}function Lr(c,g){if(typeof c=="function")return new Or(Qr,c);if(typeof c=="number"||typeof c=="boolean")return new Or(_r,c);if(Array.isArray(c))return new Or(Fr,c.map((L,Z)=>Lr(L,g+"["+Z+"]")));if(c instanceof Or)return c;h(!1,"invalid option type in uniform "+g)}var xr={DynamicVariable:Or,define:ar,isDynamic:Tr,unbox:Lr,accessor:Sr},Zr={next:typeof requestAnimationFrame=="function"?function(c){return requestAnimationFrame(c)}:function(c){return setTimeout(c,16)},cancel:typeof cancelAnimationFrame=="function"?function(c){return cancelAnimationFrame(c)}:clearTimeout},Gn=typeof performance<"u"&&performance.now?function(){return performance.now()}:function(){return+new Date};function tn(){var c={"":0},g=[""];return{id:function(L){var Z=c[L];return Z||(Z=c[L]=g.length,g.push(L),Z)},str:function(L){return g[L]}}}function Jn(c,g,L){var Z=document.createElement("canvas");t(Z.style,{border:0,margin:0,padding:0,top:0,left:0}),c.appendChild(Z),c===document.body&&(Z.style.position="absolute",t(c.style,{margin:0,padding:0}));function ce(){var ye=window.innerWidth,ve=window.innerHeight;if(c!==document.body){var we=c.getBoundingClientRect();ye=we.right-we.left,ve=we.bottom-we.top}Z.width=L*ye,Z.height=L*ve,t(Z.style,{width:ye+"px",height:ve+"px"})}var Q;c!==document.body&&typeof ResizeObserver=="function"?(Q=new ResizeObserver(function(){setTimeout(ce)}),Q.observe(c)):window.addEventListener("resize",ce,!1);function re(){Q?Q.disconnect():window.removeEventListener("resize",ce),c.removeChild(Z)}return ce(),{canvas:Z,onDestroy:re}}function rn(c,g){function L(Z){try{return c.getContext(Z,g)}catch{return null}}return L("webgl")||L("experimental-webgl")||L("webgl-experimental")}function $o(c){return typeof c.nodeName=="string"&&typeof c.appendChild=="function"&&typeof c.getBoundingClientRect=="function"}function Eo(c){return typeof c.drawArrays=="function"||typeof c.drawElements=="function"}function Ro(c){return typeof c=="string"?c.split():(h(Array.isArray(c),"invalid extension array"),c)}function bn(c){return typeof c=="string"?(h(typeof document<"u","not supported outside of DOM"),document.querySelector(c)):c}function zo(c){var g=c||{},L,Z,ce,Q,re={},ye=[],ve=[],we=typeof window>"u"?1:window.devicePixelRatio,_e=!1,Re=function(ke){ke&&h.raise(ke)},De=function(){};if(typeof g=="string"?(h(typeof document<"u","selector queries only supported in DOM enviroments"),L=document.querySelector(g),h(L,"invalid query string for element")):typeof g=="object"?$o(g)?L=g:Eo(g)?(Q=g,ce=Q.canvas):(h.constructor(g),"gl"in g?Q=g.gl:"canvas"in g?ce=bn(g.canvas):"container"in g&&(Z=bn(g.container)),"attributes"in g&&(re=g.attributes,h.type(re,"object","invalid context attributes")),"extensions"in g&&(ye=Ro(g.extensions)),"optionalExtensions"in g&&(ve=Ro(g.optionalExtensions)),"onDone"in g&&(h.type(g.onDone,"function","invalid or missing onDone callback"),Re=g.onDone),"profile"in g&&(_e=!!g.profile),"pixelRatio"in g&&(we=+g.pixelRatio,h(we>0,"invalid pixel ratio"))):h.raise("invalid arguments to regl"),L&&(L.nodeName.toLowerCase()==="canvas"?ce=L:Z=L),!Q){if(!ce){h(typeof document<"u","must manually specify webgl context outside of DOM environments");var xe=Jn(Z||document.body,Re,we);if(!xe)return null;ce=xe.canvas,De=xe.onDestroy}re.premultipliedAlpha===void 0&&(re.premultipliedAlpha=!0),Q=rn(ce,re)}return Q?{gl:Q,canvas:ce,container:Z,extensions:ye,optionalExtensions:ve,pixelRatio:we,profile:_e,onDone:Re,onDestroy:De}:(De(),Re("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"),null)}function eo(c,g){var L={};function Z(re){h.type(re,"string","extension name must be string");var ye=re.toLowerCase(),ve;try{ve=L[ye]=c.getExtension(ye)}catch{}return!!ve}for(var ce=0;ce<g.extensions.length;++ce){var Q=g.extensions[ce];if(!Z(Q))return g.onDestroy(),g.onDone('"'+Q+'" extension is not supported by the current WebGL context, try upgrading your system or a different browser'),null}return g.optionalExtensions.forEach(Z),{extensions:L,restore:function(){Object.keys(L).forEach(function(re){if(L[re]&&!Z(re))throw new Error("(regl): error restoring extension "+re)})}}}function cr(c,g){for(var L=Array(c),Z=0;Z<c;++Z)L[Z]=g(Z);return L}var Wn=5120,to=5121,uo=5122,Yr=5123,fo=5124,Un=5125,F=5126;function Bn(c){for(var g=16;g<=1<<28;g*=16)if(c<=g)return g;return 0}function Be(c){var g,L;return g=(c>65535)<<4,c>>>=g,L=(c>255)<<3,c>>>=L,g|=L,L=(c>15)<<2,c>>>=L,g|=L,L=(c>3)<<1,c>>>=L,g|=L,g|c>>1}function it(){var c=cr(8,function(){return[]});function g(Q){var re=Bn(Q),ye=c[Be(re)>>2];return ye.length>0?ye.pop():new ArrayBuffer(re)}function L(Q){c[Be(Q.byteLength)>>2].push(Q)}function Z(Q,re){var ye=null;switch(Q){case Wn:ye=new Int8Array(g(re),0,re);break;case to:ye=new Uint8Array(g(re),0,re);break;case uo:ye=new Int16Array(g(2*re),0,re);break;case Yr:ye=new Uint16Array(g(2*re),0,re);break;case fo:ye=new Int32Array(g(4*re),0,re);break;case Un:ye=new Uint32Array(g(4*re),0,re);break;case F:ye=new Float32Array(g(4*re),0,re);break;default:return null}return ye.length!==re?ye.subarray(0,re):ye}function ce(Q){L(Q.buffer)}return{alloc:g,free:L,allocType:Z,freeType:ce}}var Ge=it();Ge.zero=it();var Ce=3408,St=3410,er=3411,ft=3412,Rt=3413,Tt=3414,ur=3415,Jr=33901,dn=33902,yn=3379,gt=3386,Lt=34921,Yt=36347,Vt=36348,fr=35661,ko=35660,ir=34930,Mn=36349,ro=34076,$a=34024,pa=7936,Xi=7937,Ur=7938,po=35724,mo=34047,Cn=36063,Xo=34852,ho=3553,En=34067,no=34069,go=33984,Po=6408,b=5126,Pe=5121,M=36160,B=36053,G=36064,X=16384,te=function(c,g){var L=1;g.ext_texture_filter_anisotropic&&(L=c.getParameter(mo));var Z=1,ce=1;g.webgl_draw_buffers&&(Z=c.getParameter(Xo),ce=c.getParameter(Cn));var Q=!!g.oes_texture_float;if(Q){var re=c.createTexture();c.bindTexture(ho,re),c.texImage2D(ho,0,Po,1,1,0,Po,b,null);var ye=c.createFramebuffer();if(c.bindFramebuffer(M,ye),c.framebufferTexture2D(M,G,ho,re,0),c.bindTexture(ho,null),c.checkFramebufferStatus(M)!==B)Q=!1;else{c.viewport(0,0,1,1),c.clearColor(1,0,0,1),c.clear(X);var ve=Ge.allocType(b,4);c.readPixels(0,0,1,1,Po,b,ve),c.getError()?Q=!1:(c.deleteFramebuffer(ye),c.deleteTexture(re),Q=ve[0]===1),Ge.freeType(ve)}}var we=typeof navigator<"u"&&(/MSIE/.test(navigator.userAgent)||/Trident\//.test(navigator.appVersion)||/Edge/.test(navigator.userAgent)),_e=!0;if(!we){var Re=c.createTexture(),De=Ge.allocType(Pe,36);c.activeTexture(go),c.bindTexture(En,Re),c.texImage2D(no,0,Po,3,3,0,Po,Pe,De),Ge.freeType(De),c.bindTexture(En,null),c.deleteTexture(Re),_e=!c.getError()}return{colorBits:[c.getParameter(St),c.getParameter(er),c.getParameter(ft),c.getParameter(Rt)],depthBits:c.getParameter(Tt),stencilBits:c.getParameter(ur),subpixelBits:c.getParameter(Ce),extensions:Object.keys(g).filter(function(xe){return!!g[xe]}),maxAnisotropic:L,maxDrawbuffers:Z,maxColorAttachments:ce,pointSizeDims:c.getParameter(Jr),lineWidthDims:c.getParameter(dn),maxViewportDims:c.getParameter(gt),maxCombinedTextureUnits:c.getParameter(fr),maxCubeMapSize:c.getParameter(ro),maxRenderbufferSize:c.getParameter($a),maxTextureUnits:c.getParameter(ir),maxTextureSize:c.getParameter(yn),maxAttributes:c.getParameter(Lt),maxVertexUniforms:c.getParameter(Yt),maxVertexTextureUnits:c.getParameter(ko),maxVaryingVectors:c.getParameter(Vt),maxFragmentUniforms:c.getParameter(Mn),glsl:c.getParameter(po),renderer:c.getParameter(Xi),vendor:c.getParameter(pa),version:c.getParameter(Ur),readFloat:Q,npotTextureCube:_e}};function se(c){return!!c&&typeof c=="object"&&Array.isArray(c.shape)&&Array.isArray(c.stride)&&typeof c.offset=="number"&&c.shape.length===c.stride.length&&(Array.isArray(c.data)||e(c.data))}var ge=function(c){return Object.keys(c).map(function(g){return c[g]})},Ue={shape:yr,flatten:Jt};function Ke(c,g,L){for(var Z=0;Z<g;++Z)L[Z]=c[Z]}function st(c,g,L,Z){for(var ce=0,Q=0;Q<g;++Q)for(var re=c[Q],ye=0;ye<L;++ye)Z[ce++]=re[ye]}function ht(c,g,L,Z,ce,Q){for(var re=Q,ye=0;ye<g;++ye)for(var ve=c[ye],we=0;we<L;++we)for(var _e=ve[we],Re=0;Re<Z;++Re)ce[re++]=_e[Re]}function qt(c,g,L,Z,ce){for(var Q=1,re=L+1;re<g.length;++re)Q*=g[re];var ye=g[L];if(g.length-L===4){var ve=g[L+1],we=g[L+2],_e=g[L+3];for(re=0;re<ye;++re)ht(c[re],ve,we,_e,Z,ce),ce+=Q}else for(re=0;re<ye;++re)qt(c[re],g,L+1,Z,ce),ce+=Q}function Jt(c,g,L,Z){var ce=1;if(g.length)for(var Q=0;Q<g.length;++Q)ce*=g[Q];else ce=0;var re=Z||Ge.allocType(L,ce);switch(g.length){case 0:break;case 1:Ke(c,g[0],re);break;case 2:st(c,g[0],g[1],re);break;case 3:ht(c,g[0],g[1],g[2],re,0);break;default:qt(c,g,0,re,0)}return re}function yr(c){for(var g=[],L=c;L.length;L=L[0])g.push(L.length);return g}var wr={"[object Int8Array]":5120,"[object Int16Array]":5122,"[object Int32Array]":5124,"[object Uint8Array]":5121,"[object Uint8ClampedArray]":5121,"[object Uint16Array]":5123,"[object Uint32Array]":5125,"[object Float32Array]":5126,"[object Float64Array]":5121,"[object ArrayBuffer]":5121},Wt=5120,rr=5122,bo=5124,Vn=5121,za=5123,yo=5125,ji=5126,Xa=5126,Fo={int8:Wt,int16:rr,int32:bo,uint8:Vn,uint16:za,uint32:yo,float:ji,float32:Xa},M2=35048,L2=35040,ll={dynamic:M2,stream:L2,static:35044},yu=Ue.flatten,Tm=Ue.shape,Mm=35044,w2=35040,xu=5121,vu=5126,jo=[];jo[5120]=1,jo[5122]=2,jo[5124]=4,jo[5121]=1,jo[5123]=2,jo[5125]=4,jo[5126]=4;function cl(c){return wr[Object.prototype.toString.call(c)]|0}function Lm(c,g){for(var L=0;L<g.length;++L)c[L]=g[L]}function wm(c,g,L,Z,ce,Q,re){for(var ye=0,ve=0;ve<L;++ve)for(var we=0;we<Z;++we)c[ye++]=g[ce*ve+Q*we+re]}function A2(c,g,L,Z){var ce=0,Q={};function re($){this.id=ce++,this.buffer=c.createBuffer(),this.type=$,this.usage=Mm,this.byteLength=0,this.dimension=1,this.dtype=xu,this.persistentData=null,L.profile&&(this.stats={size:0})}re.prototype.bind=function(){c.bindBuffer(this.type,this.buffer)},re.prototype.destroy=function(){De(this)};var ye=[];function ve($,ne){var Le=ye.pop();return Le||(Le=new re($)),Le.bind(),Re(Le,ne,w2,0,1,!1),Le}function we($){ye.push($)}function _e($,ne,Le){$.byteLength=ne.byteLength,c.bufferData($.type,ne,Le)}function Re($,ne,Le,We,de,$e){var he;if($.usage=Le,Array.isArray(ne)){if($.dtype=We||vu,ne.length>0){var Oe;if(Array.isArray(ne[0])){he=Tm(ne);for(var me=1,Ie=1;Ie<he.length;++Ie)me*=he[Ie];$.dimension=me,Oe=yu(ne,he,$.dtype),_e($,Oe,Le),$e?$.persistentData=Oe:Ge.freeType(Oe)}else if(typeof ne[0]=="number"){$.dimension=de;var ot=Ge.allocType($.dtype,ne.length);Lm(ot,ne),_e($,ot,Le),$e?$.persistentData=ot:Ge.freeType(ot)}else e(ne[0])?($.dimension=ne[0].length,$.dtype=We||cl(ne[0])||vu,Oe=yu(ne,[ne.length,ne[0].length],$.dtype),_e($,Oe,Le),$e?$.persistentData=Oe:Ge.freeType(Oe)):h.raise("invalid buffer data")}}else if(e(ne))$.dtype=We||cl(ne),$.dimension=de,_e($,ne,Le),$e&&($.persistentData=new Uint8Array(new Uint8Array(ne.buffer)));else if(se(ne)){he=ne.shape;var xt=ne.stride,He=ne.offset,Ae=0,pe=0,pt=0,At=0;he.length===1?(Ae=he[0],pe=1,pt=xt[0],At=0):he.length===2?(Ae=he[0],pe=he[1],pt=xt[0],At=xt[1]):h.raise("invalid shape"),$.dtype=We||cl(ne.data)||vu,$.dimension=pe;var je=Ge.allocType($.dtype,Ae*pe);wm(je,ne.data,Ae,pe,pt,At,He),_e($,je,Le),$e?$.persistentData=je:Ge.freeType(je)}else ne instanceof ArrayBuffer?($.dtype=xu,$.dimension=de,_e($,ne,Le),$e&&($.persistentData=new Uint8Array(new Uint8Array(ne)))):h.raise("invalid buffer data")}function De($){g.bufferCount--,Z($);var ne=$.buffer;h(ne,"buffer must not be deleted already"),c.deleteBuffer(ne),$.buffer=null,delete Q[$.id]}function xe($,ne,Le,We){g.bufferCount++;var de=new re(ne);Q[de.id]=de;function $e(me){var Ie=Mm,ot=null,xt=0,He=0,Ae=1;return Array.isArray(me)||e(me)||se(me)||me instanceof ArrayBuffer?ot=me:typeof me=="number"?xt=me|0:me&&(h.type(me,"object","buffer arguments must be an object, a number or an array"),"data"in me&&(h(ot===null||Array.isArray(ot)||e(ot)||se(ot),"invalid data for buffer"),ot=me.data),"usage"in me&&(h.parameter(me.usage,ll,"invalid buffer usage"),Ie=ll[me.usage]),"type"in me&&(h.parameter(me.type,Fo,"invalid buffer type"),He=Fo[me.type]),"dimension"in me&&(h.type(me.dimension,"number","invalid dimension"),Ae=me.dimension|0),"length"in me&&(h.nni(xt,"buffer length must be a nonnegative integer"),xt=me.length|0)),de.bind(),ot?Re(de,ot,Ie,He,Ae,We):(xt&&c.bufferData(de.type,xt,Ie),de.dtype=He||xu,de.usage=Ie,de.dimension=Ae,de.byteLength=xt),L.profile&&(de.stats.size=de.byteLength*jo[de.dtype]),$e}function he(me,Ie){h(Ie+me.byteLength<=de.byteLength,"invalid buffer subdata call, buffer is too small.  Can't write data of size "+me.byteLength+" starting from offset "+Ie+" to a buffer of size "+de.byteLength),c.bufferSubData(de.type,Ie,me)}function Oe(me,Ie){var ot=(Ie||0)|0,xt;if(de.bind(),e(me)||me instanceof ArrayBuffer)he(me,ot);else if(Array.isArray(me)){if(me.length>0)if(typeof me[0]=="number"){var He=Ge.allocType(de.dtype,me.length);Lm(He,me),he(He,ot),Ge.freeType(He)}else if(Array.isArray(me[0])||e(me[0])){xt=Tm(me);var Ae=yu(me,xt,de.dtype);he(Ae,ot),Ge.freeType(Ae)}else h.raise("invalid buffer data")}else if(se(me)){xt=me.shape;var pe=me.stride,pt=0,At=0,je=0,Bt=0;xt.length===1?(pt=xt[0],At=1,je=pe[0],Bt=0):xt.length===2?(pt=xt[0],At=xt[1],je=pe[0],Bt=pe[1]):h.raise("invalid shape");var vt=Array.isArray(me.data)?de.dtype:cl(me.data),Ot=Ge.allocType(vt,pt*At);wm(Ot,me.data,pt,At,je,Bt,me.offset),he(Ot,ot),Ge.freeType(Ot)}else h.raise("invalid data for buffer subdata");return $e}return Le||$e($),$e._reglType="buffer",$e._buffer=de,$e.subdata=Oe,L.profile&&($e.stats=de.stats),$e.destroy=function(){De(de)},$e}function ke(){ge(Q).forEach(function($){$.buffer=c.createBuffer(),c.bindBuffer($.type,$.buffer),c.bufferData($.type,$.persistentData||$.byteLength,$.usage)})}return L.profile&&(g.getTotalBufferSize=function(){var $=0;return Object.keys(Q).forEach(function(ne){$+=Q[ne].stats.size}),$}),{create:xe,createStream:ve,destroyStream:we,clear:function(){ge(Q).forEach(De),ye.forEach(De)},getBuffer:function($){return $&&$._buffer instanceof re?$._buffer:null},restore:ke,_initBuffer:Re}}var C2=0,E2=0,R2=1,k2=1,P2=4,F2=4,ja={points:C2,point:E2,lines:R2,line:k2,triangles:P2,triangle:F2,"line loop":2,"line strip":3,"triangle strip":5,"triangle fan":6},O2=0,I2=1,Yi=4,B2=5120,Ya=5121,Am=5122,qa=5123,Cm=5124,da=5125,_u=34963,D2=35040,H2=35044;function N2(c,g,L,Z){var ce={},Q=0,re={uint8:Ya,uint16:qa};g.oes_element_index_uint&&(re.uint32=da);function ye(ke){this.id=Q++,ce[this.id]=this,this.buffer=ke,this.primType=Yi,this.vertCount=0,this.type=0}ye.prototype.bind=function(){this.buffer.bind()};var ve=[];function we(ke){var $=ve.pop();return $||($=new ye(L.create(null,_u,!0,!1)._buffer)),Re($,ke,D2,-1,-1,0,0),$}function _e(ke){ve.push(ke)}function Re(ke,$,ne,Le,We,de,$e){ke.buffer.bind();var he;if($){var Oe=$e;!$e&&(!e($)||se($)&&!e($.data))&&(Oe=g.oes_element_index_uint?da:qa),L._initBuffer(ke.buffer,$,ne,Oe,3)}else c.bufferData(_u,de,ne),ke.buffer.dtype=he||Ya,ke.buffer.usage=ne,ke.buffer.dimension=3,ke.buffer.byteLength=de;if(he=$e,!$e){switch(ke.buffer.dtype){case Ya:case B2:he=Ya;break;case qa:case Am:he=qa;break;case da:case Cm:he=da;break;default:h.raise("unsupported type for element array")}ke.buffer.dtype=he}ke.type=he,h(he!==da||!!g.oes_element_index_uint,"32 bit element buffers not supported, enable oes_element_index_uint first");var me=We;me<0&&(me=ke.buffer.byteLength,he===qa?me>>=1:he===da&&(me>>=2)),ke.vertCount=me;var Ie=Le;if(Le<0){Ie=Yi;var ot=ke.buffer.dimension;ot===1&&(Ie=O2),ot===2&&(Ie=I2),ot===3&&(Ie=Yi)}ke.primType=Ie}function De(ke){Z.elementsCount--,h(ke.buffer!==null,"must not double destroy elements"),delete ce[ke.id],ke.buffer.destroy(),ke.buffer=null}function xe(ke,$){var ne=L.create(null,_u,!0),Le=new ye(ne._buffer);Z.elementsCount++;function We(de){if(!de)ne(),Le.primType=Yi,Le.vertCount=0,Le.type=Ya;else if(typeof de=="number")ne(de),Le.primType=Yi,Le.vertCount=de|0,Le.type=Ya;else{var $e=null,he=H2,Oe=-1,me=-1,Ie=0,ot=0;Array.isArray(de)||e(de)||se(de)?$e=de:(h.type(de,"object","invalid arguments for elements"),"data"in de&&($e=de.data,h(Array.isArray($e)||e($e)||se($e),"invalid data for element buffer")),"usage"in de&&(h.parameter(de.usage,ll,"invalid element buffer usage"),he=ll[de.usage]),"primitive"in de&&(h.parameter(de.primitive,ja,"invalid element buffer primitive"),Oe=ja[de.primitive]),"count"in de&&(h(typeof de.count=="number"&&de.count>=0,"invalid vertex count for elements"),me=de.count|0),"type"in de&&(h.parameter(de.type,re,"invalid buffer type"),ot=re[de.type]),"length"in de?Ie=de.length|0:(Ie=me,ot===qa||ot===Am?Ie*=2:(ot===da||ot===Cm)&&(Ie*=4))),Re(Le,$e,he,Oe,me,Ie,ot)}return We}return We(ke),We._reglType="elements",We._elements=Le,We.subdata=function(de,$e){return ne.subdata(de,$e),We},We.destroy=function(){De(Le)},We}return{create:xe,createStream:we,destroyStream:_e,getElements:function(ke){return typeof ke=="function"&&ke._elements instanceof ye?ke._elements:null},clear:function(){ge(ce).forEach(De)}}}var Em=new Float32Array(1),G2=new Uint32Array(Em.buffer),W2=5123;function Rm(c){for(var g=Ge.allocType(W2,c.length),L=0;L<c.length;++L)if(isNaN(c[L]))g[L]=65535;else if(c[L]===1/0)g[L]=31744;else if(c[L]===-1/0)g[L]=64512;else{Em[0]=c[L];var Z=G2[0],ce=Z>>>31<<15,Q=(Z<<1>>>24)-127,re=Z>>13&1023;if(Q<-24)g[L]=ce;else if(Q<-14){var ye=-14-Q;g[L]=ce+(re+1024>>ye)}else Q>15?g[L]=ce+31744:g[L]=ce+(Q+15<<10)+re}return g}function Ar(c){return Array.isArray(c)||e(c)}var km=function(c){return!(c&c-1)&&!!c},U2=34467,xo=3553,Su=34067,ul=34069,ma=6408,Tu=6406,fl=6407,qi=6409,pl=6410,Pm=32854,Mu=32855,Fm=36194,V2=32819,$2=32820,z2=33635,X2=34042,Lu=6402,dl=34041,wu=35904,Au=35906,Ka=36193,Cu=33776,Eu=33777,Ru=33778,ku=33779,Om=35986,Im=35987,Bm=34798,Dm=35840,Hm=35841,Nm=35842,Gm=35843,Wm=36196,Qa=5121,Pu=5123,Fu=5125,Ki=5126,j2=10242,Y2=10243,q2=10497,Ou=33071,K2=33648,Q2=10240,Z2=10241,Iu=9728,J2=9729,Bu=9984,Um=9985,Vm=9986,Du=9987,eT=33170,ml=4352,tT=4353,rT=4354,nT=34046,oT=3317,aT=37440,iT=37441,sT=37443,$m=37444,Qi=33984,lT=[Bu,Vm,Um,Du],hl=[0,qi,pl,fl,ma],$n={};$n[qi]=$n[Tu]=$n[Lu]=1,$n[dl]=$n[pl]=2,$n[fl]=$n[wu]=3,$n[ma]=$n[Au]=4;function Za(c){return"[object "+c+"]"}var zm=Za("HTMLCanvasElement"),Xm=Za("OffscreenCanvas"),jm=Za("CanvasRenderingContext2D"),Ym=Za("ImageBitmap"),qm=Za("HTMLImageElement"),Km=Za("HTMLVideoElement"),cT=Object.keys(wr).concat([zm,Xm,jm,Ym,qm,Km]),Ja=[];Ja[Qa]=1,Ja[Ki]=4,Ja[Ka]=2,Ja[Pu]=2,Ja[Fu]=4;var nn=[];nn[Pm]=2,nn[Mu]=2,nn[Fm]=2,nn[dl]=4,nn[Cu]=.5,nn[Eu]=.5,nn[Ru]=1,nn[ku]=1,nn[Om]=.5,nn[Im]=1,nn[Bm]=1,nn[Dm]=.5,nn[Hm]=.25,nn[Nm]=.5,nn[Gm]=.25,nn[Wm]=.5;function Qm(c){return Array.isArray(c)&&(c.length===0||typeof c[0]=="number")}function Zm(c){if(!Array.isArray(c))return!1;var g=c.length;return!(g===0||!Ar(c[0]))}function ha(c){return Object.prototype.toString.call(c)}function Jm(c){return ha(c)===zm}function e0(c){return ha(c)===Xm}function uT(c){return ha(c)===jm}function fT(c){return ha(c)===Ym}function pT(c){return ha(c)===qm}function dT(c){return ha(c)===Km}function Hu(c){if(!c)return!1;var g=ha(c);return cT.indexOf(g)>=0?!0:Qm(c)||Zm(c)||se(c)}function t0(c){return wr[Object.prototype.toString.call(c)]|0}function mT(c,g){var L=g.length;switch(c.type){case Qa:case Pu:case Fu:case Ki:var Z=Ge.allocType(c.type,L);Z.set(g),c.data=Z;break;case Ka:c.data=Rm(g);break;default:h.raise("unsupported texture type, must specify a typed array")}}function r0(c,g){return Ge.allocType(c.type===Ka?Ki:c.type,g)}function n0(c,g){c.type===Ka?(c.data=Rm(g),Ge.freeType(g)):c.data=g}function hT(c,g,L,Z,ce,Q){for(var re=c.width,ye=c.height,ve=c.channels,we=re*ye*ve,_e=r0(c,we),Re=0,De=0;De<ye;++De)for(var xe=0;xe<re;++xe)for(var ke=0;ke<ve;++ke)_e[Re++]=g[L*xe+Z*De+ce*ke+Q];n0(c,_e)}function gl(c,g,L,Z,ce,Q){var re;if(typeof nn[c]<"u"?re=nn[c]:re=$n[c]*Ja[g],Q&&(re*=6),ce){for(var ye=0,ve=L;ve>=1;)ye+=re*ve*ve,ve/=2;return ye}else return re*L*Z}function gT(c,g,L,Z,ce,Q,re){var ye={"don't care":ml,"dont care":ml,nice:rT,fast:tT},ve={repeat:q2,clamp:Ou,mirror:K2},we={nearest:Iu,linear:J2},_e=t({mipmap:Du,"nearest mipmap nearest":Bu,"linear mipmap nearest":Um,"nearest mipmap linear":Vm,"linear mipmap linear":Du},we),Re={none:0,browser:$m},De={uint8:Qa,rgba4:V2,rgb565:z2,"rgb5 a1":$2},xe={alpha:Tu,luminance:qi,"luminance alpha":pl,rgb:fl,rgba:ma,rgba4:Pm,"rgb5 a1":Mu,rgb565:Fm},ke={};g.ext_srgb&&(xe.srgb=wu,xe.srgba=Au),g.oes_texture_float&&(De.float32=De.float=Ki),g.oes_texture_half_float&&(De.float16=De["half float"]=Ka),g.webgl_depth_texture&&(t(xe,{depth:Lu,"depth stencil":dl}),t(De,{uint16:Pu,uint32:Fu,"depth stencil":X2})),g.webgl_compressed_texture_s3tc&&t(ke,{"rgb s3tc dxt1":Cu,"rgba s3tc dxt1":Eu,"rgba s3tc dxt3":Ru,"rgba s3tc dxt5":ku}),g.webgl_compressed_texture_atc&&t(ke,{"rgb atc":Om,"rgba atc explicit alpha":Im,"rgba atc interpolated alpha":Bm}),g.webgl_compressed_texture_pvrtc&&t(ke,{"rgb pvrtc 4bppv1":Dm,"rgb pvrtc 2bppv1":Hm,"rgba pvrtc 4bppv1":Nm,"rgba pvrtc 2bppv1":Gm}),g.webgl_compressed_texture_etc1&&(ke["rgb etc1"]=Wm);var $=Array.prototype.slice.call(c.getParameter(U2));Object.keys(ke).forEach(function(T){var J=ke[T];$.indexOf(J)>=0&&(xe[T]=J)});var ne=Object.keys(xe);L.textureFormats=ne;var Le=[];Object.keys(xe).forEach(function(T){var J=xe[T];Le[J]=T});var We=[];Object.keys(De).forEach(function(T){var J=De[T];We[J]=T});var de=[];Object.keys(we).forEach(function(T){var J=we[T];de[J]=T});var $e=[];Object.keys(_e).forEach(function(T){var J=_e[T];$e[J]=T});var he=[];Object.keys(ve).forEach(function(T){var J=ve[T];he[J]=T});var Oe=ne.reduce(function(T,J){var q=xe[J];return q===qi||q===Tu||q===qi||q===pl||q===Lu||q===dl||g.ext_srgb&&(q===wu||q===Au)?T[q]=q:q===Mu||J.indexOf("rgba")>=0?T[q]=ma:T[q]=fl,T},{});function me(){this.internalformat=ma,this.format=ma,this.type=Qa,this.compressed=!1,this.premultiplyAlpha=!1,this.flipY=!1,this.unpackAlignment=1,this.colorSpace=$m,this.width=0,this.height=0,this.channels=0}function Ie(T,J){T.internalformat=J.internalformat,T.format=J.format,T.type=J.type,T.compressed=J.compressed,T.premultiplyAlpha=J.premultiplyAlpha,T.flipY=J.flipY,T.unpackAlignment=J.unpackAlignment,T.colorSpace=J.colorSpace,T.width=J.width,T.height=J.height,T.channels=J.channels}function ot(T,J){if(!(typeof J!="object"||!J)){if("premultiplyAlpha"in J&&(h.type(J.premultiplyAlpha,"boolean","invalid premultiplyAlpha"),T.premultiplyAlpha=J.premultiplyAlpha),"flipY"in J&&(h.type(J.flipY,"boolean","invalid texture flip"),T.flipY=J.flipY),"alignment"in J&&(h.oneOf(J.alignment,[1,2,4,8],"invalid texture unpack alignment"),T.unpackAlignment=J.alignment),"colorSpace"in J&&(h.parameter(J.colorSpace,Re,"invalid colorSpace"),T.colorSpace=Re[J.colorSpace]),"type"in J){var q=J.type;h(g.oes_texture_float||!(q==="float"||q==="float32"),"you must enable the OES_texture_float extension in order to use floating point textures."),h(g.oes_texture_half_float||!(q==="half float"||q==="float16"),"you must enable the OES_texture_half_float extension in order to use 16-bit floating point textures."),h(g.webgl_depth_texture||!(q==="uint16"||q==="uint32"||q==="depth stencil"),"you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."),h.parameter(q,De,"invalid texture type"),T.type=De[q]}var ze=T.width,Dt=T.height,_=T.channels,m=!1;"shape"in J?(h(Array.isArray(J.shape)&&J.shape.length>=2,"shape must be an array"),ze=J.shape[0],Dt=J.shape[1],J.shape.length===3&&(_=J.shape[2],h(_>0&&_<=4,"invalid number of channels"),m=!0),h(ze>=0&&ze<=L.maxTextureSize,"invalid width"),h(Dt>=0&&Dt<=L.maxTextureSize,"invalid height")):("radius"in J&&(ze=Dt=J.radius,h(ze>=0&&ze<=L.maxTextureSize,"invalid radius")),"width"in J&&(ze=J.width,h(ze>=0&&ze<=L.maxTextureSize,"invalid width")),"height"in J&&(Dt=J.height,h(Dt>=0&&Dt<=L.maxTextureSize,"invalid height")),"channels"in J&&(_=J.channels,h(_>0&&_<=4,"invalid number of channels"),m=!0)),T.width=ze|0,T.height=Dt|0,T.channels=_|0;var k=!1;if("format"in J){var U=J.format;h(g.webgl_depth_texture||!(U==="depth"||U==="depth stencil"),"you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."),h.parameter(U,xe,"invalid texture format");var z=T.internalformat=xe[U];T.format=Oe[z],U in De&&("type"in J||(T.type=De[U])),U in ke&&(T.compressed=!0),k=!0}!m&&k?T.channels=$n[T.format]:m&&!k?T.channels!==hl[T.format]&&(T.format=T.internalformat=hl[T.channels]):k&&m&&h(T.channels===$n[T.format],"number of channels inconsistent with specified format")}}function xt(T){c.pixelStorei(aT,T.flipY),c.pixelStorei(iT,T.premultiplyAlpha),c.pixelStorei(sT,T.colorSpace),c.pixelStorei(oT,T.unpackAlignment)}function He(){me.call(this),this.xOffset=0,this.yOffset=0,this.data=null,this.needsFree=!1,this.element=null,this.needsCopy=!1}function Ae(T,J){var q=null;if(Hu(J)?q=J:J&&(h.type(J,"object","invalid pixel data type"),ot(T,J),"x"in J&&(T.xOffset=J.x|0),"y"in J&&(T.yOffset=J.y|0),Hu(J.data)&&(q=J.data)),h(!T.compressed||q instanceof Uint8Array,"compressed texture data must be stored in a uint8array"),J.copy){h(!q,"can not specify copy and data field for the same texture");var ze=ce.viewportWidth,Dt=ce.viewportHeight;T.width=T.width||ze-T.xOffset,T.height=T.height||Dt-T.yOffset,T.needsCopy=!0,h(T.xOffset>=0&&T.xOffset<ze&&T.yOffset>=0&&T.yOffset<Dt&&T.width>0&&T.width<=ze&&T.height>0&&T.height<=Dt,"copy texture read out of bounds")}else if(!q)T.width=T.width||1,T.height=T.height||1,T.channels=T.channels||4;else if(e(q))T.channels=T.channels||4,T.data=q,!("type"in J)&&T.type===Qa&&(T.type=t0(q));else if(Qm(q))T.channels=T.channels||4,mT(T,q),T.alignment=1,T.needsFree=!0;else if(se(q)){var _=q.data;!Array.isArray(_)&&T.type===Qa&&(T.type=t0(_));var m=q.shape,k=q.stride,U,z,I,P,N,S;m.length===3?(I=m[2],S=k[2]):(h(m.length===2,"invalid ndarray pixel data, must be 2 or 3D"),I=1,S=1),U=m[0],z=m[1],P=k[0],N=k[1],T.alignment=1,T.width=U,T.height=z,T.channels=I,T.format=T.internalformat=hl[I],T.needsFree=!0,hT(T,_,P,N,S,q.offset)}else if(Jm(q)||e0(q)||uT(q))Jm(q)||e0(q)?T.element=q:T.element=q.canvas,T.width=T.element.width,T.height=T.element.height,T.channels=4;else if(fT(q))T.element=q,T.width=q.width,T.height=q.height,T.channels=4;else if(pT(q))T.element=q,T.width=q.naturalWidth,T.height=q.naturalHeight,T.channels=4;else if(dT(q))T.element=q,T.width=q.videoWidth,T.height=q.videoHeight,T.channels=4;else if(Zm(q)){var E=T.width||q[0].length,y=T.height||q.length,W=T.channels;Ar(q[0][0])?W=W||q[0][0].length:W=W||1;for(var j=Ue.shape(q),le=1,ue=0;ue<j.length;++ue)le*=j[ue];var ae=r0(T,le);Ue.flatten(q,j,"",ae),n0(T,ae),T.alignment=1,T.width=E,T.height=y,T.channels=W,T.format=T.internalformat=hl[W],T.needsFree=!0}T.type===Ki?h(L.extensions.indexOf("oes_texture_float")>=0,"oes_texture_float extension not enabled"):T.type===Ka&&h(L.extensions.indexOf("oes_texture_half_float")>=0,"oes_texture_half_float extension not enabled")}function pe(T,J,q){var ze=T.element,Dt=T.data,_=T.internalformat,m=T.format,k=T.type,U=T.width,z=T.height;xt(T),ze?c.texImage2D(J,q,m,m,k,ze):T.compressed?c.compressedTexImage2D(J,q,_,U,z,0,Dt):T.needsCopy?(Z(),c.copyTexImage2D(J,q,m,T.xOffset,T.yOffset,U,z,0)):c.texImage2D(J,q,m,U,z,0,m,k,Dt||null)}function pt(T,J,q,ze,Dt){var _=T.element,m=T.data,k=T.internalformat,U=T.format,z=T.type,I=T.width,P=T.height;xt(T),_?c.texSubImage2D(J,Dt,q,ze,U,z,_):T.compressed?c.compressedTexSubImage2D(J,Dt,q,ze,k,I,P,m):T.needsCopy?(Z(),c.copyTexSubImage2D(J,Dt,q,ze,T.xOffset,T.yOffset,I,P)):c.texSubImage2D(J,Dt,q,ze,I,P,U,z,m)}var At=[];function je(){return At.pop()||new He}function Bt(T){T.needsFree&&Ge.freeType(T.data),He.call(T),At.push(T)}function vt(){me.call(this),this.genMipmaps=!1,this.mipmapHint=ml,this.mipmask=0,this.images=Array(16)}function Ot(T,J,q){var ze=T.images[0]=je();T.mipmask=1,ze.width=T.width=J,ze.height=T.height=q,ze.channels=T.channels=4}function Xt(T,J){var q=null;if(Hu(J))q=T.images[0]=je(),Ie(q,T),Ae(q,J),T.mipmask=1;else if(ot(T,J),Array.isArray(J.mipmap))for(var ze=J.mipmap,Dt=0;Dt<ze.length;++Dt)q=T.images[Dt]=je(),Ie(q,T),q.width>>=Dt,q.height>>=Dt,Ae(q,ze[Dt]),T.mipmask|=1<<Dt;else q=T.images[0]=je(),Ie(q,T),Ae(q,J),T.mipmask=1;Ie(T,T.images[0]),T.compressed&&(T.internalformat===Cu||T.internalformat===Eu||T.internalformat===Ru||T.internalformat===ku)&&h(T.width%4===0&&T.height%4===0,"for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4")}function Br(T,J){for(var q=T.images,ze=0;ze<q.length;++ze){if(!q[ze])return;pe(q[ze],J,ze)}}var qr=[];function Gt(){var T=qr.pop()||new vt;me.call(T),T.mipmask=0;for(var J=0;J<16;++J)T.images[J]=null;return T}function Vr(T){for(var J=T.images,q=0;q<J.length;++q)J[q]&&Bt(J[q]),J[q]=null;qr.push(T)}function pr(){this.minFilter=Iu,this.magFilter=Iu,this.wrapS=Ou,this.wrapT=Ou,this.anisotropic=1,this.genMipmaps=!1,this.mipmapHint=ml}function Dr(T,J){if("min"in J){var q=J.min;h.parameter(q,_e),T.minFilter=_e[q],lT.indexOf(T.minFilter)>=0&&!("faces"in J)&&(T.genMipmaps=!0)}if("mag"in J){var ze=J.mag;h.parameter(ze,we),T.magFilter=we[ze]}var Dt=T.wrapS,_=T.wrapT;if("wrap"in J){var m=J.wrap;typeof m=="string"?(h.parameter(m,ve),Dt=_=ve[m]):Array.isArray(m)&&(h.parameter(m[0],ve),h.parameter(m[1],ve),Dt=ve[m[0]],_=ve[m[1]])}else{if("wrapS"in J){var k=J.wrapS;h.parameter(k,ve),Dt=ve[k]}if("wrapT"in J){var U=J.wrapT;h.parameter(U,ve),_=ve[U]}}if(T.wrapS=Dt,T.wrapT=_,"anisotropic"in J){var z=J.anisotropic;h(typeof z=="number"&&z>=1&&z<=L.maxAnisotropic,"aniso samples must be between 1 and "),T.anisotropic=J.anisotropic}if("mipmap"in J){var I=!1;switch(typeof J.mipmap){case"string":h.parameter(J.mipmap,ye,"invalid mipmap hint"),T.mipmapHint=ye[J.mipmap],T.genMipmaps=!0,I=!0;break;case"boolean":I=T.genMipmaps=J.mipmap;break;case"object":h(Array.isArray(J.mipmap),"invalid mipmap type"),T.genMipmaps=!1,I=!0;break;default:h.raise("invalid mipmap type")}I&&!("min"in J)&&(T.minFilter=Bu)}}function $r(T,J){c.texParameteri(J,Z2,T.minFilter),c.texParameteri(J,Q2,T.magFilter),c.texParameteri(J,j2,T.wrapS),c.texParameteri(J,Y2,T.wrapT),g.ext_texture_filter_anisotropic&&c.texParameteri(J,nT,T.anisotropic),T.genMipmaps&&(c.hint(eT,T.mipmapHint),c.generateMipmap(J))}var zr=0,en={},on=L.maxTextureUnits,Cr=Array(on).map(function(){return null});function Ct(T){me.call(this),this.mipmask=0,this.internalformat=ma,this.id=zr++,this.refCount=1,this.target=T,this.texture=c.createTexture(),this.unit=-1,this.bindCount=0,this.texInfo=new pr,re.profile&&(this.stats={size:0})}function an(T){c.activeTexture(Qi),c.bindTexture(T.target,T.texture)}function Kt(){var T=Cr[0];T?c.bindTexture(T.target,T.texture):c.bindTexture(xo,null)}function ct(T){var J=T.texture;h(J,"must not double destroy texture");var q=T.unit,ze=T.target;q>=0&&(c.activeTexture(Qi+q),c.bindTexture(ze,null),Cr[q]=null),c.deleteTexture(J),T.texture=null,T.params=null,T.pixels=null,T.refCount=0,delete en[T.id],Q.textureCount--}t(Ct.prototype,{bind:function(){var T=this;T.bindCount+=1;var J=T.unit;if(J<0){for(var q=0;q<on;++q){var ze=Cr[q];if(ze){if(ze.bindCount>0)continue;ze.unit=-1}Cr[q]=T,J=q;break}J>=on&&h.raise("insufficient number of texture units"),re.profile&&Q.maxTextureUnits<J+1&&(Q.maxTextureUnits=J+1),T.unit=J,c.activeTexture(Qi+J),c.bindTexture(T.target,T.texture)}return J},unbind:function(){this.bindCount-=1},decRef:function(){--this.refCount<=0&&ct(this)}});function Nt(T,J){var q=new Ct(xo);en[q.id]=q,Q.textureCount++;function ze(m,k){var U=q.texInfo;pr.call(U);var z=Gt();return typeof m=="number"?typeof k=="number"?Ot(z,m|0,k|0):Ot(z,m|0,m|0):m?(h.type(m,"object","invalid arguments to regl.texture"),Dr(U,m),Xt(z,m)):Ot(z,1,1),U.genMipmaps&&(z.mipmask=(z.width<<1)-1),q.mipmask=z.mipmask,Ie(q,z),h.texture2D(U,z,L),q.internalformat=z.internalformat,ze.width=z.width,ze.height=z.height,an(q),Br(z,xo),$r(U,xo),Kt(),Vr(z),re.profile&&(q.stats.size=gl(q.internalformat,q.type,z.width,z.height,U.genMipmaps,!1)),ze.format=Le[q.internalformat],ze.type=We[q.type],ze.mag=de[U.magFilter],ze.min=$e[U.minFilter],ze.wrapS=he[U.wrapS],ze.wrapT=he[U.wrapT],ze}function Dt(m,k,U,z){h(!!m,"must specify image data");var I=k|0,P=U|0,N=z|0,S=je();return Ie(S,q),S.width=0,S.height=0,Ae(S,m),S.width=S.width||(q.width>>N)-I,S.height=S.height||(q.height>>N)-P,h(q.type===S.type&&q.format===S.format&&q.internalformat===S.internalformat,"incompatible format for texture.subimage"),h(I>=0&&P>=0&&I+S.width<=q.width&&P+S.height<=q.height,"texture.subimage write out of bounds"),h(q.mipmask&1<<N,"missing mipmap data"),h(S.data||S.element||S.needsCopy,"missing image data"),an(q),pt(S,xo,I,P,N),Kt(),Bt(S),ze}function _(m,k){var U=m|0,z=k|0||U;if(U===q.width&&z===q.height)return ze;ze.width=q.width=U,ze.height=q.height=z,an(q);for(var I=0;q.mipmask>>I;++I){var P=U>>I,N=z>>I;if(!P||!N)break;c.texImage2D(xo,I,q.format,P,N,0,q.format,q.type,null)}return Kt(),re.profile&&(q.stats.size=gl(q.internalformat,q.type,U,z,!1,!1)),ze}return ze(T,J),ze.subimage=Dt,ze.resize=_,ze._reglType="texture2d",ze._texture=q,re.profile&&(ze.stats=q.stats),ze.destroy=function(){q.decRef()},ze}function $t(T,J,q,ze,Dt,_){var m=new Ct(Su);en[m.id]=m,Q.cubeCount++;var k=new Array(6);function U(P,N,S,E,y,W){var j,le=m.texInfo;for(pr.call(le),j=0;j<6;++j)k[j]=Gt();if(typeof P=="number"||!P){var ue=P|0||1;for(j=0;j<6;++j)Ot(k[j],ue,ue)}else if(typeof P=="object")if(N)Xt(k[0],P),Xt(k[1],N),Xt(k[2],S),Xt(k[3],E),Xt(k[4],y),Xt(k[5],W);else if(Dr(le,P),ot(m,P),"faces"in P){var ae=P.faces;for(h(Array.isArray(ae)&&ae.length===6,"cube faces must be a length 6 array"),j=0;j<6;++j)h(typeof ae[j]=="object"&&!!ae[j],"invalid input for cube map face"),Ie(k[j],m),Xt(k[j],ae[j])}else for(j=0;j<6;++j)Xt(k[j],P);else h.raise("invalid arguments to cube map");for(Ie(m,k[0]),L.npotTextureCube||h(km(m.width)&&km(m.height),"your browser does not support non power or two texture dimensions"),le.genMipmaps?m.mipmask=(k[0].width<<1)-1:m.mipmask=k[0].mipmask,h.textureCube(m,le,k,L),m.internalformat=k[0].internalformat,U.width=k[0].width,U.height=k[0].height,an(m),j=0;j<6;++j)Br(k[j],ul+j);for($r(le,Su),Kt(),re.profile&&(m.stats.size=gl(m.internalformat,m.type,U.width,U.height,le.genMipmaps,!0)),U.format=Le[m.internalformat],U.type=We[m.type],U.mag=de[le.magFilter],U.min=$e[le.minFilter],U.wrapS=he[le.wrapS],U.wrapT=he[le.wrapT],j=0;j<6;++j)Vr(k[j]);return U}function z(P,N,S,E,y){h(!!N,"must specify image data"),h(typeof P=="number"&&P===(P|0)&&P>=0&&P<6,"invalid face");var W=S|0,j=E|0,le=y|0,ue=je();return Ie(ue,m),ue.width=0,ue.height=0,Ae(ue,N),ue.width=ue.width||(m.width>>le)-W,ue.height=ue.height||(m.height>>le)-j,h(m.type===ue.type&&m.format===ue.format&&m.internalformat===ue.internalformat,"incompatible format for texture.subimage"),h(W>=0&&j>=0&&W+ue.width<=m.width&&j+ue.height<=m.height,"texture.subimage write out of bounds"),h(m.mipmask&1<<le,"missing mipmap data"),h(ue.data||ue.element||ue.needsCopy,"missing image data"),an(m),pt(ue,ul+P,W,j,le),Kt(),Bt(ue),U}function I(P){var N=P|0;if(N!==m.width){U.width=m.width=N,U.height=m.height=N,an(m);for(var S=0;S<6;++S)for(var E=0;m.mipmask>>E;++E)c.texImage2D(ul+S,E,m.format,N>>E,N>>E,0,m.format,m.type,null);return Kt(),re.profile&&(m.stats.size=gl(m.internalformat,m.type,U.width,U.height,!1,!0)),U}}return U(T,J,q,ze,Dt,_),U.subimage=z,U.resize=I,U._reglType="textureCube",U._texture=m,re.profile&&(U.stats=m.stats),U.destroy=function(){m.decRef()},U}function Er(){for(var T=0;T<on;++T)c.activeTexture(Qi+T),c.bindTexture(xo,null),Cr[T]=null;ge(en).forEach(ct),Q.cubeCount=0,Q.textureCount=0}re.profile&&(Q.getTotalTextureSize=function(){var T=0;return Object.keys(en).forEach(function(J){T+=en[J].stats.size}),T});function _o(){for(var T=0;T<on;++T){var J=Cr[T];J&&(J.bindCount=0,J.unit=-1,Cr[T]=null)}ge(en).forEach(function(q){q.texture=c.createTexture(),c.bindTexture(q.target,q.texture);for(var ze=0;ze<32;++ze)if((q.mipmask&1<<ze)!==0)if(q.target===xo)c.texImage2D(xo,ze,q.internalformat,q.width>>ze,q.height>>ze,0,q.internalformat,q.type,null);else for(var Dt=0;Dt<6;++Dt)c.texImage2D(ul+Dt,ze,q.internalformat,q.width>>ze,q.height>>ze,0,q.internalformat,q.type,null);$r(q.texInfo,q.target)})}function Sa(){for(var T=0;T<on;++T){var J=Cr[T];J&&(J.bindCount=0,J.unit=-1,Cr[T]=null),c.activeTexture(Qi+T),c.bindTexture(xo,null),c.bindTexture(Su,null)}}return{create2D:Nt,createCube:$t,clear:Er,getTexture:function(T){return null},restore:_o,refresh:Sa}}var Yo=36161,bl=32854,o0=32855,a0=36194,i0=33189,s0=36168,l0=34041,c0=35907,u0=34836,f0=34842,p0=34843,oo=[];oo[bl]=2,oo[o0]=2,oo[a0]=2,oo[i0]=2,oo[s0]=1,oo[l0]=4,oo[c0]=4,oo[u0]=16,oo[f0]=8,oo[p0]=6;function d0(c,g,L){return oo[c]*g*L}var bT=function(c,g,L,Z,ce){var Q={rgba4:bl,rgb565:a0,"rgb5 a1":o0,depth:i0,stencil:s0,"depth stencil":l0};g.ext_srgb&&(Q.srgba=c0),g.ext_color_buffer_half_float&&(Q.rgba16f=f0,Q.rgb16f=p0),g.webgl_color_buffer_float&&(Q.rgba32f=u0);var re=[];Object.keys(Q).forEach(function(xe){var ke=Q[xe];re[ke]=xe});var ye=0,ve={};function we(xe){this.id=ye++,this.refCount=1,this.renderbuffer=xe,this.format=bl,this.width=0,this.height=0,ce.profile&&(this.stats={size:0})}we.prototype.decRef=function(){--this.refCount<=0&&_e(this)};function _e(xe){var ke=xe.renderbuffer;h(ke,"must not double destroy renderbuffer"),c.bindRenderbuffer(Yo,null),c.deleteRenderbuffer(ke),xe.renderbuffer=null,xe.refCount=0,delete ve[xe.id],Z.renderbufferCount--}function Re(xe,ke){var $=new we(c.createRenderbuffer());ve[$.id]=$,Z.renderbufferCount++;function ne(We,de){var $e=0,he=0,Oe=bl;if(typeof We=="object"&&We){var me=We;if("shape"in me){var Ie=me.shape;h(Array.isArray(Ie)&&Ie.length>=2,"invalid renderbuffer shape"),$e=Ie[0]|0,he=Ie[1]|0}else"radius"in me&&($e=he=me.radius|0),"width"in me&&($e=me.width|0),"height"in me&&(he=me.height|0);"format"in me&&(h.parameter(me.format,Q,"invalid renderbuffer format"),Oe=Q[me.format])}else typeof We=="number"?($e=We|0,typeof de=="number"?he=de|0:he=$e):We?h.raise("invalid arguments to renderbuffer constructor"):$e=he=1;if(h($e>0&&he>0&&$e<=L.maxRenderbufferSize&&he<=L.maxRenderbufferSize,"invalid renderbuffer size"),!($e===$.width&&he===$.height&&Oe===$.format))return ne.width=$.width=$e,ne.height=$.height=he,$.format=Oe,c.bindRenderbuffer(Yo,$.renderbuffer),c.renderbufferStorage(Yo,Oe,$e,he),h(c.getError()===0,"invalid render buffer format"),ce.profile&&($.stats.size=d0($.format,$.width,$.height)),ne.format=re[$.format],ne}function Le(We,de){var $e=We|0,he=de|0||$e;return $e===$.width&&he===$.height||(h($e>0&&he>0&&$e<=L.maxRenderbufferSize&&he<=L.maxRenderbufferSize,"invalid renderbuffer size"),ne.width=$.width=$e,ne.height=$.height=he,c.bindRenderbuffer(Yo,$.renderbuffer),c.renderbufferStorage(Yo,$.format,$e,he),h(c.getError()===0,"invalid render buffer format"),ce.profile&&($.stats.size=d0($.format,$.width,$.height))),ne}return ne(xe,ke),ne.resize=Le,ne._reglType="renderbuffer",ne._renderbuffer=$,ce.profile&&(ne.stats=$.stats),ne.destroy=function(){$.decRef()},ne}ce.profile&&(Z.getTotalRenderbufferSize=function(){var xe=0;return Object.keys(ve).forEach(function(ke){xe+=ve[ke].stats.size}),xe});function De(){ge(ve).forEach(function(xe){xe.renderbuffer=c.createRenderbuffer(),c.bindRenderbuffer(Yo,xe.renderbuffer),c.renderbufferStorage(Yo,xe.format,xe.width,xe.height)}),c.bindRenderbuffer(Yo,null)}return{create:Re,clear:function(){ge(ve).forEach(_e)},restore:De}},Oo=36160,Nu=36161,ga=3553,yl=34069,m0=36064,h0=36096,g0=36128,b0=33306,y0=36053,yT=36054,xT=36055,vT=36057,_T=36061,ST=36193,TT=5121,MT=5126,x0=6407,v0=6408,LT=6402,wT=[x0,v0],Gu=[];Gu[v0]=4,Gu[x0]=3;var xl=[];xl[TT]=1,xl[MT]=4,xl[ST]=2;var AT=32854,CT=32855,ET=36194,RT=33189,kT=36168,_0=34041,PT=35907,FT=34836,OT=34842,IT=34843,BT=[AT,CT,ET,PT,OT,IT,FT],ei={};ei[y0]="complete",ei[yT]="incomplete attachment",ei[vT]="incomplete dimensions",ei[xT]="incomplete, missing attachment",ei[_T]="unsupported";function DT(c,g,L,Z,ce,Q){var re={cur:null,next:null,dirty:!1,setFBO:null},ye=["rgba"],ve=["rgba4","rgb565","rgb5 a1"];g.ext_srgb&&ve.push("srgba"),g.ext_color_buffer_half_float&&ve.push("rgba16f","rgb16f"),g.webgl_color_buffer_float&&ve.push("rgba32f");var we=["uint8"];g.oes_texture_half_float&&we.push("half float","float16"),g.oes_texture_float&&we.push("float","float32");function _e(He,Ae,pe){this.target=He,this.texture=Ae,this.renderbuffer=pe;var pt=0,At=0;Ae?(pt=Ae.width,At=Ae.height):pe&&(pt=pe.width,At=pe.height),this.width=pt,this.height=At}function Re(He){He&&(He.texture&&He.texture._texture.decRef(),He.renderbuffer&&He.renderbuffer._renderbuffer.decRef())}function De(He,Ae,pe){if(He)if(He.texture){var pt=He.texture._texture,At=Math.max(1,pt.width),je=Math.max(1,pt.height);h(At===Ae&&je===pe,"inconsistent width/height for supplied texture"),pt.refCount+=1}else{var Bt=He.renderbuffer._renderbuffer;h(Bt.width===Ae&&Bt.height===pe,"inconsistent width/height for renderbuffer"),Bt.refCount+=1}}function xe(He,Ae){Ae&&(Ae.texture?c.framebufferTexture2D(Oo,He,Ae.target,Ae.texture._texture.texture,0):c.framebufferRenderbuffer(Oo,He,Nu,Ae.renderbuffer._renderbuffer.renderbuffer))}function ke(He){var Ae=ga,pe=null,pt=null,At=He;typeof He=="object"&&(At=He.data,"target"in He&&(Ae=He.target|0)),h.type(At,"function","invalid attachment data");var je=At._reglType;return je==="texture2d"?(pe=At,h(Ae===ga)):je==="textureCube"?(pe=At,h(Ae>=yl&&Ae<yl+6,"invalid cube map target")):je==="renderbuffer"?(pt=At,Ae=Nu):h.raise("invalid regl object for attachment"),new _e(Ae,pe,pt)}function $(He,Ae,pe,pt,At){if(pe){var je=Z.create2D({width:He,height:Ae,format:pt,type:At});return je._texture.refCount=0,new _e(ga,je,null)}else{var Bt=ce.create({width:He,height:Ae,format:pt});return Bt._renderbuffer.refCount=0,new _e(Nu,null,Bt)}}function ne(He){return He&&(He.texture||He.renderbuffer)}function Le(He,Ae,pe){He&&(He.texture?He.texture.resize(Ae,pe):He.renderbuffer&&He.renderbuffer.resize(Ae,pe),He.width=Ae,He.height=pe)}var We=0,de={};function $e(){this.id=We++,de[this.id]=this,this.framebuffer=c.createFramebuffer(),this.width=0,this.height=0,this.colorAttachments=[],this.depthAttachment=null,this.stencilAttachment=null,this.depthStencilAttachment=null}function he(He){He.colorAttachments.forEach(Re),Re(He.depthAttachment),Re(He.stencilAttachment),Re(He.depthStencilAttachment)}function Oe(He){var Ae=He.framebuffer;h(Ae,"must not double destroy framebuffer"),c.deleteFramebuffer(Ae),He.framebuffer=null,Q.framebufferCount--,delete de[He.id]}function me(He){var Ae;c.bindFramebuffer(Oo,He.framebuffer);var pe=He.colorAttachments;for(Ae=0;Ae<pe.length;++Ae)xe(m0+Ae,pe[Ae]);for(Ae=pe.length;Ae<L.maxColorAttachments;++Ae)c.framebufferTexture2D(Oo,m0+Ae,ga,null,0);c.framebufferTexture2D(Oo,b0,ga,null,0),c.framebufferTexture2D(Oo,h0,ga,null,0),c.framebufferTexture2D(Oo,g0,ga,null,0),xe(h0,He.depthAttachment),xe(g0,He.stencilAttachment),xe(b0,He.depthStencilAttachment);var pt=c.checkFramebufferStatus(Oo);!c.isContextLost()&&pt!==y0&&h.raise("framebuffer configuration not supported, status = "+ei[pt]),c.bindFramebuffer(Oo,re.next?re.next.framebuffer:null),re.cur=re.next,c.getError()}function Ie(He,Ae){var pe=new $e;Q.framebufferCount++;function pt(je,Bt){var vt;h(re.next!==pe,"can not update framebuffer which is currently in use");var Ot=0,Xt=0,Br=!0,qr=!0,Gt=null,Vr=!0,pr="rgba",Dr="uint8",$r=1,zr=null,en=null,on=null,Cr=!1;if(typeof je=="number")Ot=je|0,Xt=Bt|0||Ot;else if(!je)Ot=Xt=1;else{h.type(je,"object","invalid arguments for framebuffer");var Ct=je;if("shape"in Ct){var an=Ct.shape;h(Array.isArray(an)&&an.length>=2,"invalid shape for framebuffer"),Ot=an[0],Xt=an[1]}else"radius"in Ct&&(Ot=Xt=Ct.radius),"width"in Ct&&(Ot=Ct.width),"height"in Ct&&(Xt=Ct.height);("color"in Ct||"colors"in Ct)&&(Gt=Ct.color||Ct.colors,Array.isArray(Gt)&&h(Gt.length===1||g.webgl_draw_buffers,"multiple render targets not supported")),Gt||("colorCount"in Ct&&($r=Ct.colorCount|0,h($r>0,"invalid color buffer count")),"colorTexture"in Ct&&(Vr=!!Ct.colorTexture,pr="rgba4"),"colorType"in Ct&&(Dr=Ct.colorType,Vr?(h(g.oes_texture_float||!(Dr==="float"||Dr==="float32"),"you must enable OES_texture_float in order to use floating point framebuffer objects"),h(g.oes_texture_half_float||!(Dr==="half float"||Dr==="float16"),"you must enable OES_texture_half_float in order to use 16-bit floating point framebuffer objects")):Dr==="half float"||Dr==="float16"?(h(g.ext_color_buffer_half_float,"you must enable EXT_color_buffer_half_float to use 16-bit render buffers"),pr="rgba16f"):(Dr==="float"||Dr==="float32")&&(h(g.webgl_color_buffer_float,"you must enable WEBGL_color_buffer_float in order to use 32-bit floating point renderbuffers"),pr="rgba32f"),h.oneOf(Dr,we,"invalid color type")),"colorFormat"in Ct&&(pr=Ct.colorFormat,ye.indexOf(pr)>=0?Vr=!0:ve.indexOf(pr)>=0?Vr=!1:Vr?h.oneOf(Ct.colorFormat,ye,"invalid color format for texture"):h.oneOf(Ct.colorFormat,ve,"invalid color format for renderbuffer"))),("depthTexture"in Ct||"depthStencilTexture"in Ct)&&(Cr=!!(Ct.depthTexture||Ct.depthStencilTexture),h(!Cr||g.webgl_depth_texture,"webgl_depth_texture extension not supported")),"depth"in Ct&&(typeof Ct.depth=="boolean"?Br=Ct.depth:(zr=Ct.depth,qr=!1)),"stencil"in Ct&&(typeof Ct.stencil=="boolean"?qr=Ct.stencil:(en=Ct.stencil,Br=!1)),"depthStencil"in Ct&&(typeof Ct.depthStencil=="boolean"?Br=qr=Ct.depthStencil:(on=Ct.depthStencil,Br=!1,qr=!1))}var Kt=null,ct=null,Nt=null,$t=null;if(Array.isArray(Gt))Kt=Gt.map(ke);else if(Gt)Kt=[ke(Gt)];else for(Kt=new Array($r),vt=0;vt<$r;++vt)Kt[vt]=$(Ot,Xt,Vr,pr,Dr);h(g.webgl_draw_buffers||Kt.length<=1,"you must enable the WEBGL_draw_buffers extension in order to use multiple color buffers."),h(Kt.length<=L.maxColorAttachments,"too many color attachments, not supported"),Ot=Ot||Kt[0].width,Xt=Xt||Kt[0].height,zr?ct=ke(zr):Br&&!qr&&(ct=$(Ot,Xt,Cr,"depth","uint32")),en?Nt=ke(en):qr&&!Br&&(Nt=$(Ot,Xt,!1,"stencil","uint8")),on?$t=ke(on):!zr&&!en&&qr&&Br&&($t=$(Ot,Xt,Cr,"depth stencil","depth stencil")),h(!!zr+!!en+!!on<=1,"invalid framebuffer configuration, can specify exactly one depth/stencil attachment");var Er=null;for(vt=0;vt<Kt.length;++vt)if(De(Kt[vt],Ot,Xt),h(!Kt[vt]||Kt[vt].texture&&wT.indexOf(Kt[vt].texture._texture.format)>=0||Kt[vt].renderbuffer&&BT.indexOf(Kt[vt].renderbuffer._renderbuffer.format)>=0,"framebuffer color attachment "+vt+" is invalid"),Kt[vt]&&Kt[vt].texture){var _o=Gu[Kt[vt].texture._texture.format]*xl[Kt[vt].texture._texture.type];Er===null?Er=_o:h(Er===_o,"all color attachments much have the same number of bits per pixel.")}return De(ct,Ot,Xt),h(!ct||ct.texture&&ct.texture._texture.format===LT||ct.renderbuffer&&ct.renderbuffer._renderbuffer.format===RT,"invalid depth attachment for framebuffer object"),De(Nt,Ot,Xt),h(!Nt||Nt.renderbuffer&&Nt.renderbuffer._renderbuffer.format===kT,"invalid stencil attachment for framebuffer object"),De($t,Ot,Xt),h(!$t||$t.texture&&$t.texture._texture.format===_0||$t.renderbuffer&&$t.renderbuffer._renderbuffer.format===_0,"invalid depth-stencil attachment for framebuffer object"),he(pe),pe.width=Ot,pe.height=Xt,pe.colorAttachments=Kt,pe.depthAttachment=ct,pe.stencilAttachment=Nt,pe.depthStencilAttachment=$t,pt.color=Kt.map(ne),pt.depth=ne(ct),pt.stencil=ne(Nt),pt.depthStencil=ne($t),pt.width=pe.width,pt.height=pe.height,me(pe),pt}function At(je,Bt){h(re.next!==pe,"can not resize a framebuffer which is currently in use");var vt=Math.max(je|0,1),Ot=Math.max(Bt|0||vt,1);if(vt===pe.width&&Ot===pe.height)return pt;for(var Xt=pe.colorAttachments,Br=0;Br<Xt.length;++Br)Le(Xt[Br],vt,Ot);return Le(pe.depthAttachment,vt,Ot),Le(pe.stencilAttachment,vt,Ot),Le(pe.depthStencilAttachment,vt,Ot),pe.width=pt.width=vt,pe.height=pt.height=Ot,me(pe),pt}return pt(He,Ae),t(pt,{resize:At,_reglType:"framebuffer",_framebuffer:pe,destroy:function(){Oe(pe),he(pe)},use:function(je){re.setFBO({framebuffer:pt},je)}})}function ot(He){var Ae=Array(6);function pe(At){var je;h(Ae.indexOf(re.next)<0,"can not update framebuffer which is currently in use");var Bt={color:null},vt=0,Ot=null,Xt="rgba",Br="uint8",qr=1;if(typeof At=="number")vt=At|0;else if(!At)vt=1;else{h.type(At,"object","invalid arguments for framebuffer");var Gt=At;if("shape"in Gt){var Vr=Gt.shape;h(Array.isArray(Vr)&&Vr.length>=2,"invalid shape for framebuffer"),h(Vr[0]===Vr[1],"cube framebuffer must be square"),vt=Vr[0]}else"radius"in Gt&&(vt=Gt.radius|0),"width"in Gt?(vt=Gt.width|0,"height"in Gt&&h(Gt.height===vt,"must be square")):"height"in Gt&&(vt=Gt.height|0);("color"in Gt||"colors"in Gt)&&(Ot=Gt.color||Gt.colors,Array.isArray(Ot)&&h(Ot.length===1||g.webgl_draw_buffers,"multiple render targets not supported")),Ot||("colorCount"in Gt&&(qr=Gt.colorCount|0,h(qr>0,"invalid color buffer count")),"colorType"in Gt&&(h.oneOf(Gt.colorType,we,"invalid color type"),Br=Gt.colorType),"colorFormat"in Gt&&(Xt=Gt.colorFormat,h.oneOf(Gt.colorFormat,ye,"invalid color format for texture"))),"depth"in Gt&&(Bt.depth=Gt.depth),"stencil"in Gt&&(Bt.stencil=Gt.stencil),"depthStencil"in Gt&&(Bt.depthStencil=Gt.depthStencil)}var pr;if(Ot)if(Array.isArray(Ot))for(pr=[],je=0;je<Ot.length;++je)pr[je]=Ot[je];else pr=[Ot];else{pr=Array(qr);var Dr={radius:vt,format:Xt,type:Br};for(je=0;je<qr;++je)pr[je]=Z.createCube(Dr)}for(Bt.color=Array(pr.length),je=0;je<pr.length;++je){var $r=pr[je];h(typeof $r=="function"&&$r._reglType==="textureCube","invalid cube map"),vt=vt||$r.width,h($r.width===vt&&$r.height===vt,"invalid cube map shape"),Bt.color[je]={target:yl,data:pr[je]}}for(je=0;je<6;++je){for(var zr=0;zr<pr.length;++zr)Bt.color[zr].target=yl+je;je>0&&(Bt.depth=Ae[0].depth,Bt.stencil=Ae[0].stencil,Bt.depthStencil=Ae[0].depthStencil),Ae[je]?Ae[je](Bt):Ae[je]=Ie(Bt)}return t(pe,{width:vt,height:vt,color:pr})}function pt(At){var je,Bt=At|0;if(h(Bt>0&&Bt<=L.maxCubeMapSize,"invalid radius for cube fbo"),Bt===pe.width)return pe;var vt=pe.color;for(je=0;je<vt.length;++je)vt[je].resize(Bt);for(je=0;je<6;++je)Ae[je].resize(Bt);return pe.width=pe.height=Bt,pe}return pe(He),t(pe,{faces:Ae,resize:pt,_reglType:"framebufferCube",destroy:function(){Ae.forEach(function(At){At.destroy()})}})}function xt(){re.cur=null,re.next=null,re.dirty=!0,ge(de).forEach(function(He){He.framebuffer=c.createFramebuffer(),me(He)})}return t(re,{getFramebuffer:function(He){if(typeof He=="function"&&He._reglType==="framebuffer"){var Ae=He._framebuffer;if(Ae instanceof $e)return Ae}return null},create:Ie,createCube:ot,clear:function(){ge(de).forEach(Oe)},restore:xt})}var HT=5126,S0=34962;function Wu(){this.state=0,this.x=0,this.y=0,this.z=0,this.w=0,this.buffer=null,this.size=0,this.normalized=!1,this.type=HT,this.offset=0,this.stride=0,this.divisor=0}function NT(c,g,L,Z,ce){for(var Q=L.maxAttributes,re=new Array(Q),ye=0;ye<Q;++ye)re[ye]=new Wu;var ve=0,we={},_e={Record:Wu,scope:{},state:re,currentVAO:null,targetVAO:null,restore:De()?de:function(){},createVAO:$e,getVAO:ke,destroyBuffer:Re,setVAO:De()?$:ne,clear:De()?Le:function(){}};function Re(he){for(var Oe=0;Oe<re.length;++Oe){var me=re[Oe];me.buffer===he&&(c.disableVertexAttribArray(Oe),me.buffer=null)}}function De(){return g.oes_vertex_array_object}function xe(){return g.angle_instanced_arrays}function ke(he){return typeof he=="function"&&he._vao?he._vao:null}function $(he){if(he!==_e.currentVAO){var Oe=De();he?Oe.bindVertexArrayOES(he.vao):Oe.bindVertexArrayOES(null),_e.currentVAO=he}}function ne(he){if(he!==_e.currentVAO){if(he)he.bindAttrs();else for(var Oe=xe(),me=0;me<re.length;++me){var Ie=re[me];Ie.buffer?(c.enableVertexAttribArray(me),c.vertexAttribPointer(me,Ie.size,Ie.type,Ie.normalized,Ie.stride,Ie.offfset),Oe&&Ie.divisor&&Oe.vertexAttribDivisorANGLE(me,Ie.divisor)):(c.disableVertexAttribArray(me),c.vertexAttrib4f(me,Ie.x,Ie.y,Ie.z,Ie.w))}_e.currentVAO=he}}function Le(){ge(we).forEach(function(he){he.destroy()})}function We(){this.id=++ve,this.attributes=[];var he=De();he?this.vao=he.createVertexArrayOES():this.vao=null,we[this.id]=this,this.buffers=[]}We.prototype.bindAttrs=function(){for(var he=xe(),Oe=this.attributes,me=0;me<Oe.length;++me){var Ie=Oe[me];Ie.buffer?(c.enableVertexAttribArray(me),c.bindBuffer(S0,Ie.buffer.buffer),c.vertexAttribPointer(me,Ie.size,Ie.type,Ie.normalized,Ie.stride,Ie.offset),he&&Ie.divisor&&he.vertexAttribDivisorANGLE(me,Ie.divisor)):(c.disableVertexAttribArray(me),c.vertexAttrib4f(me,Ie.x,Ie.y,Ie.z,Ie.w))}for(var ot=Oe.length;ot<Q;++ot)c.disableVertexAttribArray(ot)},We.prototype.refresh=function(){var he=De();he&&(he.bindVertexArrayOES(this.vao),this.bindAttrs(),_e.currentVAO=this)},We.prototype.destroy=function(){if(this.vao){var he=De();this===_e.currentVAO&&(_e.currentVAO=null,he.bindVertexArrayOES(null)),he.deleteVertexArrayOES(this.vao),this.vao=null}we[this.id]&&(delete we[this.id],Z.vaoCount-=1)};function de(){var he=De();he&&ge(we).forEach(function(Oe){Oe.refresh()})}function $e(he){var Oe=new We;Z.vaoCount+=1;function me(Ie){h(Array.isArray(Ie),"arguments to vertex array constructor must be an array"),h(Ie.length<Q,"too many attributes"),h(Ie.length>0,"must specify at least one attribute");var ot={},xt=Oe.attributes;xt.length=Ie.length;for(var He=0;He<Ie.length;++He){var Ae=Ie[He],pe=xt[He]=new Wu,pt=Ae.data||Ae;if(Array.isArray(pt)||e(pt)||se(pt)){var At;Oe.buffers[He]&&(At=Oe.buffers[He],e(pt)&&At._buffer.byteLength>=pt.byteLength?At.subdata(pt):(At.destroy(),Oe.buffers[He]=null)),Oe.buffers[He]||(At=Oe.buffers[He]=ce.create(Ae,S0,!1,!0)),pe.buffer=ce.getBuffer(At),pe.size=pe.buffer.dimension|0,pe.normalized=!1,pe.type=pe.buffer.dtype,pe.offset=0,pe.stride=0,pe.divisor=0,pe.state=1,ot[He]=1}else ce.getBuffer(Ae)?(pe.buffer=ce.getBuffer(Ae),pe.size=pe.buffer.dimension|0,pe.normalized=!1,pe.type=pe.buffer.dtype,pe.offset=0,pe.stride=0,pe.divisor=0,pe.state=1):ce.getBuffer(Ae.buffer)?(pe.buffer=ce.getBuffer(Ae.buffer),pe.size=(+Ae.size||pe.buffer.dimension)|0,pe.normalized=!!Ae.normalized||!1,"type"in Ae?(h.parameter(Ae.type,Fo,"invalid buffer type"),pe.type=Fo[Ae.type]):pe.type=pe.buffer.dtype,pe.offset=(Ae.offset||0)|0,pe.stride=(Ae.stride||0)|0,pe.divisor=(Ae.divisor||0)|0,pe.state=1,h(pe.size>=1&&pe.size<=4,"size must be between 1 and 4"),h(pe.offset>=0,"invalid offset"),h(pe.stride>=0&&pe.stride<=255,"stride must be between 0 and 255"),h(pe.divisor>=0,"divisor must be positive"),h(!pe.divisor||!!g.angle_instanced_arrays,"ANGLE_instanced_arrays must be enabled to use divisor")):"x"in Ae?(h(He>0,"first attribute must not be a constant"),pe.x=+Ae.x||0,pe.y=+Ae.y||0,pe.z=+Ae.z||0,pe.w=+Ae.w||0,pe.state=2):h(!1,"invalid attribute spec for location "+He)}for(var je=0;je<Oe.buffers.length;++je)!ot[je]&&Oe.buffers[je]&&(Oe.buffers[je].destroy(),Oe.buffers[je]=null);return Oe.refresh(),me}return me.destroy=function(){for(var Ie=0;Ie<Oe.buffers.length;++Ie)Oe.buffers[Ie]&&Oe.buffers[Ie].destroy();Oe.buffers.length=0,Oe.destroy()},me._vao=Oe,me._reglType="vao",me(he)}return _e}var T0=35632,GT=35633,WT=35718,UT=35721;function VT(c,g,L,Z){var ce={},Q={};function re($,ne,Le,We){this.name=$,this.id=ne,this.location=Le,this.info=We}function ye($,ne){for(var Le=0;Le<$.length;++Le)if($[Le].id===ne.id){$[Le].location=ne.location;return}$.push(ne)}function ve($,ne,Le){var We=$===T0?ce:Q,de=We[ne];if(!de){var $e=g.str(ne);de=c.createShader($),c.shaderSource(de,$e),c.compileShader(de),h.shaderError(c,de,$e,$,Le),We[ne]=de}return de}var we={},_e=[],Re=0;function De($,ne){this.id=Re++,this.fragId=$,this.vertId=ne,this.program=null,this.uniforms=[],this.attributes=[],this.refCount=1,Z.profile&&(this.stats={uniformsCount:0,attributesCount:0})}function xe($,ne,Le){var We,de,$e=ve(T0,$.fragId),he=ve(GT,$.vertId),Oe=$.program=c.createProgram();if(c.attachShader(Oe,$e),c.attachShader(Oe,he),Le)for(We=0;We<Le.length;++We){var me=Le[We];c.bindAttribLocation(Oe,me[0],me[1])}c.linkProgram(Oe),h.linkError(c,Oe,g.str($.fragId),g.str($.vertId),ne);var Ie=c.getProgramParameter(Oe,WT);Z.profile&&($.stats.uniformsCount=Ie);var ot=$.uniforms;for(We=0;We<Ie;++We)if(de=c.getActiveUniform(Oe,We),de)if(de.size>1)for(var xt=0;xt<de.size;++xt){var He=de.name.replace("[0]","["+xt+"]");ye(ot,new re(He,g.id(He),c.getUniformLocation(Oe,He),de))}else ye(ot,new re(de.name,g.id(de.name),c.getUniformLocation(Oe,de.name),de));var Ae=c.getProgramParameter(Oe,UT);Z.profile&&($.stats.attributesCount=Ae);var pe=$.attributes;for(We=0;We<Ae;++We)de=c.getActiveAttrib(Oe,We),de&&ye(pe,new re(de.name,g.id(de.name),c.getAttribLocation(Oe,de.name),de))}Z.profile&&(L.getMaxUniformsCount=function(){var $=0;return _e.forEach(function(ne){ne.stats.uniformsCount>$&&($=ne.stats.uniformsCount)}),$},L.getMaxAttributesCount=function(){var $=0;return _e.forEach(function(ne){ne.stats.attributesCount>$&&($=ne.stats.attributesCount)}),$});function ke(){ce={},Q={};for(var $=0;$<_e.length;++$)xe(_e[$],null,_e[$].attributes.map(function(ne){return[ne.location,ne.name]}))}return{clear:function(){var $=c.deleteShader.bind(c);ge(ce).forEach($),ce={},ge(Q).forEach($),Q={},_e.forEach(function(ne){c.deleteProgram(ne.program)}),_e.length=0,we={},L.shaderCount=0},program:function($,ne,Le,We){h.command($>=0,"missing vertex shader",Le),h.command(ne>=0,"missing fragment shader",Le);var de=we[ne];de||(de=we[ne]={});var $e=de[$];if($e&&($e.refCount++,!We))return $e;var he=new De(ne,$);return L.shaderCount++,xe(he,Le,We),$e||(de[$]=he),_e.push(he),t(he,{destroy:function(){if(he.refCount--,he.refCount<=0){c.deleteProgram(he.program);var Oe=_e.indexOf(he);_e.splice(Oe,1),L.shaderCount--}de[he.vertId].refCount<=0&&(c.deleteShader(Q[he.vertId]),delete Q[he.vertId],delete we[he.fragId][he.vertId]),Object.keys(we[he.fragId]).length||(c.deleteShader(ce[he.fragId]),delete ce[he.fragId],delete we[he.fragId])}})},restore:ke,shader:ve,frag:-1,vert:-1}}var $T=6408,Zi=5121,zT=3333,vl=5126;function XT(c,g,L,Z,ce,Q,re){function ye(_e){var Re;g.next===null?(h(ce.preserveDrawingBuffer,'you must create a webgl context with "preserveDrawingBuffer":true in order to read pixels from the drawing buffer'),Re=Zi):(h(g.next.colorAttachments[0].texture!==null,"You cannot read from a renderbuffer"),Re=g.next.colorAttachments[0].texture._texture.type,Q.oes_texture_float?(h(Re===Zi||Re===vl,"Reading from a framebuffer is only allowed for the types 'uint8' and 'float'"),Re===vl&&h(re.readFloat,"Reading 'float' values is not permitted in your browser. For a fallback, please see: https://www.npmjs.com/package/glsl-read-float")):h(Re===Zi,"Reading from a framebuffer is only allowed for the type 'uint8'"));var De=0,xe=0,ke=Z.framebufferWidth,$=Z.framebufferHeight,ne=null;e(_e)?ne=_e:_e&&(h.type(_e,"object","invalid arguments to regl.read()"),De=_e.x|0,xe=_e.y|0,h(De>=0&&De<Z.framebufferWidth,"invalid x offset for regl.read"),h(xe>=0&&xe<Z.framebufferHeight,"invalid y offset for regl.read"),ke=(_e.width||Z.framebufferWidth-De)|0,$=(_e.height||Z.framebufferHeight-xe)|0,ne=_e.data||null),ne&&(Re===Zi?h(ne instanceof Uint8Array,"buffer must be 'Uint8Array' when reading from a framebuffer of type 'uint8'"):Re===vl&&h(ne instanceof Float32Array,"buffer must be 'Float32Array' when reading from a framebuffer of type 'float'")),h(ke>0&&ke+De<=Z.framebufferWidth,"invalid width for read pixels"),h($>0&&$+xe<=Z.framebufferHeight,"invalid height for read pixels"),L();var Le=ke*$*4;return ne||(Re===Zi?ne=new Uint8Array(Le):Re===vl&&(ne=ne||new Float32Array(Le))),h.isTypedArray(ne,"data buffer for regl.read() must be a typedarray"),h(ne.byteLength>=Le,"data buffer for regl.read() too small"),c.pixelStorei(zT,4),c.readPixels(De,xe,ke,$,$T,Re,ne),ne}function ve(_e){var Re;return g.setFBO({framebuffer:_e.framebuffer},function(){Re=ye(_e)}),Re}function we(_e){return!_e||!("framebuffer"in _e)?ye(_e):ve(_e)}return we}function ti(c){return Array.prototype.slice.call(c)}function ri(c){return ti(c).join("")}function jT(){var c=0,g=[],L=[];function Z(Re){for(var De=0;De<L.length;++De)if(L[De]===Re)return g[De];var xe="g"+c++;return g.push(xe),L.push(Re),xe}function ce(){var Re=[];function De(){Re.push.apply(Re,ti(arguments))}var xe=[];function ke(){var $="v"+c++;return xe.push($),arguments.length>0&&(Re.push($,"="),Re.push.apply(Re,ti(arguments)),Re.push(";")),$}return t(De,{def:ke,toString:function(){return ri([xe.length>0?"var "+xe.join(",")+";":"",ri(Re)])}})}function Q(){var Re=ce(),De=ce(),xe=Re.toString,ke=De.toString;function $(ne,Le){De(ne,Le,"=",Re.def(ne,Le),";")}return t(function(){Re.apply(Re,ti(arguments))},{def:Re.def,entry:Re,exit:De,save:$,set:function(ne,Le,We){$(ne,Le),Re(ne,Le,"=",We,";")},toString:function(){return xe()+ke()}})}function re(){var Re=ri(arguments),De=Q(),xe=Q(),ke=De.toString,$=xe.toString;return t(De,{then:function(){return De.apply(De,ti(arguments)),this},else:function(){return xe.apply(xe,ti(arguments)),this},toString:function(){var ne=$();return ne&&(ne="else{"+ne+"}"),ri(["if(",Re,"){",ke(),"}",ne])}})}var ye=ce(),ve={};function we(Re,De){var xe=[];function ke(){var de="a"+xe.length;return xe.push(de),de}De=De||0;for(var $=0;$<De;++$)ke();var ne=Q(),Le=ne.toString,We=ve[Re]=t(ne,{arg:ke,toString:function(){return ri(["function(",xe.join(),"){",Le(),"}"])}});return We}function _e(){var Re=['"use strict";',ye,"return {"];Object.keys(ve).forEach(function(ke){Re.push('"',ke,'":',ve[ke].toString(),",")}),Re.push("}");var De=ri(Re).replace(/;/g,`;
`).replace(/}/g,`}
`).replace(/{/g,`{
`),xe=Function.apply(null,g.concat(De));return xe.apply(null,L)}return{global:ye,link:Z,block:ce,proc:we,scope:Q,cond:re,compile:_e}}var ni="xyzw".split(""),M0=5121,oi=1,Uu=2,Vu=0,$u=1,zu=2,Xu=3,_l=4,L0=5,w0=6,A0="dither",C0="blend.enable",E0="blend.color",ju="blend.equation",Yu="blend.func",R0="depth.enable",k0="depth.func",P0="depth.range",F0="depth.mask",qu="colorMask",O0="cull.enable",I0="cull.face",Ku="frontFace",Qu="lineWidth",B0="polygonOffset.enable",Zu="polygonOffset.offset",D0="sample.alpha",H0="sample.enable",Ju="sample.coverage",N0="stencil.enable",G0="stencil.mask",ef="stencil.func",tf="stencil.opFront",Ji="stencil.opBack",W0="scissor.enable",Sl="scissor.box",Io="viewport",es="profile",ba="framebuffer",ts="vert",rs="frag",ya="elements",xa="primitive",va="count",Tl="offset",Ml="instances",ns="vao",rf="Width",nf="Height",ai=ba+rf,ii=ba+nf,YT=Io+rf,qT=Io+nf,U0="drawingBuffer",V0=U0+rf,$0=U0+nf,KT=[Yu,ju,ef,tf,Ji,Ju,Io,Sl,Zu],si=34962,QT=34963,ZT=35632,JT=35633,z0=3553,eM=34067,tM=2884,rM=3042,nM=3024,oM=2960,aM=2929,iM=3089,sM=32823,lM=32926,cM=32928,of=5126,Ll=35664,wl=35665,Al=35666,af=5124,Cl=35667,El=35668,Rl=35669,sf=35670,kl=35671,Pl=35672,Fl=35673,os=35674,as=35675,is=35676,ss=35678,ls=35680,X0=4,cs=1028,_a=1029,j0=2304,lf=2305,uM=32775,fM=32776,pM=519,qo=7680,Y0=0,q0=1,K0=32774,dM=513,Q0=36160,mM=36064,vo={0:0,1:1,zero:0,one:1,"src color":768,"one minus src color":769,"src alpha":770,"one minus src alpha":771,"dst color":774,"one minus dst color":775,"dst alpha":772,"one minus dst alpha":773,"constant color":32769,"one minus constant color":32770,"constant alpha":32771,"one minus constant alpha":32772,"src alpha saturate":776},Z0=["constant color, constant alpha","one minus constant color, constant alpha","constant color, one minus constant alpha","one minus constant color, one minus constant alpha","constant alpha, constant color","constant alpha, one minus constant color","one minus constant alpha, constant color","one minus constant alpha, one minus constant color"],li={never:512,less:513,"<":513,equal:514,"=":514,"==":514,"===":514,lequal:515,"<=":515,greater:516,">":516,notequal:517,"!=":517,"!==":517,gequal:518,">=":518,always:519},Ko={0:0,zero:0,keep:7680,replace:7681,increment:7682,decrement:7683,"increment wrap":34055,"decrement wrap":34056,invert:5386},J0={frag:ZT,vert:JT},cf={cw:j0,ccw:lf};function Ol(c){return Array.isArray(c)||e(c)||se(c)}function eh(c){return c.sort(function(g,L){return g===Io?-1:L===Io?1:g<L?-1:1})}function Ln(c,g,L,Z){this.thisDep=c,this.contextDep=g,this.propDep=L,this.append=Z}function Qo(c){return c&&!(c.thisDep||c.contextDep||c.propDep)}function Ir(c){return new Ln(!1,!1,!1,c)}function Rn(c,g){var L=c.type;if(L===Vu){var Z=c.data.length;return new Ln(!0,Z>=1,Z>=2,g)}else if(L===_l){var ce=c.data;return new Ln(ce.thisDep,ce.contextDep,ce.propDep,g)}else{if(L===L0)return new Ln(!1,!1,!1,g);if(L===w0){for(var Q=!1,re=!1,ye=!1,ve=0;ve<c.data.length;++ve){var we=c.data[ve];if(we.type===$u)ye=!0;else if(we.type===zu)re=!0;else if(we.type===Xu)Q=!0;else if(we.type===Vu){Q=!0;var _e=we.data;_e>=1&&(re=!0),_e>=2&&(ye=!0)}else we.type===_l&&(Q=Q||we.data.thisDep,re=re||we.data.contextDep,ye=ye||we.data.propDep)}return new Ln(Q,re,ye,g)}else return new Ln(L===Xu,L===zu,L===$u,g)}}var th=new Ln(!1,!1,!1,function(){});function hM(c,g,L,Z,ce,Q,re,ye,ve,we,_e,Re,De,xe,ke){var $=we.Record,ne={add:32774,subtract:32778,"reverse subtract":32779};L.ext_blend_minmax&&(ne.min=uM,ne.max=fM);var Le=L.angle_instanced_arrays,We=L.webgl_draw_buffers,de={dirty:!0,profile:ke.profile},$e={},he=[],Oe={},me={};function Ie(_){return _.replace(".","_")}function ot(_,m,k){var U=Ie(_);he.push(_),$e[U]=de[U]=!!k,Oe[U]=m}function xt(_,m,k){var U=Ie(_);he.push(_),Array.isArray(k)?(de[U]=k.slice(),$e[U]=k.slice()):de[U]=$e[U]=k,me[U]=m}ot(A0,nM),ot(C0,rM),xt(E0,"blendColor",[0,0,0,0]),xt(ju,"blendEquationSeparate",[K0,K0]),xt(Yu,"blendFuncSeparate",[q0,Y0,q0,Y0]),ot(R0,aM,!0),xt(k0,"depthFunc",dM),xt(P0,"depthRange",[0,1]),xt(F0,"depthMask",!0),xt(qu,qu,[!0,!0,!0,!0]),ot(O0,tM),xt(I0,"cullFace",_a),xt(Ku,Ku,lf),xt(Qu,Qu,1),ot(B0,sM),xt(Zu,"polygonOffset",[0,0]),ot(D0,lM),ot(H0,cM),xt(Ju,"sampleCoverage",[1,!1]),ot(N0,oM),xt(G0,"stencilMask",-1),xt(ef,"stencilFunc",[pM,0,-1]),xt(tf,"stencilOpSeparate",[cs,qo,qo,qo]),xt(Ji,"stencilOpSeparate",[_a,qo,qo,qo]),ot(W0,iM),xt(Sl,"scissor",[0,0,c.drawingBufferWidth,c.drawingBufferHeight]),xt(Io,Io,[0,0,c.drawingBufferWidth,c.drawingBufferHeight]);var He={gl:c,context:De,strings:g,next:$e,current:de,draw:Re,elements:Q,buffer:ce,shader:_e,attributes:we.state,vao:we,uniforms:ve,framebuffer:ye,extensions:L,timer:xe,isBufferArgs:Ol},Ae={primTypes:ja,compareFuncs:li,blendFuncs:vo,blendEquations:ne,stencilOps:Ko,glTypes:Fo,orientationType:cf};h.optional(function(){He.isArrayLike=Ar}),We&&(Ae.backBuffer=[_a],Ae.drawBuffer=cr(Z.maxDrawbuffers,function(_){return _===0?[0]:cr(_,function(m){return mM+m})}));var pe=0;function pt(){var _=jT(),m=_.link,k=_.global;_.id=pe++,_.batchId="0";var U=m(He),z=_.shared={props:"a0"};Object.keys(He).forEach(function(E){z[E]=k.def(U,".",E)}),h.optional(function(){_.CHECK=m(h),_.commandStr=h.guessCommand(),_.command=m(_.commandStr),_.assert=function(E,y,W){E("if(!(",y,"))",this.CHECK,".commandRaise(",m(W),",",this.command,");")},Ae.invalidBlendCombinations=Z0});var I=_.next={},P=_.current={};Object.keys(me).forEach(function(E){Array.isArray(de[E])&&(I[E]=k.def(z.next,".",E),P[E]=k.def(z.current,".",E))});var N=_.constants={};Object.keys(Ae).forEach(function(E){N[E]=k.def(JSON.stringify(Ae[E]))}),_.invoke=function(E,y){switch(y.type){case Vu:var W=["this",z.context,z.props,_.batchId];return E.def(m(y.data),".call(",W.slice(0,Math.max(y.data.length+1,4)),")");case $u:return E.def(z.props,y.data);case zu:return E.def(z.context,y.data);case Xu:return E.def("this",y.data);case _l:return y.data.append(_,E),y.data.ref;case L0:return y.data.toString();case w0:return y.data.map(function(j){return _.invoke(E,j)})}},_.attribCache={};var S={};return _.scopeAttrib=function(E){var y=g.id(E);if(y in S)return S[y];var W=we.scope[y];W||(W=we.scope[y]=new $);var j=S[y]=m(W);return j},_}function At(_){var m=_.static,k=_.dynamic,U;if(es in m){var z=!!m[es];U=Ir(function(P,N){return z}),U.enable=z}else if(es in k){var I=k[es];U=Rn(I,function(P,N){return P.invoke(N,I)})}return U}function je(_,m){var k=_.static,U=_.dynamic;if(ba in k){var z=k[ba];return z?(z=ye.getFramebuffer(z),h.command(z,"invalid framebuffer object"),Ir(function(P,N){var S=P.link(z),E=P.shared;N.set(E.framebuffer,".next",S);var y=E.context;return N.set(y,"."+ai,S+".width"),N.set(y,"."+ii,S+".height"),S})):Ir(function(P,N){var S=P.shared;N.set(S.framebuffer,".next","null");var E=S.context;return N.set(E,"."+ai,E+"."+V0),N.set(E,"."+ii,E+"."+$0),"null"})}else if(ba in U){var I=U[ba];return Rn(I,function(P,N){var S=P.invoke(N,I),E=P.shared,y=E.framebuffer,W=N.def(y,".getFramebuffer(",S,")");h.optional(function(){P.assert(N,"!"+S+"||"+W,"invalid framebuffer object")}),N.set(y,".next",W);var j=E.context;return N.set(j,"."+ai,W+"?"+W+".width:"+j+"."+V0),N.set(j,"."+ii,W+"?"+W+".height:"+j+"."+$0),W})}else return null}function Bt(_,m,k){var U=_.static,z=_.dynamic;function I(S){if(S in U){var E=U[S];h.commandType(E,"object","invalid "+S,k.commandStr);var y=!0,W=E.x|0,j=E.y|0,le,ue;return"width"in E?(le=E.width|0,h.command(le>=0,"invalid "+S,k.commandStr)):y=!1,"height"in E?(ue=E.height|0,h.command(ue>=0,"invalid "+S,k.commandStr)):y=!1,new Ln(!y&&m&&m.thisDep,!y&&m&&m.contextDep,!y&&m&&m.propDep,function(tt,Et){var Ye=tt.shared.context,ut=le;"width"in E||(ut=Et.def(Ye,".",ai,"-",W));var Mt=ue;return"height"in E||(Mt=Et.def(Ye,".",ii,"-",j)),[W,j,ut,Mt]})}else if(S in z){var ae=z[S],Me=Rn(ae,function(tt,Et){var Ye=tt.invoke(Et,ae);h.optional(function(){tt.assert(Et,Ye+"&&typeof "+Ye+'==="object"',"invalid "+S)});var ut=tt.shared.context,Mt=Et.def(Ye,".x|0"),jt=Et.def(Ye,".y|0"),Mr=Et.def('"width" in ',Ye,"?",Ye,".width|0:","(",ut,".",ai,"-",Mt,")"),wn=Et.def('"height" in ',Ye,"?",Ye,".height|0:","(",ut,".",ii,"-",jt,")");return h.optional(function(){tt.assert(Et,Mr+">=0&&"+wn+">=0","invalid "+S)}),[Mt,jt,Mr,wn]});return m&&(Me.thisDep=Me.thisDep||m.thisDep,Me.contextDep=Me.contextDep||m.contextDep,Me.propDep=Me.propDep||m.propDep),Me}else return m?new Ln(m.thisDep,m.contextDep,m.propDep,function(tt,Et){var Ye=tt.shared.context;return[0,0,Et.def(Ye,".",ai),Et.def(Ye,".",ii)]}):null}var P=I(Io);if(P){var N=P;P=new Ln(P.thisDep,P.contextDep,P.propDep,function(S,E){var y=N.append(S,E),W=S.shared.context;return E.set(W,"."+YT,y[2]),E.set(W,"."+qT,y[3]),y})}return{viewport:P,scissor_box:I(Sl)}}function vt(_,m){var k=_.static,U=typeof k[rs]=="string"&&typeof k[ts]=="string";if(U){if(Object.keys(m.dynamic).length>0)return null;var z=m.static,I=Object.keys(z);if(I.length>0&&typeof z[I[0]]=="number"){for(var P=[],N=0;N<I.length;++N)h(typeof z[I[N]]=="number","must specify all vertex attribute locations when using vaos"),P.push([z[I[N]]|0,I[N]]);return P}}return null}function Ot(_,m,k){var U=_.static,z=_.dynamic;function I(y){if(y in U){var W=g.id(U[y]);h.optional(function(){_e.shader(J0[y],W,h.guessCommand())});var j=Ir(function(){return W});return j.id=W,j}else if(y in z){var le=z[y];return Rn(le,function(ue,ae){var Me=ue.invoke(ae,le),tt=ae.def(ue.shared.strings,".id(",Me,")");return h.optional(function(){ae(ue.shared.shader,".shader(",J0[y],",",tt,",",ue.command,");")}),tt})}return null}var P=I(rs),N=I(ts),S=null,E;return Qo(P)&&Qo(N)?(S=_e.program(N.id,P.id,null,k),E=Ir(function(y,W){return y.link(S)})):E=new Ln(P&&P.thisDep||N&&N.thisDep,P&&P.contextDep||N&&N.contextDep,P&&P.propDep||N&&N.propDep,function(y,W){var j=y.shared.shader,le;P?le=P.append(y,W):le=W.def(j,".",rs);var ue;N?ue=N.append(y,W):ue=W.def(j,".",ts);var ae=j+".program("+ue+","+le;return h.optional(function(){ae+=","+y.command}),W.def(ae+")")}),{frag:P,vert:N,progVar:E,program:S}}function Xt(_,m){var k=_.static,U=_.dynamic;function z(){if(ya in k){var y=k[ya];Ol(y)?y=Q.getElements(Q.create(y,!0)):y&&(y=Q.getElements(y),h.command(y,"invalid elements",m.commandStr));var W=Ir(function(le,ue){if(y){var ae=le.link(y);return le.ELEMENTS=ae,ae}return le.ELEMENTS=null,null});return W.value=y,W}else if(ya in U){var j=U[ya];return Rn(j,function(le,ue){var ae=le.shared,Me=ae.isBufferArgs,tt=ae.elements,Et=le.invoke(ue,j),Ye=ue.def("null"),ut=ue.def(Me,"(",Et,")"),Mt=le.cond(ut).then(Ye,"=",tt,".createStream(",Et,");").else(Ye,"=",tt,".getElements(",Et,");");return h.optional(function(){le.assert(Mt.else,"!"+Et+"||"+Ye,"invalid elements")}),ue.entry(Mt),ue.exit(le.cond(ut).then(tt,".destroyStream(",Ye,");")),le.ELEMENTS=Ye,Ye})}return null}var I=z();function P(){if(xa in k){var y=k[xa];return h.commandParameter(y,ja,"invalid primitve",m.commandStr),Ir(function(j,le){return ja[y]})}else if(xa in U){var W=U[xa];return Rn(W,function(j,le){var ue=j.constants.primTypes,ae=j.invoke(le,W);return h.optional(function(){j.assert(le,ae+" in "+ue,"invalid primitive, must be one of "+Object.keys(ja))}),le.def(ue,"[",ae,"]")})}else if(I)return Qo(I)?I.value?Ir(function(j,le){return le.def(j.ELEMENTS,".primType")}):Ir(function(){return X0}):new Ln(I.thisDep,I.contextDep,I.propDep,function(j,le){var ue=j.ELEMENTS;return le.def(ue,"?",ue,".primType:",X0)});return null}function N(y,W){if(y in k){var j=k[y]|0;return h.command(!W||j>=0,"invalid "+y,m.commandStr),Ir(function(ue,ae){return W&&(ue.OFFSET=j),j})}else if(y in U){var le=U[y];return Rn(le,function(ue,ae){var Me=ue.invoke(ae,le);return W&&(ue.OFFSET=Me,h.optional(function(){ue.assert(ae,Me+">=0","invalid "+y)})),Me})}else if(W&&I)return Ir(function(ue,ae){return ue.OFFSET="0",0});return null}var S=N(Tl,!0);function E(){if(va in k){var y=k[va]|0;return h.command(typeof y=="number"&&y>=0,"invalid vertex count",m.commandStr),Ir(function(){return y})}else if(va in U){var W=U[va];return Rn(W,function(ue,ae){var Me=ue.invoke(ae,W);return h.optional(function(){ue.assert(ae,"typeof "+Me+'==="number"&&'+Me+">=0&&"+Me+"===("+Me+"|0)","invalid vertex count")}),Me})}else if(I)if(Qo(I)){if(I)return S?new Ln(S.thisDep,S.contextDep,S.propDep,function(ue,ae){var Me=ae.def(ue.ELEMENTS,".vertCount-",ue.OFFSET);return h.optional(function(){ue.assert(ae,Me+">=0","invalid vertex offset/element buffer too small")}),Me}):Ir(function(ue,ae){return ae.def(ue.ELEMENTS,".vertCount")});var j=Ir(function(){return-1});return h.optional(function(){j.MISSING=!0}),j}else{var le=new Ln(I.thisDep||S.thisDep,I.contextDep||S.contextDep,I.propDep||S.propDep,function(ue,ae){var Me=ue.ELEMENTS;return ue.OFFSET?ae.def(Me,"?",Me,".vertCount-",ue.OFFSET,":-1"):ae.def(Me,"?",Me,".vertCount:-1")});return h.optional(function(){le.DYNAMIC=!0}),le}return null}return{elements:I,primitive:P(),count:E(),instances:N(Ml,!1),offset:S}}function Br(_,m){var k=_.static,U=_.dynamic,z={};return he.forEach(function(I){var P=Ie(I);function N(S,E){if(I in k){var y=S(k[I]);z[P]=Ir(function(){return y})}else if(I in U){var W=U[I];z[P]=Rn(W,function(j,le){return E(j,le,j.invoke(le,W))})}}switch(I){case O0:case C0:case A0:case N0:case R0:case W0:case B0:case D0:case H0:case F0:return N(function(S){return h.commandType(S,"boolean",I,m.commandStr),S},function(S,E,y){return h.optional(function(){S.assert(E,"typeof "+y+'==="boolean"',"invalid flag "+I,S.commandStr)}),y});case k0:return N(function(S){return h.commandParameter(S,li,"invalid "+I,m.commandStr),li[S]},function(S,E,y){var W=S.constants.compareFuncs;return h.optional(function(){S.assert(E,y+" in "+W,"invalid "+I+", must be one of "+Object.keys(li))}),E.def(W,"[",y,"]")});case P0:return N(function(S){return h.command(Ar(S)&&S.length===2&&typeof S[0]=="number"&&typeof S[1]=="number"&&S[0]<=S[1],"depth range is 2d array",m.commandStr),S},function(S,E,y){h.optional(function(){S.assert(E,S.shared.isArrayLike+"("+y+")&&"+y+".length===2&&typeof "+y+'[0]==="number"&&typeof '+y+'[1]==="number"&&'+y+"[0]<="+y+"[1]","depth range must be a 2d array")});var W=E.def("+",y,"[0]"),j=E.def("+",y,"[1]");return[W,j]});case Yu:return N(function(S){h.commandType(S,"object","blend.func",m.commandStr);var E="srcRGB"in S?S.srcRGB:S.src,y="srcAlpha"in S?S.srcAlpha:S.src,W="dstRGB"in S?S.dstRGB:S.dst,j="dstAlpha"in S?S.dstAlpha:S.dst;return h.commandParameter(E,vo,P+".srcRGB",m.commandStr),h.commandParameter(y,vo,P+".srcAlpha",m.commandStr),h.commandParameter(W,vo,P+".dstRGB",m.commandStr),h.commandParameter(j,vo,P+".dstAlpha",m.commandStr),h.command(Z0.indexOf(E+", "+W)===-1,"unallowed blending combination (srcRGB, dstRGB) = ("+E+", "+W+")",m.commandStr),[vo[E],vo[W],vo[y],vo[j]]},function(S,E,y){var W=S.constants.blendFuncs;h.optional(function(){S.assert(E,y+"&&typeof "+y+'==="object"',"invalid blend func, must be an object")});function j(Ye,ut){var Mt=E.def('"',Ye,ut,'" in ',y,"?",y,".",Ye,ut,":",y,".",Ye);return h.optional(function(){S.assert(E,Mt+" in "+W,"invalid "+I+"."+Ye+ut+", must be one of "+Object.keys(vo))}),Mt}var le=j("src","RGB"),ue=j("dst","RGB");h.optional(function(){var Ye=S.constants.invalidBlendCombinations;S.assert(E,Ye+".indexOf("+le+'+", "+'+ue+") === -1 ","unallowed blending combination for (srcRGB, dstRGB)")});var ae=E.def(W,"[",le,"]"),Me=E.def(W,"[",j("src","Alpha"),"]"),tt=E.def(W,"[",ue,"]"),Et=E.def(W,"[",j("dst","Alpha"),"]");return[ae,tt,Me,Et]});case ju:return N(function(S){if(typeof S=="string")return h.commandParameter(S,ne,"invalid "+I,m.commandStr),[ne[S],ne[S]];if(typeof S=="object")return h.commandParameter(S.rgb,ne,I+".rgb",m.commandStr),h.commandParameter(S.alpha,ne,I+".alpha",m.commandStr),[ne[S.rgb],ne[S.alpha]];h.commandRaise("invalid blend.equation",m.commandStr)},function(S,E,y){var W=S.constants.blendEquations,j=E.def(),le=E.def(),ue=S.cond("typeof ",y,'==="string"');return h.optional(function(){function ae(Me,tt,Et){S.assert(Me,Et+" in "+W,"invalid "+tt+", must be one of "+Object.keys(ne))}ae(ue.then,I,y),S.assert(ue.else,y+"&&typeof "+y+'==="object"',"invalid "+I),ae(ue.else,I+".rgb",y+".rgb"),ae(ue.else,I+".alpha",y+".alpha")}),ue.then(j,"=",le,"=",W,"[",y,"];"),ue.else(j,"=",W,"[",y,".rgb];",le,"=",W,"[",y,".alpha];"),E(ue),[j,le]});case E0:return N(function(S){return h.command(Ar(S)&&S.length===4,"blend.color must be a 4d array",m.commandStr),cr(4,function(E){return+S[E]})},function(S,E,y){return h.optional(function(){S.assert(E,S.shared.isArrayLike+"("+y+")&&"+y+".length===4","blend.color must be a 4d array")}),cr(4,function(W){return E.def("+",y,"[",W,"]")})});case G0:return N(function(S){return h.commandType(S,"number",P,m.commandStr),S|0},function(S,E,y){return h.optional(function(){S.assert(E,"typeof "+y+'==="number"',"invalid stencil.mask")}),E.def(y,"|0")});case ef:return N(function(S){h.commandType(S,"object",P,m.commandStr);var E=S.cmp||"keep",y=S.ref||0,W="mask"in S?S.mask:-1;return h.commandParameter(E,li,I+".cmp",m.commandStr),h.commandType(y,"number",I+".ref",m.commandStr),h.commandType(W,"number",I+".mask",m.commandStr),[li[E],y,W]},function(S,E,y){var W=S.constants.compareFuncs;h.optional(function(){function ae(){S.assert(E,Array.prototype.join.call(arguments,""),"invalid stencil.func")}ae(y+"&&typeof ",y,'==="object"'),ae('!("cmp" in ',y,")||(",y,".cmp in ",W,")")});var j=E.def('"cmp" in ',y,"?",W,"[",y,".cmp]",":",qo),le=E.def(y,".ref|0"),ue=E.def('"mask" in ',y,"?",y,".mask|0:-1");return[j,le,ue]});case tf:case Ji:return N(function(S){h.commandType(S,"object",P,m.commandStr);var E=S.fail||"keep",y=S.zfail||"keep",W=S.zpass||"keep";return h.commandParameter(E,Ko,I+".fail",m.commandStr),h.commandParameter(y,Ko,I+".zfail",m.commandStr),h.commandParameter(W,Ko,I+".zpass",m.commandStr),[I===Ji?_a:cs,Ko[E],Ko[y],Ko[W]]},function(S,E,y){var W=S.constants.stencilOps;h.optional(function(){S.assert(E,y+"&&typeof "+y+'==="object"',"invalid "+I)});function j(le){return h.optional(function(){S.assert(E,'!("'+le+'" in '+y+")||("+y+"."+le+" in "+W+")","invalid "+I+"."+le+", must be one of "+Object.keys(Ko))}),E.def('"',le,'" in ',y,"?",W,"[",y,".",le,"]:",qo)}return[I===Ji?_a:cs,j("fail"),j("zfail"),j("zpass")]});case Zu:return N(function(S){h.commandType(S,"object",P,m.commandStr);var E=S.factor|0,y=S.units|0;return h.commandType(E,"number",P+".factor",m.commandStr),h.commandType(y,"number",P+".units",m.commandStr),[E,y]},function(S,E,y){h.optional(function(){S.assert(E,y+"&&typeof "+y+'==="object"',"invalid "+I)});var W=E.def(y,".factor|0"),j=E.def(y,".units|0");return[W,j]});case I0:return N(function(S){var E=0;return S==="front"?E=cs:S==="back"&&(E=_a),h.command(!!E,P,m.commandStr),E},function(S,E,y){return h.optional(function(){S.assert(E,y+'==="front"||'+y+'==="back"',"invalid cull.face")}),E.def(y,'==="front"?',cs,":",_a)});case Qu:return N(function(S){return h.command(typeof S=="number"&&S>=Z.lineWidthDims[0]&&S<=Z.lineWidthDims[1],"invalid line width, must be a positive number between "+Z.lineWidthDims[0]+" and "+Z.lineWidthDims[1],m.commandStr),S},function(S,E,y){return h.optional(function(){S.assert(E,"typeof "+y+'==="number"&&'+y+">="+Z.lineWidthDims[0]+"&&"+y+"<="+Z.lineWidthDims[1],"invalid line width")}),y});case Ku:return N(function(S){return h.commandParameter(S,cf,P,m.commandStr),cf[S]},function(S,E,y){return h.optional(function(){S.assert(E,y+'==="cw"||'+y+'==="ccw"',"invalid frontFace, must be one of cw,ccw")}),E.def(y+'==="cw"?'+j0+":"+lf)});case qu:return N(function(S){return h.command(Ar(S)&&S.length===4,"color.mask must be length 4 array",m.commandStr),S.map(function(E){return!!E})},function(S,E,y){return h.optional(function(){S.assert(E,S.shared.isArrayLike+"("+y+")&&"+y+".length===4","invalid color.mask")}),cr(4,function(W){return"!!"+y+"["+W+"]"})});case Ju:return N(function(S){h.command(typeof S=="object"&&S,P,m.commandStr);var E="value"in S?S.value:1,y=!!S.invert;return h.command(typeof E=="number"&&E>=0&&E<=1,"sample.coverage.value must be a number between 0 and 1",m.commandStr),[E,y]},function(S,E,y){h.optional(function(){S.assert(E,y+"&&typeof "+y+'==="object"',"invalid sample.coverage")});var W=E.def('"value" in ',y,"?+",y,".value:1"),j=E.def("!!",y,".invert");return[W,j]})}}),z}function qr(_,m){var k=_.static,U=_.dynamic,z={};return Object.keys(k).forEach(function(I){var P=k[I],N;if(typeof P=="number"||typeof P=="boolean")N=Ir(function(){return P});else if(typeof P=="function"){var S=P._reglType;S==="texture2d"||S==="textureCube"?N=Ir(function(E){return E.link(P)}):S==="framebuffer"||S==="framebufferCube"?(h.command(P.color.length>0,'missing color attachment for framebuffer sent to uniform "'+I+'"',m.commandStr),N=Ir(function(E){return E.link(P.color[0])})):h.commandRaise('invalid data for uniform "'+I+'"',m.commandStr)}else Ar(P)?N=Ir(function(E){var y=E.global.def("[",cr(P.length,function(W){return h.command(typeof P[W]=="number"||typeof P[W]=="boolean","invalid uniform "+I,E.commandStr),P[W]}),"]");return y}):h.commandRaise('invalid or missing data for uniform "'+I+'"',m.commandStr);N.value=P,z[I]=N}),Object.keys(U).forEach(function(I){var P=U[I];z[I]=Rn(P,function(N,S){return N.invoke(S,P)})}),z}function Gt(_,m){var k=_.static,U=_.dynamic,z={};return Object.keys(k).forEach(function(I){var P=k[I],N=g.id(I),S=new $;if(Ol(P))S.state=oi,S.buffer=ce.getBuffer(ce.create(P,si,!1,!0)),S.type=0;else{var E=ce.getBuffer(P);if(E)S.state=oi,S.buffer=E,S.type=0;else if(h.command(typeof P=="object"&&P,"invalid data for attribute "+I,m.commandStr),"constant"in P){var y=P.constant;S.buffer="null",S.state=Uu,typeof y=="number"?S.x=y:(h.command(Ar(y)&&y.length>0&&y.length<=4,"invalid constant for attribute "+I,m.commandStr),ni.forEach(function(tt,Et){Et<y.length&&(S[tt]=y[Et])}))}else{Ol(P.buffer)?E=ce.getBuffer(ce.create(P.buffer,si,!1,!0)):E=ce.getBuffer(P.buffer),h.command(!!E,'missing buffer for attribute "'+I+'"',m.commandStr);var W=P.offset|0;h.command(W>=0,'invalid offset for attribute "'+I+'"',m.commandStr);var j=P.stride|0;h.command(j>=0&&j<256,'invalid stride for attribute "'+I+'", must be integer betweeen [0, 255]',m.commandStr);var le=P.size|0;h.command(!("size"in P)||le>0&&le<=4,'invalid size for attribute "'+I+'", must be 1,2,3,4',m.commandStr);var ue=!!P.normalized,ae=0;"type"in P&&(h.commandParameter(P.type,Fo,"invalid type for attribute "+I,m.commandStr),ae=Fo[P.type]);var Me=P.divisor|0;"divisor"in P&&(h.command(Me===0||Le,'cannot specify divisor for attribute "'+I+'", instancing not supported',m.commandStr),h.command(Me>=0,'invalid divisor for attribute "'+I+'"',m.commandStr)),h.optional(function(){var tt=m.commandStr,Et=["buffer","offset","divisor","normalized","type","size","stride"];Object.keys(P).forEach(function(Ye){h.command(Et.indexOf(Ye)>=0,'unknown parameter "'+Ye+'" for attribute pointer "'+I+'" (valid parameters are '+Et+")",tt)})}),S.buffer=E,S.state=oi,S.size=le,S.normalized=ue,S.type=ae||E.dtype,S.offset=W,S.stride=j,S.divisor=Me}}z[I]=Ir(function(tt,Et){var Ye=tt.attribCache;if(N in Ye)return Ye[N];var ut={isStream:!1};return Object.keys(S).forEach(function(Mt){ut[Mt]=S[Mt]}),S.buffer&&(ut.buffer=tt.link(S.buffer),ut.type=ut.type||ut.buffer+".dtype"),Ye[N]=ut,ut})}),Object.keys(U).forEach(function(I){var P=U[I];function N(S,E){var y=S.invoke(E,P),W=S.shared,j=S.constants,le=W.isBufferArgs,ue=W.buffer;h.optional(function(){S.assert(E,y+"&&(typeof "+y+'==="object"||typeof '+y+'==="function")&&('+le+"("+y+")||"+ue+".getBuffer("+y+")||"+ue+".getBuffer("+y+".buffer)||"+le+"("+y+'.buffer)||("constant" in '+y+"&&(typeof "+y+'.constant==="number"||'+W.isArrayLike+"("+y+".constant))))",'invalid dynamic attribute "'+I+'"')});var ae={isStream:E.def(!1)},Me=new $;Me.state=oi,Object.keys(Me).forEach(function(ut){ae[ut]=E.def(""+Me[ut])});var tt=ae.buffer,Et=ae.type;E("if(",le,"(",y,")){",ae.isStream,"=true;",tt,"=",ue,".createStream(",si,",",y,");",Et,"=",tt,".dtype;","}else{",tt,"=",ue,".getBuffer(",y,");","if(",tt,"){",Et,"=",tt,".dtype;",'}else if("constant" in ',y,"){",ae.state,"=",Uu,";","if(typeof "+y+'.constant === "number"){',ae[ni[0]],"=",y,".constant;",ni.slice(1).map(function(ut){return ae[ut]}).join("="),"=0;","}else{",ni.map(function(ut,Mt){return ae[ut]+"="+y+".constant.length>"+Mt+"?"+y+".constant["+Mt+"]:0;"}).join(""),"}}else{","if(",le,"(",y,".buffer)){",tt,"=",ue,".createStream(",si,",",y,".buffer);","}else{",tt,"=",ue,".getBuffer(",y,".buffer);","}",Et,'="type" in ',y,"?",j.glTypes,"[",y,".type]:",tt,".dtype;",ae.normalized,"=!!",y,".normalized;");function Ye(ut){E(ae[ut],"=",y,".",ut,"|0;")}return Ye("size"),Ye("offset"),Ye("stride"),Ye("divisor"),E("}}"),E.exit("if(",ae.isStream,"){",ue,".destroyStream(",tt,");","}"),ae}z[I]=Rn(P,N)}),z}function Vr(_,m){var k=_.static,U=_.dynamic;if(ns in k){var z=k[ns];return z!==null&&we.getVAO(z)===null&&(z=we.createVAO(z)),Ir(function(P){return P.link(we.getVAO(z))})}else if(ns in U){var I=U[ns];return Rn(I,function(P,N){var S=P.invoke(N,I);return N.def(P.shared.vao+".getVAO("+S+")")})}return null}function pr(_){var m=_.static,k=_.dynamic,U={};return Object.keys(m).forEach(function(z){var I=m[z];U[z]=Ir(function(P,N){return typeof I=="number"||typeof I=="boolean"?""+I:P.link(I)})}),Object.keys(k).forEach(function(z){var I=k[z];U[z]=Rn(I,function(P,N){return P.invoke(N,I)})}),U}function Dr(_,m,k,U,z){var I=_.static,P=_.dynamic;h.optional(function(){var Ye=[ba,ts,rs,ya,xa,Tl,va,Ml,es,ns].concat(he);function ut(Mt){Object.keys(Mt).forEach(function(jt){h.command(Ye.indexOf(jt)>=0,'unknown parameter "'+jt+'"',z.commandStr)})}ut(I),ut(P)});var N=vt(_,m),S=je(_,z),E=Bt(_,S,z),y=Xt(_,z),W=Br(_,z),j=Ot(_,z,N);function le(Ye){var ut=E[Ye];ut&&(W[Ye]=ut)}le(Io),le(Ie(Sl));var ue=Object.keys(W).length>0,ae={framebuffer:S,draw:y,shader:j,state:W,dirty:ue,scopeVAO:null,drawVAO:null,useVAO:!1,attributes:{}};if(ae.profile=At(_,z),ae.uniforms=qr(k,z),ae.drawVAO=ae.scopeVAO=Vr(_,z),!ae.drawVAO&&j.program&&!N&&L.angle_instanced_arrays){var Me=!0,tt=j.program.attributes.map(function(Ye){var ut=m.static[Ye];return Me=Me&&!!ut,ut});if(Me&&tt.length>0){var Et=we.getVAO(we.createVAO(tt));ae.drawVAO=new Ln(null,null,null,function(Ye,ut){return Ye.link(Et)}),ae.useVAO=!0}}return N?ae.useVAO=!0:ae.attributes=Gt(m,z),ae.context=pr(U,z),ae}function $r(_,m,k){var U=_.shared,z=U.context,I=_.scope();Object.keys(k).forEach(function(P){m.save(z,"."+P);var N=k[P],S=N.append(_,m);Array.isArray(S)?I(z,".",P,"=[",S.join(),"];"):I(z,".",P,"=",S,";")}),m(I)}function zr(_,m,k,U){var z=_.shared,I=z.gl,P=z.framebuffer,N;We&&(N=m.def(z.extensions,".webgl_draw_buffers"));var S=_.constants,E=S.drawBuffer,y=S.backBuffer,W;k?W=k.append(_,m):W=m.def(P,".next"),U||m("if(",W,"!==",P,".cur){"),m("if(",W,"){",I,".bindFramebuffer(",Q0,",",W,".framebuffer);"),We&&m(N,".drawBuffersWEBGL(",E,"[",W,".colorAttachments.length]);"),m("}else{",I,".bindFramebuffer(",Q0,",null);"),We&&m(N,".drawBuffersWEBGL(",y,");"),m("}",P,".cur=",W,";"),U||m("}")}function en(_,m,k){var U=_.shared,z=U.gl,I=_.current,P=_.next,N=U.current,S=U.next,E=_.cond(N,".dirty");he.forEach(function(y){var W=Ie(y);if(!(W in k.state)){var j,le;if(W in P){j=P[W],le=I[W];var ue=cr(de[W].length,function(Me){return E.def(j,"[",Me,"]")});E(_.cond(ue.map(function(Me,tt){return Me+"!=="+le+"["+tt+"]"}).join("||")).then(z,".",me[W],"(",ue,");",ue.map(function(Me,tt){return le+"["+tt+"]="+Me}).join(";"),";"))}else{j=E.def(S,".",W);var ae=_.cond(j,"!==",N,".",W);E(ae),W in Oe?ae(_.cond(j).then(z,".enable(",Oe[W],");").else(z,".disable(",Oe[W],");"),N,".",W,"=",j,";"):ae(z,".",me[W],"(",j,");",N,".",W,"=",j,";")}}}),Object.keys(k.state).length===0&&E(N,".dirty=false;"),m(E)}function on(_,m,k,U){var z=_.shared,I=_.current,P=z.current,N=z.gl;eh(Object.keys(k)).forEach(function(S){var E=k[S];if(!(U&&!U(E))){var y=E.append(_,m);if(Oe[S]){var W=Oe[S];Qo(E)?y?m(N,".enable(",W,");"):m(N,".disable(",W,");"):m(_.cond(y).then(N,".enable(",W,");").else(N,".disable(",W,");")),m(P,".",S,"=",y,";")}else if(Ar(y)){var j=I[S];m(N,".",me[S],"(",y,");",y.map(function(le,ue){return j+"["+ue+"]="+le}).join(";"),";")}else m(N,".",me[S],"(",y,");",P,".",S,"=",y,";")}})}function Cr(_,m){Le&&(_.instancing=m.def(_.shared.extensions,".angle_instanced_arrays"))}function Ct(_,m,k,U,z){var I=_.shared,P=_.stats,N=I.current,S=I.timer,E=k.profile;function y(){return typeof performance>"u"?"Date.now()":"performance.now()"}var W,j;function le(Ye){W=m.def(),Ye(W,"=",y(),";"),typeof z=="string"?Ye(P,".count+=",z,";"):Ye(P,".count++;"),xe&&(U?(j=m.def(),Ye(j,"=",S,".getNumPendingQueries();")):Ye(S,".beginQuery(",P,");"))}function ue(Ye){Ye(P,".cpuTime+=",y(),"-",W,";"),xe&&(U?Ye(S,".pushScopeStats(",j,",",S,".getNumPendingQueries(),",P,");"):Ye(S,".endQuery();"))}function ae(Ye){var ut=m.def(N,".profile");m(N,".profile=",Ye,";"),m.exit(N,".profile=",ut,";")}var Me;if(E){if(Qo(E)){E.enable?(le(m),ue(m.exit),ae("true")):ae("false");return}Me=E.append(_,m),ae(Me)}else Me=m.def(N,".profile");var tt=_.block();le(tt),m("if(",Me,"){",tt,"}");var Et=_.block();ue(Et),m.exit("if(",Me,"){",Et,"}")}function an(_,m,k,U,z){var I=_.shared;function P(S){switch(S){case Ll:case Cl:case kl:return 2;case wl:case El:case Pl:return 3;case Al:case Rl:case Fl:return 4;default:return 1}}function N(S,E,y){var W=I.gl,j=m.def(S,".location"),le=m.def(I.attributes,"[",j,"]"),ue=y.state,ae=y.buffer,Me=[y.x,y.y,y.z,y.w],tt=["buffer","normalized","offset","stride"];function Et(){m("if(!",le,".buffer){",W,".enableVertexAttribArray(",j,");}");var ut=y.type,Mt;if(y.size?Mt=m.def(y.size,"||",E):Mt=E,m("if(",le,".type!==",ut,"||",le,".size!==",Mt,"||",tt.map(function(Mr){return le+"."+Mr+"!=="+y[Mr]}).join("||"),"){",W,".bindBuffer(",si,",",ae,".buffer);",W,".vertexAttribPointer(",[j,Mt,ut,y.normalized,y.stride,y.offset],");",le,".type=",ut,";",le,".size=",Mt,";",tt.map(function(Mr){return le+"."+Mr+"="+y[Mr]+";"}).join(""),"}"),Le){var jt=y.divisor;m("if(",le,".divisor!==",jt,"){",_.instancing,".vertexAttribDivisorANGLE(",[j,jt],");",le,".divisor=",jt,";}")}}function Ye(){m("if(",le,".buffer){",W,".disableVertexAttribArray(",j,");",le,".buffer=null;","}if(",ni.map(function(ut,Mt){return le+"."+ut+"!=="+Me[Mt]}).join("||"),"){",W,".vertexAttrib4f(",j,",",Me,");",ni.map(function(ut,Mt){return le+"."+ut+"="+Me[Mt]+";"}).join(""),"}")}ue===oi?Et():ue===Uu?Ye():(m("if(",ue,"===",oi,"){"),Et(),m("}else{"),Ye(),m("}"))}U.forEach(function(S){var E=S.name,y=k.attributes[E],W;if(y){if(!z(y))return;W=y.append(_,m)}else{if(!z(th))return;var j=_.scopeAttrib(E);h.optional(function(){_.assert(m,j+".state","missing attribute "+E)}),W={},Object.keys(new $).forEach(function(le){W[le]=m.def(j,".",le)})}N(_.link(S),P(S.info.type),W)})}function Kt(_,m,k,U,z){for(var I=_.shared,P=I.gl,N,S=0;S<U.length;++S){var E=U[S],y=E.name,W=E.info.type,j=k.uniforms[y],le=_.link(E),ue=le+".location",ae;if(j){if(!z(j))continue;if(Qo(j)){var Me=j.value;if(h.command(Me!==null&&typeof Me<"u",'missing uniform "'+y+'"',_.commandStr),W===ss||W===ls){h.command(typeof Me=="function"&&(W===ss&&(Me._reglType==="texture2d"||Me._reglType==="framebuffer")||W===ls&&(Me._reglType==="textureCube"||Me._reglType==="framebufferCube")),"invalid texture for uniform "+y,_.commandStr);var tt=_.link(Me._texture||Me.color[0]._texture);m(P,".uniform1i(",ue,",",tt+".bind());"),m.exit(tt,".unbind();")}else if(W===os||W===as||W===is){h.optional(function(){h.command(Ar(Me),"invalid matrix for uniform "+y,_.commandStr),h.command(W===os&&Me.length===4||W===as&&Me.length===9||W===is&&Me.length===16,"invalid length for matrix uniform "+y,_.commandStr)});var Et=_.global.def("new Float32Array(["+Array.prototype.slice.call(Me)+"])"),Ye=2;W===as?Ye=3:W===is&&(Ye=4),m(P,".uniformMatrix",Ye,"fv(",ue,",false,",Et,");")}else{switch(W){case of:h.commandType(Me,"number","uniform "+y,_.commandStr),N="1f";break;case Ll:h.command(Ar(Me)&&Me.length===2,"uniform "+y,_.commandStr),N="2f";break;case wl:h.command(Ar(Me)&&Me.length===3,"uniform "+y,_.commandStr),N="3f";break;case Al:h.command(Ar(Me)&&Me.length===4,"uniform "+y,_.commandStr),N="4f";break;case sf:h.commandType(Me,"boolean","uniform "+y,_.commandStr),N="1i";break;case af:h.commandType(Me,"number","uniform "+y,_.commandStr),N="1i";break;case kl:h.command(Ar(Me)&&Me.length===2,"uniform "+y,_.commandStr),N="2i";break;case Cl:h.command(Ar(Me)&&Me.length===2,"uniform "+y,_.commandStr),N="2i";break;case Pl:h.command(Ar(Me)&&Me.length===3,"uniform "+y,_.commandStr),N="3i";break;case El:h.command(Ar(Me)&&Me.length===3,"uniform "+y,_.commandStr),N="3i";break;case Fl:h.command(Ar(Me)&&Me.length===4,"uniform "+y,_.commandStr),N="4i";break;case Rl:h.command(Ar(Me)&&Me.length===4,"uniform "+y,_.commandStr),N="4i";break}m(P,".uniform",N,"(",ue,",",Ar(Me)?Array.prototype.slice.call(Me):Me,");")}continue}else ae=j.append(_,m)}else{if(!z(th))continue;ae=m.def(I.uniforms,"[",g.id(y),"]")}W===ss?(h(!Array.isArray(ae),"must specify a scalar prop for textures"),m("if(",ae,"&&",ae,'._reglType==="framebuffer"){',ae,"=",ae,".color[0];","}")):W===ls&&(h(!Array.isArray(ae),"must specify a scalar prop for cube maps"),m("if(",ae,"&&",ae,'._reglType==="framebufferCube"){',ae,"=",ae,".color[0];","}")),h.optional(function(){function wn(ao,lh){_.assert(m,ao,'bad data or missing for uniform "'+y+'".  '+lh)}function uf(ao){h(!Array.isArray(ae),"must not specify an array type for uniform"),wn("typeof "+ae+'==="'+ao+'"',"invalid type, expected "+ao)}function zn(ao,lh){Array.isArray(ae)?h(ae.length===ao,"must have length "+ao):wn(I.isArrayLike+"("+ae+")&&"+ae+".length==="+ao,"invalid vector, should have length "+ao,_.commandStr)}function sh(ao){h(!Array.isArray(ae),"must not specify a value type"),wn("typeof "+ae+'==="function"&&'+ae+'._reglType==="texture'+(ao===z0?"2d":"Cube")+'"',"invalid texture type",_.commandStr)}switch(W){case af:uf("number");break;case Cl:zn(2,"number");break;case El:zn(3,"number");break;case Rl:zn(4,"number");break;case of:uf("number");break;case Ll:zn(2,"number");break;case wl:zn(3,"number");break;case Al:zn(4,"number");break;case sf:uf("boolean");break;case kl:zn(2,"boolean");break;case Pl:zn(3,"boolean");break;case Fl:zn(4,"boolean");break;case os:zn(4,"number");break;case as:zn(9,"number");break;case is:zn(16,"number");break;case ss:sh(z0);break;case ls:sh(eM);break}});var ut=1;switch(W){case ss:case ls:var Mt=m.def(ae,"._texture");m(P,".uniform1i(",ue,",",Mt,".bind());"),m.exit(Mt,".unbind();");continue;case af:case sf:N="1i";break;case Cl:case kl:N="2i",ut=2;break;case El:case Pl:N="3i",ut=3;break;case Rl:case Fl:N="4i",ut=4;break;case of:N="1f";break;case Ll:N="2f",ut=2;break;case wl:N="3f",ut=3;break;case Al:N="4f",ut=4;break;case os:N="Matrix2fv";break;case as:N="Matrix3fv";break;case is:N="Matrix4fv";break}if(m(P,".uniform",N,"(",ue,","),N.charAt(0)==="M"){var jt=Math.pow(W-os+2,2),Mr=_.global.def("new Float32Array(",jt,")");Array.isArray(ae)?m("false,(",cr(jt,function(wn){return Mr+"["+wn+"]="+ae[wn]}),",",Mr,")"):m("false,(Array.isArray(",ae,")||",ae," instanceof Float32Array)?",ae,":(",cr(jt,function(wn){return Mr+"["+wn+"]="+ae+"["+wn+"]"}),",",Mr,")")}else ut>1?m(cr(ut,function(wn){return Array.isArray(ae)?ae[wn]:ae+"["+wn+"]"})):(h(!Array.isArray(ae),"uniform value must not be an array"),m(ae));m(");")}}function ct(_,m,k,U){var z=_.shared,I=z.gl,P=z.draw,N=U.draw;function S(){var Mt=N.elements,jt,Mr=m;return Mt?((Mt.contextDep&&U.contextDynamic||Mt.propDep)&&(Mr=k),jt=Mt.append(_,Mr)):jt=Mr.def(P,".",ya),jt&&Mr("if("+jt+")"+I+".bindBuffer("+QT+","+jt+".buffer.buffer);"),jt}function E(){var Mt=N.count,jt,Mr=m;return Mt?((Mt.contextDep&&U.contextDynamic||Mt.propDep)&&(Mr=k),jt=Mt.append(_,Mr),h.optional(function(){Mt.MISSING&&_.assert(m,"false","missing vertex count"),Mt.DYNAMIC&&_.assert(Mr,jt+">=0","missing vertex count")})):(jt=Mr.def(P,".",va),h.optional(function(){_.assert(Mr,jt+">=0","missing vertex count")})),jt}var y=S();function W(Mt){var jt=N[Mt];return jt?jt.contextDep&&U.contextDynamic||jt.propDep?jt.append(_,k):jt.append(_,m):m.def(P,".",Mt)}var j=W(xa),le=W(Tl),ue=E();if(typeof ue=="number"){if(ue===0)return}else k("if(",ue,"){"),k.exit("}");var ae,Me;Le&&(ae=W(Ml),Me=_.instancing);var tt=y+".type",Et=N.elements&&Qo(N.elements);function Ye(){function Mt(){k(Me,".drawElementsInstancedANGLE(",[j,ue,tt,le+"<<(("+tt+"-"+M0+")>>1)",ae],");")}function jt(){k(Me,".drawArraysInstancedANGLE(",[j,le,ue,ae],");")}y?Et?Mt():(k("if(",y,"){"),Mt(),k("}else{"),jt(),k("}")):jt()}function ut(){function Mt(){k(I+".drawElements("+[j,ue,tt,le+"<<(("+tt+"-"+M0+")>>1)"]+");")}function jt(){k(I+".drawArrays("+[j,le,ue]+");")}y?Et?Mt():(k("if(",y,"){"),Mt(),k("}else{"),jt(),k("}")):jt()}Le&&(typeof ae!="number"||ae>=0)?typeof ae=="string"?(k("if(",ae,">0){"),Ye(),k("}else if(",ae,"<0){"),ut(),k("}")):Ye():ut()}function Nt(_,m,k,U,z){var I=pt(),P=I.proc("body",z);return h.optional(function(){I.commandStr=m.commandStr,I.command=I.link(m.commandStr)}),Le&&(I.instancing=P.def(I.shared.extensions,".angle_instanced_arrays")),_(I,P,k,U),I.compile().body}function $t(_,m,k,U){Cr(_,m),k.useVAO?k.drawVAO?m(_.shared.vao,".setVAO(",k.drawVAO.append(_,m),");"):m(_.shared.vao,".setVAO(",_.shared.vao,".targetVAO);"):(m(_.shared.vao,".setVAO(null);"),an(_,m,k,U.attributes,function(){return!0})),Kt(_,m,k,U.uniforms,function(){return!0}),ct(_,m,m,k)}function Er(_,m){var k=_.proc("draw",1);Cr(_,k),$r(_,k,m.context),zr(_,k,m.framebuffer),en(_,k,m),on(_,k,m.state),Ct(_,k,m,!1,!0);var U=m.shader.progVar.append(_,k);if(k(_.shared.gl,".useProgram(",U,".program);"),m.shader.program)$t(_,k,m,m.shader.program);else{k(_.shared.vao,".setVAO(null);");var z=_.global.def("{}"),I=k.def(U,".id"),P=k.def(z,"[",I,"]");k(_.cond(P).then(P,".call(this,a0);").else(P,"=",z,"[",I,"]=",_.link(function(N){return Nt($t,_,m,N,1)}),"(",U,");",P,".call(this,a0);"))}Object.keys(m.state).length>0&&k(_.shared.current,".dirty=true;")}function _o(_,m,k,U){_.batchId="a1",Cr(_,m);function z(){return!0}an(_,m,k,U.attributes,z),Kt(_,m,k,U.uniforms,z),ct(_,m,m,k)}function Sa(_,m,k,U){Cr(_,m);var z=k.contextDep,I=m.def(),P="a0",N="a1",S=m.def();_.shared.props=S,_.batchId=I;var E=_.scope(),y=_.scope();m(E.entry,"for(",I,"=0;",I,"<",N,";++",I,"){",S,"=",P,"[",I,"];",y,"}",E.exit);function W(tt){return tt.contextDep&&z||tt.propDep}function j(tt){return!W(tt)}if(k.needsContext&&$r(_,y,k.context),k.needsFramebuffer&&zr(_,y,k.framebuffer),on(_,y,k.state,W),k.profile&&W(k.profile)&&Ct(_,y,k,!1,!0),U)k.useVAO?k.drawVAO?W(k.drawVAO)?y(_.shared.vao,".setVAO(",k.drawVAO.append(_,y),");"):E(_.shared.vao,".setVAO(",k.drawVAO.append(_,E),");"):E(_.shared.vao,".setVAO(",_.shared.vao,".targetVAO);"):(E(_.shared.vao,".setVAO(null);"),an(_,E,k,U.attributes,j),an(_,y,k,U.attributes,W)),Kt(_,E,k,U.uniforms,j),Kt(_,y,k,U.uniforms,W),ct(_,E,y,k);else{var le=_.global.def("{}"),ue=k.shader.progVar.append(_,y),ae=y.def(ue,".id"),Me=y.def(le,"[",ae,"]");y(_.shared.gl,".useProgram(",ue,".program);","if(!",Me,"){",Me,"=",le,"[",ae,"]=",_.link(function(tt){return Nt(_o,_,k,tt,2)}),"(",ue,");}",Me,".call(this,a0[",I,"],",I,");")}}function T(_,m){var k=_.proc("batch",2);_.batchId="0",Cr(_,k);var U=!1,z=!0;Object.keys(m.context).forEach(function(le){U=U||m.context[le].propDep}),U||($r(_,k,m.context),z=!1);var I=m.framebuffer,P=!1;I?(I.propDep?U=P=!0:I.contextDep&&U&&(P=!0),P||zr(_,k,I)):zr(_,k,null),m.state.viewport&&m.state.viewport.propDep&&(U=!0);function N(le){return le.contextDep&&U||le.propDep}en(_,k,m),on(_,k,m.state,function(le){return!N(le)}),(!m.profile||!N(m.profile))&&Ct(_,k,m,!1,"a1"),m.contextDep=U,m.needsContext=z,m.needsFramebuffer=P;var S=m.shader.progVar;if(S.contextDep&&U||S.propDep)Sa(_,k,m,null);else{var E=S.append(_,k);if(k(_.shared.gl,".useProgram(",E,".program);"),m.shader.program)Sa(_,k,m,m.shader.program);else{k(_.shared.vao,".setVAO(null);");var y=_.global.def("{}"),W=k.def(E,".id"),j=k.def(y,"[",W,"]");k(_.cond(j).then(j,".call(this,a0,a1);").else(j,"=",y,"[",W,"]=",_.link(function(le){return Nt(Sa,_,m,le,2)}),"(",E,");",j,".call(this,a0,a1);"))}}Object.keys(m.state).length>0&&k(_.shared.current,".dirty=true;")}function J(_,m){var k=_.proc("scope",3);_.batchId="a2";var U=_.shared,z=U.current;$r(_,k,m.context),m.framebuffer&&m.framebuffer.append(_,k),eh(Object.keys(m.state)).forEach(function(P){var N=m.state[P],S=N.append(_,k);Ar(S)?S.forEach(function(E,y){k.set(_.next[P],"["+y+"]",E)}):k.set(U.next,"."+P,S)}),Ct(_,k,m,!0,!0),[ya,Tl,va,Ml,xa].forEach(function(P){var N=m.draw[P];N&&k.set(U.draw,"."+P,""+N.append(_,k))}),Object.keys(m.uniforms).forEach(function(P){var N=m.uniforms[P].append(_,k);Array.isArray(N)&&(N="["+N.join()+"]"),k.set(U.uniforms,"["+g.id(P)+"]",N)}),Object.keys(m.attributes).forEach(function(P){var N=m.attributes[P].append(_,k),S=_.scopeAttrib(P);Object.keys(new $).forEach(function(E){k.set(S,"."+E,N[E])})}),m.scopeVAO&&k.set(U.vao,".targetVAO",m.scopeVAO.append(_,k));function I(P){var N=m.shader[P];N&&k.set(U.shader,"."+P,N.append(_,k))}I(ts),I(rs),Object.keys(m.state).length>0&&(k(z,".dirty=true;"),k.exit(z,".dirty=true;")),k("a1(",_.shared.context,",a0,",_.batchId,");")}function q(_){if(!(typeof _!="object"||Ar(_))){for(var m=Object.keys(_),k=0;k<m.length;++k)if(xr.isDynamic(_[m[k]]))return!0;return!1}}function ze(_,m,k){var U=m.static[k];if(!U||!q(U))return;var z=_.global,I=Object.keys(U),P=!1,N=!1,S=!1,E=_.global.def("{}");I.forEach(function(W){var j=U[W];if(xr.isDynamic(j)){typeof j=="function"&&(j=U[W]=xr.unbox(j));var le=Rn(j,null);P=P||le.thisDep,S=S||le.propDep,N=N||le.contextDep}else{switch(z(E,".",W,"="),typeof j){case"number":z(j);break;case"string":z('"',j,'"');break;case"object":Array.isArray(j)&&z("[",j.join(),"]");break;default:z(_.link(j));break}z(";")}});function y(W,j){I.forEach(function(le){var ue=U[le];if(xr.isDynamic(ue)){var ae=W.invoke(j,ue);j(E,".",le,"=",ae,";")}})}m.dynamic[k]=new xr.DynamicVariable(_l,{thisDep:P,contextDep:N,propDep:S,ref:E,append:y}),delete m.static[k]}function Dt(_,m,k,U,z){var I=pt();I.stats=I.link(z),Object.keys(m.static).forEach(function(N){ze(I,m,N)}),KT.forEach(function(N){ze(I,_,N)});var P=Dr(_,m,k,U,I);return Er(I,P),J(I,P),T(I,P),t(I.compile(),{destroy:function(){P.shader.program.destroy()}})}return{next:$e,current:de,procs:(function(){var _=pt(),m=_.proc("poll"),k=_.proc("refresh"),U=_.block();m(U),k(U);var z=_.shared,I=z.gl,P=z.next,N=z.current;U(N,".dirty=false;"),zr(_,m),zr(_,k,null,!0);var S;Le&&(S=_.link(Le)),L.oes_vertex_array_object&&k(_.link(L.oes_vertex_array_object),".bindVertexArrayOES(null);");for(var E=0;E<Z.maxAttributes;++E){var y=k.def(z.attributes,"[",E,"]"),W=_.cond(y,".buffer");W.then(I,".enableVertexAttribArray(",E,");",I,".bindBuffer(",si,",",y,".buffer.buffer);",I,".vertexAttribPointer(",E,",",y,".size,",y,".type,",y,".normalized,",y,".stride,",y,".offset);").else(I,".disableVertexAttribArray(",E,");",I,".vertexAttrib4f(",E,",",y,".x,",y,".y,",y,".z,",y,".w);",y,".buffer=null;"),k(W),Le&&k(S,".vertexAttribDivisorANGLE(",E,",",y,".divisor);")}return k(_.shared.vao,".currentVAO=null;",_.shared.vao,".setVAO(",_.shared.vao,".targetVAO);"),Object.keys(Oe).forEach(function(j){var le=Oe[j],ue=U.def(P,".",j),ae=_.block();ae("if(",ue,"){",I,".enable(",le,")}else{",I,".disable(",le,")}",N,".",j,"=",ue,";"),k(ae),m("if(",ue,"!==",N,".",j,"){",ae,"}")}),Object.keys(me).forEach(function(j){var le=me[j],ue=de[j],ae,Me,tt=_.block();if(tt(I,".",le,"("),Ar(ue)){var Et=ue.length;ae=_.global.def(P,".",j),Me=_.global.def(N,".",j),tt(cr(Et,function(Ye){return ae+"["+Ye+"]"}),");",cr(Et,function(Ye){return Me+"["+Ye+"]="+ae+"["+Ye+"];"}).join("")),m("if(",cr(Et,function(Ye){return ae+"["+Ye+"]!=="+Me+"["+Ye+"]"}).join("||"),"){",tt,"}")}else ae=U.def(P,".",j),Me=U.def(N,".",j),tt(ae,");",N,".",j,"=",ae,";"),m("if(",ae,"!==",Me,"){",tt,"}");k(tt)}),_.compile()})(),compile:Dt}}function gM(){return{vaoCount:0,bufferCount:0,elementsCount:0,framebufferCount:0,shaderCount:0,textureCount:0,cubeCount:0,renderbufferCount:0,maxTextureUnits:0}}var bM=34918,yM=34919,rh=35007,xM=function(c,g){if(!g.ext_disjoint_timer_query)return null;var L=[];function Z(){return L.pop()||g.ext_disjoint_timer_query.createQueryEXT()}function ce(Le){L.push(Le)}var Q=[];function re(Le){var We=Z();g.ext_disjoint_timer_query.beginQueryEXT(rh,We),Q.push(We),xe(Q.length-1,Q.length,Le)}function ye(){g.ext_disjoint_timer_query.endQueryEXT(rh)}function ve(){this.startQueryIndex=-1,this.endQueryIndex=-1,this.sum=0,this.stats=null}var we=[];function _e(){return we.pop()||new ve}function Re(Le){we.push(Le)}var De=[];function xe(Le,We,de){var $e=_e();$e.startQueryIndex=Le,$e.endQueryIndex=We,$e.sum=0,$e.stats=de,De.push($e)}var ke=[],$=[];function ne(){var Le,We,de=Q.length;if(de!==0){$.length=Math.max($.length,de+1),ke.length=Math.max(ke.length,de+1),ke[0]=0,$[0]=0;var $e=0;for(Le=0,We=0;We<Q.length;++We){var he=Q[We];g.ext_disjoint_timer_query.getQueryObjectEXT(he,yM)?($e+=g.ext_disjoint_timer_query.getQueryObjectEXT(he,bM),ce(he)):Q[Le++]=he,ke[We+1]=$e,$[We+1]=Le}for(Q.length=Le,Le=0,We=0;We<De.length;++We){var Oe=De[We],me=Oe.startQueryIndex,Ie=Oe.endQueryIndex;Oe.sum+=ke[Ie]-ke[me];var ot=$[me],xt=$[Ie];xt===ot?(Oe.stats.gpuTime+=Oe.sum/1e6,Re(Oe)):(Oe.startQueryIndex=ot,Oe.endQueryIndex=xt,De[Le++]=Oe)}De.length=Le}}return{beginQuery:re,endQuery:ye,pushScopeStats:xe,update:ne,getNumPendingQueries:function(){return Q.length},clear:function(){L.push.apply(L,Q);for(var Le=0;Le<L.length;Le++)g.ext_disjoint_timer_query.deleteQueryEXT(L[Le]);Q.length=0,L.length=0},restore:function(){Q.length=0,L.length=0}}},vM=16384,_M=256,SM=1024,TM=34962,nh="webglcontextlost",oh="webglcontextrestored",ah=1,MM=2,LM=3;function ih(c,g){for(var L=0;L<c.length;++L)if(c[L]===g)return L;return-1}function wM(c){var g=zo(c);if(!g)return null;var L=g.gl,Z=L.getContextAttributes(),ce=L.isContextLost(),Q=eo(L,g);if(!Q)return null;var re=tn(),ye=gM(),ve=Q.extensions,we=xM(L,ve),_e=Gn(),Re=L.drawingBufferWidth,De=L.drawingBufferHeight,xe={tick:0,time:0,viewportWidth:Re,viewportHeight:De,framebufferWidth:Re,framebufferHeight:De,drawingBufferWidth:Re,drawingBufferHeight:De,pixelRatio:g.pixelRatio},ke={},$={elements:null,primitive:4,count:-1,offset:0,instances:-1},ne=te(L,ve),Le=A2(L,ye,g,de),We=NT(L,ve,ne,ye,Le);function de(ct){return We.destroyBuffer(ct)}var $e=N2(L,ve,Le,ye),he=VT(L,re,ye,g),Oe=gT(L,ve,ne,function(){ot.procs.poll()},xe,ye,g),me=bT(L,ve,ne,ye,g),Ie=DT(L,ve,ne,Oe,me,ye),ot=hM(L,re,ve,ne,Le,$e,Oe,Ie,ke,We,he,$,xe,we,g),xt=XT(L,Ie,ot.procs.poll,xe,Z,ve,ne),He=ot.next,Ae=L.canvas,pe=[],pt=[],At=[],je=[g.onDestroy],Bt=null;function vt(){if(pe.length===0){we&&we.update(),Bt=null;return}Bt=Zr.next(vt),on();for(var ct=pe.length-1;ct>=0;--ct){var Nt=pe[ct];Nt&&Nt(xe,null,0)}L.flush(),we&&we.update()}function Ot(){!Bt&&pe.length>0&&(Bt=Zr.next(vt))}function Xt(){Bt&&(Zr.cancel(vt),Bt=null)}function Br(ct){ct.preventDefault(),ce=!0,Xt(),pt.forEach(function(Nt){Nt()})}function qr(ct){L.getError(),ce=!1,Q.restore(),he.restore(),Le.restore(),Oe.restore(),me.restore(),Ie.restore(),We.restore(),we&&we.restore(),ot.procs.refresh(),Ot(),At.forEach(function(Nt){Nt()})}Ae&&(Ae.addEventListener(nh,Br,!1),Ae.addEventListener(oh,qr,!1));function Gt(){pe.length=0,Xt(),Ae&&(Ae.removeEventListener(nh,Br),Ae.removeEventListener(oh,qr)),he.clear(),Ie.clear(),me.clear(),Oe.clear(),$e.clear(),Le.clear(),We.clear(),we&&we.clear(),je.forEach(function(ct){ct()})}function Vr(ct){h(!!ct,"invalid args to regl({...})"),h.type(ct,"object","invalid args to regl({...})");function Nt(z){var I=t({},z);delete I.uniforms,delete I.attributes,delete I.context,delete I.vao,"stencil"in I&&I.stencil.op&&(I.stencil.opBack=I.stencil.opFront=I.stencil.op,delete I.stencil.op);function P(N){if(N in I){var S=I[N];delete I[N],Object.keys(S).forEach(function(E){I[N+"."+E]=S[E]})}}return P("blend"),P("depth"),P("cull"),P("stencil"),P("polygonOffset"),P("scissor"),P("sample"),"vao"in z&&(I.vao=z.vao),I}function $t(z,I){var P={},N={};return Object.keys(z).forEach(function(S){var E=z[S];if(xr.isDynamic(E)){N[S]=xr.unbox(E,S);return}else if(I&&Array.isArray(E)){for(var y=0;y<E.length;++y)if(xr.isDynamic(E[y])){N[S]=xr.unbox(E,S);return}}P[S]=E}),{dynamic:N,static:P}}var Er=$t(ct.context||{},!0),_o=$t(ct.uniforms||{},!0),Sa=$t(ct.attributes||{},!1),T=$t(Nt(ct),!1),J={gpuTime:0,cpuTime:0,count:0},q=ot.compile(T,Sa,_o,Er,J),ze=q.draw,Dt=q.batch,_=q.scope,m=[];function k(z){for(;m.length<z;)m.push(null);return m}function U(z,I){var P;if(ce&&h.raise("context lost"),typeof z=="function")return _.call(this,null,z,0);if(typeof I=="function")if(typeof z=="number")for(P=0;P<z;++P)_.call(this,null,I,P);else if(Array.isArray(z))for(P=0;P<z.length;++P)_.call(this,z[P],I,P);else return _.call(this,z,I,0);else if(typeof z=="number"){if(z>0)return Dt.call(this,k(z|0),z|0)}else if(Array.isArray(z)){if(z.length)return Dt.call(this,z,z.length)}else return ze.call(this,z)}return t(U,{stats:J,destroy:function(){q.destroy()}})}var pr=Ie.setFBO=Vr({framebuffer:xr.define.call(null,ah,"framebuffer")});function Dr(ct,Nt){var $t=0;ot.procs.poll();var Er=Nt.color;Er&&(L.clearColor(+Er[0]||0,+Er[1]||0,+Er[2]||0,+Er[3]||0),$t|=vM),"depth"in Nt&&(L.clearDepth(+Nt.depth),$t|=_M),"stencil"in Nt&&(L.clearStencil(Nt.stencil|0),$t|=SM),h(!!$t,"called regl.clear with no buffer specified"),L.clear($t)}function $r(ct){if(h(typeof ct=="object"&&ct,"regl.clear() takes an object as input"),"framebuffer"in ct)if(ct.framebuffer&&ct.framebuffer_reglType==="framebufferCube")for(var Nt=0;Nt<6;++Nt)pr(t({framebuffer:ct.framebuffer.faces[Nt]},ct),Dr);else pr(ct,Dr);else Dr(null,ct)}function zr(ct){h.type(ct,"function","regl.frame() callback must be a function"),pe.push(ct);function Nt(){var $t=ih(pe,ct);h($t>=0,"cannot cancel a frame twice");function Er(){var _o=ih(pe,Er);pe[_o]=pe[pe.length-1],pe.length-=1,pe.length<=0&&Xt()}pe[$t]=Er}return Ot(),{cancel:Nt}}function en(){var ct=He.viewport,Nt=He.scissor_box;ct[0]=ct[1]=Nt[0]=Nt[1]=0,xe.viewportWidth=xe.framebufferWidth=xe.drawingBufferWidth=ct[2]=Nt[2]=L.drawingBufferWidth,xe.viewportHeight=xe.framebufferHeight=xe.drawingBufferHeight=ct[3]=Nt[3]=L.drawingBufferHeight}function on(){xe.tick+=1,xe.time=Ct(),en(),ot.procs.poll()}function Cr(){Oe.refresh(),en(),ot.procs.refresh(),we&&we.update()}function Ct(){return(Gn()-_e)/1e3}Cr();function an(ct,Nt){h.type(Nt,"function","listener callback must be a function");var $t;switch(ct){case"frame":return zr(Nt);case"lost":$t=pt;break;case"restore":$t=At;break;case"destroy":$t=je;break;default:h.raise("invalid event, must be one of frame,lost,restore,destroy")}return $t.push(Nt),{cancel:function(){for(var Er=0;Er<$t.length;++Er)if($t[Er]===Nt){$t[Er]=$t[$t.length-1],$t.pop();return}}}}var Kt=t(Vr,{clear:$r,prop:xr.define.bind(null,ah),context:xr.define.bind(null,MM),this:xr.define.bind(null,LM),draw:Vr({}),buffer:function(ct){return Le.create(ct,TM,!1,!1)},elements:function(ct){return $e.create(ct,!1)},texture:Oe.create2D,cube:Oe.createCube,renderbuffer:me.create,framebuffer:Ie.create,framebufferCube:Ie.createCube,vao:We.createVAO,attributes:Z,frame:zr,on:an,limits:ne,hasExtension:function(ct){return ne.extensions.indexOf(ct.toLowerCase())>=0},read:xt,destroy:Gt,_gl:L,_refresh:Cr,poll:function(){on(),we&&we.update()},now:Ct,stats:ye});return g.onDone(null,Kt),Kt}return wM}))});u();u();u();u();var fs=`vec2 uv = _st;
float aspect = resolution.x / max(1.0, resolution.y);
uv -= 0.5;
uv.x *= aspect;
uv.x += sin(uv.y * 14.0 + time * 2.4) * a * 0.11;
uv.y += cos(uv.x * 11.0 - time * 1.8) * a * 0.045;
uv.x /= aspect;
return uv;`,BM=`float luma = dot(_c0.rgb, vec3(0.299, 0.587, 0.114));
return vec4(mix(_c0.rgb, vec3(luma), a * 0.7), _c0.a);`;function ch(e){return Math.round(e)===1?BM:fs}function uh(e,t){let r=Math.round(t)===1?"color":"coord",n=e.trim().replace(/^#version[^\n]*\n?/gm,"");return/\breturn\b/.test(n)||(n=r==="coord"?`${n}
return _st;`:`${n}
return _c0;`),{type:r,glsl:`${r==="coord"?`float a = clamp(amount, 0.0, 1.0);
if (a < 0.00001) return _st;`:`float a = clamp(amount, 0.0, 1.0);
if (a < 0.00001) return _c0;`}
${n}`}}u();var ee=us(ph(),1);u();u();var dh=[{h:0,s:0,l:0,p:0},{h:0,s:0,l:.5,p:.5},{h:0,s:0,l:1,p:1},{h:0,s:.55,l:.55,p:.7},{h:40,s:.55,l:.55,p:.82},{h:80,s:.55,l:.55,p:.94}];function xn(e,t){return`s${e}${t}`}function gh(e){let t=Math.round(Number(e));return Number.isFinite(t)?Math.min(6,Math.max(2,t)):3}function Bl(e,t,r){let n=e?.[t];return typeof n=="number"&&Number.isFinite(n)?n:r}function mh(e,t,r){let n=(e%360+360)%360,o=Math.min(1,Math.max(0,t)),i=Math.min(1,Math.max(0,r)),s=(1-Math.abs(2*i-1))*o,l=s*(1-Math.abs(n/60%2-1)),p=i-s/2,d=0,v=0,H=0;return n<60?(d=s,v=l):n<120?(d=l,v=s):n<180?(v=s,H=l):n<240?(v=l,H=s):n<300?(d=l,H=s):(d=s,H=l),[d+p,v+p,H+p]}function DM(e,t,r){let n=Math.min(1,Math.max(0,e)),o=Math.min(1,Math.max(0,t)),i=Math.min(1,Math.max(0,r)),s=Math.max(n,o,i),l=Math.min(n,o,i),p=(s+l)/2,d=s-l;if(d<1e-6)return{h:0,s:0,l:p,p:0};let v=d/(1-Math.abs(2*p-1)),H=0;return s===n?H=60*((o-i)/d%6):s===o?H=60*((i-n)/d+2):H=60*((n-o)/d+4),H<0&&(H+=360),{h:H,s:v,l:p,p:0}}function HM(e,t){let n=(typeof e=="string"?e:t).replace("#","").trim();if(n.length!==6)return[0,0,0];let o=parseInt(n,16);return Number.isNaN(o)?[0,0,0]:[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255]}function pf(e,t,r){let[n,o,i]=HM(e,t);return{...DM(n,o,i),p:r}}function Dl(e){return dh[e]??dh[0]}function NM(e){if(typeof e?.shadow=="string"&&typeof e.s0h!="number")return[pf(e.shadow,"#000000",0),pf(e.mid,"#808080",.5),pf(e.highlight,"#ffffff",1)];let t=gh(e?.stopCount),r=[];for(let n=0;n<t;n+=1){let o=Dl(n);r.push({h:Bl(e,xn(n,"h"),o.h),s:Bl(e,xn(n,"s"),o.s),l:Bl(e,xn(n,"l"),o.l),p:Bl(e,xn(n,"p"),o.p)})}return r}function hh(e){let t=e.toSorted((n,o)=>n.p-o.p),r=t[t.length-1]??{rgb:[0,0,0],p:1};for(;t.length<6;)t.push(r);return t}function bh(e,t){if(t&&typeof t.shadow=="string"&&typeof t.s0h!="number")return hh(NM(t).map(o=>({rgb:mh(o.h,o.s,o.l),p:o.p})));let r=gh(e("stopCount",3)),n=[];for(let o=0;o<r;o+=1){let i=Dl(o);n.push({rgb:mh(e(xn(o,"h"),i.h),e(xn(o,"s"),i.s),e(xn(o,"l"),i.l)),p:e(xn(o,"p"),i.p)})}return hh(n)}function yh(){let e=[{key:"stopCount",label:"Stops",min:2,max:6,step:1,default:3},{key:"editStop",label:"Edit stop",min:0,max:5,step:1,default:0},{key:"stopsOpen",label:"Stops (0=Cards, 1=HSL)",min:0,max:1,step:1,default:0}];for(let t=0;t<6;t+=1){let r=Dl(t),n=t+1;e.push({key:xn(t,"h"),label:`S${n} Hue`,min:0,max:360,step:1,default:r.h},{key:xn(t,"s"),label:`S${n} Sat`,min:0,max:1,step:.01,default:r.s},{key:xn(t,"l"),label:`S${n} Light`,min:0,max:1,step:.01,default:r.l},{key:xn(t,"p"),label:`S${n} Pos`,min:0,max:1,step:.01,default:r.p})}return e}function xh(){let e={stopCount:3,editStop:0,stopsOpen:0};for(let t=0;t<6;t+=1){let r=Dl(t);e[xn(t,"h")]=r.h,e[xn(t,"s")]=r.s,e[xn(t,"l")]=r.l,e[xn(t,"p")]=r.p}return e}u();var df=[{id:0,key:"goldenrod",label:"Goldenrod"},{id:1,key:"moonGate",label:"Moon Gate"},{id:2,key:"bleachSkip",label:"Bleach Skip"},{id:3,key:"tealSplit",label:"Teal Split"},{id:4,key:"nitrate",label:"Nitrate"},{id:5,key:"magicHour",label:"Magic Hour"},{id:6,key:"wetNeon",label:"Wet Neon"},{id:7,key:"acetate",label:"Acetate"},{id:8,key:"polar",label:"Polar"},{id:9,key:"crossBath",label:"Cross Bath"},{id:10,key:"dayNite",label:"Day-Nite"},{id:11,key:"sodium",label:"Sodium"}],Qk=df.length,vh=df.map(e=>e.id),_h=`Stock (${df.map(e=>`${e.id}=${e.label}`).join(", ")})`;u();var Sh=["Blend","Diff","Add","Mult","Layer","Overlay"],Th=Sh.length-1;function mf(e="Blend"){let t=Sh.map((r,n)=>`${n}=${r}`).join(", ");return`${e} (${t})`}var Mh=mf("Blend"),GM=mf("Mix"),WM=mf("Onto"),hf=6,gf=hf,Lh=`${WM.slice(0,-1)}, 6=Mask)`;function Dn(e=0){return{key:"mode",label:Mh,min:0,max:Th,step:1,default:e}}function vn(e){return Ah(e,Th)}function wh(e){return Ah(e,gf)}function Ah(e,t){return Math.max(0,Math.min(t,Math.round(e)))}u();var sr={fade:0,zoom:1,swipe:2,pixelate:3,random:4,clap:5,mask:6,slide:7},UM=[sr.fade,sr.zoom,sr.swipe,sr.pixelate,sr.clap,sr.mask,sr.slide],bf=sr.slide,VM=8,rP=[VM,sr.fade,sr.zoom,sr.swipe,sr.pixelate,sr.random,sr.clap,sr.mask,sr.slide],Ch="Transition Style (0=Fade, 1=Zoom, 2=Swipe, 3=Pixelate, 4=Random, 5=Clap, 6=Mask, 7=Slide)";function Eh(e){let t=Math.round(Number(e));if(!Number.isFinite(t))return sr.fade;if(t===sr.random){let r=UM;return r[Math.floor(Math.random()*r.length)]}return t<0||t>bf?sr.fade:t}function Rh(e,t){let r=Math.max(0,Math.min(1,e));return t?r<.5?.02:Math.max(.02,(r-.5)*2):r<.5?Math.max(.02,1-r*2):.02}function kh(e){let t=Math.max(0,Math.min(1,e));return 1-Math.abs(t-.5)*2}var $M={Playback:{header:"text-sky-300/95 bg-sky-500/12 border-sky-500/25",card:"border-sky-500/15 bg-sky-950/25",cardHover:"hover:border-sky-400/50 hover:bg-sky-500/18",picked:"border-white/45 bg-sky-500/22",active:"border-sky-500/15 bg-sky-500/10",activeIcon:"text-sky-300/45",activeLabel:"text-sky-200/80",activeBadge:"text-sky-300/70 bg-sky-500/15 border-sky-500/20",icon:"text-sky-400/45",iconHover:"group-hover:text-sky-300/65",labelHover:"group-hover:text-sky-100"},"Transform & space":{header:"text-violet-300/95 bg-violet-500/12 border-violet-500/25",card:"border-violet-500/15 bg-violet-950/25",cardHover:"hover:border-violet-400/50 hover:bg-violet-500/18",picked:"border-white/45 bg-violet-500/22",active:"border-violet-500/15 bg-violet-500/10",activeIcon:"text-violet-300/45",activeLabel:"text-violet-200/80",activeBadge:"text-violet-300/70 bg-violet-500/15 border-violet-500/20",icon:"text-violet-400/45",iconHover:"group-hover:text-violet-300/65",labelHover:"group-hover:text-violet-100"},"Color & grade":{header:"text-amber-300/95 bg-amber-500/12 border-amber-500/25",card:"border-amber-500/15 bg-amber-950/20",cardHover:"hover:border-amber-400/50 hover:bg-amber-500/18",picked:"border-white/45 bg-amber-500/22",active:"border-amber-500/15 bg-amber-500/10",activeIcon:"text-amber-300/45",activeLabel:"text-amber-200/80",activeBadge:"text-amber-300/70 bg-amber-500/15 border-amber-500/20",icon:"text-amber-400/45",iconHover:"group-hover:text-amber-300/65",labelHover:"group-hover:text-amber-100"},"Warp & pattern":{header:"text-emerald-300/95 bg-emerald-500/12 border-emerald-500/25",card:"border-emerald-500/15 bg-emerald-950/25",cardHover:"hover:border-emerald-400/50 hover:bg-emerald-500/18",picked:"border-white/45 bg-emerald-500/22",active:"border-emerald-500/15 bg-emerald-500/10",activeIcon:"text-emerald-300/45",activeLabel:"text-emerald-200/80",activeBadge:"text-emerald-300/70 bg-emerald-500/15 border-emerald-500/20",icon:"text-emerald-400/45",iconHover:"group-hover:text-emerald-300/65",labelHover:"group-hover:text-emerald-100"},Glitch:{header:"text-rose-300/95 bg-rose-500/12 border-rose-500/25",card:"border-rose-500/15 bg-rose-950/25",cardHover:"hover:border-rose-400/50 hover:bg-rose-500/18",picked:"border-white/45 bg-rose-500/22",active:"border-rose-500/15 bg-rose-500/10",activeIcon:"text-rose-300/45",activeLabel:"text-rose-200/80",activeBadge:"text-rose-300/70 bg-rose-500/15 border-rose-500/20",icon:"text-rose-400/45",iconHover:"group-hover:text-rose-300/65",labelHover:"group-hover:text-rose-100"},"Composite & texture":{header:"text-cyan-300/95 bg-cyan-500/12 border-cyan-500/25",card:"border-cyan-500/15 bg-cyan-950/25",cardHover:"hover:border-cyan-400/50 hover:bg-cyan-500/18",picked:"border-white/45 bg-cyan-500/22",active:"border-cyan-500/15 bg-cyan-500/10",activeIcon:"text-cyan-300/45",activeLabel:"text-cyan-200/80",activeBadge:"text-cyan-300/70 bg-cyan-500/15 border-cyan-500/20",icon:"text-cyan-400/45",iconHover:"group-hover:text-cyan-300/65",labelHover:"group-hover:text-cyan-100"}},fP=$M["Composite & texture"];var V={amount:"Amount",audioDepth:"Audio depth",density:"Density",speed:"Speed",centerX:"Center X",centerY:"Center Y",radius:"Radius",softness:"Softness",sensitivity:"Sensitivity",style:"Style",blend:"Blend"};var zM=new Set(["stutterBack","jumpCut","clipPeek","zap","boomerang","slowmo","accelerate","neonGrid","electricNoise"]),XM=new Set(["slowmo","accelerate"]),jM=new Set(["playbackCue"]);function ci(e){return zM.has(e)}function ps(e){return XM.has(e)}function Ph(e){return jM.has(e)}var ds=["videoSpeed","autoMix","transition","colorAdjust"],YM=["videoSpeed","autoMix","colorAdjust"];function So(e){return ds.includes(e)}function qM(e){return YM.includes(e)}var io=[{category:"Playback",key:"videoSpeed",label:"Video Speed",icon:ee.FastForward,min:0,max:5,step:.01,baseLabel:"Base",multiplierMax:10},{category:"Playback",key:"autoMix",label:"Mixer",icon:ee.Shuffle,min:0,max:180,step:1,baseLabel:"Time before change (sec)"},{category:"Composite & texture",key:"transition",label:"Transition",icon:ee.ArrowLeftRight,min:0,max:1,step:.01,extraParams:[{key:"type",label:Ch,min:0,max:7,step:1,default:0,choices:[0,1,2,3,4,5,6,7]},{key:"duration",label:"Duration (sec)",min:.1,max:5,step:.1,default:1}]},{category:"Color & grade",key:"colorAdjust",label:"Color Adjust",icon:ee.Palette,min:-1,max:1,step:.05,baseLabel:"Luminosity",extraParams:[{key:"contrast",label:"Contrast",min:0,max:2,step:.05,default:1},{key:"saturation",label:"Saturation",min:0,max:2,step:.05,default:1},{key:"hue",label:"Hue",min:0,max:360,step:1,default:0}]}],pP=io.filter(e=>qM(e.key));var Xn=[{category:"Color & grade",key:"lens7c",label:"7C Lens",icon:ee.Rainbow,min:0,max:1,step:.01,baseLabel:"Refraction",multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"spread",label:"Throw",min:0,max:1,step:.01,default:.55},{key:"rotation",label:"Filter angle",min:0,max:1,step:.01,default:0},{key:"threshold",label:V.sensitivity,min:0,max:1,step:.01,default:.42},{key:"haze",label:"Haze",min:0,max:1,step:.01,default:.5}]},{category:"Color & grade",key:"answerPrint",label:"Answer Print",icon:ee.Clapperboard,min:0,max:1,step:.01,baseLabel:"Print",extraParams:[{key:"stock",label:_h,min:0,max:11,step:1,default:0,choices:vh},{key:"density",label:"Strike",min:.35,max:1.75,step:.05,default:1}]},{category:"Color & grade",key:"colorLayer",label:"Color Layer",icon:ee.Palette,min:-1,max:1,step:.05,baseLabel:"Luminosity",extraParams:[{key:"contrast",label:"Contrast",min:0,max:2,step:.05,default:1},{key:"saturation",label:"Saturation",min:0,max:2,step:.05,default:1},{key:"hue",label:"Hue",min:0,max:360,step:1,default:0}]},{category:"Color & grade",key:"pulse",label:"Pulse",icon:ee.Activity,min:0,max:1,step:.01,baseLabel:"Reactivity",multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"breath",label:"Breath",min:0,max:1,step:.01,default:.5},{key:"bloom",label:"Bloom",min:0,max:1,step:.01,default:.45}]},{category:"Warp & pattern",key:"centerDiffuse",label:"Center Diffuse",icon:ee.ArrowDownUp,min:0,max:1,step:.01,baseLabel:"Spread",multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"diffusion",label:"Blur",min:0,max:1,step:.01,default:.72},{key:"band",label:"Strip height",min:.01,max:.35,step:.01,default:.06,tier:"advanced"},{key:"centerY",label:V.centerY,min:.1,max:.9,step:.01,default:.5,tier:"advanced"}]},{category:"Warp & pattern",key:"chromaticAberration",label:"Chroma Ab.",icon:ee.Aperture,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"direction",label:"Angle (0\u20131 turn)",min:0,max:1,step:.01,default:.125}]},{category:"Warp & pattern",key:"concentricRotate",label:"Concentric Spin",icon:ee.Target,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"mode",label:"Mode (0=Concentric, 1=Spiral)",min:0,max:1,step:1,default:0},{key:"rings",label:"Rings",min:2,max:64,step:1,default:7},{key:"step",label:"Step (turns / ring)",min:0,max:.25,step:1e-4,default:.08},{key:"speed",label:V.speed,min:0,max:2,step:.05,default:.25},{key:"centerX",label:V.centerX,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerY",label:V.centerY,min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Warp & pattern",key:"customShader",label:"Custom Shader",icon:ee.Code2,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:2,multiplierStep:.05,extraParams:[{key:"shaderType",label:"Type (0=Coord, 1=Color)",min:0,max:1,step:1,default:0},{key:"code",label:"GLSL body",kind:"shader",default:fs,tier:"advanced"}]},{category:"Warp & pattern",key:"cymatic",label:"Cymatic",icon:ee.Activity,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:2,multiplierStep:.05,extraParams:[{key:"frequency",label:V.density,min:1,max:48,step:1,default:12}]},{category:"Glitch",key:"dataDrip",label:"Data Drip",icon:ee.Columns2,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"dance",label:"Dance",min:0,max:1,step:.01,default:.65},{key:"chaos",label:"Chaos",min:0,max:1,step:.01,default:.35},{key:"speed",label:V.speed,min:0,max:3,step:.05,default:1},{key:"columns",label:V.density,min:8,max:220,step:1,default:72}]},{category:"Glitch",key:"degauss",label:"Degauss",icon:ee.MonitorX,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"frequency",label:V.density,min:2,max:32,step:1,default:12},{key:"speed",label:V.speed,min:0,max:4,step:.05,default:1.4},{key:"fringe",label:"Chroma fringe",min:0,max:1,step:.01,default:.55},{key:"tail",label:"Sustain",min:0,max:1,step:.01,default:.82,tier:"advanced"}]},{category:"Color & grade",key:"dither",label:"Dither",icon:ee.Grid,min:0,max:1,step:.01,baseLabel:V.amount,hint:"Blue-noise threshold dither \u2014 soft film grain that shimmers and quantizes. Use for analog texture on grade; not a full-frame overlay.",extraParams:[{key:"binary",label:"Posterize (0=Off, 1=2 tone, 2=3 tone, 3=4 tone, 4=6 tone)",min:0,max:4,step:1,default:0},{key:"balance",label:"Balance",min:0,max:1,step:.01,default:.5},{key:"scale",label:"Grain (px)",min:.25,max:64,step:.25,default:4,tier:"advanced"}]},{category:"Composite & texture",key:"blur",label:"Blur",icon:ee.Droplets,min:0,max:2,step:.01,baseLabel:V.amount,extraParams:[{key:"mode",label:"Style (0=Gaussian, 1=Radial, 2=Noise)",min:0,max:2,step:1,default:0}]},{category:"Composite & texture",key:"emberHeat",label:"Ember & Heat",icon:ee.Sun,min:0,max:1,step:.01,baseLabel:"Heat",multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"waves",label:"Heat waves",min:0,max:1,step:.01,default:.76},{key:"intensity",label:"Particles",min:0,max:1,step:.01,default:.78},{key:"speed",label:V.speed,min:0,max:3,step:.05,default:.8},{key:"density",label:V.density,min:6,max:40,step:1,default:22},{key:"glow",label:"Ember glow",min:0,max:1,step:.01,default:.82}]},{category:"Composite & texture",key:"sharpen",label:"Sharpen",icon:ee.Focus,min:0,max:2,step:.01,baseLabel:V.amount,extraParams:[{key:"radius",label:"Detail",min:.25,max:2,step:.05,default:1}]},{category:"Composite & texture",key:"shatterLayer",label:"Shatter Layer",icon:ee.Layers,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"mode",label:"Gaps (0=Black, 1=Clip)",min:0,max:1,step:1,default:0},{key:"density",label:V.density,min:4,max:48,step:1,default:14},{key:"gap",label:"Gap width",min:0,max:.2,step:.005,default:.065},{key:"scatter",label:"Scatter",min:0,max:1,step:.01,default:.62},{key:"irregularity",label:"Irregularity",min:0,max:1,step:.01,default:.82,tier:"advanced"},{key:"videoIndex",label:"Gap clip",min:1,max:50,step:1,default:2,tier:"advanced"}]},{category:"Playback",key:"boomerang",label:"Boomerang",icon:ee.ArrowDownUp,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"segmentSec",label:"Slice (sec)",min:.25,max:8,step:.05,default:1.25},{key:"maxFrames",label:"Cache frames",min:24,max:180,step:1,default:60,tier:"advanced"},{key:"captureFps",label:"Capture FPS",min:12,max:60,step:1,default:24,tier:"advanced"}]},{category:"Playback",key:"clipPeek",label:"Clip Peek",icon:ee.SkipForward,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"holdSec",label:"Hold (sec)",min:.05,max:2,step:.05,default:.35},{key:"steps",label:"Steps forward",min:1,max:8,step:1,default:1}]},{category:"Playback",key:"zap",label:"Zap",icon:ee.Zap,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"clipCount",label:"Videos",min:1,max:8,step:1,default:3},{key:"framesPerClip",label:"Frames each",min:1,max:12,step:1,default:4}]},{category:"Warp & pattern",key:"distortion",label:"Distortion",icon:ee.Waves,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"mode",label:"Style (0=Pinch, 1=H, 2=V, 3=Rad)",min:0,max:3,step:1,default:0},{key:"curvature",label:"Curvature",min:.2,max:2,step:.05,default:1},{key:"frequency",label:"Cycles",min:1,max:36,step:1,default:10},{key:"speed",label:V.speed,min:0,max:4,step:.1,default:1.2},{key:"centerFocus",label:"Center weight",min:.3,max:4,step:.05,default:1.4,tier:"advanced"}]},{category:"Warp & pattern",key:"electricNoise",label:"Electric Noise",icon:ee.Zap,extraParams:[{key:"amount",label:V.amount,min:0,max:1,step:.01,default:1},{key:"color",label:"Color",kind:"color",default:"#331a66"},Dn(2),{key:"speed",label:V.speed,min:0,max:3,step:.05,default:1},{key:"scale",label:"Zoom",min:.25,max:2,step:.05,default:1},{key:"intensity",label:"Glow",min:.5,max:3,step:.05,default:1.4},{key:"noiseScale",label:"Noise scale",min:.25,max:4,step:.05,default:1,tier:"advanced"},{key:"turbulence",label:"Turbulence",min:0,max:.6,step:.01,default:.2,tier:"advanced"},{key:"detail",label:"Detail",min:3,max:6,step:1,default:5,tier:"advanced"},{key:"rings",label:"Ring mix",min:0,max:1,step:.01,default:.85,tier:"advanced"},{key:"ringPower",label:"Ring edge",min:.35,max:1.35,step:.05,default:.9,tier:"advanced"}]},{category:"Warp & pattern",key:"fractalFold",label:"Fractal Fold",icon:ee.Snowflake,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[Dn(2),{key:"foldX",label:"Fold X",min:.3,max:1.7,step:.01,default:.86},{key:"foldY",label:"Fold Y",min:.3,max:1.7,step:.01,default:1.04},{key:"zoom",label:"Zoom",min:.25,max:3,step:.05,default:1},{key:"speed",label:V.speed,min:0,max:3,step:.05,default:.6},{key:"spin",label:"Fold spin",min:-1.6,max:1.6,step:.02,default:.42,tier:"advanced"},{key:"depth",label:"Fold depth",min:3,max:16,step:1,default:8,slider:!0,tier:"advanced"},{key:"glow",label:"Filament glow",min:.25,max:2.5,step:.05,default:1.4,tier:"advanced"},{key:"hue",label:"Palette shift",min:0,max:1,step:.01,default:.12,tier:"advanced"}]},{category:"Warp & pattern",key:"reactionDiffusion",label:"React Diff.",icon:ee.Orbit,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"source",label:"Video drive",min:0,max:1,step:.01,default:.78},{key:"feed",label:"Feed",min:0,max:1,step:.01,default:.55},{key:"kill",label:"Kill",min:0,max:1,step:.01,default:.57},{key:"scale",label:"Pattern size",min:3,max:40,step:1,default:12},{key:"emboss",label:"Relief",min:0,max:1,step:.01,default:.58},{key:"flow",label:"Flow",min:0,max:1,step:.01,default:.32},{key:"speed",label:"Growth",min:0,max:2,step:.05,default:.45,tier:"advanced"},{key:"styleMap",label:"Style map",min:0,max:1,step:.01,default:.35,tier:"advanced"}]},{category:"Warp & pattern",key:"ripple",label:"Ripple",icon:ee.CircleDot,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"frequency",label:V.density,min:2,max:32,step:1,default:10},{key:"speed",label:V.speed,min:0,max:4,step:.05,default:1.2},{key:"decay",label:"Falloff",min:0,max:1,step:.01,default:.55,tier:"advanced"},{key:"centerX",label:V.centerX,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerY",label:V.centerY,min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Warp & pattern",key:"randomGallery",label:"Random Gallery",icon:ee.LayoutGrid,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"cells",label:"Cells",min:3,max:16,step:1,default:7},{key:"speed",label:V.speed,min:0,max:2,step:.05,default:1},{key:"refraction",label:"Refraction",min:0,max:1,step:.01,default:.82},{key:"drift",label:"Grid drift",min:0,max:1,step:.01,default:1,tier:"advanced"}]},{category:"Warp & pattern",key:"throughTheStars",label:"Through The Stars",icon:ee.Sparkle,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[{key:"trail",label:"Trail",min:0,max:1.5,step:.01,default:.48},{key:"density",label:V.density,min:12,max:220,step:1,default:56},{key:"speed",label:V.speed,min:0,max:8,step:.05,default:1.15},{key:"glow",label:"Glow",min:0,max:1,step:.01,default:.74},{key:"fov",label:"Field spread",min:.25,max:2,step:.05,default:1.05},{key:"depth",label:"Fade-in range",min:0,max:1,step:.01,default:.65,tier:"advanced"},{key:"tint",label:"Glow tint",kind:"color",default:"#00e8cc",tier:"advanced"},{key:"centerX",label:V.centerX,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerY",label:V.centerY,min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Glitch",key:"encodeGlitch",label:"Encode Glitch",icon:ee.Binary,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"macroBlock",label:"Block size",min:0,max:1,step:.01,default:.5},{key:"tear",label:"Tear",min:0,max:1,step:.01,default:.35}]},{category:"Color & grade",key:"edge",label:"Edge",icon:ee.ScanLine,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"threshold",label:V.sensitivity,min:0,max:1,step:.01,default:.32},{key:"thickness",label:"Width",min:.05,max:1,step:.01,default:.35},{key:"soften",label:V.softness,min:0,max:1,step:.01,default:.25,tier:"advanced"},{key:"strength",label:"Line strength",min:0,max:2,step:.05,default:1,tier:"advanced"}]},{category:"Color & grade",key:"fadeOff",label:"Fade Off",icon:ee.VolumeX,min:0,max:1,step:.01,baseLabel:"Silence fade",multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01},{category:"Composite & texture",key:"feedback",label:"Feedback",icon:ee.Repeat,min:.8,max:.99,step:.01,baseLabel:V.amount,extraParams:[{key:"balance",label:"Balance",min:0,max:1,step:.01,default:.5},{key:"scale",label:"Scale",min:.98,max:1.02,step:.001,default:1},{key:"reset",label:"Reset trail",kind:"action"}]},{category:"Composite & texture",key:"fillLayer",label:"Fill Layer",icon:ee.Palette,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"type",label:"Style (0=Solid, 1=Horizontal, 2=Vertical, 3=Radial)",min:0,max:3,step:1,default:1},{key:"sweep",label:"Sweep (0=Off, 1=Angular, 2=Diamond, 3=Spiral)",min:0,max:3,step:1,default:0},{key:"colorA",label:"Start",kind:"color",default:"#7c3aed"},{key:"colorB",label:"End",kind:"color",default:"#06b6d4"},Dn(0),{key:"softness",label:V.softness,min:0,max:1,step:.02,default:.35,tier:"advanced"}]},{category:"Color & grade",key:"flash",label:"Flash",icon:ee.Sun,min:0,max:1,step:.01,baseLabel:V.amount},{category:"Color & grade",key:"hitStreak",label:"Hit Streak",icon:ee.Sparkle,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"length",label:"Length",min:0,max:1,step:.01,default:.58},{key:"mode",label:"0=H 1=radial 2=diagonal",min:0,max:2,step:1,default:0},{key:"threshold",label:V.sensitivity,min:0,max:1,step:.01,default:.6},{key:"decay",label:"Decay",min:0,max:1,step:.01,default:.72}]},{category:"Color & grade",key:"hdr",label:"HDR",icon:ee.SunMedium,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"blackFloor",label:"Black floor",min:0,max:.3,step:.01,default:.08},{key:"highlights",label:"Highlight boost",min:0,max:2,step:.05,default:.85},{key:"knee",label:V.softness,min:0,max:1,step:.02,default:.5,tier:"advanced"}]},{category:"Glitch",key:"ghostFlow",label:"Ghost Flow",icon:ee.Ghost,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"melt",label:"Melt",min:0,max:1,step:.01,default:.62},{key:"flowScale",label:"Flow scale",min:0,max:1,step:.01,default:.48},{key:"refresh",label:"Refresh",min:0,max:1,step:.01,default:0},{key:"chromaBleed",label:"Chroma bleed",min:0,max:1,step:.01,default:.35}]},{category:"Glitch",key:"gridShuffle",label:"Grid Shuffle",icon:ee.Dices,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"cells",label:"Cells",min:2,max:16,step:1,default:4},{key:"chaos",label:"Chaos",min:0,max:1,step:.01,default:1}]},{category:"Glitch",key:"glitch",label:"Glitch",icon:ee.MonitorX,min:0,max:10,step:.1,baseLabel:V.amount,extraParams:[{key:"size",label:"Block size",min:0,max:10,step:.1,default:5},{key:"speed",label:V.speed,min:0,max:4,step:.05,default:1.15},{key:"travel",label:"Travel",min:0,max:1,step:.01,default:1},{key:"tear",label:"Tear",min:0,max:1,step:.01,default:1,tier:"advanced"}]},{category:"Color & grade",key:"glow",label:"Glow",icon:ee.Sparkles,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"threshold",label:V.sensitivity,min:0,max:1,step:.01,default:.48},{key:"bloom",label:"Spread",min:0,max:1,step:.01,default:.55}]},{category:"Playback",key:"playbackCue",label:"Cue Layer",icon:ee.Target,min:0,max:1,step:.01,baseLabel:"Mix",extraParams:[{key:"eventCount",label:"Events",min:1,max:4,step:1,default:2},{key:"holdSec",label:"Hold (sec)",min:.05,max:4,step:.05,default:.35},{key:"clip1",label:"Cue 1 clip",min:1,max:50,step:1,default:1},{key:"frame1",label:"Cue 1 frame",min:0,max:7200,step:1,default:48},{key:"clip2",label:"Cue 2 clip",min:1,max:50,step:1,default:2},{key:"frame2",label:"Cue 2 frame",min:0,max:7200,step:1,default:0},{key:"clip3",label:"Cue 3 clip",min:1,max:50,step:1,default:3,tier:"advanced"},{key:"frame3",label:"Cue 3 frame",min:0,max:7200,step:1,default:0,tier:"advanced"},{key:"clip4",label:"Cue 4 clip",min:1,max:50,step:1,default:4,tier:"advanced"},{key:"frame4",label:"Cue 4 frame",min:0,max:7200,step:1,default:0,tier:"advanced"}]},{category:"Playback",key:"jumpCut",label:"Jump Cut",icon:ee.SkipForward,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"skipFrames",label:"Skip frames",min:1,max:48,step:1,default:2},{key:"jumpCuts",label:"Bursts",min:1,max:24,step:1,default:1}]},{category:"Warp & pattern",key:"kaleid",label:"Kaleid.",icon:ee.Hexagon,min:0,max:24,step:1,baseLabel:"Slices",extraParams:[{key:"angle",label:"Angle",min:-3.14,max:3.14,step:.01,default:0},{key:"videoZoom",label:"Zoom",min:.5,max:2,step:.01,default:1},{key:"videoX",label:"Pos X",min:-1,max:1,step:.01,default:0},{key:"videoY",label:"Pos Y",min:-1,max:1,step:.01,default:0}]},{category:"Composite & texture",key:"layerBlend",label:"Layer Blend",icon:ee.Layers,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[Dn(0),{key:"sourceMode",label:"Clip (0=Index, 1=Static)",min:0,max:1,step:1,default:0},{key:"videoIndex",label:"Clip index",min:1,max:50,step:1,default:1},{key:"playbackSpeed",label:V.speed,min:.1,max:4,step:.1,default:1.25,tier:"advanced"}]},{category:"Composite & texture",key:"videoMap",label:"Video Map",icon:ee.Map,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"mode",label:"Mode (0=Mask, 1=Displace)",min:0,max:1,step:1,default:0},{key:"invert",label:"Invert (0=Off, 1=On)",min:0,max:1,step:1,default:0},{key:"threshold",label:"Threshold",min:0,max:1,step:.01,default:.35},{key:"softness",label:"Softness",min:.01,max:.5,step:.01,default:.12},{key:"sourceMode",label:"Clip (0=Index, 1=Static)",min:0,max:1,step:1,default:0},{key:"videoIndex",label:"Clip index",min:1,max:50,step:1,default:1},{key:"playbackSpeed",label:V.speed,min:.1,max:4,step:.1,default:1.25,tier:"advanced"}]},{category:"Composite & texture",key:"lumaDust",label:"Luma Dust",icon:ee.Wind,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"stick",label:"Hold",min:0,max:1,step:.01,default:.65},{key:"detach",label:"Leave",min:0,max:1,step:.01,default:.26},{key:"burst",label:"Burst",min:0,max:1,step:.01,default:.58},{key:"turbulence",label:"Turbulence",min:0,max:1,step:.01,default:.48},{key:"spectral",label:"Spectral",min:0,max:1,step:.01,default:.52},{key:"size",label:"Size",min:.4,max:1.8,step:.01,default:1},{key:"brightness",label:"Brightness",min:0,max:1,step:.01,default:.68},{key:"density",label:V.density,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"quality",label:"Quality",min:0,max:1,step:.01,default:.55,tier:"advanced"},{key:"trail",label:"Trail",min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Composite & texture",key:"lumaLock",label:"Luma Lock",icon:ee.Crosshair,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"count",label:"Targets",min:1,max:5,step:1,default:3},{key:"threshold",label:"Brightness",min:0,max:1,step:.01,default:.42},{key:"smooth",label:"Smooth",min:0,max:1,step:.01,default:.76},{key:"size",label:"Size",min:.4,max:2.2,step:.01,default:1},{key:"links",label:"Links",min:0,max:1,step:.01,default:.7},{key:"color",label:"Box",kind:"color",default:"#ff2a2a"},{key:"labelColor",label:"Coords",kind:"color",default:"#ffb020",tier:"advanced"}]},{category:"Composite & texture",key:"metalSphere",label:"Metal Sphere",icon:ee.Globe,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"envMap",label:"Env (0=Static, 1=Play)",min:0,max:1,step:1,default:0},{key:"size",label:"Size",min:.35,max:2,step:.01,default:1},{key:"noise",label:"Displacement",min:0,max:1,step:.01,default:.42},{key:"detail",label:"Noise scale",min:1,max:8,step:.1,default:3.5},{key:"speed",label:V.speed,min:0,max:3,step:.05,default:.75},{key:"roughness",label:"Roughness",min:.02,max:1,step:.01,default:.1},{key:"reflection",label:"Reflection",min:0,max:2,step:.01,default:1.05},{key:"rotation",label:"Orbit",min:0,max:2,step:.01,default:.35,tier:"advanced"}]},{category:"Warp & pattern",key:"liquix",label:"Liquix",icon:ee.Blend,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"bands",label:V.density,min:8,max:120,step:1,default:56},{key:"speed",label:V.speed,min:0,max:3,step:.05,default:1.28},{key:"pivot",label:"Wet edge (X)",min:.05,max:.95,step:.01,default:.48,tier:"advanced"}]},{category:"Warp & pattern",key:"mirrorStripes",label:"Mirror Stripes",icon:ee.AlignJustify,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"mirror",label:"Mirror (0=Off, 1=On)",min:0,max:1,step:1,default:1,choices:[0,1]},{key:"scale",label:"Container",min:0,max:1,step:.01,default:.82},{key:"spread",label:"Spread",min:0,max:1,step:.01,default:.48},{key:"density",label:V.density,min:0,max:1,step:.01,default:.55},{key:"thickness",label:"Weight",min:0,max:1,step:.01,default:.55},{key:"layers",label:"Depth layers",min:1,max:8,step:1,default:4,choices:[1,2,4,8]},{key:"rotate",label:"Rotate",min:0,max:1,step:.01,default:0},{key:"randomness",label:"Randomness",min:0,max:1,step:.01,default:.35},{key:"color",label:"Color",kind:"color",default:"#ff1a1a"}]},{category:"Color & grade",key:"negative",label:"Negative",icon:ee.Moon,min:0,max:1,step:.05,baseLabel:V.amount},{category:"Composite & texture",key:"noise",label:"Noise",icon:ee.Sparkles,min:0,max:1,step:.01,baseLabel:V.amount,hint:"Animated TV static layered on top \u2014 blend modes and coarse cells. Use for snow / interference; not for posterizing the image.",extraParams:[Dn(3),{key:"speed",label:V.speed,min:0,max:3,step:.05,default:.15},{key:"scale",label:"Grid cells",min:32,max:4096,step:1,default:1681,tier:"advanced"}]},{category:"Color & grade",key:"vignette",label:"Vignette",icon:ee.Aperture,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"radius",label:V.radius,min:.1,max:1,step:.01,default:.75},{key:"softness",label:V.softness,min:0,max:1,step:.01,default:.35},{key:"blur",label:"Edge blur",min:0,max:1,step:.01,default:0}]},{category:"Warp & pattern",key:"normalMap",label:"Normal Map",icon:ee.Box,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"source",label:"Source (0=Voronoi, 1=Bump)",min:0,max:1,step:1,default:1},{key:"scale",label:V.density,min:2,max:48,step:1,default:12},{key:"refraction",label:"Refraction",min:0,max:1,step:.01,default:.55},{key:"lighting",label:"Lighting",min:0,max:1,step:.01,default:.45},{key:"specular",label:"Specular",min:0,max:1,step:.01,default:.4},{key:"detail",label:"Bump depth",min:.1,max:2,step:.05,default:1.05},{key:"lightX",label:"Light X",min:0,max:1,step:.01,default:.65,tier:"advanced"},{key:"lightY",label:"Light Y",min:0,max:1,step:.01,default:.35,tier:"advanced"}]},{category:"Warp & pattern",key:"oscilloscope",label:"Oscilloscope",icon:ee.Radio,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:2,multiplierStep:.05,extraParams:[{key:"mode",label:"Trail (0=Lines, 1=Fill, 2=Beam)",min:0,max:2,step:1,default:0},{key:"persistence",label:"Phosphor",min:.15,max:.95,step:.01,default:.72},{key:"scale",label:"Amplitude",min:.1,max:.72,step:.01,default:.55},{key:"positionY",label:"Print Y",min:.55,max:.96,step:.01,default:.88},{key:"colorLo",label:"Color low",kind:"color",default:"#1c3cff"},{key:"colorMid",label:"Color mid",kind:"color",default:"#ff9a1a"},{key:"colorHi",label:"Color high",kind:"color",default:"#fff6c8"},{key:"glow",label:"Glow",min:0,max:1,step:.01,default:.55,tier:"advanced"}]},{category:"Warp & pattern",key:"patternLayer",label:"Pattern",icon:ee.Snowflake,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[{key:"type",label:"Family (0=Noise, 1=Cells, 2=Tiles, 3=Polar, 4=Turing, 5=Geometry)",min:0,max:5,step:1,default:1},{key:"geometry",label:"Geometry (0=Classic, 1=Interweave V3, 2=Tight, 3=Classic Low Lat., 4=Interweave Low Lat., 5=Imprint Smooth, 6=Imprint Crystal, 7=Enharmonic, 8=Interweave V2, 9=Fusion, 10=Sonance)",min:0,max:10,step:1,default:0,choices:[0,1,2,3,4,5,6,7,8,9,10]},{key:"variant",label:"Look (0=Coral, 1=Labyrinth, 2=Ring, 3=Flow)",min:0,max:3,step:1,default:2},Dn(0),{key:"scale",label:"Density",min:.25,max:4,step:.05,default:1},{key:"speed",label:V.speed,min:0,max:2,step:.05,default:.4},{key:"colorA",label:"Low",kind:"color",default:"#0b1020"},{key:"colorB",label:"High",kind:"color",default:"#22d3ee"},{key:"warp",label:"Warp",min:0,max:1,step:.02,default:0,tier:"advanced"},{key:"symmetry",label:"Symmetry (0=Off, 1=Mirror, 2=Inkblot, 3=Kaleid-3)",min:0,max:3,step:1,default:2,tier:"advanced"},{key:"seedSize",label:"Seed density",min:.08,max:.55,step:.01,default:.18,tier:"advanced"},{key:"gap",label:"Gap",min:0,max:1,step:.02,default:.35,tier:"advanced"},{key:"reset",label:"Reset seed",kind:"action",tier:"advanced"}]},{category:"Warp & pattern",key:"plasma",label:"Plasma",icon:ee.Zap,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[Dn(0),{key:"speed",label:V.speed,min:0,max:3,step:.05,default:1.1},{key:"scale",label:"Zoom",min:.25,max:2,step:.05,default:1},{key:"complexity",label:"Detail",min:.35,max:2,step:.05,default:1,tier:"advanced"}]},{category:"Warp & pattern",key:"plexus",label:"Plexus",icon:ee.Share2,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[Dn(2),{key:"speed",label:V.speed,min:0,max:3,step:.05,default:1},{key:"points",label:"Point density",min:1.05,max:2.2,step:.05,default:1.5},{key:"intensity",label:"Line intensity",min:0,max:2,step:.05,default:1},{key:"layers",label:"Depth layers",min:1,max:8,step:1,default:4,choices:[1,2,4,8]},{key:"glow",label:"Sparkle",min:0,max:2.4,step:.05,default:1.2,tier:"advanced"}]},{category:"Warp & pattern",key:"superformula",label:"Superformula",icon:ee.Aperture,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[{key:"look",label:"Look (0=Form, 1=Wire, 2=Cloud)",min:0,max:2,step:1,default:2},Dn(2),{key:"m",label:"Lobes",min:1,max:16,step:.05,default:7.6},{key:"n1",label:"Pinch",min:.12,max:2.5,step:.01,default:.36},{key:"n2",label:"Squareness",min:.2,max:8,step:.02,default:2.16},{key:"size",label:"Size",min:.12,max:1.4,step:.01,default:.48},{key:"speed",label:V.speed,min:0,max:2,step:.05,default:.35},{key:"color",label:"Color",kind:"color",default:"#c4b5fd"},{key:"glow",label:"Glow",min:.2,max:2.4,step:.05,default:1.2,tier:"advanced"}]},{category:"Warp & pattern",key:"universeWithin",label:"Universe Within",icon:ee.Orbit,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[Dn(2),{key:"speed",label:V.speed,min:0,max:3,step:.05,default:1},{key:"zoom",label:"Fractal zoom",min:1.05,max:2.2,step:.05,default:1.5},{key:"layers",label:"Layers (1/2/4/8)",min:1,max:8,step:1,default:4,choices:[1,2,4,8]},{key:"glow",label:"Glow",min:.6,max:2.4,step:.05,default:1.2,tier:"advanced"}]},{category:"Composite & texture",key:"pixelate",label:"Pixelate",icon:ee.Grid3x3,min:4,max:512,step:1,baseLabel:"Cells across"},{category:"Composite & texture",key:"shapeLayer",label:"Shape Layer",icon:ee.Shapes,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"shape",label:"Shape (0=Circle, 1=Square, 2=Triangle, 3=Hexagon, 4=Star)",min:0,max:4,step:1,default:0},Dn(4),{key:"size",label:"Size",min:.05,max:1.6,step:.01,default:.45},{key:"stroke",label:"Stroke",min:0,max:1,step:.01,default:.15},{key:"fill",label:"Fill (0=Outline, 1=Filled)",min:0,max:1,step:1,default:0,choices:[0,1]},{key:"roundness",label:"Roundness",min:0,max:1,step:.01,default:0},{key:"rotate",label:"Rotate",min:0,max:1,step:.01,default:0},{key:"color",label:"Color",kind:"color",default:"#ffffff"},{key:"centerX",label:V.centerX,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerY",label:V.centerY,min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Composite & texture",key:"string",label:"String",icon:ee.Spline,min:0,max:1,step:.01,baseLabel:"Tension",multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.2,multiplierStep:.05,extraParams:[{key:"orientation",label:"Span (0=Horizontal, 1=Vertical)",min:0,max:1,step:1,default:0,choices:[0,1]},{key:"position",label:"Position",min:.08,max:.92,step:.01,default:.5},{key:"thickness",label:"Thickness",min:0,max:1,step:.01,default:.42},{key:"color",label:"Color",kind:"color",default:"#f6edd4"},{key:"glow",label:"Glow",min:0,max:1,step:.01,default:.68},{key:"harmonics",label:"Partials",min:1,max:3,step:1,default:2,tier:"advanced"}]},{category:"Composite & texture",key:"resynthesize",label:"Resynthesize",icon:ee.Dna,min:0,max:.98,step:.01,baseLabel:"Feedback",multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"x",label:"Morph X",min:0,max:1,step:.01,default:.5},{key:"y",label:"Morph Y",min:0,max:1,step:.01,default:.78},{key:"hue",label:"Hue drift",min:0,max:1,step:.01,default:.25},{key:"decay",label:"Decay",min:0,max:1,step:.01,default:.3,tier:"advanced"}]},{category:"Glitch",key:"pixelSort",label:"Pixel Sort",icon:ee.ArrowDownUp,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"threshold",label:"Threshold",min:.05,max:.95,step:.01,default:.45},{key:"reach",label:"Length",min:.05,max:1,step:.01,default:.4},{key:"chaos",label:"Chaos",min:0,max:1,step:.01,default:.7},{key:"direction",label:"0=down 1=up 2=right 3=left",min:0,max:3,step:1,default:0}]},{category:"Warp & pattern",key:"pointCloud",label:"Point Cloud",icon:ee.CircleDot,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"cols",label:V.density,min:4,max:194,step:1,default:32},{key:"depth",label:"Scatter",min:0,max:1.5,step:.01,default:.58},{key:"parallax",label:"Parallax",min:0,max:1.5,step:.01,default:.78},{key:"blur",label:"Defocus",min:0,max:1,step:.01,default:.5},{key:"fog",label:"Haze",min:0,max:1,step:.01,default:.4},{key:"minSize",label:"Min size",min:0,max:1,step:.01,default:.12,tier:"advanced"},{key:"maxSize",label:"Max size",min:0,max:1,step:.01,default:.85,tier:"advanced"}]},{category:"Warp & pattern",key:"pulseMarch",label:"Pulse March",icon:ee.Orbit,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"morph",label:"Morph",min:0,max:1,step:.01,default:.55},{key:"speed",label:V.speed,min:0,max:3,step:.05,default:1.1},{key:"detail",label:"Surface ripples",min:1,max:12,step:.1,default:4.5},{key:"glow",label:"Rim glow",min:0,max:1,step:.01,default:.65,tier:"advanced"}]},{category:"Warp & pattern",key:"lumaGridSquares",label:"Luma Grid Dots",icon:ee.Grid,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"cols",label:"Columns",min:4,max:194,step:1,default:32},{key:"minSize",label:"Min size",min:0,max:1,step:.01,default:.14,tier:"advanced"},{key:"maxSize",label:"Max size",min:0,max:1,step:.01,default:.88,tier:"advanced"}]},{category:"Glitch",key:"circleGlitch",label:"Pulse Rings",icon:ee.Target,min:0,max:.5,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:.1,multiplierMax:5,multiplierStep:.1,extraParams:[{key:"frequency",label:V.density,min:2,max:32,step:1,default:10},{key:"spread",label:"Spread",min:.05,max:1,step:.01,default:.2}]},{category:"Color & grade",key:"paletteRecolor",label:"Palette Recolor",icon:ee.Pipette,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"mode",label:"Map (0=Ramp, 1=Nearest)",min:0,max:1,step:1,default:0},{key:"colors",label:"Colors (2=Duo, 3=Tri, 4=Quad)",min:2,max:4,step:1,default:3},{key:"boost",label:"Punch",min:0,max:1,step:.01,default:.35}]},{category:"Color & grade",key:"rampGradient",label:"Ramp Gradient",icon:ee.Sunset,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[...yh(),{key:"animate",label:"Anim (0=Off, 1=Cycle)",min:0,max:1,step:1,default:0},{key:"speed",label:V.speed,min:0,max:2,step:.05,default:.45}]},{category:"Glitch",key:"rgbDelay",label:"RGB Delay",icon:ee.Layers,min:0,max:1,step:.01,baseLabel:V.amount},{category:"Transform & space",key:"rotate",label:"Rotate",icon:ee.RotateCw,min:-3.14,max:3.14,step:.01,baseLabel:"Angle"},{category:"Warp & pattern",key:"warpTunnel",label:"Warp Tunnel",icon:ee.Waves,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.05,extraParams:[{key:"speed",label:V.speed,min:0,max:3,step:.05,default:.55},{key:"refraction",label:"Refraction",min:0,max:1,step:.01,default:.72},{key:"shine",label:"Wave shine",min:0,max:1,step:.01,default:.68},{key:"arms",label:"Spiral arms",min:1,max:6,step:1,default:3,slider:!0},{key:"fog",label:"Depth fog",min:0,max:1,step:.01,default:.62,tier:"advanced"}]},{category:"Warp & pattern",key:"wetLens",label:"Wet Lens",icon:ee.Droplets,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"density",label:V.density,min:6,max:40,step:1,default:18},{key:"speed",label:V.speed,min:0,max:1.2,step:.02,default:.26},{key:"refraction",label:"Refraction",min:0,max:1,step:.01,default:.76},{key:"highlights",label:"Specular",min:0,max:1,step:.01,default:.42},{key:"gravity",label:"Gravity",min:0,max:1,step:.01,default:.74,tier:"advanced"}]},{category:"Warp & pattern",key:"wrap",label:"Wrap",icon:ee.CircleDot,min:-1,max:1,step:.01,baseLabel:"Pull / push",multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"twist",label:"Twist",min:-1,max:1,step:.01,default:0},{key:"radius",label:V.radius,min:.15,max:1,step:.01,default:.75},{key:"falloff",label:"Falloff",min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerX",label:V.centerX,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerY",label:V.centerY,min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Transform & space",key:"scroll",label:"Scroll",icon:ee.Move,min:0,max:1,step:.01,baseLabel:"Scroll X",extraParams:[{key:"y",label:"Scroll Y",min:0,max:1,step:.01,default:0}]},{category:"Transform & space",key:"shake",label:"Shake",icon:ee.Video,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"speed",label:V.speed,min:.15,max:2.5,step:.05,default:1},{key:"bounce",label:"Bounce",min:0,max:1,step:.01,default:.55},{key:"roll",label:"Roll",min:0,max:1,step:.01,default:.4},{key:"zoom",label:"Punch-in",min:0,max:1,step:.01,default:.45,tier:"advanced"}]},{category:"Transform & space",key:"mirror",label:"Mirror",icon:ee.FlipHorizontal,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"axis",label:"Axis (0=X, 1=Y, 2=XY, 3=Free)",min:0,max:3,step:1,default:0},{key:"angle",label:"Free angle",min:0,max:1,step:.01,default:0},{key:"flip",label:"Keep half (0=A, 1=B)",min:0,max:1,step:1,default:0,choices:[0,1],tier:"advanced"},{key:"centerX",label:V.centerX,min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"centerY",label:V.centerY,min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Transform & space",key:"tile",label:"Tile",icon:ee.LayoutGrid,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"cols",label:"Columns",min:1,max:12,step:1,default:3},{key:"rows",label:"Rows",min:1,max:12,step:1,default:3}]},{category:"Transform & space",key:"vibration",label:"Vibration",icon:ee.Vibrate,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"frequency",label:"Rate (Hz)",min:2,max:48,step:1,default:12},{key:"tail",label:"Sustain",min:0,max:1,step:.01,default:.82,tier:"advanced"}]},{category:"Composite & texture",key:"mask",label:"Mask",icon:ee.Layers,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"shape",label:"Shape (0=Lines, 1=Circle, 2=Square, 3=Noise, 4=Perspective)",min:0,max:4,step:1,default:0},{key:"mode",label:"Blend (0=Mask, 1=Diff, 2=Add, 3=Mult)",min:0,max:3,step:1,default:0},{key:"frequency",label:V.density,min:0,max:40,step:1,default:20,tier:"advanced"},{key:"speed",label:V.speed,min:0,max:4,step:.05,default:.2,tier:"advanced"},{key:"rotation",label:"Rotation",min:0,max:3.14,step:.01,default:0,tier:"advanced"},{key:"balance",label:"Width",min:0,max:1,step:.01,default:.5,tier:"advanced"},{key:"perspective",label:"Perspective",min:0,max:1,step:.01,default:.75,tier:"advanced"},{key:"focus",label:"Focus X",min:0,max:1,step:.01,default:1,tier:"advanced"}]},{category:"Warp & pattern",key:"lumaLines",label:"Luma Lines",icon:ee.AlignJustify,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"cols",label:V.density,min:4,max:100,step:1,default:52},{key:"minWidth",label:"Min width",min:0,max:1,step:.01,default:.1,tier:"advanced"},{key:"maxWidth",label:"Max width",min:0,max:1,step:.01,default:.8,tier:"advanced"},{key:"rotation",label:"Rotation",min:0,max:3.14,step:.01,default:0,tier:"advanced"}]},{category:"Warp & pattern",key:"lumaPrint",label:"Luma Print",icon:ee.Grid,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"mode",label:"Mode (0=Stipple, 1=Mosaic, 2=Icons, 3=Lines, 4=Radial)",min:0,max:4,step:1,default:0},{key:"iconSet",label:"Icons (0=Geo, 1=Line, 2=Arc, 3=Classic)",min:0,max:3,step:1,default:0},{key:"density",label:V.density,min:4,max:194,step:1,default:32},{key:"contrast",label:"Contrast",min:0,max:1,step:.01,default:.5},{key:"wave",label:"Wave",min:0,max:1,step:.01,default:.35},{key:"shape",label:"Radial (0=Circle 1=Diamond)",min:0,max:1,step:1,default:0,tier:"advanced"},{key:"rotation",label:"Rotation",min:0,max:3.14,step:.01,default:0,tier:"advanced"}]},{category:"Warp & pattern",key:"topoContour",label:"Topo Contour",icon:ee.Waves,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[Dn(0),{key:"scale",label:V.density,min:.25,max:3,step:.05,default:1},{key:"lines",label:"Lines",min:2,max:24,step:1,default:10},{key:"speed",label:V.speed,min:0,max:3,step:.05,default:1},{key:"palette",label:"0=Rainbow 1=Mono",min:0,max:1,step:1,default:0},{key:"valley",label:"Valley fill",min:0,max:1,step:.01,default:.12,tier:"advanced"},{key:"lineWidth",label:"Line width",min:.35,max:2.5,step:.05,default:1,tier:"advanced"},{key:"videoTint",label:"Video tint",min:0,max:1,step:.01,default:.35,tier:"advanced"}]},{category:"Warp & pattern",key:"neonGrid",label:"Neon Grid",icon:ee.Grid,extraParams:[{key:"spawn",label:"Lines per hit",min:1,max:12,step:1,default:4},{key:"horizontal",label:"Horizontal mix",min:0,max:1,step:.05,default:1},{key:"vertical",label:"Vertical mix",min:0,max:1,step:.05,default:1},{key:"thickness",label:"Thickness",min:.005,max:.35,step:.005,default:.08},{key:"decay",label:"Fade speed",min:.3,max:4,step:.05,default:1.25},{key:"horizontalColor",label:"Horizontal",kind:"color",default:"#ff3cb4"},{key:"verticalColor",label:"Vertical",kind:"color",default:"#50dcff"},{key:"crossColor",label:"Cross flare",kind:"color",default:"#ffffff",tier:"advanced"},{key:"intersect",label:"Flare strength",min:0,max:3,step:.05,default:1.6,tier:"advanced"}]},{category:"Glitch",key:"midlineStretch",label:"Midline Stretch",icon:ee.MoveVertical,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"splitY",label:"Split Y",min:.05,max:.95,step:.01,default:.5}]},{category:"Playback",key:"accelerate",label:"Accelerate",icon:ee.FastForward,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"duration",label:"Duration (sec)",min:.05,max:1,step:.05,default:.5},{key:"maxSpeed",label:"Peak speed",min:1.1,max:6,step:.1,default:2.5,tier:"advanced"}]},{category:"Playback",key:"slowmo",label:"Slowmo",icon:ee.Clock,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"duration",label:"Duration (sec)",min:.05,max:1,step:.05,default:.5},{key:"motionBlur",label:"Frame trail",min:0,max:1,step:.01,default:.65},{key:"minSpeed",label:"Floor speed",min:.02,max:1,step:.01,default:.2,tier:"advanced"}]},{category:"Playback",key:"stutterBack",label:"Stutter Back",icon:ee.SkipBack,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"backFrames",label:"Rewind frames",min:1,max:48,step:1,default:6}]},{category:"Playback",key:"timeGlitch",label:"Video Time Slice",icon:ee.Clock,min:0,max:1,step:.01,baseLabel:V.amount,extraParams:[{key:"cols",label:"Divisions",min:10,max:40,step:1,default:16},{key:"frameOffset",label:"Frame offset",min:1,max:24,step:1,default:2},{key:"origin",label:"Origin (0=Left/Top, 1=Middle, 2=Right/Bottom)",min:0,max:2,step:1,default:1},{key:"direction",label:"0=Vertical 1=Horizontal",min:0,max:1,step:1,default:0},{key:"mode",label:"0=Slices 1=Squares",min:0,max:1,step:1,default:0}]},{category:"Glitch",key:"vhs",label:"VHS",icon:ee.Radio,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1.5,multiplierStep:.01,extraParams:[{key:"tracking",label:"Tracking",min:0,max:1,step:.01,default:.48},{key:"noise",label:"Tape noise",min:0,max:1,step:.01,default:.38},{key:"bleed",label:"Chroma bleed",min:0,max:1,step:.01,default:.42},{key:"lines",label:"Scan lines",min:0,max:1,step:.01,default:.52},{key:"dropout",label:"Dropout",min:0,max:1,step:.01,default:.28},{key:"speed",label:V.speed,min:0,max:4,step:.05,default:1,tier:"advanced"}]},{category:"Glitch",key:"maskVideo",label:"Video Window",icon:ee.PictureInPicture2,extraParams:[{key:"size",label:"Size",min:.06,max:.55,step:.01,default:.22},{key:"shuffle",label:"Shuffle rate",min:0,max:4,step:.05,default:.35}]},{category:"Transform & space",key:"zoom",label:"Zoom",icon:ee.ZoomIn,min:.5,max:2,step:.01,baseLabel:"Scale"},{category:"Composite & texture",key:"textLayer",label:"Text Layer",icon:ee.Type,min:0,max:1,step:.01,baseLabel:V.amount,multiplierLabel:V.audioDepth,multiplierMin:0,multiplierMax:1,multiplierStep:.01,extraParams:[{key:"message",label:"Message",kind:"text",default:"YOUR MESSAGE"},{key:"size",label:"Size",min:.03,max:.2,step:.005,default:.085},{key:"positionX",label:V.centerX,min:.05,max:.95,step:.01,default:.5},{key:"positionY",label:V.centerY,min:.08,max:.92,step:.01,default:.82},{key:"align",label:"Align (0=Left, 1=Center, 2=Right)",min:0,max:2,step:1,default:1},{key:"font",label:"Font (0=Sans, 1=Mono, 2=Display, 3=Serif, 4=UI trial)",min:0,max:4,step:1,default:0},{key:"weight",label:"Weight (0=Regular, 1=Bold)",min:0,max:1,step:1,default:1},{key:"tracking",label:"Tracking",min:-.04,max:.18,step:.01,default:.02},{key:"color",label:"Color",kind:"color",default:"#ffffff"},{key:"anim",label:"Anim (0=None, 1=Fade, 2=Rise, 3=Type, 4=Pulse, 5=Glitch)",min:0,max:5,step:1,default:0},{key:"animSpeed",label:"Anim speed",min:.2,max:2.5,step:.05,default:.85},{key:"glow",label:"Glow",min:0,max:1,step:.01,default:.35,tier:"advanced"},{key:"shadow",label:"Shadow",min:0,max:1,step:.01,default:.5,tier:"advanced"}]},{category:"Composite & texture",key:"triggerDebug",label:"Trigger Debug",icon:ee.CircleDot,min:0,max:1,step:.01,baseLabel:"Opacity",extraParams:[{key:"beatWindow",label:"Beat window",min:8,max:32,step:1,default:16,tier:"advanced"}]}],KM=Xn.filter(e=>e.category==="Playback").map(e=>e.key),QM=new Set(KM);function Hl(e){return QM.has(e)}u();u();u();u();var Ta="smooth";function yf(e){return e<=0?0:e>=1?1:e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function Fh(e,t){let r=Math.max(0,Math.min(1,t));switch(e){case"linear":return 1-r;case"quad":return(1-r)*(1-r);case"cubic":return Math.pow(1-r,3);case"cosine":return Math.cos(Math.PI/2*r);case"expo":return r>=1?0:Math.pow(2,-12*r);default:return 1-yf(r)}}function ui(e,t,r,n,o){let i=Math.max(0,o),s=n>0?n:1/Math.max(i,.05);return Math.max(.08,e+t+r+s)*1.05}var dr={attack:0,hold:0,release:0,decay:20,easeShape:Ta};var Se={triggerThreshold:.5,triggerCount:1,delay:0,decay:dr.decay,triggerAttack:dr.attack,triggerRelease:dr.release,triggerHold:dr.hold,triggerEaseOutShape:Ta},Nl={triggerThreshold:0,triggerCount:1};function xf(e){return!e.isTrigger||e.envelopeRef===null?e:{...e,envelopeRef:e.envelopeRef&&e.envelopeRef!==null?e.envelopeRef:"eg:1",triggerThreshold:e.triggerThreshold??Nl.triggerThreshold,triggerCount:e.triggerCount??Nl.triggerCount,delay:e.delay??Se.delay,decay:e.decay??Se.decay,triggerAttack:e.triggerAttack??Se.triggerAttack,triggerRelease:e.triggerRelease??Se.triggerRelease,triggerHold:e.triggerHold??Se.triggerHold,triggerEaseOutShape:e.triggerEaseOutShape??Se.triggerEaseOutShape}}var ZM=new Map([...io,...Xn].map(e=>[e.key,e])),JM={noise:.6,glow:.55,lens7c:.62},eL=new Set(["circleGlitch","neonGrid","electricNoise","stutterBack","jumpCut","clipPeek","zap","boomerang","slowmo","accelerate","string"]);function tL(e,t){let r=ps(e);return{syncBand:t.syncBand,syncMultiplier:t.syncMultiplier,isTrigger:t.isTrigger??!1,triggerThreshold:t.triggerThreshold??Se.triggerThreshold,triggerCount:t.triggerCount??Se.triggerCount,envelopeRef:r?t.envelopeRef??void 0:t.envelopeRef??null,triggerAttack:t.triggerAttack??Se.triggerAttack,triggerRelease:t.triggerRelease??Se.triggerRelease}}function rL(e,t){let r={...e??{}};if(t?.length)for(let n of t)!n||typeof n!="object"||!("key"in n)||"default"in n&&n.default!==void 0&&(r[n.key]=n.default);return Object.keys(r).length?r:void 0}function nL(e,t){return!e||e.min!==0||e.max==null||e.baseLabel!==V.amount?t:e.max===1?1:t>0?Math.min(t,e.max):Math.min(e.max,1)}function vf(e,t,r=t.enabled){let n=ZM.get(String(e)),{paramSync:o,enabled:i,syncBand:s,syncMultiplier:l,isTrigger:p,triggerThreshold:d,triggerCount:v,delay:H,decay:D,triggerAttack:O,triggerRelease:K,triggerHold:Y,triggerEaseOutShape:fe,...Ee}=t,be=eL.has(String(e)),Fe=JM[String(e)];return{...Ee,enabled:r,base:be?t.base:Fe??nL(n,t.base),params:rL(t.params,n?.extraParams),syncBand:"none",syncMultiplier:0,isTrigger:!1,...Se,...be?tL(String(e),t):{},...Ph(String(e))&&o?{paramSync:o}:{}}}var Oh={enabled:!1,base:.3,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{y:0}},Zo={videoSpeed:{enabled:!0,base:1.25,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},pulse:{enabled:!1,base:.55,syncBand:"low",syncMultiplier:.45,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{breath:.5,bloom:.45}},accelerate:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{duration:.5,maxSpeed:2.5}},slowmo:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{duration:.5,motionBlur:.65,minSpeed:.2}},midlineStretch:{enabled:!1,base:.55,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{splitY:.5}},vignette:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{radius:.75,softness:.35,blur:0}},vhs:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{tracking:.48,noise:.38,bleed:.42,lines:.52,dropout:.28,speed:1}},zoom:{enabled:!1,base:1,syncBand:"low",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},scroll:{...Oh},wrap:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{twist:0,centerX:.5,centerY:.5,radius:.75,falloff:.5}},mirror:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{axis:0,angle:0,flip:0,centerX:.5,centerY:.5}},mirrorStripes:{enabled:!1,base:.92,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mirror:1,scale:.82,spread:.48,density:.55,thickness:.55,layers:4,rotate:0,randomness:.35,color:"#ff1a1a"}},tile:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{cols:3,rows:3}},vibration:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{frequency:14,tail:.78}},shake:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{speed:1,bounce:.55,roll:.4,zoom:.45}},rotate:{enabled:!1,base:.45,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},colorAdjust:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{contrast:1,hue:0,saturation:1,hueRev:2}},colorLayer:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{contrast:1,hue:0,saturation:1}},answerPrint:{enabled:!1,base:.85,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{stock:0,density:1}},glitch:{enabled:!1,base:4,syncBand:"high",syncMultiplier:.38,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{size:5,speed:1.15,travel:1,tear:1}},timeGlitch:{enabled:!1,base:0,syncBand:"mid",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{cols:16,frameOffset:2,origin:1,direction:0,mode:0}},oscilloscope:{enabled:!1,base:.62,syncBand:"master",syncMultiplier:.52,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,persistence:.72,scale:.55,positionY:.88,colorLo:"#1c3cff",colorMid:"#ff9a1a",colorHi:"#fff6c8",glow:.55}},cymatic:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{frequency:12}},circleGlitch:{enabled:!1,base:0,syncBand:"high",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{frequency:10,spread:.2}},rgbDelay:{enabled:!1,base:0,syncBand:"mid",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},chromaticAberration:{enabled:!1,base:0,syncBand:"high",syncMultiplier:.28,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{direction:.125}},degauss:{enabled:!1,base:0,syncBand:"kick",syncMultiplier:.72,isTrigger:!0,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{frequency:12,speed:1.4,tail:.82,fringe:.55}},concentricRotate:{enabled:!1,base:.35,syncBand:"mid",syncMultiplier:.4,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,rings:7,step:.08,speed:.25,centerX:.5,centerY:.5}},centerDiffuse:{enabled:!1,base:.75,syncBand:"none",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{band:.06,diffusion:.72,centerY:.5}},dataDrip:{enabled:!1,base:0,syncBand:"mid",syncMultiplier:.38,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{columns:72,dance:.65,chaos:.35,speed:1}},distortion:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,curvature:1,frequency:10,speed:1.2,centerFocus:1.4,styleRev:2}},encodeGlitch:{enabled:!1,base:.28,syncBand:"high",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{macroBlock:.5,tear:.35}},edge:{enabled:!1,base:.5,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{threshold:.32,thickness:.35,soften:.25,strength:1}},dither:{enabled:!1,base:.55,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{binary:0,balance:.5,scale:4}},blur:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0}},emberHeat:{enabled:!1,base:.72,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{waves:.76,intensity:.78,speed:.8,density:22,glow:.82}},sharpen:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{radius:1}},shatterLayer:{enabled:!1,base:.72,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,density:14,gap:.065,scatter:.62,irregularity:.82,videoIndex:2}},boomerang:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{segmentSec:1.25,maxFrames:60,captureFps:24}},hdr:{enabled:!1,base:.7,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{blackFloor:.08,highlights:.85,knee:.5}},ghostFlow:{enabled:!1,base:.42,syncBand:"low",syncMultiplier:.4,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{melt:.62,flowScale:.48,refresh:0,chromaBleed:.35}},glow:{enabled:!1,base:.28,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{threshold:.48,bloom:.55}},kaleid:{enabled:!1,base:6,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{angle:0,videoZoom:1,videoX:0,videoY:0}},negative:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},feedback:{enabled:!1,base:.9,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{balance:.5,scale:1}},fillLayer:{enabled:!1,base:.48,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{type:1,sweep:0,mode:0,colorA:"#7c3aed",colorB:"#06b6d4",softness:.35}},flash:{enabled:!1,base:0,syncBand:"high",syncMultiplier:.5,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},hitStreak:{enabled:!1,base:.55,syncBand:"beat",syncMultiplier:.38,isTrigger:!0,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{length:.58,mode:0,threshold:.6,decay:.72}},lens7c:{enabled:!1,base:.35,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{spread:.55,rotation:0,threshold:.42,haze:.5}},fadeOff:{enabled:!1,base:.9,syncBand:"master",syncMultiplier:.1,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},layerBlend:{enabled:!1,base:.5,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,sourceMode:0,videoIndex:1,videoPath:"",playbackSpeed:1.25}},videoMap:{enabled:!1,base:.65,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,invert:0,threshold:.35,softness:.12,sourceMode:0,videoIndex:1,videoPath:"",playbackSpeed:1.25}},liquix:{enabled:!1,base:.14,syncBand:"low",syncMultiplier:.34,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{pivot:.48,bands:56,speed:1.28}},transition:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{type:0,duration:1}},autoMix:{enabled:!1,base:12,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{advanceMode:"random",advanceWhen:"time"}},noise:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{scale:1681,speed:.15,mode:3}},jumpCut:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{skipFrames:2,jumpCuts:1}},clipPeek:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{holdSec:.35,steps:1}},zap:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{clipCount:3,framesPerClip:4}},playbackCue:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:1,params:{eventCount:2,holdSec:.35,clipMode1:0,clipMode2:0,clipMode3:0,clipMode4:0,clip1:1,frame1:48,clip2:2,frame2:0,clip3:3,frame3:0,clip4:4,frame4:0},paramSync:{frame1:{band:"kick",multiplier:0,isTrigger:!0,envelopeRef:null,triggerThreshold:.5,triggerCount:1},frame2:{band:"snare",multiplier:0,isTrigger:!0,envelopeRef:null,triggerThreshold:.5,triggerCount:1},frame3:{band:"high",multiplier:0,isTrigger:!0,envelopeRef:null,triggerThreshold:.5,triggerCount:1},frame4:{band:"beat",multiplier:0,isTrigger:!0,envelopeRef:null,triggerThreshold:.5,triggerCount:1}}},stutterBack:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{backFrames:6}},triggerDebug:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{beatWindow:16}},pixelate:{enabled:!1,base:64,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount},pixelSort:{enabled:!1,base:.85,syncBand:"none",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{threshold:.45,reach:.4,chaos:.7,direction:0}},lumaGridSquares:{enabled:!1,base:.88,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{cols:32,minSize:.14,maxSize:.88}},pointCloud:{enabled:!1,base:.85,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{cols:32,minSize:.12,maxSize:.85,depth:.58,parallax:.78,blur:.5,fog:.4}},rampGradient:{enabled:!1,base:.58,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{...xh(),animate:0,speed:.45}},reactionDiffusion:{enabled:!1,base:1,syncBand:"mid",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{source:.78,feed:.55,kill:.57,scale:12,emboss:.58,flow:.32,speed:.45,styleMap:.35}},ripple:{enabled:!1,base:0,syncBand:"mid",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{frequency:10,speed:1.2,decay:.55,centerX:.5,centerY:.5}},randomGallery:{enabled:!1,base:.75,syncBand:"mid",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{cells:7,speed:1,refraction:.82,drift:1}},gridShuffle:{enabled:!1,base:1,syncBand:"beat",syncMultiplier:0,isTrigger:!0,triggerThreshold:.5,triggerCount:1,params:{cells:4,chaos:1}},topoContour:{enabled:!1,base:.92,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,scale:1,lines:10,speed:1,palette:0,valley:.12,lineWidth:1,videoTint:.35}},throughTheStars:{enabled:!1,base:.75,syncBand:"low",syncMultiplier:.55,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{trail:.35,density:52,speed:1,glow:.72,fov:1,depth:.65,tint:"#00e8cc",centerX:.5,centerY:.5}},plasma:{enabled:!1,base:.85,syncBand:"master",syncMultiplier:.45,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,speed:1.1,scale:1,complexity:1}},paletteRecolor:{enabled:!1,base:.85,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,colors:3,boost:.35}},shapeLayer:{enabled:!1,base:.9,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{shape:0,mode:4,size:.45,roundness:0,stroke:.15,fill:0,rotate:0,color:"#ffffff",centerX:.5,centerY:.5}},string:{enabled:!1,base:.42,syncBand:"mid",syncMultiplier:.58,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{orientation:0,position:.5,thickness:.42,color:"#f6edd4",glow:.68,harmonics:2}},resynthesize:{enabled:!1,base:.85,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{x:.5,y:.78,hue:.25,decay:.3}},patternLayer:{enabled:!1,base:.55,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{type:1,geometry:0,variant:2,mode:0,scale:1,speed:.4,warp:0,symmetry:2,seedSize:.18,gap:.35,colorA:"#0b1020",colorB:"#22d3ee"}},electricNoise:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.45,triggerCount:1,envelopeRef:null,triggerAttack:.02,triggerRelease:.35,params:{amount:1,color:"#331a66",mode:2,speed:1,scale:1,noiseScale:1,turbulence:.2,detail:5,intensity:1.4,rings:.85,ringPower:.9}},plexus:{enabled:!1,base:.85,syncBand:"master",syncMultiplier:.45,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:2,speed:1,points:1.5,intensity:1,layers:4,glow:1.2}},superformula:{enabled:!1,base:.85,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{look:2,mode:2,m:7.6,n1:.36,n2:2.16,size:.48,speed:.35,glow:1.2,color:"#c4b5fd"}},universeWithin:{enabled:!1,base:.85,syncBand:"master",syncMultiplier:.45,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:2,speed:1,zoom:1.5,layers:4,glow:1.2}},fractalFold:{enabled:!1,base:.85,syncBand:"master",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:2,foldX:.86,foldY:1.04,zoom:1,speed:.6,spin:.42,depth:8,glow:1.4,hue:.12}},wetLens:{enabled:!1,base:.68,syncBand:"mid",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{density:18,speed:.26,refraction:.76,highlights:.42,gravity:.74}},mask:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{shape:0,mode:0,frequency:20,speed:.2,rotation:0,balance:.5,perspective:.75,focus:1}},maskVideo:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{size:.22,shuffle:.35}},metalSphere:{enabled:!1,base:.85,syncBand:"low",syncMultiplier:.4,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{envMap:0,size:1,noise:.42,detail:3.5,speed:.75,roughness:.1,reflection:1.05,rotation:.35}},pulseMarch:{enabled:!1,base:.85,syncBand:"low",syncMultiplier:.45,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{morph:.55,speed:1.1,detail:4.5,glow:.65}},warpTunnel:{enabled:!1,base:.8,syncBand:"master",syncMultiplier:.5,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{speed:.55,refraction:.72,shine:.68,arms:3,fog:.62}},lumaLines:{enabled:!1,base:1,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{cols:52,minWidth:.1,maxWidth:.8,rotation:0}},lumaDust:{enabled:!1,base:.8,syncBand:"mid",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{stick:.65,detach:.26,burst:.58,turbulence:.48,spectral:.52,size:1,brightness:.68,density:.5,quality:.55,trail:.5}},lumaLock:{enabled:!1,base:.92,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{count:3,threshold:.42,smooth:.76,size:1,links:.7,color:"#ff2a2a",labelColor:"#ffb020"}},lumaPrint:{enabled:!1,base:.9,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{mode:0,iconSet:0,density:32,contrast:.5,wave:.35,shape:0,rotation:0}},neonGrid:{enabled:!1,base:1,syncBand:"kick",syncMultiplier:0,isTrigger:!0,triggerThreshold:.45,triggerCount:1,envelopeRef:null,triggerAttack:.02,triggerRelease:.35,params:{spawn:4,horizontal:1,vertical:1,thickness:.08,decay:1.25,intersect:1.6,horizontalColor:"#ff3cb4",verticalColor:"#50dcff",crossColor:"#ffffff"}},normalMap:{enabled:!1,base:.62,syncBand:"mid",syncMultiplier:.35,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{source:1,scale:12,refraction:.55,lighting:.45,specular:.4,detail:1.05,lightX:.65,lightY:.35}},textLayer:{enabled:!1,base:.92,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.45,triggerCount:1,envelopeRef:null,triggerAttack:.02,triggerRelease:.55,params:{message:"YOUR MESSAGE",size:.085,positionX:.5,positionY:.82,align:1,font:0,weight:1,tracking:.02,color:"#ffffff",anim:0,animSpeed:.85,glow:.35,shadow:.5}},customShader:{enabled:!1,base:0,syncBand:"none",syncMultiplier:0,isTrigger:!1,triggerThreshold:.5,triggerCount:Se.triggerCount,params:{shaderType:0,code:fs}}},Ma=()=>{let e={};for(let t of Object.keys(Zo)){let r=Zo[t];So(t)?e[t]={...r,...Se}:e[t]=vf(t,r,r.enabled)}return e},Ih=["pulse"],Bh=()=>{let e=Ma();return e.pulse={...Zo.pulse,enabled:!0},e};function Dh(e){let t={...Ma(),...e.fx},r=Math.max(0,Math.min(e.clipIndex??0,e.clips.length-1));return{video:e.clips[r]??"",isVideoPlaying:!0,activeFxList:[...e.activeFxList??[]],...e.activeChain?{activeChain:e.activeChain}:{},...e.fxGroups?{fxGroups:e.fxGroups}:{},...e.layerInstances?{layerInstances:e.layerInstances}:{},fx:t}}u();u();u();function ie(){return window}function Hh(e){return(e??"none")!=="none"}function _f(e){return Hh(e.syncBand)?"time":e.params?.advanceWhen==="loop"?"loop":"time"}function oL(e){return Hh(e.syncBand)||e.isTrigger===!0}function Nh(e){return e?.enabled?oL(e)||_f(e)==="loop"?!0:(Number(e.base)||0)>0:!1}function Gh(){let e=ie(),t=[];for(let r of[e.s0,e.s1]){let n=r?.src;n instanceof HTMLVideoElement&&n.readyState>=HTMLMediaElement.HAVE_METADATA&&t.push(n)}return t.length===0?null:t.find(r=>!r.paused&&!r.ended)??t[0]}function Sf(){return{lastTime:-1,completedLoops:0}}function Wh(e,t,r){if(!e.loop)return!1;let n=e.duration;if(!Number.isFinite(n)||n<=0)return!1;let o=e.currentTime,i=Math.max(.05,1/30);return r.lastTime<0?(r.lastTime=o,!1):r.lastTime>n*.4&&o<i?(r.completedLoops+=1,r.lastTime=o,r.completedLoops>=t):(r.lastTime=o,!1)}function aL(e,t,r){if(t<=1)return e;if(r==="sequential")return(e+1)%t;let n=Math.floor(Math.random()*t);return n===e&&(n=(n+1)%t),n}function Uh(e){let t=e.autoMix;if(!t||!Nh(t)||e.clipCount<=1)return{stop:()=>{}};let r=t.params?.advanceMode==="sequential"?"sequential":"random",n=()=>e.selectClip(aL(e.currentIndex(),e.clipCount,r));if(_f(t)==="loop"){let s=Math.max(1,Math.round(Number(t.base)||1)),l=Sf(),p={id:0},d=()=>{let v=Gh();v&&Wh(v,s,l)&&(l=Sf(),n()),p.id=requestAnimationFrame(d)};return p.id=requestAnimationFrame(d),{stop:()=>cancelAnimationFrame(p.id)}}let o=Math.max(1,Number(t.base)||12)*1e3,i=window.setInterval(n,o);return{stop:()=>window.clearInterval(i)}}u();var iL=`
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
`;function Vh(e,t){let r=document.createElement("style");r.textContent=iL,document.head.appendChild(r);let n=document.createElement("div");n.className="hexa-chrome";let o=document.createElement("span");o.className="hexa-chrome__title",o.textContent=t.title;let i=document.createElement("span");i.className="hexa-chrome__count";let s=document.createElement("button"),l=document.createElement("button");l.textContent="Prev";let p=document.createElement("button");p.textContent="Next";let d=document.createElement("button");d.textContent="Full",n.append(o,i,l,s,p,d),e.appendChild(n);let v=K=>{s.textContent=K?"Pause":"Play"},H=K=>{i.textContent=t.clipCount>1?`${K+1}/${t.clipCount}`:""};l.addEventListener("click",t.onPrevious),p.addEventListener("click",t.onNext),s.addEventListener("click",()=>v(t.onTogglePlay())),d.addEventListener("click",t.onToggleFullscreen);let D=0,O=()=>{n.dataset.visible="true",window.clearTimeout(D),D=window.setTimeout(()=>{n.dataset.visible="false"},2600)};return e.addEventListener("pointermove",O),e.addEventListener("pointerdown",O),O(),{setClipIndex:H,setPlaying:v,destroy:()=>{window.clearTimeout(D),e.removeEventListener("pointermove",O),e.removeEventListener("pointerdown",O),n.remove(),r.remove()}}}u();u();u();var La=function({regl:e,precision:t,label:r="",width:n,height:o}){this.regl=e,this.precision=t,this.label=r,this.positionBuffer=this.regl.buffer([[-2,0],[0,-2],[2,2]]),this.draw=()=>{},this.init(),this.pingPongIndex=0,this.fbos=Array(2).fill().map(()=>this.regl.framebuffer({color:this.regl.texture({mag:"nearest",width:n,height:o,format:"rgba"}),depthStencil:!1}))};La.prototype.resize=function(e,t){this.fbos.forEach(r=>{r.resize(e,t)})};La.prototype.getCurrent=function(){return this.fbos[this.pingPongIndex]};La.prototype.getTexture=function(){var e=this.pingPongIndex?0:1;return this.fbos[e]};La.prototype.init=function(){return this.transformIndex=0,this.fragHeader=`
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
  `,this};La.prototype.render=function(e){let t=e[0];var r=this,n=Object.assign(t.uniforms,{prevBuffer:()=>r.fbos[r.pingPongIndex]});r.draw=r.regl({frag:t.frag,vert:r.vert,attributes:r.attributes,uniforms:n,count:3,framebuffer:()=>(r.pingPongIndex=r.pingPongIndex?0:1,r.fbos[r.pingPongIndex])})};La.prototype.tick=function(e){this.draw(e)};var $h=La;var vg=us(Af(),1);u();u();function rg(e){return navigator.mediaDevices.enumerateDevices().then(t=>t.filter(r=>r.kind==="videoinput")).then(t=>{let r={audio:!1,video:!0};return t[e]&&(r.video={deviceId:{exact:t[e].deviceId}}),window.navigator.mediaDevices.getUserMedia(r)}).then(t=>{let r=document.createElement("video");return r.setAttribute("autoplay",""),r.setAttribute("muted",""),r.setAttribute("playsinline",""),r.srcObject=t,new Promise((n,o)=>{r.addEventListener("loadedmetadata",()=>{r.play().then(()=>n({video:r}))})})}).catch(console.log.bind(console))}u();function ng(e){return new Promise(function(t,r){navigator.mediaDevices.getDisplayMedia(e).then(n=>{let o=document.createElement("video");o.srcObject=n,o.addEventListener("loadedmetadata",()=>{o.play(),t({video:o})})}).catch(n=>r(n))})}var Cf=class{constructor({regl:t,width:r,height:n,pb:o,label:i=""}){Il(this,"canvases",{});this.label=i,this.regl=t,this.src=null,this.dynamic=!0,this.width=r,this.height=n,this.tex=this.regl.texture({shape:[1,1]}),this.pb=o}init(t,r){"src"in t&&(this.src=t.src,this.tex=this.regl.texture({data:this.src,...r})),"dynamic"in t&&(this.dynamic=t.dynamic)}initCam(t,r){let n=this;rg(t).then(o=>{n.src=o.video,n.dynamic=!0,n.tex=n.regl.texture({data:n.src,...r})}).catch(o=>console.log("could not get camera",o))}initVideo(t="",r){let n=document.createElement("video");n.crossOrigin="anonymous",n.autoplay=!0,n.loop=!0,n.muted=!0;let o=n.addEventListener("loadeddata",()=>{this.src=n,n.play(),this.tex=this.regl.texture({data:this.src,...r}),this.dynamic=!0});n.src=t}initImage(t="",r){let n=document.createElement("img");n.crossOrigin="anonymous",n.src=t,n.onload=()=>{this.src=n,this.dynamic=!1,this.tex=this.regl.texture({data:this.src,...r})}}initStream(t,r){let n=this;t&&this.pb&&(this.pb.initSource(t),this.pb.on("got video",function(o,i){o===t&&(n.src=i,n.dynamic=!0,n.tex=n.regl.texture({data:n.src,...r}))}))}initScreen(t=0,r){let n=this;ng().then(function(o){n.src=o.video,n.tex=n.regl.texture({data:n.src,...r}),n.dynamic=!0}).catch(o=>console.log("could not get screen",o))}initCanvas(t=1e3,r=1e3){if(this.canvases[this.label]==null){let s=document.createElement("canvas").getContext("2d");s!=null&&(this.canvases[this.label]=s)}let n=this.canvases[this.label],o=n.canvas;return o.width!==t&&o.height!==r?(o.width=t,o.height=r):n.clearRect(0,0,t,r),this.init({src:o}),this.dynamic=!0,n}resize(t,r){this.width=t,this.height=r}clear(){this.src&&this.src.srcObject&&this.src.srcObject.getTracks&&this.src.srcObject.getTracks().forEach(t=>t.stop()),this.src=null,this.tex=this.regl.texture({shape:[1,1]})}tick(t){this.src&&this.dynamic===!0&&(this.src.videoWidth&&this.src.videoWidth!==this.tex.width&&(console.log(this.src.videoWidth,this.src.videoHeight,this.tex.width,this.tex.height),this.tex.resize(this.src.videoWidth,this.src.videoHeight)),this.src.width&&this.src.width!==this.tex.width&&this.tex.resize(this.src.width,this.src.height),this.tex.subimage(this.src))}getTexture(){return this.tex}},og=Cf;u();u();var bs={};function fL(e){if(typeof e=="object"){if("buttons"in e)return e.buttons;if("which"in e){var t=e.which;if(t===2)return 4;if(t===3)return 2;if(t>0)return 1<<t-1}else if("button"in e){var t=e.button;if(t===1)return 4;if(t===2)return 2;if(t>=0)return 1<<t}}return 0}bs.buttons=fL;function pL(e){return e.target||e.srcElement||window}bs.element=pL;function dL(e){return typeof e=="object"&&"pageX"in e?e.pageX:0}bs.x=dL;function mL(e){return typeof e=="object"&&"pageY"in e?e.pageY:0}bs.y=mL;var mi=bs;var ag=hL;function hL(e,t){t||(t=e,e=window);var r=0,n=0,o=0,i={shift:!1,alt:!1,control:!1,meta:!1},s=!1;function l(be){var Fe=!1;return"altKey"in be&&(Fe=Fe||be.altKey!==i.alt,i.alt=!!be.altKey),"shiftKey"in be&&(Fe=Fe||be.shiftKey!==i.shift,i.shift=!!be.shiftKey),"ctrlKey"in be&&(Fe=Fe||be.ctrlKey!==i.control,i.control=!!be.ctrlKey),"metaKey"in be&&(Fe=Fe||be.metaKey!==i.meta,i.meta=!!be.metaKey),Fe}function p(be,Fe){var Qe=mi.x(Fe),Ze=mi.y(Fe);"buttons"in Fe&&(be=Fe.buttons|0),(be!==r||Qe!==n||Ze!==o||l(Fe))&&(r=be|0,n=Qe||0,o=Ze||0,t&&t(r,n,o,i))}function d(be){p(0,be)}function v(){(r||n||o||i.shift||i.alt||i.meta||i.control)&&(n=o=0,r=0,i.shift=i.alt=i.control=i.meta=!1,t&&t(0,0,0,i))}function H(be){l(be)&&t&&t(r,n,o,i)}function D(be){mi.buttons(be)===0?p(0,be):p(r,be)}function O(be){p(r|mi.buttons(be),be)}function K(be){p(r&~mi.buttons(be),be)}function Y(){s||(s=!0,e.addEventListener("mousemove",D),e.addEventListener("mousedown",O),e.addEventListener("mouseup",K),e.addEventListener("mouseleave",d),e.addEventListener("mouseenter",d),e.addEventListener("mouseout",d),e.addEventListener("mouseover",d),e.addEventListener("blur",v),e.addEventListener("keyup",H),e.addEventListener("keydown",H),e.addEventListener("keypress",H),e!==window&&(window.addEventListener("blur",v),window.addEventListener("keyup",H),window.addEventListener("keydown",H),window.addEventListener("keypress",H)))}function fe(){s&&(s=!1,e.removeEventListener("mousemove",D),e.removeEventListener("mousedown",O),e.removeEventListener("mouseup",K),e.removeEventListener("mouseleave",d),e.removeEventListener("mouseenter",d),e.removeEventListener("mouseout",d),e.removeEventListener("mouseover",d),e.removeEventListener("blur",v),e.removeEventListener("keyup",H),e.removeEventListener("keydown",H),e.removeEventListener("keypress",H),e!==window&&(window.removeEventListener("blur",v),window.removeEventListener("keyup",H),window.removeEventListener("keydown",H),window.removeEventListener("keypress",H)))}Y();var Ee={element:e};return Object.defineProperties(Ee,{enabled:{get:function(){return s},set:function(be){be?Y():fe()},enumerable:!0},buttons:{get:function(){return r},enumerable:!0},x:{get:function(){return n},enumerable:!0},y:{get:function(){return o},enumerable:!0},mods:{get:function(){return i},enumerable:!0}}),Ee}u();var sg=us(ig(),1),kf=class{constructor({numBins:t=4,cutoff:r=2,smooth:n=.4,max:o=15,scale:i=10,isDrawing:s=!1,parentEl:l=document.body}){this.vol=0,this.scale=i,this.max=o,this.cutoff=r,this.smooth=n,this.setBins(t),this.beat={holdFrames:20,threshold:40,_cutoff:0,decay:.98,_framesSinceBeat:0},this.onBeat=()=>{},this.canvas=document.createElement("canvas"),this.canvas.width=100,this.canvas.height=80,this.canvas.style.width="100px",this.canvas.style.height="80px",this.canvas.style.position="absolute",this.canvas.style.right="0px",this.canvas.style.bottom="0px",l.appendChild(this.canvas),this.isDrawing=s,this.ctx=this.canvas.getContext("2d"),this.ctx.fillStyle="#DFFFFF",this.ctx.strokeStyle="#0ff",this.ctx.lineWidth=.5,window.navigator.mediaDevices&&window.navigator.mediaDevices.getUserMedia({video:!1,audio:!0}).then(p=>{this.stream=p,this.context=new AudioContext;let d=this.context.createMediaStreamSource(p);this.meyda=sg.default.createMeydaAnalyzer({audioContext:this.context,source:d,featureExtractors:["loudness"]})}).catch(p=>console.log("ERROR",p))}detectBeat(t){t>this.beat._cutoff&&t>this.beat.threshold?(this.onBeat(),this.beat._cutoff=t*1.2,this.beat._framesSinceBeat=0):this.beat._framesSinceBeat<=this.beat.holdFrames?this.beat._framesSinceBeat++:(this.beat._cutoff*=this.beat.decay,this.beat._cutoff=Math.max(this.beat._cutoff,this.beat.threshold))}tick(){if(this.meyda){var t=this.meyda.get();if(t&&t!==null){this.vol=t.loudness.total,this.detectBeat(this.vol);let r=(o,i)=>o+i,n=Math.floor(t.loudness.specific.length/this.bins.length);this.prevBins=this.bins.slice(0),this.bins=this.bins.map((o,i)=>t.loudness.specific.slice(i*n,(i+1)*n).reduce(r)).map((o,i)=>o*(1-this.settings[i].smooth)+this.prevBins[i]*this.settings[i].smooth),this.fft=this.bins.map((o,i)=>Math.max(0,(o-this.settings[i].cutoff)/this.settings[i].scale)),this.isDrawing&&this.draw()}}}setCutoff(t){this.cutoff=t,this.settings=this.settings.map(r=>(r.cutoff=t,r))}setSmooth(t){this.smooth=t,this.settings=this.settings.map(r=>(r.smooth=t,r))}setBins(t){this.bins=Array(t).fill(0),this.prevBins=Array(t).fill(0),this.fft=Array(t).fill(0),this.settings=Array(t).fill(0).map(()=>({cutoff:this.cutoff,scale:this.scale,smooth:this.smooth})),this.bins.forEach((r,n)=>{window["a"+n]=(o=1,i=0)=>()=>a.fft[n]*o+i})}setScale(t){this.scale=t,this.settings=this.settings.map(r=>(r.scale=t,r))}setMax(t){this.max=t,console.log("set max is deprecated")}hide(){this.isDrawing=!1,this.canvas.style.display="none"}show(){this.isDrawing=!0,this.canvas.style.display="block"}draw(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);var t=this.canvas.width/this.bins.length,r=this.canvas.height/(this.max*2);this.bins.forEach((n,o)=>{var i=n*r;this.ctx.fillRect(o*t,this.canvas.height-i,t,i);var s=this.canvas.height-r*this.settings[o].cutoff;this.ctx.beginPath(),this.ctx.moveTo(o*t,s),this.ctx.lineTo((o+1)*t,s),this.ctx.stroke();var l=this.canvas.height-r*(this.settings[o].scale+this.settings[o].cutoff);this.ctx.beginPath(),this.ctx.moveTo(o*t,l),this.ctx.lineTo((o+1)*t,l),this.ctx.stroke()})}},lg=kf;u();var Pf=class{constructor(t){this.mediaSource=new MediaSource,this.stream=t,this.output=document.createElement("video"),this.output.autoplay=!0,this.output.loop=!0;let r=this;this.mediaSource.addEventListener("sourceopen",()=>{console.log("MediaSource opened"),r.sourceBuffer=r.mediaSource.addSourceBuffer('video/webm; codecs="vp8"'),console.log("Source buffer: ",sourceBuffer)})}start(){let t={mimeType:"video/webm;codecs=vp9"};this.recordedBlobs=[];try{this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(r){console.log("Unable to create MediaRecorder with options Object: ",r);try{t={mimeType:"video/webm,codecs=vp9"},this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(n){console.log("Unable to create MediaRecorder with options Object: ",n);try{t="video/vp8",this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(o){alert(`MediaRecorder is not supported by this browser.

Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.`),console.error("Exception while creating MediaRecorder:",o);return}}}console.log("Created MediaRecorder",this.mediaRecorder,"with options",t),this.mediaRecorder.onstop=this._handleStop.bind(this),this.mediaRecorder.ondataavailable=this._handleDataAvailable.bind(this),this.mediaRecorder.start(100),console.log("MediaRecorder started",this.mediaRecorder)}stop(){this.mediaRecorder.stop()}_handleStop(){let t=new Blob(this.recordedBlobs,{type:this.mediaRecorder.mimeType}),r=window.URL.createObjectURL(t);this.output.src=r;let n=document.createElement("a");n.style.display="none",n.href=r;let o=new Date;n.download=`hydra-${o.getFullYear()}-${o.getMonth()+1}-${o.getDate()}-${o.getHours()}.${o.getMinutes()}.${o.getSeconds()}.webm`,document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n),window.URL.revokeObjectURL(r)},300)}_handleDataAvailable(t){t.data&&t.data.size>0&&this.recordedBlobs.push(t.data)}},cg=Pf;u();u();var Vl={linear:function(e){return e},easeInQuad:function(e){return e*e},easeOutQuad:function(e){return e*(2-e)},easeInOutQuad:function(e){return e<.5?2*e*e:-1+(4-2*e)*e},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return--e*e*e+1},easeInOutCubic:function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return 1- --e*e*e*e},easeInOutQuart:function(e){return e<.5?8*e*e*e*e:1-8*--e*e*e*e},easeInQuint:function(e){return e*e*e*e*e},easeOutQuint:function(e){return 1+--e*e*e*e*e},easeInOutQuint:function(e){return e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e},sin:function(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}};var gL=(e,t,r,n,o)=>(e-t)*(o-n)/(r-t)+n,Ff=(e,t)=>(e%t+t)%t,$l={init:()=>{Array.prototype.fast=function(e=1){return this._speed=e,this},Array.prototype.smooth=function(e=1){return this._smooth=e,this},Array.prototype.ease=function(e="linear"){return typeof e=="function"?(this._smooth=1,this._ease=e):Vl[e]&&(this._smooth=1,this._ease=Vl[e]),this},Array.prototype.offset=function(e=.5){return this._offset=e%1,this},Array.prototype.fit=function(e=0,t=1){let r=Math.min(...this),n=Math.max(...this);var o=this.map(i=>gL(i,r,n,e,t));return o._speed=this._speed,o._smooth=this._smooth,o._ease=this._ease,o}},getValue:(e=[])=>({time:t,bpm:r})=>{let n=e._speed?e._speed:1,o=e._smooth?e._smooth:0,i=t*n*(r/60)+(e._offset||0);if(o!==0){let s=e._ease?e._ease:Vl.linear,l=i-o/2,p=e[Math.floor(Ff(l,e.length))],d=e[Math.floor(Ff(l+1,e.length))],v=Math.min(Ff(l,1)/o,1);return s(v)*(d-p)+p}else{let s=e[Math.floor(i%e.length)];return e[Math.floor(i%e.length)]}}};u();u();var ug=e=>{var t="",r=o(t),n=(i,s)=>{t+=`
      var ${i} = ${s}
    `,r=o(t)};return{addToContext:n,eval:i=>r.eval(i)};function o(i){globalThis.eval(i);var s=function(l){globalThis.eval(l)};return{eval:s}}};var Of=class{constructor(t,r,n=[]){this.makeGlobal=r,this.sandbox=ug(t),this.parent=t;var o=Object.keys(t);o.forEach(i=>this.add(i)),this.userProps=n}add(t){this.makeGlobal&&(window[t]=this.parent[t])}set(t,r){this.makeGlobal&&(window[t]=r),this.parent[t]=r}tick(){this.makeGlobal&&this.userProps.forEach(t=>{this.parent[t]=window[t]})}eval(t){this.sandbox.eval(t)}},fg=Of;u();u();u();u();var bL={float:{vec4:{name:"sum",args:[[1,1,1,1]]},vec2:{name:"sum",args:[[1,1]]}}};var If=e=>(e=e.toString(),e.indexOf(".")<0&&(e+="."),e);function Bf(e,t,r){let n=e.transform.inputs,o=e.userArgs,{generators:i}=e.synth,{src:s}=i;return n.map((l,p)=>{let d={value:l.default,type:l.type,isUniform:!1,name:l.name,vecLen:0};if(d.type==="float"&&(d.value=If(l.default)),l.type.startsWith("vec"))try{d.vecLen=Number.parseInt(l.type.substr(3))}catch{console.log(`Error determining length of vector input type ${l.type} (${l.name})`)}if(o.length>p){if(d.value=o[p],d.type==="vec4"&&!(d.value.type==="GlslSource"||d.value.getTexture))throw new Error("Arguments must be a texture or GlslSource");typeof o[p]=="function"?(d.value=(D,O,K)=>{try{let Y=o[p](O);return typeof Y=="number"?Y:(console.warn("function does not return a number",o[p]),l.default)}catch(Y){return console.warn("ERROR",Y),l.default}},d.isUniform=!0):o[p].constructor===Array&&(d.value=(D,O,K)=>$l.getValue(o[p])(O),d.isUniform=!0)}if(!(t<0)){if(d.value&&d.value.transforms){let D=d.value.transforms[d.value.transforms.length-1];if(D.transform.glsl_return_type!==l.type){let O=bL[l.type];if(typeof O<"u"){let K=O[D.transform.glsl_return_type];if(typeof K<"u"){let{name:Y,args:fe}=K;d.value=d.value[Y](...fe)}}}d.isUniform=!1}else if(d.type==="float"&&typeof d.value=="number")d.value=If(d.value);else if(d.type.startsWith("vec")&&typeof d.value=="object"&&Array.isArray(d.value))d.isUniform=!1,d.value=`${d.type}(${d.value.map(If).join(", ")})`;else if(l.type==="sampler2D"){var v=d.value;d.value=()=>v.getTexture(),d.isUniform=!0}else if(d.value.getTexture&&l.type==="vec4"){var H=d.value;d.value=s(H),d.isUniform=!1}d.isUniform&&(d.name+=t)}return d})}function pg(e){var t={uniforms:[],glslFunctions:[],fragColor:""},r=dg(e,t)("c","st");t.fragColor=r;let n={};return t.uniforms.forEach(o=>n[o.name]=o),t.uniforms=Object.values(n),t}function Df(e,t){return`${e}_i${t}`}function dg(e,t){var r=(n,o)=>"";return e.forEach((n,o)=>{let i=Bf(n,t.uniforms.length);i.forEach(l=>{l.isUniform&&t.uniforms.push(l)}),yL(n,t.glslFunctions)||t.glslFunctions.push(n);var s=r;n.transform.type==="src"?r=(l,p)=>`${ys(i,t)(`${l}${o}`,p)}
         vec4 ${l} = ${xs(`${l}${o}`,p,n.name,i)};`:n.transform.type==="color"?r=(l,p)=>`${ys(i,t)(`${l}${o}`,p)}
         ${s(l,p)}
         ${l} = ${xs(`${l}${o}`,`${l}`,n.name,i)};`:n.transform.type==="coord"?r=(l,p)=>`${ys(i,t)(`${l}${o}`,p)}
         ${p} = ${xs(`${l}${o}`,`${p}`,n.name,i)};
         ${s(l,p)}`:n.transform.type==="combine"?r=(l,p)=>`${ys(i,t)(`${l}${o}`,p)}
         ${s(l,p)}
         ${l} = ${xs(`${l}${o}`,`${l}`,n.name,i)};`:n.transform.type==="combineCoord"&&(r=(l,p)=>`${ys(i,t)(`${l}${o}`,p)}
         ${p} = ${xs(`${l}${o}`,`${p}`,n.name,i)};
         ${s(l,p)}`)}),r}function ys(e,t){let r=(o,i)=>"";var n=r;return e.forEach((o,i)=>{o.value.transforms&&(n=r,r=(s,l)=>{let p=Df(s,i),d=Df(`${l}_${s}`,i);return`vec2 ${d} = ${l};${n(s,l)}
         ${dg(o.value.transforms,t)(p,d)}`})}),r}function xs(e,t,r,n){let o=n.map((i,s)=>i.isUniform?i.name:i.value&&i.value.transforms?Df(e,s):i.value).reduce((i,s)=>`${i}, ${s}`,"");return`${r}(${t}${o})`}function yL(e,t){for(var r=0;r<t.length;r++)if(e.name==t[r].name)return!0;return!1}u();var mg={_luminance:{type:"util",glsl:`float _luminance(vec3 rgb){
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
    }`}};var vs=function(e){return this.transforms=[],this.transforms.push(e),this.defaultOutput=e.defaultOutput,this.synth=e.synth,this.type="GlslSource",this.defaultUniforms=e.defaultUniforms,this};vs.prototype.addTransform=function(e){this.transforms.push(e)};vs.prototype.out=function(e){var t=e||this.defaultOutput;if(t)try{var r=this.glsl(t);this.synth.currentFunctions=[],t.render(r)}catch(n){console.warn("shader could not compile",n)}};vs.prototype.glsl=function(){var e=this,t=[],r=[];return this.transforms.forEach(n=>{n.transform.type==="renderpass"?console.warn("no support for renderpass"):r.push(n)}),r.length>0&&t.push(this.compile(r)),t};vs.prototype.compile=function(e){var t=pg(e,this.synth),r={};t.uniforms.forEach(o=>{r[o.name]=o.value});var n=`
  precision ${this.defaultOutput.precision} float;
  ${Object.values(t.uniforms).map(o=>{let i=o.type;return o.type==="texture"&&(i="sampler2D"),`
      uniform ${i} ${o.name};`}).join("")}
  uniform float time;
  uniform vec2 resolution;
  varying vec2 uv;
  uniform sampler2D prevBuffer;

  ${Object.values(mg).map(o=>`
            ${o.glsl}
          `).join("")}

  ${t.glslFunctions.map(o=>`
            ${o.transform.glsl}
          `).join("")}

  void main () {
    vec2 st = gl_FragCoord.xy/resolution.xy;

    ${t.fragColor}
    gl_FragColor = c;
  }
  `;return{frag:n,uniforms:Object.assign({},this.defaultUniforms,r)}};var hg=vs;u();var gg=()=>[{name:"noise",type:"src",inputs:[{type:"float",name:"scale",default:10},{type:"float",name:"offset",default:.1}],glsl:"   return vec4(vec3(_noise(vec3(_st*scale, offset*time))), 1.0);"},{name:"voronoi",type:"src",inputs:[{type:"float",name:"scale",default:5},{type:"float",name:"speed",default:.3},{type:"float",name:"blending",default:.3}],glsl:`   vec3 color = vec3(.0);
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
   return v.x + v.y;`},{name:"r",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.r * scale + offset);"},{name:"g",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.g * scale + offset);"},{name:"b",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.b * scale + offset);"},{name:"a",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.a * scale + offset);"}];var Hf=class{constructor({defaultUniforms:t,defaultOutput:r,extendTransforms:n=[],changeListener:o=(()=>{})}={}){this.defaultOutput=r,this.defaultUniforms=t,this.changeListener=o,this.extendTransforms=n,this.generators={},this.init()}init(){let t=gg();return this.glslTransforms={},this.generators=Object.entries(this.generators).reduce((r,[n,o])=>(this.changeListener({type:"remove",synth:this,method:n}),r),{}),this.sourceClass=class extends hg{},Array.isArray(this.extendTransforms)?t.concat(this.extendTransforms):typeof this.extendTransforms=="object"&&this.extendTransforms.type&&t.push(this.extendTransforms),t.map(r=>this.setFunction(r))}_addMethod(t,r){let n=this;if(this.glslTransforms[t]=r,r.type==="src"){let o=(...i)=>new this.sourceClass({name:t,transform:r,userArgs:i,defaultOutput:this.defaultOutput,defaultUniforms:this.defaultUniforms,synth:n});return this.generators[t]=o,this.changeListener({type:"add",synth:this,method:t}),o}else this.sourceClass.prototype[t]=function(...o){return this.transforms.push({name:t,transform:r,userArgs:o,synth:n}),this}}setFunction(t){var r=xL(t);r&&this._addMethod(t.name,r)}},bg={src:{returnType:"vec4",args:[{type:"vec2",name:"_st"}]},coord:{returnType:"vec2",args:[{type:"vec2",name:"_st"}]},color:{returnType:"vec4",args:[{type:"vec4",name:"_c0"}]},combine:{returnType:"vec4",args:[{type:"vec4",name:"_c0"},{type:"vec4",name:"_c1"}]},combineCoord:{returnType:"vec2",args:[{type:"vec2",name:"_st"},{type:"vec4",name:"_c0"}]}};function xL(e){let t=bg[e.type];if(t){let r=t.args.concat(e.inputs),n=r.map(i=>`${i.type} ${i.name}`).join(", "),o=`
  ${t.returnType} ${e.name}(${n}) {
      ${e.glsl}
  }
`;return e.inputs=r.slice(1),Object.assign({},e,{glsl:o})}else console.warn(`type ${e.type} not recognized`,e,bg)}var yg=Hf;var _g=us(xg(),1),vL=ag(),Wf=class{constructor({pb:t=null,width:r=1280,height:n=720,numSources:o=4,numOutputs:i=4,makeGlobal:s=!0,autoLoop:l=!0,detectAudio:p=!0,enableStreamCapture:d=!0,canvas:v,precision:H,extendTransforms:D={}}={}){if($l.init(),this.pb=t,this.width=r,this.height=n,this.renderAll=!1,this.detectAudio=p,this._initCanvas(v),this.synth={time:0,bpm:30,width:this.width,height:this.height,fps:void 0,stats:{fps:0},speed:1,mouse:vL,render:this._render.bind(this),setResolution:this.setResolution.bind(this),update:K=>{},afterUpdate:K=>{},hush:this.hush.bind(this),tick:this.tick.bind(this)},s&&(window.loadScript=this.loadScript),this.timeSinceLastUpdate=0,this._time=0,H&&["lowp","mediump","highp"].includes(H.toLowerCase()))this.precision=H.toLowerCase();else{let K=(/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)&&!window.MSStream;this.precision=K?"highp":"mediump"}if(this.extendTransforms=D,this.saveFrame=!1,this.captureStream=null,this.generator=void 0,this._initRegl(),this._initOutputs(i),this._initSources(o),this._generateGlslTransforms(),this.synth.screencap=()=>{this.saveFrame=!0},d)try{this.captureStream=this.canvas.captureStream(25),this.synth.vidRecorder=new cg(this.captureStream)}catch(K){console.warn(`[hydra-synth warning]
new MediaSource() is not currently supported on iOS.`),console.error(K)}p&&this._initAudio(),l&&(0,vg.default)(this.tick.bind(this)).start(),this.sandbox=new fg(this.synth,s,["speed","update","afterUpdate","bpm","fps"])}eval(t){this.sandbox.eval(t)}getScreenImage(t){this.imageCallback=t,this.saveFrame=!0}hush(){this.s.forEach(t=>{t.clear()}),this.o.forEach(t=>{this.synth.solid(0,0,0,0).out(t)}),this.synth.render(this.o[0]),this.sandbox.set("update",t=>{}),this.sandbox.set("afterUpdate",t=>{})}loadScript(t=""){return new Promise((n,o)=>{var i=document.createElement("script");i.onload=function(){console.log(`loaded script ${t}`),n()},i.onerror=s=>{console.log(`error loading script ${t}`,"log-error"),n()},i.src=t,document.head.appendChild(i)})}setResolution(t,r){this.canvas.width=t,this.canvas.height=r,this.width=t,this.height=r,this.sandbox.set("width",t),this.sandbox.set("height",r),console.log(this.width),this.o.forEach(n=>{n.resize(t,r)}),this.s.forEach(n=>{n.resize(t,r)}),this.regl._refresh(),console.log(this.canvas.width)}canvasToImage(t){let r=document.createElement("a");r.style.display="none";let n=new Date;r.download=`hydra-${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}-${n.getHours()}.${n.getMinutes()}.${n.getSeconds()}.png`,document.body.appendChild(r);var o=this;this.canvas.toBlob(i=>{o.imageCallback?(o.imageCallback(i),delete o.imageCallback):(r.href=URL.createObjectURL(i),console.log(r.href),r.click())},"image/png"),setTimeout(()=>{document.body.removeChild(r),window.URL.revokeObjectURL(r.href)},300)}_initAudio(){let t=this;this.synth.a=new lg({numBins:4,parentEl:this.canvas.parentNode})}_initCanvas(t){t?(this.canvas=t,this.width=t.width,this.height=t.height):(this.canvas=document.createElement("canvas"),this.canvas.width=this.width,this.canvas.height=this.height,this.canvas.style.width="100%",this.canvas.style.height="100%",this.canvas.style.imageRendering="pixelated",document.body.appendChild(this.canvas))}_initRegl(){this.regl=(0,_g.default)({canvas:this.canvas,pixelRatio:1}),this.regl.clear({color:[0,0,0,1]}),this.renderAll=this.regl({frag:`
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
      }`,attributes:{position:[[-2,0],[0,-2],[2,2]]},uniforms:{tex0:this.regl.prop("tex0"),resolution:this.regl.prop("resolution")},count:3,depth:{enable:!1}})}_initOutputs(t){let r=this;this.o=Array(t).fill().map((n,o)=>{var i=new $h({regl:this.regl,width:this.width,height:this.height,precision:this.precision,label:`o${o}`});return i.id=o,r.synth["o"+o]=i,i}),this.output=this.o[0]}_initSources(t){this.s=[];for(var r=0;r<t;r++)this.createSource(r)}createSource(t){let r=new og({regl:this.regl,pb:this.pb,width:this.width,height:this.height,label:`s${t}`});return this.synth["s"+this.s.length]=r,this.s.push(r),r}_generateGlslTransforms(){var t=this;this.generator=new yg({defaultOutput:this.o[0],defaultUniforms:this.o[0].uniforms,extendTransforms:this.extendTransforms,changeListener:({type:r,method:n,synth:o})=>{r==="add"&&(t.synth[n]=o.generators[n],t.sandbox&&t.sandbox.add(n))}}),this.synth.setFunction=this.generator.setFunction.bind(this.generator)}_render(t){t?(this.output=t,this.isRenderingAll=!1):this.isRenderingAll=!0}tick(t,r){try{if(this.sandbox.tick(),this.detectAudio===!0&&this.synth.a.tick(),this.sandbox.set("time",this.synth.time+=t*.001*this.synth.speed),this.timeSinceLastUpdate+=t,!this.synth.fps||this.timeSinceLastUpdate>=1e3/this.synth.fps){if(this.synth.stats.fps=Math.ceil(1e3/this.timeSinceLastUpdate),this.synth.update)try{this.synth.update(this.timeSinceLastUpdate)}catch(o){console.log(o)}for(let o=0;o<this.s.length;o++)this.s[o].tick(this.synth.time);let n=this.synth.time;for(let o=0;o<this.o.length;o++)this.o[o].tick({time:n,mouse:this.synth.mouse,bpm:this.synth.bpm,resolution:[this.canvas.width,this.canvas.height]});if(this.isRenderingAll?this.renderAll({tex0:this.o[0].getCurrent(),tex1:this.o[1].getCurrent(),tex2:this.o[2].getCurrent(),tex3:this.o[3].getCurrent(),resolution:[this.canvas.width,this.canvas.height]}):this.renderFbo({tex0:this.output.getCurrent(),resolution:[this.canvas.width,this.canvas.height]}),this.synth.afterUpdate)try{this.synth.afterUpdate(this.timeSinceLastUpdate)}catch(o){console.log(o)}this.timeSinceLastUpdate=0}this.saveFrame===!0&&(this.canvasToImage(),this.saveFrame=!1)}catch(n){console.warn("Error during tick():",n)}}},Sg=Wf;var _2=us(Af(),1);u();u();var Tg=[{id:"16:9",label:"16\u22369",shortLabel:"Wide",ratio:1.7777777777777777,resolutions:[{id:"16:9-720",label:"720p",width:1280,height:720},{id:"16:9-1080",label:"1080p",width:1920,height:1080},{id:"16:9-1440",label:"1440p",width:2560,height:1440},{id:"16:9-4k",label:"4K",width:3840,height:2160}]},{id:"4:3",label:"4\u22363",shortLabel:"Classic",ratio:1.3333333333333333,resolutions:[{id:"4:3-768",label:"768p",width:1024,height:768},{id:"4:3-1080",label:"1080p",width:1440,height:1080},{id:"4:3-1536",label:"1536p",width:2048,height:1536}]},{id:"9:16",label:"9\u223616",shortLabel:"Story / Reel",ratio:.5625,resolutions:[{id:"9:16-720",label:"720p",width:720,height:1280},{id:"9:16-1080",label:"1080p",width:1080,height:1920},{id:"9:16-1440",label:"1440p",width:1440,height:2560}]}],Uf={enabled:!1,aspectRatio:"16:9",resolutionId:"16:9-1080",videoFit:"contain",cropGuide:!0},Mg=new Map(Tg.map(e=>[e.id,e]));function Vf(e){return Mg.get(e)??Tg[0]}function _L(e,t){let r=Vf(e);return r.resolutions.find(n=>n.id===t)??r.resolutions[0]}function Aa(e){let t=e?.aspectRatio&&Mg.has(e.aspectRatio)?e.aspectRatio:Uf.aspectRatio,r=Vf(t),n=r.resolutions.find(l=>l.id===e?.resolutionId)?.id??r.resolutions[0].id,o=e?.videoFit==="cover"?"cover":"contain",i=e?.cropGuide!==!1;return{enabled:e?.enabled===!0,aspectRatio:t,resolutionId:n,videoFit:o,cropGuide:i}}function Lg(e){return Aa(e).enabled===!0}function SL(e){let t=_L(e.aspectRatio,e.resolutionId);return{width:t.width,height:t.height}}function TL(e){return Vf(e.aspectRatio).ratio}function ML(e){return TL(e)}function LL(e,t){let r=Math.round(e);return r===1?16/9:r===2?4/3:r===3?9/16:ML(Aa(t))}function wL(e,t,r){return AL(0,e,t,r)}function AL(e,t,r,n){let o=Math.round(e),i=LL(e,t),s=Math.max(1,r),l=Math.max(1,n);if(o===0){let{width:p,height:d}=SL(Aa(t)),v=Math.min(1,s/p,l/d);return{width:p*v,height:d*v,aspect:i,usePixelBox:!0}}return{width:s,height:l,aspect:i,usePixelBox:!1}}function wg(e,t){let r=Math.max(.01,e),n=Math.max(.01,t);return r>=n?{w:1,h:n/r}:{w:r/n,h:1}}function Ag(e,t,r,n=1){let o=t/Math.max(1,r),{w:i,h:s}=wg(e,o),l=Math.max(.25,n);return{scaleX:l/i,scaleY:l/s}}function $f(e,t,r){let n=t/Math.max(1,r),o=Math.max(.01,e);return n>o?{scaleX:n/o,scaleY:1}:{scaleX:1,scaleY:o/n}}function zf(e){let t=e.inset??.025,r=wL(e.exportSettings,e.canvasWidth,e.canvasHeight),n=Math.max(1,e.canvasWidth),o=Math.max(1,e.canvasHeight),i,s;if(r.usePixelBox)i=Math.min(1,r.width/n),s=Math.min(1,r.height/o);else{let be=n/o,Fe=Math.max(.01,r.aspect);be>Fe?(s=1,i=Fe/be):(i=1,s=be/Fe)}let l=Math.max(0,Math.min(.25,t));i=Math.max(.01,i-l*2),s=Math.max(.01,s-l*2);let d=Aa(e.exportSettings).videoFit??"contain",v=n/o,{w:H,h:D}=wg(e.videoAspect,v),O=d==="cover"?Math.max(i/H,s/D):Math.min(i/H,s/D),K=H*O/2,Y=D*O/2,fe=s/2,Ee=d==="contain"&&Y<fe-1e-6?-fe+Y:0;return{safeW:i,safeH:s,contentHalfW:K,contentHalfH:Y,contentOffsetY:Ee,usePixelBox:r.usePixelBox,targetWidth:r.width,targetHeight:r.height,targetAspect:r.aspect}}u();var kn=[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1}],Eg=[0,.5,1].flatMap(e=>[0,.5,1].map(t=>({x:t,y:e}))),To=9,_s=To,No=64,Ca=No,Rg=8,CL=Rg-1,hi=3;var jf=0,Yf=2;function Xl(){return kn.map(e=>({dest:{...e},src:{...e}}))}function Xf(){return kn.map(e=>({...e}))}function EL(){return Eg.map(e=>({dest:{...e},src:{...e}}))}var Ss={enabled:!1,points:Xl(),mask:Xf(),maskPolys:[]};function Cg(e,t){let r=typeof e=="number"?e:Number(e);return Number.isFinite(r)?Math.max(0,Math.min(1,r)):t}function zl(e,t){if(!e||typeof e!="object")return{...t};let r=e;return{x:Cg(r.x,t.x),y:Cg(r.y,t.y)}}function RL(e,t){if(!e||typeof e!="object")return{dest:{...t.dest},src:{...t.src}};let r=e,n=r.dest??r;return{dest:zl(n,t.dest),src:zl(r.src,t.src)}}function kL(e){return[{op:"add",points:e.mask},...e.maskPolys].filter(t=>t.points.length>=hi)}function jl(e){let t=[],r=[],n=0;for(let o of kL(e)){let i=t.length,s=Math.min(o.points.length,No-i);if(s<hi)break;for(let l=0;l<s;l+=1)t.push(o.points[l]),r.push({next:l+1<s?i+l+1:i,end:l+1===s,exclude:o.op==="exclude"});if(n+=1,n>=Rg)break}return{points:t,links:r}}function qf(e){return{x:e.next/No,y:e.end?e.exclude?1:.6:0}}function gi(e,t){return Math.abs(e-t)<1e-4}function kg(e){return e.length!==4?!1:kn.every((t,r)=>{let n=e[r];return n!=null&&gi(n.x,t.x)&&gi(n.y,t.y)})}function PL(e){return e.length!==To?!1:Eg.every((t,r)=>{let n=e[r];return n!=null&&gi(n.x,t.x)&&gi(n.y,t.y)})}function FL(e){return kg(e)}function Kf(e){return FL(e.mask)&&e.maskPolys.length===0}function OL(e){let t=e.points.map(n=>n.dest);return(t.length===To?PL(t):kg(t))&&Kf(e)}function Qf(e){return e.enabled&&!OL(e)}function Pg(e){let t=e.points;return t.length>=To?[t[0]?.dest??kn[0],t[2]?.dest??kn[1],t[8]?.dest??kn[2],t[6]?.dest??kn[3]]:[t[0]?.dest??kn[0],t[1]?.dest??kn[1],t[2]?.dest??kn[2],t[3]?.dest??kn[3]]}function Fg(e,t){let r=e.points.at(-1)??Xl()[0];return e.points[t]??r}function IL(e){return!Array.isArray(e)||e.length<4?null:kn.map((t,r)=>({dest:zl(e[r],t),src:{...t}}))}function Og(e){return Xl().map((r,n)=>{let o=e[n];return o?{dest:{...o.dest},src:{...r.src}}:r})}function BL(e){return EL().map((r,n)=>{let o=e[n];return o?{dest:{...o.dest},src:{...r.src}}:r})}function DL(e){return e.length>=To?BL(e):Og(e)}function HL(e){return kn.map(t=>{let r=e.find(n=>gi(n.src.x,t.x)&&gi(n.src.y,t.y));return r?{dest:{...r.dest},src:{...t}}:{dest:{...t},src:{...t}}})}function Ig(e,t,r=4){return!Array.isArray(e)||e.length<r?t.map(n=>({...n})):e.slice(0,No).map((n,o)=>zl(n,t[Math.min(o,Math.max(t.length-1,0))]??kn[0]))}function NL(e){if(!e||typeof e!="object")return null;let t=e,r=Ig(t.points,[],hi);return r.length<hi?null:{op:t.op==="exclude"?"exclude":"add",points:r}}function GL(e,t){if(!Array.isArray(e))return[];let r=[],n=t;for(let o of e){if(r.length>=CL)break;let i=NL(o);if(!i)continue;let s=No-n;if(s<hi)break;let l=i.points.slice(0,s);l.length<hi||(r.push({op:i.op,points:l}),n+=l.length)}return r}function Yl(e){let t=e&&typeof e=="object"?e:{},r=Xl(),n=Array.isArray(t.points)?t.points.slice(0,_s).map((p,d)=>RL(p,r[Math.min(d,r.length-1)])):null,o=Array.isArray(t.mask)&&t.mask.length>=4,i=n&&n.length>=4?n:IL(t.corners),s,l;return o?(s=DL(i??r),l=Ig(t.mask,Xf())):i&&i.length>4?(s=HL(i),l=i.map(p=>({...p.dest}))):i&&i.length>=4?(s=Og(i),l=s.map(p=>({...p.dest}))):(s=r,l=Xf()),{enabled:t.enabled===!0,points:s,mask:l,maskPolys:GL(t.maskPolys,l.length)}}u();var Ea=null,Dg=0,ea=_s,ql=ea+No,Wo=_s+No*2;function Bg(e){let t=Math.round(Math.max(0,Math.min(1,e))*65535);return[t>>8,t&255]}function Go(e,t,r,n){let[o,i]=Bg(r),[s,l]=Bg(n),p=t*4;e[p]=o,e[p+1]=i,e[p+2]=s,e[p+3]=l}function Hg(e){if(Ea?.data.length===Wo*4)return;let t=new Uint8Array(Wo*4);[0,.5,1].flatMap(i=>[0,.5,1].map(s=>({x:s,y:i}))).forEach((i,s)=>Go(t,Dg+s,i.x,i.y)),Go(t,ea,0,0),Go(t,ea+1,1,0),Go(t,ea+2,1,1),Go(t,ea+3,0,1),[{next:1,end:!1,exclude:!1},{next:2,end:!1,exclude:!1},{next:3,end:!1,exclude:!1},{next:0,end:!0,exclude:!1}].forEach((i,s)=>{let l=qf(i);Go(t,ql+s,l.x,l.y)});let o=e.texture({data:t,shape:[Wo,1],wrap:"clamp",mag:"nearest",min:"nearest"});Ea={data:t,tex:o}}function Ng(){return{getTexture:()=>Ea?.tex??null}}function Zf(){return Ea!=null&&Ea.data.length===Wo*4}function Gg(e){if(!Ea)return;let{data:t,tex:r}=Ea;for(let s=0;s<_s;s+=1){let l=Fg(e,s).dest;Go(t,Dg+s,l.x,l.y)}let n=jl(e),o=n.points.at(-1)??{x:0,y:0},i=n.links.at(-1)??{next:0,end:!0,exclude:!1};for(let s=0;s<No;s+=1){let l=n.points[s]??o;Go(t,ea+s,l.x,l.y);let p=qf(n.links[s]??i);Go(t,ql+s,p.x,p.y)}r.subimage?.({data:t,width:Wo,height:1})}u();var ep=null,Wg=null,Mo=null,so=0,ta=!1,Ms=0,WL=12,UL=120,VL=2,$L=16;function tp(e){ep=e}function rp(e){Wg=e}function Pn(){return ta}function Ug(){return Mo!==null||so!==0}function Ql(){Ms+=1}function Zl(){Ms=Math.max(0,Ms-1)}function Vg(){ta||(ta=!0,ep?.pause())}function zL(){ta&&(ta=!1,ep?.resume())}function Kl(e,t=$L){for(let r=0;r<t;r++)e.regl.poll?.();e.regl._refresh()}function XL(e,t,r,n){Kl(n),e(t,r),Kl(n,8)}function jL(e){for(let t=0;t<e.host.o.length;t++){let r=e.host.o[t];r?.resize&&XL((n,o)=>r.resize(n,o),e.width,e.height,e.host)}for(let t=0;t<e.host.s.length;t++){let r=e.host.s[t];r?.resize&&r.resize(e.width,e.height)}Kl(e.host)}function YL(e,t,r){e.canvas.width=t,e.canvas.height=r,e.width=t,e.height=r,e.sandbox.set("width",t),e.sandbox.set("height",r)}function qL(e,t){return!!e&&!!t&&e.host===t.host&&e.width===t.width&&e.height===t.height}function Jf(e=0){so&&(cancelAnimationFrame(so),so=0),so=requestAnimationFrame(()=>QL(e))}function Ts(){zL(),Wg?.()}function Jl(){!ta||Mo!==null||so!==0||(console.warn("[hydra] recovering stuck resize pause"),Ts())}function KL(e){YL(e.host,e.width,e.height),jL(e)}function QL(e=0){if(so=0,!Mo){ta&&(console.warn("[hydra] FBO flush ended with no pending job while paused \u2014 recovering"),Ts());return}Vg();let t=0,r=0,n=()=>{if(Ms>0)if(r+=1,r>=UL)Ms=0;else{so=requestAnimationFrame(n);return}let o=Mo;if(!o){Ts();return}if(Kl(o.host,8),t<VL){t+=1,so=requestAnimationFrame(n);return}try{if(KL(o),!qL(Mo,o)){t=0,r=0,so=requestAnimationFrame(n);return}Mo=null,Ts()}catch(i){if(e<WL){t=0,Jf(e+1);return}console.warn("[hydra] FBO resize failed after retries",i),Mo=null,Ts()}};so=requestAnimationFrame(n)}function np(e,t,r){if(e.width===t&&e.height===r&&e.canvas.width===t&&e.canvas.height===r){(Mo||ta)&&(Mo={host:e,width:t,height:r},Jf(0));return}Mo={host:e,width:t,height:r},Vg(),Jf(0)}u();u();u();u();u();u();var op="https://5sldq2ipzrgnonkh.public.blob.vercel-storage.com";u();function ap(e){let t=e.trim().replace(/\/$/,"");if(!t)return"";let r=t.match(/^store_([a-z0-9]+)$/i);if(r)return`https://${r[1].toLowerCase()}.public.blob.vercel-storage.com`;if(/^https?:\/\//i.test(t))try{let n=new URL(t),o=n.hostname.match(/^store_([a-z0-9]+)\.public\.blob\.vercel-storage\.com$/i);return o?(n.hostname=`${o[1].toLowerCase()}.public.blob.vercel-storage.com`,n.protocol="https:",n.origin):/store_/i.test(n.hostname)?"":n.origin}catch{return""}return/store_/i.test(t)?"":t}function $g(e){if(!/^https?:\/\//i.test(e))return e;try{let t=new URL(e),r=t.hostname.match(/^store_([a-z0-9]+)\.public\.blob\.vercel-storage\.com$/i);return r?(t.hostname=`${r[1].toLowerCase()}.public.blob.vercel-storage.com`,t.protocol="https:",t.toString()):e}catch{return e}}function ZL(){let e=w.VITE_LOOP_ASSETS_FORCE_REMOTE==="1";if(w.DEV&&!e)return"";let t=w.VITE_LOOP_ASSETS_BASE_URL??"",r=t?ap(t):"";return r||(w.PROD?ap(op)||op:"")}var ip;function JL(){return ip===void 0&&(ip=ZL()),ip}var ew=["/loops/","/audio/Recordings/Montreuil26_master/studio/","/audio/Recordings/Montreuil26_master/tracks_bandcamp/stems/"];function tw(e){return ew.some(t=>e.startsWith(t))}function zg(e){if(!e||typeof e!="string"||e.startsWith("data:"))return e;if(/^https?:\/\//i.test(e))return $g(e);let t=JL();return!e.startsWith("/")||!tw(e)||!t?e:`${t}${e}`}function Ls(e){return zg(e)}u();var sp={"/loops/point-cloud/PointCloud__1iqw__34.mp4":"/loops/point-cloud-geometric/PointCloud__1iqw__34.mp4","/loops/point-cloud/PointCloud__4f3t__52.mp4":"/loops/point-cloud-geometric/PointCloud__4f3t__52.mp4","/loops/point-cloud/PointCloud__9uol__5.mp4":"/loops/point-cloud-geometric/PointCloud__9uol__5.mp4","/loops/point-cloud/PointCloud__baa3__48.mp4":"/loops/point-cloud-geometric/PointCloud__baa3__48.mp4","/loops/point-cloud/PointCloud__e5dj__19.mp4":"/loops/point-cloud-geometric/PointCloud__e5dj__19.mp4","/loops/point-cloud/PointCloud__nusr__62.mp4":"/loops/point-cloud-geometric/PointCloud__nusr__62.mp4","/loops/point-cloud/PointCloud__oky0__61.mp4":"/loops/point-cloud-geometric/PointCloud__oky0__61.mp4","/loops/point-cloud/PointCloud__zgaj__55.mp4":"/loops/point-cloud-geometric/PointCloud__zgaj__55.mp4","/loops/point-cloud/PointCloud__0y5s__54.mp4":"/loops/point-cloud-particles/PointCloud__0y5s__54.mp4","/loops/point-cloud/PointCloud__3d0g__24.mp4":"/loops/point-cloud-particles/PointCloud__3d0g__24.mp4","/loops/point-cloud/PointCloud__4tqd__32.mp4":"/loops/point-cloud-particles/PointCloud__4tqd__32.mp4","/loops/point-cloud/PointCloud__6jt5__95.mp4":"/loops/point-cloud-particles/PointCloud__6jt5__95.mp4","/loops/point-cloud/PointCloud__8eq1__94.mp4":"/loops/point-cloud-particles/PointCloud__8eq1__94.mp4","/loops/point-cloud/PointCloud__8px8__22.mp4":"/loops/point-cloud-particles/PointCloud__8px8__22.mp4","/loops/point-cloud/PointCloud__bymt__89.mp4":"/loops/point-cloud-particles/PointCloud__bymt__89.mp4","/loops/point-cloud/PointCloud__bzy7__7.mp4":"/loops/point-cloud-particles/PointCloud__bzy7__7.mp4","/loops/point-cloud/PointCloud__cclx__92.mp4":"/loops/point-cloud-particles/PointCloud__cclx__92.mp4","/loops/point-cloud/PointCloud__d8b0__47.mp4":"/loops/point-cloud-particles/PointCloud__d8b0__47.mp4","/loops/point-cloud/PointCloud__g12n__18.mp4":"/loops/point-cloud-particles/PointCloud__g12n__18.mp4","/loops/point-cloud/PointCloud__hd80__14.mp4":"/loops/point-cloud-particles/PointCloud__hd80__14.mp4","/loops/point-cloud/PointCloud__hkji__69.mp4":"/loops/point-cloud-particles/PointCloud__hkji__69.mp4","/loops/point-cloud/PointCloud__iefy__68.mp4":"/loops/point-cloud-particles/PointCloud__iefy__68.mp4","/loops/point-cloud/PointCloud__j80t__67.mp4":"/loops/point-cloud-particles/PointCloud__j80t__67.mp4","/loops/point-cloud/PointCloud__kwxi__65.mp4":"/loops/point-cloud-particles/PointCloud__kwxi__65.mp4","/loops/point-cloud/PointCloud__ls6c__96.mp4":"/loops/point-cloud-particles/PointCloud__ls6c__96.mp4","/loops/point-cloud/PointCloud__m4dj__75.mp4":"/loops/point-cloud-particles/PointCloud__m4dj__75.mp4","/loops/point-cloud/PointCloud__m72v__42.mp4":"/loops/point-cloud-particles/PointCloud__m72v__42.mp4","/loops/point-cloud/PointCloud__mtqj__86.mp4":"/loops/point-cloud-particles/PointCloud__mtqj__86.mp4","/loops/point-cloud/PointCloud__nv57__16.mp4":"/loops/point-cloud-particles/PointCloud__nv57__16.mp4","/loops/point-cloud/PointCloud__u7sm__58.mp4":"/loops/point-cloud-particles/PointCloud__u7sm__58.mp4","/loops/point-cloud/PointCloud__vvo2__37.mp4":"/loops/point-cloud-particles/PointCloud__vvo2__37.mp4","/loops/point-cloud/PointCloud__xker__71.mp4":"/loops/point-cloud-particles/PointCloud__xker__71.mp4","/loops/point-cloud/PointCloud__xy68__27.mp4":"/loops/point-cloud-particles/PointCloud__xy68__27.mp4","/loops/point-cloud/PointCloud__zlyu__26.mp4":"/loops/point-cloud-particles/PointCloud__zlyu__26.mp4","/loops/point-cloud/PointCloud__zq7h__35.mp4":"/loops/point-cloud-particles/PointCloud__zq7h__35.mp4","/loops/point-cloud/WhiteHole__n2fm__149.mp4":"/loops/point-cloud-particles/WhiteHole__n2fm__149.mp4","/loops/point-cloud/PointCloud__rve8__15.mp4":"/loops/point-cloud-swirling-02/PointCloud__rve8__15.mp4","/loops/point-cloud/PointCloud__rxdn__73.mp4":"/loops/point-cloud-swirling-02/PointCloud__rxdn__73.mp4","/loops/point-cloud/PointCloud__s85x__59.mp4":"/loops/point-cloud-swirling-02/PointCloud__s85x__59.mp4","/loops/point-cloud/PointCloud__sgo2__30.mp4":"/loops/point-cloud-swirling-02/PointCloud__sgo2__30.mp4","/loops/point-cloud/PointCloud__ttxx__38.mp4":"/loops/point-cloud-swirling-02/PointCloud__ttxx__38.mp4","/loops/point-cloud/PointCloud__uaim__29.mp4":"/loops/point-cloud-swirling-02/PointCloud__uaim__29.mp4","/loops/point-cloud/PointCloud__vuff__57.mp4":"/loops/point-cloud-swirling-02/PointCloud__vuff__57.mp4","/loops/point-cloud/PointCloud__vzqk__72.mp4":"/loops/point-cloud-swirling-02/PointCloud__vzqk__72.mp4","/loops/point-cloud/PointCloud__x3g3__12.mp4":"/loops/point-cloud-swirling-02/PointCloud__x3g3__12.mp4","/loops/point-cloud/PointCloud__xjxy__36.mp4":"/loops/point-cloud-swirling-02/PointCloud__xjxy__36.mp4","/loops/point-cloud/PointCloud__xntc__56.mp4":"/loops/point-cloud-swirling-02/PointCloud__xntc__56.mp4","/loops/point-cloud/PointCloud__yrnk__2.mp4":"/loops/point-cloud-swirling-02/PointCloud__yrnk__2.mp4","/loops/point-cloud/PointCloud__zend__8.mp4":"/loops/point-cloud-swirling-02/PointCloud__zend__8.mp4","/loops/point-cloud/WhiteHole__80p5__157.mp4":"/loops/point-cloud-swirling-02/WhiteHole__80p5__157.mp4","/loops/point-cloud/PointCloud__1wnz__83.mp4":"/loops/point-cloud-undulating/PointCloud__1wnz__83.mp4","/loops/point-cloud/PointCloud__68cu__4.mp4":"/loops/point-cloud-undulating/PointCloud__68cu__4.mp4","/loops/point-cloud/PointCloud__6zlm__82.mp4":"/loops/point-cloud-undulating/PointCloud__6zlm__82.mp4","/loops/point-cloud/PointCloud__7nw3__50.mp4":"/loops/point-cloud-undulating/PointCloud__7nw3__50.mp4","/loops/point-cloud/PointCloud__aq5q__93.mp4":"/loops/point-cloud-undulating/PointCloud__aq5q__93.mp4","/loops/point-cloud/PointCloud__dk4e__88.mp4":"/loops/point-cloud-undulating/PointCloud__dk4e__88.mp4","/loops/point-cloud/PointCloud__do87__79.mp4":"/loops/point-cloud-undulating/PointCloud__do87__79.mp4","/loops/point-cloud/PointCloud__dxg8__91.mp4":"/loops/point-cloud-undulating/PointCloud__dxg8__91.mp4","/loops/point-cloud/PointCloud__fibj__90.mp4":"/loops/point-cloud-undulating/PointCloud__fibj__90.mp4","/loops/point-cloud/PointCloud__gnu5__45.mp4":"/loops/point-cloud-undulating/PointCloud__gnu5__45.mp4","/loops/point-cloud/PointCloud__grut__77.mp4":"/loops/point-cloud-undulating/PointCloud__grut__77.mp4","/loops/point-cloud/PointCloud__hxqx__17.mp4":"/loops/point-cloud-undulating/PointCloud__hxqx__17.mp4","/loops/point-cloud/PointCloud__kinz__43.mp4":"/loops/point-cloud-undulating/PointCloud__kinz__43.mp4","/loops/point-cloud/PointCloud__ktx6__87.mp4":"/loops/point-cloud-undulating/PointCloud__ktx6__87.mp4","/loops/point-cloud/PointCloud__qe2u__60.mp4":"/loops/point-cloud-undulating/PointCloud__qe2u__60.mp4","/loops/point-cloud/PointCloud__rv0s__39.mp4":"/loops/point-cloud-undulating/PointCloud__rv0s__39.mp4","/loops/point-cloud/PointCloud__ucio__84.mp4":"/loops/point-cloud-undulating/PointCloud__ucio__84.mp4","/loops/point-cloud/PointCloud__w344__28.mp4":"/loops/point-cloud-undulating/PointCloud__w344__28.mp4","/loops/white-hole/WhiteHole__0sx1__267.mp4":"/loops/white-hole-abstract/WhiteHole__0sx1__267.mp4","/loops/white-hole/WhiteHole__1bop__9.mp4":"/loops/white-hole-abstract/WhiteHole__1bop__9.mp4","/loops/white-hole/WhiteHole__37tc__40.mp4":"/loops/white-hole-abstract/WhiteHole__37tc__40.mp4","/loops/white-hole/WhiteHole__52vt__254.mp4":"/loops/white-hole-abstract/WhiteHole__52vt__254.mp4","/loops/white-hole/WhiteHole__6741__158.mp4":"/loops/white-hole-abstract/WhiteHole__6741__158.mp4","/loops/white-hole/WhiteHole__6k2b__239.mp4":"/loops/white-hole-abstract/WhiteHole__6k2b__239.mp4","/loops/white-hole/WhiteHole__7m4y__112.mp4":"/loops/white-hole-abstract/WhiteHole__7m4y__112.mp4","/loops/white-hole/WhiteHole__8ewe__238.mp4":"/loops/white-hole-abstract/WhiteHole__8ewe__238.mp4","/loops/white-hole/WhiteHole__a52v__237.mp4":"/loops/white-hole-abstract/WhiteHole__a52v__237.mp4","/loops/white-hole/WhiteHole__bzdy__172.mp4":"/loops/white-hole-abstract/WhiteHole__bzdy__172.mp4","/loops/white-hole/WhiteHole__cqkd__208.mp4":"/loops/white-hole-abstract/WhiteHole__cqkd__208.mp4","/loops/white-hole/WhiteHole__d7uc__109.mp4":"/loops/white-hole-abstract/WhiteHole__d7uc__109.mp4","/loops/white-hole/WhiteHole__h1fw__277.mp4":"/loops/white-hole-abstract/WhiteHole__h1fw__277.mp4","/loops/white-hole/WhiteHole__heur__124.mp4":"/loops/white-hole-abstract/WhiteHole__heur__124.mp4","/loops/white-hole/WhiteHole__jjlp__265.mp4":"/loops/white-hole-abstract/WhiteHole__jjlp__265.mp4","/loops/white-hole/WhiteHole__layf__150.mp4":"/loops/white-hole-abstract/WhiteHole__layf__150.mp4","/loops/white-hole/WhiteHole__n3te__263.mp4":"/loops/white-hole-abstract/WhiteHole__n3te__263.mp4","/loops/white-hole/WhiteHole__p9b8__262.mp4":"/loops/white-hole-abstract/WhiteHole__p9b8__262.mp4","/loops/white-hole/WhiteHole__qzu6__261.mp4":"/loops/white-hole-abstract/WhiteHole__qzu6__261.mp4","/loops/white-hole/WhiteHole__sc9q__46.mp4":"/loops/white-hole-abstract/WhiteHole__sc9q__46.mp4","/loops/white-hole/WhiteHole__u9gh__82.mp4":"/loops/white-hole-abstract/WhiteHole__u9gh__82.mp4","/loops/white-hole/WhiteHole__veak__245.mp4":"/loops/white-hole-abstract/WhiteHole__veak__245.mp4","/loops/white-hole/WhiteHole__ye3f__191.mp4":"/loops/white-hole-abstract/WhiteHole__ye3f__191.mp4","/loops/white-hole/WhiteHole__4ccg__159.mp4":"/loops/white-hole-fluid/WhiteHole__4ccg__159.mp4","/loops/white-hole/WhiteHole__4tbh__59.mp4":"/loops/white-hole-fluid/WhiteHole__4tbh__59.mp4","/loops/white-hole/WhiteHole__5gmf__31.mp4":"/loops/white-hole-fluid/WhiteHole__5gmf__31.mp4","/loops/white-hole/WhiteHole__5kjp__140.mp4":"/loops/white-hole-fluid/WhiteHole__5kjp__140.mp4","/loops/white-hole/WhiteHole__9fjn__173.mp4":"/loops/white-hole-fluid/WhiteHole__9fjn__173.mp4","/loops/white-hole/WhiteHole__9vn2__281.mp4":"/loops/white-hole-fluid/WhiteHole__9vn2__281.mp4","/loops/white-hole/WhiteHole__bjjd__55.mp4":"/loops/white-hole-fluid/WhiteHole__bjjd__55.mp4","/loops/white-hole/WhiteHole__db4q__286.mp4":"/loops/white-hole-fluid/WhiteHole__db4q__286.mp4","/loops/white-hole/WhiteHole__fl1c__53.mp4":"/loops/white-hole-fluid/WhiteHole__fl1c__53.mp4","/loops/white-hole/WhiteHole__gg4f__181.mp4":"/loops/white-hole-fluid/WhiteHole__gg4f__181.mp4","/loops/white-hole/WhiteHole__gtoj__134.mp4":"/loops/white-hole-fluid/WhiteHole__gtoj__134.mp4","/loops/white-hole/WhiteHole__h7z0__284.mp4":"/loops/white-hole-fluid/WhiteHole__h7z0__284.mp4","/loops/white-hole/WhiteHole__idsa__180.mp4":"/loops/white-hole-fluid/WhiteHole__idsa__180.mp4","/loops/white-hole/WhiteHole__ifq0__252.mp4":"/loops/white-hole-fluid/WhiteHole__ifq0__252.mp4","/loops/white-hole/WhiteHole__j5p2__186.mp4":"/loops/white-hole-fluid/WhiteHole__j5p2__186.mp4","/loops/white-hole/WhiteHole__jdzt__151.mp4":"/loops/white-hole-fluid/WhiteHole__jdzt__151.mp4","/loops/white-hole/WhiteHole__k3wc__179.mp4":"/loops/white-hole-fluid/WhiteHole__k3wc__179.mp4","/loops/white-hole/WhiteHole__nlxj__274.mp4":"/loops/white-hole-fluid/WhiteHole__nlxj__274.mp4","/loops/white-hole/WhiteHole__otbe__85.mp4":"/loops/white-hole-fluid/WhiteHole__otbe__85.mp4","/loops/white-hole/WhiteHole__t3dj__288.mp4":"/loops/white-hole-fluid/WhiteHole__t3dj__288.mp4","/loops/white-hole/WhiteHole__uur5__259.mp4":"/loops/white-hole-fluid/WhiteHole__uur5__259.mp4","/loops/white-hole/WhiteHole__w4uf__81.mp4":"/loops/white-hole-fluid/WhiteHole__w4uf__81.mp4","/loops/white-hole/WhiteHole__zbrt__62.mp4":"/loops/white-hole-fluid/WhiteHole__zbrt__62.mp4","/loops/white-hole/WhiteHole__1vpm__78.mp4":"/loops/white-hole-fragmented/WhiteHole__1vpm__78.mp4","/loops/white-hole/WhiteHole__2eku__190.mp4":"/loops/white-hole-fragmented/WhiteHole__2eku__190.mp4","/loops/white-hole/WhiteHole__3v6b__77.mp4":"/loops/white-hole-fragmented/WhiteHole__3v6b__77.mp4","/loops/white-hole/WhiteHole__4bq8__189.mp4":"/loops/white-hole-fragmented/WhiteHole__4bq8__189.mp4","/loops/white-hole/WhiteHole__6heh__211.mp4":"/loops/white-hole-fragmented/WhiteHole__6heh__211.mp4","/loops/white-hole/WhiteHole__ejog__207.mp4":"/loops/white-hole-fragmented/WhiteHole__ejog__207.mp4","/loops/white-hole/WhiteHole__era2__90.mp4":"/loops/white-hole-fragmented/WhiteHole__era2__90.mp4","/loops/white-hole/WhiteHole__f6bd__234.mp4":"/loops/white-hole-fragmented/WhiteHole__f6bd__234.mp4","/loops/white-hole/WhiteHole__gcb8__206.mp4":"/loops/white-hole-fragmented/WhiteHole__gcb8__206.mp4","/loops/white-hole/WhiteHole__h0d5__233.mp4":"/loops/white-hole-fragmented/WhiteHole__h0d5__233.mp4","/loops/white-hole/WhiteHole__h658__169.mp4":"/loops/white-hole-fragmented/WhiteHole__h658__169.mp4","/loops/white-hole/WhiteHole__htdo__266.mp4":"/loops/white-hole-fragmented/WhiteHole__htdo__266.mp4","/loops/white-hole/WhiteHole__iy7i__168.mp4":"/loops/white-hole-fragmented/WhiteHole__iy7i__168.mp4","/loops/white-hole/WhiteHole__lw12__250.mp4":"/loops/white-hole-fragmented/WhiteHole__lw12__250.mp4","/loops/white-hole/WhiteHole__m43q__102.mp4":"/loops/white-hole-fragmented/WhiteHole__m43q__102.mp4","/loops/white-hole/WhiteHole__m52c__201.mp4":"/loops/white-hole-fragmented/WhiteHole__m52c__201.mp4","/loops/white-hole/WhiteHole__nl34__249.mp4":"/loops/white-hole-fragmented/WhiteHole__nl34__249.mp4","/loops/white-hole/WhiteHole__o6f4__199.mp4":"/loops/white-hole-fragmented/WhiteHole__o6f4__199.mp4","/loops/white-hole/WhiteHole__sltz__146.mp4":"/loops/white-hole-fragmented/WhiteHole__sltz__146.mp4","/loops/white-hole/WhiteHole__st55__185.mp4":"/loops/white-hole-fragmented/WhiteHole__st55__185.mp4","/loops/white-hole/WhiteHole__td1k__98.mp4":"/loops/white-hole-fragmented/WhiteHole__td1k__98.mp4","/loops/white-hole/WhiteHole__u137__64.mp4":"/loops/white-hole-fragmented/WhiteHole__u137__64.mp4","/loops/white-hole/WhiteHole__wmo8__192.mp4":"/loops/white-hole-fragmented/WhiteHole__wmo8__192.mp4","/loops/white-hole/WhiteHole__xc8p__215.mp4":"/loops/white-hole-fragmented/WhiteHole__xc8p__215.mp4","/loops/white-hole/WhiteHole__xyld__80.mp4":"/loops/white-hole-fragmented/WhiteHole__xyld__80.mp4","/loops/white-hole/WhiteHole__1lid__41.mp4":"/loops/white-hole-geometric/WhiteHole__1lid__41.mp4","/loops/white-hole/WhiteHole__1xy8__287.mp4":"/loops/white-hole-geometric/WhiteHole__1xy8__287.mp4","/loops/white-hole/WhiteHole__d9xs__136.mp4":"/loops/white-hole-geometric/WhiteHole__d9xs__136.mp4","/loops/white-hole/WhiteHole__ftow__153.mp4":"/loops/white-hole-geometric/WhiteHole__ftow__153.mp4","/loops/white-hole/WhiteHole__gend__89.mp4":"/loops/white-hole-geometric/WhiteHole__gend__89.mp4","/loops/white-hole/WhiteHole__hj75__152.mp4":"/loops/white-hole-geometric/WhiteHole__hj75__152.mp4","/loops/white-hole/WhiteHole__i2ct__88.mp4":"/loops/white-hole-geometric/WhiteHole__i2ct__88.mp4","/loops/white-hole/WhiteHole__l8ja__105.mp4":"/loops/white-hole-geometric/WhiteHole__l8ja__105.mp4","/loops/white-hole/WhiteHole__ls15__275.mp4":"/loops/white-hole-geometric/WhiteHole__ls15__275.mp4","/loops/white-hole/WhiteHole__nam3__104.mp4":"/loops/white-hole-geometric/WhiteHole__nam3__104.mp4","/loops/white-hole/WhiteHole__pnfm__176.mp4":"/loops/white-hole-geometric/WhiteHole__pnfm__176.mp4","/loops/white-hole/WhiteHole__qgox__84.mp4":"/loops/white-hole-geometric/WhiteHole__qgox__84.mp4","/loops/white-hole/WhiteHole__rh23__175.mp4":"/loops/white-hole-geometric/WhiteHole__rh23__175.mp4","/loops/white-hole/WhiteHole__sgc7__83.mp4":"/loops/white-hole-geometric/WhiteHole__sgc7__83.mp4","/loops/white-hole/WhiteHole__stks__217.mp4":"/loops/white-hole-geometric/WhiteHole__stks__217.mp4","/loops/white-hole/WhiteHole__v4rl__216.mp4":"/loops/white-hole-geometric/WhiteHole__v4rl__216.mp4","/loops/white-hole/WhiteHole__y253__43.mp4":"/loops/white-hole-geometric/WhiteHole__y253__43.mp4","/loops/white-hole/WhiteHole__03i7__79.mp4":"/loops/white-hole-grid/WhiteHole__03i7__79.mp4","/loops/white-hole/WhiteHole__2okv__241.mp4":"/loops/white-hole-grid/WhiteHole__2okv__241.mp4","/loops/white-hole/WhiteHole__5hxl__221.mp4":"/loops/white-hole-grid/WhiteHole__5hxl__221.mp4","/loops/white-hole/WhiteHole__9hzc__138.mp4":"/loops/white-hole-grid/WhiteHole__9hzc__138.mp4","/loops/white-hole/WhiteHole__b9z1__137.mp4":"/loops/white-hole-grid/WhiteHole__b9z1__137.mp4","/loops/white-hole/WhiteHole__dqr6__171.mp4":"/loops/white-hole-grid/WhiteHole__dqr6__171.mp4","/loops/white-hole/WhiteHole__jqjt__70.mp4":"/loops/white-hole-grid/WhiteHole__jqjt__70.mp4","/loops/white-hole/WhiteHole__lipz__69.mp4":"/loops/white-hole-grid/WhiteHole__lipz__69.mp4","/loops/white-hole/WhiteHole__lzn7__178.mp4":"/loops/white-hole-grid/WhiteHole__lzn7__178.mp4","/loops/white-hole/WhiteHole__nxyc__101.mp4":"/loops/white-hole-grid/WhiteHole__nxyc__101.mp4","/loops/white-hole/WhiteHole__t227__119.mp4":"/loops/white-hole-grid/WhiteHole__t227__119.mp4","/loops/white-hole/WhiteHole__vx95__44.mp4":"/loops/white-hole-grid/WhiteHole__vx95__44.mp4","/loops/white-hole/WhiteHole__wugj__225.mp4":"/loops/white-hole-grid/WhiteHole__wugj__225.mp4","/loops/white-hole/WhiteHole__5s41__113.mp4":"/loops/white-hole-metallic/WhiteHole__5s41__113.mp4","/loops/white-hole/WhiteHole__80d1__282.mp4":"/loops/white-hole-metallic/WhiteHole__80d1__282.mp4","/loops/white-hole/WhiteHole__8g7i__210.mp4":"/loops/white-hole-metallic/WhiteHole__8g7i__210.mp4","/loops/white-hole/WhiteHole__fcfc__220.mp4":"/loops/white-hole-metallic/WhiteHole__fcfc__220.mp4","/loops/white-hole/WhiteHole__nen8__200.mp4":"/loops/white-hole-metallic/WhiteHole__nen8__200.mp4","/loops/white-hole/WhiteHole__olyc__67.mp4":"/loops/white-hole-metallic/WhiteHole__olyc__67.mp4","/loops/white-hole/WhiteHole__v2bk__270.mp4":"/loops/white-hole-metallic/WhiteHole__v2bk__270.mp4","/loops/white-hole/WhiteHole__vu3c__63.mp4":"/loops/white-hole-metallic/WhiteHole__vu3c__63.mp4","/loops/white-hole/WhiteHole__zko0__214.mp4":"/loops/white-hole-metallic/WhiteHole__zko0__214.mp4","/loops/white-hole/WhiteHole__0r85__161.mp4":"/loops/white-hole-nature/WhiteHole__0r85__161.mp4","/loops/white-hole/WhiteHole__1x10__142.mp4":"/loops/white-hole-nature/WhiteHole__1x10__142.mp4","/loops/white-hole/WhiteHole__2j39__160.mp4":"/loops/white-hole-nature/WhiteHole__2j39__160.mp4","/loops/white-hole/WhiteHole__3n9d__141.mp4":"/loops/white-hole-nature/WhiteHole__3n9d__141.mp4","/loops/white-hole/WhiteHole__6ezj__58.mp4":"/loops/white-hole-nature/WhiteHole__6ezj__58.mp4","/loops/white-hole/WhiteHole__8578__57.mp4":"/loops/white-hole-nature/WhiteHole__8578__57.mp4","/loops/white-hole/WhiteHole__8fx6__30.mp4":"/loops/white-hole-nature/WhiteHole__8fx6__30.mp4","/loops/white-hole/WhiteHole__cazf__73.mp4":"/loops/white-hole-nature/WhiteHole__cazf__73.mp4","/loops/white-hole/WhiteHole__couv__29.mp4":"/loops/white-hole-nature/WhiteHole__couv__29.mp4","/loops/white-hole/WhiteHole__d3aq__91.mp4":"/loops/white-hole-nature/WhiteHole__d3aq__91.mp4","/loops/white-hole/WhiteHole__e7r8__72.mp4":"/loops/white-hole-nature/WhiteHole__e7r8__72.mp4","/loops/white-hole/WhiteHole__g4uo__15.mp4":"/loops/white-hole-nature/WhiteHole__g4uo__15.mp4","/loops/white-hole/WhiteHole__hwof__14.mp4":"/loops/white-hole-nature/WhiteHole__hwof__14.mp4","/loops/white-hole/WhiteHole__iw2t__27.mp4":"/loops/white-hole-nature/WhiteHole__iw2t__27.mp4","/loops/white-hole/WhiteHole__rlpc__25.mp4":"/loops/white-hole-nature/WhiteHole__rlpc__25.mp4","/loops/white-hole/WhiteHole__rq01__12.mp4":"/loops/white-hole-nature/WhiteHole__rq01__12.mp4","/loops/white-hole/WhiteHole__sqhk__5.mp4":"/loops/white-hole-nature/WhiteHole__sqhk__5.mp4","/loops/white-hole/WhiteHole__sv5a__34.mp4":"/loops/white-hole-nature/WhiteHole__sv5a__34.mp4","/loops/white-hole/WhiteHole__ysyi__21.mp4":"/loops/white-hole-nature/WhiteHole__ysyi__21.mp4","/loops/white-hole/WhiteHole__0vpj__242.mp4":"/loops/white-hole-organic/WhiteHole__0vpj__242.mp4","/loops/white-hole/WhiteHole__6oee__38.mp4":"/loops/white-hole-organic/WhiteHole__6oee__38.mp4","/loops/white-hole/WhiteHole__8pko__37.mp4":"/loops/white-hole-organic/WhiteHole__8pko__37.mp4","/loops/white-hole/WhiteHole__9bnl__93.mp4":"/loops/white-hole-organic/WhiteHole__9bnl__93.mp4","/loops/white-hole/WhiteHole__an2d__209.mp4":"/loops/white-hole-organic/WhiteHole__an2d__209.mp4","/loops/white-hole/WhiteHole__d0v1__126.mp4":"/loops/white-hole-organic/WhiteHole__d0v1__126.mp4","/loops/white-hole/WhiteHole__f1vx__285.mp4":"/loops/white-hole-organic/WhiteHole__f1vx__285.mp4","/loops/white-hole/WhiteHole__f8iw__125.mp4":"/loops/white-hole-organic/WhiteHole__f8iw__125.mp4","/loops/white-hole/WhiteHole__htz3__107.mp4":"/loops/white-hole-organic/WhiteHole__htz3__107.mp4","/loops/white-hole/WhiteHole__j4xi__283.mp4":"/loops/white-hole-organic/WhiteHole__j4xi__283.mp4","/loops/white-hole/WhiteHole__jjw7__106.mp4":"/loops/white-hole-organic/WhiteHole__jjw7__106.mp4","/loops/white-hole/WhiteHole__k79t__251.mp4":"/loops/white-hole-organic/WhiteHole__k79t__251.mp4","/loops/white-hole/WhiteHole__kuta__132.mp4":"/loops/white-hole-organic/WhiteHole__kuta__132.mp4","/loops/white-hole/WhiteHole__ll5j__122.mp4":"/loops/white-hole-organic/WhiteHole__ll5j__122.mp4","/loops/white-hole/WhiteHole__moup__230.mp4":"/loops/white-hole-organic/WhiteHole__moup__230.mp4","/loops/white-hole/WhiteHole__mqfv__49.mp4":"/loops/white-hole-organic/WhiteHole__mqfv__49.mp4","/loops/white-hole/WhiteHole__n15r__167.mp4":"/loops/white-hole-organic/WhiteHole__n15r__167.mp4","/loops/white-hole/WhiteHole__ni61__97.mp4":"/loops/white-hole-organic/WhiteHole__ni61__97.mp4","/loops/white-hole/WhiteHole__pgxx__273.mp4":"/loops/white-hole-organic/WhiteHole__pgxx__273.mp4","/loops/white-hole/WhiteHole__qasj__66.mp4":"/loops/white-hole-organic/WhiteHole__qasj__66.mp4","/loops/white-hole/WhiteHole__s2yd__65.mp4":"/loops/white-hole-organic/WhiteHole__s2yd__65.mp4","/loops/white-hole/WhiteHole__tmfh__246.mp4":"/loops/white-hole-organic/WhiteHole__tmfh__246.mp4","/loops/white-hole/WhiteHole__v0ld__226.mp4":"/loops/white-hole-organic/WhiteHole__v0ld__226.mp4","/loops/white-hole/WhiteHole__x4y9__163.mp4":"/loops/white-hole-organic/WhiteHole__x4y9__163.mp4","/loops/white-hole/WhiteHole__yxgw__162.mp4":"/loops/white-hole-organic/WhiteHole__yxgw__162.mp4","/loops/white-hole/WhiteHole__zmig__96.mp4":"/loops/white-hole-organic/WhiteHole__zmig__96.mp4","/loops/white-hole/WhiteHole__01ef__143.mp4":"/loops/white-hole-particles/WhiteHole__01ef__143.mp4","/loops/white-hole/WhiteHole__9aap__75.mp4":"/loops/white-hole-particles/WhiteHole__9aap__75.mp4","/loops/white-hole/WhiteHole__annw__74.mp4":"/loops/white-hole-particles/WhiteHole__annw__74.mp4","/loops/white-hole/WhiteHole__bnd7__17.mp4":"/loops/white-hole-particles/WhiteHole__bnd7__17.mp4","/loops/white-hole/WhiteHole__dm9g__54.mp4":"/loops/white-hole-particles/WhiteHole__dm9g__54.mp4","/loops/white-hole/WhiteHole__efqi__28.mp4":"/loops/white-hole-particles/WhiteHole__efqi__28.mp4","/loops/white-hole/WhiteHole__f77w__278.mp4":"/loops/white-hole-particles/WhiteHole__f77w__278.mp4","/loops/white-hole/WhiteHole__f9kt__108.mp4":"/loops/white-hole-particles/WhiteHole__f9kt__108.mp4","/loops/white-hole/WhiteHole__k19v__203.mp4":"/loops/white-hole-particles/WhiteHole__k19v__203.mp4","/loops/white-hole/WhiteHole__kuf6__231.mp4":"/loops/white-hole-particles/WhiteHole__kuf6__231.mp4","/loops/white-hole/WhiteHole__l3wf__50.mp4":"/loops/white-hole-particles/WhiteHole__l3wf__50.mp4","/loops/white-hole/WhiteHole__oj3s__131.mp4":"/loops/white-hole-particles/WhiteHole__oj3s__131.mp4","/loops/white-hole/WhiteHole__p4xy__166.mp4":"/loops/white-hole-particles/WhiteHole__p4xy__166.mp4","/loops/white-hole/WhiteHole__qzqx__165.mp4":"/loops/white-hole-particles/WhiteHole__qzqx__165.mp4","/loops/white-hole/WhiteHole__u8kb__128.mp4":"/loops/white-hole-particles/WhiteHole__u8kb__128.mp4","/loops/white-hole/WhiteHole__ultv__193.mp4":"/loops/white-hole-particles/WhiteHole__ultv__193.mp4","/loops/white-hole/WhiteHole__w2sg__127.mp4":"/loops/white-hole-particles/WhiteHole__w2sg__127.mp4","/loops/white-hole/WhiteHole__wxak__269.mp4":"/loops/white-hole-particles/WhiteHole__wxak__269.mp4","/loops/white-hole/WhiteHole__y9xf__144.mp4":"/loops/white-hole-particles/WhiteHole__y9xf__144.mp4","/loops/white-hole/WhiteHole__p3at__188.mp4":"/loops/white-hole-radial-02/WhiteHole__p3at__188.mp4","/loops/white-hole/WhiteHole__pgzf__198.mp4":"/loops/white-hole-radial-02/WhiteHole__pgzf__198.mp4","/loops/white-hole/WhiteHole__pmpg__248.mp4":"/loops/white-hole-radial-02/WhiteHole__pmpg__248.mp4","/loops/white-hole/WhiteHole__qhfr__197.mp4":"/loops/white-hole-radial-02/WhiteHole__qhfr__197.mp4","/loops/white-hole/WhiteHole__ro0c__99.mp4":"/loops/white-hole-radial-02/WhiteHole__ro0c__99.mp4","/loops/white-hole/WhiteHole__ro5j__247.mp4":"/loops/white-hole-radial-02/WhiteHole__ro5j__247.mp4","/loops/white-hole/WhiteHole__sa4a__195.mp4":"/loops/white-hole-radial-02/WhiteHole__sa4a__195.mp4","/loops/white-hole/WhiteHole__utv5__23.mp4":"/loops/white-hole-radial-02/WhiteHole__utv5__23.mp4","/loops/white-hole/WhiteHole__uzpq__184.mp4":"/loops/white-hole-radial-02/WhiteHole__uzpq__184.mp4","/loops/white-hole/WhiteHole__v4c4__118.mp4":"/loops/white-hole-radial-02/WhiteHole__v4c4__118.mp4","/loops/white-hole/WhiteHole__wst9__117.mp4":"/loops/white-hole-radial-02/WhiteHole__wst9__117.mp4","/loops/white-hole/WhiteHole__wzac__183.mp4":"/loops/white-hole-radial-02/WhiteHole__wzac__183.mp4","/loops/white-hole/WhiteHole__xk12__22.mp4":"/loops/white-hole-radial-02/WhiteHole__xk12__22.mp4","/loops/white-hole/WhiteHole__zs2x__42.mp4":"/loops/white-hole-radial-02/WhiteHole__zs2x__42.mp4","/loops/white-hole/WhiteHole__14nf__32.mp4":"/loops/white-hole-reflections/WhiteHole__14nf__32.mp4","/loops/white-hole/WhiteHole__8c7t__18.mp4":"/loops/white-hole-reflections/WhiteHole__8c7t__18.mp4","/loops/white-hole/WhiteHole__b5pk__92.mp4":"/loops/white-hole-reflections/WhiteHole__b5pk__92.mp4","/loops/white-hole/WhiteHole__bq9o__280.mp4":"/loops/white-hole-reflections/WhiteHole__bq9o__280.mp4","/loops/white-hole/WhiteHole__c7ri__155.mp4":"/loops/white-hole-reflections/WhiteHole__c7ri__155.mp4","/loops/white-hole/WhiteHole__dk9k__279.mp4":"/loops/white-hole-reflections/WhiteHole__dk9k__279.mp4","/loops/white-hole/WhiteHole__imaq__133.mp4":"/loops/white-hole-reflections/WhiteHole__imaq__133.mp4","/loops/white-hole/WhiteHole__t6rw__260.mp4":"/loops/white-hole-reflections/WhiteHole__t6rw__260.mp4","/loops/white-hole/WhiteHole__whaq__11.mp4":"/loops/white-hole-reflections/WhiteHole__whaq__11.mp4","/loops/white-hole/WhiteHole__yr3o__268.mp4":"/loops/white-hole-reflections/WhiteHole__yr3o__268.mp4","/loops/white-hole/WhiteHole__0uvt__223.mp4":"/loops/white-hole-swirling/WhiteHole__0uvt__223.mp4","/loops/white-hole/WhiteHole__1a9v__256.mp4":"/loops/white-hole-swirling/WhiteHole__1a9v__256.mp4","/loops/white-hole/WhiteHole__1db4__115.mp4":"/loops/white-hole-swirling/WhiteHole__1db4__115.mp4","/loops/white-hole/WhiteHole__24lr__213.mp4":"/loops/white-hole-swirling/WhiteHole__24lr__213.mp4","/loops/white-hole/WhiteHole__3deg__222.mp4":"/loops/white-hole-swirling/WhiteHole__3deg__222.mp4","/loops/white-hole/WhiteHole__3iny__94.mp4":"/loops/white-hole-swirling/WhiteHole__3iny__94.mp4","/loops/white-hole/WhiteHole__4ibk__240.mp4":"/loops/white-hole-swirling/WhiteHole__4ibk__240.mp4","/loops/white-hole/WhiteHole__7lf5__139.mp4":"/loops/white-hole-swirling/WhiteHole__7lf5__139.mp4","/loops/white-hole/WhiteHole__a8pp__156.mp4":"/loops/white-hole-swirling/WhiteHole__a8pp__156.mp4","/loops/white-hole/WhiteHole__bh40__236.mp4":"/loops/white-hole-swirling/WhiteHole__bh40__236.mp4","/loops/white-hole/WhiteHole__dcs8__16.mp4":"/loops/white-hole-swirling/WhiteHole__dcs8__16.mp4","/loops/white-hole/WhiteHole__g08q__71.mp4":"/loops/white-hole-swirling/WhiteHole__g08q__71.mp4","/loops/white-hole/WhiteHole__nreo__177.mp4":"/loops/white-hole-swirling/WhiteHole__nreo__177.mp4","/loops/white-hole/WhiteHole__o2t5__6.mp4":"/loops/white-hole-swirling/WhiteHole__o2t5__6.mp4","/loops/white-hole/WhiteHole__qk6l__228.mp4":"/loops/white-hole-swirling/WhiteHole__qk6l__228.mp4","/loops/white-hole/WhiteHole__qsty__147.mp4":"/loops/white-hole-swirling/WhiteHole__qsty__147.mp4","/loops/white-hole/WhiteHole__r60m__196.mp4":"/loops/white-hole-swirling/WhiteHole__r60m__196.mp4","/loops/white-hole/WhiteHole__sfxg__227.mp4":"/loops/white-hole-swirling/WhiteHole__sfxg__227.mp4","/loops/white-hole/WhiteHole__t122__164.mp4":"/loops/white-hole-swirling/WhiteHole__t122__164.mp4","/loops/white-hole/WhiteHole__t1m5__194.mp4":"/loops/white-hole-swirling/WhiteHole__t1m5__194.mp4","/loops/white-hole/WhiteHole__u3a2__45.mp4":"/loops/white-hole-swirling/WhiteHole__u3a2__45.mp4","/loops/white-hole/WhiteHole__uiy0__145.mp4":"/loops/white-hole-swirling/WhiteHole__uiy0__145.mp4","/loops/white-hole/WhiteHole__x3de__244.mp4":"/loops/white-hole-swirling/WhiteHole__x3de__244.mp4","/loops/white-hole/WhiteHole__yqs9__224.mp4":"/loops/white-hole-swirling/WhiteHole__yqs9__224.mp4","/loops/white-hole/WhiteHole__yu83__243.mp4":"/loops/white-hole-swirling/WhiteHole__yu83__243.mp4","/loops/white-hole/WhiteHole__5ed2__8.mp4":"/loops/white-hole-topographical/WhiteHole__5ed2__8.mp4","/loops/white-hole/WhiteHole__9rq1__2.mp4":"/loops/white-hole-topographical/WhiteHole__9rq1__2.mp4","/loops/white-hole/WhiteHole__h1b7__219.mp4":"/loops/white-hole-topographical/WhiteHole__h1b7__219.mp4","/loops/white-hole/WhiteHole__oemk__48.mp4":"/loops/white-hole-topographical/WhiteHole__oemk__48.mp4","/loops/white-hole/WhiteHole__ouun__148.mp4":"/loops/white-hole-topographical/WhiteHole__ouun__148.mp4","/loops/white-hole/WhiteHole__prcx__100.mp4":"/loops/white-hole-topographical/WhiteHole__prcx__100.mp4","/loops/white-hole/WhiteHole__tb1l__271.mp4":"/loops/white-hole-topographical/WhiteHole__tb1l__271.mp4","/loops/white-hole/WhiteHole__uhp4__33.mp4":"/loops/white-hole-topographical/WhiteHole__uhp4__33.mp4","/loops/white-hole/WhiteHole__xklc__174.mp4":"/loops/white-hole-topographical/WhiteHole__xklc__174.mp4","/loops/white-hole/WhiteHole__y2io__10.mp4":"/loops/white-hole-topographical/WhiteHole__y2io__10.mp4","/loops/white-hole/WhiteHole__yzgc__116.mp4":"/loops/white-hole-topographical/WhiteHole__yzgc__116.mp4","/loops/white-hole/WhiteHole__5xre__13.mp4":"/loops/white-hole-undulating/WhiteHole__5xre__13.mp4","/loops/white-hole/WhiteHole__6o8d__19.mp4":"/loops/white-hole-undulating/WhiteHole__6o8d__19.mp4","/loops/white-hole/WhiteHole__6tq5__253.mp4":"/loops/white-hole-undulating/WhiteHole__6tq5__253.mp4","/loops/white-hole/WhiteHole__6zrn__7.mp4":"/loops/white-hole-undulating/WhiteHole__6zrn__7.mp4","/loops/white-hole/WhiteHole__dfsp__235.mp4":"/loops/white-hole-undulating/WhiteHole__dfsp__235.mp4","/loops/white-hole/WhiteHole__e9f2__3.mp4":"/loops/white-hole-undulating/WhiteHole__e9f2__3.mp4","/loops/white-hole/WhiteHole__f938__170.mp4":"/loops/white-hole-undulating/WhiteHole__f938__170.mp4","/loops/white-hole/WhiteHole__hizi__52.mp4":"/loops/white-hole-undulating/WhiteHole__hizi__52.mp4","/loops/white-hole/WhiteHole__j5td__51.mp4":"/loops/white-hole-undulating/WhiteHole__j5td__51.mp4","/loops/white-hole/WhiteHole__ophc__229.mp4":"/loops/white-hole-undulating/WhiteHole__ophc__229.mp4","/loops/white-hole/WhiteHole__ovwu__26.mp4":"/loops/white-hole-undulating/WhiteHole__ovwu__26.mp4","/loops/white-hole/WhiteHole__q83z__47.mp4":"/loops/white-hole-undulating/WhiteHole__q83z__47.mp4","/loops/white-hole/WhiteHole__rbst__120.mp4":"/loops/white-hole-undulating/WhiteHole__rbst__120.mp4","/loops/white-hole/WhiteHole__rfvu__272.mp4":"/loops/white-hole-undulating/WhiteHole__rfvu__272.mp4","/loops/white-hole/WhiteHole__t5ki__24.mp4":"/loops/white-hole-undulating/WhiteHole__t5ki__24.mp4","/loops/white-hole/WhiteHole__wo43__258.mp4":"/loops/white-hole-undulating/WhiteHole__wo43__258.mp4","/loops/white-hole/WhiteHole__ylks__257.mp4":"/loops/white-hole-undulating/WhiteHole__ylks__257.mp4"};u();u();u();u();var ws=[{folder:"cosmic-fest"},{folder:"cosmic-fest-part2"},{folder:"trip-70s"},{folder:"geometrics"},{folder:"urban"},{folder:"watching-you"},{folder:"birds"},{folder:"bauhauss"},{folder:"explosion"},{folder:"flowers"},{folder:"dev-tools"},{folder:"cymatics"},{folder:"point-cloud-geometric"},{folder:"point-cloud-particles"},{folder:"point-cloud-swirling-02"},{folder:"point-cloud-undulating"},{folder:"white-hole-abstract"},{folder:"white-hole-fluid"},{folder:"white-hole-fragmented"},{folder:"white-hole-geometric"},{folder:"white-hole-grid"},{folder:"white-hole-metallic"},{folder:"white-hole-nature"},{folder:"white-hole-organic"},{folder:"white-hole-particles"},{folder:"white-hole-radial-02"},{folder:"white-hole-reflections"},{folder:"white-hole-swirling"},{folder:"white-hole-topographical"},{folder:"white-hole-undulating"},{folder:"alien"},{folder:"lava-lamp"},{folder:"slim-mold"},{folder:"suminagashi"},{folder:"infamous-inflate"},{folder:"oscilloscope"},{folder:"iridescent"},{folder:"patterns"},{folder:"silent-caustics"},{folder:"cloud-composition"},{folder:"liminal-spaces"},{folder:"behind-screen"},{folder:"concrete-jungle"},{folder:"dune-calor"},{folder:"obsidian-iris"},{folder:"stripe-resonance"},{folder:"liquid-metal"},{folder:"rainy-city-night"},{folder:"cosmodernism"},{folder:"fire-sparkles"},{folder:"obsidian-tide"},{folder:"hex-skull"},{folder:"point-cloud"},{folder:"white-hole"},{folder:"kissing"},{folder:"parvagues"},{folder:"slopmotion"},{folder:"test-2"},{folder:"test-workflow"},{folder:"workflow-test"},{folder:"rock-solid"}];u();var Xg=[];var Uo="/loops/",As={may:"point-cloud","point-waves":"point-cloud","pointcloud-waves-demo":"point-cloud","VEO-incoming":"white-hole"},jg=[e=>/^VEO-/i.test(e)||/^veo_/i.test(e),e=>/april/i.test(e),e=>/^000_White-Hole/i.test(e)||/^000_white_hole/i.test(e)],nw=[e=>e.startsWith("VEO-"),e=>e.startsWith("pointcloud-"),e=>e.toLowerCase().includes("pointcloud"),e=>e.startsWith("WhiteHole"),e=>e.startsWith("bw-"),e=>e.startsWith("PC-"),e=>e.startsWith("00_")],Yg=[[/^\/loops\/may\//,"/loops/point-cloud/"],[/^\/loops\/pointcloud-waves-demo\//,"/loops/point-cloud/"],[/^\/loops\/point-waves\//,"/loops/point-cloud/"],[/^\/loops\/may-frames\//,"/loops/point-cloud/"],[/^\/loops\/pointcloud-waves-demo-frames\//,"/loops/point-cloud/"],[/^\/loops\/point-waves-frames\//,"/loops/point-cloud/"],[/^\/loops\/white-hole-frames\//,"/loops/white-hole/"],[/^\/loops\/WhiteHole2-frames\//,"/loops/white-hole/"],[/^\/loops\/WhiteHole3-frames\//,"/loops/white-hole/"],[/^\/loops\/VEO-April-frames\//,"/loops/white-hole/"],[/^\/loops\/VEO-April2-frames\//,"/loops/white-hole/"],[/^\/loops\/VEO-OceanLoops-frames\//,"/loops/white-hole/"],[/^\/loops\/VEO-Tignes-frames\//,"/loops/white-hole/"],[/^\/loops\/PC-WaterPointcloud-BW-frames\//,"/loops/point-cloud/"],[/^\/loops\/bw-pointcloud-water-frames\//,"/loops/point-cloud/"],[/^\/loops\/bw-pulse-water-frames\//,"/loops/point-cloud/"],[/^\/loops\/parvagues-frames\//,"/loops/parvagues/"],[/^\/loops\/archive\/(\d{2}-[^/]+-frames)\//,"/loops/point-cloud/"],[/^\/loops\/(\d{2}-[^/]+-frames)\//,"/loops/point-cloud/"],[/^\/loops\/archive\/may__/,"/loops/point-cloud/"],[/^\/loops\/archive\/pointcloud-waves-demo__/,"/loops/point-cloud/"]];function ow(){let e=new Set;for(let t of ws)t.folder&&e.add(t.folder);for(let t of Xg)t.folder&&e.add(t.folder);for(let t of Object.values(As))e.add(t);return e}var aw=ow();function lp(e){return!e||e==="archive"||e.endsWith("-frames")?!1:As[e]||aw.has(e)?!0:nw.some(t=>t(e))}function qg(e){return!lp(e)}function iw(e){let t=e;for(let[r,n]of Yg)t=t.replace(r,n);return t}function Kg(e){if(!e.startsWith(Uo))return null;let t=e.slice(Uo.length),r=t.indexOf("/");return r<=0?null:t.slice(0,r)}function Qg(e){if(typeof e!="string"||!e.startsWith(Uo)||e.startsWith("/loops/archive/"))return e;let t=Kg(e),r=t?e.slice(`${Uo}${t}/`.length):"";if(!t||!r||!qg(t))return e;let n=t.replace(/[^\w.-]+/g,"_");return`${Uo}archive/${n}__${r}`}function cp(e){return typeof e!="string"?e:iw(e)}function Zg(e){if(typeof e!="string")return e;let t=Kg(e);return t&&As[t]?e.replace(new RegExp(`^${Uo}${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}/`),`${Uo}${As[t]}/`):e}function Jg(e){if(typeof e!="string"||!e.startsWith("/loops/archive/"))return e;let t=e.slice(15);return jg.some(r=>r(t))?`/loops/white-hole/${t}`:e}function ec(e){if(typeof e!="string"||!e.startsWith("/loops/archive/"))return e;let t=e.slice(15),r=t.indexOf("__");if(r<=0)return e;let n=t.slice(0,r),o=t.slice(r+2);return lp(n)?`${Uo}${n}/${o}`:e}function ra(e){let t=typeof e=="string"&&e in sp?sp[e]:e,r=ec(t);return cp(Qg(Jg(Zg(cp(r)))))}u();u();var up=8;function fp(e,t=up){if(!Number.isFinite(e)||e<=0)return 1/0;let r=e/t;return r<1.25?1.25*3:r}function mr(e,t){return typeof e!="string"||typeof t!="string"||!e||!t?!1:e===t?!0:ra(e)===ra(t)}function tc(e,t){if(!t||!Array.isArray(e))return null;for(let r of e){let n=r?.path;if(!(typeof n!="string"||!n)&&mr(t,n))return n}return null}function pp(e,t){let r=t.filter(l=>typeof l=="string"&&l.length>0);if(r.length===0)return{next:null,prev:null};let n=typeof e=="string"?e:"",o=-1;if(n&&(o=r.findIndex(l=>mr(l,n))),o===-1)return{next:r[0],prev:r[r.length-1]};let i=(o+1)%r.length,s=(o-1+r.length)%r.length;return{next:r[i],prev:r[s]}}function eb(e){return e.includes("/loops/archive/")?1:0}function lw(e){if(!e.startsWith("/loops/archive/"))return e;let t=e.slice(15),r=t.indexOf("__");if(r<=0)return e;let n=t.slice(0,r),o=t.slice(r+2);return!n||!o||n.endsWith("-frames")?e:`/loops/${n}/${o}`}function tb(e){if(!e||typeof e!="string"||!e.startsWith("/"))return[];let t=[],r=n=>{n.startsWith("/")&&!t.includes(n)&&t.push(n)};return r(e),r(ec(e)),r(lw(e)),r(ra(e)),t.toSorted((n,o)=>eb(n)-eb(o)).map(n=>Ls(n))}u();u();u();u();u();var rb="::base",dp="::enabled",nb="::param:";function mp(e){return`${e}${dp}`}function bi(e){if(e.endsWith(dp))return{effectKey:e.slice(0,-dp.length),paramKey:null,enabledToggle:!0};if(e.endsWith(rb))return{effectKey:e.slice(0,-rb.length),paramKey:null};let t=e.indexOf(nb);if(t===-1)return null;let r=e.slice(t+nb.length);return r?{effectKey:e.slice(0,t),paramKey:r}:null}var cw=[...io,...Xn],F4=new Map(cw.map(e=>[e.key,e]));function ob(e){return`${jn}${e}`}u();var uw="pad.bottom";var hp="scene.slot.";function ib(e){return e<0||e>=6?null:`${uw}.${2+e}`}function gp(e){if(e<0||e>=16)return null;let t=4+e%4;return`grid.${4+Math.floor(e/4)}.${t}`}var sb=Array.from({length:16},(e,t)=>gp(t));function Cs(e){if(!e.startsWith(hp))return!1;let t=Number(e.slice(hp.length));return Number.isInteger(t)&&t>=0&&t<16}function lb(e){return`${hp}${e}`}var cb=0,dw={videoSpeed:4,autoMix:5,transition:6,colorAdjust:7},yp=ds;function ub(e){return So(e)}var mw=4,bp=4,hw=mw*bp,gw="pad.top",bw=8,yw=Array.from({length:bw},(e,t)=>`${gw}.${t}`);function fb(e){let t=dw[e];return t==null?null:`grid.${cb}.${t}`}function xw(e){let t=yp[e];return fb(t)??`grid.${cb}.4`}var vw=yp.map((e,t)=>xw(t));function _w(e){return e.filter(t=>t&&!So(t))}function Sw(e){return ob(mp(e))}function xp(e){if(!e?.startsWith(jn))return null;let t=bi(e.slice(jn.length));return t?.enabledToggle?t.effectKey:null}function Tw(e){let t=e%bp;return`grid.${Math.floor(e/bp)}.${t}`}var pb=Array.from({length:hw},(e,t)=>Tw(t));function db(e){return{action:Sw(e),mode:"toggle",ledStyle:"state"}}function mb(e){for(let t of pb){let r=xp(e[t]?.action);r&&ub(r)&&(e[t]={action:""})}}function Mw(e){let t=new Set(sb),r=new Set(vw);for(let n=0;n<8;n++)for(let o=0;o<8;o++){let i=`grid.${n}.${o}`;if(t.has(i)||r.has(i))continue;let s=e[i]?.action;if(!s)continue;let l=xp(s);l&&ub(l)&&(e[i]={action:""}),Cs(s)&&(e[i]={action:""})}}function hb(e){Mw(e);for(let t of yp){let r=fb(t);r&&(e[r]=db(t))}}function gb(e){return{action:lb(e),mode:"momentary",ledStyle:"accent"}}function bb(e,t){for(let r=0;r<16;r++){let n=gp(r);n&&(e[n]=gb(r))}}function yb(e,t){for(let r=0;r<6;r++){let n=ib(r);n&&(e[n]=gb(r))}}function xb(e,t,r){let n=_w(r);for(let o=0;o<t.length;o++){let i=t[o];o<n.length?e[i]=db(n[o]):xp(e[i]?.action)&&(e[i]={action:""})}}function vb(e,t){xb(e,pb,t)}function _b(e,t){xb(e,yw,t)}u();var Lw=["side.sendUp","side.sendDown","side.trackLeft"],ww=["ui.panel.audio","ui.panel.video","ui.panel.menu"],Aw=["side.scene1","side.scene2","side.scene3"];function Cw(e){return{action:e,mode:"momentary",ledStyle:"accent"}}function Sb(e,t){for(let r=0;r<t.length;r++)e[t[r]]=Cw(ww[r])}function Tb(e){Sb(e,Lw)}function Mb(e){Sb(e,Aw)}u();var Lb="preset.slot.",Ew="preset.padPrev",Rw="preset.padNext";function vp(e){let t=e%4;return`grid.${4+Math.floor(e/4)}.${t}`}var Y4=Array.from({length:16},(e,t)=>vp(t));function _p(e){if(e===Ew||e===Rw)return!0;if(!e.startsWith(Lb))return!1;let t=Number(e.slice(Lb.length));return Number.isInteger(t)&&t>=0&&t<16}var jn="fx:";function wb(e){return e.startsWith("knob.")||e.startsWith("wheel.")?"knob":e.startsWith("fader.")?"fader":e.startsWith("pad.")||e.startsWith("grid.")?"pad":"side"}function kw(e,t){if(!e||_p(e)||Cs(e))return"momentary";if((e.startsWith(jn)?e.slice(jn.length):"").endsWith("::enabled")||e==="video.togglePlay"||e==="ui.toggleZen")return"toggle";if(e==="video.next"||e==="video.prev"||e==="ui.panel.audio"||e==="ui.panel.video"||e==="ui.panel.menu")return"momentary";if(e.startsWith(jn)){let n=wb(t);return n==="knob"||n==="fader"?"value":"momentary"}return e.startsWith("global.")?"value":"momentary"}function Pw(e,t,r){if(!e.startsWith(jn))return r;let n=bi(e.slice(jn.length));if(!n||n.enabledToggle)return r;let o=wb(t);return o==="knob"||o==="fader"?"value":r}function Sp(e,t){let r={action:""};if(!e||typeof e!="object")return r;let n=e,o=typeof n.action=="string"?n.action:"",i=Dw(o)?o:"",s=n.mode,l=s==="value"||s==="toggle"||s==="momentary"||s==="pushPull"?s:kw(i,t),p=typeof n.min=="number"&&Number.isFinite(n.min)?n.min:void 0,d=typeof n.max=="number"&&Number.isFinite(n.max)?n.max:void 0,v=typeof n.step=="number"&&Number.isFinite(n.step)&&n.step>0?n.step:void 0,H=typeof n.ledFeedback=="boolean"?n.ledFeedback:void 0,D=n.ledStyle,O=D==="auto"||D==="state"||D==="accent"?D:void 0;return{action:i,mode:Pw(i,t,l),min:p,max:d,step:v,ledFeedback:H,ledStyle:O}}var Fw=[{value:"",label:"\u2014",compact:""},{value:"global.bpm",label:"BPM",compact:"BPM"},{value:"global.inputGain",label:"Input gain",compact:"In gain"},{value:"global.inputMultiplier",label:"Trigger scale",compact:"Trig \xD7"},{value:"video.next",label:"Playset: next clip",compact:"PS \xB7 Next"},{value:"video.prev",label:"Playset: prev clip",compact:"PS \xB7 Prev"},{value:"video.togglePlay",label:"Playset: play / stop",compact:"PS \xB7 Tran"},{value:"ui.toggleZen",label:"UI: zen toggle",compact:"UI \xB7 Zen"},{value:"ui.panel.audio",label:"UI: Audio panel",compact:"UI \xB7 Audio"},{value:"ui.panel.video",label:"UI: Playset panel",compact:"UI \xB7 Playset"},{value:"ui.panel.menu",label:"UI: sidebar menu",compact:"UI \xB7 Menu"}],r3=Array.from({length:16},(e,t)=>({value:`scene.slot.${t}`,label:`Scene \xB7 slot ${t+1}`,compact:`Sc \xB7 ${t+1}`})),n3=[{value:"preset.padPrev",label:"FX presets: previous pad",compact:"FX \xB7 Pad \u2212"},{value:"preset.padNext",label:"FX presets: next pad",compact:"FX \xB7 Pad +"},...Array.from({length:16},(e,t)=>({value:`preset.slot.${t}`,label:`FX preset \xB7 pad slot ${t+1}`,compact:`FX \xB7 ${t+1}`}))];function rc(){return{midiInDebug:!1,midiLedFeedback:!0,slots:{}}}var yi=e=>Array.from({length:8},(t,r)=>`${e}.${r}`),Ow=[{rowLabel:"Send A",ids:yi("knob.sendA")},{rowLabel:"Send B",ids:yi("knob.sendB")},{rowLabel:"Pan / device",ids:yi("knob.pan")},{rowLabel:"Level",ids:yi("fader")},{rowLabel:"Track focus",ids:yi("pad.top")},{rowLabel:"Track control",ids:yi("pad.bottom")}],Iw=[{id:"side.sendUp",shortLabel:"Audio"},{id:"side.sendDown",shortLabel:"Playset"},{id:"side.trackLeft",shortLabel:"Menu"},{id:"side.trackRight",shortLabel:"Trk \u2192"},{id:"side.device",shortLabel:"Device"},{id:"side.mute",shortLabel:"Mute"},{id:"side.solo",shortLabel:"Solo"},{id:"side.record",shortLabel:"Rec"}],Bw=[...Ow.flatMap(e=>e.ids),...Iw.map(e=>e.id)];function Dw(e){if(!e||Fw.some(n=>n.value===e)||_p(e)||Cs(e))return!0;if(!e.startsWith(jn))return!1;let t=e.slice(jn.length);return!!bi(t)}function Tp(e,t){let r=rc(),n=e,o=typeof n.midiInDebug=="boolean"?n.midiInDebug:typeof n.midiLedDebug=="boolean"?n.midiLedDebug:r.midiInDebug,i=n.slots&&typeof n.slots=="object"?n.slots:{},s=typeof n.midiLedFeedback=="boolean"?n.midiLedFeedback:r.midiLedFeedback,l={...r,midiInDebug:o,midiLedFeedback:s,slots:{}};for(let p of Bw){let d=i[p];if(!d||typeof d!="object"){l.slots[p]={action:""};continue}l.slots[p]=Sp(d,p)}return Tb(l.slots),yb(l.slots,t?.scenes??[]),t?.activeFxList&&_b(l.slots,t.activeFxList),l}var na=e=>Array.from({length:8},(t,r)=>`grid.${e}.${r}`),Hw=[{rowLabel:"Row 1 (top)",ids:na(0)},{rowLabel:"Row 2",ids:na(1)},{rowLabel:"Row 3",ids:na(2)},{rowLabel:"Row 4",ids:na(3)},{rowLabel:"Row 5",ids:na(4)},{rowLabel:"Row 6",ids:na(5)},{rowLabel:"Row 7",ids:na(6)},{rowLabel:"Row 8 (bottom)",ids:na(7)}],Nw=[{id:"top.up",shortLabel:"\u2191"},{id:"top.down",shortLabel:"\u2193"},{id:"top.left",shortLabel:"\u2190"},{id:"top.right",shortLabel:"\u2192"},{id:"top.session",shortLabel:"Sess"},{id:"top.drums",shortLabel:"Drum"},{id:"top.keys",shortLabel:"Keys"},{id:"top.user",shortLabel:"User"},{id:"top.logo",shortLabel:"Logo"}],Gw=[{id:"side.scene1",shortLabel:"Audio"},{id:"side.scene2",shortLabel:"Playset"},{id:"side.scene3",shortLabel:"Menu"},{id:"side.scene4",shortLabel:"Sc 4"},{id:"side.scene5",shortLabel:"Sc 5"},{id:"side.scene6",shortLabel:"Sc 6"},{id:"side.scene7",shortLabel:"Sc 7"},{id:"side.stopSoloMute",shortLabel:"Stop"}],Ww=[...Hw.flatMap(e=>e.ids),...Nw.map(e=>e.id),...Gw.map(e=>e.id)];function nc(){return{midiInDebug:!1,midiLedFeedback:!0,slots:{}}}function Uw(e){for(let t=0;t<16;t++){let r=vp(t);e[r]?.action||(e[r]={action:`preset.slot.${t}`,mode:"momentary"})}e["top.left"]?.action||(e["top.left"]={action:"preset.padPrev",mode:"momentary"}),e["top.right"]?.action||(e["top.right"]={action:"preset.padNext",mode:"momentary"})}function Mp(e,t){let r=nc(),n=e,o=typeof n.midiInDebug=="boolean"?n.midiInDebug:r.midiInDebug,i=typeof n.midiLedFeedback=="boolean"?n.midiLedFeedback:r.midiLedFeedback,s=n.slots&&typeof n.slots=="object"?n.slots:{},l={...r,midiInDebug:o,midiLedFeedback:i,slots:{}};for(let p of Ww){let d=s[p];if(!d||typeof d!="object"){l.slots[p]={action:""};continue}l.slots[p]=Sp(d,p)}return Uw(l.slots),mb(l.slots),hb(l.slots),Mb(l.slots),bb(l.slots,t?.scenes??[]),t?.activeFxList&&vb(l.slots,t.activeFxList),l}var Vw=25,$w=Array.from({length:8},(e,t)=>`knob.${t}`),Ab=Array.from({length:8},(e,t)=>`pad.top.${t}`),Cb=Array.from({length:8},(e,t)=>`pad.bottom.${t}`),zw=[{id:"round.up",shortLabel:"\u25B2"},{id:"round.down",shortLabel:"\u25BC"}],Xw=[{id:"track.left",shortLabel:"\u25C0 Trk"},{id:"track.right",shortLabel:"Trk \u25B6"}],jw=[{id:"wheel.pitch",shortLabel:"Pitch",centered:!0},{id:"wheel.mod",shortLabel:"Mod",centered:!1}],Yw=Array.from({length:Vw},(e,t)=>`key.${t}`),qw=[...$w,...Ab,...Cb,...zw.map(e=>e.id),...Xw.map(e=>e.id),...jw.map(e=>e.id),...Yw];function oc(){return{midiInDebug:!1,midiLedFeedback:!0,slots:{}}}function Kw(e){[...Ab,...Cb].forEach((r,n)=>{e[r]?.action||(e[r]={action:`preset.slot.${n}`,mode:"momentary"})}),e["track.left"]?.action||(e["track.left"]={action:"preset.padPrev",mode:"momentary"}),e["track.right"]?.action||(e["track.right"]={action:"preset.padNext",mode:"momentary"})}function Lp(e,t){let r=oc(),n=e,o=typeof n.midiInDebug=="boolean"?n.midiInDebug:r.midiInDebug,i=typeof n.midiLedFeedback=="boolean"?n.midiLedFeedback:r.midiLedFeedback,s=n.slots&&typeof n.slots=="object"?n.slots:{},l={...r,midiInDebug:o,midiLedFeedback:i,slots:{}};for(let p of qw){let d=s[p];if(!d||typeof d!="object"){l.slots[p]={action:""};continue}l.slots[p]=Sp(d,p)}return Kw(l.slots),l}u();u();var Eb=[{id:"parvagues-ep-2026",artist:"ParVagues",title:"ParVagues \xD7 Shipow",badge:"ParVagues \xD7 Shipow \xB7 2026",fxKeys:["liquix"],claim:"code",codes:["PARVAGUES","VAGUES2026"],dropParam:"parvagues-ep",playsetFolder:"parvagues"}],i3=new Map(Eb.map(e=>[e.id,e])),s3=new Map(Eb.filter(e=>e.dropParam).map(e=>[e.dropParam,e]));var Zw={presetsSaved:0,loopsRated:0,scenesCreated:0,liveSeconds:0,fxEverAdded:[],audioStarted:0,maxFxChain:0,newsletterSubscribed:0},wp={ownedTier:"starter",unlockedFx:[],claimedCollabs:[],zap:0,completedQuests:[],engagement:{...Zw}};u();u();function ac(e){return{...e,attack:e.attack??dr.attack,hold:e.hold??dr.hold,oneshotRelease:e.oneshotRelease??dr.release,oneshotDecay:e.oneshotDecay??dr.decay,triggerEaseOutShape:e.triggerEaseOutShape??dr.easeShape}}function Rb(e){let t=ac(e);return{attack:t.attack,hold:t.hold??dr.hold,release:t.oneshotRelease??dr.release,decay:t.oneshotDecay??dr.decay,easeShape:t.triggerEaseOutShape??dr.easeShape}}u();var Jw=["sin","cos","tri","saw","square"];var eA={sin:"SI",cos:"CO",tri:"TR",saw:"SA",square:"SQ"};function oa(e){return ic(e)!=null}function ic(e){if(!e.startsWith("lfo:"))return null;let t=e.slice(4);return Jw.includes(t)?t:null}function kb(e){let t=ic(e);return t?eA[t]:"LF"}u();u();u();u();u();u();var E3={attack:dr.attack,hold:dr.hold,release:dr.release,decay:dr.decay,easeShape:dr.easeShape};function Pb(e){let t=xf(e);return{attack:t.triggerAttack??dr.attack,hold:t.triggerHold??dr.hold,release:t.triggerRelease??dr.release,decay:t.decay??dr.decay,easeShape:t.triggerEaseOutShape??dr.easeShape}}function Ap(){return"eg:1"}u();var Es=[{band:"nech:onset",label:"Onset",short:"ON",kind:"pulse",color:"#22d3ee"},{band:"nech:kick",label:"Kick hit",short:"KI",kind:"pulse",color:"#e879f9"},{band:"nech:low",label:"Low hit",short:"LO",kind:"pulse",color:"#ef4444"},{band:"nech:mid",label:"Mid hit",short:"MI",kind:"pulse",color:"#34d399"},{band:"nech:high",label:"High hit",short:"HI",kind:"pulse",color:"#38bdf8"},{band:"nech:beat",label:"Beat grid",short:"BE",kind:"pulse",color:"#a855f7"},{band:"nech:rms",label:"RMS",short:"RM",kind:"level",color:"#94a3b8"},{band:"nech:specLow",label:"Spec low",short:"SL",kind:"level",color:"#f87171"},{band:"nech:specMid",label:"Spec mid",short:"SM",kind:"level",color:"#4ade80"},{band:"nech:specHigh",label:"Spec high",short:"SH",kind:"level",color:"#38bdf8"},{band:"nech:valence",label:"Valence",short:"VA",kind:"level",color:"#67e8f9"},{band:"nech:arousal",label:"Arousal",short:"AR",kind:"level",color:"#fb7185"}];function sc(e){return e.startsWith("nech:")}u();u();u();u();var tA={kick:{h:322,s:94,l:64},snare:{h:38,s:95,l:58},hat:{h:175,s:88,l:52},bass:{h:275,s:82,l:48},vocals:{h:18,s:88,l:62},low:{h:0,s:96,l:50},mid:{h:160,s:84,l:39},high:{h:199,s:89,l:48},beat:{h:271,s:81,l:56},rhythm:{h:286,s:70,l:62},specFast:{h:50,s:92,l:60},specSlow:{h:220,s:60,l:62},master:{h:187,s:85,l:52}};function rA(e,t,r){let n=t/100,o=r/100,i=(1-Math.abs(2*o-1))*n,s=i*(1-Math.abs(e/60%2-1)),l=o-i/2,p=0,d=0,v=0;return e<60?(p=i,d=s):e<120?(p=s,d=i):e<180?(d=i,v=s):e<240?(d=s,v=i):e<300?(p=s,v=i):(p=i,v=s),[Math.round((p+l)*255),Math.round((d+l)*255),Math.round((v+l)*255)]}function nA(e){let t=tA[e];return rA(t.h,t.s,t.l)}function oA(e){let[t,r,n]=nA(e);return[t/255,r/255,n/255]}function vi(e){let[t,r,n]=oA(e);return`vec3(${t.toFixed(4)}, ${r.toFixed(4)}, ${n.toFixed(4)})`}var xi={none:{short:"\u2014",label:"None",iconActive:"text-white/45",iconIdle:"text-white/28"},kick:{short:"KI",label:"Kick",iconActive:"text-fuchsia-300",iconIdle:"text-fuchsia-500/38"},snare:{short:"SN",label:"Snare",iconActive:"text-amber-300",iconIdle:"text-amber-500/38"},hat:{short:"HT",label:"Hat",iconActive:"text-teal-300",iconIdle:"text-teal-500/38"},bass:{short:"BA",label:"Bass",iconActive:"text-violet-400",iconIdle:"text-violet-500/38"},vocals:{short:"VO",label:"Vocals",iconActive:"text-orange-300",iconIdle:"text-orange-500/38"},low:{short:"LO",label:"Low",iconActive:"text-red-400",iconIdle:"text-red-500/38"},mid:{short:"MI",label:"Mid",iconActive:"text-emerald-400",iconIdle:"text-emerald-500/38"},high:{short:"HI",label:"High",iconActive:"text-sky-400",iconIdle:"text-sky-500/38"},beat:{short:"BE",label:"Beat",iconActive:"text-purple-400",iconIdle:"text-purple-500/38"},rhythm:{short:"RY",label:"Rhythm",iconActive:"text-violet-300",iconIdle:"text-violet-500/38"},specFast:{short:"SF",label:"Spec Fast",iconActive:"text-yellow-300",iconIdle:"text-yellow-500/38"},specSlow:{short:"SS",label:"Spec Slow",iconActive:"text-indigo-300",iconIdle:"text-indigo-500/38"},master:{short:"MA",label:"Master",iconActive:"text-white",iconIdle:"text-white/38"},fx:{short:"FX",label:"FX",iconActive:"text-white/85",iconIdle:"text-white/32"}};function aA(e){return xi[e]??xi.none}function Lo(e){return _i(e)?Fb(e):e.startsWith("lfo:")?kb(e):aA(e).short}var iA=[{key:"kick",eventKey:"kick",label:"Kick",shortLabel:xi.kick.short},{key:"low",eventKey:"low",label:"Low",shortLabel:xi.low.short},{key:"mid",eventKey:"bass",label:"Mid",shortLabel:xi.mid.short},{key:"high",eventKey:"high",label:"High",shortLabel:xi.high.short}];u();u();var q3=Es.filter(e=>e.band!=="nech:onset"&&e.band!=="nech:valence"&&e.band!=="nech:arousal"&&(e.kind==="pulse"||e.band==="nech:rms"||e.band==="nech:specLow"||e.band==="nech:specMid"||e.band==="nech:specHigh"));u();var lA=12,vI=Array.from({length:lA},(e,t)=>t+1),cA="role:";function Ob(e){return/^orbit([1-9]|1[0-2])$/.test(e)}function Ib(e){return/^role:(rhythm|bass|lead|pad|riser|other)$/.test(e)}function Rs(e){return Ob(e)||Ib(e)}function lc(e){return Ib(e)?e.slice(cA.length):null}function cc(e){let t=/^orbit([1-9]|1[0-2])$/.exec(e);return t?parseInt(t[1],10):null}u();function Bb(e){return e.isTrigger?e.envelopeRef===null?"trigger":"envelope":"follow"}u();function aa(e){return Xr(e)?"0-1":ka(e.source)||oa(e.source)?"-1-1":"0-1"}function uA(e){return e<0?0:e>1?1:e}function ia(e,t,r,n){let o;return n==="-1-1"?o=(Math.max(-1,Math.min(1,e*2-1))+1)/2:o=uA(e),t+o*(r-t)}function fA(e,t){return t>=0?{mapMin:e,mapMax:e+t}:{mapMin:e+t,mapMax:e}}function Db(e,t,r,n,o,i){return typeof e=="number"&&typeof t=="number"?{mapMin:e,mapMax:t}:n!==0?fA(r,n):{mapMin:o,mapMax:i}}function Hb(e,t,r,n){return(e==="colorAdjust"||e==="colorLayer")&&t==="base"?{mapMin:-1,mapMax:n}:e==="videoSpeed"&&t==="base"?{mapMin:r,mapMax:1.25}:e==="zoom"&&t==="base"?{mapMin:1,mapMax:n}:e==="rotate"&&t==="base"?{mapMin:0,mapMax:n}:{mapMin:r,mapMax:n}}var pA={attack:0,hold:0,release:0,decay:40,easeShape:"linear"},Nb={source:"none",depth:1,mapMin:0,mapMax:1,mode:"follow",trigger:{threshold:Se.triggerThreshold,count:Se.triggerCount,delay:Se.delay},envelopeRef:null,envelope:{attack:Se.triggerAttack,hold:Se.triggerHold,release:Se.triggerRelease,decay:Se.decay,easeShape:Se.triggerEaseOutShape}};function dA(e){return Si(e)||ks(e)}var mA=new Set(["master","specFast","specSlow"]);function hA(e){return dA(e)||ka(e)||oa(e)||Ps(e)||mA.has(e)?!0:sc(e)?Es.find(t=>t.band===e)?.kind==="level":!1}function uc(e){return!hA(e)}function gA(e){let t=Pb(e);return{attack:t.attack,hold:t.hold,release:t.release,decay:t.decay,easeShape:t.easeShape}}function Cp(e,t=0,r=0,n=1,o,i){let s=Bb(e);s!=="follow"&&!uc(e.band)&&(s="follow");let p=s==="envelope"?Nl:Se,d=r,v=n;if(s!=="follow"&&o&&i){let O=Hb(o,i,r,n);typeof e.mapMin!="number"&&(d=O.mapMin),typeof e.mapMax!="number"&&(v=O.mapMax)}let{mapMin:H,mapMax:D}=Db(e.mapMin,e.mapMax,t,e.multiplier??0,d,v);return{source:e.band,depth:e.multiplier??1,mapMin:H,mapMax:D,mode:s,trigger:{threshold:e.triggerThreshold??p.triggerThreshold,count:e.triggerCount??p.triggerCount,delay:e.delay??Se.delay},envelopeRef:s==="envelope"?e.envelopeRef&&e.envelopeRef!==null?e.envelopeRef:Ap():null,envelope:gA(e)}}function Ep(e,t){if(e.mode==="trigger")return pA;if(e.mode==="envelope"&&e.envelopeRef&&t){let r=fc(e.envelopeRef);if(r!=null){let n=t.egs[r-1];if(n?.enabled)return Rb(n)}}return e.envelope}function Hr(e,t,r){let n=r?.fxKey,o=r?.paramMin??0,i=r?.paramMax??1;if(t==="base")return Cp({band:e.syncBand??"none",multiplier:e.syncMultiplier??1,mapMin:e.mapMin,mapMax:e.mapMax,isTrigger:e.isTrigger,envelopeRef:e.envelopeRef,triggerThreshold:e.triggerThreshold,triggerCount:e.triggerCount,delay:e.delay,decay:e.decay,triggerAttack:e.triggerAttack,triggerRelease:e.triggerRelease,triggerHold:e.triggerHold,triggerEaseOutShape:e.triggerEaseOutShape},r?.staticValue??e.base??0,o,i,n,t);let s=e.paramSync?.[t],l=r?.staticValue??(typeof e.params?.[t]=="number"?e.params[t]:0);return s?Cp(s,l,o,i,n,t):{...Nb,mapMin:o,mapMax:i}}function bA(e,t){return e==="fadeOff"&&t==="base"}function Gb(e,t,r,n){if(bA(t,r)){let o=n?.paramMin??0,i=n?.paramMax??1,s=n?.staticValue??e.base??0,l=e.paramSync?.base;return l?Cp(l,s,o,i,t,r):{...Nb,mapMin:o,mapMax:i}}return Hr(e,r,{...n,fxKey:t})}function Xr(e){return(e.mode==="trigger"||e.mode==="envelope")&&uc(e.source)}var Wb={sin:{waveform:"sin",phase:0,slot:1},cos:{waveform:"sin",phase:.25,slot:1},tri:{waveform:"tri",phase:0,slot:2},saw:{waveform:"saw",phase:0,slot:3},square:{waveform:"square",phase:0,slot:4}};function yA(e){return`lfo:${Wb[e].slot}`}function xA(e,t,r){let n=Wb[t],o=n.slot-1,i=e.lfos.map((s,l)=>l!==o?s:{...s,enabled:!0,waveform:n.waveform,rate:Math.max(.01,r),phase:n.phase});return{...e,lfos:i}}function Ub(e,t,r){let n=Ti(r);if(!oa(e))return{band:e,depth:t,modulation:n};let o=ic(e),i=xA(n,o,t||1);return{band:yA(o),depth:1,modulation:i}}function wo(e,t,r=1){if(e==="none")return 0;if(_i(e))return kp(e);if(oa(e)){let s=ie().hydraModulation?.config,l=Ub(e,r,s);return kp(l.band)}let n=ie();if(e==="kick")return t&&typeof t.kick=="number"?t.kick:typeof n.kick=="number"?n.kick:0;if(e==="low")return n.low??0;if(e==="mid")return n.mid??0;if(e==="high")return n.high??0;if(e==="beat")return n.beat??0;if(e==="master")return t&&typeof t.master=="number"?t.master:typeof n.masterLevel=="number"?n.masterLevel:0;let o=cc(e);if(o!=null){let s=n.studioOrbitPulse?.[o];if(typeof s=="number")return s;if(t){let l=`orbit${o}`;if(typeof t[l]=="number")return t[l]}return 0}let i=lc(e);if(i!=null){let s=n.studioRolePulse?.[i];return typeof s=="number"?s:t&&typeof t[e]=="number"?t[e]:0}return sc(e)?t&&typeof t[e]=="number"?t[e]:0:t&&t[e]||0}function _n(e,t,r,n,o){let i=ie(),s=o??i.hydraSettings?.fx?.[e],l=n?`${e}:${n}`:e,p=s?Hr(s,n??"base"):null;if(p&&Xr(p))return i.hydraEnvelopes?.[l]||0;let d=p?.source??t,v=p?.depth??1;return wo(d,r,v)}function Rp(e,t,r){let n=e;return t!==void 0&&(n=Math.max(t,n)),r!==void 0&&(n=Math.min(r,n)),n}function hr(e,t,r,n={}){let{clampMin:o,clampMax:i,paramMin:s,paramMax:l,whenDisabled:p=0,requireEnabled:d=!0,map:v}=n;if(d&&(!t||!t.enabled))return p;let H=s??o??0,D=l??i??1,O=Hr(t,"base",{staticValue:t.base??0,paramMin:H,paramMax:D,fxKey:e});if(O.source==="none"){let Ee=t.base;return v&&(Ee=v(Ee,t)),o!==void 0||i!==void 0?Rp(Ee,o,i):Ee}let K=_n(e,O.source,r,void 0,t),Y=aa(O),fe=ia(K,O.mapMin,O.mapMax,Y);return v&&(fe=v(fe,t)),o!==void 0||i!==void 0?Rp(fe,o,i):fe}function Zt(e,t,r,n,o,i){if(!t)return n;let s=t.params?.[r]??n,l=t.paramSync?.[r];if(!l||l.band==="none")return s;let p=i??e,d=[...io,...Xn].find(Ee=>Ee.key===p),v=d&&"extraParams"in d?d.extraParams?.find(Ee=>Ee&&typeof Ee=="object"&&"key"in Ee&&Ee.key===r):void 0,H=v&&typeof v=="object"&&"min"in v?v.min:n,D=v&&typeof v=="object"&&"max"in v?v.max:n,O=Hr(t,r,{staticValue:s,paramMin:H,paramMax:D,fxKey:e}),K=_n(e,O.source,o,r,t),Y=aa(O),fe=ia(K,O.mapMin,O.mapMax,Y);return v&&typeof v=="object"&&"min"in v&&"max"in v&&(fe=Rp(fe,v.min,v.max)),fe}var jr={clampMin:0,clampMax:1},pc=512;var Vb={clampMin:4,clampMax:pc,paramMin:4,paramMax:pc,whenDisabled:pc};function vA(){if(typeof document<"u"){let e=document.getElementById("hydra-canvas");if(e instanceof HTMLCanvasElement)return Math.max(e.width,e.height,1)}return 4096}function $b(e){let t=Math.round(e);return t>=pc?vA():t}var zb=250,Xb=1200;u();function dc(e,t){return Array.from({length:t},(r,n)=>`${e}:${n+1}`)}function Fs(e,t,r){if(!r.startsWith(`${e}:`))return!1;let n=Number(r.slice(e.length+1));return Number.isInteger(n)&&n>=1&&n<=t}var _A=dc("lfo",8),SA=dc("eg",8),TA=dc("am",4),MA=dc("step",8);var Is=[-16,-8,-4,-2,-1,0,1,2,4,8,16];function ka(e){return Fs("lfo",8,e)}function Si(e){return Fs("eg",8,e)}function ks(e){return Fs("am",4,e)}function Ps(e){return Fs("step",8,e)}function _i(e){return ka(e)||Si(e)||ks(e)||Ps(e)}function fc(e){if(!_i(e))return null;let t=parseInt(e.slice(e.indexOf(":")+1),10);return Number.isFinite(t)?t:null}function Fb(e){let t=fc(e);return t==null?"MOD":ka(e)?`L${t}`:Si(e)?`E${t}`:ks(e)?`A${t}`:Ps(e)?`S${t}`:"MOD"}var jb=[{enabled:!0,waveform:"sin",rate:.5},{enabled:!0,waveform:"tri",rate:1},{enabled:!0,waveform:"saw",rate:4},{enabled:!0,waveform:"square",rate:16},{enabled:!0,waveform:"sampleHold",rate:16},{enabled:!0,waveform:"filteredSampleHold",rate:4},{enabled:!0,waveform:"doubleSaw",rate:8},{enabled:!0,waveform:"randomSine",rate:.25}];var Yb=[{enabled:!0,attack:0,hold:0,oneshotRelease:0,oneshotDecay:15,triggerEaseOutShape:"smooth"},{enabled:!0,attack:5,hold:0,oneshotRelease:8,oneshotDecay:40,triggerEaseOutShape:"smooth"},{enabled:!0,attack:0,hold:.05,oneshotRelease:0,oneshotDecay:25,triggerEaseOutShape:"cubic"},{enabled:!0,attack:2,hold:0,oneshotRelease:25,oneshotDecay:80,triggerEaseOutShape:"smooth"},{enabled:!1,attack:0,hold:0,oneshotRelease:4,oneshotDecay:20,triggerEaseOutShape:"expo"},{enabled:!1,attack:12,hold:2,oneshotRelease:20,oneshotDecay:60,triggerEaseOutShape:"cosine"},{enabled:!1,attack:0,hold:.02,oneshotRelease:.5,oneshotDecay:8,triggerEaseOutShape:"linear"},{enabled:!1,attack:8,hold:4,oneshotRelease:16,oneshotDecay:50,triggerEaseOutShape:"quad"}];var qb=[{enabled:!0,values:[0,.25,.5,.75,1],playMode:"loop",beatsPerStep:2},{enabled:!0,values:[0,1],playMode:"loop",beatsPerStep:1},{enabled:!1,values:[...Is],playMode:"loop",beatsPerStep:4},{enabled:!1,values:[0,.5,1],playMode:"pingpong",beatsPerStep:2},{enabled:!1,values:[0,0,0,1],playMode:"loop",beatsPerStep:1},{enabled:!1,values:[0,.33,.67,1],playMode:"loop",beatsPerStep:4},{enabled:!1,values:[0,.125,.25,.375,.5,.625,.75,.875,1],playMode:"loop",beatsPerStep:1},{enabled:!1,values:[0,1],playMode:"loop",beatsPerStep:8}];function wA(e){let t=jb[e]??jb[0];return{enabled:t.enabled,waveform:t.waveform,rate:t.rate,phase:0,offset:0,oneShot:!1}}function AA(e){let t=Yb[e]??Yb[0];return{enabled:t.enabled,attack:t.attack,hold:t.hold,oneshotRelease:t.oneshotRelease,oneshotDecay:t.oneshotDecay,triggerEaseOutShape:t.triggerEaseOutShape}}function CA(e){return{enabled:!1,mode:e===0?"gate":e===3?"range":"spectrum",band:e===0?"master":e===1?"low":e===2?"mid":"high",freqMinHz:zb,freqMaxHz:Xb,threshold:.12,gain:1.5,attack:.01,release:e===3?.08:.18}}function mc(e){if(!Array.isArray(e))return[...Is];let t=e.map(r=>typeof r=="number"&&Number.isFinite(r)?r:null).filter(r=>r!=null);return t.length>0?t:[...Is]}function Kb(e){let t=qb[e]??qb[0],r=[...t.values];return{enabled:t.enabled,values:r,playMode:t.playMode,beatsPerStep:t.beatsPerStep,startIndex:0,endIndex:r.length-1}}function EA(e,t){return e.length===t.length&&e.every((r,n)=>r===t[n])}function RA(e){return!(!Array.isArray(e.values)||!EA(e.values,Is)||(e.playMode??"loop")!=="loop"||(e.beatsPerStep??4)!==4||typeof e.startIndex=="number"&&e.startIndex!==0||typeof e.endIndex=="number"&&e.endIndex!==Is.length-1)}function Bp(e,t,r){let n=Math.max(0,e-1),o=Math.max(0,Math.min(n,Math.round(t))),i=Math.max(0,Math.min(n,Math.round(r)));if(o>i){let s=o;o=i,i=s}return{startIndex:o,endIndex:i}}function kA(e,t=0){let r=Kb(t);if(!e)return r;if(RA(e))return{...r,enabled:typeof e.enabled=="boolean"?e.enabled:r.enabled};let n=e.playMode==="pingpong"||e.playMode==="loop"?e.playMode:r.playMode,o=typeof e.beatsPerStep=="number"?e.beatsPerStep:r.beatsPerStep,i=Math.max(1,Math.min(32,Math.round(o)||r.beatsPerStep)),s=mc(e.values??r.values),l=typeof e.startIndex=="number"?e.startIndex:r.startIndex,p=typeof e.endIndex=="number"?e.endIndex:s.length-1,{startIndex:d,endIndex:v}=Bp(s.length,l,p);return{enabled:typeof e.enabled=="boolean"?e.enabled:r.enabled,values:s,playMode:n,beatsPerStep:i,startIndex:d,endIndex:v}}function PA(e){let t=mc(e.values),{startIndex:r,endIndex:n}=Bp(t.length,e.startIndex,e.endIndex);return t.slice(r,n+1)}function Dp(){return{lfos:Array.from({length:8},(e,t)=>wA(t)),egs:Array.from({length:8},(e,t)=>AA(t)),ams:Array.from({length:4},(e,t)=>CA(t)),steppers:Array.from({length:8},(e,t)=>Kb(t))}}function Ti(e){let t=Dp();return e?{lfos:t.lfos.map((r,n)=>({...r,...e.lfos?.[n]??{}})),egs:t.egs.map((r,n)=>ac({...r,...e.egs?.[n]??{}})),ams:t.ams.map((r,n)=>({...r,...e.ams?.[n]??{}})),steppers:t.steppers.map((r,n)=>kA({...r,...e.steppers?.[n]??{}},n))}:t}function Os(e){let t=Math.sin(e*127.1+311.7)*43758.5453;return t-=Math.floor(t),t}function FA(e,t,r){switch(e){case"sin":return Math.sin(t*Math.PI*2);case"square":return t<.5?1:-1;case"saw":return t*2-1;case"tri":return 1-4*Math.abs(t-.5);case"doubleSaw":return t<.5?t*4-1:1-(t-.5)*4;case"sampleHold":return Os(Math.floor(r))*2-1;case"filteredSampleHold":{let n=Os(Math.floor(r))*2-1,o=Os(Math.floor(r)+1)*2-1;return n+(o-n)*t}case"randomSine":{let n=Os(Math.floor(r))*2-1,o=Os(Math.floor(r)+1)*2-1,i=(1-Math.cos(t*Math.PI))*.5;return n+(o-n)*i}default:return 0}}function Qb(e){return e<0?0:e>1?1:e}function OA(e,t,r=0,n=0){let o=FA(e,t,r);return Qb(o*.5+.5+n*.5)}function Bs(){let e=ie();return typeof e.studioPlaybackMasterSec=="number"?e.studioPlaybackMasterSec:typeof e.studioFrozenTimeSec=="number"?e.studioFrozenTimeSec:typeof e.time=="number"?e.time:performance.now()/1e3}function Ds(){let e=ie().hydraBpm;return typeof e=="number"&&e>0?e:120}function IA(e,t=Bs(),r=Ds()){let n=Math.max(.01,e.rate),o=60/r,s=t/o*n/16+e.phase,l=Math.floor(s),p=s-l;return e.oneShot&&s>=1&&(p=1),{cycle:l,phase:p,totalCycles:s}}function BA(e,t=Bs(),r=Ds()){if(!e.enabled)return 0;let{cycle:n,phase:o}=IA(e,t,r);return OA(e.waveform,o,n,e.offset)}function DA(e,t,r){let n=Math.max(1,Math.floor(t));if(n===1)return 0;let o=Math.max(0,Math.floor(e));if(r==="loop")return o%n;let i=2*(n-1),s=o%i;return s<n?s:i-s}function HA(e,t=Bs(),r=Ds()){let n=mc(e.values),{startIndex:o,endIndex:i}=Bp(n.length,e.startIndex,e.endIndex),s=i-o+1,l=Math.max(1,Math.min(32,Math.round(e.beatsPerStep)||1)),p=60/Math.max(1,r),d=Math.max(0,t/p),v=Math.floor(d/l),H=DA(v,s,e.playMode);return o+H}function NA(e,t=Bs(),r=Ds()){let n=mc(e.values),o=HA(e,t,r);return n[o]??0}function GA(e,t=Bs(),r=Ds()){if(!e.enabled)return 0;let n=PA(e),o=NA(e,t,r),i=n[0],s=n[0];for(let l=1;l<n.length;l++){let p=n[l];p<i&&(i=p),p>s&&(s=p)}return s<=i?.5:Qb((o-i)/(s-i))}function kp(e){let t=fc(e);if(t==null)return 0;let r=ie().hydraModulation;if(ka(e)){let n=r?.lfo?.[t];if(typeof n=="number")return n;let o=r?.config?.lfos?.[t-1];return o?BA(o):0}if(Si(e))return r?.eg?.[t]??0;if(ks(e))return r?.am?.[t]??0;if(Ps(e)){let n=r?.step?.[t];if(typeof n=="number")return n;let o=r?.config?.steppers?.[t-1];return o?GA(o):0}return 0}var WA=[{id:"tracker-default-a",name:"Pattern 1",beatsPerStep:4,steps:[null,null,null,null,null,null,null,null]}];function UA(){return{videoRatings:{},videoLoopTagOverrides:{},sceneTrackers:WA.map(e=>({...e,steps:[...e.steps]})),fxPresets:[],scenes:[],studioSceneProgression:void 0,activeFxList:[...Ih],fx:Bh(),activePresetId:null,activeSceneId:null,inputGain:1,inputMultiplier:1,lowSensitivity:1.18,midSensitivity:.9,highSensitivity:1.02,lowCrossoverHz:150,highCrossoverHz:3400,lowGate:0,midGate:0,highGate:0,audioAdaptiveNormalization:!0,audioKickOnsetDetection:!0,audioKickOnsetSensitivity:1.4,audioFftSmoothing:.15,audioSnareDetection:!0,audioSnareSensitivity:1.6,audioHatDetection:!0,audioHatSensitivity:1.9,audioBassDetection:!0,audioBassSensitivity:1.45,audioVocalsDetection:!0,audioVocalsSensitivity:1.5,audioRhythmDetection:!0,audioBpmAutoSync:!1,audioDensityFastMs:140,audioDensitySlowMs:1400,bpm:128,modulation:Dp(),masterLevelFloorDb:-55,masterLevelCeilDb:-10,targetFps:60,renderResolution:"viewport",perfTier:"auto",uiState:{isAudioExpanded:!0,isVideoExpanded:!0,isParamsExpanded:!0,videoLibrarySort:"library",presetPadIndex:0,outputMuted:!1},launchControlMidi:Tp(rc()),launchpadMiniMidi:Mp(nc()),launchkeyMidi:Lp(oc()),fxMidiParamBindings:[],exportSettings:{...Uf},outputMapping:{...Ss,points:Ss.points.map(e=>({dest:{...e.dest},src:{...e.src}})),mask:Ss.mask.map(e=>({...e})),maskPolys:Ss.maskPolys.map(e=>({op:e.op,points:e.points.map(t=>({...t}))}))},outputMapTemplates:[],entitlements:{...wp,engagement:{...wp.engagement}}}}var Hp=null;function Np(){return Hp||(Hp=UA()),Hp}var ab=new Proxy({},{get(e,t,r){return Object.prototype.hasOwnProperty.call(e,t)?Reflect.get(e,t,r):Reflect.get(Np(),t)},set(e,t){throw new TypeError(`DEFAULT_GLOBAL_SETTINGS is read-only (attempted to set ${String(t)})`)},ownKeys(){return Reflect.ownKeys(Np())},getOwnPropertyDescriptor(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return Object.getOwnPropertyDescriptor(e,t);let r=Object.getOwnPropertyDescriptor(Np(),t);return r&&(r.configurable=!0),r}});u();u();u();var Zb=2,Jb=124,ey="Piment br\xE9silien";u();var ty="/audio/Recordings/Montreuil26_master/studio",ry={id:"montreuil26",label:"Montreuil26",setName:"Montreuil26",manifestUrl:`${ty}/bundle-manifest.json`,baseUrl:ty,stemsRemotePublished:!1,stemsBaseUrl:"/audio/Recordings/Montreuil26_master/tracks_bandcamp/stems",autoLoadInStudio:!1,demoTrackNumber:2};var VA=[{track:Zb,title:ey,bpm:Jb}];function $A(e){return`montreuil26-track-${String(e).padStart(2,"0")}`}function zA(){let e={};for(let t of VA)e[t.track]=$A(t.track);return e}var QB={bundleKey:ry.setName,mode:"tracks",trackMap:zA(),patternId:null};u();u();u();u();u();u();var fD=ws.filter(e=>e.marketplace!==!1),XA=ws;var pD=new Map(XA.map(e=>[e.slug,e]));u();u();u();u();u();var qA=["electricNoise","fillLayer","fractalFold","noise","patternLayer","plasma","plexus","shapeLayer","superformula","topoContour","universeWithin"];function hc(e){return qA.includes(e)}var KA=0,ny=1,gc=2,Mi=3;function Gp(e){return Math.max(KA,Math.min(Mi,Math.round(e)))}var QA=Lh,ZA={maskReveal:"Reveal (0=Below, 1=Black)",maskReach:"Reach (0=All, 1=Prev, 2=2, 3=3, 4=4, 5=5, 6=6)",maskThreshold:"Threshold",maskSoftness:"Softness",maskInvert:"Invert (0=Off, 1=On)"},JA=[{key:"maskReveal",label:"Mask reveal (0=Below, 1=Black)",min:0,max:1,step:1,default:0},{key:"maskReach",label:"Mask reach (0=All, 1=Prev, 2=2, 3=3, 4=4, 5=5, 6=6)",min:0,max:6,step:1,default:0},{key:"maskThreshold",label:"Mask threshold",min:0,max:1,step:.01,default:.35},{key:"maskSoftness",label:"Mask softness",min:.01,max:.5,step:.01,default:.12},{key:"maskInvert",label:"Invert (0=Off, 1=On)",min:0,max:1,step:1,default:0}],eC=JA.map(e=>{let t=ZA[e.key];return t?{...e,label:t}:e}),FD=[{key:"mode",label:QA,min:0,max:gf,step:1,default:0},...eC],OD=V.amount;function tC(e){return(e??[]).filter(t=>!So(t)&&!Hl(t)).map(t=>({kind:"fx",key:t}))}function Wp(e){return e?.length?e.filter(t=>t.kind==="fx").map(t=>t.key):[]}function oy(e){return e.activeChain?.length?e.activeChain:tC(e.activeFxList)}function bc(e){return oy(e).filter(t=>t.kind==="fx"?!0:e.fxGroups?.[t.id]?.enabled!==!1)}function ay(e,t){let r=new Set(Wp(e).map(String)),n=[...e];for(let o of t)r.has(String(o))||Hl(String(o))&&(n.push({kind:"fx",key:o}),r.add(String(o)));return n}function Pa(e,t){return`layer:${e}:${t}`}function yc(e){if(!e.startsWith("layer:"))return null;let t=e.slice(6),r=t.indexOf(":");return r<=0?null:{groupId:t.slice(0,r),layerId:t.slice(r+1)}}u();u();u();u();u();var Li=.5,iy=.05,nC=1;var oC=.38,aC="cosine",iC=.68;function sC(e){return Number.isFinite(e)?Math.max(iy,Math.min(nC,e)):Li}function Up(e){let t=sC(e),r=t*oC,n=Math.max(iy,t-r);return{attack:0,hold:r,release:n,decay:20,easeShape:aC}}function sy(e){let t=e<0?0:e>1?1:e;return t<=0?0:t>=1?1:Math.pow(t,iC)}function ly(e){let t=Up(e);return ui(0,t.attack,t.hold,t.release,t.decay)}u();var wi=.5,cy=.05,lC=1,Ai=.65,cC=.38,uC="cosine",fC=.68,pC=.92,dC=.34,mC=2.15,hC=2.4,gC=4.2,bC=3.6;function yC(e){return Number.isFinite(e)?Math.max(cy,Math.min(lC,e)):wi}function $p(e){let t=yC(e),r=t*cC,n=Math.max(cy,t-r);return{attack:0,hold:r,release:n,decay:20,easeShape:uC}}function uy(e){let t=e<0?0:e>1?1:e;return t<=0?0:t>=1?1:Math.pow(t,fC)}function fy(e){let t=$p(e);return ui(0,t.attack,t.hold,t.release,t.decay)}function xC(e){return Number.isFinite(e)?e<0?0:e>1?1:e:Ai}function vC(e){let t=e<0?0:e>1?1:e;return t<=0?0:t>=1?1:1-Math.pow(1-t,mC)}function _C(e,t){let r=xC(t);return e<1e-5||r<1e-5?0:vC(e)*r*pC}function Vp(e,t,r,n){let o=_C(t,r);if(o>e){let i=e;i<1e-5&&o>1e-5&&(i=o*dC);let s=o>1e-5?i/o:1,l=1+hC*(1-s),p=n*gC*Math.max(.25,o)*l;return Math.min(o,i+p)}return o<=1e-5?Math.max(0,e-n*bC):e+(o-e)*Math.min(1,n*8)}function SC(e){if(!e?.enabled)return 0;let t=ie(),r=Hr(e,"base",{staticValue:e.base??1,paramMin:0,paramMax:1,fxKey:"slowmo"});if(Xr(r)){let n=t.hydraEnvelopes?.slowmo??0,o=t.slowmoPulseUntilMs;return typeof o=="number"&&performance.now()<o&&(n=Math.max(n,1)),n<0?0:n>1?1:n}return r.source==="none",0}function py(e){let t=ie(),r=t.hydraSettings?.fx?.slowmo,n=t.slowmoTrailMix??0;if(!r?.enabled){t.slowmoTrailMix=Vp(n,0,0,e);return}let o=typeof r.params?.motionBlur=="number"?r.params.motionBlur:Ai;if(o<=1e-5){t.slowmoTrailMix=Vp(n,0,0,e);return}let i=SC(r);t.slowmoTrailMix=Vp(n,i,o,e)}function TC(e,t){return typeof t?.params?.duration=="number"?t.params.duration:e==="accelerate"?Li:wi}function MC(e){let t=Zo[e];return t?.syncBand&&t.syncBand!=="none"?t.syncBand:"kick"}function Hs(e,t){if(!t||!ci(e)||!t.enabled)return t;let r=Zo[e],n=t.syncBand==="none"?"none":t.syncBand??MC(e),o={...t,syncBand:n};if(n!=="none"&&(o.isTrigger=!0,o.syncMultiplier=0),ps(e)){t.envelopeRef===null&&delete o.envelopeRef,delete o.mapMin,delete o.mapMax,(typeof o.base!="number"||o.base<=0)&&(o.base=typeof r?.base=="number"?r.base:1);let i={...o.params??{}};typeof i.duration!="number"&&(i.duration=TC(e,r)),e==="slowmo"&&typeof i.motionBlur!="number"&&(i.motionBlur=typeof r?.params?.motionBlur=="number"?r.params.motionBlur:Ai),o.params=i}else o.envelopeRef===void 0&&(o.envelopeRef=null);return o}function dy(e){if(!(!e||typeof e!="object"))for(let t of Object.keys(e)){if(!ci(t))continue;let r=e[t],n=Hs(t,r);n&&n!==r&&(e[t]=n)}}var xc=io.find(e=>e.key==="videoSpeed"),sa=.1;function hy(e,t,r){return r||e<sa?e:t+(e-t)*.1}function LC(e){let t=e?.videoSpeed;if(!t?.enabled||t.syncBand==="none")return!1;let r=Hr(t,"base",{staticValue:t.base??1.25,paramMin:xc.min,paramMax:xc.max,fxKey:"videoSpeed"});return Xr(r)}function gy(e){if(LC(e))return!0;for(let t of["slowmo","accelerate"]){let r=e?.[t];if(!r?.enabled||r.syncBand==="none")continue;let n=Hr(r,"base",{staticValue:r.base??1,paramMin:0,paramMax:1,fxKey:t});if(Xr(n))return!0}return!1}function my(e){return e<0?0:e>1?1:e}function by(e,t,r,n,o,i){let s=Hs(e,t);if(!s?.enabled)return 0;let l=Hr(s,"base",{staticValue:s.base??1,paramMin:0,paramMax:1,fxKey:e});if(l.source==="none")return my(hr(e,s,r,jr));let p;if(Xr(l)){let D=typeof window<"u"?ie():void 0;p=D?.hydraEnvelopes?.[o]??0;let O=D?.[i];typeof O=="number"&&performance.now()<O&&(p=Math.max(p,1))}else p=n(e,l.source,r);let d=l.mapMax>l.mapMin?l.mapMax:1,v=l.mapMax>l.mapMin?l.mapMin:0,H=aa(l);return my(ia(p,v,d,H))}function wC(e,t,r){return by("slowmo",e,t,r,"slowmo","slowmoPulseUntilMs")}function AC(e,t,r){return by("accelerate",e,t,r,"accelerate","acceleratePulseUntilMs")}function yy(e,t,r,n,o){let i=1,s=e?.videoSpeed;if(s?.enabled){let d=s.base!==void 0?s.base:1.25,v=Hr(s,"base",{staticValue:d,paramMin:xc.min,paramMax:xc.max,fxKey:"videoSpeed"});if(v.source==="none")i=Math.max(0,d);else{let H=r("videoSpeed",v.source,t),D=aa(v);i=Math.max(0,ia(H,v.mapMin,v.mapMax,D))}}let l=wC(e?.slowmo,t,r);if(l>0){let d=Math.max(.02,Math.min(1,n("slowmo","minSpeed",.2))),v=uy(l);i*=1-v+v*d}let p=AC(e?.accelerate,t,r);if(p>0){let d=Math.max(1.1,Math.min(6,n("accelerate","maxSpeed",2.5))),v=sy(p);i*=1-v+v*d}return Number.isFinite(o)&&o>0&&(i=Math.min(i,fp(o))),i}function zp(e,t){for(let r of e)if(r instanceof HTMLVideoElement){if(t<sa){r.pause();continue}r.playbackRate=t}}function CC(e){let t=ie().hydraSettings?.fx?.videoSpeed;if(!t||t.enabled===!1)return;let r=t.base!==void 0?t.base:1.25,n=Math.max(0,r),o=e.duration;Number.isFinite(o)&&o>0&&(n=Math.min(n,fp(o))),zp([e],n)}function xy(e){let t=ie().__hydraVideoSpeedSync;if(typeof t=="function"){t(e);return}CC(e)}function vy(){let e=ie();return e.studioTransportActive===!0?!0:e.hydraSettings?.isVideoPlaying!==!1}u();var _c=["neonGrid","textLayer","throughTheStars","lumaDust","lumaLock","oscilloscope"],Xp=4;function RC(e){return Xp+_c.indexOf(e)}function Ty(){return Xp+_c.length}function cn(e){let t=RC(e);if(!(t<Xp))return ie()[`s${t}`]}function vc(e){return _c.includes(e)}function kC(e,t){let r=bc(e),n=e.fx;for(let o of r){if(o.kind==="fx"){let s=String(o.key),l=n?.[s];vc(s)&&l?.enabled&&t({key:s,config:l,effectKey:s});continue}let i=e.fxGroups?.[o.id];if(i?.enabled)for(let s of i.layerIds){let l=e.layerInstances?.[s];if(!l?.config.enabled)continue;let p=String(l.templateKey);vc(p)&&t({key:p,config:l.config,effectKey:Pa(o.id,s)})}}}function An(e,t){let r=null;return kC(e,n=>{n.key===t&&(r=n)}),r}function My(e,t){if(vc(e))return e;let r=yc(e);if(!r)return null;let n=t.layerInstances?.[r.layerId]?.templateKey;return!n||!vc(n)?null:n}function mn(e,t,r,n){e?.init&&e.src!==t&&(e.init({src:t,dynamic:!1}),n.owner=r,n.canvas=t)}function Fa(e,t,r){let n=cn(e);return mn(n,t,e,r),n}function Ly(){return{owner:null,canvas:null}}u();var PC=6;function wy(e){return e.transforms?.length??0}function Nr(e){let t=e,r=Object.create(Object.getPrototypeOf(e));return r.transforms=t.transforms?.slice()??[],r.defaultOutput=t.defaultOutput,r.synth=t.synth,r.type=t.type,r.defaultUniforms=t.defaultUniforms,r}function Oa(e,t){let r=t[t.length-1];(!r||wy(e)>wy(r))&&t.push(Nr(e))}function FC(e,t){return t<=0?e[0]:e[Math.max(0,e.length-t)]}function OC(e,t){return t?vn(e):Math.round(e)}function Fn(e){return e.layerSourceStack&&e.layerSourceStack.push(e.layerSrc),Sc(e)}function Sc(e){let{chain:t,layerSrc:r,mode:n,getAmount:o,solid:i,clampMode:s=!0,layerWithoutLuma:l=!1,chainStack:p,getMaskReveal:d,getMaskReach:v,getMaskThreshold:H,getMaskSoftness:D,getMaskInvert:O}=e,K=OC(n,s);if(K===hf&&p){let Y=Math.max(0,Math.min(PC,Math.round(v?.()??0))),fe=(d?.()??0)<1,Ee=O??(()=>0),be=H??(()=>.35),Fe=D??(()=>.12);if(fe){let Qe=FC(p,Y),Ze=Nr(Qe);return t.layer(Ze.layerMaskAlpha(r,o,Ee,be,Fe))}return t.layerMaskCut(r,o,Ee,be,Fe)}if(K===0)return t.blend(r,o);if(K===1)return t.diff(r.mult(i(o,o,o)));if(K===2)return t.add(r,o);if(K===3)return t.mult(r,o);if(K===4){if(l)return t.layer(r);let Y=e.getLayerLuma??o;return t.layer(r.luma(Y))}return K===5?t.layerOverlay(r,o):t}function jp(e){return Sc({...e,mode:wh(e.mode),clampMode:!1})}u();u();function Ay(e,t){e.push(t)}function Ey(e,t,r){return t.bufferStartGroupId&&t.bufferStartGroupId!==e?t.bufferStartGroupId:Object.keys(r.fxGroups).find(n=>n!==e)??null}function Tc(e){return Gp(e.bufferStart??0)}function IC(e,t,r){let n=Tc(t);if(n===ny)return r.getClipSource();if(n===gc){let o=Ey(e,t,r);return o&&r.groupBufferCache[o]?Nr(r.groupBufferCache[o]):r.solid(0,0,0)}return r.solid(0,0,0)}function Ry(e,t){for(let r of e.layerIds){let n=t[r];if(n?.templateKey==="feedback"&&n.config.enabled)return{...n.config,enabled:!0}}return null}function BC(e,t){return e.layerIds.some(r=>{let n=t[r];return!!n?.config.enabled&&n.templateKey!=="feedback"})}function ky(e,t,r,n){let o=vn(r.internalMode??2),i=[],s=[],l=e;Oa(l,i);for(let p of r.layerIds){let d=n.layerInstances[p];if(!d?.config.enabled)continue;let v=String(d.templateKey);if(v!=="feedback"){if(hc(v)){let H=Pa(t,p),D=n.buildLayer(d,H);if(!D)continue;Ay(s,D),l=Sc({chain:l,layerSrc:D,mode:o,getAmount:()=>1,solid:n.solid,layerWithoutLuma:o===4,layerSourceStack:s}),Oa(l,i);continue}l=n.applyOperator(l,v,()=>({...d.config,enabled:!0}),{chainStack:i,layerSourceStack:s},Pa(t,p)),Oa(l,i)}}return l}function Yp(e,t){let r=t.fxGroups[e];if(!r?.enabled||Tc(r)===Mi)return null;let n=ky(IC(e,r,t),e,r,t),o=Nr(n);return t.groupBufferCache[e]=o,o}function Py(e,t){let r=new Set(e.filter(o=>t.fxGroups[o]?.enabled!==!1&&t.fxGroups[o])),n=r.size+2;for(;r.size>0&&n-- >0;){let o=!1;for(let i of r){let s=t.fxGroups[i],l=Tc(s);if(l===Mi){r.delete(i),o=!0;continue}if(l===gc){let p=Ey(i,s,t);if(p&&r.has(p)&&!t.groupBufferCache[p])continue}Yp(i,t),r.delete(i),o=!0}if(!o){for(let i of r)Yp(i,t),r.delete(i);break}}}function Cy(e,t,r,n){let o=Ry(r,n.layerInstances);if(!(!!o&&!!n.hasGroupFeedbackOut?.(t)&&!!n.applyGroupFeedback&&!!n.commitGroupFeedbackLoop)||!o)return{chain:e,applied:!1};let s=n.applyGroupFeedback(e,t,o);return n.commitGroupFeedbackLoop(t,s),{chain:s,applied:!0}}function Fy(e,t,r){let n=r.fxGroups[t];if(!n?.enabled)return{chain:e,solo:!1};if(Tc(n)===Mi){let v=ky(Nr(e),t,n,r);return r.groupBufferCache[t]=Nr(v),v=Cy(v,t,n,r).chain,n.solo?{chain:v,solo:!0}:{chain:v,solo:!1}}let i=Ry(n,r.layerInstances),s=!!i&&!!r.hasGroupFeedbackOut?.(t)&&!!r.applyGroupFeedback&&!!r.commitGroupFeedbackLoop,l=r.groupBufferCache[t]??Yp(t,r)??r.solid(0,0,0),p=BC(n,r.layerInstances),d=e;if(n.solo&&!s)return{chain:Nr(l),solo:!0};if(p){let v=Number(n.composite.params?.mode??0);d=jp({chain:d,layerSrc:Nr(l),mode:v,getAmount:r.getGroupAmount(t),solid:r.solid,...r.maskCompositeOpts(t)})}else if(!s){let v=Number(n.composite.params?.mode??0);d=jp({chain:d,layerSrc:Nr(l),mode:v,getAmount:r.getGroupAmount(t),solid:r.solid,...r.maskCompositeOpts(t)})}return s&&i?(d=Cy(d,t,n,r).chain,n.solo?{chain:d,solo:!0}:{chain:d,solo:!1}):n.solo?{chain:Nr(l),solo:!0}:{chain:d,solo:!1}}u();var DC=null,HC=null;function Oy(){return DC}function Iy(e){HC=e}function By(e){if(!e.previewGroupId||!e.buffer)return null;if(e.feedbackOut){let t=e.outputs.indexOf(e.feedbackOut);if(t>0)return{out:e.feedbackOut,index:t}}for(let t of[3,2,1]){if(e.busyIndices.has(t))continue;let r=e.outputs[t];if(r)return{out:r,index:t}}return null}u();u();var Dy=[.042,.052,.062,.075],Hy=.06,NC=.0665;function Ci(e){return e?.enabled?Math.round(Number(e.params?.type??1))===4:!1}function Ny(e){return Ci(e?.patternLayer)}function Ns(e){let t=Math.max(.25,e);return Math.round(Math.max(96,Math.min(960,300*Math.pow(t,.79))))}function Gy(e,t,r,n,o=2,i=.18,s=.35){let l=Math.max(0,Math.min(3,Math.round(e))),p=Math.max(0,Math.min(1,s));return{look:l,feed:Dy[l]??Dy[1],kill:Hy+(NC-Hy)*p,cells:Ns(t),speed:Math.max(0,Math.min(2,r)),styleMap:Math.max(0,Math.min(1,n)),symmetry:Math.max(0,Math.min(3,Math.round(o))),seedSize:Math.max(.08,Math.min(.55,i)),gap:p}}u();var Mc=`
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
`,Gs=`
  float tint = clamp(pat, 0.0, 1.0);
  return vec4(mix(vec3(ar, ag, ab), vec3(br, bg, bb), tint), 1.0);
`,Wy=`${Mc}
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
${Gs}`,Uy=`${Mc}
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
${Gs}`,Vy=`${Mc}
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
${Gs}`,$y=`${Mc}
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
${Gs}`,zy=`
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

${Gs}`,Xy=`
  // A cell needs a couple of texels to itself: at one texel apiece, rounding sends
  // some neighbour reads to the wrong cell and the field decouples. This is what
  // bounds Density on a small canvas. Sim and display both see the canvas
  // resolution here, so their grids stay in step.
  float cellsX = clamp(cells, 48.0, min(${960}.0, resolution.x * 0.5));
  vec2 grid = vec2(floor(cellsX), max(8.0, floor(cellsX / aspect)));
`,la=[{type:"sampler2D",name:"stateTex",default:0},{type:"float",name:"variant",default:1},{type:"float",name:"cells",default:140},{type:"float",name:"symmetry",default:2}];function Ia(e,t){return`
  float aspect = resolution.x / max(1.0, resolution.y);
  ${Xy}
  // Interpolate on the same folded lattice the sim writes to. Sampling a
  // screen-aligned grid instead straddles the fold and speckles every edge.
  ${WC("uvF","_st","D")}
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
`}var jy=Ia([.012,.012,.024],[.941,.671,.988]);function WC(e,t,r){let n=`symM${r}`,o=`rSym${r}`,i=`aSym${r}`,s=`seg${r}`,l=`fit${r}`;return`
  vec2 ${e} = ${t} - 0.5;
  ${e}.x *= aspect;
  float ${n} = floor(clamp(symmetry, 0.0, 3.0) + 0.5);
  if (${n} > 0.5 && ${n} < 1.5) {
    ${e}.x = abs(${e}.x);
  } else if (${n} > 1.5 && ${n} < 2.5) {
    ${e} = abs(${e});
  } else if (${n} > 2.5) {
    float ${o} = length(${e});
    float ${i} = atan(${e}.y, ${e}.x);
    float ${s} = 1.0471976;
    ${i} = mod(${i} + ${s}, ${s} * 2.0);
    ${i} = abs(${i} - ${s});
    // Shrink the wedge to fit the buffer. Rotating a frame corner to the wedge
    // pushes it past the edge, where the clamp below would flatten every outer
    // radius onto the border and smear the frame into bands.
    float ${l} = 0.49 / max(0.001, length(vec2(0.5 * aspect, 0.5)) * sin(${s}));
    ${e} = ${o} * ${l} * vec2(cos(${i}), sin(${i}));
  }
  ${e}.x /= aspect;
  ${e} = clamp(${e} + 0.5, 0.001, 0.999);
`}var Yy=`
  vec2 uv = clamp(_st, 0.001, 0.999);
  float aspect = resolution.x / max(1.0, resolution.y);
  float spd = clamp(speed, 0.0, 2.0);
  float f = clamp(feed, 0.03, 0.09);
  float wander = clamp(styleMap, 0.0, 1.0);

  ${Xy}
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
`;u();function Lc(e){return{getTexture:()=>e()?.getTexture?.()}}function Ei(e){return{getTexture:()=>e()?.getCurrent?.()}}u();u();u();function qy(e){let t=e*e,r=new Float32Array(t),n=new Uint8Array(t),o=new Uint8Array(t*4),i=3,s=[];for(let p=-i;p<=i;p++)for(let d=-i;d<=i;d++){let v=d*d+p*p;v!==0&&s.push([d,p,1/v])}let l=p=>{let d=p%e,v=p/e|0;for(let[H,D,O]of s){let K=(d+H+e)%e,Y=(v+D+e)%e;r[Y*e+K]+=O}};for(let p=0;p<t;p++)Math.random()<.045&&(n[p]=1,l(p));for(let p=0;p<t;p++){let d=0,v=1/0;for(let K=0;K<t;K++){if(n[K])continue;let Y=r[K];Y<v&&(v=Y,d=K)}n[d]=1,l(d);let H=Math.floor(p/Math.max(1,t-1)*255),D=Math.floor(H*97%256*.92),O=d*4;o[O]=H,o[O+1]=D,o[O+2]=H,o[O+3]=255}return o}var UC={value256:{kind:"file",path:"/textures/shadertoy-noise256.jpg",wrap:"repeat",mag:"linear",min:"linear"},blue64:{kind:"generated",size:64,wrap:"repeat",mag:"nearest",min:"nearest",generate:qy}},Ri=new Map,wc=null,VC=e=>({getTexture:()=>(console.warn(`[noise] texture "${e}" not loaded yet`),null)});function Ac(e){return Ri.get(e)??VC(e)}function $C(e,t,r){return new Promise(n=>{let o=new Image;o.crossOrigin="anonymous";let i=()=>{Ri.set(t,{getTexture:()=>e.texture({data:new Uint8Array([128,128,128,255]),shape:[1,1]})}),n()};o.addEventListener("load",()=>{try{let s=e.texture({data:o,wrap:r.wrap,mag:r.mag,min:r.min});Ri.set(t,{getTexture:()=>s})}catch{i()}n()},{once:!0}),o.addEventListener("error",i,{once:!0}),o.src=r.path})}function zC(e,t,r){try{let n=e.texture({data:r.generate(r.size),shape:[r.size,r.size],wrap:r.wrap,mag:r.mag,min:r.min});Ri.set(t,{getTexture:()=>n})}catch{Ri.set(t,{getTexture:()=>e.texture({data:new Uint8Array([128,128,128,255]),shape:[1,1]})})}return Promise.resolve()}function XC(e,t,r){return r.kind==="file"?$C(e,t,r):zC(e,t,r)}function Ky(e){let t=Object.entries(UC).filter(([r])=>!Ri.has(r));return t.length===0?Promise.resolve():wc||(wc=Promise.all(t.map(([r,n])=>XC(e,r,n))).then(()=>{}),wc)}var jC="value256";function Cc(){return Ac(jC)}function Qy(e){return Ky(e)}u();u();u();var qp=Math.PI/1.5,Zy=`
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
  float expandSec = ${qp.toFixed(6)};
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
`;var Ws=6,Jy=qp;function Ec(){return[]}function ex(e,t){e.push({bornMs:t});let r=Ws*4;for(;e.length>r;)e.shift()}function tx(e,t){let r=[];for(let n=e.length-1;n>=0;n--){let o=e[n],i=(t-o.bornMs)/1e3;if(i>=Jy){e.splice(n,1);continue}r.push({ageFrac:Math.max(0,Math.min(1,i/Jy))})}return r.length>Ws&&(r.sort((n,o)=>n.ageFrac-o.ageFrac),r.length=Ws),{count:r.length,slots:r}}var Rc=Ws,ki=null;function rx(e){if(ki)return;let t=new Uint8Array(Rc*4),r=e.texture({data:t,shape:[Rc,1],wrap:"clamp",mag:"nearest",min:"nearest"});ki={data:t,tex:r}}function kc(){return ki?{getTexture:()=>ki.tex}:{getTexture:()=>(console.warn("[electricNoise] trigger texture not loaded yet"),null)}}function nx(e){if(!ki)return;let{data:t,tex:r}=ki;t.fill(0);let n=Math.min(e.length,Rc);for(let i=0;i<n;i++){let s=Math.max(0,Math.min(1,e[i].ageFrac)),l=i*4;t[l]=Math.round(s*255),t[l+3]=255}r.subimage?.({data:t,width:Rc,height:1})}u();u();var YC=[1,2,4,8];function Ba(e){let t=YC;if(t.includes(e))return e;let r=t[0];for(let n of t)Math.abs(n-e)<Math.abs(r-e)&&(r=n);return r}var Yn=(e,t,r,n,o)=>`
    {
      vec2 pa = ${r} - ${e};
      vec2 ba = ${t} - ${e};
      float hSeg = clamp(dot(pa, ba) / max(dot(ba, ba), 1.0e-6), 0.0, 1.0);
      float d = length(pa - ba * hSeg);
      float d2 = length(${e} - ${t});
      float fade = smoothstep(0.5, 1.5, d2);
      fade += smoothstep(0.02, 0.05, abs(d2 - 0.75));
      float depthW = mix(0.01, 0.07, smoothstep(0.92, 0.08, ${o}));
      float along = 1.0 - 4.0 * hSeg * (1.0 - hSeg);
      depthW *= mix(0.55, 1.45, along);
      float core = smoothstep(depthW, depthW * 0.18, d);
      float halo = exp(-14.0 * d / max(depthW, 0.001)) * 0.48 * haloGain;
      ${n} += (core + halo) * fade * lineBright;
    }`,Vo=(e,t,r,n,o)=>`
    {
      vec2 offs = vec2(${t}, ${r});
      vec2 pid = ${n} + offs;
      vec3 ha = fract(vec3(pid.xyx) * vec3(213.897, 653.453, 253.098));
      ha += dot(ha, ha.yzx + 79.76);
      float rn = fract((ha.x + ha.y) * ha.z);
      float n1 = fract(rn * 10.0);
      float n2 = fract(rn * 100.0);
      float ang = ${o} + rn;
      ${e} = offs + vec2(sin(ang * n1), cos(ang * n2)) * 0.4;
    }`,Us=(e,t,r,n,o,i,s)=>`
    {
      float d = length(${t} - ${e});
      float core = (0.006 * ${o}) / max(d * d, 1.0e-4);
      core *= smoothstep(${i}, ${i} * 0.42, d);
      float pulse = pow(sin((fract(${e}.x) + fract(${e}.y) + tAnim) * 5.0) * 0.4 + 0.6, 20.0);
      pulse = mix(1.0, pulse, ${s});
      ${r} += core * pulse * mix(0.4, 1.2, ${n});
    }`,ox=`
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

    ${Vo("p0","-1.0","-1.0","id","tAnim")}
    ${Vo("p1","0.0","-1.0","id","tAnim")}
    ${Vo("p2","1.0","-1.0","id","tAnim")}
    ${Vo("p3","-1.0","0.0","id","tAnim")}
    ${Vo("p4","0.0","0.0","id","tAnim")}
    ${Vo("p5","1.0","0.0","id","tAnim")}
    ${Vo("p6","-1.0","1.0","id","tAnim")}
    ${Vo("p7","0.0","1.0","id","tAnim")}
    ${Vo("p8","1.0","1.0","id","tAnim")}

    float mLocal = 0.0;
    float sparkle = 0.0;

    ${Yn("p1","p5","stLocal","mLocal","layerDepth")}
    ${Yn("p5","p7","stLocal","mLocal","layerDepth")}
    ${Yn("p7","p3","stLocal","mLocal","layerDepth")}
    ${Yn("p3","p1","stLocal","mLocal","layerDepth")}

    ${Yn("p4","p1","stLocal","mLocal","layerDepth")}
    ${Yn("p4","p5","stLocal","mLocal","layerDepth")}
    ${Yn("p4","p7","stLocal","mLocal","layerDepth")}
    ${Yn("p4","p3","stLocal","mLocal","layerDepth")}

    ${Yn("p4","p0","stLocal","mLocal","layerDepth")}
    ${Yn("p4","p2","stLocal","mLocal","layerDepth")}
    ${Yn("p4","p6","stLocal","mLocal","layerDepth")}
    ${Yn("p4","p8","stLocal","mLocal","layerDepth")}

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
`;var Kp=1.05;function Pc(e,t){let r=Ba(e);return t==="minimal"?Math.min(r,1):t==="reduced"?Math.min(r,2):r}function Fc(e,t){let r=Math.max(Kp,e);return t==="minimal"?Math.max(Kp,r*.68):t==="reduced"?Math.max(Kp,r*.84):r}u();function Oc(e){if(!Number.isFinite(e))return 3;let t=Math.round(e);return t<3?3:t>16?16:t}var ax=`
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
`;var qC=()=>1;function Rr(e,t){let n=(typeof e=="string"?e:t).replace("#","").trim();if(n.length!==6)return[0,0,0];let o=parseInt(n,16);return Number.isNaN(o)?[0,0,0]:[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255]}function KC(e,t,r,n,o){return Zt(e,t.config,r,n,o(),t.templateKey)}function Qp(e){return e.scale(()=>window.innerWidth/window.innerHeight,1)}function hn(e,t,r){let n=e.config.params?.[t];return typeof n=="string"?n:r}function QC(e,t,r){return hr(e,t.config,r(),jr)}function Zp(e,t,r){let n=t.config;return!n.syncBand||n.syncBand==="none"?0:_n(e,n.syncBand,r(),void 0,n)*(n.syncMultiplier??.45)}function ix(e,t){let{hydra:r,hydraRef:n,effectKey:o,activeChannelRef:i,renderQualityRef:s,electricNoiseCirclePackRef:l,liveHydraBands:p}=t,{fillLayerSrc:d,shapeLayerSrc:v,superformulaSrc:H,plasmaSrc:D,patternNoiseSrc:O,patternCellsSrc:K,patternTilesSrc:Y,patternPolarSrc:fe,patternGeometrySrc:Ee,electricNoiseSrc:be,plexusSrc:Fe,universeWithinSrc:Qe,fractalFoldSrc:Ze,topoContourSrc:dt,gaussianNoiseGrid:kt,noise:at,solid:rt,src:mt,s0:R,s1:A}=r,C=(oe,Te)=>KC(o,e,oe,Te,p),f=()=>e.config.params;switch(e.templateKey){case"fillLayer":return typeof d=="function"?Qp(d(()=>Rr(f()?.colorA,"#7c3aed")[0],()=>Rr(f()?.colorA,"#7c3aed")[1],()=>Rr(f()?.colorA,"#7c3aed")[2],()=>Rr(f()?.colorB,"#06b6d4")[0],()=>Rr(f()?.colorB,"#06b6d4")[1],()=>Rr(f()?.colorB,"#06b6d4")[2],()=>Math.max(0,Math.min(3,Math.round(Number(C("type",1))))),()=>C("softness",.35),()=>Math.max(0,Math.min(3,Math.round(Number(C("sweep",0))))))):rt(1,0,0);case"noise":{let oe=()=>Math.max(8,Math.min(8192,C("scale",1681))),Te=()=>.22*Math.pow(Math.min(3,Math.max(0,Number(C("speed",.15)))),1.35);return kt!=null?Qp(kt(()=>oe(),()=>Te())):Qp(at(()=>Math.max(.05,oe()*.12),()=>.02+Te()*1.25).saturate(0))}case"plasma":return typeof D=="function"?D(()=>C("speed",1.1),()=>C("scale",1),()=>C("complexity",1)):rt(.5,.2,.9);case"patternLayer":{let oe=()=>Rr(hn(e,"colorA","#0b1020"),"#0b1020")[0],Te=()=>Rr(hn(e,"colorA","#0b1020"),"#0b1020")[1],qe=()=>Rr(hn(e,"colorA","#0b1020"),"#0b1020")[2],Ve=()=>Rr(hn(e,"colorB","#22d3ee"),"#22d3ee")[0],Ne=()=>Rr(hn(e,"colorB","#22d3ee"),"#22d3ee")[1],Xe=()=>Rr(hn(e,"colorB","#22d3ee"),"#22d3ee")[2],Je=()=>Math.max(0,Math.min(3,Math.round(Number(C("variant",2))))),It=()=>Math.max(0,Math.min(10,Math.round(Number(C("geometry",0))))),et=()=>C("scale",1),Ht=()=>C("speed",.4),bt=()=>C("warp",0),yt=()=>Ns(et()),Pt=()=>C("symmetry",2),_t=Math.max(0,Math.min(5,Math.round(Number(C("type",1))))),Ut=Ei(()=>n.current?.o?.[3]);if(_t===4){n.current?.synth?.setFunction?.({name:"patternTuringDisplay",type:"src",inputs:[...la],glsl:Ia(Rr(hn(e,"colorA","#0b1020"),"#0b1020"),Rr(hn(e,"colorB","#22d3ee"),"#22d3ee"))});let br=ie().patternTuringDisplay;return br?br(Ut,Je,yt,Pt):mt(Ut)}if(_t===5)return typeof Ee=="function"?Ee(It,et,Ht,bt,oe,Te,qe,Ve,Ne,Xe):rt(.1,.6,.9);let tr=_t===1?K:_t===2?Y:_t===3?fe:O;return typeof tr=="function"?tr(Je,et,Ht,bt,oe,Te,qe,Ve,Ne,Xe):rt(.1,.6,.9)}case"electricNoise":{let oe=()=>C("speed",1),Te=()=>C("scale",1),qe=()=>C("noiseScale",1),Ve=()=>C("turbulence",.2),Ne=()=>C("detail",5),Xe=()=>C("intensity",1.4),Je=()=>C("rings",.85),It=()=>C("ringPower",.9),et=()=>Rr(hn(e,"color","#331a66"),"#331a66")[0],Ht=()=>Rr(hn(e,"color","#331a66"),"#331a66")[1],bt=()=>Rr(hn(e,"color","#331a66"),"#331a66")[2],yt=()=>l.current,Pt=()=>yt().count;return typeof be=="function"?be(Cc(),oe,Te,qe,Ve,Ne,Xe,Je,It,qC,kc(),Pt,et,Ht,bt):rt(.2,.1,.4)}case"plexus":return typeof Fe=="function"?Fe(()=>C("speed",1),()=>Fc(C("points",1.5),s.current),()=>C("intensity",1),()=>Pc(C("layers",4),s.current),()=>C("glow",1.2),()=>Zp(o,e,p)):rt(.4,.15,.85);case"topoContour":{let oe=i.current===0?R:A;return typeof dt=="function"?dt(oe,()=>C("scale",1),()=>Math.max(2,Math.min(24,Math.round(C("lines",10)))),()=>C("speed",1),()=>C("valley",.12),()=>C("lineWidth",1),()=>C("videoTint",.35),()=>Math.max(0,Math.min(1,Math.round(C("palette",0))))):rt(0,0,0)}case"universeWithin":return typeof Qe=="function"?Qe(()=>C("speed",1),()=>C("zoom",1.5),()=>Ba(C("layers",4)),()=>C("glow",1.2),()=>Zp(o,e,p)):rt(.4,.15,.85);case"fractalFold":return typeof Ze=="function"?Ze(()=>C("foldX",.86),()=>C("foldY",1.04),()=>C("zoom",1),()=>C("speed",.6),()=>C("spin",.42),()=>Oc(C("depth",8)),()=>C("glow",1.4),()=>C("hue",.12),()=>Zp(o,e,p)):rt(.15,.35,.9);case"shapeLayer":return typeof v=="function"?v(()=>Math.max(0,Math.min(4,Math.round(Number(C("shape",0))))),()=>C("size",.45),()=>C("roundness",0),()=>C("stroke",.15),()=>C("rotate",0),()=>C("centerX",.5),()=>C("centerY",.5),()=>Rr(hn(e,"color","#ffffff"),"#ffffff")[0],()=>Rr(hn(e,"color","#ffffff"),"#ffffff")[1],()=>Rr(hn(e,"color","#ffffff"),"#ffffff")[2],()=>QC(o,e,p),()=>Math.max(0,Math.min(1,Math.round(Number(C("fill",0)))))):rt(1,1,1);case"superformula":return typeof H=="function"?H(()=>Math.max(0,Math.min(2,Math.round(Number(C("look",2))))),()=>C("m",7.6),()=>C("n1",.36),()=>C("n2",2.16),()=>C("size",.48),()=>C("speed",.35),()=>C("glow",1.2),()=>Rr(hn(e,"color","#c4b5fd"),"#c4b5fd")[0],()=>Rr(hn(e,"color","#c4b5fd"),"#c4b5fd")[1],()=>Rr(hn(e,"color","#c4b5fd"),"#c4b5fd")[2]):rt(.77,.71,.99);default:return null}}u();function rd(e,t,r){let n=e?.params?.[t];return typeof n=="number"&&Number.isFinite(n)?n:r}u();function sx(e,t,r){let n=yc(e);if(!n)return;let o=r?.[n.layerId];if(!(!o||String(o.templateKey)!==t))return o.config}u();function nd(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function od(e){let t=e<=.0031308?e*12.92:1.055*Math.pow(e,.4166666666666667)-.055;return Math.min(1,Math.max(0,t))}function ZC(e,t,r){let n=nd(e),o=nd(t),i=nd(r),s=Math.cbrt(.4122214708*n+.5363325363*o+.0514459929*i),l=Math.cbrt(.2119034982*n+.6806995451*o+.1073969566*i),p=Math.cbrt(.0883024619*n+.2817188376*o+.6299787005*i);return{L:.2104542553*s+.793617785*l-.0040720468*p,a:1.9779984951*s-2.428592205*l+.4505937099*p,b:.0259040371*s+.7827717662*l-.808675766*p}}function JC(e){let t=(e.L+.3963377774*e.a+.2158037573*e.b)**3,r=(e.L-.1055613458*e.a-.0638541728*e.b)**3,n=(e.L-.0894841775*e.a-1.291485548*e.b)**3;return[od(4.0767416621*t-3.3077115913*r+.2309699292*n),od(-1.2684380046*t+2.6097574011*r-.3413193965*n),od(-.0041960863*t-.7034186147*r+1.707614701*n)]}function eE(e,t){let r=Math.max(2,Math.min(4,Math.round(t)));if(e.length===0)return Array.from({length:r},(H,D)=>({L:D/(r-1),a:0,b:0}));let n=1/0,o=-1/0;for(let H of e)H.L<n&&(n=H.L),H.L>o&&(o=H.L);let i=Math.max(.001,o-n),s=Array.from({length:r},(H,D)=>({L:n+i*D/(r-1),a:0,b:0})),l=new Float64Array(r),p=new Float64Array(r),d=new Float64Array(r),v=new Int32Array(r);for(let H=0;H<6;H++){l.fill(0),p.fill(0),d.fill(0),v.fill(0);for(let D of e){let O=0,K=1/0;for(let Y=0;Y<r;Y++){let fe=s[Y],Ee=D.L-fe.L,be=D.a-fe.a,Fe=D.b-fe.b,Qe=Ee*Ee+be*be+Fe*Fe;Qe<K&&(K=Qe,O=Y)}l[O]+=D.L,p[O]+=D.a,d[O]+=D.b,v[O]+=1}for(let D=0;D<r;D++){let O=v[D];O!==0&&(s[D]={L:l[D]/O,a:p[D]/O,b:d[D]/O})}}return s.toSorted((H,D)=>H.L-D.L)}var tE=.02;function rE(e,t,r=0,n=1){let o=Math.max(0,Math.min(1,t));if(Math.hypot(e.a,e.b)>=tE){let p=1+o*1.6;return{L:e.L,a:e.a*p,b:e.b*p}}let s=r/Math.max(1,n)*Math.PI*2+.6,l=o*.11;return{L:e.L,a:Math.cos(s)*l,b:Math.sin(s)*l}}var Gr={canvas:null,ctx:null,rgb:new Float32Array(12),lastMs:0,lastCount:0,seeded:!1};function nE(){if(Gr.ctx)return Gr.ctx;if(typeof document>"u")return null;let e=document.createElement("canvas");e.width=24,e.height=24;let t=e.getContext("2d",{willReadFrequently:!0});return t?(Gr.canvas=e,Gr.ctx=t,t):null}function oE(e,t,r){let n=e.length;for(let o=0;o<4;o++){let i=Math.min(o,n-1),s=e[i],[l,p,d]=JC(rE(s,t,i,n)),v=o*3;r?(Gr.rgb[v]=l,Gr.rgb[v+1]=p,Gr.rgb[v+2]=d):(Gr.rgb[v]+=(l-Gr.rgb[v])*.18,Gr.rgb[v+1]+=(p-Gr.rgb[v+1])*.18,Gr.rgb[v+2]+=(d-Gr.rgb[v+2])*.18)}}function lx(e,t,r,n){let o=t!==Gr.lastCount,i=n-Gr.lastMs>=120;if(!o&&!i)return Gr.rgb;let s=nE();if(!s||!e||e.readyState<2||e.videoWidth<2)return Gr.rgb;Gr.lastMs=n,Gr.lastCount=t,s.drawImage(e,0,0,24,24);let l=s.getImageData(0,0,24,24).data,p=[];for(let d=0;d<l.length;d+=4)p.push(ZC(l[d]/255,l[d+1]/255,l[d+2]/255));return oE(eE(p,t),r,!Gr.seeded||o),Gr.seeded=!0,Gr.rgb}u();var Ic="vec3(0.299, 0.587, 0.114)",aE=e=>`
  vec2 nmUvB = gl_FragCoord.xy / resolution.xy;
  float nmEpsB = 2.0 / min(resolution.x, resolution.y);
  float nmLxp = dot(texture2D(videoTex, clamp(nmUvB + vec2(nmEpsB, 0.0), 0.001, 0.999)).rgb, ${Ic});
  float nmLxm = dot(texture2D(videoTex, clamp(nmUvB - vec2(nmEpsB, 0.0), 0.001, 0.999)).rgb, ${Ic});
  float nmLyp = dot(texture2D(videoTex, clamp(nmUvB + vec2(0.0, nmEpsB), 0.001, 0.999)).rgb, ${Ic});
  float nmLym = dot(texture2D(videoTex, clamp(nmUvB - vec2(0.0, nmEpsB), 0.001, 0.999)).rgb, ${Ic});
  float nmDetV = max(0.15, detail) * 14.0;
  ${e} = normalize(vec3((nmLxp - nmLxm) * 0.5 * nmDetV, (nmLyp - nmLym) * 0.5 * nmDetV, 1.0));
`,Pi=(e,t,r)=>`
  vec2 nmGV${r} = floor((${e}) * nmSc);
  vec2 nmFV${r} = fract((${e}) * nmSc);
  float nmV0${r} = fract(sin(dot(nmGV${r} + vec2(nmTn * 0.11, 0.0), vec2(127.1, 311.7))) * 43758.5453);
  float nmV1${r} = fract(sin(dot(nmGV${r} + vec2(3.7, nmTn * 0.09), vec2(127.1, 311.7))) * 43758.5453);
  ${t} = clamp(max(
    1.0 - length(nmFV${r} - vec2(0.25, 0.35) - nmV0${r} * 0.5),
    1.0 - length(nmFV${r} - vec2(0.72, 0.68) - nmV1${r} * 0.5)
  ), 0.0, 1.0);
`,cx=`
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
`,ux=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec3 nmLit = vec3(0.0, 0.0, 1.0);

  if (mapSource >= 0.5) {
    ${aE("nmLit")}
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
`;u();u();var iE={full:{blurGaussianTaps:8,blurRadialSteps:8,glowAura:!0,warpTunnelQuality:0},reduced:{blurGaussianTaps:4,blurRadialSteps:6,glowAura:!0,warpTunnelQuality:1},minimal:{blurGaussianTaps:4,blurRadialSteps:4,glowAura:!1,warpTunnelQuality:2}};function ca(e){return iE[e??"full"]}function fx(e){return e<1e-5?0:Math.max(.001,e*.045)}function px(e){return e<1e-5?0:Math.min(.35,e*.17)}function dx(e){return ca(e).blurRadialSteps}var mx=[[-4,1/256],[-3,8/256],[-2,28/256],[-1,56/256],[0,70/256],[1,56/256],[2,28/256],[3,8/256],[4,1/256]],sE=[[-2,1/16],[-1,4/16],[0,6/16],[1,4/16],[2,1/16]],lE=[[-1,1/4],[0,2/4],[1,1/4]];function Bc(e){return ca(e).blurGaussianTaps>=8?sE:lE}var hx=24,gx=.2;function Dc(e,t){let r=new Set(t);for(let n of e)if(n!=null&&!r.has(n))return n;return null}u();function bx(e){return e<1e-5?0:Math.min(2,e*2)}function yx(e){let t=Math.max(0,Math.min(1,e??0));return Math.min(1,t*2)}var xx=`
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
`,vx=18,_x=.14,ad=2;u();function Sx(e){let t=Math.max(.25,Math.min(2,e??1));return Math.max(5e-4,t*.008)}function Tx(e){return ca(e).blurGaussianTaps>=8?[{kind:"center",weight:.2},{kind:"scrollX",weight:.2,sign:1},{kind:"scrollX",weight:.2,sign:-1},{kind:"scrollY",weight:.2,sign:1},{kind:"scrollY",weight:.2,sign:-1}]:[{kind:"center",weight:.34},{kind:"scrollX",weight:.33,sign:1},{kind:"scrollY",weight:.33,sign:1}]}u();var Ha=[{shapeScale:.5,xMult:2,yMult:.5,tearAmpX:.05,tearAmpY:.03,tearPhaseX:.2,tearPhaseY:1.1,tearRateX:3.2,tearRateY:2.8,travelPhaseX:.2,travelPhaseY:1.1,travelRateX:.42,travelRateY:.36,travelSpreadX:.44,travelSpreadY:.4},{shapeScale:.4,xMult:.5,yMult:2.5,tearAmpX:-.04,tearAmpY:.02,tearPhaseX:2.4,tearPhaseY:3.7,tearRateX:4.1,tearRateY:3.5,travelPhaseX:2.4,travelPhaseY:3.7,travelRateX:.51,travelRateY:.33,travelSpreadX:.46,travelSpreadY:.42},{shapeScale:.6,xMult:1.2,yMult:.8,tearAmpX:.03,tearAmpY:-.05,tearPhaseX:4.2,tearPhaseY:5.5,tearRateX:3.8,tearRateY:2.6,travelPhaseX:4.2,travelPhaseY:5.5,travelRateX:.47,travelRateY:.39,travelSpreadX:.41,travelSpreadY:.45},{shapeScale:.3,xMult:.8,yMult:1.5,tearAmpX:-.06,tearAmpY:-.04,tearPhaseX:6.1,tearPhaseY:7.3,tearRateX:4.6,tearRateY:3.1,travelPhaseX:6.1,travelPhaseY:7.3,travelRateX:.44,travelRateY:.31,travelSpreadX:.43,travelSpreadY:.41}];function Fi(e,t,r=1){return{...e,shapeScale:e.shapeScale*r,tearPhaseX:e.tearPhaseX+t,tearPhaseY:e.tearPhaseY+t*1.17,travelPhaseX:e.travelPhaseX+t,travelPhaseY:e.travelPhaseY+t*.91,tearRateX:e.tearRateX+t*.04,tearRateY:e.tearRateY+t*.035,travelRateX:e.travelRateX+t*.03,travelRateY:e.travelRateY+t*.028}}var id=[...Ha,Fi(Ha[0],8.3,.92),Fi(Ha[1],9.4,.88),Fi(Ha[2],10.5,.95),Fi(Ha[3],11.6,.9),Fi(Ha[0],12.7,.78),Fi(Ha[2],13.8,.82)];function sd(e,t,r,n){return Number.isFinite(e)?Math.max(t,Math.min(r,e)):n}function Mx(e){return e>0&&e<=1?e*10:e}function ld(e){let t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(10,Math.round(Mx(t)))):4}function Lx(e){let t=Number(e);return Number.isFinite(t)?sd(Mx(t),0,10,5):5}function cd(e){return Math.max(0,Math.min(1,e/10))}function wx(e,t){return e*cd(t)*2}function Ax(e){return e<1e-5?0:.85+e*.35}function ud(e,t){return e*(.45+t*.95)}function Cx(e){return sd(Number(e),0,1,1)}function Ex(e){return sd(Number(e),0,1,1)}function fd(e,t,r,n,o,i,s){let l=Math.sin(o*i*t+e)*.58+Math.sin(o*i*t*.53+e*1.7)*.28,p=Math.sin(Math.floor(o*i*t*.38)*5.11+e*1.4)*.34,d=(l+p)*r*1.15*s,v=(n*.23+e*.037)%1-.5;return{pivot:.5+d*.75+v*.32,scroll:d*1.05+v*.48}}u();function pd(e,t,r){return e<1e-5?{pix:1e4,pixRows:1e4}:{pix:t,pixRows:r}}function Rx(e,t,r){let n=Math.max(4,Math.min(194,Math.round(e)));return Math.max(2,Math.round(n*(r/Math.max(1,t))))}u();function kx(e,t,r){let n=Math.max(.05,Math.min(1,e??.35)),o=Math.max(0,Math.min(1,t??.35));return(.75+n*2.5)/Math.max(1,r)*(1.15-o*.7)}function Px(e,t){let r=1.5/Math.max(1,t);return Math.max(r,Math.abs(e)*1.35)}u();function Fx(e,t){return t<1e-5?0:Math.max(.01,e*.042)}function Ox(e,t){return t<1e-5?0:Math.min(.62,t*(.32+e*.36))}function Ix(e){let t=Bc(e).filter(([n])=>n!==0),r=t.reduce((n,[,o])=>n+o,0);return r<1e-5?t:t.map(([n,o])=>[n,o/r])}u();function Bx(e,t,r){if(t<1e-5)return 0;let n=Math.max(0,Math.min(1,e)),o=Math.max(0,Math.min(1,r));return n*t*.052*(.3+o*.7)}function Dx(e,t){if(e<1e-5)return 0;let r=Math.max(0,Math.min(1,t));return Math.min(.95,e*(.28+r*.72))}function Hx(e){return Math.max(0,Math.min(1,.25+e*.75))}u();var T8=Math.PI*2;function Nx(e){return Math.max(0,Math.min(1,e))}function Gx(e,t){return Nx(e)*.26*(.4+.6*Nx(t))}u();u();var Wx=-40;var Ux="fadeOff";function cE(e){if(!e)return!0;let t=e.base??0,r=e.syncMultiplier??0;return t<1e-5&&r<1e-5}function uE(){let e=ie().masterDbfs;return typeof e!="number"||!Number.isFinite(e)?!1:e>=Wx}function fE(e,t){let r=e.syncBand??"none";if(r==="none"){if(t&&typeof t.master=="number")return t.master;let n=ie();return typeof n.masterLevel=="number"?n.masterLevel:0}return _n(Ux,r,t)}function Vx(e,t){if(!e||!e.enabled||cE(e)||!uE())return 0;let r=fE(e,t),n=Math.max(0,Math.min(1,r)),o=pE(e,t),i=Math.max(0,Math.min(1,e.syncMultiplier??0));return Math.max(0,Math.min(1,(1-n)*(o+i)))}function pE(e,t){let r=e.paramSync?.base;if(r?.band&&r.band!=="none"){let n=Gb(e,Ux,"base",{staticValue:e.base??0,paramMin:0,paramMax:1}),o=wo(n.source,t),i=aa(n),s=ia(o,n.mapMin,n.mapMax,i);return Math.max(0,Math.min(1,s))}return Math.max(0,Math.min(1,e.base??0))}u();function $x(e){return(e.base??0)<1e-5&&(e.syncBand??"none")==="none"}function zx(e,t){let r=Math.max(0,Math.min(1,e.base??0));return(e.syncBand??"none")==="none"?r:Math.max(0,Math.min(1,(e.base??0)+t*(e.syncMultiplier??0)))}function Xx(e,t,r){if($x(r))return 0;if(r.isTrigger)return t;if((r.syncBand??"none")!=="none"){let n=r.params?.tail,i=.035+(1-Math.max(0,Math.min(1,typeof n=="number"?n:.82)))*.26,l=t>e?.58:i;return e+l*(t-e)}return t<1e-5?0:e+.32*(t-e)}function jx(e,t){return!e?.enabled||$x(e)?0:Math.max(0,Math.min(1,t))}function Yx(e,t,r){return(e.syncBand??"none")==="none"?0:e.isTrigger?t:r(e.syncBand??"none")}u();function qx(e){return(e.base??0)<1e-5&&(e.syncBand??"none")==="none"}function Kx(e,t){let r=Math.max(0,Math.min(1,e.base??0));return(e.syncBand??"none")==="none"?r:Math.max(0,Math.min(1,(e.base??0)+t*(e.syncMultiplier??0)))}function Qx(e,t,r){if(qx(r))return 0;if(r.isTrigger)return t;if((r.syncBand??"none")!=="none"){let n=r.params?.tail,i=.04+(1-Math.max(0,Math.min(1,typeof n=="number"?n:.82)))*.28,l=t>e?.62:i;return e+l*(t-e)}return t<1e-5?0:e+.35*(t-e)}function Zx(e,t){return!e?.enabled||qx(e)?0:Math.max(0,Math.min(1,t))}function Jx(e,t,r){return(e.syncBand??"none")==="none"?0:e.isTrigger?t:r(e.syncBand??"none")}u();u();function ev(e,t){return e<1e-5?0:t*e*.028}function tv(e){return e<1e-5?0:e*.85}var mE=.88;function dd(e,t,r){if(e<1e-5||r===0)return{x:0,y:0};let n=r*e*.028;return{x:Math.cos(t)*n,y:Math.sin(t)*n}}function nv(e){return e<1e-5?0:e*mE}u();var hE=[{minX:.04,maxX:.44,minY:.04,maxY:.44},{minX:.56,maxX:.96,minY:.04,maxY:.44},{minX:.18,maxX:.82,minY:.56,maxY:.96}],md=[16/9,4/3,1,9/16];function Na(e){let t=Math.sin(e)*43758.5453;return t-Math.floor(t)}function gE(e){let t=Math.floor(Na(e+60)*md.length)%md.length;return md[t]}function bE(e){return{zoom:1+Na(e+1)*1,panX:(Na(e+2)-.5)*.55,panY:(Na(e+3)-.5)*.55}}function yE(e,t,r,n,o){let i=Math.max(.06,Math.min(.55,t)),s=gE(o),l=e.maxX-e.minX,p=e.maxY-e.minY,d=(l-.02*2)*.5,v=(p-.02*2)*.5,D=Math.min(v,d*r/s,i*1.05)*(.5+Na(o+45.6)*.5),O=D*(s/r),K=e.minX+O+.02,Y=e.maxX-O-.02,fe=e.minY+D+.02,Ee=e.maxY-D-.02,be=K+Na(n+78.9)*Math.max(1e-4,Y-K),Fe=fe+Na(n+91.2)*Math.max(1e-4,Ee-fe);return{cx:be,cy:Fe,halfWx:O,halfHy:D}}function ov(e,t,r){return hE.map((n,o)=>{let i=o*17,s=o*17+e*1.31;return{...yE(n,t,r,s,i),...bE(i)}})}u();function xE(e=1){return{seed:e,prevEnvelope:0,prevBand:0,followCooldownMs:0}}var iv=xE();function sv(){return iv.seed}function av(e){e.seed=(e.seed*1.6180339887+1.23456789)%1e4,e.seed<.001&&(e.seed=1)}function lv(e){let t=e.state??iv;if(e.envelope>.02&&t.prevEnvelope<=.02&&av(t),Xr(e.binding))t.prevBand=0;else{let n=wo(e.binding.source,e.bands,e.binding.depth),o=n>.35&&t.prevBand<=.35;t.followCooldownMs=Math.max(0,t.followCooldownMs-e.dt*1e3),(o||n>.55&&t.followCooldownMs<=0)&&(av(t),t.followCooldownMs=180),t.prevBand=n}return t.prevEnvelope=e.envelope,t.seed}u();var dv=.041666666666666664,mv=361,vE=120;function _E(e,t,r=0,n=mv){let o=Math.max(10,Math.min(40,Math.round(Number.isFinite(e)?e:16))),i=Math.max(1,Math.min(24,Math.round(Number.isFinite(t)?t:2))),s=r>=.5,l=s?2*(o-1):o-1;return{slices:o,frameOffset:i,history:1+l*i,grid:s}}function SE(e,t,r,n){return[e.slices,e.frameOffset,e.grid?1:0,t>=.5?1:0,Math.round(r),Math.max(1,n)].join(":")}function TE(e){return e>0?Math.max(1,Math.round(e/dv)):0}function ME(e,t){let r=Math.max(1,e.history),n=TE(t);return n>0?Math.min(mv,r,n):Math.min(vE,r)}function LE(e,t){return Math.max(1,Math.min(e.history,Math.max(1,t)))}function wE(e,t){let r=Math.max(1,t);return(Math.max(0,e)%r+r)%r}function AE(e,t,r){let n=Math.max(1,Math.min(t,Math.max(1,r)));return wE(e,n)}function Hc(e,t,r,n=0){let o=Math.max(1,t),i=Math.max(0,Math.min(o-1,Math.round(e))),s=Math.max(1,r),l=Math.max(0,Math.min(2,Math.round(n)));if(l>=2)return(o-1-i)*s;if(l>=1){let p=Math.floor((o-1)/2),d=Math.ceil((o-1)/2);return Math.min(Math.abs(i-p),Math.abs(i-d))*s}return i*s}function cv(e,t,r=16,n=0){return Hc(e,r,t,n)}function CE(e,t,r,n,o,i,s=0){let l=Math.max(1,i),p=Math.max(1,r),d=Math.max(0,Math.min(l-1,e)),v=Math.max(0,Math.min(l-1,t)),H=Math.max(0,Math.min(2,Math.round(s)));if(n>=.5){if(H>=1&&H<2)return(Hc(d,l,1,1)+Hc(v,l,1,1))*p;let D=H>=2,O=o>=.5!==D,K=O?l-1-d:d,Y=O?l-1-v:v;return(K+Y)*p}return Hc(o>=.5?v:d,l,p,H)}function hd(e,t,r){let n=Math.max(1,r);return((e-t)%n+n)%n}var zs=null,Ii=[null,null],Oi=null,hv=null,Gc="",Nc=!1,gd="",qn=0,Kn=0,Vs=0,$s=0,gv=0;function EE(e,t){let r=typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?RE(e.currentSrc||e.src):"canvas";return r?t?`${t}|${r}`:r:t||""}function RE(e){if(!e)return"";try{return new URL(e,typeof location<"u"?location.href:void 0).href}catch{return e}}function kE(e){return e instanceof HTMLVideoElement&&Number.isFinite(e.currentTime)?e.currentTime:null}function yd(e){return e instanceof HTMLVideoElement&&Number.isFinite(e.duration)&&e.duration>0?e.duration:0}function PE(e,t,r=dv){return e==null||!Number.isFinite(t)||e+r*.25<t?!0:e-t>=r*.85}function bv(e){zs=e.texture({shape:[1,1]})}function yv(){return{getTexture:()=>zs}}function xv(){return Nc}function xd(e){let t=e.getContext("2d",{alpha:!1});if(!t)throw new Error("timeGlitch: 2d context unavailable");return t.imageSmoothingEnabled=!0,t}function vv(e,t,r){let n=[],o=[];for(let i=0;i<e;i++){let s=document.createElement("canvas");s.width=t,s.height=r,n.push(s),o.push(xd(s))}return{slots:n,ctx:o}}function FE(e,t,r){e.width===t&&e.height===r||(e.width=t,e.height=r)}function OE(e){for(let t=0;t<e.slots.length;t++){let r=e.slots[t];if(r.width===qn&&r.height===Kn)continue;let n=document.createElement("canvas");n.width=qn,n.height=Kn;let o=xd(n);o.drawImage(r,0,0,qn,Kn),e.slots[t]=n,e.ctx[t]=o}}function IE(e){return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?e.readyState>=2&&e.videoWidth>0&&e.videoHeight>0:e instanceof HTMLCanvasElement?e.width>0&&e.height>0:!0}function uv(e,t){e.drawImage(t,0,0,qn,Kn)}function BE(e){let t=vv(e,qn,Kn);return{slots:t.slots,ctx:t.ctx,writeHead:0,lastSrc:"",lastCaptureTime:Number.NaN,durationSec:0}}function DE(e,t,r){let n=Math.max(2,Math.round(e)),o=Math.max(2,Math.round(t)),i=Math.max(2,Math.min(640,n)),s=Math.max(2,Math.min(360,o)),l=Math.max(1,r),p=i!==qn||s!==Kn,d=n!==Vs||o!==$s;if(p){qn=i,Kn=s;for(let v of Ii)v&&OE(v);Gc=""}(d||!Oi)&&(Vs=n,$s=o,Oi||(Oi=document.createElement("canvas"),hv=xd(Oi)),FE(Oi,n,o),zs?.resize(n,o),Gc=""),gv=l;for(let v=0;v<2;v++){let H=Ii[v];if(H&&H.slots.length<l){let D=vv(l-H.slots.length,qn,Kn),O=H.writeHead>0?H.slots[(H.writeHead-1)%H.slots.length]:null;if(O)for(let K of D.ctx)K.drawImage(O,0,0,qn,Kn);H.slots.push(...D.slots),H.ctx.push(...D.ctx)}}}function HE(e){let t=Ii[e];if(t)return t;let r=BE(Math.max(1,gv));return Ii[e]=r,r}function fv(e,t,r=0){if(!IE(t))return;let n=HE(e),o=EE(t);if(!o)return;let i=kE(t);if(o!==n.lastSrc){n.lastSrc=o,n.durationSec=yd(t),uv(n.ctx[0],t),n.writeHead=1,n.lastCaptureTime=i??Number.NaN;return}let s=yd(t);if(s>0&&(n.durationSec=s),!(n.writeHead<Math.max(1,r))&&!PE(i,n.lastCaptureTime))return;let p=n.writeHead%Math.max(1,n.slots.length);uv(n.ctx[p],t),i!=null&&(n.lastCaptureTime=i),n.writeHead+=1}function bd(e,t,r){return AE(e,t,r)}function NE(e,t,r,n){let o=hv,i=t.slices,s=t.grid?1:0,l=Math.max(1,e.slots.length),p=Math.min(Math.max(1,e.writeHead),l),d=e.writeHead-1,v=p;if(t.grid){let O=Vs/i,K=$s/i,Y=qn/i,fe=Kn/i;for(let Ee=0;Ee<i;Ee++)for(let be=0;be<i;be++){let Fe=bd(CE(be,Ee,t.frameOffset,s,r,i,n),p,l),Qe=hd(d,Fe,v);o.drawImage(e.slots[Qe],be*Y,Ee*fe,Y,fe,be*O,Ee*K,O,K)}return}if(r>=.5){let O=$s/i,K=Kn/i;for(let Y=0;Y<i;Y++){let fe=bd(cv(Y,t.frameOffset,i,n),p,l),Ee=hd(d,fe,v);o.drawImage(e.slots[Ee],0,Y*K,qn,K,0,Y*O,Vs,O)}return}let H=Vs/i,D=qn/i;for(let O=0;O<i;O++){let K=bd(cv(O,t.frameOffset,i,n),p,l),Y=hd(d,K,v);o.drawImage(e.slots[Y],O*D,0,D,Kn,O*H,0,H,$s)}}function pv(e){return e&&(typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement||e instanceof HTMLCanvasElement)?e:null}function _v(e){let t=!!e.enabled&&e.amount>=1e-5;if(!(t||!!e.warm)||!zs)return;let n=pv(e.sources?.[0])??(e.activeChannel!==1?e.source??null:null),o=pv(e.sources?.[1])??(e.activeChannel===1?e.source??null:null),i=e.activeChannel===1?1:0,l=(i===1?o:n)??n??o;if(!l)return;let p=yd(l)||Ii[i]?.durationSec||0,d=_E(e.cols,e.frameOffset,e.mode),v=ME(d,p);DE(e.destWidth,e.destHeight,v);let H=e.origin??0,D=LE(d,v);if(n&&fv(0,n,D),o&&fv(1,o,D),!t)return;let O=Ii[i],K=O?.lastSrc||"";if(!O||O.writeHead<=0){K!==gd&&(Nc=!1);return}if(K!==gd){if(O.writeHead<D){Nc=!1;return}gd=K}Nc=!0;let Y=`${i}:${O.lastSrc}:${SE(d,e.direction,H,O.slots.length)}:${O.writeHead}`;Y!==Gc&&(NE(O,d,e.direction,H),zs.subimage(Oi),Gc=Y)}var vd=.025,VE=.015,Ao=1.03,$E={paramMin:-1,paramMax:1,clampMin:-1,clampMax:1},zE=()=>1;function Mv(e){return e===sr.swipe||e===sr.slide}var Lv=()=>Math.min(window.innerWidth,window.innerHeight);function lr(e,t){let n=(typeof e=="string"?e:t).replace("#","").trim();if(n.length!==6)return[0,0,0];let o=parseInt(n,16);return Number.isNaN(o)?[0,0,0]:[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255]}function wv(){let e=document.getElementById("hydra-canvas");return e instanceof HTMLCanvasElement?Math.max(e.width,e.height,1):4096}var gn=()=>ie().customBands;function Av(e){let{applySceneDeferredRef:t,hydraRef:r,settingsRef:n,studioModeRef:o,exportSettingsRef:i,outputMappingRef:s,transitionStateRef:l,activeChannelRef:p,reactionDiffForceSeedRef:d,feedbackForceClearRef:v,patternRdForceSeedRef:H,canvasRef:D,renderQualityRef:O,runHydraTickRef:K,electricNoiseCirclePackRef:Y,oscilloscopeBridgeReadyRef:fe,neonGridBridgeReadyRef:Ee,textLayerBridgeReadyRef:be,throughTheStarsBridgeReadyRef:Fe,lumaDustBridgeReadyRef:Qe,lumaLockBridgeReadyRef:Ze,getFxState:dt,getParamValue:kt}=e,at=null,rt=new Map,mt={},R=[],A=(or,Sr)=>sx(Sr,or,n.current.layerInstances),C=()=>{let or=dt();if(!or)return or;let Sr=or;if(rt.size>0){let ar={};for(let[Tr,Lr]of rt){let xr=A(Tr,Lr);xr&&(ar[Tr]=xr)}Sr={...or,...ar}}return at?{...Sr,[at.templateKey]:at.config}:Sr},f=(or,Sr,ar)=>{let Tr=at?.templateKey===or?at.effectKey:rt.get(or);if(Tr){let Lr=A(or,Tr)??(at?.templateKey===or?at.config:void 0);if(Lr)return Zt(Tr,Lr,Sr,ar,gn(),or)}return kt(or,Sr,ar)},oe=(or,Sr,ar)=>{let Tr=n.current.fxGroups?.[or]?.composite;return Tr?Zt(`group:${or}`,Tr,Sr,ar,gn()):ar};if(Pn()){t.current=!0;return}let Te=ie(),{osc:qe,noise:Ve,concentricMask:Ne,concentricSquareMask:Xe,perspectiveSlatMask:Je,gaussianNoiseGrid:It,fillLayerSrc:et,shapeLayerSrc:Ht,superformulaSrc:bt,mirrorStripesSrc:yt,plasmaSrc:Pt,patternNoiseSrc:_t,patternCellsSrc:Ut,patternTilesSrc:tr,patternPolarSrc:zt,patternGeometrySrc:br,electricNoiseSrc:vr,plexusSrc:pn,universeWithinSrc:Ft,fractalFoldSrc:nr,topoContourSrc:Wr,src:lt,shape:kr,solid:wt,o0:h,o1:Pr,o2:Qr,o3:_r,s0:Fr,s1:Or}=Te,Qt=()=>r.current?.synth?.time??0;if(!(typeof qe>"u"||typeof Ve>"u")){Ql();try{if(!C())return;let Sr=()=>{let b=0;if(l.current.active){let M=(performance.now()-l.current.startTime)/l.current.duration;M>=1&&(M=1,l.current.active=!1,p.current=p.current===0?1:0),b=M<.5?4*M*M*M:1-Math.pow(-2*M+2,3)/2}return Math.max(0,Math.min(1,b))},ar=()=>Sr(),Tr=()=>p.current===0?ar():1-ar(),Lr=()=>l.current.active?l.current.resolvedType:Math.max(0,Math.min(bf,Math.round(Number(C()?.transition?.params?.type??0)))),xr=Lr(),Zr=b=>!l.current.active||!b||Lr()!==sr.zoom?1:1+(1-ar())*2,Gn=b=>!l.current.active||Lr()!==sr.clap?1:Rh(ar(),b),tn=()=>Ao*Zr(p.current===1),Jn=()=>Ao*Zr(p.current===0),rn=()=>{let b=Zr(p.current===1);return b!==1?Ao*b:Ao*Gn(p.current===1)},$o=()=>{let b=Zr(p.current===0);return b!==1?Ao*b:Ao*Gn(p.current===0)},Eo=()=>!l.current.active||p.current!==1||!Mv(Lr())?0:1-ar(),Ro=()=>!l.current.active||p.current!==0||!Mv(Lr())?0:1-ar(),bn=()=>{let b=Lr();if(!l.current.active||b!==sr.pixelate)return 1e4;let Pe=ar();return 1e4-(1-Math.abs(Pe-.5)*2)*9900},zo=()=>!l.current.active||Lr()!==sr.slide?0:kh(ar())*.05,eo=()=>{if(l.current.active&&Lr()===sr.clap){let b=ar()<.5?0:1;return p.current===0?b:1-b}return Tr()},cr=()=>{let b=ie().s0?.src;if(b instanceof HTMLVideoElement&&b.videoWidth>0&&b.videoHeight>0)return b.videoWidth/b.videoHeight;let Pe=D.current;return Pe&&Pe.height>0?Pe.width/Pe.height:16/9},Wn=()=>{if(!o.current)return 1;let b=D.current;return b?$f(cr(),b.width,b.height).scaleX:1},to=()=>{if(!o.current)return 1;let b=D.current;return b?$f(cr(),b.width,b.height).scaleY:1},uo=(b,Pe)=>{if(!C()?.[Pe]?.enabled)return b;let M=()=>hr(Pe,C()?.[Pe],gn(),$E),B=()=>f(Pe,"contrast",1),G=()=>f(Pe,"hue",0)/360,X=()=>Math.max(0,Math.min(2,f(Pe,"saturation",1)));return b.brightness(M).contrast(B).hue(G).saturate(X)},Yr=(b,Pe,M,B)=>{let G=lt(b).scale(()=>Pe()*Wn(),()=>M()*to()).scrollX(B).pixelate(bn,bn);if(xr===sr.slide){let X=zo,te=()=>Math.min(.4,X()*8);G=G.blend(lt(b).scale(()=>Pe()*Wn(),()=>M()*to()).scrollX(()=>B()-X()).pixelate(bn,bn),te).blend(lt(b).scale(()=>Pe()*Wn(),()=>M()*to()).scrollX(()=>B()+X()).pixelate(bn,bn),te)}return uo(G,"colorAdjust")},fo=Yr(Fr,tn,rn,Eo),Un=Yr(Or,Jn,$o,Ro),F;if(xr===sr.mask){let b=()=>Tr()*1.55;F=fo.layer(Un.mask(kr(100,b,.07)))}else F=fo.blend(Un,eo);let Bn=ie().__hydraIsolateFxKey,Be=Bn?[{kind:"fx",key:Bn}]:ay([...bc({activeChain:n.current.activeChain,activeFxList:n.current.activeFxList,fxGroups:n.current.fxGroups})],n.current.activeFxList??[]);if(Wp(Be).includes("timeGlitch")){let b=()=>xv()?hr("timeGlitch",C()?.timeGlitch,gn(),jr):0;F=F.timeGlitchSlices(yv(),b)}let Ge=b=>{let Pe=cn(b);return Pe?lt(Pe):null},Ce=(b,Pe=jr)=>{let M=at?.templateKey===b?at.effectKey:void 0;return()=>{if(M){let B=A(String(b),M);if(B)return hr(M,B,gn(),Pe)}return at?.templateKey===b?hr(at.effectKey,at.config,gn(),Pe):hr(String(b),C()?.[b],gn(),Pe)}},St={chainStack:[Nr(F)],layerSourceStack:[]},er=b=>({chainStack:St.chainStack,getMaskReveal:()=>oe(b,"maskReveal",0),getMaskReach:()=>oe(b,"maskReach",0),getMaskThreshold:()=>oe(b,"maskThreshold",.35),getMaskSoftness:()=>oe(b,"maskSoftness",.12),getMaskInvert:()=>oe(b,"maskInvert",0)}),ft=(b,Pe)=>ix(b,{hydraRef:r,effectKey:Pe,hydra:{fillLayerSrc:et,shapeLayerSrc:Ht,superformulaSrc:bt,plasmaSrc:Pt,patternNoiseSrc:_t,patternCellsSrc:Ut,patternTilesSrc:tr,patternPolarSrc:zt,patternGeometrySrc:br,electricNoiseSrc:vr,plexusSrc:pn,universeWithinSrc:Ft,fractalFoldSrc:nr,topoContourSrc:Wr,gaussianNoiseGrid:It,noise:Ve,solid:wt,src:lt,s0:Fr,s1:Or},activeChannelRef:p,renderQualityRef:O,electricNoiseCirclePackRef:Y,liveHydraBands:gn}),Rt=null,Tt=null,ur=null,Jr=b=>{let Pe=at?.templateKey===b?at.config:C()?.[b];if(Pe&&!(!Pe.enabled&&Bn!==b)){if(b==="layerBlend"){let M=Ce("layerBlend"),{s2:B}=ie(),G=vn(Number(Pe.params?.mode)||0),X=lt(B).scale(Ao);F=Fn({chain:F,layerSrc:X,mode:G,getAmount:M,solid:wt,getLayerLuma:()=>{let se=M();return se<1e-5?2:se},layerSourceStack:St.layerSourceStack})}if(b==="shatterLayer"){let M=Ce("shatterLayer"),B=()=>f("shatterLayer","density",14),G=()=>f("shatterLayer","gap",.065),X=()=>f("shatterLayer","scatter",.62),te=()=>f("shatterLayer","irregularity",.82),{s2:se}=ie(),ge=Math.round(Number(Pe.params?.mode)||0)>=1?lt(se).scale(Ao):wt(0,0,0);F=F.shatterLayerCoord(M,B,X,te).shatterLayerGap(ge,M,B,G,te)}if(b==="videoMap"){let M=Ce("videoMap"),{s2:B}=ie(),G=Math.max(0,Math.min(1,Math.round(Number(Pe.params?.mode)||0))),X=Math.round(Number(Pe.params?.invert)||0)>=1;if(G>=1){let te=()=>{let se=M();return(X?-se:se)*.5};F=F.modulate(lt(B),te)}else{let te=()=>f("videoMap","invert",0),se=()=>f("videoMap","threshold",.35),ge=()=>f("videoMap","softness",.12);F=F.videoMapMask(lt(B),M,te,se,ge)}}if(b==="playbackCue"){let{s2:M}=ie();M&&(F=Fn({chain:F,layerSrc:lt(M).scale(Ao),mode:4,getAmount:()=>1,solid:wt,layerWithoutLuma:!0,layerSourceStack:St.layerSourceStack}))}if(b==="maskVideo"){let M=()=>f("maskVideo","size",.22),B=()=>f("maskVideo","shuffle",.35),G=()=>{let se=Math.max(0,B()),ge=se<=0?0:Math.floor(Qt()*se);return ov(ge,M(),window.innerWidth/Math.max(1,window.innerHeight))},X=(se,ge,Ue)=>Nr(F).scale(se,se).scrollX(ge).scrollY(Ue),te=se=>{let ge=()=>G()[se];F=F.maskVideoRectCutout(X(()=>ge().zoom,()=>ge().panX,()=>ge().panY),()=>ge().cx,()=>ge().cy,()=>ge().halfWx,()=>ge().halfHy)};te(0),te(1),te(2)}if(b==="midlineStretch"){let M=Ce("midlineStretch"),B=()=>f("midlineStretch","splitY",.5);F=F.midlineStretch(M,B)}if(b==="centerDiffuse"){let M=Ce("centerDiffuse"),B=()=>f("centerDiffuse","centerY",.5),G=()=>f("centerDiffuse","band",.06),X=()=>f("centerDiffuse","diffusion",.72);F=F.centerStripMap(M,B,G,X),F=F.modulateScrollY(Ve(5,.05).scale(1,10).scrollY(()=>M()*X()*.035),()=>M()*X()*.24)}if(b==="circleGlitch"){let M=Ce("circleGlitch",{clampMin:0,clampMax:.5,paramMin:0,paramMax:.5}),B=()=>f("circleGlitch","frequency",10),G=()=>f("circleGlitch","spread",.2),X=()=>{let te=M();return te<1e-5?0:te*G()};F=F.modulateScale(qe(B,.1,0).kaleid(6).mask(kr(100,.5,.5)),X)}if(b==="glitch"){let M={clampMin:0,clampMax:10,paramMin:0,paramMax:10},B=Ce("glitch",M),G=ld(hr("glitch",C()?.glitch,gn(),M)),X=()=>Math.min(G,ld(B())),te=()=>Lx(f("glitch","size",5)),se=()=>cd(te()),ge=Wt=>Wt>=X()?0:se(),Ue=()=>Math.max(0,f("glitch","speed",1.15)),Ke=()=>Cx(f("glitch","travel",1)),st=()=>Ex(f("glitch","tear",1)),ht=()=>X()<1||se()<1e-5?0:1,qt=(Wt,rr,bo,Vn)=>()=>{let za=ge(Vn);if(za<1e-5)return 0;let yo=Qt()*Ue(),ji=Math.floor(yo*bo),Xa=Math.sin(ji*6.283+rr)*.5+Math.sin(ji*4.1+rr*1.7)*.3,Fo=Math.sin(yo*(2.2+rr*.3)+rr)*.35;return(Xa+Fo)*Wt*st()*za},Jt=(Wt,rr,bo,Vn)=>()=>ge(Vn)<1e-5?.5:fd(Wt,rr,bo,Vn,Qt(),Ue(),Ke()).pivot,yr=(Wt,rr,bo,Vn)=>()=>ge(Vn)<1e-5?0:fd(Wt,rr,bo,Vn,Qt(),Ue(),Ke()).scroll,wr=(Wt,rr)=>kr(4,()=>ge(rr)<1e-5?0:wx(Wt.shapeScale,te()),.001).scale(()=>Ax(ge(rr)),()=>ud(Wt.xMult,ge(rr)),()=>ud(Wt.yMult,ge(rr)),Jt(Wt.travelPhaseX,Wt.travelRateX,Wt.travelSpreadX,rr),Jt(Wt.travelPhaseY,Wt.travelRateY,Wt.travelSpreadY,rr)).scrollX(()=>yr(Wt.travelPhaseX,Wt.travelRateX,Wt.travelSpreadX,rr)()+qt(Wt.tearAmpX,Wt.tearPhaseX,Wt.tearRateX,rr)()).scrollY(()=>yr(Wt.travelPhaseY,Wt.travelRateY,Wt.travelSpreadY,rr)()+qt(Wt.tearAmpY,Wt.tearPhaseY,Wt.tearRateY,rr)());if(G>=1){let Wt=wr(id[G-1],G-1).mult(wt(ht,ht,ht));for(let rr=G-2;rr>=0;rr--)Wt=wr(id[rr],rr).diff(Wt);F=F.diff(Wt)}}if(b==="dataDrip"){let M=Ce("dataDrip"),B=()=>f("dataDrip","columns",72),G=()=>f("dataDrip","chaos",.35),X=()=>f("dataDrip","dance",.65),te=()=>f("dataDrip","speed",1);F=F.dataDrip(M,B,G,X,te)}if(b==="liquix"){let M=Ce("liquix"),B=()=>f("liquix","pivot",.48),G=()=>f("liquix","bands",56),X=()=>f("liquix","speed",1.28);Rt&&(R.push({out:Rt,buffer:Nr(F)}),F=lt(Rt)),F=F.liquix(M,B,G,X)}if(b==="metalSphere"&&(F=F.metalSphereScene(h,Ce("metalSphere"),()=>f("metalSphere","size",1),()=>f("metalSphere","noise",.42),()=>f("metalSphere","detail",3.5),()=>f("metalSphere","speed",.75),()=>f("metalSphere","roughness",.1),()=>f("metalSphere","reflection",1.05),()=>f("metalSphere","rotation",.35),()=>cr())),b==="pulseMarch"&&(F=F.pulseMarchColor(Ce("pulseMarch"),()=>f("pulseMarch","morph",.55),()=>f("pulseMarch","speed",1.1),()=>f("pulseMarch","detail",4.5),()=>f("pulseMarch","glow",.65))),b==="warpTunnel"){let M=p.current===0?Fr:Or,B=()=>{let X=C()?.warpTunnel;return X?_n("warpTunnel",X.syncBand??"master",gn())*(X.syncMultiplier??.45):0},G=()=>ca(O.current).warpTunnelQuality;F=F.warpTunnelColor(M,Ce("warpTunnel"),()=>f("warpTunnel","speed",.55),()=>f("warpTunnel","refraction",.72),()=>f("warpTunnel","shine",.68),()=>f("warpTunnel","arms",3),()=>f("warpTunnel","fog",.62),B,G)}if(b==="throughTheStars"){let M=Ge("throughTheStars");if(Fe.current&&M){let B=Ce("throughTheStars");St.layerSourceStack.push(M);let G=()=>f("throughTheStars","glow",.74);F=F.throughTheStarsOverlay(M,B,G)}}if(b==="distortion"){let M=Ce("distortion"),B=()=>Math.round(f("distortion","mode",0)),G=()=>Math.max(.2,f("distortion","curvature",.9)),X=B();if(X>=1){let te=()=>{let st=M();return typeof st=="number"?Math.max(0,Math.min(1,st))*.14:0},se=()=>f("distortion","speed",1.2)*Qt()*2.2,ge=()=>Math.max(.5,f("distortion","frequency",10)),Ue=()=>X-1,Ke=()=>Math.max(.2,f("distortion","centerFocus",1.4));F=F.scale(()=>window.innerWidth/window.innerHeight,1).oscilloscopeDistort(te,ge,se,Ue,Ke).scale(()=>window.innerHeight/window.innerWidth,1)}else F=F.lensDistort(M,G)}if(b==="wetLens"){let M=Ce("wetLens"),B=()=>f("wetLens","density",18),G=()=>f("wetLens","speed",.26),X=()=>f("wetLens","refraction",.76),te=()=>f("wetLens","highlights",.42),se=()=>f("wetLens","gravity",.74);F=F.wetLensDistort(M,B,G,X,se).wetLensOverlay(M,B,G,te,se)}if(b==="pixelSort"){let M=Ce("pixelSort"),B=p.current===0?Fr:Or,G=()=>f("pixelSort","threshold",.45),X=()=>f("pixelSort","reach",.4),te=()=>f("pixelSort","chaos",.7),se=()=>Math.max(0,Math.min(3,Math.round(f("pixelSort","direction",0))));F=F.pixelSortSmear(B,M,G,X,te,se)}if(b==="emberHeat"){let M=Ce("emberHeat"),B=()=>f("emberHeat","speed",.8),G=()=>f("emberHeat","density",22),X=()=>f("emberHeat","waves",.76),te=()=>f("emberHeat","glow",.82),se=()=>f("emberHeat","intensity",.78);F=F.emberHeatDistort(M,B,G,X).emberHeatOverlay(M,G,B,te,X,se).emberHeatFlow(lt(h).scrollY(()=>-(.0016+B()*8e-4)),M,X)}if(b==="normalMap"){let M=Ce("normalMap"),B=p.current===0?Fr:Or,G=()=>f("normalMap","source",1),X=()=>f("normalMap","scale",12),te=()=>f("normalMap","refraction",.55),se=()=>G()>=.5?.45:f("normalMap","lighting",.45),ge=()=>f("normalMap","specular",.4),Ue=()=>f("normalMap","lightX",.65),Ke=()=>f("normalMap","lightY",.35),st=()=>f("normalMap","detail",1.05);G()<.5&&(F=F.normalMapDistort(M,X,()=>.2,te,st)),F=F.normalMapLight(B,M,G,X,()=>.2,se,ge,Ue,Ke,st)}if(b==="reactionDiffusion"){let M=Ce("reactionDiffusion"),B=Ei(()=>r.current?.o?.[1]);F=F.reactionDiffusionOverlay(lt(B),M)}if(b==="lumaDust"){let M=Ge("lumaDust");if(Qe.current&&M){let B=Ce("lumaDust");St.layerSourceStack.push(M),F=F.lumaDustOverlay(M,B)}}if(b==="lumaLock"){let M=Ge("lumaLock");if(Ze.current&&M){let B=Ce("lumaLock");St.layerSourceStack.push(M),F=F.lumaLockOverlay(M,B,()=>.45)}}if(b==="concentricRotate"&&(F=F.concentricRotateDistort(Ce("concentricRotate"),()=>f("concentricRotate","mode",0),()=>f("concentricRotate","rings",7),()=>f("concentricRotate","step",.08),()=>f("concentricRotate","speed",.25),()=>f("concentricRotate","centerX",.5),()=>f("concentricRotate","centerY",.5))),b==="ripple"){let M=Ce("ripple"),B=()=>f("ripple","frequency",8),G=()=>f("ripple","speed",1),X=()=>f("ripple","decay",.5),te=()=>f("ripple","centerX",.5),se=()=>f("ripple","centerY",.5);F=F.rippleDistort(M,B,G,X,te,se)}if(b==="randomGallery"){let M=Ce("randomGallery"),B=()=>f("randomGallery","cells",7),G=()=>f("randomGallery","speed",.72),X=()=>f("randomGallery","refraction",.78),te=()=>f("randomGallery","drift",.78);F=F.randomGalleryDistort(M,B,G,X,te)}if(b==="gridShuffle"){let M=()=>{let X=C()?.gridShuffle;return X?.enabled?Math.max(0,Math.min(1,Number(X.base??1))):0},B=()=>f("gridShuffle","cells",4),G=()=>f("gridShuffle","chaos",1);F=F.gridShuffleDistort(M,B,G,sv)}if(b==="customShader"){let M=Math.round(Number(Pe.params?.shaderType??0)),B=typeof Pe.params?.code=="string"?Pe.params.code:ch(M),G=r.current?.synth;if(G?.setFunction){let X=uh(B,M);G.setFunction({name:"customShaderOp",type:X.type,inputs:[{type:"float",name:"amount",default:0}],glsl:X.glsl})}F=F.customShaderOp(Ce("customShader"))}if(b==="mask"){let M=Ce("mask"),B=()=>Math.max(0,Math.min(40,f("mask","frequency",20))),G=()=>f("mask","speed",.32),X=()=>f("mask","rotation",.15),te=()=>f("mask","balance",.46),se=Math.max(0,Math.min(4,Math.round(Number(Pe.params?.shape??0)))),ge=Math.max(0,Math.min(3,Math.round(Number(Pe.params?.mode??0)))),Ue;se===0?Ue=qe(B,G,0).rotate(X).luma(te,.05):se===1?Ue=Ne(B,G,X,te):se===2?Ue=Xe(B,G,X,te):se===3?Ue=Ve(1,G).scale(()=>1/Math.max(.5,B())).thresh(te,1e-4):Ue=Je(B,G,X,te,()=>f("mask","perspective",.75),()=>f("mask","focus",1)),ge===0?F=F.mask(wt(1,1,1).blend(Ue,M)):ge===1?F=F.diff(Ue.mult(wt(M,M,M))):ge===2?F=F.add(Ue,M):F=F.mult(wt(1,1,1).blend(Ue,M))}if(b==="zoom"&&(F=F.scale(Ce("zoom",{whenDisabled:1,paramMin:.5,paramMax:2,clampMin:.5,clampMax:2}))),b==="pulse"){let M=Ce("pulse"),B=()=>f("pulse","breath",.5),G=()=>f("pulse","bloom",.45),X=()=>1+M()*B()*.06;F=F.scale(X).pulseGrade(M,G)}if(b==="scroll"){let M=Ce("scroll",{map:G=>G*Qt()}),B=()=>{let G=f("scroll","y",0);return G?G*Qt():0};F=F.scrollX(M).scrollY(B)}if(b==="wrap"){let M=Ce("wrap",{clampMin:-1,clampMax:1}),B=()=>f("wrap","centerX",.5),G=()=>f("wrap","centerY",.5),X=()=>f("wrap","radius",.75),te=()=>f("wrap","falloff",.5),se=()=>f("wrap","twist",0);F=F.customWrap(M,B,G,X,te,se)}if(b==="mirror"){let M=Ce("mirror"),B=()=>Math.max(0,Math.min(3,Math.round(f("mirror","axis",0)))),G=()=>f("mirror","angle",0),X=()=>Number(f("mirror","flip",0))>=.5?1:0,te=()=>f("mirror","centerX",.5),se=()=>f("mirror","centerY",.5);F=F.customMirror(M,B,G,X,te,se)}if(b==="tile"){let M=Ce("tile"),B=()=>Math.max(1,Math.min(12,Math.round(f("tile","cols",3)))),G=()=>Math.max(1,Math.min(12,Math.round(f("tile","rows",3))));F=F.customTile(M,B,G)}if(b==="vibration"){let M=()=>Zx(C()?.vibration,ie().vibrationAmp??0),B=()=>Math.max(2,f("vibration","frequency",12));F=F.vibrationDistort(M,B)}if(b==="shake"){let M=Ce("shake"),B=()=>f("shake","speed",1),G=()=>f("shake","bounce",.55),X=()=>f("shake","roll",.4),te=()=>f("shake","zoom",.45);F=F.shakeDistort(M,B,G,X,te)}if(b==="rotate"&&(F=F.rotate(Ce("rotate",{paramMin:-Math.PI,paramMax:Math.PI}),()=>0)),b==="rgbDelay"){let M=Ce("rgbDelay"),B=X=>()=>ev(M(),X),G=()=>tv(M());F=F.blend(lt(h).scrollX(B(-1)).color(1,0,0).add(lt(h).color(0,1,0)).add(lt(h).scrollX(B(1)).color(0,0,1)),G)}if(b==="chromaticAberration"){let M=Ce("chromaticAberration"),B=()=>f("chromaticAberration","direction",.125)*Math.PI*2,G=te=>()=>dd(M(),B(),te).x,X=te=>()=>dd(M(),B(),te).y;F=F.blend(lt(h).scrollX(G(1)).scrollY(X(1)).color(1,0,0).add(lt(h).color(0,1,0)).add(lt(h).scrollX(G(-1)).scrollY(X(-1)).color(0,0,1)),()=>nv(M()))}if(b==="degauss"){let M=()=>jx(C()?.degauss,ie().degaussAmp??0),B=()=>f("degauss","frequency",12),G=()=>f("degauss","speed",1.4),X=()=>f("degauss","fringe",.55);F=F.degaussDistort(M,B,G),F=F.blend(lt(h).scrollX(()=>M()*X()*.034).scrollY(()=>M()*X()*.012).color(1,.15,.15).add(lt(h).color(.12,1,.12)).add(lt(h).scrollX(()=>-M()*X()*.034).scrollY(()=>-M()*X()*.012).color(.15,.15,1)),()=>M()*X()*.78)}if(b==="vhs"){let M=Ce("vhs"),B=()=>f("vhs","tracking",.48),G=()=>f("vhs","speed",1),X=()=>f("vhs","noise",.38),te=()=>f("vhs","lines",.52),se=()=>f("vhs","dropout",.28),ge=()=>f("vhs","bleed",.42);F=F.vhsDistort(M,B,G),F=F.vhsColor(M,X,te,se),F=F.blend(lt(h).scrollX(()=>M()*ge()*.024).color(1,.06,.06).add(lt(h).color(.04,1,.04)).add(lt(h).scrollX(()=>-M()*ge()*.024).color(.06,.06,1)),()=>M()*ge()*.44)}if(b==="negative"&&(F=F.invert(Ce("negative"))),b==="dither"){let M=Ac("blue64");F=F.dither(M,Ce("dither"),()=>f("dither","binary",0),()=>f("dither","balance",.5),()=>f("dither","scale",4))}if(b==="rampGradient"){let M=Ce("rampGradient"),B=()=>bh((ge,Ue)=>f("rampGradient",ge,Ue),C()?.rampGradient?.params),G=(ge,Ue)=>()=>B()[ge].rgb[Ue],X=ge=>()=>B()[ge].p,te=()=>f("rampGradient","animate",0),se=()=>f("rampGradient","speed",.45);F=F.rampGradient(M,()=>f("rampGradient","stopCount",3),G(0,0),G(0,1),G(0,2),X(0),G(1,0),G(1,1),G(1,2),X(1),G(2,0),G(2,1),G(2,2),X(2),G(3,0),G(3,1),G(3,2),X(3),G(4,0),G(4,1),G(4,2),X(4),G(5,0),G(5,1),G(5,2),X(5),te,se)}if(b==="answerPrint"&&(F=F.answerPrint(Ce("answerPrint"),()=>f("answerPrint","stock",0),()=>f("answerPrint","density",1))),b==="hdr"&&(F=F.hdrGrade(Ce("hdr"),()=>f("hdr","blackFloor",.08),()=>f("hdr","highlights",.85),()=>f("hdr","knee",.5))),b==="colorLayer"&&(F=uo(F,"colorLayer")),b==="encodeGlitch"){let M=Ce("encodeGlitch"),B=()=>f("encodeGlitch","macroBlock",.5),G=()=>f("encodeGlitch","tear",.35);F=F.encodingGlitch(M,B,G)}if(b==="edge"){let M=Ce("edge"),B=()=>f("edge","threshold",.32),G=()=>f("edge","soften",.25),X=()=>f("edge","strength",1),te=()=>f("edge","thickness",.35),se=()=>{let ht=te(),qt=B();return kx(ht,qt,Lv())},ge=()=>Px(se(),Lv()),Ue=Nr(F),Ke=Nr(F).scrollX(se).scrollY(se),st=Ue.edgeDiff(Ke,B,G,X,ge);F=F.add(st,M)}if(b==="kaleid"){let M=Ce("kaleid",{clampMin:0,clampMax:24,paramMin:0,paramMax:24}),B=()=>M()>.1,G=()=>f("kaleid","angle",0),X=()=>B()?f("kaleid","videoX",0):0,te=()=>B()?f("kaleid","videoY",0):0,se=()=>{let Ke=D.current,st=f("kaleid","videoZoom",1);if(!Ke||Ke.height<=0){let ht=Math.max(.25,st);return{scaleX:ht,scaleY:ht}}return Ag(cr(),Ke.width,Ke.height,st)},ge=()=>B()?se().scaleX:1,Ue=()=>B()?se().scaleY:1;F=F.scale(ge,Ue,.5,.5).scrollX(X).scrollY(te).customKaleid(M,G)}if(b==="glow"){let M=Ce("glow"),B=()=>f("glow","threshold",.48),G=()=>f("glow","bloom",.55),X=()=>Fx(G(),M()),te=()=>Ox(G(),M());if(F=F.glow(M,B,G),ca(O.current).glowAura){let se=Ix(O.current),ge=Math.max(...se.map(([ht])=>Math.abs(ht)),1),Ue=ht=>()=>ht/ge*X(),Ke=wt(0,0,0,0);for(let[ht,qt]of se)Ke=Ke.add(lt(h).scrollX(Ue(ht)).glowHighlight(B,G),qt);F=F.glowBloomAdd(Ke,te);let st=wt(0,0,0,0);for(let[ht,qt]of se)st=st.add(lt(h).scrollY(Ue(ht)).glowHighlight(B,G),qt);F=F.glowBloomAdd(st,te)}}if(b==="hitStreak"){let M=Ce("hitStreak"),B=()=>f("hitStreak","length",.58),G=()=>Math.round(f("hitStreak","mode",0)),X=()=>f("hitStreak","threshold",.6),te=()=>f("hitStreak","decay",.72),se=()=>Hx(X()),ge=()=>Bx(B(),M(),te()),Ue=()=>Dx(M(),te()),Ke=Bc(O.current),st=Jt=>Jt.hitStreakExtract(X,se),ht=wt(0,0,0,0),qt=G();if(qt===1)for(let[Jt,yr]of Ke){let wr=()=>1+Jt*ge()*.038;ht=ht.add(st(lt(h).scale(wr,wr,.5,.5)),yr)}else if(qt===2)for(let[Jt,yr]of Ke){let wr=()=>Jt*ge();ht=ht.add(st(lt(h).scrollX(wr).scrollY(()=>wr()*.72)),yr)}else for(let[Jt,yr]of Ke)ht=ht.add(st(lt(h).scrollX(()=>Jt*ge())),yr);F=F.add(ht,Ue)}if(b==="lens7c"){let M=Ce("lens7c"),B=ur??(p.current===0?Fr:Or);ur&&(R.push({out:ur,buffer:Nr(F)}),F=lt(ur)),F=F.lens7cPrism(B,M,()=>Gx(f("lens7c","spread",.55),M()),()=>f("lens7c","rotation",0),()=>f("lens7c","threshold",.42),()=>f("lens7c","haze",.5))}if(b==="pixelate"){let M=Ce("pixelate",Vb),B=()=>$b(M());F=F.pixelate(B,B)}if(b==="lumaGridSquares"){let M=Ce("lumaGridSquares"),B=()=>Math.max(4,Math.min(194,Math.round(f("lumaGridSquares","cols",32)))),G=()=>Rx(B(),window.innerWidth,window.innerHeight),X=()=>f("lumaGridSquares","minSize",.14),te=()=>f("lumaGridSquares","maxSize",.88),se=()=>pd(M(),B(),G()).pix,ge=()=>pd(M(),B(),G()).pixRows;F=F.pixelate(se,ge).lumaGridSquares(M,B,G,X,te)}if(b==="pointCloud"){let M=Ce("pointCloud"),B=()=>Math.max(4,Math.min(194,Math.round(f("pointCloud","cols",32)))),G=()=>Math.max(2,Math.round(B()*(window.innerHeight/Math.max(1,window.innerWidth)))),X=()=>f("pointCloud","minSize",.12),te=()=>f("pointCloud","maxSize",.85),se=()=>f("pointCloud","depth",.58),ge=()=>f("pointCloud","parallax",.78),Ue=()=>f("pointCloud","blur",.5),Ke=()=>f("pointCloud","fog",.4);F=F.pointCloudRemap(M,B,G,X,te,se,ge,Ue,Ke)}if(b==="lumaLines"){let M=Ce("lumaLines"),B=()=>Math.max(4,Math.min(100,Math.round(f("lumaLines","cols",52)))),G=()=>f("lumaLines","minWidth",.1),X=()=>f("lumaLines","maxWidth",.8),te=()=>f("lumaLines","rotation",0),se=()=>M()<1e-5?1e4:B();F=F.pixelate(se,se).lumaLines(M,B,G,X,te)}if(b==="lumaPrint"){let M=Ce("lumaPrint"),B=()=>f("lumaPrint","mode",2),G=()=>Math.max(4,Math.min(194,Math.round(f("lumaPrint","density",24)))),X=()=>Math.max(2,Math.round(G()*(window.innerHeight/Math.max(1,window.innerWidth)))),st=[M,B,G,()=>f("lumaPrint","contrast",.48),()=>f("lumaPrint","wave",.35),()=>f("lumaPrint","iconSet",0),()=>f("lumaPrint","shape",0),()=>f("lumaPrint","rotation",0)],ht=()=>M()<1e-5?wv():G(),qt=()=>M()<1e-5?wv():X();F=B()<3?F.pixelate(ht,qt).lumaPrint(...st):F.lumaPrint(...st)}if(b==="fillLayer"){let M=Ce("fillLayer"),B=()=>C()?.fillLayer?.params,G=()=>lr(B()?.colorA,"#7c3aed")[0],X=()=>lr(B()?.colorA,"#7c3aed")[1],te=()=>lr(B()?.colorA,"#7c3aed")[2],se=()=>lr(B()?.colorB,"#06b6d4")[0],ge=()=>lr(B()?.colorB,"#06b6d4")[1],Ue=()=>lr(B()?.colorB,"#06b6d4")[2],Ke=()=>Math.max(0,Math.min(3,Math.round(Number(f("fillLayer","type",1))))),st=()=>Math.max(0,Math.min(3,Math.round(Number(f("fillLayer","sweep",0))))),ht=()=>f("fillLayer","softness",.35),qt=vn(Number(f("fillLayer","mode",0))),Jt=()=>{let wr=M();return wr<1e-5?2:wr},yr=typeof et=="function"?et(G,X,te,se,ge,Ue,Ke,ht,st).scale(()=>window.innerWidth/window.innerHeight,1):wt(1,0,0);F=Fn({chain:F,layerSrc:yr,mode:qt,getAmount:M,solid:wt,getLayerLuma:Jt,layerSourceStack:St.layerSourceStack})}if(b==="mirrorStripes"){let M=Ce("mirrorStripes"),B=()=>C()?.mirrorStripes?.params,yr=typeof yt=="function"?yt(()=>lr(B()?.color,"#ff1a1a")[0],()=>lr(B()?.color,"#ff1a1a")[1],()=>lr(B()?.color,"#ff1a1a")[2],()=>f("mirrorStripes","scale",.82),()=>f("mirrorStripes","spread",.48),()=>f("mirrorStripes","density",.55),()=>f("mirrorStripes","thickness",.55),()=>Ba(f("mirrorStripes","layers",4)),()=>f("mirrorStripes","rotate",0),()=>f("mirrorStripes","randomness",0),()=>Number(f("mirrorStripes","mirror",1))>=.5?1:0):wt(1,.1,.1);St.layerSourceStack.push(yr),F=F.add(yr,M)}if(b==="noise"){let M=Ce("noise"),B=()=>Math.max(8,Math.min(8192,f("noise","scale",1681))),G=()=>.22*Math.pow(Math.min(3,Math.max(0,Number(f("noise","speed",.15)))),1.35),X=vn(Number(f("noise","mode",3))),te=()=>{let ge=M();return ge<1e-5?2:ge},se=It!=null?It(()=>B(),()=>G()).scale(()=>window.innerWidth/window.innerHeight,1):Ve(()=>Math.max(.05,B()*.12),()=>.02+G()*1.25).saturate(0).scale(()=>window.innerWidth/window.innerHeight,1);F=Fn({chain:F,layerSrc:se,mode:X,getAmount:M,solid:wt,getLayerLuma:te,layerSourceStack:St.layerSourceStack})}if(b==="plasma"){let M=Ce("plasma"),B=()=>f("plasma","speed",1.1),G=()=>f("plasma","scale",1),X=()=>f("plasma","complexity",1),te=vn(Number(f("plasma","mode",0))),se=()=>{let Ue=M();return Ue<1e-5?2:Ue},ge=typeof Pt=="function"?Pt(B,G,X):wt(.5,.2,.9);F=Fn({chain:F,layerSrc:ge,mode:te,getAmount:M,solid:wt,getLayerLuma:se,layerSourceStack:St.layerSourceStack})}if(b==="patternLayer"){let M=Ce("patternLayer"),B=()=>C()?.patternLayer?.params,G=()=>lr(B()?.colorA,"#0b1020")[0],X=()=>lr(B()?.colorA,"#0b1020")[1],te=()=>lr(B()?.colorA,"#0b1020")[2],se=()=>lr(B()?.colorB,"#22d3ee")[0],ge=()=>lr(B()?.colorB,"#22d3ee")[1],Ue=()=>lr(B()?.colorB,"#22d3ee")[2],Ke=()=>Math.max(0,Math.min(3,Math.round(Number(f("patternLayer","variant",2))))),st=()=>Math.max(0,Math.min(10,Math.round(Number(f("patternLayer","geometry",0))))),ht=()=>f("patternLayer","scale",1),qt=()=>f("patternLayer","speed",.4),Jt=()=>f("patternLayer","warp",0),yr=()=>Ns(ht()),wr=()=>f("patternLayer","symmetry",2),Wt=Math.max(0,Math.min(5,Math.round(Number(f("patternLayer","type",1))))),rr=vn(Number(f("patternLayer","mode",0))),bo=()=>{let yo=M();return yo<1e-5?2:yo},Vn=Ei(()=>r.current?.o?.[3]),za=(()=>{if(Wt===4){r.current?.synth?.setFunction?.({name:"patternTuringDisplay",type:"src",inputs:[...la],glsl:Ia(lr(B()?.colorA,"#0b1020"),lr(B()?.colorB,"#22d3ee"))});let Xa=Te.patternTuringDisplay;return Xa?Xa(Vn,Ke,yr,wr):lt(Vn)}if(Wt===5)return typeof br=="function"?br(st,ht,qt,Jt,G,X,te,se,ge,Ue):wt(.1,.6,.9);let yo=Wt===1?Ut:Wt===2?tr:Wt===3?zt:_t;return typeof yo=="function"?yo(Ke,ht,qt,Jt,G,X,te,se,ge,Ue):wt(.1,.6,.9)})();F=Fn({chain:F,layerSrc:za,mode:rr,getAmount:M,solid:wt,getLayerLuma:bo,layerSourceStack:St.layerSourceStack})}if(b==="electricNoise"){let M=()=>Math.max(0,Math.min(1,f("electricNoise","amount",1))),B=()=>f("electricNoise","speed",1),G=()=>f("electricNoise","scale",1),X=()=>f("electricNoise","noiseScale",1),te=()=>f("electricNoise","turbulence",.2),se=()=>f("electricNoise","detail",5),ge=()=>f("electricNoise","intensity",1.4),Ue=()=>f("electricNoise","rings",.85),Ke=()=>f("electricNoise","ringPower",.9),st=()=>C()?.electricNoise?.params,ht=()=>lr(st()?.color,"#331a66")[0],qt=()=>lr(st()?.color,"#331a66")[1],Jt=()=>lr(st()?.color,"#331a66")[2],yr=()=>Y.current,wr=()=>yr().count,Wt=vn(Number(Pe.params?.mode)||0),rr=typeof vr=="function"?vr(Cc(),B,G,X,te,se,ge,Ue,Ke,zE,kc(),wr,ht,qt,Jt):wt(.2,.1,.4);F=Fn({chain:F,layerSrc:rr,mode:Wt,getAmount:M,solid:wt,layerSourceStack:St.layerSourceStack})}if(b==="plexus"){let M=Ce("plexus"),B=()=>f("plexus","speed",1),G=()=>Fc(f("plexus","points",1.5),O.current),X=()=>f("plexus","intensity",1),te=()=>Pc(f("plexus","layers",4),O.current),se=()=>f("plexus","glow",1.2),ge=()=>{let st=C()?.plexus;return st?_n("plexus",st.syncBand??"master",gn())*(st.syncMultiplier??.45):0},Ue=Pe.params?.mode??0,Ke=typeof pn=="function"?pn(B,G,X,te,se,ge):wt(.4,.15,.85);F=Fn({chain:F,layerSrc:Ke,mode:Number(Ue),getAmount:M,solid:wt,layerSourceStack:St.layerSourceStack})}if(b==="superformula"){let M=Ce("superformula"),B=()=>C()?.superformula?.params,G=()=>Math.max(0,Math.min(2,Math.round(Number(f("superformula","look",2))))),X=()=>f("superformula","m",7.6),te=()=>f("superformula","n1",.36),se=()=>f("superformula","n2",2.16),ge=()=>f("superformula","size",.48),Ue=()=>f("superformula","speed",.35),Ke=()=>f("superformula","glow",1.2),st=()=>lr(B()?.color,"#c4b5fd")[0],ht=()=>lr(B()?.color,"#c4b5fd")[1],qt=()=>lr(B()?.color,"#c4b5fd")[2],Jt=vn(Number(f("superformula","mode",2))),yr=typeof bt=="function"?bt(G,X,te,se,ge,Ue,Ke,st,ht,qt):wt(.77,.71,.99);F=Fn({chain:F,layerSrc:yr,mode:Jt,getAmount:M,solid:wt,layerWithoutLuma:!0,layerSourceStack:St.layerSourceStack})}if(b==="topoContour"){let M=p.current===0?Fr:Or,B=Ce("topoContour"),G=()=>f("topoContour","scale",1),X=()=>Math.max(2,Math.min(24,Math.round(f("topoContour","lines",10)))),te=()=>f("topoContour","speed",1),se=()=>f("topoContour","valley",.12),ge=()=>f("topoContour","lineWidth",1),Ue=()=>f("topoContour","videoTint",.35),Ke=()=>Math.max(0,Math.min(1,Math.round(f("topoContour","palette",0)))),st=vn(Number(Pe.params?.mode)||0),ht=typeof Wr=="function"?Wr(M,G,X,te,se,ge,Ue,Ke):wt(0,0,0);F=Fn({chain:F,layerSrc:ht,mode:st,getAmount:B,solid:wt,layerSourceStack:St.layerSourceStack})}if(b==="universeWithin"){let M=Ce("universeWithin"),B=()=>f("universeWithin","speed",1),G=()=>f("universeWithin","zoom",1.5),X=()=>Ba(f("universeWithin","layers",4)),te=()=>f("universeWithin","glow",1.2),se=()=>{let Ke=C()?.universeWithin;return Ke?_n("universeWithin",Ke.syncBand??"master",gn())*(Ke.syncMultiplier??.45):0},ge=vn(Number(Pe.params?.mode)||0),Ue=typeof Ft=="function"?Ft(B,G,X,te,se):wt(.4,.15,.85);F=Fn({chain:F,layerSrc:Ue,mode:ge,getAmount:M,solid:wt,layerSourceStack:St.layerSourceStack})}if(b==="fractalFold"){let M=Ce("fractalFold"),B=()=>f("fractalFold","foldX",.86),G=()=>f("fractalFold","foldY",1.04),X=()=>f("fractalFold","zoom",1),te=()=>f("fractalFold","speed",.6),se=()=>f("fractalFold","spin",.42),ge=()=>Oc(f("fractalFold","depth",8)),Ue=()=>f("fractalFold","glow",1.4),Ke=()=>f("fractalFold","hue",.12),st=()=>{let Jt=C()?.fractalFold;return Jt?_n("fractalFold",Jt.syncBand??"master",gn())*(Jt.syncMultiplier??.45):0},ht=vn(Number(Pe.params?.mode)||0),qt=typeof nr=="function"?nr(B,G,X,te,se,ge,Ue,Ke,st):wt(.15,.35,.9);F=Fn({chain:F,layerSrc:qt,mode:ht,getAmount:M,solid:wt,layerSourceStack:St.layerSourceStack})}if(b==="blur"){let M=Ce("blur",{clampMin:0,clampMax:2}),B=Math.round(Number(Pe.params?.mode??0)),G=B>=0&&B<=2?B:0,X=G===1,te=G===2;Rt&&(R.push({out:Rt,buffer:Nr(F)}),F=lt(Rt));let se=Rt??h;if(X){let ge=dx(O.current??"full"),Ue=()=>px(M());for(let Ke=1;Ke<=ge;Ke++){let st=Ke;F=F.blend(lt(se).scale(()=>1+M()*.06*(st/Math.max(ge,1))).blurMirrorUv(),()=>Ue()/Math.sqrt(st)*.9)}}else if(te)F=F.blurNoise(M,()=>hx,()=>gx);else{let ge=()=>fx(M()),Ue=(Ke,st)=>{let ht=wt(0,0,0,0);for(let[qt,Jt]of mx){let yr=()=>qt/4*ge(),wr=st==="x"?lt(Ke).scrollX(yr):lt(Ke).scrollY(yr);ht=ht.add(wr.blurMirrorUv(),Jt)}return ht};Tt?(R.push({out:Tt,buffer:Ue(se,"x")}),F=Ue(Tt,"y")):F=F.blurGaussian(se,M)}}if(b==="sharpen"){let M=Ce("sharpen",{clampMin:0,clampMax:2}),B=()=>Math.max(.25,Math.min(2,f("sharpen","radius",1))),G=()=>Sx(B()),X=Tx(O.current??"full"),te=wt(0,0,0,0);for(let se of X)if(se.kind==="center")te=te.add(lt(h),se.weight);else if(se.kind==="scrollX"){let ge=se.sign;te=te.add(lt(h).scrollX(()=>ge*G()),se.weight)}else{let ge=se.sign;te=te.add(lt(h).scrollY(()=>ge*G()),se.weight)}F=F.sharpenUnsharp(te,M)}if(b==="flash"&&(F=F.flashBurst(Ce("flash"))),b==="fadeOff"){let M=()=>Vx(C()?.fadeOff,ie().customBands);F=F.blend(wt(0,0,0),M)}if(b==="vignette"){let M=Ce("vignette"),B=()=>yx(M()),G=()=>f("vignette","radius",.78),X=()=>f("vignette","softness",.42),te=()=>f("vignette","blur",0),se=()=>bx(te()),ge=Ke=>{let st=se();if(st<1e-5)return 0;let ht=1-Ke/Math.max(1,ad);return st*ht},Ue=lt(h);for(let Ke=0;Ke<ad;Ke+=1)Ue=Ue.blurNoise(()=>ge(Ke),()=>vx,()=>_x);F=F.vignetteGrade(Ue,B,G,X,te)}if(b==="feedback"){let M=Ce("feedback",{clampMin:.8,clampMax:.99}),B=()=>v.current>0?0:M(),G=()=>f("feedback","scale",1),X=()=>f("feedback","balance",.5);F=F.blend(lt(h).scale(G).feedbackGrade(X),B)}if(b==="paletteRecolor"){let M=Ce("paletteRecolor"),B=()=>Math.max(0,Math.min(1,Math.round(Number(f("paletteRecolor","mode",0))))),G=()=>Math.max(2,Math.min(4,Math.round(Number(f("paletteRecolor","colors",3))))),X=()=>lx(ie().s0?.src,G(),f("paletteRecolor","boost",.35),performance.now()),te=se=>()=>X()[se]??0;F=F.paletteRecolor(M,B,G,...Array.from({length:12},(se,ge)=>te(ge)))}if(b==="shapeLayer"){let M=Ce("shapeLayer"),B=()=>C()?.shapeLayer?.params,G=()=>lr(B()?.color,"#ffffff")[0],X=()=>lr(B()?.color,"#ffffff")[1],te=()=>lr(B()?.color,"#ffffff")[2],se=()=>Math.max(0,Math.min(4,Math.round(Number(f("shapeLayer","shape",0))))),ge=()=>f("shapeLayer","size",.45),Ue=()=>f("shapeLayer","roundness",0),Ke=()=>f("shapeLayer","stroke",.15),st=()=>Math.max(0,Math.min(1,Math.round(Number(f("shapeLayer","fill",0))))),ht=()=>f("shapeLayer","rotate",0),qt=()=>f("shapeLayer","centerX",.5),Jt=()=>f("shapeLayer","centerY",.5),yr=vn(Number(f("shapeLayer","mode",4))),wr=typeof Ht=="function"?Ht(se,ge,Ue,Ke,ht,qt,Jt,G,X,te,M,st):wt(1,1,1);F=Fn({chain:F,layerSrc:wr,mode:yr,getAmount:M,solid:wt,layerWithoutLuma:!0,layerSourceStack:St.layerSourceStack})}if(b==="string"){let M=Ce("string"),B=()=>C()?.string?.params,G=()=>lr(B()?.color,"#f6edd4")[0],X=()=>lr(B()?.color,"#f6edd4")[1],te=()=>lr(B()?.color,"#f6edd4")[2],se=()=>f("string","position",.5),ge=()=>Math.max(0,Math.min(1,Math.round(Number(f("string","orientation",0))))),Ue=()=>f("string","thickness",.42),Ke=()=>f("string","glow",.68),st=()=>Math.max(1,Math.min(3,Math.round(Number(f("string","harmonics",2)))));F=F.stringLayer(()=>1,M,se,ge,Ue,Ke,st,G,X,te)}if(b==="resynthesize"){let M=Ce("resynthesize",{clampMin:0,clampMax:.98}),B=()=>f("resynthesize","x",.5),G=()=>f("resynthesize","y",.78),X=()=>f("resynthesize","hue",.25),te=()=>f("resynthesize","decay",.3);F=F.blend(lt(h).resynthWarp(B,G).resynthTint(B,G,X,te),M)}if(b==="ghostFlow"){let M=Ce("ghostFlow"),B=()=>f("ghostFlow","melt",.62),G=()=>f("ghostFlow","flowScale",.48),X=()=>f("ghostFlow","refresh",0),te=()=>f("ghostFlow","chromaBleed",.35);F=F.ghostFlow(Lc(()=>h),M,B,G,X,te)}if(b==="oscilloscope"){let M=Ge("oscilloscope");if(fe.current&&M){let B=Ce("oscilloscope");St.layerSourceStack.push(M);let G=()=>f("oscilloscope","glow",.55);F=F.oscilloscopeOverlay(M,B,G)}}if(b==="neonGrid"){let M=Ge("neonGrid");if(Ee.current&&M){St.layerSourceStack.push(M);let B=()=>Math.max(0,Math.min(1,f("neonGrid","intersect",1.6)/3));F=F.neonGridOverlay(M,()=>1,B)}}if(b==="textLayer"){let M=Ge("textLayer");if(be.current&&M){let B=Ce("textLayer");St.layerSourceStack.push(M);let G=()=>f("textLayer","glow",.35);F=F.textLayerOverlay(M,B,G)}}if(b==="cymatic"){let M=Ce("cymatic"),B=()=>Math.max(1,f("cymatic","frequency",12));F=F.scale(()=>window.innerWidth/window.innerHeight,1).cymaticDistort(M,B).scale(()=>window.innerHeight/window.innerWidth,1)}Oa(F,St.chainStack)}},dn=(b,Pe,M,B)=>{let G=M();if(!G?.enabled)return b;let X=F,te=at;F=b,at={templateKey:Pe,effectKey:B??Pe,config:G},rt.set(Pe,at.effectKey);try{return Jr(Pe),F}catch(se){return console.warn(`[fx-group] ${Pe} failed`,se),b}finally{F=X,at=te}},yn=!1,gt={},Lt=Be.filter(b=>b.kind==="group").map(b=>b.id);{let b=n.current.layerInstances??{},Pe=n.current.fxGroups??{},M=Ue=>Be.some(Ke=>Ke.kind==="fx"&&Ke.key===Ue&&!!C()?.[Ue]?.enabled)||Lt.some(Ke=>{let st=Pe[Ke];return st?.enabled?st.layerIds.some(ht=>{let qt=b[ht];return qt?.templateKey===Ue&&!!qt.config.enabled}):!1}),B=M("blur"),G=B||M("liquix"),X=[],te=C();te?.reactionDiffusion?.enabled&&Pr&&X.push(Pr),Ci(te?.patternLayer)&&te?.patternLayer?.enabled&&_r&&X.push(_r),Qf(Yl(ie().outputMapping??s.current))&&Qr&&X.push(Qr),G&&(Rt=Dc([Qr,_r,Pr],X),Rt&&X.push(Rt),B&&(Tt=Dc([Qr,_r,Pr],X)),Tt&&X.push(Tt)),M("lens7c")&&(ur=Dc([Qr,_r,Pr],X),ur&&X.push(ur));let se=[_r,Qr,Pr].filter(Ue=>!!Ue&&Ue!==Rt&&Ue!==Tt&&Ue!==ur),ge=0;for(let Ue of Lt){let Ke=Pe[Ue];if(!Ke?.enabled||!Ke.layerIds.some(qt=>{let Jt=b[qt];return Jt?.templateKey==="feedback"&&!!Jt.config.enabled}))continue;let ht=se[ge++];ht&&(mt[Ue]=ht)}}let Yt={fxGroups:n.current.fxGroups??{},layerInstances:n.current.layerInstances??{},solid:wt,buildLayer:ft,applyOperator:(b,Pe,M,B,G)=>{let X=St.chainStack,te=St.layerSourceStack;St.chainStack=B.chainStack,St.layerSourceStack=B.layerSourceStack;try{return dn(b,Pe,M,G)}finally{St.chainStack=X,St.layerSourceStack=te}},getGroupAmount:b=>()=>{let Pe=n.current.fxGroups?.[b];return Pe?.composite?hr(`group:${b}`,Pe.composite,gn(),jr):0},maskCompositeOpts:er,getClipSource:()=>{let b=p.current===0?Fr:Or;return lt(b).scale(Ao)},groupBufferCache:gt,hasGroupFeedbackOut:b=>!!mt[b],applyGroupFeedback:(b,Pe,M)=>{let B=mt[Pe];if(!B)return b;let G=()=>v.current>0?0:hr("feedback",M,gn(),{clampMin:.8,clampMax:.99}),X=()=>rd(M,"scale",1),te=()=>rd(M,"balance",.5);return b.blend(lt(B).scale(X).feedbackGrade(te),G)},commitGroupFeedbackLoop:(b,Pe)=>{let M=mt[b];M&&R.push({out:M,buffer:Nr(Pe)})}};Py(Lt,Yt);for(let b of Be){if(yn)break;if(b.kind==="group"){let Pe=Fy(F,b.id,Yt);F=Pe.chain,Pe.solo&&(yn=!0),Oa(F,St.chainStack);continue}Jr(b.key)}if(Be.some(b=>b.kind==="fx"&&b.key==="playbackCue")||Jr("playbackCue"),C()?.slowmo?.enabled&&f("slowmo","motionBlur",Ai)>1e-5&&(F=F.blend(lt(h),()=>ie().slowmoTrailMix??0)),o.current&&Lg(i.current)){let b=()=>{let Pe=D.current,M=Aa(i.current);return Pe?zf({exportSettings:M,canvasWidth:Pe.width,canvasHeight:Pe.height,videoAspect:cr(),inset:vd}):zf({exportSettings:M,canvasWidth:1920,canvasHeight:1080,videoAspect:cr(),inset:vd})};F=F.exportVideoFit(()=>b().contentHalfW,()=>b().contentHalfH,()=>b().contentOffsetY).exportMatte(()=>1,()=>b().targetWidth,()=>b().targetHeight,()=>b().usePixelBox?1:0,()=>b().targetAspect,()=>vd,()=>VE,()=>b().contentHalfW,()=>b().contentHalfH,()=>b().contentOffsetY)}let ir=()=>Yl(ie().outputMapping??s.current),Mn=()=>Qf(ir()),ro=C()?.reactionDiffusion,$a=!!ro?.enabled&&hr("reactionDiffusion",ro,gn(),jr)>1e-5;if($a&&Pr){let b=p.current===0?Fr:Or,Pe=()=>f("reactionDiffusion","feed",.55),M=()=>f("reactionDiffusion","kill",.57),B=()=>f("reactionDiffusion","scale",12),G=()=>f("reactionDiffusion","speed",.45),X=()=>f("reactionDiffusion","styleMap",.35),te=()=>f("reactionDiffusion","source",.78),se=()=>f("reactionDiffusion","flow",.32),ge=()=>f("reactionDiffusion","emboss",.58),Ue=()=>d.current>0?1:0,Ke=Lc(()=>r.current?.o?.[1]);Te.reactionDiffSim(Ke,b,Pe,M,B,G,X,te,se,ge,Ue).out(Pr)}let pa=C()?.patternLayer,Xi=Ci(pa)&&hr("patternLayer",pa,gn(),jr)>1e-5;if(Xi&&_r){let b=()=>Gy(f("patternLayer","variant",2),f("patternLayer","scale",1),f("patternLayer","speed",.4),f("patternLayer","warp",0),f("patternLayer","symmetry",2),f("patternLayer","seedSize",.18),f("patternLayer","gap",.35)),Pe=Lc(()=>r.current?.o?.[3]);Te.patternRdSim(Pe,()=>b().feed,()=>b().kill,()=>b().cells,()=>b().styleMap,()=>b().speed,()=>b().seedSize,()=>H.current>0?1:0).out(_r)}let Ur=r.current?.o,po=h??Ur?.[jf],mo=Qr??Ur?.[Yf],Cn=(b,Pe)=>()=>Pg(ir())[b][Pe],Xo=Ng(),ho=r.current?.synth?.render;if(Mn()&&po&&mo){F.out(po);let b=Ei(()=>Ur?.[jf]);qe(1,.001,0).outputCornerPinWarp(b,()=>1,Cn(0,"x"),Cn(0,"y"),Cn(1,"x"),Cn(1,"y"),Cn(2,"x"),Cn(2,"y"),Cn(3,"x"),Cn(3,"y"),{getTexture:()=>(Gg(ir()),Xo.getTexture())},()=>{let Pe=jl(ir());return Math.min(Ca,Pe.points.length)},()=>Zf()&&!Kf(ir())?1:0,()=>Zf()&&ir().points.length>=To?1:0).out(mo),ho?.(mo)}else F.out(h),ho?.(h);let En=Oy(),no=new Set;if($a&&no.add(1),Xi&&no.add(3),Mn()&&no.add(Yf),Rt){let b=[h,Pr,Qr,_r].indexOf(Rt);b>=0&&no.add(b)}if(Tt){let b=[h,Pr,Qr,_r].indexOf(Tt);b>=0&&no.add(b)}if(ur){let b=[h,Pr,Qr,_r].indexOf(ur);b>=0&&no.add(b)}for(let b of Object.values(mt)){let Pe=[h,Pr,Qr,_r].indexOf(b);Pe>=0&&no.add(Pe)}let go=By({previewGroupId:En,buffer:En?gt[En]:void 0,feedbackOut:En?mt[En]:void 0,outputs:[h,Pr,Qr,_r],busyIndices:no});Iy(go?.index??null);let Po=En?gt[En]:void 0;go&&Po&&!R.some(b=>b.out===go.out)&&R.push({out:go.out,buffer:Nr(Po)});for(let{out:b,buffer:Pe}of R)Nr(Pe).out(b);Pn()||K.current(0)}catch(or){console.error("Hydra Shader Error:",or)}finally{Zl()}}}u();u();function js(e){return`
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
  `}var Cv=`
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
`;u();var Ev=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  float g = clamp(glow, 0.0, 1.0);
  vec3 src = _c1.rgb;
  float lum = max(max(src.r, src.g), src.b);
  // Preserve canvas hue; glow only boosts energy (do not collapse to grayscale).
  vec3 boosted = src * (1.0 + g * 1.6);
  float mixAmt = clamp(lum * a * (0.7 + g * 0.4), 0.0, 1.0);
  return vec4(max(_c0.rgb, mix(_c0.rgb, boosted, mixAmt)), _c0.a);
`;u();var Rv=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec3 neon = _c1.rgb;
  float lum = max(max(neon.r, neon.g), neon.b);
  vec3 boosted = neon * (1.0 + glow * 1.8);
  float mixAmt = clamp(lum * a * (0.75 + glow * 0.35), 0.0, 1.0);
  return vec4(max(_c0.rgb, mix(_c0.rgb, boosted, mixAmt)), _c0.a);
`;u();var kv=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec3 stars = _c1.rgb;
  float lum = max(max(stars.r, stars.g), stars.b);
  vec3 boosted = stars * (1.0 + glow * 2.2);
  float mixAmt = clamp(lum * a * (0.8 + glow * 0.45), 0.0, 1.0);
  return vec4(max(_c0.rgb, mix(_c0.rgb, boosted, mixAmt)), _c0.a);
`;u();var Pv=`
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
`;u();function Ys(e,t,r,n,o){let i=`wq${o}`;return`
    vec3 ${i} = ${e};
    float cR${o} = cos(${n} * 0.38);
    float sR${o} = sin(${n} * 0.38);
    vec2 xz${o} = mat2(cR${o}, -sR${o}, sR${o}, cR${o}) * ${i}.xz;
    ${i}.x = xz${o}.x;
    ${i}.z = xz${o}.y;
    float cR2${o} = cos(${n} * 0.24);
    float sR2${o} = sin(${n} * 0.24);
    vec2 xy${o} = mat2(cR2${o}, -sR2${o}, sR2${o}, cR2${o}) * ${i}.xy;
    ${i}.x = xy${o}.x;
    ${i}.y = xy${o}.y;

    float m${o} = clamp(${t}, 0.0, 1.0);
    float sz${o} = 0.82 + m${o} * 0.48;
    float coreR${o} = (0.26 + m${o} * 0.28) * sz${o};
    coreR${o} += sin(${n} * (1.85 + m${o} * 2.4) + m${o} * 5.1) * 0.075 * m${o};

    float dCore${o} = length(${i}) - coreR${o};
    vec2 tq${o} = vec2(length(${i}.xz) - (0.92 + m${o} * 0.38) * sz${o}, ${i}.y);
    float dTorus${o} = length(tq${o}) - (0.1 + m${o} * 0.08);
    float sk${o} = 0.13 * sz${o};
    float sh${o} = clamp(0.5 + 0.5 * (dTorus${o} - dCore${o}) / max(sk${o}, 1e-4), 0.0, 1.0);
    dm = mix(dTorus${o}, dCore${o}, sh${o}) - sk${o} * sh${o} * (1.0 - sh${o});

    float ripFreq${o} = max(1.0, ${r});
    float rip${o} = sin(${i}.x * ripFreq${o} + ${n} * 1.1) * sin(${i}.y * ripFreq${o} * 1.07) * sin(${i}.z * ripFreq${o} * 0.93);
    dm += rip${o} * 0.016 * m${o} * sz${o};
  `}var Fv=`
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
    ${Ys("p","morphV","detailV","tb","0")}
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
    ${Ys("p","morphV","detailV","tb","C")}
    float d0 = dm;
    ${Ys("p + vec3(e, 0.0, 0.0)","morphV","detailV","tb","X")}
    float dx = dm - d0;
    ${Ys("p + vec3(0.0, e, 0.0)","morphV","detailV","tb","Y")}
    float dy = dm - d0;
    ${Ys("p + vec3(0.0, 0.0, e)","morphV","detailV","tb","Z")}
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
`;u();var Ov=`
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
`;u();u();var Iv=`
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
    ink *= 1.0 - edge;`;var Bv=`
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
    ${Iv}
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
`;u();var Dv=`
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
`;u();var Hv=`
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
`;u();var Nv=`
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
`;u();function XE(e,t){let r=t;return`
    vec3 q${r} = ${e};
    float f${r} = 0.0;
    f${r} += 0.50000 * _noise(q${r}); q${r} *= 2.02;
    f${r} += 0.25000 * _noise(q${r}); q${r} *= 2.03;
    f${r} += 0.12500 * _noise(q${r});
    float ${t} = f${r};
  `}function Wc(e,t,r,n,o,i,s){let l=s;return`
    vec3 mp${l} = ${e};
    mp${l}.z -= ${t};
    float tz${l} = mp${l}.z;
    vec2 tc${l} = vec2(sin(tz${l} * 0.17) * 0.4, sin(tz${l} * 0.1 + 4.0)) * 3.0 * ${r};
    mp${l}.xy -= tc${l};
    float ang${l} = atan(mp${l}.y, mp${l}.x) - mp${l}.z * 0.25 + ${n} * 3.7 + sin(${n}) * 0.2;
    ${XE(`mp${l}`,`m${l}`)}
    float rad${l} = sin(mp${l}.z * 0.1) * 0.5 + 3.0 + m${l} * 0.3 + ${i} * 2.0 + sin(ang${l} * ${o}) * 0.3;
    float ${s} = length(mp${l}.xy) - rad${l};
  `}var Gv=`
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
    ${Wc("marchP","zOffset","tunnelShake","wtTime","armsAmt","audioReact","sdHit")}
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
    ${Wc("marchP","zOffset","tunnelShake","wtTime","armsAmt","audioReact","sd0")}
    ${Wc("marchP + vec3(epsN, 0.0, 0.0)","zOffset","tunnelShake","wtTime","armsAmt","audioReact","sdX")}
    ${Wc("marchP + vec3(0.0, epsN, 0.0)","zOffset","tunnelShake","wtTime","armsAmt","audioReact","sdY")}
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
`;u();var Wv=`
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
`;u();var Uv=`
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
`;u();var Vv=`
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
`;u();function zv(e,t){return`
    float pWn_${t} = ${e};
    vec3 p3_${t} = fract(vec3(pWn_${t}) * vec3(0.1031, 0.11369, 0.13787));
    p3_${t} += dot(p3_${t}, p3_${t}.yzx + 19.19);
    ${t} = fract(vec3(
      (p3_${t}.x + p3_${t}.y) * p3_${t}.z,
      (p3_${t}.x + p3_${t}.z) * p3_${t}.y,
      (p3_${t}.y + p3_${t}.z) * p3_${t}.x
    ));`}function jE(e,t){return`${t} = fract(sin(${e} * 12345.564) * 7658.76);`}function Xv(e,t,r){return`${r} = smoothstep(0.0, ${e}, ${t}) * smoothstep(1.0, ${e}, ${t});`}function YE(e,t,r,n,o){return`
    vec2 suv_${e} = ${t} * ${n};
    vec2 sid_${e} = floor(suv_${e});
    vec2 sfr_${e} = fract(suv_${e}) - 0.5;
    vec3 sn_${e};
    ${zv(`sid_${e}.x * 107.45 + sid_${e}.y * 3543.654`,`sn_${e}`)}
    vec2 sp_${e} = (sn_${e}.xy - 0.5) * 0.7;
    float sd_${e} = length(sfr_${e} - sp_${e});
    float sfade_${e};
    ${Xv("0.025",`fract(${r} + sn_${e}.z)`,`sfade_${e}`)}
    ${o} = smoothstep(0.3, 0.0, sd_${e}) * fract(sn_${e}.z * 10.0) * sfade_${e};`}function $v(e,t,r,n,o,i){return`
    vec2 UVloc_${e} = ${r};
    vec2 duv_${e} = ${t};
    duv_${e}.y += ${n} * 0.75;
    vec2 a_${e} = vec2(6.0, 1.0);
    vec2 grid_${e} = a_${e} * 2.0;
    vec2 id_${e} = floor(duv_${e} * grid_${e});

    float colShift_${e};
    ${jE(`id_${e}.x`,`colShift_${e}`)}
    duv_${e}.y += colShift_${e};

    id_${e} = floor(duv_${e} * grid_${e});
    vec3 n_${e};
    ${zv(`id_${e}.x * 35.2 + id_${e}.y * 2376.1`,`n_${e}`)}
    vec2 st_${e} = fract(duv_${e} * grid_${e}) - vec2(0.5, 0.0);

    float x_${e} = n_${e}.x - 0.5;

    float yW_${e} = UVloc_${e}.y * 20.0;
    float wiggle_${e} = sin(yW_${e} + sin(yW_${e}));
    x_${e} += wiggle_${e} * (0.5 - abs(x_${e})) * (n_${e}.z - 0.5);
    x_${e} *= 0.7;

    float ti_${e} = fract(${n} + n_${e}.z);
    float sawT_${e};
    ${Xv("0.85",`ti_${e}`,`sawT_${e}`)}
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

    ${o} = mainDrop_${e} + droplets_${e} * r_${e} * trailFront_${e};
    ${i} = trail_${e};`}function Uc(e,t,r,n,o,i,s,l){return`
  {
    float rainAmt_${e} = clamp(${o}, 0.0, 1.0);
    float l0_${e} = smoothstep(-0.5, 1.0, rainAmt_${e}) * 2.0;
    float l1_${e} = smoothstep(0.25, 0.75, rainAmt_${e});
    float l2_${e} = smoothstep(0.0, 0.5, rainAmt_${e});

    float sD_${e};
    ${YE(e,t,n,i,`sD_${e}`)}

    float m1x_${e}, m1t_${e};
    ${$v(`${e}a`,t,r,n,`m1x_${e}`,`m1t_${e}`)}

    float m2x_${e}, m2t_${e};
    ${$v(`${e}b`,`${t} * 1.85`,r,n,`m2x_${e}`,`m2t_${e}`)}

    float c_${e} = sD_${e} * l0_${e} + m1x_${e} * l1_${e} + m2x_${e} * l2_${e};
    ${s} = smoothstep(0.3, 1.0, c_${e});
    ${l} = max(m1t_${e} * l0_${e}, m2t_${e} * l1_${e});
  }`}var jv=`
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
`;function Yv(e){return`
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 stNorm = ${e};
  stNorm.y = 1.0 - stNorm.y;
  vec2 uv = stNorm - 0.5;
  uv.x *= aspect;
  uv *= 0.88 + zoomBreath * 0.08 * zoomMix;
  vec2 UV = stNorm;
  UV = (UV - 0.5) * (0.96 + zoomBreath * 0.04 * zoomMix) + 0.5;`}var qv=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float refr = clamp(refraction, 0.0, 1.0);
  ${jv}
  ${Yv("_st")}

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
`,Kv=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  ${jv}
  vec2 stUv = gl_FragCoord.xy / resolution.xy;
  ${Yv("stUv")}

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
`;u();var Vc="vec3(0.299, 0.587, 0.114)";function Qv(e,t,r){return`
  float ${r} = 0.0;
  for (int i = 1; i <= 28; i++) {
    vec2 p_${e} = psUv ${t} psDir * (float(i) * psStep);
    if (p_${e}.x < 0.001 || p_${e}.x > 0.999 || p_${e}.y < 0.001 || p_${e}.y > 0.999) break;
    float l_${e} = dot(texture2D(videoTex, p_${e}).rgb, ${Vc});
    if (l_${e} < psThr) break;
    ${r} = float(i) * psStep;
  }`}var Zv=`
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

  float psMyL = dot(texture2D(videoTex, psUv).rgb, ${Vc});

  if (psMyL >= psThr) {
    ${Qv("b","-","psBack")}
    ${Qv("f","+","psFwd")}

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
      float d_r = abs(dot(c_r, ${Vc}) - psTarget);
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
    if (dot(c_m, ${Vc}) >= psThr) {
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
`;u();var Jv=`
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
`;u();var e_=`
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
`,t_=`
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
`;u();var r_=`
  vec2 t = _st - 2.0 * floor(_st * 0.5);
  t = mix(t, 2.0 - t, step(1.0, t));
  vec2 inset = 0.5 / max(resolution.xy, vec2(1.0));
  return clamp(t, inset, 1.0 - inset);
`,qE=`
  vec2 tB = stB - 2.0 * floor(stB * 0.5);
  tB = mix(tB, 2.0 - tB, step(1.0, tB));
  vec2 insetB = 0.5 / max(resolution.xy, vec2(1.0));
  stB = clamp(tB, insetB, 1.0 - insetB);
`,n_=`
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
  ${qE}
  return stB;
`;u();var _d=[1,12,66,220,495,792,924,792,495,220,66,12,1],$c=[1,8,28,56,70,56,28,8,1];function o_(e,t){return[`  u = ${e};`,"  t = u - 2.0 * floor(u * 0.5);","  t = mix(t, 2.0 - t, step(1.0, t));",`  acc += texture2D(blurTex, clamp(t, inset, 1.0 - inset)) * ${t.toFixed(6)};`].join(`
`)}function KE(){let e=_d.length,t=(e-1)/2,r=_d.reduce((o,i)=>o+i,0),n=[];for(let o=0;o<e;o++){let i=_d[o]/r,s=o-t,l=s===0?"st":`st + cell * ${s.toFixed(1)}`;n.push(o_(l,i))}return n.join(`
`)}function QE(){let e=$c.length,t=(e-1)/2,r=$c.reduce((o,i)=>o+i,0),n=[];for(let o=0;o<e;o++)for(let i=0;i<e;i++){let s=$c[i]*$c[o]/(r*r),l=i-t,p=o-t,d=l===0&&p===0?"st":`st + vec2(${l.toFixed(1)}, ${p.toFixed(1)}) * cell`;n.push(o_(d,s))}return n.join(`
`)}var a_=`
  float a = clamp(amount, 0.0, 2.0);
  if (a < 0.00001) return _c0;

  vec2 st = gl_FragCoord.xy / max(resolution.xy, vec2(1.0));
  vec2 texel = 1.0 / max(resolution.xy, vec2(1.0));
  vec2 inset = texel * 0.5;
  float outer = a * ${32 .toFixed(1)};
  vec2 u = vec2(0.0);
  vec2 t = vec2(0.0);
  vec4 acc = vec4(0.0);
`,HW=`
${a_}
  vec2 cell = (axis < 0.5 ? vec2(texel.x, 0.0) : vec2(0.0, texel.y)) * max(0.6, outer / 6.0);
${KE()}
  return vec4(acc.rgb, _c0.a);
`,i_=`
${a_}
  vec2 cell = texel * max(0.6, outer / 4.0);
${QE()}
  return vec4(acc.rgb, _c0.a);
`;u();var s_=`
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
`;u();var l_=`
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
`;u();var c_=`
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
`;u();var u_=`
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
`,f_=`
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
`;u();var p_=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec3 dust = _c1.rgb;
  float lum = max(max(dust.r, dust.g), dust.b);
  if (lum < 0.0008) return _c0;

  float mixAmt = clamp(lum * a * 1.22, 0.0, 1.0);
  return vec4(max(_c0.rgb, mix(_c0.rgb, dust * 1.4, mixAmt)), _c0.a);
`;u();var d_=`
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
`;u();function zc(e,t,r,n,o){return`
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
    float ${r} = field_${e} * mix(0.45, 1.3, pow(clamp(bottom_${e}, 0.0, 1.0), 0.5));
    ${r} += (_noise(vec3(${t}.x * den * 2.4, bottom_${e} * 3.2 - t * 0.4, t * 0.2)) * 0.5 + 0.5) * 0.14 * turb;
    float ${o} = smoothstep(0.22, 0.7, ${r});
    ${o} *= smoothstep(0.0, 0.16, bottom_${e}) * mix(0.35, 1.0, smoothstep(0.05, 0.72, bottom_${e}));
    float ${n} = warp_${e};
  `}var m_=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  vec2 st = _st;
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 p = vec2(st.x * aspect, 1.0 - st.y);
  float den = mix(1.8, 6.2, clamp(density, 6.0, 40.0) / 40.0);
  float t = time * clamp(speed, 0.0, 3.0);
  float turb = 0.68;
  float waveStr = clamp(waves, 0.0, 1.0) * a;
  ${zc("d0","p","tongues","warp","wall")}
  float flameZone = smoothstep(0.02, 0.42, wall);
  float ky = mix(3.8, 13.0, clamp(density, 6.0, 40.0) / 40.0);
  float ph1 = p.y * ky - t * 1.35 + sin(p.x * ky * 0.48 + t * 0.32) * 0.85;
  float ph2 = p.y * ky * 1.7 - t * 2.05 + sin(p.x * ky * 0.9 - t * 0.5) * 0.4;
  st.x += (sin(ph1) + sin(ph2) * 0.5) * waveStr * flameZone * 0.04 / aspect;
  st.y += (cos(ph1) * 0.4 + cos(ph2) * 0.18) * waveStr * flameZone * 0.014;
  float eps = 0.02;
  vec2 px = p + vec2(eps, 0.0);
  ${zc("dx","px","tonguesX","warpX","wallX")}
  vec2 py = p + vec2(0.0, eps);
  ${zc("dy","py","tonguesY","warpY","wallY")}
  vec2 grad = vec2(tonguesX - tongues, tonguesY - tongues);
  float push = flameZone * a * 0.55;
  st.x += (grad.x * 1.05 + (warp - 0.5) * 0.3) * push * 0.034 / aspect;
  st.y -= (grad.y * 0.8) * push * 0.02;
  return clamp(st, vec2(0.001), vec2(0.999));
`,h_=`
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
  ${zc("o0","p","tongues","warp","wall")}
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
`,g_=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float waveAmt = clamp(waves, 0.0, 1.0);
  float warm0 = max(_c0.r - _c0.b, 0.0);
  float warm1 = max(_c1.r - _c1.b, 0.0);
  float trail = clamp(warm0 * 0.72 + warm1 * 0.55, 0.0, 0.7) * waveAmt * a;
  vec3 smeared = mix(_c0.rgb, _c1.rgb, trail);
  return vec4(clamp(smeared, 0.0, 1.0), _c0.a);
`;u();var b_=`
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
`,y_=`
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
`;u();var x_=`
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
`;u();var v_=`
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
`;u();var __=`
  vec2 pad = vec2(clamp(x, 0.0, 1.0), clamp(y, 0.0, 1.0)) - 0.5;
  float reach = clamp(length(pad) * 2.0, 0.0, 1.0);
`,S_=`${__}
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
`,T_=`${__}
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
`;u();var M_=`
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
`;u();var L_=`
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
`;u();var w_=`
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
`;u();var A_=`
  vec3 w = vec3(0.299, 0.587, 0.114);
  float thr = mix(0.12, 0.88, clamp(threshold, 0.0, 1.0));
  float knee = mix(0.07, 0.018, clamp(thinness, 0.0, 1.0));
  float luma = dot(_c0.rgb, w);
  float hi = smoothstep(thr, thr + knee, luma);
  hi = pow(hi, mix(1.6, 0.75, clamp(thinness, 0.0, 1.0)));
  return vec4(_c0.rgb * hi, hi);
`;u();var rR=2.4,E_=`
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
  vec3 flare = clamp(fan * (a * ${rR.toFixed(2)}), 0.0, 1.0);
  vec3 lit = vec3(1.0) - (vec3(1.0) - base) * (vec3(1.0) - flare);

  float hz = clamp(haze, 0.0, 1.0);
  float luma = dot(base, vec3(0.2126, 0.7152, 0.0722));
  lit += fan * (hz * a * 1.8) * (1.0 - luma);

  return vec4(clamp(lit, 0.0, 1.0), _c0.a);
`;u();var R_=`
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
`,k_=`
  vec3 w = vec3(0.2126, 0.7152, 0.0722);
  float luma = dot(_c0.rgb, w);
  float peak = max(_c0.r, max(_c0.g, _c0.b));
  float bright = mix(luma, peak, 0.55);

  float thr = mix(0.18, 0.78, clamp(threshold, 0.0, 1.0));
  float knee = mix(0.10, 0.28, clamp(bloom, 0.0, 1.0));
  float mask = smoothstep(max(thr - knee, 0.0), thr + knee, bright);
  mask *= mix(0.55, mask, 0.45);
  return vec4(_c0.rgb * mask, mask);
`,P_=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec3 bloom = _c1.rgb;
  vec3 room = vec3(1.0) - clamp(_c0.rgb, 0.0, 1.0) * 0.38;
  vec3 outRgb = _c0.rgb + bloom * a * room;
  outRgb = outRgb / (vec3(1.0) + max(outRgb - vec3(1.0), vec3(0.0)) * 0.5);
  return vec4(outRgb, _c0.a);
`;u();u();var qs=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float luma = dot(_c1.rgb, vec3(0.299, 0.587, 0.114));
  float thr = clamp(threshold, 0.0, 1.0);
  float soft = max(0.01, softness);
  float m = smoothstep(thr - soft, thr + soft, luma);
  if (invert > 0.5) m = 1.0 - m;
  m = mix(1.0, m, a);
  return vec4(_c0.rgb * m, _c0.a);
`;var F_=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float luma = dot(_c1.rgb, vec3(0.299, 0.587, 0.114));
  float thr = clamp(threshold, 0.0, 1.0);
  float soft = max(0.01, softness);
  float m = smoothstep(thr - soft, thr + soft, luma);
  if (invert > 0.5) m = 1.0 - m;
  m = mix(1.0, m, a);
  return vec4(_c0.rgb, m * _c0.a);
`;u();var O_=`
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
`;u();var I_=`(index + ${ea}.5) / ${Wo}.0`,nR=`(index + ${ql}.5) / ${Wo}.0`,oR=`(index + 0.5) / ${Wo}.0`,jc="vec2((enc.r * 65280.0 + enc.g * 255.0) / 65535.0, (enc.b * 65280.0 + enc.a * 255.0) / 65535.0)",aR=`
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
    local = vec2(sv, tv);`;function Xc(e,t,r,n,o,i){return`
    p0 = tPts[${e}];
    p1 = tPts[${t}];
    p2 = tPts[${r}];
    p3 = tPts[${n}];
    ${aR}
    score = max(max(-local.x, local.x - 1.0), max(-local.y, local.y - 1.0));
    if (score < bestScore) {
      bestScore = score;
      bestLocal = local;
      bestOrigin = vec2(${o}, ${i});
    }`}var B_=`
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
         tPts[6] * (l0u * d2v) + tPts[7] * (l1u * d2v) + tPts[8] * (l2u * d2v);`;function Qn(e,t){return`
    ba = ${t} - ${e};
    pa = outUv - ${e};
    ht = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
    edgeDist = min(edgeDist, length(pa - ba * ht));`}var iR=Array.from({length:To},(e,t)=>`
    index = ${t}.0;
    enc = texture2D(maskTex, vec2(${oR}, 0.5));
    tPts[${t}] = ${jc};`).join(""),D_=[{type:"sampler2D",name:"frameTex",default:0},{type:"float",name:"amount",default:1},{type:"float",name:"tlX",default:0},{type:"float",name:"tlY",default:0},{type:"float",name:"trX",default:1},{type:"float",name:"trY",default:0},{type:"float",name:"brX",default:1},{type:"float",name:"brY",default:1},{type:"float",name:"blX",default:0},{type:"float",name:"blY",default:1},{type:"sampler2D",name:"maskTex",default:0},{type:"float",name:"maskCount",default:4},{type:"float",name:"maskLive",default:0},{type:"float",name:"gridLive",default:0}],H_=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec2 tl = vec2(clamp(tlX, 0.0, 1.0), clamp(tlY, 0.0, 1.0));
  vec2 tr = vec2(clamp(trX, 0.0, 1.0), clamp(trY, 0.0, 1.0));
  vec2 br = vec2(clamp(brX, 0.0, 1.0), clamp(brY, 0.0, 1.0));
  vec2 bl = vec2(clamp(blX, 0.0, 1.0), clamp(blY, 0.0, 1.0));
  vec2 outUv = gl_FragCoord.xy / resolution.xy;
  vec2 pi = vec2(0.0);
  vec2 nextMask = vec2(0.0);
  vec2 tPts[${To}];
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
    float n = clamp(floor(maskCount + 0.5), 3.0, ${Ca}.0);
    for (int i = 0; i < ${Ca}; i++) {
      if (float(i) + 0.5 < n) {
        index = float(i);
        enc = texture2D(maskTex, vec2(${I_}, 0.5));
        pi = ${jc};
        enc = texture2D(maskTex, vec2(${nR}, 0.5));
        header = ${jc};
        nextIndex = clamp(floor(header.x * ${Ca}.0 + 0.5), 0.0, ${Ca-1}.0);
        index = nextIndex;
        enc = texture2D(maskTex, vec2(${I_}, 0.5));
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
    ${iR}
    ${Xc(0,1,4,3,"0.0","0.0")}
    ${Xc(1,2,5,4,"0.5","0.0")}
    ${Xc(3,4,7,6,"0.0","0.5")}
    ${Xc(4,5,8,7,"0.5","0.5")}
    if (bestScore > 0.05) {
      return vec4(0.0, 0.0, 0.0, 1.0);
    }
    u = clamp(bestOrigin.x + 0.5 * bestLocal.x, -0.05, 1.05);
    v = clamp(bestOrigin.y + 0.5 * bestLocal.y, -0.05, 1.05);
    srcUv = vec2(u, v);
    for (int step = 0; step < 6; step++) {
      ${B_}
      ferr = mapped2 - outUv;
      jdet = du.x * dv.y - du.y * dv.x;
      if (abs(jdet) > 1e-8) {
        u -= (ferr.x * dv.y - ferr.y * dv.x) / jdet;
        v -= (du.x * ferr.y - du.y * ferr.x) / jdet;
        u = clamp(u, -0.05, 1.05);
        v = clamp(v, -0.05, 1.05);
      }
    }
    ${B_}
    if (length(mapped2 - outUv) < 0.004 && u >= 0.0 && u <= 1.0 && v >= 0.0 && v <= 1.0) {
      srcUv = vec2(u, v);
    }
    ${Qn("tPts[0]","tPts[1]")}
    ${Qn("tPts[1]","tPts[2]")}
    ${Qn("tPts[2]","tPts[5]")}
    ${Qn("tPts[5]","tPts[8]")}
    ${Qn("tPts[8]","tPts[7]")}
    ${Qn("tPts[7]","tPts[6]")}
    ${Qn("tPts[6]","tPts[3]")}
    ${Qn("tPts[3]","tPts[0]")}
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
    ${Qn("tl","tr")}
    ${Qn("tr","br")}
    ${Qn("br","bl")}
    ${Qn("bl","tl")}
  }

  fade = smoothstep(0.0, 0.016, edgeDist);
  sample = texture2D(frameTex, clamp(srcUv, 0.001, 0.999));
  return mix(vec4(0.0, 0.0, 0.0, 1.0), sample, fade);
`;u();var N_=`
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
`;u();var G_=`
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec2 uv = gl_FragCoord.xy / max(resolution.xy, vec2(1.0));
  vec4 sliced = texture2D(sliceTex, clamp(uv, 0.001, 0.999));
  return mix(_c0, sliced, a);
`;u();var W_=`
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
`;u();var U_=`
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
`;function V_(e){let t=e.setFunction;if(!t)return;t({name:"customKaleid",type:"coord",inputs:[{type:"float",name:"nSides",default:4},{type:"float",name:"angle",default:0}],glsl:`
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
        `}),t({name:"glow",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"threshold",default:.48},{type:"float",name:"bloom",default:.55}],glsl:R_}),t({name:"glowHighlight",type:"color",inputs:[{type:"float",name:"threshold",default:.48},{type:"float",name:"bloom",default:.55}],glsl:k_}),t({name:"glowBloomAdd",type:"combine",inputs:[{type:"float",name:"amount",default:0}],glsl:P_}),t({name:"sharpenUnsharp",type:"combine",inputs:[{type:"float",name:"amount",default:0}],glsl:`
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
          overlay = mix(overlay, ${vi("kick")}, m0);
          mask = max(mask, m0);

          vec2 c1 = vec2(x0 + gap * 1.0, y0);
          float r1 = mix(minR, maxR, i1);
          float m1 = 1.0 - smoothstep(r1 - 0.0015, r1 + 0.0015, length(p - c1));
          overlay = mix(overlay, ${vi("low")}, m1);
          mask = max(mask, m1);

          vec2 c2 = vec2(x0 + gap * 2.0, y0);
          float r2 = mix(minR, maxR, i2);
          float m2 = 1.0 - smoothstep(r2 - 0.0015, r2 + 0.0015, length(p - c2));
          overlay = mix(overlay, ${vi("mid")}, m2);
          mask = max(mask, m2);

          vec2 c3 = vec2(x0 + gap * 3.0, y0);
          float r3 = mix(minR, maxR, i3);
          float m3 = 1.0 - smoothstep(r3 - 0.0015, r3 + 0.0015, length(p - c3));
          overlay = mix(overlay, ${vi("high")}, m3);
          mask = max(mask, m3);

          vec2 c4 = vec2(x0 + gap * 4.0, y0);
          float r4 = mix(minR, maxR, i4);
          float m4 = 1.0 - smoothstep(r4 - 0.0015, r4 + 0.0015, length(p - c4));
          overlay = mix(overlay, ${vi("beat")}, m4);
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
        `}),t({name:"outputCornerPinWarp",type:"color",inputs:D_,glsl:H_}),t({name:"vignetteGrade",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"radius",default:.78},{type:"float",name:"softness",default:.42},{type:"float",name:"blur",default:0}],glsl:xx}),t({name:"pulseGrade",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"bloom",default:.45}],glsl:`
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
        `}),t({name:"oscilloscopeOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"glow",default:.55}],glsl:Ev}),t({name:"neonGridOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"glow",default:.5}],glsl:Rv}),t({name:"textLayerOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"glow",default:.35}],glsl:Pv}),t({name:"oscilloscopeDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"frequency",default:8},{type:"float",name:"phase",default:0},{type:"float",name:"mode",default:0},{type:"float",name:"centerFocus",default:1}],glsl:`
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
        `}),t({name:"shakeDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"speed",default:1},{type:"float",name:"bounce",default:.55},{type:"float",name:"roll",default:.4},{type:"float",name:"zoom",default:.45}],glsl:N_}),t({name:"degaussDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"frequency",default:12},{type:"float",name:"speed",default:1.4}],glsl:Jv}),t({name:"vhsDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"tracking",default:.48},{type:"float",name:"speed",default:1}],glsl:e_}),t({name:"vhsColor",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"noise",default:.38},{type:"float",name:"lines",default:.52},{type:"float",name:"dropout",default:.28}],glsl:t_}),t({name:"lensDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"curvature",default:1}],glsl:`
          if (amount < 0.00001) return _st;
          vec2 uv = _st - vec2(0.5);
          float curve = max(0.15, curvature);
          float k = -amount * 0.55 * curve;
          uv *= 1.0 + k * dot(uv, uv);
          return uv + vec2(0.5);
        `}),t({name:"wetLensDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"density",default:18},{type:"float",name:"speed",default:.26},{type:"float",name:"refraction",default:.76},{type:"float",name:"gravity",default:.74}],glsl:qv}),t({name:"wetLensOverlay",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"density",default:18},{type:"float",name:"speed",default:.26},{type:"float",name:"highlights",default:.42},{type:"float",name:"gravity",default:.74}],glsl:Kv}),t({name:"pixelSortSmear",type:"color",inputs:[{type:"sampler2D",name:"videoTex",default:0},{type:"float",name:"amount",default:0},{type:"float",name:"threshold",default:.45},{type:"float",name:"reach",default:.4},{type:"float",name:"chaos",default:.7},{type:"float",name:"sortDir",default:0}],glsl:Zv}),t({name:"emberHeatDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"speed",default:.8},{type:"float",name:"density",default:22},{type:"float",name:"waves",default:.76}],glsl:m_}),t({name:"emberHeatOverlay",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"density",default:22},{type:"float",name:"speed",default:.8},{type:"float",name:"glow",default:.82},{type:"float",name:"waves",default:.76},{type:"float",name:"intensity",default:.78}],glsl:h_}),t({name:"emberHeatFlow",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"waves",default:.76}],glsl:g_}),t({name:"blurNoise",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"scale",default:12},{type:"float",name:"speed",default:.2}],glsl:n_}),t({name:"blurMirrorUv",type:"coord",inputs:[],glsl:r_}),t({name:"blurGaussian",type:"color",inputs:[{type:"sampler2D",name:"blurTex",default:0},{type:"float",name:"amount",default:0}],glsl:i_}),t({name:"normalMapDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"scale",default:12},{type:"float",name:"speed",default:.2},{type:"float",name:"refraction",default:.55},{type:"float",name:"detail",default:1}],glsl:cx}),t({name:"normalMapLight",type:"color",inputs:[{type:"sampler2D",name:"videoTex",default:0},{type:"float",name:"amount",default:0},{type:"float",name:"mapSource",default:0},{type:"float",name:"scale",default:12},{type:"float",name:"speed",default:.2},{type:"float",name:"lightMix",default:.45},{type:"float",name:"specular",default:.4},{type:"float",name:"lightX",default:.65},{type:"float",name:"lightY",default:.35},{type:"float",name:"detail",default:1.05}],glsl:ux}),t({name:"reactionDiffSim",type:"src",inputs:[{type:"sampler2D",name:"stateTex",default:0},{type:"sampler2D",name:"videoTex",default:0},{type:"float",name:"feed",default:.55},{type:"float",name:"kill",default:.57},{type:"float",name:"scale",default:12},{type:"float",name:"speed",default:.35},{type:"float",name:"styleMap",default:.35},{type:"float",name:"videoDrive",default:.72},{type:"float",name:"flow",default:.28},{type:"float",name:"emboss",default:.55},{type:"float",name:"forceSeed",default:0}],glsl:u_}),t({name:"reactionDiffusionOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0}],glsl:f_}),t({name:"lumaDustOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0}],glsl:p_}),t({name:"lumaLockOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"glow",default:.45}],glsl:d_}),t({name:"concentricRotateDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"mode",default:0},{type:"float",name:"rings",default:7},{type:"float",name:"ringStep",default:.08},{type:"float",name:"speed",default:.25},{type:"float",name:"centerX",default:.5},{type:"float",name:"centerY",default:.5}],glsl:`
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
        `}),t({name:"randomGalleryDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"cells",default:7},{type:"float",name:"speed",default:.72},{type:"float",name:"refraction",default:.78},{type:"float",name:"drift",default:.78}],glsl:s_}),t({name:"gridShuffleDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"cells",default:4},{type:"float",name:"chaos",default:1},{type:"float",name:"seed",default:1}],glsl:l_}),t({name:"rippleDistort",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"frequency",default:8},{type:"float",name:"speed",default:1},{type:"float",name:"decay",default:.5},{type:"float",name:"centerX",default:.5},{type:"float",name:"centerY",default:.5}],glsl:`
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
        `}),t({name:"shatterLayerCoord",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"density",default:14},{type:"float",name:"scatter",default:.62},{type:"float",name:"irregularity",default:.82}],glsl:b_}),t({name:"shatterLayerGap",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"density",default:14},{type:"float",name:"gap",default:.065},{type:"float",name:"irregularity",default:.82}],glsl:y_}),t({name:"videoMapMask",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"invert",default:0},{type:"float",name:"threshold",default:.35},{type:"float",name:"softness",default:.12}],glsl:qs}),t({name:"layerOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0}],glsl:O_}),t({name:"layerMaskCut",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"invert",default:0},{type:"float",name:"threshold",default:.35},{type:"float",name:"softness",default:.12}],glsl:qs}),t({name:"layerMaskAlpha",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"invert",default:0},{type:"float",name:"threshold",default:.35},{type:"float",name:"softness",default:.12}],glsl:F_}),t({name:"maskVideoRectCutout",type:"combine",inputs:[{type:"float",name:"centerX",default:.5},{type:"float",name:"centerY",default:.5},{type:"float",name:"halfWx",default:.1},{type:"float",name:"halfHy",default:.08}],glsl:`
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
        `}),t({name:"fillLayerSrc",type:"src",inputs:[{type:"float",name:"ar",default:.49},{type:"float",name:"ag",default:.23},{type:"float",name:"ab",default:.93},{type:"float",name:"br",default:.02},{type:"float",name:"bg",default:.71},{type:"float",name:"bb",default:.83},{type:"float",name:"gradType",default:1},{type:"float",name:"softness",default:.35},{type:"float",name:"sweep",default:0}],glsl:Dv}),t({name:"mirrorStripesSrc",type:"src",inputs:[{type:"float",name:"cr",default:1},{type:"float",name:"cg",default:.1},{type:"float",name:"cb",default:.1},{type:"float",name:"scale",default:.82},{type:"float",name:"spread",default:.48},{type:"float",name:"density",default:.55},{type:"float",name:"thickness",default:.55},{type:"float",name:"layers",default:4},{type:"float",name:"rotate",default:0},{type:"float",name:"randomness",default:0},{type:"float",name:"mirror",default:1}],glsl:c_}),t({name:"plasmaSrc",type:"src",inputs:[{type:"float",name:"speed",default:1},{type:"float",name:"scale",default:1},{type:"float",name:"complexity",default:1}],glsl:Hv});let r=[{type:"float",name:"variant",default:2},{type:"float",name:"scale",default:1},{type:"float",name:"speed",default:.4},{type:"float",name:"warp",default:0},{type:"float",name:"ar",default:.04},{type:"float",name:"ag",default:.06},{type:"float",name:"ab",default:.13},{type:"float",name:"br",default:.13},{type:"float",name:"bg",default:.83},{type:"float",name:"bb",default:.93}];t({name:"patternNoiseSrc",type:"src",inputs:[...r],glsl:Wy}),t({name:"patternCellsSrc",type:"src",inputs:[...r],glsl:Uy}),t({name:"patternTilesSrc",type:"src",inputs:[...r],glsl:Vy}),t({name:"patternPolarSrc",type:"src",inputs:[...r],glsl:$y}),t({name:"patternGeometrySrc",type:"src",inputs:[{type:"float",name:"geometry",default:0},...r.slice(1)],glsl:zy}),t({name:"patternTuringDisplay",type:"src",inputs:[...la],glsl:jy}),t({name:"patternRdSim",type:"src",inputs:[{type:"sampler2D",name:"stateTex",default:0},{type:"float",name:"feed",default:.052},{type:"float",name:"kill",default:.0634},{type:"float",name:"cells",default:140},{type:"float",name:"styleMap",default:0},{type:"float",name:"speed",default:1},{type:"float",name:"seedSize",default:.18},{type:"float",name:"forceSeed",default:0}],glsl:Yy}),t({name:"electricNoiseSrc",type:"src",inputs:[{type:"sampler2D",name:"noiseTex",default:0},{type:"float",name:"speed",default:1},{type:"float",name:"scale",default:1},{type:"float",name:"noiseScale",default:1},{type:"float",name:"turbulence",default:.2},{type:"float",name:"detail",default:5},{type:"float",name:"intensity",default:1.4},{type:"float",name:"rings",default:.85},{type:"float",name:"ringPower",default:.9},{type:"float",name:"triggerRings",default:1},{type:"sampler2D",name:"triggerTex",default:0},{type:"float",name:"triggerRingCount",default:0},{type:"float",name:"colorR",default:.2},{type:"float",name:"colorG",default:.1},{type:"float",name:"colorB",default:.4}],glsl:Zy}),t({name:"plexusSrc",type:"src",inputs:[{type:"float",name:"speed",default:1},{type:"float",name:"pointDensity",default:1.5},{type:"float",name:"lineIntensity",default:1},{type:"float",name:"layers",default:4},{type:"float",name:"glow",default:1.2},{type:"float",name:"audioBoost",default:0}],glsl:ox}),t({name:"superformulaSrc",type:"src",inputs:[{type:"float",name:"look",default:2},{type:"float",name:"m",default:7.6},{type:"float",name:"n1",default:.36},{type:"float",name:"n2",default:2.16},{type:"float",name:"size",default:.48},{type:"float",name:"speed",default:.35},{type:"float",name:"glow",default:1.2},{type:"float",name:"cr",default:.769},{type:"float",name:"cg",default:.71},{type:"float",name:"cb",default:.992}],glsl:Uv}),t({name:"topoContourSrc",type:"src",inputs:[{type:"sampler2D",name:"videoTex",default:0},{type:"float",name:"scale",default:1},{type:"float",name:"lines",default:10},{type:"float",name:"speed",default:1},{type:"float",name:"valley",default:.12},{type:"float",name:"lineWidth",default:1},{type:"float",name:"videoTint",default:.35},{type:"float",name:"palette",default:0}],glsl:Nv}),t({name:"universeWithinSrc",type:"src",inputs:[{type:"float",name:"speed",default:1},{type:"float",name:"zoomFactor",default:1.5},{type:"float",name:"layers",default:4},{type:"float",name:"glow",default:1.2},{type:"float",name:"audioBoost",default:0}],glsl:Wv}),t({name:"fractalFoldSrc",type:"src",inputs:[{type:"float",name:"foldX",default:.86},{type:"float",name:"foldY",default:1.04},{type:"float",name:"zoomFactor",default:1},{type:"float",name:"speed",default:.6},{type:"float",name:"spin",default:.42},{type:"float",name:"iterDepth",default:8},{type:"float",name:"glow",default:1.4},{type:"float",name:"hueShift",default:.12},{type:"float",name:"audioBoost",default:0}],glsl:ax}),t({name:"rampGradient",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"stopCount",default:3},{type:"float",name:"r0",default:0},{type:"float",name:"g0",default:0},{type:"float",name:"b0",default:0},{type:"float",name:"p0",default:0},{type:"float",name:"r1",default:.5},{type:"float",name:"g1",default:.5},{type:"float",name:"b1",default:.5},{type:"float",name:"p1",default:.5},{type:"float",name:"r2",default:1},{type:"float",name:"g2",default:1},{type:"float",name:"b2",default:1},{type:"float",name:"p2",default:1},{type:"float",name:"r3",default:.55},{type:"float",name:"g3",default:.55},{type:"float",name:"b3",default:.55},{type:"float",name:"p3",default:.7},{type:"float",name:"r4",default:.55},{type:"float",name:"g4",default:.55},{type:"float",name:"b4",default:.55},{type:"float",name:"p4",default:.82},{type:"float",name:"r5",default:.55},{type:"float",name:"g5",default:.55},{type:"float",name:"b5",default:.55},{type:"float",name:"p5",default:.94},{type:"float",name:"animate",default:0},{type:"float",name:"speed",default:.45}],glsl:W_}),t({name:"answerPrint",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"stock",default:0},{type:"float",name:"density",default:1}],glsl:U_}),t({name:"hdrGrade",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"blackFloor",default:.08},{type:"float",name:"highlights",default:.85},{type:"float",name:"knee",default:.5}],glsl:`
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
        `}),t({name:"lumaPrint",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"mode",default:2},{type:"float",name:"density",default:24},{type:"float",name:"contrast",default:.48},{type:"float",name:"wave",default:.35},{type:"float",name:"iconSet",default:0},{type:"float",name:"shape",default:0},{type:"float",name:"rotation",default:0}],glsl:Bv}),t({name:"lumaGridSquares",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"cols",default:32},{type:"float",name:"rows",default:16},{type:"float",name:"minSize",default:.14},{type:"float",name:"maxSize",default:.88}],glsl:`
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
        `}),t({name:"pointCloudRemap",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"cols",default:32},{type:"float",name:"rows",default:20},{type:"float",name:"minSize",default:.12},{type:"float",name:"maxSize",default:.85},{type:"float",name:"depth",default:.58},{type:"float",name:"parallax",default:.78},{type:"float",name:"blur",default:.5},{type:"float",name:"fog",default:.4}],glsl:Ov}),t({name:"concentricMask",type:"src",inputs:[{type:"float",name:"freq",default:10},{type:"float",name:"speed",default:.1},{type:"float",name:"rotation",default:0},{type:"float",name:"balance",default:.5}],glsl:`
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
        `}),t({name:"liquix",type:"coord",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"pivot",default:.48},{type:"float",name:"bands",default:56},{type:"float",name:"speed",default:1.15}],glsl:Vv}),t({name:"metalSphereScene",type:"color",inputs:[{type:"sampler2D",name:"tex",default:0},{type:"float",name:"amount",default:0},{type:"float",name:"sphereSize",default:1},{type:"float",name:"noiseAmt",default:.42},{type:"float",name:"detail",default:3.5},{type:"float",name:"speed",default:.75},{type:"float",name:"roughness",default:.1},{type:"float",name:"reflectAmt",default:1.05},{type:"float",name:"rotation",default:.35},{type:"float",name:"envAspect",default:1.777}],glsl:Cv}),t({name:"warpTunnelColor",type:"color",inputs:[{type:"sampler2D",name:"videoTex",default:0},{type:"float",name:"amount",default:0},{type:"float",name:"tunnelSpeed",default:.55},{type:"float",name:"tunnelRefract",default:.72},{type:"float",name:"tunnelShine",default:.68},{type:"float",name:"tunnelArms",default:3},{type:"float",name:"tunnelFog",default:.62},{type:"float",name:"audioBoost",default:0},{type:"float",name:"tunnelQuality",default:0}],glsl:Gv}),t({name:"pulseMarchColor",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"morph",default:.55},{type:"float",name:"marchSpeed",default:1.1},{type:"float",name:"detail",default:4.5},{type:"float",name:"glow",default:.65}],glsl:Fv}),t({name:"throughTheStarsOverlay",type:"combine",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"glow",default:.74}],glsl:kv}),t({name:"feedbackGrade",type:"color",inputs:[{type:"float",name:"balance",default:.5},{type:"float",name:"luminosity",default:0}],glsl:x_}),t({name:"ghostFlow",type:"color",inputs:[{type:"sampler2D",name:"prevTex",default:NaN},{type:"float",name:"amount",default:0},{type:"float",name:"melt",default:.62},{type:"float",name:"flowScale",default:.48},{type:"float",name:"refresh",default:0},{type:"float",name:"chromaBleed",default:.35}],glsl:v_}),t({name:"paletteRecolor",type:"color",inputs:[{type:"float",name:"amount",default:0},{type:"float",name:"mode",default:0},{type:"float",name:"count",default:3},{type:"float",name:"p0r",default:0},{type:"float",name:"p0g",default:0},{type:"float",name:"p0b",default:0},{type:"float",name:"p1r",default:.5},{type:"float",name:"p1g",default:.5},{type:"float",name:"p1b",default:.5},{type:"float",name:"p2r",default:1},{type:"float",name:"p2g",default:1},{type:"float",name:"p2b",default:1},{type:"float",name:"p3r",default:1},{type:"float",name:"p3g",default:1},{type:"float",name:"p3b",default:1}],glsl:w_}),t({name:"shapeLayerSrc",type:"src",inputs:[{type:"float",name:"shape",default:0},{type:"float",name:"size",default:.45},{type:"float",name:"roundness",default:0},{type:"float",name:"stroke",default:.15},{type:"float",name:"rotate",default:0},{type:"float",name:"centerX",default:.5},{type:"float",name:"centerY",default:.5},{type:"float",name:"cr",default:1},{type:"float",name:"cg",default:1},{type:"float",name:"cb",default:1},{type:"float",name:"opacity",default:1},{type:"float",name:"shapeFill",default:0}],glsl:M_}),t({name:"stringLayer",type:"color",inputs:[{type:"float",name:"amount",default:1},{type:"float",name:"tension",default:.42},{type:"float",name:"position",default:.5},{type:"float",name:"orientation",default:0},{type:"float",name:"thickness",default:.42},{type:"float",name:"glow",default:.68},{type:"float",name:"harmonics",default:2},{type:"float",name:"cr",default:.965},{type:"float",name:"cg",default:.929},{type:"float",name:"cb",default:.831}],glsl:L_}),t({name:"resynthWarp",type:"coord",inputs:[{type:"float",name:"x",default:.5},{type:"float",name:"y",default:.78}],glsl:S_}),t({name:"resynthTint",type:"color",inputs:[{type:"float",name:"x",default:.5},{type:"float",name:"y",default:.78},{type:"float",name:"hue",default:.25},{type:"float",name:"decay",default:.3}],glsl:T_}),t({name:"timeGlitchSlices",type:"color",inputs:[{type:"sampler2D",name:"sliceTex",default:0},{type:"float",name:"amount",default:0}],glsl:G_}),t({name:"hitStreakExtract",type:"color",inputs:[{type:"float",name:"threshold",default:.6},{type:"float",name:"thinness",default:.55}],glsl:A_}),t({name:"lens7cPrism",type:"color",inputs:[{type:"sampler2D",name:"prismTex",default:0},{type:"float",name:"amount",default:0},{type:"float",name:"throwLen",default:.12},{type:"float",name:"rotation",default:0},{type:"float",name:"threshold",default:.45},{type:"float",name:"haze",default:.5}],glsl:E_})}u();u();u();var sR=[255,60,180],lR=[80,220,255],cR=[255,255,255];function Td(e,t,r,n){return Number.isFinite(e)?Math.max(t,Math.min(r,e)):n}function qc(e){let t=Number(e);return Number.isFinite(t)?t>1?Td(t/24,.005,.35,.08):Td(t,.005,.35,.08):.08}function un(e,t){if(typeof e!="string"||!/^#[0-9a-fA-F]{6}$/.test(e))return t;let r=Number.parseInt(e.slice(1),16);return Number.isFinite(r)?[r>>16&255,r>>8&255,r&255]:t}function Md(e){return{horizontal:un(e?.horizontalColor,sR),vertical:un(e?.verticalColor,lR),cross:un(e?.crossColor,cR)}}function Kc(e){return{decay:Number(e?.decay??1.25),thickness:qc(e?.thickness),intersect:Td(Number(e?.intersect??e?.defocus),0,3,1.6)}}function z_(){let e=document.createElement("canvas");e.width=320,e.height=180;let t=e.getContext("2d",{willReadFrequently:!0});if(!t)throw new Error("2d canvas unavailable");return{canvas:e,ctx:t,lines:[],lastUploadMs:0}}function uR(e,t){let r=Number.isFinite(t)&&t>.05?t:1.7777777777777777,n=512,o=Math.round(n/r);o>512&&(o=512,n=Math.round(o*r)),n=Math.max(160,n),o=Math.max(90,o),(e.canvas.width!==n||e.canvas.height!==o)&&(e.canvas.width=n,e.canvas.height=o)}function fR(e,t){let r=Math.max(0,e),n=Math.max(0,t),o=r+n;return o<=0?Math.random()<.5?"h":"v":Math.random()<r/o?"h":"v"}function Bi(e,t){let r=Math.max(0,Math.min(16,Math.round(t.spawn)));if(r<=0)return;let n=Math.max(0,t.horizontal),o=Math.max(0,t.vertical),i=qc(t.thickness);for(let s=0;s<r;s++){e.lines.length>=96&&e.lines.shift();let l=fR(n,o);e.lines.push({axis:l,pos:.04+Math.random()*.92,life:1,width:i*(.65+Math.random()*.7)})}e.lastUploadMs=0}function Ks(e){return{spawn:Number(e?.spawn??4),horizontal:Number(e?.horizontal??1),vertical:Number(e?.vertical??1),thickness:qc(e?.thickness)}}function X_(e,t,r){let n=Math.max(.5,r)*Math.max(0,t),o=[];for(let i=0;i<e.lines.length;i++){let s=e.lines[i],l=s.life-n;l>.008&&o.push({...s,life:l})}e.lines=o}function Yc([e,t,r],n){return`rgba(${e},${t},${r},${n})`}function pR(e,t){let n=Math.round(e[0]*.65+89.25),o=Math.round(e[1]*(1-.35)+255*.35),i=Math.round(e[2]*(1-.35)+255*.35);return`rgba(${n},${o},${i},${t})`}function dR(e){let t=Math.pow(Math.max(.004,e)/.08,.55);return[{scale:.35+5.15*t,alpha:.08},{scale:.3+2.9*t,alpha:.14},{scale:.25+1.55*t,alpha:.28},{scale:.2+.8*t,alpha:.72},{scale:.15+.2*t,alpha:.95}]}function $_(e,t,r,n,o,i,s,l){let p=i*Math.min(n,o),d=dR(i);e.lineCap="round";for(let v=0;v<d.length;v++){let H=d[v];if(e.strokeStyle=v===d.length-1?pR(l,H.alpha*s):Yc(l,H.alpha*s),e.lineWidth=Math.max(.25,p*H.scale),e.beginPath(),t==="h"){let D=r*o;e.moveTo(0,D),e.lineTo(n,D)}else{let D=r*n;e.moveTo(D,0),e.lineTo(D,o)}e.stroke()}}function mR(e,t,r,n,o,i){let s=Math.max(0,n);if(s<.04)return;e.save(),e.globalCompositeOperation="lighter",e.lineCap="round";let l=[{r:o*2.8,alpha:.12},{r:o*1.6,alpha:.22},{r:o*.75,alpha:.55}];for(let p=0;p<l.length;p++){let d=l[p];e.fillStyle=Yc(i,d.alpha*s),e.beginPath(),e.arc(t,r,d.r,0,Math.PI*2),e.fill()}e.strokeStyle=Yc(i,.85*s),e.lineWidth=Math.max(1,o*.35),e.beginPath(),e.moveTo(t-o*3.2,r),e.lineTo(t+o*3.2,r),e.moveTo(t,r-o*3.2),e.lineTo(t,r+o*3.2),e.stroke(),e.fillStyle=Yc(i,s),e.beginPath(),e.arc(t,r,o*.28,0,Math.PI*2),e.fill(),e.restore()}function hR(e,t,r){uR(e,r);let{ctx:n,canvas:o,lines:i}=e,s=o.width,l=o.height;if(n.setTransform(1,0,0,1,0,0),n.globalCompositeOperation="source-over",n.fillStyle="rgba(0,0,0,1)",n.fillRect(0,0,s,l),i.length===0)return;let p=qc(t.thickness),d=Math.max(0,Math.min(3,t.intersect)),{horizontal:v,vertical:H,cross:D}=t.colors;n.globalCompositeOperation="lighter";let O=i.filter(Y=>Y.axis==="h"),K=i.filter(Y=>Y.axis==="v");for(let Y=0;Y<O.length;Y++){let fe=O[Y];$_(n,"h",fe.pos,s,l,fe.width||p,fe.life,v)}for(let Y=0;Y<K.length;Y++){let fe=K[Y];$_(n,"v",fe.pos,s,l,fe.width||p,fe.life,H)}if(d>.01&&O.length>0&&K.length>0){let Y=Math.min(s,l)*p*.55;for(let fe=0;fe<O.length;fe++){let Ee=O[fe],be=Ee.pos*l;for(let Fe=0;Fe<K.length;Fe++){let Qe=K[Fe],Ze=Qe.pos*s,dt=Math.min(1,Ee.life*Qe.life*d);mR(n,Ze,be,dt,Y,D)}}}}function Ld(e,t,r,n,o,i=12){if(!e?.tex||!t)return!1;let s=t.lines.length>0?0:i;if(t.lastUploadMs>0&&o-t.lastUploadMs<s)return!1;hR(t,r,n);let l=e.tex;typeof l.resize=="function"&&(l.width!==t.canvas.width||l.height!==t.canvas.height)&&l.resize(t.canvas.width,t.canvas.height);try{l.subimage(t.canvas)}catch{return!1}return t.lastUploadMs=o,!0}var j_=1920,Y_=540,gR=512,Qc=[28,60,255],Zc=[255,154,26],Jc=[255,246,200];function K_(){let e=document.createElement("canvas");e.width=j_,e.height=Y_;let t=e.getContext("2d",{alpha:!0});if(!t)throw new Error("2d canvas unavailable");t.imageSmoothingEnabled=!0;let r=document.createElement("canvas");r.width=j_,r.height=Y_;let n=r.getContext("2d",{alpha:!0});if(!n)throw new Error("2d scratch canvas unavailable");return n.imageSmoothingEnabled=!0,{canvas:e,ctx:t,scratch:r,scratchCtx:n,bins:new Float32Array(gR),lastUploadMs:0}}function Q_(e,t,r,n=.42){let o=Math.max(0,Math.min(1,r)),i=e[t];e[t]=i+(o-i)*n}function q_(e,t,r){return[Math.round(e[0]+(t[0]-e[0])*r),Math.round(e[1]+(t[1]-e[1])*r),Math.round(e[2]+(t[2]-e[2])*r)]}function bR(e,t=Qc,r=Zc,n=Jc){let o=Math.max(0,Math.min(1,e));return o<=.5?q_(t,r,o*2):q_(r,n,(o-.5)*2)}function Z_(e){return{colorLo:un(e?.colorLo,Qc),colorMid:un(e?.colorMid,Zc),colorHi:un(e?.colorHi,Jc)}}function J_(e,t,r,n){if(!t.length||!Number.isFinite(r)||r<=0)return;let o=Math.max(0,Math.min(r,n)),i=Math.floor(o/r*t.length),s=t[Math.max(0,Math.min(t.length-1,i))]??.5,l=e.bins,p=l.length,d=n*2.4;for(let v=0;v<p;v++){let H=v/Math.max(1,p-1),D=Math.exp(-Math.pow((H-.12)/.09,2))*.85+Math.exp(-Math.pow((H-.35)/.14,2))*.55+Math.exp(-Math.pow((H-.62)/.18,2))*.35+Math.exp(-Math.pow((H-.85)/.12,2))*.22,O=.85+.15*Math.sin(d+H*9);Q_(l,v,s*D*O*1.15,.35)}}function e1(e,t,r){let n=t.kick??0,o=t.low??0,i=t.mid??0,s=t.high??0,l=t.master??(o+i+s)/3,p=e.bins,d=p.length;for(let v=0;v<d;v++){let H=v/Math.max(1,d-1),D=Math.exp(-Math.pow((H-.06)/.05,2))*n,O=Math.exp(-Math.pow((H-.18)/.1,2))*o,K=Math.exp(-Math.pow((H-.45)/.16,2))*i,Y=Math.exp(-Math.pow((H-.78)/.14,2))*s,fe=l*.12*(.7+.3*Math.sin(r*6+H*14));Q_(p,v,Math.min(1,D*1.1+O+K+Y+fe),.4)}}function yR(e,t){let r=e.length;if(r===0)return 0;let n=Math.max(0,Math.min(r-1,t)),o=Math.floor(n),i=Math.min(r-1,o+1),s=n-o,l=s*s*(3-2*s);return e[o]+(e[i]-e[o])*l}function wd(e,t,r,n,o,i,s,l,p,d=1){e.lineWidth=i,e.lineCap="round",e.lineJoin="round";let v=o>1400?2:1,H=Math.max(0,Math.min(1,d));for(let D=0;D<o-v;D+=v){let O=(n[D]+n[D+v])*.5,[K,Y,fe]=bR(O,s,l,p);e.strokeStyle=`rgba(${K},${Y},${fe},${H})`,e.beginPath(),e.moveTo(t[D],r[D]),e.lineTo(t[D+v],r[D+v]),e.stroke()}}function xR(e,t,r,n,o,i,s,l,p){let d=t.length,v=new Float32Array(r),H=new Float32Array(r),D=new Float32Array(r),O=Math.max(1,r-1),K=i===2?1:i===1?.7:.22;for(let Y=0;Y<r;Y++){let fe=Y/O*(d-1),Ee=Math.max(0,Math.min(1,yR(t,fe)));D[Y]=Ee,v[Y]=Y+.5,H[Y]=n-Ee*o*K}if(e.globalCompositeOperation="source-over",i>=1){let[Y,fe,Ee]=p;e.beginPath(),e.moveTo(0,n);for(let Fe=0;Fe<r;Fe++)e.lineTo(v[Fe],H[Fe]);e.lineTo(r,n),e.closePath();let be=e.createLinearGradient(0,n-o,0,n);be.addColorStop(0,`rgba(${Y},${fe},${Ee},0.12)`),be.addColorStop(.7,`rgba(${Y},${fe},${Ee},0.04)`),be.addColorStop(1,`rgba(${Y},${fe},${Ee},0)`),e.fillStyle=be,e.globalAlpha=1,e.fill()}if(wd(e,v,H,D,r,Math.max(2.2,Math.min(4,o*.04)),s,l,p,.45),wd(e,v,H,D,r,Math.max(1,Math.min(1.8,o*.016)),s,l,p,1),i===2){let Y=new Float32Array(r);for(let fe=0;fe<r;fe++)Y[fe]=n+(n-H[fe]);wd(e,v,Y,D,r,Math.max(.9,o*.014),s,l,p,.55)}e.globalAlpha=1,e.globalCompositeOperation="source-over"}function Ad(e,t){let{ctx:r,canvas:n,scratch:o,scratchCtx:i,bins:s}=e,l=n.width,p=n.height,d=Math.max(.15,Math.min(.97,t.persistence)),v=Math.round(t.mode),H=typeof t.colorLo=="string"?un(t.colorLo,Qc):t.colorLo??Qc,D=typeof t.colorMid=="string"?un(t.colorMid,Zc):t.colorMid??Zc,O=typeof t.colorHi=="string"?un(t.colorHi,Jc):t.colorHi??Jc,K=p*Math.max(.55,Math.min(.96,t.positionY)),Y=p*Math.max(.2,Math.min(.55,t.scale*.85)),fe=Math.max(7,Math.round(p*(.016+(1-d)*.014)));r.setTransform(1,0,0,1,0,0),i.setTransform(1,0,0,1,0,0),i.globalCompositeOperation="copy",i.drawImage(n,0,0),i.globalCompositeOperation="source-over",r.globalCompositeOperation="source-over",r.globalAlpha=1,r.fillStyle="#000",r.fillRect(0,0,l,p);let Ee=.82+d*.16;r.globalAlpha=Ee,r.drawImage(o,0,-fe),r.globalAlpha=1;let be=Math.max(16,p*.12),Fe=r.createLinearGradient(0,0,0,be);Fe.addColorStop(0,"rgba(0,0,0,0.35)"),Fe.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=Fe,r.fillRect(0,0,l,be),xR(r,s,l,K,Y,v,H,D,O)}function t1(e,t,r,n,o=12){if(!e?.tex||!t||t.lastUploadMs>0&&n-t.lastUploadMs<o)return!1;Ad(t,r);let i=e.tex;typeof i.resize=="function"&&(i.width!==t.canvas.width||i.height!==t.canvas.height)&&i.resize(t.canvas.width,t.canvas.height);try{i.subimage(t.canvas)}catch{return!1}return t.lastUploadMs=n,!0}u();var vR=960,_R=540,r1=['system-ui, -apple-system, "Segoe UI", sans-serif','ui-monospace, "SF Mono", "Cascadia Code", monospace','Impact, "Arial Narrow", Haettenschweiler, sans-serif','Georgia, "Times New Roman", serif','"Segoe UI Variable", "Segoe UI", "Trebuchet MS", sans-serif'];function n1(){return{animStartMs:0,lastMessage:"",lastAnim:-1,glitchPhase:0}}function o1(){let e=document.createElement("canvas");e.width=vR,e.height=_R;let t=e.getContext("2d",{willReadFrequently:!0});if(!t)throw new Error("2d canvas unavailable");return{canvas:e,ctx:t,lastUploadMs:0}}function SR(e){let t=Math.max(0,Math.min(1,e));return 1-Math.pow(1-t,3)}function TR(e){let t=Math.max(.15,e.animSpeed),r=Math.round(e.anim);if(r===0||r===4)return 1;let n=r===3?2200/t:900/t;return SR((e.nowMs-e.animStartMs)/n)}function MR(e){let t=Math.max(.15,e.animSpeed),r=e.nowMs*.001*t*3.2;return .72+.28*Math.sin(r)}function LR(e,t){let r=Math.max(.15,e.animSpeed),n=Math.sin(e.nowMs*.017*r+t*4.7+e.animStartMs*.003);return n>.55?(n-.55)*48:0}function wR(e){let t=Math.max(.15,e.animSpeed),r=Math.sin(e.nowMs*.031*t+e.animStartMs*.01);return r>.2?1:.35+.25*Math.max(0,r)}function Cd([e,t,r],n){return`rgba(${e},${t},${r},${Math.max(0,Math.min(1,n))})`}function a1(e){let t=e?.message;return{message:typeof t=="string"&&t.trim()?t:"YOUR MESSAGE",size:Number(e?.size??.085),positionX:Number(e?.positionX??.5),positionY:Number(e?.positionY??.82),align:Math.round(Number(e?.align??1)),font:Math.round(Number(e?.font??0)),weight:Math.round(Number(e?.weight??1)),tracking:Number(e?.tracking??.02),color:un(e?.color,[255,255,255]),glow:Number(e?.glow??.35),shadow:Number(e?.shadow??.5),anim:Math.round(Number(e?.anim??0)),animSpeed:Number(e?.animSpeed??.85)}}function eu(e,t){return{...a1(e?.params),size:Zt("textLayer",e,"size",.085,t),positionX:Zt("textLayer",e,"positionX",.5,t),positionY:Zt("textLayer",e,"positionY",.82,t),tracking:Zt("textLayer",e,"tracking",.02,t),glow:Zt("textLayer",e,"glow",.35,t),shadow:Zt("textLayer",e,"shadow",.5,t),animSpeed:Zt("textLayer",e,"animSpeed",.85,t)}}function AR(e,t){let r=Math.max(0,Math.min(1,t.amount));if(r<.004)return;let{ctx:n,canvas:o}=e,i=o.width,s=o.height;n.setTransform(1,0,0,1,0,0),n.clearRect(0,0,i,s);let l=a1({message:t.message,size:t.size,positionX:t.positionX,positionY:t.positionY,align:t.align,font:t.font,weight:t.weight,tracking:t.tracking,color:`rgb(${t.color.join(",")})`,glow:t.glow,shadow:t.shadow,anim:t.anim,animSpeed:t.animSpeed}),p=l.anim,d=TR({...t,...l}),v=r,H=0,D=1,O=l.message;if(p===1)v*=d;else if(p===2)v*=d,H=(1-d)*s*.06;else if(p===3){let mt=Math.floor(d*l.message.length);O=l.message.slice(0,Math.max(0,mt)),v*=Math.max(.35,d)}else p===4?(D=MR({...t,...l}),v*=.85+.15*D):p===5&&(v*=wR({...t,...l}));if(v<.01||!O.trim())return;let K=Math.max(0,Math.min(r1.length-1,l.font)),Y=Math.max(14,Math.min(s*.28,l.size*s)),fe=l.weight>=1?"700":"500";n.font=`${fe} ${Y}px ${r1[K]}`,n.textBaseline="middle";let Ee=Math.max(0,Math.min(2,l.align)),be=["left","center","right"];n.textAlign=be[Ee];let Fe=O.split(`
`),Qe=Y*1.22,Ze=Qe*Fe.length,dt=l.positionX*i,kt=l.positionY*s-Ze*.5+Qe*.5+H,at=l.tracking*Y;"letterSpacing"in n&&(n.letterSpacing=`${at}px`);let rt=(mt,R,A,C)=>{let f=0;p===5&&(f=LR({...t,...l},C)),l.shadow>.02&&(n.save(),n.globalAlpha=v*l.shadow*.85,n.fillStyle="rgba(0,0,0,0.92)",n.shadowColor="rgba(0,0,0,0.75)",n.shadowBlur=Y*.12,n.shadowOffsetX=Y*.03,n.shadowOffsetY=Y*.04,n.fillText(mt,R+f,A),n.restore()),l.glow>.02&&(n.save(),n.globalAlpha=v*l.glow*.55,n.fillStyle=Cd(l.color,1),n.shadowColor=Cd(l.color,.95),n.shadowBlur=Y*(.18+l.glow*.42),n.fillText(mt,R+f,A),n.restore()),n.save(),n.globalAlpha=v,n.fillStyle=Cd(l.color,1),p===4?(n.translate(R+f,A),n.scale(D,D),n.fillText(mt,0,0)):n.fillText(mt,R+f,A),n.restore()};for(let mt=0;mt<Fe.length;mt++)rt(Fe[mt],dt,kt+mt*Qe,mt)}function tu(e,t,r,n,o=16){if(!e?.tex||!t||t.lastUploadMs>0&&n-t.lastUploadMs<o)return!1;AR(t,r);let i=e.tex;return typeof i.resize=="function"&&(i.width!==t.canvas.width||i.height!==t.canvas.height)&&i.resize(t.canvas.width,t.canvas.height),i.subimage(t.canvas),t.lastUploadMs=n,!0}u();function ru(){return{...n1(),prevEnvelope:0}}function i1(e){let{bundle:t,s3:r,bindState:n,fxCfg:o,bands:i,amount:s,now:l,envelope:p,binding:d,runtime:v,shouldBind:H}=e;if(!r?.tex||s<.004)return;let D=eu(o,i),O=D.message!==v.lastMessage,K=D.anim!==v.lastAnim,Y=p>.02&&v.prevEnvelope<=.02;O||K||v.animStartMs<=0?(v.animStartMs=l,v.lastMessage=D.message,v.lastAnim=D.anim):Xr(d)&&Y&&(v.animStartMs=l),v.prevEnvelope=p,H&&mn(r,t.canvas,"textLayer",n),tu(r,t,{message:D.message,size:D.size,positionX:D.positionX,positionY:D.positionY,align:D.align,font:D.font,weight:D.weight,tracking:D.tracking,color:D.color,glow:D.glow,shadow:D.shadow,anim:D.anim,animSpeed:D.animSpeed,amount:s,nowMs:l,animStartMs:v.animStartMs},l,12)}u();function Hn(e,t,r,n){return Number.isFinite(e)?Math.max(t,Math.min(r,e)):n}function Kr(e,t,r){return e+(t-e)*r}function s1(e,t,r){let n=Hn((r-e)/Math.max(1e-6,t-e),0,1,0);return n*n*(3-2*n)}function CR(e,t,r,n){let o=Number.isFinite(t)&&t>.05?t:1.7777777777777777,i,s;if(r!==void 0&&n!==void 0&&r>=160&&n>=90){i=Math.round(r),s=Math.round(n);let l=Math.max(i,s);if(l>4096){let p=4096/l;i=Math.max(160,Math.round(i*p)),s=Math.max(90,Math.round(s*p))}}else i=Math.min(4096,1920),s=Math.round(i/o),s>4096&&(s=4096,i=Math.round(s*o)),i=Math.max(160,i),s=Math.max(90,s);return(e.canvas.width!==i||e.canvas.height!==s)&&(e.canvas.width=i,e.buffer.width=i,e.canvas.height=s,e.buffer.height=s,e.lastUploadMs=0),{w:i,h:s}}function Ed(){return{u:.04+Math.random()*.92,v:.04+Math.random()*.92,z:Math.random()*Kr(.22,.48,Math.random()),brightness:.45+Math.random()*.55,size:.55+Math.random()*.65,px:-9999,py:-9999}}function l1(e){if(typeof e!="string"||!/^#[0-9a-fA-F]{6}$/.test(e))return[0,232,204];let t=Number.parseInt(e.slice(1),16);return Number.isFinite(t)?[t>>16&255,t>>8&255,t&255]:[0,232,204]}function c1(){let e=document.createElement("canvas"),t=document.createElement("canvas");e.width=320,e.height=180,t.width=320,t.height=180;let r=e.getContext("2d",{willReadFrequently:!0}),n=t.getContext("2d",{willReadFrequently:!0});if(!r||!n)throw new Error("2d canvas unavailable");return{canvas:e,ctx:r,buffer:t,bufferCtx:n,stars:[],lastUploadMs:0}}function u1(e){let t=Hn(e,12,220,56);return Math.max(8,Math.min(462,Math.round(t*2.1)))}function ER(e,t){let r=Hn(e,0,1.5,.48),n=Hn(t,0,1,.78);return Hn(r*Kr(.52,1.72,n),0,1.5,.48)}function RR(e,t){let r=u1(t),{stars:n}=e;if(n.length!==r){if(n.length<r){for(let o=n.length;o<r;o++)n.push(Ed());return}n.length=r}}function Rd(e,t,r){let n=u1(t),o=[];for(let l=0;l<n;l++)o.push(Ed());e.stars=o,e.lastUploadMs=0;let{w:i,h:s}={w:e.canvas.width,h:e.canvas.height};e.ctx.fillStyle="#000",e.ctx.fillRect(0,0,i,s),e.bufferCtx.fillStyle="#000",e.bufferCtx.fillRect(0,0,i,s)}function kR(e,t,r,n,o,i,s){let l=e.z,p=Kr(.2,.52,s),d=s1(0,p,l),v=1-s1(.86,1,l),H=d*v,D=e.u-t,O=e.v-r,K=1+l*l*Kr(.35,1.65,i),Y=(t+D*K)*n,fe=(r+O*K)*o,Ee=Kr(.18,.62,l)*Kr(.8,1.05,s);return{x:Y,y:fe,fade:H,pointScale:Ee}}function f1(e,t,r){let o=ER(t.trail,t.amount??.78)/1.5,i=Hn(t.speed,0,8,1),s=Hn(t.glow,0,1,.72),l=Hn(t.fov,.25,2,1),p=Hn(t.depth,0,1,.65),d=Hn(t.density,12,220,52),v=Hn(t.centerX,0,1,.5),H=Hn(t.centerY,0,1,.5),D=Math.max(.001,Math.min(.05,t.dt)),[O,K,Y]=t.tint;RR(e,d);let{w:fe,h:Ee}=CR(e,r,t.pixelWidth,t.pixelHeight),be=fe/512,Fe=v*fe,Qe=H*Ee,Ze=Hn(t.amount??.78,0,1,.78),dt=D*i*Kr(.2,.72,p)*Kr(.88,1.28,Ze),kt=1+(6e-4+i*.0042)*o*Kr(.45,2.6,p),at=o<.007?1:1-o*Kr(.018,.075,1-o*.45),rt=o<.007?0:o*Kr(.72,.99,s),{ctx:mt,bufferCtx:R,buffer:A,canvas:C}=e;R.setTransform(1,0,0,1,0,0),R.globalCompositeOperation="source-over",R.globalAlpha=1,R.fillStyle=`rgba(0,0,0,${at.toFixed(4)})`,R.fillRect(0,0,fe,Ee),o>.007&&rt>.01&&(R.save(),R.globalAlpha=rt,R.translate(Fe,Qe),R.scale(kt,kt),R.translate(-Fe,-Qe),R.drawImage(C,0,0,fe,Ee),R.restore());let f=o>.03,oe=Kr(.75,1,s),Te=Kr(.55,1.85,o)*Kr(.75,1.15,s)*Kr(1,1.35,i/8)*be,qe=.52;for(let Ve=0;Ve<e.stars.length;Ve++){let Ne=e.stars[Ve];Ne.z+=dt*Kr(.85,1.15,Ne.size),Ne.z>=1&&Object.assign(Ne,Ed());let{x:Xe,y:Je,fade:It,pointScale:et}=kR(Ne,v,H,fe,Ee,l,p),Ht=Ne.brightness*oe*It;if(Ht<.004)continue;f&&Ne.px>-9e3&&It>.08&&(R.strokeStyle=`rgba(${O},${K},${Y},${(Ht*Kr(.3,.88,o)*s).toFixed(3)})`,R.lineWidth=Te*Ne.size*et*qe,R.lineCap="round",R.beginPath(),R.moveTo(Ne.px,Ne.py),R.lineTo(Xe,Je),R.stroke());let bt=Kr(.22,.62,Ne.size)*et*Kr(.82,1.02,s)*be*qe;s>.08&&It>.08&&(R.fillStyle=`rgba(${O},${K},${Y},${(Ht*s*.62).toFixed(3)})`,R.beginPath(),R.arc(Xe,Je,bt*Kr(2.8,5.5,s),0,Math.PI*2),R.fill()),R.fillStyle=`rgba(255,255,255,${Ht.toFixed(3)})`,R.beginPath(),R.arc(Xe,Je,bt,0,Math.PI*2),R.fill(),Ne.px=Xe,Ne.py=Je}mt.setTransform(1,0,0,1,0,0),mt.globalCompositeOperation="source-over",mt.globalAlpha=1,mt.drawImage(A,0,0,fe,Ee),e.lastUploadMs=0}function kd(e,t,r,n,o,i=0){if(!e?.tex||o-t.lastUploadMs<i)return!1;f1(t,r,n);let s=e.tex;return(s.width!==t.canvas.width||s.height!==t.canvas.height)&&s.resize?.(t.canvas.width,t.canvas.height),s.subimage(t.canvas),t.lastUploadMs=o,!0}u();function p1(e,t,r){let n="throughTheStars";return{density:Zt(n,e,"density",56,t),speed:Zt(n,e,"speed",1.15,t),trail:Zt(n,e,"trail",.48,t),glow:Zt(n,e,"glow",.74,t),fov:Zt(n,e,"fov",1.05,t),depth:Zt(n,e,"depth",.65,t),centerX:Zt(n,e,"centerX",.5,t),centerY:Zt(n,e,"centerY",.5,t),tint:l1(e?.params?.tint),dt:r}}function d1(e){let{bundle:t,s3:r,bindState:n,fxCfg:o,bands:i,amount:s,dt:l,now:p,aspect:d,pixelWidth:v,pixelHeight:H,shouldBind:D=!0}=e;if(!r?.tex||s<=1e-5)return;D&&mn(r,t.canvas,"throughTheStars",n);let O={...p1(o,i,l),amount:s,pixelWidth:v,pixelHeight:H};kd(r,t,O,d,p,0)}function m1(e){let{bundle:t,s3:r,bindState:n,fxCfg:o,bands:i,amount:s,aspect:l,now:p,pixelWidth:d,pixelHeight:v}=e;return!r?.tex||s<=1e-5?!1:(mn(r,t.canvas,"throughTheStars",n),t.lastUploadMs=0,kd(r,t,{...p1(o,i,1/60),amount:s,pixelWidth:d,pixelHeight:v},l,p,0))}u();u();function h1(e,t){return .58+(1-On(e)*.22)*.4+On(t)*.32}function g1(e,t){if(t<=1e-4)return 1;let r=e/t;return r>=1?1:r<=0?0:r*r*(3-2*r)}function b1(e){return .22+On(e)*.78}function PR(e){let t=(e%1+1)%1*6,r=Math.floor(t),n=t-r,o=1-n;switch(r){case 0:return[1,n,0];case 1:return[o,1,0];case 2:return[0,1,n];case 3:return[0,o,1];case 4:return[n,0,1];default:return[1,0,o]}}function y1(e,t,r,n,o){let i=On(n);if(i<.008)return{r:e,g:t,b:r};let[s,l,p]=PR(o),d=i*.2,v=e*(1-d)+s*d,H=t*(1-d)+l*d,D=r*(1-d)+p*d,O=.299*e+.587*t+.114*r,K=.299*v+.587*H+.114*D;if(K<1e-5)return{r:v,g:H,b:D};let Y=O/K;return{r:Math.min(1,v*Y),g:Math.min(1,H*Y),b:Math.min(1,D*Y)}}function x1(e){return e>=.4?1:e<=0?0:e/.4}function Pd(e,t,r=.09){let n=Math.min(e,1-e),o=Math.min(t,1-t),i=Math.min(n,o);if(i>=r)return 1;if(i<=0)return 0;let s=i/r;return s*s*(3-2*s)}function v1(e){return .7+On(e)*.65}function _1(e,t,r){let n=.05+On(r)*.2;return!Number.isFinite(e)||e<0||Math.abs(e-t)>=n?!0:e<t*(.6+On(r)*.22)}function S1(e,t,r,n,o){let i=Math.max(0,Math.min(n-1,Math.floor(t*n))),s=Math.max(0,Math.min(o-1,Math.floor(r*o)));return e[s*n+i]??0}function T1(e,t,r,n,o){return o*.9+e*.16+t*.1+r*.08+n*14e-5}var nu=.08,FR=.82;function M1(e,t){return Math.hypot(e-.5,t-.5)}function L1(e,t,r,n){let o=(.18+On(r)*.24+On(n)*.16)*Math.max(0,t);return Math.min(FR,Math.max(nu,e)+o)}function w1(e,t,r,n=!1){if(!n&&t>r)return-1;let o=1-t/Math.max(r,1e-4);return Math.max(0,e)*(.42+o*.58)}var Qs=.86,OR=.8;function A1(e){return e>=Qs}function C1(e,t){return e>=Qs&&t<OR}function Fd(e,t,r){if(e<=0||r<=0)return 0;let n=Math.round(e*(3.2+On(t)*3.4));return Math.min(r,Math.max(e,n))}var IR=.16,BR=.9;function Di(e,t){let r=Math.max(0,Math.round(e)),n=Math.max(0,Math.round(t)),o=Math.max(80,Math.min(420,Math.round(r*IR))),i=Math.max(0,r-o),s=Math.min(n,i),l=Math.max(0,n-i);return{reserveHold:o,baseCap:i,baseFree:Math.max(0,i-s),reserveFree:Math.max(0,o-l)}}function E1(e,t){let r=Math.max(0,e);return Math.max(t*1.08,r*BR,.78)}function Od(e,t){return e>=t||e>=Qs}function R1(e,t,r,n,o,i){if(e<=0||i<=0)return 0;let s=On(r),l=On(o);if(t){let d=Math.round((28+l*110)*(.4+s*.75)*(.65+On(n)*.55));return Math.min(i,Math.max(8,d))}let p=Math.max(2,Math.round(e*.014*s*(.55+l*.7)));return Math.min(i,p)}function k1(e,t,r,n,o){if(e<=0)return 0;let i=Math.max(0,n)+Math.max(0,o);if(i<=0)return 0;let s=On(r),l=t?Math.max(10,Math.round(e*.2*(.5+s))):Math.max(3,Math.round(e*.07*(.45+s)));return Math.min(i,l)}function On(e){return Number.isFinite(e)?Math.max(0,Math.min(1,e)):0}var Zs=4096,DR=512,fn=128,Nn=72,HR=18e3,O1=.95,NR=.32,GR=.64,WR=5;function gr(e,t,r,n){return Number.isFinite(e)?Math.max(t,Math.min(r,e)):n}function UR(e){return gr(e,.4,1.8,1)}function I1(e){return .32+gr(e,0,1,.65)*1.28}function VR(e){return Math.round(2500+gr(e,0,1,.5)*13500)}function $R(e){return .4+gr(e,0,1,.55)*.6}function zR(e){return Math.round(16-gr(e,0,1,.55)*8)}function P1(e,t){let r=Math.sin(e*127.1+t*311.7)*43758.5453;return r-Math.floor(r)}function B1(e,t,r){let n=r*.001,o=0,i=0,s=.55,l=e*5.5+n*.31,p=t*5.5+n*.27;for(let d=0;d<4;d++)o+=(P1(l,p)-.5)*s,i+=(P1(l+17.3,p+11.1)-.5)*s,l*=2.1,p*=2.1,s*=.5;return[o,i]}function D1(e,t,r,n){let o=e-.5,i=t-.5,s=Math.hypot(o,i)+1e-4,l=o/s,p=i/s,d=-p,v=l,H=(e<.5?-1+e*2:(e-.5)*2)*(1-Math.abs(o)*1.6),D=(t<.5?-1+t*2:(t-.5)*2)*(1-Math.abs(i)*1.6),O=Math.sin(r*.0031+e*13.5+t*9.2+n)*.7+Math.cos(r*.0024-e*8.4+t*11.7+n*.61)*.3,K=.42+Math.min(s*1.8,.58);return[l*K+d*O*.92+H*.38,p*K+v*O*.92+D*.38]}function XR(e,t,r,n,o){let i=Number.isFinite(t)&&t>.05?t:1.7777777777777777,s=gr(r,.35,1,.55),l,p;if(n!==void 0&&o!==void 0&&n>=160&&o>=90){l=Math.round(n*s),p=Math.round(o*s);let d=Math.max(l,p);if(d>Zs){let v=Zs/d;l=Math.max(160,Math.round(l*v)),p=Math.max(90,Math.round(p*v))}}else l=Math.min(Zs,1920),p=Math.round(l/i),p>Zs&&(p=Zs,l=Math.round(p*i)),l=Math.max(160,l),p=Math.max(90,p);return(e.canvas.width!==l||e.canvas.height!==p)&&(e.canvas.width=l,e.buffer.width=l,e.canvas.height=p,e.buffer.height=p,e.lastUploadMs=0),{w:l,h:p}}function H1(){let e=document.createElement("canvas"),t=document.createElement("canvas"),r=document.createElement("canvas");e.width=320,e.height=180,t.width=320,t.height=180,r.width=fn,r.height=Nn;let n=e.getContext("2d",{willReadFrequently:!0}),o=t.getContext("2d",{willReadFrequently:!0}),i=r.getContext("2d",{willReadFrequently:!0});if(!n||!o||!i)throw new Error("2d canvas unavailable");return{canvas:e,ctx:n,buffer:t,bufferCtx:o,sampleCanvas:r,sampleCtx:i,lumaData:null,particles:[],lastUploadMs:0,turbPhase:0,burstPhase:0,lastSampleMs:0,spreadRadius:nu,prevLuma:null}}function el(e){e.particles.length=0,e.lumaData=null,e.lastUploadMs=0,e.turbPhase=0,e.burstPhase=0,e.lastSampleMs=0,e.spreadRadius=nu,e.prevLuma=null;let{w:t,h:r}={w:e.canvas.width,h:e.canvas.height};e.ctx.fillStyle="#000",e.ctx.fillRect(0,0,t,r),e.bufferCtx.fillStyle="#000",e.bufferCtx.fillRect(0,0,t,r)}function jR(e,t,r,n,o){if(!e.lumaData)o=!0;else if(!o||r-e.lastSampleMs<n)return!0;return!t||t.readyState<2||t.videoWidth<2?(e.lumaData=null,!1):(e.sampleCtx.drawImage(t,0,0,fn,Nn),e.lumaData=e.sampleCtx.getImageData(0,0,fn,Nn).data,e.lastSampleMs=r,!0)}function YR(e){let t=fn*Nn,r=new Float32Array(t),n=new Float32Array(t),o=new Float32Array(t),i=new Float32Array(t);for(let s=0;s<t;s++){let l=s*4,p=e[l]/255,d=e[l+1]/255,v=e[l+2]/255;r[s]=.299*p+.587*d+.114*v,n[s]=p,o[s]=d,i[s]=v}return{luma:r,cr:n,cg:o,cb:i}}function qR(e){let t=0;for(let r=0;r<e.length;r+=4){let n=(.299*e[r]+.587*e[r+1]+.114*e[r+2])/255;n>t&&(t=n)}return Math.max(NR,t*GR)}function KR(e,t){for(let o=0;o<e.particles.length;o++){let i=e.particles[o];if(!i.active)return i}let r=Math.min(HR,Math.max(1500,t));if(e.particles.length>=r)return null;let n={active:!1,attached:!0,u:0,v:0,vx:0,vy:0,life:0,maxLife:1,age:0,seed:0,lightU:0,lightV:0,castLuma:0,size:O1,r:1,g:1,b:1};return e.particles.push(n),n}function Js(e){let t=0;for(let r=0;r<e.particles.length;r++)e.particles[r].active&&t++;return t}function QR(e){let t=new Uint8Array(fn*Nn);for(let r=0;r<e.particles.length;r++){let n=e.particles[r];if(!n.active||!n.attached)continue;let o=Math.floor(n.v*Nn)*fn+Math.floor(n.u*fn);o>=0&&o<t.length&&(t[o]=Math.min(255,t[o]+1))}return t}function ZR(e,t,r,n,o,i=!1){let s=KR(e,o);s&&(s.active=!0,s.attached=!0,s.u=Math.max(.002,Math.min(.998,t.u+r)),s.v=Math.max(.002,Math.min(.998,t.v+n)),s.lightU=t.u,s.lightV=t.v,s.castLuma=t.luma,s.vx=0,s.vy=0,s.maxLife=12,s.life=s.maxLife,s.age=i?8:0,s.seed=Math.random(),s.size=O1*(i?1.02+Math.random()*.28:.84+Math.random()*.32),s.r=t.r,s.g=t.g,s.b=t.b)}function JR(e,t,r,n,o,i,s){let l=[];for(let p=0;p<Nn;p++)for(let d=0;d<fn;d++){let v=p*fn+d,H=e.luma[v];if(H<r)continue;let D=Od(H,i)?o:n;if(t[v]>=D)continue;let O=M1((d+.5)/fn,(p+.5)/Nn),K=w1(H,O,s,A1(H));K<0||l.push({px:d,py:p,idx:v,slots:D-t[v],score:K})}return l.sort((p,d)=>d.score-p.score),l}function e5(e,t,r,n){if(!t||t.length!==e.luma.length)return[];let o=[];for(let i=0;i<Nn;i++)for(let s=0;s<fn;s++){let l=i*fn+s;C1(e.luma[l],t[l])&&(r[l]>=n||o.push({px:s,py:i,idx:l,slots:n-r[l],score:e.luma[l]}))}return o.sort((i,s)=>s.score-i.score),o}function ou(e,t){(!e.prevLuma||e.prevLuma.length!==t.luma.length)&&(e.prevLuma=new Float32Array(t.luma.length)),e.prevLuma.set(t.luma)}function t5(e){let t=0;for(let r=0;r<e.luma.length;r++){let n=e.luma[r];n>t&&(t=n)}return t}function F1(e,t,r,n){if(r<=0)return 0;let o=[];for(let s=0;s<e.particles.length;s++){let l=e.particles[s];if(!l.active||!l.attached||l.age<.28)continue;let p=Math.floor(l.v*Nn)*fn+Math.floor(l.u*fn),d=p>=0&&p<t.luma.length?t.luma[p]:0;d>=n||o.push({i:s,luma:d,age:l.age})}o.sort((s,l)=>s.luma-l.luma||l.age-s.age);let i=0;for(let s=0;s<o.length&&i<r;s++)e.particles[o[s].i].active=!1,i++;return i}function r5(e,t,r){let n=r*fn+t;return{u:(t+.5)/fn,v:(r+.5)/Nn,luma:e.luma[n],r:e.cr[n],g:e.cg[n],b:e.cb[n]}}function Id(e,t,r,n,o,i,s,l,p=!1){if(r.length===0||n<=0)return 0;let d=0,v=n;for(;v>0;){let H=!1;for(let D=0;D<r.length&&!(v<=0);D++){let O=r[D];if(O.slots<=0)continue;let K=r5(t,O.px,O.py),Y=(Math.random()-.5)*i*.95,fe=(Math.random()-.5)*s*.95;ZR(e,K,Y,fe,l,p),O.slots--,o[O.idx]=(o[O.idx]??0)+1,d++,v--,H=!0}if(!H)break}return d}function n5(e,t,r,n,o,i,s){if(n<1e-4){ou(e,t);return}let l=VR(i),p=.3+gr(o,0,1,.55)*5.2;e.burstPhase+=s*p;let d=e.burstPhase>=1;d&&(e.burstPhase-=1),e.spreadRadius=L1(e.spreadRadius,s,n,o);let v=QR(e),H=1/fn,D=1/Nn,O=t5(t),K=E1(O,r),Y=e5(t,e.prevLuma,v,5);if(Y.length>0){let A=Di(l,Js(e)),C=A.reserveFree+A.baseFree,f=Fd(Y.length,n,Math.max(C,Y.length*4));C<f&&(F1(e,t,f-C,Qs),A=Di(l,Js(e)),C=A.reserveFree+A.baseFree),Id(e,t,Y,Fd(Y.length,n,C),v,H,D,l,!0)}let fe=.32+n*(.22+o*.28);if(!d&&Math.random()>fe){ou(e,t);return}let Ee=.55+gr(i,0,1,.5)*.9,be=d?Math.max(1,Math.round((WR+Math.round(gr(o,0,1,.55)*4))*Ee)):1,Fe=be+2,Qe=d?r*(.93-gr(o,0,1,.55)*.08):r,Ze=JR(t,v,Qe,be,Fe,K,e.spreadRadius);if(Ze.length===0){ou(e,t);return}let dt=[],kt=[];for(let A=0;A<Ze.length;A++){let C=Ze[A];Od(t.luma[C.idx],K)?dt.push(C):kt.push(C)}let at=Di(l,Js(e));dt.length>0&&at.reserveFree+at.baseFree<8&&(F1(e,t,8,K),at=Di(l,Js(e)));let rt=R1(kt.length,d,n,o,i,at.baseFree);Id(e,t,kt,rt,v,H,D,l);let mt=Di(l,Js(e)),R=k1(dt.length,d,n,mt.reserveFree,mt.baseFree);Id(e,t,dt,R,v,H,D,l),ou(e,t)}function o5(e,t,r,n){e.attached=!1;let o=gr(n,0,1,.45),[i,s]=B1(e.u,e.v,t.turbPhase),[l,p]=D1(e.u,e.v,t.turbPhase,e.u*97+e.v*53),d=o*r;e.vx=l*.1*d+i*25e-5*r,e.vy=p*.1*d+s*25e-5*r,e.maxLife=v1(o),e.life=e.maxLife}function a5(e,t,r,n){let o=gr(r.turbulence,0,1,.45),i=.4+(1-gr(r.detach,0,1,.26))*1.35,s=n*(3.2+o*4.8);e.turbPhase+=n*1e3;for(let l=0;l<e.particles.length;l++){let p=e.particles[l];if(!p.active)continue;if(p.age+=n,p.attached){let Ee=S1(t.luma,p.lightU,p.lightV,fn,Nn);(_1(Ee,p.castLuma,r.stick)||p.age>i)&&o5(p,e,r.amount,r.turbulence);continue}let[d,v]=B1(p.u,p.v,e.turbPhase),[H,D]=D1(p.u,p.v,e.turbPhase,l*17.3+p.u*41),O=o*r.amount,K=22e-5*r.amount*(.55+o*.7);p.vx+=d*K*n,p.vy+=v*K*n,p.vx+=(H*.0021+d*38e-5)*O*n,p.vy+=(D*.0021+v*38e-5)*O*n;let Y=Pd(p.u,p.v),fe=.32+Y*.68;p.u+=p.vx*s*fe,p.v+=p.vy*s*fe,p.life-=n*(.85+o*.2+(1-Y)*1.4),(p.life<=0||p.u<0||p.u>1||p.v<0||p.v>1)&&(p.active=!1)}}function i5(e,t,r,n,o,i,s,l,p,d,v){if(o<.004)return;let H=UR(s),D=I1(l),O=b1(p),K=Math.max(.22,n.size*i*H*O),Y=gr(l,0,1,.65)*.08,fe=y1(n.r,n.g,n.b,d,v),Ee=Math.round(Math.min(255,(fe.r+Y)*255)),be=Math.round(Math.min(255,(fe.g+Y)*255)),Fe=Math.round(Math.min(255,(fe.b+Y)*255)),Qe=o*D*(n.attached?.9:.62),Ze=K*1.45;e.fillStyle=`rgba(${Ee},${be},${Fe},${(Qe*.16).toFixed(3)})`,e.fillRect(t-Ze,r-Ze,Ze*2,Ze*2),e.fillStyle=`rgba(${Ee},${be},${Fe},${Qe.toFixed(3)})`,e.fillRect(t-K,r-K,K*2,K*2)}function s5(e,t,r,n,o=performance.now()){if(r.amount<=1e-5)return;let i=Math.max(.001,Math.min(.05,r.dt)),s=$R(r.quality),l=zR(r.quality),{w:p,h:d}=XR(e,n,s,r.pixelWidth,r.pixelHeight),v=p/DR;if(!jR(e,t,o,l,!r.skipVideoSample)||!e.lumaData)return;let D=e.lumaData,O=qR(D),K=YR(D);n5(e,K,O,r.amount,r.burst,r.density,i),a5(e,K,r,i);let Y=gr(r.trail,0,1,.5)*1.15,fe=1-Y*.052,Ee=Y*.92,{ctx:be,bufferCtx:Fe,buffer:Qe,canvas:Ze}=e;Fe.setTransform(1,0,0,1,0,0),Fe.globalCompositeOperation="source-over",Fe.globalAlpha=1,Fe.drawImage(Ze,0,0,p,d),Fe.globalAlpha=fe,Fe.fillStyle="#000",Fe.fillRect(0,0,p,d),Fe.globalAlpha=1;let dt=I1(r.brightness),kt=gr(r.spectral,0,1,.52);for(let at=0;at<e.particles.length;at++){let rt=e.particles[at];if(!rt.active)continue;let mt=g1(rt.age,h1(r.burst,rt.seed)),R=rt.attached?1:x1(rt.life/rt.maxLife),A=rt.attached?1:Pd(rt.u,rt.v),C=mt*R*A*r.amount*dt*(rt.attached?.96:.55+Ee*.38),f=T1(rt.u,rt.v,rt.age,e.turbPhase,rt.seed);i5(Fe,rt.u*p,rt.v*d,rt,C,v,r.size,r.brightness,mt,kt,f)}be.setTransform(1,0,0,1,0,0),be.globalCompositeOperation="source-over",be.globalAlpha=1,be.drawImage(Qe,0,0,p,d),e.lastUploadMs=0}function Dd(e,t,r){return{amount:gr(t,0,1,.8),stick:gr(Number(e?.stick??.65),0,1,.65),detach:gr(Number(e?.detach??.26),0,1,.26),burst:gr(Number(e?.burst??.58),0,1,.58),turbulence:gr(Number(e?.turbulence??.48),0,1,.48),size:gr(Number(e?.size??1),.4,1.8,1),brightness:gr(Number(e?.brightness??.68),0,1,.68),spectral:gr(Number(e?.spectral??.52),0,1,.52),density:gr(Number(e?.density??.5),0,1,.5),quality:gr(Number(e?.quality??.55),0,1,.55),trail:gr(Number(e?.trail??.5),0,1,.5),skipVideoSample:!1,dt:r}}function Hd(e,t,r,n,o,i,s=0){if(!e?.tex||i-t.lastUploadMs<s)return!1;s5(t,r,n,o,i);let l=e.tex;return(l.width!==t.canvas.width||l.height!==t.canvas.height)&&l.resize?.(t.canvas.width,t.canvas.height),l.subimage(t.canvas),t.lastUploadMs=i,!0}u();function N1(e){let{bundle:t,s3:r,bindState:n,video:o,params:i,amount:s,dt:l,now:p,aspect:d,pixelWidth:v,pixelHeight:H,shouldBind:D=!0,skipVideoSample:O=!1}=e;!r?.tex||s<=1e-5||(D&&mn(r,t.canvas,"lumaDust",n),Hd(r,t,o,{...Dd(i,s,l),pixelWidth:v,pixelHeight:H,skipVideoSample:O},d,p,0))}function G1(e){let{bundle:t,s3:r,bindState:n,video:o,params:i,amount:s,aspect:l,now:p,pixelWidth:d,pixelHeight:v}=e;return!r?.tex||s<=1e-5?!1:(mn(r,t.canvas,"lumaDust",n),t.lastUploadMs=0,Hd(r,t,o,{...Dd(i,s,1/60),pixelWidth:d,pixelHeight:v},l,p,0))}u();var U1=1920,V1=1080,W1=2560,Hi=48,Ni=27,Gd=5,l5=[255,42,42],c5=[255,176,32];function Sn(e,t,r,n){return Number.isFinite(e)?Math.max(t,Math.min(r,e)):n}function Wd(e,t,r){return{amount:Sn(t,0,1,0),count:Math.round(Sn(Number(e?.count),1,Gd,3)),threshold:Sn(Number(e?.threshold),0,1,.42),smooth:Sn(Number(e?.smooth),0,1,.76),size:Sn(Number(e?.size),.4,2.2,1),links:Sn(Number(e?.links),0,1,.7),color:un(e?.color,l5),labelColor:un(e?.labelColor,c5),dt:Number.isFinite(r)?Math.max(.001,Math.min(.08,r)):1/60,skipVideoSample:!1}}function u5(e,t){let r=Math.round(Sn(e,0,1,0)*999),n=Math.round(Sn(t,0,1,0)*999);return`x: ${r} y: ${n}`}function f5(e,t){let r=.028+Sn(e,0,1,.76)*.4;return 1-Math.exp(-Math.max(t,1/240)/r)}function p5(e,t,r){let n=new Float32Array(t*r);for(let o=0;o<n.length;o++){let i=o*4;n[o]=(.2126*e[i]+.7152*e[i+1]+.0722*e[i+2])/255}return n}function d5(e,t,r,n,o,i){let s=Math.max(.12,i*.55),l=0,p=0;for(;n+l+1<t&&e[o*t+n+l+1]>=s;)l++;for(;n-l-1>=0&&e[o*t+n-l-1]>=s;)l++;for(;o+p+1<r&&e[(o+p+1)*t+n]>=s;)p++;for(;o-p-1>=0&&e[(o-p-1)*t+n]>=s;)p++;let d=Math.max(l,p,1);return Sn((d*2+1)/Math.max(t,r),.045,.28,.09)}function m5(e,t,r,n,o){let i=Math.round(Sn(n,1,Gd,3)),s=Sn(o,0,1,.42),l=Math.max(.08,s*.45),p=[];for(let H=1;H<r-1;H++)for(let D=1;D<t-1;D++){let O=H*t+D,K=e[O];if(K<l)continue;let Y=!0;for(let fe=-1;fe<=1&&Y;fe++)for(let Ee=-1;Ee<=1;Ee++)Ee===0&&fe===0||e[(H+fe)*t+(D+Ee)]>K&&(Y=!1);Y&&p.push({i:O,luma:K})}p.sort((H,D)=>D.luma-H.luma);let d=.14,v=[];for(let H of p){if(v.length>=i)break;let D=H.i%t,O=Math.floor(H.i/t),K=(D+.5)/t,Y=(O+.5)/r;H.luma<s&&v.length>0||v.some(Ee=>Math.hypot(Ee.u-K,Ee.v-Y)<d)||v.push({u:K,v:Y,size:d5(e,t,r,D,O,H.luma),luma:H.luma})}return v}var h5=[{u:.42,v:.48,size:.1,luma:.82},{u:.61,v:.36,size:.075,luma:.7},{u:.52,v:.64,size:.068,luma:.64},{u:.28,v:.3,size:.055,luma:.52},{u:.74,v:.58,size:.05,luma:.48}];function g5(e,t,r,n,o,i){let s=Math.round(Sn(r,1,Gd,3)),l=f5(n,o),p=Math.min(1,o*4.2),d=Math.min(1,o*2.4),v=new Set,H=[],D=e.toSorted((O,K)=>K.alpha-O.alpha);for(let O of D){let K=-1,Y=.22;for(let fe=0;fe<t.length;fe++){if(v.has(fe))continue;let Ee=t[fe],be=Math.hypot(O.u-Ee.u,O.v-Ee.v);be<Y&&(Y=be,K=fe)}if(K>=0){let fe=t[K];v.add(K),H.push({id:O.id,u:O.u+(fe.u-O.u)*l,v:O.v+(fe.v-O.v)*l,size:O.size+(fe.size-O.size)*l,luma:O.luma+(fe.luma-O.luma)*l,alpha:Math.min(1,O.alpha+p)})}else{let fe=Math.max(0,O.alpha-d);fe>.02&&H.push({...O,alpha:fe})}}for(let O=0;O<t.length&&H.length<s;O++){if(v.has(O))continue;let K=t[O];H.push({id:i.nextId++,u:K.u,v:K.v,size:K.size,luma:K.luma,alpha:p})}return H.slice(0,s)}function b5(e){let t=e.filter(n=>n.alpha>.02),r=[];for(let n=0;n<t.length;n++)for(let o=n+1;o<t.length;o++)r.push([t[n],t[o]]);return r}function y5(e,t,r){let n=U1,o=V1;if(t!==void 0&&r!==void 0&&t>=640&&r>=360){n=Math.round(t),o=Math.round(r);let i=Math.max(n,o);if(i>W1){let s=W1/i;n=Math.max(640,Math.round(n*s)),o=Math.max(360,Math.round(o*s))}}(e.canvas.width!==n||e.canvas.height!==o)&&(e.canvas.width=n,e.canvas.height=o)}function $1(){let e=document.createElement("canvas");e.width=U1,e.height=V1;let t=e.getContext("2d");if(!t)throw new Error("2d canvas unavailable");let r=document.createElement("canvas");r.width=Hi,r.height=Ni;let n=r.getContext("2d",{willReadFrequently:!0});if(!n)throw new Error("2d canvas unavailable");return{canvas:e,ctx:t,sampleCanvas:r,sampleCtx:n,luma:new Float32Array(Hi*Ni),hasSample:!1,tracks:[],nextId:1,lastUploadMs:0,lastSampleMs:0}}function Ud(e){e.tracks.length=0,e.hasSample=!1,e.lastUploadMs=0,e.lastSampleMs=0,e.ctx.setTransform(1,0,0,1,0,0),e.ctx.clearRect(0,0,e.canvas.width,e.canvas.height)}function x5(e,t,r,n){if(!n&&e.hasSample&&r-e.lastSampleMs<50)return;if(!t||t.readyState<2||t.videoWidth<2){e.hasSample=!1;return}e.sampleCtx.drawImage(t,0,0,Hi,Ni);let o=e.sampleCtx.getImageData(0,0,Hi,Ni).data;e.luma=p5(o,Hi,Ni),e.hasSample=!0,e.lastSampleMs=r}function Nd([e,t,r],n){return`rgba(${e},${t},${r},${Math.max(0,Math.min(1,n))})`}function v5(e,t){let{ctx:r,canvas:n}=e,o=n.width,i=n.height;r.setTransform(1,0,0,1,0,0),r.clearRect(0,0,o,i);let s=Sn(t.amount,0,1,0);if(s<.004)return;let l=Sn(t.size,.4,2.2,1),p=o/1920,d=Math.max(1.5,2.2*p),v=Math.max(18,Math.round(24*p)),H=Math.max(4,6*p),D=Sn(t.links,0,1,0);if(r.lineJoin="miter",r.lineCap="round",r.textAlign="left",r.textBaseline="bottom",r.font=`600 ${v}px ui-monospace, "SF Mono", "Cascadia Code", monospace`,D>.004){r.setLineDash([8*p,6*p]),r.lineWidth=Math.max(1.1,1.4*p);for(let[O,K]of b5(e.tracks)){let Y=s*D*Math.min(O.alpha,K.alpha);Y<.02||(r.strokeStyle=Nd(t.color,Y*.82),r.beginPath(),r.moveTo(O.u*o,O.v*i),r.lineTo(K.u*o,K.v*i),r.stroke())}r.setLineDash([])}for(let O of e.tracks){let K=s*O.alpha;if(K<.02)continue;let Y=O.u*o,fe=O.v*i,Ee=O.size*Math.min(o,i)*l*.5,be=Y-Ee,Fe=fe-Ee,Qe=Ee*2;r.strokeStyle=Nd(t.color,K),r.lineWidth=d,r.strokeRect(be+.5,Fe+.5,Qe,Qe),r.fillStyle=Nd(t.labelColor,K),r.fillText(u5(O.u,O.v),be,Fe-H)}}function Vd(e,t,r,n,o,i=0){if(!e?.tex||n.amount<=1e-5||t.lastUploadMs>0&&o-t.lastUploadMs<i)return!1;y5(t,n.pixelWidth,n.pixelHeight),x5(t,r,o,!n.skipVideoSample);let s=t.hasSample?m5(t.luma,Hi,Ni,n.count,n.threshold):h5.slice(0,n.count);t.tracks=g5(t.tracks,s,n.count,n.smooth,n.dt,t),v5(t,n);let l=e.tex;return typeof l.resize=="function"&&(l.width!==t.canvas.width||l.height!==t.canvas.height)&&l.resize(t.canvas.width,t.canvas.height),l.subimage(t.canvas),t.lastUploadMs=o,!0}u();function z1(e){let{bundle:t,s3:r,bindState:n,video:o,params:i,amount:s,dt:l,now:p,shouldBind:d=!0,skipVideoSample:v=!1,pixelWidth:H,pixelHeight:D}=e;!r?.tex||s<=1e-5||(d&&mn(r,t.canvas,"lumaLock",n),Vd(r,t,o,{...Wd(i,s,l),skipVideoSample:v,pixelWidth:H,pixelHeight:D},p,0))}function X1(e){let{bundle:t,s3:r,bindState:n,video:o,params:i,amount:s,now:l,pixelWidth:p,pixelHeight:d}=e;return!r?.tex||s<=1e-5?!1:(mn(r,t.canvas,"lumaLock",n),t.lastUploadMs=0,Vd(r,t,o,{...Wd(i,s,1/60),pixelWidth:p,pixelHeight:d},l,0))}u();function j1(e){return Math.round(e)>=1}function _5(e,t,r){typeof e.resize=="function"&&(e.width===t&&e.height===r||e.resize(t,r))}function Y1(){let e=document.createElement("canvas");e.width=2,e.height=2;let t=e.getContext("2d",{willReadFrequently:!0});if(!t)throw new Error("2d canvas unavailable");return{canvas:e,ctx:t,lastUpdateMs:0,lastPath:""}}function S5(e,t){let r=Math.max(e,t),n=r>256?256/r:1;return{w:Math.max(2,Math.round(e*n)),h:Math.max(2,Math.round(t*n))}}function T5(e,t){let r=t.videoWidth,n=t.videoHeight;if(!r||!n)return!1;let{w:o,h:i}=S5(r,n);return(e.canvas.width!==o||e.canvas.height!==i)&&(e.canvas.width=o,e.canvas.height=i),e.ctx.setTransform(1,0,0,1,0,0),e.ctx.drawImage(t,0,0,o,i),!0}function q1(e,t,r,n){if(!e?.tex||!r||!t||t.videoWidth<=0||!(n.force||r.lastPath!==n.videoPath)||!T5(r,t))return!1;let i=e.tex;_5(i,r.canvas.width,r.canvas.height);try{i.subimage(r.canvas)}catch{return!1}return r.lastUpdateMs=n.now,r.lastPath=n.videoPath,!0}u();function K1(){return{prevEnvelope:0,prevBand:0,followCooldownMs:0}}function Q1(e){let{bundle:t,s3:r,bindState:n,params:o,spawn:i,draw:s,dt:l,now:p,aspect:d,envelope:v,binding:H,bands:D,runtime:O,shouldBind:K=!0}=e;if(r?.tex){if(K&&mn(r,t.canvas,"neonGrid",n),Xr(H))O.prevBand=0;else{let Y=wo(H.source,D,H.depth),fe=Y>.35&&O.prevBand<=.35;O.followCooldownMs=Math.max(0,O.followCooldownMs-l*1e3),(fe||Y>.55&&O.followCooldownMs<=0)&&(Bi(t,i),O.followCooldownMs=120),O.prevBand=Y}O.prevEnvelope=v,X_(t,l,s.decay),Ld(r,t,{...s,dt:l,colors:Md(o)},d,p,K?0:999999)}}function Z1(e,t){e.lines=[];let r=Math.max(3,Math.round(t.spawn));Bi(e,{...t,spawn:r,horizontal:1,vertical:0}),Bi(e,{...t,spawn:r,horizontal:0,vertical:1}),e.lastUploadMs=0}function J1(e){let{bundle:t,s3:r,bindState:n,params:o,draw:i,aspect:s,now:l}=e;return!r?.tex||t.lines.length===0?!1:(mn(r,t.canvas,"neonGrid",n),t.lastUploadMs=0,Ld(r,t,{...i,dt:0,colors:Md(o)},s,l,0))}function eS(e){let{settingsRef:t,backingWidth:r,backingHeight:n,oscilloscopeBundleRef:o,neonGridBundleRef:i,textLayerBundleRef:s,throughTheStarsBundleRef:l,lumaDustBundleRef:p,lumaLockBundleRef:d,metalEnvBundleRef:v,s3OverlayBindRef:H,textLayerRuntimeRef:D,oscilloscopeBridgeReadyRef:O,neonGridBridgeReadyRef:K,textLayerBridgeReadyRef:Y,throughTheStarsBridgeReadyRef:fe,lumaDustBridgeReadyRef:Ee,lumaLockBridgeReadyRef:be,metalEnvBridgeReadyRef:Fe,neonGridWasEnabledRef:Qe,textLayerWasEnabledRef:Ze,throughTheStarsWasEnabledRef:dt,lumaDustWasEnabledRef:kt,lumaLockWasEnabledRef:at}=e;if(cn("neonGrid"))try{let rt=K_();o.current=rt,ie().oscilloscopeWaveformBundle=rt;let mt=z_();i.current=mt,K.current=!0;let R=o1();s.current=R,Y.current=!0;let A=c1();l.current=A,fe.current=!0;let C=H1();p.current=C,Ee.current=!0;let f=$1();d.current=f,be.current=!0,Fa("neonGrid",mt.canvas,H.current),Fa("textLayer",R.canvas,H.current),Fa("throughTheStars",A.canvas,H.current),Fa("lumaDust",C.canvas,H.current),Fa("lumaLock",f.canvas,H.current),Fa("oscilloscope",rt.canvas,H.current);for(let Ht=0;Ht<36;Ht++){let bt=.85+.15*Math.sin(Ht*.45);for(let yt=0;yt<rt.bins.length;yt++){let Pt=yt/Math.max(1,rt.bins.length-1);rt.bins[yt]=(Math.exp(-Math.pow((Pt-.14)/.1,2))*.7+Math.exp(-Math.pow((Pt-.42)/.16,2))*.45+Math.exp(-Math.pow((Pt-.72)/.14,2))*.28)*bt}Ad(rt,{persistence:.72,positionY:.88,scale:.55,mode:0,colorLo:"#1c3cff",colorMid:"#ff9a1a",colorHi:"#fff6c8"})}rt.lastUploadMs=-999,mt.lastUploadMs=-999,O.current=!0;let oe=Y1();v.current=oe,Fe.current=!0;let Te=An(t.current,"neonGrid")?.config;if(Te){let Ht=Ks(Te.params);Z1(mt,Ht),J1({bundle:mt,s3:cn("neonGrid"),bindState:H.current,params:Te.params,draw:Kc(Te.params),aspect:window.innerWidth/Math.max(1,window.innerHeight),now:performance.now()}),Qe.current=!0}let qe=An(t.current,"textLayer")?.config;if(qe){let Ht=eu(qe,ie().customBands);D.current=ru(),D.current.animStartMs=performance.now(),D.current.lastMessage=Ht.message,D.current.lastAnim=Ht.anim,tu(cn("textLayer"),R,{...Ht,amount:qe.base??.92,nowMs:performance.now(),animStartMs:D.current.animStartMs},performance.now(),0),Ze.current=!0}let Ve=An(t.current,"throughTheStars"),Ne=Ve?.config;Ne&&(Rd(A,Number(Ne.params?.density??56),Number(Ne.params?.depth??.65)),m1({bundle:A,s3:cn("throughTheStars"),bindState:H.current,fxCfg:Ne,bands:ie().customBands,amount:hr(Ve.effectKey,Ne,ie().customBands,jr),aspect:window.innerWidth/Math.max(1,window.innerHeight),now:performance.now(),pixelWidth:r,pixelHeight:n}),dt.current=!0);let Xe=An(t.current,"lumaDust"),Je=Xe?.config;Je&&(el(C),G1({bundle:C,s3:cn("lumaDust"),bindState:H.current,video:ie().s0?.src,params:Je.params,amount:hr(Xe.effectKey,Je,ie().customBands,jr),aspect:window.innerWidth/Math.max(1,window.innerHeight),now:performance.now(),pixelWidth:r,pixelHeight:n}),kt.current=!0);let It=An(t.current,"lumaLock"),et=It?.config;et&&(Ud(f),X1({bundle:f,s3:cn("lumaLock"),bindState:H.current,video:ie().s0?.src,params:et.params,amount:hr(It.effectKey,et,ie().customBands,jr),now:performance.now(),pixelWidth:r,pixelHeight:n}),at.current=!0)}catch{Fe.current=!1,O.current=!1,K.current=!1,Y.current=!1,fe.current=!1,Ee.current=!1,be.current=!1}}u();u();u();function tl(e,t){e&&(e.speed=t),ie().speed=t}u();function M5(e,t,r){return e>r&&t<=r}function tS(){return{prevBands:{},stemHitsSeen:new Set,counts:{},envelopes:{},shapeOriginMs:{},queues:{},anims:{}}}function rS(e){e.prevBands={},e.stemHitsSeen.clear(),e.counts={},e.envelopes={},e.shapeOriginMs={},e.queues={},e.anims={}}function nS(e){if(Object.keys(e.anims).length>0)return!0;for(let t in e.queues){let r=e.queues[t];if(r&&r.length>0)return!0}return!1}function au(e,t,r,n,o){let{attack:i,release:s,decay:l,hold:p}=n,d=n.easeShape??Ta;e.shapeOriginMs[t]=r-Math.max(0,o)*1e3,i>0?(e.anims[t]={kind:"attack",t0:r,attack:i,release:s,decay:l,hold:p,easeShape:d},e.envelopes[t]=0):p>0?(e.anims[t]={kind:"hold",t0:r,duration:p,release:s,decay:l,easeShape:d},e.envelopes[t]=1):s>0?(e.anims[t]={kind:"release_ease",t0:r,duration:s,easeShape:d},e.envelopes[t]=1):(e.anims[t]={kind:"release_linear",decay:l},e.envelopes[t]=1)}function L5(e,t,r,n){let o=e.anims[t];if(o){if(o.kind==="attack"){let i=(r-o.t0)/1e3,s=o.attack>0?i/o.attack:1,l=Math.max(0,Math.min(1,s));e.envelopes[t]=yf(l),s>=1&&(e.envelopes[t]=1,o.hold>0?e.anims[t]={kind:"hold",t0:r,duration:o.hold,release:o.release,decay:o.decay,easeShape:o.easeShape}:o.release>0?e.anims[t]={kind:"release_ease",t0:r,duration:o.release,easeShape:o.easeShape}:e.anims[t]={kind:"release_linear",decay:o.decay})}else if(o.kind==="hold")e.envelopes[t]=1,(r-o.t0)/1e3>=o.duration&&(o.release>0?e.anims[t]={kind:"release_ease",t0:r,duration:o.release,easeShape:o.easeShape}:e.anims[t]={kind:"release_linear",decay:o.decay});else if(o.kind==="release_ease"){let i=(r-o.t0)/1e3,s=o.duration>0?i/o.duration:1,l=Math.max(0,Math.min(1,s));e.envelopes[t]=Fh(o.easeShape??Ta,l),s>=1&&(e.envelopes[t]=0,delete e.anims[t],delete e.shapeOriginMs[t])}else if(o.kind==="release_linear"){let i=e.envelopes[t]||0;e.envelopes[t]=Math.max(0,i-n*o.decay),(e.envelopes[t]||0)<=0&&(e.envelopes[t]=0,delete e.anims[t],delete e.shapeOriginMs[t])}}}function w5(e,t,r,n,o){let i=e.shapeOriginMs[t];if(i==null||!(!!e.anims[t]||(e.envelopes[t]??0)>1e-5))return;let l=ui(n.delay,o.attack,o.hold,o.release,o.decay);return Math.max(0,Math.min(1,(r-i)/1e3/l))}function oS(e,t){let{key:r,bandVal:n,stemHits:o,trigger:i,envelope:s,nowMs:l,dt:p,onFire:d}=t,v=e.prevBands[r]||0,H=i.threshold??Se.triggerThreshold,D=i.count??Se.triggerCount,O=i.delay??Se.delay,K=o>0?o:M5(n,v,H)?1:0;for(let Y=0;Y<K;Y++)e.counts[r]=(e.counts[r]||0)+1,e.counts[r]>=D&&(e.counts[r]=0,O>0?(e.queues[r]||(e.queues[r]=[]),e.queues[r].push(l+O*1e3)):(d?.(r),au(e,r,l,s,O)));if(e.queues[r]?.length)for(;e.queues[r][0]<=l&&(d?.(r),au(e,r,l,s,O),e.queues[r].shift(),!!e.queues[r]?.length););return L5(e,r,l,p),e.prevBands[r]=n,w5(e,r,l,i,s)}u();var aS=120,A5=140,C5=1,iu=[],E5=new Set,R5=new Map([...io,...Xn].map(e=>[e.key,e.label]));function k5(e){let[t,r]=e.split(":"),n=R5.get(t??e)??t??e;return r?`${n} \xB7 ${r}`:n}function iS(){for(let e of E5)e()}function sS(e){let t=e.wallMs??performance.now(),r=Math.max(0,Math.min(1,e.intensity??1)),n=iu[0];if(n&&n.channel===e.channel&&n.fxKey===e.fxKey&&t-n.wallMs<A5){n.repeat+=1,n.intensity=Math.max(n.intensity,r),n.wallMs=t,n.timeSec=e.timeSec,n.beat=e.beat,iS();return}iu.unshift({id:C5++,wallMs:t,timeSec:e.timeSec,beat:e.beat,channel:e.channel,intensity:r,fxKey:e.fxKey,fxLabel:e.fxLabel??(e.fxKey?k5(e.fxKey):void 0),repeat:1}),iu.length>aS&&(iu.length=aS),iS()}var l$=[{key:"all",label:"All"},{key:"kick",label:Lo("kick")},{key:"snare",label:Lo("snare")},{key:"hat",label:Lo("hat")},{key:"low",label:Lo("low")},{key:"mid",label:Lo("mid")},{key:"high",label:Lo("high")},{key:"beat",label:Lo("beat")},{key:"rhythm",label:Lo("rhythm")},{key:"fx",label:Lo("fx")}];u();u();function lS(e,t){let r=Math.max(1,t)/60;return e*r}u();function cS(e,t,r,n){return e&&t&&r.v0 instanceof HTMLVideoElement&&r.v1 instanceof HTMLVideoElement&&n!=null}function $d(e,t,r,n){if(e&&t.v0&&t.v1)return[t.v0,t.v1];let o=[];return r instanceof HTMLVideoElement&&o.push(r),n instanceof HTMLVideoElement&&n!==r&&o.push(n),o}function zd(e,t,r){!e||!(t instanceof HTMLVideoElement)||!(r instanceof HTMLVideoElement)||(Ga(e.ctx0,e.c0,t),Ga(e.ctx1,e.c1,r))}function su(e){for(let t of e.frames0)t.close();for(let t of e.frames1)t.close();e.frames0.length=0,e.frames1.length=0}function Xd(e){su(e.frames),e.active=!1,e.pendingTrigger=!1,e.phase="forward",e.segmentEnd0=0,e.captureAccum=0,e.capturePending=!1,e.reverseIdx=-1,e.completeAfterReverse=!1}function jd(e){su(e.frames),e.active=!0,e.pendingTrigger=!1,e.phase="forward",e.segmentEnd0=0,e.captureAccum=0,e.capturePending=!1,e.reverseIdx=-1,e.completeAfterReverse=!1}function Ga(e,t,r){let n=Math.max(2,r.videoWidth||2),o=Math.max(2,r.videoHeight||2);(t.width!==n||t.height!==o)&&(t.width=n,t.height=o),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,t.width,t.height),e.drawImage(r,0,0,t.width,t.height)}function Yd(e,t,r){(t.width!==r.width||t.height!==r.height)&&(t.width=r.width,t.height=r.height),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,t.width,t.height),e.drawImage(r,0,0)}function uS(e,t,r){let n=1/Math.max(12,r);e.captureAccum+=t;let o=e.reverseIdx;for(;e.captureAccum>=n&&o>0;)e.captureAccum-=n,o-=1;return e.captureAccum>=n&&o===0?(e.captureAccum=0,e.reverseIdx=0,e.completeAfterReverse?(e.completeAfterReverse=!1,e.phase="forward",e.active=!1,{finished:!0,frameIdx:0,cycleDone:!0}):(e.phase="replay",{finished:!0,frameIdx:0,cycleDone:!1})):(e.reverseIdx=o,{finished:!1,frameIdx:o,cycleDone:!1})}function fS(e,t,r){let n=e.frames.frames0.length-1;if(n<0)return e.phase="forward",e.active=!1,e.reverseIdx=-1,e.captureAccum=0,e.completeAfterReverse=!1,{finished:!0,frameIdx:-1};let o=1/Math.max(12,r);e.captureAccum+=t;let i=e.reverseIdx;for(;e.captureAccum>=o&&i<n;)e.captureAccum-=o,i+=1;return e.captureAccum>=o&&i>=n?(e.captureAccum=0,e.reverseIdx=n,e.completeAfterReverse=!0,e.phase="reverse",{finished:!0,frameIdx:n}):(e.reverseIdx=i,{finished:!1,frameIdx:i})}async function pS(e,t,r,n){if(!(r.frames0.length>=n))try{let[o,i]=await Promise.all([createImageBitmap(e),createImageBitmap(t)]);r.frames0.push(o),r.frames1.push(i)}catch{}}u();function dS(e){return Math.max(.2,e)}function ua(e){return!!e?.active}u();var P5=Xn.filter(e=>e.category==="Color & grade").map(e=>e.key),C$=new Set(P5);var F5=["videoSpeed","boomerang","jumpCut","stutterBack","clipPeek","zap","slowmo","accelerate","playbackCue"],E$=new Set(F5);function mS(e){let{playing:t,force:r=!1,instantLoad:n=!1,loadedPath:o,transitionEnabled:i,boomerangEngaged:s}=e;return t&&!r&&!n&&o!=null&&o.length>0&&i&&!s}function hS(e,t){return e}u();u();var gS=0,qd=1;function O5(e){let t=e?.sourceMode;return typeof t=="number"&&Number.isFinite(t)&&Math.round(t)===qd?qd:gS}function I5(e){return O5(e)===qd}function B5(e){let t=e?.videoPath;return typeof t=="string"&&t.trim()?t.trim():void 0}function D5(e){let t=e?.videoIndex??1;return typeof t=="number"?t:Math.max(1,Number(t)||1)}function bS(e,t,r){if(e.length===0)return;let n=s=>{if(!s||!mr(s,t))return s;let l=e.findIndex(d=>mr(d.path,s)),p=e[(l+1)%e.length]?.path;return p&&!mr(p,t)?p:s};if(I5(r)){let s=B5(r);if(s){let l=e.find(p=>mr(p.path,s));return n(l?.path??s)}}let o=D5(r),i=Math.max(0,o-1)%e.length;return n(e[i]?.path)}u();u();var yS=4;function lu(e,t=2){let r=e?.eventCount;return typeof r=="number"&&Number.isFinite(r)?Math.max(1,Math.min(yS,Math.round(r))):Math.max(1,Math.min(yS,Math.round(t)))}function Kd(e,t){return`${e}${t}`}function xS(e,t){let r=e?.[Kd("frame",t)];return typeof r=="number"&&Number.isFinite(r)?Math.max(0,Math.round(r)):0}var vS=0,Qd=1;function H5(e){return`clipMode${e}`}function N5(e){return`clipPath${e}`}function G5(e,t){let r=e?.[H5(t)];return typeof r=="number"&&Number.isFinite(r)&&Math.round(r)===Qd?Qd:vS}function W5(e,t){return G5(e,t)===Qd}function U5(e,t){let r=e?.[N5(t)];return typeof r=="string"&&r.trim()?r.trim():void 0}function V5(e,t){let r=e?.[Kd("clip",t)]??t;return typeof r=="number"&&Number.isFinite(r)?Math.max(1,Math.round(r)):Math.max(1,Number(r)||t)}function cu(e,t,r){if(e.length===0)return null;if(W5(t,r)){let i=U5(t,r);if(i)return e.find(l=>mr(l.path,i))?.path??i}let n=V5(t,r),o=Math.max(0,Math.min(e.length-1,n-1));return e[o]?.path??null}u();u();function $5(e){if(!e)return null;try{return new URL(e,window.location.origin).pathname}catch{return null}}function Zd(e,t){if(!t)return!1;let r=e.currentSrc||e.src;if(!r)return!1;let n=$5(r);return n?mr(n,t):!1}function _S(e){return e.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA&&e.videoWidth>0}function SS(e,t){let r=e.duration,n=1/120,o=Math.max(0,t);Number.isFinite(r)&&r>0&&(o=e.loop?(o%r+r)%r:Math.min(o,r-n)),e.currentTime=o}var lo=null;function tm(e){return!!e&&typeof e=="object"&&"currentTime"in e&&Number.isFinite(e.currentTime)}function rl(e){return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement}function em(e){let t=e.play?.();t&&typeof t=="object"&&"catch"in t&&t.catch(()=>{})}function TS(e,t){if(rl(e)){SS(e,t);return}let r=e.duration,n=1/120,o=Math.max(0,t);Number.isFinite(r)&&r&&r>0&&(o=e.loop?(o%r+r)%r:Math.min(o,r-n)),e.currentTime=o}function z5(e){let t=ie();for(let r of["s0","s1"]){let n=t[r]?.src;tm(n)&&TS(n,e)}}function uu(e){ie().__hydraPendingPlaybackCueSeek=e}function fu(){let e=ie().__hydraPendingPlaybackCueSeek;return e==null||!Number.isFinite(e)?!1:(delete ie().__hydraPendingPlaybackCueSeek,z5(e),!0)}function Jd(e,t){let r=ie().s2?.src;if(tm(r)){if(rl(r)&&(r.muted=!0,r.loop=!0),TS(r,e),t){r.pause?.();return}em(r)}}function X5(e,t,r){let n=ie().s2;if(!n)return;let o=n.src;if(rl(o)&&Zd(o,e)&&_S(o)){Jd(t,r);return}n.initVideo?.(e);let i=n.src,s=typeof HTMLMediaElement<"u"?HTMLMediaElement.HAVE_CURRENT_DATA:2;if(rl(i)&&i.readyState<s){i.addEventListener("loadeddata",()=>Jd(t,r),{once:!0});return}Jd(t,r)}function MS(e){let t=cu(e.library,e.params,1),r=ie().s2?.src;if(t&&rl(r)&&Zd(r,t)){em(r);return}t?X5(t,0,!1):tm(r)&&em(r)}function pu(){return lo!=null}function LS(){return!!lo?.frozen}function wS(){return lo?.slot??1}function AS(e){if(!lo||(lo.remainingSec-=e,lo.remainingSec>0))return;let t=lo;lo=null,MS(t)}function rm(){if(!lo)return;let e=lo;lo=null,MS(e)}function CS(e,t,r=1){if(e.length===0)return null;let n=typeof t=="string"?t:"",o=e.findIndex(p=>mr(p.path,n)),s=((o>=0?o:0)+r+e.length)%e.length,l=e[s]?.path;return!l||mr(l,n)?null:l}var j5=["playbackCue","layerBlend","videoMap","shatterLayer"];function nl(e){if(!e)return null;for(let t of j5){let r=e[t];if(!(t==="shatterLayer"&&Math.round(Number(r?.params?.mode)||0)<1)&&r?.enabled)return{key:t,config:r}}return null}function ES(e,t,r,n){if(!(!r?.enabled||e.length===0))return n==="playbackCue"?cu(e,r.params,wS())??void 0:bS(e,t,r.params)}u();var mz=up*1e3,Wa=120,hz=new Float32Array(0),gz=new Float32Array(Wa);function RS(e){let t=typeof window<"u"?window:null;if(!t)return;let r=t.__hydraVideoSpeedRing;(!r||r.capacity!==Wa||!r.times)&&(r={capacity:Wa,times:new Float32Array(Wa),data:new Float32Array(Wa),w:0,len:0},t.__hydraVideoSpeedRing=r);let n=performance.now();r.times[r.w]=n,r.data[r.w]=Number.isFinite(e)?e:1,r.w=(r.w+1)%Wa,r.len<Wa&&r.len++}u();u();function nm(e,t){let r=Math.max(1,Math.round(t)),n=[],o=typeof e.currentVideo=="string"?e.currentVideo:"",i=o,s=e.sceneVideoPaths?.filter(l=>typeof l=="string"&&l.length>0);for(let l=0;l<r;l++){let p=null;if(s&&s.length>0){let d=pp(i,s).next;p=d&&!mr(d,i)?d:null}else{let d=tc(e.filteredLibrary,i)??(i.length>0?i:"");p=CS(e.filteredLibrary,d,1)}if(!p||mr(p,o))break;n.push(p),i=p}return n}function kS(e,t){let r=nm(e,t);return r.length===0?null:r[r.length-1]??null}u();var om=!1,am=!1,PS=!1;function du(e){om=e}function mu(e){am=e}function im(){return om}function sm(){return am}function ol(){return PS}function FS(){return om||am||PS}function OS(e){typeof window>"u"||!e||(ie().__hydraTransportFallbackLoad=e)}function IS(e){if(typeof window>"u"||!e)return!1;let t=ie(),r=t.__hydraTransportFallbackLoad;return typeof r!="string"||!r||!mr(r,e)?!1:(delete t.__hydraTransportFallbackLoad,!0)}function hu(){typeof window>"u"||(window.__hydraInstantVideoLoad=!0)}function BS(){if(typeof window>"u")return!1;let e=window,t=!!e.__hydraInstantVideoLoad||im()||sm()||ol();return delete e.__hydraInstantVideoLoad,t}var Y5=0;function Ua(e,t=4e3){Y5=e?performance.now()+t:0}var q5=.05,K5=2,Q5=1,Z5=8;function lm(e){return Math.max(q5,Math.min(K5,e))}function cm(e){return Math.max(Q5,Math.min(Z5,Math.round(e)))}var Zn=null;function J5(){let e=ie();for(let t of["s0","s1"]){let r=e[t]?.src;if(r instanceof HTMLVideoElement&&Number.isFinite(r.currentTime))return r.currentTime}return 0}function DS(e,t){du(!1);let r=ie(),n=r.__hydraClipPeekVideo;if(n?.endPeek(t.returnPath,t.returnTimeSec)){r.__hydraClipPeekSkipLoad=t.returnPath,e.applyVideo(t.returnPath),n.preloadPath(t.peekPath);return}uu(t.returnTimeSec),e.applyVideo(t.returnPath)}function Gi(){return Zn!=null}function HS(){Zn=null,du(!1)}function NS(e,t,r){if(Zn||sm()||ol())return;let n=typeof e.currentVideo=="string"?e.currentVideo:"";if(!n)return;let o=cm(t),i=kS(e,o);if(!i)return;let s=J5(),l=ie(),p=l.__hydraClipPeekVideo,d=lm(r);if(Zn={returnPath:n,returnTimeSec:s,remainingSec:d,peekPath:i},du(!0),p?.beginPeek(i,n,s)){l.__hydraClipPeekSkipLoad=i,e.applyVideo(i);return}OS(i),e.applyVideo(i)}function GS(e,t){if(!Zn||(Zn.remainingSec-=t,Zn.remainingSec>0))return;let r=Zn;Zn=null,DS(e,r)}function um(e){if(!Zn)return;let t=Zn;Zn=null,DS(e,t)}u();var In=null,ek=2.5,tk=1,rk=8,nk=1,ok=12;function ak(e){return Math.max(tk,Math.min(rk,Math.round(e)))}function WS(e){return Math.max(nk,Math.min(ok,Math.round(e)))}function fm(){ie().__hydraApplyScene?.()}function ik(){let e=ie();for(let t of["s0","s1"]){let r=e[t]?.src;if(r instanceof HTMLVideoElement&&Number.isFinite(r.currentTime))return r.currentTime}return 0}function sk(e){let t=WS(e);return Math.max(1/24,t/24)}function US(e,t){let r=t.paths[t.clipIndex];if(!r)return!1;let n=ie(),o=n.__hydraClipPeekVideo,i=o?.showZapClip(r)??"failed";if(i==="ready"){t.waitingLoad=!1,t.waitingLoadSec=0,t.clipRemainingSec=t.frameDurationSec,n.__hydraClipPeekSkipLoad=r,e.applyVideo(r),fm();let s=t.paths[t.clipIndex+1];return s&&o?.preloadPath(s),!0}return i==="loading"?(t.waitingLoad=!0,t.waitingLoadSec=0,t.clipRemainingSec=0,!0):(In=null,VS(e,t),!1)}function pm(e,t){mu(!1);let r=ie(),n=r.__hydraClipPeekVideo;if(n?.endZap(t.returnPath,t.returnTimeSec)){r.__hydraClipPeekSkipLoad=t.returnPath,e.applyVideo(t.returnPath);let o=t.paths[0];o&&n.preloadPath(o);return}uu(t.returnTimeSec),e.applyVideo(t.returnPath)}function VS(e,t){ie().__hydraClipPeekVideo?.cancelZap?.(),hu(),pm(e,t)}function Wi(){return In!=null}function $S(){In=null,mu(!1),ie().__hydraClipPeekVideo?.cancelZap?.()}function zS(e,t,r){if(In||im()||ol())return;let n=ak(t),o=WS(r),i=typeof e.currentVideo=="string"?e.currentVideo:"";if(!i)return;let s=nm(e,n);if(s.length===0)return;let l=ik(),d=ie().__hydraClipPeekVideo;d?.beginZap(i,l),d?.preloadPath(s[0]??null),In={returnPath:i,returnTimeSec:l,paths:s,clipIndex:0,clipRemainingSec:0,waitingLoad:!0,waitingLoadSec:0,frameDurationSec:sk(o)},mu(!0),US(e,In)||(In=null)}function XS(e,t){if(!In)return;let r=In,n=ie(),o=n.__hydraClipPeekVideo,i=r.paths[r.clipIndex];if(r.waitingLoad&&i){if(r.waitingLoadSec+=t,o?.completeZapClipLoad(i)){r.waitingLoad=!1,r.waitingLoadSec=0,r.clipRemainingSec=r.frameDurationSec,n.__hydraClipPeekSkipLoad=i,e.applyVideo(i),fm();let s=r.paths[r.clipIndex+1];s&&o.preloadPath(s)}else if(r.waitingLoadSec>=ek){let s={...r};In=null,VS(e,s),fm()}return}if(r.clipRemainingSec-=t,!(r.clipRemainingSec>0)){if(r.clipIndex+=1,r.clipIndex>=r.paths.length){In=null,pm(e,r);return}r.waitingLoad=!0,r.waitingLoadSec=0,r.clipRemainingSec=0,US(e,r)}}function dm(e){if(!In)return;let t=In;In=null,pm(e,t)}u();function gu(e,t){if(!e||!Number.isFinite(t)||t===0)return;let r=e.duration;if(!Number.isFinite(r)||r<=0){e.currentTime=Math.max(0,e.currentTime+t);return}let n=1/120,o=e.currentTime+t;e.loop?o=(o%r+r)%r:o=Math.min(Math.max(0,o),r-n),e.currentTime=o}function mm(e,t){t>0&&gu(e,t)}function jS(e,t=24){return Math.max(1,Math.round(e))/t}function YS(e,t,r=24){return Math.max(1,Math.round(e))*Math.max(1,Math.round(t))/r}u();function qS(e){return`${e.t}:${e.orbit}`}function lk(e,t){return`${e}|${t}`}function ck(e){let t=e.indexOf("|");return t===-1?e:e.slice(t+1)}function KS(e,t){return e?.length?e:t??[]}function QS(e,t,r,n,o){if(!Rs(e)||!r?.length)return 0;let i=cc(e),s=lc(e),l=0;for(let p of r){if(p.bleed||i!=null&&p.orbit!==i||s!=null&&p.role!==s||p.v<=t)continue;let d=lk(o,qS(p));n.has(d)||(n.add(d),l+=1)}return l}function ZS(e,t,r){let n=[...t??[],...r??[]];if(!n.length){e.clear();return}let o=new Set(n.filter(i=>!i.bleed).map(i=>qS(i)));for(let i of e)o.has(ck(i))||e.delete(i)}u();function co(e){e instanceof HTMLVideoElement&&e.paused&&e.play().catch(()=>{})}function Tn(e){e instanceof HTMLVideoElement&&!e.paused&&e.pause()}u();u();u();u();var JS=`class HexaOutputKeepaliveProcessor extends AudioWorkletProcessor {
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
`;var uk="hexa-open-output";var fk=500,pk=800,dk=2500,mk=8,e2=["analyzer","automix","hydra"],Va=null,hk=!1,sl=null;var n2=0,t2=0,hm=!1,Ui=[],gk="hexa-output-keepalive",Co=null,fa=null,bu=null,il=0,al=0;function bm(e,t){return e&&!t}function $i(e=Date.now()){return sl&&!sl.closed?!0:e<=n2}function Vi(){return typeof document>"u"||!$i()?!1:document.hidden||!document.hasFocus()}function o2(e,t){let r=Ui.filter(n=>n.id!==e);return r.push({id:e,fn:t}),r.sort((n,o)=>{let i=e2.indexOf(n.id),s=e2.indexOf(o.id);return(i===-1?99:i)-(s===-1?99:s)}),Ui.length=0,Ui.push(...r),()=>{let n=Ui.findIndex(o=>o.id===e);n>=0&&Ui.splice(n,1)}}function a2(){n2=Date.now()+dk}function gm(e=!1){if(a2(),!e&&!Vi()||hm)return;let t=performance.now();if(!(t-t2<mk)){t2=t,hm=!0;try{for(let r of Ui)r.fn()}finally{hm=!1}}}function bk(){return ym(),gm(!0),!0}function yk(){if(!hk||!Va||typeof Va.captureStream!="function")return null;try{return Va.captureStream(60)}catch{return null}}var xk="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";function ym(){if(typeof document>"u")return;if(Co)Co.paused&&Co.play().catch(()=>{});else{let o=document.createElement("audio");o.src=xk,o.loop=!0,o.volume=.001,o.setAttribute("playsinline",""),o.setAttribute("aria-hidden","true"),o.play().catch(()=>{}),Co=o}if(fa){fa.resume().catch(()=>{});return}let e=window.AudioContext||window.webkitAudioContext;if(!e)return;let t=new e,r=t.createOscillator(),n=t.createGain();n.gain.value=1e-4,r.connect(n),n.connect(t.destination),r.start(),t.resume().catch(()=>{}),fa=t,vk(t,n),il||(il=window.setInterval(()=>{$i()||_k()},2e3))}async function vk(e,t){let r=al,n=e.createGain();if(n.gain.value=0,e.audioWorklet){let i=URL.createObjectURL(new Blob([JS],{type:"application/javascript"}));try{if(await e.audioWorklet.addModule(i),r!==al||fa!==e)return;let s=new AudioWorkletNode(e,gk);s.port.addEventListener("message",()=>{Vi()&&gm()}),n.connect(s),s.connect(t),bu=s;return}catch{if(r!==al||fa!==e)return}finally{URL.revokeObjectURL(i)}}if(r!==al||fa!==e)return;let o=e.createScriptProcessor(512,1,1);o.onaudioprocess=()=>{Vi()&&gm()},n.connect(o),o.connect(t),bu=o}function _k(){al+=1,il&&(window.clearInterval(il),il=0),bu?.disconnect(),bu=null,fa?.close().catch(()=>{}),fa=null,Co&&(Co.pause(),Co.src="",Co=null)}var Sk=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>SlopMotion output</title>
<style>
  html, body { margin: 0; background: #000; height: 100%; overflow: hidden; }
  canvas, video { display: block; width: 100%; height: 100%; object-fit: contain; background: #000; }
  #hexa-output-veil {
    position: absolute; inset: 0; background: #000; opacity: 1; pointer-events: none;
    transition: opacity ${pk}ms ease;
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
  if (!openerLive() || performance.now() - lastPulse > ${fk}) veil.classList.remove("live");
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
</html>`;function Tk(){let e=window;e.__hydraOpenOutput=i2,e.__hexaPumpFromOutput=bk,e.__hexaCaptureStream=yk,e.__hydraOutputDebug=()=>({src:Va?{id:Va.id,w:Va.width,h:Va.height}:null,win:!!(sl&&!sl.closed),keepalive:!!(Co&&!Co.paused)})}var r2;function Mk(e){let t=window.__hexaOutputPlacement,r=e??r2??t;return e&&(r2=e),r}function i2(e){let t=Mk(e),r=["popup=yes","toolbar=no","menubar=no","location=no","status=no","scrollbars=no"];t&&(Number.isFinite(t.left)&&r.push(`left=${Math.round(t.left)}`),Number.isFinite(t.top)&&r.push(`top=${Math.round(t.top)}`),Number.isFinite(t.width)&&r.push(`width=${Math.round(t.width)}`),Number.isFinite(t.height)&&r.push(`height=${Math.round(t.height)}`));let n=window.open("about:blank","hexa-output",r.join(","));if(!n)return console.warn("Output window was blocked. Press D in the live session."),null;sl=n,a2(),Tk(),ym();try{n.document.open(),n.document.write(Sk),n.document.close()}catch(o){console.warn("Could not write output player document",o)}if(t&&Number.isFinite(t.left)&&Number.isFinite(t.top))try{n.moveTo(Math.round(t.left),Math.round(t.top)),Number.isFinite(t.width)&&Number.isFinite(t.height)&&n.resizeTo(Math.round(t.width),Math.round(t.height))}catch{}return n}typeof window<"u"&&(window.addEventListener(uk,()=>{i2()}),document.addEventListener("visibilitychange",()=>{document.hidden&&$i()&&ym()}));var zi=(e,t,r)=>{if(!(e instanceof HTMLVideoElement)||(e.paused||e.pause(),t<=0))return;let n=e.currentTime+t*r;e.duration&&(n<0?n=e.loop?e.duration+n%e.duration:0:n>=e.duration&&(n=e.loop?n%e.duration:e.duration)),e.currentTime=n},s2=(e,t)=>Zt(e,t,"playbackSpeed",1.25,ie().customBands);function l2(e){let{settingsRef:t,studioModeRef:r,bpmRef:n,hydraRef:o,hydraRenderBudgetKeyRef:i,syncHydraRenderBudgetRef:s,runHydraTickRef:l,hydraResizePauseRef:p,hydraResizeResumeRef:d,syncElectricNoiseTriggerTexRef:v,transitionStateRef:H,pendingVideoLoadRef:D,activeChannelRef:O,clipLoadFreezeRef:K,clipPeekDepsRef:Y,onPlaybackCueRef:fe,boomerangBridgeReadyRef:Ee,boomerangBackingRef:be,boomerangCanvasBundleRef:Fe,boomerangStateRef:Qe,boomerangCaptureFpsCapRef:Ze,boomerangMaxFramesCapRef:dt,currentSpeedSmoothedRef:kt,fxReactiveTriggerGateRef:at,reactiveTriggerDescriptorsRef:rt,electricNoiseCirclesRef:mt,electricNoiseCirclePackRef:R,neonGridBundleRef:A,neonGridBridgeReadyRef:C,neonGridRuntimeRef:f,s3OverlayBindRef:oe,throughTheStarsBundleRef:Te,throughTheStarsBridgeReadyRef:qe,lumaDustBundleRef:Ve,lumaDustBridgeReadyRef:Ne,lumaLockBundleRef:Xe,lumaLockBridgeReadyRef:Je,textLayerBundleRef:It,textLayerBridgeReadyRef:et,textLayerRuntimeRef:Ht,oscilloscopeBundleRef:bt,oscilloscopeBridgeReadyRef:yt,metalEnvBundleRef:Pt,metalEnvBridgeReadyRef:_t,perfLastPrimaryRef:Ut,perfVideoSinkRef:tr,perfPresentationLastRef:zt,perfPresentationSinkRef:br,wasStudioFrozenRef:vr,flushPendingVideoLoad:pn,getParamValue:Ft,resolvePrimaryVideoSpeed:nr,resolveStarLayerPixels:Wr,isTransportFrozen:lt,isStudioTransportRunning:kr,isVisualTransportPlaying:wt,bootstrapTransportFreeze:h,reportPresentationMode:Pr}=e,Qr=(Be,it)=>{let Ge=ie(),Ce=Ge.hydraSettings??{},St=An(Ce,"neonGrid"),er=St?.config,ft=A.current;er&&C.current&&ft&&Q1({bundle:ft,s3:cn("neonGrid"),bindState:oe.current,params:er.params,spawn:Ks(er.params),draw:Kc(er.params),dt:Be,now:it,aspect:window.innerWidth/Math.max(1,window.innerHeight),envelope:Ge.hydraEnvelopes?.[St.effectKey]??0,binding:Hr(er,"base"),bands:Ge.customBands,runtime:f.current});let Rt=Ge.hydraSettings?.fx?.gridShuffle;Rt?.enabled&&lv({envelope:Ge.hydraEnvelopes?.gridShuffle??0,binding:Hr(Rt,"base"),bands:Ge.customBands,dt:Be});let Tt=An(Ce,"throughTheStars"),ur=Tt?.config,Jr=Te.current;if(ur&&qe.current&&Jr){let Mn=Wr();d1({bundle:Jr,s3:cn("throughTheStars"),bindState:oe.current,fxCfg:ur,bands:Ge.customBands,amount:hr(Tt.effectKey,ur,Ge.customBands,jr),dt:Be,now:it,aspect:window.innerWidth/Math.max(1,window.innerHeight),pixelWidth:Mn.width,pixelHeight:Mn.height})}let dn=An(Ce,"lumaDust"),yn=dn?.config,gt=Ve.current;if(yn&&Ne.current&&gt){let Mn=Wr(),ro=O.current===0?Ge.s0?.src:Ge.s1?.src;N1({bundle:gt,s3:cn("lumaDust"),bindState:oe.current,video:ro,params:yn.params,amount:hr(dn.effectKey,yn,Ge.customBands,jr),dt:Be,now:it,aspect:window.innerWidth/Math.max(1,window.innerHeight),pixelWidth:Mn.width,pixelHeight:Mn.height,skipVideoSample:K.current})}let Lt=An(Ce,"lumaLock"),Yt=Lt?.config,Vt=Xe.current;if(Yt&&Je.current&&Vt){let Mn=Wr(),ro=O.current===0?Ge.s0?.src:Ge.s1?.src;z1({bundle:Vt,s3:cn("lumaLock"),bindState:oe.current,video:ro,params:Yt.params,amount:hr(Lt.effectKey,Yt,Ge.customBands,jr),dt:Be,now:it,skipVideoSample:K.current,pixelWidth:Mn.width,pixelHeight:Mn.height})}let fr=An(Ce,"textLayer"),ko=fr?.config,ir=It.current;ko&&et.current&&ir&&i1({bundle:ir,s3:cn("textLayer"),bindState:oe.current,fxCfg:ko,bands:Ge.customBands,amount:hr(fr.effectKey,ko,Ge.customBands,jr),now:it,envelope:Ge.hydraEnvelopes?.[fr.effectKey]??0,binding:Hr(ko,"base"),runtime:Ht.current,shouldBind:!0})},_r=0,Fr=0,Or=performance.now(),Qt=kt.current,or=0,Sr=0,ar=0,Tr=(Be=!1)=>{let it=o.current;if(!it?.synth)return;let Ge=lt(),Ce=wt(),St=!Ge&&(Be||at.current),er=bm(document.hidden,$i()),ft=`${er?"h":"v"}-${Ge?"f":Ce?"p":"s"}-${St?"r":"i"}`;if(i.current!==ft){if(i.current=ft,er){tl(it.synth,0),it.synth.fps=2;return}if(Ge){tl(it.synth,0),it.synth.fps=void 0;return}if(!Ce){tl(it.synth,0),it.synth.fps=St?30:4;return}tl(it.synth,1),it.synth.fps=void 0}};s.current=Tr;let Lr=()=>{i.current="",Tr(),Vi()||Zr(0)},xr=()=>{_r&&cancelAnimationFrame(_r),Fr&&clearTimeout(Fr),_r=0,Fr=0};p.current=()=>xr(),v.current=()=>{let Be=performance.now();mt.current.length>0?R.current=tx(mt.current,Be):R.current={count:0,slots:[]},nx(R.current.slots)};let Zr=Be=>{if(!(Pn()&&(Jl(),Pn()))){if(xr(),Vi()){Fr=window.setTimeout(()=>{Fr=0,F(performance.now())},50);return}if(Be>0){Fr=window.setTimeout(()=>{Fr=0,_r=requestAnimationFrame(F)},Be);return}_r=requestAnimationFrame(F)}};d.current=()=>Zr(0),document.addEventListener("visibilitychange",Lr),window.addEventListener("focus",Lr);let Gn=Be=>{Ut.current!==Be&&(Ut.current=Be,tr.current?.(Be))},tn=tS(),Jn={},rn={},$o=(Be,it=!0)=>{if(rS(tn),Be.hydraEnvelopes={},Be.hydraEnvelopePhaseU={},Be.hydraTriggerCounts={},Be.vibrationAmp=0,Sr=0,Be.degaussAmp=0,ar=0,Gi()){let Ge=Y.current;Ge?um(Ge):HS()}if(Wi()){let Ge=Y.current;Ge?dm(Ge):$S()}pu()&&rm(),it&&(mt.current=Ec(),R.current={count:0,slots:[]})},Eo=Be=>cS(!!Be?.fx?.boomerang?.enabled,Ee.current,be.current,Fe.current),Ro=Be=>{if(!wt()||K.current)return;let it=ie(),Ge=it.hydraSettings,Ce=Eo(Ge),St=Ce&&ua(Qe.current);if(!hS(St,Be)){if(Be==="boomerang"){if(!Ge?.fx?.boomerang?.enabled)return;let ft=Qe.current;if(ua(ft))return;if(!Ce){ft.pendingTrigger=!0;return}jd(ft);return}if(Be==="jumpCut"){if(!Ge?.fx?.jumpCut?.enabled)return;let ft=YS(Ft("jumpCut","skipFrames",2),Ft("jumpCut","jumpCuts",1));for(let Rt of $d(Ce,be.current,it.s0?.src,it.s1?.src))mm(Rt,ft);Ce&&zd(Fe.current,be.current.v0,be.current.v1),it.s2?.src instanceof HTMLVideoElement&&mm(it.s2.src,ft);return}if(Be==="stutterBack"){if(!Ge?.fx?.stutterBack?.enabled)return;let ft=Ft("stutterBack","backFrames",6),Rt=jS(ft);for(let ur of $d(Ce,be.current,it.s0?.src,it.s1?.src))gu(ur,-Rt);Ce&&zd(Fe.current,be.current.v0,be.current.v1);let Tt=it.s2?.src;Tt instanceof HTMLVideoElement&&gu(Tt,-Rt);return}if(Be==="clipPeek"){let er=Ge?.fx?.clipPeek,ft=Y.current;if(!er?.enabled||!ft||Gi()||Wi())return;let Rt=lm(Ft("clipPeek","holdSec",.35)),Tt=cm(Ft("clipPeek","steps",1));NS(ft,Tt,Rt);return}if(Be==="zap"){let er=Ge?.fx?.zap,ft=Y.current;if(!er?.enabled||!ft||Gi()||Wi())return;let Rt=Math.max(1,Math.min(8,Math.round(Ft("zap","clipCount",3)))),Tt=Math.max(1,Math.min(12,Math.round(Ft("zap","framesPerClip",4))));zS(ft,Rt,Tt)}}},bn=(Be,it)=>{let Ce=ie().triggerDebugStudio?.playbackSec??it/1e3,St=Math.max(30,n.current);if(sS({timeSec:Ce,beat:lS(Ce,St),channel:"fx",fxKey:Be,intensity:1}),Be==="clipPeek"||Be==="zap"||Be==="jumpCut"||Be==="stutterBack"||Be==="boomerang"){Ro(Be);return}if(My(Be,ie().hydraSettings??{})==="neonGrid"){let ft=A.current,Rt=An(ie().hydraSettings??{},"neonGrid");ft&&Rt&&Bi(ft,Ks(Rt.config.params))}if(Be.startsWith("playbackCue:frame")){let ft=Number.parseInt(Be.slice(17),10),Rt=ie().hydraSettings?.fx?.playbackCue;if(!Rt?.enabled||!Number.isFinite(ft)||ft<1||ft>4)return;let Tt=Rt.params??{},ur=lu(Tt);if(ft>ur)return;let Jr=xS(Tt,ft);fe.current?.(ft,Jr,Math.max(.05,Ft("playbackCue","holdSec",.35)),Tt)}},zo=Be=>Be==="slowmo"?$p(Ft("slowmo","duration",wi)):Be==="accelerate"?Up(Ft("accelerate","duration",Li)):null,eo=(Be,it)=>{if(Be==="slowmo"){let Ge=Ft("slowmo","duration",wi);ie().slowmoPulseUntilMs=it+fy(Ge)*1e3}else if(Be==="accelerate"){let Ge=Ft("accelerate","duration",Li);ie().acceleratePulseUntilMs=it+ly(Ge)*1e3}},cr=Be=>{if(!ci(Be))return;let it=performance.now(),Ce=ie().hydraSettings?.fx?.[Be];if(!Ce?.enabled)return;let St=Hr(Ce,"base"),er=zo(Be),ft=er??Ep(St,Ti(ie().hydraModulation?.config)),Rt=St.trigger?.delay??0;au(tn,Be,it,ft,Rt),bn(Be,it),er&&eo(Be,it)},Wn=Be=>{ex(mt.current,Be)};ie().__hydraFireFxTrigger=cr;let to=(Be,it,Ge,Ce,St)=>{let er=Be.paramKey??"base",ft=Hr(it,er);if(!Xr(ft)||ft.source==="none")return;let Rt=Be.key,Tt=ie(),ur=wo(ft.source,Tt.customBands,ft.depth),Jr=Rs(ft.source)?QS(ft.source,ft.trigger.threshold,KS(Tt.studioStemEventsStep,Tt.studioEventPulses),tn.stemHitsSeen,Rt):0,dn=zo(Be.fxKey),yn=dn??Ep(ft,Ti(ie().hydraModulation?.config)),gt=oS(tn,{key:Rt,bandVal:ur,stemHits:Jr,trigger:ft.trigger,envelope:yn,nowMs:Ge,dt:Ce,onFire:Lt=>{bn(Lt,Ge),dn&&eo(Be.fxKey,Ge),Be.fxKey==="electricNoise"&&!Be.paramKey&&Wn(Ge)}});if(gt!=null&&(St[Rt]=gt),ft.envelopeRef&&ft.mode==="envelope"){let Lt=parseInt(ft.envelopeRef.slice(3),10),Yt=tn.envelopes[Rt]??0,Vt=Jn[Lt]??0;Yt>Vt&&(Jn[Lt]=Yt,rn[Lt]=gt??0)}},uo=Math.max(.04,1/24),Yr=(Be,it)=>{Be.loop&&typeof Be.duration=="number"&&Number.isFinite(Be.duration)&&Be.duration>0&&(Be.ended||Be.currentTime>=Be.duration-uo)&&(Be.currentTime=0,it&&Be.play().catch(()=>{}))},fo=(Be,it,Ge)=>{Be instanceof HTMLVideoElement&&(Ge?Be.paused&&Be.play().catch(()=>{}):Be.paused||Be.pause(),Be.playbackRate=it,Yr(Be,Ge))},Un=Be=>{let it=ie(),Ge=it.s2?.src;if(!(Ge instanceof HTMLVideoElement))return;if(LS()){Ge.paused||Ge.pause();return}Be&&Ge.paused&&Ge.play().catch(()=>{});let Ce=nl(it.hydraSettings?.fx);Ge.playbackRate=Ce?s2(Ce.key,Ce.config):1,Yr(Ge,Be)},F=Be=>{if(Pn())return;!H.current.active&&D.current&&pn();let it=Math.min((Be-Or)/1e3,.1);Or=Be;let Ge=lt(),Ce=t.current.isVideoPlaying===!1&&!kr(),St=Ge||Ce,er=Y.current;!St&&er&&(Gi()?GS(er,it):Wi()?XS(er,it):pu()&&AS(it)),St||Qr(it,Be);let{s0:ft,s1:Rt,hydraSettings:Tt,customBands:ur}=ie(),Jr=nS(tn)||mt.current.length>0;if(bm(document.hidden,$i())){Tr(Jr),Zr(500);return}if(Ge&&vr.current===!1)o.current&&(h(),vr.current=!0);else if(vr.current&&!Ge){i.current="",Tr(Jr),l.current(16.67);let b=ie();co(b.s0?.src),co(b.s1?.src),co(b.s2?.src),co(be.current?.v0),co(be.current?.v1),vr.current=!1}else Ge||(vr.current=!1);if(St){let b=ie();if(Tn(b.s2?.src),Tn(b.s0?.src),Tn(b.s1?.src),Tn(be.current?.v0),Tn(be.current?.v1),Ge?$o(b,!1):An(Tt??{},"neonGrid")||(b.hydraEnvelopes={},b.hydraEnvelopePhaseU={},b.hydraTriggerCounts={},b.slowmoTrailMix=0),!r.current){b.customBands={kick:0,snare:0,hat:0,bass:0,vocals:0,low:0,mid:0,high:0,beat:0,rhythm:0,specFast:0,specSlow:0,master:0},ie().masterLevel=0,ie().masterDbfs=-96,i.current="",Tr(!1),Zr(250);return}}Tr(!1);let dn=ie().hydraSettings,yn=Ee.current&&dn?.fx?.boomerang?.enabled;if(ft&&Rt&&!yn){let b=O.current===0?ft:Rt;b.src instanceof HTMLVideoElement&&(b.src.loop=!0)}else if(ft&&Rt&&yn){let b=be.current.v0,Pe=be.current.v1;b&&(b.loop=!0),Pe&&(Pe.loop=!0)}let gt=Jr;if(!!Tt?.fx&&(at.current||gt)){let b=ie();b.studioStemHitsReset&&(tn.stemHitsSeen.clear(),b.studioStemHitsReset=!1);let Pe=rt.current,M={},B=Tt.fx;for(let X of Object.keys(Jn))delete Jn[Number(X)];for(let X of Object.keys(rn))delete rn[Number(X)];for(let X=0;X<Pe.length;X++){let te=Pe[X],se=te.config??B[te.fxKey];!se||!se.enabled||to(te,se,Be,it,M)}ZS(tn.stemHitsSeen,b.studioStemEventsStep,b.studioEventPulses),ie().hydraEnvelopes=tn.envelopes,ie().hydraEnvelopePhaseU=M,ie().hydraTriggerCounts=tn.counts;let G=ie();G.hydraModulation&&(G.hydraModulation.eg={...Jn},G.hydraModulation.egOneShotPhase={...rn})}else Tt?.fx&&(ie().hydraEnvelopes={},ie().hydraEnvelopePhaseU={},ie().hydraTriggerCounts={});if(Tt){let b=ur??{kick:0,snare:0,hat:0,bass:0,vocals:0,low:0,mid:0,high:0,beat:0,rhythm:0,specFast:0,specSlow:0,master:0};v.current(),ie().low=b.low||0,ie().mid=b.mid||0,ie().high=b.high||0,ie().beat=b.beat||0,typeof b.kick=="number"&&(ie().kick=b.kick),ie().masterLevel=typeof b.master=="number"?b.master:ie().masterLevel??0;let Pe=Tt.fx?.vibration;if(Pe?.enabled){let B=Jx(Pe,tn.envelopes.vibration??0,X=>_n("vibration",X,b)),G=Kx(Pe,B);Sr=Qx(Sr,G,Pe),ie().vibrationAmp=Sr}else Sr*=.88,ie().vibrationAmp=Sr;let M=Tt.fx?.degauss;if(M?.enabled){let B=Yx(M,tn.envelopes.degauss??0,X=>_n("degauss",X,b)),G=zx(M,B);ar=Xx(ar,G,M),ie().degaussAmp=ar}else ar*=.86,ie().degaussAmp=ar}if(!Tt||!ft||!Rt){Gn(null),Pr("idle"),Zr(250);return}let Yt=!!Tt.fx?.boomerang?.enabled&&Ee.current&&!!be.current.v0&&!!be.current.v1&&!!Fe.current;if(!Yt&&ua(Qe.current)&&Xd(Qe.current),!Yt&&!(ft.src instanceof HTMLVideoElement&&Rt.src instanceof HTMLVideoElement)){Gn(null),Pr("idle"),Zr(250);return}let Vt=Yt?be.current.v0:ft.src,fr=Yt?be.current.v1:Rt.src;Gn(Vt);let ko=nr(Vt.duration);Qt=hy(ko,Qt,gy(Tt.fx)),kt.current=Qt,(or++&7)===0&&RS(Qt);let ir=wt()&&!K.current,Mn=Tt.fx?.clipPeek,ro=Y.current;!Mn?.enabled&&Gi()&&ro&&um(ro);let $a=Tt.fx?.zap,pa=Y.current;!$a?.enabled&&Wi()&&pa&&dm(pa),!Tt.fx?.playbackCue?.enabled&&pu()&&rm();let Ur=Fe.current,po=Tt.fx?.boomerang,mo=Qe.current;Yt&&po?.enabled&&mo.pendingTrigger&&!ua(mo)&&jd(mo);let Cn=Yt&&!!po?.enabled&&ua(mo);if(Yt&&po?.enabled&&Ur&&ir&&!Cn){let b=Qe.current;(b.phase!=="forward"||b.frames.frames0.length>0||b.segmentEnd0>0||b.capturePending||b.completeAfterReverse)&&Xd(b),Qt>=sa?(fo(Vt,Qt,ir),fo(fr,Qt,ir)):(zi(Vt,Qt,it),zi(fr,Qt,it)),Ga(Ur.ctx0,Ur.c0,Vt),Ga(Ur.ctx1,Ur.c1,fr),Un(ir)}else if(Cn&&po?.enabled&&Ur&&ir){let b=Qe.current,Pe=dS(Ft("boomerang","segmentSec",1.25)),M=Math.max(24,Math.min(180,Math.round(Ft("boomerang","maxFrames",60)),dt.current)),B=Math.max(12,Math.min(60,Ft("boomerang","captureFps",24),Ze.current)),G=()=>{Vt.currentTime=b.segmentStart0,fr.currentTime=b.segmentStart1,su(b.frames),b.active=!1,b.phase="forward",b.segmentEnd0=0,b.reverseIdx=-1,b.captureAccum=0,b.completeAfterReverse=!1};if(b.phase==="reverse"||b.phase==="replay"){Vt.pause(),fr.pause();let X=b.reverseIdx,te=X>=0?b.frames.frames0[X]:null,se=X>=0?b.frames.frames1[X]:null;if(X>=0&&te&&se)if(Yd(Ur.ctx0,Ur.c0,te),Yd(Ur.ctx1,Ur.c1,se),b.phase==="reverse"){let{cycleDone:ge}=uS(b,it,B);ge&&G()}else fS(b,it,B);else G()}else{if(!Number.isFinite(b.segmentEnd0)||b.segmentEnd0<=b.segmentStart0+1e-4){b.segmentStart0=Vt.currentTime,b.segmentStart1=fr.currentTime;let te=Vt.duration,se=b.segmentStart0+Pe;Number.isFinite(te)&&te>0&&(se=Math.min(se,te-1/120)),b.segmentEnd0=Math.max(b.segmentStart0+.05,se)}if(ir&&Qt>=sa){Vt.paused&&Vt.play().catch(()=>{}),fr.paused&&fr.play().catch(()=>{}),Vt.playbackRate=Qt,fr.playbackRate=Qt;let te=ie().s2;if(te&&te.src instanceof HTMLVideoElement){te.src.paused&&te.src.play().catch(()=>{});let se=nl(Tt.fx);se?te.src.playbackRate=s2(se.key,se.config):te.src.playbackRate=1}Yr(Vt,ir),Yr(fr,ir)}else ir?(Vt.paused||Vt.pause(),fr.paused||fr.pause(),zi(Vt,Qt,it),zi(fr,Qt,it)):(Vt.paused||Vt.pause(),fr.paused||fr.pause());Ga(Ur.ctx0,Ur.c0,Vt),Ga(Ur.ctx1,Ur.c1,fr);let X=Math.max(.03,1/B);if(Vt.currentTime>=b.segmentEnd0-X)b.frames.frames0.length>=2?(b.phase="reverse",b.completeAfterReverse=!1,Vt.pause(),fr.pause(),b.reverseIdx=b.frames.frames0.length-1,b.captureAccum=0):G();else{b.captureAccum+=it;let te=1/B;b.captureAccum>=te&&!b.capturePending&&b.frames.frames0.length<M&&(b.captureAccum-=te,b.capturePending=!0,pS(Vt,fr,b.frames,M).finally(()=>{b.capturePending=!1}))}}Un(ir)}else if(ir&&Qt>=sa&&!document.hidden){let b=ie();fo(b.s0?.src,Qt,ir),fo(b.s1?.src,Qt,ir),Un(ir)}else if(ir){let b=ie();zi(b.s0?.src,Qt,it),zi(b.s1?.src,Qt,it),Un(ir)}else{let b=ie();Tn(b.s0?.src),Tn(b.s1?.src),Un(!1)}let Xo="decoder";if(Cn&&po?.enabled&&Ur&&ir){let b=Qe.current;(b.phase==="reverse"||b.phase==="replay"||Qt<sa)&&(Xo="manualSeek")}else Qt<sa&&(Xo="manualSeek");Pr(Xo);let ho=An(Tt,"oscilloscope"),En=ho?.config;if(!!En&&yt.current&&bt.current){let b=ie(),Pe=bt.current;mn(cn("oscilloscope"),Pe.canvas,"oscilloscope",oe.current);let M=b.studioOscilloscopePeaks,B=b.studioOscilloscopeDurationSec??0,G=b.studioOscilloscopeTimeSec??0;if(r.current&&M&&M.length>0&&B>0&&(b.studioTransportActive||G>0))J_(Pe,M,B,G);else{let ge=b.oscilloscopeLiveRef?.current?.spectrum,Ue=0;if(ge&&ge.length>8){let Ke=Math.max(1,Math.floor(ge.length/64));for(let st=0;st<ge.length;st+=Ke)Ue+=ge[st]}Ue<64&&e1(Pe,b.customBands??{},performance.now()*.003)}let X=Z_(En.params),te=(se,ge)=>Zt(ho.effectKey,En,se,ge,ie().customBands,"oscilloscope");t1(cn("oscilloscope"),Pe,{persistence:te("persistence",.72),positionY:te("positionY",.88),scale:te("scale",.55),mode:Math.round(te("mode",0)),colorLo:X.colorLo,colorMid:X.colorMid,colorHi:X.colorHi},performance.now())}let go=Tt.fx?.metalSphere;go?.enabled&&(go.base??0)>.01&&!j1(Number(go.params?.envMap??0))&&_t.current&&Pt.current&&q1(ie().s3,Vt,Pt.current,{now:performance.now(),videoPath:t.current.video??""}),Zr(0)},Bn=o2("hydra",()=>{F(performance.now())});return Zr(0),Tr(),()=>{Bn(),document.removeEventListener("visibilitychange",Lr),window.removeEventListener("focus",Lr),delete ie().__hydraFireFxTrigger,s.current=()=>{},p.current=null,d.current=null,v.current=()=>{},xr(),Gn(null),zt.current=null,br.current?.("idle")}}u();function c2(e){let{settingsRef:t,activeChannelRef:r,transitionStateRef:n,pendingVideoLoadRef:o,currentVideoRef:i,videoLoadSeqRef:s,clipLoadFreezeRef:l,secondaryVideoRef:p,boomerangBridgeReadyRef:d,boomerangBackingRef:v,boomerangStateRef:H,syncPlaybackRef:D,applySceneAndRenderRef:O,bumpLumaDustReset:K,teardownBoomerangBridge:Y,isPrimaryPlaybackActive:fe}=e,Ee=()=>{if(!n.current.active)return;let{s0:Qe,s1:Ze}=ie();if(!Qe||!Ze)return;let dt=performance.now()-n.current.startTime,kt=Math.max(1,n.current.duration),at=Math.min(1,dt/kt),rt=r.current===0?1:0;at>=.5&&(r.current=rt),n.current.active=!1;let mt=fe(),R=r.current===0?Ze:Qe,A=r.current===0?Qe:Ze;Tn(R.src),mt&&co(A.src)},be=()=>{let Qe=o.current;!Qe||n.current.active||(o.current=null,!mr(Qe,i.current??"")&&Fe(!1))},Fe=Qe=>{let Ze=!1,dt=t.current,{s0:kt,s1:at}=ie();if(!kt||!at||!dt.video)return()=>{Ze=!0};let rt=()=>{if(d.current||!(kt.src instanceof HTMLVideoElement)||!(at.src instanceof HTMLVideoElement)){Y({reloadPath:dt.video,restoreBacking:!1});return}d.current=!1,v.current={v0:null,v1:null}},mt=ie().__hydraClipPeekSkipLoad;if(mt&&mr(mt,dt.video)){delete ie().__hydraClipPeekSkipLoad,delete ie().__hydraInstantVideoLoad,i.current=dt.video,D.current(),O.current();let bt=p.current,{s2:yt}=ie();return yt&&bt&&yt.initVideo(bt),()=>{Ze=!0}}let R=IS(dt.video);if(FS()&&!R)return n.current.active=!1,o.current=null,delete ie().__hydraInstantVideoLoad,i.current=dt.video,D.current(),O.current(),()=>{Ze=!0};let A=i.current,C=A===null||!A||!mr(A,dt.video);if(!Qe&&!C)return D.current(),O.current(),()=>{Ze=!0};K(),(Qe||o.current&&mr(o.current,dt.video))&&(o.current=null);let f=fe(),oe=BS();oe&&(n.current.active=!1,o.current=null,l.current=!1),Qe&&(l.current=!1);let Te=dt.fx?.transition,qe=mS({playing:f,force:Qe,instantLoad:oe,loadedPath:A,transitionEnabled:!!Te?.enabled,boomerangEngaged:ua(H.current)});if(qe&&n.current.active)return o.current=dt.video,()=>{Ze=!0};let Ve=++s.current,Ne=qe,Xe=Qe||oe||C&&A!=null&&!!A&&!Ne,Je=()=>{let bt=p.current,{s2:yt}=ie();if(!yt||!bt)return;yt.initVideo(bt);let Pt=()=>{let Ut=yt.src;if(Ut instanceof HTMLVideoElement)if(Ut.muted=!0,Ut.loop=!0,f)Ut.play().catch(()=>{});else{try{Ut.currentTime=0}catch{}Ut.pause()}},_t=yt.src;_t instanceof HTMLVideoElement&&_t.readyState>=2?Pt():_t instanceof HTMLVideoElement?_t.addEventListener("loadeddata",Pt,{once:!0}):setTimeout(Pt,500)};if(Xe){n.current.active=!1,rt();let bt=r.current===0?kt:at,yt=r.current===0?at:kt,Pt=!1;Ua(!0);let _t=()=>{if(Pt||(Pt=!0,Ze||s.current!==Ve))return;let zt=yt.src;if(!(zt instanceof HTMLVideoElement)){l.current=!1,Ua(!1);return}if(zt.muted=!0,zt.loop=!0,fe())zt.play().catch(()=>{});else{try{zt.currentTime=0}catch{}zt.pause()}r.current=r.current===0?1:0;let br=bt.src;br instanceof HTMLVideoElement&&br!==zt&&br.pause(),i.current=dt.video,fu(),D.current(),Je(),l.current=!1,Ua(!1),O.current()},Ut=()=>{if(Ze||s.current!==Ve||Pt)return;let zt=yt.src;if(!(zt instanceof HTMLVideoElement)){requestAnimationFrame(Ut);return}if(zt.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA)_t();else{let br=()=>_t();zt.addEventListener("loadeddata",br,{once:!0}),zt.addEventListener("canplay",br,{once:!0})}};yt.initVideo(dt.video),Ut();let tr=window.setTimeout(()=>{if(Ze||s.current!==Ve||Pt)return;Pt=!0,l.current=!0,Tn(kt.src),Tn(at.src),kt.initVideo(dt.video),at.initVideo(dt.video),i.current=dt.video,r.current=0;let zt=()=>{if(Ze||s.current!==Ve)return;let vr=kt.src,pn=at.src;if(!(vr instanceof HTMLVideoElement)||!(pn instanceof HTMLVideoElement)){l.current=!1,Ua(!1);return}for(let Ft of[vr,pn])Ft.muted=!0,Ft.loop=!0,fe()?Ft.play().catch(()=>{}):Ft.pause();D.current(),Je(),l.current=!1,Ua(!1),O.current()},br=()=>{if(Ze||s.current!==Ve)return;let vr=kt.src,pn=at.src;if(!(vr instanceof HTMLVideoElement)||!(pn instanceof HTMLVideoElement)){requestAnimationFrame(br);return}zt()};br()},3e3);return()=>{Ze=!0,window.clearTimeout(tr),l.current=!1,Ua(!1)}}if(Ne){n.current.active&&Ee(),rt();let bt=r.current===0?kt:at,yt=r.current===0?at:kt,Pt=bt.src,_t=Pt instanceof HTMLVideoElement&&Number.isFinite(Pt.currentTime)?Pt.currentTime:0,Ut=Math.max(.05,Zt("transition",Te,"duration",1,ie().customBands)),tr=()=>{if(Ze||s.current!==Ve)return;let Ft=yt.src;if(!(Ft instanceof HTMLVideoElement))return;Ft.muted=!0,Ft.loop=!0;let nr=!1,Wr=()=>{if(nr||(nr=!0,Ze||s.current!==Ve))return;if(l.current=!1,f){Ft.play().catch(()=>{});let wt=bt.src;wt instanceof HTMLVideoElement&&wt.paused&&wt.play().catch(()=>{})}else Ft.pause();D.current();let kr=Eh(Number(Te.params?.type??0));n.current={active:!0,startTime:performance.now(),duration:Ut*1e3,resolvedType:kr},Je(),O.current()},lt=()=>{if(fu()||!Number.isFinite(_t)||_t<0)return;let kr=Ft.duration;Number.isFinite(kr)&&kr>0?Ft.currentTime=_t%kr:Ft.currentTime=_t};Ft.readyState>=HTMLMediaElement.HAVE_METADATA?lt():Ft.addEventListener("loadedmetadata",lt,{once:!0}),Ft.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Wr():(Ft.addEventListener("loadeddata",Wr,{once:!0}),Ft.addEventListener("canplay",Wr,{once:!0}))},zt=!1,br=()=>{zt||(zt=!0,tr())},vr=()=>{if(Ze||s.current!==Ve)return;if(!(yt.src instanceof HTMLVideoElement)){requestAnimationFrame(vr);return}br()};yt.initVideo(dt.video),i.current=dt.video,vr();let pn=window.setTimeout(()=>{if(Ze||s.current!==Ve||zt)return;zt=!0,n.current.active=!1,rt(),l.current=!0,Tn(kt.src),Tn(at.src),kt.initVideo(dt.video),at.initVideo(dt.video),i.current=dt.video,r.current=0;let Ft=()=>{if(Ze||s.current!==Ve)return;let Wr=kt.src,lt=at.src;if(!(Wr instanceof HTMLVideoElement)||!(lt instanceof HTMLVideoElement)){l.current=!1;return}for(let kr of[Wr,lt])kr.muted=!0,kr.loop=!0,fe()?kr.play().catch(()=>{}):kr.pause();D.current(),Je(),O.current(),l.current=!1},nr=()=>{if(Ze||s.current!==Ve)return;let Wr=kt.src,lt=at.src;if(!(Wr instanceof HTMLVideoElement)||!(lt instanceof HTMLVideoElement)){requestAnimationFrame(nr);return}Ft()};nr()},4e3);return()=>{Ze=!0,window.clearTimeout(pn),l.current=!1}}n.current.active=!1,rt(),l.current=!0,Tn(kt.src),Tn(at.src),kt.initVideo(dt.video),at.initVideo(dt.video),i.current=dt.video,r.current=0;let It=()=>{if(Ze||s.current!==Ve)return;let bt=kt.src,yt=at.src;if(!(bt instanceof HTMLVideoElement)||!(yt instanceof HTMLVideoElement)){l.current=!1;return}for(let Pt of[bt,yt])if(Pt.muted=!0,Pt.loop=!0,fe())Pt.play().catch(()=>{});else{try{Pt.currentTime=0}catch{}Pt.pause()}fu(),D.current(),n.current.active=!1,r.current=0,Je(),l.current=!1,O.current()},et=()=>{if(Ze||s.current!==Ve)return;let bt=kt.src,yt=at.src;if(!(bt instanceof HTMLVideoElement)||!(yt instanceof HTMLVideoElement)){requestAnimationFrame(et);return}if(bt.readyState>=2&&yt.readyState>=2){It();return}let Pt=0,_t=()=>{Pt-=1,Pt<=0&&It()};bt.readyState<2&&(Pt+=1,bt.addEventListener("loadeddata",_t,{once:!0}),bt.addEventListener("canplay",_t,{once:!0})),yt.readyState<2&&(Pt+=1,yt.addEventListener("loadeddata",_t,{once:!0}),yt.addEventListener("canplay",_t,{once:!0})),Pt<=0&&It()},Ht=window.setTimeout(()=>{Ze||s.current!==Ve||It()},2e3);return et(),()=>{Ze=!0,window.clearTimeout(Ht),l.current=!1}};return{loadPrimaryVideos:Fe,flushPendingVideoLoad:be}}u();function vm(e,t,r,n){let o=n??t,i=Hr(r,"base");Xr(i)&&e.push({key:t,fxKey:t,config:r});let s=r.paramSync;if(!s)return;let l=o==="playbackCue"?lu(r.params):void 0;for(let p of Object.keys(s)){if(l!=null){let v=Number.parseInt(p.replace(/^frame/,""),10);if(p.startsWith("frame")&&Number.isFinite(v)&&v>l)continue}let d=Hr(r,p);Xr(d)&&e.push({key:`${t}:${p}`,fxKey:t,paramKey:p,config:r})}}function Ek(e,t,r){for(let[n,o]of Object.entries(r))if(o?.enabled){for(let i of o.layerIds){let s=t[i];s?.config.enabled&&vm(e,Pa(n,i),s.config,s.templateKey)}o.composite?.enabled&&vm(e,`group:${n}`,o.composite)}}function u2(e,t){if(!e||typeof e!="object")return[];let r=[];for(let n of Object.keys(e)){let o=e[n],i=Hs(n,o)??o;!i||!i.enabled||vm(r,n,i)}return t?.layerInstances&&t?.fxGroups&&Ek(r,t.layerInstances,t.fxGroups),r}u();function _m(e){return e.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA&&e.videoWidth>0&&e.videoHeight>0}function f2(){let e=window;if(e.__hydraInitVideoPatched)return;let t=e.s0;if(!t)return;let r=Object.getPrototypeOf(t);if(!r||typeof r.initVideo!="function")return;e.__hydraInitVideoPatched=!0;let n=r.tick;typeof n=="function"&&(r.tick=function(i){let s=this.src;if(!(this.dynamic&&s instanceof HTMLVideoElement&&!_m(s)))return n.call(this,i)}),r.initVideo=function(i="",s){let l=this;l.dynamic=!1;let p=l.src;if(l.src=null,p instanceof HTMLVideoElement)try{p.pause(),p.removeAttribute("src"),p.load()}catch{}if(!i){l.tex=l.regl.texture({shape:[1,1]});return}let d=l._hydraVideoLoadSeq=(l._hydraVideoLoadSeq??0)+1,v=document.createElement("video");v.crossOrigin="anonymous",v.autoplay=!1,v.loop=!0,v.muted=!0,v.playsInline=!0,v.preload="auto";let H=()=>{if(l._hydraVideoLoadSeq===d){if(!_m(v)){requestAnimationFrame(H);return}l.src=v,xy(v),l.tex=l.regl.texture({data:v,...s}),l.dynamic=!0;try{l.tex.subimage?.(v)}catch{}}},D=()=>{if(l._hydraVideoLoadSeq===d){try{v.currentTime=0}catch{}v.pause(),H()}},O=()=>{if(l._hydraVideoLoadSeq===d){if(vy()){v.play().then(H).catch(H);return}if(_m(v)){D();return}requestAnimationFrame(D)}};v.addEventListener("loadeddata",O,{once:!0});let K=tb(i),Y=K.length>0?K:[Ls(i)],fe=Ee=>{if(l._hydraVideoLoadSeq===d){if(Ee>=Y.length){l.dynamic=!1;return}v.src=Y[Ee],v.addEventListener("error",()=>{l._hydraVideoLoadSeq===d&&fe(Ee+1)},{once:!0})}};fe(0)}}u();function Rk(e,t){if(this.width===e&&this.height===t&&this.canvas.width===e&&this.canvas.height===t){Ug()?np(this,e,t):Pn()&&Jl();return}np(this,e,t)}function p2(e){let t=window;if(t.__hydraSynthDebugPatched)return;let r=Object.getPrototypeOf(e);!r||typeof r.setResolution!="function"||(t.__hydraSynthDebugPatched=!0,r.setResolution=Rk)}u();function kk(){if(typeof window>"u")return{width:1920,height:1080};let e=window.visualViewport,t=e?.width&&e.width>0?e.width:window.innerWidth,r=e?.height&&e.height>0?e.height:window.innerHeight;return{width:Math.max(1,Math.round(t)),height:Math.max(1,Math.round(r))}}function d2(e,t){let r=Math.min(typeof window<"u"&&window.devicePixelRatio||1,t),n=e?.clientWidth??0,o=e?.clientHeight??0,{width:i,height:s}=n>0&&o>0?{width:n,height:o}:kk();return{width:Math.max(2,Math.round(i*r)),height:Math.max(2,Math.round(s*r)),dpr:r}}u();function Pk(e,t,r){let n=new Set;for(let o of r){if(!o.isActive())continue;let i=e.o[o.outputIndex];if(!i)continue;n.add(o.outputIndex);let s=o.maxSteps??4,l=Math.max(1,Math.min(s,Math.round(o.simSteps())));for(let p=0;p<l;p++)i.tick(t);o.afterSimFrame?.()}for(let o=0;o<e.o.length;o++)n.has(o)||e.o[o].tick(t)}function m2(e,t){return function(n){try{let o=e.synth.speed;if(e.sandbox.tick(),o===0&&(e.synth.speed=0),e.detectAudio===!0&&e.synth.a?.tick(),e.sandbox.set("time",e.synth.time+=n*.001*e.synth.speed),e.timeSinceLastUpdate+=n,!e.synth.fps||e.timeSinceLastUpdate>=1e3/e.synth.fps){if(e.synth.stats.fps=Math.ceil(1e3/e.timeSinceLastUpdate),e.synth.update)try{e.synth.update(e.timeSinceLastUpdate)}catch{}for(let s=0;s<e.s.length;s++)e.s[s].tick(e.synth.time);let i={time:e.synth.time,mouse:e.synth.mouse,bpm:e.synth.bpm,resolution:[e.canvas.width,e.canvas.height]};if(Pk(e,i,t),e.isRenderingAll?e.renderAll({tex0:e.o[0].getCurrent?.()??e.o[0],tex1:e.o[1].getCurrent?.()??e.o[1],tex2:e.o[2].getCurrent?.()??e.o[2],tex3:e.o[3].getCurrent?.()??e.o[3],resolution:[e.canvas.width,e.canvas.height]}):e.renderFbo({tex0:e.output.getCurrent(),resolution:[e.canvas.width,e.canvas.height]}),e.synth.afterUpdate)try{e.synth.afterUpdate(e.timeSinceLastUpdate)}catch{}e.timeSinceLastUpdate=0}e.saveFrame===!0&&(e.canvasToImage(),e.saveFrame=!1)}catch(o){console.warn("Error during tick():",o)}}}u();u();var g2="hydra-midi-debug-in-v1";function Fk(e){try{let t=sessionStorage.getItem(e);if(!t)return[];let r=JSON.parse(t);return Array.isArray(r)?r.filter(n=>typeof n=="string").slice(-120):[]}catch{return[]}}function Ok(e,t){try{sessionStorage.setItem(e,JSON.stringify(t))}catch{}}var b2=Fk(g2),Sm=0;function h2(){Sm!==0&&typeof window<"u"&&(window.clearTimeout(Sm),Sm=0),Ok(g2,b2)}typeof window<"u"&&(window.addEventListener("pagehide",h2),window.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&h2()}));function Ik(){return b2.slice()}typeof window<"u"&&(window.__HYDRA_MIDI_DEBUG__={in:Ik});function Bk(e){if(!e||typeof e!="object")return!1;for(let t of Object.keys(e)){let r=e[t];if(!r||typeof r!="object"||!r.enabled)continue;let n=r;if(n.isTrigger&&n.syncBand&&n.syncBand!=="none")return!0;let o=n.paramSync;if(o&&typeof o=="object"){for(let i of Object.values(o))if(i?.isTrigger&&i.band&&i.band!=="none")return!0}}return!1}function y2(e,t,r){if(Bk(e))return!0;if(!t||!r)return!1;for(let n of Object.values(r))if(n?.enabled){if(n.composite?.enabled){let o=n.composite;if(o.isTrigger&&o.syncBand&&o.syncBand!=="none")return!0;let i=o.paramSync;if(i){for(let s of Object.values(i))if(s?.isTrigger&&s.band&&s.band!=="none")return!0}}for(let o of n.layerIds){let i=t[o];if(!i?.config.enabled)continue;let s=i.config;if(s.isTrigger&&s.syncBand&&s.syncBand!=="none")return!0;let l=s.paramSync;if(l){for(let p of Object.values(l))if(p?.isTrigger&&p.band&&p.band!=="none")return!0}}}return!1}u();function x2(){return{kick:0,snare:0,hat:0,bass:0,vocals:0,low:0,mid:0,high:0,beat:0,rhythm:0,specFast:0,specSlow:0,master:0}}var nt=e=>({current:e});function v2(e,t){let r=un(t,[3,3,6]),[n,o,i]=un(e,r);return[n/255,o/255,i/255]}function S2(e){let{canvas:t}=e,r=e.dprCap??2,n=e.clips.length>0?e.clips:[e.config.video].filter(Boolean),o=ie();o.customBands=x2();let i={...e.config,video:n[e.clipIndex??0]??e.config.video};dy(i.fx);let s=nt(i);o.hydraSettings=i;let l=nt(t),p=nt(null),d=nt(!1),v=nt(void 0),H=nt(void 0),D=nt("full"),O=nt(120),K=nt(0),Y=nt({active:!1,startTime:0,duration:0,resolvedType:0}),fe=nt(!1),Ee=nt(0),be=nt(0),Fe=nt(0),Qe=nt(()=>{}),Ze=nt(()=>{}),dt=nt(()=>{}),kt=nt(()=>{}),at=nt(""),rt=nt(()=>{}),mt=nt(null),R=nt(null),A=nt(()=>{}),C=nt(1),f=nt(!1),oe=nt(null),Te=nt(null),qe=nt(0),Ve=nt(!1),Ne=nt(void 0),Xe=nt(Ec()),Je=nt({count:0,slots:[]}),It=nt(null),et=nt(!1),Ht=nt(null),bt=nt(!1),yt=nt(K1()),Pt=nt(!1),_t=nt(null),Ut=nt(!1),tr=nt(ru()),zt=nt(!1),br=nt(null),vr=nt(!1),pn=nt(!1),Ft=nt(null),nr=nt(!1),Wr=nt(!1),lt=nt(null),kr=nt(!1),wt=nt(!1),h=nt(null),Pr=nt(!1),Qr=nt(Ly()),_r=nt(!1),Fr=nt({v0:null,v1:null}),Or=nt(null),Qt=nt({active:!1,pendingTrigger:!1,phase:"forward",segmentStart0:0,segmentStart1:0,segmentEnd0:0,captureAccum:0,capturePending:!1,reverseIdx:-1,completeAfterReverse:!1,frames:{frames0:[],frames1:[]},lastFrameTime:0}),or=nt(60),Sr=nt(180),ar=nt(null),Tr=nt(void 0),Lr=nt(null),xr=nt(void 0),Zr=nt(void 0),Gn=nt(void 0),tn=nt(y2(i.fx,i.layerInstances,i.fxGroups)),Jn=nt(u2(i.fx,{layerInstances:i.layerInstances,fxGroups:i.fxGroups})),rn=()=>ie().customBands,$o=()=>ie().hydraSettings?.fx??s.current.fx,Eo=(gt,Lt,Yt)=>Zt(gt,$o()?.[gt],Lt,Yt,rn()),Ro=gt=>yy(s.current.fx,rn(),(Lt,Yt,Vt)=>_n(Lt,Yt,Vt),Eo,gt),bn=()=>d2(t,r),zo=()=>t.width>0&&t.height>0?{width:t.width,height:t.height}:bn(),eo=()=>s.current.isVideoPlaying!==!1,{width:cr,height:Wn}=bn();t.width=cr,t.height=Wn;let to=HTMLCanvasElement.prototype,uo=to.getContext;to.getContext=function(Lt,Yt){return this===t&&(Lt==="webgl"||Lt==="webgl2"||Lt==="experimental-webgl")?uo.call(this,Lt,{...Yt,preserveDrawingBuffer:!0}):uo.apply(this,arguments)};let Yr;try{Yr=new Sg({canvas:t,detectAudio:!1,makeGlobal:!0,autoLoop:!1,width:cr,height:Wn,numSources:Ty()})}finally{to.getContext=uo}p.current=Yr;let Un=m2(Yr,[{outputIndex:1,isActive:()=>!!s.current.fx?.reactionDiffusion?.enabled,simSteps:()=>{let gt=Number(s.current.fx?.reactionDiffusion?.params?.speed??.45);return 1+Math.round(gt*2)}},{outputIndex:3,isActive:()=>Ny(s.current.fx),simSteps:()=>{let gt=Zt("patternLayer",s.current.fx?.patternLayer,"speed",.4,rn());return 3+Math.round(Math.max(0,Math.min(2,gt))*3)},maxSteps:6}]);Yr.tick=(gt,Lt)=>{if(!Pn()){Ql();try{Un(gt,Lt)}finally{Ee.current>0&&(Ee.current-=1),Fe.current>0&&(Fe.current-=1),be.current>0&&(be.current-=1),Zl()}}},Qe.current=gt=>{if(Pn())return;A.current(),py(Math.max(0,gt)/1e3);let Lt=ie().hydraSettings?.fx?.timeGlitch??s.current.fx?.timeGlitch,Yt=ie();_v({sources:[Yt.s0?.src,Yt.s1?.src],activeChannel:K.current,enabled:!!Lt?.enabled,warm:(s.current.activeFxList||[]).includes("timeGlitch"),amount:hr("timeGlitch",Lt,rn(),jr),cols:Zt("timeGlitch",Lt,"cols",16,rn()),frameOffset:Zt("timeGlitch",Lt,"frameOffset",2,rn()),origin:Zt("timeGlitch",Lt,"origin",1,rn()),direction:Zt("timeGlitch",Lt,"direction",0,rn()),mode:Zt("timeGlitch",Lt,"mode",0,rn()),destWidth:t.width,destHeight:t.height}),Yr.tick?.(gt)};let F=(0,_2.default)(gt=>Qe.current(gt));if(F.start(),tp({pause:()=>{F.stop(),mt.current?.()},resume:()=>{F.start(),R.current?.()}}),rp(()=>{fe.current=!1,dt.current()}),p2(Yr),f2(),V_(Yr.synth),eS({settingsRef:s,backingWidth:cr,backingHeight:Wn,oscilloscopeBundleRef:It,neonGridBundleRef:Ht,textLayerBundleRef:_t,throughTheStarsBundleRef:br,lumaDustBundleRef:Ft,lumaLockBundleRef:lt,metalEnvBundleRef:h,s3OverlayBindRef:Qr,textLayerRuntimeRef:tr,oscilloscopeBridgeReadyRef:et,neonGridBridgeReadyRef:bt,textLayerBridgeReadyRef:Ut,throughTheStarsBridgeReadyRef:vr,lumaDustBridgeReadyRef:nr,lumaLockBridgeReadyRef:kr,metalEnvBridgeReadyRef:Pr,neonGridWasEnabledRef:Pt,textLayerWasEnabledRef:zt,throughTheStarsWasEnabledRef:pn,lumaDustWasEnabledRef:Wr,lumaLockWasEnabledRef:wt}),Ci(i.fx?.patternLayer)){let gt=i.fx.patternLayer.params;Yr.synth?.setFunction?.({name:"patternTuringDisplay",type:"src",inputs:[...la],glsl:Ia(v2(gt?.colorA,"#030306"),v2(gt?.colorB,"#f0abfc"))})}Yr.setResolution?.(cr,Wn);let Bn=ie().s0?.regl;Bn&&(rx(Bn),Hg(Bn),bv(Bn),Qy(Bn).then(()=>{requestAnimationFrame(()=>dt.current())})),Ze.current=()=>Av({applySceneDeferredRef:fe,hydraRef:p,settingsRef:s,studioModeRef:d,exportSettingsRef:v,outputMappingRef:H,transitionStateRef:Y,activeChannelRef:K,reactionDiffForceSeedRef:Ee,feedbackForceClearRef:be,patternRdForceSeedRef:Fe,canvasRef:l,renderQualityRef:D,runHydraTickRef:Qe,electricNoiseCirclePackRef:Je,oscilloscopeBridgeReadyRef:et,neonGridBridgeReadyRef:bt,textLayerBridgeReadyRef:Ut,throughTheStarsBridgeReadyRef:vr,lumaDustBridgeReadyRef:nr,lumaLockBridgeReadyRef:kr,getFxState:$o,getParamValue:Eo}),dt.current=()=>{if(Pn()){fe.current=!0;return}ie().hydraSettings=s.current,Ze.current(),Pn()||Qe.current(16.67)},kt.current=gt=>{let Lt=ie(),Yt=Lt.s0?.src,Vt=Lt.s1?.src;if(!(Yt instanceof HTMLVideoElement)||!(Vt instanceof HTMLVideoElement))return;let fr=gt??Ro(Yt.duration);C.current=fr,zp([Yt,Vt],fr)};let{loadPrimaryVideos:Be,flushPendingVideoLoad:it}=c2({settingsRef:s,activeChannelRef:K,transitionStateRef:Y,pendingVideoLoadRef:oe,currentVideoRef:Te,videoLoadSeqRef:qe,clipLoadFreezeRef:Ve,secondaryVideoRef:Ne,boomerangBridgeReadyRef:_r,boomerangBackingRef:Fr,boomerangStateRef:Qt,syncPlaybackRef:kt,applySceneAndRenderRef:dt,bumpLumaDustReset:()=>{Ft.current&&el(Ft.current),queueMicrotask(()=>Ze.current())},teardownBoomerangBridge:()=>{},isPrimaryPlaybackActive:eo}),Ge=l2({settingsRef:s,studioModeRef:d,bpmRef:O,hydraRef:p,hydraRenderBudgetKeyRef:at,syncHydraRenderBudgetRef:rt,runHydraTickRef:Qe,hydraResizePauseRef:mt,hydraResizeResumeRef:R,syncElectricNoiseTriggerTexRef:A,transitionStateRef:Y,pendingVideoLoadRef:oe,activeChannelRef:K,clipLoadFreezeRef:Ve,clipPeekDepsRef:Zr,onPlaybackCueRef:Gn,boomerangBridgeReadyRef:_r,boomerangBackingRef:Fr,boomerangCanvasBundleRef:Or,boomerangStateRef:Qt,boomerangCaptureFpsCapRef:or,boomerangMaxFramesCapRef:Sr,currentSpeedSmoothedRef:C,fxReactiveTriggerGateRef:tn,reactiveTriggerDescriptorsRef:Jn,electricNoiseCirclesRef:Xe,electricNoiseCirclePackRef:Je,neonGridBundleRef:Ht,neonGridBridgeReadyRef:bt,neonGridRuntimeRef:yt,s3OverlayBindRef:Qr,throughTheStarsBundleRef:br,throughTheStarsBridgeReadyRef:vr,lumaDustBundleRef:Ft,lumaDustBridgeReadyRef:nr,lumaLockBundleRef:lt,lumaLockBridgeReadyRef:kr,textLayerBundleRef:_t,textLayerBridgeReadyRef:Ut,textLayerRuntimeRef:tr,oscilloscopeBundleRef:It,oscilloscopeBridgeReadyRef:et,metalEnvBundleRef:h,metalEnvBridgeReadyRef:Pr,perfLastPrimaryRef:ar,perfVideoSinkRef:Tr,perfPresentationLastRef:Lr,perfPresentationSinkRef:xr,wasStudioFrozenRef:f,flushPendingVideoLoad:it,getParamValue:Eo,resolvePrimaryVideoSpeed:Ro,resolveStarLayerPixels:zo,isTransportFrozen:()=>s.current.isVideoPlaying===!1,isStudioTransportRunning:()=>!1,isVisualTransportPlaying:eo,bootstrapTransportFreeze:()=>{at.current="",rt.current(!1),Qe.current(16.67)},reportPresentationMode:()=>{}});Ee.current=2,Fe.current=4;let Ce=n.map(gt=>({path:gt})),St=()=>{let gt=nl(s.current.fx),Lt=ES(Ce,s.current.video,gt?.config??null,gt?.key??null);if(!Lt||Lt===Ne.current)return;Ne.current=Lt;let Yt=ie().s2;Yt?.initVideo&&(Yt.src instanceof HTMLVideoElement&&Yt.src.pause(),Yt.initVideo(Lt),window.setTimeout(()=>{let Vt=ie().s2?.src;Vt instanceof HTMLVideoElement&&(Vt.muted=!0,Vt.loop=!0,eo()&&Vt.play().catch(()=>{}))},500))},er=Be(!0);St(),dt.current();let ft=()=>{if(!eo())return;let gt=ie();co(gt.s0?.src),co(gt.s1?.src),Ve.current=!1},Rt=[window.setTimeout(ft,250),window.setTimeout(ft,750)],Tt=n.indexOf(i.video)>=0?n.indexOf(i.video):0,ur=gt=>{if(n.length===0)return;let Lt=(gt%n.length+n.length)%n.length;Lt===Tt&&s.current.video===n[Lt]||(Tt=Lt,s.current={...s.current,video:n[Lt]},ie().hydraSettings=s.current,er(),er=Be(!1),St())},Jr=()=>{let gt=bn();t.width===gt.width&&t.height===gt.height||Yr.setResolution?.(gt.width,gt.height)},dn=()=>Jr();window.addEventListener("resize",dn),document.addEventListener("fullscreenchange",dn);let yn=new ResizeObserver(dn);return yn.observe(t),{clipCount:n.length,clipIndex:()=>Tt,selectClip:ur,nextClip:()=>ur(Tt+1),previousClip:()=>ur(Tt-1),isPlaying:()=>s.current.isVideoPlaying!==!1,setPlaying:gt=>{if(s.current={...s.current,isVideoPlaying:gt},ie().hydraSettings=s.current,gt)ft();else{let Lt=ie();Lt.s0?.src instanceof HTMLVideoElement&&Lt.s0.src.pause(),Lt.s1?.src instanceof HTMLVideoElement&&Lt.s1.src.pause()}dt.current()},resize:Jr,dispose:()=>{hu(),Rt.forEach(gt=>window.clearTimeout(gt)),yn.disconnect(),window.removeEventListener("resize",dn),document.removeEventListener("fullscreenchange",dn),Ge(),tp(null),rp(null),F.stop(),er(),p.current=null}}}function Nk(e){let t=document.createElement("canvas");return t.id="hexa-canvas",t.style.cssText="position:absolute;inset:0;width:100%;height:100%;display:block",e.appendChild(t),t}function Gk(e){return document.fullscreenElement===e||e.contains(document.activeElement)?!0:e.matches(":hover")}async function T2(e){if(document.fullscreenElement){await document.exitFullscreen();return}await e.requestFullscreen()}function Ej(e){let t=e.container??document.body;getComputedStyle(t).position==="static"&&(t.style.position="relative"),t.style.overflow=t.style.overflow||"hidden",t.style.background=t.style.background||"#000";let r=Nk(t),n=Dh(e.scene),o=S2({canvas:r,config:n,clips:e.scene.clips,clipIndex:e.scene.clipIndex}),i=e.chrome===!1?null:Vh(t,{title:e.scene.title,clipCount:o.clipCount,onPrevious:()=>{o.previousClip(),i?.setClipIndex(o.clipIndex())},onNext:()=>{o.nextClip(),i?.setClipIndex(o.clipIndex())},onTogglePlay:()=>{let p=!o.isPlaying();return o.setPlaying(p),p},onToggleFullscreen:()=>{T2(t)}});i?.setClipIndex(o.clipIndex()),i?.setPlaying(o.isPlaying());let s=Uh({autoMix:n.fx?.autoMix,clipCount:o.clipCount,currentIndex:()=>o.clipIndex(),selectClip:p=>{o.selectClip(p),i?.setClipIndex(o.clipIndex())}}),l=p=>{if(Gk(t))if(p.key===" "){p.preventDefault();let d=!o.isPlaying();o.setPlaying(d),i?.setPlaying(d)}else p.key==="ArrowRight"?(o.nextClip(),i?.setClipIndex(o.clipIndex())):p.key==="ArrowLeft"?(o.previousClip(),i?.setClipIndex(o.clipIndex())):p.key.toLowerCase()==="f"&&(p.preventDefault(),T2(t))};return window.addEventListener("keydown",l),{host:o,destroy:()=>{window.removeEventListener("keydown",l),s.stop(),i?.destroy(),o.dispose(),r.remove()}}}export{Ej as mountPlayer};
