<style lang="less">
    @import './orders.less';
    .page-box{padding-top: 16px; text-align: center }
    .add-btu{ position: relative; float: right}
    .ivu-card-head p.hasButtonP{ overflow:visible;}
    .doBox{ position:relative}
    .small_table .ivu-table-cell{ padding-left:8px; padding-right: 8px}
    .small_table table th{ text-align:center}
</style>

<template>
    <div>
        <Card>
            <p slot="title" class="hasButtonP">
                <Icon type="archive"></Icon>
                {{doName}}
            </p>
            <div class="doBox">
                <Spin size="large" fix v-if="switching"></Spin>         
                <div class="ordler-list" v-if="doType=='list'">
                    <div class="search-box">
                        <Form ref="searchData" :model="searchData" :rules="searchValidata" inline>
                            <FormItem prop="keyword">
                                <Input type="text" v-model="searchData.search" placeholder="输入商户名称或订单号搜索">
                                    <Icon type="ios-eye" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="searchDate">
                                <DatePicker type="daterange" v-model="searchData.searchDate" placeholder="请选择时间范围" style="width: 200px"></DatePicker>
                            </FormItem>
                            <Select v-model="searchData.payStatus" style="width:140px" placeholder="选择支付状态">
                                <Option v-for="item,key in payStatus" :value="key" :key="key">{{ item }}</Option>
                            </Select>
                            <!--<Select v-model="searchData.shipStatus" style="width:140px" placeholder="选择发货状态">
                                <Option v-for="item,key in shipStatus" :value="key" :key="key">{{ item }}</Option>
                            </Select>-->
                            <FormItem>
                                 <ButtonGroup>
                                    <Button type="primary" icon="search" @click="search()">搜索</Button>
                                    <Button @click="resetSearch">清空</Button>
                                </ButtonGroup>
                            </FormItem>
                        </Form>
                    </div>
                    <Table class="small_table" border :columns="columns" :loading="getLoading" :data="tableData"></Table>
                    <div class="page-box">
                        <Page v-if="page.dataCount>10" :total="page.dataCount" :current="page.pageNumber" show-total :page-size-opts="page.pageSizeOpts" :page-size="page.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator placement="top" show-sizer></Page>
                    </div>
                </div>
            </div>
            <Modal v-model="updateStatus" :width="500">
                <h3 slot="header" style="color:#2D8CF0">订单处理</h3>
                <Form ref="updateStatusForm" :model="updateStatusForm" :label-width="100" label-position="right" :rules="updateStatusValidate">
                    
                    <FormItem label="订单编号：" style="margin-bottom:0px">
                        {{updateStatusForm.order_no}}
                    </FormItem>
                    <FormItem label="商品名称：" style="margin-bottom:0px">
                        <template v-if="updateStatusForm.product_pay_type==0">
                            线下购买
                        </template>
                        <template v-else>
                            {{updateStatusForm.product_name}}
                        </template>
                    </FormItem>
                    <FormItem label="用 户 名：" style="margin-bottom:0px">
                        {{updateStatusForm.member_name}}
                    </FormItem>
                    <FormItem label="提交时间：">
                        {{updateStatusForm.date_added}}
                    </FormItem>
                    <FormItem label="快递单号：" prop="express_number">
                        <Input type="text" style="width:200px" v-model="updateStatusForm.express_number"></Input>
                    </FormItem>                    
                    <FormItem label="发货状态：" prop="ship_status">
                        <RadioGroup v-model="updateStatusForm.ship_status">
                            <Radio label="1">
                                <span>待发货</span>
                            </Radio>
                            <Radio label="2">
                                <span>已发货</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" @click="cancelEdit">取消</Button>
                    <Button type="primary" :loading="saveUpdateStatusLoading" @click="saveUpdateStatus">保存</Button>
                </div>
            </Modal>
        </Card>
    </div>
</template>

<script>
import Config from '../../config/config';
import Util from '../../libs/util';
import Cookies from 'js-cookie';



export default {
    name: 'merchant_orders',
    data () {
        const valideStatus = (rule, value, callback) => {
            if (value==1||value==2) {
                if(value==2){
                    if(!!this.updateStatusForm.express_number!=""){
                        callback();
                    }else{
                        callback(new Error("已发货状态必须填写快递单号！"));
                    }
                }else{
                    callback();
                }
            } else {
                callback(new Error("请选择发货状态"));
            }
        };
        return {
            tableOptions:{
                width:"100%"
            },
            payStatus:["不限","待支付","已支付"],
            shipStatus:["不限","待发货","已发货"],
            columns: [
                {
                    title: 'ID',
                    // width: "60",
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '订单编号',
                    // width: "160",
                    align: 'center',
                    key: 'order_no'
                },
                {
                    title: '商户',
                    align: 'center',
                    key: 'merchant_name',
                    render: (h, params) => {
                        let idText=h('span', {
                                style: {
                                    color: "#999"
                                }
                            }, "["+params.row.merchant_id+"] ");
                        let nameText=h('span', {}, params.row.merchant_name);
                        return h('div',[idText,nameText]);
                    }
                },
                {
                    title: '会员',
                    key: 'member_name',
                    align: 'center',
                    render: (h, params) => {
                        let idText=h('span', {
                                style: {
                                    color: "#999"
                                }
                            }, "["+params.row.member_id+"] ");
                        let nameText=h('span', {}, params.row.member_name); 
                        return h('div',[idText,nameText]);
                    }
                },
//              {
//                  title: '商品',
//                  key: 'product_name',
//                  render: (h, params) => {
//                      let putText=params.row.product_name;
//                      if(params.row.product_pay_type==0)putText="线下购买";
//                      return h('span', {}, putText );
//                  }
//              },
                {
                    title: '金额',
                    align: 'center',
                    key: 'total_score',
                    render: (h, params) => {
                        return h('span', {}, Util.fmoney(Util.numberCarry(params.row.total_score,100,4),6));
                    }
                },
                {
                    title: '返现',
                    key: 'cash',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', {}, Util.fmoney(Util.numberCarry(params.row.cash,100,4),6));
                    }
                },
//              {
//                  title: '返积分',
//                  // width: "80",
//                  key: 'score'
//              },
                {
                    title: '时间',
                    width: 130,
                    align: 'center',
                    key: 'date_added'
                },
                {
                        title: '支付方式',
                        align: 'center',
                        key: 'payment_method',
                        render:(h, params) => {

                            let tagcolor="default";
                            let tagText="";
                            if(params.row.payment_method==1){
                                tagcolor="green";tagText="购物积分";
                            };
                            if(params.row.payment_method==2){
                                tagcolor="red";tagText="红积分";
                            };
                            if(params.row.payment_method==3){
                                tagcolor="green";tagText="支付宝";
                            };
                            if(params.row.payment_method==4){
                                tagcolor="red";tagText="微信";
                            };
                            if(params.row.payment_method==5){
                                tagcolor="green";tagText="银行卡";
                            };
                          
                            return h('span', {
                                props: {
                                    color: tagcolor,
                                    size: 'small'
                                }
                            }, tagText);

                        }
                    },
                {
                    title: '状态',
                    align: 'center',
                    key: 'status',
                    // width: "80",
                    align: 'center',
                    render: (h, params) => {

                        let tagcolor="default";
                        let tagText="已拆红包";
                        if(params.row.status==2){
                            tagcolor="green";tagText="已支付";
                        };
                        if(params.row.status==1){
                            tagcolor="red";tagText="待支付";
                        };
                        
                        return h('Tag', {
                                props: {
                                    color: tagcolor,
                                    size: 'small'
                                }
                            }, tagText);

                    }
                },
//              {
//                  title: '快递单号',
//                  key: 'express_number',
//                  align: 'center',
//                  // width: "120",
//                  render: (h, params) => {
//                      let tagcolor="default";
//                      let tagText="------";
//                      if(params.row.express_number){
//                         tagText=params.row.express_number;
//                      };
//                      return h('span', {style: {
//                                  color: "#999999"
//                              }}, tagText);
//
//                  }
//              },
//              {
//                  title: '发货状态',
//                  key: 'ship_status',
//                  // width: "80",
//                  align: 'center',
//                  render: (h, params) => {
//
//                      let tagcolor="default";
//                      let tagText="--";
//                      if(params.row.status==2){
//                          let tagText="未处理";
//                          if(params.row.ship_status==2){
//                              tagcolor="green";tagText="已发货";
//                          };
//                          if(params.row.ship_status==1){
//                              tagcolor="red";tagText="待发货";
//                          };
//                          return h('Tag', {
//                              props: {
//                                  color: tagcolor,
//                                  size: 'small'
//                              }
//                          }, tagText);
//                      };
//                      return h('span', {}, tagText);
//
//                  }
//              },
//              {
//                  title: '操作',
//                  key: 'id',
//                  className : "order-col-11",
//                  // width: "9%",
//                  align: 'center',
//                  render: (h, params) => {
//
//                      let settlementButton=h('Button', {
//                              props: {
//                                  type: 'primary',
//                                  size: 'small'
//                              },
//                              on: {
//                                  click: () => {
//                                      this.showEdit(params.index)
//                                  }
//                              }
//                          }, '发货处理');
//
//                      let dobutton=[];
//
//                      if(params.row.status==2&&this.checkPower("fahuo"))dobutton.push(settlementButton);
//                      return h('div', dobutton);
//                  }
//              }

            ],
            doType:"list",
            switching:false,
            tableData: [],
            defaultData:{
                "id": 0,
                "order_no": "",
                "merchant_id": 0,
                "merchant_name": "",
                "member_id": 0,
                "member_name": "",
                "total_score": "",
                "status": 0,
                "date_added": "",
                "cash": "0.0000",
                "score": "0.0000",
                "ship_status":"",
                "express_number":"",
                "product_name":""
            },
            page: {
                dataCount:0,
                pageCount:0,
                pageSize: 10,
                pageNumber: 1,
                pageSizeOpts:[10,20,50,100]
            },
            dataReady:0,
            searchData:{
                search:"",
                searchDate:[],
                startDate:"",
                endDate:"",
                payStatus:"",
                shipStatus:""
            },
            searchValidata: {},
            updateStatusForm: {},
            updateStatusValidate: {
                ship_status: [
                    { required: true, validator: valideStatus,  trigger: 'blur' }
                ]
            },
            updateStatus: false, // 修改模态框显示
            saveUpdateStatusLoading: false
        };
    },
    computed : {
        getLoading () {
            return !(this.dataReady==0);
        },
        doName () {
            if (this.doType=="list") return "商户订单管理";
            return "商户订单管理";
        }
    },
    methods: {
        //controller
        checkPower (dotype) {
            return !!this.$store.state.Rights[Config.api.merchant.merchant_orders[dotype].MD5()];
        },
        doWhat (dotype,dataIndex) {
            if(!this.checkPower(dotype)){
                this.$Message.warning("对不起，您没有此操作权限！");
                return;
            }
            this.switching=true;
            if(dotype=="add"){
                this.resetCurrentData();
                this.doType="add";
            };
            if(dotype=="edit"){
                this.showEdit(dataIndex);
                this.doType="edit";
            };
            if(dotype=="delete"){
                this.delete(dataIndex);
            };
            if(dotype=="review"){
                this.changeStatus(dataIndex);
            };
            if(dotype=="list"){
                this.resetCurrentData();
                this.dataReady+=1;
                this.init();
                this.doType="list";
            };
            this.switching=false;
        },
        showEdit (index) {

            this.updateStatusForm = $.extend(true, {}, this.tableData[index]);
            this.updateStatusForm.dataIndex=index;

            this.saveType="edit";

            this.updateStatus = true;
        },
        cancelEdit () {
            this.updateStatusForm = {};
            this.updateStatus = false;
        },
        saveUpdateStatus () {

            this.$refs['updateStatusForm'].validate((valid) => {

                if(valid){

                    this.saveUpdateStatusLoading = true;
                    let postData={
                        ssid:Cookies.get('ssid'),
                        id:this.updateStatusForm.id,
                        ship_status:this.updateStatusForm.ship_status,
                        express_number:this.updateStatusForm.express_number
                    };

                    $.ajax({
                        url: Config.apiRootPath+Config.api.merchant.merchant_orders.fahuo,
                        type: 'POST',
                        dataType: 'json',
                        data: postData
                    })
                    .done((data)=>{
                        this.saveUpdateStatusLoading=false;
                        //userTypeList
                        if(!!data){
                            if(data.code==0){
                                this.$Message.success("操作成功！");
                                let newListData=$.extend(true, [], this.tableData);
                                newListData[this.updateStatusForm.dataIndex]=this.updateStatusForm;
                                this.updateStatusForm={};
                                this.tableData=newListData;
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
                        this.saveUpdateStatusLoading=false;
                        Config.showError({vm:this,
                            errorMsg:"服务器通讯失败"
                        });
                    });
                }
            });
        },
        view (index) {

        },
        // showEdit (index) {
        //     this.currentData=$.extend(true, {}, this.tableData[index]);
        //     this.doType="edit";
        // },
        //comm
        resetCurrentData () {
            this.currentData = $.extend(true, {}, this.defaultData);
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
                merchantId:"",
                memberId:"",
                searchDate:[],
                startDate:"",
                endDate:""
            };
            this.page.pageNumber=1;
            this.dataReady+=1;
            this.init();
        },
        search (pageNumber) {
            if(this.searchData.searchDate.length){
                this.searchData.startDate=Util.FormatDate(this.searchData.searchDate[0],"yyyy-MM-dd");
                this.searchData.endDate=Util.FormatDate(this.searchData.searchDate[1],"yyyy-MM-dd");
            };
            this.page.pageNumber=1;
            if(pageNumber)this.page.pageNumber=pageNumber;
            this.doWhat("list");
        },
        init () {
            this.getList();
        },
        getList () {
            let postData={
                ssid:Cookies.get('ssid'),
                page:this.page.pageNumber,
                pageSize:this.page.pageSize
            };
            if(this.searchData.search!="")postData.search=this.searchData.search;
            if(this.searchData.payStatus>0)postData.status=this.searchData.payStatus;
            if(this.searchData.shipStatus>0)postData.ship_status=this.searchData.shipStatus;
            if(this.searchData.startDate!="")postData.startDate=this.searchData.startDate;
            if(this.searchData.endDate!="")postData.endDate=this.searchData.endDate;

            $.ajax({
                url: Config.apiRootPath+Config.api.merchant.merchant_orders.list,
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
                url: Config.apiRootPath+Config.api.news.news_list.delete,
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
    updated () {
    },
    mounted () {
    },
    deactivated () {
    },
    activated (){
        this.doWhat("list");   
    }
};
</script>