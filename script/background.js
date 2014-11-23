(function(_this) {
  return (function(chrome) {
    var save;
    save = function(info, tab) {
      var pageUrl, srcUrl;
      console.log(info);
      console.log(tab);
      srcUrl = info.srcUrl;
      pageUrl = info.pageUrl;
      chrome.tabs.getSelected(null, function(tab) {
        return chrome.tabs.sendRequest(tab.id, {
          srcUrl: srcUrl
        }, function(response) {
          return console.log(response.farewell);
        });
      });
    };
    chrome.contextMenus.create({
      title: "iCode",
      contexts: ["image"],
      onclick: save
    });
  });
})(this)(chrome);
