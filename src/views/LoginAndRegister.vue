<template>
    <Dialog :show="dialogConfig.show" :title="dialogConfig.title" :showCancel="false" :buttons="dialogConfig.buttons"
        width="400px" @close="close">
        <div class="loginPanel">
            <el-form class="login-register" :model="formdata" :rules="rules" ref="formdataRef">
                <!-- 邮箱输入 -->
                <el-form-item prop="email">
                    <el-input size="large" placeholder="请输入邮箱" v-model="formdata.email">
                        <template #prefix>
                            <span class="iconfont icon-account"></span>
                        </template>
                    </el-input>
                    <!-- 忘记密码或注册输入邮箱验证码 -->
                </el-form-item>
                <div v-if="opType == 1 || opType == 2">
                    <el-form-item prop="emailCode">
                        <div class="send-email-panel">
                            <el-input size="large" placeholder="请输入邮箱验证码" v-model="formdata.emailCode">
                                <template #prefix>
                                    <span class="iconfont icon-checkcode"></span>
                                </template>
                            </el-input>
                            <el-button class="send-email-btn" size="large" type="primary"
                                @click="getEmailCode">获取验证码</el-button>
                        </div>
                    </el-form-item>
                </div>
                <!-- 注册时输入昵称 -->
                <div v-if="opType == 2">
                    <el-form-item prop="nickname">
                        <el-input size="large" placeholder="请输入昵称" v-model="formdata.nickname">
                            <template #prefix>
                                <span class="iconfont icon-account"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <!-- 密码输入 -->
                <div v-if="opType == 0">
                    <el-form-item prop="password">
                        <el-input size="large" placeholder="请输入密码" v-model="formdata.password" type="password"
                            show-password>
                            <template #prefix>
                                <span class="iconfont icon-password"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <!-- 忘记密码或注册输入确认密码 -->
                <div v-if="opType == 1 || opType == 2">
                    <el-form-item prop="registPassword">
                        <el-input size="large" placeholder="密码由八-十六位组成,至少包含数字大写和小写字母" v-model="formdata.registPassword"
                            type="password" show-password>
                            <template #prefix>
                                <span class="iconfont icon-password"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="confirmPassword">
                        <el-input size="large" placeholder="请再次输入密码" v-model="formdata.confirmPassword" type="password"
                            show-password>
                            <template #prefix>
                                <span class="iconfont icon-password"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                <!-- 验证码输入 -->
                <el-form-item prop="checkCode">
                    <div class="checkcode-panel">
                        <el-input size="large" placeholder="请输入验证码" v-model="formdata.checkCode" style="width: 230px;">
                            <template #prefix>
                                <span class="iconfont icon-checkcode"></span>
                            </template>
                        </el-input>
                    </div>
                    <img :src="checkCodeUrl" alt="" @click="changeCheckCode(0)" class="checkCode">
                </el-form-item>
                <!-- 选项框 -->
                <el-form-item>
                    <div class="rememberme-panel" v-if="opType == 0">
                        <el-checkbox v-model="formdata.rememberMe">记住我</el-checkbox>
                    </div>
                    <div class="no-account">
                        <a href="javascript:void(0)" style="color: #007fff;" @click="changeOpType(1)"
                            v-if="opType == 0">忘记密码?</a>
                        <a href="javascript:void(0)" style="color: #007fff;" @click="changeOpType(0)"
                            v-if="opType == 1">去登录?</a>
                        <a href="javascript:void(0)" style="color: #007fff;" @click="changeOpType(2)"
                            v-if="opType == 0">没有账号?</a>
                        <a href="javascript:void(0)" style="color: #007fff;" @click="changeOpType(0)"
                            v-if="opType == 2">已有账号?</a>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button type="primary" size="large" class="op-btn" @click="loginOrUpdateOrRegister">
                        <span v-if="opType == 0">登录</span>
                        <span v-if="opType == 1">重置密码</span>
                        <span v-if="opType == 2">注册</span>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </Dialog>
</template>

<script setup>
    import { ref, getCurrentInstance } from "vue"

    const { proxy } = getCurrentInstance()

    const formdata = ref({})
    const formdataRef = ref()
    const checkCodeUrl = ref("/api/user/checkCode")
    const checkCodeUrlEmail = ref("/api/user/checkCode")
    const dialogConfig = ref({
        show: false,
        title: "登录",
    })
    /* 表单校验规则 */
    const checkPassword = (rule, value, callback) => {
        if (value != formdata.value.registPassword) {
            callback(new Error(rule.message))
        } else {
            callback()
        }
    }

    const rules = {
        email: [{ required: true, message: "请输入邮箱" }, { validator: proxy.Verify.email, message: "请输入正确的邮箱" }],
        password: [{ required: true, message: "请输入密码" }],
        checkCode: [{ required: true, message: "请输入验证码" }],
        emailCode: [{ required: true, message: "请输入邮箱验证码" }],
        nickname: [{ required: true, message: "请输入昵称" }],
        registPassword: [{ required: true, message: "请输入密码" }, { validator: proxy.Verify.password, message: "密码由八-十六位组成,至少包含数字大写和小写字母" }],
        confirmPassword: [{ required: true, message: "请再次输入密码" }, { validator: checkPassword, message: "请两次密码不一致" }],
    }
    /* 0:登录1:忘记密码2:注册 */
    const opType = ref(0)

    const changeCheckCode = (type) => {
        if (type == 0) {
            checkCodeUrl.value = checkCodeUrl.value + "?type=" + type + "&time=" + new Date().getTime()
        } else {
            checkCodeUrlEmail.value = checkCodeUrlEmail.value + "?type=" + type + "&time=" + new Date().getTime()
        }

    }

    const changeOpType = (type) => {
        opType.value = type
        formdataRef.value.resetFields()
        dialogConfig.value.title = type - 1 > 0 ? "注册" : "重置密码"
        if (type == 0) {
            dialogConfig.value.title = "登录"
        }
        changeCheckCode(0)
    }

    const showPanel = (type) => {
        dialogConfig.value.show = true
    }

    const close = () => {
        dialogConfig.value.show = false
    }

    defineExpose({
        showPanel,
    })
</script>

<style scoped>
    .login-register {
        background: #fff;
        border-radius: 5px;
    }

    .rememberme-panel {
        width: 100%;
    }

    .no-account {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
    }

    .checkCode {
        margin-left: auto;
        cursor: pointer;
    }

    .op-btn {
        width: 100%;
    }

    .send-email-panel {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .send-email-btn {
        margin-left: 5px;
    }

    .dialog-footer {
        display: flex;
        justify-content: space-around;
    }
</style>