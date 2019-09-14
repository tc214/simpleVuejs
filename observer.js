	/**
	 * 把一个对象的每一项都转化成可观测对象
	 * @param { Object } obj 对象
	 */
	function observable (obj) {
		if (!obj || typeof obj !== 'object') {
        	return;
    	}
		let keys = Object.keys(obj);
		keys.forEach((key) =>{
			defineReactive(obj,key,obj[key])
		})
		return obj;
	}
	/**
	 * 使一个对象转化成可观测对象
	 * @param { Object } obj 对象
	 * @param { String } key 对象的key
	 * @param { Any } val 对象的某个key的值
	 */
	function defineReactive (obj,key,val) {
		let dep = new Dep();
		Object.defineProperty(obj, key, {
			get(){
				dep.depend();
				console.log(`${key}属性被读取了`);
				return val;
			},
			set(newVal){
				val = newVal;
				console.log(`${key}属性被修改了`);
				dep.notify()                    //数据变化通知所有订阅者
			}
		})
	}
	// 创建一个依赖收集容器，也就是消息订阅器Dep，用来容纳所有的“订阅者”。
	// 订阅器Dep主要负责收集订阅者，然后当数据变化的时候后执行对应订阅者的更新函数
	class Dep {
		
		constructor(){
			this.subs = []
		}
		//增加订阅者
		addSub(sub){
			this.subs.push(sub);
		}
        //判断是否增加订阅者
		depend () {
		    if (Dep.target) {
		     	this.addSub(Dep.target)
		    }
		}

		//通知订阅者更新
		notify(){
			this.subs.forEach((sub) =>{
				sub.update()
			})
		}
		
	}
	// 静态属性 target，这是一个全局唯一 的Watcher
	// 在同一时间只能有一个全局的 Watcher 被计算，另外它的自身属性 subs 也是 Watcher 的数组
	Dep.target = null;
	
	
	
	
	