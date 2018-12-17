<template>
	<div class="box">
		<div class="middle">
			<img src="../assets/dascom.png"/>
			<div class="font">
				得实云智能终端演示
			</div>
			<div>
				<button  v-on:click="close = true">搜索设备</button>
			</div>
		</div>
		<transition name='fade'>
			<div class="search" v-if="close">
				<span v-on:click="close = false">
					<img src="../assets/delete.png"/>
				</span>
				<div class="word">
					选择设备状态
				</div>
				<div class="choose">
					<ul>
						<li v-for='item in statusSelect'>
							<input type="checkbox" :id="item.id" :value="item.Estatus" name="statusSelect" />
							<label :for="item.id" v-on:click="add(item)" v-bind:class="{select:item.isSure}">{{item.status}}</label>
						</li>
					</ul>
				</div>
				<div class="text">
					<div>
						<div v-bind:class="{slide:sure}">
							<input type="text" name="" id="ipt" value="" ref='num'/>
							<span v-on:click="sure = !sure">
								输入设备编码
							</span>
						</div>
					</div>
				</div>
				<router-link class="sure" to='devliceList'>
					<button v-on:click="cache(statusSelect)">确定</button>
				</router-link>
			</div>
		</transition>
	</div>

</template>

<script>
	import Store from '../store'
	export default {
		name: 'HelloWorld',
		data() {
			return {
				sure:false,
				close:false,
				statusSelect:[
					{
						status:'离线',
						Estatus:'dead',
						id:'no1',
						isSure:false
					},
					{
						status:'在线',
						Estatus:'read',
						id:'no2',
						isSure:false
					},
					{
						status:'繁忙',
						Estatus:'busy',
						id:'no3',
						isSure:false
					},
					{
						status:'警告',
						Estatus:'warn',
						id:'no4',
						isSure:false
					},
					{
						status:'错误',
						Estatus:'error',
						id:'no5',
						isSure:false
					},
				]
			}
		},
		methods:{
			
			add:function(item){
				console.log(item)
				item.isSure = !item.isSure
			},
			cache:function(statusSelect){
				console.log(statusSelect)
				let status = []
				for(let k in statusSelect){
					console.log(statusSelect[k].isSure)
					if(statusSelect[k].isSure == true){
						status.push(statusSelect[k].Estatus)
					}
//					console.log(k)
				}
				
				status = status.join()
				let num = this.$refs.num.value
				console.log(num)
				let params = {
					status:status,
					num:num
				}
				console.log(Store)
				Store.save(params)
			},
			
		},
		created: function () {
           console.log(2)
        },
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
	/*动画效果*/
	.fade-enter-active, .fade-leave-active {
	  transition:0.5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  
	  transform: scale(0);
	}
	
	
	
	*{
		padding: 0;
		margin: 0;
	}
	.box {
		/*position: relative;*/
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: url(../assets/dsy.png) left top repeat;
	}
	.middle{
		width: 100%;
	    height: 200px;
	    /* margin: 0 auto; */
	    position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    margin: auto;
	    text-align: center;
	}
	.middle .font{
		font-size: 40px;
		color: #fff;
		margin: 10px 0;
		text-align: center;
	}
	.middle img{
		border-radius: 50%;
	    width: 180px;
	    height: 180px;
	    text-align: center;
	}
	.middle button{
		text-align: center; 
		width: 300px;
		height: 60px;
		border-radius: 5px;
		font-size: 18px;
		background: #00a79d;
		border: none;
		color: #fff;
	}
	.middle button:hover{
		background: #FFFFFF;
		color: #00A79D;
	}
	.search{
		width: 700px;
		height: 500px;
		position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    margin: auto;
	    background: #fff;
	    padding: 50px 0;
	    box-sizing: border-box;	
	}
	.search>span{
		position: absolute;
		right: 5px;
		top: 5px;
		cursor: pointer;
	}
	.search .word{
		margin-left: 20px;
		margin-bottom: 20px;
		font-size: 26px;
	}
	.search .choose{
		overflow: hidden;
		border-bottom: 3px dashed #ccc;
		
	}
	.search .choose li{
		float: left;
		list-style: none;
		margin: 0 30px 60px 30px;
		width: 80px;
		height: 30px;
	}
	.search .choose li input{
		visibility: hidden;
	}
	.search .choose li label{
		cursor: pointer;
		display: block;
		background: #efefef;
		color: #b3b3b3;
		line-height: 30px;
		width: 80px;
		height: 30px;
		text-align: center;
		text-indent:15px;
		background: url(../assets/input-unchecked.png) no-repeat 5px 8px #efefef;
			/*禁止多次点击被选中*/
		-moz-user-select: none; /*火狐*/
        -webkit-user-select: none;  /*webkit浏览器*/
        -ms-user-select: none;   /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
	}
	.select{
		background: url(../assets/input-checked.png) no-repeat 5px 8px rgb(0, 174, 239) !important;
		color: #fff !important;
	}
	
	.search .text{
		margin: 60px 0;
		position: relative;
	}
	.search .text>div{
		position: absolute;
		width: 400px;
		height: 60px;
		line-height: 60px;
		top: 50%;
		left: 50%;
		margin-left: -200px;
		margin-top: -30px;
		overflow: hidden;
		
	}
	.search .text>div>div{
		width: 700px;
		position: absolute;
		height: 60px;
		transition: 0.3s all;
		left: -280px;
	}
	.slide{
		left: 0 !important;
		transition: 0.3s all;
	}
	.search .text span{
		float: left;
		display: inline-block;
		width: 400px;
		height: 60px;
		line-height: 60px;
		top: 50%;
		left: 50%;
		padding-left: 24px;
		box-sizing: border-box;
		background: rgb(0, 174, 239);
		color: #fff;
		font-size: 14px;
	}
	.search .text input{
		float: left;
		width: 280px;
		height: 60px;
		top: 50%;
		left: 50%;
		font-size: 20px;
		padding-left: 5px;
		box-sizing: border-box;
		
	}
	.search .sure{
		position: absolute;
		bottom: 50px;
		left: 50%;
		margin-left: -50px;
	}
	.search .sure button{
		border: none;
		text-align: center;
		width: 100px;
		height: 40px;
		border-radius: 5px;
		background: rgb(0, 174, 239);
		color: #fff;
		font-size: 18px;
	}
</style>