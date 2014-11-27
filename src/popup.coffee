init = ()->
	convert = (e)->
		content = document.getElementById('content').value
		wrapper = document.getElementById('qrcode_wrapper')
		wrapper.textContent = ""
		new QRCode wrapper, 
		    text: content
		    width: 128
		    height: 128
		    colorDark : "#000000"
		    colorLight : "#ffffff"
		    correctLevel : QRCode.CorrectLevel.H
		e.preventDefault()
		return no
	document.querySelector('form button').addEventListener 'click', convert, no

do (document)->
	document.addEventListener 'DOMContentLoaded', init, no
