webpackJsonp([1],{NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]},r=n("VU/8")({name:"App"},i,!1,null,null,null).exports,s=n("mtWM"),u=n.n(s),c=n("/ocq"),a=n("hU7x"),d=n.n(a),l={name:"SearchEngine",data:function(){return{query:"",querySuggest:[],inputBoxFocus:!1,idx:0}},methods:{submit:function(){""!==this.query&&this.$router.push({path:"/result",query:{q:this.query}})},updateQuery:function(t){this.querySuggest=[];for(var e=0;e<=t.length-1;e++)this.querySuggest.push(t[e]);this.idx=-1},chooseItem:function(t){this.query=t,this.submit()},showContent:function(){document.getElementById("dropdown-content").style.display="block"},hiddenContent:function(){document.getElementById("dropdown-content").style.display="none"},onFocus:function(){this.inputBoxFocus=!0},onBlur:function(){this.inputBoxFocus=!1},upClick:function(){console.log("upClick"),this.idx<=0||(this.query=this.querySuggest[this.idx-1])},downClick:function(){console.log("downClick"),this.idx>9||(this.query=this.querySuggest[this.idx+1])}},mounted:function(){},watch:{query:function(){var t=this;if(""!==this.query){var e="https://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug",n=this.query;e=e.replace("#content#",n);d()(e,{param:"cb"},function(e,n){e?console.error(e.message):(console.log(n.s),t.updateQuery(n.s),t.showContent())})}else this.querySuggest=[]}}},h={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{on:{click:t.hiddenContent}},[o("div",{attrs:{id:"app"},on:{click:t.hiddenContent}},[o("img",{attrs:{src:n("mCmD")}})]),t._v(" "),o("div",{class:[t.inputBoxFocus?"search-box-border-blue":"search-box-border-grey"],attrs:{id:"search-container"}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],attrs:{type:"text",id:"search-text",autocomplete:"off",tabindex:"=-1",placeholder:"Kok Kip Your Answer..."},domProps:{value:t.query},on:{keyup:[function(e){return e.type.indexOf("key")||13===e.keyCode?t.submit(e):null},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:t.upClick()},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:t.downClick()}],click:t.showContent,focus:function(e){return t.onFocus()},blur:function(e){return t.onBlur()},input:function(e){e.target.composing||(t.query=e.target.value)}}}),t._v(" "),o("button",{attrs:{id:"search-submit",title:"Submit"},on:{click:t.submit}}),t._v(" "),o("div",{attrs:{id:"dropdown-content"}},t._l(t.querySuggest,function(e){return o("div",{key:e,on:{click:function(n){return t.chooseItem(e)}}},[t._v("\n        "+t._s(e)+"\n      ")])}),0)])])},staticRenderFns:[]};var p=n("VU/8")(l,h,!1,function(t){n("oNqg")},"data-v-f57ddcc0",null).exports,y={name:"SearchPage",data:function(){return{query:"",keyWord:"",querySuggest:[],resData:[],isFirst:!0,shouldShow:!0,inputBoxFocus:!1}},methods:{brighten:function(t){if(this.keyWord){var e=new RegExp(this.keyWord,"g");return t.replace(e,'<span style="color: #ff7866;">'+this.keyWord+"</span>")}},submit:function(){this.$router.push({path:"/result",query:{q:this.query}}),this.handleQuery(this.query)},returnToMainPage:function(){this.$router.push({path:"/"})},handleQuery:function(t){var e=this;this.hiddenContent(),this.$axios({method:"get",url:"http://127.0.0.1:5000/search?key="+t}).then(function(n){e.resData=[];var o=n.data.data;e.resData=o,e.keyWord=t,console.log(n)}).catch(function(t){console.log(t)})},updateQuery:function(t){this.querySuggest=[];for(var e=t.length-1;e>=0;e--)this.querySuggest.push(t[e]);this.idx=-1},chooseItem:function(t){this.query=t,document.getElementById("dropdown-content").style.display="none",this.shouldShow=!1,this.submit()},showContent:function(){document.getElementById("dropdown-content").style.display="block"},hiddenContent:function(){document.getElementById("dropdown-content").style.display="none"},onFocus:function(){console.log("onFocus"),this.inputBoxFocus=!0},onBlur:function(){console.log("onBlur"),this.inputBoxFocus=!1},upClick:function(){console.log("upClick"),this.idx<=0||(this.query=this.querySuggest[this.idx-1])},downClick:function(){console.log("downClick"),this.idx>9||(this.query=this.querySuggest[this.idx+1])}},created:function(){var t=this.$route.query.q;this.isFirst=!0,this.query=t,this.handleQuery(t)},watch:{query:function(){var t=this;if(console.log("In watch query"),console.log(this.isFirst),""===this.query||this.isFirst||!this.shouldShow)return this.isFirst=!1,this.shouldShow=!0,void(this.querySuggest=[]);var e="https://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug",n=this.query;e=e.replace("#content#",n);d()(e,{param:"cb"},function(e,n){e?console.error(e.message):(console.log(n.s),t.updateQuery(n.s),t.showContent())})}}},g={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"search-container"},on:{click:t.hiddenContent}},[o("div",{attrs:{id:"search-head"}},[o("img",{attrs:{src:n("mCmD"),id:"search-head-img"},on:{click:t.returnToMainPage}}),t._v(" "),o("div",{class:[t.inputBoxFocus?"text-container-border-blue":"text-container-border-grey"],attrs:{id:"text-container"}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],attrs:{type:"text",id:"search-text",autocomplete:"off",tabindex:"=-1",placeholder:"Kok Kip Your Answer..."},domProps:{value:t.query},on:{keyup:[function(e){return e.type.indexOf("key")||13===e.keyCode?t.submit(e):null},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:t.upClick()},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:t.downClick()}],click:t.showContent,focus:function(e){return t.onFocus()},blur:function(e){return t.onBlur()},input:function(e){e.target.composing||(t.query=e.target.value)}}}),t._v(" "),o("button",{attrs:{id:"search-submit",title:"Submit"},on:{click:t.submit}}),t._v(" "),o("div",{attrs:{id:"dropdown-content"}},t._l(t.querySuggest,function(e){return o("div",{key:e,on:{click:function(n){return t.chooseItem(e)}}},[t._v("\n                "+t._s(e)+"\n              ")])}),0)])]),t._v(" "),o("div",{attrs:{id:"search-result"}},t._l(t.resData,function(e,n){return o("div",{key:n},[o("div",{staticClass:"search-item"},[o("span",{attrs:{id:"tipText"}},[t._v("["+t._s(t.keyWord)+"]")]),o("span",{staticClass:"item-title",attrs:{id:"res-title"},domProps:{innerHTML:t._s(t.brighten(e.title))}}),t._v(" "),o("p",{staticClass:"item-desc",domProps:{innerHTML:t._s(t.brighten(e.text))}}),t._v(" "),o("p",{staticClass:"date-desc"},[t._v(t._s(e.date))])])])}),0)])},staticRenderFns:[]};var f=n("VU/8")(y,g,!1,function(t){n("SMJq")},"data-v-f3e4a5a6",null).exports;o.a.use(c.a);var m=new c.a({routes:[{path:"/",name:"SearchEngine",component:p},{path:"/result",name:"SearchPage",component:f}]});o.a.config.productionTip=!1,o.a.prototype.$axios=u.a,new o.a({el:"#app",router:m,components:{App:r},template:"<App/>"})},SMJq:function(t,e){},mCmD:function(t,e,n){t.exports=n.p+"static/img/logo3.789a3cd.png"},oNqg:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f342a5f6ec0aea369015.js.map