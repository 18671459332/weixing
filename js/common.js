// 全局配置
config = {};
config.mode = "debug";	// 调试模式

$(document).ready(function(){
	
	// 禁止在电脑浏览器打开
	//if( !/MicroMessenger/i.test(navigator.userAgent) )
	if( config.mode=="run" && !/(iphone|android)/i.test(navigator.userAgent) )
	{
		//location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx85fd6dd575348b58&redirect_uri=http://js.jsxfang.com/api/auth/&response_type=code&scope=snsapi_userinfo&state=info&connect_redirect=1#wechat_redirect");
		location.replace("/index");
		return;
	}
	
	// 后退事件
	$(".framepage .hd-return").click(function(){
		if( typeof Return=="function" )
			Return();
		else
			history.back();
	});

	
	// 伪类 :active
	document.body.addEventListener('touchstart',function(){ });

});

// ==============================================================================================================================

// 用户名验证
function is_name(str)
{
	reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/;
	if(reg.test(str))
		return true;
	else
		return false;
}


// 手机验证
function is_phone(str)
{
	reg = /^1([38]\d|4[57]|5[012356789]|7[3678])\d{8}$/;
	if(reg.test(str))
		return true;
	else
		return false;
}

// 有效金额
function is_money(str)
{
	reg = /^[123456789]{1}\d{0,11}(\.\d{1,2})?$/;
	if(reg.test(str))
		return true;
	else
		return false;
}

// 身份证号验证
function is_idnum(str)
{
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if(reg.test(str))
		return true; 
	else
		return false;
}


// 邮箱验证
function is_email(str)
{
	reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/; 
	if(reg.test(str))
		return true; 
	else
		return false;
}

// 求和
function sum()
{
	sum = 0;
	for(i=0;i<arguments.length;i++)
	{
		sum += arguments[i];
	}
	return sum;
}

// 表单序列化（对象）
$.fn.serializeObject = function()    
{
	var o = {};
	var a = this.serializeArray();
	$.each(a,function(){
		if( o[this.name] )
		{
			if( !o[this.name].push )
				o[this.name] = [o[this.name]];
			o[this.name].push(this.value || '');
		}
		else
			o[this.name] = this.value || '';
	});
	return o;
};
