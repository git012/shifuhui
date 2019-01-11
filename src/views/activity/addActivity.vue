<style lang="less">
    @import "../../styles/common.less";
</style>

<template>
    <Form
        id="editForm"
        ref="currentData"
        :model="currentData" 
        :label-width="150"
        label-position="right"
        :rules="currentDataValidate"
        @submit="saveEdit"
    >
		<FormItem label="赠送福惠积分上调比率：">
            <Select v-model="currentData.type" style="width:200px" placeholder="选择赠送白积分上调比率">
                <Option v-for="item in zkWhiteData" :value="item.value" :key="key">{{ item.name }}</Option>
            </Select>
         </FormItem>
		<FormItem label="活动时间：" prop="searchDate">
           <DatePicker type="daterange" v-model="currentData.searchDate" placeholder="请选择活动时间范围" style="width: 200px"></DatePicker>
        </FormItem>
        <div>
            <Button type="text" style="width: 100px;" @click="$emit('doWhat','list')" >取消</Button>
            <Button :disable="hasDataChange" type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit()">保存</Button>
        </div>
    </Form>
</template>

<script>
import Cookies from 'js-cookie';
import Config from '../../config/config';


export default {
    name: 'news_add',
    data () {
        const valideMerchantType = (rule, value, callback) => {
            if (value>0) {
                callback();
            } else {
                callback(new Error('请选择商户类型'));
            }
        };
        return {
            editorOption:{
                  modules: {
                    toolbar: '#toolbar'
                  }   
            },
            Kind:{},
            uploadUrl:{},
            currentData:{},
            zkWhiteData:[{'value':'0.1','name':'10%'},{'value':'0.2','name':'20%'},{'value':'0.3','name':'30%'},{'value':'0.4','name':'40%'},{'value':'0.5','name':'50%'},{'value':'0.6','name':'60%'}
            ,{'value':'0.7','name':'70%'},{'value':'0.8','name':'80%'},{'value':'0.9','name':'90%'}],
            defaultData:{
                id: 0,
                content: "",
                title: "",
                author: "",
                status: 0,
                date_added: ""
            },
            FormSubmiting:false,
            save_loading: false,
            addDataValidate: {
                searchDate: [
                    { required: true, message: '请选择活动时间范围', trigger: 'blur' }
                ],
                author: [
                    { required: true, message: '请输入作者', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请编辑内容', trigger: 'blur' }
                ]
            },
            editDataValidate: {
                title: [
                    { required: true, message: '请填写标题', trigger: 'blur' }
                ],
                author: [
                    { required: true, message: '请输入作者', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请编辑内容', trigger: 'blur' }
                ]
            }
        }
    },
    props : [
        "editData",
        "editType"
    ],
    computed : {
        dowhat (){
            return this.editType
        },
        editor() {
        return this.$refs.myTextEditor.quill;
      },
        beEditData () {
            return this.editData
        },
        contentBody () {
            return this.currentData.content
        },
        currentDataValidate () {
            if(this.doType=="add")return this.addDataValidate;
        },
        hasDataChange () {
            return !(JSON.stringify(this.currentData)==JSON.stringify(this.editData));
        }
    },
    methods: {
        //add && edit
        saveEdit () {

            this.$refs['currentData'].validate((valid) => {

                if (valid) {
                	if(this.currentData.searchDate.length){
                		this.currentData.startDate=Util.FormatDate(this.searchData.searchDate[0],"yyyy-MM-dd");
                		this.currentData.endDate=Util.FormatDate(this.searchData.searchDate[1],"yyyy-MM-dd");
                	}
                    this.switching = true;
                    let postData={
                        ssid:Cookies.get('ssid'),
                        title:this.currentData.title,
                        author:this.currentData.author,
                        content:this.currentData.content,
                        status:1
                    };
                    let requestUrl=Config.apiRootPath+Config.api.news.news_list.add;
                    
                    if(this.dowhat=="edit"){
                        postData.id=this.currentData.id;
                        requestUrl=Config.apiRootPath+Config.api.news.news_list.edit;
                    };

                    let _this=this;
                    //拉取用户类型
                    $.ajax({
                        url: requestUrl,
                        type: 'POST',
                        dataType: 'json',
                        data: postData
                    })
                    .done((data)=>{
                        this.switching=false;
                        //userTypeList
                        if(!!data){
                            if(data.code==0){
                                if(this.dowhat=="add")this.$emit("doWhat","list");
                                this.$Message.success("保存成功！");
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
                        this.switching=false;
                        Config.showError({vm:this,data:data,
                            errorMsg:"服务器通讯失败"
                        });
                    });
                }
            })
        },
        init () {          
        }
    },
    beforeMount () {
    
    },
    mounted () {
    },
    created () {
        if(this.beEditData.id){
            this.currentData=$.extend(true,{}, this.beEditData)
        }else{
            this.currentData=$.extend(true,{}, this.defaultData)
        };
    },
    deactivated () {
      
    },
    destroyed () {
       // tinyMCE.remove();
    },
    activated (){
    },
    watch : {
    }
};
</script>
