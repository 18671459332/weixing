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