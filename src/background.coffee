do (chrome)=>
	save = (info, tab)->
		console.log info
		console.log tab
		srcUrl = info.srcUrl
		pageUrl = info.pageUrl
		console.log info.mediaType
		chrome.tabs.getSelected null, (tab)->
			chrome.tabs.sendRequest tab.id, info, (response)-> 
				return console.log response.farewell
		return
		
	chrome.contextMenus.create
		title: "iCode"
		contexts: ['image','link','video','audio','selection']
		onclick: save

	return
