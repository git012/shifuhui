webpackJsonp([4],{1020:function(e,t,n){var o=n(66)(n(1050),n(1243),null,null);o.options.__file="F:\\changhaochen\\世福惠\\src\\views\\home\\components\\countUp.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] countUp.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},1050:function(e,t,n){"use strict";function o(e){var t=0,n="";return e<1e3?t=e:e>=1e3&&e<1e6?(t=parseInt(e/1e3),n="K+"):e>=1e6&&e<1e10?(t=parseInt(e/1e6),n="M+"):(t=parseInt(e/1e9),n="B+"),{val:t,unit:n}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1105),r=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default={data:function(){return{unit:"",demo:{}}},name:"countUp",props:{idName:String,className:String,startVal:{type:Number,default:0},endVal:{type:Number,required:!0},decimals:{type:Number,default:0},duration:{type:Number,default:2},delay:{type:Number,default:500},options:{type:Object,default:function(){return{useEasing:!0,useGrouping:!0,separator:",",decimal:"."}}},color:String,countSize:{type:String,default:"30px"},countWeight:{type:Number,default:700},introText:[String,Number]},mounted:function(){var e=this;this.$nextTick(function(){setTimeout(function(){var t=o(e.endVal),n=t.val;e.unit=t.unit;var a={};e.demo=a=new r.default(e.idName,e.startVal,n,e.decimals,e.duration,e.options),a.error||a.start()},e.delay)})},watch:{endVal:function(e){var t=o(+e),n=t.val;this.unit=t.unit,this.demo.update(n)}}}},1051:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(233);t.default={name:"dataSourcePie",data:function(){return{}},mounted:function(){this.$nextTick(function(){var e=o.init(document.getElementById("data_source_con")),t={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"right",data:["ios","android","pc","web","others"]},series:[{name:"访问来源",type:"pie",radius:"66%",center:["50%","60%"],data:[{value:2103456,name:"ios",itemStyle:{normal:{color:"#9bd598"}}},{value:1305923,name:"android",itemStyle:{normal:{color:"#ffd58f"}}},{value:543250,name:"pc",itemStyle:{normal:{color:"#abd5f2"}}},{value:798403,name:"web",itemStyle:{normal:{color:"#ab8df2"}}},{value:302340,name:"others",itemStyle:{normal:{color:"#e14f60"}}}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};e.setOption(t),window.addEventListener("resize",function(){e.resize()})})}}},1052:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1020),a=function(e){return e&&e.__esModule?e:{default:e}}(o);t.default={name:"inforCard",components:{countUp:a.default},props:{idName:String,endVal:Number,color:String,iconType:String,introText:String,countSize:{type:String,default:"30px"},countWeight:{type:Number,default:700},iconSize:{type:Number,default:40}}}},1053:function(e,t,n){"use strict";(function(e){function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(100),r=(o(a),n(116));o(r),n(233);t.default={name:"serviceRequests",mounted:function(){return}}}).call(t,n(154))},1054:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(233),a=function(e){return e&&e.__esModule?e:{default:e}}(o),r={tooltip:{formatter:"{a} <br/>{b} : {c}%"},series:[{name:"入流量",type:"gauge",min:0,max:1e3,detail:{formatter:"{value}Mb+",fontSize:18,offsetCenter:[0,"50px"]},data:[{value:50,name:"当前入流量"}],center:["25%","50%"],radius:"80%",title:{offsetCenter:[0,"80px"]},axisLine:{lineStyle:{width:20}},splitLine:{length:20}},{name:"出流量",type:"gauge",min:0,max:1e3,detail:{formatter:"{value}Mb+",fontSize:18,offsetCenter:[0,"50px"]},data:[{value:50,name:"当前出流量"}],center:["75%","50%"],radius:"80%",title:{offsetCenter:[0,"80px"]},axisLine:{lineStyle:{width:20}},splitLine:{length:20}}]};t.default={name:"userFlow",mounted:function(){var e=a.default.init(document.getElementById("user_flow"));r.series[0].data[0].value=(1e3*Math.random()).toFixed(2)-0,r.series[1].data[0].value=(1e3*Math.random()).toFixed(2)-0,e.setOption(r),window.addEventListener("resize",function(){e.resize()})}}},1055:function(e,t,n){"use strict";(function(e){function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1206),r=o(a),i=n(1208),s=o(i),u=n(1209),l=o(u),d=n(1020),c=o(d),m=n(1207),f=o(m),p=n(100),h=o(p),v=n(231),_=o(v);t.default={name:"home_index",components:{dataSourcePie:r.default,serviceRequests:s.default,userFlow:l.default,countUp:c.default,inforCard:f.default},data:function(){return{userInfro:{name:h.default.get("user"),group:h.default.get("user_group_name")},count:{total_user:0,total_new_user:0,total_merchant:0,total_new_merchant:0},dataComplete:!1,newToDoItemValue:""}},computed:{avatorPath:function(){return localStorage.avatorImgPath}},methods:{addNewToDoItem:function(){this.showAddNewTodo=!0},addNew:function(){var e=this;0!==this.newToDoItemValue.length?(this.toDoList.unshift({title:this.newToDoItemValue}),setTimeout(function(){e.newToDoItemValue=""},200),this.showAddNewTodo=!1):this.$Message.error("请输入待办事项内容")},cancelAdd:function(){this.showAddNewTodo=!1,this.newToDoItemValue=""},setCount:function(){var t=this,n={ssid:h.default.get("ssid")};e.ajax({url:_.default.apiRootPath+_.default.api.home_index.count,type:"POST",dataType:"json",data:n}).done(function(e){e?0==e.code?(t.count.total_new_user+=e.data.newMemberCount,t.count.total_user+=e.data.memberTotal,t.count.total_new_merchant+=e.data.newMerchantCount,t.count.total_merchant+=e.data.merchantTotal,t.dataComplete=!0):_.default.showError({vm:t,data:e,errorMsg:""}):_.default.showError({vm:t,data:e,errorMsg:"数据获取错误，请刷新重试"})})}},created:function(){this.setCount()}}}).call(t,n(154))},1105:function(e,t,n){var o,a;!function(r,i){o=i,void 0!==(a="function"==typeof o?o.call(t,n,t,e):o)&&(e.exports=a)}(0,function(e,t,n){return function(e,t,n,o,a,r){for(var i=0,s=["webkit","moz","ms","o"],u=0;u<s.length&&!window.requestAnimationFrame;++u)window.requestAnimationFrame=window[s[u]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[s[u]+"CancelAnimationFrame"]||window[s[u]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),o=Math.max(0,16-(n-i)),a=window.setTimeout(function(){e(n+o)},o);return i=n+o,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)});var l=this;l.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:null,formattingFn:null};for(var d in r)r.hasOwnProperty(d)&&(l.options[d]=r[d]);""===l.options.separator&&(l.options.useGrouping=!1),l.options.prefix||(l.options.prefix=""),l.options.suffix||(l.options.suffix=""),l.d="string"==typeof e?document.getElementById(e):e,l.startVal=Number(t),l.endVal=Number(n),l.countDown=l.startVal>l.endVal,l.frameVal=l.startVal,l.decimals=Math.max(0,o||0),l.dec=Math.pow(10,l.decimals),l.duration=1e3*Number(a)||2e3,l.formatNumber=function(e){e=e.toFixed(l.decimals),e+="";var t,n,o,a;if(t=e.split("."),n=t[0],o=t.length>1?l.options.decimal+t[1]:"",a=/(\d+)(\d{3})/,l.options.useGrouping)for(;a.test(n);)n=n.replace(a,"$1"+l.options.separator+"$2");return l.options.prefix+n+o+l.options.suffix},l.easeOutExpo=function(e,t,n,o){return n*(1-Math.pow(2,-10*e/o))*1024/1023+t},l.easingFn=l.options.easingFn?l.options.easingFn:l.easeOutExpo,l.formattingFn=l.options.formattingFn?l.options.formattingFn:l.formatNumber,l.version=function(){return"1.7.1"},l.printValue=function(e){var t=l.formattingFn(e);"INPUT"===l.d.tagName?this.d.value=t:"text"===l.d.tagName||"tspan"===l.d.tagName?this.d.textContent=t:this.d.innerHTML=t},l.count=function(e){l.startTime||(l.startTime=e),l.timestamp=e;var t=e-l.startTime;l.remaining=l.duration-t,l.options.useEasing?l.countDown?l.frameVal=l.startVal-l.easingFn(t,0,l.startVal-l.endVal,l.duration):l.frameVal=l.easingFn(t,l.startVal,l.endVal-l.startVal,l.duration):l.countDown?l.frameVal=l.startVal-(l.startVal-l.endVal)*(t/l.duration):l.frameVal=l.startVal+(l.endVal-l.startVal)*(t/l.duration),l.countDown?l.frameVal=l.frameVal<l.endVal?l.endVal:l.frameVal:l.frameVal=l.frameVal>l.endVal?l.endVal:l.frameVal,l.frameVal=Math.round(l.frameVal*l.dec)/l.dec,l.printValue(l.frameVal),t<l.duration?l.rAF=requestAnimationFrame(l.count):l.callback&&l.callback()},l.start=function(e){return l.callback=e,l.rAF=requestAnimationFrame(l.count),!1},l.pauseResume=function(){l.paused?(l.paused=!1,delete l.startTime,l.duration=l.remaining,l.startVal=l.frameVal,requestAnimationFrame(l.count)):(l.paused=!0,cancelAnimationFrame(l.rAF))},l.reset=function(){l.paused=!1,delete l.startTime,l.startVal=t,cancelAnimationFrame(l.rAF),l.printValue(l.startVal)},l.update=function(e){cancelAnimationFrame(l.rAF),l.paused=!1,delete l.startTime,l.startVal=l.frameVal,l.endVal=Number(e),l.countDown=l.startVal>l.endVal,l.rAF=requestAnimationFrame(l.count)},l.printValue(l.startVal)}})},1151:function(e,t){},1158:function(e,t){},1206:function(e,t,n){var o=n(66)(n(1051),n(1311),null,null);o.options.__file="F:\\changhaochen\\世福惠\\src\\views\\home\\components\\dataSourcePie.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] dataSourcePie.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},1207:function(e,t,n){n(1151);var o=n(66)(n(1052),n(1245),null,null);o.options.__file="F:\\changhaochen\\世福惠\\src\\views\\home\\components\\inforCard.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] inforCard.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},1208:function(e,t,n){var o=n(66)(n(1053),n(1313),null,null);o.options.__file="F:\\changhaochen\\世福惠\\src\\views\\home\\components\\serviceRequests.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] serviceRequests.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},1209:function(e,t,n){var o=n(66)(n(1054),n(1290),null,null);o.options.__file="F:\\changhaochen\\世福惠\\src\\views\\home\\components\\userFlow.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] userFlow.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},1243:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("p",{class:e.className,style:{textAlign:"center",color:e.color,fontSize:e.countSize,fontWeight:e.countWeight}},[n("span",{attrs:{id:e.idName}},[e._v(e._s(e.startVal))]),n("span",[e._v(e._s(e.unit))])]),e._v(" "),e._t("intro")],2)},staticRenderFns:[]},e.exports.render._withStripped=!0},1245:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Card",{attrs:{padding:0}},[n("div",{staticClass:"infor-card-con"},[n("Col",{staticClass:"infor-card-icon-con",style:{backgroundColor:e.color,color:"white"},attrs:{span:"8"}},[n("Row",{staticClass:"height-100",attrs:{type:"flex",align:"middle",justify:"center"}},[n("Icon",{attrs:{type:e.iconType,size:e.iconSize}})],1)],1),e._v(" "),n("Col",{staticClass:"height-100",attrs:{span:"16"}},[n("Row",{staticClass:"height-100",attrs:{type:"flex",align:"middle",justify:"center"}},[n("count-up",{staticClass:"infor-card-count user-created-count",attrs:{"id-name":e.idName,"end-val":e.endVal,color:e.color,countSize:e.countSize,countWeight:e.countWeight}},[n("p",{staticClass:"infor-intro-text",attrs:{slot:"intro"},slot:"intro"},[e._v(e._s(e.introText))])])],1)],1)],1)])},staticRenderFns:[]},e.exports.render._withStripped=!0},1257:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home-main"},[n("Row",[n("Col",{attrs:{span:"8"}},[n("Row",[n("Card",[n("Row",{staticClass:"user-infor",attrs:{type:"flex"}},[n("Col",{attrs:{span:"8"}},[n("Row",{attrs:{"class-name":"made-child-con-middle",type:"flex",align:"middle"}},[n("img",{staticClass:"avator-img",attrs:{src:e.avatorPath}})])],1),e._v(" "),n("Col",{staticStyle:{"padding-left":"6px"},attrs:{span:"16"}},[n("Row",{attrs:{"class-name":"made-child-con-middle",type:"flex",align:"middle"}},[n("div",[n("b",{staticClass:"card-user-infor-name"},[e._v(e._s(e.userInfro.name))]),e._v(" "),n("p",[e._v(e._s(e.userInfro.group))])])])],1)],1)],1)],1)],1),e._v(" "),n("Col",{attrs:{span:"16","class-name":"padding-left-5"}},[e.dataComplete?n("Row",[n("Col",{attrs:{span:"12"}},[n("infor-card",{attrs:{"id-name":"user_created_count","end-val":e.count.total_new_user,iconType:"person-add",color:"#2d8cf0","intro-text":"今日新增用户数量"}})],1),e._v(" "),n("Col",{attrs:{span:"12","class-name":"padding-left-5"}},[n("infor-card",{attrs:{"id-name":"visit_count","end-val":e.count.total_new_merchant,iconType:"star",color:"#64d572",iconSize:50,"intro-text":"今日新增商户数量"}})],1)],1):e._e(),e._v(" "),e.dataComplete?n("Row",{attrs:{"class-name":"margin-top-10"}},[n("Col",{attrs:{span:"12"}},[n("infor-card",{attrs:{"id-name":"collection_count","end-val":e.count.total_user,iconType:"person",color:"#ffd572","intro-text":"用户总数量"}})],1),e._v(" "),n("Col",{attrs:{span:"12","class-name":"padding-left-5"}},[n("infor-card",{attrs:{"id-name":"transfer_count","end-val":e.count.total_merchant,iconType:"nuclear",color:"#f25e43","intro-text":"商户总数量"}})],1)],1):e._e()],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},1290:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticStyle:{width:"100%",height:"100%"},attrs:{id:"user_flow"}})},staticRenderFns:[]},e.exports.render._withStripped=!0},1311:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticStyle:{width:"100%",height:"100%"},attrs:{id:"data_source_con"}})},staticRenderFns:[]},e.exports.render._withStripped=!0},1313:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticStyle:{width:"100%",height:"100%"},attrs:{id:"service_request_con"}})},staticRenderFns:[]},e.exports.render._withStripped=!0},987:function(e,t,n){n(1158);var o=n(66)(n(1055),n(1257),null,null);o.options.__file="F:\\changhaochen\\世福惠\\src\\views\\home\\home.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] home.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports}});