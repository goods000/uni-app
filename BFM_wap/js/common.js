//转换rem
window.onload = function() {
	getRem(750, 100)
};
window.onresize = function() {
	// 代表1rem=20px；
	getRem(750, 100)
};

function getRem(pwidth, prem) {
	var html = document.getElementsByTagName("html")[0];
	var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
	html.style.fontSize = oWidth / pwidth * prem + "px";
}

var basePath = "https://bfmshop.me";
// var basePath = "http://47.57.191.190:8124";

//URL解析
// var vars_array = [], hash;
var leaderName;
var q = document.URL.split('?')[1];
if (q != undefined) {
	// q=q.split('leaderName=');
	q = q.split('leaderName=');
	leaderName = q[1];
	// q = q.split('&');
	// for(var i = 0; i < q.length; i++){
	//   hash = q[i].split('=');
	//   vars_array[hash[0]] = hash[1];
	// }
}
