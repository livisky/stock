
    var string=window.location.search.slice(3);
	var stock={

        	init:function(str,str2){
        		stock.newStr(str);
				stock.loadScript('http://qt.gtimg.cn/q='+str,'http://qt.gtimg.cn/q='+str2,stock.createDom,str,str2);
				stock.doAdd();//批量添加票
				stock.doReset();//清空票
				stock.toMystock();//自选票
				stock.tojxstock();//精选票
				stock.toztstock();//涨停票
				stock.tomrstock();//买入票
				stock.cxgstock();//次新股
        	},
        	newStr:function(str){
		    	var arr=str.split(",");
		    	var dataStr=[];
		    	for(var i in arr){

		    		if(arr[i]=='000001'){//上证指数
		    			arr[i]='sh'+arr[i];
		    		}else if(arr[i]=='399001'){//深证指数
		    			arr[i]='sz'+arr[i];
		    		}else{
			    		if(arr[i].slice(0,2)=="00"||arr[i].slice(0,2)=="30"){//深证股票
			    			arr[i]='sz'+arr[i];
			    		}else if(arr[i].slice(0,2)=="60"){//上证股票
			    			arr[i]='sh'+arr[i];
			    		}    			
		    		}
		    		dataStr.push(arr[i]);
		    	}
		    	return dataStr.join(",");
		    },
        	newStr2:function(str){
		    	var arr=str.split(",");
		    	var dataStr=[];
		    	for(var i in arr){

		    		if(arr[i]=='000001'){//上证指数
		    			arr[i]='ff_sh'+arr[i];
		    		}else if(arr[i]=='399001'){//深证指数
		    			arr[i]='ff_sz'+arr[i];
		    		}else{
			    		if(arr[i].slice(0,2)=="00"||arr[i].slice(0,2)=="30"){//深证股票
			    			arr[i]='ff_sz'+arr[i];
			    		}else if(arr[i].slice(0,2)=="60"){//上证股票
			    			arr[i]='ff_sh'+arr[i];
			    		}    			
		    		}
		    		dataStr.push(arr[i]);
		    	}
		    	return dataStr.join(",");
		    },		    
	        loadScript:function(url, url2,callback,str,str2) {

	             var script = document.createElement('script');
	             	 script.type = 'text/javascript';
	             var script2 = document.createElement('script');
	             	 script2.type = 'text/javascript';	             	 
	             if (script.readyState) { //for ie
	                 script.onreadystatechange = function() {
	                     if (script.readyState == 'loaded' || script.readyState == 'complete') {
	                         script.onreadystatechange = null;
	                         callback(str,str2);
	                     }
	                 };
	             } else { //other browser
	                 script.onload = function() {
	                  callback(str,str2);
	                 };
	             }	 	             
	             script.src = url;
	             document.getElementsByTagName('head')[0].appendChild(script);
	             script2.src = url2;
	             document.getElementsByTagName('head')[0].appendChild(script2);	             
            
	        },
	        createDom:function(str,str2){
	        	window.response=data=[];
	        	window.response2=data2=[];
	        	var arr=str.split(",");
	        	var arr2=str2.split(",");
	        	for(var i=0;i<arr.length;i++){
	        		data.push(window['v_'+arr[i]]);
	        	}
	        	for(var i=0;i<arr2.length;i++){
	        		data2.push(window['v_'+arr2[i]]);
	        	}
	        },
			setVal:function(response,response2){ 

					window.html=[];
					window.sort=[];
					for(var i=0; i<response.length; i++){

						var info={};
						var content = response[i];
							info.code=content.split('~')[2];
							info.name = content.split('~')[1];	//名称
							info.curr_f = content.split('~')[3]; //现价
							info.z_f=content.split('~')[32];//涨幅
							info.zg_f=content.split('~')[41];			//最高
							info.zd_f=content.split('~')[42];			//最低
							info.zljlr_f=response2[i].split("~")[3];			//主力净流入
							info.shjlr_f=response2[i].split("~")[7];			//散户净流入
							info.nwc_f=content.split('~')[7]-content.split('~')[8];	//外-内差//
							info.zt_f=content.split('~')[47];			//涨停
							info.dt_f=content.split('~')[48];			//跌停
							info.zsz_f=content.split('~')[45];			//总市值
							info.hsl_f=content.split('~')[38];			//换手率
							info.zzb_f=(info.zljlr_f/info.zsz_f).toFixed(2);
							info.zd=content.split('~')[31];//差价
							info.cjlb=(content.split('~')[36]/info.zsz_f).toFixed(2);//差价
							if((info.nwc_f>10000&&info.zljlr_f>5000&&info.zzb_f>3&&info.z_f>0)||info.z_f>4.5){
								info.status='买入';
								info.statusStyle="red";
								info.statustype="";
								if((info.nwc_f>10000&&info.zljlr_f>5000&&info.zzb_f>25&&info.z_f>3)||info.z_f>4.5){
									info.status='强势';
									info.statusStyle="red";
									info.statustype="qs";
								}
							}else if(info.nwc_f<3000&&info.zljlr_f<3000&&info.z_f<0){
								info.status='卖出';
								info.statusStyle="green";
								info.statustype="";
							}else{
								info.status='维持';
								info.statusStyle="";
								info.statustype="";
							}
							
						//拼接到页面	
						function createTemp(config){
							//config.curr_fStyle=(config.curr_f >config.yest_f)?'red':'green';
							config.z_fStyle=(config.z_f > 0)?'red':'green';
							config.zljlr_fStyle=(config.zljlr_f > 0)?'red':'green';
							config.shjlr_fStyle=(config.shjlr_f > 0)?'red':'green';
							config.nwc_fStyle=(config.nwc_f > 0)?'red':'green';
							var temp=[
								'<tr class="tr_cls" sid="{z_f}" type="{statustype}">', 
									'<td align="center"><span class="a0">{code}</span></td>', 
									'<td align="center"><div class="gname"><span class="b0">{name}</span></div><div class="chart"><ul><li><a href="detail.html?c={code}&t=min" target="_blank">时</a></li><li><a href="detail.html?c={code}&t=daily" target="_blank">日</a></li><li><a href="detail.html?c={code}&t=weekly" target="_blank">周</a></li><li><a href="detail.html?c={code}&t=monthly" target="_blank">月</a></li><li><a href="http://data.eastmoney.com/stockcomment/{code}.html" target="_blank">评</a></li></ul></div></td>', 
									'<td align="center"><span class="c0" class="{curr_fStyle}">{curr_f}</span></td>',
									'<td align="center"><span class="g0 {z_fStyle}">{z_f}</span>%</td>',
									'<td align="center"><span id="g0" class={z_fStyle}>{zd}</span></td>',
									'<td align="center"><span class="e0 {zljlr_fStyle}">{zljlr_f}</span></td>', 
									'<td align="center"><span class="e0 {shjlr_fStyle}">{shjlr_f}</span></td>', 
									'<td align="center"><span class="e0 {nwc_fStyle}">{nwc_f}</span></td>',
									'<td align="center"><span class="e0 ">{cjlb}</span></td>',
									'<td align="center"><span class="g0 ">{hsl_f}</span>%</td>', 
									'<td align="center"><span class="h0">{zg_f}</span></td>', 
									'<td align="center"><span class="i0">{zd_f}</span></td>',
									'<td align="center"><span class="e0">{zt_f}</span></td>', 
									'<td align="center"><span class="e0">{dt_f}</span></td>', 
									'<td align="center"><span class="e0">{zsz_f}</span></td>', 
									'<td align="center"><span class="e0 {statusStyle}">{status}</span></td>',
									'<td align="center"><span class="e0">{zzb_f}</span></td>', 
								'</tr>'
								].join('');

							var el = temp.replace( /(\{.+?\})/g, function($1){ return config[$1.slice(1,-1)]; });

							return el;
						}
						html.push(createTemp(info));
						sort.push(info.z_f);
					} 
                    var tableTmp=['<table width="1100" border="1" align="center" cellpadding="0" cellspacing="0" bordercolor="#000000" id="region">', 
                                    '<tr bgcolor="" height="30px">',  
                                        '<th scope="col" style="width:65px;">代号</th>',  
                                        '<th scope="col" >名称</th>',  
                                        '<th scope="col">现价</th>',  
                                        '<th scope="col">涨幅</th>',
                                        '<th scope="col">差价</th>',
                                        '<th scope="col">主净流入</th>',  
                                        '<th scope="col">散净流入</th>', 
                                        '<th scope="col">外内差</th>', 
                                        '<th scope="col">成交量比</th>',
                                        '<th scope="col">换手率</th>',  
                                        '<th scope="col">最高</th>', 
                                        '<th scope="col">最低</th>',  
                                        '<th scope="col">涨停</th>',
                                        '<th scope="col">跌停</th>',
                                        '<th scope="col">总市值</th>',
                                        '<th scope="col">评级</th>',
                                        '<th scope="col">主占比</th>',   
                                    '</tr>', 
                                '</table>'].join('');
                        $('.list').append(tableTmp);
                        $('#region').append(html.join(''));
                        $('tr[type="qs"]').css("background","#ddd");
			},
			doAdd:function(){
				$(".addbtn").click(function(e){
					var textVal=$.trim($("#addtext").val()).replace(/[\r\n]/g,"");
					if(textVal!==''){
						window.location.search="?q="+textVal;
					}
				})			
			},
			doReset:function(){
				$(".reset").click(function(e){
					window.location.search="";
				})				
			},
			toMystock:function(){
				$(".mystock").click(function(){
					var myStr=$("#mystock").html();
					window.location.search='?q='+myStr;
				})
			},
			tojxstock:function(){
				$(".jxstock").click(function(){
					var myStr=$("#jxstock").html();
					window.location.search='?q='+myStr;
				})
			},
			toztstock:function(){
				$(".ztstock").click(function(){
					var myStr=$("#ztstock").html();
					window.location.search='?q='+myStr;
				})				
			},
			tomrstock:function(){
				$(".mrstock").click(function(){
					var myStr=$("#mrstock").html();
					window.location.search='?q='+myStr;
				})					
			},
			cxgstock:function(){
				$(".cxgstock").click(function(){
					var myStr=$("#cxgstock").html();
					window.location.search='?q='+myStr;
				})					
			}

    }

	$(function(){
		window.newStrs=stock.newStr(string);
		window.newStrs2=stock.newStr2(string);
		stock.init(newStrs,newStrs2);
		$("#addtext").text(string);
		//setInterval(function(){window.location.reload();},3000);//每隔一秒刷新一次页面

		$(".pxstock").click(function(){
				sort.sort(function(a,b){return b-a})
				var sortStr="";
				for(var i in sort){
					sortStr+=$('tr[sid="'+sort[i]+'"]').html();
				}
				$(".tr_cls").remove();
				// $('#region').append(sortStr);
		})
		$("#szzs").html(v_sh000001.split("~")[3]);
		$("#szzf").html(v_sh000001.split("~")[31]);
		if(v_sh000001.split("~")[31]>0){
			$("#szzf").css("color","red");
			$("#szzs").css("color","red");
		}else{
			$("#szzf").css("color","green");
			$("#szzs").css("color","green");			
		}
	})
