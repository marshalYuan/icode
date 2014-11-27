do (chrome)->
	saveImg = (info, tab)->
		chrome.tabs.getSelected null, (tab)->
			chrome.tabs.sendRequest tab.id, {info:info, type:"image"}, (response)-> 
				return
		return
	saveUrl = (info, tab)->
		chrome.tabs.getSelected null, (tab)->
			chrome.tabs.sendRequest tab.id, {info:info, type:"link"}, (response)-> 
				return
		return
	saveSelection = (info, tab)->
		chrome.tabs.getSelected null, (tab)->
			chrome.tabs.sendRequest tab.id, {info:info, type:"selection"}, (response)-> 
				return
		return
	chrome.contextMenus.create
		title: "iCode - 图片地址二维码"
		contexts: ['image']
		onclick: saveImg

	chrome.contextMenus.create
		title: "iCode - 链接地址二维码"
		contexts: ['link']
		onclick: saveUrl
	
	chrome.contextMenus.create
		title: "iCode - 所选文字二维码"
		contexts: ['selection']
		onclick: saveSelection

	return
