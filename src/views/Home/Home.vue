<template>
	<el-container class="home">
		<el-header>
			<div class="logo">
				<img src="../../assets/logo.png" alt="">
				<span>电商后台管理系统</span>
			</div>
			<el-button type="info" @click="exit">退出</el-button>
		</el-header>
		<el-container>
			<el-aside :width="toggleAside ? '64px' : '200px'">
				<!-- 侧边栏菜单区 -->
				<div class="toggle-button" @click="toggleAside = !toggleAside">|||</div>
				<HomeAside :scale="toggleAside"/>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import HomeAside from '../../components/Home_Aside.vue'
	export default {
		name: "Home",
		components: {
			HomeAside
		},
		data () {
			return {
				toggleAside: false
			}
		},
		methods: {
			exit () {
				sessionStorage.setItem("token", null);
				this.$message.success("退出成功");
				setTimeout(() => {
					this.$router.push("/login")
				}, 500)
			}
		}
	}

</script>

<style lang="scss" scoped>
	.home {
		height: 100%;
	}

	.el-header {
		display: flex;
		justify-content: space-between;
		background-color: #373D41;

		.logo {
			height: 100%;

			img {
				height: 100%;
				vertical-align: middle;
			}

			span {
				color: #fff;
				font-size: 20px;
				vertical-align: middle;
			}
		}

		.el-button {
			margin: 10px 0;
		}
	}

	.el-aside {
		transition: width .3s ease-in;
		background-color: #333744;
	}

	.el-main {
		background-color: #EAEDF1;
	}
	
	.toggle-button{
		font-size: 12px;
		line-height: 24px;
		letter-spacing: .2em;
		color: #fff;
		text-align: center;
		background-color: #515c6f;
		cursor: pointer;
		user-select: none;
	}

</style>
