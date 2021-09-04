<template>
	<el-menu
		default-active="2"
		class="el-menu-vertical-demo"
		@open="handleOpen"
		@close="handleClose"
		background-color="#333744"
		text-color="#fff"
		active-text-color="#51a2f8"
		unique-opened
		:collapse="scale"
		:collapse-transition="false"
		router
		:default-active="navState"
		>
		<el-submenu :index="item.id + ''" v-for="item in asideMenu" :key="item.id">
			<!-- 一级菜单模版区域 -->
			<template slot="title">
				<i class="el-icon-location"></i>
				<span>{{item.authName}}</span>
			</template>
			<el-menu-item @click="saveNavState('/'+list.path)" :index="'/'+list.path" v-for="list in item.children" :key="list.id">
				<template slot="title">
					<i class="el-icon-menu"></i>
					<span>{{list.authName}}</span>
				</template>
			</el-menu-item>
		</el-submenu>

	</el-menu>
</template>

<script>
	import { getHomeAsideMenu } from '../network/api.js'
	export default {
		props:[
			'scale' // 收缩
		],
		data () {
			return {
				asideMenu: [],
				navState: ''
			}
		},
		created () {
			this.getAsideMenu()
			
		},
		methods: {
			async getAsideMenu () {
				let { status: menuList } = await getHomeAsideMenu()
				if (menuList.status === 200) {
					this.asideMenu = menuList.data;
					this.$message.success("获取菜单成功");
					this.navState = sessionStorage.getItem("navState")
				}
			},
			handleOpen (key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose (key, keyPath) {
				console.log(key, keyPath);
			},
			saveNavState(path){
				sessionStorage.setItem("navState", path)
				this.navState = path
			}
		}
	}

</script>

<style lang="scss" scoped="">
	.el-menu{
		border:none;
	}
	.el-submenu .el-menu-item{
		min-width: auto;
	}
</style>
