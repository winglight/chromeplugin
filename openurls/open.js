// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  var urls = info.selectionText.split(" ");
  console.log("urls: " + urls);
  for (var i = 0; i < urls.length; i++) {
	  var m_url = urls[i];
	  var position = m_url.indexOf("http", 0);
	  if(position === 0){
		window.open(m_url, '_blank');	  
	  }else if(position > 0){
	  	m_url = m_url.substring(position);
	  	window.open(m_url, '_blank');
	  }
  }  
}

// Create one test item for each context type.
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Open URLs";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});
  console.log("'" + context + "' item:" + id);
}

