
function getStyle(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else{
				return getComputedStyle(obj,false)[attr];
			}
		}
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;
		//json循环设置属性
		for(var attr in json){
			var iCur=0;
			if(attr=='opacity'){	
				iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}
			
			var speed=(json[attr]-iCur)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(iCur!=json[attr]){
				bStop=false;
			}
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(iCur+speed)+')';
				obj.style.opacity=(iCur+speed)/100;
			}else{
				obj.style[attr]=iCur+speed+'px';
			}
			
		}
		if(bStop==true){
			clearInterval(obj.timer);
			//链式运动，回调函数
			if(fn){
				fn();
			}
		}
		
	},30);
}