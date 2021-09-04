<template>
	<div class="home">
		<el-button type="info" @click="exit">退出</el-button>
	</div>
</template>

<script>
	export default {
		name: "Home",
		methods:{
			exit(){
				sessionStorage.setItem("token", null);
				this.$message.success("退出成功");
				setTimeout(() => {
					this.$router.push("/login")
				}, 500)
			}
		}
	}
</script>

<style lang="scss" scoped="">
</style>
