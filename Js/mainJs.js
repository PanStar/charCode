var DATA = {};
DATA.obj = document.getElementById("myCanvas");
DATA.ctx = DATA.obj.getContext("2d");
DATA.endCode = '##[_]{1,2}##';
//初始化
function init(){
    $('#mytxt').val('http://www.baidu.com');
    initImg();
    //createImg();
    //praseImg();
}
//初始化图片
function initImg(){
    //DATA.ctx.fillStyle="green";
    DATA.ctx.fillStyle="#6f6f6f";//(111,111,111,255)
    DATA.ctx.fillRect(0,0,300,300);
}
//加密
function enCode(s){
    return (s||'').charCodeAt()
}
//解密
function deCode(s){
    return String.fromCharCode(s)
}
function getCode(str){
    var code = [];
    for(var c in str){code.push(enCode(str[c]))}
}
function parseCode(code){
    var str = '';
    for(var c in code){str += deCode(code[c])}
    return str;
}
//创建图片
function createImg(){
    //var source = "confirm('Close it?')";
    var source = $('#mytxt').val();
    //for(var i = 0, len = 8; i < len; i++){source += source;}
    var str = source + (source.length%2 == 0 ? '##__##' : '##_##');
    var code = getCode(str);
    var width_max = parseInt($(DATA.obj).css('width')) - 10;//右侧留白
    var width = Math.ceil(Math.sqrt(code.length));
    var height = width;
    if(width > width_max){
        width = width_max;
        height = Math.ceil(code.length / width);
    }
    for(var i = code.length, len = width * height; i < len; i ++){code.push(111)}
    var imgData = DATA.ctx.getImageData(0,0,width,height);
    
    for(var i = 0, len = code.length; i < len; i++){
        imgData.data[i + Math.floor(i/3)] = code[i];
    }
    initImg();
    DATA.ctx.putImageData(imgData,0,0);
    
    DATA.code = code;
    DATA.data = imgData.data;
}
//解析图片
function parseImg(){
    /*加载图片*/
    var img = document.getElementById("img");
    DATA.ctx.drawImage(img,0,0);
    
    var imgData = DATA.ctx.getImageData(0,0,DATA.obj.width,DATA.obj.height);
    var arr = [], code = imgData.data;for(var i = 0, len = code.length; i < len; i+=4){arr.push(code.slice(i, i+4))}
    //过滤背景(白色)和填充色(灰色)
    var arrNew = arr.filter(i => (i[0] || i[1] || i[2]) && 
                                (i[0] != 255 || i[1] != 255 || i[2] != 255) && 
                                (i[0] != 111 || i[1] != 111 || i[2] != 111))
    DATA.dataNew = arrNew;
    
    var arr = [];
    for(var i = 0, len = DATA.dataNew.length; i < len; i++){
        var item = DATA.dataNew[i];
        arr.push(item [0]);
        arr.push(item [1]);
        arr.push(item [2]);
    }
    DATA.str = parseCode(arr);
    if(DATA.endCode) DATA.str = DATA.str.replace(new RegExp(DATA.endCode+'(.*)$'),'');
    console.log(DATA.str);
}