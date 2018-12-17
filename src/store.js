//缓存



const STORAGE_KEY = 'todos-vue.js'
export default{
	fetch:function(){
		return JSON.parse(window.sessionStorage.getItem(
			STORAGE_KEY || '[]')
		)
	},
	save:function(items){
		window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(items))
	}
}
