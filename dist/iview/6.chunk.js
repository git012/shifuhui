webpackJsonp([6],{1008:function(e,t,a){e.exports={default:a(1010),__esModule:!0}},1009:function(e,t,a){"use strict";t.__esModule=!0;var i=a(1008),s=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(e,t,a){return t in e?(0,s.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},1010:function(e,t,a){a(1011);var i=a(67).Object;e.exports=function(e,t,a){return i.defineProperty(e,t,a)}},1011:function(e,t,a){var i=a(117);i(i.S+i.F*!a(85),"Object",{defineProperty:a(68).f})},1012:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"noUpFileInput",data:function(){return{uploadApi:"",imgName:"",newFilePath:"",fileData:"",visible:!1,upLoading:!1,fileType:{image:/\.(gif|jpg|jpeg|png)$/,rar:/\.(rar|zip|7z)$/,txt:/\.(doc|docx|pdf|xsl|xslx|ppt|pptx|txt)$/,music:/\.(mp3|mp4|wma)$/}}},props:["fileInfro"],computed:{FilePath:function(){return this.newFilePath?this.newFilePath:this.fileInfro.url},file_infro:function(){return this.fileInfro?{uploadApi:this.fileInfro.uploadApi||this.uploadApi,url:this.fileInfro.url||"",fileObj:this.fileInfro.fileObj||"uploadFile",fileObjName:this.fileInfro.fileObjName||"图片",uploadMenu:this.fileInfro.uploadMenu||"选择图片",uploadType:this.fileInfro.uploadType||"sync",type:this.fileInfro.type||"image",maxSize:this.fileInfro.maxSize?this.fileInfro.maxSize:2048}:{url:"",fileObj:"uploadFile",fileObjName:"图片",uploadMenu:"选择图片",uploadType:"sync",type:"image",maxSize:2048}}},methods:{handleView:function(){this.visible=!0},selectFile:function(){this.$refs.fileObj.click()},handleFormatError:function(e){this.upLoading=!1,this.$Notice.warning({title:"文件类型错误",desc:"上传文件："+e.name+" 文件类型不正确"})},handleMaxSize:function(e){this.upLoading=!1,this.$Notice.warning({title:"文件过大",desc:"上传文件："+e.name+" 过大，请不要超过"+this.bytesToSize(1024*this.file_infro.maxSize)})},handleGetFile:function(){var e=this.$refs.fileObj.files[0];if(e){var t=e.name.substr(e.name.lastIndexOf(".")).toLowerCase();if(!this.fileType[this.file_infro.type].test(t))return this.handleFormatError(e),!1;if(Math.round(e.size/1024*100)/100>this.file_infro.maxSize)return this.handleMaxSize(e),!1;this.imgName=e.name,this.showPreview(e),this.fileInfro.file=e}},showPreview:function(e){var t=this;if(window.FileReader&&e){var a=new FileReader;a.onloadend=function(e){t.newFilePath=e.target.result},a.readAsDataURL(e)}},bytesToSize:function(e){if(0===e)return"0 B";var t=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],a=Math.floor(Math.log(e)/Math.log(1024));return(e/Math.pow(1024,a)).toPrecision(3)+" "+t[a]}}}},1013:function(e,t){},1014:function(e,t){},1015:function(e,t,a){a(1013),a(1014);var i=a(66)(a(1012),a(1016),"data-v-483de72e",null);i.options.__file="F:\\changhaochen\\GitHub\\shifuhui\\src\\views\\my_components\\upload\\noUpFileInput.vue",i.esModule&&Object.keys(i.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] noUpFileInput.vue: functional components are not supported with templates, they should use render functions."),e.exports=i.exports},1016:function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"noUpFileInput"},[e.FilePath&&"image"==e.fileInfro.type?a("div",{staticClass:"noUpFileInput-filebox"},[a("img",{staticClass:"re-noUpFileInput-images",attrs:{src:e.FilePath,width:"auto",height:"58"},on:{click:function(t){e.handleView()}}})]):e._e(),e._v(" "),a("input",{ref:"fileObj",staticClass:"noup-file-Input",attrs:{type:"file"},on:{change:function(t){e.handleGetFile()}}}),e._v(" "),e.imgName?a("span",{staticClass:"noUpFileInput-newfile-name"},[e._v(e._s(e.imgName))]):e._e(),e._v(" "),a("Button",{attrs:{type:"ghost",icon:"ios-cloud-upload-outline"},on:{click:e.selectFile}},[e._v(e._s(e.file_infro.uploadMenu))]),e._v(" "),a("Modal",{attrs:{title:"图片预览","cancel-text":"关闭"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[e.visible?a("img",{staticStyle:{width:"100%"},attrs:{src:e.FilePath}}):e._e()])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},1059:function(e,t,a){"use strict";(function(e){function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s,r=a(1009),n=i(r),o=a(155),l=i(o),d=a(231),u=i(d),c=a(116),p=i(c),f=a(1015),h=i(f),g=a(100),m=i(g),y=(a(219),a(232));i(y);t.default={name:"classify",components:{noUpFileInput:h.default},data:function(){var e=this,t=function(e,t,a){t>0?a():a(new Error("请选择部门"))},a=function(e,t,a){/^1[0-9]{10}$/.test(t)?a():a(new Error("请输入正确格式的手机号"))},i=function(t,a,i){a!==e.editPasswordForm.newPass?i(new Error("两次输入密码不一致")):i()};return{disabledGroup:2,saveType:"new",doType:"list",switching:!1,tableData:[],groupData:[],typeData:["商圈分类","商品分类"],page:{dataCount:0,pageCount:0,pageSize:10,pageNumber:1,pageSizeOpts:[10,20,50,100]},dataReady:0,currentData:{},defaultData:{account:"",name:"",salt:"",mobile:"",face:{url:"",file:"",fileObjName:"分类图片",uploadMenu:"选择图片",uploadType:"sync",type:"image",maxSize:2048},password:"",user_group_id:""},addDataValidate:{title:[{required:!0,message:"请输入分类名称",trigger:"blur"}],is_integral:[{required:!0,message:"请勾选是否为积分分类",trigger:"change"}]},editDataValidate:{account:[{required:!0,message:"请输入帐号",trigger:"blur"}],name:[{required:!0,message:"请输入姓名",trigger:"blur"}],mobile:[{required:!0,message:"请输入手机号码"},{validator:a}],user_group_id:[{required:!0,validator:t,trigger:"blur"}]},editPasswordForm:{userid:"",oldPass:"",newPass:"",rePass:""},passwordValidate:{oldPass:[{required:!0,message:"请输入原密码",trigger:"blur"}],newPass:[{required:!0,message:"请输入新密码",trigger:"blur"},{min:6,message:"请至少输入6个字符",trigger:"blur"},{max:32,message:"最多输入32个字符",trigger:"blur"}],rePass:[{required:!0,message:"请再次输入新密码",trigger:"blur"},{validator:i,trigger:"blur"}]},oldPassError:"",editPasswordModal:!1,savePassLoading:!1,searchData:{keyword:"",searchDate:[],startDate:"",endDate:""},searchValidata:{}}},computed:{getLoading:function(){return!(0==this.dataReady)},doName:function(){return"list"==this.doType?"商品分类列表":"edit"==this.doType?"编辑分类":"添加分类"},currentDataValidate:function(){return"add"==this.doType?this.addDataValidate:this.editDataValidate},hasDataChange:function(){return!((0,l.default)(this.currentData)==(0,l.default)(this.tableData[this.currentData.listIndex]))}},methods:(s={renderContent:function(e,t){var a=this,i=(t.root,t.node,t.data);return e("span",{style:{display:"inline-block",width:"100%"}},[e("span",[e("Icon",{props:{type:"ios-folder-outline"},style:{marginRight:"8px"}}),e("span",i.title)]),e("span",{style:{display:"inline-block",float:"right",marginRight:"32px"}},[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){a.showEdit(i)}}},"修改"),e("Button",{props:{type:"error",size:"small"},style:{marginRight:"5px"},on:{click:function(){a.delete(i)}}},"删除")])])},typeOnChang:function(e){this.getList()},append:function(e){var t=e.children||[];t.push({title:"appended node",expand:!1}),this.$set(e,"children",t)},remove:function(e,t,a){},checkPower:function(e){return!!this.$store.state.Rights[u.default.api.management.classify[e].MD5()]},doWhat:function(e,t){console.log(this.checkPower(e)),this.switching=!0,"add"==e&&(this.resetCurrentData(),this.doType="add"),"edit"==e&&(this.showEdit(t),this.doType="edit"),"delete"==e&&this.delete(t),"list"==e&&(this.resetCurrentData(),this.dataReady+=2,this.init(),this.doType="list"),this.switching=!1},showEdit:function(e){this.currentData=e,this.doType="edit"},resetCurrentData:function(){this.currentData=e.extend(!0,{},this.defaultData)},changePage:function(e){this.page.pageNumber=e,this.search(e)},changePageSize:function(e){this.page.pageSize=e,this.page.pageCount=Math.ceil(this.page.dataCount/this.page.pageSize),this.search()},resetSearch:function(){this.searchData={keyword:"",searchDate:[],startDate:"",endDate:"",type:0},this.page.pageNumber=1,this.dataReady+=1,this.init()}},(0,n.default)(s,"resetSearch",function(){this.searchData={keyword:"",searchDate:[],startDate:"",endDate:""},this.page.pageNumber=1,this.dataReady+=1,this.init()}),(0,n.default)(s,"search",function(e){this.searchData.searchDate.length&&(this.searchData.startDate=p.default.FormatDate(this.searchData.searchDate[0],"yyyy-MM-dd"),this.searchData.endDate=p.default.FormatDate(this.searchData.searchDate[1],"yyyy-MM-dd")),this.page.pageNumber=1,e&&(this.page.pageNumber=e),this.doWhat("list")}),(0,n.default)(s,"init",function(){this.getGroups(),this.getList()}),(0,n.default)(s,"getList",function(){var t=this,a={ssid:m.default.get("ssid"),page:this.page.pageNumber,pageSize:this.page.pageSize,type:this.disabledGroup};""!=this.searchData.keyword&&(a.user_name=this.searchData.keyword),e.ajax({url:u.default.apiRootPath+u.default.api.management.classify.list,type:"POST",dataType:"json",data:a}).done(function(e){if(t.dataReady--,e)if(0==e.code){for(var a=[],i=0;i<e.data.list.length;i++)if(a.push({id:e.data.list[i].id,url:e.data.list[i].image,parent_id:e.data.list[i].parent_id,title:e.data.list[i].name,typeData:e.data.list[i].type-1,is_integral:e.data.list[i].is_integral,children:[],face:{url:e.data.list[i].image,file:"",fileObjName:"分类图片",uploadMenu:"选择图片",uploadType:"sync",type:"image",maxSize:2048},expand:!1}),void 0==e.data.list[i].subclass);else for(var s=0;s<e.data.list[i].subclass.length;s++)a[i].children.push({id:e.data.list[i].subclass[s].id,title:e.data.list[i].subclass[s].name,face:{url:e.data.list[i].subclass[s].image,file:"",fileObjName:"分类图片",uploadMenu:"选择图片",uploadType:"sync",type:"image",maxSize:2048},typeData:e.data.list[i].subclass[s].type-1,parent_id:e.data.list[i].subclass[s].parent_id,url:e.data.list[i].subclass[s].image,expand:!1});t.tableData=a}else u.default.showError({vm:t,data:e,errorMsg:""});else u.default.showError({vm:t,data:e,errorMsg:"请求失败"})}).fail(function(e,a,i){t.dataReady--,u.default.showError({vm:t,errorMsg:"服务器通讯失败"})})}),(0,n.default)(s,"getGroups",function(){var t=this,a={ssid:m.default.get("ssid")};e.ajax({url:u.default.apiRootPath+u.default.api.management.classify.lists,type:"POST",dataType:"json",data:a}).done(function(e){t.dataReady--,e?0==e.code?t.groupData=e.data.list:u.default.showError({vm:t,data:e,errorMsg:""}):u.default.showError({vm:t,data:e,errorMsg:"请求失败"})}).fail(function(e,a,i){t.dataReady--,u.default.showError({vm:t,errorMsg:"服务器通讯失败"})})}),(0,n.default)(s,"saveEdit",function(){var t=this;this.hasDataChange&&this.$refs.currentData.validate(function(a){if(a){t.switching=!0;var i=new FormData;i.append("ssid",m.default.get("ssid")),i.append("name",t.currentData.title),i.append("parent_id",t.currentData.parent_id),i.append("type",t.currentData.typeData+1),t.currentData.is_integral&&i.append("is_integral",t.currentData.is_integral),t.currentData.face.file&&i.append("image",t.currentData.face.file);var s=u.default.apiRootPath+u.default.api.management.classify.add;"edit"==t.doType&&(i.append("id",t.currentData.id),s=u.default.apiRootPath+u.default.api.management.classify.edit);e.ajax({url:s,type:"POST",dataType:"json",data:i,cache:!1,contentType:!1,processData:!1}).done(function(e){t.switching=!1,e?0==e.code?(t.currentData.face.file="",t.doWhat("list"),t.$Message.success("账户保存成功！")):u.default.showError({vm:t,data:e,errorMsg:""}):u.default.showError({vm:t,data:e,errorMsg:"请求失败"})}).fail(function(e,a,i){t.switching=!1,u.default.showError({vm:t,data:data,errorMsg:"服务器通讯失败"})})}})}),(0,n.default)(s,"delete",function(t){var a=this,i={ssid:m.default.get("ssid"),id:t.id};e.ajax({url:u.default.apiRootPath+u.default.api.management.classify.delete,type:"POST",dataType:"json",data:i}).done(function(e){e?0==e.code?(a.$Message.success("删除成功!"),a.doWhat("list")):u.default.showError({vm:a,data:e,errorMsg:""}):u.default.showError({vm:a,data:e,errorMsg:"请求失败"})}).fail(function(e,t,i){u.default.showError({vm:a,errorMsg:"服务器通讯失败"})})}),s),mounted:function(){},activated:function(){this.init()}}}).call(t,a(154))},1155:function(e,t){},1268:function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Card",[a("p",{staticClass:"hasButtonP",attrs:{slot:"title"},slot:"title"},[a("Icon",{attrs:{type:"person"}}),e._v("\n            "+e._s(e.doName)+"\n            "),e.checkPower("list")&&"list"!=e.doType?a("Button",{staticClass:"add-btu margin-left-10",attrs:{type:"warning",size:"small"},on:{click:function(t){e.doWhat("list")}}},[e._v("返回列表\n            ")]):e._e(),e._v(" "),e.checkPower("add")&&"list"==e.doType?a("Button",{staticClass:"add-btu",attrs:{type:"primary",size:"small"},on:{click:function(t){e.doWhat("add")}}},[e._v("添加分类\n            ")]):e._e()],1),e._v(" "),a("div",{staticClass:"doBox"},[e.switching?a("Spin",{attrs:{size:"large",fix:""}}):e._e(),e._v(" "),"list"!=e.doType?a("div",[a("Form",{ref:"currentData",attrs:{model:e.currentData,"label-width":120,"label-position":"right",rules:e.currentDataValidate}},[a("FormItem",{attrs:{label:"分类名称：",prop:"title"}},[a("div",{staticStyle:{display:"inline-block",width:"204px"}},[a("Input",{model:{value:e.currentData.title,callback:function(t){e.$set(e.currentData,"title",t)},expression:"currentData.title"}})],1)]),e._v(" "),a("FormItem",{attrs:{label:"上级分类：",prop:"parent_id"}},[a("div",{staticStyle:{width:"204px"}},[a("Select",{attrs:{placeholder:"请选择上级分类"},model:{value:e.currentData.parent_id,callback:function(t){e.$set(e.currentData,"parent_id",t)},expression:"currentData.parent_id"}},[a("Option",{key:0,attrs:{value:0}},[e._v("顶级分类")]),e._v(" "),e._l(e.groupData,function(t,i){return t?a("Option",{key:t.id,attrs:{label:t.name,value:t.id}},[a("label",{staticClass:"bank-card-username"},[e._v(e._s(t.name))])]):e._e()})],2)],1)]),e._v(" "),a("FormItem",{attrs:{label:"分类图片：",prop:"face"}},[a("noUpFileInput",{attrs:{fileInfro:e.currentData.face}})],1),e._v(" "),a("FormItem",{attrs:{label:"分类类型：",prop:"type"}},[a("div",{staticStyle:{width:"204px"}},[a("Select",{attrs:{placeholder:"请选择分类类型"},model:{value:e.currentData.typeData,callback:function(t){e.$set(e.currentData,"typeData",t)},expression:"currentData.typeData"}},e._l(e.typeData,function(t,i){return a("Option",{key:i,attrs:{value:i}},[e._v(e._s(t))])}))],1)]),e._v(" "),a("FormItem",{attrs:{label:"是否为积分分类：",prop:"is_integral"}},[a("RadioGroup",{model:{value:e.currentData.is_integral,callback:function(t){e.$set(e.currentData,"is_integral",t)},expression:"currentData.is_integral"}},[a("Radio",{attrs:{label:"0"}},[a("span",[e._v("否")])]),e._v(" "),a("Radio",{attrs:{label:"1"}},[a("span",[e._v("是")])])],1)],1),e._v(" "),a("div",[a("Button",{staticStyle:{width:"120px"},attrs:{type:"text"},on:{click:function(t){e.doWhat("list")}}},[e._v("取消")]),e._v(" "),a("Button",{staticStyle:{width:"120px"},attrs:{type:"primary"},on:{click:e.saveEdit}},[e._v("保存")])],1)],1)],1):e._e(),e._v(" "),"list"==e.doType?a("div",{staticClass:"ordler-list"},[a("div",{staticClass:"top",staticStyle:{height:"50px","line-height":"50px"}},[a("RadioGroup",{staticStyle:{width:"300px"},attrs:{type:"button"},on:{"on-change":e.typeOnChang},model:{value:e.disabledGroup,callback:function(t){e.disabledGroup=t},expression:"disabledGroup"}},[a("Radio",{staticStyle:{width:"50%"},attrs:{label:"1"}},[e._v("商圈分类")]),e._v(" "),a("Radio",{staticStyle:{width:"50%"},attrs:{label:"2"}},[e._v("商城分类")])],1)],1),e._v(" "),a("Tree",{attrs:{data:e.tableData,render:e.renderContent}}),e._v(" "),a("div",{staticClass:"page-box"},[e.page.pageCount>1?a("Page",{attrs:{total:e.page.dataCount,current:e.page.pageNumber,"show-total":"","page-size-opts":e.page.pageSizeOpts,"page-size":e.page.pageSize,"show-elevator":"",placement:"top","show-sizer":""},on:{"on-change":e.changePage,"on-page-size-change":e.changePageSize}}):e._e()],1)],1):e._e()],1)])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},992:function(e,t,a){a(1155);var i=a(66)(a(1059),a(1268),null,null);i.options.__file="F:\\changhaochen\\GitHub\\shifuhui\\src\\views\\management\\classify.vue",i.esModule&&Object.keys(i.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] classify.vue: functional components are not supported with templates, they should use render functions."),e.exports=i.exports}});