var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{jW:()=>P,js:()=>j,Cc:()=>x});class r{isSubject=!0;subscribers=[];value;subscribe(e){this.subscribers.push(e),o.globalSubs.push(e),o.globalSubCount$.set(o.globalSubCount$.value+1);const t=()=>{t.unsubscribe()};return t.unsubscribe=()=>{n(this.subscribers,e),n(o.globalSubs,e),o.globalSubCount$.set(o.globalSubCount$.value-1),t.unsubscribe=()=>{}},t}set(e){this.value=e,this.subscribers.forEach((t=>{t.value=e,t(e)}))}next=this.set}function n(e,t){const r=e.indexOf(t);-1!==r&&e.splice(r,1)}const o=r;function a(e,t=new WeakMap){if(null===e||"object"!=typeof e)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e);const r=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));if(t.set(e,r),Array.isArray(e))for(let n=0;n<e.length;n++)r[n]=a(e[n],t);else for(const n in e)e.hasOwnProperty(n)&&(r[n]=a(e[n],t));return r}function s(e,t){if(e===t)return!0;if("object"!=typeof e||"object"!=typeof t||null===e||null===t)return!1;const r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(const o of r)if(!n.includes(o)||!s(e[o],t[o])){if(e[o]instanceof Function&&t[o]instanceof Function&&e[o].toString()===t[o].toString())continue;return!1}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(!s(e[r],t[r]))return!1}else if(Array.isArray(e)||Array.isArray(t))return!1;return!0}function i(e){const t={beforeRender:e.beforeRender||(()=>{}),beforeRedraw:e.beforeRedraw||(()=>{}),afterRender:e.afterRender||(()=>{}),beforeDestroy:e.beforeDestroy||(()=>{})};i.tagUse.push(t)}function c(e,t){const r=function(e,r){if("object"!=typeof e)return e;const n={...e};return Object.entries(n).forEach((([e,r])=>{n[e]=r instanceof Function?(...e)=>function(e,r){const n=e(...r);return t.newest?.ownerTag?.tagSupport.render(),n}(r,e):r})),n}((n=e,!0===n?.isTag)?0:e);var n;return r}o.globalSubs=[],o.globalSubCount$=new r,o.globalSubCount$.set(0),i.tagUse=[],i.memory={};class u{templater;props;clonedProps;latestProps;latestClonedProps;memory={context:{},state:{newest:[]},providers:[],renderCount:0};constructor(e,t){this.templater=e,this.props=t,this.latestProps=t;const r=c(t,e);this.latestClonedProps=a(r),this.clonedProps=this.latestClonedProps}oldest;newest;hasPropChanges(e,t,r){const n=this.props;return!(void 0===e&&e===r||s(t,n))}mutatingRender(){const e='Tag function "render()" was called in sync but can only be called async';throw console.error(e,{tagSupport:this}),new Error(e)}render(){return++this.memory.renderCount,this.mutatingRender()}renderExistingTag(e,t){const r=this.memory.renderCount;if(function(e){e.tagSupport.memory.providers.filter((e=>!s(e.instance,e.clone))).forEach((t=>{!function(e,t){p(e,t).forEach((({tag:e,renderCount:t,provider:r})=>{t===e.tagSupport.memory.renderCount&&(r.clone=a(r.instance),e.tagSupport.render())}))}(e.getAppElement(),t),t.clone=a(t.instance)}))}(e),r!==this.memory.renderCount)return!0;const n=e.tagSupport.templater,o=t.tagSupport.props,i=n?.tagSupport.props;return function(e,t,r,n,o){const a=e.hasPropChanges(t,n,r);return e.newest=o.redraw(),!a}(this,o,i,t.tagSupport.clonedProps,this.templater)}}function p(e,t,r=[]){const n=e.tagSupport.memory.providers.find((e=>e.constructMethod===t.constructMethod));return n&&r.push({tag:e,renderCount:e.tagSupport.memory.renderCount,provider:n}),e.children.forEach((e=>p(e,t,r))),r}var l;!function(e){e.tag="tag",e.tagArray="tag-array",e.tagComponent="tag-component",e.value="value"}(l||(l={}));const g="__tagvar",d="--"+g+"--";new RegExp(g,"g"),new RegExp(d,"g");const f=[];function m(e,t){const r=i.memory.providerConfig;r.currentTagSuport=e,r.ownerTag=t,e.memory.providers.length&&(r.providers.length=0,r.providers.push(...e.memory.providers))}new class{},i.memory.providerConfig={providers:[],currentTagSupport:void 0,ownerTag:void 0},i({beforeRender:(e,t)=>{m(e,t)},beforeRedraw:(e,t)=>{m(e,t.ownerTag)},afterRender:e=>{const t=i.memory.providerConfig;e.memory.providers=[...t.providers],t.providers.length=0}}),i.memory.stateConfig={array:[],rearray:[]},i({beforeRender:e=>y(e),beforeRedraw:e=>y(e),afterRender:(e,t)=>{const r=e.memory.state,n=i.memory.stateConfig;if(n.rearray.length&&n.rearray.length!==n.array.length){const t=`States lengths mismatched ${n.rearray.length} !== ${n.array.length}`;throw console.error(t,{oldStates:n.array,newStates:n.rearray,component:e.templater?.wrapper.original}),new Error(t)}n.rearray=[],r.newest=[...n.array],n.array=[]}});function y(e){const t=e.memory.state,r=i.memory.stateConfig;if(r.rearray.length){const n="last array not cleared";throw console.error(n,{config:r,component:e.templater?.wrapper.original,state:t}),n}r.rearray=[],t?.newest.length&&r.rearray.push(...t.newest)}function h(e){i.memory.initCurrentSupport=e}let b;i({beforeRender:e=>h(e),beforeRedraw:e=>h(e)}),i({beforeRender:e=>b=e,beforeRedraw:e=>b=e,beforeDestroy:(e,t)=>{const r=e.memory.destroyCallback;r&&r()}});i({beforeRender:e=>{},beforeRedraw:e=>{}});const w={},S={};function v(e){const{id:t,observer:r,tag:n}=e;r.disconnect(),n.destroy(),delete w[t]}function C(e){return"__tagTemplate_"+function(e){let t=e.toString().replace(/\s+/g,"_").replace(/[^\w\d]/g,"_");return/^[a-zA-Z]/.test(t)||(t="fn_"+t),t}(e)}function R(e){const t=e.getAttribute("props");if(!t)return{element:e};try{const r=JSON.parse(t),n=e.getAttribute("events");n&&n.split(",").map((e=>e.trim())).map((e=>{r[e]=t=>o(e,{detail:{[e]:t}})}));const o=function(t,r){const n=new CustomEvent(t,r);e.dispatchEvent(n)};return r}catch(r){throw console.warn("Failed to parse props on element",{element:e,propsString:t}),r}}function E(e,t,r){const n=t.gateway;if(n)return n.updateTag(),n;const o=R(t);try{const{tag:n}=function(e,t,r){const n=f.findIndex((e=>e.element===t));n>=0&&(f[n].tag.destroy(),f.splice(n,1),console.warn("Found and destroyed app element already rendered to element",{element:t}));const o=function(e){const t=e.tagSupport;!function(e,t){i.tagUse.forEach((t=>t.beforeRender(e,void 0)))}(t);const r=e.wrapper();return r.tagSupport=t,r.afterRender(),{tag:r,tagSupport:t}}(e(r)),{tag:a,tagSupport:s}=o;a.appElement=t,function(e,t){let r;e.mutatingRender=()=>{t.beforeRedraw();const n=e.templater,o=r=n.wrapper();return e.latestProps=o.tagSupport.props,e.latestClonedProps=o.tagSupport.clonedProps,o.setSupport(e),t.afterRender(),t.updateByTag(o),r&&r.destroy({stagger:0}),e.newest=o,r}}(s,a);const c=document.createElement("template");return c.setAttribute("tag-detail","app-template-placeholder"),t.appendChild(c),a.buildBeforeElement(c),t.setUse=e.original.setUse,f.push({element:t,tag:a}),{tag:a,tags:e.original.tags}}(r,t,o);return function(e,t,r,n){let o=r;const a=new MutationObserver((e=>{if(function(e){const{element:t}=e;if(!document.body.contains(t))return v(e),!1}(i))for(const t of e)"attributes"===t.type&&s()}));function s(){const e=r.tagSupport.templater,n=e.tagSupport.props,a=R(t);if(e.tagSupport.props=a,JSON.stringify(n)===JSON.stringify(a))return;e.tagSupport.latestProps=a;const s=function(e,t,r){const n=e?.tagSupport||function(e,t){return new u(e,void 0)}(t);return t.renderWithSupport(n,e,r)}(o,e);i.tag=o=s.retag}j(n);const i={id:e,tag:r,observer:a,component:n,element:t,updateTag:s};return w[e]=w[e]||[],w[e].push(i),t.gateway=i,a.observe(t,{attributes:!0}),i}(e,t,n,r)}catch(e){throw console.warn("Failed to render component to element",{component:r,element:t,props:o}),e}}class A extends HTMLElement{gateway;constructor(){super(),setTimeout((()=>this.gateway=function(e){const t=e.id||e.getAttribute("id");if(!t){const r="Cannot check a tag on element with no id attribute";throw console.warn(r,{id:t,element:e}),new Error(r)}const r=S[t];if(!r){const r=`Cannot find a tag registered by id of ${t}`;throw console.warn(r,{id:t,element:e}),new Error(r)}return E(t,e,r)}(this)),0)}disconnectedCallback(){v(this.gateway)}}function P(){customElements.define("tag-element",A)}let T=!1;function j(e){if(!T){try{P()}catch(e){throw e}T=!0}const t=C(e);return S[t]=e,t}const O={},x=function(e){const t=C(e);if(O[t])return O[t];let r,n=0;function o(){const n=function(e,t){return function(e,t,r){return t.forEach((t=>E(e,t,r))),t}(e,document.querySelectorAll("#"+e),t)}(t,e);return n.length?(r&&clearInterval(r),delete O[t],n.length):n.length}return o()?{id:t}:(r=setInterval((()=>{if(n+=5,n>=2e3)throw clearInterval(r),new Error(`TaggedJs Element ${t} not found`);o()}),5),O[t]={id:t},O[t])};var $=t.jW,_=t.js,k=t.Cc;export{$ as initWebComponents,_ as loadTagGateway,k as tagGateway};