

(function(){
	var speed = 5,currentpos = 1,timer,bcolor, bccolor, txtcolor, fonttype,scrollspeed;
	var docCookies = {
	    getItem: function(sKey) {
	        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	    },
	    setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
	            return false;
	        }
	        var sExpires = "";
	        if (vEnd) {
	            switch (vEnd.constructor) {
	                case Number:
	                sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT": "; max-age=" + vEnd;
	                break;
	                case String:
	                sExpires = "; expires=" + vEnd;
	                break;
	                case Date:
	                sExpires = "; expires=" + vEnd.toUTCString();
	                break;

	            }

	        }
	        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain: "") + (sPath ? "; path=" + sPath: "") + (bSecure ? "; secure": "");
	        return true;

	    },
	    removeItem: function(sKey, sPath, sDomain) {
	        if (!sKey || !this.hasItem(sKey)) {
	            return false;
	        }
	        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain: "") + (sPath ? "; path=" + sPath: "");
	        return true;

	    },
	    hasItem: function(sKey) {
	        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);

	    },
	    keys: 
	    /* optional method: you can safely remove it! */
	    function() {
	        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
	        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
	            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
	        }
	        return aKeys;

	    }

	};
	function setCookies(cookieName, cookieValue, expirehours) {
	    var today = new Date();
	    var expire = new Date();
	    expire.setTime(today.getTime() + 3600000 * 356 * 24);
	    return docCookies.setItem(cookieName, cookieValue, expire);
	}
	function readCookies(cookieName) {
		return docCookies.getItem(cookieName);
	}
	
	function ele(o){
		return document.getElementById(o);
	}
	
	function setSpeed() {
	    speed = parseInt(ele('scrollspeed').value);
	    if (speed < 1 || speed > 10) {
	        speed = 5;
	        ele('scrollspeed').value = 5;
	    }

	}

	window.stopScroll = function () {
	    clearInterval(timer);
	}

	window.beginScroll = function () {
	    timer = setInterval("scrolling()", 300 / speed);
	}

	window.scrolling = function () {
	    var currentpos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	    window.scroll(0, ++currentpos);
	    var nowpos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	    if (currentpos != nowpos) clearInterval(timer);
	}

	window.readerSaveSet = function () {
	    setCookies("bcolor", ele('bcolor').value);
	    setCookies("bccolor", ele('bccolor').value);
	    setCookies("txtcolor", ele('txtcolor').value);
	    setCookies("fonttype", ele('fonttype').value);
	    setCookies("scrollspeed", ele('scrollspeed').value);
	}
	
	function selectItem(select, val){
	    	select.selectedIndex = 0;
		if(val){
			for (var i = 0; i < select.length; i++) {
		        if (select.options[i].value == val) {
		            select.selectedIndex = i;
		            break;
		        }
		    }
		}
	}
	function loadSet() {
		selectItem(ele('bcolor'), readCookies("bcolor"));
		selectItem(ele('bccolor'), readCookies("bccolor"));
		selectItem(ele('txtcolor'), readCookies("txtcolor"));
		selectItem(ele('fonttype'), readCookies("fonttype"));

		tmpstr = readCookies("scrollspeed");
		if (!tmpstr){
			tmpstr = 5;
		}
		ele("scrollspeed").value = tmpstr;
		setSpeed();

		document.body.style.background = ele('bcolor').value;
		
		ele('txt_bg').style.background = ele('bccolor').value;
		
		txtObj = ele('txt_content');
		txtObj.style.fontSize = ele('fonttype').value;
		txtObj.style.color = ele('txtcolor').value;
		
		
	}
	
	

	document.onmousedown = stopScroll;
	document.ondblclick = beginScroll;
	
	document.getElementById('txt_ctrl').innerHTML = '<div style="text-align:center">背景颜色\
<select name=bcolor id=bcolor onchange="javascript:document.body.style.background=this.options[this.selectedIndex].value;">\
<option style="background-color: #e6f3ff" value="#e6f3ff">默认</option>\
	<option style="background-color: #ffffff" value="#ffffff">白色</option>\
	<option style="background-color: #e4ebf1" value="#e4ebf1">淡蓝</option>\
	<option style="background-color: #e6f3ff" value="#e6f3ff">蓝色</option>\
	<option style="background-color: #eeeeee" value="#eeeeee">淡灰</option>\
	<option style="background-color: #eaeaea" value="#eaeaea">灰色</option>\
	<option style="background-color: #e4e1d8" value="#e4e1d8">深灰</option>\
	<option style="background-color: #e6e6e6" value="#e6e6e6">暗灰</option>\
	<option style="background-color: #eefaee" value="#eefaee">绿色</option>\
	<option style="background-color: #ffffed" value="#ffffed">明黄</option>\
	<option style="background-color: #f1f1f1" value="#f1f1f1">淡灰</option>\
	<option style="background-color: #eefaee" value="#eefaee">绿意</option>\
	<option style="background-color: #ffffed" value="#ffffed">明黄</option>\
	<option style="background-color: #4394d6" value="#4394d6">深蓝</option>\
	<option style="background-color: #d0cfb2" value="#d0cfb2">秋意</option>\
	<option style="background-color: #fcefff" value="#fcefff">红粉</option>\
	<option style="background-color: #fbe5d9" value="#fbe5d9">红谈</option>\
	<option style="background-color: #c2ceda" value="#c2ceda">天空</option>\
	<option style="background-color: #616378" value="#616378">心碎</option>\
	<option style="background-color: #111111" value="#111111">关灯</option>\
	</select>&nbsp; \
前景颜色<select name=bccolor id=bccolor onchange="javascript:document.getElementById(\'txt_bg\').style.background=this.options[this.selectedIndex].value;">\
	<option style="background-color: #e6f3ff" value="#e6f3ff">蓝色</option>\
	<option style="background-color: #ffffff" value="#ffffff">白色</option>\
	<option style="background-color: #f6f6f6" value="#f6f6f6">银灰</option>\
	<option style="background-color: #e4ebf1" value="#e4ebf1">淡蓝</option>\
	 <option style="background-color: #eeeeee" value="#eeeeee">淡灰</option>\
	<option style="background-color: #eaeaea" value="#eaeaea">灰色</option>  \
	<option style="background-color: #e4e1d8" value="#e4e1d8">深灰</option>\
	<option style="background-color: #e6e6e6" value="#e6e6e6">暗灰</option>\
	<option style="background-color: #eefaee" value="#eefaee">绿色</option>\
	<option style="background-color: #ffffed" value="#ffffed">明黄</option>\
	<option style="background-color: #000000" value="#000000">黑色</option>\
	</select>\
&nbsp; 字体颜色<select name=txtcolor id=txtcolor onchange="javascript:document.getElementById(\'txt_content\').style.color=this.options[this.selectedIndex].value;">\
	<option style="color: #000000" value="#000000">黑色</option>\
	<option style="color: #ff0000" value="#ff0000">红色</option>\
	<option style="color: #006600" value="#006600">绿色</option>\
	<option style="color: #0000ff" value="#0000ff">蓝色</option>\
	<option style="color: #660000" value="#660000">棕色</option>\
	<option style="color: #FFFFFF;background:#000000" value="#FFFFFF">白色</option>\
	</select>&nbsp; 字体大小\
	<select name=fonttype id=fonttype onchange="javascript:document.getElementById(\'txt_content\').style.fontSize=this.options[this.selectedIndex].value;">\
	<option value="12px" >小号</option>\
	<option value="14px" >较小</option>\
	<option value="18px" >中号</option>\
	<option value="22px" >较大</option>\
	<option value="25px" >大号</option>\
	<option value="36px" >瞎眼</option>\
	</select>&nbsp; \
	鼠标双击滚屏\
	<input name=scrollspeed id=scrollspeed onchange="javascript:setSpeed();" size=2 value=5>  (1-10，1最慢，10最快） \
	<input onclick="readerSaveSet();" type=button value="保存设置"><br /></div>';
	
	
	loadSet();

})();