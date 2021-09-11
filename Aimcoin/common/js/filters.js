let formatTime = (value, type) => {
	if(value == '' || value == null || value == '-'){
		return value
	}
	
	/* 修复IOS出现NaN的问题 */
	let replaceDate = value.replace(/-/g, '/');
	
	let dateTime = "";
	let date = new Date(replaceDate);
	
	// date.setTime(value);
	let year = date.getFullYear();
	let month_temp = date.getMonth() + 1;
	let month = month_temp < 10 ? '0' + month_temp : month_temp;
	let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	
	if (type == "YMD") {
		dateTime = year + "-" + month + "-" + day;
	} else if (type == "YMDHMS") {
		dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	} else if (type == "HMS") {
		dateTime = hour + ":" + minute + ":" + second;
	} else if (type == "YM") {
		dateTime = year + "-" + month;

	}
	return dateTime; //将格式化后的字符串输出到前端显示
}

let countDownDate = (value, type) => {
	let dateTime = "";

	let day = Math.floor(value / (60 * 60 * 24));

	let leave1 = value % (24 * 3600);
	let hour = Math.floor(leave1 / (3600));

	let leave2 = leave1 % (3600); //计算小时数后剩余的毫秒数
	let minute = Math.floor(leave2 / (60));

	//计算相差秒数
	let leave3 = leave2 % (60); //计算分钟数后剩余的毫秒数
	let second = Math.round(leave3);

	// let hour = Math.floor((value % (60 * 60 * 24)) / (60 * 60);
	// let minute = Math.floor((value % (60 * 60)) / (60);
	// let second = Math.floor(value % (60 * 60);
	// return days + " 天 " + hours + " 时 " + minutes + " 分 " ;  


	// let day = endTime.getDate() < 10 ? '0' + endTime.getDate() : endTime.getDate();
	// let hour = endTime.getHours() < 10 ? '0' + endTime.getHours() : endTime.getHours();
	// let minute = endTime.getMinutes() < 10 ? '0' + endTime.getMinutes() : endTime.getMinutes();
	// let second = endTime.getSeconds() < 10 ? '0' + endTime.getSeconds() : endTime.getSeconds();

	if (type == "DHMS") {
		dateTime = (day < 10 ? '0' + day : day) + "天" + (hour < 10 ? '0' + hour : hour) + "小时" + (minute < 10 ? '0' + minute :
			minute) + "分" + (second < 10 ? '0' + second : second) + "秒";
	}
	if (type == "MS") {
		dateTime = (minute < 10 ? '0' + minute :
			minute) + "分" + (second < 10 ? '0' + second : second) + "秒";
	}
	if (type == "H") {
		dateTime = (hour < 10 ? '0' + hour : hour);
	}
	if (type == "M") {
		dateTime = (minute < 10 ? '0' + minute : minute);
	}
	if (type == "S") {
		dateTime = (second < 10 ? '0' + second : second);
	}

	return dateTime; //将格式化后的字符串输出到前端显示
}

let cutTime = (value, type) => {
	return value.split(" ")[0];
}

let number = (value, type) => {
	// 判断是否为数字
	if (isNaN(value)) {
		return value;
	}

	// 判断是否为空

	if (value == null || value == '') {
		value = 0;
	}
	value = parseFloat(value);
	//处理科学计数法
	value = value.toFixed(8);
	let arr = (value + "").split(".");
	let a1 = arr[0];
	let a2 = 0;
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
	let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
	let emailReg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
	if (value == undefined || value == null || value == '' || !phoneReg.test(value) && !emailReg.test(value)) {
		return value; //解决页面渲染问题
	} else {
		return value.substring(0, number) + "****" + value.substring(value.length - number);
	}
}

let walletAddressConceal = (value, number) => {
	if (value == undefined || value == null || value == '') {
		return value; //解决页面渲染问题
	} else {
		return value.substring(0, number) + "..." + value.substring(value.length - number);
	}
}

let formatSecond = (value) => {
	/* 秒转格式 */
	let date = new Date(value * 1000);
	let fmt = "yyyy-MM-dd hh:mm:ss";

	let o = {
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
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

	return fmt;
}

let toFixed = (value) => {
	return value.toFixed(4)
}


export {
	formatTime
}
export {
	countDownDate
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
	walletAddressConceal
}

export {
	formatSecond
}
export {
	toFixed
}