

$(document).ready(function(e) {

	if( $(".repair_add_manager").length>0 ) initAddress();
	
});


// ======================================================================================================================

function initAddress()
{
	// 初始化
	$(AddrInit = function(){
		if( $(".address_html li").length!=0 )
		{
			addr = $(".address_html li:eq(0)");
			addr.addClass("active");
			$(".address li:eq(0)").addClass("active");
			$(".addr a").html(addr.data("addr")).data({id:addr.data("id")});
			$("#address_id").val(addr.data("id"));
		}
		else
			$(".addr a").html("请选择");
	});
	
	// 添加与编辑
	var isAdd = true;
	
	// 设置地址（添加、修改）
	set_addr = function()
	{
		layer.closeAll();
		layer.panel({
			closeBtn: 1,
			title: "报修地址",
			btn: false,
			content: $(".set_addr_html").html(),
			wrap: ".framepage",
			skin: "set_addr",
			size: isAdd?330:385,
			success: function(elm){
				if( isAdd )
				{
					// 小区
					$(elm).find(".btn_del").remove();
					var id =14;
					url =  "/system/meta/getDepartListById?id="+id;
					Ajax(url,function(ret){
						opts = '<option value="">请选择小区</option>';
						department_list= eval('(' + ret.json + ')').department
						$(department_list).each(function(index){
							addr = department_list[index];
							 if(addr.parentid==id){
							opts += '<option value="'+addr.id+'" >' +addr.name+'</option>';
							 }
						});
						$(elm).find(".addr1").html(opts);
					});
					
					//园区

					$(elm).find(".addr1").change(function(){
						var value = $(this).val();
						url =  "/api/departSelect/getYuanqu?depart_id="+value;
						Ajax(url,function(ret){
							$(elm).find(".addr2,.addr3,.addr4").val("");
							opts = '<option value="">请选择园区</option>';
							$(ret.data).each(function(index){
								var addr = ret.data[index];
								opts += '<option value="'+addr.yuanqu+'" >' +addr.yuanqu+'</option>';
							});
							$(elm).find(".addr2").html(opts);
				 		});
					});
					
					
					// 楼栋
					$(elm).find(".addr2").change(function(){
						var value = $(this).val();
						var depart_id=$(elm).find(".addr1").val();;
				    	var yuanqu=$(elm).find(".addr2").val();
						url =  "/api/departSelect/getLoudong?depart_id="+depart_id+"&yuanqu="+yuanqu;
						Ajax(url,function(ret){
							$(elm).find(".addr3,.addr4").val("");
							opts = '<option value="">请选择楼栋</option>';
							$(ret.data).each(function(index){
								var addr = ret.data[index];
								opts += '<option value="'+addr.loudong+'" >' +addr.loudong+'</option>';
							});
							$(elm).find(".addr3").html(opts);
				 		});
					});
					
					
					
					
					//单元
					$(elm).find(".addr3").change(function(){
						var value = $(this).val();
						var loudong=$(this).val();
						var depart_id=$(elm).find(".addr1").val();;
				    	var yuanqu=$(elm).find(".addr2").val();
						url = "/api/departSelect/getDanyuan?depart_id="+depart_id+"&yuanqu="+yuanqu+"&loudong="+loudong;
						Ajax(url,function(ret){
							$(elm).find(".addr4,.addr5").val("");
							opts = '<option value="">请选择单元</option>';
							$(ret.data).each(function(index){
								var addr = ret.data[index];
								opts += '<option value="'+addr.danyuan+'" >' +addr.danyuan+'</option>';
							});
							$(elm).find(".addr4").html(opts);
				 		});
					});
					
					// 房号
					$(elm).find(".addr4").change(function(){
						var danyuan = $(this).val();
						var loudong=$(elm).find(".addr3").val();;
						var depart_id=$(elm).find(".addr1").val();;
				    	var yuanqu=$(elm).find(".addr2").val();
						url =  "/api/departSelect/getFanghao?depart_id="+depart_id+"&yuanqu="+yuanqu+"&loudong="+loudong+"&danyuan="+danyuan;
						Ajax(url,function(ret){
							$(elm).find(".addr5").val("");
							opts = '<option value="">请选择房号</option>';
							$(ret.data).each(function(index){
								var addr = ret.data[index];
								opts += '<option value="'+addr.id+'" >' +addr.fanghao+'</option>';
							});
							$(elm).find(".addr5").html(opts);
				 		});
					});
					
					$(elm).find(".addr5").change(function(){
						var fanghao = $(this).val();
						//alert(fanghao);
						
						$("#meta_id").val(fanghao);
					});
					
					

					
					
				}
				//修改
				else
				{
					addr1 = $(".address_html .edited .addr1").data("id");
					addr2 = $(".address_html .edited .addr2").data("id");
					addr3 = $(".address_html .edited .addr3").data("id");
					addr4 = $(".address_html .edited .addr4").data("id");
					
					// 小区
					url = "../server/addr1.json";
					Ajax(url,function(ret){
						opts = '<option value="">请选择小区</option>';
						$(ret.data).each(function(index){
							addr = ret.data[index];
							opts += '<option value="'+addr.id+'" >' +addr.content+'</option>';
						});
						$(elm).find(".addr1").html(opts).val(addr1);
					});
					$(elm).find(".addr1").change(function(){
						var value = $(this).val();
						url = "../server/addr2.json?id="+value;
						Ajax(url,function(ret){
							$(elm).find(".addr2,.addr3,.addr4").val("");
							opts = '<option value="">请选择楼栋</option>';
							$(ret.data).each(function(index){
								var addr = ret.data[index];
								opts += '<option value="'+addr.id+'" >' +addr.content+'</option>';
							});
							$(elm).find(".addr2").html(opts);
				 		});
					});
					
					// 楼栋
					url = "../server/addr2.json?id="+addr2;
					Ajax(url,function(ret){
						$(elm).find(".addr2,.addr3,.addr4").val("");
						opts = '<option value="">请选择楼栋</option>';
						$(ret.data).each(function(index){
							var addr = ret.data[index];
							opts += '<option value="'+addr.id+'" >' +addr.content+'</option>';
						});
						$(elm).find(".addr2").html(opts).val(addr2);
					});
					$(elm).find(".addr2").change(function(){
						var value = $(this).val();
						url = "../server/addr3.json?id="+value;
						Ajax(url,function(ret){
							$(elm).find(".addr3,.addr4").val("");
							opts = '<option value="">请选择单元</option>';
							$(ret.data).each(function(index){
								var addr = ret.data[index];
								opts += '<option value="'+addr.id+'" >' +addr.content+'</option>';
							});
							$(elm).find(".addr3").html(opts);
				 		});
					});
					
					// 单元
					url = "../server/addr3.json?id="+addr3;
					Ajax(url,function(ret){
						$(elm).find(".addr3,.addr4").val("");
						opts = '<option value="">请选择单元</option>';
						$(ret.data).each(function(index){
							var addr = ret.data[index];
							opts += '<option value="'+addr.id+'" >' +addr.content+'</option>';
						});
						$(elm).find(".addr3").html(opts).val(addr3);
					});
					$(elm).find(".addr3").change(function(){
						var value = $(this).val();
						url = "../server/addr4.json?id="+value;
						Ajax(url,function(ret){
							$(elm).find(".addr4").val("");
							opts = '<option value="">请选择房号</option>';
							$(ret.data).each(function(index){
								var addr = ret.data[index];
								opts += '<option value="'+addr.id+'" >' +addr.content+'</option>';
							});
							$(elm).find(".addr4").html(opts);
				 		});
					});
					
					// 房号
					url = "../server/addr4.json?id="+addr3;
					Ajax(url,function(ret){
						$(elm).find(".addr4").val("");
						opts = '<option value="">请选择房号</option>';
						$(ret.data).each(function(index){
							var addr = ret.data[index];
							opts += '<option value="'+addr.id+'" >' +addr.content+'</option>';
						});
						$(elm).find(".addr4").html(opts).val(addr4);
					});
				}
			}
		});
	}
	open_addr = function()
	{
		layer.panel({
			//closeBtn:1,
			title:"报修地址",
			btn:["添加地址"],
			content:$(".address_html").html(),
			skin:"address",
			size:350,
			shadeClose: true,
			yes:function(){
				isAdd = true;
				set_addr();
			}
		});
	}
	
	// 打开地址
	$(".addr").click(function(){
		set_addr();
		/*if( $(".address_html li").length==0 )
			set_addr();
		else
			open_addr();
			*/
	});
	
	// 地址选择
	//kelen  2017-06-16 进行修改
	$("body").on("click",".address li",function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".addr a").html($(this).data("addr"));
		$(".address_html").html($(this).parents(".layui-layer-content").html());
		///alert($(this).data("id"));
		//同时改变input  hidden
		$("#meta_id").val($(this).data("id"));
		layer.closeAll();
	});
	
	// 编辑地址
	$("body").on("click",".address li .btn_edit",function(evt){
		evt.stopPropagation();
		isAdd = false;
		idx = $(this).parents("li").index();
		$(".address_html li").removeClass("edited").eq(idx).addClass("edited");
		set_addr();
	});
	
	// 删除地址
	$("body").on("click",".set_addr .btn_del",function(){
		aid = $(".edited").data("id");
		url = "../server/proc.json?id="+aid;
		Ajax(url,function(ret){
			if( ret.state )
			{
				isAdd = true;
				$(".addr_"+aid).remove();
				layer.closeAll();
				open_addr();
				AddrInit();
			}
			else
				layer.msg(ret.msg);
		});
	});
	
	// 表单处理：添加或修改地址
	$("body").on("click",".set_addr .btn_save",function(){
		
		// 小区
		elm = $(".set_addr .addr1");
		val = elm.val();
		if( val=="" )
		{
			layer.msg("请选择小区",{shift:6});
			return;
		}
		
		// 楼栋
		elm = $(".set_addr .addr2");
		val = elm.val();
		if( val=="" )
		{
			layer.msg("请选择园区",{shift:6});
			return;
		}
		
		// 单元
		elm = $(".set_addr .addr3");
		val = elm.val();
		if( val=="" )
		{
			layer.msg("请选择楼栋",{shift:6});
			return;
		}
		
		// 房号
		elm = $(".set_addr .addr4");
		val = elm.val();
		if( val=="" )
		{
			layer.msg("请选择单元",{shift:6});
			return;
		}
		
		elm = $(".set_addr .addr5");
		val = elm.val();
		if( val=="" )
		{
			layer.msg("请选择房号",{shift:6});
			return;
		}
		
		// 数据处理
		if( isAdd )
		{
			// 添加地址
		/*	url = "../server/proc.json";
			param = $(elm).find("form").serialize();
			Ajax(url,param,function(ret){
				if( ret.state )
				{*/
					//aid = ret.data.id;
					a1_id = $(".set_addr .addr1").val();
					a1_tt = $(".set_addr .addr1 :checked").text();
					a2_id = $(".set_addr .addr2").val();
					a2_tt = $(".set_addr .addr2 :checked").text();
					a3_id = $(".set_addr .addr3").val();
					a3_tt = $(".set_addr .addr3 :checked").text();
					a4_id = $(".set_addr .addr4").val();
					a4_tt = $(".set_addr .addr4 :checked").text();
					address = a1_tt + "，" + a2_tt + "，" + a3_tt + "，" + a4_tt;
				/*	
					elm  = '<li class="addr_'+aid+'" data-id="'+aid+'" data-addr="'+address+'">';
					elm += '  <h3><span class="addr1" data-id="'+a1_id+'">'+a1_tt+'</span></h3>';
					elm += '  <p><span class="addr2" data-id="'+a2_id+'">'+a2_tt+'</span>，<span class="addr3" data-id="'+a3_id+'">'+a3_tt+'</span>，<span class="addr4" data-id="'+a4_id+'">'+a4_tt+'</span></p>';
					elm += '  <a class="btn_edit"></a>';
					elm += '</li>';
					$(".address_html .list").prepend(elm);
					
					elm = $(".address_html .list li:eq(0)");
					elm.addClass("active").siblings().removeClass("active");*/
					$(".addr a").html(address);
					
					var  meta_id= $("#meta_id").val();
					//alert(meta_id);
					layer.closeAll();
			/*	}
				else
					layer.msg(ret.msg);*/
			/*});*/
		}
		else
		{
			// 添加地址
			url = "../server/proc.json?id="+$(".edited").data("id");
			param = $(elm).find("form").serialize();
			Ajax(url,param,function(ret){
				if( ret.state )
				{
					a1_id = $(".set_addr .addr1").val();
					a1_tt = $(".set_addr .addr1 :checked").text();
					a2_id = $(".set_addr .addr2").val();
					a2_tt = $(".set_addr .addr2 :checked").text();
					a3_id = $(".set_addr .addr3").val();
					a3_tt = $(".set_addr .addr3 :checked").text();
					a4_id = $(".set_addr .addr4").val();
					a4_tt = $(".set_addr .addr4 :checked").text();
					address = a1_tt + "，" + a2_tt + "，" + a3_tt + "，" + a4_tt;
					
					$(".edited .addr1").data({id:a1_id}).text(a1_tt);
					$(".edited .addr2").data({id:a1_id}).text(a2_tt);
					$(".edited .addr3").data({id:a1_id}).text(a3_tt);
					$(".edited .addr4").data({id:a1_id}).text(a4_tt);
					$(".edited").addClass("active").siblings().removeClass("active");
					$(".addr a").html(address);
					layer.closeAll();
				}
				else
					layer.msg(ret.msg);
			});
		}
		
	});
}
