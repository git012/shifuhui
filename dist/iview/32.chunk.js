webpackJsonp([32],{1044:function(t,a,e){"use strict";(function(t){function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(a,"__esModule",{value:!0});var i=e(155),r=s(i),n=e(231),o=s(n),d=e(116),u=s(d),l=e(100),c=s(l),h=e(232);s(h);a.default={name:"listamountMaxUser",data:function(){var t=this,a=function(t,a,e){0==a||1==a?e():e(new Error(t.message))};return{columns:[{title:"会员名称",key:"member_name"},{title:"申请额度",key:"amount_max"},{title:"创建时间",key:"created"},{title:"现金花费总额",key:"cash_total"},{title:"红积分花费总额",width:150,key:"red_total"},{title:"购物积分花费总额",width:150,key:"shopping_total"},{title:"类型",key:"type",render:function(t,a){var e="";return 1==a.row.type&&(e="个人申请"),2==a.row.type&&(e="申请企业会员"),t("span",{props:{size:"small"}},e)}},{title:"状态",key:"status",align:"center",render:function(t,a){var e="default",s="待审核";return 1==a.row.status&&(e="green",s="通过"),-1==a.row.status&&(e="red",s="拒绝"),2==a.row.status&&(e="default",s="待审核"),t("Tag",{props:{color:e,size:"small"}},s)}},{title:"操作",key:"action",width:150,align:"center",render:function(a,e){var s=a("Button",{props:{size:"small",type:"error"},style:{marginRight:"10px"},on:{click:function(){t.doWhat("review",e.index,-1)}}},"拒绝"),i=a("Button",{props:{size:"small",type:"success"},on:{click:function(){t.doWhat("review",e.index,1)}}},"通过"),r=[];return 2==e.row.status&&(r.push(s),r.push(i)),a("div",r)}}],saveType:"new",doType:"list",switching:!1,tableData:[],merchantTypeData:[],areaData:{areaDataReady:3,province:[],citys:[],district:[]},shipStatus:["待审核","审核成功","审核失败"],Totals:{wait:"0.00",fail:"0.00",success:"0.00",sum_total:"0.00"},page:{dataCount:0,pageCount:0,pageSize:10,pageNumber:1,pageSizeOpts:[10,20,50,100]},dataReady:0,currentData:{},defaultData:{id:8,merchant_id:1,merchant_name:"",bank_id:1111,total:"1.0000",status:0,comment:"",date_added:"2017-11-16 16:00:20",bank_name:"",bank_number:""},updateStatusForm:{},updateStatusValidate:{status:[{validator:a,message:"请选择审核结果",trigger:"blur"}]},oldPassError:"",allSelect:[],loadBut:!1,updateStatus:!1,saveUpdateStatusLoading:!1,searchData:{keyword:"",searchDate:[],startDate:"",endDate:"",status:"",type:""},searchValidata:{}}},computed:{getLoading:function(){return!(0==this.dataReady)},areaDataReady:function(){return!(0==this.areaData.areaDataReady)},doName:function(){return"list"==this.doType?"商户基本信息管理":"edit"==this.doType?"编辑商户":"add"==this.doType?"添加商户":"商户详情"},currentDataValidate:function(){return"add"==this.doType?this.addDataValidate:this.editDataValidate},hasDataChange:function(){return!((0,r.default)(this.currentData)==(0,r.default)(this.tableData[this.currentData.listIndex]))}},methods:{changePage:function(t){this.page.pageNumber=t,this.search(t)},changePageSize:function(t){this.page.pageSize=t,this.page.pageCount=Math.ceil(this.page.dataCount/this.page.pageSize),this.search()},OnSelect:function(t){},selectionchange:function(t){},allOnSelect:function(t){this.allSelect=t},checkPower:function(t){return!!this.$store.state.Rights[o.default.api.management.Reviewmanagement[t].MD5()]},doWhat:function(t,a,e){if(!this.checkPower(t))return void this.$Message.warning("对不起，您没有此操作权限！");this.switching=!0,"add"==t&&(this.resetCurrentData(),this.doType="add"),"edit"==t&&(this.showEdit(a),this.doType="edit"),"delete"==t&&this.delete(a),"review"==t&&this.changeStatus(a,e),"list"==t&&(this.resetCurrentData(),this.dataReady+=1,this.init(),this.doType="list"),this.switching=!1},view:function(a){this.currentData=t.extend(!0,{},this.tableData[a]),this.doType="view"},showEdit:function(a){this.currentData=t.extend(!0,{},this.tableData[a]),this.currentData.userewm=o.default.apiRootPath+o.default.api.public.ewm+"&merchantId="+this.currentData.merchantId,this.setCity(this.currentData.merchantProvinceId,!0),this.setDistrict(this.currentData.merchantCityId,!0),this.doType="edit"},resetCurrentData:function(){this.currentData=t.extend(!0,{},this.defaultData)},search:function(t){this.searchData.searchDate.length&&(this.searchData.startDate=u.default.FormatDate(this.searchData.searchDate[0],"yyyy-MM-dd"),this.searchData.endDate=u.default.FormatDate(this.searchData.searchDate[1],"yyyy-MM-dd")),this.page.pageNumber=1,t&&(this.page.pageNumber=t),this.doWhat("list")},resetSearch:function(){this.searchData={keyword:"",searchDate:[],startDate:"",endDate:"",type:0},this.page.pageNumber=1,this.dataReady+=1,this.init()},init:function(){this.getList()},getList:function(){var a=this,e={ssid:c.default.get("ssid"),page:this.page.pageNumber,pageSize:this.page.pageSize,type:1};""!=this.searchData.keyword&&(e.search=u.default.trim(this.searchData.keyword)),""!=this.searchData.startDate&&(e.startDate=this.searchData.startDate),""!=this.searchData.status&&(e.status=this.searchData.status),""!=this.searchData.endDate&&(e.endDate=this.searchData.endDate),t.ajax({url:o.default.apiRootPath+o.default.api.amountMax.listamountMax.list,type:"POST",dataType:"json",data:e}).done(function(t){a.dataReady--,t?0==t.code?(a.page.dataCount=t.data.count,a.page.pageCount=Math.ceil(a.page.dataCount/a.page.pageSize),a.tableData=t.data.list):o.default.showError({vm:a,data:t,errorMsg:""}):o.default.showError({vm:a,data:t,errorMsg:"请求失败"})}).fail(function(t,e,s){a.dataReady--,o.default.showError({vm:a,errorMsg:"服务器通讯失败"})})},batchOperation:function(){for(var a=this,e=[],s=0;s<this.allSelect.length;s++)0==this.allSelect[s].status?this.allSelect[s].status=1:this.allSelect[s].status=0,e.push({id:this.allSelect[s].id,status:this.allSelect[s].status});var i={data:e},n={ssid:c.default.get("ssid"),data:(0,r.default)(i)};t.ajax({url:o.default.apiRootPath+o.default.api.amountMax.listamountMax.review,type:"POST",dataType:"json",data:n}).done(function(e){if(e)if(0==e.code){a.$Message.success("操作成功！");var s=t.extend(!0,[],a.tableData);s[a.updateStatusForm.tableIndex]=a.updateStatusForm,a.updateStatusForm={},a.tableData=s,a.updateStatus=!1,a.doWhat("list")}else o.default.showError({vm:a,data:e,errorMsg:""});else o.default.showError({vm:a,data:e,errorMsg:"请求失败"})}).fail(function(t,e,s){o.default.showError({vm:a,data:n,errorMsg:"服务器通讯失败"})})},changeStatus:function(a,e){var s=this,i={ssid:c.default.get("ssid"),status:e,id:this.tableData[a].id};t.ajax({url:o.default.apiRootPath+o.default.api.amountMax.listamountMax.review,type:"POST",dataType:"json",data:i}).done(function(t){s.saveUpdateStatusLoading=!1,t?0==t.code?(s.$Message.success("操作成功！"),s.doWhat("list")):o.default.showError({vm:s,data:t,errorMsg:""}):o.default.showError({vm:s,data:t,errorMsg:"请求失败"})}).fail(function(t,a,e){s.savePassLoading=!1,o.default.showError({vm:s,data:data,errorMsg:"服务器通讯失败"})})},handleSelectAll:function(t){this.$refs.selection.selectAll(t)},cancelUpdateStatus:function(){this.updateStatusForm={},this.updateStatus=!1}},mounted:function(){},activated:function(){this.doWhat("list")}}}).call(a,e(154))},1146:function(t,a){},1237:function(t,a,e){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("Card",[e("div",{staticClass:"doBox"},[t.switching?e("Spin",{attrs:{size:"large",fix:""}}):t._e(),t._v(" "),"list"==t.doType?e("div",{staticClass:"ordler-list"},[e("div",{staticClass:"search-box",staticStyle:{"margin-bottom":"20px"}},[e("Form",{ref:"searchData",staticStyle:{display:"inline-block"},attrs:{model:t.searchData,rules:t.searchValidata,inline:""}},[e("FormItem",{staticStyle:{"margin-bottom":"0px"},attrs:{prop:"searchDate"}},[e("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"daterange",placeholder:"请选择时间范围"},model:{value:t.searchData.searchDate,callback:function(a){t.$set(t.searchData,"searchDate",a)},expression:"searchData.searchDate"}})],1),t._v(" "),e("Select",{staticStyle:{width:"140px"},attrs:{placeholder:"选择审核状态"},model:{value:t.searchData.status,callback:function(a){t.$set(t.searchData,"status",a)},expression:"searchData.status"}},[e("Option",{attrs:{value:1}},[t._v("通过")]),t._v(" "),e("Option",{attrs:{value:-1}},[t._v("拒绝")]),t._v(" "),e("Option",{attrs:{value:2}},[t._v("待审核")])],1),t._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0px"}},[e("ButtonGroup",[e("Button",{attrs:{type:"primary",icon:"search"},on:{click:function(a){t.search()}}},[t._v("搜索")]),t._v(" "),e("Button",{on:{click:t.resetSearch}},[t._v("清空")])],1)],1)],1)],1),t._v(" "),e("Table",{attrs:{border:"",columns:t.columns,loading:t.getLoading,data:t.tableData}}),t._v(" "),e("div",{staticClass:"page-box"},[t.page.dataCount>10?e("Page",{attrs:{total:t.page.dataCount,current:t.page.pageNumber,"show-total":"","page-size-opts":t.page.pageSizeOpts,"page-size":t.page.pageSize,"show-elevator":"",placement:"top","show-sizer":""},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}}):t._e()],1)],1):t._e()],1)])],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},981:function(t,a,e){e(1146);var s=e(66)(e(1044),e(1237),null,null);s.options.__file="F:\\changhaochen\\世福惠\\src\\views\\amountMax\\listamountMaxUser.vue",s.esModule&&Object.keys(s.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] listamountMaxUser.vue: functional components are not supported with templates, they should use render functions."),t.exports=s.exports}});