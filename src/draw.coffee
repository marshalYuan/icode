do (chrome, document)=>
	chrome.extension.onRequest.addListener (request, sender, sendResponse)->
		console.log if sender.tab then "from a content script:#{sender.tab.url}" else "from the extension"
		console.log request.srcUrl
		draw request.srcUrl
		return
	
	draw = (content)->
		wrapper = document.getElementById "icode_wrapper"
		if not wrapper
			loadStyle()
			wrapper = document.createElement 'div'
			wrapper.id = "icode_wrapper"
			document.body.appendChild wrapper

		qrcode = new QRCode wrapper, 
		    text: content
		    width: 128
		    height: 128
		    colorDark : "#000000"
		    colorLight : "#ffffff"
		    correctLevel : QRCode.CorrectLevel.H
		console.log qrcode
		return
	loadStyle = ()->
		head = document.head
		style = document.createElement "style"
		style.innerText = "#icode_wrapper{border:1px solid #skyblue;position:absolute;top:0;right:0;}"
		head.appendChild style
	return	
