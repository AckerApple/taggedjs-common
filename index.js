var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};function n(e){return e?.wrapper?.parentWrap.original instanceof Function}function r(e){return o(e)||s(e)}function o(e){const t=e;return!0===t?.isTemplater&&void 0===t.wrapper}function s(e){const t=e;return!0===t?.isTagClass}function a(e){return!(!0!==e?.isSubject&&!e?.subscribe)}function i(e){return e instanceof Array&&e.every((e=>s(e)||o(e)))}function c(e,t,n){const r=[...t],o=r.shift(),s=e=>{if(r.length)return c(e,r,n);n(e)};let a=s;const i=o(e,{setHandler:e=>a=e,next:s});a(i)}e.d(t,{xH:()=>Ze,Ly:()=>et,TY:()=>He});class l{value;onSubscription;methods=[];isSubject=!0;subscribers=[];subscribeWith;constructor(e,t){this.value=e,this.onSubscription=t}subscribe(e){const t=function(e,t){const n=l.globalSubCount$;l.globalSubCount$.set(n.value+1);const r=()=>{r.unsubscribe()};return r.callback=t,r.subscriptions=[],r.unsubscribe=()=>(function(e,t){const n=e.findIndex((e=>e.callback===t));-1!==n&&e.splice(n,1)}(e.subscribers,t),l.globalSubCount$.set(n.value-1),r.unsubscribe=()=>r,r.subscriptions.forEach((e=>e.unsubscribe())),r),r.add=e=>(r.subscriptions.push(e),r),r.next=e=>{t(e,r)},r}(this,e),n=this.subscribeWith;if(n){if(this.methods.length){const n=e;e=e=>{c(e,this.methods,(e=>n(e,t)))}}return n(e)}this.subscribers.push(t);const r=l.globalSubCount$.value;return l.globalSubCount$.set(r+1),this.onSubscription&&this.onSubscription(t),t}set(e){this.value=e,this.subscribers.forEach((t=>{t.callback(e,t)}))}next=this.set;toPromise(){return new Promise(((e,t)=>{this.subscribe(((t,n)=>{n.unsubscribe(),e(t)}))}))}toCallback(e){return this.subscribe(((t,n)=>{n.unsubscribe(),e(t)})),this}pipe(...e){const t=new l;return t.methods=e,t.subscribeWith=e=>this.subscribe(e),t}static all(e){return function(e){const t=new l;return t.subscribeWith=t=>{const n=[],r=[],o=(o,s)=>{if(n[s]=!0,r[s]=o,n.length===e.length){for(let e=n.length-1;e>=0;--e)if(!n[e])return;t(r,a)}},s=[...e],a=s.shift().subscribe((e=>o(e,0))),i=s.map(((e,t)=>e.subscribe((e=>o(e,t+1)))));return a.subscriptions=i,a},t}(e.map((e=>a(e)?e:new l(e,(t=>(t.next(e),t))))))}static globalSubCount$=new l(0)}class u extends l{value;constructor(e){super(e),this.value=e}subscribe(e){const t=super.subscribe(e);return e(this.value,t),t}}function p(){return g.memory.stateConfig.tagSupport}function g(e){const t={beforeRender:e.beforeRender||(()=>{}),beforeRedraw:e.beforeRedraw||(()=>{}),afterRender:e.afterRender||(()=>{}),beforeDestroy:e.beforeDestroy||(()=>{})};g.tagUse.push(t)}g.tagUse=[],g.memory={};class d extends Error{details;constructor(e,t,n={}){super(e),this.name=d.name,this.details={...n,errorCode:t}}}class f extends d{constructor(e,t){super(e,"array-no-key-error",t),this.name=f.name}}class m extends d{constructor(e,t){super(e,"state-mismatch-error",t),this.name=m.name}}class h extends d{constructor(e,t){super(e,"sync-callback-error",t),this.name=h.name}}g.memory.stateConfig={array:[]};const b=e=>function(e){const t=e.memory.state,n=g.memory.stateConfig;n.rearray=[],t?.length&&(t.forEach((e=>y(e))),n.rearray.push(...t)),n.tagSupport=e}(e);function y(e){const t=e.callback;if(!t)return e.defaultValue;const[n,r]=function(e){const t=e(v),[n]=t,[r]=e(n);return[n,r]}(t);if(r!==v){const o='State property not used correctly. Second item in array is not setting value as expected.\n\nFor "let" state use `let name = state(default)(x => [name, name = x])`\n\nFor "const" state use `const name = state(default)()`\n\nProblem state:\n'+(t?t.toString():JSON.stringify(e))+"\n";throw console.error(o,{state:e,callback:t,value:n,checkValue:r}),new Error(o)}return n}g({beforeRender:b,beforeRedraw:b,afterRender:e=>{const t=e.memory,n=g.memory.stateConfig,r=n.rearray;if(r.length&&r.length!==n.array.length){const t=`States lengths have changed ${r.length} !== ${n.array.length}. State tracking requires the same amount of function calls every render. Typically this errors is thrown when a state like function call occurs only for certain conditions or when a function is intended to be wrapped with a tag() call`,o=e.templater?.wrapper,s={oldStates:n.array,newStates:n.rearray,tagFunction:o.parentWrap.original},a=new m(t,s);throw console.warn(t,s),a}n.tagSupport,delete n.rearray,delete n.tagSupport,t.state.length=0,t.state.push(...n.array),t.state.forEach((e=>e.lastValue=y(e))),n.array=[]}});class v{}function w(e,t){e.forEach(((e,n)=>{const r=e.get(),o=t[n].callback;o&&o(r),t[n].lastValue=r}))}function S(e){const t=g.memory.stateConfig;let n;const r=t.rearray[t.array.length];if(r){let e=y(r);n=t=>[e,e=t];const o={get:()=>y(o),callback:n,lastValue:e,defaultValue:r.defaultValue};return t.array.push(o),e}let o=(e instanceof Function?e:()=>e)();if(o instanceof Function){const e=t.array,n=t.tagSupport,r=o;o=(...t)=>{const o=n.global.newest.memory.state;w(o,e);const s=r(...t);return w(e,o),s},o.original=r}n=e=>[o,o=e];const s={get:()=>y(s),callback:n,lastValue:o,defaultValue:o};return t.array.push(s),o}const C=e=>e,E=(e,t,{init:n,before:r=(()=>!0),final:o=C}={})=>{let s=S({pastResult:void 0,values:void 0});const a=s.values;if(void 0===a){if(!r(e))return s.values=e,s.pastResult;const i=(n||t)(e,a);return s.pastResult=o(i),s.values=e,s.pastResult}if(e.every(((e,t)=>e===a[t])))return s.pastResult;if(!r(e))return s.values=e,s.pastResult;const i=t(e,a);return s.pastResult=o(i),a.length=0,a.push(...e),s.pastResult};function T(e,t){return Object.defineProperty(t,"noInit",{get(){const t=e();return t.setup.init=()=>{},t}}),Object.defineProperty(t,"asSubject",{get(){const t=e(),n=(e,n)=>{const r=S((()=>p().memory.state)),o=S((()=>new u(void 0)));return E(e,((e,t)=>{const s=n(e,t);r.length&&w(g.memory.stateConfig.array,r),o.set(s)}),t.setup),o};return n.setup=t.setup,T((()=>n),n),n}}),Object.defineProperty(t,"truthy",{get(){const t=e();return t.setup.before=e=>e.every((e=>e)),t}}),t}function A(e){return j(e,new WeakMap)}function j(e,t){if(null===e||"object"!=typeof e)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e);const n=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));if(t.set(e,n),Array.isArray(e))for(let r=0;r<e.length;r++)n[r]=j(e[r],t);else for(const r in e)e.hasOwnProperty(r)&&(n[r]=j(e[r],t));return n}function x(e,t){return B(e,t,new WeakMap)}function B(e,t,n){return!!(e===t||(r=e,o=t,r instanceof Function&&o instanceof Function&&r.toString()===o.toString()))||!!n.has(e)||"object"==typeof e&&"object"==typeof t&&(e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():(n.set(e,0),Array.isArray(e)&&Array.isArray(t)?function(e,t,n){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(!B(e[r],t[r],n))return!1;return!0}(e,t,n):!Array.isArray(e)&&!Array.isArray(t)&&function(e,t,n){const r=Object.keys(e),o=Object.keys(t);if(0===r.length&&0===o.length)return!0;if(r.length!==o.length)return!1;for(const s of r)if(!o.includes(s)||!B(e[s],t[s],n))return!1;return!0}(e,t,n)));var r,o}function R(e,t){const n=g.memory.providerConfig;n.ownerSupport=t,e.global.providers.length&&(n.providers.length=0,n.providers.push(...e.global.providers))}function N(e){e.global.providers.filter((e=>!x(e.instance,e.clone))).forEach((t=>{!function(e,t){F(e,t).forEach((({tagSupport:e,renderCount:t,provider:n})=>{if(!e.global.deleted)return t===e.global.renderCount?(n.clone=A(n.instance),_(e,!1)):void 0}))}(e.getAppTagSupport(),t),t.clone=A(t.instance)}))}function F(e,t,n=[]){const r=e.global,o=r.providers.find((e=>e.constructMethod.compareTo===t.constructMethod.compareTo));return o&&n.push({tagSupport:e,renderCount:r.renderCount,provider:o}),e.childTags.forEach((e=>F(e,t,n))),n}function k(e,t){const n=e.templater,r=t.templater,o=n?.tag||e,s=r.tag,a=o.strings,i=t.strings||s.strings;return a.length===i.length&&(!!a.every(((e,t)=>i[t]===e))&&function(e,t){if(!(e.length===t.length))return!1;return!!t.every(((t,n)=>{const r=e[n];return!(t instanceof Function&&r instanceof Function)||!(t.toString()!==r.toString())}))}(e.values||o.values,t.values||s.values))}function P(e){e.global.oldest.destroy(),V(e),e.global.context={}}function V(e){delete e.global.oldest,delete e.global.newest}function O(e,t){g.tagUse.forEach((n=>n.beforeRender(e,t)))}function $(e,t){g.tagUse.forEach((n=>n.afterRender(e,t))),g.memory.tagClosed$.next(t)}function W(e,t){g.tagUse.forEach((n=>n.beforeDestroy(e,t)))}function M(e,t,n,r){const o=function(e,t,n,r){const o=e.global.renderCount;!function(e,t,n){const r=n?.ownerTagSupport,o=r||t;if(n){const t=n.memory.state;e.memory.state=[...t],e.global=n.global,function(e,t){g.tagUse.forEach((n=>n.beforeRedraw(e,t)))}(e,n)}else O(e,o),g.memory.providerConfig.ownerSupport=o}(e,r,t);let s=(0,e.templater.wrapper)(e,n);return $(e,r),s.global.renderCount>o+1?e.global.newest:(e.global.newest=s,s)}(e,t,n,r);!t||k(t,o)||function(e,t,n){const r=e.global,o=r.insertBefore;P(e),t.global={...r};const s=t.global;s.insertBefore=o,s.deleted=!1,delete s.oldest,delete s.newest,delete n.tagSupport}(t,o,n);const s=t?.ownerTagSupport;return o.ownerTagSupport=r||s,o}function _(e,t){const n=e.global,r=e.templater;if(!r.wrapper){const t=e.ownerTagSupport;return++n.renderCount,_(t,!0)}const o=e.subject;let s,a=!1;if(t&&e&&(s=e.ownerTagSupport,s)){const t=r.props,n=e.propsConfig.latestCloned;a=!t.every(((e,t)=>x(e,n[t])))}const i=function(e,t,n,r){const o=r.tagSupport,s=o.global;t.global=s;const a=s.renderCount;N(e);const i=s.newest;if(a!==s.renderCount)return e.updateBy(i),i;const c=M(t,i||o||s.oldest,r,n),l=s.oldest||e;return c.global.oldest=l,k(i,c)&&(r.tagSupport=c,l.updateBy(c)),c}(e.global.oldest,e,s,o);return s&&a?(_(s,!0),i):i}T((()=>function(e){const t=(t,n)=>E(t,n,e);return t.setup=e,T((()=>t),t),t}({})),((e,t)=>E(e,t))),g.memory.providerConfig={providers:[],ownerSupport:void 0},g({beforeRender:(e,t)=>{R(e,t)},beforeRedraw:(e,t)=>{R(e,t.ownerTagSupport)},afterRender:e=>{const t=g.memory.providerConfig;e.global.providers=[...t.providers],t.providers.length=0}}),g.memory.tagClosed$=new l(void 0,(e=>{p()||e.next()}));let L=e=>(e,t,n,r,o,s)=>{throw new h("Callback function was called immediately in sync and must instead be call async")};const D=L;function I(e){const t=g.memory.stateConfig.array;L=n=>(...r)=>e.global.callbackMaker?function(e,t,n,...r){const o=e.memory.state;w(o,n);const s=t(...r);return w(n,o),_(e,!1),s instanceof Promise&&s.finally((()=>{w(n,o),_(e,!1)})),s}(e,n,t,...r):n(...r)}function U(e){g.memory.currentSupport=e}function J(e){g.memory.destroyCurrentSupport=e}function H(e){g.memory.childrenCurrentSupport=e}g({beforeRender:e=>I(e),beforeRedraw:e=>I(e),afterRender:e=>{e.global.callbackMaker=!0,L=D}}),g({beforeRender:e=>U(e),beforeRedraw:e=>U(e)}),g({beforeRender:e=>J(e),beforeRedraw:e=>J(e),beforeDestroy:e=>{const t=e.global.destroyCallback;t&&t()}}),g({beforeRender:e=>H(e),beforeRedraw:e=>H(e)});const G="__tagvar",K="--"+G+"--",q=new RegExp(K,"g");class Y{strings;values;isTagClass=!0;memory={};templater;constructor(e,t){this.strings=e,this.values=t}key(e){return this.memory.arrayValue=e,this}children;html(e,...t){return this.children={strings:e,values:t},this}}class z{props;isTemplater=!0;tagged;wrapper;madeChildIntoSubject=!1;tag;children=new u([]);constructor(e){this.props=e}html(e,...t){const n=new Y(e,t),{childSubject:r,madeSubject:o}=function(e){if(a(e))return{childSubject:e,madeSubject:!1};if(i(e))return{childSubject:new u(e),madeSubject:!0};const t=e;return t?(t.memory.arrayValue=0,{childSubject:new u([t]),madeSubject:!0}):{childSubject:new u([]),madeSubject:!0}}(n);return this.children=r,this.madeChildIntoSubject=o,this}}function X(e,t){if(e.isChildOverride)return e;const n=(n,r)=>function(e,t,n,r){const o=t.global,s=o.renderCount,a=e.bind(n)(...r);if(!(s===o.renderCount)||o.deleted)return a instanceof Promise?a.then((()=>"promise-no-data-ever")):"no-data-ever";const i=_(o.newest,!0);return o.newest=i,a instanceof Promise?a.then((()=>{if(o.deleted)return"promise-no-data-ever";const e=_(o.newest,!0);return o.newest=e,"promise-no-data-ever"})):"no-data-ever"}(e,t,n,r);return n.tagFunction=e,n}function Z(e){return e.map((e=>{const t=e;return n(e)?A(e.props):s(t)||o(t)?Z(t.values):i(t)?Z(t):A(e)}))}function Q(e,t){t.parentNode.insertBefore(e,t.nextSibling)}function ee(e,t){V(e),e.destroy({stagger:t.removed++});const n=e.global.insertBefore;n.parentNode.removeChild(n)}function te(e){const t=e.global.insertBefore,n=e.global,r=n.placeholder;r&&(Q(t,r),delete n.placeholder)}function ne(e,t=[]){for(let n=e.length-1;n>=0;--n){const r=e[n];t.push(r),e.splice(n,1),ne(r.childTags,t)}return t}function re(e,t){const n=e;let r=n.templater;r||(r=new z([]),r.tag=n,n.templater=r);const o=new u(r);return o.tagSupport=new _e(r,t,o),o}function oe(e){const t=document.createTextNode(""),n=e.parentNode;return n.insertBefore(t,e),n.removeChild(e),t}function se(e,t,n){const r=e.split(".");if("style"===r[0]&&(n.style[r[1]]=t),"class"===r[0])return r.shift(),void(t?r.forEach((e=>n.classList.add(e))):r.forEach((e=>n.classList.remove(e))))}const ae=/^\s*{__tagvar/,ie=/}\s*$/;function ce(e){return e&&e.search(ae)>=0&&e.search(ie)>=0}function le(e,t,n,r,o,s){if(ce(t))return function(e,t,n,r,o,s){return pe(e,ue(r,t),n,o,s)}(e,t,n,r,o,s);if(ce(e)){let t;const a=ue(r,e).subscribe((e=>{!function(e,t,n,r,o){if(t&&t!=e&&("string"==typeof t?n.removeAttribute(t):t instanceof Object&&Object.entries(t).forEach((([e])=>n.removeAttribute(e)))),"string"!=typeof e)e instanceof Object&&Object.entries(e).forEach((([e,t])=>pe(e,t,n,r,o)));else{if(!e.length)return;pe(e,"",n,r,o)}}(e,t,n,o,s),t=e}));return o.global.subscriptions.push(a),void n.removeAttribute(e)}return ge(e)?se(e,t,n):void 0}function ue(e,t){return e[t.replace("{","").split("").reverse().join("").replace("}","").split("").reverse().join("")]}function pe(e,t,n,r,o){const s=ge(e);if(t instanceof Function){const r=function(...e){return t(n,e)};n[e].action=r}if(a(t)){n.removeAttribute(e);const a=t=>(t instanceof Function&&(t=X(t,r)),function(e,t,n,r,o){if(e instanceof Function){const r=function(...n){return e(t,n)};return r.tagFunction=e,void(t[n]=r)}if(r)return void se(n,e,t);if(e)return void o(t,n,e);[void 0,!1,null].includes(e)?t.removeAttribute(n):o(t,n,e)}(t,n,e,s,o)),i=t.subscribe(a);r.global.subscriptions.push(i)}else o(n,e,t)}function ge(e){return e.search(/^(class|style)(\.)/)>=0}function de(e,t,n){e.setAttribute(t,n)}function fe(e,t,n){e[t]=n}function me(e,t,n){const r=e.getAttributeNames();let o=de;r.forEach((r=>{"INPUT"===e.nodeName&&"value"===r&&(o=fe),le(r,e.getAttribute(r),e,t,n,o),o=de}))}const he=/(?:<[^>]*?(?:(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+)))*\s*)\/?>)|({__tagvar[^}]+})/g;function be(e,t,n){const r=n.clones.map((e=>e));if((t=M(t,e.tagSupport,e,n)).global.newest=t,n.clones.length>r.length){const e=n.clones.filter((e=>!r.find((t=>t===e))));t.clones.push(...e)}return n.childTags.push(t),t}function ye(e,t,n,r,o){if(!0!==e.tagged){const t=e.wrapper.parentWrap.original;let n=t.name||t.constructor?.name;"Function"===n&&(n=void 0);const r=n||t.toString().substring(0,120);throw new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${r}\n\n`)}const s=new _e(e,r,t);let a=t.tagSupport;return(s.global=a?.global||s.global).insertBefore=n,g.memory.providerConfig.ownerSupport=r,a&&!o.forceElement||(a=be(t,a||s,r)),function(e,t,n,{counts:r,forceElement:o}){const s=t,a=s.tagSupport,i=a?.global.oldest||void 0;if(i&&i)return function(e,t,n){if(t instanceof Function){const e=t(n);return n.updateBy(e),void(t.tagSupport=e)}return n.updateBy(e),void(t.tagSupport=e)}(e,s,i);e.buildBeforeElement(n,{counts:r,forceElement:o})}(a,t,n,o),a}function ve(e,t,n,r){let o=r.tagSupport;o||(o=new _e(e,n,r),we(o,n,r),n.childTags.push(o)),r.tagSupport=o,o.ownerTagSupport=n,o.buildBeforeElement(t,{counts:{added:0,removed:0},forceElement:!0})}function we(e,t,n){e.global.oldest=e,e.global.newest=e,e.ownerTagSupport=t,n.tagSupport=e}function Se(e){const t=Ce();return t.tag=e,e.templater=t,t}function Ce(){const e={children:new u([]),props:[],isTag:!0,isTemplater:!1,tagged:!1,madeChildIntoSubject:!1,html:()=>e};return e}function Ee(e,t,n,r,o){const a=r.clones;let i=e.lastArray=e.lastArray||[];e.placeholder||function(e,t){if("TEMPLATE"!==e.nodeName)return void(t.placeholder=e);const n=t.placeholder=document.createTextNode(""),r=e.parentNode;r.insertBefore(n,e),r.removeChild(e)}(n,e);const c=e.placeholder;let l=0;return i=e.lastArray=e.lastArray.filter(((e,n)=>{const r=t.length-1<n-l,s=t[n-l],a=e.tagSupport.templater.tag,c=s?.memory.arrayValue,u=a.memory.arrayValue,p=r||!((g=c)===(d=u)||g instanceof Array&&d instanceof Array&&g.length==d.length&&g.every(((e,t)=>e==d[t])));var g,d;if(p){const e=i[n];return ee(e.tagSupport,o.counts),e.deleted=!0,++l,++o.counts.removed,!1}return!0})),t.forEach(((e,n)=>{const a=i[n],l=a?.tagSupport,p=e;s(p)&&!p.templater&&Se(p);const g=new _e(p.templater,r,new u(void 0));if(l){we(g,r,l.subject);const e=l.global;g.global=e,e.newest=g}if(!("arrayValue"in p.memory)){const e={template:g.getTemplate().string,array:t,ownerTagContent:r.lastTemplateString},n="Use html`...`.key(item) instead of html`...` to template an Array";throw console.error(n,e),new f(n,e)}if(i.length>n)return a.tagSupport.global.oldest.updateBy(g),[];!function(e,t,n,r,o){const s={tagSupport:t,index:n};o.push(s);const a={added:r.counts.added+n,removed:r.counts.removed},i=document.createDocumentFragment(),c=document.createElement("template");i.appendChild(c),t.buildBeforeElement(c,{counts:a,forceElement:r.forceElement}),e.parentNode.insertBefore(i,e)}(c,g,n,o,i),r.childTags.push(g)})),a}function Te(e,t,n){t.insertBefore=n;const r=t.clone||n;if(t.lastValue===e&&"lastValue"in t)return;t.lastValue=e;const o=function(e,t){const n=t.parentNode;let r=e;[void 0,!1,null].includes(e)&&(r="");const o=document.createTextNode(r);return n.insertBefore(o,t),n.removeChild(t),o}(e,r);t.clone=o}var Ae;!function(e){e.tag="tag",e.templater="templater",e.tagArray="tag-array",e.tagComponent="tag-component",e.value="value"}(Ae||(Ae={}));const je=new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)');function xe(e,t,n){if(!(e instanceof Function))return!!x(e,t)&&4;if(!(t instanceof Function))return!1;const r=t?.original;return r&&(t=r),e.original&&(e=e.original),e.toString()===t.toString()?(n(),3):(n(),5)}function Be(e,t,n,r){let o=n.tagSupport?.global.newest,s=o.global.oldest;const a=o.templater.wrapper,i=t.templater.wrapper;let c=!1;a&&i&&(c=a.parentWrap.original===i.parentWrap.original);const l=t.templater;if(!c)return P(o.global.oldest),ye(l,n,r,e,{forceElement:!1,counts:{added:0,removed:0}});if(!function(e,t,n){const r=function(e,t){let n=e,r=t;if("object"==typeof e){if(!t)return 3;if(n=[...e],r=[...t||[]],!n.every(((e,t)=>{let o=r[t];if(e&&"object"==typeof e){const t={...e},n={...o||{}},r=Object.entries(t).every((([e,r])=>xe(r,n[e],(()=>{delete t[e],delete n[e]}))));return r}return xe(e,o,(()=>{n.splice(t,1),r.splice(t,1)}))})))return 6}return!1}(n.props,e.propsConfig.latestCloned);if(r)return r;return function(e,t){const n=e.propsConfig.lastClonedKidValues,r=t.propsConfig.lastClonedKidValues;return!n.every(((e,t)=>{const n=r[t];return e.every(((e,t)=>e===n[t]))}))&&9}(e,t)}(o,t,l))return function(e,t,n){const r=(e=e.global.newest||e).propsConfig.latestCloned,o=t.global.newest;n.forEach(((e,t)=>{if("object"!=typeof e)return;const n=r[t];"object"==typeof n&&Object.entries(e).forEach((([t,r])=>{if(!(r instanceof Function))return;const s=e[t];s instanceof Function&&s.toCall||(n[t].toCall=(...e)=>function(e,t,n){const r=p(),o=e(...t),s=()=>{const e=n.global.newest;if(r){const t=e.memory.state.every((e=>{const t=e.lastValue,n=e.get();return x(A(t),n)}));if(t)return o}const t=_(e,!0);return e.global.newest=t,o};return r?(g.memory.tagClosed$.toCallback(s),o):s()}(s,e,o))}))}))}(o,e,l.props),o;const u=o.global.newest,d=_(t,!1);o=n.tagSupport;const f=d.global.oldest;return f?(f&&l.children.value.length&&f.templater.children.set(l.children.value),c&&k(u,d)?(n.tagSupport=d,s.updateBy(d),d):(c&&o&&(P(o),d.global.context={}),s=void 0,s||(o=d,Re(d,o.global.insertBefore,o,n)),o.global.newest=d,d)):Re(d,r,o,n)}function Re(e,t,n,r){return e.buildBeforeElement(t,{forceElement:!0,counts:{added:0,removed:0}}),e.global.oldest=e,e.global.newest=e,n.global.oldest=e,n.global.newest=e,r.tagSupport=e,e}function Ne(e,t,r,o,s){const a=[];if(!e.hasAttribute("end"))return{clones:a};const c=e.getAttribute("id");if(c?.substring(0,G.length)!==G)return{clones:a};const l=t[c];return n(l.value)||i(l.value)?{clones:a,tagComponent:{variableName:c,ownerSupport:r,subject:l,insertBefore:e}}:(Fe(e,l,r,o,{isForceElement:s.forceElement}),{clones:a})}function Fe(e,t,c,l,{isForceElement:u}){let p=!1;const g=g=>{p?function(e,t,c,l){const u=e,p=n(t);if(function(e,t,o){const s=e,a=s.lastArray;if(a&&!i(t)){const e=s.placeholder;return delete s.lastArray,delete s.placeholder,Q(o,e),a.forEach((({tagSupport:e})=>ee(e,{added:0,removed:0}))),"array"}const c=e.tagSupport;if(c){const o=r(t);return r(e.value)&&o?!k(t,c)&&(te(c),P(c),2):!n(t)&&(te(c),P(c),"different-tag")}const l=e,u="lastValue"in l,p=l.lastValue;u&&p!==t&&function(e,t){const n=t.clone,r=n.parentNode;r.insertBefore(e,n),r.removeChild(n),delete t.clone,delete t.lastValue}(o,l)}(e,t,l),p)return function(e,t,n,r){if(!t.tagSupport)return ye(e,t,n,r,{forceElement:!0,counts:{added:0,removed:0}}),t;const o=new _e(e,r,t),s=t.tagSupport,a=s.global.newest;if(!a)return te(s),ye(e,t,n,r,{forceElement:!0,counts:{added:0,removed:0}}),t;{const e=a.memory.state;o.memory.state.length=0,o.memory.state.push(...e)}return o.global=s.global,t.tagSupport=o,Be(r,o,t,n),t}(t,u,l,c);if(u.tagSupport)return function(e,t,n){const r=e.tagSupport;let a=t;const i=s(t);if(i){const e=t;a=e.templater,a||(a=new z([]),a.tag=e,e.templater=a)}const c=new _e(a,n,e);i&&(c.global=r.global);const l=t&&k(r,c);if(o(t)&&we(c,n,e),!l)return l?ve(a,r.global.insertBefore,n,e):void Te(t,e,e.insertBefore);r.updateBy(c)}(e,t,c),u;if(i(t))return Ee(e,t,l,c,{counts:{added:0,removed:0}}),e;if(o(t))return ve(t,l,c,u),u;if(s(t)){const e=t;let n=e.templater;return n||(n=Ce(),e.templater=n,n.tag=e),ve(n,l,c,u),u}if(a(t))return t;if(t instanceof Function){const n=X(t,c);return e.set(n),e}Te(t,e,l)}(t,g,c,e):(function(e,t,r,a,c){const l=function(e){return n(e)?Ae.tagComponent:o(e)?Ae.templater:s(e)?Ae.tag:i(e)?Ae.tagArray:Ae.value}(e);switch(l){case Ae.templater:return void ve(e,r,a,t);case Ae.tag:const n=e;let o=n.templater;return o||(o=Se(n)),void ve(o,r,a,t);case Ae.tagArray:return Ee(t,e,r,a,c);case Ae.tagComponent:return void ye(e,t,r,a,c)}Te(e,t,r)}(g,t,e,c,{counts:{...l},forceElement:u}),u&&(u=!1),p=!0)};let d=g;const f=t.subscribe((e=>d(e)));if(e.parentNode){const n=t.clone=oe(e);d=r=>{const o=n.parentNode;o.insertBefore(e,n),o.removeChild(n),delete t.clone,d=g,g(r)}}c.global.subscriptions.push(f)}function ke(e,t,n,r){if(!e.getAttribute)return;"TEXTAREA"===e.nodeName&&function(e,t,n){const r=e.value;if(r.search(je)>=0){const o=r.match(/__tagvar(\d{1,4})/),s="{"+(o?o[0]:"")+"}";e.value="",e.setAttribute("text-var-value",s);const a=(t,n,r)=>e.value=r;le("text-var-value",s,e,t,n,a)}}(e,n,r);let o=t.counts.added;o=function(e,t){const n=e.oninit;if(!n)return t.added;const r=n.tagFunction;if(!r)return t.added;const o=r.tagFunction;return o?(o({target:e,stagger:t.added}),++t.added):t.added}(e,t.counts)-o,e.children&&new Array(...e.children).forEach(((e,o)=>ke(e,{...t,counts:t.counts},n,r)))}function Pe(e,t,n,r,o){if(!o||"TEMPLATE"===e.tagName)return{clones:[],tagComponents:[]};const s=r.counts,a=[],i=[];return new Array(...o).forEach((e=>{const{clones:o,tagComponent:c}=Ne(e,t,n,s,r);a.push(...o),c?i.push(c):e.children&&new Array(...e.children).forEach(((e,o)=>{if(function(e){return"TEMPLATE"===e.tagName&&void 0!==e.getAttribute("interpolate")&&void 0!==e.getAttribute("end")}(e)){const{tagComponent:o}=Ne(e,t,n,s,r);o&&i.push(o)}const{clones:c,tagComponents:l}=Pe(e,t,n,r,e.children);a.push(...c),i.push(...l)}))})),{clones:a,tagComponents:i}}function Ve(e,t,n,r,o){const s=[],a=[],i=n.interpolation,c=e.children[0].content.children;if(i.keys.length){const{clones:n,tagComponents:i}=Pe(e,t,r,o,c);s.push(...n),a.push(...i)}return me(e,t,r),Oe(c,t,r),{clones:s,tagComponents:a}}function Oe(e,t,n){new Array(...e).forEach((e=>{me(e,t,n),e.children&&Oe(e.children,t,n)}))}function $e(e,t,n,r,o){const s=function(e,t){const n=[];let r=e.children[0].content.firstChild;const o=document.createDocumentFragment();for(;r;){const e=r.nextSibling;n.push(r),o.appendChild(r),r=e}return t.parentNode&&t.parentNode.insertBefore(o,t),n}(e,t);return s.length?(s.forEach((e=>ke(e,o,r,n))),n.clones.push(...s),s):s}const We=new RegExp(G,"g");class Me{templater;subject;isApp=!0;appElement;strings;values;lastTemplateString=void 0;propsConfig;memory={state:[]};clones=[];global={context:{},providers:[],renderCount:0,deleted:!1,subscriptions:[]};hasLiveElements=!1;constructor(e,t){this.templater=e,this.subject=t;const n=e.children.value,r=e.props,o=r.map((e=>A(e)));this.propsConfig={latest:r,latestCloned:o,lastClonedKidValues:n.map((e=>Z(e.values)))}}buildBeforeElement(e,t={forceElement:!1,counts:{added:0,removed:0}}){const n=this.subject,r=this.global;r.insertBefore=e,r.placeholder||function(e){const t=e.insertBefore;e.placeholder=oe(t)}(r);const o=r.placeholder;r.oldest=this,r.newest=this,n.tagSupport=this,this.hasLiveElements=!0;const s=this.update(),a=this.getTemplate(),i=t.forceElement,c=document.createElement("div");c.id="tag-temp-holder",c.innerHTML=`<template id="temp-template-tag-wrap">${a.string}</template>`;const{tagComponents:l}=Ve(c,s,a,this,{forceElement:t.forceElement,counts:t.counts});$e(c,o,this,s,t),l.forEach((e=>{Fe(e.insertBefore,e.subject,e.ownerSupport,t.counts,{isForceElement:i}),$e(c,e.insertBefore,e.ownerSupport,s,t)}))}getTemplate(){const e=this.templater.tag,t=this.strings||e.strings,n=this.values||e.values,r=function(e){const t=function(e){const t=[];return{string:e.replace(he,((e,n)=>{if(e.startsWith("<"))return e;const r=n.substring(1,n.length-1);return t.push(r),`<template interpolate end id="${r}"></template>`})),keys:t}}(e);return t.string=t.string.replace(q,G),t}(t.map(((e,t)=>(e.replace(We,K)+(n.length>t?`{${G}${t}}`:"")).replace(/>\s*/g,">").replace(/\s*</g,"<"))).join(""));return this.lastTemplateString=r.string,{interpolation:r,string:r.string,strings:t,values:n,context:this.global.context||{}}}update(){return this.updateContext(this.global.context)}updateContext(e){const t=this.templater.tag,r=this.strings||t.strings,i=this.values||t.values;return r.map(((t,r)=>{const c=G+r,l=i.length>r,p=i[r];if(c in e)return function(e,t,r){const o=e[t],s=o.tagSupport;if(s&&r&&n(r)){let e=new _e(r,s.ownerTagSupport,o);n(s)&&function(e,t){const n=e.templater.wrapper.parentWrap.original,r=t.templater.wrapper,o=r?.parentWrap.original;if(n===o){t.global=e.global;const n=e.global.newest;if(n){const e=n.memory.state;t.memory.state.length=0,t.memory.state.push(...e)}}}(s,e)}a(r)||o.set(r)}(e,c,p);l&&(e[c]=function(e,t,r){return n(t)||t instanceof Function?new u(t):e?o(t)?re(t.tag,r):s(t)?re(t,r):a(t)?t:new u(t):new u(void 0)}(l,p,this))})),e}}class _e extends Me{templater;ownerTagSupport;subject;version;isApp=!1;childTags=[];constructor(e,t,n,r=0){super(e,n),this.templater=e,this.ownerTagSupport=t,this.subject=n,this.version=r}destroy(e={stagger:0,byParent:!1}){const t=!e.byParent,r=this.global,o=this.subject,s=e.byParent?[]:ne(this.childTags);let a;if(t&&n(this.templater)&&W(this,this),s.forEach((e=>{const t=e.global;delete t.newest,t.deleted=!0,n(e.templater)&&W(e,e)})),"TEMPLATE"===r.insertBefore.nodeName&&r.placeholder&&!("arrayValue"in this.memory)&&(e.byParent||te(this)),this.destroySubscriptions(),this.ownerTagSupport&&(this.ownerTagSupport.childTags=this.ownerTagSupport.childTags.filter((e=>e!==this))),t){const{stagger:t,promise:n}=this.destroyClones(e);e.stagger=t,n&&(a=n)}else this.destroyClones();return delete r.placeholder,r.context={},delete r.oldest,delete r.newest,r.deleted=!0,this.childTags.length=0,this.hasLiveElements=!1,delete o.tagSupport,a=a?a.then((async()=>{const e=s.map((e=>e.destroy({stagger:0,byParent:!0})));return Promise.all(e)})):Promise.all(s.map((e=>e.destroy({stagger:0,byParent:!0})))),a.then((()=>e.stagger))}destroySubscriptions(){const e=this.global;e.subscriptions.forEach((e=>e.unsubscribe())),e.subscriptions.length=0}destroyClones({stagger:e}={stagger:0}){const t=[...this.clones];this.clones.length=0;const n=t.map((t=>this.checkCloneRemoval(t,e))).filter((e=>e)),r=this.global.context;return Object.values(r).forEach((e=>{const t=e.clone;t&&t.parentNode&&t.parentNode.removeChild(t)})),n.length?{promise:Promise.all(n),stagger:e}:{stagger:e}}checkCloneRemoval(e,t){let n;const r=e;r.ondestroy&&(n=function(e,t){const n=e.ondestroy;if(!n)return;const r=n.tagFunction;if(!r)return;const o=r.tagFunction;return o?o({target:e,stagger:t}):void 0}(r,t));const o=()=>{const t=e.parentNode;t&&t.removeChild(e);const n=this.ownerTagSupport;n&&(n.clones=n.clones.filter((t=>t!==e)))};return n instanceof Promise?n.then(o):(o(),n)}updateBy(e){const t=e.templater.tag;this.updateConfig(t.strings,t.values)}updateConfig(e,t){this.strings=e,this.updateValues(t)}updateValues(e){return this.values=e,this.updateContext(this.global.context)}async rebuild(){delete this.strings,delete this.values,Le(this);const e=be(this.subject,this,this.ownerTagSupport);return await this.destroy(),e.buildBeforeElement(this.global.insertBefore,{forceElement:!0,counts:{added:0,removed:0}}),e}getAppTagSupport(){let e=this;for(;e.ownerTagSupport;)e=e.ownerTagSupport;return e}}function Le(e){te(e),e.childTags.forEach((e=>Le(e.global.oldest)))}const De=[];function Ie(e,t){const n=t.getAttribute("props");if(n){const r=t.gateway,o=(Je[e]||r.tagGateway).propMemory[n];return Ue(t,o.props),o}const r=t.getAttribute("propsJson");if(r){const e=JSON.parse(r);return Ue(t,e),{props:e,callCount:0}}const o=t.getAttributeNames().reduce(((e,n)=>{const r=n.split(":");let o=t.getAttribute(n);return r.length>1&&("number"===r[1]&&(o=Number(o)),n=r[0]),e[n]=o,e}),{});return delete o.tag,Ue(t,o),{props:o,callCount:0}}function Ue(e,t){const n=e.getAttribute("events");n&&n.split(",").map((e=>e.trim())).map((e=>{t[e]=t=>r(e,{detail:{[e]:t}})}));const r=function(t,n){const r=new CustomEvent(t,n);e.dispatchEvent(r)};return t}const Je={},He=function(e){const t=qe(e);if(Je[t])return Je[t];let n,r=0;function o(){const r=function(e,t){return function(e,t,n){return t.forEach((t=>Ye(e,t,n))),t}(e,document.querySelectorAll(`[tag="${e}"]`),t)}(t,e);return r.length?(n&&clearInterval(n),delete Je[t],r.length):r.length}const s={id:t,propMemory:{},props:(e,t)=>{const n=s.propMemory[e]=s.propMemory[e]||{props:[t],callCount:0};n.props=[t],++n.callCount;const{element:r,tag:o}=n;return r&&o&&s.updateTag(o,r),e},updateTag:(e,n)=>{!function(e,t,n){const r=n.global.newest,o=r.propsConfig.latestCloned,s=Ie(e,t),a=[s.props],i=JSON.stringify(o)===JSON.stringify(a);console.log("propMemory.props - 98",{props:s.props,prevProps:o,newProps:a,isSameProps:i,targetNode:t}),i||(r.templater.props=a,g.memory.tagClosed$.toCallback((()=>{const e=n.global.newest;e.templater.props=a,_(e,!1)})))}(t,n,e)}};return o()?s:(n=setInterval((()=>{if(r+=5,r>=2e3)throw clearInterval(n),new Error(`TaggedJs Element ${t} not found`);o()}),5),Je[t]=s,Je[t])},Ge={};function Ke(e){const{id:t,observer:n,tag:r}=e;n.disconnect(),r.destroy(),delete Ge[t]}function qe(e){const t=e.parentWrap?.original||e;return console.log("xxxxx",{fun:t,parentWrap:e.parentWrap,test:e.original}),"__tagTemplate_"+function(e){let t=e.toString().replace(/\s+/g,"_").replace(/[^\w\d]/g,"_");return/^[a-zA-Z]/.test(t)||(t="fn_"+t),t}(t)}function Ye(e,t,n){const r=t.gateway;if(r)return r.updateTag(),r;const o=Ie(e,t),s=o.props;try{const{tagSupport:r}=function(e,t,n){const r=De.findIndex((e=>e.element===t));r>=0&&(De[r].tagSupport.destroy(),De.splice(r,1),console.warn("Found and destroyed app element already rendered to element",{element:t}));const o=function(e){let t={};const n=new u(t);t=new Me(e,n),n.set(e),n.tagSupport=t,O(t,void 0);const r=(0,e.wrapper)(t,n);return $(t,r),r}(e(n));o.appElement=t,o.isApp=!0,o.global.isApp=!0;const s=document.createElement("template");s.setAttribute("id","app-tag-"+De.length),s.setAttribute("app-tag-detail",De.length.toString());const a=document.createDocumentFragment();return a.appendChild(s),t.destroy=async()=>{await o.destroy();const e=o.global.insertBefore;e.parentNode.removeChild(e)},o.buildBeforeElement(s),o.global.oldest=o,o.global.newest=o,t.setUse=e.original.setUse,De.push({element:t,tagSupport:o}),t.appendChild(a),{tagSupport:o,tags:e.original.tags}}(n,t,s);return o.element=t,o.tag=r,function(e,t,n,r){const o=Je[e],s=new MutationObserver((e=>{if(function(e){const{element:t}=e;return!!document.body.contains(t)||(Ke(e),!1)}(i))for(const t of e)"attributes"===t.type&&a()}));function a(){o.updateTag(n,t)}et(r);const i={id:e,tag:n,observer:s,component:r,element:t,updateTag:a,tagGateway:o};return Ge[e]=Ge[e]||[],Ge[e].gates.push(i),t.gateway=i,s.observe(t,{attributes:!0}),i}(e,t,r,n)}catch(e){throw console.warn("Failed to render component to element",{component:n,element:t,props:s,err:e}),e}}class ze extends HTMLElement{gateway;constructor(){super(),setTimeout((()=>this.gateway=function(e){const t=e.gateway;let n=t?.id||e.getAttribute("tag");if(!n){const t='Tagged gateway element must have a "tag" attribute which describes which tag to use';throw console.warn(t,{element:e}),new Error(t)}if(!n){const t="Cannot check a tag on element with no id attribute";throw console.warn(t,{tagName:n,element:e}),new Error(t)}const r=Ge[n].tagComponent;if(!r){const t=`Cannot find a tag registered by id of ${n}`;throw console.warn(t,{tagName:n,element:e}),new Error(t)}return Ye(n,e,r)}(this)),0)}disconnectedCallback(){Ke(this.gateway)}}const Xe="tag-element";function Ze(){customElements.define(Xe,ze)}let Qe=!1;function et(e){if(!Qe){try{Ze()}catch(e){throw e}Qe=!0}const t=qe(e);return Ge[t]=Ge[t]||{gates:[],tagComponent:e},Ge[t].tagComponent=e,t}var tt=t.xH,nt=t.Ly,rt=t.TY;export{tt as initWebComponents,nt as loadTagGateway,rt as tagGateway};