(function(_this) {
  return (function(chrome, document) {
    var draw, loadStyle;
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
      console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
      console.log(request.srcUrl);
      draw(request.srcUrl);
    });
    draw = function(content) {
      var qrcode, wrapper;
      wrapper = document.getElementById("icode_wrapper");
      if (!wrapper) {
        loadStyle();
        wrapper = document.createElement('div');
        wrapper.id = "icode_wrapper";
        document.body.appendChild(wrapper);
      }
      qrcode = new QRCode(wrapper, {
        text: content,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      console.log(qrcode);
    };
    loadStyle = function() {
      var head, style;
      head = document.head;
      style = document.createElement("style");
      style.innerText = "#icode_wrapper{border:1px solid #skyblue;position:absolute;top:0;right:0;}";
      return head.appendChild(style);
    };
  });
})(this)(chrome, document);
