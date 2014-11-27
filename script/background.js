(function(chrome) {
  var saveImg, saveSelection, saveUrl;
  saveImg = function(info, tab) {
    chrome.tabs.getSelected(null, function(tab) {
      return chrome.tabs.sendRequest(tab.id, {
        info: info,
        type: "image"
      }, function(response) {});
    });
  };
  saveUrl = function(info, tab) {
    chrome.tabs.getSelected(null, function(tab) {
      return chrome.tabs.sendRequest(tab.id, {
        info: info,
        type: "link"
      }, function(response) {});
    });
  };
  saveSelection = function(info, tab) {
    chrome.tabs.getSelected(null, function(tab) {
      return chrome.tabs.sendRequest(tab.id, {
        info: info,
        type: "selection"
      }, function(response) {});
    });
  };
  chrome.contextMenus.create({
    title: "iCode - 图片地址二维码",
    contexts: ['image'],
    onclick: saveImg
  });
  chrome.contextMenus.create({
    title: "iCode - 链接地址二维码",
    contexts: ['link'],
    onclick: saveUrl
  });
  chrome.contextMenus.create({
    title: "iCode - 所选文字二维码",
    contexts: ['selection'],
    onclick: saveSelection
  });
})(chrome);
