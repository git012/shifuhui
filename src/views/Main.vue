<style lang="less">
    @import "./main.less";
    .yunlianhui{ float: right; height: 100%; margin-right: 18px}
    .bind-btu{ display: inline-block; height: 100%; line-height: 60px; font-size: 14px}
    .yunlianhui_content{ padding: 2px 20px; text-align: center;}
    .yunlianhui_content .yunlianhui_account{ line-height: 48px; font-size: 20px; color: rgb(45, 140, 240); }
    .yunlianhui_content .ivu-form-item{ margin-bottom: 12px}
    .yunlianhui_content h3{ margin-bottom: 0px; margin-top: 12px}
    .yunlianhui-bottom.ivu-form-item {margin-bottom: 6px}
    .yunlianhui_content .ivu-form{ margin-top: 12px}
</style>
<template>
    <div class="main" :class="{'main-hide-text': hideMenuText}">
        <div class="sidebar-menu-con" :style="{width: hideMenuText?'60px':'200px', overflow: hideMenuText ? 'visible' : 'auto', background: $store.state.menuTheme === 'dark'?'#495060':'white'}">
                <div class="logo-con">
                    <img v-show="!hideMenuText"  src="../images/logo.png" key="max-logo" />
                    <img v-show="hideMenuText" src="../images/logo-min.png" key="min-logo" />
                </div>
                <sidebar-menu v-if="!hideMenuText" :menuList="menuList" :iconSize="14"/>
                <sidebar-menu-shrink :icon-color="menuIconColor" v-else :menuList="menuList"/>
        </div>
        <div class="main-header-con" :style="{paddingLeft: hideMenuText?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.hideMenuText ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">您好！{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="own_space">个人信息修改</DropdownItem>
                                    <DropdownItem name="loginout" v-bind:divided="topBarRights.modifyCashPassword==1||topBarRights.modifyPassword==1">退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </div>
                    <!-- <div @click="lockScreen" class="lock-screen-btn-con">
                        <Tooltip content="锁屏" placement="bottom">
                            <Icon type="locked" :size="20"></Icon>
                        </Tooltip>
                    </div> -->
                    <div @click="handleFullScreen" v-if="showFullScreenBtn" class="full-screen-btn-con">
                        <Tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
                            <Icon :type="isFullScreen ? 'arrow-shrink' : 'arrow-expand'" :size="23"></Icon>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div class="tags-con" @click="testPower">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: hideMenuText?'60px':'200px'}">

                <div class="single-page" >
                    <keep-alive :include="cachePage">
                        <router-view></router-view>
                    </keep-alive>
                </div>

        </div>
    </div>
</template>
<script>
    import sidebarMenu from './main_components/sidebarMenu.vue';
    import tagsPageOpened from './main_components/tagsPageOpened.vue';
    import breadcrumbNav from './main_components/breadcrumbNav.vue';
    import themeDropdownMenu from './main_components/themeDropdownMenu.vue';
    import sidebarMenuShrink from './main_components/sidebarMenuShrink.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';

    export default {
        components: {
            sidebarMenu,
            tagsPageOpened,
            breadcrumbNav,
            themeDropdownMenu,
            sidebarMenuShrink
        },
        data () {
            return {
                spanLeft: 4,
                spanRight: 20,
                currentPageName: '',
                hideMenuText: false,
                topBarRights: {
                    modifyPassword:1,
                    modifyCashPassword:1,
                    bindYunlianhui:1,
                    unbindYunlianhui:1
                },
                userName: '',
                access_yunlianhui:{
                    name:"bindYunlianhui",
                    access:0
                },
                rules_yunlianhui:{
                        account: { pattern: /^1[34578]\d{9}$/, required: true, message: '请正确输入云联惠帐号', trigger: 'blur' }
                    },
                yunlianhui:{
                    status:Cookies.get('cloud_status'),
                    account:Cookies.get('cloud_account'),
                    visible:false
                },
                showFullScreenBtn: window.navigator.userAgent.indexOf('MSIE') < 0,
                messageCount: 0,
                lockScreenSize: 0
            };
        },
        computed: {
            menuList () {
                return this.$store.state.menuList;
            },
            tagsList () {
                return this.$store.state.tagsList;  // 所有页面的页面对象
            },
            pageTagsList () {
                return this.$store.state.pageOpenedList;  // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.currentPath;  // 当前面包屑数组
            },
            menuIconColor () {
                return this.$store.state.menuTheme === 'dark' ? 'white' : '#495060';
            },
            avatorPath () {
                return this.$store.state.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.cachePage;
            },
            lang () {
                return this.$store.state.lang;
            },
            isFullScreen () {
                return this.$store.state.isFullScreen;
            }
        },
        methods: {
            testPower () {
                this.$store.commit('setPower')
            },
            init () {
                this.$store.commit('setCurrentPageName', this.$route.name);
                let pathArr = util.setCurrentPath(this, this.$route.name);
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = Cookies.get('user');
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
            },
            toggleClick () {
                this.hideMenuText = !this.hideMenuText;
            },
            handleBindYunlianhui: function (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        let postData = {
                            id: Cookies.get('merchant_id'),
                            ssid: Cookies.get('ssid'),
                            yun_account: this.yunlianhui.account,
                            yun_account_status: 1
                        };
                        let sucessFun = function (data) {
                            if (!!data) {
                                if (data.code == 0) {
                                    Cookies.set('cloud_account', _this.yunlianhui.account);
                                    Cookies.set('cloud_status', 1);
                                    _this.yunlianhui.status = 1;
                                    _this.$Message.success('绑定成功');
                                    _this.yunlianhui.visible = false;
                                } else {
                                    _this.$Message.error(data.message);
                                    if (data.code == 1111) {
                                        _this.$store.commit('logout', _this);
                                    }
                                }
                            }
                        };
                        let errFun = function (data) {
                            _this.$Message.error('绑定失败，请刷新页面重新尝试!');
                        };
                        $.ajax({
                            url: _this.$store.state.public.api.main.yunlianhui,
                            type: 'POST',
                            dataType: 'json',
                            data: postData
                        })
                            .done(sucessFun)
                            .fail(errFun);
                    } else {
                        this.$Message.error('请正确输入云联惠帐号!');
                    }
                });
            },
            handleUnBindYunlianhui: function () {
                if (!this.yunlianhui.status) return;
                let _this = this;
                let postData = {
                    id: Cookies.get('merchant_id'),
                    ssid: Cookies.get('ssid'),
                    yun_account: this.yunlianhui.account,
                    yun_account_status: 0
                };
                let sucessFun = function (data) {
                    if (!!data) {
                        if (data.code == 0) {
                            _this.yunlianhui.account = '';
                            _this.yunlianhui.status = 0;
                            Cookies.set('cloud_account', '');
                            Cookies.set('cloud_status', 0);
                            _this.yunlianhui.visible = false;
                            _this.$Message.success('成功解除绑定！');
                        } else {
                            _this.$Message.success(data.message);
                            if (data.code == 1111) {
                                _this.$store.commit('logout', _this);
                            }
                        }
                    }
                };
                let errFun = function (data) {
                    _this.$Message.error('绑定失败，请刷新页面重新尝试!');
                };
                $.ajax({
                    url: _this.$store.state.public.api.main.yunlianhui,
                    type: 'POST',
                    dataType: 'json',
                    data: postData,
                })
                    .done(sucessFun)
                    .fail(errFun);
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    Cookies.remove('user');
                    Cookies.remove('ssid');
                    Cookies.remove('hasGreet');
                    Cookies.remove('access');
                    Cookies.remove('user_power');
                    Cookies.remove('cloud_account');
                    Cookies.remove('cloud_status');
                    Cookies.remove('merchant_id');
                    Cookies.remove('user_id');
                    this.$Notice.close('greeting');
                    this.$store.commit('clearOpenedSubmenu');
                    // 回复默认样式
                    let themeLink = document.querySelector('link[name="theme"]');
                    themeLink.setAttribute('href', '');
                    // 清空打开的页面等数据，但是保存主题数据
                    let theme = '';
                    if (localStorage.theme) {
                        theme = localStorage.theme;
                    }
                    localStorage.clear();
                    if (theme) {
                        localStorage.theme = theme;
                    }
                    this.$router.push({
                        name: 'login'
                    });
                } else {
                    util.openNewPage(this, name);
                    this.$router.push({
                        name: name
                    });
                }
            },
            handleFullScreen () {
                this.$store.commit('handleFullScreen');
                // this.$store.commit('changeFullScreenState');
            },
            showMessage () {
                util.openNewPage(this, 'message_index');
                this.$router.push({
                    name: 'message_index'
                });
            },
            lockScreen () {
                let lockScreenBack = document.getElementById('lock_screen_back');
                lockScreenBack.style.transition = 'all 3s';
                lockScreenBack.style.zIndex = 10000;
                lockScreenBack.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset';
                this.showUnlock = true;
                this.$store.commit('lock');
                Cookies.set('last_page_name', this.$route.name); // 本地存储锁屏之前打开的页面以便解锁后打开
                setTimeout(() => {
                    lockScreenBack.style.transition = 'all 0s';
                    this.$router.push({
                        name: 'locking'
                    });
                }, 800);
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) {  //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            setTopBarRights () {
                if(this.$store.state.Rights&&this.$store.state.Rights.other){
                    this.$store.state.Rights.other.forEach(item => {
                        if(item.name=="bind-yunlianhui"){
                            this.topBarRights.bindYunlianhui=item.access
                        };
                        if(item.name=="unbind-yunlianhui"){
                            this.topBarRights.unbindYunlianhui=item.access
                        };
                        if(item.name=="modify-cash-password"){
                            this.topBarRights.modifyCashPassword=item.access
                        };
                        if(item.name=="modify-password"){
                            this.topBarRights.modifyPassword=item.access
                        };
                    })
                };
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
            },
            lang () {
                util.setCurrentPath(this, this.$route.name);  // 在切换语言时用于刷新面包屑
            }
        },
        mounted () {
            this.init();
            this.$store.commit('setRouter');
            this.$store.commit('setPower');
            this.$store.commit('updateMenulist');
            // 锁屏相关
            let lockScreenBack = document.getElementById('lock_screen_back');
            let x = document.body.clientWidth;
            let y = document.body.clientHeight;
            let r = Math.sqrt(x * x + y * y);
            let size = parseInt(r);
            this.lockScreenSize = size;
            window.addEventListener('resize', () => {
                let x = document.body.clientWidth;
                let y = document.body.clientHeight;
                let r = Math.sqrt(x * x + y * y);
                let size = parseInt(r);
                this.lockScreenSize = size;
                lockScreenBack.style.transition = 'all 0s';
                lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
            });
            lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
            // 问候信息相关
            if (!Cookies.get('hasGreet')) {
                let now = new Date();
                let hour = now.getHours();
                let greetingWord = {
                    title: '',
                    words: ''
                };
                let userName = Cookies.get('user');
                if (hour > 5 && hour < 6) {
                    greetingWord = {title: '凌晨好~' + userName, words: '早起的鸟儿有虫吃~'};
                } else if (hour >= 6 && hour < 9) {
                    greetingWord = {title: '早上好~' + userName, words: '来一杯咖啡开启美好的一天~'};
                } else if (hour >= 9 && hour < 12) {
                    greetingWord = {title: '上午好~' + userName, words: '工作要加油哦~'};
                } else if (hour >= 12 && hour < 14) {
                    greetingWord = {title: '中午好~' + userName, words: '午饭要吃饱~'};
                } else if (hour >= 14 && hour < 17) {
                    greetingWord = {title: '下午好~' + userName, words: '下午也要活力满满哦~'};
                } else if (hour >= 17 && hour < 19) {
                    greetingWord = {title: '傍晚好~' + userName, words: '下班没事问候下爸妈吧~'};
                } else if (hour >= 19 && hour < 21) {
                    greetingWord = {title: '晚上好~' + userName, words: '工作之余品一品书香吧~'};
                } else {
                    greetingWord = {title: '深夜好~' + userName, words: '夜深了，注意休息哦~'};
                }
                this.$Notice.config({
                    top: 130
                });
                this.$Notice.info({
                    title: greetingWord.title,
                    desc: greetingWord.words,
                    duration: 4,
                    name: 'greeting'
                });
                Cookies.set('hasGreet', 1);
            }
        },
        created () {

            // 查找当前用户之前登录时设置的主题
            let name = Cookies.get('user');
            if (localStorage.theme) {
                let hasThisUser = JSON.parse(localStorage.theme).some(item => {
                    if (item.userName === name) {
                        this.$store.commit('changeMenuTheme', item.menuTheme);
                        this.$store.commit('changeMainTheme', item.mainTheme);
                        return true;
                    } else {
                        return false;
                    }
                });
                if (!hasThisUser) {
                    this.$store.commit('changeMenuTheme', 'dark');
                    this.$store.commit('changeMainTheme', 'b');
                }
            } else {
                this.$store.commit('changeMenuTheme', 'dark');
                this.$store.commit('changeMainTheme', 'b');
            }
            // 根据用户设置主题
            if (this.$store.state.theme !== 'b') {
                let stylesheetPath = './dist/' + this.$store.state.theme + '.css';
                let themeLink = document.querySelector('link[name="theme"]');
                themeLink.setAttribute('href', stylesheetPath);
            }
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            // 权限菜单过滤相关
            this.$store.commit('updateMenulist');
            this.$store.commit('setPower');
            this.setTopBarRights();
        }
    };
</script>
