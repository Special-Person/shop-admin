<template>
	<div class="user">
		<!-- 导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 表单区域 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-input placeholder="请输入内容" v-model="searchUser" class="input-with-select">
							<el-button slot="append" icon="el-icon-search" @click="searchUserClick"></el-button>
						</el-input>
					</el-col>
					<el-col :span="4">
						<el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
					</el-col>
				</el-row>
			</div>
			<el-table
				border
				stripe
				:data="users"
				style="width: 100%">
				<el-table-column label="#" type="index">
				</el-table-column>
				<el-table-column
					prop="username"
					label="姓名"
					width="180">
				</el-table-column>
				<el-table-column
					prop="email"
					label="邮箱">
				</el-table-column>
				<el-table-column
					prop="mobile"
					label="电话">
				</el-table-column>
				<el-table-column
					prop="role_name"
					label="角色">
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.mg_state"
							active-color="#409eff"
							inactive-color="#dfe3e7"
							@change="changUserState(scope.row)">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column
					label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" icon="el-icon-edit" @click="editUserInfo(scope.row)" />
						<el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteUser(scope.row)" />
						<el-tooltip content="分配角色" placement="top" :enterable="false">
							<el-button size="mini" type="warning" icon="el-icon-setting" />
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页区域 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pageNum"
				:page-size="10"
				layout="total,  prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</el-card>

		<!-- 新增用户 -->
		<el-dialog
			@close="resetForm"
			title="新增用户"
			:visible.sync="dialogVisible"
			width="50%">
			<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="addForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="addForm.email"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="phone">
					<el-input v-model="addForm.phone"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUser">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 修改用户信息 -->
		<el-dialog
			@close="resetUserForm"
			title="修改用户"
			:visible.sync="dialogUserVisible"
			width="50%">
			<el-form :model="modifyForm" :rules="modifyFormRules" ref="modifyFormRef" label-width="70px">
				<el-form-item label="用户名" prop="username">
					<el-input disabled v-model="modifyForm.username"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="modifyForm.email"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="phone">
					<el-input v-model="modifyForm.phone"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogUserVisible = false">取 消</el-button>
				<el-button type="primary" @click="modifyUser">修 改</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { getUsers } from '../../network/api.js'
	export default {
		data () {
			// 验证邮箱规则
			var checkEmail = (rule, value, cb) => {
				const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
				return reg.test(value) ? cb() : cb(new Error("请输入一个正确的邮箱"))

			}
			var checkPhone = (rule, value, cb) => {
				const reg = /^1((3[\d])|(4[5,6,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[1-3,5-8])|(9[1,8,9]))\d{8}$/
				return reg.test(value) ? cb() : cb(new Error("请输入一个正确的手机号"))
			}
			return {
				searchUser: "",
				users: [],
				total: 0,
				pageNum: 1,
				dialogVisible: false,
				dialogUserVisible: false,
				addForm: {
					username: '',
					password: "",
					email: "",
					phone: ""
				},
				modifyForm: {
					username: '',
					email: "",
					phone: ""
				},
				addFormRules: {
					username: [
						{ required: true, message: '用户名不能为空', trigger: 'blur' },
						{ min: 6, message: '用户名长度应大于6位', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '密码不能为空', trigger: 'blur' },
						{ min: 6, max: 15, message: '密码长度应在6-15位区间', trigger: 'blur' }
					],
					email: [
						{ required: true, message: '邮箱不能为空', trigger: 'blur' },
						{ validator: checkEmail, trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '手机号不能为空', trigger: 'blur' },
						{ validator: checkPhone, trigger: 'blur' },
					]
				},
				modifyFormRules: {
					username: [
						{ required: true, message: '用户名不能为空', trigger: 'blur' },
						{ min: 6, message: '用户名长度最少需要6位', trigger: 'blur' }
					],
					email: [
						{ required: true, message: '邮箱不能为空', trigger: 'blur' },
						{ validator: checkEmail, trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '手机号不能为空', trigger: 'blur' },
						{ validator: checkPhone, trigger: 'blur' },
					]
				}
			}
		},
		created () {
			this.getAllUser()
		},
		methods: {
			deleteUser (user) {
				this.$confirm('是否永久删除该用户？', '确认信息', {
						distinguishCancelAndClose: true,
						confirmButtonText: '删除',
						cancelButtonText: '取消'
					})
				.then(() => {
					// 发起删除用户信息的请求 定义：200 => 用户删除成功
					this.$message({
						type: 'success',
						message: '此用户已删除'
					});
				}, () => {
					this.$message({
						type: 'info',
						message: '取消删除'
					})
				})
			},
			editUserInfo (user) {
				this.modifyForm = {
					username: user.username,
					email: user.email,
					phone: user.mobile,
				}
				this.dialogUserVisible = true
			},
			modifyUser () {
				// 修改用户信息
				this.$refs.modifyFormRef.validate(valid => {
					if (valid) {
						// 发起修改用户信息的请求 定义：200 => 用户修改成功
						//  重新获取当前所有用户
						this.$message.success("修改成功")

						this.dialogUserVisible = false
					} else {
						this.$message.error("请重新输入")
					}
				})
			},
			resetForm () {
				// 重置 新增 用户信息里的内容
				this.dialogVisible = false
				this.$refs.addFormRef.resetFields();
			},
			resetUserForm () {
				// 重置用户信息里的内容
				this.dialogUserVisible = false
			},
			addUser () {
				this.$refs.addFormRef.validate(valid => {
					if (valid) {
						// 发起新增用户的请求 定义：201 => 用户添加成功
						this.$message.success("添加成功")
						setTimeout(() => {
							this.dialogVisible = false
						}, 500)
					} else {
						this.$message.info("请输入完整信息")
					}
				})
			},
			searchUserClick () {
				this.users = this.users.filter(item => item.username.toLowerCase().includes(this.searchUser.toLowerCase()));
				this.total = this.users.length;
			},
			async getAllUser () {
				let allUser = await getUsers()
				if (allUser.status === 200) {
					this.users = allUser.users
					this.total = allUser.total
				} else {
					this.$message.error("获取所有用户接口失效")
				}
			},
			changUserState (user) {
				// 此处应向后台发送更改状态的请求
				this.$message.success(`用户 ${user.username} 的状态已被更改为 ${user.mg_state ? "在线" : "离线"}`)
			},
			handleSizeChange (val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange (val) {
				this.getAllUser()
				console.log(`当前页: ${val}`);
			}
		}
	}

</script>

<style lang="scss" scoped>
	.el-table {
		margin-top: 15px;
		font-size: 12px;
	}

	.el-pagination {
		margin-top: 15px;
	}

</style>
