var Icode, _$;

_$ = function(selector) {
  return document.querySelectorAll(selector);
};

Icode = function() {
  return this;
};

Icode.prototype.init = function() {
  this.createWrapper().loadStyle();
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
  _wrapper.innerHTML = '<div class="arrow"></div> <div class="content"></div>';
  this.wrapper = _wrapper;
  return this;
};

Icode.prototype.loadStyle = function() {
  var css, head, style;
  head = document.head;
  style = document.createElement("style");
  css = '#_icode_wrapper { position: absolute; top: 0; left: 0; z-index: 1060; display: none; max-width: 276px; padding: 1px; font-size: 14px; font-weight: normal; line-height: 1.42857143; text-align: left; white-space: normal; background-color: #fff; -webkit-background-clip: padding-box; background-clip: padding-box; border: 1px solid #ccc; border: 1px solid rgba(0, 0, 0, .2); border-radius: 6px; -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, .2); box-shadow: 0 5px 10px rgba(0, 0, 0, .2); } #_icode_wrapper.top { margin-top: -10px; } #_icode_wrapper.right { margin-left: 10px; } #_icode_wrapper.bottom { margin-top: 10px; } #_icode_wrapper.left { margin-left: -10px; } #_icode_wrapper .title { padding: 8px 14px; margin: 0; font-size: 14px; background-color: #f7f7f7; border-bottom: 1px solid #ebebeb; border-radius: 5px 5px 0 0; } #_icode_wrapper .content { padding: 9px 14px; } #_icode_wrapper > .arrow, #_icode_wrapper > .arrow:after { position: absolute; display: block; width: 0; height: 0; border-color: transparent; border-style: solid; } #_icode_wrapper > .arrow { border-width: 11px; } #_icode_wrapper > .arrow:after { content: ""; border-width: 10px; } #_icode_wrapper.top > .arrow { bottom: -11px; left: 50%; margin-left: -11px; border-top-color: #999; border-top-color: rgba(0, 0, 0, .25); border-bottom-width: 0; } #_icode_wrapper.top > .arrow:after { bottom: 1px; margin-left: -10px; content: " "; border-top-color: #fff; border-bottom-width: 0; } #_icode_wrapper.right > .arrow { top: 50%; left: -11px; margin-top: -11px; border-right-color: #999; border-right-color: rgba(0, 0, 0, .25); border-left-width: 0; } #_icode_wrapper.right > .arrow:after { bottom: -10px; left: 1px; content: " "; border-right-color: #fff; border-left-width: 0; } #_icode_wrapper.bottom > .arrow { top: -11px; left: 50%; margin-left: -11px; border-top-width: 0; border-bottom-color: #999; border-bottom-color: rgba(0, 0, 0, .25); } #_icode_wrapper.bottom > .arrow:after { top: 1px; margin-left: -10px; content: " "; border-top-width: 0; border-bottom-color: #fff; } #_icode_wrapper.left > .arrow { top: 50%; right: -11px; margin-top: -11px; border-right-width: 0; border-left-color: #999; border-left-color: rgba(0, 0, 0, .25); } #_icode_wrapper.left > .arrow:after { right: 1px; bottom: -10px; content: " "; border-right-width: 0; border-left-color: #fff; }';
  style.innerText = css;
  head.appendChild(style);
  return this;
};

Icode.prototype.show = function() {
  this.wrapper.style.display = "block";
  return this.wrapper;
};

Icode.prototype.hide = function() {
  this.wrapper.style.display = "none";
  return this.wrapper;
};

Icode.prototype.offset = function(top, left) {
  var placement, target, targettRect, wrapperRect, _width;
  if (typeof top === void 0) {
    return {
      top: this.wrapper.offsetTop({
        left: this.wrapper.offsetLeft
      })
    };
  }
  if (top instanceof HTMLElement) {
    target = top;
    _width = document.body.clientWidth;
    targettRect = target.getBoundingClientRect();
    wrapperRect = this.wrapper.getBoundingClientRect();
    if (_width - targetRect.right > wrapperRect.width) {
      placement = "right";
      this.offset(targetRect.top + targetRect.height / 2 - wrapperRect.height / 2, targetRect.right);
    } else if (targetRect.left > wrapperRect.width) {
      placement = "left";
      this.offset(targetRect.top + targetRect.height / 2 - wrapperRect.height / 2, targetRect.left);
    } else if (targetRect.top > wrapperRect.height) {
      placement = "top";
      this.offset(targetRect.top - wrapperRect.height, targetRect.left + targetRect.width / 2 - wrapperRect.height / 2);
    } else {
      placement = 'bottom';
      this.offset(targetRect.bottom, targetRect.left + targetRect.width / 2 - wrapperRect.height / 2);
    }
    this.wrapper.className += " " + placement;
    return this.wrapper;
  }
  this.wrapper.style.left = "" + left + "px";
  this.wrapper.style.left = "" + top + "px";
  return this.wrapper;
};

Icode.prototype.draw = function(info) {
  var target;
  if (!QRCode) {
    throw new Error("Plugin QRCode.js is not loaded!");
  }
  target = _$("img[src='" + info + "]'")[0];
  this.offset(target);
  if (!this.qrcode) {
    this.qrcode = new QRCode(this.wrapper.querySelector('.content'), {
      text: info,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    this.qrcode.clear();
    this.qrcode.makeCode(info);
  }
  return this;
};

(function(_this) {
  return (function(chrome, document) {
    var icode;
    icode = new Icode;
    icode.init();
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
      console.log(request.srcUrl);
      icode.draw(request.srcUrl).show();
    });
  });
})(this)(chrome, document);
