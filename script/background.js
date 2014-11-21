var save;

chrome.contextMenus.create({
  title: "iCode",
  contexts: ["image"],
  onclick: save
});

save = function(info, tab) {
  var pageUrl, srcUrl;
  console.log(info);
  console.log(tab);
  srcUrl = info.srcUrl;
  pageUrl = info.pageUrl;
  return chrome.tabs.getSelected(null, function(tab) {
    return chrome.tabs.sendRequest(tab.id, {
      srcUrl: srcUrl
    }, function(response) {
      return console.log(response.farewell);
    });
  });
};
