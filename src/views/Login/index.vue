<template>
    <div class="el-container">
        <div class="loginBox">
            <p class="loginTitle">用户登录</p>
            <div class="loginInput">
                <span class="loginUserIcon"></span>
                <input type="text" placeholder="请输入用户名称" v-model="datas.username" @blur="userNameBlur">
                <p class="errorText" v-show="showUserErrorText">请输入用户名称</p>
            </div>
            <div class="loginInput loginInputPsd">
                <span id="loginPsdIcon"></span>
                <input type="password" placeholder="请输入登录密码" v-model="datas.password" @blur="psdBlur">
                <p class="errorText" v-show="showPsdErrorText">请输入密码</p>
            </div>
            <div class="loginSubmit" @click="handleLogin">登录</div>
            <p class="forgetPsd">
                <span class="forgetSpan" @click="forgetPsd">忘记密码</span>
                <span class="registerSpan" @click="registerSubmit">还没有账号,马上注册</span>
            </p>
        </div>
    </div>
</template>

<script>
    import requestURL from '@/api/api'

    export default {
        name: "login",
        data() {
            return {
                dataArr: [],
                identifying: '',
                showIdentify: false,
                showUserErrorText: false,
                showPsdErrorText: false,
                fetchcodeimg: '',

                datas: {
                    username: 'admin',
                    password: 'admin22'
                }
            }
        },
        created () {
            // this.handleLogin();
            // this.getToken()
        },
        methods: {
            handleLogin() {
                requestURL.toLogin(this.datas).then(res => {
                    console.log(res)
                    localStorage.setItem('token', res.token)
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                    this.$router.push({ path: '/home' })
                }).catch(error => {
                    console.log(error)
                })
            },


            userNameBlur () {
                if (this.datas.username == '') {
                    this.showUserErrorText = true
                    return
                }
                this.showUserErrorText = false
            },
            psdBlur () {
                if (this.datas.password == '') {
                    this.showPsdErrorText = true
                    return
                }
                this.showPsdErrorText = false
            },
            getToken () {
                // let that = this
                requestURL.toGetToken().then(r => {
                    console.log('getToken', r)
                    // localStorage.setItem('token', r.stringVal)
                    // that.getFetchPicCode()
                })
            },
            getFetchPicCode () {
                let that = this
                requestURL.loginFetchPicCode().then(res => {
                    let reader = new FileReader()
                    reader.onload = (e) => {
                        that.fetchcodeimg = e.target.result
                    }
                    reader.readAsDataURL(res)
                })
            },
            // 点击验证码重新获取
            identifyCodeGet () {
                this.getFetchPicCode()
            },
            loginSubmitToken () {
                requestURL.toCheckPicCode(this.identifying).then(r => {
                    console.log(r)
                    requestURL.toCompanyLogin(this.userName, this.passWord).then(r => {
                        let obj = {}
                        obj = JSON.parse(JSON.stringify(r.obj))
                        obj.code = this.passWord

                        this.$router.push({ path: '/home' })

                    }).catch((err) => {
                        this.$message({
                            type: 'warning',
                            message: err.msg
                        })
                    })
                })
            },
            forgetPsd () {
                // this.$router.push({ path: '/forgetpsd' })
            },
            registerSubmit () {
                // this.$router.push({ path: '/register' })
            }
        },
    }
</script>

<style scoped lang="scss">
    .el-container {
        display: flex;
        justify-content: center;
        background-color: #cccccc;
    }
    .loginBox {
        display: inline-block;
        width: 350px;
        margin: 8% 0;
        background-color: #1f2d3d;
        border-radius: 10px;
        box-shadow: 10px 10px 10px #cccccc;
        position: relative;

        .loginTitle {
            width: 100%;
            text-align: left;
            font-size: 1.125rem;
            color: #fff;
            padding: 15px 0 15px 25px;
        }

        .loginInput {
            width: 300px;
            height: 38px;
            border: 1px solid #e0e0e0;
            margin-left: 25px;
            border-radius: 5px;

            .errorText {
                color: #ff0000;
                font-size: 0.75rem;
            }

            input {
                height: 100%;
                padding: 0;
                width: 85%;
                // margin-left: 14%;
                position: relative;
                left: 7%;
                border: none;
                border-style: none;
            }

            input:focus {
                outline: none;
            }

            .loginUserIcon {
                background: url(../../assets/login/userIcon.png) no-repeat;
                display: inline-block;
                width: 12px;
                height: 14px;
                background-size: 100%;
                vertical-align: middle;
                position: relative;
                left: 15px;
            }
        }

        .loginInputPsd {
            margin-top: 20px;

            .errorText {
                color: #ff0000;
                font-size: 12px;
            }

            #loginPsdIcon {
                background: url(../../assets/login/psdIcon.png) no-repeat;
                display: inline-block;
                width: 12px;
                height: 14px;
                background-size: 100%;
                vertical-align: middle;
                position: relative;
                left: 15px;
            }
        }

        .loginTnputIdentifying {
            width: 200px;
            height: 38px;
            border: 1px solid #e0e0e0;
            margin-left: 25px;
            border-radius: 5px;
            margin-top: 20px;

            .errorText {
                color: #ff0000;
                font-size: 0.75rem;
            }

            input {
                height: 100%;
                padding: 0;
                width: 85%;
                margin-left: 2%;
                border: none;
                border-style: none;
            }

            input:focus {
                outline: none;
            }

            #imageUrlSet {
                position: absolute;
                left: 240px;
            }
        }

        .identifyingCodeShow {
            font-size: 0.75rem;
            color: red;
            margin-left: 25px;
            float: left;
        }

        .loginSubmit {
            width: 300px;
            margin-left: 25px;
            margin-top: 25px;
            height: 38px;
            background-color: #339933;
            color: #ffffff;
            text-align: center;
            line-height: 38px;
            border-radius: 5px;
            cursor: pointer;
        }

        .forgetPsd {
            font-size: 0.875rem;
            color: #b3b3b3;
            padding: 20px 0 30px 0;

            span {
                cursor: pointer;
            }

            .forgetSpan {
                margin-left: 25px;
            }

            .registerSpan {
                margin-left: 30%;
            }
        }
    }
</style>
