// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  var urls = info.selectionText.split(" ");
  console.log("urls: " + urls);
  if(urls.indexOf("http") == 0){
	  for (var i = 0; i < urls.length; i++) {
		  var m_url = urls[i];
		  if(m_url.indexOf("http") == 0){
		 	m_url = "http://api.qrserver.com/v1/create-qr-code/?data=" + encodeURIComponent(m_url) + "&size=250x250";
		  	window.open(m_url, '_blank');
		  }else{
		  	alert("No available URL to generate QRCode!");
		  }
		
	  }  
  }else{
  	urls = info.linkUrl;
  	if(urls.indexOf("http") == 0){
		 	urls = "http://api.qrserver.com/v1/create-qr-code/?data=" + encodeURIComponent(urls) + "&size=250x250";
		  	window.open(urls, '_blank');
		  }else{
		  	alert("No available URL to generate QRCode!");
		  }
  }
}

// Create one test item for each context type.
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Generate QRCode";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});
  console.log("'" + context + "' item:" + id);
}

