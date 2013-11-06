// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function genericOnClick(info, tab) {
//  console.log("item " + info.menuItemId + " was clicked");
//  console.log("info: " + JSON.stringify(info));
  
  var key = info.selectionText;
  
  var url = "";
  switch(info.menuItemId){
	case "search_taobao":
		url = "http://s.taobao.com/search?q=" + key;
		break;
	case "search_hjenglish":
		url = "http://dict.hjenglish.com/w/" + key;
//		chrome.tabs.executeScript(null, {file: "content_script.js"});
		if($("#popResult").length == 0){
//			var el = $( '<div id="popResult"></div>' );
			var el = document.createElement( 'div' );
			el.id = "popResult";
			document.body.appendChild(el);
		}
		$("<div></div>").load(url, function(response,status,xhr) {
			var el = $( '<div></div>' );
			el.html(response);
			var main = $('.main_container', el);
			$("script",main).replaceWith("");

 			var title = $(".trs",main).text();
			var wordsTxt = $(".pnl_word_comment",main).text();
			wordsTxt = wordsTxt.replace(/ +/g, " ");
			wordsTxt = wordsTxt.replace(/n+/g, "n");

			alert(key + "\n" + title + "\n" + wordsTxt);
			el = null;
//			$("#popResult").html("test");

//			$("#popResult").dialog();
		});
		return;
	case "search_dangdang":
		url = "http://search.dangdang.com/?key=" + key;
		break;
	case "search_amazon":
		url = "http://www.amazon.cn/s/ref=nb_sb_noss_2?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&url=search-alias%3Daps&field-keywords=" + key;
		break;
	default:
  }
  console.log("url: " + url);
  
  window.open(url, '_blank');	  
	  
}

// Create one test item for each context type.
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = chrome.i18n.getMessage("search_taobao");
  
  chrome.contextMenus.create({"id": "search_taobao", "title": title, "contexts":[context],
                                       "onclick": genericOnClick});
  title = chrome.i18n.getMessage("search_hj");
  
  chrome.contextMenus.create({"id": "search_hjenglish", "title": title, "contexts":[context],
                                       "onclick": genericOnClick});
  title = chrome.i18n.getMessage("search_dangdang");
  
  chrome.contextMenus.create({"id": "search_dangdang", "title": title, "contexts":[context],
                                       "onclick": genericOnClick});
  title = chrome.i18n.getMessage("search_amazon");
  
  chrome.contextMenus.create({"id": "search_amazon", "title": title, "contexts":[context],
                                       "onclick": genericOnClick});
}

