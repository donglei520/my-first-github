// var oImg = {
// 	bg: ['bg-0.jpg','bg-1.jpg','bg-2.jpg'],
// 	img: ['img-0.png','img-1.png','img-2.png']
// }
// $(function (){
// 	var i = 0;
// 	var timer = null;
// 	var direction = 'left --> right';
// 	//点击左右span并判断执行
// 	$('span').click(function (){
// 	    if(!$('img').is(':animated')){
// 	    	clearTimeout(timer);
// 		    if($(this).attr('class') == 'left-btn'){
// 			   direction = 'right --> left';
// 			   moveOut();

// 		    }else if($(this).attr('class') == 'right-btn'){
// 		       direction = 'left --> right';
// 		       moveOut(); 
// 		    }
// 	    }
// 	});
// 	//点击圆点跳转到对应图片
// 	$('ul li').click(function (){
// 		if(!$('img').is(':animated')){
// 			clearTimeout(timer);
// 			i = $(this).index();
// 			$('ul li').removeClass('active').eq( i ).addClass('active');
// 			$('img').animate({left: '90%',top: '50%',width: 0},300,moveIn);
// 			$('.mu').animate({opacity: 0.9},300);
// 		}
// 	});
	
// 	//自动播放，由moveOut接moveIn完成
// 	timer = setTimeout(moveOut,1500);
	

// 	function moveOut(){
// 		moveDirection();//更新i值
// 		$('ul li').removeClass('active').eq( i ).addClass('active');//圆点跟随i变换样式
// 		$('img').animate({left: '90%',top: '50%',width: 0},300,moveIn);//图片经动画缩小到0，并调用moveIn
// 		$('.mu').animate({opacity: 0.9},300);//蒙版变化
// 	}
// 	function moveDirection (){//根据方向变换i值
// 		if(direction == 'left --> right'){
// 			if(i == 2){
// 				i = -1;
// 			}
// 			i ++;
// 		}else if(direction == 'right --> left'){
// 			if(i == 0){
// 				i = 3;
// 			}
// 			i --;
// 		}
// 	}
// 	function moveIn(){//图片切换后由0动画到初始值，并且更新自动播放方向，延时调用moveOut
// 	$('img').attr({'src':'img/img1/' + oImg.img[i]})
// 			.animate({left: '50%',top: '50%',width: '30%'},300,function (){//只改变width，height自动保持纵横比
// 				timer = setTimeout(moveOut,1500);
// 				direction = 'left --> right';
// 			});
// 	$('.wrapper').css('background-image','url("img/img1/' + oImg.bg[i]);
// 	$('.mu').animate({opacity: 0},300);
// 	}
// });


//封装ajax
// ajaxFunc(showList);
//get和post方法，其中get方法最好调用encode函数把参数编码一下再传入content
function ajaxFunc(method,url,content,callback,flag){
	var xhr = null;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else {
		xhr = new ActiveXObject('Microsoft.XMLHttp');
	}
	method = method.toUpperCase();
	// if(method == 'GET'){
	// 	xhr.open(method,url + '?' + content,flag);
	// 	xhr.send(null);
	// }else if(method == 'POST'){
	// 	xhr.open(method,url,flag);
	// 	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	// 	xhr.send(content);
	// }

	if(content && method == 'GET'){//get方法并且发送值，空值也算
		xhr.open(method,url + '?' + content,flag);
		xhr.send(null);
	}else {//三种情况：1，get，不发送值content为null
			//2,post,不发送值  null  
			//3，post，发送值
		xhr.open(method,url,flag);
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(content);
	}
	xhr.onreadystatechange = function (){
		if(xhr.readyState == 4){
			if (xhr.status == 200){
				callback(xhr.responseText);
			}
		}
	};
}

//callback函数
function showList(data){
	var value = JSON.parse(data);
	var str = '';
	value.forEach(function (ele,item){
		str += '<li><a href="#">' + ele.title + '-' + ele.date + '</a></li>';
	});
	$('<ul>').appendTo($('body')).append($(str));
}

function aler(data){
	console.log(data);
}

//执行事件
// $('#btn').on('click',function (e){
// 	e.preventDefault();
// 	ajaxFunc('post','./getNews.php',null,showList,true);
// });
// $('#sub').on('click',function (e){
// 	e.preventDefault();

// 	var data = encode($('input[name=user]').attr('name'),$('input[name=user]').val()) 
// 			 + '&' + encode($('input[name=passw]').attr('name'),$('input[name=passw]').val());
// 	ajaxFunc('post','./ajpost.php',data,aler,true);
// });

//对提交内容参数进行编码，确保格式良好
function encode(name,value){
	var str = '';
	str += encodeURIComponent(name) + '=' + encodeURIComponent(value);
	return str;
}

function addURLParam(url,name,value){
	url += (url.indexOf('?') == -1 ? '?' : '&');
	url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
	return url;
}
//以上是ajax请求，下面的是jsonp请求数据


	var $ul = $('.wrap ul');

	$('.wrap input:eq(0)').on('input',function (){
			var $script = $('<script>');//必须每次都新建一个并且插入，只有这样才能触发浏览器
			//去读取src属性，如果只用一个script标签通过每次改变src的值，这样只会触发一次，后续的src怎么改变也不会触发了
			$script.attr('src','https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/\
			su?wd=' + $(this).val() + '&cb=toJSON');

			// $script.attr('src','./fi.js');//本地js文件加载是阻断的，同步执行，
			//而上面有网络请求的是异步的，异步发送数据请求后等待响应返回，一旦返回就执行。
			
			//返回数据的放在缓存里的？
			// console.log(1);

			$('body').append($script);
			$script.remove();
			// $('body').remove($script);
	});

	function toJSON(data){
		var s = data.s;
		var str = '';
		if(s.length > 0){
			s.forEach(function (ele,item){
				str += '<li><a href="https://www.baidu.com/\
				s?wd=' + ele + '">' + ele + '</a></li>';
			});
			$ul.html($(str));
			$ul.css('display','block');
		}else {
			$ul.css('display','none');
		}
		//当点击li的非a标签地方时也能触发跳转
		$('ul li').on('click',function (){
			$(this).children()[0].click();//jq的trigger('click')方法对a标签不起作用，所以用dom方法触发
		});
	}

// document.cookie = 'name=dona;age=18;max-age=1000';
// document.cookie = 'na=dona;max-age=1000';

// document.cookie = 'ne=dona;age=18;max-age=1000';
	
// document.cookie = 'n=dona;age=18;max-age=1000';

//cookie方法封装与实例
var manageCookie = {
	setCookie: function (name,value,time){
		document.cookie = name + '=' + value + ';max-age=' + time;
		return this;
	},
	removeCookie: function (name){
		return this.setCookie(name,'',-1);
	},
	handleCookie: function (name,callback){
		var allCookieArr = document.cookie.split('; ');
		for(var i = 0;i < allCookieArr.length;i ++){
			var itemCookieArr = allCookieArr[i].split('=');
			if(itemCookieArr[0] == name){
				callback(itemCookieArr[1]);
				return this;
			}
		}
		callback(undefined);
		return this;
	}

};
// manageCookie.setCookie('dona','19',10000)
// 			.setCookie('dong','20',10000)
// 			.changeCookie('dona',function (data){
// 				console.log(data);
// 			})
// 			.setCookie('donaa',20);
// 	
		
	var oDrag = document.getElementsByClassName('drag')[0];
	var newLeft = 0;
	var newTop = 0;
	// if(!document.cookie){
	// 	manageCookie.setCookie('left',10,10000)
	// 				.setCookie('top',10,10000);
	// }else {
//oDrag.style.left = 'NaNpx'  不报错，所以一开始不用if判断了  直接设置如下
		manageCookie.handleCookie('left',function (data){
						console.log('left:' + +data);
						oDrag.style.left = +data + 'px';
					})
					.handleCookie('top',function (data){
						oDrag.style.top = +data + 'px';
						console.log('top:' + +data);
					});
					
	// }
	oDrag.onmousedown = function (e) {//拖拽

			var e = e || window.event;//兼容写法
			var disX = e.clientX - this.offsetLeft,
				disY = e.clientY - this.offsetTop;
				var that = this;

			document.onmousemove = function (event) {
				var event = event || window.event;////兼容写法，
				//这里的event和上面的e不一样
				newLeft = event.clientX - disX;
				newTop = event.clientY - disY;
				that.style.left = newLeft + 'px';
				that.style.top = newTop + 'px';
			};
			document.onmouseup = function () {
				document.onmousemove = null;
				document.onmouseup = null;
				manageCookie.setCookie('left',newLeft,10000)
					        .setCookie('top',newTop,10000);
					        console.log(newLeft,newTop);
			}
	};
// function nn(){
// 	var b = 3;
// 	mm();
// }
// function mm(){
// 	var a = b + 1;
// }
// $(function (){
// 	$('<div class="dd">').appendTo($('body')).load('../taobao/taobao.html');
// });
// $(function (){
// 	$('.wrap input').on('input',function (){
// 		$('.drag').load('ajpost.php',{
// 			user: $('.wrap input').val()
// 		},function (data,text){
// 			console.log(data ,typeof data,1,text);
// 		});	

	

// 		$.get('ajpost.php',{
// 			user: $('.wrap input').val()
// 		},function (data,text){
// 			console.log(data ,typeof data,2,text);
// 		});	
// 	});
// });
$(function (){
	$('#sub').on('click',function (e){
		e.preventDefault();
		$('.drag').load('getNews.php',{
			user: $('.wrap input').val()
		},function (data,text){
			console.log(data ,typeof data,1,text);
		});	

	

		$.getJSON('getNews.php',{
			user: $('.wrap input').val()
		},function (data,text){
			console.log(data ,typeof data,2,text);
			$.each(data,function (can1,can2){
				console.log(data,can1,can2);
			});
		});	
	});
});

//JSONP是通过<script>标签的src属性来跨域获取数据的，而jq中getJSON内部封装使用了这点，所以通过getJSON也可以
$('.call').on('input',function(){
	// $.get('callba.js');
	// $('<script>').appendTo($('body')).attr('src','callba.js');
	$('<script>').appendTo($('body')).attr('src','https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/\
			su?wd=' + $(this).val() + '&cb=cal');
// console.log(aj);
	$.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/\
			su?wd=' + $(this).val() + '&cb=?',function (data){
				console.log(111,data,222);
			});
	$.get('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/\
			su?wd=' + $(this).val() + '&cb=?',function (data,gg,k,i){
				console.log(55,data,gg,k,i,66);
			},'json');
	$.ajax({
		url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/\
			su?wd=' + $(this).val() + '&cb=?',
		dataType: 'jsonp',//or 'json'
		success: function (data,st){
			console.log(123,data,st);
		},
		// global: false
		complete: function (a,b){
			console.log(777,a,b);
		}
	});
})
function callme(){
	console.log('callme');

}
function cal(data){
	console.log(333,data,444);
}
$('#btn').on('click',function(e){
	e.preventDefault();
	console.log($('form').serialize(),typeof $('form').serialize());
	console.log($('form').serializeArray(),typeof $('form').serializeArray()
				,$.param($('form').serializeArray()));
})
//1.9之后  绑定在document上触发ajaxStart(),ajaxStop(),ajaxError(),ajaxComplete()
//ajaxSend() 请求发送之前,ajaxSuccess()
$(document).ajaxStart(function (){

	$('.drag').css('background','pink');
})


function ah(){
	ab();
	console.log(34);
}
function ab(){
	for(var i = 5;i > 4; ){
		
	}
}
//斐波那契数列
// var fibo = function (){
// 	var memo = [0,1];
// 	var fib = function (n){
// 		var result = memo[n];
// 		if(typeof result !== 'number'){
// 			result = fib(n - 1) + fib(n - 2);
// 			memo[n] = result;
// 			console.log('left',n,memo);
// 		}
// 		console.log('外面',n,memo);
// 		return result;
// 	};
// 	return fib;
// }();

// var a = 0;
// var bb = {};
// function fuc(m,n,m,j){
// 	a += m + n + m + j;
// 	this.aa = 10;
// 	var that = this;
// 	console.log(that,this,m,n,m,j,a,arguments);
// 	return fuc;
// }

//fuc(2,8,3,4)
// 3 8 3 4 18 
//Arguments(4) [2, 8, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
//形参有两个m   arguments依然是传入的参数  但是实参传入后内部与形参统一时候
//如形参名一样则后者会覆盖前者并正常执行
//fuc.length--》形参个数  与实参传入个数无关

//函数柯里化 FixedCurry和Curry组合  前者是两次把参数传完  后者是利用递归可以分多次把参数传完
//并且随意组合
// function FixedCurry(fn){
// 	//[add,1,2]
// 	var _arg = [].slice.call(arguments,1);
// 	return function (){
// 		var newArg = _arg.concat([].slice.call(arguments,0));
// 		return fn.apply(this,newArg);
// 	}
// }
// function add(a,b,c,d){
// 	return a + b + c + d;
// }
// var newAdd = FixedCurry(add,1);
// console.log(newAdd(2,3,4));

// function Curry(fn,length){
// 	var length = length || fn.length;
// 	return function (){
// 		if(arguments.length < length){
// 			var combine = [fn].concat([].slice.call(arguments,0));
// 			// console.log(fn);
// 			return Curry(FixedCurry.apply(this,combine),length - arguments.length);
// 		}else {
// 			return fn.apply(this,arguments);
// 		}
// 	}
// }
// var add1 = Curry(add);
// console.log(add1(3)(8)(2)(1));
//add1(3)(8)(2,1)  add1(3)(8,2)(1)  add1(3,8,2)(1) and so on ....

//惰性函数，第一次执行会初始化初值，后续执行都是这个初值
var test = function (){
	var t = new Date().getTime();
	test = function (){
		return t;
	}
	return test();
};
//应用例子
function addEvent(dom,type,handle){
	if(dom.addEventListener){
		dom.addEventListener(type,handle,false);
		//每一个第一次判断后都将addEvent锁定  后续就只用这一个了
		addEvent = function (dom,type,handle){
			dom.addEventListener(type,handle,false);
		};
	}else if(dom.attachEvent){
		dom.attachEvent('on' + type,function (){
			handle.call(dom);
		});
		addEvent = function (dom,type,handle){
			dom.attachEvent('on' + type,function (){
			handle.call(dom);
		   });
		};
	}else {

		dom['on' + type] = handle;
		addEvent = function (dom,type,handle){
			dom['on' + type] = handle;
		}
	}

}

//数组扁平化
var arr = [2,3,{'dona': '18'},[2,23,[31,90],4],19,'dong','dl'];
// function flatten(arry){
// 	return arry.reduce(function(prev,cur,index,arr){
// 		return Object.prototype.toString.call(cur) == '[object Array]' ? prev.concat(flatten(cur)) : prev.concat(cur);
// 	},[])
// }
// 写在数组原型上面
Array.prototype.flatten = function(){
	return this.reduce(function(prev,cur,index,arr){
		return Object.prototype.toString.call(cur) == '[object Array]' ? prev.concat(cur.flatten()) : prev.concat(cur);
	},[])
};
//arr.flatten()

//f(x) g(x)...函数组合(自内向外 自右向左  g(x)-->f(g(x)) )  
//函数通道（自左向右 f(x)-->g(f(x) ) 将reduceRight换成reduce并注意compose传入的函数顺序即可 
function compose(){
	var args = [].slice.call(arguments);
	return function (x){
		return args.reduceRight(function(prev,callback){
			return callback(prev);
		},x);
	}
}  
//应用
function toUpperCase(str){
	return str.toUpperCase();
} 
function addStr(str){
	return str += '!';
}
function split(str){
	return str.split('');
}
function reverse(arr){
	return arr.reverse();
}
function join(arr){
	return arr.join('-')
}
var f = compose(addStr,join,reverse,split,toUpperCase);
console.log(f('time'));//'time' --> 'E-M-I-T!'

//鼠标移入坐标判断方向
var oDrag = document.getElementsByClassName('drag')[0];
$('.drag').on('mouseenter mouseleave',function (e){

	console.log(findSide(e,this));
	// console.log(h,oDrag.offsetHeight,$(this).offset().top,oDrag.offsetTop,e.clientY,e.pageY);
	// console.log(x,y);
});
function findSide (event,obj){
	var h = $(obj).height();
	var w = $(obj).width();
	var l = $(obj).offset().top - $(document).scrollTop();//此处兼容元素有定位父级存在，以及有滚动发生
	var m = $(obj).offset().left - $(document).scrollLeft();//设定成以浏览器窗口为基准
	var x = (event.clientX - (m + w/2)) * (w > h ? h/w : 1);//兼容长方形  将长方形转为正方形处理
	var y = (event.clientY - (l + h/2)) * (h > w ? w/h : 1);
	// console.log(side(x,y));
	return side(x,y);
}
function side(x,y){
	var deg = Math.atan2(y,x) * (180 / Math.PI);
	var d = (Math.round((Math.atan2(y,x) * (180 / Math.PI) + 180) / 90) + 3) % 4;
	console.log(d);//0-->top 1-->right 2-->bottom 3-->left
	switch(d){//度数是按正方形算的
		case 0 : return 'top';
		case 1 : return 'right';
		case 2 : return 'bottom';
		case 3 : return 'left';
	}
}
// function enterDirection(x,y){
// 	var deg = Math.atan2(y,x) * (180 / Math.PI);
// 	var d = (Math.round((Math.atan2(y,x) * (180 / Math.PI) + 180) / 90) + 3) % 4;
// 	console.log(d);
// 	switch(true){//度数是按正方形算的
// 		case -45 <= deg && deg <= 45 : console.log('右');
// 		break;
// 		case 45 <= deg && deg <= 135 : console.log('下');
// 		break;
// 		case -135 <= deg && deg <= -45 : console.log('上');
// 		break;
// 		case (-180 <= deg && deg <= -135) || (135 <= deg && deg <= 180) : console.log('左');
// 		break;
// 	}
// }


//放大镜
var wrapper1 = $('.wrapper1');
var select1 = $('.select1');
var fImg = $('.fImg');
wrapper1.on('mousemove',function (e){
	 move1(e,3);//4倍
}).on('mouseleave',function (){
	select1.hide();
	fImg.hide();
});
function move1(event,mul){
	var w = 700 / mul;
	var h = 700 / mul;
		// w = 80;
		// h = 80;
	var maxL = 700 - w;
	var maxT = 700 - h;
	var minL = 0;
	var minT = 0;
	var x = event.clientX - (wrapper1.offset().left - $(document).scrollLeft()) - w/2;
	var y = event.clientY - (wrapper1.offset().top - $(document).scrollTop()) - h/2;
	var endX = (x > minL) ? (x < maxL) ? x : maxL : minL;
	var endY = (y > minT) ? (y < maxT) ? y : maxT : minT;

	select1.css({
		display: 'block',
		width: w + 'px',
		height: h + 'px',
		left: endX + 'px',
		top: endY + 'px',
});
	fImg.css({
		display: 'block'
	}).find('img').css({//诡异: 带不带px都行，但是margin-left带上会出错不带可以
		width: mul * 700 ,
		height: mul * 700 ,
		'margin-left': -endX * mul ,
		'margin-top': -endY * mul 
	});
	// console.log(-endX*mul ,$('.fImg img').css('margin-left'));
}

//图片联动
$('.tubiao').on('mousemove',function (e){
	
	var oImg = $('.tubiao img');
	for(var i = 0;i < oImg.length; i ++){
		var d = getDir($(oImg[i]),e);
		var num = ((150 - d) / 150 + 1) * 48;
	
		$(oImg[i]).css({
			width: num,
			height: num
		});
	}
})
function getDir(item,event){
	var a = Math.abs(event.clientX - (item.offset().left -$(document).scrollLeft() + 48/2));
	var b = Math.abs(event.clientY - (item.offset().top - $(document).scrollTop() + 48/2));
	var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
	return c > 150 ? 150: c;

}
// 随机数应用
var timer = setInterval(function (){
		var redBox = $('<div class="redbox">');
		redBox.css({
			'top': -60,
			// 'top': -parseInt(Math.random() * 80) - 50,
			'left': parseInt(Math.random() * 450),
			'transform': 'rotate(' + (Math.random() * 40 - 20) + 'deg)',
			'z-index': 10
		})
		.html('红包')
		.appendTo($('.suiji'))
		.animate({top: 310},3000,function(){
			$(this).remove();
		});
},Math.random() * 200 + 100);
clearInterval(timer);


//jq的ajax调用豆瓣后台接口
(function (){
	function deal(data){
		console.log(222,data,typeof data);
	}
	$('.search').on('input',function (){
		$.ajax({
		type: 'GET',
		url:'https://api.douban.com/v2/book/search?q=' + $(this).val() + '&count=10',
		// url: 'https://book.douban.com/j/subject_suggest?q=' + $(this).val() ,
		dataType: 'jsonp',

		success: function (data){
		 console.log(111,data,typeof data);
		 console.log(data.books,data.books[2],data.books[2]['subtitle']);

		 }
			
	});
		console.log($(this).val());
	})
	
	
}());

// css3相册中轴展示
// 初始化弹出相册
setTimeout(function (){
	$('.items .item').css('transform','translateY(0)');
	console.log($('.items .item'));
},300);
var $wrapperP = $('.wrapperP');
var $items = $('.items');
$items.on('click',function(){
	$wrapperP.addClass('wrapper-active');
	$(this).addClass('active')
	.find('.close').one('click',function (e){
		e.stopPropagation();
		$(this).parent().removeClass('active');
		
		$wrapperP.removeClass('wrapper-active');
	});
});




//-------------------------------------------------------
// (function tw(){
// 	var a = 3;
// 	return a;
// }());
var obj1 = {
	name: {
		a: 'dona',
		age: 10,
		hei: 'you'
	},
	fun: {
		age: 'agg',
		getAge: function (){
			console.log(this);
			return this.age;

		},
		setAge: function (val){
			this.name.age = 18;
		}
	}
};



// (function yy(){
// 	var j = k = 90;
// })();
// console.log(k);

var ob = {
	say: function (name){
		console.log(name,this);
	}
}
function sayy(name){
	console.log(name,this);
}


function G(){}
G.prototype = {
	say: 'you'
}
function F(){}
function S(){}
F.prototype = G.prototype;
var f = new F();
var g = new G();
//圣杯继承模式
var inherit = (function (){
	var T = function (){};
	return function (C,G) {
		T.prototype = G.prototype;
		C.prototype = new T();
		C.uber = G.prototype;
		C.prototype.constructor = C;
	}
})();

var s = new S();
//用bind强制绑定obj，可以弥补全局调用函数时this指向全局的问题
function bind(obj,method){
	return function (){
		return method.apply(obj,[].slice.call(arguments));
	}
}

function Ab(){
	var ins;
	Ab = function Ab(){
		return ins;
	};
	Ab.prototype = this;
	console.log(this);
	ins = new Ab();
	ins.aa= 2;

	return ins;
}
// vue-------------------------------------------
var vuee = new Vue({
	el: '.vue1',
	data: {
		name: 'dona',
		age: 18,
		key: true,
		val: 'dona i love you',
		check: 'true',
		movies: ['变形金刚','古墓丽影','一步之遥'],
		persons: {
			name: 'xiao',
			date: 1990,
			height: 170
		},
		val: 'dona',
		styles: {
			backgroundColor: 'pink',
			border: '1px solid black',
			'border-bottom-width': '5px'
		},
		color: 'red'

	},
	methods: {
		getName: function (){

			console.log(1);
			return this.name;
		},
		setName: function (){

			console.log(this.age,4);
			this.name += 'love me';
		},
		setAge: function (){
			console.log(12);
			this.age += 1;
		},
		getval: function (){
			return this.val ;
		},
		setMovies: function (){
			console.log(this.age,13);
			Vue.set(this.movies,2,'复仇者联盟');
		},
		inp: function (event){

			// console.log(this.age,14);
			this.val = event.target.value;
			
			console.log(20,this.val);
			this.fullInp = event.target.value;
			// console.log(15,this.fullInp);
		},
		changeColor: function (){
			 this.color = this.color === 'pink' ? 'green' : 'pink';
		}
	},
	computed: {
		getAge: function (){
			console.log(2);
			return this.age;
		},
		fullInp: {
			get: function (){
			console.log(3);
				
				return this.val;
			},
			set: function (value){
				this.val = value ;
			}
		},
		style1: function (){
			return {	
			'background-color': this.color
			} 
		}
			

	},
	filters: {
		upperCase: function (val,isFirst){
			val = val.toString();
			if (isFirst) {
				return val.charAt(0).toUpperCase() + val.slice(1);

			}else {
				return val.toUpperCase();
			}
		},
		firstWordUp: function (val){
			val = val.toString();
			var arr = val.split(' ');
			var newArr = arr.map(function (ele){
				return ele.charAt(0).toUpperCase() + ele.slice(1);
			});
			return newArr.join(' ');
		},
		removeSpace: function (val){
			val = val.toString();
			return val.replace(/ /g,'');
		}

	}

})
//组件
Vue.component('my-component',{
	template: `
		<div>
			<ul>
				<li>{{msg}}</li>
				<li>{{msg}}111</li>
				<li></li>
			</ul>
		</div>
		`,
	data: function (){
			return {
				msg: 'my lover'
			}
		}
});
new Vue({
	el: '.comp',
	data: {
		
		msg3: 'is me'
	},
	components: {
		'your-component': {
							template: `
									<div>
										<p>{{msg2}}</p><br>
										{{msg4}}

										<button @click="tellMe">tell</button>	
									</div>

									`,
							data: function (){
								return {
									msg4: 'tell you',
									msg2: 'you lover'
								}
							},
							methods: {
									tellMe: function (){
										console.log(33);
										this.msg2 += this.msg4;
										this.msg4 += 'o';
									}
								}
						}
	},
	methods: {
		tellMe2: function (){
			this.msg2 += this.msg3;
			this.msg4 += 'o';
		}
	}
})