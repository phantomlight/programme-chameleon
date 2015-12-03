!function(t){t.jCryption=function(e,i){var r=this;r.$el=t(e),r.el=e,r.$el.data("jCryption",r),r.$el.data("key",null),r.init=function(){if(r.options=t.extend({},t.jCryption.defaultOptions,i),$encryptedElement=t("<input />",{type:"hidden",name:r.options.postVariable}),r.options.submitElement!==!1)var e=r.options.submitElement;else var e=r.$el.find(":input:submit");e.bind(r.options.submitEvent,function(){return t(this).attr("disabled",!0),r.options.beforeEncryption()&&r.authenticate(function(i){var n=r.$el.serialize();e.is(":submit")&&(n=n+"&"+e.attr("name")+"="+e.val()),$encryptedElement.val(t.jCryption.encrypt(n,i)),t(r.$el).find(r.options.formFieldSelector).attr("disabled",!0).end().append($encryptedElement).submit()},function(){confirm("Authentication with Server failed, are you sure you want to submit this form unencrypted?",function(){t(r.$el).submit()})}),!1})},r.init(),r.getKey=function(){if(null!==r.$el.data("key"))return r.$el.data("key");var t;if(window.crypto&&window.crypto.getRandomValues){var e=new Uint32Array(8);window.crypto.getRandomValues(e),t=CryptoJS.lib.WordArray.create(e)}else t=CryptoJS.lib.WordArray.random(32);CryptoJS.lib.WordArray.random(16);return r.$el.data("key",t.toString()),r.getKey()},r.authenticate=function(e,i){var n=r.getKey();t.jCryption.authenticate(n,r.options.getKeysURL,r.options.handshakeURL,e,i)}},t.jCryption.authenticate=function(e,i,r,n,s){t.jCryption.getPublicKey(i,function(){t.jCryption.encryptKey(e,function(i){t.jCryption.handshake(r,i,function(i){t.jCryption.challenge(i.challenge,e)?n.call(this,e):s.call(this)})})})},t.jCryption.getPublicKey=function(e,i){t.getJSON(e,function(e){t.jCryption.crypt.setKey(e.publickey),t.isFunction(i)&&i.call(this)})},t.jCryption.decrypt=function(e,i){return t.jCryption.hex2string(CryptoJS.AES.decrypt(e,i)+"")},t.jCryption.encrypt=function(t,e){return CryptoJS.AES.encrypt(t,e)+""},t.jCryption.challenge=function(e,i){var r=t.jCryption.decrypt(e,i);return r==i?!0:!1},t.jCryption.hex2string=function(t){for(var e="",i=0;i<t.length;i+=2)e+=String.fromCharCode(parseInt(t.substr(i,2),16));return e},t.jCryption.handshake=function(e,i,r){t.ajax({url:e,dataType:"json",type:"POST",data:{key:i},success:function(t){r.call(this,t)}})},t.jCryption.encryptKey=function(e,i){var r=t.jCryption.crypt.encrypt(e);return t.isFunction(i)?void i(r):r},t.jCryption.defaultOptions={submitElement:!1,submitEvent:"click",getKeysURL:"jcryption.php?getPublicKey=true",handshakeURL:"jcryption.php?handshake=true",beforeEncryption:function(){return!0},postVariable:"jCryption",formFieldSelector:":input"},t.fn.jCryption=function(e){return this.each(function(){new t.jCryption(this,e)})}}(jQuery);var JSEncryptExports={};!function(t){function e(t,e,i){null!=t&&("number"==typeof t?this.fromNumber(t,e,i):null==e&&"string"!=typeof t?this.fromString(t,256):this.fromString(t,e))}function i(){return new e(null)}function r(t,e,i,r,n,s){for(;--s>=0;){var o=e*this[t++]+i[r]+n;n=Math.floor(o/67108864),i[r++]=67108863&o}return n}function n(t,e,i,r,n,s){for(var o=32767&e,h=e>>15;--s>=0;){var a=32767&this[t],u=this[t++]>>15,c=h*a+u*o;a=o*a+((32767&c)<<15)+i[r]+(1073741823&n),n=(a>>>30)+(c>>>15)+h*u+(n>>>30),i[r++]=1073741823&a}return n}function s(t,e,i,r,n,s){for(var o=16383&e,h=e>>14;--s>=0;){var a=16383&this[t],u=this[t++]>>14,c=h*a+u*o;a=o*a+((16383&c)<<14)+i[r]+n,n=(a>>28)+(c>>14)+h*u,i[r++]=268435455&a}return n}function o(t){return Ki.charAt(t)}function h(t,e){var i=Oi[t.charCodeAt(e)];return null==i?-1:i}function a(t){for(var e=this.t-1;e>=0;--e)t[e]=this[e];t.t=this.t,t.s=this.s}function u(t){this.t=1,this.s=0>t?-1:0,t>0?this[0]=t:-1>t?this[0]=t+DV:this.t=0}function c(t){var e=i();return e.fromInt(t),e}function f(t,i){var r;if(16==i)r=4;else if(8==i)r=3;else if(256==i)r=8;else if(2==i)r=1;else if(32==i)r=5;else{if(4!=i)return void this.fromRadix(t,i);r=2}this.t=0,this.s=0;for(var n=t.length,s=!1,o=0;--n>=0;){var a=8==r?255&t[n]:h(t,n);0>a?"-"==t.charAt(n)&&(s=!0):(s=!1,0==o?this[this.t++]=a:o+r>this.DB?(this[this.t-1]|=(a&(1<<this.DB-o)-1)<<o,this[this.t++]=a>>this.DB-o):this[this.t-1]|=a<<o,o+=r,o>=this.DB&&(o-=this.DB))}8==r&&0!=(128&t[0])&&(this.s=-1,o>0&&(this[this.t-1]|=(1<<this.DB-o)-1<<o)),this.clamp(),s&&e.ZERO.subTo(this,this)}function p(){for(var t=this.s&this.DM;this.t>0&&this[this.t-1]==t;)--this.t}function l(t){if(this.s<0)return"-"+this.negate().toString(t);var e;if(16==t)e=4;else if(8==t)e=3;else if(2==t)e=1;else if(32==t)e=5;else{if(4!=t)return this.toRadix(t);e=2}var i,r=(1<<e)-1,n=!1,s="",h=this.t,a=this.DB-h*this.DB%e;if(h-->0)for(a<this.DB&&(i=this[h]>>a)>0&&(n=!0,s=o(i));h>=0;)e>a?(i=(this[h]&(1<<a)-1)<<e-a,i|=this[--h]>>(a+=this.DB-e)):(i=this[h]>>(a-=e)&r,0>=a&&(a+=this.DB,--h)),i>0&&(n=!0),n&&(s+=o(i));return n?s:"0"}function d(){var t=i();return e.ZERO.subTo(this,t),t}function g(){return this.s<0?this.negate():this}function y(t){var e=this.s-t.s;if(0!=e)return e;var i=this.t;if(e=i-t.t,0!=e)return this.s<0?-e:e;for(;--i>=0;)if(0!=(e=this[i]-t[i]))return e;return 0}function m(t){var e,i=1;return 0!=(e=t>>>16)&&(t=e,i+=16),0!=(e=t>>8)&&(t=e,i+=8),0!=(e=t>>4)&&(t=e,i+=4),0!=(e=t>>2)&&(t=e,i+=2),0!=(e=t>>1)&&(t=e,i+=1),i}function b(){return this.t<=0?0:this.DB*(this.t-1)+m(this[this.t-1]^this.s&this.DM)}function S(t,e){var i;for(i=this.t-1;i>=0;--i)e[i+t]=this[i];for(i=t-1;i>=0;--i)e[i]=0;e.t=this.t+t,e.s=this.s}function T(t,e){for(var i=t;i<this.t;++i)e[i-t]=this[i];e.t=Math.max(this.t-t,0),e.s=this.s}function R(t,e){var i,r=t%this.DB,n=this.DB-r,s=(1<<n)-1,o=Math.floor(t/this.DB),h=this.s<<r&this.DM;for(i=this.t-1;i>=0;--i)e[i+o+1]=this[i]>>n|h,h=(this[i]&s)<<r;for(i=o-1;i>=0;--i)e[i]=0;e[o]=h,e.t=this.t+o+1,e.s=this.s,e.clamp()}function E(t,e){e.s=this.s;var i=Math.floor(t/this.DB);if(i>=this.t)return void(e.t=0);var r=t%this.DB,n=this.DB-r,s=(1<<r)-1;e[0]=this[i]>>r;for(var o=i+1;o<this.t;++o)e[o-i-1]|=(this[o]&s)<<n,e[o-i]=this[o]>>r;r>0&&(e[this.t-i-1]|=(this.s&s)<<n),e.t=this.t-i,e.clamp()}function x(t,e){for(var i=0,r=0,n=Math.min(t.t,this.t);n>i;)r+=this[i]-t[i],e[i++]=r&this.DM,r>>=this.DB;if(t.t<this.t){for(r-=t.s;i<this.t;)r+=this[i],e[i++]=r&this.DM,r>>=this.DB;r+=this.s}else{for(r+=this.s;i<t.t;)r-=t[i],e[i++]=r&this.DM,r>>=this.DB;r-=t.s}e.s=0>r?-1:0,-1>r?e[i++]=this.DV+r:r>0&&(e[i++]=r),e.t=i,e.clamp()}function D(t,i){var r=this.abs(),n=t.abs(),s=r.t;for(i.t=s+n.t;--s>=0;)i[s]=0;for(s=0;s<n.t;++s)i[s+r.t]=r.am(0,n[s],i,s,0,r.t);i.s=0,i.clamp(),this.s!=t.s&&e.ZERO.subTo(i,i)}function w(t){for(var e=this.abs(),i=t.t=2*e.t;--i>=0;)t[i]=0;for(i=0;i<e.t-1;++i){var r=e.am(i,e[i],t,2*i,0,1);(t[i+e.t]+=e.am(i+1,2*e[i],t,2*i+1,r,e.t-i-1))>=e.DV&&(t[i+e.t]-=e.DV,t[i+e.t+1]=1)}t.t>0&&(t[t.t-1]+=e.am(i,e[i],t,2*i,0,1)),t.s=0,t.clamp()}function B(t,r,n){var s=t.abs();if(!(s.t<=0)){var o=this.abs();if(o.t<s.t)return null!=r&&r.fromInt(0),void(null!=n&&this.copyTo(n));null==n&&(n=i());var h=i(),a=this.s,u=t.s,c=this.DB-m(s[s.t-1]);c>0?(s.lShiftTo(c,h),o.lShiftTo(c,n)):(s.copyTo(h),o.copyTo(n));var f=h.t,p=h[f-1];if(0!=p){var l=p*(1<<this.F1)+(f>1?h[f-2]>>this.F2:0),d=this.FV/l,g=(1<<this.F1)/l,y=1<<this.F2,v=n.t,b=v-f,S=null==r?i():r;for(h.dlShiftTo(b,S),n.compareTo(S)>=0&&(n[n.t++]=1,n.subTo(S,n)),e.ONE.dlShiftTo(f,S),S.subTo(h,h);h.t<f;)h[h.t++]=0;for(;--b>=0;){var T=n[--v]==p?this.DM:Math.floor(n[v]*d+(n[v-1]+y)*g);if((n[v]+=h.am(0,T,n,b,0,f))<T)for(h.dlShiftTo(b,S),n.subTo(S,n);n[v]<--T;)n.subTo(S,n)}null!=r&&(n.drShiftTo(f,r),a!=u&&e.ZERO.subTo(r,r)),n.t=f,n.clamp(),c>0&&n.rShiftTo(c,n),0>a&&e.ZERO.subTo(n,n)}}}function A(t){var r=i();return this.abs().divRemTo(t,null,r),this.s<0&&r.compareTo(e.ZERO)>0&&t.subTo(r,r),r}function K(t){this.m=t}function O(t){return t.s<0||t.compareTo(this.m)>=0?t.mod(this.m):t}function U(t){return t}function C(t){t.divRemTo(this.m,null,t)}function J(t,e,i){t.multiplyTo(e,i),this.reduce(i)}function V(t,e){t.squareTo(e),this.reduce(e)}function _(){if(this.t<1)return 0;var t=this[0];if(0==(1&t))return 0;var e=3&t;return e=e*(2-(15&t)*e)&15,e=e*(2-(255&t)*e)&255,e=e*(2-((65535&t)*e&65535))&65535,e=e*(2-t*e%this.DV)%this.DV,e>0?this.DV-e:-e}function N(t){this.m=t,this.mp=t.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<t.DB-15)-1,this.mt2=2*t.t}function M(t){var r=i();return t.abs().dlShiftTo(this.m.t,r),r.divRemTo(this.m,null,r),t.s<0&&r.compareTo(e.ZERO)>0&&this.m.subTo(r,r),r}function I(t){var e=i();return t.copyTo(e),this.reduce(e),e}function k(t){for(;t.t<=this.mt2;)t[t.t++]=0;for(var e=0;e<this.m.t;++e){var i=32767&t[e],r=i*this.mpl+((i*this.mph+(t[e]>>15)*this.mpl&this.um)<<15)&t.DM;for(i=e+this.m.t,t[i]+=this.m.am(0,r,t,e,0,this.m.t);t[i]>=t.DV;)t[i]-=t.DV,t[++i]++}t.clamp(),t.drShiftTo(this.m.t,t),t.compareTo(this.m)>=0&&t.subTo(this.m,t)}function P(t,e){t.squareTo(e),this.reduce(e)}function j(t,e,i){t.multiplyTo(e,i),this.reduce(i)}function H(){return 0==(this.t>0?1&this[0]:this.s)}function L(t,r){if(t>4294967295||1>t)return e.ONE;var n=i(),s=i(),o=r.convert(this),h=m(t)-1;for(o.copyTo(n);--h>=0;)if(r.sqrTo(n,s),(t&1<<h)>0)r.mulTo(s,o,n);else{var a=n;n=s,s=a}return r.revert(n)}function q(t,e){var i;return i=256>t||e.isEven()?new K(e):new N(e),this.exp(t,i)}function F(){var t=i();return this.copyTo(t),t}function z(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]}function $(){return 0==this.t?this.s:this[0]<<24>>24}function Z(){return 0==this.t?this.s:this[0]<<16>>16}function G(t){return Math.floor(Math.LN2*this.DB/Math.log(t))}function W(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1}function X(t){if(null==t&&(t=10),0==this.signum()||2>t||t>36)return"0";var e=this.chunkSize(t),r=Math.pow(t,e),n=c(r),s=i(),o=i(),h="";for(this.divRemTo(n,s,o);s.signum()>0;)h=(r+o.intValue()).toString(t).substr(1)+h,s.divRemTo(n,s,o);return o.intValue().toString(t)+h}function Y(t,i){this.fromInt(0),null==i&&(i=10);for(var r=this.chunkSize(i),n=Math.pow(i,r),s=!1,o=0,a=0,u=0;u<t.length;++u){var c=h(t,u);0>c?"-"==t.charAt(u)&&0==this.signum()&&(s=!0):(a=i*a+c,++o>=r&&(this.dMultiply(n),this.dAddOffset(a,0),o=0,a=0))}o>0&&(this.dMultiply(Math.pow(i,o)),this.dAddOffset(a,0)),s&&e.ZERO.subTo(this,this)}function Q(t,i,r){if("number"==typeof i)if(2>t)this.fromInt(1);else for(this.fromNumber(t,r),this.testBit(t-1)||this.bitwiseTo(e.ONE.shiftLeft(t-1),he,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(i);)this.dAddOffset(2,0),this.bitLength()>t&&this.subTo(e.ONE.shiftLeft(t-1),this);else{var n=new Array,s=7&t;n.length=(t>>3)+1,i.nextBytes(n),s>0?n[0]&=(1<<s)-1:n[0]=0,this.fromString(n,256)}}function te(){var t=this.t,e=new Array;e[0]=this.s;var i,r=this.DB-t*this.DB%8,n=0;if(t-->0)for(r<this.DB&&(i=this[t]>>r)!=(this.s&this.DM)>>r&&(e[n++]=i|this.s<<this.DB-r);t>=0;)8>r?(i=(this[t]&(1<<r)-1)<<8-r,i|=this[--t]>>(r+=this.DB-8)):(i=this[t]>>(r-=8)&255,0>=r&&(r+=this.DB,--t)),0!=(128&i)&&(i|=-256),0==n&&(128&this.s)!=(128&i)&&++n,(n>0||i!=this.s)&&(e[n++]=i);return e}function ee(t){return 0==this.compareTo(t)}function ie(t){return this.compareTo(t)<0?this:t}function re(t){return this.compareTo(t)>0?this:t}function ne(t,e,i){var r,n,s=Math.min(t.t,this.t);for(r=0;s>r;++r)i[r]=e(this[r],t[r]);if(t.t<this.t){for(n=t.s&this.DM,r=s;r<this.t;++r)i[r]=e(this[r],n);i.t=this.t}else{for(n=this.s&this.DM,r=s;r<t.t;++r)i[r]=e(n,t[r]);i.t=t.t}i.s=e(this.s,t.s),i.clamp()}function se(t,e){return t&e}function oe(t){var e=i();return this.bitwiseTo(t,se,e),e}function he(t,e){return t|e}function ae(t){var e=i();return this.bitwiseTo(t,he,e),e}function ue(t,e){return t^e}function ce(t){var e=i();return this.bitwiseTo(t,ue,e),e}function fe(t,e){return t&~e}function pe(t){var e=i();return this.bitwiseTo(t,fe,e),e}function le(){for(var t=i(),e=0;e<this.t;++e)t[e]=this.DM&~this[e];return t.t=this.t,t.s=~this.s,t}function de(t){var e=i();return 0>t?this.rShiftTo(-t,e):this.lShiftTo(t,e),e}function ge(t){var e=i();return 0>t?this.lShiftTo(-t,e):this.rShiftTo(t,e),e}function ye(t){if(0==t)return-1;var e=0;return 0==(65535&t)&&(t>>=16,e+=16),0==(255&t)&&(t>>=8,e+=8),0==(15&t)&&(t>>=4,e+=4),0==(3&t)&&(t>>=2,e+=2),0==(1&t)&&++e,e}function me(){for(var t=0;t<this.t;++t)if(0!=this[t])return t*this.DB+ye(this[t]);return this.s<0?this.t*this.DB:-1}function ve(t){for(var e=0;0!=t;)t&=t-1,++e;return e}function be(){for(var t=0,e=this.s&this.DM,i=0;i<this.t;++i)t+=ve(this[i]^e);return t}function Se(t){var e=Math.floor(t/this.DB);return e>=this.t?0!=this.s:0!=(this[e]&1<<t%this.DB)}function Te(t,i){var r=e.ONE.shiftLeft(t);return this.bitwiseTo(r,i,r),r}function Re(t){return this.changeBit(t,he)}function Ee(t){return this.changeBit(t,fe)}function xe(t){return this.changeBit(t,ue)}function De(t,e){for(var i=0,r=0,n=Math.min(t.t,this.t);n>i;)r+=this[i]+t[i],e[i++]=r&this.DM,r>>=this.DB;if(t.t<this.t){for(r+=t.s;i<this.t;)r+=this[i],e[i++]=r&this.DM,r>>=this.DB;r+=this.s}else{for(r+=this.s;i<t.t;)r+=t[i],e[i++]=r&this.DM,r>>=this.DB;r+=t.s}e.s=0>r?-1:0,r>0?e[i++]=r:-1>r&&(e[i++]=this.DV+r),e.t=i,e.clamp()}function we(t){var e=i();return this.addTo(t,e),e}function Be(t){var e=i();return this.subTo(t,e),e}function Ae(t){var e=i();return this.multiplyTo(t,e),e}function Ke(){var t=i();return this.squareTo(t),t}function Oe(t){var e=i();return this.divRemTo(t,e,null),e}function Ue(t){var e=i();return this.divRemTo(t,null,e),e}function Ce(t){var e=i(),r=i();return this.divRemTo(t,e,r),new Array(e,r)}function Je(t){this[this.t]=this.am(0,t-1,this,0,0,this.t),++this.t,this.clamp()}function Ve(t,e){if(0!=t){for(;this.t<=e;)this[this.t++]=0;for(this[e]+=t;this[e]>=this.DV;)this[e]-=this.DV,++e>=this.t&&(this[this.t++]=0),++this[e]}}function _e(){}function Ne(t){return t}function Me(t,e,i){t.multiplyTo(e,i)}function Ie(t,e){t.squareTo(e)}function ke(t){return this.exp(t,new _e)}function Pe(t,e,i){var r=Math.min(this.t+t.t,e);for(i.s=0,i.t=r;r>0;)i[--r]=0;var n;for(n=i.t-this.t;n>r;++r)i[r+this.t]=this.am(0,t[r],i,r,0,this.t);for(n=Math.min(t.t,e);n>r;++r)this.am(0,t[r],i,r,0,e-r);i.clamp()}function je(t,e,i){--e;var r=i.t=this.t+t.t-e;for(i.s=0;--r>=0;)i[r]=0;for(r=Math.max(e-this.t,0);r<t.t;++r)i[this.t+r-e]=this.am(e-r,t[r],i,0,0,this.t+r-e);i.clamp(),i.drShiftTo(1,i)}function He(t){this.r2=i(),this.q3=i(),e.ONE.dlShiftTo(2*t.t,this.r2),this.mu=this.r2.divide(t),this.m=t}function Le(t){if(t.s<0||t.t>2*this.m.t)return t.mod(this.m);if(t.compareTo(this.m)<0)return t;var e=i();return t.copyTo(e),this.reduce(e),e}function qe(t){return t}function Fe(t){for(t.drShiftTo(this.m.t-1,this.r2),t.t>this.m.t+1&&(t.t=this.m.t+1,t.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);t.compareTo(this.r2)<0;)t.dAddOffset(1,this.m.t+1);for(t.subTo(this.r2,t);t.compareTo(this.m)>=0;)t.subTo(this.m,t)}function ze(t,e){t.squareTo(e),this.reduce(e)}function $e(t,e,i){t.multiplyTo(e,i),this.reduce(i)}function Ze(t,e){var r,n,s=t.bitLength(),o=c(1);if(0>=s)return o;r=18>s?1:48>s?3:144>s?4:768>s?5:6,n=8>s?new K(e):e.isEven()?new He(e):new N(e);var h=new Array,a=3,u=r-1,f=(1<<r)-1;if(h[1]=n.convert(this),r>1){var p=i();for(n.sqrTo(h[1],p);f>=a;)h[a]=i(),n.mulTo(p,h[a-2],h[a]),a+=2}var l,d,g=t.t-1,y=!0,v=i();for(s=m(t[g])-1;g>=0;){for(s>=u?l=t[g]>>s-u&f:(l=(t[g]&(1<<s+1)-1)<<u-s,g>0&&(l|=t[g-1]>>this.DB+s-u)),a=r;0==(1&l);)l>>=1,--a;if((s-=a)<0&&(s+=this.DB,--g),y)h[l].copyTo(o),y=!1;else{for(;a>1;)n.sqrTo(o,v),n.sqrTo(v,o),a-=2;a>0?n.sqrTo(o,v):(d=o,o=v,v=d),n.mulTo(v,h[l],o)}for(;g>=0&&0==(t[g]&1<<s);)n.sqrTo(o,v),d=o,o=v,v=d,--s<0&&(s=this.DB-1,--g)}return n.revert(o)}function Ge(t){var e=this.s<0?this.negate():this.clone(),i=t.s<0?t.negate():t.clone();if(e.compareTo(i)<0){var r=e;e=i,i=r}var n=e.getLowestSetBit(),s=i.getLowestSetBit();if(0>s)return e;for(s>n&&(s=n),s>0&&(e.rShiftTo(s,e),i.rShiftTo(s,i));e.signum()>0;)(n=e.getLowestSetBit())>0&&e.rShiftTo(n,e),(n=i.getLowestSetBit())>0&&i.rShiftTo(n,i),e.compareTo(i)>=0?(e.subTo(i,e),e.rShiftTo(1,e)):(i.subTo(e,i),i.rShiftTo(1,i));return s>0&&i.lShiftTo(s,i),i}function We(t){if(0>=t)return 0;var e=this.DV%t,i=this.s<0?t-1:0;if(this.t>0)if(0==e)i=this[0]%t;else for(var r=this.t-1;r>=0;--r)i=(e*i+this[r])%t;return i}function Xe(t){var i=t.isEven();if(this.isEven()&&i||0==t.signum())return e.ZERO;for(var r=t.clone(),n=this.clone(),s=c(1),o=c(0),h=c(0),a=c(1);0!=r.signum();){for(;r.isEven();)r.rShiftTo(1,r),i?(s.isEven()&&o.isEven()||(s.addTo(this,s),o.subTo(t,o)),s.rShiftTo(1,s)):o.isEven()||o.subTo(t,o),o.rShiftTo(1,o);for(;n.isEven();)n.rShiftTo(1,n),i?(h.isEven()&&a.isEven()||(h.addTo(this,h),a.subTo(t,a)),h.rShiftTo(1,h)):a.isEven()||a.subTo(t,a),a.rShiftTo(1,a);r.compareTo(n)>=0?(r.subTo(n,r),i&&s.subTo(h,s),o.subTo(a,o)):(n.subTo(r,n),i&&h.subTo(s,h),a.subTo(o,a))}return 0!=n.compareTo(e.ONE)?e.ZERO:a.compareTo(t)>=0?a.subtract(t):a.signum()<0?(a.addTo(t,a),a.signum()<0?a.add(t):a):a}function Ye(t){var e,i=this.abs();if(1==i.t&&i[0]<=Ui[Ui.length-1]){for(e=0;e<Ui.length;++e)if(i[0]==Ui[e])return!0;return!1}if(i.isEven())return!1;for(e=1;e<Ui.length;){for(var r=Ui[e],n=e+1;n<Ui.length&&Ci>r;)r*=Ui[n++];for(r=i.modInt(r);n>e;)if(r%Ui[e++]==0)return!1}return i.millerRabin(t)}function Qe(t){var r=this.subtract(e.ONE),n=r.getLowestSetBit();if(0>=n)return!1;var s=r.shiftRight(n);t=t+1>>1,t>Ui.length&&(t=Ui.length);for(var o=i(),h=0;t>h;++h){o.fromInt(Ui[Math.floor(Math.random()*Ui.length)]);var a=o.modPow(s,this);if(0!=a.compareTo(e.ONE)&&0!=a.compareTo(r)){for(var u=1;u++<n&&0!=a.compareTo(r);)if(a=a.modPowInt(2,this),0==a.compareTo(e.ONE))return!1;if(0!=a.compareTo(r))return!1}}return!0}function ti(){this.i=0,this.j=0,this.S=new Array}function ei(t){var e,i,r;for(e=0;256>e;++e)this.S[e]=e;for(i=0,e=0;256>e;++e)i=i+this.S[e]+t[e%t.length]&255,r=this.S[e],this.S[e]=this.S[i],this.S[i]=r;this.i=0,this.j=0}function ii(){var t;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,t=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=t,this.S[t+this.S[this.i]&255]}function ri(){return new ti}function ni(t){Vi[_i++]^=255&t,Vi[_i++]^=t>>8&255,Vi[_i++]^=t>>16&255,Vi[_i++]^=t>>24&255,_i>=Ni&&(_i-=Ni)}function si(){ni((new Date).getTime())}function oi(){if(null==Ji){for(si(),Ji=ri(),Ji.init(Vi),_i=0;_i<Vi.length;++_i)Vi[_i]=0;_i=0}return Ji.next()}function hi(t){var e;for(e=0;e<t.length;++e)t[e]=oi()}function ai(){}function ui(t,i){return new e(t,i)}function ci(t,i){if(i<t.length+11)return console.error("Message too long for RSA"),null;for(var r=new Array,n=t.length-1;n>=0&&i>0;){var s=t.charCodeAt(n--);128>s?r[--i]=s:s>127&&2048>s?(r[--i]=63&s|128,r[--i]=s>>6|192):(r[--i]=63&s|128,r[--i]=s>>6&63|128,r[--i]=s>>12|224)}r[--i]=0;for(var o=new ai,h=new Array;i>2;){for(h[0]=0;0==h[0];)o.nextBytes(h);r[--i]=h[0]}return r[--i]=2,r[--i]=0,new e(r)}function fi(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null}function pi(t,e){null!=t&&null!=e&&t.length>0&&e.length>0?(this.n=ui(t,16),this.e=parseInt(e,16)):console.error("Invalid RSA public key")}function li(t){return t.modPowInt(this.e,this.n)}function di(t){var e=ci(t,this.n.bitLength()+7>>3);if(null==e)return null;var i=this.doPublic(e);if(null==i)return null;var r=i.toString(16);return 0==(1&r.length)?r:"0"+r}function gi(t,e){for(var i=t.toByteArray(),r=0;r<i.length&&0==i[r];)++r;if(i.length-r!=e-1||2!=i[r])return null;for(++r;0!=i[r];)if(++r>=i.length)return null;for(var n="";++r<i.length;){var s=255&i[r];128>s?n+=String.fromCharCode(s):s>191&&224>s?(n+=String.fromCharCode((31&s)<<6|63&i[r+1]),++r):(n+=String.fromCharCode((15&s)<<12|(63&i[r+1])<<6|63&i[r+2]),r+=2)}return n}function yi(t,e,i){null!=t&&null!=e&&t.length>0&&e.length>0?(this.n=ui(t,16),this.e=parseInt(e,16),this.d=ui(i,16)):console.error("Invalid RSA private key")}function mi(t,e,i,r,n,s,o,h){null!=t&&null!=e&&t.length>0&&e.length>0?(this.n=ui(t,16),this.e=parseInt(e,16),this.d=ui(i,16),this.p=ui(r,16),this.q=ui(n,16),this.dmp1=ui(s,16),this.dmq1=ui(o,16),this.coeff=ui(h,16)):console.error("Invalid RSA private key")}function vi(t,i){var r=new ai,n=t>>1;this.e=parseInt(i,16);for(var s=new e(i,16);;){for(;this.p=new e(t-n,1,r),0!=this.p.subtract(e.ONE).gcd(s).compareTo(e.ONE)||!this.p.isProbablePrime(10););for(;this.q=new e(n,1,r),0!=this.q.subtract(e.ONE).gcd(s).compareTo(e.ONE)||!this.q.isProbablePrime(10););if(this.p.compareTo(this.q)<=0){var o=this.p;this.p=this.q,this.q=o}var h=this.p.subtract(e.ONE),a=this.q.subtract(e.ONE),u=h.multiply(a);if(0==u.gcd(s).compareTo(e.ONE)){this.n=this.p.multiply(this.q),this.d=s.modInverse(u),this.dmp1=this.d.mod(h),this.dmq1=this.d.mod(a),this.coeff=this.q.modInverse(this.p);break}}}function bi(t){if(null==this.p||null==this.q)return t.modPow(this.d,this.n);for(var e=t.mod(this.p).modPow(this.dmp1,this.p),i=t.mod(this.q).modPow(this.dmq1,this.q);e.compareTo(i)<0;)e=e.add(this.p);return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)}function Si(t){var e=ui(t,16),i=this.doPrivate(e);return null==i?null:gi(i,this.n.bitLength()+7>>3)}function Ti(t){var e,i,r="";for(e=0;e+3<=t.length;e+=3)i=parseInt(t.substring(e,e+3),16),r+=ki.charAt(i>>6)+ki.charAt(63&i);for(e+1==t.length?(i=parseInt(t.substring(e,e+1),16),r+=ki.charAt(i<<2)):e+2==t.length&&(i=parseInt(t.substring(e,e+2),16),r+=ki.charAt(i>>2)+ki.charAt((3&i)<<4));(3&r.length)>0;)r+=Pi;return r}function Ri(t){var e,i,r="",n=0;for(e=0;e<t.length&&t.charAt(e)!=Pi;++e)v=ki.indexOf(t.charAt(e)),v<0||(0==n?(r+=o(v>>2),i=3&v,n=1):1==n?(r+=o(i<<2|v>>4),i=15&v,n=2):2==n?(r+=o(i),r+=o(v>>2),i=3&v,n=3):(r+=o(i<<2|v>>4),r+=o(15&v),n=0));return 1==n&&(r+=o(i<<2)),r}var Ei,xi=0xdeadbeefcafe,Di=15715070==(16777215&xi);Di&&"Microsoft Internet Explorer"==navigator.appName?(e.prototype.am=n,Ei=30):Di&&"Netscape"!=navigator.appName?(e.prototype.am=r,Ei=26):(e.prototype.am=s,Ei=28),e.prototype.DB=Ei,e.prototype.DM=(1<<Ei)-1,e.prototype.DV=1<<Ei;var wi=52;e.prototype.FV=Math.pow(2,wi),e.prototype.F1=wi-Ei,e.prototype.F2=2*Ei-wi;var Bi,Ai,Ki="0123456789abcdefghijklmnopqrstuvwxyz",Oi=new Array;for(Bi="0".charCodeAt(0),Ai=0;9>=Ai;++Ai)Oi[Bi++]=Ai;for(Bi="a".charCodeAt(0),Ai=10;36>Ai;++Ai)Oi[Bi++]=Ai;for(Bi="A".charCodeAt(0),Ai=10;36>Ai;++Ai)Oi[Bi++]=Ai;K.prototype.convert=O,K.prototype.revert=U,K.prototype.reduce=C,K.prototype.mulTo=J,K.prototype.sqrTo=V,N.prototype.convert=M,N.prototype.revert=I,N.prototype.reduce=k,N.prototype.mulTo=j,N.prototype.sqrTo=P,e.prototype.copyTo=a,e.prototype.fromInt=u,e.prototype.fromString=f,e.prototype.clamp=p,e.prototype.dlShiftTo=S,e.prototype.drShiftTo=T,e.prototype.lShiftTo=R,e.prototype.rShiftTo=E,e.prototype.subTo=x,e.prototype.multiplyTo=D,e.prototype.squareTo=w,e.prototype.divRemTo=B,e.prototype.invDigit=_,e.prototype.isEven=H,e.prototype.exp=L,e.prototype.toString=l,e.prototype.negate=d,e.prototype.abs=g,e.prototype.compareTo=y,e.prototype.bitLength=b,e.prototype.mod=A,e.prototype.modPowInt=q,e.ZERO=c(0),e.ONE=c(1),_e.prototype.convert=Ne,_e.prototype.revert=Ne,_e.prototype.mulTo=Me,_e.prototype.sqrTo=Ie,He.prototype.convert=Le,He.prototype.revert=qe,He.prototype.reduce=Fe,He.prototype.mulTo=$e,He.prototype.sqrTo=ze;var Ui=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],Ci=(1<<26)/Ui[Ui.length-1];e.prototype.chunkSize=G,e.prototype.toRadix=X,e.prototype.fromRadix=Y,e.prototype.fromNumber=Q,e.prototype.bitwiseTo=ne,e.prototype.changeBit=Te,e.prototype.addTo=De,e.prototype.dMultiply=Je,e.prototype.dAddOffset=Ve,e.prototype.multiplyLowerTo=Pe,e.prototype.multiplyUpperTo=je,e.prototype.modInt=We,e.prototype.millerRabin=Qe,e.prototype.clone=F,e.prototype.intValue=z,e.prototype.byteValue=$,e.prototype.shortValue=Z,e.prototype.signum=W,e.prototype.toByteArray=te,e.prototype.equals=ee,e.prototype.min=ie,e.prototype.max=re,e.prototype.and=oe,e.prototype.or=ae,e.prototype.xor=ce,e.prototype.andNot=pe,e.prototype.not=le,e.prototype.shiftLeft=de,e.prototype.shiftRight=ge,e.prototype.getLowestSetBit=me,e.prototype.bitCount=be,e.prototype.testBit=Se,e.prototype.setBit=Re,e.prototype.clearBit=Ee,e.prototype.flipBit=xe,e.prototype.add=we,e.prototype.subtract=Be,e.prototype.multiply=Ae,e.prototype.divide=Oe,e.prototype.remainder=Ue,e.prototype.divideAndRemainder=Ce,e.prototype.modPow=Ze,e.prototype.modInverse=Xe,e.prototype.pow=ke,e.prototype.gcd=Ge,e.prototype.isProbablePrime=Ye,e.prototype.square=Ke,ti.prototype.init=ei,ti.prototype.next=ii;var Ji,Vi,_i,Ni=256;if(null==Vi){Vi=new Array,_i=0;var Mi;if("Netscape"==navigator.appName&&navigator.appVersion<"5"&&window.crypto){var Ii=window.crypto.random(32);for(Mi=0;Mi<Ii.length;++Mi)Vi[_i++]=255&Ii.charCodeAt(Mi)}for(;Ni>_i;)Mi=Math.floor(65536*Math.random()),Vi[_i++]=Mi>>>8,Vi[_i++]=255&Mi;_i=0,si()}ai.prototype.nextBytes=hi,fi.prototype.doPublic=li,fi.prototype.setPublic=pi,fi.prototype.encrypt=di,fi.prototype.doPrivate=bi,fi.prototype.setPrivate=yi,fi.prototype.setPrivateEx=mi,fi.prototype.generate=vi,fi.prototype.decrypt=Si,function(){var t=function(t,r,n){var s=new ai,o=t>>1;this.e=parseInt(r,16);var h=new e(r,16),a=this,u=function(){var r=function(){if(a.p.compareTo(a.q)<=0){var t=a.p;a.p=a.q,a.q=t}var i=a.p.subtract(e.ONE),r=a.q.subtract(e.ONE),s=i.multiply(r);0==s.gcd(h).compareTo(e.ONE)?(a.n=a.p.multiply(a.q),a.d=h.modInverse(s),a.dmp1=a.d.mod(i),a.dmq1=a.d.mod(r),a.coeff=a.q.modInverse(a.p),setTimeout(function(){n()},0)):setTimeout(u,0)},c=function(){a.q=i(),a.q.fromNumberAsync(o,1,s,function(){a.q.subtract(e.ONE).gcda(h,function(t){0==t.compareTo(e.ONE)&&a.q.isProbablePrime(10)?setTimeout(r,0):setTimeout(c,0)})})},f=function(){a.p=i(),a.p.fromNumberAsync(t-o,1,s,function(){a.p.subtract(e.ONE).gcda(h,function(t){0==t.compareTo(e.ONE)&&a.p.isProbablePrime(10)?setTimeout(c,0):setTimeout(f,0)})})};setTimeout(f,0)};setTimeout(u,0)};fi.prototype.generateAsync=t;var r=function(t,e){var i=this.s<0?this.negate():this.clone(),r=t.s<0?t.negate():t.clone();if(i.compareTo(r)<0){var n=i;i=r,r=n}var s=i.getLowestSetBit(),o=r.getLowestSetBit();if(0>o)return void e(i);o>s&&(o=s),o>0&&(i.rShiftTo(o,i),r.rShiftTo(o,r));var h=function(){(s=i.getLowestSetBit())>0&&i.rShiftTo(s,i),(s=r.getLowestSetBit())>0&&r.rShiftTo(s,r),i.compareTo(r)>=0?(i.subTo(r,i),i.rShiftTo(1,i)):(r.subTo(i,r),r.rShiftTo(1,r)),i.signum()>0?setTimeout(h,0):(o>0&&r.lShiftTo(o,r),setTimeout(function(){e(r)},0))};setTimeout(h,10)};e.prototype.gcda=r;var n=function(t,i,r,n){if("number"==typeof i)if(2>t)this.fromInt(1);else{this.fromNumber(t,r),this.testBit(t-1)||this.bitwiseTo(e.ONE.shiftLeft(t-1),he,this),this.isEven()&&this.dAddOffset(1,0);var s=this,o=function(){s.dAddOffset(2,0),s.bitLength()>t&&s.subTo(e.ONE.shiftLeft(t-1),s),s.isProbablePrime(i)?setTimeout(function(){n()},0):setTimeout(o,0)};setTimeout(o,0)}else{var h=new Array,a=7&t;h.length=(t>>3)+1,i.nextBytes(h),a>0?h[0]&=(1<<a)-1:h[0]=0,this.fromString(h,256)}};e.prototype.fromNumberAsync=n}();var ki="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Pi="=",ji=ji||{};ji.env=ji.env||{};var Hi=ji,Li=Object.prototype,qi="[object Function]",Fi=["toString","valueOf"];ji.env.parseUA=function(t){var e,i=function(t){var e=0;return parseFloat(t.replace(/\./g,function(){return 1==e++?"":"."}))},r=navigator,n={ie:0,opera:0,gecko:0,webkit:0,chrome:0,mobile:null,air:0,ipad:0,iphone:0,ipod:0,ios:null,android:0,webos:0,caja:r&&r.cajaVersion,secure:!1,os:null},s=t||navigator&&navigator.userAgent,o=window&&window.location,h=o&&o.href;return n.secure=h&&0===h.toLowerCase().indexOf("https"),s&&(/windows|win32/i.test(s)?n.os="windows":/macintosh/i.test(s)?n.os="macintosh":/rhino/i.test(s)&&(n.os="rhino"),/KHTML/.test(s)&&(n.webkit=1),e=s.match(/AppleWebKit\/([^\s]*)/),e&&e[1]&&(n.webkit=i(e[1]),/ Mobile\//.test(s)?(n.mobile="Apple",e=s.match(/OS ([^\s]*)/),e&&e[1]&&(e=i(e[1].replace("_","."))),n.ios=e,n.ipad=n.ipod=n.iphone=0,e=s.match(/iPad|iPod|iPhone/),e&&e[0]&&(n[e[0].toLowerCase()]=n.ios)):(e=s.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/),e&&(n.mobile=e[0]),/webOS/.test(s)&&(n.mobile="WebOS",e=s.match(/webOS\/([^\s]*);/),e&&e[1]&&(n.webos=i(e[1]))),/ Android/.test(s)&&(n.mobile="Android",e=s.match(/Android ([^\s]*);/),e&&e[1]&&(n.android=i(e[1])))),e=s.match(/Chrome\/([^\s]*)/),e&&e[1]?n.chrome=i(e[1]):(e=s.match(/AdobeAIR\/([^\s]*)/),e&&(n.air=e[0]))),n.webkit||(e=s.match(/Opera[\s\/]([^\s]*)/),e&&e[1]?(n.opera=i(e[1]),e=s.match(/Version\/([^\s]*)/),e&&e[1]&&(n.opera=i(e[1])),e=s.match(/Opera Mini[^;]*/),e&&(n.mobile=e[0])):(e=s.match(/MSIE\s([^;]*)/),e&&e[1]?n.ie=i(e[1]):(e=s.match(/Gecko\/([^\s]*)/),e&&(n.gecko=1,e=s.match(/rv:([^\s\)]*)/),e&&e[1]&&(n.gecko=i(e[1]))))))),n},ji.env.ua=ji.env.parseUA(),ji.isFunction=function(t){return"function"==typeof t||Li.toString.apply(t)===qi},ji._IEEnumFix=ji.env.ua.ie?function(t,e){var i,r,n;for(i=0;i<Fi.length;i+=1)r=Fi[i],n=e[r],Hi.isFunction(n)&&n!=Li[r]&&(t[r]=n)}:function(){},ji.extend=function(t,e,i){if(!e||!t)throw new Error("extend failed, please check that all dependencies are included.");var r,n=function(){};if(n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.superclass=e.prototype,e.prototype.constructor==Li.constructor&&(e.prototype.constructor=e),i){for(r in i)Hi.hasOwnProperty(i,r)&&(t.prototype[r]=i[r]);Hi._IEEnumFix(t.prototype,i)}},"undefined"!=typeof KJUR&&KJUR||(KJUR={}),"undefined"!=typeof KJUR.asn1&&KJUR.asn1||(KJUR.asn1={}),KJUR.asn1.ASN1Util=new function(){this.integerToByteHex=function(t){var e=t.toString(16);return e.length%2==1&&(e="0"+e),e},this.bigIntToMinTwosComplementsHex=function(t){var i=t.toString(16);if("-"!=i.substr(0,1))i.length%2==1?i="0"+i:i.match(/^[0-7]/)||(i="00"+i);else{var r=i.substr(1),n=r.length;n%2==1?n+=1:i.match(/^[0-7]/)||(n+=2);for(var s="",o=0;n>o;o++)s+="f";var h=new e(s,16),a=h.xor(t).add(e.ONE);i=a.toString(16).replace(/^-/,"")}return i},this.getPEMStringFromHex=function(t,e){var i=CryptoJS.enc.Hex.parse(t),r=CryptoJS.enc.Base64.stringify(i),n=r.replace(/(.{64})/g,"$1\r\n");return n=n.replace(/\r\n$/,""),"-----BEGIN "+e+"-----\r\n"+n+"\r\n-----END "+e+"-----\r\n"}},KJUR.asn1.ASN1Object=function(){var t="";this.getLengthHexFromValue=function(){if("undefined"==typeof this.hV||null==this.hV)throw"this.hV is null or undefined.";if(this.hV.length%2==1)throw"value hex must be even length: n="+t.length+",v="+this.hV;var e=this.hV.length/2,i=e.toString(16);if(i.length%2==1&&(i="0"+i),128>e)return i;var r=i.length/2;if(r>15)throw"ASN.1 length too long to represent by 8x: n = "+e.toString(16);var n=128+r;return n.toString(16)+i},this.getEncodedHex=function(){return(null==this.hTLV||this.isModified)&&(this.hV=this.getFreshValueHex(),this.hL=this.getLengthHexFromValue(),this.hTLV=this.hT+this.hL+this.hV,this.isModified=!1),this.hTLV},this.getValueHex=function(){return this.getEncodedHex(),this.hV},this.getFreshValueHex=function(){return""}},KJUR.asn1.DERAbstractString=function(t){KJUR.asn1.DERAbstractString.superclass.constructor.call(this);this.getString=function(){return this.s},this.setString=function(t){this.hTLV=null,this.isModified=!0,this.s=t,this.hV=stohex(this.s)},this.setStringHex=function(t){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=t},this.getFreshValueHex=function(){return this.hV},"undefined"!=typeof t&&("undefined"!=typeof t.str?this.setString(t.str):"undefined"!=typeof t.hex&&this.setStringHex(t.hex))},ji.extend(KJUR.asn1.DERAbstractString,KJUR.asn1.ASN1Object),KJUR.asn1.DERAbstractTime=function(){KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
this.localDateToUTC=function(t){utc=t.getTime()+6e4*t.getTimezoneOffset();var e=new Date(utc);return e},this.formatDate=function(t,e){var i=this.zeroPadding,r=this.localDateToUTC(t),n=String(r.getFullYear());"utc"==e&&(n=n.substr(2,2));var s=i(String(r.getMonth()+1),2),o=i(String(r.getDate()),2),h=i(String(r.getHours()),2),a=i(String(r.getMinutes()),2),u=i(String(r.getSeconds()),2);return n+s+o+h+a+u+"Z"},this.zeroPadding=function(t,e){return t.length>=e?t:new Array(e-t.length+1).join("0")+t},this.getString=function(){return this.s},this.setString=function(t){this.hTLV=null,this.isModified=!0,this.s=t,this.hV=stohex(this.s)},this.setByDateValue=function(t,e,i,r,n,s){var o=new Date(Date.UTC(t,e-1,i,r,n,s,0));this.setByDate(o)},this.getFreshValueHex=function(){return this.hV}},ji.extend(KJUR.asn1.DERAbstractTime,KJUR.asn1.ASN1Object),KJUR.asn1.DERAbstractStructured=function(t){KJUR.asn1.DERAbstractString.superclass.constructor.call(this);this.setByASN1ObjectArray=function(t){this.hTLV=null,this.isModified=!0,this.asn1Array=t},this.appendASN1Object=function(t){this.hTLV=null,this.isModified=!0,this.asn1Array.push(t)},this.asn1Array=new Array,"undefined"!=typeof t&&"undefined"!=typeof t.array&&(this.asn1Array=t.array)},ji.extend(KJUR.asn1.DERAbstractStructured,KJUR.asn1.ASN1Object),KJUR.asn1.DERBoolean=function(){KJUR.asn1.DERBoolean.superclass.constructor.call(this),this.hT="01",this.hTLV="0101ff"},ji.extend(KJUR.asn1.DERBoolean,KJUR.asn1.ASN1Object),KJUR.asn1.DERInteger=function(t){KJUR.asn1.DERInteger.superclass.constructor.call(this),this.hT="02",this.setByBigInteger=function(t){this.hTLV=null,this.isModified=!0,this.hV=KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)},this.setByInteger=function(t){var i=new e(String(t),10);this.setByBigInteger(i)},this.setValueHex=function(t){this.hV=t},this.getFreshValueHex=function(){return this.hV},"undefined"!=typeof t&&("undefined"!=typeof t.bigint?this.setByBigInteger(t.bigint):"undefined"!=typeof t["int"]?this.setByInteger(t["int"]):"undefined"!=typeof t.hex&&this.setValueHex(t.hex))},ji.extend(KJUR.asn1.DERInteger,KJUR.asn1.ASN1Object),KJUR.asn1.DERBitString=function(t){KJUR.asn1.DERBitString.superclass.constructor.call(this),this.hT="03",this.setHexValueIncludingUnusedBits=function(t){this.hTLV=null,this.isModified=!0,this.hV=t},this.setUnusedBitsAndHexValue=function(t,e){if(0>t||t>7)throw"unused bits shall be from 0 to 7: u = "+t;var i="0"+t;this.hTLV=null,this.isModified=!0,this.hV=i+e},this.setByBinaryString=function(t){t=t.replace(/0+$/,"");var e=8-t.length%8;8==e&&(e=0);for(var i=0;e>=i;i++)t+="0";for(var r="",i=0;i<t.length-1;i+=8){var n=t.substr(i,8),s=parseInt(n,2).toString(16);1==s.length&&(s="0"+s),r+=s}this.hTLV=null,this.isModified=!0,this.hV="0"+e+r},this.setByBooleanArray=function(t){for(var e="",i=0;i<t.length;i++)e+=1==t[i]?"1":"0";this.setByBinaryString(e)},this.newFalseArray=function(t){for(var e=new Array(t),i=0;t>i;i++)e[i]=!1;return e},this.getFreshValueHex=function(){return this.hV},"undefined"!=typeof t&&("undefined"!=typeof t.hex?this.setHexValueIncludingUnusedBits(t.hex):"undefined"!=typeof t.bin?this.setByBinaryString(t.bin):"undefined"!=typeof t.array&&this.setByBooleanArray(t.array))},ji.extend(KJUR.asn1.DERBitString,KJUR.asn1.ASN1Object),KJUR.asn1.DEROctetString=function(t){KJUR.asn1.DEROctetString.superclass.constructor.call(this,t),this.hT="04"},ji.extend(KJUR.asn1.DEROctetString,KJUR.asn1.DERAbstractString),KJUR.asn1.DERNull=function(){KJUR.asn1.DERNull.superclass.constructor.call(this),this.hT="05",this.hTLV="0500"},ji.extend(KJUR.asn1.DERNull,KJUR.asn1.ASN1Object),KJUR.asn1.DERObjectIdentifier=function(t){var i=function(t){var e=t.toString(16);return 1==e.length&&(e="0"+e),e},r=function(t){var r="",n=new e(t,10),s=n.toString(2),o=7-s.length%7;7==o&&(o=0);for(var h="",a=0;o>a;a++)h+="0";s=h+s;for(var a=0;a<s.length-1;a+=7){var u=s.substr(a,7);a!=s.length-7&&(u="1"+u),r+=i(parseInt(u,2))}return r};KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this),this.hT="06",this.setValueHex=function(t){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=t},this.setValueOidString=function(t){if(!t.match(/^[0-9.]+$/))throw"malformed oid string: "+t;var e="",n=t.split("."),s=40*parseInt(n[0])+parseInt(n[1]);e+=i(s),n.splice(0,2);for(var o=0;o<n.length;o++)e+=r(n[o]);this.hTLV=null,this.isModified=!0,this.s=null,this.hV=e},this.setValueName=function(t){if("undefined"==typeof KJUR.asn1.x509.OID.name2oidList[t])throw"DERObjectIdentifier oidName undefined: "+t;var e=KJUR.asn1.x509.OID.name2oidList[t];this.setValueOidString(e)},this.getFreshValueHex=function(){return this.hV},"undefined"!=typeof t&&("undefined"!=typeof t.oid?this.setValueOidString(t.oid):"undefined"!=typeof t.hex?this.setValueHex(t.hex):"undefined"!=typeof t.name&&this.setValueName(t.name))},ji.extend(KJUR.asn1.DERObjectIdentifier,KJUR.asn1.ASN1Object),KJUR.asn1.DERUTF8String=function(t){KJUR.asn1.DERUTF8String.superclass.constructor.call(this,t),this.hT="0c"},ji.extend(KJUR.asn1.DERUTF8String,KJUR.asn1.DERAbstractString),KJUR.asn1.DERNumericString=function(t){KJUR.asn1.DERNumericString.superclass.constructor.call(this,t),this.hT="12"},ji.extend(KJUR.asn1.DERNumericString,KJUR.asn1.DERAbstractString),KJUR.asn1.DERPrintableString=function(t){KJUR.asn1.DERPrintableString.superclass.constructor.call(this,t),this.hT="13"},ji.extend(KJUR.asn1.DERPrintableString,KJUR.asn1.DERAbstractString),KJUR.asn1.DERTeletexString=function(t){KJUR.asn1.DERTeletexString.superclass.constructor.call(this,t),this.hT="14"},ji.extend(KJUR.asn1.DERTeletexString,KJUR.asn1.DERAbstractString),KJUR.asn1.DERIA5String=function(t){KJUR.asn1.DERIA5String.superclass.constructor.call(this,t),this.hT="16"},ji.extend(KJUR.asn1.DERIA5String,KJUR.asn1.DERAbstractString),KJUR.asn1.DERUTCTime=function(t){KJUR.asn1.DERUTCTime.superclass.constructor.call(this,t),this.hT="17",this.setByDate=function(t){this.hTLV=null,this.isModified=!0,this.date=t,this.s=this.formatDate(this.date,"utc"),this.hV=stohex(this.s)},"undefined"!=typeof t&&("undefined"!=typeof t.str?this.setString(t.str):"undefined"!=typeof t.hex?this.setStringHex(t.hex):"undefined"!=typeof t.date&&this.setByDate(t.date))},ji.extend(KJUR.asn1.DERUTCTime,KJUR.asn1.DERAbstractTime),KJUR.asn1.DERGeneralizedTime=function(t){KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this,t),this.hT="18",this.setByDate=function(t){this.hTLV=null,this.isModified=!0,this.date=t,this.s=this.formatDate(this.date,"gen"),this.hV=stohex(this.s)},"undefined"!=typeof t&&("undefined"!=typeof t.str?this.setString(t.str):"undefined"!=typeof t.hex?this.setStringHex(t.hex):"undefined"!=typeof t.date&&this.setByDate(t.date))},ji.extend(KJUR.asn1.DERGeneralizedTime,KJUR.asn1.DERAbstractTime),KJUR.asn1.DERSequence=function(t){KJUR.asn1.DERSequence.superclass.constructor.call(this,t),this.hT="30",this.getFreshValueHex=function(){for(var t="",e=0;e<this.asn1Array.length;e++){var i=this.asn1Array[e];t+=i.getEncodedHex()}return this.hV=t,this.hV}},ji.extend(KJUR.asn1.DERSequence,KJUR.asn1.DERAbstractStructured),KJUR.asn1.DERSet=function(t){KJUR.asn1.DERSet.superclass.constructor.call(this,t),this.hT="31",this.getFreshValueHex=function(){for(var t=new Array,e=0;e<this.asn1Array.length;e++){var i=this.asn1Array[e];t.push(i.getEncodedHex())}return t.sort(),this.hV=t.join(""),this.hV}},ji.extend(KJUR.asn1.DERSet,KJUR.asn1.DERAbstractStructured),KJUR.asn1.DERTaggedObject=function(t){KJUR.asn1.DERTaggedObject.superclass.constructor.call(this),this.hT="a0",this.hV="",this.isExplicit=!0,this.asn1Object=null,this.setASN1Object=function(t,e,i){this.hT=e,this.isExplicit=t,this.asn1Object=i,this.isExplicit?(this.hV=this.asn1Object.getEncodedHex(),this.hTLV=null,this.isModified=!0):(this.hV=null,this.hTLV=i.getEncodedHex(),this.hTLV=this.hTLV.replace(/^../,e),this.isModified=!1)},this.getFreshValueHex=function(){return this.hV},"undefined"!=typeof t&&("undefined"!=typeof t.tag&&(this.hT=t.tag),"undefined"!=typeof t.explicit&&(this.isExplicit=t.explicit),"undefined"!=typeof t.obj&&(this.asn1Object=t.obj,this.setASN1Object(this.isExplicit,this.hT,this.asn1Object)))},ji.extend(KJUR.asn1.DERTaggedObject,KJUR.asn1.ASN1Object),function(t){"use strict";var e,i={};i.decode=function(i){var r;if(e===t){var n="0123456789ABCDEF",s=" \f\n\r	 \u2028\u2029";for(e=[],r=0;16>r;++r)e[n.charAt(r)]=r;for(n=n.toLowerCase(),r=10;16>r;++r)e[n.charAt(r)]=r;for(r=0;r<s.length;++r)e[s.charAt(r)]=-1}var o=[],h=0,a=0;for(r=0;r<i.length;++r){var u=i.charAt(r);if("="==u)break;if(u=e[u],-1!=u){if(u===t)throw"Illegal character at offset "+r;h|=u,++a>=2?(o[o.length]=h,h=0,a=0):h<<=4}}if(a)throw"Hex encoding incomplete: 4 bits missing";return o},window.Hex=i}(),function(t){"use strict";var e,i={};i.decode=function(i){var r;if(e===t){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s="= \f\n\r	 \u2028\u2029";for(e=[],r=0;64>r;++r)e[n.charAt(r)]=r;for(r=0;r<s.length;++r)e[s.charAt(r)]=-1}var o=[],h=0,a=0;for(r=0;r<i.length;++r){var u=i.charAt(r);if("="==u)break;if(u=e[u],-1!=u){if(u===t)throw"Illegal character at offset "+r;h|=u,++a>=4?(o[o.length]=h>>16,o[o.length]=h>>8&255,o[o.length]=255&h,h=0,a=0):h<<=6}}switch(a){case 1:throw"Base64 encoding incomplete: at least 2 bits missing";case 2:o[o.length]=h>>10;break;case 3:o[o.length]=h>>16,o[o.length]=h>>8&255}return o},i.re=/-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,i.unarmor=function(t){var e=i.re.exec(t);if(e)if(e[1])t=e[1];else{if(!e[2])throw"RegExp out of sync";t=e[2]}return i.decode(t)},window.Base64=i}(),function(t){"use strict";function e(t,i){t instanceof e?(this.enc=t.enc,this.pos=t.pos):(this.enc=t,this.pos=i)}function i(t,e,i,r,n){this.stream=t,this.header=e,this.length=i,this.tag=r,this.sub=n}var r=100,n="…",s={tag:function(t,e){var i=document.createElement(t);return i.className=e,i},text:function(t){return document.createTextNode(t)}};e.prototype.get=function(e){if(e===t&&(e=this.pos++),e>=this.enc.length)throw"Requesting byte offset "+e+" on a stream of length "+this.enc.length;return this.enc[e]},e.prototype.hexDigits="0123456789ABCDEF",e.prototype.hexByte=function(t){return this.hexDigits.charAt(t>>4&15)+this.hexDigits.charAt(15&t)},e.prototype.hexDump=function(t,e,i){for(var r="",n=t;e>n;++n)if(r+=this.hexByte(this.get(n)),i!==!0)switch(15&n){case 7:r+="  ";break;case 15:r+="\n";break;default:r+=" "}return r},e.prototype.parseStringISO=function(t,e){for(var i="",r=t;e>r;++r)i+=String.fromCharCode(this.get(r));return i},e.prototype.parseStringUTF=function(t,e){for(var i="",r=t;e>r;){var n=this.get(r++);i+=String.fromCharCode(128>n?n:n>191&&224>n?(31&n)<<6|63&this.get(r++):(15&n)<<12|(63&this.get(r++))<<6|63&this.get(r++))}return i},e.prototype.parseStringBMP=function(t,e){for(var i="",r=t;e>r;r+=2){var n=this.get(r),s=this.get(r+1);i+=String.fromCharCode((n<<8)+s)}return i},e.prototype.reTime=/^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,e.prototype.parseTime=function(t,e){var i=this.parseStringISO(t,e),r=this.reTime.exec(i);return r?(i=r[1]+"-"+r[2]+"-"+r[3]+" "+r[4],r[5]&&(i+=":"+r[5],r[6]&&(i+=":"+r[6],r[7]&&(i+="."+r[7]))),r[8]&&(i+=" UTC","Z"!=r[8]&&(i+=r[8],r[9]&&(i+=":"+r[9]))),i):"Unrecognized time: "+i},e.prototype.parseInteger=function(t,e){var i=e-t;if(i>4){i<<=3;var r=this.get(t);if(0===r)i-=8;else for(;128>r;)r<<=1,--i;return"("+i+" bit)"}for(var n=0,s=t;e>s;++s)n=n<<8|this.get(s);return n},e.prototype.parseBitString=function(t,e){var i=this.get(t),r=(e-t-1<<3)-i,n="("+r+" bit)";if(20>=r){var s=i;n+=" ";for(var o=e-1;o>t;--o){for(var h=this.get(o),a=s;8>a;++a)n+=h>>a&1?"1":"0";s=0}}return n},e.prototype.parseOctetString=function(t,e){var i=e-t,s="("+i+" byte) ";i>r&&(e=t+r);for(var o=t;e>o;++o)s+=this.hexByte(this.get(o));return i>r&&(s+=n),s},e.prototype.parseOID=function(t,e){for(var i="",r=0,n=0,s=t;e>s;++s){var o=this.get(s);if(r=r<<7|127&o,n+=7,!(128&o)){if(""===i){var h=80>r?40>r?0:1:2;i=h+"."+(r-40*h)}else i+="."+(n>=31?"bigint":r);r=n=0}}return i},i.prototype.typeName=function(){if(this.tag===t)return"unknown";var e=this.tag>>6,i=(this.tag>>5&1,31&this.tag);switch(e){case 0:switch(i){case 0:return"EOC";case 1:return"BOOLEAN";case 2:return"INTEGER";case 3:return"BIT_STRING";case 4:return"OCTET_STRING";case 5:return"NULL";case 6:return"OBJECT_IDENTIFIER";case 7:return"ObjectDescriptor";case 8:return"EXTERNAL";case 9:return"REAL";case 10:return"ENUMERATED";case 11:return"EMBEDDED_PDV";case 12:return"UTF8String";case 16:return"SEQUENCE";case 17:return"SET";case 18:return"NumericString";case 19:return"PrintableString";case 20:return"TeletexString";case 21:return"VideotexString";case 22:return"IA5String";case 23:return"UTCTime";case 24:return"GeneralizedTime";case 25:return"GraphicString";case 26:return"VisibleString";case 27:return"GeneralString";case 28:return"UniversalString";case 30:return"BMPString";default:return"Universal_"+i.toString(16)}case 1:return"Application_"+i.toString(16);case 2:return"["+i+"]";case 3:return"Private_"+i.toString(16)}},i.prototype.reSeemsASCII=/^[ -~]+$/,i.prototype.content=function(){if(this.tag===t)return null;var e=this.tag>>6,i=31&this.tag,s=this.posContent(),o=Math.abs(this.length);if(0!==e){if(null!==this.sub)return"("+this.sub.length+" elem)";var h=this.stream.parseStringISO(s,s+Math.min(o,r));return this.reSeemsASCII.test(h)?h.substring(0,2*r)+(h.length>2*r?n:""):this.stream.parseOctetString(s,s+o)}switch(i){case 1:return 0===this.stream.get(s)?"false":"true";case 2:return this.stream.parseInteger(s,s+o);case 3:return this.sub?"("+this.sub.length+" elem)":this.stream.parseBitString(s,s+o);case 4:return this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(s,s+o);case 6:return this.stream.parseOID(s,s+o);case 16:case 17:return"("+this.sub.length+" elem)";case 12:return this.stream.parseStringUTF(s,s+o);case 18:case 19:case 20:case 21:case 22:case 26:return this.stream.parseStringISO(s,s+o);case 30:return this.stream.parseStringBMP(s,s+o);case 23:case 24:return this.stream.parseTime(s,s+o)}return null},i.prototype.toString=function(){return this.typeName()+"@"+this.stream.pos+"[header:"+this.header+",length:"+this.length+",sub:"+(null===this.sub?"null":this.sub.length)+"]"},i.prototype.print=function(e){if(e===t&&(e=""),document.writeln(e+this),null!==this.sub){e+="  ";for(var i=0,r=this.sub.length;r>i;++i)this.sub[i].print(e)}},i.prototype.toPrettyString=function(e){e===t&&(e="");var i=e+this.typeName()+" @"+this.stream.pos;if(this.length>=0&&(i+="+"),i+=this.length,32&this.tag?i+=" (constructed)":3!=this.tag&&4!=this.tag||null===this.sub||(i+=" (encapsulates)"),i+="\n",null!==this.sub){e+="  ";for(var r=0,n=this.sub.length;n>r;++r)i+=this.sub[r].toPrettyString(e)}return i},i.prototype.toDOM=function(){var t=s.tag("div","node");t.asn1=this;var e=s.tag("div","head"),i=this.typeName().replace(/_/g," ");e.innerHTML=i;var r=this.content();if(null!==r){r=String(r).replace(/</g,"&lt;");var n=s.tag("span","preview");n.appendChild(s.text(r)),e.appendChild(n)}t.appendChild(e),this.node=t,this.head=e;var o=s.tag("div","value");if(i="Offset: "+this.stream.pos+"<br/>",i+="Length: "+this.header+"+",i+=this.length>=0?this.length:-this.length+" (undefined)",32&this.tag?i+="<br/>(constructed)":3!=this.tag&&4!=this.tag||null===this.sub||(i+="<br/>(encapsulates)"),null!==r&&(i+="<br/>Value:<br/><b>"+r+"</b>","object"==typeof oids&&6==this.tag)){var h=oids[r];h&&(h.d&&(i+="<br/>"+h.d),h.c&&(i+="<br/>"+h.c),h.w&&(i+="<br/>(warning!)"))}o.innerHTML=i,t.appendChild(o);var a=s.tag("div","sub");if(null!==this.sub)for(var u=0,c=this.sub.length;c>u;++u)a.appendChild(this.sub[u].toDOM());return t.appendChild(a),e.onclick=function(){t.className="node collapsed"==t.className?"node":"node collapsed"},t},i.prototype.posStart=function(){return this.stream.pos},i.prototype.posContent=function(){return this.stream.pos+this.header},i.prototype.posEnd=function(){return this.stream.pos+this.header+Math.abs(this.length)},i.prototype.fakeHover=function(t){this.node.className+=" hover",t&&(this.head.className+=" hover")},i.prototype.fakeOut=function(t){var e=/ ?hover/;this.node.className=this.node.className.replace(e,""),t&&(this.head.className=this.head.className.replace(e,""))},i.prototype.toHexDOM_sub=function(t,e,i,r,n){if(!(r>=n)){var o=s.tag("span",e);o.appendChild(s.text(i.hexDump(r,n))),t.appendChild(o)}},i.prototype.toHexDOM=function(e){var i=s.tag("span","hex");if(e===t&&(e=i),this.head.hexNode=i,this.head.onmouseover=function(){this.hexNode.className="hexCurrent"},this.head.onmouseout=function(){this.hexNode.className="hex"},i.asn1=this,i.onmouseover=function(){var t=!e.selected;t&&(e.selected=this.asn1,this.className="hexCurrent"),this.asn1.fakeHover(t)},i.onmouseout=function(){var t=e.selected==this.asn1;this.asn1.fakeOut(t),t&&(e.selected=null,this.className="hex")},this.toHexDOM_sub(i,"tag",this.stream,this.posStart(),this.posStart()+1),this.toHexDOM_sub(i,this.length>=0?"dlen":"ulen",this.stream,this.posStart()+1,this.posContent()),null===this.sub)i.appendChild(s.text(this.stream.hexDump(this.posContent(),this.posEnd())));else if(this.sub.length>0){var r=this.sub[0],n=this.sub[this.sub.length-1];this.toHexDOM_sub(i,"intro",this.stream,this.posContent(),r.posStart());for(var o=0,h=this.sub.length;h>o;++o)i.appendChild(this.sub[o].toHexDOM(e));this.toHexDOM_sub(i,"outro",this.stream,n.posEnd(),this.posEnd())}return i},i.prototype.toHexString=function(){return this.stream.hexDump(this.posStart(),this.posEnd(),!0)},i.decodeLength=function(t){var e=t.get(),i=127&e;if(i==e)return i;if(i>3)throw"Length over 24 bits not supported at position "+(t.pos-1);if(0===i)return-1;e=0;for(var r=0;i>r;++r)e=e<<8|t.get();return e},i.hasContent=function(t,r,n){if(32&t)return!0;if(3>t||t>4)return!1;var s=new e(n);3==t&&s.get();var o=s.get();if(o>>6&1)return!1;try{var h=i.decodeLength(s);return s.pos-n.pos+h==r}catch(a){return!1}},i.decode=function(t){t instanceof e||(t=new e(t,0));var r=new e(t),n=t.get(),s=i.decodeLength(t),o=t.pos-r.pos,h=null;if(i.hasContent(n,s,t)){var a=t.pos;if(3==n&&t.get(),h=[],s>=0){for(var u=a+s;t.pos<u;)h[h.length]=i.decode(t);if(t.pos!=u)throw"Content size is not correct for container starting at offset "+a}else try{for(;;){var c=i.decode(t);if(0===c.tag)break;h[h.length]=c}s=a-t.pos}catch(f){throw"Exception while decoding undefined length content: "+f}}else t.pos+=s;return new i(r,o,s,n,h)},i.test=function(){for(var t=[{value:[39],expected:39},{value:[129,201],expected:201},{value:[131,254,220,186],expected:16702650}],r=0,n=t.length;n>r;++r){var s=new e(t[r].value,0),o=i.decodeLength(s);o!=t[r].expected&&document.write("In test["+r+"] expected "+t[r].expected+" got "+o+"\n")}},window.ASN1=i}(),ASN1.prototype.getHexStringValue=function(){var t=this.toHexString(),e=2*this.header,i=2*this.length;return t.substr(e,i)},fi.prototype.parseKey=function(t){try{var e=/^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,i=e.test(t)?Hex.decode(t):Base64.unarmor(t),r=ASN1.decode(i);if(9===r.sub.length){var n=r.sub[1].getHexStringValue();this.n=ui(n,16);var s=r.sub[2].getHexStringValue();this.e=parseInt(s,16);var o=r.sub[3].getHexStringValue();this.d=ui(o,16);var h=r.sub[4].getHexStringValue();this.p=ui(h,16);var a=r.sub[5].getHexStringValue();this.q=ui(a,16);var u=r.sub[6].getHexStringValue();this.dmp1=ui(u,16);var c=r.sub[7].getHexStringValue();this.dmq1=ui(c,16);var f=r.sub[8].getHexStringValue();this.coeff=ui(f,16)}else{if(2!==r.sub.length)return!1;var p=r.sub[1],l=p.sub[0],n=l.sub[0].getHexStringValue();this.n=ui(n,16);var s=l.sub[1].getHexStringValue();this.e=parseInt(s,16)}return!0}catch(d){return!1}},fi.prototype.getPrivateBaseKey=function(){var t={array:[new KJUR.asn1.DERInteger({"int":0}),new KJUR.asn1.DERInteger({bigint:this.n}),new KJUR.asn1.DERInteger({"int":this.e}),new KJUR.asn1.DERInteger({bigint:this.d}),new KJUR.asn1.DERInteger({bigint:this.p}),new KJUR.asn1.DERInteger({bigint:this.q}),new KJUR.asn1.DERInteger({bigint:this.dmp1}),new KJUR.asn1.DERInteger({bigint:this.dmq1}),new KJUR.asn1.DERInteger({bigint:this.coeff})]},e=new KJUR.asn1.DERSequence(t);return e.getEncodedHex()},fi.prototype.getPrivateBaseKeyB64=function(){return Ti(this.getPrivateBaseKey())},fi.prototype.getPublicBaseKey=function(){var t={array:[new KJUR.asn1.DERObjectIdentifier({oid:"1.2.840.113549.1.1.1"}),new KJUR.asn1.DERNull]},e=new KJUR.asn1.DERSequence(t);t={array:[new KJUR.asn1.DERInteger({bigint:this.n}),new KJUR.asn1.DERInteger({"int":this.e})]};var i=new KJUR.asn1.DERSequence(t);t={hex:"00"+i.getEncodedHex()};var r=new KJUR.asn1.DERBitString(t);t={array:[e,r]};var n=new KJUR.asn1.DERSequence(t);return n.getEncodedHex()},fi.prototype.getPublicBaseKeyB64=function(){return Ti(this.getPublicBaseKey())},fi.prototype.wordwrap=function(t,e){if(e=e||64,!t)return t;var i="(.{1,"+e+"})( +|$\n?)|(.{1,"+e+"})";return t.match(RegExp(i,"g")).join("\n")},fi.prototype.getPrivateKey=function(){var t="-----BEGIN RSA PRIVATE KEY-----\n";return t+=this.wordwrap(this.getPrivateBaseKeyB64())+"\n",t+="-----END RSA PRIVATE KEY-----"},fi.prototype.getPublicKey=function(){var t="-----BEGIN PUBLIC KEY-----\n";return t+=this.wordwrap(this.getPublicBaseKeyB64())+"\n",t+="-----END PUBLIC KEY-----"},fi.prototype.hasPublicKeyProperty=function(t){return t=t||{},t.hasOwnProperty("n")&&t.hasOwnProperty("e")},fi.prototype.hasPrivateKeyProperty=function(t){return t=t||{},t.hasOwnProperty("n")&&t.hasOwnProperty("e")&&t.hasOwnProperty("d")&&t.hasOwnProperty("p")&&t.hasOwnProperty("q")&&t.hasOwnProperty("dmp1")&&t.hasOwnProperty("dmq1")&&t.hasOwnProperty("coeff")},fi.prototype.parsePropertiesFrom=function(t){this.n=t.n,this.e=t.e,t.hasOwnProperty("d")&&(this.d=t.d,this.p=t.p,this.q=t.q,this.dmp1=t.dmp1,this.dmq1=t.dmq1,this.coeff=t.coeff)};var zi=function(t){fi.call(this),t&&("string"==typeof t?this.parseKey(t):(this.hasPrivateKeyProperty(t)||this.hasPublicKeyProperty(t))&&this.parsePropertiesFrom(t))};zi.prototype=new fi,zi.prototype.constructor=zi;var $i=function(t){t=t||{},this.default_key_size=parseInt(t.default_key_size)||1024,this.default_public_exponent=t.default_public_exponent||"010001",this.log=t.log||!1,this.key=null};$i.prototype.setKey=function(t){this.log&&this.key&&console.warn("A key was already set, overriding existing."),this.key=new zi(t)},$i.prototype.setPrivateKey=function(t){this.setKey(t)},$i.prototype.setPublicKey=function(t){this.setKey(t)},$i.prototype.decrypt=function(t){try{return this.getKey().decrypt(Ri(t))}catch(e){return!1}},$i.prototype.encrypt=function(t){try{return Ti(this.getKey().encrypt(t))}catch(e){return!1}},$i.prototype.getKey=function(t){if(!this.key){if(this.key=new zi,t&&"[object Function]"==={}.toString.call(t))return void this.key.generateAsync(this.default_key_size,this.default_public_exponent,t);this.key.generate(this.default_key_size,this.default_public_exponent)}return this.key},$i.prototype.getPrivateKey=function(){return this.getKey().getPrivateKey()},$i.prototype.getPrivateKeyB64=function(){return this.getKey().getPrivateBaseKeyB64()},$i.prototype.getPublicKey=function(){return this.getKey().getPublicKey()},$i.prototype.getPublicKeyB64=function(){return this.getKey().getPublicBaseKeyB64()},t.JSEncrypt=$i}(JSEncryptExports);var JSEncrypt=JSEncryptExports.JSEncrypt;$.jCryption.crypt=new JSEncrypt;var CryptoJS=CryptoJS||function(t,e){var i={},r=i.lib={},n=function(){},s=r.Base={extend:function(t){n.prototype=this;var e=new n;return t&&e.mixIn(t),e.hasOwnProperty("init")||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},o=r.WordArray=s.extend({init:function(t,i){t=this.words=t||[],this.sigBytes=i!=e?i:4*t.length},toString:function(t){return(t||a).stringify(this)},concat:function(t){var e=this.words,i=t.words,r=this.sigBytes;if(t=t.sigBytes,this.clamp(),r%4)for(var n=0;t>n;n++)e[r+n>>>2]|=(i[n>>>2]>>>24-8*(n%4)&255)<<24-8*((r+n)%4);else if(65535<i.length)for(n=0;t>n;n+=4)e[r+n>>>2]=i[n>>>2];else e.push.apply(e,i);return this.sigBytes+=t,this},clamp:function(){var e=this.words,i=this.sigBytes;e[i>>>2]&=4294967295<<32-8*(i%4),e.length=t.ceil(i/4)},clone:function(){var t=s.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var i=[],r=0;e>r;r+=4)i.push(4294967296*t.random()|0);return new o.init(i,e)}}),h=i.enc={},a=h.Hex={stringify:function(t){var e=t.words;t=t.sigBytes;for(var i=[],r=0;t>r;r++){var n=e[r>>>2]>>>24-8*(r%4)&255;i.push((n>>>4).toString(16)),i.push((15&n).toString(16))}return i.join("")},parse:function(t){for(var e=t.length,i=[],r=0;e>r;r+=2)i[r>>>3]|=parseInt(t.substr(r,2),16)<<24-4*(r%8);return new o.init(i,e/2)}},u=h.Latin1={stringify:function(t){var e=t.words;t=t.sigBytes;for(var i=[],r=0;t>r;r++)i.push(String.fromCharCode(e[r>>>2]>>>24-8*(r%4)&255));return i.join("")},parse:function(t){for(var e=t.length,i=[],r=0;e>r;r++)i[r>>>2]|=(255&t.charCodeAt(r))<<24-8*(r%4);return new o.init(i,e)}},c=h.Utf8={stringify:function(t){try{return decodeURIComponent(escape(u.stringify(t)))}catch(e){throw Error("Malformed UTF-8 data")}},parse:function(t){return u.parse(unescape(encodeURIComponent(t)))}},f=r.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new o.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=c.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var i=this._data,r=i.words,n=i.sigBytes,s=this.blockSize,h=n/(4*s),h=e?t.ceil(h):t.max((0|h)-this._minBufferSize,0);if(e=h*s,n=t.min(4*e,n),e){for(var a=0;e>a;a+=s)this._doProcessBlock(r,a);a=r.splice(0,e),i.sigBytes-=n}return new o.init(a,n)},clone:function(){var t=s.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});r.Hasher=f.extend({cfg:s.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){f.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,i){return new t.init(i).finalize(e)}},_createHmacHelper:function(t){return function(e,i){return new p.HMAC.init(t,i).finalize(e)}}});var p=i.algo={};return i}(Math);!function(){var t=CryptoJS,e=t.lib.WordArray;t.enc.Base64={stringify:function(t){var e=t.words,i=t.sigBytes,r=this._map;t.clamp(),t=[];for(var n=0;i>n;n+=3)for(var s=(e[n>>>2]>>>24-8*(n%4)&255)<<16|(e[n+1>>>2]>>>24-8*((n+1)%4)&255)<<8|e[n+2>>>2]>>>24-8*((n+2)%4)&255,o=0;4>o&&i>n+.75*o;o++)t.push(r.charAt(s>>>6*(3-o)&63));if(e=r.charAt(64))for(;t.length%4;)t.push(e);return t.join("")},parse:function(t){var i=t.length,r=this._map,n=r.charAt(64);n&&(n=t.indexOf(n),-1!=n&&(i=n));for(var n=[],s=0,o=0;i>o;o++)if(o%4){var h=r.indexOf(t.charAt(o-1))<<2*(o%4),a=r.indexOf(t.charAt(o))>>>6-2*(o%4);n[s>>>2]|=(h|a)<<24-8*(s%4),s++}return e.create(n,s)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(t){function e(t,e,i,r,n,s,o){return t=t+(e&i|~e&r)+n+o,(t<<s|t>>>32-s)+e}function i(t,e,i,r,n,s,o){return t=t+(e&r|i&~r)+n+o,(t<<s|t>>>32-s)+e}function r(t,e,i,r,n,s,o){return t=t+(e^i^r)+n+o,(t<<s|t>>>32-s)+e}function n(t,e,i,r,n,s,o){return t=t+(i^(e|~r))+n+o,(t<<s|t>>>32-s)+e}for(var s=CryptoJS,o=s.lib,h=o.WordArray,a=o.Hasher,o=s.algo,u=[],c=0;64>c;c++)u[c]=4294967296*t.abs(t.sin(c+1))|0;o=o.MD5=a.extend({_doReset:function(){this._hash=new h.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,s){for(var o=0;16>o;o++){var h=s+o,a=t[h];t[h]=16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8)}var o=this._hash.words,h=t[s+0],a=t[s+1],c=t[s+2],f=t[s+3],p=t[s+4],l=t[s+5],d=t[s+6],g=t[s+7],y=t[s+8],m=t[s+9],v=t[s+10],b=t[s+11],S=t[s+12],T=t[s+13],R=t[s+14],E=t[s+15],x=o[0],D=o[1],w=o[2],B=o[3],x=e(x,D,w,B,h,7,u[0]),B=e(B,x,D,w,a,12,u[1]),w=e(w,B,x,D,c,17,u[2]),D=e(D,w,B,x,f,22,u[3]),x=e(x,D,w,B,p,7,u[4]),B=e(B,x,D,w,l,12,u[5]),w=e(w,B,x,D,d,17,u[6]),D=e(D,w,B,x,g,22,u[7]),x=e(x,D,w,B,y,7,u[8]),B=e(B,x,D,w,m,12,u[9]),w=e(w,B,x,D,v,17,u[10]),D=e(D,w,B,x,b,22,u[11]),x=e(x,D,w,B,S,7,u[12]),B=e(B,x,D,w,T,12,u[13]),w=e(w,B,x,D,R,17,u[14]),D=e(D,w,B,x,E,22,u[15]),x=i(x,D,w,B,a,5,u[16]),B=i(B,x,D,w,d,9,u[17]),w=i(w,B,x,D,b,14,u[18]),D=i(D,w,B,x,h,20,u[19]),x=i(x,D,w,B,l,5,u[20]),B=i(B,x,D,w,v,9,u[21]),w=i(w,B,x,D,E,14,u[22]),D=i(D,w,B,x,p,20,u[23]),x=i(x,D,w,B,m,5,u[24]),B=i(B,x,D,w,R,9,u[25]),w=i(w,B,x,D,f,14,u[26]),D=i(D,w,B,x,y,20,u[27]),x=i(x,D,w,B,T,5,u[28]),B=i(B,x,D,w,c,9,u[29]),w=i(w,B,x,D,g,14,u[30]),D=i(D,w,B,x,S,20,u[31]),x=r(x,D,w,B,l,4,u[32]),B=r(B,x,D,w,y,11,u[33]),w=r(w,B,x,D,b,16,u[34]),D=r(D,w,B,x,R,23,u[35]),x=r(x,D,w,B,a,4,u[36]),B=r(B,x,D,w,p,11,u[37]),w=r(w,B,x,D,g,16,u[38]),D=r(D,w,B,x,v,23,u[39]),x=r(x,D,w,B,T,4,u[40]),B=r(B,x,D,w,h,11,u[41]),w=r(w,B,x,D,f,16,u[42]),D=r(D,w,B,x,d,23,u[43]),x=r(x,D,w,B,m,4,u[44]),B=r(B,x,D,w,S,11,u[45]),w=r(w,B,x,D,E,16,u[46]),D=r(D,w,B,x,c,23,u[47]),x=n(x,D,w,B,h,6,u[48]),B=n(B,x,D,w,g,10,u[49]),w=n(w,B,x,D,R,15,u[50]),D=n(D,w,B,x,l,21,u[51]),x=n(x,D,w,B,S,6,u[52]),B=n(B,x,D,w,f,10,u[53]),w=n(w,B,x,D,v,15,u[54]),D=n(D,w,B,x,a,21,u[55]),x=n(x,D,w,B,y,6,u[56]),B=n(B,x,D,w,E,10,u[57]),w=n(w,B,x,D,d,15,u[58]),D=n(D,w,B,x,T,21,u[59]),x=n(x,D,w,B,p,6,u[60]),B=n(B,x,D,w,b,10,u[61]),w=n(w,B,x,D,c,15,u[62]),D=n(D,w,B,x,m,21,u[63]);o[0]=o[0]+x|0,o[1]=o[1]+D|0,o[2]=o[2]+w|0,o[3]=o[3]+B|0},_doFinalize:function(){var e=this._data,i=e.words,r=8*this._nDataBytes,n=8*e.sigBytes;i[n>>>5]|=128<<24-n%32;var s=t.floor(r/4294967296);for(i[(n+64>>>9<<4)+15]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),i[(n+64>>>9<<4)+14]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),e.sigBytes=4*(i.length+1),this._process(),e=this._hash,i=e.words,r=0;4>r;r++)n=i[r],i[r]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8);return e},clone:function(){var t=a.clone.call(this);return t._hash=this._hash.clone(),t}}),s.MD5=a._createHelper(o),s.HmacMD5=a._createHmacHelper(o)}(Math),function(){var t=CryptoJS,e=t.lib,i=e.Base,r=e.WordArray,e=t.algo,n=e.EvpKDF=i.extend({cfg:i.extend({keySize:4,hasher:e.MD5,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var i=this.cfg,n=i.hasher.create(),s=r.create(),o=s.words,h=i.keySize,i=i.iterations;o.length<h;){a&&n.update(a);var a=n.update(t).finalize(e);n.reset();for(var u=1;i>u;u++)a=n.finalize(a),n.reset();s.concat(a)}return s.sigBytes=4*h,s}});t.EvpKDF=function(t,e,i){return n.create(i).compute(t,e)}}(),CryptoJS.lib.Cipher||function(t){var e=CryptoJS,i=e.lib,r=i.Base,n=i.WordArray,s=i.BufferedBlockAlgorithm,o=e.enc.Base64,h=e.algo.EvpKDF,a=i.Cipher=s.extend({cfg:r.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,i){this.cfg=this.cfg.extend(i),this._xformMode=t,this._key=e,this.reset()},reset:function(){s.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(t){return{encrypt:function(e,i,r){return("string"==typeof i?d:l).encrypt(t,e,i,r)},decrypt:function(e,i,r){return("string"==typeof i?d:l).decrypt(t,e,i,r)}}}});i.StreamCipher=a.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var u=e.mode={},c=function(e,i,r){var n=this._iv;n?this._iv=t:n=this._prevBlock;for(var s=0;r>s;s++)e[i+s]^=n[s]},f=(i.BlockCipherMode=r.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e
}})).extend();f.Encryptor=f.extend({processBlock:function(t,e){var i=this._cipher,r=i.blockSize;c.call(this,t,e,r),i.encryptBlock(t,e),this._prevBlock=t.slice(e,e+r)}}),f.Decryptor=f.extend({processBlock:function(t,e){var i=this._cipher,r=i.blockSize,n=t.slice(e,e+r);i.decryptBlock(t,e),c.call(this,t,e,r),this._prevBlock=n}}),u=u.CBC=f,f=(e.pad={}).Pkcs7={pad:function(t,e){for(var i=4*e,i=i-t.sigBytes%i,r=i<<24|i<<16|i<<8|i,s=[],o=0;i>o;o+=4)s.push(r);i=n.create(s,i),t.concat(i)},unpad:function(t){t.sigBytes-=255&t.words[t.sigBytes-1>>>2]}},i.BlockCipher=a.extend({cfg:a.cfg.extend({mode:u,padding:f}),reset:function(){a.reset.call(this);var t=this.cfg,e=t.iv,t=t.mode;if(this._xformMode==this._ENC_XFORM_MODE)var i=t.createEncryptor;else i=t.createDecryptor,this._minBufferSize=1;this._mode=i.call(t,this,e&&e.words)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){t.pad(this._data,this.blockSize);var e=this._process(!0)}else e=this._process(!0),t.unpad(e);return e},blockSize:4});var p=i.CipherParams=r.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}}),u=(e.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext;return t=t.salt,(t?n.create([1398893684,1701076831]).concat(t).concat(e):e).toString(o)},parse:function(t){t=o.parse(t);var e=t.words;if(1398893684==e[0]&&1701076831==e[1]){var i=n.create(e.slice(2,4));e.splice(0,4),t.sigBytes-=16}return p.create({ciphertext:t,salt:i})}},l=i.SerializableCipher=r.extend({cfg:r.extend({format:u}),encrypt:function(t,e,i,r){r=this.cfg.extend(r);var n=t.createEncryptor(i,r);return e=n.finalize(e),n=n.cfg,p.create({ciphertext:e,key:i,iv:n.iv,algorithm:t,mode:n.mode,padding:n.padding,blockSize:t.blockSize,formatter:r.format})},decrypt:function(t,e,i,r){return r=this.cfg.extend(r),e=this._parse(e,r.format),t.createDecryptor(i,r).finalize(e.ciphertext)},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),e=(e.kdf={}).OpenSSL={execute:function(t,e,i,r){return r||(r=n.random(8)),t=h.create({keySize:e+i}).compute(t,r),i=n.create(t.words.slice(e),4*i),t.sigBytes=4*e,p.create({key:t,iv:i,salt:r})}},d=i.PasswordBasedCipher=l.extend({cfg:l.cfg.extend({kdf:e}),encrypt:function(t,e,i,r){return r=this.cfg.extend(r),i=r.kdf.execute(i,t.keySize,t.ivSize),r.iv=i.iv,t=l.encrypt.call(this,t,e,i.key,r),t.mixIn(i),t},decrypt:function(t,e,i,r){return r=this.cfg.extend(r),e=this._parse(e,r.format),i=r.kdf.execute(i,t.keySize,t.ivSize,e.salt),r.iv=i.iv,l.decrypt.call(this,t,e,i.key,r)}})}(),function(){for(var t=CryptoJS,e=t.lib.BlockCipher,i=t.algo,r=[],n=[],s=[],o=[],h=[],a=[],u=[],c=[],f=[],p=[],l=[],d=0;256>d;d++)l[d]=128>d?d<<1:d<<1^283;for(var g=0,y=0,d=0;256>d;d++){var m=y^y<<1^y<<2^y<<3^y<<4,m=m>>>8^255&m^99;r[g]=m,n[m]=g;var v=l[g],b=l[v],S=l[b],T=257*l[m]^16843008*m;s[g]=T<<24|T>>>8,o[g]=T<<16|T>>>16,h[g]=T<<8|T>>>24,a[g]=T,T=16843009*S^65537*b^257*v^16843008*g,u[m]=T<<24|T>>>8,c[m]=T<<16|T>>>16,f[m]=T<<8|T>>>24,p[m]=T,g?(g=v^l[l[l[S^v]]],y^=l[l[y]]):g=y=1}var R=[0,1,2,4,8,16,32,64,128,27,54],i=i.AES=e.extend({_doReset:function(){for(var t=this._key,e=t.words,i=t.sigBytes/4,t=4*((this._nRounds=i+6)+1),n=this._keySchedule=[],s=0;t>s;s++)if(i>s)n[s]=e[s];else{var o=n[s-1];s%i?i>6&&4==s%i&&(o=r[o>>>24]<<24|r[o>>>16&255]<<16|r[o>>>8&255]<<8|r[255&o]):(o=o<<8|o>>>24,o=r[o>>>24]<<24|r[o>>>16&255]<<16|r[o>>>8&255]<<8|r[255&o],o^=R[s/i|0]<<24),n[s]=n[s-i]^o}for(e=this._invKeySchedule=[],i=0;t>i;i++)s=t-i,o=i%4?n[s]:n[s-4],e[i]=4>i||4>=s?o:u[r[o>>>24]]^c[r[o>>>16&255]]^f[r[o>>>8&255]]^p[r[255&o]]},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,s,o,h,a,r)},decryptBlock:function(t,e){var i=t[e+1];t[e+1]=t[e+3],t[e+3]=i,this._doCryptBlock(t,e,this._invKeySchedule,u,c,f,p,n),i=t[e+1],t[e+1]=t[e+3],t[e+3]=i},_doCryptBlock:function(t,e,i,r,n,s,o,h){for(var a=this._nRounds,u=t[e]^i[0],c=t[e+1]^i[1],f=t[e+2]^i[2],p=t[e+3]^i[3],l=4,d=1;a>d;d++)var g=r[u>>>24]^n[c>>>16&255]^s[f>>>8&255]^o[255&p]^i[l++],y=r[c>>>24]^n[f>>>16&255]^s[p>>>8&255]^o[255&u]^i[l++],m=r[f>>>24]^n[p>>>16&255]^s[u>>>8&255]^o[255&c]^i[l++],p=r[p>>>24]^n[u>>>16&255]^s[c>>>8&255]^o[255&f]^i[l++],u=g,c=y,f=m;g=(h[u>>>24]<<24|h[c>>>16&255]<<16|h[f>>>8&255]<<8|h[255&p])^i[l++],y=(h[c>>>24]<<24|h[f>>>16&255]<<16|h[p>>>8&255]<<8|h[255&u])^i[l++],m=(h[f>>>24]<<24|h[p>>>16&255]<<16|h[u>>>8&255]<<8|h[255&c])^i[l++],p=(h[p>>>24]<<24|h[u>>>16&255]<<16|h[c>>>8&255]<<8|h[255&f])^i[l++],t[e]=g,t[e+1]=y,t[e+2]=m,t[e+3]=p},keySize:8});t.AES=e._createHelper(i)}();
/*!
* Parsleyjs
* Guillaume Potier - <guillaume@wisembly.com>
* Version 2.2.0-rc1 - built Sun Aug 16 2015 14:04:07
* MIT Licensed
*
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function b(a,b){return a.parsleyAdaptedCallback||(a.parsleyAdaptedCallback=function(){var c=Array.prototype.slice.call(arguments,0);c.unshift(this),a.apply(b||x,c)}),a.parsleyAdaptedCallback}function c(a){return 0===a.lastIndexOf(z,0)?a.substr(z.length):a}"undefined"==typeof a&&"undefined"!=typeof window.jQuery&&(a=window.jQuery);var d=1,e={},f={attr:function(a,b,c){var d,e,f=new RegExp("^"+b,"i");if("undefined"==typeof c)c={};else for(var g in c)c.hasOwnProperty(g)&&delete c[g];if("undefined"==typeof a||"undefined"==typeof a[0])return c;e=a[0].attributes;for(var g=e.length;g--;)d=e[g],d&&d.specified&&f.test(d.name)&&(c[this.camelize(d.name.slice(b.length))]=this.deserializeValue(d.value));return c},checkAttr:function(a,b,c){return a.is("["+b+c+"]")},setAttr:function(a,b,c,d){a[0].setAttribute(this.dasherize(b+c),String(d))},generateID:function(){return""+d++},deserializeValue:function(b){var c;try{return b?"true"==b||("false"==b?!1:"null"==b?null:isNaN(c=Number(b))?/^[\[\{]/.test(b)?a.parseJSON(b):b:c):b}catch(d){return b}},camelize:function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},dasherize:function(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()},warn:function(){window.console&&"function"==typeof window.console.warn&&window.console.warn.apply(window.console,arguments)},warnOnce:function(a){e[a]||(e[a]=!0,this.warn.apply(this,arguments))},_resetWarnings:function(){e={}},trimString:function(a){return a.replace(/^\s+|\s+$/g,"")},objectCreate:Object.create||function(){var a=function(){};return function(b){if(arguments.length>1)throw Error("Second argument not supported");if("object"!=typeof b)throw TypeError("Argument must be an object");a.prototype=b;var c=new a;return a.prototype=null,c}}()},g={namespace:"data-parsley-",inputs:"input, textarea, select",excluded:"input[type=button], input[type=submit], input[type=reset], input[type=hidden]",priorityEnabled:!0,multiple:null,group:null,uiEnabled:!0,validationThreshold:3,focus:"first",trigger:!1,errorClass:"parsley-error",successClass:"parsley-success",classHandler:function(){},errorsContainer:function(){},errorsWrapper:'<ul class="parsley-errors-list"></ul>',errorTemplate:"<li></li>"},h=function(){};h.prototype={asyncSupport:!0,actualizeOptions:function(){return f.attr(this.$element,this.options.namespace,this.domOptions),this.parent&&this.parent.actualizeOptions&&this.parent.actualizeOptions(),this},_resetOptions:function(a){this.domOptions=f.objectCreate(this.parent.options),this.options=f.objectCreate(this.domOptions);for(var b in a)a.hasOwnProperty(b)&&(this.options[b]=a[b]);this.actualizeOptions()},_listeners:null,on:function(a,b){this._listeners=this._listeners||{};var c=this._listeners[a]=this._listeners[a]||[];return c.push(b),this},subscribe:function(b,c){a.listenTo(this,b.toLowerCase(),c)},off:function(a,b){var c=this._listeners&&this._listeners[a];if(c)if(b)for(var d=c.length;d--;)c[d]===b&&c.splice(d,1);else delete this._listeners[a];return this},unsubscribe:function(b){a.unsubscribeTo(this,b.toLowerCase())},trigger:function(a,b){b=b||this;var c,d=this._listeners&&this._listeners[a];if(d)for(var e=d.length;e--;)if(c=d[e].call(b,b),c===!1)return c;return this.parent?this.parent.trigger(a,b):!0},reset:function(){if("ParsleyForm"!==this.__class__)return this._trigger("reset");for(var a=0;a<this.fields.length;a++)this.fields[a]._trigger("reset");this._trigger("reset")},destroy:function(){if("ParsleyForm"!==this.__class__)return this.$element.removeData("Parsley"),this.$element.removeData("ParsleyFieldMultiple"),void this._trigger("destroy");for(var a=0;a<this.fields.length;a++)this.fields[a].destroy();this.$element.removeData("Parsley"),this._trigger("destroy")},asyncIsValid:function(){return f.warnOnce("asyncIsValid is deprecated; please use whenIsValid instead"),this.whenValid.apply(this,arguments)},_findRelatedMultiple:function(){return this.parent.$element.find("["+this.options.namespace+'multiple="'+this.options.multiple+'"]')}};var i={string:function(a){return a},integer:function(a){if(isNaN(a))throw'Requirement is not an integer: "'+a+'"';return parseInt(a,10)},number:function(a){if(isNaN(a))throw'Requirement is not a number: "'+a+'"';return parseFloat(a)},reference:function(b){var c=a(b);if(0===c.length)throw'No such reference: "'+b+'"';return c},"boolean":function(a){return"false"!==a},object:function(a){return f.deserializeValue(a)},regexp:function(a){var b="";return/^\/.*\/(?:[gimy]*)$/.test(a)&&(b=a.replace(/.*\/([gimy]*)$/,"$1"),a=a.replace(new RegExp("^/(.*?)/"+b+"$"),"$1")),new RegExp(a,b)}},j=function(a,b){var c=a.match(/^\s*\[(.*)\]\s*$/);if(!c)throw'Requirement is not an array: "'+a+'"';var d=c[1].split(",").map(f.trimString);if(d.length!==b)throw"Requirement has "+d.length+" values when "+b+" are needed";return d},k=function(a,b){var c=i[a||"string"];if(!c)throw'Unknown requirement specification: "'+a+'"';return c(b)},l=function(a,b,c){var d=null,e={};for(var f in a)if(f){var g=c(f);"string"==typeof g&&(g=k(a[f],g)),e[f]=g}else d=k(a[f],b);return[d,e]},m=function(b){a.extend(!0,this,b)};m.prototype={validate:function(b,c){if(this.fn)return arguments.length>3&&(c=[].slice.call(arguments,1,-1)),this.fn.call(this,b,c);if(a.isArray(b)){if(!this.validateMultiple)throw"Validator `"+this.name+"` does not handle multiple values";return this.validateMultiple.apply(this,arguments)}if(this.validateNumber)return isNaN(b)?!1:(b=parseFloat(b),this.validateNumber.apply(this,arguments));if(this.validateString)return this.validateString.apply(this,arguments);throw"Validator `"+this.name+"` only handles multiple values"},parseRequirements:function(b,c){if("string"!=typeof b)return a.isArray(b)?b:[b];var d=this.requirementType;if(a.isArray(d)){for(var e=j(b,d.length),f=0;f<e.length;f++)e[f]=k(d[f],e[f]);return e}return a.isPlainObject(d)?l(d,b,c):[k(d,b)]},requirementType:"string",priority:2};var n=function(a,b){this.__class__="ParsleyValidatorRegistry",this.locale="en",this.init(a||{},b||{})},o={email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,number:/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,integer:/^-?\d+$/,digits:/^\d+$/,alphanum:/^\w+$/i,url:new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$","i")};o.range=o.number,n.prototype={init:function(b,c){this.catalog=c,this.validators=a.extend({},this.validators);for(var d in b)this.addValidator(d,b[d].fn,b[d].priority);window.Parsley.trigger("parsley:validator:init")},setLocale:function(a){if("undefined"==typeof this.catalog[a])throw new Error(a+" is not available in the catalog");return this.locale=a,this},addCatalog:function(a,b,c){return"object"==typeof b&&(this.catalog[a]=b),!0===c?this.setLocale(a):this},addMessage:function(a,b,c){return"undefined"==typeof this.catalog[a]&&(this.catalog[a]={}),this.catalog[a][b.toLowerCase()]=c,this},addValidator:function(a){if(this.validators[a])f.warn('Validator "'+a+'" is already defined.');else if(g.hasOwnProperty(a))return void f.warn('"'+a+'" is a restricted keyword and is not a valid validator name.');return this._setValidator.apply(this,arguments)},updateValidator:function(a){return this.validators[a]?this._setValidator(this,arguments):(f.warn('Validator "'+a+'" is not already defined.'),this.addValidator.apply(this,arguments))},removeValidator:function(a){return this.validators[a]||f.warn('Validator "'+a+'" is not defined.'),delete this.validators[a],this},_setValidator:function(a,b,c){"object"!=typeof b&&(b={fn:b,priority:c}),b.validate||(b=new m(b)),this.validators[a]=b;for(var d in b.messages||{})this.addMessage(d,a,b.messages[d]);return this},getErrorMessage:function(a){var b;if("type"===a.name){var c=this.catalog[this.locale][a.name]||{};b=c[a.requirements]}else b=this.formatMessage(this.catalog[this.locale][a.name],a.requirements);return b||this.catalog[this.locale].defaultMessage||this.catalog.en.defaultMessage},formatMessage:function(a,b){if("object"==typeof b){for(var c in b)a=this.formatMessage(a,b[c]);return a}return"string"==typeof a?a.replace(new RegExp("%s","i"),b):""},validators:{notblank:{validateString:function(a){return/\S/.test(a)},priority:2},required:{validateMultiple:function(a){return a.length>0},validateString:function(a){return/\S/.test(a)},priority:512},type:{validateString:function(a,b){var c=o[b];if(!c)throw new Error("validator type `"+b+"` is not supported");return c.test(a)},priority:256},pattern:{validateString:function(a,b){return b.test(a)},requirementType:"regexp",priority:64},minlength:{validateString:function(a,b){return a.length>=b},requirementType:"integer",priority:30},maxlength:{validateString:function(a,b){return a.length<=b},requirementType:"integer",priority:30},length:{validateString:function(a,b,c){return a.length>=b&&a.length<=c},requirementType:["integer","integer"],priority:30},mincheck:{validateMultiple:function(a,b){return a.length>=b},requirementType:"integer",priority:30},maxcheck:{validateMultiple:function(a,b){return a.length<=b},requirementType:"integer",priority:30},check:{validateMultiple:function(a,b,c){return a.length>=b&&a.length<=c},requirementType:["integer","integer"],priority:30},min:{validateNumber:function(a,b){return a>=b},requirementType:"number",priority:30},max:{validateNumber:function(a,b){return b>=a},requirementType:"number",priority:30},range:{validateNumber:function(a,b,c){return a>=b&&c>=a},requirementType:["number","number"],priority:30},equalto:{validateString:function(b,c){var d=a(c);return d.length?b===d.val():b===c},priority:256}}};var p=function(){this.__class__="ParsleyUI"};p.prototype={listen:function(){var a=this;return window.Parsley.on("form:init",function(){a.setupForm(this)}).on("field:init",function(){a.setupField(this)}).on("field:validated",function(){a.reflow(this)}).on("form:validated",function(){a.focus(this)}).on("field:reset",function(){a.reset(this)}).on("form:destroy",function(){a.destroy(this)}).on("field:destroy",function(){a.destroy(this)}),this},reflow:function(a){if("undefined"!=typeof a._ui&&!1!==a._ui.active){var b=this._diff(a.validationResult,a._ui.lastValidationResult);a._ui.lastValidationResult=a.validationResult,a._ui.validatedOnce=!0,this.manageStatusClass(a),this.manageErrorsMessages(a,b),this.actualizeTriggers(a),(b.kept.length||b.added.length)&&!0!==a._ui.failedOnce&&this.manageFailingFieldTrigger(a)}},getErrorsMessages:function(a){if(!0===a.validationResult)return[];for(var b=[],c=0;c<a.validationResult.length;c++)b.push(this._getErrorMessage(a,a.validationResult[c].assert));return b},manageStatusClass:function(a){a.hasConstraints()&&a.needsValidation()&&!0===a.validationResult?this._successClass(a):a.validationResult.length>0?this._errorClass(a):this._resetClass(a)},manageErrorsMessages:function(b,c){if("undefined"==typeof b.options.errorsMessagesDisabled){if("undefined"!=typeof b.options.errorMessage)return c.added.length||c.kept.length?(this._insertErrorWrapper(b),0===b._ui.$errorsWrapper.find(".parsley-custom-error-message").length&&b._ui.$errorsWrapper.append(a(b.options.errorTemplate).addClass("parsley-custom-error-message")),b._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(b.options.errorMessage)):b._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();for(var d=0;d<c.removed.length;d++)this.removeError(b,c.removed[d].assert.name,!0);for(d=0;d<c.added.length;d++)this.addError(b,c.added[d].assert.name,void 0,c.added[d].assert,!0);for(d=0;d<c.kept.length;d++)this.updateError(b,c.kept[d].assert.name,void 0,c.kept[d].assert,!0)}},addError:function(b,c,d,e,f){this._insertErrorWrapper(b),b._ui.$errorsWrapper.addClass("filled").append(a(b.options.errorTemplate).addClass("parsley-"+c).html(d||this._getErrorMessage(b,e))),!0!==f&&this._errorClass(b)},updateError:function(a,b,c,d,e){a._ui.$errorsWrapper.addClass("filled").find(".parsley-"+b).html(c||this._getErrorMessage(a,d)),!0!==e&&this._errorClass(a)},removeError:function(a,b,c){a._ui.$errorsWrapper.removeClass("filled").find(".parsley-"+b).remove(),!0!==c&&this.manageStatusClass(a)},focus:function(a){if(a._focusedField=null,!0===a.validationResult||"none"===a.options.focus)return null;for(var b=0;b<a.fields.length;b++){var c=a.fields[b];if(!0!==c.validationResult&&c.validationResult.length>0&&"undefined"==typeof c.options.noFocus&&(a._focusedField=c.$element,"first"===a.options.focus))break}return null===a._focusedField?null:a._focusedField.focus()},_getErrorMessage:function(a,b){var c=b.name+"Message";return"undefined"!=typeof a.options[c]?window.Parsley.formatMessage(a.options[c],b.requirements):window.Parsley.getErrorMessage(b)},_diff:function(a,b,c){for(var d=[],e=[],f=0;f<a.length;f++){for(var g=!1,h=0;h<b.length;h++)if(a[f].assert.name===b[h].assert.name){g=!0;break}g?e.push(a[f]):d.push(a[f])}return{kept:e,added:d,removed:c?[]:this._diff(b,a,!0).added}},setupForm:function(b){b.$element.on("submit.Parsley",!1,a.proxy(b.onSubmitValidate,b)),!1!==b.options.uiEnabled&&b.$element.attr("novalidate","")},setupField:function(b){var c={active:!1};!1!==b.options.uiEnabled&&(c.active=!0,b.$element.attr(b.options.namespace+"id",b.__id__),c.$errorClassHandler=this._manageClassHandler(b),c.errorsWrapperId="parsley-id-"+(b.options.multiple?"multiple-"+b.options.multiple:b.__id__),c.$errorsWrapper=a(b.options.errorsWrapper).attr("id",c.errorsWrapperId),c.lastValidationResult=[],c.validatedOnce=!1,c.validationInformationVisible=!1,b._ui=c,this.actualizeTriggers(b))},_manageClassHandler:function(b){if("string"==typeof b.options.classHandler&&a(b.options.classHandler).length)return a(b.options.classHandler);var c=b.options.classHandler(b);return"undefined"!=typeof c&&c.length?c:!b.options.multiple||b.$element.is("select")?b.$element:b.$element.parent()},_insertErrorWrapper:function(b){var c;if(0!==b._ui.$errorsWrapper.parent().length)return b._ui.$errorsWrapper.parent();if("string"==typeof b.options.errorsContainer){if(a(b.options.errorsContainer).length)return a(b.options.errorsContainer).append(b._ui.$errorsWrapper);f.warn("The errors container `"+b.options.errorsContainer+"` does not exist in DOM")}else"function"==typeof b.options.errorsContainer&&(c=b.options.errorsContainer(b));if("undefined"!=typeof c&&c.length)return c.append(b._ui.$errorsWrapper);var d=b.$element;return b.options.multiple&&(d=d.parent()),d.after(b._ui.$errorsWrapper)},actualizeTriggers:function(b){var c=b.$element;if(b.options.multiple&&(c=a("["+b.options.namespace+'multiple="'+b.options.multiple+'"]')),c.off(".Parsley"),!1!==b.options.trigger){var d=b.options.trigger.replace(/^\s+/g,"").replace(/\s+$/g,"");""!==d&&c.on(d.split(" ").join(".Parsley ")+".Parsley",a.proxy("function"==typeof b.eventValidate?b.eventValidate:this.eventValidate,b))}},eventValidate:function(a){new RegExp("key").test(a.type)&&!this._ui.validationInformationVisible&&this.getValue().length<=this.options.validationThreshold||(this._ui.validatedOnce=!0,this.validate())},manageFailingFieldTrigger:function(b){return b._ui.failedOnce=!0,b.options.multiple&&a("["+b.options.namespace+'multiple="'+b.options.multiple+'"]').each(function(){return new RegExp("change","i").test(a(this).parsley().options.trigger||"")?void 0:a(this).on("change.ParsleyFailedOnce",!1,a.proxy(b.validate,b))}),b.$element.is("select")&&!new RegExp("change","i").test(b.options.trigger||"")?b.$element.on("change.ParsleyFailedOnce",!1,a.proxy(b.validate,b)):new RegExp("keyup","i").test(b.options.trigger||"")?void 0:b.$element.on("keyup.ParsleyFailedOnce",!1,a.proxy(b.validate,b))},reset:function(a){this.actualizeTriggers(a),a.$element.off(".ParsleyFailedOnce"),"undefined"!=typeof a._ui&&"ParsleyForm"!==a.__class__&&(a._ui.$errorsWrapper.removeClass("filled").children().remove(),this._resetClass(a),a._ui.validatedOnce=!1,a._ui.lastValidationResult=[],a._ui.validationInformationVisible=!1,a._ui.failedOnce=!1)},destroy:function(a){this.reset(a),"ParsleyForm"!==a.__class__&&("undefined"!=typeof a._ui&&a._ui.$errorsWrapper.remove(),delete a._ui)},_successClass:function(a){a._ui.validationInformationVisible=!0,a._ui.$errorClassHandler.removeClass(a.options.errorClass).addClass(a.options.successClass)},_errorClass:function(a){a._ui.validationInformationVisible=!0,a._ui.$errorClassHandler.removeClass(a.options.successClass).addClass(a.options.errorClass)},_resetClass:function(a){a._ui.$errorClassHandler.removeClass(a.options.successClass).removeClass(a.options.errorClass)}};var q=function(b,c,d){this.__class__="ParsleyForm",this.__id__=f.generateID(),this.$element=a(b),this.domOptions=c,this.options=d,this.parent=window.Parsley,this.fields=[],this.validationResult=null},r={pending:null,resolved:!0,rejected:!1};q.prototype={onSubmitValidate:function(a){var b=this;if(!0!==a.parsley)return a.stopImmediatePropagation(),a.preventDefault(),this.whenValidate(void 0,void 0,a).done(function(){b._submit()}).always(function(){b._submitSource=null}),this},_submit:function(){!1!==this._trigger("submit")&&(this.$element.find(".parsley_synthetic_submit_button").remove(),this._submitSource&&a('<input class=".parsley_synthetic_submit_button" type="hidden">').attr("name",this._submitSource.name).attr("value",this._submitSource.value).appendTo(this.$element),this.$element.trigger(a.extend(a.Event("submit"),{parsley:!0})))},validate:function(a,b,c){return r[this.whenValidate(a,b,c).state()]},whenValidate:function(b,c,d){var e=this;this.submitEvent=d,this.validationResult=!0,this._trigger("validate"),this._refreshFields();var f=this._withoutReactualizingFormOptions(function(){return a.map(this.fields,function(a){return!b||e._isFieldInGroup(a,b)?a.whenValidate(c):void 0})});return a.when.apply(a,f).done(function(){e._trigger("success")}).fail(function(){e.validationResult=!1,e._trigger("error")}).always(function(){e._trigger("validated")})},isValid:function(a,b){return r[this.whenValid(a,b).state()]},whenValid:function(b,c){var d=this;this._refreshFields();var e=this._withoutReactualizingFormOptions(function(){return a.map(this.fields,function(a){return!b||d._isFieldInGroup(a,b)?a.whenValid(c):void 0})});return a.when.apply(a,e)},_isFieldInGroup:function(b,c){return a.isArray(b.options.group)?-1!==a.inArray(c,b.options.group):b.options.group===c},_refreshFields:function(){return this.actualizeOptions()._bindFields()},_bindFields:function(){var b=this,c=this.fields;return this.fields=[],this.fieldsMappedById={},this._withoutReactualizingFormOptions(function(){this.$element.find(this.options.inputs).not(this.options.excluded).each(function(){var a=new A.Factory(this,{},b);"ParsleyField"!==a.__class__&&"ParsleyFieldMultiple"!==a.__class__||!0===a.options.excluded||"undefined"==typeof b.fieldsMappedById[a.__class__+"-"+a.__id__]&&(b.fieldsMappedById[a.__class__+"-"+a.__id__]=a,b.fields.push(a))}),a(c).not(b.fields).each(function(){this._trigger("reset")})}),this},_withoutReactualizingFormOptions:function(a){var b=this.actualizeOptions;this.actualizeOptions=function(){return this};var c=a.call(this);return this.actualizeOptions=b,c},_trigger:function(a){return a="form:"+a,this.trigger.apply(this,arguments)}};var s=function(b,c,d,e,f){if(!new RegExp("ParsleyField").test(b.__class__))throw new Error("ParsleyField or ParsleyFieldMultiple instance expected");var g=window.Parsley._validatorRegistry.validators[c],h=new m(g);a.extend(this,{validator:h,name:c,requirements:d,priority:e||b.options[c+"Priority"]||h.priority,isDomConstraint:!0===f}),this._parseRequirements(b.options)},t=function(a){var b=a[0].toUpperCase();return b+a.slice(1)};s.prototype={validate:function(a,b){var c=this.requirementList.slice(0);return c.unshift(a),c.push(b),this.validator.validate.apply(this.validator,c)},_parseRequirements:function(a){var b=this;this.requirementList=this.validator.parseRequirements(this.requirements,function(c){return a[b.name+t(c)]})}};var u=function(b,c,d,e){this.__class__="ParsleyField",this.__id__=f.generateID(),this.$element=a(b),"undefined"!=typeof e&&(this.parent=e),this.options=d,this.domOptions=c,this.constraints=[],this.constraintsByName={},this.validationResult=[],this._bindConstraints()},r={pending:null,resolved:!0,rejected:!1};u.prototype={validate:function(a){var b=this.whenValidate(a);switch(b.state()){case"pending":return null;case"resolved":return!0;case"rejected":return this.validationResult}},whenValidate:function(a){var b=this;return this.value=this.getValue(),this._trigger("validate"),this.whenValid(a,this.value).done(function(){b._trigger("success")}).fail(function(){b._trigger("error")}).always(function(){b._trigger("validated")})},hasConstraints:function(){return 0!==this.constraints.length},needsValidation:function(a){return"undefined"==typeof a&&(a=this.getValue()),a.length||this._isRequired()||"undefined"!=typeof this.options.validateIfEmpty?!0:!1},isValid:function(a,b){return r[this.whenValid(a,b).state()]},whenValid:function(b,c){if(this.refreshConstraints(),this.validationResult=!0,!this.hasConstraints())return a.when();if(("undefined"==typeof c||null===c)&&(c=this.getValue()),!this.needsValidation(c)&&!0!==b)return a.when();var d=this._getGroupedConstraints(),e=[],f=this;return a.each(d,function(b,d){var g=a.when.apply(a,a.map(d,a.proxy(f,"_validateConstraint",c)));return e.push(g),"rejected"===g.state()?!1:void 0}),a.when.apply(a,e)},_validateConstraint:function(b,c){var d=this,e=c.validate(b,this);return!1===e&&(e=a.Deferred().reject()),a.when(e).fail(function(){!0===d.validationResult&&(d.validationResult=[]),d.validationResult.push({assert:c})})},getValue:function(){var a;return a="function"==typeof this.options.value?this.options.value(this):"undefined"!=typeof this.options.value?this.options.value:this.$element.val(),"undefined"==typeof a||null===a?"":this._handleWhitespace(a)},refreshConstraints:function(){return this.actualizeOptions()._bindConstraints()},addConstraint:function(a,b,c,d){if(window.Parsley._validatorRegistry.validators[a]){var e=new s(this,a,b,c,d);"undefined"!==this.constraintsByName[e.name]&&this.removeConstraint(e.name),this.constraints.push(e),this.constraintsByName[e.name]=e}return this},removeConstraint:function(a){for(var b=0;b<this.constraints.length;b++)if(a===this.constraints[b].name){this.constraints.splice(b,1);break}return delete this.constraintsByName[a],this},updateConstraint:function(a,b,c){return this.removeConstraint(a).addConstraint(a,b,c)},_bindConstraints:function(){for(var a=[],b={},c=0;c<this.constraints.length;c++)!1===this.constraints[c].isDomConstraint&&(a.push(this.constraints[c]),b[this.constraints[c].name]=this.constraints[c]);this.constraints=a,this.constraintsByName=b;for(var d in this.options)this.addConstraint(d,this.options[d],void 0,!0);return this._bindHtml5Constraints()},_bindHtml5Constraints:function(){(this.$element.hasClass("required")||this.$element.attr("required"))&&this.addConstraint("required",!0,void 0,!0),"string"==typeof this.$element.attr("pattern")&&this.addConstraint("pattern",this.$element.attr("pattern"),void 0,!0),"undefined"!=typeof this.$element.attr("min")&&"undefined"!=typeof this.$element.attr("max")?this.addConstraint("range",[this.$element.attr("min"),this.$element.attr("max")],void 0,!0):"undefined"!=typeof this.$element.attr("min")?this.addConstraint("min",this.$element.attr("min"),void 0,!0):"undefined"!=typeof this.$element.attr("max")&&this.addConstraint("max",this.$element.attr("max"),void 0,!0),"undefined"!=typeof this.$element.attr("minlength")&&"undefined"!=typeof this.$element.attr("maxlength")?this.addConstraint("length",[this.$element.attr("minlength"),this.$element.attr("maxlength")],void 0,!0):"undefined"!=typeof this.$element.attr("minlength")?this.addConstraint("minlength",this.$element.attr("minlength"),void 0,!0):"undefined"!=typeof this.$element.attr("maxlength")&&this.addConstraint("maxlength",this.$element.attr("maxlength"),void 0,!0);var a=this.$element.attr("type");return"undefined"==typeof a?this:"number"===a?"undefined"==typeof this.$element.attr("step")||0===parseFloat(this.$element.attr("step"))%1?this.addConstraint("type","integer",void 0,!0):this.addConstraint("type","number",void 0,!0):/^(email|url|range)$/i.test(a)?this.addConstraint("type",a,void 0,!0):this},_isRequired:function(){return"undefined"==typeof this.constraintsByName.required?!1:!1!==this.constraintsByName.required.requirements},_trigger:function(a){return a="field:"+a,this.trigger.apply(this,arguments)},_handleWhitespace:function(a){return!0===this.options.trimValue&&f.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'),"squish"===this.options.whitespace&&(a=a.replace(/\s{2,}/g," ")),("trim"===this.options.whitespace||"squish"===this.options.whitespace||!0===this.options.trimValue)&&(a=f.trimString(a)),a},_getGroupedConstraints:function(){if(!1===this.options.priorityEnabled)return[this.constraints];for(var a=[],b={},c=0;c<this.constraints.length;c++){var d=this.constraints[c].priority;b[d]||a.push(b[d]=[]),b[d].push(this.constraints[c])}return a.sort(function(a,b){return b[0].priority-a[0].priority}),a}};var v=function(){this.__class__="ParsleyFieldMultiple"};v.prototype={addElement:function(a){return this.$elements.push(a),this},refreshConstraints:function(){var b;if(this.constraints=[],this.$element.is("select"))return this.actualizeOptions()._bindConstraints(),this;for(var c=0;c<this.$elements.length;c++)if(a("html").has(this.$elements[c]).length){b=this.$elements[c].data("ParsleyFieldMultiple").refreshConstraints().constraints;for(var d=0;d<b.length;d++)this.addConstraint(b[d].name,b[d].requirements,b[d].priority,b[d].isDomConstraint)}else this.$elements.splice(c,1);return this},getValue:function(){if("undefined"!=typeof this.options.value)return this.options.value;if(this.$element.is("input[type=radio]"))return this._findRelatedMultiple().filter(":checked").val()||"";if(this.$element.is("input[type=checkbox]")){var b=[];return this._findRelatedMultiple().filter(":checked").each(function(){b.push(a(this).val())}),b}return this.$element.is("select")&&null===this.$element.val()?[]:this.$element.val()},_init:function(){return this.$elements=[this.$element],this}};var w=function(b,c,d){this.$element=a(b);var e=this.$element.data("Parsley");if(e)return"undefined"!=typeof d&&e.parent===window.Parsley&&(e.parent=d,e._resetOptions(e.options)),e;if(!this.$element.length)throw new Error("You must bind Parsley on an existing element.");if("undefined"!=typeof d&&"ParsleyForm"!==d.__class__)throw new Error("Parent instance must be a ParsleyForm instance");return this.parent=d||window.Parsley,this.init(c)};w.prototype={init:function(a){return this.__class__="Parsley",this.__version__="2.2.0-rc1",this.__id__=f.generateID(),this._resetOptions(a),this.$element.is("form")||f.checkAttr(this.$element,this.options.namespace,"validate")&&!this.$element.is(this.options.inputs)?this.bind("parsleyForm"):this.isMultiple()?this.handleMultiple():this.bind("parsleyField")},isMultiple:function(){return this.$element.is("input[type=radio], input[type=checkbox]")||this.$element.is("select")&&"undefined"!=typeof this.$element.attr("multiple")},handleMultiple:function(){var b,c,d=this;if(this.options.multiple||("undefined"!=typeof this.$element.attr("name")&&this.$element.attr("name").length?this.options.multiple=b=this.$element.attr("name"):"undefined"!=typeof this.$element.attr("id")&&this.$element.attr("id").length&&(this.options.multiple=this.$element.attr("id"))),this.$element.is("select")&&"undefined"!=typeof this.$element.attr("multiple"))return this.options.multiple=this.options.multiple||this.__id__,this.bind("parsleyFieldMultiple");if(!this.options.multiple)return f.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.",this.$element),this;this.options.multiple=this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g,""),"undefined"!=typeof b&&a('input[name="'+b+'"]').each(function(){a(this).is("input[type=radio], input[type=checkbox]")&&a(this).attr(d.options.namespace+"multiple",d.options.multiple)});for(var e=this._findRelatedMultiple(),g=0;g<e.length;g++)if(c=a(e.get(g)).data("Parsley"),"undefined"!=typeof c){this.$element.data("ParsleyFieldMultiple")||c.addElement(this.$element);break}return this.bind("parsleyField",!0),c||this.bind("parsleyFieldMultiple")},bind:function(b,c){var d;switch(b){case"parsleyForm":d=a.extend(new q(this.$element,this.domOptions,this.options),window.ParsleyExtend)._bindFields();break;case"parsleyField":d=a.extend(new u(this.$element,this.domOptions,this.options,this.parent),window.ParsleyExtend);break;case"parsleyFieldMultiple":d=a.extend(new u(this.$element,this.domOptions,this.options,this.parent),new v,window.ParsleyExtend)._init();break;default:throw new Error(b+"is not a supported Parsley type")}return this.options.multiple&&f.setAttr(this.$element,this.options.namespace,"multiple",this.options.multiple),"undefined"!=typeof c?(this.$element.data("ParsleyFieldMultiple",d),d):(this.$element.data("Parsley",d),d._trigger("init"),d)}};var x=a({}),y=function(){f.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")},z="parsley:";a.listen=function(a,d){var e;if(y(),"object"==typeof arguments[1]&&"function"==typeof arguments[2]&&(e=arguments[1],d=arguments[2]),"function"!=typeof arguments[1])throw new Error("Wrong parameters");window.Parsley.on(c(a),b(d,e))},a.listenTo=function(a,d,e){if(y(),!(a instanceof u||a instanceof q))throw new Error("Must give Parsley instance");if("string"!=typeof d||"function"!=typeof e)throw new Error("Wrong parameters");a.on(c(d),b(e))},a.unsubscribe=function(a,b){if(y(),"string"!=typeof a||"function"!=typeof b)throw new Error("Wrong arguments");window.Parsley.off(c(a),b.parsleyAdaptedCallback)},a.unsubscribeTo=function(a,b){if(y(),!(a instanceof u||a instanceof q))throw new Error("Must give Parsley instance");a.off(c(b))},a.unsubscribeAll=function(b){y(),window.Parsley.off(c(b)),a("form,input,textarea,select").each(function(){var d=a(this).data("Parsley");d&&d.off(c(b))})},a.emit=function(a,b){y();var d=b instanceof u||b instanceof q,e=Array.prototype.slice.call(arguments,d?2:1);e.unshift(c(a)),d||(b=window.Parsley),b.trigger.apply(b,e)},window.ParsleyConfig=window.ParsleyConfig||{},window.ParsleyConfig.i18n=window.ParsleyConfig.i18n||{},window.ParsleyConfig.i18n.en=jQuery.extend(window.ParsleyConfig.i18n.en||{},{defaultMessage:"This value seems to be invalid.",type:{email:"This value should be a valid email.",url:"This value should be a valid url.",number:"This value should be a valid number.",
integer:"This value should be a valid integer.",digits:"This value should be digits.",alphanum:"This value should be alphanumeric."},notblank:"This value should not be blank.",required:"This value is required.",pattern:"This value seems to be invalid.",min:"This value should be greater than or equal to %s.",max:"This value should be lower than or equal to %s.",range:"This value should be between %s and %s.",minlength:"This value is too short. It should have %s characters or more.",maxlength:"This value is too long. It should have %s characters or fewer.",length:"This value length is invalid. It should be between %s and %s characters long.",mincheck:"You must select at least %s choices.",maxcheck:"You must select %s choices or fewer.",check:"You must select between %s and %s choices.",equalto:"This value should be the same."}),"undefined"!=typeof window.ParsleyValidator&&window.ParsleyValidator.addCatalog("en",window.ParsleyConfig.i18n.en,!0);var A=a.extend(new h,{$element:a(document),actualizeOptions:null,_resetOptions:null,Factory:w,version:"2.2.0-rc1"});a.extend(u.prototype,h.prototype),a.extend(q.prototype,h.prototype),a.extend(w.prototype,h.prototype),a.fn.parsley=a.fn.psly=function(b){if(this.length>1){var c=[];return this.each(function(){c.push(a(this).parsley(b))}),c}return a(this).length?new w(this,b):void f.warn("You must bind Parsley on an existing element.")},"undefined"==typeof window.ParsleyExtend&&(window.ParsleyExtend={}),A.options=a.extend(f.objectCreate(g),window.ParsleyConfig),window.ParsleyConfig=A.options,window.Parsley=window.psly=A,window.ParsleyUtils=f;var B=window.Parsley._validatorRegistry=new n(window.ParsleyConfig.validators,window.ParsleyConfig.i18n);return window.ParsleyValidator={},a.each("setLocale addCatalog addMessage getErrorMessage formatMessage addValidator updateValidator removeValidator".split(" "),function(b,c){window.Parsley[c]=a.proxy(B,c),window.ParsleyValidator[c]=function(){return f.warnOnce("Accessing the method `"+c+"` through ParsleyValidator is deprecated. Simply call `window.Parsley."+c+"(...)`"),window.Parsley[c].apply(window.Parsley,arguments)}}),window.ParsleyUI="function"==typeof window.ParsleyConfig.ParsleyUI?(new window.ParsleyConfig.ParsleyUI).listen():(new p).listen(),!1!==window.ParsleyConfig.autoBind&&a(function(){a("[data-parsley-validate]").length&&a("[data-parsley-validate]").parsley()}),window.Parsley});
!function(e){if(e.document){var t=e.document;t.querySelectorAll||(t.querySelectorAll=function(n){var r,i=t.createElement("style"),o=[];for(t.documentElement.firstChild.appendChild(i),t._qsa=[],i.styleSheet.cssText=n+"{x-qsa:expression(document._qsa && document._qsa.push(this))}",e.scrollBy(0,0),i.parentNode.removeChild(i);t._qsa.length;)r=t._qsa.shift(),r.style.removeAttribute("x-qsa"),o.push(r);return t._qsa=null,o}),t.querySelector||(t.querySelector=function(e){var n=t.querySelectorAll(e);return n.length?n[0]:null}),t.getElementsByClassName||(t.getElementsByClassName=function(e){return e=String(e).replace(/^|\s+/g,"."),t.querySelectorAll(e)}),Object.keys||(Object.keys=function(e){if(e!==Object(e))throw TypeError("Object.keys called on non-object");var t,n=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.push(t);return n}),Array.prototype.forEach||(Array.prototype.forEach=function(e){if(void 0===this||null===this)throw TypeError();var t=Object(this),n=t.length>>>0;if("function"!=typeof e)throw TypeError();var r,i=arguments[1];for(r=0;n>r;r++)r in t&&e.call(i,t[r],r,t)}),function(e){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.atob=e.atob||function(e){e=String(e);var n,r=0,i=[],o=0,a=0;if(e=e.replace(/\s/g,""),e.length%4===0&&(e=e.replace(/=+$/,"")),e.length%4===1)throw Error("InvalidCharacterError");if(/[^+/0-9A-Za-z]/.test(e))throw Error("InvalidCharacterError");for(;r<e.length;)n=t.indexOf(e.charAt(r)),o=o<<6|n,a+=6,24===a&&(i.push(String.fromCharCode(o>>16&255)),i.push(String.fromCharCode(o>>8&255)),i.push(String.fromCharCode(255&o)),a=0,o=0),r+=1;return 12===a?(o>>=4,i.push(String.fromCharCode(255&o))):18===a&&(o>>=2,i.push(String.fromCharCode(o>>8&255)),i.push(String.fromCharCode(255&o))),i.join("")},e.btoa=e.btoa||function(e){e=String(e);var n,r,i,o,a,s,l,h=0,u=[];if(/[^\x00-\xFF]/.test(e))throw Error("InvalidCharacterError");for(;h<e.length;)n=e.charCodeAt(h++),r=e.charCodeAt(h++),i=e.charCodeAt(h++),o=n>>2,a=(3&n)<<4|r>>4,s=(15&r)<<2|i>>6,l=63&i,h===e.length+2?(s=64,l=64):h===e.length+1&&(l=64),u.push(t.charAt(o),t.charAt(a),t.charAt(s),t.charAt(l));return u.join("")}}(e),Object.prototype.hasOwnProperty||(Object.prototype.hasOwnProperty=function(e){var t=this.__proto__||this.constructor.prototype;return e in this&&(!(e in t)||t[e]!==this[e])}),function(){if("performance"in e==!1&&(e.performance={}),Date.now=Date.now||function(){return(new Date).getTime()},"now"in e.performance==!1){var t=Date.now();performance.timing&&performance.timing.navigationStart&&(t=performance.timing.navigationStart),e.performance.now=function(){return Date.now()-t}}}(),e.requestAnimationFrame||(e.webkitRequestAnimationFrame?!function(e){e.requestAnimationFrame=function(t){return webkitRequestAnimationFrame(function(){t(e.performance.now())})},e.cancelAnimationFrame=webkitCancelAnimationFrame}(e):e.mozRequestAnimationFrame?!function(e){e.requestAnimationFrame=function(t){return mozRequestAnimationFrame(function(){t(e.performance.now())})},e.cancelAnimationFrame=mozCancelAnimationFrame}(e):!function(e){e.requestAnimationFrame=function(t){return e.setTimeout(t,1e3/60)},e.cancelAnimationFrame=e.clearTimeout}(e))}}(this),function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Holder=t():e.Holder=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){(function(t){function r(e,t,n,r){var a=i(n.substr(n.lastIndexOf(e.domain)),e);a&&o({mode:null,el:r,flags:a,engineSettings:t})}function i(e,t){var n={theme:T(F.settings.themes.gray,null),stylesheets:t.stylesheets,instanceOptions:t},r=e.split("?"),i=r[0].split("/");n.holderURL=e;var o=i[1],a=o.match(/([\d]+p?)x([\d]+p?)/);if(!a)return!1;if(n.fluid=-1!==o.indexOf("p"),n.dimensions={width:a[1].replace("p","%"),height:a[2].replace("p","%")},2===r.length){var s=v.parse(r[1]);if(s.bg&&(n.theme.bg=w.parseColor(s.bg)),s.fg&&(n.theme.fg=w.parseColor(s.fg)),s.bg&&!s.fg&&(n.autoFg=!0),s.theme&&n.instanceOptions.themes.hasOwnProperty(s.theme)&&(n.theme=T(n.instanceOptions.themes[s.theme],null)),s.text&&(n.text=s.text),s.textmode&&(n.textmode=s.textmode),s.size&&(n.size=s.size),s.font&&(n.font=s.font),s.align&&(n.align=s.align),s.lineWrap&&(n.lineWrap=s.lineWrap),n.nowrap=w.truthy(s.nowrap),n.auto=w.truthy(s.auto),n.outline=w.truthy(s.outline),w.truthy(s.random)){F.vars.cache.themeKeys=F.vars.cache.themeKeys||Object.keys(n.instanceOptions.themes);var l=F.vars.cache.themeKeys[0|Math.random()*F.vars.cache.themeKeys.length];n.theme=T(n.instanceOptions.themes[l],null)}}return n}function o(e){var t=e.mode,n=e.el,r=e.flags,i=e.engineSettings,o=r.dimensions,s=r.theme,l=o.width+"x"+o.height;t=null==t?r.fluid?"fluid":"image":t;var d=/holder_([a-z]+)/g,c=!1;if(null!=r.text&&(s.text=r.text,"object"===n.nodeName.toLowerCase())){for(var f=s.text.split("\\n"),p=0;p<f.length;p++)f[p]=w.encodeHtmlEntity(f[p]);s.text=f.join("\\n")}if(s.text){var g=s.text.match(d);null!==g&&g.forEach(function(e){"holder_dimensions"===e&&(s.text=s.text.replace(e,l))})}var m=r.holderURL,v=T(i,null);if(r.font&&(s.font=r.font,!v.noFontFallback&&"img"===n.nodeName.toLowerCase()&&F.setup.supportsCanvas&&"svg"===v.renderer&&(v=T(v,{renderer:"canvas"}))),r.font&&"canvas"==v.renderer&&(v.reRender=!0),"background"==t)null==n.getAttribute("data-background-src")&&x.setAttr(n,{"data-background-src":m});else{var y={};y[F.vars.dataAttr]=m,x.setAttr(n,y)}r.theme=s,n.holderData={flags:r,engineSettings:v},("image"==t||"fluid"==t)&&x.setAttr(n,{alt:s.text?c?s.text:s.text+" ["+l+"]":l});var b={mode:t,el:n,holderSettings:{dimensions:o,theme:s,flags:r},engineSettings:v};"image"==t?(r.auto||(n.style.width=o.width+"px",n.style.height=o.height+"px"),"html"==v.renderer?n.style.backgroundColor=s.background:(a(b),"exact"==r.textmode&&(n.holderData.resizeUpdate=!0,F.vars.resizableImages.push(n),h(n)))):"background"==t&&"html"!=v.renderer?a(b):"fluid"==t&&(n.holderData.resizeUpdate=!0,"%"==o.height.slice(-1)?n.style.height=o.height:null!=r.auto&&r.auto||(n.style.height=o.height+"px"),"%"==o.width.slice(-1)?n.style.width=o.width:null!=r.auto&&r.auto||(n.style.width=o.width+"px"),("inline"==n.style.display||""===n.style.display||"none"==n.style.display)&&(n.style.display="block"),u(n),"html"==v.renderer?n.style.backgroundColor=s.background:(F.vars.resizableImages.push(n),h(n)))}function a(e){function n(){var t=null;switch(l.renderer){case"canvas":t=E(u,e);break;case"svg":t=C(u,e);break;default:throw"Holder: invalid renderer: "+l.renderer}return t}var r=null,i=e.mode,o=e.el,a=e.holderSettings,l=e.engineSettings;switch(l.renderer){case"svg":if(!F.setup.supportsSVG)return;break;case"canvas":if(!F.setup.supportsCanvas)return;break;default:return}var h={width:a.dimensions.width,height:a.dimensions.height,theme:a.theme,flags:a.flags},u=s(h);if(r=n(),null==r)throw"Holder: couldn't render placeholder";"background"==i?(o.style.backgroundImage="url("+r+")",o.style.backgroundSize=h.width+"px "+h.height+"px"):("img"===o.nodeName.toLowerCase()?x.setAttr(o,{src:r}):"object"===o.nodeName.toLowerCase()&&x.setAttr(o,{data:r,type:"image/svg+xml"}),l.reRender&&t.setTimeout(function(){var e=n();if(null==e)throw"Holder: couldn't render placeholder";"img"===o.nodeName.toLowerCase()?x.setAttr(o,{src:e}):"object"===o.nodeName.toLowerCase()&&x.setAttr(o,{data:e,type:"image/svg+xml"})},150)),x.setAttr(o,{"data-holder-rendered":!0})}function s(e){function t(e,t,n,r){t.width=n,t.height=r,e.width=Math.max(e.width,t.width),e.height+=t.height}var n=F.defaults.size;switch(parseFloat(e.theme.size)?n=e.theme.size:parseFloat(e.flags.size)&&(n=e.flags.size),e.font={family:e.theme.font?e.theme.font:"Arial, Helvetica, Open Sans, sans-serif",size:l(e.width,e.height,n,F.defaults.scale),units:e.theme.units?e.theme.units:F.defaults.units,weight:e.theme.fontweight?e.theme.fontweight:"bold"},e.text=e.theme.text||Math.floor(e.width)+"x"+Math.floor(e.height),e.noWrap=e.theme.nowrap||e.flags.nowrap,e.align=e.theme.align||e.flags.align||"center",e.flags.textmode){case"literal":e.text=e.flags.dimensions.width+"x"+e.flags.dimensions.height;break;case"exact":if(!e.flags.exactDimensions)break;e.text=Math.floor(e.flags.exactDimensions.width)+"x"+Math.floor(e.flags.exactDimensions.height)}var r=e.flags.lineWrap||F.setup.lineWrapRatio,i=e.width*r,o=i,a=new y({width:e.width,height:e.height}),s=a.Shape,h=new s.Rect("holderBg",{fill:e.theme.bg});if(h.resize(e.width,e.height),a.root.add(h),e.flags.outline){var u=new S(h.properties.fill);u=u.lighten(u.lighterThan("7f7f7f")?-.1:.1),h.properties.outline={fill:u.toHex(!0),width:2}}var d=e.theme.fg;if(e.flags.autoFg){var c=new S(h.properties.fill),f=new S("fff"),p=new S("000",{alpha:.285714});d=c.blendAlpha(c.lighterThan("7f7f7f")?p:f).toHex(!0)}var g=new s.Group("holderTextGroup",{text:e.text,align:e.align,font:e.font,fill:d});g.moveTo(null,null,1),a.root.add(g);var m=g.textPositionData=z(a);if(!m)throw"Holder: staging fallback not supported yet.";g.properties.leading=m.boundingBox.height;var v=null,w=null;if(m.lineCount>1){var b,x=0,A=0,C=0;w=new s.Group("line"+C),("left"===e.align||"right"===e.align)&&(o=e.width*(1-2*(1-r)));for(var E=0;E<m.words.length;E++){var T=m.words[E];v=new s.Text(T.text);var k="\\n"==T.text;!e.noWrap&&(x+T.width>=o||k===!0)&&(t(g,w,x,g.properties.leading),g.add(w),x=0,A+=g.properties.leading,C+=1,w=new s.Group("line"+C),w.y=A),k!==!0&&(v.moveTo(x,0),x+=m.spaceWidth+T.width,w.add(v))}if(t(g,w,x,g.properties.leading),g.add(w),"left"===e.align)g.moveTo(e.width-i,null,null);else if("right"===e.align){for(b in g.children)w=g.children[b],w.moveTo(e.width-w.width,null,null);g.moveTo(0-(e.width-i),null,null)}else{for(b in g.children)w=g.children[b],w.moveTo((g.width-w.width)/2,null,null);g.moveTo((e.width-g.width)/2,null,null)}g.moveTo(null,(e.height-g.height)/2,null),(e.height-g.height)/2<0&&g.moveTo(null,0,null)}else v=new s.Text(e.text),w=new s.Group("line0"),w.add(v),g.add(w),"left"===e.align?g.moveTo(e.width-i,null,null):"right"===e.align?g.moveTo(0-(e.width-i),null,null):g.moveTo((e.width-m.boundingBox.width)/2,null,null),g.moveTo(null,(e.height-m.boundingBox.height)/2,null);return a}function l(e,t,n,r){var i=parseInt(e,10),o=parseInt(t,10),a=Math.max(i,o),s=Math.min(i,o),l=.8*Math.min(s,a*r);return Math.round(Math.max(n,l))}function h(e){var t;t=null==e||null==e.nodeType?F.vars.resizableImages:[e];for(var n=0,r=t.length;r>n;n++){var i=t[n];if(i.holderData){var o=i.holderData.flags,s=k(i);if(s){if(!i.holderData.resizeUpdate)continue;if(o.fluid&&o.auto){var l=i.holderData.fluidConfig;switch(l.mode){case"width":s.height=s.width/l.ratio;break;case"height":s.width=s.height*l.ratio}}var h={mode:"image",holderSettings:{dimensions:s,theme:o.theme,flags:o},el:i,engineSettings:i.holderData.engineSettings};"exact"==o.textmode&&(o.exactDimensions=s,h.holderSettings.dimensions=o.dimensions),a(h)}else f(i)}}}function u(e){if(e.holderData){var t=k(e);if(t){var n=e.holderData.flags,r={fluidHeight:"%"==n.dimensions.height.slice(-1),fluidWidth:"%"==n.dimensions.width.slice(-1),mode:null,initialDimensions:t};r.fluidWidth&&!r.fluidHeight?(r.mode="width",r.ratio=r.initialDimensions.width/parseFloat(n.dimensions.height)):!r.fluidWidth&&r.fluidHeight&&(r.mode="height",r.ratio=parseFloat(n.dimensions.width)/r.initialDimensions.height),e.holderData.fluidConfig=r}else f(e)}}function d(){var e,n=[],r=Object.keys(F.vars.invisibleImages);r.forEach(function(t){e=F.vars.invisibleImages[t],k(e)&&"img"==e.nodeName.toLowerCase()&&(n.push(e),delete F.vars.invisibleImages[t])}),n.length&&O.run({images:n}),setTimeout(function(){t.requestAnimationFrame(d)},10)}function c(){F.vars.visibilityCheckStarted||(t.requestAnimationFrame(d),F.vars.visibilityCheckStarted=!0)}function f(e){e.holderData.invisibleId||(F.vars.invisibleId+=1,F.vars.invisibleImages["i"+F.vars.invisibleId]=e,e.holderData.invisibleId=F.vars.invisibleId)}function p(e){F.vars.debounceTimer||e.call(this),F.vars.debounceTimer&&t.clearTimeout(F.vars.debounceTimer),F.vars.debounceTimer=t.setTimeout(function(){F.vars.debounceTimer=null,e.call(this)},F.setup.debounce)}function g(){p(function(){h(null)})}var m=n(2),v=n(3),y=n(6),w=n(7),b=n(8),x=n(9),S=n(10),A=n(11),C=n(12),E=n(15),T=w.extend,k=w.dimensionCheck,j=A.svg_ns,O={version:A.version,addTheme:function(e,t){return null!=e&&null!=t&&(F.settings.themes[e]=t),delete F.vars.cache.themeKeys,this},addImage:function(e,t){var n=x.getNodeArray(t);return n.forEach(function(t){var n=x.newEl("img"),r={};r[F.setup.dataAttr]=e,x.setAttr(n,r),t.appendChild(n)}),this},setResizeUpdate:function(e,t){e.holderData&&(e.holderData.resizeUpdate=!!t,e.holderData.resizeUpdate&&h(e))},run:function(e){e=e||{};var n={},a=T(F.settings,e);F.vars.preempted=!0,F.vars.dataAttr=a.dataAttr||F.setup.dataAttr,n.renderer=a.renderer?a.renderer:F.setup.renderer,-1===F.setup.renderers.join(",").indexOf(n.renderer)&&(n.renderer=F.setup.supportsSVG?"svg":F.setup.supportsCanvas?"canvas":"html");var s=x.getNodeArray(a.images),l=x.getNodeArray(a.bgnodes),h=x.getNodeArray(a.stylenodes),u=x.getNodeArray(a.objects);return n.stylesheets=[],n.svgXMLStylesheet=!0,n.noFontFallback=a.noFontFallback?a.noFontFallback:!1,h.forEach(function(e){if(e.attributes.rel&&e.attributes.href&&"stylesheet"==e.attributes.rel.value){var t=e.attributes.href.value,r=x.newEl("a");r.href=t;var i=r.protocol+"//"+r.host+r.pathname+r.search;n.stylesheets.push(i)}}),l.forEach(function(e){if(t.getComputedStyle){var r=t.getComputedStyle(e,null).getPropertyValue("background-image"),s=e.getAttribute("data-background-src"),l=s||r,h=null,u=a.domain+"/",d=l.indexOf(u);if(0===d)h=l;else if(1===d&&"?"===l[0])h=l.slice(1);else{var c=l.substr(d).match(/([^\"]*)"?\)/);if(null!==c)h=c[1];else if(0===l.indexOf("url("))throw"Holder: unable to parse background URL: "+l}if(null!=h){var f=i(h,a);f&&o({mode:"background",el:e,flags:f,engineSettings:n})}}}),u.forEach(function(e){var t={};try{t.data=e.getAttribute("data"),t.dataSrc=e.getAttribute(F.vars.dataAttr)}catch(i){}var o=null!=t.data&&0===t.data.indexOf(a.domain),s=null!=t.dataSrc&&0===t.dataSrc.indexOf(a.domain);o?r(a,n,t.data,e):s&&r(a,n,t.dataSrc,e)}),s.forEach(function(e){var t={};try{t.src=e.getAttribute("src"),t.dataSrc=e.getAttribute(F.vars.dataAttr),t.rendered=e.getAttribute("data-holder-rendered")}catch(i){}var o=null!=t.src,s=null!=t.dataSrc&&0===t.dataSrc.indexOf(a.domain),l=null!=t.rendered&&"true"==t.rendered;o?0===t.src.indexOf(a.domain)?r(a,n,t.src,e):s&&(l?r(a,n,t.dataSrc,e):!function(e,t,n,i,o){w.imageExists(e,function(e){e||r(t,n,i,o)})}(t.src,a,n,t.dataSrc,e)):s&&r(a,n,t.dataSrc,e)}),this}},F={settings:{domain:"holder.js",images:"img",objects:"object",bgnodes:"body .holderjs",stylenodes:"head link.holderjs",themes:{gray:{bg:"#EEEEEE",fg:"#AAAAAA"},social:{bg:"#3a5a97",fg:"#FFFFFF"},industrial:{bg:"#434A52",fg:"#C2F200"},sky:{bg:"#0D8FDB",fg:"#FFFFFF"},vine:{bg:"#39DBAC",fg:"#1E292C"},lava:{bg:"#F8591A",fg:"#1C2846"}}},defaults:{size:10,units:"pt",scale:1/16}},z=function(){var e=null,t=null,n=null;return function(r){var i=r.root;if(F.setup.supportsSVG){var o=!1,a=function(e){return document.createTextNode(e)};(null==e||e.parentNode!==document.body)&&(o=!0),e=b.initSVG(e,i.properties.width,i.properties.height),e.style.display="block",o&&(t=x.newEl("text",j),n=a(null),x.setAttr(t,{x:0}),t.appendChild(n),e.appendChild(t),document.body.appendChild(e),e.style.visibility="hidden",e.style.position="absolute",e.style.top="-100%",e.style.left="-100%");var s=i.children.holderTextGroup,l=s.properties;x.setAttr(t,{y:l.font.size,style:w.cssProps({"font-weight":l.font.weight,"font-size":l.font.size+l.font.units,"font-family":l.font.family})}),n.nodeValue=l.text;var h=t.getBBox(),u=Math.ceil(h.width/i.properties.width),d=l.text.split(" "),c=l.text.match(/\\n/g);u+=null==c?0:c.length,n.nodeValue=l.text.replace(/[ ]+/g,"");var f=t.getComputedTextLength(),p=h.width-f,g=Math.round(p/Math.max(1,d.length-1)),m=[];if(u>1){n.nodeValue="";for(var v=0;v<d.length;v++)if(0!==d[v].length){n.nodeValue=w.decodeHtmlEntity(d[v]);var y=t.getBBox();m.push({text:d[v],width:y.width})}}return e.style.display="none",{spaceWidth:g,lineCount:u,boundingBox:h,words:m}}return!1}}();for(var D in F.flags)F.flags.hasOwnProperty(D)&&(F.flags[D].match=function(e){return e.match(this.regex)});F.setup={renderer:"html",debounce:100,ratio:1,supportsCanvas:!1,supportsSVG:!1,lineWrapRatio:.9,dataAttr:"data-src",renderers:["html","canvas","svg"]},F.vars={preempted:!1,resizableImages:[],invisibleImages:{},invisibleId:0,visibilityCheckStarted:!1,debounceTimer:null,cache:{}},function(){var e=x.newEl("canvas");e.getContext&&-1!=e.toDataURL("image/png").indexOf("data:image/png")&&(F.setup.renderer="canvas",F.setup.supportsCanvas=!0),document.createElementNS&&document.createElementNS(j,"svg").createSVGRect&&(F.setup.renderer="svg",F.setup.supportsSVG=!0)}(),c(),m&&m(function(){F.vars.preempted||O.run(),t.addEventListener?(t.addEventListener("resize",g,!1),t.addEventListener("orientationchange",g,!1)):t.attachEvent("onresize",g),"object"==typeof t.Turbolinks&&t.document.addEventListener("page:change",function(){O.run()})}),e.exports=O}).call(t,function(){return this}())},function(e,t){function n(e){function t(e){if(!x){if(!a.body)return i(t);for(x=!0;e=S.shift();)i(e)}}function n(e){(w||e.type===l||a[c]===d)&&(r(),t())}function r(){w?(a[y](m,n,h),e[y](l,n,h)):(a[p](v,n),e[p](u,n))}function i(e,t){setTimeout(e,+t>=0?t:1)}function o(e){x?i(e):S.push(e)}null==document.readyState&&document.addEventListener&&(document.addEventListener("DOMContentLoaded",function C(){document.removeEventListener("DOMContentLoaded",C,!1),document.readyState="complete"},!1),document.readyState="loading");var a=e.document,s=a.documentElement,l="load",h=!1,u="on"+l,d="complete",c="readyState",f="attachEvent",p="detachEvent",g="addEventListener",m="DOMContentLoaded",v="onreadystatechange",y="removeEventListener",w=g in a,b=h,x=h,S=[];if(a[c]===d)i(t);else if(w)a[g](m,n,h),e[g](l,n,h);else{a[f](v,n),e[f](u,n);try{b=null==e.frameElement&&s}catch(A){}b&&b.doScroll&&!function E(){if(!x){try{b.doScroll("left")}catch(e){return i(E,50)}r(),t()}}()}return o.version="1.4.0",o.isReady=function(){return x},o}e.exports="undefined"!=typeof window&&n(window)},function(e,t,n){var r=encodeURIComponent,i=decodeURIComponent,o=n(4),a=n(5),s=/(\w+)\[(\d+)\]/,l=/\w+\.\w+/;t.parse=function(e){if("string"!=typeof e)return{};if(e=o(e),""===e)return{};"?"===e.charAt(0)&&(e=e.slice(1));for(var t={},n=e.split("&"),r=0;r<n.length;r++){var a,h,u,d=n[r].split("="),c=i(d[0]);if(a=s.exec(c))t[a[1]]=t[a[1]]||[],t[a[1]][a[2]]=i(d[1]);else if(a=l.test(c)){for(a=c.split("."),h=t;a.length;)if(u=a.shift(),u.length){if(h[u]){if(h[u]&&"object"!=typeof h[u])break}else h[u]={};a.length||(h[u]=i(d[1])),h=h[u]}}else t[d[0]]=null==d[1]?"":i(d[1])}return t},t.stringify=function(e){if(!e)return"";var t=[];for(var n in e){var i=e[n];if("array"!=a(i))t.push(r(n)+"="+r(e[n]));else for(var o=0;o<i.length;++o)t.push(r(n+"["+o+"]")+"="+r(i[o]))}return t.join("&")}},function(e,t){function n(e){return e.replace(/^\s*|\s*$/g,"")}t=e.exports=n,t.left=function(e){return e.replace(/^\s*/,"")},t.right=function(e){return e.replace(/\s*$/,"")}},function(e,t){var n=Object.prototype.toString;e.exports=function(e){switch(n.call(e)){case"[object Date]":return"date";case"[object RegExp]":return"regexp";case"[object Arguments]":return"arguments";case"[object Array]":return"array";case"[object Error]":return"error"}return null===e?"null":void 0===e?"undefined":e!==e?"nan":e&&1===e.nodeType?"element":(e=e.valueOf?e.valueOf():Object.prototype.valueOf.apply(e),typeof e)}},function(e,t){var n=function(e){function t(e,t){for(var n in t)e[n]=t[n];return e}var n=1,r=function(e){n++,this.parent=null,this.children={},this.id=n,this.name="n"+n,"undefined"!=typeof e&&(this.name=e),this.x=this.y=this.z=0,this.width=this.height=0};r.prototype.resize=function(e,t){null!=e&&(this.width=e),null!=t&&(this.height=t)},r.prototype.moveTo=function(e,t,n){this.x=null!=e?e:this.x,this.y=null!=t?t:this.y,this.z=null!=n?n:this.z},r.prototype.add=function(e){var t=e.name;if("undefined"!=typeof this.children[t])throw"SceneGraph: child already exists: "+t;this.children[t]=e,e.parent=this};var i=function(){r.call(this,"root"),this.properties=e};i.prototype=new r;var o=function(e,n){if(r.call(this,e),this.properties={fill:"#000000"},"undefined"!=typeof n)t(this.properties,n);else if("undefined"!=typeof e&&"string"!=typeof e)throw"SceneGraph: invalid node name"};o.prototype=new r;var a=function(){o.apply(this,arguments),this.type="group"};a.prototype=new o;var s=function(){o.apply(this,arguments),this.type="rect"};s.prototype=new o;var l=function(e){o.call(this),this.type="text",this.properties.text=e};l.prototype=new o;var h=new i;return this.Shape={Rect:s,Text:l,Group:a},this.root=h,this};e.exports=n},function(e,t){(function(e){t.extend=function(e,t){var n={};for(var r in e)e.hasOwnProperty(r)&&(n[r]=e[r]);if(null!=t)for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);return n},t.cssProps=function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n+":"+e[n]);return t.join(";")},t.encodeHtmlEntity=function(e){for(var t=[],n=0,r=e.length-1;r>=0;r--)n=e.charCodeAt(r),n>128?t.unshift(["&#",n,";"].join("")):t.unshift(e[r]);return t.join("")},t.imageExists=function(e,t){var n=new Image;n.onerror=function(){t.call(this,!1)},n.onload=function(){t.call(this,!0)},n.src=e},t.decodeHtmlEntity=function(e){return e.replace(/&#(\d+);/g,function(e,t){return String.fromCharCode(t)})},t.dimensionCheck=function(e){var t={height:e.clientHeight,width:e.clientWidth};return t.height&&t.width?t:!1},t.truthy=function(e){return"string"==typeof e?"true"===e||"yes"===e||"1"===e||"on"===e||"✓"===e:!!e},t.parseColor=function(e){var t,n=/(^(?:#?)[0-9a-f]{6}$)|(^(?:#?)[0-9a-f]{3}$)/i,r=/^rgb\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,i=/^rgba\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0\.\d{1,}|1)\)$/,o=e.match(n);return null!==o?(t=o[1]||o[2],"#"!==t[0]?"#"+t:t):(o=e.match(r),null!==o?t="rgb("+o.slice(1).join(",")+")":(o=e.match(i),null!==o?t="rgba("+o.slice(1).join(",")+")":null))},t.canvasRatio=function(){var t=1,n=1;if(e.document){var r=e.document.createElement("canvas");if(r.getContext){var i=r.getContext("2d");t=e.devicePixelRatio||1,n=i.webkitBackingStorePixelRatio||i.mozBackingStorePixelRatio||i.msBackingStorePixelRatio||i.oBackingStorePixelRatio||i.backingStorePixelRatio||1}}return t/n}}).call(t,function(){return this}())},function(e,t,n){(function(e){var r=n(9),i="http://www.w3.org/2000/svg",o=8;t.initSVG=function(e,t,n){var a,s,l=!1;e&&e.querySelector?(s=e.querySelector("style"),null===s&&(l=!0)):(e=r.newEl("svg",i),l=!0),l&&(a=r.newEl("defs",i),s=r.newEl("style",i),r.setAttr(s,{type:"text/css"}),a.appendChild(s),e.appendChild(a)),e.webkitMatchesSelector&&e.setAttribute("xmlns",i);for(var h=0;h<e.childNodes.length;h++)e.childNodes[h].nodeType===o&&e.removeChild(e.childNodes[h]);for(;s.childNodes.length;)s.removeChild(s.childNodes[0]);return r.setAttr(e,{width:t,height:n,viewBox:"0 0 "+t+" "+n,preserveAspectRatio:"none"}),e},t.svgStringToDataURI=function(){var t="data:image/svg+xml;charset=UTF-8,",n="data:image/svg+xml;charset=UTF-8;base64,";return function(r,i){return i?n+btoa(e.unescape(encodeURIComponent(r))):t+encodeURIComponent(r)}}(),t.serializeSVG=function(t,n){if(e.XMLSerializer){var i=new XMLSerializer,o="",a=n.stylesheets;if(n.svgXMLStylesheet){for(var s=r.createXML(),l=a.length-1;l>=0;l--){var h=s.createProcessingInstruction("xml-stylesheet",'href="'+a[l]+'" rel="stylesheet"');s.insertBefore(h,s.firstChild)}s.removeChild(s.documentElement),o=i.serializeToString(s)}var u=i.serializeToString(t);return u=u.replace(/\&amp;(\#[0-9]{2,}\;)/g,"&$1"),o+u}}}).call(t,function(){return this}())},function(e,t){(function(e){t.newEl=function(t,n){return e.document?null==n?e.document.createElement(t):e.document.createElementNS(n,t):void 0},t.setAttr=function(e,t){for(var n in t)e.setAttribute(n,t[n])},t.createXML=function(){return e.DOMParser?(new DOMParser).parseFromString("<xml />","application/xml"):void 0},t.getNodeArray=function(t){var n=null;return"string"==typeof t?n=document.querySelectorAll(t):e.NodeList&&t instanceof e.NodeList?n=t:e.Node&&t instanceof e.Node?n=[t]:e.HTMLCollection&&t instanceof e.HTMLCollection?n=t:t instanceof Array?n=t:null===t&&(n=[]),n=Array.prototype.slice.call(n)}}).call(t,function(){return this}())},function(e,t){var n=function(e,t){"string"==typeof e&&(this.original=e,"#"===e.charAt(0)&&(e=e.slice(1)),/[^a-f0-9]+/i.test(e)||(3===e.length&&(e=e.replace(/./g,"$&$&")),6===e.length&&(this.alpha=1,t&&t.alpha&&(this.alpha=t.alpha),this.set(parseInt(e,16)))))};n.rgb2hex=function(e,t,n){function r(e){var t=(0|e).toString(16);return 16>e&&(t="0"+t),t}return[e,t,n].map(r).join("")},n.hsl2rgb=function(e,t,n){var r=e/60,i=(1-Math.abs(2*n-1))*t,o=i*(1-Math.abs(parseInt(r)%2-1)),a=n-i/2,s=0,l=0,h=0;return r>=0&&1>r?(s=i,l=o):r>=1&&2>r?(s=o,l=i):r>=2&&3>r?(l=i,h=o):r>=3&&4>r?(l=o,h=i):r>=4&&5>r?(s=o,h=i):r>=5&&6>r&&(s=i,h=o),s+=a,l+=a,h+=a,s=parseInt(255*s),l=parseInt(255*l),h=parseInt(255*h),[s,l,h]},n.prototype.set=function(e){this.raw=e;var t=(16711680&this.raw)>>16,n=(65280&this.raw)>>8,r=255&this.raw,i=.2126*t+.7152*n+.0722*r,o=-.09991*t-.33609*n+.436*r,a=.615*t-.55861*n-.05639*r;return this.rgb={r:t,g:n,b:r},this.yuv={y:i,u:o,v:a},this},n.prototype.lighten=function(e){var t=Math.min(1,Math.max(0,Math.abs(e)))*(0>e?-1:1),r=255*t|0,i=Math.min(255,Math.max(0,this.rgb.r+r)),o=Math.min(255,Math.max(0,this.rgb.g+r)),a=Math.min(255,Math.max(0,this.rgb.b+r)),s=n.rgb2hex(i,o,a);return new n(s)},n.prototype.toHex=function(e){return(e?"#":"")+this.raw.toString(16)},n.prototype.lighterThan=function(e){return e instanceof n||(e=new n(e)),this.yuv.y>e.yuv.y},n.prototype.blendAlpha=function(e){e instanceof n||(e=new n(e));var t=e,r=this,i=t.alpha*t.rgb.r+(1-t.alpha)*r.rgb.r,o=t.alpha*t.rgb.g+(1-t.alpha)*r.rgb.g,a=t.alpha*t.rgb.b+(1-t.alpha)*r.rgb.b;return new n(n.rgb2hex(i,o,a))},e.exports=n},function(e,t){e.exports={version:"2.9.0",svg_ns:"http://www.w3.org/2000/svg"}},function(e,t,n){function r(e,t){return d.element({tag:t,width:e.width,height:e.height,fill:e.properties.fill})}function i(e){return h.cssProps({fill:e.fill,"font-weight":e.font.weight,"font-family":e.font.family+", monospace","font-size":e.font.size+e.font.units})}function o(e,t,n){var r=n/2;return["M",r,r,"H",e-r,"V",t-r,"H",r,"V",0,"M",0,r,"L",e,t-r,"M",0,t-r,"L",e,r].join(" ")}var a=n(13),s=n(8),l=n(11),h=n(7),u=l.svg_ns,d={element:function(e){var t=e.tag,n=e.content||"";return delete e.tag,delete e.content,[t,n,e]}};e.exports=function(e,t){var n=t.engineSettings,l=n.stylesheets,h=l.map(function(e){return'<?xml-stylesheet rel="stylesheet" href="'+e+'"?>'}).join("\n"),c="holder_"+Number(new Date).toString(16),f=e.root,p=f.children.holderTextGroup,g="#"+c+" text { "+i(p.properties)+" } ";p.y+=.8*p.textPositionData.boundingBox.height;var m=[];Object.keys(p.children).forEach(function(e){var t=p.children[e];Object.keys(t.children).forEach(function(e){var n=t.children[e],r=p.x+t.x+n.x,i=p.y+t.y+n.y,o=d.element({tag:"text",content:n.properties.text,x:r,y:i});m.push(o)})});var v=d.element({tag:"g",content:m}),y=null;if(f.children.holderBg.properties.outline){var w=f.children.holderBg.properties.outline;y=d.element({tag:"path",d:o(f.children.holderBg.width,f.children.holderBg.height,w.width),"stroke-width":w.width,stroke:w.fill,fill:"none"})}var b=r(f.children.holderBg,"rect"),x=[];x.push(b),w&&x.push(y),x.push(v);var S=d.element({tag:"g",id:c,content:x}),A=d.element({tag:"style",content:g,type:"text/css"}),C=d.element({tag:"defs",content:A}),E=d.element({tag:"svg",content:[C,S],width:f.properties.width,height:f.properties.height,xmlns:u,viewBox:[0,0,f.properties.width,f.properties.height].join(" "),preserveAspectRatio:"none"}),T=a(E);T=h+T[0];var k=s.svgStringToDataURI(T,"background"===t.mode);return k}},function(e,t,n){n(14);e.exports=function r(e,t,n){"use strict";function i(e){var t=e.match(/^\w+/),r={tag:t?t[0]:"div",attr:{},children:[]},i=e.match(/#([\w-]+)/),o=e.match(/\$([\w-]+)/),a=e.match(/\.[\w-]+/g);return i&&(r.attr.id=i[1],n[i[1]]=r),o&&(n[o[1]]=r),a&&(r.attr["class"]=a.join(" ").replace(/\./g,"")),e.match(/&$/g)&&(f=!1),r}function o(e,t){return null!==t&&t!==!1&&void 0!==t?"string"!=typeof t&&"object"!=typeof t?String(t):t:void 0}function a(e){return String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;")}function s(e){return String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var l,h,u,d,c=1,f=!0;if(n=n||{},"string"==typeof e[0])e[0]=i(e[0]);else{if(!Array.isArray(e[0]))throw new Error("First element of array must be a string, or an array and not "+JSON.stringify(e[0]));c=0}for(;c<e.length;c++){if(e[c]===!1||null===e[c]){e[0]=!1;break}if(void 0!==e[c]&&e[c]!==!0)if("string"==typeof e[c])f&&(e[c]=s(e[c])),e[0].children.push(e[c]);else if("number"==typeof e[c])e[0].children.push(e[c]);else if(Array.isArray(e[c])){if(Array.isArray(e[c][0])){if(e[c].reverse().forEach(function(t){e.splice(c+1,0,t)}),0!==c)continue;c++}r(e[c],t,n),e[c][0]&&e[0].children.push(e[c][0])}else if("function"==typeof e[c])u=e[c];else{if("object"!=typeof e[c])throw new TypeError('"'+e[c]+'" is not allowed as a value.');for(h in e[c])e[c].hasOwnProperty(h)&&null!==e[c][h]&&e[c][h]!==!1&&("style"===h&&"object"==typeof e[c][h]?e[0].attr[h]=JSON.stringify(e[c][h],o).slice(2,-2).replace(/","/g,";").replace(/":"/g,":").replace(/\\"/g,"'"):e[0].attr[h]=e[c][h])}}if(e[0]!==!1){l="<"+e[0].tag;for(d in e[0].attr)e[0].attr.hasOwnProperty(d)&&(l+=" "+d+'="'+a(e[0].attr[d]||"")+'"');l+=">",e[0].children.forEach(function(e){l+=e}),l+="</"+e[0].tag+">",e[0]=l}return n[0]=e[0],u&&u(e[0]),n}},function(e,t){function n(e){return String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}e.exports=n},function(e,t,n){var r=n(9),i=n(7);e.exports=function(){var e=r.newEl("canvas"),t=null;return function(n){null==t&&(t=e.getContext("2d"));var r=i.canvasRatio(),o=n.root;e.width=r*o.properties.width,e.height=r*o.properties.height,t.textBaseline="middle";var a=o.children.holderBg,s=r*a.width,l=r*a.height,h=2,u=h/2;t.fillStyle=a.properties.fill,t.fillRect(0,0,s,l),a.properties.outline&&(t.strokeStyle=a.properties.outline.fill,t.lineWidth=a.properties.outline.width,t.moveTo(u,u),t.lineTo(s-u,u),t.lineTo(s-u,l-u),t.lineTo(u,l-u),t.lineTo(u,u),t.moveTo(0,u),t.lineTo(s,l-u),t.moveTo(0,l-u),t.lineTo(s,u),t.stroke());var d=o.children.holderTextGroup;t.font=d.properties.font.weight+" "+r*d.properties.font.size+d.properties.font.units+" "+d.properties.font.family+", monospace",t.fillStyle=d.properties.fill;for(var c in d.children){var f=d.children[c];for(var p in f.children){var g=f.children[p],m=r*(d.x+f.x+g.x),v=r*(d.y+f.y+g.y+d.properties.leading/2);t.fillText(g.properties.text,m,v)}}return e.toDataURL("image/png")}}()}])}),function(e,t){t&&(Holder=e.Holder)}(this,"undefined"!=typeof Meteor&&"undefined"!=typeof Package);
/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function b(b,d){var e,f,g,h=b.nodeName.toLowerCase();return"area"===h?(e=b.parentNode,f=e.name,b.href&&f&&"map"===e.nodeName.toLowerCase()?(g=a("img[usemap='#"+f+"']")[0],!!g&&c(g)):!1):(/^(input|select|textarea|button|object)$/.test(h)?!b.disabled:"a"===h?b.href||d:d)&&c(b)}function c(b){return a.expr.filters.visible(b)&&!a(b).parents().addBack().filter(function(){return"hidden"===a.css(this,"visibility")}).length}a.ui=a.ui||{},a.extend(a.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),a.fn.extend({scrollParent:function(b){var c=this.css("position"),d="absolute"===c,e=b?/(auto|scroll|hidden)/:/(auto|scroll)/,f=this.parents().filter(function(){var b=a(this);return d&&"static"===b.css("position")?!1:e.test(b.css("overflow")+b.css("overflow-y")+b.css("overflow-x"))}).eq(0);return"fixed"!==c&&f.length?f:a(this[0].ownerDocument||document)},uniqueId:function(){var a=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&a(this).removeAttr("id")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(c){return b(c,!isNaN(a.attr(c,"tabindex")))},tabbable:function(c){var d=a.attr(c,"tabindex"),e=isNaN(d);return(e||d>=0)&&b(c,!e)}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(b,c){function d(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.css(b,"padding"+this))||0,d&&(c-=parseFloat(a.css(b,"border"+this+"Width"))||0),f&&(c-=parseFloat(a.css(b,"margin"+this))||0)}),c}var e="Width"===c?["Left","Right"]:["Top","Bottom"],f=c.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+c]=function(b){return void 0===b?g["inner"+c].call(this):this.each(function(){a(this).css(f,d(this,b)+"px")})},a.fn["outer"+c]=function(b,e){return"number"!=typeof b?g["outer"+c].call(this,b):this.each(function(){a(this).css(f,d(this,b,!0,e)+"px")})}}),a.fn.addBack||(a.fn.addBack=function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}),a("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(a.fn.removeData=function(b){return function(c){return arguments.length?b.call(this,a.camelCase(c)):b.call(this)}}(a.fn.removeData)),a.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),a.fn.extend({focus:function(b){return function(c,d){return"number"==typeof c?this.each(function(){var b=this;setTimeout(function(){a(b).focus(),d&&d.call(b)},c)}):b.apply(this,arguments)}}(a.fn.focus),disableSelection:function(){var a="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(a+".ui-disableSelection",function(a){a.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(b){if(void 0!==b)return this.css("zIndex",b);if(this.length)for(var c,d,e=a(this[0]);e.length&&e[0]!==document;){if(c=e.css("position"),("absolute"===c||"relative"===c||"fixed"===c)&&(d=parseInt(e.css("zIndex"),10),!isNaN(d)&&0!==d))return d;e=e.parent()}return 0}}),a.ui.plugin={add:function(b,c,d){var e,f=a.ui[b].prototype;for(e in d)f.plugins[e]=f.plugins[e]||[],f.plugins[e].push([c,d[e]])},call:function(a,b,c,d){var e,f=a.plugins[b];if(f&&(d||a.element[0].parentNode&&11!==a.element[0].parentNode.nodeType))for(e=0;e<f.length;e++)a.options[f[e][0]]&&f[e][1].apply(a.element,c)}}});
/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){var b=0,c=Array.prototype.slice;return a.cleanData=function(b){return function(c){var d,e,f;for(f=0;null!=(e=c[f]);f++)try{d=a._data(e,"events"),d&&d.remove&&a(e).triggerHandler("remove")}catch(g){}b(c)}}(a.cleanData),a.widget=function(b,c,d){var e,f,g,h,i={},j=b.split(".")[0];return b=b.split(".")[1],e=j+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][e.toLowerCase()]=function(b){return!!a.data(b,e)},a[j]=a[j]||{},f=a[j][b],g=a[j][b]=function(a,b){return this._createWidget?void(arguments.length&&this._createWidget(a,b)):new g(a,b)},a.extend(g,f,{version:d.version,_proto:a.extend({},d),_childConstructors:[]}),h=new c,h.options=a.widget.extend({},h.options),a.each(d,function(b,d){return a.isFunction(d)?void(i[b]=function(){var a=function(){return c.prototype[b].apply(this,arguments)},e=function(a){return c.prototype[b].apply(this,a)};return function(){var b,c=this._super,f=this._superApply;return this._super=a,this._superApply=e,b=d.apply(this,arguments),this._super=c,this._superApply=f,b}}()):void(i[b]=d)}),g.prototype=a.widget.extend(h,{widgetEventPrefix:f?h.widgetEventPrefix||b:b},i,{constructor:g,namespace:j,widgetName:b,widgetFullName:e}),f?(a.each(f._childConstructors,function(b,c){var d=c.prototype;a.widget(d.namespace+"."+d.widgetName,g,c._proto)}),delete f._childConstructors):c._childConstructors.push(g),a.widget.bridge(b,g),g},a.widget.extend=function(b){for(var d,e,f=c.call(arguments,1),g=0,h=f.length;h>g;g++)for(d in f[g])e=f[g][d],f[g].hasOwnProperty(d)&&void 0!==e&&(b[d]=a.isPlainObject(e)?a.isPlainObject(b[d])?a.widget.extend({},b[d],e):a.widget.extend({},e):e);return b},a.widget.bridge=function(b,d){var e=d.prototype.widgetFullName||b;a.fn[b]=function(f){var g="string"==typeof f,h=c.call(arguments,1),i=this;return g?this.each(function(){var c,d=a.data(this,e);return"instance"===f?(i=d,!1):d?a.isFunction(d[f])&&"_"!==f.charAt(0)?(c=d[f].apply(d,h),c!==d&&void 0!==c?(i=c&&c.jquery?i.pushStack(c.get()):c,!1):void 0):a.error("no such method '"+f+"' for "+b+" widget instance"):a.error("cannot call methods on "+b+" prior to initialization; attempted to call method '"+f+"'")}):(h.length&&(f=a.widget.extend.apply(null,[f].concat(h))),this.each(function(){var b=a.data(this,e);b?(b.option(f||{}),b._init&&b._init()):a.data(this,e,new d(f,this))})),i}},a.Widget=function(){},a.Widget._childConstructors=[],a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(c,d){d=a(d||this.defaultElement||this)[0],this.element=a(d),this.uuid=b++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=a(),this.hoverable=a(),this.focusable=a(),d!==this&&(a.data(d,this.widgetFullName,this),this._on(!0,this.element,{remove:function(a){a.target===d&&this.destroy()}}),this.document=a(d.style?d.ownerDocument:d.document||d),this.window=a(this.document[0].defaultView||this.document[0].parentWindow)),this.options=a.widget.extend({},this.options,this._getCreateOptions(),c),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:a.noop,_getCreateEventData:a.noop,_create:a.noop,_init:a.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:a.noop,widget:function(){return this.element},option:function(b,c){var d,e,f,g=b;if(0===arguments.length)return a.widget.extend({},this.options);if("string"==typeof b)if(g={},d=b.split("."),b=d.shift(),d.length){for(e=g[b]=a.widget.extend({},this.options[b]),f=0;f<d.length-1;f++)e[d[f]]=e[d[f]]||{},e=e[d[f]];if(b=d.pop(),1===arguments.length)return void 0===e[b]?null:e[b];e[b]=c}else{if(1===arguments.length)return void 0===this.options[b]?null:this.options[b];g[b]=c}return this._setOptions(g),this},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){return this.options[a]=b,"disabled"===a&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!b),b&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(b,c,d){var e,f=this;"boolean"!=typeof b&&(d=c,c=b,b=!1),d?(c=e=a(c),this.bindings=this.bindings.add(c)):(d=c,c=this.element,e=this.widget()),a.each(d,function(d,g){function h(){return b||f.options.disabled!==!0&&!a(this).hasClass("ui-state-disabled")?("string"==typeof g?f[g]:g).apply(f,arguments):void 0}"string"!=typeof g&&(h.guid=g.guid=g.guid||h.guid||a.guid++);var i=d.match(/^([\w:-]*)\s*(.*)$/),j=i[1]+f.eventNamespace,k=i[2];k?e.delegate(k,j,h):c.bind(j,h)})},_off:function(b,c){c=(c||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,b.unbind(c).undelegate(c),this.bindings=a(this.bindings.not(b).get()),this.focusable=a(this.focusable.not(b).get()),this.hoverable=a(this.hoverable.not(b).get())},_delay:function(a,b){function c(){return("string"==typeof a?d[a]:a).apply(d,arguments)}var d=this;return setTimeout(c,b||0)},_hoverable:function(b){this.hoverable=this.hoverable.add(b),this._on(b,{mouseenter:function(b){a(b.currentTarget).addClass("ui-state-hover")},mouseleave:function(b){a(b.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(b){this.focusable=this.focusable.add(b),this._on(b,{focusin:function(b){a(b.currentTarget).addClass("ui-state-focus")},focusout:function(b){a(b.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(b,c,d){var e,f,g=this.options[b];if(d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.apply(this.element[0],[c].concat(d))===!1||c.isDefaultPrevented())}},a.each({show:"fadeIn",hide:"fadeOut"},function(b,c){a.Widget.prototype["_"+b]=function(d,e,f){"string"==typeof e&&(e={effect:e});var g,h=e?e===!0||"number"==typeof e?c:e.effect||c:b;e=e||{},"number"==typeof e&&(e={duration:e}),g=!a.isEmptyObject(e),e.complete=f,e.delay&&d.delay(e.delay),g&&a.effects&&a.effects.effect[h]?d[b](e):h!==b&&d[h]?d[h](e.duration,e.easing,f):d.queue(function(c){a(this)[b](),f&&f.call(d[0]),c()})}}),a.widget});
/*!
 * jQuery UI Mouse 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./widget"],a):a(jQuery)}(function(a){var b=!1;return a(document).mouseup(function(){b=!1}),a.widget("ui.mouse",{version:"1.11.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){return!0===a.data(c.target,b.widgetName+".preventClickEvent")?(a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(c){if(!b){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(c),this._mouseDownEvent=c;var d=this,e=1===c.which,f="string"==typeof this.options.cancel&&c.target.nodeName?a(c.target).closest(this.options.cancel).length:!1;return e&&!f&&this._mouseCapture(c)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(c)&&this._mouseDelayMet(c)&&(this._mouseStarted=this._mouseStart(c)!==!1,!this._mouseStarted)?(c.preventDefault(),!0):(!0===a.data(c.target,this.widgetName+".preventClickEvent")&&a.removeData(c.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),c.preventDefault(),b=!0,!0)):!0}},_mouseMove:function(b){if(this._mouseMoved){if(a.ui.ie&&(!document.documentMode||document.documentMode<9)&&!b.button)return this._mouseUp(b);if(!b.which)return this._mouseUp(b)}return(b.which||b.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted)},_mouseUp:function(c){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,c.target===this._mouseDownEvent.target&&a.data(c.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(c)),b=!1,!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})});
/*!
 * jQuery UI Slider 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slider/
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],a):a(jQuery)}(function(a){return a.widget("ui.slider",a.ui.mouse,{version:"1.11.4",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var b,c,d=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",g=[];for(c=d.values&&d.values.length||1,e.length>c&&(e.slice(c).remove(),e=e.slice(0,c)),b=e.length;c>b;b++)g.push(f);this.handles=e.add(a(g.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(b){a(this).data("ui-slider-handle-index",b)})},_createRange:function(){var b=this.options,c="";b.range?(b.range===!0&&(b.values?b.values.length&&2!==b.values.length?b.values=[b.values[0],b.values[0]]:a.isArray(b.values)&&(b.values=b.values.slice(0)):b.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=a("<div></div>").appendTo(this.element),c="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(c+("min"===b.range||"max"===b.range?" ui-slider-range-"+b.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(b){var c,d,e,f,g,h,i,j,k=this,l=this.options;return l.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),c={x:b.pageX,y:b.pageY},d=this._normValueFromMouse(c),e=this._valueMax()-this._valueMin()+1,this.handles.each(function(b){var c=Math.abs(d-k.values(b));(e>c||e===c&&(b===k._lastChangedValue||k.values(b)===l.min))&&(e=c,f=a(this),g=b)}),h=this._start(b,g),h===!1?!1:(this._mouseSliding=!0,this._handleIndex=g,f.addClass("ui-state-active").focus(),i=f.offset(),j=!a(b.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=j?{left:0,top:0}:{left:b.pageX-i.left-f.width()/2,top:b.pageY-i.top-f.height()/2-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(b,g,d),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(a){var b={x:a.pageX,y:a.pageY},c=this._normValueFromMouse(b);return this._slide(a,this._handleIndex,c),!1},_mouseStop:function(a){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(a){var b,c,d,e,f;return"horizontal"===this.orientation?(b=this.elementSize.width,c=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,c=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),d=c/b,d>1&&(d=1),0>d&&(d=0),"vertical"===this.orientation&&(d=1-d),e=this._valueMax()-this._valueMin(),f=this._valueMin()+d*e,this._trimAlignValue(f)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};return this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("start",a,c)},_slide:function(a,b,c){var d,e,f;this.options.values&&this.options.values.length?(d=this.values(b?0:1),2===this.options.values.length&&this.options.range===!0&&(0===b&&c>d||1===b&&d>c)&&(c=d),c!==this.values(b)&&(e=this.values(),e[b]=c,f=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e}),d=this.values(b?0:1),f!==!1&&this.values(b,c))):c!==this.value()&&(f=this._trigger("slide",a,{handle:this.handles[b],value:c}),f!==!1&&this.value(c))},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._lastChangedValue=b,this._trigger("change",a,c)}},value:function(a){return arguments.length?(this.options.value=this._trimAlignValue(a),this._refreshValue(),void this._change(null,0)):this._value()},values:function(b,c){var d,e,f;if(arguments.length>1)return this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),void this._change(null,b);if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(b):this.value();for(d=this.options.values,e=arguments[0],f=0;f<d.length;f+=1)d[f]=this._trimAlignValue(e[f]),this._change(null,f);this._refreshValue()},_setOption:function(b,c){var d,e=0;switch("range"===b&&this.options.range===!0&&("min"===c?(this.options.value=this._values(0),this.options.values=null):"max"===c&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),a.isArray(this.options.values)&&(e=this.options.values.length),"disabled"===b&&this.element.toggleClass("ui-state-disabled",!!c),this._super(b,c),b){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue(),this.handles.css("horizontal"===c?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),d=0;e>d;d+=1)this._change(null,d);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a)},_values:function(a){var b,c,d;if(arguments.length)return b=this.options.values[a],b=this._trimAlignValue(b);if(this.options.values&&this.options.values.length){for(c=this.options.values.slice(),d=0;d<c.length;d+=1)c[d]=this._trimAlignValue(c[d]);return c}return[]},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b,d=a-c;return 2*Math.abs(c)>=b&&(d+=c>0?b:-b),parseFloat(d.toFixed(5))},_calculateNewMax:function(){var a=this.options.max,b=this._valueMin(),c=this.options.step,d=Math.floor(+(a-b).toFixed(this._precision())/c)*c;a=d+b,this.max=parseFloat(a.toFixed(this._precision()))},_precision:function(){var a=this._precisionOf(this.options.step);return null!==this.options.min&&(a=Math.max(a,this._precisionOf(this.options.min))),a},_precisionOf:function(a){var b=a.toString(),c=b.indexOf(".");return-1===c?0:b.length-c-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshValue:function(){var b,c,d,e,f,g=this.options.range,h=this.options,i=this,j=this._animateOff?!1:h.animate,k={};this.options.values&&this.options.values.length?this.handles.each(function(d){c=(i.values(d)-i._valueMin())/(i._valueMax()-i._valueMin())*100,k["horizontal"===i.orientation?"left":"bottom"]=c+"%",a(this).stop(1,1)[j?"animate":"css"](k,h.animate),i.options.range===!0&&("horizontal"===i.orientation?(0===d&&i.range.stop(1,1)[j?"animate":"css"]({left:c+"%"},h.animate),1===d&&i.range[j?"animate":"css"]({width:c-b+"%"},{queue:!1,duration:h.animate})):(0===d&&i.range.stop(1,1)[j?"animate":"css"]({bottom:c+"%"},h.animate),1===d&&i.range[j?"animate":"css"]({height:c-b+"%"},{queue:!1,duration:h.animate}))),b=c}):(d=this.value(),e=this._valueMin(),f=this._valueMax(),c=f!==e?(d-e)/(f-e)*100:0,k["horizontal"===this.orientation?"left":"bottom"]=c+"%",this.handle.stop(1,1)[j?"animate":"css"](k,h.animate),"min"===g&&"horizontal"===this.orientation&&this.range.stop(1,1)[j?"animate":"css"]({width:c+"%"},h.animate),"max"===g&&"horizontal"===this.orientation&&this.range[j?"animate":"css"]({width:100-c+"%"},{queue:!1,duration:h.animate}),"min"===g&&"vertical"===this.orientation&&this.range.stop(1,1)[j?"animate":"css"]({height:c+"%"},h.animate),"max"===g&&"vertical"===this.orientation&&this.range[j?"animate":"css"]({height:100-c+"%"},{queue:!1,duration:h.animate}))},_handleEvents:{keydown:function(b){var c,d,e,f,g=a(b.target).data("ui-slider-handle-index");switch(b.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(b.preventDefault(),!this._keySliding&&(this._keySliding=!0,a(b.target).addClass("ui-state-active"),c=this._start(b,g),c===!1))return}switch(f=this.options.step,d=e=this.options.values&&this.options.values.length?this.values(g):this.value(),b.keyCode){case a.ui.keyCode.HOME:e=this._valueMin();break;case a.ui.keyCode.END:e=this._valueMax();break;case a.ui.keyCode.PAGE_UP:e=this._trimAlignValue(d+(this._valueMax()-this._valueMin())/this.numPages);break;case a.ui.keyCode.PAGE_DOWN:e=this._trimAlignValue(d-(this._valueMax()-this._valueMin())/this.numPages);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(d===this._valueMax())return;e=this._trimAlignValue(d+f);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(d===this._valueMin())return;e=this._trimAlignValue(d-f)}this._slide(b,g,e)},keyup:function(b){var c=a(b.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(b,c),this._change(b,c),a(b.target).removeClass("ui-state-active"))}}})});
/*
 * --------------------------------------------------------------------
 * jQuery-Plugin - selectToUISlider - creates a UI slider component from a select element(s)
 * by Scott Jehl, scott@filamentgroup.com
 * http://www.filamentgroup.com
 * reference article: http://www.filamentgroup.com/lab/update_jquery_ui_16_slider_from_a_select_element/
 * demo page: http://www.filamentgroup.com/examples/slider_v2/index.html
 * 
 * Copyright (c) 2008 Filament Group, Inc
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 *
 * Usage Notes: please refer to our article above for documentation
 *  
 * --------------------------------------------------------------------
 */

jQuery.fn.selectToUISlider = function(settings){
	var selects = jQuery(this);
	
	//accessible slider options
	var options = jQuery.extend({
		labels: 3, //number of visible labels
		tooltip: true, //show tooltips, boolean
		tooltipSrc: 'text',//accepts 'value' as well
		labelSrc: 'value',//accepts 'value' as well	,
		sliderOptions: null
	}, settings);


	//handle ID attrs - selects each need IDs for handles to find them
	var handleIds = (function(){
		var tempArr = [];
		selects.each(function(){
			tempArr.push('handle_'+jQuery(this).attr('id'));
		});
		return tempArr;
	})();
	
	//array of all option elements in select element (ignores optgroups)
	var selectOptions = (function(){
		var opts = [];
		selects.eq(0).find('option').each(function(){
			opts.push({
				value: jQuery(this).attr('value'),
				text: jQuery(this).text()
			});
		});
		return opts;
	})();
	
	//array of opt groups if present
	var groups = (function(){
		if(selects.eq(0).find('optgroup').size()>0){
			var groupedData = [];
			selects.eq(0).find('optgroup').each(function(i){
				groupedData[i] = {};
				groupedData[i].label = jQuery(this).attr('label');
				groupedData[i].options = [];
				jQuery(this).find('option').each(function(){
					groupedData[i].options.push({text: jQuery(this).text(), value: jQuery(this).attr('value')});
				});
			});
			return groupedData;
		}
		else return null;
	})();	
	
	//check if obj is array
	function isArray(obj) {
		return obj.constructor == Array;
	}
	//return tooltip text from option index
	function ttText(optIndex){
		return (options.tooltipSrc == 'text') ? selectOptions[optIndex].text : selectOptions[optIndex].value;
	}
	
	//plugin-generated slider options (can be overridden)
	var sliderOptions = {
		step: 1,
		min: 0,
		orientation: 'horizontal',
		max: selectOptions.length-1,
		range: selects.length > 1,//multiple select elements = true
		slide: function(e, ui) {//slide function
				var thisHandle = jQuery(ui.handle);
				//handle feedback 
				var textval = ttText(ui.value);
				thisHandle
					.attr('aria-valuetext', textval)
					.attr('aria-valuenow', ui.value)
					.find('.ui-slider-tooltip .ttContent')
						.text( textval );

				//control original select menu
				var currSelect = jQuery('#' + thisHandle.attr('id').split('handle_')[1]);
				currSelect.find('option').eq(ui.value).attr('selected', 'selected');
		},
		values: (function(){
			var values = [];
			selects.each(function(){
				values.push( jQuery(this).get(0).selectedIndex );
			});
			return values;
		})()
	};
	
	//slider options from settings
	options.sliderOptions = (settings) ? jQuery.extend(sliderOptions, settings.sliderOptions) : sliderOptions;
		
	//select element change event	
	selects.bind('change keyup click', function(){
		var thisIndex = jQuery(this).get(0).selectedIndex;
		var thisHandle = jQuery('#handle_'+ jQuery(this).attr('id'));
		var handleIndex = thisHandle.data('handleNum');
		thisHandle.parents('.ui-slider:eq(0)').slider("values", handleIndex, thisIndex);
	});
	

	//create slider component div
	var sliderComponent = jQuery('<div></div>');

	//CREATE HANDLES
	selects.each(function(i){
		var hidett = '';
		
		//associate label for ARIA
		var thisLabel = jQuery('label[for=' + jQuery(this).attr('id') +']');
		//labelled by aria doesn't seem to work on slider handle. Using title attr as backup
		var labelText = (thisLabel.size()>0) ? 'Slider control for '+ thisLabel.text()+'' : '';
		var thisLabelId = thisLabel.attr('id') || thisLabel.attr('id', 'label_'+handleIds[i]).attr('id');
		
		
		if( options.tooltip == false ){hidett = ' style="display: none;"';}
		jQuery('<a '+
				'href="#" tabindex="0" '+
				'id="'+handleIds[i]+'" '+
				'class="ui-slider-handle" '+
				'role="slider" '+
				'aria-labelledby="'+thisLabelId+'" '+
				'aria-valuemin="'+options.sliderOptions.min+'" '+
				'aria-valuemax="'+options.sliderOptions.max+'" '+
				'aria-valuenow="'+options.sliderOptions.values[i]+'" '+
				'aria-valuetext="'+ttText(options.sliderOptions.values[i])+'" '+
			'><span class="screenReaderContext">'+labelText+'</span>'+
			'<span class="ui-slider-tooltip ui-widget-content ui-corner-all"'+ hidett +'><span class="ttContent"></span>'+
				'<span class="ui-tooltip-pointer-down ui-widget-content"><span class="ui-tooltip-pointer-down-inner"></span></span>'+
			'</span></a>')
			.data('handleNum',i)
			.appendTo(sliderComponent);
	});
	
	//CREATE SCALE AND TICS
	
	//write dl if there are optgroups
	if(groups) {
		var inc = 0;
		var scale = sliderComponent.append('<dl class="ui-slider-scale ui-helper-reset" role="presentation"></dl>').find('.ui-slider-scale:eq(0)');
		jQuery(groups).each(function(h){
			scale.append('<dt style="width: '+ (100/groups.length).toFixed(2) +'%' +'; left:'+ (h/(groups.length-1) * 100).toFixed(2)  +'%' +'"><span>'+this.label+'</span></dt>');//class name becomes camelCased label
			var groupOpts = this.options;
			jQuery(this.options).each(function(i){
				var style = (inc == selectOptions.length-1 || inc == 0) ? 'style="display: none;"' : '' ;
				var labelText = (options.labelSrc == 'text') ? groupOpts[i].text : groupOpts[i].value;
				scale.append('<dd style="left:'+ leftVal(inc) +'"><span class="ui-slider-label">'+ labelText +'</span><span class="ui-slider-tic ui-widget-content"'+ style +'></span></dd>');
				inc++;
			});
		});
	}
	//write ol
	else {
		var scale = sliderComponent.append('<ol class="ui-slider-scale ui-helper-reset" role="presentation"></ol>').find('.ui-slider-scale:eq(0)');
		jQuery(selectOptions).each(function(i){
			var style = (i == selectOptions.length-1 || i == 0) ? 'style="display: none;"' : '' ;
			var labelText = (options.labelSrc == 'text') ? this.text : this.value;
			scale.append('<li style="left:'+ leftVal(i) +'"><span class="ui-slider-label">'+ labelText +'</span><span class="ui-slider-tic ui-widget-content"'+ style +'></span></li>');
		});
	}
	
	function leftVal(i){
		return (i/(selectOptions.length-1) * 100).toFixed(2)  +'%';
		
	}
	

	
	
	//show and hide labels depending on labels pref
	//show the last one if there are more than 1 specified
	if(options.labels > 1) sliderComponent.find('.ui-slider-scale li:last span.ui-slider-label, .ui-slider-scale dd:last span.ui-slider-label').addClass('ui-slider-label-show');

	//set increment
	var increm = Math.max(1, Math.round(selectOptions.length / options.labels));
	//show em based on inc
	for(var j=0; j<selectOptions.length; j+=increm){
		if((selectOptions.length - j) > increm){//don't show if it's too close to the end label
			sliderComponent.find('.ui-slider-scale li:eq('+ j +') span.ui-slider-label, .ui-slider-scale dd:eq('+ j +') span.ui-slider-label').addClass('ui-slider-label-show');
		}
	}

	//style the dt's
	sliderComponent.find('.ui-slider-scale dt').each(function(i){
		jQuery(this).css({
			'left': ((100 /( groups.length))*i).toFixed(2) + '%'
		});
	});
	

	//inject and return 
	sliderComponent
	.insertAfter(jQuery(this).eq(this.length-1))
	.slider(options.sliderOptions)
	.attr('role','application')
	.find('.ui-slider-label')
	.each(function(){
		jQuery(this).css('marginLeft', -jQuery(this).width()/2);
	});
	
	//update tooltip arrow inner color
	sliderComponent.find('.ui-tooltip-pointer-down-inner').each(function(){
				var bWidth = jQuery('.ui-tooltip-pointer-down-inner').css('borderTopWidth');
				var bColor = jQuery(this).parents('.ui-slider-tooltip').css('backgroundColor')
				jQuery(this).css('border-top', bWidth+' solid '+bColor);
	});
	
	var values = sliderComponent.slider('values');
	
	if(isArray(values)){
		jQuery(values).each(function(i){
			sliderComponent.find('.ui-slider-tooltip .ttContent').eq(i).text( ttText(this) );
		});
	}
	else {
		sliderComponent.find('.ui-slider-tooltip .ttContent').eq(0).text( ttText(values) );
	}
	
	return this;
}
var imgLiquid=imgLiquid||{VER:"0.9.944"};imgLiquid.bgs_Available=!1,imgLiquid.bgs_CheckRunned=!1,imgLiquid.injectCss=".imgLiquid img {visibility:hidden}",function(i){function t(){if(!imgLiquid.bgs_CheckRunned){imgLiquid.bgs_CheckRunned=!0;var t=i('<span style="background-size:cover" />');i("body").append(t),!function(){var i=t[0];if(i&&window.getComputedStyle){var e=window.getComputedStyle(i,null);e&&e.backgroundSize&&(imgLiquid.bgs_Available="cover"===e.backgroundSize)}}(),t.remove()}}i.fn.extend({imgLiquid:function(e){this.defaults={fill:!0,verticalAlign:"center",horizontalAlign:"center",useBackgroundSize:!0,useDataHtmlAttr:!0,responsive:!0,delay:0,fadeInTime:0,removeBoxBackground:!0,hardPixels:!0,responsiveCheckTime:500,timecheckvisibility:500,onStart:null,onFinish:null,onItemStart:null,onItemFinish:null,onItemError:null},t();var a=this;return this.options=e,this.settings=i.extend({},this.defaults,this.options),this.settings.onStart&&this.settings.onStart(),this.each(function(t){function e(){-1===u.css("background-image").indexOf(encodeURI(c.attr("src")))&&u.css({"background-image":'url("'+encodeURI(c.attr("src"))+'")'}),u.css({"background-size":g.fill?"cover":"contain","background-position":(g.horizontalAlign+" "+g.verticalAlign).toLowerCase(),"background-repeat":"no-repeat"}),i("a:first",u).css({display:"block",width:"100%",height:"100%"}),i("img",u).css({display:"none"}),g.onItemFinish&&g.onItemFinish(t,u,c),u.addClass("imgLiquid_bgSize"),u.addClass("imgLiquid_ready"),l()}function d(){function e(){c.data("imgLiquid_error")||c.data("imgLiquid_loaded")||c.data("imgLiquid_oldProcessed")||(u.is(":visible")&&c[0].complete&&c[0].width>0&&c[0].height>0?(c.data("imgLiquid_loaded",!0),setTimeout(r,t*g.delay)):setTimeout(e,g.timecheckvisibility))}if(c.data("oldSrc")&&c.data("oldSrc")!==c.attr("src")){var a=c.clone().removeAttr("style");return a.data("imgLiquid_settings",c.data("imgLiquid_settings")),c.parent().prepend(a),c.remove(),c=a,c[0].width=0,setTimeout(d,10),void 0}return c.data("imgLiquid_oldProcessed")?(r(),void 0):(c.data("imgLiquid_oldProcessed",!1),c.data("oldSrc",c.attr("src")),i("img:not(:first)",u).css("display","none"),u.css({overflow:"hidden"}),c.fadeTo(0,0).removeAttr("width").removeAttr("height").css({visibility:"visible","max-width":"none","max-height":"none",width:"auto",height:"auto",display:"block"}),c.on("error",n),c[0].onerror=n,e(),o(),void 0)}function o(){(g.responsive||c.data("imgLiquid_oldProcessed"))&&c.data("imgLiquid_settings")&&(g=c.data("imgLiquid_settings"),u.actualSize=u.get(0).offsetWidth+u.get(0).offsetHeight/1e4,u.sizeOld&&u.actualSize!==u.sizeOld&&r(),u.sizeOld=u.actualSize,setTimeout(o,g.responsiveCheckTime))}function n(){c.data("imgLiquid_error",!0),u.addClass("imgLiquid_error"),g.onItemError&&g.onItemError(t,u,c),l()}function s(){var i={};if(a.settings.useDataHtmlAttr){var t=u.attr("data-imgLiquid-fill"),e=u.attr("data-imgLiquid-horizontalAlign"),d=u.attr("data-imgLiquid-verticalAlign");("true"===t||"false"===t)&&(i.fill=Boolean("true"===t)),void 0===e||"left"!==e&&"center"!==e&&"right"!==e&&-1===e.indexOf("%")||(i.horizontalAlign=e),void 0===d||"top"!==d&&"bottom"!==d&&"center"!==d&&-1===d.indexOf("%")||(i.verticalAlign=d)}return imgLiquid.isIE&&a.settings.ieFadeInDisabled&&(i.fadeInTime=0),i}function r(){var i,e,a,d,o,n,s,r,m=0,h=0,f=u.width(),v=u.height();void 0===c.data("owidth")&&c.data("owidth",c[0].width),void 0===c.data("oheight")&&c.data("oheight",c[0].height),g.fill===f/v>=c.data("owidth")/c.data("oheight")?(i="100%",e="auto",a=Math.floor(f),d=Math.floor(f*(c.data("oheight")/c.data("owidth")))):(i="auto",e="100%",a=Math.floor(v*(c.data("owidth")/c.data("oheight"))),d=Math.floor(v)),o=g.horizontalAlign.toLowerCase(),s=f-a,"left"===o&&(h=0),"center"===o&&(h=.5*s),"right"===o&&(h=s),-1!==o.indexOf("%")&&(o=parseInt(o.replace("%",""),10),o>0&&(h=.01*s*o)),n=g.verticalAlign.toLowerCase(),r=v-d,"left"===n&&(m=0),"center"===n&&(m=.5*r),"bottom"===n&&(m=r),-1!==n.indexOf("%")&&(n=parseInt(n.replace("%",""),10),n>0&&(m=.01*r*n)),g.hardPixels&&(i=a,e=d),c.css({width:i,height:e,"margin-left":Math.floor(h),"margin-top":Math.floor(m)}),c.data("imgLiquid_oldProcessed")||(c.fadeTo(g.fadeInTime,1),c.data("imgLiquid_oldProcessed",!0),g.removeBoxBackground&&u.css("background-image","none"),u.addClass("imgLiquid_nobgSize"),u.addClass("imgLiquid_ready")),g.onItemFinish&&g.onItemFinish(t,u,c),l()}function l(){t===a.length-1&&a.settings.onFinish&&a.settings.onFinish()}var g=a.settings,u=i(this),c=i("img:first",u);return c.length?(c.data("imgLiquid_settings")?(u.removeClass("imgLiquid_error").removeClass("imgLiquid_ready"),g=i.extend({},c.data("imgLiquid_settings"),a.options)):g=i.extend({},a.settings,s()),c.data("imgLiquid_settings",g),g.onItemStart&&g.onItemStart(t,u,c),imgLiquid.bgs_Available&&g.useBackgroundSize?e():d(),void 0):(n(),void 0)})}})}(jQuery),!function(){var i=imgLiquid.injectCss,t=document.getElementsByTagName("head")[0],e=document.createElement("style");e.type="text/css",e.styleSheet?e.styleSheet.cssText=i:e.appendChild(document.createTextNode(i)),t.appendChild(e)}();
/************************************
MINIMALECT 0.8b
A minimalistic select replacement
http://git.io/Xedg9w
************************************/
(function(e,t,n,r){function o(t,n){this.element=e(t);this.options=e.extend({},s,n);this._defaults=s;this._name=i;this.init()}var i="minimalect",s={theme:"",placeholder:"Select a choice",empty:"No results match your keyword.",class_container:"minict_wrapper",class_group:"minict_group",class_empty:"minict_empty",class_active:"active",class_selected:"selected",class_hidden:"hidden",class_highlighted:"highlighted",class_first:"minict_first",class_last:"minict_last",beforeinit:function(){},afterinit:function(){},onchange:function(){},onopen:function(){},onclose:function(){},onfilter:function(){}};o.prototype={init:function(){this.options.beforeinit();var t=this;this.wrapper=e('<div class="'+this.options.class_container+'"></div>');this.element.hide().after(this.wrapper);if(this.options.theme)this.wrapper.addClass(this.options.theme);this.wrapper.append('<input type="text" value="'+(this.element.find("option[selected]").html()||"")+'" placeholder="'+(this.element.find("option[selected]").html()||this.options.placeholder)+'" />');this.wrapper.append("<ul>"+t.parseSelect(t.element,t.options)+'<li class="'+t.options.class_empty+'">'+t.options.empty+"</li></ul>");if(this.element.find("option[selected]").length>0)this.wrapper.find('li[data-value="'+this.element.find("option[selected]").val()+'"]').addClass(t.options.class_selected);t.element.on("change",function(){var e=t.wrapper.find("li."+t.options.class_selected),n=t.parseSelect(t.element,t.options);if(t.element.val()!=e.attr("data-value")){t.hideChoices(t.wrapper,t.options,function(){t.wrapper.children("ul").html(n+'<li class="'+t.options.class_empty+'">'+t.options.empty+"</li>");t.selectChoice(t.wrapper.find('li[data-value="'+t.element.val()+'"]'),t.wrapper,t.element,t.options)})}});e(n).on("click",function(){t.hideChoices(t.wrapper,t.options)});this.wrapper.on("click",function(e){e.stopPropagation();t.toggleChoices(t.wrapper,t.options)});this.wrapper.on("click","li:not(."+t.options.class_group+", ."+t.options.class_empty+")",function(){t.selectChoice(e(this),t.wrapper,t.element,t.options)});this.wrapper.on("click","li."+t.options.class_group+", li."+t.options.class_empty,function(e){e.stopPropagation();t.wrapper.children("input").focus()});this.wrapper.find("input").on("focus click",function(e){e.stopPropagation();t.showChoices(t.wrapper,t.options)}).on("keyup",function(e){switch(e.keyCode){case 38:t.navigateChoices("up",t.wrapper,t.options);return false;break;case 40:t.navigateChoices("down",t.wrapper,t.options);return false;break;case 13:if(t.wrapper.find("li."+t.options.class_highlighted).length!=0)t.selectChoice(t.wrapper.find("li."+t.options.class_highlighted),t.wrapper,t.element,t.options);else t.selectChoice(t.wrapper.find("li:not(."+t.options.class_group+", ."+t.options.class_empty+")").first(),t.wrapper,t.element,t.options);t.hideChoices(t.wrapper,t.options);return false;break}t.filterChoices(t.wrapper,t.options)});this.options.afterinit()},navigateChoices:function(e,t,n){ignored="."+n.class_hidden+", ."+n.class_empty+", ."+n.class_group;if(t.find("li."+n.class_highlighted).length==0){if(e=="up"){t.find("li:not("+ignored+")").last().addClass(n.class_highlighted)}else if(e=="down"){t.find("li:not("+ignored+")").first().addClass(n.class_highlighted)}return false}else{cur=t.find("li."+n.class_highlighted);cur.removeClass(n.class_highlighted);if(e=="up"){if(t.find("li:not("+ignored+")").first()[0]!=cur[0]){cur.prevAll("li").not(ignored).first().addClass(n.class_highlighted);var r=t.children("ul"),i=t.find("li."+n.class_highlighted).offset().top-r.offset().top+r.scrollTop();if(r.scrollTop()>i)r.scrollTop(i)}else{t.find("li:not("+ignored+")").last().addClass(n.class_highlighted);t.children("ul").scrollTop(t.children("ul").height())}}else if(e=="down"){if(t.find("li:not("+ignored+")").last()[0]!=cur[0]){cur.nextAll("li").not(ignored).first().addClass(n.class_highlighted);var r=t.children("ul"),s=r.height(),o=t.find("li."+n.class_highlighted).offset().top-r.offset().top+t.find("li."+n.class_highlighted).outerHeight();if(s<o)r.scrollTop(r.scrollTop()+o-s)}else{t.find("li:not("+ignored+")").first().addClass(n.class_highlighted);t.children("ul").scrollTop(0)}}}},parseSelect:function(t,n){var r="",i=this;if(t.find("optgroup").length==0){r=this.parseElements(t.html())}else{t.find("optgroup").each(function(){r+='<li class="'+n.class_group+'">'+e(this).attr("label")+"</li>";r+=i.parseElements(e(this).html())})}return r},parseElements:function(t){var n="";e(e.trim(t)).filter("option").each(function(){n+='<li data-value="'+e(this).val()+'">'+e(this).text()+"</li>"});return n},toggleChoices:function(e,t){!e.hasClass(t.class_active)?this.showChoices(e,t):this.hideChoices(e,t)},showChoices:function(t,n,r){if(!t.hasClass(n.class_active)){this.updateFirstLast(false,t,n);var i=this;e("."+n.class_container).each(function(){if(e(this)[0]!=t[0])i.hideChoices(e(this),n)});if(typeof r=="function")r.call();t.addClass(n.class_active).children("ul").fadeIn(150);t.children("input").val("").focus();this.options.onopen()}else{if(typeof r=="function")r.call()}},hideChoices:function(e,t,n){if(e.hasClass(t.class_active)){e.removeClass(t.class_active).children("ul").fadeOut(100,function(){e.find("li").removeClass(t.class_hidden);e.find("."+t.class_empty).hide();e.find("li."+t.class_highlighted).removeClass(t.class_highlighted);if(typeof n=="function")n.call()});e.children("input").blur();if(e.children("input").attr("placeholder")!=t.placeholder){e.children("input").val(e.children("input").attr("placeholder"))}else if(e.find("li."+t.class_selected).length==0){e.children("input").val("")}this.options.onclose()}else{if(typeof n=="function")n.call()}},filterChoices:function(t,n){var r=t.children("input").val();t.find("li."+n.class_highlighted).removeClass(n.class_highlighted);t.find("li:not("+n.class_group+")").each(function(){if(e(this).text().search(new RegExp(r,"i"))<0)e(this).addClass(n.class_hidden);else e(this).removeClass(n.class_hidden)});t.find("li."+n.class_group).removeClass(n.class_hidden).each(function(){nextlis=e(this).nextAll("li").not("."+n.class_hidden+", ."+n.class_empty);if(nextlis.first().hasClass(n.class_group)||nextlis.length==0)e(this).addClass(n.class_hidden)});t.find("."+n.class_empty).hide();if(t.find("li").not("."+n.class_hidden+", ."+n.class_empty).length==0){t.find("."+n.class_empty).show();this.options.onfilter(false)}else{this.options.onfilter(true)}this.updateFirstLast(true,t,n)},selectChoice:function(e,t,n,r){t.find("li").removeClass(r.class_selected);e.addClass(r.class_selected);t.children("input").val(e.text()).attr("placeholder",e.text());n.find("option[selected]").removeAttr("selected");n.find('option[value="'+e.attr("data-value")+'"]').attr("selected","selected");this.options.onchange(e.attr("data-value"),e.text())},updateFirstLast:function(e,t,n){t.find("."+n.class_first+", ."+n.class_last).removeClass(n.class_first+" "+n.class_last);if(e){t.find("li:visible").first().addClass(n.class_first);t.find("li:visible").last().addClass(n.class_last)}else{t.find("li").first().addClass(n.class_first);t.find("li").not("."+n.class_empty).last().addClass(n.class_last)}}};e.fn[i]=function(t){return this.each(function(){if(!e.data(this,"plugin_"+i)){e.data(this,"plugin_"+i,new o(this,t))}})}})(jQuery,window,document)
/*!
 * jQuery UI Tabs 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/tabs/
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],a):a(jQuery)}(function(a){return a.widget("ui.tabs",{version:"1.11.4",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var a=/#.*$/;return function(b){var c,d;b=b.cloneNode(!1),c=b.href.replace(a,""),d=location.href.replace(a,"");try{c=decodeURIComponent(c)}catch(e){}try{d=decodeURIComponent(d)}catch(e){}return b.hash.length>1&&c===d}}(),_create:function(){var b=this,c=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",c.collapsible),this._processTabs(),c.active=this._initialActive(),a.isArray(c.disabled)&&(c.disabled=a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"),function(a){return b.tabs.index(a)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(c.active):a(),this._refresh(),this.active.length&&this.load(c.active)},_initialActive:function(){var b=this.options.active,c=this.options.collapsible,d=location.hash.substring(1);return null===b&&(d&&this.tabs.each(function(c,e){return a(e).attr("aria-controls")===d?(b=c,!1):void 0}),null===b&&(b=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===b||-1===b)&&(b=this.tabs.length?0:!1)),b!==!1&&(b=this.tabs.index(this.tabs.eq(b)),-1===b&&(b=c?!1:0)),!c&&b===!1&&this.anchors.length&&(b=0),b},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):a()}},_tabKeydown:function(b){var c=a(this.document[0].activeElement).closest("li"),d=this.tabs.index(c),e=!0;if(!this._handlePageNav(b)){switch(b.keyCode){case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:d++;break;case a.ui.keyCode.UP:case a.ui.keyCode.LEFT:e=!1,d--;break;case a.ui.keyCode.END:d=this.anchors.length-1;break;case a.ui.keyCode.HOME:d=0;break;case a.ui.keyCode.SPACE:return b.preventDefault(),clearTimeout(this.activating),void this._activate(d);case a.ui.keyCode.ENTER:return b.preventDefault(),clearTimeout(this.activating),void this._activate(d===this.options.active?!1:d);default:return}b.preventDefault(),clearTimeout(this.activating),d=this._focusNextTab(d,e),b.ctrlKey||b.metaKey||(c.attr("aria-selected","false"),this.tabs.eq(d).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",d)},this.delay))}},_panelKeydown:function(b){this._handlePageNav(b)||b.ctrlKey&&b.keyCode===a.ui.keyCode.UP&&(b.preventDefault(),this.active.focus())},_handlePageNav:function(b){return b.altKey&&b.keyCode===a.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):b.altKey&&b.keyCode===a.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(b,c){function d(){return b>e&&(b=0),0>b&&(b=e),b}for(var e=this.tabs.length-1;-1!==a.inArray(d(),this.options.disabled);)b=c?b+1:b-1;return b},_focusNextTab:function(a,b){return a=this._findNextTab(a,b),this.tabs.eq(a).focus(),a},_setOption:function(a,b){return"active"===a?void this._activate(b):"disabled"===a?void this._setupDisabled(b):(this._super(a,b),"collapsible"===a&&(this.element.toggleClass("ui-tabs-collapsible",b),b||this.options.active!==!1||this._activate(0)),"event"===a&&this._setupEvents(b),void("heightStyle"===a&&this._setupHeightStyle(b)))},_sanitizeSelector:function(a){return a?a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var b=this.options,c=this.tablist.children(":has(a[href])");b.disabled=a.map(c.filter(".ui-state-disabled"),function(a){return c.index(a)}),this._processTabs(),b.active!==!1&&this.anchors.length?this.active.length&&!a.contains(this.tablist[0],this.active[0])?this.tabs.length===b.disabled.length?(b.active=!1,this.active=a()):this._activate(this._findNextTab(Math.max(0,b.active-1),!1)):b.active=this.tabs.index(this.active):(b.active=!1,this.active=a()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var b=this,c=this.tabs,d=this.anchors,e=this.panels;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist").delegate("> li","mousedown"+this.eventNamespace,function(b){a(this).is(".ui-state-disabled")&&b.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){a(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return a("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=a(),this.anchors.each(function(c,d){var e,f,g,h=a(d).uniqueId().attr("id"),i=a(d).closest("li"),j=i.attr("aria-controls");b._isLocal(d)?(e=d.hash,g=e.substring(1),f=b.element.find(b._sanitizeSelector(e))):(g=i.attr("aria-controls")||a({}).uniqueId()[0].id,e="#"+g,f=b.element.find(e),f.length||(f=b._createPanel(g),f.insertAfter(b.panels[c-1]||b.tablist)),f.attr("aria-live","polite")),f.length&&(b.panels=b.panels.add(f)),j&&i.data("ui-tabs-aria-controls",j),i.attr({"aria-controls":g,"aria-labelledby":h}),f.attr("aria-labelledby",h)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel"),c&&(this._off(c.not(this.tabs)),this._off(d.not(this.anchors)),this._off(e.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol,ul").eq(0)},_createPanel:function(b){return a("<div>").attr("id",b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(b){a.isArray(b)&&(b.length?b.length===this.anchors.length&&(b=!0):b=!1);for(var c,d=0;c=this.tabs[d];d++)b===!0||-1!==a.inArray(d,b)?a(c).addClass("ui-state-disabled").attr("aria-disabled","true"):a(c).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=b},_setupEvents:function(b){var c={};b&&a.each(b.split(" "),function(a,b){c[b]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(a){a.preventDefault()}}),this._on(this.anchors,c),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(b){var c,d=this.element.parent();"fill"===b?(c=d.height(),c-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var b=a(this),d=b.css("position");"absolute"!==d&&"fixed"!==d&&(c-=b.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){c-=a(this).outerHeight(!0)}),this.panels.each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")):"auto"===b&&(c=0,this.panels.each(function(){c=Math.max(c,a(this).height("").height())}).height(c))},_eventHandler:function(b){var c=this.options,d=this.active,e=a(b.currentTarget),f=e.closest("li"),g=f[0]===d[0],h=g&&c.collapsible,i=h?a():this._getPanelForTab(f),j=d.length?this._getPanelForTab(d):a(),k={oldTab:d,oldPanel:j,newTab:h?a():f,newPanel:i};b.preventDefault(),f.hasClass("ui-state-disabled")||f.hasClass("ui-tabs-loading")||this.running||g&&!c.collapsible||this._trigger("beforeActivate",b,k)===!1||(c.active=h?!1:this.tabs.index(f),this.active=g?a():f,this.xhr&&this.xhr.abort(),j.length||i.length||a.error("jQuery UI Tabs: Mismatching fragment identifier."),i.length&&this.load(this.tabs.index(f),b),this._toggle(b,k))},_toggle:function(b,c){function d(){f.running=!1,f._trigger("activate",b,c)}function e(){c.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),g.length&&f.options.show?f._show(g,f.options.show,d):(g.show(),d())}var f=this,g=c.newPanel,h=c.oldPanel;this.running=!0,h.length&&this.options.hide?this._hide(h,this.options.hide,function(){c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),e()}):(c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),h.hide(),e()),h.attr("aria-hidden","true"),c.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),g.length&&h.length?c.oldTab.attr("tabIndex",-1):g.length&&this.tabs.filter(function(){return 0===a(this).attr("tabIndex")}).attr("tabIndex",-1),g.attr("aria-hidden","false"),c.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(b){var c,d=this._findActive(b);d[0]!==this.active[0]&&(d.length||(d=this.active),c=d.find(".ui-tabs-anchor")[0],this._eventHandler({target:c,currentTarget:c,preventDefault:a.noop}))},_findActive:function(b){return b===!1?a():this.tabs.eq(b)},_getIndex:function(a){return"string"==typeof a&&(a=this.anchors.index(this.anchors.filter("[href$='"+a+"']"))),a},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tablist.unbind(this.eventNamespace),this.tabs.add(this.panels).each(function(){a.data(this,"ui-tabs-destroy")?a(this).remove():a(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var b=a(this),c=b.data("ui-tabs-aria-controls");c?b.attr("aria-controls",c).removeData("ui-tabs-aria-controls"):b.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(b){var c=this.options.disabled;c!==!1&&(void 0===b?c=!1:(b=this._getIndex(b),c=a.isArray(c)?a.map(c,function(a){return a!==b?a:null}):a.map(this.tabs,function(a,c){return c!==b?c:null})),this._setupDisabled(c))},disable:function(b){var c=this.options.disabled;if(c!==!0){if(void 0===b)c=!0;else{if(b=this._getIndex(b),-1!==a.inArray(b,c))return;c=a.isArray(c)?a.merge([b],c).sort():[b]}this._setupDisabled(c)}},load:function(b,c){b=this._getIndex(b);var d=this,e=this.tabs.eq(b),f=e.find(".ui-tabs-anchor"),g=this._getPanelForTab(e),h={tab:e,panel:g},i=function(a,b){"abort"===b&&d.panels.stop(!1,!0),e.removeClass("ui-tabs-loading"),g.removeAttr("aria-busy"),a===d.xhr&&delete d.xhr};this._isLocal(f[0])||(this.xhr=a.ajax(this._ajaxSettings(f,c,h)),this.xhr&&"canceled"!==this.xhr.statusText&&(e.addClass("ui-tabs-loading"),g.attr("aria-busy","true"),this.xhr.done(function(a,b,e){setTimeout(function(){g.html(a),d._trigger("load",c,h),i(e,b)},1)}).fail(function(a,b){setTimeout(function(){i(a,b)},1)})))},_ajaxSettings:function(b,c,d){var e=this;return{url:b.attr("href"),beforeSend:function(b,f){return e._trigger("beforeLoad",c,a.extend({jqXHR:b,ajaxSettings:f},d))}}},_getPanelForTab:function(b){var c=a(b).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+c))}})});
/*!
 * jQuery UI Effects 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){var b="ui-effects-",c=a;/*!

 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
return a.effects={effect:{}},function(a,b){function c(a,b,c){var d=l[b.type]||{};return null==a?c||!b.def?null:b.def:(a=d.floor?~~a:parseFloat(a),isNaN(a)?b.def:d.mod?(a+d.mod)%d.mod:0>a?0:d.max<a?d.max:a)}function d(b){var c=j(),d=c._rgba=[];return b=b.toLowerCase(),o(i,function(a,e){var f,g=e.re.exec(b),h=g&&e.parse(g),i=e.space||"rgba";return h?(f=c[i](h),c[k[i].cache]=f[k[i].cache],d=c._rgba=f._rgba,!1):void 0}),d.length?("0,0,0,0"===d.join()&&a.extend(d,f.transparent),c):f[b]}function e(a,b,c){return c=(c+1)%1,1>6*c?a+(b-a)*c*6:1>2*c?b:2>3*c?a+(b-a)*(2/3-c)*6:a}var f,g="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",h=/^([\-+])=\s*(\d+\.?\d*)/,i=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1],a[2],a[3],a[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(a){return[2.55*a[1],2.55*a[2],2.55*a[3],a[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(a){return[a[1],a[2]/100,a[3]/100,a[4]]}}],j=a.Color=function(b,c,d,e){return new a.Color.fn.parse(b,c,d,e)},k={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},l={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},m=j.support={},n=a("<p>")[0],o=a.each;n.style.cssText="background-color:rgba(1,1,1,.5)",m.rgba=n.style.backgroundColor.indexOf("rgba")>-1,o(k,function(a,b){b.cache="_"+a,b.props.alpha={idx:3,type:"percent",def:1}}),j.fn=a.extend(j.prototype,{parse:function(e,g,h,i){if(e===b)return this._rgba=[null,null,null,null],this;(e.jquery||e.nodeType)&&(e=a(e).css(g),g=b);var l=this,m=a.type(e),n=this._rgba=[];return g!==b&&(e=[e,g,h,i],m="array"),"string"===m?this.parse(d(e)||f._default):"array"===m?(o(k.rgba.props,function(a,b){n[b.idx]=c(e[b.idx],b)}),this):"object"===m?(e instanceof j?o(k,function(a,b){e[b.cache]&&(l[b.cache]=e[b.cache].slice())}):o(k,function(b,d){var f=d.cache;o(d.props,function(a,b){if(!l[f]&&d.to){if("alpha"===a||null==e[a])return;l[f]=d.to(l._rgba)}l[f][b.idx]=c(e[a],b,!0)}),l[f]&&a.inArray(null,l[f].slice(0,3))<0&&(l[f][3]=1,d.from&&(l._rgba=d.from(l[f])))}),this):void 0},is:function(a){var b=j(a),c=!0,d=this;return o(k,function(a,e){var f,g=b[e.cache];return g&&(f=d[e.cache]||e.to&&e.to(d._rgba)||[],o(e.props,function(a,b){return null!=g[b.idx]?c=g[b.idx]===f[b.idx]:void 0})),c}),c},_space:function(){var a=[],b=this;return o(k,function(c,d){b[d.cache]&&a.push(c)}),a.pop()},transition:function(a,b){var d=j(a),e=d._space(),f=k[e],g=0===this.alpha()?j("transparent"):this,h=g[f.cache]||f.to(g._rgba),i=h.slice();return d=d[f.cache],o(f.props,function(a,e){var f=e.idx,g=h[f],j=d[f],k=l[e.type]||{};null!==j&&(null===g?i[f]=j:(k.mod&&(j-g>k.mod/2?g+=k.mod:g-j>k.mod/2&&(g-=k.mod)),i[f]=c((j-g)*b+g,e)))}),this[e](i)},blend:function(b){if(1===this._rgba[3])return this;var c=this._rgba.slice(),d=c.pop(),e=j(b)._rgba;return j(a.map(c,function(a,b){return(1-d)*e[b]+d*a}))},toRgbaString:function(){var b="rgba(",c=a.map(this._rgba,function(a,b){return null==a?b>2?1:0:a});return 1===c[3]&&(c.pop(),b="rgb("),b+c.join()+")"},toHslaString:function(){var b="hsla(",c=a.map(this.hsla(),function(a,b){return null==a&&(a=b>2?1:0),b&&3>b&&(a=Math.round(100*a)+"%"),a});return 1===c[3]&&(c.pop(),b="hsl("),b+c.join()+")"},toHexString:function(b){var c=this._rgba.slice(),d=c.pop();return b&&c.push(~~(255*d)),"#"+a.map(c,function(a){return a=(a||0).toString(16),1===a.length?"0"+a:a}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),j.fn.parse.prototype=j.fn,k.hsla.to=function(a){if(null==a[0]||null==a[1]||null==a[2])return[null,null,null,a[3]];var b,c,d=a[0]/255,e=a[1]/255,f=a[2]/255,g=a[3],h=Math.max(d,e,f),i=Math.min(d,e,f),j=h-i,k=h+i,l=.5*k;return b=i===h?0:d===h?60*(e-f)/j+360:e===h?60*(f-d)/j+120:60*(d-e)/j+240,c=0===j?0:.5>=l?j/k:j/(2-k),[Math.round(b)%360,c,l,null==g?1:g]},k.hsla.from=function(a){if(null==a[0]||null==a[1]||null==a[2])return[null,null,null,a[3]];var b=a[0]/360,c=a[1],d=a[2],f=a[3],g=.5>=d?d*(1+c):d+c-d*c,h=2*d-g;return[Math.round(255*e(h,g,b+1/3)),Math.round(255*e(h,g,b)),Math.round(255*e(h,g,b-1/3)),f]},o(k,function(d,e){var f=e.props,g=e.cache,i=e.to,k=e.from;j.fn[d]=function(d){if(i&&!this[g]&&(this[g]=i(this._rgba)),d===b)return this[g].slice();var e,h=a.type(d),l="array"===h||"object"===h?d:arguments,m=this[g].slice();return o(f,function(a,b){var d=l["object"===h?a:b.idx];null==d&&(d=m[b.idx]),m[b.idx]=c(d,b)}),k?(e=j(k(m)),e[g]=m,e):j(m)},o(f,function(b,c){j.fn[b]||(j.fn[b]=function(e){var f,g=a.type(e),i="alpha"===b?this._hsla?"hsla":"rgba":d,j=this[i](),k=j[c.idx];return"undefined"===g?k:("function"===g&&(e=e.call(this,k),g=a.type(e)),null==e&&c.empty?this:("string"===g&&(f=h.exec(e),f&&(e=k+parseFloat(f[2])*("+"===f[1]?1:-1))),j[c.idx]=e,this[i](j)))})})}),j.hook=function(b){var c=b.split(" ");o(c,function(b,c){a.cssHooks[c]={set:function(b,e){var f,g,h="";if("transparent"!==e&&("string"!==a.type(e)||(f=d(e)))){if(e=j(f||e),!m.rgba&&1!==e._rgba[3]){for(g="backgroundColor"===c?b.parentNode:b;(""===h||"transparent"===h)&&g&&g.style;)try{h=a.css(g,"backgroundColor"),g=g.parentNode}catch(i){}e=e.blend(h&&"transparent"!==h?h:"_default")}e=e.toRgbaString()}try{b.style[c]=e}catch(i){}}},a.fx.step[c]=function(b){b.colorInit||(b.start=j(b.elem,c),b.end=j(b.end),b.colorInit=!0),a.cssHooks[c].set(b.elem,b.start.transition(b.end,b.pos))}})},j.hook(g),a.cssHooks.borderColor={expand:function(a){var b={};return o(["Top","Right","Bottom","Left"],function(c,d){b["border"+d+"Color"]=a}),b}},f=a.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(c),function(){function b(b){var c,d,e=b.ownerDocument.defaultView?b.ownerDocument.defaultView.getComputedStyle(b,null):b.currentStyle,f={};if(e&&e.length&&e[0]&&e[e[0]])for(d=e.length;d--;)c=e[d],"string"==typeof e[c]&&(f[a.camelCase(c)]=e[c]);else for(c in e)"string"==typeof e[c]&&(f[c]=e[c]);return f}function d(b,c){var d,e,g={};for(d in c)e=c[d],b[d]!==e&&(f[d]||(a.fx.step[d]||!isNaN(parseFloat(e)))&&(g[d]=e));return g}var e=["add","remove","toggle"],f={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(b,d){a.fx.step[d]=function(a){("none"!==a.end&&!a.setAttr||1===a.pos&&!a.setAttr)&&(c.style(a.elem,d,a.end),a.setAttr=!0)}}),a.fn.addBack||(a.fn.addBack=function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}),a.effects.animateClass=function(c,f,g,h){var i=a.speed(f,g,h);return this.queue(function(){var f,g=a(this),h=g.attr("class")||"",j=i.children?g.find("*").addBack():g;j=j.map(function(){var c=a(this);return{el:c,start:b(this)}}),f=function(){a.each(e,function(a,b){c[b]&&g[b+"Class"](c[b])})},f(),j=j.map(function(){return this.end=b(this.el[0]),this.diff=d(this.start,this.end),this}),g.attr("class",h),j=j.map(function(){var b=this,c=a.Deferred(),d=a.extend({},i,{queue:!1,complete:function(){c.resolve(b)}});return this.el.animate(this.diff,d),c.promise()}),a.when.apply(a,j.get()).done(function(){f(),a.each(arguments,function(){var b=this.el;a.each(this.diff,function(a){b.css(a,"")})}),i.complete.call(g[0])})})},a.fn.extend({addClass:function(b){return function(c,d,e,f){return d?a.effects.animateClass.call(this,{add:c},d,e,f):b.apply(this,arguments)}}(a.fn.addClass),removeClass:function(b){return function(c,d,e,f){return arguments.length>1?a.effects.animateClass.call(this,{remove:c},d,e,f):b.apply(this,arguments)}}(a.fn.removeClass),toggleClass:function(b){return function(c,d,e,f,g){return"boolean"==typeof d||void 0===d?e?a.effects.animateClass.call(this,d?{add:c}:{remove:c},e,f,g):b.apply(this,arguments):a.effects.animateClass.call(this,{toggle:c},d,e,f)}}(a.fn.toggleClass),switchClass:function(b,c,d,e,f){return a.effects.animateClass.call(this,{add:c,remove:b},d,e,f)}})}(),function(){function c(b,c,d,e){return a.isPlainObject(b)&&(c=b,b=b.effect),b={effect:b},null==c&&(c={}),a.isFunction(c)&&(e=c,d=null,c={}),("number"==typeof c||a.fx.speeds[c])&&(e=d,d=c,c={}),a.isFunction(d)&&(e=d,d=null),c&&a.extend(b,c),d=d||c.duration,b.duration=a.fx.off?0:"number"==typeof d?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default,b.complete=e||c.complete,b}function d(b){return!b||"number"==typeof b||a.fx.speeds[b]?!0:"string"!=typeof b||a.effects.effect[b]?a.isFunction(b)?!0:"object"!=typeof b||b.effect?!1:!0:!0}a.extend(a.effects,{version:"1.11.4",save:function(a,c){for(var d=0;d<c.length;d++)null!==c[d]&&a.data(b+c[d],a[0].style[c[d]])},restore:function(a,c){var d,e;for(e=0;e<c.length;e++)null!==c[e]&&(d=a.data(b+c[e]),void 0===d&&(d=""),a.css(c[e],d))},setMode:function(a,b){return"toggle"===b&&(b=a.is(":hidden")?"show":"hide"),b},getBaseline:function(a,b){var c,d;switch(a[0]){case"top":c=0;break;case"middle":c=.5;break;case"bottom":c=1;break;default:c=a[0]/b.height}switch(a[1]){case"left":d=0;break;case"center":d=.5;break;case"right":d=1;break;default:d=a[1]/b.width}return{x:d,y:c}},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(!0),height:b.outerHeight(!0),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e={width:b.width(),height:b.height()},f=document.activeElement;try{f.id}catch(g){f=document.body}return b.wrap(d),(b[0]===f||a.contains(b[0],f))&&a(f).focus(),d=b.parent(),"static"===b.css("position")?(d.css({position:"relative"}),b.css({position:"relative"})):(a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")}),a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d),isNaN(parseInt(c[d],10))&&(c[d]="auto")}),b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),b.css(e),d.css(c).show()},removeWrapper:function(b){var c=document.activeElement;return b.parent().is(".ui-effects-wrapper")&&(b.parent().replaceWith(b),(b[0]===c||a.contains(b[0],c))&&a(c).focus()),b},setTransition:function(b,c,d,e){return e=e||{},a.each(c,function(a,c){var f=b.cssUnit(c);f[0]>0&&(e[c]=f[0]*d+f[1])}),e}}),a.fn.extend({effect:function(){function b(b){function c(){a.isFunction(f)&&f.call(e[0]),a.isFunction(b)&&b()}var e=a(this),f=d.complete,h=d.mode;(e.is(":hidden")?"hide"===h:"show"===h)?(e[h](),c()):g.call(e[0],d,c)}var d=c.apply(this,arguments),e=d.mode,f=d.queue,g=a.effects.effect[d.effect];return a.fx.off||!g?e?this[e](d.duration,d.complete):this.each(function(){d.complete&&d.complete.call(this)}):f===!1?this.each(b):this.queue(f||"fx",b)},show:function(a){return function(b){if(d(b))return a.apply(this,arguments);var e=c.apply(this,arguments);return e.mode="show",this.effect.call(this,e)}}(a.fn.show),hide:function(a){return function(b){if(d(b))return a.apply(this,arguments);var e=c.apply(this,arguments);return e.mode="hide",this.effect.call(this,e)}}(a.fn.hide),toggle:function(a){return function(b){if(d(b)||"boolean"==typeof b)return a.apply(this,arguments);var e=c.apply(this,arguments);return e.mode="toggle",this.effect.call(this,e)}}(a.fn.toggle),cssUnit:function(b){var c=this.css(b),d=[];return a.each(["em","px","%","pt"],function(a,b){c.indexOf(b)>0&&(d=[parseFloat(c),b])}),d}})}(),function(){var b={};a.each(["Quad","Cubic","Quart","Quint","Expo"],function(a,c){b[c]=function(b){return Math.pow(b,a+2)}}),a.extend(b,{Sine:function(a){return 1-Math.cos(a*Math.PI/2)},Circ:function(a){return 1-Math.sqrt(1-a*a)},Elastic:function(a){return 0===a||1===a?a:-Math.pow(2,8*(a-1))*Math.sin((80*(a-1)-7.5)*Math.PI/15)},Back:function(a){return a*a*(3*a-2)},Bounce:function(a){for(var b,c=4;a<((b=Math.pow(2,--c))-1)/11;);return 1/Math.pow(4,3-c)-7.5625*Math.pow((3*b-2)/22-a,2)}}),a.each(b,function(b,c){a.easing["easeIn"+b]=c,a.easing["easeOut"+b]=function(a){return 1-c(1-a)},a.easing["easeInOut"+b]=function(a){return.5>a?c(2*a)/2:1-c(-2*a+2)/2}})}(),a.effects});
/*!
 * jQuery UI Effects Fade 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fade-effect/
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./effect"],a):a(jQuery)}(function(a){return a.effects.effect.fade=function(b,c){var d=a(this),e=a.effects.setMode(d,b.mode||"toggle");d.animate({opacity:e},{queue:!1,duration:b.duration,easing:b.easing,complete:c})}});
!function(a){"use strict";function b(b,c){this.isInit=!0,this.itemsArray=[],this.$element=a(b),this.$element.hide(),this.isSelect="SELECT"===b.tagName,this.multiple=this.isSelect&&b.hasAttribute("multiple"),this.objectItems=c&&c.itemValue,this.placeholderText=b.hasAttribute("placeholder")?this.$element.attr("placeholder"):"",this.inputSize=Math.max(1,this.placeholderText.length),this.$container=a('<div class="bootstrap-tagsinput"></div>'),this.$input=a('<input type="text" placeholder="'+this.placeholderText+'"/>').appendTo(this.$container),this.$element.before(this.$container),this.build(c),this.isInit=!1}function c(a,b){if("function"!=typeof a[b]){var c=a[b];a[b]=function(a){return a[c]}}}function d(a,b){if("function"!=typeof a[b]){var c=a[b];a[b]=function(){return c}}}function e(a){return a?i.text(a).html():""}function f(a){var b=0;if(document.selection){a.focus();var c=document.selection.createRange();c.moveStart("character",-a.value.length),b=c.text.length}else(a.selectionStart||"0"==a.selectionStart)&&(b=a.selectionStart);return b}function g(b,c){var d=!1;return a.each(c,function(a,c){if("number"==typeof c&&b.which===c)return d=!0,!1;if(b.which===c.which){var e=!c.hasOwnProperty("altKey")||b.altKey===c.altKey,f=!c.hasOwnProperty("shiftKey")||b.shiftKey===c.shiftKey,g=!c.hasOwnProperty("ctrlKey")||b.ctrlKey===c.ctrlKey;if(e&&f&&g)return d=!0,!1}}),d}var h={tagClass:function(a){return"label label-info"},itemValue:function(a){return a?a.toString():a},itemText:function(a){return this.itemValue(a)},itemTitle:function(a){return null},freeInput:!0,addOnBlur:!0,maxTags:void 0,maxChars:void 0,confirmKeys:[13,44],delimiter:",",delimiterRegex:null,cancelConfirmKeysOnEmpty:!1,onTagExists:function(a,b){b.hide().fadeIn()},trimValue:!1,allowDuplicates:!1};b.prototype={constructor:b,add:function(b,c,d){var f=this;if(!(f.options.maxTags&&f.itemsArray.length>=f.options.maxTags)&&(b===!1||b)){if("string"==typeof b&&f.options.trimValue&&(b=a.trim(b)),"object"==typeof b&&!f.objectItems)throw"Can't add objects when itemValue option is not set";if(!b.toString().match(/^\s*$/)){if(f.isSelect&&!f.multiple&&f.itemsArray.length>0&&f.remove(f.itemsArray[0]),"string"==typeof b&&"INPUT"===this.$element[0].tagName){var g=f.options.delimiterRegex?f.options.delimiterRegex:f.options.delimiter,h=b.split(g);if(h.length>1){for(var i=0;i<h.length;i++)this.add(h[i],!0);return void(c||f.pushVal())}}var j=f.options.itemValue(b),k=f.options.itemText(b),l=f.options.tagClass(b),m=f.options.itemTitle(b),n=a.grep(f.itemsArray,function(a){return f.options.itemValue(a)===j})[0];if(!n||f.options.allowDuplicates){if(!(f.items().toString().length+b.length+1>f.options.maxInputLength)){var o=a.Event("beforeItemAdd",{item:b,cancel:!1,options:d});if(f.$element.trigger(o),!o.cancel){f.itemsArray.push(b);var p=a('<span class="tag '+e(l)+(null!==m?'" title="'+m:"")+'">'+e(k)+'<span data-role="remove"></span></span>');p.data("item",b),f.findInputWrapper().before(p),p.after(" ");var q=a('option[value="'+encodeURIComponent(j)+'"]',f.$element).length||a('option[value="'+e(j)+'"]',f.$element).length;if(f.isSelect&&!q){var r=a("<option selected>"+e(k)+"</option>");r.data("item",b),r.attr("value",j),f.$element.append(r)}c||f.pushVal(),(f.options.maxTags===f.itemsArray.length||f.items().toString().length===f.options.maxInputLength)&&f.$container.addClass("bootstrap-tagsinput-max"),a(".typeahead, .twitter-typeahead",f.$container).length&&f.$input.typeahead("val",""),this.isInit?f.$element.trigger(a.Event("itemAddedOnInit",{item:b,options:d})):f.$element.trigger(a.Event("itemAdded",{item:b,options:d}))}}}else if(f.options.onTagExists){var s=a(".tag",f.$container).filter(function(){return a(this).data("item")===n});f.options.onTagExists(b,s)}}}},remove:function(b,c,d){var e=this;if(e.objectItems&&(b="object"==typeof b?a.grep(e.itemsArray,function(a){return e.options.itemValue(a)==e.options.itemValue(b)}):a.grep(e.itemsArray,function(a){return e.options.itemValue(a)==b}),b=b[b.length-1]),b){var f=a.Event("beforeItemRemove",{item:b,cancel:!1,options:d});if(e.$element.trigger(f),f.cancel)return;a(".tag",e.$container).filter(function(){return a(this).data("item")===b}).remove(),a("option",e.$element).filter(function(){return a(this).data("item")===b}).remove(),-1!==a.inArray(b,e.itemsArray)&&e.itemsArray.splice(a.inArray(b,e.itemsArray),1)}c||e.pushVal(),e.options.maxTags>e.itemsArray.length&&e.$container.removeClass("bootstrap-tagsinput-max"),e.$element.trigger(a.Event("itemRemoved",{item:b,options:d}))},removeAll:function(){var b=this;for(a(".tag",b.$container).remove(),a("option",b.$element).remove();b.itemsArray.length>0;)b.itemsArray.pop();b.pushVal()},refresh:function(){var b=this;a(".tag",b.$container).each(function(){var c=a(this),d=c.data("item"),f=b.options.itemValue(d),g=b.options.itemText(d),h=b.options.tagClass(d);if(c.attr("class",null),c.addClass("tag "+e(h)),c.contents().filter(function(){return 3==this.nodeType})[0].nodeValue=e(g),b.isSelect){var i=a("option",b.$element).filter(function(){return a(this).data("item")===d});i.attr("value",f)}})},items:function(){return this.itemsArray},pushVal:function(){var b=this,c=a.map(b.items(),function(a){return b.options.itemValue(a).toString()});b.$element.val(c,!0).trigger("change")},build:function(b){var e=this;if(e.options=a.extend({},h,b),e.objectItems&&(e.options.freeInput=!1),c(e.options,"itemValue"),c(e.options,"itemText"),d(e.options,"tagClass"),e.options.typeahead){var i=e.options.typeahead||{};d(i,"source"),e.$input.typeahead(a.extend({},i,{source:function(b,c){function d(a){for(var b=[],d=0;d<a.length;d++){var g=e.options.itemText(a[d]);f[g]=a[d],b.push(g)}c(b)}this.map={};var f=this.map,g=i.source(b);a.isFunction(g.success)?g.success(d):a.isFunction(g.then)?g.then(d):a.when(g).then(d)},updater:function(a){return e.add(this.map[a]),this.map[a]},matcher:function(a){return-1!==a.toLowerCase().indexOf(this.query.trim().toLowerCase())},sorter:function(a){return a.sort()},highlighter:function(a){var b=new RegExp("("+this.query+")","gi");return a.replace(b,"<strong>$1</strong>")}}))}if(e.options.typeaheadjs){var j=null,k={},l=e.options.typeaheadjs;a.isArray(l)?(j=l[0],k=l[1]):k=l,e.$input.typeahead(j,k).on("typeahead:selected",a.proxy(function(a,b){k.valueKey?e.add(b[k.valueKey]):e.add(b),e.$input.typeahead("val","")},e))}e.$container.on("click",a.proxy(function(a){e.$element.attr("disabled")||e.$input.removeAttr("disabled"),e.$input.focus()},e)),e.options.addOnBlur&&e.options.freeInput&&e.$input.on("focusout",a.proxy(function(b){0===a(".typeahead, .twitter-typeahead",e.$container).length&&(e.add(e.$input.val()),e.$input.val(""))},e)),e.$container.on("keydown","input",a.proxy(function(b){var c=a(b.target),d=e.findInputWrapper();if(e.$element.attr("disabled"))return void e.$input.attr("disabled","disabled");switch(b.which){case 8:if(0===f(c[0])){var g=d.prev();g.length&&e.remove(g.data("item"))}break;case 46:if(0===f(c[0])){var h=d.next();h.length&&e.remove(h.data("item"))}break;case 37:var i=d.prev();0===c.val().length&&i[0]&&(i.before(d),c.focus());break;case 39:var j=d.next();0===c.val().length&&j[0]&&(j.after(d),c.focus())}var k=c.val().length;Math.ceil(k/5);c.attr("size",Math.max(this.inputSize,c.val().length))},e)),e.$container.on("keypress","input",a.proxy(function(b){var c=a(b.target);if(e.$element.attr("disabled"))return void e.$input.attr("disabled","disabled");var d=c.val(),f=e.options.maxChars&&d.length>=e.options.maxChars;e.options.freeInput&&(g(b,e.options.confirmKeys)||f)&&(0!==d.length&&(e.add(f?d.substr(0,e.options.maxChars):d),c.val("")),e.options.cancelConfirmKeysOnEmpty===!1&&b.preventDefault());var h=c.val().length;Math.ceil(h/5);c.attr("size",Math.max(this.inputSize,c.val().length))},e)),e.$container.on("click","[data-role=remove]",a.proxy(function(b){e.$element.attr("disabled")||e.remove(a(b.target).closest(".tag").data("item"))},e)),e.options.itemValue===h.itemValue&&("INPUT"===e.$element[0].tagName?e.add(e.$element.val()):a("option",e.$element).each(function(){e.add(a(this).attr("value"),!0)}))},destroy:function(){var a=this;a.$container.off("keypress","input"),a.$container.off("click","[role=remove]"),a.$container.remove(),a.$element.removeData("tagsinput"),a.$element.show()},focus:function(){this.$input.focus()},input:function(){return this.$input},findInputWrapper:function(){for(var b=this.$input[0],c=this.$container[0];b&&b.parentNode!==c;)b=b.parentNode;return a(b)}},a.fn.tagsinput=function(c,d,e){var f=[];return this.each(function(){var g=a(this).data("tagsinput");if(g)if(c||d){if(void 0!==g[c]){if(3===g[c].length&&void 0!==e)var h=g[c](d,null,e);else var h=g[c](d);void 0!==h&&f.push(h)}}else f.push(g);else g=new b(this,c),a(this).data("tagsinput",g),f.push(g),"SELECT"===this.tagName&&a("option",a(this)).attr("selected","selected"),a(this).val(a(this).val())}),"string"==typeof c?f.length>1?f:f[0]:f},a.fn.tagsinput.Constructor=b;var i=a("<div />");a(function(){a("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput()})}(window.jQuery);
/* =========================================================
 * bootstrap-datepicker.js
 * Repo: https://github.com/eternicode/bootstrap-datepicker/
 * Demo: http://eternicode.github.io/bootstrap-datepicker/
 * Docs: http://bootstrap-datepicker.readthedocs.org/
 * Forked from http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function($, undefined){

	var $window = $(window);

	function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}
	function UTCToday(){
		var today = new Date();
		return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
	}
	function alias(method){
		return function(){
			return this[method].apply(this, arguments);
		};
	}

	var DateArray = (function(){
		var extras = {
			get: function(i){
				return this.slice(i)[0];
			},
			contains: function(d){
				// Array.indexOf is not cross-browser;
				// $.inArray doesn't work with Dates
				var val = d && d.valueOf();
				for (var i=0, l=this.length; i < l; i++)
					if (this[i].valueOf() === val)
						return i;
				return -1;
			},
			remove: function(i){
				this.splice(i,1);
			},
			replace: function(new_array){
				if (!new_array)
					return;
				if (!$.isArray(new_array))
					new_array = [new_array];
				this.clear();
				this.push.apply(this, new_array);
			},
			clear: function(){
				this.splice(0);
			},
			copy: function(){
				var a = new DateArray();
				a.replace(this);
				return a;
			}
		};

		return function(){
			var a = [];
			a.push.apply(a, arguments);
			$.extend(a, extras);
			return a;
		};
	})();


	// Picker object

	var Datepicker = function(element, options){
		this.dates = new DateArray();
		this.viewDate = UTCToday();
		this.focusDate = null;

		this._process_options(options);

		this.element = $(element);
		this.isInline = false;
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
		this.hasInput = this.component && this.element.find('input').length;
		if (this.component && this.component.length === 0)
			this.component = false;

		this.picker = $(DPGlobal.template);
		this._buildEvents();
		this._attachEvents();

		if (this.isInline){
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		}
		else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}

		if (this.o.rtl){
			this.picker.addClass('datepicker-rtl');
		}

		this.viewMode = this.o.startView;

		if (this.o.calendarWeeks)
			this.picker.find('tfoot th.today')
						.attr('colspan', function(i, val){
							return parseInt(val) + 1;
						});

		this._allow_update = false;

		this.setStartDate(this._o.startDate);
		this.setEndDate(this._o.endDate);
		this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

		this.fillDow();
		this.fillMonths();

		this._allow_update = true;

		this.update();
		this.showMode();

		if (this.isInline){
			this.show();
		}
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		_process_options: function(opts){
			// Store raw options for reference
			this._o = $.extend({}, this._o, opts);
			// Processed options
			var o = this.o = $.extend({}, this._o);

			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			var lang = o.language;
			if (!dates[lang]){
				lang = lang.split('-')[0];
				if (!dates[lang])
					lang = defaults.language;
			}
			o.language = lang;

			switch (o.startView){
				case 2:
				case 'decade':
					o.startView = 2;
					break;
				case 1:
				case 'year':
					o.startView = 1;
					break;
				default:
					o.startView = 0;
			}

			switch (o.minViewMode){
				case 1:
				case 'months':
					o.minViewMode = 1;
					break;
				case 2:
				case 'years':
					o.minViewMode = 2;
					break;
				default:
					o.minViewMode = 0;
			}

			o.startView = Math.max(o.startView, o.minViewMode);

			// true, false, or Number > 0
			if (o.multidate !== true){
				o.multidate = Number(o.multidate) || false;
				if (o.multidate !== false)
					o.multidate = Math.max(0, o.multidate);
				else
					o.multidate = 1;
			}
			o.multidateSeparator = String(o.multidateSeparator);

			o.weekStart %= 7;
			o.weekEnd = ((o.weekStart + 6) % 7);

			var format = DPGlobal.parseFormat(o.format);
			if (o.startDate !== -Infinity){
				if (!!o.startDate){
					if (o.startDate instanceof Date)
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));
					else
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
				}
				else {
					o.startDate = -Infinity;
				}
			}
			if (o.endDate !== Infinity){
				if (!!o.endDate){
					if (o.endDate instanceof Date)
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));
					else
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
				}
				else {
					o.endDate = Infinity;
				}
			}

			o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
			if (!$.isArray(o.daysOfWeekDisabled))
				o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
			o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){
				return parseInt(d, 10);
			});

			var plc = String(o.orientation).toLowerCase().split(/\s+/g),
				_plc = o.orientation.toLowerCase();
			plc = $.grep(plc, function(word){
				return (/^auto|left|right|top|bottom$/).test(word);
			});
			o.orientation = {x: 'auto', y: 'auto'};
			if (!_plc || _plc === 'auto')
				; // no action
			else if (plc.length === 1){
				switch (plc[0]){
					case 'top':
					case 'bottom':
						o.orientation.y = plc[0];
						break;
					case 'left':
					case 'right':
						o.orientation.x = plc[0];
						break;
				}
			}
			else {
				_plc = $.grep(plc, function(word){
					return (/^left|right$/).test(word);
				});
				o.orientation.x = _plc[0] || 'auto';

				_plc = $.grep(plc, function(word){
					return (/^top|bottom$/).test(word);
				});
				o.orientation.y = _plc[0] || 'auto';
			}
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(evs){
			for (var i=0, el, ch, ev; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.on(ev, ch);
			}
		},
		_unapplyEvents: function(evs){
			for (var i=0, el, ev, ch; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.off(ev, ch);
			}
		},
		_buildEvents: function(){
			if (this.isInput){ // single input
				this._events = [
					[this.element, {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(function(e){
							if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
								this.update();
						}, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			else if (this.component && this.hasInput){ // component: input + button
				this._events = [
					// For components that are not readonly, allow keyboard nav
					[this.element.find('input'), {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(function(e){
							if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
								this.update();
						}, this),
						keydown: $.proxy(this.keydown, this)
					}],
					[this.component, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			else if (this.element.is('div')){  // inline datepicker
				this.isInline = true;
			}
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			this._events.push(
				// Component: listen for blur on element descendants
				[this.element, '*', {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}],
				// Input: listen for blur on element
				[this.element, {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}]
			);

			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					'mousedown touchstart': $.proxy(function(e){
						// Clicked outside the datepicker, hide it
						if (!(
							this.element.is(e.target) ||
							this.element.find(e.target).length ||
							this.picker.is(e.target) ||
							this.picker.find(e.target).length
						)){
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function(){
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function(){
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function(){
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
		},
		_detachSecondaryEvents: function(){
			this._unapplyEvents(this._secondaryEvents);
		},
		_trigger: function(event, altdate){
			var date = altdate || this.dates.get(-1),
				local_date = this._utc_to_local(date);

			this.element.trigger({
				type: event,
				date: local_date,
				dates: $.map(this.dates, this._utc_to_local),
				format: $.proxy(function(ix, format){
					if (arguments.length === 0){
						ix = this.dates.length - 1;
						format = this.o.format;
					}
					else if (typeof ix === 'string'){
						format = ix;
						ix = this.dates.length - 1;
					}
					format = format || this.o.format;
					var date = this.dates.get(ix);
					return DPGlobal.formatDate(date, format, this.o.language);
				}, this)
			});
		},

		show: function(){
			if (!this.isInline)
				this.picker.appendTo('body');
			this.picker.show();
			this.place();
			this._attachSecondaryEvents();
			this._trigger('show');
		},

		hide: function(){
			if (this.isInline)
				return;
			if (!this.picker.is(':visible'))
				return;
			this.focusDate = null;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.viewMode = this.o.startView;
			this.showMode();

			if (
				this.o.forceParse &&
				(
					this.isInput && this.element.val() ||
					this.hasInput && this.element.find('input').val()
				)
			)
				this.setValue();
			this._trigger('hide');
		},

		remove: function(){
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput){
				delete this.element.data().date;
			}
		},

		_utc_to_local: function(utc){
			return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
		},
		_local_to_utc: function(local){
			return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
		},
		_zero_time: function(local){
			return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
		},
		_zero_utc_time: function(utc){
			return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
		},

		getDates: function(){
			return $.map(this.dates, this._utc_to_local);
		},

		getUTCDates: function(){
			return $.map(this.dates, function(d){
				return new Date(d);
			});
		},

		getDate: function(){
			return this._utc_to_local(this.getUTCDate());
		},

		getUTCDate: function(){
			return new Date(this.dates.get(-1));
		},

		setDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, args);
			this._trigger('changeDate');
			this.setValue();
		},

		setUTCDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, $.map(args, this._utc_to_local));
			this._trigger('changeDate');
			this.setValue();
		},

		setDate: alias('setDates'),
		setUTCDate: alias('setUTCDates'),

		setValue: function(){
			var formatted = this.getFormattedDate();
			if (!this.isInput){
				if (this.component){
					this.element.find('input').val(formatted).change();
				}
			}
			else {
				this.element.val(formatted).change();
			}
		},

		getFormattedDate: function(format){
			if (format === undefined)
				format = this.o.format;

			var lang = this.o.language;
			return $.map(this.dates, function(d){
				return DPGlobal.formatDate(d, format, lang);
			}).join(this.o.multidateSeparator);
		},

		setStartDate: function(startDate){
			this._process_options({startDate: startDate});
			this.update();
			this.updateNavArrows();
		},

		setEndDate: function(endDate){
			this._process_options({endDate: endDate});
			this.update();
			this.updateNavArrows();
		},

		setDaysOfWeekDisabled: function(daysOfWeekDisabled){
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
			this.update();
			this.updateNavArrows();
		},

		place: function(){
			if (this.isInline)
				return;
			var calendarWidth = this.picker.outerWidth(),
				calendarHeight = this.picker.outerHeight(),
				visualPadding = 10,
				windowWidth = $window.width(),
				windowHeight = $window.height(),
				scrollTop = $window.scrollTop();

			var zIndex = parseInt(this.element.parents().filter(function(){
					return $(this).css('z-index') !== 'auto';
				}).first().css('z-index'))+10;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
			var left = offset.left,
				top = offset.top;

			this.picker.removeClass(
				'datepicker-orient-top datepicker-orient-bottom '+
				'datepicker-orient-right datepicker-orient-left'
			);

			if (this.o.orientation.x !== 'auto'){
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
				if (this.o.orientation.x === 'right')
					left -= calendarWidth - width;
			}
			// auto x orientation is best-placement: if it crosses a window
			// edge, fudge it sideways
			else {
				// Default to left
				this.picker.addClass('datepicker-orient-left');
				if (offset.left < 0)
					left -= offset.left - visualPadding;
				else if (offset.left + calendarWidth > windowWidth)
					left = windowWidth - calendarWidth - visualPadding;
			}

			// auto y orientation is best-situation: top or bottom, no fudging,
			// decision based on which shows more of the calendar
			var yorient = this.o.orientation.y,
				top_overflow, bottom_overflow;
			if (yorient === 'auto'){
				top_overflow = -scrollTop + offset.top - calendarHeight;
				bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
				if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
					yorient = 'top';
				else
					yorient = 'bottom';
			}
			this.picker.addClass('datepicker-orient-' + yorient);
			if (yorient === 'top')
				top += height;
			else
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));

			this.picker.css({
				top: top,
				left: left,
				zIndex: zIndex
			});
		},

		_allow_update: true,
		update: function(){
			if (!this._allow_update)
				return;

			var oldDates = this.dates.copy(),
				dates = [],
				fromArgs = false;
			if (arguments.length){
				$.each(arguments, $.proxy(function(i, date){
					if (date instanceof Date)
						date = this._local_to_utc(date);
					dates.push(date);
				}, this));
				fromArgs = true;
			}
			else {
				dates = this.isInput
						? this.element.val()
						: this.element.data('date') || this.element.find('input').val();
				if (dates && this.o.multidate)
					dates = dates.split(this.o.multidateSeparator);
				else
					dates = [dates];
				delete this.element.data().date;
			}

			dates = $.map(dates, $.proxy(function(date){
				return DPGlobal.parseDate(date, this.o.format, this.o.language);
			}, this));
			dates = $.grep(dates, $.proxy(function(date){
				return (
					date < this.o.startDate ||
					date > this.o.endDate ||
					!date
				);
			}, this), true);
			this.dates.replace(dates);

			if (this.dates.length)
				this.viewDate = new Date(this.dates.get(-1));
			else if (this.viewDate < this.o.startDate)
				this.viewDate = new Date(this.o.startDate);
			else if (this.viewDate > this.o.endDate)
				this.viewDate = new Date(this.o.endDate);

			if (fromArgs){
				// setting date by clicking
				this.setValue();
			}
			else if (dates.length){
				// setting date by typing
				if (String(oldDates) !== String(this.dates))
					this._trigger('changeDate');
			}
			if (!this.dates.length && oldDates.length)
				this._trigger('clearDate');

			this.fill();
		},

		fillDow: function(){
			var dowCnt = this.o.weekStart,
				html = '<tr>';
			if (this.o.calendarWeeks){
				var cell = '<th class="cw">&nbsp;</th>';
				html += cell;
				this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
			}
			while (dowCnt < this.o.weekStart + 7){
				html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},

		fillMonths: function(){
			var html = '',
			i = 0;
			while (i < 12){
				html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		setRange: function(range){
			if (!range || !range.length)
				delete this.range;
			else
				this.range = $.map(range, function(d){
					return d.valueOf();
				});
			this.fill();
		},

		getClassNames: function(date){
			var cls = [],
				year = this.viewDate.getUTCFullYear(),
				month = this.viewDate.getUTCMonth(),
				today = new Date();
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
				cls.push('old');
			}
			else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
				cls.push('new');
			}
			if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
				cls.push('focused');
			// Compare internal UTC date with local today, not UTC today
			if (this.o.todayHighlight &&
				date.getUTCFullYear() === today.getFullYear() &&
				date.getUTCMonth() === today.getMonth() &&
				date.getUTCDate() === today.getDate()){
				cls.push('today');
			}
			if (this.dates.contains(date) !== -1)
				cls.push('active');
			if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
				$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1){
				cls.push('disabled');
			}
			if (this.range){
				if (date > this.range[0] && date < this.range[this.range.length-1]){
					cls.push('range');
				}
				if ($.inArray(date.valueOf(), this.range) !== -1){
					cls.push('selected');
				}
			}
			return cls;
		},

		fill: function(){
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				todaytxt = dates[this.o.language].today || dates['en'].today || '',
				cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
				tooltip;
			this.picker.find('.datepicker-days thead th.datepicker-switch')
						.text(dates[this.o.language].months[month]+' '+year);
			this.picker.find('tfoot th.today')
						.text(todaytxt)
						.toggle(this.o.todayBtn !== false);
			this.picker.find('tfoot th.clear')
						.text(cleartxt)
						.toggle(this.o.clearBtn !== false);
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month-1, 28),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while (prevMonth.valueOf() < nextMonth){
				if (prevMonth.getUTCDay() === this.o.weekStart){
					html.push('<tr>');
					if (this.o.calendarWeeks){
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
							// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek =  (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">'+ calWeek +'</td>');

					}
				}
				clsName = this.getClassNames(prevMonth);
				clsName.push('day');

				if (this.o.beforeShowDay !== $.noop){
					var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;
				}

				clsName = $.unique(clsName);
				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
				if (prevMonth.getUTCDay() === this.o.weekEnd){
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

			var months = this.picker.find('.datepicker-months')
						.find('th:eq(1)')
							.text(year)
							.end()
						.find('span').removeClass('active');

			$.each(this.dates, function(i, d){
				if (d.getUTCFullYear() === year)
					months.eq(d.getUTCMonth()).addClass('active');
			});

			if (year < startYear || year > endYear){
				months.addClass('disabled');
			}
			if (year === startYear){
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year === endYear){
				months.slice(endMonth+1).addClass('disabled');
			}

			html = '';
			year = parseInt(year/10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
								.find('th:eq(1)')
									.text(year + '-' + (year + 9))
									.end()
								.find('td');
			year -= 1;
			var years = $.map(this.dates, function(d){
					return d.getUTCFullYear();
				}),
				classes;
			for (var i = -1; i < 11; i++){
				classes = ['year'];
				if (i === -1)
					classes.push('old');
				else if (i === 10)
					classes.push('new');
				if ($.inArray(year, years) !== -1)
					classes.push('active');
				if (year < startYear || year > endYear)
					classes.push('disabled');
				html += '<span class="' + classes.join(' ') + '">'+year+'</span>';
				year += 1;
			}
			yearCont.html(html);
		},

		updateNavArrows: function(){
			if (!this._allow_update)
				return;

			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth();
			switch (this.viewMode){
				case 0:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
				case 2:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		click: function(e){
			e.preventDefault();
			var target = $(e.target).closest('span, td, th'),
				year, month, day;
			if (target.length === 1){
				switch (target[0].nodeName.toLowerCase()){
					case 'th':
						switch (target[0].className){
							case 'datepicker-switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);
								switch (this.viewMode){
									case 0:
										this.viewDate = this.moveMonth(this.viewDate, dir);
										this._trigger('changeMonth', this.viewDate);
										break;
									case 1:
									case 2:
										this.viewDate = this.moveYear(this.viewDate, dir);
										if (this.viewMode === 1)
											this._trigger('changeYear', this.viewDate);
										break;
								}
								this.fill();
								break;
							case 'today':
								var date = new Date();
								date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

								this.showMode(-2);
								var which = this.o.todayBtn === 'linked' ? null : 'view';
								this._setDate(date, which);
								break;
							case 'clear':
								var element;
								if (this.isInput)
									element = this.element;
								else if (this.component)
									element = this.element.find('input');
								if (element)
									element.val("").change();
								this.update();
								this._trigger('changeDate');
								if (this.o.autoclose)
									this.hide();
								break;
						}
						break;
					case 'span':
						if (!target.is('.disabled')){
							this.viewDate.setUTCDate(1);
							if (target.is('.month')){
								day = 1;
								month = target.parent().find('span').index(target);
								year = this.viewDate.getUTCFullYear();
								this.viewDate.setUTCMonth(month);
								this._trigger('changeMonth', this.viewDate);
								if (this.o.minViewMode === 1){
									this._setDate(UTCDate(year, month, day));
								}
							}
							else {
								day = 1;
								month = 0;
								year = parseInt(target.text(), 10)||0;
								this.viewDate.setUTCFullYear(year);
								this._trigger('changeYear', this.viewDate);
								if (this.o.minViewMode === 2){
									this._setDate(UTCDate(year, month, day));
								}
							}
							this.showMode(-1);
							this.fill();
						}
						break;
					case 'td':
						if (target.is('.day') && !target.is('.disabled')){
							day = parseInt(target.text(), 10)||1;
							year = this.viewDate.getUTCFullYear();
							month = this.viewDate.getUTCMonth();
							if (target.is('.old')){
								if (month === 0){
									month = 11;
									year -= 1;
								}
								else {
									month -= 1;
								}
							}
							else if (target.is('.new')){
								if (month === 11){
									month = 0;
									year += 1;
								}
								else {
									month += 1;
								}
							}
							this._setDate(UTCDate(year, month, day));
						}
						break;
				}
			}
			if (this.picker.is(':visible') && this._focused_from){
				$(this._focused_from).focus();
			}
			delete this._focused_from;
		},

		_toggle_multidate: function(date){
			var ix = this.dates.contains(date);
			if (!date){
				this.dates.clear();
			}
			else if (ix !== -1){
				this.dates.remove(ix);
			}
			else {
				this.dates.push(date);
			}
			if (typeof this.o.multidate === 'number')
				while (this.dates.length > this.o.multidate)
					this.dates.remove(0);
		},

		_setDate: function(date, which){
			if (!which || which === 'date')
				this._toggle_multidate(date && new Date(date));
			if (!which || which  === 'view')
				this.viewDate = date && new Date(date);

			this.fill();
			this.setValue();
			this._trigger('changeDate');
			var element;
			if (this.isInput){
				element = this.element;
			}
			else if (this.component){
				element = this.element.find('input');
			}
			if (element){
				element.change();
			}
			if (this.o.autoclose && (!which || which === 'date')){
				this.hide();
			}
		},

		moveMonth: function(date, dir){
			if (!date)
				return undefined;
			if (!dir)
				return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag === 1){
				test = dir === -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){
						return new_date.getUTCMonth() === month;
					}
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){
						return new_date.getUTCMonth() !== new_month;
					};
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			}
			else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i < mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function(){
					return new_month !== new_date.getUTCMonth();
				};
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		},

		dateWithinRange: function(date){
			return date >= this.o.startDate && date <= this.o.endDate;
		},

		keydown: function(e){
			if (this.picker.is(':not(:visible)')){
				if (e.keyCode === 27) // allow escape to hide and re-show picker
					this.show();
				return;
			}
			var dateChanged = false,
				dir, newDate, newViewDate,
				focusDate = this.focusDate || this.viewDate;
			switch (e.keyCode){
				case 27: // escape
					if (this.focusDate){
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
					}
					else
						this.hide();
					e.preventDefault();
					break;
				case 37: // left
				case 39: // right
					if (!this.o.keyboardNavigation)
						break;
					dir = e.keyCode === 37 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveYear(focusDate, dir);
						this._trigger('changeYear', this.viewDate);
					}
					else if (e.shiftKey){
						newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveMonth(focusDate, dir);
						this._trigger('changeMonth', this.viewDate);
					}
					else {
						newDate = new Date(this.dates.get(-1) || UTCToday());
						newDate.setUTCDate(newDate.getUTCDate() + dir);
						newViewDate = new Date(focusDate);
						newViewDate.setUTCDate(focusDate.getUTCDate() + dir);
					}
					if (this.dateWithinRange(newDate)){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 38: // up
				case 40: // down
					if (!this.o.keyboardNavigation)
						break;
					dir = e.keyCode === 38 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveYear(focusDate, dir);
						this._trigger('changeYear', this.viewDate);
					}
					else if (e.shiftKey){
						newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveMonth(focusDate, dir);
						this._trigger('changeMonth', this.viewDate);
					}
					else {
						newDate = new Date(this.dates.get(-1) || UTCToday());
						newDate.setUTCDate(newDate.getUTCDate() + dir * 7);
						newViewDate = new Date(focusDate);
						newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);
					}
					if (this.dateWithinRange(newDate)){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 32: // spacebar
					// Spacebar is used in manually typing dates in some formats.
					// As such, its behavior should not be hijacked.
					break;
				case 13: // enter
					focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
					this._toggle_multidate(focusDate);
					dateChanged = true;
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.setValue();
					this.fill();
					if (this.picker.is(':visible')){
						e.preventDefault();
						if (this.o.autoclose)
							this.hide();
					}
					break;
				case 9: // tab
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.fill();
					this.hide();
					break;
			}
			if (dateChanged){
				if (this.dates.length)
					this._trigger('changeDate');
				else
					this._trigger('clearDate');
				var element;
				if (this.isInput){
					element = this.element;
				}
				else if (this.component){
					element = this.element.find('input');
				}
				if (element){
					element.change();
				}
			}
		},

		showMode: function(dir){
			if (dir){
				this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
			}
			this.picker
				.find('>div')
				.hide()
				.filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName)
					.css('display', 'block');
			this.updateNavArrows();
		}
	};

	var DateRangePicker = function(element, options){
		this.element = $(element);
		this.inputs = $.map(options.inputs, function(i){
			return i.jquery ? i[0] : i;
		});
		delete options.inputs;

		$(this.inputs)
			.datepicker(options)
			.bind('changeDate', $.proxy(this.dateUpdated, this));

		this.pickers = $.map(this.inputs, function(i){
			return $(i).data('datepicker');
		});
		this.updateDates();
	};
	DateRangePicker.prototype = {
		updateDates: function(){
			this.dates = $.map(this.pickers, function(i){
				return i.getUTCDate();
			});
			this.updateRanges();
		},
		updateRanges: function(){
			var range = $.map(this.dates, function(d){
				return d.valueOf();
			});
			$.each(this.pickers, function(i, p){
				p.setRange(range);
			});
		},
		dateUpdated: function(e){
			// `this.updating` is a workaround for preventing infinite recursion
			// between `changeDate` triggering and `setUTCDate` calling.  Until
			// there is a better mechanism.
			if (this.updating)
				return;
			this.updating = true;

			var dp = $(e.target).data('datepicker'),
				new_date = dp.getUTCDate(),
				i = $.inArray(e.target, this.inputs),
				l = this.inputs.length;
			if (i === -1)
				return;

			$.each(this.pickers, function(i, p){
				if (!p.getUTCDate())
					p.setUTCDate(new_date);
			});

			if (new_date < this.dates[i]){
				// Date being moved earlier/left
				while (i >= 0 && new_date < this.dates[i]){
					this.pickers[i--].setUTCDate(new_date);
				}
			}
			else if (new_date > this.dates[i]){
				// Date being moved later/right
				while (i < l && new_date > this.dates[i]){
					this.pickers[i++].setUTCDate(new_date);
				}
			}
			this.updateDates();

			delete this.updating;
		},
		remove: function(){
			$.map(this.pickers, function(p){ p.remove(); });
			delete this.element.data().datepicker;
		}
	};

	function opts_from_el(el, prefix){
		// Derive options from element data-attrs
		var data = $(el).data(),
			out = {}, inkey,
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
		prefix = new RegExp('^' + prefix.toLowerCase());
		function re_lower(_,a){
			return a.toLowerCase();
		}
		for (var key in data)
			if (prefix.test(key)){
				inkey = key.replace(replace, re_lower);
				out[inkey] = data[key];
			}
		return out;
	}

	function opts_from_locale(lang){
		// Derive options from locale plugins
		var out = {};
		// Check if "de-DE" style date is available, if not language should
		// fallback to 2 letter code eg "de"
		if (!dates[lang]){
			lang = lang.split('-')[0];
			if (!dates[lang])
				return;
		}
		var d = dates[lang];
		$.each(locale_opts, function(i,k){
			if (k in d)
				out[k] = d[k];
		});
		return out;
	}

	var old = $.fn.datepicker;
	$.fn.datepicker = function(option){
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return;
		this.each(function(){
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option === 'object' && option;
			if (!data){
				var elopts = opts_from_el(this, 'date'),
					// Preliminary otions
					xopts = $.extend({}, defaults, elopts, options),
					locopts = opts_from_locale(xopts.language),
					// Options priority: js args, data-attrs, locales, defaults
					opts = $.extend({}, defaults, locopts, elopts, options);
				if ($this.is('.input-daterange') || opts.inputs){
					var ropts = {
						inputs: opts.inputs || $this.find('input').toArray()
					};
					$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
				}
				else {
					$this.data('datepicker', (data = new Datepicker(this, opts)));
				}
			}
			if (typeof option === 'string' && typeof data[option] === 'function'){
				internal_return = data[option].apply(data, args);
				if (internal_return !== undefined)
					return false;
			}
		});
		if (internal_return !== undefined)
			return internal_return;
		else
			return this;
	};

	var defaults = $.fn.datepicker.defaults = {
		autoclose: false,
		beforeShowDay: $.noop,
		calendarWeeks: false,
		clearBtn: false,
		daysOfWeekDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'mm/dd/yyyy',
		keyboardNavigation: true,
		language: 'en',
		minViewMode: 0,
		multidate: false,
		multidateSeparator: ',',
		orientation: "auto",
		rtl: false,
		startDate: -Infinity,
		startView: 0,
		todayBtn: false,
		todayHighlight: false,
		weekStart: 0
	};
	var locale_opts = $.fn.datepicker.locale_opts = [
		'format',
		'rtl',
		'weekStart'
	];
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear"
		}
	};

	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
		}],
		isLeapYear: function(year){
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
		},
		getDaysInMonth: function(year, month){
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
		},
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			// IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate: function(date, format, language){
			if (!date)
				return undefined;
			if (date instanceof Date)
				return date;
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			var part_re = /([\-+]\d+)([dmwy])/,
				parts = date.match(/([\-+]\d+)([dmwy])/g),
				part, dir, i;
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
				date = new Date();
				for (i=0; i < parts.length; i++){
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					switch (part[2]){
						case 'd':
							date.setUTCDate(date.getUTCDate() + dir);
							break;
						case 'm':
							date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
							break;
						case 'w':
							date.setUTCDate(date.getUTCDate() + dir * 7);
							break;
						case 'y':
							date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
							break;
					}
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
			}
			parts = date && date.match(this.nonpunctuation) || [];
			date = new Date();
			var parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d,v){
						return d.setUTCFullYear(v);
					},
					yy: function(d,v){
						return d.setUTCFullYear(2000+v);
					},
					m: function(d,v){
						if (isNaN(d))
							return d;
						v -= 1;
						while (v < 0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() !== v)
							d.setUTCDate(d.getUTCDate()-1);
						return d;
					},
					d: function(d,v){
						return d.setUTCDate(v);
					}
				},
				val, filtered;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length !== fparts.length){
				fparts = $(fparts).filter(function(i,p){
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			function match_part(){
				var m = this.slice(0, parts[i].length),
					p = parts[i].slice(0, m.length);
				return m === p;
			}
			if (parts.length === fparts.length){
				var cnt;
				for (i=0, cnt = fparts.length; i < cnt; i++){
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)){
						switch (part){
							case 'MM':
								filtered = $(dates[language].months).filter(match_part);
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(match_part);
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				var _date, s;
				for (i=0; i < setters_order.length; i++){
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s])){
						_date = new Date(date);
						setters_map[s](_date, parsed[s]);
						if (!isNaN(_date))
							date = _date;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			if (!date)
				return '';
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			date = [];
			var seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i <= cnt; i++){
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
							'<tr>'+
								'<th class="prev">&laquo;</th>'+
								'<th colspan="5" class="datepicker-switch"></th>'+
								'<th class="next">&raquo;</th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot>'+
							'<tr>'+
								'<th colspan="7" class="today"></th>'+
							'</tr>'+
							'<tr>'+
								'<th colspan="7" class="clear"></th>'+
							'</tr>'+
						'</tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table class=" table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
						'</div>';

	$.fn.datepicker.DPGlobal = DPGlobal;


	/* DATEPICKER NO CONFLICT
	* =================== */

	$.fn.datepicker.noConflict = function(){
		$.fn.datepicker = old;
		return this;
	};


	/* DATEPICKER DATA-API
	* ================== */

	$(document).on(
		'focus.datepicker.data-api click.datepicker.data-api',
		'[data-provide="datepicker"]',
		function(e){
			var $this = $(this);
			if ($this.data('datepicker'))
				return;
			e.preventDefault();
			// component click requires us to explicitly show it
			$this.datepicker('show');
		}
	);
	$(function(){
		$('[data-provide="datepicker-inline"]').datepicker();
	});

}(window.jQuery));

!function(a){"function"==typeof define&&define.amd?define(["jquery","codemirror"],a):a(window.jQuery,window.CodeMirror)}(function(a,b){"function"!=typeof Array.prototype.reduce&&(Array.prototype.reduce=function(a,b){var c,d,e=this.length>>>0,f=!1;for(1<arguments.length&&(d=b,f=!0),c=0;e>c;++c)this.hasOwnProperty(c)&&(f?d=a(d,this[c],c,this):(d=this[c],f=!0));if(!f)throw new TypeError("Reduce of empty array with no initial value");return d});var c={bMac:navigator.appVersion.indexOf("Mac")>-1,bMSIE:navigator.userAgent.indexOf("MSIE")>-1||navigator.userAgent.indexOf("Trident")>-1,bFF:navigator.userAgent.indexOf("Firefox")>-1,jqueryVersion:parseFloat(a.fn.jquery),bCodeMirror:!!b},d=function(){var a=function(a){return function(b){return a===b}},b=function(a,b){return a===b},c=function(){return!0},d=function(){return!1},e=function(a){return function(){return!a.apply(a,arguments)}},f=function(a){return a};return{eq:a,eq2:b,ok:c,fail:d,not:e,self:f}}(),e=function(){var a=function(a){return a[0]},b=function(a){return a[a.length-1]},c=function(a){return a.slice(0,a.length-1)},e=function(a){return a.slice(1)},f=function(a,b){var c=a.indexOf(b);return-1===c?null:a[c+1]},g=function(a,b){var c=a.indexOf(b);return-1===c?null:a[c-1]},h=function(a,b){return b=b||d.self,a.reduce(function(a,c){return a+b(c)},0)},i=function(a){for(var b=[],c=-1,d=a.length;++c<d;)b[c]=a[c];return b},j=function(c,d){if(0===c.length)return[];var f=e(c);return f.reduce(function(a,c){var e=b(a);return d(b(e),c)?e[e.length]=c:a[a.length]=[c],a},[[a(c)]])},k=function(a){for(var b=[],c=0,d=a.length;d>c;c++)a[c]&&b.push(a[c]);return b};return{head:a,last:b,initial:c,tail:e,prev:g,next:f,sum:h,from:i,compact:k,clusterBy:j}}(),f=function(){var b=function(b){return b&&a(b).hasClass("note-editable")},g=function(b){return b&&a(b).hasClass("note-control-sizing")},h=function(a){var b=function(b){return function(){return a.find(b)}};return{editor:function(){return a},dropzone:b(".note-dropzone"),toolbar:b(".note-toolbar"),editable:b(".note-editable"),codable:b(".note-codable"),statusbar:b(".note-statusbar"),popover:b(".note-popover"),handle:b(".note-handle"),dialog:b(".note-dialog")}},i=function(a){return function(b){return b&&b.nodeName===a}},j=function(a){return a&&/^DIV|^P|^LI|^H[1-7]/.test(a.nodeName)},k=function(a){return a&&/^UL|^OL/.test(a.nodeName)},l=function(a){return a&&/^TD|^TH/.test(a.nodeName)},m=function(a,c){for(;a;){if(c(a))return a;if(b(a))break;a=a.parentNode}return null},n=function(a,b){b=b||d.fail;var c=[];return m(a,function(a){return c.push(a),b(a)}),c},o=function(b,c){for(var d=n(b),e=c;e;e=e.parentNode)if(a.inArray(e,d)>-1)return e;return null},p=function(a,b){var c=[],d=!1,e=!1;return function f(g){if(g){if(g===a&&(d=!0),d&&!e&&c.push(g),g===b)return void(e=!0);for(var h=0,i=g.childNodes.length;i>h;h++)f(g.childNodes[h])}}(o(a,b)),c},q=function(a,b){b=b||d.fail;for(var c=[];a&&(c.push(a),!b(a));)a=a.previousSibling;return c},r=function(a,b){b=b||d.fail;for(var c=[];a&&(c.push(a),!b(a));)a=a.nextSibling;return c},s=function(a,b){var c=[];return b=b||d.ok,function e(d){a!==d&&b(d)&&c.push(d);for(var f=0,g=d.childNodes.length;g>f;f++)e(d.childNodes[f])}(a),c},t=function(a,b){var c=b.nextSibling,d=b.parentNode;return c?d.insertBefore(a,c):d.appendChild(a),a},u=function(b,c){return a.each(c,function(a,c){b.appendChild(c)}),b},v=i("#text"),w=function(a){return v(a)?a.nodeValue.length:a.childNodes.length},x=function(a){for(var b=0;a=a.previousSibling;)b+=1;return b},y=function(b,c){var f=e.initial(n(c,d.eq(b)));return a.map(f,x).reverse()},z=function(a,b){for(var c=a,d=0,e=b.length;e>d;d++)c=c.childNodes[b[d]];return c},A=function(a,b){if(0===b)return a;if(b>=w(a))return a.nextSibling;if(v(a))return a.splitText(b);var c=a.childNodes[b];return a=t(a.cloneNode(!1),a),u(a,r(c))},B=function(a,b,c){var e=n(b,d.eq(a));return 1===e.length?A(b,c):e.reduce(function(a,d){var e=d.cloneNode(!1);return t(e,d),a===b&&(a=A(a,c)),u(e,r(a)),e})},C=function(a,b){if(a&&a.parentNode){if(a.removeNode)return a.removeNode(b);var c=a.parentNode;if(!b){var d,e,f=[];for(d=0,e=a.childNodes.length;e>d;d++)f.push(a.childNodes[d]);for(d=0,e=f.length;e>d;d++)c.insertBefore(f[d],a)}c.removeChild(a)}},D=function(a){return f.isTextarea(a[0])?a.val():a.html()};return{blank:c.bMSIE?"&nbsp;":"<br/>",emptyPara:"<p><br/></p>",isEditable:b,isControlSizing:g,buildLayoutInfo:h,isText:v,isPara:j,isList:k,isTable:i("TABLE"),isCell:l,isAnchor:i("A"),isDiv:i("DIV"),isLi:i("LI"),isSpan:i("SPAN"),isB:i("B"),isU:i("U"),isS:i("S"),isI:i("I"),isImg:i("IMG"),isTextarea:i("TEXTAREA"),ancestor:m,listAncestor:n,listNext:r,listPrev:q,listDescendant:s,commonAncestor:o,listBetween:p,insertAfter:t,position:x,makeOffsetPath:y,fromOffsetPath:z,split:B,remove:C,html:D}}(),g={version:"0.5.2",options:{width:null,height:null,focus:!1,tabsize:4,styleWithSpan:!0,disableLinkTarget:!1,disableDragAndDrop:!1,codemirror:null,lang:"en-US",direction:null,toolbar:[["style",["style"]],["font",["bold","italic","underline","clear"]],["fontname",["fontname"]],["color",["color"]],["para",["ul","ol","paragraph"]],["height",["height"]],["table",["table"]],["insert",["link","picture","video"]],["view",["fullscreen","codeview"]],["help",["help"]]],oninit:null,onfocus:null,onblur:null,onenter:null,onkeyup:null,onkeydown:null,onImageUpload:null,onImageUploadError:null,onToolbarClick:null,keyMap:{pc:{"CTRL+Z":"undo","CTRL+Y":"redo",TAB:"tab","SHIFT+TAB":"untab","CTRL+B":"bold","CTRL+I":"italic","CTRL+U":"underline","CTRL+SHIFT+S":"strikethrough","CTRL+BACKSLASH":"removeFormat","CTRL+SHIFT+L":"justifyLeft","CTRL+SHIFT+E":"justifyCenter","CTRL+SHIFT+R":"justifyRight","CTRL+SHIFT+J":"justifyFull","CTRL+SHIFT+NUM7":"insertUnorderedList","CTRL+SHIFT+NUM8":"insertOrderedList","CTRL+LEFTBRACKET":"outdent","CTRL+RIGHTBRACKET":"indent","CTRL+NUM0":"formatPara","CTRL+NUM1":"formatH1","CTRL+NUM2":"formatH2","CTRL+NUM3":"formatH3","CTRL+NUM4":"formatH4","CTRL+NUM5":"formatH5","CTRL+NUM6":"formatH6","CTRL+ENTER":"insertHorizontalRule"},mac:{"CMD+Z":"undo","CMD+SHIFT+Z":"redo",TAB:"tab","SHIFT+TAB":"untab","CMD+B":"bold","CMD+I":"italic","CMD+U":"underline","CMD+SHIFT+S":"strikethrough","CMD+BACKSLASH":"removeFormat","CMD+SHIFT+L":"justifyLeft","CMD+SHIFT+E":"justifyCenter","CMD+SHIFT+R":"justifyRight","CMD+SHIFT+J":"justifyFull","CMD+SHIFT+NUM7":"insertUnorderedList","CMD+SHIFT+NUM8":"insertOrderedList","CMD+LEFTBRACKET":"outdent","CMD+RIGHTBRACKET":"indent","CMD+NUM0":"formatPara","CMD+NUM1":"formatH1","CMD+NUM2":"formatH2","CMD+NUM3":"formatH3","CMD+NUM4":"formatH4","CMD+NUM5":"formatH5","CMD+NUM6":"formatH6","CMD+ENTER":"insertHorizontalRule"}}},lang:{"en-US":{font:{bold:"Bold",italic:"Italic",underline:"Underline",strike:"Strike",clear:"Remove Font Style",height:"Line Height",name:"Font Family",size:"Font Size"},image:{image:"Picture",insert:"Insert Image",resizeFull:"Resize Full",resizeHalf:"Resize Half",resizeQuarter:"Resize Quarter",floatLeft:"Float Left",floatRight:"Float Right",floatNone:"Float None",dragImageHere:"Drag an image here",selectFromFiles:"Select from files",url:"Image URL",remove:"Remove Image"},link:{link:"Link",insert:"Insert Link",unlink:"Unlink",edit:"Edit",textToDisplay:"Text to display",url:"To what URL should this link go?",openInNewWindow:"Open in new window"},video:{video:"Video",videoLink:"Video Link",insert:"Insert Video",url:"Video URL?",providers:"(YouTube, Vimeo, Vine, Instagram, or DailyMotion)"},table:{table:"Table"},hr:{insert:"Insert Horizontal Rule"},style:{style:"Style",normal:"Normal",blockquote:"Quote",pre:"Code",h1:"Header 1",h2:"Header 2",h3:"Header 3",h4:"Header 4",h5:"Header 5",h6:"Header 6"},lists:{unordered:"Unordered list",ordered:"Ordered list"},options:{help:"Help",fullscreen:"Full Screen",codeview:"Code View"},paragraph:{paragraph:"Paragraph",outdent:"Outdent",indent:"Indent",left:"Align left",center:"Align center",right:"Align right",justify:"Justify full"},color:{recent:"Recent Color",more:"More Color",background:"BackColor",foreground:"FontColor",transparent:"Transparent",setTransparent:"Set transparent",reset:"Reset",resetToDefault:"Reset to default"},shortcut:{shortcuts:"Keyboard shortcuts",close:"Close",textFormatting:"Text formatting",action:"Action",paragraphFormatting:"Paragraph formatting",documentStyle:"Document Style"},history:{undo:"Undo",redo:"Redo"}}}},h=function(){var b=function(b){return a.Deferred(function(c){a.extend(new FileReader,{onload:function(a){var b=a.target.result;c.resolve(b)},onerror:function(){c.reject(this)}}).readAsDataURL(b)}).promise()},c=function(b){return a.Deferred(function(c){a("<img>").one("load",function(){c.resolve(a(this))}).one("error abort",function(){c.reject(a(this))}).css({display:"none"}).appendTo(document.body).attr("src",b)}).promise()};return{readFileAsDataURL:b,createImage:c}}(),i={isEdit:function(a){return-1!==[8,9,13,32].indexOf(a)},nameFromCode:{8:"BACKSPACE",9:"TAB",13:"ENTER",32:"SPACE",48:"NUM0",49:"NUM1",50:"NUM2",51:"NUM3",52:"NUM4",53:"NUM5",54:"NUM6",55:"NUM7",56:"NUM8",66:"B",69:"E",73:"I",74:"J",75:"K",76:"L",82:"R",83:"S",85:"U",89:"Y",90:"Z",191:"SLASH",219:"LEFTBRACKET",220:"BACKSLASH",221:"RIGHTBRACKET"}},j=function(){var b=function(b,d){if(c.jqueryVersion<1.9){var e={};return a.each(d,function(a,c){e[c]=b.css(c)}),e}return b.css.call(b,d)};this.stylePara=function(b,c){a.each(b.nodes(f.isPara),function(b,d){a(d).css(c)})},this.current=function(c,d){var e=a(f.isText(c.sc)?c.sc.parentNode:c.sc),g=["font-family","font-size","text-align","list-style-type","line-height"],h=b(e,g)||{};if(h["font-size"]=parseInt(h["font-size"],10),h["font-bold"]=document.queryCommandState("bold")?"bold":"normal",h["font-italic"]=document.queryCommandState("italic")?"italic":"normal",h["font-underline"]=document.queryCommandState("underline")?"underline":"normal",h["font-strikethrough"]=document.queryCommandState("strikeThrough")?"strikethrough":"normal",c.isOnList()){var i=["circle","disc","disc-leading-zero","square"],j=a.inArray(h["list-style-type"],i)>-1;h["list-style"]=j?"unordered":"ordered"}else h["list-style"]="none";var k=f.ancestor(c.sc,f.isPara);if(k&&k.style["line-height"])h["line-height"]=k.style.lineHeight;else{var l=parseInt(h["line-height"],10)/parseInt(h["font-size"],10);h["line-height"]=l.toFixed(1)}return h.image=f.isImg(d)&&d,h.anchor=c.isOnAnchor()&&f.ancestor(c.sc,f.isAnchor),h.aAncestor=f.listAncestor(c.sc,f.isEditable),h}},k=function(){var b=!!document.createRange,c=function(a,b){var c,d,g=a.parentElement(),h=document.body.createTextRange(),i=e.from(g.childNodes);for(c=0;c<i.length;c++)if(!f.isText(i[c])){if(h.moveToElementText(i[c]),h.compareEndPoints("StartToStart",a)>=0)break;d=i[c]}if(0!==c&&f.isText(i[c-1])){var j=document.body.createTextRange(),k=null;j.moveToElementText(d||g),j.collapse(!d),k=d?d.nextSibling:g.firstChild;var l=a.duplicate();l.setEndPoint("StartToStart",j);for(var m=l.text.replace(/[\r\n]/g,"").length;m>k.nodeValue.length&&k.nextSibling;)m-=k.nodeValue.length,k=k.nextSibling;{k.nodeValue}b&&k.nextSibling&&f.isText(k.nextSibling)&&m===k.nodeValue.length&&(m-=k.nodeValue.length,k=k.nextSibling),g=k,c=m}return{cont:g,offset:c}},g=function(a){var b=function(a,c){var g,h;if(f.isText(a)){var i=f.listPrev(a,d.not(f.isText)),j=e.last(i).previousSibling;g=j||a.parentNode,c+=e.sum(e.tail(i),f.length),h=!j}else{if(g=a.childNodes[c]||a,f.isText(g))return b(g,c);c=0,h=!1}return{cont:g,collapseToStart:h,offset:c}},c=document.body.createTextRange(),g=b(a.cont,a.offset);return c.moveToElementText(g.cont),c.collapse(g.collapseToStart),c.moveStart("character",g.offset),c},h=function(c,h,i,j){this.sc=c,this.so=h,this.ec=i,this.eo=j;var k=function(){if(b){var a=document.createRange();return a.setStart(c,h),a.setEnd(i,j),a}var d=g({cont:c,offset:h});return d.setEndPoint("EndToEnd",g({cont:i,offset:j})),d};this.select=function(){var a=k();if(b){var c=document.getSelection();c.rangeCount>0&&c.removeAllRanges(),c.addRange(a)}else a.select()},this.nodes=function(b){var g=f.listBetween(c,i),h=e.compact(a.map(g,function(a){return f.ancestor(a,b)}));return a.map(e.clusterBy(h,d.eq2),e.head)},this.commonAncestor=function(){return f.commonAncestor(c,i)};var l=function(a){return function(){var b=f.ancestor(c,a);return!!b&&b===f.ancestor(i,a)}};this.isOnEditable=l(f.isEditable),this.isOnList=l(f.isList),this.isOnAnchor=l(f.isAnchor),this.isOnCell=l(f.isCell),this.isCollapsed=function(){return c===i&&h===j},this.insertNode=function(a){var c=k();b?c.insertNode(a):c.pasteHTML(a.outerHTML)},this.toString=function(){var a=k();return b?a.toString():a.text},this.bookmark=function(a){return{s:{path:f.makeOffsetPath(a,c),offset:h},e:{path:f.makeOffsetPath(a,i),offset:j}}}};return{create:function(a,d,e,f){if(0===arguments.length)if(b){var g=document.getSelection();if(0===g.rangeCount)return null;var i=g.getRangeAt(0);a=i.startContainer,d=i.startOffset,e=i.endContainer,f=i.endOffset}else{var j=document.selection.createRange(),k=j.duplicate();k.collapse(!1);var l=j;l.collapse(!0);var m=c(l,!0),n=c(k,!1);a=m.cont,d=m.offset,e=n.cont,f=n.offset}else 2===arguments.length&&(e=a,f=d);return new h(a,d,e,f)},createFromNode:function(a){return this.create(a,0,a,1)},createFromBookmark:function(a,b){var c=f.fromOffsetPath(a,b.s.path),d=b.s.offset,e=f.fromOffsetPath(a,b.e.path),g=b.e.offset;return new h(c,d,e,g)}}}(),l=function(){this.tab=function(a,b){var c=f.ancestor(a.commonAncestor(),f.isCell),d=f.ancestor(c,f.isTable),g=f.listDescendant(d,f.isCell),h=e[b?"prev":"next"](g,c);h&&k.create(h,0).select()},this.createTable=function(b,c){for(var d,e=[],g=0;b>g;g++)e.push("<td>"+f.blank+"</td>");d=e.join("");for(var h,i=[],j=0;c>j;j++)i.push("<tr>"+d+"</tr>");h=i.join("");var k='<table class="table table-bordered">'+h+"</table>";return a(k)[0]}},m=function(){var b=new j,d=new l;this.saveRange=function(a){a.data("range",k.create())},this.restoreRange=function(a){var b=a.data("range");b&&b.select()},this.currentStyle=function(a){var c=k.create();return c.isOnEditable()&&b.current(c,a)},this.undo=function(a){a.data("NoteHistory").undo(a)},this.redo=function(a){a.data("NoteHistory").redo(a)};for(var e=this.recordUndo=function(a){a.data("NoteHistory").recordUndo(a)},g=["bold","italic","underline","strikethrough","justifyLeft","justifyCenter","justifyRight","justifyFull","insertOrderedList","insertUnorderedList","indent","outdent","formatBlock","removeFormat","backColor","foreColor","insertHorizontalRule","fontName"],i=0,m=g.length;m>i;i++)this[g[i]]=function(a){return function(b,c){e(b),document.execCommand(a,!1,c)}}(g[i]);var n=function(b,c,d){e(b);var g=new Array(d+1).join("&nbsp;");c.insertNode(a('<span id="noteTab">'+g+"</span>")[0]);var h=a("#noteTab").removeAttr("id");c=k.create(h[0],1),c.select(),f.remove(h[0])};this.tab=function(a,b){var c=k.create();c.isCollapsed()&&c.isOnCell()?d.tab(c):n(a,c,b.tabsize)},this.untab=function(){var a=k.create();a.isCollapsed()&&a.isOnCell()&&d.tab(a,!0)},this.insertImage=function(a,b){h.createImage(b).then(function(b){e(a),b.css({display:"",width:Math.min(a.width(),b.width())}),k.create().insertNode(b[0])}).fail(function(){var b=a.data("callbacks");b.onImageUploadError&&b.onImageUploadError()})},this.insertVideo=function(b,c){e(b);var d,f=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,g=c.match(f),h=/\/\/instagram.com\/p\/(.[a-zA-Z0-9]*)/,i=c.match(h),j=/\/\/vine.co\/v\/(.[a-zA-Z0-9]*)/,l=c.match(j),m=/\/\/(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/,n=c.match(m),o=/.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/,p=c.match(o);if(g&&11===g[2].length){var q=g[2];d=a("<iframe>").attr("src","//www.youtube.com/embed/"+q).attr("width","640").attr("height","360")}else i&&i[0].length>0?d=a("<iframe>").attr("src",i[0]+"/embed/").attr("width","612").attr("height","710").attr("scrolling","no").attr("allowtransparency","true"):l&&l[0].length>0?d=a("<iframe>").attr("src",l[0]+"/embed/simple").attr("width","600").attr("height","600").attr("class","vine-embed"):n&&n[3].length>0?d=a("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("src","//player.vimeo.com/video/"+n[3]).attr("width","640").attr("height","360"):p&&p[2].length>0&&(d=a("<iframe>").attr("src","//www.dailymotion.com/embed/video/"+p[2]).attr("width","640").attr("height","360"));d&&(d.attr("frameborder",0),k.create().insertNode(d[0]))},this.formatBlock=function(a,b){e(a),b=c.bMSIE?"<"+b+">":b,document.execCommand("FormatBlock",!1,b)},this.formatPara=function(a){this.formatBlock(a,"P")};for(var i=1;6>=i;i++)this["formatH"+i]=function(a){return function(b){this.formatBlock(b,"H"+a)}}(i);this.fontSize=function(a,b){e(a),document.execCommand("fontSize",!1,3),c.bFF?a.find("font[size=3]").removeAttr("size").css("font-size",b+"px"):a.find("span").filter(function(){return"medium"===this.style.fontSize}).css("font-size",b+"px")},this.lineHeight=function(a,c){e(a),b.stylePara(k.create(),{lineHeight:c})},this.unlink=function(a){var b=k.create();if(b.isOnAnchor()){e(a);var c=f.ancestor(b.sc,f.isAnchor);b=k.createFromNode(c),b.select(),document.execCommand("unlink")}},this.createLink=function(b,d,g){var h=k.create();e(b);var i=d;if(-1!==d.indexOf("@")&&-1===d.indexOf(":")?i="mailto:"+d:-1===d.indexOf("://")&&(i="http://"+d),(c.bMSIE||c.bFF)&&h.isCollapsed()){h.insertNode(a('<A id="linkAnchor">'+d+"</A>")[0]);var j=a("#linkAnchor").attr("href",i).removeAttr("id");h=k.createFromNode(j[0]),h.select()}else document.execCommand("createlink",!1,i),h=k.create();a.each(h.nodes(f.isAnchor),function(b,c){g?a(c).attr("target","_blank"):a(c).removeAttr("target")})},this.getLinkInfo=function(){var b=k.create(),c=!0,d="";if(b.isOnAnchor()){var e=f.ancestor(b.sc,f.isAnchor);b=k.createFromNode(e),c="_blank"===a(e).attr("target"),d=e.href}return{text:b.toString(),url:d,newWindow:c}},this.getVideoInfo=function(){var a=k.create();if(a.isOnAnchor()){var b=f.ancestor(a.sc,f.isAnchor);a=k.createFromNode(b)}return{text:a.toString()}},this.color=function(a,b){var c=JSON.parse(b),d=c.foreColor,f=c.backColor;e(a),d&&document.execCommand("foreColor",!1,d),f&&document.execCommand("backColor",!1,f)},this.insertTable=function(a,b){e(a);var c=b.split("x");k.create().insertNode(d.createTable(c[0],c[1]))},this.floatMe=function(a,b,c){e(a),c.css("float",b)},this.resize=function(a,b,c){e(a),c.css({width:a.width()*b+"px",height:""})},this.resizeTo=function(a,b,c){var d;if(c){var e=a.y/a.x,f=b.data("ratio");d={width:f>e?a.x:a.y/f,height:f>e?a.x*f:a.y}}else d={width:a.x,height:a.y};b.css(d)},this.removeMedia=function(a,b,c){e(a),c.detach()}},n=function(){var a=[],b=[],c=function(a){var b=a[0],c=k.create();return{contents:a.html(),bookmark:c.bookmark(b),scrollTop:a.scrollTop()}},d=function(a,b){a.html(b.contents).scrollTop(b.scrollTop),k.createFromBookmark(a[0],b.bookmark).select()};this.undo=function(e){var f=c(e);0!==a.length&&(d(e,a.pop()),b.push(f))},this.redo=function(e){var f=c(e);0!==b.length&&(d(e,b.pop()),a.push(f))},this.recordUndo=function(d){b=[],a.push(c(d))}},o=function(){this.update=function(b,c){var d=function(b,c){b.find(".dropdown-menu li a").each(function(){var b=a(this).data("value")+""==c+"";this.className=b?"checked":""})},f=function(a,c){var d=b.find(a);d.toggleClass("active",c())},g=b.find(".note-fontname");if(g.length>0){var h=c["font-family"];h&&(h=e.head(h.split(",")),h=h.replace(/\'/g,""),g.find(".note-current-fontname").text(h),d(g,h))}var i=b.find(".note-fontsize");i.find(".note-current-fontsize").text(c["font-size"]),d(i,parseFloat(c["font-size"]));var j=b.find(".note-height");d(j,parseFloat(c["line-height"])),f('button[data-event="bold"]',function(){return"bold"===c["font-bold"]}),f('button[data-event="italic"]',function(){return"italic"===c["font-italic"]}),f('button[data-event="underline"]',function(){return"underline"===c["font-underline"]}),f('button[data-event="strikethrough"]',function(){return"strikethrough"===c["font-strikethrough"]}),f('button[data-event="justifyLeft"]',function(){return"left"===c["text-align"]||"start"===c["text-align"]}),f('button[data-event="justifyCenter"]',function(){return"center"===c["text-align"]}),f('button[data-event="justifyRight"]',function(){return"right"===c["text-align"]}),f('button[data-event="justifyFull"]',function(){return"justify"===c["text-align"]}),f('button[data-event="insertUnorderedList"]',function(){return"unordered"===c["list-style"]}),f('button[data-event="insertOrderedList"]',function(){return"ordered"===c["list-style"]})},this.updateRecentColor=function(b,c,d){var e=a(b).closest(".note-color"),f=e.find(".note-recent-color"),g=JSON.parse(f.attr("data-value"));g[c]=d,f.attr("data-value",JSON.stringify(g));var h="backColor"===c?"background-color":"color";f.find("i").css(h,d)},this.updateFullscreen=function(a,b){var c=a.find('button[data-event="fullscreen"]');c.toggleClass("active",b)},this.updateCodeview=function(a,b){var c=a.find('button[data-event="codeview"]');c.toggleClass("active",b)},this.activate=function(a){a.find("button").not('button[data-event="codeview"]').removeClass("disabled")},this.deactivate=function(a){a.find("button").not('button[data-event="codeview"]').addClass("disabled")}},p=function(){var b=function(b,c){var d=a(c),e=d.position(),f=d.height();b.css({display:"block",left:e.left,top:e.top+f})};this.update=function(a,c){var d=a.find(".note-link-popover");if(c.anchor){var e=d.find("a");e.attr("href",c.anchor.href).html(c.anchor.href),b(d,c.anchor)}else d.hide();var f=a.find(".note-image-popover");c.image?b(f,c.image):f.hide()},this.hide=function(a){a.children().hide()}},q=function(){this.update=function(b,c){var d=b.find(".note-control-selection");if(c.image){var e=a(c.image),f=e.position(),g={w:e.width(),h:e.height()};d.css({display:"block",left:f.left,top:f.top,width:g.w,height:g.h}).data("target",c.image);var h=g.w+"x"+g.h;d.find(".note-control-selection-info").text(h)}else d.hide()},this.hide=function(a){a.children().hide()}},r=function(){var b=function(a,b){a.toggleClass("disabled",!b),a.attr("disabled",!b)};this.showImageDialog=function(c,d){return a.Deferred(function(a){var e=d.find(".note-image-dialog"),f=d.find(".note-image-input"),g=d.find(".note-image-url"),h=d.find(".note-image-btn");e.one("shown.bs.modal",function(){f.replaceWith(f.clone().on("change",function(){e.modal("hide"),a.resolve(this.files)})),h.click(function(b){b.preventDefault(),e.modal("hide"),a.resolve(g.val())}),g.keyup(function(){b(h,g.val())}).val("").focus()}).one("hidden.bs.modal",function(){c.focus(),f.off("change"),g.off("keyup"),h.off("click")}).modal("show")})},this.showVideoDialog=function(c,d,e){return a.Deferred(function(a){var f=d.find(".note-video-dialog"),g=f.find(".note-video-url"),h=f.find(".note-video-btn");f.one("shown.bs.modal",function(){g.val(e.text).keyup(function(){b(h,g.val())}).trigger("keyup").trigger("focus"),h.click(function(b){b.preventDefault(),f.modal("hide"),a.resolve(g.val())})}).one("hidden.bs.modal",function(){c.focus(),g.off("keyup"),h.off("click")}).modal("show")})},this.showLinkDialog=function(c,d,e){return a.Deferred(function(a){var f=d.find(".note-link-dialog"),g=f.find(".note-link-text"),h=f.find(".note-link-url"),i=f.find(".note-link-btn"),j=f.find("input[type=checkbox]");f.one("shown.bs.modal",function(){g.val(e.text),h.keyup(function(){b(i,h.val()),e.text||g.val(h.val())}).val(e.url).trigger("focus"),j.prop("checked",e.newWindow),i.one("click",function(b){b.preventDefault(),f.modal("hide"),a.resolve(h.val(),j.is(":checked"))})}).one("hidden.bs.modal",function(){c.focus(),h.off("keyup")}).modal("show")}).promise()},this.showHelpDialog=function(a,b){var c=b.find(".note-help-dialog");c.one("hidden.bs.modal",function(){a.focus()}).modal("show")}},s=function(){var d=new m,g=new o,j=new p,k=new q,l=new r,s=function(b){var c=a(b).closest(".note-editor");return c.length>0&&f.buildLayoutInfo(c)},t=function(b,c){d.restoreRange(b);var e=b.data("callbacks");e.onImageUpload?e.onImageUpload(c,d,b):a.each(c,function(a,c){h.readFileAsDataURL(c).then(function(a){d.insertImage(b,a)}).fail(function(){e.onImageUploadError&&e.onImageUploadError()})})},u=function(a){f.isImg(a.target)&&a.preventDefault()},v=function(a){var b=s(a.currentTarget||a.target),c=d.currentStyle(a.target);c&&(g.update(b.toolbar(),c),j.update(b.popover(),c),k.update(b.handle(),c))},w=function(a){var b=s(a.currentTarget||a.target);j.hide(b.popover()),k.hide(b.handle())},x=function(a){var b=a.originalEvent;if(b.clipboardData&&b.clipboardData.items&&b.clipboardData.items.length){var c=s(a.currentTarget||a.target),d=e.head(b.clipboardData.items),f="file"===d.kind&&-1!==d.type.indexOf("image/");f&&t(c.editable(),[d.getAsFile()])}},y=function(b){if(f.isControlSizing(b.target)){var c=s(b.target),e=c.handle(),g=c.popover(),h=c.editable(),i=c.editor(),l=e.find(".note-control-selection").data("target"),m=a(l),n=m.offset(),o=a(document).scrollTop();i.on("mousemove",function(a){d.resizeTo({x:a.clientX-n.left,y:a.clientY-(n.top-o)},m,!a.shiftKey),k.update(e,{image:l}),j.update(g,{image:l})}).one("mouseup",function(){i.off("mousemove")}),m.data("ratio")||m.data("ratio",m.height()/m.width()),d.recordUndo(h),b.stopPropagation(),b.preventDefault()}},z=function(b){var c=a(b.target).closest("[data-event]");c.length>0&&b.preventDefault()},A=function(e){var h=a(e.target).closest("[data-event]");if(h.length>0){var i,j,k,m=h.attr("data-event"),n=h.attr("data-value"),o=s(e.target),p=o.editor(),q=o.toolbar(),r=o.dialog(),u=o.editable(),w=o.codable(),x=p.data("options");if(-1!==a.inArray(m,["resize","floatMe","removeMedia"])){var y=o.handle(),z=y.find(".note-control-selection");k=a(z.data("target"))}if(d[m]&&(u.trigger("focus"),d[m](u,n,k)),-1!==a.inArray(m,["backColor","foreColor"]))g.updateRecentColor(h[0],m,n);else if("showLinkDialog"===m){u.focus();var A=d.getLinkInfo();d.saveRange(u),l.showLinkDialog(u,r,A).then(function(a,b){d.restoreRange(u),d.createLink(u,a,b)})}else if("showImageDialog"===m)u.focus(),l.showImageDialog(u,r).then(function(a){"string"==typeof a?(d.restoreRange(u),d.insertImage(u,a)):t(u,a)});else if("showVideoDialog"===m){u.focus();var B=d.getVideoInfo();d.saveRange(u),l.showVideoDialog(u,r,B).then(function(a){d.restoreRange(u),d.insertVideo(u,a)})}else if("showHelpDialog"===m)l.showHelpDialog(u,r);else if("fullscreen"===m){var C=a("html, body"),D=function(a){p.css("width",a.w),u.css("height",a.h),w.css("height",a.h),w.data("cmEditor")&&w.data("cmEditor").setSize(null,a.h)};p.toggleClass("fullscreen");var E=p.hasClass("fullscreen");E?(u.data("orgHeight",u.css("height")),a(window).on("resize",function(){D({w:a(window).width(),h:a(window).height()-q.outerHeight()})}).trigger("resize"),C.css("overflow","hidden")):(a(window).off("resize"),D({w:x.width||"",h:u.data("orgHeight")}),C.css("overflow","auto")),g.updateFullscreen(q,E)}else if("codeview"===m){p.toggleClass("codeview");var F=p.hasClass("codeview");if(F){if(w.val(u.html()),w.height(u.height()),g.deactivate(q),w.focus(),c.bCodeMirror){j=b.fromTextArea(w[0],a.extend({mode:"text/html",lineNumbers:!0},x.codemirror));var G=p.data("options").codemirror.tern||!1;G&&(i=new b.TernServer(G),j.ternServer=i,j.on("cursorActivity",function(a){i.updateArgHints(a)})),j.setSize(null,u.outerHeight()),j.autoFormatRange&&j.autoFormatRange({line:0,ch:0},{line:j.lineCount(),ch:j.getTextArea().value.length}),w.data("cmEditor",j)}}else c.bCodeMirror&&(j=w.data("cmEditor"),w.val(j.getValue()),j.toTextArea()),u.html(w.val()||f.emptyPara),u.height(x.height?w.height():"auto"),g.activate(q),u.focus();g.updateCodeview(o.toolbar(),F)}v(e)}},B=24,C=function(b){var c=a(document),d=s(b.target).editable(),e=d.offset().top-c.scrollTop();c.on("mousemove",function(a){var b=a.clientY-(e+B);d.height(b)}).one("mouseup",function(){c.off("mousemove")}),b.stopPropagation(),b.preventDefault()},D=18,E=function(b){var c,d=a(b.target.parentNode),e=d.next(),f=d.find(".note-dimension-picker-mousecatcher"),g=d.find(".note-dimension-picker-highlighted"),h=d.find(".note-dimension-picker-unhighlighted");if(void 0===b.offsetX){var i=a(b.target).offset();c={x:b.pageX-i.left,y:b.pageY-i.top}}else c={x:b.offsetX,y:b.offsetY};var j={c:Math.ceil(c.x/D)||1,r:Math.ceil(c.y/D)||1};g.css({width:j.c+"em",height:j.r+"em"}),f.attr("data-value",j.c+"x"+j.r),3<j.c&&j.c<10&&h.css({width:j.c+1+"em"}),3<j.r&&j.r<10&&h.css({height:j.r+1+"em"}),e.html(j.c+" x "+j.r)},F=function(b){var c=a(),d=b.dropzone,e=b.dropzone.find(".note-dropzone-message");a(document).on("dragenter",function(a){var f=b.editor.hasClass("codeview");f||0!==c.length||(b.editor.addClass("dragover"),d.width(b.editor.width()),d.height(b.editor.height()),e.text("Drag Image Here")),c=c.add(a.target)}).on("dragleave",function(a){c=c.not(a.target),0===c.length&&b.editor.removeClass("dragover")}).on("drop",function(){c=a(),b.editor.removeClass("dragover")}),d.on("dragenter",function(){d.addClass("hover"),e.text("Drop Image")}).on("dragleave",function(){d.removeClass("hover"),e.text("Drag Image Here")}),d.on("drop",function(a){var b=a.originalEvent.dataTransfer;if(b&&b.files){var c=s(a.currentTarget||a.target);c.editable().focus(),t(c.editable(),b.files)}a.preventDefault()}).on("dragover",!1)};this.bindKeyMap=function(a,b){var c=a.editor,e=a.editable;e.on("keydown",function(a){var f=[];a.metaKey&&f.push("CMD"),a.ctrlKey&&f.push("CTRL"),a.shiftKey&&f.push("SHIFT");var g=i.nameFromCode[a.keyCode];g&&f.push(g);var h=b[f.join("+")];h?(a.preventDefault(),d[h](e,c.data("options"))):i.isEdit(a.keyCode)&&d.recordUndo(e)})},this.attach=function(a,b){this.bindKeyMap(a,b.keyMap[c.bMac?"mac":"pc"]),a.editable.on("mousedown",u),a.editable.on("keyup mouseup",v),a.editable.on("scroll",w),a.editable.on("paste",x),b.disableDragAndDrop||F(a),a.handle.on("mousedown",y),a.toolbar.on("click",A),a.popover.on("click",A),a.toolbar.on("mousedown",z),a.popover.on("mousedown",z),a.statusbar.on("mousedown",C);var e=a.toolbar,f=e.find(".note-dimension-picker-mousecatcher");if(f.on("mousemove",E),a.editable.on("blur",function(){d.saveRange(a.editable)}),a.editor.data("options",b),b.styleWithSpan&&!c.bMSIE&&setTimeout(function(){document.execCommand("styleWithCSS",0,!0)}),a.editable.data("NoteHistory",new n),b.onenter&&a.editable.keypress(function(a){a.keyCode===i.ENTER&&b.onenter(a)}),b.onfocus&&a.editable.focus(b.onfocus),b.onblur&&a.editable.blur(b.onblur),b.onkeyup&&a.editable.keyup(b.onkeyup),b.onkeydown&&a.editable.keydown(b.onkeydown),b.onpaste&&a.editable.on("paste",b.onpaste),b.onToolbarClick&&a.toolbar.click(b.onToolbarClick),b.onChange){var g=function(){b.onChange(a.editable,a.editable.html())};c.bMSIE?a.editable.on("DOMCharacterDataModified, DOMSubtreeModified, DOMNodeInserted",g):a.editable.on("input",g)}a.editable.data("callbacks",{onAutoSave:b.onAutoSave,onImageUpload:b.onImageUpload,onImageUploadError:b.onImageUploadError,onFileUpload:b.onFileUpload,onFileUploadError:b.onFileUpload})},this.dettach=function(a){a.editable.off(),a.toolbar.off(),a.handle.off(),a.popover.off()}},t=function(){var b,d,e,g,h;b={picture:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.image.image+'" data-event="showImageDialog" tabindex="-1"><i class="fa fa-picture-o icon-picture"></i></button>'},link:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.link.link+'" data-event="showLinkDialog" tabindex="-1"><i class="fa fa-link icon-link"></i></button>'},video:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.video.video+'" data-event="showVideoDialog" tabindex="-1"><i class="fa fa-youtube-play icon-play"></i></button>'},table:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" title="'+a.table.table+'" data-toggle="dropdown" tabindex="-1"><i class="fa fa-table icon-table"></i> <span class="caret"></span></button><ul class="dropdown-menu"><div class="note-dimension-picker"><div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"></div><div class="note-dimension-picker-highlighted"></div><div class="note-dimension-picker-unhighlighted"></div></div><div class="note-dimension-display"> 1 x 1 </div></ul>'
},style:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" title="'+a.style.style+'" data-toggle="dropdown" tabindex="-1"><i class="fa fa-magic icon-magic"></i> <span class="caret"></span></button><ul class="dropdown-menu"><li><a data-event="formatBlock" data-value="p">'+a.style.normal+'</a></li><li><a data-event="formatBlock" data-value="blockquote"><blockquote>'+a.style.blockquote+'</blockquote></a></li><li><a data-event="formatBlock" data-value="pre">'+a.style.pre+'</a></li><li><a data-event="formatBlock" data-value="h1"><h1>'+a.style.h1+'</h1></a></li><li><a data-event="formatBlock" data-value="h2"><h2>'+a.style.h2+'</h2></a></li><li><a data-event="formatBlock" data-value="h3"><h3>'+a.style.h3+'</h3></a></li><li><a data-event="formatBlock" data-value="h4"><h4>'+a.style.h4+'</h4></a></li><li><a data-event="formatBlock" data-value="h5"><h5>'+a.style.h5+'</h5></a></li><li><a data-event="formatBlock" data-value="h6"><h6>'+a.style.h6+"</h6></a></li></ul>"},fontname:function(a){var b=["Serif","Sans","Arial","Arial Black","Courier","Courier New","Comic Sans MS","Helvetica","Impact","Lucida Grande","Lucida Sans","Tahoma","Times","Times New Roman","Verdana"],c='<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" data-toggle="dropdown" title="'+a.font.name+'" tabindex="-1"><span class="note-current-fontname">Arial</span> <b class="caret"></b></button>';c+='<ul class="dropdown-menu">';for(var d=0;d<b.length;d++)c+='<li><a data-event="fontName" data-value="'+b[d]+'"><i class="fa fa-check icon-ok"></i> '+b[d]+"</a></li>";return c+="</ul>"},fontsize:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" data-toggle="dropdown" title="'+a.font.size+'" tabindex="-1"><span class="note-current-fontsize">11</span> <b class="caret"></b></button><ul class="dropdown-menu"><li><a data-event="fontSize" data-value="8"><i class="fa fa-check icon-ok"></i> 8</a></li><li><a data-event="fontSize" data-value="9"><i class="fa fa-check icon-ok"></i> 9</a></li><li><a data-event="fontSize" data-value="10"><i class="fa fa-check icon-ok"></i> 10</a></li><li><a data-event="fontSize" data-value="11"><i class="fa fa-check icon-ok"></i> 11</a></li><li><a data-event="fontSize" data-value="12"><i class="fa fa-check icon-ok"></i> 12</a></li><li><a data-event="fontSize" data-value="14"><i class="fa fa-check icon-ok"></i> 14</a></li><li><a data-event="fontSize" data-value="18"><i class="fa fa-check icon-ok"></i> 18</a></li><li><a data-event="fontSize" data-value="24"><i class="fa fa-check icon-ok"></i> 24</a></li><li><a data-event="fontSize" data-value="36"><i class="fa fa-check icon-ok"></i> 36</a></li></ul>'},color:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small note-recent-color" title="'+a.color.recent+'" data-event="color" data-value=\'{"backColor":"yellow"}\' tabindex="-1"><i class="fa fa-font icon-font" style="color:black;background-color:yellow;"></i></button><button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" title="'+a.color.more+'" data-toggle="dropdown" tabindex="-1"><span class="caret"></span></button><ul class="dropdown-menu"><li><div class="btn-group"><div class="note-palette-title">'+a.color.background+'</div><div class="note-color-reset" data-event="backColor" data-value="inherit" title="'+a.color.transparent+'">'+a.color.setTransparent+'</div><div class="note-color-palette" data-target-event="backColor"></div></div><div class="btn-group"><div class="note-palette-title">'+a.color.foreground+'</div><div class="note-color-reset" data-event="foreColor" data-value="inherit" title="'+a.color.reset+'">'+a.color.resetToDefault+'</div><div class="note-color-palette" data-target-event="foreColor"></div></div></li></ul>'},bold:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.font.bold+'" data-shortcut="Ctrl+B" data-mac-shortcut="âŒ˜+B" data-event="bold" tabindex="-1"><i class="fa fa-bold icon-bold"></i></button>'},italic:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.font.italic+'" data-shortcut="Ctrl+I" data-mac-shortcut="âŒ˜+I" data-event="italic" tabindex="-1"><i class="fa fa-italic icon-italic"></i></button>'},underline:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.font.underline+'" data-shortcut="Ctrl+U" data-mac-shortcut="âŒ˜+U" data-event="underline" tabindex="-1"><i class="fa fa-underline icon-underline"></i></button>'},strike:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.font.strike+'" data-event="strikethrough" tabindex="-1"><i class="fa fa-strikethrough icon-strikethrough"></i></button>'},clear:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.font.clear+'" data-shortcut="Ctrl+\\" data-mac-shortcut="âŒ˜+\\" data-event="removeFormat" tabindex="-1"><i class="fa fa-eraser icon-eraser"></i></button>'},ul:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.lists.unordered+'" data-shortcut="Ctrl+Shift+8" data-mac-shortcut="âŒ˜+â‡§+7" data-event="insertUnorderedList" tabindex="-1"><i class="fa fa-list-ul icon-list-ul"></i></button>'},ol:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.lists.ordered+'" data-shortcut="Ctrl+Shift+7" data-mac-shortcut="âŒ˜+â‡§+8" data-event="insertOrderedList" tabindex="-1"><i class="fa fa-list-ol icon-list-ol"></i></button>'},paragraph:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" title="'+a.paragraph.paragraph+'" data-toggle="dropdown" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i>  <span class="caret"></span></button><div class="dropdown-menu"><div class="note-align btn-group"><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.paragraph.left+'" data-shortcut="Ctrl+Shift+L" data-mac-shortcut="âŒ˜+â‡§+L" data-event="justifyLeft" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.paragraph.center+'" data-shortcut="Ctrl+Shift+E" data-mac-shortcut="âŒ˜+â‡§+E" data-event="justifyCenter" tabindex="-1"><i class="fa fa-align-center icon-align-center"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.paragraph.right+'" data-shortcut="Ctrl+Shift+R" data-mac-shortcut="âŒ˜+â‡§+R" data-event="justifyRight" tabindex="-1"><i class="fa fa-align-right icon-align-right"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.paragraph.justify+'" data-shortcut="Ctrl+Shift+J" data-mac-shortcut="âŒ˜+â‡§+J" data-event="justifyFull" tabindex="-1"><i class="fa fa-align-justify icon-align-justify"></i></button></div><div class="note-list btn-group"><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.paragraph.outdent+'" data-shortcut="Ctrl+[" data-mac-shortcut="âŒ˜+[" data-event="outdent" tabindex="-1"><i class="fa fa-outdent icon-indent-left"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.paragraph.indent+'" data-shortcut="Ctrl+]" data-mac-shortcut="âŒ˜+]" data-event="indent" tabindex="-1"><i class="fa fa-indent icon-indent-right"></i></button></div></div>'},height:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" data-toggle="dropdown" title="'+a.font.height+'" tabindex="-1"><i class="fa fa-text-height icon-text-height"></i>&nbsp; <b class="caret"></b></button><ul class="dropdown-menu"><li><a data-event="lineHeight" data-value="1.0"><i class="fa fa-check icon-ok"></i> 1.0</a></li><li><a data-event="lineHeight" data-value="1.2"><i class="fa fa-check icon-ok"></i> 1.2</a></li><li><a data-event="lineHeight" data-value="1.4"><i class="fa fa-check icon-ok"></i> 1.4</a></li><li><a data-event="lineHeight" data-value="1.5"><i class="fa fa-check icon-ok"></i> 1.5</a></li><li><a data-event="lineHeight" data-value="1.6"><i class="fa fa-check icon-ok"></i> 1.6</a></li><li><a data-event="lineHeight" data-value="1.8"><i class="fa fa-check icon-ok"></i> 1.8</a></li><li><a data-event="lineHeight" data-value="2.0"><i class="fa fa-check icon-ok"></i> 2.0</a></li><li><a data-event="lineHeight" data-value="3.0"><i class="fa fa-check icon-ok"></i> 3.0</a></li></ul>'},help:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.options.help+'" data-event="showHelpDialog" tabindex="-1"><i class="fa fa-question icon-question"></i></button>'},fullscreen:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.options.fullscreen+'" data-event="fullscreen" tabindex="-1"><i class="fa fa-arrows-alt icon-fullscreen"></i></button>'},codeview:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.options.codeview+'" data-event="codeview" tabindex="-1"><i class="fa fa-code icon-code"></i></button>'},undo:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.history.undo+'" data-event="undo" tabindex="-1"><i class="fa fa-undo icon-undo"></i></button>'},redo:function(a){return'<button type="button" class="btn btn-default btn-sm btn-small" title="'+a.history.redo+'" data-event="redo" tabindex="-1"><i class="fa fa-repeat icon-repeat"></i></button>'}},d=function(a){return'<div class="note-popover"><div class="note-link-popover popover bottom in" style="display: none;"><div class="arrow"></div><div class="popover-content note-link-content"><a href="http://www.google.com" target="_blank">www.google.com</a>&nbsp;&nbsp;<div class="note-insert btn-group"><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.link.edit+'" data-event="showLinkDialog" tabindex="-1"><i class="fa fa-edit icon-edit"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.link.unlink+'" data-event="unlink" tabindex="-1"><i class="fa fa-unlink icon-unlink"></i></button></div></div></div><div class="note-image-popover popover bottom in" style="display: none;"><div class="arrow"></div><div class="popover-content note-image-content"><div class="btn-group"><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.image.resizeFull+'" data-event="resize" data-value="1" tabindex="-1"><span class="note-fontsize-10">100%</span> </button><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.image.resizeHalf+'" data-event="resize" data-value="0.5" tabindex="-1"><span class="note-fontsize-10">50%</span> </button><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.image.resizeQuarter+'" data-event="resize" data-value="0.25" tabindex="-1"><span class="note-fontsize-10">25%</span> </button></div><div class="btn-group"><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.image.floatLeft+'" data-event="floatMe" data-value="left" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.image.floatRight+'" data-event="floatMe" data-value="right" tabindex="-1"><i class="fa fa-align-right icon-align-right"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.image.floatNone+'" data-event="floatMe" data-value="none" tabindex="-1"><i class="fa fa-align-justify icon-align-justify"></i></button></div><div class="btn-group"><button type="button" class="btn btn-default btn-sm btn-small" title="'+a.image.remove+'" data-event="removeMedia" data-value="none" tabindex="-1"><i class="fa fa-trash-o icon-trash"></i></button></div></div></div></div>'};var e=function(){return'<div class="note-handle"><div class="note-control-selection"><div class="note-control-selection-bg"></div><div class="note-control-holder note-control-nw"></div><div class="note-control-holder note-control-ne"></div><div class="note-control-holder note-control-sw"></div><div class="note-control-sizing note-control-se"></div><div class="note-control-selection-info"></div></div></div>'},i=function(a){return'<table class="note-shortcut"><thead><tr><th></th><th>'+a.shortcut.textFormatting+"</th></tr></thead><tbody><tr><td>âŒ˜ + B</td><td>"+a.font.bold+"</td></tr><tr><td>âŒ˜ + I</td><td>"+a.font.italic+"</td></tr><tr><td>âŒ˜ + U</td><td>"+a.font.underline+"</td></tr><tr><td>âŒ˜ + â‡§ + S</td><td>"+a.font.strike+"</td></tr><tr><td>âŒ˜ + \\</td><td>"+a.font.clear+"</td></tr></tr></tbody></table>"},j=function(a){return'<table class="note-shortcut"><thead><tr><th></th><th>'+a.shortcut.action+"</th></tr></thead><tbody><tr><td>âŒ˜ + Z</td><td>"+a.history.undo+"</td></tr><tr><td>âŒ˜ + â‡§ + Z</td><td>"+a.history.redo+"</td></tr><tr><td>âŒ˜ + ]</td><td>"+a.paragraph.indent+"</td></tr><tr><td>âŒ˜ + [</td><td>"+a.paragraph.outdent+"</td></tr><tr><td>âŒ˜ + ENTER</td><td>"+a.hr.insert+"</td></tr></tbody></table>"},k=function(a,b){var c='<table class="note-shortcut"><thead><tr><th></th><th>'+a.shortcut.extraKeys+"</th></tr></thead><tbody>";for(var d in b.extraKeys)b.extraKeys.hasOwnProperty(d)&&(c+="<tr><td>"+d+"</td><td>"+b.extraKeys[d]+"</td></tr>");return c+="</tbody></table>"},l=function(a){return'<table class="note-shortcut"><thead><tr><th></th><th>'+a.shortcut.paragraphFormatting+"</th></tr></thead><tbody><tr><td>âŒ˜ + â‡§ + L</td><td>"+a.paragraph.left+"</td></tr><tr><td>âŒ˜ + â‡§ + E</td><td>"+a.paragraph.center+"</td></tr><tr><td>âŒ˜ + â‡§ + R</td><td>"+a.paragraph.right+"</td></tr><tr><td>âŒ˜ + â‡§ + J</td><td>"+a.paragraph.justify+"</td></tr><tr><td>âŒ˜ + â‡§ + NUM7</td><td>"+a.lists.ordered+"</td></tr><tr><td>âŒ˜ + â‡§ + NUM8</td><td>"+a.lists.unordered+"</td></tr></tbody></table>"},m=function(a){return'<table class="note-shortcut"><thead><tr><th></th><th>'+a.shortcut.documentStyle+"</th></tr></thead><tbody><tr><td>âŒ˜ + NUM0</td><td>"+a.style.normal+"</td></tr><tr><td>âŒ˜ + NUM1</td><td>"+a.style.h1+"</td></tr><tr><td>âŒ˜ + NUM2</td><td>"+a.style.h2+"</td></tr><tr><td>âŒ˜ + NUM3</td><td>"+a.style.h3+"</td></tr><tr><td>âŒ˜ + NUM4</td><td>"+a.style.h4+"</td></tr><tr><td>âŒ˜ + NUM5</td><td>"+a.style.h5+"</td></tr><tr><td>âŒ˜ + NUM6</td><td>"+a.style.h6+"</td></tr></tbody></table>"},n=function(a,b){var c='<table class="note-shortcut-layout"><tbody><tr><td>'+j(a,b)+"</td><td>"+i(a,b)+"</td></tr><tr><td>"+m(a,b)+"</td><td>"+l(a,b)+"</td></tr>";return b.extraKeys&&(c+='<tr><td colspan="2">'+k(a,b)+"</td></tr>"),c+="</tbody</table>"},o=function(a){return a.replace(/âŒ˜/g,"Ctrl").replace(/â‡§/g,"Shift")};g=function(a,b){var d=function(){return'<div class="note-image-dialog modal" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" aria-hidden="true" tabindex="-1">&times;</button><h4>'+a.image.insert+'</h4></div><div class="modal-body"><div class="row-fluid"><h5>'+a.image.selectFromFiles+'</h5><input class="note-image-input" type="file" name="files" accept="image/*" /><h5>'+a.image.url+'</h5><input class="note-image-url form-control span12" type="text" /></div></div><div class="modal-footer"><button href="#" class="btn btn-primary note-image-btn disabled" disabled="disabled">'+a.image.insert+"</button></div></div></div></div>"},e=function(){return'<div class="note-link-dialog modal" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" aria-hidden="true" tabindex="-1">&times;</button><h4>'+a.link.insert+'</h4></div><div class="modal-body"><div class="row-fluid"><div class="form-group"><label>'+a.link.textToDisplay+'</label><input class="note-link-text form-control span12" disabled type="text" /></div><div class="form-group"><label>'+a.link.url+'</label><input class="note-link-url form-control span12" type="text" /></div>'+(b.disableLinkTarget?"":'<div class="checkbox"><label><input type="checkbox" checked> '+a.link.openInNewWindow+"</label></div>")+'</div></div><div class="modal-footer"><button href="#" class="btn btn-primary note-link-btn disabled" disabled="disabled">'+a.link.insert+"</button></div></div></div></div>"},f=function(){return'<div class="note-video-dialog modal" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" aria-hidden="true" tabindex="-1">&times;</button><h4>'+a.video.insert+'</h4></div><div class="modal-body"><div class="row-fluid"><div class="form-group"><label>'+a.video.url+'</label>&nbsp;<small class="text-muted">'+a.video.providers+'</small><input class="note-video-url form-control span12" type="text" /></div></div></div><div class="modal-footer"><button href="#" class="btn btn-primary note-video-btn disabled" disabled="disabled">'+a.video.insert+"</button></div></div></div></div>"},g=function(){return'<div class="note-help-dialog modal" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><a class="modal-close pull-right" aria-hidden="true" tabindex="-1">'+a.shortcut.close+'</a><div class="title">'+a.shortcut.shortcuts+"</div>"+(c.bMac?n(a,b):o(n(a,b)))+'<p class="text-center"><a href="//hackerwins.github.io/summernote/" target="_blank">Summernote 0.5.2</a> Â· <a href="//github.com/HackerWins/summernote" target="_blank">Project</a> Â· <a href="//github.com/HackerWins/summernote/issues" target="_blank">Issues</a></p></div></div></div></div>'};return'<div class="note-dialog">'+d()+e()+f()+g()+"</div>"},h=function(){return'<div class="note-resizebar"><div class="note-icon-bar"></div><div class="note-icon-bar"></div><div class="note-icon-bar"></div></div>'};var p=function(b,d){b.find("button").each(function(b,d){var e=a(d),f=e.attr(c.bMac?"data-mac-shortcut":"data-shortcut");f&&e.attr("title",function(a,b){return b+" ("+f+")"})}).tooltip({container:"body",trigger:"hover",placement:d||"top"}).on("click",function(){a(this).tooltip("hide")})},q=[["#000000","#424242","#636363","#9C9C94","#CEC6CE","#EFEFEF","#F7F7F7","#FFFFFF"],["#FF0000","#FF9C00","#FFFF00","#00FF00","#00FFFF","#0000FF","#9C00FF","#FF00FF"],["#F7C6CE","#FFE7CE","#FFEFC6","#D6EFD6","#CEDEE7","#CEE7F7","#D6D6E7","#E7D6DE"],["#E79C9C","#FFC69C","#FFE79C","#B5D6A5","#A5C6CE","#9CC6EF","#B5A5D6","#D6A5BD"],["#E76363","#F7AD6B","#FFD663","#94BD7B","#73A5AD","#6BADDE","#8C7BC6","#C67BA5"],["#CE0000","#E79439","#EFC631","#6BA54A","#4A7B8C","#3984C6","#634AA5","#A54A7B"],["#9C0000","#B56308","#BD9400","#397B21","#104A5A","#085294","#311873","#731842"],["#630000","#7B3900","#846300","#295218","#083139","#003163","#21104A","#4A1031"]],r=function(b){b.find(".note-color-palette").each(function(){for(var b=a(this),c=b.attr("data-target-event"),d=[],e=0,f=q.length;f>e;e++){for(var g=q[e],h=[],i=0,j=g.length;j>i;i++){var k=g[i];h.push(['<button type="button" class="note-color-btn" style="background-color:',k,';" data-event="',c,'" data-value="',k,'" title="',k,'" data-toggle="button" tabindex="-1"></button>'].join(""))}d.push("<div>"+h.join("")+"</div>")}b.html(d.join(""))})};this.createLayout=function(c,i){var j=c.next();if(!j||!j.hasClass("note-editor")){var k=a('<div class="note-editor"></div>');i.width&&k.width(i.width),i.height>0&&a('<div class="note-statusbar">'+h()+"</div>").prependTo(k);var l=!c.is(":disabled"),m=a('<div class="note-editable" contentEditable="'+l+'"></div>').prependTo(k);i.height&&m.height(i.height),i.direction&&m.attr("dir",i.direction),m.html(f.html(c)||f.emptyPara),a('<textarea class="note-codable"></textarea>').prependTo(k);for(var n=a.summernote.lang[i.lang],o="",q=0,s=i.toolbar.length;s>q;q++){var t=i.toolbar[q];o+='<div class="note-'+t[0]+' btn-group">';for(var u=0,v=t[1].length;v>u;u++)o+=b[t[1][u]](n);o+="</div>"}o='<div class="note-toolbar btn-toolbar">'+o+"</div>";var w=a(o).prependTo(k);r(w),p(w,"bottom");var x=a(d(n)).prependTo(k);p(x),a(e()).prependTo(k);var y=a(g(n,i)).prependTo(k);y.find("button.close, a.modal-close").click(function(){a(this).closest(".modal").modal("hide")}),a('<div class="note-dropzone"><div class="note-dropzone-message"></div></div>').prependTo(k),k.insertAfter(c),c.hide()}},this.layoutInfoFromHolder=function(a){var b=a.next();if(b.hasClass("note-editor")){var c=f.buildLayoutInfo(b);for(var d in c)c.hasOwnProperty(d)&&(c[d]=c[d].call());return c}},this.removeLayout=function(a){var b=this.layoutInfoFromHolder(a);b&&(a.html(b.editable.html()),b.editor.remove(),a.show())}};a.summernote=a.summernote||{},a.extend(a.summernote,g);var u=new t,v=new s;a.fn.extend({summernote:function(b){if(b=a.extend({},a.summernote.options,b),this.each(function(c,d){var e=a(d);u.createLayout(e,b);var g=u.layoutInfoFromHolder(e);v.attach(g,b),f.isTextarea(e[0])&&e.closest("form").submit(function(){e.html(e.code())})}),this.first()&&b.focus){var c=u.layoutInfoFromHolder(this.first());c.editable.focus()}return this.length>0&&b.oninit&&b.oninit(),this},code:function(b){if(void 0===b){var d=this.first();if(0===d.length)return;var e=u.layoutInfoFromHolder(d);if(e&&e.editable){var f=e.editor.hasClass("codeview");return f&&c.bCodeMirror&&e.codable.data("cmEditor").save(),f?e.codable.val():e.editable.html()}return d.html()}return this.each(function(c,d){var e=u.layoutInfoFromHolder(a(d));e&&e.editable&&e.editable.html(b)}),this},destroy:function(){return this.each(function(b,c){var d=a(c),e=u.layoutInfoFromHolder(d);e&&e.editable&&(v.dettach(e),u.removeLayout(d))}),this}})});