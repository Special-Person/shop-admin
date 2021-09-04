<template>
	<div class="login_container">
		<div class="login_box">
			<!-- 头像区域 -->
			<div class="avatar_box">
				<img src="../assets/logo.png" alt="">
			</div>
			<!-- 表单登录区域 -->
			<el-form ref="loginFormRef" :rules="loginFormRules" :model="form" class="login_form">
				<el-form-item prop="username">
					<el-input prefix-icon="el-icon-user" v-model="form.username" placeholder="请输入用户名" clearable />
				</el-form-item>
				<el-form-item prop="password">
					<el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="form.password" show-password />
				</el-form-item>
				<el-form-item class="btns">
					<el-button type="primary" @click="loginForm">登录</el-button>
					<el-button type="default" @click="resetForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { apiLogin } from '../network/api.js'
	export default {
		data () {
			return {
				form: {
					username: "admin",
					password: "123456"
				},

				loginFormRules: {
					username: [
						{ required: true, message: '用户名不能为空', trigger: 'blur' },
						{ min: 3, max: 5, message: '用户名长度在 3 到 5 个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '密码不能为空', trigger: 'blur' },
						{ min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			loginForm () {
				// 验证/登录 
				this.$refs.loginFormRef.validate(async valid => {
					if (!valid) return;
					let userInfo = await apiLogin(this.form)
					if (userInfo.status.status === 200) {
						this.$message.success("登录成功")
						// 储存token
						sessionStorage.setItem("token", userInfo.status.token)
						this.timer = setTimeout(() => {
							this.$router.push("/home")
						}, 1000)
					} else {
						this.$message.error("登录失败")
					}
				})
			},
			resetForm () {
				// 重置表单
				// resetFields -> form表单身上清空表单的方法
				this.$refs.loginFormRef.resetFields()
			}
		},
		destroyed() {
			clearTimeout(this.timer)
		}
	};

</script>

<style lang="scss" scoped>
	.login_container {
		position: relative;
		height: 100%;
		background-color: #2b4b6b;

		.login_box {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 450px;
			height: 300px;
			transform: translate(-50%, -50%);
			background-color: #fff;
			border-radius: 5px;

			.avatar_box {
				position: absolute;
				top: -65px;
				left: 50%;
				transform: translateX(-50%);
				width: 130px;
				height: 130px;
				border: 1px solid #eee;
				border-radius: 50%;
				background-color: #fff;
				padding: 10px;
				box-shadow: 0 0 10px #ddd;

				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					background-color: #eee;
				}
			}
		}

		.login_form {
			position: absolute;
			bottom: 0;
			width: 100%;
			padding: 0 20px;
			box-sizing: border-box;

			.btns {
				display: flex;
				justify-content: space-between;
			}
		}

	}

</style>
