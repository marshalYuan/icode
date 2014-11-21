do (chrome, document)=>
	chrome.extension.onRequest.addListener (request, sender, sendResponse)->
		console.log if sender.tab then "from a content script:#{sender.tab.url}" else "from the extension"
		console.log request.srcUrl
		return
	return	
