(function(_this) {
  return (function(chrome, document) {
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
      console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
      console.log(request.srcUrl);
    });
  });
})(this)(chrome, document);
