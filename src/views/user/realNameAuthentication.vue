<style lang="less">
    .page-box{padding-top: 16px; text-align: center }
    .add-btu{ position: relative; float: right}
    .ivu-card-head p.hasButtonP{ overflow:visible;}
    .doBox{ position:relative}
    .small_table .ivu-table-cell{ padding-left:8px; padding-right: 8px}
    .small_table table th{ text-align:center}
    .shop-ewm{ position: absolute; right:0px; top:0px;width:180px; text-align: center;font-size:12px}
    .shop-ewm img{width:180px; height: auto; border:1px solid #dededf}
</style>

<template>
    <div>
        <Card>
            <p slot="title" class="hasButtonP">
                <Icon type="person"></Icon>
                {{doName}}
                <Button type="warning" class="add-btu margin-left-10" size="small" 
                    v-if="checkPower('list')&&doType!='list'" 
                    @click="doWhat('list')" >返回列表
                </Button>
            </p>
            <div class="doBox">
                <Spin size="large" fix v-if="switching"></Spin>
                <div class="ordler-list" v-if="doType=='list'">
                    
                    <div class="search-box">
                        <Form ref="searchData" :model="searchData" :rules="searchValidata" inline>
                            <FormItem prop="keyword">
                                <Input type="text" v-model="searchData.keyword" placeholder="输入名称搜索">
                                    <Icon type="ios-eye" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <Select v-model="searchData.type" style="width:150px" placeholder="请选择审核状态">
                                <Option v-for="item in recordStatus" :value="item.value">{{ item.name }}</Option>
                            </Select>
                            <FormItem>
                                <ButtonGroup>
                                    <Button type="primary" icon="search" @click="search()">搜索</Button>
                                    <Button @click="resetSearch()">清空</Button>
                                </ButtonGroup>
                            </FormItem>
                        </Form>
                    </div>
                    
                    <Table class="small_table" border :columns="columns" :loading="getLoading" :data="tableData"></Table>
                    <div class="page-box">
                        <Page v-if="page.dataCount>10" :total="page.dataCount" show-total :page-size-opts="page.pageSizeOpts" :page-size="page.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator placement="top" show-sizer></Page>
                    </div>
                </div>
            </div>
        <div v-if="updateStatus">
                <Form ref="updateStatusForm" :model="updateStatusForm" :label-width="150" label-position="right" :rules="updateStatusValidate">
                    <FormItem label="会员帐号：" style="margin-bottom:5px">
                         	<div style="width:150px;">
                                <Input v-model="updateStatusForm.user_name" readonly="readonly"></Input>
                            </div>
                    </FormItem>
                    <FormItem label="姓名：" style="margin-bottom:5px">
                         	<div style="width:150px;">
                                <Input v-model="updateStatusForm.name"></Input>
                            </div>
                    </FormItem>
                    <FormItem label="性别：" style="margin-bottom:5px" prop="is_direct">
                            <RadioGroup v-model="updateStatusForm.sex">
                                <Radio :label="1">
                                    <span>男</span>
                                </Radio>
                                <Radio :label="2">
                                    <span>女</span>
                                </Radio>
                            </RadioGroup>
                    </FormItem>
                    <FormItem label="身份证号码：" style="margin-bottom:5px">
                         	<div style="width:150px;">
                                <Input v-model="updateStatusForm.id_card"></Input>
                            </div>
                    </FormItem>
                    <FormItem label="电话：" style="margin-bottom:5px">
                         	<div style="width:150px;">
                                <Input v-model="updateStatusForm.mobile"></Input>
                            </div>
                    </FormItem>
                    <FormItem label="地区：" prop="merchantProvinceId" style="margin-bottom:5px">
                            <div style="display:inline-block;width:140px;">
                                <Select v-model="updateStatusForm.province_id" placeholder="请选择省份" @on-change="setCity">
                                    <Option v-if="item" v-for="item in areaData.province" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </div>
                            <div style="display:inline-block;width:140px;">
                                <Select v-if="areaData.citys.length&&updateStatusForm.province_id" placeholder="请选择城市" v-model="updateStatusForm.city_id" @on-change="setDistrict">
                                    <Option v-if="item" v-for="item in areaData.citys" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </div>
                            <div style="display:inline-block;width:140px;">
                                <Select v-if="areaData.district.length&&updateStatusForm.city_id" placeholder="请选择区县" v-model="updateStatusForm.district_id">
                                    <Option v-if="item" v-for="item in areaData.district" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </div>
                       </FormItem>
                    <FormItem label="地址：" style="margin-bottom:5px">
                         	<div style="width:150px;">
                                <Input v-model="updateStatusForm.address"></Input>
                            </div>
                    </FormItem>
                    <FormItem label="身份证正面照：">
                            <noUpFileInput :fileInfro="updateStatusForm.face"></noUpFileInput>
                    </FormItem>
                   <FormItem label="身份证正面照：">
                            <noUpFileInput :fileInfro="updateStatusForm.face2"></noUpFileInput>
                    </FormItem>    
                    <FormItem label="身份证手持照片：">
                            <noUpFileInput :fileInfro="updateStatusForm.face3"></noUpFileInput>
                    </FormItem> 
                    <FormItem label="审核状态：" prop="is_authentication">
                        <RadioGroup v-model="updateStatusForm.authentication_status">
                            <Radio :label="2">
                                <span>拒绝</span>
                            </Radio>
                            <Radio :label="1">
                                <span>审核通过</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
                <div slot="footer" style="margin-left: 50px;">
                    <Button type="default" @click="cancelUpdateStatus">取消</Button>
                    <Button type="primary" :loading="saveUpdateStatusLoading" @click="saveUpdateStatus">保存</Button>
                </div>
        </div>
            <Modal v-model="isShowCurrentImage" :width="600">
                <h3 slot="header" style="color:#2D8CF0">{{viewCurrentImage_card}}</h3>
                <div align="center">
                    <img :src="viewCurrentImage" width="100%" />
                </div>
                <div slot="footer">
                    <Button type="primary" @click="closeViewImage">关闭</Button>
                </div>
            </Modal>
        </Card>
    </div>
</template>

<script>
import Config from '../../config/config';
import Util from '../../libs/util';
import Cookies from 'js-cookie';
import noUpFileInput from '../my_components/upload/noUpFileInput.vue';

export default {
    name: 'real_name_authentication',
    components: {
        noUpFileInput
    },
    data () {
        const validStatus = (rule, value, callback) => {

            if (value==2||value==1) {
                callback();
            } else {
                callback(new Error('请选择认证结果'));
            }
        };
        return {

            columns: [
                {
                    title: 'ID',
                    // width: "60",
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '帐号',
                    align: 'center',
                    key: 'user_name'
                },
                {
                    title: '姓名',
                    align: 'center',
                    key: 'name'
                },
                 {
                    title: '性别',
                    align: 'center',
                    key: 'sex',
                    render: (h, params) => {
                        let tagText="";
                        if(params.row.sex==1){
                            tagText="男";
                        };
                        if(params.row.sex==2){
                            tagText="女";
                        };
                        return h('span',{}, tagText);

                    }
                    
                },
                {
                    title: '身份证号',
                    align: 'center',
                    key: 'id_card'
                },
                {
                    title: '手机',
                    align: 'center',
                    key: 'mobile'
                },
                {
                    title: '提交时间',
                    // width: "150",
                    align: 'center',
                    key: 'date_added'
                },
                 {
                    title: '状态',
                    key: 'authentication_status',
                    // width: "100",
                    align: 'center',
                    render: (h, params) => {

                        let tagcolor="default";
                        let tagText="未审核";
                        if(params.row.authentication_status==1){
                            tagcolor="green";tagText="认证通过";
                        };
                        if(params.row.authentication_status==0){
                            tagcolor="default";tagText="未认证";
                        };
                        if(params.row.authentication_status==2){
                            tagcolor="default";tagText="认证失败";
                        };
                        return h('Tag', {
                                props: {
                                    color: tagcolor,
                                    size: 'small'
                                }
                            }, tagText);

                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        let deleteButton=h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.doWhat("authentication",params.index)
                                    }
                                }
                            }, '编辑/审核');

                        let dobutton=[];
                        if(this.checkPower("authentication")){
                            dobutton.push(deleteButton);
                        };
                        return h('div', dobutton);
                    }
                }
            ],
            saveType: "new",
            doType:"list",
            switching:false,
            tableData: [],
            merchantTypeData: [],
            recordStatus:[{"value":"0","name":"未认证"},{"value":"1","name":"认证通过"},{"value":"2","name":"认证失败"}],
            areaData:{
                areaDataReady:3,
                province:[],
                citys:[],
                district:[]
            },
            page: {
                dataCount:0,
                pageCount:0,
                pageSize: 10,
                pageNumber: 1,
                pageSizeOpts:[10,20,50,100]
            },
            dataReady:0,
            currentData: {},
            defaultData:{
                "id": 0,
                "member_id": 0,
                "id_card": "",
                "name": "",
                "sex": 0,
                "province_id": 0,
                "city_id": 0,
                "district_id": 0,
                "address": "",
                "validity_time": "",
                "validity_status": 0,
                "date_added": "",
                "front_image": "",
                "reverse_image": "",
                "image": "",
                "is_authentication": 0,
                "user_name":"",
                "mobile":"",
            },
            updateStatusForm: {},
            updateStatusValidate: {
                is_authentication: [
                    { required: true, validator: validStatus, trigger: 'blur' }
                ]
            },
            oldPassError: '',
            updateStatus: false, // 修改密码模态框显示
            saveUpdateStatusLoading: false,
            searchData:{
                keyword:"",
                searchDate:[],
                startDate:"",
                endDate:"",
                type:""
            },
            searchValidata: {},
            isShowCurrentImage:false,
            viewCurrentImage:"",
            viewCurrentImage_card:""
        };
    },
    computed : {
        getLoading () {
            return !(this.dataReady==0);
        },
        areaDataReady () {
            return !(this.areaData.areaDataReady==0);
        },
        doName () {
        	if(this.doType=='list'){
        		 return "待实名认证用户列表";
        	}else{
        		return "编辑/审核用户实名认证";
        	}
           
        },
        currentDataValidate () {
            if(this.doType=="add")return this.addDataValidate;
            return this.editDataValidate;
        },
        hasDataChange () {
            return !(JSON.stringify(this.currentData)==JSON.stringify(this.tableData[this.currentData.listIndex]));
        }
    },
    methods: {
        //controller
        checkPower (dotype) {
            return !!this.$store.state.Rights[Config.api.user.real_name_authentication[dotype].MD5()];
        },
        doWhat (dotype,dataIndex) {
            if(!this.checkPower(dotype)){
                this.$Message.warning("对不起，您没有此操作权限！");
                return;
            }
            this.switching=true;
            if(dotype=="authentication"){
            	this.doType="Rlist";
                this.changeStatus(dataIndex);
            };
            if(dotype=="list"){
                this.resetCurrentData();
                this.dataReady+=2;
                this.init();
                this.doType="list";
                this.updateStatus=false;
            };
            this.switching=false;
        },
        view (index) {
            this.currentData=$.extend(true, {}, this.tableData[index]);
            this.doType="view";
        },
        showEdit (index) {
            this.currentData=$.extend(true, {}, this.tableData[index]);
            this.currentData.userewm=Config.apiRootPath+Config.api.public.ewm+"&merchantId="+this.currentData.merchantId;
            this.setCity(this.currentData.merchantProvinceId,true);
            this.setDistrict(this.currentData.merchantCityId,true);
            this.doType="edit";
        },
        //comm
        viewImage (imageUrl,otherInfro) {
            if(!imageUrl)return;
            this.viewCurrentImage=imageUrl;
            this.viewCurrentImage_card=otherInfro;
            this.isShowCurrentImage=true;
        },
        closeViewImage (imageUrl) {
            this.viewCurrentImage="";
            this.isShowCurrentImage=false;
        },
        resetCurrentData () {
            this.updateStatusForm = $.extend(true, {}, this.defaultData);
        },
        changePage (pageNumber){
            this.page.pageNumber=pageNumber;
            this.search(pageNumber);
        },
        changePageSize (pageSize){
            this.page.pageSize=pageSize;
            this.page.pageCount=Math.ceil(this.page.dataCount/this.page.pageSize);
            this.search();
        },
        //list
        resetSearch () {
            this.searchData={
                keyword:"",
                searchDate:[],
                startDate:"",
                endDate:"",
                type:""
            };
            this.page.pageNumber=1;
            this.dataReady+=2;
            this.init();
        },
        search (pageNumber) {
            if(this.searchData.searchDate.length){
                this.searchData.startDate=Util.FormatDate(this.searchData.searchDate[0],"yyyy-MM-dd");
                this.searchData.endDate=Util.FormatDate(this.searchData.searchDate[1],"yyyy-MM-dd");
            }
            this.page.pageNumber=1;
            if(pageNumber)this.page.pageNumber=pageNumber;
            this.doWhat("list");
        },
        init () {
            this.getMerchantType();
            this.getList();
        },
        getList () {
            let postData={
                ssid:Cookies.get('ssid'),
                page:this.page.pageNumber,
                pageSize:this.page.pageSize
            };
            if(this.searchData.keyword!="")postData.user_name=Util.trim(this.searchData.keyword);
            if(this.searchData.type!="")postData.authentication_status=Util.trim(this.searchData.type);
            $.ajax({
                url: Config.apiRootPath+Config.api.user.real_name_authentication.list,
                type: 'POST',
                dataType: 'json',
                data: postData
            })
            .done((data)=>{
                this.dataReady--;              
                // getList
                if(!!data){
                    if(data.code==0){
                        this.page.dataCount=data.data.count;
                        
                        this.page.pageCount=Math.ceil(this.page.dataCount/this.page.pageSize);
                        //format list data
                        this.tableData=data.data.list;
                    }else{
                        Config.showError({vm:this,data:data,
                            errorMsg:""
                        });
                    }
                }else{
                    Config.showError({vm:this,data:data,
                        errorMsg:"请求失败"
                    });
                }
            })
            .fail((xhr,status,error)=>{
                this.dataReady--;
                Config.showError({vm:this,
                    errorMsg:"服务器通讯失败"
                });
            });
            
        },
        getMerchantType () {
            let postData={
                ssid:Cookies.get('ssid'),
                page:this.page.pageNumber,
                pageSize:this.page.pageSize
            };
            $.ajax({
                url: Config.apiRootPath+Config.api.public.merchantType,
                type: 'POST',
                dataType: 'json',
                data: postData
            })
            .done((data)=>{
                // getBankCardList
                this.dataReady--;
                if(!!data){
                    if(data.code==0){
                        let typelist=[];
                        for (let item in data.data){
                            typelist.push({ value: parseInt(item) ,label: data.data[item]});
                        }
                        this.merchantTypeData=typelist;
                    }else{
                        Config.showError({vm:this,data:data,
                            errorMsg:""
                        });
                    }
                }else{
                   Config.showError({vm:this,data:data,
                        errorMsg:"请求失败"
                    });
                }
            })
            .fail((xhr,status,error)=>{
                this.dataReady--;
                Config.showError({vm:this,
                    errorMsg:"服务器通讯失败"
                });
            });

        },
        setProvince () {
            $.ajax({
                url: Config.apiRootPath+Config.api.public.getProvince,
                type: 'POST',
                dataType: 'json',
                data: { ssid:Cookies.get('ssid') }
            }).done((data)=>{
                // getBankCardList
                if(!!data){
                    if(data.code==0){
                        let typelist=[];
                        for (let item in data.data){
                            typelist[parseInt(data.data[item].id)]={
                                id : data.data[item].id,
                                name : data.data[item].name
                            };
                        }
                        this.areaData.province=typelist;
                    }
                }
            });
        },
        setCity (provinceId,dataReset) {
            if(!provinceId)return;
            if(!dataReset){
                this.currentData.merchantCityId="";
                this.currentData.merchantDistrictId="";
            }
            this.areaData.citys=[];
            this.areaData.district=[];
            $.ajax({
                url: Config.apiRootPath+Config.api.public.getCity,
                type: 'POST',
                dataType: 'json',
                data: { ssid:Cookies.get('ssid') , pid : provinceId }
            }).done((data)=>{
                // getBankCardList
                if(!!data){
                    if(data.code==0){
                        let typelist=[];
                        for (let item in data.data){
                            typelist[parseInt(data.data[item].id)]={
                                id : data.data[item].id,
                                name : data.data[item].name,
                                pid : data.data[item].pid
                            };
                        }
                        this.areaData.citys=typelist;
                    }
                }
            });
        },
        setDistrict (cityId,dataReset) {
            if(!cityId)return;
            this.areaData.district=[];
            if(!dataReset){
                this.currentData.merchantDistrictId="";
            }
            $.ajax({
                url: Config.apiRootPath+Config.api.public.getDistrict,
                type: 'POST',
                dataType: 'json',
                data: { ssid:Cookies.get('ssid') ,  cid : cityId }
            }).done((data)=>{
                // getBankCardList
                if(!!data){
                    if(data.code==0){
                        let typelist=[];
                        for (let item in data.data){
                            typelist[parseInt(data.data[item].id)]={
                                id : data.data[item].id,
                                name : data.data[item].name,
                                cid : data.data[item].cid
                            };
                        }
                        this.areaData.district=typelist;
                    }
                }
            });
        },
        //edit password
        changeStatus (index) {
            this.updateStatusForm=$.extend(true, {}, this.tableData[index]);
            this.updateStatusForm.tableIndex=index;
            this.setCity(this.updateStatusForm.province_id,true);
            this.setDistrict(this.updateStatusForm.city_id,true);
            this.updateStatusForm.face={
                                        url:this.updateStatusForm.front_image,
                                        file:"",
                                        fileObjName:"身份证正面照",
                                        uploadMenu:"选择图片",
                                        uploadType:"sync",
                                        type:"image",
                                        maxSize:2048
                                    };
            this.updateStatusForm.face2={
                                        url:this.updateStatusForm.reverse_image,
                                        file:"",
                                        fileObjName:"身份证反面照",
                                        uploadMenu:"选择图片",
                                        uploadType:"sync",
                                        type:"image",
                                        maxSize:2048
                                    };
            this.updateStatusForm.face3={
                                        url:this.updateStatusForm.image,
                                        file:"",
                                        fileObjName:"身份证手持照片",
                                        uploadMenu:"选择图片",
                                        uploadType:"sync",
                                        type:"image",
                                        maxSize:2048
                                    };
          this.updateStatus = true;
        },
        cancelUpdateStatus () {
            this.updateStatusForm={};
            this.updateStatus = false;
            this.doType='list';
        },
        saveUpdateStatus () {
//          this.$refs['updateStatusForm'].validate((valid) => {
//
//              if(valid){
                    this.saveUpdateStatusLoading = true;
                    var formDataSe = new FormData();
                    formDataSe.append("ssid", Cookies.get('ssid'));
                    formDataSe.append("id", this.updateStatusForm.id);
                    formDataSe.append("authentication_status",this.updateStatusForm.authentication_status);
                    formDataSe.append("name", this.updateStatusForm.name);
                    formDataSe.append("sex",this.updateStatusForm.sex);
                    formDataSe.append("id_card", this.updateStatusForm.id_card);
                    formDataSe.append("mobile",this.updateStatusForm.mobile);
                    formDataSe.append("province_id", this.updateStatusForm.province_id);
                    formDataSe.append("city_id", this.updateStatusForm.city_id);
                    formDataSe.append("district_id", this.updateStatusForm.district_id);
                    formDataSe.append("address",this.updateStatusForm.address);
                    if(this.updateStatusForm.face.file){
                        formDataSe.append("front_image", this.updateStatusForm.face.file);
                    };
                    if(this.updateStatusForm.face2.file){
                        formDataSe.append("reverse_image", this.updateStatusForm.face2.file);
                    };
                    if(this.updateStatusForm.face3.file){
                        formDataSe.append("image", this.updateStatusForm.face3.file);
                    };
                    $.ajax({
                        url: Config.apiRootPath+Config.api.user.real_name_authentication.authentication,
                        type: 'POST',
                        dataType: 'json',
                        data: formDataSe,
                        cache: false,  
                        contentType: false,  
                        processData: false 
                    })
                    .done((data)=>{
                        this.saveUpdateStatusLoading=false;
                        //userTypeList
                        if(!!data){
                            if(data.code==0){
                                this.$Message.success("操作成功！");
                                let newListData=$.extend(true, [], this.tableData);
                                this.doWhat("list");
                               
                                this.updateStatus = false;
                            }else{
                                Config.showError({vm:this,data:data,
                                    errorMsg:""
                                });
                            }
                        }else{
                            Config.showError({vm:this,data:data,
                                errorMsg:"请求失败"
                            });
                        }
                    })
                    .fail((xhr,status,error)=>{
                        this.savePassLoading=false;
                        Config.showError({vm:this,
                            errorMsg:"服务器通讯失败"
                        });
                    });

//              } 
//
//          })


            
        },
        //delete
        delete (index) {

            if(!this.tableData[index].id)return;
            //银行选择
            let postData=()=>({
                    ssid:Cookies.get('ssid'),
                    id:this.tableData[index].id,
                    status:0
                });
            $.ajax({
                url: Config.apiRootPath+Config.api.user.real_name_authentication.delete,
                type: 'POST',
                dataType: 'json',
                data: postData()
            })
            .done((data)=>{
                //userTypeList
                if(!!data){
                    if(data.code==0){
                        this.$Message.success("删除成功!"); 
                        this.tableData.splice(index, 1);
                    }else{
                        Config.showError({vm:this,data:data,
                            errorMsg:""
                        });
                    }
                }else{
                    Config.showError({vm:this,data:data,
                        errorMsg:"请求失败"
                    });
                }
            })
            .fail((xhr,status,error)=>{
                Config.showError({vm:this,
                    errorMsg:"服务器通讯失败"
                });
            });
        }
    },
    mounted () {
        window.addEventListener('resize', () => {
            let x = document.body.clientWidth;
            let y = document.body.clientHeight;
            let r = Math.sqrt(x * x + y * y);
        });
        this.setProvince();
    },
    activated (){
        this.doWhat("list");   
    }
};
</script>