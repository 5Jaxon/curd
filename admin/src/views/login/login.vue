<template>
    <div class="common-layout">
        <el-container >
            <el-header class="header-wrapped">
                <div class="header-content">
                    <h3>后台管理系统</h3>
                    <span class="welcome">欢迎登陆</span>
                </div>
            </el-header>
            <el-main>
                <div class="login-wrapped">
                    <el-card class="card-box">
                        <el-tabs v-model="activeName" class="demo-tabs" stretch="true">
                            <el-tab-pane label="登录" name="first">
                                <el-form  class="login-form" label-width="auto" style="max-width: 600px">
                                    <el-form-item label="账号">
                                        <el-input v-model="loginData.account" placeholder="请输入账号"/>
                                    </el-form-item>
                                    <el-form-item label="密码">
                                        <el-input v-model="loginData.password" placeholder="请输入密码" show-password/>
                                    </el-form-item>
                                    <div class="footer-wrapped">
                                        <div class="forget-password">
                                            <span class="forget-password-button" @click="forgetOpen">忘记密码</span>
                                        </div>
                                        <div class="footer-button">
                                            <el-button type="primary" @click="Login">登录</el-button>
                                        </div>
                                        <div class="footer-go-register">
                                            还没有账号?<span class="go-register" @click="goReg">马上注册</span>
                                        </div>
                                    </div>
                                    
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="注册" name="second">
                                <el-form  class="register-form" label-width="auto" style="max-width: 600px">
                                    <el-form-item label="账号">
                                        <el-input v-model="regData.account" placeholder="账号长度6-12位数字" />
                                    </el-form-item>
                                    <el-form-item label="密码">
                                        <el-input v-model="regData.password" placeholder="密码需长度6-12位含字母数字" show-password/>
                                    </el-form-item>
                                    <el-form-item label="确认密码">
                                        <el-input v-model="regData.repassword" placeholder="请再次输入密码" show-password/>
                                    </el-form-item>                                    
                                    <div class="footer-button">
                                        <el-button type="primary" @click="Register">注册</el-button>
                                    </div>                                                                            
                                    
                                </el-form>
                            </el-tab-pane>    
                        </el-tabs>
                    </el-card>
                </div>
            </el-main>
            <el-footer>
                <div class="footer-content">
                    <div class="title">
                        <span>后台管理 | </span>
                        <span>后台管理 | </span>
                        <span>后台管理</span>
                    </div>
                </div>
            </el-footer>
        </el-container>
    </div>

    <forget ref="forgetp"></forget>
</template>

<script lang="ts" setup>
    import { ref,reactive } from 'vue';
    import forget from './components/forget_password.vue'
    import { login,register } from '../../api/login';
    import { ElMessage } from 'element-plus'
    import { useRouter } from 'vue-router';
    import useUserInfo from '@/store/userinfo.js'
    import setRoutes from '@/store/setRoute.js'

    const activeName=ref('first');
    const router=useRouter();
    const store=useUserInfo();
    interface formData {
        account:number|null;
        password:string;
        repassword?:string
    }

    const loginData:formData=reactive({
        account:null,
        password:''
    })

    const regData:formData=reactive({
        account:null,
        password:'',
        repassword:''
    })
    
    const forgetp=ref();
    const forgetOpen=()=>{
        forgetp.value.open();
    }
    const goReg=()=>{activeName.value='second'}

    const routeStore=setRoutes()
    routeStore.routeLocal=[];
    sessionStorage.removeItem('token');

    const Login =async()=>{
        let res=await login(loginData);
        
        if(res.message=='登录成功'){
            const{token,result}=res;
            routeStore.setRoute(result.route)
            router.replace('/menu/home')
            localStorage.setItem('id',result.id);
            sessionStorage.setItem('token',token);
            store.userInfo(res.result);            
            
        }else{
            ElMessage({
                message:res.message,
                type:'error'
            })
        }
    }

    const Register=async ()=>{
        if(regData.password==regData.repassword){
            let res=await register(regData);
            
            if(res.message=='注册成功'){
                ElMessage({
                    message: '注册成功',
                    type: 'success',
                })
                activeName.value='first';
            }else{
                ElMessage({
                    message: res.message,
                    type: 'error',
                })
            }
        }else{
            ElMessage({
                    message: '注册失败,密码不一致',
                    type: 'error',
                })
        }
        
    }
</script>

<style scoped lang="scss">
//头部外壳
    .header-wrapped{
        // 头部内容
        .header-content{
            width:1200px;
            margin:0 auto;
            display: flex;
            align-items: center;
            justify-content: space-around;  
        }
        .welcome{
            font-size: 13px;
        }
    }

    .el-main{
        background-image: url('@/assets/rk.png');
        background-size: cover;
        background-position: center bottom;//对齐方式为下对其，令其超高时先裁剪上面
        height:600px;
        --el-main-padding: 0; 
        
        .login-wrapped{
            width: 1200px;
            height: 600px;
            margin: 0 auto;
            .card-box{
                width: 350px;
                height: 375px;
                float:right;
                position:relative;
                top:14%;
            }
        }
    }
    .el-footer{
        margin-top: 8px;
        .footer-content{
            width:1200px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        span{
            color: #666;
            size: 12px;
        }

    }
    .login-form{
        //登录底部外壳
        margin-top: 30px;
        .footer-wrapped{
            display: flex;
            flex-direction: column;
            .forget-password{
                display: flex;
                justify-content: flex-end;
                margin-top: 10px 0;
                .forget-password-button{
                    color: rgb(0, 162, 255);    
                    font-size: 13px;
                    cursor: pointer;
                }
            }
            .footer-button{
                margin: 15px;
                .el-button{
                    width: 100%;
                    height:45px
                }
            }
            .footer-go-register{
                font-size: 13px;
                display: flex;
                justify-content: center;
                .go-register{
                    color: rgb(0, 162, 255);  
                    cursor: pointer;
                }
            }
        }
    }

    .register-form{
        //注册底部外壳
        margin-top: 30px;        
        .footer-button{
            margin: 25px 15px;
            .el-button{
                width: 100%;
                height:45px
            }
        }

    }

    .el-input{
        height: 40px;
    }
    

    //表单标签
    :deep(.el-form-item__label){
        height: 40px;
        line-height: 40px;
    }
    //卡片标签
    :deep(.el-tabs__item) {
        color: #333;
        font-size: 18px;
    }
</style>