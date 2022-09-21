// 引入所有需要的动态组件
export const importComponents = (requireComponent) => {
	let comObj = {};
	requireComponent.keys().forEach(fileName => {
		// 获取文件名
		let names = fileName
			.split("/")
			.pop()
			.replace(/\.\w+$/, "");
		// 获取组件配置
		const componentConfig = requireComponent(fileName);
		// 若该组件是通过"export default"导出的，优先使用".default"，否则退回到使用模块的根
		comObj[names] = componentConfig.default || componentConfig;
	});
	return comObj
}
