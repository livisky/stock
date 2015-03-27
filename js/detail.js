var url=window.location.search,
	code=url.slice(3,9),
	type=url.slice(12);

        var newStr=function(str){
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
		    }

$(function(){
	$("#detailimg").find('img').attr('src','http://image.sinajs.cn/newchart/'+type+'/n/'+newStr(code)+'.gif');

})

