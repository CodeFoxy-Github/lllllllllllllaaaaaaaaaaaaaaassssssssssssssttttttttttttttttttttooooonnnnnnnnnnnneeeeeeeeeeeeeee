var e,t;let i,o,r;/**
 * SSR Window 4.0.2
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2021, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: December 13, 2021
 *//* eslint-disable no-param-reassign */function n(e){return null!==e&&"object"==typeof e&&"constructor"in e&&e.constructor===Object}function s(e={},t={}){Object.keys(t).forEach(i=>{void 0===e[i]?e[i]=t[i]:n(t[i])&&n(e[i])&&Object.keys(t[i]).length>0&&s(e[i],t[i])})}const a={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createEvent:()=>({initEvent(){}}),createElement:()=>({children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName:()=>[]}),createElementNS:()=>({}),importNode:()=>null,location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function l(){let e="undefined"!=typeof document?document:{};return s(e,a),e}const d={document:a,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia:()=>({}),requestAnimationFrame:e=>"undefined"==typeof setTimeout?(e(),null):setTimeout(e,0),cancelAnimationFrame(e){"undefined"!=typeof setTimeout&&clearTimeout(e)}};function c(){let e="undefined"!=typeof window?window:{};return s(e,d),e}/**
 * 获取指定元素的标签名（小写），不存在元素的返回空字符串
 * @param element
 */const h=e=>e?.nodeName.toLowerCase()??"",u=(e,t)=>e?.nodeName.toLowerCase()===t.toLowerCase(),p=e=>"function"==typeof e,m=e=>"string"==typeof e,f=e=>"number"==typeof e,v=e=>"boolean"==typeof e,g=e=>void 0===e,b=e=>null===e,y=e=>"undefined"!=typeof Window&&e instanceof Window,w=e=>"undefined"!=typeof Document&&e instanceof Document,k=e=>"undefined"!=typeof Element&&e instanceof Element,C=e=>"undefined"!=typeof Node&&e instanceof Node,x=e=>!p(e)&&!y(e)&&f(e.length),$=e=>"object"==typeof e&&null!==e,R=e=>w(e)?e.documentElement:e,E=e=>e.replace(/-([a-z])/g,(e,t)=>t.toUpperCase()),I=e=>e?e.replace(/^./,e[0].toLowerCase())// 首字母转小写
    .replace(/[A-Z]/g,e=>"-"+e.toLowerCase()):e,S=()=>!1,A=(e,t)=>{for(let i=0;i<e.length&&!1!==t.call(e[i],e[i],i);i+=1);return e},D=(e,t)=>{let i=Object.keys(e);for(let o=0;o<i.length;o+=1){let r=i[o];if(!1===t.call(e[r],r,e[r]))break}return e};class P{constructor(e){if(this.length=0,!e)return this;return A(e,(e,t)=>{this[t]=e}),this.length=e.length,this}}const T=(e=l())=>/complete|interactive/.test(e.readyState),M=e=>{let t=l();return t.createElement(e)},_=(e,t)=>e.appendChild(t),L=e=>e.parentNode?e.parentNode.removeChild(e):e,O=(e,t)=>{let i=M(t);return i.innerHTML=e,[].slice.call(i.childNodes)},z=(()=>{let e=function(t){if(!t)return new P;// JQ
if(t instanceof P)return t;// function
if(p(t)){let i=l();return T(i)?t.call(i,e):i.addEventListener("DOMContentLoaded",()=>t.call(i,e),{once:!0}),new P([i])}// String
if(m(t)){let e=t.trim();// 根据 HTML 字符串创建 JQ 对象
if(e.startsWith("<")&&e.endsWith(">")){let t="div";return D({li:"ul",tr:"tbody",td:"tr",th:"tr",tbody:"table",option:"select"},(i,o)=>{if(e.startsWith(`<${i}`))return t=o,!1}),new P(O(e,t))}let i=l();// 根据 CSS 选择器创建 JQ 对象
return new P(i.querySelectorAll(t))}return new P(x(t)&&!C(t)?t:[t])};return e.fn=P.prototype,e})(),B=(e,t)=>(A(t,t=>{e.push(t)}),e),V=e=>[...new Set(e)];z.fn.get=function(e){return void 0===e?[].slice.call(this):this[e>=0?e:e+this.length]},z.fn.add=function(e){return new P(V(B(this.get(),z(e).get())))};const N=(e,t,i)=>{let o=e.getAttribute(t);return b(o)?i:o},F=(e,t)=>{e.removeAttribute(t)},H=(e,t,i)=>{b(i)?F(e,t):e.setAttribute(t,i)};z.fn.each=function(e){return A(this,(t,i)=>e.call(t,i,t))},A(["add","remove","toggle"],e=>{z.fn[`${e}Class`]=function(t){return"remove"!==e||arguments.length?this.each((i,o)=>{if(!k(o))return;let r=(p(t)?t.call(o,i,N(o,"class","")):t).split(" ").filter(e=>e);A(r,t=>{o.classList[e](t)})}):this.each((e,t)=>{H(t,"class","")})}}),A(["insertBefore","insertAfter"],(e,t)=>{z.fn[e]=function(e){let i=t?z(this.get().reverse()):this,o=z(e),r=[];// 顺序和 jQuery 保持一致
return o.each((e,o)=>{o.parentNode&&i.each((i,n)=>{let s=e?n.cloneNode(!0):n,a=t?o.nextSibling:o;r.push(s),o.parentNode.insertBefore(s,a)})}),z(t?r.reverse():r)}});/**
 * 是否不是 HTML 字符串（包裹在 <> 中）
 * @param target
 */const U=e=>m(e)&&!(e.startsWith("<")&&e.endsWith(">"));function K(e,t){// eachArray 回调函数是 value, key，这里的 each 函数是 key, value
return x(e)?A(e,(e,i)=>t.call(e,i,e)):D(e,t)}function q(e,t){let i;let o=c(),r=[];return K(e,(e,n)=>{null!=(i=t.call(o,n,e))&&r.push(i)}),[].concat(...r)}A(["before","after"],(e,t)=>{z.fn[e]=function(...e){return 1===t&&(e=e.reverse()),this.each((i,o)=>{let r=p(e[0])?[e[0].call(o,i,o.innerHTML)]:e;A(r,e=>{(U(e)?z(O(e,"div")):i&&k(e)?z(e.cloneNode(!0)):z(e))[t?"insertAfter":"insertBefore"](o)})})}}),z.fn.map=function(e){return new P(q(this,(t,i)=>e.call(t,i,t)))},z.fn.clone=function(){return this.map(function(){return this.cloneNode(!0)})},z.fn.is=function(e){let t=!1;if(p(e))return this.each((i,o)=>{e.call(o,i,o)&&(t=!0)}),t;if(m(e))return this.each((i,o)=>{!(w(o)||y(o))&&o.matches.call(o,e)&&(t=!0)}),t;let i=z(e);return this.each((e,o)=>{i.each((e,i)=>{o===i&&(t=!0)})}),t},z.fn.remove=function(e){return this.each((t,i)=>{(!e||z(i).is(e))&&L(i)})},A(["prepend","append"],(e,t)=>{z.fn[e]=function(...e){return this.each((i,o)=>{let r=o.childNodes,n=r.length,s=n?r[t?n-1:0]:M("div");n||_(o,s);let a=p(e[0])?[e[0].call(o,i,o.innerHTML)]:e;i&&(a=a.map(e=>m(e)?e:z(e).clone())),z(s)[t?"after":"before"](...a),n||L(s)})}}),A(["appendTo","prependTo"],(e,t)=>{z.fn[e]=function(e){let i=[],o=z(e).map((e,o)=>{let r=o.childNodes,n=r.length;if(n)return r[t?0:n-1];let s=M("div");return _(o,s),i.push(s),s}),r=this[t?"insertBefore":"insertAfter"](o);return z(i).remove(),r}});const j=(e,t)=>{let i=c();return i.getComputedStyle(e).getPropertyValue(I(t))},W=e=>"border-box"===j(e,"box-sizing"),Y=(e,t,i)=>{let o="width"===t?["Left","Right"]:["Top","Bottom"];return[0,1].reduce((t,r,n)=>{let s=i+o[n];return"border"===i&&(s+="Width"),t+parseFloat(j(e,s)||"0")},0)},G=(e,t)=>{// width、height 属性使用 getComputedStyle 得到的值不准确，需要使用 getBoundingClientRect 获取
if("width"===t||"height"===t){let i=e.getBoundingClientRect()[t];return W(e)?`${i}px`:`${i-Y(e,t,"border")-Y(e,t,"padding")}px`}return j(e,t)},X=["animation-iteration-count","column-count","fill-opacity","flex-grow","flex-shrink","font-weight","grid-area","grid-column","grid-column-end","grid-column-start","grid-row","grid-row-end","grid-row-start","line-height","opacity","order","orphans","widows","z-index","zoom"];A(["attr","prop","css"],(e,t)=>{// eslint-disable-next-line
let i=(e,i,o)=>{// 值为 undefined 时，不修改
if(!g(o)){// attr
if(0===t)return H(e,i,o);// prop
if(1===t){// @ts-ignore
e[i]=o;return}// css
i=I(i),e.style.setProperty(i,f(o)?`${o}${i.startsWith("--")||X.includes(i)?"":"px"}`:o)}},o=(e,i)=>// attr
    0===t?N(e,i):1===t?e[i]:G(e,i);z.fn[e]=function(t,r){if($(t))return D(t,(t,i)=>{// @ts-ignore
this[e](t,i)}),this;if(1==arguments.length){let e=this[0];return k(e)?o(e,t):void 0}return this.each((e,n)=>{i(n,t,p(r)?r.call(n,e,o(n,t)):r)})}}),z.fn.children=function(e){let t=[];return this.each((i,o)=>{A(o.childNodes,i=>{k(i)&&(!e||z(i).is(e))&&t.push(i)})}),new P(V(t))},z.fn.slice=function(...e){return new P([].slice.apply(this,e))},z.fn.eq=function(e){let t=-1===e?this.slice(e):this.slice(e,+e+1);return new P(t)};const J=(e,t,i,o,r)=>{let n;let s=[];return e.each((e,a)=>{// 不能包含最顶层的 document 元素
for(n=a[i];n&&k(n);){// prevUntil, nextUntil, parentsUntil
if(2===t){if(o&&z(n).is(o))break;(!r||z(n).is(r))&&s.push(n)}else if(0===t){(!o||z(n).is(o))&&s.push(n);break}else(!o||z(n).is(o))&&s.push(n);n=n[i]}}),new P(V(s))};A(["","s","sUntil"],(e,t)=>{z.fn[`parent${e}`]=function(e,i){// parents、parentsUntil 需要把元素的顺序反向处理，以便和 jQuery 的结果一致
let o=t?z(this.get().reverse()):this;return J(o,t,"parentNode",e,i)}}),z.fn.closest=function(e){if(this.is(e))return this;let t=[];return this.parents().each((i,o)=>{if(z(o).is(e))return t.push(o),!1}),new P(t)};const Z=new WeakMap,Q=e=>Z.get(e)??{},ee=(e,t)=>{let i=Q(e),o=E(t);return o in i?i[o]:void 0},et=(e,t)=>{let i=Q(e);D(t,(e,t)=>{i[E(e)]=t}),Z.set(e,i)},ei=(e,t,i)=>{et(e,{[t]:i})},eo=e=>{Z.delete(e)},er=(e,t)=>{let i=Q(e);A(t,e=>{let t=E(e);delete i[t]}),Z.set(e,i)},en=/^(?:{[\w\W]*\}|\[[\w\W]*\])$/,es=e=>"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:en.test(e)?JSON.parse(e):e),ea=(e,t,i)=>{if(g(i)&&1===e.nodeType&&m(i=e.dataset[t]))try{i=es(i)}catch(e){}return i};z.fn.data=function(e,t){// 获取所有值
if(g(e)){if(!this.length)return;let e=this[0],t=Q(e);return 1!==e.nodeType||D(e.dataset,i=>{t[i]=ea(e,i,t[i])}),t}return(// 同时设置多个值
$(e)?this.each(function(){et(this,e)}):2==arguments.length&&g(t)?this:g(t)?this.length?ea(this[0],E(e),ee(this[0],e)):void 0:this.each(function(){ei(this,e,t)}))},z.fn.empty=function(){return this.each((e,t)=>{t.innerHTML=""})},z.fn.extend=function(e){return D(e,(e,t)=>{z.fn[e]=t}),this},z.fn.filter=function(e){if(p(e))return this.map((t,i)=>e.call(i,t,i)?i:void 0);if(m(e))return this.map((t,i)=>z(i).is(e)?i:void 0);let t=z(e);return this.map((e,i)=>t.get().includes(i)?i:void 0)},z.fn.find=function(e){let t=[];return this.each((i,o)=>{B(t,z(o.querySelectorAll(e)).get())}),new P(t)},z.fn.first=function(){return this.eq(0)};const el=(e,t)=>e!==t&&R(e).contains(t);z.fn.has=function(e){let t=m(e)?this.find(e):z(e),{length:i}=t;return this.map(function(){for(let e=0;e<i;e+=1)if(el(this,t[e]))return this})},z.fn.hasClass=function(e){return this[0].classList.contains(e)};/**
 * 值上面的 padding、border、margin 处理
 * @param element
 * @param name
 * @param value
 * @param funcIndex
 * @param includeMargin
 * @param multiply
 */const ed=(e,t,i,o,r,n)=>{// 获取元素的 padding, border, margin 宽度（两侧宽度的和）
let s=i=>Y(e,t.toLowerCase(),i)*n;return 2===o&&r&&(i+=s("margin")),W(e)?(0===o&&(i-=s("border")),1===o&&(i-=s("border"),i-=s("padding"))):(0===o&&(i+=s("padding")),2===o&&(i+=s("border")+s("padding"))),i},ec=(e,t,i,o)=>{let r=l(),n=`client${t}`,s=`scroll${t}`,a=`offset${t}`,d=`inner${t}`;// $(window).width()
if(y(e))return 2===i?e[d]:R(r)[n];// $(document).width()
if(w(e)){let t=R(e);return Math.max(e.body[s],t[s],e.body[a],t[a],t[n])}let c=parseFloat(j(e,t.toLowerCase())||"0");return ed(e,t,c,i,o,1)},eh=(e,t,i,o,r,n)=>{let s=p(n)?n.call(e,t,ec(e,i,o,r)):n;if(null==s)return;let a=z(e),l=i.toLowerCase();// 特殊的值，不需要计算 padding、border、margin
if(m(s)&&["auto","inherit",""].includes(s)){a.css(l,s);return}// 其他值保留原始单位。注意：如果不使用 px 作为单位，则算出的值一般是不准确的
let d=s.toString().replace(/\b[0-9.]*/,""),c=parseFloat(s);s=ed(e,i,c,o,r,-1)+(d||"px"),a.css(l,s)};A(["Width","Height"],e=>{A([`inner${e}`,e.toLowerCase(),`outer${e}`],(t,i)=>{z.fn[t]=function(t,o){// 是否是赋值操作
let r=arguments.length&&(i<2||!v(t)),n=!0===t||!0===o;return(// 获取第一个元素的值
r?this.each((o,r)=>eh(r,o,e,i,n,t)):this.length?ec(this[0],e,i,n):void 0)}})}),z.fn.hide=function(){return this.each((e,t)=>{t.style.display="none"})},A(["val","html","text"],(e,t)=>{let i=["value","innerHTML","textContent"][t],o=e=>{// text() 获取所有元素的文本
if(2===t)return q(e,e=>R(e)[i]).join("");// 空集合时，val() 和 html() 返回 undefined
if(!e.length)return;// val() 和 html() 仅获取第一个元素的内容
let o=e[0],r=z(o);return(// select multiple 返回数组
0===t&&r.is("select[multiple]")?q(r.find("option:checked"),e=>e.value):o[i])},r=(e,o)=>{// text() 和 html() 赋值为 undefined，则保持原内容不变
// val() 赋值为 undefined 则赋值为空
if(g(o)){if(0!==t)return;o=""}1===t&&k(o)&&(o=o.outerHTML),// @ts-ignore
e[i]=o};z.fn[e]=function(e){return(// 获取值
arguments.length?this.each((i,n)=>{let s=z(n),a=p(e)?e.call(n,i,o(s)):e;// value 是数组，则选中数组中的元素，反选不在数组中的元素
0===t&&Array.isArray(a)?s.is("select[multiple]")?q(s.find("option"),e=>e.selected=a.includes(e.value)):n.checked=a.includes(n.value):r(n,a)}):o(this))}}),z.fn.index=function(e){return arguments.length?m(e)?z(e).get().indexOf(this[0]):this.get().indexOf(z(e)[0]):this.eq(0).parent().children().get().indexOf(this[0])},z.fn.last=function(){return this.eq(-1)},A(["","All","Until"],(e,t)=>{z.fn[`next${e}`]=function(e,i){return J(this,t,"nextElementSibling",e,i)}}),z.fn.not=function(e){let t=this.filter(e);return this.map((e,i)=>t.index(i)>-1?void 0:i)};// @ts-ignore 直接使用 CustomEvent 在 ssr 环境下会报错
const eu=c().CustomEvent;class ep extends eu{constructor(e,t){super(e,t),this.data=t.data,this.namespace=t.namespace}}const em=new WeakMap;let ef=1;/**
 * 为元素赋予一个唯一的ID
 */const ev=e=>(em.has(e)||em.set(e,++ef),em.get(e)),eg=new Map,eb=e=>{let t=ev(e);return eg.get(t)||eg.set(t,[]).get(t)},ey=e=>{let t=e.split(".");return{type:t[0],namespace:t.slice(1).sort().join(" ")}},ew=e=>RegExp("(?:^| )"+e.replace(" "," .* ?")+"(?: |$)"),ek=(e,t,i,o)=>{let r=ey(t);return eb(e).filter(e=>e&&(!r.type||e.type===r.type)&&(!r.namespace||ew(r.namespace).test(e.namespace))&&(!i||ev(e.func)===ev(i))&&(!o||e.selector===o))},eC=(e,t,i,o,r)=>{// 传入 data.useCapture 来设置 useCapture: true
let n=!1;$(o)&&o.useCapture&&(n=!0),t.split(" ").forEach(t=>{if(!t)return;let s=ey(t),a=(e,t)=>{let o=i.apply(t,null===e.detail?[e]:[e].concat(e.detail));!1===o&&(e.preventDefault(),e.stopPropagation())},l=t=>{(!t.namespace||ew(t.namespace).test(s.namespace))&&(t.data=o,r?z(e).find(r).get().reverse().forEach(e=>{(e===t.target||el(e,t.target))&&a(t,e)}):a(t,e))},d={type:s.type,namespace:s.namespace,func:i,selector:r,id:eb(e).length,proxy:l};eb(e).push(d),// @ts-ignore
e.addEventListener(d.type,l,n)})},ex=(e,t,i,o)=>{let r=eb(e),n=t=>{delete r[t.id],// @ts-ignore
e.removeEventListener(t.type,t.proxy,!1)};t?t.split(" ").forEach(t=>{t&&ek(e,t,i,o).forEach(e=>{n(e)})}):r.forEach(e=>{n(e)})};function e$(e,...t){return A(t,t=>{D(t,(t,i)=>{g(i)||(e[t]=i)})}),e}z.fn.off=function(e,t,i){return(// types 是对象
$(e)?(D(e,(e,i)=>{// this.off('click', undefined, function () {})
// this.off('click', '.box', function () {})
this.off(e,t,i)}),this):((!1===t||p(t))&&(i=t,t=void 0),!1===i&&(i=S),this.each(function(){ex(this,e,i,t)})))},z.fn.offsetParent=function(){let e=l();return this.map(function(){let t=this.offsetParent;for(;t&&"static"===z(t).css("position");)t=t.offsetParent;return t||e.documentElement})};const eR=(e,t)=>parseFloat(e.css(t));z.fn.position=function(){let e;if(!this.length)return;let t=this.eq(0),i={left:0,top:0};if("fixed"===t.css("position"))e=t[0].getBoundingClientRect();else{e=t.offset();let o=t.offsetParent();i=o.offset(),i.top+=eR(o,"border-top-width"),i.left+=eR(o,"border-left-width")}return{top:e.top-i.top-eR(t,"margin-top"),left:e.left-i.left-eR(t,"margin-left")}};const eE=e=>{if(!e.getClientRects().length)return{top:0,left:0};let{top:t,left:i}=e.getBoundingClientRect(),{pageYOffset:o,pageXOffset:r}=e.ownerDocument.defaultView;return{top:t+o,left:i+r}},eI=(e,t,i)=>{let o,r;let n=z(e),s=n.css("position");"static"===s&&n.css("position","relative");let a=eE(e),l=n.css("top"),d=n.css("left"),c=("absolute"===s||"fixed"===s)&&(l+d).includes("auto");if(c){let e=n.position();o=e.top,r=e.left}else o=parseFloat(l),r=parseFloat(d);let h=p(t)?t.call(e,i,e$({},a)):t;n.css({top:null!=h.top?h.top-a.top+o:void 0,left:null!=h.left?h.left-a.left+r:void 0})};z.fn.offset=function(e){// 获取坐标
if(!arguments.length){if(!this.length)return;return eE(this[0])}// 设置坐标
return this.each(function(t){eI(this,e,t)})},z.fn.on=function(e,t,i,o,r){// types 可以是 type/func 对象
if($(e))return m(t)||(// (types-Object, data)
i=i||t,t=void 0),D(e,(e,o)=>{// selector 和 data 都可能是 undefined
// @ts-ignore
this.on(e,t,i,o,r)}),this;if(null==i&&null==o?(// (types, fn)
o=t,i=t=void 0):null==o&&(m(t)?(// (types, selector, fn)
o=i,i=void 0):(// (types, data, fn)
o=i,i=t,t=void 0)),!1===o)o=S;else if(!o)return this;// $().one()
if(r){// eslint-disable-next-line @typescript-eslint/no-this-alias
let e=this,i=o;o=function(r,...n){return e.off(r.type,t,o),i.call(this,r,...n)}}return this.each(function(){eC(this,e,o,i,t)})},z.fn.one=function(e,t,i,o){// @ts-ignore
return this.on(e,t,i,o,!0)},A(["","All","Until"],(e,t)=>{z.fn[`prev${e}`]=function(e,i){// prevAll、prevUntil 需要把元素的顺序倒序处理，以便和 jQuery 的结果一致
let o=t?z(this.get().reverse()):this;return J(o,t,"previousElementSibling",e,i)}}),z.fn.removeAttr=function(e){let t=e.split(" ").filter(e=>e);return this.each(function(){A(t,e=>{F(this,e)})})};const eS=(e,t)=>{if(g(t))return eo(e);let i=m(t)?t.split(" ").filter(e=>e):t;er(e,i)};z.fn.removeData=function(e){return this.each((t,i)=>{eS(i,e)})},z.fn.removeProp=function(e){return this.each((t,i)=>{try{// @ts-ignore
delete i[e]}catch(e){}})},z.fn.replaceWith=function(e){return this.each((t,i)=>{let o=e;p(o)?o=o.call(i,t,i.innerHTML):t&&!m(o)&&(o=z(o).clone()),z(i).before(o)}),this.remove()},z.fn.replaceAll=function(e){return z(e).map((e,t)=>(z(t).replaceWith(e?this.clone():this),this.get()))};const eA=e=>{if(!$(e)&&!Array.isArray(e))return"";let t=[],i=(e,o)=>{let r;$(o)?D(o,(t,n)=>{r=Array.isArray(o)&&!$(n)?"":t,i(`${e}[${r}]`,n)}):(r=null==o||""===o?"=":`=${encodeURIComponent(o)}`,t.push(encodeURIComponent(e)+r))};return Array.isArray(e)?A(e,({name:e,value:t})=>i(e,t)):D(e,i),t.join("&")},eD=new WeakMap,eP=e=>{let t=[...e.elements],i=eD.get(e)||[];// 按 DOM 元素的顺序排序
return[...t,...i].sort((e,t)=>{let i=e.compareDocumentPosition(t);return i&Node.DOCUMENT_POSITION_FOLLOWING?-1:1})},eT=e=>{let t=[];return e.each((e,i)=>{let o=i instanceof HTMLFormElement?eP(i):[i];z(o).each((e,i)=>{let o=z(i),r=i.type,n=i.nodeName.toLowerCase();"fieldset"!==n&&i.name&&!i.disabled&&["input","select","textarea","keygen","mdui-checkbox","mdui-radio-group","mdui-switch","mdui-text-field","mdui-select","mdui-slider","mdui-range-slider","mdui-segmented-button-group"].includes(n)&&!["submit","button","image","reset","file"].includes(r)&&(!["radio","checkbox"].includes(r)||i.checked)&&(!["mdui-checkbox","mdui-switch"].includes(n)||i.checked)&&t.push({name:i.name,value:o.val()})})}),t};z.fn.serializeArray=function(){return eT(this).map(e=>Array.isArray(e.value)?e.value.map(t=>({name:e.name,value:t})):e).flat()},z.fn.serialize=function(){return eA(this.serializeArray())},z.fn.serializeObject=function(){let e={};return eT(this).forEach(t=>{let{name:i,value:o}=t;if(e.hasOwnProperty(i)){let t=e[i];Array.isArray(t)||(e[i]=[t]),Array.isArray(o)?e[i].push(...o):e[i].push(o)}else e[i]=o}),e};const eM={},e_=e=>{let t,i;let o=l();return eM[e]||(t=M(e),_(o.body,t),i=G(t,"display"),L(t),"none"===i&&(i="block"),eM[e]=i),eM[e]};z.fn.show=function(){return this.each((e,t)=>{"none"===t.style.display&&(t.style.display=""),"none"===G(t,"display")&&(t.style.display=e_(t.nodeName))})},z.fn.siblings=function(e){return this.prevAll(e).add(this.nextAll(e))},z.fn.toggle=function(){return this.each((e,t)=>{"none"===G(t,"display")?z(t).show():z(t).hide()})},z.fn.trigger=function(e,t=null,i){let{type:o,namespace:r}=ey(e),n=new ep(o,{detail:t,data:null,namespace:r,bubbles:!0,cancelable:!1,composed:!0,...i});return this.each((e,t)=>{t.dispatchEvent(n)})};const eL="ajaxSuccess",eO="ajaxError",ez="ajaxComplete",eB={},eV=e=>["GET","HEAD"].includes(e),eN=(e,t)=>`${e}&${t}`.replace(/[&?]{1,2}/,"?"),eF=e=>{let t=c();return/^([\w-]+:)?\/\/([^/]+)/.test(e)&&RegExp.$2!==t.location.host},eH=e=>e>=200&&e<300||[0,304].includes(e),eU=e=>{// 默认参数
let t={url:"",method:"GET",data:"",processData:!0,async:!0,cache:!0,username:"",password:"",headers:{},xhrFields:{},statusCode:{},dataType:"",contentType:"application/x-www-form-urlencoded",timeout:0,global:!0};return D(eB,(e,i)=>{["beforeSend","success","error","complete","statusCode"].includes(e)||g(i)||(t[e]=i)}),e$({},t,e)},eK=e=>{let t;let i=l(),o=c(),r=!1,n={},s={},a=eU(e),d=a.method.toUpperCase(),{data:h,url:u}=a;u=u||o.location.toString();let{processData:p,async:f,cache:v,username:b,password:y,headers:w,xhrFields:k,statusCode:C,dataType:x,contentType:$,timeout:R,global:E}=a,I=eV(d);!h||!I&&!p||m(h)||h instanceof ArrayBuffer||h instanceof Blob||h instanceof Document||h instanceof FormData||(h=eA(h)),h&&I&&(// 查询字符串拼接到 URL 中
u=eN(u,h),h=null);/**
     * 触发事件和回调函数
     * @param event
     * @param callback
     * @param args
     */let S=(e,t,...o)=>{let l,d;E&&z(i).trigger(e,"success"===t?s:n),t in eB&&(l=eB[t](...o)),a[t]&&(d=a[t](...o)),"beforeSend"===t&&[l,d].includes(!1)&&(r=!0)};return new Promise((e,i)=>{let l;let c=e=>i(Error(e));I&&!v&&(u=eN(u,`_=${Date.now()}`));// 创建 XHR
let p=new XMLHttpRequest;if(p.open(d,u,f,b,y),($||h&&!I&&!1!==$)&&p.setRequestHeader("Content-Type",$),"json"===x&&p.setRequestHeader("Accept","application/json, text/javascript"),D(w,(e,t)=>{// undefined 值不发送，string 和 null 需要发送
g(t)||p.setRequestHeader(e,t+"");// 把 null 转换成字符串
}),eF(u)||p.setRequestHeader("X-Requested-With","XMLHttpRequest"),D(k,(e,t)=>{p[e]=t}),n.xhr=s.xhr=p,n.options=s.options=a,p.onload=()=>{let i;l&&clearTimeout(l);// AJAX 返回的 HTTP 响应码是否表示成功
let o=eH(p.status);if(o){if(t=204===p.status||"HEAD"===d?"nocontent":304===p.status?"notmodified":"success","json"===x||!x&&(p.getResponseHeader("content-type")||"").includes("json")){try{i="HEAD"===d?void 0:JSON.parse(p.responseText),s.response=i}catch(e){S(eO,"error",p,t="parsererror"),c(t)}"parsererror"!==t&&(S(eL,"success",i,t,p),e(i))}else i="HEAD"===d?void 0:"text"===p.responseType||""===p.responseType?p.responseText:p.response,s.response=i,S(eL,"success",i,t,p),e(i)}else S(eO,"error",p,t="error"),c(t);A([eB.statusCode??{},C],e=>{e[p.status]&&(o?e[p.status](i,t,p):e[p.status](p,t))}),S(ez,"complete",p,t)},p.onerror=()=>{l&&clearTimeout(l),S(eO,"error",p,p.statusText),S(ez,"complete",p,"error"),c(p.statusText)},p.onabort=()=>{let e="abort";l&&(e="timeout",clearTimeout(l)),S(eO,"error",p,e),S(ez,"complete",p,e),c(e)},// ajax start 回调
S("ajaxStart","beforeSend",p,a),r)return c("cancel");R>0&&(l=o.setTimeout(()=>p.abort(),R)),// 发送 XHR
p.send(h)})};function eq(e,t,i,o){var r,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(s=(n<3?r(s):n>3?r(t,i,s):r(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s}z.ajax=eK,z.ajaxSetup=e=>e$(eB,e),z.contains=el,z.data=function(e,t,i){return(// 根据键值对设置值
// data(element, { 'key' : 'value' })
$(t)?(et(e,t),t):g(i)?g(t)?Q(e):ee(e,t):(ei(e,t,i),i))},z.each=K,z.extend=function(e,...t){return t.length?e$(e,...t):(D(e,(e,t)=>{this[e]=t}),this)},z.map=q,z.merge=B,z.param=eA,z.removeData=eS,z.unique=V,"function"==typeof SuppressedError&&SuppressedError;/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ej=globalThis,eW=ej.ShadowRoot&&(void 0===ej.ShadyCSS||ej.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,eY=Symbol(),eG=new WeakMap;class eX{constructor(e,t,i){if(this._$cssResult$=!0,i!==eY)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(eW&&void 0===e){let i=void 0!==t&&1===t.length;i&&(e=eG.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&eG.set(t,e))}return e}toString(){return this.cssText}}const eJ=e=>new eX("string"==typeof e?e:e+"",void 0,eY),eZ=(e,...t)=>{let i=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new eX(i,e,eY)},eQ=(e,t)=>{if(eW)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let i of t){let t=document.createElement("style"),o=ej.litNonce;void 0!==o&&t.setAttribute("nonce",o),t.textContent=i.cssText,e.appendChild(t)}},e0=eW?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return eJ(t)})(e):e,{is:e1,defineProperty:e2,getOwnPropertyDescriptor:e5,getOwnPropertyNames:e4,getOwnPropertySymbols:e3,getPrototypeOf:e8}=Object,e7=globalThis,e6=e7.trustedTypes,e9=e6?e6.emptyScript:"",te=e7.reactiveElementPolyfillSupport,tt=(e,t)=>e,ti={toAttribute(e,t){switch(t){case Boolean:e=e?e9:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},to=(e,t)=>!e1(e,t),tr={attribute:!0,type:String,converter:ti,reflect:!1,hasChanged:to};Symbol.metadata??=Symbol("metadata"),e7.litPropertyMetadata??=new WeakMap;class tn extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=tr){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&e2(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){let{get:o,set:r}=e5(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get(){return o?.call(this)},set(t){let n=o?.call(this);r.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??tr}static _$Ei(){if(this.hasOwnProperty(tt("elementProperties")))return;let e=e8(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(tt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(tt("properties"))){let e=this.properties,t=[...e4(e),...e3(e)];for(let i of t)this.createProperty(i,e[i])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,i]of t)this.elementProperties.set(e,i)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let e of i)t.unshift(e0(e))}else void 0!==e&&t.push(e0(e));return t}static _$Eu(e,t){let i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$ES(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$E_??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$E_?.delete(e)}_$ES(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return eQ(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$E_?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$E_?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t){let i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){let r=(void 0!==i.converter?.toAttribute?i.converter:ti).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){let e=i.getPropertyOptions(o),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:ti;this._$Em=o,this[o]=r.fromAttribute(t,e.type),this._$Em=null}}requestUpdate(e,t,i,o=!1,r){if(void 0!==e){if(!((i??=this.constructor.getPropertyOptions(e)).hasChanged??to)(o?r:this[e],t))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,i]of e)!0!==i.wrapped||this._$AL.has(t)||void 0===this[t]||this.C(t,this[t],i)}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$E_?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$ET()}catch(t){throw e=!1,this._$ET(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$E_?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach(e=>this._$EO(e,this[e])),this._$ET()}updated(e){}firstUpdated(e){}}tn.elementStyles=[],tn.shadowRootOptions={mode:"open"},tn[tt("elementProperties")]=new Map,tn[tt("finalized")]=new Map,te?.({ReactiveElement:tn}),(e7.reactiveElementVersions??=[]).push("2.0.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ts=globalThis,ta=ts.trustedTypes,tl=ta?ta.createPolicy("lit-html",{createHTML:e=>e}):void 0,td="$lit$",tc=`lit$${(Math.random()+"").slice(9)}$`,th="?"+tc,tu=`<${th}>`,tp=document,tm=()=>tp.createComment(""),tf=e=>null===e||"object"!=typeof e&&"function"!=typeof e,tv=Array.isArray,tg=e=>tv(e)||"function"==typeof e?.[Symbol.iterator],tb="[ 	\n\f\r]",ty=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tw=/-->/g,tk=/>/g,tC=RegExp(`>|${tb}(?:([^\\s"'>=/]+)(${tb}*=${tb}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),tx=/'/g,t$=/"/g,tR=/^(?:script|style|textarea|title)$/i,tE=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),tI=tE(1),tS=(tE(2),Symbol.for("lit-noChange")),tA=Symbol.for("lit-nothing"),tD=new WeakMap,tP=tp.createTreeWalker(tp,129);function tT(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==tl?tl.createHTML(t):t}const tM=(e,t)=>{let i=e.length-1,o=[],r,n=2===t?"<svg>":"",s=ty;for(let t=0;t<i;t++){let i=e[t],a,l,d=-1,c=0;for(;c<i.length&&(s.lastIndex=c,null!==(l=s.exec(i)));)c=s.lastIndex,s===ty?"!--"===l[1]?s=tw:void 0!==l[1]?s=tk:void 0!==l[2]?(tR.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=tC):void 0!==l[3]&&(s=tC):s===tC?">"===l[0]?(s=r??ty,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?tC:'"'===l[3]?t$:tx):s===t$||s===tx?s=tC:s===tw||s===tk?s=ty:(s=tC,r=void 0);let h=s===tC&&e[t+1].startsWith("/>")?" ":"";n+=s===ty?i+tu:d>=0?(o.push(a),i.slice(0,d)+td+i.slice(d)+tc+h):i+tc+(-2===d?t:h)}return[tT(e,n+(e[i]||"<?>")+(2===t?"</svg>":"")),o]};class t_{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,n=0,s=e.length-1,a=this.parts,[l,d]=tM(e,t);if(this.el=t_.createElement(l,i),tP.currentNode=this.el.content,2===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=tP.nextNode())&&a.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(let e of o.getAttributeNames())if(e.endsWith(td)){let t=d[n++],i=o.getAttribute(e).split(tc),s=/([.?@])?(.*)/.exec(t);a.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?tV:"?"===s[1]?tN:"@"===s[1]?tF:tB}),o.removeAttribute(e)}else e.startsWith(tc)&&(a.push({type:6,index:r}),o.removeAttribute(e));if(tR.test(o.tagName)){let e=o.textContent.split(tc),t=e.length-1;if(t>0){o.textContent=ta?ta.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],tm()),tP.nextNode(),a.push({type:2,index:++r});o.append(e[t],tm())}}}else if(8===o.nodeType){if(o.data===th)a.push({type:2,index:r});else{let e=-1;for(;-1!==(e=o.data.indexOf(tc,e+1));)a.push({type:7,index:r}),e+=tc.length-1}}r++}}static createElement(e,t){let i=tp.createElement("template");return i.innerHTML=e,i}}function tL(e,t,i=e,o){if(t===tS)return t;let r=void 0!==o?i._$Co?.[o]:i._$Cl,n=tf(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(e))._$AT(e,i,o),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(t=tL(e,r._$AS(e,t.values),r,o)),t}class tO{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??tp).importNode(t,!0);tP.currentNode=o;let r=tP.nextNode(),n=0,s=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new tz(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new tH(r,this,e)),this._$AV.push(t),a=i[++s]}n!==a?.index&&(r=tP.nextNode(),n++)}return tP.currentNode=tp,o}p(e){let t=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class tz{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=tA,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){tf(e=tL(this,e,t))?e===tA||null==e||""===e?(this._$AH!==tA&&this._$AR(),this._$AH=tA):e!==this._$AH&&e!==tS&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):tg(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==tA&&tf(this._$AH)?this._$AA.nextSibling.data=e:this.$(tp.createTextNode(e)),this._$AH=e}g(e){let{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=t_.createElement(tT(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{let e=new tO(o,this),i=e.u(this.options);e.p(t),this.$(i),this._$AH=e}}_$AC(e){let t=tD.get(e.strings);return void 0===t&&tD.set(e.strings,t=new t_(e)),t}T(e){tv(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,o=0;for(let r of e)o===t.length?t.push(i=new tz(this.k(tm()),this.k(tm()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class tB{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,r){this.type=1,this._$AH=tA,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=tA}_$AI(e,t=this,i,o){let r=this.strings,n=!1;if(void 0===r)(n=!tf(e=tL(this,e,t,0))||e!==this._$AH&&e!==tS)&&(this._$AH=e);else{let o,s;let a=e;for(e=r[0],o=0;o<r.length-1;o++)(s=tL(this,a[i+o],t,o))===tS&&(s=this._$AH[o]),n||=!tf(s)||s!==this._$AH[o],s===tA?e=tA:e!==tA&&(e+=(s??"")+r[o+1]),this._$AH[o]=s}n&&!o&&this.O(e)}O(e){e===tA?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class tV extends tB{constructor(){super(...arguments),this.type=3}O(e){this.element[this.name]=e===tA?void 0:e}}class tN extends tB{constructor(){super(...arguments),this.type=4}O(e){this.element.toggleAttribute(this.name,!!e&&e!==tA)}}class tF extends tB{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){if((e=tL(this,e,t,0)??tA)===tS)return;let i=this._$AH,o=e===tA&&i!==tA||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==tA&&(i===tA||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class tH{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){tL(this,e)}}const tU=ts.litHtmlPolyfillSupport;tU?.(t_,tz),(ts.litHtmlVersions??=[]).push("3.1.0");const tK=(e,t,i)=>{let o=i?.renderBefore??t,r=o._$litPart$;if(void 0===r){let e=i?.renderBefore??null;o._$litPart$=r=new tz(t.insertBefore(tm(),e),e,void 0,i??{})}return r._$AI(e),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class tq extends tn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tK(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tS}}tq._$litElement$=!0,tq.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:tq});const tj=globalThis.litElementPolyfillSupport;tj?.({LitElement:tq}),(globalThis.litElementVersions??=[]).push("4.0.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tW=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},tY={attribute:!0,type:String,converter:ti,reflect:!1,hasChanged:to},tG=(e=tY,t,i)=>{let{kind:o,metadata:r}=i,n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),n.set(i.name,e),"accessor"===o){let{name:o}=i;return{set(i){let r=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,r,e)},init(t){return void 0!==t&&this.C(o,void 0,e),t}}}if("setter"===o){let{name:o}=i;return function(i){let r=this[o];t.call(this,i),this.requestUpdate(o,r,e)}}throw Error("Unsupported decorator location: "+o)};function tX(e){return(t,i)=>"object"==typeof i?tG(e,t,i):((e,t,i)=>{let o=t.hasOwnProperty(i);return t.constructor.createProperty(i,o?{...e,wrapped:!0}:e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function tJ(e){return tX({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tZ=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function tQ(e){return(t,i)=>{let{slot:o,selector:r}=e??{},n="slot"+(o?`[name=${o}]`:":not([name])");return tZ(t,i,{get(){let t=this.renderRoot?.querySelector(n),i=t?.assignedElements(e)??[];return void 0===r?i:i.filter(e=>e.matches(r))}})}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t0=e=>e??tA,t1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,ELEMENT:6},t2=e=>(...t)=>({_$litDirective$:e,values:t});class t5{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t4="important",t3=" !"+t4,t8=t2(class extends t5{constructor(e){if(super(e),e.type!==t1.ATTRIBUTE||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{let o=e[i];return null==o?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(e,[t]){let{style:i}=e.element;if(void 0===this.ut)return this.ut=new Set(Object.keys(t)),this.render(t);for(let e of this.ut)null==t[e]&&(this.ut.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(let e in t){let o=t[e];if(null!=o){this.ut.add(e);let t="string"==typeof o&&o.endsWith(t3);e.includes("-")||t?i.setProperty(e,t?o.slice(0,-11):o,t?t4:""):i[e]=o}}return tS}});class t7 extends tq{/**
     * 触发自定义事件。若返回 false，表示事件被取消
     * @param type
     * @param options 通常只用到 cancelable 和 detail；bubbles、composed 统一不用
     */emit(e,t){let i=new CustomEvent(e,Object.assign({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(i)}}class t6{constructor(e,...t){this.slotNames=[],(this.host=e).addController(this),this.slotNames=t,this.onSlotChange=this.onSlotChange.bind(this)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.onSlotChange),T()||z(()=>{this.host.requestUpdate()})}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.onSlotChange)}test(e){return"[default]"===e?this.hasDefaultSlot():this.hasNamedSlot(e)}hasDefaultSlot(){return[...this.host.childNodes].some(e=>!((e.nodeType!==e.TEXT_NODE||""===e.textContent.trim())&&(e.nodeType!==e.ELEMENT_NODE||e.hasAttribute("slot"))))}hasNamedSlot(e){return null!==this.host.querySelector(`:scope > [slot="${e}"]`)}onSlotChange(e){let t=e.target;(this.slotNames.includes("[default]")&&!t.name||t.name&&this.slotNames.includes(t.name))&&this.host.requestUpdate()}}const t9=tI`${tA}`,ie=eZ`:host{box-sizing:border-box}:host *,:host ::after,:host ::before{box-sizing:inherit}:host :focus,:host :focus-visible,:host(:focus),:host(:focus-visible){outline:0}[hidden]{display:none!important}`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class it extends t5{constructor(e){if(super(e),this.et=tA,e.type!==t1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===tA||null==e)return this.vt=void 0,this.et=e;if(e===tS)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.vt;this.et=e;let t=[e];return t.raw=t,this.vt={_$litType$:this.constructor.resultType,strings:t,values:[]}}}it.directiveName="unsafeHTML",it.resultType=1,t2(it);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ii extends it{}ii.directiveName="unsafeSVG",ii.resultType=2;const io=t2(ii),{D:ir}={j:td,P:tc,A:th,C:1,M:tM,L:tO,R:tg,V:tL,D:tz,I:tB,H:tN,N:tF,U:tV,B:tH},is=e=>null===e||"object"!=typeof e&&"function"!=typeof e,ia=e=>void 0===e.strings,il={},id=(e,t=il)=>e._$AH=t,ic=(e,t)=>{let i=e._$AN;if(void 0===i)return!1;for(let e of i)e._$AO?.(t,!1),ic(e,t);return!0},ih=e=>{let t,i;do{if(void 0===(t=e._$AM))break;(i=t._$AN).delete(e),e=t}while(0===i?.size)},iu=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),iv(t)}};function ip(e){void 0!==this._$AN?(ih(this),this._$AM=e,iu(this)):this._$AM=e}function im(e,t=!1,i=0){let o=this._$AH,r=this._$AN;if(void 0!==r&&0!==r.size){if(t){if(Array.isArray(o))for(let e=i;e<o.length;e++)ic(o[e],!1),ih(o[e]);else null!=o&&(ic(o,!1),ih(o))}else ic(this,e)}}const iv=e=>{e.type==t1.CHILD&&(e._$AP??=im,e._$AQ??=ip)};class ig extends t5{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),iu(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(ic(this,e),ih(this))}setValue(e){if(ia(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}class ib{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}}class iy{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(e=>this.Z=e)}resume(){this.Z?.(),this.Y=this.Z=void 0}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const iw=e=>!is(e)&&"function"==typeof e.then,ik=t2(class extends ig{constructor(){super(...arguments),this._$C_t=1073741823,this._$Cwt=[],this._$Cq=new ib(this),this._$CK=new iy}render(...e){return e.find(e=>!iw(e))??tS}update(e,t){let i=this._$Cwt,o=i.length;this._$Cwt=t;let r=this._$Cq,n=this._$CK;this.isConnected||this.disconnected();for(let e=0;e<t.length&&!(e>this._$C_t);e++){let s=t[e];if(!iw(s))return this._$C_t=e,s;e<o&&s===i[e]||(this._$C_t=1073741823,o=0,Promise.resolve(s).then(async e=>{for(;n.get();)await n.get();let t=r.deref();if(void 0!==t){let i=t._$Cwt.indexOf(s);i>-1&&i<t._$C_t&&(t._$C_t=i,t.setValue(e))}}))}return tS}disconnected(){this._$Cq.disconnect(),this._$CK.pause()}reconnected(){this._$Cq.reconnect(this),this._$CK.resume()}}),iC=eZ`:host{display:inline-block;width:1em;height:1em;font-weight:400;font-family:'Material Icons';font-style:normal;line-height:1;direction:ltr;letter-spacing:normal;white-space:nowrap;text-transform:none;word-wrap:normal;-webkit-font-smoothing:antialiased;text-rendering:optimizelegibility;-moz-osx-font-smoothing:grayscale;font-size:1.5rem}::slotted(svg),svg{width:100%;height:100%;fill:currentcolor}`;/**
 * @summary 图标组件
 *
 * ```html
 * <mdui-icon name="search"></mdui-icon>
 * ```
 *
 * @slot - `svg` 图标的内容
 */let ix=class extends t7{constructor(){super(...arguments),this.hasSlotController=new t6(this,"[default]")}render(){return this.hasSlotController.test("[default]")?tI`<slot></slot>`:(()=>{if(this.name){let[e,t]=this.name.split("--"),i=new Map([["outlined","Material Icons Outlined"],["filled","Material Icons"],["rounded","Material Icons Round"],["sharp","Material Icons Sharp"],["two-tone","Material Icons Two Tone"]]);return tI`<span style="${t8({fontFamily:i.get(t)})}">${e}</span>`}return this.src?tI`${ik(eK({url:this.src}).then(io))}`:tI``})()}};ix.styles=[ie,iC],eq([tX({reflect:!0})],ix.prototype,"name",void 0),eq([tX({reflect:!0})],ix.prototype,"src",void 0),ix=eq([tW("mdui-icon")],ix);const i$=eZ`:host{--shape-corner:var(--mdui-shape-corner-full);position:relative;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;white-space:nowrap;vertical-align:middle;border-radius:var(--shape-corner);-webkit-user-select:none;user-select:none;width:2.5rem;height:2.5rem;background-color:rgb(var(--mdui-color-primary-container));color:rgb(var(--mdui-color-on-primary-container));font-size:var(--mdui-typescale-title-medium-size);font-weight:var(--mdui-typescale-title-medium-weight);letter-spacing:var(--mdui-typescale-title-medium-tracking);line-height:var(--mdui-typescale-title-medium-line-height)}img{width:100%;height:100%}::slotted(mdui-icon),mdui-icon{font-size:1.5em}`;/**
 * @summary 头像组件
 *
 * ```html
 * <mdui-avatar src="https://avatars.githubusercontent.com/u/3030330?s=40&v=4"></mdui-avatar>
 * ```
 *
 * @slot - 自定义头像中的内容，可以为字母、汉字、`<img>` 元素、图标等
 *
 * @csspart image - 使用图片头像时，组件内部的 `<img>` 元素
 * @csspart icon - 使用图标头像时，组件内部的 `<mdui-icon>` 元素
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let iR=class extends t7{constructor(){super(...arguments),this.hasSlotController=new t6(this,"[default]")}render(){return this.hasSlotController.test("[default]")?tI`<slot></slot>`:this.src?tI`<img part="image" alt="${t0(this.label)}" src="${this.src}" style="${t8({objectFit:this.fit})}">`:this.icon?tI`<mdui-icon part="icon" name="${this.icon}"></mdui-icon>`:t9}};iR.styles=[ie,i$],eq([tX({reflect:!0})],iR.prototype,"src",void 0),eq([tX({reflect:!0})],iR.prototype,"fit",void 0),eq([tX({reflect:!0})],iR.prototype,"icon",void 0),eq([tX({reflect:!0})],iR.prototype,"label",void 0),iR=eq([tW("mdui-avatar")],iR);const iE=eZ`:host{--shape-corner:var(--mdui-shape-corner-full);display:inline-flex;align-items:center;justify-content:center;border-radius:var(--shape-corner);padding-left:.25rem;padding-right:.25rem;color:rgb(var(--mdui-color-on-error));background-color:rgb(var(--mdui-color-error));height:1rem;min-width:1rem;font-size:var(--mdui-typescale-label-small-size);font-weight:var(--mdui-typescale-label-small-weight);letter-spacing:var(--mdui-typescale-label-small-tracking);line-height:var(--mdui-typescale-label-small-line-height)}:host([variant=small]){min-width:0;padding:0;width:.375rem;height:.375rem}`;/**
 * @summary 徽标组件
 *
 * ```html
 * <mdui-badge>12</mdui-badge>
 * ```
 *
 * @slot - 显示的文本
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let iI=class extends t7{constructor(){super(...arguments),/**
         * 徽标形状。可选值为：
         * * `small`：小型徽标，不显示文字
         * * `large`：大型徽标，会显示文字
         */this.variant="large"}render(){return"small"===this.variant?t9:tI`<slot></slot>`}};iI.styles=[ie,iE],eq([tX({reflect:!0})],iI.prototype,"variant",void 0),iI=eq([tW("mdui-badge")],iI);/**
 * 在原生的 HTML 中，布尔属性只要添加了属性名，不论属性值设置成什么，属性值都是 true
 * 但这里设置了 attr="false" 时，要把属性设置为 false
 *
 * 原因是：
 * 在 vue3 中，通过 :attr="value" 设置属性时，vue 会优先从 DOM 属性中寻找是否存在 attr 属性名，
 * 若存在，则设置对应的 DOM 属性，否则设置对应的 attribute 属性
 * 但在 vue 的服务端渲染（ssr）时，不存在 DOM 对象，所以会把 attribute 属性设置成 attr="true" 或 attr="false"
 * 所以在 attribute 属性 attr="false" 时，需要把属性值转换为布尔值 false
 *
 * 这段代码不能封装成函数，否则生成 custom-elements.json 会识别不了
 * 这段注释仅在这里写一次，其他地方不再重复
 *
 * @see https://v3-migration.vuejs.org/zh/breaking-changes/attribute-coercion.html
 */const iS=e=>null!==e&&"false"!==e;class iA{constructor(e,t){/**
         * 组件是否已定义完成
         */this.defined=!1,(this.host=e).addController(this),this.relatedElements=t.relatedElements,this.needDomReady=t.needDomReady||!!t.relatedElements,this.onSlotChange=this.onSlotChange.bind(this)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.onSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.onSlotChange)}/**
     * 判断组件是否定义完成
     */isDefined(){return!!this.defined||(this.defined=(!this.needDomReady||T())&&!this.getUndefinedLocalNames().length,this.defined)}/**
     * 在组件定义完成后，promise 被 resolve
     */async whenDefined(){if(this.defined)return Promise.resolve();let e=l();this.needDomReady&&!T(e)&&await new Promise(t=>{e.addEventListener("DOMContentLoaded",()=>t(),{once:!0})});let t=this.getUndefinedLocalNames();if(t.length){let e=[];t.forEach(t=>{e.push(customElements.whenDefined(t))}),await Promise.all(e)}this.defined=!0}/**
     * slot 中的未完成定义的相关 Web components 组件的 CSS 选择器
     */getScopeLocalNameSelector(){let e=this.relatedElements;return e?Array.isArray(e)?e.map(e=>`${e}:not(:defined)`).join(","):Object.keys(e).filter(t=>!e[t]).map(e=>`${e}:not(:defined)`).join(","):null}/**
     * 整个页面中的未完成定义的相关 Web components 组件的 CSS 选择器
     */getGlobalLocalNameSelector(){let e=this.relatedElements;return!e||Array.isArray(e)?null:Object.keys(e).filter(t=>e[t]).map(e=>`${e}:not(:defined)`).join(",")}/**
     * 获取未完成定义的相关 Web components 组件名
     */getUndefinedLocalNames(){let e=this.getScopeLocalNameSelector(),t=this.getGlobalLocalNameSelector(),i=e?[...this.host.querySelectorAll(e)]:[],o=t?[...l().querySelectorAll(t)]:[],r=[...i,...o].map(e=>e.localName);return V(r)}/**
     * slot 变更时，若 slot 中包含未完成定义的相关 Web components 组件，则组件未定义完成
     */onSlotChange(){let e=this.getScopeLocalNameSelector();if(e){let t=this.host.querySelectorAll(e);t.length&&(this.defined=!1)}}}/**
 * watch 装饰器。在 @property 或 @state 属性变更时，且在组件更新前触发
 * 若初始值为 undefined，则初始状态不会触发；否则初始状态就会先触发一次
 *
 * 如果要等属性变更后，且组件更新完成再执行，可以在函数中执行 `await this.updateComplete`
 * 如果要等组件首次渲染完后再监听属性，可以传入第二个参数 true。或者在函数中通过 `this.hasUpdated` 进行判断
 *
 * @watch('propName')
 * handlePropChange(oldValue, newValue) {
 *
 * }
 *//**
 * @param propName 监听的属性名
 * @param waitUntilFirstUpdate 是否等首次渲染完后再监听
 */function iD(e,t=!1){return(i,o)=>{// @ts-ignore
let{update:r}=i;e in i&&(i.update=function(i){if(i.has(e)){let r=i.get(e),n=this[e];r!==n&&(!t||this.hasUpdated)&&this[o](r,n)}r.call(this,i)})}}const iP=e=>{class t extends e{// eslint-disable-next-line @typescript-eslint/no-explicit-any
constructor(...e){super(...e),this.scrollBehaviorDefinedController=new iA(this,{needDomReady:!0}),/**
             * 上次滚动后，垂直方向的距离（滚动距离超过 scrollThreshold 才记录）
             */this.lastScrollTopThreshold=0,/**
             * 上次滚动后，垂直方向的距离（无视 scrollThreshold，始终记录）
             */this.lastScrollTopNoThreshold=0,/**
             * 父元素是否是 `mdui-layout`
             */this.isParentLayout=!1,this.onListeningScroll=this.onListeningScroll.bind(this)}/**
         * 滚动时，如果需要给 container 添加 padding，添加在顶部还是底部
         */get scrollPaddingPosition(){throw Error("Must implement scrollPaddingPosition getter")}async onScrollTargetChange(e,t){if(await this.scrollBehaviorDefinedController.whenDefined(),(e&&!t||!e&&t)&&this.updateContainerPadding(),!this.scrollBehavior)return;let i=this.getListening(e);i&&i.removeEventListener("scroll",this.onListeningScroll);let o=this.getListening(t);o&&(this.updateScrollTop(o),o.addEventListener("scroll",this.onListeningScroll))}async onScrollBehaviorChange(e,t){await this.scrollBehaviorDefinedController.whenDefined(),(e&&!t||!e&&t)&&this.updateContainerPadding();let i=this.getListening(this.scrollTarget);i&&(this.scrollBehavior?(this.updateScrollTop(i),i.addEventListener("scroll",this.onListeningScroll)):i.removeEventListener("scroll",this.onListeningScroll))}connectedCallback(){super.connectedCallback(),this.scrollBehaviorDefinedController.whenDefined().then(()=>{this.isParentLayout=u(this.parentElement,"mdui-layout"),this.updateContainerPadding()})}disconnectedCallback(){super.disconnectedCallback(),this.scrollBehaviorDefinedController.whenDefined().then(()=>{this.updateContainerPadding(!1)})}/**
         * scrollBehavior 包含多个滚动行为，用空格分割
         * 用该方法判断指定滚动行为是否在 scrollBehavior 中
         * @param behavior 为数组时，只要其中一个行为在 scrollBehavior 中，即返回 `true`
         */hasScrollBehavior(e){let t=this.scrollBehavior?.split(" ")??[];return Array.isArray(e)?!!t.filter(t=>e.includes(t)).length:t.includes(e)}/**
         * 执行滚动事件，在滚动距离超过 scrollThreshold 时才会执行
         * Note: 父类可以按需实现该方法
         * @param isScrollingUp 是否向上滚动
         * @param scrollTop 距离 scrollTarget 顶部的距离
         */// eslint-disable-next-line @typescript-eslint/no-unused-vars
runScrollThreshold(e,t){}/**
         * 执行滚动事件，会无视 scrollThreshold，始终会执行
         * @param isScrollingUp 是否向上滚动
         * @param scrollTop 距离 scrollTarget 顶部的距离
         */// eslint-disable-next-line @typescript-eslint/no-unused-vars
runScrollNoThreshold(e,t){}/**
         * 更新滚动容器的 padding，避免内容被 navigation-bar 覆盖
         * 仅 scrollBehavior 包含 hide、shrink 时，添加 padding
         * @param withPadding 该值为 false 时，为移除 padding
         */updateContainerPadding(e=!0){let t=this.getContainer(this.scrollTarget);if(!t||this.isParentLayout)return;let i="top"===this.scrollPaddingPosition?"paddingTop":"paddingBottom";if(e){let e=this.getListening(this.scrollTarget)&&["fixed","absolute"].includes(z(this).css("position"))?this.offsetHeight:null;z(t).css({[i]:e})}else z(t).css({[i]:null})}onListeningScroll(){let e=this.getListening(this.scrollTarget);window.requestAnimationFrame(()=>this.onScroll(e))}/**
         * 滚动事件，这里过滤掉不符合条件的滚动
         */onScroll(e){let t=e.scrollY??e.scrollTop;this.lastScrollTopNoThreshold!==t&&(this.runScrollNoThreshold(t<this.lastScrollTopNoThreshold,t),this.lastScrollTopNoThreshold=t),Math.abs(t-this.lastScrollTopThreshold)>(this.scrollThreshold||0)&&(this.runScrollThreshold(t<this.lastScrollTopThreshold,t),this.lastScrollTopThreshold=t)}/**
         * 重新更新 lastScrollTopThreshold、lastScrollTopNoThreshold 的值
         * 用于在 scrollTarget、scrollBehavior 变更时，重新设置 lastScrollTopThreshold、lastScrollTopNoThreshold 的初始值
         */updateScrollTop(e){this.lastScrollTopThreshold=this.lastScrollTopNoThreshold=e.scrollY??e.scrollTop}/**
         * 获取组件需要监听哪个元素的滚动状态
         */getListening(e){return e?z(e)[0]:window}/**
         * 获取组件在哪个容器内滚动
         */getContainer(e){return e?z(e)[0]:document.body}}return eq([tX({attribute:"scroll-target"})],t.prototype,"scrollTarget",void 0),eq([tX({reflect:!0,attribute:"scroll-behavior"})],t.prototype,"scrollBehavior",void 0),eq([tX({type:Number,reflect:!0,attribute:"scroll-threshold"})],t.prototype,"scrollThreshold",void 0),eq([iD("scrollTarget")],t.prototype,"onScrollTargetChange",null),eq([iD("scrollBehavior")],t.prototype,"onScrollBehaviorChange",null),t};let iT=0;const iM=()=>++iT,i_=(e,t)=>{let r=z(e),n=iM(),s={unobserve:()=>{r.each((e,t)=>{let r=i.get(t)??[],s=r.findIndex(e=>e.key===n);-1!==s&&r.splice(s,1),r.length?i.set(t,r):(o.unobserve(t),i.delete(t))})}};return i||(i=new WeakMap,o=new ResizeObserver(e=>{e.forEach(e=>{let t=e.target,o=i.get(t);o.forEach(t=>{t.callback.call(s,e,s)})})})),// 添加监听
r.each((e,r)=>{o.observe(r);let s=i.get(r)??[];s.push({callback:t,key:n}),i.set(r,s)}),s};class iL{constructor(){this.states=[]}/**
     * 注册 `<mdui-layout-main>`
     */registerMain(e){this.$main=z(e)}/**
     * 取消注册 `<mdui-layout-main>`
     */unregisterMain(){this.$main=void 0}/**
     * 注册新的 `<mdui-layout-item>`
     */registerItem(e){let t={element:e};this.states.push(t),// 监听元素尺寸变化
t.observeResize=i_(t.element,()=>{this.updateLayout(t.element,{width:this.isNoWidth(t)?0:void 0})}),this.items=void 0,this.resort(),// 从头更新布局
this.updateLayout()}/**
     * 取消注册 `<mdui-layout-item>`
     */unregisterItem(e){let t=this.states.findIndex(t=>t.element===e);if(t<0)return;// 取消监听尺寸变化
let i=this.states[t];i.observeResize?.unobserve(),this.items=void 0,// 移除一个元素，并从下一个元素开始更新
this.states.splice(t,1),this.states[t]&&this.updateLayout(this.states[t].element)}/**
     * 获取所有 `<mdui-layout-item>` 元素（按在 DOM 中的顺序）
     */getItems(){if(!this.items){let e=this.states.map(e=>e.element);this.items=e.sort((e,t)=>{let i=e.compareDocumentPosition(t);return i&Node.DOCUMENT_POSITION_FOLLOWING?-1:i&Node.DOCUMENT_POSITION_PRECEDING?1:0})}return this.items}/**
     * 获取 `<mdui-layout-main>` 元素
     */getMain(){return this.$main?this.$main[0]:void 0}/**
     * 获取 `<mdui-layout-item>` 及 `<mdui-layout-main>` 元素
     */getItemsAndMain(){return[...this.getItems(),this.getMain()].filter(e=>e)}/**
     * 更新 `order` 值，更新完后重新计算布局
     */updateOrder(){this.resort(),this.updateLayout()}/**
     * 重新计算布局
     * @param element 从哪一个元素开始更新；若未传入参数，则将更新所有元素
     * @param size 此次更新中，元素的宽高（仅在此次更新中使用）。若不传则自动计算
     */updateLayout(e,t){let i=e?{element:e,width:t?.width,height:t?.height}:void 0,o=i?this.states.findIndex(e=>e.element===i.element):0;if(o<0)return;Object.assign(this.states[o],i),this.states.forEach((e,t)=>{if(t<o)return;// @ts-ignore
let i=e.element.layoutPlacement,r=t>0?this.states[t-1]:void 0,n=r?.top??0,s=r?.right??0,a=r?.bottom??0,l=r?.left??0;switch(Object.assign(e,{top:n,right:s,bottom:a,left:l}),i){case"top":case"bottom":e[i]+=e.height??e.element.offsetHeight;break;case"right":case"left":e[i]+=(this.isNoWidth(e)?0:e.width)??e.element.offsetWidth}e.height=e.width=void 0,z(e.element).css({position:"absolute",top:"bottom"===i?null:n,right:"left"===i?null:s,bottom:"top"===i?null:a,left:"right"===i?null:l})});// 更新完后，设置 layout-main 的 padding
let r=this.states[this.states.length-1];this.$main&&this.$main.css({paddingTop:r.top,paddingRight:r.right,paddingBottom:r.bottom,paddingLeft:r.left})}/**
     * 按 order 排序，order 相同时，按在 DOM 中的顺序排序
     */resort(){let e=this.getItems();this.states.sort((t,i)=>{let o=t.element.order??0,r=i.element.order??0;return o>r?1:o<r?-1:e.indexOf(t.element)>e.indexOf(i.element)?1:e.indexOf(t.element)<e.indexOf(i.element)?-1:0})}/**
     * 组件宽度是否为 0
     * mdui-navigation-drawer 较为特殊，在为模态化时，占据的宽度为 0
     */isNoWidth(e){return u(e.element,"mdui-navigation-drawer")&&// @ts-ignore
e.element.isModal}}const iO=new WeakMap,iz=e=>(iO.has(e)||iO.set(e,new iL),iO.get(e));class iB extends t7{constructor(){super(...arguments),// 父元素是否是 `mdui-layout`
this.isParentLayout=!1}/**
     * 当前布局组件所处的位置，父类必须实现该 getter
     */get layoutPlacement(){throw Error("Must implement placement getter!")}// order 变更时，需要重新调整布局
onOrderChange(){this.layoutManager?.updateOrder()}connectedCallback(){super.connectedCallback();let e=this.parentElement;this.isParentLayout=u(e,"mdui-layout"),this.isParentLayout&&(this.layoutManager=iz(e),this.layoutManager.registerItem(this))}disconnectedCallback(){super.disconnectedCallback(),this.layoutManager&&this.layoutManager.unregisterItem(this)}}eq([tX({type:Number,reflect:!0})],iB.prototype,"order",void 0),eq([iD("order",!0)],iB.prototype,"onOrderChange",null);const iV=eZ`:host{--shape-corner:var(--mdui-shape-corner-none);--z-index:2000;position:fixed;right:0;bottom:0;left:0;display:flex;flex:0 0 auto;align-items:center;justify-content:flex-start;border-radius:var(--shape-corner) var(--shape-corner) 0 0;z-index:var(--z-index);transition:bottom var(--mdui-motion-duration-long2) var(--mdui-motion-easing-emphasized);padding:0 1rem;height:5rem;background-color:rgb(var(--mdui-color-surface-container));box-shadow:var(--mdui-elevation-level2)}:host([scroll-target]:not([scroll-target=''])){position:absolute}:host([hide]){transition-duration:var(--mdui-motion-duration-short4);bottom:-5.625rem}::slotted(:not(:first-child)){margin-left:.5rem}::slotted(mdui-fab){box-shadow:var(--mdui-elevation-level0)}:host([fab-detach]) ::slotted(mdui-fab){position:absolute;transition:bottom var(--mdui-motion-duration-long2) var(--mdui-motion-easing-standard);right:1rem;bottom:.75rem}:host([fab-detach][hide][scroll-behavior~=hide]) ::slotted(mdui-fab){transition-duration:var(--mdui-motion-duration-short4);bottom:1rem;box-shadow:var(--mdui-elevation-level2)}:host([fab-detach][hide][scroll-behavior~=hide][scroll-target]:not([scroll-target=''])) ::slotted(mdui-fab){bottom:6.625rem}:host([hide]) ::slotted(:not(mdui-fab)),:host([hide]:not([fab-detach])) ::slotted(mdui-fab){transform:translateY(8.75rem);transition:transform var(--mdui-motion-duration-0) var(--mdui-motion-easing-emphasized-accelerate) var(--mdui-motion-duration-short4)}::slotted(:first-child){transition:transform var(--mdui-motion-duration-short3) var(--mdui-motion-easing-emphasized-decelerate) var(--mdui-motion-duration-short1)}::slotted(:nth-child(2)){transition:transform var(--mdui-motion-duration-short3) var(--mdui-motion-easing-emphasized-decelerate) var(--mdui-motion-duration-short3)}::slotted(:nth-child(3)){transition:transform var(--mdui-motion-duration-short3) var(--mdui-motion-easing-emphasized-decelerate) var(--mdui-motion-duration-short4)}::slotted(:nth-child(4)){transition:transform var(--mdui-motion-duration-short3) var(--mdui-motion-easing-emphasized-decelerate) var(--mdui-motion-duration-medium1)}::slotted(:nth-child(5)){transition:transform var(--mdui-motion-duration-short3) var(--mdui-motion-easing-emphasized-decelerate) var(--mdui-motion-duration-medium2)}::slotted(:nth-child(6)){transition:transform var(--mdui-motion-duration-short3) var(--mdui-motion-easing-emphasized-decelerate) var(--mdui-motion-duration-medium3)}`;/**
 * @summary 底部应用栏组件
 *
 * ```html
 * <mdui-bottom-app-bar>
 * ..<mdui-button-icon icon="check_box--outlined"></mdui-button-icon>
 * ..<mdui-button-icon icon="edit--outlined"></mdui-button-icon>
 * ..<mdui-button-icon icon="mic_none--outlined"></mdui-button-icon>
 * ..<mdui-button-icon icon="image--outlined"></mdui-button-icon>
 * ..<div style="flex-grow: 1"></div>
 * ..<mdui-fab icon="add"></mdui-fab>
 * </mdui-bottom-app-bar>
 * ```
 *
 * @event show - 开始显示时，事件被触发。可以通过调用 `event.preventDefault()` 阻止显示
 * @event shown - 显示动画完成时，事件被触发
 * @event hide - 开始隐藏时，事件被触发。可以通过调用 `event.preventDefault()` 阻止隐藏
 * @event hidden - 隐藏动画完成时，事件被触发
 *
 * @slot - 底部应用栏内部的元素
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --z-index - 组件的 CSS 的 `z-index` 值
 */let iN=class extends iP(iB){constructor(){super(...arguments),/**
         * 是否隐藏
         */this.hide=!1,/**
         * 是否使底部应用栏中的 [`<mdui-fab>`](/docs/2/components/fab) 组件脱离应用栏。若为 `true`，则在应用栏隐藏后，[`<mdui-fab>`](/docs/2/components/fab) 仍将停留在页面上
         */this.fabDetach=!1}get scrollPaddingPosition(){return"bottom"}get layoutPlacement(){return"bottom"}firstUpdated(e){super.firstUpdated(e),this.addEventListener("transitionend",e=>{e.target===this&&this.emit(this.hide?"hidden":"shown")})}render(){return tI`<slot></slot>`}/**
     * 滚动行为
     * 当前仅支持 hide 这一个行为，所以不做行为类型判断
     */runScrollThreshold(e){// 向下滚动
if(!e&&!this.hide){let e=this.emit("hide",{cancelable:!0});e&&(this.hide=!0)}// 向上滚动
if(e&&this.hide){let e=this.emit("show",{cancelable:!0});e&&(this.hide=!1)}}};iN.styles=[ie,iV],eq([tX({type:Boolean,reflect:!0,converter:iS})],iN.prototype,"hide",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"fab-detach"})],iN.prototype,"fabDetach",void 0),eq([tX({reflect:!0,attribute:"scroll-behavior"})],iN.prototype,"scrollBehavior",void 0),iN=eq([tW("mdui-bottom-app-bar")],iN);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const iF=()=>new iH;class iH{}const iU=new WeakMap,iK=t2(class extends ig{render(e){return tA}update(e,[t]){let i=t!==this.G;return i&&void 0!==this.G&&this.ot(void 0),(i||this.rt!==this.lt)&&(this.G=t,this.ct=e.options?.host,this.ot(this.lt=e.element)),tA}ot(e){if("function"==typeof this.G){let t=this.ct??globalThis,i=iU.get(t);void 0===i&&(i=new WeakMap,iU.set(t,i)),void 0!==i.get(this.G)&&this.G.call(this.ct,void 0),i.set(this.G,e),void 0!==e&&this.G.call(this.ct,e)}else this.G.value=e}get rt(){return"function"==typeof this.G?iU.get(this.ct??globalThis)?.get(this.G):this.G?.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}});function iq(e){if("string"==typeof e||"number"==typeof e)return""+e;let t="";if(Array.isArray(e))for(let i=0,o;i<e.length;i++)""!==(o=iq(e[i]))&&(t+=(t&&" ")+o);else for(let i in e)e[i]&&(t+=(t&&" ")+i);return t}/**
 * 参考：https://github.com/shoelace-style/shoelace/blob/next/src/internal/form.ts
 *//**
 * 在执行 `<form>` 元素的 reportValidity() 时，不会执行 mdui 组件的 reportValidity() 方法，
 * 因此在 mdui 表单控件的 hostConnected 中把 `<form>` 的 reportValidity 替换为自定义方法，
 * hostDisconnected 中恢复为 原生 reportValidity 方法
 *
 * 该 WeakMap 用于存储指定 `<form>` 的原生 reportValidity 方法
 *
 * 日后使用 ElementInternals 可不再进行该处理，但当前 safari 浏览器不支持。
 */const ij=new WeakMap,iW=new WeakMap;class iY{constructor(e,t){(this.host=e).addController(this),this.definedController=new iA(e,{needDomReady:!0}),this.options={form:e=>{let t=z(e).attr("form");if(t){let i=e.getRootNode();return i.getElementById(t)}return e.closest("form")},name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,setValue:(e,t)=>e.value=t,disabled:e=>e.disabled,reportValidity:e=>!p(e.reportValidity)||e.reportValidity(),...t},this.onFormData=this.onFormData.bind(this),this.onFormSubmit=this.onFormSubmit.bind(this),this.onFormReset=this.onFormReset.bind(this),this.reportFormValidity=this.reportFormValidity.bind(this)}hostConnected(){this.definedController.whenDefined().then(()=>{this.form=this.options.form(this.host),this.form&&this.attachForm(this.form)})}hostDisconnected(){this.detachForm()}hostUpdated(){this.definedController.whenDefined().then(()=>{let e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e))})}/**
     * 获取当前表单控件关联的 `<form>` 元素
     */getForm(){return this.form??null}/**
     * 重置整个表单，所有表单控件恢复成默认值
     */reset(e){this.doAction("reset",e)}/**
     * 提交整个表单
     */submit(e){this.doAction("submit",e)}attachForm(e){if(!e){this.form=void 0;return}this.form=e,eD.has(this.form)?eD.get(this.form).add(this.host):eD.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.onFormData),this.form.addEventListener("submit",this.onFormSubmit),this.form.addEventListener("reset",this.onFormReset),ij.has(this.form)||(ij.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity())}detachForm(){this.form&&(eD.get(this.form).delete(this.host),this.form.removeEventListener("formdata",this.onFormData),this.form.removeEventListener("submit",this.onFormSubmit),this.form.removeEventListener("reset",this.onFormReset),ij.has(this.form)&&!eD.get(this.form).size&&(this.form.reportValidity=ij.get(this.form),ij.delete(this.form)))}doAction(e,t){if(!this.form)return;let i=z(`<button type="${e}">`).css({position:"absolute",width:0,height:0,clipPath:"inset(50%)",overflow:"hidden",whiteSpace:"nowrap"}),o=i[0];t&&(o.name=t.name,o.value=t.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(e=>{i.attr(e,z(t).attr(e))})),this.form.append(o),o.click(),o.remove()}onFormData(e){let t=this.options.disabled(this.host),i=this.options.name(this.host),o=this.options.value(this.host),r=["mdui-button","mdui-button-icon","mdui-chip","mdui-fab","mdui-segmented-button"].includes(this.host.tagName.toLowerCase());!t&&!r&&m(i)&&i&&!g(o)&&(Array.isArray(o)?o.forEach(t=>{e.formData.append(i,t.toString())}):e.formData.append(i,o.toString()))}// todo: 当前组件进行验证的顺序，取决于组件的注册顺序，而不会按在 DOM 中的顺序从上到下验证。如何按 DOM 顺序验证？
onFormSubmit(e){let t=this.options.disabled(this.host),i=this.options.reportValidity;!this.form||this.form.noValidate||t||i(this.host)||(e.preventDefault(),e.stopImmediatePropagation())}onFormReset(){this.form&&(this.options.setValue(this.host,this.options.defaultValue(this.host)),// 取消 invalid 状态。
// 此外，还需要在各个组件内，监听值的变更，判断 formResets 中是否存在当前表单控件。若存在则 invalid 设为 false；不存在则设置为 checkValidity() 的值
// @ts-ignore
this.host.invalid=!1,iW.has(this.form)?iW.get(this.form).add(this.host):iW.set(this.form,new Set([this.host])))}reportFormValidity(){if(this.form&&!this.form.noValidate){let e=eP(this.form);for(let t of e)if(p(t.reportValidity)&&!t.reportValidity())return!1}return!0}}const iG=e=>{class t extends e{renderAnchor({id:e,className:t,part:i,content:o=tI`<slot></slot>`,refDirective:r,tabIndex:n}){return tI`<a ${r} id="${t0(e)}" class="_a ${t||""}" part="${t0(i)}" href="${t0(this.href)}" download="${t0(this.download)}" target="${t0(this.target)}" rel="${t0(this.rel)}" tabindex="${t0(n)}">${o}</a>`}}return eq([tX({reflect:!0})],t.prototype,"href",void 0),eq([tX({reflect:!0})],t.prototype,"download",void 0),eq([tX({reflect:!0})],t.prototype,"target",void 0),eq([tX({reflect:!0})],t.prototype,"rel",void 0),t};let iX=!0;const iJ=l();iJ.addEventListener("pointerdown",()=>{iX=!0}),iJ.addEventListener("keydown",()=>{iX=!1});const iZ=e=>{class t extends e{constructor(){super(...arguments),/**
             * 是否在页面加载完成后自动获得焦点
             */this.autofocus=!1,/**
             * 是否获得了焦点，不管是鼠标点击，还是键盘切换获得的焦点，都会添加该属性
             * 添加到 :host 元素上，供 CSS 选择器添加样式
             */this.focused=!1,/**
             * 是否通过键盘切换获得了焦点
             * 添加到 :host 元素上，供 CSS 选择器添加样式
             */this.focusVisible=!1,this.focusableDefinedController=new iA(this,{relatedElements:[""]}),this._manipulatingTabindex=!1,this._tabIndex=0}/**
         * 通过 Tab 键在元素之间切换焦点时，tabIndex 属性指定了元素获取焦点的顺序
         */get tabIndex(){let e=z(this);if(this.focusElement===this)return Number(e.attr("tabindex")||-1);let t=Number(e.attr("tabindex")||0);return this.focusDisabled||t<0?-1:this.focusElement?this.focusElement.tabIndex:t}set tabIndex(e){if(this._manipulatingTabindex){this._manipulatingTabindex=!1;return}let t=z(this);if(this.focusElement===this){null!==e&&(this._tabIndex=e),t.attr("tabindex",this.focusDisabled?null:e);return}let i=()=>{-1===this.tabIndex&&(this.tabIndex=0,this.focus({preventScroll:!0}))};if(-1===e?this.addEventListener("pointerdown",i):(this._manipulatingTabindex=!0,this.removeEventListener("pointerdown",i)),-1===e||this.focusDisabled){t.attr("tabindex",-1),-1!==e&&this.manageFocusElementTabindex(e);return}this.hasAttribute("tabindex")||(this._manipulatingTabindex=!1),this.manageFocusElementTabindex(e)}/**
         * 父类要实现该属性，表示是否禁用 focus 状态
         */get focusDisabled(){throw Error("Must implement focusDisabled getter!")}/**
         * 最终获得焦点的元素
         */get focusElement(){throw Error("Must implement focusElement getter!")}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{requestAnimationFrame(()=>{this.manageAutoFocus()})})}/**
         * 模拟鼠标点击元素
         */click(){this.focusDisabled||(this.focusElement!==this?this.focusElement.click():HTMLElement.prototype.click.apply(this))}/**
         * 将焦点设置在当前元素。
         *
         * 可传入一个对象作为参数。对象属性为：
         *
         * * `preventScroll`：默认情况下，在聚焦后会滚动页面，以将聚焦的元素滚动到视图中。可将该属性设为 `true` 以阻止页面滚动。
         */focus(e){!this.focusDisabled&&this.focusElement&&(this.focusElement!==this?this.focusElement.focus(e):HTMLElement.prototype.focus.apply(this,[e]))}/**
         * 从当前元素中移除焦点
         */blur(){this.focusElement!==this?this.focusElement.blur():HTMLElement.prototype.blur.apply(this)}firstUpdated(e){super.firstUpdated(e),this.focusElement.addEventListener("focus",()=>{this.focused=!0,this.focusVisible=!iX}),this.focusElement.addEventListener("blur",()=>{this.focused=!1,this.focusVisible=!1})}update(e){if(void 0===this._lastFocusDisabled||this._lastFocusDisabled!==this.focusDisabled){this._lastFocusDisabled=this.focusDisabled;let e=z(this);this.focusDisabled?e.removeAttr("tabindex"):this.focusElement===this?(this._manipulatingTabindex=!0,e.attr("tabindex",this._tabIndex)):this.tabIndex>-1&&e.removeAttr("tabindex")}super.update(e)}updated(e){super.updated(e),this.focused&&this.focusDisabled&&this.blur()}async manageFocusElementTabindex(e){this.focusElement||await this.updateComplete,null===e?this.focusElement.removeAttribute("tabindex"):this.focusElement.tabIndex=e}manageAutoFocus(){this.autofocus&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),this.focusElement.focus())}}return eq([tX({type:Boolean,/**
             * 哪些属性需要 reflect: true？
             * 一般所有属性都需要 reflect，但以下情况除外：
             * 1. 会频繁变更的属性
             * 2. 属性同步会造成较大性能开销的属性
             * 3. 复杂类型属性（数组、对象等，仅提供 property，不提供 attribute）
             */reflect:!0,converter:iS})],t.prototype,"autofocus",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],t.prototype,"focused",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"focus-visible"})],t.prototype,"focusVisible",void 0),eq([tX({type:Number,attribute:"tabindex"})],t.prototype,"tabIndex",null),t},iQ=t2(class extends t5{constructor(e){if(super(e),e.type!==t1.ATTRIBUTE||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.it){for(let i in this.it=new Set,void 0!==e.strings&&(this.st=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e))),t)t[i]&&!this.st?.has(i)&&this.it.add(i);return this.render(t)}let i=e.element.classList;for(let e of this.it)e in t||(i.remove(e),this.it.delete(e));for(let e in t){let o=!!t[e];o===this.it.has(e)||this.st?.has(e)||(o?(i.add(e),this.it.add(e)):(i.remove(e),this.it.delete(e)))}return tS}}),i0=eZ`:host{position:relative;display:inline-block;width:2.5rem;height:2.5rem;stroke:rgb(var(--mdui-color-primary))}.progress{position:relative;display:inline-block;width:100%;height:100%;text-align:left;transition:opacity var(--mdui-motion-duration-medium1) var(--mdui-motion-easing-linear)}.determinate svg{transform:rotate(-90deg);fill:transparent}.determinate .track{stroke:transparent}.determinate .circle{stroke:inherit;transition:stroke-dashoffset var(--mdui-motion-duration-long2) var(--mdui-motion-easing-standard)}.indeterminate{font-size:0;letter-spacing:0;white-space:nowrap;animation:mdui-comp-circular-progress-rotate 1568ms var(--mdui-motion-easing-linear) infinite}.indeterminate .circle,.indeterminate .layer{position:absolute;width:100%;height:100%}.indeterminate .layer{animation:mdui-comp-circular-progress-layer-rotate 5332ms var(--mdui-motion-easing-standard) infinite both}.indeterminate .circle{fill:transparent;stroke:inherit}.indeterminate .gap-patch{position:absolute;top:0;left:47.5%;width:5%;height:100%;overflow:hidden}.indeterminate .gap-patch .circle{left:-900%;width:2000%;transform:rotate(180deg)}.indeterminate .clipper{position:relative;display:inline-block;width:50%;height:100%;overflow:hidden}.indeterminate .clipper .circle{width:200%}.indeterminate .clipper.left .circle{animation:mdui-comp-circular-progress-left-spin 1333ms var(--mdui-motion-easing-standard) infinite both}.indeterminate .clipper.right .circle{left:-100%;animation:mdui-comp-circular-progress-right-spin 1333ms var(--mdui-motion-easing-standard) infinite both}@keyframes mdui-comp-circular-progress-rotate{to{transform:rotate(360deg)}}@keyframes mdui-comp-circular-progress-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdui-comp-circular-progress-left-spin{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes mdui-comp-circular-progress-right-spin{0%{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}100%{transform:rotate(-265deg)}}`;/**
 * @summary 圆形进度指示器组件
 *
 * ```html
 * <mdui-circular-progress></mdui-circular-progress>
 * ```
 */let i1=class extends t7{constructor(){super(...arguments),/**
         * 进度指示器的最大值，默认为 1
         */this.max=1}render(){let e=!g(this.value);return tI`<div class="progress ${iQ({determinate:e,indeterminate:!e})}">${e?this.renderDeterminate():this.renderInDeterminate()}</div>`}renderDeterminate(){let e=this.value,t=(1-e/Math.max(this.max??e,e))*113.0973336;return tI`<svg viewBox="0 0 ${40} ${40}"><circle class="track" cx="${20}" cy="${20}" r="${18}" stroke-width="${4}"></circle><circle class="circle" cx="${20}" cy="${20}" r="${18}" stroke-dasharray="${113.0973336}" stroke-dashoffset="${t}" stroke-width="${4}"></circle></svg>`}renderInDeterminate(){let e=e=>tI`<svg class="circle" viewBox="0 0 ${40} ${40}"><circle cx="${20}" cy="${20}" r="${18}" stroke-dasharray="${113.0973336}" stroke-dashoffset="${56.5486668}" stroke-width="${e}"></circle></svg>`;return tI`<div class="layer"><div class="clipper left">${e(4)}</div><div class="gap-patch">${e(3.2)}</div><div class="clipper right">${e(4)}</div></div>`}};i1.styles=[ie,i0],eq([tX({type:Number,reflect:!0})],i1.prototype,"max",void 0),eq([tX({type:Number})],i1.prototype,"value",void 0),i1=eq([tW("mdui-circular-progress")],i1);const i2=eZ`:host{position:absolute;top:0;left:0;display:block;width:100%;height:100%;overflow:hidden;pointer-events:none}.surface{position:absolute;top:0;left:0;width:100%;height:100%;transition-duration:280ms;transition-property:background-color;pointer-events:none;transition-timing-function:var(--mdui-motion-easing-standard)}.hover{background-color:rgba(var(--mdui-comp-ripple-state-layer-color,var(--mdui-color-on-surface)),var(--mdui-state-layer-hover))}:host-context([focus-visible]) .focused{background-color:rgba(var(--mdui-comp-ripple-state-layer-color,var(--mdui-color-on-surface)),var(--mdui-state-layer-focus))}.dragged{background-color:rgba(var(--mdui-comp-ripple-state-layer-color,var(--mdui-color-on-surface)),var(--mdui-state-layer-dragged))}.wave{position:absolute;z-index:1;background-color:rgb(var(--mdui-comp-ripple-state-layer-color,var(--mdui-color-on-surface)));border-radius:50%;transform:translate3d(0,0,0) scale(.4);opacity:0;animation:225ms ease 0s 1 normal forwards running mdui-comp-ripple-radius-in,75ms ease 0s 1 normal forwards running mdui-comp-ripple-opacity-in;pointer-events:none}.out{transform:translate3d(var(--mdui-comp-ripple-transition-x,0),var(--mdui-comp-ripple-transition-y,0),0) scale(1);animation:150ms ease 0s 1 normal none running mdui-comp-ripple-opacity-out}@keyframes mdui-comp-ripple-radius-in{from{transform:translate3d(0,0,0) scale(.4);animation-timing-function:var(--mdui-motion-easing-standard)}to{transform:translate3d(var(--mdui-comp-ripple-transition-x,0),var(--mdui-comp-ripple-transition-y,0),0) scale(1)}}@keyframes mdui-comp-ripple-opacity-in{from{opacity:0;animation-timing-function:linear}to{opacity:var(--mdui-state-layer-pressed)}}@keyframes mdui-comp-ripple-opacity-out{from{animation-timing-function:linear;opacity:var(--mdui-state-layer-pressed)}to{opacity:0}}`;/**
 * 处理点击时的涟漪动画；及添加 hover、focused、dragged 的背景色
 * 背景色通过在 .surface 元素上添加对应的 class 实现
 * 阴影在 ripple-mixin 中处理，通过在 :host 元素上添加 attribute 供 CSS 选择器添加样式
 */let i5=class extends t7{constructor(){super(...arguments),/**
         * 是否禁用涟漪动画
         */this.noRipple=!1,this.hover=!1,this.focused=!1,this.dragged=!1,this.surfaceRef=iF()}startPress(e){let t,i;if(this.noRipple)return;let o=z(this.surfaceRef.value),r=o.innerHeight(),n=o.innerWidth();if(e){// 传入了事件对象，涟漪从点击位置扩散
let s="undefined"!=typeof TouchEvent&&e instanceof TouchEvent&&e.touches.length?e.touches[0]:e,a=o.offset();// 点击位置不在 surface 内，不执行
if(s.pageX<a.left||s.pageX>a.left+n||s.pageY<a.top||s.pageY>a.top+r)return;t=s.pageX-a.left,i=s.pageY-a.top}else // 未传入事件对象，涟漪从中间扩散
t=n/2,i=r/2;// 涟漪直径
let s=Math.max(Math.pow(Math.pow(r,2)+Math.pow(n,2),.5),48),a=`${-t+n/2}px`,l=`${-i+r/2}px`,d=`translate3d(${a}, ${l}, 0) scale(1)`;z('<div class="wave"></div>').css({width:s,height:s,marginTop:-s/2,marginLeft:-s/2,left:t,top:i}).each((e,t)=>{t.style.setProperty("--mdui-comp-ripple-transition-x",a),t.style.setProperty("--mdui-comp-ripple-transition-y",l)}).prependTo(this.surfaceRef.value).each((e,t)=>t.clientLeft)// 重绘
.css("transform",d).on("animationend",function(e){"mdui-comp-ripple-radius-in"===e.animationName&&z(this).data("filled",!0);// 扩散动画完成后，添加标记
})}endPress(){let e=z(this.surfaceRef.value).children().filter((e,t)=>!z(t).data("removing")).data("removing",!0),t=e=>{e.addClass("out").each((e,t)=>t.clientLeft)// 重绘
.on("animationend",function(){z(this).remove()})};// 扩散动画未完成，先完成扩散，再隐藏并移除
e.filter((e,t)=>!z(t).data("filled")).on("animationend",function(e){"mdui-comp-ripple-radius-in"===e.animationName&&t(z(this))}),// 扩散动画已完成，直接隐藏并移除
t(e.filter((e,t)=>!!z(t).data("filled")))}startHover(){this.hover=!0}endHover(){this.hover=!1}startFocus(){this.focused=!0}endFocus(){this.focused=!1}startDrag(){this.dragged=!0}endDrag(){this.dragged=!1}render(){return tI`<div ${iK(this.surfaceRef)} class="surface ${iQ({hover:this.hover,focused:this.focused,dragged:this.dragged})}"></div>`}};i5.styles=[ie,i2],eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"no-ripple"})],i5.prototype,"noRipple",void 0),eq([tJ()],i5.prototype,"hover",void 0),eq([tJ()],i5.prototype,"focused",void 0),eq([tJ()],i5.prototype,"dragged",void 0),i5=eq([tW("mdui-ripple")],i5);const i4=e=>{class t extends e{constructor(){super(...arguments),/**
             * 是否禁用涟漪动画
             */this.noRipple=!1,/**
             * 当前激活的是第几个 <mdui-ripple>。仅一个组件中有多个 <mdui-ripple> 时可以使用该属性
             * 若值为 undefined，则组件中所有 <mdui-ripple> 都激活
             */this.rippleIndex=void 0,/**
             * 获取当前激活的是第几个 <mdui-ripple>。仅一个组件中有多个 <mdui-ripple> 时可以使用该属性
             * 若值为 undefined，则组件中所有 <mdui-ripple> 都激活
             * 可在子类中手动指定该方法，指定需要激活的 ripple
             */this.getRippleIndex=()=>this.rippleIndex}/**
         * 子类要添加该属性，指向 <mdui-ripple> 元素
         * 如果一个组件中包含多个 <mdui-ripple> 元素，则这里可以是一个数组或 NodeList
         */get rippleElement(){throw Error("Must implement rippleElement getter!")}/**
         * 子类要实现该属性，表示是否禁用 ripple
         * 如果一个组件中包含多个 <mdui-ripple> 元素，则这里可以是一个数组；也可以是单个值，同时控制多个 <mdui-ripple> 元素
         */get rippleDisabled(){throw Error("Must implement rippleDisabled getter!")}/**
         * 当前 <mdui-ripple> 元素相对于哪个元素存在，即 hover、pressed、dragged 属性要添加到哪个元素上，默认为 :host
         * 如果需要修改该属性，则子类可以实现该属性
         * 如果一个组件中包含多个 <mdui-ripple> 元素，则这里可以是一个数组；也可以是单个值，同时控制多个 <mdui-ripple> 元素
         */get rippleTarget(){return this}firstUpdated(e){super.firstUpdated(e);let t=z(this.rippleTarget),i=e=>{x(this.rippleTarget)&&(this.rippleIndex=t.index(e.target))},o=x(this.rippleTarget)?this.rippleTarget:[this.rippleTarget];o.forEach(e=>{e.addEventListener("pointerdown",e=>{i(e),this.startPress(e)}),e.addEventListener("pointerenter",e=>{i(e),this.startHover(e)}),e.addEventListener("pointerleave",e=>{i(e),this.endHover(e)}),e.addEventListener("focus",e=>{i(e),this.startFocus()}),e.addEventListener("blur",e=>{i(e),this.endFocus()})})}/**
         * 若存在多个 <mdui-ripple>，但 rippleTarget 为同一个，则 hover 状态无法在多个 <mdui-ripple> 之间切换
         * 所以把 startHover 和 endHover 设置为 protected，供子类调用
         * 子类中，在 getRippleIndex() 的返回值变更前调用 endHover(event)，变更后调用 startHover(event)
         */startHover(e){"mouse"!==e.pointerType||this.isRippleDisabled()||(this.getRippleTarget().setAttribute("hover",""),this.getRippleElement().startHover())}endHover(e){"mouse"!==e.pointerType||this.isRippleDisabled()||(this.getRippleTarget().removeAttribute("hover"),this.getRippleElement().endHover())}/**
         * 当前激活的 <mdui-ripple> 元素是否被禁用
         */isRippleDisabled(){let e=this.rippleDisabled;if(!Array.isArray(e))return e;let t=this.getRippleIndex();return void 0!==t?e[t]:!!e.length&&e[0]}/**
         * 获取当前激活的 <mdui-ripple> 元素实例
         */getRippleElement(){let e=this.rippleElement;if(!x(e))return e;let t=this.getRippleIndex();return void 0!==t?e[t]:e[0]}/**
         * 获取当前激活的 <mdui-ripple> 元素相对于哪个元素存在
         */getRippleTarget(){let e=this.rippleTarget;if(!x(e))return e;let t=this.getRippleIndex();return void 0!==t?e[t]:e[0]}startFocus(){this.isRippleDisabled()||this.getRippleElement().startFocus()}endFocus(){this.isRippleDisabled()||this.getRippleElement().endFocus()}startPress(e){// 为鼠标时操作，仅响应鼠标左键点击
if(this.isRippleDisabled()||e.button)return;let t=this.getRippleTarget();// 手指触摸触发涟漪
if(t.setAttribute("pressed",""),["touch","pen"].includes(e.pointerType)){let i=!1,o=setTimeout(()=>{o=0,this.getRippleElement().startPress(e)},70),r=()=>{o&&(clearTimeout(o),o=0,this.getRippleElement().startPress(e)),i||(i=!0,this.endPress()),t.removeEventListener("pointerup",r),t.removeEventListener("pointercancel",r)},n=()=>{o&&(clearTimeout(o),o=0),t.removeEventListener("touchmove",n)};// pointermove 事件过于灵敏，可能在未触发 touchmove 的情况下，触发了 pointermove 事件，导致正常的点击操作没有显示涟漪
// 因此这里监听 touchmove 事件
t.addEventListener("touchmove",n),t.addEventListener("pointerup",r),t.addEventListener("pointercancel",r)}// 鼠标点击触发涟漪，点击后立即触发涟漪（仅鼠标左键能触发涟漪）
if("mouse"===e.pointerType&&0===e.button){let i=()=>{this.endPress(),t.removeEventListener("pointerup",i),t.removeEventListener("pointercancel",i),t.removeEventListener("pointerleave",i)};this.getRippleElement().startPress(e),t.addEventListener("pointerup",i),t.addEventListener("pointercancel",i),t.addEventListener("pointerleave",i)}}endPress(){this.isRippleDisabled()||(this.getRippleTarget().removeAttribute("pressed"),this.getRippleElement().endPress())}startDrag(){this.isRippleDisabled()||this.getRippleElement().startDrag()}endDrag(){this.isRippleDisabled()||this.getRippleElement().endDrag()}}return eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"no-ripple"})],t.prototype,"noRipple",void 0),t},i3=eZ`.button{position:relative;display:inline-flex;align-items:center;justify-content:center;height:100%;padding:0;overflow:hidden;color:inherit;font-size:inherit;font-family:inherit;letter-spacing:inherit;white-space:nowrap;text-align:center;text-decoration:none;vertical-align:middle;background:0 0;border:none;outline:0;cursor:inherit;-webkit-user-select:none;user-select:none;touch-action:manipulation;zoom:1;-webkit-user-drag:none}`;class i8 extends iG(i4(iZ(t7))){constructor(){super(...arguments),/**
         * 是否禁用
         */this.disabled=!1,/**
         * 是否为加载中状态
         */this.loading=!1,/**
         * 按钮的名称，将与表单数据一起提交
         *
         * **Note**：仅在未指定 `href` 属性时可用
         */this.name="",/**
         * 按钮的初始值，将与表单数据一起提交
         *
         * **Note**：仅在未指定 `href` 属性时可用
         */this.value="",/**
         * 按钮的类型。默认值为 `button`。可选值为：
         *
         * * `submit`：点击按钮将表单数据提交给服务器
         * * `reset`：点击按钮将表单中所有组件重置为初始值
         * * `button`：按钮没有默认行为
         *
         * **Note**：仅在未指定 `href` 属性时可用
         */this.type="button",/**
         * 指定了该属性时，表示当表单被提交时不需要验证。
         *
         * 指定了该属性时，将覆盖 `form` 元素的 `novalidate` 属性。
         *
         * **Note**：仅在未指定 `href` 属性、且 `type="submit"` 时可用。
         */this.formNoValidate=!1,this.formController=new iY(this)}/**
     * 表单验证状态对象
     */get validity(){if(this.isButton())return this.focusElement.validity}/**
     * 表单验证的错误提示信息
     */get validationMessage(){if(this.isButton())return this.focusElement.validationMessage}get rippleDisabled(){return this.disabled||this.loading}get focusElement(){return this.isButton()?this.renderRoot?.querySelector("._button"):this.focusDisabled?this:this.renderRoot?.querySelector("._a")}get focusDisabled(){return this.disabled||this.loading}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`
     */checkValidity(){if(this.isButton()){let e=this.focusElement.checkValidity();return e||this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1}),e}return!0}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`。
     *
     * 验证未通过时，还将在组件上显示未通过的提示。
     */reportValidity(){if(this.isButton()){let e=!this.focusElement.reportValidity();return e&&this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1}),!e}return!0}/**
     * 设置自定义的错误提示文本。只要文本不为空，则表示字段验证未通过
     *
     * @param message 自定义的提示文本
     */setCustomValidity(e){this.isButton()&&this.focusElement.setCustomValidity(e)}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",()=>{"submit"===this.type&&this.formController.submit(this),"reset"===this.type&&this.formController.reset(this)})}renderLoading(){return this.loading?tI`<mdui-circular-progress part="loading"></mdui-circular-progress>`:t9}renderButton({id:e,className:t,part:i,content:o=tI`<slot></slot>`}){return tI`<button id="${t0(e)}" class="${iq(["_button",t])}" part="${t0(i)}" ?disabled="${this.rippleDisabled||this.focusDisabled}">${o}</button>`}isButton(){return!this.href}}i8.styles=[ie,i3],eq([tX({type:Boolean,reflect:!0,converter:iS})],i8.prototype,"disabled",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],i8.prototype,"loading",void 0),eq([tX({reflect:!0})],i8.prototype,"name",void 0),eq([tX({reflect:!0})],i8.prototype,"value",void 0),eq([tX({reflect:!0})],i8.prototype,"type",void 0),eq([tX({reflect:!0})],i8.prototype,"form",void 0),eq([tX({reflect:!0,attribute:"formaction"})],i8.prototype,"formAction",void 0),eq([tX({reflect:!0,attribute:"formenctype"})],i8.prototype,"formEnctype",void 0),eq([tX({reflect:!0,attribute:"formmethod"})],i8.prototype,"formMethod",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"formnovalidate"})],i8.prototype,"formNoValidate",void 0),eq([tX({reflect:!0,attribute:"formtarget"})],i8.prototype,"formTarget",void 0);const i7=eZ`:host{--shape-corner:var(--mdui-shape-corner-full);position:relative;display:inline-block;overflow:hidden;text-align:center;border-radius:var(--shape-corner);cursor:pointer;-webkit-tap-highlight-color:transparent;transition:box-shadow var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear);min-width:3rem;height:2.5rem;color:rgb(var(--mdui-color-primary));font-size:var(--mdui-typescale-label-large-size);font-weight:var(--mdui-typescale-label-large-weight);letter-spacing:var(--mdui-typescale-label-large-tracking);line-height:var(--mdui-typescale-label-large-line-height)}.button{width:100%;padding:0 1rem}:host([full-width]){display:block}:host([variant=elevated]){box-shadow:var(--mdui-elevation-level1);background-color:rgb(var(--mdui-color-surface-container-low));--mdui-comp-ripple-state-layer-color:var(--mdui-color-primary)}:host([variant=filled]){color:rgb(var(--mdui-color-on-primary));background-color:rgb(var(--mdui-color-primary));--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-primary)}:host([variant=tonal]){color:rgb(var(--mdui-color-on-secondary-container));background-color:rgb(var(--mdui-color-secondary-container));--mdui-comp-ripple-state-layer-color:var(
      --mdui-color-on-secondary-container
    )}:host([variant=outlined]){border:.0625rem solid rgb(var(--mdui-color-outline));--mdui-comp-ripple-state-layer-color:var(--mdui-color-primary)}:host([variant=text]){--mdui-comp-ripple-state-layer-color:var(--mdui-color-primary)}:host([variant=outlined][focus-visible]){border-color:rgb(var(--mdui-color-primary))}:host([variant=elevated][hover]){box-shadow:var(--mdui-elevation-level2)}:host([variant=filled][hover]),:host([variant=tonal][hover]){box-shadow:var(--mdui-elevation-level1)}:host([disabled]),:host([loading]){cursor:default;pointer-events:none}:host([disabled]){color:rgba(var(--mdui-color-on-surface),38%);box-shadow:var(--mdui-elevation-level0)}:host([variant=elevated][disabled]),:host([variant=filled][disabled]),:host([variant=tonal][disabled]){background-color:rgba(var(--mdui-color-on-surface),12%)}:host([variant=outlined][disabled]){border-color:rgba(var(--mdui-color-on-surface),12%)}.label{display:inline-flex;padding-right:.5rem;padding-left:.5rem}.end-icon,.icon{display:inline-flex;font-size:1.28571429em}.end-icon mdui-icon,.icon mdui-icon,::slotted([slot=end-icon]),::slotted([slot=icon]){font-size:inherit}mdui-circular-progress{display:inline-flex;width:1.125rem;height:1.125rem}:host([variant=filled]) mdui-circular-progress{stroke:rgb(var(--mdui-color-on-primary))}:host([variant=tonal]) mdui-circular-progress{stroke:rgb(var(--mdui-color-on-secondary-container))}:host([disabled]) mdui-circular-progress{stroke:rgba(var(--mdui-color-on-surface),38%)}`;/**
 * @summary 按钮组件
 *
 * ```html
 * <mdui-button>Button</mdui-button>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event invalid - 表单字段验证未通过时触发
 *
 * @slot - 按钮的文本
 * @slot icon - 按钮左侧元素
 * @slot end-icon - 按钮右侧元素
 *
 * @csspart button - 内部的 `<button>` 或 `<a>` 元素
 * @csspart label - 按钮文本
 * @csspart icon - 按钮左侧图标
 * @csspart end-icon - 按钮右侧图标
 * @csspart loading - 加载中状态的 `<mdui-circular-progress>` 元素
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let i6=class extends i8{constructor(){super(...arguments),/**
         * 按钮形状。可选值为：
         *
         * * `elevated`：带阴影的按钮，在需要把按钮和背景进行视觉分离时使用
         * * `filled`：视觉效果仅次于 FAB，用于重要流程的最终操作，如“保存”、“确认”等
         * * `tonal`：视觉效果介于 `filled` 和 `outlined` 之间，用于中高优先级的操作，如流程中的“下一步”
         * * `outlined`：带边框的按钮，用于中等优先级，且次要的操作，如“返回”
         * * `text`：文本按钮，用于最低优先级的操作
         */this.variant="filled",/**
         * 是否填满父元素宽度
         */this.fullWidth=!1,this.rippleRef=iF()}get rippleElement(){return this.rippleRef.value}render(){return tI`<mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple>${this.isButton()?this.renderButton({className:"button",part:"button",content:this.renderInner()}):this.disabled||this.loading?tI`<span part="button" class="button _a">${this.renderInner()}</span>`:this.renderAnchor({className:"button",part:"button",content:this.renderInner()})}`}renderIcon(){return this.loading?this.renderLoading():tI`<slot name="icon" part="icon" class="icon">${this.icon?tI`<mdui-icon name="${this.icon}"></mdui-icon>`:t9}</slot>`}renderLabel(){return tI`<slot part="label" class="label"></slot>`}renderEndIcon(){return tI`<slot name="end-icon" part="end-icon" class="end-icon">${this.endIcon?tI`<mdui-icon name="${this.endIcon}"></mdui-icon>`:t9}</slot>`}renderInner(){return[this.renderIcon(),this.renderLabel(),this.renderEndIcon()]}};i6.styles=[i8.styles,i7],eq([tX({reflect:!0})],i6.prototype,"variant",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"full-width"})],i6.prototype,"fullWidth",void 0),eq([tX({reflect:!0})],i6.prototype,"icon",void 0),eq([tX({reflect:!0,attribute:"end-icon"})],i6.prototype,"endIcon",void 0),i6=eq([tW("mdui-button")],i6);const i9=eZ`:host{--shape-corner:var(--mdui-shape-corner-full);position:relative;display:inline-block;overflow:hidden;text-align:center;border-radius:var(--shape-corner);cursor:pointer;-webkit-tap-highlight-color:transparent;font-size:1.5rem;width:2.5rem;min-width:2.5rem;height:2.5rem}:host([variant=standard]){color:rgb(var(--mdui-color-on-surface-variant));--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface-variant)}:host([variant=filled]){color:rgb(var(--mdui-color-primary));background-color:rgb(var(--mdui-color-surface-container-highest));--mdui-comp-ripple-state-layer-color:var(--mdui-color-primary)}:host([variant=tonal]){color:rgb(var(--mdui-color-on-surface-variant));background-color:rgb(var(--mdui-color-surface-container-highest));--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface-variant)}:host([variant=outlined]){border:.0625rem solid rgb(var(--mdui-color-outline));color:rgb(var(--mdui-color-on-surface-variant));--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface-variant)}:host([variant=outlined][pressed]){color:rgb(var(--mdui-color-on-surface));--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}:host([variant=standard][selected]){color:rgb(var(--mdui-color-primary));--mdui-comp-ripple-state-layer-color:var(--mdui-color-primary)}:host([variant=filled]:not([selectable])),:host([variant=filled][selected]){color:rgb(var(--mdui-color-on-primary));background-color:rgb(var(--mdui-color-primary));--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-primary)}:host([variant=tonal]:not([selectable])),:host([variant=tonal][selected]){color:rgb(var(--mdui-color-on-secondary-container));background-color:rgb(var(--mdui-color-secondary-container));--mdui-comp-ripple-state-layer-color:var(
      --mdui-color-on-secondary-container
    )}:host([variant=outlined][selected]){border:none;color:rgb(var(--mdui-color-inverse-on-surface));background-color:rgb(var(--mdui-color-inverse-surface));--mdui-comp-ripple-state-layer-color:var(--mdui-color-inverse-on-surface)}:host([variant=filled][disabled]),:host([variant=outlined][disabled]),:host([variant=tonal][disabled]){background-color:rgba(var(--mdui-color-on-surface),.12);border-color:rgba(var(--mdui-color-on-surface),.12)}:host([disabled]),:host([loading]){cursor:default;pointer-events:none}:host([disabled]){color:rgba(var(--mdui-color-on-surface),.38)!important}:host([loading]) .button,:host([loading]) mdui-ripple{opacity:0}.button{float:left;width:100%}.icon,.selected-icon mdui-icon,::slotted(*){font-size:inherit}mdui-circular-progress{display:flex;position:absolute;top:calc(50% - 1.5rem / 2);left:calc(50% - 1.5rem / 2);width:1.5rem;height:1.5rem}:host([variant=filled]:not([disabled])) mdui-circular-progress{stroke:rgb(var(--mdui-color-on-primary))}:host([disabled]) mdui-circular-progress{stroke:rgba(var(--mdui-color-on-surface),38%)}`;/**
 * @summary 图标按钮组件
 *
 * ```html
 * <mdui-button-icon icon="search"></mdui-button-icon>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event change - 选中状态变更时触发
 * @event invalid - 表单字段验证未通过时触发
 *
 * @slot - 图标组件
 * @slot selected-icon 选中状态显示的图标元素
 *
 * @csspart button - 内部的 `<button>` 或 `<a>` 元素
 * @csspart icon - 未选中状态的图标
 * @csspart selected-icon 选中状态的图标
 * @csspart loading - 加载中状态的 `<mdui-circular-progress>` 元素
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let oe=class extends i8{constructor(){super(...arguments),/**
         * 图标按钮的形状。可选值为：
         *
         * * `standard`：用于最低优先级的操作
         * * `filled`：具有最强视觉效果，用于高优先级的操作
         * * `tonal`：视觉效果介于 `filled` 和 `outlined` 之间，用于中高优先级的操作
         * * `outlined`：用于中等优先级的操作
         */this.variant="standard",/**
         * 是否可选中
         */this.selectable=!1,/**
         * 是否已选中
         */this.selected=!1,this.rippleRef=iF(),this.hasSlotController=new t6(this,"[default]","selected-icon")}get rippleElement(){return this.rippleRef.value}onSelectedChange(){this.emit("change")}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",()=>{this.selectable&&!this.disabled&&(this.selected=!this.selected)})}render(){return tI`<mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple>${this.isButton()?this.renderButton({className:"button",part:"button",content:this.renderIcon()}):this.disabled||this.loading?tI`<span part="button" class="button _a">${this.renderIcon()}</span>`:this.renderAnchor({className:"button",part:"button",content:this.renderIcon()})} ${this.renderLoading()}`}renderIcon(){return this.selected&&(this.hasSlotController.test("selected-icon")||this.selectedIcon)?tI`<slot name="selected-icon" part="selected-icon" class="selected-icon"><mdui-icon name="${this.selectedIcon}"></mdui-icon></slot>`:this.hasSlotController.test("[default]")?tI`<slot></slot>`:this.icon?tI`<mdui-icon part="icon" class="icon" name="${this.icon}"></mdui-icon>`:t9}};oe.styles=[i8.styles,i9],eq([tX({reflect:!0})],oe.prototype,"variant",void 0),eq([tX({reflect:!0})],oe.prototype,"icon",void 0),eq([tX({reflect:!0,attribute:"selected-icon"})],oe.prototype,"selectedIcon",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oe.prototype,"selectable",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oe.prototype,"selected",void 0),eq([iD("selected",!0)],oe.prototype,"onSelectedChange",null),oe=eq([tW("mdui-button-icon")],oe);const ot=eZ`:host{--shape-corner:var(--mdui-shape-corner-medium);position:relative;display:inline-block;overflow:hidden;border-radius:var(--shape-corner);-webkit-tap-highlight-color:transparent;transition:box-shadow var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear);--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}:host([clickable]){cursor:pointer}:host([variant=elevated]){background-color:rgb(var(--mdui-color-surface-container-low));box-shadow:var(--mdui-elevation-level1)}:host([variant=filled]){background-color:rgb(var(--mdui-color-surface-container-highest))}:host([variant=outlined]){background-color:rgb(var(--mdui-color-surface));border:.0625rem solid rgb(var(--mdui-color-outline))}:host([variant=elevated][hover]){box-shadow:var(--mdui-elevation-level2)}:host([variant=filled][hover]),:host([variant=outlined][hover]){box-shadow:var(--mdui-elevation-level1)}:host([variant=elevated][dragged]),:host([variant=filled][dragged]),:host([variant=outlined][dragged]){box-shadow:var(--mdui-elevation-level3)}:host([disabled]){opacity:.38;cursor:default;-webkit-user-select:none;user-select:none}:host([variant=elevated][disabled]){background-color:rgb(var(--mdui-color-surface-variant));box-shadow:var(--mdui-elevation-level0)}:host([variant=filled][disabled]){background-color:rgb(var(--mdui-color-surface));box-shadow:var(--mdui-elevation-level1)}:host([variant=outlined][disabled]){box-shadow:var(--mdui-elevation-level0);border-color:rgba(var(--mdui-color-outline),.32)}.link{position:relative;display:inline-block;width:100%;height:100%;color:inherit;font-size:inherit;letter-spacing:inherit;text-decoration:none;touch-action:manipulation;-webkit-user-drag:none}`;/**
 * @summary 卡片组件
 *
 * ```html
 * <mdui-card>card content</mdui-card>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 *
 * @slot - 卡片内容
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let oi=class extends iG(i4(iZ(t7))){constructor(){super(...arguments),/**
         * 卡片形状。可选值为：
         *
         * * `elevated`：具有阴影，与背景的分离度比 `filled` 更高，但小于 `outlined`
         * * `filled`：与背景的分离度最小
         * * `outlined`：具有边框，与背景的分离度最大
         */this.variant="elevated",/**
         * 是否可点击。为 `true` 时，会添加鼠标悬浮效果、及点击涟漪效果
         */this.clickable=!1,/**
         * 是否禁用
         */this.disabled=!1,this.rippleRef=iF()}get rippleElement(){return this.rippleRef.value}get rippleDisabled(){return this.disabled||!this.href&&!this.clickable}get focusElement(){return this.href&&!this.disabled?this.renderRoot.querySelector("._a"):this}get focusDisabled(){return this.rippleDisabled}render(){return tI`<mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple>${this.href&&!this.disabled?this.renderAnchor({className:"link",content:tI`<slot></slot>`}):tI`<slot></slot>`}`}};oi.styles=[ie,ot],eq([tX({reflect:!0})],oi.prototype,"variant",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oi.prototype,"clickable",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oi.prototype,"disabled",void 0),oi=eq([tW("mdui-card")],oi);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oo=t2(class extends t5{constructor(e){if(super(e),e.type!==t1.PROPERTY&&e.type!==t1.ATTRIBUTE&&e.type!==t1.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ia(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===tS||t===tA)return t;let i=e.element,o=e.name;if(e.type===t1.PROPERTY){if(t===i[o])return tS}else if(e.type===t1.BOOLEAN_ATTRIBUTE){if(!!t===i.hasAttribute(o))return tS}else if(e.type===t1.ATTRIBUTE&&i.getAttribute(o)===t+"")return tS;return id(e),t}});/**
 * defaultValue 装饰器。在 attribute 属性变更时，若值和 property 值不一致，则会保存新的 attribute 值
 *
 * 用于在调用表单的 reset() 方法时，还原成初始值
 *
 * @property({ reflect: true }) value = '';
 * @defaultValue() defaultValue = '';
 *
 * @property({ type: Boolean, reflect: true }) checked = false;
 * @defaultValue('checked') defaultChecked = false;
 */function or(e="value"){return(t,i)=>{let o=t.constructor,r=o.prototype.attributeChangedCallback;o.prototype.attributeChangedCallback=function(t,n,s){let a=o.getPropertyOptions(e),l=m(a.attribute)?a.attribute:e;if(t===l){let t=a.converter||ti,o=p(t)?t:t?.fromAttribute??ti.fromAttribute,r=o(s,a.type);this[e]!==r&&(this[i]=r)}r.call(this,t,n,s)}}}const on=eZ`:host{display:inline-block;width:1em;height:1em;line-height:1;font-size:1.5rem}`,os=e=>tI`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">${io(e)}</svg>`;let oa=class extends tq{render(){return os('<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>')}};oa.styles=on,oa=eq([tW("mdui-icon-check-box-outline-blank")],oa);let ol=class extends tq{render(){return os('<path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>')}};ol.styles=on,ol=eq([tW("mdui-icon-check-box")],ol);let od=class extends tq{render(){return os('<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>')}};od.styles=on,od=eq([tW("mdui-icon-indeterminate-check-box")],od);const oc=eZ`:host{position:relative;display:inline-flex;cursor:pointer;-webkit-tap-highlight-color:transparent;border-radius:.125rem;font-size:var(--mdui-typescale-label-large-size);font-weight:var(--mdui-typescale-label-large-weight);letter-spacing:var(--mdui-typescale-label-large-tracking);line-height:var(--mdui-typescale-label-large-line-height)}label{display:inline-flex;align-items:center;width:100%;cursor:inherit;-webkit-user-select:none;user-select:none;touch-action:manipulation;zoom:1;-webkit-user-drag:none}input{position:absolute;padding:0;opacity:0;pointer-events:none;width:1.125rem;height:1.125rem;margin:0 0 0 .6875rem}.icon{display:flex;position:absolute;opacity:1;transform:scale(1);color:rgb(var(--mdui-color-on-surface));font-size:1.5rem;transition:color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard)}.checked-icon,.indeterminate-icon{opacity:0;transform:scale(.5);transition-property:color,opacity,transform;transition-duration:var(--mdui-motion-duration-short4);transition-timing-function:var(--mdui-motion-easing-standard)}.icon .i,::slotted([slot=checked-icon]),::slotted([slot=indeterminate-icon]),::slotted([slot=unchecked-icon]){color:inherit;font-size:inherit}i{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:50%;width:2.5rem;min-width:2.5rem;height:2.5rem;--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}.label{display:flex;width:100%;padding-top:.625rem;padding-bottom:.625rem;color:rgb(var(--mdui-color-on-surface));transition:color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard)}:host([checked]) i{--mdui-comp-ripple-state-layer-color:var(--mdui-color-primary)}:host([checked]) .icon{color:rgb(var(--mdui-color-primary))}:host([checked]) .indeterminate-icon{opacity:0;transform:scale(.5)}:host([checked]) .checked-icon{opacity:1;transform:scale(1)}:host([indeterminate]) i{--mdui-comp-ripple-state-layer-color:var(--mdui-color-primary)}:host([indeterminate]) .icon{color:rgb(var(--mdui-color-primary))}:host([indeterminate]) .checked-icon{opacity:0;transform:scale(.5)}:host([indeterminate]) .indeterminate-icon{opacity:1;transform:scale(1)}.invalid i{--mdui-comp-ripple-state-layer-color:var(--mdui-color-error)}.invalid .icon{color:rgb(var(--mdui-color-error))}.invalid .label{color:rgb(var(--mdui-color-error))}:host([disabled]){cursor:default;pointer-events:none}:host([disabled]) .icon{color:rgba(var(--mdui-color-on-surface),38%)}:host([disabled]) .label{color:rgba(var(--mdui-color-on-surface),38%)}:host([disabled][checked]) .unchecked-icon,:host([disabled][indeterminate]) .unchecked-icon{opacity:0}`;/**
 * @summary 复选框组件
 *
 * ```html
 * <mdui-checkbox>Checkbox</mdui-checkbox>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event change - 选中状态变更时触发
 * @event input - 选中状态变更时触发
 * @event invalid - 表单字段验证未通过时触发
 *
 * @slot - 文本
 * @slot unchecked-icon - 未选中状态图标
 * @slot checked-icon - 选中状态图标
 * @slot indeterminate-icon - 不确定状态图标
 *
 * @csspart control - 左侧图标容器
 * @csspart unchecked-icon - 未选中状态图标
 * @csspart checked-icon - 选中状态图标
 * @csspart indeterminate-icon - 不确定状态图标
 * @csspart label - 文本
 */let oh=class extends i4(iZ(t7)){constructor(){super(...arguments),/**
         * 是否为禁用状态
         */this.disabled=!1,/**
         * 是否为选中状态
         */this.checked=!1,/**
         * 默认选中状态。在重置表单时，将重置为该默认状态。该属性只能通过 JavaScript 属性设置
         */this.defaultChecked=!1,/**
         * 是否为不确定状态
         */this.indeterminate=!1,/**
         * 提交表单时，是否必须选中该复选框
         */this.required=!1,/**
         * 复选框名称，将与表单数据一起提交
         */this.name="",/**
         * 复选框的值，将于表单数据一起提交
         */this.value="on",/**
         * 是否验证未通过
         */this.invalid=!1,this.inputRef=iF(),this.rippleRef=iF(),this.formController=new iY(this,{value:e=>e.checked?e.value:void 0,defaultValue:e=>e.defaultChecked,setValue:(e,t)=>e.checked=t})}/**
     * 表单验证状态对象
     */get validity(){return this.inputRef.value.validity}/**
     * 表单验证的错误提示信息
     */get validationMessage(){return this.inputRef.value.validationMessage}get rippleElement(){return this.rippleRef.value}get rippleDisabled(){return this.disabled}get focusElement(){return this.inputRef.value}get focusDisabled(){return this.disabled}async onDisabledChange(){await this.updateComplete,this.invalid=!this.inputRef.value.checkValidity()}async onCheckedChange(){await this.updateComplete;// reset 引起的值变更，不执行验证；直接修改值引起的变更，需要进行验证
let e=this.formController.getForm();e&&iW.get(e)?.has(this)?(this.invalid=!1,iW.get(e).delete(this)):this.invalid=!this.inputRef.value.checkValidity()}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`
     */checkValidity(){let e=this.inputRef.value.checkValidity();return e||this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1}),e}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`。
     *
     * 验证未通过时，还将在组件上显示未通过的提示。
     */reportValidity(){if(this.invalid=!this.inputRef.value.reportValidity(),this.invalid){let e=this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1});// 调用了 preventDefault() 时，隐藏默认的表单错误提示
e||(this.blur(),this.focus())}return!this.invalid}/**
     * 设置自定义的错误提示文本。只要文本不为空，则表示字段验证未通过
     *
     * @param message 自定义的提示文本
     */setCustomValidity(e){this.inputRef.value.setCustomValidity(e),this.invalid=!this.inputRef.value.checkValidity()}render(){return tI`<label class="${iQ({invalid:this.invalid})}"><input ${iK(this.inputRef)} type="checkbox" name="${t0(this.name)}" value="${t0(this.value)}" .indeterminate="${oo(this.indeterminate)}" .disabled="${this.disabled}" .checked="${oo(this.checked)}" .required="${this.required}" @change="${this.onChange}"> <i part="control"><mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple><slot name="unchecked-icon" part="unchecked-icon" class="icon unchecked-icon">${this.uncheckedIcon?tI`<mdui-icon name="${this.uncheckedIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-check-box-outline-blank class="i"></mdui-icon-check-box-outline-blank>`}</slot><slot name="checked-icon" part="checked-icon" class="icon checked-icon">${this.checkedIcon?tI`<mdui-icon name="${this.checkedIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-check-box class="i"></mdui-icon-check-box>`}</slot><slot name="indeterminate-icon" part="indeterminate-icon" class="icon indeterminate-icon">${this.indeterminateIcon?tI`<mdui-icon name="${this.indeterminateIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-indeterminate-check-box class="i"></mdui-icon-indeterminate-check-box>`}</slot></i><slot part="label" class="label"></slot></label>`}/**
     * input[type="checkbox"] 的 change 事件无法冒泡越过 shadow dom
     */onChange(){this.checked=this.inputRef.value.checked,this.indeterminate=!1,this.emit("change")}};oh.styles=[ie,oc],eq([tX({type:Boolean,reflect:!0,converter:iS})],oh.prototype,"disabled",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oh.prototype,"checked",void 0),eq([or("checked")],oh.prototype,"defaultChecked",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oh.prototype,"indeterminate",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oh.prototype,"required",void 0),eq([tX({reflect:!0})],oh.prototype,"form",void 0),eq([tX({reflect:!0})],oh.prototype,"name",void 0),eq([tX({reflect:!0})],oh.prototype,"value",void 0),eq([tX({reflect:!0,attribute:"unchecked-icon"})],oh.prototype,"uncheckedIcon",void 0),eq([tX({reflect:!0,attribute:"checked-icon"})],oh.prototype,"checkedIcon",void 0),eq([tX({reflect:!0,attribute:"indeterminate-icon"})],oh.prototype,"indeterminateIcon",void 0),eq([tJ()],oh.prototype,"invalid",void 0),eq([iD("disabled",!0),iD("indeterminate",!0),iD("required",!0)],oh.prototype,"onDisabledChange",null),eq([iD("checked",!0)],oh.prototype,"onCheckedChange",null),oh=eq([tW("mdui-checkbox")],oh);let ou=class extends tq{render(){return os('<path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>')}};ou.styles=on,ou=eq([tW("mdui-icon-check")],ou);let op=class extends tq{render(){return os('<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>')}};op.styles=on,op=eq([tW("mdui-icon-clear")],op);const om=eZ`:host{--shape-corner:var(--mdui-shape-corner-small);position:relative;display:inline-block;overflow:hidden;border-radius:var(--shape-corner);cursor:pointer;-webkit-tap-highlight-color:transparent;transition:box-shadow var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear);height:2rem;background-color:rgb(var(--mdui-color-surface));border:.0625rem solid rgb(var(--mdui-color-outline));color:rgb(var(--mdui-color-on-surface-variant));font-size:var(--mdui-typescale-label-large-size);font-weight:var(--mdui-typescale-label-large-weight);letter-spacing:var(--mdui-typescale-label-large-tracking);line-height:var(--mdui-typescale-label-large-line-height);--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface-variant)}.button{padding-right:.4375rem;padding-left:.4375rem}:host([variant=input]) .button{padding-right:.1875rem;padding-left:.1875rem}:host([selected]) .button{padding-right:.5rem;padding-left:.5rem}:host([selected][variant=input]) .button{padding-right:.25rem;padding-left:.25rem}:host([elevated]) .button{padding-right:.5rem;padding-left:.5rem}:host([variant=assist]){color:rgb(var(--mdui-color-on-surface));--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}:host([elevated]){border-width:0;background-color:rgb(var(--mdui-color-surface-container-low));box-shadow:var(--mdui-elevation-level1)}:host([selected]){color:rgb(var(--mdui-color-on-secondary-container));background-color:rgb(var(--mdui-color-secondary-container));border-width:0;--mdui-comp-ripple-state-layer-color:var(
      --mdui-color-on-secondary-container
    )}:host([disabled]),:host([loading]){cursor:default;pointer-events:none}:host([disabled]){border-color:rgba(var(--mdui-color-on-surface),12%);color:rgba(var(--mdui-color-on-surface),38%);box-shadow:var(--mdui-elevation-level0)}:host([disabled][elevated]),:host([disabled][selected]){background-color:rgba(var(--mdui-color-on-surface),12%)}:host([selected][hover]){box-shadow:var(--mdui-elevation-level1)}:host([elevated][hover]){color:rgb(var(--mdui-color-on-secondary-container));box-shadow:var(--mdui-elevation-level2)}:host([variant=filter][hover]),:host([variant=input][hover]),:host([variant=suggestion][hover]){color:rgb(var(--mdui-color-on-surface-variant))}:host([variant=filter][focus-visible]),:host([variant=input][focus-visible]),:host([variant=suggestion][focus-visible]){border-color:rgb(var(--mdui-color-on-surface-variant))}:host([dragged]),:host([dragged][hover]){box-shadow:var(--mdui-elevation-level4)}.button{overflow:visible}.label{display:inline-flex;padding-right:.5rem;padding-left:.5rem}.end-icon,.icon,.selected-icon{display:inline-flex;font-size:1.28571429em;color:rgb(var(--mdui-color-on-surface-variant))}:host([variant=assist]) .end-icon,:host([variant=assist]) .icon,:host([variant=assist]) .selected-icon{color:rgb(var(--mdui-color-primary))}:host([selected]) .end-icon,:host([selected]) .icon,:host([selected]) .selected-icon{color:rgb(var(--mdui-color-on-secondary-container))}:host([disabled]) .end-icon,:host([disabled]) .icon,:host([disabled]) .selected-icon{opacity:.38;color:rgb(var(--mdui-color-on-surface))}.end-icon .i,.icon .i,.selected-icon .i,::slotted([slot=end-icon]),::slotted([slot=icon]),::slotted([slot=selected-icon]){font-size:inherit}:host([variant=input]) .has-icon .icon,:host([variant=input]) .has-icon .selected-icon,:host([variant=input]) .has-icon mdui-circular-progress{margin-left:.25rem}:host([variant=input]) .has-end-icon .end-icon{margin-right:.25rem}mdui-circular-progress{display:inline-flex;width:1.125rem;height:1.125rem}:host([disabled]) mdui-circular-progress{stroke:rgba(var(--mdui-color-on-surface),38%)}::slotted(mdui-avatar[slot=end-icon]),::slotted(mdui-avatar[slot=icon]),::slotted(mdui-avatar[slot=selected-icon]){width:1.5rem;height:1.5rem}:host([disabled]) ::slotted(mdui-avatar[slot=end-icon]),:host([disabled]) ::slotted(mdui-avatar[slot=icon]),:host([disabled]) ::slotted(mdui-avatar[slot=selected-icon]){opacity:.38}::slotted(mdui-avatar[slot=icon]),::slotted(mdui-avatar[slot=selected-icon]){margin-left:-.25rem;margin-right:-.125rem}::slotted(mdui-avatar[slot=end-icon]){margin-right:-.25rem;margin-left:-.125rem}.delete-icon{display:inline-flex;font-size:1.28571429em;transition:background-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear);border-radius:var(--mdui-shape-corner-full);margin-right:-.25rem;margin-left:-.25rem;padding:.25rem;color:rgb(var(--mdui-color-on-surface-variant))}.delete-icon:hover{background-color:rgba(var(--mdui-color-on-surface-variant),12%)}.has-end-icon .delete-icon{margin-left:.25rem}:host([variant=assiat]) .delete-icon{color:rgb(var(--mdui-color-primary))}:host([variant=input]) .delete-icon{margin-right:.0625rem}:host([disabled]) .delete-icon{color:rgba(var(--mdui-color-on-surface),38%)}.delete-icon .i,::slotted([slot=delete-icon]){font-size:inherit}::slotted(mdui-avatar[slot=delete-icon]){width:1.125rem;height:1.125rem}`;/**
 * @summary 纸片组件
 *
 * ```html
 * <mdui-chip>Chip</mdui-chip>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event invalid - 表单字段验证未通过时触发
 * @event change - 选中状态变更时触发
 * @event delete - 点击删除图标时触发
 *
 * @slot - 文本
 * @slot icon - 左侧元素
 * @slot end-icon - 右侧元素
 * @slot selected-icon - 选中状态的左侧元素
 * @slot delete-icon - 可删除时，右侧的删除元素
 *
 * @csspart button - 内部的 `button` 或 `a` 元素
 * @csspart label - 文本
 * @csspart icon - 左侧图标
 * @csspart end-icon - 右侧图标
 * @csspart selected-icon - 选中状态的左侧图标
 * @csspart delete-icon - 可删除时，右侧的删除图标
 * @csspart loading - 加载中状态的 `<mdui-circular-progress>` 元素
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let of=class extends i8{constructor(){super(),/**
         * 纸片形状。可选值为：
         *
         * * `assist`：用于显示和当前上下文相关的辅助操作。例如在点餐页面，提供分享，收藏等功能
         * * `filter`：用于对内容进行筛选。例如在搜索结果页，对搜索结果进行过滤
         * * `input`：用于表示用户输入的信息片段。例如 Gmail 中“收件人”字段中的联系人
         * * `suggestion`：用于提供动态生成的推荐信息，以简化用户操作。例如在聊天应用中猜测用户可能想发送的信息，供用户选择
         */this.variant="assist",/**
         * 是否包含阴影
         */this.elevated=!1,/**
         * 是否可选中
         */this.selectable=!1,/**
         * 是否为选中状态
         */this.selected=!1,/**
         * 是否可删除。为 `true` 时，在右侧会显示删除图标图标
         */this.deletable=!1,this.rippleRef=iF(),this.hasSlotController=new t6(this,"icon","selected-icon","end-icon"),this.onClick=this.onClick.bind(this),this.onKeyDown=this.onKeyDown.bind(this)}get rippleElement(){return this.rippleRef.value}onSelectedChange(){this.emit("change")}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.onClick),this.addEventListener("keydown",this.onKeyDown)}render(){let e=this.icon||this.hasSlotController.test("icon"),t=this.endIcon||this.hasSlotController.test("end-icon"),i=this.selectedIcon||["assist","filter"].includes(this.variant)||e||this.hasSlotController.test("selected-icon"),o=iq({button:!0,"has-icon":this.loading||!this.selected&&e||this.selected&&i,"has-end-icon":t});return tI`<mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple>${this.isButton()?this.renderButton({className:o,part:"button",content:this.renderInner()}):this.disabled||this.loading?tI`<span part="button" class="${o} _a">${this.renderInner()}</span>`:this.renderAnchor({className:o,part:"button",content:this.renderInner()})}`}onClick(){this.disabled||this.loading||!this.selectable||(this.selected=!this.selected)}onKeyDown(e){!this.disabled&&!this.loading&&(this.selectable&&" "===e.key&&(e.preventDefault(),this.selected=!this.selected),this.deletable&&["Delete","Backspace"].includes(e.key)&&this.emit("delete"))}/**
     * 点击删除按钮
     */onDelete(e){e.stopPropagation(),this.emit("delete")}renderIcon(){if(this.loading)return this.renderLoading();let e=()=>this.icon?tI`<mdui-icon name="${this.icon}" class="i"></mdui-icon>`:t9;return this.selected?tI`<slot name="selected-icon" part="selected-icon" class="selected-icon">${this.selectedIcon?tI`<mdui-icon name="${this.selectedIcon}" class="i"></mdui-icon>`:"assist"===this.variant||"filter"===this.variant?tI`<mdui-icon-check class="i"></mdui-icon-check>`:e()}</slot>`:tI`<slot name="icon" part="icon" class="icon">${e()}</slot>`}renderLabel(){return tI`<slot part="label" class="label"></slot>`}renderEndIcon(){return tI`<slot name="end-icon" part="end-icon" class="end-icon">${this.endIcon?tI`<mdui-icon name="${this.endIcon}" class="i"></mdui-icon>`:t9}</slot>`}renderDeleteIcon(){return this.deletable?tI`<slot name="delete-icon" part="delete-icon" class="delete-icon" @click="${this.onDelete}">${this.deleteIcon?tI`<mdui-icon name="${this.deleteIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-clear class="i"></mdui-icon-clear>`}</slot>`:t9}renderInner(){return[this.renderIcon(),this.renderLabel(),this.renderEndIcon(),this.renderDeleteIcon()]}};of.styles=[i8.styles,om],eq([tX({reflect:!0})],of.prototype,"variant",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],of.prototype,"elevated",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],of.prototype,"selectable",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],of.prototype,"selected",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],of.prototype,"deletable",void 0),eq([tX({reflect:!0})],of.prototype,"icon",void 0),eq([tX({reflect:!0,attribute:"selected-icon"})],of.prototype,"selectedIcon",void 0),eq([tX({reflect:!0,attribute:"end-icon"})],of.prototype,"endIcon",void 0),eq([tX({reflect:!0,attribute:"delete-icon"})],of.prototype,"deleteIcon",void 0),eq([iD("selected",!0)],of.prototype,"onSelectedChange",null),of=eq([tW("mdui-chip")],of);/**
 * 检查两个数组是否包含相同的元素，不考虑顺序
 * @param a
 * @param b
 */const ov=(e,t)=>{if(e.length!==t.length)return!1;let i=[...e].sort(),o=[...t].sort();return i.every((e,t)=>e===o[t])},og=eZ`:host{display:block}`;/**
 * @summary 折叠面板组件。需与 `<mdui-collapse-item>` 组件配合使用
 *
 * ```html
 * <mdui-collapse>
 * ..<mdui-collapse-item header="header-1">content-1</mdui-collapse-item>
 * ..<mdui-collapse-item header="header-2">content-2</mdui-collapse-item>
 * </mdui-collapse>
 * ```
 *
 * @event change - 当前打开的折叠面板项改变时触发
 *
 * @slot - `<mdui-collapse-item>` 组件
 */let ob=class extends t7{constructor(){super(...arguments),/**
         * 是否为手风琴模式
         */this.accordion=!1,/**
         * 是否禁用该折叠面板
         */this.disabled=!1,// 因为 collapse-item 的 value 可能会重复，所以在每个 collapse-item 元素上都添加了一个唯一的 key，通过 activeKey 来记录激活状态的 key
this.activeKeys=[],// 是否是初始状态，初始状态不触发 change 事件，没有动画
this.isInitial=!0,this.definedController=new iA(this,{relatedElements:["mdui-collapse-item"]})}async onActiveKeysChange(){await this.definedController.whenDefined();// 根据 activeKeys 读取对应 collapse-item 的值
let e=this.accordion?this.items.find(e=>this.activeKeys.includes(e.key))?.value:this.items.filter(e=>this.activeKeys.includes(e.key)).map(e=>e.value);this.setValue(e),this.isInitial||this.emit("change")}async onValueChange(){if(this.isInitial=!this.hasUpdated,await this.definedController.whenDefined(),this.accordion){let e=this.value;if(e){let t=this.items.find(t=>t.value===e);this.setActiveKeys(t?[t.key]:[])}else this.setActiveKeys([])}else{let e=this.value;if(e.length){let t=this.items.filter(t=>e.includes(t.value)).map(e=>e.key);this.setActiveKeys(t)}else this.setActiveKeys([])}this.updateItems()}render(){return tI`<slot @slotchange="${this.onSlotChange}" @click="${this.onClick}"></slot>`}setActiveKeys(e){ov(this.activeKeys,e)||(this.activeKeys=e)}setValue(e){this.accordion||g(this.value)||g(e)?this.value=e:ov(this.value,e)||(this.value=e)}onClick(e){// 全部禁用
if(this.disabled||e.button)return;let t=e.target,i=t.closest("mdui-collapse-item");// collapse-item 被禁用，忽略
if(!i||i.disabled)return;let o=e.composedPath();// 指定了 trigger 时，点击了其他地方时，忽略
if((!i.trigger||o.find(e=>k(e)&&z(e).is(i.trigger)))&&o.find(e=>k(e)&&e.part.contains("header"))){if(this.accordion)this.activeKeys.includes(i.key)?this.setActiveKeys([]):this.setActiveKeys([i.key]);else{// 直接修改 this.activeKeys 无法被 watch 监听到，需要先克隆一份 this.activeKeys
let e=[...this.activeKeys];e.includes(i.key)?e.splice(e.indexOf(i.key),1):e.push(i.key),this.setActiveKeys(e)}this.isInitial=!1,this.updateItems()}}async onSlotChange(){await this.definedController.whenDefined(),this.updateItems()}// 更新 <mdui-collapse-item> 的状态
updateItems(){this.items.forEach(e=>{e.active=this.activeKeys.includes(e.key),e.isInitial=this.isInitial})}};ob.styles=[ie,og],eq([tX({type:Boolean,reflect:!0,converter:iS})],ob.prototype,"accordion",void 0),eq([tX()],ob.prototype,"value",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],ob.prototype,"disabled",void 0),eq([tJ()],ob.prototype,"activeKeys",void 0),eq([tQ({selector:"mdui-collapse-item",flatten:!0})],ob.prototype,"items",void 0),eq([iD("activeKeys",!0)],ob.prototype,"onActiveKeysChange",null),eq([iD("value")],ob.prototype,"onValueChange",null),ob=eq([tW("mdui-collapse")],ob);const oy=eZ`:host{display:flex;flex-direction:column}.header{display:block}.body{display:block;overflow:hidden;transition:height var(--mdui-motion-duration-short4) var(--mdui-motion-easing-emphasized)}.body.opened{overflow:visible}.body.active{transition-duration:var(--mdui-motion-duration-medium4)}`;/**
 * @summary 折叠面板项组件。需与 `<mdui-collapse>` 组件配合使用
 *
 * ```html
 * <mdui-collapse>
 * ..<mdui-collapse-item header="header-1">content-1</mdui-collapse-item>
 * ..<mdui-collapse-item header="header-2">content-2</mdui-collapse-item>
 * </mdui-collapse>
 * ```
 *
 * @event open - 开始打开时，事件被触发
 * @event opened - 打开动画完成时，事件被触发
 * @event close - 开始关闭时，事件被触发
 * @event closed - 关闭动画完成时，事件被触发
 *
 * @slot - 折叠面板项的正文内容
 * @slot header - 折叠面板项的头部内容
 *
 * @csspart header - 折叠面板的头部内容
 * @csspart body - 折叠面板的正文内容
 */let ow=class extends t7{constructor(){super(...arguments),/**
         * 是否禁用该折叠面板项
         */this.disabled=!1,/**
         * 是否为激活状态，由 `collapse` 组件控制该参数
         */this.active=!1,this.state="closed",// 是否是初始状态，不显示动画
this.isInitial=!0,// 每一个 `collapse-item` 元素都添加一个唯一的 key
this.key=iM(),this.bodyRef=iF()}onActiveChange(){this.isInitial?(this.state=this.active?"opened":"closed",this.hasUpdated&&this.updateBodyHeight()):(this.state=this.active?"open":"close",this.emit(this.state),this.updateBodyHeight())}firstUpdated(e){super.firstUpdated(e),this.updateBodyHeight()}render(){return tI`<slot name="header" part="header" class="header">${this.header}</slot><slot part="body" class="body ${iQ({opened:"opened"===this.state,active:this.active})}" ${iK(this.bodyRef)} @transitionend="${this.onTransitionEnd}"></slot>`}onTransitionEnd(e){e.target===this.bodyRef.value&&(this.state=this.active?"opened":"closed",this.emit(this.state),this.updateBodyHeight())}updateBodyHeight(){let e=this.bodyRef.value.scrollHeight;"close"===this.state&&(z(this.bodyRef.value).height(e),this.bodyRef.value.clientLeft),z(this.bodyRef.value).height("opened"===this.state?"auto":"open"===this.state?e:0)}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ok(e,t,i){return e?t(e):i?.(e)}function oC(e,t,i){return e?new Promise(o=>{if(i.duration===1/0)throw Error("Promise-based animations must be finite.");f(i.duration)&&isNaN(i.duration)&&(i.duration=0),""===i.easing&&(i.easing="linear");let r=e.animate(t,i);r.addEventListener("cancel",o,{once:!0}),r.addEventListener("finish",o,{once:!0})}):Promise.resolve()}function ox(e){return e?Promise.all(e.getAnimations().map(e=>new Promise(t=>{let i=requestAnimationFrame(t);e.addEventListener("cancel",()=>i,{once:!0}),e.addEventListener("finish",()=>i,{once:!0}),e.cancel()}))):Promise.resolve()}/** https://github.com/shoelace-style/shoelace/blob/next/src/internal/modal.ts *//** https://github.com/shoelace-style/shoelace/blob/next/src/internal/tabbable.ts *//** Determines if the specified element is tabbable using heuristics inspired by https://github.com/focus-trap/tabbable */function o$(e){let t=c(),i=e.localName;return(// Elements with a -1 tab index are not tabbable
!("-1"===e.getAttribute("tabindex")||e.hasAttribute("disabled")||e.hasAttribute("aria-disabled")&&"false"!==e.getAttribute("aria-disabled"))&&("input"!==i||"radio"!==e.getAttribute("type")||!!e.hasAttribute("checked"))&&null!==e.offsetParent&&"hidden"!==t.getComputedStyle(e).visibility&&(!!(("audio"===i||"video"===i)&&e.hasAttribute("controls")||e.hasAttribute("tabindex")||e.hasAttribute("contenteditable")&&"false"!==e.getAttribute("contenteditable"))||["button","input","select","textarea","a","audio","video","summary"].includes(i)))}ow.styles=[ie,oy],eq([tX({reflect:!0})],ow.prototype,"value",void 0),eq([tX({reflect:!0})],ow.prototype,"header",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],ow.prototype,"disabled",void 0),eq([tX()],ow.prototype,"trigger",void 0),eq([tJ()],ow.prototype,"active",void 0),eq([tJ()],ow.prototype,"state",void 0),eq([iD("active")],ow.prototype,"onActiveChange",null),ow=eq([tW("mdui-collapse-item")],ow);let oR=[];class oE{constructor(e){this.tabDirection="forward",this.element=e,this.handleFocusIn=this.handleFocusIn.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this)}activate(){oR.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){oR=oR.filter(e=>e!==this.element),document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){// The "active" modal is always the most recent one shown
return oR[oR.length-1]===this.element}checkFocus(){if(this.isActive()&&!this.element.matches(":focus-within")){let{start:e,end:t}=function(e){let t=[];// Collect all elements including the root
!function e(i){i instanceof HTMLElement&&(t.push(i),null!==i.shadowRoot&&"open"===i.shadowRoot.mode&&e(i.shadowRoot));let o=i.children;[...o].forEach(t=>e(t))}(e);// Find the first and last tabbable elements
let i=t.find(e=>o$(e))??null,o=t.reverse().find(e=>o$(e))??null;return{start:i,end:o}}(this.element),i="forward"===this.tabDirection?e:t;"function"==typeof i?.focus&&i.focus({preventScroll:!0})}}handleFocusIn(){this.checkFocus()}handleKeyDown(e){"Tab"===e.key&&e.shiftKey&&(this.tabDirection="backward"),// Ensure focus remains trapped after they key is pressed
requestAnimationFrame(()=>this.checkFocus())}handleKeyUp(){this.tabDirection="forward"}}const oI=(e,t)=>{let i=`--mdui-motion-easing-${t}`;return z(e).css(i).trim()},oS=(e,t)=>{let i=`--mdui-motion-duration-${t}`,o=z(e).css(i).trim().toLowerCase();return o.endsWith("ms")?parseFloat(o):1e3*parseFloat(o)},oA=e=>{if(g(document))return 0;if(e||void 0===r){let e=z("<div>").css({width:"100%",height:"200px"}),t=z("<div>").css({position:"absolute",top:"0",left:"0",pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}).append(e).appendTo(document.body),i=e[0].offsetWidth;t.css("overflow","scroll");let o=e[0].offsetWidth;i===o&&(o=t[0].clientWidth),t.remove(),r=i-o}return r},oD=new WeakMap,oP="mdui-lock-screen",oT=(e,t)=>{let i=l();t??=i.body,oD.has(t)||oD.set(t,new Set);let o=oD.get(t);o.add(e),z(t).addClass(oP).css("width",`calc(100% - ${oA()}px)`)},oM=(e,t)=>{let i=l();t??=i.body;let o=oD.get(t);o&&(o.delete(e),0===o.size&&(oD.delete(t),z(t).removeClass(oP).width("")))},o_=eZ`:host{--shape-corner:var(--mdui-shape-corner-extra-large);--z-index:2300;position:fixed;z-index:var(--z-index);display:none;align-items:center;justify-content:center;inset:0;padding:3rem}::slotted(mdui-top-app-bar[slot=header]){position:absolute;border-top-left-radius:var(--mdui-shape-corner-extra-large);border-top-right-radius:var(--mdui-shape-corner-extra-large);background-color:rgb(var(--mdui-color-surface-container-high))}:host([fullscreen]){--shape-corner:var(--mdui-shape-corner-none);padding:0}:host([fullscreen]) ::slotted(mdui-top-app-bar[slot=header]){border-top-left-radius:var(--mdui-shape-corner-none);border-top-right-radius:var(--mdui-shape-corner-none)}.overlay{position:fixed;inset:0;background-color:rgba(var(--mdui-color-scrim),.4)}.panel{position:relative;display:flex;flex-direction:column;max-height:100%;border-radius:var(--shape-corner);outline:0;transform-origin:top;min-width:17.5rem;max-width:35rem;padding:1.5rem;background-color:rgb(var(--mdui-color-surface-container-high));box-shadow:var(--mdui-elevation-level3)}:host([fullscreen]) .panel{width:100%;max-width:100%;height:100%;max-height:100%;box-shadow:var(--mdui-elevation-level0)}.header{display:flex;flex-direction:column}.has-icon .header{align-items:center}.icon{display:flex;color:rgb(var(--mdui-color-secondary));font-size:1.5rem}.icon mdui-icon,::slotted([slot=icon]){font-size:inherit}.headline{display:flex;color:rgb(var(--mdui-color-on-surface));font-size:var(--mdui-typescale-headline-small-size);font-weight:var(--mdui-typescale-headline-small-weight);letter-spacing:var(--mdui-typescale-headline-small-tracking);line-height:var(--mdui-typescale-headline-small-line-height)}.icon+.headline{padding-top:1rem}.body{overflow:auto}.header+.body{margin-top:1rem}.description{display:flex;color:rgb(var(--mdui-color-on-surface-variant));font-size:var(--mdui-typescale-body-medium-size);font-weight:var(--mdui-typescale-body-medium-weight);letter-spacing:var(--mdui-typescale-body-medium-tracking);line-height:var(--mdui-typescale-body-medium-line-height)}:host([fullscreen]) .description{color:rgb(var(--mdui-color-on-surface))}.has-description.has-default .description{margin-bottom:1rem}.action{display:flex;justify-content:flex-end;padding-top:1.5rem}.action::slotted(:not(:first-child)){margin-left:.5rem}:host([stacked-actions]) .action{flex-direction:column;align-items:end}:host([stacked-actions]) .action::slotted(:not(:first-child)){margin-left:0;margin-top:.5rem}`;/**
 * @summary 对话框组件
 *
 * ```html
 * <mdui-dialog>content</mdui-dialog>
 * ```
 *
 * @event open - 在对话框打开之前触发。可以通过调用 `event.preventDefault()` 阻止对话框打开
 * @event opened - 在对话框打开之后触发
 * @event close - 在对话框关闭之前触发。可以通过调用 `event.preventDefault()` 阻止对话框关闭
 * @event closed - 在对话框关闭之后触发
 * @event overlay-click - 点击遮罩层时触发
 *
 * @slot header - 顶部元素，默认包含 `icon` slot 和 `headline` slot
 * @slot icon - 顶部图标
 * @slot headline - 顶部标题
 * @slot description - 标题下方的文本
 * @slot - 对话框主体内容
 * @slot action - 底部操作栏中的元素
 *
 * @csspart overlay - 遮罩层
 * @csspart panel - 对话框容器
 * @csspart header - 对话框 header 部分，其中包含了 icon 和 headline
 * @csspart icon - 顶部的图标，位于 header 中
 * @csspart headline - 顶部的标题，位于 header 中
 * @csspart body - 对话框的 body 部分
 * @csspart description - 副文本部分，位于 body 中
 * @csspart action - 底部操作按钮
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --z-index - 组件的 CSS 的 `z-index` 值
 */let oL=class extends t7{constructor(){super(...arguments),/**
         * 是否打开对话框
         */this.open=!1,/**
         * 是否为全屏对话框
         */this.fullscreen=!1,/**
         * 是否在按下 ESC 键时，关闭对话框
         */this.closeOnEsc=!1,/**
         * 是否在点击遮罩时，关闭对话框
         */this.closeOnOverlayClick=!1,/**
         * 是否垂直排列底部操作按钮
         */this.stackedActions=!1,this.overlayRef=iF(),this.panelRef=iF(),this.bodyRef=iF(),this.hasSlotController=new t6(this,"header","icon","headline","description","action","[default]"),this.definedController=new iA(this,{relatedElements:["mdui-top-app-bar"]})}async onOpenChange(){let e=this.hasUpdated;// 默认为关闭状态。因此首次渲染时，且为关闭状态，不执行
if(!this.open&&!e)return;await this.definedController.whenDefined(),e||await this.updateComplete;// 内部的 header, body, actions 元素
let t=Array.from(this.panelRef.value.querySelectorAll(".header, .body, .actions")),i=oI(this,"linear"),o=oI(this,"emphasized-decelerate"),r=oI(this,"emphasized-accelerate"),n=()=>Promise.all([ox(this.overlayRef.value),ox(this.panelRef.value),...t.map(e=>ox(e))]);// 打开
// 要区分是否首次渲染，首次渲染不触发事件，不执行动画；非首次渲染，触发事件，执行动画
if(this.open){if(e){let e=this.emit("open",{cancelable:!0});if(!e)return}this.style.display="flex";// 包含 <mdui-top-app-bar slot="header"> 时
let r=this.topAppBarElements??[];if(r.length){let e=r[0];e.scrollTarget||(e.scrollTarget=this.bodyRef.value),// 移除 header 和 body 之间的 margin
this.bodyRef.value.style.marginTop="0"}this.originalTrigger=document.activeElement,this.modalHelper.activate(),oT(this),await n(),// 设置聚焦
requestAnimationFrame(()=>{let e=this.querySelector("[autofocus]");e?e.focus({preventScroll:!0}):this.panelRef.value.focus({preventScroll:!0})});let s=oS(this,"medium4");await Promise.all([oC(this.overlayRef.value,[{opacity:0},{opacity:1,offset:.3},{opacity:1}],{duration:e?s:0,easing:i}),oC(this.panelRef.value,[{transform:"translateY(-1.875rem) scaleY(0)"},{transform:"translateY(0) scaleY(1)"}],{duration:e?s:0,easing:o}),oC(this.panelRef.value,[{opacity:0},{opacity:1,offset:.1},{opacity:1}],{duration:e?s:0,easing:i}),...t.map(t=>oC(t,[{opacity:0},{opacity:0,offset:.2},{opacity:1,offset:.8},{opacity:1}],{duration:e?s:0,easing:i}))]),e&&this.emit("opened")}else{let e=this.emit("close",{cancelable:!0});if(!e)return;this.modalHelper.deactivate(),await n();let o=oS(this,"short4");await Promise.all([oC(this.overlayRef.value,[{opacity:1},{opacity:0}],{duration:o,easing:i}),oC(this.panelRef.value,[{transform:"translateY(0) scaleY(1)"},{transform:"translateY(-1.875rem) scaleY(0.6)"}],{duration:o,easing:r}),oC(this.panelRef.value,[{opacity:1},{opacity:1,offset:.75},{opacity:0}],{duration:o,easing:i}),...t.map(e=>oC(e,[{opacity:1},{opacity:0,offset:.75},{opacity:0}],{duration:o,easing:i}))]),this.style.display="none",oM(this);// 对话框关闭后，恢复焦点到原有的元素上
let s=this.originalTrigger;"function"==typeof s?.focus&&setTimeout(()=>s.focus()),this.emit("closed")}}disconnectedCallback(){super.disconnectedCallback(),oM(this)}firstUpdated(e){super.firstUpdated(e),this.modalHelper=new oE(this),this.addEventListener("keydown",e=>{this.open&&this.closeOnEsc&&"Escape"===e.key&&(e.stopPropagation(),this.open=!1)})}render(){let e=this.hasSlotController.test("action"),t=this.hasSlotController.test("[default]"),i=!!this.icon||this.hasSlotController.test("icon"),o=!!this.headline||this.hasSlotController.test("headline"),r=!!this.description||this.hasSlotController.test("description"),n=i||o||this.hasSlotController.test("header"),s=r||t;return tI`<div ${iK(this.overlayRef)} part="overlay" class="overlay" @click="${this.onOverlayClick}" tabindex="-1"></div><div ${iK(this.panelRef)} part="panel" class="panel ${iQ({"has-icon":i,"has-description":r,"has-default":t})}" tabindex="0">${ok(n,()=>tI`<slot name="header" part="header" class="header">${ok(i,()=>this.renderIcon())} ${ok(o,()=>this.renderHeadline())}</slot>`)} ${ok(s,()=>tI`<div ${iK(this.bodyRef)} part="body" class="body">${ok(r,()=>this.renderDescription())}<slot></slot></div>`)} ${ok(e,()=>tI`<slot name="action" part="action" class="action"></slot>`)}</div>`}onOverlayClick(){this.emit("overlay-click"),this.closeOnOverlayClick&&(this.open=!1)}renderIcon(){return tI`<slot name="icon" part="icon" class="icon">${this.icon?tI`<mdui-icon name="${this.icon}"></mdui-icon>`:t9}</slot>`}renderHeadline(){return tI`<slot name="headline" part="headline" class="headline">${this.headline}</slot>`}renderDescription(){return tI`<slot name="description" part="description" class="description">${this.description}</slot>`}};oL.styles=[ie,o_],eq([tX({reflect:!0})],oL.prototype,"icon",void 0),eq([tX({reflect:!0})],oL.prototype,"headline",void 0),eq([tX({reflect:!0})],oL.prototype,"description",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oL.prototype,"open",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oL.prototype,"fullscreen",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"close-on-esc"})],oL.prototype,"closeOnEsc",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"close-on-overlay-click"})],oL.prototype,"closeOnOverlayClick",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"stacked-actions"})],oL.prototype,"stackedActions",void 0),eq([tQ({slot:"header",selector:"mdui-top-app-bar",flatten:!0})],oL.prototype,"topAppBarElements",void 0),eq([iD("open")],oL.prototype,"onOpenChange",null),oL=eq([tW("mdui-dialog")],oL);const oO=eZ`:host{display:block;height:.0625rem;background-color:rgb(var(--mdui-color-surface-variant))}:host([inset]){margin-left:1rem}:host([middle]){margin-left:1rem;margin-right:1rem}:host([vertical]){height:100%;width:.0625rem}`;/**
 * @summary 分割线组件
 *
 * ```html
 * <mdui-divider></mdui-divider>
 * ```
 */let oz=class extends t7{constructor(){super(...arguments),/**
         * 是否显示垂直分割线
         */this.vertical=!1,/**
         * 是否左侧缩进
         */this.inset=!1,/**
         * 是否左右两侧缩进
         */this.middle=!1}render(){return tI``}};function oB(e){return oN(e)?(e.nodeName||"").toLowerCase():"#document"}function oV(e){var t;return(null==e?void 0:null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function oN(e){return e instanceof Node||e instanceof oV(e).Node}function oF(e){return(// Browsers without `ShadowRoot` support.
"undefined"!=typeof ShadowRoot&&(e instanceof ShadowRoot||e instanceof oV(e).ShadowRoot))}function oH(e){let{overflow:t,overflowX:i,overflowY:o,display:r}=oV(e).getComputedStyle(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+i)&&!["inline","contents"].includes(r)}function oU(e,t,i){var o;void 0===t&&(t=[]),void 0===i&&(i=!0);let r=function e(t){let i=function(e){var t;if("html"===oB(e))return e;let i=e.assignedSlot||// DOM Element detected.
e.parentNode||// ShadowRoot detected.
oF(e)&&e.host||(null==(t=(oN(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement);return oF(i)?i.host:i}(t);return["html","body","#document"].includes(oB(i))?t.ownerDocument?t.ownerDocument.body:t.body:(i instanceof HTMLElement||i instanceof oV(i).HTMLElement)&&oH(i)?i:e(i)}(e),n=r===(null==(o=e.ownerDocument)?void 0:o.body),s=oV(r);return n?t.concat(s,s.visualViewport||[],oH(r)?r:[],s.frameElement&&i?oU(s.frameElement):[]):t.concat(r,oU(r,[],i))}oz.styles=[ie,oO],eq([tX({type:Boolean,reflect:!0,converter:iS})],oz.prototype,"vertical",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oz.prototype,"inset",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oz.prototype,"middle",void 0),oz=eq([tW("mdui-divider")],oz);const oK=eZ`:host{--z-index:2100;display:contents}.panel{display:block;position:fixed;z-index:var(--z-index)}`;/**
 * @summary 下拉组件
 *
 * ```html
 * <mdui-dropdown>
 * ..<mdui-button slot="trigger">open dropdown</mdui-button>
 * ..<mdui-menu>
 * ....<mdui-menu-item>Item 1</mdui-menu-item>
 * ....<mdui-menu-item>Item 2</mdui-menu-item>
 * ..</mdui-menu>
 * </mdui-dropdown>
 * ```
 *
 * @event open - dropdown 开始打开时，事件被触发。可以通过调用 `event.preventDefault()` 阻止 dropdown 打开
 * @event opened - dropdown 打开动画完成时，事件被触发
 * @event close - dropdown 开始关闭时，事件被触发。可以通过调用 `event.preventDefault()` 阻止 dropdown 关闭
 * @event closed - dropdown 关闭动画完成时，事件被触发
 *
 * @slot - dropdown 的内容
 * @slot trigger - 触发 dropdown 的元素，例如 [`<mdui-button>`](/docs/2/components/button) 元素
 *
 * @csspart trigger - 触发 dropdown 的元素的容器，即 `trigger` slot 的容器
 * @csspart panel - dropdown 内容的容器
 *
 * @cssprop --z-index - 组件的 CSS 的 `z-index` 值
 */let oq=class extends t7{constructor(){super(),/**
         * dropdown 是否打开
         */this.open=!1,/**
         * 是否禁用 dropdown
         */this.disabled=!1,/**
         * dropdown 的触发方式，支持传入多个值，用空格分隔。可选值为：
         *
         * * `click`：点击时触发
         * * `hover`：鼠标悬浮触发
         * * `focus`：聚焦时触发
         * * `contextmenu`：鼠标右键点击、或触摸长按时触发
         * * `manual`：使用了该值时，只能使用编程方式打开和关闭 dropdown，且不能再指定其他触发方式
         */this.trigger="click",/**
         * dropdown 内容的位置。可选值为：
         *
         * * `auto`：自动判断位置
         * * `top-start`：位于上方，且左对齐
         * * `top`：位于上方，且居中对齐
         * * `top-end`：位于上方，且右对齐
         * * `bottom-start`：位于下方，且左对齐
         * * `bottom`：位于下方，且居中对齐
         * * `bottom-end`：位于下方，且右对齐
         * * `left-start`：位于左侧，且顶部对齐
         * * `left`：位于左侧，且居中对齐
         * * `left-end`：位于左侧，且底部对齐
         * * `right-start`：位于右侧，且顶部对齐
         * * `right`：位于右侧，且居中对齐
         * * `right-end`：位于右侧，且底部对齐
         */this.placement="auto",/**
         * 在点击 [`<mdui-menu-item>`](/docs/2/components/menu#menu-item-api) 元素后，是否仍保持 dropdown 为打开状态
         */this.stayOpenOnClick=!1,/**
         * 通过 hover 触发 dropdown 打开时的延时，单位为毫秒
         */this.openDelay=150,/**
         * 通过 hover 触发 dropdown 关闭时的延时，单位为毫秒
         */this.closeDelay=150,/**
         * 是否在触发 dropdown 时的光标所在的位置打开 dropdown。通常用于在打开鼠标右键菜单时使用
         */this.openOnPointer=!1,this.panelRef=iF(),this.definedController=new iA(this,{relatedElements:[""]}),this.onDocumentClick=this.onDocumentClick.bind(this),this.onDocumentKeydown=this.onDocumentKeydown.bind(this),this.onWindowScroll=this.onWindowScroll.bind(this),this.onMouseLeave=this.onMouseLeave.bind(this),this.onFocus=this.onFocus.bind(this),this.onClick=this.onClick.bind(this),this.onContextMenu=this.onContextMenu.bind(this),this.onMouseEnter=this.onMouseEnter.bind(this),this.onPanelClick=this.onPanelClick.bind(this)}get triggerElement(){return this.triggerElements[0]}// 这些属性变更时，需要更新样式
async onPositionChange(){// 如果是打开状态，则更新 panel 的位置
this.open&&(await this.definedController.whenDefined(),this.updatePositioner())}async onOpenChange(){let e=this.hasUpdated;// 默认为关闭状态。因此首次渲染时，且为关闭状态，不执行
if(!this.open&&!e)return;await this.definedController.whenDefined(),e||await this.updateComplete;let t=oI(this,"linear"),i=oI(this,"emphasized-decelerate"),o=oI(this,"emphasized-accelerate");// 打开
// 要区分是否首次渲染，首次渲染时不触发事件，不执行动画；非首次渲染，触发事件，执行动画
if(this.open){if(e){let e=this.emit("open",{cancelable:!0});if(!e)return}// dropdown 打开时，尝试把焦点放到 panel 中
let o=this.panelElements.find(e=>p(e.focus));setTimeout(()=>{o?.focus()});let r=oS(this,"medium4");await ox(this.panelRef.value),this.panelRef.value.hidden=!1,this.updatePositioner(),await Promise.all([oC(this.panelRef.value,[{transform:`${this.getCssScaleName()}(0.45)`},{transform:`${this.getCssScaleName()}(1)`}],{duration:e?r:0,easing:i}),oC(this.panelRef.value,[{opacity:0},{opacity:1,offset:.125},{opacity:1}],{duration:e?r:0,easing:t})]),e&&this.emit("opened")}else{let e=this.emit("close",{cancelable:!0});if(!e)return;!this.hasTrigger("focus")&&p(this.triggerElement?.focus)&&(this.contains(document.activeElement)||this.contains(document.activeElement?.assignedSlot??null))&&this.triggerElement.focus();let i=oS(this,"short4");await ox(this.panelRef.value),await Promise.all([oC(this.panelRef.value,[{transform:`${this.getCssScaleName()}(1)`},{transform:`${this.getCssScaleName()}(0.45)`}],{duration:i,easing:o}),oC(this.panelRef.value,[{opacity:1},{opacity:1,offset:.875},{opacity:0}],{duration:i,easing:t})]),this.panelRef.value&&(this.panelRef.value.hidden=!0),this.emit("closed")}}connectedCallback(){super.connectedCallback(),this.definedController.whenDefined().then(()=>{document.addEventListener("pointerdown",this.onDocumentClick),document.addEventListener("keydown",this.onDocumentKeydown),this.overflowAncestors=oU(this.triggerElement),this.overflowAncestors.forEach(e=>{e.addEventListener("scroll",this.onWindowScroll)})})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerdown",this.onDocumentClick),document.removeEventListener("keydown",this.onDocumentKeydown),this.overflowAncestors?.forEach(e=>{e.removeEventListener("scroll",this.onWindowScroll)}),this.observeResize?.unobserve()}firstUpdated(e){super.firstUpdated(e),this.addEventListener("mouseleave",this.onMouseLeave),this.definedController.whenDefined().then(()=>{this.triggerElement.addEventListener("focus",this.onFocus),this.triggerElement.addEventListener("click",this.onClick),this.triggerElement.addEventListener("contextmenu",this.onContextMenu),this.triggerElement.addEventListener("mouseenter",this.onMouseEnter),// triggerElement 的尺寸变化时，重新调整 panel 的位置
this.observeResize=i_(this.triggerElement,()=>{this.updatePositioner()})})}render(){return tI`<slot name="trigger" part="trigger" class="trigger"></slot><slot ${iK(this.panelRef)} part="panel" class="panel" hidden @click="${this.onPanelClick}"></slot>`}/**
     * 获取 dropdown 打开、关闭动画的 CSS scaleX 或 scaleY
     */getCssScaleName(){return"horizontal"===this.animateDirection?"scaleX":"scaleY"}/**
     * 在 document 上点击时，根据条件判断是否要关闭 dropdown
     */onDocumentClick(e){if(this.disabled||!this.open)return;let t=e.composedPath();t.includes(this)||(this.open=!1),this.hasTrigger("contextmenu")&&!this.hasTrigger("click")&&t.includes(this.triggerElement)&&(this.open=!1)}/**
     * 在 document 上按下按键时，根据条件判断是否要关闭 dropdown
     */onDocumentKeydown(e){if(!this.disabled&&this.open){// 按下 ESC 键时，关闭 dropdown
if("Escape"===e.key){this.open=!1;return}// 按下 Tab 键时，关闭 dropdown
"Tab"===e.key&&(!this.hasTrigger("focus")&&p(this.triggerElement?.focus)&&e.preventDefault(),this.open=!1)}}onWindowScroll(){window.requestAnimationFrame(()=>this.onPositionChange())}hasTrigger(e){let t=this.trigger.split(" ");return t.includes(e)}onFocus(){!this.disabled&&!this.open&&this.hasTrigger("focus")&&(this.open=!0)}onClick(e){// e.button 为 0 时，为鼠标左键点击。忽略鼠标中间和右键
!this.disabled&&!e.button&&this.hasTrigger("click")&&(this.open&&(this.hasTrigger("hover")||this.hasTrigger("focus"))||(this.pointerOffsetX=e.offsetX,this.pointerOffsetY=e.offsetY,this.open=!this.open))}onPanelClick(e){!this.disabled&&!this.stayOpenOnClick&&z(e.target).is("mdui-menu-item")&&(this.open=!1)}onContextMenu(e){!this.disabled&&this.hasTrigger("contextmenu")&&(e.preventDefault(),this.pointerOffsetX=e.offsetX,this.pointerOffsetY=e.offsetY,this.open=!0)}onMouseEnter(){// 不做 open 状态的判断，因为可以延时打开和关闭
!this.disabled&&this.hasTrigger("hover")&&(window.clearTimeout(this.closeTimeout),this.openDelay?this.openTimeout=window.setTimeout(()=>{this.open=!0},this.openDelay):this.open=!0)}onMouseLeave(){// 不做 open 状态的判断，因为可以延时打开和关闭
!this.disabled&&this.hasTrigger("hover")&&(window.clearTimeout(this.openTimeout),this.closeTimeout=window.setTimeout(()=>{this.open=!1},this.closeDelay||50))}// 更新 panel 的位置
updatePositioner(){let e,t,i,o;let r=z(this.panelRef.value),n=z(window),s=this.panelElements,a={width:Math.max(...s?.map(e=>e.offsetWidth)??[]),height:s?.map(e=>e.offsetHeight).reduce((e,t)=>e+t,0)},l=this.triggerElement.getBoundingClientRect(),d=this.openOnPointer?{top:this.pointerOffsetY+l.top,left:this.pointerOffsetX+l.left,width:0,height:0}:l,c=this.placement;// 自动判断 dropdown 的方位
// 优先级为 bottom>top>right>left，start>center>end
if("auto"===c){let e,t;let i=n.width(),o=n.height();c=(t=["top","bottom"].includes(e=o-d.top-d.height>a.height+8?"bottom":d.top>a.height+8?"top":i-d.left-d.width>a.width+8?"right":d.left>a.width+8?"left":"bottom")?i-d.left>a.width+8?"start":d.left+d.width/2>a.width/2+8&&i-d.left-d.width/2>a.width/2+8?void 0:d.left+d.width>a.width+8?"end":"start":o-d.top>a.height+8?"start":d.top+d.height/2>a.height/2+8&&o-d.top-d.height/2>a.height/2+8?void 0:d.top+d.height>a.height+8?"end":"start")?[e,t].join("-"):e}// 根据 placement 计算 panel 的位置和方向
let[h,u]=c.split("-");switch(this.animateDirection=["top","bottom"].includes(h)?"vertical":"horizontal",h){case"top":t="bottom",i=d.top-a.height;break;case"bottom":t="top",i=d.top+d.height;break;default:switch(t="center",u){case"start":i=d.top;break;case"end":i=d.top+d.height-a.height;break;default:i=d.top+d.height/2-a.height/2}}switch(h){case"left":e="right",o=d.left-a.width;break;case"right":e="left",o=d.left+d.width;break;default:switch(e="center",u){case"start":o=d.left;break;case"end":o=d.left+d.width-a.width;break;default:o=d.left+d.width/2-a.width/2}}r.css({top:i,left:o,transformOrigin:[e,t].join(" ")})}};oq.styles=[ie,oK],eq([tX({type:Boolean,reflect:!0,converter:iS})],oq.prototype,"open",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oq.prototype,"disabled",void 0),eq([tX({reflect:!0})],oq.prototype,"trigger",void 0),eq([tX({reflect:!0})],oq.prototype,"placement",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"stay-open-on-click"})],oq.prototype,"stayOpenOnClick",void 0),eq([tX({type:Number,reflect:!0,attribute:"open-delay"})],oq.prototype,"openDelay",void 0),eq([tX({type:Number,reflect:!0,attribute:"close-delay"})],oq.prototype,"closeDelay",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"open-on-pointer"})],oq.prototype,"openOnPointer",void 0),eq([tQ({slot:"trigger",flatten:!0})],oq.prototype,"triggerElements",void 0),eq([tQ({flatten:!0})],oq.prototype,"panelElements",void 0),eq([iD("placement",!0),iD("openOnPointer",!0)],oq.prototype,"onPositionChange",null),eq([iD("open")],oq.prototype,"onOpenChange",null),oq=eq([tW("mdui-dropdown")],oq);/**
 * 延迟多少毫秒执行
 */const oj=(e=0)=>new Promise(t=>setTimeout(t,e)),oW=eZ`:host{--shape-corner-small:var(--mdui-shape-corner-small);--shape-corner-normal:var(--mdui-shape-corner-large);--shape-corner-large:var(--mdui-shape-corner-extra-large);position:relative;display:inline-block;overflow:hidden;text-align:center;border-radius:var(--shape-corner-normal);cursor:pointer;-webkit-tap-highlight-color:transparent;transition-property:box-shadow;transition-timing-function:var(--mdui-motion-easing-emphasized);transition-duration:var(--mdui-motion-duration-medium4);width:3.5rem;height:3.5rem;box-shadow:var(--mdui-elevation-level3);font-size:var(--mdui-typescale-label-large-size);font-weight:var(--mdui-typescale-label-large-weight);letter-spacing:var(--mdui-typescale-label-large-tracking);line-height:var(--mdui-typescale-label-large-line-height)}.button{padding:0 1rem}:host([size=small]) .button{padding:0 .5rem}:host([size=large]) .button{padding:0 1.875rem}:host([lowered]){box-shadow:var(--mdui-elevation-level1)}:host([focus-visible]){box-shadow:var(--mdui-elevation-level3)}:host([lowered][focus-visible]){box-shadow:var(--mdui-elevation-level1)}:host([pressed]){box-shadow:var(--mdui-elevation-level3)}:host([lowered][pressed]){box-shadow:var(--mdui-elevation-level1)}:host([hover]){box-shadow:var(--mdui-elevation-level4)}:host([lowered][hover]){box-shadow:var(--mdui-elevation-level2)}:host([variant=primary]){color:rgb(var(--mdui-color-on-primary-container));background-color:rgb(var(--mdui-color-primary-container));--mdui-comp-ripple-state-layer-color:var(
      --mdui-color-on-primary-container
    )}:host([variant=surface]){color:rgb(var(--mdui-color-primary));background-color:rgb(var(--mdui-color-surface-container-high));--mdui-comp-ripple-state-layer-color:var(--mdui-color-primary)}:host([variant=surface][lowered]){background-color:rgb(var(--mdui-color-surface-container-low))}:host([variant=secondary]){color:rgb(var(--mdui-color-on-secondary-container));background-color:rgb(var(--mdui-color-secondary-container));--mdui-comp-ripple-state-layer-color:var(
      --mdui-color-on-secondary-container
    )}:host([variant=tertiary]){color:rgb(var(--mdui-color-on-tertiary-container));background-color:rgb(var(--mdui-color-tertiary-container));--mdui-comp-ripple-state-layer-color:var(
      --mdui-color-on-tertiary-container
    )}:host([size=small]){border-radius:var(--shape-corner-small);width:2.5rem;height:2.5rem}:host([size=large]){border-radius:var(--shape-corner-large);width:6rem;height:6rem}:host([disabled]),:host([loading]){cursor:default;pointer-events:none}:host([disabled]){color:rgba(var(--mdui-color-on-surface),38%);background-color:rgba(var(--mdui-color-on-surface),12%);box-shadow:var(--mdui-elevation-level0)}:host([extended]){width:auto}.label{display:inline-flex;transition:opacity var(--mdui-motion-duration-short2) var(--mdui-motion-easing-linear) var(--mdui-motion-duration-short2);padding-left:.25rem;padding-right:.25rem}.has-icon .label{margin-left:.5rem}:host([size=small]) .has-icon .label{margin-left:.25rem}:host([size=large]) .has-icon .label{margin-left:1rem}:host(:not([extended])) .label{opacity:0;transition-delay:0s;transition-duration:var(--mdui-motion-duration-short1)}:host([size=large]) .label{font-size:1.5em}.icon{display:inline-flex;font-size:1.71428571em}:host([size=large]) .icon{font-size:2.57142857em}.icon mdui-icon,::slotted([slot=icon]){font-size:inherit}mdui-circular-progress{display:inline-flex;width:1.5rem;height:1.5rem}:host([size=large]) mdui-circular-progress{width:2.25rem;height:2.25rem}:host([disabled]) mdui-circular-progress{stroke:rgba(var(--mdui-color-on-surface),38%)}`;/**
 * @summary 浮动操作按钮组件
 *
 * ```html
 * <mdui-fab icon="edit"></mdui-fab>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event invalid - 表单字段验证未通过时触发
 *
 * @slot - 文本
 * @slot icon - 图标
 *
 * @csspart button - 内部的 `button` 或 `a` 元素
 * @csspart label - 右侧的文本
 * @csspart icon - 左侧的图标
 * @csspart loading - 加载中状态的 `<mdui-circular-progress>` 元素
 *
 * @cssprop --shape-corner-small - `size="small"` 时，组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --shape-corner-normal - `size="normal"` 时，组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --shape-corner-large - `size="large"` 时，组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let oY=class extends i8{constructor(){super(...arguments),/**
         * FAB 形状，此组件的不同形状之间只有颜色不一样。可选值为：
         *
         * * `primary`：使用 Primary container 背景色
         * * `surface`：使用 Surface container high 背景色
         * * `secondary`：使用 Secondary container 背景色
         * * `tertiary`：使用 Tertiary container 背景色
         */this.variant="primary",/**
         * FAB 大小。可选值为：
         * * `normal`：普通大小 FAB
         * * `small`：小型 FAB
         * * `large`：大型 FAB
         */this.size="normal",/**
         * 是否为展开状态
         */this.extended=!1,this.rippleRef=iF(),this.hasSlotController=new t6(this,"icon"),this.definedController=new iA(this,{relatedElements:[""]})}get rippleElement(){return this.rippleRef.value}/**
     * extended 变更时，设置动画
     */async onExtendedChange(){let e=this.hasUpdated;this.extended?this.style.width=`${this.scrollWidth}px`:this.style.width="",await this.definedController.whenDefined(),await this.updateComplete,this.extended&&!e&&(this.style.width=`${this.scrollWidth}px`),e||(// 延迟设置动画，避免首次渲染时也执行动画
await oj(),this.style.transitionProperty="box-shadow, width, bottom, transform")}render(){let e=iq({button:!0,"has-icon":this.icon||this.hasSlotController.test("icon")});return tI`<mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple>${this.isButton()?this.renderButton({className:e,part:"button",content:this.renderInner()}):this.disabled||this.loading?tI`<span part="button" class="_a ${e}">${this.renderInner()}</span>`:this.renderAnchor({className:e,part:"button",content:this.renderInner()})}`}renderLabel(){return tI`<slot part="label" class="label"></slot>`}renderIcon(){return this.loading?this.renderLoading():tI`<slot name="icon" part="icon" class="icon">${this.icon?tI`<mdui-icon name="${this.icon}"></mdui-icon>`:t9}</slot>`}renderInner(){return[this.renderIcon(),this.renderLabel()]}};oY.styles=[i8.styles,oW],eq([tX({reflect:!0})],oY.prototype,"variant",void 0),eq([tX({reflect:!0})],oY.prototype,"size",void 0),eq([tX({reflect:!0})],oY.prototype,"icon",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],oY.prototype,"extended",void 0),eq([iD("extended")],oY.prototype,"onExtendedChange",null),oY=eq([tW("mdui-fab")],oY);const oG=eZ`:host{position:relative;display:flex;flex:1 1 auto;overflow:hidden}:host([full-height]){height:100%}`;/**
 * @summary 布局组件
 *
 * ```html
 * <mdui-layout>
 * ..<mdui-layout-item></mdui-layout-item>
 * ..<mdui-layout-item></mdui-layout-item>
 * ..<mdui-layout-main></mdui-layout-main>
 * </mdui-layout>
 * ```
 *
 * @slot - 可以是 [`<mdui-top-app-bar>`](/docs/2/components/top-app-bar)、[`<mdui-bottom-app-bar>`](/docs/2/components/bottom-app-bar)、[`<mdui-navigation-bar>`](/docs/2/components/navigation-bar)、[`<mdui-navigation-drawer>`](/docs/2/components/navigation-drawer)、[`<mdui-navigation-rail>`](/docs/2/components/navigation-rail)、`<mdui-layout-item>`、`<mdui-layout-main>` 元素
 */let oX=class extends t7{constructor(){super(...arguments),/**
         * 把当前布局的高度设为 100%
         */this.fullHeight=!1}render(){return tI`<slot></slot>`}};oX.styles=[ie,oG],eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"full-height"})],oX.prototype,"fullHeight",void 0),oX=eq([tW("mdui-layout")],oX);const oJ=eZ`:host{display:flex;z-index:1}`;/**
 * @summary 布局项组件
 *
 * ```html
 * <mdui-layout>
 * ..<mdui-layout-item></mdui-layout-item>
 * ..<mdui-layout-item></mdui-layout-item>
 * ..<mdui-layout-main></mdui-layout-main>
 * </mdui-layout>
 * ```
 *
 * @slot - 可以是任意内容
 */let oZ=class extends iB{constructor(){super(...arguments),/**
         * 该组件所处位置。可选值为：
         *
         * * `top`：位于上方
         * * `bottom`：位于下方
         * * `left`：位于左侧
         * * `right`：位于右侧
         */this.placement="top"}get layoutPlacement(){return this.placement}// placement 变更时，需要重新调整布局
onPlacementChange(){this.layoutManager?.updateLayout(this)}render(){return tI`<slot></slot>`}};oZ.styles=[ie,oJ],eq([tX({reflect:!0})],oZ.prototype,"placement",void 0),eq([iD("placement",!0)],oZ.prototype,"onPlacementChange",null),oZ=eq([tW("mdui-layout-item")],oZ);const oQ=eZ`:host{flex:1 0 auto;max-width:100%;overflow:auto}`;/**
 * @summary 布局主内容组件
 *
 * ```html
 * <mdui-layout>
 * ..<mdui-layout-item></mdui-layout-item>
 * ..<mdui-layout-item></mdui-layout-item>
 * ..<mdui-layout-main></mdui-layout-main>
 * </mdui-layout>
 * ```
 *
 * @slot - 可以是任意内容
 */let o0=class extends t7{connectedCallback(){super.connectedCallback();let e=this.parentElement;u(e,"mdui-layout")&&(this.layoutManager=iz(e),this.layoutManager.registerMain(this))}disconnectedCallback(){super.disconnectedCallback(),this.layoutManager&&this.layoutManager.unregisterMain()}render(){return tI`<slot></slot>`}};o0.styles=[ie,oQ],o0=eq([tW("mdui-layout-main")],o0);const o1=eZ`:host{--shape-corner:var(--mdui-shape-corner-none);position:relative;display:inline-block;width:100%;overflow:hidden;border-radius:var(--shape-corner);background-color:rgb(var(--mdui-color-surface-container-highest));height:.25rem}.determinate,.indeterminate{background-color:rgb(var(--mdui-color-primary))}.determinate{height:100%;transition:width var(--mdui-motion-duration-long2) var(--mdui-motion-easing-standard)}.indeterminate::before{position:absolute;top:0;bottom:0;left:0;background-color:inherit;animation:mdui-comp-progress-indeterminate 2s var(--mdui-motion-easing-linear) infinite;content:' '}.indeterminate::after{position:absolute;top:0;bottom:0;left:0;background-color:inherit;animation:mdui-comp-progress-indeterminate-short 2s var(--mdui-motion-easing-linear) infinite;content:' '}@keyframes mdui-comp-progress-indeterminate{0%{left:0;width:0}50%{left:30%;width:70%}75%{left:100%;width:0}}@keyframes mdui-comp-progress-indeterminate-short{0%{left:0;width:0}50%{left:0;width:0}75%{left:0;width:25%}100%{left:100%;width:0}}`;/**
 * @summary 线性进度指示器组件
 *
 * ```html
 * <mdui-linear-progress></mdui-linear-progress>
 * ```
 *
 * @csspart indicator - 指示器
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let o2=class extends t7{constructor(){super(...arguments),/**
         * 进度指示器的最大值，默认为 1
         */this.max=1}render(){let e=!g(this.value);if(e){let e=this.value;return tI`<div part="indicator" class="determinate" style="${t8({width:`${e/Math.max(this.max??e,e)*100}%`})}"></div>`}return tI`<div part="indicator" class="indeterminate"></div>`}};o2.styles=[ie,o1],eq([tX({type:Number,reflect:!0})],o2.prototype,"max",void 0),eq([tX({type:Number})],o2.prototype,"value",void 0),o2=eq([tW("mdui-linear-progress")],o2);const o5=eZ`:host{--shape-corner:var(--mdui-shape-corner-none);--shape-corner-rounded:var(--mdui-shape-corner-extra-large);position:relative;display:block;border-radius:var(--shape-corner);--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}:host([rounded]),:host([rounded]) mdui-ripple{border-radius:var(--shape-corner-rounded)}:host([active]){background-color:rgb(var(--mdui-color-secondary-container));--mdui-comp-ripple-state-layer-color:var(
      --mdui-color-on-secondary-container
    )}:host([disabled]){pointer-events:none}.container{cursor:pointer;-webkit-user-select:none;user-select:none;text-decoration:none;color:inherit;-webkit-tap-highlight-color:transparent}:host([disabled]) .container{cursor:default;opacity:.38}:host([nonclickable]:not([href])) .container{cursor:auto;-webkit-user-select:auto;user-select:auto}.preset{display:flex;align-items:center;padding:.5rem 1.5rem .5rem 1rem;min-height:3.5rem}:host([alignment=start]) .preset{align-items:flex-start}:host([alignment=end]) .preset{align-items:flex-end}.body{display:flex;flex:1 1 100%;flex-direction:column;justify-content:center;min-width:0}.headline{display:block;color:rgb(var(--mdui-color-on-surface));font-size:var(--mdui-typescale-body-large-size);font-weight:var(--mdui-typescale-body-large-weight);letter-spacing:var(--mdui-typescale-body-large-tracking);line-height:var(--mdui-typescale-body-large-line-height)}:host([active]) .headline{color:rgb(var(--mdui-color-on-secondary-container))}.description{display:none;color:rgb(var(--mdui-color-on-surface-variant));font-size:var(--mdui-typescale-body-medium-size);font-weight:var(--mdui-typescale-body-medium-weight);letter-spacing:var(--mdui-typescale-body-medium-tracking);line-height:var(--mdui-typescale-body-medium-line-height)}:host([disabled]) .description,:host([focused]) .description,:host([hover]) .description,:host([pressed]) .description{color:rgb(var(--mdui-color-on-surface))}.has-description .description{display:block}:host([description-line='1']) .description,:host([headline-line='1']) .headline{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host([description-line='2']) .description,:host([description-line='3']) .description,:host([headline-line='2']) .headline,:host([headline-line='3']) .headline{display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-box-orient:vertical}:host([description-line='2']) .description,:host([headline-line='2']) .headline{-webkit-line-clamp:2}:host([description-line='3']) .description,:host([headline-line='3']) .headline{-webkit-line-clamp:3}.end-icon,.icon{display:flex;flex:0 0 auto;font-size:var(--mdui-typescale-label-small-size);font-weight:var(--mdui-typescale-label-small-weight);letter-spacing:var(--mdui-typescale-label-small-tracking);line-height:var(--mdui-typescale-label-small-line-height);color:rgb(var(--mdui-color-on-surface-variant))}:host([disabled]) .end-icon,:host([disabled]) .icon,:host([focused]) .end-icon,:host([focused]) .icon,:host([hover]) .end-icon,:host([hover]) .icon,:host([pressed]) .end-icon,:host([pressed]) .icon{color:rgb(var(--mdui-color-on-surface))}:host([active]) .end-icon,:host([active]) .icon{color:rgb(var(--mdui-color-on-secondary-container))}.end-icon mdui-icon,.icon mdui-icon,.is-end-icon ::slotted([slot=end-icon]),.is-icon ::slotted([slot=icon]){font-size:1.5rem}.has-icon .icon{margin-right:1rem}.has-icon ::slotted(mdui-checkbox[slot=icon]),.has-icon ::slotted(mdui-radio[slot=icon]){margin-left:-.5rem}.has-end-icon .end-icon{margin-left:1rem}.has-end-icon ::slotted(mdui-checkbox[slot=end-icon]),.has-end-icon ::slotted(mdui-radio[slot=end-icon]){margin-right:-.5rem}`;/**
 * @summary 列表项组件。需与 `<mdui-list>` 组件配合使用
 *
 * ```html
 * <mdui-list>
 * ..<mdui-list-subheader>Subheader</mdui-list-subheader>
 * ..<mdui-list-item>Item 1</mdui-list-item>
 * ..<mdui-list-item>Item 2</mdui-list-item>
 * </mdui-list>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 *
 * @slot - 主文本
 * @slot description - 副文本
 * @slot icon - 列表项左侧的元素
 * @slot end-icon - 列表项右侧的元素
 * @slot custom - 任意自定义内容
 *
 * @csspart container - 列表项容器
 * @csspart icon - 左侧图标
 * @csspart end-icon - 右侧图标
 * @csspart body - 中间部分
 * @csspart headline - 主标题
 * @csspart description - 副标题
 *
 * @cssprop --shape-corner - 列表项的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --shape-corner-rounded - 指定了 `rounded` 时，列表项的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let o4=class extends iG(i4(iZ(t7))){constructor(){super(...arguments),/**
         * 是否禁用该列表项，列表项将置灰，且其中的 [`<mdui-checkbox>`](/docs/2/components/checkbox)、[`<mdui-radio>`](/docs/2/components/radio)、[`<mdui-switch>`](/docs/2/components/switch) 等都将禁用
         */this.disabled=!1,/**
         * 是否激活该列表项
         */this.active=!1,/**
         * 是否使列表项不可点击，但其中的 [`<mdui-checkbox>`](/docs/2/components/checkbox)、[`<mdui-radio>`](/docs/2/components/radio)、[`<mdui-switch>`](/docs/2/components/switch) 等仍可进行交互
         */this.nonclickable=!1,/**
         * 使用圆角形状的列表项
         */this.rounded=!1,/**
         * 列表项的垂直对齐方式。可选值为：
         *
         * * `start`：顶部对齐
         * * `center`：居中对齐
         * * `end`：底部对齐
         */this.alignment="center",this.rippleRef=iF(),this.itemRef=iF(),this.hasSlotController=new t6(this,"[default]","description","icon","end-icon","custom")}get rippleElement(){return this.rippleRef.value}get rippleDisabled(){return this.focusDisabled}get focusElement(){return this.href&&!this.disabled?this.itemRef.value:this}get focusDisabled(){return this.href?this.disabled:this.disabled||this.nonclickable}render(){let e=!this.hasSlotController.test("custom"),t=this.icon||this.hasSlotController.test("icon"),i=this.endIcon||this.hasSlotController.test("end-icon"),o=this.description||this.hasSlotController.test("description"),r=iq({container:!0,preset:e,"has-icon":t,"has-end-icon":i,"has-description":o,// icon slot 中的元素是否为 mdui-icon 或 mdui-icon-* 组件
"is-icon":u(this.iconElements[0],"mdui-icon"),// end-icon slot 中的元素是否为 mdui-icon 或 mdui-icon-* 组件
"is-end-icon":h(this.endIconElements[0]).startsWith("mdui-icon-")});return tI`<mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple>${this.href&&!this.disabled?this.renderAnchor({className:r,content:this.renderInner(),part:"container",refDirective:iK(this.itemRef)}):tI`<div part="container" class="${r}" ${iK(this.itemRef)}>${this.renderInner()}</div>`}`}renderInner(){let e=this.hasSlotController.test("[default]");return tI`<slot name="custom"><slot name="icon" part="icon" class="icon">${this.icon?tI`<mdui-icon name="${this.icon}"></mdui-icon>`:t9}</slot><div part="body" class="body">${e?tI`<slot part="headline" class="headline"></slot>`:tI`<div part="headline" class="headline">${this.headline}</div>`}<slot name="description" part="description" class="description">${this.description}</slot></div><slot name="end-icon" part="end-icon" class="end-icon">${this.endIcon?tI`<mdui-icon name="${this.endIcon}"></mdui-icon>`:t9}</slot></slot>`}};o4.styles=[ie,o5],eq([tX({reflect:!0})],o4.prototype,"headline",void 0),eq([tX({type:Number,reflect:!0,attribute:"headline-line"})],o4.prototype,"headlineLine",void 0),eq([tX({reflect:!0})],o4.prototype,"description",void 0),eq([tX({type:Number,reflect:!0,attribute:"description-line"})],o4.prototype,"descriptionLine",void 0),eq([tX({reflect:!0})],o4.prototype,"icon",void 0),eq([tX({reflect:!0,attribute:"end-icon"})],o4.prototype,"endIcon",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],o4.prototype,"disabled",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],o4.prototype,"active",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],o4.prototype,"nonclickable",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],o4.prototype,"rounded",void 0),eq([tX({reflect:!0})],o4.prototype,"alignment",void 0),eq([tQ({slot:"icon",flatten:!0})],o4.prototype,"iconElements",void 0),eq([tQ({slot:"end-icon",flatten:!0})],o4.prototype,"endIconElements",void 0),o4=eq([tW("mdui-list-item")],o4);const o3=eZ`:host{display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;cursor:default;color:rgb(var(--mdui-color-on-surface-variant));font-size:var(--mdui-typescale-label-small-size);font-weight:var(--mdui-typescale-label-small-weight);letter-spacing:var(--mdui-typescale-label-small-tracking);line-height:var(--mdui-typescale-label-small-line-height);padding-left:1rem;padding-right:1.5rem;height:3.5rem;line-height:3.5rem}`;/**
 * @summary 列表标题组件。需与 `<mdui-list>` 组件配合使用
 *
 * ```html
 * <mdui-list>
 * ..<mdui-list-subheader>Subheader</mdui-list-subheader>
 * ..<mdui-list-item>Item 1</mdui-list-item>
 * ..<mdui-list-item>Item 2</mdui-list-item>
 * </mdui-list>
 * ```
 *
 * @slot - 文本
 */let o8=class extends t7{render(){return tI`<slot></slot>`}};o8.styles=[ie,o3],o8=eq([tW("mdui-list-subheader")],o8);const o7=eZ`:host{display:block;padding:.5rem 0}::slotted(mdui-divider[middle]){margin-left:1rem;margin-right:1.5rem}`;/**
 * @summary 列表组件。需与 `<mdui-list-item>` 组件配合使用
 *
 * ```html
 * <mdui-list>
 * ..<mdui-list-subheader>Subheader</mdui-list-subheader>
 * ..<mdui-list-item>Item 1</mdui-list-item>
 * ..<mdui-list-item>Item 2</mdui-list-item>
 * </mdui-list>
 * ```
 *
 * @slot - `<mdui-list-item>` 元素
 */let o6=class extends t7{render(){return tI`<slot></slot>`}};o6.styles=[ie,o7],o6=eq([tW("mdui-list")],o6);let o9=class extends tq{render(){return os('<path d="m10 17 5-5-5-5v10z"/>')}};o9.styles=on,o9=eq([tW("mdui-icon-arrow-right")],o9);const re=eZ`:host{position:relative;display:block}:host([selected]){background-color:rgba(var(--mdui-color-primary),12%)}:host([disabled]){pointer-events:none}.container{cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}:host([disabled]) .container{cursor:default;opacity:.38}.preset{display:flex;align-items:center;text-decoration:none;height:3rem;padding:0 .75rem}.preset.dense{height:2rem}.label-container{flex:1 1 100%;min-width:0}.label{display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:rgb(var(--mdui-color-on-surface));font-size:var(--mdui-typescale-label-large-size);font-weight:var(--mdui-typescale-label-large-weight);letter-spacing:var(--mdui-typescale-label-large-tracking)}.end-icon,.end-text,.icon,.selected-icon{display:none;flex:0 0 auto;color:rgb(var(--mdui-color-on-surface-variant))}.has-end-icon .end-icon,.has-end-text .end-text,.has-icon .icon,.has-icon .selected-icon{display:flex}.end-icon,.icon,.selected-icon{font-size:1.5rem}.end-icon::slotted(mdui-avatar),.icon::slotted(mdui-avatar),.selected-icon::slotted(mdui-avatar){width:1.5rem;height:1.5rem}.dense .end-icon,.dense .icon,.dense .selected-icon{font-size:1.125rem}.dense .end-icon::slotted(mdui-avatar),.dense .icon::slotted(mdui-avatar),.dense .selected-icon::slotted(mdui-avatar){width:1.125rem;height:1.125rem}.end-icon .i,.icon .i,.selected-icon .i,::slotted([slot=end-icon]),::slotted([slot=icon]),::slotted([slot=selected-icon]){font-size:inherit}.end-text{font-size:var(--mdui-typescale-label-large-size);font-weight:var(--mdui-typescale-label-large-weight);letter-spacing:var(--mdui-typescale-label-large-tracking);line-height:var(--mdui-typescale-label-large-line-height)}.icon,.selected-icon{margin-right:.75rem}.end-icon,.end-text{margin-left:.75rem}.arrow-right{color:rgb(var(--mdui-color-on-surface))}.submenu{--shape-corner:var(--mdui-shape-corner-extra-small);display:block;position:absolute;z-index:1;border-radius:var(--shape-corner);background-color:rgb(var(--mdui-color-surface-container));box-shadow:var(--mdui-elevation-level2);min-width:7rem;max-width:17.5rem;padding-top:.5rem;padding-bottom:.5rem;--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}.submenu::slotted(mdui-divider){margin-top:.5rem;margin-bottom:.5rem}`;/**
 * @summary 菜单项组件
 *
 * ```html
 * <mdui-menu>
 * ..<mdui-menu-item>Item 1</mdui-menu-item>
 * ..<mdui-menu-item>Item 2</mdui-menu-item>
 * </mdui-menu>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event submenu-open - 子菜单开始打开时，事件被触发。可以通过调用 `event.preventDefault()` 阻止子菜单打开
 * @event submenu-opened - 子菜单打开动画完成时，事件被触发
 * @event submenu-close - 子菜单开始关闭时，事件被触发。可以通过调用 `event.preventDefault()` 阻止子菜单关闭
 * @event submenu-closed - 子菜单关闭动画完成时，事件被触发
 *
 * @slot - 菜单项的文本
 * @slot icon - 菜单项左侧图标
 * @slot end-icon - 菜单项右侧图标
 * @slot end-text - 菜单右侧的文本
 * @slot selected-icon - 选中状态的图标
 * @slot submenu - 子菜单
 * @slot custom - 任意自定义内容
 *
 * @csspart container - 菜单项的容器
 * @csspart icon - 左侧的图标
 * @csspart label - 文本内容
 * @csspart end-icon - 右侧的图标
 * @csspart end-text - 右侧的文本
 * @csspart selected-icon - 选中状态的图标
 * @csspart submenu - 子菜单元素
 */let rt=class extends iG(i4(iZ(t7))){constructor(){super(),/**
         * 是否禁用该菜单项
         */this.disabled=!1,/**
         * 是否打开子菜单
         */this.submenuOpen=!1,// 是否已选中该菜单项。由 <mdui-menu> 控制该参数
this.selected=!1,// 是否使用更紧凑的布局。由 <mdui-menu> 控制该参数
this.dense=!1,// 是否可聚焦。由 <mdui-menu> 控制该参数
this.focusable=!1,// 每一个 menu-item 元素都添加一个唯一的 key
this.key=iM(),this.rippleRef=iF(),this.containerRef=iF(),this.submenuRef=iF(),this.hasSlotController=new t6(this,"[default]","icon","end-icon","end-text","submenu","custom"),this.definedController=new iA(this,{relatedElements:[""]}),this.onOuterClick=this.onOuterClick.bind(this),this.onFocus=this.onFocus.bind(this),this.onBlur=this.onBlur.bind(this),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this),this.onMouseEnter=this.onMouseEnter.bind(this),this.onMouseLeave=this.onMouseLeave.bind(this)}get focusDisabled(){return this.disabled||!this.focusable}get focusElement(){return this.href&&!this.disabled?this.containerRef.value:this}get rippleDisabled(){return this.disabled}get rippleElement(){return this.rippleRef.value}get hasSubmenu(){return this.hasSlotController.test("submenu")}async onOpenChange(){let e=this.hasUpdated;// 默认为关闭状态。因此首次渲染时，且为关闭状态，不执行
if(!this.submenuOpen&&!e)return;await this.definedController.whenDefined(),e||await this.updateComplete;let t=oI(this,"linear"),i=oI(this,"emphasized-decelerate"),o=oI(this,"emphasized-accelerate");// 打开
// 要区分是否首次渲染，首次渲染时不触发事件，不执行动画；非首次渲染，触发事件，执行动画
if(this.submenuOpen){if(e){let e=this.emit("submenu-open",{cancelable:!0});if(!e)return}let o=oS(this,"medium4");await ox(this.submenuRef.value),this.submenuRef.value.hidden=!1,this.updateSubmenuPositioner(),await Promise.all([oC(this.submenuRef.value,[{transform:"scaleY(0.45)"},{transform:"scaleY(1)"}],{duration:e?o:0,easing:i}),oC(this.submenuRef.value,[{opacity:0},{opacity:1,offset:.125},{opacity:1}],{duration:e?o:0,easing:t})]),e&&this.emit("submenu-opened")}else{let e=this.emit("submenu-close",{cancelable:!0});if(!e)return;let i=oS(this,"short4");await ox(this.submenuRef.value),await Promise.all([oC(this.submenuRef.value,[{transform:"scaleY(1)"},{transform:"scaleY(0.45)"}],{duration:i,easing:o}),oC(this.submenuRef.value,[{opacity:1},{opacity:1,offset:.875},{opacity:0}],{duration:i,easing:t})]),this.submenuRef.value&&(this.submenuRef.value.hidden=!0),this.emit("submenu-closed")}}connectedCallback(){super.connectedCallback(),this.definedController.whenDefined().then(()=>{document.addEventListener("pointerdown",this.onOuterClick)})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerdown",this.onOuterClick)}firstUpdated(e){super.firstUpdated(e),this.definedController.whenDefined().then(()=>{this.addEventListener("focus",this.onFocus),this.addEventListener("blur",this.onBlur),this.addEventListener("click",this.onClick),this.addEventListener("keydown",this.onKeydown),this.addEventListener("mouseenter",this.onMouseEnter),this.addEventListener("mouseleave",this.onMouseLeave)})}render(){let e=this.hasSubmenu,t=this.hasSlotController.test("custom"),i=this.hasSlotController.test("end-icon"),o=!this.endIcon&&e&&!i,r=this.endIcon||e||i,n=!g(this.icon)||"single"===this.selects||"multiple"===this.selects||this.hasSlotController.test("icon"),s=!!this.endText||this.hasSlotController.test("end-text"),a=iq({container:!0,dense:this.dense,preset:!t,"has-icon":n,"has-end-text":s,"has-end-icon":r});return tI`<mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple>${this.href&&!this.disabled?this.renderAnchor({part:"container",className:a,content:this.renderInner(o,n),refDirective:iK(this.containerRef),tabIndex:this.focusable?0:-1}):tI`<div part="container" ${iK(this.containerRef)} class="${a}">${this.renderInner(o,n)}</div>`} ${ok(e,()=>tI`<slot name="submenu" ${iK(this.submenuRef)} part="submenu" class="submenu" hidden></slot>`)}`}/**
     * 点击子菜单外面的区域，关闭子菜单
     */onOuterClick(e){this.disabled||!this.submenuOpen||this===e.target||z.contains(this,e.target)||(this.submenuOpen=!1)}hasTrigger(e){return!!this.submenuTrigger&&this.submenuTrigger.split(" ").includes(e)}onFocus(){!this.disabled&&!this.submenuOpen&&this.hasTrigger("focus")&&this.hasSubmenu&&(this.submenuOpen=!0)}onBlur(){!this.disabled&&this.submenuOpen&&this.hasTrigger("focus")&&this.hasSubmenu&&(this.submenuOpen=!1)}onClick(e){// e.button 为 0 时，为鼠标左键点击。忽略鼠标中间和右键
!this.disabled&&!e.button&&this.hasTrigger("click")&&e.target===this&&this.hasSubmenu&&(this.submenuOpen&&(this.hasTrigger("hover")||this.hasTrigger("focus"))||(this.submenuOpen=!this.submenuOpen))}onKeydown(e){// 切换子菜单打开状态
!this.disabled&&this.hasSubmenu&&(this.submenuOpen||"Enter"!==e.key||(e.stopPropagation(),this.submenuOpen=!0),this.submenuOpen&&"Escape"===e.key&&(e.stopPropagation(),this.submenuOpen=!1))}onMouseEnter(){// 不做 submenuOpen 的判断，因为可以延时打开和关闭
!this.disabled&&this.hasTrigger("hover")&&this.hasSubmenu&&(window.clearTimeout(this.submenuCloseTimeout),this.submenuOpenDelay?this.submenuOpenTimeout=window.setTimeout(()=>{this.submenuOpen=!0},this.submenuOpenDelay):this.submenuOpen=!0)}onMouseLeave(){// 不做 submenuOpen 的判断，因为可以延时打开和关闭
!this.disabled&&this.hasTrigger("hover")&&this.hasSubmenu&&(window.clearTimeout(this.submenuOpenTimeout),this.submenuCloseTimeout=window.setTimeout(()=>{this.submenuOpen=!1},this.submenuCloseDelay||50))}// 更新子菜单的位置
updateSubmenuPositioner(){let e=z(window),t=z(this.submenuRef.value),i=this.getBoundingClientRect(),o=t.innerWidth(),r=t.innerHeight(),n="bottom",s="right";e.height()-i.top>r+8?n="bottom":i.top+i.height>r+8&&(n="top"),e.width()-i.left-i.width>o+8?s="right":i.left>o+8&&(s="left"),z(this.submenuRef.value).css({top:"bottom"===n?0:i.height-r,left:"right"===s?i.width:-o,transformOrigin:["right"===s?0:"100%","bottom"===n?0:"100%"].join(" ")})}renderInner(e,t){return tI`<slot name="custom">${this.selected?tI`<slot name="selected-icon" part="selected-icon" class="selected-icon">${this.selectedIcon?tI`<mdui-icon name="${this.selectedIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-check class="i"></mdui-icon-check>`}</slot>`:tI`<slot name="icon" part="icon" class="icon">${t?tI`<mdui-icon name="${this.icon}" class="i"></mdui-icon>`:t9}</slot>`}<div class="label-container"><slot part="label" class="label"></slot></div><slot name="end-text" part="end-text" class="end-text">${this.endText}</slot>${e?tI`<mdui-icon-arrow-right part="end-icon" class="end-icon arrow-right"></mdui-icon-arrow-right>`:tI`<slot name="end-icon" part="end-icon" class="end-icon">${this.endIcon?tI`<mdui-icon name="${this.endIcon}"></mdui-icon>`:t9}</slot>`}</slot>`}};rt.styles=[ie,re],eq([tX({reflect:!0})],rt.prototype,"value",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rt.prototype,"disabled",void 0),eq([tX({reflect:!0})],rt.prototype,"icon",void 0),eq([tX({reflect:!0,attribute:"end-icon"})],rt.prototype,"endIcon",void 0),eq([tX({reflect:!0,attribute:"end-text"})],rt.prototype,"endText",void 0),eq([tX({reflect:!0,attribute:"selected-icon"})],rt.prototype,"selectedIcon",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"submenu-open"})],rt.prototype,"submenuOpen",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rt.prototype,"selected",void 0),eq([tJ()],rt.prototype,"dense",void 0),eq([tJ()],rt.prototype,"selects",void 0),eq([tJ()],rt.prototype,"submenuTrigger",void 0),eq([tJ()],rt.prototype,"submenuOpenDelay",void 0),eq([tJ()],rt.prototype,"submenuCloseDelay",void 0),eq([tJ()],rt.prototype,"focusable",void 0),eq([iD("submenuOpen")],rt.prototype,"onOpenChange",null),rt=eq([tW("mdui-menu-item")],rt);const ri=eZ`:host{--shape-corner:var(--mdui-shape-corner-extra-small);position:relative;display:block;border-radius:var(--shape-corner);background-color:rgb(var(--mdui-color-surface-container));box-shadow:var(--mdui-elevation-level2);min-width:7rem;max-width:17.5rem;padding-top:.5rem;padding-bottom:.5rem;--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}::slotted(mdui-divider){margin-top:.5rem;margin-bottom:.5rem}`;/**
 * 键盘快捷键：
 * * `Arrow Up` / `Arrow Down` - 使焦点在 `<mdui-menu-item>` 之间向上/向下切换
 * * `Home` / `End` - 使焦点跳转到第一个/最后一个 `<mdui-menu-item>` 元素上
 * * `Space` - 可选中时，选中/取消选中一项
 * * `Enter` - 包含子菜单时，打开子菜单；为链接时，跳转链接
 * * `Escape` - 子菜单已打开时，关闭子菜单
 *
 * @summary 菜单组件。需与 `<mdui-menu-item>` 组件配合使用
 *
 * ```html
 * <mdui-menu>
 * ..<mdui-menu-item>Item 1</mdui-menu-item>
 * ..<mdui-menu-item>Item 2</mdui-menu-item>
 * </mdui-menu>
 * ```
 *
 * @event change - 菜单项的选中状态变化时触发
 *
 * @slot - 子菜单项（`<mdui-menu-item>`）、分割线（[`<mdui-divider>`](/docs/2/components/divider)）等元素
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let ro=class extends t7{constructor(){super(...arguments),/**
         * 菜单项是否使用更紧凑的布局
         */this.dense=!1,/**
         * 子菜单的触发方式，支持传入多个值，用空格分隔。可选值为：
         *
         * * `click`：点击菜单项时打开子菜单
         * * `hover`：鼠标悬浮到菜单项上时打开子菜单
         * * `focus`：聚焦到菜单项上时打开子菜单
         * * `manual`：使用了该值时，只能使用编程方式打开和关闭子菜单，且不能再指定其他触发方式
         */this.submenuTrigger="click hover",/**
         * 通过 hover 触发子菜单打开时的延时，单位为毫秒
         */this.submenuOpenDelay=200,/**
         * 通过 hover 触发子菜单关闭时的延时，单位为毫秒
         */this.submenuCloseDelay=200,// 因为 menu-item 的 value 可能会重复，所有在每一个 menu-item 元素上都加了一个唯一的 key 属性，通过 selectedKeys 来记录选中状态的 key
this.selectedKeys=[],// 是否是初始状态，初始状态不触发 change 事件
this.isInitial=!0,// 最后一次获得焦点的 menu-item 元素。为嵌套菜单时，把不同层级的 menu-item 放到对应索引位的位置
this.lastActiveItems=[],this.definedController=new iA(this,{relatedElements:["mdui-menu-item"]})}// 菜单项元素（包含子菜单中的菜单项）
get items(){return z(this.childrenItems).find("mdui-menu-item").add(this.childrenItems).get()}// 菜单项元素（不包含已禁用的，包含子菜单中的菜单项）
get itemsEnabled(){return this.items.filter(e=>!e.disabled)}// 当前菜单是否为单选
get isSingle(){return"single"===this.selects}// 当前菜单是否为多选
get isMultiple(){return"multiple"===this.selects}// 当前菜单是否可选择
get isSelectable(){return this.isSingle||this.isMultiple}// 当前菜单是否为子菜单
get isSubmenu(){return!z(this).parent().length}// 最深层级的子菜单中，最后交互过的 menu-item
get lastActiveItem(){let e=this.lastActiveItems.length?this.lastActiveItems.length-1:0;return this.lastActiveItems[e]}set lastActiveItem(e){let t=this.lastActiveItems.length?this.lastActiveItems.length-1:0;this.lastActiveItems[t]=e}async onSlotChange(){await this.definedController.whenDefined(),this.items.forEach(e=>{e.dense=this.dense,e.selects=this.selects,e.submenuTrigger=this.submenuTrigger,e.submenuOpenDelay=this.submenuOpenDelay,e.submenuCloseDelay=this.submenuCloseDelay})}async onSelectsChange(){this.isSelectable?this.isSingle&&this.setSelectedKeys(this.selectedKeys.slice(0,1)):this.setSelectedKeys([]),await this.onSelectedKeysChange()}async onSelectedKeysChange(){await this.definedController.whenDefined();// 根据 selectedKeys 读取出对应 menu-item 的 value
let e=this.itemsEnabled.filter(e=>this.selectedKeys.includes(e.key)).map(e=>e.value),t=this.isMultiple?e:e[0]||void 0;this.setValue(t),this.isInitial||this.emit("change")}async onValueChange(){// 根据 value 找出对应的 menu-item，并把这些 menu-item 的 key 赋值给 selectedKeys
if(this.isInitial=!this.hasUpdated,await this.definedController.whenDefined(),!this.isSelectable){this.updateSelected();return}let e=(this.isSingle?[this.value]:m(this.value)?[this.value]:this.value).filter(e=>e);if(e.length){if(this.isSingle){let t=this.itemsEnabled.find(t=>t.value===e[0]);this.setSelectedKeys(t?[t.key]:[])}else this.isMultiple&&this.setSelectedKeys(this.itemsEnabled.filter(t=>e.includes(t.value)).map(e=>e.key))}else this.setSelectedKeys([]);this.updateSelected(),this.updateFocusable()}/**
     * 将焦点设置在当前元素上
     */focus(e){this.lastActiveItem&&this.focusOne(this.lastActiveItem,e)}/**
     * 从当前元素中移除焦点
     */blur(){this.lastActiveItem&&this.lastActiveItem.blur()}firstUpdated(e){super.firstUpdated(e),this.definedController.whenDefined().then(()=>{this.updateFocusable(),this.lastActiveItem=this.items.find(e=>e.focusable)}),// 子菜单打开时，把焦点放到新的子菜单上
this.addEventListener("submenu-open",e=>{let t=z(e.target),i=t.children("mdui-menu-item:not([disabled])").get(),o=t.parents("mdui-menu-item").length+1;i.length&&(this.lastActiveItems[o]=i[0],this.updateFocusable(),this.focusOne(this.lastActiveItems[o]))}),// 子菜单关闭时，把焦点还原到父菜单上
this.addEventListener("submenu-close",e=>{let t=z(e.target),i=t.parents("mdui-menu-item").length+1;this.lastActiveItems.length-1===i&&(this.lastActiveItems.pop(),this.updateFocusable(),this.lastActiveItems[i-1]&&this.focusOne(this.lastActiveItems[i-1]))})}render(){return tI`<slot @slotchange="${this.onSlotChange}" @click="${this.onClick}" @keydown="${this.onKeyDown}"></slot>`}setSelectedKeys(e){ov(this.selectedKeys,e)||(this.selectedKeys=e)}setValue(e){this.isSingle||g(this.value)||g(e)?this.value=e:ov(this.value,e)||(this.value=e)}// 获取和指定菜单项同级的所有菜单项
getSiblingsItems(e,t=!1){return z(e).parent().children(`mdui-menu-item${t?":not([disabled])":""}`).get()}// 更新 menu-item 的可聚焦状态
updateFocusable(){// 焦点优先放在之前焦点所在的元素上
if(this.lastActiveItem){this.items.forEach(e=>{e.focusable=e.key===this.lastActiveItem.key});return}// 没有选中任何一项，焦点放在第一个 menu-item 上
if(!this.selectedKeys.length){this.itemsEnabled.forEach((e,t)=>{e.focusable=!t});return}// 如果是单选，焦点放在当前选中的元素上
if(this.isSingle){this.items.forEach(e=>{e.focusable=this.selectedKeys.includes(e.key)});return}// 是多选，且原焦点不在 selectedKeys 上，焦点放在第一个选中的 menu-item 上
if(this.isMultiple){let e=this.items.find(e=>e.focusable);e?.key&&this.selectedKeys.includes(e.key)||this.itemsEnabled.filter(e=>this.selectedKeys.includes(e.key)).forEach((e,t)=>e.focusable=!t)}}updateSelected(){// 选中 menu-item
this.items.forEach(e=>{e.selected=this.selectedKeys.includes(e.key)})}// 切换一个菜单项的选中状态
selectOne(e){if(this.isMultiple){// 直接修改 this.selectedKeys 无法被 watch 监听到，需要先克隆一份 this.selectedKeys
let t=[...this.selectedKeys];t.includes(e.key)?t.splice(t.indexOf(e.key),1):t.push(e.key),this.setSelectedKeys(t)}this.isSingle&&(this.selectedKeys.includes(e.key)?this.setSelectedKeys([]):this.setSelectedKeys([e.key])),this.isInitial=!1,this.updateSelected()}// 使一个 menu-item 可聚焦
async focusableOne(e){this.items.forEach(t=>t.focusable=t.key===e.key),await oj()}// 聚焦一个 menu-item
focusOne(e,t){e.focus(t)}async onClick(e){if(!this.definedController.isDefined()||this.isSubmenu||e.button)return;let t=e.target,i=t.closest("mdui-menu-item");i&&!i.disabled&&(this.lastActiveItem=i,this.isSelectable&&i.value&&this.selectOne(i),await this.focusableOne(i),this.focusOne(i))}async onKeyDown(e){if(!this.definedController.isDefined()||this.isSubmenu)return;let t=e.target;// 按下方向键时，上下移动焦点；只在和当前 item 同级的 item 直接切换
if("Enter"===e.key&&(e.preventDefault(),t.click())," "===e.key&&(e.preventDefault(),this.isSelectable&&t.value&&(this.selectOne(t),await this.focusableOne(t),this.focusOne(t))),["ArrowUp","ArrowDown","Home","End"].includes(e.key)){let i=this.getSiblingsItems(t,!0),o=i.find(e=>e.focusable),r=o?i.indexOf(o):0;if(i.length>0){e.preventDefault(),"ArrowDown"===e.key?r++:"ArrowUp"===e.key?r--:"Home"===e.key?r=0:"End"===e.key&&(r=i.length-1),r<0&&(r=i.length-1),r>i.length-1&&(r=0),this.lastActiveItem=i[r],await this.focusableOne(i[r]),this.focusOne(i[r]);return}}}};ro.styles=[ie,ri],eq([tX({reflect:!0})],ro.prototype,"selects",void 0),eq([tX()],ro.prototype,"value",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],ro.prototype,"dense",void 0),eq([tX({reflect:!0,attribute:"submenu-trigger"})],ro.prototype,"submenuTrigger",void 0),eq([tX({type:Number,reflect:!0,attribute:"submenu-open-delay"})],ro.prototype,"submenuOpenDelay",void 0),eq([tX({type:Number,reflect:!0,attribute:"submenu-close-delay"})],ro.prototype,"submenuCloseDelay",void 0),eq([tJ()],ro.prototype,"selectedKeys",void 0),eq([tQ({flatten:!0,selector:"mdui-menu-item"})],ro.prototype,"childrenItems",void 0),eq([iD("dense"),iD("selects"),iD("submenuTrigger"),iD("submenuOpenDelay"),iD("submenuCloseDelay")],ro.prototype,"onSlotChange",null),eq([iD("selects",!0)],ro.prototype,"onSelectsChange",null),eq([iD("selectedKeys",!0)],ro.prototype,"onSelectedKeysChange",null),eq([iD("value")],ro.prototype,"onValueChange",null),ro=eq([tW("mdui-menu")],ro);const rr=eZ`:host{--shape-corner-indicator:var(--mdui-shape-corner-full);position:relative;z-index:0;flex:1;overflow:hidden;min-width:3rem;--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface-variant)}.container{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-decoration:none;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;padding-top:.75rem;padding-bottom:.75rem}.container:not(.initial){transition:padding var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard)}mdui-ripple{z-index:1;left:50%;transform:translateX(-50%);width:4rem;height:2rem;margin-top:.75rem;border-radius:var(--mdui-shape-corner-full)}mdui-ripple:not(.initial){transition:margin-top var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard)}.indicator{position:relative;display:flex;align-items:center;justify-content:center;background-color:transparent;border-radius:var(--shape-corner-indicator);height:2rem;width:2rem}:not(.initial) .indicator{transition:background-color var(--mdui-motion-duration-short1) var(--mdui-motion-easing-standard),width var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard)}::slotted([slot=badge]){position:absolute;transform:translate(50%,-50%)}::slotted([slot=badge][variant=small]){transform:translate(.5625rem,-.5625rem)}.active-icon,.icon{color:rgb(var(--mdui-color-on-surface-variant));font-size:1.5rem}.active-icon mdui-icon,.icon mdui-icon,::slotted([slot=active]),::slotted([slot=icon]){font-size:inherit}.icon{display:flex}.active-icon{display:none}.label{display:flex;align-items:center;height:1rem;color:rgb(var(--mdui-color-on-surface-variant));margin-top:.25rem;margin-bottom:.25rem;font-size:var(--mdui-typescale-label-medium-size);font-weight:var(--mdui-typescale-label-medium-weight);letter-spacing:var(--mdui-typescale-label-medium-tracking);line-height:var(--mdui-typescale-label-medium-line-height)}:not(.initial) .label{transition:opacity var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear)}:host(:not([active])) mdui-ripple.label-visibility-selected,mdui-ripple.label-visibility-unlabeled{margin-top:1.5rem}.container.label-visibility-unlabeled,:host(:not([active])) .container.label-visibility-selected{padding-top:1.5rem;padding-bottom:0}.container.label-visibility-unlabeled .label,:host(:not([active])) .container.label-visibility-selected .label{opacity:0}:host([active]){--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}:host([active]) .indicator{width:4rem;background-color:rgb(var(--mdui-color-secondary-container))}:host([active]) .active-icon,:host([active]) .icon{color:rgb(var(--mdui-color-on-secondary-container))}:host([active]) .has-active-icon .active-icon{display:flex}:host([active]) .has-active-icon .icon{display:none}:host([active]) .label{color:rgb(var(--mdui-color-on-surface))}`;/**
 * @summary 底部导航栏项组件。需与 `<mdui-navigation-bar>` 组件配合使用
 *
 * ```html
 * <mdui-navigation-bar>
 * ..<mdui-navigation-bar-item icon="place">Item 1</mdui-navigation-bar-item>
 * ..<mdui-navigation-bar-item icon="commute">Item 2</mdui-navigation-bar-item>
 * ..<mdui-navigation-bar-item icon="people">Item 3</mdui-navigation-bar-item>
 * </mdui-navigation-bar>
 * ```
 *
 * @slot - 文本
 * @slot icon - 图标
 * @slot active-icon - 激活状态的图标元素
 * @slot badge - 徽标
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 *
 * @csspart container - 导航项容器
 * @csspart indicator - 指示器
 * @csspart badge - 徽标
 * @csspart icon - 图标
 * @csspart active-icon - 激活状态的图标
 * @csspart label - 文本
 *
 * @cssprop --shape-corner-indicator - 指示器的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let rn=class extends iG(i4(iZ(t7))){constructor(){super(...arguments),/**
         * 是否是初始状态，不显示动画。由 `<mdui-navigation-bar>` 组件控制该参数
         */this.isInitial=!0,/**
         * 是否为激活状态，由 `<mdui-navigation-bar>` 组件控制该参数
         */this.active=!1,// 是否禁用该元素，该组件没有禁用状态
this.disabled=!1,// 每一个 `<navigation-bar-item>` 元素都添加一个唯一的 key
this.key=iM(),this.rippleRef=iF(),this.hasSlotController=new t6(this,"active-icon")}get rippleElement(){return this.rippleRef.value}get rippleDisabled(){return this.disabled}get focusElement(){return this.href?this.renderRoot?.querySelector("._a"):this}get focusDisabled(){return this.disabled}render(){let e=iq({"label-visibility-selected":"selected"===this.labelVisibility,"label-visibility-labeled":"labeled"===this.labelVisibility,"label-visibility-unlabeled":"unlabeled"===this.labelVisibility,initial:this.isInitial}),t=iq([{container:!0,"has-active-icon":this.activeIcon||this.hasSlotController.test("active-icon")},e]);return tI`<mdui-ripple .noRipple="${!this.active||this.noRipple}" class="${e}" ${iK(this.rippleRef)}></mdui-ripple>${this.href?this.renderAnchor({part:"container",className:t,content:this.renderInner()}):tI`<div part="container" class="${t}">${this.renderInner()}</div>`}`}renderInner(){return tI`<div part="indicator" class="indicator"><slot name="badge" part="badge" class="badge"></slot><slot name="active-icon" part="active-icon" class="active-icon">${this.activeIcon?tI`<mdui-icon name="${this.activeIcon}"></mdui-icon>`:t9}</slot><slot name="icon" part="icon" class="icon">${this.icon?tI`<mdui-icon name="${this.icon}"></mdui-icon>`:t9}</slot></div><slot part="label" class="label"></slot>`}};rn.styles=[ie,rr],eq([tX({reflect:!0})],rn.prototype,"icon",void 0),eq([tX({reflect:!0,attribute:"active-icon"})],rn.prototype,"activeIcon",void 0),eq([tX({reflect:!0})],rn.prototype,"value",void 0),eq([tJ()],rn.prototype,"labelVisibility",void 0),eq([tJ()],rn.prototype,"isInitial",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rn.prototype,"active",void 0),eq([tJ()],rn.prototype,"disabled",void 0),rn=eq([tW("mdui-navigation-bar-item")],rn);const rs=eZ`:host{--shape-corner:var(--mdui-shape-corner-none);--z-index:2000;position:fixed;right:0;bottom:0;left:0;display:flex;flex:0 0 auto;overflow:hidden;border-radius:var(--shape-corner) var(--shape-corner) 0 0;z-index:var(--z-index);transition-property:transform;transition-duration:var(--mdui-motion-duration-long2);transition-timing-function:var(--mdui-motion-easing-emphasized);height:5rem;background-color:rgb(var(--mdui-color-surface));box-shadow:var(--mdui-elevation-level2)}:host([scroll-target]:not([scroll-target=''])){position:absolute}:host([hide]){transform:translateY(5.625rem);transition-duration:var(--mdui-motion-duration-short4)}`;/**
 * @summary 底部导航栏组件。需与 `<mdui-navigation-bar-item>` 组件配合使用
 *
 * ```html
 * <mdui-navigation-bar>
 * ..<mdui-navigation-bar-item icon="place">Item 1</mdui-navigation-bar-item>
 * ..<mdui-navigation-bar-item icon="commute">Item 2</mdui-navigation-bar-item>
 * ..<mdui-navigation-bar-item icon="people">Item 3</mdui-navigation-bar-item>
 * </mdui-navigation-bar>
 * ```
 *
 * @event change - 值变化时触发
 * @event show - 开始显示时，事件被触发。可以通过调用 `event.preventDefault()` 阻止显示
 * @event shown - 显示动画完成时，事件被触发
 * @event hide - 开始隐藏时，事件被触发。可以通过调用 `event.preventDefault()` 阻止隐藏
 * @event hidden - 隐藏动画完成时，事件被触发
 *
 * @slot - `<mdui-navigation-bar-item>` 组件
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --z-index - 组件的 CSS 的 `z-index` 值
 */let ra=class extends iP(iB){constructor(){super(...arguments),/**
         * 是否隐藏
         */this.hide=!1,/**
         * 文本的可视状态。可选值为：
         *
         * * `auto`：小于等于3个选项时，始终显示；大于3个选项时，仅显示选中状态的文本
         * * `selected`：仅选中状态显示文本
         * * `labeled`：始终显示文本
         * * `unlabeled`：始终不显示文本
         */this.labelVisibility="auto",// 因为 navigation-bar-item 的 value 可能会重复，所以在每个 navigation-bar-item 元素上都添加了一个唯一的 key，通过 activeKey 来记录激活状态的 key
this.activeKey=0,// 是否是初始状态，初始状态不触发 change 事件，没有动画
this.isInitial=!0,this.definedController=new iA(this,{relatedElements:["mdui-navigation-bar-item"]})}get scrollPaddingPosition(){return"bottom"}get layoutPlacement(){return"bottom"}async onActiveKeyChange(){await this.definedController.whenDefined();// 根据 activeKey 读取对应 navigation-bar-item 的值
let e=this.items.find(e=>e.key===this.activeKey);this.value=e?.value,this.isInitial||this.emit("change")}async onValueChange(){this.isInitial=!this.hasUpdated,await this.definedController.whenDefined();let e=this.items.find(e=>e.value===this.value);this.activeKey=e?.key??0,this.updateItems()}async onLabelVisibilityChange(){await this.definedController.whenDefined(),this.updateItems()}firstUpdated(e){super.firstUpdated(e),this.addEventListener("transitionend",e=>{e.target===this&&this.emit(this.hide?"hidden":"shown")})}render(){return tI`<slot @slotchange="${this.onSlotChange}" @click="${this.onClick}"></slot>`}/**
     * 滚动行为
     * 当前仅支持 hide 这一个行为，所以不做行为类型判断
     */runScrollThreshold(e){// 向下滚动
if(!e&&!this.hide){let e=this.emit("hide",{cancelable:!0});e&&(this.hide=!0)}// 向上滚动
if(e&&this.hide){let e=this.emit("show",{cancelable:!0});e&&(this.hide=!1)}}onClick(e){// event.button 为 0 时，为鼠标左键点击。忽略鼠标中键和右键
if(e.button)return;let t=e.target,i=t.closest("mdui-navigation-bar-item");i&&(this.activeKey=i.key,this.isInitial=!1,this.updateItems())}// 更新 <mdui-navigation-bar-item> 的状态
updateItems(){let e=this.items,t="auto"===this.labelVisibility?e.length<=3?"labeled":"selected":this.labelVisibility;e.forEach(e=>{e.active=this.activeKey===e.key,e.labelVisibility=t,e.isInitial=this.isInitial})}async onSlotChange(){await this.definedController.whenDefined(),this.updateItems()}};ra.styles=[ie,rs],eq([tX({type:Boolean,reflect:!0,converter:iS})],ra.prototype,"hide",void 0),eq([tX({reflect:!0,attribute:"label-visibility"})],ra.prototype,"labelVisibility",void 0),eq([tX({reflect:!0})],ra.prototype,"value",void 0),eq([tX({reflect:!0,attribute:"scroll-behavior"})],ra.prototype,"scrollBehavior",void 0),eq([tJ()],ra.prototype,"activeKey",void 0),eq([tQ({selector:"mdui-navigation-bar-item",flatten:!0})],ra.prototype,"items",void 0),eq([iD("activeKey",!0)],ra.prototype,"onActiveKeyChange",null),eq([iD("value")],ra.prototype,"onValueChange",null),eq([iD("labelVisibility",!0)],ra.prototype,"onLabelVisibilityChange",null),ra=eq([tW("mdui-navigation-bar")],ra);/**
 * 断点相关的 js 函数
 * 这些函数直接导出到 mdui 全局对象下，供应用使用。框架内部使用时，为避免循环依赖，从 @mdui/shared 包内导入
 */const rl=e=>{let t=c(),i=l(),o=t.getComputedStyle(i.documentElement),r=k(e)?z(e).innerWidth():f(e)?e:z(t).innerWidth(),n=e=>{let t=o.getPropertyValue(`--mdui-breakpoint-${e}`).toLowerCase();return parseFloat(t)},s=e=>{switch(e){case"xs":return"sm";case"sm":return"md";case"md":return"lg";case"lg":return"xl";case"xl":return"xxl"}};return{/**
         * 当前宽度是否大于指定断点值
         * @param breakpoint
         */up:e=>r>=n(e),/**
         * 当前宽度是否小于指定断点值
         * @param breakpoint
         */down:e=>r<n(e),/**
         * 当前宽度是否在指定断点值内
         * @param breakpoint
         */only(e){return"xxl"===e?this.up(e):this.up(e)&&this.down(s(e))},/**
         * 当前宽度是否不在指定断点值内
         * @param breakpoint
         */not(e){return!this.only(e)},/**
         * 当前宽度是否在指定断点值之间
         * @param startBreakpoint
         * @param endBreakpoint
         * @returns
         */between(e,t){return this.up(e)&&this.down(t)}}},rd=eZ`:host{--shape-corner:var(--mdui-shape-corner-large);--z-index:2200;display:none;position:fixed;top:0;bottom:0;left:0;z-index:1;width:22.5rem}:host([placement=right]){left:initial;right:0}:host([mobile]),:host([modal]){top:0!important;right:0;bottom:0!important;width:initial;z-index:var(--z-index)}:host([placement=right][mobile]),:host([placement=right][modal]){left:0}:host([contained]){position:absolute}.overlay{position:absolute;inset:0;z-index:inherit;background-color:rgba(var(--mdui-color-scrim),.4)}.panel{display:block;position:absolute;top:0;bottom:0;left:0;width:100%;overflow:auto;z-index:inherit;background-color:rgb(var(--mdui-color-surface));box-shadow:var(--mdui-elevation-level0)}:host([mobile]) .panel,:host([modal]) .panel{border-radius:0 var(--shape-corner) var(--shape-corner) 0;max-width:80%;width:22.5rem;background-color:rgb(var(--mdui-color-surface-container-low));box-shadow:var(--mdui-elevation-level1)}:host([placement=right]) .panel{left:initial;right:0}:host([placement=right][mobile]) .panel,:host([placement=right][modal]) .panel{border-radius:var(--shape-corner) 0 0 var(--shape-corner)}`;/**
 * 在手机端，`modal` 始终为 `true`；大于手机端时，`modal` 属性才开始生效
 *
 * @summary 侧边抽屉栏组件
 *
 * ```html
 * <mdui-navigation-drawer>content</mdui-navigation-drawer>
 * ```
 *
 * @event open - 在抽屉导航打开之前触发。可以通过调用 `event.preventDefault()` 阻止抽屉导航打开
 * @event opened - 在抽屉导航打开之后触发
 * @event close - 在抽屉导航关闭之前触发。可以通过调用 `event.preventDefault()` 阻止抽屉导航关闭
 * @event closed - 在抽屉导航关闭之后触发
 * @event overlay-click - 点击遮罩层时触发
 *
 * @slot - 抽屉导航中的内容
 *
 * @csspart overlay - 遮罩层
 * @csspart panel - 抽屉导航容器
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --z-index - 组件的 CSS 的 `z-index` 值
 */let rc=class extends iB{constructor(){super(...arguments),/**
         * 是否打开抽屉导航
         */this.open=!1,/**
         * 打开时，是否显示遮罩层
         *
         * 较窄的设备上（屏幕宽度小于 [`--mdui-breakpoint-md`](/docs/2/styles/design-tokens#breakpoint) 时），会无视该参数，始终显示遮罩层
         */this.modal=!1,/**
         * 在含遮罩层时，是否在按下 ESC 键时，关闭抽屉导航
         */this.closeOnEsc=!1,/**
         * 是否在点击遮罩时，关闭抽屉导航
         */this.closeOnOverlayClick=!1,/**
         * 抽屉导航的显示位置。可选值为：
         *
         * * `left`：显示在左侧
         * * `right`：显示在右侧
         */this.placement="left",/**
         * 默认抽屉导航相对于 `body` 元素显示，该参数设置为 `true` 时，抽屉导航将相对于它的父元素显示
         *
         * Note:
         * 设置了该属性时，必须手动在父元素上设置样式 `position: relative; overflow: hidden;`
         */this.contained=!1,// 断点为 mobile 时为 `true` 时，强制使用遮罩层
this.mobile=!1,this.overlayRef=iF(),this.panelRef=iF(),this.definedController=new iA(this,{needDomReady:!0})}get layoutPlacement(){return this.placement}get lockTarget(){return this.contained||this.isParentLayout?this.parentElement:document.body}get isModal(){return this.mobile||this.modal}// contained 变更后，修改监听尺寸变化的元素。为 true 时，监听父元素；为 false 时，监听 body
async onContainedChange(){await this.definedController.whenDefined(),this.observeResize?.unobserve(),this.observeResize=i_(this.contained?this.parentElement:document.body,()=>{let e=this.contained?this.parentElement:void 0;this.mobile=rl(e).down("md"),this.isParentLayout&&this.layoutManager.updateLayout(this,{width:this.isModal?0:void 0})})}onPlacementChange(){this.isParentLayout&&this.layoutManager.updateLayout(this)}async onMobileChange(){!this.open||this.isParentLayout||this.contained||(await this.definedController.whenDefined(),this.isModal?(oT(this,this.lockTarget),await this.getLockTargetAnimate(!1,0)):(oM(this,this.lockTarget),await this.getLockTargetAnimate(!0,0)))}async onOpenChange(){let e=this.panelRef.value,t=this.overlayRef.value,i="right"===this.placement,o=oI(this,"linear"),r=oI(this,"emphasized"),n=(e,t)=>{z(this.layoutManager.getItemsAndMain()).css("transition",b(e)?null:`all ${e}ms ${t}`)},s=async()=>{await Promise.all([this.isModal?ox(t):this.isParentLayout?Promise.resolve():ox(this.lockTarget),this.isModal?ox(e):ox(this)])};// 打开
// 要区分是否首次渲染，首次渲染时不触发事件，不执行动画；非首次渲染，触发事件，执行动画
if(this.open){let a=this.hasUpdated;if(a||(await this.updateComplete,e=this.panelRef.value,t=this.overlayRef.value),a){let e=this.emit("open",{cancelable:!0});if(!e)return}await this.definedController.whenDefined(),this.style.display="block",this.originalTrigger=document.activeElement,this.isModal&&(this.modalHelper.activate(),this.contained||oT(this,this.lockTarget)),await s(),// 设置聚焦
requestAnimationFrame(()=>{let t=this.querySelector("[autofocus]");t?t.focus({preventScroll:!0}):e.focus({preventScroll:!0})});let l=oS(this,"long2"),d=[];this.isModal?d.push(oC(t,[{opacity:0},{opacity:1,offset:.3},{opacity:1}],{duration:a?l:0,easing:o})):this.isParentLayout||d.push(this.getLockTargetAnimate(!0,a?l:0)),this.isParentLayout&&a&&n(l,r),// drawer 显示动画
d.push(oC(this.isModal?e:this,[{transform:`translateX(${i?"":"-"}100%)`},{transform:"translateX(0)"}],{duration:a?l:0,easing:r})),await Promise.all(d),this.isParentLayout&&a&&n(null),a&&this.emit("opened")}else if(this.hasUpdated){// 关闭
let a=this.emit("close",{cancelable:!0});if(!a)return;await this.definedController.whenDefined(),this.isModal&&this.modalHelper.deactivate(),await s();let l=oS(this,"short4"),d=[];this.isModal?d.push(oC(t,[{opacity:1},{opacity:0}],{duration:l,easing:o})):this.isParentLayout||d.push(this.getLockTargetAnimate(!1,l)),this.isParentLayout&&(n(l,r),// 关闭动画开始时，drawer 的宽度不变。等到关闭动画结束，drawer 的宽度才变为 0
// 为了 layout-main 的动画能在关闭动画开始时就执行，强制调用 updateLayout 更新布局
this.layoutManager.updateLayout(this,{width:0})),// drawer 显示动画
d.push(oC(this.isModal?e:this,[{transform:"translateX(0)"},{transform:`translateX(${i?"":"-"}100%)`}],{duration:l,easing:r})),await Promise.all(d),this.isParentLayout&&n(null),this.style.display="none",this.isModal&&!this.contained&&oM(this,this.lockTarget);// 抽屉导航关闭后，恢复焦点到原有的元素上
let c=this.originalTrigger;p(c?.focus)&&setTimeout(()=>c.focus()),this.emit("closed")}}connectedCallback(){super.connectedCallback(),this.modalHelper=new oE(this)}disconnectedCallback(){super.disconnectedCallback(),oM(this,this.lockTarget),this.observeResize?.unobserve()}firstUpdated(e){super.firstUpdated(e),this.addEventListener("keydown",e=>{this.open&&this.closeOnEsc&&"Escape"===e.key&&this.isModal&&(e.stopPropagation(),this.open=!1)})}render(){return tI`${ok(this.isModal,()=>tI`<div ${iK(this.overlayRef)} part="overlay" class="overlay" @click="${this.onOverlayClick}"></div>`)}<slot ${iK(this.panelRef)} part="panel" class="panel" tabindex="0"></slot>`}onOverlayClick(){this.emit("overlay-click"),this.closeOnOverlayClick&&(this.open=!1)}getLockTargetAnimate(e,t){let i="right"===this.placement?"paddingRight":"paddingLeft",o=z(this.panelRef.value).innerWidth()+"px";return oC(this.lockTarget,[{[i]:e?0:o},{[i]:e?o:0}],{duration:t,easing:oI(this,"emphasized"),fill:"forwards"})}};rc.styles=[ie,rd],eq([tX({type:Boolean,reflect:!0,converter:iS})],rc.prototype,"open",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rc.prototype,"modal",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"close-on-esc"})],rc.prototype,"closeOnEsc",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"close-on-overlay-click"})],rc.prototype,"closeOnOverlayClick",void 0),eq([tX({reflect:!0})],rc.prototype,"placement",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rc.prototype,"contained",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rc.prototype,"mobile",void 0),eq([iD("contained")],rc.prototype,"onContainedChange",null),eq([iD("placement",!0)],rc.prototype,"onPlacementChange",null),eq([iD("mobile",!0),iD("modal",!0)],rc.prototype,"onMobileChange",null),eq([iD("open")],rc.prototype,"onOpenChange",null),rc=eq([tW("mdui-navigation-drawer")],rc);const rh=eZ`:host{--shape-corner:var(--mdui-shape-corner-none);--z-index:2000;position:fixed;top:0;bottom:0;left:0;display:flex;flex-direction:column;align-items:center;border-radius:0 var(--shape-corner) var(--shape-corner) 0;z-index:var(--z-index);width:5rem;background-color:rgb(var(--mdui-color-surface));padding:.375rem .75rem}:host([contained]){position:absolute}:host([divider]){border-right:.0625rem solid rgb(var(--mdui-color-surface-variant));width:5.0625rem}:host([placement=right]){left:initial;right:0;border-radius:var(--shape-corner) 0 0 var(--shape-corner)}:host([placement=right][divider]){border-right:none;border-left:.0625rem solid rgb(var(--mdui-color-surface-variant))}.bottom,.items,.top{display:flex;flex-direction:column;align-items:center;width:100%}.top{margin-bottom:1.75rem}.bottom{margin-top:1.75rem}::slotted([slot=bottom]),::slotted([slot=top]),::slotted(mdui-navigation-rail-item){margin-top:.375rem;margin-bottom:.375rem}:host([alignment=start]) .top-spacer{flex-grow:0}:host([alignment=start]) .bottom-spacer{flex-grow:1}:host([alignment=end]) .top-spacer{flex-grow:1}:host([alignment=end]) .bottom-spacer{flex-grow:0}:host([alignment=center]){justify-content:center}:host([alignment=center]) .bottom,:host([alignment=center]) .top{position:absolute}:host([alignment=center]) .top{top:.375rem}:host([alignment=center]) .bottom{bottom:.375rem}`;/**
 * @summary 侧边导航栏组件。需与 `<mdui-navigation-rail-item>` 组件配合使用
 *
 * ```html
 * <mdui-navigation-rail>
 * ..<mdui-navigation-rail-item icon="watch_later">Recent</mdui-navigation-rail-item>
 * ..<mdui-navigation-rail-item icon="image">Images</mdui-navigation-rail-item>
 * ..<mdui-navigation-rail-item icon="library_music">Library</mdui-navigation-rail-item>
 * </mdui-navigation-rail>
 * ```
 *
 * @event change - 值变化时触发
 *
 * @slot - `<mdui-navigation-rail-item>` 组件
 * @slot top - 顶部的元素
 * @slot bottom - 底部的元素
 *
 * @csspart top - 顶部元素的容器
 * @csspart bottom - 底部元素的容器
 * @csspart items - `<mdui-navigation-rail-item>` 组件的容器
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --z-index - 组件的 CSS 的 `z-index` 值
 */let ru=class extends iB{constructor(){super(...arguments),/**
         * 导航栏的位置。可选值为：
         *
         * * `left`：显示在左侧
         * * `right`：显示在右侧
         */this.placement="left",/**
         * 导航栏中的 `<mdui-navigation-rail-item>` 元素的对齐方式。可选值为：
         *
         * * `start`：顶部对齐
         * * `center`：居中对齐
         * * `end`：底部对齐
         */this.alignment="start",/**
         * 默认导航栏相对于 `body` 元素显示，该参数设置为 `true` 时，导航栏将相对于它的父元素显示
         *
         * Note:
         * 设置了该属性时，必须手动在父元素上设置样式 `position: relative;`
         */this.contained=!1,/**
         * 是否在导航栏和页面内容之间添加分割线
         */this.divider=!1,// 因为 navigation-rail-item 的 value 可能会重复，所以在每个 navigation-rail-item 元素上都添加了一个唯一的 key，通过 activeKey 来记录激活状态的 key
this.activeKey=0,this.hasSlotController=new t6(this,"top","bottom"),this.definedController=new iA(this,{relatedElements:["mdui-navigation-rail-item"]}),// 是否是初始状态，初始状态不触发事件，不执行动画
this.isInitial=!0}get layoutPlacement(){return this.placement}get parentTarget(){return this.contained||this.isParentLayout?this.parentElement:document.body}get isRight(){return"right"===this.placement}get paddingValue(){return["fixed","absolute"].includes(z(this).css("position"))?this.offsetWidth:void 0}async onActiveKeyChange(){await this.definedController.whenDefined();// 根据 activeKey 读取对应 navigation-rail-item 的值
let e=this.items.find(e=>e.key===this.activeKey);this.value=e?.value,this.isInitial||this.emit("change")}async onValueChange(){this.isInitial=!this.hasUpdated,await this.definedController.whenDefined();let e=this.items.find(e=>e.value===this.value);this.activeKey=e?.key??0,this.updateItems()}async onContainedChange(){this.isParentLayout||(await this.definedController.whenDefined(),z(document.body).css({paddingLeft:this.contained||this.isRight?null:this.paddingValue,paddingRight:this.contained||!this.isRight?null:this.paddingValue}),z(this.parentElement).css({paddingLeft:this.contained&&!this.isRight?this.paddingValue:null,paddingRight:this.contained&&this.isRight?this.paddingValue:null}))}async onPlacementChange(){await this.definedController.whenDefined(),this.layoutManager?.updateLayout(this),this.items.forEach(e=>{e.placement=this.placement}),this.isParentLayout||z(this.parentTarget).css({paddingLeft:this.isRight?null:this.paddingValue,paddingRight:this.isRight?this.paddingValue:null})}connectedCallback(){super.connectedCallback(),this.isParentLayout||this.definedController.whenDefined().then(()=>{z(this.parentTarget).css({paddingLeft:this.isRight?null:this.paddingValue,paddingRight:this.isRight?this.paddingValue:null})})}disconnectedCallback(){super.disconnectedCallback(),!this.isParentLayout&&this.definedController.isDefined()&&z(this.parentTarget).css({paddingLeft:this.isRight?void 0:null,paddingRight:this.isRight?null:void 0})}render(){let e=this.hasSlotController.test("top"),t=this.hasSlotController.test("bottom");return tI`${ok(e,()=>tI`<slot name="top" part="top" class="top"></slot>`)} <span class="top-spacer"></span><slot part="items" class="items" @slotchange="${this.onSlotChange}" @click="${this.onClick}"></slot><span class="bottom-spacer"></span> ${ok(t,()=>tI`<slot name="bottom" part="bottom" class="bottom"></slot>`)}`}onClick(e){// event.button 为 0 时，为鼠标左键点击。忽略鼠标中键和右键
if(e.button)return;let t=e.target,i=t.closest("mdui-navigation-rail-item");i&&(this.activeKey=i.key,this.isInitial=!1,this.updateItems())}updateItems(){this.items.forEach(e=>{e.active=this.activeKey===e.key,e.placement=this.placement,e.isInitial=this.isInitial})}async onSlotChange(){await this.definedController.whenDefined(),this.updateItems()}};ru.styles=[ie,rh],eq([tX({reflect:!0})],ru.prototype,"value",void 0),eq([tX({reflect:!0})],ru.prototype,"placement",void 0),eq([tX({reflect:!0})],ru.prototype,"alignment",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],ru.prototype,"contained",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],ru.prototype,"divider",void 0),eq([tJ()],ru.prototype,"activeKey",void 0),eq([tQ({selector:"mdui-navigation-rail-item",flatten:!0})],ru.prototype,"items",void 0),eq([iD("activeKey",!0)],ru.prototype,"onActiveKeyChange",null),eq([iD("value")],ru.prototype,"onValueChange",null),eq([iD("contained",!0)],ru.prototype,"onContainedChange",null),eq([iD("placement",!0)],ru.prototype,"onPlacementChange",null),ru=eq([tW("mdui-navigation-rail")],ru);const rp=eZ`:host{--shape-corner-indicator:var(--mdui-shape-corner-full);position:relative;z-index:0;width:100%;--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface-variant)}.container{display:flex;flex-direction:column;align-items:center;justify-content:center;text-decoration:none;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;height:3.5rem}.container:not(.initial){transition:padding var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard)}mdui-ripple{z-index:1;width:3.5rem;height:2rem;border-radius:var(--mdui-shape-corner-full)}.container:not(.has-label)+mdui-ripple{height:3.5rem}.indicator{position:relative;display:flex;align-items:center;justify-content:center;background-color:transparent;border-radius:var(--shape-corner-indicator);height:2rem;width:2rem}:not(.initial) .indicator{transition:background-color var(--mdui-motion-duration-short1) var(--mdui-motion-easing-standard),width var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard),height var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard)}::slotted([slot=badge]){position:absolute;transform:translate(50%,-50%)}.placement-right::slotted([slot=badge]){transform:translate(-50%,-50%)}::slotted([slot=badge][variant=small]){transform:translate(.5625rem,-.5625rem)}.placement-right::slotted([slot=badge][variant=small]){transform:translate(-.5625rem,-.5625rem)}.active-icon,.icon{color:rgb(var(--mdui-color-on-surface-variant));font-size:1.5rem}.active-icon mdui-icon,.icon mdui-icon,::slotted([slot=active-icon]),::slotted([slot=icon]){font-size:inherit}.icon{display:flex}.active-icon{display:none}.label{display:flex;align-items:center;height:1rem;color:rgb(var(--mdui-color-on-surface-variant));margin-top:.25rem;margin-bottom:.25rem;font-size:var(--mdui-typescale-label-medium-size);font-weight:var(--mdui-typescale-label-medium-weight);letter-spacing:var(--mdui-typescale-label-medium-tracking);line-height:var(--mdui-typescale-label-medium-line-height)}:not(.initial) .label{transition:opacity var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear)}:host([active]){--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}:host([active]) .indicator{width:3.5rem;background-color:rgb(var(--mdui-color-secondary-container))}:host([active]) :not(.has-label) .indicator{height:3.5rem}:host([active]) .active-icon,:host([active]) .icon{color:rgb(var(--mdui-color-on-secondary-container))}:host([active]) .has-active-icon .active-icon{display:flex}:host([active]) .has-active-icon .icon{display:none}:host([active]) .label{color:rgb(var(--mdui-color-on-surface))}`;/**
 * @summary 侧边导航栏项组件。需与 `<mdui-navigation-rail>` 组件配合使用
 *
 * ```html
 * <mdui-navigation-rail>
 * ..<mdui-navigation-rail-item icon="watch_later">Recent</mdui-navigation-rail-item>
 * ..<mdui-navigation-rail-item icon="image">Images</mdui-navigation-rail-item>
 * ..<mdui-navigation-rail-item icon="library_music">Library</mdui-navigation-rail-item>
 * </mdui-navigation-rail>
 * ```
 *
 * @slot - 文本
 * @slot icon - 图标
 * @slot active-icon - 激活状态的图标
 * @slot badge - 徽标
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 *
 * @csspart container - 导航项容器
 * @csspart indicator - 指示器
 * @csspart badge - 徽标
 * @csspart icon - 图标
 * @csspart active-icon - 激活状态的图标
 * @csspart label - 文本
 *
 * @cssprop --shape-corner-indicator - 指示器的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let rm=class extends iG(i4(iZ(t7))){constructor(){super(...arguments),/**
         * 是否为激活状态，由 `<mdui-navigation-rail>` 组件控制该参数
         */this.active=!1,/**
         * 是否是初始状态，不显示动画。由 `<mdui-navigation-rail>` 组件控制该参数
         */this.isInitial=!0,/**
         * 导航栏的位置，由 `<mdui-navigation-rail>` 组件控制该参数
         */this.placement="left",// 是否禁用该元素，该组件没有禁用状态
this.disabled=!1,// 每一个 `<mdui-navigation-rail-item>` 元素都添加一个唯一的 key
this.key=iM(),this.rippleRef=iF(),this.hasSlotController=new t6(this,"[default]","active-icon")}get rippleElement(){return this.rippleRef.value}get rippleDisabled(){return this.disabled}get focusElement(){return this.href?this.renderRoot?.querySelector("._a"):this}get focusDisabled(){return this.disabled}render(){let e=this.hasSlotController.test("[default]"),t=iq({container:!0,"has-label":e,"has-active-icon":this.activeIcon||this.hasSlotController.test("active-icon"),initial:this.isInitial});return tI`${this.href?this.renderAnchor({part:"container",className:t,content:this.renderInner(e)}):tI`<div part="container" class="${t}">${this.renderInner(e)}</div>`}<mdui-ripple .noRipple="${!this.active||this.noRipple}" ${iK(this.rippleRef)}></mdui-ripple>`}renderInner(e){return tI`<div part="indicator" class="indicator"><slot name="badge" part="badge" class="${iQ({badge:!0,"placement-right":"right"===this.placement})}"></slot><slot name="active-icon" part="active-icon" class="active-icon">${this.activeIcon?tI`<mdui-icon name="${this.activeIcon}"></mdui-icon>`:t9}</slot><slot name="icon" part="icon" class="icon">${this.icon?tI`<mdui-icon name="${this.icon}"></mdui-icon>`:t9}</slot></div>${e?tI`<slot part="label" class="label"></slot>`:tA}`}};rm.styles=[ie,rp],eq([tX({reflect:!0})],rm.prototype,"icon",void 0),eq([tX({reflect:!0,attribute:"active-icon"})],rm.prototype,"activeIcon",void 0),eq([tX({reflect:!0})],rm.prototype,"value",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rm.prototype,"active",void 0),eq([tJ()],rm.prototype,"isInitial",void 0),eq([tJ()],rm.prototype,"placement",void 0),eq([tJ()],rm.prototype,"disabled",void 0),rm=eq([tW("mdui-navigation-rail-item")],rm);let rf=class extends tq{render(){return os('<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"/>')}};rf.styles=on,rf=eq([tW("mdui-icon-circle")],rf);let rv=class extends tq{render(){return os('<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>')}};rv.styles=on,rv=eq([tW("mdui-icon-radio-button-unchecked")],rv);const rg=eZ`:host{position:relative;display:inline-flex;align-items:center;cursor:pointer;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;touch-action:manipulation;zoom:1;-webkit-user-drag:none;border-radius:.125rem;font-size:var(--mdui-typescale-label-large-size);font-weight:var(--mdui-typescale-label-large-weight);letter-spacing:var(--mdui-typescale-label-large-tracking);line-height:var(--mdui-typescale-label-large-line-height)}.icon{display:flex;position:absolute;font-size:1.5rem}:not(.initial) .icon{transition-duration:var(--mdui-motion-duration-short4);transition-timing-function:var(--mdui-motion-easing-standard)}.unchecked-icon{transition-property:color;color:rgb(var(--mdui-color-on-surface-variant))}:host([focused]) .unchecked-icon,:host([hover]) .unchecked-icon,:host([pressed]) .unchecked-icon{color:rgb(var(--mdui-color-on-surface))}.checked-icon{opacity:0;transform:scale(.2);transition-property:color,opacity,transform;color:rgb(var(--mdui-color-primary))}.icon .i,::slotted([slot=checked-icon]),::slotted([slot=unchecked-icon]){color:inherit;font-size:inherit}i{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:50%;width:2.5rem;min-width:2.5rem;height:2.5rem;--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}.label{display:flex;width:100%;padding-top:.625rem;padding-bottom:.625rem;color:rgb(var(--mdui-color-on-surface))}.label:not(.initial){transition:color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard)}:host([checked]) i{--mdui-comp-ripple-state-layer-color:var(--mdui-color-primary)}:host([checked]) .icon{color:rgb(var(--mdui-color-primary))}:host([checked]) .checked-icon{opacity:1;transform:scale(.5)}i.invalid{--mdui-comp-ripple-state-layer-color:var(--mdui-color-error)}i.invalid .icon{color:rgb(var(--mdui-color-error))}.label.invalid{color:rgb(var(--mdui-color-error))}:host([disabled]),:host([group-disabled]){cursor:default;pointer-events:none}:host([disabled]) .icon,:host([group-disabled]) .icon{color:rgba(var(--mdui-color-on-surface),38%)}:host([disabled]) .label,:host([group-disabled]) .label{color:rgba(var(--mdui-color-on-surface),38%)}`;/**
 * @summary 单选框组件。需与 `<mdui-radio-group>` 组件配合使用
 *
 * ```html
 * <mdui-radio-group value="chinese">
 * ..<mdui-radio value="chinese">Chinese</mdui-radio>
 * ..<mdui-radio value="english">English</mdui-radio>
 * </mdui-radio-group>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event change - 选中该单选项时触发
 *
 * @slot - 文本
 * @slot unchecked-icon - 未选中状态的图标
 * @slot checked-icon - 选中状态的图标
 *
 * @csspart control - 左侧图标容器
 * @csspart unchecked-icon 未选中状态的图标
 * @csspart checked-icon 选中状态的图标
 * @csspart label - 文本
 */let rb=class extends i4(iZ(t7)){constructor(){super(...arguments),/**
         * 当前单选项的值
         */this.value="",/**
         * 是否禁用当前单选项
         */this.disabled=!1,/**
         * 当前单选项是否已选中
         */this.checked=!1,// 是否验证未通过。由 <mdui-radio-group> 控制该参数
this.invalid=!1,// 父组件中是否设置了禁用。由 <mdui-radio-group> 控制该参数
this.groupDisabled=!1,// 是否可聚焦。
// 单独使用该组件时，默认可聚焦。
// 如果放在 <mdui-radio-group> 组件中使用，则由 <mdui-radio-group> 控制该参数
this.focusable=!0,// 是否是初始状态，不显示动画。由 <mdui-radio-group> 组件控制该参数
this.isInitial=!0,this.rippleRef=iF()}get rippleElement(){return this.rippleRef.value}get rippleDisabled(){return this.isDisabled()}get focusElement(){return this}get focusDisabled(){return this.isDisabled()||!this.focusable}onCheckedChange(){this.emit("change")}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",()=>{this.isDisabled()||(this.checked=!0)})}render(){let e=iQ({invalid:this.invalid,initial:this.isInitial});return tI`<i part="control" class="${e}"><mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple><slot name="unchecked-icon" part="unchecked-icon" class="icon unchecked-icon">${this.uncheckedIcon?tI`<mdui-icon name="${this.uncheckedIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-radio-button-unchecked class="i"></mdui-icon-radio-button-unchecked>`}</slot><slot name="checked-icon" part="checked-icon" class="icon checked-icon">${this.checkedIcon?tI`<mdui-icon name="${this.checkedIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-circle class="i"></mdui-icon-circle>`}</slot></i><slot part="label" class="label ${e}"></slot>`}isDisabled(){return this.disabled||this.groupDisabled}};rb.styles=[ie,rg],eq([tX({reflect:!0})],rb.prototype,"value",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rb.prototype,"disabled",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rb.prototype,"checked",void 0),eq([tX({reflect:!0,attribute:"unchecked-icon"})],rb.prototype,"uncheckedIcon",void 0),eq([tX({reflect:!0,attribute:"checked-icon"})],rb.prototype,"checkedIcon",void 0),eq([tJ()],rb.prototype,"invalid",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"group-disabled"})],rb.prototype,"groupDisabled",void 0),eq([tJ()],rb.prototype,"focusable",void 0),eq([tJ()],rb.prototype,"isInitial",void 0),eq([iD("checked",!0)],rb.prototype,"onCheckedChange",null),rb=eq([tW("mdui-radio")],rb);const ry=eZ`:host{display:inline-block}fieldset{border:none;padding:0;margin:0;min-width:0}input{position:absolute;padding:0;opacity:0;pointer-events:none;width:1.25rem;height:1.25rem;margin:0 0 0 .625rem}`;/**
 * @summary 单选框组组件。需与 `<mdui-radio>` 组件配合使用
 *
 * ```html
 * <mdui-radio-group value="chinese">
 * ..<mdui-radio value="chinese">Chinese</mdui-radio>
 * ..<mdui-radio value="english">English</mdui-radio>
 * </mdui-radio-group>
 * ```
 *
 * @event change - 选中值变化时触发
 * @event input - 选中值变化时触发
 * @event invalid - 表单字段验证未通过时触发
 *
 * @slot - `<mdui-radio>` 元素
 */let rw=class extends t7{constructor(){super(...arguments),/**
         * 是否为禁用状态
         */this.disabled=!1,/**
         * 单选框名称，将与表单数据一起提交
         */this.name="",/**
         * 单选框的值，将于表单数据一起提交
         */this.value="",/**
         * 默认选中的值。在重置表单时，将重置为该默认值。该属性只能通过 JavaScript 属性设置
         */this.defaultValue="",/**
         * 提交表单时，是否必须选中其中一个单选框
         */this.required=!1,/**
         * 是否验证未通过
         */this.invalid=!1,// 是否是初始状态，初始状态不显示动画
this.isInitial=!0,this.inputRef=iF(),this.formController=new iY(this),this.definedController=new iA(this,{relatedElements:["mdui-radio"]})}/**
     * 表单验证状态对象
     */get validity(){return this.inputRef.value.validity}/**
     * 表单验证的错误提示信息
     */get validationMessage(){return this.inputRef.value.validationMessage}// 为了使 <mdui-radio> 可以不是该组件的直接子元素，这里不用 @queryAssignedElements()
get items(){return z(this).find("mdui-radio").get()}get itemsEnabled(){return z(this).find("mdui-radio:not([disabled])").get()}async onValueChange(){this.isInitial=!1,await this.definedController.whenDefined(),this.emit("input"),this.emit("change"),this.updateItems(),this.updateRadioFocusable(),await this.updateComplete;// reset 引起的值变更，不执行验证；直接修改值引起的变更，需要进行验证
let e=this.formController.getForm();e&&iW.get(e)?.has(this)?(this.invalid=!1,iW.get(e).delete(this)):this.invalid=!this.inputRef.value.checkValidity()}async onInvalidChange(){await this.definedController.whenDefined(),this.updateItems()}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`
     */checkValidity(){let e=this.inputRef.value.checkValidity();return e||this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1}),e}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`。
     *
     * 验证未通过时，还将在组件上显示未通过的提示。
     */reportValidity(){if(this.invalid=!this.inputRef.value.reportValidity(),this.invalid){let e=this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1});e||(// 调用了 preventDefault() 时，隐藏默认的表单错误提示
this.inputRef.value.blur(),this.inputRef.value.focus())}return!this.invalid}/**
     * 设置自定义的错误提示文本。只要文本不为空，则表示字段验证未通过
     *
     * @param message 自定义的提示文本
     */setCustomValidity(e){this.inputRef.value.setCustomValidity(e),this.invalid=!this.inputRef.value.checkValidity()}render(){return tI`<fieldset><input ${iK(this.inputRef)} type="radio" class="input" name="${t0(this.name)}" value="${t0(this.value)}" .checked="${!!this.value}" .required="${this.required}" tabindex="-1" @keydown="${this.onKeyDown}"><slot @click="${this.onClick}" @keydown="${this.onKeyDown}" @slotchange="${this.onSlotChange}" @change="${this.onCheckedChange}"></slot></fieldset>`}// 更新 mdui-radio 的 checked 后，需要更新可聚焦状态
// 同一个 mdui-radio-group 中的多个 mdui-radio，仅有一个可聚焦
// 若有已选中的，则已选中的可聚焦；若没有已选中的，则第一个可聚焦
updateRadioFocusable(){let e=this.items,t=e.find(e=>e.checked);t?e.forEach(e=>{e.focusable=e===t}):this.itemsEnabled.forEach((e,t)=>{e.focusable=!t})}async onClick(e){await this.definedController.whenDefined();let t=e.target,i=t.closest("mdui-radio");i&&!i.disabled&&(this.value=i.value,await this.updateComplete,i.focus())}/**
     * 在内部的 `<mdui-radio>` 上按下按键时，在 `<mdui-radio>` 之间切换焦点
     */async onKeyDown(e){if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key))return;e.preventDefault(),await this.definedController.whenDefined();let t=this.itemsEnabled,i=t.find(e=>e.checked)??t[0],o=" "===e.key?0:["ArrowUp","ArrowLeft"].includes(e.key)?-1:1,r=t.indexOf(i)+o;r<0&&(r=t.length-1),r>t.length-1&&(r=0),this.value=t[r].value,await this.updateComplete,t[r].focus()}async onSlotChange(){await this.definedController.whenDefined(),this.updateItems(),this.updateRadioFocusable()}/**
     * slot 中的 mdui-radio 的 checked 变更时触发的事件
     */onCheckedChange(e){e.stopPropagation()}// 更新 <mdui-radio> 的状态
updateItems(){this.items.forEach(e=>{e.checked=e.value===this.value,e.invalid=this.invalid,e.groupDisabled=this.disabled,e.isInitial=this.isInitial})}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*rk(e,t){if(void 0!==e){let i=0;for(let o of e)yield t(o,i++)}}rw.styles=[ie,ry],eq([tX({type:Boolean,reflect:!0,converter:iS})],rw.prototype,"disabled",void 0),eq([tX({reflect:!0})],rw.prototype,"form",void 0),eq([tX({reflect:!0})],rw.prototype,"name",void 0),eq([tX({reflect:!0})],rw.prototype,"value",void 0),eq([or()],rw.prototype,"defaultValue",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rw.prototype,"required",void 0),eq([tJ()],rw.prototype,"invalid",void 0),eq([iD("value",!0)],rw.prototype,"onValueChange",null),eq([iD("invalid",!0),iD("disabled")],rw.prototype,"onInvalidChange",null),rw=eq([tW("mdui-radio-group")],rw);const rC=eZ`:host{position:relative;display:block;width:100%;-webkit-tap-highlight-color:transparent;height:2.5rem;padding:0 1.25rem}label{position:relative;display:block;width:100%;height:100%}input[type=range]{position:absolute;inset:0;z-index:4;height:100%;cursor:pointer;opacity:0;-webkit-appearance:none;appearance:none;width:calc(100% + 20rem * 2 / 16);margin:0 -1.25rem;padding:0 .75rem}:host([disabled]) input[type=range]{cursor:not-allowed}.track-active,.track-inactive{position:absolute;top:50%;height:.25rem;margin-top:-.125rem}.track-inactive{left:-.125rem;right:-.125rem;border-radius:var(--mdui-shape-corner-full);background-color:rgb(var(--mdui-color-surface-container-highest))}.invalid .track-inactive{background-color:rgba(var(--mdui-color-error),.12)}:host([disabled]) .track-inactive{background-color:rgba(var(--mdui-color-on-surface),.12)}.track-active{background-color:rgb(var(--mdui-color-primary))}.invalid .track-active{background-color:rgb(var(--mdui-color-error))}:host([disabled]) .track-active{background-color:rgba(var(--mdui-color-on-surface),.38)}.handle{position:absolute;top:50%;transform:translate(-50%);cursor:pointer;z-index:2;width:2.5rem;height:2.5rem;margin-top:-1.25rem;--mdui-comp-ripple-state-layer-color:var(--mdui-color-primary)}.invalid .handle{--mdui-comp-ripple-state-layer-color:var(--mdui-color-error)}.handle .elevation,.handle::before{position:absolute;display:block;content:' ';left:.625rem;top:.625rem;width:1.25rem;height:1.25rem;border-radius:var(--mdui-shape-corner-full)}.handle .elevation{background-color:rgb(var(--mdui-color-primary));box-shadow:var(--mdui-elevation-level1)}.invalid .handle .elevation{background-color:rgb(var(--mdui-color-error))}:host([disabled]) .handle .elevation{background-color:rgba(var(--mdui-color-on-surface),.38);box-shadow:var(--mdui-elevation-level0)}.handle::before{background-color:rgb(var(--mdui-color-background))}.handle mdui-ripple{border-radius:var(--mdui-shape-corner-full)}.label{position:absolute;left:50%;transform:translateX(-50%) scale(0);transform-origin:center bottom;display:flex;align-items:center;justify-content:center;cursor:default;white-space:nowrap;-webkit-user-select:none;user-select:none;pointer-events:none;transition:transform var(--mdui-motion-duration-short2) var(--mdui-motion-easing-standard);bottom:2.5rem;min-width:1.75rem;height:1.75rem;padding:.375rem .5rem;border-radius:var(--mdui-shape-corner-full);color:rgb(var(--mdui-color-on-primary));font-size:var(--mdui-typescale-label-medium-size);font-weight:var(--mdui-typescale-label-medium-weight);letter-spacing:var(--mdui-typescale-label-medium-tracking);line-height:var(--mdui-typescale-label-medium-line-height);background-color:rgb(var(--mdui-color-primary))}.invalid .label{color:rgb(var(--mdui-color-on-error));background-color:rgb(var(--mdui-color-error))}.label::after{content:' ';position:absolute;z-index:-1;transform:rotate(45deg);width:.875rem;height:.875rem;bottom:-.125rem;background-color:rgb(var(--mdui-color-primary))}.invalid .label::after{background-color:rgb(var(--mdui-color-error))}.label-visible{transform:translateX(-50%) scale(1);transition:transform var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard)}.tickmark{position:absolute;top:50%;transform:translate(-50%);width:.125rem;height:.125rem;margin-top:-.0625rem;border-radius:var(--mdui-shape-corner-full);background-color:rgba(var(--mdui-color-on-surface-variant),.38)}.invalid .tickmark{background-color:rgba(var(--mdui-color-error),.38)}.tickmark.active{background-color:rgba(var(--mdui-color-on-primary),.38)}.invalid .tickmark.active{background-color:rgba(var(--mdui-color-on-error),.38)}:host([disabled]) .tickmark{background-color:rgba(var(--mdui-color-on-surface),.38)}`;class rx extends i4(iZ(t7)){constructor(){super(...arguments),/**
         * 最小允许值，默认为 `0`
         */this.min=0,/**
         * 最大允许值，默认为 `100`
         */this.max=100,/**
         * 步进间隔，默认为 `1`
         */this.step=1,/**
         * 是否添加刻度标记
         */this.tickmarks=!1,/**
         * 是否不显示文本提示
         */this.nolabel=!1,/**
         * 是否禁用
         */this.disabled=!1,/**
         * 滑块名称，将与表单数据一起提交
         */this.name="",/**
         * 是否验证未通过
         *
         * 该验证为根据是否通过 `setCustomValidity` 方法设置了值，来判断是否验证通过
         */this.invalid=!1,// 按下时，label 可见
this.labelVisible=!1,this.inputRef=iF(),this.trackActiveRef=iF(),/**
         * 用于自定义标签的显示格式
         */this.labelFormatter=e=>e.toString()}/**
     * 表单验证状态对象
     */get validity(){return this.inputRef.value.validity}/**
     * 表单验证的错误提示信息
     */get validationMessage(){return this.inputRef.value.validationMessage}get rippleDisabled(){return this.disabled}get focusElement(){return this.inputRef.value}get focusDisabled(){return this.disabled}onDisabledChange(){this.invalid=!this.inputRef.value.checkValidity()}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`
     */checkValidity(){let e=this.inputRef.value.checkValidity();return e||this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1}),e}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`。
     *
     * 验证未通过时，还将在组件上显示未通过的提示。
     */reportValidity(){if(this.invalid=!this.inputRef.value.reportValidity(),this.invalid){// @ts-ignore
let e=this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1});e||(// 调用了 preventDefault() 时，隐藏默认的表单错误提示
this.blur(),this.focus())}return!this.invalid}/**
     * 设置自定义的错误提示文本。只要文本不为空，则表示字段验证未通过
     *
     * @param message 自定义的提示文本
     */setCustomValidity(e){this.inputRef.value.setCustomValidity(e),this.invalid=!this.inputRef.value.checkValidity()}/**
     * value 不在 min、max 或 step 的限制范围内时，修正 value 的值
     */fixValue(e){let{min:t,max:i,step:o}=this;// 确保 value 在 min 和 max 范围内
e=Math.min(Math.max(e,t),i);// 计算最接近 value 的 step 值
let r=Math.round((e-t)/o),n=t+r*o;return n>i&&(n-=o),n}/**
     * 获取候选值组成的数组
     */getCandidateValues(){return Array.from({length:this.max-this.min+1},(e,t)=>t+this.min).filter(e=>!((e-this.min)%this.step))}/**
     * 渲染浮动标签
     */renderLabel(e){return ok(!this.nolabel,()=>tI`<div part="label" class="label ${iQ({"label-visible":this.labelVisible})}">${this.labelFormatter(e)}</div>`)}onChange(){// @ts-ignore
this.emit("change")}}rx.styles=[ie,rC],eq([tX({type:Number,reflect:!0})],rx.prototype,"min",void 0),eq([tX({type:Number,reflect:!0})],rx.prototype,"max",void 0),eq([tX({type:Number,reflect:!0})],rx.prototype,"step",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rx.prototype,"tickmarks",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rx.prototype,"nolabel",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rx.prototype,"disabled",void 0),eq([tX({reflect:!0})],rx.prototype,"form",void 0),eq([tX({reflect:!0})],rx.prototype,"name",void 0),eq([tJ()],rx.prototype,"invalid",void 0),eq([tJ()],rx.prototype,"labelVisible",void 0),eq([tX({attribute:!1})],rx.prototype,"labelFormatter",void 0),eq([iD("disabled",!0)],rx.prototype,"onDisabledChange",null);/**
 * @summary 范围滑块组件
 *
 * ```html
 * <mdui-range-slider></mdui-range-slider>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event change - 在值发生了变更，且失去了焦点时，将触发该事件
 * @event input - 值变更时触发
 * @event invalid - 表单字段验证未通过时触发
 *
 * @csspart track-inactive - 未激活状态的轨道
 * @csspart track-active - 已激活状态的轨道
 * @csspart handle - 操作杆
 * @csspart label - 提示文本
 * @csspart tickmark - 刻度标记
 */let r$=class extends rx{constructor(){super(...arguments),/**
         * 默认值。在重置表单时，将重置为该默认值。该属性只能通过 JavaScript 属性设置
         */this.defaultValue=[],/**
         * 当前操作的是哪一个 handle
         */this.currentHandle="start",this.rippleStartRef=iF(),this.rippleEndRef=iF(),this.handleStartRef=iF(),this.handleEndRef=iF(),this.formController=new iY(this),this._value=[],this.getRippleIndex=()=>this.hoverHandle?"start"===this.hoverHandle?0:1:"start"===this.currentHandle?0:1}/**
     * 滑块的值，为数组格式；将于表单数据一起提交
     *
     * NOTE:
     * 该属性无法通过 HTML 属性设置初始值，如果要修改该值，只能通过修改 JavaScript 属性值实现。
     */get value(){return this._value}set value(e){let t=[...this._value];this._value=[this.fixValue(e[0]),this.fixValue(e[1])],this.requestUpdate("value",t),this.updateComplete.then(()=>{this.updateStyle();// reset 引起的值变更，不执行验证；直接修改值引起的变更，需要进行验证
let e=this.formController.getForm();e&&iW.get(e)?.has(this)?(this.invalid=!1,iW.get(e).delete(this)):this.invalid=!this.inputRef.value.checkValidity()})}get rippleElement(){return[this.rippleStartRef.value,this.rippleEndRef.value]}connectedCallback(){super.connectedCallback(),this.value.length||(this.value=[this.min,this.max]),this.value[0]=this.fixValue(this.value[0]),this.value[1]=this.fixValue(this.value[1]),this.defaultValue.length||(this.defaultValue=[...this.value])}firstUpdated(e){super.firstUpdated(e);// 在轨道上点击时，计算出点击位置在 <input type="range"> 元素上的值
// 若该值在 this.value 的两个值中间位置的左侧，则表示操作的是左侧的值，否则操作的是右侧的值
let t=e=>{let t=z(this),i=parseFloat(t.css("padding-left")),o=parseFloat(t.css("padding-right")),r=(e.offsetX-i)/(this.clientWidth-i-o),n=(this.max-this.min)*r+this.min,s=(this.value[1]-this.value[0])/2+this.value[0];return n>s?"end":"start"},i=()=>{this.disabled||(this.labelVisible=!0)},o=()=>{this.disabled||(this.labelVisible=!1)};this.addEventListener("touchstart",i),this.addEventListener("mousedown",i),this.addEventListener("touchend",o),this.addEventListener("mouseup",o),// 按下鼠标时，计算当前操作的是起始值还是结束值
this.addEventListener("pointerdown",e=>{this.currentHandle=t(e)}),// 移动鼠标时，修改 mdui-ripple 的 hover 状态
this.addEventListener("pointermove",e=>{let i=t(e);this.hoverHandle!==i&&(this.endHover(e),this.hoverHandle=i,this.startHover(e))}),this.updateStyle()}/**
     * <input /> 用于提供拖拽操作
     * <input class="invalid" /> 用于提供 html5 自带的表单错误提示
     */render(){return tI`<label class="${iQ({invalid:this.invalid})}"><input ${iK(this.inputRef)} type="range" step="${this.step}" min="${this.min}" max="${this.max}" ?disabled="${this.disabled}" @input="${this.onInput}" @change="${this.onChange}"><div part="track-inactive" class="track-inactive"></div><div ${iK(this.trackActiveRef)} part="track-active" class="track-active"></div><div ${iK(this.handleStartRef)} part="handle" class="handle start" style="${t8({"z-index":"start"===this.currentHandle?"2":"1"})}"><div class="elevation"></div><mdui-ripple ${iK(this.rippleStartRef)} .noRipple="${this.noRipple}"></mdui-ripple>${this.renderLabel(this.value[0])}</div><div ${iK(this.handleEndRef)} part="handle" class="handle end" style="${t8({"z-index":"end"===this.currentHandle?"2":"1"})}"><div class="elevation"></div><mdui-ripple ${iK(this.rippleEndRef)} .noRipple="${this.noRipple}"></mdui-ripple>${this.renderLabel(this.value[1])}</div>${ok(this.tickmarks,()=>rk(this.getCandidateValues(),e=>tI`<div part="tickmark" class="tickmark ${iQ({active:e>this.value[0]&&e<this.value[1]})}" style="${t8({left:`${(e-this.min)/this.max*100}%`,display:e===this.value[0]||e===this.value[1]?"none":"block"})}"></div>`))}</label>`}updateStyle(){let e=(this.value[0]-this.min)/(this.max-this.min)*100,t=(this.value[1]-this.min)/(this.max-this.min)*100;this.trackActiveRef.value.style.width=`${t-e}%`,this.trackActiveRef.value.style.left=`${e}%`,this.handleStartRef.value.style.left=`${e}%`,this.handleEndRef.value.style.left=`${t}%`}onInput(){let e="start"===this.currentHandle,t=parseFloat(this.inputRef.value.value),i=this.value[0],o=this.value[1],r=()=>{this.updateStyle()};e?t<=o?(this.value=[t,o],r()):i!==o&&(this.value=[o,o],r()):t>=i?(this.value=[i,t],r()):i!==o&&(this.value=[i,i],r())}};r$.styles=[rx.styles],eq([or()],r$.prototype,"defaultValue",void 0),eq([tJ()],r$.prototype,"currentHandle",void 0),eq([tX({type:Array,attribute:!1})],r$.prototype,"value",null),r$=eq([tW("mdui-range-slider")],r$);const rR=eZ`:host{position:relative;display:inline-flex;flex-grow:1;flex-shrink:0;float:left;height:100%;overflow:hidden;cursor:pointer;-webkit-tap-highlight-color:transparent;border:.0625rem solid rgb(var(--mdui-color-outline))}.button{width:100%;padding:0 .75rem}:host([invalid]){color:rgb(var(--mdui-color-error));border-color:rgb(var(--mdui-color-error))}:host([invalid]) .button{background-color:rgb(var(--mdui-color-error-container))}:host([selected]){color:rgb(var(--mdui-color-on-secondary-container));background-color:rgb(var(--mdui-color-secondary-container));--mdui-comp-ripple-state-layer-color:var(
      --mdui-color-on-secondary-container
    )}:host([disabled]),:host([group-disabled]){cursor:default;pointer-events:none;color:rgba(var(--mdui-color-on-surface),38%);border-color:rgba(var(--mdui-color-on-surface),12%)}:host([loading]){cursor:default;pointer-events:none}:host(:not(.mdui-segmented-button-first)){margin-left:-.0625rem}:host(.mdui-segmented-button-first){border-radius:var(--shape-corner) 0 0 var(--shape-corner)}:host(.mdui-segmented-button-last){border-radius:0 var(--shape-corner) var(--shape-corner) 0}.end-icon,.icon,.selected-icon{display:inline-flex;font-size:1.28571429em}.end-icon .i,.icon .i,.selected-icon .i,::slotted([slot=end-icon]),::slotted([slot=icon]),::slotted([slot=selected-icon]){font-size:inherit}mdui-circular-progress{width:1.125rem;height:1.125rem}:host([disabled]) mdui-circular-progress{opacity:.38}.label{display:inline-flex}.has-icon .label{padding-left:.5rem}.has-end-icon .label{padding-right:.5rem}`;/**
 * @summary 分段按钮项组件。需与 `<mdui-segmented-button-group>` 组件配合使用
 *
 * ```html
 * <mdui-segmented-button-group>
 * ..<mdui-segmented-button>Day</mdui-segmented-button>
 * ..<mdui-segmented-button>Week</mdui-segmented-button>
 * ..<mdui-segmented-button>Month</mdui-segmented-button>
 * </mdui-segmented-button-group>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event invalid - 表单字段验证未通过时触发
 *
 * @slot - 分段按钮项的文本
 * @slot icon - 分段按钮项的左侧图标
 * @slot selected-icon - 选中状态的左侧图标
 * @slot end-icon - 分段按钮项的右侧图标
 *
 * @csspart button - 内部的 button 或 a 元素
 * @csspart icon - 左侧的图标
 * @csspart selected-icon - 选中状态的左侧图标
 * @csspart end-icon - 右侧的图标
 * @csspart label - 文本内容
 * @csspart loading - 加载中状态的 `<mdui-circular-progress>` 元素
 */let rE=class extends i8{constructor(){super(...arguments),/**
         * 是否选中该分段按钮项，由 <mdui-segmented-button-group> 组件控制该参数
         */this.selected=!1,/**
         * 是否验证未通过。由 <mdui-segmented-button-group> 控制该参数
         */this.invalid=!1,// 父组件中是否设置了禁用。由 <mdui-segmented-button-group> 控制该参数
this.groupDisabled=!1,// 每一个 segmented-button 元素都添加一个唯一的 key
this.key=iM(),this.rippleRef=iF(),this.hasSlotController=new t6(this,"[default]","icon","end-icon")}get rippleElement(){return this.rippleRef.value}get rippleDisabled(){return this.isDisabled()||this.loading}get focusDisabled(){return this.isDisabled()||this.loading}render(){let e=iq({button:!0,"has-icon":this.icon||this.selected||this.loading||this.hasSlotController.test("icon"),"has-end-icon":this.endIcon||this.hasSlotController.test("end-icon")});return tI`<mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple>${this.isButton()?this.renderButton({className:e,part:"button",content:this.renderInner()}):this.isDisabled()||this.loading?tI`<span part="button" class="_a ${e}">${this.renderInner()}</span>`:this.renderAnchor({className:e,part:"button",content:this.renderInner()})}`}isDisabled(){return this.disabled||this.groupDisabled}renderIcon(){return this.loading?this.renderLoading():this.selected?tI`<slot name="selected-icon" part="selected-icon" class="selected-icon">${this.selectedIcon?tI`<mdui-icon name="${this.selectedIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-check class="i"></mdui-icon-check>`}</slot>`:tI`<slot name="icon" part="icon" class="icon">${this.icon?tI`<mdui-icon name="${this.icon}" class="i"></mdui-icon>`:t9}</slot>`}renderLabel(){let e=this.hasSlotController.test("[default]");return e?tI`<slot part="label" class="label"></slot>`:t9}renderEndIcon(){return tI`<slot name="end-icon" part="end-icon" class="end-icon">${this.endIcon?tI`<mdui-icon name="${this.endIcon}" class="i"></mdui-icon>`:t9}</slot>`}renderInner(){return[this.renderIcon(),this.renderLabel(),this.renderEndIcon()]}};rE.styles=[i8.styles,rR],eq([tX({reflect:!0})],rE.prototype,"icon",void 0),eq([tX({reflect:!0,attribute:"end-icon"})],rE.prototype,"endIcon",void 0),eq([tX({reflect:!0,attribute:"selected-icon"})],rE.prototype,"selectedIcon",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rE.prototype,"selected",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rE.prototype,"invalid",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"group-disabled"})],rE.prototype,"groupDisabled",void 0),rE=eq([tW("mdui-segmented-button")],rE);const rI=eZ`:host{--shape-corner:var(--mdui-shape-corner-full);position:relative;display:inline-flex;vertical-align:middle;height:2.5rem;font-size:var(--mdui-typescale-label-large-size);font-weight:var(--mdui-typescale-label-large-weight);letter-spacing:var(--mdui-typescale-label-large-tracking);line-height:var(--mdui-typescale-label-large-line-height);color:rgb(var(--mdui-color-on-surface));--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}:host([full-width]){display:flex;flex-wrap:nowrap}input,select{position:absolute;width:100%;height:100%;padding:0;opacity:0;pointer-events:none}`;/**
 * @summary 分段按钮组件。需与 `<mdui-segmented-button>` 组件配合使用
 *
 * ```html
 * <mdui-segmented-button-group>
 * ..<mdui-segmented-button>Day</mdui-segmented-button>
 * ..<mdui-segmented-button>Week</mdui-segmented-button>
 * ..<mdui-segmented-button>Month</mdui-segmented-button>
 * </mdui-segmented-button-group>
 * ```
 *
 * @event change - 选中的值变更时触发
 * @event invalid - 表单字段验证未通过时触发
 *
 * @slot - `<mdui-segmented-button>` 组件
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let rS=class extends t7{constructor(){super(...arguments),/**
         * 是否填满父元素宽度
         */this.fullWidth=!1,/**
         * 是否为禁用状态
         */this.disabled=!1,/**
         * 提交表单时，是否必须选中
         */this.required=!1,/**
         * 提交表单时的名称，将与表单数据一起提交
         */this.name="",/**
         * 当前选中的 `<mdui-segmented-button>` 的值
         *
         * Note:
         * 该属性的 HTML 属性始终为字符串，且仅在 `selects="single"` 时可以通过 HTML 属性设置初始值
         * 该属性的 JavaScript 属性值在 `selects="single"` 时为字符串，在 `selects="multiple"` 时为字符串数组。
         * 所以，在 `selects="multiple"` 时，如果要修改该值，只能通过修改 JavaScript 属性值实现。
         */this.value="",/**
         * 默认选中的值。在重置表单时，将重置为该默认值。该属性只能通过 JavaScript 属性设置
         */this.defaultValue="",// 因为 segmented-button 的 value 可能会重复，所以在每个 segmented-button 元素上都加了一个唯一的 key 属性，通过 selectedKeys 来记录选中状态的 key
this.selectedKeys=[],/**
         * 是否验证未通过
         */this.invalid=!1,// 是否为初始状态，初始状态不触发 change 事件
this.isInitial=!0,this.inputRef=iF(),this.formController=new iY(this),this.definedController=new iA(this,{relatedElements:["mdui-segmented-button"]})}/**
     * 表单验证状态对象
     */get validity(){return this.inputRef.value.validity}/**
     * 表单验证的错误提示信息
     */get validationMessage(){return this.inputRef.value.validationMessage}// 为了使 <mdui-segmented-button> 可以不是该组件的直接子元素，这里不用 @queryAssignedElements()
get items(){return z(this).find("mdui-segmented-button").get()}// 所有的子项元素（不包含已禁用的）
get itemsEnabled(){return z(this).find("mdui-segmented-button:not([disabled])").get()}// 是否为单选
get isSingle(){return"single"===this.selects}// 是否为多选
get isMultiple(){return"multiple"===this.selects}// 是否可选择
get isSelectable(){return this.isSingle||this.isMultiple}async onSelectsChange(){this.isSelectable?this.isSingle&&this.setSelectedKeys(this.selectedKeys.slice(0,1)):this.setSelectedKeys([]),await this.onSelectedKeysChange()}async onSelectedKeysChange(){await this.definedController.whenDefined();// 根据 selectedKeys 读取出对应 segmented-button 的 value
let e=this.itemsEnabled.filter(e=>this.selectedKeys.includes(e.key)).map(e=>e.value),t=this.isMultiple?e:e[0]||"";this.setValue(t),this.isInitial||this.emit("change")}async onValueChange(){// 根据 value 找出对应的 segmented-button，并把这些元素的 key 赋值给 selectedKeys
if(this.isInitial=!this.hasUpdated,await this.definedController.whenDefined(),!this.isSelectable){this.updateItems();return}let e=(this.isSingle?[this.value]:m(this.value)?[this.value]:this.value).filter(e=>e);if(e.length){if(this.isSingle){let t=this.itemsEnabled.find(t=>t.value===e[0]);this.setSelectedKeys(t?[t.key]:[])}else this.isMultiple&&this.setSelectedKeys(this.itemsEnabled.filter(t=>e.includes(t.value)).map(e=>e.key))}else this.setSelectedKeys([]);// reset 引起的值变更，不执行验证；直接修改值引起的变更，需要进行验证
if(this.updateItems(),!this.isInitial){let e=this.formController.getForm();e&&iW.get(e)?.has(this)?(this.invalid=!1,iW.get(e).delete(this)):this.invalid=!this.inputRef.value.checkValidity()}}async onInvalidChange(){await this.definedController.whenDefined(),this.updateItems()}connectedCallback(){super.connectedCallback(),this.value=this.isMultiple&&m(this.value)?this.value?[this.value]:[]:this.value,this.defaultValue="multiple"===this.selects?[]:""}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`
     */checkValidity(){let e=this.inputRef.value.checkValidity();return e||this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1}),e}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`。
     *
     * 验证未通过时，还将在组件上显示未通过的提示。
     */reportValidity(){if(this.invalid=!this.inputRef.value.reportValidity(),this.invalid){let e=this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1});e||(// 调用了 preventDefault() 时，隐藏默认的表单错误提示
this.inputRef.value.blur(),this.inputRef.value.focus())}return!this.invalid}/**
     * 设置自定义的错误提示文本。只要文本不为空，则表示字段验证未通过
     *
     * @param message 自定义的提示文本
     */setCustomValidity(e){this.inputRef.value.setCustomValidity(e),this.invalid=!this.inputRef.value.checkValidity()}render(){return tI`${ok(this.isSelectable&&this.isSingle,()=>tI`<input ${iK(this.inputRef)} type="radio" name="${t0(this.name)}" value="1" .disabled="${this.disabled}" .required="${this.required}" .checked="${!!this.value}" tabindex="-1" @keydown="${this.onInputKeyDown}">`)}${ok(this.isSelectable&&this.isMultiple,()=>tI`<select ${iK(this.inputRef)} name="${t0(this.name)}" .disabled="${this.disabled}" .required="${this.required}" multiple="multiple" tabindex="-1" @keydown="${this.onInputKeyDown}">${rk(this.value,e=>tI`<option selected="selected" value="${e}"></option>`)}</select>`)}<slot @slotchange="${this.onSlotChange}" @click="${this.onClick}"></slot>`}// 切换一个元素的选中状态
selectOne(e){if(this.isMultiple){// 直接修改 this.selectedKeys 无法被 watch 监听到，需要先克隆一份 this.selectedKeys
let t=[...this.selectedKeys];t.includes(e.key)?t.splice(t.indexOf(e.key),1):t.push(e.key),this.setSelectedKeys(t)}this.isSingle&&(this.selectedKeys.includes(e.key)?this.setSelectedKeys([]):this.setSelectedKeys([e.key])),this.isInitial=!1,this.updateItems()}async onClick(e){// event.button 为 0 时，为鼠标左键点击。忽略鼠标中间和右键
if(e.button)return;await this.definedController.whenDefined();let t=e.target,i=t.closest("mdui-segmented-button");i&&!i.disabled&&this.isSelectable&&i.value&&this.selectOne(i)}/**
     * 在隐藏的 `<input>` 或 `<select>` 上按下按键时，切换选中状态
     * 通常为验证不通过时，默认聚焦到 `<input>` 或 `<select>` 上，此时按下按键，切换第一个元素的选中状态
     */async onInputKeyDown(e){if(["Enter"," "].includes(e.key)){if(e.preventDefault(),await this.definedController.whenDefined(),this.isSingle){let t=e.target;t.checked=!t.checked,this.selectOne(this.itemsEnabled[0]),this.itemsEnabled[0].focus()}this.isMultiple&&(this.selectOne(this.itemsEnabled[0]),this.itemsEnabled[0].focus())}}async onSlotChange(){await this.definedController.whenDefined(),this.updateItems(!0)}setSelectedKeys(e){ov(this.selectedKeys,e)||(this.selectedKeys=e)}setValue(e){this.isSingle?this.value=e:ov(this.value,e)||(this.value=e)}updateItems(e=!1){let t=this.items;t.forEach((i,o)=>{i.invalid=this.invalid,i.groupDisabled=this.disabled,i.selected=this.selectedKeys.includes(i.key),e&&(i.classList.toggle("mdui-segmented-button-first",0===o),i.classList.toggle("mdui-segmented-button-last",o===t.length-1))})}};rS.styles=[ie,rI],eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"full-width"})],rS.prototype,"fullWidth",void 0),eq([tX({reflect:!0})],rS.prototype,"selects",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rS.prototype,"disabled",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rS.prototype,"required",void 0),eq([tX({reflect:!0})],rS.prototype,"form",void 0),eq([tX({reflect:!0})],rS.prototype,"name",void 0),eq([tX()],rS.prototype,"value",void 0),eq([or()],rS.prototype,"defaultValue",void 0),eq([tJ()],rS.prototype,"selectedKeys",void 0),eq([tJ()],rS.prototype,"invalid",void 0),eq([iD("selects",!0)],rS.prototype,"onSelectsChange",null),eq([iD("selectedKeys",!0)],rS.prototype,"onSelectedKeysChange",null),eq([iD("value")],rS.prototype,"onValueChange",null),eq([iD("invalid",!0),iD("disabled")],rS.prototype,"onInvalidChange",null),rS=eq([tW("mdui-segmented-button-group")],rS);const rA=new WeakMap;let rD=0;const rP=new Map,rT=new WeakSet,rM=()=>new Promise(e=>requestAnimationFrame(e)),r_=(e,t)=>{let i=e-t;return 0===i?void 0:i},rL=(e,t)=>{let i=e/t;return 1===i?void 0:i},rO={left:(e,t)=>{let i=r_(e,t);return{value:i,transform:null==i||isNaN(i)?void 0:`translateX(${i}px)`}},top:(e,t)=>{let i=r_(e,t);return{value:i,transform:null==i||isNaN(i)?void 0:`translateY(${i}px)`}},width:(e,t)=>{let i;0===t&&(t=1,i={width:"1px"});let o=rL(e,t);return{value:o,overrideFrom:i,transform:null==o||isNaN(o)?void 0:`scaleX(${o})`}},height:(e,t)=>{let i;0===t&&(t=1,i={height:"1px"});let o=rL(e,t);return{value:o,overrideFrom:i,transform:null==o||isNaN(o)?void 0:`scaleY(${o})`}}},rz={duration:333,easing:"ease-in-out"},rB=["left","top","width","height","opacity","color","background"],rV=new WeakMap,rN=t2(class extends ig{constructor(e){if(super(e),this.t=null,this.i=null,this.o=!0,this.shouldLog=!1,e.type===t1.CHILD)throw Error("The `animate` directive must be used in attribute position.");this.createFinished()}createFinished(){this.resolveFinished?.(),this.finished=new Promise(e=>{this.h=e})}async resolveFinished(){this.h?.(),this.h=void 0}render(e){return tA}getController(){return rA.get(this.l)}isDisabled(){return this.options.disabled||this.getController()?.disabled}update(e,[t]){let i=void 0===this.l;return i&&(this.l=e.options?.host,this.l.addController(this),this.element=e.element,rV.set(this.element,this)),this.optionsOrCallback=t,(i||"function"!=typeof t)&&this.u(t),this.render(t)}u(e){e=e??{};let t=this.getController();void 0!==t&&((e={...t.defaultOptions,...e}).keyframeOptions={...t.defaultOptions.keyframeOptions,...e.keyframeOptions}),e.properties??=rB,this.options=e}p(){let e={},t=this.element.getBoundingClientRect(),i=getComputedStyle(this.element);return this.options.properties.forEach(o=>{let r=t[o]??(rO[o]?void 0:i[o]),n=Number(r);e[o]=isNaN(n)?r+"":n}),e}m(){let e,t=!0;return this.options.guard&&(t=((e,t)=>{if(Array.isArray(e)){if(Array.isArray(t)&&t.length===e.length&&e.every((e,i)=>e===t[i]))return!1}else if(t===e)return!1;return!0})(e=this.options.guard(),this.v)),this.o=this.l.hasUpdated&&!this.isDisabled()&&!this.isAnimating()&&t&&this.element.isConnected,this.o&&(this.v=Array.isArray(e)?Array.from(e):e),this.o}hostUpdate(){"function"==typeof this.optionsOrCallback&&this.u(this.optionsOrCallback()),this.m()&&(this.g=this.p(),this.t=this.t??this.element.parentNode,this.i=this.element.nextSibling)}async hostUpdated(){let e;if(!this.o||!this.element.isConnected||this.options.skipInitial&&!this.isHostRendered)return;this.prepare(),await rM;let t=this._(),i=this.A(this.options.keyframeOptions,t),o=this.p();if(void 0!==this.g){let{from:i,to:r}=this.O(this.g,o,t);this.log("measured",[this.g,o,i,r]),e=this.calculateKeyframes(i,r)}else{let i=rP.get(this.options.inId);if(i){rP.delete(this.options.inId);let{from:r,to:n}=this.O(i,o,t);e=this.calculateKeyframes(r,n),e=this.options.in?[{...this.options.in[0],...e[0]},...this.options.in.slice(1),e[1]]:e,rD++,e.forEach(e=>e.zIndex=rD)}else this.options.in&&(e=[...this.options.in,{}])}this.animate(e,i)}resetStyles(){void 0!==this.j&&(this.element.setAttribute("style",this.j??""),this.j=void 0)}commitStyles(){this.j=this.element.getAttribute("style"),this.webAnimation?.commitStyles(),this.webAnimation?.cancel()}reconnected(){}async disconnected(){if(!this.o||(void 0!==this.options.id&&rP.set(this.options.id,this.g),void 0===this.options.out))return;if(this.prepare(),await rM(),this.t?.isConnected){let e=this.i&&this.i.parentNode===this.t?this.i:null;if(this.t.insertBefore(this.element,e),this.options.stabilizeOut){let e=this.p();this.log("stabilizing out");let t=this.g.left-e.left,i=this.g.top-e.top;"static"!==getComputedStyle(this.element).position||0===t&&0===i||(this.element.style.position="relative"),0!==t&&(this.element.style.left=t+"px"),0!==i&&(this.element.style.top=i+"px")}}let e=this.A(this.options.keyframeOptions);await this.animate(this.options.out,e),this.element.remove()}prepare(){this.createFinished()}start(){this.options.onStart?.(this)}didFinish(e){e&&this.options.onComplete?.(this),this.g=void 0,this.animatingProperties=void 0,this.frames=void 0,this.resolveFinished()}_(){let e=[];for(let t=this.element.parentNode;t;t=t?.parentNode){let i=rV.get(t);i&&!i.isDisabled()&&i&&e.push(i)}return e}get isHostRendered(){let e=rT.has(this.l);return e||this.l.updateComplete.then(()=>{rT.add(this.l)}),e}A(e,t=this._()){let i={...rz};return t.forEach(e=>Object.assign(i,e.options.keyframeOptions)),Object.assign(i,e),i}O(e,t,i){e={...e},t={...t};let o=i.map(e=>e.animatingProperties).filter(e=>void 0!==e),r=1,n=1;return void 0!==o&&(o.forEach(e=>{e.width&&(r/=e.width),e.height&&(n/=e.height)}),void 0!==e.left&&void 0!==t.left&&(e.left=r*e.left,t.left=r*t.left),void 0!==e.top&&void 0!==t.top&&(e.top=n*e.top,t.top=n*t.top)),{from:e,to:t}}calculateKeyframes(e,t,i=!1){let o={},r={},n=!1,s={};for(let i in t){let a=e[i],l=t[i];if(i in rO){let e=rO[i];if(void 0===a||void 0===l)continue;let t=e(a,l);void 0!==t.transform&&(s[i]=t.value,n=!0,o.transform=`${o.transform??""} ${t.transform}`,void 0!==t.overrideFrom&&Object.assign(o,t.overrideFrom))}else a!==l&&void 0!==a&&void 0!==l&&(n=!0,o[i]=a,r[i]=l)}return o.transformOrigin=r.transformOrigin=i?"center center":"top left",this.animatingProperties=s,n?[o,r]:void 0}async animate(e,t=this.options.keyframeOptions){this.start(),this.frames=e;let i=!1;if(!this.isAnimating()&&!this.isDisabled()&&(this.options.onFrames&&(this.frames=e=this.options.onFrames(this),this.log("modified frames",e)),void 0!==e)){this.log("animate",[e,t]),i=!0,this.webAnimation=this.element.animate(e,t);let o=this.getController();o?.add(this);try{await this.webAnimation.finished}catch(e){}o?.remove(this)}return this.didFinish(i),i}isAnimating(){return"running"===this.webAnimation?.playState||this.webAnimation?.pending}log(e,t){this.shouldLog&&!this.isDisabled()&&console.log(e,this.options.id,t)}}),rF=["top","right","bottom","left"];t2(class extends ig{constructor(e){if(super(e),e.type!==t1.ELEMENT)throw Error("The `position` directive must be used in attribute position.")}render(e,t){return tA}update(e,[t,i]){return void 0===this.l&&(this.l=e.options?.host,this.l.addController(this)),this.N=e.element,this.P=t,this.S=i??["left","top","width","height"],this.render(t,i)}hostUpdated(){this.C()}C(){let e="function"==typeof this.P?this.P():this.P?.value,t=e.offsetParent;if(void 0===e||!t)return;let i=e.getBoundingClientRect(),o=t.getBoundingClientRect();this.S?.forEach(e=>{let t=rF.includes(e)?i[e]-o[e]:i[e];this.N.style[e]=t+"px"})}});let rH=class extends tq{render(){return os('<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/>')}};rH.styles=on,rH=eq([tW("mdui-icon-cancel--outlined")],rH);let rU=class extends tq{render(){return os('<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>')}};rU.styles=on,rU=eq([tW("mdui-icon-error")],rU);let rK=class extends tq{render(){return os('<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>')}};rK.styles=on,rK=eq([tW("mdui-icon-visibility-off")],rK);let rq=class extends tq{render(){return os('<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>')}};rq.styles=on,rq=eq([tW("mdui-icon-visibility")],rq);const rj=eZ`:host{display:inline-block;width:100%}:host([disabled]){pointer-events:none}:host([type=hidden]){display:none}.container{position:relative;display:flex;align-items:center;transition:box-shadow var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard);padding:0 1rem}.container.has-icon{padding-left:.75rem}.container.has-end-icon,.container.has-error-icon{padding-right:.75rem}:host([variant=filled]) .container{box-shadow:inset 0 -.0625rem 0 0 rgb(var(--mdui-color-on-surface-variant));background-color:rgb(var(--mdui-color-surface-container-highest));border-radius:var(--mdui-shape-corner-extra-small) var(--mdui-shape-corner-extra-small) 0 0}:host([variant=filled]) .container.invalid,:host([variant=filled]) .container.invalid-style{box-shadow:inset 0 -.0625rem 0 0 rgb(var(--mdui-color-error))}:host([variant=filled]:hover) .container{box-shadow:inset 0 -.0625rem 0 0 rgb(var(--mdui-color-on-surface))}:host([variant=filled]:hover) .container.invalid,:host([variant=filled]:hover) .container.invalid-style{box-shadow:inset 0 -.0625rem 0 0 rgb(var(--mdui-color-on-error-container))}:host([variant=filled][focused-style]) .container,:host([variant=filled][focused]) .container{box-shadow:inset 0 -.125rem 0 0 rgb(var(--mdui-color-primary))}:host([variant=filled][focused-style]) .container.invalid,:host([variant=filled][focused-style]) .container.invalid-style,:host([variant=filled][focused]) .container.invalid,:host([variant=filled][focused]) .container.invalid-style{box-shadow:inset 0 -.125rem 0 0 rgb(var(--mdui-color-error))}:host([variant=filled][disabled]) .container{box-shadow:inset 0 -.0625rem 0 0 rgba(var(--mdui-color-on-surface),38%);background-color:rgba(var(--mdui-color-on-surface),4%)}:host([variant=outlined]) .container{box-shadow:inset 0 0 0 .0625rem rgb(var(--mdui-color-outline));border-radius:var(--mdui-shape-corner-extra-small)}:host([variant=outlined]) .container.invalid,:host([variant=outlined]) .container.invalid-style{box-shadow:inset 0 0 0 .0625rem rgb(var(--mdui-color-error))}:host([variant=outlined]:hover) .container{box-shadow:inset 0 0 0 .0625rem rgb(var(--mdui-color-on-surface))}:host([variant=outlined]:hover) .container.invalid,:host([variant=outlined]:hover) .container.invalid-style{box-shadow:inset 0 0 0 .0625rem rgb(var(--mdui-color-on-error-container))}:host([variant=outlined][focused-style]) .container,:host([variant=outlined][focused]) .container{box-shadow:inset 0 0 0 .125rem rgb(var(--mdui-color-primary))}:host([variant=outlined][focused-style]) .container.invalid,:host([variant=outlined][focused-style]) .container.invalid-style,:host([variant=outlined][focused]) .container.invalid,:host([variant=outlined][focused]) .container.invalid-style{box-shadow:inset 0 0 0 .125rem rgb(var(--mdui-color-error))}:host([variant=outlined][disabled]) .container{box-shadow:inset 0 0 0 .125rem rgba(var(--mdui-color-on-surface),12%)}.icon,.prefix,.right-icon,.suffix{display:flex;-webkit-user-select:none;user-select:none;color:rgb(var(--mdui-color-on-surface-variant))}:host([disabled]) .icon,:host([disabled]) .prefix,:host([disabled]) .right-icon,:host([disabled]) .suffix{color:rgba(var(--mdui-color-on-surface),38%)}.invalid .right-icon,.invalid .suffix,.invalid-style .right-icon,.invalid-style .suffix{color:rgb(var(--mdui-color-error))}:host(:hover) .invalid .right-icon,:host(:hover) .invalid .suffix,:host(:hover) .invalid-style .right-icon,:host(:hover) .invalid-style .suffix{color:rgb(var(--mdui-color-on-error-container))}:host([focused-style]) .invalid .right-icon,:host([focused-style]) .invalid .suffix,:host([focused-style]) .invalid-style .right-icon,:host([focused-style]) .invalid-style .suffix,:host([focused]) .invalid .right-icon,:host([focused]) .invalid .suffix,:host([focused]) .invalid-style .right-icon,:host([focused]) .invalid-style .suffix{color:rgb(var(--mdui-color-error))}.icon,.right-icon{font-size:1.5rem}.icon mdui-button-icon,.right-icon mdui-button-icon,::slotted(mdui-button-icon[slot]){margin-left:-.5rem;margin-right:-.5rem}.icon .i,.right-icon .i,::slotted([slot$=icon]){font-size:inherit}.has-icon .icon{margin-right:1rem}.has-end-icon .end-icon,.right-icon:not(.end-icon){margin-left:1rem}.prefix,.suffix{display:none;font-size:var(--mdui-typescale-body-large-size);font-weight:var(--mdui-typescale-body-large-weight);letter-spacing:var(--mdui-typescale-body-large-tracking);line-height:var(--mdui-typescale-body-large-line-height)}:host([variant=filled][label]) .prefix,:host([variant=filled][label]) .suffix{padding-top:1rem}.has-value .prefix,.has-value .suffix,:host([focused-style]) .prefix,:host([focused-style]) .suffix,:host([focused]) .prefix,:host([focused]) .suffix{display:flex}.prefix{padding-right:.125rem}.suffix{padding-left:.125rem}.input-container{width:100%}.label{position:absolute;pointer-events:none;max-width:calc(100% - 1rem);display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:1;top:1rem;color:rgb(var(--mdui-color-on-surface-variant));font-size:var(--mdui-typescale-body-large-size);font-weight:var(--mdui-typescale-body-large-weight);letter-spacing:var(--mdui-typescale-body-large-tracking);line-height:var(--mdui-typescale-body-large-line-height)}.invalid .label,.invalid-style .label{color:rgb(var(--mdui-color-error))}:host([variant=outlined]) .label{padding:0 .25rem;margin:0 -.25rem}:host([variant=outlined]:hover) .label{color:rgb(var(--mdui-color-on-surface))}:host([variant=filled]:hover) .invalid .label,:host([variant=filled]:hover) .invalid-style .label,:host([variant=outlined]:hover) .invalid .label,:host([variant=outlined]:hover) .invalid-style .label{color:rgb(var(--mdui-color-on-error-container))}:host([variant=filled][focused-style]) .label,:host([variant=filled][focused]) .label,:host([variant=outlined][focused-style]) .label,:host([variant=outlined][focused]) .label{color:rgb(var(--mdui-color-primary))}:host([variant=filled]) .has-value .label,:host([variant=filled][focused-style]) .label,:host([variant=filled][focused]) .label,:host([variant=filled][type=date]) .label,:host([variant=filled][type=datetime-local]) .label,:host([variant=filled][type=month]) .label,:host([variant=filled][type=time]) .label,:host([variant=filled][type=week]) .label{font-size:var(--mdui-typescale-body-small-size);font-weight:var(--mdui-typescale-body-small-weight);letter-spacing:var(--mdui-typescale-body-small-tracking);line-height:var(--mdui-typescale-body-small-line-height);top:.25rem}:host([variant=outlined]) .has-value .label,:host([variant=outlined][focused-style]) .label,:host([variant=outlined][focused]) .label,:host([variant=outlined][type=date]) .label,:host([variant=outlined][type=datetime-local]) .label,:host([variant=outlined][type=month]) .label,:host([variant=outlined][type=time]) .label,:host([variant=outlined][type=week]) .label{font-size:var(--mdui-typescale-body-small-size);font-weight:var(--mdui-typescale-body-small-weight);letter-spacing:var(--mdui-typescale-body-small-tracking);line-height:var(--mdui-typescale-body-small-line-height);top:-.5rem;left:.75rem;background-color:rgb(var(--mdui-color-background))}:host([variant=filled][focused-style]) .invalid .label,:host([variant=filled][focused-style]) .invalid-style .label,:host([variant=filled][focused]) .invalid .label,:host([variant=filled][focused]) .invalid-style .label,:host([variant=outlined][focused-style]) .invalid .label,:host([variant=outlined][focused-style]) .invalid-style .label,:host([variant=outlined][focused]) .invalid .label,:host([variant=outlined][focused]) .invalid-style .label{color:rgb(var(--mdui-color-error))}:host([variant=filled][disabled]) .label,:host([variant=outlined][disabled]) .label{color:rgba(var(--mdui-color-on-surface),38%)}.input{display:flex;flex-wrap:wrap;width:100%;border:none;outline:0;background:0 0;-webkit-appearance:none;appearance:none;resize:none;cursor:inherit;font-family:inherit;padding:1rem 0;font-size:var(--mdui-typescale-body-large-size);font-weight:var(--mdui-typescale-body-large-weight);letter-spacing:var(--mdui-typescale-body-large-tracking);line-height:var(--mdui-typescale-body-large-line-height);color:rgb(var(--mdui-color-on-surface));caret-color:rgb(var(--mdui-color-primary))}.input.hide-input{opacity:0;height:0;padding:0!important;overflow:hidden}.input::placeholder{color:rgb(var(--mdui-color-on-surface-variant))}.invalid .input,.invalid-style .input{caret-color:rgb(var(--mdui-color-error))}:host([disabled]) .input{color:rgba(var(--mdui-color-on-surface),38%)}:host([end-aligned]) .input{text-align:right}:host([variant=filled]) .label+.input{padding:1.5rem 0 .5rem 0}.supporting{display:flex;justify-content:space-between;padding:.25rem 1rem;color:rgb(var(--mdui-color-on-surface-variant))}.supporting.invalid,.supporting.invalid-style{color:rgb(var(--mdui-color-error))}.helper{display:block;opacity:1;transition:opacity var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear);font-size:var(--mdui-typescale-body-small-size);font-weight:var(--mdui-typescale-body-small-weight);letter-spacing:var(--mdui-typescale-body-small-tracking);line-height:var(--mdui-typescale-body-small-line-height)}:host([disabled]) .helper{color:rgba(var(--mdui-color-on-surface),38%)}:host([helper-on-focus]) .helper{opacity:0}:host([helper-on-focus][focused-style]) .helper,:host([helper-on-focus][focused]) .helper{opacity:1}.error{font-size:var(--mdui-typescale-body-small-size);font-weight:var(--mdui-typescale-body-small-weight);letter-spacing:var(--mdui-typescale-body-small-tracking);line-height:var(--mdui-typescale-body-small-line-height)}.counter{flex-wrap:nowrap;padding-left:1rem;font-size:var(--mdui-typescale-body-small-size);font-weight:var(--mdui-typescale-body-small-weight);letter-spacing:var(--mdui-typescale-body-small-tracking);line-height:var(--mdui-typescale-body-small-line-height)}::-ms-reveal{display:none}.is-firefox .input[type=date],.is-firefox .input[type=datetime-local],.is-firefox .input[type=time]{-webkit-clip-path:inset(0 2em 0 0);clip-path:inset(0 2em 0 0)}.input[type=number]::-webkit-inner-spin-button,.input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;display:none}.input[type=number]{-moz-appearance:textfield}.input[type=search]::-webkit-search-cancel-button{-webkit-appearance:none}`;/**
 * @summary 文本框组件
 *
 * ```html
 * <mdui-text-field label="Text Field"></mdui-text-field>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event change - 在文本框的值变更，且失去焦点时触发
 * @event input - 在文本框的值变更时触发
 * @event invalid - 表单字段验证不通过时触发
 * @event clear - 在点击由 `clearable` 属性生成的清空按钮时触发。可以通过调用 `event.preventDefault()` 阻止清空文本框
 *
 * @slot icon - 左侧图标
 * @slot end-icon - 右侧图标
 * @slot error-icon - 验证失败状态的右侧图标
 * @slot prefix - 左侧文本
 * @slot suffix - 右侧文本
 * @slot clear-button - 清空按钮
 * @slot clear-icon - 清空按钮中的图标
 * @slot toggle-password-button - 显示密码状态下，密码显示切换按钮中的图标
 * @slot show-password-icon - 显示密码状态下，密码显示切换按钮中的图标
 * @slot hide-password-icon - 隐藏密码状态下，密码显示切换按钮中的图标
 * @slot helper - 底部的帮助文本
 *
 * @csspart container - 文本框容器
 * @csspart icon - 左侧图标
 * @csspart end-icon - 右侧图标
 * @csspart error-icon - 验证失败状态的右侧图标
 * @csspart prefix - 左侧文本
 * @csspart suffix - 右侧文本
 * @csspart label - 上方的标签文本
 * @csspart input - 内部的 `<input>` 或 `<textarea>` 元素
 * @csspart clear-button - 清空按钮
 * @csspart clear-icon - 清空按钮中的图标
 * @csspart toggle-password-button - 密码显示切换按钮
 * @csspart show-password-icon - 显示密码状态下，密码显示切换按钮中的图标
 * @csspart hide-password-icon - 隐藏密码状态下，密码显示切换按钮中的图标
 * @csspart supporting - 底部辅助信息容器，包括 helper、error、counter
 * @csspart helper - 底部的帮助文本
 * @csspart error - 底部的错误描述文本
 * @csspart counter - 底部右侧的字数统计
 */let rW=class extends iZ(t7){constructor(){super(...arguments),/**
         * 文本框形状。默认为 `filled`。可选值为：
         *
         * * `filled`：带背景色的文本框，视觉效果较强
         * * `outlined`：带边框的文本框，视觉效果较弱
         */this.variant="filled",/**
         * 文本框输入类型。默认为 `text`。可选值为：
         *
         * * `text`：默认值。文本字段
         * * `number`：只能输入数字。拥有动态键盘的设备上会显示数字键盘
         * * `password`：用于输入密码，其值会被遮盖
         * * `url`：用于输入 URL，会验证 URL 格式。在支持动态键盘的设备上有相应的键盘
         * * `email`：用于输入邮箱地址，会验证邮箱格式。在支持动态键盘的设备上有相应的键盘
         * * `search`：用于搜索框。拥有动态键盘的设备上的回车图标会变成搜索图标
         * * `tel`：用于输入电话号码。拥有动态键盘的设备上会显示电话数字键盘
         * * `hidden`：隐藏该控件，但其值仍会提交到服务器
         * * `date`：输入日期的控件（年、月、日，不包括时间）。在支持的浏览器激活时打开日期选择器或年月日的数字滚轮
         * * `datetime-local`：输入日期和时间的控件，不包括时区。在支持的浏览器激活时打开日期选择器或年月日的数字滚轮
         * * `month`：输入年和月的控件，没有时区
         * * `time`：用于输入时间的控件，不包括时区
         * * `week`：用于输入以年和周数组成的日期，不带时区
         */this.type="text",/**
         * 文本框名称，将与表单数据一起提交
         */this.name="",/**
         * 文本框的值，将与表单数据一起提交
         */this.value="",/**
         * 默认值。在重置表单时，将重置为该默认值。该属性只能通过 JavaScript 属性设置
         */this.defaultValue="",/**
         * 是否仅在获得焦点时，显示底部帮助文本
         */this.helperOnFocus=!1,/**
         * 是否可清空文本框
         */this.clearable=!1,/**
         * 文本是否右对齐
         */this.endAligned=!1,/**
         * 是否为只读
         */this.readonly=!1,/**
         * 是否为禁用状态
         */this.disabled=!1,/**
         * 提交表单时，是否必须填写该字段
         */this.required=!1,/**
         * 是否根据输入的内容自动调整文本框高度
         */this.autosize=!1,/**
         * 是否显示字数统计。必须指定了 `maxlength` 时，该参数才有效
         */this.counter=!1,/**
         * `type` 为 `password` 时，设置该属性会添加一个切换按钮，点击时可在密文和明文之间切换
         */this.togglePassword=!1,/**
         * 启用拼写检查
         */this.spellcheck=!1,/**
         * 是否验证未通过
         *
         * 该验证为浏览器原生验证 API，基于 `type`、`required`、`minlength`、`maxlength` 及 `pattern` 等属性的验证结果
         */this.invalid=!1,/**
         * 该属性设置为 true 时，则在样式上为 text-field 赋予 invalid 的状态。实际是否验证通过仍需根据 invalid 属性判断
         * 该属性仅供 mdui 内部使用，当前 select 组件使用了该属性
         */this.invalidStyle=!1,/**
         * 该属性设置为 true 时，则在样式上为 text-field 赋予聚焦状态。实际是否聚焦仍然由 focusableMixin 控制
         * 该属性仅供 mdui 内部使用，当前 select 组件使用了该属性
         */this.focusedStyle=!1,this.isPasswordVisible=!1,this.hasValue=!1,/**
         * 通过该属性传入了错误文案时，会优先显示该文案。需要配合 invalid=true 或 invalidStyle=true 使用
         * 当前仅供 select 组件使用
         */this.error="",this.inputRef=iF(),this.formController=new iY(this),this.hasSlotController=new t6(this,"icon","end-icon","helper","input"),/**
         * 该属性设为 true 时，即使设置了 readonly，仍可以显示 clearable
         * 当前仅供 select 组件使用
         */this.readonlyButClearable=!1}/**
     * 表单验证状态对象
     */get validity(){return this.inputRef.value.validity}/**
     * 表单验证的错误提示信息
     */get validationMessage(){return this.inputRef.value.validationMessage}/**
     * 获取当前值，并转换为 `number` 类型；或设置一个 `number` 类型的值。
     * 如果值无法被转换为 `number` 类型，则会返回 `NaN`。
     */get valueAsNumber(){return this.inputRef.value?.valueAsNumber??parseFloat(this.value)}set valueAsNumber(e){let t=document.createElement("input");t.type="number",t.valueAsNumber=e,this.value=t.value}get focusElement(){return this.inputRef.value}get focusDisabled(){return this.disabled}/**
     * 是否显示聚焦状态样式
     */get isFocusedStyle(){// @ts-ignore
return this.focused||this.focusedStyle}/**
     * 是否渲染为 textarea。为 false 时渲染为 input
     */get isTextarea(){return this.rows&&this.rows>1||this.autosize}onDisabledChange(){// 禁用状态始终为验证通过，所以 disabled 变更时需要重新校验
this.inputRef.value.disabled=this.disabled,this.invalid=!this.inputRef.value.checkValidity()}async onValueChange(){if(this.hasValue=!!this.value,this.hasUpdated){await this.updateComplete;// reset 引起的值变更，不执行验证；直接修改值引起的变更，需要进行验证
let e=this.formController.getForm();e&&iW.get(e)?.has(this)?(this.invalid=!1,iW.get(e).delete(this)):this.invalid=!this.inputRef.value.checkValidity()}}onRowsChange(){this.setTextareaHeight()}async onMaxRowsChange(){if(!this.autosize)return;this.hasUpdated||await this.updateComplete;// 设置最大高度，为 line-height * maxRows + padding-top + padding-bottom
let e=z(this.inputRef.value);e.css("max-height",parseFloat(e.css("line-height"))*(this.maxRows??1)+parseFloat(e.css("padding-top"))+parseFloat(e.css("padding-bottom")))}async onMinRowsChange(){if(!this.autosize)return;this.hasUpdated||await this.updateComplete;// 设置最小高度，为 line-height * minRows + padding-top + padding-bottom
let e=z(this.inputRef.value);e.css("min-height",parseFloat(e.css("line-height"))*(this.minRows??1)+parseFloat(e.css("padding-top"))+parseFloat(e.css("padding-bottom")))}disconnectedCallback(){super.disconnectedCallback(),this.observeResize?.unobserve()}/**
     * 选中文本框中的文本
     */select(){this.inputRef.value.select()}/**
     * 选中文本框中特定范围的内容
     *
     * @param start 被选中的第一个字符的位置索引，从 `0` 开始。如果这个值比元素的 `value` 长度还大，则会被看作 `value` 最后一个位置的索引
     * @param end 被选中的最后一个字符的*下一个*位置索引。如果这个值比元素的 `value` 长度还大，则会被看作 `value` 最后一个位置的索引
     * @param direction 一个表示选择方向的字符串，可能的值有：`forward`、`backward`、`none`
     */setSelectionRange(e,t,i="none"){this.inputRef.value.setSelectionRange(e,t,i)}/**
     * 把文本框中特定范围的文本替换成一个新的文本
     * @param replacement 要插入的字符串
     * @param start 要替换的字符的起止位置的索引。默认为当前用户选中的字符的起始位置的索引
     * @param end 要替换的字符的结束位置的索引。默认为当前用户选中的字符的结束位置的索引
     * @param selectMode 文本被替换后，选取的状态。可选值为：
     * * `select`：选择新插入的文本
     * * `start`：将光标移动到新插入的文本的起始位置
     * * `end`：将光标移动到新插入的文本的结束位置
     * * `preserve`：默认值。尝试保留选取
     */setRangeText(e,t,i,o="preserve"){this.inputRef.value.setRangeText(e,t,i,o),this.value!==this.inputRef.value.value&&(this.value=this.inputRef.value.value,this.setTextareaHeight(),this.emit("input"),this.emit("change"))}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`
     */checkValidity(){let e=this.inputRef.value.checkValidity();return e||this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1}),e}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`。
     *
     * 验证未通过时，还将在组件上显示未通过的提示。
     */reportValidity(){return this.invalid=!this.inputRef.value.reportValidity(),this.invalid&&(this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1}),this.focus()),!this.invalid}/**
     * 设置自定义的错误提示文本。只要文本不为空，则表示字段验证未通过
     *
     * @param message 自定义的提示文本
     */setCustomValidity(e){this.inputRef.value.setCustomValidity(e),this.invalid=!this.inputRef.value.checkValidity()}firstUpdated(e){super.firstUpdated(e),this.setTextareaHeight(),this.observeResize=i_(this.inputRef.value,()=>this.setTextareaHeight())}render(){let e=!!this.icon||this.hasSlotController.test("icon"),t=!!this.endIcon||this.hasSlotController.test("end-icon"),i=this.invalid||this.invalidStyle,o=!!this.helper||this.hasSlotController.test("helper"),r=i&&!!(this.error||this.inputRef.value.validationMessage),n=this.counter&&!!this.maxlength,s=this.hasSlotController.test("input"),a={invalid:this.invalid,"invalid-style":this.invalidStyle},l=iQ({container:!0,"has-value":this.hasValue,"has-icon":e,"has-end-icon":t,"has-error-icon":i,"is-firefox":navigator.userAgent.includes("Firefox"),...a});return tI`<div part="container" class="${l}">${this.renderPrefix()}<div class="input-container">${this.renderLabel()} ${this.isTextarea?this.renderTextArea(s):this.renderInput(s)} ${ok(s,()=>tI`<slot name="input" class="input"></slot>`)}</div>${this.renderClearButton()}${this.renderTogglePasswordButton()} ${this.renderSuffix(i)}</div>${ok(r||o||n,()=>tI`<div part="supporting" class="${iQ({supporting:!0,...a})}">${this.renderHelper(r,o)} ${this.renderCounter(n)}</div>`)}`}onChange(){this.value=this.inputRef.value.value,this.isTextarea&&this.setTextareaHeight(),this.emit("change")}onClear(e){this.value="",this.emit("clear"),this.emit("input"),this.emit("change"),this.focus(),e.stopPropagation()}onInput(){this.value=this.inputRef.value.value,this.isTextarea&&this.setTextareaHeight(),this.emit("input")}onInvalid(e){e.preventDefault()}onKeyDown(e){let t=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;// 聚焦状态按下回车时，提交表单。可以在 keydown 事件中使用 event.preventDefault() 来取消提交表单
"Enter"!==e.key||t||setTimeout(()=>{e.defaultPrevented||this.formController.submit()})}/**
     * textarea 不支持 pattern 属性，所以在 keyup 时执行验证
     */onTextAreaKeyUp(){if(this.pattern){let e=new RegExp(this.pattern),t=this.value&&!this.value.match(e);this.setCustomValidity(t?"请与请求的格式匹配。":"")}}onTogglePassword(){this.isPasswordVisible=!this.isPasswordVisible}setTextareaHeight(){this.autosize?(this.inputRef.value.style.height="auto",this.inputRef.value.style.height=`${this.inputRef.value.scrollHeight}px`):this.inputRef.value.style.height=void 0}renderLabel(){return this.label?tI`<label part="label" class="label" ${rN({keyframeOptions:{duration:oS(this,"short4"),easing:oI(this,"standard")}})}>${this.label}</label>`:t9}renderPrefix(){return tI`<slot name="icon" part="icon" class="icon">${this.icon?tI`<mdui-icon name="${this.icon}" class="i"></mdui-icon>`:t9}</slot><slot name="prefix" part="prefix" class="prefix">${this.prefix}</slot>`}renderSuffix(e){return tI`<slot name="suffix" part="suffix" class="suffix">${this.suffix}</slot>${e?tI`<slot name="error-icon" part="error-icon" class="right-icon">${this.errorIcon?tI`<mdui-icon name="${this.errorIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-error class="i"></mdui-icon-error>`}</slot>`:tI`<slot name="end-icon" part="end-icon" class="end-icon right-icon">${this.endIcon?tI`<mdui-icon name="${this.endIcon}" class="i"></mdui-icon>`:t9}</slot>`}`}renderClearButton(){let e=this.clearable&&!this.disabled&&(!this.readonly||this.readonlyButClearable)&&("number"==typeof this.value||this.value.length>0);return ok(e,()=>tI`<slot name="clear-button" part="clear-button" class="right-icon" @click="${this.onClear}"><mdui-button-icon tabindex="-1"><slot name="clear-icon" part="clear-icon">${this.clearIcon?tI`<mdui-icon name="${this.clearIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-cancel--outlined class="i"></mdui-icon-cancel--outlined>`}</slot></mdui-button-icon></slot>`)}renderTogglePasswordButton(){let e="password"===this.type&&this.togglePassword&&!this.disabled;return ok(e,()=>tI`<slot name="toggle-password-button" part="toggle-password-button" class="right-icon" @click="${this.onTogglePassword}"><mdui-button-icon tabindex="-1">${this.isPasswordVisible?tI`<slot name="show-password-icon" part="show-password-icon">${this.showPasswordIcon?tI`<mdui-icon name="${this.showPasswordIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-visibility-off class="i"></mdui-icon-visibility-off>`}</slot>`:tI`<slot name="hide-password-icon" part="hide-password-icon">${this.hidePasswordIcon?tI`<mdui-icon name="${this.hidePasswordIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-visibility class="i"></mdui-icon-visibility>`}</slot>`}</mdui-button-icon></slot>`)}renderInput(e){return tI`<input ${iK(this.inputRef)} part="input" class="input ${iQ({"hide-input":e})}" type="${"password"===this.type&&this.isPasswordVisible?"text":this.type}" name="${t0(this.name)}" .value="${oo(this.value)}" placeholder="${t0(!this.label||this.isFocusedStyle||this.hasValue?this.placeholder:void 0)}" ?readonly="${this.readonly}" ?disabled="${this.disabled}" ?required="${this.required}" minlength="${t0(this.minlength)}" maxlength="${t0(this.maxlength)}" min="${t0(this.min)}" max="${t0(this.max)}" step="${t0(this.step)}" autocapitalize="${t0("password"===this.type?"off":this.autocapitalize)}" autocomplete="${t0("password"===this.type?"off":this.autocomplete)}" autocorrect="${t0("password"===this.type?"off":this.autocorrect)}" spellcheck="${t0(this.spellcheck)}" pattern="${t0(this.pattern)}" enterkeyhint="${t0(this.enterkeyhint)}" inputmode="${t0(this.inputmode)}" @change="${this.onChange}" @input="${this.onInput}" @invalid="${this.onInvalid}" @keydown="${this.onKeyDown}">`}renderTextArea(e){return tI`<textarea ${iK(this.inputRef)} part="input" class="input ${iQ({"hide-input":e})}" name="${t0(this.name)}" .value="${oo(this.value)}" placeholder="${t0(!this.label||this.isFocusedStyle||this.hasValue?this.placeholder:void 0)}" ?readonly="${this.readonly}" ?disabled="${this.disabled}" ?required="${this.required}" minlength="${t0(this.minlength)}" maxlength="${t0(this.maxlength)}" rows="${this.rows??1}" autocapitalize="${t0(this.autocapitalize)}" autocorrect="${t0(this.autocorrect)}" spellcheck="${t0(this.spellcheck)}" enterkeyhint="${t0(this.enterkeyhint)}" inputmode="${t0(this.inputmode)}" @change="${this.onChange}" @input="${this.onInput}" @invalid="${this.onInvalid}" @keydown="${this.onKeyDown}" @keyup="${this.onTextAreaKeyUp}"></textarea>`}/**
     * @param hasError 是否包含错误提示
     * @param hasHelper 是否含 helper 属性或 helper slot
     */renderHelper(e,t){return e?tI`<div part="error" class="error">${this.error||this.inputRef.value.validationMessage}</div>`:t?tI`<slot name="helper" part="helper" class="helper">${this.helper}</slot>`:tI`<span></span>`}renderCounter(e){return e?tI`<div part="counter" class="counter">${this.value.length}/${this.maxlength}</div>`:t9}};rW.styles=[ie,rj],eq([tX({reflect:!0})],rW.prototype,"variant",void 0),eq([tX({reflect:!0})],rW.prototype,"type",void 0),eq([tX({reflect:!0})],rW.prototype,"name",void 0),eq([tX()],rW.prototype,"value",void 0),eq([or()],rW.prototype,"defaultValue",void 0),eq([tX({reflect:!0})],rW.prototype,"label",void 0),eq([tX({reflect:!0})],rW.prototype,"placeholder",void 0),eq([tX({reflect:!0})],rW.prototype,"helper",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"helper-on-focus"})],rW.prototype,"helperOnFocus",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rW.prototype,"clearable",void 0),eq([tX({reflect:!0,attribute:"clear-icon"})],rW.prototype,"clearIcon",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"end-aligned"})],rW.prototype,"endAligned",void 0),eq([tX({reflect:!0})],rW.prototype,"prefix",void 0),eq([tX({reflect:!0})],rW.prototype,"suffix",void 0),eq([tX({reflect:!0})],rW.prototype,"icon",void 0),eq([tX({reflect:!0,attribute:"end-icon"})],rW.prototype,"endIcon",void 0),eq([tX({reflect:!0,attribute:"error-icon"})],rW.prototype,"errorIcon",void 0),eq([tX({reflect:!0})],rW.prototype,"form",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rW.prototype,"readonly",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rW.prototype,"disabled",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rW.prototype,"required",void 0),eq([tX({type:Number,reflect:!0})],rW.prototype,"rows",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rW.prototype,"autosize",void 0),eq([tX({type:Number,reflect:!0,attribute:"min-rows"})],rW.prototype,"minRows",void 0),eq([tX({type:Number,reflect:!0,attribute:"max-rows"})],rW.prototype,"maxRows",void 0),eq([tX({type:Number,reflect:!0})],rW.prototype,"minlength",void 0),eq([tX({type:Number,reflect:!0})],rW.prototype,"maxlength",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rW.prototype,"counter",void 0),eq([tX({type:Number,reflect:!0})],rW.prototype,"min",void 0),eq([tX({type:Number,reflect:!0})],rW.prototype,"max",void 0),eq([tX({type:Number,reflect:!0})],rW.prototype,"step",void 0),eq([tX({reflect:!0})],rW.prototype,"pattern",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"toggle-password"})],rW.prototype,"togglePassword",void 0),eq([tX({reflect:!0,attribute:"show-password-icon"})],rW.prototype,"showPasswordIcon",void 0),eq([tX({reflect:!0,attribute:"hide-password-icon"})],rW.prototype,"hidePasswordIcon",void 0),eq([tX({reflect:!0})],rW.prototype,"autocapitalize",void 0),eq([tX({reflect:!0})],rW.prototype,"autocorrect",void 0),eq([tX({reflect:!0})],rW.prototype,"autocomplete",void 0),eq([tX({reflect:!0})],rW.prototype,"enterkeyhint",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rW.prototype,"spellcheck",void 0),eq([tX({reflect:!0})],rW.prototype,"inputmode",void 0),eq([tJ()],rW.prototype,"invalid",void 0),eq([tJ()],rW.prototype,"invalidStyle",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"focused-style"})],rW.prototype,"focusedStyle",void 0),eq([tJ()],rW.prototype,"isPasswordVisible",void 0),eq([tJ()],rW.prototype,"hasValue",void 0),eq([tJ()],rW.prototype,"error",void 0),eq([iD("disabled",!0)],rW.prototype,"onDisabledChange",null),eq([iD("value")],rW.prototype,"onValueChange",null),eq([iD("rows",!0)],rW.prototype,"onRowsChange",null),eq([iD("maxRows")],rW.prototype,"onMaxRowsChange",null),eq([iD("minRows")],rW.prototype,"onMinRowsChange",null),rW=eq([tW("mdui-text-field")],rW);const rY=eZ`:host{display:inline-block;width:100%}.hidden-input{display:none}.text-field{cursor:pointer}.chips{display:flex;flex-wrap:wrap;margin:-.5rem -.25rem;min-height:2.5rem}:host([variant=filled][label]) .chips{margin:0 -.25rem -1rem -.25rem}.chip{margin:.25rem}mdui-menu{max-width:none}`;/**
 * @summary 选择框组件。需与 `<mdui-menu-item>` 组件配合使用
 *
 * ```html
 * <mdui-select>
 * ..<mdui-menu-item value="item-1">Item 1</mdui-menu-item>
 * ..<mdui-menu-item value="item-2">Item 2</mdui-menu-item>
 * </mdui-select>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event change - 选中的值变更时触发
 * @event invalid - 表单字段验证未通过时触发
 * @event clear - 在点击由 `clearable` 属性生成的清空按钮时触发。可以通过调用 `event.preventDefault()` 阻止清空下拉框
 *
 * @slot - `<mdui-menu-item>` 元素
 * @slot icon - 左侧图标
 * @slot end-icon - 右侧图标
 * @slot error-icon - 验证失败状态的右侧图标
 * @slot prefix - 左侧文本
 * @slot suffix - 右侧文本
 * @slot clear-button - 清空按钮
 * @slot clear-icon - 清空按钮中的图标
 * @slot helper - 底部的帮助文本
 *
 * @csspart text-field - 文本框，即 [`<mdui-text-field>`](/docs/2/components/text-field) 元素
 * @csspart menu - 下拉菜单，即 [`<mdui-menu>`](/docs/2/components/menu) 元素
 */let rG=class extends iZ(t7){constructor(){super(...arguments),/**
         * 下拉框形状。可选值为：
         *
         * * `filled`：带背景色的下拉框，视觉效果较强
         * * `outlined`：带边框的下拉框，视觉效果较弱
         */this.variant="filled",/**
         * 是否支持多选
         */this.multiple=!1,/**
         * 下拉框名称，将与表单数据一起提交
         */this.name="",/**
         * 下拉框的值，将与表单数据一起提交。
         *
         * 若未指定 `multiple` 属性，则该值为字符串；否则，该值为字符串数组。
         * HTML 属性只能设置字符串值；如果需要设置数组值，请通过 JavaScript 设置
         */this.value="",/**
         * 默认选中的值。在重置表单时，将重置为该默认值。该属性只能通过 JavaScript 属性设置
         */this.defaultValue="",/**
         * 是否可清空下拉框
         */this.clearable=!1,/**
         * 下拉框的方位。可选值为：
         *
         * * `auto`：自动判断方位
         * * `bottom`：位于下方
         * * `top`：位于上方
         */this.placement="auto",/**
         * 文本是否右对齐
         */this.endAligned=!1,/**
         * 是否为只读
         */this.readonly=!1,/**
         * 是否为禁用状态
         */this.disabled=!1,/**
         * 提交表单时，是否必须填写该字段
         */this.required=!1,/**
         * 是否验证未通过
         *
         * 该验证为浏览器原生验证 API，基于 `required` 属性的验证结果
         */this.invalid=!1,this.menuRef=iF(),this.textFieldRef=iF(),this.hiddenInputRef=iF(),this.formController=new iY(this),this.hasSlotController=new t6(this,"icon","end-icon","error-icon","prefix","suffix","clear-button","clear-icon","helper"),this.definedController=new iA(this,{relatedElements:["mdui-menu-item"]})}/**
     * 表单验证状态对象
     */get validity(){return this.hiddenInputRef.value.validity}/**
     * 表单验证的错误提示信息
     */get validationMessage(){return this.hiddenInputRef.value.validationMessage}get focusElement(){return this.textFieldRef.value}get focusDisabled(){return this.disabled}connectedCallback(){super.connectedCallback(),this.value=this.multiple&&m(this.value)?this.value?[this.value]:[]:this.value,this.defaultValue=this.multiple?[]:"",// 首次渲染时，slot 中的 mdui-menu-item 还未渲染完成，无法读取到其中的文本值
// 所以需要在首次更新后，再次重新渲染，此时 mdui-menu-item 已渲染完成，可以读取到文本值
this.definedController.whenDefined().then(()=>{this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback(),this.observeResize?.unobserve()}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`
     */checkValidity(){let e=this.hiddenInputRef.value.checkValidity();return e||this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1}),e}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`。
     *
     * 验证未通过时，还将在组件上显示未通过的提示。
     */reportValidity(){return this.invalid=!this.hiddenInputRef.value.reportValidity(),this.invalid&&(this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1}),this.focus()),!this.invalid}/**
     * 设置自定义的错误提示文本。只要文本不为空，则表示字段验证未通过
     *
     * @param message 自定义的提示文本
     */setCustomValidity(e){this.hiddenInputRef.value.setCustomValidity(e),this.invalid=!this.hiddenInputRef.value.checkValidity()}firstUpdated(e){super.firstUpdated(e),this.observeResize=i_(this.textFieldRef.value,()=>this.resizeMenu())}render(){let e=this.multiple?!!this.value.length:!!this.value;return tI`${this.multiple?tI`<select ${iK(this.hiddenInputRef)} class="hidden-input" name="${t0(this.name)}" value="${t0(this.value)}" .required="${this.required}" .disabled="${this.disabled}" multiple="multiple" tabindex="-1">${rk(this.value,e=>tI`<option selected="selected" value="${e}"></option>`)}</select>`:tI`<input ${iK(this.hiddenInputRef)} type="radio" class="hidden-input" name="${t0(this.name)}" value="${t0(this.value)}" .required="${this.required}" .disabled="${this.disabled}" .checked="${e}" tabindex="-1">`}<mdui-dropdown .stayOpenOnClick="${this.multiple}" .disabled="${this.readonly||this.disabled}" .placement="${"top"===this.placement?"top-start":"bottom"===this.placement?"bottom-start":"auto"}" @open="${this.onDropdownOpen}" @close="${this.onDropdownClose}"><mdui-text-field ${iK(this.textFieldRef)} slot="trigger" part="text-field" class="text-field" readonly="readonly" .readonlyButClearable="${!0}" .variant="${this.variant}" .name="${this.name}" .value="${this.multiple?this.value.length?" ":"":this.getMenuItemLabelByValue(this.value)}" .label="${this.label}" .placeholder="${this.placeholder}" .helper="${this.helper}" .error="${this.hiddenInputRef.value?.validationMessage}" .clearable="${this.clearable}" .clearIcon="${this.clearIcon}" .endAligned="${this.endAligned}" .prefix="${this.prefix}" .suffix="${this.suffix}" .icon="${this.icon}" .endIcon="${this.endIcon}" .errorIcon="${this.errorIcon}" .form="${this.form}" .disabled="${this.disabled}" .required="${this.required}" .invalidStyle="${this.invalid}" @clear="${this.onClear}" @change="${e=>e.stopPropagation()}" @keydown="${this.onTextFieldKeyDown}">${rk(["icon","end-icon","error-icon","prefix","suffix","clear-button","clear-icon","helper"],e=>this.hasSlotController.test(e)?tI`<slot name="${e}" slot="${e}"></slot>`:tA)} ${ok(this.multiple&&this.value.length,()=>tI`<div slot="input" class="chips">${rk(this.value,e=>tI`<mdui-chip class="chip" variant="input" deletable tabindex="-1" @delete="${()=>this.onDeleteOneValue(e)}">${this.getMenuItemLabelByValue(e)}</mdui-chip>`)}</div>`)}</mdui-text-field><mdui-menu ${iK(this.menuRef)} part="menu" .selects="${this.multiple?"multiple":"single"}" .value="${this.value}" @change="${this.onValueChange}"><slot></slot></mdui-menu></mdui-dropdown>`}getMenuItemLabelByValue(e){return this.menuItems.length&&this.menuItems.find(t=>t.value===e)?.textContent||e}resizeMenu(){this.menuRef.value.style.width=`${this.textFieldRef.value.clientWidth}px`}async onDropdownOpen(){// @ts-ignore
this.textFieldRef.value.focusedStyle=!0}onDropdownClose(){// @ts-ignore
this.textFieldRef.value.focusedStyle=!1,(this.contains(document.activeElement)||this.contains(document.activeElement?.assignedSlot??null))&&setTimeout(()=>{this.focus()})}async onValueChange(e){let t=e.target;this.value=this.multiple?t.value.map(e=>e??""):t.value??"",await this.updateComplete;// reset 引起的值变更，不执行验证；直接修改值引起的变更，需要进行验证
let i=this.formController.getForm();i&&iW.get(i)?.has(this)?(this.invalid=!1,iW.get(i).delete(this)):this.invalid=!this.hiddenInputRef.value.checkValidity()}/**
     * multiple 为 true 时，点 chip 的删除按钮，删除其中一个值
     */onDeleteOneValue(e){let t=[...this.value];t.includes(e)&&t.splice(t.indexOf(e),1),this.value=t}onClear(){this.value=this.multiple?[]:""}/**
     * 焦点在 text-field 上时，按下回车键，打开下拉选项
     */onTextFieldKeyDown(e){"Enter"===e.key&&(e.preventDefault(),this.textFieldRef.value.click())}};rG.styles=[ie,rY],eq([tX({reflect:!0})],rG.prototype,"variant",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rG.prototype,"multiple",void 0),eq([tX({reflect:!0})],rG.prototype,"name",void 0),eq([tX()],rG.prototype,"value",void 0),eq([or()],rG.prototype,"defaultValue",void 0),eq([tX({reflect:!0})],rG.prototype,"label",void 0),eq([tX({reflect:!0})],rG.prototype,"placeholder",void 0),eq([tX({reflect:!0})],rG.prototype,"helper",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rG.prototype,"clearable",void 0),eq([tX({reflect:!0,attribute:"clear-icon"})],rG.prototype,"clearIcon",void 0),eq([tX({reflect:!0})],rG.prototype,"placement",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"end-aligned"})],rG.prototype,"endAligned",void 0),eq([tX({reflect:!0})],rG.prototype,"prefix",void 0),eq([tX({reflect:!0})],rG.prototype,"suffix",void 0),eq([tX({reflect:!0})],rG.prototype,"icon",void 0),eq([tX({reflect:!0,attribute:"end-icon"})],rG.prototype,"endIcon",void 0),eq([tX({reflect:!0,attribute:"error-icon"})],rG.prototype,"errorIcon",void 0),eq([tX({reflect:!0})],rG.prototype,"form",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rG.prototype,"readonly",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rG.prototype,"disabled",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rG.prototype,"required",void 0),eq([tJ()],rG.prototype,"invalid",void 0),eq([tQ({flatten:!0,selector:"mdui-menu-item"})],rG.prototype,"menuItems",void 0),rG=eq([tW("mdui-select")],rG);const rX=eZ`.track-active{left:-.125rem;border-radius:var(--mdui-shape-corner-full) 0 0 var(--mdui-shape-corner-full)}`;/**
 * @summary 滑块组件
 *
 * ```html
 * <mdui-slider></mdui-slider>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event change - 在值发生了变更，且失去了焦点时，将触发该事件
 * @event input - 值变更时触发
 * @event invalid - 表单字段验证未通过时触发
 *
 * @csspart track-inactive - 未激活状态的轨道
 * @csspart track-active - 已激活状态的轨道
 * @csspart handle - 操作杆
 * @csspart label 提示文本
 * @csspart tickmark - 刻度标记
 */let rJ=class extends rx{constructor(){super(...arguments),/**
         * 滑块的值，将于表单数据一起提交
         */this.value=0,/**
         * 默认值。在重置表单时，将重置为该默认值。该属性只能通过 JavaScript 属性设置
         */this.defaultValue=0,this.rippleRef=iF(),this.handleRef=iF(),this.formController=new iY(this)}get rippleElement(){return this.rippleRef.value}async onValueChange(){this.value=this.fixValue(this.value);// reset 引起的值变更，不执行验证；直接修改值引起的变更，需要进行验证
let e=this.formController.getForm();e&&iW.get(e)?.has(this)?(this.invalid=!1,iW.get(e).delete(this)):(await this.updateComplete,this.invalid=!this.inputRef.value.checkValidity()),this.updateStyle()}connectedCallback(){super.connectedCallback(),this.value=this.fixValue(this.value)}firstUpdated(e){super.firstUpdated(e);let t=()=>{this.disabled||(this.labelVisible=!0)},i=()=>{this.disabled||(this.labelVisible=!1)};this.addEventListener("touchstart",t),this.addEventListener("mousedown",t),this.addEventListener("touchend",i),this.addEventListener("mouseup",i),this.updateStyle()}/**
     * <input /> 用于提供拖拽操作
     * <input class="invalid" /> 用于提供 html5 自带的表单错误提示
     */render(){return tI`<label class="${iQ({invalid:this.invalid})}"><input ${iK(this.inputRef)} type="range" step="${this.step}" min="${this.min}" max="${this.max}" ?disabled="${this.disabled}" .value="${oo(this.value.toString())}" @input="${this.onInput}" @change="${this.onChange}"><div part="track-inactive" class="track-inactive"></div><div ${iK(this.trackActiveRef)} part="track-active" class="track-active"></div><div ${iK(this.handleRef)} part="handle" class="handle"><div class="elevation"></div><mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple>${this.renderLabel(this.value)}</div>${ok(this.tickmarks,()=>rk(this.getCandidateValues(),e=>tI`<div part="tickmark" class="tickmark ${iQ({active:e<this.value})}" style="${t8({left:`${(e-this.min)/this.max*100}%`,display:e===this.value?"none":"block"})}"></div>`))}</label>`}updateStyle(){let e=(this.value-this.min)/(this.max-this.min)*100;this.trackActiveRef.value.style.width=`${e}%`,this.handleRef.value.style.left=`${e}%`}onInput(){this.value=parseFloat(this.inputRef.value.value),this.updateStyle()}};rJ.styles=[rx.styles,rX],eq([tX({type:Number})],rJ.prototype,"value",void 0),eq([or()],rJ.prototype,"defaultValue",void 0),eq([iD("value",!0)],rJ.prototype,"onValueChange",null),rJ=eq([tW("mdui-slider")],rJ);const rZ=eZ`:host{--shape-corner:var(--mdui-shape-corner-extra-small);--z-index:2400;position:fixed;z-index:var(--z-index);display:none;align-items:center;flex-wrap:wrap;border-radius:var(--shape-corner);min-width:20rem;max-width:36rem;padding:.25rem 0;box-shadow:var(--mdui-elevation-level3);background-color:rgb(var(--mdui-color-inverse-surface));color:rgb(var(--mdui-color-inverse-on-surface));font-size:var(--mdui-typescale-body-medium-size);font-weight:var(--mdui-typescale-body-medium-weight);letter-spacing:var(--mdui-typescale-body-medium-tracking);line-height:var(--mdui-typescale-body-medium-line-height)}:host([placement^=top]){transform-origin:top;top:1rem}:host([placement^=bottom]){transform-origin:bottom;bottom:1rem}:host([placement=bottom-start]),:host([placement=top-start]){left:1rem}:host([placement=bottom-end]),:host([placement=top-end]){right:1rem}.message{display:block;margin:.625rem 1rem}:host([message-line='1']) .message{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host([message-line='2']) .message{display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-box-orient:vertical;-webkit-line-clamp:2}.action-group{display:flex;align-items:center;margin-left:auto;padding-right:.5rem}.action,.close-button{display:inline-flex;align-items:center;justify-content:center}.action{color:rgb(var(--mdui-color-inverse-primary));font-size:var(--mdui-typescale-label-large-size);font-weight:var(--mdui-typescale-label-large-weight);letter-spacing:var(--mdui-typescale-label-large-tracking)}.action mdui-button,::slotted(mdui-button[slot=action][variant=outlined]),::slotted(mdui-button[slot=action][variant=text]){color:inherit;font-size:inherit;font-weight:inherit;letter-spacing:inherit;--mdui-comp-ripple-state-layer-color:var(--mdui-color-inverse-primary)}.action mdui-button::part(button){padding:0 .5rem}.close-button{margin:0 -.25rem 0 .25rem;font-size:1.5rem;color:rgb(var(--mdui-color-inverse-on-surface))}.close-button mdui-button-icon,::slotted(mdui-button-icon[slot=close-button][variant=outlined]),::slotted(mdui-button-icon[slot=close-button][variant=standard]){font-size:inherit;color:inherit;--mdui-comp-ripple-state-layer-color:var(--mdui-color-inverse-on-surface)}.close-button .i,::slotted([slot=close-icon]){font-size:inherit}`;/**
 * @summary 消息条组件
 *
 * ```html
 * <mdui-snackbar>message</mdui-snackbar>
 * ```
 *
 * @event open - Snackbar 开始显示时，事件被触发。可以通过调用 `event.preventDefault()` 阻止 Snackbar 显示
 * @event opened - Snackbar 显示动画完成时，事件被触发
 * @event close - Snackbar 开始隐藏时，事件被触发。可以通过调用 `event.preventDefault()` 阻止 Snackbar 关闭
 * @event closed - Snackbar 隐藏动画完成时，事件被触发
 * @event action-click - 点击操作按钮时触发
 *
 * @slot - Snackbar 中的消息文本内容
 * @slot action - 右侧的操作按钮
 * @slot close-button - 右侧的关闭按钮。必须设置 `closeable` 属性为 `true` 才会显示该按钮
 * @slot close-icon - 右侧的关闭按钮中的图标
 *
 * @csspart message - 消息文本
 * @csspart action - 操作按钮
 * @csspart close-button - 关闭按钮
 * @csspart close-icon - 关闭按钮中的图标
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --z-index - 组件的 CSS 的 `z-index` 值
 */let rQ=class extends t7{constructor(){super(),/**
         * 是否显示 Snackbar
         */this.open=!1,/**
         * Snackbar 出现的位置。默认为 `bottom`。可选值为：
         *
         * * `top`：位于顶部，居中对齐
         * * `top-start`：位于顶部，左对齐
         * * `top-end`：位于顶部，右对齐
         * * `bottom`：位于底部，居中对齐
         * * `bottom-start`：位于底部，左对齐
         * * `bottom-end`：位于底部，右对齐
         */this.placement="bottom",/**
         * 操作按钮是否为 loading 状态
         */this.actionLoading=!1,/**
         * 是否在右侧显示关闭按钮
         */this.closeable=!1,/**
         * 在多长时间后自动关闭（单位为毫秒）。设置为 `0` 时，不自动关闭。默认为 5 秒后自动关闭。
         */this.autoCloseDelay=5e3,/**
         * 点击或触摸 Snackbar 以外的区域时是否关闭 Snackbar
         */this.closeOnOutsideClick=!1,this.onDocumentClick=this.onDocumentClick.bind(this)}async onOpenChange(){let e=rl().down("sm"),t=["top","bottom"].includes(this.placement),i=oI(this,"linear"),o=oI(this,"emphasized-decelerate"),r=Array.from(this.renderRoot.querySelectorAll(".message, .action-group")),n=e?{left:"1rem",right:"1rem",minWidth:0}:t?{left:"50%"}:{};// 打开
// 要区分是否首次渲染，首次渲染时不触发事件，不执行动画；非首次渲染，触发事件，执行动画
if(this.open){let s=this.hasUpdated;if(s||await this.updateComplete,s){let e=this.emit("open",{cancelable:!0});if(!e)return}window.clearTimeout(this.closeTimeout),this.autoCloseDelay&&(this.closeTimeout=window.setTimeout(()=>{this.open=!1},this.autoCloseDelay)),this.style.display="flex",await Promise.all([ox(this),...r.map(e=>ox(e))]);let a=oS(this,"medium4"),l=i=>{let o=`scaleY(${"start"===i?0:1})`;return e?{transform:o}:{transform:[o,t?"translateX(-50%)":""].filter(e=>e).join(" ")}};await Promise.all([oC(this,[{...l("start"),...n},{...l("end"),...n}],{duration:s?a:0,easing:o,fill:"forwards"}),oC(this,[{opacity:0},{opacity:1,offset:.5},{opacity:1}],{duration:s?a:0,easing:i,fill:"forwards"}),...r.map(e=>oC(e,[{opacity:0},{opacity:0,offset:.2},{opacity:1,offset:.8},{opacity:1}],{duration:s?a:0,easing:i}))]),s&&this.emit("opened");return}// 关闭
if(!this.open&&this.hasUpdated){let o=this.emit("close",{cancelable:!0});if(!o)return;window.clearTimeout(this.closeTimeout),await Promise.all([ox(this),...r.map(e=>ox(e))]);let s=oS(this,"short4"),a=i=>{let o={opacity:"start"===i?1:0};return!e&&t&&Object.assign(o,{transform:"translateX(-50%)"}),o};await Promise.all([oC(this,[{...a("start"),...n},{...a("end"),...n}],{duration:s,easing:i,fill:"forwards"}),...r.map(e=>oC(e,[{opacity:1},{opacity:0,offset:.75},{opacity:0}],{duration:s,easing:i}))]),this.style.display="none",this.emit("closed");return}}connectedCallback(){super.connectedCallback(),document.addEventListener("pointerdown",this.onDocumentClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerdown",this.onDocumentClick)}render(){return tI`<slot part="message" class="message"></slot><div class="action-group"><slot name="action" part="action" class="action" @click="${this.onActionClick}">${this.action?tI`<mdui-button variant="text" loading="${this.actionLoading}">${this.action}</mdui-button>`:t9}</slot>${ok(this.closeable,()=>tI`<slot name="close-button" part="close-button" class="close-button" @click="${this.onCloseClick}"><mdui-button-icon><slot name="close-icon" part="close-icon">${this.closeIcon?tI`<mdui-icon name="${this.closeIcon}" class="i"></mdui-icon>`:tI`<mdui-icon-clear class="i"></mdui-icon-clear>`}</slot></mdui-button-icon></slot>`)}</div>`}/**
     * 在 document 上点击时，根据条件判断是否要关闭 snackbar
     */onDocumentClick(e){if(!this.open||!this.closeOnOutsideClick)return;let t=e.target;this.contains(t)||this===t||(this.open=!1)}onActionClick(e){e.stopPropagation(),this.emit("action-click")}onCloseClick(){this.open=!1}};rQ.styles=[ie,rZ],eq([tX({type:Boolean,reflect:!0,converter:iS})],rQ.prototype,"open",void 0),eq([tX({reflect:!0})],rQ.prototype,"placement",void 0),eq([tX({reflect:!0,attribute:"action"})],rQ.prototype,"action",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"action-loading"})],rQ.prototype,"actionLoading",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],rQ.prototype,"closeable",void 0),eq([tX({reflect:!0,attribute:"close-icon"})],rQ.prototype,"closeIcon",void 0),eq([tX({type:Number,reflect:!0,attribute:"message-line"})],rQ.prototype,"messageLine",void 0),eq([tX({type:Number,reflect:!0,attribute:"auto-close-delay"})],rQ.prototype,"autoCloseDelay",void 0),eq([tX({type:Boolean,reflect:!0,attribute:"close-on-outside-click",converter:iS})],rQ.prototype,"closeOnOutsideClick",void 0),eq([iD("open")],rQ.prototype,"onOpenChange",null),rQ=eq([tW("mdui-snackbar")],rQ);const r0=eZ`:host{--shape-corner:var(--mdui-shape-corner-full);--shape-corner-thumb:var(--mdui-shape-corner-full);position:relative;display:inline-block;cursor:pointer;-webkit-tap-highlight-color:transparent;height:2.5rem}:host([disabled]){cursor:default;pointer-events:none}label{display:inline-flex;align-items:center;width:100%;height:100%;white-space:nowrap;cursor:inherit;-webkit-user-select:none;user-select:none;touch-action:manipulation;zoom:1;-webkit-user-drag:none}.track{position:relative;display:flex;align-items:center;border-radius:var(--shape-corner);transition-property:background-color,border-width;transition-duration:var(--mdui-motion-duration-short4);transition-timing-function:var(--mdui-motion-easing-standard);height:2rem;width:3.25rem;border:.125rem solid rgb(var(--mdui-color-outline));background-color:rgb(var(--mdui-color-surface-container-highest))}:host([checked]) .track{background-color:rgb(var(--mdui-color-primary));border-width:0}.invalid .track{background-color:rgb(var(--mdui-color-error-container));border-color:rgb(var(--mdui-color-error))}:host([disabled]) .track{background-color:rgba(var(--mdui-color-surface-container-highest),.12);border-color:rgba(var(--mdui-color-on-surface),.12)}:host([disabled][checked]) .track{background-color:rgba(var(--mdui-color-on-surface),.12)}input{position:absolute;padding:0;opacity:0;pointer-events:none;width:1.25rem;height:1.25rem;margin:0 0 0 .625rem}mdui-ripple{border-radius:50%;transition-property:left,top;transition-duration:var(--mdui-motion-duration-short4);transition-timing-function:var(--mdui-motion-easing-standard);width:2.5rem;height:2.5rem}.thumb{position:absolute;display:flex;align-items:center;justify-content:center;border-radius:var(--shape-corner-thumb);transition-property:width,height,left,background-color;transition-duration:var(--mdui-motion-duration-short4);transition-timing-function:var(--mdui-motion-easing-standard);height:1rem;width:1rem;left:.375rem;background-color:rgb(var(--mdui-color-outline));--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}.thumb mdui-ripple{left:-.75rem;top:-.75rem}.has-unchecked-icon .thumb{height:1.5rem;width:1.5rem;left:.125rem}.has-unchecked-icon .thumb mdui-ripple{left:-.5rem;top:-.5rem}:host([focus-visible]) .thumb,:host([hover]) .thumb,:host([pressed]) .thumb{background-color:rgb(var(--mdui-color-on-surface-variant))}:host([checked]) .thumb{height:1.5rem;width:1.5rem;left:1.5rem;background-color:rgb(var(--mdui-color-on-primary));--mdui-comp-ripple-state-layer-color:var(--mdui-color-primary)}:host([checked]) .thumb mdui-ripple{left:-.5rem;top:-.5rem}:host([pressed]) .thumb{height:1.75rem;width:1.75rem;left:0}:host([pressed]) .thumb mdui-ripple{left:-.375rem;top:-.375rem}:host([pressed][checked]) .thumb{left:1.375rem}:host([focus-visible][checked]) .thumb,:host([hover][checked]) .thumb,:host([pressed][checked]) .thumb{background-color:rgb(var(--mdui-color-primary-container))}.invalid .thumb{background-color:rgb(var(--mdui-color-error));--mdui-comp-ripple-state-layer-color:var(--mdui-color-error)}:host([focus-visible]) .invalid .thumb,:host([hover]) .invalid .thumb,:host([pressed]) .invalid .thumb{background-color:rgb(var(--mdui-color-error))}:host([disabled]) .thumb{background-color:rgba(var(--mdui-color-on-surface),.38)}:host([disabled][checked]) .thumb{background-color:rgb(var(--mdui-color-surface))}.checked-icon,.unchecked-icon{display:flex;position:absolute;transition-property:opacity,transform;font-size:1rem}.unchecked-icon{opacity:1;transform:scale(1);transition-delay:var(--mdui-motion-duration-short1);transition-duration:var(--mdui-motion-duration-short3);transition-timing-function:var(--mdui-motion-easing-linear);color:rgb(var(--mdui-color-surface-container-highest))}:host([checked]) .unchecked-icon{opacity:0;transform:scale(.92);transition-delay:0s;transition-duration:var(--mdui-motion-duration-short1)}:host([disabled]) .unchecked-icon{color:rgba(var(--mdui-color-surface-container-highest),.38)}.checked-icon{opacity:0;transform:scale(.92);transition-delay:0s;transition-duration:var(--mdui-motion-duration-short1);transition-timing-function:var(--mdui-motion-easing-linear);color:rgb(var(--mdui-color-on-primary-container))}:host([checked]) .checked-icon{opacity:1;transform:scale(1);transition-delay:var(--mdui-motion-duration-short1);transition-duration:var(--mdui-motion-duration-short3)}.invalid .checked-icon{color:rgb(var(--mdui-color-error-container))}:host([disabled]) .checked-icon{color:rgba(var(--mdui-color-on-surface),.38)}.checked-icon .i,.unchecked-icon .i,::slotted([slot=checked-icon]),::slotted([slot=unchecked-icon]){font-size:inherit;color:inherit}`;/**
 * @summary 开关切换组件
 *
 * ```html
 * <mdui-switch></mdui-switch>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 * @event change - 选中状态变更时触发
 * @event input - 选中状态变更时触发
 * @event invalid - 表单字段验证不通过时触发
 *
 * @slot unchecked-icon - 未选中状态的元素
 * @slot checked-icon - 选中状态的元素
 *
 * @csspart track - 轨道
 * @csspart thumb - 图标容器
 * @csspart unchecked-icon - 未选中状态的图标
 * @csspart checked-icon 选中状态的图标
 *
 * @cssprop --shape-corner - 组件的轨道的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --shape-corner-thumb - 组件的图标容器的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 */let r1=class extends i4(iZ(t7)){constructor(){super(...arguments),/**
         * 是否为禁用状态
         */this.disabled=!1,/**
         * 是否为选中状态
         */this.checked=!1,/**
         * 默认选中状态。在重置表单时，将重置为该默认状态。该属性只能通过 JavaScript 属性设置
         */this.defaultChecked=!1,/**
         * 提交表单时，是否必须选中该开关
         */this.required=!1,/**
         * 开关的名称，将与表单数据一起提交
         */this.name="",/**
         * 开关的值，将于表单数据一起提交
         */this.value="on",/**
         * 是否验证未通过
         */this.invalid=!1,this.rippleRef=iF(),this.inputRef=iF(),this.formController=new iY(this,{value:e=>e.checked?e.value:void 0,defaultValue:e=>e.defaultChecked,setValue:(e,t)=>e.checked=t}),this.hasSlotController=new t6(this,"unchecked-icon")}/**
     * 表单验证状态对象
     */get validity(){return this.inputRef.value.validity}/**
     * 表单验证的错误提示信息
     */get validationMessage(){return this.inputRef.value.validationMessage}get rippleElement(){return this.rippleRef.value}get rippleDisabled(){return this.disabled}get focusElement(){return this.inputRef.value}get focusDisabled(){return this.disabled}async onDisabledChange(){await this.updateComplete,this.invalid=!this.inputRef.value.checkValidity()}async onCheckedChange(){await this.updateComplete;// reset 引起的值变更，不执行验证；直接修改值引起的变更，需要进行验证
let e=this.formController.getForm();e&&iW.get(e)?.has(this)?(this.invalid=!1,iW.get(e).delete(this)):this.invalid=!this.inputRef.value.checkValidity()}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`
     */checkValidity(){let e=this.inputRef.value.checkValidity();return e||this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1}),e}/**
     * 检查表单字段是否验证通过。若未通过则返回 `false`，并触发 `invalid` 事件；若验证通过，则返回 `true`。
     *
     * 验证未通过时，还将在组件上显示未通过的提示。
     */reportValidity(){if(this.invalid=!this.inputRef.value.reportValidity(),this.invalid){let e=this.emit("invalid",{bubbles:!1,cancelable:!0,composed:!1});// 调用了 preventDefault() 时，隐藏默认的表单错误提示
e||(this.blur(),this.focus())}return!this.invalid}/**
     * 设置自定义的错误提示文本。只要文本不为空，则表示字段验证未通过
     *
     * @param message 自定义的提示文本
     */setCustomValidity(e){this.inputRef.value.setCustomValidity(e),this.invalid=!this.inputRef.value.checkValidity()}render(){return tI`<label class="${iQ({invalid:this.invalid,"has-unchecked-icon":this.uncheckedIcon||this.hasSlotController.test("unchecked-icon")})}"><input ${iK(this.inputRef)} type="checkbox" name="${t0(this.name)}" value="${t0(this.value)}" .disabled="${this.disabled}" .checked="${oo(this.checked)}" .required="${this.required}" @change="${this.onChange}"><div part="track" class="track"><div part="thumb" class="thumb"><mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple><slot name="checked-icon" part="checked-icon" class="checked-icon">${this.checkedIcon?tI`<mdui-icon name="${this.checkedIcon}" class="i"></mdui-icon>`:""===this.checkedIcon?t9:tI`<mdui-icon-check class="i"></mdui-icon-check>`}</slot><slot name="unchecked-icon" part="unchecked-icon" class="unchecked-icon">${this.uncheckedIcon?tI`<mdui-icon name="${this.uncheckedIcon}" class="i"></mdui-icon>`:t9}</slot></div></div></label>`}/**
     * input[type="checkbox"] 的 change 事件无法冒泡越过 shadow dom
     */onChange(){this.checked=this.inputRef.value.checked,this.emit("change")}};r1.styles=[ie,r0],eq([tX({type:Boolean,reflect:!0,converter:iS})],r1.prototype,"disabled",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],r1.prototype,"checked",void 0),eq([or("checked")],r1.prototype,"defaultChecked",void 0),eq([tX({reflect:!0,attribute:"unchecked-icon"})],r1.prototype,"uncheckedIcon",void 0),eq([tX({reflect:!0,attribute:"checked-icon"})],r1.prototype,"checkedIcon",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],r1.prototype,"required",void 0),eq([tX({reflect:!0})],r1.prototype,"form",void 0),eq([tX({reflect:!0})],r1.prototype,"name",void 0),eq([tX({reflect:!0})],r1.prototype,"value",void 0),eq([tJ()],r1.prototype,"invalid",void 0),eq([iD("disabled",!0),iD("required",!0)],r1.prototype,"onDisabledChange",null),eq([iD("checked",!0)],r1.prototype,"onCheckedChange",null),r1=eq([tW("mdui-switch")],r1);const r2=eZ`:host{position:relative;--mdui-comp-ripple-state-layer-color:var(--mdui-color-on-surface)}:host([active]){--mdui-comp-ripple-state-layer-color:var(--mdui-color-primary)}.container{display:flex;justify-content:center;align-items:center;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;height:100%}.preset{flex-direction:column;min-height:3rem;padding:.625rem 1rem}:host([inline]) .preset{flex-direction:row}.icon-container,.label-container{position:relative;display:flex;align-items:center;justify-content:center}.icon-container ::slotted([slot=badge]){position:absolute;transform:translate(50%,-50%)}.icon-container ::slotted([slot=badge][variant=small]){transform:translate(.5625rem,-.5625rem)}.label-container ::slotted([slot=badge]){position:absolute;left:100%;bottom:100%;transform:translate(-.75rem,.625rem)}.label-container ::slotted([slot=badge][variant=small]){transform:translate(-.375rem,.375rem)}.icon,.label{display:flex;color:rgb(var(--mdui-color-on-surface-variant))}:host([focused]) .icon,:host([focused]) .label,:host([hover]) .icon,:host([hover]) .label,:host([pressed]) .icon,:host([pressed]) .label{color:rgb(var(--mdui-color-on-surface))}:host([active]) .icon,:host([active]) .label{color:rgb(var(--mdui-color-primary))}:host([active]) .variant-secondary .icon,:host([active]) .variant-secondary .label{color:rgb(var(--mdui-color-on-surface))}.icon{font-size:1.5rem}.label{font-size:var(--mdui-typescale-title-small-size);font-weight:var(--mdui-typescale-title-small-weight);letter-spacing:var(--mdui-typescale-title-small-tracking);line-height:var(--mdui-typescale-title-small-line-height)}.icon mdui-icon,::slotted([slot=icon]){font-size:inherit;color:inherit}`;/**
 * @summary 选项卡项组件。需与 `<mdui-tabs>` 和 `<mdui-tab-panel>` 组件配合使用
 *
 * ```html
 * <mdui-tabs value="tab-1">
 * ..<mdui-tab value="tab-1">Tab 1</mdui-tab>
 * ..<mdui-tab value="tab-2">Tab 2</mdui-tab>
 * ..<mdui-tab value="tab-3">Tab 3</mdui-tab>
 *
 * ..<mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
 * ..<mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
 * ..<mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
 * </mdui-tabs>
 * ```
 *
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 *
 * @slot - 选项卡导航项的文本
 * @slot icon - 选项卡导航项中的图标
 * @slot badge - 徽标
 * @slot custom - 自定义整个选项卡导航项中的内容
 *
 * @csspart container - 导航项容器
 * @csspart icon - 导航项中的图标
 * @csspart label - 导航项的文本
 */let r5=class extends i4(iZ(t7)){constructor(){super(...arguments),/**
         * 是否把图标和文本水平排列
         */this.inline=!1,/**
         * 是否为激活状态，由 `<mdui-tabs>` 组件控制该参数
         */this.active=!1,/**
         * 选项卡形状。由 `<mdui-tabs>` 组件控制该参数
         */this.variant="primary",// 每一个 `<mdui-tab>` 元素都添加一个唯一的 key
this.key=iM(),this.rippleRef=iF(),this.hasSlotController=new t6(this,"icon","custom")}get rippleElement(){return this.rippleRef.value}get rippleDisabled(){return!1}get focusElement(){return this}get focusDisabled(){return!1}render(){let e=this.icon||this.hasSlotController.test("icon"),t=this.hasSlotController.test("custom"),i=()=>tI`<slot name="badge"></slot>`;return tI`<mdui-ripple ${iK(this.rippleRef)} .noRipple="${this.noRipple}"></mdui-ripple><div part="container" class="${iQ({container:!0,preset:!t,"variant-secondary":"secondary"===this.variant})}"><slot name="custom"><div class="icon-container">${ok(e||this.icon,i)}<slot name="icon" part="icon" class="icon">${this.icon?tI`<mdui-icon name="${this.icon}"></mdui-icon>`:t9}</slot></div><div class="label-container">${ok(!e,i)}<slot part="label" class="label"></slot></div></slot></div>`}};r5.styles=[ie,r2],eq([tX({reflect:!0})],r5.prototype,"value",void 0),eq([tX({reflect:!0})],r5.prototype,"icon",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],r5.prototype,"inline",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],r5.prototype,"active",void 0),eq([tJ()],r5.prototype,"variant",void 0),r5=eq([tW("mdui-tab")],r5);const r4=eZ`:host{display:block;overflow-y:auto;flex:1 1 auto}:host(:not([active])){display:none}`;/**
 * @summary 选项卡面板项组件。需与 `<mdui-tabs>` 和 `<mdui-tab>` 组件配合使用
 *
 * ```html
 * <mdui-tabs value="tab-1">
 * ..<mdui-tab value="tab-1">Tab 1</mdui-tab>
 * ..<mdui-tab value="tab-2">Tab 2</mdui-tab>
 * ..<mdui-tab value="tab-3">Tab 3</mdui-tab>
 *
 * ..<mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
 * ..<mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
 * ..<mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
 * </mdui-tabs>
 * ```
 *
 * @slot - 选项卡面板内容
 */let r3=class extends t7{constructor(){super(...arguments),/**
         * 是否为激活状态，由 `<mdui-tabs>` 组件控制该状态
         */this.active=!1}render(){return tI`<slot></slot>`}};r3.styles=[ie,r4],eq([tX({reflect:!0})],r3.prototype,"value",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],r3.prototype,"active",void 0),r3=eq([tW("mdui-tab-panel")],r3);const r8=eZ`:host{position:relative;display:flex}:host([placement^=top]){flex-direction:column}:host([placement^=bottom]){flex-direction:column-reverse}:host([placement^=left]){flex-direction:row}:host([placement^=right]){flex-direction:row-reverse}.container{position:relative;display:flex;flex:0 0 auto;overflow-x:auto;background-color:rgb(var(--mdui-color-surface))}:host([placement^=bottom]) .container,:host([placement^=top]) .container{flex-direction:row}:host([placement^=left]) .container,:host([placement^=right]) .container{flex-direction:column}:host([placement$='-start']) .container{justify-content:flex-start}:host([placement=bottom]) .container,:host([placement=left]) .container,:host([placement=right]) .container,:host([placement=top]) .container{justify-content:center}:host([placement$='-end']) .container{justify-content:flex-end}.container::after{content:' ';position:absolute;background-color:rgb(var(--mdui-color-surface-variant))}:host([placement^=bottom]) .container::after,:host([placement^=top]) .container::after{left:0;width:100%;height:.0625rem}:host([placement^=top]) .container::after{bottom:0}:host([placement^=bottom]) .container::after{top:0}:host([placement^=left]) .container::after,:host([placement^=right]) .container::after{top:0;height:100%;width:.0625rem}:host([placement^=left]) .container::after{right:0}:host([placement^=right]) .container::after{left:0}.indicator{position:absolute;z-index:1;background-color:rgb(var(--mdui-color-primary))}.container:not(.initial) .indicator{transition-duration:var(--mdui-motion-duration-medium2);transition-timing-function:var(--mdui-motion-easing-standard-decelerate)}:host([placement^=bottom]) .indicator,:host([placement^=top]) .indicator{transition-property:transform,left,width}:host([placement^=left]) .indicator,:host([placement^=right]) .indicator{transition-property:transform,top,height}:host([placement^=top]) .indicator{bottom:0}:host([placement^=bottom]) .indicator{top:0}:host([placement^=left]) .indicator{right:0}:host([placement^=right]) .indicator{left:0}:host([placement^=bottom][variant=primary]) .indicator,:host([placement^=top][variant=primary]) .indicator{height:.1875rem}:host([placement^=bottom][variant=secondary]) .indicator,:host([placement^=top][variant=secondary]) .indicator{height:.125rem}:host([placement^=left][variant=primary]) .indicator,:host([placement^=right][variant=primary]) .indicator{width:.1875rem}:host([placement^=left][variant=secondary]) .indicator,:host([placement^=right][variant=secondary]) .indicator{width:.125rem}:host([placement^=top][variant=primary]) .indicator{border-top-left-radius:.1875rem;border-top-right-radius:.1875rem}:host([placement^=bottom][variant=primary]) .indicator{border-bottom-right-radius:.1875rem;border-bottom-left-radius:.1875rem}:host([placement^=left][variant=primary]) .indicator{border-top-left-radius:.1875rem;border-bottom-left-radius:.1875rem}:host([placement^=right][variant=primary]) .indicator{border-top-right-radius:.1875rem;border-bottom-right-radius:.1875rem}:host([full-width]) ::slotted(mdui-tab){flex:1}`;/**
 * @summary 选项卡组件。需与 `<mdui-tab>` 和 `<mdui-tab-panel>` 组件配合使用
 *
 * ```html
 * <mdui-tabs value="tab-1">
 * ..<mdui-tab value="tab-1">Tab 1</mdui-tab>
 * ..<mdui-tab value="tab-2">Tab 2</mdui-tab>
 * ..<mdui-tab value="tab-3">Tab 3</mdui-tab>
 *
 * ..<mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
 * ..<mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
 * ..<mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
 * </mdui-tabs>
 * ```
 *
 * @event change - 选中的值变化时触发
 *
 * @slot - `<mdui-tab>` 元素
 * @slot panel - `<mdui-tab-panel>` 元素
 *
 * @csspart container - `<mdui-tab>` 元素的容器
 * @csspart indicator - 激活状态指示器
 */let r7=class extends t7{constructor(){super(...arguments),/**
         * 选项卡形状。可选值为：
         *
         * * `primary`：位于 `<mdui-top-app-bar>` 下方，用于切换应用的主页面时，可使用该形状的选项卡
         * * `secondary`：位于页面中，用于切换一组相关内容时，可使用该形状的选项卡
         */this.variant="primary",/**
         * 选项卡位置。默认为 `top-start`。可选值为：
         *
         * * `top-start`：位于上方，且左对齐
         * * `top`：位于上方，且居中对齐
         * * `top-end`：位于上方，且右对齐
         * * `bottom-start`：位于下方，且左对齐
         * * `bottom`：位于下方，且居中对齐
         * * `bottom-end`：位于下方，且右对齐
         * * `left-start`：位于左侧，且顶部对齐
         * * `left`：位于左侧，且居中对齐
         * * `left-end`：位于左侧，且底部对齐
         * * `right-start`：位于右侧，且顶部对齐
         * * `right`：位于右侧，且居中对齐
         * * `right-end`：位于右侧，且底部对齐
         */this.placement="top-start",/**
         * 是否填满父元素宽度
         */this.fullWidth=!1,// 因为 tab 的 value 可能会重复，所以在每个 tab 元素上都添加了一个唯一的 key，通过 activeKey 来记录激活状态的 key
this.activeKey=0,// 是否为初始状态，初始状态不触发 change 事件
this.isInitial=!0,this.containerRef=iF(),this.indicatorRef=iF(),this.definedController=new iA(this,{relatedElements:["mdui-tab","mdui-tab-panel"]})}async onActiveKeyChange(){await this.definedController.whenDefined(),// 根据 activeKey 读取对应 tab 的值
this.value=this.tabs.find(e=>e.key===this.activeKey)?.value,this.updateActive(),this.isInitial||this.emit("change")}async onValueChange(){this.isInitial=!this.hasUpdated,await this.definedController.whenDefined();let e=this.tabs.find(e=>e.value===this.value);this.activeKey=e?.key??0}async onIndicatorChange(){await this.updateComplete,this.updateIndicator()}disconnectedCallback(){super.disconnectedCallback(),this.observeResize?.unobserve()}firstUpdated(e){super.firstUpdated(e),this.observeResize=i_(this.containerRef.value,()=>this.updateIndicator())}render(){return tI`<div ${iK(this.containerRef)} part="container" class="container ${iQ({initial:this.isInitial})}"><slot @slotchange="${this.onSlotChange}" @click="${this.onClick}"></slot><div ${iK(this.indicatorRef)} part="indicator" class="indicator"></div></div><slot name="panel" @slotchange="${this.onSlotChange}"></slot>`}async onSlotChange(){await this.definedController.whenDefined(),this.updateActive()}async onClick(e){// event.button 为 0 时，为鼠标左键点击。忽略鼠标中键和右键
if(e.button)return;await this.definedController.whenDefined();let t=e.target,i=t.closest("mdui-tab");i&&(this.activeKey=i.key,this.isInitial=!1,this.updateActive())}updateActive(){this.activeTab=this.tabs.map(e=>(e.active=this.activeKey===e.key,e)).find(e=>e.active),this.panels.forEach(e=>e.active=e.value===this.activeTab?.value),this.updateIndicator()}updateIndicator(){let e=this.activeTab,t=z(this.indicatorRef.value),i=this.placement.startsWith("left")||this.placement.startsWith("right");// 没有激活的，不显示指示器
if(!e){t.css({transform:i?"scaleY(0)":"scaleX(0)"});return}let o=z(e),r=e.offsetTop,n=e.offsetLeft,s={};if("primary"===this.variant){let t=o.find(':scope > [slot="custom"]'),a=t.length?t.get():z(e.renderRoot).find('slot[name="custom"]').children().get();if(i){// 最上方的元素的顶部，距离容器顶部距离
let e=Math.min(...a.map(e=>e.offsetTop))+r,t=Math.max(...a.map(e=>e.offsetTop+e.offsetHeight))+r;s={top:e,height:t-e}}else{// 最左侧的元素的左侧，距离容器左侧的距离
let e=Math.min(...a.map(e=>e.offsetLeft))+n,t=Math.max(...a.map(e=>e.offsetLeft+e.offsetWidth))+n;s={left:e,width:t-e}}}"secondary"===this.variant&&(s=i?{top:r,height:e.offsetHeight}:{left:n,width:e.offsetWidth}),t.css({...i?{transform:"scaleY(1)",width:"",left:""}:{transform:"scaleX(1)",height:"",top:""},...s})}};r7.styles=[ie,r8],eq([tX({reflect:!0})],r7.prototype,"variant",void 0),eq([tX({reflect:!0})],r7.prototype,"value",void 0),eq([tX({reflect:!0})],r7.prototype,"placement",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS,attribute:"full-width"})],r7.prototype,"fullWidth",void 0),eq([tJ()],r7.prototype,"activeKey",void 0),eq([tJ()],r7.prototype,"isInitial",void 0),eq([tQ({selector:"mdui-tab",flatten:!0})],r7.prototype,"tabs",void 0),eq([tQ({selector:"mdui-tab-panel",slot:"panel",flatten:!0})],r7.prototype,"panels",void 0),eq([iD("activeKey",!0)],r7.prototype,"onActiveKeyChange",null),eq([iD("value")],r7.prototype,"onValueChange",null),eq([iD("variant",!0),iD("placement",!0),iD("fullWidth",!0)],r7.prototype,"onIndicatorChange",null),r7=eq([tW("mdui-tabs")],r7);class r6{/**
     * @param host
     * @param elementRef 检查鼠标是否放在该元素上
     */constructor(e,t){/**
         * 当前鼠标是否放在元素上
         */this.isHover=!1,this.uniqueID=iM(),this.enterEventName=`mouseenter.${this.uniqueID}.hoverController`,this.leaveEventName=`mouseleave.${this.uniqueID}.hoverController`,this.mouseEnterItems=[],this.mouseLeaveItems=[],(this.host=e).addController(this),this.elementRef=t}hostConnected(){this.host.updateComplete.then(()=>{z(this.elementRef.value).on(this.enterEventName,()=>{this.isHover=!0;for(let e=this.mouseEnterItems.length-1;e>=0;e--){let t=this.mouseEnterItems[e];t.callback(),t.one&&this.mouseEnterItems.splice(e,1)}}).on(this.leaveEventName,()=>{this.isHover=!1;for(let e=this.mouseLeaveItems.length-1;e>=0;e--){let t=this.mouseLeaveItems[e];t.callback(),t.one&&this.mouseLeaveItems.splice(e,1)}})})}hostDisconnected(){z(this.elementRef.value).off(this.enterEventName).off(this.leaveEventName)}/**
     * 指定鼠标移入时的回调函数
     * @param callback 要执行的回调函数
     * @param one 是否仅执行一次
     */onMouseEnter(e,t=!1){this.mouseEnterItems.push({callback:e,one:t})}/**
     * 指定鼠标移出时的回调函数
     * @param callback 要执行的回调函数
     * @param one 是否仅执行一次
     */onMouseLeave(e,t=!1){this.mouseLeaveItems.push({callback:e,one:t})}}const r9=eZ`:host{--shape-corner-plain:var(--mdui-shape-corner-extra-small);--shape-corner-rich:var(--mdui-shape-corner-medium);--z-index:2500;display:contents}.popup{position:fixed;display:flex;flex-direction:column;z-index:var(--z-index);border-radius:var(--shape-corner-plain);background-color:rgb(var(--mdui-color-inverse-surface));padding:0 .5rem;min-width:1.75rem;max-width:20rem}:host([variant=rich]) .popup{border-radius:var(--shape-corner-rich);background-color:rgb(var(--mdui-color-surface-container));box-shadow:var(--mdui-elevation-level2);padding:.75rem 1rem .5rem 1rem}.headline{display:flex;color:rgb(var(--mdui-color-on-surface-variant));font-size:var(--mdui-typescale-title-small-size);font-weight:var(--mdui-typescale-title-small-weight);letter-spacing:var(--mdui-typescale-title-small-tracking);line-height:var(--mdui-typescale-title-small-line-height)}.content{display:flex;padding:.25rem 0;color:rgb(var(--mdui-color-inverse-on-surface));font-size:var(--mdui-typescale-body-small-size);font-weight:var(--mdui-typescale-body-small-weight);letter-spacing:var(--mdui-typescale-body-small-tracking);line-height:var(--mdui-typescale-body-small-line-height)}:host([variant=rich]) .content{color:rgb(var(--mdui-color-on-surface-variant));font-size:var(--mdui-typescale-body-medium-size);font-weight:var(--mdui-typescale-body-medium-weight);letter-spacing:var(--mdui-typescale-body-medium-tracking);line-height:var(--mdui-typescale-body-medium-line-height)}.action{display:flex;justify-content:flex-start;padding-top:.5rem}.action ::slotted(:not(:last-child)){margin-right:.5rem}`;/**
 * @summary 工具提示组件
 *
 * ```html
 * <mdui-tooltip content="tooltip content">
 * ..<mdui-button>button</mdui-button>
 * </mdui-tooltip>
 * ```
 *
 * @event open - tooltip 开始显示时，事件被触发。可以通过调用 `event.preventDefault()` 阻止 tooltip 打开
 * @event opened - tooltip 显示动画完成时，事件被触发
 * @event close - tooltip 开始隐藏时，事件被触发。可以通过调用 `event.preventDefault()` 阻止 tooltip 关闭
 * @event closed - tooltip 隐藏动画完成时，事件被触发
 *
 * @slot - tooltip 触发的目标元素，仅 `default` slot 中的第一个元素会作为目标元素
 * @slot headline - tooltip 的标题，仅 `variant="rich"` 时该 slot 才有效
 * @slot content - tooltip 的内容，可以包含 HTML。若只包含纯文本，可以使用 `content` 属性代替
 * @slot action - tooltip 底部的按钮，仅 `variant="rich"` 时该 slot 才有效
 *
 * @csspart popup - 工具提示的容器
 * @csspart headline - 标题
 * @csspart content - 正文
 * @csspart action - 操作按钮
 *
 * @cssprop --shape-corner-plain - variant="plain" 时，组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --shape-corner-rich - variant="rich" 时，组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --z-index - 组件的 CSS 的 `z-index` 值
 */let ne=class extends t7{constructor(){super(),/**
         * tooltip 的形状。默认为 `plain`。可选值为：
         *
         * * `plain`：纯文本，用于简单的单行文本
         * * `rich`：富文本，可包含标题、正文、及操作按钮
         */this.variant="plain",/**
         * tooltip 的位置。默认为 `auto`。可选值为：
         *
         * * `auto`：自动判断位置。`variant="plan"` 时，优先使用 `top`；`variant="rich"` 时，优先使用 `bottom-right`
         * * `top-left`：位于左上方
         * * `top-start`：位于上方，且左对齐
         * * `top`：位于上方，且居中对齐
         * * `top-end`：位于上方，且右对齐
         * * `top-right`：位于右上方
         * * `bottom-left`：位于左下方
         * * `bottom-start`：位于下方，且左对齐
         * * `bottom`：位于下方，且居中对齐
         * * `bottom-end`：位于下方，且右对齐
         * * `bottom-right`：位于右下方
         * * `left-start`：位于左侧，且顶部对齐
         * * `left`：位于左侧，且居中对齐
         * * `left-end`：位于左侧，且底部对齐
         * * `right-start`：位于右侧，且顶部对齐
         * * `right`：位于右侧，且居中对齐
         * * `right-end`：位于右侧，且底部对齐
         */this.placement="auto",/**
         * hover 触发显示的延时，单位为毫秒
         */this.openDelay=150,/**
         * hover 触发隐藏的延时，单位为毫秒
         */this.closeDelay=150,/**
         * 触发方式，支持传入多个值，用空格分隔。可选值为：
         *
         * * `click`：点击时触发
         * * `hover`：鼠标悬浮触发
         * * `focus`：聚焦时触发
         * * `manual`：使用了该值时，只能使用编程方式打开和关闭 tooltip，且不能再指定其他触发方式
         */this.trigger="hover focus",/**
         * 是否禁用 tooltip
         */this.disabled=!1,/**
         * 是否显示 tooltip
         */this.open=!1,this.popupRef=iF(),this.hasSlotController=new t6(this,"headline","action"),this.hoverController=new r6(this,this.popupRef),this.definedController=new iA(this,{needDomReady:!0}),this.onDocumentClick=this.onDocumentClick.bind(this),this.onWindowScroll=this.onWindowScroll.bind(this),this.onFocus=this.onFocus.bind(this),this.onBlur=this.onBlur.bind(this),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this),this.onMouseEnter=this.onMouseEnter.bind(this),this.onMouseLeave=this.onMouseLeave.bind(this)}/**
     * 获取第一个非 <style> 和 content slot 的子元素，作为 tooltip 的目标元素
     */get target(){return[...this.children].find(e=>"style"!==e.tagName.toLowerCase()&&"content"!==e.getAttribute("slot"))}async onPositionChange(){this.open&&(await this.definedController.whenDefined(),this.updatePositioner())}async onOpenChange(){let e=this.hasUpdated,t=oS(this,"short4"),i=oI(this,"standard");// 打开
// 要区分是否首次渲染，首次渲染时不触发事件，不执行动画；非首次渲染，触发事件，执行动画
if(this.open){if(await this.definedController.whenDefined(),z(`mdui-tooltip[variant="${this.variant}"]`).filter((e,t)=>t!==this).prop("open",!1),e||await this.updateComplete,e){let e=this.emit("open",{cancelable:!0});if(!e)return}await ox(this.popupRef.value),this.popupRef.value.hidden=!1,this.updatePositioner(),await oC(this.popupRef.value,[{transform:"scale(0)"},{transform:"scale(1)"}],{duration:e?t:0,easing:i}),e&&this.emit("opened");return}// 关闭
if(!this.open&&e){let e=this.emit("close",{cancelable:!0});if(!e)return;await ox(this.popupRef.value),await oC(this.popupRef.value,[{transform:"scale(1)"},{transform:"scale(0)"}],{duration:t,easing:i}),this.popupRef.value.hidden=!0,this.emit("closed")}}connectedCallback(){super.connectedCallback(),document.addEventListener("pointerdown",this.onDocumentClick),this.overflowAncestors=oU(this.target),this.overflowAncestors.forEach(e=>{e.addEventListener("scroll",this.onWindowScroll)})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerdown",this.onDocumentClick),this.overflowAncestors?.forEach(e=>{e.removeEventListener("scroll",this.onWindowScroll)}),this.observeResize?.unobserve()}firstUpdated(e){super.firstUpdated(e),this.definedController.whenDefined().then(()=>{let e=this.target;e.addEventListener("focus",this.onFocus),e.addEventListener("blur",this.onBlur),e.addEventListener("pointerdown",this.onClick),e.addEventListener("keydown",this.onKeydown),e.addEventListener("mouseenter",this.onMouseEnter),e.addEventListener("mouseleave",this.onMouseLeave),// trigger 尺寸变化时，重新调整 tooltip 的位置
this.observeResize=i_(e,()=>{this.updatePositioner()})})}render(){let e=this.isRich()&&(this.headline||this.hasSlotController.test("headline")),t=this.isRich()&&this.hasSlotController.test("action");return tI`<slot></slot><div ${iK(this.popupRef)} part="popup" class="popup" hidden>${ok(e,()=>tI`<slot name="headline" part="headline" class="headline">${this.headline}</slot>`)}<slot name="content" part="content" class="content">${this.content}</slot>${ok(t,()=>tI`<slot name="action" part="action" class="action"></slot>`)}</div>`}isRich(){return"rich"===this.variant}/**
     * 请求关闭 tooltip。鼠标未悬浮在 tooltip 上时，直接关闭；否则等鼠标移走再关闭
     */requestClose(){if(!this.hoverController.isHover){this.open=!1;return}this.hoverController.onMouseLeave(()=>{this.hasTrigger("hover")?// 所以延迟执行 leave
this.hoverTimeout=window.setTimeout(()=>{this.open=!1},this.closeDelay||50):this.open=!1},!0)}hasTrigger(e){let t=this.trigger.split(" ");return t.includes(e)}onFocus(){!this.disabled&&!this.open&&this.hasTrigger("focus")&&(this.open=!0)}onBlur(){!this.disabled&&this.open&&this.hasTrigger("focus")&&this.requestClose()}onClick(e){// e.button 为 0 时，为鼠标左键点击。忽略鼠标中间和右键
!this.disabled&&!e.button&&this.hasTrigger("click")&&(this.open&&(this.hasTrigger("hover")||this.hasTrigger("focus"))||(this.open=!this.open))}onKeydown(e){!this.disabled&&this.open&&"Escape"===e.key&&(e.stopPropagation(),this.requestClose())}onMouseEnter(){!this.disabled&&!this.open&&this.hasTrigger("hover")&&(this.openDelay?(window.clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>{this.open=!0},this.openDelay)):this.open=!0)}onMouseLeave(){window.clearTimeout(this.hoverTimeout),!this.disabled&&this.open&&this.hasTrigger("hover")&&// 同时使用 hover focus 时，leave 比 focus 先触发，导致 leave 后触发 focus，而显示 tooltip
// 所以延迟执行 leave
(this.hoverTimeout=window.setTimeout(()=>{this.requestClose()},this.closeDelay||50))}/**
     * 在 document 上点击时，根据条件判断是否关闭 tooltip
     */onDocumentClick(e){if(this.disabled||!this.open)return;let t=e.composedPath();// 点击 tooltip 外部区域，直接关闭
t.includes(this)||this.requestClose()}onWindowScroll(){window.requestAnimationFrame(()=>this.updatePositioner())}updatePositioner(){let e,t,i,o;let r=z(this.popupRef.value),n=this.isRich()?0:4,s=this.target.getBoundingClientRect(),a=s.top,l=s.left,d=s.height,c=s.width,h=this.popupRef.value.offsetHeight,u=this.popupRef.value.offsetWidth,p=u+n+4,m=h+n+4,f=this.placement;// 自动判断 popup 方位
if("auto"===f){let e=z(window),t=a>m,i=e.height()-a-d>m,o=l>p,r=e.width()-l-c>p;// rich 优先级为 bottom-right > bottom-left > top-right > top-left >
//              bottom > top > right > left
this.isRich()?(f="bottom-right",i&&r?f="bottom-right":i&&o?f="bottom-left":t&&r?f="top-right":t&&o?f="top-left":i?f="bottom":t?f="top":r?f="right":o&&(f="left")):(f="top",t?f="top":i?f="bottom":o?f="left":r&&(f="right"))}// 根据 placement 计算 popup 的位置和方向
let[v,g]=f.split("-");switch(v){case"top":t="bottom",i=a-h-n;break;case"bottom":t="top",i=a+d+n;break;default:switch(t="center",g){case"start":i=a;break;case"end":i=a+d-h;break;default:i=a+d/2-h/2}}switch(v){case"left":e="right",o=l-u-n;break;case"right":e="left",o=l+c+n;break;default:switch(e="center",g){case"start":o=l;break;case"end":o=l+c-u;break;case"left":e="right",o=l-u-n;break;case"right":e="left",o=l+c+n;break;default:o=l+c/2-u/2}}r.css({top:i,left:o,transformOrigin:[e,t].join(" ")})}};ne.styles=[ie,r9],eq([tX({reflect:!0})],ne.prototype,"variant",void 0),eq([tX({reflect:!0})],ne.prototype,"placement",void 0),eq([tX({type:Number,reflect:!0,attribute:"open-delay"})],ne.prototype,"openDelay",void 0),eq([tX({type:Number,reflect:!0,attribute:"close-delay"})],ne.prototype,"closeDelay",void 0),eq([tX({reflect:!0})],ne.prototype,"headline",void 0),eq([tX({reflect:!0})],ne.prototype,"content",void 0),eq([tX({reflect:!0})],ne.prototype,"trigger",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],ne.prototype,"disabled",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],ne.prototype,"open",void 0),eq([iD("placement",!0),iD("content",!0)],ne.prototype,"onPositionChange",null),eq([iD("open")],ne.prototype,"onOpenChange",null),ne=eq([tW("mdui-tooltip")],ne);/**
 * 获取一个 slot 中的所有内容
 * @param slot
 */const nt=e=>{let t=e.assignedNodes({flatten:!0}),i="";return[...t].forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&(i+=e.outerHTML),e.nodeType===Node.TEXT_NODE&&(i+=e.textContent)}),i},ni=eZ`:host{display:block;width:100%;flex-shrink:initial!important;overflow:hidden;color:rgb(var(--mdui-color-on-surface));font-size:var(--mdui-typescale-title-large-size);font-weight:var(--mdui-typescale-title-large-weight);letter-spacing:var(--mdui-typescale-title-large-tracking);line-height:var(--mdui-typescale-title-large-line-height);line-height:2.5rem}.label{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;opacity:1;transition:opacity var(--mdui-motion-duration-short2) var(--mdui-motion-easing-linear)}.label.variant-center-aligned{text-align:center}.label.variant-large:not(.shrink),.label.variant-medium:not(.shrink){opacity:0}.label.variant-large.shrink,.label.variant-medium.shrink{transition-delay:var(--mdui-motion-duration-short2)}.label-large{display:none;position:absolute;width:100%;left:0;margin-right:0;padding:0 1rem;transition:opacity var(--mdui-motion-duration-short2) var(--mdui-motion-easing-linear)}.label-large.variant-large,.label-large.variant-medium{display:block}.label-large.variant-medium{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;bottom:.75rem;font-size:var(--mdui-typescale-headline-small-size);font-weight:var(--mdui-typescale-headline-small-weight);letter-spacing:var(--mdui-typescale-headline-small-tracking);line-height:var(--mdui-typescale-headline-small-line-height)}.label-large.variant-large{display:-webkit-box;overflow:hidden;white-space:normal;-webkit-box-orient:vertical;-webkit-line-clamp:2;bottom:1.25rem;font-size:var(--mdui-typescale-headline-medium-size);font-weight:var(--mdui-typescale-headline-medium-weight);letter-spacing:var(--mdui-typescale-headline-medium-tracking);line-height:var(--mdui-typescale-headline-medium-line-height)}.label-large.variant-large:not(.shrink),.label-large.variant-medium:not(.shrink){opacity:1;transition-delay:var(--mdui-motion-duration-short2)}.label-large.variant-large.shrink,.label-large.variant-medium.shrink{opacity:0;z-index:-1}`;/**
 * @summary 顶部应用栏标题组件。需与 `<mdui-top-app-bar>` 组件配合使用
 *
 * ```html
 * <mdui-top-app-bar>
 * ..<mdui-button-icon icon="menu"></mdui-button-icon>
 * ..<mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
 * ..<div style="flex-grow: 1"></div>
 * ..<mdui-button-icon icon="more_vert"></mdui-button-icon>
 * </mdui-top-app-bar>
 * ```
 *
 * @slot - 顶部应用栏的标题文本
 * @slot label-large - 展开状态的标题文本
 *
 * @csspart label 文本内容
 * @csspart label-large 展开状态的文本内容
 */let no=class extends t7{constructor(){super(...arguments),/**
         * 顶部应用栏形状。由 mdui-top-app-bar 组件控制该参数
         */this.variant="small",/**
         * 是否缩小成 `variant="small"` 的样式，仅在 `variant="medium"` 或 `variant="large"` 时生效。由 mdui-top-app-bar 组件控制该参数
         */this.shrink=!1,this.hasSlotController=new t6(this,"label-large"),this.labelLargeRef=iF(),this.defaultSlotRef=iF()}render(){let e=this.hasSlotController.test("label-large"),t=iQ({shrink:this.shrink,"variant-center-aligned":"center-aligned"===this.variant,"variant-small":"small"===this.variant,"variant-medium":"medium"===this.variant,"variant-large":"large"===this.variant});return tI`<slot part="label" class="label ${t}" ${iK(this.defaultSlotRef)} @slotchange="${()=>this.onSlotChange(e)}"></slot>${e?tI`<slot name="label-large" part="label-large" class="label-large ${t}"></slot>`:tI`<div ${iK(this.labelLargeRef)} part="label-large" class="label-large ${t}"></div>`}`}/**
     * default slot 变化时，同步到 label-large 中
     * @param hasLabelLargeSlot
     * @private
     */onSlotChange(e){e||(this.labelLargeRef.value.innerHTML=nt(this.defaultSlotRef.value))}};no.styles=[ie,ni],eq([tJ()],no.prototype,"variant",void 0),eq([tJ()],no.prototype,"shrink",void 0),no=eq([tW("mdui-top-app-bar-title")],no);const nr=eZ`:host{--shape-corner:var(--mdui-shape-corner-none);--z-index:2000;position:fixed;top:0;right:0;left:0;display:flex;flex:0 0 auto;align-items:flex-start;justify-content:flex-start;border-bottom-left-radius:var(--shape-corner);border-bottom-right-radius:var(--shape-corner);z-index:var(--z-index);transition:top var(--mdui-motion-duration-long2) var(--mdui-motion-easing-standard),height var(--mdui-motion-duration-long2) var(--mdui-motion-easing-standard),box-shadow var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear),background-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear);padding:.75rem .5rem;height:4rem;background-color:rgb(var(--mdui-color-surface))}:host([scroll-target]:not([scroll-target=''])){position:absolute}:host([scroll-behavior~=shrink]){transition-duration:var(--mdui-motion-duration-short4)}:host([scrolling]){background-color:rgb(var(--mdui-color-surface-container));box-shadow:var(--mdui-elevation-level2)}::slotted(mdui-button-icon){color:rgb(var(--mdui-color-on-surface-variant));font-size:1.5rem}::slotted(mdui-button-icon:first-child){color:rgb(var(--mdui-color-on-surface))}::slotted(mdui-avatar){width:1.875rem;height:1.875rem;margin-top:.3125rem;margin-bottom:.3125rem}::slotted(*){flex-shrink:0}::slotted(:not(:last-child)){margin-right:.5rem}:host([variant=medium]){height:7rem}:host([variant=large]){height:9.5rem}:host([hide]){transition-duration:var(--mdui-motion-duration-short4);top:-4.625rem}:host([hide][variant=medium]){top:-7.625rem}:host([hide][variant=large]){top:-10.125rem}:host([shrink][variant=large]),:host([shrink][variant=medium]){transition-duration:var(--mdui-motion-duration-short4);height:4rem}`;/**
 * @summary 顶部应用栏组件
 *
 * ```html
 * <mdui-top-app-bar>
 * ..<mdui-button-icon icon="menu"></mdui-button-icon>
 * ..<mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
 * ..<div style="flex-grow: 1"></div>
 * ..<mdui-button-icon icon="more_vert"></mdui-button-icon>
 * </mdui-top-app-bar>
 * ```
 *
 * @event show - 开始显示时，事件被触发。可以通过调用 `event.preventDefault()` 阻止显示
 * @event shown - 显示动画完成时，事件被触发
 * @event hide - 开始隐藏时，事件被触发。可以通过调用 `event.preventDefault()` 阻止隐藏
 * @event hidden - 隐藏动画完成时，事件被触发
 *
 * @slot - 顶部应用栏内部的元素
 *
 * @cssprop --shape-corner - 组件的圆角大小。可以指定一个具体的像素值；但更推荐[引用设计令牌](/docs/2/styles/design-tokens#shape-corner)
 * @cssprop --z-index - 组件的 CSS 的 `z-index` 值
 */let nn=class extends iP(iB){constructor(){super(...arguments),/**
         * 顶部应用栏形状。默认为 `small`。可选值为：
         *
         * * `center-aligned`：小型应用栏，标题居中
         * * `small`：小型应用栏
         * * `medium`：中型应用栏
         * * `large`：大型应用栏
         */this.variant="small",/**
         * 是否隐藏
         */this.hide=!1,/**
         * 是否缩小成 `variant="small"` 的样式，仅在 `variant="medium"` 或 `variant="large"` 时生效
         */this.shrink=!1,/**
         * 滚动条是否不位于顶部
         */this.scrolling=!1}get scrollPaddingPosition(){return"top"}get layoutPlacement(){return"top"}async onVariantChange(){this.hasUpdated?this.addEventListener("transitionend",async()=>{await this.scrollBehaviorDefinedController.whenDefined(),this.updateContainerPadding()},{once:!0}):await this.updateComplete,this.titleElements.forEach(e=>{e.variant=this.variant})}async onShrinkChange(){this.hasUpdated||await this.updateComplete,this.titleElements.forEach(e=>{e.shrink=this.shrink})}firstUpdated(e){super.firstUpdated(e),this.addEventListener("transitionend",e=>{e.target===this&&this.emit(this.hide?"hidden":"shown")})}render(){return tI`<slot></slot>`}runScrollNoThreshold(e,t){// 向上滚动到顶部时，复原（无视 scrollThreshold 属性，否则会无法复原）
this.hasScrollBehavior("shrink")&&e&&t<8&&(this.shrink=!1)}runScrollThreshold(e,t){// 滚动时隐藏
if(this.hasScrollBehavior("elevate")&&(this.scrolling=!!t),this.hasScrollBehavior("shrink")&&!e&&(this.shrink=!0),this.hasScrollBehavior("hide")){// 向下滚动
if(!e&&!this.hide){let e=this.emit("hide",{cancelable:!0});e&&(this.hide=!0)}// 向上滚动
if(e&&this.hide){let e=this.emit("show",{cancelable:!0});e&&(this.hide=!1)}}}};function ns(e){return!!e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */// This file is automatically generated. Do not modify it.
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */// This file is automatically generated. Do not modify it.
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */// This file is automatically generated. Do not modify it.
/**
 * Utility methods for mathematical operations.
 *//**
 * The signum function.
 *
 * @return 1 if num > 0, -1 if num < 0, and 0 if num = 0
 */function na(e){return e<0?-1:0===e?0:1}function nl(e,t,i){return i<e?e:i>t?t:i}function nd(e){return(e%=360)<0&&(e+=360),e}function nc(e){return(e%=360)<0&&(e+=360),e}function nh(e,t){let i=e[0]*t[0][0]+e[1]*t[0][1]+e[2]*t[0][2],o=e[0]*t[1][0]+e[1]*t[1][1]+e[2]*t[1][2],r=e[0]*t[2][0]+e[1]*t[2][1]+e[2]*t[2][2];return[i,o,r]}nn.styles=[ie,nr],eq([tX({reflect:!0})],nn.prototype,"variant",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],nn.prototype,"hide",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],nn.prototype,"shrink",void 0),eq([tX({reflect:!0,attribute:"scroll-behavior"})],nn.prototype,"scrollBehavior",void 0),eq([tX({type:Boolean,reflect:!0,converter:iS})],nn.prototype,"scrolling",void 0),eq([tQ({selector:"mdui-top-app-bar-title",flatten:!0})],nn.prototype,"titleElements",void 0),eq([iD("variant")],nn.prototype,"onVariantChange",null),eq([iD("shrink")],nn.prototype,"onShrinkChange",null),nn=eq([tW("mdui-top-app-bar")],nn),ns.default=ns;/**
 * Color science utilities.
 *
 * Utility methods for color science constants and color space
 * conversions that aren't HCT or CAM16.
 */const nu=[[.41233895,.35762064,.18051042],[.2126,.7152,.0722],[.01932141,.11916382,.95034478]],np=[[3.2413774792388685,-1.5376652402851851,-.49885366846268053],[-.9691452513005321,1.8758853451067872,.04156585616912061],[.05562093689691305,-.20395524564742123,1.0571799111220335]],nm=[95.047,100,108.883];function nf(e,t,i){return(-16777216|(255&e)<<16|(255&t)<<8|255&i)>>>0}function nv(e){let t=nk(e[0]),i=nk(e[1]),o=nk(e[2]);return nf(t,i,o)}function ng(e){let t=function(e){let t=nw(e>>16&255),i=nw(e>>8&255),o=nw(255&e);return nh([t,i,o],nu)}(e)[1];return 116*nC(t/100)-16}function nb(e){return 100*function(e){let t=e*e*e;return t>216/24389?t:(116*e-16)/(24389/27)}((e+16)/116)}function ny(e){return 116*nC(e/100)-16}function nw(e){let t=e/255;return t<=.040449936?t/12.92*100:100*Math.pow((t+.055)/1.055,2.4)}function nk(e){var t;let i=e/100;return(t=Math.round(255*(i<=.0031308?12.92*i:1.055*Math.pow(i,1/2.4)-.055)))<0?0:t>255?255:t}function nC(e){return e>216/24389?Math.pow(e,1/3):(24389/27*e+16)/116}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nx{/**
     * Create ViewingConditions from a simple, physically relevant, set of
     * parameters.
     *
     * @param whitePoint White point, measured in the XYZ color space.
     *     default = D65, or sunny day afternoon
     * @param adaptingLuminance The luminance of the adapting field. Informally,
     *     how bright it is in the room where the color is viewed. Can be
     *     calculated from lux by multiplying lux by 0.0586. default = 11.72,
     *     or 200 lux.
     * @param backgroundLstar The lightness of the area surrounding the color.
     *     measured by L* in L*a*b*. default = 50.0
     * @param surround A general description of the lighting surrounding the
     *     color. 0 is pitch dark, like watching a movie in a theater. 1.0 is a
     *     dimly light room, like watching TV at home at night. 2.0 means there
     *     is no difference between the lighting on the color and around it.
     *     default = 2.0
     * @param discountingIlluminant Whether the eye accounts for the tint of the
     *     ambient lighting, such as knowing an apple is still red in green light.
     *     default = false, the eye does not perform this process on
     *       self-luminous objects like displays.
     */static make(e=nm,t=200/Math.PI*nb(50)/100,i=50,o=2,r=!1){var n,s;let a=.401288*e[0]+.650173*e[1]+-.051461*e[2],l=-.250268*e[0]+1.204414*e[1]+.045854*e[2],d=-.002079*e[0]+.048952*e[1]+.953127*e[2],c=.8+o/10,h=c>=.9?(1-(n=(c-.9)*10))*.59+.69*n:(1-(s=(c-.8)*10))*.525+.59*s,u=r?1:c*(1-1/3.6*Math.exp((-t-42)/92));u=u>1?1:u<0?0:u;let p=[u*(100/a)+1-u,u*(100/l)+1-u,u*(100/d)+1-u],m=1/(5*t+1),f=m*m*m*m,v=1-f,g=f*t+.1*v*v*Math.cbrt(5*t),b=nb(i)/e[1],y=1.48+Math.sqrt(b),w=.725/Math.pow(b,.2),k=[Math.pow(g*p[0]*a/100,.42),Math.pow(g*p[1]*l/100,.42),Math.pow(g*p[2]*d/100,.42)],C=[400*k[0]/(k[0]+27.13),400*k[1]/(k[1]+27.13),400*k[2]/(k[2]+27.13)],x=(2*C[0]+C[1]+.05*C[2])*w;return new nx(b,x,w,w,h,c,p,g,Math.pow(g,.25),y)}/**
     * Parameters are intermediate values of the CAM16 conversion process. Their
     * names are shorthand for technical color science terminology, this class
     * would not benefit from documenting them individually. A brief overview
     * is available in the CAM16 specification, and a complete overview requires
     * a color science textbook, such as Fairchild's Color Appearance Models.
     */constructor(e,t,i,o,r,n,s,a,l,d){this.n=e,this.aw=t,this.nbb=i,this.ncb=o,this.c=r,this.nc=n,this.rgbD=s,this.fl=a,this.fLRoot=l,this.z=d}}/** sRGB-like viewing conditions.  */nx.DEFAULT=nx.make();class n${/**
     * All of the CAM16 dimensions can be calculated from 3 of the dimensions, in
     * the following combinations:
     *      -  {j or q} and {c, m, or s} and hue
     *      - jstar, astar, bstar
     * Prefer using a static method that constructs from 3 of those dimensions.
     * This constructor is intended for those methods to use to return all
     * possible dimensions.
     *
     * @param hue
     * @param chroma informally, colorfulness / color intensity. like saturation
     *     in HSL, except perceptually accurate.
     * @param j lightness
     * @param q brightness; ratio of lightness to white point's lightness
     * @param m colorfulness
     * @param s saturation; ratio of chroma to white point's chroma
     * @param jstar CAM16-UCS J coordinate
     * @param astar CAM16-UCS a coordinate
     * @param bstar CAM16-UCS b coordinate
     */constructor(e,t,i,o,r,n,s,a,l){this.hue=e,this.chroma=t,this.j=i,this.q=o,this.m=r,this.s=n,this.jstar=s,this.astar=a,this.bstar=l}/**
     * CAM16 instances also have coordinates in the CAM16-UCS space, called J*,
     * a*, b*, or jstar, astar, bstar in code. CAM16-UCS is included in the CAM16
     * specification, and is used to measure distances between colors.
     */distance(e){let t=this.jstar-e.jstar,i=this.astar-e.astar,o=this.bstar-e.bstar;return 1.41*Math.pow(Math.sqrt(t*t+i*i+o*o),.63)}/**
     * @param argb ARGB representation of a color.
     * @return CAM16 color, assuming the color was viewed in default viewing
     *     conditions.
     */static fromInt(e){return n$.fromIntInViewingConditions(e,nx.DEFAULT)}/**
     * @param argb ARGB representation of a color.
     * @param viewingConditions Information about the environment where the color
     *     was observed.
     * @return CAM16 color.
     */static fromIntInViewingConditions(e,t){let i=nw((16711680&e)>>16),o=nw((65280&e)>>8),r=nw(255&e),n=.41233895*i+.35762064*o+.18051042*r,s=.2126*i+.7152*o+.0722*r,a=.01932141*i+.11916382*o+.95034478*r,l=t.rgbD[0]*(.401288*n+.650173*s-.051461*a),d=t.rgbD[1]*(-.250268*n+1.204414*s+.045854*a),c=t.rgbD[2]*(-.002079*n+.048952*s+.953127*a),h=Math.pow(t.fl*Math.abs(l)/100,.42),u=Math.pow(t.fl*Math.abs(d)/100,.42),p=Math.pow(t.fl*Math.abs(c)/100,.42),m=400*na(l)*h/(h+27.13),f=400*na(d)*u/(u+27.13),v=400*na(c)*p/(p+27.13),g=(11*m+-12*f+v)/11,b=(m+f-2*v)/9,y=180*Math.atan2(b,g)/Math.PI,w=y<0?y+360:y>=360?y-360:y,k=w*Math.PI/180,C=(40*m+20*f+v)/20*t.nbb,x=100*Math.pow(C/t.aw,t.c*t.z),$=4/t.c*Math.sqrt(x/100)*(t.aw+4)*t.fLRoot,R=w<20.14?w+360:w,E=5e4/13*(.25*(Math.cos(R*Math.PI/180+2)+3.8))*t.nc*t.ncb,I=Math.pow(E*Math.sqrt(g*g+b*b)/((20*m+20*f+21*v)/20+.305),.9)*Math.pow(1.64-Math.pow(.29,t.n),.73),S=I*Math.sqrt(x/100),A=S*t.fLRoot,D=50*Math.sqrt(I*t.c/(t.aw+4)),P=1/.0228*Math.log(1+.0228*A),T=P*Math.cos(k),M=P*Math.sin(k);return new n$(w,S,x,$,A,D,(1+100*.007)*x/(1+.007*x),T,M)}/**
     * @param j CAM16 lightness
     * @param c CAM16 chroma
     * @param h CAM16 hue
     */static fromJch(e,t,i){return n$.fromJchInViewingConditions(e,t,i,nx.DEFAULT)}/**
     * @param j CAM16 lightness
     * @param c CAM16 chroma
     * @param h CAM16 hue
     * @param viewingConditions Information about the environment where the color
     *     was observed.
     */static fromJchInViewingConditions(e,t,i,o){let r=4/o.c*Math.sqrt(e/100)*(o.aw+4)*o.fLRoot,n=t*o.fLRoot,s=t/Math.sqrt(e/100),a=50*Math.sqrt(s*o.c/(o.aw+4)),l=i*Math.PI/180,d=1/.0228*Math.log(1+.0228*n),c=d*Math.cos(l),h=d*Math.sin(l);return new n$(i,t,e,r,n,a,(1+100*.007)*e/(1+.007*e),c,h)}/**
     * @param jstar CAM16-UCS lightness.
     * @param astar CAM16-UCS a dimension. Like a* in L*a*b*, it is a Cartesian
     *     coordinate on the Y axis.
     * @param bstar CAM16-UCS b dimension. Like a* in L*a*b*, it is a Cartesian
     *     coordinate on the X axis.
     */static fromUcs(e,t,i){return n$.fromUcsInViewingConditions(e,t,i,nx.DEFAULT)}/**
     * @param jstar CAM16-UCS lightness.
     * @param astar CAM16-UCS a dimension. Like a* in L*a*b*, it is a Cartesian
     *     coordinate on the Y axis.
     * @param bstar CAM16-UCS b dimension. Like a* in L*a*b*, it is a Cartesian
     *     coordinate on the X axis.
     * @param viewingConditions Information about the environment where the color
     *     was observed.
     */static fromUcsInViewingConditions(e,t,i,o){let r=Math.sqrt(t*t+i*i),n=(Math.exp(.0228*r)-1)/.0228/o.fLRoot,s=Math.atan2(i,t)*(180/Math.PI);return s<0&&(s+=360),n$.fromJchInViewingConditions(e/(1-(e-100)*.007),n,s,o)}/**
     *  @return ARGB representation of color, assuming the color was viewed in
     *     default viewing conditions, which are near-identical to the default
     *     viewing conditions for sRGB.
     */toInt(){return this.viewed(nx.DEFAULT)}/**
     * @param viewingConditions Information about the environment where the color
     *     will be viewed.
     * @return ARGB representation of color
     */viewed(e){let t=0===this.chroma||0===this.j?0:this.chroma/Math.sqrt(this.j/100),i=Math.pow(t/Math.pow(1.64-Math.pow(.29,e.n),.73),1/.9),o=this.hue*Math.PI/180,r=e.aw*Math.pow(this.j/100,1/e.c/e.z),n=.25*(Math.cos(o+2)+3.8)*(5e4/13)*e.nc*e.ncb,s=r/e.nbb,a=Math.sin(o),l=Math.cos(o),d=23*(s+.305)*i/(23*n+11*i*l+108*i*a),c=d*l,h=d*a,u=(460*s+451*c+288*h)/1403,p=(460*s-891*c-261*h)/1403,m=(460*s-220*c-6300*h)/1403,f=Math.max(0,27.13*Math.abs(u)/(400-Math.abs(u))),v=na(u)*(100/e.fl)*Math.pow(f,1/.42),g=Math.max(0,27.13*Math.abs(p)/(400-Math.abs(p))),b=na(p)*(100/e.fl)*Math.pow(g,1/.42),y=Math.max(0,27.13*Math.abs(m)/(400-Math.abs(m))),w=na(m)*(100/e.fl)*Math.pow(y,1/.42),k=v/e.rgbD[0],C=b/e.rgbD[1],x=w/e.rgbD[2],$=function(e,t,i){let o=np[0][0]*e+np[0][1]*t+np[0][2]*i,r=np[1][0]*e+np[1][1]*t+np[1][2]*i,n=np[2][0]*e+np[2][1]*t+np[2][2]*i,s=nk(o),a=nk(r),l=nk(n);return nf(s,a,l)}(1.86206786*k-1.01125463*C+.14918677*x,.38752654*k+.62144744*C-.00897398*x,-.0158415*k-.03412294*C+1.04996444*x);return $}/// Given color expressed in XYZ and viewed in [viewingConditions], convert to
/// CAM16.
static fromXyzInViewingConditions(e,t,i,o){// Discount illuminant
let r=o.rgbD[0]*(.401288*e+.650173*t-.051461*i),n=o.rgbD[1]*(-.250268*e+1.204414*t+.045854*i),s=o.rgbD[2]*(-.002079*e+.048952*t+.953127*i),a=Math.pow(o.fl*Math.abs(r)/100,.42),l=Math.pow(o.fl*Math.abs(n)/100,.42),d=Math.pow(o.fl*Math.abs(s)/100,.42),c=400*na(r)*a/(a+27.13),h=400*na(n)*l/(l+27.13),u=400*na(s)*d/(d+27.13),p=(11*c+-12*h+u)/11,m=(c+h-2*u)/9,f=180*Math.atan2(m,p)/Math.PI,v=f<0?f+360:f>=360?f-360:f,g=v*Math.PI/180,b=(40*c+20*h+u)/20*o.nbb,y=100*Math.pow(b/o.aw,o.c*o.z),w=4/o.c*Math.sqrt(y/100)*(o.aw+4)*o.fLRoot,k=v<20.14?v+360:v,C=5e4/13*(.25*(Math.cos(k*Math.PI/180+2)+3.8))*o.nc*o.ncb,x=Math.pow(C*Math.sqrt(p*p+m*m)/((20*c+20*h+21*u)/20+.305),.9)*Math.pow(1.64-Math.pow(.29,o.n),.73),$=x*Math.sqrt(y/100),R=$*o.fLRoot,E=50*Math.sqrt(x*o.c/(o.aw+4)),I=Math.log(1+.0228*R)/.0228,S=I*Math.cos(g),A=I*Math.sin(g);return new n$(v,$,y,w,R,E,(1+100*.007)*y/(1+.007*y),S,A)}/// XYZ representation of CAM16 seen in [viewingConditions].
xyzInViewingConditions(e){let t=0===this.chroma||0===this.j?0:this.chroma/Math.sqrt(this.j/100),i=Math.pow(t/Math.pow(1.64-Math.pow(.29,e.n),.73),1/.9),o=this.hue*Math.PI/180,r=e.aw*Math.pow(this.j/100,1/e.c/e.z),n=.25*(Math.cos(o+2)+3.8)*(5e4/13)*e.nc*e.ncb,s=r/e.nbb,a=Math.sin(o),l=Math.cos(o),d=23*(s+.305)*i/(23*n+11*i*l+108*i*a),c=d*l,h=d*a,u=(460*s+451*c+288*h)/1403,p=(460*s-891*c-261*h)/1403,m=(460*s-220*c-6300*h)/1403,f=Math.max(0,27.13*Math.abs(u)/(400-Math.abs(u))),v=na(u)*(100/e.fl)*Math.pow(f,1/.42),g=Math.max(0,27.13*Math.abs(p)/(400-Math.abs(p))),b=na(p)*(100/e.fl)*Math.pow(g,1/.42),y=Math.max(0,27.13*Math.abs(m)/(400-Math.abs(m))),w=na(m)*(100/e.fl)*Math.pow(y,1/.42),k=v/e.rgbD[0],C=b/e.rgbD[1],x=w/e.rgbD[2];return[1.86206786*k-1.01125463*C+.14918677*x,.38752654*k+.62144744*C-.00897398*x,-.0158415*k-.03412294*C+1.04996444*x]}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * A color system built using CAM16 hue and chroma, and L* from
 * L*a*b*.
 *
 * Using L* creates a link between the color system, contrast, and thus
 * accessibility. Contrast ratio depends on relative luminance, or Y in the XYZ
 * color space. L*, or perceptual luminance can be calculated from Y.
 *
 * Unlike Y, L* is linear to human perception, allowing trivial creation of
 * accurate color tones.
 *
 * Unlike contrast ratio, measuring contrast in L* is linear, and simple to
 * calculate. A difference of 40 in HCT tone guarantees a contrast ratio >= 3.0,
 * and a difference of 50 guarantees a contrast ratio >= 4.5.
 *//**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */// This file is automatically generated. Do not modify it.
class nR{/**
     * Sanitizes a small enough angle in radians.
     *
     * @param angle An angle in radians; must not deviate too much
     * from 0.
     * @return A coterminal angle between 0 and 2pi.
     */static sanitizeRadians(e){return(e+8*Math.PI)%(2*Math.PI)}/**
     * Delinearizes an RGB component, returning a floating-point
     * number.
     *
     * @param rgbComponent 0.0 <= rgb_component <= 100.0, represents
     * linear R/G/B channel
     * @return 0.0 <= output <= 255.0, color channel converted to
     * regular RGB space
     */static trueDelinearized(e){let t=e/100;return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}static chromaticAdaptation(e){let t=Math.pow(Math.abs(e),.42);return 400*na(e)*t/(t+27.13)}/**
     * Returns the hue of a linear RGB color in CAM16.
     *
     * @param linrgb The linear RGB coordinates of a color.
     * @return The hue of the color in CAM16, in radians.
     */static hueOf(e){let t=nh(e,nR.SCALED_DISCOUNT_FROM_LINRGB),i=nR.chromaticAdaptation(t[0]),o=nR.chromaticAdaptation(t[1]),r=nR.chromaticAdaptation(t[2]);return Math.atan2((i+o-2*r)/9,(11*i+-12*o+r)/11)}static areInCyclicOrder(e,t,i){let o=nR.sanitizeRadians(t-e),r=nR.sanitizeRadians(i-e);return o<r}/**
     * Solves the lerp equation.
     *
     * @param source The starting number.
     * @param mid The number in the middle.
     * @param target The ending number.
     * @return A number t such that lerp(source, target, t) = mid.
     */static intercept(e,t,i){return(t-e)/(i-e)}static lerpPoint(e,t,i){return[e[0]+(i[0]-e[0])*t,e[1]+(i[1]-e[1])*t,e[2]+(i[2]-e[2])*t]}/**
     * Intersects a segment with a plane.
     *
     * @param source The coordinates of point A.
     * @param coordinate The R-, G-, or B-coordinate of the plane.
     * @param target The coordinates of point B.
     * @param axis The axis the plane is perpendicular with. (0: R, 1:
     * G, 2: B)
     * @return The intersection point of the segment AB with the plane
     * R=coordinate, G=coordinate, or B=coordinate
     */static setCoordinate(e,t,i,o){let r=nR.intercept(e[o],t,i[o]);return nR.lerpPoint(e,r,i)}static isBounded(e){return 0<=e&&e<=100}/**
     * Returns the nth possible vertex of the polygonal intersection.
     *
     * @param y The Y value of the plane.
     * @param n The zero-based index of the point. 0 <= n <= 11.
     * @return The nth possible vertex of the polygonal intersection
     * of the y plane and the RGB cube, in linear RGB coordinates, if
     * it exists. If this possible vertex lies outside of the cube,
     * [-1.0, -1.0, -1.0] is returned.
     */static nthVertex(e,t){let i=nR.Y_FROM_LINRGB[0],o=nR.Y_FROM_LINRGB[1],r=nR.Y_FROM_LINRGB[2],n=t%4<=1?0:100,s=t%2==0?0:100;if(t<4){let t=(e-n*o-s*r)/i;return nR.isBounded(t)?[t,n,s]:[-1,-1,-1]}if(t<8){let t=(e-s*i-n*r)/o;return nR.isBounded(t)?[s,t,n]:[-1,-1,-1]}{let t=(e-n*i-s*o)/r;return nR.isBounded(t)?[n,s,t]:[-1,-1,-1]}}/**
     * Finds the segment containing the desired color.
     *
     * @param y The Y value of the color.
     * @param targetHue The hue of the color.
     * @return A list of two sets of linear RGB coordinates, each
     * corresponding to an endpoint of the segment containing the
     * desired color.
     */static bisectToSegment(e,t){let i=[-1,-1,-1],o=i,r=0,n=0,s=!1,a=!0;for(let l=0;l<12;l++){let d=nR.nthVertex(e,l);if(d[0]<0)continue;let c=nR.hueOf(d);if(!s){i=d,o=d,r=c,n=c,s=!0;continue}(a||nR.areInCyclicOrder(r,c,n))&&(a=!1,nR.areInCyclicOrder(r,t,c)?(o=d,n=c):(i=d,r=c))}return[i,o]}static midpoint(e,t){return[(e[0]+t[0])/2,(e[1]+t[1])/2,(e[2]+t[2])/2]}static criticalPlaneBelow(e){return Math.floor(e-.5)}static criticalPlaneAbove(e){return Math.ceil(e-.5)}/**
     * Finds a color with the given Y and hue on the boundary of the
     * cube.
     *
     * @param y The Y value of the color.
     * @param targetHue The hue of the color.
     * @return The desired color, in linear RGB coordinates.
     */static bisectToLimit(e,t){let i=nR.bisectToSegment(e,t),o=i[0],r=nR.hueOf(o),n=i[1];for(let e=0;e<3;e++)if(o[e]!==n[e]){let i=-1,s=255;o[e]<n[e]?(i=nR.criticalPlaneBelow(nR.trueDelinearized(o[e])),s=nR.criticalPlaneAbove(nR.trueDelinearized(n[e]))):(i=nR.criticalPlaneAbove(nR.trueDelinearized(o[e])),s=nR.criticalPlaneBelow(nR.trueDelinearized(n[e])));for(let a=0;a<8&&!(1>=Math.abs(s-i));a++){let a=Math.floor((i+s)/2),l=nR.CRITICAL_PLANES[a],d=nR.setCoordinate(o,l,n,e),c=nR.hueOf(d);nR.areInCyclicOrder(r,t,c)?(n=d,s=a):(o=d,r=c,i=a)}}return nR.midpoint(o,n)}static inverseChromaticAdaptation(e){let t=Math.abs(e);return na(e)*Math.pow(Math.max(0,27.13*t/(400-t)),1/.42)}/**
     * Finds a color with the given hue, chroma, and Y.
     *
     * @param hueRadians The desired hue in radians.
     * @param chroma The desired chroma.
     * @param y The desired Y.
     * @return The desired color as a hexadecimal integer, if found; 0
     * otherwise.
     */static findResultByJ(e,t,i){// Initial estimate of j.
let o=11*Math.sqrt(i),r=nx.DEFAULT,n=1/Math.pow(1.64-Math.pow(.29,r.n),.73),s=.25*(Math.cos(e+2)+3.8)*(5e4/13)*r.nc*r.ncb,a=Math.sin(e),l=Math.cos(e);for(let e=0;e<5;e++){// ===========================================================
// Operations inlined from Cam16 to avoid repeated calculation
// ===========================================================
let d=o/100,c=0===t||0===o?0:t/Math.sqrt(d),h=Math.pow(c*n,1/.9),u=r.aw*Math.pow(d,1/r.c/r.z),p=u/r.nbb,m=23*(p+.305)*h/(23*s+11*h*l+108*h*a),f=m*l,v=m*a,g=(460*p+451*f+288*v)/1403,b=(460*p-891*f-261*v)/1403,y=(460*p-220*f-6300*v)/1403,w=nR.inverseChromaticAdaptation(g),k=nR.inverseChromaticAdaptation(b),C=nR.inverseChromaticAdaptation(y),x=nh([w,k,C],nR.LINRGB_FROM_SCALED_DISCOUNT);// ===========================================================
// Operations inlined from Cam16 to avoid repeated calculation
// ===========================================================
if(x[0]<0||x[1]<0||x[2]<0)break;let $=nR.Y_FROM_LINRGB[0],R=nR.Y_FROM_LINRGB[1],E=nR.Y_FROM_LINRGB[2],I=$*x[0]+R*x[1]+E*x[2];if(I<=0)break;if(4===e||.002>Math.abs(I-i)){if(x[0]>100.01||x[1]>100.01||x[2]>100.01)return 0;return nv(x)}// Iterates with Newton method,
// Using 2 * fn(j) / j as the approximation of fn'(j)
o-=(I-i)*o/(2*I)}return 0}/**
     * Finds an sRGB color with the given hue, chroma, and L*, if
     * possible.
     *
     * @param hueDegrees The desired hue, in degrees.
     * @param chroma The desired chroma.
     * @param lstar The desired L*.
     * @return A hexadecimal representing the sRGB color. The color
     * has sufficiently close hue, chroma, and L* to the desired
     * values, if possible; otherwise, the hue and L* will be
     * sufficiently close, and chroma will be maximized.
     */static solveToInt(e,t,i){if(t<1e-4||i<1e-4||i>99.9999)return function(e){let t=nb(e),i=nk(t);return nf(i,i,i)}(i);e=nc(e);let o=e/180*Math.PI,r=nb(i),n=nR.findResultByJ(o,t,r);if(0!==n)return n;let s=nR.bisectToLimit(r,o);return nv(s)}/**
     * Finds an sRGB color with the given hue, chroma, and L*, if
     * possible.
     *
     * @param hueDegrees The desired hue, in degrees.
     * @param chroma The desired chroma.
     * @param lstar The desired L*.
     * @return An CAM16 object representing the sRGB color. The color
     * has sufficiently close hue, chroma, and L* to the desired
     * values, if possible; otherwise, the hue and L* will be
     * sufficiently close, and chroma will be maximized.
     */static solveToCam(e,t,i){return n$.fromInt(nR.solveToInt(e,t,i))}}nR.SCALED_DISCOUNT_FROM_LINRGB=[[.001200833568784504,.002389694492170889,2795742885861124e-19],[5891086651375999e-19,.0029785502573438758,3270666104008398e-19],[10146692491640572e-20,5364214359186694e-19,.0032979401770712076]],nR.LINRGB_FROM_SCALED_DISCOUNT=[[1373.2198709594231,-1100.4251190754821,-7.278681089101213],[-271.815969077903,559.6580465940733,-32.46047482791194],[1.9622899599665666,-57.173814538844006,308.7233197812385]],nR.Y_FROM_LINRGB=[.2126,.7152,.0722],nR.CRITICAL_PLANES=[.015176349177441876,.045529047532325624,.07588174588720938,.10623444424209313,.13658714259697685,.16693984095186062,.19729253930674434,.2276452376616281,.2579979360165119,.28835063437139563,.3188300904430532,.350925934958123,.3848314933096426,.42057480301049466,.458183274052838,.4976837250274023,.5391024159806381,.5824650784040898,.6277969426914107,.6751227633498623,.7244668422128921,.775853049866786,.829304845476233,.8848452951698498,.942497089126609,1.0022825574869039,1.0642236851973577,1.1283421258858297,1.1946592148522128,1.2631959812511864,1.3339731595349034,1.407011200216447,1.4823302800086415,1.5599503113873272,1.6398909516233677,1.7221716113234105,1.8068114625156377,1.8938294463134073,1.9832442801866852,2.075074464868551,2.1693382909216234,2.2660538449872063,2.36523901573795,2.4669114995532007,2.5710888059345764,2.6777882626779785,2.7870270208169257,2.898822059350997,3.0131901897720907,3.1301480604002863,3.2497121605402226,3.3718988244681087,3.4967242352587946,3.624204428461639,3.754355295633311,3.887192587735158,4.022731918402185,4.160988767090289,4.301978482107941,4.445716283538092,4.592217266055746,4.741496401646282,4.893568542229298,5.048448422192488,5.20615066083972,5.3666897647573375,5.5300801301023865,5.696336044816294,5.865471690767354,6.037501145825082,6.212438385869475,6.390297286737924,6.571091626112461,6.7548350853498045,6.941541251256611,7.131223617812143,7.323895587840543,7.5195704746346665,7.7182615035334345,7.919981813454504,8.124744458384042,8.332562408825165,8.543448553206703,8.757415699253682,8.974476575321063,9.194643831691977,9.417930041841839,9.644347703669503,9.873909240696694,10.106627003236781,10.342513269534024,10.58158024687427,10.8238400726681,11.069304815507364,11.317986476196008,11.569896988756009,11.825048221409341,12.083451977536606,12.345119996613247,12.610063955123938,12.878295467455942,13.149826086772048,13.42466730586372,13.702830557985108,13.984327217668513,14.269168601521828,14.55736596900856,14.848930523210871,15.143873411576273,15.44220572664832,15.743938506781891,16.04908273684337,16.35764934889634,16.66964922287304,16.985093187232053,17.30399201960269,17.62635644741625,17.95219714852476,18.281524751807332,18.614349837764564,18.95068293910138,19.290534541298456,19.633915083172692,19.98083495742689,20.331304511189067,20.685334046541502,21.042933821039977,21.404114048223256,21.76888489811322,22.137256497705877,22.50923893145328,22.884842241736916,23.264076429332462,23.6469514538663,24.033477234264016,24.42366364919083,24.817520537484558,25.21505769858089,25.61628489293138,26.021211842414342,26.429848230738664,26.842203703840827,27.258287870275353,27.678110301598522,28.10168053274597,28.529008062403893,28.96010235337422,29.39497283293396,29.83362889318845,30.276079891419332,30.722335150426627,31.172403958865512,31.62629557157785,32.08401920991837,32.54558406207592,33.010999283389665,33.4802739966603,33.953417292456834,34.430438229418264,34.911345834551085,35.39614910352207,35.88485700094671,36.37747846067349,36.87402238606382,37.37449765026789,37.87891309649659,38.38727753828926,38.89959975977785,39.41588851594697,39.93615253289054,40.460400508064545,40.98864111053629,41.520882981230194,42.05713473317016,42.597404951718396,43.141702194811224,43.6900349931913,44.24241185063697,44.798841244188324,45.35933162437017,45.92389141541209,46.49252901546552,47.065252796817916,47.64207110610409,48.22299226451468,48.808024568002054,49.3971762874833,49.9904556690408,50.587870934119984,51.189430279724725,51.79514187861014,52.40501387947288,53.0190544071392,53.637271562750364,54.259673423945976,54.88626804504493,55.517063457223934,56.15206766869424,56.79128866487574,57.43473440856916,58.08241284012621,58.734331877617365,59.39049941699807,60.05092333227251,60.715611475655585,61.38457167773311,62.057811747619894,62.7353394731159,63.417162620860914,64.10328893648692,64.79372614476921,65.48848194977529,66.18756403501224,66.89098006357258,67.59873767827808,68.31084450182222,69.02730813691093,69.74813616640164,70.47333615344107,71.20291564160104,71.93688215501312,72.67524319850172,73.41800625771542,74.16517879925733,74.9167682708136,75.67278210128072,76.43322770089146,77.1981124613393,77.96744375590167,78.74122893956174,79.51947534912904,80.30219030335869,81.08938110306934,81.88105503125999,82.67721935322541,83.4778813166706,84.28304815182372,85.09272707154808,85.90692527145302,86.72564993000343,87.54890820862819,88.3767072518277,89.2090541872801,90.04595612594655,90.88742016217518,91.73345337380438,92.58406282226491,93.43925555268066,94.29903859396902,95.16341895893969,96.03240364439274,96.9059996312159,97.78421388448044,98.6670533535366,99.55452497210776];class nE{static from(e,t,i){return new nE(nR.solveToInt(e,t,i))}/**
     * @param argb ARGB representation of a color.
     * @return HCT representation of a color in default viewing conditions
     */static fromInt(e){return new nE(e)}toInt(){return this.argb}/**
     * A number, in degrees, representing ex. red, orange, yellow, etc.
     * Ranges from 0 <= hue < 360.
     */get hue(){return this.internalHue}/**
     * @param newHue 0 <= newHue < 360; invalid values are corrected.
     * Chroma may decrease because chroma has a different maximum for any given
     * hue and tone.
     */set hue(e){this.setInternalState(nR.solveToInt(e,this.internalChroma,this.internalTone))}get chroma(){return this.internalChroma}/**
     * @param newChroma 0 <= newChroma < ?
     * Chroma may decrease because chroma has a different maximum for any given
     * hue and tone.
     */set chroma(e){this.setInternalState(nR.solveToInt(this.internalHue,e,this.internalTone))}/** Lightness. Ranges from 0 to 100. */get tone(){return this.internalTone}/**
     * @param newTone 0 <= newTone <= 100; invalid valids are corrected.
     * Chroma may decrease because chroma has a different maximum for any given
     * hue and tone.
     */set tone(e){this.setInternalState(nR.solveToInt(this.internalHue,this.internalChroma,e))}constructor(e){this.argb=e;let t=n$.fromInt(e);this.internalHue=t.hue,this.internalChroma=t.chroma,this.internalTone=ng(e),this.argb=e}setInternalState(e){let t=n$.fromInt(e);this.internalHue=t.hue,this.internalChroma=t.chroma,this.internalTone=ng(e),this.argb=e}/**
     * Translates a color into different [ViewingConditions].
     *
     * Colors change appearance. They look different with lights on versus off,
     * the same color, as in hex code, on white looks different when on black.
     * This is called color relativity, most famously explicated by Josef Albers
     * in Interaction of Color.
     *
     * In color science, color appearance models can account for this and
     * calculate the appearance of a color in different settings. HCT is based on
     * CAM16, a color appearance model, and uses it to make these calculations.
     *
     * See [ViewingConditions.make] for parameters affecting color appearance.
     */inViewingConditions(e){// 1. Use CAM16 to find XYZ coordinates of color in specified VC.
let t=n$.fromInt(this.toInt()),i=t.xyzInViewingConditions(e),o=n$.fromXyzInViewingConditions(i[0],i[1],i[2],nx.make()),r=nE.from(o.hue,o.chroma,ny(i[1]));return r}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */// material_color_utilities is designed to have a consistent API across
// platforms and modular components that can be moved around easily. Using a
// class as a namespace facilitates this.
//
// tslint:disable:class-as-namespace
class nI{/**
     * Returns a contrast ratio, which ranges from 1 to 21.
     *
     * @param toneA Tone between 0 and 100. Values outside will be clamped.
     * @param toneB Tone between 0 and 100. Values outside will be clamped.
     */static ratioOfTones(e,t){return e=nl(0,100,e),t=nl(0,100,t),nI.ratioOfYs(nb(e),nb(t))}static ratioOfYs(e,t){let i=e>t?e:t;return(i+5)/((i===t?e:t)+5)}/**
     * Returns a tone >= tone parameter that ensures ratio parameter.
     * Return value is between 0 and 100.
     * Returns -1 if ratio cannot be achieved with tone parameter.
     *
     * @param tone Tone return value must contrast with.
     * Range is 0 to 100. Invalid values will result in -1 being returned.
     * @param ratio Contrast ratio of return value and tone.
     * Range is 1 to 21, invalid values have undefined behavior.
     */static lighter(e,t){if(e<0||e>100)return -1;let i=nb(e),o=t*(i+5)-5,r=nI.ratioOfYs(o,i);if(r<t&&Math.abs(r-t)>.04)return -1;// Ensure gamut mapping, which requires a 'range' on tone, will still result
// the correct ratio by darkening slightly.
let n=ny(o)+.4;return n<0||n>100?-1:n}/**
     * Returns a tone <= tone parameter that ensures ratio parameter.
     * Return value is between 0 and 100.
     * Returns -1 if ratio cannot be achieved with tone parameter.
     *
     * @param tone Tone return value must contrast with.
     * Range is 0 to 100. Invalid values will result in -1 being returned.
     * @param ratio Contrast ratio of return value and tone.
     * Range is 1 to 21, invalid values have undefined behavior.
     */static darker(e,t){if(e<0||e>100)return -1;let i=nb(e),o=(i+5)/t-5,r=nI.ratioOfYs(i,o);if(r<t&&Math.abs(r-t)>.04)return -1;// Ensure gamut mapping, which requires a 'range' on tone, will still result
// the correct ratio by darkening slightly.
let n=ny(o)-.4;return n<0||n>100?-1:n}/**
     * Returns a tone >= tone parameter that ensures ratio parameter.
     * Return value is between 0 and 100.
     * Returns 100 if ratio cannot be achieved with tone parameter.
     *
     * This method is unsafe because the returned value is guaranteed to be in
     * bounds for tone, i.e. between 0 and 100. However, that value may not reach
     * the ratio with tone. For example, there is no color lighter than T100.
     *
     * @param tone Tone return value must contrast with.
     * Range is 0 to 100. Invalid values will result in 100 being returned.
     * @param ratio Desired contrast ratio of return value and tone parameter.
     * Range is 1 to 21, invalid values have undefined behavior.
     */static lighterUnsafe(e,t){let i=nI.lighter(e,t);return i<0?100:i}/**
     * Returns a tone >= tone parameter that ensures ratio parameter.
     * Return value is between 0 and 100.
     * Returns 100 if ratio cannot be achieved with tone parameter.
     *
     * This method is unsafe because the returned value is guaranteed to be in
     * bounds for tone, i.e. between 0 and 100. However, that value may not reach
     * the [ratio with [tone]. For example, there is no color darker than T0.
     *
     * @param tone Tone return value must contrast with.
     * Range is 0 to 100. Invalid values will result in 0 being returned.
     * @param ratio Desired contrast ratio of return value and tone parameter.
     * Range is 1 to 21, invalid values have undefined behavior.
     */static darkerUnsafe(e,t){let i=nI.darker(e,t);return i<0?0:i}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS{/**
     * Returns true if a color is disliked.
     *
     * @param hct A color to be judged.
     * @return Whether the color is disliked.
     *
     * Disliked is defined as a dark yellow-green that is not neutral.
     */static isDisliked(e){let t=Math.round(e.hue)>=90&&111>=Math.round(e.hue),i=Math.round(e.chroma)>16,o=65>Math.round(e.tone);return t&&i&&o}/**
     * If a color is disliked, lighten it to make it likable.
     *
     * @param hct A color to be judged.
     * @return A new color if the original color is disliked, or the original
     *   color if it is acceptable.
     */static fixIfDisliked(e){return nS.isDisliked(e)?nE.from(e.hue,e.chroma,70):e}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nA{/**
     * Create a DynamicColor defined by a TonalPalette and HCT tone.
     *
     * @param args Functions with DynamicScheme as input. Must provide a palette
     * and tone. May provide a background DynamicColor and ToneDeltaConstraint.
     */static fromPalette(e){return new nA(e.name??"",e.palette,e.tone,e.isBackground??!1,e.background,e.secondBackground,e.contrastCurve,e.toneDeltaPair)}/**
     * The base constructor for DynamicColor.
     *
     * _Strongly_ prefer using one of the convenience constructors. This class is
     * arguably too flexible to ensure it can support any scenario. Functional
     * arguments allow  overriding without risks that come with subclasses.
     *
     * For example, the default behavior of adjust tone at max contrast
     * to be at a 7.0 ratio with its background is principled and
     * matches accessibility guidance. That does not mean it's the desired
     * approach for _every_ design system, and every color pairing,
     * always, in every case.
     *
     * @param name The name of the dynamic color. Defaults to empty.
     * @param palette Function that provides a TonalPalette given
     * DynamicScheme. A TonalPalette is defined by a hue and chroma, so this
     * replaces the need to specify hue/chroma. By providing a tonal palette, when
     * contrast adjustments are made, intended chroma can be preserved.
     * @param tone Function that provides a tone, given a DynamicScheme.
     * @param isBackground Whether this dynamic color is a background, with
     * some other color as the foreground. Defaults to false.
     * @param background The background of the dynamic color (as a function of a
     *     `DynamicScheme`), if it exists.
     * @param secondBackground A second background of the dynamic color (as a
     *     function of a `DynamicScheme`), if it
     * exists.
     * @param contrastCurve A `ContrastCurve` object specifying how its contrast
     * against its background should behave in various contrast levels options.
     * @param toneDeltaPair A `ToneDeltaPair` object specifying a tone delta
     * constraint between two colors. One of them must be the color being
     * constructed.
     */constructor(e,t,i,o,r,n,s,a){if(this.name=e,this.palette=t,this.tone=i,this.isBackground=o,this.background=r,this.secondBackground=n,this.contrastCurve=s,this.toneDeltaPair=a,this.hctCache=new Map,!r&&n)throw Error(`Color ${e} has secondBackgrounddefined, but background is not defined.`);if(!r&&s)throw Error(`Color ${e} has contrastCurvedefined, but background is not defined.`);if(r&&!s)throw Error(`Color ${e} has backgrounddefined, but contrastCurve is not defined.`)}/**
     * Return a ARGB integer (i.e. a hex code).
     *
     * @param scheme Defines the conditions of the user interface, for example,
     * whether or not it is dark mode or light mode, and what the desired
     * contrast level is.
     */getArgb(e){return this.getHct(e).toInt()}/**
     * Return a color, expressed in the HCT color space, that this
     * DynamicColor is under the conditions in scheme.
     *
     * @param scheme Defines the conditions of the user interface, for example,
     * whether or not it is dark mode or light mode, and what the desired
     * contrast level is.
     */getHct(e){let t=this.hctCache.get(e);if(null!=t)return t;let i=this.getTone(e),o=this.palette(e).getHct(i);return this.hctCache.size>4&&this.hctCache.clear(),this.hctCache.set(e,o),o}/**
     * Return a tone, T in the HCT color space, that this DynamicColor is under
     * the conditions in scheme.
     *
     * @param scheme Defines the conditions of the user interface, for example,
     * whether or not it is dark mode or light mode, and what the desired
     * contrast level is.
     */getTone(e){let t=e.contrastLevel<0;// Case 1: dual foreground, pair of colors with delta constraint.
if(this.toneDeltaPair){let i=this.toneDeltaPair(e),o=i.roleA,r=i.roleB,n=i.delta,s=i.polarity,a=i.stayTogether,l=this.background(e),d=l.getTone(e),c="nearer"===s||"lighter"===s&&!e.isDark||"darker"===s&&e.isDark,h=c?o:r,u=c?r:o,p=this.name===h.name,m=e.isDark?1:-1,f=h.contrastCurve.getContrast(e.contrastLevel),v=u.contrastCurve.getContrast(e.contrastLevel),g=h.tone(e),b=nI.ratioOfTones(d,g)>=f?g:nA.foregroundTone(d,f),y=u.tone(e),w=nI.ratioOfTones(d,y)>=v?y:nA.foregroundTone(d,v);// Returns `nTone` if this color is `nearer`, otherwise `fTone`.
return t&&(// If decreasing contrast, adjust color to the "bare minimum"
// that satisfies contrast.
b=nA.foregroundTone(d,f),w=nA.foregroundTone(d,v)),(w-b)*m>=n||(// 2nd round: expand farther to match delta.
(w=nl(0,100,b+n*m))-b)*m>=n||(b=nl(0,100,w-n*m)),50<=b&&b<60?w=m>0?Math.max(w,(b=60)+n*m):Math.min(w,(b=49)+n*m):50<=w&&w<60&&(w=a?m>0?Math.max(w,(b=60)+n*m):Math.min(w,(b=49)+n*m):m>0?60:49),p?b:w}{// Case 2: No contrast pair; just solve for itself.
let i=this.tone(e);if(null==this.background)return i;// No adjustment for colors with no background.
let o=this.background(e).getTone(e),r=this.contrastCurve.getContrast(e.contrastLevel);if(nI.ratioOfTones(o,i)>=r||(i=nA.foregroundTone(o,r)),t&&(i=nA.foregroundTone(o,r)),this.isBackground&&50<=i&&i<60&&(i=nI.ratioOfTones(49,o)>=r?49:60),this.secondBackground){// Case 3: Adjust for dual backgrounds.
let[t,o]=[this.background,this.secondBackground],[n,s]=[t(e).getTone(e),o(e).getTone(e)],[a,l]=[Math.max(n,s),Math.min(n,s)];if(nI.ratioOfTones(a,i)>=r&&nI.ratioOfTones(l,i)>=r)return i;// The darkest light tone that satisfies the desired ratio,
// or -1 if such ratio cannot be reached.
let d=nI.lighter(a,r),c=nI.darker(l,r),h=[];-1!==d&&h.push(d),-1!==c&&h.push(c);let u=nA.tonePrefersLightForeground(n)||nA.tonePrefersLightForeground(s);return u?d<0?100:d:1===h.length?h[0]:c<0?0:c}return i}}/**
     * Given a background tone, find a foreground tone, while ensuring they reach
     * a contrast ratio that is as close to [ratio] as possible.
     *
     * @param bgTone Tone in HCT. Range is 0 to 100, undefined behavior when it
     *     falls outside that range.
     * @param ratio The contrast ratio desired between bgTone and the return
     *     value.
     */static foregroundTone(e,t){let i=nI.lighterUnsafe(e,t),o=nI.darkerUnsafe(e,t),r=nI.ratioOfTones(i,e),n=nI.ratioOfTones(o,e),s=nA.tonePrefersLightForeground(e);if(!s)return n>=t||n>=r?o:i;{// This handles an edge case where the initial contrast ratio is high
// (ex. 13.0), and the ratio passed to the function is that high
// ratio, and both the lighter and darker ratio fails to pass that
// ratio.
//
// This was observed with Tonal Spot's On Primary Container turning
// black momentarily between high and max contrast in light mode. PC's
// standard tone was T90, OPC's was T10, it was light mode, and the
// contrast value was 0.6568521221032331.
let e=.1>Math.abs(r-n)&&r<t&&n<t;return r>=t||r>=n||e?i:o}}/**
     * Returns whether [tone] prefers a light foreground.
     *
     * People prefer white foregrounds on ~T60-70. Observed over time, and also
     * by Andrew Somers during research for APCA.
     *
     * T60 used as to create the smallest discontinuity possible when skipping
     * down to T49 in order to ensure light foregrounds.
     * Since `tertiaryContainer` in dark monochrome scheme requires a tone of
     * 60, it should not be adjusted. Therefore, 60 is excluded here.
     */static tonePrefersLightForeground(e){return 60>Math.round(e)}/**
     * Returns whether [tone] can reach a contrast ratio of 4.5 with a lighter
     * color.
     */static toneAllowsLightForeground(e){return 49>=Math.round(e)}/**
     * Adjust a tone such that white has 4.5 contrast, if the tone is
     * reasonably close to supporting it.
     */static enableLightForeground(e){return nA.tonePrefersLightForeground(e)&&!nA.toneAllowsLightForeground(e)?49:e}}(t=e||(e={}))[t.MONOCHROME=0]="MONOCHROME",t[t.NEUTRAL=1]="NEUTRAL",t[t.TONAL_SPOT=2]="TONAL_SPOT",t[t.VIBRANT=3]="VIBRANT",t[t.EXPRESSIVE=4]="EXPRESSIVE",t[t.FIDELITY=5]="FIDELITY",t[t.CONTENT=6]="CONTENT",t[t.RAINBOW=7]="RAINBOW",t[t.FRUIT_SALAD=8]="FRUIT_SALAD";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nD{/**
     * Creates a `ContrastCurve` object.
     *
     * @param low Contrast requirement for contrast level -1.0
     * @param normal Contrast requirement for contrast level 0.0
     * @param medium Contrast requirement for contrast level 0.5
     * @param high Contrast requirement for contrast level 1.0
     */constructor(e,t,i,o){this.low=e,this.normal=t,this.medium=i,this.high=o}/**
     * Returns the contrast ratio at a given contrast level.
     *
     * @param contrastLevel The contrast level. 0.0 is the default (normal);
     * -1.0 is the lowest; 1.0 is the highest.
     * @return The contrast ratio, a number between 1.0 and 21.0.
     */getContrast(e){var t,i,o,r,n,s,a,l,d;return e<=-1?this.low:e<0?(t=this.low,i=this.normal,(1-(o=(e- -1)/1))*t+o*i):e<.5?(r=this.normal,n=this.medium,(1-(s=(e-0)/.5))*r+s*n):e<1?(a=this.medium,l=this.high,(1-(d=(e-.5)/.5))*a+d*l):this.high}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * Documents a constraint between two DynamicColors, in which their tones must
 * have a certain distance from each other.
 *
 * Prefer a DynamicColor with a background, this is for special cases when
 * designers want tonal distance, literally contrast, between two colors that
 * don't have a background / foreground relationship or a contrast guarantee.
 */class nP{/**
     * Documents a constraint in tone distance between two DynamicColors.
     *
     * The polarity is an adjective that describes "A", compared to "B".
     *
     * For instance, ToneDeltaPair(A, B, 15, 'darker', stayTogether) states that
     * A's tone should be at least 15 darker than B's.
     *
     * 'nearer' and 'farther' describes closeness to the surface roles. For
     * instance, ToneDeltaPair(A, B, 10, 'nearer', stayTogether) states that A
     * should be 10 lighter than B in light mode, and 10 darker than B in dark
     * mode.
     *
     * @param roleA The first role in a pair.
     * @param roleB The second role in a pair.
     * @param delta Required difference between tones. Absolute value, negative
     * values have undefined behavior.
     * @param polarity The relative relation between tones of roleA and roleB,
     * as described above.
     * @param stayTogether Whether these two roles should stay on the same side of
     * the "awkward zone" (T50-59). This is necessary for certain cases where
     * one role has two backgrounds.
     */constructor(e,t,i,o,r){this.roleA=e,this.roleB=t,this.delta=i,this.polarity=o,this.stayTogether=r}}function nT(t){return t.variant===e.FIDELITY||t.variant===e.CONTENT}function nM(t){return t.variant===e.MONOCHROME}function n_(e,t){let i=e.inViewingConditions(nx.make(/*whitePoint=*/void 0,/*adaptingLuminance=*/void 0,/*backgroundLstar=*/t.isDark?30:80,/*surround=*/void 0,/*discountingIlluminant=*/void 0));return nA.tonePrefersLightForeground(e.tone)&&!nA.toneAllowsLightForeground(i.tone)?nA.enableLightForeground(e.tone):nA.enableLightForeground(i.tone)}class nL{static highestSurface(e){return e.isDark?nL.surfaceBright:nL.surfaceDim}}nL.contentAccentToneDelta=15,nL.primaryPaletteKeyColor=nA.fromPalette({name:"primary_palette_key_color",palette:e=>e.primaryPalette,tone:e=>e.primaryPalette.keyColor.tone}),nL.secondaryPaletteKeyColor=nA.fromPalette({name:"secondary_palette_key_color",palette:e=>e.secondaryPalette,tone:e=>e.secondaryPalette.keyColor.tone}),nL.tertiaryPaletteKeyColor=nA.fromPalette({name:"tertiary_palette_key_color",palette:e=>e.tertiaryPalette,tone:e=>e.tertiaryPalette.keyColor.tone}),nL.neutralPaletteKeyColor=nA.fromPalette({name:"neutral_palette_key_color",palette:e=>e.neutralPalette,tone:e=>e.neutralPalette.keyColor.tone}),nL.neutralVariantPaletteKeyColor=nA.fromPalette({name:"neutral_variant_palette_key_color",palette:e=>e.neutralVariantPalette,tone:e=>e.neutralVariantPalette.keyColor.tone}),nL.background=nA.fromPalette({name:"background",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0}),nL.onBackground=nA.fromPalette({name:"on_background",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>nL.background,contrastCurve:new nD(3,3,4.5,7)}),nL.surface=nA.fromPalette({name:"surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0}),nL.surfaceDim=nA.fromPalette({name:"surface_dim",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:87,isBackground:!0}),nL.surfaceBright=nA.fromPalette({name:"surface_bright",palette:e=>e.neutralPalette,tone:e=>e.isDark?24:98,isBackground:!0}),nL.surfaceContainerLowest=nA.fromPalette({name:"surface_container_lowest",palette:e=>e.neutralPalette,tone:e=>e.isDark?4:100,isBackground:!0}),nL.surfaceContainerLow=nA.fromPalette({name:"surface_container_low",palette:e=>e.neutralPalette,tone:e=>e.isDark?10:96,isBackground:!0}),nL.surfaceContainer=nA.fromPalette({name:"surface_container",palette:e=>e.neutralPalette,tone:e=>e.isDark?12:94,isBackground:!0}),nL.surfaceContainerHigh=nA.fromPalette({name:"surface_container_high",palette:e=>e.neutralPalette,tone:e=>e.isDark?17:92,isBackground:!0}),nL.surfaceContainerHighest=nA.fromPalette({name:"surface_container_highest",palette:e=>e.neutralPalette,tone:e=>e.isDark?22:90,isBackground:!0}),nL.onSurface=nA.fromPalette({name:"on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>nL.highestSurface(e),contrastCurve:new nD(4.5,7,11,21)}),nL.surfaceVariant=nA.fromPalette({name:"surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:90,isBackground:!0}),nL.onSurfaceVariant=nA.fromPalette({name:"on_surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?80:30,background:e=>nL.highestSurface(e),contrastCurve:new nD(3,4.5,7,11)}),nL.inverseSurface=nA.fromPalette({name:"inverse_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:20}),nL.inverseOnSurface=nA.fromPalette({name:"inverse_on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?20:95,background:e=>nL.inverseSurface,contrastCurve:new nD(4.5,7,11,21)}),nL.outline=nA.fromPalette({name:"outline",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?60:50,background:e=>nL.highestSurface(e),contrastCurve:new nD(1.5,3,4.5,7)}),nL.outlineVariant=nA.fromPalette({name:"outline_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:80,background:e=>nL.highestSurface(e),contrastCurve:new nD(1,1,3,7)}),nL.shadow=nA.fromPalette({name:"shadow",palette:e=>e.neutralPalette,tone:e=>0}),nL.scrim=nA.fromPalette({name:"scrim",palette:e=>e.neutralPalette,tone:e=>0}),nL.surfaceTint=nA.fromPalette({name:"surface_tint",palette:e=>e.primaryPalette,tone:e=>e.isDark?80:40,isBackground:!0}),nL.primary=nA.fromPalette({name:"primary",palette:e=>e.primaryPalette,tone:e=>nM(e)?e.isDark?100:0:e.isDark?80:40,isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(3,4.5,7,11),toneDeltaPair:e=>new nP(nL.primaryContainer,nL.primary,15,"nearer",!1)}),nL.onPrimary=nA.fromPalette({name:"on_primary",palette:e=>e.primaryPalette,tone:e=>nM(e)?e.isDark?10:90:e.isDark?20:100,background:e=>nL.primary,contrastCurve:new nD(4.5,7,11,21)}),nL.primaryContainer=nA.fromPalette({name:"primary_container",palette:e=>e.primaryPalette,tone:e=>nT(e)?n_(e.sourceColorHct,e):nM(e)?e.isDark?85:25:e.isDark?30:90,isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(1,1,3,7),toneDeltaPair:e=>new nP(nL.primaryContainer,nL.primary,15,"nearer",!1)}),nL.onPrimaryContainer=nA.fromPalette({name:"on_primary_container",palette:e=>e.primaryPalette,tone:e=>nT(e)?nA.foregroundTone(nL.primaryContainer.tone(e),4.5):nM(e)?e.isDark?0:100:e.isDark?90:10,background:e=>nL.primaryContainer,contrastCurve:new nD(4.5,7,11,21)}),nL.inversePrimary=nA.fromPalette({name:"inverse_primary",palette:e=>e.primaryPalette,tone:e=>e.isDark?40:80,background:e=>nL.inverseSurface,contrastCurve:new nD(3,4.5,7,11)}),nL.secondary=nA.fromPalette({name:"secondary",palette:e=>e.secondaryPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(3,4.5,7,11),toneDeltaPair:e=>new nP(nL.secondaryContainer,nL.secondary,15,"nearer",!1)}),nL.onSecondary=nA.fromPalette({name:"on_secondary",palette:e=>e.secondaryPalette,tone:e=>nM(e)?e.isDark?10:100:e.isDark?20:100,background:e=>nL.secondary,contrastCurve:new nD(4.5,7,11,21)}),nL.secondaryContainer=nA.fromPalette({name:"secondary_container",palette:e=>e.secondaryPalette,tone:e=>{let t=e.isDark?30:90;if(nM(e))return e.isDark?30:85;if(!nT(e))return t;let i=function(e,t,i,o){let r=i,n=nE.from(e,t,i);if(n.chroma<t){let i=n.chroma;for(;n.chroma<t;){r+=o?-1:1;let s=nE.from(e,t,r);if(i>s.chroma||.4>Math.abs(s.chroma-t))break;let a=Math.abs(s.chroma-t),l=Math.abs(n.chroma-t);a<l&&(n=s),i=Math.max(i,s.chroma)}}return r}(e.secondaryPalette.hue,e.secondaryPalette.chroma,t,!e.isDark);return n_(e.secondaryPalette.getHct(i),e)},isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(1,1,3,7),toneDeltaPair:e=>new nP(nL.secondaryContainer,nL.secondary,15,"nearer",!1)}),nL.onSecondaryContainer=nA.fromPalette({name:"on_secondary_container",palette:e=>e.secondaryPalette,tone:e=>nT(e)?nA.foregroundTone(nL.secondaryContainer.tone(e),4.5):e.isDark?90:10,background:e=>nL.secondaryContainer,contrastCurve:new nD(4.5,7,11,21)}),nL.tertiary=nA.fromPalette({name:"tertiary",palette:e=>e.tertiaryPalette,tone:e=>nM(e)?e.isDark?90:25:e.isDark?80:40,isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(3,4.5,7,11),toneDeltaPair:e=>new nP(nL.tertiaryContainer,nL.tertiary,15,"nearer",!1)}),nL.onTertiary=nA.fromPalette({name:"on_tertiary",palette:e=>e.tertiaryPalette,tone:e=>nM(e)?e.isDark?10:90:e.isDark?20:100,background:e=>nL.tertiary,contrastCurve:new nD(4.5,7,11,21)}),nL.tertiaryContainer=nA.fromPalette({name:"tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>{if(nM(e))return e.isDark?60:49;if(!nT(e))return e.isDark?30:90;let t=n_(e.tertiaryPalette.getHct(e.sourceColorHct.tone),e),i=e.tertiaryPalette.getHct(t);return nS.fixIfDisliked(i).tone},isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(1,1,3,7),toneDeltaPair:e=>new nP(nL.tertiaryContainer,nL.tertiary,15,"nearer",!1)}),nL.onTertiaryContainer=nA.fromPalette({name:"on_tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>nM(e)?e.isDark?0:100:nT(e)?nA.foregroundTone(nL.tertiaryContainer.tone(e),4.5):e.isDark?90:10,background:e=>nL.tertiaryContainer,contrastCurve:new nD(4.5,7,11,21)}),nL.error=nA.fromPalette({name:"error",palette:e=>e.errorPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(3,4.5,7,11),toneDeltaPair:e=>new nP(nL.errorContainer,nL.error,15,"nearer",!1)}),nL.onError=nA.fromPalette({name:"on_error",palette:e=>e.errorPalette,tone:e=>e.isDark?20:100,background:e=>nL.error,contrastCurve:new nD(4.5,7,11,21)}),nL.errorContainer=nA.fromPalette({name:"error_container",palette:e=>e.errorPalette,tone:e=>e.isDark?30:90,isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(1,1,3,7),toneDeltaPair:e=>new nP(nL.errorContainer,nL.error,15,"nearer",!1)}),nL.onErrorContainer=nA.fromPalette({name:"on_error_container",palette:e=>e.errorPalette,tone:e=>e.isDark?90:10,background:e=>nL.errorContainer,contrastCurve:new nD(4.5,7,11,21)}),nL.primaryFixed=nA.fromPalette({name:"primary_fixed",palette:e=>e.primaryPalette,tone:e=>nM(e)?40:90,isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(1,1,3,7),toneDeltaPair:e=>new nP(nL.primaryFixed,nL.primaryFixedDim,10,"lighter",!0)}),nL.primaryFixedDim=nA.fromPalette({name:"primary_fixed_dim",palette:e=>e.primaryPalette,tone:e=>nM(e)?30:80,isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(1,1,3,7),toneDeltaPair:e=>new nP(nL.primaryFixed,nL.primaryFixedDim,10,"lighter",!0)}),nL.onPrimaryFixed=nA.fromPalette({name:"on_primary_fixed",palette:e=>e.primaryPalette,tone:e=>nM(e)?100:10,background:e=>nL.primaryFixedDim,secondBackground:e=>nL.primaryFixed,contrastCurve:new nD(4.5,7,11,21)}),nL.onPrimaryFixedVariant=nA.fromPalette({name:"on_primary_fixed_variant",palette:e=>e.primaryPalette,tone:e=>nM(e)?90:30,background:e=>nL.primaryFixedDim,secondBackground:e=>nL.primaryFixed,contrastCurve:new nD(3,4.5,7,11)}),nL.secondaryFixed=nA.fromPalette({name:"secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>nM(e)?80:90,isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(1,1,3,7),toneDeltaPair:e=>new nP(nL.secondaryFixed,nL.secondaryFixedDim,10,"lighter",!0)}),nL.secondaryFixedDim=nA.fromPalette({name:"secondary_fixed_dim",palette:e=>e.secondaryPalette,tone:e=>nM(e)?70:80,isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(1,1,3,7),toneDeltaPair:e=>new nP(nL.secondaryFixed,nL.secondaryFixedDim,10,"lighter",!0)}),nL.onSecondaryFixed=nA.fromPalette({name:"on_secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>10,background:e=>nL.secondaryFixedDim,secondBackground:e=>nL.secondaryFixed,contrastCurve:new nD(4.5,7,11,21)}),nL.onSecondaryFixedVariant=nA.fromPalette({name:"on_secondary_fixed_variant",palette:e=>e.secondaryPalette,tone:e=>nM(e)?25:30,background:e=>nL.secondaryFixedDim,secondBackground:e=>nL.secondaryFixed,contrastCurve:new nD(3,4.5,7,11)}),nL.tertiaryFixed=nA.fromPalette({name:"tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>nM(e)?40:90,isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(1,1,3,7),toneDeltaPair:e=>new nP(nL.tertiaryFixed,nL.tertiaryFixedDim,10,"lighter",!0)}),nL.tertiaryFixedDim=nA.fromPalette({name:"tertiary_fixed_dim",palette:e=>e.tertiaryPalette,tone:e=>nM(e)?30:80,isBackground:!0,background:e=>nL.highestSurface(e),contrastCurve:new nD(1,1,3,7),toneDeltaPair:e=>new nP(nL.tertiaryFixed,nL.tertiaryFixedDim,10,"lighter",!0)}),nL.onTertiaryFixed=nA.fromPalette({name:"on_tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>nM(e)?100:10,background:e=>nL.tertiaryFixedDim,secondBackground:e=>nL.tertiaryFixed,contrastCurve:new nD(4.5,7,11,21)}),nL.onTertiaryFixedVariant=nA.fromPalette({name:"on_tertiary_fixed_variant",palette:e=>e.tertiaryPalette,tone:e=>nM(e)?90:30,background:e=>nL.tertiaryFixedDim,secondBackground:e=>nL.tertiaryFixed,contrastCurve:new nD(3,4.5,7,11)});/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nO{/**
     * @param argb ARGB representation of a color
     * @return Tones matching that color's hue and chroma.
     */static fromInt(e){let t=nE.fromInt(e);return nO.fromHct(t)}/**
     * @param hct Hct
     * @return Tones matching that color's hue and chroma.
     */static fromHct(e){return new nO(e.hue,e.chroma,e)}/**
     * @param hue HCT hue
     * @param chroma HCT chroma
     * @return Tones matching hue and chroma.
     */static fromHueAndChroma(e,t){return new nO(e,t,nO.createKeyColor(e,t))}constructor(e,t,i){this.hue=e,this.chroma=t,this.keyColor=i,this.cache=new Map}static createKeyColor(e,t){let i=nE.from(e,t,50),o=Math.abs(i.chroma-t);// Starting from T50, check T+/-delta to see if they match the requested
// chroma.
//
// Starts from T50 because T50 has the most chroma available, on
// average. Thus it is most likely to have a direct answer and minimize
// iteration.
for(let r=1;// Termination condition rounding instead of minimizing delta to avoid
// case where requested chroma is 16.51, and the closest chroma is 16.49.
// Error is minimized, but when rounded and displayed, requested chroma
// is 17, key color's chroma is 16.
r<50&&Math.round(t)!==Math.round(i.chroma);r+=1){let n=nE.from(e,t,50+r),s=Math.abs(n.chroma-t);s<o&&(o=s,i=n);let a=nE.from(e,t,50-r),l=Math.abs(a.chroma-t);l<o&&(o=l,i=a)}return i}/**
     * @param tone HCT tone, measured from 0 to 100.
     * @return ARGB representation of a color with that tone.
     */tone(e){let t=this.cache.get(e);return void 0===t&&(t=nE.from(this.hue,this.chroma,e).toInt(),this.cache.set(e,t)),t}/**
     * @param tone HCT tone.
     * @return HCT representation of a color with that tone.
     */getHct(e){return nE.fromInt(this.tone(e))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nz{constructor(e){this.sourceColorArgb=e.sourceColorArgb,this.variant=e.variant,this.contrastLevel=e.contrastLevel,this.isDark=e.isDark,this.sourceColorHct=nE.fromInt(e.sourceColorArgb),this.primaryPalette=e.primaryPalette,this.secondaryPalette=e.secondaryPalette,this.tertiaryPalette=e.tertiaryPalette,this.neutralPalette=e.neutralPalette,this.neutralVariantPalette=e.neutralVariantPalette,this.errorPalette=nO.fromHueAndChroma(25,84)}/**
     * Support design spec'ing Dynamic Color by schemes that specify hue
     * rotations that should be applied at certain breakpoints.
     * @param sourceColor the source color of the theme, in HCT.
     * @param hues The "breakpoints", i.e. the hues at which a rotation should
     * be apply.
     * @param rotations The rotation that should be applied when source color's
     * hue is >= the same index in hues array, and <= the hue at the next index
     * in hues array.
     */static getRotatedHue(e,t,i){let o=e.hue;if(t.length!==i.length)throw Error(`mismatch between hue length ${t.length} & rotations ${i.length}`);if(1===i.length)return nc(e.hue+i[0]);let r=t.length;for(let e=0;e<=r-2;e++){let r=t[e],n=t[e+1];if(r<o&&o<n)return nc(o+i[e])}// If this statement executes, something is wrong, there should have been a
// rotation found using the arrays.
return o}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nB extends nz{constructor(t,i,o){super({sourceColorArgb:t.toInt(),variant:e.EXPRESSIVE,contrastLevel:o,isDark:i,primaryPalette:nO.fromHueAndChroma(nc(t.hue+240),40),secondaryPalette:nO.fromHueAndChroma(nz.getRotatedHue(t,nB.hues,nB.secondaryRotations),24),tertiaryPalette:nO.fromHueAndChroma(nz.getRotatedHue(t,nB.hues,nB.tertiaryRotations),32),neutralPalette:nO.fromHueAndChroma(t.hue+15,8),neutralVariantPalette:nO.fromHueAndChroma(t.hue+15,12)})}}/**
 * Hues (in degrees) used at breakpoints such that designers can specify a
 * hue rotation that occurs at a given break point.
 */nB.hues=[0,21,51,121,151,191,271,321,360],/**
 * Hue rotations (in degrees) of the Secondary [TonalPalette],
 * corresponding to the breakpoints in [hues].
 */nB.secondaryRotations=[45,95,45,20,45,90,45,45,45],/**
 * Hue rotations (in degrees) of the Tertiary [TonalPalette],
 * corresponding to the breakpoints in [hues].
 */nB.tertiaryRotations=[120,120,20,45,20,15,20,120,120];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nV extends nz{constructor(t,i,o){super({sourceColorArgb:t.toInt(),variant:e.VIBRANT,contrastLevel:o,isDark:i,primaryPalette:nO.fromHueAndChroma(t.hue,200),secondaryPalette:nO.fromHueAndChroma(nz.getRotatedHue(t,nV.hues,nV.secondaryRotations),24),tertiaryPalette:nO.fromHueAndChroma(nz.getRotatedHue(t,nV.hues,nV.tertiaryRotations),32),neutralPalette:nO.fromHueAndChroma(t.hue,10),neutralVariantPalette:nO.fromHueAndChroma(t.hue,12)})}}/**
 * Hues (in degrees) used at breakpoints such that designers can specify a
 * hue rotation that occurs at a given break point.
 */nV.hues=[0,41,61,101,131,181,251,301,360],/**
 * Hue rotations (in degrees) of the Secondary [TonalPalette],
 * corresponding to the breakpoints in [hues].
 */nV.secondaryRotations=[18,15,10,12,15,18,15,12,12],/**
 * Hue rotations (in degrees) of the Tertiary [TonalPalette],
 * corresponding to the breakpoints in [hues].
 */nV.tertiaryRotations=[35,30,20,25,30,35,30,25,25];/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nN={desired:4,fallbackColorARGB:4282549748,filter:!0};function nF(e,t){return e.score>t.score?-1:e.score<t.score?1:0}class nH{constructor(){}/**
     * Given a map with keys of colors and values of how often the color appears,
     * rank the colors based on suitability for being used for a UI theme.
     *
     * @param colorsToPopulation map with keys of colors and values of how often
     *     the color appears, usually from a source image.
     * @param {ScoreOptions} options optional parameters.
     * @return Colors sorted by suitability for a UI theme. The most suitable
     *     color is the first item, the least suitable is the last. There will
     *     always be at least one color returned. If all the input colors
     *     were not suitable for a theme, a default fallback color will be
     *     provided, Google Blue.
     */static score(e,t){let{desired:i,fallbackColorARGB:o,filter:r}={...nN,...t},n=[],s=Array(360).fill(0),a=0;for(let[t,i]of e.entries()){let e=nE.fromInt(t);n.push(e);let o=Math.floor(e.hue);s[o]+=i,a+=i}// Hues with more usage in neighboring 30 degree slice get a larger number.
let l=Array(360).fill(0);for(let e=0;e<360;e++){let t=s[e]/a;for(let i=e-14;i<e+16;i++){let e=nd(i);l[e]+=t}}// Scores each HCT color based on usage and chroma, while optionally
// filtering out values that do not have enough chroma or usage.
let d=[];for(let e of n){let t=nd(Math.round(e.hue)),i=l[t];if(r&&(e.chroma<nH.CUTOFF_CHROMA||i<=nH.CUTOFF_EXCITED_PROPORTION))continue;let o=100*i*nH.WEIGHT_PROPORTION,n=e.chroma<nH.TARGET_CHROMA?nH.WEIGHT_CHROMA_BELOW:nH.WEIGHT_CHROMA_ABOVE,s=(e.chroma-nH.TARGET_CHROMA)*n,a=o+s;d.push({hct:e,score:a})}// Sorted so that colors with higher scores come first.
d.sort(nF);// Iterates through potential hue differences in degrees in order to select
// the colors with the largest distribution of hues possible. Starting at
// 90 degrees(maximum difference for 4 colors) then decreasing down to a
// 15 degree minimum.
let c=[];for(let e=90;e>=15;e--){for(let{hct:t}of(c.length=0,d)){let o=c.find(i=>180-Math.abs(Math.abs(t.hue-i.hue)-180)<e);if(o||c.push(t),c.length>=i)break}if(c.length>=i)break}let h=[];for(let e of(0===c.length&&h.push(o),c))h.push(e.toInt());return h}}nH.TARGET_CHROMA=48,nH.WEIGHT_PROPORTION=.7,nH.WEIGHT_CHROMA_ABOVE=.3,nH.WEIGHT_CHROMA_BELOW=.1,nH.CUTOFF_CHROMA=5,nH.CUTOFF_EXCITED_PROPORTION=.01;//# sourceMappingURL=index.2dcc7d23.js.map

//# sourceMappingURL=index.2dcc7d23.js.map
