var Icode, _$, _getUTF8Length, _offset;

_$ = function(selector) {
  return document.querySelectorAll(selector);
};

_offset = function(elem) {
  var box, docElem, win;
  win = document.defaultView;
  box = elem.getBoundingClientRect();
  docElem = document.documentElement;
  return {
    top: box.top + win.pageYOffset - docElem.clientTop,
    left: box.left + win.pageXOffset - docElem.clientLeft
  };
};

_getUTF8Length = function(sText) {
  var replacedText;
  replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
  return replacedText.length + (replacedText.length !== sText ? 3 : 0);
};

Icode = function() {
  return this;
};

Icode.prototype.init = function() {
  var self;
  this.createWrapper().loadStyle();
  self = this;
  this.wrapper.querySelector('.icode_close').addEventListener('click', function(e) {
    e.preventDefault();
    self.hide();
    return false;
  });
  return this;
};

Icode.prototype.createWrapper = function() {
  var _wrapper;
  _wrapper = (_$("#_icode_wrapper"))[0];
  if (!_wrapper) {
    _wrapper = document.createElement('div');
    _wrapper.id = "_icode_wrapper";
    document.body.appendChild(_wrapper);
  }
  _wrapper.textContent = "";
  _wrapper.innerHTML = '<a href="#" class="icode_close">x</a> <div class="icode_arrow"></div> <div class="icode_content"></div>';
  this.wrapper = _wrapper;
  return this;
};

Icode.prototype.loadStyle = function() {
  var css, head, style;
  head = document.head;
  style = document.createElement("style");
  css = '#_icode_wrapper { position: absolute; top: 0; left: 0; z-index: 10010; visibility: hidden; height: 154px; width: 160px; padding: 1px; font-size: 14px; font-weight: normal; line-height: 1.42857143; text-align: left; white-space: normal; background-color: #fff; -webkit-background-clip: padding-box; background-clip: padding-box; border: 1px solid #ccc; border: 1px solid rgba(0, 0, 0, .2); border-radius: 6px; -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, .2); box-shadow: 0 5px 10px rgba(0, 0, 0, .2); } #_icode_wrapper .icode_close{ position: absolute; top: 4px; right: 4px; font-size: 16px; color: #999; z-index: 101; } #_icode_wrapper.icode_top { margin-top: -10px; } #_icode_wrapper.icode_right { margin-left: 10px; } #_icode_wrapper.icode_bottom { margin-top: 10px; } #_icode_wrapper.icode_left { margin-left: -10px; } #_icode_wrapper .icode_title { padding: 8px 14px; margin: 0; font-size: 14px; background-color: #f7f7f7; border-bottom: 1px solid #ebebeb; border-radius: 5px 5px 0 0; } #_icode_wrapper .icode_content { padding: 9px 14px; } #_icode_wrapper > .icode_arrow, #_icode_wrapper > .icode_arrow:after { position: absolute; display: block; width: 0; height: 0; border-color: transparent; border-style: solid; } #_icode_wrapper > .icode_arrow { border-width: 11px; } #_icode_wrapper > .icode_arrow:after { content: ""; border-width: 10px; } #_icode_wrapper.icode_top > .icode_arrow { bottom: -11px; left: 50%; margin-left: -11px; border-top-color: #999; border-top-color: rgba(0, 0, 0, .25); border-bottom-width: 0; } #_icode_wrapper.icode_top > .icode_arrow:after { bottom: 1px; margin-left: -10px; content: " "; border-top-color: #fff; border-bottom-width: 0; } #_icode_wrapper.icode_right > .icode_arrow { top: 50%; left: -11px; margin-top: -11px; border-right-color: #999; border-right-color: rgba(0, 0, 0, .25); border-left-width: 0; } #_icode_wrapper.icode_right > .icode_arrow:after { bottom: -10px; left: 1px; content: " "; border-right-color: #fff; border-left-width: 0; } #_icode_wrapper.icode_bottom > .icode_arrow { top: -11px; left: 50%; margin-left: -11px; border-top-width: 0; border-bottom-color: #999; border-bottom-color: rgba(0, 0, 0, .25); } #_icode_wrapper.icode_bottom > .icode_arrow:after { top: 1px; margin-left: -10px; content: " "; border-top-width: 0; border-bottom-color: #fff; } #_icode_wrapper.icode_left > .icode_arrow { top: 50%; right: -11px; margin-top: -11px; border-right-width: 0; border-left-color: #999; border-left-color: rgba(0, 0, 0, .25); } #_icode_wrapper.icode_left > .icode_arrow:after { right: 1px; bottom: -10px; content: " "; border-right-width: 0; border-left-color: #fff; }';
  style.innerText = css;
  head.appendChild(style);
  return this;
};

Icode.prototype.show = function() {
  this.wrapper.style.visibility = "visible";
  return this.wrapper;
};

Icode.prototype.hide = function() {
  this.wrapper.style.visibility = "hidden";
  return this.wrapper;
};

Icode.prototype.offset = function(top, left) {
  var placement, target, targetOffset, targetRect, wrapperRect, _width;
  if (typeof top === 'undefined') {
    return {
      top: this.wrapper.offsetTop,
      left: this.wrapper.offsetLeft
    };
  }
  if (top instanceof HTMLElement) {
    target = top;
    _width = document.body.clientWidth;
    targetRect = target.getBoundingClientRect();
    targetOffset = _offset(target);
    wrapperRect = this.wrapper.getBoundingClientRect();
    if (_width - targetOffset.left - targetRect.width > wrapperRect.width) {
      placement = "right";
      this.offset(targetOffset.top + targetRect.height / 2 - wrapperRect.height / 2, targetOffset.left + targetRect.width * .9);
    } else if (targetOffset.left > wrapperRect.width) {
      placement = "left";
      this.offset(targetOffset.top + targetRect.height / 2 - wrapperRect.height / 2, targetOffset.left + targetRect.width * .1 - wrapperRect.width);
    } else if (targetOffset.top > wrapperRect.height) {
      placement = "top";
      this.offset(targetOffset.top - wrapperRect.height + targetRect.height * .1, targetOffset.left + targetRect.width / 2 - wrapperRect.width / 2);
    } else {
      placement = 'bottom';
      this.offset(targetOffset.top + targetRect.height * .9, targetOffset.left + targetRect.width / 2 - wrapperRect.width / 2);
    }
    this.wrapper.className = "icode_" + placement;
    return this.wrapper;
  }
  this.wrapper.style.left = "" + left + "px";
  this.wrapper.style.top = "" + top + "px";
  return this.wrapper;
};

Icode.prototype.draw = function(request) {
  var box, content, ev, info, target, type;
  if (!QRCode) {
    throw new Error("Plugin QRCode.js is not loaded!");
  }
  info = request.info;
  type = request.type;
  switch (type) {
    case 'image':
      content = info.srcUrl;
      break;
    case 'link':
      content = info.linkUrl;
      break;
    case 'selection':
      content = info.selectionText;
  }
  if (_getUTF8Length(content) >= 2953) {
    throw new Error("所选内容过长，无法转化！");
  }
  ev = this.getContextMenuEvent();
  target = ev.target;
  this.offset(target);
  if (!this.qrcode) {
    box = this.wrapper.querySelector('.icode_content');
    box.innerHTML = "";
    this.qrcode = new QRCode(box, {
      text: content,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    this.qrcode.clear();
    this.qrcode.makeCode(content);
  }
  return this;
};

Icode.prototype.setContextMenuEvent = function(event) {
  this.contextMenuEvent = event ? event : null;
  return event;
};

Icode.prototype.getContextMenuEvent = function() {
  if (!this.contextMenuEvent) {
    throw new Error("Failed to catch event!");
  }
  return this.contextMenuEvent;
};

(function(chrome, document) {
  var icode;
  icode = new Icode;
  icode.init();
  document.addEventListener("contextmenu", function(event) {
    icode.setContextMenuEvent(event);
  }, false);
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    var e;
    if (sender.tab) {
      return;
    }
    try {
      icode.draw(request);
    } catch (_error) {
      e = _error;
      icode.hide();
      alert(e.message);
      return;
    }
    icode.show();
  });
})(chrome, document);
