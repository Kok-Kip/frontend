webpackJsonp([1],{BFnn:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]},i=n("VU/8")({name:"App"},o,!1,null,null,null).exports,s=n("mtWM"),u=n.n(s),a=n("/ocq"),c=n("hU7x"),d=n.n(c),l={name:"SearchEngine",data:function(){return{query:"",querySuggest:[]}},methods:{submit:function(){""!==this.query&&this.$router.push({path:"/result",query:{q:this.query}})},updateQuery:function(t){this.querySuggest=[];for(var e=0;e<=t.length-1;e++)this.querySuggest.push(t[e])},chooseItem:function(t){this.query=t},showContent:function(){document.getElementById("dropdown-content").style.display="block"},hiddenContent:function(){document.getElementById("dropdown-content").style.display="none"}},mounted:function(){},watch:{query:function(){var t=this;if(""!==this.query){var e="https://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug",n=this.query;e=e.replace("#content#",n);d()(e,{param:"cb"},function(e,n){e?console.error(e.message):(console.log(n.s),t.updateQuery(n.s),t.showContent())})}else this.querySuggest=[]}}},h={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{on:{click:t.hiddenContent}},[r("div",{attrs:{id:"app"},on:{click:t.hiddenContent}},[r("img",{attrs:{src:n("mCmD")}})]),t._v(" "),r("div",{attrs:{id:"search-container"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],attrs:{type:"text",id:"search-text",autocomplete:"off",tabindex:"=-1",placeholder:"Kok Kip Your Answer..."},domProps:{value:t.query},on:{keyup:function(e){return e.type.indexOf("key")||13===e.keyCode?t.submit(e):null},click:t.showContent,input:function(e){e.target.composing||(t.query=e.target.value)}}}),t._v(" "),r("button",{attrs:{id:"search-submit",title:"Submit"},on:{click:t.submit}}),t._v(" "),r("div",{attrs:{id:"dropdown-content"}},t._l(t.querySuggest,function(e){return r("div",{key:e,on:{click:function(n){return t.chooseItem(e)}}},[t._v("\n        "+t._s(e)+"\n      ")])}),0)])])},staticRenderFns:[]};var p=n("VU/8")(l,h,!1,function(t){n("uLlD")},"data-v-afb77cfc",null).exports,m={name:"SearchPage",data:function(){return{query:"",querySuggest:[],resData:[],isFirst:!0}},methods:{submit:function(){this.$router.push({path:"/result",query:{q:this.query}}),this.handleQuery(this.query)},returnToMainPage:function(){this.$router.push({path:"/"})},handleQuery:function(t){var e=this;this.hiddenContent(),this.$axios({method:"get",url:"http://127.0.0.1:5000/search?key="+t}).then(function(t){e.resData=[];var n=t.data.data;e.resData=n,console.log(t)}).catch(function(t){console.log(t)})},updateQuery:function(t){this.querySuggest=[];for(var e=t.length-1;e>=0;e--)this.querySuggest.push(t[e])},chooseItem:function(t){this.query=t,document.getElementById("dropdown-content").style.display="none"},showContent:function(){document.getElementById("dropdown-content").style.display="block"},hiddenContent:function(){document.getElementById("dropdown-content").style.display="none"}},created:function(){var t=this.$route.query.q;this.query=t,this.isFirst=!1},watch:{query:function(){var t=this;if(""!==this.query){var e="https://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug",n=this.query;e=e.replace("#content#",n);d()(e,{param:"cb"},function(e,n){e?console.error(e.message):(console.log(n.s),t.updateQuery(n.s),t.isFirst||t.showContent())})}else this.querySuggest=[]}}},y={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"search-container"},on:{click:t.hiddenContent}},[r("div",{attrs:{id:"search-head"}},[r("img",{attrs:{src:n("mCmD"),id:"search-head-img"},on:{click:t.returnToMainPage}}),t._v(" "),r("div",{attrs:{id:"text-container"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],attrs:{type:"text",id:"search-text",autocomplete:"off",tabindex:"=-1",placeholder:"Kok Kip Your Answer..."},domProps:{value:t.query},on:{keyup:function(e){return e.type.indexOf("key")||13===e.keyCode?t.submit(e):null},click:t.showContent,input:function(e){e.target.composing||(t.query=e.target.value)}}}),t._v(" "),r("button",{attrs:{id:"search-submit",title:"Submit"},on:{click:t.submit}}),t._v(" "),r("div",{attrs:{id:"dropdown-content"}},t._l(t.querySuggest,function(e){return r("div",{key:e,on:{click:function(n){return t.chooseItem(e)}}},[t._v("\n                "+t._s(e)+"\n              ")])}),0)])]),t._v(" "),r("div",{attrs:{id:"search-result"}},t._l(t.resData,function(e,n){return r("div",{key:n},[r("div",{staticClass:"search-item"},[r("a",{staticClass:"item-title",attrs:{id:"res-title",target:"_blank",href:e.url}},[t._v(t._s(e.title))]),t._v(" "),r("p",{staticClass:"item-desc"},[t._v(t._s(e.description))])])])}),0)])},staticRenderFns:[]};var g=n("VU/8")(m,y,!1,function(t){n("BFnn")},"data-v-cee786b4",null).exports;r.a.use(a.a);var f=new a.a({routes:[{path:"/",name:"SearchEngine",component:p},{path:"/result",name:"SearchPage",component:g}]});r.a.config.productionTip=!1,r.a.prototype.$axios=u.a,new r.a({el:"#app",router:f,components:{App:i},template:"<App/>"})},mCmD:function(t,e,n){t.exports=n.p+"static/img/logo3.789a3cd.png"},uLlD:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.607e58fc6941c450587f.js.map