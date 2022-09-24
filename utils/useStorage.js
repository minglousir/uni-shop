// 这里的方法都是异步的,获取storage值时,需要注意使用同步比较好
//将数据存入storage
export const setStorage = (key, data, cb) => {
	uni.setStorage({
		//存入Storage
		key,
		data: JSON.stringify(data),
		success() {
			cb && cb()
		}
	})
}
//从Storage取数据
export const getStorage = (key, cb) => {
	let tempData = ''
	uni.getStorage({
		key,
		success(res) {
			cb && cb()
			// 返回的是一个对象
			tempData = res
		}
	})
	return tempData
}

// 同步
export const getStorageSync = (key) => {
	return JSON.parse(uni.getStorageSync(key) || '[]')
}

//清除Storage
export const removeStorage = (key, cb) => {
	uni.removeStorage({
		//删除Storage
		key,
		success() {
			cb && cb()
		}
	})
}
