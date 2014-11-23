do (chrome)=>
	save = (info, tab)->
		console.log info
		console.log tab
		srcUrl = info.srcUrl
		pageUrl = info.pageUrl
		chrome.tabs.getSelected null, (tab)->
			chrome.tabs.sendRequest tab.id, srcUrl: srcUrl, (response)-> 
				return console.log response.farewell
		return
		
	chrome.contextMenus.create
		title: "iCode"
		contexts: ["image"]
		onclick: save

	return
