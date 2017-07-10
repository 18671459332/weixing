var share = {};
	var images = {
			localId: [],
			serverId: []
			};
	
	var imgArray = [];
	
	
	
	//摄像图的调取
	$(function(){
		
		 $(".imgCon").on("click",".del",function(){
			 var img_index = $(this).parents("li").index();
			 imgArray.splice(img_index,1);
			 $("#img").val(imgArray.join(','))
             $(this).parents("li").remove();
			 
		 })

  		 $("body").on("click",".lazy_img",function(){
			 var cur_img = $(this).attr("src");
			 wx.previewImage({
				    current: cur_img, // 当前显示图片的http链接
				    urls: imgArray    // 需要预览的图片http链接列表
			 });
		 }) 
		 
		 $("#upload").click(function(){
				 btn = $(this);
					image_length = 8;
					added_length = $("lazy_img").length;//现在的长度
					length = image_length-added_length;
					wx.chooseImage({
					    count: length>8?8:length, // 默认9
					    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					    success: function (res) {
					        images.localId = res.localIds;
					        var i = 0, length = images.localId.length;
					        
					        $(function upfile(){
								wx.uploadImage({
									localId: images.localId[i],
									success: function(res){
										i++;
										images.serverId.push(res.serverId);
										imgtext= "http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=&media_id="+res.serverId;
										if (i<length){ upfile(); }
										//layer.msg("正在上传...",{icon:16});
										$.ajax({
											type:"get",
											url:"/api/qiniu/fetch?serverid="+res.serverId+"&key=Station",
											dataType:"json",
											success: function(ret){
												if( ret.state )
												{   
													$("#image_url").text(ret.data);
													$("#image").attr("image",ret.data);
													img = ret.data;
												    $(".imgCon").prepend("<li><img class='lazy_img' src='"+img+"?imageView2/1/w/200'  /><span class='del'></span></li>")
												    imgArray.unshift(img);
/*												    var img_list=$("#img").val();
												    if(img_list!=null && img_list!=""){
												    	$("#img").val(img_list+","+img);
												    }else{
												    	$("#img").val(img);
												    }*/
												    $("#img").val(imgArray.join(','))
												    return ;
													
												}
												else
													alert(ret.msg);
											},
											failed:function(){
												alert("网络请求错误，请稍后再试！");
											}
										});
									},
									fail:function(res){
										layer.msg(JSON.stringify(res));
										i++;
									}
								});
							});
					    }
					}); 
					
				
				
			});		
    }) 
			