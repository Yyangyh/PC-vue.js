<template>
	<div id="box">
		<div class="second">
			<div class="head">
				<router-link to='/'>
					<img src="../assets/pag.png" />首页
				</router-link>
				>版本号1.0.02

				<span>
				<img src="../assets/refr.png"/>
			</span>
			</div>

		</div>
		<div class="record">
			<span v-on:click="Refresh()">刷新列表</span>
			<span v-on:click="AutoRefresh" v-bind:class="{AutoRefresh:RefreshButton}">自动刷新</span>
		</div>
		<div class="format">

			<table border="0" cellspacing="0" cellpadding="0">
				<thead>
					<tr>
						<th>设备编码</th>
						<th>型号</th>
						<th>状态</th>
						<th>接收缓存</th>
						<th>作业数</th>
						<th>心跳数</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<!--假数据-->
					<!--<tr>
						<th>0054be735002060f</th>
						<th>DL-210</th>
						<th>Ready</th>
						<th>262143</th>
						<th>0/5</th>
						<th>728</th>
						<th>
							<span v-on:click="Print(item.Number)" :data-num='item.Number'><img src="../assets/print.png"/></span>
							<span><img src="../assets/update.png"/></span>
							<span><img src="../assets/change.png"/></span>
						</th>
					</tr>-->
					
					<tr v-for="item in datas">
						<th>{{item.Number}}</th>
						<th>{{item.Model}}</th>
						<th>{{item.Status}}</th>
						<th>{{item.Received}}</th>
						<th>{{item.Jobs}}</th>
						<th>{{item.Ticks}}</th>
						<th>
							<span v-on:click="Print(item.Number)" :data-num='item.Number'><img src="../assets/print.png"/></span>
							<span><img src="../assets/update.png"/></span>
							<span><img src="../assets/change.png"/></span>
						</th>
					</tr>
				</tbody>

			</table>
		</div>
		<transition name="fade">
			<div class="PrintBox" v-show="print">
				<div class="print">
					<div class="PrintHead">打印<span class="close" v-on:click="print = false"><img src="../assets/closetwo.png"/></span></div>
					<div class="PrintNum">
						设备编号：{{num}}
					</div>
					<div class="radiow">
						<label for="file"><input v-on:click="param=1" type="radio" name="radios" id="file" value="1" v-model="param"/>文件</label>
						<label for="text"><input v-on:click="param=2" type="radio" name="radios" id="text" value="2" v-model="param" />内容</label>
					</div>
					<div class="files" v-show="param==1">
						<label for=""><input type="file" name="" id="inp-file" value="" v-on:change="change"/></label>
						<span>文本格式 
							<select name="" ref='text_format'>
								<option value="img">img</option>
								<option value="text">text</option>
								<option value="dat">dat</option>
							</select>
						</span>
					</div>
					<div class="texts" v-show="param==2">
						<span>内容：<input type="text" name="" id="" value="" ref='texts_content'/></span>
						<span>内容数据类型：
							<select name="" ref='texts_type'>
								<option value="string">string</option>
								<option value="base64">base64</option>
								<option value="hex">hex</option>
								<option value="json">json</option>
							</select>
						</span>
					</div>
					
					
					<transition name='fade'>
						<div class="more" v-show="more">
							<ul>
								<li>
									<span>目的设备</span>
										<select name="" ref='device_type'>
											<option value="device">device</option>
											<option value="wifi">wifi</option>
										</select>
									<span>
										作业数据类型
									</span>
									<select name="" ref='datas_type'>
										<option value="print">print</option>
										<option value="control">control</option>
										<option value="config">config</option>
									</select>
								</li>
								<li>
									<span>
										目的位图宽(px):
									</span>
									<input type="text" name="" id="" value="" placeholder="-1" ref='imgW'/>
									<span>
										位图起始位置X(px):
									</span>
									<input type="text" name="" id="" value="" placeholder="0" ref='imgX'/>
									
								</li>
								<li>
									<span>
										目的位图高(px):
									</span>
									<input type="text" name="" id="" value="" placeholder="-1" ref='imgH'/>
									<span>
										位图起始位置Y(px):
									</span>
									<input type="text" name="" id="" value="" placeholder="0" ref='imgY'/>
								</li>
							</ul>
						</div>
					</transition>
					
				<!--底部-->
					<div class="Print_foot">
						<span v-on:click="More">{{more_data}}</span>
						<span v-on:click="Print_data">打印</span>
						<span v-on:click="print = false">关闭</span>
					</div>
				</div>
			</div>
		</transition>
		
		
		
	</div>

</template>

<script>
	import Store from '../store'
	let times = null
	let that = this
	export default {
		name: 'devliceList',
		data() {
			return {
				datas: '',
//				status: this.$route.params,
				RefreshButton:false, //自动刷新
				print:false,
				num:'',
				checked:false,
				param:'1' ,//选项卡切换
				more:false,//更多选项
				more_data:'更多选项',
				files:null,//文件数据
			}
		},
		mounted() {
			let that = this
			this.Refresh(that)
		},
		methods: {
			//获取设备数据
			Refresh:function(that){
//				console.log(typeof(that))
				//			let that = this
				if(typeof(that) == 'undefined' ){   // 判断this指向
					var that = this
				}
				let StatusData = {}
				let params = Store.fetch()
				let key = []
				for(key in params) { // 去除对象内多余的空值key
					if(params[key] === '') {
						delete params[key]
					}
				}
				that.$axios.get('http://192.168.11.222:30003/api/DeviceList', {
						params: params
					})
					.then(function(res) {
						that.datas = res.data
					})
			},
			
			//自动刷新
			AutoRefresh:function() {

				this.RefreshButton = !this.RefreshButton
				let that = this

				
				if(this.RefreshButton == true){
					that.$options.methods.Refresh(that)
					times = setInterval(function(){
						that.$options.methods.Refresh(that) //两个方法互相调用
					},5000)
				}else{
					window.clearInterval(times)
				}
				console.log(times)
			},
			Print:function(num){
				this.print = true
				console.log(num)
				this.num = num
			},
			radiow:function(param){
				console.log(param)
			},
			More:function(){
				this.more = !this.more
				if(this.more == true){
					this.more_data = '关闭选项'
				}else{
					this.more_data = '更多选项'
				}
			},
			Print_data:function(e){
				console.log(this.$refs.device_type.value)
				console.log(this.param)
//				var file = $('#inp-file')[0].files[0];  jQuery方法获取上传文件数据
				var file = this.files[0] // 通过data数据传递参数获取上传文件数据
				
				var reader = new FileReader();
				var imgFile;
				reader.onload=function(e) {
	    			imgFile = e.target.result;
//	    			SubmitJob(imgFile)
//					console.log(imgFile)
	    			};
	    		reader.readAsDataURL(file);
				console.log(file)
				
			},
			change:function(e){
				console.log(e.target.files)
				this.files = e.target.files
			}
		}
	}
</script>
<style scoped="scoped">
	
	/*动画效果*/
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	
	.head {
		width: 100%;
		height: 50px;
		background: #111d3a;
		line-height: 50px;
		color: #fff;
		padding-left: 15px;
		overflow: hidden;
		font-size: 16px;
	}
	
	.head a {
		color: #fff;
	}
	
	.head a>img {
		width: 15px;
		height: 15px;
		margin-right: 4px;
	}
	
	.head span {
		display: inline-block;
		width: 40px;
		height: 30px;
		border-radius: 5px;
		background: #5eb95e;
		float: right;
		margin: 10px 30px;
		cursor: pointer;
	}
	
	.head span img {
		width: 18px;
		height: 18px;
		margin: 6px 10px;
	}
	
	.record {
		width: 91%;
		height: 50px;
		margin: 0 4.5% 0 4.5%;
		margin-top: 30px;
	}
	
	.record span {
		background: #5a98de;
		color: #fff;
		font-size: 16px;
		padding: 10px 20px;
		border-radius: 5px;
		margin-right: 15px;
		margin-bottom: 15px;
		cursor: pointer;
			/*禁止多次点击被选中*/
		-moz-user-select: none; /*火狐*/
        -webkit-user-select: none;  /*webkit浏览器*/
        -ms-user-select: none;   /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
	}
	.record .AutoRefresh{
		background: #3f51b5;
	}
	.format {
		display: block;
		width: 91%;
		height: 500px;
		margin: 25px 4.5% 0 4.5%;
		overflow: hidden;
		border: 1px solid #ddd;
		border-top: none;
	}
	
	.format table {
		width: 100%;
	}
	
	.format table thead {
		background: #56a2cf
	}
	
	.format table thead th {
		width: 13%;
		height: 40px;
		color: white;
		font-size: 18px;
	}
	
	.format table tbody tr {
		width: 13%;
		height: 40px;
		font-size: 16px;
		color: black;
		text-align: center;
	}
	
	.format table tbody tr:hover {
		background: #6495ED !important;
	}
	
	.format table tbody th {
		font-weight: 500;
	}
	.format table tbody th img{
		width: 15px;
		margin-right: 12px;
		cursor: pointer;
	}
	.format table tbody tr:nth-child(even) {
		background: #eaf3f5;
	}
	.PrintBox{
		width: 100%;
	    height: 100%;
	    top: 0;
	    position: absolute;
	    left: 0;
	    background: rgba(0,0,0,.7);
	}
	.PrintBox .print{
		width: 700px;
		height: 500px;
		background: #fff;
		position: fixed;
		top: 50%;
		margin-top: -250px;
		left: 50%;
		margin-left: -350px;
		border-radius: 8px;
	}
	.print .PrintHead{
		border-bottom: 1px solid #ccc;
		font-size: 24px;
		padding: 10px;
		font-weight: 600;
	}
	.print .PrintHead span{
		float: right;
		cursor: pointer;
	}
	.print .PrintHead span img{
		width: 20px;
		height: 20px;
	}
	.print .PrintNum{
		padding: 10px;
	}
	.print .radiow label{
		margin: 5px 60px;
		
		/*禁止多次点击被选中*/
		-moz-user-select: none; /*火狐*/
        -webkit-user-select: none;  /*webkit浏览器*/
        -ms-user-select: none;   /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
	}
	.print .files{
		margin: 20px 40px;
		height: 23px;
	}
	.print .texts{
		margin: 20px 40px;
		height: 23px;
		
	}
	.print .texts span{
		margin-right: 30px;
	}
	.print .Print_foot{
		height: 60px;
		width: 100%;
		background: #f5f5f5;
		position: absolute;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		bottom: 0;
		
	}
	.print .Print_foot span{
		display: inline-block;
		/*background: #3c3c3c;*/
		position: absolute;
		border-radius: 3px;
		cursor: pointer;
		height: 30px;
		line-height: 30px;
		text-align: center;
		bottom: 15px;
		color: #fff;
		
			/*禁止多次点击被选中*/
		-moz-user-select: none; /*火狐*/
        -webkit-user-select: none;  /*webkit浏览器*/
        -ms-user-select: none;   /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
	}
	.print .Print_foot span:nth-of-type(1){
		background: #317DD3;
		width: 100px;
		left: 25px;
	}
	.print .Print_foot span:nth-of-type(2){
		width: 55px;
		background: #317dd3;
		right: 120px;
	}
	.print .Print_foot span:nth-of-type(3){
		width: 55px;
		background: #ccc;
		right: 25px;
	}
	.print .Print_foot span:hover{
		opacity: 0.8;
	}
	.print .more ul{
		list-style: none;
		margin-top: 45px;
	}
	.print .more ul li{
		margin: 20px 20px;
	}
	.print .more ul li span:nth-of-type(2){
		margin-left: 20px;
	}
</style>