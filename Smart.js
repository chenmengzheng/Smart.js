// Smart

//Smart属性
//Smart测试方法		118
//ajax				131
//cookie			176
//chart				430

$(function() {

    var _Smart = window.Smart;

    // cookie模块使用的变量
    // base编码
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	    -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
	    24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

    // 给Smart一个构造函数
    var Smart = function() {
	return new Smart.fn.init();
    };

    Smart.fn = Smart.prototype = {

	// Smart : core_version,

	// summary : summary,

	constructor : Smart,

	init : function() {
	    return this;
	},

	selector : "",

	length : 0,

    };

    Smart.fn.init.prototype = Smart.fn;

    // 这extend方法的作用是,将之后的extend方法加到Smart下
    Smart.extend = Smart.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;

	// Handle a deep copy situation
	if (typeof target === "boolean") {
	    deep = target;
	    target = arguments[1] || {};
	    // skip the boolean and the target
	    i = 2;
	}

	// Handle case when target is a string or something (possible in
	// deep
	// copy)
	if (typeof target !== "object" && !jQuery.isFunction(target)) {
	    target = {};
	}

	// extend jQuery itself if only one argument is passed
	if (length === i) {
	    target = this;
	    --i;
	}

	for (; i < length; i++) {
	    // Only deal with non-null/undefined values
	    if ((options = arguments[i]) != null) {
		// Extend the base object
		for (name in options) {
		    src = target[name];
		    copy = options[name];

		    // Prevent never-ending loop
		    if (target === copy) {
			continue;
		    }

		    // Recurse if we're merging plain
		    // objects or arrays
		    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
			if (copyIsArray) {
			    copyIsArray = false;
			    clone = src && jQuery.isArray(src) ? src : [];

			} else {
			    clone = src && jQuery.isPlainObject(src) ? src : {};
			}

			// Never move original objects,
			// clone them
			target[name] = jQuery.extend(deep, clone, copy);

			// Don't bring in undefined
			// values
		    } else if (copy !== undefined) {
			target[name] = copy;
		    }
		}
	    }
	}

	// Return the modified object
	return target;
    };

    // 工具方法
    // 挂载两个测试方法 使用的时候直接 Smart.textAlert("要弹的东西"); Smart.console("要打印的东西");
    // 等到上线的时候,把console中注释就行了 Smart.console("1234");
    Smart.extend({
	alert : function(value) {
	    alert(value);
	},
	console : function(value) {
	    console.log(value);
	}
    });

    Smart.extend({
	/**
	 * url 请求的地址 data 发送的对象 success 请求成功会调用的函数 eg:
	 * post("url",send,function(data){ alert(data); })
	 */
	post : function(url, data, success) {
	    // 入参检测 检测data
	    if ((typeof (data) != "object") || (jQuery.isEmptyObject(data))) {
		Smart.console(url + "对应的参数格式错误");
	    }
	    var json_data = JSON.stringify(data);
	    $.ajax({
		type : "post",
		url : url,
		data : json_data,
		contentType : "application/json",
		dataType : "json",
		success : success,
		error : function() {
		    alert("请求服务器出错!请检查网络连接");
		}
	    });
	},
	get : function(url, success) {
	    var json_data = JSON.stringify(data);
	    $.ajax({
		type : "get",
		url : url,
		success : success,
		error : function() {
		    alert("请求服务器出错!请检查网络连接");
		}
	    });
	}
    });

    // cookie
    // 删,查.
    Smart.extend({
	/**
	 * base64编码
	 * 
	 * @param {Object}
	 *                str
	 */
	base64encode : function(str) {
	    var out, i, len;
	    var c1, c2, c3;
	    len = str.length;
	    i = 0;
	    out = "";
	    while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
		    out += base64EncodeChars.charAt(c1 >> 2);
		    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
		    out += "==";
		    break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
		    out += base64EncodeChars.charAt(c1 >> 2);
		    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
		    out += "=";
		    break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
		out += base64EncodeChars.charAt(c3 & 0x3F);
	    }
	    return out;
	},
	/**
	 * base64解码
	 * 
	 * @param {Object}
	 *                str
	 */
	base64decode : function(str) {
	    var c1, c2, c3, c4;
	    var i, len, out;
	    len = str.length;
	    i = 0;
	    out = "";
	    while (i < len) {
		/* c1 */
		do {
		    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);
		if (c1 == -1)
		    break;
		/* c2 */
		do {
		    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);
		if (c2 == -1)
		    break;
		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
		/* c3 */
		do {
		    c3 = str.charCodeAt(i++) & 0xff;
		    if (c3 == 61)
			return out;
		    c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1)
		    break;
		out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
		/* c4 */
		do {
		    c4 = str.charCodeAt(i++) & 0xff;
		    if (c4 == 61)
			return out;
		    c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1)
		    break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	    }
	    return out;
	},

	/**
	 * utf16转utf8
	 * 
	 * @param {Object}
	 *                str
	 */
	utf16to8 : function(str) {
	    var out, i, len, c;
	    out = "";
	    len = str.length;
	    for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
		    out += str.charAt(i);
		} else if (c > 0x07FF) {
		    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
		    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
		    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
		    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
		    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	    }
	    return out;
	},
	/**
	 * utf8转utf16
	 * 
	 * @param {Object}
	 *                str
	 */
	utf8to16 : function(str) {
	    var out, i, len, c;
	    var char2, char3;
	    out = "";
	    len = str.length;
	    i = 0;
	    while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
		    case 0:
		    case 1:
		    case 2:
		    case 3:
		    case 4:
		    case 5:
		    case 6:
		    case 7:
			// 0xxxxxxx
			out += str.charAt(i - 1);
			break;
		    case 12:
		    case 13:
			// 110x xxxx 10xx xxxx
			char2 = str.charCodeAt(i++);
			out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
			break;
		    case 14:
			// 1110 xxxx10xx xxxx10xx xxxx
			char2 = str.charCodeAt(i++);
			char3 = str.charCodeAt(i++);
			out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
			break;
		}
	    }
	    return out;
	},

	// cookie方法
	// get
	getCookie : function(objName) {
	    var arrStr = document.cookie.split("; ");
	    for (var i = 0; i < arrStr.length; i++) {
		var temp = arrStr[i].split("=");
		if (temp[0] == objName) {
		    var value = Smart.utf8to16(Smart.base64decode(temp[1]));
		    return Url.decode(value);
		}
	    }
	},
	// set
	setCookie : function(key, value) {
	    var d = new Date();
	    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
	    var expires = "expires=" + d.toUTCString();
	    //路径很重要
	    document.cookie = key + "=" + value + "; " + expires+";path=/Park";
	},
	// 具体项目要改名
	deleteCookie : function(key) {
	    var date = new Date();
	    date.setTime(date.getTime() - 10000);
	    document.cookie = key + "=vv;expires=" + date.toGMTString() + ";path=/Park";
	    // document.cookie =
	    // "YHealth_password=vv;expires="+date.toGMTString() + ";path=/";
	}
    });

    var Url = {
	// public method for url encoding
	encode : function(string) {
	    return escape(this._utf8_encode(string));
	},

	// public method for url decoding
	decode : function(string) {
	    return this._utf8_decode(unescape(string));
	},

	// private method for UTF-8 encoding
	_utf8_encode : function(string) {
	    string = string.replace(/\r\n/g, "\n");
	    var utftext = "";

	    for (var n = 0; n < string.length; n++) {

		var c = string.charCodeAt(n);

		if (c < 128) {
		    utftext += String.fromCharCode(c);
		} else if ((c > 127) && (c < 2048)) {
		    utftext += String.fromCharCode((c >> 6) | 192);
		    utftext += String.fromCharCode((c & 63) | 128);
		} else {
		    utftext += String.fromCharCode((c >> 12) | 224);
		    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
		    utftext += String.fromCharCode((c & 63) | 128);
		}

	    }

	    return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function(utftext) {
	    var string = "";
	    var i = 0;
	    var c = c1 = c2 = 0;

	    while (i < utftext.length) {

		c = utftext.charCodeAt(i);

		if (c < 128) {
		    string += String.fromCharCode(c);
		    i++;
		} else if ((c > 191) && (c < 224)) {
		    c2 = utftext.charCodeAt(i + 1);
		    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
		    i += 2;
		} else {
		    c2 = utftext.charCodeAt(i + 1);
		    c3 = utftext.charCodeAt(i + 2);
		    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
		    i += 3;
		}
	    }
	    return string;
	}

    };
    // cookie结束

    // chart的方法,具体调用的是echarts
    Smart.extend({

	/**
	 * 折线图的实现 折线图对象 myChart 放置表格div的id divID 折线图的左侧大标题 title1 折线图的左侧小标题
	 * title2 y轴单位 titleY {value} 次/分 折线图的标题(具体是那个硬件的) name x轴的数组 xArray
	 * y轴的数组 yArray 类型 type
	 */
	lineChart : function(myChart, divID, title1, title2, titleY, name, xArray, yArray) {
	    // 路径配置
	    require.config({
		paths : {
		    echarts : 'http://echarts.baidu.com/build/source'
		}
	    });
	    require([ 'echarts', 'echarts/chart/line', 'echarts/chart/bar' ], function(ec) {
		myChart = ec.init(document.getElementById(divID));
		var option = {
		    title : {
			text : title1,
			subtext : title2
		    },
		    tooltip : {
			trigger : 'axis'
		    },
		    legend : {
			data : [ _chose_hardware ]
		    },
		    // 工具栏
		    toolbox : {
			show : true,
			feature : {
			    mark : {
				show : true
			    },
			    magicType : {
				show : true,
				type : [ 'line', 'bar' ]
			    },
			    restore : {
				show : true
			    },
			    saveAsImage : {
				show : true
			    },
			    dataZoom : {
				show : true,
				title : {
				    // 放大
				    dataZoom : '区域缩放',
				    // 还原
				    dataZoomReset : '区域缩放后退'
				}
			    },
			}
		    },
		    dataZoom : {
			show : true,
			realtime : true,
			height : 35,
			start : 0,
			end : 100
		    },

		    xAxis : [ {
			type : 'category',
			boundaryGap : false,
			// 动态改变数组的长度
			data : xArray
		    } ],
		    yAxis : [ {
			type : 'value',
			axisLabel : {
			    formatter : titleY
			}
		    } ],
		    series : [ {
			name : chose,// _chose_hardware,
			type : type,
			data : yArray
		    } ]
		};
		// 为echarts对象加载数据
		myChart.setOption(option);
	    });
	},

	/**
	 * 用于动态更新折线图的方法 折线图对象 chatr 折线图的标题(具体是那个硬件的) name 新的数据 data 类型 type
	 */
	update : function(myChart, name, data, type) {
	    myChart.setSeries([ {
		name : name,
		type : type,
		data : data,
	    } ], false);
	}

    })

    // 将Smart设为全局变量
    window.Smart = Smart;

});
