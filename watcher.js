class Watcher {// 订阅者
	// 构造函数
	constructor(vm,exp,callBack){
		this.vm = vm;             // 一个Vue的实例对象
		this.exp = exp;           // 指令的属性值。如v-model="name"，exp就是name
		this.cb = callBack;       // Watcher绑定的更新函数
		this.value = this.get();  // 将自己添加到订阅器的操作
	}
	// 依赖收集:添加订阅者
	get(){
		Dep.target = this;  // 缓存自己
		let value = this.vm.data[this.exp]  // 强制执行监听器defineReactive里的get函数
		Dep.target = null;  // 释放自己
		return value;
	}
	// 更新订阅者视图
	update(){
		let value = this.vm.data[this.exp];
		let oldVal = this.value;
		if (value !== oldVal) {
			this.value = value;
			this.cb.call(this.vm, value, oldVal);
		}
	}
}