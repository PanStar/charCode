//重写了解析方法
//因为要支持汉字 所以占两个色值
function getCode(str){
	var code = [];
	for(var c in str){
		var s = enCode(str[c]);
		code.push(parseInt(s/256));
		code.push(s%256);
	}
	return code;
}
function parseCode(code){
	var str = '';
	for(var i = 0, len = code.length; i < len; i+=2){
		str += deCode(code[i]*256+code[i+1])
	}
	return str;
}
