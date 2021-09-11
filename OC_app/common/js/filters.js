let formatTime = (value, type) => {
	var dataTime = "";
	var data = new Date();
	data.setTime(value);
	var year = data.getFullYear();
	var month_temp = data.getMonth() + 1;
	var month = month_temp < 10 ? '0' + month_temp : month_temp;
	var day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
	var hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
	var minute = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
	var second = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds();
	if (type == "YMD") {
		dataTime = year + "-" + month + "-" + day;
	} else if (type == "YMDHMS") {
		dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	} else if (type == "HMS") {
		dataTime = hour + ":" + minute + ":" + second;
	} else if (type == "YM") {
		dataTime = year + "-" + month;

	}
	return dataTime; //将格式化后的字符串输出到前端显示
}

let cutTime = (value, type) => {
	return value.split(" ")[0];
}

let number = (value, type) => {
	// 判断是否为数字
	// console.log(value);
	// return;
	if(isNaN(value)){
		return value;
	}
	
	// 判断是否为空
	
	if (value == null || value == '') {
		value = 0;
	}
	value = parseFloat(value);
	//处理科学计数法
	value = value.toFixed(8);
	var arr = (value + "").split(".");
	var a1 = arr[0];
	var a2 = 0;
	if (arr.length > 1) {
		a2 = arr[1];
		if (a2.length > type) {
			a2 = a2.substring(0, type);
		}
	}
	value = Number(a1 + "." + a2);
	return Number(value).toFixed(type)
}

let conceal = (value, number) => {
	if (value == undefined || value == null || value == '') {
		return value;  //解决页面渲染问题
	}else{
		return value.substring(0, number) + "****" + value.substring(value.length - number);
	}
}

let formatSecond = (value) => {
	/* 秒转格式 */
	var date = new Date(value * 1000);
	var fmt = "yyyy-MM-dd hh:mm:ss";

	var o = {
		"M+": date.getMonth() + 1, //月份 
		"d+": date.getDate(), //日 
		"h+": date.getHours(), //小时 
		"m+": date.getMinutes(), //分 
		"s+": date.getSeconds(), //秒 
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
		"S": date.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	
	return fmt;
}

let toFixed = (value) => {
	return value.toFixed(4)
}



//姓名验证
let nameverify = (str) => {
	// switch(str){
	// 	case '\n': return "\\n"; break;
	// 	case '\r': return "\\r"; break;
	// 	case '\'': return "\\'"; break;
	// 	case '"': return "\\\""; break;
	// 	case '\&': return "\\&"; break;
	// 	case '\\': return "\\\\"; break;
	// 	case '\t': return "\\t"; break;
	// 	case '\b': return "\\b"; break;
	// 	case '/': return "\\x2f"; break;
	// 	case '<': return "\\x3C"; break;
	// 	case '>': return "\\x3E"; break;
	// 	default:
	// 		break;
	// }
	return str.replace('<', ' ').replace('>', ' ').replace('\'', ' ').replace('"', ' ');
}
export {
	formatTime
}
export {
	cutTime
}
export {
	number
}
export {
	conceal
}
export {
	formatSecond
}
export {
	toFixed
}
export {
	nameverify
}
