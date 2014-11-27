_$ = (selector)->
	return document.querySelectorAll selector
_offset = (elem)->
	win = document.defaultView
	box = elem.getBoundingClientRect()
	docElem = document.documentElement
	return top: box.top + win.pageYOffset - docElem.clientTop, left: box.left + win.pageXOffset - docElem.clientLeft
_getUTF8Length = (sText)-> 
		replacedText = encodeURI(sText).toString().replace /\%[0-9a-fA-F]{2}/g, 'a'
		return replacedText.length + (if replacedText.length != sText then 3 else 0)
Icode = ()->
	return @

Icode.prototype.init = ()->
	@createWrapper().loadStyle()
	self = @
	@wrapper.querySelector('.icode_close').addEventListener 'click', (e)->
		e.preventDefault()
		self.hide()
		return false
	return @

Icode.prototype.createWrapper = ()->
	_wrapper = (_$ "#_icode_wrapper")[0]
	if not _wrapper
		_wrapper = document.createElement 'div'
		_wrapper.id = "_icode_wrapper"
		
		document.body.appendChild _wrapper
	_wrapper.textContent = ""
	_wrapper.innerHTML = '
		<a href="#" class="icode_close">x</a>
		<div class="icode_arrow"></div>
		<div class="icode_content"></div>
	'
	@wrapper = _wrapper
	return @
Icode.prototype.loadStyle = ()->
	head = document.head
	style = document.createElement "style"
	css = ' 
		#_icode_wrapper {
		  position: absolute;
		  top: 0;
		  left: 0;
		  z-index: 10010;
		  visibility: hidden;
		  height: 154px;
		  width: 160px;
		  padding: 1px;
		  font-size: 14px;
		  font-weight: normal;
		  line-height: 1.42857143;
		  text-align: left;
		  white-space: normal;
		  background-color: #fff;
		  -webkit-background-clip: padding-box;
		          background-clip: padding-box;
		  border: 1px solid #ccc;
		  border: 1px solid rgba(0, 0, 0, .2);
		  border-radius: 6px;
		  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
		          box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
		}
		#_icode_wrapper .icode_close{
			position: absolute;
			top: 4px;
			right: 4px;
			font-size: 16px;
			color: #999;
			z-index: 101;
		}
		#_icode_wrapper.icode_top {
		  margin-top: -10px;
		}
		#_icode_wrapper.icode_right {
		  margin-left: 10px;
		}
		#_icode_wrapper.icode_bottom {
		  margin-top: 10px;
		}
		#_icode_wrapper.icode_left {
		  margin-left: -10px;
		}
		#_icode_wrapper .icode_title {
		  padding: 8px 14px;
		  margin: 0;
		  font-size: 14px;
		  background-color: #f7f7f7;
		  border-bottom: 1px solid #ebebeb;
		  border-radius: 5px 5px 0 0;
		}
		#_icode_wrapper .icode_content {
		  padding: 9px 14px;
		}
		#_icode_wrapper > .icode_arrow,
		#_icode_wrapper > .icode_arrow:after {
		  position: absolute;
		  display: block;
		  width: 0;
		  height: 0;
		  border-color: transparent;
		  border-style: solid;
		}
		#_icode_wrapper > .icode_arrow {
		  border-width: 11px;
		}
		#_icode_wrapper > .icode_arrow:after {
		  content: "";
		  border-width: 10px;
		}
		#_icode_wrapper.icode_top > .icode_arrow {
		  bottom: -11px;
		  left: 50%;
		  margin-left: -11px;
		  border-top-color: #999;
		  border-top-color: rgba(0, 0, 0, .25);
		  border-bottom-width: 0;
		}
		#_icode_wrapper.icode_top > .icode_arrow:after {
		  bottom: 1px;
		  margin-left: -10px;
		  content: " ";
		  border-top-color: #fff;
		  border-bottom-width: 0;
		}
		#_icode_wrapper.icode_right > .icode_arrow {
		  top: 50%;
		  left: -11px;
		  margin-top: -11px;
		  border-right-color: #999;
		  border-right-color: rgba(0, 0, 0, .25);
		  border-left-width: 0;
		}
		#_icode_wrapper.icode_right > .icode_arrow:after {
		  bottom: -10px;
		  left: 1px;
		  content: " ";
		  border-right-color: #fff;
		  border-left-width: 0;
		}
		#_icode_wrapper.icode_bottom > .icode_arrow {
		  top: -11px;
		  left: 50%;
		  margin-left: -11px;
		  border-top-width: 0;
		  border-bottom-color: #999;
		  border-bottom-color: rgba(0, 0, 0, .25);
		}
		#_icode_wrapper.icode_bottom > .icode_arrow:after {
		  top: 1px;
		  margin-left: -10px;
		  content: " ";
		  border-top-width: 0;
		  border-bottom-color: #fff;
		}
		#_icode_wrapper.icode_left > .icode_arrow {
		  top: 50%;
		  right: -11px;
		  margin-top: -11px;
		  border-right-width: 0;
		  border-left-color: #999;
		  border-left-color: rgba(0, 0, 0, .25);
		}
		#_icode_wrapper.icode_left > .icode_arrow:after {
		  right: 1px;
		  bottom: -10px;
		  content: " ";
		  border-right-width: 0;
		  border-left-color: #fff;
		}
	'
	style.innerText = css
	head.appendChild style
	return @
Icode.prototype.show = ()->
	@wrapper.style.visibility = "visible"
	return @wrapper
Icode.prototype.hide = ()->
	@wrapper.style.visibility = "hidden"
	return @wrapper
Icode.prototype.offset = (top, left)->
	if typeof top is 'undefined'
		return top: @wrapper.offsetTop, left: @wrapper.offsetLeft
	if top instanceof HTMLElement
		target = top
		_width = document.body.clientWidth
		targetRect = target.getBoundingClientRect()
		targetOffset = _offset target
		wrapperRect = @wrapper.getBoundingClientRect()
		if _width - targetOffset.left - targetRect.width > wrapperRect.width
			placement = "right"
			@offset targetOffset.top + targetRect.height/2 - wrapperRect.height/2, targetOffset.left + targetRect.width*.9
		else if targetOffset.left > wrapperRect.width
			placement = "left"
			@offset targetOffset.top + targetRect.height/2 - wrapperRect.height/2, targetOffset.left + targetRect.width*.1 - wrapperRect.width
		else if targetOffset.top > wrapperRect.height
			placement = "top"
			@offset targetOffset.top - wrapperRect.height + targetRect.height*.1, targetOffset.left + targetRect.width/2 - wrapperRect.width/2 
		else
			placement = 'bottom'
			@offset targetOffset.top + targetRect.height*.9, targetOffset.left + targetRect.width/2 - wrapperRect.width/2 

		@wrapper.className = "icode_#{placement}"
		return @wrapper
	#直接传参
	@wrapper.style.left = "#{left}px"
	@wrapper.style.top = "#{top}px"

	return @wrapper
Icode.prototype.draw = (request)->
	if not QRCode
		throw new Error "Plugin QRCode.js is not loaded!"
	info = request.info
	type = request.type
	
	switch type
		when 'image' then content = info.srcUrl
		when 'link' then content = info.linkUrl
		when 'selection' then content = info.selectionText
		
	if _getUTF8Length(content) >= 2953
		throw new Error "所选内容过长，无法转化！"
		
	ev = @getContextMenuEvent()		
	target = ev.target
	# _target = _$("img[src='#{info}']")[0]
	@offset target

	if not @qrcode
		box = @wrapper.querySelector '.icode_content'
		box.innerHTML = ""
		@qrcode = new QRCode box, 
		    text: content
		    width: 128
		    height: 128
		    colorDark : "#000000"
		    colorLight : "#ffffff"
		    correctLevel : QRCode.CorrectLevel.H
		
	else
		@qrcode.clear()
		@qrcode.makeCode content
	return @

Icode.prototype.setContextMenuEvent = (event)->
	@contextMenuEvent = if event then event else null
	return event
Icode.prototype.getContextMenuEvent = ()->
	if not @contextMenuEvent
		throw new Error "Failed to catch event!"
	return @contextMenuEvent

do (chrome, document)->
	icode = new Icode
	icode.init()
	document.addEventListener "contextmenu", (event)->
		icode.setContextMenuEvent event
		return
	,false
	chrome.extension.onRequest.addListener (request, sender, sendResponse)->
		if sender.tab
			return
		try
			icode.draw request
		catch e
			icode.hide()
			alert e.message
			return
		icode.show()
		return
	
	

	return
